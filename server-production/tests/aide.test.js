// Tests de l'aide de la structure, 21 nov. 2026, carte 4 :
// un canal dédié de clavardage avec la structure, qui reprend le
// moteur de la Messagerie.
//
// Partie pure seulement : elle teste les aides de
// src/messagerie.js sans serveur ni base, et tourne ici. La
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
  MOTIFS_AIDE,
  STATUTS_AIDE,
  motifAideValide,
  statutAideValide,
  titreDemandeAide,
  libelleStatutAide,
  peutEnvoyerDansAide,
  peutRouvrirAide,
  peutChangerStatutAide,
  formaterDemandeAide,
} from '../src/messagerie.js';

// ── Motifs et statuts ─────────────────────────────────────────
test('motifs aide : problème ou abus seulement', () => {
  assert.deepEqual([...MOTIFS_AIDE], ['probleme', 'abus']);
  assert.equal(motifAideValide('probleme'), true);
  assert.equal(motifAideValide('abus'), true);
  assert.equal(motifAideValide('autre'), false);
  assert.equal(motifAideValide(null), false);
  assert.equal(motifAideValide(undefined), false);
});

test('statuts aide : ouvert, en cours, résolu', () => {
  assert.deepEqual([...STATUTS_AIDE], ['ouvert', 'en_cours', 'resolu']);
  assert.equal(statutAideValide('ouvert'), true);
  assert.equal(statutAideValide('en_cours'), true);
  assert.equal(statutAideValide('resolu'), true);
  assert.equal(statutAideValide('en_attente'), false);
  assert.equal(statutAideValide(null), false);
});

// ── Titre ─────────────────────────────────────────────────────
test('titreDemandeAide : le motif en clair dans le titre', () => {
  assert.equal(titreDemandeAide('probleme'), 'Aide : Problème');
  assert.equal(titreDemandeAide('abus'), 'Aide : Abus');
  assert.equal(titreDemandeAide('autre'), 'Aide : Problème');
  assert.equal(titreDemandeAide(null), 'Aide : Problème');
});

// ── Libellé de statut ─────────────────────────────────────────
test('libelleStatutAide : ouvert par défaut', () => {
  assert.equal(libelleStatutAide('ouvert'), 'Ouvert');
  assert.equal(libelleStatutAide('en_cours'), 'En cours');
  assert.equal(libelleStatutAide('resolu'), 'Résolu');
  assert.equal(libelleStatutAide('inconnu'), 'Ouvert');
});

// ── Envoi dans une demande résolue ────────────────────────────
test('peutEnvoyerDansAide : libre sauf résolu pour le membre', () => {
  assert.equal(peutEnvoyerDansAide({ statut: 'ouvert', estResponsable: false }), true);
  assert.equal(peutEnvoyerDansAide({ statut: 'en_cours', estResponsable: false }), true);
  assert.equal(peutEnvoyerDansAide({ statut: 'resolu', estResponsable: false }), false);
  assert.equal(peutEnvoyerDansAide({ statut: 'resolu', estResponsable: true }), true);
  assert.equal(peutEnvoyerDansAide({ statut: null, estResponsable: false }), true);
});

// ── Réouverture ───────────────────────────────────────────────
test('peutRouvrirAide : résolu et auteur seulement', () => {
  assert.equal(peutRouvrirAide({ statut: 'resolu', estDemandeur: true }), true);
  assert.equal(peutRouvrirAide({ statut: 'resolu', estDemandeur: false }), false);
  assert.equal(peutRouvrirAide({ statut: 'ouvert', estDemandeur: true }), false);
  assert.equal(peutRouvrirAide({ statut: 'en_cours', estDemandeur: true }), false);
});

// ── Changement de statut ──────────────────────────────────────
test('peutChangerStatutAide : général partout, établissement chez lui', () => {
  assert.equal(peutChangerStatutAide({ role: 'admin_general', etablissementDemandeur: 'e1', etablissementResponsable: 'e2' }), true);
  assert.equal(peutChangerStatutAide({ role: 'admin_etablissement', etablissementDemandeur: 'e1', etablissementResponsable: 'e1' }), true);
  assert.equal(peutChangerStatutAide({ role: 'admin_etablissement', etablissementDemandeur: 'e1', etablissementResponsable: 'e2' }), false);
  assert.equal(peutChangerStatutAide({ role: 'admin_etablissement', etablissementDemandeur: null, etablissementResponsable: 'e1' }), false);
  assert.equal(peutChangerStatutAide({ role: 'membre', etablissementDemandeur: 'e1', etablissementResponsable: 'e1' }), false);
});

// ── Forme renvoyée ────────────────────────────────────────────
test('formaterDemandeAide : motif, statut et demandeur', () => {
  const ligne = {
    id: 'c1',
    type: 'aide',
    title: 'Aide : Abus',
    aide_motif: 'abus',
    aide_statut: 'en_cours',
    demandeur_nom: 'Marie Test',
    demandeur_matricule: 'CP-MT-2526',
    created_at: '2026-11-21T12:00:00.000Z',
    last_message_at: '2026-11-21T12:05:00.000Z',
  };
  assert.deepEqual(formaterDemandeAide(ligne), {
    id: 'c1',
    type: 'aide',
    title: 'Aide : Abus',
    motif: 'abus',
    statut: 'en_cours',
    demandeur_nom: 'Marie Test',
    demandeur_matricule: 'CP-MT-2526',
    created_at: '2026-11-21T12:00:00.000Z',
    last_message_at: '2026-11-21T12:05:00.000Z',
  });
});

test('formaterDemandeAide : défauts quand le statut et le motif manquent', () => {
  const sortie = formaterDemandeAide({ id: 'c1' });
  assert.equal(sortie.type, 'aide');
  assert.equal(sortie.title, 'Aide : Problème');
  assert.equal(sortie.motif, null);
  assert.equal(sortie.statut, 'ouvert');
  assert.equal(sortie.demandeur_nom, null);
  assert.equal(formaterDemandeAide(null), null);
});
