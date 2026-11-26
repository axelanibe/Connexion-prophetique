// Chaîne de prière, tranche T9, 26 nov. 2026.
// 24 créneaux d'une heure, un membre par créneau, un créneau
// par membre et par jour, routes existantes. Un jour passé est
// en lecture seule, côté serveur. Mon créneau est souvenu sur
// cet appareil seulement, jamais en base.
import 'package:flutter/material.dart';

import 'modeles_t9.dart';
import 'palette.dart';
import 'service_t9.dart';

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

  Future<void> _charger({String? jour}) async {
    await widget.service.chargerChaine(jour: jour);
    if (mounted) setState(() => _charge = true);
  }

  DateTime get _jourAffiche {
    final j = widget.service.jourChaine;
    return DateTime.tryParse(j) ?? DateTime.now();
  }

  String _jourTexte(DateTime j) =>
      '${j.day.toString().padLeft(2, '0')}/${j.month.toString().padLeft(2, '0')}/${j.year}';

  String _iso(DateTime j) =>
      '${j.year}-${j.month.toString().padLeft(2, '0')}-${j.day.toString().padLeft(2, '0')}';

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
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      children: [
        Row(
          children: [
            IconButton(
              icon: const Icon(Icons.chevron_left),
              color: PaletteNouvelle.bleuNuit,
              onPressed: () => _charger(
                  jour: _iso(_jourAffiche.subtract(const Duration(days: 1)))),
            ),
            Expanded(
              child: Text(
                _jourTexte(_jourAffiche),
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 17,
                  fontWeight: FontWeight.w800,
                  color: PaletteNouvelle.bleuNuit,
                ),
              ),
            ),
            IconButton(
              icon: const Icon(Icons.chevron_right),
              color: PaletteNouvelle.bleuNuit,
              onPressed: () =>
                  _charger(jour: _iso(_jourAffiche.add(const Duration(days: 1)))),
            ),
          ],
        ),
        Text(
          '${s.couverts} h couvertes sur ${s.totalCreneaux}',
          textAlign: TextAlign.center,
          style: const TextStyle(color: Colors.grey, fontSize: 14),
        ),
        if (monCreneau != null) ...[
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: PaletteNouvelle.or.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              children: [
                const Icon(Icons.favorite,
                    color: PaletteNouvelle.orFonce, size: 20),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Mon créneau : ${libelleCreneau(monCreneau.heure)}',
                    style: const TextStyle(fontWeight: FontWeight.w700),
                  ),
                ),
                if (!passe)
                  TextButton(
                    onPressed: _enCours
                        ? null
                        : () => _agir(() => s.libererCreneau()),
                    child: const Text('Libérer'),
                  ),
              ],
            ),
          ),
        ],
        const SizedBox(height: 12),
        for (final c in s.creneaux)
          _TuileCreneau(
            creneau: c,
            estMien: c.estMien,
            lectureSeule: passe || _enCours,
            aDejaUnCreneau: monCreneau != null,
            onEngager: () => _agir(() => s.engagerCreneau(c.heure)),
            onDeplacer: () =>
                _agir(() => s.engagerCreneau(c.heure, deplacer: true)),
          ),
      ],
    );
  }
}

class _TuileCreneau extends StatelessWidget {
  const _TuileCreneau({
    required this.creneau,
    required this.estMien,
    required this.lectureSeule,
    required this.aDejaUnCreneau,
    required this.onEngager,
    required this.onDeplacer,
  });
  final CreneauPriere creneau;
  final bool estMien;
  final bool lectureSeule;
  final bool aDejaUnCreneau;
  final VoidCallback onEngager;
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
        title: Text(libelleCreneau(creneau.heure)),
        subtitle: Text(
          estMien
              ? 'Mon créneau'
              : creneau.estLibre
                  ? 'Libre'
                  : creneau.prenom,
        ),
        trailing: lectureSeule || estMien
            ? null
            : creneau.estLibre
                ? TextButton(
                    onPressed: aDejaUnCreneau ? onDeplacer : onEngager,
                    child: Text(aDejaUnCreneau ? 'Déplacer ici' : 'S’engager'),
                  )
                : null,
      ),
    );
  }
}
