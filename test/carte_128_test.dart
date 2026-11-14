// Tests de la carte 128, 11 nov. 2026 : lier un enfant par nom ou
// par matricule. Aide pure et vérifications statiques du code de
// la page, sans serveur.
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/app_models.dart';

void main() {
  group('Carte 128, sous-titre d’un résultat de recherche', () {
    test('matricule et établissement', () {
      expect(
        enfantRechercheSousTitre({'matricule': 'CP-AA-2526', 'etablissement': 'Céleste'}),
        'CP-AA-2526 · Céleste',
      );
    });

    test('matricule seul, sans établissement', () {
      expect(enfantRechercheSousTitre({'matricule': 'CP-AA-2526'}), 'CP-AA-2526');
      expect(
        enfantRechercheSousTitre({'matricule': 'CP-AA-2526', 'etablissement': ''}),
        'CP-AA-2526',
      );
    });

    test('établissement seul, sans matricule', () {
      expect(enfantRechercheSousTitre({'etablissement': 'Céleste'}), 'Céleste');
    });

    test('ni matricule ni établissement', () {
      expect(enfantRechercheSousTitre({}), '');
    });
  });

  group('Carte 128, page Mes enfants', () {
    late String page;
    late String api;

    setUpAll(() {
      page = File('lib/differe_membre.dart').readAsStringSync();
      api = File('lib/api.dart').readAsStringSync();
    });

    test('le champ accepte le nom ou le matricule', () {
      expect(page, contains("labelText: tr('Nom ou matricule')"));
      expect(page, contains("tr('Saisissez son nom ou le matricule de sa carte de membre, vérifiez, puis envoyez la demande.')"));
      expect(page, contains('chercherMembresParNomOuMatricule'));
      expect(api, contains("'/moi/membres/recherche?q="));
    });

    test('plusieurs résultats en liste pour choisir, matricule et établissement visibles', () {
      expect(page, contains("tr('Plusieurs enfants portent ce nom. Choisissez le vôtre.')"));
      expect(page, contains('subtitle: Text(enfantRechercheSousTitre(r)'));
      expect(page, contains('_trouves = trouves;'));
    });

    test('un seul résultat s’affiche directement, avec son établissement', () {
      expect(page, contains('_trouve = trouves.first;'));
      expect(page, contains('Text(enfantRechercheSousTitre(_trouve!)'));
    });

    test('aucun résultat avertit, sans casser le parcours', () {
      expect(page, contains("tr('Aucun enfant trouvé pour cette recherche.')"));
      expect(page, contains('api.demanderLienParentEnfant(id)'));
      expect(page, contains("tr('Demande envoyée. Un responsable doit la valider.')"));
    });

    test('l’ancienne recherche par matricule seul n’est plus appelée', () {
      expect(page, isNot(contains('chercherMembreParMatricule')));
      expect(api, isNot(contains('chercherMembreParMatricule')));
    });
  });
}
