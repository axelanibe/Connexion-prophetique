// Tests de sécurité, 22 nov. 2026 : compteur de demandes de code
// en base (MO-25 a, B-22), renvoi de code générique (MO-25 b),
// create-admin sans mot de passe en argument (B-13). Serveur réel
// en processus enfant, base PostgreSQL de test fraîche
// (ne JAMAIS pointer vers la production).
//
// Lancer :  TEST_DATABASE_URL=<redacted>
// ou simplement : npm test   (avec .env.test, voir ci-dessous)
import test from 'node:test';
import assert from 'node:assert/strict';
import { fork, spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3491;
const BASE = `http://127.0.0.1:${PORT}`;
const DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgres://postgres@127.0.0.1:5432/sec1_limites';
const JWT_SECRET = process.env.TEST_JWT_SECRET || 'abcdefghijklmnopqrstuvwxyz0123456789abcdef';

if (!DATABASE_URL) {
  console.error('TEST_DATABASE_URL manquant : les tests d’intégration sont ignorés.');
  process.exit(0);
}

const SUFFIXE = Date.now().toString(36);
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
    body: corps === undefined ? undefined : JSON.stringify(corps),
  });
  let data = null;
  try { data = await r.json(); } catch (_) {}
  return { statut: r.status, data };
}

function demarrerServeur() {
  const s = fork(path.join(DIR, '..', 'server.js'), {
    env: { ...process.env, PORT: String(PORT), DATABASE_URL, JWT_SECRET, DATABASE_SSL: 'false' },
    silent: true,
  });
  return s;
}

test.before(async () => {
  server = demarrerServeur();
  await attendreSante();
  client = new pg.Client({ connectionString: DATABASE_URL });
  await client.connect();
});

test.after(async () => {
  if (client) await client.end().catch(() => {});
  if (server) server.kill('SIGTERM');
});

// ── MO-25 (a) / B-22 : compteur en base ────────────────────────
// SMTP non configuré ici : les 5 premières demandes passent le
// compteur puis répondent 503 (service d'envoi absent), la 6e est
// limitée en 429 par le compteur, pas par la limite auth.
test('compteur code : 5 demandes passent, la 6e est limitée en 429', async () => {
  const email = `reset-lim-${SUFFIXE}@test.ci`;
  const statuts = [];
  for (let i = 0; i < 6; i++) {
    const { statut } = await post('/auth/mot-de-passe-oublie', { email });
    statuts.push(statut);
  }
  assert.deepEqual(statuts.slice(0, 5), [503, 503, 503, 503, 503]);
  assert.equal(statuts[5], 429);
  const { rows } = await client.query(
    "SELECT count(*)::int AS n FROM demandes_code_reinitialisation WHERE lower(email) = lower($1)",
    [email],
  );
  assert.equal(rows[0].n, 5, 'les 5 demandes sont comptées en base');
});

test('compteur code : le compteur survit au redémarrage', async () => {
  const email = `reset-lim-${SUFFIXE}@test.ci`;
  server.kill('SIGTERM');
  await new Promise((r) => setTimeout(r, 1000));
  server = demarrerServeur();
  await attendreSante();
  const { statut } = await post('/auth/mot-de-passe-oublie', { email });
  assert.equal(statut, 429, 'après redémarrage, la limite tient toujours');
});

// ── MO-25 (b) : renvoi générique ───────────────────────────────
test('renvoi code : réponse générique pour un compte inconnu', async () => {
  const { statut, data } = await post('/auth/renvoyer-code-verification', { email: `inconnu-lim-${SUFFIXE}@test.ci` });
  assert.equal(statut, 200);
  assert.equal(data.ok, true);
});

// ── B-13 : create-admin ────────────────────────────────────────
test('B-13 : create-admin par variable d’environnement, jamais en argument', async () => {
  const emailEnv = `admin-env-${SUFFIXE}@test.ci`;
  const ok = spawnSync('node', ['server.js', 'create-admin', emailEnv], {
    cwd: path.join(DIR, '..'),
    env: { ...process.env, DATABASE_URL, JWT_SECRET, CREATE_ADMIN_PASSWORD: 'MotDePasseCreateAdmin123' },
    encoding: 'utf8',
  });
  assert.equal(ok.status, 0, ok.stderr);
  const ligne = (await client.query("SELECT role FROM utilisateurs WHERE lower(email) = lower($1)", [emailEnv])).rows[0];
  assert.equal(ligne?.role, 'admin_general');

  const emailArg = `admin-arg-${SUFFIXE}@test.ci`;
  const refuse = spawnSync('node', ['server.js', 'create-admin', emailArg, 'MotDePasseCreateAdmin123'], {
    cwd: path.join(DIR, '..'),
    env: { ...process.env, DATABASE_URL, JWT_SECRET },
    encoding: 'utf8',
    input: '',
  });
  assert.notEqual(refuse.status, 0, 'le mot de passe en argument est refusé');
  const absent = (await client.query("SELECT id FROM utilisateurs WHERE lower(email) = lower($1)", [emailArg])).rows[0];
  assert.equal(absent, undefined, 'aucun compte n’est créé par la forme en argument');
});
