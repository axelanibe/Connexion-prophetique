// Détail d'une publication du mur, mur v2 tranche 1,
// 25 nov. 2026 : la même carte que le fil, avec les
// commentaires existants, photo de l'auteur par route batch.
import 'dart:async';

import 'package:flutter/material.dart';

import 'api.dart';
import 'i18n.dart';
import 'main.dart';
import 'mur_membres.dart';
import 'mur_profil.dart';

import 'messagerie_screens.dart' deferred as messagerie;

/// Page détail d'une publication : la carte du fil, seule,
/// avec ses J'aime et ses commentaires. La publication
/// initiale, quand le fil l'a déjà, s'affiche tout de suite,
/// puis la page recharge la copie fraîche.
class MurDetailPage extends StatefulWidget {
  const MurDetailPage({super.key, required this.publicationId, this.publicationInitiale, this.client});

  final String publicationId;
  final PublicationMur? publicationInitiale;
  final ApiClient? client;

  @override
  State<MurDetailPage> createState() => _MurDetailPageState();
}

class _MurDetailPageState extends State<MurDetailPage> {
  PublicationMur? _publication;
  bool _charge = false;
  bool _erreur = false;
  String? _photoAuteur;

  ApiClient get _client => widget.client ?? api;

  @override
  void initState() {
    super.initState();
    _publication = widget.publicationInitiale;
    _charge = _publication != null;
    unawaited(_charger());
  }

  Future<void> _charger() async {
    try {
      final data = await _client.fetchMurDetail(widget.publicationId);
      if (!mounted) return;
      final brut = data['publication'] as Map<String, dynamic>?;
      if (brut == null) {
        setState(() {
          _charge = true;
          _erreur = true;
        });
        return;
      }
      final p = PublicationMur.fromJson(brut);
      setState(() {
        _publication = p;
        _charge = true;
        _erreur = false;
      });
      unawaited(_chargerPhotoAuteur(p.auteurId));
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _charge = true;
        _erreur = true;
      });
    }
  }

  Future<void> _chargerPhotoAuteur(String auteurId) async {
    if (auteurId.isEmpty) return;
    try {
      final data = await _client.fetchPhotosAuteurs([auteurId]);
      if (!mounted) return;
      final photos = ((data['photos'] as List?) ?? []).whereType<Map<String, dynamic>>();
      if (photos.isNotEmpty) setState(() => _photoAuteur = photos.first['photo'] as String?);
    } catch (_) {}
  }

  Future<void> _supprimer(PublicationMur p) async {
    if (!await confirmerSuppressionMur(context) || !mounted) return;
    try {
      await _client.supprimerPublicationMur(p.id);
      if (!mounted) return;
      Navigator.of(context).pop();
      toast(context, tr('Publication supprimée.'));
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de supprimer la publication.'));
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

  @override
  Widget build(BuildContext context) {
    if (!_charge) {
      return basic(tr('Détail de la publication'), const [Center(child: CircularProgressIndicator())],
          fond: Container(color: Cp.card));
    }
    final p = _publication;
    if (_erreur || p == null) {
      return basic(
        tr('Détail de la publication'),
        [
          Center(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Text(tr('Impossible de charger la publication.'), textAlign: TextAlign.center),
            ),
          ),
        ],
        fond: Container(color: Cp.card),
        onRefresh: _charger,
      );
    }
    return basic(
      tr('Détail de la publication'),
      [
        CartePublicationMur(
          publication: p,
          photoAuteur: _photoAuteur,
          onSupprimer: () => _supprimer(p),
          onSupprimerVideo: () => _supprimerVideo(p),
          onPartager: () => partagerPublicationMur(context, p),
          onBasculerEnregistrement: () => _basculerEnregistrement(p),
          onSignaler: () => _signaler(p),
          onOuvrirProfil: p.auteurId.isEmpty
              ? null
              : () => Navigator.of(context).push(MaterialPageRoute(
                    builder: (_) => MurProfilPage(membreId: p.auteurId, client: _client),
                  )),
        ),
      ],
      fond: Container(color: Cp.card),
      onRefresh: _charger,
    );
  }
}
