// Tests de la chaîne de prière en direct, 21 nov. 2026,
// tranche 1 : 24 créneaux d'une heure, un membre par créneau,
// un créneau par membre et par jour.
//
// Partie pure seulement : elle teste les aides de
// src/chaine_priere.js sans serveur ni base, et tourne ici. La
// partie intégration (routes contre une base de test) n'est pas
// écrite : elle exigerait TEST_DATABASE_URL, comme pour les
// stories et les témoignages. Les routes sont vérifiées par le
// contrôle de démarrage et par l'exercice réel contre le
// serveur en ligne, comme pour les autres tranches serveur.
//
// Lancer :  npm test   (depuis server-production)
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  NB_CRENEAUX,
  HEURE_MIN,
  HEURE_MAX,
  heureValide,
  normaliserHeure,
  validerEngagement,
  prenomDepuisNomComplet,
  formaterCreneauPublic,
  chaineComplete,
  compterCouverts,
} from '../src/chaine_priere.js';

// ── Constantes ───────────────────────────────────────────────
test('constantes : 24 créneaux, heures 0 à 23', () => {
  assert.equal(NB_CRENEAUX, 24);
  assert.equal(HEURE_MIN, 0);
  assert.equal(HEURE_MAX, 23);
});

// ── Heure valide ─────────────────────────────────────────────
test('heureValide : entiers 0 à 23 seulement', () => {
  assert.equal(heureValide(0), true);
  assert.equal(heureValide(23), true);
  assert.equal(heureValide(12), true);
  assert.equal(heureValide(-1), false);
  assert.equal(heureValide(24), false);
  assert.equal(heureValide(8.5), false);
  assert.equal(heureValide('8'), false);
  assert.equal(heureValide(null), false);
  assert.equal(heureValide(undefined), false);
  assert.equal(heureValide(NaN), false);
});

// ── Normalisation ────────────────────────────────────────────
test('normaliserHeure : entier ou chaîne de chiffres, null sinon', () => {
  assert.equal(normaliserHeure(8), 8);
  assert.equal(normaliserHeure(0), 0);
  assert.equal(normaliserHeure('8'), 8);
  assert.equal(normaliserHeure(' 8 '), 8);
  assert.equal(normaliserHeure('8.5'), null);
  assert.equal(normaliserHeure('huit'), null);
  assert.equal(normaliserHeure(''), null);
  assert.equal(normaliserHeure(null), null);
  assert.equal(normaliserHeure(8.5), null);
});

// ── Validation d'engagement ──────────────────────────────────
test('validerEngagement : null quand l heure est bonne, 400 sinon', () => {
  assert.equal(validerEngagement({ heure: 0 }), null);
  assert.equal(validerEngagement({ heure: 23 }), null);
  assert.equal(validerEngagement({ heure: '8' }), null);
  assert.deepEqual(
    validerEngagement({ heure: 24 }),
    { statut: 400, message: 'Créneau invalide : une heure de 0 à 23.' },
  );
  assert.deepEqual(
    validerEngagement({ heure: -1 }),
    { statut: 400, message: 'Créneau invalide : une heure de 0 à 23.' },
  );
  assert.deepEqual(
    validerEngagement({ heure: 'huit' }),
    { statut: 400, message: 'Créneau invalide : une heure de 0 à 23.' },
  );
  assert.deepEqual(
    validerEngagement({}),
    { statut: 400, message: 'Créneau invalide : une heure de 0 à 23.' },
  );
  assert.deepEqual(
    validerEngagement({ heure: 8.5 }),
    { statut: 400, message: 'Créneau invalide : une heure de 0 à 23.' },
  );
});

// ── Prénom ───────────────────────────────────────────────────
test('prenomDepuisNomComplet : premier mot, vide quand le nom est vide', () => {
  assert.equal(prenomDepuisNomComplet('ANIBE Axel'), 'ANIBE');
  assert.equal(prenomDepuisNomComplet('Marie'), 'Marie');
  assert.equal(prenomDepuisNomComplet('  Marie Koffi  '), 'Marie');
  assert.equal(prenomDepuisNomComplet(''), '');
  assert.equal(prenomDepuisNomComplet('   '), '');
  assert.equal(prenomDepuisNomComplet(null), '');
  assert.equal(prenomDepuisNomComplet(undefined), '');
});

// ── Forme publique ───────────────────────────────────────────
test('formaterCreneauPublic : heure, membre et prénom seulement', () => {
  assert.deepEqual(
    formaterCreneauPublic({ heure: 8, membre_id: 'm1', nom_complet: 'KOFFI Marie' }),
    { heure: 8, membre_id: 'm1', prenom: 'KOFFI' },
  );
  assert.deepEqual(
    formaterCreneauPublic({ heure: 3, membre_id: 'm2', nom_complet: '' }),
    { heure: 3, membre_id: 'm2', prenom: '' },
  );
  assert.deepEqual(
    formaterCreneauPublic({ heure: 5, membre_id: 'm3' }),
    { heure: 5, membre_id: 'm3', prenom: '' },
  );
  const public_ = formaterCreneauPublic({ heure: 8, membre_id: 'm1', nom_complet: 'KOFFI Marie' });
  assert.equal('nom_complet' in public_, false);
});

// ── Chaîne complète ──────────────────────────────────────────
test('chaineComplete : 24 créneaux dans l ordre, libres par défaut', () => {
  const chaine = chaineComplete([]);
  assert.equal(chaine.length, 24);
  assert.deepEqual(chaine[0], { heure: 0, membre_id: null, prenom: '' });
  assert.deepEqual(chaine[23], { heure: 23, membre_id: null, prenom: '' });
  for (let h = 0; h < 24; h += 1) assert.equal(chaine[h].heure, h);
});

test('chaineComplete : créneaux pris à leur place, le reste libre', () => {
  const chaine = chaineComplete([
    { heure: 8, membre_id: 'm1', nom_complet: 'KOFFI Marie' },
    { heure: 20, membre_id: 'm2', nom_complet: 'ANIBE Axel' },
  ]);
  assert.equal(chaine.length, 24);
  assert.deepEqual(chaine[8], { heure: 8, membre_id: 'm1', prenom: 'KOFFI' });
  assert.deepEqual(chaine[20], { heure: 20, membre_id: 'm2', prenom: 'ANIBE' });
  assert.deepEqual(chaine[9], { heure: 9, membre_id: null, prenom: '' });
  assert.deepEqual(chaine[0], { heure: 0, membre_id: null, prenom: '' });
});

test('chaineComplete : heures hors limites ignorées, doublon gardé une fois', () => {
  const chaine = chaineComplete([
    { heure: 24, membre_id: 'mx', nom_complet: 'Hors Limites' },
    { heure: -1, membre_id: 'my', nom_complet: 'Hors Limites' },
    { heure: 8, membre_id: 'm1', nom_complet: 'Premier' },
    { heure: 8, membre_id: 'm2', nom_complet: 'Second' },
  ]);
  assert.equal(chaine.length, 24);
  assert.deepEqual(chaine[8], { heure: 8, membre_id: 'm1', prenom: 'Premier' });
  assert.deepEqual(chaine[23], { heure: 23, membre_id: null, prenom: '' });
});

test('chaineComplete : liste nulle ou absente, chaîne vide', () => {
  assert.equal(chaineComplete(null).length, 24);
  assert.equal(chaineComplete(undefined).length, 24);
});

// ── Heures couvertes ─────────────────────────────────────────
test('compterCouverts : 0 vide, 2 avec deux prises', () => {
  assert.equal(compterCouverts([]), 0);
  assert.equal(compterCouverts(chaineComplete([])), 0);
  assert.equal(compterCouverts(chaineComplete([
    { heure: 8, membre_id: 'm1', nom_complet: 'KOFFI Marie' },
    { heure: 20, membre_id: 'm2', nom_complet: 'ANIBE Axel' },
  ])), 2);
  assert.equal(compterCouverts(null), 0);
});
