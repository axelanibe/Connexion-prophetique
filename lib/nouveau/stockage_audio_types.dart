// Stockage des octets d'un audio de Parole vivante, selon la
// plateforme. L'index (titres, favoris, playlists, liste des
// téléchargements) vit dans SharedPreferences, voir le service ;
// seuls les octets passent par ici, jamais par le serveur de la
// structure. Même patron d'export conditionnel que
// lib/magnetophone_stockage.dart.
import 'dart:typed_data';

/// Octets d'un audio, par identifiant. L'extension dépend du
/// type réel (mp3, m4a, wav, ogg).
abstract class StockageAudioLocal {
  /// Écrit les octets d'un audio.
  Future<void> ecrire(String id, String extension, Uint8List octets);

  /// Lit les octets, null quand l'audio n'existe plus.
  Future<Uint8List?> lire(String id, String extension);

  /// Supprime les octets, sans erreur quand ils sont absents.
  Future<void> supprimer(String id, String extension);

  /// Chemin local du fichier, sur téléphone seulement, null sur
  /// le web où la lecture passe par une adresse blob.
  Future<String?> cheminLocal(String id, String extension);

  /// Adresse blob de lecture, sur le web seulement, null sur
  /// téléphone où la lecture passe par le chemin du fichier.
  Future<String?> urlBlob(String id, String extension, String mime);
}
