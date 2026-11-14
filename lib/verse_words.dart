// Mots touchables d'un verset, carte 54, 6 nov. 2026.
//
// Le texte biblique n'est jamais réécrit : les mots sont découpés
// sur les espaces, la ponctuation reste attachée à son mot.
// Un toucher simple ouvre la fiche Sens et origine du mot.
// Un toucher long, environ une demi-seconde, souligne le mot en
// or, un deuxième toucher long retire le soulignement. Les deux
// gestes ne se confondent pas : le toucher long annule le toucher
// simple qui suivrait, grâce à un minuteur dans le geste.
import 'dart:async';

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

class _WordGesture extends TapGestureRecognizer {
  _WordGesture({required this.onTapWord, required this.onLongPressWord}) {
    onTapDown = (_) {
      _long = false;
      _timer?.cancel();
      _timer = Timer(const Duration(milliseconds: 500), () {
        _long = true;
        onLongPressWord();
      });
    };
    onTap = () {
      _timer?.cancel();
      if (_long) {
        _long = false;
        return;
      }
      onTapWord();
    };
    onTapCancel = () {
      _timer?.cancel();
      _long = false;
    };
  }

  final VoidCallback onTapWord;
  final VoidCallback onLongPressWord;
  Timer? _timer;
  bool _long = false;
}

// Geste de sélection d'un verset, carte 59, 6 nov. 2026 : un
// toucher simple ou un toucher long sur le numéro du verset
// sélectionne le verset entier et ouvre son panneau, sans
// confondre avec le toucher d'un mot, qui ouvre sa fiche Sens
// et origine, ni avec le toucher long d'un mot, qui le souligne.
class VerseSelectGesture extends TapGestureRecognizer {
  VerseSelectGesture({required this.onSelect}) {
    onTapDown = (_) {
      _long = false;
      _timer?.cancel();
      _timer = Timer(const Duration(milliseconds: 500), () {
        _long = true;
        onSelect();
      });
    };
    onTap = () {
      _timer?.cancel();
      if (_long) {
        _long = false;
        return;
      }
      onSelect();
    };
    onTapCancel = () {
      _timer?.cancel();
      _long = false;
    };
  }

  final VoidCallback onSelect;
  Timer? _timer;
  bool _long = false;
}

// Morceaux de texte d'un verset, carte 59 : les mêmes mots
// touchables que verseWordRichText, mais rendus comme une liste
// de morceaux, pour les assembler dans un seul texte continu
// de chapitre, avec un fond de surlignage commun quand le
// verset est sélectionné ou coloré.
List<InlineSpan> verseWordSpans(
  String text,
  TextStyle baseStyle,
  Set<int> highlighted,
  void Function(int index) onTapWord,
  void Function(int index) onLongPressWord, {
  Color? background,
}) {
  final words = text.split(' ');
  final out = <InlineSpan>[];
  for (var i = 0; i < words.length; i++) {
    if (i > 0) {
      out.add(TextSpan(
        text: ' ',
        style: background == null ? null : baseStyle.copyWith(backgroundColor: background),
      ));
    }
    out.add(TextSpan(
      text: words[i],
      style: highlighted.contains(i)
          ? baseStyle.copyWith(
              decoration: TextDecoration.underline,
              decorationColor: const Color(0xFFD4A72C),
              decorationThickness: 2,
              backgroundColor: background,
            )
          : (background == null ? null : baseStyle.copyWith(backgroundColor: background)),
      recognizer: _WordGesture(
        onTapWord: () => onTapWord(i),
        onLongPressWord: () => onLongPressWord(i),
      ),
    ));
  }
  return out;
}

Widget verseWordRichText(
  String text,
  TextStyle baseStyle,
  Set<int> highlighted,
  void Function(int index) onTapWord,
  void Function(int index) onLongPressWord, {
  TextAlign textAlign = TextAlign.start,
}) {
  return RichText(
    textAlign: textAlign,
    text: TextSpan(
      style: baseStyle,
      children: verseWordSpans(text, baseStyle, highlighted, onTapWord, onLongPressWord),
    ),
  );
}

// Découpe un mot tapé dans un verset pour la recherche dans le
// dictionnaire : ponctuation retirée, casse et accents retirés,
// le mot affiché reste tel quel, avec sa ponctuation.
String verseWordClean(String word) {
  const accents = {
    'à': 'a', 'á': 'a', 'â': 'a', 'ä': 'a', 'è': 'e', 'é': 'e', 'ê': 'e',
    'ë': 'e', 'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i', 'ò': 'o', 'ó': 'o',
    'ô': 'o', 'ö': 'o', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ç': 'c',
    'ÿ': 'y', 'æ': 'ae', 'œ': 'oe',
  };
  var out = word.toLowerCase();
  out = out.replaceAll(RegExp(r"[^a-zà-ÿ']"), '');
  final buf = StringBuffer();
  for (final c in out.runes) {
    final ch = String.fromCharCode(c);
    buf.write(accents[ch] ?? ch);
  }
  return buf.toString().replaceAll("'", '');
}

// Cherche une entrée du dictionnaire existant, 114 entrées, par
// son mot français, sans accent et sans casse. Le premier match
// l'emporte, sans rien inventer quand il n'y en a pas.
T? findDictionaryEntry<T>(
  List<T> entries,
  String Function(T e) french,
  String word,
) {
  final clean = verseWordClean(word);
  if (clean.isEmpty) return null;
  for (final e in entries) {
    if (verseWordClean(french(e)) == clean) return e;
  }
  return null;
}
