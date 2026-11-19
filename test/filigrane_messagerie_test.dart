// Logo en fond de la messagerie, 18 nov. 2026.
// Monogramme CP en filigrane discret au centre du fond, opacité
// 4 % depuis le 19 nov. 2026 (6 % avant, carré trop visible),
// taille 240, sur la liste des conversations et sur
// l'écran de conversation. Sans serveur réel : l'API est simulée
// par un client HTTP en mémoire, comme dans messagerie_nom_test.dart.
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/messagerie.dart';
import 'package:connexion_prophetique/messagerie_screens.dart';

/// L'image du filigrane : l'asset monogramme, pas une autre image.
Finder get _filigrane => find.byWidgetPredicate(
      (w) =>
          w is Image &&
          w.image is AssetImage &&
          (w.image as AssetImage).assetName == 'assets/cp_monogram.png' &&
          w.width == 240,
    );

void main() {
  group('FiligraneMessagerie', () {
    testWidgets('opacité 4 %, taille 240, jamais cliquable', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(body: Center(child: FiligraneMessagerie())),
        ),
      );
      await tester.pump();
      expect(_filigrane, findsOneWidget);
      final image = tester.widget<Image>(_filigrane);
      expect(image.width, 240);
      expect(image.height, 240);
      final opacite = find.byWidgetPredicate(
        (w) => w is Opacity && w.opacity == 0.04,
      );
      expect(opacite, findsOneWidget);
      expect(find.byWidgetPredicate(
        (w) => w is IgnorePointer && w.ignoring == true,
      ), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  });

  group('Liste des conversations : filigrane en fond', () {
    late ApiClient client;

    setUp(() {
      SharedPreferences.setMockInitialValues({});
      MessagerieLectureService.instance.reinitialiserPourTests();
      final mock = MockClient((http.Request request) async {
        final path = request.url.path;
        if (path == '/messagerie/conversations') {
          return http.Response(
            jsonEncode([
              {
                'id': 'c1',
                'type': 'directe',
                'last_message_at': '2026-11-16T10:00:00.000Z',
                'autre': {'nom': 'MARIE DUPONT'},
              },
            ]),
            200,
          );
        }
        if (path == '/moi') {
          return http.Response(jsonEncode({'id': 'moi'}), 200);
        }
        if (path == '/messagerie/membres') {
          return http.Response('[]', 200);
        }
        return http.Response('[]', 200);
      });
      client = ApiClient(client: mock);
    });

    tearDown(() {
      MessagerieLectureService.instance.reinitialiserPourTests();
    });

    testWidgets('filigrane derrière la liste, nom toujours visible', (
      tester,
    ) async {
      await tester.pumpWidget(
        MaterialApp(home: MessagerieListeScreen(apiClient: client)),
      );
      await tester.pumpAndSettle();
      expect(_filigrane, findsOneWidget);
      expect(find.text('MARIE DUPONT'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  });

  group('Écran de conversation : filigrane derrière les bulles', () {
    testWidgets('360 px : filigrane et message visibles, sans débordement', (
      tester,
    ) async {
      SharedPreferences.setMockInitialValues({});
      tester.view.physicalSize = const Size(360, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      final mock = MockClient((http.Request request) async {
        if (request.url.path == '/messagerie/conversations/c1/messages') {
          return http.Response(
            jsonEncode([
              {
                'id': 'm1',
                'conversation_id': 'c1',
                'sender_id': 'moi',
                'content': 'Bonjour Marie',
                'created_at': '2026-11-16T10:00:00.000Z',
              },
            ]),
            200,
          );
        }
        return http.Response('[]', 200);
      });
      final client = ApiClient(client: mock);
      const conversation = ConversationMessagerie(
        id: 'c1',
        type: 'directe',
        autreNom: 'MARIE DUPONT',
      );
      await tester.pumpWidget(
        MaterialApp(
          home: MessagerieConversationScreen(
            conversation: conversation,
            titre: 'MARIE DUPONT',
            monMembreId: 'moi',
            apiClient: client,
          ),
        ),
      );
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));
      await tester.pump(const Duration(milliseconds: 100));
      expect(_filigrane, findsOneWidget);
      expect(find.text('Bonjour Marie'), findsOneWidget);
      expect(find.text('MARIE DUPONT'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  });
}
