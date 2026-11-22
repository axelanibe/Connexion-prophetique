// Témoignages, 17 nov. 2026, décision d'Axel : le
// cinquième onglet de la pilule, à la place de la Carte.
// Publication par le membre, modération par le Bureau : un
// témoignage publié est en attente, seuls les témoignages
// approuvés sont visibles dans le fil, l'auteur voit le statut
// des siens, le Bureau voit la file d'attente dans la page même.
// Médias sur R2, même compartiment que les stories, préfixe
// temoignages/, liens signés temporaires du serveur, jamais
// d'adresse brute. Sans clés R2 côté serveur, la page s'affiche
// avec un message clair et la publication est désactivée, sans
// erreur visible. Compositeur unique, 21 nov. 2026 : texte seul,
// photo, vidéo ou audio, un seul média à la fois. Photo 5 Mo au
// plus comme les stories, vidéo 25 Mo et 60 s comme avant, audio
// 10 Mo et 5 minutes au plus, texte 2000 caractères au plus.
// La lecture se fait en plein écran, au toucher, comme les
// stories : le fil ne montre qu'une carte par témoignage.
import 'dart:async';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:image/image.dart' as img;
import 'package:image_picker/image_picker.dart';
import 'package:just_audio/just_audio.dart';
import 'package:video_player/video_player.dart';

import 'api.dart';
import 'creation_story.dart';
import 'i18n.dart';
import 'magnetophone.dart';
import 'main.dart';
import 'presence_culte.dart';
import 'tiroir_intelligent.dart';

// Palette de l'application, mêmes valeurs que HomeWeb.
const _nuit = Color(0xFF0F1C2E);
const _or = Color(0xFFE5C158);
const _grisTexte = Color(0xFF5E687C);

/// Taille maximale d'une vidéo, comme côté serveur.
const tailleMaxVideoTemoignage = 25 * 1024 * 1024;

/// Durée maximale d'une vidéo, vérifiée à la sélection.
const dureeMaxVideoTemoignage = Duration(seconds: 60);

/// Taille maximale d'une photo, comme les stories.
const tailleMaxPhotoTemoignage = 5 * 1024 * 1024;

/// Taille maximale d'un audio, comme côté serveur.
const tailleMaxAudioTemoignage = 10 * 1024 * 1024;

/// Durée maximale d'un audio, vérifiée à la sélection.
const dureeMaxAudioTemoignage = Duration(minutes: 5);

/// Longueur maximale du texte, côté application et serveur.
const longueurMaxTexteTemoignage = 2000;

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
    this.texte = '',
    this.typeMedia = 'video',
    this.auteurNom = '',
    this.etablissementNom = '',
    this.statut = 'en_attente',
    this.creeLe,
  });

  factory Temoignage.fromJson(Map<String, dynamic> j) => Temoignage(
        id: (j['id'] ?? '').toString(),
        url: (j['url'] ?? '').toString(),
        texte: (j['texte'] ?? '').toString(),
        typeMedia: (j['type_media'] ?? 'video').toString(),
        auteurNom: (j['auteur_nom'] ?? '').toString(),
        etablissementNom: (j['etablissement_nom'] ?? '').toString(),
        statut: (j['statut'] ?? 'en_attente').toString(),
        creeLe: j['cree_le'] == null ? null : DateTime.tryParse(j['cree_le'].toString()),
      );

  final String id;
  final String url;
  final String texte;
  final String typeMedia;
  final String auteurNom;
  final String etablissementNom;
  final String statut;
  final DateTime? creeLe;

  bool get approuve => statut == 'approuve';
  bool get enAttente => statut == 'en_attente';
  bool get refuse => statut == 'refuse';
  bool get estPhoto => typeMedia == 'photo';
  bool get estVideo => typeMedia == 'video';
  bool get estAudio => typeMedia == 'audio';
  bool get estTexte => typeMedia == 'texte';

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

  /// Comptes de J'aime du fil public, en lot, un seul appel
  /// pour toute la page.
  Map<String, Map<String, dynamic>> _comptes = {};

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
      final fil = ((data['temoignages'] as List?) ?? [])
          .whereType<Map<String, dynamic>>()
          .map(Temoignage.fromJson)
          .toList();
      setState(() {
        _charge = true;
        _erreur = false;
        _r2 = data['r2'] == true;
        _fil = fil;
        _miens = ((data['mes_temoignages'] as List?) ?? [])
            .whereType<Map<String, dynamic>>()
            .map(Temoignage.fromJson)
            .toList();
        _moderation = ((data['moderation'] as List?) ?? [])
            .whereType<Map<String, dynamic>>()
            .map(Temoignage.fromJson)
            .toList();
        _comptes = {};
      });
      // J'aime et commentaires, 21 nov. 2026, tranche 3 : les
      // comptes du fil public arrivent en lot, un seul appel.
      if (fil.isNotEmpty) {
        try {
          final comptes = await widget.client.fetchComptesAimes('temoignage', fil.map((t) => t.id).toList());
          if (!mounted) return;
          final parId = <String, Map<String, dynamic>>{};
          for (final c in ((comptes['comptes'] as List?) ?? []).whereType<Map<String, dynamic>>()) {
            parId[(c['cible_id'] ?? '').toString()] = c;
          }
          setState(() => _comptes = parId);
        } catch (_) {}
      }
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
    // d'abord : approuver, refuser ou supprimer, sans quitter la
    // page. La suppression par le Bureau est autorisée par le
    // serveur dans son périmètre, comme celle de l'auteur.
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
            IconButton(
              tooltip: tr('Supprimer'),
              onPressed: _actionEnCours ? null : () => _supprimer(t),
              icon: const Icon(Icons.delete_outlined),
            ),
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
      // J'aime et commentaires, 21 nov. 2026, tranche 3 : sous
      // chaque carte du fil public seulement, jamais sous mes
      // témoignages en attente ni sous la file de modération.
      enfants.add(_CarteTemoignage(
        temoignage: t,
        onTap: () => go(context, LecteurTemoignagePage(temoignage: t)),
      ));
      enfants.add(
        Padding(
          padding: const EdgeInsets.only(left: 12, right: 12, bottom: 4),
          child: AimesCommentaires(
            cibleType: 'temoignage',
            cibleId: t.id,
            nombreInitial: (_comptes[t.id]?['nombre'] as num?)?.toInt(),
            aAimeInitial: _comptes[t.id]?['a_aime'] == true,
          ),
        ),
      );
      enfants.add(const SizedBox(height: Cp.s1));
    }
    return basic(tr('Témoignages'), enfants, tabIndex: 4, controller: widget.scrollController, onRefresh: _charger);
  }
}

/// Icône d'une carte selon le type de média du témoignage.
IconData _iconeTypeMedia(String typeMedia) {
  switch (typeMedia) {
    case 'photo':
      return Icons.photo_outlined;
    case 'audio':
      return Icons.mic_outlined;
    case 'texte':
      return Icons.text_fields_outlined;
    default:
      return Icons.ondemand_video_outlined;
  }
}

/// Une carte du fil : icône du média, auteur, établissement et
/// date, extrait du texte quand il y en a, toucher pour lire en
/// plein écran. Le statut s'affiche pour l'auteur et pour le
/// Bureau, jamais dans le fil public.
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
                CircleAvatar(
                  radius: 24,
                  backgroundColor: _nuit,
                  child: Icon(_iconeTypeMedia(t.typeMedia), color: _or, size: 24),
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
                if (t.estVideo || t.estAudio) const Icon(Icons.play_circle_outlined, color: _nuit, size: 28),
              ]),
              if (t.texte.isNotEmpty) ...[
                const SizedBox(height: 8),
                Text(t.texte, maxLines: 3, overflow: TextOverflow.ellipsis),
              ],
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
/// vidéo en lecture automatique, photo affichée, audio avec le
/// lecteur du magnétophone, texte lu sur place. Toucher la vidéo
/// pour mettre en pause ou reprendre, bouton pour revoir à la fin.
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
    if (!widget.temoignage.estVideo) return;
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
    final t = widget.temoignage;
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        foregroundColor: Colors.white,
        title: Text(t.auteurNom.isEmpty ? tr('Témoignage') : t.auteurNom),
      ),
      body: SafeArea(
        child: Center(child: _corps()),
      ),
    );
  }

  Widget _corps() {
    final t = widget.temoignage;
    if (t.estPhoto) {
      return Image.network(
        t.url,
        fit: BoxFit.contain,
        errorBuilder: (_, __, ___) => const Icon(Icons.broken_image_outlined, color: Colors.white54, size: 48),
      );
    }
    if (t.estAudio) {
      return Padding(
        padding: const EdgeInsets.all(24),
        child: LecteurAudio(
          chargerSource: () async => AudioSource.uri(Uri.parse(t.url)),
          duree: Duration.zero,
          couleur: Colors.white,
          couleurTexte: Colors.white70,
        ),
      );
    }
    if (t.estTexte) {
      return SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Text(
          t.texte,
          style: const TextStyle(color: Colors.white, fontSize: 17, height: 1.5),
        ),
      );
    }
    final controleur = _controleur;
    if (_erreur) return const Icon(Icons.videocam_off_outlined, color: Colors.white54, size: 48);
    if (controleur == null || !controleur.value.isInitialized) {
      return const CircularProgressIndicator(color: Colors.white);
    }
    return GestureDetector(
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
    );
  }
}

/// Un média choisi pour le témoignage : un seul à la fois, photo,
/// vidéo ou audio, avec sa durée quand elle est connue.
class _MediaTemoignage {
  const _MediaTemoignage({required this.nom, required this.octets, required this.type, this.duree});

  final String nom;
  final Uint8List octets;
  final String type;
  final Duration? duree;
}

/// Page de publication : un seul compositeur, zone de texte et un
/// seul média au choix, photo ou vidéo dans la galerie, audio par
/// fichier ou par le magnétophone sur téléphone. Le témoignage
/// part en attente de validation par le Bureau, jamais direct
/// dans le fil. Texte seul accepté, sans média.
class CreationTemoignagePage extends StatefulWidget {
  const CreationTemoignagePage({super.key, required this.client, this.surWeb, this.enregistreur});

  final ApiClient client;

  /// Sur le web, injecté pour les tests, kIsWeb sinon.
  final bool? surWeb;

  /// Enregistreur injecté pour les tests, celui du magnétophone sinon.
  final EnregistreurAudio? enregistreur;

  @override
  State<CreationTemoignagePage> createState() => _CreationTemoignagePageState();
}

class _CreationTemoignagePageState extends State<CreationTemoignagePage> {
  final _texteControleur = TextEditingController();
  _MediaTemoignage? _media;
  bool _publicationEnCours = false;
  EnregistreurAudio? _enregistreur;
  Timer? _minuteurAudio;
  Duration _ecouleAudio = Duration.zero;
  bool _enregistrementAudio = false;

  bool get _surWeb => widget.surWeb ?? kIsWeb;

  bool get _peutPublier =>
      !_publicationEnCours && (_texteControleur.text.trim().isNotEmpty || _media != null);

  @override
  void dispose() {
    _texteControleur.dispose();
    _minuteurAudio?.cancel();
    _enregistreur?.liberer();
    super.dispose();
  }

  /// Photo ou vidéo depuis le nom et le type, jamais d'après le
  /// nom seul quand le type est connu.
  String _typeDepuisChoix(String nom, String? mime) {
    final m = (mime ?? '').toLowerCase();
    if (m.startsWith('image/')) return 'photo';
    if (m.startsWith('video/')) return 'video';
    final ext = nom.split('.').last.toLowerCase();
    if (const ['jpg', 'jpeg', 'png', 'webp'].contains(ext)) return 'photo';
    return 'video';
  }

  String _mimeAudioDepuisNom(String nom) {
    switch (nom.split('.').last.toLowerCase()) {
      case 'mp3':
        return 'audio/mpeg';
      case 'ogg':
        return 'audio/ogg';
      case 'wav':
        return 'audio/wav';
      default:
        return 'audio/mp4';
    }
  }

  /// Durée d'une vidéo sur téléphone, null quand elle ne peut pas
  /// être lue : la vidéo est alors acceptée, le serveur ne vérifie
  /// pas la durée.
  Future<Duration?> _dureeVideo(XFile fichier) async {
    final controleur = VideoPlayerController.networkUrl(Uri.file(fichier.path));
    try {
      await controleur.initialize().timeout(const Duration(seconds: 10));
      return controleur.value.duration;
    } catch (_) {
      return null;
    } finally {
      await controleur.dispose();
    }
  }

  /// Durée d'un audio, null quand il ne peut pas être lu : il est
  /// alors refusé, comme un fichier abîmé.
  Future<Duration?> _dureeAudio(Uint8List octets, String mime) async {
    final lecteur = AudioPlayer();
    try {
      await lecteur
          .setAudioSource(AudioSource.uri(Uri.dataFromBytes(octets, mimeType: mime)))
          .timeout(const Duration(seconds: 10));
      return lecteur.duration;
    } catch (_) {
      return null;
    } finally {
      await lecteur.dispose();
    }
  }

  /// Retient un média de galerie, photo compressée comme une story,
  /// vidéo avec sa durée vérifiée sur téléphone seulement.
  Future<void> _retenirMediaGalerie({required String nom, required Uint8List octets, required String type, XFile? fichier}) async {
    if (type == 'photo') {
      if (img.decodeImage(octets) == null) {
        if (mounted) toast(context, tr('Impossible de lire cette photo.'));
        return;
      }
      final compresses = await compresserPhotoStory(octets);
      if (compresses.length > tailleMaxPhotoTemoignage) {
        if (mounted) toast(context, tr('Photo trop volumineuse : 5 Mo au plus.'));
        return;
      }
      if (!mounted) return;
      setState(() => _media = _MediaTemoignage(nom: nom, octets: compresses, type: 'photo'));
      return;
    }
    if (octets.length > tailleMaxVideoTemoignage) {
      if (mounted) toast(context, tr('Vidéo trop volumineuse : 25 Mo au plus.'));
      return;
    }
    Duration? duree;
    if (fichier != null) {
      duree = await _dureeVideo(fichier);
      if (duree != null && duree > dureeMaxVideoTemoignage) {
        if (mounted) toast(context, tr('Vidéo trop longue : 60 secondes au plus.'));
        return;
      }
    }
    if (!mounted) return;
    setState(() => _media = _MediaTemoignage(nom: nom, octets: octets, type: 'video', duree: duree));
  }

  /// Un seul accès galerie : photo ou vidéo selon la sélection,
  /// pickMedia sur téléphone, sélecteur de fichier sur le web.
  Future<void> _choisirGalerie() async {
    try {
      if (_surWeb) {
        final result = await FilePicker.platform.pickFiles(
          type: FileType.custom,
          allowedExtensions: const ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov', 'webm'],
          withData: true,
        );
        if (result == null || result.files.isEmpty) return;
        final fichier = result.files.single;
        final octets = fichier.bytes;
        if (octets == null || !mounted) return;
        await _retenirMediaGalerie(nom: fichier.name, octets: octets, type: _typeDepuisChoix(fichier.name, null));
      } else {
        final picked = await ImagePicker().pickMedia();
        if (picked == null || !mounted) return;
        final octets = await picked.readAsBytes();
        if (!mounted) return;
        await _retenirMediaGalerie(
          nom: picked.name,
          octets: octets,
          type: _typeDepuisChoix(picked.name, picked.mimeType),
          fichier: picked,
        );
      }
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de choisir le média.'));
    }
  }

  /// Audio par sélecteur de fichier, m4a, mp3, ogg ou wav.
  Future<void> _choisirAudio() async {
    try {
      final result = await FilePicker.platform.pickFiles(
        type: FileType.custom,
        allowedExtensions: const ['m4a', 'mp3', 'ogg', 'wav'],
        withData: true,
      );
      if (result == null || result.files.isEmpty) return;
      final fichier = result.files.single;
      final octets = fichier.bytes;
      if (octets == null || !mounted) return;
      if (octets.length > tailleMaxAudioTemoignage) {
        toast(context, tr('Audio trop volumineux : 10 Mo au plus.'));
        return;
      }
      final duree = await _dureeAudio(octets, _mimeAudioDepuisNom(fichier.name));
      if (!mounted) return;
      if (duree == null) {
        toast(context, tr('Impossible de lire cet audio.'));
        return;
      }
      if (duree > dureeMaxAudioTemoignage) {
        toast(context, tr('Audio trop long : 5 minutes au plus.'));
        return;
      }
      setState(() => _media = _MediaTemoignage(nom: fichier.name, octets: octets, type: 'audio', duree: duree));
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de choisir l’audio.'));
    }
  }

  /// Audio par le magnétophone, sur téléphone seulement : le
  /// magnétophone du web enregistre en webm, que le serveur
  /// n'accepte pas en audio. Arrêt automatique à 5 minutes.
  Future<void> _demarrerEnregistrement() async {
    final enregistreur = widget.enregistreur ?? EnregistreurAudioRecord();
    _enregistreur = enregistreur;
    final ok = await enregistreur.demarrer();
    if (!mounted) return;
    if (!ok) {
      toast(context, tr('Autorise le micro pour enregistrer.'));
      _enregistreur = null;
      return;
    }
    _ecouleAudio = Duration.zero;
    _minuteurAudio?.cancel();
    _minuteurAudio = Timer.periodic(const Duration(seconds: 1), (_) {
      if (!mounted) return;
      setState(() => _ecouleAudio += const Duration(seconds: 1));
      if (_ecouleAudio >= dureeMaxAudioTemoignage) _arreterEnregistrement();
    });
    setState(() => _enregistrementAudio = true);
  }

  Future<void> _arreterEnregistrement() async {
    final enregistreur = _enregistreur;
    if (enregistreur == null) return;
    _minuteurAudio?.cancel();
    final son = await enregistreur.arreter();
    _enregistreur = null;
    if (!mounted) return;
    setState(() => _enregistrementAudio = false);
    if (son == null || son.dureeMs < 500) {
      toast(context, tr('Enregistrement trop court, ignoré.'));
      return;
    }
    if (son.octets.length > tailleMaxAudioTemoignage) {
      toast(context, tr('Audio trop volumineux : 10 Mo au plus.'));
      return;
    }
    final duree = Duration(milliseconds: son.dureeMs);
    if (duree > dureeMaxAudioTemoignage) {
      toast(context, tr('Audio trop long : 5 minutes au plus.'));
      return;
    }
    setState(() {
      _media = _MediaTemoignage(nom: '${tr('Enregistrement audio')}.m4a', octets: son.octets, type: 'audio', duree: duree);
    });
  }

  Future<void> _jeterEnregistrement() async {
    final enregistreur = _enregistreur;
    if (enregistreur == null) return;
    _minuteurAudio?.cancel();
    await enregistreur.annuler();
    _enregistreur = null;
    if (!mounted) return;
    setState(() {
      _enregistrementAudio = false;
      _ecouleAudio = Duration.zero;
    });
  }

  Future<void> _publier() async {
    final texte = _texteControleur.text.trim();
    final media = _media;
    if ((texte.isEmpty && media == null) || _publicationEnCours) return;
    setState(() => _publicationEnCours = true);
    try {
      await widget.client.publierTemoignage(
        bytes: media?.octets,
        filename: media?.nom,
        texte: texte.isEmpty ? null : texte,
      );
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
    final media = _media;
    return basic(tr('Publier un témoignage'), [
      Text(tr('Écris ton témoignage, avec une photo, une vidéo ou un audio si tu veux. Il sera visible dans le fil seulement après validation par le Bureau.')),
      const SizedBox(height: Cp.s2),
      TextField(
        controller: _texteControleur,
        maxLines: 8,
        minLines: 4,
        maxLength: longueurMaxTexteTemoignage,
        onChanged: (_) => setState(() {}),
        decoration: InputDecoration(
          hintText: tr('Écris ton témoignage'),
          border: const OutlineInputBorder(),
        ),
      ),
      const SizedBox(height: Cp.s2),
      if (_enregistrementAudio) ...[
        Card(
          color: _nuit,
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(children: [
              Text(
                formaterDureeMagnetophone(_ecouleAudio),
                style: const TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.w800),
              ),
              const SizedBox(height: 12),
              Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                OutlinedButton.icon(
                  onPressed: _jeterEnregistrement,
                  icon: const Icon(Icons.delete_outline),
                  label: Text(tr('Jeter')),
                  style: OutlinedButton.styleFrom(foregroundColor: Colors.white),
                ),
                const SizedBox(width: Cp.s1),
                FilledButton.icon(
                  onPressed: _arreterEnregistrement,
                  icon: const Icon(Icons.stop),
                  label: Text(tr('Arrêter')),
                ),
              ]),
            ]),
          ),
        ),
      ] else ...[
        Row(children: [
          Expanded(
            child: OutlinedButton.icon(
              onPressed: _choisirGalerie,
              icon: const Icon(Icons.photo_library_outlined),
              label: Text(tr('Galerie')),
            ),
          ),
          const SizedBox(width: Cp.s1),
          Expanded(
            child: OutlinedButton.icon(
              onPressed: _choisirAudio,
              icon: const Icon(Icons.audio_file_outlined),
              label: Text(tr('Audio')),
            ),
          ),
          if (!_surWeb) ...[
            const SizedBox(width: Cp.s1),
            Expanded(
              child: OutlinedButton.icon(
                onPressed: _demarrerEnregistrement,
                icon: const Icon(Icons.mic_outlined),
                label: Text(tr('Enregistrer')),
              ),
            ),
          ],
        ]),
      ],
      if (media != null) ...[
        const SizedBox(height: Cp.s2),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
              if (media.type == 'photo')
                ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: Image.memory(media.octets, fit: BoxFit.cover),
                )
              else
                Row(children: [
                  Icon(media.type == 'audio' ? Icons.mic_outlined : Icons.ondemand_video_outlined, color: _nuit, size: 24),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Text(media.nom, maxLines: 1, overflow: TextOverflow.ellipsis),
                      const SizedBox(height: 2),
                      Text(
                        [
                          '${(media.octets.length / 1024 / 1024).toStringAsFixed(1)} Mo',
                          if (media.duree != null) formaterDureeMagnetophone(media.duree!),
                        ].join(' · '),
                        style: const TextStyle(color: _grisTexte),
                      ),
                    ]),
                  ),
                  IconButton(
                    tooltip: tr('Retirer'),
                    onPressed: () => setState(() => _media = null),
                    icon: const Icon(Icons.close_outlined),
                  ),
                ]),
              if (media.type == 'photo')
                Row(mainAxisAlignment: MainAxisAlignment.end, children: [
                  TextButton.icon(
                    onPressed: () => setState(() => _media = null),
                    icon: const Icon(Icons.close_outlined),
                    label: Text(tr('Retirer')),
                  ),
                ]),
            ]),
          ),
        ),
      ],
      const SizedBox(height: Cp.s2),
      SizedBox(
        width: double.infinity,
        height: 52,
        child: FilledButton.icon(
          onPressed: _peutPublier ? _publier : null,
          icon: const Icon(Icons.send_outlined),
          label: Text(_publicationEnCours ? tr('Publication…') : tr('Publier')),
        ),
      ),
    ]);
  }
}
