// Verset du jour partageable en image, lot 1, 31 oct. 2026.
// Carte 81, 7 nov. 2026 : le dialogue propose WhatsApp en premier,
// avec l'image du verset, comme sur l'ancienne version. WhatsApp
// ne recoit pas une image par un lien : sur telephone, l'image
// part en fichier par la feuille du systeme, le membre choisit
// WhatsApp dans la liste ; sur le web, l'image est telechargee
// puis WhatsApp s'ouvre avec le texte du verset, le membre joint
// l'image telechargee. Les autres partages sont gardes.
// Le bouton Partager de la carte du verset de l'accueil n'envoyait
// que du texte. Il ouvre désormais un aperçu de l'image du verset,
// avec les mêmes texte et référence que la carte, puis propose le
// partage ou le téléchargement. Aucune donnée nouvelle : le widget
// reprend exactement le verset affiché, jamais un texte inventé.
// Sur téléphone, le partage passe par la feuille du système. Sur le
// web et sur Windows, le téléchargement est le parcours prévu, la
// feuille de partage n'y étant pas fiable.
// Cartes de verset, 18 nov. 2026 : la carte devient carrée, pour
// n'importe quel verset, méditation du jour et lecteur Bible, et le
// téléchargement va dans la galerie, album CONNEXION PROPHETIQUE,
// comme la carte et le badge de camp, avec repli Téléchargements.
import 'dart:ui' as ui;

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:share_plus/share_plus.dart';
import 'package:url_launcher/url_launcher.dart';

import 'api.dart';
import 'gallery_save.dart';
import 'home_web.dart';
import 'i18n.dart';
import 'responsive.dart';
import 'verse_share_download.dart';

const _verseShareFilename = 'verset.png';

// Taille du verset sur la carte carrée, cartes de verset,
// 18 nov. 2026 : plus le verset est long, plus la police
// descend, pour tenir dans le carré sans rien couper ; le
// FittedBox en scaleDown prend le relais pour les très longs
// versets, jamais de débordement.
double verseCardFontSize(String text) {
  final n = text.length;
  if (n <= 120) return 26;
  if (n <= 220) return 22;
  if (n <= 350) return 19;
  return 16;
}

// Image du verset, telle qu'elle est partagée : carte carrée,
// fond bleu nuit dégradé comme la carte, monogramme et nom de
// l'application en haut, texte du verset en blanc au centre,
// référence en or. Le texte est repris exactement, jamais réécrit.
class VerseShareImage extends StatelessWidget {
  const VerseShareImage({super.key, required this.verse});
  final HomeVerse verse;

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 1,
      child: Container(
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFF0F1C2E), Color(0xFF0F1C2E)],
          ),
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: const Color(0x59E5C158)),
        ),
        // Le LayoutBuilder donne au contenu la largeur exacte du
        // carré : la rangée du monogramme, avec son Flexible, a
        // besoin d'une largeur finie, que le FittedBox seul ne
        // fournit pas. Le FittedBox en scaleDown réduit ensuite
        // le tout si le verset est trop long pour le carré.
        child: LayoutBuilder(
          builder: (context, constraints) => FittedBox(
            fit: BoxFit.scaleDown,
            alignment: Alignment.center,
            child: SizedBox(
              width: constraints.maxWidth,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 32),
                child: Column(mainAxisSize: MainAxisSize.min, children: [
                  Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(10),
                      child: Image.asset(
                        'assets/cp_monogram.png',
                        width: 44,
                        height: 44,
                        fit: BoxFit.cover,
                        // Carte 79, 7 nov. 2026 : haute resolution.
                        filterQuality: FilterQuality.high,
                        errorBuilder: (_, __, ___) => const Icon(Icons.local_fire_department_outlined, color: W.gold, size: 32),
                      ),
                    ),
                    const SizedBox(width: 12),
                    const Flexible(
                      child: Text(
                        'CONNEXION PROPHETIQUE',
                        style: TextStyle(color: W.gold, fontSize: 13, fontWeight: FontWeight.w800, letterSpacing: 2.2),
                      ),
                    ),
                  ]),
                  const SizedBox(height: 32),
                  Text(
                    '« ${verse.text} »',
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.white, fontSize: verseCardFontSize(verse.text), fontWeight: FontWeight.w600, height: 1.45),
                  ),
                  const SizedBox(height: 22),
                  Text(
                    verse.ref,
                    textAlign: TextAlign.center,
                    style: const TextStyle(color: W.gold, fontSize: 19, fontWeight: FontWeight.w800),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    '(${verse.version})',
                    textAlign: TextAlign.center,
                    style: const TextStyle(color: Colors.white70, fontSize: 15),
                  ),
                  const SizedBox(height: 30),
                  Container(width: 64, height: 3, decoration: BoxDecoration(color: W.gold, borderRadius: BorderRadius.circular(2))),
                  const SizedBox(height: 18),
                  Text(
                    tr('Verset du jour'),
                    style: const TextStyle(color: W.gold, fontSize: 14, fontWeight: FontWeight.w700, letterSpacing: 1.4),
                  ),
                ]),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

// Aperçu du verset en image, avec partage et téléchargement.
// Le contexte doit rester celui de l'écran qui appelle, pour que
// la feuille de partage et les messages s'affichent au bon endroit.
// Verset en storie, 21 nov. 2026, tranche 5 : avec un client, le
// dialogue propose aussi de publier la carte du verset comme une
// storie, par POST /stories, même image que le partage, jamais un
// texte réécrit.
Future<void> showVerseShareDialog(BuildContext context, HomeVerse verse, {String filename = _verseShareFilename, ApiClient? client}) {
  return showDialog<void>(
    context: context,
    builder: (context) => _VerseShareDialog(verse: verse, filename: filename, client: client),
  );
}

class _VerseShareDialog extends StatefulWidget {
  const _VerseShareDialog({required this.verse, required this.filename, this.client});
  final HomeVerse verse;
  final String filename;

  /// Client pour la publication en storie, sans lui le bouton
  /// n'apparaît pas.
  final ApiClient? client;

  @override
  State<_VerseShareDialog> createState() => _VerseShareDialogState();
}

class _VerseShareDialogState extends State<_VerseShareDialog> {
  final _boundaryKey = GlobalKey();
  bool _busy = false;

  void _message(String text) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(text)));
  }

  Future<Uint8List?> _capture() async {
    final boundary = _boundaryKey.currentContext?.findRenderObject() as RenderRepaintBoundary?;
    if (boundary == null) return null;
    final image = await boundary.toImage(pixelRatio: 3);
    final bytes = await image.toByteData(format: ui.ImageByteFormat.png);
    return bytes?.buffer.asUint8List();
  }

  Future<void> _share() async {
    if (_busy) return;
    setState(() => _busy = true);
    try {
      final png = await _capture();
      if (png == null || png.isEmpty) {
        if (mounted) _message(tr('Impossible de créer l’image du verset.'));
        return;
      }
      await Share.shareXFiles(
        [XFile.fromData(png, name: widget.filename, mimeType: 'image/png')],
        text: '${widget.verse.ref} (${widget.verse.version}) — CONNEXION PROPHETIQUE',
      );
    } catch (_) {
      if (mounted) _message(tr('Impossible de partager l’image du verset.'));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  String get _whatsAppText =>
      '« ${widget.verse.text} »\n— ${widget.verse.ref} (${widget.verse.version})\n\nCONNEXION PROPHETIQUE';

  // Carte 81, 7 nov. 2026 : WhatsApp avec l'image, comme sur
  // l'ancienne version. Sur telephone, le fichier PNG part par la
  // feuille du systeme, le membre choisit WhatsApp dans la liste,
  // share_plus ne peut pas cibler une application precise. Sur le
  // web, la feuille de partage n'est pas fiable : l'image est
  // telechargee, puis WhatsApp s'ouvre avec le texte du verset,
  // le membre joint l'image telechargee dans la conversation.
  Future<void> _shareWhatsApp() async {
    if (_busy) return;
    setState(() => _busy = true);
    try {
      final png = await _capture();
      if (png == null || png.isEmpty) {
        if (mounted) _message(tr('Impossible de créer l’image du verset.'));
        return;
      }
      if (kIsWeb) {
        await saveVerseShareImage(png, widget.filename);
        final ok = await launchUrl(
          Uri.parse('https://wa.me/?text=${Uri.encodeComponent(_whatsAppText)}'),
          mode: LaunchMode.externalApplication,
        );
        if (mounted) {
          _message(ok
              ? tr('Image téléchargée, joignez-la dans WhatsApp.')
              : tr('Impossible d’ouvrir WhatsApp.'));
        }
        return;
      }
      await Share.shareXFiles(
        [XFile.fromData(png, name: widget.filename, mimeType: 'image/png')],
        text: _whatsAppText,
      );
    } catch (_) {
      if (mounted) _message(tr('Impossible de partager l’image du verset.'));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  Future<void> _download() async {
    if (_busy) return;
    setState(() => _busy = true);
    try {
      final png = await _capture();
      if (png == null || png.isEmpty) {
        if (mounted) _message(tr('Impossible de créer l’image du verset.'));
        return;
      }
      // Cartes de verset, 18 nov. 2026 : la galerie d'abord,
      // album CONNEXION PROPHETIQUE, comme la carte et le badge
      // de camp ; repli Téléchargements si la galerie refuse,
      // et sur le web et Windows, Téléchargements directement.
      if (await saveToGallery(png, widget.filename)) {
        if (mounted) _message(tr('Image enregistrée dans la galerie.'));
        return;
      }
      final savedName = await saveVerseShareImage(png, widget.filename);
      if (mounted) {
        _message(savedName == null ? tr('Image téléchargée.') : tr('Image enregistrée dans Téléchargements.'));
      }
    } catch (_) {
      if (mounted) _message(tr('Impossible de télécharger l’image du verset.'));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  // Verset en storie, 21 nov. 2026, tranche 5 : la même carte
  // du verset, capturée ici, part comme une story photo, par
  // POST /stories. Le dialogue se ferme sur le succès, le
  // message du serveur s'affiche en cas d'échec, par exemple
  // quand les stories sont désactivées.
  Future<void> _publierEnStorie() async {
    final client = widget.client;
    if (_busy || client == null) return;
    setState(() => _busy = true);
    try {
      final png = await _capture();
      if (png == null || png.isEmpty) {
        if (mounted) _message(tr('Impossible de créer l’image du verset.'));
        return;
      }
      await client.publierStory(bytes: png, filename: 'verset-story.png', type: 'photo');
      if (!mounted) return;
      Navigator.of(context).pop();
      _message(tr('Verset publié en storie.'));
    } catch (e) {
      if (!mounted) return;
      final texte = '$e'.replaceFirst('Exception: ', '');
      _message(texte.isEmpty ? tr('Impossible de publier le verset en storie.') : texte);
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final showShare = !kIsWeb && !isWindowsDesktop;
    return AlertDialog(
      title: Text(tr('Partager le verset')),
      content: SingleChildScrollView(
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          RepaintBoundary(
            key: _boundaryKey,
            child: VerseShareImage(verse: widget.verse),
          ),
          const SizedBox(height: 12),
          Text(
            kIsWeb
                ? tr('Sur le web, WhatsApp télécharge l’image : joignez-la dans la conversation.')
                : tr('WhatsApp : choisissez WhatsApp dans la liste pour envoyer l’image.'),
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 13, color: Colors.black54),
          ),
        ]),
      ),
      actions: [
        TextButton(
          onPressed: _busy ? null : () => Navigator.of(context).pop(),
          child: Text(tr('Fermer')),
        ),
        OutlinedButton.icon(
          onPressed: _busy ? null : _download,
          icon: const Icon(Icons.download_outlined, size: 19),
          label: Text(tr('Télécharger')),
        ),
        if (showShare)
          OutlinedButton.icon(
            onPressed: _busy ? null : _share,
            icon: const Icon(Icons.share_outlined, size: 19),
            label: Text(tr('Partager')),
          ),
        if (widget.client != null)
          OutlinedButton.icon(
            onPressed: _busy ? null : _publierEnStorie,
            icon: const Icon(Icons.auto_stories_outlined, size: 19),
            label: Text(tr('En storie')),
          ),
        FilledButton.icon(
          onPressed: _busy ? null : _shareWhatsApp,
          icon: const Icon(Icons.chat_bubble_outline, size: 19),
          label: const Text('WhatsApp'),
          style: FilledButton.styleFrom(backgroundColor: const Color(0xFF25D366), foregroundColor: Colors.white),
        ),
      ],
    );
  }
}
