// Tests du Carnet de Promesses, 21 nov. 2026, tranches 1 à
// 3 de l'audit du 17 nov. : lecture d'une référence, liste,
// état vide, suppression. Client simulé, sans serveur ni
// réseau. Aucun verset inventé : la lecture est testée sur
// des livres construits à la main, jamais sur un texte réel.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/bible.dart';
import 'package:connexion_prophetique/carnet_promesses.dart';

class _ClientFaux extends ApiClient {
  _ClientFaux({this.promesses = const []});

  final List<Map<String, dynamic>> promesses;
  String? derniereSupprimee;

  @override
  Future<Map<String, dynamic>> fetchPromesses() async => {'promesses': promesses};

  @override
  Future<Map<String, dynamic>> supprimerPromesse(String id) async {
    derniereSupprimee = id;
    return {'ok': true};
  }
}

void main() {
  // BibleService est un singleton : un futur terminé dans la
  // zone fictive d'un test ne se réveille pas dans celle du
  // test suivant, donc chaque test repart d'un chargement neuf.
  setUp(() => BibleService.instance.resetForTest());

  group('analyserReferenceVerset', () {
    final livres = [
      BibleBook('Jean', [
        List.filled(20, ''),
        List.filled(20, ''),
        List.filled(20, ''),
      ]),
      BibleBook('Genèse', [List.filled(20, '')]),
    ];
    // Chapitre 3, verset 16 de Jean, pour le test seulement.
    livres[0].chapters[2][15] = 'Texte de test.';

    test('Jean 3:16 se lit, livre, chapitre, verset', () {
      final lue = analyserReferenceVerset('Jean 3:16', livres);
      expect(lue, isNotNull);
      expect(lue!.livre, 0);
      expect(lue.chapitre, 3);
      expect(lue.verset, 16);
    });

    test('accents et casse ignorés, Genese 1:1 se lit', () {
      final lue = analyserReferenceVerset('genese 1:1', livres);
      expect(lue, isNotNull);
      expect(lue!.livre, 1);
    });

    test('référence illisible, livre absent, verset 0 : null', () {
      expect(analyserReferenceVerset('', livres), isNull);
      expect(analyserReferenceVerset('Psaume 23', livres), isNull);
      expect(analyserReferenceVerset('Psaume 23:1', livres), isNull);
      expect(analyserReferenceVerset('Jean 0:1', livres), isNull);
      expect(analyserReferenceVerset('Jean 3:0', livres), isNull);
    });
  });

  group('promessesDepuisReponse', () {
    test('référence, note et texte saisi', () {
      final promesses = promessesDepuisReponse({
        'promesses': [
          {'id': 'p1', 'reference': 'Jean 3:16', 'note': 'Pour ma famille', 'texte': '', 'cree_le': '2026-11-21T08:00:00Z'},
        ],
      });
      expect(promesses.length, 1);
      expect(promesses[0].reference, 'Jean 3:16');
      expect(promesses[0].note, 'Pour ma famille');
      expect(promessesDepuisReponse({}), isEmpty);
    });
  });

  testWidgets('état vide quand le carnet est vide', (tester) async {
    await tester.pumpWidget(MaterialApp(home: CarnetPromessesPage(client: _ClientFaux())));
    await tester.pumpAndSettle();
    expect(find.text('Carnet de Promesses'), findsOneWidget);
    expect(find.textContaining('Ton carnet est vide'), findsOneWidget);
  });

  testWidgets('une promesse montre sa référence et sa note', (tester) async {
    final client = _ClientFaux(promesses: [
      {'id': 'p1', 'reference': 'Jean 3:16', 'note': 'Pour ma famille', 'texte': '', 'cree_le': '2026-11-21T08:00:00Z'},
    ]);
    await tester.pumpWidget(MaterialApp(home: CarnetPromessesPage(client: client)));
    await tester.pumpAndSettle();
    expect(find.text('Jean 3:16'), findsOneWidget);
    expect(find.text('Pour ma famille'), findsOneWidget);
  });

  testWidgets('supprimer une promesse appelle le client', (tester) async {
    final client = _ClientFaux(promesses: [
      {'id': 'p1', 'reference': 'Jean 3:16', 'note': '', 'texte': '', 'cree_le': '2026-11-21T08:00:00Z'},
    ]);
    await tester.pumpWidget(MaterialApp(home: CarnetPromessesPage(client: client)));
    await tester.pumpAndSettle();
    await tester.tap(find.byIcon(Icons.delete_outlined));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Supprimer'));
    await tester.pumpAndSettle();
    expect(client.derniereSupprimee, 'p1');
  });
}
