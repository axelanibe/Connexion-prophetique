// Tests de sécurité, 22 nov. 2026 : C-1 en intégration, un
// en-tête CF-Connecting-IP forgé depuis une adresse qui n'est pas
// Cloudflare ne doit pas donner un nouveau compteur de limite.
// Serveur réel en processus enfant, base PostgreSQL de test
// fraîche (ne JAMAIS pointer vers la production).
//
// Lancer :  TEST_DATABASE_URL=<redacted>
// ou simplement : npm test   (avec .env.test, voir ci-dessous)
import test from 'node:test';
import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3492;
const BASE = `http://127.0.0.1:${PORT}`;
const DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgres://postgres@127.0.0.1:5432/sec1_cf';
const JWT_SECRET = process.env.TEST_JWT_SECRET || 'abcdefghijklmnopqrstuvwxyz0123456789abcdef';

if (!DATABASE_URL) {
  console.error('TEST_DATABASE_URL manquant : les tests d’intégration sont ignorés.');
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

// Depuis 127.0.0.1, qui n'est pas une IP Cloudflare, 11
// connexions avec 11 en-têtes forgés différents doivent partager
// le même compteur (repli sur req.ip) : 10 en 401, la 11e en 429,
// avec un message français (B-4). Si l'en-tête était cru, les 11
// passeraient en 401, chacune avec son propre compteur.
test('C-1 : en-tête forgé hors Cloudflare, un seul compteur, 429 en français', async () => {
  const resultats = [];
  for (let i = 0; i < 11; i++) {
    const r = await fetch(`${BASE}/auth/connexion`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'cf-connecting-ip': `198.51.100.${i + 1}` },
      body: JSON.stringify({ identifiant: `inconnu-cf-${i}@test.ci`, mot_de_passe: 'MauvaisMotDePasse999' }),
    });
    let data = null;
    try { data = await r.json(); } catch (_) {}
    resultats.push({ statut: r.status, data, retryAfter: r.headers.get('retry-after') });
  }
  assert.deepEqual(resultats.slice(0, 10).map((x) => x.statut), Array(10).fill(401));
  assert.equal(resultats[10].statut, 429);
  assert.match(resultats[10].data.erreur, /Trop de requêtes\. Réessaie dans \d+ secondes\./);
  assert.ok(resultats[10].retryAfter, 'en-tête Retry-After présent');
});
