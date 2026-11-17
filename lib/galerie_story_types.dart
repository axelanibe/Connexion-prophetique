// Galerie de l'appareil pour la création de story, 17 nov. 2026 :
// types partagés par l'implémentation téléphone (photo_manager)
// et le repli web (liste vide). photo_manager importe dart:io,
// donc les deux implémentations vivent dans des fichiers séparés,
// choisis par import conditionnel dans galerie_story.dart.
import 'dart:typed_data';

/// Un élément de la galerie : photo ou vidéo, avec sa vignette.
class ElementGalerie {
  ElementGalerie({
    required this.estVideo,
    required this.vignette,
    required this.duree,
    required this.nom,
    required this.chargerOctets,
  });

  final bool estVideo;

  /// Vignette carrée, pour la grille.
  final Uint8List vignette;

  /// Durée en secondes pour une vidéo, zéro pour une photo.
  final Duration duree;

  /// Nom du fichier, pour la publication.
  final String nom;

  /// Octets complets du fichier, pour la publication.
  final Future<Uint8List?> Function() chargerOctets;
}

/// Résultat du chargement de la galerie.
class GalerieChargee {
  GalerieChargee({required this.elements, required this.autorisee});

  final List<ElementGalerie> elements;

  /// Faux quand l'accès aux photos est refusé.
  final bool autorisee;
}

/// Charge la galerie de l'appareil, 60 éléments récents au plus.
abstract class ChargeurGalerie {
  Future<GalerieChargee> charger();
}
