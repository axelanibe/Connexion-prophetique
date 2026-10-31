import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'link_embed.dart';
import 'responsive.dart';
// Bleu nuit de la charte, sans import de main.dart pour eviter un cycle.

/// Lecture d'un lien dans l'application, sur telephone : la video
/// ou la page s'affiche ici, avec la fleche retour vers l'onglet.
/// Le lecteur audio de l'application continue pour les fichiers audio.
/// Sur Windows, pas de vue web interne : le lien d'origine s'ouvre
/// dans le navigateur externe, 30 oct. 2026.
class LinkViewPage extends StatefulWidget {
  const LinkViewPage({super.key, required this.title, required this.url});
  final String title;
  final String url;

  @override
  State<LinkViewPage> createState() => _LinkViewPageState();
}

class _LinkViewPageState extends State<LinkViewPage> {
  WebViewController? _controller;
  bool _openFailed = false;

  @override
  void initState() {
    super.initState();
    if (isWindowsDesktop) {
      WidgetsBinding.instance.addPostFrameCallback((_) => _openExternally());
      return;
    }
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0xFF0B1F3A))
      ..loadRequest(Uri.parse(embedUrl(widget.url)));
  }

  Future<void> _openExternally() async {
    final ok = await launchUrl(
      Uri.parse(widget.url),
      mode: LaunchMode.externalApplication,
    );
    if (!mounted) return;
    if (ok) {
      Navigator.of(context).maybePop();
    } else {
      setState(() => _openFailed = true);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0B1F3A),
        foregroundColor: Colors.white,
        title: Text(widget.title, maxLines: 1, overflow: TextOverflow.ellipsis),
      ),
      body: isWindowsDesktop
          ? Center(
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Text(
                      'Ce lien s’ouvre dans votre navigateur.',
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 16),
                    if (_openFailed) ...[
                      const Text(
                        'L’ouverture a échoué. Réessayez.',
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 16),
                    ],
                    FilledButton(
                      onPressed: _openExternally,
                      child: const Text('Ouvrir dans le navigateur'),
                    ),
                  ],
                ),
              ),
            )
          : WebViewWidget(controller: _controller!),
    );
  }
}
