// Présence au culte, tranches 2 à 5, 21 nov. 2026.
//
// Tranche 2, temps forts du camp : moments publiés par la
// structure sur la page du camp, visibles par tous les membres.
// Tranche 3, J'aime et commentaires : un J'aime par membre et
// par cible, nombre visible, jamais de liste publique ; les
// commentaires sont visibles par tous, l'auteur supprime le
// sien, la structure supprime tout. Les cibles sont les temps
// forts, les témoignages et les publications du mur des membres,
// carte 174, 24 nov. 2026 : les enseignements et les méditations
// ont déjà leurs Amens, un J'aime dessus ferait doublon.
// Tranche 4, Mon mur : la page du Profil qui rassemble les
// dernières activités, enseignements, actualités et annonces,
// camps, témoignages, avec un partage par la feuille du système.
// Tranche 5, verset en storie : le verset du jour part comme une
// storie, par la carte du verset déjà capturée, sans route
// nouvelle, la publication passe par POST /stories.
//
// Ce module ne contient que des constantes et des aides pures,
// sans accès base, pour être testé sans serveur ni base, comme
// src/amens.js. Les routes vivent dans server.js.

/// Cibles possibles d'un J'aime ou d'un commentaire.
export const CIBLES_AIME = Object.freeze(['temps_fort', 'temoignage', 'mur']);

/// Types de réaction, mur v2 tranche 3 : un seul type par
/// membre et par cible, changeable. 'jaime' est le défaut,
/// pour les temps forts et les témoignages comme avant.
export const TYPES_REACTION = Object.freeze(['jaime', 'amen', 'priere']);

/// Mentions dans un commentaire, 5 au plus, mur v2 tranche 3.
export const NOMBRE_MAX_MENTIONS = 5;

/// Longueurs maximales des textes.
export const LONGUEUR_MAX_TITRE_TEMPS_FORT = 200;
export const LONGUEUR_MAX_TEXTE_TEMPS_FORT = 2000;
export const LONGUEUR_MAX_TEXTE_COMMENTAIRE = 1000;

/// Kinds d'éléments du mur, dans l'ordre de la décision.
export const KINDS_MUR = Object.freeze(['enseignement', 'actualite', 'annonce', 'camp', 'temoignage']);

/// Limites du mur : 20 par kind, 50 au total, les plus récents.
export const LIMITE_PAR_KIND_MUR = 20;
export const LIMITE_MUR = 50;

/// Vrai quand la chaîne est un uuid.
export function uuidValide(id) {
  return typeof id === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

/// Refus d'un temps fort, null quand tout est bon.
export function validerTempsFort({ titre, texte, image_id }) {
  if (typeof titre !== 'string' || titre.trim() === '' || titre.trim().length > LONGUEUR_MAX_TITRE_TEMPS_FORT) {
    return { statut: 400, message: 'Titre invalide : un titre de 1 à 200 caractères.' };
  }
  if (texte != null && (typeof texte !== 'string' || texte.length > LONGUEUR_MAX_TEXTE_TEMPS_FORT)) {
    return { statut: 400, message: 'Texte invalide : 2000 caractères au plus.' };
  }
  if (image_id != null && image_id !== '' && !uuidValide(image_id)) {
    return { statut: 400, message: 'Image invalide : un identifiant de fichier.' };
  }
  return null;
}

/// Refus d'un J'aime, null quand tout est bon. Le type, quand
/// il est donné, est l'un des trois, sinon 'jaime'.
export function validerAime({ cible_type, cible_id, type }) {
  if (!CIBLES_AIME.includes(cible_type)) return { statut: 400, message: 'La cible du J’aime est invalide.' };
  if (!uuidValide(cible_id)) return { statut: 400, message: 'La cible du J’aime est invalide.' };
  if (type != null && type !== '' && !TYPES_REACTION.includes(type)) return { statut: 400, message: 'Type de réaction invalide.' };
  return null;
}

/// Mentions normalisées, mur v2 tranche 3 : tableau de 5
/// identifiants au plus, dédupliqués, tous des uuid. Renvoie
/// {mentions} quand tout est bon, {refus} sinon. L'existence
/// en base est vérifiée par la route, pas ici.
export function normaliserMentions(mentions) {
  if (mentions == null) return { mentions: [] };
  if (!Array.isArray(mentions)) return { refus: { statut: 400, message: 'Mentions invalides.' } };
  if (mentions.length > NOMBRE_MAX_MENTIONS) return { refus: { statut: 400, message: '5 mentions au plus.' } };
  const uniques = [];
  for (const m of mentions) {
    if (!uuidValide(m)) return { refus: { statut: 400, message: 'Mention invalide.' } };
    if (!uniques.includes(m)) uniques.push(m);
  }
  return { mentions: uniques };
}

/// Refus d'une réponse à un commentaire, null quand tout est
/// bon. Le parent doit exister, viser la même cible et être
/// de premier niveau : une réponse ne peut pas avoir de
/// réponse, un seul niveau, comme décidé.
export function refusReponse(parent, { cible_type, cible_id }) {
  if (!parent) return { statut: 404, message: 'Commentaire parent introuvable.' };
  if (parent.cible_type !== cible_type || parent.cible_id !== cible_id) {
    return { statut: 400, message: 'Le commentaire parent vise une autre cible.' };
  }
  if (parent.parent_id != null) return { statut: 400, message: 'Une réponse ne peut pas avoir de réponse.' };
  return null;
}

/// Refus d'un commentaire, null quand tout est bon.
export function validerCommentaire({ cible_type, cible_id, texte }) {
  const refusCible = validerAime({ cible_type, cible_id });
  if (refusCible) return { statut: 400, message: refusCible.message.replace('J’aime', 'commentaire') };
  if (typeof texte !== 'string' || texte.trim() === '' || texte.trim().length > LONGUEUR_MAX_TEXTE_COMMENTAIRE) {
    return { statut: 400, message: 'Commentaire invalide : un texte de 1 à 1000 caractères.' };
  }
  return null;
}

/// Temps fort public, tel que renvoyé par les routes.
export function formaterTempsFort(row) {
  const r = row ?? {};
  return {
    id: r.id,
    evenement_id: r.evenement_id,
    titre: r.titre ?? '',
    texte: r.texte ?? '',
    image_id: r.image_id ?? '',
    publie_le: r.publie_le instanceof Date ? r.publie_le.toISOString() : (r.publie_le ?? null),
    cree_le: r.cree_le instanceof Date ? r.cree_le.toISOString() : (r.cree_le ?? null),
  };
}

/// Compte de réactions d'une cible, par type, avec mon type
/// ou non. 'nombre' et 'a_aime' sont gardés tels quels pour
/// les temps forts, les témoignages et l'ancienne application.
export function formaterCompteAime({ cible_type, cible_id, nombre, a_aime, nb_jaime, nb_amen, nb_priere, mon_type }) {
  const n = (v) => (typeof v === 'number' ? v : Number.parseInt(v ?? '0', 10) || 0);
  return {
    cible_type,
    cible_id,
    nombre: n(nombre),
    a_aime: a_aime === true,
    nb_jaime: n(nb_jaime),
    nb_amen: n(nb_amen),
    nb_priere: n(nb_priere),
    mon_type: mon_type ?? null,
  };
}

/// Commentaire public, avec son auteur et mon droit de
/// suppression : auteur ou structure, jamais la liste des
/// J'aime, qui reste un simple nombre. 'parent_id' est nul
/// pour un commentaire de premier niveau, renseigné pour une
/// réponse, mur v2 tranche 3.
export function formaterCommentaire(row) {
  const r = row ?? {};
  return {
    id: r.id,
    cible_type: r.cible_type,
    cible_id: r.cible_id,
    parent_id: r.parent_id ?? null,
    auteur_nom: r.auteur_nom ?? '',
    texte: r.texte ?? '',
    cree_le: r.cree_le instanceof Date ? r.cree_le.toISOString() : (r.cree_le ?? null),
    est_auteur: r.est_auteur === true,
  };
}

/// Date normalisée en chaîne ISO, pour trier les éléments du
/// mur : un objet Date devient ISO, une date AAAA-MM-JJ reste
/// telle quelle, le reste devient vide.
export function normaliserDateMur(date) {
  if (date instanceof Date) return date.toISOString();
  if (typeof date === 'string') return date;
  return '';
}

/// Élément du mur, une seule forme pour les cinq kinds.
export function formaterElementMur({ kind, id, titre, texte, date, auteur_nom, lieu }) {
  return {
    kind,
    id: id ?? '',
    titre: titre ?? '',
    texte: texte ?? '',
    date: normaliserDateMur(date),
    auteur_nom: auteur_nom ?? '',
    lieu: lieu ?? '',
  };
}

/// Éléments du mur triés du plus récent au plus ancien, 50 au
/// plus. Les dates sont des chaînes ISO ou AAAA-MM-JJ, le tri
/// lexicographique suffit.
export function trierElementsMur(elements) {
  return [...(elements ?? [])]
    .sort((a, b) => String(b.date ?? '').localeCompare(String(a.date ?? '')))
    .slice(0, LIMITE_MUR);
}
