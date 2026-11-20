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
  Map<String, dynamic>? offreRecue;
  Map<String, dynamic>? reponseRecue;
  final List<Map<String, dynamic>> candidatsAjoutes = [];
  bool muet = false;
  bool hautParleur = false;
  bool cameraActive = true;
  bool cameraBasculee = false;
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
  void quandFluxDistant(void Function() rappel) {}

  @override
  void quandConnexionPerdue(void Function() rappel) {}

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
  Future<void> connecter(String url) async {}

  void emettre(SignalAppel signal) => _signaux.add(signal);
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

    test('Constantes : sonnerie 30 s, repli signaux 2 s', () {
      expect(dureeSonnerieAppel, const Duration(seconds: 30));
      expect(delaiRepliSignauxAppel, const Duration(seconds: 2));
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
      expect(find.text('00:00'), findsOneWidget);
      expect(find.text('Muet'), findsOneWidget);
      expect(find.text('Haut-parleur'), findsOneWidget);
      expect(find.text('Raccrocher'), findsOneWidget);
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
      expect(find.text('Raccrocher'), findsNothing);
    });

    testWidgets('micro refusé : l’appel envoie termine et ferme l’écran',
        (tester) async {
      // Je suis l'appelant, le micro est refusé : l'écran se ferme
      // seul, mais le serveur doit être prévenu, sinon la ligne
      // reste 'sonne' et le prochain appel est refusé en 409.
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
      await tester.pump(const Duration(seconds: 1));
      expect(fauxApi.signauxEnvoyes, contains('termine'));
      expect(find.byType(EcranAppelEnCours), findsNothing);
    });
  });
}
