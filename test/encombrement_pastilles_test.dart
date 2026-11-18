// Tests de l'encombrement, tranche pastilles et icônes, 17 nov.
// 2026 : S2 deux tuiles de Comptabilité retirées (vérifié par
// relecture du diff, la liste des gestes est privée), S3 tuile
// « Réglages » renommée (vérifié par relecture), S4 tirage vers
// le bas, S7 constante _vNuit2 supprimée (vérifié par grep et
// analyze, la constante était privée).
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/main.dart';

void main() {
  group('S4, tirage vers le bas', () {
    testWidgets('basic() avec onRefresh enveloppe la liste dans un RefreshIndicator', (tester) async {
      var rafraichi = false;
      await tester.pumpWidget(
        MaterialApp(
          home: basic('Titre', [const Text('Contenu')], onRefresh: () async {
            rafraichi = true;
          }),
        ),
      );
      await tester.pump();
      expect(find.byType(RefreshIndicator), findsOneWidget);
      expect(find.text('Contenu'), findsOneWidget);
      expect(rafraichi, isFalse);
    });

    testWidgets('basic() sans onRefresh ne met pas de RefreshIndicator', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: basic('Titre', [const Text('Contenu')]),
        ),
      );
      await tester.pump();
      expect(find.byType(RefreshIndicator), findsNothing);
      expect(find.text('Contenu'), findsOneWidget);
    });
  });
}
