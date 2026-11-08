// Signature de l'administrateur, carte 96, 8 nov. 2026.
//
// La carte 95 gardait la signature dessinée en local seulement,
// sur l'appareil de l'administrateur, donc jamais sur un autre
// appareil et jamais sur l'attestation qu'un membre ouvre depuis
// son compte. Cette carte la fait passer côté serveur : une
// signature par administrateur, en base, rattachée à son compte
// utilisateurs, avec sa date de mise à jour.
//
// Portée honnête, inchangée : c'est une signature visuelle, pour
// les documents internes de la structure, pas une signature
// électronique certifiée au sens juridique, avec certificat et
// horodatage d'un tiers. Le passage côté serveur change où elle
// est gardée et qui la voit sur ses documents, pas sa valeur.
//
// Module pur, sans base : il est testé sans PostgreSQL, et
// server.js l'importe pour les routes /moi/signature et
// /moi/signatures/:matricule. L'image n'est jamais reprise dans
// le journal d'audit, seulement l'action, sans donnée d'image.
//
// Limite de taille : 200 Ko décodés. Un PNG de signature dessiné
// au doigt, 340 x 180, trait bleu nuit sur fond blanc, pèse
// quelques Ko, rarement plus de 30 Ko ; 200 Ko laisse une large
// marge pour un tracé dense, tout en refusant une image lourde
// ou un fichier déguisé en signature dans la colonne texte.

export const LIMITE_SIGNATURE_OCTETS = 200 * 1024;

/// Premiers octets d'un fichier PNG, signature du format.
const MAGIC_PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/// Décodage d'une image PNG en data URL. Renvoie les octets, ou
/// null quand la chaîne n'est pas une data URL PNG base64 valide.
/// Les espaces et retours à la ligne dans le base64 sont tolérés,
/// comme pour la photo de profil.
export function decoderSignaturePng(signature) {
  if (typeof signature !== 'string') return null;
  const m = /^data:image\/png;base64,([A-Za-z0-9+/=\r\n]+)$/.exec(signature.trim());
  if (!m) return null;
  let bytes;
  try {
    bytes = Buffer.from(m[1], 'base64');
  } catch {
    return null;
  }
  if (bytes.length === 0) return null;
  if (bytes.length < MAGIC_PNG.length || !bytes.subarray(0, MAGIC_PNG.length).equals(MAGIC_PNG)) return null;
  return bytes;
}

/// Refus d'un enregistrement de signature. Renvoie null quand
/// l'enregistrement est autorisé, sinon { statut, message }, dans
/// cet ordre : rôle non administrateur, 403, format invalide, 400,
/// image trop volumineuse, 413, type non PNG, 415. Le matricule
/// ne sert jamais à écrire celle d'un autre : la route lit
/// seulement req.user.sub, jamais un matricule du corps.
export function validerSignatureAdmin({ signature, role } = {}) {
  if (role !== 'admin_general' && role !== 'admin_etablissement') {
    return { statut: 403, message: 'Seuls les administrateurs signent les documents.' };
  }
  if (typeof signature !== 'string' || signature.trim() === '') {
    return { statut: 400, message: 'Signature invalide : image PNG attendue.' };
  }
  const m = /^data:image\/png;base64,([A-Za-z0-9+/=\r\n]+)$/.exec(signature.trim());
  if (!m) return { statut: 400, message: 'Signature invalide : image PNG attendue.' };
  let bytes;
  try {
    bytes = Buffer.from(m[1], 'base64');
  } catch {
    return { statut: 400, message: 'Signature invalide : image PNG attendue.' };
  }
  if (bytes.length === 0) return { statut: 400, message: 'Signature invalide : image PNG attendue.' };
  if (bytes.length > LIMITE_SIGNATURE_OCTETS) {
    return { statut: 413, message: 'Signature trop volumineuse.' };
  }
  if (bytes.length < MAGIC_PNG.length || !bytes.subarray(0, MAGIC_PNG.length).equals(MAGIC_PNG)) {
    return { statut: 415, message: 'Type de signature non autorisé : PNG seulement.' };
  }
  return null;
}

/// Matricule officiel, CP-AA-NNNN, tel qu'il est stocké en base.
/// Renvoie le matricule en majuscules, ou null quand la forme
/// ne correspond pas, pour refuser une recherche large.
export function normaliserMatriculeSignature(matricule) {
  if (typeof matricule !== 'string') return null;
  const v = matricule.trim().toUpperCase();
  return /^[A-Z]{2}-[A-Z]{2}-\d{4}$/.test(v) ? v : null;
}
