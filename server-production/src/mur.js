// Mur des membres, carte 174, refonte totale tranche 2,
// carte 176, 24 nov. 2026 : publications écrites par les
// membres eux-mêmes, visibles par tous les membres, sans
// modération : motivation, conseil, témoignage, verset, photo.
// Les sujets de prière restent privés, par e-mail seulement,
// jamais sur le mur. Texte léger, 2000 caractères au plus comme
// les témoignages, photo plafonnée comme la photo de profil :
// réduite côté application, 700 Ko décodés au plus, JPEG, PNG ou
// WebP d'après ses premiers octets, gardée en base comme la
// photo de profil, pas de nouveau service. Les J'aime et les
// commentaires passent par les systèmes génériques, cible 'mur',
// un J'aime par membre, commentaires visibles par tous.
//
// Ce module ne contient que des constantes et des aides pures,
// sans accès base, pour être testé sans serveur ni base, comme
// src/temoignages.js. Les routes vivent dans server.js.

/// Longueur maximale du texte, comme les témoignages.
export const LONGUEUR_MAX_TEXTE_MUR = 2000;

/// Taille maximale d'une photo décodée, comme la photo de profil.
export const TAILLE_MAX_PHOTO_MUR_OCTETS = 700 * 1024;

/// Nombre de publications renvoyées, les plus récentes.
export const LIMITE_MUR_PUBLICATIONS = 50;

/// Vrai quand les octets sont une image JPEG, PNG ou WebP,
// d'après leurs premiers octets, comme pour /moi/photo.
export function estImageAutorisee(octets) {
  if (!octets || octets.length === 0) return false;
  const estJpeg = octets[0] === 0xff && octets[1] === 0xd8;
  const estPng = octets[0] === 0x89 && octets[1] === 0x50 && octets[2] === 0x4e && octets[3] === 0x47;
  const estWebp = octets.length > 11 &&
    octets.toString('ascii', 0, 4) === 'RIFF' &&
    octets.toString('ascii', 8, 12) === 'WEBP';
  return estJpeg || estPng || estWebp;
}

/// Refus de publication, null quand tout est bon. Un texte seul
// est accepté, une photo seule aussi, jamais les deux vides.
export function validerPublicationMur({ texte, photo }) {
  const textePropre = typeof texte === 'string' ? texte.trim() : '';
  if (textePropre.length > LONGUEUR_MAX_TEXTE_MUR) {
    return { statut: 400, message: 'Texte trop long : 2000 caractères au plus.' };
  }
  if (photo == null || photo === '') {
    if (textePropre.length === 0) return { statut: 400, message: 'Ajoutez un texte ou une photo.' };
    return null;
  }
  if (typeof photo !== 'string') return { statut: 400, message: 'Photo invalide.' };
  const m = /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=\r\n]+)$/.exec(photo);
  if (!m) return { statut: 400, message: 'Photo invalide : image JPEG, PNG ou WebP attendue.' };
  let octets;
  try {
    octets = Buffer.from(m[2], 'base64');
  } catch {
    return { statut: 400, message: 'Photo invalide.' };
  }
  if (octets.length === 0 || octets.length > TAILLE_MAX_PHOTO_MUR_OCTETS) {
    return { statut: 413, message: 'Photo trop volumineuse.' };
  }
  if (!estImageAutorisee(octets)) return { statut: 415, message: 'Type de photo non autorisé.' };
  return null;
}

/// Publication publique, telle que renvoyée par les routes :
// jamais l'identifiant de l'auteur, seulement son nom, son
// établissement, le texte, la photo, les nombres de J'aime et
// de commentaires, mon J'aime et mon droit de suppression.
export function formaterPublicationMur(ligne) {
  const l = ligne ?? {};
  return {
    id: l.id,
    auteur_nom: l.auteur_nom ?? '',
    etablissement_nom: l.etablissement_nom ?? '',
    texte: l.texte ?? '',
    photo: l.photo ?? null,
    nb_jaime: typeof l.nb_jaime === 'number' ? l.nb_jaime : Number.parseInt(l.nb_jaime ?? '0', 10) || 0,
    nb_commentaires: typeof l.nb_commentaires === 'number'
      ? l.nb_commentaires
      : Number.parseInt(l.nb_commentaires ?? '0', 10) || 0,
    aime: l.aime === true,
    est_auteur: l.est_auteur === true,
    cree_le: l.cree_le instanceof Date ? l.cree_le.toISOString() : (l.cree_le ?? null),
  };
}
