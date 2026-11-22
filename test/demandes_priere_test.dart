// Tests des demandes de prière avec suivi, 21 nov. 2026,
// tranches 1 à 3 de l'audit du 17 nov. : mes demandes et leur
// statut, onglet Bureau, état vide. Client simulé, sans
// serveur ni réseau.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/demandes_priere.dart';

class _ClientFaux extends ApiClient {
  _ClientFaux({this.demandes = const [], this.bureau = const []});

  final List<Map<String, dynamic>> demandes;
  final List<Map<String, dynamic>> bureau;

  @override
  Future<Map<String, dynamic>> fetchDemandesPriere() async => {'demandes': demandes};

  @override
  Future<Map<String, dynamic>> fetchDemandesPriereBureau() async => {'demandes': bureau};
}

void main() {
  group('demandesPriereDepuisReponse', () {
    test('statut et note de suivi', () {
      final demandes = demandesPriereDepuisReponse({
        'demandes': [
          {'id': 'd1', 'texte': 'Priez pour moi.', 'statut': 'en cours', 'note_suivi': 'Nous prions.', 'cree_le': '2026-11-21T08:00:00Z'},
        ],
      });
      expect(demandes.length, 1);
      expect(demandes[0].statut, 'en cours');
      expect(demandes[0].noteSuivi, 'Nous prions.');
      expect(demandesPriereDepuisReponse({}), isEmpty);
    });

    test('les trois statuts existent, dans l’ordre', () {
      expect(statutsDemandePriere, ['ouvert', 'en cours', 'exaucée']);
    });
  });

  testWidgets('état vide quand aucune demande', (tester) async {
    await tester.pumpWidget(MaterialApp(home: DemandesPrierePage(client: _ClientFaux())));
    await tester.pumpAndSettle();
    expect(find.text('Demandes de prière'), findsOneWidget);
    expect(find.textContaining('aucune demande de prière'), findsOneWidget);
  });

  testWidgets('une demande montre son texte, son statut et la note du Bureau', (tester) async {
    final client = _ClientFaux(demandes: [
      {'id': 'd1', 'texte': 'Priez pour moi.', 'statut': 'en cours', 'note_suivi': 'Nous prions.', 'cree_le': '2026-11-21T08:00:00Z'},
    ]);
    await tester.pumpWidget(MaterialApp(home: DemandesPrierePage(client: client)));
    await tester.pumpAndSettle();
    expect(find.text('Priez pour moi.'), findsOneWidget);
    expect(find.text('en cours'), findsOneWidget);
    expect(find.textContaining('Nous prions.'), findsOneWidget);
  });

  testWidgets('le Bureau voit un deuxième onglet avec toutes les demandes', (tester) async {
    final client = _ClientFaux(
      demandes: [],
      bureau: [
        {'id': 'd1', 'texte': 'Priez pour moi.', 'statut': 'ouvert', 'note_suivi': '', 'cree_le': '2026-11-21T08:00:00Z', 'prenom': 'Marie'},
      ],
    );
    await tester.pumpWidget(MaterialApp(home: DemandesPrierePage(client: client, estBureau: true)));
    await tester.pumpAndSettle();
    expect(find.text('Mes demandes'), findsOneWidget);
    expect(find.text('Toutes les demandes'), findsOneWidget);
    await tester.tap(find.text('Toutes les demandes'));
    await tester.pumpAndSettle();
    expect(find.text('Priez pour moi.'), findsOneWidget);
    expect(find.text('Marie'), findsOneWidget);
    expect(find.text('Changer le statut'), findsOneWidget);
  });
}
