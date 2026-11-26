// Tests de la tranche T10, navigation et connexion, 26 nov. 2026.
// Les données ci-dessous sont des données de test, jamais les
// vraies données d'Axel. Le faux ApiClient ne touche pas le
// réseau, le faux flux remplace connectivity_plus.
import 'dart:async';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/app_models.dart';
import 'package:connexion_prophetique/nouveau/cache_contenus.dart';
import 'package:connexion_prophetique/nouveau/coquille.dart';
import 'package:connexion_prophetique/nouveau/modeles_connexion.dart';
import 'package:connexion_prophetique/nouveau/page_connexion.dart';
import 'package:connexion_prophetique/nouveau/veille_reseau.dart';

// Données de test seulement.
final _membreTest = Member(
  'Test Membre',
  'CP-TEST-0000',
  'Bureau national',
  DateTime(2025, 1, 1),
);

const _texteToast =
    'Hors ligne, les contenus affichés sont ceux déjà chargés.';

class _FauxApi extends ApiClient {
  var echoue = false;
  var evenements = <Map<String, dynamic>>[
    {'id': 'e1', 'nom': 'Camp de test', 'type': 'camp'},
  ];
  var etablissements = <Map<String, dynamic>>[
    {'id': 'et1', 'nom': 'Établissement de test'},
  ];

  @override
  Future<List<Map<String, dynamic>>> fetchEvenements() async {
    if (echoue) throw Exception('hors ligne');
    return evenements;
  }

  @override
  Future<List<Map<String, dynamic>>> fetchEtablissements() async {
    if (echoue) throw Exception('hors ligne');
    return etablissements;
  }

  @override
  Future<List<Map<String, dynamic>>> fetchActualites() async {
    if (echoue) throw Exception('hors ligne');
    return const [];
  }
}

class _FauxServiceConnexion implements ServiceConnexion {
  var echoue = false;

  @override
  Future<PagePublications> chargerFil(
      {String? categorie, String? q, String? avant, int limite = 20}) async {
    if (echoue) throw Exception('hors ligne');
    return PagePublications(
      publications: [
        PublicationConnexion(
          id: 'p1',
          auteurId: 'a1',
          auteurNom: 'Test Auteure',
          etablissementNom: 'Établissement de test',
          texte: 'Témoignage de test.',
          categorie: 'temoignage',
          creeLe: DateTime(2026, 11, 20),
        ),
      ],
      suivante: null,
    );
  }

  @override
  Future<List<PublicationConnexion>> chargerActualites() async {
    if (echoue) throw Exception('hors ligne');
    return const [];
  }

  @override
  Future<Map<String, String>> chargerPhotosAuteurs(List<String> ids) async =>
      const {};

  @override
  dynamic noSuchMethod(Invocation invocation) => super.noSuchMethod(invocation);
}

void main() {
  group('T10, veille réseau', () {
    test('coupure puis retour : une seule reprise, pas de reprise au départ',
        () async {
      final controleur = StreamController<List<ConnectivityResult>>();
      addTearDown(controleur.close);
      final veille = VeilleReseau(flux: controleur.stream);
      var appels = 0;
      veille.ajouterReprise(() => appels++);
      veille.demarrer();
      expect(veille.enLigne.value, isTrue);
      controleur.add([ConnectivityResult.wifi]);
      await Future<void>.delayed(Duration.zero);
      expect(veille.reprises.value, 0);
      expect(appels, 0);
      controleur.add([ConnectivityResult.none]);
      await Future<void>.delayed(Duration.zero);
      expect(veille.enLigne.value, isFalse);
      expect(veille.reprises.value, 0);
      controleur.add([ConnectivityResult.wifi]);
      await Future<void>.delayed(Duration.zero);
      expect(veille.enLigne.value, isTrue);
      expect(veille.reprises.value, 1);
      expect(appels, 1);
      controleur.add([ConnectivityResult.mobile]);
      await Future<void>.delayed(Duration.zero);
      expect(veille.reprises.value, 1);
      expect(appels, 1);
      await veille.arreter();
    });
  });

  group('T10, cache des contenus', () {
    setUp(() => SharedPreferences.setMockInitialValues({}));

    test('événements : succès gardé, échec renvoie la copie', () async {
      final faux = _FauxApi();
      final cache = CacheContenus(faux);
      expect(await cache.chargerEvenements(), faux.evenements);
      faux.echoue = true;
      expect(await cache.chargerEvenements(), faux.evenements);
      expect(await cache.lireEvenementsEnCache(), faux.evenements);
    });

    test('établissements : succès gardé, échec renvoie la copie', () async {
      final faux = _FauxApi();
      final cache = CacheContenus(faux);
      expect(await cache.chargerEtablissements(), faux.etablissements);
      faux.echoue = true;
      expect(await cache.chargerEtablissements(), faux.etablissements);
      expect(
          await cache.lireEtablissementsEnCache(), faux.etablissements);
    });

    test('sans copie et sans réseau : liste vide, jamais une erreur',
        () async {
      final faux = _FauxApi()..echoue = true;
      final cache = CacheContenus(faux);
      expect(await cache.chargerEvenements(), isEmpty);
      expect(await cache.chargerEtablissements(), isEmpty);
    });
  });

  group('T10, coquille', () {
    late StreamController<List<ConnectivityResult>> controleur;
    late VeilleReseau veille;

    setUp(() {
      controleur =
          StreamController<List<ConnectivityResult>>.broadcast(sync: true);
      veille = VeilleReseau(flux: controleur.stream);
    });

    tearDown(() async {
      await controleur.close();
    });

    Future<void> pomper(WidgetTester tester) async {
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      await tester.pumpWidget(MaterialApp(
        home: NouvelleCoquille(membre: _membreTest, veille: veille),
      ));
      await tester.pumpAndSettle();
      expect(tester.takeException(), isNull);
    }

    testWidgets('perte du réseau : toast transitoire, rien au retour',
        (tester) async {
      await pomper(tester);
      controleur.add([ConnectivityResult.none]);
      await tester.pump();
      expect(find.text(_texteToast), findsOneWidget);
      controleur.add([ConnectivityResult.wifi]);
      await tester.pump();
      // Le retour ne montre pas un second toast : le premier,
      // transitoire, est toujours là, il s'efface seul après 3 s.
      // Pompes incrémentées : le minuteur du SnackBar ne démarre
      // qu'une fois son animation d'entrée terminée.
      expect(find.text(_texteToast), findsOneWidget);
      await tester.pump(const Duration(milliseconds: 500));
      await tester.pump(const Duration(seconds: 3));
      await tester.pump(const Duration(milliseconds: 500));
      await tester.pump();
      expect(find.text(_texteToast), findsNothing);
      expect(tester.takeException(), isNull);
    });

    testWidgets('retour système : une destination revient à l’onglet',
        (tester) async {
      await pomper(tester);
      await tester.tap(find.byIcon(Icons.grid_view_outlined));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Mes documents'));
      await tester.pumpAndSettle();
      expect(find.byIcon(Icons.arrow_back), findsOneWidget);
      await tester.binding.handlePopRoute();
      await tester.pumpAndSettle();
      expect(find.byIcon(Icons.arrow_back), findsNothing);
      expect(find.byIcon(Icons.menu), findsOneWidget);
      expect(find.text('Mes documents'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('retour système : un onglet revient à l’accueil',
        (tester) async {
      await pomper(tester);
      await tester.tap(find.byIcon(Icons.menu_book_outlined));
      await tester.pumpAndSettle();
      expect(find.text('Bible'), findsNWidgets(2));
      await tester.binding.handlePopRoute();
      await tester.pumpAndSettle();
      expect(find.text('Bible'), findsOneWidget);
      expect(find.text('Accueil'), findsNWidgets(2));
      expect(tester.takeException(), isNull);
    });
  });

  group('T10, passage crème', () {
    late StreamController<List<ConnectivityResult>> controleur;
    late _FauxServiceConnexion service;

    setUp(() {
      controleur =
          StreamController<List<ConnectivityResult>>.broadcast(sync: true);
      VeilleReseau.partage = VeilleReseau(flux: controleur.stream);
      service = _FauxServiceConnexion();
    });

    tearDown(() async {
      await controleur.close();
      VeilleReseau.partage = VeilleReseau();
    });

    testWidgets('le fil reste affiché quand la reprise échoue',
        (tester) async {
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      await tester.pumpWidget(MaterialApp(
        home: PageConnexion(service: service),
      ));
      await tester.pumpAndSettle();
      expect(find.text('Témoignage de test.'), findsOneWidget);
      service.echoue = true;
      controleur.add([ConnectivityResult.none]);
      await tester.pump();
      controleur.add([ConnectivityResult.wifi]);
      await tester.pumpAndSettle();
      expect(find.text('Témoignage de test.'), findsOneWidget);
      expect(find.text('Réessayer'), findsNothing);
      expect(
          find.text('Le fil ne peut pas être chargé pour le moment.'),
          findsNothing);
      expect(tester.takeException(), isNull);
    });
  });
}
