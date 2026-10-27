// Bible hors ligne, texte réel, sans verset inventé.
//
// Sources, toutes deux dans le domaine public :
// - français : Louis Segond 1910, dépôt BibleCorps FRA-B-LSG1910-PD-UBS,
//   fichiers SFM convertis tels quels, sans retouche du texte ;
// - anglais : King James Version, fichier JSON thiagobodruk/bible en_kjv.json.
// Le fichier embarqué `assets/bible.json` contient les 66 livres dans
// chaque langue, avec leurs chapitres et leurs versets, dans l'ordre
// canonique. Les favoris et la reprise de lecture sont conservés sur
// l'appareil, avec shared_preferences, et ne partent jamais vers un serveur.
//
// Note de numérotation : la source française compte certains titres de
// psaumes comme un verset à part, d'où 31 170 versets en français contre
// 31 102 en anglais. Les références affichées suivent la source de la
// langue choisie, sans réécriture.
import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';

class BibleBook {
  const BibleBook(this.name, this.chapters);
  final String name;
  final List<List<String>> chapters;
}

class BibleHit {
  const BibleHit(this.book, this.chapter, this.verse, this.text);
  final int book; // index 0..65
  final int chapter; // 1-based
  final int verse; // 1-based
  final String text;
}

class BibleVerseRef {
  const BibleVerseRef(this.book, this.chapter, this.verse, this.text);
  final int book;
  final int chapter;
  final int verse;
  final String text;
}

/// Versets du jour, vérifiés présents dans les deux langues.
/// Chaque entrée est (index du livre, chapitre, verset).
/// Le verset du jour tourne dans cette liste, selon le jour de l'année.
const List<List<int>> kDailyVerses = [
  [0, 1, 1],
  [18, 23, 1],
  [42, 3, 16],
  [39, 6, 33],
  [49, 4, 13],
  [23, 29, 11],
  [22, 41, 10],
  [44, 8, 28],
  [18, 121, 1],
  [19, 3, 5],
  [39, 11, 28],
  [46, 13, 4],
  [0, 28, 15],
  [42, 1, 1],
  [18, 100, 1],
  [18, 1, 1],
  [44, 10, 9],
  [39, 5, 1],
  [22, 40, 31],
  [45, 5, 8],
  [18, 34, 8],
  [18, 37, 5],
  [39, 7, 7],
  [44, 6, 12],
  [18, 119, 105],
  [40, 4, 4],
];

String _stripAccents(String s) {
  const Map<String, String> map = {
    'à': 'a', 'á': 'a', 'â': 'a', 'ä': 'a', 'ã': 'a', 'å': 'a',
    'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
    'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
    'ò': 'o', 'ó': 'o', 'ô': 'o', 'ö': 'o',
    'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
    'ç': 'c', 'ÿ': 'y', 'æ': 'ae', 'œ': 'oe',
  };
  final buf = StringBuffer();
  for (final ch in s.toLowerCase().runes) {
    final c = String.fromCharCode(ch);
    buf.write(map[c] ?? c);
  }
  return buf.toString();
}

class BibleService {
  BibleService._();
  static final instance = BibleService._();

  final Map<String, List<BibleBook>> _books = {};
  bool _loaded = false;
  Future<void>? _loading;

  Future<void> load() {
    _loading ??= _load();
    return _loading!;
  }

  Future<void> _load() async {
    try {
      final raw = await rootBundle.loadString('assets/bible.json');
      final data = jsonDecode(raw) as Map<String, dynamic>;
      for (final lang in ['fr', 'en']) {
        final langData = data[lang] as Map<String, dynamic>;
        final booksJson = langData['books'] as List<dynamic>;
        _books[lang] = booksJson.map((b) {
          final m = b as Map<String, dynamic>;
          final chaptersJson = m['chapters'] as List<dynamic>;
          return BibleBook(
            m['name'] as String,
            chaptersJson
                .map((c) => (c as List<dynamic>).map((v) => v as String).toList())
                .toList(),
          );
        }).toList();
      }
      _loaded = true;
    } catch (_) {
      _loaded = false;
    }
  }

  bool get loaded => _loaded;

  List<BibleBook> books(String lang) => _books[lang] ?? const [];

  String bookName(String lang, int book) {
    final list = books(lang);
    if (book < 0 || book >= list.length) return '';
    return list[book].name;
  }

  String label(String lang, int book, int chapter, int verse) =>
      '${bookName(lang, book)} $chapter:$verse';

  String? verseText(String lang, int book, int chapter, int verse) {
    final list = books(lang);
    if (book < 0 || book >= list.length) return null;
    final chapters = list[book].chapters;
    if (chapter < 1 || chapter > chapters.length) return null;
    final verses = chapters[chapter - 1];
    if (verse < 1 || verse > verses.length) return null;
    return verses[verse - 1];
  }

  List<String> chapterVerses(String lang, int book, int chapter) {
    final list = books(lang);
    if (book < 0 || book >= list.length) return const [];
    final chapters = list[book].chapters;
    if (chapter < 1 || chapter > chapters.length) return const [];
    return chapters[chapter - 1];
  }

  /// Recherche dans tout le texte de la langue, sans accents, 100 résultats max.
  List<BibleHit> search(String lang, String query) {
    final q = _stripAccents(query.trim());
    if (q.isEmpty) return [];
    final hits = <BibleHit>[];
    final list = books(lang);
    for (var bi = 0; bi < list.length; bi++) {
      final chapters = list[bi].chapters;
      for (var ci = 0; ci < chapters.length; ci++) {
        final verses = chapters[ci];
        for (var vi = 0; vi < verses.length; vi++) {
          final text = verses[vi];
          if (_stripAccents(text).contains(q) ||
              _stripAccents('${list[bi].name} ${ci + 1}:${vi + 1}').contains(q)) {
            hits.add(BibleHit(bi, ci + 1, vi + 1, text));
            if (hits.length >= 100) return hits;
          }
        }
      }
    }
    return hits;
  }

  BibleVerseRef dailyVerse(String lang, {DateTime? date}) {
    final day = (date ?? DateTime.now()).difference(DateTime((date ?? DateTime.now()).year, 1, 1)).inDays;
    final ref = kDailyVerses[day % kDailyVerses.length];
    final text = verseText(lang, ref[0], ref[1], ref[2]);
    if (text != null && text.isNotEmpty) {
      return BibleVerseRef(ref[0], ref[1], ref[2], text);
    }
    // Secours : Psaume 23:1, toujours présent dans les deux langues.
    return BibleVerseRef(
      18,
      23,
      1,
      verseText(lang, 18, 23, 1) ?? '',
    );
  }

  Future<BibleVerseRef> dailyVerseLoaded(String lang) async {
    await load();
    return dailyVerse(lang);
  }

  String _favKey(String lang) => 'bible_favorites_$lang';
  String _lastKey(String lang) => 'bible_last_$lang';

  String _encodeRef(BibleVerseRef r) => '${r.book}:${r.chapter}:${r.verse}';

  BibleVerseRef? _decodeRef(String lang, String encoded) {
    final parts = encoded.split(':');
    if (parts.length != 3) return null;
    final book = int.tryParse(parts[0]);
    final chapter = int.tryParse(parts[1]);
    final verse = int.tryParse(parts[2]);
    if (book == null || chapter == null || verse == null) return null;
    final text = verseText(lang, book, chapter, verse);
    if (text == null || text.isEmpty) return null;
    return BibleVerseRef(book, chapter, verse, text);
  }

  Future<List<BibleVerseRef>> favorites(String lang) async {
    final prefs = await SharedPreferences.getInstance();
    final out = <BibleVerseRef>[];
    for (final e in prefs.getStringList(_favKey(lang)) ?? const <String>[]) {
      final r = _decodeRef(lang, e);
      if (r != null) out.add(r);
    }
    return out;
  }

  Future<bool> isFavorite(String lang, BibleVerseRef r) async {
    final prefs = await SharedPreferences.getInstance();
    return (prefs.getStringList(_favKey(lang)) ?? const <String>[]).contains(_encodeRef(r));
  }

  Future<void> toggleFavorite(String lang, BibleVerseRef r) async {
    final prefs = await SharedPreferences.getInstance();
    final key = _favKey(lang);
    final list = prefs.getStringList(key) ?? <String>[];
    final encoded = _encodeRef(r);
    if (list.contains(encoded)) {
      list.remove(encoded);
    } else {
      list.add(encoded);
    }
    await prefs.setStringList(key, list);
  }

  Future<void> saveLastRead(String lang, BibleVerseRef r) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_lastKey(lang), _encodeRef(r));
  }

  Future<BibleVerseRef?> lastRead(String lang) async {
    final prefs = await SharedPreferences.getInstance();
    final encoded = prefs.getString(_lastKey(lang));
    if (encoded == null) return null;
    return _decodeRef(lang, encoded);
  }
}
