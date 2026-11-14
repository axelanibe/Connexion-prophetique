// Fuseau IANA de l'appareil, carte 87, 7 nov. 2026.
// Sur le web seulement : Intl.DateTimeFormat()
// .resolvedOptions().timeZone donne « Europe/Paris »,
// « America/Toronto », « Africa/Abidjan ». Sur téléphone,
// rien : la langue porte déjà le pays, et le fuseau IANA
// n'est pas lisible sans ce branchement web.
export 'indicatif_zone_stub.dart' if (dart.library.js_interop) 'indicatif_zone_web.dart';
