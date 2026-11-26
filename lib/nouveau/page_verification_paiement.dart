// Vérification du paiement de la carte, T11, 26 nov. 2026.
// La demande créée côté serveur porte sa référence : le membre
// la communique à la structure, qui valide après contrôle de
// son compte. Un lien ou une capture seul ne marque jamais un
// paiement comme payé. Actualiser relit les paiements du membre
// et montre la confirmation quand la structure a validé.
import 'package:flutter/material.dart';

import '../api.dart';
import 'paiement_carte.dart';
import 'palette.dart';

class PageVerificationPaiement extends StatefulWidget {
  const PageVerificationPaiement({
    super.key,
    required this.reference,
    required this.montant,
    required this.moyen,
  });
  final String reference;
  final int montant;
  final String moyen;

  @override
  State<PageVerificationPaiement> createState() =>
      _PageVerificationPaiementState();
}

class _PageVerificationPaiementState extends State<PageVerificationPaiement> {
  var _confirme = false;
  var _actualisation = false;

  Future<void> _actualiser() async {
    if (_actualisation) return;
    setState(() => _actualisation = true);
    try {
      try {
        // T16 : vérifie chez le prestataire quand la demande
        // est en attente, avant de relire les paiements.
        await api.fetchEtatPaiement(widget.reference);
      } catch (_) {
        // La vérification attendra : la lecture ci-dessous
        // montre l'état actuel.
      }
      final paiements = await api.fetchMyPayments();
      final trouve = paiements.any((p) =>
          (p['reference'] ?? '').toString() == widget.reference &&
          (p['statut'] ?? '').toString() == 'confirme');
      if (mounted) setState(() => _confirme = trouve);
    } catch (_) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
              content: Text(
                  'Vérification impossible pour le moment. Réessaie plus tard.')),
        );
      }
    } finally {
      if (mounted) setState(() => _actualisation = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PaletteNouvelle.papier,
      appBar: AppBar(
        title: const Text('Vérifier mon paiement'),
        backgroundColor: Colors.white,
        foregroundColor: PaletteNouvelle.bleuNuit,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Création de carte de membre (paiement unique)',
                      style:
                          TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
                  const SizedBox(height: 8),
                  Text('Référence : ${widget.reference}',
                      style: const TextStyle(
                          fontSize: 17, fontWeight: FontWeight.w700)),
                  const SizedBox(height: 4),
                  Text('Montant : ${fcfa(widget.montant)}'),
                  const SizedBox(height: 4),
                  Text('Moyen : ${widget.moyen}'),
                  const SizedBox(height: 8),
                  Text(
                    _confirme
                        ? 'Paiement confirmé, ta carte arrive.'
                        : 'En attente de confirmation.',
                    style: TextStyle(
                        color: _confirme
                            ? Colors.green
                            : PaletteNouvelle.orFonce,
                        fontWeight: FontWeight.w700),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),
          if (!_confirme)
            const Card(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Text(
                    'Ce paiement n’est pas encore confirmé. Un lien ou une capture seul ne suffit jamais à le marquer comme payé. La structure le vérifie après contrôle de son compte, puis le valide. Communiquez-lui cette référence. Aucun reçu téléchargeable avant confirmation.'),
              ),
            ),
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            height: 52,
            child: FilledButton(
              style: FilledButton.styleFrom(
                  backgroundColor: PaletteNouvelle.bleuNuit),
              onPressed: _actualisation
                  ? null
                  : _confirme
                      ? () => Navigator.of(context).pop()
                      : _actualiser,
              child: Text(_actualisation
                  ? 'Vérification…'
                  : _confirme
                      ? 'Voir ma carte'
                      : 'Actualiser'),
            ),
          ),
        ],
      ),
    );
  }
}
