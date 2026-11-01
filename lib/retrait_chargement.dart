// Suppression de secours de l'indicateur de chargement, 31 oct. 2026 :
// si le script externe de l'indicateur est bloqué ou absent, c'est
// l'application elle-même qui retire l'élément #chargement dès son
// premier rendu. Même patron d'export conditionnel que
// lib/telechargement_image.dart : version web réelle, version sans
// effet sur téléphone et ordinateur.
export 'retrait_chargement_io.dart' if (dart.library.html) 'retrait_chargement_web.dart';
