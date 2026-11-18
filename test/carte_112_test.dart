// Carte 112, 17 nov. 2026 : le bouton Enregistrer de la feuille
// de formulaire reste ancré en bas, toujours visible, même quand
// les champs défilent. La validation ne change pas. Tests sans
// serveur et sans téléphone.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/main.dart';

const _champsCamp = [
  F('name', 'Nom du camp'),
  F('dates', 'Dates', optional: true),
  F('place', 'Lieu', optional: true),
  F('desc', 'Description', lines: 3, optional: true),
  F('tariff', 'Tarif', optional: true),
  F('kairos', 'Camp National Kairos ? (oui / non)', optional: true),
  F('extra', 'Champ supplémentaire', optional: true),
];

Future<void> _ouvrirFeuille(WidgetTester tester, {
  List<F> champs = _champsCamp,
  void Function(Map<String, String> v)? onSubmit,
}) async {
  await tester.pumpWidget(MaterialApp(
    home: Scaffold(
      body: Builder(
        builder: (c) => FilledButton(
          onPressed: () => imageFormSheet(c, 'Modifier le camp', champs, 'Enregistrer', (v, _) => onSubmit?.call(v)),
          child: const Text('Ouvrir'),
        ),
      ),
    ),
  ));
  await tester.tap(find.text('Ouvrir'));
  await tester.pumpAndSettle();
}

void _petitEcran(WidgetTester tester) {
  tester.view.physicalSize = const Size(390, 700);
  tester.view.devicePixelRatio = 1.0;
  addTearDown(tester.view.resetPhysicalSize);
  addTearDown(tester.view.resetDevicePixelRatio);
}

void main() {
  group('Carte 112, bouton Enregistrer ancré', () {
    testWidgets('le bouton est hors du défilement, pas en bas des champs', (tester) async {
      _petitEcran(tester);
      await _ouvrirFeuille(tester);
      expect(find.text('Enregistrer'), findsOneWidget);
      expect(
        find.descendant(of: find.byType(SingleChildScrollView), matching: find.text('Enregistrer')),
        findsNothing,
      );
    });

    testWidgets('le bouton est visible sans défiler sur un petit écran', (tester) async {
      _petitEcran(tester);
      await _ouvrirFeuille(tester);
      final rect = tester.getRect(find.text('Enregistrer'));
      expect(rect.bottom, lessThanOrEqualTo(700));
      expect(rect.top, greaterThan(0));
      await tester.tap(find.text('Enregistrer'));
      await tester.pumpAndSettle();
      // Champ obligatoire vide : la feuille reste ouverte, l'erreur s'affiche.
      expect(find.text('Renseignez : Nom du camp.'), findsOneWidget);
    });

    testWidgets('la validation bloque toujours sans le champ obligatoire', (tester) async {
      var appele = false;
      await _ouvrirFeuille(tester, onSubmit: (_) => appele = true);
      await tester.tap(find.text('Enregistrer'));
      await tester.pumpAndSettle();
      expect(appele, isFalse);
      expect(find.text('Renseignez : Nom du camp.'), findsOneWidget);
      expect(find.text('Modifier le camp'), findsOneWidget);
    });

    testWidgets('l’enregistrement fonctionne quand les champs sont remplis', (tester) async {
      Map<String, String>? recu;
      await _ouvrirFeuille(tester, onSubmit: (v) => recu = v);
      await tester.enterText(find.byType(TextField).first, 'Kairos 2027');
      await tester.tap(find.text('Enregistrer'));
      await tester.pumpAndSettle();
      expect(recu?['name'], 'Kairos 2027');
      expect(find.text('Modifier le camp'), findsNothing);
    });

    testWidgets('une feuille courte montre aussi le bouton sans défiler', (tester) async {
      _petitEcran(tester);
      await _ouvrirFeuille(tester, champs: const [F('a', 'Activité')]);
      final rect = tester.getRect(find.text('Enregistrer'));
      expect(rect.bottom, lessThanOrEqualTo(700));
      expect(rect.top, greaterThan(0));
    });
  });
}
