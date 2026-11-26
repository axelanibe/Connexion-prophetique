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

import crypto from 'node:crypto';

/// Catégories d'une publication, dans l'ordre du fil. La
// prière ne concerne que les sujets généraux, comme prions
// pour une nation ; le sujet personnel reste par e-mail.
export const CATEGORIES_MUR = Object.freeze(['temoignage', 'priere', 'verset', 'encouragement', 'enseignement', 'autre']);

/// Longueur maximale du texte, comme les témoignages.
export const LONGUEUR_MAX_TEXTE_MUR = 2000;

/// Taille maximale d'une photo décodée, comme la photo de profil.
export const TAILLE_MAX_PHOTO_MUR_OCTETS = 700 * 1024;

/// Nombre de publications renvoyées, les plus récentes.
export const LIMITE_MUR_PUBLICATIONS = 50;

/// Clé R2 d'une vidéo de publication, mur v2 tranche 2 :
/// dossier mur-videos, identifiant aléatoire, extension du
/// type réel. Une seule vidéo par publication, le nouvel
/// envoi remplace l'ancien objet. Aucune donnée membre dans
/// la clé, rien qui permette de deviner le contenu.
export function cleMurVideo(mime) {
  const ext = mime === 'video/quicktime' ? 'mov' : mime === 'video/webm' ? 'webm' : 'mp4';
  return `mur-videos/${crypto.randomUUID()}.${ext}`;
}

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
// La catégorie, quand elle est donnée, est l'une des 6 ; sans
// elle, la publication vaut 'autre'.
export function validerPublicationMur({ texte, photo, categorie }) {
  const textePropre = typeof texte === 'string' ? texte.trim() : '';
  if (categorie != null && categorie !== '' && !CATEGORIES_MUR.includes(categorie)) {
    return { statut: 400, message: 'Catégorie invalide.' };
  }
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

/// Profil public d'un membre du mur, mur v2 tranche 4 :
/// jamais le matricule, seulement le nom, la fonction,
/// l'établissement, la photo, la présentation, les compteurs
/// et mon suivi. La photo est l'adresse de données, comme
/// dans la route batch des auteurs.
export function formaterProfilMur(ligne) {
  const l = ligne ?? {};
  const nombre = (v) => (typeof v === 'number' ? v : Number.parseInt(v ?? '0', 10) || 0);
  return {
    id: l.id,
    nom_complet: l.nom_complet ?? '',
    fonction: l.fonction ?? '',
    etablissement_nom: l.etablissement_nom ?? '',
    photo: l.photo ?? null,
    presentation: l.presentation ?? '',
    inscrit_le: l.inscrit_le instanceof Date ? l.inscrit_le.toISOString() : (l.inscrit_le ?? null),
    nb_publications: nombre(l.nb_publications),
    nb_reactions: nombre(l.nb_reactions),
    nb_abonnes: nombre(l.nb_abonnes),
    nb_abonnements: nombre(l.nb_abonnements),
    suivi_par_moi: l.suivi_par_moi === true,
    est_moi: l.est_moi === true,
  };
}

/// Un membre d'une liste d'abonnés ou d'abonnements : nom
/// et établissement seulement, sans photo en liste, même
/// règle que la recherche messagerie.
export function formaterMembreSuivi(ligne) {
  const l = ligne ?? {};
  return {
    id: l.id,
    nom_complet: l.nom_complet ?? '',
    etablissement_nom: l.etablissement_nom ?? '',
  };
}

/// Publication publique, telle que renvoyée par les routes :
// jamais le matricule, seulement son nom, son établissement,
// le texte, la photo, la catégorie, les nombres de réactions
// par type, mon type de réaction, mon J'aime et mon droit de
// suppression. L'identifiant de l'auteur est renvoyé, il faut
// l'ouvrir le profil et suivre ; la photo de l'auteur passe
// par la route batch, jamais dans le fil.
export function formaterPublicationMur(ligne) {
  const l = ligne ?? {};
  const nombre = (v) => (typeof v === 'number' ? v : Number.parseInt(v ?? '0', 10) || 0);
  return {
    id: l.id,
    auteur_id: l.auteur_id ?? null,
    auteur_nom: l.auteur_nom ?? '',
    etablissement_nom: l.etablissement_nom ?? '',
    texte: l.texte ?? '',
    photo: l.photo ?? null,
    categorie: l.categorie ?? 'autre',
    statut_moderation: l.statut_moderation ?? 'visible',
    video: l.cle_r2_video
      ? {
          url: `/mur/${l.id}/video`,
          type_mime: l.type_mime_video ?? null,
          taille_octets: nombre(l.taille_video_octets),
        }
      : null,
    nb_jaime: nombre(l.nb_jaime),
    nb_amen: nombre(l.nb_amen),
    nb_priere: nombre(l.nb_priere),
    mon_type: l.mon_type ?? null,
    nb_commentaires: nombre(l.nb_commentaires),
    aime: l.mon_type != null ? true : l.aime === true,
    enregistre: l.enregistre === true,
    est_auteur: l.est_auteur === true,
    cree_le: l.cree_le instanceof Date ? l.cree_le.toISOString() : (l.cree_le ?? null),
  };
}
