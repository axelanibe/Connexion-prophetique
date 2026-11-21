// Tests de l'entraide entre membres, 21 nov. 2026, tranche
// 7 de l'audit du 17 nov.
//
// Partie pure seulement : elle teste les aides de
// src/entraide.js sans serveur ni base, et tourne ici. La
// partie intégration (routes contre une base de test) n'est
// pas écrite : elle exigerait TEST_DATABASE_URL, comme pour la
// chaîne de prière. Les routes sont vérifiées par le contrôle
// de démarrage et par la présence des routes et de la
// migration dans server.js, ci-dessous.
//
// Lancer :  npm test   (depuis server-production)
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  TYPES_ENTRAIDE,
  STATUTS_ENTRAIDE,
  validerEntraide,
  validerStatutEntraide,
  formaterEntraide,
} from '../src/entraide.js';

const dossier = path.dirname(fileURLToPath(import.meta.url));
const serveur = fs.readFileSync(path.join(dossier, '..', 'server.js'), 'utf8');

// ── Constantes ───────────────────────────────────────────────
test('constantes : offre et demande, trois statuts', () => {
  assert.deepEqual(TYPES_ENTRAIDE, ['offre', 'demande']);
  assert.deepEqual(STATUTS_ENTRAIDE, ['ouverte', 'en cours', 'résolue']);
});

// ── Validation ───────────────────────────────────────────────
test('validerEntraide : type, catégorie et titre obligatoires', () => {
  assert.equal(validerEntraide({ type: 'offre', categorie: 'Transport', titre: 'Covoiturage', description: '' }), null);
  assert.equal(validerEntraide({ type: 'demande', categorie: 'Cours', titre: 'Aide', description: null }), null);
  assert.equal(validerEntraide({ type: 'autre', categorie: 'Cours', titre: 'Aide' }).statut, 400);
  assert.equal(validerEntraide({ type: 'offre', categorie: '', titre: 'Aide' }).statut, 400);
  assert.equal(validerEntraide({ type: 'offre', categorie: '   ', titre: 'Aide' }).statut, 400);
  assert.equal(validerEntraide({ type: 'offre', categorie: 'Cours', titre: '' }).statut, 400);
  assert.equal(validerEntraide({ type: 'offre', categorie: 'Cours', titre: 'Aide', description: 12 }).statut, 400);
  assert.equal(validerEntraide({ type: 'offre', categorie: 'x'.repeat(81), titre: 'Aide' }).statut, 400);
  assert.equal(validerEntraide({ type: 'offre', categorie: 'Cours', titre: 'x'.repeat(201) }).statut, 400);
  assert.equal(validerEntraide({}).statut, 400);
});

test('validerStatutEntraide : trois statuts seulement', () => {
  assert.equal(validerStatutEntraide({ statut: 'ouverte' }), null);
  assert.equal(validerStatutEntraide({ statut: 'en cours' }), null);
  assert.equal(validerStatutEntraide({ statut: 'résolue' }), null);
  assert.equal(validerStatutEntraide({ statut: 'fermée' }).statut, 400);
  assert.equal(validerStatutEntraide({}).statut, 400);
});

// ── Formatage ────────────────────────────────────────────────
test('formaterEntraide : auteur, statut et est_auteur', () => {
  const ligne = {
    id: 'e1',
    membre_id: 'm1',
    type: 'offre',
    categorie: 'Transport',
    titre: 'Covoiturage',
    description: 'Deux places.',
    statut: 'ouverte',
    auteur_nom: 'Jean',
    cree_le: new Date('2026-11-21T10:00:00Z'),
    modifie_le: new Date('2026-11-21T10:00:00Z'),
  };
  const moi = formaterEntraide(ligne, 'm1');
  assert.equal(moi.auteur_id, 'm1');
  assert.equal(moi.auteur_nom, 'Jean');
  assert.equal(moi.est_auteur, true);
  assert.equal(moi.cree_le, '2026-11-21T10:00:00.000Z');
  const autre = formaterEntraide(ligne, 'm2');
  assert.equal(autre.est_auteur, false);
  const sansMembre = formaterEntraide(ligne, null);
  assert.equal(sansMembre.est_auteur, false);
});

// ── Routes et migration dans server.js ───────────────────────
test('server.js : routes GET, POST et PATCH /entraide, migration entraide', () => {
  assert.ok(serveur.includes("app.get('/entraide'"), 'GET /entraide manquant');
  assert.ok(serveur.includes("app.post('/entraide'"), 'POST /entraide manquant');
  assert.ok(serveur.includes("app.patch('/entraide/:id'"), 'PATCH /entraide manquant');
  assert.ok(serveur.includes('CREATE TABLE IF NOT EXISTS entraide'), 'migration entraide manquante');
  assert.ok(serveur.includes('Seul l’auteur marque sa publication résolue.'), 'garde auteur du PATCH manquante');
});
