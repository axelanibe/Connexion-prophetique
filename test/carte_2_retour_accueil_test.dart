// Tests de la carte 2, retour à l'accueil après une
// publication, 21 nov. 2026 : après une story publiée, le
// retour laissait une page vide, sans en-tête ni pilule, avec
// un seul cercle bleu nuit. Cause : le retour ne produit
// aucun défilement, donc l'en-tête et la pilule restaient
// masquées tant que l'utilisateur ne défilait pas de nouveau.
// Correctif : la bande appelle un rappel après la publication,
// l'accueil revient en haut, ce qui fait revenir l'en-tête et
// la pilule et force le repeint. Le masquage lui-même ne
// change pas.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/home_web.dart';
import 'package:connexion_prophetique/stories.dart';

class _ClientFaux extends ApiClient {
  @override
  Future<List<Map<String, dynamic>>> fetchStories() async => [];

  @override
  Future<Map<String, dynamic>> publierTemoignage({List<int>? bytes, String? filename, String? texte}) async =>
      {'ok': true};
}

void main() {
  group('Carte 2, retour après publication', () {
    testWidgets('le rappel est appelé après une publication réussie', (tester) async {
      var appels = 0;
      // Fenêtre haute : le bouton Publier du compositeur est
      // sous le pli, la liste est paresseuse et ne le construit
      // qu'une fois visible.
      tester.view.physicalSize = const Size(800, 2000);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(
          body: StoriesStrip(
            client: _ClientFaux(),
            peutPublier: true,
            apresPublication: () => appels++,
          ),
        ),
      ));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Publier'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Témoignage'));
      await tester.pumpAndSettle();
      expect(find.text('Publier un témoignage'), findsOneWidget);
      await tester.enterText(find.byType(TextField), 'Merci Seigneur');
      await tester.pump();
      await tester.tap(find.byWidgetPredicate((w) => w is FilledButton));
      await tester.pumpAndSettle();
      expect(appels, 1);
      expect(find.text('Publier'), findsOneWidget);
    });

    testWidgets('sans publication, le rappel n’est pas appelé', (tester) async {
      var appels = 0;
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(
          body: StoriesStrip(
            client: _ClientFaux(),
            peutPublier: true,
            apresPublication: () => appels++,
          ),
        ),
      ));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Publier'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Témoignage'));
      await tester.pumpAndSettle();
      await tester.tap(find.byTooltip('Retour'));
      await tester.pumpAndSettle();
      expect(appels, 0);
    });
  });

  group('Carte 2, montrer sans défilement', () {
    testWidgets('montrer fait revenir la pilule cachée, sans attendre un défilement', (tester) async {
      await tester.pumpWidget(const SizedBox.shrink());
      final ctx = tester.element(find.byType(SizedBox));
      final c = ControleurMasquagePilule();
      addTearDown(c.dispose);
      final metriques = FixedScrollMetrics(
        minScrollExtent: 0,
        maxScrollExtent: 1000,
        pixels: 100,
        viewportDimension: 500,
        axisDirection: AxisDirection.down,
        devicePixelRatio: 1.0,
      );
      c.surNotification(ScrollUpdateNotification(metrics: metriques, context: ctx, scrollDelta: 20));
      expect(c.cachee, isTrue);
      var notifie = false;
      c.addListener(() => notifie = true);
      c.montrer();
      expect(c.cachee, isFalse);
      expect(notifie, isTrue);
    });

    testWidgets('remonter en haut fait revenir la pilule', (tester) async {
      final c = ControleurMasquagePilule();
      addTearDown(c.dispose);
      final controleur = ScrollController();
      addTearDown(controleur.dispose);
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(
          body: NotificationListener<ScrollNotification>(
            onNotification: c.surNotification,
            child: ListView.builder(
              controller: controleur,
              itemCount: 30,
              itemBuilder: (context, i) => SizedBox(height: 100, child: Text('Élément $i')),
            ),
          ),
          bottomNavigationBar: AnimatedBuilder(
            animation: c,
            builder: (context, child) => BottomNavWeb(index: 0, onTap: (_) {}, hidden: c.cachee),
          ),
        ),
      ));
      await tester.pump();
      final defilant = tester.state<ScrollableState>(find.byType(Scrollable));
      // ignore: unawaited_futures
      defilant.position.animateTo(300, duration: const Duration(milliseconds: 500), curve: Curves.linear);
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));
      expect(tester.widget<AnimatedOpacity>(find.byType(AnimatedOpacity)).opacity, lessThan(1.0));
      // Retour en haut, comme après une publication : la pilule
      // revient, sans attendre un nouveau geste de l'utilisateur.
      // ignore: unawaited_futures
      controleur.animateTo(0, duration: const Duration(milliseconds: 300), curve: Curves.easeOut);
      await tester.pumpAndSettle();
      expect(controleur.offset, 0.0);
      expect(tester.widget<AnimatedOpacity>(find.byType(AnimatedOpacity)).opacity, 1.0);
    });
  });
}
