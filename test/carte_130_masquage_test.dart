// Tests de la carte 130, masquage au défilement, 17 nov. 2026 :
// masquage selon la direction, comme Facebook : la pilule se
// cache quand on descend, elle revient tout de suite quand on
// remonte, sans attendre l'arrêt du défilement. Sans défilement,
// elle reste visible. Un défilement horizontal (carrousel) ne la
// cache jamais. Correctif défilement, 17 nov. 2026 : pilule
// translucide, bleu nuit à 80 % avec flou d'arrière-plan, le
// contenu glisse derrière elle pendant le défilement.
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
      // Pilule façon Facebook, 17 nov. 2026 : icônes seules, sans
      // libellé visible. Le nom de l'onglet reste dans l'aide à
      // l'accessibilité, jamais affiché à l'écran.
      expect(find.text('Accueil'), findsNothing);
      expect(find.bySemanticsLabel('Accueil'), findsOneWidget);
      expect(find.bySemanticsLabel('Carte'), findsOneWidget);
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

  group('Correctif défilement, pilule translucide', () {
    testWidgets('fond bleu nuit à 80 % avec flou d’arrière-plan', (tester) async {
      await _pomperPilule(tester, cachee: false);
      expect(find.byType(BackdropFilter), findsOneWidget);
      final fonds = tester.widgetList<Container>(find.byType(Container)).where((c) => c.color != null).map((c) => c.color!).toList();
      expect(fonds, contains(W.navy.withValues(alpha: 0.8)));
    });

    testWidgets('translucide aussi quand elle est cachée', (tester) async {
      await _pomperPilule(tester, cachee: true);
      expect(find.byType(BackdropFilter), findsOneWidget);
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

    testWidgets('fin de défilement seule : rien ne change, pas de retour au minuteur', (tester) async {
      await tester.pumpWidget(const SizedBox.shrink());
      final ctx = tester.element(find.byType(SizedBox));
      final c = ControleurMasquagePilule();
      addTearDown(c.dispose);
      c.surNotification(ScrollUpdateNotification(metrics: _metriquesVerticales, context: ctx, scrollDelta: 20));
      expect(c.cachee, isTrue);
      c.surNotification(ScrollEndNotification(metrics: _metriquesVerticales, context: ctx));
      await tester.pump(const Duration(milliseconds: 500));
      expect(c.cachee, isTrue);
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

    testWidgets('défilement vers le bas : elle se cache et reste cachée à l’arrêt', (tester) async {
      final c = ControleurMasquagePilule();
      addTearDown(c.dispose);
      await pomperChaine(tester, c);
      expect(_opacitePilule(tester), 1.0);
      final defilant = tester.state<ScrollableState>(find.byType(Scrollable));
      defilant.position.jumpTo(300);
      await tester.pump(const Duration(milliseconds: 100));
      expect(_opacitePilule(tester), lessThan(1.0));
      await tester.pumpAndSettle();
      expect(_opacitePilule(tester), 0.0);
    });

    testWidgets('remontée : elle revient tout de suite, sans attendre l’arrêt', (tester) async {
      final c = ControleurMasquagePilule();
      addTearDown(c.dispose);
      await pomperChaine(tester, c);
      final defilant = tester.state<ScrollableState>(find.byType(Scrollable));
      defilant.position.jumpTo(300);
      await tester.pumpAndSettle();
      expect(_opacitePilule(tester), 0.0);
      defilant.position.jumpTo(0);
      await tester.pumpAndSettle();
      expect(_opacitePilule(tester), 1.0);
    });
  });
}
