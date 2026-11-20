// Refonte de l'espace Bible, 20 nov. 2026 : écran principal
// suivant la maquette, listes de livres par testament rangées
// par groupes, lecteur sans doublon, recherche à la frappe,
// dictionnaire à trois sources, verset du jour calendaire unique,
// panneau du verset simplifié, favoris groupés, réglages réunis.
// Ce test pompe la vraie page Bible, avec une Bible de test de
// 66 livres servie en mémoire, 3 chapitres et 2 versets par
// livre, moins de 50 Ko, pour que loadString ne passe pas par
// un isolat, comme dans test/page_bible_sans_notifications_103_test.dart.
import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/bible.dart';
import 'package:connexion_prophetique/dictionary.dart';
import 'package:connexion_prophetique/littre.dart';
import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/strong_lexicon.dart';

const _nomsLivres = [
  'Genèse', 'Exode', 'Lévitique', 'Nombres', 'Deutéronome',
  'Josué', 'Juges', 'Ruth', '1 Samuel', '2 Samuel',
  '1 Rois', '2 Rois', '1 Chroniques', '2 Chroniques', 'Esdras',
  'Néhémie', 'Esther', 'Job', 'Psaumes', 'Proverbes',
  'Ecclésiaste', 'Cantique des cantiques', 'Ésaïe', 'Jérémie', 'Lamentations',
  'Ézéchiel', 'Daniel', 'Osée', 'Joël', 'Amos',
  'Abdias', 'Jonas', 'Michée', 'Nahum', 'Habacuc',
  'Sophonie', 'Aggée', 'Zacharie', 'Malachie', 'Matthieu',
  'Marc', 'Luc', 'Jean', 'Actes', 'Romains',
  '1 Corinthiens', '2 Corinthiens', 'Galates', 'Éphésiens', 'Philippiens',
  'Colossiens', '1 Thessaloniciens', '2 Thessaloniciens', '1 Timothée', '2 Timothée',
  'Tite', 'Philémon', 'Hébreux', 'Jacques', '1 Pierre',
  '2 Pierre', '1 Jean', '2 Jean', '3 Jean', 'Jude',
  'Apocalypse',
];

String _bibleTestJson() {
  final books = <Map<String, dynamic>>[];
  for (var i = 0; i < 66; i++) {
    final chapters = List.generate(
      3,
      (c) => List.generate(2, (v) => 'Parole de ${_nomsLivres[i]} ${c + 1}:${v + 1}.'),
    );
    books.add({'name': _nomsLivres[i], 'chapters': chapters});
  }
  return jsonEncode({
    'fr': {'books': books},
    'en': {'books': books},
  });
}

// Petits extraits REELS des trois sources, recopiés tels quels
// des fichiers d'assets : H7965 (shalom) du lexique Strong
// hébreu, G26 (agapè) du lexique Strong grec, PAIX du Littré.
// Les fichiers entiers dépassent 50 Ko et loadString les
// enverrait dans un isolat, qui ne répond pas en zone fictive
// de test ; les fichiers entiers sont vérifiés par le test des
// sources, en zone réelle, avec les comptes 8674, 5523, 75866.
const _strongHebreuExtrait =
    r'''{"H7965": {"l": "שָׁלוֹם", "x": "shâlôwm", "p": "shaw-lome'", "d": "or שָׁלֹם; from H7999 (שָׁלַם);", "s": "safe, i.e. (figuratively) well, happy, friendly; also (abstractly) welfare, i.e. health, prosperity, peace", "k": "[idiom] do, familiar, [idiom] fare, favour, [phrase] friend, [idiom] great, (good) health, ([idiom] perfect, such as be at) peace(-able, -ably), prosper(-ity, -ous), rest, safe(-ty), salute, welfare, ([idiom] all is, be) well, [idiom] wholly."}}''';
const _strongGrecExtrait =
    r'''{"G26": {"l": "ἀγάπη", "x": "agápē", "p": "", "d": "from G25 (ἀγαπάω);", "s": " love, i.e. affection or benevolence; specially (plural) a love-feast", "k": "(feast of) charity(-ably), dear, love"}}''';
const _littrePExtrait =
    r'''{"PAIX": [{"w": "PAIX", "n": "s. f.", "d": ["Rapports réguliers, calmes, sans violence, d'un État, d'une nation avec un autre État, une autre nation. Nous eûmes, sous ce règne, deux longues paix. C'est en la paix que toutes choses Succèdent selon nos désirs ; Comme au printemps naissent les roses, En la paix naissent les plaisirs ; Elle met les pompes aux villes, Donne aux champs les moissons fertiles, Et, de la majesté des lois Appuyant les pouvoirs suprêmes, Fait demeurer les diadèmes …", "Traité de paix. La paix est ratifiée. Il fit une paix honteuse avec Sapor Il ne fait aucun cas d'une paix forcée Fig. Paix fourrée, paix plâtrée, fausse paix. Fig. Ne donner ni paix ni trêve à quelqu'un, le presser continuellement. Paix religieuse, convention conclue, en 1555, entre les princes protestants et Charles-Quint. Paix des dames, traité conclu en 1529 entre François Ier et Charles-Quint. La paix de Westphalie, des Pyrénées, de Nimègue, …", "Concorde, tranquillité intérieure dans les États, dans les familles, dans les sociétés particulières. La paix a été troublée dans quelques provinces. Quand quelque dieu, voyant ses bontés négligées, Nous fait sentir son ire, un autre n'y peut rien ; L'Olympe s'entretient en paix par ce moyen Venez un peu mettre la paix entre ces personnes-ci Ne pouvant fortifier la justice, on a justifié la force, afin que le juste et le fort fussent ensemble, …"]}]}''';

void _mockBibleAssets() {
  final bibleJson = _bibleTestJson();
  TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
      .setMockMessageHandler('flutter/assets', (ByteData? message) async {
    if (message == null) return null;
    final cle = utf8.decode(message.buffer.asUint8List());
    if (cle == 'assets/bible.json') {
      return ByteData.sublistView(utf8.encode(bibleJson));
    }
    if (cle == 'assets/strong_hebrew.json') {
      return ByteData.sublistView(utf8.encode(_strongHebreuExtrait));
    }
    if (cle == 'assets/strong_greek.json') {
      return ByteData.sublistView(utf8.encode(_strongGrecExtrait));
    }
    if (cle == 'assets/littre/p.json') {
      return ByteData.sublistView(utf8.encode(_littrePExtrait));
    }
    if (cle.startsWith('assets/littre/')) {
      return ByteData.sublistView(utf8.encode('{}'));
    }
    final reel = File('build/unit_test_assets/$cle');
    if (reel.existsSync()) {
      return ByteData.sublistView(reel.readAsBytesSync());
    }
    return null;
  });
}

void _ignorerDebordements() {
  final ancienOnError = FlutterError.onError;
  FlutterError.onError = (details) {
    if (details.exception.toString().contains('A RenderFlex overflowed')) return;
    ancienOnError?.call(details);
  };
  addTearDown(() => FlutterError.onError = ancienOnError);
}

Future<void> _pomperBible(WidgetTester tester) async {
  _mockBibleAssets();
  // Chaque test repart d'un chargement neuf : un futur terminé
  // dans la zone fictive d'un test ne se réveille pas dans
  // celle du test suivant, et _refresh resterait bloqué sur
  // « Chargement de la Bible… ». Le cache de rootBundle
  // resservirait sinon le même futur sans appeler le gestionnaire.
  rootBundle.clear();
  BibleService.instance.resetForTest();
  StrongLexicon.instance.resetForTest();
  LittreLexicon.instance.resetForTest();
  // Fenêtre très haute : les listes paresseuses construisent
  // tous leurs éléments d'un coup, sans défilement, et les
  // titres de section restent trouvables tels quels.
  tester.view.physicalSize = const Size(800, 12000);
  tester.view.devicePixelRatio = 1.0;
  addTearDown(tester.view.resetPhysicalSize);
  addTearDown(tester.view.resetDevicePixelRatio);
  await tester.pumpWidget(const MaterialApp(home: BiblePage()));
  await tester.pump();
  await tester.pump(const Duration(seconds: 1));
  await tester.pump(const Duration(seconds: 1));
  await tester.pump(const Duration(seconds: 1));
}

void main() {
  test('refonte : les trois sources du dictionnaire chargent vraiment', () async {
    TestWidgetsFlutterBinding.ensureInitialized();
    expect(kBibleDictionary.length, 48);
    expect(kBibleBookWords.length, 66);
    expect(kBibleDictionary.length + kBibleBookWords.length, 114);
    expect(await StrongLexicon.instance.hebrewCount, 8674);
    expect(await StrongLexicon.instance.greekCount, 5523);
    expect(await StrongLexicon.instance.count, 14197);
    final paix = await LittreLexicon.instance.search('paix');
    expect(paix, isNotEmpty);
    expect(paix.any((e) => e.word == 'PAIX'), isTrue);
    final tetes = await LittreLexicon.instance.browseHeads('a');
    expect(tetes, isNotEmpty);
  });

  testWidgets('refonte : ecran principal suivant la maquette', (tester) async {
    SharedPreferences.setMockInitialValues({});
    _ignorerDebordements();
    await _pomperBible(tester);
    expect(find.text('Bible'), findsWidgets);
    expect(find.text('La Parole de Dieu à portée de main'), findsOneWidget);
    expect(find.text('Explorer la Bible'), findsOneWidget);
    expect(find.text('Outils bibliques'), findsOneWidget);
    expect(find.text('Ancien Testament'), findsOneWidget);
    expect(find.text('39 livres'), findsOneWidget);
    expect(find.text('Nouveau Testament'), findsOneWidget);
    expect(find.text('27 livres'), findsOneWidget);
    expect(find.textContaining('Verset du jour'), findsOneWidget);
    // Plus d'onglets Lire, Rechercher, Dictionnaire, Favoris.
    expect(find.text('Rechercher'), findsNothing);
    expect(find.text('Recherche'), findsOneWidget);
    expect(find.text('Dictionnaire'), findsOneWidget);
    // Sans lecture, pas de carte Reprendre.
    expect(find.text('Reprendre ma lecture'), findsNothing);
  });

  testWidgets('refonte : reprise, progression et lecteur sans doublon', (tester) async {
    SharedPreferences.setMockInitialValues({'bible_last_fr': '39:2:1'});
    _ignorerDebordements();
    await _pomperBible(tester);
    expect(find.text('Reprendre ma lecture'), findsOneWidget);
    expect(find.text('Matthieu 2'), findsOneWidget);
    // Progression : chapitre 2 sur 3 chapitres du livre en cours.
    expect(find.text('Chapitre 2 sur 3'), findsOneWidget);
    expect(find.text('Progression de lecture'), findsOneWidget);
    await tester.tap(find.text('Matthieu 2'));
    await tester.pump();
    await tester.pump(const Duration(seconds: 1));
    // Lecteur : un seul retour, le nom du livre, pas de selecteurs.
    expect(find.text('Matthieu'), findsOneWidget);
    expect(find.byType(DropdownButtonFormField<int>), findsNothing);
    expect(find.text('Précédent'), findsOneWidget);
    expect(find.text('Suivant'), findsOneWidget);
    expect(find.byIcon(Icons.volume_up_outlined), findsWidgets);
    // Chapitre suivant, puis retour vers la grille.
    await tester.tap(find.text('Suivant'));
    await tester.pump();
    await tester.pump(const Duration(seconds: 1));
    expect(find.text('Matthieu 3'), findsOneWidget);
    await tester.tap(find.text('Matthieu'));
    await tester.pump();
    expect(find.text('1'), findsWidgets);
  });

  testWidgets('refonte : livres par testament, groupes, grille des chapitres', (tester) async {
    SharedPreferences.setMockInitialValues({});
    _ignorerDebordements();
    await _pomperBible(tester);
    await tester.tap(find.text('Ancien Testament'));
    await tester.pump();
    expect(find.text('La Loi'), findsOneWidget);
    expect(find.text('Livres historiques'), findsOneWidget);
    expect(find.text('Poésie et sagesse'), findsOneWidget);
    expect(find.text('Prophètes'), findsOneWidget);
    expect(find.text('Genèse'), findsOneWidget);
    expect(find.text('3 chapitres'), findsWidgets);
    await tester.tap(find.text('Genèse'));
    await tester.pump();
    expect(find.text('1'), findsWidgets);
    await tester.tap(find.text('3'));
    await tester.pump();
    await tester.pump(const Duration(seconds: 1));
    expect(find.text('Genèse 3'), findsOneWidget);
    await tester.tap(find.text('Genèse'));
    await tester.pump();
    await tester.tap(find.text('Ancien Testament'));
    await tester.pump();
    expect(find.text('La Loi'), findsOneWidget);
    await tester.tap(find.byIcon(Icons.chevron_left_outlined).first);
    await tester.pump();
    expect(find.text('Explorer la Bible'), findsOneWidget);
    await tester.tap(find.text('Nouveau Testament'));
    await tester.pump();
    expect(find.text('Évangiles'), findsOneWidget);
    expect(find.text('Lettres de Paul'), findsOneWidget);
    expect(find.text('Matthieu'), findsOneWidget);
    // « Apocalypse » est à la fois le nom du groupe et celui du
    // livre unique du groupe, donc deux textes.
    expect(find.text('Apocalypse'), findsWidgets);
  });

  testWidgets('refonte : recherche a la frappe, 100 premiers, Voir plus', (tester) async {
    SharedPreferences.setMockInitialValues({});
    _ignorerDebordements();
    await _pomperBible(tester);
    await tester.tap(find.text('Recherche'));
    await tester.pump();
    expect(find.text('Recherche'), findsWidgets);
    await tester.enterText(find.byType(TextField), 'parole');
    await tester.pump(const Duration(milliseconds: 500));
    await tester.pump(const Duration(seconds: 1));
    expect(find.text('100 premiers résultats pour « parole »'), findsOneWidget);
    expect(find.text('Voir plus'), findsOneWidget);
    await tester.tap(find.text('Voir plus'));
    await tester.pump();
    expect(find.text('Voir plus'), findsOneWidget);
    // Les resultats ne fuient pas dans l'ecran principal.
    await tester.tap(find.byIcon(Icons.chevron_left_outlined).first);
    await tester.pump();
    expect(find.text('100 premiers résultats pour « parole »'), findsNothing);
    expect(find.text('Explorer la Bible'), findsOneWidget);
  });

  testWidgets('refonte : dictionnaire, lettres seules puis trois sources', (tester) async {
    SharedPreferences.setMockInitialValues({});
    _ignorerDebordements();
    await _pomperBible(tester);
    await tester.tap(find.text('Dictionnaire'));
    await tester.pump();
    expect(find.text('Parcourir le dictionnaire Littré par lettre'), findsOneWidget);
    expect(find.text('Paix'), findsNothing);
    await tester.enterText(find.byType(TextField), 'paix');
    await tester.pump(const Duration(milliseconds: 500));
    await tester.pump(const Duration(seconds: 1));
    await tester.pump(const Duration(seconds: 1));
    expect(find.textContaining('Français (Littré)'), findsOneWidget);
    expect(find.textContaining('Dictionnaire biblique'), findsOneWidget);
    expect(find.text('Aucun mot trouvé dans les trois sources. Essayez un autre mot.'), findsNothing);
    // La section Strong, par numéro : H7965 est l'entrée réelle
    // de l'extrait, shalom.
    await tester.enterText(find.byType(TextField), 'H7965');
    await tester.pump(const Duration(milliseconds: 500));
    await tester.pump(const Duration(seconds: 1));
    await tester.pump(const Duration(seconds: 1));
    expect(find.textContaining('Hébreu et grec (Strong)'), findsOneWidget);
    await tester.enterText(find.byType(TextField), 'zzzzintrouvable');
    await tester.pump(const Duration(milliseconds: 500));
    await tester.pump(const Duration(seconds: 1));
    await tester.pump(const Duration(seconds: 1));
    expect(find.text('Aucun mot trouvé dans les trois sources. Essayez un autre mot.'), findsOneWidget);
  });

  testWidgets('refonte : favoris groupes par livre, consigne corrigee', (tester) async {
    SharedPreferences.setMockInitialValues({
      'bible_favorites_fr': ['39:1:1', '0:1:1'],
    });
    _ignorerDebordements();
    await _pomperBible(tester);
    await tester.tap(find.text('Favoris'));
    await tester.pump();
    expect(find.text('Touchez Marque-page dans le panneau d’un verset pour l’enregistrer.'), findsOneWidget);
    expect(find.text('Touchez l’étoile à côté d’un verset pour l’enregistrer dans vos favoris.'), findsNothing);
    expect(find.text('Genèse'), findsOneWidget);
    expect(find.text('Matthieu'), findsOneWidget);
    expect(find.text('Genèse 1:1'), findsOneWidget);
    expect(find.text('Matthieu 1:1'), findsOneWidget);
  });

  testWidgets('refonte : reglages Bible reunis', (tester) async {
    SharedPreferences.setMockInitialValues({});
    _ignorerDebordements();
    await _pomperBible(tester);
    await tester.tap(find.byIcon(Icons.settings_outlined));
    await tester.pump();
    expect(find.text('Réglages Bible'), findsOneWidget);
    expect(find.text('Taille du texte'), findsOneWidget);
    expect(find.text('Version par défaut'), findsOneWidget);
    expect(find.text('Verset du jour du matin'), findsOneWidget);
    expect(find.text('Rappel de lecture du soir'), findsOneWidget);
  });

  testWidgets('refonte : panneau du verset simplifie, 4 actions', (tester) async {
    SharedPreferences.setMockInitialValues({});
    _ignorerDebordements();
    await _pomperBible(tester);
    await tester.tap(find.text('Ancien Testament'));
    await tester.pump();
    await tester.tap(find.text('Genèse'));
    await tester.pump();
    await tester.tap(find.text('1'));
    await tester.pump();
    await tester.pump(const Duration(seconds: 1));
    // Toucher le numero du premier verset, en haut a gauche du texte
    // continu : le RichText du chapitre est celui qui contient le
    // texte du premier verset.
    RichText? chapitre;
    for (final e in find.byType(RichText).evaluate()) {
      final w = e.widget as RichText;
      if (w.text.toPlainText().contains('Parole de Genèse 1:1')) {
        chapitre = w;
        break;
      }
    }
    expect(chapitre, isNotNull);
    // Tap au centre exact du premier caractère, le numéro 1 du
    // premier verset : un tap approximatif tomberait sur le
    // premier mot et ouvrirait sa fiche au lieu du panneau.
    // Les boîtes sont locales au paragraphe, il faut les passer
    // en coordonnées globales avant le tap.
    final para = tester.renderObject<RenderParagraph>(find.byWidget(chapitre!));
    final boites = para.getBoxesForSelection(const TextSelection(baseOffset: 0, extentOffset: 1));
    expect(boites, isNotEmpty);
    await tester.tapAt(para.localToGlobal(boites.first.toRect().center));
    await tester.pump();
    await tester.pump(const Duration(seconds: 1));
    expect(find.text('Surlignage'), findsOneWidget);
    expect(find.text('Note'), findsOneWidget);
    expect(find.text('Marque-page'), findsOneWidget);
    expect(find.text('Partager'), findsOneWidget);
    expect(find.text('Étudier'), findsOneWidget);
    expect(find.text('Annoter'), findsNothing);
    expect(find.text('Étiquette'), findsNothing);
    expect(find.text('Lien'), findsNothing);
    expect(find.text('Relation'), findsNothing);
  });
}
