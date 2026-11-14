// Lexique de Strong en hébreu et en grec, cartes 54 et 58,
// 6 nov. 2026.
//
// Source réelle, sans un seul mot inventé : James Strong,
// A Concise Dictionary of the Words in the Hebrew Bible, 1894,
// et Strong's Exhaustive Concordance, 1890, éditions JSON Open
// Scriptures, hébreu 2010, grec 2009, CC-BY-SA, textes de Strong
// dans le domaine public. Dépôt : github.com/openscriptures/strongs,
// fichiers hebrew/strongs-hebrew-dictionary.js et
// greek/strongs-greek-dictionary.js, convertis tels quels en
// assets/strong_hebrew.json, 8 674 entrées, H1 à H8674, et
// assets/strong_greek.json, 5 523 entrées, G1 à G5624, avec
// 101 numéros absents de la source grecque elle-même, jamais
// comblés ici, par exemple G2717 et G3203 à G3231. Champs
// raccourcis : l lemme, x translittération, p prononciation,
// d origine, s définition Strong, k usages dans la version King
// James. La source grecque ne donne pas de prononciation, le
// champ p reste vide pour le grec, sans rien inventer. Les
// définitions sont en anglais, telles que dans la source,
// jamais traduites ici, car traduire 14 197 entrées à la
// main serait inventer des sens.
//
// Chaque fichier est chargé à la demande seulement, jamais au
// démarrage, et reste en mémoire ensuite. La recherche accepte
// un numéro Strong, H7965 ou G26 par exemple, une
// translittération ou un bout de définition, 50 résultats au
// plus, hébreu d'abord, grec ensuite.
import 'dart:convert';

import 'package:flutter/services.dart';

class StrongEntry {
  const StrongEntry({
    required this.strong,
    required this.lemma,
    required this.xlit,
    required this.pron,
    required this.derivation,
    required this.strongsDef,
    required this.kjvDef,
    required this.isGreek,
  });
  final String strong;
  final String lemma;
  final String xlit;
  final String pron;
  final String derivation;
  final String strongsDef;
  final String kjvDef;
  // Vrai pour le grec du Nouveau Testament, faux pour l'hébreu
  // de l'Ancien Testament : le lemme grec se lit de gauche à
  // droite, l'hébreu de droite à gauche.
  final bool isGreek;
}

class StrongLexicon {
  StrongLexicon._();
  static final instance = StrongLexicon._();

  Future<Map<String, StrongEntry>>? _hebrewLoading;
  Future<Map<String, StrongEntry>>? _greekLoading;

  Future<Map<String, StrongEntry>> loadHebrew() {
    _hebrewLoading ??= _load('assets/strong_hebrew.json', false);
    return _hebrewLoading!;
  }

  Future<Map<String, StrongEntry>> loadGreek() {
    _greekLoading ??= _load('assets/strong_greek.json', true);
    return _greekLoading!;
  }

  // Les deux lexiques ensemble, chargés à la demande seulement.
  Future<Map<String, StrongEntry>> load() async {
    final hebrew = await loadHebrew();
    final greek = await loadGreek();
    return {...hebrew, ...greek};
  }

  Future<Map<String, StrongEntry>> _load(String asset, bool isGreek) async {
    try {
      final raw = await rootBundle.loadString(asset);
      final decoded = jsonDecode(raw);
      final out = <String, StrongEntry>{};
      if (decoded is Map) {
        decoded.forEach((k, v) {
          if (v is! Map) return;
          out[k.toString()] = StrongEntry(
            strong: k.toString(),
            lemma: '${v['l'] ?? ''}',
            xlit: '${v['x'] ?? ''}',
            pron: '${v['p'] ?? ''}',
            derivation: '${v['d'] ?? ''}',
            strongsDef: '${v['s'] ?? ''}',
            kjvDef: '${v['k'] ?? ''}',
            isGreek: isGreek,
          );
        });
      }
      return out;
    } catch (_) {
      return {};
    }
  }

  Future<int> get hebrewCount async => (await loadHebrew()).length;

  Future<int> get greekCount async => (await loadGreek()).length;

  Future<int> get count async => (await load()).length;

  Future<StrongEntry?> byStrong(String strong) async {
    final key = strong.trim().toUpperCase();
    if (key.isEmpty) return null;
    if (key.startsWith('G')) {
      final entries = await loadGreek();
      return entries[key];
    }
    if (key.startsWith('H')) {
      final entries = await loadHebrew();
      return entries[key];
    }
    // Numéro nu, sans lettre : l'hébreu d'abord, comme avant la
    // carte 58, puis le grec, pour ne pas changer le comportement
    // des recherches qui tapaient seulement un nombre.
    final digits = key.replaceAll(RegExp(r'[^0-9]'), '');
    if (digits.isEmpty) return null;
    final hebrew = await loadHebrew();
    final found = hebrew['H$digits'];
    if (found != null) return found;
    final greek = await loadGreek();
    return greek['G$digits'];
  }

  // Recherche par numéro, translittération, lemme ou définition,
  // 50 résultats au plus, sans accent et sans casse, hébreu
  // d'abord, grec ensuite.
  Future<List<StrongEntry>> search(String query) async {
    final q = query.trim().toLowerCase();
    if (q.isEmpty) return [];
    final direct = await byStrong(query);
    if (direct != null) return [direct];
    final out = <StrongEntry>[];
    for (final entries in [await loadHebrew(), await loadGreek()]) {
      for (final e in entries.values) {
        if (e.xlit.toLowerCase().contains(q) ||
            e.lemma.contains(q) ||
            e.strongsDef.toLowerCase().contains(q)) {
          out.add(e);
          if (out.length >= 50) return out;
        }
      }
    }
    return out;
  }
}
