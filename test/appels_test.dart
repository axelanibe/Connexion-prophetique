// Appels audio et vidéo dans la messagerie, 16 nov. 2026.
// Décisions pures (modèles, transitions, formatage, parsing),
// client WebSocket sans serveur, et écrans avec faux service
// WebRTC, fausse signalisation et faux client API : aucun micro,
// aucune caméra, aucun serveur réel.
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
import 'package:connexion_prophetique/choix_sons.dart';
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
  final List<Map<String, dynamic>> contenusEnvoyes = [];

  /// Identifiant du membre connecté, comme dans le jeton : 'moi'.
  /// L'écran s'en sert pour son identifiant local, jamais de
  /// appele_id, dont la sémantique serveur est l'autre participant.
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
    contenusEnvoyes.add(Map<String, dynamic>.from(contenu));
    return {'id': 'signal-${signauxEnvoyes.length}'};
  }
}

/// Faux service WebRTC : aucun micro, aucune caméra.
class FauxServiceAppel implements ServiceAppelWebRtc {
  bool prepareAppelee = false;
  bool microOuvert = false;
  bool microRefuse = false;
  bool preparerEchoue = false;
  void Function()? _rappelFluxDistant;
  Map<String, dynamic>? offreRecue;
  Map<String, dynamic>? reponseRecue;
  final List<Map<String, dynamic>> candidatsAjoutes = [];
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

  /// Simule l'arrivée du flux distant, comme le ferait le pair.
  void declencherFluxDistant() => _rappelFluxDistant?.call();

  @override
  void quandConnexionPerdue(void Function() rappel) {}

  @override
  Future<void> ouvrirMicro({required bool video}) async {
    if (microRefuse) throw Exception('micro refuse');
    final bloque = microBloque;
    if (bloque != null) await bloque.future;
    microOuvert = true;
  }

  /// Micro bloqué par le test, carte 155 : le minuteur de
  /// sonnerie ne doit pas démarrer tant qu'il n'est pas ouvert.
  Completer<void>? microBloque;

  @override
  Future<void> preparer({
    required bool video,
    required Map<String, dynamic> configIce,
  }) async {
    if (preparerEchoue) throw Exception('addStream is not a function');
    prepareAppelee = true;
  }

  @override
  Future<Map<String, dynamic>> creerOffre() async =>
      {'sdp': 'offre-sdp', 'type': 'offer'};

  @override
  Future<Map<String, dynamic>> creerReponse(
    Map<String, dynamic> offre,
  ) async {
    offreRecue = offre;
    return {'sdp': 'reponse-sdp', 'type': 'answer'};
  }

  @override
  Future<void> appliquerReponse(Map<String, dynamic> reponse) async {
    reponseRecue = reponse;
  }

  @override
  Future<void> ajouterCandidat(Map<String, dynamic> candidat) async {
    candidatsAjoutes.add(candidat);
  }

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

  /// Statistiques fixes, carte 166 : la feuille « Plus » les
  /// affiche et les copie, sans connexion réelle.
  @override
  Future<Map<String, dynamic>> statistiquesAppel() async =>
      <String, dynamic>{
        'codecVideo': 'VP8',
        'debitSortantKbitS': 420.0,
        'paquetsEnvoyes': 1000,
        'paquetsPerdusEnvoi': 3,
        'paquetsPerdusReception': 1,
        'gigueEnvoiMs': 12.0,
        'gigueReceptionMs': 8.0,
        'allerRetourMs': 90.0,
        'imagesParSeconde': 24.0,
        'largeur': 640,
        'hauteur': 480,
      };

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
  final List<String> joues = [];
  int arrets = 0;
  int liberations = 0;

  @override
  Future<void> jouerEnBoucle(String asset) async {
    joues.add(asset);
  }

  @override
  Future<void> arreter() async {
    arrets++;
  }

  @override
  Future<void> liberer() async {
    liberations++;
  }
}

void main() {
  group('Modèles', () {
    test('AppelMessagerie lit le JSON et expose son état', () {
      final appel = AppelMessagerie.fromJson(_appelJson());
      expect(appel.id, 'a1');
      expect(appel.appelantNom, 'Jean');
      expect(appel.estAudio, isTrue);
      expect(appel.estVideo, isFalse);
      expect(appel.sonne, isTrue);
      expect(appel.enCours, isFalse);
      expect(appel.termine, isFalse);
      final enCours = appel.copyWith(statut: 'en_cours');
      expect(enCours.enCours, isTrue);
      expect(enCours.sonne, isFalse);
      expect(enCours.termine, isFalse);
      final termine = appel.copyWith(statut: 'termine');
      expect(termine.termine, isTrue);
    });

    test('SignalAppel lit le JSON, sans planter sur un contenu absent', () {
      final signal = SignalAppel.fromJson({
        'id': 's1',
        'appel_id': 'a1',
        'emetteur_id': 'autre',
        'type': 'offre',
        'contenu': {'sdp': 'x', 'type': 'offer'},
        'cree_le': DateTime.now().toIso8601String(),
      });
      expect(signal.type, 'offre');
      expect(signal.contenu['sdp'], 'x');
      final sansContenu = SignalAppel.fromJson({'id': 's2'});
      expect(sansContenu.contenu, isEmpty);
      expect(sansContenu.type, '');
    });

    test('ConfigIce sans TURN ne renvoie que le STUN de Google', () {
      final config = ConfigIce.fromJson({
        'iceServers': [
          {
            'urls': ['stun:stun.l.google.com:19302'],
          },
        ],
      });
      expect(config.aTurn, isFalse);
      expect(config.pourWebRtc['iceServers'], hasLength(1));
      expect(
        config.pourWebRtc['iceServers'][0]['urls'],
        ['stun:stun.l.google.com:19302'],
      );
    });

    test('ConfigIce accepte aussi la clé ice_servers', () {
      final config = ConfigIce.fromJson({
        'ice_servers': [
          {
            'urls': ['stun:stun.l.google.com:19302'],
          },
        ],
      });
      expect(config.pourWebRtc['iceServers'], hasLength(1));
    });

    test('ConfigIce avec TURN renvoie STUN et TURN', () {
      final config = ConfigIce.fromJson({
        'iceServers': [
          {'urls': ['stun:stun.l.google.com:19302']},
          {
            'urls': ['turn:openrelay.example:80'],
            'username': 'u',
            'credential': 'c',
          },
        ],
      });
      expect(config.aTurn, isTrue);
      expect(config.pourWebRtc['iceServers'], hasLength(2));
    });
  });

  group('Transitions et formatage', () {
    test('statutAppelApresSignal suit la machine à états', () {
      expect(statutAppelApresSignal('sonne', 'accepte'), 'en_cours');
      expect(statutAppelApresSignal('sonne', 'refuse'), 'termine');
      expect(statutAppelApresSignal('sonne', 'annule'), 'termine');
      expect(statutAppelApresSignal('en_cours', 'termine'), 'termine');
      expect(statutAppelApresSignal('termine', 'termine'), isNull);
      expect(statutAppelApresSignal('sonne', 'offre'), isNull);
      expect(statutAppelApresSignal('expire', 'accepte'), isNull);
    });

    test('dureeAppelFormatee en mm:ss', () {
      expect(dureeAppelFormatee(Duration.zero), '00:00');
      expect(dureeAppelFormatee(const Duration(seconds: 5)), '00:05');
      expect(dureeAppelFormatee(const Duration(seconds: 65)), '01:05');
      expect(dureeAppelFormatee(const Duration(minutes: 61)), '61:00');
    });

    test('offreDepuisContenu refuse une offre malformée', () {
      expect(
        offreDepuisContenu({'sdp': 'x', 'type': 'offer'})?.type,
        'offer',
      );
      expect(offreDepuisContenu({'sdp': 'x', 'type': 'answer'})?.type,
          'answer');
      expect(offreDepuisContenu({'sdp': '', 'type': 'offer'}), isNull);
      expect(offreDepuisContenu({'type': 'offer'}), isNull);
      expect(offreDepuisContenu({'sdp': 'x'}), isNull);
      expect(offreDepuisContenu({}), isNull);
    });

    test('candidatIceDepuisContenu refuse un candidat malformé', () {
      expect(
        candidatIceDepuisContenu({
          'candidate': 'c',
          'sdpMid': '0',
          'sdpMLineIndex': 0,
        })?.candidate,
        'c',
      );
      expect(candidatIceDepuisContenu({'sdpMid': '0'}), isNull);
      expect(candidatIceDepuisContenu({}), isNull);
    });

    test('Constantes : sonnerie 30 s, repli signaux 2 s, vérification entrants 3 s', () {
      expect(dureeSonnerieAppel, const Duration(seconds: 30));
      expect(delaiRepliSignauxAppel, const Duration(seconds: 2));
      expect(delaiVerificationAppelEntrant, const Duration(seconds: 3));
    });

    test('Sons d’appel : la sonnerie et la tonalité sont deux assets distincts', () {
      expect(assetSonnerieAppel, 'assets/audio/sonnerie-appel.wav');
      expect(assetTonaliteAppel, 'assets/audio/tonalite-appel.wav');
      expect(assetSonnerieAppel, isNot(assetTonaliteAppel));
    });
  });

  group('Client de signalisation', () {
    test('se déconnecte sans connexion, sans lever', () async {
      final client = ClientSignalisationAppels();
      await client.deconnecter();
      expect(client.connecte, isFalse);
    });
  });

  group('Écran d’appel entrant', () {
    const canalPermissions =
        MethodChannel('flutter.baseflow.com/permissions/methods');

    // Carte 155 : accepter demande le micro et la caméra avant
    // d'ouvrir l'écran, le canal est moqué comme dans le groupe
    // en cours d'appel, accordé par défaut.
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

    testWidgets('affiche accepter et refuser, accepter envoie accepte',
        (tester) async {
      final fauxApi = FauxApiAppels();
      await tester.pumpWidget(
        MaterialApp(
          home: EcranAppelEntrant(
            appelId: 'a1',
            appelantNom: 'Jean',
            typeAppel: 'audio',
            conversationId: 'c1',
            monMembreId: 'moi',
            apiClient: fauxApi,
          ),
        ),
      );
      await tester.pump();
      await tester.pump();
      expect(find.text('Jean'), findsOneWidget);
      expect(find.text('Appel entrant'), findsOneWidget);
      expect(find.text('Accepter'), findsOneWidget);
      expect(find.text('Refuser'), findsOneWidget);
      // Le tap vise le bouton (icône), pas le libellé dessous.
      await tester.tap(find.byIcon(Icons.call));
      await tester.pump();
      await tester.pump();
      await tester.pump();
      expect(fauxApi.signauxEnvoyes, contains('accepte'));
    });

    testWidgets('refuser envoie refuse et ferme l’écran', (tester) async {
      final fauxApi = FauxApiAppels();
      await tester.pumpWidget(
        MaterialApp(
          home: EcranAppelEntrant(
            appelId: 'a1',
            appelantNom: 'Jean',
            typeAppel: 'audio',
            conversationId: 'c1',
            monMembreId: 'moi',
            apiClient: fauxApi,
          ),
        ),
      );
      await tester.pump();
      await tester.pump();
      await tester.tap(find.byIcon(Icons.call_end));
      await tester.pump();
      await tester.pump();
      expect(fauxApi.signauxEnvoyes, contains('refuse'));
      // La fermeture est animée (300 ms) : on avance le temps
      // factice pour que l'écran sorte de l'arbre.
      await tester.pump(const Duration(seconds: 1));
      expect(find.text('Accepter'), findsNothing);
    });

    testWidgets('appel déjà terminé : l’écran se ferme seul',
        (tester) async {
      final fauxApi = FauxApiAppels(
        appel: _appelJson(statut: 'termine'),
      );
      await tester.pumpWidget(
        MaterialApp(
          home: EcranAppelEntrant(
            appelId: 'a1',
            appelantNom: 'Jean',
            typeAppel: 'audio',
            conversationId: 'c1',
            monMembreId: 'moi',
            apiClient: fauxApi,
          ),
        ),
      );
      await tester.pump();
      await tester.pump();
      await tester.pump();
      expect(find.text('Appel terminé'), findsOneWidget);
    });

    testWidgets('sonnerie : elle joue à l’ouverture et s’arrête au refus',
        (tester) async {
      final fauxApi = FauxApiAppels();
      final fauxLecteur = FauxLecteurSonnerie();
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
          ),
        ),
      );
      await tester.pump();
      await tester.pump();
      expect(fauxLecteur.joues, [choixSons.sonnerieChoisie.assetAudio]);
      await tester.tap(find.byIcon(Icons.call_end));
      await tester.pump();
      await tester.pump();
      expect(fauxLecteur.arrets, greaterThanOrEqualTo(1));
      expect(fauxApi.signauxEnvoyes, contains('refuse'));
    });

    testWidgets('sonnerie : elle s’arrête quand l’appel est accepté',
        (tester) async {
      final fauxApi = FauxApiAppels();
      final fauxLecteur = FauxLecteurSonnerie();
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
          ),
        ),
      );
      await tester.pump();
      await tester.pump();
      expect(fauxLecteur.joues, [choixSons.sonnerieChoisie.assetAudio]);
      await tester.tap(find.byIcon(Icons.call));
      await tester.pump();
      await tester.pump();
      expect(fauxLecteur.arrets, greaterThanOrEqualTo(1));
      expect(fauxApi.signauxEnvoyes, contains('accepte'));
    });
  });

  group('Écran en cours d’appel', () {
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

    testWidgets(
        'appelé : une offre reçue crée la réponse et passe en cours',
        (tester) async {
      // Sémantique réelle du serveur, 20 nov. 2026 : pour l'appelé,
      // appele_id vaut l'appelant, pas l'appelé. Avec l'ancien code
      // (_monId = appele_id), l'offre de l'appelant était jetée par
      // le filtre anti-écho et ce test échouait.
      final fauxApi = FauxApiAppels(
        appel: _appelJson(appelantId: 'autre', appeleId: 'autre'),
      );
      final fauxService = FauxServiceAppel();
      final fausseSignalisation = FausseSignalisation();
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
          ),
        ),
      );
      await tester.pump();
      await tester.pump();
      await tester.pump();
      expect(fauxService.prepareAppelee, isTrue);
      expect(find.text('Appel en cours…'), findsOneWidget);
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
      expect(fauxService.offreRecue?['sdp'], 'offre-sdp');
      expect(fauxApi.signauxEnvoyes, contains('reponse'));
      // 20 nov. 2026 : l'écran décroché affiche « Appel en
      // cours… » avec le décompte, plus la durée seule.
      expect(find.text('Appel en cours… 00:00'), findsOneWidget);
      expect(find.text('Muet'), findsOneWidget);
      expect(find.text('Haut-parleur'), findsOneWidget);
      expect(find.text('Terminer'), findsOneWidget);
      await tester.tap(find.byIcon(Icons.mic));
      await tester.pump();
      expect(fauxService.muet, isTrue);
      await tester.tap(find.byIcon(Icons.call_end));
      await tester.pump();
      await tester.pump();
      expect(fauxApi.signauxEnvoyes, contains('termine'));
    });

    testWidgets('un refus reçu ferme l’écran', (tester) async {
      // Je suis l'appelant (moi), l'autre membre (autre) refuse.
      final fauxApi = FauxApiAppels(
        appel: _appelJson(appelantId: 'moi', appeleId: 'autre'),
      );
      final fauxService = FauxServiceAppel();
      final fausseSignalisation = FausseSignalisation();
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
          type: 'refuse',
          contenu: const {},
          creeLe: DateTime.now(),
        ),
      );
      await tester.pump();
      await tester.pump();
      // La fermeture est animée (300 ms) : on avance le temps
      // factice pour que l'écran sorte de l'arbre.
      await tester.pump(const Duration(seconds: 1));
      expect(find.text('Terminer'), findsNothing);
    });

    testWidgets('micro refusé : message clair, puis termine et fermeture',
        (tester) async {
      // Je suis l'appelant, le micro est refusé : l'écran affiche
      // un message clair au lieu de se fermer sans rien dire, puis
      // il se ferme seul, mais le serveur doit être prévenu, sinon
      // la ligne reste 'sonne' et le prochain appel est refusé en 409.
      TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
          .setMockMethodCallHandler(canalPermissions,
              (MethodCall call) async {
        if (call.method == 'requestPermissions') {
          final args = (call.arguments as List).cast<int>();
          return {for (final v in args) v: 0};
        }
        if (call.method == 'checkPermissionStatus') return 0;
        return null;
      });
      final fauxApi = FauxApiAppels(
        appel: _appelJson(appelantId: 'moi', appeleId: 'autre'),
      );
      final fauxService = FauxServiceAppel();
      final fausseSignalisation = FausseSignalisation();
      final fauxLecteur = FauxLecteurSonnerie();
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
            lecteurSonnerie: fauxLecteur,
          ),
        ),
      );
      await tester.pump();
      await tester.pump();
      await tester.pump();
      expect(find.textContaining('Micro refusé'), findsOneWidget);
      expect(fauxLecteur.joues, [assetTonaliteAppel]);
      await tester.pump(const Duration(seconds: 4));
      await tester.pump(const Duration(seconds: 1));
      expect(fauxApi.signauxEnvoyes, contains('termine'));
      expect(fauxLecteur.arrets, greaterThanOrEqualTo(1));
      expect(find.byType(EcranAppelEnCours), findsNothing);
    });

    testWidgets('micro refusé côté service : même message clair',
        (tester) async {
      // Sur le web, le refus arrive dans getUserMedia, pas dans
      // permission_handler : le service refuse, l'écran affiche
      // le message et ferme après 3 secondes.
      final fauxApi = FauxApiAppels(
        appel: _appelJson(appelantId: 'moi', appeleId: 'autre'),
      );
      final fauxService = FauxServiceAppel()..microRefuse = true;
      final fausseSignalisation = FausseSignalisation();
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
            lecteurSonnerie: FauxLecteurSonnerie(),
          ),
        ),
      );
      await tester.pump();
      await tester.pump();
      await tester.pump();
      expect(find.textContaining('Micro refusé'), findsOneWidget);
      expect(fauxService.microOuvert, isFalse);
      await tester.pump(const Duration(seconds: 4));
      await tester.pump(const Duration(seconds: 1));
      expect(fauxApi.signauxEnvoyes, contains('termine'));
      expect(find.byType(EcranAppelEnCours), findsNothing);
    });

    testWidgets('préparation WebRTC impossible : message précis, puis termine et fermeture',
        (tester) async {
      // Safari web, 20 nov. 2026 : addStream n'existe pas sur
      // Safari, preparer levait TypeError et l'écran affichait
      // le message générique. L'échec de préparation doit dire
      // que le navigateur ne peut pas démarrer l'appel, puis
      // prévenir le serveur et fermer, comme pour le micro.
      final fauxApi = FauxApiAppels(
        appel: _appelJson(appelantId: 'moi', appeleId: 'autre'),
      );
      final fauxService = FauxServiceAppel()..preparerEchoue = true;
      final fausseSignalisation = FausseSignalisation();
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
            lecteurSonnerie: FauxLecteurSonnerie(),
          ),
        ),
      );
      await tester.pump();
      await tester.pump();
      await tester.pump();
      expect(find.textContaining('Ce navigateur ne peut pas'), findsOneWidget);
      expect(find.textContaining('Vérifie ta connexion'), findsNothing);
      await tester.pump(const Duration(seconds: 4));
      await tester.pump(const Duration(seconds: 1));
      expect(fauxApi.signauxEnvoyes, contains('termine'));
      expect(find.byType(EcranAppelEnCours), findsNothing);
    });

    testWidgets('appelant : tonalité jouée, arrêtée à la réponse',
        (tester) async {
      final fauxApi = FauxApiAppels(
        appel: _appelJson(appelantId: 'moi', appeleId: 'autre'),
      );
      final fauxService = FauxServiceAppel();
      final fausseSignalisation = FausseSignalisation();
      final fauxLecteur = FauxLecteurSonnerie();
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
            lecteurSonnerie: fauxLecteur,
          ),
        ),
      );
      await tester.pump();
      await tester.pump();
      await tester.pump();
      expect(fauxLecteur.joues, [assetTonaliteAppel]);
      expect(fauxService.microOuvert, isTrue);
      expect(fauxService.prepareAppelee, isTrue);
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
      expect(fauxLecteur.arrets, greaterThanOrEqualTo(1));
      // 20 nov. 2026 : l'écran décroché affiche « Appel en
      // cours… » avec le décompte, plus la durée seule.
      expect(find.text('Appel en cours… 00:00'), findsOneWidget);
    });

    testWidgets('appelFutur : écran ouvert avant la création, préparé ensuite',
        (tester) async {
      final fauxApi = FauxApiAppels();
      final fauxService = FauxServiceAppel();
      final fausseSignalisation = FausseSignalisation();
      await tester.pumpWidget(
        MaterialApp(
          home: EcranAppelEnCours(
            appelId: '',
            typeAppel: 'audio',
            autreNom: 'Jean',
            suisAppelant: true,
            apiClient: fauxApi,
            serviceAppel: fauxService,
            signalisation: fausseSignalisation,
            appelFutur: Future.value(
              _appelJson(appelantId: 'moi', appeleId: 'autre'),
            ),
            lecteurSonnerie: FauxLecteurSonnerie(),
          ),
        ),
      );
      await tester.pump();
      await tester.pump();
      await tester.pump();
      expect(fauxService.microOuvert, isTrue);
      expect(fauxService.prepareAppelee, isTrue);
      // 20 nov. 2026 : l'appelant qui sonne voit « Ça sonne… »,
      // plus « Appel en cours… », réservé à l'appelé qui attend
      // et à l'écran décroché.
      expect(find.text('Ça sonne…'), findsOneWidget);
    });

    testWidgets('sans réponse après 30 s : l’appelant annule et ferme',
        (tester) async {
      final fauxApi = FauxApiAppels(
        appel: _appelJson(appelantId: 'moi', appeleId: 'autre'),
      );
      final fauxService = FauxServiceAppel();
      final fausseSignalisation = FausseSignalisation();
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
            lecteurSonnerie: FauxLecteurSonnerie(),
          ),
        ),
      );
      await tester.pump();
      await tester.pump();
      await tester.pump();
      await tester.pump(const Duration(seconds: 30));
      await tester.pump(const Duration(seconds: 1));
      expect(fauxApi.signauxEnvoyes, contains('annule'));
      expect(find.byType(EcranAppelEnCours), findsNothing);
    });

    testWidgets('appel audio : le flux distant monte sa vue cachée',
        (tester) async {
      final fauxApi = FauxApiAppels();
      final fauxService = FauxServiceAppel();
      final fausseSignalisation = FausseSignalisation();
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
            lecteurSonnerie: FauxLecteurSonnerie(),
          ),
        ),
      );
      await tester.pump();
      await tester.pump();
      await tester.pump();
      expect(find.byType(RTCVideoView), findsNothing);
      fauxService.declencherFluxDistant();
      await tester.pump();
      expect(find.byType(RTCVideoView), findsOneWidget);
    });

    testWidgets('sonnerie : le minuteur ne démarre pas avant le micro',
        (tester) async {
      // Carte 155 : avant, le minuteur de 30 secondes démarrait
      // à l'ouverture de l'écran, donc il pouvait expirer
      // pendant que l'utilisateur répondait aux fenêtres
      // système. Il ne démarre qu'une fois le micro ouvert.
      final fauxApi = FauxApiAppels(
        appel: _appelJson(appelantId: 'moi', appeleId: 'autre'),
      );
      final fauxService = FauxServiceAppel();
      final microBloque = Completer<void>();
      fauxService.microBloque = microBloque;
      final fausseSignalisation = FausseSignalisation();
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
            lecteurSonnerie: FauxLecteurSonnerie(),
          ),
        ),
      );
      await tester.pump();
      await tester.pump();
      // 30 secondes sans micro ouvert : l'écran sonne encore,
      // le minuteur n'a pas démarré.
      await tester.pump(const Duration(seconds: 30));
      expect(find.byType(EcranAppelEnCours), findsOneWidget);
      // Le micro s'ouvre, le minuteur démarre, 30 secondes plus
      // tard l'appel se termine faute de réponse.
      microBloque.complete();
      await tester.pump();
      await tester.pump();
      await tester.pump(const Duration(seconds: 30));
      await tester.pump(const Duration(seconds: 1));
      expect(fauxApi.signauxEnvoyes, contains('annule'));
      expect(find.byType(EcranAppelEnCours), findsNothing);
    });

    testWidgets('appelée : une offre vidéo bascule l’écran en vidéo',
        (tester) async {
      // Carte 156 : l'appelant bascule en vidéo pendant un appel
      // audio, l'offre porte la vidéo, l'appelée ouvre sa caméra
      // avant de répondre et son écran passe en vidéo.
      final fauxApi = FauxApiAppels(
        appel: _appelJson(appelantId: 'autre', appeleId: 'autre'),
      );
      final fauxService = FauxServiceAppel();
      final fausseSignalisation = FausseSignalisation();
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
      expect(fauxService.videoAjoutee, isFalse);
      fausseSignalisation.emettre(
        SignalAppel(
          id: 's2',
          appelId: 'a1',
          emetteurId: 'autre',
          type: 'offre',
          contenu: {
            'sdp': 'v=0\r\nm=video 9 UDP/TLS/RTP/SAVPF 96',
            'type': 'offer',
          },
          creeLe: DateTime.now(),
        ),
      );
      await tester.pump();
      await tester.pump();
      await tester.pump();
      expect(fauxService.videoAjoutee, isTrue);
      expect(fauxApi.signauxEnvoyes, contains('reponse'));
      // L'écran est passé en vidéo : le bouton de retournement
      // de la fenêtre locale est visible.
      expect(find.byIcon(Icons.switch_camera), findsOneWidget);
    });
  });
}
