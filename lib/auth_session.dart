// CONNEXION PROPHÉTIQUE — Renouvellement de session, 21 nov. 2026.
// Un seul renouvellement à la fois, tentatives limitées avec délai
// et gigue, respect de Retry-After, écriture du nouveau jeton avant
// de rendre la main, déconnexion propre seulement sur 401/403
// définitif. Une erreur d'écriture ne relance jamais un
// renouvellement avec le même jeton : le renouvellement a réussi
// côté serveur, le jeton présenté est déjà révoqué.
import 'dart:async';

import 'package:http/http.dart' as http;

/// Paire de jetons rendue par /auth/rafraichir.
typedef TokenPair = ({String access, String refresh});

/// 401 ou 403 définitif : la session est perdue, on efface et on
/// déconnecte proprement, sans nouvelle tentative.
class RefreshRejected implements Exception {}

/// 429, 5xx ou réseau : transitoire, on réessaie avec délai.
/// retryAfter vient de l'en-tête Retry-After du serveur (429).
class RefreshTransient implements Exception {
  RefreshTransient([this.cause, this.retryAfter]);
  final Object? cause;
  final Duration? retryAfter;
}

/// 401 levé par un appel authentifié : withAuth le rattrape pour
/// renouveler une fois, puis rejoue l'appel.
class UnauthorizedException implements Exception {
  UnauthorizedException(this.response);
  final http.Response response;
}

class AuthSession {
  AuthSession({
    required Future<TokenPair> Function(String refresh) refreshCall,
    required Future<String?> Function() readRefresh,
    required Future<void> Function(TokenPair pair) saveTokens,
    required Future<void> Function() clearTokens,
    required void Function() onSessionLost,
    List<Duration>? delais,
  })  : _refreshCall = refreshCall,
        _readRefresh = readRefresh,
        _saveTokens = saveTokens,
        _clearTokens = clearTokens,
        _onSessionLost = onSessionLost,
        delais = delais ??
            const [
              Duration(seconds: 1),
              Duration(seconds: 5),
              Duration(seconds: 15),
            ];

  final Future<TokenPair> Function(String refresh) _refreshCall;
  final Future<String?> Function() _readRefresh;
  final Future<void> Function(TokenPair pair) _saveTokens;
  final Future<void> Function() _clearTokens;
  final void Function() _onSessionLost;

  /// Délais entre tentatives pour les échecs transitoires,
  /// modifiables en test pour ne pas attendre. Pour un 429, c'est
  /// Retry-After qui décide, plafonné à delaiMax429.
  List<Duration> delais;

  /// Délai maximal d'une attente après 429.
  static const delaiMax429 = Duration(seconds: 65);

  /// Tentatives au plus par renouvellement.
  static const _tentativesMax = 4;

  Future<String?>? _inFlight;

  Future<String?> refresh() {
    return _inFlight ??= _doRefresh().whenComplete(() => _inFlight = null);
  }

  Future<String?> _doRefresh() async {
    final refresh = await _readRefresh();
    if (refresh == null) {
      _onSessionLost();
      return null;
    }
    var attentes429 = 0;
    for (var attempt = 0; attempt < _tentativesMax; attempt++) {
      try {
        final pair = await _refreshCall(refresh);
        try {
          await _saveTokens(pair);
        } catch (_) {
          // Écriture en échec : le renouvellement a réussi côté
          // serveur, le jeton présenté est déjà révoqué. On ne
          // représente jamais le même jeton, la paire reste en
          // mémoire et on la rend quand même.
        }
        return pair.access;
      } on RefreshRejected {
        await _clearTokens();
        _onSessionLost();
        return null;
      } on RefreshTransient catch (e) {
        if (attempt >= _tentativesMax - 1) return null;
        if (e.retryAfter != null) {
          // 429 : une seule attente longue, puis on abandonne et
          // le prochain appel réessaiera.
          if (attentes429 >= 1) return null;
          attentes429++;
        }
        await Future.delayed(_attenteApres(e, attempt));
      }
    }
    return null;
  }

  Duration _attenteApres(RefreshTransient e, int attempt) {
    final jitter =
        Duration(milliseconds: DateTime.now().millisecond % 300);
    final retryAfter = e.retryAfter;
    if (retryAfter != null) {
      final plafonne =
          retryAfter > delaiMax429 ? delaiMax429 : retryAfter;
      return plafonne + jitter;
    }
    final base =
        delais[attempt < delais.length ? attempt : delais.length - 1];
    return base + jitter;
  }
}

/// Appel authentifié avec renouvellement : si le jeton d'accès est
/// absent, on renouvelle d'abord ; sur 401, on renouvelle une fois
/// et on rejoue l'appel. Si le renouvellement échoue, le 401
/// d'origine remonte.
Future<T> withAuth<T>(
  AuthSession session,
  Future<T> Function(String? access) call,
  String? Function() currentAccess,
) async {
  var access = currentAccess();
  var dejaRenouvele = false;
  if (access == null) {
    access = await session.refresh();
    dejaRenouvele = true;
    if (access == null) return await call(null);
  }
  try {
    return await call(access);
  } on UnauthorizedException {
    if (dejaRenouvele) rethrow;
    final frais = await session.refresh();
    if (frais == null) rethrow;
    return await call(frais);
  }
}
