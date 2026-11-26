// Page Parole vivante, tranche T13, 26 nov. 2026.
// Plein écran comme Connexion : ni en-tête de l'application ni
// barre du bas, la coquille les masque sur cette destination.
// Bande propre avec retour à gauche et titre, trois onglets
// internes Écouter, Explorer, Playlists, mini-lecteur flottant
// au-dessus des onglets, lecteur plein écran par toucher sur le
// mini-lecteur. Le catalogue de la plateforme part vide : les
// titres, orateurs et durées du prototype sont inventés, modèle
// seulement, jamais repris comme contenu réel. Quitter la page
// arrête la lecture, comme dans la maquette.
import 'dart:async';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';

import 'modeles_parole.dart';
import 'page_lecteur_parole.dart';
import 'palette.dart';
import 'service_parole.dart';
import 'veille_reseau.dart';

const _grisFond = Color(0xFFF0F3F7);
const _grisTexte = Color(0xFF5A6577);

enum _OngletParole { ecouter, explorer, playlists }

/// Feuille « Ajouter à une playlist » : les playlists
/// personnelles seulement, les sélections de la structure ne
/// s'éditent pas par les membres. La coche dit si l'audio y est
/// déjà, un toucher l'ajoute ou le retire.
Future<void> feuilleAjoutPlaylistParole(
  BuildContext context,
  ServiceParoleVivante service,
  AudioParoleVivante audio,
) async {
  await showModalBottomSheet<void>(
    context: context,
    backgroundColor: Colors.white,
    shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16))),
    builder: (ctx) => Padding(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Center(
            child: Container(
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: PaletteNouvelle.bleuNuit.withOpacity(0.2),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
          const SizedBox(height: 12),
          Text(
            '${audio.titre} — ${audio.orateur}',
            style: const TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w700,
                color: PaletteNouvelle.bleuNuit),
          ),
          const SizedBox(height: 12),
          for (final playlist in service.playlists)
            ListTile(
              contentPadding: EdgeInsets.zero,
              leading: Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: PaletteNouvelle.bleuNuit,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(Icons.library_music,
                    color: PaletteNouvelle.or, size: 20),
              ),
              title: Text(playlist.titre,
                  style: const TextStyle(
                      fontWeight: FontWeight.w700,
                      color: PaletteNouvelle.bleuNuit)),
              subtitle: Text(
                  '${playlist.audioIds.length} titre${playlist.audioIds.length > 1 ? 's' : ''}'),
              trailing: playlist.audioIds.contains(audio.id)
                  ? Container(
                      width: 24,
                      height: 24,
                      decoration: const BoxDecoration(
                        color: PaletteNouvelle.or,
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.check,
                          color: PaletteNouvelle.bleuNuit, size: 14),
                    )
                  : Container(
                      width: 24,
                      height: 24,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(
                            color: PaletteNouvelle.bleuNuit.withOpacity(0.2),
                            width: 2),
                      ),
                    ),
              onTap: () async {
                await service.basculerDansPlaylist(playlist, audio);
                if (ctx.mounted) Navigator.pop(ctx);
              },
            ),
          ListTile(
            contentPadding: EdgeInsets.zero,
            leading: Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                color: PaletteNouvelle.or,
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Icon(Icons.add,
                  color: PaletteNouvelle.bleuNuit, size: 20),
            ),
            title: const Text('Nouvelle playlist',
                style: TextStyle(
                    fontWeight: FontWeight.w700,
                    color: PaletteNouvelle.bleuNuit)),
            onTap: () {
              Navigator.pop(ctx);
              feuilleCreerPlaylistParole(context, service,
                  premierAudioId: audio.id);
            },
          ),
        ],
      ),
    ),
  );
}

/// Feuille « Nouvelle playlist » : nom obligatoire, description
/// facultative. L'audio qui l'a ouverte y est déjà ajouté.
Future<void> feuilleCreerPlaylistParole(
  BuildContext context,
  ServiceParoleVivante service, {
  String? premierAudioId,
}) async {
  var nom = '';
  var description = '';
  var erreur = '';
  final ok = await showModalBottomSheet<bool>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.white,
    shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16))),
    builder: (ctx) => StatefulBuilder(builder: (ctx, setS) {
      return Padding(
        padding: EdgeInsets.fromLTRB(
            16, 16, 16, MediaQuery.of(ctx).viewInsets.bottom + 16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Nouvelle playlist',
                style: TextStyle(
                    fontSize: 17,
                    fontWeight: FontWeight.w800,
                    color: PaletteNouvelle.bleuNuit)),
            const SizedBox(height: 4),
            const Text('Organisez vos enseignements et chants favoris.',
                style: TextStyle(fontSize: 12, color: _grisTexte)),
            const SizedBox(height: 12),
            TextFormField(
              decoration: InputDecoration(
                labelText: 'Nom',
                filled: true,
                fillColor: _grisFond,
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: BorderSide.none),
              ),
              onChanged: (v) => nom = v,
            ),
            const SizedBox(height: 12),
            TextFormField(
              decoration: InputDecoration(
                labelText: 'Description',
                filled: true,
                fillColor: _grisFond,
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: BorderSide.none),
              ),
              onChanged: (v) => description = v,
            ),
            if (erreur.isNotEmpty)
              Padding(
                padding: const EdgeInsets.only(top: 12),
                child: Text(erreur,
                    style: const TextStyle(color: Colors.red)),
              ),
            const SizedBox(height: 12),
            SizedBox(
              width: double.infinity,
              height: 48,
              child: FilledButton(
                style: FilledButton.styleFrom(
                    backgroundColor: PaletteNouvelle.bleuNuit),
                onPressed: () async {
                  if (nom.trim().isEmpty) {
                    setS(() => erreur = 'Veuillez entrer un nom.');
                    return;
                  }
                  await service.creerPlaylist(nom.trim(),
                      description: description.trim(),
                      premierAudioId: premierAudioId);
                  if (ctx.mounted) Navigator.pop(ctx, true);
                },
                child: const Text('Créer'),
              ),
            ),
          ],
        ),
      );
    }),
  );
  if (ok == true && context.mounted) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Playlist « $nom » créée.')),
    );
  }
}

class PageParoleVivante extends StatefulWidget {
  const PageParoleVivante({
    super.key,
    required this.service,
    this.onRetour,
    this.onChoisirFichiers,
  });
  final ServiceParoleVivante service;

  /// Retour vers l'accueil, fourni par la racine.
  final VoidCallback? onRetour;

  /// Choix de fichiers audio, injecté en test ; par défaut le
  /// sélecteur du téléphone, MP3, M4A, WAV, OGG, AAC et WEBM.
  final Future<List<FichierAudioChoisi>?> Function()? onChoisirFichiers;

  @override
  State<PageParoleVivante> createState() => _PageParoleVivanteState();
}

class _PageParoleVivanteState extends State<PageParoleVivante> {
  final _recherche = TextEditingController();
  var _onglet = _OngletParole.ecouter;
  var _filtre = FiltreParole.tous;
  var _requete = '';
  String? _orateurOuvert;
  var _detailFavoris = false;
  PlaylistParole? _detailPlaylist;
  SelectionAudio? _detailSelection;
  var _catalogueTelechargementsOuvert = false;
  var _chargement = true;
  String? _erreur;
  StreamSubscription<AudioParoleVivante?>? _pisteEcoute;
  StreamSubscription<bool>? _lectureEcoute;

  ServiceParoleVivante get _service => widget.service;

  @override
  void initState() {
    super.initState();
    VeilleReseau.partage.ajouterReprise(_recharger);
    _pisteEcoute = _service.pisteCouranteStream.listen((_) {
      if (mounted) setState(() {});
    });
    _lectureEcoute = _service.enLecture.listen((_) {
      if (mounted) setState(() {});
    });
    _charger();
  }

  @override
  void dispose() {
    VeilleReseau.partage.retirerReprise(_recharger);
    _pisteEcoute?.cancel();
    _lectureEcoute?.cancel();
    _recherche.dispose();
    // Quitter la page arrête la lecture, comme dans la maquette :
    // aucun audio ne joue sans lecteur visible.
    unawaited(_service.arreter());
    super.dispose();
  }

  Future<void> _recharger() => _charger(silencieux: true);

  Future<void> _charger({bool silencieux = false}) async {
    if (!silencieux) {
      setState(() {
        _chargement = true;
        _erreur = null;
      });
    }
    try {
      await _service.charger();
      if (!mounted) return;
      setState(() {
        _chargement = false;
        _erreur = _service.aEchoue ? 'Catalogue indisponible.' : null;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _chargement = false;
        _erreur = 'Catalogue indisponible.';
      });
    }
  }

  void _dire(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  void _allerExplorer(FiltreParole filtre) {
    setState(() {
      _onglet = _OngletParole.explorer;
      _filtre = filtre;
      _orateurOuvert = null;
    });
  }

  void _fermerDetail() {
    setState(() {
      _detailFavoris = false;
      _detailPlaylist = null;
      _detailSelection = null;
    });
  }

  Future<void> _jouer(AudioParoleVivante audio,
      List<AudioParoleVivante> file) async {
    final ok = await _service.jouer(audio, file: file);
    if (!ok && mounted) _dire('Lecture impossible. Vérifiez la connexion.');
  }

  Future<void> _importer() async {
    final fichiers = widget.onChoisirFichiers != null
        ? await widget.onChoisirFichiers!()
        : await _choisirFichiers();
    if (fichiers == null || fichiers.isEmpty) return;
    var ajoutes = 0;
    for (final fichier in fichiers) {
      try {
        await _service.importerFichier(fichier);
        ajoutes++;
      } catch (_) {}
    }
    if (!mounted) return;
    setState(() {});
    _dire(ajoutes > 0
        ? '$ajoutes fichier${ajoutes > 1 ? 's' : ''} audio importé${ajoutes > 1 ? 's' : ''}.'
        : 'Aucun fichier audio valide sélectionné.');
  }

  Future<List<FichierAudioChoisi>?> _choisirFichiers() async {
    final choix = await FilePicker.platform.pickFiles(
      type: FileType.custom,
      allowedExtensions: kExtensionsAudio,
      withData: true,
      allowMultiple: true,
    );
    final fichiers = choix?.files;
    if (fichiers == null) return null;
    final sortis = <FichierAudioChoisi>[];
    for (final f in fichiers) {
      final octets = f.bytes;
      if (octets == null || octets.isEmpty) continue;
      final extension =
          f.extension?.toLowerCase() ?? f.name.split('.').last.toLowerCase();
      if (!kExtensionsAudio.contains(extension)) continue;
      sortis.add(FichierAudioChoisi(
          octets: octets, nom: f.name, extension: extension));
    }
    return sortis;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PaletteNouvelle.papier,
      body: SafeArea(
        child: Column(
          children: [
            _bande(),
            Expanded(
              child: _chargement
                  ? const Center(child: CircularProgressIndicator())
                  : _contenuOnglet(),
            ),
            _miniLecteur(),
            _barreOnglets(),
          ],
        ),
      ),
    );
  }

  Widget _bande() {
    return Container(
      color: PaletteNouvelle.papier,
      padding: const EdgeInsets.fromLTRB(8, 12, 16, 8),
      child: Row(
        children: [
          IconButton(
            icon: const Icon(Icons.chevron_left,
                color: PaletteNouvelle.bleuNuit, size: 28),
            onPressed: widget.onRetour,
          ),
          const Text(
            'Parole vivante',
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.w800,
              color: PaletteNouvelle.bleuNuit,
            ),
          ),
        ],
      ),
    );
  }

  Widget _contenuOnglet() {
    if (_erreur != null && _service.audios.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text('Catalogue indisponible.',
                  style: TextStyle(
                      fontWeight: FontWeight.w700,
                      color: PaletteNouvelle.bleuNuit)),
              const SizedBox(height: 8),
              FilledButton(
                style: FilledButton.styleFrom(
                    backgroundColor: PaletteNouvelle.bleuNuit),
                onPressed: _charger,
                child: const Text('Réessayer'),
              ),
            ],
          ),
        ),
      );
    }
    return switch (_onglet) {
      _OngletParole.ecouter => _vueEcouter(),
      _OngletParole.explorer => _vueExplorer(),
      _OngletParole.playlists => _vuePlaylists(),
    };
  }

  // ── Onglet Écouter ──────────────────────────────────────────

  Widget _vueEcouter() {
    final audios = _service.audios;
    final recents = audiosRecents(audios, 5);
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 4, 20, 16),
      children: [
        if (_service.estAdminGeneral)
          Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: Align(
              alignment: Alignment.centerRight,
              child: FilledButton.icon(
                style: FilledButton.styleFrom(
                    backgroundColor: PaletteNouvelle.bleuNuit),
                icon: const Icon(Icons.add, size: 18),
                label: const Text('Publier un audio'),
                onPressed: () => _feuilleAudio(),
              ),
            ),
          ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text('À la une',
                style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                    color: PaletteNouvelle.bleuNuit)),
            Text('Sélections',
                style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: PaletteNouvelle.or.withOpacity(0.9))),
          ],
        ),
        const SizedBox(height: 12),
        if (audios.isEmpty)
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
            ),
            child: const Text(
              'Aucun audio pour l’instant. La structure publiera ici ses enseignements, podcasts et musiques.',
              style: TextStyle(fontSize: 13, color: _grisTexte),
            ),
          )
        else
          SizedBox(
            height: 168,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: recents.length > 3 ? 3 : recents.length,
              separatorBuilder: (_, __) => const SizedBox(width: 12),
              itemBuilder: (context, index) =>
                  _carteALaUne(recents[index], recents),
            ),
          ),
        const SizedBox(height: 24),
        const Text('Découvrir',
            style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w700,
                color: PaletteNouvelle.bleuNuit)),
        const SizedBox(height: 12),
        GridView.count(
          crossAxisCount: 2,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          childAspectRatio: 1.9,
          children: [
            _tuileDecouvrir(
              Icons.headphones_outlined,
              'Enseignements',
              '${audios.where((a) => a.categorie == 'Enseignement').length} audios',
              () => _allerExplorer(FiltreParole.enseignement),
            ),
            _tuileDecouvrir(
              Icons.mic_outlined,
              'Podcasts',
              '${audios.where((a) => a.categorie == 'Podcast').length} audios',
              () => _allerExplorer(FiltreParole.podcast),
            ),
            _tuileDecouvrir(
              Icons.music_note_outlined,
              'Musique',
              '${audios.where((a) => a.categorie == 'Musique').length} audios',
              () => _allerExplorer(FiltreParole.musique),
            ),
            _tuileDecouvrir(
              Icons.people_outlined,
              'Orateurs',
              '${orateursAudios(audios).length} orateur${orateursAudios(audios).length > 1 ? 's' : ''}',
              () => _allerExplorer(FiltreParole.orateurs),
            ),
          ],
        ),
        const SizedBox(height: 24),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text('Ajouts récents',
                style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                    color: PaletteNouvelle.bleuNuit)),
            TextButton(
              onPressed: () => _allerExplorer(FiltreParole.tous),
              child: const Text('Tout voir',
                  style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                      color: PaletteNouvelle.or)),
            ),
          ],
        ),
        const SizedBox(height: 8),
        if (recents.isEmpty)
          const Text('Aucun ajout récent.',
              style: TextStyle(fontSize: 13, color: _grisTexte))
        else
          for (final audio in recents)
            Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: _carteAudio(audio, recents),
            ),
      ],
    );
  }

  Widget _carteALaUne(
      AudioParoleVivante audio, List<AudioParoleVivante> file) {
    return GestureDetector(
      onTap: () => _jouer(audio, file),
      child: Container(
        width: 265,
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: PaletteNouvelle.bleuNuit,
          borderRadius: BorderRadius.circular(24),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding:
                  const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: PaletteNouvelle.or,
                borderRadius: BorderRadius.circular(999),
              ),
              child: Text(
                audio.categorie.toUpperCase(),
                style: const TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.w800,
                    color: PaletteNouvelle.bleuNuit),
              ),
            ),
            const SizedBox(height: 12),
            Text(
              audio.titre,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w800,
                  color: Colors.white,
                  height: 1.2),
            ),
            const SizedBox(height: 4),
            Text(
              '${audio.orateur}${audio.dureeTexte == null ? '' : ' • ${audio.dureeTexte}'}',
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                  fontSize: 12, color: Colors.white.withOpacity(0.75)),
            ),
            const Spacer(),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Flexible(
                  child: Text('Écouter maintenant',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: PaletteNouvelle.or)),
                ),
                const SizedBox(width: 8),
                Container(
                  width: 32,
                  height: 32,
                  decoration: const BoxDecoration(
                    color: PaletteNouvelle.or,
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.play_arrow,
                      color: PaletteNouvelle.bleuNuit, size: 18),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _tuileDecouvrir(
      IconData icone, String titre, String compte, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: PaletteNouvelle.bleuNuit,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.1),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(icone, color: PaletteNouvelle.or, size: 20),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(titre,
                    style: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w700,
                        color: Colors.white)),
                Text(compte,
                    style: TextStyle(
                        fontSize: 11, color: Colors.white.withOpacity(0.6))),
              ],
            ),
          ],
        ),
      ),
    );
  }

  // ── Onglet Explorer ─────────────────────────────────────────

  Widget _vueExplorer() {
    final tous = _service.tousLesAudios;
    final orateur = _orateurOuvert;
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(20, 4, 20, 12),
          child: Column(
            children: [
              TextField(
                controller: _recherche,
                onChanged: (v) => setState(() => _requete = v),
                decoration: InputDecoration(
                  hintText: 'Rechercher un titre, un orateur, un thème…',
                  prefixIcon: const Icon(Icons.search, color: _grisTexte),
                  suffixIcon: _requete.isEmpty
                      ? null
                      : IconButton(
                          icon: const Icon(Icons.close, color: _grisTexte),
                          onPressed: () {
                            _recherche.clear();
                            setState(() => _requete = '');
                          },
                        ),
                  filled: true,
                  fillColor: Colors.white,
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(16),
                      borderSide: BorderSide.none),
                ),
              ),
              const SizedBox(height: 12),
              SizedBox(
                height: 32,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  children: [
                    for (final filtre in FiltreParole.values)
                      Padding(
                        padding: const EdgeInsets.only(right: 8),
                        child: ChoiceChip(
                          label: Text(filtre.libelle),
                          selected: _filtre == filtre && orateur == null,
                          selectedColor: PaletteNouvelle.or,
                          backgroundColor: Colors.white,
                          labelStyle: TextStyle(
                            fontSize: 12,
                            fontWeight: _filtre == filtre && orateur == null
                                ? FontWeight.w700
                                : FontWeight.w600,
                            color: _filtre == filtre && orateur == null
                                ? PaletteNouvelle.bleuNuit
                                : _grisTexte,
                          ),
                          onSelected: (_) => setState(() {
                            _filtre = filtre;
                            _orateurOuvert = null;
                          }),
                        ),
                      ),
                  ],
                ),
              ),
            ],
          ),
        ),
        Expanded(
          child: orateur != null
              ? _ficheOrateur(orateur)
              : _filtre == FiltreParole.orateurs
                  ? _grilleOrateurs()
                  : _listeExplorer(tous),
        ),
      ],
    );
  }

  Widget _listeExplorer(List<AudioParoleVivante> tous) {
    final filtres = filtrerAudios(tous,
        requete: _requete, filtre: _filtre);
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 0, 20, 16),
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              _filtre == FiltreParole.tous
                  ? 'Catalogue complet'
                  : _filtre.libelle,
              style: const TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  color: _grisTexte),
            ),
            Text('${filtres.length} titre${filtres.length > 1 ? 's' : ''}',
                style: const TextStyle(fontSize: 12, color: _grisTexte)),
          ],
        ),
        const SizedBox(height: 12),
        if (filtres.isEmpty)
          const Padding(
            padding: EdgeInsets.only(top: 32),
            child: Center(
              child: Column(
                children: [
                  Text('Aucun audio trouvé',
                      style: TextStyle(
                          fontWeight: FontWeight.w700,
                          color: PaletteNouvelle.bleuNuit)),
                  SizedBox(height: 4),
                  Text('Modifiez votre recherche ou changez de filtre.',
                      style: TextStyle(fontSize: 12, color: _grisTexte)),
                ],
              ),
            ),
          )
        else
          for (final audio in filtres)
            Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: _carteAudio(audio, filtres),
            ),
      ],
    );
  }

  Widget _grilleOrateurs() {
    final orateurs = orateursAudios(_service.audios);
    if (orateurs.isEmpty) {
      return const Center(
        child: Text('Aucun orateur pour l’instant.',
            style: TextStyle(fontSize: 13, color: _grisTexte)),
      );
    }
    return GridView.count(
      crossAxisCount: 2,
      padding: const EdgeInsets.fromLTRB(20, 0, 20, 16),
      mainAxisSpacing: 12,
      crossAxisSpacing: 12,
      childAspectRatio: 0.85,
      children: [
        for (final entree in orateurs.entries)
          _carteOrateur(entree.key, entree.value),
      ],
    );
  }

  Widget _carteOrateur(String nom, int nombre) {
    final initiales = nom
        .split(' ')
        .where((m) => m.isNotEmpty)
        .map((m) => m[0])
        .take(2)
        .join();
    return GestureDetector(
      onTap: () => setState(() => _orateurOuvert = nom),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(24),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 64,
              height: 64,
              decoration: BoxDecoration(
                color: PaletteNouvelle.bleuNuit,
                shape: BoxShape.circle,
                border: Border.all(color: PaletteNouvelle.or, width: 2),
              ),
              alignment: Alignment.center,
              child: Text(initiales,
                  style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w800,
                      color: PaletteNouvelle.or)),
            ),
            const SizedBox(height: 12),
            Text(nom,
                textAlign: TextAlign.center,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w800,
                    color: PaletteNouvelle.bleuNuit)),
            const SizedBox(height: 4),
            Container(
              padding:
                  const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: _grisFond,
                borderRadius: BorderRadius.circular(999),
              ),
              child: Text('$nombre audio${nombre > 1 ? 's' : ''}',
                  style: const TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                      color: PaletteNouvelle.bleuNuit)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _ficheOrateur(String nom) {
    final audios = audiosOrateur(_service.audios, nom);
    final initiales = nom
        .split(' ')
        .where((m) => m.isNotEmpty)
        .map((m) => m[0])
        .take(2)
        .join();
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 0, 20, 16),
      children: [
        Align(
          alignment: Alignment.centerLeft,
          child: TextButton.icon(
            onPressed: () => setState(() => _orateurOuvert = null),
            icon: const Icon(Icons.arrow_back, size: 16),
            label: const Text('Tous les orateurs'),
            style: TextButton.styleFrom(
                foregroundColor: PaletteNouvelle.bleuNuit),
          ),
        ),
        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: PaletteNouvelle.bleuNuit,
            borderRadius: BorderRadius.circular(24),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    width: 64,
                    height: 64,
                    decoration: const BoxDecoration(
                      color: PaletteNouvelle.or,
                      shape: BoxShape.circle,
                    ),
                    alignment: Alignment.center,
                    child: Text(initiales,
                        style: const TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.w800,
                            color: PaletteNouvelle.bleuNuit)),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('ORATEUR',
                            style: TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.w800,
                                color: PaletteNouvelle.or)),
                        Text(nom,
                            style: const TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.w800,
                                color: Colors.white)),
                        Text(
                            '${audios.length} enseignement${audios.length > 1 ? 's' : ''} disponible${audios.length > 1 ? 's' : ''}',
                            style: TextStyle(
                                fontSize: 12,
                                color: Colors.white.withOpacity(0.7))),
                      ],
                    ),
                  ),
                ],
              ),
              if (audios.isNotEmpty) ...[
                const SizedBox(height: 16),
                SizedBox(
                  width: double.infinity,
                  height: 44,
                  child: FilledButton.icon(
                    style: FilledButton.styleFrom(
                        backgroundColor: PaletteNouvelle.or),
                    icon: const Icon(Icons.play_arrow,
                        color: PaletteNouvelle.bleuNuit),
                    label: const Text('Tout écouter',
                        style: TextStyle(
                            fontWeight: FontWeight.w800,
                            color: PaletteNouvelle.bleuNuit)),
                    onPressed: () => _jouer(audios.first, audios),
                  ),
                ),
              ],
            ],
          ),
        ),
        const SizedBox(height: 16),
        const Text('Ses messages & audios',
            style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w700,
                color: PaletteNouvelle.bleuNuit)),
        const SizedBox(height: 8),
        for (final audio in audios)
          Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: _carteAudio(audio, audios),
          ),
      ],
    );
  }

  // ── Onglet Playlists ────────────────────────────────────────

  Widget _vuePlaylists() {
    if (_detailFavoris || _detailPlaylist != null || _detailSelection != null) {
      return _vueDetailPlaylist();
    }
    final favoris = _service.favoris;
    final telecharges = _service.telecharges;
    final tailleTelecharges =
        telecharges.fold<int>(0, (s, a) => s + (a.tailleOctets ?? 0));
    final locaux = _service.locaux;
    final personnelles = _service.playlists;
    final selections = _service.selections;
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 4, 20, 16),
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text('Ma Bibliothèque',
                style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w800,
                    color: PaletteNouvelle.or)),
            if (_service.estAdminGeneral)
              TextButton(
                onPressed: () => _feuilleSelection(),
                child: const Text('Nouvelle sélection',
                    style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w700,
                        color: PaletteNouvelle.bleuNuit)),
              ),
          ],
        ),
        const SizedBox(height: 8),
        GestureDetector(
          onTap: () => setState(() => _detailFavoris = true),
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(24),
            ),
            child: Row(
              children: [
                Container(
                  width: 56,
                  height: 56,
                  decoration: BoxDecoration(
                    color: PaletteNouvelle.bleuNuit,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: const Icon(Icons.favorite,
                      color: PaletteNouvelle.or, size: 28),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('COLLECTION PERSONNELLE',
                          style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.w800,
                              color: PaletteNouvelle.or)),
                      const Text('Favoris & Coups de cœur',
                          style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w800,
                              color: PaletteNouvelle.bleuNuit)),
                      Text(
                          '${favoris.length} titre${favoris.length > 1 ? 's' : ''} enregistré${favoris.length > 1 ? 's' : ''}',
                          style:
                              const TextStyle(fontSize: 12, color: _grisTexte)),
                    ],
                  ),
                ),
                const Icon(Icons.chevron_right, color: _grisTexte),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        _blocTelechargements(telecharges, tailleTelecharges),
        const SizedBox(height: 16),
        _blocLocaux(locaux),
        const SizedBox(height: 24),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text('Mes playlists',
                style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                    color: PaletteNouvelle.bleuNuit)),
            Text(
                '${personnelles.length} playlist${personnelles.length > 1 ? 's' : ''}',
                style: const TextStyle(fontSize: 12, color: _grisTexte)),
          ],
        ),
        const SizedBox(height: 12),
        if (personnelles.isEmpty)
          const Text('Aucune playlist. Créez-en une avec le bouton Nouvelle.',
              style: TextStyle(fontSize: 13, color: _grisTexte))
        else
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            mainAxisSpacing: 12,
            crossAxisSpacing: 12,
            childAspectRatio: 1.35,
            children: [
              for (final playlist in personnelles)
                _cartePlaylistPersonnelle(playlist),
            ],
          ),
        const SizedBox(height: 24),
        const Text('Sélections Connexion Prophétique',
            style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w700,
                color: PaletteNouvelle.bleuNuit)),
        const SizedBox(height: 12),
        if (selections.isEmpty)
          const Text('Aucune sélection pour l’instant.',
              style: TextStyle(fontSize: 13, color: _grisTexte))
        else
          for (final selection in selections)
            Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: _carteSelection(selection),
            ),
      ],
    );
  }

  Widget _blocTelechargements(
      List<AudioParoleVivante> telecharges, int tailleOctets) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
      ),
      child: Column(
        children: [
          Row(
            children: [
              Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  color: PaletteNouvelle.bleuNuit,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(Icons.download,
                    color: PaletteNouvelle.or, size: 18),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Téléchargements hors ligne',
                        style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w800,
                            color: PaletteNouvelle.bleuNuit)),
                    Text(
                        '${telecharges.length} audio${telecharges.length > 1 ? 's' : ''} hors ligne • ${formaterTailleMo(tailleOctets)}',
                        style:
                            const TextStyle(fontSize: 11, color: _grisTexte)),
                  ],
                ),
              ),
              TextButton(
                onPressed: () => setState(() =>
                    _catalogueTelechargementsOuvert =
                        !_catalogueTelechargementsOuvert),
                child: Text(_catalogueTelechargementsOuvert
                    ? 'Fermer'
                    : 'Gérer'),
              ),
            ],
          ),
          const SizedBox(height: 8),
          if (telecharges.isEmpty)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: _grisFond,
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Text(
                  'Aucun audio enregistré hors ligne pour l’instant.',
                  style: TextStyle(fontSize: 12, color: _grisTexte)),
            )
          else
            for (final audio in telecharges)
              _ligneTelechargee(audio),
          if (_catalogueTelechargementsOuvert) ...[
            const Divider(height: 24),
            const Align(
              alignment: Alignment.centerLeft,
              child: Text('CATALOGUE DE LA PLATEFORME',
                  style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w700,
                      color: _grisTexte)),
            ),
            const SizedBox(height: 8),
            if (_service.audios.isEmpty)
              const Text('Aucun audio à télécharger.',
                  style: TextStyle(fontSize: 12, color: _grisTexte))
            else
              for (final audio in _service.audios)
                _ligneCatalogueTelechargement(audio),
          ],
        ],
      ),
    );
  }

  Widget _ligneTelechargee(AudioParoleVivante audio) {
    return GestureDetector(
      onTap: () => _jouer(audio, _service.telecharges),
      child: Container(
        padding: const EdgeInsets.all(10),
        margin: const EdgeInsets.only(bottom: 8),
        decoration: BoxDecoration(
          color: _grisFond,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: PaletteNouvelle.bleuNuit,
                          borderRadius: BorderRadius.circular(999),
                        ),
                        child: const Text('HORS LIGNE',
                            style: TextStyle(
                                fontSize: 9,
                                fontWeight: FontWeight.w800,
                                color: PaletteNouvelle.or)),
                      ),
                      const SizedBox(width: 6),
                      Text(
                          '${audio.tailleOctets == null ? '' : '${formaterTailleMo(audio.tailleOctets!)} • '}${audio.dureeTexte ?? ''}',
                          style:
                              const TextStyle(fontSize: 10, color: _grisTexte)),
                    ],
                  ),
                  const SizedBox(height: 2),
                  Text(audio.titre,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w700,
                          color: PaletteNouvelle.bleuNuit)),
                  Text(audio.orateur,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style:
                          const TextStyle(fontSize: 11, color: _grisTexte)),
                ],
              ),
            ),
            IconButton(
              icon: const Icon(Icons.delete_outline, color: _grisTexte),
              onPressed: () async {
                await _service.retirerTelechargement(audio);
                if (mounted) setState(() {});
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _ligneCatalogueTelechargement(AudioParoleVivante audio) {
    final deja = _service.estTelecharge(audio);
    return Container(
      padding: const EdgeInsets.all(10),
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: _grisFond.withOpacity(0.7),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(audio.titre,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w700,
                        color: PaletteNouvelle.bleuNuit)),
                Text(audio.orateur,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(fontSize: 10, color: _grisTexte)),
              ],
            ),
          ),
          if (deja)
            TextButton(
              onPressed: () async {
                await _service.retirerTelechargement(audio);
                if (mounted) setState(() {});
              },
              child: const Text('Supprimer'),
            )
          else if (!audio.aUnSon)
            const Text('Sans fichier',
                style: TextStyle(fontSize: 11, color: _grisTexte))
          else
            FilledButton.icon(
              style: FilledButton.styleFrom(
                  backgroundColor: PaletteNouvelle.or),
              icon: const Icon(Icons.download,
                  color: PaletteNouvelle.bleuNuit, size: 14),
              label: const Text('Télécharger',
                  style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w800,
                      color: PaletteNouvelle.bleuNuit)),
              onPressed: () async {
                try {
                  await _service.telecharger(audio);
                  if (mounted) {
                    setState(() {});
                    _dire('« ${audio.titre} » disponible hors ligne.');
                  }
                } catch (_) {
                  if (mounted) _dire('Téléchargement impossible.');
                }
              },
            ),
        ],
      ),
    );
  }

  Widget _blocLocaux(List<AudioParoleVivante> locaux) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
      ),
      child: Column(
        children: [
          Row(
            children: [
              Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  color: PaletteNouvelle.bleuNuit,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(Icons.smartphone,
                    color: PaletteNouvelle.or, size: 18),
              ),
              const SizedBox(width: 12),
              const Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Sur mon appareil',
                        style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w800,
                            color: PaletteNouvelle.bleuNuit)),
                    Text('MP3, M4A, WAV, OGG',
                        style: TextStyle(fontSize: 11, color: _grisTexte)),
                  ],
                ),
              ),
              FilledButton.icon(
                style: FilledButton.styleFrom(
                    backgroundColor: PaletteNouvelle.or),
                icon: const Icon(Icons.folder_open,
                    color: PaletteNouvelle.bleuNuit, size: 14),
                label: const Text('Importer un audio',
                    style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w800,
                        color: PaletteNouvelle.bleuNuit)),
                onPressed: _importer,
              ),
            ],
          ),
          const SizedBox(height: 8),
          if (locaux.isEmpty)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: _grisFond,
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Text(
                  'Aucun fichier local importé. Sélectionnez un audio depuis votre téléphone pour l’écouter ou l’ajouter à une playlist.',
                  style: TextStyle(fontSize: 12, color: _grisTexte)),
            )
          else
            for (final audio in locaux)
              _ligneLocale(audio),
        ],
      ),
    );
  }

  Widget _ligneLocale(AudioParoleVivante audio) {
    return GestureDetector(
      onTap: () => _jouer(audio, _service.locaux),
      child: Container(
        padding: const EdgeInsets.all(10),
        margin: const EdgeInsets.only(bottom: 8),
        decoration: BoxDecoration(
          color: _grisFond,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: PaletteNouvelle.bleuNuit,
                          borderRadius: BorderRadius.circular(999),
                        ),
                        child: const Text('FICHIER LOCAL',
                            style: TextStyle(
                                fontSize: 9,
                                fontWeight: FontWeight.w800,
                                color: PaletteNouvelle.or)),
                      ),
                      const SizedBox(width: 6),
                      Text(
                          '${audio.tailleOctets == null ? '' : '${formaterTailleMo(audio.tailleOctets!)} • '}${audio.dureeTexte ?? ''}',
                          style:
                              const TextStyle(fontSize: 10, color: _grisTexte)),
                    ],
                  ),
                  const SizedBox(height: 2),
                  Text(audio.titre,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w700,
                          color: PaletteNouvelle.bleuNuit)),
                ],
              ),
            ),
            IconButton(
              icon: const Icon(Icons.playlist_add,
                  color: PaletteNouvelle.bleuNuit),
              onPressed: () async {
                await feuilleAjoutPlaylistParole(context, _service, audio);
                if (mounted) setState(() {});
              },
            ),
            IconButton(
              icon: const Icon(Icons.delete_outline, color: _grisTexte),
              onPressed: () async {
                await _service.retirerLocal(audio);
                if (mounted) setState(() {});
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _cartePlaylistPersonnelle(PlaylistParole playlist) {
    return GestureDetector(
      onTap: () => setState(() => _detailPlaylist = playlist),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(24),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                color: PaletteNouvelle.bleuNuit,
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Icon(Icons.library_music,
                  color: PaletteNouvelle.or, size: 20),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(playlist.titre,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w800,
                        color: PaletteNouvelle.bleuNuit)),
                Text(
                    '${playlist.audioIds.length} titre${playlist.audioIds.length > 1 ? 's' : ''}',
                    style: const TextStyle(fontSize: 11, color: _grisTexte)),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _carteSelection(SelectionAudio selection) {
    final nombre = selection.audioIds.length;
    return GestureDetector(
      onTap: () => setState(() => _detailSelection = selection),
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Row(
          children: [
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                color: PaletteNouvelle.bleuNuit,
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Icon(Icons.album,
                  color: PaletteNouvelle.or, size: 24),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(selection.titre,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w800,
                          color: PaletteNouvelle.bleuNuit)),
                  Text(selection.description,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style:
                          const TextStyle(fontSize: 12, color: _grisTexte)),
                ],
              ),
            ),
            Container(
              padding:
                  const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: _grisFond,
                borderRadius: BorderRadius.circular(999),
              ),
              child: Text('$nombre',
                  style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                      color: PaletteNouvelle.bleuNuit)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _vueDetailPlaylist() {
    final favoris = _detailFavoris;
    final playlist = _detailPlaylist;
    final selection = _detailSelection;
    final titre = favoris
        ? 'Favoris & Coups de cœur'
        : playlist?.titre ?? selection?.titre ?? '';
    final description = favoris
        ? 'Tous vos enseignements et chants aimés'
        : playlist?.description ?? selection?.description ?? '';
    final audios = favoris
        ? _service.favoris
        : playlist != null
            ? playlist.audios(_service.tousLesAudios)
            : selection != null
                ? selection.audios(_service.audios)
                : const <AudioParoleVivante>[];
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 4, 20, 16),
      children: [
        Align(
          alignment: Alignment.centerLeft,
          child: TextButton.icon(
            onPressed: _fermerDetail,
            icon: const Icon(Icons.arrow_back, size: 16),
            label: const Text('Retour aux playlists'),
            style: TextButton.styleFrom(
                foregroundColor: PaletteNouvelle.bleuNuit),
          ),
        ),
        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: PaletteNouvelle.bleuNuit,
            borderRadius: BorderRadius.circular(24),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: PaletteNouvelle.or,
                  borderRadius: BorderRadius.circular(999),
                ),
                child: Text(
                  'Playlist • ${audios.length} titre${audios.length > 1 ? 's' : ''}',
                  style: const TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w800,
                      color: PaletteNouvelle.bleuNuit),
                ),
              ),
              const SizedBox(height: 8),
              Text(titre,
                  style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w800,
                      color: Colors.white)),
              const SizedBox(height: 4),
              Text(description,
                  style: TextStyle(
                      fontSize: 12, color: Colors.white.withOpacity(0.75))),
              if (audios.isNotEmpty) ...[
                const SizedBox(height: 16),
                SizedBox(
                  width: double.infinity,
                  height: 44,
                  child: FilledButton.icon(
                    style: FilledButton.styleFrom(
                        backgroundColor: PaletteNouvelle.or),
                    icon: const Icon(Icons.play_arrow,
                        color: PaletteNouvelle.bleuNuit),
                    label: const Text('Lire la playlist',
                        style: TextStyle(
                            fontWeight: FontWeight.w800,
                            color: PaletteNouvelle.bleuNuit)),
                    onPressed: () => _jouer(audios.first, audios),
                  ),
                ),
              ],
              if (_service.estAdminGeneral && selection != null) ...[
                const SizedBox(height: 12),
                Row(
                  children: [
                    TextButton(
                      onPressed: () => _feuilleSelection(selection: selection),
                      child: const Text('Modifier',
                          style: TextStyle(color: Colors.white)),
                    ),
                    TextButton(
                      onPressed: () => _retirerSelection(selection),
                      child: const Text('Retirer',
                          style: TextStyle(color: Colors.white)),
                    ),
                  ],
                ),
              ],
              if (playlist != null) ...[
                const SizedBox(height: 12),
                TextButton(
                  onPressed: () => _retirerPlaylist(playlist),
                  child: const Text('Supprimer la playlist',
                      style: TextStyle(color: Colors.white)),
                ),
              ],
            ],
          ),
        ),
        const SizedBox(height: 16),
        if (audios.isEmpty)
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
            ),
            child: const Column(
              children: [
                Text('Cette playlist est encore vide',
                    style: TextStyle(
                        fontWeight: FontWeight.w700,
                        color: PaletteNouvelle.bleuNuit)),
                SizedBox(height: 4),
                Text(
                    'Appuyez sur l’icône + à côté d’un audio pour l’ajouter ici.',
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 12, color: _grisTexte)),
              ],
            ),
          )
        else
          for (final audio in audios)
            Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: _carteAudio(audio, audios),
            ),
      ],
    );
  }

  Future<void> _retirerPlaylist(PlaylistParole playlist) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Supprimer cette playlist ?'),
        content: Text('« ${playlist.titre} » disparaîtra de vos playlists.'),
        actions: [
          TextButton(
              onPressed: () => Navigator.pop(ctx, false),
              child: const Text('Annuler')),
          FilledButton(
              onPressed: () => Navigator.pop(ctx, true),
              child: const Text('Supprimer')),
        ],
      ),
    );
    if (ok != true) return;
    await _service.supprimerPlaylist(playlist);
    if (mounted) _fermerDetail();
  }

  Future<void> _retirerSelection(SelectionAudio selection) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Retirer cette sélection ?'),
        content: Text(
            '« ${selection.titre} » disparaîtra des sélections. Les audios restent au catalogue.'),
        actions: [
          TextButton(
              onPressed: () => Navigator.pop(ctx, false),
              child: const Text('Annuler')),
          FilledButton(
              onPressed: () => Navigator.pop(ctx, true),
              child: const Text('Retirer')),
        ],
      ),
    );
    if (ok != true) return;
    try {
      await _service.retirerSelection(selection);
      if (mounted) _fermerDetail();
    } catch (e) {
      if (mounted) _dire('Retrait refusé ($e).');
    }
  }

  // ── Carte audio partagée ────────────────────────────────────

  Widget _carteAudio(AudioParoleVivante audio, List<AudioParoleVivante> file) {
    final courant = _service.pisteCourante?.id == audio.id;
    final favori = _service.estFavori(audio);
    return GestureDetector(
      onTap: () => _jouer(audio, file),
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: courant
              ? Border.all(color: PaletteNouvelle.or, width: 2)
              : null,
        ),
        child: Row(
          children: [
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                color: PaletteNouvelle.bleuNuit,
                borderRadius: BorderRadius.circular(12),
              ),
              alignment: Alignment.center,
              child: Text(
                'CP',
                style: const TextStyle(
                  fontFamily: 'Cinzel',
                  fontSize: 14,
                  fontWeight: FontWeight.w700,
                  color: PaletteNouvelle.or,
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: PaletteNouvelle.or.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(999),
                        ),
                        child: Text(
                          audio.estLocal
                              ? 'FICHIER LOCAL'
                              : audio.categorie.toUpperCase(),
                          style: const TextStyle(
                              fontSize: 9,
                              fontWeight: FontWeight.w800,
                              color: PaletteNouvelle.bleuNuit),
                        ),
                      ),
                      const SizedBox(width: 6),
                      if (audio.dureeTexte != null)
                        Text(audio.dureeTexte!,
                            style: const TextStyle(
                                fontSize: 11, color: _grisTexte)),
                      if (_service.estTelecharge(audio)) ...[
                        const SizedBox(width: 6),
                        const Icon(Icons.check_circle,
                            color: PaletteNouvelle.or, size: 12),
                        const Text('Hors ligne',
                            style:
                                TextStyle(fontSize: 9, color: _grisTexte)),
                      ],
                    ],
                  ),
                  const SizedBox(height: 2),
                  Text(
                    audio.titre,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w700,
                        color: courant
                            ? PaletteNouvelle.orFonce
                            : PaletteNouvelle.bleuNuit),
                  ),
                  Text(
                    audio.orateur,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(fontSize: 12, color: _grisTexte),
                  ),
                ],
              ),
            ),
            IconButton(
              icon: Icon(Icons.favorite,
                  color: favori ? PaletteNouvelle.or : _grisTexte),
              onPressed: () async {
                await _service.basculerFavori(audio);
                if (mounted) setState(() {});
              },
            ),
            IconButton(
              icon: const Icon(Icons.add_circle_outline,
                  color: PaletteNouvelle.bleuNuit),
              onPressed: () async {
                await feuilleAjoutPlaylistParole(context, _service, audio);
                if (mounted) setState(() {});
              },
            ),
            if (_service.estAdminGeneral)
              PopupMenuButton<String>(
                icon: const Icon(Icons.more_vert, color: _grisTexte),
                onSelected: (valeur) {
                  if (valeur == 'modifier') {
                    _feuilleAudio(audio: audio);
                  } else if (valeur == 'retirer') {
                    _retirerAudio(audio);
                  }
                },
                itemBuilder: (_) => const [
                  PopupMenuItem(value: 'modifier', child: Text('Modifier')),
                  PopupMenuItem(value: 'retirer', child: Text('Retirer')),
                ],
              ),
          ],
        ),
      ),
    );
  }

  // ── Mini-lecteur ────────────────────────────────────────────

  Widget _miniLecteur() {
    final piste = _service.pisteCourante;
    if (piste == null) return const SizedBox.shrink();
    return GestureDetector(
      key: const ValueKey('miniLecteurParole'),
      onTap: () {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) => PageLecteurParole(service: _service),
          ),
        );
      },
      child: Container(
        margin: const EdgeInsets.fromLTRB(12, 8, 12, 0),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: PaletteNouvelle.bleuNuit.withOpacity(0.16),
              blurRadius: 20,
              offset: const Offset(0, 8),
            ),
          ],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            StreamBuilder<Duration>(
              stream: _service.position,
              initialData: Duration.zero,
              builder: (context, position) {
                return StreamBuilder<Duration?>(
                  stream: _service.duree,
                  builder: (context, duree) {
                    final total = duree.data;
                    final progres = total == null || total.inSeconds == 0
                        ? 0.0
                        : (position.data ?? Duration.zero).inSeconds /
                            total.inSeconds;
                    return LinearProgressIndicator(
                      value: progres.clamp(0.0, 1.0),
                      backgroundColor:
                          PaletteNouvelle.bleuNuit.withOpacity(0.1),
                      color: PaletteNouvelle.or,
                      minHeight: 2.5,
                    );
                  },
                );
              },
            ),
            Padding(
              padding: const EdgeInsets.all(10),
              child: Row(
                children: [
                  Container(
                    width: 44,
                    height: 44,
                    decoration: BoxDecoration(
                      color: PaletteNouvelle.bleuNuit,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    alignment: Alignment.center,
                    child: const Text(
                      'CP',
                      style: TextStyle(
                        fontFamily: 'Cinzel',
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                        color: PaletteNouvelle.or,
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(piste.titre,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w700,
                                color: PaletteNouvelle.bleuNuit)),
                        Text(piste.orateur,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                                fontSize: 12, color: _grisTexte)),
                      ],
                    ),
                  ),
                  StreamBuilder<bool>(
                    stream: _service.enLecture,
                    initialData: false,
                    builder: (context, lecture) {
                      final enLecture = lecture.data ?? false;
                      return Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          IconButton(
                            icon: Icon(
                                enLecture
                                    ? Icons.pause
                                    : Icons.play_arrow,
                                color: PaletteNouvelle.bleuNuit),
                            onPressed: () => _service.basculerLecture(),
                          ),
                          IconButton(
                            icon: const Icon(Icons.skip_next,
                                color: PaletteNouvelle.bleuNuit),
                            onPressed: () => _service.suivant(),
                          ),
                        ],
                      );
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  // ── Barre d'onglets ─────────────────────────────────────────

  Widget _barreOnglets() {
    Widget onglet(_OngletParole valeur, IconData icone, String libelle) {
      final actif = _onglet == valeur;
      return Expanded(
        child: InkWell(
          onTap: () => setState(() => _onglet = valeur),
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(icone,
                    color: actif
                        ? PaletteNouvelle.or
                        : _grisTexte),
                const SizedBox(height: 2),
                Text(libelle,
                    style: TextStyle(
                        fontSize: 10,
                        fontWeight:
                            actif ? FontWeight.w700 : FontWeight.w600,
                        color: actif
                            ? PaletteNouvelle.or
                            : _grisTexte)),
              ],
            ),
          ),
        ),
      );
    }

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border(
            top: BorderSide(
                color: PaletteNouvelle.bleuNuit.withOpacity(0.1))),
      ),
      child: SafeArea(
        top: false,
        child: Row(
          children: [
            onglet(_OngletParole.ecouter, Icons.headphones_outlined,
                'Écouter'),
            onglet(_OngletParole.explorer, Icons.search_outlined,
                'Explorer'),
            onglet(_OngletParole.playlists, Icons.library_music,
                'Playlists'),
            Expanded(
              child: InkWell(
                onTap: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (_) =>
                          PageLecteurParole(service: _service),
                    ),
                  );
                },
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 8),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.album_outlined,
                          color: _service.pisteCourante == null
                              ? _grisTexte
                              : PaletteNouvelle.or),
                      const SizedBox(height: 2),
                      Text('Lecture',
                          style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.w600,
                              color: _service.pisteCourante == null
                                  ? _grisTexte
                                  : PaletteNouvelle.or)),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // ── Feuille audio (publication, structure) ──────────────────

  Future<void> _feuilleAudio({AudioParoleVivante? audio}) async {
    var titre = audio?.titre ?? '';
    var orateur = audio?.orateur ?? '';
    var categorie =
        audio == null ? 'Enseignement' : categorieAudio(audio.categorie);
    var duree = audio?.dureeTexte ?? '';
    var description = audio?.description ?? '';
    List<int>? fichierBytes;
    String? fichierNom;
    var erreur = '';
    final ok = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(16))),
      builder: (ctx) => StatefulBuilder(builder: (ctx, setS) {
        Widget champ(String valeur, String label,
            {int lignes = 1,
            required void Function(String v) onChanged}) {
          return Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: TextFormField(
              initialValue: valeur,
              maxLines: lignes,
              keyboardType:
                  lignes > 1 ? TextInputType.multiline : TextInputType.text,
              onChanged: onChanged,
              decoration: InputDecoration(
                labelText: label,
                filled: true,
                fillColor: _grisFond,
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: BorderSide.none),
              ),
            ),
          );
        }

        return Padding(
          padding: EdgeInsets.fromLTRB(
              16, 16, 16, MediaQuery.of(ctx).viewInsets.bottom + 16),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(audio == null ? 'Nouvel audio' : 'Modifier l’audio',
                    style: const TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w800,
                        color: PaletteNouvelle.bleuNuit)),
                const SizedBox(height: 12),
                champ(titre, 'Titre', onChanged: (v) => titre = v),
                champ(orateur, 'Orateur', onChanged: (v) => orateur = v),
                Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: DropdownButtonFormField<String>(
                    value: categorie,
                    decoration: InputDecoration(
                      labelText: 'Catégorie',
                      filled: true,
                      fillColor: _grisFond,
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: BorderSide.none),
                    ),
                    items: [
                      for (final c in kCategoriesAudio)
                        DropdownMenuItem(value: c, child: Text(c)),
                    ],
                    onChanged: (v) {
                      if (v != null) categorie = v;
                    },
                  ),
                ),
                champ(duree, 'Durée (par exemple 12:34)',
                    onChanged: (v) => duree = v),
                Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: OutlinedButton.icon(
                    onPressed: () async {
                      final choix = await FilePicker.platform.pickFiles(
                        type: FileType.custom,
                        allowedExtensions: kExtensionsAudio,
                        withData: true,
                      );
                      final f = choix?.files.single;
                      if (f == null) return;
                      final octets = f.bytes;
                      if (octets == null || octets.isEmpty) {
                        setS(() => erreur =
                            'Fichier illisible. Choisis un MP3, M4A, WAV ou OGG.');
                        return;
                      }
                      setS(() {
                        fichierBytes = octets;
                        fichierNom = f.name;
                        erreur = '';
                      });
                    },
                    icon: const Icon(Icons.upload_file_outlined),
                    label: Text(fichierNom ?? 'Fichier audio (MP3, M4A, WAV, OGG)'),
                  ),
                ),
                champ(description, 'Description',
                    lignes: 3, onChanged: (v) => description = v),
                if (erreur.isNotEmpty)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: Text(erreur,
                        style: const TextStyle(color: Colors.red)),
                  ),
                SizedBox(
                  width: double.infinity,
                  height: 48,
                  child: FilledButton(
                    style: FilledButton.styleFrom(
                        backgroundColor: PaletteNouvelle.bleuNuit),
                    onPressed: () async {
                      if (titre.trim().isEmpty) {
                        setS(() => erreur = 'Le titre est obligatoire.');
                        return;
                      }
                      if (audio == null &&
                          (fichierBytes == null || fichierNom == null)) {
                        setS(() => erreur =
                            'Choisis un fichier audio à publier.');
                        return;
                      }
                      try {
                        if (audio == null) {
                          await _service.publierAudio(
                            titre: titre.trim(),
                            orateur: orateur.trim(),
                            categorie: categorie,
                            duree: duree.trim(),
                            description: description.trim(),
                            fichierBytes: fichierBytes,
                            fichierNom: fichierNom,
                          );
                        } else {
                          await _service.modifierAudio(
                            audio,
                            titre: titre.trim(),
                            orateur: orateur.trim(),
                            categorie: categorie,
                            duree: duree.trim(),
                            description: description.trim(),
                            fichierBytes: fichierBytes,
                            fichierNom: fichierNom,
                          );
                        }
                        if (ctx.mounted) Navigator.pop(ctx, true);
                      } catch (e) {
                        setS(() => erreur = 'Publication refusée ($e).');
                      }
                    },
                    child: Text(audio == null ? 'Publier' : 'Enregistrer'),
                  ),
                ),
              ],
            ),
          ),
        );
      }),
    );
    if (ok == true && mounted) {
      setState(() {});
      _dire(audio == null ? 'Audio publié.' : 'Audio modifié.');
    }
  }

  Future<void> _retirerAudio(AudioParoleVivante audio) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Retirer cet audio ?'),
        content: Text(
            '« ${audio.titre} » disparaîtra du catalogue. Les favoris, playlists et téléchargements qui le contiennent seront mis à jour.'),
        actions: [
          TextButton(
              onPressed: () => Navigator.pop(ctx, false),
              child: const Text('Annuler')),
          FilledButton(
              onPressed: () => Navigator.pop(ctx, true),
              child: const Text('Retirer')),
        ],
      ),
    );
    if (ok != true) return;
    try {
      await _service.retirerAudio(audio);
      if (mounted) setState(() {});
      _dire('Audio retiré du catalogue.');
    } catch (e) {
      if (mounted) _dire('Retrait refusé ($e).');
    }
  }

  // ── Feuille sélection (structure) ───────────────────────────

  Future<void> _feuilleSelection({SelectionAudio? selection}) async {
    var titre = selection?.titre ?? '';
    var description = selection?.description ?? '';
    final choisis = <String>{...(selection?.audioIds ?? const <String>[])};
    var erreur = '';
    final ok = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(16))),
      builder: (ctx) => StatefulBuilder(builder: (ctx, setS) {
        return Padding(
          padding: EdgeInsets.fromLTRB(
              16, 16, 16, MediaQuery.of(ctx).viewInsets.bottom + 16),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(selection == null
                    ? 'Nouvelle sélection'
                    : 'Modifier la sélection',
                    style: const TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w800,
                        color: PaletteNouvelle.bleuNuit)),
                const SizedBox(height: 12),
                TextFormField(
                  initialValue: titre,
                  onChanged: (v) => titre = v,
                  decoration: InputDecoration(
                    labelText: 'Titre',
                    filled: true,
                    fillColor: _grisFond,
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none),
                  ),
                ),
                const SizedBox(height: 12),
                TextFormField(
                  initialValue: description,
                  onChanged: (v) => description = v,
                  decoration: InputDecoration(
                    labelText: 'Description',
                    filled: true,
                    fillColor: _grisFond,
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none),
                  ),
                ),
                const SizedBox(height: 12),
                const Text('Audios de la sélection',
                    style: TextStyle(
                        fontWeight: FontWeight.w700,
                        color: PaletteNouvelle.bleuNuit)),
                if (_service.audios.isEmpty)
                  const Padding(
                    padding: EdgeInsets.only(top: 8),
                    child: Text('Aucun audio au catalogue.',
                        style: TextStyle(fontSize: 12, color: _grisTexte)),
                  )
                else
                  for (final audio in _service.audios)
                    CheckboxListTile(
                      contentPadding: EdgeInsets.zero,
                      title: Text(audio.titre,
                          style: const TextStyle(fontSize: 14)),
                      subtitle: Text(audio.orateur,
                          style: const TextStyle(fontSize: 12)),
                      value: choisis.contains(audio.id),
                      onChanged: (v) => setS(() {
                        if (v == true) {
                          choisis.add(audio.id);
                        } else {
                          choisis.remove(audio.id);
                        }
                      }),
                    ),
                if (erreur.isNotEmpty)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: Text(erreur,
                        style: const TextStyle(color: Colors.red)),
                  ),
                SizedBox(
                  width: double.infinity,
                  height: 48,
                  child: FilledButton(
                    style: FilledButton.styleFrom(
                        backgroundColor: PaletteNouvelle.bleuNuit),
                    onPressed: () async {
                      if (titre.trim().isEmpty) {
                        setS(() => erreur = 'Le titre est obligatoire.');
                        return;
                      }
                      try {
                        if (selection == null) {
                          await _service.publierSelection(
                            titre: titre.trim(),
                            description: description.trim(),
                            audioIds: choisis.toList(),
                          );
                        } else {
                          await _service.modifierSelection(
                            selection,
                            titre: titre.trim(),
                            description: description.trim(),
                            audioIds: choisis.toList(),
                          );
                        }
                        if (ctx.mounted) Navigator.pop(ctx, true);
                      } catch (e) {
                        setS(() => erreur = 'Enregistrement refusé ($e).');
                      }
                    },
                    child: Text(
                        selection == null ? 'Publier' : 'Enregistrer'),
                  ),
                ),
              ],
            ),
          ),
        );
      }),
    );
    if (ok == true && mounted) {
      setState(() {});
      _dire(selection == null
          ? 'Sélection publiée.'
          : 'Sélection modifiée.');
    }
  }
}
