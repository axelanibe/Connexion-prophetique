// Page Plus de la nouvelle coquille, tranche T1, 26 nov. 2026.
// Entrées dans l'ordre de la maquette. Les pages elles-mêmes
// arrivent en T9, elles s'ouvrent en état neutre pour l'instant.
import 'package:flutter/material.dart';

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
  _EntreePlus('Croissance spirituelle', Icons.trending_up_outlined, DestinationNouvelle.croissance),
  _EntreePlus('Galerie', Icons.photo_library_outlined, DestinationNouvelle.galerie),
  _EntreePlus('Mes fonctions', Icons.badge_outlined, DestinationNouvelle.fonctions),
  _EntreePlus('Abonnement', Icons.card_membership_outlined, DestinationNouvelle.abonnement),
  _EntreePlus('Espace structure', Icons.business_outlined, DestinationNouvelle.espaceStructure,
      sousTitre: 'Administrateurs'),
  _EntreePlus('Mes présences', Icons.check_circle_outline, DestinationNouvelle.presences),
  _EntreePlus('Aide et contact', Icons.help_outline, DestinationNouvelle.aide),
  _EntreePlus('Mes documents', Icons.folder_outlined, DestinationNouvelle.documents),
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
            trailing: const Icon(Icons.chevron_right, color: Colors.grey),
            onTap: () => onNaviguer(e.destination),
          ),
      ],
    );
  }
}
