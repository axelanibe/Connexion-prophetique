// Renouvellement de session, 21 nov. 2026 : file unique, délai
// après échec, déconnexion après 3 échecs. Sans serveur réel :
// l'API est simulée par un client HTTP en mémoire.
import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/api.dart';

void main() {
  final refreshInitial = 'a' * 64;
  final refreshNouveau = 'b' * 64;

  late ApiClient client;
  late int appelsRafraichir;
  late int statutRafraichir;

  setUp(() {
    SharedPreferences.setMockInitialValues({});
    appelsRafraichir = 0;
    statutRafraichir = 200;
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
        return http.Response('{"erreur":"refusé"}', statutRafraichir);
      }
      return http.Response('{}', 404);
    });
    client = ApiClient(client: mock);
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

  test('429 : échec avec délai, pas de second POST immédiat', () async {
    await connecter();
    statutRafraichir = 429;
    expect(await client.refreshAccess(), isFalse);
    expect(appelsRafraichir, 1);
    expect(await client.refreshAccess(), isFalse);
    expect(appelsRafraichir, 1, reason: 'délai de 30 secondes');
    client.delaiApresEchecRefresh = Duration.zero;
    expect(await client.refreshAccess(), isFalse);
    expect(appelsRafraichir, 2, reason: 'délai expiré');
  });

  test('3 échecs : jetons effacés et renvoi vers la connexion', () async {
    await connecter();
    statutRafraichir = 401;
    client.delaiApresEchecRefresh = Duration.zero;
    var expiree = false;
    client.onSessionExpiree = () => expiree = true;
    expect(await client.refreshAccess(), isFalse);
    expect(await client.refreshAccess(), isFalse);
    expect(await client.refreshAccess(), isFalse);
    expect(expiree, isTrue);
    expect(client.isConnected, isFalse);
    expect(appelsRafraichir, 3);
  });
}
