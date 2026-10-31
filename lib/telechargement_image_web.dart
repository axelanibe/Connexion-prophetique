// Téléchargement d'une image sur le web, 31 oct. 2026 : le
// téléchargement part d'un toucher de l'utilisateur, donc le
// navigateur ne le bloque pas. Renvoie toujours null, le navigateur
// ne donnant pas de chemin. Même modèle que verse_share_download_web.
import 'dart:html' as html;
import 'dart:typed_data';

Future<String?> telechargerImage(List<int> bytes, String filename, String mimeType) async {
  final blob = html.Blob([Uint8List.fromList(bytes)], mimeType);
  final url = html.Url.createObjectUrlFromBlob(blob);
  html.AnchorElement(href: url)
    ..download = filename
    ..click();
  await Future<void>.delayed(const Duration(seconds: 1));
  html.Url.revokeObjectUrl(url);
  return null;
}
