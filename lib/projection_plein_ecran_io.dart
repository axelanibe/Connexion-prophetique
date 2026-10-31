// Plein écran hors web, 31 oct. 2026 : le plein écran du navigateur
// n'existe pas ici (téléphone, Windows), donc demander renvoie
// toujours faux et quitter ne fait rien. La page reste affichée
// en grand, sans planter.
Future<bool> demanderPleinEcran() async => false;

Future<void> quitterPleinEcran() async {}
