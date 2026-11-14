// Carte 106, 9 nov. 2026 : annulation non destructive des
// attestations, côté application. Ces tests vérifient la carte
// seule, sans serveur : la pastille « Annulée » s'affiche quand
// annulee_le est renseigné, côté admin comme côté membre, et
// l'action Annuler n'apparaît que sur une attestation non annulée,
// quand onAnnuler est fourni. La route, le 409 si déjà annulée et
// le périmètre sont vérifiés côté serveur, dans
// server-production/tests/.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/admin_pages.dart';

Map<String, dynamic> attestation({String? annuleeLe}) => {
      'id': 'att-1',
      'type': 'benevolat',
      'membre_nom': 'Anibe Axel',
      'matricule': 'CP-AA-2526',
      'activite': 'Distribution de repas',
      'role_service': 'Service',
      'date_debut': '2026-11-01',
      'date_fin': '2026-11-02',
      'reference': 'ATT-2026-0001',
      'delivre_le': '2026-11-03',
      'annulee_le': annuleeLe,
    };

Future<void> pomperCarte(
  WidgetTester tester,
  Map<String, dynamic> a, {
  Future<void> Function()? onAnnuler,
  bool membre = false,
}) async {
  await tester.pumpWidget(
    MaterialApp(
      home: Scaffold(
        body: SingleChildScrollView(
          child: AttestationCarte(
            attestation: a,
            membre: membre,
            onTelecharger: () async {},
            onAnnuler: onAnnuler,
          ),
        ),
      ),
    ),
  );
  await tester.pumpAndSettle();
}

void main() {
  group('Carte 106, pastille Annulée', () {
    testWidgets('une carte avec annulee_le affiche « Annulée »', (tester) async {
      await pomperCarte(tester, attestation(annuleeLe: '2026-11-09T10:00:00Z'));
      expect(find.text('Annulée'), findsOneWidget);
      expect(find.text('Attestation de bénévolat'), findsOneWidget);
      expect(find.textContaining('ATT-2026-0001'), findsOneWidget);
    });

    testWidgets('une carte sans annulee_le ne l’affiche pas', (tester) async {
      await pomperCarte(tester, attestation());
      expect(find.text('Annulée'), findsNothing);
    });

    testWidgets('une carte avec annulee_le nul ne l’affiche pas', (tester) async {
      final a = attestation()..remove('annulee_le');
      await pomperCarte(tester, a);
      expect(find.text('Annulée'), findsNothing);
    });

    testWidgets('la pastille s’affiche aussi côté membre', (tester) async {
      await pomperCarte(tester, attestation(annuleeLe: '2026-11-09T10:00:00Z'), membre: true);
      expect(find.text('Annulée'), findsOneWidget);
      expect(find.text('Annuler'), findsNothing);
    });
  });

  group('Carte 106, action Annuler', () {
    testWidgets('elle apparaît quand l’attestation n’est pas annulée et qu’onAnnuler est fourni', (tester) async {
      var appels = 0;
      await pomperCarte(tester, attestation(), onAnnuler: () async {
        appels++;
      });
      expect(find.text('Annuler'), findsOneWidget);
      await tester.tap(find.text('Annuler'));
      await tester.pumpAndSettle();
      expect(appels, 1);
    });

    testWidgets('elle n’apparaît pas sur une attestation déjà annulée, même avec onAnnuler', (tester) async {
      await pomperCarte(tester, attestation(annuleeLe: '2026-11-09T10:00:00Z'), onAnnuler: () async {});
      expect(find.text('Annuler'), findsNothing);
    });

    testWidgets('elle n’apparaît pas sans onAnnuler, même non annulée', (tester) async {
      await pomperCarte(tester, attestation());
      expect(find.text('Annuler'), findsNothing);
    });
  });
}
