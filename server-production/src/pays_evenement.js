// Carte 109, 8 nov. 2026 : pays d'une activité (événement).
// Le pays s'affiche après le lieu, « Lieu, Pays », partout où le
// lieu s'affiche : fiche, liste des camps, agenda, recherche et
// notification de publication. Un ancien événement sans pays
// affiche seulement le lieu, aucun pays deviné ni ajouté d'office.

/// Compose « Lieu, Pays » pour l'affichage et la notification.
/// Lieu seul si pas de pays, pays seul si pas de lieu, '' si aucun.
export function lieuPays(lieu, pays) {
  const l = typeof lieu === 'string' ? lieu.trim() : '';
  const p = typeof pays === 'string' ? pays.trim() : '';
  if (l && p) return `${l}, ${p}`;
  return l || p;
}

/// Un pays d'activité est une chaîne de 100 caractères au plus.
/// null et undefined valent absence, jamais une erreur. La liste
/// des 13 pays est imposée côté application, par la liste
/// déroulante ; le serveur ne fait que borner la taille.
export function paysEvenementValide(pays) {
  if (pays === null || pays === undefined) return true;
  return typeof pays === 'string' && pays.trim().length <= 100;
}
