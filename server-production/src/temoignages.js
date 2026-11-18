// Témoignages vidéo, 17 nov. 2026, décision d'Axel : le
// cinquième onglet de la pilule, à la place de la Carte.
// Publication par le membre, modération par le Bureau : un
// témoignage publié est en attente, seuls les témoignages
// approuvés sont visibles dans le fil, l'auteur voit le statut
// des siens. Médias sur Cloudflare R2, compartiment privé,
// jamais public : l'application ne voit que des liens signés
// temporaires générés par le serveur, comme les stories.
// Les clés R2 se lisent uniquement depuis les variables
// d'environnement Render (R2_ACCOUNT_ID, R2_ACCESS_KEY_ID,
// R2_SECRET_ACCESS_KEY, R2_BUCKET), jamais en dur, jamais dans
// le dépôt. Sans elles, les témoignages sont désactivés
// proprement : la liste est vide, l'envoi refuse, sans erreur
// visible côté membre.
//
// Ce module ne contient que des constantes et des aides pures,
// sans accès base, pour être testé sans serveur ni base, comme
// src/stories.js. Les routes vivent dans server.js. La signature
// R2, l'envoi et la suppression d'objets sont réutilisés depuis
// src/stories.js (configR2, urlSigneeR2, envoyerObjetR2,
// supprimerObjetR2).

import crypto from 'node:crypto';

/// Taille maximale acceptée : la vidéo est envoyée telle quelle,
/// courte, avec ce plafond, comme les stories.
export const TAILLE_MAX_VIDEO_TEMOIGNAGE_OCTETS = 25 * 1024 * 1024;

/// Durée maximale d'un témoignage, vérifiée côté application
/// seulement, comme pour les stories : 60 secondes.
export const DUREE_MAX_VIDEO_TEMOIGNAGE_SECONDES = 60;

export const MIMES_VIDEO_TEMOIGNAGE = Object.freeze(['video/mp4', 'video/quicktime', 'video/webm']);

/// États d'un témoignage, décidés : en attente à la publication,
/// approuvé visible dans le fil, refusé visible par son auteur
/// seulement.
export const STATUTS_TEMOIGNAGE = Object.freeze(['en_attente', 'approuve', 'refuse']);

const EXTENSION_MIME = Object.freeze({
  'video/mp4': 'mp4',
  'video/quicktime': 'mov',
  'video/webm': 'webm',
});

/// Vrai quand le statut est l'un des trois connus.
export function statutTemoignageValide(statut) {
  return STATUTS_TEMOIGNAGE.includes(statut);
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
/// entre le type réel et la taille.
export function validerTemoignage({ mime, tailleOctets }) {
  if (!MIMES_VIDEO_TEMOIGNAGE.includes(mime)) return { statut: 415, message: 'Type de média non autorisé.' };
  if (!Number.isInteger(tailleOctets) || tailleOctets <= 0 || tailleOctets > TAILLE_MAX_VIDEO_TEMOIGNAGE_OCTETS) {
    return { statut: 413, message: 'Média trop volumineux.' };
  }
  return null;
}

/// Forme publique d'un témoignage, comme formaterStoryPublique :
/// jamais la clé R2, jamais l'identifiant de l'auteur, seulement
/// le lien signé, le nom de l'auteur, l'établissement et le statut.
export function formaterTemoignagePublic(ligne, url) {
  return {
    id: ligne.id,
    auteur_nom: ligne.auteur_nom ?? '',
    etablissement_nom: ligne.etablissement_nom ?? '',
    url,
    statut: ligne.statut ?? 'en_attente',
    cree_le: ligne.cree_le ?? null,
  };
}
