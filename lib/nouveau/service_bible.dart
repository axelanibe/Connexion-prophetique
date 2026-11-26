// Service de la nouvelle Bible, tranche T6, 26 nov. 2026.
// Réutilise les services existants, sans importer les anciens
// écrans : BibleService pour le texte, la recherche sans
// accents, les favoris, les surlignages et les annotations,
// LittreLexicon pour le dictionnaire, VerseTts pour l'audio.
// Tout état individuel, favoris, notes, surlignages, jours
// lus du plan, reste en stockage local côté client, jamais
// envoyé au serveur, règle read-heavy.
import 'package:share_plus/share_plus.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../audio.dart';
import '../bible.dart';
import '../littre.dart';
import '../parcours_bible.dart';

/// Contrat du service Bible, pour la page et ses tests.
abstract class ServiceBible {
  Future<void> charger();
  List<BibleBook> livres(String lang);
  String nomLivre(String lang, int livre);
  List<String> versetsChapitre(String lang, int livre, int chapitre);
  String? texteVerset(String lang, int livre, int chapitre, int verset);
  List<BibleHit> rechercher(String lang, String requete);
  Future<List<BibleVerseRef>> favoris(String lang);
  Future<bool> estFavori(String lang, BibleVerseRef ref);
  Future<void> basculerFavori(String lang, BibleVerseRef ref);
  Future<bool> estSurligne(String lang, BibleVerseRef ref);
  Future<void> basculerSurlignage(String lang, BibleVerseRef ref);
  Future<String?> note(String lang, BibleVerseRef ref);
  Future<void> enregistrerNote(String lang, BibleVerseRef ref, String note);
  Future<String?> etiquette(String lang, BibleVerseRef ref);
  Future<void> enregistrerEtiquette(
      String lang, BibleVerseRef ref, String etiquette);
  Future<String?> lien(String lang, BibleVerseRef ref);
  Future<void> enregistrerLien(String lang, BibleVerseRef ref, String lien);
  Future<List<LittreEntry>> definir(String mot);
  Future<void> ecouterVerset(String lang, BibleVerseRef ref);
  Future<void> ecouterChapitre(String lang, int livre, int chapitre);
  Future<void> arreterAudio();
  Future<void> partager(String texte);
  Future<BibleVerseRef?> reprise(String lang);
  Future<void> enregistrerReprise(String lang, BibleVerseRef ref);
  Future<Set<int>> joursLusPlan();
  Future<void> basculerJourPlan(int jour);
}

/// Implémentation réelle, sur les services existants.
class ServiceBibleReel implements ServiceBible {
  final _tts = VerseTts();

  @override
  Future<void> charger() => BibleService.instance.load();

  @override
  List<BibleBook> livres(String lang) => BibleService.instance.books(lang);

  @override
  String nomLivre(String lang, int livre) =>
      BibleService.instance.bookName(lang, livre);

  @override
  List<String> versetsChapitre(String lang, int livre, int chapitre) =>
      BibleService.instance.chapterVerses(lang, livre, chapitre);

  @override
  String? texteVerset(String lang, int livre, int chapitre, int verset) =>
      BibleService.instance.verseText(lang, livre, chapitre, verset);

  @override
  List<BibleHit> rechercher(String lang, String requete) =>
      BibleService.instance.search(lang, requete);

  @override
  Future<List<BibleVerseRef>> favoris(String lang) =>
      BibleService.instance.favorites(lang);

  @override
  Future<bool> estFavori(String lang, BibleVerseRef ref) =>
      BibleService.instance.isFavorite(lang, ref);

  @override
  Future<void> basculerFavori(String lang, BibleVerseRef ref) =>
      BibleService.instance.toggleFavorite(lang, ref);

  @override
  Future<bool> estSurligne(String lang, BibleVerseRef ref) async {
    final liste = await BibleService.instance.highlights(lang);
    return liste.any((r) =>
        r.book == ref.book &&
        r.chapter == ref.chapter &&
        r.verse == ref.verse);
  }

  @override
  Future<void> basculerSurlignage(String lang, BibleVerseRef ref) =>
      BibleService.instance.toggleHighlight(lang, ref);

  @override
  Future<String?> note(String lang, BibleVerseRef ref) =>
      BibleService.instance.verseNote(lang, ref);

  @override
  Future<void> enregistrerNote(String lang, BibleVerseRef ref, String note) =>
      BibleService.instance.saveVerseNote(lang, ref, note);

  @override
  Future<String?> etiquette(String lang, BibleVerseRef ref) =>
      BibleService.instance.verseTag(lang, ref);

  @override
  Future<void> enregistrerEtiquette(
          String lang, BibleVerseRef ref, String etiquette) =>
      BibleService.instance.saveVerseTag(lang, ref, etiquette);

  @override
  Future<String?> lien(String lang, BibleVerseRef ref) =>
      BibleService.instance.verseLink(lang, ref);

  @override
  Future<void> enregistrerLien(String lang, BibleVerseRef ref, String lien) =>
      BibleService.instance.saveVerseLink(lang, ref, lien);

  @override
  Future<List<LittreEntry>> definir(String mot) =>
      LittreLexicon.instance.lookup(mot);

  @override
  Future<void> ecouterVerset(String lang, BibleVerseRef ref) async {
    await _tts.speakVerses(
        ['Verset ${ref.verse}. ${ref.text}'], lang);
  }

  @override
  Future<void> ecouterChapitre(String lang, int livre, int chapitre) async {
    final versets = versetsChapitre(lang, livre, chapitre);
    await _tts.speakVerses(
      [
        for (var i = 0; i < versets.length; i++)
          'Verset ${i + 1}. ${versets[i]}'
      ],
      lang,
    );
  }

  @override
  Future<void> arreterAudio() async => _tts.stop();

  @override
  Future<void> partager(String texte) =>
      SharePlus.instance.share(ShareParams(text: texte));

  @override
  Future<BibleVerseRef?> reprise(String lang) =>
      BibleService.instance.lastRead(lang);

  @override
  Future<void> enregistrerReprise(String lang, BibleVerseRef ref) =>
      BibleService.instance.saveLastRead(lang, ref);

  @override
  Future<Set<int>> joursLusPlan() async {
    final prefs = await SharedPreferences.getInstance();
    return (prefs.getStringList('plan_annee') ?? const <String>[])
        .map(int.tryParse)
        .whereType<int>()
        .toSet();
  }

  @override
  Future<void> basculerJourPlan(int jour) async {
    final prefs = await SharedPreferences.getInstance();
    final lus = await joursLusPlan();
    if (lus.contains(jour)) {
      lus.remove(jour);
    } else {
      lus.add(jour);
    }
    await prefs.setStringList(
        'plan_annee', lus.map((d) => d.toString()).toList());
  }
}

/// Badges du plan de lecture, réexportés pour la page.
List<String> badgesPlanLecture(int joursLus) =>
    badgesLectureGagnes(joursLus);
