// Service WebRTC des appels à deux, 16 nov. 2026.
// Pair à pair : le média va direct d'un téléphone à l'autre,
// le serveur ne relaye que la signalisation. L'interface
// abstraite permet de tester les écrans avec un faux service,
// sans micro ni caméra : flutter_webrtc ne tourne pas dans
// flutter test (canaux natifs absents).

import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter_webrtc/flutter_webrtc.dart';

import 'bug_reports.dart';

/// Service d'appel WebRTC, injecté dans l'écran en cours d'appel.
abstract class ServiceAppelWebRtc {
  /// Ouvre le micro (et la caméra en vidéo), sans créer la
  /// connexion : l'écran le lance en parallèle de la récupération
  /// de la configuration ICE, étape 2, 20 nov. 2026.
  Future<void> ouvrirMicro({required bool video});

  /// Prépare le micro (et la caméra en vidéo) et la connexion.
  /// [configIce] est la configuration renvoyée par le serveur.
  /// Si le micro est déjà ouvert par [ouvrirMicro], il est réutilisé.
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

  /// Ajoute la vidéo à un appel audio en cours (carte 156) : ouvre
  /// la caméra, ajoute la piste vidéo et crée une nouvelle offre
  /// à envoyer. Renvoie l'offre, ou null si la connexion n'est
  /// pas prête ou si la caméra ne s'ouvre pas.
  Future<Map<String, dynamic>?> ajouterVideo();

  /// Ouvre la caméra et ajoute la piste vidéo à la connexion,
  /// sans créer d'offre (carte 156) : le côté qui répond à une
  /// offre de bascule envoie ainsi sa propre vidéo dans la
  /// réponse. Renvoie faux si la connexion n'est pas prête ou
  /// si la caméra ne s'ouvre pas.
  Future<bool> ajouterPisteVideo();

  /// Partage l'écran à la place de la caméra (carte 158) : capture
  /// l'écran et remplace la piste vidéo locale par la piste
  /// d'écran. Renvoie faux si la capture est refusée ou
  /// indisponible, par exemple sur iOS, où flutter_webrtc ne
  /// prend pas en charge la capture d'écran.
  Future<bool> partagerEcran();

  /// Arrête le partage d'écran et revient à la caméra (carte 158).
  Future<void> arreterPartageEcran();

  /// Vrai quand l'écran est partagé en ce moment.
  bool get ecranPartage;

  /// Appelé quand le partage d'écran se termine seul, par
  /// exemple quand l'utilisateur l'arrête depuis le système.
  void quandPartageTermine(void Function() rappel);

  /// Flux local (micro, caméra en vidéo), null avant préparation.
  MediaStream? get fluxLocal;

  /// Flux distant, null tant que l'autre ne transmet pas.
  MediaStream? get fluxDistant;

  /// Rendu local, pour RTCVideoView.
  RTCVideoRenderer get renduLocal;

  /// Rendu distant, pour RTCVideoView.
  RTCVideoRenderer get renduDistant;

  /// Vraie route audio tenue par le service, carte 157 : elle
  /// n'est posée qu'après le succès de Helper, c'est la seule
  /// vérité que le bouton affiche.
  bool get hautParleur;

  /// Statistiques WebRTC de l'appel en cours, carte 166 : codec
  /// négocié, paquets perdus, gigue, débit réel envoyé, images
  /// par seconde et résolution. Un résumé vide si la connexion
  /// n'est pas prête ou si la lecture échoue, jamais une
  /// exception : l'appel continue sans statistiques.
  Future<Map<String, dynamic>> statistiquesAppel();

  /// Libère la connexion, les flux et les rendus.
  Future<void> liberer();
}

/// Vrai quand le rendu distant doit être reposé, carte 165 : le
/// rendu natif ne prend que la première piste vidéo au moment où
/// on le pose, il ne voit jamais une piste ajoutée ensuite. Il
/// faut donc reposer le rendu quand une piste vidéo arrive et
/// qu'aucune n'était attachée, ou quand la piste attachée a
/// changé. Sans piste vidéo, jamais : un appel audio n'a rien à
/// rattacher.
bool doitRattacherRenduDistant(
  String? idPisteAttachee,
  String? idPisteCourante,
) =>
    idPisteCourante != null && idPisteCourante != idPisteAttachee;

/// Résumé des statistiques WebRTC brutes, carte 166 : codec
/// négocié, paquets perdus à l'envoi et à la réception, gigue,
/// aller-retour, débit réel envoyé, images par seconde et
/// résolution envoyée. Le débit est calculé sur la différence
/// des octets envoyés entre deux résumés, [precedent] étant le
/// résumé précédent, avec ses clés octetsEnvoyes et
/// horodatageMs. Une valeur absente donne null, jamais une
/// exception : un rapport incomplet reste lisible.
Map<String, dynamic> resumerStatistiquesAppel(
  List<StatsReport> rapports, {
  Map<String, dynamic>? precedent,
}) {
  String? codecVideo;
  int? octetsEnvoyes;
  int? paquetsEnvoyes;
  int? paquetsPerdusEnvoi;
  int? paquetsPerdusReception;
  double? gigueEnvoi;
  double? gigueReception;
  double? allerRetourMs;
  double? imagesParSeconde;
  int? largeur;
  int? hauteur;
  for (final rapport in rapports) {
    final valeurs = rapport.values;
    if (rapport.type == 'codec') {
      final mime = (valeurs['mimeType'] ?? '').toString();
      if (mime.startsWith('video/')) {
        codecVideo = mime.substring('video/'.length);
      }
    } else if (rapport.type == 'outbound-rtp' &&
        valeurs['kind'] == 'video') {
      octetsEnvoyes = (valeurs['bytesSent'] as num?)?.toInt();
      paquetsEnvoyes = (valeurs['packetsSent'] as num?)?.toInt();
      imagesParSeconde = (valeurs['framesPerSecond'] as num?)?.toDouble();
      largeur = (valeurs['frameWidth'] as num?)?.toInt();
      hauteur = (valeurs['frameHeight'] as num?)?.toInt();
    } else if (rapport.type == 'remote-inbound-rtp' &&
        valeurs['kind'] == 'video') {
      paquetsPerdusEnvoi = (valeurs['packetsLost'] as num?)?.toInt();
      gigueEnvoi = (valeurs['jitter'] as num?)?.toDouble();
      final allerRetour = (valeurs['roundTripTime'] as num?)?.toDouble();
      if (allerRetour != null) allerRetourMs = allerRetour * 1000;
    } else if (rapport.type == 'inbound-rtp' && valeurs['kind'] == 'video') {
      paquetsPerdusReception = (valeurs['packetsLost'] as num?)?.toInt();
      gigueReception = (valeurs['jitter'] as num?)?.toDouble();
    } else if (rapport.type == 'candidate-pair' &&
        valeurs['state'] == 'succeeded') {
      final allerRetour =
          (valeurs['currentRoundTripTime'] as num?)?.toDouble();
      if (allerRetourMs == null && allerRetour != null) {
        allerRetourMs = allerRetour * 1000;
      }
    }
  }
  double? debitKbitS;
  final octetsPrecedents = (precedent?['octetsEnvoyes'] as num?)?.toInt();
  final horodatagePrecedent = (precedent?['horodatageMs'] as num?)?.toInt();
  final horodatageMs = DateTime.now().millisecondsSinceEpoch;
  if (octetsEnvoyes != null &&
      octetsPrecedents != null &&
      horodatagePrecedent != null) {
    final secondes = (horodatageMs - horodatagePrecedent) / 1000;
    if (secondes > 0 && octetsEnvoyes >= octetsPrecedents) {
      debitKbitS = (octetsEnvoyes - octetsPrecedents) * 8 / secondes / 1000;
    }
  }
  return <String, dynamic>{
    'codecVideo': codecVideo,
    'octetsEnvoyes': octetsEnvoyes,
    'paquetsEnvoyes': paquetsEnvoyes,
    'paquetsPerdusEnvoi': paquetsPerdusEnvoi,
    'paquetsPerdusReception': paquetsPerdusReception,
    'gigueEnvoiMs': gigueEnvoi == null ? null : gigueEnvoi * 1000,
    'gigueReceptionMs': gigueReception == null ? null : gigueReception * 1000,
    'allerRetourMs': allerRetourMs,
    'debitSortantKbitS': debitKbitS,
    'imagesParSeconde': imagesParSeconde,
    'largeur': largeur,
    'hauteur': hauteur,
    'horodatageMs': horodatageMs,
  };
}

/// Formate le résumé des statistiques pour l'écran, carte 166 :
/// une ligne par mesure, « inconnu » quand la mesure est absente,
/// pour que le membre puisse la copier et l'envoyer à la structure.
String formaterStatistiques(Map<String, dynamic> resume) {
  String ligne(String nom, Object? valeur, [String unite = '']) {
    if (valeur == null) return '$nom : inconnu';
    if (valeur is double) return '$nom : ${valeur.toStringAsFixed(1)}$unite';
    return '$nom : $valeur$unite';
  }

  final resolution = resume['largeur'] != null && resume['hauteur'] != null
      ? '${resume['largeur']}x${resume['hauteur']}'
      : null;
  return <String>[
    ligne('Codec vidéo', resume['codecVideo']),
    ligne('Débit sortant', resume['debitSortantKbitS'], ' kbit/s'),
    ligne('Paquets envoyés', resume['paquetsEnvoyes']),
    ligne('Paquets perdus (envoi)', resume['paquetsPerdusEnvoi']),
    ligne('Paquets perdus (réception)', resume['paquetsPerdusReception']),
    ligne('Gigue (envoi)', resume['gigueEnvoiMs'], ' ms'),
    ligne('Gigue (réception)', resume['gigueReceptionMs'], ' ms'),
    ligne('Aller-retour', resume['allerRetourMs'], ' ms'),
    ligne('Images par seconde', resume['imagesParSeconde']),
    ligne('Résolution envoyée', resolution),
  ].join('\n');
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

  /// Identifiant de la piste vidéo distante attachée au rendu,
  /// carte 165 : le rendu natif ne voit jamais une piste ajoutée
  /// après sa pose. On retient l'identifiant attaché pour savoir
  /// quand reposer le rendu, quand une nouvelle piste arrive.
  String? _idPisteVideoDistante;

  /// Dernier résumé de statistiques, carte 166 : il sert à
  /// calculer le débit réel envoyé, sur la différence des octets
  /// entre deux lectures.
  Map<String, dynamic>? _dernierResumeStats;

  /// Envoyeur de la piste vidéo locale, pour plafonner son débit
  /// (carte 154) et remplacer sa piste (carte 158).
  RTCRtpSender? _envoyeurVideo;

  /// Flux de l'écran partagé (carte 158), null hors partage.
  MediaStream? _fluxEcran;

  /// Piste caméra gardée pendant le partage d'écran (carte 158),
  /// pour revenir à elle.
  MediaStreamTrack? _pisteCamera;

  /// Vrai quand l'écran est partagé (carte 158).
  bool _ecranPartage = false;
  void Function()? _rappelPartageTermine;

  /// Route voulue, 21 nov. 2026 : haut-parleur actif ou écouteur.
  /// Le volume de la piste distante en dépend.
  bool _hautParleur = false;

  @override
  RTCVideoRenderer get renduLocal => _renduLocal;

  @override
  RTCVideoRenderer get renduDistant => _renduDistant;

  @override
  MediaStream? get fluxLocal => _fluxLocal;

  @override
  MediaStream? get fluxDistant => _fluxDistant;

  @override
  bool get hautParleur => _hautParleur;

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
  Future<void> ouvrirMicro({required bool video}) async {
    if (_fluxLocal != null) return;
    await _renduLocal.initialize();
    // Contraintes audio explicites, 21 nov. 2026 : 'audio': true
    // laissait le choix à la plateforme, sans garantie
    // d'annulation d'écho, ce qui nourrissait l'écho en
    // haut-parleur. Les trois sont demandées à vrai.
    // Vidéo plafonnée, carte 154 : sans limite, la caméra
    // envoyait sa pleine résolution et l'image se cassait en
    // blocs sur une connexion limitée. 640 sur 480, 24 images
    // par seconde, en idéal pour laisser retomber proprement.
    final flux = await navigator.mediaDevices.getUserMedia({
      'audio': {
        'echoCancellation': true,
        'noiseSuppression': true,
        'autoGainControl': true,
      },
      'video': video
          ? {
              'facingMode': 'user',
              'width': {'ideal': 640},
              'height': {'ideal': 480},
              'frameRate': {'ideal': 24},
            }
          : false,
    });
    _fluxLocal = flux;
    _renduLocal.srcObject = flux;
  }

  @override
  Future<void> preparer({
    required bool video,
    required Map<String, dynamic> configIce,
  }) async {
    await _renduDistant.initialize();
    if (_fluxLocal == null) {
      await ouvrirMicro(video: video);
    }
    final flux = _fluxLocal!;
    final connexion = await createPeerConnection(configIce, {});
    _connexion = connexion;
    // addStream n'existe pas sur Safari : la méthode est
    // obsolète et WebKit ne l'a jamais implémentée, l'appel
    // levait TypeError ici et l'écran affichait le message
    // générique. On ajoute chaque piste une par une, comme
    // le prévoit le standard, ce qui marche sur Safari
    // comme ailleurs, 20 nov. 2026.
    for (final piste in flux.getTracks()) {
      final envoyeur = await connexion.addTrack(piste, flux);
      // Envoyeur vidéo gardé, carte 154 : pour plafonner son
      // débit, et carte 158, pour remplacer sa piste.
      if (piste.kind == 'video') _envoyeurVideo = envoyeur;
    }
    await _plafonnerDebitVideo();
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
      // Bascule audio vers vidéo, carte 156 : la piste vidéo
      // distante arrive après l'audio, sur le même flux, et
      // _definirDistant ne prévient l'écran qu'une fois. Sans
      // ce rappel, l'écran ne sait pas que la vidéo est là.
      if (evenement.track.kind == 'video') _rappelFluxDistant?.call();
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
    final pistesVideo = flux.getVideoTracks();
    final idPisteVideo =
        pistesVideo.isNotEmpty ? pistesVideo.first.id : null;
    if (!_distantDefini) {
      _distantDefini = true;
      _idPisteVideoDistante = idPisteVideo;
      _renduDistant.srcObject = flux;
      unawaited(_appliquerVolumeDistant());
      _rappelFluxDistant?.call();
    } else if (doitRattacherRenduDistant(
      _idPisteVideoDistante,
      idPisteVideo,
    )) {
      // Bascule audio vers vidéo, carte 165 : le rendu natif ne
      // prend que la première piste vidéo au moment où on le
      // pose, il ne voit jamais une piste ajoutée ensuite. Le
      // correctif de la 156 ne faisait que rappeler l'écran, il
      // ne rattachait jamais le rendu, et la vue restait noire.
      // Reposer le rendu quand la piste vidéo arrive, et
      // rappeler l'écran, pour que la vue s'affiche.
      _idPisteVideoDistante = idPisteVideo;
      _renduDistant.srcObject = flux;
      _rappelFluxDistant?.call();
    }
  }

  /// Plafond du volume de sortie, 21 nov. 2026 : la voix distante
  /// sature et siffle en haut-parleur (écho), on la plafonne à
  /// 0,8 quand le haut-parleur est actif, 1,0 en écouteur.
  /// Un échec ne doit jamais empêcher l'appel.
  Future<void> _appliquerVolumeDistant() async {
    final volume = _hautParleur ? 0.8 : 1.0;
    for (final piste in _fluxDistant?.getAudioTracks() ?? const []) {
      try {
        await Helper.setVolume(volume, piste);
      } catch (e) {
        // B-11 : jamais $e brut journalisé sur un chemin d'appel.
        debugPrint('Appel : volume distant impossible : ${BugReports.scrub('$e')}');
      }
    }
  }

  /// Plafond du débit vidéo, carte 154 : sans plafond, la caméra
  /// envoyait sa pleine résolution et l'image se cassait en blocs
  /// sur une connexion limitée. 500 kbit/s et 24 images par
  /// seconde suffisent pour 640 sur 480. Un échec ne doit jamais
  /// empêcher l'appel.
  Future<void> _plafonnerDebitVideo() async {
    final envoyeur = _envoyeurVideo;
    if (envoyeur == null) return;
    try {
      final parametres = envoyeur.parameters;
      final encodages = parametres.encodings;
      if (encodages == null || encodages.isEmpty) return;
      for (final encodage in encodages) {
        encodage.maxBitrate = 500000;
        encodage.maxFramerate = 24;
      }
      await envoyeur.setParameters(parametres);
    } catch (_) {
      // L'appel continue sans plafond.
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
    // Carte 157 : l'état n'est posé qu'après le succès de Helper.
    // Avant, il était posé avant l'appel plateforme, donc le
    // service croyait le haut-parleur actif alors que la route
    // n'avait pas changé, et le bouton mentait.
    await Helper.setSpeakerphoneOn(actif);
    _hautParleur = actif;
    await _appliquerVolumeDistant();
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
  Future<bool> ajouterPisteVideo() async {
    final connexion = _connexion;
    if (connexion == null || _libere) return false;
    // Déjà une piste vidéo locale : rien à ajouter.
    if (_fluxLocal?.getVideoTracks().isNotEmpty ?? false) return true;
    MediaStream? flux;
    try {
      flux = await navigator.mediaDevices.getUserMedia({
        'audio': false,
        'video': {
          'facingMode': 'user',
          'width': {'ideal': 640},
          'height': {'ideal': 480},
          'frameRate': {'ideal': 24},
        },
      });
      final pistes = flux.getVideoTracks();
      if (pistes.isEmpty) return false;
      final piste = pistes.first;
      // La piste rejoint le flux local, pour l'aperçu et la coupe.
      await _fluxLocal?.addTrack(piste);
      _renduLocal.srcObject = _fluxLocal;
      final envoyeur = await connexion.addTrack(piste, _fluxLocal!);
      _envoyeurVideo = envoyeur;
      await _plafonnerDebitVideo();
      return true;
    } catch (_) {
      // La caméra a pu s'ouvrir avant l'échec : on l'arrête,
      // sinon elle reste allumée sans être envoyée.
      for (final piste in flux?.getTracks() ?? const []) {
        try {
          await piste.stop();
        } catch (_) {}
      }
      return false;
    }
  }

  @override
  Future<Map<String, dynamic>?> ajouterVideo() async {
    final ok = await ajouterPisteVideo();
    if (!ok) return null;
    try {
      return await creerOffre();
    } catch (_) {
      return null;
    }
  }

  @override
  bool get ecranPartage => _ecranPartage;

  @override
  void quandPartageTermine(void Function() rappel) {
    _rappelPartageTermine = rappel;
  }

  @override
  Future<bool> partagerEcran() async {
    final connexion = _connexion;
    if (connexion == null || _libere) return false;
    if (_ecranPartage) return true;
    // Sur iOS, flutter_webrtc ne prend pas en charge la capture
    // d'écran : elle exigerait une extension de diffusion
    // ReplayKit, hors de ce chantier.
    if (defaultTargetPlatform == TargetPlatform.iOS) return false;
    // Sans envoyeur vidéo, il n'y a rien à remplacer.
    final envoyeur = _envoyeurVideo;
    if (envoyeur == null) return false;
    MediaStream? fluxEcran;
    try {
      fluxEcran = await navigator.mediaDevices.getDisplayMedia({
        'video': true,
        'audio': false,
      });
      final pistes = fluxEcran.getVideoTracks();
      if (pistes.isEmpty) return false;
      final pisteEcran = pistes.first;
      // La piste caméra est gardée, pour revenir à elle.
      final pistesCamera = _fluxLocal?.getVideoTracks() ?? const [];
      _pisteCamera = pistesCamera.isNotEmpty ? pistesCamera.first : null;
      await envoyeur.replaceTrack(pisteEcran);
      _fluxEcran = fluxEcran;
      _ecranPartage = true;
      // L'aperçu local montre l'écran partagé.
      _renduLocal.srcObject = fluxEcran;
      await _plafonnerDebitVideo();
      // Arrêt depuis le système : le partage se termine seul,
      // l'écran est prévenu pour remettre son bouton.
      pisteEcran.onEnded = () {
        if (_ecranPartage) {
          unawaited(arreterPartageEcran());
          _rappelPartageTermine?.call();
        }
      };
      return true;
    } catch (_) {
      // La capture a pu démarrer avant l'échec : on l'arrête,
      // sinon l'écran reste partagé sans être envoyé.
      for (final piste in fluxEcran?.getTracks() ?? const []) {
        try {
          await piste.stop();
        } catch (_) {}
      }
      return false;
    }
  }

  @override
  Future<void> arreterPartageEcran() async {
    if (!_ecranPartage) return;
    _ecranPartage = false;
    try {
      final envoyeur = _envoyeurVideo;
      final pisteCamera = _pisteCamera;
      if (envoyeur != null && pisteCamera != null) {
        await envoyeur.replaceTrack(pisteCamera);
      }
    } catch (_) {}
    for (final piste in _fluxEcran?.getTracks() ?? const []) {
      try {
        await piste.stop();
      } catch (_) {}
    }
    _fluxEcran = null;
    _pisteCamera = null;
    _renduLocal.srcObject = _fluxLocal;
  }

  @override
  Future<Map<String, dynamic>> statistiquesAppel() async {
    final connexion = _connexion;
    if (connexion == null || _libere) return const {};
    try {
      final rapports = await connexion.getStats();
      final resume = resumerStatistiquesAppel(
        rapports,
        precedent: _dernierResumeStats,
      );
      _dernierResumeStats = resume;
      // Journal, carte 166 : chaque lecture est tracée, pour
      // que le diagnostic survive à l'appel, même sans copie
      // de l'écran par le membre.
      debugPrint('Appel : statistiques : ${formaterStatistiques(resume)}');
      return resume;
    } catch (_) {
      return const {};
    }
  }

  @override
  Future<void> liberer() async {
    if (_libere) return;
    _libere = true;
    // Arrêt du partage d'écran en cours, carte 158 : la piste
    // d'écran est arrêtée et la caméra est restaurée.
    _ecranPartage = false;
    for (final piste in _fluxEcran?.getTracks() ?? const []) {
      try {
        await piste.stop();
      } catch (_) {}
    }
    _fluxEcran = null;
    _pisteCamera = null;
    _envoyeurVideo = null;
    _rappelPartageTermine = null;
    // Retour à l'écouteur avant de fermer, 21 nov. 2026 : la
    // route forcée ne doit pas survivre à l'appel.
    try {
      await Helper.setSpeakerphoneOn(false);
    } catch (_) {}
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
