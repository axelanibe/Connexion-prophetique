// Présence au culte, tranches 2 à 5, 21 nov. 2026.
//
// Tranche 3, J'aime et commentaires : un J'aime par membre et
// par cible, temps fort ou témoignage, nombre visible, jamais de
// liste publique ; les commentaires sont visibles par tous,
// l'auteur supprime le sien, la structure supprime tout. Les
// enseignements et les méditations gardent leurs Amens, un
// J'aime dessus ferait doublon.
// Tranche 4, Mon mur : la page du Profil qui rassemble les
// dernières activités, enseignements, actualités et annonces,
// camps, témoignages, avec un partage par la feuille du système.
// Tranche 5, verset en storie : la carte du verset part comme
// une storie depuis son dialogue de partage, par POST /stories.
//
// Comme camp_planning.dart, ce fichier est autonome : Scaffold
// direct, sans les aides de main.dart, pour ne pas créer de
// cycle d'import. Il utilise le client global api, comme
// camp_planning.dart.
import 'package:flutter/material.dart';
import 'package:share_plus/share_plus.dart';

import 'api.dart';
import 'i18n.dart';

// Palette de l'application, mêmes valeurs que HomeWeb.
const _nuit = Color(0xFF0F1C2E);
const _fond = Color(0xFFF4F6F9);
const _grisTexte = Color(0xFF5E687C);
const _or = Color(0xFFE5C158);
const _rouge = Color(0xFFE11D48);

/// Cibles d'un J'aime ou d'un commentaire.
const ciblesAime = ['temps_fort', 'temoignage'];

/// Longueur maximale d'un commentaire, comme côté serveur.
const longueurMaxTexteCommentaire = 1000;

/// Vrai quand le commentaire est un texte de 1 à 1000 caractères.
bool texteCommentaireValide(String texte) {
  final propre = texte.trim();
  return propre.isNotEmpty && propre.length <= longueurMaxTexteCommentaire;
}

/// Extrait d'un texte, coupé à la longueur donnée avec « … »,
/// jamais coupé quand il tient déjà. Publique pour les tests.
String extraitTexte(String texte, int longueur) {
  if (texte.length <= longueur) return texte;
  return '${texte.substring(0, longueur).trimRight()}…';
}

/// Texte de partage d'un élément du mur, par la feuille du
/// système : titre et auteur, ou le texte du témoignage entre
// guillemets, suivi du nom de la structure. Publique pour les
/// tests.
String textePartageMur(ElementMur e) {
  switch (e.kind) {
    case 'temoignage':
      final auteur = e.auteurNom.isEmpty ? '' : ' — ${e.auteurNom}';
      return '« ${e.texte} »$auteur\nCONNEXION PROPHETIQUE';
    case 'camp':
      final lieu = e.lieu.isEmpty ? '' : ' — ${e.lieu}';
      return 'Camp ${e.titre}$lieu\nCONNEXION PROPHETIQUE';
    case 'enseignement':
      final auteur = e.auteurNom.isEmpty ? '' : ' — ${e.auteurNom}';
      return '${e.titre}$auteur\nCONNEXION PROPHETIQUE';
    default:
      return '${e.titre}\nCONNEXION PROPHETIQUE';
  }
}

/// Date courte, jour/mois/année, sans dépendance.
String dateCourteMur(DateTime? date) {
  if (date == null) return '';
  return '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}';
}

/// Icône d'un élément du mur selon son kind.
IconData iconeKindMur(String kind) {
  switch (kind) {
    case 'enseignement':
      return Icons.headphones_outlined;
    case 'actualite':
      return Icons.article_outlined;
    case 'annonce':
      return Icons.campaign_outlined;
    case 'camp':
      return Icons.event_outlined;
    case 'temoignage':
      return Icons.volunteer_activism_outlined;
    default:
      return Icons.circle_outlined;
  }
}

/// Libellé d'un kind du mur.
String libelleKindMur(String kind) {
  switch (kind) {
    case 'enseignement':
      return tr('Enseignement');
    case 'actualite':
      return tr('Actualité');
    case 'annonce':
      return tr('Annonce');
    case 'camp':
      return tr('Camp');
    case 'temoignage':
      return tr('Témoignage');
    default:
      return kind;
  }
}

/// Un élément du mur : enseignement, actualité, annonce, camp
/// ou témoignage, une seule forme pour les cinq.
class ElementMur {
  ElementMur({
    required this.kind,
    required this.id,
    this.titre = '',
    this.texte = '',
    this.date,
    this.auteurNom = '',
    this.lieu = '',
  });

  factory ElementMur.fromJson(Map<String, dynamic> j) => ElementMur(
        kind: (j['kind'] ?? '').toString(),
        id: (j['id'] ?? '').toString(),
        titre: (j['titre'] ?? '').toString(),
        texte: (j['texte'] ?? '').toString(),
        date: j['date'] == null ? null : DateTime.tryParse(j['date'].toString()),
        auteurNom: (j['auteur_nom'] ?? '').toString(),
        lieu: (j['lieu'] ?? '').toString(),
      );

  final String kind;
  final String id;
  final String titre;
  final String texte;
  final DateTime? date;
  final String auteurNom;
  final String lieu;
}

/// Un commentaire : auteur, texte, date, et mon droit de
/// suppression, auteur ou structure, décidé par le serveur.
class CommentaireMur {
  CommentaireMur({
    required this.id,
    this.auteurNom = '',
    this.texte = '',
    this.creeLe,
    this.estAuteur = false,
  });

  factory CommentaireMur.fromJson(Map<String, dynamic> j) => CommentaireMur(
        id: (j['id'] ?? '').toString(),
        auteurNom: (j['auteur_nom'] ?? '').toString(),
        texte: (j['texte'] ?? '').toString(),
        creeLe: j['cree_le'] == null ? null : DateTime.tryParse(j['cree_le'].toString()),
        estAuteur: j['est_auteur'] == true,
      );

  final String id;
  final String auteurNom;
  final String texte;
  final DateTime? creeLe;
  final bool estAuteur;
}

void _message(BuildContext context, String texte) {
  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(texte)));
}

String _erreurLisible(Object e) {
  final texte = '$e';
  return texte.replaceFirst('Exception: ', '');
}

/// J'aime et commentaires d'une cible, temps fort ou
/// témoignage : le bouton J'aime avec son nombre, le bouton
/// commentaires, la liste dépliable et le champ d'envoi.
/// Jamais de liste publique des J'aime, seulement le nombre,
/// comme décidé. Les comptes arrivent en lot depuis la liste
/// (nombreInitial, aAimeInitial), un seul appel pour toute la
/// liste ; les commentaires ne se chargent qu'au dépliage, pour
/// ne pas appeler le serveur pour chaque carte.
class AimesCommentaires extends StatefulWidget {
  const AimesCommentaires({super.key, required this.cibleType, required this.cibleId, this.nombreInitial, this.aAimeInitial});

  final String cibleType;
  final String cibleId;

  /// Compte déjà connu par la liste, sinon chargé ici.
  final int? nombreInitial;
  final bool? aAimeInitial;

  @override
  State<AimesCommentaires> createState() => _AimesCommentairesState();
}

class _AimesCommentairesState extends State<AimesCommentaires> {
  int _nombre = 0;
  bool _aAime = false;
  List<CommentaireMur> _commentaires = [];
  bool _commentairesCharges = false;
  bool _peutModerer = false;
  bool _deplie = false;
  bool _actionEnCours = false;
  final _texteControleur = TextEditingController();

  @override
  void initState() {
    super.initState();
    _nombre = widget.nombreInitial ?? 0;
    _aAime = widget.aAimeInitial ?? false;
    if (widget.nombreInitial == null || widget.aAimeInitial == null) _chargerCompte();
  }

  @override
  void dispose() {
    _texteControleur.dispose();
    super.dispose();
  }

  Future<void> _chargerCompte() async {
    try {
      final compte = await api.fetchCompteAime(widget.cibleType, widget.cibleId);
      if (!mounted) return;
      setState(() {
        _nombre = (compte['nombre'] as num?)?.toInt() ?? 0;
        _aAime = compte['a_aime'] == true;
      });
    } catch (_) {}
  }

  Future<void> _chargerCommentaires() async {
    if (_commentairesCharges) return;
    try {
      final data = await api.fetchCommentaires(widget.cibleType, widget.cibleId);
      if (!mounted) return;
      setState(() {
        _commentaires = ((data['commentaires'] as List?) ?? [])
            .whereType<Map<String, dynamic>>()
            .map(CommentaireMur.fromJson)
            .toList();
        _peutModerer = data['peut_moderer'] == true;
        _commentairesCharges = true;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() => _commentairesCharges = true);
    }
  }

  void _basculerDeplie() {
    setState(() => _deplie = !_deplie);
    if (_deplie) _chargerCommentaires();
  }

  Future<void> _basculerAime() async {
    if (_actionEnCours) return;
    setState(() => _actionEnCours = true);
    try {
      final compte = _aAime
          ? await api.retirerAime(widget.cibleType, widget.cibleId)
          : await api.aimer(widget.cibleType, widget.cibleId);
      if (!mounted) return;
      setState(() {
        _nombre = (compte['nombre'] as num?)?.toInt() ?? _nombre;
        _aAime = compte['a_aime'] == true;
        _actionEnCours = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() => _actionEnCours = false);
      _message(context, _erreurLisible(e));
    }
  }

  Future<void> _envoyerCommentaire() async {
    final texte = _texteControleur.text.trim();
    if (!texteCommentaireValide(texte) || _actionEnCours) return;
    setState(() => _actionEnCours = true);
    try {
      final res = await api.posterCommentaire(widget.cibleType, widget.cibleId, texte);
      if (!mounted) return;
      final cree = (res['commentaire'] as Map<String, dynamic>?);
      setState(() {
        _actionEnCours = false;
        _texteControleur.clear();
        if (cree != null) _commentaires = [..._commentaires, CommentaireMur.fromJson(cree)];
      });
    } catch (e) {
      if (!mounted) return;
      setState(() => _actionEnCours = false);
      _message(context, _erreurLisible(e));
    }
  }

  Future<void> _supprimerCommentaire(CommentaireMur c) async {
    if (_actionEnCours) return;
    setState(() => _actionEnCours = true);
    try {
      await api.supprimerCommentaire(c.id);
      if (!mounted) return;
      setState(() {
        _actionEnCours = false;
        _commentaires = _commentaires.where((x) => x.id != c.id).toList();
      });
    } catch (e) {
      if (!mounted) return;
      setState(() => _actionEnCours = false);
      _message(context, _erreurLisible(e));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Row(children: [
        TextButton.icon(
          onPressed: _actionEnCours ? null : _basculerAime,
          icon: Icon(_aAime ? Icons.favorite : Icons.favorite_border, size: 20, color: _aAime ? _rouge : _grisTexte),
          label: Text(
            _nombre == 0 ? tr('J’aime') : '${tr('J’aime')} · $_nombre',
            style: TextStyle(color: _aAime ? _rouge : _grisTexte, fontWeight: FontWeight.w700),
          ),
          style: TextButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 4)),
        ),
        const SizedBox(width: 4),
        TextButton.icon(
          onPressed: _basculerDeplie,
          icon: const Icon(Icons.chat_bubble_outline, size: 20, color: _grisTexte),
          label: Text(
            !_commentairesCharges || _commentaires.isEmpty
                ? tr('Commenter')
                : '${_commentaires.length} ${_commentaires.length == 1 ? tr('commentaire') : tr('commentaires')}',
            style: const TextStyle(color: _grisTexte, fontWeight: FontWeight.w700),
          ),
          style: TextButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 4)),
        ),
      ]),
      if (_deplie) ...[
        if (!_commentairesCharges)
          const Padding(
            padding: EdgeInsets.only(left: 4, bottom: 8),
            child: SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2)),
          )
        else if (_commentaires.isEmpty)
          Padding(
            padding: const EdgeInsets.only(left: 4, bottom: 8),
            child: Text(tr('Aucun commentaire pour le moment.'), style: const TextStyle(color: _grisTexte)),
          ),
        for (final c in _commentaires) ...[
          Padding(
            padding: const EdgeInsets.only(left: 4, bottom: 8),
            child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Expanded(
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(
                    [c.auteurNom, dateCourteMur(c.creeLe)].where((s) => s.isNotEmpty).join(' · '),
                    style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13),
                  ),
                  const SizedBox(height: 2),
                  Text(c.texte, style: const TextStyle(fontSize: 14)),
                ]),
              ),
              if (c.estAuteur || _peutModerer)
                IconButton(
                  tooltip: tr('Supprimer ce commentaire'),
                  onPressed: _actionEnCours ? null : () => _supprimerCommentaire(c),
                  icon: const Icon(Icons.delete_outline, size: 20),
                  color: _grisTexte,
                  padding: EdgeInsets.zero,
                  constraints: const BoxConstraints(minWidth: 36, minHeight: 36),
                ),
            ]),
          ),
        ],
        Row(children: [
          Expanded(
            child: TextField(
              controller: _texteControleur,
              maxLength: longueurMaxTexteCommentaire,
              maxLines: 3,
              minLines: 1,
              decoration: InputDecoration(
                hintText: tr('Écrire un commentaire'),
                border: const OutlineInputBorder(),
                counterText: '',
              ),
              onChanged: (_) => setState(() {}),
            ),
          ),
          const SizedBox(width: 8),
          IconButton(
            tooltip: tr('Envoyer'),
            onPressed: texteCommentaireValide(_texteControleur.text) && !_actionEnCours ? _envoyerCommentaire : null,
            icon: const Icon(Icons.send_outlined),
            color: _nuit,
          ),
        ]),
      ],
    ]);
  }
}

/// Mon mur, page du Profil : les dernières activités de la
/// structure, enseignements, actualités et annonces, camps,
/// témoignages, du plus récent au plus ancien. Chaque élément
/// se partage par la feuille du système ; les témoignages
/// portent leurs J'aime et commentaires.
class MonMurPage extends StatefulWidget {
  const MonMurPage({super.key});

  @override
  State<MonMurPage> createState() => _MonMurPageState();
}

class _MonMurPageState extends State<MonMurPage> {
  bool _charge = false;
  bool _erreur = false;
  List<ElementMur> _elements = [];

  /// Comptes de J'aime des témoignages, en lot, un seul appel
  /// pour toute la page.
  Map<String, Map<String, dynamic>> _comptes = {};

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    try {
      final data = await api.fetchMonMur();
      if (!mounted) return;
      final elements = ((data['elements'] as List?) ?? [])
          .whereType<Map<String, dynamic>>()
          .map(ElementMur.fromJson)
          .toList();
      setState(() {
        _charge = true;
        _erreur = false;
        _elements = elements;
        _comptes = {};
      });
      final ids = elements.where((e) => e.kind == 'temoignage').map((e) => e.id).toList();
      if (ids.isNotEmpty) {
        try {
          final comptes = await api.fetchComptesAimes('temoignage', ids);
          if (!mounted) return;
          final parId = <String, Map<String, dynamic>>{};
          for (final c in ((comptes['comptes'] as List?) ?? []).whereType<Map<String, dynamic>>()) {
            parId[(c['cible_id'] ?? '').toString()] = c;
          }
          setState(() => _comptes = parId);
        } catch (_) {}
      }
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _charge = true;
        _erreur = true;
      });
    }
  }

  Future<void> _partager(ElementMur e) async {
    try {
      await SharePlus.instance.share(ShareParams(text: textePartageMur(e)));
    } catch (_) {
      if (!mounted) return;
      _message(context, tr('Impossible de partager cet élément.'));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _fond,
      appBar: AppBar(
        backgroundColor: _nuit,
        foregroundColor: Colors.white,
        title: Text(tr('Mon mur')),
      ),
      body: !_charge
          ? const Center(child: CircularProgressIndicator())
          : _erreur
              ? Center(
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: Text(tr('Impossible de charger Mon mur.'), textAlign: TextAlign.center),
                  ),
                )
              : _elements.isEmpty
                  ? Center(
                      child: Padding(
                        padding: const EdgeInsets.all(24),
                        child: Text(tr('Aucune activité pour le moment.'), textAlign: TextAlign.center),
                      ),
                    )
                  : RefreshIndicator(
                      onRefresh: _charger,
                      child: ListView.builder(
                        padding: const EdgeInsets.all(16),
                        itemCount: _elements.length,
                        itemBuilder: (context, index) {
                          final e = _elements[index];
                          final estTemoignage = e.kind == 'temoignage';
                          return Card(
                            margin: const EdgeInsets.only(bottom: 12),
                            child: Padding(
                              padding: const EdgeInsets.all(12),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(children: [
                                    CircleAvatar(
                                      radius: 20,
                                      backgroundColor: _nuit,
                                      child: Icon(iconeKindMur(e.kind), color: _or, size: 20),
                                    ),
                                    const SizedBox(width: 10),
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            libelleKindMur(e.kind),
                                            style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 13, color: _grisTexte),
                                          ),
                                          if (e.date != null)
                                            Text(
                                              dateCourteMur(e.date),
                                              style: const TextStyle(color: _grisTexte, fontSize: 13),
                                            ),
                                        ],
                                      ),
                                    ),
                                  ]),
                                  if (e.titre.isNotEmpty) ...[
                                    const SizedBox(height: 8),
                                    Text(e.titre, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
                                  ],
                                  if (e.texte.isNotEmpty) ...[
                                    const SizedBox(height: 4),
                                    Text(
                                      estTemoignage ? e.texte : extraitTexte(e.texte, 280),
                                      maxLines: estTemoignage ? null : 3,
                                      overflow: estTemoignage ? null : TextOverflow.ellipsis,
                                    ),
                                  ],
                                  if (e.auteurNom.isNotEmpty || e.lieu.isNotEmpty) ...[
                                    const SizedBox(height: 4),
                                    Text(
                                      [e.auteurNom, e.lieu].where((s) => s.isNotEmpty).join(' · '),
                                      style: const TextStyle(color: _grisTexte, fontSize: 13),
                                    ),
                                  ],
                                  const SizedBox(height: 4),
                                  Row(children: [
                                    TextButton.icon(
                                      onPressed: () => _partager(e),
                                      icon: const Icon(Icons.share_outlined, size: 20, color: _grisTexte),
                                      label: Text(tr('Partager'), style: const TextStyle(color: _grisTexte, fontWeight: FontWeight.w700)),
                                      style: TextButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 4)),
                                    ),
                                  ]),
                                  if (estTemoignage)
                                    AimesCommentaires(
                                      cibleType: 'temoignage',
                                      cibleId: e.id,
                                      nombreInitial: (_comptes[e.id]?['nombre'] as num?)?.toInt(),
                                      aAimeInitial: _comptes[e.id]?['a_aime'] == true,
                                    ),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
                    ),
    );
  }
}
