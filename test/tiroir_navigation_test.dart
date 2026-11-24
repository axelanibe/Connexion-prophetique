// Tiroir sans section Navigation, refonte totale, tranche 1,
// carte 176, 24 nov. 2026 : la section Navigation n'a toujours
// pas de titre, mais les six entrées sont dans le tiroir, Accueil,
// Bible, Librairie, Structure, Mur des membres, Témoignages.
// Le mur est membre seulement, le visiteur voit les cinq autres.
// Les onglets restent joignables par la pilule et la barre du haut.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/tiroir_intelligent.dart';

void main() {
  group('Tiroir sans section Navigation', () {
    setUp(() {
      SharedPreferences.setMockInitialValues({});
      app.member = null;
      app.lang = 'fr';
      TiroirContexte.instance.definirPourTests(aEnfants: true, aResultats: true);
      AideCompteurs.instance.reinitialiserPourTests();
    });

    tearDown(() {
      app.member = null;
      AideCompteurs.instance.reinitialiserPourTests();
    });

    testWidgets('390 px : aucune section Navigation, cinq entrées, mur absent', (
      tester,
    ) async {
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      await tester.pumpWidget(const MaterialApp(home: MenuLateral()));
      await tester.pumpAndSettle();
      // Aucune section Navigation, ni son titre.
      expect(find.text('Navigation'), findsNothing);
      // Les cinq entrées d'onglet sont dans le tiroir.
      expect(find.text('Accueil'), findsOneWidget);
      expect(find.text('Bible'), findsOneWidget);
      expect(find.text('Librairie'), findsOneWidget);
      expect(find.text('Structure'), findsOneWidget);
      expect(find.text('Témoignages'), findsOneWidget);
      // Le mur est membre seulement, absent pour le visiteur.
      expect(find.text('Mur des membres'), findsNothing);
      expect(tester.takeException(), isNull);
    });

    testWidgets('membre : six entrées, mur présent', (tester) async {
      app.member = Member('Test', 'CP-TT-2526', 'Céleste', DateTime(2026, 1, 1));
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      await tester.pumpWidget(const MaterialApp(home: MenuLateral()));
      await tester.pumpAndSettle();
      expect(find.text('Accueil'), findsOneWidget);
      expect(find.text('Bible'), findsOneWidget);
      expect(find.text('Librairie'), findsOneWidget);
      expect(find.text('Structure'), findsOneWidget);
      expect(find.text('Mur des membres'), findsOneWidget);
      expect(find.text('Témoignages'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  });
}
