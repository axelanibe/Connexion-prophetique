// Page neutre, tranche T1, 26 nov. 2026.
// Titre seulement, en attendant la tranche qui construit la page.
// Aucun contenu inventé, aucune fausse donnée.
import 'package:flutter/material.dart';

import 'palette.dart';

class PageNeutre extends StatelessWidget {
  const PageNeutre(this.titre, {super.key});
  final String titre;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(
        titre,
        style: const TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.w700,
          color: PaletteNouvelle.bleuNuit,
        ),
      ),
    );
  }
}
