// ETag pour les lectures partagées, carte 160, 23 nov. 2026 :
// un GET ne doit jamais écrire en base, et une réponse déjà lue
// ne doit pas être retéléchargée. L'ETag est le condensé SHA-256
// du contenu JSON renvoyé, entre guillemets comme l'exige la
// norme. Le client renvoie l'ETag gardé en local dans
// If-None-Match ; quand il correspond, le serveur répond 304
// sans corps. Fonctions pures, sans serveur ni base, testées
// dans tests/carte_160.test.js.
import crypto from 'node:crypto';

/// Condensé d'un contenu JSON, entre guillemets. Le même contenu
/// donne toujours le même ETag, un contenu différent en donne
/// un autre, même si la différence ne tient qu'à un caractère.
export function etagPourContenu(contenu) {
  return `"${crypto.createHash('sha256').update(JSON.stringify(contenu)).digest('hex')}"`;
}

/// Vrai quand l'en-tête If-None-Match de la requête porte
/// exactement cet ETag. Un astérisque, une liste ou une valeur
/// vide ne correspondent jamais : le serveur renvoie alors le
/// contenu complet, comme avant.
export function etagCorrespond(req, etag) {
  const recu = (req?.headers?.['if-none-match'] ?? '').toString().trim();
  return recu !== '' && recu !== '*' && recu === etag;
}
