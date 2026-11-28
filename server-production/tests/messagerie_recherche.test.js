// Tests d'intégration : recherche de membres en messagerie, salve
// 28 nov. 2026. Recherche par mot, dès 1 caractère, un mot au
// milieu du nom suffit, début de matricule, et liste des membres
// déjà en conversation quand la recherche est vide.
// Le serveur réel est lancé en processus enfant sur une base
// PostgreSQL de test (ne JAMAIS pointer vers la production).
import test from 'node:test';
import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import argon2 from 'argon2';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3464;
const BASE = `http://127.0.0.1:${PORT}`;
const DATABASE_URL = process.env.TEST_DATABASE_URL ?? '';
const JWT_SECRET = process.env.JWT_SECRET ?? 'secret-test';

if (!DATABASE_URL) {
  console.error('TEST_DATABASE_URL manquant: <redacted>');
  process.exit(0);
}

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

async function creerCompte(clientPg, { email, role, nom, etablissementMembreId }) {
  const hash = await argon2.hash(MDP, { type: argon2.argon2id });
  const u = (
    await clientPg.query(
      `INSERT INTO utilisateurs (email, mot_de_passe_hash, role) VALUES ($1,$2,$3) RETURNING id`,
      [email, hash, role],
    )
  ).rows[0];
  const membre = (
    await clientPg.query(
      `INSERT INTO membres (utilisateur_id, nom_complet, etablissement_id, fonction) VALUES ($1,$2,$3,'Membre') RETURNING id, matricule`,
      [u.id, nom, etablissementMembreId],
    )
  ).rows[0];
  return { utilisateurId: u.id, membreId: membre.id, matricule: membre.matricule, nom };
}

test.before(async () => {
  server = fork(path.join(DIR, '..', 'server.js'), {
    env: { ...process.env, PORT: String(PORT), DATABASE_URL, JWT_SECRET, DATABASE_SSL: 'false' },
    silent: true,
  });
  await attendreSante();

  client = new pg.Client({ connectionString: DATABASE_URL });
  await client.connect();
  let etab = (await client.query(`SELECT id FROM etablissements WHERE nom = 'ISPAM'`)).rows[0];
  if (!etab) etab = (await client.query(`INSERT INTO etablissements (nom) VALUES ('ISPAM') RETURNING id`)).rows[0];

  comptes.a = await creerCompte(client, { email: `a-rech-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Awa Marie Diallo', etablissementMembreId: etab.id });
  comptes.b = await creerCompte(client, { email: `b-rech-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Jean Aka Yao', etablissementMembreId: etab.id });
  comptes.c = await creerCompte(client, { email: `c-rech-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Paul Yao Kone', etablissementMembreId: etab.id });
  comptes.jetonA = await connexion(`a-rech-${SUFFIXE}@test.ci`);

  // Conversation directe A-B, pour la liste sans recherche.
  const conv = (await client.query(
    `INSERT INTO conversations (type, created_by) VALUES ('directe', $1) RETURNING id`,
    [comptes.a.membreId],
  )).rows[0];
  await client.query(
    `INSERT INTO conversation_participants (conversation_id, member_id) VALUES ($1,$2),($1,$3)`,
    [conv.id, comptes.a.membreId, comptes.b.membreId],
  );
});

test.after(async () => {
  if (client) await client.end().catch(() => {});
  if (server) server.kill('SIGTERM');
});

function noms(r) {
  // La route renvoie un tableau nu, pas un objet { membres }.
  return (Array.isArray(r.data) ? r.data : []).map((m) => m.nom_complet);
}

// ── Recherche par mot ─────────────────────────────────────────
test('recherche : un caractère suffit, plus de 400', async () => {
  const r = await get('/messagerie/membres?q=j', comptes.jetonA);
  assert.equal(r.statut, 200, `1 caractère accepté : ${JSON.stringify(r.data)}`);
  assert.ok(noms(r).includes('Jean Aka Yao'), 'Jean trouvé avec « j »');
});

test('recherche : un mot au milieu du nom suffit, pas seulement le préfixe', async () => {
  // « aka » est au milieu de « Jean Aka Yao ». « marie » ne
  // conviendrait pas ici : la seule Marie est la demandeuse
  // elle-même, exclue de sa propre recherche.
  const r = await get('/messagerie/membres?q=aka', comptes.jetonA);
  assert.equal(r.statut, 200);
  assert.deepEqual(noms(r), ['Jean Aka Yao'], 'seul Jean porte « aka »');
});

test('recherche : un mot commun retrouve plusieurs membres, combinaison en ET', async () => {
  const r = await get('/messagerie/membres?q=yao', comptes.jetonA);
  assert.equal(r.statut, 200);
  assert.deepEqual(noms(r).sort(), ['Jean Aka Yao', 'Paul Yao Kone'].sort());
  const et = await get('/messagerie/membres?q=yao%20jean', comptes.jetonA);
  assert.deepEqual(noms(et), ['Jean Aka Yao'], '« yao jean » ne garde que Jean');
});

test('recherche : début de matricule, et rien trouvé donne une liste vide', async () => {
  const debut = comptes.b.matricule.slice(0, 4);
  const r = await get(`/messagerie/membres?q=${encodeURIComponent(debut)}`, comptes.jetonA);
  assert.equal(r.statut, 200);
  assert.ok(noms(r).includes('Jean Aka Yao'), `matricule ${debut} retrouvé`);
  const vide = await get('/messagerie/membres?q=zzzzintrouvable', comptes.jetonA);
  assert.equal(vide.statut, 200);
  assert.deepEqual(vide.data, [], 'aucun membre, liste vide');
});

test('recherche vide : les membres déjà en conversation seulement', async () => {
  const r = await get('/messagerie/membres', comptes.jetonA);
  assert.equal(r.statut, 200);
  assert.deepEqual(noms(r), ['Jean Aka Yao'], 'seul B est en conversation avec A');
});
