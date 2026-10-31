// Adresses réelles par section sur le web, 30 oct. 2026.
// Lit le chemin d'arrivée pour ouvrir la section correspondante,
// et écrit le chemin à chaque navigation dans la barre du bas.
// Les pages ouvertes depuis Plus gardent le chemin de leur section,
// puisque la section reste Plus pendant leur consultation.
import 'dart:html' as html;

const _paths = ['/', '/bible', '/librairie', '/carte', '/communaute', '/plus'];

int initialTabIndex() {
  try {
    var path = html.window.location.pathname ?? '/';
    if (path.length > 1 && path.endsWith('/')) path = path.substring(0, path.length - 1);
    final i = _paths.indexOf(path);
    return i < 0 ? 0 : i;
  } catch (_) {
    return 0;
  }
}

void writeTabPath(int index) {
  try {
    final path = _paths[index.clamp(0, 5)];
    if ((html.window.location.pathname ?? '/') == path) return;
    html.window.history.pushState(null, '', path);
  } catch (_) {}
}

// Boutons Retour et Suivant du navigateur, 30 oct. 2026 : sans
// cet écouteur, l'adresse changerait sans que la section suive.
// pushState ne déclenche pas cet événement, donc aucune boucle.
void listenTabPath(void Function(int index) onPath) {
  try {
    html.window.onPopState.listen((_) {
      try {
        onPath(initialTabIndex());
      } catch (_) {}
    });
  } catch (_) {}
}
