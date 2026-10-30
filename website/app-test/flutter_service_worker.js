// Ancien chemin /app-test/, 30 oct. 2026 : l'application a déménagé à la
// racine du domaine. Ce service worker se désinscrit, pour ne plus servir
// l'ancienne application mise en cache. La page de redirection du même
// dossier renvoie vers la racine, et tente aussi la désinscription.
self.addEventListener('install', (event) => {
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    await self.registration.unregister();
  })());
});
