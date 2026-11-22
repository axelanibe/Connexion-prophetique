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
  bool _horsListe = false;

  @override
  void initState() {
    super.initState();
    _viewType = 'cp-link-${DateTime.now().microsecondsSinceEpoch}';
    final cible = embedUrl(widget.url);
    // MO-7, 22 nov. 2026 : liste blanche d'hôtes. Un lien hors
    // liste ne s'affiche jamais dans le cadre intégré, il s'ouvre
    // dans un nouvel onglet du navigateur.
    if (!hoteWebViewAutorise(cible)) {
      _horsListe = true;
      return;
    }
    final frame = html.IFrameElement()
      ..src = cible
      ..allowFullscreen = true
      ..allow = 'autoplay; fullscreen'
      // Bac à sable, MO-7 : la page intégrée ne peut ni sortir
      // du cadre, ni naviguer la page parente, ni ouvrir de
      // fenêtre sauf par ses propres liens.
      ..setAttribute(
        'sandbox',
        'allow-scripts allow-same-origin allow-forms allow-popups allow-presentation allow-fullscreen',
      )
      ..style.border = 'none'
      ..style.width = '100%'
      ..style.height = '100%';
    ui_web.platformViewRegistry.registerViewFactory(_viewType, (int viewId) => frame);
  }

  void _ouvrirExterne() {
    html.window.open(embedUrl(widget.url), '_blank');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F1C2E),
        foregroundColor: Colors.white,
        title: Text(widget.title, maxLines: 1, overflow: TextOverflow.ellipsis),
      ),
      body: _horsListe
          ? Center(
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Text(
                      'Ce lien s’ouvre dans un nouvel onglet de votre navigateur.',
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 16),
                    FilledButton(
                      onPressed: _ouvrirExterne,
                      child: const Text('Ouvrir dans le navigateur'),
                    ),
                  ],
                ),
              ),
            )
          : HtmlElementView(viewType: _viewType),
    );
  }
}
