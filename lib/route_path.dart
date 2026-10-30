// Adresses réelles par section, 30 oct. 2026 : l'adresse du site suit
// la section affichée, comme un vrai site web, au lieu de rester
// constamment sur la racine. Sur le web seulement : sur téléphone,
// ces fonctions ne font rien et l'application garde son comportement.
// Chemins : / accueil, /bible, /librairie, /carte, /communaute, /plus.
// Chemin inconnu : repli sur l'accueil, sans page d'erreur.
export 'route_path_mobile.dart' if (dart.library.html) 'route_path_web.dart';
