// Tests unitaires de la session d'authentification, 21 nov. 2026.
//
// AuthSession est testée seule, avec des fonctions factices, sans
// HTTP : file unique, renouvellement avant l'appel si l'accès est
// nul, 401 définitif qui efface et déconnecte, 429 avec
// Retry-After, erreur d'écriture qui ne relance pas le
// renouvellement avec le même jeton, transitoire qui réessaie
// puis abandonne sans déconnecter, withAuth qui retente après 401.
import 'package:connexion_prophetique/auth_session.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;

void main() {
  final paire = (access: 'acces-nouveau', refresh: 'r' * 64);
  const delaisTest = [
    Duration(milliseconds: 1),
    Duration(milliseconds: 2),
    Duration(milliseconds: 3),
  ];

  AuthSession session({
    Future<TokenPair> Function(String refresh)? refreshCall,
    Future<String?> Function()? readRefresh,
    Future<void> Function(TokenPair pair)? saveTokens,
    Future<void> Function()? clearTokens,
    void Function()? onSessionLost,
  }) {
    return AuthSession(
      refreshCall: refreshCall ?? (_) async => paire,
      readRefresh: readRefresh ?? () async => 'a' * 64,
      saveTokens: saveTokens ?? (_) async {},
      clearTokens: clearTokens ?? () async {},
      onSessionLost: onSessionLost ?? () {},
      delais: delaisTest,
    );
  }

  test('file unique : 5 appels, un seul renouvellement', () async {
    var appels = 0;
    final s = session(refreshCall: (_) async {
      appels++;
      await Future.delayed(const Duration(milliseconds: 50));
      return paire;
    });
    final resultats = await Future.wait(List.generate(5, (_) => s.refresh()));
    expect(resultats, everyElement('acces-nouveau'));
    expect(appels, 1);
  });

  test('401 : effacement et déconnexion, un seul appel', () async {
    var efface = false;
    var perdu = false;
    var appels = 0;
    final s = session(
      refreshCall: (_) async {
        appels++;
        throw RefreshRejected();
      },
      clearTokens: () async => efface = true,
      onSessionLost: () => perdu = true,
    );
    expect(await s.refresh(), isNull);
    expect(appels, 1);
    expect(efface, isTrue);
    expect(perdu, isTrue);
  });

  test('429 avec Retry-After : nouvelle tentative puis succès', () async {
    var appels = 0;
    final s = session(refreshCall: (_) async {
      appels++;
      if (appels == 1) {
        throw RefreshTransient(null, const Duration(milliseconds: 1));
      }
      return paire;
    });
    expect(await s.refresh(), 'acces-nouveau');
    expect(appels, 2);
  });

  test('429 répété : abandon après une seule attente, sans déconnexion',
      () async {
    var appels = 0;
    var perdu = false;
    final s = session(
      refreshCall: (_) async {
        appels++;
        throw RefreshTransient(null, const Duration(milliseconds: 1));
      },
      onSessionLost: () => perdu = true,
    );
    expect(await s.refresh(), isNull);
    expect(appels, 2);
    expect(perdu, isFalse);
  });

  test('500 : 4 tentatives puis abandon, sans déconnexion', () async {
    var appels = 0;
    var perdu = false;
    final s = session(
      refreshCall: (_) async {
        appels++;
        throw RefreshTransient(null);
      },
      onSessionLost: () => perdu = true,
    );
    expect(await s.refresh(), isNull);
    expect(appels, 4);
    expect(perdu, isFalse);
  });

  test('écriture en échec : pas de second renouvellement, accès rendu',
      () async {
    var appels = 0;
    final s = session(
      refreshCall: (_) async {
        appels++;
        return paire;
      },
      saveTokens: (_) async => throw StateError('stockage'),
    );
    expect(await s.refresh(), 'acces-nouveau');
    expect(appels, 1);
  });

  test('withAuth : accès nul, renouvellement d\'abord', () async {
    final s = session();
    final vu = <String?>[];
    final resultat = await withAuth<String>(
      s,
      (access) async {
        vu.add(access);
        return 'ok';
      },
      () => null,
    );
    expect(resultat, 'ok');
    expect(vu, ['acces-nouveau']);
  });

  test('withAuth : 401, renouvellement, nouvel essai', () async {
    final s = session();
    var essais = 0;
    final resultat = await withAuth<String>(
      s,
      (access) async {
        essais++;
        if (essais == 1) {
          throw UnauthorizedException(http.Response('{}', 401));
        }
        return 'ok-$access';
      },
      () => 'ancien-acces',
    );
    expect(resultat, 'ok-acces-nouveau');
    expect(essais, 2);
  });

  test('withAuth : 401 et renouvellement en échec, 401 remonte', () async {
    final s = session(refreshCall: (_) async => throw RefreshRejected());
    await expectLater(
      withAuth<String>(
        s,
        (_) async => throw UnauthorizedException(http.Response('{}', 401)),
        () => 'ancien-acces',
      ),
      throwsA(isA<UnauthorizedException>()),
    );
  });
}
