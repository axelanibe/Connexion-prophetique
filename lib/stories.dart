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
import 'temoignages.dart';

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

/// Regroupe les stories par auteur, réécriture 22 nov. 2026 :
/// la bande montre un seul cercle par auteur, jamais deux
/// cercles pour le même auteur. Les stories d'un auteur sont
/// regroupées, la plus récente en premier. Un auteur sans nom
/// ne se regroupe pas avec les autres, chaque story garde son
/// cercle.
List<List<Story>> grouperStoriesParAuteur(List<Story> stories) {
  final groupes = <String, List<Story>>{};
  final ordre = <String>[];
  for (final story in stories) {
    final cle = story.auteurNom.isEmpty ? 'id:${story.id}' : 'nom:${story.auteurNom}';
    final groupe = groupes.putIfAbsent(cle, () {
      ordre.add(cle);
      return <Story>[];
    });
    groupe.add(story);
  }
  return ordre.map((cle) => groupes[cle]!).toList();
}

/// Bande des stories en tête de l'accueil, membres connectés
/// seulement. Elle charge ses données elle-même, sans passer
/// par l'état de l'accueil : une story publiée ailleurs
/// apparaît au prochain retour sur l'accueil.
class StoriesStrip extends StatefulWidget {
  const StoriesStrip({super.key, this.client, this.peutPublier, this.apresPublication});

  /// Client injecté pour les tests, le client global sinon.
  final ApiClient? client;

  /// Droit de publication injecté pour les tests, le rôle du
  /// jeton sinon (administrateur général ou d'établissement).
  final bool? peutPublier;

  /// Rappel après une publication réussie, pour que l'accueil
  /// revienne en haut : sans lui, l'en-tête et la pilule
  /// restaient masquées après le retour, faute d'un nouveau
  /// défilement. La bande ne connaît pas le défilement de
  /// l'accueil, c'est l'accueil qui le lui passe.
  final VoidCallback? apresPublication;

  @override
  State<StoriesStrip> createState() => _StoriesStripState();
}

class _StoriesStripState extends State<StoriesStrip> {
  List<Story> _stories = [];
  bool _charge = false;

  /// Numéro de la recharge en cours : une recharge plus
  /// ancienne qui revient après une plus récente est ignorée,
  /// pour ne jamais écraser la liste avec des données périmées.
  int _generationChargement = 0;

  ApiClient get _client => widget.client ?? api;

  bool get _peutPublier =>
      widget.peutPublier ?? (_client.role == 'admin_general' || _client.role == 'admin_etablissement');

  @override
  void initState() {
    super.initState();
    // Réécriture 22 nov. 2026 : le premier chargement attend la
    // première image de l'accueil. Les stories ne retiennent donc
    // jamais l'affichage de l'accueil, même si la liste est lente.
    WidgetsBinding.instance.addPostFrameCallback((_) => _charger());
  }

  Future<void> _charger() async {
    final generation = ++_generationChargement;
    try {
      final lignes = await _client.fetchStories();
      if (!mounted || generation != _generationChargement) return;
      // Réécriture 22 nov. 2026, expert : chaque story est lue
      // séparément, dans son propre try/catch. Une seule story mal
      // formée est écartée, jamais toute la liste : une story
      // invalide ne rend plus l'application inutilisable.
      final stories = <Story>[];
      final vus = <String>{};
      for (final ligne in lignes) {
        try {
          final story = Story.fromJson(ligne);
          if (story.id.isEmpty || story.url.isEmpty || story.expiree) continue;
          // Même enregistrement renvoyé deux fois : on ne
          // l'affiche qu'une fois.
          if (!vus.add(story.id)) continue;
          stories.add(story);
        } catch (_) {
          continue;
        }
      }
      setState(() {
        _stories = stories;
        _charge = true;
      });
    } catch (_) {
      // Stories désactivées ou hors ligne : la bande reste
      // cachée, sans erreur visible, comme décidé. La liste
      // gardée est l'ancienne, jamais vidée par l'erreur.
      if (mounted && generation == _generationChargement) setState(() => _charge = true);
    }
  }

  // Menu Publier façon Facebook, 21 nov. 2026 : toucher Publier
  // ouvre une feuille du bas avec deux choix, Story ou
  // Témoignage. La story ouvre la page comme avant, le
  // témoignage ouvre le compositeur unique.
  Future<void> _publier() async {
    if (!_peutPublier) return;
    final choix = await showModalBottomSheet<String>(
      context: context,
      builder: (c) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.auto_stories_outlined, color: _nuit),
              title: Text(tr('Story')),
              onTap: () => Navigator.of(c).pop('story'),
            ),
            ListTile(
              leading: const Icon(Icons.ondemand_video_outlined, color: _nuit),
              title: Text(tr('Témoignage')),
              onTap: () => Navigator.of(c).pop('temoignage'),
            ),
          ],
        ),
      ),
    );
    if (choix == null || !mounted) return;
    if (choix == 'temoignage') {
      final publie = await Navigator.of(context).push<bool>(
        MaterialPageRoute(builder: (_) => CreationTemoignagePage(client: _client)),
      );
      if (publie == true && mounted) {
        await _charger();
        widget.apresPublication?.call();
      }
      return;
    }
    final publie = await Navigator.of(context).push<bool>(
      MaterialPageRoute(builder: (_) => CreationStoryPage(client: _client)),
    );
    if (publie != true || !mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(tr('Story publiée.'))));
    await _charger();
    widget.apresPublication?.call();
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
    // Un seul cercle par auteur, réécriture 22 nov. 2026 : les
    // stories d'un même auteur sont regroupées, jamais deux
    // cercles pour le même auteur. Le cercle montre sa story la
    // plus récente, le lecteur s'ouvre dessus et défile ensuite
    // dans toutes les stories.
    final groupes = grouperStoriesParAuteur(_stories);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          height: 92,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: groupes.length + (_peutPublier ? 1 : 0),
            separatorBuilder: (_, __) => const SizedBox(width: 12),
            itemBuilder: (context, index) {
              if (_peutPublier && index == 0) {
                return _CerclePublier(onTap: _publier);
              }
              final groupe = groupes[index - (_peutPublier ? 1 : 0)];
              final story = groupe.first;
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
  Timer? _minuteurInitVideo;
  VideoPlayerController? _controleurVideo;
  bool _erreurVideo = false;

  /// Avance après une vidéo en échec : le lecteur ne reste
  /// jamais bloqué sur l'indicateur, il montre l'erreur puis
  /// passe à la story suivante.
  void _avancerApresErreur() {
    _minuteur?.cancel();
    _minuteur = Timer(const Duration(seconds: 2), () {
      if (mounted) widget.onTermine();
    });
  }

  @override
  void initState() {
    super.initState();
    if (widget.story.estVideo) {
      // Délai d'initialisation, réécriture 22 nov. 2026 : une
      // vidéo dont l'adresse ne répond pas ne bloque jamais le
      // lecteur sur l'indicateur. Passé ce délai, on montre
      // l'erreur et on avance.
      _minuteurInitVideo = Timer(const Duration(seconds: 8), () {
        if (!mounted) return;
        if (_controleurVideo?.value.isInitialized != true) {
          setState(() => _erreurVideo = true);
          _avancerApresErreur();
        }
      });
      _controleurVideo = VideoPlayerController.networkUrl(Uri.parse(widget.story.url))
        ..initialize().then((_) {
          if (!mounted) return;
          _minuteurInitVideo?.cancel();
          setState(() {});
          _controleurVideo!.play();
          _controleurVideo!.addListener(_surveillerVideo);
        }).catchError((_) {
          if (!mounted) return;
          _minuteurInitVideo?.cancel();
          setState(() => _erreurVideo = true);
          _avancerApresErreur();
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
    _minuteurInitVideo?.cancel();
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
    // Adresse absente, réécriture 22 nov. 2026 : on montre
    // l'erreur tout de suite, sans essayer de charger une adresse
    // vide qui ne répondrait jamais.
    if (widget.story.url.isEmpty) {
      return const Center(
        child: Icon(Icons.broken_image_outlined, color: Colors.white54, size: 48),
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
