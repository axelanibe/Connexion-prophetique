// Partage du verset en carte image, tranche T20.
// Comme l'ancienne version : la carte visuelle du verset
// est capturée en PNG et partagée, en plus du partage en
// texte. Le texte du verset vient de la Bible, jamais
// recopié en dur ; la version est Louis Segond 1910, comme
// la Bible de l'application.
import 'dart:typed_data';
import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:share_plus/share_plus.dart';

import 'page_accueil.dart' show VersetPriere;
import 'palette.dart';

/// Aperçu du verset en image, avec partage et téléchargement.
/// Le contexte doit rester celui de l'écran qui appelle, pour
/// que la feuille de partage et les messages s'affichent au
/// bon endroit.
Future<void> partagerVerset(
    BuildContext context, VersetPriere verset) {
  return showDialog<void>(
    context: context,
    builder: (context) => _DialoguePartageVerset(verset: verset),
  );
}

class _DialoguePartageVerset extends StatefulWidget {
  const _DialoguePartageVerset({required this.verset});
  final VersetPriere verset;

  @override
  State<_DialoguePartageVerset> createState() =>
      _DialoguePartageVersetState();
}

class _DialoguePartageVersetState
    extends State<_DialoguePartageVerset> {
  final _cleFrontiere = GlobalKey();
  var _occupe = false;

  void _dire(String texte) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(texte)),
    );
  }

  Future<Uint8List?> _capturer() async {
    final frontiere = _cleFrontiere.currentContext?.findRenderObject()
        as RenderRepaintBoundary?;
    if (frontiere == null) return null;
    final image = await frontiere.toImage(pixelRatio: 3);
    final octets = await image.toByteData(format: ui.ImageByteFormat.png);
    return octets?.buffer.asUint8List();
  }

  Future<void> _partagerImage() async {
    if (_occupe) return;
    setState(() => _occupe = true);
    try {
      final png = await _capturer();
      if (png == null || png.isEmpty) {
        if (mounted) _dire('Impossible de créer l’image du verset.');
        return;
      }
      await SharePlus.instance.share(
        ShareParams(
          files: [
            XFile.fromData(png, name: 'verset.png', mimeType: 'image/png'),
          ],
          text:
              '${widget.verset.reference} (LSG 1910) — CONNEXION PROPHETIQUE',
        ),
      );
    } catch (_) {
      if (mounted) _dire('Impossible de partager l’image du verset.');
    } finally {
      if (mounted) setState(() => _occupe = false);
    }
  }

  Future<void> _partagerTexte() async {
    await SharePlus.instance.share(
      ShareParams(
        text: '${widget.verset.texte}\n${widget.verset.reference}',
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final verset = widget.verset;
    return AlertDialog(
      backgroundColor: Colors.white,
      contentPadding: const EdgeInsets.all(16),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          RepaintBoundary(
            key: _cleFrontiere,
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: PaletteNouvelle.bleuNuit,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: PaletteNouvelle.or, width: 1.5),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'PRIÈRE DU JOUR',
                    style: TextStyle(
                      color: PaletteNouvelle.or,
                      fontSize: 12,
                      fontWeight: FontWeight.w800,
                      letterSpacing: 1.5,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    verset.texte,
                    style: const TextStyle(
                      fontFamily: 'Public Sans',
                      fontFamilyFallback: ['Georgia', 'serif'],
                      fontStyle: FontStyle.italic,
                      color: Colors.white,
                      fontSize: 17,
                      height: 1.4,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    verset.reference,
                    style: const TextStyle(
                      color: PaletteNouvelle.or,
                      fontSize: 13,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'CONNEXION PROPHÉTIQUE',
                    style: TextStyle(
                      fontFamily: 'Cinzel',
                      color: PaletteNouvelle.or,
                      fontSize: 11,
                      fontWeight: FontWeight.w700,
                      letterSpacing: 1,
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            child: FilledButton.icon(
              onPressed: _occupe ? null : _partagerImage,
              style: FilledButton.styleFrom(
                backgroundColor: PaletteNouvelle.bleuNuit,
              ),
              icon: const Icon(Icons.share_outlined, size: 18),
              label: const Text('Partager l’image'),
            ),
          ),
          const SizedBox(height: 8),
          SizedBox(
            width: double.infinity,
            child: OutlinedButton.icon(
              onPressed: _occupe ? null : _partagerTexte,
              icon: const Icon(Icons.text_fields_outlined, size: 18),
              label: const Text('Partager le texte'),
            ),
          ),
        ],
      ),
    );
  }
}
