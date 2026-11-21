// Carte 2, 21 nov. 2026 : bascule haut-parleur / écouteur,
// double sonnerie et écho. Écrans avec faux service WebRTC et
// fausse signalisation, service réel pour les contraintes
// getUserMedia, canal natif moqué : aucun micro, aucune caméra,
// aucun serveur réel. Ne touche pas au WAV : la sonnerie
// classique attend le choix d'Axel entre trois variantes.
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
class _FauxApi extends ApiClient {
  _FauxApi({Map<String, dynamic>? appel})
      : _appel = appel ?? _appelJson();

  final Map<String, dynamic> _appel;
  final List<String> signauxEnvoyes = [];

  @override
  String? get membreId => 'moi';

  @override
  Future<Map<String, dynamic>> fetchAppel(String appelId) async =>
      Map<String, dynamic>.from(_appel);

  @override
  Future<Map<String, dynamic>> fetchConfigIce() async => {
        'ice_servers': [
          {
            'urls': ['stun:stun.l.google.com:19302'],
          },
        ],
      };

  @override
  Future<List<Map<String, dynamic>>> fetchSignauxAppel(
    String appelId,
  ) async =>
      [];

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

/// Faux service WebRTC : enregistre chaque bascule haut-parleur.
class _FauxService implements ServiceAppelWebRtc {
  bool prepareAppelee = false;
  bool microOuvert = false;
  void Function()? _rappelFluxDistant;
  bool muet = false;
  bool hautParleur = false;

  /// Chaque appel à setHautParleur, dans l'ordre.
  final List<bool> hautParleurAppels = [];
  bool libere = false;

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

  /// Simule l'arrivée du flux distant, comme le ferait le pair.
  void declencherFluxDistant() => _rappelFluxDistant?.call();

  @override
  void quandConnexionPerdue(void Function() rappel) {}

  @override
  Future<void> ouvrirMicro({required bool video}) async {
    microOuvert = true;
  }

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
    hautParleurAppels.add(actif);
  }

  @override
  Future<void> setCameraActive(bool active) async {}

  @override
  Future<void> basculerCamera() async {}

  @override
  Future<void> liberer() async {
    libere = true;
  }
}

/// Fausse signalisation : les signaux sont injectés par le test.
class _FausseSignalisation extends ClientSignalisationAppels {
  final StreamController<SignalAppel> _signaux =
      StreamController<SignalAppel>.broadcast();

  @override
  Stream<SignalAppel> get signaux => _signaux.stream;

  @override
  Future<void> connecter(String url) async {}

  void emettre(SignalAppel signal) => _signaux.add(signal);
}

/// Faux lecteur de sonnerie : enregistre les lectures et les arrêts.
class _FauxLecteur implements LecteurSonnerieAppel {
  final List<String> joues = [];
  int arrets = 0;

  @override
  Future<void> jouerEnBoucle(String asset) async {
    joues.add(asset);
  }

  @override
  Future<void> arreter() async {
    arrets++;
  }

  @override
  Future<void> liberer() async {}
}

void main() {
  const canalPermissions =
      MethodChannel('flutter.baseflow.com/permissions/methods');

  Future<dynamic> Function(MethodCall) permissionsAccordees() =>
      (MethodCall call) async {
        if (call.method == 'requestPermissions') {
          final args = (call.arguments as List).cast<int>();
          return {for (final v in args) v: 1};
        }
        return null;
      };

  group('Bascule haut-parleur réappliquée', () {
    setUp(() {
      TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
          .setMockMethodCallHandler(
        canalPermissions,
        permissionsAccordees(),
      );
    });

    tearDown(() {
      TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
          .setMockMethodCallHandler(canalPermissions, null);
    });

    testWidgets(
        'appelée : la bascule survit à l’arrivée du flux distant',
        (tester) async {
      final fauxApi = _FauxApi();
      final fauxService = _FauxService();
      final fausseSignalisation = _FausseSignalisation();
      await tester.pumpWidget(
        MaterialApp(
          home: EcranAppelEnCours(
            appelId: 'a1',
            typeAppel: 'audio',
            autreNom: 'Jean',
            suisAppelant: false,
            apiClient: fauxApi,
            serviceAppel: fauxService,
            signalisation: fausseSignalisation,
            lecteurSonnerie: _FauxLecteur(),
          ),
        ),
      );
      await tester.pump();
      await tester.pump();
      await tester.pump();
      expect(fauxService.prepareAppelee, isTrue);
      // Côté appelée comme côté appelant, le haut-parleur est
      // forcé pendant la sonnerie.
      expect(fauxService.hautParleurAppels, contains(true));
      expect(fauxService.hautParleurAppels.last, isTrue);
      // Arrivée du flux distant : la route voulue est réappliquée.
      final appelsAvant = fauxService.hautParleurAppels.length;
      fauxService.declencherFluxDistant();
      await tester.pump();
      expect(fauxService.hautParleurAppels.length,
          greaterThan(appelsAvant));
      expect(fauxService.hautParleurAppels.last, isTrue);
      // L'utilisatrice coupe le haut-parleur : son choix est
      // réappliqué à l'arrivée suivante du flux, pas écrasé.
      await tester.tap(find.byIcon(Icons.volume_up));
      await tester.pump();
      expect(fauxService.hautParleur, isFalse);
      expect(fauxService.hautParleurAppels.last, isFalse);
      fauxService.declencherFluxDistant();
      await tester.pump();
      await tester.pump();
      expect(fauxService.hautParleurAppels.last, isFalse);
      // Décrochage : le choix de l'utilisatrice est gardé, le
      // haut-parleur n'est pas coupé ni remis.
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
      expect(fauxApi.signauxEnvoyes, contains('reponse'));
      expect(find.text('Appel en cours… 00:00'), findsOneWidget);
      expect(fauxService.hautParleurAppels.last, isFalse);
    });

    testWidgets(
        'appelant : le haut-parleur forcé revient à l’écouteur '
        'au décrochage', (tester) async {
      final fauxApi = _FauxApi(
        appel: _appelJson(appelantId: 'moi', appeleId: 'autre'),
      );
      final fauxService = _FauxService();
      final fausseSignalisation = _FausseSignalisation();
      await tester.pumpWidget(
        MaterialApp(
          home: EcranAppelEnCours(
            appelId: 'a1',
            typeAppel: 'audio',
            autreNom: 'Jean',
            suisAppelant: true,
            apiClient: fauxApi,
            serviceAppel: fauxService,
            signalisation: fausseSignalisation,
            lecteurSonnerie: _FauxLecteur(),
          ),
        ),
      );
      await tester.pump();
      await tester.pump();
      await tester.pump();
      expect(fauxService.prepareAppelee, isTrue);
      expect(fauxService.hautParleurAppels.last, isTrue);
      // Réponse de l'appelé : décrochage, retour à l'écouteur
      // parce que l'utilisateur n'a rien touché.
      fausseSignalisation.emettre(
        SignalAppel(
          id: 's1',
          appelId: 'a1',
          emetteurId: 'autre',
          type: 'reponse',
          contenu: {'sdp': 'reponse-sdp', 'type': 'answer'},
          creeLe: DateTime.now(),
        ),
      );
      await tester.pump();
      await tester.pump();
      await tester.pump();
      expect(find.text('Appel en cours… 00:00'), findsOneWidget);
      expect(fauxService.hautParleur, isFalse);
      expect(fauxService.hautParleurAppels.last, isFalse);
    });
  });

  group('Contraintes audio getUserMedia', () {
    const canalWebRtc = MethodChannel('FlutterWebRTC.Method');
    Map<String, dynamic>? contraintesRecues;

    setUp(() {
      contraintesRecues = null;
      TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
          .setMockMethodCallHandler(canalWebRtc,
              (MethodCall call) async {
        switch (call.method) {
          case 'createVideoRenderer':
            return {'textureId': 1};
          case 'getUserMedia':
            contraintesRecues = Map<String, dynamic>.from(
              (call.arguments as Map)['constraints'] as Map,
            );
            return {
              'streamId': 'flux-test',
              'audioTracks': [
                {
                  'id': 'piste-audio',
                  'label': 'micro',
                  'kind': 'audio',
                  'enabled': true,
                },
              ],
              'videoTracks': <Map<String, dynamic>>[],
            };
          default:
            return null;
        }
      });
    });

    tearDown(() {
      TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
          .setMockMethodCallHandler(canalWebRtc, null);
    });

    test('ouvrirMicro demande les trois contraintes audio à vrai',
        () async {
      final service = ServiceAppelWebRtcReel();
      await service.ouvrirMicro(video: false);
      expect(contraintesRecues, isNotNull);
      expect(
        contraintesRecues!['audio'],
        {
          'echoCancellation': true,
          'noiseSuppression': true,
          'autoGainControl': true,
        },
      );
      expect(contraintesRecues!['video'], isFalse);
      expect(service.fluxLocal, isNotNull);
      await service.liberer();
    });
  });

  group('Écran entrant accepté via CallKit', () {
    testWidgets('pas de WAV, accepte envoyé, écran en cours ouvert',
        (tester) async {
      final fauxApi = _FauxApi();
      final fauxLecteur = _FauxLecteur();
      await tester.pumpWidget(
        MaterialApp(
          home: EcranAppelEntrant(
            appelId: 'a1',
            appelantNom: 'Jean',
            typeAppel: 'audio',
            conversationId: 'c1',
            monMembreId: 'moi',
            apiClient: fauxApi,
            lecteurSonnerie: fauxLecteur,
            accepteViaCallKit: true,
          ),
        ),
      );
      await tester.pump();
      await tester.pump();
      await tester.pump();
      await tester.pump();
      // L'écran système a déjà sonné : le WAV ne se relance pas.
      expect(fauxLecteur.joues, isEmpty);
      expect(fauxApi.signauxEnvoyes, contains('accepte'));
      expect(find.byType(EcranAppelEnCours), findsOneWidget);
    });
  });
}
