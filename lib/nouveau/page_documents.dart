// Mes documents, tranche T9, 26 nov. 2026.
// Carte de membre, certificats et attestations du membre,
// documents de la structure. Les attestations se téléchargent
// en vrai PDF du serveur, jamais une page HTML. Les documents
// de la structure s'ouvrent par leur lien, ou se téléchargent
// quand ils ont un fichier.
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../api.dart';
import '../print_doc.dart';
import 'modeles_t9.dart';
import 'palette.dart';
import 'service_t9.dart';

class PageDocuments extends StatefulWidget {
  const PageDocuments({
    super.key,
    required this.service,
    this.onVoirCarte,
  });
  final ServiceT9 service;
  final VoidCallback? onVoirCarte;

  @override
  State<PageDocuments> createState() => _PageDocumentsState();
}

class _PageDocumentsState extends State<PageDocuments> {
  var _charge = false;
  var _enCours = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerDocuments();
    if (mounted) setState(() => _charge = true);
  }

  Future<void> _telechargerAttestation(AttestationMembre a) async {
    if (_enCours) return;
    setState(() => _enCours = true);
    final octets = await widget.service.telechargerAttestation(a.id);
    if (!mounted) return;
    setState(() => _enCours = false);
    if (octets == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Impossible pour le moment.')),
      );
      return;
    }
    await downloadBytesFile(
      'attestation-${a.reference.isEmpty ? a.id : a.reference}.pdf',
      octets,
      'application/pdf',
    );
  }

  Future<void> _ouvrirDocument(DocumentStructure d) async {
    if (d.lien.isNotEmpty) {
      final uri = Uri.tryParse(d.lien);
      if (uri != null) await launchUrl(uri);
      return;
    }
    try {
      final octets = await api.fetchDocumentFile(d.id);
      await downloadBytesFile(
        'document-${d.id}.pdf',
        octets,
        'application/pdf',
      );
    } catch (_) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Impossible pour le moment.')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.service;
    if (!_charge) {
      return const Center(child: CircularProgressIndicator());
    }
    return ListView(
      padding: EdgeInsets.fromLTRB(16, 12, 16, 24 + MediaQuery.paddingOf(context).bottom),
      children: [
        const _TitreSection('Ma carte de membre'),
        Card(
          color: Colors.white,
          margin: EdgeInsets.zero,
          child: ListTile(
            leading: const Icon(Icons.badge_outlined,
                color: PaletteNouvelle.bleuNuit),
            title: const Text('Carte de membre'),
            trailing: const Icon(Icons.chevron_right, color: Colors.grey),
            onTap: widget.onVoirCarte,
          ),
        ),
        const SizedBox(height: 16),
        const _TitreSection('Mes certificats et attestations'),
        if (s.attestations.isEmpty)
          const _Vide('Aucun certificat pour le moment.')
        else
          for (final a in s.attestations)
            Card(
              color: Colors.white,
              margin: const EdgeInsets.only(bottom: 8),
              child: ListTile(
                leading: const Icon(Icons.description_outlined,
                    color: PaletteNouvelle.bleuNuit),
                title: Text(a.type.isEmpty ? 'Attestation' : a.type),
                subtitle: Text(
                  [if (a.reference.isNotEmpty) a.reference,
                   if (a.activite.isNotEmpty) a.activite,
                   if (a.annulee) 'Annulée']
                      .join(' · '),
                ),
                trailing: a.annulee
                    ? null
                    : IconButton(
                        icon: const Icon(Icons.download_outlined),
                        color: PaletteNouvelle.bleuNuit,
                        onPressed:
                            _enCours ? null : () => _telechargerAttestation(a),
                      ),
              ),
            ),
        const SizedBox(height: 16),
        const _TitreSection('Documents de la structure'),
        if (s.documents.isEmpty)
          const _Vide('Aucun document pour le moment.')
        else
          for (final d in s.documents)
            Card(
              color: Colors.white,
              margin: const EdgeInsets.only(bottom: 8),
              child: ListTile(
                leading: const Icon(Icons.folder_outlined,
                    color: PaletteNouvelle.bleuNuit),
                title: Text(d.titre),
                subtitle: d.etablissement.isEmpty
                    ? null
                    : Text(d.etablissement),
                trailing: const Icon(Icons.open_in_new_outlined,
                    color: PaletteNouvelle.bleuNuit),
                onTap: () => _ouvrirDocument(d),
              ),
            ),
      ],
    );
  }
}

class _TitreSection extends StatelessWidget {
  const _TitreSection(this.texte);
  final String texte;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text(
        texte,
        style: const TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w800,
          color: PaletteNouvelle.bleuNuit,
        ),
      ),
    );
  }
}

class _Vide extends StatelessWidget {
  const _Vide(this.texte);
  final String texte;

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.white,
      margin: EdgeInsets.zero,
      child: ListTile(title: Text(texte)),
    );
  }
}
