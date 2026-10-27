// CONNEXION PROPHÉTIQUE — Client API de production.
// Serveur : https://connexion-prophetique.onrender.com
// Règles : aucune donnée n'est inventée ici. Si le serveur ne renvoie
// rien pour une liste, l'application garde ses données locales.
// Si le serveur est injoignable, l'application continue hors ligne
// avec ses données locales. Le jeton d'accès n'est jamais affiché.
// Le jeton d'accès dure 15 minutes côté serveur : le jeton de
// rafraîchissement (30 jours) est conservé sur l'appareil et sert à
// obtenir un nouvel accès sans redemander le mot de passe.

import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

const String kApiBaseUrl = 'https://connexion-prophetique.onrender.com';

class ApiException implements Exception {
  ApiException(this.message);
  final String message;
  @override
  String toString() => message;
}

class ApiClient {
  ApiClient({http.Client? client}) : _client = client ?? http.Client();

  final http.Client _client;
  String? _accessToken;
  String? _refreshToken;

  Future<void> restoreToken() async {
    final prefs = await SharedPreferences.getInstance();
    _accessToken = prefs.getString('api_access_token');
    _refreshToken = prefs.getString('api_refresh_token');
  }

  Future<void> saveToken(String? token) async {
    _accessToken = token;
    final prefs = await SharedPreferences.getInstance();
    if (token == null) {
      await prefs.remove('api_access_token');
    } else {
      await prefs.setString('api_access_token', token);
    }
  }

  Future<void> _saveRefresh(String? token) async {
    _refreshToken = token;
    final prefs = await SharedPreferences.getInstance();
    if (token == null) {
      await prefs.remove('api_refresh_token');
    } else {
      await prefs.setString('api_refresh_token', token);
    }
  }

  bool get isConnected => _accessToken != null && _accessToken!.isNotEmpty;

  /// Rôle lu dans le jeton d'accès (charge utile décodée, pas un secret).
  /// Sert à ouvrir l'espace structure quand le serveur a donné un rôle
  /// administrateur, sans code dans l'application.
  String? get role {
    final token = _accessToken;
    if (token == null) return null;
    try {
      final parts = token.split('.');
      if (parts.length != 3) return null;
      final payload = utf8.decode(base64Url.decode(base64Url.normalize(parts[1])));
      final data = jsonDecode(payload) as Map<String, dynamic>;
      return data['role'] as String?;
    } catch (_) {
      return null;
    }
  }

  Map<String, String> get _headers => {
        'Content-Type': 'application/json',
        if (_accessToken != null) 'Authorization': 'Bearer $_accessToken',
      };

  ApiException _error(int status, String body) {
    try {
      final data = jsonDecode(body);
      if (data is Map && data['erreur'] is String) return ApiException(data['erreur'] as String);
      if (data is Map && data['message'] is String) return ApiException(data['message'] as String);
    } catch (_) {}
    return ApiException('Le serveur a répondu une erreur ($status).');
  }

  Future<http.Response> _sendWithRefresh(
    Future<http.Response> Function(Map<String, String> headers) send,
  ) async {
    var res = await send(_headers);
    if (res.statusCode == 401 && _refreshToken != null) {
      if (await refreshAccess()) {
        res = await send(_headers);
      }
    }
    return res;
  }

  Future<dynamic> _get(String path) async {
    final res = await _sendWithRefresh(
      (headers) => _client
          .get(Uri.parse('$kApiBaseUrl$path'), headers: headers)
          .timeout(const Duration(seconds: 45)),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw _error(res.statusCode, res.body);
    }
    return jsonDecode(res.body);
  }

  Future<Map<String, dynamic>> _post(String path, Map<String, dynamic> body) async {
    final res = await _sendWithRefresh(
      (headers) => _client
          .post(Uri.parse('$kApiBaseUrl$path'), headers: headers, body: jsonEncode(body))
          .timeout(const Duration(seconds: 30)),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw _error(res.statusCode, res.body);
    }
    final data = jsonDecode(res.body);
    if (data is Map<String, dynamic>) return data;
    return {'data': data};
  }

  Future<bool> checkHealth() async {
    final data = await _get('/sante');
    return data is Map && data['ok'] == true;
  }

  Future<List<Map<String, dynamic>>> _list(String path) async {
    final data = await _get(path);
    if (data is List) return data.cast<Map<String, dynamic>>();
    return const [];
  }

  Future<List<Map<String, dynamic>>> fetchEtablissements() => _list('/etablissements');
  Future<Map<String, dynamic>> fetchEtablissement(String id) async {
    final data = await _get('/etablissements/$id');
    return data as Map<String, dynamic>;
  }

  Future<List<Map<String, dynamic>>> fetchActualites() => _list('/actualites');
  Future<List<Map<String, dynamic>>> fetchEvenements() => _list('/evenements');
  Future<List<Map<String, dynamic>>> fetchLivres() => _list('/livres');
  Future<List<Map<String, dynamic>>> fetchEnseignements() => _list('/enseignements');
  Future<List<Map<String, dynamic>>> fetchBureau() => _list('/bureau');

  Future<Map<String, dynamic>> login(String identifiant, String motDePasse) async {
    final data = await _post('/auth/connexion', {
      'identifiant': identifiant,
      'mot_de_passe': motDePasse,
    });
    if (data['access'] is String) await saveToken(data['access'] as String);
    if (data['refresh'] is String) await _saveRefresh(data['refresh'] as String);
    return data;
  }

  Future<Map<String, dynamic>> register({
    required String nomComplet,
    required String motDePasse,
    String? email,
    String? telephone,
    String? etablissementId,
  }) async {
    final data = await _post('/auth/inscription', {
      'nom_complet': nomComplet,
      'mot_de_passe': motDePasse,
      if (email != null && email.isNotEmpty) 'email': email,
      if (telephone != null && telephone.isNotEmpty) 'telephone': telephone,
      if (etablissementId != null && etablissementId.isNotEmpty) 'etablissement_id': etablissementId,
    });
    if (data['access'] is String) await saveToken(data['access'] as String);
    if (data['refresh'] is String) await _saveRefresh(data['refresh'] as String);
    return data;
  }

  Future<bool> refreshAccess() async {
    final refresh = _refreshToken;
    if (refresh == null || refresh.length != 64) return false;
    try {
      final res = await _client
          .post(Uri.parse('$kApiBaseUrl/auth/rafraichir'),
              headers: {'Content-Type': 'application/json'},
              body: jsonEncode({'refresh': refresh}))
          .timeout(const Duration(seconds: 30));
      if (res.statusCode < 200 || res.statusCode >= 300) return false;
      final data = jsonDecode(res.body) as Map<String, dynamic>;
      if (data['access'] is String) await saveToken(data['access'] as String);
      if (data['refresh'] is String) await _saveRefresh(data['refresh'] as String);
      return true;
    } catch (_) {
      return false;
    }
  }

  Future<Map<String, dynamic>> fetchMoi() async {
    final data = await _get('/moi');
    return data as Map<String, dynamic>;
  }

  Future<Map<String, dynamic>> registerForEvent(String evenementId) async {
    return _post('/evenements/$evenementId/inscription', {});
  }

  Future<Map<String, dynamic>> createDon(int montantFcfa) async {
    return _post('/paiements/don', {'montant_fcfa': montantFcfa});
  }

  Future<Map<String, dynamic>> createAchat(List<String> livreIds) async {
    return _post('/paiements/achat', {'livre_ids': livreIds});
  }

  Future<void> logout() async {
    final refresh = _refreshToken;
    if (refresh != null && refresh.length == 64) {
      try {
        await _client
            .post(Uri.parse('$kApiBaseUrl/auth/deconnexion'),
                headers: {'Content-Type': 'application/json'},
                body: jsonEncode({'refresh': refresh}))
            .timeout(const Duration(seconds: 15));
      } catch (_) {}
    }
    await saveToken(null);
    await _saveRefresh(null);
  }
}

final api = ApiClient();
