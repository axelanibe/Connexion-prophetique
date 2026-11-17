// Tests de la carte 130, masquage au défilement, 17 nov. 2026 :
// la pilule se cache pendant le défilement (vers le bas comme
// vers le haut) et réapparaît quand le défilement s'arrête, comme
// Facebook. Sans défilement, elle reste visible. Un défilement
// horizontal (carrousel) ne la cache jamais.
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
      await _pomperPilule(tester, cachee: false);
      expect(_opacitePilule(tester), 1.0);
      expect(_glissementPilule(tester), Offset.zero);
      expect(find.text('Accueil'), findsOneWidget);
      expect(find.text('Carte'), findsOneWidget);
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

  group('Carte 130, masquage, contrôleur', () {
    testWidgets('cachée sur défilement vertical, retour 350 ms après l’arrêt', (tester) async {
      await tester.pumpWidget(const SizedBox.shrink());
      final ctx = tester.element(find.byType(SizedBox));
      final c = ControleurMasquagePilule();
      addTearDown(c.dispose);
      expect(c.cachee, isFalse);
      c.surNotification(ScrollUpdateNotification(metrics: _metriquesVerticales, context: ctx, scrollDelta: 20));
      expect(c.cachee, isTrue);
      c.surNotification(ScrollEndNotification(metrics: _metriquesVerticales, context: ctx));
      expect(c.cachee, isTrue);
      await tester.pump(const Duration(milliseconds: 200));
      expect(c.cachee, isTrue);
      await tester.pump(const Duration(milliseconds: 200));
      expect(c.cachee, isFalse);
    });

    testWidgets('un nouveau défilement annule le retour : elle ne revient qu’à l’arrêt réel', (tester) async {
      await tester.pumpWidget(const SizedBox.shrink());
      final ctx = tester.element(find.byType(SizedBox));
      final c = ControleurMasquagePilule();
      addTearDown(c.dispose);
      c.surNotification(ScrollUpdateNotification(metrics: _metriquesVerticales, context: ctx, scrollDelta: 20));
      c.surNotification(ScrollEndNotification(metrics: _metriquesVerticales, context: ctx));
      await tester.pump(const Duration(milliseconds: 200));
      c.surNotification(ScrollUpdateNotification(metrics: _metriquesVerticales, context: ctx, scrollDelta: 20));
      await tester.pump(const Duration(milliseconds: 400));
      expect(c.cachee, isTrue);
      c.surNotification(ScrollEndNotification(metrics: _metriquesVerticales, context: ctx));
      await tester.pump(const Duration(milliseconds: 400));
      expect(c.cachee, isFalse);
    });

    testWidgets('défilement horizontal et dépassement : horizontal ne cache pas, dépassement cache', (tester) async {
      await tester.pumpWidget(const SizedBox.shrink());
      final ctx = tester.element(find.byType(SizedBox));
      final c = ControleurMasquagePilule();
      addTearDown(c.dispose);
      c.surNotification(ScrollUpdateNotification(metrics: _metriquesHorizontales, context: ctx, scrollDelta: 20));
      expect(c.cachee, isFalse);
      c.surNotification(OverscrollNotification(metrics: _metriquesVerticales, context: ctx, overscroll: 10, velocity: 0));
      expect(c.cachee, isTrue);
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

    testWidgets('défilement vers le bas : elle se cache puis revient à l’arrêt', (tester) async {
      final c = ControleurMasquagePilule();
      addTearDown(c.dispose);
      await pomperChaine(tester, c);
      expect(_opacitePilule(tester), 1.0);
      final defilant = tester.state<ScrollableState>(find.byType(Scrollable));
      defilant.position.jumpTo(300);
      await tester.pump(const Duration(milliseconds: 100));
      expect(_opacitePilule(tester), lessThan(1.0));
      await tester.pump(const Duration(milliseconds: 600));
      expect(_opacitePilule(tester), 1.0);
    });

    testWidgets('défilement vers le haut : elle se cache puis revient à l’arrêt', (tester) async {
      final c = ControleurMasquagePilule();
      addTearDown(c.dispose);
      await pomperChaine(tester, c);
      final defilant = tester.state<ScrollableState>(find.byType(Scrollable));
      defilant.position.jumpTo(300);
      await tester.pumpAndSettle();
      expect(_opacitePilule(tester), 1.0);
      defilant.position.jumpTo(0);
      await tester.pump(const Duration(milliseconds: 100));
      expect(_opacitePilule(tester), lessThan(1.0));
      await tester.pump(const Duration(milliseconds: 600));
      expect(_opacitePilule(tester), 1.0);
    });
  });
}
