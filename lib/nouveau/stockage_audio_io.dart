// Stockage des octets sur téléphone : un fichier par audio,
// dans le dossier de l'application.
import 'dart:io';
import 'dart:typed_data';

import 'package:path_provider/path_provider.dart';

import 'stockage_audio_types.dart';

StockageAudioLocal creerStockageAudio() => StockageAudioFichier();

class StockageAudioFichier implements StockageAudioLocal {
  Future<Directory> _dossier() async {
    final base = await getApplicationDocumentsDirectory();
    final dir = Directory('${base.path}/parole-vivante');
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
    if (!await fichier.exists()) return null;
    return fichier.path;
  }

  @override
  Future<String?> urlBlob(String id, String extension, String mime) async =>
      null;
}
