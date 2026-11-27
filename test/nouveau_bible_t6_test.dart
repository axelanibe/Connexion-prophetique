// Tests de la tranche T6, nouvelle Bible, 26 nov. 2026.
// Les livres et versets ci-dessous sont des données de test,
// jamais le vrai texte de la Bible : 66 livres nommés
// « Livre test N », chapitre 1 du livre 1 avec deux versets
// de test, un chapitre partout ailleurs.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import 'package:connexion_prophetique/bible.dart';
import 'package:connexion_prophetique/littre.dart';
import 'package:connexion_prophetique/nouveau/modeles_bible.dart';
import 'package:connexion_prophetique/nouveau/page_bible.dart';
import 'package:connexion_prophetique/nouveau/service_bible.dart';

class _FauxServiceBible implements ServiceBible {
  _FauxServiceBible({this.avecReprise = false});
  final bool avecReprise;
  final partages = <String>[];
  final joursMarques = <int>{};
  bool favoriBascule = false;
  bool surlignageBascule = false;
  String? noteEnregistree;

  List<BibleBook> get _livres => [
        for (var i = 0; i < 66; i++)
          BibleBook(
            'Livre test ${i + 1}',
            i == 0
                ? [
                    ['Verset de test un', 'Verset de test deux'],
                    ['Verset de test trois'],
                  ]
                : [
                    ['Verset de test'],
                  ],
          ),
      ];

  @override
  Future<void> charger() async {}

  @override
  List<BibleBook> livres(String lang) => _livres;

  @override
  String nomLivre(String lang, int livre) => 'Livre test ${livre + 1}';

  @override
  List<String> versetsChapitre(String lang, int livre, int chapitre) =>
      _livres[livre].chapters[chapitre - 1];

  @override
  String? texteVerset(String lang, int livre, int chapitre, int verset) =>
      _livres[livre].chapters[chapitre - 1][verset - 1];

  @override
  List<BibleHit> rechercher(String lang, String requete) {
    if (requete.trim().isEmpty) return [];
    return [
      const BibleHit(0, 1, 1, 'Verset de test un'),
    ];
  }

  @override
  Future<List<BibleVerseRef>> favoris(String lang) async => [
        const BibleVerseRef(0, 1, 1, 'Verset de test un'),
      ];

  @override
  Future<bool> estFavori(String lang, BibleVerseRef ref) async => false;

  @override
  Future<void> basculerFavori(String lang, BibleVerseRef ref) async {
    favoriBascule = true;
  }

  @override
  Future<bool> estSurligne(String lang, BibleVerseRef ref) async => false;

  @override
  Future<void> basculerSurlignage(String lang, BibleVerseRef ref) async {
    surlignageBascule = true;
  }

  @override
  Future<String?> note(String lang, BibleVerseRef ref) async => null;

  @override
  Future<void> enregistrerNote(
      String lang, BibleVerseRef ref, String note) async {
    noteEnregistree = note;
  }

  @override
  Future<String?> etiquette(String lang, BibleVerseRef ref) async => null;

  @override
  Future<void> enregistrerEtiquette(
          String lang, BibleVerseRef ref, String etiquette) async {}

  @override
  Future<String?> lien(String lang, BibleVerseRef ref) async => null;

  @override
  Future<void> enregistrerLien(
          String lang, BibleVerseRef ref, String lien) async {}

  @override
  Future<List<LittreEntry>> definir(String mot) async => [
        const LittreEntry(
          word: 'TEST',
          nature: 's. m.',
          definitions: ['Définition de test.'],
        ),
      ];

  @override
  Future<void> ecouterVerset(String lang, BibleVerseRef ref) async {}

  @override
  Future<void> ecouterChapitre(
      String lang, int livre, int chapitre) async {}

  @override
  Future<void> arreterAudio() async {}

  @override
  Future<void> partager(String texte) async {
    partages.add(texte);
  }

  @override
  Future<BibleVerseRef?> reprise(String lang) async => avecReprise
      ? const BibleVerseRef(0, 1, 1, 'Verset de test un')
      : null;

  @override
  Future<void> enregistrerReprise(String lang, BibleVerseRef ref) async {}

  @override
  Future<Set<int>> joursLusPlan() async => joursMarques;

  @override
  Future<void> basculerJourPlan(int jour) async {
    if (joursMarques.contains(jour)) {
      joursMarques.remove(jour);
    } else {
      joursMarques.add(jour);
    }
  }
}

Future<void> _ouvrirBible(WidgetTester tester,
    {ServiceBible? service}) async {
  await tester.pumpWidget(
    MaterialApp(
      home: Scaffold(
        body: PageBibleNouvelle(service: service ?? _FauxServiceBible()),
      ),
    ),
  );
  await tester.pumpAndSettle();
}

void main() {
  test('T6 : structure des testaments, 39 et 27 livres', () {
    expect(indicesTestament(true).length, 39);
    expect(indicesTestament(false).length, 27);
    expect(indicesTestament(true).first, 0);
    expect(indicesTestament(true).last, 38);
    expect(indicesTestament(false).first, 39);
    expect(indicesTestament(false).last, 65);
    expect(estAncienTestament(38), isTrue);
    expect(estAncienTestament(39), isFalse);
  });

  testWidgets('T6 : accueil sans liste avant un toucher',
      (tester) async {
    await _ouvrirBible(tester);
    expect(find.text('Bible'), findsOneWidget);
    expect(find.text('Version Louis Segond 1910'), findsOneWidget);
    expect(find.text('Ancien Testament'), findsOneWidget);
    expect(find.text('Nouveau Testament'), findsOneWidget);
    expect(find.text('Livre test 1'), findsNothing);
    expect(find.text('Verset du jour'), findsNothing);
    for (final tuile in [
      'Recherche',
      'Dictionnaire',
      'Favoris',
      'Plan de lecture',
      'Réglages',
    ]) {
      expect(find.text(tuile), findsOneWidget);
    }
  });

  testWidgets('T6 : toucher Ancien Testament puis livre puis chapitre',
      (tester) async {
    await _ouvrirBible(tester);
    await tester.tap(find.text('Ancien Testament'));
    await tester.pumpAndSettle();
    expect(find.text('Livre test 1'), findsOneWidget);
    expect(find.text('Livre test 40'), findsNothing);
    await tester.tap(find.text('Nouveau Testament'));
    await tester.pumpAndSettle();
    expect(find.text('Livre test 40'), findsOneWidget);
    expect(find.text('Livre test 1'), findsNothing);
    await tester.tap(find.text('Ancien Testament'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Livre test 1'));
    await tester.pumpAndSettle();
    expect(find.text('1'), findsWidgets);
    expect(find.text('2'), findsOneWidget);
    await tester.tap(find.text('2'));
    await tester.pumpAndSettle();
    expect(find.byKey(const ValueKey('verset_1')), findsOneWidget);
  });

  testWidgets('T6 : verset sélectionné, barre d’actions',
      (tester) async {
    final service = _FauxServiceBible();
    await _ouvrirBible(tester, service: service);
    await tester.tap(find.text('Ancien Testament'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Livre test 1'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('1'));
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const ValueKey('verset_1')));
    await tester.pumpAndSettle();
    for (final action in [
      'Surligner',
      'Note',
      'Étiquette',
      'Lien',
      'Partager',
      'Favori',
    ]) {
      expect(find.text(action), findsOneWidget);
    }
    expect(find.text('Écouter'), findsWidgets);
    await tester.tap(find.text('Surligner'));
    await tester.pumpAndSettle();
    expect(service.surlignageBascule, isTrue);
    await tester.tap(find.text('Partager'));
    await tester.pumpAndSettle();
    expect(service.partages, hasLength(1));
    expect(service.partages.first, contains('Livre test 1 1:1'));
  });

  testWidgets('T6 : recherche, dictionnaire, favoris', (tester) async {
    await _ouvrirBible(tester);
    await tester.tap(find.text('Recherche'));
    await tester.pumpAndSettle();
    await tester.enterText(find.byType(TextField), 'test');
    await tester.pumpAndSettle();
    expect(find.text('Livre test 1 1:1'), findsOneWidget);
    await tester.tap(find.byIcon(LucideIcons.chevronLeft));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Dictionnaire'));
    await tester.pumpAndSettle();
    await tester.enterText(find.byType(TextField), 'test');
    await tester.testTextInput.receiveAction(TextInputAction.done);
    await tester.pumpAndSettle();
    expect(find.text('TEST'), findsOneWidget);
    expect(find.text('Définition de test.'), findsOneWidget);
    await tester.tap(find.byIcon(LucideIcons.chevronLeft));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Favoris'));
    await tester.pumpAndSettle();
    expect(find.text('Livre test 1 1:1'), findsOneWidget);
  });

  testWidgets('T6 : plan de lecture 365 jours et badges',
      (tester) async {
    await _ouvrirBible(tester);
    await tester.tap(find.text('Plan de lecture'));
    await tester.pumpAndSettle();
    expect(find.text('Plan de lecture'), findsWidgets);
    expect(find.text('Toute la Bible en 365 jours'), findsOneWidget);
    expect(find.text('0 / 365 jours lus'), findsOneWidget);
    expect(find.text('Jour 1'), findsOneWidget);
    await tester.tap(find.text('Marquer lu').first);
    await tester.pumpAndSettle();
    expect(find.text('1 / 365 jours lus'), findsOneWidget);
  });

  testWidgets('T6 : reprise de lecture et réglages', (tester) async {
    await _ouvrirBible(tester,
        service: _FauxServiceBible(avecReprise: true));
    expect(find.text('Reprendre la lecture'), findsOneWidget);
    await tester.tap(find.text('Reprendre la lecture'));
    await tester.pumpAndSettle();
    expect(find.text('Livre test 1 1'), findsOneWidget);
    expect(find.byKey(const ValueKey('verset_1')), findsOneWidget);
    await tester.tap(find.byIcon(LucideIcons.chevronLeft));
    await tester.pumpAndSettle();
    await tester.drag(find.byType(ListView), const Offset(0, -400));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Réglages'));
    await tester.pumpAndSettle();
    expect(find.text('Version Louis Segond 1910'), findsWidgets);
    expect(find.text('Taille du texte : 16'), findsOneWidget);
    expect(find.byType(Slider), findsOneWidget);
  });

  testWidgets('T6 : sans reprise, pas de tuile reprendre',
      (tester) async {
    await _ouvrirBible(tester);
    expect(find.text('Reprendre la lecture'), findsNothing);
  });
}
