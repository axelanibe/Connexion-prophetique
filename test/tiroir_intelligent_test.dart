// Tests du tiroir intelligent, 17 nov. 2026 : section « Pour vous »
// (entrées les plus utilisées sur ce téléphone, plus ce qui demande
// l'attention), « Mes enfants » et « Mes résultats scolaires »
// masqués quand ils ne s'appliquent pas au membre, affichés sinon.
// Le reste du tiroir ne change pas, la page Plus garde les deux
// entrées sans condition.
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/messagerie.dart';
import 'package:connexion_prophetique/tiroir_intelligent.dart';

void main() {
  group('Tiroir intelligent, classement des plus utilisées', () {
    test('sans historique, rien', () {
      expect(TiroirUsage.idsPlusUtilisees(['a', 'b'], {}, {}), isEmpty);
    });

    test('par nombre de touchers, puis par toucher le plus récent', () {
      final comptes = {'a': 2, 'b': 5, 'c': 5};
      final derniers = {'b': 100, 'c': 200};
      expect(
        TiroirUsage.idsPlusUtilisees(['a', 'b', 'c'], comptes, derniers),
        ['c', 'b', 'a'],
      );
    });

    test('plafonné à 3, égalité dans l’ordre du tiroir', () {
      final comptes = {'a': 1, 'b': 1, 'c': 1, 'd': 1};
      expect(
        TiroirUsage.idsPlusUtilisees(['a', 'b', 'c', 'd'], comptes, {}),
        ['a', 'b', 'c'],
      );
    });

    test('seules les entrées visibles comptent', () {
      final comptes = {'a': 9, 'cachee': 99};
      expect(
        TiroirUsage.idsPlusUtilisees(['a'], comptes, {}),
        ['a'],
      );
    });
  });

  group('Tiroir intelligent, usages sur le téléphone', () {
    test('enregistrer puis relire, le compteur monte', () async {
      SharedPreferences.setMockInitialValues({});
      await TiroirUsage.instance.enregistrer('playlist');
      await TiroirUsage.instance.enregistrer('playlist');
      await TiroirUsage.instance.enregistrer('don');
      final usages = await TiroirUsage.instance.charger();
      expect(usages.comptes, {'playlist': 2, 'don': 1});
      expect(usages.derniers.keys, containsAll(['playlist', 'don']));
    });

    test('données abîmées, on repart de zéro sans erreur', () async {
      SharedPreferences.setMockInitialValues({TiroirUsage.clePrefs: 'pas du json'});
      final usages = await TiroirUsage.instance.charger();
      expect(usages.comptes, isEmpty);
      expect(usages.derniers, isEmpty);
    });
  });

  group('Tiroir intelligent, contexte membre', () {
    test('inconnu au départ, on affiche les deux entrées', () {
      final contexte = TiroirContexte.pourTests();
      expect(contexte.montreEnfants, isTrue);
      expect(contexte.montreResultats, isTrue);
    });

    test('définies par les tests, masquées quand elles ne s’appliquent pas', () {
      final contexte = TiroirContexte.pourTests();
      contexte.definirPourTests(aEnfants: false, aResultats: false);
      expect(contexte.montreEnfants, isFalse);
      expect(contexte.montreResultats, isFalse);
      contexte.definirPourTests(aEnfants: true, aResultats: true);
      expect(contexte.montreEnfants, isTrue);
      expect(contexte.montreResultats, isTrue);
    });

    test('sans membre connecté, rien à vérifier', () async {
      var appels = 0;
      final contexte = TiroirContexte.pourTests();
      await contexte.charger(
        connecte: false,
        matricule: null,
        fetchEnfants: () async {
          appels++;
          return [];
        },
        fetchSuivis: () async {
          appels++;
          return [];
        },
      );
      expect(appels, 0);
      expect(contexte.montreEnfants, isTrue);
      expect(contexte.montreResultats, isTrue);
    });

    test('listes vides, les deux entrées se cachent', () async {
      final contexte = TiroirContexte.pourTests();
      await contexte.charger(
        connecte: true,
        matricule: 'CP-TT-2526',
        fetchEnfants: () async => <dynamic>[],
        fetchSuivis: () async => <dynamic>[],
      );
      expect(contexte.montreEnfants, isFalse);
      expect(contexte.montreResultats, isFalse);
    });

    test('listes non vides, les deux entrées s’affichent', () async {
      final contexte = TiroirContexte.pourTests();
      await contexte.charger(
        connecte: true,
        matricule: 'CP-TT-2526',
        fetchEnfants: () async => [
          {'id': 1}
        ],
        fetchSuivis: () async => [
          {'id': 2}
        ],
      );
      expect(contexte.montreEnfants, isTrue);
      expect(contexte.montreResultats, isTrue);
    });

    test('erreur serveur, on affiche, la prochaine ouverture réessaie', () async {
      var appels = 0;
      final contexte = TiroirContexte.pourTests();
      Future<List<dynamic>> enErreur() async {
        appels++;
        throw Exception('hors ligne');
      }

      await contexte.charger(
        connecte: true,
        matricule: 'CP-TT-2526',
        fetchEnfants: enErreur,
        fetchSuivis: enErreur,
      );
      expect(contexte.montreEnfants, isTrue);
      expect(contexte.montreResultats, isTrue);
      await contexte.charger(
        connecte: true,
        matricule: 'CP-TT-2526',
        fetchEnfants: () async => <dynamic>[],
        fetchSuivis: () async => <dynamic>[],
      );
      expect(appels, 2);
      expect(contexte.montreEnfants, isFalse);
    });

    test('une seule vérification par membre, puis on recharge pour un autre', () async {
      var appels = 0;
      Future<List<dynamic>> vide() async {
        appels++;
        return <dynamic>[];
      }

      final contexte = TiroirContexte.pourTests();
      await contexte.charger(connecte: true, matricule: 'CP-TT-2526', fetchEnfants: vide, fetchSuivis: vide);
      await contexte.charger(connecte: true, matricule: 'CP-TT-2526', fetchEnfants: vide, fetchSuivis: vide);
      expect(appels, 2);
      await contexte.charger(connecte: true, matricule: 'CP-UU-2527', fetchEnfants: vide, fetchSuivis: vide);
      expect(appels, 4);
    });
  });

  group('Tiroir intelligent, tiroir', () {
    // Surface haute : toute la liste est construite d'un coup,
    // sans défilement, les doublons entre « Pour vous » et les
    // groupes se comptent sans ambiguïté.
    Future<void> ouvrirMenu(WidgetTester tester) async {
      tester.view.physicalSize = const Size(1080, 4000);
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
      TiroirContexte.instance.reinitialiserPourTests();
      MessagerieLectureService.instance.nonLusNotifier.value = 0;
    });

    tearDown(() {
      TiroirContexte.instance.reinitialiserPourTests();
      MessagerieLectureService.instance.nonLusNotifier.value = 0;
      app.member = null;
    });

    testWidgets('sans historique et sans attention, pas de section Pour vous, les deux entrées affichées', (tester) async {
      await ouvrirMenu(tester);
      expect(find.text('Pour vous'), findsNothing);
      expect(find.text('Mes enfants'), findsOneWidget);
      expect(find.text('Mes résultats scolaires'), findsOneWidget);
      expect(find.text('Mon épanouissement'), findsOneWidget);
      expect(find.text('Playlist'), findsOneWidget);
    });

    testWidgets('les deux entrées masquées quand elles ne s’appliquent pas, le reste inchangé', (tester) async {
      TiroirContexte.instance.definirPourTests(aEnfants: false, aResultats: false);
      await ouvrirMenu(tester);
      expect(find.text('Mes enfants'), findsNothing);
      expect(find.text('Mes résultats scolaires'), findsNothing);
      expect(find.text('Mon épanouissement'), findsOneWidget);
      expect(find.text('Mes responsabilités'), findsOneWidget);
      expect(find.text('Mes achats'), findsOneWidget);
      expect(find.text('Don'), findsOneWidget);
      expect(find.text('Playlist'), findsOneWidget);
    });

    testWidgets('les deux entrées affichées quand elles s’appliquent', (tester) async {
      TiroirContexte.instance.definirPourTests(aEnfants: true, aResultats: true);
      await ouvrirMenu(tester);
      expect(find.text('Mes enfants'), findsOneWidget);
      expect(find.text('Mes résultats scolaires'), findsOneWidget);
    });

    testWidgets('Pour vous avec historique : les plus utilisées, plafonnées à 3', (tester) async {
      SharedPreferences.setMockInitialValues({
        TiroirUsage.clePrefs: jsonEncode({
          'comptes': {'playlist': 5, 'notifications': 3, 'don': 2, 'taille-texte': 1},
          'derniers': {'playlist': 300, 'notifications': 200, 'don': 100, 'taille-texte': 50},
        }),
      });
      await ouvrirMenu(tester);
      expect(find.text('Pour vous'), findsOneWidget);
      expect(find.text('Playlist'), findsNWidgets(2));
      expect(find.text('Notifications'), findsNWidgets(2));
      expect(find.text('Don'), findsNWidgets(2));
      expect(find.text('Taille du texte'), findsOneWidget);
    });

    testWidgets('Pour vous avec attention seulement : la messagerie non lue', (tester) async {
      app.member = Member('Test', 'CP-TT-2526', 'Céleste', DateTime(2026, 1, 1));
      TiroirContexte.instance.definirPourTests(aEnfants: true, aResultats: true);
      MessagerieLectureService.instance.nonLusNotifier.value = 2;
      await ouvrirMenu(tester);
      expect(find.text('Pour vous'), findsOneWidget);
      expect(find.text('Messagerie'), findsNWidgets(2));
      expect(find.text('2'), findsNWidgets(2));
    });

    testWidgets('toucher une entrée l’enregistre sur le téléphone', (tester) async {
      await ouvrirMenu(tester);
      await tester.tap(find.text('Visite guidée'));
      await tester.pumpAndSettle();
      final prefs = await SharedPreferences.getInstance();
      final brut = prefs.getString(TiroirUsage.clePrefs);
      expect(brut, isNotNull);
      expect(jsonDecode(brut!)['comptes'], {'visite-guidee': 1});
    });
  });
}
