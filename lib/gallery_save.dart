// Enregistrement d'une image dans la galerie du téléphone, album
// CONNEXION PROPHETIQUE, pour qu'elle apparaisse dans Photos.
// Déplacé de lib/main.dart, cartes de verset, 18 nov. 2026 : la
// carte de membre et le badge de camp l'utilisaient déjà, la carte
// de verset l'utilise aussi, un seul endroit pour le mécanisme.
// Sur le web et Windows, impossible : le navigateur ne peut écrire
// que dans Téléchargements. Si la permission d'ajout est refusée,
// repli vers Téléchargements, jamais un échec silencieux.
import 'package:flutter/foundation.dart';
import 'package:gal/gal.dart';

import 'responsive.dart';

Future<bool> saveToGallery(List<int> bytes, String name) async {
  // Windows, 30 oct. 2026 : pas de galerie, le repli Telechargements
  // existant prend le relais.
  if (kIsWeb || isWindowsDesktop) return false;
  try {
    final granted = await Gal.requestAccess(toAlbum: true);
    if (!granted) return false;
    await Gal.putImageBytes(Uint8List.fromList(bytes), album: 'CONNEXION PROPHETIQUE', name: name);
    return true;
  } catch (_) {
    return false;
  }
}
