// Tests de la carte 160, 23 nov. 2026 : les actualités ne
// s'écrivent plus lors d'une lecture.
//
// - GET /actualites ne fait plus que lire : la notification des
//   actualités programmées est sortie vers la tâche de fond
//   notifierActualitesProgrammeesDues, au démarrage et toutes
//   les heures, comme la purge des stories.
// - GET /actualites et GET /api/config renvoient un ETag et
//   répondent 304 quand le client renvoie le même ETag.
// - La partie pure seulement, sans serveur ni base, comme
//   amens.test.js : les aides de src/etag.js sont testées
//   directement, et les routes par la présence du code dans
//   server.js. Lancer depuis server-production :
//   node --test tests/carte_160.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { etagPourContenu, etagCorrespond } from '../src/etag.js';

const dossier = path.dirname(fileURLToPath(import.meta.url));
const serveur = fs.readFileSync(path.join(dossier, '..', 'server.js'), 'utf8');

// Corps d'un gestionnaire app.get('...', async ...), extrait par
// comptage d'accolades à partir de sa première ouvrante. Les
// gabarits SQL des routes ne contiennent pas d'accolades.
function extraireCorps(source, marqueur) {
  const debut = source.indexOf(marqueur);
  assert.ok(debut >= 0, `marqueur introuvable : ${marqueur}`);
  const ouvrante = source.indexOf('{', debut);
  assert.ok(ouvrante > debut, `accolade introuvable après : ${marqueur}`);
  let profondeur = 0;
  for (let i = ouvrante; i < source.length; i++) {
    if (source[i] === '{') profondeur++;
    if (source[i] === '}') {
      profondeur--;
      if (profondeur === 0) return source.slice(ouvrante, i + 1);
    }
  }
  assert.fail(`fin introuvable après : ${marqueur}`);
}

// ── ETag pur ───────────────────────────────────────────────────
test('etagPourContenu : le même contenu donne le même ETag', () => {
  const a = [{ id: '1', titre: 'Bonjour' }];
  const b = [{ id: '1', titre: 'Bonjour' }];
  assert.equal(etagPourContenu(a), etagPourContenu(b));
  assert.match(etagPourContenu(a), /^"[0-9a-f]{64}"$/);
});

test('etagPourContenu : un caractère différent change l ETag', () => {
  const a = [{ id: '1', titre: 'Bonjour' }];
  const b = [{ id: '1', titre: 'Bonjour !' }];
  assert.notEqual(etagPourContenu(a), etagPourContenu(b));
  assert.notEqual(etagPourContenu([]), etagPourContenu([{ id: '1' }]));
});

test('etagCorrespond : l ETag exact correspond, le reste non', () => {
  const etag = '"abc123"';
  assert.equal(etagCorrespond({ headers: { 'if-none-match': '"abc123"' } }, etag), true);
  assert.equal(etagCorrespond({ headers: { 'if-none-match': '"autre"' } }, etag), false);
  assert.equal(etagCorrespond({ headers: {} }, etag), false);
  assert.equal(etagCorrespond({ headers: { 'if-none-match': '' } }, etag), false);
  assert.equal(etagCorrespond({ headers: { 'if-none-match': '*' } }, etag), false);
  assert.equal(etagCorrespond({}, etag), false);
});

// ── GET /actualites ne fait plus que lire ─────────────────────
test('GET /actualites : aucune écriture dans le gestionnaire', () => {
  const corps = extraireCorps(serveur, "app.get('/actualites'");
  for (const mot of ['UPDATE', 'INSERT', 'DELETE', 'notifierTous']) {
    assert.ok(!corps.includes(mot), `GET /actualites contient encore : ${mot}`);
  }
  assert.ok(corps.includes('SELECT'), 'GET /actualites doit toujours lire la liste');
});

test('GET /actualites : ETag, Cache-Control et 304', () => {
  const corps = extraireCorps(serveur, "app.get('/actualites'");
  assert.ok(corps.includes('etagPourContenu'), 'ETag calculé sur le contenu');
  assert.ok(corps.includes('etagCorrespond'), 'If-None-Match vérifié');
  assert.ok(corps.includes("reply.code(304)"), '304 quand rien n a changé');
  assert.ok(corps.includes("'ETag'"), 'en-tête ETag renvoyé');
  assert.ok(corps.includes('Cache-Control'), 'en-tête Cache-Control renvoyé');
});

// ── Tâche de fond de notification ─────────────────────────────
test('la tâche de fond notifie les actualités programmées dues', () => {
  assert.ok(serveur.includes('async function notifierActualitesProgrammeesDues()'), 'fonction de tâche de fond définie');
  const debut = serveur.indexOf('async function notifierActualitesProgrammeesDues()');
  const fin = serveur.indexOf('await notifierActualitesProgrammeesDues();', debut);
  const corps = serveur.slice(debut, fin);
  assert.ok(corps.includes('UPDATE actualites SET notif_envoyee = true WHERE id = $1 AND NOT notif_envoyee'), 'prise atomique du drapeau gardée');
  assert.ok(corps.includes("notifierTous('nouvelle_actualite'"), 'notification par membre gardée');
});

test('la tâche de fond tourne au démarrage et toutes les heures', () => {
  assert.ok(serveur.includes('await notifierActualitesProgrammeesDues();'), 'appel au démarrage');
  assert.ok(serveur.includes('setInterval(notifierActualitesProgrammeesDues, 60 * 60 * 1000)'), 'toutes les heures, comme la purge des stories');
});

test('la publication ne renvoie plus vers le balayage de lecture', () => {
  assert.ok(!serveur.includes('balayage de la lecture'), 'aucune référence restante au balayage de lecture');
  assert.ok(serveur.includes('notifierActualitesProgrammeesDues'), 'la publication renvoie à la tâche de fond');
});

// ── GET /api/config ───────────────────────────────────────────
test('GET /api/config : ETag, Cache-Control et 304', () => {
  const corps = extraireCorps(serveur, "app.get('/api/config'");
  assert.ok(corps.includes('etagPourContenu'), 'ETag calculé sur la configuration');
  assert.ok(corps.includes('etagCorrespond'), 'If-None-Match vérifié');
  assert.ok(corps.includes("reply.code(304)"), '304 quand rien n a changé');
  assert.ok(corps.includes("'ETag'"), 'en-tête ETag renvoyé');
  assert.ok(corps.includes('Cache-Control'), 'en-tête Cache-Control renvoyé');
});
