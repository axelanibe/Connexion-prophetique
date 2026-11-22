// Double authentification TOTP (RFC 6238), correctif MO-25 (c),
// 22 nov. 2026 : administrateurs seulement, sans nouvelle
// dépendance, crypto natif de Node. Secret base32 (RFC 4648),
// code à 6 chiffres, pas de 30 secondes, HMAC-SHA1, fenêtre de
// vérification d'un pas de chaque côté pour tolérer une horloge
// légèrement décalée. Le secret est chiffré en AES-256-GCM avant
// stockage, avec une clé dérivée de JWT_SECRET et du séparateur
// '2fa' (voir server.js), jamais en clair en base.
import crypto from 'node:crypto';

const ALPHABET_BASE32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export function encoderBase32(octets) {
  let bits = 0;
  let valeur = 0;
  let sortie = '';
  for (const octet of octets) {
    valeur = (valeur << 8) | octet;
    bits += 8;
    while (bits >= 5) {
      sortie += ALPHABET_BASE32[(valeur >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) sortie += ALPHABET_BASE32[(valeur << (5 - bits)) & 31];
  while (sortie.length % 8 !== 0) sortie += '=';
  return sortie;
}

export function decoderBase32(texte) {
  const propre = String(texte ?? '').trim().replace(/=+$/, '').toUpperCase();
  if (!propre || !/^[A-Z2-7]+$/.test(propre)) return null;
  let bits = 0;
  let valeur = 0;
  const octets = [];
  for (const c of propre) {
    valeur = (valeur << 5) | ALPHABET_BASE32.indexOf(c);
    bits += 5;
    if (bits >= 8) {
      octets.push((valeur >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return Buffer.from(octets);
}

export function genererSecret2fa() {
  return encoderBase32(crypto.randomBytes(20));
}

export function urlOtpAuth(secret, email) {
  const libelle = encodeURIComponent(`CONNEXION PROPHETIQUE:${email}`);
  const emetteur = encodeURIComponent('CONNEXION PROPHETIQUE');
  return `otpauth://totp/${libelle}?secret=${secret}&issuer=${emetteur}&algorithm=SHA1&digits=6&period=30`;
}

function codeTotpPourCompteur(secret, compteur) {  const cle = decoderBase32(secret);
  if (!cle) return null;
  const tampon = Buffer.alloc(8);
  tampon.writeBigUInt64BE(BigInt(compteur));
  const hmac = crypto.createHmac('sha1', cle).update(tampon).digest();
  const decalage = hmac[hmac.length - 1] & 0x0f;
  const code = ((hmac[decalage] & 0x7f) << 24)
    | ((hmac[decalage + 1] & 0xff) << 16)
    | ((hmac[decalage + 2] & 0xff) << 8)
    | (hmac[decalage + 3] & 0xff);
  return String(code % 1000000).padStart(6, '0');
}

// Pour les tests seulement : le code du pas courant.
export function genererCodeTotp(secret, maintenantMs = Date.now()) {
  return codeTotpPourCompteur(secret, Math.floor(maintenantMs / 30000));
}

// Vérifie un code à 6 chiffres, fenêtre d'un pas de chaque côté.
// Comparaison à temps constant entre chaînes de même longueur.
export function verifierCodeTotp(secret, code, maintenantMs = Date.now()) {
  if (typeof code !== 'string' || !/^\d{6}$/.test(code)) return false;
  const compteur = Math.floor(maintenantMs / 30000);
  for (let d = -1; d <= 1; d++) {
    const attendu = codeTotpPourCompteur(secret, compteur + d);
    if (attendu && attendu.length === code.length && crypto.timingSafeEqual(Buffer.from(attendu), Buffer.from(code))) return true;
  }
  return false;
}

// Chiffrement du secret 2FA en base : AES-256-GCM, même mise en
// page que les paires rejouables (iv 12 octets, tag 16 octets,
// chiffré, le tout en base64).
export function chiffrerSecret2fa(secret, cle) {
  const iv = crypto.randomBytes(12);
  const chiffreur = crypto.createCipheriv('aes-256-gcm', cle, iv);
  const chiffre = Buffer.concat([chiffreur.update(secret, 'utf8'), chiffreur.final()]);
  return Buffer.concat([iv, chiffreur.getAuthTag(), chiffre]).toString('base64');
}

export function dechiffrerSecret2fa(texte, cle) {
  const buf = Buffer.from(String(texte ?? ''), 'base64');
  if (buf.length < 28) throw new Error('Secret 2FA illisible.');
  const iv = buf.subarray(0, 12);
  const tag = buf.subarray(12, 28);
  const chiffre = buf.subarray(28);
  const dechiffreur = crypto.createDecipheriv('aes-256-gcm', cle, iv);
  dechiffreur.setAuthTag(tag);
  return Buffer.concat([dechiffreur.update(chiffre), dechiffreur.final()]).toString('utf8');
}
