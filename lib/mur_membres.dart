// Mur des membres, carte 174, refonte totale tranche 2,
// carte 176, 24 nov. 2026 : publications écrites par les
// membres eux-mêmes, visibles par tous, tout en blanc, fond
// blanc, cartes blanches, texte bleu nuit, or seulement en
// petite touche. Compositeur simple, champ + Photo + Publier,
// sans choix de type, texte 2000 caractères au plus, photo
// plafonnée comme la photo de profil. J'aime et commentaires par
// le système générique, cible 'mur', partage par la feuille du
// système. Les sujets de prière restent privés, par e-mail
// seulement, jamais sur le mur. Lecture seule en base : le fil
// ne fait que lire, les écritures partent seulement d'un geste
// du membre, publier, aimer, commenter, supprimer.
//
// Mur v2, tranche 1, 25 nov. 2026 : bannière avec le verset,
// filtres par catégorie, recherche et pagination, 20 par page,
// photo de l'auteur par route batch, page détail, catégorie
// au compositeur, texte obligatoire côté application. La
// prière du mur ne concerne que les sujets généraux, comme
// prions pour une nation, le sujet personnel reste par e-mail.
import 'dart:async';
import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:share_plus/share_plus.dart';
import 'package:video_player/video_player.dart';

import 'api.dart';
import 'i18n.dart';
import 'main.dart';
import 'mur_detail.dart';
import 'mur_enregistrements.dart';
import 'mur_profil.dart';
import 'presence_culte.dart';
import 'tiroir_intelligent.dart';

import 'messagerie_screens.dart' deferred as messagerie;

/// Taille maximale d'une photo décodée, comme la photo de profil.
const tailleMaxPhotoMur = 700 * 1024;

/// Durée maximale d'une vidéo, 60 s, comme les stories.
const dureeMaxVideoMur = Duration(seconds: 60);

/// Taille maximale d'une vidéo, 25 Mo, comme côté serveur.
const tailleMaxVideoMur = 25 * 1024 * 1024;

/// Longueur maximale du texte, comme les témoignages.
const longueurMaxTexteMur = 2000;

/// Catégories d'une publication, dans l'ordre du fil.
const categoriesMur = ['temoignage', 'priere', 'verset', 'encouragement', 'enseignement', 'autre'];

/// Libellé d'une catégorie, dans la langue de l'application.
String libelleCategorieMur(String categorie) {
  switch (categorie) {
    case 'temoignage':
      return tr('Témoignages');
    case 'priere':
      return tr('Prières');
    case 'verset':
      return tr('Versets');
    case 'encouragement':
      return tr('Encouragements');
    case 'enseignement':
      return tr('Enseignements');
    default:
      return tr('Autres');
  }
}

/// Date courte, jour/mois/année, sans dépendance.
String dateCourteMurPublication(DateTime? date) {
  if (date == null) return '';
  return '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}';
}

/// Octets d'une photo en adresse de données, null quand la
/// chaîne est absente ou illisible.
Uint8List? octetsPhotoMur(String? photo) {
  if (photo == null || photo.isEmpty) return null;
  final virgule = photo.indexOf(',');
  if (virgule < 0) return null;
  try {
    return base64Decode(photo.substring(virgule + 1));
  } catch (_) {
    return null;
  }
}

/// Une publication du mur, telle que renvoyée par GET /mur.
class PublicationMur {
  PublicationMur({
    required this.id,
    this.auteurId = '',
    this.auteurNom = '',
    this.etablissementNom = '',
    this.texte = '',
    this.photo,
    this.categorie = 'autre',
    this.statutModeration = 'visible',
    this.videoUrl,
    this.nbJaime = 0,
    this.nbAmen = 0,
    this.nbPriere = 0,
    this.monType,
    this.nbCommentaires = 0,
    this.aime = false,
    this.enregistre = false,
    this.estAuteur = false,
    this.creeLe,
  });

  factory PublicationMur.fromJson(Map<String, dynamic> j) {
    int nombre(Object? v) => v is int ? v : int.tryParse((v ?? '').toString()) ?? 0;
    final video = j['video'] as Map<String, dynamic>?;
    final monType = (j['mon_type'] as String?)?.isEmpty == true ? null : j['mon_type'] as String?;
    return PublicationMur(
      id: (j['id'] ?? '').toString(),
      auteurId: (j['auteur_id'] ?? '').toString(),
      auteurNom: (j['auteur_nom'] ?? '').toString(),
      etablissementNom: (j['etablissement_nom'] ?? '').toString(),
      texte: (j['texte'] ?? '').toString(),
      photo: (j['photo'] as String?)?.isEmpty == true ? null : j['photo'] as String?,
      categorie: (j['categorie'] ?? 'autre').toString(),
      statutModeration: (j['statut_moderation'] ?? 'visible').toString(),
      videoUrl: (video?['url'] as String?)?.isEmpty == true ? null : video?['url'] as String?,
      nbJaime: nombre(j['nb_jaime']),
      nbAmen: nombre(j['nb_amen']),
      nbPriere: nombre(j['nb_priere']),
      monType: monType,
      nbCommentaires: nombre(j['nb_commentaires']),
      aime: j['aime'] == true,
      enregistre: j['enregistre'] == true,
      estAuteur: j['est_auteur'] == true,
      creeLe: j['cree_le'] == null ? null : DateTime.tryParse(j['cree_le'].toString()),
    );
  }

  final String id;
  final String auteurId;
  final String auteurNom;
  final String etablissementNom;
  final String texte;
  final String? photo;
  final String categorie;
  final String statutModeration;
  final String? videoUrl;
  final int nbJaime;
  final int nbAmen;
  final int nbPriere;
  final String? monType;
  final int nbCommentaires;
  final bool aime;
  final bool enregistre;
  final bool estAuteur;
  final DateTime? creeLe;
}

/// Confirmation de suppression d'une publication, partagée
/// par le fil et la page détail.
Future<bool> confirmerSuppressionMur(BuildContext context) async {
  final confirmer = await showDialog<bool>(
    context: context,
    builder: (c) => AlertDialog(
      title: Text(tr('Supprimer cette publication ?')),
      content: Text(tr('La publication disparaîtra pour tous les membres.')),
      actions: [
        TextButton(onPressed: () => Navigator.of(c).pop(false), child: Text(tr('Annuler'))),
        TextButton(onPressed: () => Navigator.of(c).pop(true), child: Text(tr('Supprimer'))),
      ],
    ),
  );
  return confirmer == true;
}

/// Adresse absolue d'une vidéo du mur : le serveur renvoie
/// une adresse relative, même origine, à résoudre contre la
/// base de l'API, comme pour les stories.
String adresseVideoMur(String? url) {
  if (url == null || url.isEmpty) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return '$kApiBaseUrl$url';
}

/// Confirmation de suppression d'une vidéo, partagée par le
/// fil et la page détail.
Future<bool> confirmerSuppressionVideoMur(BuildContext context) async {
  final confirmer = await showDialog<bool>(
    context: context,
    builder: (c) => AlertDialog(
      title: Text(tr('Supprimer cette vidéo ?')),
      content: Text(tr('La vidéo disparaîtra de la publication.')),
      actions: [
        TextButton(onPressed: () => Navigator.of(c).pop(false), child: Text(tr('Annuler'))),
        TextButton(onPressed: () => Navigator.of(c).pop(true), child: Text(tr('Supprimer'))),
      ],
    ),
  );
  return confirmer == true;
}

/// Partage d'une publication par la feuille du système,
/// partagé par le fil et la page détail.
Future<void> partagerPublicationMur(BuildContext context, PublicationMur p) async {
  final texte = p.texte.isNotEmpty
      ? '${p.texte}\n— ${p.auteurNom}, CONNEXION PROPHÉTIQUE'
      : tr('Mur des membres, CONNEXION PROPHÉTIQUE');
  try {
    await SharePlus.instance.share(ShareParams(text: texte));
  } catch (_) {
    if (context.mounted) toast(context, tr('Impossible de partager cet élément.'));
  }
}

/// Page Mur des membres : bannière, compositeur, filtres et
/// fil des publications, les plus récentes d'abord. Le client
/// est injecté pour les tests, le client global sinon.
class MurMembresPage extends StatefulWidget {
  const MurMembresPage({super.key, this.client});

  /// Client injecté pour les tests, le client global sinon.
  final ApiClient? client;

  @override
  State<MurMembresPage> createState() => _MurMembresPageState();
}

class _MurMembresPageState extends State<MurMembresPage> {
  bool _charge = false;
  bool _erreur = false;
  List<PublicationMur> _publications = [];
  String? _suivante;
  bool _chargePlus = false;
  String? _categorie;
  String? _recherche;
  bool _rechercheVisible = false;
  String _categorieChoisie = 'temoignage';
  bool _actionEnCours = false;
  final _texteControleur = TextEditingController();
  final _rechercheControleur = TextEditingController();
  String? _photoDonnees;
  Uint8List? _photoOctets;
  String? _videoNom;
  Uint8List? _videoOctets;

  /// Photos des auteurs, par identifiant de membre, null quand
  /// le membre n'a pas de photo, pour ne pas redemander.
  final _photosAuteurs = <String, String?>{};

  ApiClient get _client => widget.client ?? api;

  @override
  void initState() {
    super.initState();
    // Pastille « Nouveau » : l'ouverture du mur fait
    // disparaître la pastille du tiroir, comme pour les
    // témoignages.
    unawaited(NouveautesVues.instance.marquerVue('mur-membres'));
    unawaited(_charger());
  }

  @override
  void dispose() {
    _texteControleur.dispose();
    _rechercheControleur.dispose();
    super.dispose();
  }

  Future<void> _charger({bool pageSuivante = false}) async {
    if (pageSuivante && (_suivante == null || _chargePlus)) return;
    if (pageSuivante) setState(() => _chargePlus = true);
    try {
      final data = await _client.fetchMur(
        categorie: _categorie,
        recherche: _recherche,
        avant: pageSuivante ? _suivante : null,
      );
      if (!mounted) return;
      final page = ((data['publications'] as List?) ?? [])
          .whereType<Map<String, dynamic>>()
          .map(PublicationMur.fromJson)
          .toList();
      final suivante = data['suivante'] as String?;
      setState(() {
        _charge = true;
        _erreur = false;
        _chargePlus = false;
        _publications = pageSuivante ? [..._publications, ...page] : page;
        _suivante = suivante?.isEmpty == true ? null : suivante;
      });
      unawaited(_chargerPhotosAuteurs());
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _charge = true;
        if (!pageSuivante) _erreur = true;
        _chargePlus = false;
      });
    }
  }

  /// Photos des auteurs de la page, en un seul appel, pour les
  /// auteurs pas encore en cache. Jamais de photo dans les
  /// listes côté serveur, la route batch les donne ici.
  Future<void> _chargerPhotosAuteurs() async {
    final manquants = _publications
        .map((p) => p.auteurId)
        .where((id) => id.isNotEmpty && !_photosAuteurs.containsKey(id))
        .toSet()
        .toList();
    if (manquants.isEmpty) return;
    try {
      final data = await _client.fetchPhotosAuteurs(manquants);
      if (!mounted) return;
      setState(() {
        for (final ligne in ((data['photos'] as List?) ?? []).whereType<Map<String, dynamic>>()) {
          final id = (ligne['membre_id'] ?? '').toString();
          if (id.isNotEmpty) _photosAuteurs[id] = ligne['photo'] as String?;
        }
        for (final id in manquants) {
          _photosAuteurs.putIfAbsent(id, () => null);
        }
      });
    } catch (_) {}
  }

  Future<void> _changerCategorie(String? categorie) async {
    if (_categorie == categorie) return;
    setState(() {
      _categorie = categorie;
      _suivante = null;
    });
    await _charger();
  }

  void _basculerRecherche() {
    setState(() => _rechercheVisible = !_rechercheVisible);
    if (!_rechercheVisible && _recherche != null) unawaited(_lancerRecherche(''));
  }

  Future<void> _lancerRecherche(String valeur) async {
    final q = valeur.trim();
    if (q.isNotEmpty && q.length < 3) {
      if (mounted) toast(context, tr('Saisissez au moins 3 caractères.'));
      return;
    }
    setState(() {
      _recherche = q.isEmpty ? null : q;
      _suivante = null;
    });
    await _charger();
  }

  void _effacerRecherche() {
    _rechercheControleur.clear();
    unawaited(_lancerRecherche(''));
  }

  /// Photo du compositeur, réduite comme la photo de profil,
  /// 800 par 800 au plus, qualité 80, 700 Ko décodés au plus.
  /// Photo et vidéo s'excluent : choisir l'une retire l'autre.
  Future<void> _choisirPhoto() async {
    try {
      final picked = await ImagePicker().pickImage(
        source: ImageSource.gallery,
        maxWidth: 800,
        maxHeight: 800,
        imageQuality: 80,
      );
      if (picked == null || !mounted) return;
      final octets = await picked.readAsBytes();
      if (octets.length > tailleMaxPhotoMur) {
        toast(context, tr('Photo trop volumineuse.'));
        return;
      }
      setState(() {
        _photoOctets = octets;
        _photoDonnees = 'data:image/jpeg;base64,${base64Encode(octets)}';
        _videoNom = null;
        _videoOctets = null;
      });
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de publier.'));
    }
  }

  /// Vidéo du compositeur, 60 s au plus, 25 Mo au plus comme
  /// côté serveur. Photo et vidéo s'excluent : choisir l'une
  /// retire l'autre.
  Future<void> _choisirVideo() async {
    try {
      final picked = await ImagePicker().pickVideo(
        source: ImageSource.gallery,
        maxDuration: dureeMaxVideoMur,
      );
      if (picked == null || !mounted) return;
      final octets = await picked.readAsBytes();
      if (octets.length > tailleMaxVideoMur) {
        toast(context, tr('Vidéo trop volumineuse.'));
        return;
      }
      setState(() {
        _videoNom = picked.name;
        _videoOctets = octets;
        _photoDonnees = null;
        _photoOctets = null;
      });
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de publier.'));
    }
  }

  Future<void> _publier() async {
    final texte = _texteControleur.text.trim();
    if (texte.isEmpty || _actionEnCours) return;
    setState(() => _actionEnCours = true);
    try {
      // La vidéo part après la publication, sur son
      // identifiant : un échec de la vidéo ne retire pas la
      // publication, elle reste sans vidéo.
      final data = await _client.publierMur(texte: texte, photo: _photoDonnees, categorie: _categorieChoisie);
      var videoOk = true;
      if (_videoOctets != null) {
        final cree = data['publication'] as Map<String, dynamic>?;
        final id = (cree?['id'] ?? '').toString();
        if (id.isNotEmpty) {
          try {
            await _client.publierVideoMur(id: id, bytes: _videoOctets!, filename: _videoNom ?? 'video.mp4');
          } catch (_) {
            videoOk = false;
          }
        } else {
          videoOk = false;
        }
      }
      if (!mounted) return;
      setState(() {
        _actionEnCours = false;
        _texteControleur.clear();
        _photoDonnees = null;
        _photoOctets = null;
        _videoNom = null;
        _videoOctets = null;
      });
      await _charger();
      if (mounted) toast(context, videoOk ? tr('Publication publiée.') : tr('Impossible d’envoyer la vidéo.'));
    } catch (_) {
      if (!mounted) return;
      setState(() => _actionEnCours = false);
      toast(context, tr('Impossible de publier.'));
    }
  }

  Future<void> _supprimerVideo(PublicationMur p) async {
    if (!await confirmerSuppressionVideoMur(context) || !mounted) return;
    try {
      await _client.supprimerVideoMur(p.id);
      await _charger();
      if (mounted) toast(context, tr('Vidéo supprimée.'));
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de supprimer la vidéo.'));
    }
  }

  Future<void> _supprimer(PublicationMur p) async {
    if (!await confirmerSuppressionMur(context) || !mounted) return;
    try {
      await _client.supprimerPublicationMur(p.id);
      await _charger();
      if (mounted) toast(context, tr('Publication supprimée.'));
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de supprimer la publication.'));
    }
  }

  Future<void> _ouvrirDetail(PublicationMur p) async {
    await Navigator.of(context).push(MaterialPageRoute(
      builder: (_) => MurDetailPage(publicationId: p.id, publicationInitiale: p, client: _client),
    ));
    if (!mounted) return;
    await _charger();
  }

  Future<void> _ouvrirProfil(PublicationMur p) async {
    if (p.auteurId.isEmpty) return;
    await Navigator.of(context).push(MaterialPageRoute(
      builder: (_) => MurProfilPage(membreId: p.auteurId, client: _client),
    ));
    if (!mounted) return;
    await _charger();
  }

  /// Marque-page : enregistrer ou retirer, puis recharger le
  /// fil pour que l'icône reflète l'état du serveur.
  Future<void> _basculerEnregistrement(PublicationMur p) async {
    try {
      if (p.enregistre) {
        await _client.retirerEnregistrement(p.id);
      } else {
        await _client.enregistrerPublication(p.id);
      }
      await _charger();
    } catch (_) {
      if (mounted) toast(context, tr('Impossible d’enregistrer.'));
    }
  }

  /// Signaler une publication, par la modale réutilisée de la
  /// messagerie : motif, description, destinataire, le contenu
  /// visé est copié au moment du signalement.
  Future<void> _signaler(PublicationMur p) async {
    await messagerie.loadLibrary();
    if (!mounted) return;
    await messagerie.ouvrirFeuilleSignalement(
      context,
      apiClient: _client,
      cibleType: 'mur_publication',
      cibleId: p.id,
      contenuFige: p.texte,
    );
  }

  Future<void> _ouvrirEnregistrements() async {
    await Navigator.of(context).push(MaterialPageRoute(
      builder: (_) => MurEnregistrementsPage(client: _client),
    ));
    if (!mounted) return;
    await _charger();
  }

  @override
  Widget build(BuildContext context) {
    // Tout en blanc, comme la maquette validée : fond blanc,
    // cartes blanches, texte bleu nuit, or en petite touche.
    if (!_charge) {
      return basic(tr('Mur des membres'), const [Center(child: CircularProgressIndicator())], fond: Container(color: Cp.card));
    }
    if (_erreur) {
      return basic(
        tr('Mur des membres'),
        [
          Center(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Text(tr('Impossible de charger le mur.'), textAlign: TextAlign.center),
            ),
          ),
        ],
        fond: Container(color: Cp.card),
        onRefresh: _charger,
      );
    }
    final enfants = <Widget>[
      const _BanniereMur(),
      const SizedBox(height: Cp.s2),
      _CarteCompositeur(
        controleur: _texteControleur,
        photoOctets: _photoOctets,
        videoNom: _videoNom,
        enCours: _actionEnCours,
        categorie: _categorieChoisie,
        onCategorie: (c) => setState(() => _categorieChoisie = c),
        onTexteChange: () => setState(() {}),
        onPhoto: _choisirPhoto,
        onRetirerPhoto: () => setState(() {
          _photoDonnees = null;
          _photoOctets = null;
        }),
        onVideo: _choisirVideo,
        onRetirerVideo: () => setState(() {
          _videoNom = null;
          _videoOctets = null;
        }),
        onPublier: _publier,
      ),
      const SizedBox(height: Cp.s2),
      _FiltresMur(
        categorie: _categorie,
        onCategorie: _changerCategorie,
        onRecherche: _basculerRecherche,
      ),
      if (_rechercheVisible) ...[
        const SizedBox(height: Cp.s1),
        TextField(
          controller: _rechercheControleur,
          decoration: InputDecoration(
            hintText: tr('Rechercher sur le mur…'),
            prefixIcon: const Icon(Icons.search_outlined),
            suffixIcon: IconButton(
              tooltip: tr('Annuler'),
              onPressed: _effacerRecherche,
              icon: const Icon(Icons.close),
            ),
            border: const OutlineInputBorder(),
          ),
          textInputAction: TextInputAction.search,
          onSubmitted: _lancerRecherche,
        ),
      ],
      const SizedBox(height: Cp.s2),
    ];
    if (_publications.isEmpty) {
      enfants.add(EmptyNote(
        icon: Icons.people_outlined,
        text: _recherche != null
            ? tr('Aucun résultat pour cette recherche.')
            : _categorie != null
                ? tr('Aucune publication dans cette catégorie.')
                : tr('Aucune publication pour le moment.'),
      ));
    }
    for (final p in _publications) {
      enfants.add(CartePublicationMur(
        publication: p,
        photoAuteur: _photosAuteurs[p.auteurId],
        onSupprimer: () => _supprimer(p),
        onSupprimerVideo: () => _supprimerVideo(p),
        onPartager: () => partagerPublicationMur(context, p),
        onBasculerEnregistrement: () => _basculerEnregistrement(p),
        onSignaler: () => _signaler(p),
        onOuvrir: () => _ouvrirDetail(p),
        onOuvrirProfil: () => _ouvrirProfil(p),
      ));
      enfants.add(const SizedBox(height: Cp.s1));
    }
    if (_suivante != null) {
      enfants.add(Padding(
        padding: const EdgeInsets.only(top: Cp.s1),
        child: _chargePlus
            ? const Center(child: CircularProgressIndicator())
            : OutlinedButton(
                onPressed: () => _charger(pageSuivante: true),
                child: Text(tr('Afficher plus')),
              ),
      ));
    }
    return basic(
      tr('Mur des membres'),
      enfants,
      fond: Container(color: Cp.card),
      onRefresh: _charger,
      actions: [
        IconButton(
          tooltip: tr('Mes enregistrements'),
          onPressed: _ouvrirEnregistrements,
          icon: const Icon(Icons.bookmark_outlined),
        ),
      ],
    );
  }
}

/// Bannière du mur : le verset de la planche, en italique
/// blanc sur bleu nuit, la référence en or.
class _BanniereMur extends StatelessWidget {
  const _BanniereMur();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(Cp.radiusCard)),
      padding: const EdgeInsets.all(16),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(
          tr('Car là où sont deux ou trois réunis en mon nom, je suis au milieu d’eux.'),
          style: Theme.of(context).textTheme.titleMedium?.copyWith(color: Colors.white, fontStyle: FontStyle.italic),
        ),
        const SizedBox(height: 6),
        Text(
          tr('Matthieu 18:20'),
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Cp.gold, fontWeight: FontWeight.w700),
        ),
      ]),
    );
  }
}

/// Filtres du fil : Tous et les 6 catégories, plus la loupe
/// qui ouvre la recherche.
class _FiltresMur extends StatelessWidget {
  const _FiltresMur({required this.categorie, required this.onCategorie, required this.onRecherche});

  final String? categorie;
  final ValueChanged<String?> onCategorie;
  final VoidCallback onRecherche;

  @override
  Widget build(BuildContext context) {
    final choix = <String?>[null, ...categoriesMur];
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(children: [
        for (final c in choix)
          Padding(
            padding: const EdgeInsets.only(right: 8),
            child: ChoiceChip(
              label: Text(c == null ? tr('Tous') : libelleCategorieMur(c)),
              selected: categorie == c,
              onSelected: (_) => onCategorie(c),
              selectedColor: Cp.navy,
              backgroundColor: Cp.card,
              labelStyle: TextStyle(color: categorie == c ? Colors.white : Cp.ink, fontWeight: FontWeight.w700),
              side: const BorderSide(color: Cp.line),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            ),
          ),
        IconButton(
          tooltip: tr('Rechercher sur le mur…'),
          onPressed: onRecherche,
          icon: const Icon(Icons.search_outlined),
        ),
      ]),
    );
  }
}

/// Compositeur du mur : champ, catégorie, photo, vidéo,
/// Publier. Le texte est obligatoire côté application, la
/// photo et la vidéo restent facultatives et s'excluent. Quand
/// la catégorie est Prières, la note rappelle que le mur ne
/// prend que les sujets généraux.
class _CarteCompositeur extends StatelessWidget {
  const _CarteCompositeur({
    required this.controleur,
    required this.photoOctets,
    required this.videoNom,
    required this.enCours,
    required this.categorie,
    required this.onCategorie,
    required this.onTexteChange,
    required this.onPhoto,
    required this.onRetirerPhoto,
    required this.onVideo,
    required this.onRetirerVideo,
    required this.onPublier,
  });

  final TextEditingController controleur;
  final Uint8List? photoOctets;
  final String? videoNom;
  final bool enCours;
  final String categorie;
  final ValueChanged<String> onCategorie;
  final VoidCallback onTexteChange;
  final VoidCallback onPhoto;
  final VoidCallback onRetirerPhoto;
  final VoidCallback onVideo;
  final VoidCallback onRetirerVideo;
  final VoidCallback onPublier;

  @override
  Widget build(BuildContext context) {
    final peutPublier = !enCours && controleur.text.trim().isNotEmpty;
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
          TextField(
            controller: controleur,
            maxLength: longueurMaxTexteMur,
            maxLines: 5,
            minLines: 1,
            decoration: InputDecoration(
              hintText: tr('Écrire quelque chose…'),
              border: InputBorder.none,
              counterText: '',
            ),
            onChanged: (_) => onTexteChange(),
          ),
          if (photoOctets != null) ...[
            const SizedBox(height: 8),
            Stack(alignment: Alignment.topRight, children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.memory(photoOctets!, height: 160, width: double.infinity, fit: BoxFit.cover),
              ),
              IconButton(
                tooltip: tr('Retirer la photo'),
                onPressed: onRetirerPhoto,
                icon: const Icon(Icons.close),
                style: IconButton.styleFrom(backgroundColor: Colors.white),
              ),
            ]),
          ],
          if (videoNom != null) ...[
            const SizedBox(height: 8),
            Row(children: [
              const Icon(Icons.videocam_outlined),
              const SizedBox(width: 8),
              Expanded(child: Text(videoNom!, maxLines: 1, overflow: TextOverflow.ellipsis)),
              IconButton(
                tooltip: tr('Retirer la vidéo'),
                onPressed: onRetirerVideo,
                icon: const Icon(Icons.close),
              ),
            ]),
          ],
          const SizedBox(height: 8),
          Row(children: [
            Text(tr('Catégorie'), style: Theme.of(context).textTheme.bodyMedium?.copyWith(fontWeight: FontWeight.w700)),
            const SizedBox(width: 8),
            Expanded(
              child: DropdownButton<String>(
                value: categorie,
                isExpanded: true,
                isDense: true,
                items: categoriesMur
                    .map((c) => DropdownMenuItem(value: c, child: Text(libelleCategorieMur(c))))
                    .toList(),
                onChanged: enCours ? null : (v) {
                  if (v != null) onCategorie(v);
                },
              ),
            ),
          ]),
          if (categorie == 'priere') ...[
            const SizedBox(height: 8),
            Text(
              tr('La prière du mur concerne les sujets généraux, comme prions pour une nation. Le sujet personnel reste par e-mail.'),
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted),
            ),
          ],
          const SizedBox(height: 8),
          // Sur petit écran, Publier descend sous Photo et
          // Vidéo au lieu de déborder, comme un humain.
          Wrap(
            spacing: 4,
            runSpacing: 4,
            alignment: WrapAlignment.spaceBetween,
            crossAxisAlignment: WrapCrossAlignment.center,
            children: [
              Row(mainAxisSize: MainAxisSize.min, children: [
                TextButton.icon(
                  onPressed: enCours ? null : onPhoto,
                  icon: const Icon(Icons.photo_outlined),
                  label: Text(tr('Photo')),
                ),
                TextButton.icon(
                  onPressed: enCours ? null : onVideo,
                  icon: const Icon(Icons.videocam_outlined),
                  label: Text(tr('Vidéo')),
                ),
              ]),
              FilledButton(
                onPressed: peutPublier ? onPublier : null,
                child: Text(tr('Publier')),
              ),
            ],
          ),
        ]),
      ),
    );
  }
}

/// Une carte du fil : auteur, établissement, catégorie et
/// date, texte, photo quand il y en a, J'aime, commentaires
/// et partage. Un toucher sur l'en-tête, le texte ou la photo
/// ouvre le détail, les boutons et le champ de commentaire
/// restent hors de la zone tactile, pour ne pas ouvrir le
/// détail quand on aime ou quand on commente.
class CartePublicationMur extends StatelessWidget {
  const CartePublicationMur({
    required this.publication,
    required this.onSupprimer,
    required this.onPartager,
    required this.onBasculerEnregistrement,
    this.photoAuteur,
    this.onOuvrir,
    this.onOuvrirProfil,
    this.onSupprimerVideo,
    this.onSignaler,
  });

  final PublicationMur publication;
  final String? photoAuteur;
  final VoidCallback onSupprimer;
  final VoidCallback onPartager;
  final VoidCallback onBasculerEnregistrement;
  final VoidCallback? onOuvrir;

  /// Toucher sur l'auteur ouvre le profil ; sans lui, le
  /// détail, comme avant.
  final VoidCallback? onOuvrirProfil;
  final VoidCallback? onSupprimerVideo;

  /// Signaler la publication, par la modale réutilisée.
  final VoidCallback? onSignaler;

  @override
  Widget build(BuildContext context) {
    final p = publication;
    final photoOctets = octetsPhotoMur(p.photo);
    final photoAuteurOctets = octetsPhotoMur(photoAuteur);
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
          Row(children: [
            Expanded(
              child: GestureDetector(
                onTap: onOuvrirProfil ?? onOuvrir,
                behavior: HitTestBehavior.opaque,
                child: Row(children: [
                  photoAuteurOctets != null
                      ? CircleAvatar(radius: 20, backgroundImage: MemoryImage(photoAuteurOctets))
                      : const CircleAvatar(
                          radius: 20,
                          backgroundColor: Cp.navy,
                          child: Icon(Icons.person_outlined, color: Cp.gold, size: 22),
                        ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Text(
                        p.auteurNom.isEmpty ? tr('Mur des membres') : p.auteurNom,
                        style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        [p.etablissementNom, libelleCategorieMur(p.categorie), dateCourteMurPublication(p.creeLe)]
                            .where((s) => s.isNotEmpty)
                            .join(' · '),
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted),
                      ),
                    ]),
                  ),
                ]),
              ),
            ),
            if (p.estAuteur)
              IconButton(
                tooltip: tr('Supprimer'),
                onPressed: onSupprimer,
                icon: const Icon(Icons.delete_outlined),
              )
            else if (onSignaler != null)
              PopupMenuButton<String>(
                tooltip: tr('Plus d’options'),
                icon: const Icon(Icons.more_vert),
                onSelected: (_) => onSignaler!(),
                itemBuilder: (_) => [
                  PopupMenuItem(value: 'signaler', child: Text(tr('Signaler'))),
                ],
              ),
          ]),
          GestureDetector(
            onTap: onOuvrir,
            behavior: HitTestBehavior.opaque,
            child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
              if (p.texte.isNotEmpty) ...[
                const SizedBox(height: 8),
                Text(p.texte),
              ],
              if (photoOctets != null) ...[
                const SizedBox(height: 8),
                ClipRRect(
                  borderRadius: BorderRadius.circular(12),
                  child: Image.memory(photoOctets, width: double.infinity, fit: BoxFit.cover),
                ),
              ],
            ]),
          ),
          // La vidéo reste hors de la zone tactile du détail :
          // un toucher sur Lecture ne doit pas ouvrir la page.
          if (p.videoUrl != null) ...[
            const SizedBox(height: 8),
            _LecteurVideoMur(
              url: adresseVideoMur(p.videoUrl),
              onSupprimerVideo: p.estAuteur ? onSupprimerVideo : null,
            ),
          ],
          const SizedBox(height: 4),
          Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Expanded(
              child: AimesCommentaires(
                cibleType: 'mur',
                cibleId: p.id,
                nombreInitial: p.nbJaime,
                aAimeInitial: p.aime,
                types: const ['jaime', 'amen', 'priere'],
                nbJaimeInitial: p.nbJaime,
                nbAmenInitial: p.nbAmen,
                nbPriereInitial: p.nbPriere,
                monTypeInitial: p.monType,
              ),
            ),
            TextButton.icon(
              onPressed: onPartager,
              icon: const Icon(Icons.share_outlined, size: 20, color: Cp.inkMuted),
              label: Text(tr('Partager'), style: const TextStyle(color: Cp.inkMuted, fontWeight: FontWeight.w700)),
              style: TextButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 4)),
            ),
            IconButton(
              tooltip: p.enregistre ? tr('Retirer des enregistrements') : tr('Enregistrer'),
              onPressed: onBasculerEnregistrement,
              icon: Icon(
                p.enregistre ? Icons.bookmark : Icons.bookmark_outlined,
                size: 20,
                color: p.enregistre ? Cp.goldDeep : Cp.inkMuted,
              ),
            ),
          ]),
        ]),
      ),
    );
  }
}

/// Lecteur vidéo paresseux d'une publication, mur v2 tranche 2 :
/// rien n'est chargé tant qu'on ne touche pas Lecture. Minuteur
/// de 8 s comme les stories, pour ne pas rester bloqué sur
/// l'indicateur quand l'adresse ne répond pas. Un toucher sur
/// la vidéo en pause la relance, en lecture la met en pause.
/// La suppression, pour l'auteur seulement, passe par le parent.
class _LecteurVideoMur extends StatefulWidget {
  const _LecteurVideoMur({required this.url, this.onSupprimerVideo});

  final String url;
  final VoidCallback? onSupprimerVideo;

  @override
  State<_LecteurVideoMur> createState() => _LecteurVideoMurState();
}

class _LecteurVideoMurState extends State<_LecteurVideoMur> {
  VideoPlayerController? _controleur;
  Timer? _minuteurInit;
  bool _erreur = false;
  bool _demarre = false;

  @override
  void dispose() {
    _minuteurInit?.cancel();
    _controleur?.removeListener(_surveiller);
    _controleur?.dispose();
    super.dispose();
  }

  void _surveiller() {
    final c = _controleur;
    if (c == null || !c.value.isInitialized) return;
    if (c.value.position >= c.value.duration && c.value.duration != Duration.zero) {
      c.removeListener(_surveiller);
      if (mounted) setState(() {});
    }
  }

  Future<void> _lire() async {
    final c = _controleur;
    if (c != null) {
      if (c.value.isPlaying) {
        c.pause();
      } else {
        c.play();
      }
      setState(() {});
      return;
    }
    setState(() => _demarre = true);
    _minuteurInit = Timer(const Duration(seconds: 8), () {
      if (!mounted) return;
      if (_controleur?.value.isInitialized != true) setState(() => _erreur = true);
    });
    final controleur = VideoPlayerController.networkUrl(Uri.parse(widget.url));
    _controleur = controleur;
    try {
      await controleur.initialize();
      if (!mounted) return;
      _minuteurInit?.cancel();
      setState(() {});
      controleur.play();
      controleur.addListener(_surveiller);
    } catch (_) {
      if (!mounted) return;
      _minuteurInit?.cancel();
      setState(() => _erreur = true);
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = _controleur;
    final initialise = c?.value.isInitialized == true;
    final enLecture = c?.value.isPlaying == true;
    return Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
      ClipRRect(
        borderRadius: BorderRadius.circular(12),
        child: Container(
          color: Colors.black,
          child: AspectRatio(
            aspectRatio: initialise ? c!.value.aspectRatio : 16 / 9,
            child: Stack(alignment: Alignment.center, children: [
              if (initialise) VideoPlayer(c!),
              if (_erreur)
                const Icon(Icons.videocam_off_outlined, color: Colors.white54, size: 48)
              else if (!initialise && _demarre)
                const CircularProgressIndicator(color: Colors.white)
              else
                IconButton(
                  tooltip: tr('Lire la vidéo'),
                  onPressed: _lire,
                  icon: const Icon(Icons.play_circle_filled, color: Colors.white, size: 56),
                ),
              if (initialise)
                Positioned.fill(
                  child: GestureDetector(
                    onTap: _lire,
                    behavior: HitTestBehavior.opaque,
                    child: enLecture
                        ? const SizedBox.shrink()
                        : const Center(child: Icon(Icons.play_circle_filled, color: Colors.white70, size: 56)),
                  ),
                ),
            ]),
          ),
        ),
      ),
      if (widget.onSupprimerVideo != null)
        Align(
          alignment: Alignment.centerRight,
          child: TextButton.icon(
            onPressed: widget.onSupprimerVideo,
            icon: const Icon(Icons.delete_outlined, size: 20),
            label: Text(tr('Supprimer la vidéo')),
          ),
        ),
    ]);
  }
}
