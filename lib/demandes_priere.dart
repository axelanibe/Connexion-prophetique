// Demandes de prière avec suivi, 21 nov. 2026, tranches 1 à
// 3 de l'audit du 17 nov. : le membre envoie une demande et
// suit son statut, ouvert, en cours ou exaucée, avec une note
// de suivi ajoutée par le Bureau. Les sujets de prière par
// e-mail existent déjà et ne changent pas. Le membre ne voit
// que les siennes, le Bureau voit toutes, dans son périmètre,
// et change le statut.
import 'package:flutter/material.dart';

import 'api.dart';
import 'i18n.dart';

// Palette de l'application, mêmes valeurs que HomeWeb.
const _nuit = Color(0xFF0F1C2E);
const _or = Color(0xFFE5C158);
const _grisTexte = Color(0xFF5E687C);

/// Statuts d'une demande, dans l'ordre du suivi.
const statutsDemandePriere = ['ouvert', 'en cours', 'exaucée'];

/// Une demande de prière : texte, statut, note de suivi.
class DemandePriere {
  DemandePriere({
    required this.id,
    required this.texte,
    this.statut = 'ouvert',
    this.noteSuivi = '',
    this.creeLe = '',
    this.prenom = '',
  });

  factory DemandePriere.fromJson(Map<String, dynamic> j) => DemandePriere(
        id: (j['id'] ?? '').toString(),
        texte: (j['texte'] ?? '').toString(),
        statut: (j['statut'] ?? 'ouvert').toString(),
        noteSuivi: (j['note_suivi'] ?? '').toString(),
        creeLe: (j['cree_le'] ?? '').toString(),
        prenom: (j['prenom'] ?? '').toString(),
      );

  final String id;
  final String texte;
  final String statut;
  final String noteSuivi;
  final String creeLe;
  final String prenom;
}

/// Demandes depuis la réponse du serveur, dans l'ordre renvoyé.
List<DemandePriere> demandesPriereDepuisReponse(Map<String, dynamic> data) {
  final lignes = data['demandes'];
  if (lignes is! List) return const [];
  return lignes.whereType<Map<String, dynamic>>().map(DemandePriere.fromJson).toList();
}

Color _couleurStatut(String statut) {
  switch (statut) {
    case 'en cours':
      return _or;
    case 'exaucée':
      return const Color(0xFF2E7D32);
    default:
      return _nuit;
  }
}

/// Page des demandes de prière : mes demandes et leur suivi,
/// et, pour le Bureau, toutes les demandes avec changement de
/// statut.
class DemandesPrierePage extends StatefulWidget {
  const DemandesPrierePage({super.key, this.client, this.estBureau = false});

  /// Client injecté pour les tests, le client global sinon.
  final ApiClient? client;

  /// Vrai quand l'ouverture vient du Bureau : un deuxième
  /// onglet liste toutes les demandes, avec changement de
  /// statut. Le serveur vérifie le rôle, jamais l'application
  /// seule.
  final bool estBureau;

  @override
  State<DemandesPrierePage> createState() => _DemandesPrierePageState();
}

class _DemandesPrierePageState extends State<DemandesPrierePage> {
  List<DemandePriere> _miennes = const [];
  List<DemandePriere> _bureau = const [];
  bool _charge = false;
  bool _enCours = false;
  int _onglet = 0;

  ApiClient get _client => widget.client ?? api;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    try {
      final data = await _client.fetchDemandesPriere();
      List<DemandePriere> bureau = const [];
      if (widget.estBureau) {
        try {
          final donneesBureau = await _client.fetchDemandesPriereBureau();
          bureau = demandesPriereDepuisReponse(donneesBureau);
        } catch (_) {}
      }
      if (!mounted) return;
      setState(() {
        _miennes = demandesPriereDepuisReponse(data);
        _bureau = bureau;
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

  Future<void> _envoyer() async {
    final texte = TextEditingController();
    final envoie = await showDialog<bool>(
      context: context,
      builder: (c) => AlertDialog(
        title: Text(tr('Nouvelle demande de prière')),
        content: TextField(
          controller: texte,
          maxLines: 5,
          decoration: InputDecoration(labelText: tr('Ta demande')),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.of(c).pop(false), child: Text(tr('Annuler'))),
          TextButton(
            onPressed: () {
              if (texte.text.trim().isEmpty) return;
              Navigator.of(c).pop(true);
            },
            child: Text(tr('Envoyer')),
          ),
        ],
      ),
    );
    if (envoie != true) return;
    setState(() => _enCours = true);
    try {
      await _client.envoyerDemandePriere(texte.text.trim());
      if (mounted) _annoncer(tr('Demande envoyée. Le Bureau te répondra ici.'));
    } catch (e) {
      if (mounted) _annoncer(e.toString());
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
    await _charger();
  }

  Future<void> _changerStatut(DemandePriere demande) async {
    var statut = demande.statut;
    if (!statutsDemandePriere.contains(statut)) statut = 'ouvert';
    final note = TextEditingController(text: demande.noteSuivi);
    final enregistre = await showDialog<bool>(
      context: context,
      builder: (c) => StatefulBuilder(
        builder: (c, setDialogState) => AlertDialog(
          title: Text(tr('Suivi de la demande')),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(demande.texte, style: const TextStyle(fontSize: 14)),
                const SizedBox(height: 16),
                DropdownButton<String>(
                  value: statut,
                  isExpanded: true,
                  items: statutsDemandePriere
                      .map((s) => DropdownMenuItem(value: s, child: Text(tr(s))))
                      .toList(),
                  onChanged: (v) {
                    if (v != null) setDialogState(() => statut = v);
                  },
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: note,
                  maxLines: 3,
                  decoration: InputDecoration(labelText: tr('Note de suivi')),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(onPressed: () => Navigator.of(c).pop(false), child: Text(tr('Annuler'))),
            TextButton(onPressed: () => Navigator.of(c).pop(true), child: Text(tr('Enregistrer'))),
          ],
        ),
      ),
    );
    if (enregistre != true) return;
    setState(() => _enCours = true);
    try {
      await _client.modifierDemandePriere(demande.id, statut, note.text.trim());
      if (mounted) _annoncer(tr('Suivi enregistré.'));
    } catch (e) {
      if (mounted) _annoncer(e.toString());
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
    await _charger();
  }

  Widget _carteDemande(DemandePriere demande, {bool bureau = false}) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  if (demande.prenom.isNotEmpty) ...[
                    Text(
                      demande.prenom,
                      style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 15, color: _nuit),
                    ),
                    const SizedBox(width: 8),
                  ],
                  Chip(
                    label: Text(tr(demande.statut), style: const TextStyle(fontSize: 12)),
                    backgroundColor: _couleurStatut(demande.statut).withValues(alpha: 0.15),
                    side: BorderSide.none,
                  ),
                  const Spacer(),
                  if (demande.creeLe.length >= 10)
                    Text(
                      demande.creeLe.substring(0, 10),
                      style: const TextStyle(color: _grisTexte, fontSize: 12),
                    ),
                ],
              ),
              const SizedBox(height: 8),
              Text(demande.texte, style: const TextStyle(fontSize: 15)),
              if (demande.noteSuivi.isNotEmpty) ...[
                const SizedBox(height: 8),
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFFF7E0),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    '${tr('Note du Bureau :')} ${demande.noteSuivi}',
                    style: const TextStyle(fontSize: 14),
                  ),
                ),
              ],
              if (bureau) ...[
                const SizedBox(height: 12),
                SizedBox(
                  width: double.infinity,
                  child: OutlinedButton.icon(
                    onPressed: _enCours ? null : () => _changerStatut(demande),
                    icon: const Icon(Icons.edit_outlined),
                    label: Text(tr('Changer le statut')),
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Widget _liste(List<DemandePriere> demandes, String vide, {bool bureau = false}) {
    final contenu = demandes.isEmpty
        ? ListView(
            children: [
              Padding(
                padding: const EdgeInsets.all(32),
                child: Text(
                  vide,
                  textAlign: TextAlign.center,
                  style: const TextStyle(color: _grisTexte, fontSize: 15),
                ),
              ),
            ],
          )
        : ListView.builder(
            itemCount: demandes.length,
            itemBuilder: (context, index) => _carteDemande(demandes[index], bureau: bureau),
          );
    return RefreshIndicator(onRefresh: _charger, child: contenu);
  }

  @override
  Widget build(BuildContext context) {
    final corps = !_charge
        ? const Center(child: CircularProgressIndicator())
        : widget.estBureau
            ? IndexedStack(
                index: _onglet,
                children: [
                  _liste(
                    _miennes,
                    tr('Tu n’as envoyé aucune demande de prière.'),
                  ),
                  _liste(
                    _bureau,
                    tr('Aucune demande de prière pour le moment.'),
                    bureau: true,
                  ),
                ],
              )
            : _liste(
                _miennes,
                tr('Tu n’as envoyé aucune demande de prière.'),
              );
    final page = Scaffold(
      appBar: AppBar(
        title: Text(tr('Demandes de prière')),
        bottom: widget.estBureau
            ? TabBar(
                onTap: (i) => setState(() => _onglet = i),
                tabs: [
                  Tab(text: tr('Mes demandes')),
                  Tab(text: tr('Toutes les demandes')),
                ],
              )
            : null,
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _enCours ? null : _envoyer,
        icon: const Icon(Icons.add),
        label: Text(tr('Nouvelle demande')),
      ),
      body: corps,
    );
    // La barre d'onglets du Bureau a besoin de son contrôleur
    // au-dessus de la page entière, pas seulement du corps.
    if (!widget.estBureau) return page;
    return DefaultTabController(length: 2, child: page);
  }
}
