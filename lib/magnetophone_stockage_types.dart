// Stockage des octets d'un enregistrement du magnétophone, selon
// la plateforme. L'index (noms, durées, formes d'onde) vit dans
// SharedPreferences, voir lib/magnetophone.dart ; seuls les
// octets passent par ici, jamais par le serveur de la structure.
import 'dart:typed_data';

/// Octets d'un enregistrement, par identifiant. L'extension
/// dépend du type réel (m4a sur téléphone, webm sur le web).
abstract class StockageOctetsEnregistrement {
  /// Écrit les octets d'un enregistrement.
  Future<void> ecrire(String id, String extension, Uint8List octets);

  /// Lit les octets, null quand l'enregistrement n'existe plus.
  Future<Uint8List?> lire(String id, String extension);

  /// Supprime les octets, sans erreur quand ils sont absents.
  Future<void> supprimer(String id, String extension);

  /// Chemin local du fichier, sur téléphone seulement, null sur
  /// le web où la lecture passe par les octets.
  Future<String?> cheminLocal(String id, String extension);
}
