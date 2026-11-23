// Conversation sur tablette, 19 nov. 2026.
// Capture d'Axel : sur la tablette, la conversation n'affichait
// que 3 petits messages en haut, un grand vide des deux côtés et
// en dessous, et le champ de saisie était rendu trop bas, sous la
// barre système, impossible de répondre. Correctif : le champ se
// place au dessus de la barre système, le plus grand de viewPadding
// et viewInsets, et les messages s'ancrent en bas comme WhatsApp.
// Sans serveur réel : l'API est simulée par un client HTTP en
// mémoire, comme dans nom_contact_conversation_test.dart.
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/messagerie.dart';
import 'package:connexion_prophetique/messagerie_screens.dart';

void main() {
  group('Conversation sur tablette : champ visible, messages en bas', () {
    late ApiClient client;

    setUp(() {
      SharedPreferences.setMockInitialValues({});
      final messages = [
        {
          'id': 'm1',
          'conversation_id': 'c1',
          'sender_id': 'tina',
          'sender_nom': 'TAH LOU TINA BLANDINE',
          'content': 'salut',
          'type': 'text',
          'created_at': '2026-11-16T10:00:00Z',
        },
        {
          'id': 'm2',
          'conversation_id': 'c1',
          'sender_id': 'moi',
          'sender_nom': 'ANIBE ADJA MAURICE AXEL',
          'content': 'comment vas-tu',
          'type': 'text',
          'created_at': '2026-11-16T10:01:00Z',
        },
        {
          'id': 'm3',
          'conversation_id': 'c1',
          'sender_id': 'moi',
          'sender_nom': 'ANIBE ADJA MAURICE AXEL',
          'content': 'salut',
          'type': 'text',
          'created_at': '2026-11-16T10:02:00Z',
        },
      ];
      final mock = MockClient((http.Request request) async {
        if (request.url.path ==
            '/messagerie/conversations/c1/messages') {
          return http.Response(jsonEncode(messages), 200);
        }
        return http.Response('[]', 200);
      });
      client = ApiClient(client: mock);
    });

    Future<void> ouvrirConversation(WidgetTester tester) async {
      tester.view.physicalSize = const Size(1180, 800);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      final conversation = ConversationMessagerie(
        id: 'c1',
        type: 'directe',
      );
      await tester.pumpWidget(
        MaterialApp(
          home: MediaQuery(
            // Barre système de la tablette simulée : 48 px en bas.
            data: const MediaQueryData(
              size: Size(1180, 800),
              viewPadding: EdgeInsets.only(bottom: 48),
            ),
            child: MessagerieConversationScreen(
              conversation: conversation,
              titre: 'TAH LOU TINA BLANDINE',
              monMembreId: 'moi',
              nomsMembres: const {'tina': 'TAH LOU TINA BLANDINE'},
              apiClient: client,
            ),
          ),
        ),
      );
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));
      await tester.pump(const Duration(milliseconds: 100));
      expect(tester.takeException(), isNull);
    }

    testWidgets('champ au dessus de la barre système, messages en bas', (
      tester,
    ) async {
      await ouvrirConversation(tester);
      // Le champ reste visible : son bas est au dessus de la barre
      // système de 48 px, plus 8 px de marge.
      final champ = find.byType(TextField);
      expect(champ, findsOneWidget);
      final rectChamp = tester.getRect(champ);
      expect(rectChamp.bottom, lessThanOrEqualTo(800 - 48));
      expect(rectChamp.bottom, greaterThan(800 - 48 - 80));
      // Les messages sont en bas, pas en haut. La liste est inversée,
      // le premier « salut » trouvé est le dernier message, en bas,
      // le dernier trouvé est le premier message, au dessus.
      final dernier = tester.getRect(find.text('salut').first);
      expect(dernier.bottom, greaterThan(600));
      final premier = tester.getRect(find.text('salut').last);
      expect(premier.top, greaterThan(400));
      expect(find.text('comment vas-tu'), findsOneWidget);
    });

    testWidgets('aperçu doré tablette', (tester) async {
      await ouvrirConversation(tester);
      await expectLater(
        find.byType(MessagerieConversationScreen),
        matchesGoldenFile('goldens/conversation_tablette.png'),
      );
    });
  });

  group('Appel manqué : ligne dans la conversation, bouton Rappeler', () {
    late ApiClient client;
    final requetes = <http.Request>[];
    const canalPermissions =
        MethodChannel('flutter.baseflow.com/permissions/methods');

    setUp(() {
      SharedPreferences.setMockInitialValues({});
      requetes.clear();
      // Carte 155 : Rappeler demande le micro avant d'ouvrir
      // l'écran d'appel, le canal est moqué, accordé.
      TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
          .setMockMethodCallHandler(canalPermissions,
              (MethodCall call) async {
        if (call.method == 'requestPermissions') {
          final args = (call.arguments as List).cast<int>();
          return {for (final v in args) v: 1};
        }
        return null;
      });
      final messages = [
        {
          'id': 'm1',
          'conversation_id': 'c1',
          'sender_id': 'tina',
          'sender_nom': 'TAH LOU TINA BLANDINE',
          'content': 'salut',
          'type': 'text',
          'created_at': '2026-11-16T10:00:00Z',
        },
        {
          'id': 'm2',
          'conversation_id': 'c1',
          'sender_id': 'tina',
          'sender_nom': 'TAH LOU TINA BLANDINE',
          'content': 'audio',
          'type': 'appel_manque',
          'created_at': '2026-11-16T10:05:00Z',
        },
        {
          'id': 'm3',
          'conversation_id': 'c1',
          'sender_id': 'moi',
          'sender_nom': 'ANIBE ADJA MAURICE AXEL',
          'content': 'video',
          'type': 'appel_manque',
          'created_at': '2026-11-16T10:06:00Z',
        },
      ];
      final mock = MockClient((http.Request request) async {
        requetes.add(request);
        if (request.url.path == '/messagerie/conversations/c1/messages') {
          return http.Response(jsonEncode(messages), 200);
        }
        if (request.url.path == '/messagerie/conversations/c1/appels' &&
            request.method == 'POST') {
          return http.Response(
            jsonEncode({
              'id': 'a1',
              'conversation_id': 'c1',
              'appelant_id': 'moi',
              'appele_id': 'tina',
              'appelant_nom': 'ANIBE ADJA MAURICE AXEL',
              'appele_nom': 'TAH LOU TINA BLANDINE',
              'type': 'audio',
              'statut': 'sonne',
              'cree_le': '2026-11-16T10:07:00Z',
            }),
            201,
          );
        }
        return http.Response('[]', 200);
      });
      client = ApiClient(client: mock);
    });

    tearDown(() {
      TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
          .setMockMethodCallHandler(canalPermissions, null);
    });

    Future<void> ouvrirConversationManquee(WidgetTester tester) async {
      tester.view.physicalSize = const Size(1180, 800);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      final conversation = ConversationMessagerie(
        id: 'c1',
        type: 'directe',
      );
      await tester.pumpWidget(
        MaterialApp(
          home: MediaQuery(
            data: const MediaQueryData(
              size: Size(1180, 800),
              viewPadding: EdgeInsets.only(bottom: 48),
            ),
            child: MessagerieConversationScreen(
              conversation: conversation,
              titre: 'TAH LOU TINA BLANDINE',
              monMembreId: 'moi',
              nomsMembres: const {'tina': 'TAH LOU TINA BLANDINE'},
              apiClient: client,
            ),
          ),
        ),
      );
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));
      await tester.pump(const Duration(milliseconds: 100));
      expect(tester.takeException(), isNull);
    }

    testWidgets('la ligne Appel manqué s’affiche avec Rappeler', (
      tester,
    ) async {
      await ouvrirConversationManquee(tester);
      expect(find.text('Appel manqué'), findsOneWidget);
      expect(find.text('Appel sans réponse'), findsOneWidget);
      expect(find.text('Rappeler'), findsNWidgets(2));
    });

    testWidgets('Rappeler relance un appel audio', (tester) async {
      await ouvrirConversationManquee(tester);
      // Liste inversée : le premier « Rappeler » trouvé est celui
      // de la dernière ligne, l'appel vidéo sans réponse ; celui
      // de l'appel manqué audio est le dernier trouvé.
      await tester.tap(find.text('Rappeler').last);
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));
      await tester.pump(const Duration(seconds: 1));
      final cree = requetes.where(
        (r) =>
            r.url.path == '/messagerie/conversations/c1/appels' &&
            r.method == 'POST',
      );
      expect(cree.length, 1);
      expect(jsonDecode(cree.first.body)['type'], 'audio');
      expect(find.byType(MessagerieConversationScreen), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('aperçu doré appel manqué', (tester) async {
      await ouvrirConversationManquee(tester);
      await expectLater(
        find.byType(MessagerieConversationScreen),
        matchesGoldenFile('goldens/appel_manque.png'),
      );
    });
  });
}
