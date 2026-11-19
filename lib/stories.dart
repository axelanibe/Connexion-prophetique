// Stories de 24 heures, 17 nov. 2026, décision de Muse sur
// délégation d'Axel : la structure seule publie en V1, les
// membres voient, en tête de l'accueil. Médias sur R2, liens
// signés temporaires du serveur, jamais d'adresse brute.
// Suppression automatique après 24 heures, sans trace.
// Vignette d'abord : la bande montre la photo compressée ou
// une icône vidéo, la pleine taille ne s'ouvre qu'au toucher.
// Sans clés R2 côté serveur, la liste est vide et la bande
// reste cachée, sans erreur visible.

import 'dart:async';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

import 'api.dart';
import 'creation_story.dart';
import 'i18n.dart';

// Palette de l'application, mêmes valeurs que HomeWeb.
const _nuit = Color(0xFF0F1C2E);
const _or = Color(0xFFE5C158);
const _grisTexte = Color(0xFF5E687C);

/// Durée d'affichage d'une photo dans le lecteur : 5 secondes,
/// puis passage à la suivante. Une vidéo joue jusqu'à sa fin.
const dureeStoryPhoto = Duration(seconds: 5);

class Story {
  Story({
    required this.id,
    required this.type,
    required this.url,
    this.auteurNom = '',
    this.etablissementNom = '',
    this.expireLe,
  });

  factory Story.fromJson(Map<String, dynamic> j) => Story(
        id: (j['id'] ?? '').toString(),
        type: (j['type'] ?? 'photo').toString(),
        url: (j['url'] ?? '').toString(),
        auteurNom: (j['auteur_nom'] ?? '').toString(),
        etablissementNom: (j['etablissement_nom'] ?? '').toString(),
        expireLe: j['expire_le'] == null ? null : DateTime.tryParse(j['expire_le'].toString()),
      );

  final String id;
  final String type;
  final String url;
  final String auteurNom;
  final String etablissementNom;
  final DateTime? expireLe;

  bool get estVideo => type == 'video';

  /// Expirée : ne doit plus s'afficher, le serveur la purge.
  bool get expiree => expireLe != null && !expireLe!.isAfter(DateTime.now());

  /// Prénom de l'auteur, pour le libellé sous le cercle.
  String get prenomAuteur => auteurNom.isEmpty ? '' : auteurNom.split(' ').first;
}

/// La bande ne s'affiche que s'il y a des stories à voir ou
/// un bouton de publication pour la structure. Sans story et
/// sans droit de publication, l'accueil ne change pas.
bool storiesBandeVisible({required bool peutPublier, required List<Story> stories}) =>
    peutPublier || stories.isNotEmpty;

/// Bande des stories en tête de l'accueil, membres connectés
/// seulement. Elle charge ses données elle-même, sans passer
/// par l'état de l'accueil : une story publiée ailleurs
/// apparaît au prochain retour sur l'accueil.
class StoriesStrip extends StatefulWidget {
  const StoriesStrip({super.key, this.client, this.peutPublier});

  /// Client injecté pour les tests, le client global sinon.
  final ApiClient? client;

  /// Droit de publication injecté pour les tests, le rôle du
  /// jeton sinon (administrateur général ou d'établissement).
  final bool? peutPublier;

  @override
  State<StoriesStrip> createState() => _StoriesStripState();
}

class _StoriesStripState extends State<StoriesStrip> {
  List<Story> _stories = [];
  bool _charge = false;

  ApiClient get _client => widget.client ?? api;

  bool get _peutPublier =>
      widget.peutPublier ?? (_client.role == 'admin_general' || _client.role == 'admin_etablissement');

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    try {
      final lignes = await _client.fetchStories();
      if (!mounted) return;
      setState(() {
        _stories = lignes
            .map(Story.fromJson)
            .where((s) => s.id.isNotEmpty && s.url.isNotEmpty && !s.expiree)
            .toList();
        _charge = true;
      });
    } catch (_) {
      // Stories désactivées ou hors ligne : la bande reste
      // cachée, sans erreur visible, comme décidé.
      if (mounted) setState(() => _charge = true);
    }
  }

  // Correctif création directe, 17 nov. 2026 : toucher Publier
  // ouvre directement la page plein écran « Créer une story »,
  // sans la feuille Photo et Vidéo. La page renvoie vrai quand
  // la story est publiée, la bande se recharge alors.
  Future<void> _publier() async {
    if (!_peutPublier) return;
    final publie = await Navigator.of(context).push<bool>(
      MaterialPageRoute(builder: (_) => CreationStoryPage(client: _client)),
    );
    if (publie != true || !mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(tr('Story publiée.'))));
    await _charger();
  }

  Future<void> _ouvrir(int index) async {
    await Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => StoryViewerPage(stories: _stories, index: index, client: _client),
      ),
    );
    if (mounted) await _charger();
  }

  @override
  Widget build(BuildContext context) {
    if (!_charge || !storiesBandeVisible(peutPublier: _peutPublier, stories: _stories)) {
      return const SizedBox.shrink();
    }
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          height: 92,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: _stories.length + (_peutPublier ? 1 : 0),
            separatorBuilder: (_, __) => const SizedBox(width: 12),
            itemBuilder: (context, index) {
              if (_peutPublier && index == 0) {
                return _CerclePublier(onTap: _publier);
              }
              final story = _stories[index - (_peutPublier ? 1 : 0)];
              return _CercleStory(story: story, onTap: () => _ouvrir(_stories.indexOf(story)));
            },
          ),
        ),
        const SizedBox(height: 24),
      ],
    );
  }
}

class _CerclePublier extends StatelessWidget {
  const _CerclePublier({required this.onTap});
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: SizedBox(
        width: 64,
        child: Column(
          children: [
            Container(
              width: 64,
              height: 64,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: _or, width: 2),
                color: _nuit,
              ),
              child: const Icon(Icons.add_outlined, color: _or, size: 30),
            ),
            const SizedBox(height: 6),
            Text(
              tr('Publier'),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(fontSize: 11, color: _grisTexte),
            ),
          ],
        ),
      ),
    );
  }
}

class _CercleStory extends StatelessWidget {
  const _CercleStory({required this.story, required this.onTap});
  final Story story;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: SizedBox(
        width: 64,
        child: Column(
          children: [
            Container(
              width: 64,
              height: 64,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: _or, width: 2),
              ),
              child: ClipOval(
                child: story.estVideo
                    ? Container(
                        color: _nuit,
                        child: const Icon(Icons.play_arrow, color: _or, size: 30),
                      )
                    : CachedNetworkImage(
                        imageUrl: story.url,
                        fit: BoxFit.cover,
                        placeholder: (_, __) => Container(color: _nuit),
                        errorWidget: (_, __, ___) => Container(
                          color: _nuit,
                          child: const Icon(Icons.photo_outlined, color: _or, size: 26),
                        ),
                      ),
              ),
            ),
            const SizedBox(height: 6),
            Text(
              story.prenomAuteur.isEmpty ? tr('Story') : story.prenomAuteur,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(fontSize: 11, color: _grisTexte),
            ),
          ],
        ),
      ),
    );
  }
}

/// Lecteur plein écran : photo 5 secondes, vidéo jusqu'à sa
/// fin, toucher à droite pour avancer, à gauche pour revenir.
/// La suppression est réservée à la structure, le serveur
/// vérifie le périmètre (un administrateur d'établissement ne
/// supprime que ses stories).
class StoryViewerPage extends StatefulWidget {
  const StoryViewerPage({super.key, required this.stories, required this.index, required this.client});
  final List<Story> stories;
  final int index;
  final ApiClient client;

  @override
  State<StoryViewerPage> createState() => _StoryViewerPageState();
}

class _StoryViewerPageState extends State<StoryViewerPage> {
  late final PageController _controleur;
  late int _courant;

  bool get _peutSupprimer =>
      widget.client.role == 'admin_general' || widget.client.role == 'admin_etablissement';

  @override
  void initState() {
    super.initState();
    _courant = widget.index.clamp(0, widget.stories.length - 1);
    _controleur = PageController(initialPage: _courant);
  }

  @override
  void dispose() {
    _controleur.dispose();
    super.dispose();
  }

  void _allerA(int index) {
    if (index < 0 || index >= widget.stories.length) {
      Navigator.of(context).pop();
      return;
    }
    _controleur.animateToPage(index, duration: const Duration(milliseconds: 250), curve: Curves.easeOut);
  }

  Future<void> _supprimer() async {
    final story = widget.stories[_courant];
    final confirmer = await showDialog<bool>(
      context: context,
      builder: (c) => AlertDialog(
        title: Text(tr('Supprimer cette story ?')),
        content: Text(tr('La story disparaîtra pour tous les membres.')),
        actions: [
          TextButton(onPressed: () => Navigator.of(c).pop(false), child: Text(tr('Annuler'))),
          TextButton(onPressed: () => Navigator.of(c).pop(true), child: Text(tr('Supprimer'))),
        ],
      ),
    );
    if (confirmer != true || !mounted) return;
    try {
      await widget.client.supprimerStory(story.id);
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(tr('Story supprimée.'))));
      Navigator.of(context).pop();
    } catch (_) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(tr('Impossible de supprimer la story.'))));
    }
  }

  @override
  Widget build(BuildContext context) {
    final story = widget.stories[_courant];
    return Scaffold(
      backgroundColor: Colors.black,
      body: SafeArea(
        child: Stack(
          children: [
            PageView.builder(
              controller: _controleur,
              itemCount: widget.stories.length,
              onPageChanged: (i) => setState(() => _courant = i),
              itemBuilder: (context, index) => _StoryVue(
                key: ValueKey(widget.stories[index].id),
                story: widget.stories[index],
                onTermine: () => _allerA(index + 1),
              ),
            ),
            // Toucher à gauche pour revenir, à droite pour avancer.
            Row(
              children: [
                Expanded(child: GestureDetector(onTap: () => _allerA(_courant - 1), child: Container(color: Colors.transparent))),
                Expanded(child: GestureDetector(onTap: () => _allerA(_courant + 1), child: Container(color: Colors.transparent))),
              ],
            ),
            Positioned(
              top: 8,
              left: 12,
              right: 12,
              child: Row(
                children: [
                  // Segments de progression : vus, en cours, à venir.
                  Expanded(
                    child: Row(
                      children: [
                        for (var i = 0; i < widget.stories.length; i++) ...[
                          if (i > 0) const SizedBox(width: 4),
                          Expanded(
                            child: Container(
                              height: 3,
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(2),
                                color: i < _courant
                                    ? Colors.white
                                    : i == _courant
                                        ? Colors.white.withValues(alpha: 0.6)
                                        : Colors.white.withValues(alpha: 0.3),
                              ),
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                  const SizedBox(width: 12),
                  if (_peutSupprimer)
                    IconButton(
                      onPressed: _supprimer,
                      icon: const Icon(Icons.delete_outline, color: Colors.white),
                    ),
                  IconButton(
                    onPressed: () => Navigator.of(context).pop(),
                    icon: const Icon(Icons.close, color: Colors.white),
                  ),
                ],
              ),
            ),
            Positioned(
              top: 44,
              left: 16,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    story.prenomAuteur.isEmpty ? tr('Story') : story.prenomAuteur,
                    style: const TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.w700),
                  ),
                  if (story.etablissementNom.isNotEmpty)
                    Text(
                      story.etablissementNom,
                      style: TextStyle(color: Colors.white.withValues(alpha: 0.75), fontSize: 12),
                    ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Une story dans le lecteur : photo 5 secondes, vidéo lue
/// jusqu'à sa fin, puis passage à la suivante.
class _StoryVue extends StatefulWidget {
  const _StoryVue({super.key, required this.story, required this.onTermine});
  final Story story;
  final VoidCallback onTermine;

  @override
  State<_StoryVue> createState() => _StoryVueState();
}

class _StoryVueState extends State<_StoryVue> {
  Timer? _minuteur;
  VideoPlayerController? _controleurVideo;
  bool _erreurVideo = false;

  @override
  void initState() {
    super.initState();
    if (widget.story.estVideo) {
      _controleurVideo = VideoPlayerController.networkUrl(Uri.parse(widget.story.url))
        ..initialize().then((_) {
          if (!mounted) return;
          setState(() {});
          _controleurVideo!.play();
          _controleurVideo!.addListener(_surveillerVideo);
        }).catchError((_) {
          if (mounted) setState(() => _erreurVideo = true);
        });
    } else {
      _minuteur = Timer(dureeStoryPhoto, () {
        if (mounted) widget.onTermine();
      });
    }
  }

  void _surveillerVideo() {
    final controleur = _controleurVideo;
    if (controleur == null || !controleur.value.isInitialized) return;
    if (controleur.value.position >= controleur.value.duration && controleur.value.duration != Duration.zero) {
      controleur.removeListener(_surveillerVideo);
      widget.onTermine();
    }
  }

  @override
  void dispose() {
    _minuteur?.cancel();
    _controleurVideo?.removeListener(_surveillerVideo);
    _controleurVideo?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (widget.story.estVideo) {
      final controleur = _controleurVideo;
      if (_erreurVideo) {
        return const Center(
          child: Icon(Icons.videocam_off_outlined, color: Colors.white54, size: 48),
        );
      }
      if (controleur == null || !controleur.value.isInitialized) {
        return const Center(child: CircularProgressIndicator(color: Colors.white));
      }
      return Center(
        child: AspectRatio(
          aspectRatio: controleur.value.aspectRatio,
          child: VideoPlayer(controleur),
        ),
      );
    }
    return Image.network(
      widget.story.url,
      fit: BoxFit.contain,
      loadingBuilder: (_, enfant, progression) =>
          progression == null ? enfant : const Center(child: CircularProgressIndicator(color: Colors.white)),
      errorBuilder: (_, __, ___) => const Center(
        child: Icon(Icons.broken_image_outlined, color: Colors.white54, size: 48),
      ),
    );
  }
}
