// Tests de la tranche T1, nouvelle coquille, 26 nov. 2026.
// Les données de membre ci-dessous sont des données de test,
// jamais les vraies données d'Axel.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/app_models.dart';
import 'package:connexion_prophetique/nouveau/coquille.dart';

// Données de test seulement.
final _membreTest = Member(
  'Test Membre',
  'CP-TEST-0000',
  'Bureau national',
  DateTime(2025, 1, 1),
);

Future<void> _pomper(
  WidgetTester tester, {
  ValueNotifier<int>? nonLus,
  VoidCallback? onSupprimer,
}) async {
  tester.view.physicalSize = const Size(390, 844);
  tester.view.devicePixelRatio = 1.0;
  addTearDown(tester.view.resetPhysicalSize);
  await tester.pumpWidget(MaterialApp(
    home: NouvelleCoquille(
      membre: _membreTest,
      nonLus: nonLus,
      onSupprimerCompte: onSupprimer,
    ),
  ));
  await tester.pumpAndSettle();
  expect(tester.takeException(), isNull);
}

Future<void> _ouvrirTiroir(WidgetTester tester) async {
  await tester.tap(find.byIcon(Icons.menu));
  await tester.pumpAndSettle();
}

void main() {
  group('T1, nouvelle coquille', () {
    testWidgets('en-tête : nom sur une ligne à 390 px, sans débordement', (tester) async {
      await _pomper(tester);
      expect(find.text('CONNEXION PROPHÉTIQUE'), findsOneWidget);
      expect(find.text('CP'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('barre du bas : 5 onglets, navigation entre eux', (tester) async {
      await _pomper(tester);
      for (final label in ['Accueil', 'Bible', 'Connexion', 'Librairie', 'Plus']) {
        expect(find.text(label), findsWidgets);
      }
      await tester.tap(find.byIcon(Icons.menu_book_outlined));
      await tester.pumpAndSettle();
      expect(find.text('Bible'), findsNWidgets(2));
      await tester.tap(find.byIcon(Icons.grid_view_outlined));
      await tester.pumpAndSettle();
      expect(find.text('Croissance spirituelle'), findsOneWidget);
      await tester.tap(find.byIcon(Icons.home_outlined));
      await tester.pumpAndSettle();
      expect(find.text('Accueil'), findsNWidgets(2));
      expect(tester.takeException(), isNull);
    });

    testWidgets('badge messagerie : vrai nombre, masqué à 0', (tester) async {
      final nonLus = ValueNotifier<int>(2);
      await _pomper(tester, nonLus: nonLus);
      expect(find.text('2'), findsOneWidget);
      nonLus.value = 0;
      await tester.pump();
      expect(find.text('2'), findsNothing);
      nonLus.value = 5;
      await tester.pump();
      expect(find.text('5'), findsOneWidget);
    });

    testWidgets('tiroir : carte membre, groupes, recherche filtre', (tester) async {
      await _pomper(tester);
      await _ouvrirTiroir(tester);
      expect(find.text('Test Membre'), findsOneWidget);
      expect(find.text('CP-TEST-0000'), findsOneWidget);
      expect(find.text('Membre depuis 2025'), findsOneWidget);
      expect(find.text('Ma carte'), findsOneWidget);
      expect(find.text('Mon espace'), findsOneWidget);
      expect(find.text('Au quotidien'), findsOneWidget);
      await tester.enterText(find.byType(TextField), 'journal');
      await tester.pumpAndSettle();
      expect(find.text('Journal personnel'), findsOneWidget);
      expect(find.text('Méditation'), findsNothing);
      expect(find.text('Mon espace'), findsNothing);
      expect(tester.takeException(), isNull);
    });

    testWidgets('page Plus : 8 entrées dans l’ordre de la maquette', (tester) async {
      await _pomper(tester);
      await tester.tap(find.byIcon(Icons.grid_view_outlined));
      await tester.pumpAndSettle();
      const ordre = [
        'Croissance spirituelle',
        'Galerie',
        'Mes fonctions',
        'Abonnement',
        'Espace structure',
        'Mes présences',
        'Aide et contact',
        'Mes documents',
      ];
      final hauts = <double>[];
      for (final titre in ordre) {
        expect(find.text(titre), findsOneWidget);
        hauts.add(tester.getTopLeft(find.text(titre)).dy);
      }
      for (var i = 1; i < hauts.length; i++) {
        expect(hauts[i], greaterThan(hauts[i - 1]));
      }
    });

    testWidgets('Paramètres : suppression en deux temps', (tester) async {
      var suppressions = 0;
      await _pomper(tester, onSupprimer: () => suppressions++);
      await _ouvrirTiroir(tester);
      await tester.tap(find.byIcon(Icons.settings_outlined));
      await tester.pumpAndSettle();
      expect(find.text('Supprimer son compte'), findsOneWidget);
      await tester.tap(find.text('Supprimer son compte'));
      await tester.pumpAndSettle();
      expect(find.text('Supprimer ton compte ?'), findsOneWidget);
      expect(suppressions, 0);
      await tester.tap(find.text('Continuer'));
      await tester.pumpAndSettle();
      expect(find.text('Confirmer la suppression'), findsOneWidget);
      expect(suppressions, 0);
      await tester.tap(find.text('Oui, supprimer mon compte'));
      await tester.pumpAndSettle();
      expect(suppressions, 1);
    });

    testWidgets('Paramètres : annuler au premier temps ne supprime pas', (tester) async {
      var suppressions = 0;
      await _pomper(tester, onSupprimer: () => suppressions++);
      await _ouvrirTiroir(tester);
      await tester.tap(find.byIcon(Icons.settings_outlined));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Supprimer son compte'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Annuler'));
      await tester.pumpAndSettle();
      expect(find.text('Supprimer ton compte ?'), findsNothing);
      expect(suppressions, 0);
    });

    testWidgets('cloche et photo ouvrent Notifications et Mon profil', (tester) async {
      await _pomper(tester);
      await tester.tap(find.byIcon(Icons.notifications_outlined));
      await tester.pumpAndSettle();
      expect(find.text('Notifications'), findsOneWidget);
      await tester.tap(find.byIcon(Icons.arrow_back));
      await tester.pumpAndSettle();
      await tester.tap(find.byKey(const ValueKey('avatarEntete')));
      await tester.pumpAndSettle();
      expect(find.text('Mon profil'), findsOneWidget);
    });
  });
}
