// Tests du tiroir sur l'accueil, 17 nov. 2026 : le bouton
// hamburger est présent dans l'en-tête de l'accueil membre,
// absent pour un visiteur, dont la page a déjà son propre menu.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/home_web.dart';

void main() {
  group('Tiroir sur l\'accueil', () {
    testWidgets('bouton hamburger présent pour un membre connecté', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            drawer: const Drawer(child: Text('Tiroir')),
            body: HomeWeb(actions: const HomeActions(), visitor: false, showBottomNav: false),
          ),
        ),
      );
      await tester.pump();
      expect(find.byIcon(Icons.menu), findsOneWidget);
    });

    testWidgets('pas de bouton hamburger pour un visiteur', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            drawer: const Drawer(child: Text('Tiroir')),
            body: HomeWeb(actions: const HomeActions(), visitor: true, showBottomNav: false),
          ),
        ),
      );
      await tester.pump();
      expect(find.byIcon(Icons.menu), findsNothing);
    });

    testWidgets('toucher le hamburger ouvre le tiroir', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            drawer: const Drawer(child: Text('Tiroir')),
            body: HomeWeb(actions: const HomeActions(), visitor: false, showBottomNav: false),
          ),
        ),
      );
      await tester.pump();
      await tester.tap(find.byIcon(Icons.menu));
      await tester.pumpAndSettle();
      expect(find.text('Tiroir'), findsOneWidget);
    });
  });
}
