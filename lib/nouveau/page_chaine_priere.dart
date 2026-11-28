// Chaîne de prière, tranche T9, 26 nov. 2026, correctif global
// 27 nov. 2026 : alignée sur la maquette, 3 temps nommés
// seulement, bouton Rejoindre. Les routes restent les mêmes,
// les 3 temps sont les créneaux d'une heure 5 h, 12 h et 21 h.
import 'package:flutter/material.dart';

import 'modeles_t9.dart';
import 'palette.dart';
import 'service_t9.dart';

/// Les 3 temps de la maquette : heure de début et nom.
const _tempsPriere = <(int, String)>[
  (5, 'Prière du matin'),
  (12, 'Prière de midi'),
  (21, 'Prière du soir'),
];

class PageChainePriere extends StatefulWidget {
  const PageChainePriere({super.key, required this.service});
  final ServiceT9 service;

  @override
  State<PageChainePriere> createState() => _PageChainePriereState();
}

class _PageChainePriereState extends State<PageChainePriere> {
  var _charge = false;
  var _enCours = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerChaine();
    if (mounted) setState(() => _charge = true);
  }

  String _jourTexte(DateTime j) =>
      '${j.day.toString().padLeft(2, '0')}/${j.month.toString().padLeft(2, '0')}/${j.year}';

  Future<void> _agir(Future<bool> Function() action) async {
    if (_enCours) return;
    setState(() => _enCours = true);
    final ok = await action();
    if (mounted) {
      setState(() => _enCours = false);
      if (!ok) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Impossible pour le moment.')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.service;
    if (!_charge) {
      return const Center(child: CircularProgressIndicator());
    }
    final passe = s.chainePasse;
    final monCreneau = s.monCreneau;
    final temps = [
      for (final (heure, _) in _tempsPriere)
        s.creneaux.firstWhere(
          (c) => c.heure == heure,
          orElse: () => CreneauPriere(heure: heure, prenom: ''),
        ),
    ];
    final couverts = temps.where((c) => !c.estLibre).length;
    final monTemps = monCreneau == null
        ? null
        : _tempsPriere
                .where((t) => t.$1 == monCreneau.heure)
                .map((t) => t.$2)
                .firstOrNull ??
            libelleCreneau(monCreneau.heure);
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      children: [
        Text(
          _jourTexte(DateTime.now()),
          textAlign: TextAlign.center,
          style: const TextStyle(
            fontSize: 17,
            fontWeight: FontWeight.w800,
            color: PaletteNouvelle.bleuNuit,
          ),
        ),
        Text(
          '$couverts temps couverts sur 3',
          textAlign: TextAlign.center,
          style: const TextStyle(color: Colors.grey, fontSize: 14),
        ),
        if (monTemps != null) ...[
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: PaletteNouvelle.or.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              children: [
                const Icon(
                  Icons.favorite,
                  color: PaletteNouvelle.orFonce,
                  size: 20,
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Mon temps : $monTemps',
                    style: const TextStyle(fontWeight: FontWeight.w700),
                  ),
                ),
                if (!passe)
                  TextButton(
                    onPressed:
                        _enCours ? null : () => _agir(() => s.libererCreneau()),
                    child: const Text('Libérer'),
                  ),
              ],
            ),
          ),
        ],
        const SizedBox(height: 12),
        for (var i = 0; i < temps.length; i++)
          _TuileTemps(
            creneau: temps[i],
            nom: _tempsPriere[i].$2,
            estMien: temps[i].estMien,
            lectureSeule: passe || _enCours,
            aDejaUnTemps: monCreneau != null,
            onRejoindre: () => _agir(() => s.engagerCreneau(temps[i].heure)),
            onDeplacer: () => _agir(
              () => s.engagerCreneau(temps[i].heure, deplacer: true),
            ),
          ),
      ],
    );
  }
}

class _TuileTemps extends StatelessWidget {
  const _TuileTemps({
    required this.creneau,
    required this.nom,
    required this.estMien,
    required this.lectureSeule,
    required this.aDejaUnTemps,
    required this.onRejoindre,
    required this.onDeplacer,
  });
  final CreneauPriere creneau;
  final String nom;
  final bool estMien;
  final bool lectureSeule;
  final bool aDejaUnTemps;
  final VoidCallback onRejoindre;
  final VoidCallback onDeplacer;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      color: estMien ? const Color(0xFFFFF7E0) : Colors.white,
      child: ListTile(
        leading: Icon(
          creneau.estLibre ? Icons.schedule_outlined : Icons.favorite,
          color: estMien
              ? PaletteNouvelle.orFonce
              : creneau.estLibre
                  ? Colors.grey
                  : PaletteNouvelle.bleuNuit,
        ),
        title: Text('$nom, ${libelleCreneau(creneau.heure)}'),
        subtitle: Text(
          estMien
              ? 'Mon temps'
              : creneau.estLibre
                  ? 'Libre'
                  : creneau.prenom,
        ),
        trailing: lectureSeule || estMien
            ? null
            : TextButton(
                onPressed: aDejaUnTemps ? onDeplacer : onRejoindre,
                child: Text(aDejaUnTemps ? 'Déplacer ici' : 'Rejoindre'),
              ),
      ),
    );
  }
}
