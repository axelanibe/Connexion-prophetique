import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter_pdfview/flutter_pdfview.dart';
import 'responsive.dart';

// Visualiseur PDF intégré, téléphone, carte 121, 10 nov. 2026 :
// le PDF s'affiche dans l'application, en largeur d'écran, avec
// défilement et zoom. Un indicateur de chargement couvre la vue
// native tant qu'elle n'a pas rendu la première page. Sur
// Windows, pas de visualiseur natif : la page appelante propose
// le téléchargement à la place, ce widget ne sert pas.
class PdfDocumentView extends StatefulWidget {
  const PdfDocumentView({
    super.key,
    required this.bytes,
    this.onRendered,
    this.onError,
  });

  final Uint8List bytes;

  // Appelée avec le nombre de pages quand la première page est
  // rendue. Jamais appelée sur Windows, sans visualiseur.
  final void Function(int pages)? onRendered;

  // Appelée avec le message d'erreur quand le PDF ne s'affiche
  // pas, pour que la page appelante propose le téléchargement.
  final void Function(String message)? onError;

  @override
  State<PdfDocumentView> createState() => _PdfDocumentViewState();
}

class _PdfDocumentViewState extends State<PdfDocumentView> {
  bool _rendu = false;

  @override
  Widget build(BuildContext context) {
    if (isWindowsDesktop) {
      return const Center(
        child: Padding(
          padding: EdgeInsets.all(24),
          child: Text(
            'Le visualiseur PDF n’est pas disponible sur cet appareil.',
            textAlign: TextAlign.center,
          ),
        ),
      );
    }
    return Stack(
      fit: StackFit.expand,
      children: [
        PDFView(
          pdfData: widget.bytes,
          fitPolicy: FitPolicy.WIDTH,
          enableSwipe: true,
          onRender: (pages) {
            if (!mounted) return;
            setState(() => _rendu = true);
            widget.onRendered?.call(pages ?? 1);
          },
          onError: (e) => widget.onError?.call('$e'),
          onPageError: (page, e) =>
              widget.onError?.call('Page ${page ?? 1} : $e'),
        ),
        if (!_rendu)
          const Center(child: CircularProgressIndicator()),
      ],
    );
  }
}
