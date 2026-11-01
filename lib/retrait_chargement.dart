// Retrait de secours de l'indicateur de chargement, 1 nov. 2026 : meme
// patron d'export conditionnel que telechargement_image.dart. Sur le web,
// l'application retire elle-meme l'element #chargement des le premier
// rendu, meme si le script externe est bloque ou absent. Ailleurs, la
// fonction est vide et sans effet.
export 'retrait_chargement_io.dart' if (dart.library.html) 'retrait_chargement_web.dart';
