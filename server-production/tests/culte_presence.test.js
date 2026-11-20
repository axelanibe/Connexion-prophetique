// Tests du prochain culte et de la confirmation de présence,
// tranche 1, 19 nov. 2026.
//
// Intégration seulement : lance le serveur réel en processus
// enfant sur une base PostgreSQL de test (ne JAMAIS pointer
// vers la production), comme appels_messagerie.test.js ; sans
// TEST_DATABASE_URL, elle s'arrête (code 0), comme les autres
// tests d'intégration du dépôt.
//
// Lancer :  TEST_DATABASE_URL=<redacted>
// ou simplement : npm test   (avec .env.test, voir ci-dessous)
import test from 'node:test';
import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import argon2 from 'argon2';

// ── Gardée par TEST_DATABASE_URL ─────────────────────────────────
const DATABASE_URL = process.env.TEST_DATABASE_URL ?? '';
const JWT_SECRET = process.env.TEST_JWT_SECRET ?? 'secret-test';

if (DATABASE_URL) {
const DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3464;
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

  comptes.admin = await creerCompte(client, { email: `culte-admin-${SUFFIXE}@test.ci`, role: 'admin_general', nom: 'Culte Admin Test' });
  comptes.a = await creerCompte(client, { email: `culte-a-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Culte A Test' });
  comptes.b = await creerCompte(client, { email: `culte-b-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Culte B Test' });
  comptes.jetonAdmin = await connexion(`culte-admin-${SUFFIXE}@test.ci`);
  comptes.jetonA = await connexion(`culte-a-${SUFFIXE}@test.ci`);
  comptes.jetonB = await connexion(`culte-b-${SUFFIXE}@test.ci`);
});

test.after(async () => {
  if (client) await client.end().catch(() => {});
  if (server) server.kill('SIGTERM');
});

let culte;
let cultePasse;
let camp;

test('migration : le type culte existe dans l’énumération des événements', async () => {
  const r = await client.query(`SELECT 'culte' = ANY(enum_range(NULL::type_evenement)) AS ok`);
  assert.equal(r.rows[0].ok, true, 'culte dans type_evenement');
  const methode = await client.query(
    `SELECT conname FROM pg_constraint WHERE conrelid = 'presences'::regclass AND pg_get_constraintdef(oid) LIKE '%confirmation%'`,
  );
  assert.equal(methode.rows.length, 1, 'confirmation dans la contrainte de methode de presences');
});

test('culte : création par la structure, visible dans la liste publique', async () => {
  const cree = await post('/admin/evenements', { type: 'culte', nom: 'Culte dominical', date_debut: '2027-01-03', heure_debut: '09:00', lieu: 'Bureau National', publie: true }, comptes.jetonAdmin);
  assert.equal(cree.statut, 201, `culte créé : ${JSON.stringify(cree.data)}`);
  assert.equal(cree.data.type, 'culte');
  culte = cree.data;
  const liste = await get('/evenements');
  assert.equal(liste.statut, 200);
  const trouve = (liste.data ?? []).find((e) => e.id === culte.id);
  assert.ok(trouve, 'culte dans GET /evenements');
  assert.equal(trouve.type, 'culte');
  assert.equal(trouve.heure_debut.slice(0, 5), '09:00');
  assert.ok('etablissement_nom' in trouve, 'nom d’établissement renvoyé');
});

test('culte : un camp reste un camp, pas un culte', async () => {
  const cree = await post('/admin/evenements', { type: 'camp', nom: 'Camp Test Culte', date_debut: '2027-02-01', publie: true }, comptes.jetonAdmin);
  assert.equal(cree.statut, 201);
  camp = cree.data;
  const passe = await post('/admin/evenements', { type: 'culte', nom: 'Culte passé', date_debut: '2020-01-05', heure_debut: '09:00', publie: true }, comptes.jetonAdmin);
  assert.equal(passe.statut, 201);
  cultePasse = passe.data;
});

test('présence : confirmation, doublon 409, lecture, annulation, reprise', async () => {
  const confirme = await post(`/moi/presences/${culte.id}`, {}, comptes.jetonA);
  assert.equal(confirme.statut, 201, `confirmation : ${JSON.stringify(confirme.data)}`);
  assert.equal(confirme.data.statut, 'present');
  assert.equal(confirme.data.methode, 'confirmation');
  const doublon = await post(`/moi/presences/${culte.id}`, {}, comptes.jetonA);
  assert.equal(doublon.statut, 409, 'une seule confirmation par membre');
  const mienne = await get(`/moi/presences/${culte.id}`, comptes.jetonA);
  assert.equal(mienne.statut, 200);
  assert.equal(mienne.data.statut, 'present');
  const liste = await get(`/presences/activite/${culte.id}`, comptes.jetonAdmin);
  assert.equal(liste.statut, 200);
  const entree = (liste.data.entrees ?? []).find((e) => e.membre_id === comptes.a.membreId);
  assert.ok(entree, 'le membre est dans la liste de présence du culte');
  assert.equal(entree.statut, 'present');
  const annule = await post(`/moi/presences/${culte.id}/annuler`, {}, comptes.jetonA);
  assert.equal(annule.statut, 200, `annulation : ${JSON.stringify(annule.data)}`);
  assert.equal(annule.data.statut, 'annule');
  const apres = await get(`/moi/presences/${culte.id}`, comptes.jetonA);
  assert.equal(apres.data.statut, 'annule');
  const reprise = await post(`/moi/presences/${culte.id}`, {}, comptes.jetonA);
  assert.equal(reprise.statut, 201, 'reprise après annulation');
  assert.equal(reprise.data.statut, 'present');
});

test('présence : refus pour un camp, un culte passé, sans jeton, inconnu, ou jamais confirmé', async () => {
  const surCamp = await post(`/moi/presences/${camp.id}`, {}, comptes.jetonA);
  assert.equal(surCamp.statut, 403, 'un camp n’est pas un culte');
  const surPasse = await post(`/moi/presences/${cultePasse.id}`, {}, comptes.jetonA);
  assert.equal(surPasse.statut, 400, 'un culte passé ne se confirme pas');
  const sansJeton = await post(`/moi/presences/${culte.id}`, {});
  assert.equal(sansJeton.statut, 401, 'sans jeton : 401');
  const inconnu = await post('/moi/presences/00000000-0000-0000-0000-000000000000', {}, comptes.jetonA);
  assert.equal(inconnu.statut, 404, 'culte inconnu : 404');
  const annulerSans = await post(`/moi/presences/${culte.id}/annuler`, {}, comptes.jetonB);
  assert.equal(annulerSans.statut, 404, 'annuler sans présence : 404');
});
}
