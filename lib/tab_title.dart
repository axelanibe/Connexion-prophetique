// Titre de l'onglet du navigateur, 30 oct. 2026 :
// sur le web, le titre suit la section affichée ; sur téléphone,
// la fonction ne fait rien, sans aucun effet.
export 'tab_title_mobile.dart' if (dart.library.html) 'tab_title_web.dart';
