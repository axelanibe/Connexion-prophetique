// Cartes 61 et 62, 6 nov. 2026 : Méditation Quotidienne et Mon journal.
//
// Données partagées par main.dart (téléphone) et home_web.dart (web),
// sans rien importer de main.dart, pour que les deux côtés lisent
// la même liste et le même journal.
//
// MÉDITATION : 7 méditations, titres, réflexions et prières tels que
// dans le modèle de Claude, gardés tels quels. Les versets ne sont
// PAS recopiés ici : seul le repère livre, chapitre, verset est
// gardé, le texte est lu dans la Bible de l'application au moment
// de l'affichage (BibleService.verseText), en français ou en anglais
// selon la langue choisie, vérifié mot à mot contre
// assets/bible.json, voir le manifeste du lot. Rotation : jour de
// l'année modulo 7, comme le modèle, cycle de 7 jours, la structure
// devra fournir la suite pour un cycle plus long.
// Question du jour et petit pas concret : écrits par Muse, une
// seule phrase chacun, en français, sans inventer de verset, sans
// changer le verset, la réflexion ni la prière. Touche de Muse,
// relus par Axel, voir le manifeste.
//
// JOURNAL : privé, en local seulement, SharedPreferences, jamais
// envoyé au serveur, jamais publié. 4 catégories, pas 3 : le modèle
// de Claude fusionnait Projets et Orientations en un seul onglet,
// ici ils sont séparés, à la demande d'Axel. Aucune interprétation
// automatique des rêves, jamais.
import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

class DailyMeditation {
  const DailyMeditation({
    required this.title,
    required this.book,
    required this.chapter,
    required this.verse,
    required this.reflection,
    required this.prayer,
    required this.question,
    required this.step,
  });
  final String title;
  final int book; // index 0..65, ordre canonique de assets/bible.json
  final int chapter; // 1-based
  final int verse; // 1-based
  final String reflection;
  final String prayer;
  final String question; // question du jour, touche de Muse
  final String step; // petit pas concret, touche de Muse
}

const List<DailyMeditation> kDailyMeditations = [
  DailyMeditation(
    title: 'Écrire la vision',
    book: 34,
    chapter: 2,
    verse: 2,
    reflection: 'Une vision reste floue tant qu’elle n’est pas écrite. Notez aujourd’hui ce que Dieu vous montre.',
    prayer: 'Seigneur, donne-moi la discipline de noter ce que tu me révèles.',
    question: 'Qu’est-ce que Dieu t’a montré dernièrement que tu n’as pas encore écrit ?',
    step: 'Écris aujourd’hui, en une phrase, ce que Dieu t’a montré.',
  ),
  DailyMeditation(
    title: 'Une lampe à mes pieds',
    book: 18,
    chapter: 119,
    verse: 105,
    reflection: 'La lumière suffit pour le pas suivant, rarement pour tout le chemin. Faites confiance à la prochaine étape.',
    prayer: 'Éclaire la prochaine étape, et donne-moi de marcher dessus.',
    question: 'Quelle est la prochaine étape que tu vois assez clairement pour la faire aujourd’hui ?',
    step: 'Fais aujourd’hui le pas que la Parole éclaire déjà.',
  ),
  DailyMeditation(
    title: 'Méditer la Parole',
    book: 5,
    chapter: 1,
    verse: 8,
    reflection: 'La méditation transforme une lecture en conviction. Prenez un passage et gardez-le dans votre pensée.',
    prayer: 'Fais de ta Parole le sujet de mes pensées ce matin.',
    question: 'Quel passage veux-tu garder dans ta pensée tout au long de la journée ?',
    step: 'Choisis un verset ce matin et relis-le trois fois dans la journée.',
  ),
  DailyMeditation(
    title: 'Attendre avec foi',
    book: 34,
    chapter: 2,
    verse: 3,
    reflection: 'L’attente n’est pas l’inactivité : elle se vit dans la fidélité de chaque jour.',
    prayer: 'Donne-moi de tenir ferme pendant l’attente.',
    question: 'Dans quel domaine l’attente te pèse-t-elle le plus en ce moment ?',
    step: 'Remercie Dieu aujourd’hui pour une promesse dont tu attends encore l’accomplissement.',
  ),
  DailyMeditation(
    title: 'Un esprit renouvelé',
    book: 44,
    chapter: 12,
    verse: 2,
    reflection: 'Une pensée renouvelée ouvre les yeux sur ce que Dieu veut faire dans votre vie.',
    prayer: 'Renouvelle mon intelligence pour que je discerne ta volonté.',
    question: 'Quelle pensée as-tu besoin de laisser renouveler par la Parole aujourd’hui ?',
    step: 'Remplace aujourd’hui une pensée de crainte par une parole de Dieu que tu connais.',
  ),
  DailyMeditation(
    title: 'Entendre la voix',
    book: 22,
    chapter: 30,
    verse: 21,
    reflection: 'Une direction se reconnaît souvent dans le calme, après la prière, et se confirme par la Parole.',
    prayer: 'Ouvre mes oreilles pour entendre ta voix au milieu du bruit.',
    question: 'À quel moment de ta journée peux-tu t’arrêter quelques minutes pour écouter ?',
    step: 'Prends cinq minutes de silence aujourd’hui et note ce que tu as entendu.',
  ),
  DailyMeditation(
    title: 'Sans révélation',
    book: 19,
    chapter: 29,
    verse: 18,
    reflection: 'Une vision donne une direction à la vie comme au ministère. Notez ce qui vous guide.',
    prayer: 'Que ma vie et mon service soient guidés par ce que tu révèles.',
    question: 'Quelle direction Dieu t’a-t-il déjà donnée pour ta vie ou ton service ?',
    step: 'Note aujourd’hui, en une phrase, la direction que Dieu t’a donnée.',
  ),
];

/// Jour de l'année modulo 7, comme le modèle : 1er janvier vaut 0.
int meditationIndexFor(DateTime date) {
  final day = date.difference(DateTime(date.year, 1, 1)).inDays;
  return day % kDailyMeditations.length;
}

DailyMeditation dailyMeditation({DateTime? date}) =>
    kDailyMeditations[meditationIndexFor(date ?? DateTime.now())];

DailyMeditation? meditationForRef(int book, int chapter, int verse) {
  for (final m in kDailyMeditations) {
    if (m.book == book && m.chapter == chapter && m.verse == verse) return m;
  }
  return null;
}

/// Partage de la méditation en un seul geste, touche de Muse :
/// verset, titre et prière, avec la référence.
String meditationShareText(DailyMeditation m, String verseText, String refLabel) =>
    '« $verseText »\n— $refLabel\n\n${m.title}\n\nPrière : ${m.prayer}\n\nCONNEXION PROPHÉTIQUE';

/// Texte lu par Écouter la méditation, à 0,9, sans puces de vitesse,
/// touche de Muse : titre, verset, réflexion, prière, question et
/// petit pas, dans cet ordre.
String meditationListenText(DailyMeditation m, String verseText) =>
    '${m.title}. $verseText Réflexion : ${m.reflection} Prière : ${m.prayer} Question du jour : ${m.question} Petit pas : ${m.step}';

// ───────────────────────── Journal spirituel ─────────────────────────

/// Catégories, 4, dans l'ordre des onglets : rêves et songes,
/// projets, orientations et révélations, messages à préparer.
const List<String> kJournalCategories = ['reves', 'projets', 'orientations', 'messages'];

const Map<String, String> kJournalCategoryLabels = {
  'reves': 'Rêves et songes',
  'projets': 'Projets',
  'orientations': 'Orientations et révélations',
  'messages': 'Messages à préparer',
};

/// Champs de texte d'une entrée, pour la recherche par mot.
const Map<String, List<String>> kJournalSearchFields = {
  'reves': ['titre', 'recit', 'symboles', 'interp'],
  'projets': ['titre', 'description'],
  'orientations': ['titre', 'description', 'confirme'],
  'messages': ['titre', 'public', 'theme', 'accroche', 'points', 'illustration', 'conclusion'],
};

/// Étapes d'un message, dans l'ordre, pour le bouton Reprendre :
/// il rouvre le brouillon à la première étape encore vide.
const List<(String, String)> kMessageSections = [
  ('accroche', 'Accroche et introduction'),
  ('points', 'Points principaux'),
  ('illustration', 'Illustration'),
  ('conclusion', 'Conclusion'),
];

String _stripAccents(String s) {
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

String journalNewId() => DateTime.now().millisecondsSinceEpoch.toString();

String journalTodayIso() => DateTime.now().toIso8601String().substring(0, 10);

/// Texte complet d'un message, pour Copier le texte.
String journalMessageText(Map<String, dynamic> m) {
  final meta = [
    if ((m['public'] ?? '').toString().isNotEmpty) 'Public : ${m['public']}',
    if ((m['duree'] ?? '').toString().isNotEmpty) '${m['duree']} min',
  ].join(' · ');
  return [
    (m['titre'] ?? '').toString(),
    meta,
    (m['theme'] ?? '').toString(),
    '',
    (m['accroche'] ?? '').toString(),
    (m['points'] ?? '').toString(),
    (m['illustration'] ?? '').toString(),
    (m['conclusion'] ?? '').toString(),
  ].where((x) => x.isNotEmpty).join('\n\n');
}

/// Libellé du lien d'un message vers une entrée du journal.
String journalLinkLabel(Map<String, List<Map<String, dynamic>>> data, String value) {
  final parts = value.split(':');
  if (parts.length != 2) return '';
  final list = data[parts[0]] ?? const [];
  for (final e in list) {
    if ('${e['id']}' == parts[1]) return (e['titre'] ?? '').toString();
  }
  return '';
}

/// Stockage local du journal, SharedPreferences seulement, jamais
/// envoyé au serveur. Une entrée est une carte de champs texte,
/// avec id et date ISO (aaaa-mm-jj).
class SpiritualJournalStore {
  static const String prefsKey = 'journal_spirituel_v2';

  Map<String, List<Map<String, dynamic>>> data = {
    'reves': [],
    'projets': [],
    'orientations': [],
    'messages': [],
  };

  Future<void> load() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(prefsKey);
    if (raw == null || raw.isEmpty) return;
    try {
      final decoded = jsonDecode(raw);
      if (decoded is! Map) return;
      for (final cat in kJournalCategories) {
        final list = decoded[cat];
        if (list is List) {
          data[cat] = list.whereType<Map>().map((e) => Map<String, dynamic>.from(e)).toList();
        }
      }
    } catch (_) {
      // Stockage illisible : on repart d'un journal vide, sans
      // effacer la valeur, pour ne jamais perdre de données ici.
    }
  }

  Future<void> save() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(prefsKey, jsonEncode(data));
  }

  int count(String category) => data[category]?.length ?? 0;

  int get total =>
      kJournalCategories.fold(0, (sum, c) => sum + count(c));

  /// Orientations accomplies, pour le petit bilan privé.
  int get accomplishedOrientations => (data['orientations'] ?? [])
      .where((e) => (e['statut'] ?? '').toString() == 'Accompli')
      .length;

  /// Recherche dans toutes les entrées, par mot, par date et par
  /// catégorie, touche de Muse. Un mot cherche dans les champs de
  /// texte, sans accents ; une date cherche en aaaa-mm-jj comme en
  /// jj/mm/aaaa ; la catégorie filtre par onglet, ou toutes quand
  /// elle est nulle.
  List<(String, Map<String, dynamic>)> search(String query, {String? category}) {
    final q = _stripAccents(query.trim());
    final out = <(String, Map<String, dynamic>)>[];
    if (q.isEmpty) {
      final cats = category == null ? kJournalCategories : [category];
      for (final cat in cats) {
        for (final e in data[cat] ?? const []) {
          out.add((cat, e));
        }
      }
      return out;
    }
    final cats = category == null ? kJournalCategories : [category];
    for (final cat in cats) {
      for (final e in data[cat] ?? const []) {
        final fields = kJournalSearchFields[cat] ?? const ['titre'];
        var hay = fields.map((f) => (e[f] ?? '').toString()).join(' ');
        final date = (e['date'] ?? '').toString();
        if (date.length >= 10) {
          // aaaa-mm-jj et jj/mm/aaaa, pour chercher par date.
          hay += ' $date ${date.substring(8, 10)}/${date.substring(5, 7)}/${date.substring(0, 4)}';
        }
        if (_stripAccents(hay).contains(q)) out.add((cat, e));
      }
    }
    return out;
  }

  /// Crée un message à partir d'un rêve ou d'une orientation, en un
  /// seul geste, touche de Muse : l'inverse du lien déjà dans le
  /// modèle, qui partait du message vers l'entrée.
  static Map<String, dynamic> messageFromEntry(String category, Map<String, dynamic> e) {
    final titre = (e['titre'] ?? '').toString();
    final source = category == 'reves' ? 'Rêve' : 'Orientation';
    return {
      'id': journalNewId(),
      'date': journalTodayIso(),
      'titre': 'Message : $titre',
      'public': '',
      'duree': '',
      'theme': 'À partir de $source : $titre',
      'accroche': ((e['recit'] ?? e['description'] ?? '').toString()),
      'points': '',
      'illustration': '',
      'conclusion': '',
      'lien': '$category:${e['id']}',
    };
  }

  /// Première étape encore vide d'un message, pour le bouton
  /// Reprendre : vide veut dire brouillon terminé.
  static String firstIncompleteMessageSection(Map<String, dynamic> m) {
    for (final (key, label) in kMessageSections) {
      if ((m[key] ?? '').toString().trim().isEmpty) return label;
    }
    return '';
  }

  String exportJson() => jsonEncode({
        'app': 'CONNEXION PROPHETIQUE',
        'type': 'journal-spirituel',
        'version': 1,
        'reves': data['reves'],
        'projets': data['projets'],
        'orientations': data['orientations'],
        'messages': data['messages'],
      });

  /// Import avec fusion, sans doublon d'id. Accepte le format
  /// actuel et l'ancien format du modèle, dont les projets
  /// regroupaient orientations et révélations : ils arrivent dans
  /// Orientations, type Orientation, sans rien perdre. Renvoie le
  /// nombre d'entrées ajoutées.
  int importJson(String raw) {
    final decoded = jsonDecode(raw);
    if (decoded is! Map) throw const FormatException('Fichier illisible.');
    var added = 0;
    void merge(String cat, List list, Map<String, dynamic> Function(Map<String, dynamic>) adapt) {
      for (final item in list) {
        if (item is! Map) continue;
        final e = adapt(Map<String, dynamic>.from(item));
        if ((e['id'] ?? '').toString().isEmpty) continue;
        if ((data[cat] ?? []).any((x) => '${x['id']}' == '${e['id']}')) continue;
        data[cat]!.add(e);
        added++;
      }
    }

    Map<String, dynamic> asIs(Map<String, dynamic> e) => e;
    for (final cat in kJournalCategories) {
      final list = decoded[cat];
      if (list is List) merge(cat, list, asIs);
    }
    // Ancien format du modèle : projets = orientations et
    // révélations regroupées, champs contenu au lieu de description.
    final oldProjects = decoded['projets'];
    if (oldProjects is List && decoded['orientations'] == null) {
      merge('orientations', oldProjects, (e) => {
            'id': e['id'],
            'date': (e['date'] ?? '').toString(),
            'type': 'Orientation',
            'titre': (e['titre'] ?? '').toString(),
            'description': (e['contenu'] ?? e['description'] ?? '').toString(),
            'horizon': (e['horizon'] ?? 'Court terme').toString(),
            'statut': (e['statut'] ?? 'En attente').toString(),
            'confirme': (e['confirme'] ?? '').toString(),
          });
    }
    for (final cat in kJournalCategories) {
      data[cat]!.sort((a, b) => '${b['date']}'.compareTo('${a['date']}'));
    }
    return added;
  }
}
