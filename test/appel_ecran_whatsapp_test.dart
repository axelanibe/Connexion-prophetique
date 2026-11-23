// Écran d'appel refait d'après le modèle WhatsApp, 21 nov. 2026.
// Grille en carte sombre, nom en Cinzel capitales, anneau d'or
// vivant autour de la photo, Terminer rouge au centre, sans
// Partager ni ajout de personne. Faux service WebRTC, fausse
// signalisation et faux client API : aucun micro, aucune caméra,
// aucun serveur réel.
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_webrtc/flutter_webrtc.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/appels.dart';
import 'package:connexion_prophetique/appels_screens.dart';
import 'package:connexion_prophetique/appels_webrtc.dart';
import 'package:connexion_prophetique/appels_ws.dart';
import 'package:connexion_prophetique/sonnerie_appel.dart';

Map<String, dynamic> _appelJson({
  String id = 'a1',
  String statut = 'sonne',
  String appelantId = 'autre',
  String appeleId = 'moi',
  String type = 'audio',
}) =>
    {
      'id': id,
      'conversation_id': 'c1',
      'appelant_id': appelantId,
      'appele_id': appeleId,
      'appelant_nom': 'Jean',
      'appele_nom': 'Moi',
      'type': type,
      'statut': statut,
      'cree_le': DateTime.now().toIso8601String(),
    };

/// Faux client API : ne touche jamais au réseau.
class FauxApiAppels extends ApiClient {
  FauxApiAppels({Map<String, dynamic>? appel})
      : _appel = appel ?? _appelJson();

  final Map<String, dynamic> _appel;
  final List<String> signauxEnvoyes = [];

  @override
  String? get membreId => 'moi';

  @override
  Future<Map<String, dynamic>> fetchAppel(String appelId) async =>
      Map<String, dynamic>.from(_appel);

  @override
  Future<Map<String, dynamic>> fetchAppelActifConversation(
    String conversationId,
  ) async =>
      {'appel': Map<String, dynamic>.from(_appel)};

  @override
  Future<List<Map<String, dynamic>>> fetchSignauxAppel(
    String appelId,
  ) async =>
      [];

  @override
  Future<Map<String, dynamic>> fetchConfigIce() async => {
        'ice_servers': [
          {
            'urls': ['stun:stun.l.google.com:19302'],
          },
        ],
      };

  @override
  Future<Map<String, dynamic>> envoyerSignalAppel(
    String appelId, {
    required String type,
    Map<String, dynamic> contenu = const {},
  }) async {
    signauxEnvoyes.add(type);
    return {'id': 'signal-${signauxEnvoyes.length}'};
  }
}

/// Faux service WebRTC : aucun micro, aucune caméra.
class FauxServiceAppel implements ServiceAppelWebRtc {
  bool prepareAppelee = false;
  void Function()? _rappelFluxDistant;
  bool muet = false;
  bool hautParleur = false;
  bool cameraActive = true;
  bool cameraBasculee = false;
  bool libere = false;

  /// Piste vidéo ajoutée en cours d'appel audio, carte 156.
  bool videoAjoutee = false;

  /// Partage d'écran en cours, carte 158.
  bool _ecranPartage = false;

  final RTCVideoRenderer _renduLocal = RTCVideoRenderer();
  final RTCVideoRenderer _renduDistant = RTCVideoRenderer();

  @override
  RTCVideoRenderer get renduLocal => _renduLocal;

  @override
  RTCVideoRenderer get renduDistant => _renduDistant;

  @override
  MediaStream? get fluxLocal => null;

  @override
  MediaStream? get fluxDistant => null;

  @override
  void quandCandidat(void Function(Map<String, dynamic>) rappel) {}

  @override
  void quandFluxDistant(void Function() rappel) {
    _rappelFluxDistant = rappel;
  }

  void declencherFluxDistant() => _rappelFluxDistant?.call();

  @override
  void quandConnexionPerdue(void Function() rappel) {}

  @override
  Future<void> ouvrirMicro({required bool video}) async {}

  @override
  Future<void> preparer({
    required bool video,
    required Map<String, dynamic> configIce,
  }) async {
    prepareAppelee = true;
  }

  @override
  Future<Map<String, dynamic>> creerOffre() async =>
      {'sdp': 'offre-sdp', 'type': 'offer'};

  @override
  Future<Map<String, dynamic>> creerReponse(
    Map<String, dynamic> offre,
  ) async =>
      {'sdp': 'reponse-sdp', 'type': 'answer'};

  @override
  Future<void> appliquerReponse(Map<String, dynamic> reponse) async {}

  @override
  Future<void> ajouterCandidat(Map<String, dynamic> candidat) async {}

  @override
  Future<void> setMuet(bool muet) async {
    this.muet = muet;
  }

  @override
  Future<void> setHautParleur(bool actif) async {
    hautParleur = actif;
  }

  @override
  Future<void> setCameraActive(bool active) async {
    cameraActive = active;
  }

  @override
  Future<void> basculerCamera() async {
    cameraBasculee = true;
  }

  @override
  Future<bool> ajouterPisteVideo() async {
    videoAjoutee = true;
    return true;
  }

  @override
  Future<Map<String, dynamic>?> ajouterVideo() async {
    final ok = await ajouterPisteVideo();
    if (!ok) return null;
    return {'sdp': 'offre-video-sdp', 'type': 'offer'};
  }

  @override
  bool get ecranPartage => _ecranPartage;

  @override
  void quandPartageTermine(void Function() rappel) {
    // Fin système non simulée : aucun test ne l'arrête de là.
  }

  @override
  Future<bool> partagerEcran() async {
    _ecranPartage = true;
    return true;
  }

  @override
  Future<void> arreterPartageEcran() async {
    _ecranPartage = false;
  }

  @override
  Future<void> liberer() async {
    libere = true;
  }
}

/// Fausse signalisation : les signaux sont injectés par le test.
class FausseSignalisation extends ClientSignalisationAppels {
  final StreamController<SignalAppel> _signaux =
      StreamController<SignalAppel>.broadcast();

  @override
  Stream<SignalAppel> get signaux => _signaux.stream;

  @override
  Future<void> connecter(String url, {String? jeton}) async {}

  void emettre(SignalAppel signal) => _signaux.add(signal);
}

/// Faux lecteur de sonnerie : enregistre les lectures et les arrêts.
class FauxLecteurSonnerie implements LecteurSonnerieAppel {
  @override
  Future<void> jouerEnBoucle(String asset) async {}

  @override
  Future<void> arreter() async {}

  @override
  Future<void> liberer() async {}
}

void main() {
  const canalPermissions =
      MethodChannel('flutter.baseflow.com/permissions/methods');

  setUp(() {
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
        .setMockMethodCallHandler(canalPermissions,
            (MethodCall call) async {
      if (call.method == 'requestPermissions') {
        final args = (call.arguments as List).cast<int>();
        return {for (final v in args) v: 1};
      }
      return null;
    });
  });

  tearDown(() {
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
        .setMockMethodCallHandler(canalPermissions, null);
  });

  Future<({FauxServiceAppel service, FauxApiAppels api})>
      _pomperAppeleeDecrochee(
    WidgetTester tester, {
    String type = 'audio',
  }) async {
    final fauxApi = FauxApiAppels(
      appel: _appelJson(appelantId: 'autre', appeleId: 'autre', type: type),
    );
    final fauxService = FauxServiceAppel();
    final fausseSignalisation = FausseSignalisation();
    await tester.pumpWidget(
      MaterialApp(
        home: EcranAppelEnCours(
          appelId: 'a1',
          typeAppel: type,
          autreNom: 'Jean',
          suisAppelant: false,
          apiClient: fauxApi,
          serviceAppel: fauxService,
          signalisation: fausseSignalisation,
          lecteurSonnerie: FauxLecteurSonnerie(),
        ),
      ),
    );
    await tester.pump();
    await tester.pump();
    await tester.pump();
    fausseSignalisation.emettre(
      SignalAppel(
        id: 's1',
        appelId: 'a1',
        emetteurId: 'autre',
        type: 'offre',
        contenu: {'sdp': 'offre-sdp', 'type': 'offer'},
        creeLe: DateTime.now(),
      ),
    );
    await tester.pump();
    await tester.pump();
    await tester.pump();
    expect(find.text('Appel en cours… 00:00'), findsOneWidget);
    return (service: fauxService, api: fauxApi);
  }

  testWidgets('grille WhatsApp : nom en Cinzel, cinq boutons, sans Partager',
      (tester) async {
    await _pomperAppeleeDecrochee(tester);
    // Nom en capitales, police Cinzel de l'en-tête.
    expect(find.text('JEAN'), findsOneWidget);
    final nom = tester.widget<Text>(find.text('JEAN'));
    expect(nom.style?.fontFamily, 'Cinzel');
    // Les cinq boutons du modèle, sans Partager.
    expect(find.text('Haut-parleur'), findsOneWidget);
    expect(find.text('Appel vidéo'), findsOneWidget);
    expect(find.text('Muet'), findsOneWidget);
    expect(find.text('Plus'), findsOneWidget);
    expect(find.text('Terminer'), findsOneWidget);
    expect(find.text('Partager'), findsNothing);
    expect(find.text('Raccrocher'), findsNothing);
    // Pas d'ajout de personne, appels à deux seulement.
    expect(find.byIcon(Icons.person_add), findsNothing);
    // Sans photo, les initiales sur fond or.
    expect(find.text('J'), findsOneWidget);
    // L'anneau respire sans planter quand le temps avance.
    await tester.pump(const Duration(seconds: 2));
    await tester.pump(const Duration(seconds: 2));
    expect(find.text('JEAN'), findsOneWidget);
  });

  testWidgets('audio : Appel vidéo bascule en vidéo, offre envoyée',
      (tester) async {
    // Carte 156 : le bouton ne dit plus que la vidéo est
    // indisponible, il bascule vraiment, une nouvelle offre part.
    final pompe = await _pomperAppeleeDecrochee(tester);
    expect(find.byIcon(Icons.switch_camera), findsNothing);
    await tester.tap(find.byIcon(Icons.videocam));
    await tester.pump();
    await tester.pump();
    expect(pompe.service.videoAjoutee, isTrue);
    expect(pompe.api.signauxEnvoyes, contains('offre'));
    expect(
      find.text('La vidéo n’est pas disponible pendant un appel audio.'),
      findsNothing,
    );
    // L'écran est passé en vidéo : le bouton de retournement
    // de la fenêtre locale est visible.
    expect(find.byIcon(Icons.switch_camera), findsOneWidget);
  });

  testWidgets('vidéo : Plus propose le partage d’écran, puis l’arrêt',
      (tester) async {
    // Carte 158 : le partage est sous Plus, il remplace la
    // caméra, Arrêter le partage revient à la caméra. Le tap
    // vise l'icône, pas le libellé sous le bouton.
    final pompe = await _pomperAppeleeDecrochee(tester, type: 'video');
    await tester.tap(find.byIcon(Icons.more_horiz));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 400));
    expect(find.text('Partager l’écran'), findsOneWidget);
    await tester.tap(find.text('Partager l’écran'));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 500));
    expect(pompe.service.ecranPartage, isTrue);
    await tester.tap(find.byIcon(Icons.more_horiz));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 400));
    expect(find.text('Arrêter le partage'), findsOneWidget);
    await tester.tap(find.text('Arrêter le partage'));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 500));
    expect(pompe.service.ecranPartage, isFalse);
  });

  testWidgets('vidéo : le bouton de la fenêtre locale retourne la caméra',
      (tester) async {
    // Carte 159 : petit bouton sur la fenêtre vidéo locale, en
    // plus de Plus puis Basculer.
    final pompe = await _pomperAppeleeDecrochee(tester, type: 'video');
    await tester.tap(find.byIcon(Icons.switch_camera));
    await tester.pump();
    expect(pompe.service.cameraBasculee, isTrue);
  });

  testWidgets('vidéo : Appel vidéo coupe et remet la caméra',
      (tester) async {
    final fauxApi = FauxApiAppels(
      appel: _appelJson(appelantId: 'autre', appeleId: 'autre', type: 'video'),
    );
    final fauxService = FauxServiceAppel();
    final fausseSignalisation = FausseSignalisation();
    await tester.pumpWidget(
      MaterialApp(
        home: EcranAppelEnCours(
          appelId: 'a1',
          typeAppel: 'video',
          autreNom: 'Jean',
          suisAppelant: false,
          apiClient: fauxApi,
          serviceAppel: fauxService,
          signalisation: fausseSignalisation,
          lecteurSonnerie: FauxLecteurSonnerie(),
        ),
      ),
    );
    await tester.pump();
    await tester.pump();
    await tester.pump();
    expect(fauxService.prepareAppelee, isTrue);
    expect(find.byIcon(Icons.videocam), findsOneWidget);
    await tester.tap(find.byIcon(Icons.videocam));
    await tester.pump();
    expect(fauxService.cameraActive, isFalse);
    expect(find.byIcon(Icons.videocam_off), findsOneWidget);
    await tester.tap(find.byIcon(Icons.videocam_off));
    await tester.pump();
    expect(fauxService.cameraActive, isTrue);
  });

  testWidgets('Plus : feuille avec Réduire, qui quitte sans raccrocher',
      (tester) async {
    await _pomperAppeleeDecrochee(tester);
    await tester.tap(find.byIcon(Icons.more_horiz));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 400));
    // En audio, la feuille ne propose que Réduire.
    expect(find.byType(ListTile), findsOneWidget);
    await tester.tap(find.byType(ListTile));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 400));
    await tester.pump();
    await tester.pump(const Duration(seconds: 1));
    await tester.pump(const Duration(seconds: 1));
    expect(find.byType(EcranAppelEnCours), findsNothing);
  });
}
