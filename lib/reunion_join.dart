// Ouverture d'une salle de réunion en ligne, 1er nov. 2026 :
// sur téléphone (Android/iOS), la visioconférence Jitsi est
// intégrée à l'application ; sur le web, la salle meet.jit.si
// s'ouvre dans un onglet ; sur Windows (dart:io sans être un
// mobile), elle s'ouvre dans le navigateur. Même modèle que
// lib/link_view.dart : l'appelant ne connaît que joinReunionSalle.
export 'reunion_join_sdk.dart' if (dart.library.html) 'reunion_join_web.dart';
