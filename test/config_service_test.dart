// Configuration de version pilotée par le serveur, 16 nov. 2026.
// Décisions pures : comparaison de versions, repli sur le cache,
// déclenchement de l'écran de mise à jour obligatoire. Sans
// téléphone, sans serveur réel : l'API est simulée par un client
// HTTP en mémoire.
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/config_service.dart';

void main() {
  group('Comparaison de versions', () {
    test('le numéro de build est ignoré', () {
      expect(compareVersions('1.0.1+2', '1.0.1'), 0);
      expect(compareVersions('1.0.1+99', '1.0.1+2'), 0);
      expect(compareVersions('1.0.1', '1.0.1+2'), 0);
    });

    test('majeur, mineur et correctif sont comparés dans l ordre', () {
      expect(compareVersions('1.0.0', '1.0.1'), -1);
      expect(compareVersions('1.0.1', '1.0.0'), 1);
      expect(compareVersions('1.1.0', '1.0.9'), 1);
      expect(compareVersions('1.0.9', '1.1.0'), -1);
      expect(compareVersions('2.0.0', '1.9.9'), 1);
      expect(compareVersions('1.0.1', '1.0.1'), 0);
    });

    test('une partie absente vaut zéro', () {
      expect(compareVersions('1.0', '1.0.0'), 0);
      expect(compareVersions('1', '1.0.0'), 0);
      expect(compareVersions('1.0.1', '1.0'), 1);
    });

    test('une partie illisible vaut zéro, sans jamais planter', () {
      expect(compareVersions('abc', '1.0.1'), -1);
      expect(compareVersions('1.0.1', 'abc'), 1);
      expect(compareVersions('', '1.0.1'), -1);
      expect(compareVersions('1.x.1', '1.0.1'), 0);
    });
  });

  group('Version minimale requise', () {
    test('la version installée 1.0.1+2 n est pas bloquée par 1.0.1', () {
      expect(isUpdateRequired(installed: '1.0.1+2', min: '1.0.1'), isFalse);
    });

    test('une version minimale supérieure bloque', () {
      expect(isUpdateRequired(installed: '1.0.1+2', min: '1.0.2'), isTrue);
      expect(isUpdateRequired(installed: '1.0.1+2', min: '1.1.0'), isTrue);
      expect(isUpdateRequired(installed: '1.0.1+2', min: '2.0.0'), isTrue);
    });

    test('une version minimale inférieure ne bloque pas', () {
      expect(isUpdateRequired(installed: '1.0.1+2', min: '1.0.0'), isFalse);
      expect(isUpdateRequired(installed: '1.0.1+2', min: '0.9.9'), isFalse);
    });
  });

  group('Lecture de la configuration', () {
    test('les défauts ne bloquent jamais, min égale à la version installée', () {
      final def = VersionConfig.defaults();
      expect(def.configVersion, 1);
      expect(def.minAppVersion, '1.0.1');
      expect(def.updateUrl, 'https://www.connexionprophetique.com/');
      expect(isUpdateRequired(installed: '1.0.1+2', min: def.minAppVersion), isFalse);
    });

    test('un JSON complet est lu tel quel', () {
      final config = VersionConfig.fromJson({
        'configVersion': 2,
        'minAppVersion': '1.0.2',
        'updateUrl': 'https://www.connexionprophetique.com/',
      });
      expect(config.configVersion, 2);
      expect(config.minAppVersion, '1.0.2');
      expect(config.updateUrl, 'https://www.connexionprophetique.com/');
    });

    test('un champ absent ou mal formé retombe sur le défaut', () {
      final config = VersionConfig.fromJson({'minAppVersion': ''});
      expect(config.configVersion, 1);
      expect(config.minAppVersion, '1.0.1');
      expect(config.updateUrl, 'https://www.connexionprophetique.com/');
      final mauvais = VersionConfig.fromJson({
        'configVersion': 'deux',
        'minAppVersion': 12,
        'updateUrl': 42,
      });
      expect(mauvais.configVersion, 1);
      expect(mauvais.minAppVersion, '1.0.1');
      expect(mauvais.updateUrl, 'https://www.connexionprophetique.com/');
    });

    test('un JSON nul renvoie les défauts', () {
      expect(VersionConfig.fromJson(null), VersionConfig.defaults());
    });

    test('aller-retour JSON', () {
      final config = VersionConfig.fromJson({
        'configVersion': 3,
        'minAppVersion': '1.2.0',
        'updateUrl': 'https://www.connexionprophetique.com/',
      });
      expect(VersionConfig.fromJson(config.toJson()), config);
    });
  });

  group('Service, cache local', () {
    setUp(() {
      SharedPreferences.setMockInitialValues({});
    });

    test('sans cache, le service ne bloque pas', () async {
      final service = ConfigService();
      await service.load();
      expect(service.mustUpdate, isFalse);
      expect(service.current, VersionConfig.defaults());
    });

    test('un cache avec une version minimale supérieure bloque', () async {
      SharedPreferences.setMockInitialValues({
        'version_config_json': jsonEncode({
          'configVersion': 1,
          'minAppVersion': '1.0.2',
          'updateUrl': 'https://www.connexionprophetique.com/',
        }),
      });
      final service = ConfigService();
      await service.load();
      expect(service.mustUpdate, isTrue);
      expect(service.current.minAppVersion, '1.0.2');
    });

    test('apply garde la configuration et la persiste', () async {
      final service = ConfigService();
      var notifie = 0;
      service.addListener(() => notifie++);
      await service.apply({
        'configVersion': 1,
        'minAppVersion': '1.0.2',
        'updateUrl': 'https://www.connexionprophetique.com/',
      });
      expect(service.mustUpdate, isTrue);
      expect(notifie, 1);
      final relu = ConfigService();
      await relu.load();
      expect(relu.current.minAppVersion, '1.0.2');
      expect(relu.mustUpdate, isTrue);
    });

    test('apply vide ne change rien et ne notifie pas', () async {
      final service = ConfigService();
      var notifie = 0;
      service.addListener(() => notifie++);
      await service.apply({});
      expect(service.mustUpdate, isFalse);
      expect(notifie, 0);
    });

    test('apply identique ne notifie pas', () async {
      final service = ConfigService();
      var notifie = 0;
      service.addListener(() => notifie++);
      await service.apply(VersionConfig.defaults().toJson());
      expect(notifie, 0);
    });

    test('un cache illisible ne bloque pas', () async {
      SharedPreferences.setMockInitialValues({'version_config_json': 'pas du json'});
      final service = ConfigService();
      await service.load();
      expect(service.mustUpdate, isFalse);
    });
  });

  group('Lecture sur /api/config', () {
    test('le JSON du serveur est lu', () async {
      final api = ApiClient(
        client: MockClient((request) async {
          expect(request.url.path, '/api/config');
          return http.Response(
            jsonEncode({
              'configVersion': 1,
              'minAppVersion': '1.0.2',
              'updateUrl': 'https://www.connexionprophetique.com/',
            }),
            200,
          );
        }),
      );
      final data = await api.fetchVersionConfig();
      expect(data['minAppVersion'], '1.0.2');
      expect(data['updateUrl'], 'https://www.connexionprophetique.com/');
    });

    test('une erreur serveur renvoie un objet vide', () async {
      final api = ApiClient(
        client: MockClient((request) async => http.Response('erreur', 500)),
      );
      expect(await api.fetchVersionConfig(), isEmpty);
    });
  });

  group('Écran de mise à jour obligatoire', () {
    testWidgets('il affiche le titre, le message et un seul bouton', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: UpdateRequiredScreen(updateUrl: 'https://www.connexionprophetique.com/'),
        ),
      );
      expect(find.text('Mise à jour requise'), findsOneWidget);
      expect(
        find.text('Une nouvelle version de l’application est disponible. Mets à jour pour continuer.'),
        findsOneWidget,
      );
      expect(find.text('Mettre à jour'), findsOneWidget);
      expect(find.text('Plus tard'), findsNothing);
      expect(find.byIcon(Icons.arrow_back), findsNothing);
    });

    testWidgets('le bouton ne plante pas quand l ouverture échoue', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: UpdateRequiredScreen(updateUrl: 'https://www.connexionprophetique.com/'),
        ),
      );
      await tester.tap(find.text('Mettre à jour'));
      await tester.pump();
      expect(find.text('Mise à jour requise'), findsOneWidget);
    });
  });
}
