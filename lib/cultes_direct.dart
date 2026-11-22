// Culte en direct et replay chapitré, 21 nov. 2026,
// tranches 4 et 5 de l'audit du 17 nov. : la structure publie
// un culte avec le lien du direct et, quand il existe, celui
// du replay, puis découpe le replay en chapitres. Le membre
// ouvre le flux fourni par la structure, et reprend un replay
// à partir d'un chapitre, dans le lecteur audio existant quand
// le replay est audio, dans le lecteur vidéo déjà présent
// quand il est vidéo.
//
// Aucun fournisseur de diffusion n'est imposé, ni YouTube, ni
// Facebook, ni autre : la structure fournit les URL. Aucun
// culte, aucune date, aucun chapitre n'est inventé. À ne pas
// confondre avec les cultes présentiels, événements de type
// 'culte' avec présence du membre : ceux-là vivent ailleurs
// et ne changent pas.
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:video_player/video_player.dart';

import 'api.dart';
import 'i18n.dart';

// Palette de l'application, mêmes valeurs que HomeWeb.
const _nuit = Color(0xFF0F1C2E);
const _or = Color(0xFFE5C158);
const _grisTexte = Color(0xFF5E687C);

/// Statuts d'un culte en direct, dans l'ordre de sa vie.
const statutsCulteDirect = ['à venir', 'en direct', 'terminé'];

/// Extensions vidéo : le replay s'ouvre dans le lecteur vidéo
/// déjà présent, sinon dans le lecteur audio existant.
const _extensionsVideo = {'mp4', 'mov', 'm4v', 'webm', 'mkv', 'm3u8'};

/// Vrai quand le lien du replay est une vidéo, d'après son
/// extension. Un lien sans extension connue est lu comme un
/// audio.
bool replayEstVideo(String url) {
  final propre = url.split('?').first.split('#').first;
  final point = propre.lastIndexOf('.');
  if (point < 0) return false;
  return _extensionsVideo.contains(propre.substring(point + 1).toLowerCase());
}

/// Secondes en « 12:34 », ou « 1:02:03 » au-delà d'une heure.
String dureeChapitreFormatee(int secondes) {
  final s = secondes < 0 ? 0 : secondes;
  final h = s ~/ 3600;
  final m = (s % 3600) ~/ 60;
  final reste = s % 60;
  final mm = h > 0 ? m.toString().padLeft(2, '0') : m.toString();
  final ss = reste.toString().padLeft(2, '0');
  return h > 0 ? '$h:$mm:$ss' : '$mm:$ss';
}

/// « 12:34 » ou « 90 » en secondes, null quand illisible.
int? parseDebutMmSs(String saisie) {
  final propre = saisie.trim();
  if (propre.isEmpty) return null;
  if (!propre.contains(':')) return int.tryParse(propre);
  final parties = propre.split(':');
  if (parties.length > 3) return null;
  final nombres = <int>[];
  for (final p in parties) {
    final n = int.tryParse(p);
    if (n == null || n < 0) return null;
    nombres.add(n);
  }
  var total = 0;
  for (final n in nombres) {
    total = total * 60 + n;
  }
  return total;
}

/// Un chapitre de replay : titre et début en secondes.
class ChapitreCulte {
  ChapitreCulte({required this.id, required this.titre, required this.debutSecondes});

  factory ChapitreCulte.fromJson(Map<String, dynamic> j) => ChapitreCulte(
        id: (j['id'] ?? '').toString(),
        titre: (j['titre'] ?? '').toString(),
        debutSecondes: j['debut_secondes'] is int
            ? j['debut_secondes'] as int
            : int.tryParse((j['debut_secondes'] ?? '').toString()) ?? 0,
      );

  final String id;
  final String titre;
  final int debutSecondes;
}

/// Un culte en direct : titre, date, liens fournis par la
/// structure, statut et chapitres du replay.
class CulteDirect {
  CulteDirect({
    required this.id,
    required this.titre,
    this.date = '',
    this.urlDirect = '',
    this.urlReplay = '',
    this.statut = 'à venir',
    this.chapitres = const [],
  });

  factory CulteDirect.fromJson(Map<String, dynamic> j) {
    final bruts = j['chapitres'];
    final chapitres = <ChapitreCulte>[];
    if (bruts is List) {
      for (final b in bruts) {
        if (b is Map<String, dynamic>) chapitres.add(ChapitreCulte.fromJson(b));
      }
    }
    chapitres.sort((a, b) => a.debutSecondes.compareTo(b.debutSecondes));
    return CulteDirect(
      id: (j['id'] ?? '').toString(),
      titre: (j['titre'] ?? '').toString(),
      date: (j['date'] ?? '').toString(),
      urlDirect: (j['url_direct'] ?? '').toString(),
      urlReplay: (j['url_replay'] ?? '').toString(),
      statut: (j['statut'] ?? 'à venir').toString(),
      chapitres: chapitres,
    );
  }

  final String id;
  final String titre;
  final String date;
  final String urlDirect;
  final String urlReplay;
  final String statut;
  final List<ChapitreCulte> chapitres;

  bool get estEnDirect => statut == 'en direct';
  bool get estAVenir => statut == 'à venir';
  bool get aReplay => urlReplay.isNotEmpty;
}

/// Cultes depuis la réponse du serveur, dans l'ordre renvoyé.
List<CulteDirect> cultesDirectDepuisReponse(Map<String, dynamic> data) {
  final lignes = data['cultes'];
  if (lignes is! List) return const [];
  return lignes.whereType<Map<String, dynamic>>().map(CulteDirect.fromJson).toList();
}

/// Culte à mettre en avant sur l'accueil : le premier en
/// direct, sinon le premier programmé, sinon rien.
CulteDirect? culteDirectEnAvantLocal(List<CulteDirect> cultes) {
  for (final c in cultes) {
    if (c.estEnDirect) return c;
  }
  for (final c in cultes) {
    if (c.estAVenir) return c;
  }
  return null;
}

/// Date AAAA-MM-JJ en « 22 nov. 2026 », ou la chaîne telle
/// quelle quand elle ne se lit pas.
String dateCulteCourte(String iso) {
  const mois = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  final d = DateTime.tryParse(iso);
  if (d == null) return iso;
  return '${d.day} ${mois[d.month - 1]} ${d.year}';
}

Color _couleurStatutCulte(String statut) {
  switch (statut) {
    case 'en direct':
      return const Color(0xFFB71C1C);
    case 'terminé':
      return _grisTexte;
    default:
      return _or;
  }
}

/// Page des cultes en direct et des replays chapitrés, avec
/// publication par le Bureau.
class CultesDirectPage extends StatefulWidget {
  const CultesDirectPage({super.key, this.client, this.estBureau = false});

  /// Client injecté pour les tests, le client global sinon.
  final ApiClient? client;

  /// Vrai quand l'ouverture vient du Bureau : création,
  /// changement de statut, chapitres. Le serveur vérifie le
  /// rôle, jamais l'application seule.
  final bool estBureau;

  @override
  State<CultesDirectPage> createState() => _CultesDirectPageState();
}

class _CultesDirectPageState extends State<CultesDirectPage> {
  List<CulteDirect> _cultes = const [];
  bool _charge = false;
  bool _enCours = false;

  ApiClient get _client => widget.client ?? api;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    try {
      final data = await _client.fetchCultesDirect();
      if (!mounted) return;
      setState(() {
        _cultes = cultesDirectDepuisReponse(data);
        _charge = true;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() => _charge = true);
      _annoncer(e.toString());
    }
  }

  void _annoncer(String message) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
  }

  Future<void> _ouvrirDirect(CulteDirect culte) async {
    final ok = await launchUrl(Uri.parse(culte.urlDirect), mode: LaunchMode.externalApplication);
    if (!ok && mounted) _annoncer(tr('Impossible d’ouvrir ce lien.'));
  }

  Future<void> _changerStatut(CulteDirect culte, String statut) async {
    if (_enCours || culte.statut == statut) return;
    setState(() => _enCours = true);
    try {
      await _client.modifierCulteDirect(culte.id, {'statut': statut});
      if (mounted) _annoncer(tr('Statut changé.'));
    } catch (e) {
      if (mounted) _annoncer(e.toString());
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
    await _charger();
  }

  Future<void> _creer() async {
    final titre = TextEditingController();
    final urlDirect = TextEditingController();
    final urlReplay = TextEditingController();
    var date = DateTime.now();
    final cree = await showDialog<bool>(
      context: context,
      builder: (c) => StatefulBuilder(
        builder: (c, setDialogState) => AlertDialog(
          title: Text(tr('Nouveau culte')),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                TextField(
                  controller: titre,
                  decoration: InputDecoration(labelText: tr('Titre du culte')),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(child: Text('${tr('Date :')} ${dateCulteCourte(date.toIso8601String().substring(0, 10))}')),
                    TextButton(
                      onPressed: () async {
                        final choix = await showDatePicker(
                          context: c,
                          initialDate: date,
                          firstDate: DateTime.now().subtract(const Duration(days: 365)),
                          lastDate: DateTime.now().add(const Duration(days: 365)),
                        );
                        if (choix != null) setDialogState(() => date = choix);
                      },
                      child: Text(tr('Choisir')),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: urlDirect,
                  decoration: InputDecoration(labelText: tr('Lien du direct')),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: urlReplay,
                  decoration: InputDecoration(labelText: tr('Lien du replay')),
                ),
                const SizedBox(height: 8),
                Text(
                  tr('Les liens sont fournis par la structure.'),
                  style: const TextStyle(color: _grisTexte, fontSize: 13),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(onPressed: () => Navigator.of(c).pop(false), child: Text(tr('Annuler'))),
            TextButton(
              onPressed: () {
                if (titre.text.trim().isEmpty) return;
                Navigator.of(c).pop(true);
              },
              child: Text(tr('Créer')),
            ),
          ],
        ),
      ),
    );
    if (cree != true) return;
    setState(() => _enCours = true);
    try {
      await _client.creerCulteDirect(
        titre.text.trim(),
        date.toIso8601String().substring(0, 10),
        urlDirect.text.trim(),
        urlReplay.text.trim(),
      );
      if (mounted) _annoncer(tr('Culte créé.'));
    } catch (e) {
      if (mounted) _annoncer(e.toString());
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
    await _charger();
  }

  Future<void> _ajouterChapitre(CulteDirect culte) async {
    final titre = TextEditingController();
    final debut = TextEditingController(text: '0:00');
    final ajoute = await showDialog<bool>(
      context: context,
      builder: (c) => AlertDialog(
        title: Text(tr('Nouveau chapitre')),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: titre,
              decoration: InputDecoration(labelText: tr('Titre du chapitre')),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: debut,
              decoration: InputDecoration(labelText: tr('Début (mm:ss)')),
            ),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.of(c).pop(false), child: Text(tr('Annuler'))),
          TextButton(
            onPressed: () {
              if (titre.text.trim().isEmpty || parseDebutMmSs(debut.text) == null) return;
              Navigator.of(c).pop(true);
            },
            child: Text(tr('Ajouter')),
          ),
        ],
      ),
    );
    if (ajoute != true) return;
    setState(() => _enCours = true);
    try {
      await _client.ajouterChapitreCulte(culte.id, titre.text.trim(), parseDebutMmSs(debut.text)!);
      if (mounted) _annoncer(tr('Chapitre ajouté.'));
    } catch (e) {
      if (mounted) _annoncer(e.toString());
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
    await _charger();
  }

  Future<void> _supprimerChapitre(CulteDirect culte, ChapitreCulte chapitre) async {
    if (_enCours) return;
    setState(() => _enCours = true);
    try {
      await _client.supprimerChapitreCulte(culte.id, chapitre.id);
      if (mounted) _annoncer(tr('Chapitre supprimé.'));
    } catch (e) {
      if (mounted) _annoncer(e.toString());
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
    await _charger();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(tr('Culte en direct'))),
      floatingActionButton: widget.estBureau
          ? FloatingActionButton.extended(
              onPressed: _enCours ? null : _creer,
              icon: const Icon(Icons.add),
              label: Text(tr('Nouveau culte')),
            )
          : null,
      body: !_charge
          ? const Center(child: CircularProgressIndicator())
          : _cultes.isEmpty
              ? RefreshIndicator(
                  onRefresh: _charger,
                  child: ListView(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(32),
                        child: Text(
                          tr('Aucun culte en direct ni programmé pour le moment.'),
                          textAlign: TextAlign.center,
                          style: const TextStyle(color: _grisTexte, fontSize: 15),
                        ),
                      ),
                    ],
                  ),
                )
              : RefreshIndicator(
                  onRefresh: _charger,
                  child: ListView.builder(
                    padding: const EdgeInsets.fromLTRB(0, 8, 0, 24),
                    itemCount: _cultes.length,
                    itemBuilder: (context, index) {
                      final culte = _cultes[index];
                      return Padding(
                        padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
                        child: Card(
                          child: Padding(
                            padding: const EdgeInsets.all(16),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    Expanded(child: Text(culte.titre, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 17))),
                                    Chip(
                                      label: Text(tr(culte.statut)),
                                      backgroundColor: _couleurStatutCulte(culte.statut),
                                      labelStyle: TextStyle(
                                        color: culte.estEnDirect ? Colors.white : _nuit,
                                        fontWeight: FontWeight.w700,
                                      ),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 4),
                                Text(dateCulteCourte(culte.date), style: const TextStyle(color: _grisTexte, fontSize: 13)),
                                const SizedBox(height: 12),
                                Wrap(
                                  spacing: 8,
                                  runSpacing: 8,
                                  children: [
                                    if (culte.urlDirect.isNotEmpty)
                                      FilledButton.icon(
                                        onPressed: () => _ouvrirDirect(culte),
                                        icon: const Icon(Icons.live_tv_outlined),
                                        label: Text(culte.estEnDirect ? tr('Regarder en direct') : tr('Regarder')),
                                      ),
                                    if (culte.aReplay)
                                      OutlinedButton.icon(
                                        onPressed: () => Navigator.of(context).push(
                                          MaterialPageRoute(builder: (_) => LecteurReplayPage(culte: culte)),
                                        ),
                                        icon: const Icon(Icons.play_circle_outlined),
                                        label: Text(tr('Replay')),
                                      ),
                                    if (widget.estBureau)
                                      DropdownButton<String>(
                                        value: culte.statut,
                                        underline: const SizedBox.shrink(),
                                        items: [
                                          for (final s in statutsCulteDirect)
                                            DropdownMenuItem(value: s, child: Text(tr(s))),
                                        ],
                                        onChanged: _enCours ? null : (s) => s == null ? null : _changerStatut(culte, s),
                                      ),
                                  ],
                                ),
                                if (culte.chapitres.isNotEmpty) ...[
                                  const SizedBox(height: 12),
                                  const Divider(),
                                  for (final chapitre in culte.chapitres)
                                    ListTile(
                                      contentPadding: EdgeInsets.zero,
                                      leading: const Icon(Icons.play_arrow_outlined, color: _nuit),
                                      title: Text(chapitre.titre),
                                      trailing: Row(
                                        mainAxisSize: MainAxisSize.min,
                                        children: [
                                          Text(dureeChapitreFormatee(chapitre.debutSecondes), style: const TextStyle(color: _grisTexte)),
                                          if (widget.estBureau)
                                            IconButton(
                                              icon: const Icon(Icons.delete_outlined),
                                              tooltip: tr('Supprimer'),
                                              onPressed: _enCours ? null : () => _supprimerChapitre(culte, chapitre),
                                            ),
                                        ],
                                      ),
                                      onTap: culte.aReplay
                                          ? () => Navigator.of(context).push(
                                                MaterialPageRoute(
                                                  builder: (_) => LecteurReplayPage(culte: culte, chapitreInitial: chapitre),
                                                ),
                                              )
                                          : null,
                                    ),
                                ],
                                if (widget.estBureau) ...[
                                  const SizedBox(height: 8),
                                  TextButton.icon(
                                    onPressed: _enCours ? null : () => _ajouterChapitre(culte),
                                    icon: const Icon(Icons.add),
                                    label: Text(tr('Ajouter un chapitre')),
                                  ),
                                ],
                              ],
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
    );
  }
}

/// Lecteur d'un replay : le lecteur audio existant quand le
/// replay est audio, le lecteur vidéo déjà présent quand il
/// est vidéo. Un toucher sur un chapitre reprend la lecture à
/// ce moment.
class LecteurReplayPage extends StatefulWidget {
  const LecteurReplayPage({super.key, required this.culte, this.chapitreInitial});

  final CulteDirect culte;

  /// Chapitre d'où reprendre la lecture, ou null pour le début.
  final ChapitreCulte? chapitreInitial;

  @override
  State<LecteurReplayPage> createState() => _LecteurReplayPageState();
}

class _LecteurReplayPageState extends State<LecteurReplayPage> {
  late final bool _estVideo;
  AudioPlayer? _lecteurAudio;
  VideoPlayerController? _controleurVideo;
  bool _pret = false;
  bool _erreur = false;
  bool _enCours = false;
  Duration _position = Duration.zero;
  Duration _duree = Duration.zero;
  StreamSubscription<Duration>? _abonnementPosition;
  StreamSubscription<Duration?>? _abonnementDuree;
  StreamSubscription<PlayerState>? _abonnementEtat;

  @override
  void initState() {
    super.initState();
    _estVideo = replayEstVideo(widget.culte.urlReplay);
    _initialiser();
  }

  Future<void> _initialiser() async {
    final debut = Duration(seconds: widget.chapitreInitial?.debutSecondes ?? 0);
    if (_estVideo) {
      final controleur = VideoPlayerController.networkUrl(Uri.parse(widget.culte.urlReplay));
      _controleurVideo = controleur;
      try {
        await controleur.initialize();
        if (debut > Duration.zero) await controleur.seekTo(debut);
        controleur.addListener(_surveillerVideo);
        if (!mounted) return;
        setState(() {
          _duree = controleur.value.duration;
          _pret = true;
        });
        await controleur.play();
      } catch (_) {
        if (mounted) setState(() => _erreur = true);
      }
      return;
    }
    final lecteur = AudioPlayer();
    _lecteurAudio = lecteur;
    try {
      await lecteur.setUrl(widget.culte.urlReplay);
      if (debut > Duration.zero) await lecteur.seek(debut);
      _abonnementPosition = lecteur.positionStream.listen((p) {
        if (mounted) setState(() => _position = p);
      });
      _abonnementDuree = lecteur.durationStream.listen((d) {
        if (mounted && d != null) setState(() => _duree = d);
      });
      _abonnementEtat = lecteur.playerStateStream.listen((etat) {
        if (mounted) setState(() => _enCours = etat.playing);
      });
      if (!mounted) return;
      setState(() => _pret = true);
      await lecteur.play();
    } catch (_) {
      if (mounted) setState(() => _erreur = true);
    }
  }

  void _surveillerVideo() {
    final controleur = _controleurVideo;
    if (controleur == null || !controleur.value.isInitialized) return;
    if (mounted) {
      setState(() {
        _position = controleur.value.position;
        _enCours = controleur.value.isPlaying;
      });
    }
  }

  @override
  void dispose() {
    _abonnementPosition?.cancel();
    _abonnementDuree?.cancel();
    _abonnementEtat?.cancel();
    _controleurVideo?.removeListener(_surveillerVideo);
    _controleurVideo?.dispose();
    _lecteurAudio?.dispose();
    super.dispose();
  }

  Future<void> _basculer() async {
    if (!_pret) return;
    if (_estVideo) {
      final controleur = _controleurVideo!;
      if (controleur.value.isPlaying) {
        await controleur.pause();
      } else {
        if (controleur.value.position >= controleur.value.duration && controleur.value.duration != Duration.zero) {
          await controleur.seekTo(Duration.zero);
        }
        await controleur.play();
      }
      return;
    }
    final lecteur = _lecteurAudio!;
    if (lecteur.playing) {
      await lecteur.pause();
    } else {
      if (lecteur.processingState == ProcessingState.completed) await lecteur.seek(Duration.zero);
      await lecteur.play();
    }
  }

  Future<void> _reprendre(ChapitreCulte chapitre) async {
    if (!_pret) return;
    final moment = Duration(seconds: chapitre.debutSecondes);
    if (_estVideo) {
      await _controleurVideo!.seekTo(moment);
      await _controleurVideo!.play();
      return;
    }
    await _lecteurAudio!.seek(moment);
    await _lecteurAudio!.play();
  }

  @override
  Widget build(BuildContext context) {
    final culte = widget.culte;
    return Scaffold(
      appBar: AppBar(title: Text(culte.titre)),
      body: _erreur
          ? Center(
              child: Padding(
                padding: const EdgeInsets.all(32),
                child: Text(tr('Impossible de lire ce replay.'), textAlign: TextAlign.center),
              ),
            )
          : !_pret
              ? const Center(child: CircularProgressIndicator())
              : ListView(
                  padding: const EdgeInsets.all(16),
                  children: [
                    if (_estVideo && _controleurVideo != null && _controleurVideo!.value.isInitialized)
                      AspectRatio(
                        aspectRatio: _controleurVideo!.value.aspectRatio,
                        child: VideoPlayer(_controleurVideo!),
                      ),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        SizedBox(
                          width: 48,
                          height: 48,
                          child: IconButton(
                            icon: Icon(_enCours ? Icons.pause : Icons.play_arrow, size: 32),
                            color: _nuit,
                            tooltip: _enCours ? tr('Pause') : tr('Écouter'),
                            onPressed: _basculer,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Slider(
                            value: _duree.inMilliseconds <= 0
                                ? 0.0
                                : (_position.inMilliseconds / _duree.inMilliseconds).clamp(0.0, 1.0),
                            onChanged: (v) async {
                              final moment = Duration(milliseconds: (_duree.inMilliseconds * v).round());
                              if (_estVideo) {
                                await _controleurVideo!.seekTo(moment);
                              } else {
                                await _lecteurAudio!.seek(moment);
                              }
                            },
                          ),
                        ),
                      ],
                    ),
                    Text(
                      '${dureeChapitreFormatee(_position.inSeconds)} / ${dureeChapitreFormatee(_duree.inSeconds)}',
                      textAlign: TextAlign.center,
                      style: const TextStyle(color: _grisTexte),
                    ),
                    const SizedBox(height: 16),
                    Text(tr('Chapitres'), style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 17)),
                    const SizedBox(height: 8),
                    if (culte.chapitres.isEmpty)
                      Text(tr('Aucun chapitre pour ce replay.'), style: const TextStyle(color: _grisTexte, fontSize: 15))
                    else
                      for (final chapitre in culte.chapitres)
                        ListTile(
                          contentPadding: EdgeInsets.zero,
                          leading: const Icon(Icons.play_arrow_outlined, color: _nuit),
                          title: Text(chapitre.titre),
                          trailing: Text(dureeChapitreFormatee(chapitre.debutSecondes), style: const TextStyle(color: _grisTexte)),
                          onTap: () => _reprendre(chapitre),
                        ),
                  ],
                ),
    );
  }
}
