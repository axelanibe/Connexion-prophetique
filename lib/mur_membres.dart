// Mur des membres, carte 174, coquille de la refonte totale,
// tranche 1, carte 176, 24 nov. 2026 : l'entrée existe sur
// l'accueil et dans le tiroir, la liste des publications arrive
// avec la carte 174. Aucun appel serveur ici, aucun état écrit,
// seulement l'état vide.
import 'package:flutter/material.dart';
import 'i18n.dart';
import 'main.dart';

class MurMembresPage extends StatelessWidget {
  const MurMembresPage({super.key});

  @override
  Widget build(BuildContext context) {
    return basic(tr('Mur des membres'), [
      EmptyNote(icon: Icons.people_outlined, text: tr('Aucune publication pour le moment.')),
    ]);
  }
}
