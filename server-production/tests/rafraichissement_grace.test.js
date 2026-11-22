// Renouvellement : fenêtre de grâce de 60 secondes et limite par client.
// Le serveur réel est lancé en processus enfant sur une base
// PostgreSQL de test (ne JAMAIS pointer vers la production).
//
// Lancer :  TEST_DATABASE_URL=postgres://... npm test -- tests/rafraichissement_grace.test.js
// (une base fraîche par fichier, comme dans la boucle fidèle)
import test from 'node:test';
import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import { Client } from 'pg';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3460;
const BASE = `http://127.0.0.1:${PORT}`;
const DATABASE_URL = process.env.TEST_DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET || 'secret-test-32-caracteres-minimum-ok';

if (!DATABASE_URL) {
  console.error('TEST_DATABASE_URL manquant: <redacted>');
  process.exit(0);
}

const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');

let server;
let db;
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

test.before(async () => {
  server = fork(path.join(DIR, '..', 'server.js'), {
    env: { ...process.env, PORT: String(PORT), DATABASE_URL, JWT_SECRET, DATABASE_SSL: 'false' },
    silent: true,
  });
  await attendreSante();
  db = new Client({ connectionString: DATABASE_URL });
  await db.connect();
});

test.after(async () => {
  if (db) await db.end().catch(() => {});
  if (server) server.kill('SIGTERM');
});

async function post(chemin, corps, jeton, entetes = {}) {
  const r = await fetch(`${BASE}${chemin}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(jeton ? { authorization: `Bearer ${jeton}` } : {}),
      ...entetes,
    },
    body: JSON.stringify(corps),
  });
  let data = null;
  try { data = await r.json(); } catch (_) {}
  return { statut: r.status, data };
}

async function get(chemin, jeton, entetes = {}) {
  const r = await fetch(`${BASE}${chemin}`, {
    headers: { ...(jeton ? { authorization: `Bearer ${jeton}` } : {}), ...entetes },
  });
  let data = null;
  try { data = await r.json(); } catch (_) {}
  return { statut: r.status, data };
}

async function inscrire() {
  const email = `grace${Date.now()}${Math.floor(Math.random() * 100000)}@test.ci`;
  const { statut, data } = await post('/auth/inscription', {
    email,
    mot_de_passe: 'MotDePasseTest123',
    nom_complet: 'Testeur Grâce',
  });
  assert.equal(statut, 201);
  return { email, mdp: 'MotDePasseTest123', access: data.access, refresh: data.refresh };
}

// ── Fenêtre de grâce ─────────────────────────────────────────
test('grâce : rejouer le jeton dans les 60 s rend la même paire, sans nouveau jeton', async () => {
  const u = await inscrire();
  const r1 = await post('/auth/rafraichir', { refresh: u.refresh });
  assert.equal(r1.statut, 200);
  assert.equal(typeof r1.data.access, 'string');
  assert.equal(r1.data.refresh?.length, 64);
  // La réponse est "perdue" : le client représente l'ancien jeton.
  const r2 = await post('/auth/rafraichir', { refresh: u.refresh });
  assert.equal(r2.statut, 200);
  assert.deepEqual(r2.data, r1.data, 'même paire, aucun nouveau jeton créé');
  // La paire rendue est utilisable.
  const moi = await get('/moi', r2.data.access);
  assert.equal(moi.statut, 200);
  // Le nouveau jeton n'a pas été consommé par la grâce.
  const r3 = await post('/auth/rafraichir', { refresh: r1.data.refresh });
  assert.equal(r3.statut, 200);
  assert.notEqual(r3.data.refresh, r1.data.refresh);
});

// ── Rejeu hors fenêtre ───────────────────────────────────────
test('hors grâce : rejouer après 60 s donne 401 et révoque toute la famille', async () => {
  const u = await inscrire();
  const r1 = await post('/auth/rafraichir', { refresh: u.refresh });
  assert.equal(r1.statut, 200);
  // On vieillit la révocation de 61 secondes, côté base.
  await db.query(
    "UPDATE jetons_rafraichissement SET revoque_le = now() - interval '61 seconds' WHERE empreinte = $1",
    [sha256(u.refresh)],
  );
  const r2 = await post('/auth/rafraichir', { refresh: u.refresh });
  assert.equal(r2.statut, 401);
  // Toute la famille est révoquée : le jeton courant ne tourne plus.
  const r3 = await post('/auth/rafraichir', { refresh: r1.data.refresh });
  assert.equal(r3.statut, 401);
  // Le compte n'est pas bloqué : une nouvelle connexion fonctionne.
  const reco = await post('/auth/connexion', { identifiant: u.email, mot_de_passe: u.mdp });
  assert.equal(reco.statut, 200);
  assert.equal(typeof reco.data.refresh, 'string');
});

// ── Renouvellements simultanés ───────────────────────────────
test('simultanés : 5 renouvellements avec le même jeton, une seule paire émise', async () => {
  const u = await inscrire();
  const resultats = await Promise.all(
    Array.from({ length: 5 }, () => post('/auth/rafraichir', { refresh: u.refresh })),
  );
  for (const r of resultats) assert.equal(r.statut, 200);
  for (const r of resultats) assert.deepEqual(r.data, resultats[0].data, 'tous reçoivent la même paire');
});

// ── Déconnexion : 401 simple, famille intacte ────────────────
test('déconnexion : rejouer un jeton déconnecté donne 401 sans révoquer la famille', async () => {
  const u = await inscrire();
  const deco = await post('/auth/deconnexion', { refresh: u.refresh });
  assert.equal(deco.statut, 200);
  const r1 = await post('/auth/rafraichir', { refresh: u.refresh });
  assert.equal(r1.statut, 401);
  // Une nouvelle connexion fonctionne : la famille n'a pas été révoquée.
  const reco = await post('/auth/connexion', { identifiant: u.email, mot_de_passe: u.mdp });
  assert.equal(reco.statut, 200);
  const moi = await get('/moi', reco.data.access);
  assert.equal(moi.statut, 200);
});

// ── Limite par client réel ───────────────────────────────────
test('limite : deux clients derrière Cloudflare ont chacun leur seau de 120/min', async () => {
  const statuts = [];
  for (let i = 0; i < 121; i++) {
    const r = await get('/sante', null, { 'cf-connecting-ip': '10.9.9.1' });
    statuts.push(r.statut);
  }
  assert.ok(statuts.filter((s) => s === 429).length >= 1, 'le premier client finit limité');
  const autre = await get('/sante', null, { 'cf-connecting-ip': '10.9.9.2' });
  assert.equal(autre.statut, 200, 'le second client, autre adresse réelle, n’est pas limité');
});
