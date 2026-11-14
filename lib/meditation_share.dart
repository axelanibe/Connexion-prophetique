// Méditation Quotidienne partageable en image, carte 89, 7 nov. 2026.
//
// Cause : le bouton Partager de la Méditation ouvrait le dialogue
// du verset du jour, carte 81 : l'image ne portait que le verset,
// sa référence et sa version, jamais le titre ni la réflexion de
// la méditation, et le titre du dialogue disait « Partager le
// verset du jour ». Partager la méditation, ce n'était donc pas
// partager la méditation. Sur le web, le bouton WhatsApp de ce
// dialogue ne passait jamais par la feuille de partage : il
// téléchargeait l'image puis ouvrait wa.me avec le texte seul,
// et le membre devait joindre l'image à la main, ce qui, sur
// iPhone, depuis Téléchargements, est difficile, d'où le « cela
// demeure impossible » d'Axel.
//
// Correctif : un dialogue propre à la méditation, avec son image :
// monogramme, MÉDITATION QUOTIDIENNE, titre de la méditation,
// verset exact et sa référence, réflexion courte, bleu nuit et or,
// comme la carte du verset, sans texte inventé, sans verset
// inventé, tout repris de la méditation affichée. Le bouton
// WhatsApp, vert, en premier, envoie l'image PNG : sur téléphone,
// par la feuille du système, le membre choisit WhatsApp dans la
// liste, share_plus ne peut pas cibler une application précise ;
// sur le web, il essaie d'abord la feuille de partage du
// navigateur avec le fichier, navigator.share, qui existe dans
// share_plus 9, et l'image arrive alors jointe dans WhatsApp
// sans geste de plus ; si le navigateur ne sait pas partager un
// fichier, repli honnête, image téléchargée puis WhatsApp ouvert
// avec le texte, le membre joint l'image, comme la carte 81.
// wa.me ne porte que du texte, jamais une image : aucun lien
// wa.me avec une image n'est tenté ici. Les boutons Lire et
// Écouter ne changent pas, le partage du verset du jour, carte
// 81, ne change pas.
import 'dart:ui' as ui;

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:share_plus/share_plus.dart';
import 'package:url_launcher/url_launcher.dart';

import 'home_web.dart';
import 'i18n.dart';
import 'meditation_journal.dart';
import 'responsive.dart';
import 'verse_share_download.dart';

const _meditationShareFilename = 'meditation-du-jour.png';

// Réflexion courte : les 7 réflexions tiennent en une phrase, on
// les garde entières ; une réflexion plus longue, fournie plus
// tard par la structure, est coupée à 240 caractères, sans rien
// inventer.
String _reflexionCourte(String reflection) {
  final text = reflection.trim();
  if (text.length <= 240) return text;
  return '${text.substring(0, 237).trim()}…';
}

// Image de la méditation, telle qu'elle est partagée : fond bleu
// nuit dégradé comme la carte, monogramme et nom de l'application
// en haut, titre de la méditation, texte du verset en blanc,
// référence en or, réflexion courte en dessous.
class MeditationShareImage extends StatelessWidget {
  const MeditationShareImage({
    super.key,
    required this.meditation,
    required this.verseText,
    required this.refLabel,
    required this.version,
  });
  final DailyMeditation meditation;
  final String verseText;
  final String refLabel;
  final String version;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Color(0xFF0B1F3A), Color(0xFF06101F)],
        ),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0x59D4A72C)),
      ),
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
          const SizedBox(height: 24),
          Text(
            tr('Méditation du jour'),
            style: const TextStyle(color: W.gold, fontSize: 14, fontWeight: FontWeight.w700, letterSpacing: 1.4),
          ),
          const SizedBox(height: 12),
          Text(
            meditation.title,
            textAlign: TextAlign.center,
            style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.w800, height: 1.3),
          ),
          const SizedBox(height: 20),
          Text(
            '« $verseText »',
            textAlign: TextAlign.center,
            style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w600, height: 1.45),
          ),
          const SizedBox(height: 14),
          Text(
            refLabel,
            textAlign: TextAlign.center,
            style: const TextStyle(color: W.gold, fontSize: 17, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 4),
          Text(
            '($version)',
            textAlign: TextAlign.center,
            style: const TextStyle(color: Color(0xFF8E98AB), fontSize: 14),
          ),
          const SizedBox(height: 20),
          Container(width: 64, height: 3, decoration: BoxDecoration(color: W.gold, borderRadius: BorderRadius.circular(2))),
          const SizedBox(height: 14),
          Text(
            _reflexionCourte(meditation.reflection),
            textAlign: TextAlign.center,
            style: const TextStyle(color: Colors.white, fontSize: 16, height: 1.5),
          ),
        ]),
      ),
    );
  }
}

// Aperçu de la méditation en image, avec partage et téléchargement.
// Le contexte doit rester celui de l'écran qui appelle, pour que
// la feuille de partage et les messages s'affichent au bon endroit.
Future<void> showMeditationShareDialog(
  BuildContext context,
  DailyMeditation meditation,
  String verseText,
  String refLabel,
  String version,
) {
  return showDialog<void>(
    context: context,
    builder: (context) => _MeditationShareDialog(
      meditation: meditation,
      verseText: verseText,
      refLabel: refLabel,
      version: version,
    ),
  );
}

class _MeditationShareDialog extends StatefulWidget {
  const _MeditationShareDialog({
    required this.meditation,
    required this.verseText,
    required this.refLabel,
    required this.version,
  });
  final DailyMeditation meditation;
  final String verseText;
  final String refLabel;
  final String version;

  @override
  State<_MeditationShareDialog> createState() => _MeditationShareDialogState();
}

class _MeditationShareDialogState extends State<_MeditationShareDialog> {
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

  String get _shareText =>
      meditationShareText(widget.meditation, widget.verseText, widget.refLabel);

  Future<void> _share() async {
    if (_busy) return;
    setState(() => _busy = true);
    try {
      final png = await _capture();
      if (png == null || png.isEmpty) {
        if (mounted) _message(tr('Impossible de créer l’image de la méditation.'));
        return;
      }
      await Share.shareXFiles(
        [XFile.fromData(png, name: _meditationShareFilename, mimeType: 'image/png')],
        text: _shareText,
      );
    } catch (_) {
      if (mounted) _message(tr('Impossible de partager l’image de la méditation.'));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  // Carte 89, 7 nov. 2026 : WhatsApp avec l'image de la
  // méditation. Sur téléphone, le fichier PNG part par la feuille
  // du système, le membre choisit WhatsApp dans la liste,
  // share_plus ne peut pas cibler une application précise. Sur
  // le web, on essaie d'abord la feuille de partage du navigateur
  // avec le fichier, navigator.share, présent dans share_plus 9 :
  // quand le navigateur sait partager un fichier, l'image arrive
  // jointe dans WhatsApp sans geste de plus. Si le navigateur ne
  // sait pas partager un fichier, repli de la carte 81 : l'image
  // est téléchargée, puis WhatsApp s'ouvre avec le texte, le
  // membre joint l'image téléchargée dans la conversation. Un
  // abandon de la feuille, par le membre, n'ouvre rien d'autre.
  Future<void> _shareWhatsApp() async {
    if (_busy) return;
    setState(() => _busy = true);
    try {
      final png = await _capture();
      if (png == null || png.isEmpty) {
        if (mounted) _message(tr('Impossible de créer l’image de la méditation.'));
        return;
      }
      if (kIsWeb) {
        try {
          await Share.shareXFiles(
            [XFile.fromData(png, name: _meditationShareFilename, mimeType: 'image/png')],
            text: _shareText,
          );
          return;
        } catch (_) {
          // Le navigateur ne sait pas partager un fichier : repli
          // téléchargement puis WhatsApp avec le texte, ci-dessous.
        }
        await saveVerseShareImage(png, _meditationShareFilename);
        final ok = await launchUrl(
          Uri.parse('https://wa.me/?text=${Uri.encodeComponent(_shareText)}'),
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
        [XFile.fromData(png, name: _meditationShareFilename, mimeType: 'image/png')],
        text: _shareText,
      );
    } catch (_) {
      if (mounted) _message(tr('Impossible de partager l’image de la méditation.'));
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
        if (mounted) _message(tr('Impossible de créer l’image de la méditation.'));
        return;
      }
      final savedName = await saveVerseShareImage(png, _meditationShareFilename);
      if (mounted) {
        _message(savedName == null ? tr('Image téléchargée.') : tr('Image enregistrée dans Téléchargements.'));
      }
    } catch (_) {
      if (mounted) _message(tr('Impossible de télécharger l’image de la méditation.'));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final showShare = !kIsWeb && !isWindowsDesktop;
    return AlertDialog(
      title: Text(tr('Partager la méditation')),
      content: SingleChildScrollView(
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          RepaintBoundary(
            key: _boundaryKey,
            child: MeditationShareImage(
              meditation: widget.meditation,
              verseText: widget.verseText,
              refLabel: widget.refLabel,
              version: widget.version,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            kIsWeb
                ? tr('Sur le web, WhatsApp reçoit l’image directement si votre navigateur sait partager un fichier, sinon elle est téléchargée : joignez-la dans la conversation.')
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
        FilledButton.icon(
          onPressed: _busy ? null : _shareWhatsApp,
          icon: const Icon(Icons.chat_outlined, size: 19),
          label: const Text('WhatsApp'),
          style: FilledButton.styleFrom(backgroundColor: const Color(0xFF25D366), foregroundColor: Colors.white),
        ),
      ],
    );
  }
}
