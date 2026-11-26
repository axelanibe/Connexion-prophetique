// Tests de la page Mes enregistrements du mur, mur v2
// tranche 5, 25 nov. 2026 : liste par date
// d'enregistrement, état vide, retrait du marque-page qui
// fait disparaître la publication. Client simulé, sans
// serveur ni réseau.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/mur_enregistrements.dart';
import 'package:connexion_prophetique/tiroir_intelligent.dart';

class _FauxClientEnregistrements extends ApiClient {
  _FauxClientEnregistrements(this.publications);

  List<Map<String, dynamic>> publications;

  @override
  Future<Map<String, dynamic>> fetchEnregistrements({String? avant}) async {
    return {'publications': publications.where((p) => p['enregistre'] == true).toList(), 'suivante': null};
  }

  @override
  Future<Map<String, dynamic>> fetchPhotosAuteurs(List<String> ids) async => {'photos': []};

  @override
  Future<Map<String, dynamic>> fetchCommentaires(String cibleType, String cibleId) async =>
      {'commentaires': [], 'peut_moderer': false};

  @override
  Future<Map<String, dynamic>> supprimerPublicationMur(String id) async => {'ok': true};

  @override
  Future<Map<String, dynamic>> supprimerVideoMur(String id) async => {'ok': true};

  @override
  Future<Map<String, dynamic>> enregistrerPublication(String id) async {
    for (final p in publications) {
      if (p['id'] == id) p['enregistre'] = true;
    }
    return {'enregistre': true};
  }

  @override
  Future<Map<String, dynamic>> retirerEnregistrement(String id) async {
    for (final p in publications) {
      if (p['id'] == id) p['enregistre'] = false;
    }
    return {'enregistre': false};
  }
}

Map<String, dynamic> _publication({required String id, required String texte, bool enregistre = true}) => {
      'id': id,
      'auteur_id': 'm1',
      'auteur_nom': 'Marie K',
      'etablissement_nom': 'Céleste',
      'texte': texte,
      'photo': null,
      'categorie': 'temoignage',
      'statut_moderation': 'visible',
      'video': null,
      'nb_jaime': 1,
      'nb_amen': 0,
      'nb_priere': 0,
      'mon_type': null,
      'nb_commentaires': 0,
      'aime': false,
      'enregistre': enregistre,
      'est_auteur': false,
      'cree_le': '2026-11-24T10:00:00.000Z',
    };

void main() {
  group('MurEnregistrementsPage', () {
    late _FauxClientEnregistrements faux;

    setUp(() {
      SharedPreferences.setMockInitialValues({});
      app.member = Member('Test', 'CP-TT-2526', 'Céleste', DateTime(2026, 1, 1));
      app.lang = 'fr';
      TiroirContexte.instance.definirPourTests(aEnfants: true, aResultats: true);
      AideCompteurs.instance.reinitialiserPourTests();
      faux = _FauxClientEnregistrements([
        _publication(id: 'p1', texte: 'Courage à tous'),
        _publication(id: 'p2', texte: 'Deuxième mot', enregistre: false),
      ]);
      api = faux;
    });

    tearDown(() {
      app.member = null;
      AideCompteurs.instance.reinitialiserPourTests();
      api = ApiClient();
    });

    Future<void> _pomper(WidgetTester tester) async {
      tester.view.physicalSize = const Size(800, 1600);
      await tester.pumpWidget(MaterialApp(home: MurEnregistrementsPage(client: faux)));
      await tester.pumpAndSettle();
    }

    testWidgets('la liste montre les publications enregistrées', (tester) async {
      await _pomper(tester);
      expect(find.text('Courage à tous'), findsOneWidget);
      expect(find.text('Deuxième mot'), findsNothing);
      expect(find.byIcon(Icons.bookmark), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('retirer le marque-page fait disparaître la publication', (tester) async {
      await _pomper(tester);
      await tester.tap(find.byTooltip('Retirer des enregistrements'));
      await tester.pumpAndSettle();
      expect(find.text('Courage à tous'), findsNothing);
      expect(find.text('Aucun enregistrement pour le moment.'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('la liste vide montre l’état vide', (tester) async {
      faux.publications = [];
      await _pomper(tester);
      expect(find.text('Aucun enregistrement pour le moment.'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  });
}
