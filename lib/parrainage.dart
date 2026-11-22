// Parrainage d'un nouveau membre jusqu'au baptême, 21 nov.
// 2026, tranches 4 et 5 de l'audit du 17 nov. : la structure
// désigne un parrain pour un nouveau membre, le parrain voit
// ses filleuls et leur avancement, le filleul voit son
// parrain, la structure marque le baptême, ce qui clôt le
// parrainage. Aucun membre ni aucune date de baptême n'est
// inventé : les identifiants viennent de la liste des membres
// du Bureau, la date du baptême est choisie au moment où il
// a lieu.
import 'package:flutter/material.dart';

import 'api.dart';
import 'i18n.dart';

// Palette de l'application, mêmes valeurs que HomeWeb.
const _nuit = Color(0xFF0F1C2E);
const _or = Color(0xFFE5C158);
const _grisTexte = Color(0xFF5E687C);

/// Statuts d'un parrainage, dans l'ordre de la vie du suivi.
const statutsParrainage = ['en cours', 'baptisé'];

/// Un parrainage : parrain, filleul, dates et statut.
class Parrainage {
  Parrainage({
    required this.id,
    required this.parrainId,
    this.parrainNom = '',
    required this.filleulId,
    this.filleulNom = '',
    this.dateDebut = '',
    this.statut = 'en cours',
    this.dateBapteme,
  });

  factory Parrainage.fromJson(Map<String, dynamic> j) => Parrainage(
        id: (j['id'] ?? '').toString(),
        parrainId: (j['parrain_id'] ?? '').toString(),
        parrainNom: (j['parrain_nom'] ?? '').toString(),
        filleulId: (j['filleul_id'] ?? '').toString(),
        filleulNom: (j['filleul_nom'] ?? '').toString(),
        dateDebut: (j['date_debut'] ?? '').toString(),
        statut: (j['statut'] ?? 'en cours').toString(),
        dateBapteme: (j['date_bapteme'] ?? '').toString().isEmpty ? null : (j['date_bapteme'] ?? '').toString(),
      );

  final String id;
  final String parrainId;
  final String parrainNom;
  final String filleulId;
  final String filleulNom;
  final String dateDebut;
  final String statut;
  final String? dateBapteme;

  bool get estBaptise => statut == 'baptisé';
}

/// Parrainages depuis la réponse du serveur, dans l'ordre renvoyé.
List<Parrainage> parrainagesDepuisReponse(Map<String, dynamic> data) {
  final lignes = data['parrainages'];
  if (lignes is! List) return const [];
  return lignes.whereType<Map<String, dynamic>>().map(Parrainage.fromJson).toList();
}

/// Date AAAA-MM-JJ en « 21 nov. 2026 », ou la chaîne telle
/// quelle quand elle ne se lit pas.
String dateParrainageCourte(String iso) {
  const mois = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  final d = DateTime.tryParse(iso);
  if (d == null) return iso;
  return '${d.day} ${mois[d.month - 1]} ${d.year}';
}

Color _couleurStatutParrainage(String statut) {
  switch (statut) {
    case 'baptisé':
      return const Color(0xFF2E7D32);
    default:
      return _or;
  }
}

/// Page du parrainage : mon parrain et mes filleuls, et, pour
/// le Bureau, la désignation d'un parrain et le marquage du
/// baptême.
class ParrainagePage extends StatefulWidget {
  const ParrainagePage({super.key, this.client, this.estBureau = false});

  /// Client injecté pour les tests, le client global sinon.
  final ApiClient? client;

  /// Vrai quand l'ouverture vient du Bureau : désignation et
  /// liste de tous les parrainages, avec marquage du baptême.
  /// Le serveur vérifie le rôle, jamais l'application seule.
  final bool estBureau;

  @override
  State<ParrainagePage> createState() => _ParrainagePageState();
}

class _ParrainagePageState extends State<ParrainagePage> {
  Parrainage? _monParrain;
  List<Parrainage> _mesFilleuls = const [];
  List<Parrainage> _bureau = const [];
  List<Map<String, dynamic>> _membres = const [];
  bool _charge = false;
  bool _enCours = false;
  String? _parrainChoisi;
  String? _filleulChoisi;

  ApiClient get _client => widget.client ?? api;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    try {
      final data = await _client.fetchParrainages();
      List<Parrainage> bureau = const [];
      List<Map<String, dynamic>> membres = const [];
      if (widget.estBureau) {
        try {
          final donneesBureau = await _client.fetchParrainagesBureau();
          bureau = parrainagesDepuisReponse(donneesBureau);
        } catch (_) {}
        try {
          membres = await _client.fetchAdminMembres();
        } catch (_) {}
      }
      if (!mounted) return;
      setState(() {
        final mon = data['mon_parrain'];
        _monParrain = mon is Map<String, dynamic> ? Parrainage.fromJson(mon) : null;
        final commeParrain = data['comme_parrain'];
        _mesFilleuls = commeParrain is List
            ? commeParrain.whereType<Map<String, dynamic>>().map(Parrainage.fromJson).toList()
            : const [];
        _bureau = bureau;
        _membres = membres;
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

  String _nomMembre(Map<String, dynamic> m) {
    final nom = (m['nom_complet'] ?? '').toString();
    final matricule = (m['matricule'] ?? '').toString();
    return matricule.isEmpty ? nom : '$nom ($matricule)';
  }

  Future<void> _designer() async {
    if (_enCours || _parrainChoisi == null || _filleulChoisi == null) return;
    setState(() => _enCours = true);
    try {
      await _client.designerParrainage(_parrainChoisi!, _filleulChoisi!);
      if (mounted) _annoncer(tr('Parrain désigné.'));
      if (mounted) setState(() => _parrainChoisi = null);
      if (mounted) setState(() => _filleulChoisi = null);
    } catch (e) {
      if (mounted) _annoncer(e.toString());
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
    await _charger();
  }

  Future<void> _marquerBapteme(Parrainage p) async {
    final choix = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime.now().subtract(const Duration(days: 365 * 5)),
      lastDate: DateTime.now(),
    );
    if (choix == null || _enCours) return;
    setState(() => _enCours = true);
    try {
      await _client.marquerBapteme(p.id, choix.toIso8601String().substring(0, 10));
      if (mounted) _annoncer(tr('Baptême marqué. Parrainage clos.'));
    } catch (e) {
      if (mounted) _annoncer(e.toString());
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
    await _charger();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(tr('Parrainage'))),
      body: !_charge
          ? const Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: _charger,
              child: ListView(
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
                children: [
                  if (widget.estBureau) ...[
                    Card(
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(tr('Désigner un parrain'), style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 17)),
                            const SizedBox(height: 12),
                            DropdownButtonFormField<String>(
                              value: _parrainChoisi,
                              decoration: InputDecoration(labelText: tr('Parrain')),
                              items: [
                                for (final m in _membres)
                                  DropdownMenuItem(value: (m['id'] ?? '').toString(), child: Text(_nomMembre(m))),
                              ],
                              onChanged: (v) => setState(() => _parrainChoisi = v),
                            ),
                            const SizedBox(height: 12),
                            DropdownButtonFormField<String>(
                              value: _filleulChoisi,
                              decoration: InputDecoration(labelText: tr('Filleul')),
                              items: [
                                for (final m in _membres)
                                  DropdownMenuItem(value: (m['id'] ?? '').toString(), child: Text(_nomMembre(m))),
                              ],
                              onChanged: (v) => setState(() => _filleulChoisi = v),
                            ),
                            const SizedBox(height: 12),
                            SizedBox(
                              width: double.infinity,
                              child: FilledButton(
                                onPressed: _enCours || _parrainChoisi == null || _filleulChoisi == null ? null : _designer,
                                child: Text(tr('Désigner ce parrain')),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(tr('Tous les parrainages'), style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 17)),
                    const SizedBox(height: 8),
                    if (_bureau.isEmpty)
                      Text(tr('Aucun parrainage pour le moment.'), style: const TextStyle(color: _grisTexte, fontSize: 15))
                    else
                      for (final p in _bureau) _carteParrainage(p, _AffichageParrainage.tous),
                  ] else ...[
                    Text(tr('Mon parrain'), style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 17)),
                    const SizedBox(height: 8),
                    if (_monParrain == null)
                      Text(tr('Aucun parrain pour le moment.'), style: const TextStyle(color: _grisTexte, fontSize: 15))
                    else
                      _carteParrainage(_monParrain!, _AffichageParrainage.parrain),
                    const SizedBox(height: 16),
                    Text(tr('Mes filleuls'), style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 17)),
                    const SizedBox(height: 8),
                    if (_mesFilleuls.isEmpty)
                      Text(tr('Aucun filleul pour le moment.'), style: const TextStyle(color: _grisTexte, fontSize: 15))
                    else
                      for (final p in _mesFilleuls) _carteParrainage(p, _AffichageParrainage.filleul),
                  ],
                ],
              ),
            ),
    );
  }

  Widget _carteParrainage(Parrainage p, _AffichageParrainage affichage) {
    final bureau = affichage == _AffichageParrainage.tous;
    final nom = switch (affichage) {
      _AffichageParrainage.parrain => p.parrainNom.isEmpty ? tr('Parrain') : p.parrainNom,
      _AffichageParrainage.filleul => p.filleulNom.isEmpty ? tr('Filleul') : p.filleulNom,
      _AffichageParrainage.tous =>
        '${p.filleulNom.isEmpty ? tr('Filleul') : p.filleulNom} · ${tr('Parrain')} : ${p.parrainNom.isEmpty ? '—' : p.parrainNom}',
    };
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(child: Text(nom, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16))),
                Chip(
                  label: Text(tr(p.statut)),
                  backgroundColor: _couleurStatutParrainage(p.statut),
                  labelStyle: TextStyle(color: p.estBaptise ? Colors.white : _nuit, fontWeight: FontWeight.w700),
                ),
              ],
            ),
            const SizedBox(height: 4),
            Text(
              '${tr('Depuis le')} ${dateParrainageCourte(p.dateDebut)}'
              '${p.dateBapteme != null ? ' · ${tr('Baptisé le')} ${dateParrainageCourte(p.dateBapteme!)}' : ''}',
              style: const TextStyle(color: _grisTexte, fontSize: 13),
            ),
            if (bureau && !p.estBaptise) ...[
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: OutlinedButton.icon(
                  onPressed: _enCours ? null : () => _marquerBapteme(p),
                  icon: const Icon(Icons.water_drop_outlined),
                  label: Text(tr('Marquer le baptême')),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

/// Ce que la carte montre : le parrain seul, le filleul seul,
/// ou les deux pour le Bureau.
enum _AffichageParrainage { parrain, filleul, tous }
