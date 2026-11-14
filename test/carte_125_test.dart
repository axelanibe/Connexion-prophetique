// Tests de la carte 125, 10 nov. 2026 : noms et prénoms en
// majuscules à l'inscription et sur les cartes. Fonctions pures
// et dialogue de correction seul, sans serveur ni base.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/admin_pages.dart';
import 'package:connexion_prophetique/main.dart';

void main() {
  group('Carte 125, nom en majuscules', () {
    test('casse mixte et espaces', () {
      expect(nomCompletMajuscules('Axel Anibe'), 'AXEL ANIBE');
      expect(nomCompletMajuscules('  Koffi   Jean-Boanerges  '), 'KOFFI JEAN-BOANERGES');
      expect(nomCompletMajuscules(''), '');
    });

    test('accents gardés', () {
      expect(nomCompletMajuscules('Élodie Martin'), 'ÉLODIE MARTIN');
    });
  });

  group('Carte 125, dialogue de correction', () {
    testWidgets('le nom corrigé part en majuscules', (tester) async {
      String? nomEnvoye;
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CorrigerMembreDialog(
              nomInitial: 'Anibe Axel',
              naissanceInitiale: '1990-05-12',
              etablissementIdInitial: '',
              etablissementInitial: '',
              onEnregistrer: (nom, _, __) async {
                nomEnvoye = nom;
              },
            ),
          ),
        ),
      );
      await tester.enterText(find.byKey(const ValueKey('corriger-membre-nom')), 'Anibe Adja Maurice Axel');
      await tester.tap(find.text('Enregistrer'));
      await tester.pumpAndSettle();
      expect(nomEnvoye, 'ANIBE ADJA MAURICE AXEL');
    });
  });
}
