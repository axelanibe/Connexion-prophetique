// Galerie de l'appareil pour la création de story, 17 nov. 2026 :
// repli web, liste toujours vide. Sur le web, la page de création
// montre le sélecteur de fichiers à la place de la grille.
import 'galerie_story_types.dart';

ChargeurGalerie creerChargeurGalerie() => _ChargeurGalerieVide();

class _ChargeurGalerieVide implements ChargeurGalerie {
  @override
  Future<GalerieChargee> charger() async => GalerieChargee(elements: const [], autorisee: true);
}
