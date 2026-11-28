// Tests d'intégration : Élections côté membre, salve 28 nov. 2026.
// Scores en direct pendant le vote, vote unique, vote privé : on
// ne voit que les chiffres, jamais qui a voté pour qui.
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
const PORT = 3463;
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
let electionId;

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
  return { utilisateurId: u.id, membreId: membre.id, matricule: membre.matricule };
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

  comptes.admin = await creerCompte(client, { email: `ag-elec-${SUFFIXE}@test.ci`, role: 'admin_general', nom: 'Admin General Test', etablissementMembreId: etab.id });
  comptes.cand1 = await creerCompte(client, { email: `cand1-elec-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Awa Diallo Test', etablissementMembreId: etab.id });
  comptes.cand2 = await creerCompte(client, { email: `cand2-elec-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Jean Aka Test', etablissementMembreId: etab.id });
  comptes.votant1 = await creerCompte(client, { email: `vot1-elec-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Marie Yao Test', etablissementMembreId: etab.id });
  comptes.votant2 = await creerCompte(client, { email: `vot2-elec-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Paul Koffi Test', etablissementMembreId: etab.id });

  comptes.jetonAdmin = await connexion(`ag-elec-${SUFFIXE}@test.ci`);
  comptes.jetonV1 = await connexion(`vot1-elec-${SUFFIXE}@test.ci`);
  comptes.jetonV2 = await connexion(`vot2-elec-${SUFFIXE}@test.ci`);

  const debut = new Date(Date.now() - 86400000).toISOString();
  const fin = new Date(Date.now() + 86400000).toISOString();
  const creation = await post('/admin/elections', {
    titre: 'Élection du Bureau',
    description: 'Test des scores en direct.',
    poste: 'Président',
    date_debut: debut,
    date_fin: fin,
    candidats: [{ matricule: comptes.cand1.matricule }, { matricule: comptes.cand2.matricule }],
  }, comptes.jetonAdmin);
  assert.equal(creation.statut, 201, `création de l’élection : ${JSON.stringify(creation.data)}`);
  electionId = creation.data.id;
});

test.after(async () => {
  if (client) await client.end().catch(() => {});
  if (server) server.kill('SIGTERM');
});

// ── Élection actuelle, côté membre ────────────────────────────
test('actuelle : les candidats portent leurs voix en direct, total zéro avant tout vote', async () => {
  const r = await get('/elections/actuelle', comptes.jetonV1);
  assert.equal(r.statut, 200);
  assert.ok(r.data.election, 'une élection est en cours');
  assert.equal(r.data.election.id, electionId);
  assert.equal(r.data.election.total_voix, 0, 'aucune voix avant le vote');
  assert.equal(r.data.election.candidats.length, 2);
  for (const c of r.data.election.candidats) assert.equal(c.voix, 0);
  assert.equal(r.data.election.a_vote, false);
  assert.equal(JSON.stringify(r.data).includes('membre_id'), false, 'aucune identité de votant');
});

test('vote : un vote fait monter le score en direct, visible par les autres membres', async () => {
  const actuelle = (await get('/elections/actuelle', comptes.jetonV1)).data.election;
  const cible = actuelle.candidats.find((c) => c.nom === 'Awa Diallo Test');
  assert.ok(cible, 'la candidate Awa Diallo Test est dans l’élection');
  const vote = await post(`/elections/${electionId}/voter`, { candidat_id: cible.id }, comptes.jetonV1);
  assert.equal(vote.statut, 200, `vote : ${JSON.stringify(vote.data)}`);

  const apres = (await get('/elections/actuelle', comptes.jetonV2)).data.election;
  assert.equal(apres.total_voix, 1, 'une voix au total');
  assert.equal(apres.candidats.find((c) => c.id === cible.id).voix, 1, 'le candidat choisi a une voix');
  assert.equal(apres.a_vote, false, 'le deuxième membre n’a pas encore voté');
  assert.equal(JSON.stringify(apres).includes('membre_id'), false, 'aucune identité de votant');

  const mienne = (await get('/elections/actuelle', comptes.jetonV1)).data.election;
  assert.equal(mienne.a_vote, true, 'le votant voit son propre vote');
  assert.equal(mienne.mon_candidat_id, cible.id);
});

test('vote unique : un deuxième vote est refusé en 409', async () => {
  const actuelle = (await get('/elections/actuelle', comptes.jetonV1)).data.election;
  const autre = actuelle.candidats.find((c) => c.id !== actuelle.mon_candidat_id);
  const second = await post(`/elections/${electionId}/voter`, { candidat_id: autre.id }, comptes.jetonV1);
  assert.equal(second.statut, 409, 'deuxième vote refusé');
  const apres = (await get('/elections/actuelle', comptes.jetonV2)).data.election;
  assert.equal(apres.total_voix, 1, 'le total n’a pas bougé');
});

test('resultats : les totaux sont lisibles pendant le vote, sans identité de votant', async () => {
  const r = await get(`/elections/${electionId}/resultats`, comptes.jetonV2);
  assert.equal(r.statut, 200, 'résultats lisibles pendant le vote');
  assert.equal(r.data.total_voix, 1);
  assert.equal(r.data.resultats.length, 2);
  assert.equal(r.data.resultats.reduce((s, x) => s + x.voix, 0), 1);
  assert.equal(r.data.election.statut, 'en_cours');
  assert.equal(JSON.stringify(r.data).includes('membre_id'), false, 'aucune identité de votant');

  const vote2 = await post(`/elections/${electionId}/voter`, {
    candidat_id: r.data.resultats.find((x) => x.voix === 0).candidat_id,
  }, comptes.jetonV2);
  assert.equal(vote2.statut, 200);
  const apres = await get(`/elections/${electionId}/resultats`, comptes.jetonV1);
  assert.equal(apres.data.total_voix, 2, 'deux voix au total');
  assert.equal(apres.data.resultats[0].voix, 1);
  assert.equal(apres.data.resultats[1].voix, 1);
});

test('resultats : 404 pour une élection inexistante', async () => {
  const r = await get('/elections/00000000-0000-0000-0000-000000000000/resultats', comptes.jetonV1);
  assert.equal(r.statut, 404);
});
