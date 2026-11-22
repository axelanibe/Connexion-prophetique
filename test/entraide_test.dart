// Tests de l'entraide entre membres, 21 nov. 2026, tranche
// 7 de l'audit du 17 nov. : offres et demandes, statut,
// marquage résolu par l'auteur, contact de l'auteur par la
// messagerie. Client simulé, sans serveur ni réseau.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/entraide.dart';

class _ClientFaux extends ApiClient {
  _ClientFaux({this.items = const []});

  final List<Map<String, dynamic>> items;
  String? dernierStatutId;
  String? dernierStatut;

  @override
  Future<Map<String, dynamic>> fetchEntraide({String? type}) async {
    final lignes = type == null ? items : items.where((x) => x['type'] == type).toList();
    return {'entraide': lignes};
  }

  @override
  Future<Map<String, dynamic>> modifierStatutEntraide(String id, String statut) async {
    dernierStatutId = id;
    dernierStatut = statut;
    return {'entraide': {'id': id, 'statut': statut}};
  }
}

const _offre = {
  'id': 'o1',
  'type': 'offre',
  'categorie': 'Transport',
  'titre': 'Covoiturage pour le culte',
  'description': 'Deux places.',
  'statut': 'ouverte',
  'auteur_id': 'a1',
  'auteur_nom': 'Jean',
  'est_auteur': false,
  'cree_le': '2026-11-21T10:00:00Z',
};

const _demande = {
  'id': 'd1',
  'type': 'demande',
  'categorie': 'Cours',
  'titre': 'Aide en mathématiques',
  'description': '',
  'statut': 'ouverte',
  'auteur_id': 'a2',
  'auteur_nom': 'Marie',
  'est_auteur': true,
  'cree_le': '2026-11-21T11:00:00Z',
};

void main() {
  group('EntraideItem.fromJson', () {
    test('offre et demande, auteur et statut', () {
      final offre = EntraideItem.fromJson(_offre);
      expect(offre.estOffre, isTrue);
      expect(offre.estResolue, isFalse);
      expect(offre.auteurNom, 'Jean');
      expect(offre.estAuteur, isFalse);
      final demande = EntraideItem.fromJson(_demande);
      expect(demande.estOffre, isFalse);
      expect(demande.estAuteur, isTrue);
    });
  });

  group('entraideDepuisReponse', () {
    test('liste dans l’ordre, état vide sans liste', () {
      final items = entraideDepuisReponse({'entraide': [_offre, _demande]});
      expect(items.length, 2);
      expect(items.first.id, 'o1');
      expect(entraideDepuisReponse({}), isEmpty);
    });
  });

  group('libelleStatutEntraide', () {
    test('ouverte, en cours, résolue', () {
      expect(libelleStatutEntraide('ouverte'), 'Ouverte');
      expect(libelleStatutEntraide('en cours'), 'En cours');
      expect(libelleStatutEntraide('résolue'), 'Résolue');
      expect(libelleStatutEntraide('autre'), 'Ouverte');
    });
  });

  group('EntraidePage', () {
    testWidgets('deux onglets, offre puis demande', (tester) async {
      final client = _ClientFaux(items: [_offre, _demande]);
      await tester.pumpWidget(MaterialApp(home: EntraidePage(client: client)));
      await tester.pumpAndSettle();
      expect(find.text('Covoiturage pour le culte'), findsOneWidget);
      expect(find.text('Aide en mathématiques'), findsNothing);
      await tester.tap(find.text('Demandes'));
      await tester.pumpAndSettle();
      expect(find.text('Aide en mathématiques'), findsOneWidget);
    });

    testWidgets('l’auteur marque sa publication résolue', (tester) async {
      final client = _ClientFaux(items: [_offre, _demande]);
      await tester.pumpWidget(MaterialApp(home: EntraidePage(client: client)));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Demandes'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Marquer résolue'));
      await tester.pumpAndSettle();
      expect(client.dernierStatutId, 'd1');
      expect(client.dernierStatut, 'résolue');
    });

    testWidgets('contacter l’auteur appelle l’action fournie', (tester) async {
      final client = _ClientFaux(items: [_offre, _demande]);
      String? contacte;
      await tester.pumpWidget(MaterialApp(
        home: EntraidePage(
          client: client,
          onContacter: (context, auteurId) async {
            contacte = auteurId;
          },
        ),
      ));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Contacter l’auteur'));
      await tester.pumpAndSettle();
      expect(contacte, 'a1');
    });

    testWidgets('état vide sans publication', (tester) async {
      final client = _ClientFaux(items: const []);
      await tester.pumpWidget(MaterialApp(home: EntraidePage(client: client)));
      await tester.pumpAndSettle();
      expect(find.text('Aucune offre d’entraide pour le moment. Publie la première.'), findsOneWidget);
    });
  });
}
