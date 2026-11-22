// Carte 116, 9 nov. 2026, puis C-2, 22 nov. 2026 : la session ne
// doit pas survivre à une désinstallation, et les secrets vivent
// dans le coffre du système, plus en clair. Ces tests vérifient le
// coffre chiffré, la migration des anciennes clés et le nettoyage
// à la première ouverture après une installation, sans téléphone
// réel : le canal natif et le canal du coffre sont simulés, les
// préférences partagées sont simulées.
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/stockage_auth.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  const canal = MethodChannel('connexionprophetique/app');
  const canalCoffre = MethodChannel(
    'plugins.it_nomads.com/flutter_secure_storage',
  );
  late Map<String, String> magasinNatif;
  late Map<String, String> coffre;
  late bool marqueurExiste;
  late List<String> appels;

  setUp(() {
    magasinNatif = {};
    coffre = {};
    marqueurExiste = false;
    appels = [];
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
        .setMockMethodCallHandler(canal, (MethodCall appel) async {
      appels.add(appel.method);
      switch (appel.method) {
        case 'authLire':
          return magasinNatif[appel.arguments['cle'] as String];
        case 'authEcrire':
          magasinNatif[appel.arguments['cle'] as String] =
              appel.arguments['valeur'] as String;
          return null;
        case 'authEffacer':
          magasinNatif.remove(appel.arguments['cle'] as String);
          return null;
        case 'premierLancement':
          if (marqueurExiste) return false;
          marqueurExiste = true;
          return true;
        default:
          return null;
      }
    });
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
        .setMockMethodCallHandler(canalCoffre, (MethodCall appel) async {
      final args = appel.arguments as Map?;
      switch (appel.method) {
        case 'read':
          return coffre[args?['key'] as String?];
        case 'write':
          coffre[args?['key'] as String] = args?['value'] as String;
          return null;
        case 'delete':
          coffre.remove(args?['key'] as String);
          return null;
        case 'containsKey':
          return coffre.containsKey(args?['key'] as String?);
        default:
          return null;
      }
    });
  });

  tearDown(() {
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
        .setMockMethodCallHandler(canal, null);
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
        .setMockMethodCallHandler(canalCoffre, null);
    debugDefaultTargetPlatformOverride = null;
  });

  group('C-2, coffre chiffré sur Android', () {
    setUp(() {
      debugDefaultTargetPlatformOverride = TargetPlatform.android;
    });

    test('lire et ecrire passent par le coffre, pas par les préférences partagées', () async {
      SharedPreferences.setMockInitialValues(
          {'api_access_token': 'ancien-jeton-partage'});
      await StockageAuth.ecrire('api_access_token', 'jeton-coffre');
      expect(coffre['api_access_token'], 'jeton-coffre');
      expect(magasinNatif.containsKey('api_access_token'), isFalse);
      final prefs = await SharedPreferences.getInstance();
      expect(prefs.getString('api_access_token'), 'ancien-jeton-partage');
      expect(await StockageAuth.lire('api_access_token'), 'jeton-coffre');
    });

    test('migration depuis le canal natif, puis effacement de l’ancien', () async {
      magasinNatif['api_refresh_token'] = 'jeton-natif';
      expect(await StockageAuth.lire('api_refresh_token'), 'jeton-natif');
      expect(coffre['api_refresh_token'], 'jeton-natif');
      expect(magasinNatif.containsKey('api_refresh_token'), isFalse);
      expect(await StockageAuth.lire('api_refresh_token'), 'jeton-natif');
    });

    test('migration depuis les préférences partagées, puis effacement', () async {
      SharedPreferences.setMockInitialValues(
          {'api_access_token': 'jeton-partage'});
      expect(await StockageAuth.lire('api_access_token'), 'jeton-partage');
      expect(coffre['api_access_token'], 'jeton-partage');
      final prefs = await SharedPreferences.getInstance();
      expect(prefs.containsKey('api_access_token'), isFalse);
    });

    test('effacer retire du coffre et des anciens emplacements', () async {
      coffre['api_refresh_token'] = 'jeton-coffre';
      magasinNatif['api_refresh_token'] = 'jeton-natif';
      SharedPreferences.setMockInitialValues(
          {'api_refresh_token': 'jeton-partage'});
      await StockageAuth.effacer('api_refresh_token');
      expect(coffre.containsKey('api_refresh_token'), isFalse);
      expect(magasinNatif.containsKey('api_refresh_token'), isFalse);
      final prefs = await SharedPreferences.getInstance();
      expect(prefs.containsKey('api_refresh_token'), isFalse);
    });

    test('premierLancement est vrai une seule fois', () async {
      expect(await StockageAuth.premierLancement(), isTrue);
      expect(await StockageAuth.premierLancement(), isFalse);
      expect(await StockageAuth.premierLancement(), isFalse);
    });
  });

  group('Carte 116, nettoyage à la première ouverture', () {
    setUp(() {
      debugDefaultTargetPlatformOverride = TargetPlatform.android;
    });

    test('premier lancement : session, profil et drapeaux effacés, journal gardé', () async {
      SharedPreferences.setMockInitialValues({
        'api_access_token': 'jeton-restaure',
        'api_refresh_token': 'jeton-restaure',
        'member': '{"name":"Test","mat":"CP-AA-2526"}',
        'paidCards': ['CP-AA-2526'],
        'pays_residence': "Côte d'Ivoire",
        'presentation_apres_inscription_vue': true,
        'presentation_premiere_installation_vue': true,
        'permissions_bienvenue_vues': true,
        'ouverture_vue': true,
        'journal_spirituel_v2': '{"reves":[]}',
      });
      await effacerSessionRestaureeSiPremierLancement();
      final prefs = await SharedPreferences.getInstance();
      expect(prefs.containsKey('api_access_token'), isFalse);
      expect(prefs.containsKey('api_refresh_token'), isFalse);
      expect(prefs.containsKey('member'), isFalse);
      expect(prefs.containsKey('paidCards'), isFalse);
      expect(prefs.containsKey('pays_residence'), isFalse);
      expect(prefs.containsKey('presentation_apres_inscription_vue'), isFalse);
      expect(prefs.containsKey('presentation_premiere_installation_vue'), isFalse);
      expect(prefs.containsKey('permissions_bienvenue_vues'), isFalse);
      expect(prefs.containsKey('ouverture_vue'), isFalse);
      expect(prefs.getString('journal_spirituel_v2'), '{"reves":[]}');
      expect(appels, contains('premierLancement'));
    });

    test('ouverture normale : rien n’est effacé, la session reste', () async {
      marqueurExiste = true;
      SharedPreferences.setMockInitialValues({
        'api_access_token': 'jeton-garde',
        'member': '{"name":"Test","mat":"CP-AA-2526"}',
        'ouverture_vue': true,
      });
      await effacerSessionRestaureeSiPremierLancement();
      final prefs = await SharedPreferences.getInstance();
      expect(prefs.getString('api_access_token'), 'jeton-garde');
      expect(prefs.getString('member'), '{"name":"Test","mat":"CP-AA-2526"}');
      expect(prefs.getBool('ouverture_vue'), isTrue);
    });
  });

  group('C-2, coffre hors Android', () {
    // Dans flutter test, la plateforme par défaut est Android : on
    // force Linux ici. Les secrets passent par le coffre partout,
    // il n'y a plus de repli vers les préférences partagées.
    setUp(() {
      debugDefaultTargetPlatformOverride = TargetPlatform.linux;
    });

    test('sans canal natif, les secrets passent par le coffre', () async {
      SharedPreferences.setMockInitialValues({});
      await StockageAuth.ecrire('api_access_token', 'jeton-coffre');
      expect(coffre['api_access_token'], 'jeton-coffre');
      expect(await StockageAuth.lire('api_access_token'), 'jeton-coffre');
      await StockageAuth.effacer('api_access_token');
      expect(await StockageAuth.lire('api_access_token'), isNull);
      expect(await StockageAuth.premierLancement(), isFalse);
    });
  });
}
