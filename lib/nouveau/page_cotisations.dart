// Mes cotisations, tranche T14, 26 nov. 2026.
// Historique des paiements du membre depuis GET /moi/paiements,
// téléchargement de la facture par paiement confirmé avec
// downloadFacture, déjà dans lib/api.dart. Aucun ajout serveur.
import 'package:flutter/material.dart';

import '../print_doc.dart';
import 'modeles_t14.dart';
import 'paiement_carte.dart' show fcfa;
import 'palette.dart';
import 'service_t14.dart';

class PageCotisations extends StatefulWidget {
  const PageCotisations({super.key, required this.service});
  final ServiceT14 service;

  @override
  State<PageCotisations> createState() => _PageCotisationsState();
}

class _PageCotisationsState extends State<PageCotisations> {
  var _charge = false;
  String? _telechargementEnCours;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerPaiements();
    if (mounted) setState(() => _charge = true);
  }

  Future<void> _telecharger(PaiementMembre paiement) async {
    if (_telechargementEnCours != null) return;
    setState(() => _telechargementEnCours = paiement.reference);
    final octets =
        await widget.service.telechargerFacture(paiement.reference);
    if (!mounted) return;
    setState(() => _telechargementEnCours = null);
    if (octets == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
            content: Text('Facture indisponible pour le moment.')),
      );
      return;
    }
    await downloadBytesFile(
      'facture-${paiement.reference}.pdf',
      octets,
      'application/pdf',
    );
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Facture téléchargée.')),
    );
  }

  Color _couleurStatut(String statut) {
    switch (statut) {
      case 'confirme':
        return Colors.green.shade700;
      case 'refuse':
        return PaletteNouvelle.rougeBadge;
      default:
        return PaletteNouvelle.orFonce;
    }
  }

  @override
  Widget build(BuildContext context) {
    final paiements = widget.service.paiements;
    if (!_charge) {
      return const Center(child: CircularProgressIndicator());
    }
    return ListView(
      padding: EdgeInsets.fromLTRB(16, 12, 16, 24 + MediaQuery.paddingOf(context).bottom),
      children: [
        const Padding(
          padding: EdgeInsets.only(bottom: 8),
          child: Text(
            'Mes paiements',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w800,
              color: PaletteNouvelle.bleuNuit,
            ),
          ),
        ),
        if (paiements.isEmpty)
          const Card(
            color: Colors.white,
            margin: EdgeInsets.zero,
            child: ListTile(
              title: Text('Aucun paiement pour le moment.'),
            ),
          )
        else
          for (final p in paiements)
            Card(
              color: Colors.white,
              margin: const EdgeInsets.only(bottom: 8),
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                p.libelle,
                                style: const TextStyle(
                                  fontWeight: FontWeight.w700,
                                  color: PaletteNouvelle.bleuNuit,
                                ),
                              ),
                              if (p.detail.isNotEmpty)
                                Text(
                                  p.detail,
                                  style: const TextStyle(
                                      color: Colors.grey, fontSize: 13),
                                ),
                              if (p.dateTexte.isNotEmpty)
                                Text(
                                  p.dateTexte,
                                  style: const TextStyle(
                                      color: Colors.grey, fontSize: 13),
                                ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 8),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Text(
                              fcfa(p.montantFcfa),
                              style: const TextStyle(
                                fontWeight: FontWeight.w800,
                                color: PaletteNouvelle.bleuNuit,
                              ),
                            ),
                            Text(
                              p.libelleStatut,
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.w700,
                                color: _couleurStatut(p.statut),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                    if (p.peutTelechargerFacture) ...[
                      const SizedBox(height: 4),
                      Align(
                        alignment: Alignment.centerRight,
                        child: _telechargementEnCours == p.reference
                            ? const SizedBox(
                                width: 20,
                                height: 20,
                                child: CircularProgressIndicator(
                                    strokeWidth: 2),
                              )
                            : TextButton.icon(
                                onPressed: () => _telecharger(p),
                                icon: const Icon(Icons.receipt_outlined),
                                label: const Text('Facture'),
                              ),
                      ),
                    ],
                  ],
                ),
              ),
            ),
      ],
    );
  }
}
