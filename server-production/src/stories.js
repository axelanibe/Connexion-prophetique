// Stories de 24 heures, 17 nov. 2026, décision de Muse sur
// délégation d'Axel : publication par la structure seulement
// en V1, visibles par les membres connectés, en tête de
// l'accueil. Médias sur Cloudflare R2, compartiment privé,
// jamais public : l'application ne voit que des liens signés
// temporaires générés par le serveur. Suppression automatique
// après 24 heures, sans conservation de traçabilité : ni le
// contenu ni la ligne ne restent, ni dans R2 ni dans la base.
// Les clés R2 se lisent uniquement depuis les variables
// d'environnement Render (R2_ACCOUNT_ID, R2_ACCESS_KEY_ID,
// R2_SECRET_ACCESS_KEY, R2_BUCKET), jamais en dur, jamais dans
// le dépôt. Sans elles, les stories sont désactivées
// proprement : la liste est vide, l'envoi refuse, sans erreur
// visible côté membre.
//
// Ce module ne contient que des constantes et des aides pures,
// sans accès base, pour être testé sans serveur ni base, comme
// src/appels.js. Les routes vivent dans server.js.

import crypto from 'node:crypto';

/// Durée de vie d'une story, décidée : 24 heures, puis
/// suppression automatique, contenu et ligne, sans trace.
export const DUREE_STORY_HEURES = 24;

/// Durée de validité d'un lien signé de lecture : 15 minutes.
/// L'application recharge la liste à chaque ouverture, les
/// liens ne sont donc jamais conservés longtemps.
export const DUREE_URL_SIGNEE_SECONDES = 900;

/// Tailles maximales acceptées : la photo est compressée côté
/// application avant l'envoi, la vidéo est envoyée telle
/// quelle, courte, avec ce plafond.
export const TAILLE_MAX_PHOTO_OCTETS = 5 * 1024 * 1024;
export const TAILLE_MAX_VIDEO_OCTETS = 25 * 1024 * 1024;

/// Délais des appels R2, réécriture 22 nov. 2026 : un envoi ou
/// une suppression ne doit jamais bloquer une requête
/// indéfiniment. Sans réponse dans ce délai, l'appel échoue et
/// la requête répond quand même, sans laisser le membre en attente.
export const DELAI_ENVOI_R2_MS = 60 * 1000;
export const DELAI_SUPPRESSION_R2_MS = 15 * 1000;

export const TYPES_STORY = Object.freeze(['photo', 'video']);

export const MIMES_PHOTO = Object.freeze(['image/jpeg', 'image/png', 'image/webp']);
export const MIMES_VIDEO = Object.freeze(['video/mp4', 'video/quicktime', 'video/webm']);

const EXTENSION_MIME = Object.freeze({
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'video/mp4': 'mp4',
  'video/quicktime': 'mov',
  'video/webm': 'webm',
});

/// Configuration R2 lue dans l'environnement, null quand une
/// valeur manque : les stories sont alors désactivées, jamais
/// en erreur. Aucune valeur par défaut, jamais de clé en dur.
export function configR2(env = process.env) {
  const accountId = env.R2_ACCOUNT_ID;
  const accessKeyId = env.R2_ACCESS_KEY_ID;
  const secretAccessKey = env.R2_SECRET_ACCESS_KEY;
  const bucket = env.R2_BUCKET;
  if (!accountId || !accessKeyId || !secretAccessKey || !bucket) return null;
  return { accountId, accessKeyId, secretAccessKey, bucket };
}

export function r2Actif(config) {
  return config != null;
}

/// Hôte de l'API compatible S3 de R2 pour ce compte.
export function hoteR2(config) {
  return `${config.accountId}.r2.cloudflarestorage.com`;
}

/// Clé d'objet dans le compartiment : un dossier, un identifiant
/// aléatoire, l'extension du type réel. Aucune donnée membre
/// dans la clé, rien qui permette de deviner le contenu.
export function cleStory(type, mime) {
  const ext = EXTENSION_MIME[mime] ?? (type === 'video' ? 'mp4' : 'jpg');
  return `stories/${crypto.randomUUID()}.${ext}`;
}

/// Clé R2 valable pour une story, réécriture 22 nov. 2026 : une
/// chaîne non vide dans le dossier stories. Une ligne sans clé
/// valable est écartée de la liste, jamais une erreur pour toute
/// la liste.
export function cleR2Valide(cle) {
  return typeof cle === 'string' && cle.startsWith('stories/') && cle.length > 'stories/'.length;
}

/// Date d'expiration d'une story créée maintenant : 24 heures.
export function dateExpirationStory(creeLe = new Date()) {
  return new Date(creeLe.getTime() + DUREE_STORY_HEURES * 60 * 60 * 1000);
}

/// Vrai quand la story est expirée : à supprimer, contenu et ligne.
export function storyExpiree(expireLe, maintenant = new Date()) {
  return new Date(expireLe).getTime() <= maintenant.getTime();
}

/// Refus de publication, null quand tout est bon. Le type réel
/// est vérifié par l'appelant dans les octets, jamais d'après
/// le nom ou l'en-tête envoyé : ici, seulement la cohérence
/// entre le type déclaré, le type réel et la taille.
export function validerPublication({ type, mime, tailleOctets }) {
  if (!TYPES_STORY.includes(type)) return { statut: 400, message: 'Type de story invalide.' };
  const mimes = type === 'photo' ? MIMES_PHOTO : MIMES_VIDEO;
  if (!mimes.includes(mime)) return { statut: 415, message: 'Type de média non autorisé.' };
  const max = type === 'photo' ? TAILLE_MAX_PHOTO_OCTETS : TAILLE_MAX_VIDEO_OCTETS;
  if (!Number.isInteger(tailleOctets) || tailleOctets <= 0 || tailleOctets > max) {
    return { statut: 413, message: 'Média trop volumineux.' };
  }
  return null;
}

/// Refus d'enregistrement, null quand le dossier est bon.
/// Vérifie le dossier complet avant l'envoi R2 et l'INSERT,
/// réécriture 22 nov. 2026, expert : champs obligatoires
/// présents, types corrects, valeurs cohérentes. Une story
/// invalide est refusée à la publication avec un message clair,
/// jamais acceptée puis subie par tous les clients.
export function validerEnregistrementStory({ type, cle, mime, tailleOctets, etablissementId, expireLe }) {
  if (!TYPES_STORY.includes(type)) return { statut: 400, message: 'Type de story invalide.' };
  if (!cleR2Valide(cle)) return { statut: 400, message: 'Clé de média invalide.' };
  const mimes = type === 'photo' ? MIMES_PHOTO : MIMES_VIDEO;
  if (!mimes.includes(mime)) return { statut: 415, message: 'Type de média non autorisé.' };
  const max = type === 'photo' ? TAILLE_MAX_PHOTO_OCTETS : TAILLE_MAX_VIDEO_OCTETS;
  if (!Number.isInteger(tailleOctets) || tailleOctets <= 0 || tailleOctets > max) {
    return { statut: 413, message: 'Média trop volumineux.' };
  }
  if (etablissementId != null && typeof etablissementId !== 'string') {
    return { statut: 400, message: 'Établissement invalide.' };
  }
  if (!(expireLe instanceof Date) || Number.isNaN(expireLe.getTime()) || expireLe.getTime() <= Date.now()) {
    return { statut: 400, message: 'Expiration de story invalide.' };
  }
  return null;
}

/// Trouve un doublon récent, réécriture 22 nov. 2026 : une
/// publication identique (même auteur, même type, même format,
/// même taille) enregistrée il y a moins de 60 secondes est un
/// double envoi, pas une nouvelle story. Renvoie la story
/// existante, sinon null. Sans auteur, pas de dédoublonnage.
export function trouverDoublonRecent(candidat, recents, { fenetreSecondes = 60, maintenant = new Date() } = {}) {
  if (!candidat || candidat.auteurId == null) return null;
  const limite = maintenant.getTime() - fenetreSecondes * 1000;
  for (const ligne of recents) {
    if (ligne.auteur_id !== candidat.auteurId) continue;
    if (ligne.type !== candidat.type) continue;
    if (ligne.type_mime !== candidat.mime) continue;
    if (ligne.taille_octets !== candidat.tailleOctets) continue;
    const cree = new Date(ligne.cree_le).getTime();
    if (Number.isNaN(cree) || cree <= limite) continue;
    return ligne;
  }
  return null;
}

// ── Signature AWS SigV4, pour l'API compatible S3 de R2 ──
// Région « auto », comme le veut R2. Aucune dépendance : les
// signatures sont calculées avec node:crypto seulement.

function sha256Hex(donnees) {
  return crypto.createHash('sha256').update(donnees).digest('hex');
}

function hmacSha256(cle, donnees) {
  return crypto.createHmac('sha256', cle).update(donnees).digest();
}

function formaterDateAmz(date) {
  const p = (n) => String(n).padStart(2, '0');
  return `${date.getUTCFullYear()}${p(date.getUTCMonth() + 1)}${p(date.getUTCDate())}` +
    `T${p(date.getUTCHours())}${p(date.getUTCMinutes())}${p(date.getUTCSeconds())}Z`;
}

function cleSignatureR2(config, dateCourte) {
  const kDate = hmacSha256(`AWS4${config.secretAccessKey}`, dateCourte);
  const kRegion = hmacSha256(kDate, 'auto');
  const kService = hmacSha256(kRegion, 's3');
  return hmacSha256(kService, 'aws4_request');
}

function porteeSignature(config, dateCourte) {
  return `${dateCourte}/auto/s3/aws4_request`;
}

/// Lien signé de lecture (GET) vers un objet R2, valable
/// expireSecondes secondes. L'application ne voit jamais
/// l'adresse brute du compartiment privé.
export function urlSigneeR2(config, cle, { expireSecondes = DUREE_URL_SIGNEE_SECONDES, maintenant = new Date() } = {}) {
  const hote = hoteR2(config);
  const dateAmz = formaterDateAmz(maintenant);
  const dateCourte = dateAmz.slice(0, 8);
  const portee = porteeSignature(config, dateCourte);
  const uri = `/${config.bucket}/${cle}`;
  const requete = {
    'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
    'X-Amz-Credential': `${config.accessKeyId}/${portee}`,
    'X-Amz-Date': dateAmz,
    'X-Amz-Expires': String(expireSecondes),
    'X-Amz-SignedHeaders': 'host',
  };
  const canoniqueRequete = Object.keys(requete).sort().map((k) => `${k}=${encodeURIComponent(requete[k])}`).join('&');
  const canonique = [
    'GET',
    uri,
    canoniqueRequete,
    `host:${hote}\n`,
    'host',
    'UNSIGNED-PAYLOAD',
  ].join('\n');
  const aSigner = ['AWS4-HMAC-SHA256', dateAmz, portee, sha256Hex(canonique)].join('\n');
  const signature = hmacSha256(cleSignatureR2(config, dateCourte), aSigner).toString('hex');
  return `https://${hote}${uri}?${canoniqueRequete}&X-Amz-Signature=${signature}`;
}

/// En-têtes signés pour une requête directe vers R2 (PUT ou
/// DELETE). Le corps est signé par son empreinte, jamais lu
/// en clair ailleurs que pour l'envoi.
export function entetesSignesR2(config, methode, cle, { octets = Buffer.alloc(0), typeMime = '', maintenant = new Date() } = {}) {
  const hote = hoteR2(config);
  const dateAmz = formaterDateAmz(maintenant);
  const dateCourte = dateAmz.slice(0, 8);
  const portee = porteeSignature(config, dateCourte);
  const uri = `/${config.bucket}/${cle}`;
  const empreinte = sha256Hex(octets);
  const enTetes = {
    host: hote,
    'x-amz-content-sha256': empreinte,
    'x-amz-date': dateAmz,
  };
  if (typeMime) enTetes['content-type'] = typeMime;
  const noms = Object.keys(enTetes).sort();
  const canoniqueEnTetes = noms.map((k) => `${k}:${enTetes[k]}\n`).join('');
  const canonique = [
    methode,
    uri,
    '',
    canoniqueEnTetes,
    noms.join(';'),
    empreinte,
  ].join('\n');
  const aSigner = ['AWS4-HMAC-SHA256', dateAmz, portee, sha256Hex(canonique)].join('\n');
  const signature = hmacSha256(cleSignatureR2(config, dateCourte), aSigner).toString('hex');
  return {
    url: `https://${hote}${uri}`,
    headers: {
      ...enTetes,
      Authorization: `AWS4-HMAC-SHA256 Credential=${config.accessKeyId}/${portee}, SignedHeaders=${noms.join(';')}, Signature=${signature}`,
    },
  };
}

/// Envoi d'un objet vers R2 (PUT signé). Lève une erreur quand
/// R2 refuse, avec son statut, sans jamais exposer la clé. Le
/// délai borne l'attente : un R2 qui ne répond pas ne bloque
/// jamais la publication indéfiniment.
export async function envoyerObjetR2(config, cle, octets, typeMime) {
  const { url, headers } = entetesSignesR2(config, 'PUT', cle, { octets, typeMime });
  const res = await fetch(url, { method: 'PUT', headers, body: octets, signal: AbortSignal.timeout(DELAI_ENVOI_R2_MS) });
  if (!res.ok) {
    const erreur = new Error(`Envoi R2 refusé (${res.status}).`);
    erreur.statusCode = res.status;
    throw erreur;
  }
}

/// Suppression d'un objet R2 (DELETE signé). Ne lève jamais
/// d'erreur : en purge, un objet déjà absent ne doit pas
/// bloquer la suppression de la ligne, sinon la trace resterait.
/// Le délai borne l'attente, un R2 lent ne retient pas la purge.
export async function supprimerObjetR2(config, cle) {
  try {
    const { url, headers } = entetesSignesR2(config, 'DELETE', cle);
    await fetch(url, { method: 'DELETE', headers, signal: AbortSignal.timeout(DELAI_SUPPRESSION_R2_MS) });
    return true;
  } catch {
    return false;
  }
}

/// Forme publique d'une story : l'application ne reçoit que
/// l'adresse signée temporaire, jamais la clé R2 ni l'auteur
/// sous forme d'identifiant.
export function formaterStoryPublique(ligne, url) {
  return {
    id: ligne.id,
    type: ligne.type,
    url,
    auteur_nom: ligne.auteur_nom ?? '',
    etablissement_nom: ligne.etablissement_nom ?? '',
    cree_le: ligne.cree_le instanceof Date ? ligne.cree_le.toISOString() : ligne.cree_le,
    expire_le: ligne.expire_le instanceof Date ? ligne.expire_le.toISOString() : ligne.expire_le,
  };
}
