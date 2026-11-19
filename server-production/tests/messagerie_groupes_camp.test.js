// Tests des nouveautés Messagerie, 18 nov. 2026 : groupe
// automatique à l'inscription à un camp ou une retraite, et
// favoris.
//
// Partie pure seulement : elle teste les aides de
// src/messagerie.js sans serveur ni base, et tourne ici. La
// partie intégration (routes contre une base de test) n'est pas
// écrite : elle exigerait TEST_DATABASE_URL, indisponible ici.
// Les routes sont vérifiées par le contrôle de démarrage et par
// l'exercice réel contre le serveur en ligne, comme pour les
// autres tranches serveur.
//
// Lancer :  npm test   (depuis server-production)
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  SQL_CONVERSATIONS_LISTE,
  formaterConversationListe,
  estTypeEvenementGroupe,
  SQL_GROUPE_EVENEMENT,
  SQL_CREER_GROUPE_EVENEMENT,
  SQL_AJOUTER_INSCRITS_GROUPE,
  SQL_AJOUTER_PARTICIPANT_GROUPE,
  SQL_RETIRER_PARTICIPANT_GROUPE,
  SQL_FAVORI_BASCULER,
} from '../src/messagerie.js';

// ── Types d'événement qui ouvrent un groupe ──────────────────
test('groupe automatique : camp et retraite seulement, pas réunion', () => {
  assert.equal(estTypeEvenementGroupe('camp'), true);
  assert.equal(estTypeEvenementGroupe('retraite'), true);
  assert.equal(estTypeEvenementGroupe('reunion'), false);
  assert.equal(estTypeEvenementGroupe(undefined), false);
  assert.equal(estTypeEvenementGroupe(''), false);
});

// ── Recherche du groupe d'un événement ───────────────────────
test('groupe événement : recherché par evenement_id, non archivé', () => {
  assert.match(SQL_GROUPE_EVENEMENT, /WHERE evenement_id = \$1 AND NOT is_archived/);
});

// ── Création du groupe ───────────────────────────────────────
test('groupe événement : créé en groupe de structure, au nom de l’événement, idempotent', () => {
  assert.match(SQL_CREER_GROUPE_EVENEMENT, /INSERT INTO conversations \(type, title, created_by, evenement_id\)/);
  assert.match(SQL_CREER_GROUPE_EVENEMENT, /VALUES \('groupe_structure', \$1, \$2, \$3\)/);
  assert.match(SQL_CREER_GROUPE_EVENEMENT, /ON CONFLICT \(evenement_id\) WHERE evenement_id IS NOT NULL DO NOTHING RETURNING id/);
});

// ── Rattrapage des inscrits ──────────────────────────────────
test('groupe événement : tous les inscrits actuels entrent, réactivation comprise', () => {
  assert.match(SQL_AJOUTER_INSCRITS_GROUPE, /SELECT \$1, membre_id, 'membre' FROM inscriptions WHERE evenement_id = \$2/);
  assert.match(SQL_AJOUTER_INSCRITS_GROUPE, /ON CONFLICT \(conversation_id, member_id\) DO UPDATE SET is_active = true/);
});

test('groupe événement : ajout d’un seul inscrit, idempotent, réactivation comprise', () => {
  assert.match(SQL_AJOUTER_PARTICIPANT_GROUPE, /INSERT INTO conversation_participants \(conversation_id, member_id, role\) VALUES \(\$1, \$2, 'membre'\)/);
  assert.match(SQL_AJOUTER_PARTICIPANT_GROUPE, /ON CONFLICT \(conversation_id, member_id\) DO UPDATE SET is_active = true/);
});

// ── Retrait du groupe ────────────────────────────────────────
test('groupe événement : annulation, le membre sort du groupe sans effacement', () => {
  assert.match(SQL_RETIRER_PARTICIPANT_GROUPE, /UPDATE conversation_participants SET is_active = false WHERE conversation_id = \$1 AND member_id = \$2/);
});

// ── Favoris ──────────────────────────────────────────────────
test('liste : le favori de l’appelant est renvoyé', () => {
  assert.match(SQL_CONVERSATIONS_LISTE, /cp\.est_favori AS est_favori/);
});

test('favori : bascule sur ma participation active seulement, nouvel état renvoyé', () => {
  assert.match(SQL_FAVORI_BASCULER, /UPDATE conversation_participants SET est_favori = \$3 WHERE conversation_id = \$1 AND member_id = \$2 AND is_active RETURNING est_favori/);
});

test('favori : la ligne formatée garde l’état du favori', () => {
  const ligne = {
    id: 'c1',
    type: 'groupe_structure',
    title: 'Camp Kairos 2027',
    est_favori: true,
    autre_nom: null,
    autre_matricule: null,
    autre_photo: null,
  };
  const formatee = formaterConversationListe(ligne);
  assert.equal(formatee.est_favori, true);
  assert.equal(formatee.autre, null);
  const sansFavori = formaterConversationListe({ ...ligne, est_favori: false });
  assert.equal(sansFavori.est_favori, false);
});
