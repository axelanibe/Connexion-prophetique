// Nouvelle Librairie, tranche T7, 26 nov. 2026.
// Titre Connexion Prophétique sur la même ligne que le
// panier avec pastille et le bouton + Ajouter, filtres Tous,
// Nouveautés, Mes achats sur une seule ligne en pastilles
// de largeur égale, recherche tactile ouvrant une feuille
// en bas comme le tiroir de l'indicatif du pays à
// l'inscription, livres en sections repliables par
// catégorie, bouton Acheter gardé à sa place, menu trois
// points Partager, Modifier, Retirer. Données par l'API
// existante, l'espace en ligne est le modèle. Pas de cartes
// couverture 2:3, pas de page panier avec paiement : le
// sac ouvre seulement la liste du panier avec son total.
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../app_models.dart';
import 'modeles_librairie.dart';
import 'palette.dart';
import 'service_librairie.dart';

const _grisFond = Color(0xFFF1F3F5);
const _grisTexte = Color(0xFF6B7280);
const _grisBord = Color(0xFFE5E7EB);
const _vert = Color(0xFF059669);

class PageLibrairieNouvelle extends StatefulWidget {
  const PageLibrairieNouvelle({super.key, this.service, this.onLireLivre});
  final ServiceLibrairie? service;

  /// Ouverture du lecteur pour un livre acheté, branchée
  /// à la bascule T11. Sans elle, un message le dit.
  final void Function(Book livre)? onLireLivre;

  @override
  State<PageLibrairieNouvelle> createState() => _PageLibrairieNouvelleState();
}

class _PageLibrairieNouvelleState extends State<PageLibrairieNouvelle> {
  late final ServiceLibrairie _service;
  var _filtre = FiltreLibrairie.tous;
  var _requete = '';
  var _charge = false;
  final _repliees = <String>{};

  @override
  void initState() {
    super.initState();
    _service = widget.service ?? ServiceLibrairieReel();
    _charger();
  }

  Future<void> _charger() async {
    await _service.charger();
    if (mounted) setState(() => _charge = true);
  }

  List<Book> get _visibles => filtrerLivres(
        _service.livres,
        requete: _requete,
        filtre: _filtre,
        estAchete: _service.estAchete,
      );

  void _dire(String message) {
    if (!mounted) return;
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text(message)));
  }

  /// Feuille de recherche, patron de choisirIndicatif :
  /// 85 % de hauteur, titre, champ en haut, liste des
  /// livres en dessous. Saisir filtre la liste et le
  /// catalogue en direct ; toucher un livre le choisit et
  /// referme la feuille.
  Future<void> _ouvrirRecherche() async {
    var requeteFeuille = _requete;
    var generation = 0;
    final choisi = await showModalBottomSheet<String>(
      context: context,
      isScrollControlled: true,
      backgroundColor: PaletteNouvelle.papier,
      shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(16))),
      builder: (ctx) => StatefulBuilder(builder: (ctx, setS) {
        final resultats =
            filtrerLivres(_service.livres, requete: requeteFeuille);
        return SizedBox(
          height: MediaQuery.of(ctx).size.height * 0.85,
          child: Padding(
            padding: EdgeInsets.fromLTRB(
                16, 16, 16, MediaQuery.of(ctx).viewInsets.bottom + 16),
            child: Column(children: [
              const Text('Rechercher un livre',
                  style: TextStyle(
                      fontSize: 17,
                      fontWeight: FontWeight.w800,
                      color: PaletteNouvelle.bleuNuit)),
              const SizedBox(height: 12),
              TextFormField(
                key: ValueKey('recherche-$generation'),
                initialValue: _requete,
                autofocus: true,
                decoration: InputDecoration(
                  prefixIcon: const Icon(LucideIcons.search),
                  hintText: 'Rechercher un titre, un auteur…',
                  filled: true,
                  fillColor: Colors.white,
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(14)),
                ),
                onChanged: (v) {
                  setS(() => requeteFeuille = v);
                  setState(() => _requete = v);
                },
              ),
              if (requeteFeuille.trim().isNotEmpty) ...[
                const SizedBox(height: 4),
                Align(
                  alignment: Alignment.centerLeft,
                  child: TextButton(
                    onPressed: () {
                      setS(() {
                        requeteFeuille = '';
                        generation++;
                      });
                      setState(() => _requete = '');
                    },
                    child: const Text('Effacer la recherche'),
                  ),
                ),
              ],
              const SizedBox(height: 4),
              Expanded(
                child: resultats.isEmpty
                    ? const Center(child: Text('Aucun livre trouvé.'))
                    : ListView(children: [
                        for (final livre in resultats)
                          ListTile(
                            title: Text(livre.title,
                                style: const TextStyle(
                                    fontWeight: FontWeight.w600)),
                            subtitle: Text(livre.author),
                            trailing: Text(fcfaLivre(livre.price),
                                style: const TextStyle(
                                    color: PaletteNouvelle.orFonce,
                                    fontWeight: FontWeight.w700)),
                            onTap: () => Navigator.pop(ctx, livre.title),
                          ),
                      ]),
              ),
            ]),
          ),
        );
      }),
    );
    if (choisi != null && mounted) setState(() => _requete = choisi);
  }

  /// Panier, sans paiement : lignes, total, retrait. Un vrai
  /// panneau (60 % de l'écran), pas le petit carré vide que
  /// montrait la feuille à la hauteur de son contenu.
  Future<void> _ouvrirPanier() async {
    await showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(16))),
      builder: (ctx) {
        return SizedBox(
          height: MediaQuery.of(ctx).size.height * 0.62,
          child: StatefulBuilder(
            builder: (ctx, setFeuille) => Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Center(
                    child: Container(
                      width: 40,
                      height: 4,
                      decoration: BoxDecoration(
                        color: _grisBord,
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      const Expanded(
                        child: Text('Panier',
                            style: TextStyle(
                                fontSize: 17,
                                fontWeight: FontWeight.w800,
                                color: PaletteNouvelle.bleuNuit)),
                      ),
                      IconButton(
                        tooltip: 'Fermer',
                        icon: const Icon(Icons.close),
                        onPressed: () => Navigator.pop(ctx),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Expanded(
                    child: _service.panier.isEmpty
                        ? const Center(
                            child: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Icon(LucideIcons.shoppingBag,
                                    size: 40, color: _grisTexte),
                                SizedBox(height: 12),
                                Text('Votre panier est vide.'),
                              ],
                            ),
                          )
                        : ListView(
                            children: [
                              for (final livre in _service.panier)
                                ListTile(
                                  contentPadding: EdgeInsets.zero,
                                  title: Text(livre.title,
                                      style: const TextStyle(
                                          fontWeight: FontWeight.w600)),
                                  subtitle: Text(fcfaLivre(livre.price)),
                                  trailing: IconButton(
                                    tooltip: 'Retirer',
                                    icon: const Icon(Icons.delete_outlined),
                                    onPressed: () async {
                                      await _service.retirerDuPanier(livre);
                                      setFeuille(() {});
                                      if (mounted) setState(() {});
                                    },
                                  ),
                                ),
                            ],
                          ),
                  ),
                  if (_service.panier.isNotEmpty) ...[
                    const Divider(),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('Total à régler',
                            style: TextStyle(fontWeight: FontWeight.w700)),
                        Text(
                            fcfaLivre(_service.panier
                                .fold<int>(0, (s, b) => s + b.price)),
                            style: const TextStyle(
                                fontWeight: FontWeight.w800,
                                color: PaletteNouvelle.orFonce)),
                      ],
                    ),
                  ],
                ],
              ),
            ),
          ),
        );
      },
    );
    if (mounted) setState(() {});
  }

  /// Formulaire Ajouter et Modifier, mêmes champs que la
  /// feuille en ligne, avec la catégorie (liste fermée) et
  /// l'import du fichier PDF ou EPUB, T11. Les octets sont
  /// lus par le sélecteur, jamais un chemin, pour que le
  /// web choisisse aussi le fichier.
  Future<void> _feuilleLivre({Book? livre}) async {
    var titre = livre?.title ?? '';
    var auteur = livre?.author ?? '';
    var prix = livre == null ? '' : livre.price.toString();
    var format = livre?.format ?? '';
    var description = livre?.description ?? '';
    var categorie = livre == null ? 'À classer' : categorieLivre(livre);
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
            bool nombre = false,
            required void Function(String v) onChanged}) {
          return Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: TextFormField(
              initialValue: valeur,
              maxLines: lignes,
              keyboardType: nombre
                  ? TextInputType.number
                  : (lignes > 1 ? TextInputType.multiline : TextInputType.text),
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
                Text(livre == null ? 'Nouveau livre' : 'Modifier le livre',
                    style: const TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w800,
                        color: PaletteNouvelle.bleuNuit)),
                const SizedBox(height: 12),
                champ(titre, 'Titre', onChanged: (v) => titre = v),
                champ(auteur, 'Auteur', onChanged: (v) => auteur = v),
                champ(prix, 'Prix (FCFA)',
                    nombre: true, onChanged: (v) => prix = v),
                champ(format, 'Format (PDF, EPUB…)',
                    onChanged: (v) => format = v),
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
                      for (final c in kCategoriesLivre)
                        DropdownMenuItem(value: c, child: Text(c)),
                    ],
                    onChanged: (v) {
                      if (v != null) categorie = v;
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: OutlinedButton.icon(
                    onPressed: () async {
                      final choix = await FilePicker.platform.pickFiles(
                        type: FileType.custom,
                        allowedExtensions: const ['pdf', 'epub'],
                        withData: true,
                      );
                      final f = choix?.files.single;
                      if (f == null) return;
                      final octets = f.bytes;
                      if (octets == null || octets.isEmpty) {
                        setS(() => erreur =
                            'Fichier illisible. Choisis un PDF ou un EPUB.');
                        return;
                      }
                      setS(() {
                        fichierBytes = octets;
                        fichierNom = f.name;
                        erreur = '';
                      });
                    },
                    icon: const Icon(Icons.upload_file_outlined),
                    label: Text(fichierNom ?? 'Fichier PDF ou EPUB'),
                  ),
                ),
                champ(description, 'Description',
                    lignes: 3, onChanged: (v) => description = v),
                if (erreur.isNotEmpty)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child:
                        Text(erreur, style: const TextStyle(color: Colors.red)),
                  ),
                SizedBox(
                  width: double.infinity,
                  height: 48,
                  child: FilledButton(
                    style: FilledButton.styleFrom(
                        backgroundColor: PaletteNouvelle.bleuNuit),
                    onPressed: () async {
                      final p =
                          int.tryParse(prix.replaceAll(RegExp(r'[^0-9]'), ''));
                      if (titre.trim().isEmpty ||
                          auteur.trim().isEmpty ||
                          p == null ||
                          p < 1) {
                        setS(() => erreur =
                            'Titre, auteur et prix (1 FCFA minimum) sont obligatoires.');
                        return;
                      }
                      try {
                        if (livre == null) {
                          await _service.publierLivre(
                            titre: titre.trim(),
                            auteur: auteur.trim(),
                            prixFcfa: p,
                            description: description.trim(),
                            format: format.trim(),
                            categorie: categorie,
                            fichierBytes: fichierBytes,
                            fichierNom: fichierNom,
                          );
                        } else {
                          await _service.modifierLivre(
                            livre,
                            titre: titre.trim(),
                            auteur: auteur.trim(),
                            prixFcfa: p,
                            description: description.trim(),
                            format: format.trim(),
                            categorie: categorie,
                            fichierBytes: fichierBytes,
                            fichierNom: fichierNom,
                          );
                        }
                        if (ctx.mounted) Navigator.pop(ctx, true);
                      } catch (e) {
                        setS(() => erreur = 'Publication refusée ($e).');
                      }
                    },
                    child: Text(livre == null ? 'Publier' : 'Enregistrer'),
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
      _dire(livre == null ? 'Livre publié.' : 'Livre modifié.');
    }
  }

  Future<void> _retirerLivre(Book livre) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Retirer ce livre ?'),
        content: const Text(
            'Le livre disparaîtra du catalogue. Les achats déjà payés ne changent pas.'),
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
      await _service.retirerLivre(livre);
      if (mounted) setState(() {});
      _dire('Livre retiré du catalogue.');
    } catch (e) {
      _dire('Retrait refusé ($e).');
    }
  }

  Future<void> _acheter(Book livre) async {
    final action = await _service.acheter(livre);
    if (!mounted) return;
    setState(() {});
    switch (action) {
      case ActionAchat.lire:
        if (widget.onLireLivre != null) {
          widget.onLireLivre!(livre);
        } else {
          _dire('Ouverture du livre à la bascule.');
        }
      case ActionAchat.voirPanier:
        _ouvrirPanier();
      case ActionAchat.ajoute:
        _dire('Ajouté au panier.');
    }
  }

  Widget _pastille(FiltreLibrairie valeur) {
    final actif = _filtre == valeur;
    return Expanded(
      child: InkWell(
        customBorder: const StadiumBorder(),
        onTap: () => setState(() => _filtre = valeur),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          decoration: BoxDecoration(
            color: actif ? PaletteNouvelle.bleuNuit : _grisFond,
            borderRadius: BorderRadius.circular(20),
          ),
          alignment: Alignment.center,
          child: Text(valeur.libelle,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                  color: actif ? Colors.white : _grisTexte,
                  fontSize: 12,
                  fontWeight: actif ? FontWeight.w700 : FontWeight.w500)),
        ),
      ),
    );
  }

  Widget _carteLivre(Book livre) {
    final achete = _service.estAchete(livre);
    final dansPanier = _service.dansPanier(livre);
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(children: [
              Expanded(
                child: Text(livre.title,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                        fontSize: 15, fontWeight: FontWeight.w700)),
              ),
              PopupMenuButton<String>(
                tooltip: 'Actions',
                icon: const Icon(LucideIcons.ellipsisVertical),
                onSelected: (v) async {
                  if (v == 'partager') {
                    await _service.partager(livre);
                  } else if (v == 'modifier') {
                    await _feuilleLivre(livre: livre);
                  } else if (v == 'retirer') {
                    await _retirerLivre(livre);
                  }
                },
                itemBuilder: (_) => [
                  const PopupMenuItem(
                      value: 'partager', child: Text('Partager')),
                  if (_service.estAdminGeneral)
                    const PopupMenuItem(
                        value: 'modifier', child: Text('Modifier')),
                  if (_service.estAdminGeneral)
                    const PopupMenuItem(
                        value: 'retirer',
                        child: Text('Retirer',
                            style: TextStyle(color: Colors.red))),
                ],
              ),
            ]),
            Text(livre.author,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(color: _grisTexte)),
            const SizedBox(height: 8),
            Wrap(spacing: 6, runSpacing: 6, children: [
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                    color: const Color(0xFFFEF3C7),
                    border: Border.all(color: const Color(0xFFFDE68A)),
                    borderRadius: BorderRadius.circular(8)),
                child: Text(fcfaLivre(livre.price),
                    style: const TextStyle(
                        color: PaletteNouvelle.orFonce,
                        fontWeight: FontWeight.w700)),
              ),
              if (livreEstNouveau(livre))
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                      color: _grisFond, borderRadius: BorderRadius.circular(8)),
                  child: const Text('Nouveau',
                      style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: _grisTexte)),
                ),
              if (livre.format.trim().isNotEmpty)
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                      color: _grisFond, borderRadius: BorderRadius.circular(8)),
                  child: Text(livre.format.trim(),
                      style: const TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: _grisTexte)),
                ),
            ]),
            const SizedBox(height: 8),
            Row(children: [
              Icon(achete ? Icons.check_circle : Icons.lock_outlined,
                  size: 14, color: achete ? _vert : _grisTexte),
              const SizedBox(width: 4),
              Expanded(
                child: Text(
                    achete
                        ? 'Fichier débloqué • Prêt à lire'
                        : 'Accès immédiat après paiement',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                        fontSize: 11, color: achete ? _vert : _grisTexte)),
              ),
            ]),
            const SizedBox(height: 12),
            SizedBox(
              width: double.infinity,
              height: 48,
              child: achete
                  ? FilledButton(
                      style: FilledButton.styleFrom(backgroundColor: _vert),
                      onPressed: () => _acheter(livre),
                      child: const Text("Lire l'ouvrage"),
                    )
                  : dansPanier
                      ? FilledButton(
                          style: FilledButton.styleFrom(
                              backgroundColor: const Color(0xFF1E3A5F)),
                          onPressed: () => _acheter(livre),
                          child: const Text('Déjà dans le panier'),
                        )
                      : FilledButton(
                          style: FilledButton.styleFrom(
                              backgroundColor: PaletteNouvelle.bleuNuit),
                          onPressed: () => _acheter(livre),
                          child: const Text('Acheter'),
                        ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final visibles = _visibles;
    final compteur =
        '${visibles.length} ${visibles.length == 1 ? 'ouvrage disponible' : 'ouvrages disponibles'}';
    final sections = grouperLivresParCategorie(visibles);
    final nbPanier = _service.panier.length;
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
              color: Colors.white, borderRadius: BorderRadius.circular(16)),
          child: Column(children: [
            Row(children: [
              const Expanded(
                child: Text('CONNEXION PROPHÉTIQUE',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                        fontFamily: 'Cinzel',
                        fontSize: 11.5,
                        fontWeight: FontWeight.w700,
                        letterSpacing: 0.8,
                        color: PaletteNouvelle.orFonce)),
              ),
              const SizedBox(width: 8),
              Container(
                decoration: BoxDecoration(
                    color: _grisFond, borderRadius: BorderRadius.circular(12)),
                child: IconButton(
                  key: const ValueKey('boutonPanier'),
                  tooltip: 'Panier',
                  icon: Badge(
                      backgroundColor: PaletteNouvelle.or,
                      isLabelVisible: nbPanier > 0,
                      label: Text('$nbPanier',
                          style: const TextStyle(
                              color: Colors.white,
                              fontSize: 10,
                              fontWeight: FontWeight.bold)),
                      child: const Icon(LucideIcons.shoppingBag,
                          color: _grisTexte)),
                  onPressed: _ouvrirPanier,
                ),
              ),
              if (_service.estAdminGeneral) ...[
                const SizedBox(width: 4),
                OutlinedButton(
                  key: const ValueKey('boutonAjouter'),
                  style: OutlinedButton.styleFrom(
                      side: const BorderSide(color: _grisBord),
                      foregroundColor: PaletteNouvelle.bleuNuit),
                  onPressed: () => _feuilleLivre(),
                  child: const Text('+ Ajouter'),
                ),
              ],
            ]),
            const SizedBox(height: 12),
            InkWell(
              key: const ValueKey('champRecherche'),
              borderRadius: BorderRadius.circular(12),
              onTap: _ouvrirRecherche,
              child: Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
                decoration: BoxDecoration(
                    color: _grisFond, borderRadius: BorderRadius.circular(12)),
                child: Row(children: [
                  const Icon(LucideIcons.search, color: _grisTexte),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                        _requete.isEmpty
                            ? 'Rechercher un titre, un auteur…'
                            : _requete,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                            color: _requete.isEmpty
                                ? _grisTexte
                                : PaletteNouvelle.bleuNuit)),
                  ),
                  if (_requete.isNotEmpty)
                    InkWell(
                      key: const ValueKey('effacerRecherche'),
                      customBorder: const CircleBorder(),
                      onTap: () => setState(() => _requete = ''),
                      child: const Icon(LucideIcons.x,
                          size: 18, color: _grisTexte),
                    ),
                ]),
              ),
            ),
            const SizedBox(height: 12),
            Row(children: [
              _pastille(FiltreLibrairie.tous),
              const SizedBox(width: 8),
              _pastille(FiltreLibrairie.nouveautes),
              const SizedBox(width: 8),
              _pastille(FiltreLibrairie.achats),
            ]),
          ]),
        ),
        Padding(
          padding: const EdgeInsets.only(top: 16, bottom: 8),
          child: Text(compteur,
              style: const TextStyle(fontSize: 12, color: _grisTexte)),
        ),
        if (!_charge)
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 48),
            child: Center(child: CircularProgressIndicator()),
          )
        else if (_service.livres.isEmpty)
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(vertical: 48, horizontal: 16),
            decoration: BoxDecoration(
                color: Colors.white, borderRadius: BorderRadius.circular(16)),
            child: Column(children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                    color: _grisFond, borderRadius: BorderRadius.circular(12)),
                child: const Icon(Icons.book_outlined, color: _grisTexte),
              ),
              const SizedBox(height: 12),
              Text(
                  _service.aEchoue
                      ? 'Catalogue indisponible hors ligne.'
                      : 'Le catalogue est vide. La structure ajoute les ouvrages depuis son espace.',
                  textAlign: TextAlign.center,
                  style: const TextStyle(color: _grisTexte)),
            ]),
          )
        else if (visibles.isEmpty)
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(vertical: 48, horizontal: 16),
            decoration: BoxDecoration(
                color: Colors.white, borderRadius: BorderRadius.circular(16)),
            child: Column(children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                    color: _grisFond, borderRadius: BorderRadius.circular(12)),
                child: const Icon(Icons.book_outlined, color: _grisTexte),
              ),
              const SizedBox(height: 12),
              const Text('Aucun livre trouvé',
                  style: TextStyle(
                      fontWeight: FontWeight.w700,
                      color: PaletteNouvelle.bleuNuit)),
              const SizedBox(height: 4),
              const Text(
                  'Essayez un autre mot-clé ou réinitialisez les filtres.',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: _grisTexte)),
              const SizedBox(height: 16),
              OutlinedButton(
                  onPressed: () => setState(() {
                        _requete = '';
                        _filtre = FiltreLibrairie.tous;
                      }),
                  child: const Text('Afficher tout le catalogue')),
            ]),
          )
        else
          for (final entree in sections.entries)
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                InkWell(
                  key: ValueKey('section-${entree.key}'),
                  onTap: () => setState(() {
                    if (_repliees.contains(entree.key)) {
                      _repliees.remove(entree.key);
                    } else {
                      _repliees.add(entree.key);
                    }
                  }),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8),
                    child: Row(children: [
                      Expanded(
                        child: Text('${entree.key} (${entree.value.length})',
                            style: const TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w800,
                                color: PaletteNouvelle.bleuNuit)),
                      ),
                      Icon(
                          _requete.isNotEmpty || !_repliees.contains(entree.key)
                              ? LucideIcons.chevronUp
                              : LucideIcons.chevronDown,
                          color: _grisTexte),
                    ]),
                  ),
                ),
                if (_requete.isNotEmpty || !_repliees.contains(entree.key))
                  for (final livre in entree.value) _carteLivre(livre),
              ],
            ),
      ],
    );
  }
}
