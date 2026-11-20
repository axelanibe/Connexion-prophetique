// Sonnerie et tonalité d'appel, étape 2, 20 nov. 2026.
// Sonnerie en boucle côté appelé pendant la sonnerie, tonalité
// d'attente en boucle côté appelant, avec just_audio, déjà utilisé
// pour les enseignements. Les deux sons s'arrêtent quand l'appel
// est décroché, refusé ou expiré. L'interface permet de tester
// les écrans avec un faux lecteur, sans audio ni plateforme.
import 'package:flutter/foundation.dart';
import 'package:just_audio/just_audio.dart';

/// Sonnerie de l'appelé, deux bips 880 Hz en boucle.
const assetSonnerieAppel = 'assets/audio/sonnerie-appel.wav';

/// Tonalité d'attente de l'appelant, 440 Hz en boucle.
const assetTonaliteAppel = 'assets/audio/tonalite-appel.wav';

/// Lecteur de sonnerie d'appel, en boucle jusqu'à l'arrêt.
abstract class LecteurSonnerieAppel {
  /// Joue l'asset en boucle. Ne lève jamais : un échec audio ne
  /// doit pas empêcher l'appel de sonner visuellement.
  Future<void> jouerEnBoucle(String asset);

  /// Arrête le son, s'il joue.
  Future<void> arreter();

  /// Libère le lecteur.
  Future<void> liberer();
}

/// Implémentation réelle, just_audio.
class LecteurSonnerieJustAudio implements LecteurSonnerieAppel {
  AudioPlayer? _lecteur;

  @override
  Future<void> jouerEnBoucle(String asset) async {
    try {
      _lecteur ??= AudioPlayer();
      await _lecteur!.stop();
      await _lecteur!.setAsset(asset);
      await _lecteur!.setLoopMode(LoopMode.all);
      await _lecteur!.setVolume(1.0);
      await _lecteur!.play();
    } catch (e) {
      // Journalisée, 20 nov. 2026 : avant, l'échec était avalé en
      // silence et une tonalité inaudible restait un mystère.
      // Sans geste de l'utilisateur, le navigateur peut bloquer
      // la lecture sur le web : l'appel sonne quand même à l'écran.
      debugPrint('Sonnerie appel : lecture impossible ($asset) : $e');
    }
  }

  @override
  Future<void> arreter() async {
    try {
      await _lecteur?.stop();
    } catch (_) {}
  }

  @override
  Future<void> liberer() async {
    try {
      await _lecteur?.dispose();
    } catch (_) {}
    _lecteur = null;
  }
}
