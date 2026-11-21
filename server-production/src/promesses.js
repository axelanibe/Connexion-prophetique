// Carnet de Promesses, 21 nov. 2026, tranches 1 à 3 de
// l'audit du 17 nov. : carnet personnel du membre, il y
// enregistre des promesses, une référence de verset existante,
// une note personnelle et une date. Le carnet n'est visible
// que par son membre, jamais partagé. Le texte du verset
// n'est jamais inventé ni stocké côté serveur : il vient de
// la Bible embarquée dans l'application, à partir de la
// référence saisie, sinon le champ texte reste saisi par le
// membre lui-même.
//
// Ce module ne contient que des constantes et des aides pures,
// sans accès base, pour être testé sans serveur ni base, comme
// src/chaine_priere.js. Les routes vivent dans server.js.

/// Longueurs maximales des champs saisis.
export const LONGUEUR_MAX_REFERENCE_PROMESSE = 120;
export const LONGUEUR_MAX_NOTE_PROMESSE = 1000;
export const LONGUEUR_MAX_TEXTE_PROMESSE = 2000;

/// Refus d'enregistrement, null quand tout est bon. La
/// référence est obligatoire, la note et le texte saisi sont
/// facultatifs.
export function validerPromesse({ reference, note, texte }) {
  if (typeof reference !== 'string' || reference.trim() === '') return { statut: 400, message: 'La référence du verset est obligatoire.' };
  if (reference.trim().length > LONGUEUR_MAX_REFERENCE_PROMESSE) return { statut: 400, message: 'La référence du verset est trop longue.' };
  if (note != null && typeof note !== 'string') return { statut: 400, message: 'La note est invalide.' };
  if (typeof note === 'string' && note.length > LONGUEUR_MAX_NOTE_PROMESSE) return { statut: 400, message: 'La note est trop longue.' };
  if (texte != null && typeof texte !== 'string') return { statut: 400, message: 'Le texte est invalide.' };
  if (typeof texte === 'string' && texte.length > LONGUEUR_MAX_TEXTE_PROMESSE) return { statut: 400, message: 'Le texte est trop long.' };
  return null;
}

/// Forme renvoyée au membre : sa promesse seulement, jamais
/// celle d'un autre membre, le serveur filtre par membre_id.
export function formaterPromesse(ligne) {
  return {
    id: ligne.id,
    reference: ligne.reference,
    note: ligne.note ?? '',
    texte: ligne.texte ?? '',
    cree_le: ligne.cree_le instanceof Date ? ligne.cree_le.toISOString() : String(ligne.cree_le ?? ''),
  };
}
