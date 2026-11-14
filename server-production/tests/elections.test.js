// Tests purs des élections, carte 76, 7 nov. 2026 : aucun
// serveur, aucune base, aucune donnée réelle. Lancer depuis
// server-production :
//   node --test tests/elections.test.js
// La logique vit dans src/elections.js, importé par server.js pour
// les routes /elections et /admin/elections. Les routes elles-mêmes
// ne sont pas testées ici, faute de base dans ce dossier de tests.
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  electionStatut,
  electionEstOuverte,
  resultatsVisiblesPourMembre,
  electionsSeChevauchent,
  validerCreationElection,
  formaterElectionMembre,
} from '../src/elections.js';

const election = { date_debut: '2026-11-10T08:00:00.000Z', date_fin: '2026-11-12T18:00:00.000Z' };

test('le statut suit les dates, bornes comprises', () => {
  assert.equal(electionStatut(election, new Date('2026-11-09T08:00:00.000Z')), 'a_venir');
  assert.equal(electionStatut(election, new Date('2026-11-10T08:00:00.000Z')), 'en_cours');
  assert.equal(electionStatut(election, new Date('2026-11-11T12:00:00.000Z')), 'en_cours');
  assert.equal(electionStatut(election, new Date('2026-11-12T18:00:00.000Z')), 'en_cours');
  assert.equal(electionStatut(election, new Date('2026-11-12T18:00:01.000Z')), 'terminee');
});

test('ouverte seulement pendant la période, jamais hors période', () => {
  assert.equal(electionEstOuverte(election, new Date('2026-11-09T23:59:59.000Z')), false);
  assert.equal(electionEstOuverte(election, new Date('2026-11-11T00:00:00.000Z')), true);
  assert.equal(electionEstOuverte(election, new Date('2026-11-13T00:00:00.000Z')), false);
});

test('les résultats ne sont visibles pour un membre qu après la fin', () => {
  assert.equal(resultatsVisiblesPourMembre(election, new Date('2026-11-11T12:00:00.000Z')), false);
  assert.equal(resultatsVisiblesPourMembre(election, new Date('2026-11-12T18:00:00.000Z')), false);
  assert.equal(resultatsVisiblesPourMembre(election, new Date('2026-11-12T18:00:01.000Z')), true);
});

test('le chevauchement refuse deux élections en même temps', () => {
  assert.equal(electionsSeChevauchent('2026-11-10T08:00:00Z', '2026-11-12T18:00:00Z', '2026-11-11T00:00:00Z', '2026-11-13T00:00:00Z'), true);
  assert.equal(electionsSeChevauchent('2026-11-10T08:00:00Z', '2026-11-12T18:00:00Z', '2026-11-09T00:00:00Z', '2026-11-10T08:00:00Z'), false);
  assert.equal(electionsSeChevauchent('2026-11-10T08:00:00Z', '2026-11-12T18:00:00Z', '2026-11-12T18:00:00Z', '2026-11-14T00:00:00Z'), false);
  assert.equal(electionsSeChevauchent('2026-11-10T08:00:00Z', '2026-11-12T18:00:00Z', '2026-11-13T00:00:00Z', '2026-11-14T00:00:00Z'), false);
});

test('la création exige titre, dates cohérentes et au moins un candidat', () => {
  const valide = {
    titre: 'Élection du Bureau',
    poste: 'Président',
    date_debut: '2026-11-10T08:00:00.000Z',
    date_fin: '2026-11-12T18:00:00.000Z',
    candidats: [{ matricule: 'CP-AA-2526' }, { matricule: 'CP-AB-2527' }],
  };
  assert.deepEqual(validerCreationElection(valide), []);
  assert.ok(validerCreationElection({ ...valide, titre: '   ' }).length > 0);
  assert.ok(validerCreationElection({ ...valide, date_fin: '2026-11-10T08:00:00.000Z' }).length > 0);
  assert.ok(validerCreationElection({ ...valide, date_fin: '2026-11-09T08:00:00.000Z' }).length > 0);
  assert.ok(validerCreationElection({ ...valide, date_debut: 'pas une date' }).length > 0);
  assert.ok(validerCreationElection({ ...valide, candidats: [] }).length > 0);
  assert.ok(validerCreationElection({ ...valide, candidats: [{ matricule: 'CP-AA-2526' }, { matricule: 'CP-AA-2526' }] }).length > 0);
  assert.ok(validerCreationElection({ ...valide, candidats: [{ nom: 'Sans identifiant' }] }).length > 0);
  assert.ok(validerCreationElection({ ...valide, candidats: [{ membre_id: '11111111-1111-4111-8111-111111111111' }] }).length === 0);
});

test('la forme membre ne porte jamais de total de voix', () => {
  const publique = formaterElectionMembre(
    { id: 'e1', titre: 'Élection du Bureau', description: '', poste: 'Président', date_debut: '2026-11-10T08:00:00.000Z', date_fin: '2026-11-12T18:00:00.000Z' },
    [{ id: 'c1', nom: 'Awa Diallo', fonction: 'Membre', ordre: 1 }],
    null,
  );
  assert.equal(publique.statut, 'en_cours');
  assert.equal(publique.a_vote, false);
  assert.equal(publique.mon_candidat_id, null);
  assert.equal('voix' in publique.candidats[0], false);
  assert.equal('total_voix' in publique, false);
  assert.equal('resultats' in publique, false);
});
