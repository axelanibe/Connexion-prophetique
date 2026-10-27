// Tests des règles Wave, sans base de données ni serveur.
// Lancer : node --test tests/
// Node 20 et plus, sans dépendance supplémentaire.
import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { waveUrl, verifyWaveSignature, hasDuplicatePendingAmount } from '../src/wave.js';

const BASE = 'https://pay.wave.com/m/test/c/ci/';

test('lien Wave : montant exact, entier, en FCFA', () => {
  const url = waveUrl(BASE, 10000);
  assert.equal(url, 'https://pay.wave.com/m/test/c/ci/?amount=10000');
});

test('lien Wave : null si le lien de base est vide', () => {
  assert.equal(waveUrl('', 10000), null);
});

test('signature webhook : valide avec la bonne signature', () => {
  const secret = 'secret-de-test';
  const raw = '{"id":"ev_1","type":"merchant.payment_received"}';
  const t = String(Math.floor(Date.now() / 1000));
  const sig = crypto.createHmac('sha256', secret).update(t + raw).digest('hex');
  assert.equal(verifyWaveSignature(`t=${t},v1=${sig}`, raw, secret), true);
});

test('signature webhook : refusée si le corps change', () => {
  const secret = 'secret-de-test';
  const raw = '{"id":"ev_1"}';
  const t = String(Math.floor(Date.now() / 1000));
  const sig = crypto.createHmac('sha256', secret).update(t + raw).digest('hex');
  assert.equal(verifyWaveSignature(`t=${t},v1=${sig}`, '{"id":"ev_2"}', secret), false);
});

test('signature webhook : refusée après 5 minutes', () => {
  const secret = 'secret-de-test';
  const raw = '{"id":"ev_1"}';
  const t = String(Math.floor(Date.now() / 1000) - 400);
  const sig = crypto.createHmac('sha256', secret).update(t + raw).digest('hex');
  assert.equal(verifyWaveSignature(`t=${t},v1=${sig}`, raw, secret), false);
});

test('doublon de montant : vrai seulement si le montant apparaît plus d\'une fois', () => {
  assert.equal(hasDuplicatePendingAmount([5000, 10000, 10000], 10000), true);
  assert.equal(hasDuplicatePendingAmount([5000, 10000], 10000), false);
});
