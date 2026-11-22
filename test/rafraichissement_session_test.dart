// Tests du renouvellement de session, 21 nov. 2026.
//
// On vérifie le comportement du client après un 401 sur un appel
// authentifié : file unique, 429 avec attente puis abandon sans
// déconnexion, 500 qui réessaie puis échoue sans déconnecter,
// 401 définitif qui déconnecte aussitôt. Sans serveur réel :
// l'API est simulée par un client HTTP en mémoire.
import 'dart:convert';

import 'package:connexion_prophetique/api.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:shared_preferences/shared_preferences.dart';

// C-2, 22 nov. 2026 : les jetons passent par le coffre chiffré,
// le canal doit être simulé en test, comme dans
// securite_correctifs_test.dart.
final _coffre = <String, String>{};
const _canalCoffre =
    MethodChannel('plugins.it_nomads.com/flutter_secure_storage');

void _simulerCoffre() {
  TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
      .setMockMethodCallHandler(_canalCoffre, (MethodCall appel) async {
    final args = appel.arguments as Map?;
    final cle = args?['key'] as String?;
    if (appel.method == 'write' && cle != null) {
      _coffre[cle] = args?['value'] as String? ?? '';
      return null;
    }
    if (appel.method == 'read' && cle != null) return _coffre[cle];
    if (appel.method == 'delete' && cle != null) {
      _coffre.remove(cle);
      return null;
    }
    if (appel.method == 'deleteAll') {
      _coffre.clear();
      return null;
    }
    return null;
  });
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  _simulerCoffre();

  final refreshInitial = 'a' * 64;
  final refreshNouveau = 'b' * 64;

  late ApiClient client;
  late int appelsRafraichir;
  late int statutRafraichir;
  late bool expiree;

  setUp(() {
    _coffre.clear();
    SharedPreferences.setMockInitialValues({});
    appelsRafraichir = 0;
    statutRafraichir = 200;
    expiree = false;
    final mock = MockClient((http.Request request) async {
      if (request.url.path == '/auth/connexion') {
        return http.Response(
            jsonEncode({'access': 'acces', 'refresh': refreshInitial}), 200);
      }
      if (request.url.path == '/auth/rafraichir') {
        appelsRafraichir++;
        // Petit délai, pour que les appels simultanés se croisent.
        await Future.delayed(const Duration(milliseconds: 50));
        if (statutRafraichir == 200) {
          return http.Response(
              jsonEncode(
                  {'access': 'nouvel-acces', 'refresh': refreshNouveau}),
              200);
        }
        if (statutRafraichir == 429) {
          return http.Response('{"erreur":"Rate limit exceeded"}', 429,
              headers: {'retry-after': '0'});
        }
        return http.Response('{"erreur":"refusé"}', statutRafraichir);
      }
      if (request.url.path == '/moi') {
        // L'accès initial est expiré : 401, puis 200 après
        // renouvellement.
        if (request.headers['authorization'] == 'Bearer acces') {
          return http.Response('{"erreur":"Session expirée."}', 401);
        }
        return http.Response(jsonEncode({'id': 'u1'}), 200);
      }
      return http.Response('{}', 404);
    });
    client = ApiClient(client: mock);
    client.delaisRenouvellement = const [
      Duration(milliseconds: 1),
      Duration(milliseconds: 2),
      Duration(milliseconds: 3),
    ];
    client.onSessionExpiree = () => expiree = true;
  });

  Future<void> connecter() async {
    final data = await client.login('CP-AA-2526', 'MotDePasseTest123');
    expect(data['refresh'], refreshInitial);
    expect(client.isConnected, isTrue);
  }

  test('file unique : 5 appels simultanés, un seul POST', () async {
    await connecter();
    final resultats =
        await Future.wait(List.generate(5, (_) => client.refreshAccess()));
    expect(resultats, everyElement(isTrue));
    expect(appelsRafraichir, 1);
  });

  test('429 : une attente puis abandon, sans déconnexion', () async {
    await connecter();
    statutRafraichir = 429;
    expect(await client.refreshAccess(), isFalse);
    expect(appelsRafraichir, 2);
    expect(expiree, isFalse);
    expect(client.isConnected, isTrue);
  });

  test('500 : nouvelles tentatives puis échec, sans déconnexion', () async {
    await connecter();
    statutRafraichir = 500;
    expect(await client.refreshAccess(), isFalse);
    expect(appelsRafraichir, 4);
    expect(expiree, isFalse);
    expect(client.isConnected, isTrue);
  });

  test('401 : déconnexion immédiate, jetons effacés', () async {
    await connecter();
    statutRafraichir = 401;
    expect(await client.refreshAccess(), isFalse);
    expect(appelsRafraichir, 1);
    expect(expiree, isTrue);
    expect(client.isConnected, isFalse);
  });

  test('intégration : 5 appels de données simultanés, un seul renouvellement',
      () async {
    await connecter();
    final resultats =
        await Future.wait(List.generate(5, (_) => client.fetchMoi()));
    expect(resultats, everyElement({'id': 'u1'}));
    expect(appelsRafraichir, 1);
    expect(client.isConnected, isTrue);
  });
}
