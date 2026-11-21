// Tests des pastilles « Nouveau » dans le tiroir, 19 nov. 2026 :
// Magnétophone et Témoignages sont mises en avant avec une
// pastille or, jusqu'à la première ouverture de la fonctionnalité
// sur ce téléphone. La Messagerie a quitté le tiroir le 19 nov.
// 2026, sa pastille disparaît avec son entrée. Appels et Stories
// n'ont pas d'entrée dans le tiroir (les appels vivent dans la
// conversation, les stories sur l'accueil), elles n'ont donc pas
// de pastille. La pastille ne touche ni la pilule ni l'en-tête.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/messagerie.dart';
import 'package:connexion_prophetique/tiroir_intelligent.dart';

void main() {
  group('Nouveautés vues, état sur le téléphone', () {
    test('vide au départ', () async {
      SharedPreferences.setMockInitialValues({});
      expect(await NouveautesVues.instance.charger(), isEmpty);
    });

    test('marquerVue puis relire', () async {
      SharedPreferences.setMockInitialValues({});
      await NouveautesVues.instance.marquerVue('magnetophone');
      expect(await NouveautesVues.instance.charger(), {'magnetophone'});
      await NouveautesVues.instance.marquerVue('temoignages');
      expect(
        await NouveautesVues.instance.charger(),
        {'magnetophone', 'temoignages'},
      );
    });

    test('identifiant qui n’est pas une nouveauté, ignoré', () async {
      SharedPreferences.setMockInitialValues({});
      await NouveautesVues.instance.marquerVue('don');
      await NouveautesVues.instance.marquerVue('appels');
      await NouveautesVues.instance.marquerVue('stories');
      expect(await NouveautesVues.instance.charger(), isEmpty);
    });

    test('données abîmées, on repart de zéro sans erreur', () async {
      SharedPreferences.setMockInitialValues({NouveautesVues.clePrefs: 'pas une liste'});
      expect(await NouveautesVues.instance.charger(), isEmpty);
    });
  });

  group('Tiroir, pastilles Nouveau', () {
    Future<void> ouvrirMenu(WidgetTester tester) async {
      // Fenêtre haute, 19 nov. 2026 : le tiroir est une ListView
      // qui ne construit que les entrées visibles, les pastilles
      // des entrées du bas ne seraient pas dans l'arbre à 600 px.
      tester.view.physicalSize = const Size(390, 4000);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      final cle = GlobalKey<ScaffoldState>();
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(key: cle, drawer: const MenuLateral(), body: const SizedBox.shrink()),
      ));
      await tester.pump();
      cle.currentState!.openDrawer();
      await tester.pumpAndSettle();
    }

    setUp(() {
      SharedPreferences.setMockInitialValues({});
      TiroirContexte.instance.definirPourTests(aEnfants: true, aResultats: true);
      MessagerieLectureService.instance.nonLusNotifier.value = 0;
      app.tabRequest = -1;
    });

    tearDown(() {
      TiroirContexte.instance.reinitialiserPourTests();
      MessagerieLectureService.instance.nonLusNotifier.value = 0;
      app.member = null;
      app.isAdmin = false;
      app.tabRequest = -1;
    });

    testWidgets('visiteur : Nouveau sur Magnétophone et Témoignages seulement', (tester) async {
      await ouvrirMenu(tester);
      expect(find.text('Nouveau'), findsNWidgets(2));
      expect(find.text('Magnétophone'), findsOneWidget);
      expect(find.text('Témoignages'), findsOneWidget);
    });

    testWidgets('membre : Nouveau sur Magnétophone, Témoignages et Chaîne de prière, Messagerie partie', (tester) async {
      app.member = Member('Test', 'CP-TT-2526', 'Céleste', DateTime(2026, 1, 1));
      await ouvrirMenu(tester);
      expect(find.text('Nouveau'), findsNWidgets(3));
      expect(find.text('Messagerie'), findsNothing);
    });

    testWidgets('Aide de la structure : nombre à côté de l’entrée, sans pastille Nouveau', (tester) async {
      app.member = Member('Test', 'CP-TT-2526', 'Céleste', DateTime(2026, 1, 1));
      AideCompteurs.instance.mesOuvertes.value = 3;
      addTearDown(AideCompteurs.instance.reinitialiserPourTests);
      await ouvrirMenu(tester);
      expect(find.text('Aide de la structure'), findsOneWidget);
      expect(find.text('3'), findsOneWidget);
      expect(find.text('Nouveau'), findsNWidgets(3));
    });

    testWidgets('déjà vue, plus de pastille sur cette entrée', (tester) async {
      SharedPreferences.setMockInitialValues({
        NouveautesVues.clePrefs: ['magnetophone'],
      });
      await ouvrirMenu(tester);
      expect(find.text('Nouveau'), findsOneWidget);
    });

    testWidgets('toucher Témoignages la marque comme vue', (tester) async {
      await ouvrirMenu(tester);
      await tester.tap(find.text('Témoignages'));
      await tester.pumpAndSettle();
      expect(app.tabRequest, 4);
      expect(await NouveautesVues.instance.charger(), {'temoignages'});
    });
  });
}
