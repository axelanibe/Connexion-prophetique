// Lecture audio de CONNEXION PROPHÉTIQUE.
// Enseignements : lecteur intégré just_audio (lecture, pause, reprise,
// avance et retour de 10 secondes, barre de progression, durée).
// Bible audio : synthèse vocale de l'appareil seulement (flutter_tts),
// jamais une voix clonée ni un enregistrement studio. La synthèse
// choisit en priorité une voix d'homme dans la langue du texte quand
// l'appareil en propose une, sinon la meilleure voix disponible de
// l'appareil. Mention reprise de la version web, affichée par l'appelant.
import 'package:flutter_tts/flutter_tts.dart';

export 'package:just_audio/just_audio.dart' show AudioPlayer, PlayerState, ProcessingState;

class VerseTts {
  VerseTts() : _tts = FlutterTts();
  final FlutterTts _tts;
  bool _speaking = false;
  bool get speaking => _speaking;

  Future<void> speak(String text, String lang) async {
    await _tts.stop();
    final locale = lang == 'en' ? 'en-US' : 'fr-FR';
    await _tts.setLanguage(locale);
    await _tts.setSpeechRate(0.5);
    await _tts.setPitch(1.0);
    // Voix d'homme en priorité, si l'appareil en propose une dans la langue.
    try {
      final voices = await _tts.getVoices;
      if (voices is List) {
        for (final v in voices) {
          if (v is Map) {
            final name = (v['name'] ?? '').toString().toLowerCase();
            final loc = (v['locale'] ?? '').toString().toLowerCase();
            final isLang = loc.startsWith(lang == 'en' ? 'en' : 'fr');
            final isMale = name.contains('male') || name.contains('homme') || name.contains('masculin') || name.contains('#male');
            if (isLang && isMale) {
              await _tts.setVoice({'name': v['name'].toString(), 'locale': v['locale'].toString()});
              break;
            }
          }
        }
      }
    } catch (_) {}
    _speaking = true;
    _tts.setCompletionHandler(() => _speaking = false);
    _tts.setErrorHandler((_) => _speaking = false);
    _tts.setCancelHandler(() => _speaking = false);
    await _tts.speak(text);
  }

  Future<void> stop() async {
    _speaking = false;
    await _tts.stop();
  }
}
