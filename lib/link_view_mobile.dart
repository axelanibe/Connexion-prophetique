import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'link_embed.dart';
// Bleu nuit de la charte, sans import de main.dart pour eviter un cycle.

/// Lecture d'un lien dans l'application, sur telephone : la video
/// ou la page s'affiche ici, avec la fleche retour vers l'onglet.
/// Le lecteur audio de l'application continue pour les fichiers audio.
class LinkViewPage extends StatefulWidget {
  const LinkViewPage({super.key, required this.title, required this.url});
  final String title;
  final String url;

  @override
  State<LinkViewPage> createState() => _LinkViewPageState();
}

class _LinkViewPageState extends State<LinkViewPage> {
  late final WebViewController _controller;

  @override
  void initState() {
    super.initState();
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0xFF0B1F3A))
      ..loadRequest(Uri.parse(embedUrl(widget.url)));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0B1F3A),
        foregroundColor: Colors.white,
        title: Text(widget.title, maxLines: 1, overflow: TextOverflow.ellipsis),
      ),
      body: WebViewWidget(controller: _controller),
    );
  }
}
