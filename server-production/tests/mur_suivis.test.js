// Tests d'intégration : Suivre et profil du mur des membres
// v2, tranche 4. Le serveur réel est lancé en processus
// enfant sur une base PostgreSQL de test (ne JAMAIS pointer
// vers la production).
//
// Lancer :  TEST_DATABASE_URL=postgresql://postgres@127.0.0.1:5432/<base> node --test tests/mur_suivis.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import pg from 'pg';
import argon2 from 'argon2';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3470;
const BASE = `http://127.0.0.1:${PORT}`;
const DATABASE_URL = process.env.TEST_DATABASE_URL;
const JWT_SECRET = crypto.randomUUID() + crypto.randomUUID();

if (!DATABASE_URL) {
  console.error('Base de test manquante.');
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

async function del(chemin, jeton) {
  const r = await fetch(`${BASE}${chemin}`, {
    method: 'DELETE',
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
  let membre = null;
  if (etablissementMembreId !== undefined) {
    membre = (
      await clientPg.query(
        `INSERT INTO membres (utilisateur_id, nom_complet, etablissement_id, fonction) VALUES ($1,$2,$3,'Membre') RETURNING id`,
        [u.id, nom, etablissementMembreId],
      )
    ).rows[0];
  }
  return { utilisateurId: u.id, membreId: membre?.id ?? null };
}

async function compterNotifications(membreId, type) {
  const ligne = (await client.query(
    `SELECT COUNT(*)::int AS n FROM notifications WHERE membre_id = $1 AND type = $2`,
    [membreId, type],
  )).rows[0];
  return ligne.n;
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

  comptes.a = await creerCompte(client, { email: `membre-a-mursuivis-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Membre A Suivis', etablissementMembreId: etab.id });
  comptes.b = await creerCompte(client, { email: `membre-b-mursuivis-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Membre B Suivis', etablissementMembreId: etab.id });
  comptes.jetonA = await connexion(`membre-a-mursuivis-${SUFFIXE}@test.ci`);
  comptes.jetonB = await connexion(`membre-b-mursuivis-${SUFFIXE}@test.ci`);
  await client.query(`UPDATE membres SET presentation = $1 WHERE id = $2`, ['Membre depuis 2025.', comptes.a.membreId]);
});

test.after(async () => {
  if (client) await client.end().catch(() => {});
  if (server) server.kill('SIGTERM');
});

let publicationA1;

test('profil : compteurs, publications et suivi_par_moi, sans matricule', async () => {
  const p1 = await post('/mur', { texte: 'Premier mot.', categorie: 'temoignage' }, comptes.jetonA);
  assert.equal(p1.statut, 201);
  publicationA1 = p1.data.publication.id;
  const p2 = await post('/mur', { texte: 'Deuxième mot.', categorie: 'verset' }, comptes.jetonA);
  assert.equal(p2.statut, 201);
  const aime = await post('/aimes', { cible_type: 'mur', cible_id: publicationA1, type: 'jaime' }, comptes.jetonB);
  assert.equal(aime.statut, 201);

  const profil = await get(`/mur/membres/${comptes.a.membreId}`, comptes.jetonB);
  assert.equal(profil.statut, 200, JSON.stringify(profil.data));
  const m = profil.data.membre;
  assert.equal(m.nom_complet, 'Membre A Suivis');
  assert.equal(m.fonction, 'Membre');
  assert.equal(m.etablissement_nom, 'ISPAM');
  assert.equal(m.presentation, 'Membre depuis 2025.');
  assert.equal('matricule' in m, false, 'jamais le matricule sur le profil');
  assert.equal(m.nb_publications, 2);
  assert.equal(m.nb_reactions, 1);
  assert.equal(m.nb_abonnes, 0);
  assert.equal(m.nb_abonnements, 0);
  assert.equal(m.suivi_par_moi, false);
  assert.equal(m.est_moi, false);
  assert.equal(profil.data.publications.length, 2);
  assert.equal(profil.data.publications[0].texte, 'Deuxième mot.', 'la plus récente d’abord');

  const inconnu = await get(`/mur/membres/${crypto.randomUUID()}`, comptes.jetonB);
  assert.equal(inconnu.statut, 404);
  const invalide = await get('/mur/membres/pas-un-uuid', comptes.jetonB);
  assert.equal(invalide.statut, 404);
});

test('suivre : idempotent, une cloche, listes, puis ne plus suivre', async () => {
  const suivi = await post('/mur/suivis', { suivi_id: comptes.a.membreId }, comptes.jetonB);
  assert.equal(suivi.statut, 200, JSON.stringify(suivi.data));
  assert.equal(suivi.data.suivi, true);
  assert.equal(await compterNotifications(comptes.a.membreId, 'mur_suivi'), 1, 'une cloche pour le nouveau suiveur');

  const encore = await post('/mur/suivis', { suivi_id: comptes.a.membreId }, comptes.jetonB);
  assert.equal(encore.statut, 200, 'déjà suivi, toujours 200');
  assert.equal(await compterNotifications(comptes.a.membreId, 'mur_suivi'), 1, 'pas de nouvelle cloche');

  const profil = await get(`/mur/membres/${comptes.a.membreId}`, comptes.jetonB);
  assert.equal(profil.data.membre.suivi_par_moi, true);
  assert.equal(profil.data.membre.nb_abonnes, 1);

  const abonnes = await get(`/mur/membres/${comptes.a.membreId}/abonnes`, comptes.jetonB);
  assert.equal(abonnes.statut, 200);
  assert.equal(abonnes.data.membres.length, 1);
  assert.equal(abonnes.data.membres[0].nom_complet, 'Membre B Suivis');
  assert.equal(abonnes.data.membres[0].etablissement_nom, 'ISPAM');
  assert.equal('photo' in abonnes.data.membres[0], false, 'sans photo en liste');

  const abonnements = await get(`/mur/membres/${comptes.b.membreId}/abonnements`, comptes.jetonB);
  assert.equal(abonnements.statut, 200);
  assert.equal(abonnements.data.membres.length, 1);
  assert.equal(abonnements.data.membres[0].nom_complet, 'Membre A Suivis');

  const soi = await post('/mur/suivis', { suivi_id: comptes.b.membreId }, comptes.jetonB);
  assert.equal(soi.statut, 400, 'impossible de se suivre soi-même');
  const absent = await post('/mur/suivis', { suivi_id: crypto.randomUUID() }, comptes.jetonB);
  assert.equal(absent.statut, 404);

  const retrait = await del(`/mur/suivis/${comptes.a.membreId}`, comptes.jetonB);
  assert.equal(retrait.statut, 200);
  assert.equal(retrait.data.suivi, false);
  const apres = await get(`/mur/membres/${comptes.a.membreId}`, comptes.jetonB);
  assert.equal(apres.data.membre.suivi_par_moi, false);
  assert.equal(apres.data.membre.nb_abonnes, 0);
  const encoreRetrait = await del(`/mur/suivis/${comptes.a.membreId}`, comptes.jetonB);
  assert.equal(encoreRetrait.statut, 404, 'suivi déjà retiré');
});

test('profil : pagination des publications par curseur', async () => {
  const p3 = await post('/mur', { texte: 'Troisième mot.', categorie: 'autre' }, comptes.jetonA);
  assert.equal(p3.statut, 201);
  const page1 = await get(`/mur/membres/${comptes.a.membreId}?limite=2`, comptes.jetonB);
  assert.equal(page1.statut, 200);
  assert.equal(page1.data.publications.length, 2);
  assert.ok(page1.data.suivante, 'un curseur pour la suite');
  const page2 = await get(`/mur/membres/${comptes.a.membreId}?limite=2&avant=${page1.data.suivante}`, comptes.jetonB);
  assert.equal(page2.statut, 200);
  assert.equal(page2.data.publications.length, 1);
  assert.equal(page2.data.publications[0].id, publicationA1, 'la plus ancienne en dernier');
});
