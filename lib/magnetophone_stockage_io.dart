// Stockage des octets sur téléphone : un fichier par
// enregistrement, dans le dossier de l'application.
import 'dart:io';
import 'dart:typed_data';

import 'package:path_provider/path_provider.dart';

import 'magnetophone_stockage_types.dart';

StockageOctetsEnregistrement creerStockageOctets() => StockageOctetsFichier();

/// Octets du fichier temporaire que vient de rendre
/// l'enregistreur, sur téléphone seulement.
Future<Uint8List> lireOctetsTemporaires(String chemin) =>
    File(chemin).readAsBytes();

class StockageOctetsFichier implements StockageOctetsEnregistrement {
  Future<Directory> _dossier() async {
    final base = await getApplicationDocumentsDirectory();
    final dir = Directory('${base.path}/magnetophone');
    if (!await dir.exists()) await dir.create(recursive: true);
    return dir;
  }

  Future<File> _fichier(String id, String extension) async {
    final dir = await _dossier();
    return File('${dir.path}/$id.$extension');
  }

  @override
  Future<void> ecrire(String id, String extension, Uint8List octets) async {
    final fichier = await _fichier(id, extension);
    await fichier.writeAsBytes(octets, flush: true);
  }

  @override
  Future<Uint8List?> lire(String id, String extension) async {
    final fichier = await _fichier(id, extension);
    if (!await fichier.exists()) return null;
    return fichier.readAsBytes();
  }

  @override
  Future<void> supprimer(String id, String extension) async {
    final fichier = await _fichier(id, extension);
    if (await fichier.exists()) await fichier.delete();
  }

  @override
  Future<String?> cheminLocal(String id, String extension) async {
    final fichier = await _fichier(id, extension);
    return fichier.path;
  }
}
