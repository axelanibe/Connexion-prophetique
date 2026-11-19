// Témoignages vidéo, 17 nov. 2026, décision d'Axel : le
// cinquième onglet de la pilule, à la place de la Carte.
// Publication par le membre, modération par le Bureau : un
// témoignage publié est en attente, seuls les témoignages
// approuvés sont visibles dans le fil, l'auteur voit le statut
// des siens, le Bureau voit la file d'attente dans la page même.
// Médias sur R2, même compartiment que les stories, préfixe
// temoignages/, liens signés temporaires du serveur, jamais
// d'adresse brute. Sans clés R2 côté serveur, la page s'affiche
// avec un message clair et la publication est désactivée, sans
// erreur visible. Vidéo seulement en V1, 25 Mo et 60 s au plus.
// La lecture se fait en plein écran, au toucher, comme les
// stories : le fil ne montre qu'une carte par témoignage.
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:video_player/video_player.dart';

import 'api.dart';
import 'i18n.dart';
import 'main.dart';
import 'tiroir_intelligent.dart';

// Palette de l'application, mêmes valeurs que HomeWeb.
const _nuit = Color(0xFF0F1C2E);
const _or = Color(0xFFE5C158);
const _grisTexte = Color(0xFF5E687C);

/// Taille maximale d'une vidéo, comme côté serveur.
const tailleMaxVideoTemoignage = 25 * 1024 * 1024;

/// Durée maximale d'une vidéo, vérifiée à la sélection.
const dureeMaxVideoTemoignage = Duration(seconds: 60);

/// Libellé d'un statut, pour l'auteur et pour le Bureau.
String libelleStatutTemoignage(String statut) {
  switch (statut) {
    case 'approuve':
      return tr('Approuvé');
    case 'refuse':
      return tr('Refusé');
    default:
      return tr('En attente');
  }
}

/// Date courte, jour/mois/année, sans dépendance.
String dateCourteTemoignage(DateTime? date) {
  if (date == null) return '';
  return '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}';
}

class Temoignage {
  Temoignage({
    required this.id,
    required this.url,
    this.auteurNom = '',
    this.etablissementNom = '',
    this.statut = 'en_attente',
    this.creeLe,
  });

  factory Temoignage.fromJson(Map<String, dynamic> j) => Temoignage(
        id: (j['id'] ?? '').toString(),
        url: (j['url'] ?? '').toString(),
        auteurNom: (j['auteur_nom'] ?? '').toString(),
        etablissementNom: (j['etablissement_nom'] ?? '').toString(),
        statut: (j['statut'] ?? 'en_attente').toString(),
        creeLe: j['cree_le'] == null ? null : DateTime.tryParse(j['cree_le'].toString()),
      );

  final String id;
  final String url;
  final String auteurNom;
  final String etablissementNom;
  final String statut;
  final DateTime? creeLe;

  bool get approuve => statut == 'approuve';
  bool get enAttente => statut == 'en_attente';
  bool get refuse => statut == 'refuse';

  /// Prénom de l'auteur, pour le libellé de la carte.
  String get prenomAuteur => auteurNom.isEmpty ? '' : auteurNom.split(' ').first;
}

/// Page Témoignages, onglet 4 : fil des témoignages approuvés,
/// mes témoignages avec leur statut, file de modération pour le
/// Bureau. Le client est injecté pour les tests.
class TemoignagesPage extends StatefulWidget {
  const TemoignagesPage({super.key, required this.client, this.scrollController});

  final ApiClient client;
  final ScrollController? scrollController;

  @override
  State<TemoignagesPage> createState() => _TemoignagesPageState();
}

class _TemoignagesPageState extends State<TemoignagesPage> {
  bool _charge = false;
  bool _r2 = false;
  bool _erreur = false;
  List<Temoignage> _fil = [];
  List<Temoignage> _miens = [];
  List<Temoignage> _moderation = [];
  bool _actionEnCours = false;

  @override
  void initState() {
    super.initState();
    // Pastille « Nouveau », 19 nov. 2026 : l'ouverture de la
    // fonctionnalité, par le tiroir ou par la pilule, fait
    // disparaître la pastille du tiroir.
    unawaited(NouveautesVues.instance.marquerVue('temoignages'));
    unawaited(_charger());
  }

  Future<void> _charger() async {
    try {
      final data = await widget.client.fetchTemoignages();
      if (!mounted) return;
      setState(() {
        _charge = true;
        _erreur = false;
        _r2 = data['r2'] == true;
        _fil = ((data['temoignages'] as List?) ?? [])
            .whereType<Map<String, dynamic>>()
            .map(Temoignage.fromJson)
            .toList();
        _miens = ((data['mes_temoignages'] as List?) ?? [])
            .whereType<Map<String, dynamic>>()
            .map(Temoignage.fromJson)
            .toList();
        _moderation = ((data['moderation'] as List?) ?? [])
            .whereType<Map<String, dynamic>>()
            .map(Temoignage.fromJson)
            .toList();
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _charge = true;
        _erreur = true;
      });
    }
  }

  Future<void> _moderer(Temoignage t, String statut) async {
    if (_actionEnCours) return;
    setState(() => _actionEnCours = true);
    try {
      await widget.client.modererTemoignage(t.id, statut);
      await _charger();
      if (mounted) {
        toast(context, statut == 'approuve' ? tr('Témoignage approuvé, il est visible dans le fil.') : tr('Témoignage refusé, il reste visible par son auteur seulement.'));
      }
    } catch (_) {
      if (mounted) toast(context, tr('Modération impossible.'));
    } finally {
      if (mounted) setState(() => _actionEnCours = false);
    }
  }

  Future<void> _supprimer(Temoignage t) async {
    final confirmer = await showDialog<bool>(
      context: context,
      builder: (c) => AlertDialog(
        title: Text(tr('Supprimer ce témoignage ?')),
        content: Text(tr('Le témoignage disparaîtra pour tous les membres.')),
        actions: [
          TextButton(onPressed: () => Navigator.of(c).pop(false), child: Text(tr('Annuler'))),
          TextButton(onPressed: () => Navigator.of(c).pop(true), child: Text(tr('Supprimer'))),
        ],
      ),
    );
    if (confirmer != true || !mounted) return;
    try {
      await widget.client.supprimerTemoignage(t.id);
      await _charger();
      if (mounted) toast(context, tr('Témoignage supprimé.'));
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de supprimer le témoignage.'));
    }
  }

  Future<void> _publier() async {
    final publie = await Navigator.of(context).push<bool>(
      MaterialPageRoute(builder: (_) => CreationTemoignagePage(client: widget.client)),
    );
    if (publie == true) unawaited(_charger());
  }

  @override
  Widget build(BuildContext context) {
    if (!_charge) return basic(tr('Témoignages'), [const Center(child: CircularProgressIndicator())], tabIndex: 4, controller: widget.scrollController);
    if (_erreur) {
      return basic(
        tr('Témoignages'),
        [
          Center(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Text(tr('Impossible de charger les témoignages.'), textAlign: TextAlign.center),
            ),
          ),
        ],
        tabIndex: 4,
        controller: widget.scrollController,
        onRefresh: _charger,
      );
    }
    final enfants = <Widget>[];
    if (!_r2) {
      enfants.add(
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Row(children: [
              const Icon(Icons.videocam_off_outlined, color: _grisTexte, size: 24),
              const SizedBox(width: 12),
              Expanded(child: Text(tr('Les témoignages sont désactivés pour le moment.'))),
            ]),
          ),
        ),
      );
    } else {
      enfants.add(
        SizedBox(
          width: double.infinity,
          height: 52,
          child: FilledButton.icon(
            onPressed: _publier,
            icon: const Icon(Icons.videocam_outlined),
            label: Text(tr('Publier un témoignage')),
          ),
        ),
      );
      enfants.add(const SizedBox(height: Cp.s2));
    }
    // File de modération, pour le Bureau seulement, en attente
    // d'abord : approuver ou refuser, sans quitter la page.
    if (_moderation.isNotEmpty) {
      enfants.add(
        Text(
          tr('À modérer (${_moderation.length})'),
          style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
        ),
      );
      enfants.add(const SizedBox(height: Cp.s1));
      for (final t in _moderation) {
        enfants.add(_CarteTemoignage(
          temoignage: t,
          onTap: () => go(context, LecteurTemoignagePage(temoignage: t)),
          actions: [
            TextButton(
              onPressed: _actionEnCours ? null : () => _moderer(t, 'refuse'),
              child: Text(tr('Refuser')),
            ),
            FilledButton(
              onPressed: _actionEnCours ? null : () => _moderer(t, 'approuve'),
              child: Text(tr('Approuver')),
            ),
          ],
        ));
        enfants.add(const SizedBox(height: Cp.s1));
      }
      enfants.add(const SizedBox(height: Cp.s2));
    }
    // Mes témoignages, avec leur statut, en attente ou refusé
    // comme approuvé : l'auteur voit toujours les siens.
    if (_miens.isNotEmpty) {
      enfants.add(
        Text(
          tr('Mes témoignages'),
          style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
        ),
      );
      enfants.add(const SizedBox(height: Cp.s1));
      for (final t in _miens) {
        enfants.add(_CarteTemoignage(
          temoignage: t,
          montreStatut: true,
          onTap: () => go(context, LecteurTemoignagePage(temoignage: t)),
          actions: [
            IconButton(
              tooltip: tr('Supprimer'),
              onPressed: () => _supprimer(t),
              icon: const Icon(Icons.delete_outlined),
            ),
          ],
        ));
        enfants.add(const SizedBox(height: Cp.s1));
      }
      enfants.add(const SizedBox(height: Cp.s2));
    }
    if (_fil.isEmpty && _r2) {
      enfants.add(
        Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Text(
              tr('Aucun témoignage approuvé pour le moment.'),
              textAlign: TextAlign.center,
              style: TextStyle(color: _grisTexte),
            ),
          ),
        ),
      );
    }
    for (final t in _fil) {
      enfants.add(_CarteTemoignage(
        temoignage: t,
        onTap: () => go(context, LecteurTemoignagePage(temoignage: t)),
      ));
      enfants.add(const SizedBox(height: Cp.s1));
    }
    return basic(tr('Témoignages'), enfants, tabIndex: 4, controller: widget.scrollController, onRefresh: _charger);
  }
}

/// Une carte du fil : icône vidéo, auteur, établissement et date,
/// toucher pour lire en plein écran. Le statut s'affiche pour
/// l'auteur et pour le Bureau, jamais dans le fil public.
class _CarteTemoignage extends StatelessWidget {
  const _CarteTemoignage({required this.temoignage, required this.onTap, this.actions, this.montreStatut = false});

  final Temoignage temoignage;
  final VoidCallback onTap;
  final List<Widget>? actions;
  final bool montreStatut;

  @override
  Widget build(BuildContext context) {
    final t = temoignage;
    return Card(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Row(children: [
                const CircleAvatar(
                  radius: 24,
                  backgroundColor: _nuit,
                  child: Icon(Icons.ondemand_video_outlined, color: _or, size: 24),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text(
                      t.auteurNom.isEmpty ? tr('Témoignage') : t.auteurNom,
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700),
                    ),
                    if (t.etablissementNom.isNotEmpty || t.creeLe != null) ...[
                      const SizedBox(height: 2),
                      Text(
                        [t.etablissementNom, dateCourteTemoignage(t.creeLe)].where((s) => s.isNotEmpty).join(' · '),
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: _grisTexte),
                      ),
                    ],
                    if (montreStatut) ...[
                      const SizedBox(height: 4),
                      Text(
                        libelleStatutTemoignage(t.statut),
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              color: t.approuve ? const Color(0xFF1B6B3A) : t.refuse ? const Color(0xFF7A1F2B) : _grisTexte,
                              fontWeight: FontWeight.w700,
                            ),
                      ),
                    ],
                  ]),
                ),
                const Icon(Icons.play_circle_outlined, color: _nuit, size: 28),
              ]),
              if (actions != null) ...[
                const SizedBox(height: 8),
                Row(mainAxisAlignment: MainAxisAlignment.end, children: actions!),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

/// Lecteur plein écran d'un témoignage, comme le lecteur de story :
/// lecture automatique, toucher pour mettre en pause ou reprendre,
/// bouton pour revoir à la fin.
class LecteurTemoignagePage extends StatefulWidget {
  const LecteurTemoignagePage({super.key, required this.temoignage});

  final Temoignage temoignage;

  @override
  State<LecteurTemoignagePage> createState() => _LecteurTemoignagePageState();
}

class _LecteurTemoignagePageState extends State<LecteurTemoignagePage> {
  VideoPlayerController? _controleur;
  bool _erreur = false;
  bool _termine = false;

  @override
  void initState() {
    super.initState();
    _controleur = VideoPlayerController.networkUrl(Uri.parse(widget.temoignage.url))
      ..initialize().then((_) {
        if (!mounted) return;
        setState(() {});
        _controleur!.play();
        _controleur!.addListener(_surveiller);
      }).catchError((_) {
        if (mounted) setState(() => _erreur = true);
      });
  }

  void _surveiller() {
    final controleur = _controleur;
    if (controleur == null || !controleur.value.isInitialized) return;
    if (controleur.value.position >= controleur.value.duration && controleur.value.duration != Duration.zero) {
      controleur.removeListener(_surveiller);
      if (mounted) setState(() => _termine = true);
    }
  }

  @override
  void dispose() {
    _controleur?.removeListener(_surveiller);
    _controleur?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final controleur = _controleur;
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        foregroundColor: Colors.white,
        title: Text(widget.temoignage.auteurNom.isEmpty ? tr('Témoignage') : widget.temoignage.auteurNom),
      ),
      body: SafeArea(
        child: Center(
          child: _erreur
              ? const Icon(Icons.videocam_off_outlined, color: Colors.white54, size: 48)
              : controleur == null || !controleur.value.isInitialized
                  ? const CircularProgressIndicator(color: Colors.white)
                  : GestureDetector(
                      onTap: () {
                        if (_termine) {
                          controleur.seekTo(Duration.zero);
                          setState(() => _termine = false);
                          controleur.play();
                          controleur.addListener(_surveiller);
                        } else if (controleur.value.isPlaying) {
                          controleur.pause();
                          setState(() {});
                        } else {
                          controleur.play();
                          setState(() {});
                        }
                      },
                      child: Stack(
                        alignment: Alignment.center,
                        children: [
                          AspectRatio(
                            aspectRatio: controleur.value.aspectRatio,
                            child: VideoPlayer(controleur),
                          ),
                          if (_termine)
                            const Icon(Icons.replay_outlined, color: Colors.white, size: 56)
                          else if (!controleur.value.isPlaying)
                            const Icon(Icons.play_circle_outlined, color: Colors.white70, size: 56),
                        ],
                      ),
                    ),
        ),
      ),
    );
  }
}

/// Page de publication : choisir une vidéo dans la galerie ou
/// filmer, puis publier. Le témoignage part en attente de
/// validation par le Bureau, jamais direct dans le fil.
class CreationTemoignagePage extends StatefulWidget {
  const CreationTemoignagePage({super.key, required this.client});

  final ApiClient client;

  @override
  State<CreationTemoignagePage> createState() => _CreationTemoignagePageState();
}

class _CreationTemoignagePageState extends State<CreationTemoignagePage> {
  XFile? _video;
  int _taille = 0;
  bool _publicationEnCours = false;

  Future<void> _choisir(ImageSource source) async {
    try {
      final picked = await ImagePicker().pickVideo(source: source, maxDuration: dureeMaxVideoTemoignage);
      if (picked == null) return;
      final taille = await picked.length();
      if (!mounted) return;
      if (taille > tailleMaxVideoTemoignage) {
        toast(context, tr('Vidéo trop volumineuse : 25 Mo au plus.'));
        return;
      }
      setState(() {
        _video = picked;
        _taille = taille;
      });
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de choisir la vidéo.'));
    }
  }

  Future<void> _publier() async {
    final video = _video;
    if (video == null || _publicationEnCours) return;
    setState(() => _publicationEnCours = true);
    try {
      final bytes = await video.readAsBytes();
      await widget.client.publierTemoignage(bytes: bytes, filename: video.name);
      if (!mounted) return;
      toast(context, tr('Témoignage envoyé, en attente de validation par le Bureau.'));
      Navigator.of(context).pop(true);
    } catch (_) {
      if (!mounted) return;
      toast(context, tr('Publication impossible.'));
    } finally {
      if (mounted) setState(() => _publicationEnCours = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return basic(tr('Publier un témoignage'), [
      Text(tr('Une courte vidéo, 60 secondes au plus. Elle sera visible dans le fil seulement après validation par le Bureau.')),
      const SizedBox(height: Cp.s2),
      Row(children: [
        Expanded(
          child: OutlinedButton.icon(
            onPressed: () => _choisir(ImageSource.gallery),
            icon: const Icon(Icons.video_library_outlined),
            label: Text(tr('Galerie')),
          ),
        ),
        const SizedBox(width: Cp.s1),
        Expanded(
          child: OutlinedButton.icon(
            onPressed: () => _choisir(ImageSource.camera),
            icon: const Icon(Icons.videocam_outlined),
            label: Text(tr('Filmer')),
          ),
        ),
      ]),
      if (_video != null) ...[
        const SizedBox(height: Cp.s2),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Row(children: [
              const Icon(Icons.ondemand_video_outlined, color: _nuit, size: 24),
              const SizedBox(width: 12),
              Expanded(
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(_video!.name, maxLines: 1, overflow: TextOverflow.ellipsis),
                  const SizedBox(height: 2),
                  Text('${(_taille / 1024 / 1024).toStringAsFixed(1)} Mo', style: const TextStyle(color: _grisTexte)),
                ]),
              ),
              IconButton(
                tooltip: tr('Retirer'),
                onPressed: () => setState(() {
                  _video = null;
                  _taille = 0;
                }),
                icon: const Icon(Icons.close_outlined),
              ),
            ]),
          ),
        ),
        const SizedBox(height: Cp.s2),
        SizedBox(
          width: double.infinity,
          height: 52,
          child: FilledButton.icon(
            onPressed: _publicationEnCours ? null : _publier,
            icon: const Icon(Icons.send_outlined),
            label: Text(_publicationEnCours ? tr('Publication…') : tr('Publier')),
          ),
        ),
      ],
    ]);
  }
}
