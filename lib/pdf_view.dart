// Visualiseur PDF intégré, carte 121, 10 nov. 2026 : le
// certificat d'adhésion et les attestations s'affichent dans
// l'application, comme la page Carte montre la carte de membre.
// Sur téléphone, le PDF s'affiche par le visualiseur natif
// (flutter_pdfview) ; sur le web, le navigateur l'affiche dans
// un cadre intégré ; sur ordinateur Windows, pas de visualiseur
// intégré, le document se télécharge. Même nom de widget des
// deux côtés, comme print_doc.dart.
export 'pdf_view_mobile.dart' if (dart.library.html) 'pdf_view_web.dart';
