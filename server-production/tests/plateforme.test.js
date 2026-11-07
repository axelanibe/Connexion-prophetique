// Tests purs de la Plateforme, carte 83, 7 nov. 2026 : aucun
// serveur, aucune base, aucune donnée réelle. Lancer depuis
// server-production :
//   node --test tests/plateforme.test.js
// La logique vit dans src/plateforme.js, importé par server.js
// pour les routes /plateforme et /admin/plateforme. Les routes
// elles-mêmes ne sont pas testées ici, faute de base dans ce
// dossier de tests.
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PLATEFORME_MONTANT_ANNUEL,
  PLATEFORME_DUREE_MOIS,
  dateFinAbonnement,
  abonnementStatut,
  peutPublierPlateforme,
  joursRestantsAbonnement,
  validerCreationEnseignementPlateforme,
  formaterEnseignementPlateformeMembre,
} from '../src/plateforme.js';

test('le montant est 100 000 FCFA par an, pour 12 mois', () => {
  assert.equal(PLATEFORME_MONTANT_ANNUEL, 100000);
  assert.equal(PLATEFORME_DUREE_MOIS, 12);
});

test('la fin est 12 mois après le début', () => {
  assert.equal(dateFinAbonnement('2026-11-07T10:00:00.000Z').toISOString(), '2027-11-07T10:00:00.000Z');
  assert.equal(dateFinAbonnement('pas une date'), null);
});

test('actif puis expiré à la fin, bornes comprises', () => {
  const abo = { statut: 'Actif', date_fin: '2027-11-07T10:00:00.000Z' };
  assert.equal(abonnementStatut(abo, new Date('2027-11-07T10:00:00.000Z')), 'Actif');
  assert.equal(abonnementStatut(abo, new Date('2027-11-07T10:00:01.000Z')), 'Expiré');
  assert.equal(abonnementStatut(null), 'Aucun');
  assert.equal(abonnementStatut({ statut: 'En attente' }), 'En attente');
});

test('publier exige un abonnement actif, jamais expiré ni en attente', () => {
  assert.equal(peutPublierPlateforme({ statut: 'Actif', date_fin: '2027-11-07T10:00:00.000Z' }, new Date('2027-01-01T00:00:00.000Z')), true);
  assert.equal(peutPublierPlateforme({ statut: 'Actif', date_fin: '2027-11-07T10:00:00.000Z' }, new Date('2027-11-08T00:00:00.000Z')), false);
  assert.equal(peutPublierPlateforme({ statut: 'En attente', date_fin: '2027-11-07T10:00:00.000Z' }), false);
  assert.equal(peutPublierPlateforme(null), false);
});

test('les jours restants ne sont jamais négatifs', () => {
  assert.equal(joursRestantsAbonnement({ date_fin: '2027-11-07T10:00:00.000Z' }, new Date('2027-11-01T10:00:00.000Z')), 6);
  assert.equal(joursRestantsAbonnement({ date_fin: '2027-11-07T10:00:00.000Z' }, new Date('2027-11-08T10:00:00.000Z')), 0);
  assert.equal(joursRestantsAbonnement(null), 0);
});

test('la création exige titre, format, et contenu selon le format', () => {
  const audio = { titre: 'La foi', format: 'Audio', lien_audio: 'https://exemple.com/audio.mp3' };
  assert.deepEqual(validerCreationEnseignementPlateforme(audio), []);
  assert.ok(validerCreationEnseignementPlateforme({ ...audio, titre: '   ' }).length > 0);
  assert.ok(validerCreationEnseignementPlateforme({ ...audio, format: 'Vidéo' }).length > 0);
  assert.ok(validerCreationEnseignementPlateforme({ ...audio, lien_audio: '' }).length > 0);
  assert.deepEqual(validerCreationEnseignementPlateforme({ titre: 'La foi', format: 'Texte', texte: 'Voici le texte.' }), []);
  assert.ok(validerCreationEnseignementPlateforme({ titre: 'La foi', format: 'Texte', texte: '' }).length > 0);
});

test('la vue membre ne montre que les enseignements publiés', () => {
  const publie = { id: '1', titre: 'La foi', orateur: 'Jean', statut: 'Publié', format: 'Audio', lien_audio: 'https://exemple.com/a.mp3', vues: 3 };
  assert.equal(formaterEnseignementPlateformeMembre(publie).titre, 'La foi');
  assert.equal(formaterEnseignementPlateformeMembre({ ...publie, statut: 'En attente de validation' }), null);
  assert.equal(formaterEnseignementPlateformeMembre({ ...publie, statut: 'Refusé', motif_refus: 'Hors sujet' }), null);
  assert.equal(formaterEnseignementPlateformeMembre(null), null);
});
