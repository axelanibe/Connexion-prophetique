// Mes fonctions, tranche T9, 26 nov. 2026, correctif global
// 27 nov. 2026 : la page montre la fonction actuelle et les
// responsabilités affectées au membre, nominations actives,
// pas une liste déroulante de fonctions. Le changement de
// fonction reste dans Mon profil.
import 'package:flutter/material.dart';

import 'palette.dart';
import 'service_t9.dart';

class PageFonctions extends StatefulWidget {
  const PageFonctions({super.key, required this.service});
  final ServiceT9 service;

  @override
  State<PageFonctions> createState() => _PageFonctionsState();
}

class _PageFonctionsState extends State<PageFonctions> {
  var _charge = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerMembre();
    await widget.service.chargerMesNominations();
    if (mounted) setState(() => _charge = true);
  }

  @override
  Widget build(BuildContext context) {
    if (!_charge) {
      return const Center(child: CircularProgressIndicator());
    }
    final actuelle = widget.service.membre?.fonction ?? '';
    final nominations = widget.service.mesNominations;
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      children: [
        Card(
          color: PaletteNouvelle.bleuNuit,
          child: ListTile(
            leading:
                const Icon(Icons.badge_outlined, color: PaletteNouvelle.or),
            title: const Text(
              'Ma fonction',
              style: TextStyle(color: Colors.white70, fontSize: 13),
            ),
            subtitle: Text(
              actuelle.isEmpty ? 'Aucun' : actuelle,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 18,
                fontWeight: FontWeight.w800,
              ),
            ),
          ),
        ),
        const SizedBox(height: 16),
        const Text(
          'Mes responsabilités',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w700,
            color: PaletteNouvelle.bleuNuit,
          ),
        ),
        const SizedBox(height: 8),
        if (nominations.isEmpty)
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 12),
            child: Text(
              'Aucune responsabilité affectée.',
              style: TextStyle(fontSize: 14, color: Colors.black54),
            ),
          )
        else
          for (final n in nominations)
            Card(
              color: Colors.white,
              margin: const EdgeInsets.only(bottom: 8),
              child: ListTile(
                leading: const Icon(
                  Icons.work_outline,
                  color: PaletteNouvelle.bleuNuit,
                ),
                title: Text(n.fonctionLibelle),
                subtitle: Text(n.porteeLibelle),
              ),
            ),
      ],
    );
  }
}
