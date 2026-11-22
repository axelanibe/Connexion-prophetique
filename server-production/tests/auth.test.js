// Tests d'intégration : authentification et gardes d'accès.
// Le serveur réel est lancé en processus enfant sur une base
// PostgreSQL de test (ne JAMAIS pointer vers la production).
//
// Lancer :  TEST_DATABASE_URL="postgresql://..." TEST_JWT_SECRET="..." node --test tests/auth.test.js
// ou simplement : npm test   (avec .env.test, voir ci-dessous)
import test from 'node:test';
import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import argon2 from 'argon2';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3456;
const BASE = `http://127.0.0.1:${PORT}`;
const DATABASE_URL = process.env.TEST_DATABASE_URL;
const JWT_SECRET = process.env.TEST_JWT_SECRET || 'secret-de-test-32-caracteres-minimum!!';

if (!DATABASE_URL) {
  console.error('TEST_DATABASE_URL manquant : les tests d\u2019intégration sont ignorés.');
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

test.before(async () => {
  server = fork(path.join(DIR, '..', 'server.js'), {
    env: { ...process.env, PORT: String(PORT), DATABASE_URL, JWT_SECRET, DATABASE_SSL: 'false' },
    silent: true,
  });
  await attendreSante();
  client = new pg.Client({ connectionString: DATABASE_URL });
  await client.connect();
  // Compte administrateur général pour les tests de connexion et
  // de gardes, 22 nov. 2026 : rien ne le créait avant, la
  // connexion admin@test.ci échouait en 401 sur une base neuve.
  const hashAdmin = await argon2.hash('MotDePasseTest123', { type: argon2.argon2id });
  const admin = (
    await client.query(
      "INSERT INTO utilisateurs (email, mot_de_passe_hash, role) VALUES ('admin@test.ci',$1,'admin_general') RETURNING id",
      [hashAdmin],
    )
  ).rows[0];
  await client.query("INSERT INTO membres (utilisateur_id, nom_complet) VALUES ($1,'Admin Test')", [admin.id]);
});

test.after(async () => {
  if (client) await client.end().catch(() => {});
  if (server) server.kill('SIGTERM');
});

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

async function get(chemin, jeton) {
  const r = await fetch(`${BASE}${chemin}`, {
    headers: jeton ? { authorization: `Bearer ${jeton}` } : {},
  });
  let data = null;
  try { data = await r.json(); } catch (_) {}
  return { statut: r.status, data };
}

const EMAIL_MEMBRE = `membre${Date.now()}@test.ci`;
const MDP_MEMBRE = 'MotDePasseTest123';
let jetonsMembre;
let jetonsAdmin;

// ── Inscription ──────────────────────────────────────────────
// MO-25 (b), 22 nov. 2026 : l'inscription par e-mail ne renvoie
// plus de jetons tout de suite, 202 avec vérification requise ;
// les jetons arrivent après vérification du code. Le code est
// posé directement en base ici, l'envoi d'e-mail n'est pas testé.
test('inscription : crée un membre, 202 sans jeton, puis jetons après vérification', async () => {
  const { statut, data } = await post('/auth/inscription', {
    email: EMAIL_MEMBRE,
    mot_de_passe: MDP_MEMBRE,
    nom_complet: 'Testeur Intégration',
  });
  assert.equal(statut, 202);
  assert.equal(data.verification_requise, true);
  assert.equal(data.access, undefined);
  const u = (await client.query('SELECT id FROM utilisateurs WHERE lower(email) = lower($1)', [EMAIL_MEMBRE])).rows[0];
  const membre = (await client.query('SELECT id, matricule FROM membres WHERE utilisateur_id = $1', [u.id])).rows[0];
  assert.ok(membre?.id, 'le membre est créé');
  assert.ok(membre?.matricule?.startsWith('CP-'), 'le matricule est généré');
  const codeHash = await argon2.hash('123456', { type: argon2.argon2id });
  await client.query(
    "INSERT INTO codes_verification_email (utilisateur_id, email, code_hash, expire_le) VALUES ($1,$2,$3, now() + interval '30 minutes')",
    [u.id, EMAIL_MEMBRE, codeHash],
  );
  const verif = await post('/auth/verifier-email', { email: EMAIL_MEMBRE, code: '123456' });
  assert.equal(verif.statut, 200);
  assert.equal(typeof verif.data.access, 'string');
  assert.equal(verif.data.refresh?.length, 64);
});

test('inscription : e-mail invalide refusé', async () => {
  const { statut } = await post('/auth/inscription', {
    email: 'pas-un-email',
    mot_de_passe: MDP_MEMBRE,
    nom_complet: 'Testeur Intégration',
  });
  assert.equal(statut, 400);
});

test('inscription : mot de passe trop court refusé', async () => {
  const { statut } = await post('/auth/inscription', {
    email: `court${Date.now()}@test.ci`,
    mot_de_passe: 'court',
    nom_complet: 'Testeur Intégration',
  });
  assert.equal(statut, 400);
});

// ── Connexion ────────────────────────────────────────────────
test('connexion : succès avec de bons identifiants', async () => {
  const { statut, data } = await post('/auth/connexion', {
    identifiant: EMAIL_MEMBRE,
    mot_de_passe: MDP_MEMBRE,
  });
  assert.equal(statut, 200);
  assert.equal(typeof data.access, 'string');
  assert.equal(data.refresh?.length, 64);
  jetonsMembre = data;
});

test('connexion : mot de passe erroné → 401', async () => {
  const { statut, data } = await post('/auth/connexion', {
    identifiant: EMAIL_MEMBRE,
    mot_de_passe: 'MauvaisMotDePasse999',
  });
  assert.equal(statut, 401);
  assert.match(data.erreur || '', /incorrects/i);
});

test('connexion : utilisateur inconnu → 401 sans énumération', async () => {
  const { statut, data } = await post('/auth/connexion', {
    identifiant: 'inexistantxyz@test.ci',
    mot_de_passe: 'NimporteQuoi123',
  });
  assert.equal(statut, 401);
  assert.match(data.erreur || '', /incorrects/i, 'même message que pour un mauvais mot de passe');
});

test('connexion : admin_general', async () => {
  const { statut, data } = await post('/auth/connexion', {
    identifiant: 'admin@test.ci',
    mot_de_passe: 'MotDePasseTest123',
  });
  assert.equal(statut, 200);
  jetonsAdmin = data;
});

// ── Gardes /admin ────────────────────────────────────────────
test('garde admin : sans jeton → 401', async () => {
  const { statut } = await get('/admin/paiements/doublons');
  assert.equal(statut, 401);
});

test('garde admin : jeton membre → 403', async () => {
  const { statut } = await get('/admin/paiements/doublons', jetonsMembre.access);
  assert.equal(statut, 403);
});

test('garde admin : jeton admin_general → 200', async () => {
  const { statut } = await get('/admin/paiements/doublons', jetonsAdmin.access);
  assert.equal(statut, 200);
});

// ── Rafraîchissement et déconnexion ──────────────────────────
test('rafraichir : rotation des jetons', async () => {
  const ancienRefresh = jetonsMembre.refresh;
  const { statut, data } = await post('/auth/rafraichir', { refresh: ancienRefresh });
  assert.equal(statut, 200);
  assert.notEqual(data.refresh, ancienRefresh, 'le refresh tourne (aléatoire)');
  assert.equal(typeof data.access, 'string');
  // L'ancien refresh est révoqué : le réutiliser dans la fenêtre
  // de grâce de 60 s rend la même paire, sans nouveau jeton.
  const { statut: s2, data: d2 } = await post('/auth/rafraichir', { refresh: ancienRefresh });
  assert.equal(s2, 200, 'fenêtre de grâce : la même paire est rendue');
  assert.equal(d2.refresh, data.refresh, 'aucun nouveau jeton émis');
  assert.equal(d2.access, data.access, 'même accès rendu');
  jetonsMembre = data;
});

test('deconnexion : le refresh est révoqué', async () => {
  const { statut: s1 } = await post('/auth/deconnexion', { refresh: jetonsMembre.refresh });
  assert.equal(s1, 200);
  const { statut: s2 } = await post('/auth/rafraichir', { refresh: jetonsMembre.refresh });
  assert.equal(s2, 401);
});
