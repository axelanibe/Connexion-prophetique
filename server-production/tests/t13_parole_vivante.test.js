// Tests T13, 26 nov. 2026 : Parole vivante audio, catégories des
// enseignements et sélections audio de la structure. Serveur réel
// en processus enfant sur une base de test (ne JAMAIS pointer
// vers la production).
import test from 'node:test';
import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import argon2 from 'argon2';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3461;
const BASE = `http://127.0.0.1:${PORT}`;
const DATABASE_URL = process.env.TEST_DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

if (!DATABASE_URL) {
  console.error('TEST_DATABASE_URL manquant.');
  process.exit(0);
}

let server;
let client;
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
    body: JSON.stringify(corps),
  });
  let data = null;
  try { data = await r.json(); } catch (_) {}
  return { statut: r.status, data };
}

async function put(chemin, corps, jeton) {
  const r = await fetch(`${BASE}${chemin}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      ...(jeton ? { authorization: `Bearer ${jeton}` } : {}),
    },
    body: JSON.stringify(corps),
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

async function supprimer(chemin, jeton) {
  const r = await fetch(`${BASE}${chemin}`, {
    method: 'DELETE',
    headers: jeton ? { authorization: `Bearer ${jeton}` } : {},
  });
  let data = null;
  try { data = await r.json(); } catch (_) {}
  return { statut: r.status, data };
}

const EMAIL_MEMBRE = `t13-${Date.now()}@test.ci`;
const MDP = 'MotDePasseTest123';
let jetonMembre;
let jetonAdmin;

test.before(async () => {
  server = fork(path.join(DIR, '..', 'server.js'), {
    env: { ...process.env, PORT: String(PORT), DATABASE_URL, JWT_SECRET, DATABASE_SSL: 'false' },
    silent: true,
  });
  await attendreSante();
  client = new pg.Client({ connectionString: DATABASE_URL });
  await client.connect();
  const hashAdmin = await argon2.hash(MDP, { type: argon2.argon2id });
  const admin = (
    await client.query(
      "INSERT INTO utilisateurs (email, mot_de_passe_hash, role) VALUES ('admin@test.ci',$1,'admin_general') RETURNING id",
      [hashAdmin],
    )
  ).rows[0];
  await client.query("INSERT INTO membres (utilisateur_id, nom_complet) VALUES ($1,'Admin Test')", [admin.id]);
  const loginAdmin = await post('/auth/connexion', { identifiant: 'admin@test.ci', mot_de_passe: MDP });
  assert.equal(loginAdmin.statut, 200);
  jetonAdmin = loginAdmin.data.access;
  const inscription = await post('/auth/inscription', {
    email: EMAIL_MEMBRE,
    mot_de_passe: MDP,
    nom_complet: 'Testeur T13',
  });
  assert.equal(inscription.statut, 202);
  const u = (await client.query('SELECT id FROM utilisateurs WHERE lower(email) = lower($1)', [EMAIL_MEMBRE])).rows[0];
  const codeHash = await argon2.hash('123456', { type: argon2.argon2id });
  await client.query(
    "INSERT INTO codes_verification_email (utilisateur_id, email, code_hash, expire_le) VALUES ($1,$2,$3, now() + interval '30 minutes')",
    [u.id, EMAIL_MEMBRE, codeHash],
  );
  const verif = await post('/auth/verifier-email', { email: EMAIL_MEMBRE, code: '123456' });
  assert.equal(verif.statut, 200);
  jetonMembre = verif.data.access;
});

test.after(async () => {
  if (client) await client.end().catch(() => {});
  if (server) server.kill('SIGTERM');
});

// ── Catégories des audios ────────────────────────────────────
test('T13, enseignements : catégorie choisie, « Enseignement » par défaut, hors liste refusée', async () => {
  const avec = await post('/admin/enseignements', { titre: 'Audio T13 Podcast', orateur: 'Orateur T13', categorie: 'Podcast', duree: '12:34' }, jetonAdmin);
  assert.equal(avec.statut, 201);
  assert.equal(avec.data.categorie, 'Podcast');
  assert.equal(avec.data.duree, '12:34');
  const sans = await post('/admin/enseignements', { titre: 'Audio T13 Sans Categorie', orateur: 'Orateur T13' }, jetonAdmin);
  assert.equal(sans.statut, 201);
  assert.equal(sans.data.categorie, 'Enseignement');
  const mauvais = await post('/admin/enseignements', { titre: 'Audio T13 Mauvais', categorie: 'Roman' }, jetonAdmin);
  assert.equal(mauvais.statut, 400);
  const liste = await get('/enseignements');
  assert.equal(liste.statut, 200);
  const trouve = liste.data.find((a) => a.titre === 'AUDIO T13 PODCAST');
  assert.ok(trouve, 'audio avec catégorie dans le catalogue public');
  assert.equal(trouve.categorie, 'Podcast');
  const modifie = await put(`/admin/enseignements/${avec.data.id}`, { categorie: 'Musique' }, jetonAdmin);
  assert.equal(modifie.statut, 200);
  assert.equal(modifie.data.categorie, 'Musique');
  const liste2 = await get('/enseignements');
  assert.equal(liste2.data.find((a) => a.id === avec.data.id).categorie, 'Musique');
});

test('T13, enseignements : un membre ne publie pas', async () => {
  const r = await post('/admin/enseignements', { titre: 'Audio T13 Membre', categorie: 'Podcast' }, jetonMembre);
  assert.equal(r.statut, 403);
});

// ── Sélections audio ─────────────────────────────────────────
test('T13, selections-audio : CRUD admin, lecture publique, membre refusé', async () => {
  const audio = await post('/admin/enseignements', { titre: 'Audio T13 Selection', orateur: 'Orateur T13', categorie: 'Enseignement' }, jetonAdmin);
  assert.equal(audio.statut, 201);
  const cree = await post('/admin/selections-audio', { titre: 'Selection T13', description: 'Choix de la structure', audio_ids: [audio.data.id], ordre: 1 }, jetonAdmin);
  assert.equal(cree.statut, 201);
  assert.equal(cree.data.titre, 'SELECTION T13');
  assert.deepEqual(cree.data.audio_ids, [audio.data.id]);
  const refuse = await post('/admin/selections-audio', { titre: 'Selection T13 Membre' }, jetonMembre);
  assert.equal(refuse.statut, 403);
  const liste = await get('/selections-audio');
  assert.equal(liste.statut, 200);
  const trouve = liste.data.find((s) => s.id === cree.data.id);
  assert.ok(trouve, 'sélection dans la liste publique');
  assert.deepEqual(trouve.audio_ids, [audio.data.id]);
  const modifie = await put(`/admin/selections-audio/${cree.data.id}`, { titre: 'Selection T13 Modifiee', audio_ids: [] }, jetonAdmin);
  assert.equal(modifie.statut, 200);
  assert.equal(modifie.data.titre, 'SELECTION T13 MODIFIEE');
  assert.deepEqual(modifie.data.audio_ids, []);
  const supprime = await supprimer(`/admin/selections-audio/${cree.data.id}`, jetonAdmin);
  assert.equal(supprime.statut, 200);
  const liste2 = await get('/selections-audio');
  assert.equal(liste2.data.find((s) => s.id === cree.data.id), undefined);
  const supprimeAbsent = await supprimer(`/admin/selections-audio/${cree.data.id}`, jetonAdmin);
  assert.equal(supprimeAbsent.statut, 404);
});

test('T13, selections-audio : titre requis', async () => {
  const r = await post('/admin/selections-audio', { description: 'Sans titre' }, jetonAdmin);
  assert.equal(r.statut, 400);
});
