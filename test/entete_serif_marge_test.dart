// En-tête serif et marge basse, 19 nov. 2026, décisions d'Axel :
// le logo bleu et rouge sort, remplacé par le sigle CP et
// « Connexion Prophétique » en Playfair Display, « Connexion »
// en or et « Prophétique » en blanc ; le sac Mes achats sort de
// l'en-tête, l'entrée reste dans le tiroir ; les icônes de
// l'en-tête passent en Lucide, traits fins ; la marge basse de
// l'accueil passe à 88 px pour que la dernière carte passe
// entièrement au-dessus de la pilule quand on défile jusqu'en bas.
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/home_web.dart';
import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/web_assets.dart';

/// Le titre de l'en-tête : RichText « Connexion Prophétique »
/// en Playfair Display.
Finder get _titreEntete => find.byWidgetPredicate((w) {
      if (w is! RichText) return false;
      if (w.text.toPlainText() != 'Connexion Prophétique') return false;
      final style = w.text.style;
      return style != null && (style.fontFamily ?? '').contains('Playfair');
    });

void main() {
  group('En-tête serif, variante SliverAppBar, membre connecté', () {
    setUp(() {
      SharedPreferences.setMockInitialValues({});
      app.member = Member('Test', 'CP-TT-2526', 'Céleste', DateTime(2026, 1, 1));
      app.isAdmin = false;
    });

    tearDown(() {
      app.member = null;
      app.isAdmin = false;
    });

    testWidgets('sigle et titre serif, pas de logo, pas de sac, à 390 px', (tester) async {
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      await tester.pumpWidget(MaterialApp(home: basic('Bible', [const Text('Contenu')])));
      await tester.pumpAndSettle();
      expect(tester.takeException(), isNull);
      expect(_titreEntete, findsOneWidget);
      final titre = tester.widget<RichText>(_titreEntete);
      final racine = titre.text as TextSpan;
      expect(racine.style?.fontFamily, contains('Playfair'));
      expect(racine.style?.fontWeight, FontWeight.w700);
      expect(racine.style?.fontSize, 16);
      final parties = racine.children!.cast<TextSpan>();
      expect(parties[0].text, 'Connexion');
      expect(parties[0].style?.color, const Color(0xFFE5C158));
      expect(parties[1].text, ' Prophétique');
      expect(parties[1].style?.color, Colors.white);
      // Le logo bleu et rouge est absent, le sac aussi.
      expect(find.byWidgetPredicate((w) => w is WebAssetImage && w.asset == 'assets/logo_entete.jpg'), findsNothing);
      expect(find.byIcon(Icons.shopping_bag_outlined), findsNothing);
      expect(find.byTooltip('Mes achats'), findsNothing);
      // Le hamburger, la loupe, la bulle et l'avatar sont en Lucide.
      expect(find.byIcon(LucideIcons.menu), findsOneWidget);
      expect(find.byIcon(Icons.menu), findsNothing);
      expect(find.byIcon(LucideIcons.search), findsOneWidget);
      expect(find.byIcon(LucideIcons.messageCircle), findsOneWidget);
      expect(find.byIcon(LucideIcons.user), findsOneWidget);
      // Sans action de page, le titre tient à 16 px : la largeur
      // allouée au texte est de 184 px, le vrai Playfair à 16 px
      // en fait 176, donc aucune réduction, titre entier.
      final boite = find.ancestor(of: _titreEntete, matching: find.byType(SizedBox));
      expect(boite, findsOneWidget);
      expect(tester.getSize(boite).width, greaterThanOrEqualTo(180));
    });
  });

  group('En-tête serif, variante AppBar, sans membre', () {
    testWidgets('sigle et titre serif, hamburger sur une racine', (tester) async {
      SharedPreferences.setMockInitialValues({});
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      app.member = null;
      await tester.pumpWidget(MaterialApp(home: basic('Titre', [const Text('Contenu')])));
      await tester.pumpAndSettle();
      expect(tester.takeException(), isNull);
      expect(_titreEntete, findsOneWidget);
      expect(find.byWidgetPredicate((w) => w is WebAssetImage && w.asset == 'assets/logo_entete.jpg'), findsNothing);
      expect(find.byIcon(LucideIcons.menu), findsOneWidget);
      expect(find.byIcon(LucideIcons.arrowLeft), findsNothing);
    });

    testWidgets('bouton retour Lucide sur une page intérieure, il dépile', (tester) async {
      SharedPreferences.setMockInitialValues({});
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      app.member = Member('Test', 'CP-TT-2526', 'Céleste', DateTime(2026, 1, 1));
      addTearDown(() {
        app.member = null;
      });
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(
          body: Builder(
            builder: (ctx) => TextButton(
              onPressed: () => Navigator.of(ctx).push(MaterialPageRoute(builder: (_) => basic('Page 2', [const Text('Contenu 2')]))),
              child: const Text('Aller'),
            ),
          ),
        ),
      ));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Aller'));
      await tester.pumpAndSettle();
      expect(tester.takeException(), isNull);
      expect(_titreEntete, findsOneWidget);
      expect(find.byIcon(LucideIcons.arrowLeft), findsOneWidget);
      expect(find.byTooltip('Menu'), findsNothing);
      await tester.tap(find.byIcon(LucideIcons.arrowLeft));
      await tester.pumpAndSettle();
      expect(find.text('Aller'), findsOneWidget);
    });
  });

  group('Marge basse de l’accueil, 19 nov. 2026', () {
    testWidgets('le bas de la dernière carte passe au-dessus de la pilule', (tester) async {
      SharedPreferences.setMockInitialValues({});
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      const verse = HomeVerse(
        text: 'Écris la vision, grave-la sur des tablettes.',
        ref: 'Habacuc 2:2',
        version: 'LSG',
        book: 34,
        chapter: 2,
        verse: 2,
      );
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: HomeWeb(
              actions: const HomeActions(),
              visitor: false,
              showBottomNav: false,
              verse: verse,
            ),
            bottomNavigationBar: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                BottomNavWeb(index: 0, onTap: (_) {}),
              ],
            ),
          ),
        ),
      );
      await tester.pumpAndSettle(const Duration(seconds: 2));
      await tester.scrollUntilVisible(
        find.text('© 2026 CONNEXION PROPHÉTIQUE'),
        500,
        scrollable: find.byType(Scrollable),
      );
      await tester.pumpAndSettle(const Duration(seconds: 1));
      // Marge basse 88 px, 19 nov. 2026 : 32 + la hauteur de la
      // pilule, 56. Le bas du pied de page passe au moins 56 px
      // au-dessus du haut de la pilule, donc la dernière carte
      // est entièrement visible quand on défile jusqu'en bas.
      final basPied = tester.getBottomLeft(find.text('© 2026 CONNEXION PROPHÉTIQUE')).dy;
      final hautPilule = tester.getTopLeft(find.byType(BottomNavWeb)).dy;
      expect(hautPilule - basPied, greaterThanOrEqualTo(56));
    });
  });

  group('En-tête serif, source', () {
    test('plus de logo bleu et rouge ni de sac dans les en-têtes', () {
      final principal = File('lib/main.dart').readAsStringSync();
      final accueil = File('lib/home_web.dart').readAsStringSync();
      final logo = File('lib/header_logo.dart').readAsStringSync();
      expect(logo, isNot(contains('logoEnteteNouveau')));
      expect(logo, contains('titreEntete'));
      expect(principal, isNot(contains('logoEnteteNouveau')));
      expect(accueil, isNot(contains('logoEnteteNouveau')));
      expect(principal, isNot(contains('kLogoEnteteParts')));
      expect(accueil, isNot(contains('onBag')));
      expect(principal, isNot(contains('onBag')));
      // Les trois points du Profil sont en Lucide.
      expect(principal, contains('LucideIcons.moreVertical'));
    });
  });
}
