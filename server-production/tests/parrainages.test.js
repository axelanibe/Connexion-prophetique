// Tests du parrainage jusqu'au baptême, 21 nov. 2026,
// tranches 4 et 5 de l'audit du 17 nov.
//
// Partie pure seulement : elle teste les aides de
// src/parrainages.js sans serveur ni base, et tourne ici. La
// partie intégration (routes contre une base de test) n'est pas
// écrite : elle exigerait TEST_DATABASE_URL, comme pour la
// chaîne de prière et les défis. Les routes sont vérifiées par
// le contrôle de démarrage et par l'exercice réel contre le
// serveur en ligne, comme pour les autres tranches serveur.
//
// Lancer :  npm test   (depuis server-production)
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  STATUTS_PARRAINAGE,
  uuidValide,
  dateParrainageValide,
  validerParrainage,
  validerBapteme,
  formaterParrainage,
} from '../src/parrainages.js';

const UUID_A = '11111111-1111-4111-8111-111111111111';
const UUID_B = '22222222-2222-4222-8222-222222222222';

// ── Constantes ───────────────────────────────────────────────
test('constantes : statuts en cours puis baptisé', () => {
  assert.deepEqual(STATUTS_PARRAINAGE, ['en cours', 'baptisé']);
});

// ── UUID ─────────────────────────────────────────────────────
test('uuidValide : UUID seulement, jamais un nom ni une chaîne vide', () => {
  assert.equal(uuidValide(UUID_A), true);
  assert.equal(uuidValide(''), false);
  assert.equal(uuidValide('Jean'), false);
  assert.equal(uuidValide(null), false);
  assert.equal(uuidValide('11111111-1111-4111-8111'), false);
});

// ── Date ─────────────────────────────────────────────────────
test('dateParrainageValide : date réelle AAAA-MM-JJ seulement', () => {
  assert.equal(dateParrainageValide('2026-11-21'), true);
  assert.equal(dateParrainageValide('2026-02-30'), false);
  assert.equal(dateParrainageValide('21/11/2026'), false);
  assert.equal(dateParrainageValide(''), false);
});

// ── Désignation ──────────────────────────────────────────────
test('validerParrainage : deux membres distincts, par identifiant', () => {
  assert.equal(validerParrainage({ parrain_id: UUID_A, filleul_id: UUID_B }), null);
  assert.equal(validerParrainage({ parrain_id: '', filleul_id: UUID_B }).statut, 400);
  assert.equal(validerParrainage({ parrain_id: UUID_A, filleul_id: '' }).statut, 400);
  assert.equal(validerParrainage({ parrain_id: UUID_A, filleul_id: UUID_A }).statut, 400);
});

// ── Baptême ──────────────────────────────────────────────────
test('validerBapteme : date réelle, jamais dans le futur', () => {
  assert.equal(validerBapteme({ date_bapteme: '2026-11-21' }, '2026-11-21'), null);
  assert.equal(validerBapteme({ date_bapteme: '2026-11-20' }, '2026-11-21'), null);
  assert.equal(validerBapteme({ date_bapteme: '2026-11-22' }, '2026-11-21').statut, 400);
  assert.equal(validerBapteme({ date_bapteme: '21/11/2026' }, '2026-11-21').statut, 400);
  assert.equal(validerBapteme({}, '2026-11-21').statut, 400);
});

// ── Format ───────────────────────────────────────────────────
test('formaterParrainage : noms, dates et statut, baptême null tant que le suivi court', () => {
  const forme = formaterParrainage({
    id: 'p1', parrain_id: UUID_A, parrain_nom: 'MARIE DUPONT',
    filleul_id: UUID_B, filleul_nom: 'JEAN KOUASSI',
    date_debut: '2026-11-01', statut: 'en cours', date_bapteme: null,
  });
  assert.equal(forme.parrain_nom, 'MARIE DUPONT');
  assert.equal(forme.filleul_nom, 'JEAN KOUASSI');
  assert.equal(forme.date_debut, '2026-11-01');
  assert.equal(forme.statut, 'en cours');
  assert.equal(forme.date_bapteme, null);
});

test('formaterParrainage : date de baptême en AAAA-MM-JJ quand le parrainage est clos', () => {
  const forme = formaterParrainage({
    id: 'p1', parrain_id: UUID_A, parrain_nom: 'MARIE DUPONT',
    filleul_id: UUID_B, filleul_nom: 'JEAN KOUASSI',
    date_debut: '2026-11-01', statut: 'baptisé', date_bapteme: '2026-11-21',
  });
  assert.equal(forme.statut, 'baptisé');
  assert.equal(forme.date_bapteme, '2026-11-21');
});
