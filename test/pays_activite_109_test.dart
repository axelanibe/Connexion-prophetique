// Carte 109, 8 nov. 2026 : pays d'une activité. Le pays où se
// tient l'activité s'affiche après le lieu, « Lieu, Pays »,
// partout où le lieu s'affiche. Ces tests vérifient la composition
// du lieu et du pays, et la liste déroulante du formulaire, sans
// serveur et sans téléphone.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/app_models.dart';
import 'package:connexion_prophetique/main.dart';

void main() {
  group('Carte 109, lieu et pays', () {
    test('lieu et pays se composent en « Lieu, Pays »', () {
      expect(lieuPaysTexte('Bonoua', 'Côte d’Ivoire'), 'Bonoua, Côte d’Ivoire');
      expect(lieuPaysTexte('Bonoua', ''), 'Bonoua');
      expect(lieuPaysTexte('', 'Canada'), 'Canada');
      expect(lieuPaysTexte('', ''), '');
      expect(lieuPaysTexte('  Bonoua  ', '  Côte d’Ivoire  '), 'Bonoua, Côte d’Ivoire');
    });

    test('le camp expose lieuPays depuis son lieu et son pays', () {
      final avecPays = Camp(id: 1, name: 'Kairos', place: 'Bonoua', pays: 'Côte d’Ivoire');
      expect(avecPays.lieuPays, 'Bonoua, Côte d’Ivoire');
      final sansPays = Camp(id: 2, name: 'Kairos', place: 'Bonoua');
      expect(sansPays.pays, isEmpty);
      expect(sansPays.lieuPays, 'Bonoua');
      final sansLieu = Camp(id: 3, name: 'Kairos', pays: 'Canada');
      expect(sansLieu.lieuPays, 'Canada');
      final vide = Camp(id: 4, name: 'Kairos');
      expect(vide.lieuPays, isEmpty);
    });
  });

  group('Carte 109, champ Pays du formulaire', () {
    Future<void> ouvrirFeuille(WidgetTester tester, void Function(Map<String, String> v) onSubmit) async {
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(
          body: Builder(
            builder: (c) => FilledButton(
              onPressed: () => imageFormSheet(c, 'Nouveau camp', [
                F('name', 'Nom du camp'),
                F('place', 'Lieu', optional: true),
                F('country', 'Pays', optional: true, options: kPaysResidence, emptyLabel: 'Aucun pays'),
              ], 'Publier', (v, _) => onSubmit(v)),
              child: const Text('Ouvrir'),
            ),
          ),
        ),
      ));
      await tester.tap(find.text('Ouvrir'));
      await tester.pumpAndSettle();
    }

    testWidgets('aucun pays par défaut, les 13 pays proposés', (tester) async {
      // Surface haute : les 14 choix tiennent dans la liste
      // déroulante sans défilement.
      tester.view.physicalSize = const Size(800, 1600);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      Map<String, String>? recu;
      await ouvrirFeuille(tester, (v) => recu = v);
      expect(find.text('Côte d’Ivoire'), findsNothing);
      await tester.tap(find.byType(DropdownButtonFormField<String>));
      await tester.pumpAndSettle();
      for (final p in kPaysResidence) {
        expect(find.text(p), findsOneWidget);
      }
      expect(find.text('Aucun pays'), findsOneWidget);
      await tester.tap(find.text('France'));
      await tester.pumpAndSettle();
      await tester.enterText(find.byType(TextField).first, 'Camp test');
      await tester.tap(find.text('Publier'));
      await tester.pumpAndSettle();
      expect(recu?['country'], 'France');
    });

    testWidgets('« Aucun pays » vide le pays choisi', (tester) async {
      Map<String, String>? recu;
      await ouvrirFeuille(tester, (v) => recu = v);
      await tester.enterText(find.byType(TextField).first, 'Camp test');
      await tester.tap(find.byType(DropdownButtonFormField<String>));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Canada').last);
      await tester.pumpAndSettle();
      await tester.tap(find.byType(DropdownButtonFormField<String>));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Aucun pays').last);
      await tester.pumpAndSettle();
      await tester.tap(find.text('Publier'));
      await tester.pumpAndSettle();
      expect(recu?['country'], isEmpty);
    });

    testWidgets('sans pays choisi, la publication envoie un pays vide', (tester) async {
      Map<String, String>? recu;
      await ouvrirFeuille(tester, (v) => recu = v);
      await tester.enterText(find.byType(TextField).first, 'Camp test');
      await tester.tap(find.text('Publier'));
      await tester.pumpAndSettle();
      expect(recu?['country'], isEmpty);
    });
  });
}
