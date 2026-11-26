// Stockage des octets sur le web : IndexedDB, dans le
// navigateur, un objet par audio. Aucun envoi serveur. Base
// propre à Parole vivante, séparée de celle du magnétophone,
// pour ne jamais mélanger les deux magasins.
//
// Les types IndexedDB de dart:html ne se nomment pas dans le
// code (ils vivent dans dart:indexed_db, non résolu par
// l'analyseur hors web) : l'ouverture et les transactions
// passent par l'inférence et l'accès dynamique, contenus dans
// ce seul fichier, comme pour le magnétophone.
import 'dart:html' as html;
import 'dart:typed_data';

import 'stockage_audio_types.dart';

StockageAudioLocal creerStockageAudio() => StockageAudioNavigateur();

class StockageAudioNavigateur implements StockageAudioLocal {
  static const _base = 'connexion-prophetique-audio';
  static const _magasin = 'parole-vivante';

  Future<dynamic> _ouvrir() {
    return html.window.indexedDB!.open(_base, version: 1, onUpgradeNeeded: (e) {
      final base = (e.target as dynamic).result;
      final noms = base.objectStoreNames as List;
      if (!noms.contains(_magasin)) {
        base.createObjectStore(_magasin, keyPath: 'id');
      }
    });
  }

  @override
  Future<void> ecrire(String id, String extension, Uint8List octets) async {
    final base = await _ouvrir();
    final transaction = base.transaction(_magasin, 'readwrite');
    final magasin = transaction.objectStore(_magasin);
    await magasin.put({'id': '$id.$extension', 'octets': html.Blob([octets])});
    await transaction.completed;
  }

  @override
  Future<Uint8List?> lire(String id, String extension) async {
    final base = await _ouvrir();
    final transaction = base.transaction(_magasin, 'readonly');
    final magasin = transaction.objectStore(_magasin);
    final ligne = await magasin.getObject('$id.$extension') as Map?;
    if (ligne == null) return null;
    final blob = ligne['octets'] as html.Blob;
    final lecteur = html.FileReader();
    lecteur.readAsArrayBuffer(blob);
    await lecteur.onLoad.first;
    final tampon = lecteur.result as ByteBuffer;
    return tampon.asUint8List();
  }

  @override
  Future<void> supprimer(String id, String extension) async {
    final base = await _ouvrir();
    final transaction = base.transaction(_magasin, 'readwrite');
    final magasin = transaction.objectStore(_magasin);
    await magasin.delete('$id.$extension');
    await transaction.completed;
  }

  @override
  Future<String?> cheminLocal(String id, String extension) async => null;

  @override
  Future<String?> urlBlob(String id, String extension, String mime) async {
    final octets = await lire(id, extension);
    if (octets == null) return null;
    return html.Url.createObjectUrlFromBlob(html.Blob([octets], mime));
  }
}
