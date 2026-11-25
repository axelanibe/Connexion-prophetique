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
import 'dart:async';
import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:share_plus/share_plus.dart';

import 'api.dart';
import 'i18n.dart';
import 'main.dart';
import 'presence_culte.dart';
import 'tiroir_intelligent.dart';

/// Taille maximale d'une photo décodée, comme la photo de profil.
const tailleMaxPhotoMur = 700 * 1024;

/// Longueur maximale du texte, comme les témoignages.
const longueurMaxTexteMur = 2000;

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
    this.auteurNom = '',
    this.etablissementNom = '',
    this.texte = '',
    this.photo,
    this.nbJaime = 0,
    this.nbCommentaires = 0,
    this.aime = false,
    this.estAuteur = false,
    this.creeLe,
  });

  factory PublicationMur.fromJson(Map<String, dynamic> j) {
    final nbJaime = j['nb_jaime'];
    final nbCommentaires = j['nb_commentaires'];
    return PublicationMur(
      id: (j['id'] ?? '').toString(),
      auteurNom: (j['auteur_nom'] ?? '').toString(),
      etablissementNom: (j['etablissement_nom'] ?? '').toString(),
      texte: (j['texte'] ?? '').toString(),
      photo: (j['photo'] as String?)?.isEmpty == true ? null : j['photo'] as String?,
      nbJaime: nbJaime is int ? nbJaime : int.tryParse((nbJaime ?? '').toString()) ?? 0,
      nbCommentaires: nbCommentaires is int ? nbCommentaires : int.tryParse((nbCommentaires ?? '').toString()) ?? 0,
      aime: j['aime'] == true,
      estAuteur: j['est_auteur'] == true,
      creeLe: j['cree_le'] == null ? null : DateTime.tryParse(j['cree_le'].toString()),
    );
  }

  final String id;
  final String auteurNom;
  final String etablissementNom;
  final String texte;
  final String? photo;
  final int nbJaime;
  final int nbCommentaires;
  final bool aime;
  final bool estAuteur;
  final DateTime? creeLe;
}

/// Page Mur des membres : compositeur en haut, fil des
/// publications ensuite, les plus récentes d'abord. Le client
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
  bool _actionEnCours = false;
  final _texteControleur = TextEditingController();
  String? _photoDonnees;
  Uint8List? _photoOctets;

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
    super.dispose();
  }

  Future<void> _charger() async {
    try {
      final data = await _client.fetchMur();
      if (!mounted) return;
      setState(() {
        _charge = true;
        _erreur = false;
        _publications = ((data['publications'] as List?) ?? [])
            .whereType<Map<String, dynamic>>()
            .map(PublicationMur.fromJson)
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

  /// Photo du compositeur, réduite comme la photo de profil,
  /// 800 par 800 au plus, qualité 80, 700 Ko décodés au plus.
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
      });
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de publier.'));
    }
  }

  Future<void> _publier() async {
    final texte = _texteControleur.text.trim();
    if ((texte.isEmpty && _photoDonnees == null) || _actionEnCours) return;
    setState(() => _actionEnCours = true);
    try {
      await _client.publierMur(texte: texte, photo: _photoDonnees);
      if (!mounted) return;
      setState(() {
        _actionEnCours = false;
        _texteControleur.clear();
        _photoDonnees = null;
        _photoOctets = null;
      });
      await _charger();
      if (mounted) toast(context, tr('Publication publiée.'));
    } catch (_) {
      if (!mounted) return;
      setState(() => _actionEnCours = false);
      toast(context, tr('Impossible de publier.'));
    }
  }

  Future<void> _supprimer(PublicationMur p) async {
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
    if (confirmer != true || !mounted) return;
    try {
      await _client.supprimerPublicationMur(p.id);
      await _charger();
      if (mounted) toast(context, tr('Publication supprimée.'));
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de supprimer la publication.'));
    }
  }

  Future<void> _partager(PublicationMur p) async {
    final texte = p.texte.isNotEmpty
        ? '${p.texte}\n— ${p.auteurNom}, CONNEXION PROPHÉTIQUE'
        : tr('Mur des membres, CONNEXION PROPHÉTIQUE');
    try {
      await SharePlus.instance.share(ShareParams(text: texte));
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de partager cet élément.'));
    }
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
      _CarteCompositeur(
        controleur: _texteControleur,
        photoOctets: _photoOctets,
        enCours: _actionEnCours,
        onTexteChange: () => setState(() {}),
        onPhoto: _choisirPhoto,
        onRetirerPhoto: () => setState(() {
          _photoDonnees = null;
          _photoOctets = null;
        }),
        onPublier: _publier,
      ),
      const SizedBox(height: Cp.s2),
    ];
    if (_publications.isEmpty) {
      enfants.add(EmptyNote(icon: Icons.people_outlined, text: tr('Aucune publication pour le moment.')));
    }
    for (final p in _publications) {
      enfants.add(_CartePublication(
        publication: p,
        onSupprimer: () => _supprimer(p),
        onPartager: () => _partager(p),
      ));
      enfants.add(const SizedBox(height: Cp.s1));
    }
    return basic(tr('Mur des membres'), enfants, fond: Container(color: Cp.card), onRefresh: _charger);
  }
}

/// Compositeur du mur : champ, photo, Publier. Sans choix de
/// type, comme la maquette validée.
class _CarteCompositeur extends StatelessWidget {
  const _CarteCompositeur({
    required this.controleur,
    required this.photoOctets,
    required this.enCours,
    required this.onTexteChange,
    required this.onPhoto,
    required this.onRetirerPhoto,
    required this.onPublier,
  });

  final TextEditingController controleur;
  final Uint8List? photoOctets;
  final bool enCours;
  final VoidCallback onTexteChange;
  final VoidCallback onPhoto;
  final VoidCallback onRetirerPhoto;
  final VoidCallback onPublier;

  @override
  Widget build(BuildContext context) {
    final peutPublier = !enCours && (controleur.text.trim().isNotEmpty || photoOctets != null);
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
          const SizedBox(height: 8),
          Row(children: [
            TextButton.icon(
              onPressed: enCours ? null : onPhoto,
              icon: const Icon(Icons.photo_outlined),
              label: Text(tr('Photo')),
            ),
            const Spacer(),
            FilledButton(
              onPressed: peutPublier ? onPublier : null,
              child: Text(tr('Publier')),
            ),
          ]),
        ]),
      ),
    );
  }
}

/// Une carte du fil : auteur, établissement et date, texte,
/// photo quand il y en a, J'aime, commentaires et partage.
class _CartePublication extends StatelessWidget {
  const _CartePublication({required this.publication, required this.onSupprimer, required this.onPartager});

  final PublicationMur publication;
  final VoidCallback onSupprimer;
  final VoidCallback onPartager;

  @override
  Widget build(BuildContext context) {
    final p = publication;
    final photoOctets = octetsPhotoMur(p.photo);
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
          Row(children: [
            const CircleAvatar(
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
                if (p.etablissementNom.isNotEmpty || p.creeLe != null) ...[
                  const SizedBox(height: 2),
                  Text(
                    [p.etablissementNom, dateCourteMurPublication(p.creeLe)].where((s) => s.isNotEmpty).join(' · '),
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted),
                  ),
                ],
              ]),
            ),
            if (p.estAuteur)
              IconButton(
                tooltip: tr('Supprimer'),
                onPressed: onSupprimer,
                icon: const Icon(Icons.delete_outlined),
              ),
          ]),
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
          const SizedBox(height: 4),
          Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Expanded(
              child: AimesCommentaires(
                cibleType: 'mur',
                cibleId: p.id,
                nombreInitial: p.nbJaime,
                aAimeInitial: p.aime,
              ),
            ),
            TextButton.icon(
              onPressed: onPartager,
              icon: const Icon(Icons.share_outlined, size: 20, color: Cp.inkMuted),
              label: Text(tr('Partager'), style: const TextStyle(color: Cp.inkMuted, fontWeight: FontWeight.w700)),
              style: TextButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 4)),
            ),
          ]),
        ]),
      ),
    );
  }
}
