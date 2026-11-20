// Refonte de l'espace Bible, 20 nov. 2026 : un seul verset du
// jour par jour calendaire, partout, bandeau Bible, méditation
// de l'accueil et notification de 7 h, avec la logique
// calendaire comme source unique.
// Fichier séparé des tests d'écran : le service Bible est un
// singleton, un test simple qui le charge avant les tests
// d'écran fausse leur chargement dans le même processus.
import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';

import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/bible.dart';

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

void main() {
  test('refonte : un seul verset du jour par jour calendaire', () async {
    TestWidgetsFlutterBinding.ensureInitialized();
    final bibleJson = _bibleTestJson();
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
        .setMockMessageHandler('flutter/assets', (ByteData? message) async {
      if (message == null) return null;
      final cle = utf8.decode(message.buffer.asUint8List());
      if (cle == 'assets/bible.json') {
        return ByteData.sublistView(utf8.encode(bibleJson));
      }
      final reel = File('build/unit_test_assets/$cle');
      if (reel.existsSync()) {
        return ByteData.sublistView(reel.readAsBytesSync());
      }
      return null;
    });
    final svc = BibleService.instance;
    await svc.load();
    expect(svc.loaded, isTrue);
    expect(svc.books('fr').length, 66);
    final jour1 = DateTime(2026, 1, 1);
    final a = svc.dailyVerse('fr', date: jour1);
    final b = svc.dailyVerse('fr', date: jour1);
    expect(a.book, b.book);
    expect(a.chapter, b.chapter);
    expect(a.verse, b.verse);
    expect(a.text, b.text);
    // Premier jour de l'annee : premiere entree de la liste.
    expect([a.book, a.chapter, a.verse], kDailyVerses[0]);
    final lendemain = svc.dailyVerse('fr', date: DateTime(2026, 1, 2));
    expect([lendemain.book, lendemain.chapter, lendemain.verse], kDailyVerses[1]);
    final charge = await svc.dailyVerseLoaded('fr');
    final direct = svc.dailyVerse('fr');
    expect(charge.book, direct.book);
    expect(charge.chapter, direct.chapter);
    expect(charge.verse, direct.verse);
  });
}
