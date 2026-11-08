// Tests de la carte 93, 8 nov. 2026 : devenir partenaire.
// Le serveur refusait « Plateforme » dans FONCTIONS_MEMBRE,
// alors que l'application la proposait depuis la carte 83 :
// l'inscription en Plateforme et POST /moi/fonction tombaient
// en 400. Ce test garde la liste alignée sur l'application.
// Il lit server.js en texte, sans démarrer le serveur, car
// server.js écoute dès son import et n'exporte pas la liste.
// Lancer depuis server-production :
//   node --test tests/devenir_partenaire_93.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ici = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(ici, '..', 'server.js'), 'utf8');

test('FONCTIONS_MEMBRE accepte Plateforme, en tête comme dans l’application', () => {
  const m = source.match(/const FONCTIONS_MEMBRE = \[([^\]]+)\]/);
  assert.ok(m, 'FONCTIONS_MEMBRE introuvable dans server.js');
  const liste = m[1].split(',').map((s) => s.trim().replace(/^'|'$/g, ''));
  assert.equal(liste[0], 'Plateforme');
  assert.ok(liste.includes('Membre'));
  assert.ok(liste.includes('Aucun'));
});

test('la route /moi/fonction et l’inscription partagent la même liste', () => {
  assert.ok(source.includes("if (typeof fonction !== 'string' || !FONCTIONS_MEMBRE.includes(fonction))"));
  assert.ok(source.includes('fonction: z.enum(FONCTIONS_MEMBRE).optional()'));
});
