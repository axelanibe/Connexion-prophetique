// Plein écran de la projection, 31 oct. 2026, web ordinateur seulement.
// Même modèle d'export conditionnel que verse_share_download.dart :
// le vrai plein écran du navigateur n'existe que sur le web
// (dart:html) ; ailleurs, demander ne fait rien et renvoie faux,
// quitter ne fait rien. La page de projection reste lisible sans
// plein écran, sur toute plateforme.
export 'projection_plein_ecran_io.dart' if (dart.library.html) 'projection_plein_ecran_web.dart';
