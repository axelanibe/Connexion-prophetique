// Tests du Carnet de Promesses, 21 nov. 2026, tranches 1 à
// 3 de l'audit du 17 nov.
//
// Partie pure seulement : elle teste les aides de
// src/promesses.js sans serveur ni base, et tourne ici. La
// partie intégration (routes contre une base de test) n'est pas
// écrite : elle exigerait TEST_DATABASE_URL, comme pour la
// chaîne de prière.
//
// Lancer :  npm test   (depuis server-production)
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  validerPromesse,
  formaterPromesse,
} from '../src/promesses.js';

test('validerPromesse : référence obligatoire, longueurs bornées', () => {
  assert.equal(validerPromesse({ reference: '' }).statut, 400);
  assert.equal(validerPromesse({ reference: '   ' }).statut, 400);
  assert.equal(validerPromesse({ reference: 'Jean 3:16' }), null);
  assert.equal(validerPromesse({ reference: 'Jean 3:16', note: 'Pour ma famille' }), null);
  assert.equal(validerPromesse({ reference: 'x'.repeat(121) }).statut, 400);
  assert.equal(validerPromesse({ reference: 'Jean 3:16', note: 'x'.repeat(1001) }).statut, 400);
  assert.equal(validerPromesse({ reference: 'Jean 3:16', texte: 'x'.repeat(2001) }).statut, 400);
});

test('formaterPromesse : renvoie la promesse telle quelle, sans membre', () => {
  const forme = formaterPromesse({
    id: 'p1',
    reference: 'Jean 3:16',
    note: 'Pour ma famille',
    texte: '',
    cree_le: new Date('2026-11-21T08:00:00.000Z'),
  });
  assert.equal(forme.id, 'p1');
  assert.equal(forme.reference, 'Jean 3:16');
  assert.equal(forme.note, 'Pour ma famille');
  assert.equal(forme.cree_le, '2026-11-21T08:00:00.000Z');
  assert.equal('membre_id' in forme, false);
});
