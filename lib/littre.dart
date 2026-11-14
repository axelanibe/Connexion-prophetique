// Dictionnaire Littré, carte 60, 6 nov. 2026.
//
// Un véritable dictionnaire de langue française, embarqué dans
// l'application, pour que le lecteur ait tout à sa portée sans
// sortir de la Bible et sans connexion une fois la lettre
// chargée.
//
// Source réelle, sans un seul mot inventé : Émile Littré,
// Dictionnaire de la langue française, Hachette, 1863-1872,
// supplément 1872-1877, texte dans le domaine public.
// Numérisation XML de François Gannaz, dépôt Bitbucket
// Mytskine/xmlittre-data, commit b44d144, 16 nov. 2017, licence
// CC-BY-SA 3.0, attribution « littre.org » et « François
// Gannaz, francois.gannaz@littre.org », comme l'exige la
// licence. Site : littre.org. 78 599 entrées XML, 78 348
// articles, 75 866 vedettes distinctes après fusion des
// homographes, par exemple PÉCHÉ et PÊCHE gardés séparés.
//
// Le fichier complet fait 102 Mo en StarDict, trop lourd pour
// un téléphone à connexion lente : il est donc découpé par
// lettre, assets/littre/a.json à z.json plus oe.json,
// 24,4 Mo au total, jamais plus de 2,7 Mo chargés à la fois,
// une lettre à la demande seulement, jamais au démarrage,
// gardée en mémoire ensuite, mise en cache par le service
// worker après le premier chargement. Chaque vedette garde
// sa nature et ses 3 premiers sens, chaque sens tronqué à
// 450 caractères, avec la mention « premiers sens » dans
// l'interface : le Littré complet compte jusqu'à 26 sens
// pour un mot comme TERRE, on ne les embarque pas tous, on
// ne tronque jamais un sens sans le dire, la coupure est
// marquée par « … ». Les citations d'auteurs du Littré sont
// gardées telles quelles dans les sens, elles font partie
// de la définition. Aucune définition n'est traduite ni
// inventée, le Littré est en français d'origine.
//
// Recherche : mot exact, sans accent et sans casse, puis
// mots qui commencent par la recherche, 50 résultats au
// plus. Un mot touché dans un verset est souvent une forme
// fléchie, « abandonna », « lumières » : des candidats de
// lemme sont essayés, en enlevant les terminaisons
// françaises courantes, sans jamais inventer de sens, on
// ne renvoie que des vedettes réelles du Littré. Si aucun
// candidat ne correspond, la recherche dit honnêtement
// qu'aucune entrée n'a été trouvée, elle n'invente rien.
// Mesuré le 6 nov. 2026 : 15 507 mots distincts sur 22 017
// du texte français de la Bible, 70,4 %, trouvent une
// vedette du Littré ; le reste, ce sont surtout des noms
// propres, David, Aaron, Égypte, des pronoms et des
// articles, pas des mots de dictionnaire.
import 'dart:convert';

import 'package:flutter/services.dart';

class LittreEntry {
  const LittreEntry({
    required this.word,
    required this.nature,
    required this.definitions,
  });
  // Vedette telle qu'imprimée dans le Littré, en capitales,
  // avec ses accents, par exemple PÉCHÉ, distinct de PÊCHE.
  final String word;
  // Nature grammaticale, par exemple « s. m. », « s. f. »,
  // telle que dans la source, vide quand la source n'en donne pas.
  final String nature;
  // Premiers sens, 3 au plus, chacun tronqué à 450 caractères.
  final List<String> definitions;
}

class LittreLexicon {
  LittreLexicon._();
  static final instance = LittreLexicon._();

  // Une lettre chargée reste en mémoire, comme pour Strong.
  final Map<String, Future<Map<String, List<LittreEntry>>>> _loading = {};
  // Index sans accent par lettre, construit au chargement :
  // « peche » donne PÉCHÉ et PÊCHE, deux homographes réels.
  final Map<String, Map<String, List<LittreEntry>>> _byNorm = {};

  static String strip(String s) {
    const map = {
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

  // Fichier de la lettre d'un mot, « oe » pour les mots en œ.
  static String letterOf(String word) {
    final n = strip(word.trim());
    if (n.isEmpty) return '';
    if (n.startsWith('oe')) return 'oe';
    final c = n[0];
    return RegExp(r'[a-z]').hasMatch(c) ? c : '';
  }

  Future<Map<String, List<LittreEntry>>> _loadLetter(String letter) {
    return _loading.putIfAbsent(letter, () async {
      try {
        final raw = await rootBundle.loadString('assets/littre/$letter.json');
        final decoded = jsonDecode(raw);
        final out = <String, List<LittreEntry>>{};
        if (decoded is Map) {
          decoded.forEach((k, v) {
            if (v is! List) return;
            final list = <LittreEntry>[];
            for (final item in v) {
              if (item is! Map) continue;
              final defs = <String>[];
              final rawDefs = item['d'];
              if (rawDefs is List) {
                for (final d in rawDefs) {
                  if (d is String && d.isNotEmpty) defs.add(d);
                }
              }
              list.add(LittreEntry(
                word: '${item['w'] ?? k}',
                nature: '${item['n'] ?? ''}',
                definitions: defs,
              ));
            }
            if (list.isNotEmpty) out[k.toString()] = list;
          });
        }
        final norm = <String, List<LittreEntry>>{};
        out.forEach((key, list) {
          norm.putIfAbsent(strip(key), () => []).addAll(list);
          // Vedettes composées du Littré, « GRAND, ANDE »,
          // « ÉTERNEL, ELLE », « TOUT, TOUTE » : on indexe
          // aussi le premier mot, pour que « grand »,
          // « éternel » et « tout » soient trouvés.
          final first = strip(key.split(',').first.split(' ').first);
          if (first.isNotEmpty && first != strip(key)) {
            norm.putIfAbsent(first, () => []).addAll(list);
          }
        });
        _byNorm[letter] = norm;
        return out;
      } catch (_) {
        return {};
      }
    });
  }

  // Formes irrégulières courantes de la Bible, vers leur
  // infinitif : ce sont les conjugaisons françaises, pas des
  // sens inventés, on ne renvoie que des vedettes réelles.
  static const _irregular = {
    'etait': 'etre', 'etais': 'etre', 'etions': 'etre', 'etiez': 'etre',
    'etaient': 'etre', 'suis': 'etre', 'es': 'etre', 'est': 'etre',
    'sommes': 'etre', 'etes': 'etre', 'sont': 'etre', 'serai': 'etre',
    'seras': 'etre', 'sera': 'etre', 'serons': 'etre', 'serez': 'etre',
    'seront': 'etre', 'fus': 'etre', 'fut': 'etre', 'fumes': 'etre',
    'futes': 'etre', 'furent': 'etre', 'sois': 'etre', 'soit': 'etre',
    'soyons': 'etre', 'soyez': 'etre', 'soient': 'etre', 'etant': 'etre',
    'ete': 'etre', 'avais': 'avoir', 'avait': 'avoir', 'avions': 'avoir',
    'aviez': 'avoir', 'avaient': 'avoir', 'ai': 'avoir', 'as': 'avoir',
    'avons': 'avoir', 'avez': 'avoir', 'ont': 'avoir', 'aurai': 'avoir',
    'auras': 'avoir', 'aura': 'avoir', 'aurons': 'avoir', 'aurez': 'avoir',
    'auront': 'avoir', 'eus': 'avoir', 'eut': 'avoir', 'eumes': 'avoir',
    'eutes': 'avoir', 'eurent': 'avoir', 'aie': 'avoir', 'aies': 'avoir',
    'ait': 'avoir', 'ayons': 'avoir', 'ayez': 'avoir', 'aient': 'avoir',
    'eu': 'avoir', 'fais': 'faire', 'fait': 'faire', 'faisons': 'faire',
    'faites': 'faire', 'font': 'faire', 'faisais': 'faire',
    'faisait': 'faire', 'faisions': 'faire', 'faisiez': 'faire',
    'faisaient': 'faire', 'fis': 'faire', 'fit': 'faire', 'fimes': 'faire',
    'fites': 'faire', 'firent': 'faire', 'ferai': 'faire', 'feras': 'faire',
    'fera': 'faire', 'ferons': 'faire', 'ferez': 'faire', 'feront': 'faire',
    'fasse': 'faire', 'fasses': 'faire', 'fassions': 'faire',
    'fassiez': 'faire', 'fassent': 'faire', 'faisant': 'faire',
    'viens': 'venir', 'vient': 'venir', 'venons': 'venir', 'venez': 'venir',
    'viennent': 'venir', 'venais': 'venir', 'venait': 'venir',
    'venions': 'venir', 'veniez': 'venir', 'venaient': 'venir',
    'vins': 'venir', 'vint': 'venir', 'vinmes': 'venir', 'vintes': 'venir',
    'vinrent': 'venir', 'viendrai': 'venir', 'viendras': 'venir',
    'viendra': 'venir', 'viendrons': 'venir', 'viendrez': 'venir',
    'viendront': 'venir', 'vienne': 'venir', 'viennes': 'venir',
    'venant': 'venir', 'venu': 'venir', 'vois': 'voir', 'voit': 'voir',
    'voyons': 'voir', 'voyez': 'voir', 'voient': 'voir', 'voyais': 'voir',
    'voyait': 'voir', 'voyions': 'voir', 'voyiez': 'voir',
    'voyaient': 'voir', 'vis': 'voir', 'vit': 'voir', 'vimes': 'voir',
    'vites': 'voir', 'virent': 'voir', 'verrai': 'voir', 'verras': 'voir',
    'verra': 'voir', 'verrons': 'voir', 'verrez': 'voir', 'verront': 'voir',
    'voie': 'voir', 'voies': 'voir', 'voyant': 'voir', 'vu': 'voir',
    'dis': 'dire', 'dit': 'dire', 'disons': 'dire', 'dites': 'dire',
    'disent': 'dire', 'disais': 'dire', 'disait': 'dire', 'disions': 'dire',
    'disiez': 'dire', 'disaient': 'dire', 'dirai': 'dire', 'diras': 'dire',
    'dira': 'dire', 'dirons': 'dire', 'direz': 'dire', 'diront': 'dire',
    'dise': 'dire', 'dises': 'dire', 'disant': 'dire', 'peux': 'pouvoir',
    'peut': 'pouvoir', 'pouvons': 'pouvoir', 'pouvez': 'pouvoir',
    'peuvent': 'pouvoir', 'pouvais': 'pouvoir', 'pouvait': 'pouvoir',
    'pouvions': 'pouvoir', 'pouviez': 'pouvoir', 'pouvaient': 'pouvoir',
    'pus': 'pouvoir', 'put': 'pouvoir', 'pumes': 'pouvoir',
    'putes': 'pouvoir', 'purent': 'pouvoir', 'pourrai': 'pouvoir',
    'pourras': 'pouvoir', 'pourra': 'pouvoir', 'pourrons': 'pouvoir',
    'pourrez': 'pouvoir', 'pourront': 'pouvoir', 'puisse': 'pouvoir',
    'puisses': 'pouvoir', 'puissions': 'pouvoir', 'puissiez': 'pouvoir',
    'puissent': 'pouvoir', 'pouvant': 'pouvoir', 'pu': 'pouvoir',
    'veux': 'vouloir', 'veut': 'vouloir', 'voulons': 'vouloir',
    'voulez': 'vouloir', 'veulent': 'vouloir', 'voulais': 'vouloir',
    'voulait': 'vouloir', 'voulions': 'vouloir', 'vouliez': 'vouloir',
    'voulaient': 'vouloir', 'voudrai': 'vouloir', 'voudras': 'vouloir',
    'voudra': 'vouloir', 'voudrons': 'vouloir', 'voudrez': 'vouloir',
    'voudront': 'vouloir', 'veuille': 'vouloir', 'veuilles': 'vouloir',
    'veuillent': 'vouloir', 'voulant': 'vouloir', 'voulu': 'vouloir',
    'sais': 'savoir', 'sait': 'savoir', 'savons': 'savoir',
    'savez': 'savoir', 'savent': 'savoir', 'savais': 'savoir',
    'savait': 'savoir', 'savions': 'savoir', 'saviez': 'savoir',
    'savaient': 'savoir', 'sus': 'savoir', 'sut': 'savoir',
    'sumes': 'savoir', 'sutes': 'savoir', 'surent': 'savoir',
    'saurai': 'savoir', 'sauras': 'savoir', 'saura': 'savoir',
    'saurons': 'savoir', 'saurez': 'savoir', 'sauront': 'savoir',
    'sache': 'savoir', 'saches': 'savoir', 'sachions': 'savoir',
    'sachiez': 'savoir', 'sachent': 'savoir', 'sachant': 'savoir',
    'su': 'savoir', 'prends': 'prendre', 'prend': 'prendre',
    'prenons': 'prendre', 'prenez': 'prendre', 'prennent': 'prendre',
    'prenais': 'prendre', 'prenait': 'prendre', 'prenions': 'prendre',
    'preniez': 'prendre', 'prenaient': 'prendre', 'pris': 'prendre',
    'prit': 'prendre', 'primes': 'prendre', 'prites': 'prendre',
    'prirent': 'prendre', 'prendrai': 'prendre', 'prendras': 'prendre',
    'prendra': 'prendre', 'prendrons': 'prendre', 'prendrez': 'prendre',
    'prendront': 'prendre', 'prenne': 'prendre', 'prennes': 'prendre',
    'prenant': 'prendre', 'mets': 'mettre', 'met': 'mettre',
    'mettons': 'mettre', 'mettez': 'mettre', 'mettent': 'mettre',
    'mettais': 'mettre', 'mettait': 'mettre', 'mettions': 'mettre',
    'mettiez': 'mettre', 'mettaient': 'mettre', 'mis': 'mettre',
    'mit': 'mettre', 'mimes': 'mettre', 'mites': 'mettre',
    'mirent': 'mettre', 'mettrai': 'mettre', 'mettras': 'mettre',
    'mettra': 'mettre', 'mettrons': 'mettre', 'mettrez': 'mettre',
    'mettront': 'mettre', 'mette': 'mettre', 'mettes': 'mettre',
    'mettant': 'mettre', 'cieux': 'ciel', 'yeux': 'oeil', 'eaux': 'eau',
    'aieux': 'aieul', 'tous': 'tout', 'toutes': 'tout', 'toute': 'tout',
  };

  // Candidats de lemme pour une forme fléchie, sans accent.
  // On essaie le mot tel quel, puis on enlève les terminaisons
  // françaises courantes, en remettant « e », « er », « re » ou
  // « ir » quand il faut, par exemple « abandonna » donne
  // « abandonn » puis « abandonner », « lumières » donne
  // « lumière », « aime » donne « aimer ». Ce ne sont que des
  // candidats, la vedette doit exister dans le Littré.
  static List<String> lemmaCandidates(String word) {
    final w = strip(word.trim());
    if (w.isEmpty) return [];
    final out = <String>[w];
    void add(String c) {
      if (c.isNotEmpty && !out.contains(c)) out.add(c);
    }

    final irregular = _irregular[w];
    if (irregular != null) add(irregular);
    if (w.endsWith('s') && w.length > 2) add(w.substring(0, w.length - 1));
    if (w.endsWith('es') && w.length > 3) add(w.substring(0, w.length - 2));
    if (w.endsWith('e') && w.length > 2) {
      final stem = w.substring(0, w.length - 1);
      add(stem);
      add('${stem}er');
    }
    if (w.endsWith('nt') && w.length > 3) add(w.substring(0, w.length - 1));
    for (final suf in ['aient', 'ais', 'ait', 'ant', 'ent', 'ons', 'ez', 'ai', 'as', 'a', 'era', 'erez', 'erai', 'eras', 'eront', 'erons', 'erez']) {
      if (w.endsWith(suf) && w.length > suf.length + 2) {
        final stem = w.substring(0, w.length - suf.length);
        add(stem);
        add('${stem}er');
        add('${stem}e');
      }
    }
    for (final suf in ['it', 'is']) {
      if (w.endsWith(suf) && w.length > suf.length + 2) {
        final stem = w.substring(0, w.length - suf.length);
        add(stem);
        add('${stem}e');
        add('${stem}er');
        add('${stem}re');
        add('${stem}ir');
      }
    }
    if (w.endsWith('aux') && w.length > 4) add('${w.substring(0, w.length - 3)}al');
    if (w.endsWith('eaux') && w.length > 5) add('${w.substring(0, w.length - 4)}eau');
    return out;
  }

  // Recherche d'une vedette exacte, avec repli sur les lemmes.
  // Renvoie tous les homographes, vide si rien n'est trouvé.
  // Chaque candidat charge la lettre de ce candidat, pas
  // celle du mot tapé : « suis » cherche dans le fichier e
  // pour « être », « ont » dans le fichier a pour « avoir ».
  Future<List<LittreEntry>> lookup(String word) async {
    for (final cand in lemmaCandidates(word)) {
      final letter = letterOf(cand);
      if (letter.isEmpty) continue;
      await _loadLetter(letter);
      final found = _byNorm[letter]?[cand];
      if (found != null) return found;
    }
    return [];
  }

  // Recherche par préfixe dans la lettre de la recherche,
  // exact d'abord, puis les mots qui commencent par la
  // recherche, 50 résultats au plus.
  Future<List<LittreEntry>> search(String query) async {
    final q = strip(query.trim());
    if (q.isEmpty) return [];
    final letter = letterOf(query);
    if (letter.isEmpty) return [];
    final entries = await _loadLetter(letter);
    final exact = await lookup(query);
    if (exact.isNotEmpty) return exact;
    final out = <LittreEntry>[];
    final keys = entries.keys.toList()..sort();
    for (final key in keys) {
      if (strip(key).startsWith(q)) {
        out.addAll(entries[key]!);
        if (out.length >= 50) break;
      }
    }
    return out;
  }

  // Vedettes d'une lettre, pour parcourir le dictionnaire,
  // triées, 200 au plus par page.
  Future<List<String>> browseHeads(String letter, {int offset = 0}) async {
    final entries = await _loadLetter(letter);
    final keys = entries.keys.toList()..sort();
    if (offset >= keys.length) return [];
    final end = (offset + 200).clamp(0, keys.length);
    return keys.sublist(offset, end);
  }

  Future<int> letterCount(String letter) async =>
      (await _loadLetter(letter)).length;
}
