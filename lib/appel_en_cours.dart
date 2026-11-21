// État global de l'appel en cours, carte 4, 21 nov. 2026.
// Avant, l'appel ne vivait que dans l'écran d'appel : quitter
// l'écran raccrochait, et rien ne permettait d'y revenir. L'appel
// vit désormais ici, accessible depuis l'accueil, le tiroir et
// l'en-tête web, avec son service WebRTC et sa signalisation,
// pour survivre à la réduction de l'écran. L'écran reste une vue
// sur cet état : il s'y branche au démarrage, le met à jour au
// décrochage, et le libère au raccrochage. Réduire quitte
// l'écran sans envoyer 'termine' et sans libérer le service ; la
// pastille « Appel en cours » rouvre ensuite le même appel, avec
// le même service, sans nouvelle préparation WebRTC.
import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_callkit_incoming/entities/entities.dart';
import 'package:flutter_callkit_incoming/flutter_callkit_incoming.dart';

import 'api.dart';
import 'appels_webrtc.dart';
import 'appels_ws.dart';

/// État global d'un appel, un seul à la fois, comme le serveur.
class EtatAppelGlobal extends ChangeNotifier with WidgetsBindingObserver {
  String _appelId = '';
  String _autreNom = '';
  String _typeAppel = 'audio';
  bool _suisAppelant = false;
  bool _enCours = false;
  DateTime? _debut;
  bool _reduit = false;
  bool _prepare = false;
  bool _muet = false;
  bool _hautParleur = false;

  /// Service WebRTC de l'appel, gardé ici pendant la réduction,
  // pour que le média survive sans l'écran.
  ServiceAppelWebRtc? _service;

  /// Signalisation de l'appel, gardée ici pendant la réduction.
  ClientSignalisationAppels? _signalisation;

  /// Vrai quand un appel natif existe pour cet appel (sortant
  /// démarré par startCall, ou entrant accepté via CallKit) :
  /// endCall n'est alors envoyé qu'au raccrochage, jamais avant.
  bool _appelSystemeActif = false;

  bool _observateurAjoute = false;
  bool _enArrierePlan = false;
  DateTime? _derniereReprise;

  /// Envoi de 'termine' au serveur, injecté en tests ; sinon
  /// l'envoi réel par l'API.
  Future<void> Function(String appelId)? envoyerTermine;

  /// Démarrage de l'appel système, injecté en tests ; sinon
  /// startCall de CallKit.
  Future<void> Function(String appelId, String autreNom, String typeAppel)?
      surDemarrerSysteme;

  /// Fin de l'appel système, injectée en tests ; sinon endCall
  /// de CallKit.
  Future<void> Function(String appelId)? surTerminerSysteme;

  /// Ouverture de l'écran d'appel en cours, branchée par la
  /// coquille (goAppels) : la bibliothèque des écrans d'appel
  /// est différée, elle ne peut pas être importée ici. Sans
  /// branchement, revenir sort seulement du mode réduit.
  void Function(BuildContext context)? ouvrirEcran;

  String get appelId => _appelId;
  String get autreNom => _autreNom;
  String get typeAppel => _typeAppel;
  bool get suisAppelant => _suisAppelant;
  bool get enCours => _enCours;
  DateTime? get debut => _debut;
  bool get reduit => _reduit;
  bool get prepare => _prepare;
  bool get muet => _muet;
  bool get hautParleur => _hautParleur;
  ServiceAppelWebRtc? get service => _service;
  ClientSignalisationAppels? get signalisation => _signalisation;
  bool get appelSystemeActif => _appelSystemeActif;
  bool get enArrierePlan => _enArrierePlan;
  DateTime? get derniereReprise => _derniereReprise;

  /// Vrai quand un appel est ouvert, sonné ou en cours.
  bool get actif => _appelId.isNotEmpty;

  /// Branche l'écran d'appel sur l'état global. Reprise du même
  /// appel, même service : l'état (décroché, début, préparation,
  /// commandes) est gardé, seuls la signalisation et le mode
  /// réduit sont mis à jour. Nouvel appel, ou même identifiant
  /// avec un autre service : tout repart de zéro.
  void demarrer({
    required String appelId,
    required String autreNom,
    required String typeAppel,
    required bool suisAppelant,
    required ServiceAppelWebRtc service,
    required ClientSignalisationAppels signalisation,
  }) {
    if (actif && _appelId == appelId && _service == service) {
      _signalisation = signalisation;
      _reduit = false;
      notifyListeners();
      return;
    }
    _appelId = appelId;
    _autreNom = autreNom;
    _typeAppel = typeAppel;
    _suisAppelant = suisAppelant;
    _enCours = false;
    _debut = null;
    _reduit = false;
    _prepare = false;
    _muet = false;
    _hautParleur = false;
    _service = service;
    _signalisation = signalisation;
    _appelSystemeActif = false;
    _ajouterObservateur();
    notifyListeners();
  }

  /// Identifiant de l'appel, connu après sa création côté
  /// appelant, quand l'écran s'ouvre aussitôt après le tap.
  void definirAppelId(String appelId) {
    if (appelId.isEmpty || _appelId == appelId) return;
    _appelId = appelId;
    notifyListeners();
  }

  /// Préparation WebRTC terminée : une reprise ne la refait pas.
  void marquerPrepare() {
    if (_prepare) return;
    _prepare = true;
    notifyListeners();
  }

  /// Appel décroché : la durée part d'ici, la pastille l'affiche.
  void passerEnCours() {
    if (_enCours) return;
    _enCours = true;
    _debut = DateTime.now();
    notifyListeners();
  }

  /// Commandes audio choisies sur l'écran, gardées pour la
  /// reprise, pour que l'affichage ne mente pas au retour.
  void mettreAJourAudio({required bool muet, required bool hautParleur}) {
    if (_muet == muet && _hautParleur == hautParleur) return;
    _muet = muet;
    _hautParleur = hautParleur;
    notifyListeners();
  }

  /// Réduit l'écran sans raccrocher : l'appel continue, la
  /// pastille apparaît sur l'accueil, dans le tiroir et dans
  /// l'en-tête web.
  void reduire() {
    if (!actif || _reduit) return;
    _reduit = true;
    notifyListeners();
  }

  /// Sort du mode réduit et rouvre l'écran d'appel, avec le
  /// même service et la même signalisation.
  void revenir(BuildContext context) {
    if (!actif) return;
    _reduit = false;
    notifyListeners();
    ouvrirEcran?.call(context);
  }

  /// Appel natif déjà affiché pour l'appelé (accepté via
  /// CallKit) : endCall s'applique au raccrochage, sans startCall.
  void marquerAppelSystemeActif() {
    _appelSystemeActif = true;
  }

  /// Démarre l'appel système de l'appelant (startCall) : sur
  /// APK, le service de premier plan de CallKit s'ouvre avec la
  /// notification d'appel en cours, pour que l'appel survive
  /// quand l'application passe en arrière-plan. Sur le web,
  /// rien à démarrer. Un échec ne bloque jamais l'appel.
  Future<void> demarrerAppelSysteme() async {
    if (!actif || _appelSystemeActif) return;
    _appelSystemeActif = true;
    final demarrer = surDemarrerSysteme ?? _demarrerSystemeReel;
    try {
      await demarrer(_appelId, _autreNom, _typeAppel);
    } catch (_) {
      // L'appel continue sans appel système.
    }
  }

  Future<void> _demarrerSystemeReel(
    String appelId,
    String autreNom,
    String typeAppel,
  ) async {
    if (kIsWeb) return;
    await FlutterCallkitIncoming.startCall(
      CallKitParams(
        id: appelId,
        nameCaller:
            autreNom.isNotEmpty ? autreNom : 'CONNEXION PROPHÉTIQUE',
        appName: 'CONNEXION PROPHÉTIQUE',
        type: typeAppel == 'video' ? 1 : 0,
      ),
    );
  }

  /// Termine l'appel système (endCall), quand il existe. Appelé
  /// par terminer(), jamais par la réduction. [appelId] est
  /// l'identifiant à fermer, l'état courant quand il est absent.
  Future<void> terminerAppelSysteme([String? appelId]) async {
    if (!_appelSystemeActif) return;
    _appelSystemeActif = false;
    final id = appelId ?? _appelId;
    if (id.isEmpty) return;
    final terminer = surTerminerSysteme ?? _terminerSystemeReel;
    try {
      await terminer(id);
    } catch (_) {}
  }

  Future<void> _terminerSystemeReel(String appelId) async {
    if (kIsWeb || appelId.isEmpty) return;
    await FlutterCallkitIncoming.endCall(appelId);
  }

  /// Fin de l'appel, des deux côtés : ferme l'appel système
  /// quand il existe, puis vide l'état. La réduction n'appelle
  /// jamais ceci.
  Future<void> terminer() async {
    if (!actif) return;
    final appelId = _appelId;
    _appelId = '';
    _autreNom = '';
    _typeAppel = 'audio';
    _suisAppelant = false;
    _enCours = false;
    _debut = null;
    _reduit = false;
    _prepare = false;
    _muet = false;
    _hautParleur = false;
    _service = null;
    _signalisation = null;
    _retirerObservateur();
    notifyListeners();
    if (_appelSystemeActif && appelId.isNotEmpty) {
      await terminerAppelSysteme(appelId);
    }
  }

  void _ajouterObservateur() {
    if (_observateurAjoute) return;
    _observateurAjoute = true;
    WidgetsBinding.instance.addObserver(this);
  }

  void _retirerObservateur() {
    if (!_observateurAjoute) return;
    _observateurAjoute = false;
    WidgetsBinding.instance.removeObserver(this);
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (!actif) return;
    if (state == AppLifecycleState.paused ||
        state == AppLifecycleState.inactive) {
      // Passage en arrière-plan pendant un appel : l'appel
      // continue, rien n'est coupé ici, l'état sert seulement à
      // la pastille au retour.
      if (!_enArrierePlan) {
        _enArrierePlan = true;
        notifyListeners();
      }
    } else if (state == AppLifecycleState.resumed) {
      if (_enArrierePlan) {
        _enArrierePlan = false;
        _derniereReprise = DateTime.now();
        notifyListeners();
      }
    } else if (state == AppLifecycleState.detached) {
      // Application fermée pendant un appel, APK : envoi de
      // 'termine' au mieux, quand le système le permet. Sans
      // garantie, l'expiration serveur reste le filet.
      final envoyer = envoyerTermine ?? _envoyerTermineReel;
      unawaited(envoyer(_appelId).catchError((_) {}));
    }
  }

  Future<void> _envoyerTermineReel(String appelId) async {
    if (appelId.isEmpty) return;
    await api.envoyerSignalAppel(appelId, type: 'termine');
  }
}

/// État global de l'appel, partagé par l'écran, la pastille et
/// la coquille.
final etatAppelGlobal = EtatAppelGlobal();

/// Pastille « Appel en cours », carte 4 : visible seulement quand
/// un appel est en cours et réduit, sur l'accueil, dans le tiroir
/// et dans l'en-tête web. Le toucher rouvre l'écran d'appel, avec
/// le même service, sans raccrocher ni recommencer l'appel.
class BarreAppelEnCours extends StatelessWidget {
  const BarreAppelEnCours({super.key, this.fermerAvant = false});

  /// Vrai dans le tiroir : le tiroir se referme avant l'ouverture
  /// de l'écran, comme les autres entrées.
  final bool fermerAvant;

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: etatAppelGlobal,
      builder: (context, _) {
        final etat = etatAppelGlobal;
        if (!etat.actif || !etat.reduit) return const SizedBox.shrink();
        return Material(
          color: const Color(0xFF0B1F3A),
          child: InkWell(
            onTap: () {
              if (fermerAvant) Navigator.of(context).pop();
              etatAppelGlobal.revenir(context);
            },
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
              child: Row(
                children: [
                  Container(
                    width: 10,
                    height: 10,
                    decoration: const BoxDecoration(
                      color: Color(0xFF34D399),
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(width: 10),
                  const Icon(Icons.call, color: Colors.white, size: 20),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          etat.autreNom.isEmpty
                              ? 'Appel en cours'
                              : 'Appel en cours · ${etat.autreNom}',
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w700,
                            fontSize: 14,
                          ),
                        ),
                        if (etat.debut != null)
                          _DureeAppelEnCours(debut: etat.debut!),
                      ],
                    ),
                  ),
                  const Text(
                    'Revenir',
                    style: TextStyle(
                      color: Color(0xFFE5C158),
                      fontWeight: FontWeight.w800,
                      fontSize: 14,
                    ),
                  ),
                  const SizedBox(width: 4),
                  const Icon(
                    Icons.keyboard_arrow_up,
                    color: Color(0xFFE5C158),
                    size: 20,
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

/// Durée de l'appel dans la pastille, mise à jour chaque seconde.
class _DureeAppelEnCours extends StatefulWidget {
  const _DureeAppelEnCours({required this.debut});
  final DateTime debut;

  @override
  State<_DureeAppelEnCours> createState() => _DureeAppelEnCoursState();
}

class _DureeAppelEnCoursState extends State<_DureeAppelEnCours> {
  Timer? _minuteur;

  @override
  void initState() {
    super.initState();
    _minuteur = Timer.periodic(const Duration(seconds: 1), (_) {
      if (mounted) setState(() {});
    });
  }

  @override
  void dispose() {
    _minuteur?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final duree = DateTime.now().difference(widget.debut);
    final minutes = (duree.inSeconds ~/ 60).toString().padLeft(2, '0');
    final secondes = (duree.inSeconds % 60).toString().padLeft(2, '0');
    return Text(
      '$minutes:$secondes',
      style: const TextStyle(color: Colors.white70, fontSize: 12),
    );
  }
}
