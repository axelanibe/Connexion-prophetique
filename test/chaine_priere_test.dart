// Tests de la chaîne de prière en direct, 21 nov. 2026,
// tranche 1 : 24 créneaux, en-tête des heures couvertes,
// engagement d'un créneau libre, libération du sien, le
// créneau d'un autre ne fait rien. Client simulé, sans
// serveur ni réseau.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/chaine_priere.dart';

class _ClientFaux extends ApiClient {
  _ClientFaux({this.creneaux = const []});

  final List<Map<String, dynamic>> creneaux;
  int? dernierEngage;
  int liberations = 0;

  @override
  Future<Map<String, dynamic>> fetchChainePriere() async => {
        'jour': '2026-11-21',
        'creneaux': creneaux,
        'couverts': creneaux.length,
        'total': 24,
      };

  @override
  Future<Map<String, dynamic>> engagerCreneauPriere(int heure) async {
    dernierEngage = heure;
    return {'creneau': {'heure': heure, 'membre_id': 'moi', 'prenom': 'Axel'}};
  }

  @override
  Future<Map<String, dynamic>> libererCreneauPriere() async {
    liberations++;
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

  group('ChainePrierePage', () {
    testWidgets('en-tête 2 h couvertes sur 24, Libre et prénoms visibles', (tester) async {
      final client = _ClientFaux(creneaux: [
        {'heure': 8, 'membre_id': 'm1', 'prenom': 'Marie'},
        {'heure': 20, 'membre_id': 'm2', 'prenom': 'Axel'},
      ]);
      await tester.pumpWidget(
        MaterialApp(home: ChainePrierePage(client: client, membreId: 'moi')),
      );
      await tester.pumpAndSettle();
      expect(find.text('2 h couvertes sur 24'), findsOneWidget);
      expect(find.text('2026-11-21'), findsOneWidget);
      await tester.scrollUntilVisible(find.text('Marie'), 200);
      await tester.pumpAndSettle();
      expect(find.text('Marie'), findsOneWidget);
      await tester.scrollUntilVisible(find.text('Axel'), 200);
      await tester.pumpAndSettle();
      expect(find.text('Axel'), findsOneWidget);
      expect(find.text('Libre'), findsWidgets);
    });

    testWidgets('toucher un créneau libre engage le membre', (tester) async {
      final client = _ClientFaux(creneaux: []);
      await tester.pumpWidget(
        MaterialApp(home: ChainePrierePage(client: client, membreId: 'moi')),
      );
      await tester.pumpAndSettle();
      await tester.scrollUntilVisible(find.text('8 h – 9 h'), 200);
      await tester.pumpAndSettle();
      await tester.tap(find.text('8 h – 9 h'));
      await tester.pumpAndSettle();
      expect(client.dernierEngage, 8);
    });

    testWidgets('toucher le créneau d un autre ne fait rien', (tester) async {
      final client = _ClientFaux(creneaux: [
        {'heure': 8, 'membre_id': 'm1', 'prenom': 'Marie'},
      ]);
      await tester.pumpWidget(
        MaterialApp(home: ChainePrierePage(client: client, membreId: 'moi')),
      );
      await tester.pumpAndSettle();
      await tester.scrollUntilVisible(find.text('Marie'), 200);
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
        MaterialApp(home: ChainePrierePage(client: client, membreId: 'moi')),
      );
      await tester.pumpAndSettle();
      await tester.scrollUntilVisible(find.text('Ton créneau, touche pour le libérer.'), 200);
      await tester.pumpAndSettle();
      await tester.tap(find.text('Ton créneau, touche pour le libérer.'));
      await tester.pumpAndSettle();
      expect(find.text('Libérer ce créneau ?'), findsOneWidget);
      await tester.tap(find.text('Libérer'));
      await tester.pumpAndSettle();
      expect(client.liberations, 1);
    });
  });
}
