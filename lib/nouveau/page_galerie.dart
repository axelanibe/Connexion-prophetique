// Galerie, tranche T9, 26 nov. 2026.
// La carte de membre et les badges de camp du membre, comme
// l'ancienne galerie. Le badge vit ici : toucher un badge
// ouvre sa page dédiée, avec téléchargement. La page du camp,
// elle, ne montre plus ni badge ni bouton de téléchargement,
// seulement « S'inscrire ».
import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:qr_flutter/qr_flutter.dart';

import '../app_models.dart' show Member;
import '../gallery_save.dart';
import '../telechargement_image.dart';
import 'modeles_t9.dart';
import 'palette.dart';
import 'service_t9.dart';

class PageGalerie extends StatefulWidget {
  const PageGalerie({super.key, required this.service});
  final ServiceT9 service;

  @override
  State<PageGalerie> createState() => _PageGalerieState();
}

class _PageGalerieState extends State<PageGalerie> {
  var _charge = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerMembre();
    await widget.service.chargerGalerie();
    if (mounted) setState(() => _charge = true);
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.service;
    if (!_charge) {
      return const Center(child: CircularProgressIndicator());
    }
    final badges = s.inscriptions.where((i) => i.passVisible).toList();
    final enAttente = s.inscriptions.where((i) => !i.passVisible).toList();
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      children: [
        const _TitreSection('Badges de camp'),
        if (badges.isEmpty && enAttente.isEmpty)
          const _Vide('Aucune inscription à un camp pour le moment.')
        else ...[
          for (final i in badges)
            _TuileBadge(
              inscription: i,
              membre: s.membre,
              onTap: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (_) => PageBadgeCamp(
                      inscription: i,
                      membre: s.membre,
                    ),
                  ),
                );
              },
            ),
          for (final i in enAttente)
            Card(
              color: Colors.white,
              margin: const EdgeInsets.only(bottom: 8),
              child: ListTile(
                leading: const Icon(Icons.badge_outlined,
                    color: PaletteNouvelle.bleuNuit),
                title: Text(i.nom),
                subtitle: const Text('Badge disponible après le paiement complet.'),
              ),
            ),
        ],
      ],
    );
  }
}

/// Visuel du badge de camp, réutilisé par la galerie et sa page
/// dédiée : nom, matricule, camp, QR du pass.
class BadgeCampVisuel extends StatelessWidget {
  const BadgeCampVisuel({
    super.key,
    required this.inscription,
    required this.membre,
  });
  final InscriptionBadge inscription;
  final Member? membre;

  @override
  Widget build(BuildContext context) {
    final m = membre;
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: PaletteNouvelle.bleuNuit,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: PaletteNouvelle.or, width: 1.5),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            inscription.estKairos ? 'Camp National Kairos' : inscription.nom,
            style: const TextStyle(
              color: PaletteNouvelle.or,
              fontSize: 15,
              fontWeight: FontWeight.w800,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            m?.name ?? '',
            style: const TextStyle(
              color: Colors.white,
              fontSize: 20,
              fontWeight: FontWeight.w800,
            ),
          ),
          Text(
            m?.matricule ?? '',
            style: const TextStyle(color: Colors.white70, fontSize: 14),
          ),
          const SizedBox(height: 12),
          Center(
            child: Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
              ),
              child: QrImageView(
                data: inscription.qrData(m?.matricule ?? ''),
                version: QrVersions.auto,
                size: 140,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// Page dédiée d'un badge, avec téléchargement. Le badge ne
/// vit que dans la Galerie, jamais sur la page du camp.
class PageBadgeCamp extends StatefulWidget {
  const PageBadgeCamp({super.key, required this.inscription, this.membre});
  final InscriptionBadge inscription;
  final Member? membre;

  @override
  State<PageBadgeCamp> createState() => _PageBadgeCampState();
}

class _PageBadgeCampState extends State<PageBadgeCamp> {
  final _cle = GlobalKey();
  var _enCours = false;

  Future<void> _telecharger() async {
    if (_enCours) return;
    setState(() => _enCours = true);
    try {
      final boundary =
          _cle.currentContext?.findRenderObject() as RenderRepaintBoundary?;
      final image = await boundary?.toImage(pixelRatio: 3);
      final octets =
          await image?.toByteData(format: ui.ImageByteFormat.png);
      final png = octets?.buffer.asUint8List();
      if (png == null || png.isEmpty) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Impossible de créer l’image du badge.')),
          );
        }
        return;
      }
      final base = 'badge-${widget.inscription.evenementId}';
      if (await saveToGallery(png, base)) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Badge enregistré dans la galerie.')),
          );
        }
      } else {
        await telechargerImage(png, '$base.png', 'image/png');
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Badge téléchargé.')),
          );
        }
      }
    } catch (_) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Impossible de télécharger le badge.')),
        );
      }
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PaletteNouvelle.papier,
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: Text(
          widget.inscription.nom,
          style: const TextStyle(color: PaletteNouvelle.bleuNuit),
        ),
        iconTheme: const IconThemeData(color: PaletteNouvelle.bleuNuit),
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 16, 16, 24),
        children: [
          RepaintBoundary(
            key: _cle,
            child: BadgeCampVisuel(
              inscription: widget.inscription,
              membre: widget.membre,
            ),
          ),
          const SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            child: FilledButton.icon(
              style: FilledButton.styleFrom(
                backgroundColor: PaletteNouvelle.bleuNuit,
              ),
              onPressed: _enCours ? null : _telecharger,
              icon: const Icon(Icons.download_outlined),
              label: const Text('Télécharger'),
            ),
          ),
        ],
      ),
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

class _TuileBadge extends StatelessWidget {
  const _TuileBadge({
    required this.inscription,
    required this.membre,
    required this.onTap,
  });
  final InscriptionBadge inscription;
  final Member? membre;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(20),
      child: BadgeCampVisuel(inscription: inscription, membre: membre),
    );
  }
}
