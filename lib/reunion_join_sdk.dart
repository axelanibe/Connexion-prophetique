// Ouverture d'une salle Jitsi sur téléphone (Android/iOS), 1er nov.
// 2026 : la visioconférence est intégrée à l'application via le SDK
// Jitsi, sans passer par une autre application. Le micro démarre
// coupé, la caméra ouverte, et le nom affiché est celui du membre.
// Sur Windows (dart:io sans être mobile), le SDK n'existe pas : la
// salle s'ouvre dans le navigateur, comme sur le web.
import 'dart:io' show Platform;

import 'package:jitsi_meet_flutter_sdk/jitsi_meet_flutter_sdk.dart';
import 'package:url_launcher/url_launcher.dart';

const String kJitsiServerUrl = 'https://meet.jit.si';

Future<void> joinReunionSalle({required String salle, required String nomAffiche}) async {
  final nom = nomAffiche.trim().isEmpty ? 'Membre' : nomAffiche.trim();
  if (!(Platform.isAndroid || Platform.isIOS)) {
    await launchUrl(Uri.parse('$kJitsiServerUrl/$salle'), mode: LaunchMode.externalApplication);
    return;
  }
  final options = JitsiMeetConferenceOptions(
    serverURL: kJitsiServerUrl,
    room: salle,
    userInfo: JitsiMeetUserInfo(displayName: nom),
    configOverrides: {
      'startWithAudioMuted': true,
      'startWithVideoMuted': false,
      'subject': 'Connexion Prophétique',
    },
    featureFlags: {
      FeatureFlags.welcomePageEnabled: false,
      FeatureFlags.preJoinPageEnabled: true,
      FeatureFlags.unsafeRoomWarningEnabled: false,
      FeatureFlags.chatEnabled: true,
      FeatureFlags.raiseHandEnabled: true,
      FeatureFlags.reactionsEnabled: true,
      FeatureFlags.recordingEnabled: false,
      FeatureFlags.liveStreamingEnabled: false,
    },
  );
  await JitsiMeet().join(options, JitsiMeetEventListener());
}
