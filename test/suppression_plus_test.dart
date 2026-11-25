// Tests de la suppression de la page Plus, 19 nov. 2026,
// décision d'Axel, section Corrections « Doublons page Plus,
// tiroir et Profil » : la page Plus disparaît, le tiroir seul
// reste, les 3 entrées qui n'existaient que sur Plus vivent
// déjà dans le tiroir, section Mon espace, avec les mêmes
// conditions de visibilité, et le bouton « Mes absences et
// demandes » quitte le Profil, gardé dans le tiroir seulement.
// Témoignages reste à l'index 4, joignable par le tiroir.
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/messagerie.dart';
import 'package:connexion_prophetique/tiroir_intelligent.dart';

/// Client qui renvoie un mur vide, sans serveur : la page du
/// mur lit le fil à l'ouverture, comme les témoignages.
class _ClientMurVide extends ApiClient {
  @override
  Future<Map<String, dynamic>> fetchMur() async => const {'publications': []};
}

void main() {
  group('Suppression de la page Plus, source', () {
    test('plus de classe MorePage, plus de page Plus, plus d index 5', () {
      final source = File('lib/main.dart').readAsStringSync();
      expect(source, isNot(contains('class MorePage')));
      expect(source, isNot(contains("basic(tr('Plus')")));
      expect(source, isNot(contains('clamp(0, 5)')));
      expect(source, isNot(contains('tabIndex: 5')));
      expect(source, isNot(contains('_tabScroll[5]')));
      expect(source, isNot(contains('List.generate(6,')));
      expect(kPresentation99Titres, isNot(contains('Plus')));
      expect(kPresentation99Onglets, isNot(contains(5)));
      expect(kPresentation99Titres.length, 6);
      expect(kPresentation99Onglets.length, 6);
    });

    test('plus d adresse /plus, plus de nav_plus', () {
      final chemins = File('lib/route_path_web.dart').readAsStringSync();
      expect(chemins, isNot(contains("'/plus'")));
      final config = File('lib/remote_config.dart').readAsStringSync();
      expect(config, isNot(contains("'nav_plus'")));
    });

    test('les 3 entrées vivent dans le tiroir, vers les bonnes pages', () {
      final source = File('lib/main.dart').readAsStringSync();
      expect(source, contains("id: 'devenir-partenaire'"));
      expect(source, contains('goPlateforme(c, () => plateforme.DevenirPartenairePage())'));
      expect(source, contains("id: 'mes-enseignements'"));
      expect(source, contains('goPlateforme(c, () => plateforme.MesEnseignementsPage())'));
      expect(source, contains("id: 'abonnement-plateforme'"));
      expect(source, contains('goPlateforme(c, () => plateforme.PlateformeAbonnementPage())'));
    });

    test('Mes absences et demandes ne reste que sur la carte du Profil', () {
      final source = File('lib/main.dart').readAsStringSync();
      // 19 nov. 2026, réorganisation du tiroir : l'entrée tiroir
      // 'absences' disparaît, la démarche vit sur la carte du Profil.
      expect(source, isNot(contains("id: 'absences'")));
      expect(source, contains("titre: tr('Démarche administrative')"));
      expect(source, contains('MesDemandesPage'));
    });
  });

  group('Suppression de la page Plus, tiroir', () {
    Future<void> ouvrirMenu(WidgetTester tester) async {
      // Fenêtre haute, 19 nov. 2026 : le tiroir défile, les
      // entrées sous le pli ne sont pas construites à 600 px.
      tester.view.physicalSize = const Size(390, 1800);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.reset);
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
      TiroirContexte.instance.reinitialiserPourTests();
      MessagerieLectureService.instance.nonLusNotifier.value = 0;
      app.tabRequest = -1;
    });

    tearDown(() {
      TiroirContexte.instance.reinitialiserPourTests();
      MessagerieLectureService.instance.nonLusNotifier.value = 0;
      app.member = null;
      app.tabRequest = -1;
    });

    testWidgets('six entrées, sans section Navigation, touche l’onglet 4', (tester) async {
      await ouvrirMenu(tester);
      expect(find.text('Navigation'), findsNothing);
      expect(find.text('Accueil'), findsOneWidget);
      expect(find.text('Bible'), findsOneWidget);
      expect(find.text('Librairie'), findsOneWidget);
      expect(find.text('Structure'), findsOneWidget);
      expect(find.text('Témoignages'), findsOneWidget);
      // Visiteur : le mur est membre seulement.
      expect(find.text('Mur des membres'), findsNothing);
      expect(find.text('Plus'), findsNothing);
      await tester.tap(find.text('Témoignages'));
      await tester.pumpAndSettle();
      expect(app.tabRequest, 4);
    });

    testWidgets('membre : toucher Mur des membres ouvre le mur vide', (tester) async {
      app.member = Member('Test', 'CP-TT-2526', 'Céleste', DateTime(2026, 1, 1));
      api = _ClientMurVide();
      addTearDown(() => api = ApiClient());
      await ouvrirMenu(tester);
      expect(find.text('Mur des membres'), findsOneWidget);
      await tester.tap(find.text('Mur des membres'));
      await tester.pumpAndSettle();
      expect(find.text('Aucune publication pour le moment.'), findsOneWidget);
    });

    testWidgets('le tiroir ne garde plus l’entrée Mes absences et demandes', (tester) async {
      await ouvrirMenu(tester);
      expect(find.text('Mes absences et demandes'), findsNothing);
      expect(find.text('Démarche administrative'), findsNothing);
    });

    testWidgets('membre simple : Devenir partenaire visible, Mes enseignements absent', (tester) async {
      app.member = Member('Test', 'CP-TT-2526', 'Céleste', DateTime(2026, 1, 1), fonction: 'Membre');
      await ouvrirMenu(tester);
      await tester.scrollUntilVisible(
        find.text('Devenir partenaire'),
        100,
        // Recherche, 22 nov. 2026 : le champ de recherche du tiroir
        // a son propre défilement interne, on cible celui du ListView.
        scrollable: find.descendant(
          of: find.byType(ListView),
          matching: find.byType(Scrollable),
        ),
      );
      expect(find.text('Devenir partenaire'), findsOneWidget);
      expect(find.text('Publier vos enseignements, 100 000 FCFA par an, validation par la structure.'), findsOneWidget);
      expect(find.text('Mes enseignements'), findsNothing);
      expect(find.text('Abonnement Plateforme'), findsNothing);
    });

    testWidgets('membre Plateforme : Mes enseignements et Abonnement visibles, Devenir partenaire absent', (tester) async {
      app.member = Member('Test', 'CP-TT-2526', 'Céleste', DateTime(2026, 1, 1), fonction: 'Plateforme');
      await ouvrirMenu(tester);
      await tester.scrollUntilVisible(
        find.text('Mes enseignements'),
        100,
        scrollable: find.descendant(
          of: find.byType(ListView),
          matching: find.byType(Scrollable),
        ),
      );
      expect(find.text('Mes enseignements'), findsOneWidget);
      await tester.scrollUntilVisible(
        find.text('Abonnement Plateforme'),
        100,
        scrollable: find.descendant(
          of: find.byType(ListView),
          matching: find.byType(Scrollable),
        ),
      );
      expect(find.text('Abonnement Plateforme'), findsOneWidget);
      expect(find.text('Devenir partenaire'), findsNothing);
    });

    testWidgets('visiteur : aucune des 3 entrées', (tester) async {
      await ouvrirMenu(tester);
      expect(find.text('Devenir partenaire'), findsNothing);
      expect(find.text('Mes enseignements'), findsNothing);
      expect(find.text('Abonnement Plateforme'), findsNothing);
    });
  });

  group('Suppression de la page Plus, Profil', () {
    setUp(() {
      SharedPreferences.setMockInitialValues({});
    });

    tearDown(() {
      app.member = null;
    });

    testWidgets('le Profil n’a plus de bouton Mes absences et demandes', (tester) async {
      app.member = Member('Test', 'CP-TT-2526', 'Céleste', DateTime(2026, 1, 1), fonction: 'Membre', statutAdhesion: 'validee');
      // Fenêtre haute : les cinq cartes du Profil (19 nov. 2026)
      // poussent les boutons du bas sous le pli à 600 px.
      tester.view.physicalSize = const Size(390, 4000);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      await tester.pumpWidget(const MaterialApp(home: ProfilePage()));
      await tester.pumpAndSettle();
      expect(find.text('Mes absences et demandes'), findsNothing);
      expect(find.text('Mon certificat d’adhésion'), findsOneWidget);
      expect(find.text('Se déconnecter de cet appareil'), findsOneWidget);
      expect(find.text('Supprimer mon compte'), findsOneWidget);
    });
  });
}
