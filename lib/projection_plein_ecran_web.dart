// Plein écran du navigateur, web seulement, 31 oct. 2026 : la
// demande part d'un toucher de l'utilisateur (bouton « Plein
// écran »), donc le navigateur ne la bloque pas. La touche Échap
// sort du plein écran d'elle-même, comme dans tout navigateur,
// et la page reste affichée en grand.
import 'dart:html' as html;

Future<bool> demanderPleinEcran() async {
  try {
    html.document.documentElement?.requestFullscreen();
    return true;
  } catch (_) {
    return false;
  }
}

Future<void> quitterPleinEcran() async {
  try {
    if (html.document.fullscreenElement != null) {
      html.document.exitFullscreen();
    }
  } catch (_) {}
}
