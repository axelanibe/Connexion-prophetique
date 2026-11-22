// Tests d'intégration : renouvellement de session, 21 nov. 2026.
// Deux appels simultanés avec le même jeton : les deux réussissent
// avec la même paire (fenêtre de grâce de 60 s après rotation,
// une réponse perdue ne tue plus la session). Limite par empreinte
// du jeton : des appels répétés avec un jeton ne bloquent pas un
// autre jeton, même depuis la même adresse IP (127.0.0.1 ici).
// Le serveur réel est lancé en processus enfant sur une base
// PostgreSQL de test (ne JAMAIS pointer vers la production).
//
// Lancer :  TEST_DATABASE_URL="postgresql://..." TEST_JWT_SECRET="..." node --test tests/rafraichissement.test.js
// ou simplement : npm test   (avec .env.test, voir ci-dessous)
import test from 'node:test';
import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3457;
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

async function inscrire(suffixe) {
  // Inscription par téléphone seul, 22 nov. 2026 : l'inscription
  // par e-mail exige désormais une vérification avant les jetons,
  // ce fichier teste le renouvellement, pas la vérification.
  const telephone = `+22507${String(Date.now()).slice(-5)}${Math.floor(Math.random() * 1000)}`;
  const { statut, data } = await post('/auth/inscription', {
    telephone,
    mot_de_passe: 'MotDePasseTest123',
    nom_complet: 'Testeur Rafraichissement',
  });
  assert.equal(statut, 201);
  return data;
}

test('rafraichir : deux appels simultanés, même paire', async () => {
  const { refresh } = await inscrire('simultane');
  const [premier, second] = await Promise.all([
    post('/auth/rafraichir', { refresh }),
    post('/auth/rafraichir', { refresh }),
  ]);
  assert.equal(premier.statut, 200);
  assert.equal(second.statut, 200, 'fenêtre de grâce : le second rejoue la même paire');
  assert.equal(second.data.refresh, premier.data.refresh, 'un seul jeton émis');
  assert.equal(second.data.access, premier.data.access, 'même accès rendu');
});

test('rafraichir : limite par empreinte, pas par adresse IP', async () => {
  const a = await inscrire('limite-a');
  const b = await inscrire('limite-b');
  // 10 appels avec le jeton A : le 1er tourne, les suivants
  // rejouent la même paire dans la fenêtre de grâce, le 11e est
  // limité en 429 (limite par empreinte du jeton, 10 par minute).
  const statuts = [];
  for (let i = 0; i < 11; i++) {
    const { statut } = await post('/auth/rafraichir', { refresh: a.refresh });
    statuts.push(statut);
  }
  assert.equal(statuts[0], 200);
  assert.equal(statuts[10], 429, '11e appel avec le même jeton : limité');
  // Même adresse IP (127.0.0.1), autre jeton : pas de 429.
  const { statut } = await post('/auth/rafraichir', { refresh: b.refresh });
  assert.equal(statut, 200, 'un autre jeton n’est pas bloqué par la limite du premier');
});
