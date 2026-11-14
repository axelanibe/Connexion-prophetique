// Carte 113, 9 nov. 2026 : playlist, tous les audios de
// l'application, enseignements, musiques et podcasts, dans
// l'ordre de la liste, jamais inventés. Ces tests vérifient
// les fonctions pures de la playlist, sans lecteur réel :
// contenu, résumé, pochette et tirage au hasard.
import 'dart:math';

import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/main.dart';

Teaching _audio(String titre, String kind, {String imagePath = '', String imageUrl = ''}) =>
    Teaching(titre, 'Orateur', 'https://exemple.test/$titre.mp3',
        kind: kind, imagePath: imagePath, imageUrl: imageUrl, duree: '12:00');

void main() {
  group('Carte 113, playlist', () {
    test('playlistAudios reprend tous les audios, dans le même ordre', () {
      final audios = [
        _audio('Premier', 'enseignement'),
        _audio('Chant', 'musique'),
        _audio('Épisode', 'podcast'),
      ];
      final liste = playlistAudios(audios);
      expect(liste.map((a) => a.title).toList(), ['Premier', 'Chant', 'Épisode']);
      expect(liste, isNot(same(audios)));
    });

    test('playlistComptes compte chaque type', () {
      final audios = [
        _audio('Un', 'enseignement'),
        _audio('Deux', 'enseignement'),
        _audio('Chant', 'musique'),
        _audio('Épisode', 'podcast'),
      ];
      expect(playlistComptes(audios), {'enseignement': 2, 'musique': 1, 'podcast': 1});
      expect(playlistComptes([]), isEmpty);
    });

    test('playlistResume ne cite que les types présents', () {
      expect(playlistResume([]), 'Aucun audio');
      expect(playlistResume([_audio('Un', 'enseignement')]), '1 audio · 1 enseignement');
      expect(
        playlistResume([
          _audio('Un', 'enseignement'),
          _audio('Deux', 'enseignement'),
          _audio('Chant', 'musique'),
          _audio('Épisode', 'podcast'),
        ]),
        '4 audios · 2 enseignements · 1 musique · 1 podcast',
      );
    });

    test('playlistPochette prend le premier audio avec une image, sinon rien', () {
      final sansImage = _audio('Sans', 'enseignement');
      final avecImage = _audio('Avec', 'musique', imageUrl: 'https://exemple.test/pochette.jpg');
      expect(playlistPochette([sansImage, avecImage]), same(avecImage));
      expect(playlistPochette([sansImage]), isNull);
      expect(playlistPochette([]), isNull);
    });

    test('playlistAleatoire choisit un titre de la liste, jamais un titre inventé', () {
      final audios = [
        _audio('Un', 'enseignement'),
        _audio('Deux', 'musique'),
        _audio('Trois', 'podcast'),
      ];
      for (var graine = 0; graine < 20; graine++) {
        final choisi = playlistAleatoire(audios, Random(graine));
        expect(audios, contains(choisi));
      }
      expect(playlistAleatoire([], Random(1)), isNull);
    });
  });
}
