// Tests purs de la carte 101, 8 nov. 2026 : numéro Côte d'Ivoire
// avec le 0 et nom complet en deux mots. Aucun serveur, aucune
// base, aucune donnée réelle. Lancer depuis server-production :
//   node --test tests/telephone_nom_101.test.js
// La logique vit dans src/telephone_nom.js, importé par server.js
// pour l'inscription, l'import et la migration de démarrage.
import test from 'node:test';
import assert from 'node:assert/strict';
import { nomCompletDeuxMots, restaurerZeroIvoirien } from '../src/telephone_nom.js';

test('Carte 101, nom en deux mots : un seul mot est refusé', () => {
  assert.equal(nomCompletDeuxMots('Axel'), false);
  assert.equal(nomCompletDeuxMots('  Axel  '), false);
  assert.equal(nomCompletDeuxMots(''), false);
  assert.equal(nomCompletDeuxMots('   '), false);
});

test('Carte 101, nom en deux mots : prénom et nom passent', () => {
  assert.equal(nomCompletDeuxMots('Axel Anibe'), true);
  assert.equal(nomCompletDeuxMots('  Axel   Anibe  '), true);
  assert.equal(nomCompletDeuxMots('Marie Grace Emmanuel Aka'), true);
  assert.equal(nomCompletDeuxMots('Jean-Marc Kouassi'), true);
});

test('Carte 101, 0 ivoirien : le numéro stocké sans 0 est restauré', () => {
  assert.equal(restaurerZeroIvoirien('+225749369433'), '+2250749369433');
  assert.equal(restaurerZeroIvoirien('+225572345678'), '+2250572345678');
  assert.equal(restaurerZeroIvoirien('+225123456789'), '+2250123456789');
});

test('Carte 101, 0 ivoirien : le numéro déjà avec le 0 n’est pas touché', () => {
  assert.equal(restaurerZeroIvoirien('+2250749369433'), null);
  assert.equal(restaurerZeroIvoirien('+2250572345678'), null);
});

test('Carte 101, 0 ivoirien : autre pays et autre forme ne sont pas touchés', () => {
  assert.equal(restaurerZeroIvoirien('+14165551234'), null);
  assert.equal(restaurerZeroIvoirien('+33123456789'), null);
  assert.equal(restaurerZeroIvoirien('+22574936943'), null);
  assert.equal(restaurerZeroIvoirien('+2257493694330'), null);
  assert.equal(restaurerZeroIvoirien('+225249369433'), null);
  assert.equal(restaurerZeroIvoirien('0749369433'), null);
  assert.equal(restaurerZeroIvoirien(null), null);
  assert.equal(restaurerZeroIvoirien(''), null);
});
