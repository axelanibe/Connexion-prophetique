// Page de lecture d'un lien dans l'application, 28 oct. 2026 :
// sur telephone, une vue web integree ; sur le web, un cadre
// integre. Le lien ne sort jamais de l'application tout seul.
export 'link_view_mobile.dart' if (dart.library.html) 'link_view_web.dart';
