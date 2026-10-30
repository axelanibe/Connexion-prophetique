// Documents sur téléphone, 30 oct. 2026 : même parcours que les
// exports existants, le fichier est enregistré puis partagé, pour
// l'ouvrir dans un navigateur et l'imprimer. La sauvegarde reprend
// la logique de main.dart, sans cycle d'import.
import 'dart:convert';
import 'dart:io';

import 'package:path_provider/path_provider.dart';
import 'package:share_plus/share_plus.dart';

Future<File> _saveToDownloadsMobile(List<int> bytes, String filename) async {
  Directory? dir;
  try {
    dir = await getDownloadsDirectory();
  } catch (_) {
    dir = null;
  }
  dir ??= await getApplicationDocumentsDirectory();
  await dir.create(recursive: true);
  final file = File('${dir.path}/$filename');
  await file.writeAsBytes(bytes, flush: true);
  return file;
}

Future<void> openPrintDocument(String filename, String htmlContent) async {
  final file = await _saveToDownloadsMobile(utf8.encode(htmlContent), filename);
  await Share.shareXFiles([XFile(file.path)], text: filename);
}

Future<void> downloadTextFile(String filename, String content, String mimeType) async {
  final file = await _saveToDownloadsMobile(utf8.encode(content), filename);
  await Share.shareXFiles([XFile(file.path)], text: filename);
}

Future<void> downloadBytesFile(String filename, List<int> bytes, String mimeType) async {
  final file = await _saveToDownloadsMobile(bytes, filename);
  await Share.shareXFiles([XFile(file.path)], text: filename);
}
