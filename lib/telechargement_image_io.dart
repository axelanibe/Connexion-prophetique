// Téléchargement d'une image, téléphone et Windows, 31 oct. 2026 :
// écriture dans Téléchargements, avec repli vers le dossier de
// l'application si Téléchargements est indisponible. Même comportement
// que l'ancien saveToDownloads pour ces appels. Le type MIME ne sert
// que sur le web, il est ignoré ici. Renvoie le nom du fichier.
import 'dart:io';

import 'package:path_provider/path_provider.dart';

Future<String?> telechargerImage(List<int> bytes, String filename, String mimeType) async {
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
