// Tests de la tranche navigation par largeur, 17 nov. 2026.
// Écran large (plus de 1000 px) : les 4 onglets dans une barre
// fixe en haut, comme Facebook sur ordinateur. Écran étroit : la
// pilule flottante en bas reste, la barre du haut n'apparaît pas.
// 18 nov. 2026 : Témoignages quitte la pilule et la barre du
// haut, et rejoint le tiroir.
// Messagerie toujours visible : bulle en haut à droite de
// l'en-tête, avec la pastille or des non lus. Tiroir inchangé.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/home_web.dart';
import 'package:connexion_prophetique/main.dart';

void main() {
  group('Navigation par largeur, barre du haut', () {
    testWidgets('4 onglets, Accueil, Bible, Librairie, Structure, sans Témoignages ni Plus', (tester) async {
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(body: TopNavWeb(index: 0, onTap: (_) {})),
      ));
      await tester.pump();
      expect(find.text('Accueil'), findsOneWidget);
      expect(find.text('Bible'), findsOneWidget);
      expect(find.text('Librairie'), findsOneWidget);
      expect(find.text('Structure'), findsOneWidget);
      expect(find.text('Témoignages'), findsNothing);
      expect(find.text('Plus'), findsNothing);
    });

    testWidgets('un toucher renvoie l’index canonique', (tester) async {
      var touche = -1;
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(body: TopNavWeb(index: 0, onTap: (i) => touche = i)),
      ));
      await tester.pump();
      await tester.tap(find.text('Librairie'));
      expect(touche, 2);
      await tester.tap(find.text('Structure'));
      expect(touche, 3);
    });

    testWidgets('sur la page Témoignages, aucun onglet actif, sans planter', (tester) async {
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(body: TopNavWeb(index: 4, onTap: (_) {})),
      ));
      await tester.pump();
      expect(find.text('Accueil'), findsOneWidget);
      expect(find.text('Témoignages'), findsNothing);
    });
  });

  group('Navigation par largeur, basic()', () {
    testWidgets('écran large, la barre du haut apparaît sous l’en-tête', (tester) async {
      tester.view.physicalSize = const Size(1200, 800);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.reset);
      await tester.pumpWidget(MaterialApp(
        home: basic('Bible', const [Text('Corps')], tabIndex: 1),
      ));
      await tester.pump();
      expect(find.text('Accueil'), findsOneWidget);
      expect(find.text('Librairie'), findsOneWidget);
      expect(find.text('Structure'), findsOneWidget);
      expect(find.text('Témoignages'), findsNothing);
    });

    testWidgets('écran étroit, pas de barre du haut', (tester) async {
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.reset);
      await tester.pumpWidget(MaterialApp(
        home: basic('Bible', const [Text('Corps')], tabIndex: 1),
      ));
      await tester.pump();
      expect(find.text('Accueil'), findsNothing);
      expect(find.text('Librairie'), findsNothing);
      expect(find.text('Corps'), findsOneWidget);
    });

    testWidgets('écran large, sans tabIndex, pas de barre du haut (page poussée)', (tester) async {
      tester.view.physicalSize = const Size(1200, 800);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.reset);
      await tester.pumpWidget(MaterialApp(
        home: basic('Bible', const [Text('Corps')]),
      ));
      await tester.pump();
      expect(find.text('Accueil'), findsNothing);
      expect(find.text('Corps'), findsOneWidget);
    });
  });

  group('Navigation par largeur, accueil visiteur', () {
    // Correctif 17 nov. 2026 : sur écran large, l'accueil visiteur
    // montre la barre du haut, comme les autres onglets, jamais
    // la pilule. Sur écran étroit, pas de barre du haut.
    testWidgets('écran large, la barre du haut apparaît sous l’en-tête', (tester) async {
      tester.view.physicalSize = const Size(1200, 800);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.reset);
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(body: VitrinePage(
          verse: null,
          events: const [],
          kairosIndex: -1,
          campTariff: '',
          etabNames: const [],
          news: const [],
          actions: const HomeActions(),
          onDon: () {},
          onAbout: () {},
          scrollController: null,
          offline: false,
          onRetry: null,
        )),
      ));
      await tester.pump();
      expect(find.byType(TopNavWeb), findsOneWidget);
      expect(find.text('Accueil'), findsOneWidget);
      expect(find.text('Témoignages'), findsNothing);
    });

    testWidgets('écran étroit, pas de barre du haut', (tester) async {
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.reset);
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(body: VitrinePage(
          verse: null,
          events: const [],
          kairosIndex: -1,
          campTariff: '',
          etabNames: const [],
          news: const [],
          actions: const HomeActions(),
          onDon: () {},
          onAbout: () {},
          scrollController: null,
          offline: false,
          onRetry: null,
        )),
      ));
      await tester.pump();
      expect(find.byType(TopNavWeb), findsNothing);
    });
  });

  group('Navigation par largeur, décision AppShell', () {
    // Correctif 17 nov. 2026 : sur écran large, la pilule ne doit
    // jamais apparaître, sur aucune page. La barre du haut est
    // portée par l'AppShell seulement pour l'accueil visiteur,
    // la seule page sans en-tête propre.
    test('pilule absente à 1200 px sur toutes les pages, présente à 390 px', () {
      for (var idx = 0; idx <= 4; idx++) {
        expect(navigationSansPilule(true), isTrue, reason: 'onglet $idx à 1200 px');
        expect(navigationSansPilule(false), isFalse, reason: 'onglet $idx à 390 px');
      }
    });

    test('barre du haut portée par l’AppShell : accueil visiteur seulement', () {
      expect(navigationBarreHautAppShell(true, 0, false), isTrue);
      expect(navigationBarreHautAppShell(true, 4, true), isFalse);
      expect(navigationBarreHautAppShell(true, 4, false), isFalse);
      expect(navigationBarreHautAppShell(true, 0, true), isFalse);
      expect(navigationBarreHautAppShell(true, 1, true), isFalse);
      expect(navigationBarreHautAppShell(true, 2, true), isFalse);
      expect(navigationBarreHautAppShell(true, 3, true), isFalse);
      expect(navigationBarreHautAppShell(false, 0, false), isFalse);
      expect(navigationBarreHautAppShell(false, 4, true), isFalse);
    });
  });

  group('Navigation par largeur, bouton Messagerie', () {
    testWidgets('pastille or avec le nombre de non lus', (tester) async {
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(
          body: BoutonMessagerie(nonLus: ValueNotifier<int>(3), onTap: () {}),
        ),
      ));
      await tester.pump();
      expect(find.byIcon(Icons.chat_bubble_outline), findsOneWidget);
      expect(find.text('3'), findsOneWidget);
    });

    testWidgets('aucune pastille quand rien n’est non lu', (tester) async {
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(
          body: BoutonMessagerie(nonLus: ValueNotifier<int>(0), onTap: () {}),
        ),
      ));
      await tester.pump();
      expect(find.byIcon(Icons.chat_bubble_outline), findsOneWidget);
      expect(find.text('0'), findsNothing);
    });

    testWidgets('sans compteur, la bulle seule, sans pastille', (tester) async {
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(body: BoutonMessagerie(onTap: () {})),
      ));
      await tester.pump();
      expect(find.byIcon(Icons.chat_bubble_outline), findsOneWidget);
    });

    testWidgets('un toucher appelle le gestionnaire', (tester) async {
      var touche = false;
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(
          body: BoutonMessagerie(nonLus: ValueNotifier<int>(1), onTap: () => touche = true),
        ),
      ));
      await tester.pump();
      await tester.tap(find.byIcon(Icons.chat_bubble_outline));
      expect(touche, true);
    });
  });
}
