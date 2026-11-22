// Tests des défis de prière de 7 jours, 21 nov. 2026,
// tranches 1 à 3 de l'audit du 17 nov. : liste, inscription,
// coche d'un jour, progression x/7, état vide. Client simulé,
// sans serveur ni réseau.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/defis_priere.dart';

class _ClientFaux extends ApiClient {
  _ClientFaux({this.defis = const []});

  final List<Map<String, dynamic>> defis;
  String? dernierRejoint;
  ({String id, int jour})? dernierJour;

  @override
  Future<Map<String, dynamic>> fetchDefisPriere() async => {'defis': defis};

  @override
  Future<Map<String, dynamic>> rejoindreDefiPriere(String id) async {
    dernierRejoint = id;
    return {'ok': true};
  }

  @override
  Future<Map<String, dynamic>> validerJourDefiPriere(String id, int jour) async {
    dernierJour = (id: id, jour: jour);
    return {'ok': true, 'jours_valides': [jour], 'progression': 1, 'total': 7};
  }
}

void main() {
  group('jourCourantDefiLocal', () {
    test('1 le jour du début, 7 le dernier, null hors fenêtre', () {
      expect(jourCourantDefiLocal('2026-11-21', DateTime(2026, 11, 21, 10)), 1);
      expect(jourCourantDefiLocal('2026-11-21', DateTime(2026, 11, 24, 10)), 4);
      expect(jourCourantDefiLocal('2026-11-21', DateTime(2026, 11, 27, 10)), 7);
      expect(jourCourantDefiLocal('2026-11-21', DateTime(2026, 11, 20, 10)), isNull);
      expect(jourCourantDefiLocal('2026-11-21', DateTime(2026, 11, 28, 10)), isNull);
      expect(jourCourantDefiLocal('pas-une-date', DateTime(2026, 11, 21)), isNull);
    });
  });

  group('dateDefiCourte', () {
    test('21 nov. 2026', () {
      expect(dateDefiCourte('2026-11-21'), '21 nov. 2026');
      expect(dateDefiCourte('pas-une-date'), 'pas-une-date');
    });
  });

  group('defisPriereDepuisReponse', () {
    test('progression x/7 depuis les jours validés', () {
      final defis = defisPriereDepuisReponse({
        'defis': [
          {
            'id': 'd1',
            'titre': 'Prier ensemble',
            'description': 'Une semaine',
            'date_debut': '2026-11-21',
            'date_fin': '2026-11-27',
            'participants': 3,
            'inscrit': true,
            'jours_valides': [2, 1, 1],
          },
        ],
      });
      expect(defis.length, 1);
      expect(defis[0].progression, 2);
      expect(defis[0].jourFait(1), isTrue);
      expect(defis[0].jourFait(3), isFalse);
      expect(defisPriereDepuisReponse({}), isEmpty);
    });
  });

  testWidgets('état vide quand aucun défi', (tester) async {
    await tester.pumpWidget(MaterialApp(home: DefisPrierePage(client: _ClientFaux())));
    await tester.pumpAndSettle();
    expect(find.text('Défis de prière'), findsOneWidget);
    expect(find.textContaining('Aucun défi de prière'), findsOneWidget);
  });

  testWidgets('rejoindre un défi appelle le client', (tester) async {
    final client = _ClientFaux(defis: [
      {
        'id': 'd1',
        'titre': 'Prier ensemble',
        'description': '',
        'date_debut': '2026-11-21',
        'date_fin': '2026-11-27',
        'participants': 2,
        'inscrit': false,
        'jours_valides': [],
      },
    ]);
    await tester.pumpWidget(MaterialApp(home: DefisPrierePage(client: client)));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Rejoindre ce défi'));
    await tester.pumpAndSettle();
    expect(client.dernierRejoint, 'd1');
  });

  testWidgets('un défi rejoint montre la progression x/7', (tester) async {
    final client = _ClientFaux(defis: [
      {
        'id': 'd1',
        'titre': 'Prier ensemble',
        'description': '',
        'date_debut': '2026-11-21',
        'date_fin': '2026-11-27',
        'participants': 2,
        'inscrit': true,
        'jours_valides': [1, 2],
      },
    ]);
    await tester.pumpWidget(MaterialApp(home: DefisPrierePage(client: client)));
    await tester.pumpAndSettle();
    expect(find.text('2/7'), findsOneWidget);
    expect(find.text('Jour 1'), findsOneWidget);
    expect(find.text('Jour 7'), findsOneWidget);
  });
}
