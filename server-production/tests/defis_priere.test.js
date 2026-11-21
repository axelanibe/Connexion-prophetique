// Tests des défis de prière de 7 jours, 21 nov. 2026,
// tranches 1 à 3 de l'audit du 17 nov.
//
// Partie pure seulement : elle teste les aides de
// src/defis_priere.js sans serveur ni base, et tourne ici. La
// partie intégration (routes contre une base de test) n'est pas
// écrite : elle exigerait TEST_DATABASE_URL, comme pour la
// chaîne de prière. Les routes sont vérifiées par le contrôle
// de démarrage et par l'exercice réel contre le serveur en
// ligne, comme pour les autres tranches serveur.
//
// Lancer :  npm test   (depuis server-production)
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  NB_JOURS_DEFI,
  JOUR_MIN,
  JOUR_MAX,
  jourDefiValide,
  normaliserJourDefi,
  dateDefiValide,
  dateFinDefi,
  jourCourantDefi,
  validerDefi,
  validerJourDefi,
  joursValidesUniques,
  compterJoursValides,
  formaterDefiPublic,
} from '../src/defis_priere.js';

// ── Constantes ───────────────────────────────────────────────
test('constantes : 7 jours, jours 1 à 7', () => {
  assert.equal(NB_JOURS_DEFI, 7);
  assert.equal(JOUR_MIN, 1);
  assert.equal(JOUR_MAX, 7);
});

// ── Jour valide ──────────────────────────────────────────────
test('jourDefiValide : entiers 1 à 7 seulement', () => {
  assert.equal(jourDefiValide(1), true);
  assert.equal(jourDefiValide(7), true);
  assert.equal(jourDefiValide(0), false);
  assert.equal(jourDefiValide(8), false);
  assert.equal(jourDefiValide(3.5), false);
  assert.equal(jourDefiValide('3'), false);
  assert.equal(jourDefiValide(null), false);
});

// ── Normalisation ────────────────────────────────────────────
test('normaliserJourDefi : chaîne de chiffres acceptée', () => {
  assert.equal(normaliserJourDefi('3'), 3);
  assert.equal(normaliserJourDefi(5), 5);
  assert.equal(normaliserJourDefi('x'), null);
  assert.equal(normaliserJourDefi(''), null);
  assert.equal(normaliserJourDefi(null), null);
});

// ── Dates ────────────────────────────────────────────────────
test('dateDefiValide : AAAA-MM-JJ réelle seulement', () => {
  assert.equal(dateDefiValide('2026-11-21'), true);
  assert.equal(dateDefiValide('2026-02-30'), false);
  assert.equal(dateDefiValide('21/11/2026'), false);
  assert.equal(dateDefiValide(''), false);
  assert.equal(dateDefiValide(null), false);
});

test('dateFinDefi : 6 jours après le début', () => {
  assert.equal(dateFinDefi('2026-11-21'), '2026-11-27');
  assert.equal(dateFinDefi('2026-11-28'), '2026-12-04');
});

test('jourCourantDefi : 1 le jour du début, 7 le dernier, null hors fenêtre', () => {
  assert.equal(jourCourantDefi('2026-11-21', '2026-11-21'), 1);
  assert.equal(jourCourantDefi('2026-11-21', '2026-11-24'), 4);
  assert.equal(jourCourantDefi('2026-11-21', '2026-11-27'), 7);
  assert.equal(jourCourantDefi('2026-11-21', '2026-11-20'), null);
  assert.equal(jourCourantDefi('2026-11-21', '2026-11-28'), null);
});

// ── Validation du défi ───────────────────────────────────────
test('validerDefi : titre obligatoire, date réelle, fenêtre passée refusée', () => {
  assert.equal(validerDefi({ titre: '', date_debut: '2026-11-21' }, '2026-11-21').statut, 400);
  assert.equal(validerDefi({ titre: 'Prier', date_debut: '21/11/2026' }, '2026-11-21').statut, 400);
  assert.equal(validerDefi({ titre: 'Prier', date_debut: '2026-11-10' }, '2026-11-21').statut, 400);
  assert.equal(validerDefi({ titre: 'Prier', date_debut: '2026-11-21' }, '2026-11-21'), null);
  assert.equal(validerDefi({ titre: 'Prier', date_debut: '2026-11-15' }, '2026-11-21'), null);
  assert.equal(validerDefi({ titre: 'Prier', date_debut: '2026-11-25' }, '2026-11-21'), null);
  assert.equal(validerDefi({ titre: 'x'.repeat(121), date_debut: '2026-11-21' }, '2026-11-21').statut, 400);
});

test('validerJourDefi : jour 1 à 7 seulement', () => {
  assert.equal(validerJourDefi({ jour: 0 }).statut, 400);
  assert.equal(validerJourDefi({ jour: 8 }).statut, 400);
  assert.equal(validerJourDefi({ jour: 'x' }).statut, 400);
  assert.equal(validerJourDefi({ jour: 4 }), null);
});

// ── Jours validés ────────────────────────────────────────────
test('joursValidesUniques : déduplique, trie, ignore les hors limites', () => {
  assert.deepEqual(joursValidesUniques([3, 1, 3, 9, 0, 2]), [1, 2, 3]);
  assert.deepEqual(joursValidesUniques(null), []);
  assert.equal(compterJoursValides([1, 2, 2]), 2);
});

// ── Forme publique ───────────────────────────────────────────
test('formaterDefiPublic : dates, participants, progression x/7', () => {
  const forme = formaterDefiPublic(
    { id: 'd1', titre: 'Prier', description: '', date_debut: '2026-11-21', participants: '3' },
    [1, 2],
  );
  assert.equal(forme.date_debut, '2026-11-21');
  assert.equal(forme.date_fin, '2026-11-27');
  assert.equal(forme.participants, 3);
  assert.equal(forme.inscrit, true);
  assert.equal(forme.progression, 2);
  const libre = formaterDefiPublic({ id: 'd2', titre: 'Prier', date_debut: '2026-11-21', participants: 0 }, null);
  assert.equal(libre.inscrit, false);
  assert.equal(libre.progression, null);
});
