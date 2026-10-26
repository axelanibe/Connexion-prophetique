// Structure de la Bible hors ligne, sans verset inventé.
//
// Principe : l'application lit un fichier local `assets/bible.json`,
// fourni par la structure à partir d'une source autorisée, Louis Segond
// en français et King James en anglais. Aucun verset n'est écrit ici.
// Le fichier d'exemple joint ne contient que le verset déjà utilisé
// dans l'application, Psaume 23:1, avec sa référence exacte.
// Tant que la structure n'a pas fourni le texte complet, la Bible
// affiche les passages fournis, et indique clairement ce qui manque,
// au lieu d'inventer un texte.
//
// Format attendu de assets/bible.json :
// {
//   "fr": { "Psaumes 23:1": "L'Éternel est mon berger: je ne manquerai de rien." },
//   "en": { "Psalms 23:1": "The LORD is my shepherd; I shall not want." }
// }
// Les clés sont des références exactes, au format Livre chapitre:verset.
// La recherche porte sur les références et sur le texte fourni.
// Les favoris et la reprise de lecture sont conservés sur l'appareil,
// avec shared_preferences, et ne partent jamais vers un serveur.
import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';

class BibleService {
  BibleService._();
  static final instance = BibleService._();

  Map<String, Map<String, String>> _texts = {};

  Future<void> load() async {
    try {
      final raw = await rootBundle.loadString('assets/bible.json');
      final data = jsonDecode(raw) as Map<String, dynamic>;
      _texts = {
        for (final lang in data.keys)
          lang: Map<String, String>.from(data[lang] as Map<String, dynamic>),
      };
    } catch (_) {
      _texts = {};
    }
  }

  List<String> references(String lang) => _texts[lang]?.keys.toList() ?? [];

  String? verse(String lang, String reference) => _texts[lang]?[reference];

  List<String> search(String lang, String query) {
    final q = query.trim().toLowerCase();
    if (q.isEmpty) return [];
    final texts = _texts[lang] ?? {};
    return texts.entries
        .where((e) => e.key.toLowerCase().contains(q) || e.value.toLowerCase().contains(q))
        .map((e) => e.key)
        .toList();
  }

  Future<List<String>> favorites(String lang) async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getStringList('bible_favorites_$lang') ?? [];
  }

  Future<void> toggleFavorite(String lang, String reference) async {
    final prefs = await SharedPreferences.getInstance();
    final key = 'bible_favorites_$lang';
    final list = prefs.getStringList(key) ?? [];
    if (list.contains(reference)) {
      list.remove(reference);
    } else {
      list.add(reference);
    }
    await prefs.setStringList(key, list);
  }

  Future<void> saveReadingState(String lang, String reference) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('bible_last_$lang', reference);
  }

  Future<String?> lastRead(String lang) async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('bible_last_$lang');
  }
}
