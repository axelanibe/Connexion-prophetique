// Bible hors ligne, texte réel, sans verset inventé.
//
// Sources, toutes deux dans le domaine public :
// - français : Louis Segond 1910, dépôt BibleCorps FRA-B-LSG1910-PD-UBS,
//   fichiers SFM convertis tels quels, sans retouche du texte ;
// - anglais : King James Version, fichier JSON thiagobodruk/bible en_kjv.json.
// Le fichier embarqué `assets/bible.json` contient les 66 livres dans
// chaque langue, avec leurs chapitres et leurs versets, dans l'ordre
// canonique. Les favoris et les surlignages sont conservés sur
// l'appareil, avec shared_preferences, et synchronisés au compte pour
// le membre connecté depuis le 31 oct. 2026 (chantier 5) ; pour le
// visiteur, rien ne part jamais vers un serveur. La reprise de lecture
// reste locale.
//
// Note de numérotation : la source française compte certains titres de
// psaumes comme un verset à part, d'où 31 170 versets en français contre
// 31 102 en anglais. Les références affichées suivent la source de la
// langue choisie, sans réécriture.
import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
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
      // Version web, 28 oct. 2026 : le fichier Bible complet de 8 Mo
      // ne peut pas être déposé dans le dépôt par l'outil GitHub,
      // qui refuse les requêtes trop lourdes, donc il manque en
      // ligne, alors qu'il est embarqué dans l'APK. Sur le web,
      // si le fichier embarqué manque ou n'est qu'un extrait,
      // la Bible est reconstituée à partir de ses 4 morceaux
      // texte déposés dans le dépôt, dans l'ordre, sans rien
      // changer sur téléphone, où le fichier embarqué suffit.
      String? raw;
      try {
        raw = await rootBundle.loadString('assets/bible.json');
      } catch (_) {
        raw = null;
      }
      if (kIsWeb && (raw == null || !raw.contains('Genèse'))) {
        final buf = StringBuffer();
        for (var i = 1; i <= 4; i++) {
          final res = await http.get(Uri.parse('assets/assets/bible.json.part$i'));
          if (res.statusCode != 200) throw Exception('Morceau Bible $i indisponible.');
          // Octets bruts décodés en UTF-8, et non le texte de la
          // réponse : le serveur sert ces morceaux sans jeu de
          // caractères, et le navigateur les relisait en Latin-1,
          // ce qui déformait les accents, Genèse en GenÃ¨se.
          buf.write(utf8.decode(res.bodyBytes));
        }
        raw = buf.toString();
      }
      if (raw == null) throw Exception('Bible indisponible.');
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

  // Textes sans accents, préparés une seule fois par langue, 27 oct. 2026 :
  // avant, la recherche retirait les accents de chaque verset à chaque
  // recherche, soit plus de 31 000 passages relus sur le fil principal,
  // ce qui figeait l'écran sur téléphone et donnait l'impression que
  // la recherche ne fonctionnait pas. Avec ce cache, une recherche
  // devient une simple recherche de sous-chaîne, immédiate.
  final Map<String, List<List<List<String>>>> _stripped = {};

  List<List<List<String>>> _strippedBooks(String lang) {
    final cached = _stripped[lang];
    if (cached != null) return cached;
    final list = books(lang);
    final built = list
        .map((b) => b.chapters
            .map((c) => c.map((v) => _stripAccents(v)).toList())
            .toList())
        .toList();
    _stripped[lang] = built;
    return built;
  }

  /// Recherche dans tout le texte de la langue, sans accents, 100 résultats max.
  List<BibleHit> search(String lang, String query) {
    final q = _stripAccents(query.trim());
    if (q.isEmpty) return [];
    final hits = <BibleHit>[];
    final list = books(lang);
    final stripped = _strippedBooks(lang);
    for (var bi = 0; bi < list.length; bi++) {
      final chapters = list[bi].chapters;
      final strippedChapters = stripped[bi];
      for (var ci = 0; ci < chapters.length; ci++) {
        final verses = chapters[ci];
        final strippedVerses = strippedChapters[ci];
        for (var vi = 0; vi < verses.length; vi++) {
          if (strippedVerses[vi].contains(q) ||
              _stripAccents('${list[bi].name} ${ci + 1}:${vi + 1}').contains(q)) {
            hits.add(BibleHit(bi, ci + 1, vi + 1, verses[vi]));
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

  // Verset qui change à chaque ouverture, comme sur la version web :
  // à chaque lancement, le verset suivant de la liste est montré, sans
  // répétition tant que les 26 n'ont pas tous été proposés. Pendant une
  // même ouverture, toutes les cartes affichent le même verset.
  final Map<String, BibleVerseRef> _rotating = {};
  final Map<String, int> _rotatingIndex = {};

  int rotatingIndex(String lang) => _rotatingIndex[lang] ?? -1;

  Future<BibleVerseRef> rotatingVerse(String lang) async {
    await load();
    final cached = _rotating[lang];
    if (cached != null) return cached;
    final prefs = await SharedPreferences.getInstance();
    final key = 'verse_rot_$lang';
    final last = prefs.getInt(key) ?? -1;
    final next = (last + 1) % kDailyVerses.length;
    await prefs.setInt(key, next);
    final ref = kDailyVerses[next];
    final text = verseText(lang, ref[0], ref[1], ref[2]);
    final out = (text != null && text.isNotEmpty)
        ? BibleVerseRef(ref[0], ref[1], ref[2], text)
        : dailyVerse(lang);
    _rotating[lang] = out;
    _rotatingIndex[lang] = next;
    return out;
  }

  // Passe au verset suivant, à la demande, sans attendre la prochaine ouverture.
  Future<BibleVerseRef> advanceVerse(String lang) async {
    await load();
    final prefs = await SharedPreferences.getInstance();
    final key = 'verse_rot_$lang';
    final last = prefs.getInt(key) ?? -1;
    final next = (last + 1) % kDailyVerses.length;
    await prefs.setInt(key, next);
    final ref = kDailyVerses[next];
    final text = verseText(lang, ref[0], ref[1], ref[2]);
    final out = (text != null && text.isNotEmpty)
        ? BibleVerseRef(ref[0], ref[1], ref[2], text)
        : dailyVerse(lang);
    _rotating[lang] = out;
    _rotatingIndex[lang] = next;
    return out;
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

  // Versets soulignés, 27 oct. 2026 : même conservation que les
  // favoris, synchronisée au compte pour le membre connecté depuis
  // le 31 oct. 2026, jamais envoyée pour le visiteur.
  // Un verset souligné s'affiche avec un soulignement or dans le
  // chapitre, et se retrouve dans la section Versets soulignés.
  String _hlKey(String lang) => 'bible_highlights_$lang';

  Future<List<BibleVerseRef>> highlights(String lang) async {
    final prefs = await SharedPreferences.getInstance();
    final out = <BibleVerseRef>[];
    for (final e in prefs.getStringList(_hlKey(lang)) ?? const <String>[]) {
      final r = _decodeRef(lang, e);
      if (r != null) out.add(r);
    }
    return out;
  }

  Future<void> toggleHighlight(String lang, BibleVerseRef r) async {
    final prefs = await SharedPreferences.getInstance();
    final key = _hlKey(lang);
    final list = prefs.getStringList(key) ?? <String>[];
    final encoded = _encodeRef(r);
    if (list.contains(encoded)) {
      list.remove(encoded);
    } else {
      list.add(encoded);
    }
    await prefs.setStringList(key, list);
  }

  // Mots du dictionnaire soulignés, 27 oct. 2026 : clé français +
  // numéro Strong, indépendante de la langue d'interface, car le
  // mot est le même dans les deux langues. Conservé sur l'appareil
  // seulement, comme les versets soulignés.
  Future<Set<String>> wordHighlights() async {
    final prefs = await SharedPreferences.getInstance();
    return (prefs.getStringList('bible_word_highlights') ?? const <String>[]).toSet();
  }

  Future<void> toggleWordHighlight(String key) async {
    final prefs = await SharedPreferences.getInstance();
    final list = prefs.getStringList('bible_word_highlights') ?? <String>[];
    if (list.contains(key)) {
      list.remove(key);
    } else {
      list.add(key);
    }
    await prefs.setStringList('bible_word_highlights', list);
  }

  // Mots soulignés dans un verset, carte 54, 6 nov. 2026 : le texte
  // biblique n'est jamais changé, seul l'index du mot est gardé,
  // par langue et par référence de verset, en local seulement.
  // Le serveur ne connaît que des références de versets entiers,
  // sans champ pour un index de mot, donc ce soulignement ne part
  // pas vers le serveur, même pour un membre connecté, et ne
  // bloque jamais la lecture. Clé : livre:chapitre:verset:index.
  String _verseWordKey(String lang) => 'bible_verse_word_highlights_$lang';

  String _encodeVerseWord(BibleVerseRef r, int index) =>
      '${r.book}:${r.chapter}:${r.verse}:$index';

  Future<Set<int>> verseWordIndexes(String lang, BibleVerseRef r) async {
    final prefs = await SharedPreferences.getInstance();
    final prefix = _encodeRef(r);
    final out = <int>{};
    for (final e in prefs.getStringList(_verseWordKey(lang)) ?? const <String>[]) {
      if (!e.startsWith('$prefix:')) continue;
      final index = int.tryParse(e.substring(prefix.length + 1));
      if (index != null) out.add(index);
    }
    return out;
  }

  Future<void> toggleVerseWord(String lang, BibleVerseRef r, int index) async {
    final prefs = await SharedPreferences.getInstance();
    final key = _verseWordKey(lang);
    final list = prefs.getStringList(key) ?? <String>[];
    final encoded = _encodeVerseWord(r, index);
    if (list.contains(encoded)) {
      list.remove(encoded);
    } else {
      list.add(encoded);
    }
    await prefs.setStringList(key, list);
  }

  // Lecture d'un chapitre entier en une seule lecture, carte 54 :
  // un appel SharedPreferences par verset serait trop lent.
  Future<Map<int, Set<int>>> verseWordIndexesForChapter(
      String lang, int book, int chapter, int verseCount) async {
    final prefs = await SharedPreferences.getInstance();
    final out = <int, Set<int>>{};
    for (final e in prefs.getStringList(_verseWordKey(lang)) ?? const <String>[]) {
      final parts = e.split(':');
      if (parts.length != 4) continue;
      if (int.tryParse(parts[0]) != book || int.tryParse(parts[1]) != chapter) continue;
      final verse = int.tryParse(parts[2]);
      final index = int.tryParse(parts[3]);
      if (verse == null || index == null || verse < 1 || verse > verseCount) continue;
      (out[verse] ??= <int>{}).add(index);
    }
    return out;
  }

  Future<void> clearVerseWords(String lang, BibleVerseRef r) async {
    final prefs = await SharedPreferences.getInstance();
    final key = _verseWordKey(lang);
    final prefix = _encodeRef(r);
    final list = (prefs.getStringList(key) ?? <String>[])
        .where((e) => !e.startsWith('$prefix:'))
        .toList();
    await prefs.setStringList(key, list);
  }

  // Annotations de verset, carte 59, 6 nov. 2026 : note,
  // étiquette, lien vers un autre verset, relation entre deux
  // versets, couleur de surlignage. Tout est gardé en local
  // seulement, jamais envoyé au serveur, sans rien inventer :
  // une annotation vide n'existe pas, elle est retirée.
  // Format gardé : référence::valeur encodée, par exemple
  // 0:1:1::Jean%203%3A16 pour un lien.
  String _metaKey(String kind, String lang) => 'bible_verse_${kind}_$lang';

  Future<String?> _metaValue(String kind, String lang, BibleVerseRef r) async {
    final prefs = await SharedPreferences.getInstance();
    final prefix = '${_encodeRef(r)}::';
    for (final e in prefs.getStringList(_metaKey(kind, lang)) ?? const <String>[]) {
      if (e.startsWith(prefix)) return Uri.decodeComponent(e.substring(prefix.length));
    }
    return null;
  }

  Future<void> _setMeta(String kind, String lang, BibleVerseRef r, String value) async {
    final prefs = await SharedPreferences.getInstance();
    final key = _metaKey(kind, lang);
    final prefix = '${_encodeRef(r)}::';
    final list = (prefs.getStringList(key) ?? const <String>[]).where((e) => !e.startsWith(prefix)).toList();
    list.add('$prefix${Uri.encodeComponent(value)}');
    await prefs.setStringList(key, list);
  }

  Future<void> _removeMeta(String kind, String lang, BibleVerseRef r) async {
    final prefs = await SharedPreferences.getInstance();
    final key = _metaKey(kind, lang);
    final prefix = '${_encodeRef(r)}::';
    final list = (prefs.getStringList(key) ?? const <String>[]).where((e) => !e.startsWith(prefix)).toList();
    await prefs.setStringList(key, list);
  }

  Future<String?> verseNote(String lang, BibleVerseRef r) => _metaValue('notes', lang, r);

  Future<void> saveVerseNote(String lang, BibleVerseRef r, String note) =>
      note.trim().isEmpty ? _removeMeta('notes', lang, r) : _setMeta('notes', lang, r, note.trim());

  Future<String?> verseTag(String lang, BibleVerseRef r) => _metaValue('tags', lang, r);

  Future<void> saveVerseTag(String lang, BibleVerseRef r, String tag) =>
      tag.trim().isEmpty ? _removeMeta('tags', lang, r) : _setMeta('tags', lang, r, tag.trim());

  Future<String?> verseLink(String lang, BibleVerseRef r) => _metaValue('links', lang, r);

  Future<void> saveVerseLink(String lang, BibleVerseRef r, String target) =>
      target.trim().isEmpty ? _removeMeta('links', lang, r) : _setMeta('links', lang, r, target.trim());

  Future<String?> verseRelation(String lang, BibleVerseRef r) => _metaValue('relations', lang, r);

  Future<void> saveVerseRelation(String lang, BibleVerseRef r, String relation) =>
      relation.trim().isEmpty ? _removeMeta('relations', lang, r) : _setMeta('relations', lang, r, relation.trim());

  // Couleur de surlignage d'un verset, carte 59 : la valeur
  // gardée est le code hexadécimal de la couleur, par exemple
  // FF1FB6A6 pour le turquoise, sans dièse.
  Future<Map<int, Color>> verseColorsForChapter(String lang, int book, int chapter, int verseCount) async {
    final prefs = await SharedPreferences.getInstance();
    final out = <int, Color>{};
    for (final e in prefs.getStringList(_metaKey('colors', lang)) ?? const <String>[]) {
      final parts = e.split('::');
      if (parts.length != 2) continue;
      final refParts = parts[0].split(':');
      if (refParts.length != 3) continue;
      if (int.tryParse(refParts[0]) != book || int.tryParse(refParts[1]) != chapter) continue;
      final verse = int.tryParse(refParts[2]);
      final hex = int.tryParse(parts[1], radix: 16);
      if (verse == null || hex == null || verse < 1 || verse > verseCount) continue;
      out[verse] = Color(hex);
    }
    return out;
  }

  Future<void> setVerseColor(String lang, BibleVerseRef r, Color? color) async {
    if (color == null) {
      await _removeMeta('colors', lang, r);
      return;
    }
    // ignore: deprecated_member_use
    final hex = color.value.toRadixString(16).toUpperCase().padLeft(8, '0');
    await _setMeta('colors', lang, r, hex);
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
