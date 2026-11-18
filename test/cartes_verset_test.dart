// Cartes de verset partageables, 18 nov. 2026 : la carte carrée
// reprend exactement le verset affiché, jamais réécrit, et tient
// dans un carré quelle que soit sa longueur, la police descend
// puis le contenu se réduit, jamais de débordement.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/home_web.dart';
import 'package:connexion_prophetique/verse_share.dart';

void main() {
  test('taille de la police : courte, moyenne, longue, très longue', () {
    expect(verseCardFontSize('Court.'), 26);
    expect(verseCardFontSize('x' * 150), 22);
    expect(verseCardFontSize('x' * 300), 19);
    expect(verseCardFontSize('x' * 500), 16);
  });

  testWidgets('la carte carrée montre le verset exact, sa référence et sa version', (tester) async {
    const verse = HomeVerse(text: 'Car Dieu a tant aimé le monde.', ref: 'Jean 3:16', version: 'Louis Segond');
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(body: SizedBox(width: 300, height: 300, child: VerseShareImage(verse: verse))),
      ),
    );
    await tester.pump();
    expect(find.text('« Car Dieu a tant aimé le monde. »'), findsOneWidget);
    expect(find.text('Jean 3:16'), findsOneWidget);
    expect(find.text('(Louis Segond)'), findsOneWidget);
    expect(find.text('CONNEXION PROPHETIQUE'), findsOneWidget);
    final ratio = tester.widget<AspectRatio>(find.byType(AspectRatio));
    expect(ratio.aspectRatio, 1);
    expect(tester.takeException(), isNull);
  });

  testWidgets('un très long verset tient dans le carré sans débordement', (tester) async {
    final long = HomeVerse(text: 'Parole. ' * 120, ref: 'Psaume 119:105', version: 'Louis Segond');
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(body: SizedBox(width: 300, height: 300, child: VerseShareImage(verse: long))),
      ),
    );
    await tester.pump();
    expect(find.textContaining('Parole.'), findsWidgets);
    expect(find.text('Psaume 119:105'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}
