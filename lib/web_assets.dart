// Images de la version web, 28 oct. 2026 : sur le web, les fichiers
// binaires ne peuvent pas être déposés dans le dépôt par l'outil
// GitHub, qui n'accepte que du texte, donc la police, le logo et
// le monogramme manquent en ligne, alors qu'ils sont embarqués
// dans l'APK. Pour que la version web, utilisée par les personnes
// qui ne peuvent pas installer l'application, soit parfaite comme
// l'originale, les images sont aussi présentes dans le dépôt sous
// forme de texte base64 découpé, et ce fichier les recharge quand
// l'image embarquée échoue. Sur téléphone, rien ne change : l'image
// embarquée s'affiche, ce repli ne sert jamais.
import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

const List<String> kLogoParts = [
  'assets/assets/logo.png.b64.partaa',
  'assets/assets/logo.png.b64.partab',
];

const List<String> kMonogramParts = [
  'assets/assets/cp_monogram.png.b64.partaa',
  'assets/assets/cp_monogram.png.b64.partbb',
];

Future<Uint8List?> loadWebAssetBytes(List<String> partUrls) async {
  if (!kIsWeb) return null;
  try {
    final buf = StringBuffer();
    for (final url in partUrls) {
      final res = await http.get(Uri.parse(url));
      if (res.statusCode != 200) return null;
      buf.write(res.body);
    }
    return base64Decode(buf.toString().replaceAll(RegExp(r'\s'), ''));
  } catch (_) {
    return null;
  }
}

class WebAssetImage extends StatefulWidget {
  const WebAssetImage({
    super.key,
    required this.asset,
    required this.partUrls,
    this.width,
    this.height,
    this.fit,
    this.filterQuality,
    this.fallback,
  });
  final String asset;
  final List<String> partUrls;
  final double? width;
  final double? height;
  final BoxFit? fit;
  final FilterQuality? filterQuality;
  final Widget? fallback;

  @override
  State<WebAssetImage> createState() => _WebAssetImageState();
}

class _WebAssetImageState extends State<WebAssetImage> {
  late final Future<Uint8List?> _bytes = loadWebAssetBytes(widget.partUrls);

  @override
  Widget build(BuildContext context) {
    return Image.asset(
      widget.asset,
      width: widget.width,
      height: widget.height,
      fit: widget.fit,
      filterQuality: widget.filterQuality ?? FilterQuality.low,
      errorBuilder: (_, __, ___) {
        if (!kIsWeb) return widget.fallback ?? const SizedBox.shrink();
        return FutureBuilder<Uint8List?>(
          future: _bytes,
          builder: (ctx, snap) {
            if (snap.hasData && snap.data != null) {
              return Image.memory(
                snap.data!,
                width: widget.width,
                height: widget.height,
                fit: widget.fit,
                filterQuality: widget.filterQuality ?? FilterQuality.low,
              );
            }
            return widget.fallback ?? const SizedBox.shrink();
          },
        );
      },
    );
  }
}
