// Téléchargement hors ligne d'un audio, carte 53, 6 nov. 2026 :
// sur le web, le navigateur ne garde pas le fichier de la même
// façon, les fonctions renvoient donc null ou false ; ailleurs,
// le fichier est écrit dans le dossier de documents de
// l'application, sous-dossier audios, un seul fichier par audio,
// nommé par identifiant serveur ou, à défaut, par titre normalisé.
// Même signature des deux côtés, comme telechargement_image.dart.
export 'telechargement_audio_io.dart' if (dart.library.html) 'telechargement_audio_web.dart';
