// Nouvelle Connexion, tranche T3, 26 nov. 2026.
// Plein écran : ni en-tête de l'application ni barre du bas,
// la coquille les masque quand cet onglet est actif. Bande
// propre (retour, titre, marque-page, cloche), recherche,
// compositeur blanc, filtres Tous, Témoignages, Prières,
// Versets, fil avec les actualités de la structure épinglées
// en tête, pagination par « Afficher plus ». Texte obligatoire,
// média facultatif, catégorie obligatoire côté application :
// le compositeur part en Témoignage, Verset passe en verset,
// Prière en priere. Vidéo courte, 60 s au plus, comme les
// stories. Mur réservé aux membres : la page ne s'ouvre que
// pour un membre connecté, à la bascule T11.
import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:image_picker/image_picker.dart';
import 'package:share_plus/share_plus.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'carte_publication.dart';
import 'modeles_connexion.dart';
import 'page_decouvrir.dart';
import 'page_detail_connexion.dart';
import 'page_enregistrements.dart';
import 'page_notifications_connexion.dart';
import 'page_profil_connexion.dart';
import 'palette.dart';
import 'veille_reseau.dart';

class PageConnexion extends StatefulWidget {
  const PageConnexion({
    super.key,
    required this.service,
    this.onRetour,
    this.onChoisirMedia,
    this.onChoisirVerset,
    this.filtreInitial,
  });
  final ServiceConnexion service;

  /// Retour vers l'accueil, fourni par la coquille à la bascule.
  final VoidCallback? onRetour;

  /// Filtre initial, T11 : la tuile Témoignages de l'accueil
  /// ouvre Connexion déjà filtrée sur les témoignages.
  final FiltreConnexion? filtreInitial;

  /// Choix d'un média, injecté en test ; par défaut le sélecteur
  /// du téléphone, photo qualité 80, vidéo 60 s au plus.
  final Future<MediaChoisi?> Function(bool estVideo)? onChoisirMedia;

  /// Choix d'un verset dans les données Bible existantes,
  /// injecté en test ; par défaut une feuille de recherche.
  final Future<VersetChoisi?> Function()? onChoisirVerset;

  @override
  State<PageConnexion> createState() => _PageConnexionState();
}

class _PageConnexionState extends State<PageConnexion> {
  final _recherche = TextEditingController();
  final _texte = TextEditingController();
  late FiltreConnexion _filtre;
  CategorieConnexion _categorie = CategorieConnexion.temoignage;

  /// Photos du compositeur, lot 1 Connexion 2.0 : 4 au plus.
  final List<MediaChoisi> _photosCompositeur = [];
  MediaChoisi? _video;
  List<PublicationConnexion> _publications = [];
  List<PublicationConnexion> _epinglees = [];
  Map<String, String> _photos = {};
  String? _suivante;
  bool _chargement = true;
  bool _chargementPlus = false;
  bool _publicationEnCours = false;
  String? _erreur;
  String _rechercheActuelle = '';

  @override
  void initState() {
    super.initState();
    _filtre = widget.filtreInitial ?? FiltreConnexion.tous;
    VeilleReseau.partage.ajouterReprise(_recharger);
    _texte.addListener(_sauverBrouillon);
    _restaurerBrouillon();
    _charger();
  }

  /// Brouillon local, lot 1 Connexion 2.0 : le texte non publié
  /// reste sur l'appareil et revient à la réouverture, jamais
  /// envoyé au serveur. Effacé après la publication.
  void _sauverBrouillon() {
    final texte = _texte.text;
    final categorie = _categorie.code;
    SharedPreferences.getInstance().then((prefs) {
      prefs.setString('brouillon_connexion_texte', texte);
      prefs.setString('brouillon_connexion_categorie', categorie);
    });
  }

  Future<void> _restaurerBrouillon() async {
    final prefs = await SharedPreferences.getInstance();
    final texte = prefs.getString('brouillon_connexion_texte') ?? '';
    if (!mounted || texte.isEmpty) return;
    setState(() {
      _texte.text = texte;
      final categorie = prefs.getString('brouillon_connexion_categorie');
      if (categorie != null) _categorie = CategorieConnexion.depuis(categorie);
    });
  }

  Future<void> _effacerBrouillon() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('brouillon_connexion_texte');
    await prefs.remove('brouillon_connexion_categorie');
  }

  @override
  void dispose() {
    VeilleReseau.partage.retirerReprise(_recharger);
    _texte.removeListener(_sauverBrouillon);
    _recherche.dispose();
    _texte.dispose();
    super.dispose();
  }

  bool get _filtreActualites =>
      _filtre == FiltreConnexion.tous && _rechercheActuelle.isEmpty;

  /// Rechargement à la reprise du réseau, tranche T10 : sans
  /// vider le fil, le contenu déjà affiché reste en place et
  /// se met à jour quand la réponse arrive. Les actualités
  /// viennent du cache local en cas d'échec, par fetchActualites.
  Future<void> _recharger() => _charger(silencieux: true);

  Future<void> _charger({bool silencieux = false}) async {
    final contenuDejaLa = _publications.isNotEmpty || _epinglees.isNotEmpty;
    if (!silencieux || !contenuDejaLa) {
      setState(() {
        _chargement = true;
        _erreur = null;
      });
    }
    try {
      final fil = await widget.service.chargerFil(
        categorie: _filtre.categorie,
        q: _rechercheActuelle.isEmpty ? null : _rechercheActuelle,
      );
      final epinglees = _filtreActualites
          ? await widget.service.chargerActualites()
          : const <PublicationConnexion>[];
      if (!mounted) return;
      setState(() {
        _publications = fil.publications;
        _suivante = fil.suivante;
        _epinglees = epinglees;
        _chargement = false;
        _erreur = null;
      });
      _chargerPhotos(fil.publications);
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _chargement = false;
        // Le fil déjà affiché reste en place, l'écran d'erreur
        // ne sort que quand il n'y a vraiment rien à montrer.
        if (!contenuDejaLa) {
          _erreur = 'Le fil ne peut pas être chargé pour le moment.';
        }
      });
    }
  }

  Future<void> _chargerPhotos(List<PublicationConnexion> liste) async {
    final manquants = liste
        .map((p) => p.auteurId)
        .where((id) => id.isNotEmpty && !_photos.containsKey(id))
        .toSet()
        .toList();
    if (manquants.isEmpty) return;
    try {
      final photos = await widget.service.chargerPhotosAuteurs(manquants);
      if (!mounted || photos.isEmpty) return;
      setState(() => _photos = {..._photos, ...photos});
    } catch (_) {}
  }

  Future<void> _chargerPlus() async {
    final suivante = _suivante;
    if (suivante == null || _chargementPlus) return;
    setState(() => _chargementPlus = true);
    try {
      final page = await widget.service.chargerFil(
        categorie: _filtre.categorie,
        q: _rechercheActuelle.isEmpty ? null : _rechercheActuelle,
        avant: suivante,
      );
      if (!mounted) return;
      setState(() {
        _publications = [..._publications, ...page.publications];
        _suivante = page.suivante;
        _chargementPlus = false;
      });
      _chargerPhotos(page.publications);
    } catch (_) {
      if (!mounted) return;
      setState(() => _chargementPlus = false);
    }
  }

  void _changerFiltre(FiltreConnexion filtre) {
    if (filtre == _filtre) return;
    setState(() => _filtre = filtre);
    _charger();
  }

  void _rechercher(String saisie) {
    final q = saisie.trim();
    if (q.isNotEmpty && q.length < 3) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Saisissez au moins 3 caractères.')),
      );
      return;
    }
    if (q == _rechercheActuelle) return;
    setState(() => _rechercheActuelle = q);
    _charger();
  }

  Future<MediaChoisi?> _choisirMediaParDefaut(bool estVideo) async {
    final picker = ImagePicker();
    if (estVideo) {
      final fichier = await picker.pickVideo(
          source: ImageSource.gallery,
          maxDuration: const Duration(seconds: 60));
      if (fichier == null) return null;
      final bytes = await fichier.readAsBytes();
      return MediaChoisi(bytes: bytes, nom: fichier.name, estVideo: true);
    }
    final fichier =
        await picker.pickImage(source: ImageSource.gallery, imageQuality: 80);
    if (fichier == null) return null;
    final bytes = await fichier.readAsBytes();
    return MediaChoisi(
        bytes: bytes,
        nom: 'photo.jpg',
        estVideo: false,
        dataUrl: MediaChoisi.dataUrlPhoto(bytes));
  }

  Future<VersetChoisi?> _choisirVersetParDefaut() async {
    return showModalBottomSheet<VersetChoisi>(
      context: context,
      isScrollControlled: true,
      builder: (ctx) => _FeuilleVersets(
        onRechercher: (q) => widget.service.rechercherVersets(q),
      ),
    );
  }

  Future<void> _choisirMedia(bool estVideo) async {
    if (estVideo) {
      final media =
          await (widget.onChoisirMedia ?? _choisirMediaParDefaut).call(true);
      if (media == null || !mounted) return;
      setState(() {
        _video = media;
        _photosCompositeur.clear();
      });
      return;
    }
    // Photos multiples, lot 1 Connexion 2.0 : 4 au plus. Le
    // choix injecté en test reste à une seule photo.
    if (widget.onChoisirMedia != null) {
      final media = await widget.onChoisirMedia!.call(false);
      if (media == null || !mounted) return;
      setState(() {
        _video = null;
        if (_photosCompositeur.length < 4) _photosCompositeur.add(media);
      });
      return;
    }
    final picker = ImagePicker();
    final fichiers = await picker.pickMultiImage(imageQuality: 80);
    if (fichiers.isEmpty || !mounted) return;
    final ajouts = <MediaChoisi>[];
    for (final fichier in fichiers) {
      if (_photosCompositeur.length + ajouts.length >= 4) break;
      final bytes = await fichier.readAsBytes();
      ajouts.add(MediaChoisi(
        bytes: bytes,
        nom: 'photo.jpg',
        estVideo: false,
        dataUrl: MediaChoisi.dataUrlPhoto(bytes),
      ));
    }
    if (!mounted) return;
    setState(() {
      _video = null;
      _photosCompositeur.addAll(ajouts);
    });
  }

  Future<void> _choisirVerset() async {
    final verset =
        await (widget.onChoisirVerset ?? _choisirVersetParDefaut).call();
    if (verset == null || !mounted) return;
    setState(() => _categorie = CategorieConnexion.verset);
    final ajout = '« ${verset.texte} » (${verset.reference})';
    _texte.text =
        _texte.text.trim().isEmpty ? ajout : '${_texte.text.trim()}\n$ajout';
  }

  Future<void> _publier() async {
    final texte = _texte.text.trim();
    if (texte.isEmpty || _publicationEnCours) return;
    setState(() => _publicationEnCours = true);
    try {
      var publication = await widget.service.publier(
        texte: texte,
        categorie: _categorie.code,
        photos: _photosCompositeur
            .map((m) => m.dataUrl)
            .whereType<String>()
            .toList(),
      );
      final video = _video;
      if (video != null) {
        publication = await widget.service.publierVideo(
          publication.id,
          bytes: video.bytes,
          filename: video.nom,
        );
      }
      if (!mounted) return;
      setState(() {
        _publications = [publication, ..._publications];
        _texte.clear();
        _photosCompositeur.clear();
        _video = null;
        _categorie = CategorieConnexion.temoignage;
        _publicationEnCours = false;
      });
      _effacerBrouillon();
      _chargerPhotos([publication]);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Publication partagée.')),
      );
    } catch (_) {
      if (!mounted) return;
      setState(() => _publicationEnCours = false);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
            content: Text('La publication n’a pas pu être envoyée.')),
      );
    }
  }

  Future<void> _reagir(PublicationConnexion p, TypeReaction type) async {
    try {
      final compte = p.monType == type.code
          ? await widget.service.retirerReaction(p.id)
          : await widget.service.reagir(p.id, type.code);
      if (!mounted) return;
      setState(() {
        _publications = _publications
            .map((x) => x.id == p.id
                ? x.avecReaction(
                    jaime: compte.nbJaime,
                    amen: compte.nbAmen,
                    priere: compte.nbPriere,
                    monType: compte.monType)
                : x)
            .toList();
      });
    } catch (_) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('La réaction n’a pas pu être envoyée.')),
      );
    }
  }

  Future<void> _basculerEnregistrement(PublicationConnexion p) async {
    try {
      if (p.enregistre) {
        await widget.service.retirerEnregistrement(p.id);
      } else {
        await widget.service.enregistrer(p.id);
      }
      if (!mounted) return;
      setState(() {
        _publications = _publications
            .map((x) => x.id == p.id ? x.avecEnregistrement(!p.enregistre) : x)
            .toList();
      });
    } catch (_) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('L’enregistrement n’a pas pu être fait.')),
      );
    }
  }

  Future<void> _basculerSuivi(PublicationConnexion p) async {
    if (p.auteurId.isEmpty) return;
    try {
      if (p.suiviParMoi) {
        await widget.service.nePlusSuivre(p.auteurId);
      } else {
        await widget.service.suivre(p.auteurId);
      }
      if (!mounted) return;
      setState(() {
        _publications = _publications
            .map((x) =>
                x.auteurId == p.auteurId ? x.avecSuivi(!p.suiviParMoi) : x)
            .toList();
      });
    } catch (_) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Le suivi n’a pas pu être fait.')),
      );
    }
  }

  Future<void> _signaler(PublicationConnexion p) async {
    final motif = await showModalBottomSheet<String>(
      context: context,
      builder: (_) => _FeuilleMotifs(titre: 'Signaler cette publication'),
    );
    if (motif == null || !mounted) return;
    try {
      await widget.service
          .signaler(cibleType: 'mur_publication', cibleId: p.id, motif: motif);
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
            content: Text('Signalement envoyé. La structure va l’examiner.')),
      );
    } catch (_) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Le signalement n’a pas pu être envoyé.')),
      );
    }
  }

  /// Modifier sa publication, lot 1 Connexion 2.0 : auteur
  /// seul, texte et catégorie seulement, jamais les médias.
  Future<void> _modifier(PublicationConnexion p) async {
    final controleur = TextEditingController(text: p.texte);
    var categorie = p.categorieEnum;
    var texteModifie = p.texte;
    final confirmer = await showDialog<bool>(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setDialogState) => AlertDialog(
          title: const Text('Modifier la publication'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: controleur,
                maxLines: null,
                minLines: 3,
                onChanged: (v) => texteModifie = v,
                decoration: const InputDecoration(
                  hintText: 'Texte',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 12),
              Wrap(
                spacing: 8,
                children: [
                  for (final c in CategorieConnexion.values)
                    ChoiceChip(
                      label: Text(c.libelle),
                      selected: categorie == c,
                      onSelected: (_) =>
                          setDialogState(() => categorie = c),
                    ),
                ],
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(ctx).pop(false),
              child: const Text('Annuler'),
            ),
            FilledButton(
              onPressed: () => Navigator.of(ctx).pop(true),
              child: const Text('Enregistrer'),
            ),
          ],
        ),
      ),
    );
    if (confirmer != true || !mounted) return;
    final texte = texteModifie.trim();
    if (texte.isEmpty) return;
    try {
      final modifiee = await widget.service.modifierPublication(
        p.id,
        texte: texte,
        categorie: categorie.code,
      );
      if (!mounted) return;
      setState(() {
        _publications = _publications
            .map((x) => x.id == p.id ? modifiee : x)
            .toList();
      });
    } catch (_) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
            content: Text('La publication n’a pas pu être modifiée.')),
      );
    }
  }

  Future<void> _supprimer(PublicationConnexion p) async {
    final confirmer = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Supprimer cette publication ?'),
        actions: [
          TextButton(
              onPressed: () => Navigator.of(ctx).pop(false),
              child: const Text('Annuler')),
          TextButton(
              onPressed: () => Navigator.of(ctx).pop(true),
              child: const Text('Supprimer')),
        ],
      ),
    );
    if (confirmer != true || !mounted) return;
    try {
      await widget.service.supprimerPublication(p.id);
      if (!mounted) return;
      setState(() =>
          _publications = _publications.where((x) => x.id != p.id).toList());
    } catch (_) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
            content: Text('La publication n’a pas pu être supprimée.')),
      );
    }
  }

  void _ouvrirDetail(PublicationConnexion p) {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => PageDetailConnexion(
          service: widget.service,
          publication: p,
          photoAuteur: _photos[p.auteurId],
          onOuvrirProfil: _ouvrirProfil,
        ),
      ),
    );
  }

  void _ouvrirProfil(String membreId) {
    if (membreId.isEmpty) return;
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => PageProfilConnexion(
          service: widget.service,
          membreId: membreId,
          photosAuteurs: _photos,
          onOuvrirDetail: _ouvrirDetail,
        ),
      ),
    );
  }

  void _ouvrirNotifications() {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => PageNotificationsConnexion(
          service: widget.service,
          onOuvrirPublication: (id) => _ouvrirDetailParId(id),
          onOuvrirProfil: _ouvrirProfil,
        ),
      ),
    );
  }

  Future<void> _ouvrirDetailParId(String id) async {
    try {
      final publication = await widget.service.chargerDetail(id);
      if (!mounted) return;
      _ouvrirDetail(publication);
    } catch (_) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
            content: Text('Cette publication ne peut pas être ouverte.')),
      );
    }
  }

  void _ouvrirDecouvrir() {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => PageDecouvrir(service: widget.service),
      ),
    );
  }

  void _ouvrirEnregistrements() {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => PageEnregistrementsConnexion(
          service: widget.service,
          photosAuteurs: _photos,
          onOuvrirDetail: _ouvrirDetail,
          onOuvrirProfil: _ouvrirProfil,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PaletteNouvelle.papier,
      body: SafeArea(
        bottom: false,
        child: Column(
          children: [
            _Bande(
              onRetour: widget.onRetour,
              onDecouvrir: _ouvrirDecouvrir,
              onNotifications: _ouvrirNotifications,
              onEnregistrements: _ouvrirEnregistrements,
            ),
            _Recherche(
              controleur: _recherche,
              onSoumettre: _rechercher,
              onEffacer: () {
                _recherche.clear();
                _rechercher('');
              },
            ),
            Expanded(
              child: _chargement
                  ? const Center(
                      child: CircularProgressIndicator(
                          color: PaletteNouvelle.bleuNuit))
                  : _erreur != null
                      ? _EtatErreur(message: _erreur!, onReessayer: _charger)
                      : ListView(
                          padding: EdgeInsets.fromLTRB(12, 12, 12, 24 + MediaQuery.paddingOf(context).bottom),
                          children: [
                            _Compositeur(
                              controleur: _texte,
                              categorie: _categorie,
                              onCategorie: (c) =>
                                  setState(() => _categorie = c),
                              onTexteChange: () => setState(() {}),
                              photos: _photosCompositeur,
                              video: _video,
                              onRetirerPhoto: (index) => setState(
                                  () => _photosCompositeur.removeAt(index)),
                              onRetirerMedia: () => setState(() {
                                _video = null;
                              }),
                              onPhoto: () => _choisirMedia(false),
                              onVideo: () => _choisirMedia(true),
                              onVerset: _choisirVerset,
                              onPriere: () => setState(
                                  () => _categorie = CategorieConnexion.priere),
                              enCours: _publicationEnCours,
                              onPublier: _publier,
                            ),
                            const SizedBox(height: 12),
                            _Filtres(
                                filtre: _filtre, onChoisir: _changerFiltre),
                            const SizedBox(height: 12),
                            if (_publications.isEmpty && _epinglees.isEmpty)
                              const Padding(
                                padding: EdgeInsets.symmetric(vertical: 32),
                                child: Center(
                                    child: Text(
                                        'Aucune publication pour le moment.')),
                              ),
                            for (final p in _epinglees) ...[
                              CartePublicationConnexion(publication: p),
                              const SizedBox(height: 12),
                            ],
                            for (final p in _publications) ...[
                              CartePublicationConnexion(
                                publication: p,
                                photoAuteur: _photos[p.auteurId],
                                onAuteur: () => _ouvrirProfil(p.auteurId),
                                onReaction: (t) => _reagir(p, t),
                                onCommentaires: () => _ouvrirDetail(p),
                                onPartager: () => SharePlus.instance
                                    .share(ShareParams(text: p.texte)),
                                onEnregistrer: () => _basculerEnregistrement(p),
                                onSignaler: () => _signaler(p),
                                onModifier: p.estAuteur
                                    ? () => _modifier(p)
                                    : null,
                                onSupprimer: () => _supprimer(p),
                                onSuivre: () => _basculerSuivi(p),
                              ),
                              const SizedBox(height: 12),
                            ],
                            if (_suivante != null)
                              Center(
                                child: _chargementPlus
                                    ? const CircularProgressIndicator(
                                        color: PaletteNouvelle.bleuNuit)
                                    : TextButton(
                                        onPressed: _chargerPlus,
                                        child: const Text('Afficher plus'),
                                      ),
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

/// Bande propre : retour à gauche, cloche à droite, titre
/// Connexion, plus de devise ni de citation.
class _Bande extends StatelessWidget {
  const _Bande(
      {required this.onRetour,
      required this.onDecouvrir,
      required this.onNotifications,
      required this.onEnregistrements});
  final VoidCallback? onRetour;
  final VoidCallback onDecouvrir;
  final VoidCallback onNotifications;
  final VoidCallback onEnregistrements;

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 4),
      child: Row(
        children: [
          IconButton(
            tooltip: 'Retour',
            icon: const Icon(LucideIcons.arrowLeft,
                color: PaletteNouvelle.bleuNuit),
            onPressed: onRetour,
          ),
          const Expanded(
            child: Text(
              'Connexion',
              style: TextStyle(
                  fontFamily: 'Cinzel',
                  color: PaletteNouvelle.bleuNuit,
                  fontSize: 25,
                  fontWeight: FontWeight.w700),
            ),
          ),
          IconButton(
            tooltip: 'Découvrir',
            icon: const Icon(LucideIcons.users,
                color: PaletteNouvelle.bleuNuit),
            onPressed: onDecouvrir,
          ),
          IconButton(
            tooltip: 'Enregistrements',
            icon: const Icon(LucideIcons.bookmark,
                color: PaletteNouvelle.bleuNuit),
            onPressed: onEnregistrements,
          ),
          IconButton(
            tooltip: 'Notifications',
            icon: const Icon(LucideIcons.bell, color: PaletteNouvelle.bleuNuit),
            onPressed: onNotifications,
          ),
        ],
      ),
    );
  }
}

class _Recherche extends StatefulWidget {
  const _Recherche(
      {required this.controleur,
      required this.onSoumettre,
      required this.onEffacer});
  final TextEditingController controleur;
  final ValueChanged<String> onSoumettre;
  final VoidCallback onEffacer;

  @override
  State<_Recherche> createState() => _RechercheState();
}

class _RechercheState extends State<_Recherche> {
  @override
  void initState() {
    super.initState();
    widget.controleur.addListener(_rafraichir);
  }

  @override
  void dispose() {
    widget.controleur.removeListener(_rafraichir);
    super.dispose();
  }

  void _rafraichir() => setState(() {});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.fromLTRB(12, 0, 12, 10),
      child: TextField(
        controller: widget.controleur,
        textInputAction: TextInputAction.search,
        onSubmitted: widget.onSoumettre,
        decoration: InputDecoration(
          hintText: 'Rechercher une publication, un membre…',
          prefixIcon:
              const Icon(LucideIcons.search, color: PaletteNouvelle.orFonce),
          suffixIcon: widget.controleur.text.isEmpty
              ? null
              : IconButton(
                  icon: const Icon(LucideIcons.x), onPressed: widget.onEffacer),
          filled: true,
          fillColor: PaletteNouvelle.papier,
          border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(24),
              borderSide: BorderSide.none),
          contentPadding: const EdgeInsets.symmetric(vertical: 10),
        ),
      ),
    );
  }
}

/// Compositeur blanc : texte obligatoire, média facultatif,
/// catégorie obligatoire côté application.
class _Compositeur extends StatelessWidget {
  const _Compositeur({
    required this.controleur,
    required this.categorie,
    required this.onCategorie,
    required this.onTexteChange,
    required this.photos,
    required this.video,
    required this.onRetirerPhoto,
    required this.onRetirerMedia,
    required this.onPhoto,
    required this.onVideo,
    required this.onVerset,
    required this.onPriere,
    required this.enCours,
    required this.onPublier,
  });
  final TextEditingController controleur;
  final CategorieConnexion categorie;
  final ValueChanged<CategorieConnexion> onCategorie;
  final VoidCallback onTexteChange;

  /// Photos choisies, lot 1 Connexion 2.0 : 4 au plus.
  final List<MediaChoisi> photos;
  final MediaChoisi? video;
  final ValueChanged<int> onRetirerPhoto;
  final VoidCallback onRetirerMedia;
  final VoidCallback onPhoto;
  final VoidCallback onVideo;
  final VoidCallback onVerset;
  final VoidCallback onPriere;
  final bool enCours;
  final VoidCallback onPublier;

  @override
  Widget build(BuildContext context) {
    final texteVide = controleur.text.trim().isEmpty;
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE3E7EE)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Text(
                'Catégorie : ',
                style: TextStyle(color: Colors.grey, fontSize: 13),
              ),
              PopupMenuButton<CategorieConnexion>(
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      categorie.libelle,
                      style: const TextStyle(
                          color: PaletteNouvelle.bleuNuit,
                          fontSize: 13,
                          fontWeight: FontWeight.w800),
                    ),
                    const Icon(Icons.arrow_drop_down,
                        color: PaletteNouvelle.bleuNuit, size: 18),
                  ],
                ),
                onSelected: onCategorie,
                itemBuilder: (_) => [
                  for (final c in CategorieConnexion.values)
                    PopupMenuItem(value: c, child: Text(c.libelle)),
                ],
              ),
            ],
          ),
          TextField(
            controller: controleur,
            maxLines: null,
            minLines: 2,
            // Le bouton Publier se réveille quand le texte
            // n'est plus vide.
            onChanged: (_) => onTexteChange(),
            decoration: const InputDecoration(
              hintText: 'Qu’avez-vous à partager aujourd’hui ?',
              border: InputBorder.none,
            ),
          ),
          for (var i = 0; i < photos.length; i++)
            _ApercuMedia(
                nom: photos.length == 1
                    ? photos[i].nom
                    : 'Photo ${i + 1} sur ${photos.length}',
                estVideo: false,
                onRetirer: () => onRetirerPhoto(i)),
          if (video != null)
            _ApercuMedia(
                nom: video!.nom, estVideo: true, onRetirer: onRetirerMedia),
          if (categorie == CategorieConnexion.priere)
            const Padding(
              padding: EdgeInsets.only(top: 8),
              child: Text(
                'Le sujet de prière personnel reste privé, par e-mail. Ici, les sujets généraux, comme prier pour une nation.',
                style: TextStyle(color: Colors.grey, fontSize: 12),
              ),
            ),
          const SizedBox(height: 4),
          Row(
            children: [
              Expanded(
                child: Wrap(
                  children: [
                    _BoutonMedia(
                        icone: LucideIcons.image,
                        libelle: 'Photo',
                        onTap: onPhoto),
                    _BoutonMedia(
                        icone: LucideIcons.video,
                        libelle: 'Vidéo',
                        onTap: onVideo),
                    _BoutonMedia(
                        icone: LucideIcons.bookOpen,
                        libelle: 'Verset',
                        onTap: onVerset),
                    _BoutonMedia(
                        icone: LucideIcons.flame,
                        libelle: 'Prière',
                        onTap: onPriere),
                  ],
                ),
              ),
              FilledButton(
                key: const ValueKey('boutonPublier'),
                style: FilledButton.styleFrom(
                    backgroundColor: PaletteNouvelle.bleuNuit),
                onPressed: texteVide || enCours ? null : onPublier,
                child: Text(enCours ? 'Envoi…' : 'Publier'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _ApercuMedia extends StatelessWidget {
  const _ApercuMedia(
      {required this.nom, required this.estVideo, required this.onRetirer});
  final String nom;
  final bool estVideo;
  final VoidCallback onRetirer;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 8),
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: PaletteNouvelle.papier,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          Icon(estVideo ? LucideIcons.video : LucideIcons.image,
              color: PaletteNouvelle.bleuNuit, size: 18),
          const SizedBox(width: 8),
          Expanded(
              child: Text(nom, maxLines: 1, overflow: TextOverflow.ellipsis)),
          IconButton(
            tooltip: 'Retirer',
            icon: const Icon(LucideIcons.x, size: 18),
            onPressed: onRetirer,
          ),
        ],
      ),
    );
  }
}

class _BoutonMedia extends StatelessWidget {
  const _BoutonMedia(
      {required this.icone, required this.libelle, required this.onTap});
  final IconData icone;
  final String libelle;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return TextButton.icon(
      style: TextButton.styleFrom(
          padding: const EdgeInsets.symmetric(horizontal: 6)),
      onPressed: onTap,
      icon: Icon(icone, size: 18, color: PaletteNouvelle.bleuNuit),
      label: Text(libelle,
          style:
              const TextStyle(color: PaletteNouvelle.bleuNuit, fontSize: 13)),
    );
  }
}

class _Filtres extends StatelessWidget {
  const _Filtres({required this.filtre, required this.onChoisir});
  final FiltreConnexion filtre;
  final ValueChanged<FiltreConnexion> onChoisir;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: [
        for (final f in FiltreConnexion.values)
          ChoiceChip(
            label: Text(f.libelle),
            selected: filtre == f,
            selectedColor: PaletteNouvelle.bleuNuit,
            labelStyle: TextStyle(
              color: filtre == f ? Colors.white : PaletteNouvelle.bleuNuit,
              fontWeight: FontWeight.w700,
            ),
            onSelected: (_) => onChoisir(f),
          ),
      ],
    );
  }
}

class _EtatErreur extends StatelessWidget {
  const _EtatErreur({required this.message, required this.onReessayer});
  final String message;
  final VoidCallback onReessayer;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(message, textAlign: TextAlign.center),
            const SizedBox(height: 12),
            FilledButton(
              style: FilledButton.styleFrom(
                  backgroundColor: PaletteNouvelle.bleuNuit),
              onPressed: onReessayer,
              child: const Text('Réessayer'),
            ),
          ],
        ),
      ),
    );
  }
}

/// Feuille de choix d'un verset, dans les données Bible
/// existantes : recherche sans accents, 3 caractères au moins.
class _FeuilleVersets extends StatefulWidget {
  const _FeuilleVersets({required this.onRechercher});
  final Future<List<VersetChoisi>> Function(String q) onRechercher;

  @override
  State<_FeuilleVersets> createState() => _FeuilleVersetsState();
}

class _FeuilleVersetsState extends State<_FeuilleVersets> {
  List<VersetChoisi> _resultats = [];
  bool _rechercheEnCours = false;

  Future<void> _rechercher(String q) async {
    final saisie = q.trim();
    if (saisie.length < 3) return;
    setState(() => _rechercheEnCours = true);
    try {
      final resultats = await widget.onRechercher(saisie);
      if (!mounted) return;
      setState(() {
        _resultats = resultats;
        _rechercheEnCours = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() => _rechercheEnCours = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom,
          left: 16,
          right: 16,
          top: 16),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Choisir un verset',
              style: TextStyle(
                  fontSize: 17,
                  fontWeight: FontWeight.w800,
                  color: PaletteNouvelle.bleuNuit)),
          const SizedBox(height: 12),
          TextField(
            autofocus: true,
            textInputAction: TextInputAction.search,
            onSubmitted: _rechercher,
            decoration: const InputDecoration(
              hintText: 'Rechercher un verset…',
              prefixIcon: Icon(LucideIcons.search),
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 8),
          if (_rechercheEnCours)
            const LinearProgressIndicator(color: PaletteNouvelle.bleuNuit),
          ConstrainedBox(
            constraints: const BoxConstraints(maxHeight: 320),
            child: ListView(
              padding: EdgeInsets.zero,
              shrinkWrap: true,
              children: [
                for (final v in _resultats)
                  ListTile(
                    title: Text(v.texte,
                        maxLines: 2, overflow: TextOverflow.ellipsis),
                    subtitle: Text(v.reference),
                    onTap: () => Navigator.of(context).pop(v),
                  ),
              ],
            ),
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }
}

/// Feuille de signalement : un motif, sans masquage immédiat,
/// la structure examine ensuite.
class _FeuilleMotifs extends StatelessWidget {
  const _FeuilleMotifs({required this.titre});
  final String titre;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
            child: Text(titre,
                style: const TextStyle(
                    fontSize: 17,
                    fontWeight: FontWeight.w800,
                    color: PaletteNouvelle.bleuNuit)),
          ),
          for (final (code, libelle) in motifsSignalement)
            ListTile(
              title: Text(libelle),
              onTap: () => Navigator.of(context).pop(code),
            ),
          const SizedBox(height: 8),
        ],
      ),
    );
  }
}
