// Tests des messages éphémères et de la modification ou
// suppression d'un message, 21 nov. 2026, carte 3.
//
// Partie pure seulement : elle teste les aides de
// src/messagerie.js sans serveur ni base, et tourne ici. La
// partie intégration (routes contre une base de test et un
// compartiment R2) n'est pas écrite : elle exigerait
// TEST_DATABASE_URL et les clés R2, saisies dans Render par
// Axel, jamais en chat ni dans le dépôt. Les routes sont
// vérifiées par le contrôle de démarrage et par l'exercice
// réel contre le serveur en ligne, comme pour les autres
// tranches serveur.
//
// Lancer :  npm test   (depuis server-production)
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  DUREE_EPHEMERE_DEFAUT_JOURS,
  DUREE_EPHEMERE_MIN_JOURS,
  DUREE_EPHEMERE_MAX_JOURS,
  TYPES_CONVERSATION_EPHEMERE,
  ephemereValide,
  conversationEphemereAutorisee,
  dateExpirationEphemere,
  messageEphemereExpire,
  notificationNouveauMessage,
  SQL_MESSAGES_EPHEMERES_EXPIRES,
  planifierPurgeMessagesEphemeres,
  TEXTE_MESSAGE_SUPPRIME,
  peutModifierMessage,
  peutSupprimerMessage,
  masquerMessageSupprime,
} from '../src/messagerie.js';

const AUTEUR = '11111111-1111-1111-1111-111111111111';
const AUTRE = '22222222-2222-2222-2222-222222222222';
const ETRANGER = '33333333-3333-3333-3333-333333333333';
const ENVOI = new Date('2026-11-21T10:00:00.000Z');

const messageTexte = (surcharge = {}) => ({
  id: 'm1',
  conversation_id: 'c1',
  sender_id: AUTEUR,
  content: 'Bonjour',
  type: 'text',
  created_at: ENVOI,
  edited_at: null,
  deleted_at: null,
  expire_le: null,
  ...surcharge,
});

// ── Constantes ───────────────────────────────────────────────
test('constantes : 7 jours par défaut, 1 à 30 jours, privé seulement', () => {
  assert.equal(DUREE_EPHEMERE_DEFAUT_JOURS, 7);
  assert.equal(DUREE_EPHEMERE_MIN_JOURS, 1);
  assert.equal(DUREE_EPHEMERE_MAX_JOURS, 30);
  assert.deepEqual(TYPES_CONVERSATION_EPHEMERE, ['directe', 'pastorale']);
  assert.equal(Object.isFrozen(TYPES_CONVERSATION_EPHEMERE), true);
});

// ── Réglage éphémère ─────────────────────────────────────────
test('ephemereValide : null pour désactiver, entier de 1 à 30 jours', () => {
  assert.equal(ephemereValide(null), true);
  assert.equal(ephemereValide(undefined), true);
  assert.equal(ephemereValide(1), true);
  assert.equal(ephemereValide(7), true);
  assert.equal(ephemereValide(30), true);
  assert.equal(ephemereValide(0), false);
  assert.equal(ephemereValide(31), false);
  assert.equal(ephemereValide(7.5), false);
  assert.equal(ephemereValide('7'), false);
});

test('conversationEphemereAutorisee : directe et pastorale seulement, jamais les groupes', () => {
  assert.equal(conversationEphemereAutorisee('directe'), true);
  assert.equal(conversationEphemereAutorisee('pastorale'), true);
  assert.equal(conversationEphemereAutorisee('groupe_etablissement'), false);
  assert.equal(conversationEphemereAutorisee('groupe_structure'), false);
});

// ── Expiration ───────────────────────────────────────────────
test('dateExpirationEphemere : 7 jours après l’envoi par défaut, durée réglable, null quand désactivé', () => {
  assert.equal(
    dateExpirationEphemere(ENVOI, 7).toISOString(),
    '2026-11-28T10:00:00.000Z',
  );
  assert.equal(
    dateExpirationEphemere(ENVOI, 1).toISOString(),
    '2026-11-22T10:00:00.000Z',
  );
  assert.equal(
    dateExpirationEphemere(ENVOI, 30).toISOString(),
    '2026-12-21T10:00:00.000Z',
  );
  assert.equal(dateExpirationEphemere(ENVOI, null), null);
  assert.equal(dateExpirationEphemere(ENVOI, undefined), null);
});

test('messageEphemereExpire : expiré à la date limite, vivant avant, jamais sans expire_le', () => {
  const expire = new Date('2026-11-28T10:00:00.000Z');
  assert.equal(messageEphemereExpire(expire, new Date('2026-11-27T10:00:00.000Z')), false);
  assert.equal(messageEphemereExpire(expire, new Date('2026-11-28T10:00:00.000Z')), true);
  assert.equal(messageEphemereExpire(expire, new Date('2026-11-29T10:00:00.000Z')), true);
  assert.equal(messageEphemereExpire(null, new Date('2027-01-01T00:00:00.000Z')), false);
});

// ── Poussée sans aperçu en éphémère ─────────────────────────
test('notificationNouveauMessage : éphémère, seulement « Nouveau message », sans nom ni contenu', () => {
  const notif = notificationNouveauMessage({ ephemere: 7, prenom: 'Axel', apercu: 'Secret à ne pas montrer' });
  assert.deepEqual(notif, { titre: 'Nouveau message', corps: 'Nouveau message' });
  assert.equal(notif.corps.includes('Axel'), false);
  assert.equal(notif.corps.includes('Secret'), false);
});

test('notificationNouveauMessage : non éphémère, prénom et aperçu comme avant', () => {
  const notif = notificationNouveauMessage({ ephemere: null, prenom: 'Axel', apercu: 'Bonjour' });
  assert.deepEqual(notif, { titre: 'Nouveau message', corps: 'Axel : Bonjour' });
});

// ── Purge des expirés ────────────────────────────────────────
test('purge : la requête ne vise que les messages expirés, jamais les signalements', () => {
  assert.match(SQL_MESSAGES_EPHEMERES_EXPIRES, /expire_le IS NOT NULL AND m\.expire_le <= now\(\)/);
  assert.match(SQL_MESSAGES_EPHEMERES_EXPIRES, /LEFT JOIN message_attachments/);
  assert.equal(SQL_MESSAGES_EPHEMERES_EXPIRES.includes('reports'), false);
  assert.equal(SQL_MESSAGES_EPHEMERES_EXPIRES.includes('evidence_snapshot'), false);
});

test('purge : un message expiré disparaît avec sa pièce R2, un message sans pièce part quand même', () => {
  const plan = planifierPurgeMessagesEphemeres([
    { id: 'm1', cle_r2: 'messages-vocaux/a.mp3' },
    { id: 'm1', cle_r2: 'messages-vocaux/a.mp3' },
    { id: 'm2', cle_r2: null },
    { id: 'm3', cle_r2: 'messages-vocaux/b.mp3' },
  ]);
  assert.deepEqual(plan.ids, ['m1', 'm2', 'm3']);
  assert.deepEqual(plan.clesR2, ['messages-vocaux/a.mp3', 'messages-vocaux/b.mp3']);
  assert.deepEqual(planifierPurgeMessagesEphemeres([]), { ids: [], clesR2: [] });
});

test('purge : la preuve d’un signalement déjà fait ne dépend pas du message', () => {
  // La preuve est figée dans reports.evidence_snapshot au moment
  // du signalement ; la purge ne touche qu'à messages et à
  // message_attachments, donc le cliché survit à la disparition
  // du message, expiré comme supprimé.
  const snapshot = {
    cible: 'message',
    message: { id: 'm1', content: 'Contenu signalé' },
    contexte: [],
    pieces_jointes: [],
  };
  const plan = planifierPurgeMessagesEphemeres([{ id: 'm1', cle_r2: null }]);
  assert.deepEqual(plan.ids, ['m1']);
  assert.equal(snapshot.message.content, 'Contenu signalé');
  assert.equal(JSON.stringify(snapshot).includes('Contenu signalé'), true);
});

// ── Modifier ─────────────────────────────────────────────────
test('peutModifierMessage : l’auteur d’un message texte intact peut modifier', () => {
  assert.deepEqual(
    peutModifierMessage({ message: messageTexte(), membreId: AUTEUR, estParticipant: true }),
    { ok: true },
  );
});

test('peutModifierMessage : message introuvable, 404 sans révéler l’existence', () => {
  const decision = peutModifierMessage({ message: null, membreId: AUTEUR, estParticipant: false });
  assert.equal(decision.ok, false);
  assert.equal(decision.statut, 404);
});

test('peutModifierMessage : non participant, 404 ; autre participant, 403', () => {
  assert.equal(
    peutModifierMessage({ message: messageTexte(), membreId: ETRANGER, estParticipant: false }).statut,
    404,
  );
  const decision = peutModifierMessage({ message: messageTexte(), membreId: AUTRE, estParticipant: true });
  assert.equal(decision.ok, false);
  assert.equal(decision.statut, 403);
});

test('peutModifierMessage : déjà supprimé, 409 ; vocal, 409', () => {
  assert.equal(
    peutModifierMessage({ message: messageTexte({ deleted_at: new Date() }), membreId: AUTEUR, estParticipant: true }).statut,
    409,
  );
  assert.equal(
    peutModifierMessage({ message: messageTexte({ type: 'audio' }), membreId: AUTEUR, estParticipant: true }).statut,
    409,
  );
});

// ── Supprimer ────────────────────────────────────────────────
test('peutSupprimerMessage : l’auteur peut supprimer, même après coup', () => {
  assert.deepEqual(
    peutSupprimerMessage({ message: messageTexte(), membreId: AUTEUR, estParticipant: true, role: 'membre' }),
    { ok: true },
  );
});

test('peutSupprimerMessage : le destinataire ne peut pas supprimer, 403', () => {
  const decision = peutSupprimerMessage({ message: messageTexte(), membreId: AUTRE, estParticipant: true, role: 'membre' });
  assert.equal(decision.ok, false);
  assert.equal(decision.statut, 403);
});

test('peutSupprimerMessage : non participant, 404 ; déjà supprimé, 409', () => {
  assert.equal(
    peutSupprimerMessage({ message: messageTexte(), membreId: ETRANGER, estParticipant: false, role: 'membre' }).statut,
    404,
  );
  assert.equal(
    peutSupprimerMessage({ message: messageTexte({ deleted_at: new Date() }), membreId: AUTEUR, estParticipant: true, role: 'membre' }).statut,
    409,
  );
});

test('peutSupprimerMessage : la structure peut supprimer pour la modération', () => {
  assert.deepEqual(
    peutSupprimerMessage({ message: messageTexte(), membreId: AUTRE, estParticipant: false, role: 'admin_general' }),
    { ok: true, moderation: true },
  );
  assert.deepEqual(
    peutSupprimerMessage({
      message: messageTexte(),
      membreId: AUTRE,
      estParticipant: false,
      role: 'admin_etablissement',
      etablissementAuteur: 'etab-1',
      etablissementModerateur: 'etab-1',
    }),
    { ok: true, moderation: true },
  );
  const decision = peutSupprimerMessage({
    message: messageTexte(),
    membreId: AUTRE,
    estParticipant: false,
    role: 'admin_etablissement',
    etablissementAuteur: 'etab-1',
    etablissementModerateur: 'etab-2',
  });
  assert.equal(decision.ok, false);
  assert.equal(decision.statut, 403);
});

// ── Masquage du supprimé ─────────────────────────────────────
test('masquerMessageSupprime : le destinataire ne reçoit plus le contenu, seulement « Message supprimé »', () => {
  assert.equal(TEXTE_MESSAGE_SUPPRIME, 'Message supprimé');
  const supprime = messageTexte({ deleted_at: new Date('2026-11-21T11:00:00.000Z') });
  const masque = masquerMessageSupprime({ ...supprime, audio_url: 'https://exemple.invalid/son.mp3', cle_audio: 'messages-vocaux/a.mp3' });
  assert.equal(masque.content, 'Message supprimé');
  assert.equal(masque.audio_url, undefined);
  assert.equal(masque.cle_audio, undefined);
  assert.equal(masque.deleted_at instanceof Date, true);
  assert.equal(masque.sender_id, AUTEUR);
});

test('masquerMessageSupprime : un message intact passe tel quel, avec son lien audio', () => {
  const ligne = { ...messageTexte(), audio_url: 'https://exemple.invalid/son.mp3' };
  assert.deepEqual(masquerMessageSupprime(ligne), ligne);
});
