// Stockage des octets d'un audio de Parole vivante, selon la
// plateforme : fichier dans le dossier de l'application sur
// téléphone, IndexedDB dans le navigateur sur le web. Même patron
// d'export conditionnel que lib/magnetophone_stockage.dart.
export 'stockage_audio_io.dart' if (dart.library.html) 'stockage_audio_web.dart';
