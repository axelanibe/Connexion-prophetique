// Magnétophone, 18 nov. 2026 : enregistrer un message audio
// comme un magnétophone pro, forme d'onde, minuteur, pause et
// reprise, réécoute, nom et liste. Stockage local seulement par
// défaut : fichiers sur le téléphone, dans le navigateur sur le
// web, rien sur le serveur de la structure. Sauvegarde Google
// Drive en option, voir magnetophone_drive.dart.
//
// L'enregistrement passe par le paquet record (version 5.2.1,
// compatible Flutter 3.27) : AAC sur téléphone, opus ou AAC sur
// le web selon le navigateur. La lecture passe par just_audio,
// déjà utilisé pour les enseignements.

import 'dart:async';
import 'dart:convert';
import 'dart:math' as math;

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:record/record.dart';
import 'package:share_plus/share_plus.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'i18n.dart';
import 'magnetophone_drive.dart';
import 'magnetophone_stockage.dart';
import 'magnetophone_stockage_types.dart';
import 'main.dart';
import 'sauvegarde_app.dart';
import 'stockage_auth.dart';
import 'tiroir_intelligent.dart';

/// Durée maximale d'un enregistrement local : 60 minutes, pour
/// borner le stockage sur l'appareil.
const dureeMaxEnregistrementLocal = Duration(minutes: 60);

/// Durée maximale d'un message vocal dans la messagerie :
/// 5 minutes, comme le plafond serveur.
const dureeMaxMessageVocal = Duration(minutes: 5);

/// Durée en minutes:secondes : 65 secondes donnent « 1:05 ».
String formaterDureeMagnetophone(Duration duree) {
  final total = duree.inSeconds;
  return '${total ~/ 60}:${(total % 60).toString().padLeft(2, '0')}';
}

/// Type audio lu dans les octets, jamais d'après le nom : webm
/// (Chrome), mp4 ou m4a (téléphone et Safari), mp3, ogg, wav.
String mimeDepuisOctets(Uint8List octets, {String defaut = 'audio/mp4'}) {
  if (octets.length >= 4 &&
      octets[0] == 0x1A &&
      octets[1] == 0x45 &&
      octets[2] == 0xDF &&
      octets[3] == 0xA3) {
    return 'audio/webm';
  }
  if (octets.length >= 12 &&
      String.fromCharCodes(octets.sublist(4, 8)) == 'ftyp') {
    return 'audio/mp4';
  }
  if (octets.length >= 12 &&
      String.fromCharCodes(octets.sublist(0, 4)) == 'RIFF' &&
      String.fromCharCodes(octets.sublist(8, 12)) == 'WAVE') {
    return 'audio/wav';
  }
  if (octets.length >= 3 && octets[0] == 0xFF && (octets[1] & 0xE0) == 0xE0) {
    return 'audio/mpeg';
  }
  if (octets.length >= 4 &&
      String.fromCharCodes(octets.sublist(0, 4)) == 'OggS') {
    return 'audio/ogg';
  }
  return defaut;
}

/// Extension du type réel, pour le fichier local et le partage.
String extensionDepuisMime(String mime) {
  return const {
    'audio/webm': 'webm',
    'audio/mp4': 'm4a',
    'audio/mpeg': 'mp3',
    'audio/ogg': 'ogg',
    'audio/wav': 'wav',
    'audio/x-m4a': 'm4a',
  }[mime] ??
      'm4a';
}

String nouvelIdEnregistrement() =>
    '${DateTime.now().microsecondsSinceEpoch.toRadixString(36)}${math.Random().nextInt(1 << 32).toRadixString(36)}';

/// Un enregistrement local : métadonnées dans SharedPreferences,
/// octets dans le stockage de la plateforme, jamais sur le
/// serveur. Les niveaux sont la forme d'onde, 0 à 1, pour la
/// réécoute.
class EnregistrementAudio {
  final String id;
  final String nom;
  final String mime;
  final int dureeMs;
  final DateTime creeLe;
  final int tailleOctets;
  final List<double> niveaux;

  const EnregistrementAudio({
    required this.id,
    required this.nom,
    required this.mime,
    required this.dureeMs,
    required this.creeLe,
    required this.tailleOctets,
    this.niveaux = const [],
  });

  String get extension => extensionDepuisMime(mime);

  Duration get duree => Duration(milliseconds: dureeMs);

  factory EnregistrementAudio.fromJson(Map<String, dynamic> j) {
    return EnregistrementAudio(
      id: (j['id'] ?? '').toString(),
      nom: (j['nom'] ?? '').toString(),
      mime: (j['mime'] ?? 'audio/mp4').toString(),
      dureeMs: (j['duree_ms'] as num?)?.toInt() ?? 0,
      creeLe: DateTime.tryParse((j['cree_le'] ?? '').toString()) ?? DateTime.now(),
      tailleOctets: (j['taille_octets'] as num?)?.toInt() ?? 0,
      niveaux: ((j['niveaux'] as List?) ?? [])
          .map((n) => (n as num).toDouble().clamp(0.0, 1.0))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'nom': nom,
        'mime': mime,
        'duree_ms': dureeMs,
        'cree_le': creeLe.toIso8601String(),
        'taille_octets': tailleOctets,
        'niveaux': niveaux,
      };
}

/// Son qui vient d'être enregistré : octets, type réel, durée.
class SonEnregistre {
  final Uint8List octets;
  final String mime;
  final int dureeMs;

  const SonEnregistre({
    required this.octets,
    required this.mime,
    required this.dureeMs,
  });
}

/// Enregistreur audio, derrière une interface pour les tests :
/// l'implémentation réelle passe par le paquet record, les tests
/// injectent un faux qui rend des octets fixes.
abstract class EnregistreurAudio {
  /// Niveaux 0 à 1, toutes les 100 ms pendant l'enregistrement.
  Stream<double> get niveaux;

  /// Démarre l'enregistrement, faux quand le micro est refusé.
  Future<bool> demarrer();

  /// Pause, reprise : la durée ne compte pas la pause.
  Future<void> mettreEnPause();

  Future<void> reprendre();

  /// Arrête et rend le son, null quand rien n'a été enregistré.
  Future<SonEnregistre?> arreter();

  /// Arrête et jette l'enregistrement en cours.
  Future<void> annuler();

  Future<void> liberer();
}

/// Enregistreur réel, paquet record : le micro est demandé à
/// l'enregistrement seulement, jamais au démarrage de
/// l'application. Le chronomètre ne compte pas les pauses.
class EnregistreurAudioRecord implements EnregistreurAudio {
  AudioRecorder? _rec;
  final _niveauxCtrl = StreamController<double>.broadcast();
  StreamSubscription<Amplitude>? _abonnement;
  final _chrono = Stopwatch();
  bool _enPause = false;

  @override
  Stream<double> get niveaux => _niveauxCtrl.stream;

  @override
  Future<bool> demarrer() async {
    final autorisation = await Permission.microphone.request();
    if (!autorisation.isGranted) return false;
    final rec = AudioRecorder();
    if (!await rec.hasPermission()) return false;
    _rec = rec;
    _enPause = false;
    _chrono.reset();
    _chrono.start();
    _abonnement = rec
        .onAmplitudeChanged(const Duration(milliseconds: 100))
        .listen((a) {
      final niveau = ((a.current + 60) / 60).clamp(0.0, 1.0);
      if (!_niveauxCtrl.isClosed) _niveauxCtrl.add(niveau);
    });
    final chemin = kIsWeb ? 'magnetophone.webm' : await _cheminTemporaire();
    await rec.start(const RecordConfig(), path: chemin);
    return true;
  }

  Future<String> _cheminTemporaire() async {
    final temp = await getTemporaryDirectory();
    return '${temp.path}/magnetophone-${nouvelIdEnregistrement()}.m4a';
  }

  @override
  Future<void> mettreEnPause() async {
    if (_enPause) return;
    _enPause = true;
    _chrono.stop();
    await _rec?.pause();
  }

  @override
  Future<void> reprendre() async {
    if (!_enPause) return;
    _enPause = false;
    _chrono.start();
    await _rec?.resume();
  }

  @override
  Future<SonEnregistre?> arreter() async {
    final rec = _rec;
    if (rec == null) return null;
    _chrono.stop();
    final duree = _chrono.elapsed;
    final chemin = await rec.stop();
    await _abonnement?.cancel();
    _abonnement = null;
    _rec = null;
    if (chemin == null || chemin.isEmpty) return null;
    final octets = await lireOctetsTemporaires(chemin);
    if (octets.isEmpty) return null;
    return SonEnregistre(
      octets: octets,
      mime: mimeDepuisOctets(octets),
      dureeMs: duree.inMilliseconds,
    );
  }

  @override
  Future<void> annuler() async {
    _chrono.stop();
    await _abonnement?.cancel();
    _abonnement = null;
    await _rec?.cancel();
    _rec = null;
  }

  @override
  Future<void> liberer() async {
    await annuler();
    await _niveauxCtrl.close();
  }
}

/// Dépôt local des enregistrements : index dans
/// SharedPreferences, octets dans le stockage de la plateforme.
/// Rien ne part vers le serveur de la structure.
class DepotEnregistrements {
  final StockageOctetsEnregistrement _octets;

  DepotEnregistrements({StockageOctetsEnregistrement? stockage})
      : _octets = stockage ?? creerStockageOctets();

  static const _cleIndex = 'magnetophone_enregistrements';

  Future<List<EnregistrementAudio>> lister() async {
    final prefs = await SharedPreferences.getInstance();
    final brut = prefs.getString(_cleIndex);
    if (brut == null) return [];
    final liste = (jsonDecode(brut) as List).cast<Map<String, dynamic>>();
    final items = liste.map(EnregistrementAudio.fromJson).toList();
    items.sort((a, b) => b.creeLe.compareTo(a.creeLe));
    return items;
  }

  Future<void> _sauverIndex(List<EnregistrementAudio> items) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      _cleIndex,
      jsonEncode(items.map((e) => e.toJson()).toList()),
    );
  }

  /// Ajoute un enregistrement : octets d'abord, index ensuite.
  /// L'identifiant peut être imposé, pour la restauration depuis
  /// Drive, afin de ne pas restaurer deux fois le même fichier.
  Future<EnregistrementAudio> ajouter({
    required String nom,
    required SonEnregistre son,
    required List<double> niveaux,
    String? id,
  }) async {
    final meta = EnregistrementAudio(
      id: id ?? nouvelIdEnregistrement(),
      nom: nom,
      mime: son.mime,
      dureeMs: son.dureeMs,
      creeLe: DateTime.now(),
      tailleOctets: son.octets.length,
      niveaux: niveaux,
    );
    await _octets.ecrire(meta.id, meta.extension, son.octets);
    final items = await lister();
    items.insert(0, meta);
    await _sauverIndex(items);
    return meta;
  }

  Future<void> renommer(EnregistrementAudio meta, String nom) async {
    final items = await lister();
    final index = items.indexWhere((e) => e.id == meta.id);
    if (index < 0) return;
    items[index] = EnregistrementAudio(
      id: meta.id,
      nom: nom,
      mime: meta.mime,
      dureeMs: meta.dureeMs,
      creeLe: meta.creeLe,
      tailleOctets: meta.tailleOctets,
      niveaux: meta.niveaux,
    );
    await _sauverIndex(items);
  }

  Future<void> supprimer(EnregistrementAudio meta) async {
    await _octets.supprimer(meta.id, meta.extension);
    final items = await lister();
    items.removeWhere((e) => e.id == meta.id);
    await _sauverIndex(items);
  }

  /// Octets d'un enregistrement, pour le partage et la sauvegarde.
  Future<Uint8List?> lireOctets(EnregistrementAudio meta) =>
      _octets.lire(meta.id, meta.extension);

  /// Source de lecture : fichier sur téléphone, adresse de
  /// données dans le navigateur.
  Future<AudioSource> sourceLecture(EnregistrementAudio meta) async {
    final chemin = await _octets.cheminLocal(meta.id, meta.extension);
    if (chemin != null) return AudioSource.file(chemin);
    final octets = await _octets.lire(meta.id, meta.extension);
    if (octets == null) throw StateError('Enregistrement introuvable.');
    return AudioSource.uri(Uri.dataFromBytes(octets, mimeType: meta.mime));
  }

  /// Fichier à partager : chemin sur téléphone, données en
  /// mémoire sur le web.
  Future<XFile> fichierPartage(EnregistrementAudio meta) async {
    final chemin = await _octets.cheminLocal(meta.id, meta.extension);
    final nom = '${meta.nom}.${meta.extension}';
    if (chemin != null) return XFile(chemin, mimeType: meta.mime, name: nom);
    final octets = await _octets.lire(meta.id, meta.extension);
    if (octets == null) throw StateError('Enregistrement introuvable.');
    return XFile.fromData(octets, mimeType: meta.mime, name: nom);
  }
}

/// Forme d'onde : barres de 3 px avec 2 px d'intervalle, le
/// nombre s'adapte à la largeur disponible pour ne jamais
/// déborder, même dans une bulle étroite. La partie jouée est
/// en couleur pleine, le reste atténué. Les niveaux sont
/// échantillonnés quand ils sont plus nombreux que les barres.
class FormeOnde extends StatelessWidget {
  final List<double> niveaux;
  final Color couleur;
  final double hauteur;
  final double progression;

  const FormeOnde({
    super.key,
    required this.niveaux,
    required this.couleur,
    this.hauteur = 36,
    this.progression = 0,
  });

  List<double> _echantillonner(int barres) {
    if (niveaux.isEmpty) return List.filled(barres, 0.05);
    if (niveaux.length <= barres) {
      final sortie = List<double>.from(niveaux);
      while (sortie.length < barres) {
        sortie.add(0.05);
      }
      return sortie;
    }
    return List.generate(barres, (i) {
      final debut = (i * niveaux.length / barres).floor();
      final fin = ((i + 1) * niveaux.length / barres).floor();
      var max = 0.0;
      for (var j = debut; j < fin; j++) {
        max = math.max(max, niveaux[j]);
      }
      return max;
    });
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, contraintes) {
        // 5 px par barre (3 px de barre, 2 px d'intervalle), 8 au
        // moins, 48 au plus : jamais de débordement.
        final largeur =
            contraintes.maxWidth.isFinite ? contraintes.maxWidth : 200.0;
        final barres = (largeur ~/ 5).clamp(8, 48);
        final echantillons = _echantillonner(barres);
        return SizedBox(
          height: hauteur,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              for (var i = 0; i < barres; i++) ...[
                if (i > 0) const SizedBox(width: 2),
                Expanded(
                  child: Container(
                    height: math.max(2, echantillons[i] * hauteur),
                    decoration: BoxDecoration(
                      color: i / barres <= progression
                          ? couleur
                          : couleur.withValues(alpha: 0.35),
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                ),
              ],
            ],
          ),
        );
      },
    );
  }
}

/// Lecteur audio compact : bouton lecture et pause, forme
/// d'onde avec la progression, durée. La source est chargée à
/// la première lecture seulement, jamais au chargement de la
/// liste. Un lecteur par ligne, libéré quand la ligne disparaît.
class LecteurAudio extends StatefulWidget {
  final Future<AudioSource> Function() chargerSource;
  final Duration duree;
  final List<double>? niveaux;
  final Color couleur;
  final Color couleurTexte;

  const LecteurAudio({
    super.key,
    required this.chargerSource,
    required this.duree,
    this.niveaux,
    required this.couleur,
    required this.couleurTexte,
  });

  @override
  State<LecteurAudio> createState() => _LecteurAudioState();
}

class _LecteurAudioState extends State<LecteurAudio> {
  AudioPlayer? _lecteur;
  bool _chargement = false;
  bool _enCours = false;
  Duration _position = Duration.zero;
  Duration? _dureeReelle;
  StreamSubscription<Duration>? _abonnementPosition;
  StreamSubscription<PlayerState>? _abonnementEtat;
  StreamSubscription<Duration?>? _abonnementDuree;

  Duration get _total =>
      (_dureeReelle != null && _dureeReelle! > Duration.zero)
          ? _dureeReelle!
          : widget.duree;

  @override
  void dispose() {
    _abonnementPosition?.cancel();
    _abonnementEtat?.cancel();
    _abonnementDuree?.cancel();
    _lecteur?.dispose();
    super.dispose();
  }

  Future<void> _basculer() async {
    if (_chargement) return;
    if (_lecteur == null) {
      setState(() => _chargement = true);
      final lecteur = AudioPlayer();
      try {
        await lecteur.setAudioSource(await widget.chargerSource());
      } catch (_) {
        await lecteur.dispose();
        if (!mounted) return;
        setState(() => _chargement = false);
        toast(context, tr('Impossible de lire cet audio.'));
        return;
      }
      _lecteur = lecteur;
      _abonnementPosition = lecteur.positionStream.listen((p) {
        if (mounted) setState(() => _position = p);
      });
      _abonnementEtat = lecteur.playerStateStream.listen((etat) {
        if (mounted) setState(() => _enCours = etat.playing);
      });
      _abonnementDuree = lecteur.durationStream.listen((d) {
        if (mounted && d != null) setState(() => _dureeReelle = d);
      });
      if (!mounted) return;
      setState(() => _chargement = false);
    }
    final lecteur = _lecteur!;
    if (lecteur.playing) {
      await lecteur.pause();
    } else {
      if (lecteur.processingState == ProcessingState.completed) {
        await lecteur.seek(Duration.zero);
      }
      await lecteur.play();
    }
  }

  @override
  Widget build(BuildContext context) {
    final progression = _total.inMilliseconds <= 0
        ? 0.0
        : (_position.inMilliseconds / _total.inMilliseconds).clamp(0.0, 1.0);
    return Row(
      children: [
        SizedBox(
          width: 40,
          height: 40,
          child: _chargement
              ? const Padding(
                  padding: EdgeInsets.all(10),
                  child: CircularProgressIndicator(strokeWidth: 2.5),
                )
              : IconButton(
                  icon: Icon(_enCours ? Icons.pause : Icons.play_arrow),
                  color: widget.couleur,
                  tooltip: _enCours ? tr('Pause') : tr('Écouter'),
                  onPressed: _basculer,
                ),
        ),
        const SizedBox(width: 4),
        Expanded(
          child: FormeOnde(
            niveaux: widget.niveaux ?? const [],
            couleur: widget.couleur,
            hauteur: 32,
            progression: progression,
          ),
        ),
        const SizedBox(width: 8),
        Text(
          '${formaterDureeMagnetophone(_position)} / ${formaterDureeMagnetophone(_total)}',
          style: TextStyle(fontSize: 12, color: widget.couleurTexte),
        ),
      ],
    );
  }
}

/// Magnétophone : enregistrer, réécouter, nommer, garder.
/// Tout reste sur l'appareil, sauf la sauvegarde Google Drive
/// que le membre choisit d'activer.
class MagnetophonePage extends StatefulWidget {
  final EnregistreurAudio? enregistreur;
  final DepotEnregistrements? depot;
  final SauvegardeDrive? drive;

  const MagnetophonePage({super.key, this.enregistreur, this.depot, this.drive});

  @override
  State<MagnetophonePage> createState() => _MagnetophonePageState();
}

enum _EtatEnregistrement { repos, enregistrement, pause }

class _MagnetophonePageState extends State<MagnetophonePage> {
  late final EnregistreurAudio _enregistreur;
  late final DepotEnregistrements _depot;
  late final SauvegardeDrive _drive;
  List<EnregistrementAudio> _enregistrements = [];
  bool _chargement = true;
  _EtatEnregistrement _etat = _EtatEnregistrement.repos;
  Timer? _minuteur;
  Duration _ecoule = Duration.zero;
  List<double> _niveauxDirect = [];
  StreamSubscription<double>? _abonnementNiveaux;
  Set<String> _sauvegardes = {};
  bool _driveLiee = false;
  String _driveCourriel = '';
  bool _driveEnCours = false;
  String? _driveMessage;
  // MO-6, 22 nov. 2026 : vrai quand un mot de passe de sauvegarde
  // est défini, donc quand les enregistrements envoyés seuls sur
  // Drive sont chiffrés. Faux sinon, et la carte l'affiche en clair.
  bool _driveChiffre = false;

  bool get _enCours => _etat != _EtatEnregistrement.repos;

  @override
  void initState() {
    super.initState();
    // Pastille « Nouveau », 19 nov. 2026 : l'ouverture de la
    // fonctionnalité fait disparaître la pastille du tiroir.
    unawaited(NouveautesVues.instance.marquerVue('magnetophone'));
    _enregistreur = widget.enregistreur ?? EnregistreurAudioRecord();
    _depot = widget.depot ?? DepotEnregistrements();
    _drive = widget.drive ?? SauvegardeDrive();
    _charger();
    _verifierDrive();
  }

  @override
  void dispose() {
    _minuteur?.cancel();
    _abonnementNiveaux?.cancel();
    _enregistreur.liberer();
    super.dispose();
  }

  Future<void> _charger() async {
    final items = await _depot.lister();
    if (!mounted) return;
    setState(() {
      _enregistrements = items;
      _chargement = false;
    });
  }

  Future<void> _verifierDrive() async {
    if (!_drive.configuree) return;
    final cle = await StockageAuth.lire(SauvegardeApp.cleAuthCle);
    final compte = await _drive.compteLie();
    if (!mounted) return;
    setState(() {
      _driveLiee = compte != null;
      _driveCourriel = compte ?? '';
      _driveChiffre = cle != null && cle.isNotEmpty;
    });
    if (compte != null) await _chargerSauvegardes();
  }

  Future<void> _chargerSauvegardes() async {
    final prefs = await SharedPreferences.getInstance();
    if (!mounted) return;
    setState(() {
      _sauvegardes =
          (prefs.getStringList('magnetophone_drive_sauvegardes') ?? []).toSet();
    });
  }

  Future<void> _demarrer() async {
    final ok = await _enregistreur.demarrer();
    if (!mounted) return;
    if (!ok) {
      toast(context, tr('Autorise le micro pour enregistrer.'));
      return;
    }
    _niveauxDirect = [];
    _abonnementNiveaux = _enregistreur.niveaux.listen((niveau) {
      _niveauxDirect.add(niveau);
      if (_niveauxDirect.length > 600) {
        _niveauxDirect.removeRange(0, _niveauxDirect.length - 600);
      }
      if (mounted) setState(() {});
    });
    _ecoule = Duration.zero;
    _minuteur?.cancel();
    _minuteur = Timer.periodic(const Duration(seconds: 1), (_) {
      if (!mounted) return;
      if (_etat != _EtatEnregistrement.enregistrement) return;
      setState(() => _ecoule += const Duration(seconds: 1));
      if (_ecoule >= dureeMaxEnregistrementLocal) _arreter();
    });
    setState(() => _etat = _EtatEnregistrement.enregistrement);
  }

  Future<void> _mettreEnPause() async {
    await _enregistreur.mettreEnPause();
    if (!mounted) return;
    setState(() => _etat = _EtatEnregistrement.pause);
  }

  Future<void> _reprendre() async {
    await _enregistreur.reprendre();
    if (!mounted) return;
    setState(() => _etat = _EtatEnregistrement.enregistrement);
  }

  Future<void> _annuler() async {
    await _enregistreur.annuler();
    _minuteur?.cancel();
    _abonnementNiveaux?.cancel();
    _abonnementNiveaux = null;
    if (!mounted) return;
    setState(() {
      _etat = _EtatEnregistrement.repos;
      _ecoule = Duration.zero;
      _niveauxDirect = [];
    });
  }

  Future<void> _arreter() async {
    final son = await _enregistreur.arreter();
    _minuteur?.cancel();
    // Le cancel ne s'attend pas : l'abonnement d'un flux
    // broadcast ne se termine pas toujours dans la même
    // microtâche, et l'arrêt n'a pas besoin de l'attendre.
    _abonnementNiveaux?.cancel();
    _abonnementNiveaux = null;
    if (!mounted) return;
    setState(() => _etat = _EtatEnregistrement.repos);
    if (son == null || son.dureeMs < 500) {
      toast(context, tr('Enregistrement trop court, ignoré.'));
      setState(() {
        _ecoule = Duration.zero;
        _niveauxDirect = [];
      });
      return;
    }
    final nom = await _demanderNom(
      tr('Nom de l’enregistrement'),
      _nomParDefaut(),
    );
    if (nom == null || !mounted) {
      setState(() {
        _ecoule = Duration.zero;
        _niveauxDirect = [];
      });
      return;
    }
    await _depot.ajouter(nom: nom, son: son, niveaux: _niveauxDirect);
    setState(() {
      _ecoule = Duration.zero;
      _niveauxDirect = [];
    });
    await _charger();
  }

  String _nomParDefaut() {
    final maintenant = DateTime.now();
    return '${tr('Enregistrement')} ${maintenant.day}/${maintenant.month} ${maintenant.hour}:${maintenant.minute.toString().padLeft(2, '0')}';
  }

  Future<String?> _demanderNom(String titre, String initial) async {
    final controleur = TextEditingController(text: initial);
    final nom = await showDialog<String>(
      context: context,
      builder: (c) => AlertDialog(
        title: Text(titre),
        content: TextField(
          controller: controleur,
          autofocus: true,
          decoration: InputDecoration(
            hintText: tr('Exemple : Prière du matin'),
            border: const OutlineInputBorder(),
          ),
          textInputAction: TextInputAction.done,
          onSubmitted: (_) => Navigator.of(c).pop(controleur.text.trim()),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(c).pop(),
            child: Text(tr('Annuler')),
          ),
          FilledButton(
            onPressed: () => Navigator.of(c).pop(controleur.text.trim()),
            child: Text(tr('Enregistrer')),
          ),
        ],
      ),
    );
    // La route se ferme avec une animation, le champ est encore
    // dans l'arbre quand showDialog se termine : la libération
    // attend la fin de l'animation.
    Future.delayed(
      const Duration(milliseconds: 400),
      controleur.dispose,
    );
    if (nom == null || nom.isEmpty) return null;
    return nom;
  }

  Future<void> _renommer(EnregistrementAudio meta) async {
    final nom = await _demanderNom(tr('Renommer'), meta.nom);
    if (nom == null || nom == meta.nom) return;
    await _depot.renommer(meta, nom);
    await _charger();
  }

  Future<void> _supprimer(EnregistrementAudio meta) async {
    final confirmer = await showDialog<bool>(
      context: context,
      builder: (c) => AlertDialog(
        title: Text(tr('Supprimer cet enregistrement ?')),
        content: Text(tr('Il disparaîtra de cet appareil.')),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(c).pop(false),
            child: Text(tr('Annuler')),
          ),
          TextButton(
            onPressed: () => Navigator.of(c).pop(true),
            child: Text(tr('Supprimer')),
          ),
        ],
      ),
    );
    if (confirmer != true) return;
    await _depot.supprimer(meta);
    await _charger();
  }

  Future<void> _partager(EnregistrementAudio meta) async {
    try {
      final fichier = await _depot.fichierPartage(meta);
      await SharePlus.instance.share(
        ShareParams(files: [fichier], text: meta.nom),
      );
    } catch (_) {
      if (!mounted) return;
      toast(context, tr('Impossible de partager cet enregistrement.'));
    }
  }

  Future<void> _lierDrive() async {
    setState(() {
      _driveEnCours = true;
      _driveMessage = null;
    });
    final courriel = await _drive.lierCompte();
    if (!mounted) return;
    setState(() {
      _driveEnCours = false;
      _driveLiee = courriel != null;
      _driveCourriel = courriel ?? '';
      _driveMessage = courriel == null
          ? tr('Connexion Google annulée.')
          : tr('Compte Google lié.');
    });
    if (courriel != null) await _chargerSauvegardes();
  }

  Future<void> _dissocierDrive() async {
    await _drive.dissocier();
    if (!mounted) return;
    setState(() {
      _driveLiee = false;
      _driveCourriel = '';
      _driveMessage = tr('Compte Google dissocié.');
    });
  }

  Future<void> _sauvegarderDrive() async {
    setState(() {
      _driveEnCours = true;
      _driveMessage = null;
    });
    // MO-6, 22 nov. 2026 : quand un mot de passe de sauvegarde
    // est défini, sa clé dérivée, gardée dans le coffre du
    // système, chiffre chaque enregistrement avant l'envoi, avec
    // le même format que la sauvegarde globale. Sans mot de
    // passe, il part en clair, et la carte l'affiche.
    List<int>? cle;
    List<int>? sel;
    try {
      final cleBrute = await StockageAuth.lire(SauvegardeApp.cleAuthCle);
      final selBrut = await StockageAuth.lire(SauvegardeApp.cleAuthSel);
      cle = cleBrute == null ? null : ChiffrementSauvegarde.cleDepuisBase64(cleBrute);
      sel = selBrut == null ? null : ChiffrementSauvegarde.selDepuisBase64(selBrut);
    } catch (_) {}
    final chiffre = cle != null && sel != null;
    var ok = 0;
    var echec = 0;
    final sauvegardes = Set<String>.from(_sauvegardes);
    for (final meta in _enregistrements) {
      if (sauvegardes.contains(meta.id)) continue;
      final octets = await _depot.lireOctets(meta);
      if (octets == null) {
        echec++;
        continue;
      }
      final aEnvoyer = (cle != null && sel != null)
          ? ChiffrementSauvegarde.chiffrerAvecCle(octets, cle, sel)
          : octets;
      final reussi = await _drive.sauvegarder(meta: meta, octets: aEnvoyer, chiffre: chiffre);
      if (reussi) {
        ok++;
        sauvegardes.add(meta.id);
      } else {
        echec++;
      }
    }
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList(
      'magnetophone_drive_sauvegardes',
      sauvegardes.toList(),
    );
    if (!mounted) return;
    setState(() {
      _driveEnCours = false;
      _sauvegardes = sauvegardes;
      _driveMessage = echec > 0
          ? tr('Sauvegarde terminée, $ok enregistrement(s), $echec en échec.')
          : tr('Sauvegarde terminée, $ok enregistrement(s).');
    });
  }

  Future<void> _restaurerDrive() async {
    setState(() {
      _driveEnCours = true;
      _driveMessage = null;
    });
    final fichiers = await _drive.lister();
    var ajoutes = 0;
    // Clé de déchiffrement des enregistrements chiffrés, MO-6 :
    // lue une fois, jamais stockée ailleurs que dans le coffre.
    List<int>? cle;
    try {
      final cleBrute = await StockageAuth.lire(SauvegardeApp.cleAuthCle);
      cle = cleBrute == null ? null : ChiffrementSauvegarde.cleDepuisBase64(cleBrute);
    } catch (_) {}
    for (final fichier in fichiers) {
      final existant = _enregistrements.any((e) => e.id == fichier.enregistrementId);
      if (existant) continue;
      final telecharges = await _drive.telecharger(fichier.id);
      if (telecharges == null) continue;
      // Fichier chiffré sans clé : on le saute, sans l'ajouter
      // en clair, plutôt que de restaurer des octets illisibles.
      final octets = fichier.chiffre
          ? (cle == null ? null : ChiffrementSauvegarde.dechiffrerAvecCle(telecharges, cle))
          : telecharges;
      if (octets == null) continue;
      await _depot.ajouter(
        nom: fichier.nom,
        son: SonEnregistre(
          octets: octets,
          mime: fichier.mime,
          dureeMs: 0,
        ),
        niveaux: const [],
        id: fichier.enregistrementId.isEmpty ? null : fichier.enregistrementId,
      );
      ajoutes++;
    }
    if (!mounted) return;
    setState(() {
      _driveEnCours = false;
      _driveMessage = ajoutes == 0
          ? tr('Rien de nouveau sur Google Drive.')
          : tr('$ajoutes enregistrement(s) restauré(s).');
    });
    await _charger();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Cp.paper,
      appBar: AppBar(
        backgroundColor: Cp.navy,
        foregroundColor: Colors.white,
        title: Text(tr('Magnétophone')),
      ),
      body: _chargement
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              padding: const EdgeInsets.all(16),
              children: [
                _carteEnregistreur(),
                const SizedBox(height: 16),
                if (_enregistrements.isEmpty)
                  _vide()
                else
                  ..._enregistrements.map(_ligneEnregistrement),
                const SizedBox(height: 16),
                _carteDrive(),
              ],
            ),
    );
  }

  Widget _vide() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Cp.line),
      ),
      child: Column(
        children: [
          const Icon(Icons.mic_outlined, color: Cp.gold, size: 40),
          const SizedBox(height: 8),
          Text(
            tr('Aucun enregistrement pour l’instant.'),
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 15, color: Cp.ink),
          ),
          const SizedBox(height: 4),
          Text(
            tr('Touche le micro pour enregistrer un message audio.'),
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 13, color: Cp.inkMuted),
          ),
        ],
      ),
    );
  }

  Widget _carteEnregistreur() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Cp.navy,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: [
          if (_enCours) ...[
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: 10,
                  height: 10,
                  decoration: const BoxDecoration(
                    color: Colors.red,
                    shape: BoxShape.circle,
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  _etat == _EtatEnregistrement.pause
                      ? tr('Pause')
                      : tr('Enregistrement'),
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w700,
                    fontSize: 15,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              formaterDureeMagnetophone(_ecoule),
              style: const TextStyle(
                color: Colors.white,
                fontSize: 40,
                fontWeight: FontWeight.w800,
                fontFeatures: [FontFeature.tabularFigures()],
              ),
            ),
            const SizedBox(height: 12),
            FormeOnde(
              niveaux: _niveauxDirect,
              couleur: Cp.gold,
              hauteur: 48,
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _boutonRond(
                  icone: _etat == _EtatEnregistrement.pause
                      ? Icons.play_arrow
                      : Icons.pause,
                  libelle: _etat == _EtatEnregistrement.pause
                      ? tr('Reprendre')
                      : tr('Pause'),
                  onPressed: _etat == _EtatEnregistrement.pause
                      ? _reprendre
                      : _mettreEnPause,
                ),
                const SizedBox(width: 24),
                _boutonRond(
                  icone: Icons.stop,
                  libelle: tr('Arrêter'),
                  onPressed: _arreter,
                  fond: Cp.gold,
                  couleurIcone: Cp.navy,
                ),
                const SizedBox(width: 24),
                _boutonRond(
                  icone: Icons.delete_outline,
                  libelle: tr('Jeter'),
                  onPressed: _annuler,
                ),
              ],
            ),
          ] else ...[
            SizedBox(
              width: 76,
              height: 76,
              child: IconButton(
                icon: const Icon(Icons.mic_outlined, size: 36),
                color: Cp.navy,
                tooltip: tr('Enregistrer'),
                style: IconButton.styleFrom(backgroundColor: Cp.gold),
                onPressed: _demarrer,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              tr('Toucher pour enregistrer'),
              style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w700,
                fontSize: 15,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              tr('Stocké sur cet appareil, jamais envoyé au serveur.'),
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Colors.white.withValues(alpha: 0.75),
                fontSize: 13,
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _boutonRond({
    required IconData icone,
    required String libelle,
    required VoidCallback onPressed,
    Color? fond,
    Color? couleurIcone,
  }) {
    return Column(
      children: [
        SizedBox(
          width: 56,
          height: 56,
          child: IconButton(
            icon: Icon(icone, size: 26),
            color: couleurIcone ?? Colors.white,
            tooltip: libelle,
            style: IconButton.styleFrom(
              backgroundColor: fond ?? Colors.white.withValues(alpha: 0.12),
            ),
            onPressed: onPressed,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          libelle,
          style: const TextStyle(color: Colors.white, fontSize: 12),
        ),
      ],
    );
  }

  Widget _ligneEnregistrement(EnregistrementAudio meta) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.fromLTRB(12, 12, 12, 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Cp.line),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  meta.nom,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontWeight: FontWeight.w700,
                    fontSize: 15,
                    color: Cp.ink,
                  ),
                ),
              ),
              if (_sauvegardes.contains(meta.id))
                const Padding(
                  padding: EdgeInsets.only(right: 4),
                  child: Icon(
                    Icons.cloud_done_outlined,
                    color: Cp.ok,
                    size: 18,
                  ),
                ),
              IconButton(
                icon: const Icon(Icons.share_outlined, size: 20),
                color: Cp.navy,
                tooltip: tr('Partager'),
                onPressed: () => _partager(meta),
              ),
              IconButton(
                icon: const Icon(Icons.edit_outlined, size: 20),
                color: Cp.navy,
                tooltip: tr('Renommer'),
                onPressed: () => _renommer(meta),
              ),
              IconButton(
                icon: const Icon(Icons.delete_outline, size: 20),
                color: Cp.danger,
                tooltip: tr('Supprimer'),
                onPressed: () => _supprimer(meta),
              ),
            ],
          ),
          Text(
            '${formaterDureeMagnetophone(meta.duree)} · ${_dateCourte(meta.creeLe)}',
            style: const TextStyle(fontSize: 12, color: Cp.inkMuted),
          ),
          const SizedBox(height: 4),
          LecteurAudio(
            chargerSource: () => _depot.sourceLecture(meta),
            duree: meta.duree,
            niveaux: meta.niveaux,
            couleur: Cp.navy,
            couleurTexte: Cp.inkMuted,
          ),
        ],
      ),
    );
  }

  String _dateCourte(DateTime date) {
    return '${date.day}/${date.month}/${date.year} ${date.hour}:${date.minute.toString().padLeft(2, '0')}';
  }

  Widget _carteDrive() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Cp.line),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.cloud_outlined, color: Cp.navy, size: 22),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  tr('Sauvegarde Google Drive'),
                  style: const TextStyle(
                    fontWeight: FontWeight.w700,
                    fontSize: 15,
                    color: Cp.ink,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          if (!_drive.configuree) ...[
            Text(
              tr('À configurer : l’identifiant client Google n’est pas encore saisi dans l’application.'),
              style: const TextStyle(fontSize: 13, color: Cp.inkMuted),
            ),
            const SizedBox(height: 4),
            Text(
              tr('Les enregistrements restent sur cet appareil en attendant.'),
              style: const TextStyle(fontSize: 13, color: Cp.inkMuted),
            ),
          ] else if (!_driveLiee) ...[
            Text(
              tr('Lie ton compte Google pour sauvegarder tes enregistrements sur ton Drive.'),
              style: const TextStyle(fontSize: 13, color: Cp.inkMuted),
            ),
            const SizedBox(height: 12),
            SizedBox(
              width: double.infinity,
              height: 48,
              child: FilledButton(
                onPressed: _driveEnCours ? null : _lierDrive,
                child: _driveEnCours
                    ? const SizedBox(
                        width: 22,
                        height: 22,
                        child: CircularProgressIndicator(
                          color: Colors.white,
                          strokeWidth: 2.5,
                        ),
                      )
                    : Text(tr('Lier mon compte Google')),
              ),
            ),
          ] else ...[
            Text(
              tr('Compte lié : $_driveCourriel'),
              style: const TextStyle(fontSize: 13, color: Cp.ink),
            ),
            const SizedBox(height: 4),
            Text(
              _driveChiffre
                  ? tr('Les enregistrements sont chiffrés avec votre mot de passe de sauvegarde avant l’envoi sur votre Drive.')
                  : tr('Sans mot de passe de sauvegarde défini, les enregistrements partent en clair sur votre Drive. Définissez-en un dans Paramètres, Sauvegarde, pour les chiffrer.'),
              style: const TextStyle(fontSize: 13, color: Cp.inkMuted),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: SizedBox(
                    height: 48,
                    child: FilledButton(
                      onPressed: _driveEnCours ? null : _sauvegarderDrive,
                      child: Text(tr('Sauvegarder')),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: SizedBox(
                    height: 48,
                    child: OutlinedButton(
                      onPressed: _driveEnCours ? null : _restaurerDrive,
                      child: Text(tr('Restaurer')),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            TextButton(
              onPressed: _driveEnCours ? null : _dissocierDrive,
              child: Text(tr('Dissocier mon compte Google')),
            ),
          ],
          if (_driveMessage != null) ...[
            const SizedBox(height: 8),
            Text(
              _driveMessage!,
              style: const TextStyle(fontSize: 13, color: Cp.inkMuted),
            ),
          ],
        ],
      ),
    );
  }
}
