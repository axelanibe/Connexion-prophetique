// Tests d'intégration : migrations de la salve 28 nov. 2026.
// Deux échecs au démarrage du 27 nov. 22 h 04 :
//  - ALTER TABLE messages type audio, 23514 : l'ancienne migration
//    recréait la contrainte SANS 'appel_manque', donc toute ligne
//    de type 'appel_manque' la violait au redémarrage suivant.
//  - ALTER TYPE type_evenement ADD VALUE 'reunion', 42710 :
//    l'étiquette existait déjà dans schema.sql.
// Le test démarre le serveur deux fois sur la même base, avec une
// ligne 'appel_manque' entre les deux : le deuxième démarrage
// doit réussir, la ligne doit survivre, la contrainte doit porter
// les deux types.
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
const PORT = 3465;
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

function demarrer() {
  server = fork(path.join(DIR, '..', 'server.js'), {
    env: { ...process.env, PORT: String(PORT), DATABASE_URL, JWT_SECRET, DATABASE_SSL: 'false' },
    silent: true,
  });
  return attendreSante();
}

function arreter() {
  if (!server) return Promise.resolve();
  const s = server;
  server = null;
  s.kill('SIGTERM');
  return new Promise((resolve) => {
    const t = setTimeout(resolve, 10000);
    s.on('exit', () => { clearTimeout(t); resolve(); });
  });
}

test.before(async () => {
  await demarrer();
  client = new pg.Client({ connectionString: DATABASE_URL });
  await client.connect();
});

test.after(async () => {
  if (client) await client.end().catch(() => {});
  await arreter();
});

// ── Migrations idempotentes ───────────────────────────────────
test('redémarrage : une ligne appel_manque survit, la contrainte porte audio et appel_manque', async () => {
  const hash = await argon2.hash(MDP, { type: argon2.argon2id });
  const u = (await client.query(
    `INSERT INTO utilisateurs (email, mot_de_passe_hash, role) VALUES ($1,$2,'membre') RETURNING id`,
    [`mig-${SUFFIXE}@test.ci`, hash],
  )).rows[0];
  const m = (await client.query(
    `INSERT INTO membres (utilisateur_id, nom_complet, fonction) VALUES ($1,'Membre Migration','Membre') RETURNING id`,
    [u.id],
  )).rows[0];
  const conv = (await client.query(
    `INSERT INTO conversations (type, created_by) VALUES ('directe', $1) RETURNING id`,
    [m.id],
  )).rows[0];
  const msg = (await client.query(
    `INSERT INTO messages (conversation_id, sender_id, content, type) VALUES ($1,$2,'Appel manqué.','appel_manque') RETURNING id`,
    [conv.id, m.id],
  )).rows[0];

  await arreter();
  await demarrer();

  const ligne = (await client.query(`SELECT type FROM messages WHERE id = $1`, [msg.id])).rows[0];
  assert.ok(ligne, 'la ligne appel_manque survit au redémarrage');
  assert.equal(ligne.type, 'appel_manque');

  const def = (await client.query(
    `SELECT pg_get_constraintdef(oid) AS def FROM pg_constraint WHERE conname = 'messages_type_check'`,
  )).rows[0]?.def ?? '';
  assert.ok(def.includes("'audio'"), `la contrainte porte audio : ${def}`);
  assert.ok(def.includes("'appel_manque'"), `la contrainte porte appel_manque : ${def}`);

  const reunion = (await client.query(
    `SELECT 1 FROM pg_enum WHERE enumlabel = 'reunion'`,
  )).rows[0];
  assert.ok(reunion, 'l’étiquette reunion existe, sans erreur au redémarrage');

  // Une troisième migration ne change rien : la contrainte est
  // déjà complète, le démarrage suivant ne la recrée pas.
  const defAvant = def;
  await arreter();
  await demarrer();
  const defApres = (await client.query(
    `SELECT pg_get_constraintdef(oid) AS def FROM pg_constraint WHERE conname = 'messages_type_check'`,
  )).rows[0]?.def ?? '';
  assert.equal(defApres, defAvant, 'troisième démarrage, contrainte inchangée');
});
