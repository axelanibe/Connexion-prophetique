// Lecture audio de CONNEXION PROPHÉTIQUE.
// Enseignements : lecteur intégré just_audio (lecture, pause, reprise,
// avance et retour de 10 secondes, barre de progression, durée).
// Bible audio : synthèse vocale de l'appareil seulement (flutter_tts),
// jamais une voix clonée ni un enregistrement studio. La synthèse
// choisit en priorité une voix d'homme dans la langue du texte quand
// l'appareil en propose une, sinon la meilleure voix disponible de
// l'appareil. Mention reprise de la version web, affichée par l'appelant.
//
// Correctif 27 oct. 2026, écoute du chapitre qui ne fonctionnait pas
// toujours, cas Genèse 1 en King James : le bouton affichait Arrêter
// mais aucun son ne sortait, alors que le verset du jour parlait.
// Causes établies :
// 1) Genèse 1 entier fait 4 057 caractères, au-delà de la limite de
//    la synthèse Android (environ 4 000), donc l'ancien envoi d'un
//    chapitre entier échouait en silence, sans fin ni erreur, et le
//    bouton restait bloqué sur Arrêter. La lecture se fait donc
//    verset par verset, chaque verset faisant au maximum 251
//    caractères pour Genèse 1.
// 2) Si la tablette n'a aucune voix anglaise installée, ou si la
//    voix d'homme choisie n'existe pas pour en-US, la synthèse
//    échoue aussi en silence. On vérifie donc la disponibilité de
//    la langue, on choisit la voix dans l'ordre exact, on retente
//    une fois sans voix imposée, et si rien ne démarre, on renvoie
//    false avec une raison claire, jamais un état Arrêter sans son.
// 3) L'ancien délai d'attente de fin (15 + longueur/8 secondes)
//    laissait le bouton sur Arrêter longtemps sans son. On détecte
//    désormais le démarrage réel : si aucun son ne démarre dans les
//    4 secondes, c'est un échec immédiat, pas une attente.
import 'dart:async';

import 'package:flutter_tts/flutter_tts.dart';

export 'package:just_audio/just_audio.dart' show AudioPlayer, PlayerState, ProcessingState;

/// Réglages Bible audio, recommandés le 27 oct. 2026 et appliqués
/// ici, verset du jour comme chapitre, même voix, même débit :
/// débit 0,5, retour à l'ancien réglage le 27 oct. 2026, à la
/// demande d'Axel, après un passage à 0,95 ; voix
/// calme et naturelle, sans lenteur excessive ; hauteur 1,0,
/// voix naturelle, sans modification artificielle de la tonalité ;
/// pauses 0,2 à 0,6 seconde selon la ponctuation, voir
/// _speakWithPauses. Avant, le verset lisait à 0,5 et le chapitre
/// à 0,9 par défaut, d'où deux lectures différentes.
const double kBibleSpeechRate = 0.5;
const double kBiblePitch = 1.0;

class VerseTts {
  VerseTts() : _tts = FlutterTts();
  final FlutterTts _tts;
  bool _speaking = false;
  bool _stopped = false;
  Completer<void>? _done;
  bool get speaking => _speaking;

  /// Raison du dernier échec, lue par l'appelant pour le message :
  /// '' (pas d'échec), 'no_voice_en', 'no_voice_fr', 'speak_failed'.
  String lastErrorKey = '';

  String _normLocale(String s) => s.replaceAll('_', '-').toLowerCase();

  Future<bool> _languageAvailable(String locale) async {
    try {
      final r = await _tts.isLanguageAvailable(locale);
      if (r is bool) return r;
      if (r is num) return r >= 0;
      if (r is String) return r.toLowerCase() != 'false' && r != '-2' && r != '-1';
      return true; // Réponse inconnue : on ne bloque pas la lecture.
    } catch (_) {
      return true;
    }
  }

  /// Voix choisie dans l'ordre : homme + locale exacte, puis
  /// n'importe quelle voix + locale exacte, puis homme + langue,
  /// puis n'importe quelle voix + langue. Null = voix par défaut
  /// de l'appareil pour cette langue.
  Future<Map<String, String>?> _pickVoice(String lang, String locale) async {
    try {
      final voices = await _tts.getVoices;
      if (voices is! List || voices.isEmpty) return null;
      final norm = _normLocale(locale);
      bool isLang(Map v) => _normLocale((v['locale'] ?? '').toString()).startsWith(lang);
      bool isExact(Map v) => _normLocale((v['locale'] ?? '').toString()) == norm;
      bool isMale(Map v) {
        final name = (v['name'] ?? '').toString().toLowerCase();
        return name.contains('male') || name.contains('homme') || name.contains('masculin') || name.contains('#male');
      }

      Map<String, String>? asVoice(Map v) =>
          {'name': (v['name'] ?? '').toString(), 'locale': (v['locale'] ?? '').toString()};
      final inLang = voices.whereType<Map>().where(isLang).toList();
      for (final test in <bool Function(Map)>[
        (v) => isExact(v) && isMale(v),
        isExact,
        (v) => isMale(v),
        (_) => true,
      ]) {
        for (final v in inLang) {
          if (test(v) && (v['name'] ?? '').toString().isNotEmpty) return asVoice(v);
        }
      }
      return null;
    } catch (_) {
      return null;
    }
  }

  bool _failed = false;
  Future<bool> _speakOne(String text) async {
    if (_stopped) return false;
    _failed = false;
    final started = Completer<bool>();
    final done = Completer<void>();
    _done = done;
    _tts.setStartHandler(() {
      if (!started.isCompleted) started.complete(true);
    });
    _tts.setCompletionHandler(() {
      if (!done.isCompleted) done.complete();
    });
    _tts.setErrorHandler((_) {
      _failed = true;
      if (!started.isCompleted) started.complete(false);
      if (!done.isCompleted) done.complete();
    });
    _tts.setCancelHandler(() {
      if (!done.isCompleted) done.complete();
    });
    try {
      await _tts.speak(text);
    } catch (_) {
      _failed = true;
      if (!started.isCompleted) started.complete(false);
      if (!done.isCompleted) done.complete();
      return false;
    }
    // Démarrage réel : si aucun son ne démarre dans les 4 secondes,
    // c'est un échec immédiat, on ne laisse pas le bouton sur
    // Arrêter en silence pendant le délai de fin.
    bool didStart = false;
    try {
      didStart = await started.future.timeout(const Duration(seconds: 4));
    } catch (_) {
      didStart = false;
    }
    if (!didStart || _failed) {
      try {
        await _tts.stop();
      } catch (_) {}
      return false;
    }
    // Fin réelle, avec un délai large : un verset de 250 caractères
    // à rythme posé prend moins de 30 secondes, la marge couvre
    // les appareils lents sans bloquer indéfiniment.
    try {
      await done.future.timeout(Duration(seconds: 30 + (text.length ~/ 4)));
    } catch (_) {}
    return !_stopped && !_failed;
  }

  Future<bool> speak(String text, String lang, {double rate = kBibleSpeechRate}) async {
    return speakVerses(<String>[text], lang, rate: rate);
  }

  /// Lit les textes dans l'ordre, un par un. Renvoie true si la
  /// lecture est allée au bout, false si elle a été arrêtée, si
  /// aucune voix de la langue n'est disponible, ou si la synthèse
  /// a échoué. Dans ce dernier cas, lastErrorKey dit pourquoi.
  /// Découpe un texte en phrases, avec la pause recommandée après
  /// chacune : 0,25 s après une virgule, un point-virgule ou deux
  /// points, 0,6 s après un point, un point d'interrogation, un
  /// point d'exclamation ou un saut de paragraphe. La synthèse de
  /// l'appareil marque déjà ses propres pauses à la ponctuation,
  /// ces délais s'ajoutent, ils ne remplacent pas sa prosodie.
  List<(String, double)> _splitPhrases(String text) {
    final out = <(String, double)>[];
    final buf = StringBuffer();
    for (var i = 0; i < text.length; i++) {
      final ch = text[i];
      buf.write(ch);
      if (ch == ',' || ch == ';' || ch == ':') {
        out.add((buf.toString(), 0.25));
        buf.clear();
      } else if (ch == '.' || ch == '?' || ch == '!' || ch == '\n') {
        out.add((buf.toString(), 0.6));
        buf.clear();
      }
    }
    if (buf.isNotEmpty) out.add((buf.toString(), 0.0));
    return out;
  }

  /// Lit un texte phrase par phrase, avec les pauses recommandées
  /// entre les phrases. Renvoie false si la première phrase échoue,
  /// pour que l'appelant puisse retenter sans voix imposée.
  Future<bool> _speakWithPauses(String text) async {
    final phrases = _splitPhrases(text);
    var first = true;
    for (final phrase in phrases) {
      if (_stopped || phrase.$1.trim().isEmpty) continue;
      final ok = await _speakOne(phrase.$1);
      if (_stopped) return false;
      if (!ok && first) return false;
      first = false;
      if (phrase.$2 > 0 && !_stopped) {
        await Future.delayed(Duration(milliseconds: (phrase.$2 * 1000).round()));
      }
    }
    return true;
  }

  Future<bool> speakVerses(List<String> texts, String lang, {double rate = kBibleSpeechRate}) async {
    _stopped = false;
    _speaking = true;
    lastErrorKey = '';
    try {
      await _tts.stop();
      // Locales essayées dans l'ordre pour la langue demandée.
      final locales = lang == 'en' ? const ['en-US', 'en-GB', 'en'] : const ['fr-FR', 'fr'];
      String? effectiveLocale;
      for (final loc in locales) {
        if (await _languageAvailable(loc)) {
          effectiveLocale = loc;
          break;
        }
      }
      final voice = effectiveLocale == null
          ? null
          : await _pickVoice(lang, effectiveLocale);
      if (effectiveLocale == null && voice == null) {
        // Aucune locale disponible et aucune voix de la langue :
        // on ne lance pas une lecture silencieuse.
        lastErrorKey = lang == 'en' ? 'no_voice_en' : 'no_voice_fr';
        return false;
      }
      final locale = effectiveLocale ?? (lang == 'en' ? 'en-US' : 'fr-FR');
      Future<void> apply({required bool useVoice}) async {
        await _tts.setLanguage(locale);
        await _tts.setSpeechRate(rate);
        await _tts.setPitch(kBiblePitch);
        if (useVoice && voice != null) {
          try {
            await _tts.setVoice(voice);
          } catch (_) {}
        }
      }

      await apply(useVoice: true);
      var succeeded = 0;
      var retriedWithoutVoice = false;
      for (var vi = 0; vi < texts.length; vi++) {
        final text = texts[vi];
        if (_stopped || text.trim().isEmpty) continue;
        var ok = await _speakWithPauses(text);
        if (_stopped) return false;
        if (!ok && vi == 0 && !retriedWithoutVoice) {
          // Premier verset en échec : la voix imposée est peut-être
          // celle qui casse la synthèse en silence. On retente une
          // fois avec la voix par défaut de l'appareil, avant de
          // déclarer l'échec. C'est le repli demandé pour la
          // tablette sans voix d'homme anglaise.
          retriedWithoutVoice = true;
          await apply(useVoice: false);
          ok = await _speakWithPauses(text);
          if (_stopped) return false;
        }
        if (ok) succeeded++;
      }
      if (succeeded == 0) {
        lastErrorKey = 'speak_failed';
        return false;
      }
      return !_stopped;
    } catch (_) {
      lastErrorKey = 'speak_failed';
      return false;
    } finally {
      _speaking = false;
      _done = null;
    }
  }

  Future<void> stop() async {
    _stopped = true;
    _speaking = false;
    if (_done != null && !_done!.isCompleted) _done!.complete();
    try {
      await _tts.stop();
    } catch (_) {}
  }
}
