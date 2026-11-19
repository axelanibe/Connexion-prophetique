// Tests de la carte 130, masquage au défilement, 17 nov. 2026 :
// masquage selon la direction, comme Facebook : la pilule se
// cache quand on descend, elle revient tout de suite quand on
// remonte. 18 nov. 2026, décision d'Axel : elle revient aussi
// quand le défilement s'arrête après une descente, pas seulement
// quand on remonte. Sans défilement, elle reste visible. Un
// défilement horizontal (carrousel) ne la cache jamais.
// Pilule blanche, 19 nov. 2026, choix d'Axel : fond blanc
// plein, noms sous les icônes, onglet actif bleu nuit, sans
// flou d'arrière-plan depuis le retrait du 19 nov. 2026.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/home_web.dart';

final _metriquesVerticales = FixedScrollMetrics(
  minScrollExtent: 0,
  maxScrollExtent: 1000,
  pixels: 100,
  viewportDimension: 500,
  axisDirection: AxisDirection.down,
  devicePixelRatio: 1.0,
);

final _metriquesHorizontales = FixedScrollMetrics(
  minScrollExtent: 0,
  maxScrollExtent: 1000,
  pixels: 100,
  viewportDimension: 500,
  axisDirection: AxisDirection.right,
  devicePixelRatio: 1.0,
);

double _opacitePilule(WidgetTester tester) =>
    tester.widget<AnimatedOpacity>(find.byType(AnimatedOpacity)).opacity;

Offset _glissementPilule(WidgetTester tester) =>
    tester.widget<AnimatedSlide>(find.byType(AnimatedSlide)).offset;

Future<void> _pomperPilule(WidgetTester tester, {required bool cachee}) async {
  await tester.pumpWidget(MaterialApp(
    home: Scaffold(
      body: const SizedBox.shrink(),
      bottomNavigationBar: BottomNavWeb(index: 0, onTap: (_) {}, hidden: cachee),
    ),
  ));
  await tester.pump();
}

void main() {
  group('Carte 130, masquage, pilule seule', () {
    testWidgets('visible au départ, opaque et en place', (tester) async {
      final poignee = tester.ensureSemantics();
      await _pomperPilule(tester, cachee: false);
      expect(_opacitePilule(tester), 1.0);
      expect(_glissementPilule(tester), Offset.zero);
      // Pilule façon Facebook, 19 nov. 2026, décision d'Axel,
      // modèle projection : le nom de l'onglet est affiché sous
      // l'icône, pas seulement dans l'aide à l'accessibilité.
      expect(find.text('Accueil'), findsOneWidget);
      expect(find.bySemanticsLabel('Accueil'), findsOneWidget);
      // 18 nov. 2026 : Témoignages quitte la pilule et rejoint le
      // tiroir, la pilule revient à 4 onglets.
      expect(find.bySemanticsLabel('Témoignages'), findsNothing);
      expect(find.bySemanticsLabel('Structure'), findsOneWidget);
      // À libérer ici : la vérification de fin de test passe
      // avant les addTearDown.
      poignee.dispose();
    });

    testWidgets('cachée : transparente et glissée vers le bas', (tester) async {
      await _pomperPilule(tester, cachee: true);
      expect(_opacitePilule(tester), 0.0);
      expect(_glissementPilule(tester), const Offset(0, 1.6));
    });

    testWidgets('aller et retour : elle se cache puis revient', (tester) async {
      await _pomperPilule(tester, cachee: false);
      expect(_opacitePilule(tester), 1.0);
      await _pomperPilule(tester, cachee: true);
      await tester.pumpAndSettle();
      expect(_opacitePilule(tester), 0.0);
      expect(_glissementPilule(tester), const Offset(0, 1.6));
      await _pomperPilule(tester, cachee: false);
      await tester.pumpAndSettle();
      expect(_opacitePilule(tester), 1.0);
      expect(_glissementPilule(tester), Offset.zero);
    });
  });

  group('Pilule blanche, 19 nov. 2026', () {
    testWidgets('fond blanc plein', (tester) async {
      await _pomperPilule(tester, cachee: false);
      // 19 nov. 2026 : plus de flou d'arrière-plan, la pilule
      // est blanche opaque, le flou pouvait déborder en bande
      // blanche sur Safari iPhone.
      expect(find.byType(BackdropFilter), findsNothing);
      final fonds = tester.widgetList<Container>(find.byType(Container)).where((c) => c.color != null).map((c) => c.color!).toList();
      expect(fonds, contains(Colors.white));
    });

    testWidgets('noms des 4 onglets visibles sous les icônes', (tester) async {
      await _pomperPilule(tester, cachee: false);
      expect(find.text('Accueil'), findsOneWidget);
      expect(find.text('Bible'), findsOneWidget);
      expect(find.text('Librairie'), findsOneWidget);
      expect(find.text('Structure'), findsOneWidget);
    });

    testWidgets('pas de flou d’arrière-plan, même quand elle est cachée', (tester) async {
      await _pomperPilule(tester, cachee: true);
      expect(find.byType(BackdropFilter), findsNothing);
    });
  });

  group('Carte 130, masquage, contrôleur selon la direction', () {
    testWidgets('descend : elle se cache tout de suite', (tester) async {
      await tester.pumpWidget(const SizedBox.shrink());
      final ctx = tester.element(find.byType(SizedBox));
      final c = ControleurMasquagePilule();
      addTearDown(c.dispose);
      expect(c.cachee, isFalse);
      c.surNotification(ScrollUpdateNotification(metrics: _metriquesVerticales, context: ctx, scrollDelta: 20));
      expect(c.cachee, isTrue);
    });

    testWidgets('remonte : elle revient tout de suite, sans attendre', (tester) async {
      await tester.pumpWidget(const SizedBox.shrink());
      final ctx = tester.element(find.byType(SizedBox));
      final c = ControleurMasquagePilule();
      addTearDown(c.dispose);
      c.surNotification(ScrollUpdateNotification(metrics: _metriquesVerticales, context: ctx, scrollDelta: 20));
      expect(c.cachee, isTrue);
      c.surNotification(ScrollUpdateNotification(metrics: _metriquesVerticales, context: ctx, scrollDelta: -20));
      expect(c.cachee, isFalse);
    });

    testWidgets('fin de défilement : elle revient à l’arrêt, même après une descente', (tester) async {
      await tester.pumpWidget(const SizedBox.shrink());
      final ctx = tester.element(find.byType(SizedBox));
      final c = ControleurMasquagePilule();
      addTearDown(c.dispose);
      c.surNotification(ScrollUpdateNotification(metrics: _metriquesVerticales, context: ctx, scrollDelta: 20));
      expect(c.cachee, isTrue);
      // 18 nov. 2026, décision d'Axel : l'arrêt après une
      // descente fait revenir la pilule, pas seulement la remontée.
      c.surNotification(ScrollEndNotification(metrics: _metriquesVerticales, context: ctx));
      expect(c.cachee, isFalse);
      c.surNotification(ScrollUpdateNotification(metrics: _metriquesVerticales, context: ctx, scrollDelta: -20));
      expect(c.cachee, isFalse);
    });

    testWidgets('défilement horizontal et dépassement : horizontal ne cache pas, dépassement bas cache, dépassement haut montre', (tester) async {
      await tester.pumpWidget(const SizedBox.shrink());
      final ctx = tester.element(find.byType(SizedBox));
      final c = ControleurMasquagePilule();
      addTearDown(c.dispose);
      c.surNotification(ScrollUpdateNotification(metrics: _metriquesHorizontales, context: ctx, scrollDelta: 20));
      expect(c.cachee, isFalse);
      c.surNotification(OverscrollNotification(metrics: _metriquesVerticales, context: ctx, overscroll: 10, velocity: 0));
      expect(c.cachee, isTrue);
      c.surNotification(OverscrollNotification(metrics: _metriquesVerticales, context: ctx, overscroll: -10, velocity: 0));
      expect(c.cachee, isFalse);
    });
  });

  group('Carte 130, masquage, chaîne complète', () {
    Future<void> pomperChaine(WidgetTester tester, ControleurMasquagePilule controleur) async {
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(
          body: NotificationListener<ScrollNotification>(
            onNotification: controleur.surNotification,
            child: ListView.builder(
              itemCount: 30,
              itemBuilder: (context, i) => SizedBox(height: 100, child: Text('Élément $i')),
            ),
          ),
          bottomNavigationBar: AnimatedBuilder(
            animation: controleur,
            builder: (context, child) => BottomNavWeb(index: 0, onTap: (_) {}, hidden: controleur.cachee),
          ),
        ),
      ));
      await tester.pump();
    }

    testWidgets('sans défilement, la pilule reste visible', (tester) async {
      final c = ControleurMasquagePilule();
      addTearDown(c.dispose);
      await pomperChaine(tester, c);
      await tester.pump(const Duration(milliseconds: 500));
      expect(_opacitePilule(tester), 1.0);
    });

    testWidgets('défilement vers le bas : elle se cache pendant le défilement et revient à l’arrêt', (tester) async {
      final c = ControleurMasquagePilule();
      addTearDown(c.dispose);
      await pomperChaine(tester, c);
      expect(_opacitePilule(tester), 1.0);
      // Une descente animée : pendant l'animation, les mises à
      // jour de défilement cachent la pilule, sans fin encore.
      // Le minuteur de l'animation cale son départ sur la
      // première image, donc une image d'amorçage avant de mesurer.
      final defilant = tester.state<ScrollableState>(find.byType(Scrollable));
      // ignore: unawaited_futures
      defilant.position.animateTo(
        300,
        duration: const Duration(milliseconds: 500),
        curve: Curves.linear,
      );
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));
      expect(_opacitePilule(tester), lessThan(1.0));
      // 18 nov. 2026 : à l'arrêt après la descente, elle revient.
      await tester.pump(const Duration(milliseconds: 400));
      await tester.pumpAndSettle();
      expect(_opacitePilule(tester), 1.0);
    });

    testWidgets('remontée après une descente : elle reste visible', (tester) async {
      final c = ControleurMasquagePilule();
      addTearDown(c.dispose);
      await pomperChaine(tester, c);
      final defilant = tester.state<ScrollableState>(find.byType(Scrollable));
      defilant.position.jumpTo(300);
      await tester.pumpAndSettle();
      // Déjà revenue à l'arrêt après la descente, 18 nov. 2026.
      expect(_opacitePilule(tester), 1.0);
      defilant.position.jumpTo(0);
      await tester.pumpAndSettle();
      expect(_opacitePilule(tester), 1.0);
    });
  });
}
