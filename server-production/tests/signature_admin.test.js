// Tests purs de la signature de l'administrateur, carte 96,
// 8 nov. 2026 : aucun serveur, aucune base, aucune donnée
// réelle. Lancer depuis server-production :
//   node --test tests/signature_admin.test.js
// La limite est de 200 Ko décodés : un PNG de signature
// dessiné au doigt pèse quelques Ko, rarement plus de 30 Ko.
import test from 'node:test';
import assert from 'node:assert/strict';
import { LIMITE_SIGNATURE_OCTETS, decoderSignaturePng, validerSignatureAdmin, normaliserMatriculeSignature } from '../src/signature_admin.js';
import { decoderSignatureAttestation } from '../src/generer_attestation_pdf.js';

// PNG minimal valide, 1 x 1, signature PNG en tête.
const png1x1 = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
const dataUrl = `data:image/png;base64,${png1x1.toString('base64')}`;

test('la limite est de 200 Ko décodés', () => {
  assert.equal(LIMITE_SIGNATURE_OCTETS, 200 * 1024);
});

test('un PNG valide passe, pour un administrateur général comme d’établissement', () => {
  assert.equal(validerSignatureAdmin({ signature: dataUrl, role: 'admin_general' }), null);
  assert.equal(validerSignatureAdmin({ signature: dataUrl, role: 'admin_etablissement' }), null);
  assert.equal(decoderSignaturePng(dataUrl)?.length, png1x1.length);
});

test('un membre ne peut pas enregistrer de signature', () => {
  const refus = validerSignatureAdmin({ signature: dataUrl, role: 'membre' });
  assert.equal(refus?.statut, 403);
});

test('une image JPEG, un texte et une chaîne vide sont refusés en 400', () => {
  const jpeg = `data:image/jpeg;base64,${Buffer.from([0xff, 0xd8, 0xff]).toString('base64')}`;
  assert.equal(validerSignatureAdmin({ signature: jpeg, role: 'admin_general' })?.statut, 400);
  assert.equal(validerSignatureAdmin({ signature: 'bonjour', role: 'admin_general' })?.statut, 400);
  assert.equal(validerSignatureAdmin({ signature: '', role: 'admin_general' })?.statut, 400);
  assert.equal(validerSignatureAdmin({ role: 'admin_general' })?.statut, 400);
});

test('un PNG de plus de 200 Ko est refusé en 413, un faux PNG en 415', () => {
  const gros = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(LIMITE_SIGNATURE_OCTETS, 0)]);
  assert.equal(validerSignatureAdmin({ signature: `data:image/png;base64,${gros.toString('base64')}`, role: 'admin_general' })?.statut, 413);
  const faux = `data:image/png;base64,${Buffer.from('ceci n’est pas un PNG').toString('base64')}`;
  assert.equal(validerSignatureAdmin({ signature: faux, role: 'admin_general' })?.statut, 415);
  assert.equal(decoderSignaturePng(faux), null);
});

test('le matricule du signataire est normalisé, une forme libre est refusée', () => {
  assert.equal(normaliserMatriculeSignature('cp-aa-2526'), 'CP-AA-2526');
  assert.equal(normaliserMatriculeSignature('CP-AA-2526'), 'CP-AA-2526');
  assert.equal(normaliserMatriculeSignature('CP-AA-252'), null);
  assert.equal(normaliserMatriculeSignature('../../etc'), null);
  assert.equal(normaliserMatriculeSignature(null), null);
});

test('la signature du signataire est décodée pour le PDF, sans signature la ligne vide reste', () => {
  // Carte 120, 9 nov. 2026 : le HTML disparaît, la signature est
  // posée dans le PDF par genererAttestationPdf, qui décode avec
  // decoderSignatureAttestation et garde la ligne vide quand la
  // signature est absente ou illisible, sans jamais bloquer.
  assert.equal(decoderSignatureAttestation(dataUrl)?.length, png1x1.length);
  assert.equal(decoderSignatureAttestation(png1x1)?.length, png1x1.length);
  assert.equal(decoderSignatureAttestation(null), null);
  assert.equal(decoderSignatureAttestation(''), null);
  assert.equal(decoderSignatureAttestation('ceci n’est pas un PNG'), null);
  assert.equal(decoderSignatureAttestation(Buffer.from('ceci n’est pas un PNG')), null);
});
