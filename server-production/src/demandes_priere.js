// Demandes de prière avec suivi, 21 nov. 2026, tranches 1 à
// 3 de l'audit du 17 nov. : le membre envoie une demande et
// suit son statut, ouvert, en cours ou exaucée, avec une note
// de suivi ajoutée par le Bureau. Les sujets de prière par
// e-mail existent déjà et ne changent pas, ce suivi est un
// canal séparé, conservé en base.
//
// Ce module ne contient que des constantes et des aides pures,
// sans accès base, pour être testé sans serveur ni base, comme
// src/chaine_priere.js. Les routes vivent dans server.js.

/// Statuts d'une demande, dans l'ordre du suivi.
export const STATUTS_DEMANDE_PRIERE = ['ouvert', 'en cours', 'exaucée'];

/// Longueurs maximales des champs saisis.
export const LONGUEUR_MAX_TEXTE_DEMANDE_PRIERE = 2000;
export const LONGUEUR_MAX_NOTE_SUIVI = 1000;

/// Vrai quand le statut est l'un des trois suivis.
export function statutDemandePriereValide(statut) {
  return STATUTS_DEMANDE_PRIERE.includes(statut);
}

/// Refus d'envoi, null quand tout est bon. Le texte est
/// obligatoire.
export function validerDemandePriere({ texte }) {
  if (typeof texte !== 'string' || texte.trim() === '') return { statut: 400, message: 'Écris ta demande de prière avant d’envoyer.' };
  if (texte.trim().length > LONGUEUR_MAX_TEXTE_DEMANDE_PRIERE) return { statut: 400, message: 'Ta demande de prière est trop longue.' };
  return null;
}

/// Refus de suivi par le Bureau, null quand tout est bon. Le
/// statut est obligatoire et doit être l'un des trois suivis,
/// la note de suivi est facultative.
export function validerSuiviDemandePriere({ statut, note_suivi }) {
  if (!statutDemandePriereValide(statut)) return { statut: 400, message: 'Statut invalide : ouvert, en cours ou exaucée.' };
  if (note_suivi != null && typeof note_suivi !== 'string') return { statut: 400, message: 'La note de suivi est invalide.' };
  if (typeof note_suivi === 'string' && note_suivi.length > LONGUEUR_MAX_NOTE_SUIVI) return { statut: 400, message: 'La note de suivi est trop longue.' };
  return null;
}

/// Forme renvoyée : la demande, son statut et la note de
/// suivi. Le prénom du membre n'est joint que pour le Bureau,
/// jamais pour un autre membre.
export function formaterDemandePriere(ligne) {
  const forme = {
    id: ligne.id,
    texte: ligne.texte,
    statut: ligne.statut,
    note_suivi: ligne.note_suivi ?? '',
    cree_le: ligne.cree_le instanceof Date ? ligne.cree_le.toISOString() : String(ligne.cree_le ?? ''),
    modifie_le: ligne.modifie_le instanceof Date ? ligne.modifie_le.toISOString() : String(ligne.modifie_le ?? ''),
  };
  if (ligne.prenom != null) forme.prenom = ligne.prenom;
  return forme;
}
