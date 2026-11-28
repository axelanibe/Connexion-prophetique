// Tests du programme du camp et des cellules, 21 nov. 2026.
//
// Partie pure seulement : elle teste les aides de
// src/camp_planning.js sans serveur ni base, et tourne ici. La
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
  JOURS_SEMAINE,
  libelleJourSemaine,
  ROLES_CELLULE,
  roleCelluleValide,
  TYPES_CRENEAU_MODELE,
  heureValide,
  normaliserHeure,
  jourSemaineValide,
  MODELE_CHRONOGRAMME,
  appliquerModeleChronogramme,
  dimancheDeLaSemaine,
  lundiDeLaSemaine,
  validerEntreeChronogramme,
  validerCellule,
  validerAssignation,
  validerException,
  prochaineOccurrence,
  appliquerExceptionCellule,
} from '../src/camp_planning.js';

// ── Jours et rôles ───────────────────────────────────────────
test('jours : dimanche 0 à samedi 6, 5 rôles de cellule', () => {
  assert.equal(JOURS_SEMAINE.length, 7);
  assert.equal(JOURS_SEMAINE[0], 'Dimanche');
  assert.equal(JOURS_SEMAINE[6], 'Samedi');
  assert.equal(libelleJourSemaine(0), 'Dimanche');
  assert.equal(libelleJourSemaine(6), 'Samedi');
  assert.equal(libelleJourSemaine(7), '');
  assert.equal(libelleJourSemaine(-1), '');
  assert.deepEqual(ROLES_CELLULE, [
    'Dirigeant',
    'Louange',
    'Prédication',
    'Accueil',
    'Intercession',
  ]);
  assert.equal(roleCelluleValide('Dirigeant'), true);
  assert.equal(roleCelluleValide('Chantre'), false);
  assert.equal(roleCelluleValide(''), false);
});

// ── Heures HH:MM ─────────────────────────────────────────────
test('heureValide : HH:MM, 00:00 à 23:59', () => {
  assert.equal(heureValide('05:00'), true);
  assert.equal(heureValide('23:59'), true);
  assert.equal(heureValide('00:00'), true);
  assert.equal(heureValide('24:00'), false);
  assert.equal(heureValide('8:00'), false);
  assert.equal(heureValide('08:60'), false);
  assert.equal(heureValide('08:00:00'), false);
  assert.equal(heureValide(''), false);
  assert.equal(heureValide(null), false);
  assert.equal(normaliserHeure(' 08:00 '), '08:00');
  assert.equal(normaliserHeure('8:00'), null);
  assert.equal(jourSemaineValide(0), true);
  assert.equal(jourSemaineValide(6), true);
  assert.equal(jourSemaineValide(7), false);
  assert.equal(jourSemaineValide('1'), false);
});

// ── Modèle Word ──────────────────────────────────────────────
test('modèle : 76 créneaux, dimanche à samedi, 5 h à 23 h', () => {
  assert.equal(MODELE_CHRONOGRAMME.length, 76);
  for (const c of MODELE_CHRONOGRAMME) {
    assert.equal(jourSemaineValide(c.jourSemaine), true);
    assert.equal(heureValide(c.debut), true);
    assert.equal(heureValide(c.fin), true);
    assert.ok(c.debut < c.fin, `${c.titre} ${c.debut}-${c.fin}`);
    assert.ok(c.titre.length > 0);
    assert.ok(TYPES_CRENEAU_MODELE.includes(c.type), c.type);
  }
  const parJour = new Map();
  for (const c of MODELE_CHRONOGRAMME) {
    parJour.set(c.jourSemaine, (parJour.get(c.jourSemaine) ?? 0) + 1);
  }
  // Dimanche : rassemblement, départ, toilette, réfectoire,
  // culte d'ouverture. Samedi : journée sportive et réfectoire.
  assert.equal(parJour.get(0), 5);
  assert.equal(parJour.get(6), 2);
  assert.equal(parJour.get(1), 14);
  assert.equal(parJour.get(5), 13);
  // Enseignements 1 à 9, ateliers 1 à 4, dans l'ordre.
  const enseignements = MODELE_CHRONOGRAMME.filter((c) =>
    c.titre.startsWith('Enseignement'),
  ).map((c) => c.titre);
  assert.deepEqual(enseignements, [
    'Enseignement 1',
    'Enseignement 3',
    'Enseignement 5',
    'Enseignement 7',
    'Enseignement 9',
    'Enseignement 2',
    'Enseignement 4',
    'Enseignement 6',
    'Enseignement 8',
  ]);
  const ateliers = MODELE_CHRONOGRAMME.filter((c) =>
    c.titre.startsWith('Atelier'),
  ).map((c) => c.titre);
  assert.deepEqual(ateliers, ['Atelier 1', 'Atelier 2', 'Atelier 3', 'Atelier 4']);
});

test('appliquerModeleChronogramme : semaine datée depuis le dimanche', () => {
  // 2027-08-22 est un dimanche, premier jour du modèle.
  const entrees = appliquerModeleChronogramme('2027-08-22');
  assert.equal(entrees.length, 76);
  assert.equal(entrees[0].jour, '2027-08-23');
  assert.equal(entrees[0].titre, 'Réveil matinal');
  const dimanche = entrees.filter((e) => e.jour === '2027-08-22');
  assert.deepEqual(
    dimanche.map((e) => e.titre),
    ['Rassemblement', 'Départ', 'Toilette', 'Réfectoire', "Culte d'ouverture"],
  );
  const samedi = entrees.filter((e) => e.jour === '2027-08-28');
  assert.deepEqual(
    samedi.map((e) => e.titre),
    ['Journée sportive', 'Réfectoire'],
  );
  // Pas un dimanche, pas un jour réel : liste vide.
  assert.deepEqual(appliquerModeleChronogramme('2027-08-23'), []);
  assert.deepEqual(appliquerModeleChronogramme('2027-02-30'), []);
  assert.deepEqual(appliquerModeleChronogramme(''), []);
});

// ── Semaines ─────────────────────────────────────────────────
test('dimancheDeLaSemaine et lundiDeLaSemaine', () => {
  assert.equal(dimancheDeLaSemaine('2027-08-22'), '2027-08-22');
  assert.equal(dimancheDeLaSemaine('2027-08-25'), '2027-08-22');
  assert.equal(dimancheDeLaSemaine('2027-08-28'), '2027-08-22');
  assert.equal(lundiDeLaSemaine('2027-08-22'), '2027-08-16');
  assert.equal(lundiDeLaSemaine('2027-08-23'), '2027-08-23');
  assert.equal(lundiDeLaSemaine('2027-08-28'), '2027-08-23');
  assert.equal(dimancheDeLaSemaine('2027-02-30'), null);
  assert.equal(lundiDeLaSemaine(''), null);
});

// ── Validation des entrées ───────────────────────────────────
test('validerEntreeChronogramme : jour, heures, titre', () => {
  const bonne = {
    jour: '2027-08-23',
    heure_debut: '08:00',
    heure_fin: '10:30',
    titre: 'Enseignement 1',
    lieu: 'Grande salle',
    type: 'Enseignement',
  };
  assert.equal(validerEntreeChronogramme(bonne), null);
  assert.equal(validerEntreeChronogramme({ ...bonne, jour: '2027-02-30' }).statut, 400);
  assert.equal(validerEntreeChronogramme({ ...bonne, heure_debut: '8:00' }).statut, 400);
  assert.equal(validerEntreeChronogramme({ ...bonne, heure_fin: '08:00' }).statut, 400);
  assert.equal(validerEntreeChronogramme({ ...bonne, heure_fin: '07:00' }).statut, 400);
  assert.equal(validerEntreeChronogramme({ ...bonne, titre: '  ' }).statut, 400);
  assert.equal(validerEntreeChronogramme({ ...bonne, titre: 'x'.repeat(201) }).statut, 400);
  assert.equal(validerEntreeChronogramme({ ...bonne, lieu: 'x'.repeat(201) }).statut, 400);
  assert.equal(validerEntreeChronogramme({ ...bonne, type: 'x'.repeat(81) }).statut, 400);
  assert.equal(validerEntreeChronogramme(null).statut, 400);
});

test('validerCellule : nom, jour de semaine, heure', () => {
  const bonne = { nom: 'Cellule Céleste', jour_semaine: 3, heure: '18:30', lieu: 'Abidjan' };
  assert.equal(validerCellule(bonne), null);
  assert.equal(validerCellule({ ...bonne, nom: '' }).statut, 400);
  assert.equal(validerCellule({ ...bonne, jour_semaine: 7 }).statut, 400);
  assert.equal(validerCellule({ ...bonne, jour_semaine: 'x' }).statut, 400);
  // Une chaîne de chiffres vaut l'entier, comme l'envoie un formulaire.
  assert.equal(validerCellule({ ...bonne, jour_semaine: '3' }), null);
  assert.equal(validerCellule({ ...bonne, heure: '18:60' }).statut, 400);
  assert.equal(validerCellule({ ...bonne, lieu: 'x'.repeat(201) }).statut, 400);
});

test('validerAssignation : rôle de la liste seulement', () => {
  assert.equal(validerAssignation({ role: 'Louange' }), null);
  assert.equal(validerAssignation({ role: 'Intercession' }), null);
  assert.equal(validerAssignation({ role: 'Chantre' }).statut, 400);
  assert.equal(validerAssignation({}).statut, 400);
});

test('validerException : semaine un lundi, champs courts', () => {
  // 2027-08-23 est un lundi.
  const bonne = { semaine: '2027-08-23', annulee: true, note: 'Camp' };
  assert.equal(validerException(bonne), null);
  assert.equal(validerException({ semaine: '2027-08-22' }).statut, 400);
  assert.equal(validerException({ semaine: '2027-08-24' }).statut, 400);
  assert.equal(validerException({ semaine: '2027-02-30' }).statut, 400);
  assert.equal(validerException({ semaine: '2027-08-23', annulee: 'oui' }).statut, 400);
  assert.equal(validerException({ semaine: '2027-08-23', heure: '18:60' }).statut, 400);
  assert.equal(validerException({ semaine: '2027-08-23', note: 'x'.repeat(501) }).statut, 400);
});

// ── Occurrences hebdomadaires ────────────────────────────────
test('prochaineOccurrence : jour fixe, référence incluse', () => {
  // Mercredi 2027-08-25, cellule du mercredi : le jour même.
  assert.equal(prochaineOccurrence(3, '2027-08-25'), '2027-08-25');
  // Cellule du dimanche, depuis le mercredi : dimanche suivant.
  assert.equal(prochaineOccurrence(0, '2027-08-25'), '2027-08-29');
  // Cellule du lundi, depuis le dimanche : le lendemain.
  assert.equal(prochaineOccurrence(1, '2027-08-22'), '2027-08-23');
  assert.equal(prochaineOccurrence(7, '2027-08-22'), null);
  assert.equal(prochaineOccurrence(1, '2027-02-30'), null);
});

test('appliquerExceptionCellule : annulation, heure et lieu', () => {
  const base = { date: '2027-08-25', heure: '18:30', lieu: 'Abidjan' };
  assert.deepEqual(appliquerExceptionCellule(base, null), {
    date: '2027-08-25',
    heure: '18:30',
    lieu: 'Abidjan',
    annulee: false,
    note: '',
  });
  assert.deepEqual(appliquerExceptionCellule(base, { annulee: true, note: 'Camp' }), {
    date: '2027-08-25',
    heure: '18:30',
    lieu: 'Abidjan',
    annulee: true,
    note: 'Camp',
  });
  const deplacee = appliquerExceptionCellule(base, {
    heure: '17:00',
    lieu: 'Cocody',
    note: 'Horaire avancé',
  });
  assert.equal(deplacee.annulee, false);
  assert.equal(deplacee.heure, '17:00');
  assert.equal(deplacee.lieu, 'Cocody');
  assert.equal(deplacee.note, 'Horaire avancé');
});
