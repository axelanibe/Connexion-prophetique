// Ouverture d'une salle Jitsi sur le web, 1er nov. 2026 : le SDK
// natif n'existe pas sur le web, la salle meet.jit.si s'ouvre donc
// dans un nouvel onglet du navigateur, avec le même nom de salle
// que sur téléphone.
import 'package:url_launcher/url_launcher.dart';

const String kJitsiServerUrl = 'https://meet.jit.si';

Future<void> joinReunionSalle({required String salle, required String nomAffiche}) async {
  await launchUrl(Uri.parse('$kJitsiServerUrl/$salle'), webOnlyWindowName: '_blank');
}
