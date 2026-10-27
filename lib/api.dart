// CONNEXION PROPHÉTIQUE — Client API de production.
// Serveur : https://connexion-prophetique.onrender.com
// Règles : aucune donnée n'est inventée ici. Si le serveur ne renvoie
// rien pour une liste, l'application garde ses données locales.
// Si le serveur est injoignable, l'application continue hors ligne
// avec ses données locales. Le jeton d'accès n'est jamais affiché.

import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

const String kApiBaseUrl = 'https://connexion-prophetique.onrender.com';

class ApiClient {
  ApiClient({http.Client? client}) : _client = client ?? http.Client();

  final http.Client _client;
  String? _accessToken;

  Future<void> restoreToken() async {
    final prefs = await SharedPreferences.getInstance();
    _accessToken = prefs.getString('api_access_token');
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

  bool get isConnected => _accessToken != null && _accessToken!.isNotEmpty;

  Map<String, String> get _headers => {
        'Content-Type': 'application/json',
        if (_accessToken != null) 'Authorization': 'Bearer $_accessToken',
      };

  Future<dynamic> _get(String path) async {
    final res = await _client
        .get(Uri.parse('$kApiBaseUrl$path'), headers: _headers)
        .timeout(const Duration(seconds: 15));
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw Exception('API ${res.statusCode} sur $path');
    }
    return jsonDecode(res.body);
  }

  Future<Map<String, dynamic>> _post(String path, Map<String, dynamic> body) async {
    final res = await _client
        .post(Uri.parse('$kApiBaseUrl$path'), headers: _headers, body: jsonEncode(body))
        .timeout(const Duration(seconds: 20));
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw Exception('API ${res.statusCode} sur $path');
    }
    return jsonDecode(res.body) as Map<String, dynamic>;
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
    return data;
  }

  Future<Map<String, dynamic>> register({
    required String nomComplet,
    required String motDePasse,
    String? email,
    String? telephone,
  }) async {
    final data = await _post('/auth/inscription', {
      'nom_complet': nomComplet,
      'mot_de_passe': motDePasse,
      if (email != null && email.isNotEmpty) 'email': email,
      if (telephone != null && telephone.isNotEmpty) 'telephone': telephone,
    });
    if (data['access'] is String) await saveToken(data['access'] as String);
    return data;
  }

  Future<Map<String, dynamic>> fetchMoi() async {
    final data = await _get('/moi');
    return data as Map<String, dynamic>;
  }

  Future<void> logout() async {
    await saveToken(null);
  }
}

final api = ApiClient();
