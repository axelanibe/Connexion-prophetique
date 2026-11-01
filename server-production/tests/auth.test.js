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
});

test.after(() => {
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
test('inscription : crée un membre et renvoie des jetons', async () => {
  const { statut, data } = await post('/auth/inscription', {
    email: EMAIL_MEMBRE,
    mot_de_passe: MDP_MEMBRE,
    nom_complet: 'Testeur Intégration',
  });
  assert.equal(statut, 201);
  assert.ok(data.membre?.id, 'le membre est créé');
  assert.ok(data.membre?.matricule?.startsWith('CP-'), 'le matricule est généré');
  assert.equal(typeof data.access, 'string');
  assert.equal(data.refresh?.length, 64);
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
  // L'ancien refresh est révoqué : le réutiliser doit échouer.
  const { statut: s2 } = await post('/auth/rafraichir', { refresh: ancienRefresh });
  assert.equal(s2, 401, 'le refresh déjà utilisé est rejeté');
  jetonsMembre = data;
});

test('deconnexion : le refresh est révoqué', async () => {
  const { statut: s1 } = await post('/auth/deconnexion', { refresh: jetonsMembre.refresh });
  assert.equal(s1, 200);
  const { statut: s2 } = await post('/auth/rafraichir', { refresh: jetonsMembre.refresh });
  assert.equal(s2, 401);
});
