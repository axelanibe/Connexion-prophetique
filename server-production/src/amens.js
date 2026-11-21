// Réactions « Amen » sur méditations et enseignements, 21 nov.
// 2026, tranche 6 de l'audit du 17 nov. : un Amen par membre et
// par cible, bascule possible (retirer son Amen). La cible est
// une méditation, identifiée par sa référence livre:chapitre:
// verset dans la Bible embarquée, ou un enseignement, identifié
// par son identifiant serveur. Aucun texte n'est stocké ici,
// seulement la réaction.
//
// Ce module ne contient que des constantes et des aides pures,
// sans accès base, pour être testé sans serveur ni base, comme
// src/chaine_priere.js. Les routes vivent dans server.js.

/// Cibles possibles d'un Amen.
export const CIBLES_AMEN = ['méditation', 'enseignement'];

/// Longueur maximale de l'identifiant de cible.
export const LONGUEUR_MAX_CIBLE_ID_AMEN = 200;

/// Référence de méditation : livre 0 à 65, chapitre et verset
/// à partir de 1. Même numérotation que la Bible embarquée.
export function referenceMeditationValide(cibleId) {
  if (typeof cibleId !== 'string') return false;
  const parties = cibleId.split(':');
  if (parties.length !== 3) return false;
  const [livre, chapitre, verset] = parties.map((p) => Number(p));
  if (!parties.every((p) => /^\d+$/.test(p))) return false;
  if (!Number.isInteger(livre) || livre < 0 || livre > 65) return false;
  if (!Number.isInteger(chapitre) || chapitre < 1) return false;
  if (!Number.isInteger(verset) || verset < 1) return false;
  return true;
}

/// Identifiant d'enseignement : identifiant serveur, uuid.
export function identifiantEnseignementValide(cibleId) {
  return typeof cibleId === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cibleId);
}

/// Identifiant de cible valide pour son type, ou non.
export function cibleAmenValide(cibleType, cibleId) {
  if (cibleType === 'méditation') return referenceMeditationValide(cibleId);
  if (cibleType === 'enseignement') return identifiantEnseignementValide(cibleId);
  return false;
}

/// Refus d'enregistrement, null quand tout est bon.
export function validerAmen({ cible_type, cible_id }) {
  if (!CIBLES_AMEN.includes(cible_type)) return { statut: 400, message: 'La cible de l’Amen est invalide.' };
  if (typeof cible_id !== 'string' || cible_id.trim() === '') return { statut: 400, message: 'La cible de l’Amen est obligatoire.' };
  if (cible_id.length > LONGUEUR_MAX_CIBLE_ID_AMEN) return { statut: 400, message: 'La cible de l’Amen est trop longue.' };
  if (!cibleAmenValide(cible_type, cible_id)) return { statut: 400, message: 'La cible de l’Amen est invalide.' };
  return null;
}

/// Compte d'Amens d'une cible, avec mon Amen ou non.
export function formaterCompteAmen({ cible_type, cible_id, nombre, a_dit_amen }) {
  return {
    cible_type,
    cible_id,
    nombre: typeof nombre === 'number' ? nombre : Number.parseInt(nombre ?? '0', 10) || 0,
    a_dit_amen: a_dit_amen === true,
  };
}
