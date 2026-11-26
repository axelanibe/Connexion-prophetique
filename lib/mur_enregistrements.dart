// Mes enregistrements du mur, mur v2 tranche 5, 25 nov. 2026 :
// publications enregistrées par le marque-page, par date
// d'enregistrement, même carte que le fil, même menu Signaler.
// S'ouvre par l'icône marque-page dans l'en-tête du Mur, sans
// entrée de tiroir nouvelle.
import 'dart:async';

import 'package:flutter/material.dart';

import 'api.dart';
import 'i18n.dart';
import 'main.dart';
import 'mur_detail.dart';
import 'mur_membres.dart';
import 'mur_profil.dart';

import 'messagerie_screens.dart' deferred as messagerie;

class MurEnregistrementsPage extends StatefulWidget {
  const MurEnregistrementsPage({super.key, this.client});

  final ApiClient? client;

  @override
  State<MurEnregistrementsPage> createState() => _MurEnregistrementsPageState();
}

class _MurEnregistrementsPageState extends State<MurEnregistrementsPage> {
  ApiClient get _client => widget.client ?? api;

  bool _charge = false;
  bool _erreur = false;
  bool _chargePlus = false;
  List<PublicationMur> _publications = [];
  String? _suivante;
  final _photosAuteurs = <String, String?>{};

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger({bool pageSuivante = false}) async {
    if (pageSuivante) {
      if (_suivante == null) return;
      setState(() => _chargePlus = true);
    }
    try {
      final data = await _client.fetchEnregistrements(avant: pageSuivante ? _suivante : null);
      if (!mounted) return;
      final page = ((data['publications'] as List?) ?? [])
          .whereType<Map<String, dynamic>>()
          .map(PublicationMur.fromJson)
          .toList();
      final suivante = (data['suivante'] as String?)?.isEmpty == true ? null : data['suivante'] as String?;
      setState(() {
        _charge = true;
        _erreur = false;
        _chargePlus = false;
        _publications = pageSuivante ? [..._publications, ...page] : page;
        _suivante = suivante;
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
  /// auteurs pas encore en cache.
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

  /// Retirer un enregistrement le fait disparaître de cette
  /// liste au rechargement.
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
      return basic(tr('Mes enregistrements'), const [Center(child: CircularProgressIndicator())], fond: Container(color: Cp.card));
    }
    if (_erreur) {
      return basic(
        tr('Mes enregistrements'),
        [
          Center(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Text(tr('Impossible de charger les enregistrements.'), textAlign: TextAlign.center),
            ),
          ),
        ],
        fond: Container(color: Cp.card),
        onRefresh: _charger,
      );
    }
    final enfants = <Widget>[];
    if (_publications.isEmpty) {
      enfants.add(EmptyNote(icon: Icons.bookmark_outlined, text: tr('Aucun enregistrement pour le moment.')));
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
    return basic(tr('Mes enregistrements'), enfants, fond: Container(color: Cp.card), onRefresh: _charger);
  }
}
