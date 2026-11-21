// Témoignages, 17 nov. 2026, décision d'Axel : le cinquième
// onglet de la pilule, à la place de la Carte. Publication par
// le membre, modération par le Bureau : un témoignage publié
// est en attente, seuls les témoignages approuvés sont visibles
// dans le fil, l'auteur voit le statut des siens, le Bureau
// voit la file d'attente dans la page même. Médias sur R2, même
// compartiment que les stories, préfixe temoignages/, liens
// signés temporaires du serveur, jamais d'adresse brute. Sans
// clés R2 côté serveur, la page s'affiche avec un message clair
// et la publication est désactivée, sans erreur visible.
// Compositeur unique, 21 nov. 2026 : texte seul accepté, photo
// et audio en plus de la vidéo. Photo 5 Mo au plus comme les
// stories, vidéo 25 Mo et 60 s comme avant, audio 10 Mo et
// 5 minutes au plus, texte 2000 caractères au plus.
// La lecture se fait en plein écran, au toucher, comme les
// stories : le fil ne montre qu'une carte par témoignage.
import crypto from 'node:crypto';

/// Taille maximale acceptée : la vidéo est envoyée telle quelle,
/// courte, avec ce plafond, comme les stories.
export const TAILLE_MAX_VIDEO_TEMOIGNAGE_OCTETS = 25 * 1024 * 1024;

/// Taille maximale d'une photo, comme les stories.
export const TAILLE_MAX_PHOTO_TEMOIGNAGE_OCTETS = 5 * 1024 * 1024;

/// Taille maximale d'un audio, 10 Mo.
export const TAILLE_MAX_AUDIO_TEMOIGNAGE_OCTETS = 10 * 1024 * 1024;

/// Durée maximale d'un témoignage vidéo, vérifiée côté
/// application seulement, comme pour les stories : 60 secondes.
export const DUREE_MAX_VIDEO_TEMOIGNAGE_SECONDES = 60;

/// Durée maximale d'un témoignage audio, vérifiée côté
/// application seulement : 5 minutes.
export const DUREE_MAX_AUDIO_TEMOIGNAGE_SECONDES = 300;

/// Longueur maximale du texte, côté application et serveur.
export const LONGUEUR_MAX_TEXTE_TEMOIGNAGE = 2000;

export const MIMES_VIDEO_TEMOIGNAGE = Object.freeze(['video/mp4', 'video/quicktime', 'video/webm']);
export const MIMES_PHOTO_TEMOIGNAGE = Object.freeze(['image/jpeg', 'image/png', 'image/webp']);
export const MIMES_AUDIO_TEMOIGNAGE = Object.freeze(['audio/mp4', 'audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/x-m4a']);

/// États d'un témoignage, décidés : en attente à la publication,
/// approuvé visible dans le fil, refusé visible par son auteur
/// seulement.
export const STATUTS_TEMOIGNAGE = Object.freeze(['en_attente', 'approuve', 'refuse']);

const EXTENSION_MIME = Object.freeze({
  'video/mp4': 'mp4',
  'video/quicktime': 'mov',
  'video/webm': 'webm',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'audio/mp4': 'm4a',
  'audio/mpeg': 'mp3',
  'audio/ogg': 'ogg',
  'audio/wav': 'wav',
  'audio/x-m4a': 'm4a',
});

/// Vrai quand le statut est l'un des trois connus.
export function statutTemoignageValide(statut) {
  return STATUTS_TEMOIGNAGE.includes(statut);
}

/// Type de média depuis le type réel : photo, vidéo, audio, ou
/// texte quand il n'y a pas de média.
export function typeMediaDepuisMime(mime) {
  if (typeof mime !== 'string') return 'texte';
  if (mime.startsWith('image/')) return 'photo';
  if (mime.startsWith('video/')) return 'video';
  if (mime.startsWith('audio/')) return 'audio';
  return 'texte';
}

/// Clé d'objet dans le compartiment : le dossier témoignages,
/// un identifiant aléatoire, l'extension du type réel. Aucune
/// donnée membre dans la clé, rien qui permette de deviner le
/// contenu, comme les stories.
export function cleTemoignage(mime) {
  const ext = EXTENSION_MIME[mime] ?? 'mp4';
  return `temoignages/${crypto.randomUUID()}.${ext}`;
}

/// Refus de publication, null quand tout est bon. Le type réel
/// est vérifié par l'appelant dans les octets, jamais d'après
/// le nom ou l'en-tête envoyé : ici, seulement la cohérence
/// entre le type réel, la taille et le texte. Un texte seul est
/// accepté, sans média : mime null et texte non vide.
export function validerTemoignage({ mime, tailleOctets, texte }) {
  const textePropre = typeof texte === 'string' ? texte.trim() : '';
  if (textePropre.length > LONGUEUR_MAX_TEXTE_TEMOIGNAGE) {
    return { statut: 400, message: 'Texte trop long : 2000 caractères au plus.' };
  }
  if (mime == null) {
    if (textePropre.length === 0) return { statut: 400, message: 'Ajoutez un texte ou un média.' };
    return null;
  }
  const max = MIMES_PHOTO_TEMOIGNAGE.includes(mime)
    ? TAILLE_MAX_PHOTO_TEMOIGNAGE_OCTETS
    : MIMES_AUDIO_TEMOIGNAGE.includes(mime)
      ? TAILLE_MAX_AUDIO_TEMOIGNAGE_OCTETS
      : MIMES_VIDEO_TEMOIGNAGE.includes(mime)
        ? TAILLE_MAX_VIDEO_TEMOIGNAGE_OCTETS
        : null;
  if (max == null) return { statut: 415, message: 'Type de média non autorisé.' };
  if (!Number.isInteger(tailleOctets) || tailleOctets <= 0 || tailleOctets > max) {
    return { statut: 413, message: 'Média trop volumineux.' };
  }
  return null;
}

/// Forme publique d'un témoignage, comme formaterStoryPublique :
/// jamais la clé R2, jamais l'identifiant de l'auteur, seulement
/// le lien signé, le nom de l'auteur, l'établissement et le statut.
/// Le texte et le type de média sont renvoyés, le lien est vide
/// pour un texte seul.
export function formaterTemoignagePublic(ligne, url) {
  return {
    id: ligne.id,
    auteur_nom: ligne.auteur_nom ?? '',
    etablissement_nom: ligne.etablissement_nom ?? '',
    url,
    texte: ligne.texte ?? '',
    type_media: typeMediaDepuisMime(ligne.type_mime),
    statut: ligne.statut ?? 'en_attente',
    cree_le: ligne.cree_le ?? null,
  };
}
