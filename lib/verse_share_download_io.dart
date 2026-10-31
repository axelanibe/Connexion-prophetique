// Enregistrement de l'image du verset, téléphone et Windows,
// lot 1, 31 oct. 2026 : écriture dans Téléchargements, avec repli
// vers le dossier de l'application si Téléchargements est indisponible.
// Renvoie le nom du fichier enregistré, pour le message de confirmation.
import 'dart:io';

import 'package:path_provider/path_provider.dart';

Future<String?> saveVerseShareImage(List<int> bytes, String filename) async {
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
  return filename;
}
