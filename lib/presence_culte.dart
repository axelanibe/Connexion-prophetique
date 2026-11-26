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
import 'dart:async';

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
/// 'parent_id', mur v2 tranche 3, est nul pour un commentaire
/// de premier niveau, renseigné pour une réponse.
class CommentaireMur {
  CommentaireMur({
    required this.id,
    this.parentId,
    this.auteurNom = '',
    this.texte = '',
    this.creeLe,
    this.estAuteur = false,
  });

  factory CommentaireMur.fromJson(Map<String, dynamic> j) => CommentaireMur(
        id: (j['id'] ?? '').toString(),
        parentId: (j['parent_id'] as String?)?.isEmpty == true ? null : j['parent_id'] as String?,
        auteurNom: (j['auteur_nom'] ?? '').toString(),
        texte: (j['texte'] ?? '').toString(),
        creeLe: j['cree_le'] == null ? null : DateTime.tryParse(j['cree_le'].toString()),
        estAuteur: j['est_auteur'] == true,
      );

  final String id;
  final String? parentId;
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
///
/// Mur v2 tranche 3 : mode réactions quand plusieurs types
/// sont donnés (J'aime, Amen, Prière, une seule par membre),
/// réponses à un niveau et mentions @ dans les commentaires.
/// Le mode à un type garde le comportement actuel, pour les
/// temps forts et les témoignages.
class AimesCommentaires extends StatefulWidget {
  const AimesCommentaires({
    super.key,
    required this.cibleType,
    required this.cibleId,
    this.nombreInitial,
    this.aAimeInitial,
    this.types = const ['jaime'],
    this.nbJaimeInitial,
    this.nbAmenInitial,
    this.nbPriereInitial,
    this.monTypeInitial,
  });

  final String cibleType;
  final String cibleId;

  /// Compte déjà connu par la liste, sinon chargé ici.
  final int? nombreInitial;
  final bool? aAimeInitial;

  /// Types de réaction proposés, un seul par défaut.
  final List<String> types;
  final int? nbJaimeInitial;
  final int? nbAmenInitial;
  final int? nbPriereInitial;
  final String? monTypeInitial;

  @override
  State<AimesCommentaires> createState() => _AimesCommentairesState();
}

class _AimesCommentairesState extends State<AimesCommentaires> {
  int _nombre = 0;
  bool _aAime = false;
  final _comptes = <String, int>{'jaime': 0, 'amen': 0, 'priere': 0};
  String? _monType;
  List<CommentaireMur> _commentaires = [];
  bool _commentairesCharges = false;
  bool _peutModerer = false;
  bool _deplie = false;
  bool _actionEnCours = false;
  final _texteControleur = TextEditingController();
  CommentaireMur? _reponseA;
  final _mentions = <Map<String, String>>[];
  List<Map<String, dynamic>> _suggestions = [];
  String _derniereRechercheMention = '';

  bool get _reactions => widget.types.length > 1;

  @override
  void initState() {
    super.initState();
    _nombre = widget.nombreInitial ?? 0;
    _aAime = widget.aAimeInitial ?? false;
    _comptes['jaime'] = widget.nbJaimeInitial ?? widget.nombreInitial ?? 0;
    _comptes['amen'] = widget.nbAmenInitial ?? 0;
    _comptes['priere'] = widget.nbPriereInitial ?? 0;
    _monType = widget.monTypeInitial ?? (widget.aAimeInitial == true ? 'jaime' : null);
    if (widget.nombreInitial == null || widget.aAimeInitial == null) _chargerCompte();
  }

  @override
  void dispose() {
    _texteControleur.dispose();
    super.dispose();
  }

  /// Compte renvoyé par le serveur, par type : resynchronise
  /// les nombres et mon type, en un seul ou trois boutons.
  void _appliquerCompte(Map<String, dynamic> compte) {
    int nombre(Object? v) => v is int ? v : int.tryParse((v ?? '').toString()) ?? 0;
    setState(() {
      _nombre = nombre(compte['nombre']);
      _aAime = compte['a_aime'] == true;
      if (compte.containsKey('nb_jaime')) _comptes['jaime'] = nombre(compte['nb_jaime']);
      if (compte.containsKey('nb_amen')) _comptes['amen'] = nombre(compte['nb_amen']);
      if (compte.containsKey('nb_priere')) _comptes['priere'] = nombre(compte['nb_priere']);
      if (compte.containsKey('mon_type')) {
        final monType = (compte['mon_type'] as String?)?.isEmpty == true ? null : compte['mon_type'] as String?;
        _monType = monType;
        _aAime = monType != null;
      }
    });
  }

  Future<void> _chargerCompte() async {
    try {
      final compte = await api.fetchCompteAime(widget.cibleType, widget.cibleId);
      if (!mounted) return;
      _appliquerCompte(compte);
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
      _appliquerCompte(compte);
      setState(() => _actionEnCours = false);
    } catch (e) {
      if (!mounted) return;
      setState(() => _actionEnCours = false);
      _message(context, _erreurLisible(e));
    }
  }

  /// Réaction en mode trois boutons : un toucher sur mon type
  /// le retire, un toucher sur un autre type le remplace, une
  /// seule réaction par membre, comme côté serveur.
  Future<void> _basculerReaction(String type) async {
    if (_actionEnCours) return;
    setState(() => _actionEnCours = true);
    try {
      final compte = _monType == type
          ? await api.retirerAime(widget.cibleType, widget.cibleId)
          : await api.aimer(widget.cibleType, widget.cibleId, type: type);
      if (!mounted) return;
      _appliquerCompte(compte);
      setState(() => _actionEnCours = false);
    } catch (e) {
      if (!mounted) return;
      setState(() => _actionEnCours = false);
      _message(context, _erreurLisible(e));
    }
  }

  /// Mention en cours de frappe : le texte après le dernier
  /// @, 3 caractères au moins, sans espace final, lance la
  /// recherche des membres. La sélection remplace la frappe
  /// par le nom complet et garde l'identifiant pour l'envoi.
  void _surveillerMention() {
    final texte = _texteControleur.text;
    final arobase = texte.lastIndexOf('@');
    if (arobase < 0) {
      if (_suggestions.isNotEmpty) setState(() => _suggestions = []);
      return;
    }
    final apres = texte.substring(arobase + 1);
    if (apres.endsWith(' ') || apres.endsWith('\n') || apres.trim().length < 3) {
      if (_suggestions.isNotEmpty) setState(() => _suggestions = []);
      return;
    }
    unawaited(_chercherMembres(apres.trim()));
  }

  Future<void> _chercherMembres(String q) async {
    if (q == _derniereRechercheMention) return;
    _derniereRechercheMention = q;
    try {
      final bruts = await api.fetchMembresMessagerie(q: q);
      if (!mounted || _derniereRechercheMention != q) return;
      setState(() => _suggestions = bruts.where((m) => (m['id'] ?? '').toString().isNotEmpty).toList());
    } catch (_) {
      if (mounted && _derniereRechercheMention == q) setState(() => _suggestions = []);
    }
  }

  void _choisirMention(Map<String, dynamic> m) {
    final id = (m['id'] ?? '').toString();
    final nom = (m['nom_complet'] ?? m['nom'] ?? '').toString();
    if (id.isEmpty || nom.isEmpty) return;
    final texte = _texteControleur.text;
    final arobase = texte.lastIndexOf('@');
    final avant = arobase >= 0 ? texte.substring(0, arobase) : texte;
    final nouveau = '$avant@$nom ';
    setState(() {
      _texteControleur.text = nouveau;
      _texteControleur.selection = TextSelection.collapsed(offset: nouveau.length);
      if (!_mentions.any((x) => x['id'] == id)) _mentions.add({'id': id, 'nom': nom});
      _suggestions = [];
      _derniereRechercheMention = '';
    });
  }

  Future<void> _envoyerCommentaire() async {
    final texte = _texteControleur.text.trim();
    if (!texteCommentaireValide(texte) || _actionEnCours) return;
    setState(() => _actionEnCours = true);
    try {
      // Seules les mentions encore écrites dans le texte
      // partent : un nom effacé après la sélection ne part pas.
      final mentions = _mentions.where((m) => texte.contains('@${m['nom']}')).map((m) => m['id']!).toList();
      final res = await api.posterCommentaire(
        widget.cibleType,
        widget.cibleId,
        texte,
        parentId: _reponseA?.id,
        mentions: mentions.isEmpty ? null : mentions,
      );
      if (!mounted) return;
      final cree = (res['commentaire'] as Map<String, dynamic>?);
      setState(() {
        _actionEnCours = false;
        _texteControleur.clear();
        _reponseA = null;
        _mentions.clear();
        _suggestions = [];
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
        // La suppression d'un commentaire retire aussi ses
        // réponses, comme la cascade côté serveur.
        _commentaires = _commentaires.where((x) => x.id != c.id && x.parentId != c.id).toList();
        if (_reponseA?.id == c.id) _reponseA = null;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() => _actionEnCours = false);
      _message(context, _erreurLisible(e));
    }
  }

  /// Un bouton de réaction : icône et libellé, nombre quand il
  /// y en a, couleur pleine quand c'est mon type.
  Widget _boutonReaction(String type) {
    final actif = _monType == type;
    final nombre = _comptes[type] ?? 0;
    final couleur = !actif ? _grisTexte : type == 'jaime' ? _rouge : type == 'amen' ? _or : _nuit;
    final icone = type == 'jaime'
        ? (actif ? Icons.favorite : Icons.favorite_border)
        : type == 'amen'
            ? (actif ? Icons.volunteer_activism : Icons.volunteer_activism_outlined)
            : (actif ? Icons.self_improvement : Icons.self_improvement_outlined);
    final libelle = type == 'jaime' ? tr('J’aime') : type == 'amen' ? tr('Amen') : tr('Prière');
    return TextButton.icon(
      onPressed: _actionEnCours ? null : () => _basculerReaction(type),
      icon: Icon(icone, size: 20, color: couleur),
      label: Text(
        nombre == 0 ? libelle : '$libelle · $nombre',
        style: TextStyle(color: couleur, fontWeight: FontWeight.w700),
      ),
      style: TextButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 4)),
    );
  }

  /// Une ligne de commentaire, décalée quand c'est une réponse.
  /// Seul un commentaire de premier niveau peut être répondu.
  Widget _ligneCommentaire(CommentaireMur c, {bool reponse = false}) {
    return Padding(
      padding: EdgeInsets.only(left: reponse ? 28 : 4, bottom: 8),
      child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(
              [c.auteurNom, dateCourteMur(c.creeLe)].where((s) => s.isNotEmpty).join(' · '),
              style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13),
            ),
            const SizedBox(height: 2),
            Text(c.texte, style: const TextStyle(fontSize: 14)),
            if (!reponse)
              TextButton(
                onPressed: _actionEnCours ? null : () => setState(() => _reponseA = c),
                style: TextButton.styleFrom(
                  padding: EdgeInsets.zero,
                  minimumSize: const Size(0, 28),
                  tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                ),
                child: Text(tr('Répondre'), style: const TextStyle(color: _grisTexte, fontWeight: FontWeight.w700, fontSize: 13)),
              ),
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
    );
  }

  @override
  Widget build(BuildContext context) {
    final racines = _commentaires.where((c) => c.parentId == null).toList();
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      // En mode trois réactions, les boutons descendent sous
      // la rangée au lieu de déborder sur petit écran.
      Wrap(
        spacing: 4,
        runSpacing: 0,
        crossAxisAlignment: WrapCrossAlignment.center,
        children: [
          if (_reactions)
            for (final t in widget.types) _boutonReaction(t)
          else
            TextButton.icon(
              onPressed: _actionEnCours ? null : _basculerAime,
              icon: Icon(_aAime ? Icons.favorite : Icons.favorite_border, size: 20, color: _aAime ? _rouge : _grisTexte),
              label: Text(
                _nombre == 0 ? tr('J’aime') : '${tr('J’aime')} · $_nombre',
                style: TextStyle(color: _aAime ? _rouge : _grisTexte, fontWeight: FontWeight.w700),
              ),
              style: TextButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 4)),
            ),
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
        ],
      ),
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
        for (final c in racines) ...[
          _ligneCommentaire(c),
          for (final r in _commentaires.where((x) => x.parentId == c.id)) _ligneCommentaire(r, reponse: true),
        ],
        if (_reponseA != null)
          Padding(
            padding: const EdgeInsets.only(left: 4, bottom: 4),
            child: Row(children: [
              Expanded(
                child: Text(
                  '${tr('Répondre à')} ${_reponseA!.auteurNom}',
                  style: const TextStyle(color: _grisTexte, fontWeight: FontWeight.w700, fontSize: 13),
                ),
              ),
              IconButton(
                tooltip: tr('Annuler'),
                onPressed: () => setState(() => _reponseA = null),
                icon: const Icon(Icons.close, size: 20),
                color: _grisTexte,
                padding: EdgeInsets.zero,
                constraints: const BoxConstraints(minWidth: 36, minHeight: 36),
              ),
            ]),
          ),
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
              onChanged: (_) {
                setState(() {});
                _surveillerMention();
              },
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
        if (_suggestions.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(color: _grisTexte.withValues(alpha: 0.4)),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Column(
                children: [
                  for (final m in _suggestions)
                    ListTile(
                      dense: true,
                      title: Text((m['nom_complet'] ?? m['nom'] ?? '').toString()),
                      subtitle: (m['etablissement'] ?? '').toString().isEmpty
                          ? null
                          : Text((m['etablissement'] ?? '').toString()),
                      onTap: () => _choisirMention(m),
                    ),
                ],
              ),
            ),
          ),
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
