// Fermeture de la page pendant un appel, hors web, carte 4.
// Pas de page à fermer sur APK : l'envoi de 'termine' à la
// fermeture passe par le cycle de vie de l'état global, jamais ici.
void enregistrerFermetureAppel(String appelId) {}

void annulerFermetureAppel() {}
