// Page Plus de la nouvelle coquille, tranche T1, 26 nov. 2026.
// Entrées dans l'ordre de la maquette. Les pages elles-mêmes
// arrivent en T9, elles s'ouvrent en état neutre pour l'instant.
import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import 'destinations.dart';
import 'palette.dart';

class _EntreePlus {
  const _EntreePlus(this.titre, this.icone, this.destination, {this.sousTitre});
  final String titre;
  final IconData icone;
  final DestinationNouvelle destination;
  final String? sousTitre;
}

const _entreesPlus = [
  _EntreePlus('Croissance spirituelle', LucideIcons.sprout, DestinationNouvelle.croissance),
  _EntreePlus('Galerie', LucideIcons.image, DestinationNouvelle.galerie),
  _EntreePlus('Mes fonctions', LucideIcons.briefcase, DestinationNouvelle.fonctions),
  _EntreePlus('Abonnement', LucideIcons.creditCard, DestinationNouvelle.abonnement),
  _EntreePlus('Espace structure', LucideIcons.shield, DestinationNouvelle.espaceStructure,
      sousTitre: 'Administrateurs'),
  _EntreePlus('Mes présences', LucideIcons.circleCheck, DestinationNouvelle.presences),
  _EntreePlus('Aide et contact', LucideIcons.helpCircle, DestinationNouvelle.aide),
  _EntreePlus('Mes documents', LucideIcons.fileDown, DestinationNouvelle.documents),
];

class PagePlus extends StatelessWidget {
  const PagePlus({super.key, required this.onNaviguer});
  final void Function(DestinationNouvelle destination) onNaviguer;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.symmetric(vertical: 8),
      children: [
        const Padding(
          padding: EdgeInsets.fromLTRB(16, 8, 16, 8),
          child: Text(
            'Plus',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w700,
              color: PaletteNouvelle.bleuNuit,
            ),
          ),
        ),
        for (final e in _entreesPlus)
          ListTile(
            leading: Icon(e.icone, color: PaletteNouvelle.bleuNuit),
            title: Text(e.titre),
            subtitle: e.sousTitre == null ? null : Text(e.sousTitre!),
            trailing: const Icon(LucideIcons.chevronRight, color: Colors.grey),
            onTap: () => onNaviguer(e.destination),
          ),
      ],
    );
  }
}
