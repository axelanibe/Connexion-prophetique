// Informations d'appareil sur le web, 29 oct. 2026 : navigateur et
// système depuis device_info_plus, sans identifiant, sans donnée
// personnelle. Le modèle d'un navigateur n'existe pas, le champ
// modèle porte donc « Navigateur web », et le système porte le
// navigateur et la plateforme.
import 'package:device_info_plus/device_info_plus.dart';

Future<Map<String, String>> deviceInfo() async {
  try {
    final data = (await DeviceInfoPlugin().webBrowserInfo).data;
    final browser = (data['browserName'] ?? '').toString();
    final platform = (data['platform'] ?? '').toString();
    final system = '$browser $platform'.trim();
    return {'modele': 'Navigateur web', 'systeme': system.isEmpty ? 'Web' : system};
  } catch (_) {
    return {'modele': 'Navigateur web', 'systeme': 'Web'};
  }
}
