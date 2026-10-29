// Informations d'appareil, 29 oct. 2026 : modèle et système, sans
// identifiant, sans donnée personnelle. Sur téléphone, les vraies
// informations de l'appareil ; sur le web, le navigateur et le
// système, lus depuis l'agent utilisateur. Même patron d'export
// conditionnel que lib/link_view.dart.
export 'app_device_io.dart' if (dart.library.html) 'app_device_web.dart';
