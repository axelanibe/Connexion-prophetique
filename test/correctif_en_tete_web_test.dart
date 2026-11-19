// Correctif en-tête web, 18 nov. 2026 : pastille FR retirée de
// l'en-tête web, nom du tiroir entier, icônes du tiroir visibles,
// noms de conversation entiers, en-tête Messagerie entière à
// 390 px, carte Méditation blanche. 19 nov. 2026 : nouveau logo
// bleu et rouge seul sur pastille blanche, sans titre en texte,
// barre de recherche visible sur l'accueil membre.
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
import 'package:connexion_prophetique/web_assets.dart';

/// Le nouveau logo bleu et rouge de l'en-tête, 19 nov. 2026.
Finder get _logoEntete => find.byWidgetPredicate((w) => w is WebAssetImage && w.asset == 'assets/logo_entete.jpg');

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

  group('En-tête web à 390 px : logo seul, sans pastille FR', () {
    testWidgets('logo seul sur pastille blanche, pas de langue dans l’en-tête', (tester) async {
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
      // 19 nov. 2026, décision d'Axel : nouveau logo bleu et
      // rouge seul sur pastille blanche, plus de titre en texte.
      expect(_logoEntete, findsOneWidget);
      expect(find.text('CONNEXION'), findsNothing);
      expect(find.text('Prophétique'), findsNothing);
      expect(find.text('CONNEXION PROPHÉTIQUE'), findsNothing);
      expect(find.text('FR'), findsNothing);
      expect(find.byIcon(Icons.language_outlined), findsNothing);
      // Barre de recherche, 19 nov. 2026 : visible sur l'accueil
      // membre, la loupe de l'en-tête est cachée là.
      expect(find.text('Rechercher…'), findsOneWidget);
      expect(find.byTooltip('Rechercher'), findsNothing);
    });

    testWidgets('en-tête : se cache à la descente, revient à l’arrêt', (tester) async {
      // 19 nov. 2026, en-tête façon Facebook : même contrôleur
      // que la pilule, elle revient aussi quand le défilement
      // s'arrête, pas seulement quand on remonte.
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
      await tester.pumpAndSettle();
      expect(tester.takeException(), isNull);
      final transition = find.ancestor(of: _logoEntete, matching: find.byType(SizeTransition));
      expect(transition, findsOneWidget);
      expect(tester.widget<SizeTransition>(transition).sizeFactor.value, 1.0);
      // Descente : l'en-tête se cache (lancer avec élan, pour que
      // le défilement continue et que l'arrêt n'arrive qu'après).
      await tester.fling(find.byType(ListView).first, const Offset(0, -300), 1000);
      expect(tester.widget<SizeTransition>(transition).sizeFactor.value, lessThan(1.0));
      // Arrêt : l'en-tête revient, comme la pilule.
      await tester.pumpAndSettle();
      expect(tester.widget<SizeTransition>(transition).sizeFactor.value, 1.0);
    });
  });

  group('Barre de recherche sur l’accueil', () {
    Future<void> _pomperAccueil(WidgetTester tester, {required bool visiteur, VoidCallback? onSearch}) async {
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
              actions: HomeActions(onSearch: onSearch, onBag: () {}, onProfile: () {}),
              visitor: visiteur,
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
    }

    testWidgets('membre : barre visible, elle ouvre la recherche, pas de loupe dans l’en-tête', (tester) async {
      var appelee = false;
      await _pomperAccueil(tester, visiteur: false, onSearch: () => appelee = true);
      expect(find.text('Rechercher…'), findsOneWidget);
      expect(find.byTooltip('Rechercher'), findsNothing);
      await tester.tap(find.text('Rechercher…'));
      await tester.pump();
      expect(appelee, isTrue);
    });

    testWidgets('visiteur : pas de barre, la loupe reste dans l’en-tête', (tester) async {
      await _pomperAccueil(tester, visiteur: true, onSearch: () {});
      expect(find.text('Rechercher…'), findsNothing);
      expect(find.byTooltip('Rechercher'), findsOneWidget);
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
      expect(_logoEntete, findsOneWidget);
      expect(find.text('CONNEXION'), findsNothing);
      expect(find.text('Prophétique'), findsNothing);
      expect(find.text(nomLong), findsOneWidget);
      final nom = tester.widget<Text>(find.text(nomLong));
      expect(nom.maxLines, 2);
      expect(nom.overflow, isNot(TextOverflow.ellipsis));
    });

    testWidgets('en-tête : logo seul, sans titre coupé, avec toutes les actions', (tester) async {
      // 19 nov. 2026, décision d'Axel : le titre en deux lignes
      // est remplacé par le nouveau logo seul sur pastille
      // blanche. Le logo a une largeur fixe (32 x 1290/444),
      // sans texte à mesurer : on affirme qu'il est présent,
      // entier à 390 px, et que la loupe des actions est là.
      await largeur390(tester);
      await tester.pumpWidget(MaterialApp(home: MessagerieListeScreen(apiClient: client)));
      await tester.pumpAndSettle();
      expect(tester.takeException(), isNull);
      expect(_logoEntete, findsOneWidget);
      expect(find.text('CONNEXION'), findsNothing);
      expect(find.text('Prophétique'), findsNothing);
      final largeurLogo = tester.getSize(_logoEntete).width;
      expect(largeurLogo, greaterThanOrEqualTo(90));
      expect(largeurLogo, lessThanOrEqualTo(100));
      expect(find.byIcon(Icons.search_outlined), findsWidgets);
    });

    testWidgets('filtres : les 5 pastilles visibles à 390 px, sans défiler', (tester) async {
      // 19 nov. 2026 : la police de test fausserait une mesure en
      // pixels (chasse 12 px par caractère à 12 px, contre ~6 px en
      // Roboto). On vérifie la structure : pas de défilement
      // horizontal autour des pastilles, style compact, et les 5
      // libellés présents. La largeur réelle est mesurée en Roboto
      // dans le code (323,8 px pour 358 px utiles).
      await largeur390(tester);
      await tester.pumpWidget(MaterialApp(home: MessagerieListeScreen(apiClient: client)));
      await tester.pumpAndSettle();
      expect(tester.takeException(), isNull);
      for (final libelle in ['Toutes 1', 'Non lues', 'Favoris', 'Groupes', 'Pastorale']) {
        expect(find.text(libelle), findsOneWidget);
      }
      expect(
        find.byWidgetPredicate((w) => w is SingleChildScrollView && w.scrollDirection == Axis.horizontal),
        findsNothing,
      );
      final puce = tester.widget<ChoiceChip>(find.byType(ChoiceChip).first);
      expect(puce.labelPadding, const EdgeInsets.symmetric(horizontal: 3));
      final texte = tester.widget<Text>(find.text('Toutes 1'));
      expect(texte.style?.fontSize, 12);
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
