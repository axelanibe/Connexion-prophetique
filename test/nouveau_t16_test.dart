// Tests de l'infrastructure moyens de paiement, tranche T16,
// 26 nov. 2026. La feuille lit les moyens sur le serveur :
// un moyen disponible n'a pas « Bientôt » et sa confirmation
// retourne son identifiant serveur. La liste locale reste le
// repli quand le serveur ne répond pas.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import 'package:connexion_prophetique/nouveau/paiement_carte.dart';

void main() {
  test('depuisServeur : identifiant, libellé, disponibilité, icône par moyen', () {
    final wave = MoyenPaiementCarte.depuisServeur(
        {'id': 'wave', 'label': 'Wave', 'disponible': true});
    expect(wave.id, 'wave');
    expect(wave.label, 'Wave');
    expect(wave.disponible, isTrue);
    expect(wave.icone, LucideIcons.waves);
    final mtn = MoyenPaiementCarte.depuisServeur(
        {'id': 'mtn', 'label': 'MTN MoMo', 'disponible': true});
    expect(mtn.icone, LucideIcons.smartphone);
    final orange = MoyenPaiementCarte.depuisServeur(
        {'id': 'orange', 'label': 'Orange Money', 'disponible': false});
    expect(orange.icone, LucideIcons.wallet);
    expect(orange.disponible, isFalse);
    final carte = MoyenPaiementCarte.depuisServeur(
        {'id': 'cinetpay', 'label': 'Carte bancaire', 'disponible': false});
    expect(carte.icone, LucideIcons.creditCard);
  });

  test('depuisServeur : identifiant inconnu, icône Wave, sans libellé', () {
    final inconnu =
        MoyenPaiementCarte.depuisServeur({'id': 'bidon', 'disponible': true});
    expect(inconnu.id, 'bidon');
    expect(inconnu.label, 'bidon');
    expect(inconnu.icone, LucideIcons.waves);
  });

  test('listeDepuisServeur : ne garde que les moyens avec identifiant', () {
    final liste = MoyenPaiementCarte.listeDepuisServeur([
      {'id': 'wave', 'label': 'Wave', 'disponible': true},
      {'label': 'Sans identifiant', 'disponible': true},
      {'id': 'mtn', 'label': 'MTN MoMo', 'disponible': false},
    ]);
    expect(liste.map((m) => m.id), ['wave', 'mtn']);
  });

  testWidgets('feuille serveur : MTN disponible, sans Bientôt, confirme mtn',
      (tester) async {
    String? result;
    final moyens = MoyenPaiementCarte.listeDepuisServeur([
      {'id': 'wave', 'label': 'Wave', 'disponible': true},
      {'id': 'mtn', 'label': 'MTN MoMo', 'disponible': true},
      {'id': 'orange', 'label': 'Orange Money', 'disponible': false},
      {'id': 'cinetpay', 'label': 'Carte bancaire', 'disponible': false},
    ]);
    await tester.pumpWidget(MaterialApp(
      home: _HarnaisFeuilleT16(
        moyens: moyens,
        onResult: (r) => result = r,
      ),
    ));
    await tester.pump();
    await tester.tap(find.text('Payer'));
    await tester.pumpAndSettle();
    expect(find.text('Créer ma carte membre'), findsOneWidget);
    expect(find.text('Bientôt'), findsNWidgets(2));
    await tester.tap(find.text('MTN MoMo'));
    await tester.pump();
    await tester.tap(find.text('Confirmer le paiement • 1\u202F000 FCFA'));
    await tester.pumpAndSettle();
    expect(find.text('Créer ma carte membre'), findsNothing);
    expect(result, 'mtn');
  });

  testWidgets('feuille serveur : liste vide, repli local Wave seul',
      (tester) async {
    String? result;
    await tester.pumpWidget(MaterialApp(
      home: _HarnaisFeuilleT16(
        moyens: const [],
        onResult: (r) => result = r,
      ),
    ));
    await tester.pump();
    await tester.tap(find.text('Payer'));
    await tester.pumpAndSettle();
    expect(find.text('Créer ma carte membre'), findsOneWidget);
    expect(find.text('Bientôt'), findsNWidgets(3));
    await tester.tap(find.text('Wave'));
    await tester.pump();
    await tester.tap(find.text('Confirmer le paiement • 1\u202F000 FCFA'));
    await tester.pumpAndSettle();
    expect(result, 'wave');
  });
}

class _HarnaisFeuilleT16 extends StatelessWidget {
  const _HarnaisFeuilleT16({required this.moyens, required this.onResult});
  final List<MoyenPaiementCarte> moyens;
  final void Function(String?) onResult;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: FilledButton(
          onPressed: () async {
            final r = await choisirMoyenPaiementFeuille(context,
                nomMembre: 'Axel Test', moyens: moyens);
            onResult(r);
          },
          child: const Text('Payer'),
        ),
      ),
    );
  }
}
