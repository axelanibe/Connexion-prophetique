#!/usr/bin/env python3
"""Service worker de la version web, 28 oct. 2026.
La police MaterialIcons binaire ne peut pas être déposée dans le
dépôt par l'outil GitHub, qui n'accepte que du texte, donc le
moteur la demande et reçoit 404, et les icônes restent en barres
rayées, alors que la page elle-même ne suffit pas, car le moteur
dessine sur toile, pas dans le document. Ce script ajoute, en tête
du service worker de Flutter, un premier écouteur qui sert la
police à partir de sa version texte base64, avant l'écouteur de
Flutter, qui garde la main pour tout le reste.
À relancer après chaque `flutter build web`, avant la poussée,
car la construction écrase website/app-test/flutter_service_worker.js.
"""
import pathlib

base = pathlib.Path(__file__).resolve().parent.parent
src = base / 'build/web/flutter_service_worker.js'
dest = base / 'website/app-test/flutter_service_worker.js'
s = src.read_text()
marker = 'Police web, 28 oct. 2026'
if marker in s:
    print('Écouteur police déjà présent dans le service worker source.')
else:
    patch = """// Police web, 28 oct. 2026 : voir tools/patch_app_test_sw.py.
self.addEventListener('fetch', (event) => {
  if (event.request.url.endsWith('assets/fonts/MaterialIcons-Regular.otf')) {
    event.respondWith((async () => {
      try {
        const res = await fetch('assets/fonts/MaterialIcons-Regular.otf.b64');
        if (!res.ok) return fetch(event.request);
        const b64 = (await res.text()).replace(/\\s/g, '');
        const bin = atob(b64);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return new Response(bytes, {headers: {'Content-Type': 'font/otf', 'Cache-Control': 'public, max-age=86400'}});
      } catch (_) {
        return fetch(event.request);
      }
    })());
  }
});
"""
    s = patch + s
dest.write_text(s)
print('Service worker avec police écrit dans website/app-test/flutter_service_worker.js.')
