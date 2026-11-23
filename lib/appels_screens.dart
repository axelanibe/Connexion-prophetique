// Écrans d'appel audio et vidéo dans la messagerie, 16 nov. 2026.
// Appels à deux seulement, depuis une conversation directe.
// L'écran d'appel entrant sonne 30 secondes puis refuse seul.
// L'écran en cours d'appel échange l'offre, la réponse et les
// candidats ICE par HTTP (persistés, relayés par WebSocket),
// avec interrogation toutes les 2 secondes en repli quand le
// WebSocket est indisponible. Le média WebRTC est direct entre
// les deux téléphones.

import 'dart:async';
import 'dart:io' show Platform;

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_callkit_incoming/flutter_callkit_incoming.dart';
import 'package:flutter_webrtc/flutter_webrtc.dart';
import 'package:permission_handler/permission_handler.dart';

import 'api.dart';
import 'appel_en_cours.dart';
import 'bug_reports.dart';
import 'appel_fermeture_stub.dart'
    if (dart.library.html) 'appel_fermeture_web.dart'
    as fermeture;
import 'appels.dart';
import 'appels_webrtc.dart';
import 'appels_ws.dart';
import 'choix_sons.dart';
import 'i18n.dart';
import 'main.dart';
import 'messagerie.dart';
import 'sonnerie_appel.dart';

/// Micro (et caméra en vidéo) demandés avant d'ouvrir l'écran
/// d'appel, carte 155 : avant, ils étaient demandés pendant
/// l'appel, après l'ouverture de l'écran et le démarrage du
/// minuteur de sonnerie de 30 secondes, donc la sonnerie pouvait
/// expirer pendant que l'utilisateur répondait aux fenêtres
/// système. Sur le web, le navigateur demande lui-même
/// l'autorisation, permission_handler ne s'y applique pas, on
/// laisse getUserMedia demander. Un échec vaut refus, jamais de
/// plantage sur le bouton d'appel.
Future<bool> demanderAutorisationsAppel({required bool video}) async {
  if (kIsWeb) return true;
  try {
    final micro = await Permission.microphone.request();
    if (!micro.isGranted) return false;
    if (video) {
      final camera = await Permission.camera.request();
      if (!camera.isGranted) return false;
    }
    return true;
  } catch (_) {
    return false;
  }
}

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
    this.lecteurSonnerie,
    this.accepteViaCallKit = false,
  });

  final String appelId;
  final String appelantNom;
  final String typeAppel;
  final String conversationId;
  final String? monMembreId;
  final ApiClient? apiClient;

  /// Lecteur de sonnerie injecté (tests) ; sinon le lecteur réel.
  final LecteurSonnerieAppel? lecteurSonnerie;

  /// Appel déjà accepté via CallKit, 21 nov. 2026 : l'écran
  /// système a déjà sonné, on ne relance pas le WAV et on ouvre
  /// directement l'écran en cours d'appel.
  final bool accepteViaCallKit;

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
  late final LecteurSonnerieAppel _lecteurSonnerie;
  bool _lecteurCree = false;

  /// Vrai quand l'appel a été accepté ici : la restauration de
  /// l'écouteur en dispose ne s'applique pas, l'écran en cours
  /// d'appel reprend la route.
  bool _accepte = false;

  /// Haut-parleur forcé à l'ouverture, pour que la sonnerie sorte
  /// fort, côté appelé comme côté appelant, 21 nov. 2026.
  bool _hautParleurForce = false;

  @override
  void initState() {
    super.initState();
    // Sonnerie en boucle dès l'ouverture de l'écran, étape 2 :
    // avant, l'écran ne faisait que compter 30 secondes, sans son.
    // Accepté déjà via CallKit, 21 nov. 2026 : l'écran système a
    // déjà sonné, on ne relance pas le WAV.
    _lecteurCree = widget.lecteurSonnerie == null;
    _lecteurSonnerie =
        widget.lecteurSonnerie ?? LecteurSonnerieJustAudio();
    if (!widget.accepteViaCallKit) {
      // Sonnerie choisie par le membre, carte 4, 21 nov. 2026 :
      // la sonnerie jouée ici est celle de Paramètres, pas
      // l'ancienne sonnerie fixe.
      unawaited(
        _lecteurSonnerie.jouerEnBoucle(
          choixSons.sonnerieChoisie.assetAudio,
        ),
      );
    }
    // Haut-parleur forcé dès l'ouverture, 21 nov. 2026 : la
    // sonnerie doit sortir fort, comme la tonalité côté appelant.
    // Sur le web, pas de bascule écouteur, rien à faire.
    if (!kIsWeb) {
      _hautParleurForce = true;
      unawaited(_forcerHautParleurEntrant(true));
    }
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
    unawaited(_lecteurSonnerie.arreter());
    if (_lecteurCree) unawaited(_lecteurSonnerie.liberer());
    // Refus ou fermeture sans acceptation : retour à l'écouteur,
    // la route forcée ne doit pas survivre à l'écran. Accepté :
    // l'écran en cours d'appel reprend la route.
    if (_hautParleurForce && !_accepte) {
      unawaited(_forcerHautParleurEntrant(false));
    }
    super.dispose();
  }

  /// Bascule haut-parleur de l'écran entrant : ne lève jamais, un
  /// échec audio ne doit pas empêcher l'appel. Carte 157 : la
  /// route forcée est aussi posée dans l'état global, pour que
  /// l'écran en cours d'appel reprenne la bonne valeur, à la
  /// reprise comme au décrochage.
  Future<void> _forcerHautParleurEntrant(bool actif) async {
    try {
      await Helper.setSpeakerphoneOn(actif);
    } catch (_) {
      return;
    }
    etatAppelGlobal.mettreAJourAudio(
      muet: etatAppelGlobal.muet,
      hautParleur: actif,
    );
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
        unawaited(_lecteurSonnerie.arreter());
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
        unawaited(_lecteurSonnerie.arreter());
        _programmerFermeture();
        return;
      }
      setState(() => _chargement = false);
      if (widget.accepteViaCallKit) {
        // Déjà accepté via CallKit : on envoie 'accepte' et on
        // ouvre directement l'écran en cours d'appel, sans montrer
        // les boutons de la sonnerie.
        unawaited(_accepter());
      }
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _chargement = false;
        _termine = true;
      });
      unawaited(_lecteurSonnerie.arreter());
      _programmerFermeture();
    }
  }

  Future<void> _accepter() async {
    if (_actionEnCours || _termine) return;
    // Carte 155 : le micro et la caméra sont demandés avant
    // d'ouvrir l'écran d'appel, pour que les fenêtres système
    // ne mangent pas les 30 secondes de sonnerie. Refus : on
    // affiche le message et on n'accepte pas, l'appel sonne
    // encore, l'utilisateur peut refuser ou réessayer.
    final autorise = await demanderAutorisationsAppel(
      video: widget.typeAppel == 'video',
    );
    if (!autorise) {
      if (!mounted) return;
      toast(
        context,
        widget.typeAppel == 'video'
            ? tr('Micro ou caméra refusé : autorise le micro et la caméra dans les réglages pour appeler en vidéo.')
            : tr('Micro refusé : autorise le micro dans les réglages pour appeler.'),
      );
      return;
    }
    _accepte = true;
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
    unawaited(_lecteurSonnerie.arreter());
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(
        builder: (_) => EcranAppelEnCours(
          appelId: widget.appelId,
          typeAppel: widget.typeAppel,
          autreNom: widget.appelantNom,
          suisAppelant: false,
          apiClient: widget.apiClient,
          appelSystemeActif: widget.accepteViaCallKit,
        ),
      ),
    );
  }

  Future<void> _refuser({bool auto = false}) async {
    if (_actionEnCours) return;
    _actionEnCours = true;
    _minuteurSonnerie?.cancel();
    _minuteurVerification?.cancel();
    unawaited(_lecteurSonnerie.arreter());
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
                      couleur: const Color(0xFFB3261E),
                      libelle: tr('Refuser'),
                      onPressed: _actionEnCours ? null : () => _refuser(),
                    ),
                    const SizedBox(width: 48),
                    _BoutonAppel(
                      icone: Icons.call,
                      couleur: const Color(0xFF34D399),
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
    this.autrePhoto,
    this.apiClient,
    this.serviceAppel,
    this.signalisation,
    this.appelFutur,
    this.lecteurSonnerie,
    this.appelSystemeActif = false,
  });

  final String appelId;
  final String typeAppel;
  final String autreNom;
  final bool suisAppelant;

  /// Photo de l'autre membre (data URL déjà convertie), 21 nov.
  /// 2026 : la photo affichée est celle du membre en appel,
  /// jamais une photo de modèle. Null quand elle n'est pas
  /// connue, l'écran montre alors les initiales.
  final ImageProvider? autrePhoto;
  final ApiClient? apiClient;
  final ServiceAppelWebRtc? serviceAppel;
  final ClientSignalisationAppels? signalisation;

  /// Création de l'appel encore en cours, quand l'écran s'ouvre
  /// aussitôt après le tap, étape 2 : l'écran attend l'identifiant
  /// ici, au lieu d'attendre avant de s'ouvrir. Null quand l'appel
  /// existe déjà, avec [appelId].
  final Future<Map<String, dynamic>>? appelFutur;

  /// Lecteur de tonalité injecté (tests) ; sinon le lecteur réel.
  final LecteurSonnerieAppel? lecteurSonnerie;

  /// Appel natif déjà affiché pour l'appelé (accepté via
  /// CallKit), carte 4 : endCall s'applique au raccrochage,
  /// sans startCall.
  final bool appelSystemeActif;

  @override
  State<EcranAppelEnCours> createState() => _EcranAppelEnCoursState();
}

class _EcranAppelEnCoursState extends State<EcranAppelEnCours> {
  ApiClient get _api => widget.apiClient ?? api;

  late final ServiceAppelWebRtc _service;
  late final ClientSignalisationAppels _signalisation;
  final Set<String> _signauxVus = {};
  String _appelId = '';
  String? _monId;
  bool _enCours = false;
  bool _termine = false;
  bool _prepare = false;
  bool _muet = false;
  bool _hautParleur = false;

  /// Vidéo ajoutée en cours d'appel audio, carte 156 : l'appel
  /// est parti en audio, l'utilisateur a basculé en vidéo, ou
  /// l'autre côté a basculé et son offre portait la vidéo.
  bool _videoAjoutee = false;

  /// Haut-parleur forcé pendant la sonnerie, 20 nov. 2026,
  /// appelant comme appelé, 21 nov. 2026 : il revient à
  /// l'écouteur au décrochage seulement si l'utilisateur n'a
  /// rien touché, la bascule manuelle reprend la main avant.
  bool _hautParleurSonnerie = false;
  bool _cameraActive = true;
  DateTime? _debutAppel;
  Duration _duree = Duration.zero;
  Timer? _minuteurSignaux;
  Timer? _minuteurSonnerie;
  Timer? _minuteurDuree;
  StreamSubscription? _abonnementSignaux;
  StreamSubscription? _abonnementDeconnexion;
  late final LecteurSonnerieAppel _lecteurSonnerie;
  bool _lecteurCree = false;

  /// Message affiché à l'écran quand le micro est refusé, au lieu
  /// de fermer l'écran sans rien dire, étape 2.
  String? _messageErreur;

  /// Vrai quand le flux distant est arrivé : l'appel audio monte
  /// alors sa vue cachée, pour que la voix sorte sur le web.
  bool _fluxDistantRecu = false;

  /// Réduction demandée, carte 4 : le retour système ne doit
  /// plus raccrocher, il quitte l'écran sans couper l'appel.
  bool _reductionDemandee = false;

  bool get _estVideo => widget.typeAppel == 'video' || _videoAjoutee;

  @override
  void initState() {
    super.initState();
    _appelId = widget.appelId;
    _service = widget.serviceAppel ?? ServiceAppelWebRtcReel();
    _signalisation =
        widget.signalisation ?? ClientSignalisationAppels();
    // Partage d'écran arrêté depuis le système, carte 158 : le
    // service prévient, l'écran se redessine avec la caméra.
    _service.quandPartageTermine(() {
      if (mounted) setState(() {});
    });
    _lecteurCree = widget.lecteurSonnerie == null;
    _lecteurSonnerie =
        widget.lecteurSonnerie ?? LecteurSonnerieJustAudio();
    // Reprise d'un appel réduit, carte 4 : même service, même
    // signalisation, déjà préparés, on rattache seulement les
    // écoutes et les minuteurs, sans refaire la préparation
    // WebRTC et sans relancer la tonalité. L'identité du service
    // distingue la reprise d'un nouvel appel avec un autre
    // service, en tests comme en production. Le test se fait
    // avant demarrer(), qui met à jour le service.
    final reprise = widget.serviceAppel != null &&
        etatAppelGlobal.actif &&
        etatAppelGlobal.service == widget.serviceAppel &&
        etatAppelGlobal.appelId == widget.appelId &&
        etatAppelGlobal.prepare;
    // Appel en arrière-plan, carte 4 : l'appel vit dans l'état
    // global dès l'ouverture de l'écran, avec son service et sa
    // signalisation, pour survivre à la réduction.
    etatAppelGlobal.demarrer(
      appelId: _appelId,
      autreNom: widget.autreNom,
      typeAppel: widget.typeAppel,
      suisAppelant: widget.suisAppelant,
      service: _service,
      signalisation: _signalisation,
    );
    if (widget.appelSystemeActif) {
      etatAppelGlobal.marquerAppelSystemeActif();
    }
    if (reprise) {
      unawaited(_reprendre());
      return;
    }
    // Tonalité d'attente côté appelant, dès l'ouverture de
    // l'écran, étape 2. Côté appelé, aucune tonalité.
    if (widget.suisAppelant) {
      unawaited(_lecteurSonnerie.jouerEnBoucle(assetTonaliteAppel));
    }
    // Haut-parleur pendant la sonnerie, 20 nov. 2026 : l'ouverture
    // du micro bascule la session audio en mode communication et
    // la tonalité sort sinon par l'écouteur, très bas. Sur le web,
    // pas de bascule écouteur, rien à faire. Côté appelé comme
    // côté appelant, 21 nov. 2026 : la même règle s'applique dès
    // l'ouverture de l'écran.
    if (!kIsWeb) {
      _hautParleurSonnerie = true;
      _hautParleur = true;
      // Carte 157 : la route forcée est posée dans l'état
      // global, pour que la reprise après réduction retrouve le
      // haut-parleur, pas l'écouteur. Sans ça, demarrer() remet
      // le global à faux et la reprise perd la route.
      etatAppelGlobal.mettreAJourAudio(muet: _muet, hautParleur: true);
      unawaited(_appliquerHautParleur(true));
    }
    _demarrer();
  }

  @override
  void dispose() {
    _minuteurSignaux?.cancel();
    _minuteurSonnerie?.cancel();
    _minuteurDuree?.cancel();
    _abonnementSignaux?.cancel();
    _abonnementDeconnexion?.cancel();
    unawaited(_lecteurSonnerie.arreter());
    if (_lecteurCree) unawaited(_lecteurSonnerie.liberer());
    // Raccrochage pendant la sonnerie : rendre le haut-parleur
    // avant de libérer le service, sinon il resterait forcé.
    if (_hautParleurSonnerie) {
      _hautParleurSonnerie = false;
      unawaited(_appliquerHautParleur(false));
    }
    // Réduction, carte 4 : l'écran part sans raccrocher, le
    // service et la signalisation restent dans l'état global,
    // pour que l'appel survive et que la pastille le rouvre.
    // Tout autre départ libère tout, comme avant, et retire
    // l'envoi de 'termine' à la fermeture de la page.
    final reduit = etatAppelGlobal.reduit &&
        etatAppelGlobal.appelId == _appelId &&
        !_termine;
    if (!reduit) {
      fermeture.annulerFermetureAppel();
      unawaited(_service.liberer());
      unawaited(_signalisation.deconnecter());
    }
    super.dispose();
  }

  /// Reprise d'un appel réduit, carte 4 : le service est déjà
  /// préparé, on rattache les écoutes, on relance
  /// l'interrogation des signaux et le décompte, sans refaire
  /// la préparation WebRTC. Les signaux déjà lus sont marqués
  /// vus sans retraitement, sauf une fin reçue pendant la
  /// réduction, qui ferme l'écran aussitôt.
  Future<void> _reprendre() async {
    _monId = _api.membreId;
    _muet = etatAppelGlobal.muet;
    _hautParleur = etatAppelGlobal.hautParleur;
    _cameraActive = etatAppelGlobal.cameraActive;
    _enCours = etatAppelGlobal.enCours;
    _debutAppel = etatAppelGlobal.debut;
    if (_debutAppel != null) {
      _duree = DateTime.now().difference(_debutAppel!);
    }
    fermeture.enregistrerFermetureAppel(_appelId);
    try {
      final bruts = await _api.fetchSignauxAppel(_appelId);
      for (final brut in bruts) {
        final signal = SignalAppel.fromJson(brut);
        _signauxVus.add(signal.id);
        if (signal.type == 'termine' ||
            signal.type == 'refuse' ||
            signal.type == 'annule') {
          _terminerLocal(tr('Appel terminé'));
          return;
        }
      }
    } catch (_) {
      // Le repli ci-dessous réessaiera, sans rien afficher.
    }
    if (!mounted || _termine) return;
    _service.quandCandidat((candidat) {
      unawaited(_envoyerSignal('candidat_ice', candidat, critique: false));
    });
    _service.quandFluxDistant(() {
      if (mounted) setState(() => _fluxDistantRecu = true);
      if (mounted && !_termine && !kIsWeb) {
        unawaited(_appliquerHautParleur(_hautParleur));
      }
    });
    _service.quandConnexionPerdue(() {
      _terminerLocal(tr('La connexion a été perdue.'));
    });
    _prepare = true;
    if (mounted) setState(() {});
    _minuteurDuree = Timer.periodic(const Duration(seconds: 1), (_) {
      final debut = _debutAppel;
      if (mounted && debut != null && _enCours) {
        setState(() => _duree = DateTime.now().difference(debut));
      }
    });
    _abonnementSignaux = _signalisation.signaux.listen(_traiterSignal);
    _abonnementDeconnexion = _signalisation.onDeconnecte.listen((_) {});
    _minuteurSignaux = Timer.periodic(delaiRepliSignauxAppel, (_) {
      unawaited(_interrogerSignaux());
    });
    unawaited(_interrogerSignaux());
  }

  /// Minuteur de sonnerie de 30 secondes, carte 155 : il ne
  /// démarre qu'après les autorisations, jamais avant.
  void _demarrerMinuteurSonnerie() {
    _minuteurSonnerie?.cancel();
    _minuteurSonnerie = Timer(dureeSonnerieAppel, () {
      if (mounted && !_enCours && !_termine) {
        if (widget.suisAppelant) {
          unawaited(_envoyerSignal('annule', const {}, critique: false));
        }
        _terminerLocal(tr('Pas de réponse'));
      }
    });
  }

  Future<void> _demarrer() async {
    // Étape en cours, pour un message d'erreur précis : avant,
    // toute exception donnait le même message générique, qui
    // cachait la vraie cause, comme addStream sur Safari.
    var etape = 'appel';
    try {
      // Écran ouvert aussitôt après le tap, étape 2 : quand
      // l'appel est encore en création, on attend son identifiant
      // ici, au lieu d'attendre avant d'ouvrir l'écran.
      final Map<String, dynamic> brutAppel;
      if (widget.appelFutur != null) {
        brutAppel = await widget.appelFutur!;
        _appelId = AppelMessagerie.fromJson(brutAppel).id;
      } else {
        brutAppel = await _api.fetchAppel(widget.appelId);
        _appelId = widget.appelId;
      }
      // Identifiant connu, carte 4 : l'état global suit, la
      // fermeture de la page enverra 'termine', et l'appelant
      // démarre l'appel système (service de premier plan sur APK).
      etatAppelGlobal.definirAppelId(_appelId);
      fermeture.enregistrerFermetureAppel(_appelId);
      if (widget.suisAppelant) {
        unawaited(etatAppelGlobal.demarrerAppelSysteme());
      }
      final appel = AppelMessagerie.fromJson(brutAppel);
      if (!mounted) return;
      if (appel.termine) {
        _terminerLocal(tr('Appel terminé'));
        return;
      }
      // Identifiant local lu dans le jeton, 20 nov. 2026 : le
      // serveur renvoie l'autre participant dans appele_id, donc
      // l'appelé prenait ici l'identifiant de l'appelant et le
      // filtre anti-écho jetait ensuite offre, réponse et fin.
      _monId = _api.membreId;
      // Micro ouvert en parallèle de la config ICE, étape 2 :
      // avant, la chaîne était séquentielle, chaque étape
      // retardait la sonnerie côté appelé.
      etape = 'ice';
      final configFutur = _api.fetchConfigIce();
      final microFutur = _ouvrirMicro();
      final brutIce = await configFutur;
      final config = ConfigIce.fromJson(brutIce);
      if (!await microFutur) {
        if (!mounted) return;
        setState(() {
          _messageErreur = _estVideo
              ? tr('Micro ou caméra refusé : autorise le micro et la caméra dans les réglages pour appeler en vidéo.')
              : tr('Micro refusé : autorise le micro dans les réglages pour appeler.');
        });
        await Future.delayed(const Duration(seconds: 3));
        if (!mounted) return;
        _terminerLocal(null);
        return;
      }
      // Minuteur de sonnerie, carte 155 : il ne démarre qu'une
      // fois les autorisations accordées et le micro ouvert.
      // Avant, il démarrait à la création de l'appel, donc la
      // sonnerie pouvait expirer pendant que l'utilisateur
      // répondait aux fenêtres système. Il démarre ici, pas
      // après toute la chaîne, pour que l'appel ne sonne pas
      // plus de 30 secondes côté appelé, étape 2.
      _demarrerMinuteurSonnerie();
      // Haut-parleur après le micro, 20 nov. 2026 : le forçage
      // d'initState précède l'ouverture du micro, qui bascule la
      // session audio en mode communication et peut remettre la
      // sortie sur l'écouteur. On réapplique la route voulue une
      // fois le micro ouvert, tant que ça sonne : forcée par la
      // sonnerie, ou choisie par l'utilisateur, 21 nov. 2026.
      if (!kIsWeb && !_enCours && !_termine) {
        unawaited(_appliquerHautParleur(_hautParleur));
      }
      etape = 'webrtc';
      await _service.preparer(
        video: _estVideo,
        configIce: config.pourWebRtc,
      );
      // Bascule haut-parleur, 21 nov. 2026 : la préparation peut
      // remettre la route sur l'écouteur, on réapplique la route
      // voulue une fois la connexion prête.
      if (!kIsWeb && !_enCours && !_termine) {
        await _appliquerHautParleur(_hautParleur);
      }
      _service.quandCandidat((candidat) {
        unawaited(_envoyerSignal('candidat_ice', candidat, critique: false));
      });
      _service.quandFluxDistant(() {
        if (mounted) setState(() => _fluxDistantRecu = true);
        // Arrivée du flux distant, 21 nov. 2026 : elle peut
        // remettre la route sur l'écouteur, on réapplique la
        // route voulue pour que la bascule survive.
        if (mounted && !_termine && !kIsWeb) {
          unawaited(_appliquerHautParleur(_hautParleur));
        }
      });
      _service.quandConnexionPerdue(() {
        _terminerLocal(tr('La connexion a été perdue.'));
      });
      if (!mounted) return;
      setState(() => _prepare = true);
      // Préparation terminée, carte 4 : une reprise ne la refait pas.
      etatAppelGlobal.marquerPrepare();
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
            _api.urlSignalisationAppels,
            jeton: jeton,
          ),
        );
      }
      _minuteurSignaux = Timer.periodic(delaiRepliSignauxAppel, (_) {
        unawaited(_interrogerSignaux());
      });
      unawaited(_interrogerSignaux());
    } catch (e) {
      if (!mounted) return;
      // La vraie cause est journalisée, nettoyée, B-11 : jamais
      // $e brut, un jeton pourrait s'y trouver. La trace n'est
      // pas journalisée, elle peut porter une URL avec jeton.
      debugPrint('Appel : échec à l’étape $etape : ${BugReports.scrub('$e')}');
      toast(
        context,
        e is ApiException ? e.message : _messageEchecDemarrage(etape),
      );
      _terminerLocal(null);
    }
  }

  /// Message d'erreur selon l'étape qui a échoué, pour ne plus
  /// jamais cacher la cause derrière un message générique.
  String _messageEchecDemarrage(String etape) {
    if (etape == 'ice') {
      return tr('Configuration d’appel indisponible. Vérifie ta connexion, puis réessaie.');
    }
    if (etape == 'webrtc') {
      return tr('Ce navigateur ne peut pas démarrer l’appel. Essaie depuis l’application.');
    }
    return tr('Appel introuvable ou déjà terminé.');
  }

  /// Micro (et caméra en vidéo), en parallèle de la config ICE.
  /// Renvoie false quand l'autorisation est refusée, ou quand
  /// l'ouverture échoue, par exemple micro refusé sur le web, où
  /// permission_handler ne s'applique pas et getUserMedia refuse.
  Future<bool> _ouvrirMicro() async {
    try {
      if (!await _autorisations()) return false;
      await _service.ouvrirMicro(video: _estVideo);
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Micro (et caméra en vidéo), carte 155 : les autorisations
  /// sont déjà demandées avant l'ouverture de l'écran, au
  /// bouton d'appel ou à l'acceptation, cette demande ne sert
  /// plus que de filet, elle répond aussitôt quand c'est déjà
  /// accordé.
  Future<bool> _autorisations() async {
    return demanderAutorisationsAppel(video: _estVideo);
  }

  Future<void> _interrogerSignaux() async {
    if (!mounted || _termine) return;
    try {
      final bruts = await _api.fetchSignauxAppel(_appelId);
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
        unawaited(_repondreOffre(signal));
      case 'reponse':
        if (!widget.suisAppelant) return;
        final reponse = offreDepuisContenu(signal.contenu);
        if (reponse == null) return;
        _service
            .appliquerReponse({'sdp': reponse.sdp, 'type': reponse.type})
            .then((_) {
          if (mounted && !_termine) unawaited(_passerEnCours());
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

  /// Réponse à une offre, carte 156 : quand l'offre porte une
  /// piste vidéo et que l'appel est en audio, l'appelant bascule
  /// en vidéo. On ouvre notre caméra avant de répondre, pour que
  /// l'image parte dans les deux sens, et l'écran passe en vidéo.
  /// Caméra refusée : on répond quand même, on reçoit la vidéo
  /// sans en envoyer.
  Future<void> _repondreOffre(SignalAppel signal) async {
    final offre = offreDepuisContenu(signal.contenu);
    if (offre == null) return;
    final basculeVideo =
        !_estVideo && offre.sdp.contains('m=video');
    if (basculeVideo) {
      final ok = await _service.ajouterPisteVideo();
      if (ok && mounted && !_termine) {
        setState(() => _videoAjoutee = true);
        etatAppelGlobal.mettreAJourTypeAppel('video');
      }
    }
    try {
      final reponse = await _service
          .creerReponse({'sdp': offre.sdp, 'type': offre.type});
      if (!mounted || _termine) return;
      unawaited(_passerEnCours());
      unawaited(_envoyerSignal('reponse', reponse));
    } catch (_) {
      _terminerLocal(tr('L’appel n’a pas pu aboutir.'));
    }
  }

  Future<void> _passerEnCours() async {
    if (_enCours) return;
    _minuteurSonnerie?.cancel();
    // Appel décroché : la tonalité d'attente s'arrête, étape 2.
    unawaited(_lecteurSonnerie.arreter());
    // Fin de la sonnerie : le haut-parleur forcé revient à l'état
    // normal, l'appel se poursuit en écouteur, comme avant. Quand
    // l'utilisateur a choisi lui-même la route, on la garde,
    // 21 nov. 2026. Le changement est attendu, pas lancé sans
    // attendre, pour qu'il soit bien appliqué avant la suite.
    final forcerHautParleur = _hautParleurSonnerie;
    setState(() {
      _enCours = true;
      _debutAppel = DateTime.now();
      _duree = Duration.zero;
      if (forcerHautParleur) {
        _hautParleurSonnerie = false;
        _hautParleur = false;
      }
    });
    // Décroché, carte 4 : l'état global porte la durée et les
    // commandes pour la pastille et la reprise.
    etatAppelGlobal.passerEnCours();
    etatAppelGlobal.mettreAJourAudio(
      muet: _muet,
      hautParleur: _hautParleur,
    );
    // Connexion Telecom sortante, carte 163 : sans cet appel,
    // la connexion restait en numérotation pendant tout
    // l'appel. Android seulement, sans bloquer l'appel.
    if (!kIsWeb && Platform.isAndroid && _appelId.isNotEmpty) {
      unawaited(
        FlutterCallkitIncoming.setCallConnected(_appelId).catchError((_) {}),
      );
    }
    if (forcerHautParleur) {
      await _appliquerHautParleur(false);
    }
  }

  Future<void> _envoyerSignal(
    String type,
    Map<String, dynamic> contenu, {
    bool critique = true,
  }) async {
    try {
      await _api.envoyerSignalAppel(_appelId, type: type, contenu: contenu);
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
    unawaited(_lecteurSonnerie.arreter());
    try {
      if (_appelId.isNotEmpty) {
        await _api.envoyerSignalAppel(_appelId, type: 'termine');
      }
    } catch (_) {}
    // Raccroché, carte 4 : plus d'envoi à la fermeture, l'état
    // global se vide et l'appel système se ferme.
    fermeture.annulerFermetureAppel();
    unawaited(etatAppelGlobal.terminer());
    if (mounted) Navigator.of(context).pop();
  }

  /// Réduit l'écran sans raccrocher, carte 4 : l'appel continue
  /// dans l'état global, la pastille permet d'y revenir. Le
  /// bouton n'apparaît qu'une fois décroché. Le retour système
  /// est rouvert un instant, pour que ce départ ne raccroche pas.
  void _reduire() {
    if (!_enCours || _termine) return;
    etatAppelGlobal.reduire();
    setState(() => _reductionDemandee = true);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) Navigator.of(context).pop();
    });
  }

  void _terminerLocal(String? message) {
    if (_termine) return;
    _termine = true;
    _minuteurSonnerie?.cancel();
    unawaited(_lecteurSonnerie.arreter());
    // Fermer côté serveur aussi, même quand l'appel se termine
    // seul (micro refusé, préparation impossible, connexion
    // perdue) : sans ce signal, la ligne reste 'sonne' ou
    // 'en_cours' et le prochain appel est refusé en 409,
    // 19 nov. 2026. Envoi sans attendre, une erreur ne change
    // rien à la fermeture locale. Sans identifiant d'appel, par
    // exemple création en échec avant l'ouverture de l'écran,
    // il n'y a rien à fermer côté serveur.
    if (_appelId.isNotEmpty) {
      unawaited(
        _api
            .envoyerSignalAppel(_appelId, type: 'termine')
            .catchError((_) => <String, dynamic>{}),
      );
    }
    if (message != null && mounted) toast(context, message);
    // Terminé, carte 4 : plus d'envoi à la fermeture, l'état
    // global se vide et l'appel système se ferme.
    fermeture.annulerFermetureAppel();
    unawaited(etatAppelGlobal.terminer());
    if (mounted) Navigator.of(context).pop();
  }

  Future<void> _basculerMuet() async {
    final muet = !_muet;
    await _service.setMuet(muet);
    if (mounted) setState(() => _muet = muet);
    etatAppelGlobal.mettreAJourAudio(
      muet: muet,
      hautParleur: _hautParleur,
    );
  }

  Future<void> _basculerHautParleur() async {
    // L'utilisateur reprend la main : la sonnerie ne force plus
    // le haut-parleur au décrochage.
    _hautParleurSonnerie = false;
    final actif = !_hautParleur;
    // Carte 157 : l'application relit la vraie route dans le
    // service, qui ne la pose qu'après le succès de Helper.
    await _appliquerHautParleur(actif);
    etatAppelGlobal.mettreAJourAudio(
      muet: _muet,
      hautParleur: _hautParleur,
    );
  }

  /// Applique la route haut-parleur : ne lève jamais, un échec
  /// audio ne doit pas empêcher l'appel. Carte 157 : après
  /// chaque application, le bouton affiche la vraie route tenue
  /// par le service, pas l'état demandé. Helper ne permet pas
  /// de relire la route sur la plateforme, la valeur du service
  /// est la seule vérité, elle n'est posée qu'après le succès.
  Future<void> _appliquerHautParleur(bool actif) async {
    try {
      await _service.setHautParleur(actif);
    } catch (e) {
      debugPrint('Appel : haut-parleur impossible : ${BugReports.scrub('$e')}');
    }
    final vrai = _service.hautParleur;
    if (mounted && vrai != _hautParleur) {
      setState(() => _hautParleur = vrai);
    }
  }

  Future<void> _basculerCamera() async {
    final active = !_cameraActive;
    await _service.setCameraActive(active);
    if (mounted) setState(() => _cameraActive = active);
    // Carte 163 : l'état global garde le choix, pour que la
    // reprise après une mise en attente retrouve la caméra.
    etatAppelGlobal.mettreAJourCamera(active);
  }

  Future<void> _basculerCameraAvantArriere() async {
    await _service.basculerCamera();
  }

  /// Ligne d'état sous le nom, la même en audio et en vidéo :
  /// erreur, appel en cours avec la durée, sonnerie, connexion.
  String _statutAppel() {
    if (_messageErreur != null) return _messageErreur!;
    // Mise en attente Telecom, carte 163 : l'écran l'affiche
    // pendant qu'un appel cellulaire suspend notre appel.
    if (etatAppelGlobal.enAttente) return tr('Appel en attente…');
    if (_enCours) {
      return '${tr('Appel en cours…')} ${dureeAppelFormatee(_duree)}';
    }
    if (_prepare) {
      return widget.suisAppelant
          ? tr('Ça sonne…')
          : tr('Appel en cours…');
    }
    return tr('Connexion…');
  }

  /// « Appel vidéo » pendant un appel audio, carte 156 : la
  /// bascule est réelle maintenant, la caméra s'ouvre, la piste
  /// vidéo est ajoutée, une nouvelle offre part, l'autre côté
  /// répond et l'écran passe en vidéo. Avant, le bouton
  /// expliquait seulement que la vidéo n'était pas disponible.
  Future<void> _basculerVersVideo() async {
    if (_estVideo || _termine) return;
    if (!_enCours) {
      toast(context, tr('Décroche d’abord pour passer en vidéo.'));
      return;
    }
    final offre = await _service.ajouterVideo();
    if (offre == null) {
      if (mounted) {
        toast(context, tr('La caméra n’a pas pu s’ouvrir.'));
      }
      return;
    }
    if (!mounted || _termine) return;
    setState(() => _videoAjoutee = true);
    etatAppelGlobal.mettreAJourTypeAppel('video');
    unawaited(_envoyerSignal('offre', offre));
  }

  /// Partage d'écran, carte 158 : le partage remplace la caméra,
  /// l'autre côté voit l'écran en grand à la place de la vidéo.
  /// Sur iOS, flutter_webrtc ne prend pas en charge la capture,
  /// le service refuse et on l'explique.
  Future<void> _basculerPartageEcran() async {
    if (!_estVideo || _termine) return;
    if (_service.ecranPartage) {
      await _service.arreterPartageEcran();
      if (mounted) setState(() {});
      return;
    }
    final ok = await _service.partagerEcran();
    if (!ok) {
      if (mounted) {
        toast(
          context,
          tr('Le partage d’écran n’est pas disponible sur cet appareil.'),
        );
      }
      return;
    }
    if (mounted) setState(() {});
  }

  /// Feuille « Plus » : les actions qui ne tiennent pas dans la
  /// grille, bascule de caméra en vidéo, réduction une fois
  /// décroché. Rien à montrer, rien ne s'ouvre.
  void _ouvrirPlus() {
    final actions = <Widget>[];
    if (_estVideo) {
      actions.add(
        ListTile(
          leading: const Icon(Icons.switch_camera, color: Colors.white),
          title: Text(
            tr('Basculer'),
            style: const TextStyle(color: Colors.white),
          ),
          onTap: () {
            Navigator.of(context).pop();
            unawaited(_basculerCameraAvantArriere());
          },
        ),
      );
      // Partage d'écran, carte 158 : remplace la caméra, comme
      // sur les autres réseaux sociaux.
      actions.add(
        ListTile(
          leading: Icon(
            _service.ecranPartage
                ? Icons.stop_screen_share
                : Icons.screen_share,
            color: Colors.white,
          ),
          title: Text(
            _service.ecranPartage
                ? tr('Arrêter le partage')
                : tr('Partager l’écran'),
            style: const TextStyle(color: Colors.white),
          ),
          onTap: () {
            Navigator.of(context).pop();
            unawaited(_basculerPartageEcran());
          },
        ),
      );
    }
    if (_enCours) {
      actions.add(
        ListTile(
          leading:
              const Icon(Icons.keyboard_arrow_down, color: Colors.white),
          title: Text(
            tr('Réduire'),
            style: const TextStyle(color: Colors.white),
          ),
          onTap: () {
            // Réduire après la fermeture de la feuille, 21 nov.
            // 2026 : un retour lancé pendant que la feuille se
            // referme encore dépile la feuille, pas l'écran.
            unawaited(
              Navigator.of(context).maybePop().then((_) => _reduire()),
            );
          },
        ),
      );
    }
    if (actions.isEmpty) return;
    unawaited(
      showModalBottomSheet<void>(
        context: context,
        backgroundColor: const Color(0xFF1B2C40),
        builder: (context) => SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: actions,
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    // Vidéo distante, carte 156 : le flux existe dès l'audio,
    // seule une piste vidéo dit que l'autre envoie une image,
    // sinon la photo s'affiche au lieu d'une vidéo noire.
    final distant =
        _service.fluxDistant?.getVideoTracks().isNotEmpty ?? false;
    return PopScope(
      // Réduction demandée, carte 4 : le retour quitte l'écran
      // sans raccrocher. Tout autre retour raccroche, comme avant.
      canPop: _reductionDemandee,
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
                          ? GestureDetector(
                              // Retourner la caméra, carte 159 :
                              // double toucher sur la vidéo distante.
                              onDoubleTap: _basculerCameraAvantArriere,
                              child: RTCVideoView(
                                _service.renduDistant,
                                objectFit: RTCVideoViewObjectFit
                                    .RTCVideoViewObjectFitCover,
                              ),
                            )
                          : Center(
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  _PhotoAppelAnimee(
                                    nom: widget.autreNom,
                                    photo: widget.autrePhoto,
                                    actif: _fluxDistantRecu && _enCours,
                                    radius: 56,
                                  ),
                                  const SizedBox(height: 16),
                                  _nomAppel(widget.autreNom, taille: 22),
                                  const SizedBox(height: 8),
                                  Text(
                                    _statutAppel(),
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
                    // Retourner la caméra, carte 159 : petit
                    // bouton sur la fenêtre vidéo locale, en haut
                    // à droite, en plus de Plus puis Basculer.
                    Positioned(
                      right: 20,
                      top: 20,
                      child: SizedBox(
                        width: 36,
                        height: 36,
                        child: FilledButton(
                          style: FilledButton.styleFrom(
                            backgroundColor: Colors.black45,
                            shape: const CircleBorder(),
                            padding: EdgeInsets.zero,
                          ),
                          onPressed: _basculerCameraAvantArriere,
                          child: const Icon(
                            Icons.switch_camera,
                            size: 20,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                    // Réduire, carte 4 : quitte l'écran sans
                    // raccrocher, une fois décroché, la pastille
                    // permet ensuite d'y revenir.
                    if (_enCours)
                      Positioned(
                        left: 16,
                        top: 16,
                        child: _BoutonReduire(onPressed: _reduire),
                      ),
                    Positioned(
                      left: 0,
                      right: 0,
                      bottom: 24,
                      child: _CommandesAppel(
                        estVideo: true,
                        muet: _muet,
                        hautParleur: _hautParleur,
                        cameraActive: _cameraActive,
                        plusDisponible: true,
                        onMuet: _basculerMuet,
                        onHautParleur: _basculerHautParleur,
                        onCamera: _basculerCamera,
                        onBasculerVideo: _basculerVersVideo,
                        onPlus: _ouvrirPlus,
                        onRaccrocher: _raccrocher,
                      ),
                    ),
                  ],
                )
              : Stack(
                  children: [
                    // Appel audio : le flux distant n'était monté
                    // que pour la vidéo, donc sur le web la voix
                    // distante n'avait aucun élément pour sortir.
                    // Étape 2 : une vue cachée, 1 px, transparente,
                    // monte le flux distant dès qu'il arrive, pour
                    // que la voix sorte, comme en vidéo.
                    if (_fluxDistantRecu)
                      Positioned(
                        left: 0,
                        top: 0,
                        width: 1,
                        height: 1,
                        child: Opacity(
                          opacity: 0,
                          child: RTCVideoView(_service.renduDistant),
                        ),
                      ),
                    // Réduire, carte 4 : quitte l'écran sans
                    // raccrocher, une fois décroché, la pastille
                    // permet ensuite d'y revenir.
                    if (_enCours)
                      Positioned(
                        left: 16,
                        top: 16,
                        child: _BoutonReduire(onPressed: _reduire),
                      ),
                    Column(
                      children: [
                        const SizedBox(height: 16),
                        _nomAppel(widget.autreNom),
                        const SizedBox(height: 8),
                        Padding(
                          padding:
                              const EdgeInsets.symmetric(horizontal: 32),
                          child: Text(
                            _statutAppel(),
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                              fontSize: 16,
                              color: Colors.white70,
                            ),
                          ),
                        ),
                        Expanded(
                          child: Center(
                            child: _PhotoAppelAnimee(
                              nom: widget.autreNom,
                              photo: widget.autrePhoto,
                              actif: _fluxDistantRecu && _enCours,
                            ),
                          ),
                        ),
                        _CommandesAppel(
                          estVideo: false,
                          muet: _muet,
                          hautParleur: _hautParleur,
                          cameraActive: _cameraActive,
                          plusDisponible: _enCours,
                          onMuet: _basculerMuet,
                          onHautParleur: _basculerHautParleur,
                          onCamera: _basculerCamera,
                          onBasculerVideo: _basculerVersVideo,
                          onPlus: _ouvrirPlus,
                          onRaccrocher: _raccrocher,
                        ),
                        const SizedBox(height: 16),
                      ],
                    ),
                  ],
                ),
        ),
      ),
    );
  }
}

/// Commandes d'un appel en cours, modèle WhatsApp, 21 nov. 2026 :
/// carte sombre en bas, deux rangées de trois gros boutons,
/// Haut-parleur, Appel vidéo, Muet, puis Plus, Terminer rouge au
/// centre, le sixième emplacement vide. Pas de Partager, pas
/// d'ajout de personne, appels à deux seulement. En vidéo,
/// « Appel vidéo » coupe ou remet la caméra ; en audio, il
/// bascule en vidéo, carte 156, le partage d'écran est sous Plus.
class _CommandesAppel extends StatelessWidget {
  const _CommandesAppel({
    required this.estVideo,
    required this.muet,
    required this.hautParleur,
    required this.cameraActive,
    required this.plusDisponible,
    required this.onMuet,
    required this.onHautParleur,
    required this.onCamera,
    required this.onBasculerVideo,
    required this.onPlus,
    required this.onRaccrocher,
  });

  final bool estVideo;
  final bool muet;
  final bool hautParleur;
  final bool cameraActive;
  final bool plusDisponible;
  final VoidCallback onMuet;
  final VoidCallback onHautParleur;
  final VoidCallback onCamera;
  final VoidCallback onBasculerVideo;
  final VoidCallback onPlus;
  final VoidCallback onRaccrocher;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 8),
      decoration: BoxDecoration(
        color: const Color(0xFF1B2C40),
        borderRadius: BorderRadius.circular(28),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            children: [
              Expanded(
                child: _BoutonGrilleAppel(
                  icone: Icons.volume_up,
                  actif: hautParleur,
                  libelle: tr('Haut-parleur'),
                  onPressed: onHautParleur,
                ),
              ),
              Expanded(
                child: _BoutonGrilleAppel(
                  icone: cameraActive ? Icons.videocam : Icons.videocam_off,
                  actif: false,
                  libelle: tr('Appel vidéo'),
                  onPressed: estVideo ? onCamera : onBasculerVideo,
                ),
              ),
              Expanded(
                child: _BoutonGrilleAppel(
                  icone: muet ? Icons.mic_off : Icons.mic,
                  actif: muet,
                  libelle: tr('Muet'),
                  onPressed: onMuet,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: _BoutonGrilleAppel(
                  icone: Icons.more_horiz,
                  actif: false,
                  libelle: tr('Plus'),
                  onPressed: plusDisponible ? onPlus : null,
                ),
              ),
              Expanded(
                child: _BoutonGrilleAppel(
                  icone: Icons.call_end,
                  actif: false,
                  libelle: tr('Terminer'),
                  couleur: const Color(0xFFB3261E),
                  onPressed: onRaccrocher,
                ),
              ),
              const Expanded(child: SizedBox()),
            ],
          ),
        ],
      ),
    );
  }
}

/// Bouton « Réduire » de l'écran d'appel, carte 4 : en haut à
/// gauche, une fois décroché, il quitte l'écran sans raccrocher.
class _BoutonReduire extends StatelessWidget {
  const _BoutonReduire({required this.onPressed});

  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        SizedBox(
          width: 48,
          height: 48,
          child: FilledButton(
            style: FilledButton.styleFrom(
              backgroundColor: Colors.white24,
              shape: const CircleBorder(),
              padding: EdgeInsets.zero,
            ),
            onPressed: onPressed,
            child: const Icon(
              Icons.keyboard_arrow_down,
              size: 28,
              color: Colors.white,
            ),
          ),
        ),
        const SizedBox(height: 4),
        Text(
          tr('Réduire'),
          style: const TextStyle(fontSize: 12, color: Colors.white),
        ),
      ],
    );
  }
}

/// Gros bouton rond de la grille d'appel, modèle WhatsApp :
/// 72 px, libellé dessous, blanc quand il est actif, rouge pour
/// Terminer. Un bouton sans action est atténué.
class _BoutonGrilleAppel extends StatelessWidget {
  const _BoutonGrilleAppel({
    required this.icone,
    required this.actif,
    required this.libelle,
    required this.onPressed,
    this.couleur,
  });

  final IconData icone;
  final bool actif;
  final String libelle;
  final VoidCallback? onPressed;
  final Color? couleur;

  @override
  Widget build(BuildContext context) {
    final fond = couleur ?? (actif ? Colors.white : Colors.white24);
    final iconeCouleur =
        couleur != null ? Colors.white : (actif ? Cp.navy : Colors.white);
    return Opacity(
      opacity: onPressed == null ? 0.4 : 1,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(
            width: 72,
            height: 72,
            child: FilledButton(
              style: FilledButton.styleFrom(
                backgroundColor: fond,
                shape: const CircleBorder(),
                padding: EdgeInsets.zero,
              ),
              onPressed: onPressed,
              child: Icon(icone, size: 30, color: iconeCouleur),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            libelle,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 13, color: Colors.white),
          ),
        ],
      ),
    );
  }
}

/// Nom de l'autre membre en Cinzel capitales, police de
/// l'en-tête, 21 nov. 2026.
Widget _nomAppel(String nom, {double taille = 24}) {
  return Padding(
    padding: const EdgeInsets.symmetric(horizontal: 32),
    child: Text(
      nom.toUpperCase(),
      textAlign: TextAlign.center,
      maxLines: 2,
      overflow: TextOverflow.ellipsis,
      style: TextStyle(
        fontFamily: 'Cinzel',
        fontSize: taille,
        fontWeight: FontWeight.w700,
        letterSpacing: 1.2,
        color: Colors.white,
      ),
    ),
  );
}

/// Photo du membre en appel, avec l'anneau d'or vivant, 21 nov.
/// 2026 : l'anneau respire doucement, et il s'anime plus vite
/// quand le flux distant est arrivé et que l'appel est décroché,
/// comme si l'autre parlait. Le niveau de voix réel n'est pas
/// mesuré par le moteur WebRTC, l'anneau ne suit donc pas la voix
/// exacte, il suit la présence de l'autre. Sans photo, les
/// initiales sur fond or, comme avant.
class _PhotoAppelAnimee extends StatefulWidget {
  const _PhotoAppelAnimee({
    required this.nom,
    this.photo,
    required this.actif,
    this.radius = 88,
  });

  final String nom;
  final ImageProvider? photo;
  final bool actif;
  final double radius;

  @override
  State<_PhotoAppelAnimee> createState() => _PhotoAppelAnimeeState();
}

class _PhotoAppelAnimeeState extends State<_PhotoAppelAnimee>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controleur;

  @override
  void initState() {
    super.initState();
    _controleur = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: widget.actif ? 1100 : 2400),
    )..repeat(reverse: true);
  }

  @override
  void didUpdateWidget(_PhotoAppelAnimee oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.actif != widget.actif) {
      _controleur.duration =
          Duration(milliseconds: widget.actif ? 1100 : 2400);
      _controleur.repeat(reverse: true);
    }
  }

  @override
  void dispose() {
    _controleur.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final diametre = widget.radius * 2;
    return SizedBox(
      width: diametre + 24,
      height: diametre + 24,
      child: AnimatedBuilder(
        animation: _controleur,
        builder: (context, enfant) {
          final valeur = _controleur.value;
          final echelle = 1.0 + (widget.actif ? 0.07 : 0.04) * valeur;
          final halo = (widget.actif ? 0.55 : 0.35) * (1 - valeur);
          return Stack(
            alignment: Alignment.center,
            children: [
              Transform.scale(
                scale: echelle,
                child: Container(
                  width: diametre + 20,
                  height: diametre + 20,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: Cp.gold.withValues(alpha: halo),
                      width: 3,
                    ),
                  ),
                ),
              ),
              Container(
                width: diametre + 8,
                height: diametre + 8,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(color: Cp.gold, width: 2),
                ),
              ),
              enfant!,
            ],
          );
        },
        child: widget.photo != null
            ? CircleAvatar(
                radius: widget.radius,
                backgroundImage: widget.photo,
              )
            : CircleAvatar(
                radius: widget.radius,
                backgroundColor: Cp.gold,
                child: Text(
                  initialesNom(widget.nom),
                  style: TextStyle(
                    fontSize: widget.radius * 0.7,
                    fontWeight: FontWeight.bold,
                    color: Cp.navy,
                  ),
                ),
              ),
      ),
    );
  }
}
