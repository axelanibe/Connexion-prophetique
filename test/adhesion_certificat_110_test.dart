// Carte 110, 8 nov. 2026 : certificats d'adhésion en PDF, côté
// Bureau. Ces tests vérifient la carte d'adhésion seule, sans
// serveur ni base : le libellé suit le statut, les bons boutons
// s'affichent, la confirmation de validation et le motif de
// suspension sont demandés avant tout envoi. Les routes, le
// périmètre et l'émission sont vérifiés côté serveur, dans
// server-production/tests/certificats_branchement_110.test.js.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/admin_pages.dart';
import 'package:connexion_prophetique/main.dart';

Future<void> pomperCarte(
  WidgetTester tester, {
  String statut = 'en_attente',
  VoidCallback? onChanged,
}) async {
  await tester.pumpWidget(
    MaterialApp(
      home: Scaffold(
        body: AdhesionBureauCard(
          membreId: 'membre-test',
          statut: statut,
          onChanged: onChanged ?? () {},
        ),
      ),
    ),
  );
}

void main() {
  group('Carte 110, carte d’adhésion du Bureau', () {
    test('les libellés des statuts', () {
      expect(libelleStatutAdhesion('validee'), 'Validée');
      expect(libelleStatutAdhesion('suspendue'), 'Suspendue');
      expect(libelleStatutAdhesion('en_attente'), 'En attente de validation');
      expect(libelleStatutAdhesion(''), 'À confirmer');
    });

    testWidgets('en attente : Valider l’adhésion, pas Suspendre', (tester) async {
      await pomperCarte(tester, statut: 'en_attente');
      expect(find.text('Adhésion'), findsOneWidget);
      expect(find.text('En attente de validation'), findsOneWidget);
      expect(find.text('Valider l’adhésion'), findsOneWidget);
      expect(find.text('Suspendre'), findsNothing);
    });

    testWidgets('validée : Suspendre, pas Valider l’adhésion', (tester) async {
      await pomperCarte(tester, statut: 'validee');
      expect(find.text('Validée'), findsOneWidget);
      expect(find.text('Suspendre'), findsOneWidget);
      expect(find.text('Valider l’adhésion'), findsNothing);
    });

    testWidgets('suspendue : Valider l’adhésion de nouveau, pas Suspendre', (tester) async {
      await pomperCarte(tester, statut: 'suspendue');
      expect(find.text('Suspendue'), findsOneWidget);
      expect(find.text('Valider l’adhésion'), findsOneWidget);
      expect(find.text('Suspendre'), findsNothing);
    });

    testWidgets('valider demande confirmation, Annuler n’envoie rien', (tester) async {
      var changes = 0;
      await pomperCarte(tester, statut: 'en_attente', onChanged: () => changes++);
      await tester.tap(find.text('Valider l’adhésion'));
      await tester.pumpAndSettle();
      expect(find.text('Valider l’adhésion ?'), findsOneWidget);
      expect(find.text('Le certificat PDF sera créé et envoyé par e-mail au membre.'), findsOneWidget);
      await tester.tap(find.text('Annuler'));
      await tester.pumpAndSettle();
      expect(find.text('Valider l’adhésion ?'), findsNothing);
      expect(changes, 0);
    });

    testWidgets('suspendre demande un motif, moins de 3 caractères est refusé', (tester) async {
      var changes = 0;
      await pomperCarte(tester, statut: 'validee', onChanged: () => changes++);
      await tester.tap(find.text('Suspendre'));
      await tester.pumpAndSettle();
      expect(find.text('Suspendre l’adhésion ?'), findsOneWidget);
      await tester.enterText(find.byType(TextField), 'ab');
      await tester.tap(find.text('Suspendre').last);
      await tester.pump();
      expect(find.text('Indiquez un motif d’au moins 3 caractères.'), findsOneWidget);
      expect(changes, 0);
    });
  });
}
