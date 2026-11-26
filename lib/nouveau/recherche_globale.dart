// Recherche globale, T11, 26 nov. 2026.
// Remplace l'ancienne RechercheGlobalePage, qui cherchait dans
// les anciennes données : livres, membres, versets et actualités,
// sur les services existants, sans rien inventer. Un toucher
// ouvre la bonne page : le livre dans la Librairie, le verset
// dans la Bible, le membre dans son profil Connexion,
// l'actualité dans Connexion. Les événements sont déjà sur
// l'accueil, ils ne sont pas repris ici.
import 'dart:async';

import 'package:flutter/material.dart';

import '../api.dart';
import '../app_models.dart';
import '../bible.dart';
import 'modeles_connexion.dart';
import 'modeles_librairie.dart';
import 'page_profil_connexion.dart';
import 'palette.dart';

class PageRechercheGlobale extends StatefulWidget {
  const PageRechercheGlobale({
    super.key,
    required this.serviceConnexion,
    this.onOuvrirLivre,
    this.onOuvrirVerset,
    this.onOuvrirActualite,
  });
  final ServiceConnexion serviceConnexion;

  /// Livre touché : la racine ouvre l'onglet Librairie.
  final void Function(Book livre)? onOuvrirLivre;

  /// Verset touché, livre 0..65 et chapitre : la racine ouvre
  /// l'onglet Bible à cet endroit.
  final void Function(int livre, int chapitre)? onOuvrirVerset;

  /// Actualité touchée : la racine ouvre l'onglet Connexion.
  final VoidCallback? onOuvrirActualite;

  @override
  State<PageRechercheGlobale> createState() => _PageRechercheGlobaleState();
}

class _PageRechercheGlobaleState extends State<PageRechercheGlobale> {
  final _recherche = TextEditingController();
  Timer? _delai;
  var _requete = '';
  var _charge = true;
  var _livres = <Book>[];
  var _actualites = <Map<String, dynamic>>[];
  var _membres = <Map<String, dynamic>>[];
  var _versets = <BibleHit>[];

  @override
  void initState() {
    super.initState();
    _chargerCatalogues();
  }

  @override
  void dispose() {
    _delai?.cancel();
    _recherche.dispose();
    super.dispose();
  }

  Future<void> _chargerCatalogues() async {
    try {
      final lignes = await api.fetchLivres();
      var idLocal = 0;
      _livres = [
        for (final ligne in lignes) livreDepuisServeur(ligne, ++idLocal),
      ];
    } catch (_) {}
    try {
      _actualites = await api.fetchActualites();
    } catch (_) {}
    await BibleService.instance.load();
    if (mounted) setState(() => _charge = false);
  }

  void _surRequete(String v) {
    _delai?.cancel();
    _delai = Timer(const Duration(milliseconds: 300), () {
      if (!mounted) return;
      setState(() => _requete = v.trim());
      _chercher();
    });
  }

  Future<void> _chercher() async {
    final q = _requete;
    if (q.length < 2) {
      if (mounted) setState(() => _membres = []);
      return;
    }
    _versets = BibleService.instance.search('fr', q).take(10).toList();
    if (q.length >= 3) {
      try {
        _membres = await api.chercherMembresParNomOuMatricule(q);
      } catch (_) {
        _membres = [];
      }
    } else {
      _membres = [];
    }
    if (mounted) setState(() {});
  }

  List<Book> get _livresFiltres {
    final q = _requete.toLowerCase();
    if (q.isEmpty) return const [];
    return _livres
        .where((b) =>
            b.title.toLowerCase().contains(q) ||
            b.author.toLowerCase().contains(q))
        .toList();
  }

  List<Map<String, dynamic>> get _actualitesFiltrees {
    final q = _requete.toLowerCase();
    if (q.isEmpty) return const [];
    return _actualites
        .where((a) =>
            ((a['titre'] ?? '').toString().toLowerCase().contains(q) ||
                (a['texte'] ?? '').toString().toLowerCase().contains(q)))
        .toList();
  }

  @override
  Widget build(BuildContext context) {
    final vide = _requete.isEmpty;
    return Scaffold(
      backgroundColor: PaletteNouvelle.papier,
      appBar: AppBar(
        backgroundColor: Colors.white,
        foregroundColor: PaletteNouvelle.bleuNuit,
        title: TextField(
          controller: _recherche,
          autofocus: true,
          onChanged: _surRequete,
          decoration: const InputDecoration(
            hintText: 'Rechercher',
            border: InputBorder.none,
          ),
        ),
      ),
      body: _charge
          ? const Center(child: CircularProgressIndicator())
          : vide
              ? const Center(
                  child: Text('Livres, membres, versets et actualités.'))
              : ListView(
                  padding: const EdgeInsets.all(16),
                  children: [
                    if (_livresFiltres.isNotEmpty)
                      _Section(
                        titre: 'Livres',
                        enfants: [
                          for (final livre in _livresFiltres)
                            ListTile(
                              title: Text(livre.title),
                              subtitle: Text(livre.author),
                              onTap: () =>
                                  widget.onOuvrirLivre?.call(livre),
                            ),
                        ],
                      ),
                    if (_membres.isNotEmpty)
                      _Section(
                        titre: 'Membres',
                        enfants: [
                          for (final membre in _membres)
                            ListTile(
                              title: Text(
                                  (membre['nom_complet'] ?? '').toString()),
                              subtitle: Text([
                                (membre['matricule'] ?? '').toString(),
                                (membre['etablissement'] ?? '').toString(),
                              ].where((s) => s.isNotEmpty).join(' · ')),
                              onTap: () {
                                final id =
                                    (membre['id'] ?? '').toString();
                                if (id.isEmpty) return;
                                Navigator.of(context).push(
                                  MaterialPageRoute(
                                    builder: (_) => PageProfilConnexion(
                                      service: widget.serviceConnexion,
                                      membreId: id,
                                    ),
                                  ),
                                );
                              },
                            ),
                        ],
                      ),
                    if (_versets.isNotEmpty)
                      _Section(
                        titre: 'Versets',
                        enfants: [
                          for (final hit in _versets)
                            ListTile(
                              title: Text(
                                  '${BibleService.instance.bookName('fr', hit.book)} ${hit.chapter}, ${hit.verse}'),
                              subtitle: Text(hit.text,
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis),
                              onTap: () => widget.onOuvrirVerset
                                  ?.call(hit.book, hit.chapter),
                            ),
                        ],
                      ),
                    if (_actualitesFiltrees.isNotEmpty)
                      _Section(
                        titre: 'Actualités',
                        enfants: [
                          for (final actu in _actualitesFiltrees)
                            ListTile(
                              title:
                                  Text((actu['titre'] ?? '').toString()),
                              subtitle: Text(
                                  (actu['texte'] ?? '').toString(),
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis),
                              onTap: widget.onOuvrirActualite,
                            ),
                        ],
                      ),
                    if (_livresFiltres.isEmpty &&
                        _membres.isEmpty &&
                        _versets.isEmpty &&
                        _actualitesFiltrees.isEmpty)
                      const Padding(
                        padding: EdgeInsets.only(top: 32),
                        child: Text('Aucun résultat.',
                            textAlign: TextAlign.center),
                      ),
                  ],
                ),
    );
  }
}

class _Section extends StatelessWidget {
  const _Section({required this.titre, required this.enfants});
  final String titre;
  final List<Widget> enfants;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(titre,
            style: const TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.w800,
                color: PaletteNouvelle.bleuNuit)),
        const SizedBox(height: 4),
        ...enfants,
        const SizedBox(height: 16),
      ],
    );
  }
}
