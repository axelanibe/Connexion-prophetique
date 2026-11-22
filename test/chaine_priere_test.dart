// Tests de la chaîne de prière en direct, 21 nov. 2026,
// tranche 1 puis refonte d'après la maquette : carte hero
// avec navigation de date, filtres par moment, bascule liste
// ou grille, modales réserver, déplacer et libérer, jours
// passés en lecture seule. Client simulé, sans serveur ni
// réseau.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/chaine_priere.dart';

class _ClientFaux extends ApiClient {
  _ClientFaux({this.creneaux = const []});

  final List<Map<String, dynamic>> creneaux;
  final String aujourdHui = '2026-11-21';
  String? dernierJour;
  int? dernierEngage;
  String? dernierJourEngage;
  bool dernierDeplacer = false;
  int liberations = 0;
  String? dernierJourLibere;

  @override
  Future<Map<String, dynamic>> fetchChainePriere({String? jour}) async {
    dernierJour = jour;
    return {
      'jour': jour ?? aujourdHui,
      'aujourd_hui': aujourdHui,
      'creneaux': creneaux,
      'couverts': creneaux.length,
      'total': 24,
    };
  }

  @override
  Future<Map<String, dynamic>> engagerCreneauPriere(
    int heure, {
    String? jour,
    bool deplacer = false,
  }) async {
    dernierEngage = heure;
    dernierJourEngage = jour;
    dernierDeplacer = deplacer;
    return {'creneau': {'heure': heure, 'membre_id': 'moi', 'prenom': 'Axel'}};
  }

  @override
  Future<Map<String, dynamic>> libererCreneauPriere({String? jour}) async {
    liberations++;
    dernierJourLibere = jour;
    return {'ok': true, 'heure': 8};
  }
}

void main() {
  group('creneauxPriereDepuisReponse', () {
    test('24 créneaux, libres par défaut', () {
      final creneaux = creneauxPriereDepuisReponse({});
      expect(creneaux.length, 24);
      expect(creneaux[0].heure, 0);
      expect(creneaux[23].heure, 23);
      expect(creneaux.every((c) => c.estLibre), isTrue);
    });

    test('créneaux pris à leur place, le reste libre', () {
      final creneaux = creneauxPriereDepuisReponse({
        'creneaux': [
          {'heure': 8, 'membre_id': 'm1', 'prenom': 'Marie'},
          {'heure': 20, 'membre_id': 'm2', 'prenom': 'Axel'},
        ],
      });
      expect(creneaux[8].prenom, 'Marie');
      expect(creneaux[8].estLibre, isFalse);
      expect(creneaux[20].prenom, 'Axel');
      expect(creneaux[9].estLibre, isTrue);
    });

    test('heures hors limites ignorées', () {
      final creneaux = creneauxPriereDepuisReponse({
        'creneaux': [
          {'heure': 24, 'membre_id': 'mx', 'prenom': 'Hors'},
          {'heure': -1, 'membre_id': 'my', 'prenom': 'Hors'},
        ],
      });
      expect(creneaux.every((c) => c.estLibre), isTrue);
    });
  });

  group('heuresCouvertesPriere et libelleCreneauPriere', () {
    test('0 vide, 2 avec deux prises', () {
      expect(heuresCouvertesPriere(creneauxPriereDepuisReponse({})), 0);
      expect(
        heuresCouvertesPriere(creneauxPriereDepuisReponse({
          'creneaux': [
            {'heure': 8, 'membre_id': 'm1', 'prenom': 'Marie'},
            {'heure': 20, 'membre_id': 'm2', 'prenom': 'Axel'},
          ],
        })),
        2,
      );
    });

    test('libellés 8 h et 23 h', () {
      expect(libelleCreneauPriere(8), '8 h – 9 h');
      expect(libelleCreneauPriere(23), '23 h – 0 h');
      expect(libelleCreneauPriere(0), '0 h – 1 h');
    });
  });

  group('CreneauPriere', () {
    test('estMien seulement pour mon identifiant', () {
      final creneau = CreneauPriere(heure: 8, membreId: 'moi', prenom: 'Axel');
      expect(creneau.estMien('moi'), isTrue);
      expect(creneau.estMien('autre'), isFalse);
      expect(creneau.estMien(null), isFalse);
      expect(CreneauPriere(heure: 9).estMien('moi'), isFalse);
    });
  });

  group('aides de la refonte', () {
    test('jourIsoChaine en AAAA-MM-JJ', () {
      expect(jourIsoChaine(DateTime(2026, 11, 21)), '2026-11-21');
      expect(jourIsoChaine(DateTime(2026, 1, 5)), '2026-01-05');
    });

    test('libelleDateChaine comme la maquette', () {
      expect(libelleDateChaine(DateTime(2026, 11, 21)), 'Samedi 21 nov. 2026');
      expect(libelleDateChaine(DateTime(2026, 11, 22)), 'Dimanche 22 nov. 2026');
    });

    test('libelleRelatifChaine : aujourd hui, demain, hier, écarts', () {
      final aujourdHui = DateTime(2026, 11, 21);
      expect(libelleRelatifChaine(DateTime(2026, 11, 21), aujourdHui), "Aujourd'hui");
      expect(libelleRelatifChaine(DateTime(2026, 11, 22), aujourdHui), 'Demain');
      expect(libelleRelatifChaine(DateTime(2026, 11, 20), aujourdHui), 'Hier');
      expect(libelleRelatifChaine(DateTime(2026, 11, 24), aujourdHui), 'Dans 3 jours');
      expect(libelleRelatifChaine(DateTime(2026, 11, 19), aujourdHui), 'Il y a 2 jours');
    });

    test('momentChaine : nuit, matin, après-midi, soir', () {
      expect(momentChaine(0), MomentChaine.nuit);
      expect(momentChaine(5), MomentChaine.nuit);
      expect(momentChaine(6), MomentChaine.matin);
      expect(momentChaine(11), MomentChaine.matin);
      expect(momentChaine(12), MomentChaine.apresMidi);
      expect(momentChaine(17), MomentChaine.apresMidi);
      expect(momentChaine(18), MomentChaine.soir);
      expect(momentChaine(23), MomentChaine.soir);
    });

    test('initialesDepuisNom : deux lettres, jamais inventées', () {
      expect(initialesDepuisNom('Sarah M.'), 'SM');
      expect(initialesDepuisNom('Marie'), 'MA');
      expect(initialesDepuisNom('Vous'), 'VO');
      expect(initialesDepuisNom(''), '');
    });

    test('estJourPasseChaine : avant aujourd hui seulement', () {
      expect(estJourPasseChaine('2026-11-20', '2026-11-21'), isTrue);
      expect(estJourPasseChaine('2026-11-21', '2026-11-21'), isFalse);
      expect(estJourPasseChaine('2026-11-22', '2026-11-21'), isFalse);
      expect(estJourPasseChaine('2026-11-20', null), isFalse);
    });

    test('creneauxFiltresChaine : le matin seulement', () {
      final creneaux = creneauxPriereDepuisReponse({});
      final matin = creneauxFiltresChaine(creneaux, MomentChaine.matin);
      expect(matin.map((c) => c.heure).toList(), [6, 7, 8, 9, 10, 11]);
      expect(creneauxFiltresChaine(creneaux, null).length, 24);
    });

    test('teinteAvatarChaine : stable pour le même membre', () {
      expect(teinteAvatarChaine('m1'), teinteAvatarChaine('m1'));
    });
  });

  group('ChainePrierePage', () {
    testWidgets('en-tête 2 h couvertes sur 24, date de la maquette, Libre et prénoms visibles', (tester) async {
      final client = _ClientFaux(creneaux: [
        {'heure': 8, 'membre_id': 'm1', 'prenom': 'Marie'},
        {'heure': 20, 'membre_id': 'm2', 'prenom': 'Axel'},
      ]);
      await tester.pumpWidget(
        MaterialApp(
          home: ChainePrierePage(
            client: client,
            membreId: 'moi',
            jourInitial: DateTime(2026, 11, 21),
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('2 h couvertes sur 24'), findsOneWidget);
      expect(find.text('Samedi 21 nov. 2026'), findsOneWidget);
      expect(find.text("Aujourd'hui"), findsOneWidget);
      expect(client.dernierJour, '2026-11-21');
      await tester.scrollUntilVisible(find.text('Marie'), 200, scrollable: find.byType(Scrollable).first);
      await tester.pumpAndSettle();
      expect(find.text('Marie'), findsOneWidget);
      await tester.scrollUntilVisible(find.text('Axel'), 200, scrollable: find.byType(Scrollable).first);
      await tester.pumpAndSettle();
      expect(find.text('Axel'), findsOneWidget);
      expect(find.text('Créneau libre'), findsWidgets);
    });

    testWidgets('toucher un créneau libre ouvre la confirmation puis engage', (tester) async {
      final client = _ClientFaux(creneaux: []);
      await tester.pumpWidget(
        MaterialApp(
          home: ChainePrierePage(
            client: client,
            membreId: 'moi',
            jourInitial: DateTime(2026, 11, 21),
          ),
        ),
      );
      await tester.pumpAndSettle();
      await tester.scrollUntilVisible(find.text('8 h – 9 h'), 200, scrollable: find.byType(Scrollable).first);
      await tester.pumpAndSettle();
      await tester.tap(find.text('8 h – 9 h'));
      await tester.pumpAndSettle();
      expect(find.text('Réserver 8 h – 9 h ?'), findsOneWidget);
      await tester.tap(find.text("M'inscrire"));
      await tester.pumpAndSettle();
      expect(client.dernierEngage, 8);
      expect(client.dernierJourEngage, '2026-11-21');
      expect(client.dernierDeplacer, isFalse);
    });

    testWidgets('toucher le créneau d un autre ne fait rien', (tester) async {
      final client = _ClientFaux(creneaux: [
        {'heure': 8, 'membre_id': 'm1', 'prenom': 'Marie'},
      ]);
      await tester.pumpWidget(
        MaterialApp(
          home: ChainePrierePage(
            client: client,
            membreId: 'moi',
            jourInitial: DateTime(2026, 11, 21),
          ),
        ),
      );
      await tester.pumpAndSettle();
      await tester.scrollUntilVisible(find.text('Marie'), 200, scrollable: find.byType(Scrollable).first);
      await tester.pumpAndSettle();
      await tester.tap(find.text('Marie'));
      await tester.pumpAndSettle();
      expect(client.dernierEngage, isNull);
      expect(client.liberations, 0);
    });

    testWidgets('toucher son créneau ouvre la confirmation puis libère', (tester) async {
      final client = _ClientFaux(creneaux: [
        {'heure': 8, 'membre_id': 'moi', 'prenom': 'Axel'},
      ]);
      await tester.pumpWidget(
        MaterialApp(
          home: ChainePrierePage(
            client: client,
            membreId: 'moi',
            jourInitial: DateTime(2026, 11, 21),
          ),
        ),
      );
      await tester.pumpAndSettle();
      await tester.scrollUntilVisible(find.text('Votre créneau • Engagé'), 200, scrollable: find.byType(Scrollable).first);
      await tester.pumpAndSettle();
      await tester.tap(find.text('Votre créneau • Engagé'));
      await tester.pumpAndSettle();
      expect(find.text('Libérer votre créneau ?'), findsOneWidget);
      await tester.tap(find.text('Libérer le créneau'));
      await tester.pumpAndSettle();
      expect(client.liberations, 1);
      expect(client.dernierJourLibere, '2026-11-21');
    });

    testWidgets('toucher un créneau libre quand on en a un propose le déplacement', (tester) async {
      final client = _ClientFaux(creneaux: [
        {'heure': 8, 'membre_id': 'moi', 'prenom': 'Axel'},
      ]);
      await tester.pumpWidget(
        MaterialApp(
          home: ChainePrierePage(
            client: client,
            membreId: 'moi',
            jourInitial: DateTime(2026, 11, 21),
          ),
        ),
      );
      await tester.pumpAndSettle();
      await tester.scrollUntilVisible(find.text('9 h – 10 h'), 200, scrollable: find.byType(Scrollable).first);
      await tester.pumpAndSettle();
      await tester.tap(find.text('9 h – 10 h'));
      await tester.pumpAndSettle();
      expect(find.text('Déplacer votre créneau ?'), findsOneWidget);
      await tester.tap(find.text('Déplacer ici'));
      await tester.pumpAndSettle();
      expect(client.dernierEngage, 9);
      expect(client.dernierDeplacer, isTrue);
      expect(client.dernierJourEngage, '2026-11-21');
    });

    testWidgets('filtre Matin ne montre que 6 h à 12 h', (tester) async {
      final client = _ClientFaux(creneaux: []);
      await tester.pumpWidget(
        MaterialApp(
          home: ChainePrierePage(
            client: client,
            membreId: 'moi',
            jourInitial: DateTime(2026, 11, 21),
          ),
        ),
      );
      await tester.pumpAndSettle();
      await tester.tap(find.text('Matin (6h-12h)'));
      await tester.pumpAndSettle();
      expect(find.text('8 h – 9 h'), findsOneWidget);
      expect(find.text('20 h – 21 h'), findsNothing);
      expect(find.text('0 h – 1 h'), findsNothing);
    });

    testWidgets('bascule grille montre les cartes compactes', (tester) async {
      final client = _ClientFaux(creneaux: [
        {'heure': 8, 'membre_id': 'm1', 'prenom': 'Marie'},
      ]);
      await tester.pumpWidget(
        MaterialApp(
          home: ChainePrierePage(
            client: client,
            membreId: 'moi',
            jourInitial: DateTime(2026, 11, 21),
          ),
        ),
      );
      await tester.pumpAndSettle();
      await tester.tap(find.byIcon(Icons.grid_view_outlined));
      await tester.pumpAndSettle();
      expect(find.text('+ Choisir'), findsWidgets);
      await tester.scrollUntilVisible(find.text('Marie'), 200, scrollable: find.byType(Scrollable).first);
      await tester.pumpAndSettle();
      expect(find.text('Marie'), findsOneWidget);
    });

    testWidgets('flèche suivante charge le lendemain', (tester) async {
      final client = _ClientFaux(creneaux: []);
      await tester.pumpWidget(
        MaterialApp(
          home: ChainePrierePage(
            client: client,
            membreId: 'moi',
            jourInitial: DateTime(2026, 11, 21),
          ),
        ),
      );
      await tester.pumpAndSettle();
      await tester.tap(find.byIcon(Icons.chevron_right));
      await tester.pumpAndSettle();
      expect(client.dernierJour, '2026-11-22');
      expect(find.text('Dimanche 22 nov. 2026'), findsOneWidget);
      expect(find.text('Demain'), findsOneWidget);
    });

    testWidgets('jour passé en lecture seule, toucher un créneau libre ne fait rien', (tester) async {
      final client = _ClientFaux(creneaux: []);
      await tester.pumpWidget(
        MaterialApp(
          home: ChainePrierePage(
            client: client,
            membreId: 'moi',
            jourInitial: DateTime(2026, 11, 20),
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('Hier'), findsOneWidget);
      await tester.scrollUntilVisible(find.text('8 h – 9 h'), 200, scrollable: find.byType(Scrollable).first);
      await tester.pumpAndSettle();
      await tester.tap(find.text('8 h – 9 h'));
      await tester.pumpAndSettle();
      expect(client.dernierEngage, isNull);
      expect(find.text('Réserver 8 h – 9 h ?'), findsNothing);
    });

    testWidgets('bouton Règle ouvre le fonctionnement', (tester) async {
      final client = _ClientFaux(creneaux: []);
      await tester.pumpWidget(
        MaterialApp(
          home: ChainePrierePage(
            client: client,
            membreId: 'moi',
            jourInitial: DateTime(2026, 11, 21),
          ),
        ),
      );
      await tester.pumpAndSettle();
      await tester.tap(find.byIcon(Icons.info_outline));
      await tester.pumpAndSettle();
      expect(find.text('Fonctionnement'), findsOneWidget);
      expect(find.text('Un membre par créneau, un créneau par membre et par jour.'), findsOneWidget);
    });
  });
}
