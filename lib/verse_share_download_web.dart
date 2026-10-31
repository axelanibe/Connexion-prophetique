// Téléchargement de l'image du verset sur le web, lot 1,
// 31 oct. 2026 : le téléchargement part d'un toucher de
// l'utilisateur, donc le navigateur ne le bloque pas. Renvoie
// toujours null, le navigateur ne donnant pas de chemin.
import 'dart:html' as html;
import 'dart:typed_data';

Future<String?> saveVerseShareImage(List<int> bytes, String filename) async {
  final blob = html.Blob([Uint8List.fromList(bytes)], 'image/png');
  final url = html.Url.createObjectUrlFromBlob(blob);
  html.AnchorElement(href: url)
    ..download = filename
    ..click();
  await Future<void>.delayed(const Duration(seconds: 1));
  html.Url.revokeObjectUrl(url);
  return null;
}
