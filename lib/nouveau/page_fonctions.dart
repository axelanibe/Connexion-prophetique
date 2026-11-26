// Mes fonctions, tranche T9, 26 nov. 2026.
// La fonction du membre et les 11 fonctions connues, comme à
// l'inscription. Changer de fonction appelle la route
// existante, comme Mon profil. Aucune fonction inventée.
import 'package:flutter/material.dart';

import 'modeles_profil.dart' show fonctionsMembre;
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
  var _enCours = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerMembre();
    if (mounted) setState(() => _charge = true);
  }

  Future<void> _choisir(String fonction) async {
    final actuelle = widget.service.membre?.fonction ?? '';
    if (fonction == actuelle || _enCours) return;
    setState(() => _enCours = true);
    final ok = await widget.service.changerFonction(fonction);
    if (!mounted) return;
    setState(() => _enCours = false);
    if (!ok) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Impossible pour le moment.')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!_charge) {
      return const Center(child: CircularProgressIndicator());
    }
    final actuelle = widget.service.membre?.fonction ?? '';
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      children: [
        Card(
          color: PaletteNouvelle.bleuNuit,
          child: ListTile(
            leading: const Icon(Icons.badge_outlined, color: PaletteNouvelle.or),
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
        for (final f in fonctionsMembre)
          Card(
            color: Colors.white,
            margin: const EdgeInsets.only(bottom: 8),
            child: ListTile(
              title: Text(f),
              trailing: f == actuelle
                  ? const Icon(Icons.check_circle,
                      color: PaletteNouvelle.orFonce)
                  : null,
              onTap: _enCours ? null : () => _choisir(f),
            ),
          ),
      ],
    );
  }
}
