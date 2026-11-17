// Service WebRTC des appels à deux, 16 nov. 2026.
// Pair à pair : le média va direct d'un téléphone à l'autre,
// le serveur ne relaye que la signalisation. L'interface
// abstraite permet de tester les écrans avec un faux service,
// sans micro ni caméra : flutter_webrtc ne tourne pas dans
// flutter test (canaux natifs absents).

import 'package:flutter_webrtc/flutter_webrtc.dart';

/// Service d'appel WebRTC, injecté dans l'écran en cours d'appel.
abstract class ServiceAppelWebRtc {
  /// Prépare le micro (et la caméra en vidéo) et la connexion.
  /// [configIce] est la configuration renvoyée par le serveur.
  Future<void> preparer({
    required bool video,
    required Map<String, dynamic> configIce,
  });

  /// Crée l'offre SDP de l'appelant.
  Future<Map<String, dynamic>> creerOffre();

  /// Applique l'offre reçue et crée la réponse SDP de l'appelé.
  Future<Map<String, dynamic>> creerReponse(Map<String, dynamic> offre);

  /// Applique la réponse SDP reçue (appelant).
  Future<void> appliquerReponse(Map<String, dynamic> reponse);

  /// Ajoute un candidat ICE reçu.
  Future<void> ajouterCandidat(Map<String, dynamic> candidat);

  /// Appelé pour chaque candidat ICE local à envoyer.
  void quandCandidat(void Function(Map<String, dynamic>) rappel);

  /// Appelé quand le flux distant arrive.
  void quandFluxDistant(void Function() rappel);

  /// Appelé quand la connexion tombe ou se termine.
  void quandConnexionPerdue(void Function() rappel);

  /// Coupe ou remet le micro.
  Future<void> setMuet(bool muet);

  /// Bascule le son sur le haut-parleur.
  Future<void> setHautParleur(bool actif);

  /// Coupe ou remet la caméra (vidéo seulement).
  Future<void> setCameraActive(bool active);

  /// Bascule entre caméra avant et arrière.
  Future<void> basculerCamera();

  /// Flux local (micro, caméra en vidéo), null avant préparation.
  MediaStream? get fluxLocal;

  /// Flux distant, null tant que l'autre ne transmet pas.
  MediaStream? get fluxDistant;

  /// Rendu local, pour RTCVideoView.
  RTCVideoRenderer get renduLocal;

  /// Rendu distant, pour RTCVideoView.
  RTCVideoRenderer get renduDistant;

  /// Libère la connexion, les flux et les rendus.
  Future<void> liberer();
}

/// Implémentation réelle, flutter_webrtc.
class ServiceAppelWebRtcReel implements ServiceAppelWebRtc {
  RTCPeerConnection? _connexion;
  MediaStream? _fluxLocal;
  MediaStream? _fluxDistant;
  final RTCVideoRenderer _renduLocal = RTCVideoRenderer();
  final RTCVideoRenderer _renduDistant = RTCVideoRenderer();
  void Function(Map<String, dynamic>)? _rappelCandidat;
  void Function()? _rappelFluxDistant;
  void Function()? _rappelConnexionPerdue;
  bool _distantDefini = false;
  bool _libere = false;

  @override
  RTCVideoRenderer get renduLocal => _renduLocal;

  @override
  RTCVideoRenderer get renduDistant => _renduDistant;

  @override
  MediaStream? get fluxLocal => _fluxLocal;

  @override
  MediaStream? get fluxDistant => _fluxDistant;

  @override
  void quandCandidat(void Function(Map<String, dynamic>) rappel) {
    _rappelCandidat = rappel;
  }

  @override
  void quandFluxDistant(void Function() rappel) {
    _rappelFluxDistant = rappel;
  }

  @override
  void quandConnexionPerdue(void Function() rappel) {
    _rappelConnexionPerdue = rappel;
  }

  @override
  Future<void> preparer({
    required bool video,
    required Map<String, dynamic> configIce,
  }) async {
    await _renduLocal.initialize();
    await _renduDistant.initialize();
    final flux = await navigator.mediaDevices.getUserMedia({
      'audio': true,
      'video': video ? {'facingMode': 'user'} : false,
    });
    _fluxLocal = flux;
    _renduLocal.srcObject = flux;
    final connexion = await createPeerConnection(configIce, {});
    _connexion = connexion;
    await connexion.addStream(flux);
    connexion.onIceCandidate = (candidat) {
      if (candidat.candidate == null || candidat.candidate!.isEmpty) return;
      _rappelCandidat?.call({
        'candidate': candidat.candidate,
        'sdpMid': candidat.sdpMid,
        'sdpMLineIndex': candidat.sdpMLineIndex,
      });
    };
    connexion.onAddStream = (fluxDistant) {
      _definirDistant(fluxDistant);
    };
    connexion.onTrack = (evenement) {
      final fluxDistant = evenement.streams.isNotEmpty
          ? evenement.streams.first
          : null;
      if (fluxDistant != null) _definirDistant(fluxDistant);
    };
    connexion.onIceConnectionState = (etat) {
      // Seule une défaillance termine l'appel : une coupure
      // transitoire se rétablit seule, sans rien faire.
      if (etat == RTCIceConnectionState.RTCIceConnectionStateFailed) {
        _rappelConnexionPerdue?.call();
      }
    };
  }

  void _definirDistant(MediaStream flux) {
    _fluxDistant = flux;
    if (!_distantDefini) {
      _distantDefini = true;
      _renduDistant.srcObject = flux;
      _rappelFluxDistant?.call();
    }
  }

  @override
  Future<Map<String, dynamic>> creerOffre() async {
    final connexion = _connexion;
    if (connexion == null) throw StateError('Connexion non préparée.');
    final offre = await connexion.createOffer();
    await connexion.setLocalDescription(offre);
    return {'sdp': offre.sdp, 'type': offre.type};
  }

  @override
  Future<Map<String, dynamic>> creerReponse(
    Map<String, dynamic> offre,
  ) async {
    final connexion = _connexion;
    if (connexion == null) throw StateError('Connexion non préparée.');
    await connexion.setRemoteDescription(
      RTCSessionDescription(offre['sdp'] as String?, offre['type'] as String?),
    );
    final reponse = await connexion.createAnswer();
    await connexion.setLocalDescription(reponse);
    return {'sdp': reponse.sdp, 'type': reponse.type};
  }

  @override
  Future<void> appliquerReponse(Map<String, dynamic> reponse) async {
    final connexion = _connexion;
    if (connexion == null) throw StateError('Connexion non préparée.');
    await connexion.setRemoteDescription(
      RTCSessionDescription(
        reponse['sdp'] as String?,
        reponse['type'] as String?,
      ),
    );
  }

  @override
  Future<void> ajouterCandidat(Map<String, dynamic> candidat) async {
    final connexion = _connexion;
    if (connexion == null) return;
    await connexion.addCandidate(
      RTCIceCandidate(
        candidat['candidate'] as String?,
        candidat['sdpMid'] as String?,
        candidat['sdpMLineIndex'] as int?,
      ),
    );
  }

  @override
  Future<void> setMuet(bool muet) async {
    for (final piste in _fluxLocal?.getAudioTracks() ?? const []) {
      piste.enabled = !muet;
    }
  }

  @override
  Future<void> setHautParleur(bool actif) async {
    await Helper.setSpeakerphoneOn(actif);
  }

  @override
  Future<void> setCameraActive(bool active) async {
    for (final piste in _fluxLocal?.getVideoTracks() ?? const []) {
      piste.enabled = active;
    }
  }

  @override
  Future<void> basculerCamera() async {
    final pistes = _fluxLocal?.getVideoTracks() ?? const [];
    if (pistes.isEmpty) return;
    await Helper.switchCamera(pistes.first);
  }

  @override
  Future<void> liberer() async {
    if (_libere) return;
    _libere = true;
    try {
      await _connexion?.close();
    } catch (_) {}
    _connexion = null;
    for (final piste in _fluxLocal?.getTracks() ?? const []) {
      try {
        await piste.stop();
      } catch (_) {}
    }
    _fluxLocal = null;
    try {
      await _renduLocal.dispose();
    } catch (_) {}
    try {
      await _renduDistant.dispose();
    } catch (_) {}
  }
}
