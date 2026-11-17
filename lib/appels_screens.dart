// Écrans d'appel audio et vidéo dans la messagerie, 16 nov. 2026.
// Appels à deux seulement, depuis une conversation directe.
// L'écran d'appel entrant sonne 30 secondes puis refuse seul.
// L'écran en cours d'appel échange l'offre, la réponse et les
// candidats ICE par HTTP (persistés, relayés par WebSocket),
// avec interrogation toutes les 2 secondes en repli quand le
// WebSocket est indisponible. Le média WebRTC est direct entre
// les deux téléphones.

import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_webrtc/flutter_webrtc.dart';
import 'package:permission_handler/permission_handler.dart';

import 'api.dart';
import 'appels.dart';
import 'appels_webrtc.dart';
import 'appels_ws.dart';
import 'i18n.dart';
import 'main.dart';
import 'messagerie.dart';

/// Écran d'appel entrant : nom de l'appelant, accepter ou refuser.
/// Vérifie d'abord que l'appel sonne encore, sinon il se ferme
/// seul avec « Appel terminé ».
class EcranAppelEntrant extends StatefulWidget {
  const EcranAppelEntrant({
    super.key,
    required this.appelId,
    required this.appelantNom,
    required this.typeAppel,
    required this.conversationId,
    this.monMembreId,
    this.apiClient,
  });

  final String appelId;
  final String appelantNom;
  final String typeAppel;
  final String conversationId;
  final String? monMembreId;
  final ApiClient? apiClient;

  @override
  State<EcranAppelEntrant> createState() => _EcranAppelEntrantState();
}

class _EcranAppelEntrantState extends State<EcranAppelEntrant> {
  ApiClient get _api => widget.apiClient ?? api;

  bool _chargement = true;
  bool _termine = false;
  bool _actionEnCours = false;
  Timer? _minuteurSonnerie;
  Timer? _minuteurVerification;
  Timer? _minuteurFermeture;

  @override
  void initState() {
    super.initState();
    _charger();
    _minuteurSonnerie = Timer(dureeSonnerieAppel, () {
      if (mounted && !_termine) _refuser(auto: true);
    });
    // L'appelant peut annuler pendant que l'écran sonne : on
    // vérifie le statut toutes les 5 secondes, pour fermer
    // l'écran au lieu de laisser sonner dans le vide.
    _minuteurVerification = Timer.periodic(
      const Duration(seconds: 5),
      (_) => _verifierStatut(),
    );
  }

  @override
  void dispose() {
    _minuteurSonnerie?.cancel();
    _minuteurVerification?.cancel();
    _minuteurFermeture?.cancel();
    super.dispose();
  }

  /// Ferme l'écran après 2 secondes, le temps de lire le message.
  /// Minuteur annulable, pour ne jamais laisser de minuteur en
  /// attente quand l'écran est détruit.
  void _programmerFermeture() {
    _minuteurFermeture?.cancel();
    _minuteurFermeture = Timer(const Duration(seconds: 2), () {
      if (mounted) Navigator.of(context).pop();
    });
  }

  Future<void> _verifierStatut() async {
    if (!mounted || _termine || _actionEnCours) return;
    try {
      final brut = await _api.fetchAppel(widget.appelId);
      final appel = AppelMessagerie.fromJson(brut);
      if (!mounted || _termine) return;
      if (!appel.sonne) {
        setState(() => _termine = true);
        _minuteurSonnerie?.cancel();
        _minuteurVerification?.cancel();
        _programmerFermeture();
      }
    } catch (_) {
      // Le prochain passage réessaiera, sans rien afficher.
    }
  }

  Future<void> _charger() async {
    try {
      final brut = await _api.fetchAppel(widget.appelId);
      final appel = AppelMessagerie.fromJson(brut);
      if (!mounted) return;
      // Sécurité : si je suis l'appelant, cet écran n'a rien à
      // faire ici, l'écran en cours d'appel est le bon.
      final monId = widget.monMembreId ?? _api.membreId;
      if (!appel.sonne || appel.appelantId == monId) {
        setState(() {
          _chargement = false;
          _termine = true;
        });
        _programmerFermeture();
        return;
      }
      setState(() => _chargement = false);
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _chargement = false;
        _termine = true;
      });
      _programmerFermeture();
    }
  }

  Future<void> _accepter() async {
    if (_actionEnCours || _termine) return;
    setState(() => _actionEnCours = true);
    try {
      await _api.envoyerSignalAppel(
        widget.appelId,
        type: 'accepte',
      );
    } catch (e) {
      if (!mounted) return;
      setState(() => _actionEnCours = false);
      toast(context, e.toString());
      return;
    }
    if (!mounted) return;
    _minuteurSonnerie?.cancel();
    _minuteurVerification?.cancel();
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(
        builder: (_) => EcranAppelEnCours(
          appelId: widget.appelId,
          typeAppel: widget.typeAppel,
          autreNom: widget.appelantNom,
          suisAppelant: false,
          apiClient: widget.apiClient,
        ),
      ),
    );
  }

  Future<void> _refuser({bool auto = false}) async {
    if (_actionEnCours) return;
    _actionEnCours = true;
    _minuteurSonnerie?.cancel();
    _minuteurVerification?.cancel();
    try {
      await _api.envoyerSignalAppel(widget.appelId, type: 'refuse');
    } catch (_) {}
    if (mounted) Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    final estVideo = widget.typeAppel == 'video';
    return Scaffold(
      backgroundColor: Cp.navy,
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              CircleAvatar(
                radius: 56,
                backgroundColor: Cp.gold,
                child: Text(
                  initialesNom(widget.appelantNom),
                  style: const TextStyle(
                    fontSize: 40,
                    fontWeight: FontWeight.bold,
                    color: Cp.navy,
                  ),
                ),
              ),
              const SizedBox(height: 24),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 32),
                child: Text(
                  widget.appelantNom.isEmpty
                      ? tr('Un membre')
                      : widget.appelantNom,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 26,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ),
              const SizedBox(height: 8),
              Text(
                _chargement
                    ? tr('Connexion…')
                    : _termine
                        ? tr('Appel terminé')
                        : estVideo
                            ? tr('Appel vidéo entrant')
                            : tr('Appel entrant'),
                style: const TextStyle(fontSize: 16, color: Colors.white70),
              ),
              const SizedBox(height: 64),
              if (!_chargement && !_termine)
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    _BoutonAppel(
                      icone: Icons.call_end,
                      couleur: Colors.red,
                      libelle: tr('Refuser'),
                      onPressed: _actionEnCours ? null : () => _refuser(),
                    ),
                    const SizedBox(width: 48),
                    _BoutonAppel(
                      icone: Icons.call,
                      couleur: Colors.green,
                      libelle: tr('Accepter'),
                      onPressed: _actionEnCours ? null : _accepter,
                    ),
                  ],
                ),
              if (_chargement)
                const CircularProgressIndicator(color: Cp.gold),
            ],
          ),
        ),
      ),
    );
  }
}

/// Bouton rond d'appel, avec libellé dessous.
class _BoutonAppel extends StatelessWidget {
  const _BoutonAppel({
    required this.icone,
    required this.couleur,
    required this.libelle,
    required this.onPressed,
  });

  final IconData icone;
  final Color couleur;
  final String libelle;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        SizedBox(
          width: 72,
          height: 72,
          child: FilledButton(
            style: FilledButton.styleFrom(
              backgroundColor: couleur,
              shape: const CircleBorder(),
              padding: EdgeInsets.zero,
            ),
            onPressed: onPressed,
            child: Icon(icone, size: 32, color: Colors.white),
          ),
        ),
        const SizedBox(height: 8),
        Text(libelle, style: const TextStyle(color: Colors.white)),
      ],
    );
  }
}

/// Écran en cours d'appel : attente de la réponse, puis média.
/// L'appelant crée l'offre quand l'appelé accepte, l'appelé crée
/// la réponse quand l'offre arrive. Les candidats ICE partent au
/// fur et à mesure. Raccrocher envoie 'termine' puis libère tout.
class EcranAppelEnCours extends StatefulWidget {
  const EcranAppelEnCours({
    super.key,
    required this.appelId,
    required this.typeAppel,
    required this.autreNom,
    required this.suisAppelant,
    this.apiClient,
    this.serviceAppel,
    this.signalisation,
  });

  final String appelId;
  final String typeAppel;
  final String autreNom;
  final bool suisAppelant;
  final ApiClient? apiClient;
  final ServiceAppelWebRtc? serviceAppel;
  final ClientSignalisationAppels? signalisation;

  @override
  State<EcranAppelEnCours> createState() => _EcranAppelEnCoursState();
}

class _EcranAppelEnCoursState extends State<EcranAppelEnCours> {
  ApiClient get _api => widget.apiClient ?? api;

  late final ServiceAppelWebRtc _service;
  late final ClientSignalisationAppels _signalisation;
  final Set<String> _signauxVus = {};
  String? _monId;
  bool _enCours = false;
  bool _termine = false;
  bool _prepare = false;
  bool _muet = false;
  bool _hautParleur = false;
  bool _cameraActive = true;
  DateTime? _debutAppel;
  Duration _duree = Duration.zero;
  Timer? _minuteurSignaux;
  Timer? _minuteurSonnerie;
  Timer? _minuteurDuree;
  StreamSubscription? _abonnementSignaux;
  StreamSubscription? _abonnementDeconnexion;

  bool get _estVideo => widget.typeAppel == 'video';

  @override
  void initState() {
    super.initState();
    _service = widget.serviceAppel ?? ServiceAppelWebRtcReel();
    _signalisation =
        widget.signalisation ?? ClientSignalisationAppels();
    _demarrer();
  }

  @override
  void dispose() {
    _minuteurSignaux?.cancel();
    _minuteurSonnerie?.cancel();
    _minuteurDuree?.cancel();
    _abonnementSignaux?.cancel();
    _abonnementDeconnexion?.cancel();
    unawaited(_service.liberer());
    unawaited(_signalisation.deconnecter());
    super.dispose();
  }

  Future<void> _demarrer() async {
    try {
      final brutAppel = await _api.fetchAppel(widget.appelId);
      final appel = AppelMessagerie.fromJson(brutAppel);
      if (!mounted) return;
      if (appel.termine) {
        _terminerLocal(tr('Appel terminé'));
        return;
      }
      _monId = widget.suisAppelant ? appel.appelantId : appel.appeleId;
      final brutIce = await _api.fetchConfigIce();
      final config = ConfigIce.fromJson(brutIce);
      if (!await _autorisations()) {
        if (mounted) {
          toast(
            context,
            _estVideo
                ? tr('Autorise le micro et la caméra pour appeler en vidéo.')
                : tr('Autorise le micro pour appeler.'),
          );
        }
        _terminerLocal(null);
        return;
      }
      await _service.preparer(
        video: _estVideo,
        configIce: config.pourWebRtc,
      );
      _service.quandCandidat((candidat) {
        unawaited(_envoyerSignal('candidat_ice', candidat, critique: false));
      });
      _service.quandFluxDistant(() {
        if (mounted) setState(() {});
      });
      _service.quandConnexionPerdue(() {
        _terminerLocal(tr('La connexion a été perdue.'));
      });
      if (!mounted) return;
      setState(() => _prepare = true);
      _minuteurSonnerie = Timer(dureeSonnerieAppel, () {
        if (mounted && !_enCours && !_termine) {
          if (widget.suisAppelant) {
            unawaited(_envoyerSignal('annule', const {}, critique: false));
          }
          _terminerLocal(tr('Pas de réponse'));
        }
      });
      _minuteurDuree = Timer.periodic(const Duration(seconds: 1), (_) {
        final debut = _debutAppel;
        if (mounted && debut != null && _enCours) {
          setState(() => _duree = DateTime.now().difference(debut));
        }
      });
      _abonnementSignaux = _signalisation.signaux.listen(_traiterSignal);
      _abonnementDeconnexion = _signalisation.onDeconnecte.listen((_) {});
      final jeton = _api.jetonAcces;
      if (jeton != null && jeton.isNotEmpty) {
        unawaited(
          _signalisation.connecter(
            '${_api.urlSignalisationAppels}?jeton=${Uri.encodeQueryComponent(jeton)}',
          ),
        );
      }
      _minuteurSignaux = Timer.periodic(delaiRepliSignauxAppel, (_) {
        unawaited(_interrogerSignaux());
      });
      unawaited(_interrogerSignaux());
    } catch (e) {
      if (!mounted) return;
      toast(context, tr('Impossible de démarrer l’appel. Vérifie ta connexion, puis réessaie.'));
      _terminerLocal(null);
    }
  }

  /// Micro (et caméra en vidéo) : le navigateur demande lui-même
  /// l'autorisation sur le web, permission_handler ne s'y applique
  /// pas, on laisse getUserMedia demander.
  Future<bool> _autorisations() async {
    if (kIsWeb) return true;
    final micro = await Permission.microphone.request();
    if (!micro.isGranted) return false;
    if (_estVideo) {
      final camera = await Permission.camera.request();
      if (!camera.isGranted) return false;
    }
    return true;
  }

  Future<void> _interrogerSignaux() async {
    if (!mounted || _termine) return;
    try {
      final bruts = await _api.fetchSignauxAppel(widget.appelId);
      for (final brut in bruts) {
        _traiterSignal(SignalAppel.fromJson(brut));
      }
    } catch (_) {
      // Le repli réessaiera dans 2 secondes, sans rien afficher.
    }
  }

  void _traiterSignal(SignalAppel signal) {
    if (!mounted || _termine) return;
    if (_signauxVus.contains(signal.id)) return;
    _signauxVus.add(signal.id);
    if (_monId != null && signal.emetteurId == _monId) return;
    switch (signal.type) {
      case 'offre':
        if (widget.suisAppelant) return;
        final offre = offreDepuisContenu(signal.contenu);
        if (offre == null) return;
        _service
            .creerReponse({'sdp': offre.sdp, 'type': offre.type})
            .then((reponse) {
          if (!mounted || _termine) return;
          _passerEnCours();
          unawaited(_envoyerSignal('reponse', reponse));
        }).catchError((_) {
          _terminerLocal(tr('L’appel n’a pas pu aboutir.'));
        });
      case 'reponse':
        if (!widget.suisAppelant) return;
        final reponse = offreDepuisContenu(signal.contenu);
        if (reponse == null) return;
        _service
            .appliquerReponse({'sdp': reponse.sdp, 'type': reponse.type})
            .then((_) {
          if (mounted && !_termine) _passerEnCours();
        }).catchError((_) {
          _terminerLocal(tr('L’appel n’a pas pu aboutir.'));
        });
      case 'candidat_ice':
        final candidat = candidatIceDepuisContenu(signal.contenu);
        if (candidat == null) return;
        unawaited(_service.ajouterCandidat({
          'candidate': candidat.candidate,
          'sdpMid': candidat.sdpMid,
          'sdpMLineIndex': candidat.sdpMLineIndex,
        }));
      case 'accepte':
        if (!widget.suisAppelant || _enCours) return;
        _service.creerOffre().then((offre) {
          if (mounted && !_termine) {
            unawaited(_envoyerSignal('offre', offre));
          }
        }).catchError((_) {
          _terminerLocal(tr('L’appel n’a pas pu aboutir.'));
        });
      case 'refuse':
        _terminerLocal(tr('Appel refusé'));
      case 'annule':
        _terminerLocal(tr('Appel annulé'));
      case 'termine':
        _terminerLocal(tr('Appel terminé'));
    }
  }

  void _passerEnCours() {
    if (_enCours) return;
    _minuteurSonnerie?.cancel();
    setState(() {
      _enCours = true;
      _debutAppel = DateTime.now();
      _duree = Duration.zero;
    });
  }

  Future<void> _envoyerSignal(
    String type,
    Map<String, dynamic> contenu, {
    bool critique = true,
  }) async {
    try {
      await _api.envoyerSignalAppel(widget.appelId, type: type, contenu: contenu);
    } catch (e) {
      if (critique && mounted && !_termine) {
        _terminerLocal(tr('L’appel n’a pas pu aboutir.'));
      }
    }
  }

  Future<void> _raccrocher() async {
    if (_termine) return;
    _termine = true;
    _minuteurSonnerie?.cancel();
    try {
      await _api.envoyerSignalAppel(widget.appelId, type: 'termine');
    } catch (_) {}
    if (mounted) Navigator.of(context).pop();
  }

  void _terminerLocal(String? message) {
    if (_termine) return;
    _termine = true;
    _minuteurSonnerie?.cancel();
    if (message != null && mounted) toast(context, message);
    if (mounted) Navigator.of(context).pop();
  }

  Future<void> _basculerMuet() async {
    final muet = !_muet;
    await _service.setMuet(muet);
    if (mounted) setState(() => _muet = muet);
  }

  Future<void> _basculerHautParleur() async {
    final actif = !_hautParleur;
    await _service.setHautParleur(actif);
    if (mounted) setState(() => _hautParleur = actif);
  }

  Future<void> _basculerCamera() async {
    final active = !_cameraActive;
    await _service.setCameraActive(active);
    if (mounted) setState(() => _cameraActive = active);
  }

  Future<void> _basculerCameraAvantArriere() async {
    await _service.basculerCamera();
  }

  @override
  Widget build(BuildContext context) {
    final distant = _service.fluxDistant != null;
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, _) {
        if (!didPop) unawaited(_raccrocher());
      },
      child: Scaffold(
        backgroundColor: Cp.navy,
        body: SafeArea(
          child: _estVideo && _prepare
              ? Stack(
                  children: [
                    Positioned.fill(
                      child: distant
                          ? RTCVideoView(
                              _service.renduDistant,
                              objectFit: RTCVideoViewObjectFit
                                  .RTCVideoViewObjectFitCover,
                            )
                          : Center(
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  CircleAvatar(
                                    radius: 48,
                                    backgroundColor: Cp.gold,
                                    child: Text(
                                      initialesNom(widget.autreNom),
                                      style: const TextStyle(
                                        fontSize: 32,
                                        fontWeight: FontWeight.bold,
                                        color: Cp.navy,
                                      ),
                                    ),
                                  ),
                                  const SizedBox(height: 16),
                                  Text(
                                    widget.autreNom,
                                    style: const TextStyle(
                                      fontSize: 22,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.white,
                                    ),
                                  ),
                                  const SizedBox(height: 8),
                                  Text(
                                    _enCours
                                        ? dureeAppelFormatee(_duree)
                                        : tr('Connexion…'),
                                    style: const TextStyle(
                                      fontSize: 16,
                                      color: Colors.white70,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                    ),
                    Positioned(
                      right: 16,
                      top: 16,
                      width: 110,
                      height: 160,
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(12),
                        child: RTCVideoView(
                          _service.renduLocal,
                          mirror: true,
                          objectFit: RTCVideoViewObjectFit
                              .RTCVideoViewObjectFitCover,
                        ),
                      ),
                    ),
                    Positioned(
                      left: 0,
                      right: 0,
                      bottom: 24,
                      child: _CommandesAppel(
                        estVideo: true,
                        enCours: _enCours,
                        duree: dureeAppelFormatee(_duree),
                        muet: _muet,
                        hautParleur: _hautParleur,
                        cameraActive: _cameraActive,
                        onMuet: _basculerMuet,
                        onHautParleur: _basculerHautParleur,
                        onCamera: _basculerCamera,
                        onBasculerCamera: _basculerCameraAvantArriere,
                        onRaccrocher: _raccrocher,
                      ),
                    ),
                  ],
                )
              : Center(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      CircleAvatar(
                        radius: 56,
                        backgroundColor: Cp.gold,
                        child: Text(
                          initialesNom(widget.autreNom),
                          style: const TextStyle(
                            fontSize: 40,
                            fontWeight: FontWeight.bold,
                            color: Cp.navy,
                          ),
                        ),
                      ),
                      const SizedBox(height: 24),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 32),
                        child: Text(
                          widget.autreNom,
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontSize: 26,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        _enCours
                            ? dureeAppelFormatee(_duree)
                            : _prepare
                                ? tr('Appel en cours…')
                                : tr('Connexion…'),
                        style: const TextStyle(
                          fontSize: 16,
                          color: Colors.white70,
                        ),
                      ),
                      const SizedBox(height: 64),
                      _CommandesAppel(
                        estVideo: false,
                        enCours: _enCours,
                        duree: dureeAppelFormatee(_duree),
                        muet: _muet,
                        hautParleur: _hautParleur,
                        cameraActive: _cameraActive,
                        onMuet: _basculerMuet,
                        onHautParleur: _basculerHautParleur,
                        onCamera: _basculerCamera,
                        onBasculerCamera: _basculerCameraAvantArriere,
                        onRaccrocher: _raccrocher,
                      ),
                    ],
                  ),
                ),
        ),
      ),
    );
  }
}

/// Commandes d'un appel en cours : muet, haut-parleur, caméra,
/// bascule de caméra (vidéo seulement), raccrocher.
class _CommandesAppel extends StatelessWidget {
  const _CommandesAppel({
    required this.estVideo,
    required this.enCours,
    required this.duree,
    required this.muet,
    required this.hautParleur,
    required this.cameraActive,
    required this.onMuet,
    required this.onHautParleur,
    required this.onCamera,
    required this.onBasculerCamera,
    required this.onRaccrocher,
  });

  final bool estVideo;
  final bool enCours;
  final String duree;
  final bool muet;
  final bool hautParleur;
  final bool cameraActive;
  final VoidCallback onMuet;
  final VoidCallback onHautParleur;
  final VoidCallback onCamera;
  final VoidCallback onBasculerCamera;
  final VoidCallback onRaccrocher;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (enCours && estVideo)
          Text(
            duree,
            style: const TextStyle(fontSize: 18, color: Colors.white),
          ),
        if (enCours && estVideo) const SizedBox(height: 16),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _BoutonCommande(
              icone: muet ? Icons.mic_off : Icons.mic,
              actif: muet,
              libelle: tr('Muet'),
              onPressed: onMuet,
            ),
            const SizedBox(width: 20),
            _BoutonCommande(
              icone: Icons.volume_up,
              actif: hautParleur,
              libelle: tr('Haut-parleur'),
              onPressed: onHautParleur,
            ),
            if (estVideo) const SizedBox(width: 20),
            if (estVideo)
              _BoutonCommande(
                icone:
                    cameraActive ? Icons.videocam : Icons.videocam_off,
                actif: !cameraActive,
                libelle: tr('Caméra'),
                onPressed: onCamera,
              ),
            if (estVideo) const SizedBox(width: 20),
            if (estVideo)
              _BoutonCommande(
                icone: Icons.switch_camera,
                actif: false,
                libelle: tr('Basculer'),
                onPressed: onBasculerCamera,
              ),
            const SizedBox(width: 20),
            _BoutonCommande(
              icone: Icons.call_end,
              actif: false,
              libelle: tr('Raccrocher'),
              couleur: Colors.red,
              onPressed: onRaccrocher,
            ),
          ],
        ),
      ],
    );
  }
}

/// Petit bouton rond de commande d'appel.
class _BoutonCommande extends StatelessWidget {
  const _BoutonCommande({
    required this.icone,
    required this.actif,
    required this.libelle,
    required this.onPressed,
    this.couleur,
  });

  final IconData icone;
  final bool actif;
  final String libelle;
  final VoidCallback onPressed;
  final Color? couleur;

  @override
  Widget build(BuildContext context) {
    final fond = couleur ?? (actif ? Colors.white : Colors.white24);
    final iconeCouleur =
        couleur != null ? Colors.white : (actif ? Cp.navy : Colors.white);
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        SizedBox(
          width: 56,
          height: 56,
          child: FilledButton(
            style: FilledButton.styleFrom(
              backgroundColor: fond,
              shape: const CircleBorder(),
              padding: EdgeInsets.zero,
            ),
            onPressed: onPressed,
            child: Icon(icone, size: 26, color: iconeCouleur),
          ),
        ),
        const SizedBox(height: 6),
        Text(
          libelle,
          style: const TextStyle(fontSize: 12, color: Colors.white),
        ),
      ],
    );
  }
}
