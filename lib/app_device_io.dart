// Informations d'appareil sur téléphone, 29 oct. 2026 : modèle et
// système depuis device_info_plus, sans identifiant, sans donnée
// personnelle. En cas d'échec, repli sur le système Dart, qui ne
// donne que le nom du système, jamais un identifiant.
import 'dart:io';

import 'package:device_info_plus/device_info_plus.dart';

Future<Map<String, String>> deviceInfo() async {
  try {
    final plugin = DeviceInfoPlugin();
    if (Platform.isAndroid) {
      final d = await plugin.androidInfo;
      return {'modele': d.model, 'systeme': 'Android ${d.version.release}'};
    }
    if (Platform.isIOS) {
      final d = await plugin.iosInfo;
      return {'modele': d.model, 'systeme': 'iOS ${d.systemVersion}'};
    }
    return {'modele': Platform.operatingSystem, 'systeme': Platform.operatingSystemVersion};
  } catch (_) {
    return {'modele': Platform.operatingSystem, 'systeme': Platform.operatingSystemVersion};
  }
}
