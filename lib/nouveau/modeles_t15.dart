// État de la carte de membre, tranche T15, 26 nov. 2026.
// La carte ne disparaît plus quand elle n'est pas payée :
// elle s'affiche verrouillée, cadenas doré, avec le bouton
// de paiement. Le verrou se lève au paiement, la validation
// par la structure suit, puis la carte devient normale.
// Le paiement se lit dans GET /moi/paiements, la validation
// dans statut_adhesion de GET /moi : en_attente, validee,
// suspendue. Une adhésion suspendue reste en attente de
// validation, jamais verrouillée pour non-paiement.
enum EtatCarte { verrouillee, enAttente, validee }

/// Dérivation de l'état : le paiement est la première porte,
/// la validation la seconde. Sans paiement confirmé, la carte
/// reste verrouillée, même si l'adhésion est déjà validée.
EtatCarte etatCarteDepuis({
  required bool cartePayee,
  required String statutAdhesion,
}) {
  if (!cartePayee) return EtatCarte.verrouillee;
  if (statutAdhesion == 'validee') return EtatCarte.validee;
  return EtatCarte.enAttente;
}
