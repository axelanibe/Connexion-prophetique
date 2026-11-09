// Tests de la logique de mise en page et de validation (sans pdfkit).
// Lancer : node --test tests/mise_en_page.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { dateFr, normaliserDate, tailleNomAjustee, validerDonnees, TAILLE_NOM_MAX, TAILLE_NOM_MIN } from '../src/mise_en_page.js';

const bon = {
  numero: 'CERT-000001', matricule: 'CP-AB-0001', nom_complet: '  Marie-Claire Kouassi ',
  url: 'https://api.example.org/certificats/verification/CERT-000001?x=1',
  inscrit_le: '2026-10-01', valide_jusqua: '2027-10-01',
};

test('date française lisible, sans décalage de jour', () => {
  assert.equal(dateFr('2026-10-01'), '1 octobre 2026');
  assert.equal(dateFr('2027-01-31'), '31 janvier 2027');
});

test('date saisie à minuit local reste le bon jour', () => {
  assert.equal(dateFr(new Date(2026, 10, 9)), '9 novembre 2026');
});

test('date invalide refusée', () => {
  assert.throws(() => normaliserDate('pas-une-date'), { code: 'CERTIFICAT_DONNEES_INVALIDES' });
});

test('taille du nom : maximum si court, réduite si long, plancher respecté', () => {
  const mesure = (texte, t) => texte.length * t * 0.6;
  assert.equal(tailleNomAjustee('Ali', 620, mesure), TAILLE_NOM_MAX);
  const longue = 'A'.repeat(60);
  const t = tailleNomAjustee(longue, 620, mesure);
  assert.ok(t < TAILLE_NOM_MAX && t >= TAILLE_NOM_MIN);
  assert.ok(mesure(longue, t) <= 620);
  assert.equal(tailleNomAjustee('A'.repeat(500), 620, mesure), TAILLE_NOM_MIN);
});

test('validation : données correctes normalisées', () => {
  const d = validerDonnees(bon);
  assert.equal(d.nom_complet, 'Marie-Claire Kouassi');
  assert.ok(d.inscrit_le instanceof Date);
});

test('validation : numéro, matricule, URL, dates et nom refusés', () => {
  const cas = [
    { ...bon, numero: 'CERT-12' },
    { ...bon, matricule: 'XX' },
    { ...bon, url: 'javascript:alert(1)' },
    { ...bon, valide_jusqua: '2025-01-01' },
    { ...bon, nom_complet: 'A' },
    { ...bon, nom_complet: 'N'.repeat(121) },
    null,
  ];
  for (const c of cas) {
    assert.throws(() => validerDonnees(c), { code: 'CERTIFICAT_DONNEES_INVALIDES' });
  }
});
