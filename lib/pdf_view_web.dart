import 'dart:html' as html;
import 'dart:typed_data';
import 'dart:ui_web' as ui_web;

import 'package:flutter/material.dart';

// Visualiseur PDF intégré, web, carte 121, 10 nov. 2026 : le
// navigateur affiche le PDF dans un cadre intégré, avec ses
// propres contrôles, zoom et téléchargement. Le PDF ne quitte
// jamais l'appareil : il est servi par une adresse locale
// temporaire, libérée quand la page se ferme.
class PdfDocumentView extends StatefulWidget {
  const PdfDocumentView({
    super.key,
    required this.bytes,
    this.onRendered,
    this.onError,
  });

  final Uint8List bytes;

  // Appelée quand le cadre a chargé le document. Le nombre de
  // pages n'est pas connu du navigateur, 1 est rapporté.
  final void Function(int pages)? onRendered;

  // Sans objet sur le web, le navigateur affiche sa propre
  // erreur quand le document ne se charge pas.
  final void Function(String message)? onError;

  @override
  State<PdfDocumentView> createState() => _PdfDocumentViewState();
}

class _PdfDocumentViewState extends State<PdfDocumentView> {
  late final String _viewType;
  late final String _url;
  bool _charge = false;

  @override
  void initState() {
    super.initState();
    _viewType = 'cp-pdf-${DateTime.now().microsecondsSinceEpoch}';
    _url = html.Url.createObjectUrlFromBlob(
      html.Blob([widget.bytes], 'application/pdf'),
    );
    final frame = html.IFrameElement()
      ..src = _url
      ..style.border = 'none'
      ..style.width = '100%'
      ..style.height = '100%';
    frame.onLoad.listen((_) {
      if (!mounted) return;
      setState(() => _charge = true);
      widget.onRendered?.call(1);
    });
    ui_web.platformViewRegistry.registerViewFactory(
      _viewType,
      (int viewId) => frame,
    );
  }

  @override
  void dispose() {
    html.Url.revokeObjectUrl(_url);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      fit: StackFit.expand,
      children: [
        HtmlElementView(viewType: _viewType),
        if (!_charge) const Center(child: CircularProgressIndicator()),
      ],
    );
  }
}
