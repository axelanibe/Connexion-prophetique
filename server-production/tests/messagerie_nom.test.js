// Tests du correctif messagerie, nom et photo de
// l'interlocuteur, 18 nov. 2026.
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
  SQL_PARTICIPANTS_CONVERSATION,
  autreParticipantDeLigne,
  formaterConversationListe,
} from '../src/messagerie.js';

// ── Requête de la liste ──────────────────────────────────────
test('liste : autre participant joint, nom, matricule et photo', () => {
  assert.match(SQL_CONVERSATIONS_LISTE, /a\.nom_complet AS autre_nom/);
  assert.match(SQL_CONVERSATIONS_LISTE, /a\.matricule AS autre_matricule/);
  assert.match(SQL_CONVERSATIONS_LISTE, /a\.photo_donnees AS autre_photo/);
  assert.match(SQL_CONVERSATIONS_LISTE, /FROM conversations c JOIN conversation_participants cp ON cp\.conversation_id = c\.id/);
});

test('liste : autre participant limité aux directes, jamais moi, actifs seulement', () => {
  assert.match(SQL_CONVERSATIONS_LISTE, /cp2\.member_id <> \$1/);
  assert.match(SQL_CONVERSATIONS_LISTE, /cp2\.is_active/);
  assert.match(SQL_CONVERSATIONS_LISTE, /c\.type = 'directe'/);
});

test('liste : mes conversations seulement, non archivées, triées par dernier message', () => {
  assert.match(SQL_CONVERSATIONS_LISTE, /cp\.member_id = \$1 AND cp\.is_active AND NOT c\.is_archived/);
  assert.match(SQL_CONVERSATIONS_LISTE, /ORDER BY c\.last_message_at DESC NULLS LAST, c\.created_at DESC/);
});

test('liste : un seul paramètre, mon identifiant', () => {
  assert.equal((SQL_CONVERSATIONS_LISTE.match(/\$1/g) ?? []).length, 2);
  assert.doesNotMatch(SQL_CONVERSATIONS_LISTE, /\$2/);
});

// ── Requête des participants, route détail ───────────────────
test('participants : nom, matricule et photo de chaque participant actif', () => {
  assert.match(SQL_PARTICIPANTS_CONVERSATION, /m\.nom_complet, m\.matricule, m\.photo_donnees AS photo/);
  assert.match(SQL_PARTICIPANTS_CONVERSATION, /WHERE cp\.conversation_id = \$1 AND cp\.is_active ORDER BY cp\.joined_at/);
});

// ── Autre participant ───────────────────────────────────────
test('autreParticipantDeLigne : directe avec autre membre connu', () => {
  assert.deepEqual(
    autreParticipantDeLigne({
      type: 'directe',
      autre_nom: 'MARIE DUPONT',
      autre_matricule: 'CP-MD-2527',
      autre_photo: 'data:image/jpeg;base64,xxx',
    }),
    { nom: 'MARIE DUPONT', matricule: 'CP-MD-2527', photo: 'data:image/jpeg;base64,xxx' },
  );
});

test('autreParticipantDeLigne : directe sans photo, photo nulle', () => {
  assert.deepEqual(
    autreParticipantDeLigne({ type: 'directe', autre_nom: 'MARIE DUPONT', autre_matricule: 'CP-MD-2527', autre_photo: null }),
    { nom: 'MARIE DUPONT', matricule: 'CP-MD-2527', photo: null },
  );
});

test('autreParticipantDeLigne : null pour les groupes et la pastorale', () => {
  assert.equal(
    autreParticipantDeLigne({ type: 'groupe_etablissement', autre_nom: 'MARIE DUPONT', autre_matricule: 'CP-MD-2527', autre_photo: null }),
    null,
  );
  assert.equal(
    autreParticipantDeLigne({ type: 'groupe_structure', autre_nom: 'MARIE DUPONT', autre_matricule: 'CP-MD-2527', autre_photo: null }),
    null,
  );
  assert.equal(
    autreParticipantDeLigne({ type: 'pastorale', autre_nom: 'MARIE DUPONT', autre_matricule: 'CP-MD-2527', autre_photo: null }),
    null,
  );
});

test('autreParticipantDeLigne : null quand l’autre membre est inconnu', () => {
  assert.equal(autreParticipantDeLigne({ type: 'directe', autre_nom: null, autre_matricule: null, autre_photo: null }), null);
  assert.equal(autreParticipantDeLigne({ type: 'directe', autre_nom: '   ', autre_matricule: null, autre_photo: null }), null);
  assert.equal(autreParticipantDeLigne(null), null);
});

// ── Mise en forme de la ligne ────────────────────────────────
test('formaterConversationListe : objet autre pour une directe, colonnes plates retirées', () => {
  const formatee = formaterConversationListe({
    id: 'c1',
    type: 'directe',
    title: null,
    created_at: '2026-11-16T10:00:00.000Z',
    last_message_at: '2026-11-16T10:00:00.000Z',
    replies_disabled: false,
    autre_nom: 'MARIE DUPONT',
    autre_matricule: 'CP-MD-2527',
    autre_photo: null,
  });
  assert.equal(formatee.id, 'c1');
  assert.equal(formatee.type, 'directe');
  assert.deepEqual(formatee.autre, { nom: 'MARIE DUPONT', matricule: 'CP-MD-2527', photo: null });
  assert.equal('autre_nom' in formatee, false);
  assert.equal('autre_matricule' in formatee, false);
  assert.equal('autre_photo' in formatee, false);
});

test('formaterConversationListe : autre nul pour un groupe, titre gardé', () => {
  const formatee = formaterConversationListe({
    id: 'c2',
    type: 'groupe_etablissement',
    title: 'Chorale',
    created_at: '2026-11-16T10:00:00.000Z',
    last_message_at: null,
    replies_disabled: false,
    autre_nom: null,
    autre_matricule: null,
    autre_photo: null,
  });
  assert.equal(formatee.title, 'Chorale');
  assert.equal(formatee.autre, null);
});
