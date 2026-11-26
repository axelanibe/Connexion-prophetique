// Catégories de notifications, carte 1, 21 nov. 2026 : le
// client envoie 'nouveau_message', jamais l'ancien
// 'messagerie', et le serveur accepte 'messagerie' comme alias
// à l'enregistrement du jeton, pour les jetons déjà stockés.
// Tests purs, sans serveur ni base. Lancer depuis
// server-production :
//   node --test tests/notifications_categories.test.js
// La normalisation vit dans src/fcm.js, importée par server.js
// pour l'enregistrement du jeton et le filtre d'envoi. Les
// listes de types sont relues dans server.js et dans
// lib/notif_settings.dart, pour vérifier le trajet complet des
// catégories envoyées par le client jusqu'au filtre serveur.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normaliserCategoriesPush } from '../src/fcm.js';

const dossier = path.dirname(fileURLToPath(import.meta.url));
const serveur = fs.readFileSync(path.join(dossier, '..', 'server.js'), 'utf8');
const reglagesClient = fs.readFileSync(
  path.join(dossier, '..', '..', 'lib', 'notif_settings.dart'),
  'utf8',
);

// Liste de chaînes entre crochets, lue dans une source. Les
// commentaires sont retirés avant, pour ne pas prendre un nom
// cité dans un commentaire pour un élément de la liste.
function extraireListe(source, marqueur) {
  const debut = source.indexOf(marqueur);
  assert.ok(debut >= 0, `marqueur introuvable : ${marqueur}`);
  const fin = source.indexOf('];', debut);
  assert.ok(fin > debut, `fin de liste introuvable après : ${marqueur}`);
  const sansCommentaires = source.slice(debut, fin).replace(/\/\/.*$/gm, '');
  return [...sansCommentaires.matchAll(/'([^']+)'/g)].map((m) => m[1]);
}

// Filtre serveur, tel qu'écrit dans server.js : une catégorie
// normalisée qui n'est pas un type connu est ignorée.
function filtreServeur(categories, typesConnus) {
  return normaliserCategoriesPush(categories).filter((c) => typesConnus.includes(c));
}

test('messagerie est un alias de nouveau_message', () => {
  assert.deepEqual(normaliserCategoriesPush(['messagerie']), ['nouveau_message']);
  assert.deepEqual(normaliserCategoriesPush(['messagerie', 'appel_entrant']), [
    'nouveau_message',
    'appel_entrant',
  ]);
});

test('les autres catégories passent telles quelles, sans inventer', () => {
  assert.deepEqual(normaliserCategoriesPush(['nouveau_message']), ['nouveau_message']);
  assert.deepEqual(normaliserCategoriesPush(['appel_entrant', 'inconnue']), [
    'appel_entrant',
    'inconnue',
  ]);
  assert.deepEqual(normaliserCategoriesPush(null), []);
  assert.deepEqual(normaliserCategoriesPush(undefined), []);
});

test('le serveur connaît nouveau_message comme type de poussée', () => {
  const typesConnus = extraireListe(serveur, 'const TYPES_NOTIFICATIONS_CONNUS = [');
  assert.ok(typesConnus.includes('nouveau_message'), 'nouveau_message est un type connu');
  assert.ok(!typesConnus.includes('messagerie'), 'messagerie n’est plus un type connu');
});

test('l’enregistrement du jeton normalise avant de filtrer', () => {
  assert.ok(
    serveur.includes('normaliserCategoriesPush(corps.categories ?? []).filter((c) => TYPES_NOTIFICATIONS_CONNUS.includes(c))'),
    'POST /moi/notification-token normalise les catégories avant le filtre',
  );
});

test('le filtre d’envoi normalise les catégories déjà stockées', () => {
  assert.ok(
    serveur.includes('const cats = normaliserCategoriesPush(ligne?.categories);'),
    'envoyerPushJetons normalise les catégories du jeton avant de comparer',
  );
});

test('les catégories envoyées par le client passent le filtre pour nouveau_message', () => {
  const typesConnus = extraireListe(serveur, 'const TYPES_NOTIFICATIONS_CONNUS = [');
  const typesClient = extraireListe(reglagesClient, 'static const types = [');
  assert.ok(typesClient.includes('nouveau_message'), 'le client envoie nouveau_message');
  assert.ok(!typesClient.includes('messagerie'), 'le client n’envoie plus messagerie');
  const gardees = filtreServeur(typesClient, typesConnus);
  assert.ok(gardees.includes('nouveau_message'), 'nouveau_message passe le filtre serveur');
  assert.ok(!gardees.includes('messagerie'), 'messagerie ne passe plus le filtre');
});

test('un jeton déjà stocké avec messagerie reçoit les nouveaux messages', () => {
  const typesConnus = extraireListe(serveur, 'const TYPES_NOTIFICATIONS_CONNUS = [');
  const gardees = filtreServeur(['messagerie'], typesConnus);
  assert.deepEqual(gardees, ['nouveau_message']);
});

// Mur des membres v2, tranche 6, 25 nov. 2026 : commentaire
// et mention du mur, cloche et poussée ; réaction et suivi
// restent cloche seulement, sans interrupteur ni poussée.
// Trajet complet rétabli en T3 : lib/notif_settings.dart
// envoie mur_commentaire et mur_mention.
test('le mur : commentaire et mention sont des types connus, réaction et suivi restent cloche seulement', () => {
  const typesConnus = extraireListe(serveur, 'const TYPES_NOTIFICATIONS_CONNUS = [');
  const typesClient = extraireListe(reglagesClient, 'static const types = [');
  assert.ok(typesConnus.includes('mur_commentaire'), 'mur_commentaire est un type connu');
  assert.ok(typesConnus.includes('mur_mention'), 'mur_mention est un type connu');
  assert.ok(!typesConnus.includes('mur_reaction'), 'mur_reaction reste cloche seulement');
  assert.ok(!typesConnus.includes('mur_suivi'), 'mur_suivi reste cloche seulement');
  assert.ok(typesClient.includes('mur_commentaire'), 'le client envoie mur_commentaire');
  assert.ok(typesClient.includes('mur_mention'), 'le client envoie mur_mention');
  assert.ok(!typesClient.includes('mur_reaction'), 'le client n’envoie pas mur_reaction');
  assert.ok(!typesClient.includes('mur_suivi'), 'le client n’envoie pas mur_suivi');
  const gardees = filtreServeur(typesClient, typesConnus);
  assert.ok(gardees.includes('mur_commentaire'), 'mur_commentaire passe le filtre serveur');
  assert.ok(gardees.includes('mur_mention'), 'mur_mention passe le filtre serveur');
  assert.ok(!gardees.includes('mur_reaction'), 'mur_reaction ne passe pas le filtre serveur');
  assert.ok(!gardees.includes('mur_suivi'), 'mur_suivi ne passe pas le filtre serveur');
});
