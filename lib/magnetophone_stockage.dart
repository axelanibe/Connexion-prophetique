// Stockage des octets d'un enregistrement, selon la plateforme :
// fichier dans le dossier de l'application sur téléphone,
// IndexedDB dans le navigateur sur le web. Même patron d'export
// conditionnel que lib/link_view.dart.
export 'magnetophone_stockage_io.dart' if (dart.library.html) 'magnetophone_stockage_web.dart';
