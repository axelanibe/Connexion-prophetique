// Tests de la tranche T19, icônes et polices conformes à la
// maquette, 26 nov. 2026. Les données de membre ci-dessous
// sont des données de test, jamais les vraies données d'Axel.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/nouveau/coquille.dart';

// Données de test seulement.
final _membreTest = Member(
  'Test Membre',
  'CP-TEST-0000',
  'Bureau national',
  DateTime(2025, 1, 1),
);

void main() {
  group('T19, barre du bas en Lucide', () {
    testWidgets('les cinq onglets portent les icônes de la maquette',
        (tester) async {
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      await tester.pumpWidget(MaterialApp(
        home: NouvelleCoquille(membre: _membreTest),
      ));
      await tester.pumpAndSettle();
      expect(find.byIcon(LucideIcons.home), findsOneWidget);
      expect(find.byIcon(LucideIcons.bookOpen), findsOneWidget);
      expect(find.byIcon(LucideIcons.users), findsOneWidget);
      expect(find.byIcon(LucideIcons.shoppingBag), findsOneWidget);
      expect(find.byIcon(LucideIcons.ellipsis), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  });

  group('T19, police du thème', () {
    test('le corps est en Public Sans, police de la maquette', () {
      final theme = buildTheme();
      expect(theme.textTheme.bodyMedium?.fontFamily, 'Public Sans');
      expect(theme.textTheme.bodySmall?.fontFamily, 'Public Sans');
      expect(theme.textTheme.labelLarge?.fontFamily, 'Public Sans');
    });
  });
}
