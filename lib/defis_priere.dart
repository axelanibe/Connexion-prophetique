// Défis de prière de 7 jours en groupe, 21 nov. 2026,
// tranches 1 à 3 de l'audit du 17 nov. : un défi dure 7 jours
// à partir de sa date de début, la structure comme un membre
// peut en créer un, chaque participant coche chaque jour fait,
// progression x/7. Le rappel matinal à 6 h est une
// notification locale, programmée à l'inscription et reprise à
// chaque ouverture tant que le défi est en cours, jamais
// envoyée par le serveur. À ne pas confondre avec le défi du
// quiz hebdomadaire, qui est un classement par score.
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import 'api.dart';
import 'i18n.dart';
import 'notifications.dart';

// Palette de l'application, mêmes valeurs que HomeWeb.
const _nuit = Color(0xFF0F1C2E);
const _or = Color(0xFFE5C158);
const _grisTexte = Color(0xFF5E687C);

/// Nombre de jours d'un défi.
const nbJoursDefi = 7;

/// Un défi de prière : titre, description, dates, nombre de
/// participants et ma participation seulement.
class DefiPriere {
  DefiPriere({
    required this.id,
    required this.titre,
    this.description = '',
    required this.dateDebut,
    required this.dateFin,
    this.participants = 0,
    this.inscrit = false,
    this.joursValides = const [],
  });

  factory DefiPriere.fromJson(Map<String, dynamic> j) {
    final jours = <int>[];
    final bruts = j['jours_valides'];
    if (bruts is List) {
      for (final b in bruts) {
        final n = b is int ? b : int.tryParse((b ?? '').toString());
        if (n != null && n >= 1 && n <= nbJoursDefi && !jours.contains(n)) jours.add(n);
      }
    }
    jours.sort();
    return DefiPriere(
      id: (j['id'] ?? '').toString(),
      titre: (j['titre'] ?? '').toString(),
      description: (j['description'] ?? '').toString(),
      dateDebut: (j['date_debut'] ?? '').toString(),
      dateFin: (j['date_fin'] ?? '').toString(),
      participants: j['participants'] is int ? j['participants'] as int : int.tryParse((j['participants'] ?? '').toString()) ?? 0,
      inscrit: j['inscrit'] == true,
      joursValides: jours,
    );
  }

  final String id;
  final String titre;
  final String description;
  final String dateDebut;
  final String dateFin;
  final int participants;
  final bool inscrit;
  final List<int> joursValides;

  int get progression => joursValides.length;
  bool jourFait(int jour) => joursValides.contains(jour);
}

/// Défis depuis la réponse du serveur, dans l'ordre renvoyé.
List<DefiPriere> defisPriereDepuisReponse(Map<String, dynamic> data) {
  final lignes = data['defis'];
  if (lignes is! List) return const [];
  return lignes.whereType<Map<String, dynamic>>().map(DefiPriere.fromJson).toList();
}

/// Numéro du jour en cours dans le défi, 1 à 7, ou null quand
/// aujourd'hui est hors de la fenêtre du défi. Fonction pure,
/// testée dans test/defis_priere_test.dart.
int? jourCourantDefiLocal(String dateDebutIso, DateTime now) {
  final debut = DateTime.tryParse(dateDebutIso);
  if (debut == null) return null;
  final debutJour = DateTime(debut.year, debut.month, debut.day);
  final aujourdHui = DateTime(now.year, now.month, now.day);
  final ecart = aujourdHui.difference(debutJour).inDays;
  if (ecart < 0 || ecart >= nbJoursDefi) return null;
  return ecart + 1;
}

/// Date AAAA-MM-JJ en « 21 nov. 2026 », ou la chaîne telle
/// quelle quand elle ne se lit pas.
String dateDefiCourte(String iso) {
  const mois = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  final d = DateTime.tryParse(iso);
  if (d == null) return iso;
  return '${d.day} ${mois[d.month - 1]} ${d.year}';
}

/// Page des défis de prière de 7 jours.
class DefisPrierePage extends StatefulWidget {
  const DefisPrierePage({super.key, this.client});

  /// Client injecté pour les tests, le client global sinon.
  final ApiClient? client;

  @override
  State<DefisPrierePage> createState() => _DefisPrierePageState();
}

class _DefisPrierePageState extends State<DefisPrierePage> {
  List<DefiPriere> _defis = const [];
  bool _charge = false;
  bool _enCours = false;

  ApiClient get _client => widget.client ?? api;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    try {
      final data = await _client.fetchDefisPriere();
      if (!mounted) return;
      setState(() {
        _defis = defisPriereDepuisReponse(data);
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

  Future<void> _rejoindre(DefiPriere defi) async {
    if (_enCours) return;
    setState(() => _enCours = true);
    try {
      await _client.rejoindreDefiPriere(defi.id);
      if (mounted) _annoncer(tr('Tu participes à ce défi. Rappel chaque matin à 6 h.'));
      // Rappel matinal, téléphone seulement : le web n'a pas de
      // notification locale, l'appel ne fait rien sur le web.
      if (!kIsWeb) {
        try {
          await DailyVerseNotifications.instance.scheduleDefiReminder(currentLang, defi.dateDebut);
        } catch (_) {}
      }
    } catch (e) {
      if (mounted) _annoncer(e.toString());
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
    await _charger();
  }

  Future<void> _cocher(DefiPriere defi, int jour) async {
    if (_enCours || defi.jourFait(jour)) return;
    setState(() => _enCours = true);
    try {
      await _client.validerJourDefiPriere(defi.id, jour);
      if (mounted) _annoncer(tr('Jour coché. Continue comme ça.'));
    } catch (e) {
      if (mounted) _annoncer(e.toString());
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
    await _charger();
  }

  Future<void> _creer() async {
    final titre = TextEditingController();
    final description = TextEditingController();
    var debut = DateTime.now();
    final cree = await showDialog<bool>(
      context: context,
      builder: (c) => StatefulBuilder(
        builder: (c, setDialogState) => AlertDialog(
          title: Text(tr('Nouveau défi de prière')),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                TextField(
                  controller: titre,
                  decoration: InputDecoration(labelText: tr('Titre du défi')),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: description,
                  maxLines: 3,
                  decoration: InputDecoration(labelText: tr('Description')),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(child: Text('${tr('Début :')} ${dateDefiCourte(debut.toIso8601String().substring(0, 10))}')),
                    TextButton(
                      onPressed: () async {
                        final choix = await showDatePicker(
                          context: c,
                          initialDate: debut,
                          firstDate: DateTime.now().subtract(const Duration(days: 6)),
                          lastDate: DateTime.now().add(const Duration(days: 365)),
                        );
                        if (choix != null) setDialogState(() => debut = choix);
                      },
                      child: Text(tr('Choisir')),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  tr('7 jours, un rappel chaque matin à 6 h pendant le défi.'),
                  style: const TextStyle(color: _grisTexte, fontSize: 13),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(onPressed: () => Navigator.of(c).pop(false), child: Text(tr('Annuler'))),
            TextButton(
              onPressed: () {
                if (titre.text.trim().isEmpty) return;
                Navigator.of(c).pop(true);
              },
              child: Text(tr('Créer')),
            ),
          ],
        ),
      ),
    );
    if (cree != true) return;
    setState(() => _enCours = true);
    try {
      await _client.creerDefiPriere(
        titre.text.trim(),
        description.text.trim(),
        debut.toIso8601String().substring(0, 10),
      );
      if (mounted) _annoncer(tr('Défi créé.'));
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
      appBar: AppBar(title: Text(tr('Défis de prière'))),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _enCours ? null : _creer,
        icon: const Icon(Icons.add),
        label: Text(tr('Nouveau défi')),
      ),
      body: !_charge
          ? const Center(child: CircularProgressIndicator())
          : _defis.isEmpty
              ? RefreshIndicator(
                  onRefresh: _charger,
                  child: ListView(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(32),
                        child: Text(
                          tr('Aucun défi de prière pour le moment. Crée le premier, 7 jours, un rappel chaque matin à 6 h.'),
                          textAlign: TextAlign.center,
                          style: const TextStyle(color: _grisTexte, fontSize: 15),
                        ),
                      ),
                    ],
                  ),
                )
              : RefreshIndicator(
                  onRefresh: _charger,
                  child: ListView.builder(
                    itemCount: _defis.length,
                    itemBuilder: (context, index) {
                      final defi = _defis[index];
                      final courant = jourCourantDefiLocal(defi.dateDebut, DateTime.now());
                      return Padding(
                        padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
                        child: Card(
                          child: Padding(
                            padding: const EdgeInsets.all(16),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(defi.titre, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 17)),
                                const SizedBox(height: 4),
                                Text(
                                  '${tr('Du')} ${dateDefiCourte(defi.dateDebut)} ${tr('au')} ${dateDefiCourte(defi.dateFin)} · ${defi.participants} ${tr('participants')}',
                                  style: const TextStyle(color: _grisTexte, fontSize: 13),
                                ),
                                if (defi.description.isNotEmpty) ...[
                                  const SizedBox(height: 8),
                                  Text(defi.description, style: const TextStyle(fontSize: 14)),
                                ],
                                if (defi.inscrit) ...[
                                  const SizedBox(height: 12),
                                  Row(
                                    children: [
                                      Text(
                                        '${defi.progression}/$nbJoursDefi',
                                        style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16, color: _nuit),
                                      ),
                                      const SizedBox(width: 8),
                                      Expanded(
                                        child: LinearProgressIndicator(
                                          value: defi.progression / nbJoursDefi,
                                          backgroundColor: const Color(0xFFEAF0F6),
                                          color: _or,
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 12),
                                  Wrap(
                                    spacing: 8,
                                    runSpacing: 8,
                                    children: List.generate(nbJoursDefi, (i) {
                                      final jour = i + 1;
                                      final fait = defi.jourFait(jour);
                                      final aVenir = courant == null || jour > courant;
                                      return FilterChip(
                                        label: Text('${tr('Jour')} $jour'),
                                        selected: fait,
                                        onSelected: fait || aVenir || _enCours ? null : (_) => _cocher(defi, jour),
                                        selectedColor: _or,
                                        checkmarkColor: _nuit,
                                      );
                                    }),
                                  ),
                                ] else ...[
                                  const SizedBox(height: 12),
                                  SizedBox(
                                    width: double.infinity,
                                    child: OutlinedButton.icon(
                                      onPressed: _enCours ? null : () => _rejoindre(defi),
                                      icon: const Icon(Icons.flag_outlined),
                                      label: Text(tr('Rejoindre ce défi')),
                                    ),
                                  ),
                                ],
                              ],
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
    );
  }
}
