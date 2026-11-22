// Entraide entre membres, offres et demandes, 21 nov. 2026,
// tranche 7 de l'audit du 17 nov. : un membre publie une offre
// ou une demande, visible par tous les membres, l'auteur seul
// marque sa publication résolue. Le contact avec l'auteur se
// fait par la messagerie existante : la page reçoit une action
// de contact depuis l'application, qui ouvre la conversation
// directe avec l'auteur. À ne pas confondre avec le
// clavardage d'aide avec la structure, canal vers la
// structure, pas entre membres.
import 'package:flutter/material.dart';

import 'api.dart';
import 'i18n.dart';

// Palette de l'application, mêmes valeurs que HomeWeb.
const _nuit = Color(0xFF0F1C2E);
const _or = Color(0xFFE5C158);
const _grisTexte = Color(0xFF5E687C);

/// Une publication d'entraide : offre ou demande, avec le nom
/// de son auteur, jamais son contact.
class EntraideItem {
  EntraideItem({
    required this.id,
    required this.type,
    required this.categorie,
    required this.titre,
    this.description = '',
    required this.statut,
    required this.auteurId,
    this.auteurNom = '',
    this.estAuteur = false,
    this.creeLe = '',
  });

  factory EntraideItem.fromJson(Map<String, dynamic> j) {
    return EntraideItem(
      id: (j['id'] ?? '').toString(),
      type: (j['type'] ?? '').toString(),
      categorie: (j['categorie'] ?? '').toString(),
      titre: (j['titre'] ?? '').toString(),
      description: (j['description'] ?? '').toString(),
      statut: (j['statut'] ?? 'ouverte').toString(),
      auteurId: (j['auteur_id'] ?? '').toString(),
      auteurNom: (j['auteur_nom'] ?? '').toString(),
      estAuteur: j['est_auteur'] == true,
      creeLe: (j['cree_le'] ?? '').toString(),
    );
  }

  final String id;
  final String type;
  final String categorie;
  final String titre;
  final String description;
  final String statut;
  final String auteurId;
  final String auteurNom;
  final bool estAuteur;
  final String creeLe;

  bool get estOffre => type == 'offre';
  bool get estResolue => statut == 'résolue';
}

/// Publications depuis la réponse du serveur, dans l'ordre
/// renvoyé.
List<EntraideItem> entraideDepuisReponse(Map<String, dynamic> data) {
  final lignes = data['entraide'];
  if (lignes is! List) return const [];
  return lignes.whereType<Map<String, dynamic>>().map(EntraideItem.fromJson).toList();
}

/// Libellé du statut, pour l'affichage.
String libelleStatutEntraide(String statut) {
  switch (statut) {
    case 'en cours':
      return tr('En cours');
    case 'résolue':
      return tr('Résolue');
    default:
      return tr('Ouverte');
  }
}

/// Page d'entraide entre membres, deux onglets Offres et
/// Demandes, formulaire de création, l'auteur marque sa
/// publication résolue, et un lien pour contacter l'auteur par
/// la messagerie existante.
class EntraidePage extends StatefulWidget {
  const EntraidePage({super.key, this.client, this.onContacter});

  /// Client injecté pour les tests, le client global sinon.
  final ApiClient? client;

  /// Contact de l'auteur, fourni par l'application : ouvre la
  /// conversation directe avec lui dans la messagerie.
  final Future<void> Function(BuildContext context, String auteurId)? onContacter;

  @override
  State<EntraidePage> createState() => _EntraidePageState();
}

class _EntraidePageState extends State<EntraidePage> with SingleTickerProviderStateMixin {
  late final TabController _onglets;
  List<EntraideItem> _items = const [];
  bool _charge = false;
  bool _enCours = false;

  ApiClient get _client => widget.client ?? api;

  @override
  void initState() {
    super.initState();
    _onglets = TabController(length: 2, vsync: this);
    _charger();
  }

  @override
  void dispose() {
    _onglets.dispose();
    super.dispose();
  }

  Future<void> _charger() async {
    try {
      final data = await _client.fetchEntraide();
      if (!mounted) return;
      setState(() {
        _items = entraideDepuisReponse(data);
        _charge = true;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() => _charge = true);
      _annoncer(e.toString());
    }
  }

  void _annoncer(String message) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
  }

  List<EntraideItem> get _offres => _items.where((x) => x.estOffre).toList();
  List<EntraideItem> get _demandes => _items.where((x) => !x.estOffre).toList();

  Future<void> _creer(String type) async {
    final categorie = TextEditingController();
    final titre = TextEditingController();
    final description = TextEditingController();
    final cree = await showDialog<bool>(
      context: context,
      builder: (c) => AlertDialog(
        title: Text(type == 'offre' ? tr('Nouvelle offre d’entraide') : tr('Nouvelle demande d’entraide')),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextField(
                controller: categorie,
                decoration: InputDecoration(labelText: tr('Catégorie')),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: titre,
                decoration: InputDecoration(labelText: tr('Titre')),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: description,
                maxLines: 3,
                decoration: InputDecoration(labelText: tr('Description')),
              ),
            ],
          ),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.of(c).pop(false), child: Text(tr('Annuler'))),
          TextButton(
            onPressed: () {
              if (categorie.text.trim().isEmpty || titre.text.trim().isEmpty) return;
              Navigator.of(c).pop(true);
            },
            child: Text(tr('Publier')),
          ),
        ],
      ),
    );
    if (cree != true) return;
    setState(() => _enCours = true);
    try {
      await _client.publierEntraide(type, categorie.text.trim(), titre.text.trim(), description.text.trim());
      if (mounted) _annoncer(tr('Publication créée.'));
    } catch (e) {
      if (mounted) _annoncer(e.toString());
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
    await _charger();
  }

  Future<void> _marquerResolue(EntraideItem item) async {
    if (_enCours) return;
    setState(() => _enCours = true);
    try {
      await _client.modifierStatutEntraide(item.id, 'résolue');
      if (mounted) _annoncer(tr('Publication marquée résolue.'));
    } catch (e) {
      if (mounted) _annoncer(e.toString());
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
    await _charger();
  }

  Future<void> _contacter(EntraideItem item) async {
    final contacter = widget.onContacter;
    if (contacter == null) return;
    if (_enCours) return;
    setState(() => _enCours = true);
    try {
      await contacter(context, item.auteurId);
    } catch (e) {
      if (mounted) _annoncer(e.toString());
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
  }

  Widget _carte(EntraideItem item) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(children: [
                Expanded(
                  child: Text(item.titre, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 17)),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: item.estResolue ? const Color(0xFFEAF0F6) : _or,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    libelleStatutEntraide(item.statut),
                    style: const TextStyle(color: _nuit, fontWeight: FontWeight.w700, fontSize: 12),
                  ),
                ),
              ]),
              const SizedBox(height: 4),
              Text(
                '${item.categorie} · ${item.auteurNom.isNotEmpty ? item.auteurNom : tr('Un membre')}',
                style: const TextStyle(color: _grisTexte, fontSize: 13),
              ),
              if (item.description.isNotEmpty) ...[
                const SizedBox(height: 8),
                Text(item.description, style: const TextStyle(fontSize: 14)),
              ],
              const SizedBox(height: 12),
              Row(children: [
                if (item.estAuteur && !item.estResolue)
                  OutlinedButton.icon(
                    onPressed: _enCours ? null : () => _marquerResolue(item),
                    icon: const Icon(Icons.check_circle_outlined, size: 18),
                    label: Text(tr('Marquer résolue')),
                  )
                else if (!item.estAuteur && widget.onContacter != null)
                  OutlinedButton.icon(
                    onPressed: _enCours ? null : () => _contacter(item),
                    icon: const Icon(Icons.chat_bubble_outline, size: 18),
                    label: Text(tr('Contacter l’auteur')),
                  ),
              ]),
            ],
          ),
        ),
      ),
    );
  }

  Widget _liste(List<EntraideItem> items, String vide) {
    if (!_charge) return const Center(child: CircularProgressIndicator());
    if (items.isEmpty) {
      return RefreshIndicator(
        onRefresh: _charger,
        child: ListView(
          children: [
            Padding(
              padding: const EdgeInsets.all(32),
              child: Text(vide, textAlign: TextAlign.center, style: const TextStyle(color: _grisTexte, fontSize: 15)),
            ),
          ],
        ),
      );
    }
    return RefreshIndicator(
      onRefresh: _charger,
      child: ListView.builder(
        itemCount: items.length,
        itemBuilder: (context, index) => _carte(items[index]),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(tr('Entraide entre membres')),
        bottom: TabBar(
          controller: _onglets,
          tabs: [
            Tab(text: tr('Offres')),
            Tab(text: tr('Demandes')),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _enCours
            ? null
            : () => _creer(_onglets.index == 0 ? 'offre' : 'demande'),
        icon: const Icon(Icons.add),
        label: Text(tr('Nouvelle publication')),
      ),
      body: TabBarView(
        controller: _onglets,
        children: [
          _liste(_offres, tr('Aucune offre d’entraide pour le moment. Publie la première.')),
          _liste(_demandes, tr('Aucune demande d’entraide pour le moment. Publie la première.')),
        ],
      ),
    );
  }
}
