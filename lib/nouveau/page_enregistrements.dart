// Nouvelle Connexion, tranche T3, 26 nov. 2026.
// Mes enregistrements : la liste s'ouvre par l'icône
// marque-page dans la bande de Connexion, jamais par le tiroir.
import 'package:flutter/material.dart';

import 'carte_publication.dart';
import 'modeles_connexion.dart';
import 'palette.dart';

class PageEnregistrementsConnexion extends StatefulWidget {
  const PageEnregistrementsConnexion({
    super.key,
    required this.service,
    this.photosAuteurs = const {},
    this.onOuvrirDetail,
    this.onOuvrirProfil,
  });
  final ServiceConnexion service;
  final Map<String, String> photosAuteurs;
  final ValueChanged<PublicationConnexion>? onOuvrirDetail;
  final ValueChanged<String>? onOuvrirProfil;

  @override
  State<PageEnregistrementsConnexion> createState() =>
      _PageEnregistrementsConnexionState();
}

class _PageEnregistrementsConnexionState
    extends State<PageEnregistrementsConnexion> {
  List<PublicationConnexion> _publications = [];
  String? _suivante;
  bool _chargement = true;
  String? _erreur;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    try {
      final page = await widget.service.chargerEnregistrements();
      if (!mounted) return;
      setState(() {
        _publications = page.publications;
        _suivante = page.suivante;
        _chargement = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _chargement = false;
        _erreur =
            'Les enregistrements ne peuvent pas être chargés pour le moment.';
      });
    }
  }

  Future<void> _chargerPlus() async {
    final suivante = _suivante;
    if (suivante == null) return;
    try {
      final page = await widget.service.chargerEnregistrements(avant: suivante);
      if (!mounted) return;
      setState(() {
        _publications = [..._publications, ...page.publications];
        _suivante = page.suivante;
      });
    } catch (_) {}
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PaletteNouvelle.papier,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: PaletteNouvelle.bleuNuit),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: const Text(
          'Enregistrements',
          style: TextStyle(
              color: PaletteNouvelle.bleuNuit, fontWeight: FontWeight.w800),
        ),
      ),
      body: _chargement
          ? const Center(
              child: CircularProgressIndicator(color: PaletteNouvelle.bleuNuit))
          : _erreur != null
              ? Center(
                  child: Padding(
                      padding: const EdgeInsets.all(24),
                      child: Text(_erreur!, textAlign: TextAlign.center)))
              : _publications.isEmpty
                  ? const Center(
                      child: Text('Aucun enregistrement pour le moment.'))
                  : ListView(
                      padding: const EdgeInsets.fromLTRB(12, 12, 12, 24),
                      children: [
                        for (final p in _publications) ...[
                          CartePublicationConnexion(
                            publication: p,
                            photoAuteur: widget.photosAuteurs[p.auteurId],
                            onAuteur: () =>
                                widget.onOuvrirProfil?.call(p.auteurId),
                            onCommentaires: () =>
                                widget.onOuvrirDetail?.call(p),
                          ),
                          const SizedBox(height: 12),
                        ],
                        if (_suivante != null)
                          Center(
                            child: TextButton(
                              onPressed: _chargerPlus,
                              child: const Text('Afficher plus'),
                            ),
                          ),
                      ],
                    ),
    );
  }
}
