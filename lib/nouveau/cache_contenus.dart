// Cache local des contenus publics, tranche T10, 26 nov. 2026.
// Actualités, camps (événements) et établissements ne restent
// jamais vides jusqu'à une synchro réussie : après une connexion
// fraîche, ils se lisent d'abord en local, puis se rafraîchissent
// par le réseau. Les actualités passent déjà par fetchActualites,
// qui garde une copie locale avec ETag ; les camps et les
// établissements passent par ce cache, même modèle : succès
// réseau, la copie est gardée ; échec, la copie est renvoyée ;
// sans copie, une liste vide, jamais une erreur bloquante.
// Lectures seulement, jamais d'écriture en base, états gardés
// en stockage local.
import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../api.dart';

class CacheContenus {
  CacheContenus(this._api);
  final ApiClient _api;

  static const _cleEvenements = 'nouveau_evenements_cache_json';
  static const _cleEtablissements = 'nouveau_etablissements_cache_json';

  /// Camps et retraites : réseau d'abord, copie locale gardée,
  /// copie renvoyée en cas d'échec.
  Future<List<Map<String, dynamic>>> chargerEvenements() async {
    final prefs = await SharedPreferences.getInstance();
    try {
      final liste = await _api.fetchEvenements();
      await prefs.setString(_cleEvenements, jsonEncode(liste));
      return liste;
    } catch (_) {
      return _lire(prefs, _cleEvenements);
    }
  }

  /// Établissements : même modèle que les événements.
  Future<List<Map<String, dynamic>>> chargerEtablissements() async {
    final prefs = await SharedPreferences.getInstance();
    try {
      final liste = await _api.fetchEtablissements();
      await prefs.setString(_cleEtablissements, jsonEncode(liste));
      return liste;
    } catch (_) {
      return _lire(prefs, _cleEtablissements);
    }
  }

  /// Actualités : fetchActualites garde déjà sa copie locale
  /// avec ETag, ce passage ne fait que regrouper les trois
  /// contenus derrière la même porte, pour la bascule T11.
  Future<List<Map<String, dynamic>>> chargerActualites() =>
      _api.fetchActualites();

  /// Lecture locale seule, pour afficher ce qui est déjà connu
  /// en attendant la synchro, sans attendre le réseau.
  Future<List<Map<String, dynamic>>> lireEvenementsEnCache() async {
    final prefs = await SharedPreferences.getInstance();
    return _lire(prefs, _cleEvenements);
  }

  /// Lecture locale seule des établissements.
  Future<List<Map<String, dynamic>>> lireEtablissementsEnCache() async {
    final prefs = await SharedPreferences.getInstance();
    return _lire(prefs, _cleEtablissements);
  }

  List<Map<String, dynamic>> _lire(SharedPreferences prefs, String cle) {
    try {
      final raw = prefs.getString(cle);
      if (raw == null || raw.isEmpty) return const [];
      final data = jsonDecode(raw);
      if (data is List) return data.whereType<Map<String, dynamic>>().toList();
    } catch (_) {}
    return const [];
  }
}
