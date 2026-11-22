// Borne de vraisemblance sur le taux de change PayPal, correctif
// B-17, 22 nov. 2026 : le taux vient de open.er-api.com, sans
// signature, HTTPS seul protège. Un taux hors fourchette est
// rejeté au lieu de fausser le montant en devise de la commande.
//
// Les taux sont des unités de devise pour 1 FCFA (sens renvoyé
// par er-api pour la base XOF). Fourchettes larges, environ
// +/- 50 % autour des valeurs usuelles de fin 2026, pour ne
// rejeter qu'un taux manifestement faux ou corrompu, jamais une
// variation normale du marché :
//   USD : 1 XOF vaut environ 0,0017 USD (1 USD vaut environ 590 FCFA)
//   GBP : 1 XOF vaut environ 0,0013 GBP (1 GBP vaut environ 790 FCFA)
//   CAD : 1 XOF vaut environ 0,0024 CAD (1 CAD vaut environ 420 FCFA)
//   CHF : 1 XOF vaut environ 0,0014 CHF (1 CHF vaut environ 730 FCFA)
// L'euro ne passe pas par ce service : 1 EUR = 655,957 FCFA, taux
// fixe de l'arrimage du franc CFA, calcul exact côté serveur.
export const TAUX_CHANGE_PLAUSIBLES = {
  USD: [0.001, 0.0025],
  GBP: [0.0008, 0.002],
  CAD: [0.0012, 0.0035],
  CHF: [0.0008, 0.0022],
};

export function tauxChangePlausible(devise, taux) {
  const fourchette = TAUX_CHANGE_PLAUSIBLES[devise];
  if (!fourchette) return false;
  if (typeof taux !== 'number' || !Number.isFinite(taux) || taux <= 0) return false;
  return taux >= fourchette[0] && taux <= fourchette[1];
}
