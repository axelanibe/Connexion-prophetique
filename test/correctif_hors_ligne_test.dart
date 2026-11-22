// Correctif bandeau Hors ligne et synchronisation, 21 nov. 2026.
//
// La synchronisation ne pose plus le bandeau sur 401 ou 429, le
// serveur répond dans ces deux cas. Seuls l'échec de santé et les
// erreurs réseau ou délai posent 'erreur'. Les actualités, camps,
// cultes et établissements sont persistés en local et relus au
// démarrage. ApiException porte le code HTTP du serveur.
//
// Les appels passent par un client HTTP simulé, sans serveur :
// profil neuf, aucune session, santé OK puis échec ciblé sur
// /actualites. Le client partagé est remplacé pour chaque test,
// puis restauré.
import 'dart:convert';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/main.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:shared_preferences/shared_preferences.dart';

http.Response _ok(Object corps) => http.Response(
      jsonEncode(corps),
      200,
      headers: {'content-type': 'application/json'},
    );

http.Response _erreur(int code, String message) => http.Response(
      jsonEncode({'erreur': message}),
      code,
      headers: {'content-type': 'application/json'},
    );

/// Client simulé : santé OK, configurations vides, contenus selon
/// le scénario, listes vides sinon. Une seule route en échec,
/// choisie par le test, pour isoler le type d'erreur.
MockClient _clientSimule({int? codeActualites, bool reseauEnPanne = false}) {
  return MockClient((request) async {
    final chemin = request.url.path;
    if (chemin == '/sante') return _ok({'ok': true});
    if (chemin == '/config' ||
        chemin == '/config/design' ||
        chemin == '/api/config') {
      return _ok({});
    }
    if (chemin == '/etablissements') {
      return _ok([
        {'id': 'e-ispam', 'nom': 'ISPAM'},
        {'id': 'e-celeste', 'nom': 'Céleste'},
      ]);
    }
    if (chemin == '/actualites') {
      if (reseauEnPanne) throw http.ClientException('réseau');
      if (codeActualites != null) {
        return _erreur(codeActualites, 'Erreur $codeActualites.');
      }
      return _ok([
        {
          'id': 'n1',
          'titre': 'Veillée',
          'texte': 'Vendredi.',
          'etablissement_id': 'e-ispam',
          'publiee_le': '2026-11-21T10:00:00Z'
        },
      ]);
    }
    if (chemin == '/evenements') {
      return _ok([
        {
          'id': 'c1',
          'type': 'camp',
          'nom': 'Camp National Kairos',
          'date_debut': '2027-08-22',
          'date_fin': '2027-08-28',
          'lieu': 'Abidjan',
          'pays': "Côte d'Ivoire",
          'tarif_fcfa': 15000,
          'est_kairos': true,
          'description': 'Kairos.'
        },
        {
          'id': 'u1',
          'type': 'culte',
          'nom': 'Culte du dimanche',
          'date_debut': '2026-11-22',
          'heure_debut': '09:00:00',
          'lieu': 'Abidjan',
          'pays': "Côte d'Ivoire",
          'etablissement_id': 'e-celeste',
          'etablissement_nom': 'Céleste',
          'description': 'Culte.'
        },
      ]);
    }
    if (chemin == '/livres' ||
        chemin == '/enseignements' ||
        chemin == '/bureau' ||
        chemin == '/annonces-audio' ||
        chemin == '/cartes-video') {
      return _ok([]);
    }
    return _ok({});
  });
}

void main() {
  late ApiClient clientOrigine;

  setUp(() {
    SharedPreferences.setMockInitialValues({});
    clientOrigine = api;
  });

  tearDown(() {
    api = clientOrigine;
    app.member = null;
    app.serverStatus = 'local';
    app.news.clear();
    app.camps.clear();
    app.cultes.clear();
    app.etabs
      ..clear()
      ..addAll([
        Etab('ISPAM'),
        Etab('Céleste'),
        Etab('La Silhouette'),
        Etab('BNC'),
      ]);
  });

  test('ApiException porte le code HTTP : 429', () async {
    api = ApiClient(client: _clientSimule(codeActualites: 429));
    await expectLater(
      api.fetchActualites(),
      throwsA(isA<ApiException>().having((e) => e.status, 'status', 429)),
    );
  });

  test('ApiException porte le code HTTP : 401', () async {
    api = ApiClient(client: _clientSimule(codeActualites: 401));
    await expectLater(
      api.fetchActualites(),
      throwsA(isA<ApiException>().having((e) => e.status, 'status', 401)),
    );
  });

  testWidgets('synchro en 429 : pas de bandeau, statut gardé', (tester) async {
    api = ApiClient(client: _clientSimule(codeActualites: 429));
    final etat = AppState();
    await etat.syncFromServer();
    expect(etat.serverStatus, isNot('erreur'));
    expect(etat.news, isEmpty);
    expect(etat.etabs.length, 4);
  });

  testWidgets('synchro en 401 : pas de bandeau, statut gardé', (tester) async {
    api = ApiClient(client: _clientSimule(codeActualites: 401));
    final etat = AppState();
    await etat.syncFromServer();
    expect(etat.serverStatus, isNot('erreur'));
  });

  testWidgets('synchro en 500 : bandeau posé, comme avant', (tester) async {
    api = ApiClient(client: _clientSimule(codeActualites: 500));
    final etat = AppState();
    await etat.syncFromServer();
    expect(etat.serverStatus, 'erreur');
  });

  testWidgets('synchro sans réseau : bandeau posé', (tester) async {
    api = ApiClient(client: _clientSimule(reseauEnPanne: true));
    final etat = AppState();
    await etat.syncFromServer();
    expect(etat.serverStatus, 'erreur');
  });

  test('synchro réussie : contenus persistés et relus', () async {
    api = ApiClient(client: _clientSimule());
    app.serverStatus = 'local';
    app.news.clear();
    app.camps.clear();
    app.cultes.clear();
    await app.syncFromServer();
    expect(app.serverStatus, 'serveur');
    expect(app.news.length, 1);
    expect(app.etabs.length, 2);
    expect(app.cultes.length, 1);
    expect(
      app.camps.map((c) => c.name),
      contains('Camp National Kairos'),
    );
    // Relecture : on vide les listes, load() les restaure.
    app.news.clear();
    app.camps.clear();
    app.cultes.clear();
    app.etabs.clear();
    await app.load();
    expect(app.news.length, 1);
    expect(app.etabs.length, 2);
    expect(app.cultes.length, 1);
    expect(
      app.camps.map((c) => c.name),
      contains('Camp National Kairos'),
    );
  });
}
