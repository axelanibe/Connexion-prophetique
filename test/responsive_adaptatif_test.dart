// Mise en page adaptative, 16 nov. 2026 : ruptures 600/900,
// largeurs maximales 720/1000, colonnes selon la taille.
// Décisions pures et largeurs rendues, sans serveur.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/responsive.dart';

void main() {
  group('Largeur maximale de contenu', () {
    test('téléphone, moins de 600 : aucune limite', () {
      expect(Rx.maxContentWidthFor(320), double.infinity);
      expect(Rx.maxContentWidthFor(599), double.infinity);
    });

    test('tablette, de 600 à 900 : 720 au plus', () {
      expect(Rx.maxContentWidthFor(600), 720.0);
      expect(Rx.maxContentWidthFor(800), 720.0);
      expect(Rx.maxContentWidthFor(899), 720.0);
    });

    test('ordinateur, au delà de 900 : 1000 au plus', () {
      expect(Rx.maxContentWidthFor(900), 1000.0);
      expect(Rx.maxContentWidthFor(1200), 1000.0);
      expect(Rx.maxContentWidthFor(2000), 1000.0);
    });
  });

  group('Colonnes selon la taille', () {
    test('Découvrir : 2 sur téléphone et tablette, 3 sur ordinateur', () {
      expect(Rx.columnsForWidth(360, phone: 2, tablet: 2, desktop: 3), 2);
      expect(Rx.columnsForWidth(599, phone: 2, tablet: 2, desktop: 3), 2);
      expect(Rx.columnsForWidth(600, phone: 2, tablet: 2, desktop: 3), 2);
      expect(Rx.columnsForWidth(899, phone: 2, tablet: 2, desktop: 3), 2);
      expect(Rx.columnsForWidth(900, phone: 2, tablet: 2, desktop: 3), 3);
      expect(Rx.columnsForWidth(1400, phone: 2, tablet: 2, desktop: 3), 3);
    });

    test('les nombres sont donnés à chaque appel, pas figés', () {
      expect(Rx.columnsForWidth(360, phone: 1, tablet: 2, desktop: 4), 1);
      expect(Rx.columnsForWidth(700, phone: 1, tablet: 2, desktop: 4), 2);
      expect(Rx.columnsForWidth(1200, phone: 1, tablet: 2, desktop: 4), 4);
    });
  });

  group('ResponsiveCenter, largeurs rendues', () {
    Future<Size?> largeurRendue(WidgetTester tester, double largeur) async {
      tester.view.physicalSize = Size(largeur, 1000);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      Size? mesure;
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: ResponsiveCenter(
              child: LayoutBuilder(
                builder: (context, contraintes) {
                  mesure = Size(contraintes.maxWidth, contraintes.maxHeight);
                  return const SizedBox.shrink();
                },
              ),
            ),
          ),
        ),
      );
      return mesure;
    }

    testWidgets('téléphone 400 : toute la largeur, sans centrage', (tester) async {
      expect((await largeurRendue(tester, 400))?.width, 400);
    });

    testWidgets('tablette 800 : colonne de 720 au plus', (tester) async {
      expect((await largeurRendue(tester, 800))?.width, 720);
    });

    testWidgets('rupture 600 : la colonne ne dépasse pas l écran', (tester) async {
      expect((await largeurRendue(tester, 600))?.width, 600);
    });

    testWidgets('rupture 900 : la colonne ne dépasse pas l écran', (tester) async {
      expect((await largeurRendue(tester, 900))?.width, 900);
    });

    testWidgets('ordinateur 1400 : colonne de 1000 au plus', (tester) async {
      expect((await largeurRendue(tester, 1400))?.width, 1000);
    });
  });
}
