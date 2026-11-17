// Galerie de l'appareil pour la création de story, 17 nov. 2026 :
// point d'entrée, import conditionnel. Sur téléphone, photo_manager
// liste les photos et vidéos récentes ; sur le web, le repli vide,
// la page montre le sélecteur de fichiers à la place.
import 'galerie_story_types.dart';
import 'galerie_story_stub.dart' if (dart.library.io) 'galerie_story_mobile.dart' as impl;

export 'galerie_story_types.dart';

/// Chargeur de la plateforme en cours, pour la production.
ChargeurGalerie creerChargeurGalerie() => impl.creerChargeurGalerie();
