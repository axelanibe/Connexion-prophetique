// Tests du tiroir, section Navigation, 18 nov. 2026 :
// Témoignages quitte la pilule et rejoint le tiroir, dans une
// section Navigation en tête, avec Accueil, Bible, Librairie et
// Structure. Un toucher sur une entrée referme le tiroir puis
// demande l'onglet, appliqué par l'AppShell.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/messagerie.dart';
import 'package:connexion_prophetique/tiroir_intelligent.dart';

void main() {
  group('Tiroir, section Navigation', () {
    Future<void> ouvrirMenu(WidgetTester tester) async {
      final cle = GlobalKey<ScaffoldState>();
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(key: cle, drawer: const MenuLateral(), body: const SizedBox.shrink()),
      ));
      await tester.pump();
      cle.currentState!.openDrawer();
      await tester.pumpAndSettle();
    }

    setUp(() {
      SharedPreferences.setMockInitialValues({});
      TiroirContexte.instance.reinitialiserPourTests();
      MessagerieLectureService.instance.nonLusNotifier.value = 0;
      app.tabRequest = -1;
    });

    tearDown(() {
      TiroirContexte.instance.reinitialiserPourTests();
      MessagerieLectureService.instance.nonLusNotifier.value = 0;
      app.member = null;
      app.tabRequest = -1;
    });

    testWidgets('la section Navigation est en tête, avec les 5 onglets', (tester) async {
      await ouvrirMenu(tester);
      expect(find.text('Navigation'), findsOneWidget);
      expect(find.text('Accueil'), findsOneWidget);
      expect(find.text('Bible'), findsOneWidget);
      expect(find.text('Librairie'), findsOneWidget);
      expect(find.text('Structure'), findsOneWidget);
      expect(find.text('Témoignages'), findsOneWidget);
    });

    testWidgets('toucher Témoignages demande l’onglet 4', (tester) async {
      await ouvrirMenu(tester);
      await tester.tap(find.text('Témoignages'));
      await tester.pumpAndSettle();
      expect(app.tabRequest, 4);
    });

    testWidgets('toucher Accueil demande l’onglet 0', (tester) async {
      await ouvrirMenu(tester);
      await tester.tap(find.text('Accueil'));
      await tester.pumpAndSettle();
      expect(app.tabRequest, 0);
    });
  });
}
