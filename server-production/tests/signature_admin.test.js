// Tests purs de la signature de l'administrateur, carte 96,
// 8 nov. 2026 : aucun serveur, aucune base, aucune donnée
// réelle. Lancer depuis server-production :
//   node --test tests/signature_admin.test.js
// La limite est de 200 Ko décodés : un PNG de signature
// dessiné au doigt pèse quelques Ko, rarement plus de 30 Ko.
import test from 'node:test';
import assert from 'node:assert/strict';
import { LIMITE_SIGNATURE_OCTETS, decoderSignaturePng, validerSignatureAdmin, normaliserMatriculeSignature } from '../src/signature_admin.js';
import { attestationHtml, insererSignatureAttestationServeur, ligneVideAttestationServeur } from '../src/attestation.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dossier = path.dirname(fileURLToPath(import.meta.url));
const gabarit = fs.readFileSync(path.join(dossier, '..', 'src', 'attestation.html'), 'utf8');

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

test('la signature du signataire remplace la ligne vide du gabarit, sans signature la ligne reste', () => {
  assert.ok(gabarit.includes(ligneVideAttestationServeur), 'ligne vide du gabarit');
  const a = { type: 'benevolat', membre_nom: 'Membre Test', matricule: 'CP-AA-9999', etablissement: null, activite: 'Retraite', role_service: null, date_debut: null, date_fin: null, delivre_le: '2026-11-05', reference: 'ATT-2026-0002' };
  const signe = attestationHtml(a, gabarit, dataUrl);
  assert.ok(!signe.includes(ligneVideAttestationServeur), 'ligne vide remplacée');
  assert.ok(signe.includes(`<img src="${dataUrl}"`), 'image de la signature');
  assert.ok(!signe.includes('{{'), 'aucun jeton restant');
  const sans = attestationHtml(a, gabarit, null);
  assert.ok(sans.includes(ligneVideAttestationServeur), 'ligne vide gardée sans signature');
  assert.ok(insererSignatureAttestationServeur('sans ligne', dataUrl).includes('sans ligne'), 'sans ligne, HTML inchangé');
  assert.equal(insererSignatureAttestationServeur(gabarit, ''), gabarit, 'signature vide, gabarit inchangé');
});
