// Plages IP Cloudflare et adresse réelle du client, correctif C-1,
// 22 nov. 2026 : ne faire confiance à CF-Connecting-IP que si
// l'adresse du pair (la connexion TCP, jamais un en-tête) appartient
// aux plages publiées par Cloudflare. Sinon, l'en-tête est ignoré
// et on retombe sur req.ip. L'origine Render est joignable
// directement, un attaquant pouvait forger l'en-tête et obtenir
// un nouveau compteur de limite à chaque requête.
//
// Les plages de secours ci-dessous sont la copie publiée par
// Cloudflare le 22 nov. 2026 (https://www.cloudflare.com/ips-v4
// et /ips-v6). Elles sont rafraîchies au démarrage et toutes les
// 6 heures depuis ces mêmes adresses ; si la récupération échoue,
// la copie de secours reste en vigueur, jamais une liste vide.
export const PLAGES_CLOUDFLARE_SECOURS = {
  v4: [
    '173.245.48.0/20', '103.21.244.0/22', '103.22.200.0/22',
    '103.31.4.0/22', '141.101.64.0/18', '108.162.192.0/18',
    '190.93.240.0/20', '188.114.96.0/20', '197.234.240.0/22',
    '198.41.128.0/17', '162.158.0.0/15', '104.16.0.0/13',
    '104.24.0.0/14', '172.64.0.0/13', '131.0.72.0/22',
  ],
  v6: [
    '2400:cb00::/32', '2606:4700::/32', '2803:f800::/32',
    '2405:b500::/32', '2405:8100::/32', '2a06:98c0::/29',
    '2c0f:f248::/32',
  ],
};

const URL_PLAGES_V4 = 'https://www.cloudflare.com/ips-v4';
const URL_PLAGES_V6 = 'https://www.cloudflare.com/ips-v6';

let plages = {
  v4: [...PLAGES_CLOUDFLARE_SECOURS.v4],
  v6: [...PLAGES_CLOUDFLARE_SECOURS.v6],
};

export function plagesCloudflare() {
  return { v4: [...plages.v4], v6: [...plages.v6] };
}

function ipv4EnEntier(ip) {
  const parties = String(ip).split('.');
  if (parties.length !== 4) return null;
  let n = 0;
  for (const p of parties) {
    if (!/^\d+$/.test(p)) return null;
    const v = Number(p);
    if (v < 0 || v > 255) return null;
    n = n * 256 + v;
  }
  return n >>> 0;
}

function ipv6EnBigInt(ip) {
  let texte = String(ip).toLowerCase();
  if (!/^[0-9a-f:]+$/.test(texte) || texte.includes(':::')) return null;
  const parties = texte.split('::');
  if (parties.length > 2) return null;
  const gauche = parties[0] ? parties[0].split(':').filter(Boolean) : [];
  const droite = parties.length === 2 && parties[1] ? parties[1].split(':').filter(Boolean) : [];
  if (parties.length === 1 && gauche.length !== 8) return null;
  if (gauche.length + droite.length > 8) return null;
  const zeros = 8 - gauche.length - droite.length;
  const groupes = [...gauche, ...Array(zeros).fill('0'), ...droite];
  if (groupes.length !== 8) return null;
  let n = 0n;
  for (const g of groupes) {
    if (!/^[0-9a-f]{1,4}$/.test(g)) return null;
    n = (n << 16n) + BigInt(parseInt(g, 16));
  }
  return n;
}

export function adresseDansPlage(ip, cidr) {
  const [reseau, prefixeTexte] = String(cidr).split('/');
  const prefixe = Number(prefixeTexte);
  if (reseau.includes(':')) {
    if (!Number.isInteger(prefixe) || prefixe < 0 || prefixe > 128) return false;
    const adresse = ipv6EnBigInt(ip);
    const base = ipv6EnBigInt(reseau);
    if (adresse === null || base === null) return false;
    if (prefixe === 0) return true;
    const masque = ((1n << BigInt(prefixe)) - 1n) << BigInt(128 - prefixe);
    return (adresse & masque) === (base & masque);
  }
  if (!Number.isInteger(prefixe) || prefixe < 0 || prefixe > 32) return false;
  const adresse = ipv4EnEntier(ip);
  const base = ipv4EnEntier(reseau);
  if (adresse === null || base === null) return false;
  if (prefixe === 0) return true;
  const masque = (0xffffffff << (32 - prefixe)) >>> 0;
  return (adresse & masque) === (base & masque);
}

// Normalise l'adresse du pair : ::ffff:1.2.3.4 (IPv4 mappée en
// IPv6, forme servie par Node) redevient 1.2.3.4.
export function normaliserAdressePair(adresse) {
  const a = String(adresse ?? '').trim();
  return a.startsWith('::ffff:') ? a.slice(7) : a;
}

export function pairCloudflare(adressePair) {
  const pair = normaliserAdressePair(adressePair);
  if (!pair) return false;
  const liste = pair.includes(':') ? plages.v6 : plages.v4;
  return liste.some((cidr) => adresseDansPlage(pair, cidr));
}

// Adresse réelle du client : CF-Connecting-IP seulement si le pair
// est Cloudflare, sinon l'adresse vue par Fastify (req.ip).
export function ipClientCalculee({ pair, enTeteCf, ipRepli }) {
  if (typeof enTeteCf === 'string' && pairCloudflare(pair)) {
    const ip = enTeteCf.split(',')[0].trim();
    if (ip && (ipv4EnEntier(ip) !== null || ipv6EnBigInt(ip) !== null)) return ip;
  }
  return ipRepli;
}

async function recupererPlages(url, recuperer = fetch) {
  const res = await recuperer(url, { signal: AbortSignal.timeout(5000) });
  if (!res.ok) throw new Error(`Récupération des plages Cloudflare impossible : ${res.status}`);
  return String(await res.text())
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.includes('/'));
}

// Rafraîchit les plages depuis Cloudflare ; en cas d'échec, la
// copie de secours (ou les dernières plages récupérées) reste en
// vigueur. Renvoie vrai si les deux listes ont été remplacées.
export async function rafraichirPlagesCloudflare(recuperer = fetch) {
  try {
    const [v4, v6] = await Promise.all([
      recupererPlages(URL_PLAGES_V4, recuperer),
      recupererPlages(URL_PLAGES_V6, recuperer),
    ]);
    if (!v4.length || !v6.length) return false;
    plages = { v4, v6 };
    return true;
  } catch (_) {
    return false;
  }
}

// Pour les tests seulement : remplacer les plages en vigueur.
export function _fixerPlagesPourTest(nouvelles) {
  plages = { v4: [...nouvelles.v4], v6: [...nouvelles.v6] };
}
