// Correctif en-tête web, 18 nov. 2026 : pastille FR retirée de
// l'en-tête web, titre en deux lignes, nom du tiroir entier,
// icônes du tiroir visibles, noms de conversation entiers,
// en-tête Messagerie entière à 390 px, carte Méditation blanche.
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/home_web.dart';
import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/messagerie.dart';
import 'package:connexion_prophetique/messagerie_screens.dart';

/// PNG 1x1 valide, en data URL, pour la photo de l'autre membre.
const _photoPng =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

void main() {
  const verse = HomeVerse(
    text: 'Écris la vision, grave-la sur des tablettes.',
    ref: 'Habacuc 2:2',
    version: 'LSG',
    book: 34,
    chapter: 2,
    verse: 2,
  );

  group('En-tête web à 390 px : titre entier, sans pastille FR', () {
    testWidgets('titre en deux lignes, pas de langue dans l’en-tête', (tester) async {
      SharedPreferences.setMockInitialValues({});
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            drawer: const Drawer(child: Text('Tiroir')),
            body: HomeWeb(
              actions: HomeActions(onSearch: () {}, onBag: () {}, onProfile: () {}),
              visitor: false,
              showBottomNav: false,
              verse: verse,
              onMessagerie: () {},
              messagerieNonLus: ValueNotifier<int>(0),
            ),
          ),
        ),
      );
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));
      expect(tester.takeException(), isNull);
      expect(find.text('CONNEXION'), findsOneWidget);
      expect(find.text('Prophétique'), findsOneWidget);
      expect(find.text('CONNEXION PROPHÉTIQUE'), findsNothing);
      expect(find.text('FR'), findsNothing);
      expect(find.byIcon(Icons.language_outlined), findsNothing);
    });
  });

  group('Tiroir : nom entier et icônes visibles', () {
    testWidgets('nom complet sur deux lignes, icônes or et blanche', (tester) async {
      SharedPreferences.setMockInitialValues({});
      app.member = Member('ANIBE ADJA MAURICE AXEL', 'CP-AA-2526', 'Céleste', DateTime(2026, 1, 1));
      app.isAdmin = false;
      addTearDown(() {
        app.member = null;
        app.isAdmin = false;
      });
      await tester.pumpWidget(
        MaterialApp(home: Scaffold(drawer: const MenuLateral(), body: const SizedBox())),
      );
      await tester.pumpAndSettle();
      tester.state<ScaffoldState>(find.byType(Scaffold)).openDrawer();
      await tester.pumpAndSettle();
      expect(find.text('ANIBE ADJA MAURICE AXEL'), findsOneWidget);
      final nom = tester.widget<Text>(find.text('ANIBE ADJA MAURICE AXEL'));
      expect(nom.maxLines, 2);
      expect(nom.overflow, isNot(TextOverflow.ellipsis));
      expect(tester.widget<Icon>(find.byIcon(Icons.download_outlined)).color, Cp.gold);
      expect(tester.widget<Icon>(find.byIcon(Icons.logout_outlined)).color, Colors.white);
    });
  });

  group('Messagerie à 390 px : noms entiers et en-tête entière', () {
    const nomLong = 'KOUAME MIENTIMY JOSEPH DANIEL KONAN';
    late ApiClient client;

    setUp(() {
      SharedPreferences.setMockInitialValues({});
      MessagerieLectureService.instance.reinitialiserPourTests();
      MessagerieLectureService.instance.nonLusNotifier.value = 0;
      app.member = Member('Test', 'CP-TT-2526', 'Céleste', DateTime(2026, 1, 1));
      app.isAdmin = true;
      app.requests.add(PayRequest('R1', 'achat', 1000, [], 'Test', 'CP-TT-2526', DateTime(2026, 1, 1)));
      final mock = MockClient((http.Request request) async {
        final path = request.url.path;
        if (path == '/messagerie/conversations') {
          return http.Response(
            jsonEncode([
              {
                'id': 'c1',
                'type': 'directe',
                'last_message_at': '2026-11-16T10:00:00.000Z',
                'autre': {'nom': nomLong},
              },
            ]),
            200,
          );
        }
        if (path == '/messagerie/conversations/c1/messages') {
          return http.Response(
            jsonEncode([
              {
                'id': 'm1',
                'conversation_id': 'c1',
                'sender_id': 'moi',
                'content': 'Bonjour',
                'created_at': '2026-11-16T10:00:00.000Z',
              },
            ]),
            200,
          );
        }
        if (path == '/moi') {
          return http.Response(jsonEncode({'id': 'moi'}), 200);
        }
        return http.Response('[]', 200);
      });
      client = ApiClient(client: mock);
    });

    tearDown(() {
      app.member = null;
      app.isAdmin = false;
      app.requests.clear();
      MessagerieLectureService.instance.reinitialiserPourTests();
      MessagerieLectureService.instance.nonLusNotifier.value = 0;
    });

    Future<void> largeur390(WidgetTester tester) async {
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
    }

    testWidgets('liste : nom de conversation entier, en-tête entière', (tester) async {
      await largeur390(tester);
      await tester.pumpWidget(MaterialApp(home: MessagerieListeScreen(apiClient: client)));
      await tester.pumpAndSettle();
      expect(tester.takeException(), isNull);
      expect(find.text('CONNEXION'), findsOneWidget);
      expect(find.text('Prophétique'), findsOneWidget);
      expect(find.text(nomLong), findsOneWidget);
      final nom = tester.widget<Text>(find.text(nomLong));
      expect(nom.maxLines, 2);
      expect(nom.overflow, isNot(TextOverflow.ellipsis));
    });

    testWidgets('discussion : titre de conversation entier', (tester) async {
      await largeur390(tester);
      const conversation = ConversationMessagerie(
        id: 'c1',
        type: 'directe',
        autreNom: nomLong,
        autreMatricule: 'CP-KM-2526',
        autrePhoto: _photoPng,
      );
      await tester.pumpWidget(
        MaterialApp(
          home: MessagerieConversationScreen(
            conversation: conversation,
            titre: nomLong,
            monMembreId: 'moi',
            apiClient: client,
          ),
        ),
      );
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));
      await tester.pump(const Duration(milliseconds: 100));
      expect(tester.takeException(), isNull);
      expect(find.text(nomLong), findsOneWidget);
      final titre = tester.widget<Text>(find.text(nomLong));
      expect(titre.maxLines, 2);
      expect(titre.overflow, isNot(TextOverflow.ellipsis));
    });
  });
}
