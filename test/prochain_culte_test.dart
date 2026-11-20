// Tests du prochain culte, tranche 1, 19 nov. 2026 : carte sur
// l'accueil, bouton de présence, état confirmé, doré.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/home_web.dart';

void main() {
  HomeCulte culteTest({bool confirme = false, bool enCours = false, VoidCallback? onConfirmer, VoidCallback? onAnnuler}) => HomeCulte(
        nom: 'Culte dominical',
        date: DateTime(2026, 11, 22),
        heure: '09:00:00',
        lieu: 'Bureau National',
        etablissement: 'Céleste',
        confirme: confirme,
        enCours: enCours,
        onConfirmer: onConfirmer ?? () {},
        onAnnuler: onAnnuler ?? () {},
      );

  Future<void> pomperAccueil(WidgetTester tester, {HomeCulte? culte}) async {
    tester.view.physicalSize = const Size(390, 4000);
    tester.view.devicePixelRatio = 1.0;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: HomeWeb(
            actions: const HomeActions(),
            visitor: false,
            showBottomNav: false,
            culte: culte,
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 100));
  }

  setUp(() {
    SharedPreferences.setMockInitialValues({});
  });

  group('Prochain culte : carte sur l’accueil', () {
    testWidgets('carte visible : étiquette, nom, date et heure, lieu et établissement', (tester) async {
      await pomperAccueil(tester, culte: culteTest());
      expect(find.text('PROCHAIN CULTE'), findsOneWidget);
      expect(find.text('Culte dominical'), findsOneWidget);
      expect(find.text('Dimanche 22 nov. · 09h00'), findsOneWidget);
      expect(find.text('Bureau National · Céleste'), findsOneWidget);
      expect(find.text('Je serai présent'), findsOneWidget);
      expect(find.text('Présence confirmée'), findsNothing);
    });

    testWidgets('sans culte : aucune carte', (tester) async {
      await pomperAccueil(tester);
      expect(find.text('PROCHAIN CULTE'), findsNothing);
      expect(find.text('Je serai présent'), findsNothing);
    });

    testWidgets('Je serai présent : toucher appelle la confirmation', (tester) async {
      var appelee = false;
      await pomperAccueil(tester, culte: culteTest(onConfirmer: () => appelee = true));
      await tester.tap(find.text('Je serai présent'));
      await tester.pump();
      expect(appelee, isTrue);
    });

    testWidgets('confirmé : pastille et Annuler, pas de bouton Je serai présent', (tester) async {
      var annulee = false;
      await pomperAccueil(tester, culte: culteTest(confirme: true, onAnnuler: () => annulee = true));
      expect(find.text('Présence confirmée'), findsOneWidget);
      expect(find.text('Annuler'), findsOneWidget);
      expect(find.text('Je serai présent'), findsNothing);
      await tester.tap(find.text('Annuler'));
      await tester.pump();
      expect(annulee, isTrue);
    });

    testWidgets('doré : la carte seule', (tester) async {
      tester.view.physicalSize = const Size(390, 500);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            backgroundColor: W.paper,
            body: Padding(
              padding: const EdgeInsets.all(16),
              child: CarteProchainCulte(culte: culteTest()),
            ),
          ),
        ),
      );
      await tester.pump();
      await expectLater(
        find.byType(CarteProchainCulte),
        matchesGoldenFile('goldens/prochain_culte.png'),
      );
    });
  });
}
