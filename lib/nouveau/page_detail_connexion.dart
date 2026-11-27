// Nouvelle Connexion, tranche T3, 26 nov. 2026.
// Détail d'une publication : même carte que le fil,
// commentaires avec réponses imbriquées à un niveau, champ de
// commentaire avec @ (recherche de membres, 3 caractères au
// moins) et envoi des identifiants mentionnés.
import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import 'carte_publication.dart';
import 'modeles_connexion.dart';
import 'palette.dart';

class PageDetailConnexion extends StatefulWidget {
  const PageDetailConnexion({
    super.key,
    required this.service,
    required this.publication,
    this.photoAuteur,
    this.onOuvrirProfil,
  });
  final ServiceConnexion service;
  final PublicationConnexion publication;
  final String? photoAuteur;
  final ValueChanged<String>? onOuvrirProfil;

  @override
  State<PageDetailConnexion> createState() => _PageDetailConnexionState();
}

class _PageDetailConnexionState extends State<PageDetailConnexion> {
  final _commentaire = TextEditingController();
  late PublicationConnexion _publication;
  List<CommentaireConnexion> _commentaires = [];
  bool _chargement = true;
  String? _erreur;
  bool _envoiEnCours = false;
  String? _reponseA;
  String? _reponseNom;
  List<MembreConnexion> _suggestions = [];
  final _mentions = <String, String>{};

  @override
  void initState() {
    super.initState();
    _publication = widget.publication;
    _charger();
  }

  @override
  void dispose() {
    _commentaire.dispose();
    super.dispose();
  }

  Future<void> _charger() async {
    try {
      final commentaires =
          await widget.service.chargerCommentaires(_publication.id);
      if (!mounted) return;
      setState(() {
        _commentaires = commentaires;
        _chargement = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _chargement = false;
        _erreur =
            'Les commentaires ne peuvent pas être chargés pour le moment.';
      });
    }
  }

  /// Dernier mot @ en cours de frappe, 3 caractères au moins.
  String? _mentionEnCours(String texte) {
    final mots = texte.split(RegExp(r'\s+'));
    if (mots.isEmpty) return null;
    final dernier = mots.last;
    if (!dernier.startsWith('@') || dernier.length < 4) return null;
    return dernier.substring(1);
  }

  Future<void> _surTexte(String texte) async {
    final saisie = _mentionEnCours(texte);
    if (saisie == null) {
      if (_suggestions.isNotEmpty) setState(() => _suggestions = []);
      return;
    }
    try {
      final resultats = await widget.service.rechercherMembres(saisie);
      if (!mounted) return;
      setState(() => _suggestions = resultats);
    } catch (_) {}
  }

  void _choisirMention(MembreConnexion membre) {
    final texte = _commentaire.text;
    final dernierArobase = texte.lastIndexOf('@');
    final nouveau =
        '${texte.substring(0, dernierArobase)}@${membre.nomComplet} ';
    _mentions[membre.id] = membre.nomComplet;
    setState(() {
      _commentaire.text = nouveau;
      _suggestions = [];
    });
    _commentaire.selection = TextSelection.collapsed(offset: nouveau.length);
  }

  Future<void> _envoyer() async {
    final texte = _commentaire.text.trim();
    if (texte.isEmpty || _envoiEnCours) return;
    setState(() => _envoiEnCours = true);
    try {
      final commentaire = await widget.service.commenter(
        _publication.id,
        texte,
        parentId: _reponseA,
        mentions: _mentions.keys.toList(),
      );
      if (!mounted) return;
      setState(() {
        _commentaires = [..._commentaires, commentaire];
        _publication = _publication.avecCommentaireEnPlus();
        _commentaire.clear();
        _mentions.clear();
        _reponseA = null;
        _reponseNom = null;
        _envoiEnCours = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() => _envoiEnCours = false);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Le commentaire n’a pas pu être envoyé.')),
      );
    }
  }

  Future<void> _signalerCommentaire(CommentaireConnexion c) async {
    final motif = await showModalBottomSheet<String>(
      context: context,
      builder: (_) => _FeuilleMotifsDetail(titre: 'Signaler ce commentaire'),
    );
    if (motif == null || !mounted) return;
    try {
      await widget.service
          .signaler(cibleType: 'mur_commentaire', cibleId: c.id, motif: motif);
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

  Future<void> _supprimerCommentaire(CommentaireConnexion c) async {
    try {
      await widget.service.supprimerCommentaire(c.id);
      if (!mounted) return;
      setState(() => _commentaires = _commentaires
          .where((x) => x.id != c.id && x.parentId != c.id)
          .toList());
    } catch (_) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
            content: Text('Le commentaire n’a pas pu être supprimé.')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final premiers = _commentaires.where((c) => c.parentId == null).toList();
    List<CommentaireConnexion> reponsesDe(String parentId) =>
        _commentaires.where((c) => c.parentId == parentId).toList();
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
          'Publication',
          style: TextStyle(
              color: PaletteNouvelle.bleuNuit, fontWeight: FontWeight.w800),
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: _chargement
                ? const Center(
                    child: CircularProgressIndicator(
                        color: PaletteNouvelle.bleuNuit))
                : ListView(
                    padding: const EdgeInsets.fromLTRB(12, 12, 12, 24),
                    children: [
                      CartePublicationConnexion(
                        publication: _publication,
                        photoAuteur: widget.photoAuteur,
                        onAuteur: _publication.auteurId.isEmpty
                            ? null
                            : () => widget.onOuvrirProfil
                                ?.call(_publication.auteurId),
                      ),
                      const SizedBox(height: 16),
                      const Text(
                        'Commentaires',
                        style: TextStyle(
                            color: PaletteNouvelle.bleuNuit,
                            fontSize: 17,
                            fontWeight: FontWeight.w800),
                      ),
                      const SizedBox(height: 8),
                      if (_erreur != null) Text(_erreur!),
                      if (premiers.isEmpty && _erreur == null)
                        const Padding(
                          padding: EdgeInsets.symmetric(vertical: 16),
                          child: Text('Aucun commentaire pour le moment.'),
                        ),
                      for (final c in premiers) ...[
                        _CarteCommentaire(
                          commentaire: c,
                          onAuteur: c.membreId.isEmpty
                              ? null
                              : () => widget.onOuvrirProfil?.call(c.membreId),
                          onRepondre: () => setState(() {
                            _reponseA = c.id;
                            _reponseNom = c.auteurNom;
                          }),
                          onSignaler: () => _signalerCommentaire(c),
                          onSupprimer: c.estAuteur
                              ? () => _supprimerCommentaire(c)
                              : null,
                        ),
                        for (final r in reponsesDe(c.id))
                          Padding(
                            padding: const EdgeInsets.only(left: 32),
                            child: _CarteCommentaire(
                              commentaire: r,
                              onAuteur: r.membreId.isEmpty
                                  ? null
                                  : () =>
                                      widget.onOuvrirProfil?.call(r.membreId),
                              onSignaler: () => _signalerCommentaire(r),
                              onSupprimer: r.estAuteur
                                  ? () => _supprimerCommentaire(r)
                                  : null,
                            ),
                          ),
                      ],
                    ],
                  ),
          ),
          _BarreCommentaire(
            controleur: _commentaire,
            suggestions: _suggestions,
            reponseNom: _reponseNom,
            onAnnulerReponse: () => setState(() {
              _reponseA = null;
              _reponseNom = null;
            }),
            onTexte: _surTexte,
            onChoisirMention: _choisirMention,
            enCours: _envoiEnCours,
            onEnvoyer: _envoyer,
          ),
        ],
      ),
    );
  }
}

class _CarteCommentaire extends StatelessWidget {
  const _CarteCommentaire({
    required this.commentaire,
    this.onAuteur,
    this.onRepondre,
    this.onSignaler,
    this.onSupprimer,
  });
  final CommentaireConnexion commentaire;
  final VoidCallback? onAuteur;
  final VoidCallback? onRepondre;
  final VoidCallback? onSignaler;
  final VoidCallback? onSupprimer;

  @override
  Widget build(BuildContext context) {
    final c = commentaire;
    final date = formaterDateConnexion(c.creeLe);
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFE3E7EE)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: InkWell(
                  onTap: onAuteur,
                  child: Text(
                    c.auteurNom,
                    style: const TextStyle(
                        color: PaletteNouvelle.bleuNuit,
                        fontWeight: FontWeight.w800),
                  ),
                ),
              ),
              if (date.isNotEmpty)
                Text(date,
                    style: const TextStyle(color: Colors.grey, fontSize: 12)),
              PopupMenuButton<String>(
                tooltip: 'Options',
                icon: const Icon(Icons.more_vert,
                    size: 18, color: PaletteNouvelle.bleuNuit),
                onSelected: (v) {
                  if (v == 'signaler') onSignaler?.call();
                  if (v == 'supprimer') onSupprimer?.call();
                },
                itemBuilder: (_) => [
                  const PopupMenuItem(
                      value: 'signaler', child: Text('Signaler')),
                  if (onSupprimer != null)
                    const PopupMenuItem(
                        value: 'supprimer', child: Text('Supprimer')),
                ],
              ),
            ],
          ),
          const SizedBox(height: 4),
          Text(c.texte,
              style: const TextStyle(
                  color: PaletteNouvelle.bleuNuit, height: 1.4)),
          if (onRepondre != null)
            Align(
              alignment: Alignment.centerLeft,
              child: TextButton(
                style: TextButton.styleFrom(padding: EdgeInsets.zero),
                onPressed: onRepondre,
                child: const Text('Répondre',
                    style: TextStyle(
                        color: PaletteNouvelle.orFonce,
                        fontWeight: FontWeight.w700)),
              ),
            ),
        ],
      ),
    );
  }
}

class _BarreCommentaire extends StatelessWidget {
  const _BarreCommentaire({
    required this.controleur,
    required this.suggestions,
    required this.reponseNom,
    required this.onAnnulerReponse,
    required this.onTexte,
    required this.onChoisirMention,
    required this.enCours,
    required this.onEnvoyer,
  });
  final TextEditingController controleur;
  final List<MembreConnexion> suggestions;
  final String? reponseNom;
  final VoidCallback onAnnulerReponse;
  final ValueChanged<String> onTexte;
  final ValueChanged<MembreConnexion> onChoisirMention;
  final bool enCours;
  final VoidCallback onEnvoyer;

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.fromLTRB(12, 8, 12, 12),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (reponseNom != null)
            Padding(
              padding: const EdgeInsets.only(bottom: 4),
              child: Row(
                children: [
                  Expanded(
                      child: Text('Réponse à $reponseNom',
                          style: const TextStyle(
                              color: Colors.grey, fontSize: 13))),
                  IconButton(
                      icon: const Icon(LucideIcons.x, size: 18),
                      onPressed: onAnnulerReponse),
                ],
              ),
            ),
          if (suggestions.isNotEmpty)
            ConstrainedBox(
              constraints: const BoxConstraints(maxHeight: 160),
              child: ListView(
                shrinkWrap: true,
                children: [
                  for (final m in suggestions)
                    ListTile(
                      title: Text(m.nomComplet),
                      subtitle: m.etablissementNom.isEmpty
                          ? null
                          : Text(m.etablissementNom),
                      onTap: () => onChoisirMention(m),
                    ),
                ],
              ),
            ),
          Row(
            children: [
              Expanded(
                child: TextField(
                  controller: controleur,
                  onChanged: onTexte,
                  decoration: const InputDecoration(
                    hintText: 'Écrire un commentaire… (@ pour mentionner)',
                    filled: true,
                    fillColor: PaletteNouvelle.papier,
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(24)),
                        borderSide: BorderSide.none),
                    contentPadding:
                        EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              IconButton.filled(
                style: IconButton.styleFrom(
                    backgroundColor: PaletteNouvelle.bleuNuit),
                icon: const Icon(LucideIcons.send, color: Colors.white),
                onPressed: enCours ? null : onEnvoyer,
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _FeuilleMotifsDetail extends StatelessWidget {
  const _FeuilleMotifsDetail({required this.titre});
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
