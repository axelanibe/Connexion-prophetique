// Carte 97, 8 nov. 2026 : le lecteur MP3 haute qualité ne
// s'embarque que pour les chapitres dont le fichier existe,
// Psaume 23 et Jean 3, en français seulement. Ces tests
// vérifient les adresses attendues, sans téléphone et sans
// lecture réelle : le MP3 lui-même n'est pas encore en ligne,
// voir le rapport de la carte.
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/audio.dart';

void main() {
  test('Psaume 23 en français : MP3 haute qualité attendu', () {
    expect(
      bibleHqChapterUrl(18, 23, 'fr'),
      '$kBibleHqBaseUrl'
      'psaume-23-fr.mp3',
    );
  });

  test('Jean 3 en français : MP3 haute qualité attendu', () {
    expect(
      bibleHqChapterUrl(42, 3, 'fr'),
      '${kBibleHqBaseUrl}jean-3-fr.mp3',
    );
  });

  test('autre chapitre en français : pas de MP3, voix de l’appareil', () {
    expect(bibleHqChapterUrl(0, 1, 'fr'), isNull);
    expect(bibleHqChapterUrl(18, 24, 'fr'), isNull);
    expect(bibleHqChapterUrl(42, 1, 'fr'), isNull);
  });

  test('en anglais : pas de MP3, voix de l’appareil', () {
    expect(bibleHqChapterUrl(18, 23, 'en'), isNull);
    expect(bibleHqChapterUrl(42, 3, 'en'), isNull);
  });

  test('adresse du verset : index sur deux chiffres', () {
    expect(
      bibleHqVerseUrl(0),
      '${kBibleHqBaseUrl}verset-fr-00.mp3',
    );
    expect(
      bibleHqVerseUrl(22),
      '${kBibleHqBaseUrl}verset-fr-22.mp3',
    );
  });

  test('vitesse haute qualité verrouillée à 0,9', () {
    expect(HighQualityBibleAudio.hqSpeed, 0.9);
  });
}
