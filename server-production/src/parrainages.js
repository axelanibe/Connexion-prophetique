// Parrainage d'un nouveau membre jusqu'au baptême, 21 nov.
// 2026, tranches 4 et 5 de l'audit du 17 nov. : la structure
// désigne un parrain pour un nouveau membre, le parrain voit
// ses filleuls et leur avancement, le filleul voit son
// parrain, la structure marque le baptême, ce qui clôt le
// parrainage. Aucun membre ni aucune date de baptême n'est
// inventé ici : les identifiants viennent du Bureau, la date
// du baptême est saisie au moment où il a lieu.
//
// Ce module ne contient que des constantes et des aides pures,
// sans accès base, pour être testé sans serveur ni base, comme
// src/chaine_priere.js et src/defis_priere.js. Les routes
// vivent dans server.js.

/// Statuts d'un parrainage, dans l'ordre de la vie du suivi.
export const STATUTS_PARRAINAGE = ['en cours', 'baptisé'];

/// Vrai quand la valeur est un UUID.
export function uuidValide(valeur) {
  return typeof valeur === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(valeur);
}

/// Vrai quand la chaîne est une date AAAA-MM-JJ réelle.
export function dateParrainageValide(valeur) {
  if (typeof valeur !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(valeur)) return false;
  const date = new Date(`${valeur}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === valeur;
}

/// Refus de désignation, null quand tout est bon. Les deux
/// membres sont obligatoires, distincts, et désignés par leur
/// identifiant, jamais par un nom saisi, pour ne jamais créer
/// un membre par erreur.
export function validerParrainage({ parrain_id, filleul_id }) {
  if (!uuidValide(parrain_id)) return { statut: 400, message: 'Le parrain est obligatoire.' };
  if (!uuidValide(filleul_id)) return { statut: 400, message: 'Le filleul est obligatoire.' };
  if (parrain_id === filleul_id) return { statut: 400, message: 'Le parrain et le filleul doivent être deux membres différents.' };
  return null;
}

/// Refus de marquage du baptême, null quand tout est bon. La
/// date est une date réelle, jamais dans le futur :
/// aujourdHui est injecté pour les tests.
export function validerBapteme({ date_bapteme }, aujourdHui = new Date().toISOString().slice(0, 10)) {
  if (!dateParrainageValide(date_bapteme)) return { statut: 400, message: 'La date du baptême est invalide.' };
  if (date_bapteme > aujourdHui) return { statut: 400, message: 'La date du baptême ne peut pas être dans le futur.' };
  return null;
}

/// Forme publique d'un parrainage : identifiants, noms
/// affichés tels que la carte les porte, dates et statut.
export function formaterParrainage(ligne) {
  return {
    id: ligne.id,
    parrain_id: ligne.parrain_id,
    parrain_nom: ligne.parrain_nom ?? '',
    filleul_id: ligne.filleul_id,
    filleul_nom: ligne.filleul_nom ?? '',
    date_debut: ligne.date_debut instanceof Date ? ligne.date_debut.toISOString().slice(0, 10) : String(ligne.date_debut ?? '').slice(0, 10),
    statut: ligne.statut,
    date_bapteme: ligne.date_bapteme == null
      ? null
      : (ligne.date_bapteme instanceof Date ? ligne.date_bapteme.toISOString().slice(0, 10) : String(ligne.date_bapteme).slice(0, 10)),
  };
}
