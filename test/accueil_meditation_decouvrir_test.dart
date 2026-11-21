// Tests de la tranche accueil, 17 nov. 2026 : méditation en
// accordéon repliée par défaut avec chevron seul, grille
// Découvrir à 4 tuiles sans sous-titre.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/home_web.dart';

void main() {
  const verse = HomeVerse(
    text: 'Écris la vision, grave-la sur des tablettes.',
    ref: 'Habacuc 2:2',
    version: 'LSG',
    book: 34,
    chapter: 2,
    verse: 2,
  );
  const reflection =
      'Une vision reste floue tant qu’elle n’est pas écrite. Notez aujourd’hui ce que Dieu vous montre.';

  Future<void> pomperAccueil(WidgetTester tester) async {
    tester.view.physicalSize = const Size(390, 4000);
    tester.view.devicePixelRatio = 1.0;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: HomeWeb(
            actions: const HomeActions(),
            visitor: false,
            showBottomNav: false,
            verse: verse,
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 100));
  }

  setUp(() {
    SharedPreferences.setMockInitialValues({});
  });

  group('Tranche accueil, méditation en accordéon', () {
    testWidgets('repliée : en-tête, date, verset et titre seulement', (tester) async {
      await pomperAccueil(tester);
      expect(find.text('MÉDITATION QUOTIDIENNE'), findsOneWidget);
      expect(find.text('Écrire la vision'), findsOneWidget);
      // Ni aperçu de la réflexion, ni boutons blancs.
      expect(find.text(reflection), findsNothing);
      expect(find.text('Noter une révélation liée à ce passage'), findsNothing);
      expect(find.text('Préparer un message à partir de ce passage'), findsNothing);
      expect(find.text('Noter'), findsNothing);
      expect(find.text('Préparer'), findsNothing);
      // Chevron bas seul, pas de livre.
      expect(find.byIcon(Icons.expand_more_outlined), findsOneWidget);
      expect(find.byIcon(Icons.book_outlined), findsNothing);
    });

    testWidgets('chevron seul : ouvrir puis réduire', (tester) async {
      await pomperAccueil(tester);
      await tester.tap(find.byIcon(Icons.expand_more_outlined));
      await tester.pump();
      expect(find.text(reflection), findsOneWidget);
      expect(find.text('Noter'), findsOneWidget);
      expect(find.text('Préparer'), findsOneWidget);
      expect(find.byIcon(Icons.expand_less_outlined), findsOneWidget);
      expect(find.byIcon(Icons.expand_more_outlined), findsNothing);
      await tester.tap(find.byIcon(Icons.expand_less_outlined));
      await tester.pump();
      expect(find.text(reflection), findsNothing);
      expect(find.text('Noter'), findsNothing);
      expect(find.byIcon(Icons.expand_more_outlined), findsOneWidget);
    });
  });

  group('Tranche accueil, grille Découvrir', () {
    testWidgets('4 tuiles sans sous-titre', (tester) async {
      await pomperAccueil(tester);
      expect(find.text('Parole Vivante'), findsOneWidget);
      expect(find.text('Prière'), findsOneWidget);
      expect(find.text('Camps & Retraites'), findsOneWidget);
      expect(find.text('Établissements'), findsOneWidget);
      expect(find.text('Mon épanouissement'), findsNothing);
      expect(find.text('Tremplin professionnel'), findsNothing);
      expect(find.text('S’inscrire'), findsNothing);
      expect(find.text('Activités par école'), findsNothing);
      expect(find.text('Plan de lecture : 21 jours'), findsNothing);
      expect(find.text('Offres selon votre pays'), findsNothing);
    });
  });
}
