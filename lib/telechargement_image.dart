// Téléchargement d'une image, 31 oct. 2026 : sur le web, le navigateur
// ne peut écrire que dans Téléchargements, par un lien temporaire ;
// ailleurs, le fichier est écrit dans Téléchargements, avec repli vers
// le dossier de l'application. Même nom de fonction des deux côtés,
// comme verse_share_download.dart. La version web renvoie null, le
// navigateur ne donnant pas de chemin ; la version téléphone renvoie
// le nom du fichier, pour le message de confirmation.
export 'telechargement_image_io.dart' if (dart.library.html) 'telechargement_image_web.dart';
