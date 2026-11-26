// Lecture d'un livre acheté, T11, 26 nov. 2026.
// Le fichier vient de la route authentifiée /livres/:id/fichier,
// jamais d'un lien direct : le serveur refuse tant que l'achat
// n'est pas confirmé. Un PDF s'ouvre dans le visualiseur intégré
// (web et téléphone), un EPUB part vers le lecteur de l'appareil
// par partage, comme l'ancienne ouverture.
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:share_plus/share_plus.dart';

import '../api.dart';
import '../app_models.dart';
import '../pdf_view.dart';
import 'palette.dart';

Future<void> ouvrirLivreAchete(
  BuildContext c,
  Book livre, {
  required bool estAchete,
}) async {
  void dire(String m) {
    if (c.mounted) {
      ScaffoldMessenger.of(c).showSnackBar(SnackBar(content: Text(m)));
    }
  }

  if (!estAchete) {
    dire('Ce livre est verrouillé. Il s’ouvre après la confirmation du paiement.');
    return;
  }
  if (livre.serverId.isEmpty) {
    dire('La structure n’a pas encore fourni le fichier de ce livre.');
    return;
  }
  dire('Ouverture en cours…');
  late final List<int> octets;
  try {
    octets = await api.fetchLivreFile(livre.serverId);
  } catch (_) {
    dire('Ouverture impossible pour le moment. Vérifiez votre connexion, puis réessayez.');
    return;
  }
  if (octets.isEmpty) {
    dire('La structure n’a pas encore fourni le fichier de ce livre.');
    return;
  }
  if (!c.mounted) return;
  if (livre.format.toLowerCase().contains('epub')) {
    await SharePlus.instance.share(
      ShareParams(
        files: [
          XFile.fromData(
            Uint8List.fromList(octets),
            name: '${livre.title}.epub',
            mimeType: 'application/epub+zip',
          ),
        ],
        text: livre.title,
      ),
    );
    return;
  }
  await Navigator.of(c).push(
    MaterialPageRoute(
      builder: (_) => Scaffold(
        appBar: AppBar(
          title: Text(livre.title),
          backgroundColor: Colors.white,
          foregroundColor: PaletteNouvelle.bleuNuit,
        ),
        body: PdfDocumentView(bytes: Uint8List.fromList(octets)),
      ),
    ),
  );
}
