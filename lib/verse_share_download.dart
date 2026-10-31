// Enregistrement de l'image du verset partagée, lot 1, 31 oct. 2026 :
// sur le web, le navigateur ne peut écrire que dans Téléchargements,
// par un lien temporaire ; ailleurs, le fichier est écrit dans
// Téléchargements, avec repli vers le dossier de l'application.
// Même nom de fonction des deux côtés, comme print_doc.dart.
export 'verse_share_download_io.dart' if (dart.library.html) 'verse_share_download_web.dart';
