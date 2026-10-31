// Favoris, surlignages et taille de texte synchronisés au compte,
// 31 oct. 2026, lot 1 chantier 5 sur 6.
//
// Le local reste la source d'usage : tout fonctionne hors ligne et
// pour le visiteur, exactement comme avant. Pour un membre connecté,
// chaque changement local est marqué d'un horodatage, les retraits
// deviennent des marques de suppression datées, et la synchronisation
// échange l'ensemble avec le serveur : par élément, le dernier
// changement l'emporte, donc un retrait se propage au lieu de
// réapparaître depuis un autre appareil. Le serveur ne conserve que
// des références de versets (livre, chapitre, verset, langue),
// jamais le texte du verset. Silencieux : aucun nouvel écran, aucun
// message, un échec réseau ne bloque jamais la lecture.
import 'dart:async';
import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import 'api.dart';
import 'bible.dart';
import 'text_size.dart';

class BibleSync {
  BibleSync._();
  static final instance = BibleSync._();

  static const _langs = ['fr', 'en'];
  static const _metaKey = 'bible_sync_temps';
  static const _dirtyKey = 'bible_sync_dirty';

  bool _syncing = false;
  bool _syncedThisSession = false;
  Timer? _debounce;

  String _favKey(String lang) => 'bible_favorites_$lang';
  String _hlKey(String lang) => 'bible_highlights_$lang';
  String _favDelKey(String lang) => 'bible_favorites_deleted_$lang';
  String _hlDelKey(String lang) => 'bible_highlights_deleted_$lang';
  String _encode(BibleVerseRef r) => '${r.book}:${r.chapter}:${r.verse}';

  void attach() {
    textSize.onLevelChanged = () {
      unawaited(noteTextSizeChanged());
    };
  }

  Future<Map<String, int>> _meta() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final raw = prefs.getString(_metaKey);
      if (raw == null || raw.isEmpty) return {};
      final decoded = jsonDecode(raw);
      if (decoded is! Map) return {};
      final out = <String, int>{};
      decoded.forEach((k, v) {
        if (v is int) out[k.toString()] = v;
      });
      return out;
    } catch (_) {
      return {};
    }
  }

  Future<void> _saveMeta(Map<String, int> meta) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_metaKey, jsonEncode(meta));
    } catch (_) {}
  }

  Future<void> _setDirty() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool(_dirtyKey, true);
    } catch (_) {}
  }

  Future<bool> _isDirty() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      return prefs.getBool(_dirtyKey) ?? false;
    } catch (_) {
      return false;
    }
  }

  Future<void> _noteRef(String kind, String delKey, String lang, BibleVerseRef r, bool removed) async {
    final meta = await _meta();
    final key = '$kind:$lang:${_encode(r)}';
    final now = DateTime.now().millisecondsSinceEpoch;
    try {
      final prefs = await SharedPreferences.getInstance();
      final dels = prefs.getStringList(delKey) ?? <String>[];
      dels.removeWhere((d) => d.startsWith('${_encode(r)}:'));
      if (removed) {
        meta.remove(key);
        dels.add('${_encode(r)}:$now');
      } else {
        meta[key] = now;
      }
      await prefs.setStringList(delKey, dels);
    } catch (_) {}
    await _saveMeta(meta);
    await _setDirty();
  }

  Future<void> noteFavoriteChanged(String lang, BibleVerseRef r, bool removed) async {
    await _noteRef('f', _favDelKey(lang), lang, r, removed);
    pushDebounced();
  }

  Future<void> noteHighlightChanged(String lang, BibleVerseRef r, bool removed) async {
    await _noteRef('h', _hlDelKey(lang), lang, r, removed);
    pushDebounced();
  }

  Future<void> noteTextSizeChanged() async {
    final meta = await _meta();
    meta['taille'] = DateTime.now().millisecondsSinceEpoch;
    await _saveMeta(meta);
    await _setDirty();
    pushDebounced();
  }

  void pushDebounced() {
    if (!api.isConnected) return;
    _debounce?.cancel();
    _debounce = Timer(const Duration(seconds: 2), () {
      unawaited(sync());
    });
  }

  Future<bool> syncIfNeeded() async {
    if (!api.isConnected) return false;
    if (_syncedThisSession && !(await _isDirty())) return false;
    return sync();
  }

  Future<bool> sync() async {
    if (!api.isConnected || _syncing) return false;
    _syncing = true;
    try {
      final payload = await _buildPayload();
      final data = await api.pushBibleSync(payload);
      final changed = await _applyServerState(data);
      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool(_dirtyKey, false);
      _syncedThisSession = true;
      return changed;
    } catch (_) {
      return false;
    } finally {
      _syncing = false;
    }
  }

  Map<String, dynamic> _item(String kind, String lang, BibleVerseRef r, int stamp) {
    return {
      'livre': r.book,
      'chapitre': r.chapter,
      'verset': r.verse,
      'langue': lang,
      'modifie_le': DateTime.fromMillisecondsSinceEpoch(stamp, isUtc: true).toIso8601String(),
      'supprime': false,
    };
  }

  Map<String, dynamic>? _tombstone(String lang, String d) {
    final parts = d.split(':');
    if (parts.length != 4) return null;
    final book = int.tryParse(parts[0]);
    final chapter = int.tryParse(parts[1]);
    final verse = int.tryParse(parts[2]);
    final stamp = int.tryParse(parts[3]);
    if (book == null || chapter == null || verse == null || stamp == null) return null;
    return {
      'livre': book,
      'chapitre': chapter,
      'verset': verse,
      'langue': lang,
      'modifie_le': DateTime.fromMillisecondsSinceEpoch(stamp, isUtc: true).toIso8601String(),
      'supprime': true,
    };
  }

  Future<Map<String, dynamic>> _buildPayload() async {
    final meta = await _meta();
    final prefs = await SharedPreferences.getInstance();
    final now = DateTime.now().millisecondsSinceEpoch;
    var stamped = false;
    final favs = <Map<String, dynamic>>[];
    final hls = <Map<String, dynamic>>[];
    for (final lang in _langs) {
      for (final r in await BibleService.instance.favorites(lang)) {
        final key = 'f:$lang:${_encode(r)}';
        var stamp = meta[key];
        if (stamp == null) {
          // Première synchronisation d'un compte existant : ses favoris
          // déjà accumulés partent avec l'instant présent, sans rien
          // effacer côté serveur, qui ne contient encore rien d'eux.
          stamp = now;
          meta[key] = stamp;
          stamped = true;
        }
        favs.add(_item('f', lang, r, stamp));
      }
      for (final r in await BibleService.instance.highlights(lang)) {
        final key = 'h:$lang:${_encode(r)}';
        var stamp = meta[key];
        if (stamp == null) {
          stamp = now;
          meta[key] = stamp;
          stamped = true;
        }
        hls.add(_item('h', lang, r, stamp));
      }
      for (final d in prefs.getStringList(_favDelKey(lang)) ?? const <String>[]) {
        final t = _tombstone(lang, d);
        if (t != null) favs.add(t);
      }
      for (final d in prefs.getStringList(_hlDelKey(lang)) ?? const <String>[]) {
        final t = _tombstone(lang, d);
        if (t != null) hls.add(t);
      }
    }
    var tailleStamp = meta['taille'];
    if (tailleStamp == null) {
      tailleStamp = now;
      meta['taille'] = tailleStamp;
      stamped = true;
    }
    if (stamped) await _saveMeta(meta);
    return {
      'favoris': favs,
      'surlignages': hls,
      'taille_texte': {
        'niveau': textSize.level,
        'modifie_le': DateTime.fromMillisecondsSinceEpoch(tailleStamp, isUtc: true).toIso8601String(),
      },
    };
  }

  Future<bool> _applyServerState(Map<String, dynamic> data) async {
    final prefs = await SharedPreferences.getInstance();
    final meta = await _meta();
    var changed = false;

    void apply(dynamic raw, String kind, Map<String, List<String>> actives, Map<String, List<String>> dels) {
      if (raw is! List) return;
      for (final e in raw) {
        if (e is! Map) continue;
        final book = e['livre'] is int ? e['livre'] as int : int.tryParse('${e['livre']}');
        final chapter = e['chapitre'] is int ? e['chapitre'] as int : int.tryParse('${e['chapitre']}');
        final verse = e['verset'] is int ? e['verset'] as int : int.tryParse('${e['verset']}');
        final lang = '${e['langue']}';
        final epoch = DateTime.tryParse('${e['modifie_le']}')?.millisecondsSinceEpoch;
        if (book == null || chapter == null || verse == null || !_langs.contains(lang) || epoch == null) continue;
        final ref = '$book:$chapter:$verse';
        final key = '$kind:$lang:$ref';
        if (e['supprime'] == true) {
          (dels[lang] ??= []).add('$ref:$epoch');
          meta.remove(key);
        } else {
          (actives[lang] ??= []).add(ref);
          meta[key] = epoch;
        }
      }
    }

    final favActives = <String, List<String>>{};
    final favDels = <String, List<String>>{};
    final hlActives = <String, List<String>>{};
    final hlDels = <String, List<String>>{};
    apply(data['favoris'], 'f', favActives, favDels);
    apply(data['surlignages'], 'h', hlActives, hlDels);

    Future<void> write(String kind, Map<String, List<String>> actives, Map<String, List<String>> dels) async {
      for (final lang in _langs) {
        final actKey = kind == 'f' ? _favKey(lang) : _hlKey(lang);
        final delKey = kind == 'f' ? _favDelKey(lang) : _hlDelKey(lang);
        final oldActive = prefs.getStringList(actKey) ?? <String>[];
        final oldDel = prefs.getStringList(delKey) ?? <String>[];
        final newActive = actives[lang] ?? <String>[];
        final newDel = dels[lang] ?? <String>[];
        if (oldActive.join(',') != newActive.join(',') || oldDel.join(',') != newDel.join(',')) {
          changed = true;
        }
        await prefs.setStringList(actKey, newActive);
        await prefs.setStringList(delKey, newDel);
      }
    }

    await write('f', favActives, favDels);
    await write('h', hlActives, hlDels);
    await _saveMeta(meta);

    // Taille de texte : le dernier choix enregistré l'emporte.
    final taille = data['taille_texte'];
    if (taille is Map) {
      final niveau = taille['niveau'] is int ? taille['niveau'] as int : int.tryParse('${taille['niveau']}');
      final epoch = DateTime.tryParse('${taille['modifie_le']}')?.millisecondsSinceEpoch;
      final localEpoch = meta['taille'];
      if (niveau != null && epoch != null && (localEpoch == null || epoch > localEpoch)) {
        if (textSize.level != niveau) {
          await textSize.applyRemoteLevel(niveau);
          changed = true;
        }
        final m2 = await _meta();
        m2['taille'] = epoch;
        await _saveMeta(m2);
      }
    }
    return changed;
  }
}
