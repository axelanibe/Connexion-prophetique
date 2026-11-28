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

import '../app_models.dart' show Member, memberPhotoWidget;
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
      padding: EdgeInsets.fromLTRB(16, 12, 16, 24 + MediaQuery.paddingOf(context).bottom),
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
/// dédiée : modèle officiel KAIROS 2027, correction de suivi
/// 27 nov. 2026. Fond blanc et bleu, KAIROS 2027, photo, nom,
/// ID KP2027, QR, bande CAMPEUR, devise. Données réelles du
/// membre seulement, une ligne absente quand la donnée manque.
/// Hors Kairos, le nom du camp remplace KAIROS 2027.
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
    final kairos = inscription.estKairos;
    final id = inscription.badgeId.isNotEmpty
        ? inscription.badgeId
        : (m?.matricule ?? '');
    final photo = m == null ? null : memberPhotoWidget(m);
    final etiquette = kairos ? 'KAIROS 2027' : inscription.nom;
    return Container(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: PaletteNouvelle.bleuNuit, width: 2),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 34,
                height: 34,
                decoration: const BoxDecoration(
                  color: PaletteNouvelle.bleuNuit,
                  shape: BoxShape.circle,
                ),
                alignment: Alignment.center,
                child: const Text(
                  'CP',
                  style: TextStyle(
                    color: PaletteNouvelle.or,
                    fontWeight: FontWeight.w800,
                    fontSize: 13,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              const Text(
                'Connexion Prophétique',
                style: TextStyle(
                  color: PaletteNouvelle.bleuNuit,
                  fontSize: 18,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          if (kairos)
            const Text.rich(
              TextSpan(
                style: TextStyle(fontSize: 30, fontWeight: FontWeight.w900),
                children: [
                  TextSpan(
                    text: 'KAIROS ',
                    style: TextStyle(color: PaletteNouvelle.bleuNuit),
                  ),
                  TextSpan(
                    text: '2027',
                    style: TextStyle(color: Color(0xFFD92B2B)),
                  ),
                ],
              ),
            )
          else
            Text(
              inscription.nom,
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: PaletteNouvelle.bleuNuit,
                fontSize: 22,
                fontWeight: FontWeight.w900,
              ),
            ),
          if (kairos) ...[
            const SizedBox(height: 2),
            const Row(
              children: [
                Expanded(
                  child: Divider(color: PaletteNouvelle.bleuNuit),
                ),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 8),
                  child: Text(
                    'Se disposer • S’aligner • Rayonner',
                    style: TextStyle(
                      color: PaletteNouvelle.bleuNuit,
                      fontSize: 12,
                      fontStyle: FontStyle.italic,
                    ),
                  ),
                ),
                Expanded(
                  child: Divider(color: PaletteNouvelle.bleuNuit),
                ),
              ],
            ),
          ],
          const SizedBox(height: 12),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 84,
                height: 104,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: PaletteNouvelle.bleuNuit,
                    width: 1.5,
                  ),
                  color: const Color(0xFFF4F6F9),
                ),
                clipBehavior: Clip.antiAlias,
                child: photo == null
                    ? const Icon(
                        Icons.person_outlined,
                        color: PaletteNouvelle.bleuNuit,
                        size: 40,
                      )
                    : SizedBox.expand(child: photo),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      m?.name ?? '',
                      style: const TextStyle(
                        color: PaletteNouvelle.bleuNuit,
                        fontSize: 17,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    if (kairos) ...[
                      const SizedBox(height: 4),
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 10,
                          vertical: 4,
                        ),
                        decoration: BoxDecoration(
                          color: PaletteNouvelle.bleuNuit,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(
                              Icons.person_outlined,
                              color: Colors.white,
                              size: 14,
                            ),
                            SizedBox(width: 4),
                            Text(
                              'Campeur',
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.w700,
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                    const SizedBox(height: 8),
                    if (id.isNotEmpty)
                      _LigneBadge(
                        icone: Icons.badge_outlined,
                        texte: 'ID : $id',
                      ),
                    if (inscription.age != null)
                      _LigneBadge(
                        icone: Icons.cake_outlined,
                        texte: 'Âge : ${inscription.age} ans',
                      ),
                    if (inscription.niveauEtude.isNotEmpty)
                      _LigneBadge(
                        icone: Icons.school_outlined,
                        texte: 'Niveau : ${inscription.niveauEtude}',
                      ),
                    if (inscription.structureAppartenance.isNotEmpty)
                      _LigneBadge(
                        icone: Icons.church_outlined,
                        texte:
                            'Structure : ${inscription.structureAppartenance}',
                      ),
                  ],
                ),
              ),
              const SizedBox(width: 10),
              Container(
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(
                    color: PaletteNouvelle.bleuNuit,
                    width: 1.5,
                  ),
                ),
                child: Column(
                  children: [
                    QrImageView(
                      data: inscription.qrData(m?.matricule ?? ''),
                      version: QrVersions.auto,
                      size: 76,
                    ),
                    const SizedBox(height: 4),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 6,
                        vertical: 2,
                      ),
                      decoration: BoxDecoration(
                        color: PaletteNouvelle.bleuNuit,
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: Text(
                        etiquette,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 9,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(vertical: 8),
            decoration: BoxDecoration(
              color: PaletteNouvelle.bleuNuit,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Row(
              children: [
                const SizedBox(width: 16),
                const Expanded(child: Divider(color: Colors.white)),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 12),
                  child: Text(
                    kairos ? 'CAMPEUR' : inscription.nom.toUpperCase(),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 2,
                    ),
                  ),
                ),
                const Expanded(child: Divider(color: Colors.white)),
                const SizedBox(width: 16),
              ],
            ),
          ),
          const SizedBox(height: 10),
          if (kairos)
            const Text(
              'Ensemble pour une génération transformée par Dieu',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: PaletteNouvelle.bleuNuit,
                fontStyle: FontStyle.italic,
                fontSize: 13,
              ),
            ),
          const SizedBox(height: 4),
          Text(
            kairos
                ? 'KAIROS 2027 — Connexion Prophétique'
                : 'Connexion Prophétique',
            style: const TextStyle(
              color: PaletteNouvelle.bleuNuit,
              fontSize: 11,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }
}

/// Ligne d'information du badge, icône et texte bleu nuit.
class _LigneBadge extends StatelessWidget {
  const _LigneBadge({required this.icone, required this.texte});
  final IconData icone;
  final String texte;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 2),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icone, size: 14, color: PaletteNouvelle.bleuNuit),
          const SizedBox(width: 4),
          Expanded(
            child: Text(
              texte,
              style: const TextStyle(
                color: PaletteNouvelle.bleuNuit,
                fontSize: 12,
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
        padding: EdgeInsets.fromLTRB(16, 16, 16, 24 + MediaQuery.paddingOf(context).bottom),
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
