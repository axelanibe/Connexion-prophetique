// Abonnement, tranche T9, 26 nov. 2026.
// Seul l'Abonnement Plateforme existe, carte 83, 100 000 FCFA
// par an, pour les établissements. La demande reste en attente
// tant que la structure ne l'a pas validée après contrôle de
// son compte Wave, comme la carte de membre.
import 'package:flutter/material.dart';

import 'palette.dart';
import 'service_t9.dart';

class PageAbonnement extends StatefulWidget {
  const PageAbonnement({super.key, required this.service});
  final ServiceT9 service;

  @override
  State<PageAbonnement> createState() => _PageAbonnementState();
}

class _PageAbonnementState extends State<PageAbonnement> {
  var _charge = false;
  var _enCours = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerAbonnement();
    if (mounted) setState(() => _charge = true);
  }

  Future<void> _demander() async {
    if (_enCours) return;
    setState(() => _enCours = true);
    final ok = await widget.service.demanderAbonnement();
    if (!mounted) return;
    setState(() => _enCours = false);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(ok
            ? 'Demande envoyée. La structure la valide après contrôle de son compte Wave.'
            : 'Impossible pour le moment.'),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (!_charge) {
      return const Center(child: CircularProgressIndicator());
    }
    final a = widget.service.abonnement;
    final dateFin = a.dateFin;
    return ListView(
      padding: EdgeInsets.fromLTRB(16, 12, 16, 24 + MediaQuery.paddingOf(context).bottom),
      children: [
        Card(
          color: PaletteNouvelle.bleuNuit,
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Abonnement Plateforme',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 4),
                const Text(
                  '100 000 FCFA par an, pour les établissements',
                  style: TextStyle(color: Colors.white70, fontSize: 14),
                ),
                const SizedBox(height: 12),
                Text(
                  a.estActif
                      ? 'Actif, ${a.joursRestants} jours restants'
                      : a.statut,
                  style: const TextStyle(
                    color: PaletteNouvelle.or,
                    fontSize: 15,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                if (dateFin != null)
                  Text(
                    'Jusqu’au ${dateFin.day}/${dateFin.month}/${dateFin.year}',
                    style: const TextStyle(color: Colors.white70, fontSize: 14),
                  ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        if (!a.estActif)
          SizedBox(
            width: double.infinity,
            child: FilledButton(
              style: FilledButton.styleFrom(
                backgroundColor: PaletteNouvelle.bleuNuit,
              ),
              onPressed: _enCours ? null : _demander,
              child: const Text('S’abonner : 100 000 FCFA par an'),
            ),
          ),
      ],
    );
  }
}
