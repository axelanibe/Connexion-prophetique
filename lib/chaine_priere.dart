// Chaîne de prière en direct, 21 nov. 2026, tranche 1,
// décision d'Axel : 24 créneaux d'une heure, un membre par
// créneau, un créneau par membre et par jour. La page vit dans
// le tiroir, section La structure. Chaque créneau montre Libre
// ou le prénom du membre, l'en-tête montre les heures
// couvertes sur 24. Toucher un créneau libre engage le membre,
// toucher son propre créneau le libère, avec une confirmation
// courte, toucher le créneau d'un autre ne fait rien. La
// chaîne est celle du jour courant côté serveur, le prénom
// vient de la base, jamais inventé.
import 'package:flutter/material.dart';

import 'api.dart';
import 'i18n.dart';

// Palette de l'application, mêmes valeurs que HomeWeb.
const _nuit = Color(0xFF0F1C2E);
const _or = Color(0xFFE5C158);
const _grisTexte = Color(0xFF5E687C);

/// Nombre de créneaux dans une journée, un par heure.
const nbCreneauxPriere = 24;

/// Un créneau de la chaîne : son heure, le membre qui l'a
/// pris, ou rien quand il est libre.
class CreneauPriere {
  CreneauPriere({required this.heure, this.membreId, this.prenom = ''});

  factory CreneauPriere.fromJson(Map<String, dynamic> j) => CreneauPriere(
        heure: j['heure'] is int ? j['heure'] as int : int.tryParse((j['heure'] ?? '').toString()) ?? 0,
        membreId: (j['membre_id'] ?? '').toString().isEmpty ? null : (j['membre_id'] ?? '').toString(),
        prenom: (j['prenom'] ?? '').toString(),
      );

  final int heure;
  final String? membreId;
  final String prenom;

  bool get estLibre => membreId == null;
  bool estMien(String? monMembreId) => !estLibre && monMembreId != null && membreId == monMembreId;
}

/// Les 24 créneaux du jour, dans l'ordre, depuis la réponse
/// du serveur. Un créneau absent de la réponse est libre.
List<CreneauPriere> creneauxPriereDepuisReponse(Map<String, dynamic> data) {
  final parHeure = <int, CreneauPriere>{};
  final lignes = data['creneaux'];
  if (lignes is List) {
    for (final ligne in lignes) {
      if (ligne is Map<String, dynamic>) {
        final c = CreneauPriere.fromJson(ligne);
        if (c.heure >= 0 && c.heure < nbCreneauxPriere && !parHeure.containsKey(c.heure)) {
          parHeure[c.heure] = c;
        }
      }
    }
  }
  return List.generate(
    nbCreneauxPriere,
    (heure) => parHeure[heure] ?? CreneauPriere(heure: heure),
  );
}

/// Nombre d'heures couvertes sur 24, pour l'en-tête.
int heuresCouvertesPriere(List<CreneauPriere> creneaux) =>
    creneaux.where((c) => !c.estLibre).length;

/// Libellé d'un créneau, par exemple « 8 h – 9 h ».
String libelleCreneauPriere(int heure) {
  final suivante = (heure + 1) % 24;
  return '$heure h – $suivante h';
}

/// Page de la chaîne de prière du jour.
class ChainePrierePage extends StatefulWidget {
  const ChainePrierePage({super.key, this.client, this.membreId});

  /// Client injecté pour les tests, le client global sinon.
  final ApiClient? client;

  /// Identifiant de ma fiche membre injecté pour les tests, le
  /// jeton sinon.
  final String? membreId;

  @override
  State<ChainePrierePage> createState() => _ChainePrierePageState();
}

class _ChainePrierePageState extends State<ChainePrierePage> {
  List<CreneauPriere> _creneaux = List.generate(nbCreneauxPriere, (h) => CreneauPriere(heure: h));
  String? _jour;
  bool _charge = false;
  bool _enCours = false;

  ApiClient get _client => widget.client ?? api;
  String? get _monMembreId => widget.membreId ?? _client.membreId;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    try {
      final data = await _client.fetchChainePriere();
      if (!mounted) return;
      setState(() {
        _creneaux = creneauxPriereDepuisReponse(data);
        _jour = (data['jour'] ?? '').toString().isEmpty ? null : (data['jour'] ?? '').toString();
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

  Future<void> _toucher(CreneauPriere creneau) async {
    if (_enCours) return;
    if (!creneau.estLibre && !creneau.estMien(_monMembreId)) return;
    if (creneau.estLibre) {
      setState(() => _enCours = true);
      try {
        await _client.engagerCreneauPriere(creneau.heure);
        if (mounted) _annoncer(tr('Créneau pris. Merci pour ta prière.'));
      } catch (e) {
        if (mounted) _annoncer(e.toString());
      } finally {
        if (mounted) setState(() => _enCours = false);
      }
      await _charger();
      return;
    }
    final liberer = await showDialog<bool>(
      context: context,
      builder: (c) => AlertDialog(
        title: Text(tr('Libérer ce créneau ?')),
        content: Text(tr('Ton créneau redeviendra libre pour un autre membre.')),
        actions: [
          TextButton(onPressed: () => Navigator.of(c).pop(false), child: Text(tr('Annuler'))),
          TextButton(onPressed: () => Navigator.of(c).pop(true), child: Text(tr('Libérer'))),
        ],
      ),
    );
    if (liberer != true) return;
    setState(() => _enCours = true);
    try {
      await _client.libererCreneauPriere();
      if (mounted) _annoncer(tr('Créneau libéré.'));
    } catch (e) {
      if (mounted) _annoncer(e.toString());
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
    await _charger();
  }

  @override
  Widget build(BuildContext context) {
    final couverts = heuresCouvertesPriere(_creneaux);
    return Scaffold(
      appBar: AppBar(title: Text(tr('Chaîne de prière'))),
      body: !_charge
          ? const Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: _charger,
              child: ListView.builder(
                itemCount: _creneaux.length + 1,
                itemBuilder: (context, index) {
                  if (index == 0) {
                    return Padding(
                      padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
                      child: Card(
                        color: _nuit,
                        child: Padding(
                          padding: const EdgeInsets.all(16),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                '$couverts h ${tr('couvertes sur 24')}',
                                style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w800, fontSize: 20),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                tr('Un membre par créneau, un créneau par membre et par jour.'),
                                style: const TextStyle(color: Colors.white70, fontSize: 14),
                              ),
                              if (_jour != null) ...[
                                const SizedBox(height: 4),
                                Text(
                                  _jour!,
                                  style: const TextStyle(color: _or, fontSize: 14),
                                ),
                              ],
                            ],
                          ),
                        ),
                      ),
                    );
                  }
                  final creneau = _creneaux[index - 1];
                  final mien = creneau.estMien(_monMembreId);
                  return Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                    child: Card(
                      color: mien ? const Color(0xFFFFF7E0) : Colors.white,
                      child: ListTile(
                        leading: CircleAvatar(
                          backgroundColor: creneau.estLibre ? const Color(0xFFEAF0F6) : _nuit,
                          child: Icon(
                            creneau.estLibre ? Icons.hourglass_empty_outlined : Icons.favorite_outlined,
                            color: creneau.estLibre ? _grisTexte : _or,
                            size: 20,
                          ),
                        ),
                        title: Text(
                          libelleCreneauPriere(creneau.heure),
                          style: const TextStyle(fontWeight: FontWeight.w800),
                        ),
                        subtitle: Text(
                          mien
                              ? tr('Ton créneau, touche pour le libérer.')
                              : creneau.estLibre
                                  ? tr('Libre')
                                  : creneau.prenom,
                          style: const TextStyle(color: _grisTexte),
                        ),
                        trailing: mien
                            ? const Icon(Icons.check_circle_outlined, color: _nuit)
                            : creneau.estLibre
                                ? const Icon(Icons.chevron_right_outlined, color: _grisTexte)
                                : null,
                        onTap: () => _toucher(creneau),
                      ),
                    ),
                  );
                },
              ),
            ),
    );
  }
}
