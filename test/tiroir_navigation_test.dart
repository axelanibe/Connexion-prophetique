// Tiroir sans section Navigation, 19 nov. 2026.
// Réorganisation du tiroir, décision d'Axel : la section
// Navigation entière disparaît, Témoignages reste comme entrée
// seule dans le tiroir, sans section. Les autres entrées de
// l'ancienne section restent joignables par la pilule, la carte
// ou l'en-tête, jamais par le tiroir.
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
      SignalementsCompteurs.instance.reinitialiserPourTests();
    });

    tearDown(() {
      app.member = null;
      SignalementsCompteurs.instance.reinitialiserPourTests();
    });

    testWidgets('390 px : aucune section Navigation, Témoignages seul', (
      tester,
    ) async {
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      await tester.pumpWidget(const MaterialApp(home: MenuLateral()));
      await tester.pumpAndSettle();
      // Aucune section Navigation, ni son titre, ni ses entrées.
      expect(find.text('Navigation'), findsNothing);
      expect(find.text('Bible'), findsNothing);
      expect(find.text('Librairie'), findsNothing);
      expect(find.text('Structure'), findsNothing);
      // Témoignages reste, comme entrée seule.
      expect(find.text('Témoignages'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  });
}
