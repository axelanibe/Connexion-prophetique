// Nouvelle Connexion, tranche T3, 26 nov. 2026.
// Profil d'un membre du mur : en-tête bleu nuit, compteurs
// (publications, réactions reçues, abonnés, abonnements),
// bouton Suivre ou Suivi, onglets Publications et À propos
// (présentation, établissement, fonction, membre depuis).
// Pas de matricule sur ce profil, comme sur la maquette.
import 'package:flutter/material.dart';

import 'carte_publication.dart';
import 'modeles_connexion.dart';
import 'palette.dart';

class PageProfilConnexion extends StatefulWidget {
  const PageProfilConnexion({
    super.key,
    required this.service,
    required this.membreId,
    this.photosAuteurs = const {},
    this.onOuvrirDetail,
  });
  final ServiceConnexion service;
  final String membreId;
  final Map<String, String> photosAuteurs;
  final ValueChanged<PublicationConnexion>? onOuvrirDetail;

  @override
  State<PageProfilConnexion> createState() => _PageProfilConnexionState();
}

class _PageProfilConnexionState extends State<PageProfilConnexion> {
  ProfilConnexion? _profil;
  List<PublicationConnexion> _publications = [];
  String? _suivante;
  bool _chargement = true;
  String? _erreur;
  int _onglet = 0;
  bool _suiviEnCours = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    try {
      final page = await widget.service.chargerProfil(widget.membreId);
      if (!mounted) return;
      setState(() {
        _profil = page.profil;
        _publications = page.publications;
        _suivante = page.suivante;
        _chargement = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _chargement = false;
        _erreur = 'Ce profil ne peut pas être chargé pour le moment.';
      });
    }
  }

  Future<void> _chargerPlus() async {
    final suivante = _suivante;
    if (suivante == null) return;
    try {
      final page =
          await widget.service.chargerProfil(widget.membreId, avant: suivante);
      if (!mounted) return;
      setState(() {
        _publications = [..._publications, ...page.publications];
        _suivante = page.suivante;
      });
    } catch (_) {}
  }

  Future<void> _basculerSuivi() async {
    final profil = _profil;
    if (profil == null || _suiviEnCours) return;
    setState(() => _suiviEnCours = true);
    try {
      if (profil.suiviParMoi) {
        await widget.service.nePlusSuivre(profil.id);
      } else {
        await widget.service.suivre(profil.id);
      }
      if (!mounted) return;
      setState(() {
        _profil = profil.avecSuivi(!profil.suiviParMoi);
        _suiviEnCours = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() => _suiviEnCours = false);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Le suivi n’a pas pu être changé.')),
      );
    }
  }

  Future<void> _ouvrirListe(
      String titre, Future<List<MembreConnexion>> Function() charger) async {
    List<MembreConnexion> membres = [];
    try {
      membres = await charger();
    } catch (_) {}
    if (!mounted) return;
    await showModalBottomSheet<void>(
      context: context,
      builder: (_) => _FeuilleMembres(titre: titre, membres: membres),
    );
  }

  @override
  Widget build(BuildContext context) {
    final profil = _profil;
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
          'Profil',
          style: TextStyle(
              color: PaletteNouvelle.bleuNuit, fontWeight: FontWeight.w800),
        ),
      ),
      body: _chargement
          ? const Center(
              child: CircularProgressIndicator(color: PaletteNouvelle.bleuNuit))
          : _erreur != null || profil == null
              ? Center(
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: Text(_erreur ?? 'Profil introuvable.',
                        textAlign: TextAlign.center),
                  ),
                )
              : ListView(
                  padding: const EdgeInsets.fromLTRB(12, 12, 12, 24),
                  children: [
                    _EnteteProfil(
                      profil: profil,
                      suiviEnCours: _suiviEnCours,
                      onSuivi: _basculerSuivi,
                      onAbonnes: () => _ouvrirListe('Abonnés',
                          () => widget.service.chargerAbonnes(profil.id)),
                      onAbonnements: () => _ouvrirListe('Abonnements',
                          () => widget.service.chargerAbonnements(profil.id)),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        _Onglet(
                          libelle: 'Publications',
                          actif: _onglet == 0,
                          onTap: () => setState(() => _onglet = 0),
                        ),
                        const SizedBox(width: 8),
                        _Onglet(
                          libelle: 'À propos',
                          actif: _onglet == 1,
                          onTap: () => setState(() => _onglet = 1),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    if (_onglet == 0) ...[
                      if (_publications.isEmpty)
                        const Padding(
                          padding: EdgeInsets.symmetric(vertical: 24),
                          child: Center(
                              child:
                                  Text('Aucune publication pour le moment.')),
                        ),
                      for (final p in _publications) ...[
                        CartePublicationConnexion(
                          publication: p,
                          photoAuteur:
                              widget.photosAuteurs[p.auteurId] ?? profil.photo,
                          onCommentaires: () => widget.onOuvrirDetail?.call(p),
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
                    ] else
                      _APropos(profil: profil),
                  ],
                ),
    );
  }
}

class _EnteteProfil extends StatelessWidget {
  const _EnteteProfil({
    required this.profil,
    required this.suiviEnCours,
    required this.onSuivi,
    required this.onAbonnes,
    required this.onAbonnements,
  });
  final ProfilConnexion profil;
  final bool suiviEnCours;
  final VoidCallback onSuivi;
  final VoidCallback onAbonnes;
  final VoidCallback onAbonnements;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: PaletteNouvelle.bleuNuit,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: [
          AvatarConnexion(
              photo: profil.photo, nom: profil.nomComplet, taille: 72),
          const SizedBox(height: 10),
          Text(
            profil.nomComplet,
            textAlign: TextAlign.center,
            style: const TextStyle(
                color: Colors.white, fontSize: 19, fontWeight: FontWeight.w800),
          ),
          if (profil.fonction.isNotEmpty)
            Text(profil.fonction,
                style:
                    const TextStyle(color: PaletteNouvelle.or, fontSize: 14)),
          if (profil.etablissementNom.isNotEmpty)
            Text(profil.etablissementNom,
                style: const TextStyle(color: Colors.white70, fontSize: 13)),
          if (profil.presentation.isNotEmpty) ...[
            const SizedBox(height: 8),
            Text(
              profil.presentation,
              textAlign: TextAlign.center,
              style: const TextStyle(
                  color: Colors.white, fontSize: 14, height: 1.4),
            ),
          ],
          const SizedBox(height: 12),
          Wrap(
            alignment: WrapAlignment.center,
            children: [
              _Compteur(valeur: profil.nbPublications, libelle: 'Publications'),
              _Compteur(valeur: profil.nbReactions, libelle: 'Réactions'),
              _Compteur(
                  valeur: profil.nbAbonnes,
                  libelle: 'Abonnés',
                  onTap: onAbonnes),
              _Compteur(
                  valeur: profil.nbAbonnements,
                  libelle: 'Abonnements',
                  onTap: onAbonnements),
            ],
          ),
          if (!profil.estMoi) ...[
            const SizedBox(height: 12),
            FilledButton(
              style: FilledButton.styleFrom(
                backgroundColor:
                    profil.suiviParMoi ? Colors.white : PaletteNouvelle.or,
                foregroundColor: PaletteNouvelle.bleuNuit,
              ),
              onPressed: suiviEnCours ? null : onSuivi,
              child: Text(profil.suiviParMoi ? 'Suivi' : 'Suivre'),
            ),
          ],
        ],
      ),
    );
  }
}

class _Compteur extends StatelessWidget {
  const _Compteur({required this.valeur, required this.libelle, this.onTap});
  final int valeur;
  final String libelle;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final contenu = Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10),
      child: Column(
        children: [
          Text('$valeur',
              style: const TextStyle(
                  color: Colors.white,
                  fontSize: 17,
                  fontWeight: FontWeight.w800)),
          Text(libelle,
              style: const TextStyle(color: Colors.white70, fontSize: 12)),
        ],
      ),
    );
    if (onTap == null) return contenu;
    return InkWell(onTap: onTap, child: contenu);
  }
}

class _Onglet extends StatelessWidget {
  const _Onglet(
      {required this.libelle, required this.actif, required this.onTap});
  final String libelle;
  final bool actif;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: FilledButton(
        style: FilledButton.styleFrom(
          backgroundColor: actif ? PaletteNouvelle.bleuNuit : Colors.white,
          foregroundColor: actif ? Colors.white : PaletteNouvelle.bleuNuit,
        ),
        onPressed: onTap,
        child: Text(libelle),
      ),
    );
  }
}

class _APropos extends StatelessWidget {
  const _APropos({required this.profil});
  final ProfilConnexion profil;

  @override
  Widget build(BuildContext context) {
    final lignes = <(String, String)>[
      if (profil.presentation.isNotEmpty) ('Présentation', profil.presentation),
      if (profil.etablissementNom.isNotEmpty)
        ('Établissement', profil.etablissementNom),
      if (profil.fonction.isNotEmpty) ('Fonction', profil.fonction),
      if (profil.inscritLe != null)
        ('Membre depuis', formaterDateConnexion(profil.inscritLe)),
    ];
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE3E7EE)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (lignes.isEmpty) const Text('Aucune information pour le moment.'),
          for (final (titre, valeur) in lignes) ...[
            Text(titre,
                style: const TextStyle(
                    color: Colors.grey,
                    fontSize: 12,
                    fontWeight: FontWeight.w700)),
            const SizedBox(height: 2),
            Text(valeur,
                style: const TextStyle(
                    color: PaletteNouvelle.bleuNuit, fontSize: 15)),
            const SizedBox(height: 12),
          ],
        ],
      ),
    );
  }
}

class _FeuilleMembres extends StatelessWidget {
  const _FeuilleMembres({required this.titre, required this.membres});
  final String titre;
  final List<MembreConnexion> membres;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(titre,
                style: const TextStyle(
                    fontSize: 17,
                    fontWeight: FontWeight.w800,
                    color: PaletteNouvelle.bleuNuit)),
            const SizedBox(height: 8),
            ConstrainedBox(
              constraints: const BoxConstraints(maxHeight: 320),
              child: membres.isEmpty
                  ? const Padding(
                      padding: EdgeInsets.symmetric(vertical: 16),
                      child: Text('Personne pour le moment.'),
                    )
                  : ListView(
                      shrinkWrap: true,
                      children: [
                        for (final m in membres)
                          ListTile(
                            title: Text(m.nomComplet),
                            subtitle: m.etablissementNom.isEmpty
                                ? null
                                : Text(m.etablissementNom),
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
