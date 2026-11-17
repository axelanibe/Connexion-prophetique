// Tests des appels audio et vidéo dans la messagerie, 16 nov. 2026.
//
// Deux parties. La première, pure, teste les aides de
// src/appels.js et le registre de src/appels_ws.js, sans serveur
// ni base : elle tourne ici. La seconde, intégration, lance le
// serveur réel en processus enfant sur une base PostgreSQL de
// test (ne JAMAIS pointer vers la production), comme
// messagerie.test.js, et vérifie les routes, la signalisation et
// le WebSocket ; sans TEST_DATABASE_URL, elle s'arrête (code 0),
// comme les autres tests d'intégration du dépôt.
//
// Lancer :  TEST_DATABASE_URL=<redacted>
// ou simplement : npm test   (avec .env.test, voir ci-dessous)
import test from 'node:test';
import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import pg from 'pg';
import argon2 from 'argon2';

import {
  TYPES_APPEL,
  TYPES_SIGNAL_APPEL,
  STATUTS_APPEL,
  DUREE_SONNERIE_MS,
  DELAI_EXPIRATION_SONNERIE_SECONDES,
  LIMITE_APPELS_CREES_10_MIN,
  statutApresSignal,
  appelExpire,
  configIce,
  normaliserContenuSignal,
} from '../src/appels.js';
import { RegistreSocketsAppels } from '../src/appels_ws.js';

// ── Constantes ───────────────────────────────────────────────
test('constantes : types, signaux, statuts et délais décidés', () => {
  assert.deepEqual(TYPES_APPEL, ['audio', 'video']);
  assert.deepEqual(TYPES_SIGNAL_APPEL, [
    'offre',
    'reponse',
    'candidat_ice',
    'accepte',
    'refuse',
    'annule',
    'termine',
  ]);
  assert.deepEqual(STATUTS_APPEL, ['sonne', 'en_cours', 'termine', 'expire']);
  assert.equal(DUREE_SONNERIE_MS, 30000);
  assert.equal(DELAI_EXPIRATION_SONNERIE_SECONDES, 60);
  assert.equal(LIMITE_APPELS_CREES_10_MIN, 5);
  assert.equal(Object.isFrozen(TYPES_APPEL), true);
  assert.equal(Object.isFrozen(TYPES_SIGNAL_APPEL), true);
  assert.equal(Object.isFrozen(STATUTS_APPEL), true);
});

// ── Transitions de statut ────────────────────────────────────
test('statutApresSignal : acceptation, refus, annulation et fin', () => {
  assert.equal(statutApresSignal('sonne', 'accepte'), 'en_cours');
  assert.equal(statutApresSignal('sonne', 'refuse'), 'termine');
  assert.equal(statutApresSignal('sonne', 'annule'), 'termine');
  assert.equal(statutApresSignal('en_cours', 'termine'), 'termine');
  assert.equal(statutApresSignal('sonne', 'offre'), null);
  assert.equal(statutApresSignal('sonne', 'reponse'), null);
  assert.equal(statutApresSignal('sonne', 'candidat_ice'), null);
  assert.equal(statutApresSignal('en_cours', 'accepte'), null);
  assert.equal(statutApresSignal('termine', 'termine'), null);
  assert.equal(statutApresSignal('expire', 'accepte'), null);
});

// ── Expiration de la sonnerie ────────────────────────────────
test('appelExpire : 60 secondes après la création', () => {
  const maintenant = new Date('2026-11-16T23:00:00.000Z');
  assert.equal(appelExpire('2026-11-16T22:59:30.000Z', maintenant), false);
  assert.equal(appelExpire('2026-11-16T22:58:59.000Z', maintenant), true);
  assert.equal(appelExpire('date-invalide', maintenant), false);
});

// ── Contenu des signaux ──────────────────────────────────────
test('normaliserContenuSignal : offre, réponse et candidat ICE', () => {
  assert.deepEqual(
    normaliserContenuSignal('offre', { sdp: 'v=0\r\n', type: 'offer', extra: 1 }),
    { sdp: 'v=0\r\n', type: 'offer' },
  );
  assert.deepEqual(
    normaliserContenuSignal('reponse', { sdp: 'v=0\r\n', type: 'answer' }),
    { sdp: 'v=0\r\n', type: 'answer' },
  );
  assert.deepEqual(
    normaliserContenuSignal('candidat_ice', { candidate: 'candidate:1', sdpMid: '0', sdpMLineIndex: 0 }),
    { candidate: 'candidate:1', sdpMid: '0', sdpMLineIndex: 0 },
  );
  assert.deepEqual(normaliserContenuSignal('accepte', {}), {});
  assert.deepEqual(normaliserContenuSignal('termine', { raison: 'fin' }), {});
  assert.throws(() => normaliserContenuSignal('offre', {}), /SDP/);
  assert.throws(() => normaliserContenuSignal('offre', { sdp: 'v=0', type: 'answer' }), /incohérent/);
  assert.throws(() => normaliserContenuSignal('reponse', { sdp: '' }), /SDP/);
  assert.throws(() => normaliserContenuSignal('candidat_ice', {}), /Candidat ICE/);
  assert.throws(() => normaliserContenuSignal('candidat_ice', { candidate: 42 }), /Candidat ICE/);
  assert.throws(() => normaliserContenuSignal('inconnu', {}), /inconnu/);
  assert.throws(() => normaliserContenuSignal('offre', 'texte'), /invalide/);
  assert.throws(() => normaliserContenuSignal('offre', null), /invalide/);
});

// ── Configuration ICE ────────────────────────────────────────
test('configIce : STUN seul sans TURN, TURN en plus si configuré', () => {
  assert.deepEqual(configIce({}), {
    iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }],
  });
  assert.deepEqual(configIce({ TURN_URL: 'turn:relay.example:3478' }), {
    iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }],
  });
  assert.deepEqual(
    configIce({
      TURN_URL: 'turn:relay.example:3478',
      TURN_USERNAME: 'utilisateur',
      TURN_CREDENTIAL: 'mot-de-passe',
    }),
    {
      iceServers: [
        { urls: ['stun:stun.l.google.com:19302'] },
        {
          urls: ['turn:relay.example:3478'],
          username: 'utilisateur',
          credential: 'mot-de-passe',
        },
      ],
    },
  );
});

// ── Registre WebSocket ───────────────────────────────────────
test('RegistreSocketsAppels : inscription, diffusion et retrait', () => {
  const registre = new RegistreSocketsAppels();
  const recusA = [];
  const recusB = [];
  const fausseA = { readyState: 1, send: (m) => recusA.push(m) };
  const fausseB = { readyState: 1, send: (m) => recusB.push(m) };
  assert.equal(registre.diffuser('membre-1', '{}'), 0);
  registre.inscrire('membre-1', fausseA);
  registre.inscrire('membre-1', fausseB);
  registre.inscrire('membre-2', fausseA);
  assert.equal(registre.nombre('membre-1'), 2);
  assert.equal(registre.diffuser('membre-1', '{"type":"signal_appel"}'), 2);
  assert.deepEqual(recusA, ['{"type":"signal_appel"}']);
  assert.deepEqual(recusB, ['{"type":"signal_appel"}']);
  registre.retirer('membre-1', fausseA);
  assert.equal(registre.nombre('membre-1'), 1);
  assert.equal(registre.diffuser('membre-1', '{"type":"fin"}'), 1);
  assert.equal(recusA.length, 1);
  assert.equal(recusB.length, 2);
  registre.retirer('membre-1', fausseB);
  assert.equal(registre.nombre('membre-1'), 0);
  assert.equal(registre.nombre('membre-2'), 1);
});

test('RegistreSocketsAppels : une socket fermée ou en échec est retirée', () => {
  const registre = new RegistreSocketsAppels();
  const fermee = { readyState: 3, send: () => { throw new Error('fermée'); } };
  const enEchec = {
    readyState: 1,
    send: () => { throw new Error('envoi impossible'); },
  };
  const bonne = { readyState: 1, send: () => {} };
  registre.inscrire('membre-1', fermee);
  registre.inscrire('membre-1', enEchec);
  registre.inscrire('membre-1', bonne);
  assert.equal(registre.diffuser('membre-1', '{}'), 1);
  assert.equal(registre.nombre('membre-1'), 1);
});

// ── Routes présentes dans server.js (statique) ───────────────
test('routes : les 6 routes HTTP et la route WebSocket existent', () => {
  const serveur = fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'server.js'), 'utf8');
  for (const route of [
    "app.post('/messagerie/conversations/:id/appels'",
    "app.get('/messagerie/conversations/:id/appel_actif'",
    "app.get('/messagerie/appels/ice'",
    "app.get('/messagerie/appels/:id'",
    "app.get('/messagerie/appels/:id/signaux'",
    "app.post('/messagerie/appels/:id/signaux'",
    "app.get('/messagerie/ws', { websocket: true }",
  ]) {
    assert.ok(serveur.includes(route), `route manquante : ${route}`);
  }
  assert.ok(serveur.includes('CREATE TABLE IF NOT EXISTS appels ('), 'migration appels');
  assert.ok(serveur.includes('CREATE TABLE IF NOT EXISTS appels_signaux ('), 'migration appels_signaux');
  assert.ok(serveur.includes("await app.register(websocket);"), 'plugin WebSocket enregistré');
});

// ── Intégration (base de test seulement) ─────────────────────
// Gardée par TEST_DATABASE_URL, comme messagerie.test.js : sans
// base de test, seule la partie pure ci-dessus tourne.
const DATABASE_URL = process.env.TEST_DATABASE_URL || '';
const JWT_SECRET = process.env.TEST_JWT_SECRET || 'secret-de-test-pour-les-appels-messagerie';

if (DATABASE_URL) {
const DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3463;
const BASE = `http://127.0.0.1:${PORT}`;

const MDP = 'MotDePasseTest123';
const SUFFIXE = Date.now().toString(36);

let server;
async function attendreSante(delaiMaxMs = 60000) {
  const debut = Date.now();
  for (;;) {
    try {
      const r = await fetch(`${BASE}/sante`);
      if (r.ok) return;
    } catch (_) {}
    if (Date.now() - debut > delaiMaxMs) throw new Error('Le serveur de test ne démarre pas.');
    await new Promise((r) => setTimeout(r, 500));
  }
}

async function post(chemin, corps, jeton) {
  const r = await fetch(`${BASE}${chemin}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(jeton ? { authorization: `Bearer ${jeton}` } : {}),
    },
    body: corps === undefined ? undefined : JSON.stringify(corps),
  });
  let data = null;
  try { data = await r.json(); } catch (_) {}
  return { statut: r.status, data };
}

async function get(chemin, jeton) {
  const r = await fetch(`${BASE}${chemin}`, {
    headers: jeton ? { authorization: `Bearer ${jeton}` } : {},
  });
  let data = null;
  try { data = await r.json(); } catch (_) {}
  return { statut: r.status, data };
}

async function connexion(email) {
  const { statut, data } = await post('/auth/connexion', { identifiant: email, mot_de_passe: MDP });
  assert.equal(statut, 200, `connexion de ${email}`);
  return data.access;
}

const comptes = {};
let client;
let etabIspam;

async function creerCompte(clientPg, { email, role, nom }) {
  const hash = await argon2.hash(MDP, { type: argon2.argon2id });
  const u = (
    await clientPg.query(
      `INSERT INTO utilisateurs (email, mot_de_passe_hash, role) VALUES ($1,$2,$3) RETURNING id`,
      [email, hash, role],
    )
  ).rows[0];
  const membre = (
    await clientPg.query(
      `INSERT INTO membres (utilisateur_id, nom_complet, etablissement_id, fonction) VALUES ($1,$2,$3,'Membre') RETURNING id`,
      [u.id, nom, etabIspam.id],
    )
  ).rows[0];
  return { utilisateurId: u.id, membreId: membre.id };
}

test.before(async () => {
  server = fork(path.join(DIR, '..', 'server.js'), {
    env: { ...process.env, PORT: String(PORT), DATABASE_URL, JWT_SECRET, DATABASE_SSL: 'false' },
    silent: true,
  });
  await attendreSante();

  client = new pg.Client({ connectionString: DATABASE_URL });
  await client.connect();
  etabIspam = (await client.query(`SELECT id FROM etablissements WHERE nom = 'ISPAM'`)).rows[0];
  if (!etabIspam) etabIspam = (await client.query(`INSERT INTO etablissements (nom) VALUES ('ISPAM') RETURNING id`)).rows[0];

  comptes.a = await creerCompte(client, { email: `appel-a-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Appel A Test' });
  comptes.b = await creerCompte(client, { email: `appel-b-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Appel B Test' });
  comptes.c = await creerCompte(client, { email: `appel-c-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Appel C Test' });
  comptes.jetonA = await connexion(`appel-a-${SUFFIXE}@test.ci`);
  comptes.jetonB = await connexion(`appel-b-${SUFFIXE}@test.ci`);
  comptes.jetonC = await connexion(`appel-c-${SUFFIXE}@test.ci`);
});

test.after(async () => {
  if (client) await client.end().catch(() => {});
  if (server) server.kill('SIGTERM');
});

let convAB;
let convGroupe;

test('tables : appels et appels_signaux existent après migration', async () => {
  const tables = (
    await client.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'
        AND table_name IN ('appels','appels_signaux')`,
    )
  ).rows.map((r) => r.table_name);
  assert.equal(tables.length, 2, `tables manquantes : ${tables.join(',')}`);
});

test('appel : création en directe, conflit si déjà en cours, groupe refusé', async () => {
  const conv = await post('/messagerie/conversations', { type: 'directe', participant_member_ids: [comptes.b.membreId] }, comptes.jetonA);
  assert.equal(conv.statut, 201, `conversation directe : ${JSON.stringify(conv.data)}`);
  convAB = conv.data;
  const cree = await post(`/messagerie/conversations/${convAB.id}/appels`, { type: 'audio' }, comptes.jetonA);
  assert.equal(cree.statut, 201, `appel créé : ${JSON.stringify(cree.data)}`);
  assert.equal(cree.data.statut, 'sonne');
  assert.equal(cree.data.type, 'audio');
  assert.equal(cree.data.appele_id, comptes.b.membreId);
  const doublon = await post(`/messagerie/conversations/${convAB.id}/appels`, { type: 'video' }, comptes.jetonA);
  assert.equal(doublon.statut, 409, 'un second appel dans la même conversation : 409');
  const groupe = await post('/messagerie/conversations', { type: 'groupe_etablissement', participant_member_ids: [comptes.b.membreId] }, comptes.jetonA);
  assert.equal(groupe.statut, 201);
  convGroupe = groupe.data;
  const appelGroupe = await post(`/messagerie/conversations/${convGroupe.id}/appels`, { type: 'audio' }, comptes.jetonA);
  assert.equal(appelGroupe.statut, 400, 'appel en groupe : 400, directe seulement pour cette tranche');
  const sansJeton = await post(`/messagerie/conversations/${convAB.id}/appels`, { type: 'audio' });
  assert.equal(sansJeton.statut, 401, 'sans jeton : 401');
});

test('appel : cloche appel_entrant chez l’appelé, sans FCM configuré', async () => {
  const cloche = await get('/notifications', comptes.jetonB);
  assert.equal(cloche.statut, 200);
  assert.ok(
    cloche.data.notifications.some((n) => n.type === 'appel_entrant' && n.lien_type === 'appel'),
    'notification appel_entrant dans la cloche de l’appelé',
  );
});

test('appel : actif visible, isolation, configuration ICE', async () => {
  const actifA = await get(`/messagerie/conversations/${convAB.id}/appel_actif`, comptes.jetonA);
  assert.equal(actifA.statut, 200);
  assert.equal(actifA.data.appel?.statut, 'sonne', 'appel en sonnerie visible par l’appelant');
  assert.equal(actifA.data.appel?.appelant_nom, 'APPEL A TEST', 'nom de l’appelant en majuscules');
  const actifC = await get(`/messagerie/conversations/${convAB.id}/appel_actif`, comptes.jetonC);
  assert.equal(actifC.statut, 404, 'non participant : 404');
  const ice = await get('/messagerie/appels/ice', comptes.jetonA);
  assert.equal(ice.statut, 200);
  assert.ok(
    ice.data.iceServers.some((s) => (s.urls ?? []).includes('stun:stun.l.google.com:19302')),
    'STUN gratuit de Google présent',
  );
  assert.equal(ice.data.iceServers.length, 1, 'sans TURN configuré, STUN seul');
});

test('signaux : offre, réponse et candidat ICE, puis acceptation', async () => {
  const appelId = (await get(`/messagerie/conversations/${convAB.id}/appel_actif`, comptes.jetonA)).data.appel.id;
  const offreKo = await post(`/messagerie/appels/${appelId}/signaux`, { type: 'offre', contenu: {} }, comptes.jetonA);
  assert.equal(offreKo.statut, 400, 'offre sans SDP : 400');
  const offre = await post(`/messagerie/appels/${appelId}/signaux`, { type: 'offre', contenu: { sdp: 'v=0\r\n', type: 'offer' } }, comptes.jetonA);
  assert.equal(offre.statut, 201, `offre envoyée : ${JSON.stringify(offre.data)}`);
  const reponse = await post(`/messagerie/appels/${appelId}/signaux`, { type: 'reponse', contenu: { sdp: 'v=0\r\n', type: 'answer' } }, comptes.jetonB);
  assert.equal(reponse.statut, 201, 'réponse envoyée');
  const candidat = await post(`/messagerie/appels/${appelId}/signaux`, { type: 'candidat_ice', contenu: { candidate: 'candidate:1', sdpMid: '0', sdpMLineIndex: 0 } }, comptes.jetonA);
  assert.equal(candidat.statut, 201, 'candidat ICE envoyé');
  const liste = await get(`/messagerie/appels/${appelId}/signaux`, comptes.jetonB);
  assert.equal(liste.statut, 200);
  assert.deepEqual(liste.data.map((s) => s.type), ['offre', 'reponse', 'candidat_ice']);
  const accepte = await post(`/messagerie/appels/${appelId}/signaux`, { type: 'accepte', contenu: {} }, comptes.jetonB);
  assert.equal(accepte.statut, 201, 'acceptation envoyée');
  const appel = await get(`/messagerie/appels/${appelId}`, comptes.jetonA);
  assert.equal(appel.statut, 200);
  assert.equal(appel.data.statut, 'en_cours', 'appel en cours après acceptation');
  const signauxC = await get(`/messagerie/appels/${appelId}/signaux`, comptes.jetonC);
  assert.equal(signauxC.statut, 404, 'signaux pour un non participant : 404');
});

test('signaux : fin d’appel, puis refus d’un nouveau signal', async () => {
  const appelId = (await get(`/messagerie/conversations/${convAB.id}/appel_actif`, comptes.jetonA)).data.appel.id;
  const fin = await post(`/messagerie/appels/${appelId}/signaux`, { type: 'termine', contenu: {} }, comptes.jetonA);
  assert.equal(fin.statut, 201, 'fin envoyée');
  const appel = await get(`/messagerie/appels/${appelId}`, comptes.jetonA);
  assert.equal(appel.data.statut, 'termine', 'appel terminé');
  const actif = await get(`/messagerie/conversations/${convAB.id}/appel_actif`, comptes.jetonA);
  assert.equal(actif.data.appel, null, 'plus d’appel actif');
  const tardif = await post(`/messagerie/appels/${appelId}/signaux`, { type: 'candidat_ice', contenu: { candidate: 'candidate:2' } }, comptes.jetonA);
  assert.equal(tardif.statut, 409, 'signal après la fin : 409');
});

test('appel : refus par l’appelé, puis nouvel appel possible', async () => {
  const cree = await post(`/messagerie/conversations/${convAB.id}/appels`, { type: 'video' }, comptes.jetonA);
  assert.equal(cree.statut, 201, 'nouvel appel vidéo créé');
  const refuse = await post(`/messagerie/appels/${cree.data.id}/signaux`, { type: 'refuse', contenu: {} }, comptes.jetonB);
  assert.equal(refuse.statut, 201, 'refus envoyé');
  const appel = await get(`/messagerie/appels/${cree.data.id}`, comptes.jetonA);
  assert.equal(appel.data.statut, 'termine', 'appel refusé terminé');
});

test('websocket : sans jeton la socket se ferme en 4401, avec jeton elle reçoit le signal', async (t) => {
  const sansJeton = new WebSocket(`ws://127.0.0.1:${PORT}/messagerie/ws`);
  const codeFermeture = await new Promise((resolve) => {
    sansJeton.addEventListener('close', (e) => resolve(e.code));
    sansJeton.addEventListener('error', () => resolve(-1));
    setTimeout(() => resolve(-2), 5000);
  });
  assert.equal(codeFermeture, 4401, 'sans jeton : fermeture 4401');

  const cree = await post(`/messagerie/conversations/${convAB.id}/appels`, { type: 'audio' }, comptes.jetonA);
  assert.equal(cree.statut, 201);
  const appelId = cree.data.id;
  const socketB = new WebSocket(`ws://127.0.0.1:${PORT}/messagerie/ws?jeton=${encodeURIComponent(comptes.jetonB)}`);
  await new Promise((resolve, reject) => {
    socketB.addEventListener('open', resolve);
    socketB.addEventListener('error', reject);
    setTimeout(() => reject(new Error('WebSocket non ouvert en 5 secondes')), 5000);
  });
  const recu = new Promise((resolve) => {
    socketB.addEventListener('message', (e) => resolve(JSON.parse(e.data)));
    setTimeout(() => resolve(null), 5000);
  });
  const offre = await post(`/messagerie/appels/${appelId}/signaux`, { type: 'offre', contenu: { sdp: 'v=0\r\n', type: 'offer' } }, comptes.jetonA);
  assert.equal(offre.statut, 201);
  const message = await recu;
  assert.ok(message, 'signal reçu par WebSocket');
  assert.equal(message.type, 'signal_appel');
  assert.equal(message.appel_id, appelId);
  assert.equal(message.signal.type, 'offre');
  socketB.close();
  await post(`/messagerie/appels/${appelId}/signaux`, { type: 'annule', contenu: {} }, comptes.jetonA);
});

}
