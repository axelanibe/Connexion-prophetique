// Palette réduite, 17 nov. 2026 : une seule teinte d'or, un gris pour
// le texte secondaire, un gris pour les bordures, un rouge, un vert.
// Ces tests verrouillent les valeurs, pour qu'un or foncé ou un gris
// supplémentaire ne revienne pas par une constante.
import 'package:connexion_prophetique/design_config.dart';
import 'package:connexion_prophetique/home_web.dart';
import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/ux_global.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('Palette réduite', () {
    test('or et bronze', () {
      expect(Cp.gold, const Color(0xFFE5C158));
      expect(Cp.goldDeep, const Color(0xFFB47B17));
      expect(W.gold, Cp.gold);
      expect(W.goldDeep, Cp.goldDeep);
      expect(W.goldBtn, Cp.gold);
      expect(W.goldLine, Cp.gold);
      expect(Ux.goldDeep, Cp.goldDeep);
    });

    test('bleu nuit unique', () {
      expect(Cp.navy, const Color(0xFF0F1C2E));
      expect(W.navy, Cp.navy);
      expect(W.banner, Cp.navy);
      expect(Ux.navy, Cp.navy);
    });

    test('deux gris seulement', () {
      expect(W.muted, const Color(0xFF5E687C));
      expect(W.label, W.muted);
      expect(Cp.inkMuted, W.muted);
      expect(Ux.inkMuted, W.muted);
      expect(W.line, const Color(0xFFE4E7EF));
      expect(W.lineStrong, W.line);
      expect(Cp.line, W.line);
      expect(Ux.line, W.line);
    });

    test('texte secondaire sur fond sombre, blanc à 70 %', () {
      expect(W.onDarkMuted, Colors.white70);
      expect(W.navText, Colors.white70);
    });

    test('rouge et vert uniques', () {
      expect(Cp.danger, const Color(0xFFB3261E));
      expect(Cp.ok, const Color(0xFF1B6B3A));
    });

    test('config serveur par défaut, or et bronze', () {
      final defauts = DesignConfig.defaults();
      expect(defauts.or, const Color(0xFFE5C158));
      expect(defauts.orFonce, const Color(0xFFB47B17));
      expect(defauts.bleuNuit, Cp.navy);
      expect(defauts.fond, Cp.paper);
    });
  });
}
