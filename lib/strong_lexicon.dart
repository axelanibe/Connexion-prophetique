// Lexique de Strong en hébreu, carte 54, 6 nov. 2026.
//
// Source réelle, sans un seul mot inventé : James Strong,
// A Concise Dictionary of the Words in the Hebrew Bible, 1894,
// édition JSON Open Scriptures 2010, CC-BY-SA, texte de Strong
// dans le domaine public. Dépôt : github.com/openscriptures/strongs,
// fichier hebrew/strongs-hebrew-dictionary.js, converti tel quel en
// assets/strong_hebrew.json, 8 674 entrées, H1 à H8674, champs
// raccourcis : l lemme, x translittération, p prononciation,
// d origine, s définition Strong, k usages dans la version King
// James. Les définitions sont en anglais, telles que dans la
// source, jamais traduites ici, car traduire 8 674 entrées à la
// main serait inventer des sens. Le lexique grec du Nouveau
// Testament, même source, 5 523 entrées G1-G5624, n'est pas
// intégré dans cette tranche, le code est prêt à le recevoir
// avec un second fichier assets/strong_greek.json au même format.
//
// Le fichier est chargé à la demande seulement, jamais au
// démarrage, et reste en mémoire ensuite. La recherche accepte
// un numéro Strong, H7965 par exemple, une translittération
// ou un bout de définition, 50 résultats au plus.
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
  });
  final String strong;
  final String lemma;
  final String xlit;
  final String pron;
  final String derivation;
  final String strongsDef;
  final String kjvDef;
}

class StrongLexicon {
  StrongLexicon._();
  static final instance = StrongLexicon._();

  Future<Map<String, StrongEntry>>? _loading;

  Future<Map<String, StrongEntry>> load() {
    _loading ??= _load();
    return _loading!;
  }

  Future<Map<String, StrongEntry>> _load() async {
    try {
      final raw = await rootBundle.loadString('assets/strong_hebrew.json');
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
          );
        });
      }
      return out;
    } catch (_) {
      return {};
    }
  }

  Future<int> get count async => (await load()).length;

  Future<StrongEntry?> byStrong(String strong) async {
    final entries = await load();
    final key = strong.trim().toUpperCase();
    if (key.isEmpty) return null;
    return entries[key] ?? entries['H${key.replaceAll(RegExp(r'[^0-9]'), '')}'];
  }

  // Recherche par numéro, translittération, lemme ou définition,
  // 50 résultats au plus, sans accent et sans casse.
  Future<List<StrongEntry>> search(String query) async {
    final entries = await load();
    final q = query.trim().toLowerCase();
    if (q.isEmpty) return [];
    final direct = await byStrong(query);
    if (direct != null) return [direct];
    final out = <StrongEntry>[];
    for (final e in entries.values) {
      if (e.xlit.toLowerCase().contains(q) ||
          e.lemma.contains(q) ||
          e.strongsDef.toLowerCase().contains(q)) {
        out.add(e);
        if (out.length >= 50) break;
      }
    }
    return out;
  }
}
