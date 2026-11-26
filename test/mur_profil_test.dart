// Tests du profil d'un membre du mur, mur v2 tranche 4,
// 25 nov. 2026 : en-tête, compteurs, bouton Suivre, onglets
// Publications et À propos, listes d'abonnés et
// d'abonnements. Client simulé, sans serveur ni réseau.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/mur_profil.dart';
import 'package:connexion_prophetique/tiroir_intelligent.dart';

class _FauxClientProfil extends ApiClient {
  _FauxClientProfil({required this.profil, required this.publications, this.abonnes = const [], this.abonnements = const []});

  Map<String, dynamic> profil;
  List<Map<String, dynamic>> publications;
  List<Map<String, dynamic>> abonnes;
  List<Map<String, dynamic>> abonnements;
  final suivis = <String>{};
  String? dernierAvant;

  @override
  Future<Map<String, dynamic>> fetchProfilMur(String membreId, {String? avant}) async {
    dernierAvant = avant;
    return {'membre': profil, 'publications': publications, 'suivante': null};
  }

  @override
  Future<Map<String, dynamic>> fetchAbonnes(String membreId) async => {'membres': abonnes};

  @override
  Future<Map<String, dynamic>> fetchAbonnements(String membreId) async => {'membres': abonnements};

  @override
  Future<Map<String, dynamic>> suivreMembre(String membreId) async {
    suivis.add(membreId);
    return {'suivi': true};
  }

  @override
  Future<Map<String, dynamic>> nePlusSuivre(String membreId) async {
    suivis.remove(membreId);
    return {'suivi': false};
  }

  @override
  Future<Map<String, dynamic>> fetchCommentaires(String cibleType, String cibleId) async =>
      {'commentaires': [], 'peut_moderer': false};

  @override
  Future<Map<String, dynamic>> supprimerPublicationMur(String id) async => {'ok': true};

  @override
  Future<Map<String, dynamic>> supprimerVideoMur(String id) async => {'ok': true};
}

Map<String, dynamic> _profil({bool suiviParMoi = false, bool estMoi = false}) => {
      'id': 'm1',
      'nom_complet': 'Marie K',
      'fonction': 'Chantre',
      'etablissement_nom': 'Céleste',
      'photo': null,
      'presentation': 'Membre depuis 2025.',
      'inscrit_le': '2025-03-02T10:00:00.000Z',
      'nb_publications': 2,
      'nb_reactions': 5,
      'nb_abonnes': 3,
      'nb_abonnements': 1,
      'suivi_par_moi': suiviParMoi,
      'est_moi': estMoi,
    };

Map<String, dynamic> _publication({required String id, required String texte}) => {
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
      'enregistre': false,
      'est_auteur': false,
      'cree_le': '2026-11-24T10:00:00.000Z',
    };

void main() {
  group('ProfilMur.fromJson', () {
    test('tous les champs, nombres en texte', () {
      final p = ProfilMur.fromJson(_profil(suiviParMoi: true));
      expect(p.id, 'm1');
      expect(p.nomComplet, 'Marie K');
      expect(p.fonction, 'Chantre');
      expect(p.etablissementNom, 'Céleste');
      expect(p.presentation, 'Membre depuis 2025.');
      expect(p.inscritLe, DateTime.utc(2025, 3, 2, 10));
      expect(p.nbPublications, 2);
      expect(p.nbReactions, 5);
      expect(p.nbAbonnes, 3);
      expect(p.nbAbonnements, 1);
      expect(p.suiviParMoi, isTrue);
      expect(p.estMoi, isFalse);
    });

    test('valeurs absentes, zéros et faux', () {
      final p = ProfilMur.fromJson({'id': 'm9'});
      expect(p.nomComplet, '');
      expect(p.fonction, '');
      expect(p.photo, isNull);
      expect(p.presentation, '');
      expect(p.inscritLe, isNull);
      expect(p.nbPublications, 0);
      expect(p.suiviParMoi, isFalse);
      expect(p.estMoi, isFalse);
    });

    test('avecSuivi ajuste le compteur des abonnés', () {
      final p = ProfilMur.fromJson(_profil());
      expect(p.avecSuivi(true).nbAbonnes, 4);
      expect(p.avecSuivi(true).suiviParMoi, isTrue);
      expect(p.avecSuivi(false).nbAbonnes, 2);
    });
  });

  group('fonctionAfficheeProfil', () {
    test('vide ou Aucun montre Membre', () {
      expect(fonctionAfficheeProfil(''), 'Membre');
      expect(fonctionAfficheeProfil('aucun'), 'Membre');
      expect(fonctionAfficheeProfil('Aucun'), 'Membre');
      expect(fonctionAfficheeProfil('Chantre'), 'Chantre');
    });
  });

  group('MurProfilPage', () {
    late _FauxClientProfil faux;

    setUp(() {
      SharedPreferences.setMockInitialValues({});
      app.member = Member('Test', 'CP-TT-2526', 'Céleste', DateTime(2026, 1, 1));
      app.lang = 'fr';
      TiroirContexte.instance.definirPourTests(aEnfants: true, aResultats: true);
      AideCompteurs.instance.reinitialiserPourTests();
      faux = _FauxClientProfil(
        profil: _profil(),
        publications: [
          _publication(id: 'p1', texte: 'Courage à tous'),
          _publication(id: 'p2', texte: 'Deuxième mot'),
        ],
        abonnes: [
          {'id': 'm2', 'nom_complet': 'Grace L', 'etablissement_nom': 'ISPAM'},
        ],
        abonnements: [
          {'id': 'm3', 'nom_complet': 'Paul D', 'etablissement_nom': 'Céleste'},
        ],
      );
      api = faux;
    });

    tearDown(() {
      app.member = null;
      AideCompteurs.instance.reinitialiserPourTests();
      api = ApiClient();
    });

    Future<void> _pomper(WidgetTester tester) async {
      tester.view.physicalSize = const Size(800, 1600);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.reset);
      await tester.pumpWidget(MaterialApp(home: MurProfilPage(membreId: 'm1', client: faux)));
      await tester.pumpAndSettle();
    }

    testWidgets('profil : en-tête, compteurs et bouton Suivre', (tester) async {
      await _pomper(tester);
      expect(find.text('Chantre · Céleste'), findsOneWidget);
      expect(find.text('Membre depuis 2025.'), findsOneWidget);
      // « Publications » est à la fois le compteur et l'onglet.
      expect(find.text('Publications'), findsNWidgets(2));
      expect(find.text('Réactions'), findsOneWidget);
      expect(find.text('Abonnés'), findsOneWidget);
      expect(find.text('Abonnements'), findsOneWidget);
      expect(find.text('Suivre'), findsOneWidget);
      expect(find.text('Courage à tous'), findsOneWidget);
      expect(find.text('Deuxième mot'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('Suivre : un toucher suit, le compteur monte, puis ne suit plus', (tester) async {
      await _pomper(tester);
      await tester.tap(find.text('Suivre'));
      await tester.pumpAndSettle();
      expect(find.text('Suivi'), findsOneWidget);
      expect(faux.suivis, contains('m1'));
      await tester.tap(find.text('Suivi'));
      await tester.pumpAndSettle();
      expect(find.text('Suivre'), findsOneWidget);
      expect(faux.suivis, isNot(contains('m1')));
      expect(tester.takeException(), isNull);
    });

    testWidgets('onglet À propos : présentation, établissement, fonction, membre depuis', (tester) async {
      await _pomper(tester);
      await tester.tap(find.text('À propos'));
      await tester.pumpAndSettle();
      expect(find.text('Membre depuis'), findsOneWidget);
      expect(find.text('02/03/2025'), findsOneWidget);
      expect(find.text('Chantre'), findsOneWidget);
      expect(find.text('Céleste'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('compteur Abonnés : un toucher ouvre la liste', (tester) async {
      await _pomper(tester);
      await tester.tap(find.text('Abonnés'));
      await tester.pumpAndSettle();
      expect(find.text('Grace L'), findsOneWidget);
      expect(find.text('ISPAM'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('mon profil : pas de bouton Suivre', (tester) async {
      faux.profil = _profil(estMoi: true);
      await _pomper(tester);
      expect(find.text('Suivre'), findsNothing);
      expect(find.text('Suivi'), findsNothing);
      expect(tester.takeException(), isNull);
    });

    testWidgets('profil : erreur de chargement, message clair', (tester) async {
      await tester.pumpWidget(MaterialApp(home: MurProfilPage(membreId: 'm1', client: _ClientErreurProfil())));
      await tester.pumpAndSettle();
      expect(find.text('Impossible de charger ce profil.'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  });
}

class _ClientErreurProfil extends ApiClient {
  @override
  Future<Map<String, dynamic>> fetchProfilMur(String membreId, {String? avant}) async {
    throw Exception('panne');
  }
}
