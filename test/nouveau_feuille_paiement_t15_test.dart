// Tests de la feuille de paiement de la carte, tranche T15,
// 26 nov. 2026. Quatre moyens, Wave seul encaisse : MTN
// MoMo, Orange Money et carte bancaire apparaissent avec
// « Bientôt », sans paiement simulé ni faux succès. Le
// montant 1 000 FCFA est formaté par fcfa, espace fine
// insécable U+202F entre les milliers.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import 'package:connexion_prophetique/nouveau/paiement_carte.dart';

class _HarnaisFeuille extends StatefulWidget {
  const _HarnaisFeuille({required this.onResult});
  final void Function(String?) onResult;

  @override
  State<_HarnaisFeuille> createState() => _HarnaisFeuilleState();
}

class _HarnaisFeuilleState extends State<_HarnaisFeuille> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: FilledButton(
          onPressed: () async {
            final r = await choisirMoyenPaiementFeuille(context,
                nomMembre: 'Axel Test');
            widget.onResult(r);
          },
          child: const Text('Payer'),
        ),
      ),
    );
  }
}

Future<void> _ouvrirFeuille(
  WidgetTester tester,
  void Function(String?) onResult,
) async {
  await tester.pumpWidget(MaterialApp(
    home: _HarnaisFeuille(onResult: onResult),
  ));
  await tester.pump();
  await tester.tap(find.text('Payer'));
  await tester.pumpAndSettle();
  expect(find.text('Créer ma carte membre'), findsOneWidget);
}

void main() {
  test('les quatre moyens, Wave seul disponible', () {
    expect(moyensPaiementCarte, hasLength(4));
    expect(
        moyensPaiementCarte.map((m) => m.id),
        ['wave', 'mtn', 'orange', 'cinetpay']);
    expect(
        moyensPaiementCarte.map((m) => m.label),
        ['Wave', 'MTN MoMo', 'Orange Money', 'Carte bancaire']);
    expect(moyensPaiementCarte.firstWhere((m) => m.id == 'wave').disponible,
        isTrue);
    expect(
        moyensPaiementCarte
            .where((m) => m.id != 'wave')
            .every((m) => !m.disponible),
        isTrue);
  });

  testWidgets('feuille : récapitulatif et quatre moyens', (tester) async {
    await _ouvrirFeuille(tester, (_) {});
    expect(find.text('Axel Test'), findsOneWidget);
    expect(find.text('Frais de création de carte • Sans abonnement'),
        findsOneWidget);
    expect(find.text('1\u202F000 FCFA'), findsOneWidget);
    expect(find.text('Wave'), findsOneWidget);
    expect(find.text('MTN MoMo'), findsOneWidget);
    expect(find.text('Orange Money'), findsOneWidget);
    expect(find.text('Carte bancaire'), findsOneWidget);
    expect(find.text('Bientôt'), findsNWidgets(3));
    expect(
        find.text('Confirmer le paiement • 1\u202F000 FCFA'), findsOneWidget);
  });

  testWidgets('moyen bientôt : message, pas de succès, feuille ouverte',
      (tester) async {
    String? result;
    await _ouvrirFeuille(tester, (r) => result = r);
    await tester.tap(find.text('MTN MoMo'));
    await tester.pump();
    expect(find.textContaining('bientôt disponible'), findsNothing);
    await tester.tap(find.text('Confirmer le paiement • 1\u202F000 FCFA'));
    await tester.pump();
    expect(find.textContaining('bientôt disponible'), findsNWidgets(2));
    expect(find.text('Créer ma carte membre'), findsOneWidget);
    expect(result, isNull);
  });

  testWidgets('Wave : confirmation ferme la feuille avec Wave',
      (tester) async {
    String? result;
    await _ouvrirFeuille(tester, (r) => result = r);
    await tester.tap(find.text('Wave'));
    await tester.pump();
    expect(find.textContaining('bientôt disponible'), findsNothing);
    await tester.tap(find.text('Confirmer le paiement • 1\u202F000 FCFA'));
    await tester.pumpAndSettle();
    expect(find.text('Créer ma carte membre'), findsNothing);
    expect(result, 'wave');
  });

  testWidgets('fermeture : aucun moyen choisi', (tester) async {
    String? result = 'non appelé';
    await _ouvrirFeuille(tester, (r) => result = r);
    await tester.tap(find.byIcon(LucideIcons.x));
    await tester.pumpAndSettle();
    expect(find.text('Créer ma carte membre'), findsNothing);
    expect(result, isNull);
  });
}
