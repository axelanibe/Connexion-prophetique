import 'dart:html' as html;
import 'dart:ui_web' as ui_web;
import 'package:flutter/material.dart';
import 'link_embed.dart';
// Bleu nuit de la charte, sans import de main.dart pour eviter un cycle.

/// Lecture d'un lien dans l'application, sur le web : la video ou
/// la page s'affiche dans un cadre integre, avec la fleche retour
/// vers l'onglet. Le lien ne sort jamais de l'application tout seul.
class LinkViewPage extends StatefulWidget {
  const LinkViewPage({super.key, required this.title, required this.url});
  final String title;
  final String url;

  @override
  State<LinkViewPage> createState() => _LinkViewPageState();
}

class _LinkViewPageState extends State<LinkViewPage> {
  late final String _viewType;

  @override
  void initState() {
    super.initState();
    _viewType = 'cp-link-${DateTime.now().microsecondsSinceEpoch}';
    final frame = html.IFrameElement()
      ..src = embedUrl(widget.url)
      ..allowFullscreen = true
      ..allow = 'autoplay; fullscreen'
      ..style.border = 'none'
      ..style.width = '100%'
      ..style.height = '100%';
    ui_web.platformViewRegistry.registerViewFactory(_viewType, (int viewId) => frame);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0B1F3A),
        foregroundColor: Colors.white,
        title: Text(widget.title, maxLines: 1, overflow: TextOverflow.ellipsis),
      ),
      body: HtmlElementView(viewType: _viewType),
    );
  }
}
