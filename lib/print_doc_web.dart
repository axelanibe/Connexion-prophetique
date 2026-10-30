// Documents sur le web, 30 oct. 2026 : le document imprimable
// s'ouvre dans un nouvel onglet, avec son bouton Imprimer, et les
// téléchargements passent par un lien temporaire. L'ouverture part
// d'un toucher de l'utilisateur, donc le nouvel onglet n'est pas
// bloqué. L'adresse blob n'est pas révoquée pour le document
// imprimé, pour ne pas le casser si l'impression tarde.
import 'dart:html' as html;
import 'dart:typed_data';

Future<void> openPrintDocument(String filename, String htmlContent) async {
  final blob = html.Blob([htmlContent], 'text/html');
  final url = html.Url.createObjectUrlFromBlob(blob);
  html.window.open(url, '_blank');
}

Future<void> downloadTextFile(String filename, String content, String mimeType) async {
  final blob = html.Blob([content], mimeType);
  final url = html.Url.createObjectUrlFromBlob(blob);
  html.AnchorElement(href: url)
    ..download = filename
    ..click();
  await Future<void>.delayed(const Duration(seconds: 1));
  html.Url.revokeObjectUrl(url);
}

Future<void> downloadBytesFile(String filename, List<int> bytes, String mimeType) async {
  final blob = html.Blob([Uint8List.fromList(bytes)], mimeType);
  final url = html.Url.createObjectUrlFromBlob(blob);
  html.AnchorElement(href: url)
    ..download = filename
    ..click();
  await Future<void>.delayed(const Duration(seconds: 1));
  html.Url.revokeObjectUrl(url);
}
