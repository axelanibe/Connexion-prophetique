// Tests des réactions « Amen », 21 nov. 2026, tranche 6 de
// l'audit du 17 nov.
//
// Partie pure seulement : elle teste les aides de src/amens.js
// sans serveur ni base, et tourne ici. La partie intégration
// (routes contre une base de test) n'est pas écrite : elle
// exigerait TEST_DATABASE_URL, comme pour la chaîne de prière.
// Les routes sont vérifiées par le contrôle de démarrage et
// par la présence des routes et de la migration dans server.js,
// ci-dessous.
//
// Lancer :  npm test   (depuis server-production)
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  CIBLES_AMEN,
  referenceMeditationValide,
  identifiantEnseignementValide,
  cibleAmenValide,
  validerAmen,
  formaterCompteAmen,
} from '../src/amens.js';

const dossier = path.dirname(fileURLToPath(import.meta.url));
const serveur = fs.readFileSync(path.join(dossier, '..', 'server.js'), 'utf8');

// ── Constantes ───────────────────────────────────────────────
test('constantes : deux cibles, méditation et enseignement', () => {
  assert.deepEqual(CIBLES_AMEN, ['méditation', 'enseignement']);
});

// ── Référence de méditation ──────────────────────────────────
test('referenceMeditationValide : livre:chapitre:verset seulement', () => {
  assert.equal(referenceMeditationValide('18:23:1'), true);
  assert.equal(referenceMeditationValide('0:1:1'), true);
  assert.equal(referenceMeditationValide('65:22:21'), true);
  assert.equal(referenceMeditationValide('66:1:1'), false);
  assert.equal(referenceMeditationValide('18:0:1'), false);
  assert.equal(referenceMeditationValide('18:23:0'), false);
  assert.equal(referenceMeditationValide('18:23'), false);
  assert.equal(referenceMeditationValide('18:23:1:2'), false);
  assert.equal(referenceMeditationValide('Psaume 23'), false);
  assert.equal(referenceMeditationValide(''), false);
  assert.equal(referenceMeditationValide(null), false);
});

// ── Identifiant d'enseignement ───────────────────────────────
test('identifiantEnseignementValide : uuid serveur seulement', () => {
  assert.equal(identifiantEnseignementValide('123e4567-e89b-12d3-a456-426614174000'), true);
  assert.equal(identifiantEnseignementValide('local-titre'), false);
  assert.equal(identifiantEnseignementValide(''), false);
  assert.equal(identifiantEnseignementValide(null), false);
});

// ── Cible valide ─────────────────────────────────────────────
test('cibleAmenValide : le format suit le type', () => {
  assert.equal(cibleAmenValide('méditation', '18:23:1'), true);
  assert.equal(cibleAmenValide('méditation', '123e4567-e89b-12d3-a456-426614174000'), false);
  assert.equal(cibleAmenValide('enseignement', '123e4567-e89b-12d3-a456-426614174000'), true);
  assert.equal(cibleAmenValide('enseignement', '18:23:1'), false);
  assert.equal(cibleAmenValide('autre', '18:23:1'), false);
});

// ── Validation ───────────────────────────────────────────────
test('validerAmen : type et cible obligatoires et valides', () => {
  assert.equal(validerAmen({ cible_type: 'méditation', cible_id: '18:23:1' }), null);
  assert.equal(validerAmen({ cible_type: 'enseignement', cible_id: '123e4567-e89b-12d3-a456-426614174000' }), null);
  assert.equal(validerAmen({ cible_type: 'autre', cible_id: '18:23:1' }).statut, 400);
  assert.equal(validerAmen({ cible_type: 'méditation', cible_id: '' }).statut, 400);
  assert.equal(validerAmen({ cible_type: 'méditation', cible_id: '66:1:1' }).statut, 400);
  assert.equal(validerAmen({ cible_type: 'enseignement', cible_id: 'pas-un-uuid' }).statut, 400);
  assert.equal(validerAmen({}).statut, 400);
});

// ── Formatage ────────────────────────────────────────────────
test('formaterCompteAmen : nombre et mon Amen', () => {
  assert.deepEqual(
    formaterCompteAmen({ cible_type: 'méditation', cible_id: '18:23:1', nombre: '12', a_dit_amen: true }),
    { cible_type: 'méditation', cible_id: '18:23:1', nombre: 12, a_dit_amen: true },
  );
  assert.deepEqual(
    formaterCompteAmen({ cible_type: 'enseignement', cible_id: 'x', nombre: 0, a_dit_amen: false }),
    { cible_type: 'enseignement', cible_id: 'x', nombre: 0, a_dit_amen: false },
  );
});

// ── Routes et migration dans server.js ───────────────────────
test('server.js : routes POST, GET et DELETE /amens, migration amens', () => {
  assert.ok(serveur.includes("app.get('/amens'"), 'GET /amens manquant');
  assert.ok(serveur.includes("app.get('/amens/comptes'"), 'GET /amens/comptes manquant');
  assert.ok(serveur.includes("app.post('/amens'"), 'POST /amens manquant');
  assert.ok(serveur.includes("app.delete('/amens/:cibleType/:cibleId'"), 'DELETE /amens manquant');
  assert.ok(serveur.includes('CREATE TABLE IF NOT EXISTS amens'), 'migration amens manquante');
  assert.ok(serveur.includes('uq_amens_membre_cible'), 'unicité membre et cible manquante');
  assert.ok(serveur.includes("preHandler: membreG }, async (req) => {\n  const cibleType = req.query.cible_type;"), 'garde membreG de GET /amens manquante');
});
