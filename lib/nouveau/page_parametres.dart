// Page Paramètres de la nouvelle coquille, tranche T1, 26 nov. 2026.
// La maquette ne montre aucun autre réglage, rien n'est inventé.
// Supprimer son compte : confirmation en deux temps, comme
// l'ancien Profil (carte 92, suppression douce, 30 jours pour
// annuler). Le branchement sur supprimerMonCompte se fait à la
// bascule T11, par le rappel onSupprimerCompte.
import 'package:flutter/material.dart';

import 'palette.dart';

class PageParametres extends StatelessWidget {
  const PageParametres({super.key, this.onSupprimerCompte});
  final VoidCallback? onSupprimerCompte;

  Future<void> _demanderSuppression(BuildContext context) async {
    final continuer = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Supprimer ton compte ?'),
        content: const Text(
          'Ton compte sera désactivé pendant 30 jours. Tu peux annuler la suppression pendant ce délai.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Annuler'),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Continuer'),
          ),
        ],
      ),
    );
    if (continuer != true || !context.mounted) return;
    final confirmer = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Confirmer la suppression'),
        content: const Text('Cette action désactive ton compte. Confirmer ?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Annuler'),
          ),
          FilledButton(
            style: FilledButton.styleFrom(backgroundColor: Colors.red),
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Oui, supprimer mon compte'),
          ),
        ],
      ),
    );
    if (confirmer == true) onSupprimerCompte?.call();
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: EdgeInsets.only(top: 8, bottom: 8 + MediaQuery.paddingOf(context).bottom),
      children: [
        const Padding(
          padding: EdgeInsets.fromLTRB(16, 8, 16, 8),
          child: Text(
            'Paramètres',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w700,
              color: PaletteNouvelle.bleuNuit,
            ),
          ),
        ),
        ListTile(
          leading: const Icon(Icons.delete_outline, color: Colors.red),
          title: const Text(
            'Supprimer son compte',
            style: TextStyle(color: Colors.red),
          ),
          onTap: () => _demanderSuppression(context),
        ),
      ],
    );
  }
}
