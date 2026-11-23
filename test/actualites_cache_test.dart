// Actualités en cache, carte 160, 23 nov. 2026 : lecture
// conditionnelle avec ETag sur /actualites et /api/config.
// Sans serveur réel : l'API est simulée par un client HTTP en
// mémoire, et le stockage local par SharedPreferences en mémoire.
import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/api.dart';

const _liste = [
  {'id': '1', 'titre': 'Première', 'texte': 'Bonjour', 'publiee_le': '2026-11-23T08:00:00Z'},
  {'id': '2', 'titre': 'Deuxième', 'texte': 'Shalom', 'publiee_le': '2026-11-22T08:00:00Z'},
];

void main() {
  group('fetchActualites avec ETag', () {
    test('un 200 stocke la liste et l ETag', () async {
      SharedPreferences.setMockInitialValues({});
      final api = ApiClient(
        client: MockClient((request) async {
          expect(request.url.path, '/actualites');
          expect(request.headers.containsKey('If-None-Match'), isFalse);
          return http.Response(jsonEncode(_liste), 200, headers: {'ETag': '"v1"'});
        }),
      );
      final liste = await api.fetchActualites();
      expect(liste.length, 2);
      expect(liste.first['titre'], 'Première');
      final prefs = await SharedPreferences.getInstance();
      expect(prefs.getString('actualites_etag'), '"v1"');
      expect(jsonDecode(prefs.getString('actualites_cache_json')!) as List, hasLength(2));
    });

    test('un 304 renvoie la liste gardée en local', () async {
      SharedPreferences.setMockInitialValues({
        'actualites_etag': '"v1"',
        'actualites_cache_json': jsonEncode(_liste),
      });
      String? recu;
      final api = ApiClient(
        client: MockClient((request) async {
          recu = request.headers['If-None-Match'];
          return http.Response('', 304);
        }),
      );
      final liste = await api.fetchActualites();
      expect(recu, '"v1"');
      expect(liste.length, 2);
      expect(liste.first['titre'], 'Première');
    });

    test('une erreur serveur renvoie la liste gardée en local', () async {
      SharedPreferences.setMockInitialValues({
        'actualites_etag': '"v1"',
        'actualites_cache_json': jsonEncode(_liste),
      });
      final api = ApiClient(
        client: MockClient((request) async => http.Response('erreur', 500)),
      );
      final liste = await api.fetchActualites();
      expect(liste.length, 2);
    });

    test('une erreur serveur sans copie locale remonte', () async {
      SharedPreferences.setMockInitialValues({});
      final api = ApiClient(
        client: MockClient((request) async => http.Response('erreur', 500)),
      );
      expect(() => api.fetchActualites(), throwsA(isA<ApiException>()));
    });

    test('une 401 remonte toujours, même avec une copie locale', () async {
      SharedPreferences.setMockInitialValues({
        'actualites_etag': '"v1"',
        'actualites_cache_json': jsonEncode(_liste),
      });
      final api = ApiClient(
        client: MockClient((request) async => http.Response('{"erreur":"Session expirée."}', 401)),
      );
      expect(() => api.fetchActualites(), throwsA(isA<ApiException>()));
    });
  });

  group('fetchVersionConfig avec ETag', () {
    test('un 304 renvoie un objet vide, la configuration locale est gardée', () async {
      SharedPreferences.setMockInitialValues({'version_config_etag': '"v9"'});
      String? recu;
      final api = ApiClient(
        client: MockClient((request) async {
          expect(request.url.path, '/api/config');
          recu = request.headers['If-None-Match'];
          return http.Response('', 304);
        }),
      );
      expect(await api.fetchVersionConfig(), isEmpty);
      expect(recu, '"v9"');
    });

    test('un 200 stocke le nouvel ETag', () async {
      SharedPreferences.setMockInitialValues({});
      final api = ApiClient(
        client: MockClient((request) async {
          return http.Response(
            jsonEncode({'configVersion': 1, 'minAppVersion': '1.0.2', 'updateUrl': 'https://www.connexionprophetique.com/'}),
            200,
            headers: {'ETag': '"v10"'},
          );
        }),
      );
      final data = await api.fetchVersionConfig();
      expect(data['minAppVersion'], '1.0.2');
      final prefs = await SharedPreferences.getInstance();
      expect(prefs.getString('version_config_etag'), '"v10"');
    });
  });
}
