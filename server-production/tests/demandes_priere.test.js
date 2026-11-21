// Tests des demandes de prière avec suivi, 21 nov. 2026,
// tranches 1 à 3 de l'audit du 17 nov.
//
// Partie pure seulement : elle teste les aides de
// src/demandes_priere.js sans serveur ni base, et tourne ici.
// La partie intégration (routes contre une base de test) n'est
// pas écrite : elle exigerait TEST_DATABASE_URL, comme pour la
// chaîne de prière.
//
// Lancer :  npm test   (depuis server-production)
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  STATUTS_DEMANDE_PRIERE,
  statutDemandePriereValide,
  validerDemandePriere,
  validerSuiviDemandePriere,
  formaterDemandePriere,
} from '../src/demandes_priere.js';

test('statuts : ouvert, en cours, exaucée, dans cet ordre', () => {
  assert.deepEqual(STATUTS_DEMANDE_PRIERE, ['ouvert', 'en cours', 'exaucée']);
  assert.equal(statutDemandePriereValide('ouvert'), true);
  assert.equal(statutDemandePriereValide('exaucée'), true);
  assert.equal(statutDemandePriereValide('fermée'), false);
  assert.equal(statutDemandePriereValide(''), false);
});

test('validerDemandePriere : texte obligatoire, longueur bornée', () => {
  assert.equal(validerDemandePriere({ texte: '' }).statut, 400);
  assert.equal(validerDemandePriere({ texte: '   ' }).statut, 400);
  assert.equal(validerDemandePriere({ texte: 'Priez pour moi.' }), null);
  assert.equal(validerDemandePriere({ texte: 'x'.repeat(2001) }).statut, 400);
});

test('validerSuiviDemandePriere : statut parmi les trois, note facultative', () => {
  assert.equal(validerSuiviDemandePriere({ statut: 'en cours' }), null);
  assert.equal(validerSuiviDemandePriere({ statut: 'exaucée', note_suivi: 'Gloire à Dieu.' }), null);
  assert.equal(validerSuiviDemandePriere({ statut: 'fermée' }).statut, 400);
  assert.equal(validerSuiviDemandePriere({}).statut, 400);
  assert.equal(validerSuiviDemandePriere({ statut: 'ouvert', note_suivi: 'x'.repeat(1001) }).statut, 400);
});

test('formaterDemandePriere : statut et note, prénom seulement quand il est joint', () => {
  const forme = formaterDemandePriere({
    id: 'd1',
    texte: 'Priez pour moi.',
    statut: 'en cours',
    note_suivi: 'Nous prions.',
    cree_le: new Date('2026-11-21T08:00:00.000Z'),
    modifie_le: new Date('2026-11-21T09:00:00.000Z'),
  });
  assert.equal(forme.statut, 'en cours');
  assert.equal(forme.note_suivi, 'Nous prions.');
  assert.equal('prenom' in forme, false);
  const bureau = formaterDemandePriere({
    id: 'd1', texte: 'Priez pour moi.', statut: 'ouvert', cree_le: '', modifie_le: '', prenom: 'Marie',
  });
  assert.equal(bureau.prenom, 'Marie');
});
