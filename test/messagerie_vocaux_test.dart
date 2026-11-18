// Messages vocaux dans la messagerie, 18 nov. 2026 : modèle,
// bulle audio dans la conversation, et le parcours complet
// micro, réécoute, envoi avec un faux enregistreur et un
// serveur simulé, sans micro ni serveur réel.
import 'dart:async';
import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/magnetophone.dart';
import 'package:connexion_prophetique/messagerie.dart';
import 'package:connexion_prophetique/messagerie_screens.dart';

class FauxEnregistreurVocal implements EnregistreurAudio {
  final _niveauxCtrl = StreamController<double>.broadcast();

  @override
  Stream<double> get niveaux => _niveauxCtrl.stream;

  @override
  Future<bool> demarrer() async => true;

  @override
  Future<void> mettreEnPause() async {}

  @override
  Future<void> reprendre() async {}

  @override
  Future<SonEnregistre?> arreter() async => SonEnregistre(
        octets: Uint8List.fromList([0x1A, 0x45, 0xDF, 0xA3, 1, 2, 3]),
        mime: 'audio/webm',
        dureeMs: 2000,
      );

  @override
  Future<void> annuler() async {}

  @override
  Future<void> liberer() async {
    await _niveauxCtrl.close();
  }
}

const _conversation = ConversationMessagerie(
  id: 'c1',
  type: 'directe',
  autreNom: 'MARIE DUPONT',
);

void main() {
  setUp(() {
    SharedPreferences.setMockInitialValues({});
    MessagerieLectureService.instance.reinitialiserPourTests();
  });

  tearDown(() {
    MessagerieLectureService.instance.reinitialiserPourTests();
  });

  group('MessageMessagerie, message vocal', () {
    test('fromJson : type audio, lien signé, durée', () {
      final message = MessageMessagerie.fromJson({
        'id': 'm2',
        'conversation_id': 'c1',
        'sender_id': 'moi',
        'content': 'Message vocal · 0:12',
        'type': 'audio',
        'audio_url': 'https://exemple/son.webm?sig=1',
        'duree_secondes': 12,
        'created_at': '2026-11-18T10:00:00.000Z',
      });
      expect(message.type, 'audio');
      expect(message.audioUrl, 'https://exemple/son.webm?sig=1');
      expect(message.dureeSecondes, 12);
      expect(message.content, 'Message vocal · 0:12');
    });

    test('fromJson texte : pas de lien audio', () {
      final message = MessageMessagerie.fromJson({
        'id': 'm1',
        'conversation_id': 'c1',
        'sender_id': 'moi',
        'content': 'Bonjour',
        'type': 'text',
      });
      expect(message.type, 'text');
      expect(message.audioUrl, isNull);
      expect(message.dureeSecondes, isNull);
    });
  });

  group('Écran de conversation : bulle audio', () {
    testWidgets('360 px : lecteur audio dans la bulle, micro dans la saisie',
        (tester) async {
      tester.view.physicalSize = const Size(360, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      final mock = MockClient((http.Request request) async {
        if (request.url.path == '/messagerie/conversations/c1/messages') {
          return http.Response(
            jsonEncode([
              {
                'id': 'm2',
                'conversation_id': 'c1',
                'sender_id': 'marie',
                'sender_nom': 'MARIE DUPONT',
                'content': 'Message vocal · 0:12',
                'type': 'audio',
                'audio_url': 'https://exemple/son.webm?sig=1',
                'duree_secondes': 12,
                'created_at': '2026-11-18T10:00:00.000Z',
              },
            ]),
            200,
          );
        }
        return http.Response(jsonEncode({'appel': null}), 200);
      });
      final client = ApiClient(client: mock);
      await tester.pumpWidget(
        MaterialApp(
          home: MessagerieConversationScreen(
            conversation: _conversation,
            titre: 'MARIE DUPONT',
            monMembreId: 'moi',
            apiClient: client,
          ),
        ),
      );
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));
      await tester.pump(const Duration(milliseconds: 100));
      // La bulle audio : lecteur avec lecture et durée, pas de texte.
      expect(find.byTooltip('Écouter'), findsOneWidget);
      expect(find.text('0:00 / 0:12'), findsOneWidget);
      expect(find.text('Message vocal · 0:12'), findsNothing);
      // Le micro est dans la saisie, à côté de l'envoi.
      expect(find.byTooltip('Message vocal'), findsOneWidget);
      expect(find.byTooltip('Envoyer'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  });

  group('Écran de conversation : envoi d’un message vocal', () {
    testWidgets('micro, minuteur, arrêt, réécoute, envoi', (tester) async {
      var envoiRecu = false;
      final mock = MockClient((http.Request request) async {
        if (request.url.path == '/messagerie/conversations/c1/messages' &&
            request.method == 'GET') {
          return http.Response('[]', 200);
        }
        if (request.url.path ==
                '/messagerie/conversations/c1/messages/audio' &&
            request.method == 'POST') {
          envoiRecu = true;
          return http.Response(
            jsonEncode({
              'id': 'm2',
              'conversation_id': 'c1',
              'sender_id': 'moi',
              'content': 'Message vocal · 0:02',
              'type': 'audio',
              'audio_url': 'https://exemple/son.webm?sig=1',
              'duree_secondes': 2,
              'created_at': '2026-11-18T10:00:00.000Z',
            }),
            201,
          );
        }
        return http.Response(jsonEncode({'appel': null}), 200);
      });
      final client = ApiClient(client: mock);
      await tester.pumpWidget(
        MaterialApp(
          home: MessagerieConversationScreen(
            conversation: _conversation,
            titre: 'MARIE DUPONT',
            monMembreId: 'moi',
            apiClient: client,
            enregistreurVocal: FauxEnregistreurVocal(),
          ),
        ),
      );
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));

      await tester.tap(find.byTooltip('Message vocal'));
      await tester.pump();
      await tester.pump(const Duration(seconds: 1));
      expect(find.text('0:01'), findsOneWidget);

      await tester.tap(find.byTooltip('Arrêter'));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));
      // Aperçu : lecteur de réécoute et bouton d'envoi.
      expect(find.byTooltip('Écouter'), findsOneWidget);
      expect(find.text('0:00 / 0:02'), findsOneWidget);

      await tester.tap(find.byTooltip('Envoyer'));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 200));
      await tester.pump(const Duration(milliseconds: 200));
      expect(envoiRecu, true);
      expect(find.byTooltip('Écouter'), findsOneWidget);
      expect(find.text('0:00 / 0:02'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  });
}
