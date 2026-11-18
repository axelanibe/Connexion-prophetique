// Tests des icônes, tranche pastilles et icônes, 17 nov. 2026 :
// I1 Actualités, I2 camps, I3 carte membre, I4 Bible, I5 doublons
// du tiroir, I6 Mon épanouissement, I7 Enseignements, I8
// Établissements, I9 bouclier, I10 familles unifiées, Ic.quiz.
// Les remplacements dans les écrans (tiroir, Plus, notifications)
// sont vérifiés par relecture du diff et par flutter analyze,
// les constantes Ic ci-dessous en sont la source unique.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/home_web.dart';

void main() {
  group('Icônes unifiées', () {
    test('I1, Actualités : journal', () {
      expect(Ic.news, Icons.newspaper_outlined);
    });

    test('I2, camps : événement', () {
      expect(Ic.camp, Icons.event_outlined);
    });

    test('I3, carte membre : badge', () {
      expect(Ic.card, Icons.badge_outlined);
    });

    test('I4, Bible : livre', () {
      expect(Ic.bible, Icons.menu_book_outlined);
    });

    test('I6, Mon épanouissement : carnet', () {
      expect(Ic.growth, Icons.edit_note_outlined);
    });

    test('I7, Enseignements : casque audio', () {
      expect(Ic.audio, Icons.headphones_outlined);
    });

    test('I8, Établissements : école', () {
      expect(Ic.school, Icons.school_outlined);
    });

    test('I9, bouclier : contour', () {
      expect(Ic.shield, Icons.shield_outlined);
    });

    test('Ic.quiz, étoile morte remplacée', () {
      expect(Ic.quiz, Icons.quiz_outlined);
    });

    test('I10, familles : contours partout, plus de remplis', () {
      expect(Ic.mail, Icons.mail_outlined);
      expect(Ic.chevron, Icons.chevron_right_outlined);
    });

    test('les anciens glyphes ne sont plus dans Ic', () {
      expect(Ic.camp, isNot(Icons.change_history_outlined));
      expect(Ic.card, isNot(Icons.credit_card_outlined));
      expect(Ic.bible, isNot(Icons.book_outlined));
      expect(Ic.school, isNot(Icons.apartment_outlined));
      expect(Ic.news, isNot(Icons.article_outlined));
    });
  });
}
