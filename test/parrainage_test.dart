// Tests du parrainage jusqu'au baptême, 21 nov. 2026,
// tranches 4 et 5 de l'audit du 17 nov. : lecture, état vide,
// désignation par le Bureau, marquage du baptême. Client
// simulé, sans serveur ni réseau.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/parrainage.dart';

class _ClientFaux extends ApiClient {
  _ClientFaux({this.monParrain, this.commeParrain = const [], this.bureau = const [], this.membres = const []});

  final Map<String, dynamic>? monParrain;
  final List<Map<String, dynamic>> commeParrain;
  final List<Map<String, dynamic>> bureau;
  final List<Map<String, dynamic>> membres;
  ({String parrain, String filleul})? derniereDesignation;
  ({String id, String date})? dernierBapteme;

  @override
  Future<Map<String, dynamic>> fetchParrainages() async =>
      {'comme_parrain': commeParrain, 'mon_parrain': monParrain};

  @override
  Future<Map<String, dynamic>> fetchParrainagesBureau() async => {'parrainages': bureau};

  @override
  Future<List<Map<String, dynamic>>> fetchAdminMembres({bool inclureSansEtablissement = false, String? etablissementId, bool details = false}) async =>
      membres;

  @override
  Future<Map<String, dynamic>> designerParrainage(String parrainId, String filleulId) async {
    derniereDesignation = (parrain: parrainId, filleul: filleulId);
    return {'ok': true};
  }

  @override
  Future<Map<String, dynamic>> marquerBapteme(String id, String dateBapteme) async {
    dernierBapteme = (id: id, date: dateBapteme);
    return {'ok': true};
  }
}

void main() {
  group('dateParrainageCourte', () {
    test('21 nov. 2026, chaîne telle quelle sinon', () {
      expect(dateParrainageCourte('2026-11-21'), '21 nov. 2026');
      expect(dateParrainageCourte('pas-une-date'), 'pas-une-date');
    });
  });

  group('Parrainage.fromJson', () {
    test('en cours sans date de baptême', () {
      final p = Parrainage.fromJson({
        'id': 'p1', 'parrain_id': 'a', 'parrain_nom': 'MARIE DUPONT',
        'filleul_id': 'b', 'filleul_nom': 'JEAN KOUASSI',
        'date_debut': '2026-11-01', 'statut': 'en cours', 'date_bapteme': null,
      });
      expect(p.estBaptise, isFalse);
      expect(p.dateBapteme, isNull);
      expect(p.parrainNom, 'MARIE DUPONT');
    });

    test('baptisé avec sa date', () {
      final p = Parrainage.fromJson({
        'id': 'p1', 'parrain_id': 'a', 'parrain_nom': 'MARIE DUPONT',
        'filleul_id': 'b', 'filleul_nom': 'JEAN KOUASSI',
        'date_debut': '2026-11-01', 'statut': 'baptisé', 'date_bapteme': '2026-11-21',
      });
      expect(p.estBaptise, isTrue);
      expect(p.dateBapteme, '2026-11-21');
    });
  });

  group('parrainagesDepuisReponse', () {
    test('liste dans l’ordre renvoyé, vide sans clé', () {
      final liste = parrainagesDepuisReponse({
        'parrainages': [
          {'id': 'p1', 'parrain_id': 'a', 'filleul_id': 'b', 'date_debut': '2026-11-01', 'statut': 'en cours'},
        ],
      });
      expect(liste.length, 1);
      expect(parrainagesDepuisReponse({}), isEmpty);
    });
  });

  group('ParrainagePage', () {
    testWidgets('mon parrain et mes filleuls, sans rien inventer', (tester) async {
      final faux = _ClientFaux(
        monParrain: {
          'id': 'p1', 'parrain_id': 'a', 'parrain_nom': 'MARIE DUPONT',
          'filleul_id': 'moi', 'filleul_nom': 'MOI', 'date_debut': '2026-11-01',
          'statut': 'en cours', 'date_bapteme': null,
        },
        commeParrain: [
          {
            'id': 'p2', 'parrain_id': 'moi', 'parrain_nom': 'MOI',
            'filleul_id': 'c', 'filleul_nom': 'JEAN KOUASSI', 'date_debut': '2026-11-10',
            'statut': 'baptisé', 'date_bapteme': '2026-11-21',
          },
        ],
      );
      await tester.pumpWidget(MaterialApp(home: ParrainagePage(client: faux)));
      await tester.pumpAndSettle();
      expect(find.text('MARIE DUPONT'), findsOneWidget);
      expect(find.text('JEAN KOUASSI'), findsOneWidget);
      expect(find.textContaining('Baptisé le 21 nov. 2026'), findsOneWidget);
    });

    testWidgets('état vide, sans parrain ni filleul', (tester) async {
      await tester.pumpWidget(MaterialApp(home: ParrainagePage(client: _ClientFaux())));
      await tester.pumpAndSettle();
      expect(find.text('Aucun parrain pour le moment.'), findsOneWidget);
      expect(find.text('Aucun filleul pour le moment.'), findsOneWidget);
    });

    testWidgets('Bureau : désignation et tous les parrainages', (tester) async {
      final faux = _ClientFaux(
        bureau: [
          {
            'id': 'p1', 'parrain_id': 'a', 'parrain_nom': 'MARIE DUPONT',
            'filleul_id': 'b', 'filleul_nom': 'JEAN KOUASSI', 'date_debut': '2026-11-01',
            'statut': 'en cours', 'date_bapteme': null,
          },
        ],
        membres: [
          {'id': 'a', 'nom_complet': 'MARIE DUPONT', 'matricule': 'CP-MD-2526'},
          {'id': 'b', 'nom_complet': 'JEAN KOUASSI', 'matricule': 'CP-JK-2526'},
        ],
      );
      await tester.pumpWidget(MaterialApp(home: ParrainagePage(client: faux, estBureau: true)));
      await tester.pumpAndSettle();
      expect(find.text('Désigner un parrain'), findsOneWidget);
      expect(find.text('Tous les parrainages'), findsOneWidget);
      expect(find.text('Marquer le baptême'), findsOneWidget);
    });
  });
}
