// Tests du correctif audio en boucle, 13 nov. 2026 : la file
// d'écoute s'épuise, et la page en dessous dans la pile ignore
// la fin de l'audio. Fonctions pures seules, sans lecteur.
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/app_models.dart';

Teaching _titre(String titre) => Teaching(titre, 'Orateur', 'https://exemple/$titre');

void main() {
  group('Correctif audio en boucle, file d’écoute', () {
    test('la file s’épuise titre après titre', () {
      var file = [_titre('A'), _titre('B'), _titre('C')];
      expect(suivantDeFile(file)?.title, 'A');
      file = resteDeFile(file);
      expect(file.map((t) => t.title), ['B', 'C']);
      expect(suivantDeFile(file)?.title, 'B');
      file = resteDeFile(file);
      expect(file.map((t) => t.title), ['C']);
      expect(suivantDeFile(file)?.title, 'C');
      file = resteDeFile(file);
      expect(file, isEmpty);
      expect(suivantDeFile(file), isNull);
    });

    test('un seul titre, plus rien après', () {
      final file = [_titre('A')];
      expect(suivantDeFile(file)?.title, 'A');
      expect(resteDeFile(file), isEmpty);
    });

    test('file vide, rien à jouer', () {
      expect(suivantDeFile(<Teaching>[]), isNull);
      expect(resteDeFile(<Teaching>[]), isEmpty);
    });
  });

  group('Correctif audio en boucle, page en dessous', () {
    test('page visible, elle réagit', () {
      expect(ignorerFinAudio(monte: true, estCourante: true), isFalse);
    });

    test('page en dessous, elle ignore', () {
      expect(ignorerFinAudio(monte: true, estCourante: false), isTrue);
    });

    test('page sans route, elle ignore', () {
      expect(ignorerFinAudio(monte: true, estCourante: null), isTrue);
    });

    test('page démontée, elle ignore', () {
      expect(ignorerFinAudio(monte: false, estCourante: true), isTrue);
      expect(ignorerFinAudio(monte: false, estCourante: false), isTrue);
    });
  });
}
