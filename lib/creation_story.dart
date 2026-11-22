// Page « Créer une story », 17 nov. 2026, correctif tiroir et
// création directe : toucher Publier ouvre cette page plein écran,
// sans la feuille Photo et Vidéo. Modes Photo, Vidéo, Texte en V1.
// Sur téléphone, grille des photos et vidéos récentes de
// l'appareil ; sur le web, sélecteur de fichiers. Aperçu avant
// publication, puis même publication que la feuille (photo max
// 5 Mo, vidéo max 25 Mo et 60 s, compression photo 1280 px
// qualité 80). Publication par la structure seulement, mêmes
// routes serveur, aucune modification serveur. Musique, Collage
// et Boomerang ne sont pas dans cette tranche.
import 'dart:ui' as ui;

import 'package:file_picker/file_picker.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:image/image.dart' as img;
import 'package:image_picker/image_picker.dart';

import 'api.dart';
import 'galerie_story.dart';
import 'i18n.dart';

const _nuit = Color(0xFF0F1C2E);
const _or = Color(0xFFE5C158);
const _grisTexte = Color(0xFF5E687C);

const _tailleMaxPhoto = 5 * 1024 * 1024;
const _tailleMaxVideo = 25 * 1024 * 1024;
const _dureeMaxVideo = Duration(seconds: 60);

/// Compression d'une photo pour une story : largeur 1280 px au
/// plus, JPEG qualité 80, comme le sélecteur image_picker.
/// Publique pour les tests.
Future<Uint8List> compresserPhotoStory(Uint8List octets) async {
  final image = img.decodeImage(octets);
  if (image == null) return octets;
  final redim = image.width > 1280 ? img.copyResize(image, width: 1280) : image;
  return Uint8List.fromList(img.encodeJpg(redim, quality: 80));
}

/// Fonds proposés pour une story en texte, palette de l'application.
const fondsStoryTexte = <Color>[
  Color(0xFF0F1C2E),
  Color(0xFFE5C158),
  Color(0xFF000000),
  Color(0xFF1B6B3A),
  Color(0xFF7A1F2B),
];

class CreationStoryPage extends StatefulWidget {
  const CreationStoryPage({super.key, required this.client, this.chargeur, this.surWeb});

  final ApiClient client;

  /// Chargeur de galerie injecté pour les tests, celui de la
  /// plateforme sinon.
  final ChargeurGalerie? chargeur;

  /// Sur le web, injecté pour les tests, kIsWeb sinon.
  final bool? surWeb;

  @override
  State<CreationStoryPage> createState() => _CreationStoryPageState();
}

class _CreationStoryPageState extends State<CreationStoryPage> {
  String _mode = 'photo';
  final _texteControleur = TextEditingController();
  int _fondIndex = 0;
  final _cleApercuTexte = GlobalKey();
  List<ElementGalerie> _elements = [];
  bool _galerieChargee = false;
  bool _galerieAutorisee = true;
  ElementGalerie? _selectionne;
  Uint8List? _apercuOctets;
  String? _apercuNom;
  bool _publicationEnCours = false;

  bool get _surWeb => widget.surWeb ?? kIsWeb;
  ChargeurGalerie get _chargeur => widget.chargeur ?? creerChargeurGalerie();

  @override
  void initState() {
    super.initState();
    if (!_surWeb) _chargerGalerie();
  }

  @override
  void dispose() {
    _texteControleur.dispose();
    super.dispose();
  }

  Future<void> _chargerGalerie() async {
    final resultat = await _chargeur.charger();
    if (!mounted) return;
    setState(() {
      _elements = resultat.elements;
      _galerieAutorisee = resultat.autorisee;
      _galerieChargee = true;
    });
  }

  void _changerMode(String mode) {
    if (_mode == mode) return;
    setState(() {
      _mode = mode;
      _selectionne = null;
      _apercuOctets = null;
      _apercuNom = null;
    });
  }

  Future<void> _choisirFichier() async {
    // Sélecteur de fichier, réécriture 22 nov. 2026, preuve
    // d'Axel : sur le web, ImagePicker ne renvoie pas le fichier,
    // aucun aperçu et Publier reste désactivé. Sur le web, on
    // passe par FilePicker avec withData, octets lus directement,
    // jamais un chemin, et des extensions explicites que le
    // serveur accepte. Sur téléphone, ImagePicker reste, il
    // fonctionne en natif.
    try {
      if (_surWeb) {
        final extensions = _mode == 'photo'
            ? const ['jpg', 'jpeg', 'png', 'webp']
            : const ['mp4', 'mov', 'webm'];
        final result = await FilePicker.platform.pickFiles(
          type: FileType.custom,
          allowedExtensions: extensions,
          withData: true,
        );
        if (result == null || result.files.isEmpty || !mounted) return;
        final fichier = result.files.single;
        final octets = fichier.bytes;
        if (octets == null || octets.isEmpty) {
          _erreur(tr('Impossible de lire ce fichier.'));
          return;
        }
        setState(() {
          _apercuOctets = octets;
          _apercuNom = fichier.name;
        });
        return;
      }
      final picker = ImagePicker();
      final XFile? fichier = _mode == 'photo'
          ? await picker.pickImage(source: ImageSource.gallery, maxWidth: 1280, imageQuality: 80)
          : await picker.pickVideo(source: ImageSource.gallery, maxDuration: _dureeMaxVideo);
      if (fichier == null || !mounted) return;
      final octets = await fichier.readAsBytes();
      setState(() {
        _apercuOctets = octets;
        _apercuNom = fichier.name;
      });
    } catch (_) {
      if (mounted) _erreur(tr('Impossible de choisir le fichier.'));
    }
  }

  Future<void> _choisirElement(ElementGalerie element) async {
    if (element.estVideo) {
      setState(() => _selectionne = element);
      return;
    }
    final octets = await element.chargerOctets();
    if (octets == null || !mounted) return;
    setState(() {
      _selectionne = element;
      _apercuOctets = octets;
      _apercuNom = element.nom;
    });
  }

  bool get _peutPublier {
    if (_publicationEnCours) return false;
    if (_mode == 'texte') return _texteControleur.text.trim().isNotEmpty;
    if (_surWeb) return _apercuOctets != null;
    return _selectionne != null;
  }

  void _erreur(String message) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
  }

  Future<void> _publier() async {
    if (!_peutPublier || _publicationEnCours) return;
    setState(() => _publicationEnCours = true);
    try {
      if (_mode == 'texte') {
        final octets = await _capturerTexte();
        if (octets == null) throw Exception('capture');
        await widget.client.publierStory(bytes: octets, filename: 'story-texte.png', type: 'photo');
      } else if (_surWeb) {
        final octets = _apercuOctets!;
        final limite = _mode == 'photo' ? _tailleMaxPhoto : _tailleMaxVideo;
        if (octets.length > limite) throw Exception('trop lourd');
        await widget.client.publierStory(bytes: octets, filename: _apercuNom ?? 'story', type: _mode);
      } else {
        final element = _selectionne!;
        if (element.estVideo && element.duree > _dureeMaxVideo) throw Exception('trop lourd');
        final octetsBruts = await element.chargerOctets();
        if (octetsBruts == null) throw Exception('lecture');
        final octets = element.estVideo ? octetsBruts : await compresserPhotoStory(octetsBruts);
        final limite = element.estVideo ? _tailleMaxVideo : _tailleMaxPhoto;
        if (octets.length > limite) throw Exception('trop lourd');
        await widget.client.publierStory(bytes: octets, filename: element.nom, type: element.estVideo ? 'video' : 'photo');
      }
      if (!mounted) return;
      Navigator.of(context).pop(true);
    } catch (e) {
      if (!mounted) return;
      setState(() => _publicationEnCours = false);
      // Étape 2 : quand le serveur répond avec un message, par
      // exemple « Les stories sont désactivées pour le moment. »
      // quand les clés R2 manquent, on affiche son message, pas le
      // message générique. ApiException porte déjà le message du
      // serveur, extrait de 'erreur' ou 'message' par le client.
      if (e is ApiException) {
        _erreur(e.message);
      } else {
        _erreur(e.toString().contains('trop lourd') ? tr('Trop lourd pour une story.') : tr('Impossible de publier la story.'));
      }
    }
  }

  Future<Uint8List?> _capturerTexte() async {
    final boundary = _cleApercuTexte.currentContext?.findRenderObject() as RenderRepaintBoundary?;
    if (boundary == null) return null;
    final image = await boundary.toImage(pixelRatio: 2.0);
    final donnees = await image.toByteData(format: ui.ImageByteFormat.png);
    return donnees?.buffer.asUint8List();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: _nuit,
        foregroundColor: Colors.white,
        title: Text(tr('Créer une story')),
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Row(
            children: [
              _CarteMode(icone: Icons.photo_outlined, libelle: tr('Photo'), actif: _mode == 'photo', onTap: () => _changerMode('photo')),
              const SizedBox(width: 12),
              _CarteMode(icone: Icons.videocam_outlined, libelle: tr('Vidéo'), actif: _mode == 'video', onTap: () => _changerMode('video')),
              const SizedBox(width: 12),
              _CarteMode(icone: Icons.text_fields_outlined, libelle: tr('Texte'), actif: _mode == 'texte', onTap: () => _changerMode('texte')),
            ],
          ),
          const SizedBox(height: 20),
          if (_mode == 'texte') ..._corpsTexte() else ..._corpsMedia(),
        ],
      ),
      bottomNavigationBar: SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
          child: SizedBox(
            width: double.infinity,
            height: 48,
            child: ElevatedButton(
              onPressed: _peutPublier ? _publier : null,
              style: ElevatedButton.styleFrom(backgroundColor: _or, foregroundColor: _nuit),
              child: _publicationEnCours
                  ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(color: _nuit, strokeWidth: 2.5))
                  : Text(tr('Publier la story'), style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
            ),
          ),
        ),
      ),
    );
  }

  List<Widget> _corpsTexte() {
    final fond = fondsStoryTexte[_fondIndex];
    final couleurTexte = fond.computeLuminance() > 0.5 ? _nuit : Colors.white;
    return [
      TextField(
        controller: _texteControleur,
        maxLines: 5,
        maxLength: 280,
        onChanged: (_) => setState(() {}),
        decoration: InputDecoration(
          hintText: tr('Écris ta story'),
          border: const OutlineInputBorder(),
        ),
      ),
      const SizedBox(height: 12),
      Row(
        children: [
          for (var i = 0; i < fondsStoryTexte.length; i++)
            Padding(
              padding: const EdgeInsets.only(right: 10),
              child: GestureDetector(
                onTap: () => setState(() => _fondIndex = i),
                child: Container(
                  width: 36,
                  height: 36,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: fondsStoryTexte[i],
                    border: Border.all(color: _fondIndex == i ? _or : Colors.transparent, width: 3),
                  ),
                ),
              ),
            ),
        ],
      ),
      const SizedBox(height: 16),
      RepaintBoundary(
        key: _cleApercuTexte,
        child: Container(
          width: double.infinity,
          height: 320,
          color: fond,
          padding: const EdgeInsets.all(24),
          alignment: Alignment.center,
          child: Text(
            _texteControleur.text.trim().isEmpty ? tr('Écris ta story') : _texteControleur.text.trim(),
            textAlign: TextAlign.center,
            style: TextStyle(color: couleurTexte, fontSize: 22, fontWeight: FontWeight.w700),
          ),
        ),
      ),
    ];
  }

  List<Widget> _corpsMedia() {
    if (_surWeb) {
      return [
        OutlinedButton.icon(
          onPressed: _choisirFichier,
          icon: const Icon(Icons.photo_library_outlined),
          label: Text(tr('Choisir dans la galerie')),
        ),
        const SizedBox(height: 16),
        if (_apercuOctets != null)
          ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: _mode == 'photo'
                ? Image.memory(_apercuOctets!, fit: BoxFit.cover)
                : Container(
                    width: double.infinity,
                    height: 200,
                    color: _nuit,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.play_circle_outlined, color: _or, size: 48),
                        const SizedBox(height: 8),
                        Text(_apercuNom ?? '', style: const TextStyle(color: Colors.white)),
                      ],
                    ),
                  ),
          ),
      ];
    }
    if (!_galerieChargee) {
      return [const Center(child: Padding(padding: EdgeInsets.all(32), child: CircularProgressIndicator(color: _or)))];
    }
    if (!_galerieAutorisee) {
      return [
        Text(tr('Autorise l’accès aux photos pour afficher ta galerie.')),
        const SizedBox(height: 12),
        OutlinedButton(
          onPressed: () {
            setState(() => _galerieChargee = false);
            _chargerGalerie();
          },
          child: Text(tr('Réessayer')),
        ),
      ];
    }
    if (_elements.isEmpty) {
      return [Text(tr('Aucune photo ou vidéo.'))];
    }
    final elements = _elements.where((e) => _mode == 'photo' ? !e.estVideo : e.estVideo).toList();
    if (elements.isEmpty) {
      return [Text(tr('Aucune photo ou vidéo.'))];
    }
    return [
      if (_selectionne != null) ...[
        ClipRRect(
          borderRadius: BorderRadius.circular(12),
          child: _selectionne!.estVideo
              ? Container(
                  width: double.infinity,
                  height: 200,
                  color: _nuit,
                  child: Stack(
                    fit: StackFit.expand,
                    children: [
                      Image.memory(_selectionne!.vignette, fit: BoxFit.cover),
                      const Center(child: Icon(Icons.play_circle_outlined, color: Colors.white, size: 48)),
                      Positioned(
                        right: 8,
                        bottom: 8,
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(color: Colors.black54, borderRadius: BorderRadius.circular(4)),
                          child: Text(_dureeTexte(_selectionne!.duree), style: const TextStyle(color: Colors.white, fontSize: 12)),
                        ),
                      ),
                    ],
                  ),
                )
              : Image.memory(_apercuOctets ?? _selectionne!.vignette, fit: BoxFit.cover),
        ),
        const SizedBox(height: 16),
      ],
      GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3, mainAxisSpacing: 4, crossAxisSpacing: 4),
        itemCount: elements.length,
        itemBuilder: (context, index) {
          final element = elements[index];
          final actif = _selectionne == element;
          return GestureDetector(
            onTap: () => _choisirElement(element),
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(color: actif ? _or : Colors.transparent, width: 3),
              ),
              child: Stack(
                fit: StackFit.expand,
                children: [
                  Image.memory(element.vignette, fit: BoxFit.cover),
                  if (element.estVideo)
                    const Align(
                      alignment: Alignment.bottomRight,
                      child: Padding(
                        padding: EdgeInsets.all(4),
                        child: Icon(Icons.play_circle_fill, color: Colors.white, size: 20),
                      ),
                    ),
                ],
              ),
            ),
          );
        },
      ),
    ];
  }

  String _dureeTexte(Duration duree) {
    final minutes = duree.inMinutes;
    final secondes = duree.inSeconds % 60;
    return '$minutes:${secondes.toString().padLeft(2, '0')}';
  }
}

class _CarteMode extends StatelessWidget {
  const _CarteMode({required this.icone, required this.libelle, required this.actif, required this.onTap});

  final IconData icone;
  final String libelle;
  final bool actif;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Container(
          height: 76,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            color: actif ? _or.withValues(alpha: 0.15) : Colors.white,
            border: Border.all(color: actif ? _or : const Color(0xFFE4E7EF), width: actif ? 2 : 1),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icone, color: actif ? _nuit : _grisTexte, size: 26),
              const SizedBox(height: 4),
              Text(libelle, style: TextStyle(color: actif ? _nuit : _grisTexte, fontWeight: FontWeight.w700)),
            ],
          ),
        ),
      ),
    );
  }
}
