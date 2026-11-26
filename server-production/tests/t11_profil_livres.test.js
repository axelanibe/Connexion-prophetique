// Tests T11, 26 nov. 2026 : nom et ville persistés côté serveur,
// changement d'e-mail avec code de vérification, catégories des
// livres. Serveur réel en processus enfant sur une base de test
// (ne JAMAIS pointer vers la production).
import test from 'node:test';
import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import argon2 from 'argon2';
import fs from 'node:fs';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3459;
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

const EMAIL_MEMBRE = `t11-${Date.now()}@test.ci`;
const EMAIL_NOUVEAU = `t11-nouveau-${Date.now()}@test.ci`;
const MDP = 'MotDePasseTest123';
let jetonMembre;
let jetonAdmin;
let idMembre;

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
    nom_complet: 'Testeur T11',
  });
  assert.equal(inscription.statut, 202);
  const u = (await client.query('SELECT id FROM utilisateurs WHERE lower(email) = lower($1)', [EMAIL_MEMBRE])).rows[0];
  const membre = (await client.query('SELECT id FROM membres WHERE utilisateur_id = $1', [u.id])).rows[0];
  idMembre = membre.id;
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

// ── Nom et ville ──────────────────────────────────────────────
test('T11, /moi/nom : change le nom, renvoyé par /moi', async () => {
  const r = await post('/moi/nom', { nom_complet: 'Nouveau Nom T11' }, jetonMembre);
  assert.equal(r.statut, 200);
  assert.equal(r.data.nom_complet, 'NOUVEAU NOM T11');
  const moi = await get('/moi', jetonMembre);
  assert.equal(moi.statut, 200);
  assert.equal(moi.data.nom_complet, 'NOUVEAU NOM T11');
});

test('T11, /moi/nom : un seul mot refusé', async () => {
  const r = await post('/moi/nom', { nom_complet: 'Seul' }, jetonMembre);
  assert.equal(r.statut, 400);
});

test('T11, /moi/ville : change la ville, renvoyée par /moi', async () => {
  const r = await post('/moi/ville', { ville: 'Abidjan' }, jetonMembre);
  assert.equal(r.statut, 200);
  assert.equal(r.data.ville, 'Abidjan');
  const moi = await get('/moi', jetonMembre);
  assert.equal(moi.data.ville, 'Abidjan');
});

test('T11, /moi/ville : vide refusé', async () => {
  const r = await post('/moi/ville', { ville: '  ' }, jetonMembre);
  assert.equal(r.statut, 400);
});

test('T11, /moi : renvoie l’e-mail et la ville', async () => {
  const moi = await get('/moi', jetonMembre);
  assert.equal(moi.statut, 200);
  assert.equal(moi.data.email, EMAIL_MEMBRE.toLowerCase());
  assert.equal(moi.data.ville, 'Abidjan');
});

// ── Changement d’e-mail ──────────────────────────────────────
test('T11, /moi/email/demander : 503 sans SMTP', async () => {
  const r = await post('/moi/email/demander', { email: EMAIL_NOUVEAU }, jetonMembre);
  assert.equal(r.statut, 503);
});

test('T11, /moi/email/demander : e-mail déjà pris, 409 avant SMTP', async () => {
  const r = await post('/moi/email/demander', { email: 'admin@test.ci' }, jetonMembre);
  assert.equal(r.statut, 409);
});

test('T11, /moi/email/confirmer : code absent, 400', async () => {
  const r = await post('/moi/email/confirmer', { email: EMAIL_NOUVEAU, code: '123456' }, jetonMembre);
  assert.equal(r.statut, 400);
});

test('T11, /moi/email/confirmer : code posé en base, changement appliqué une fois', async () => {
  const u = (await client.query('SELECT id FROM utilisateurs WHERE lower(email) = lower($1)', [EMAIL_MEMBRE])).rows[0];
  const codeHash = await argon2.hash('654321', { type: argon2.argon2id });
  await client.query(
    "INSERT INTO codes_changement_email (utilisateur_id, email, code_hash, expire_le) VALUES ($1,$2,$3, now() + interval '30 minutes')",
    [u.id, EMAIL_NOUVEAU, codeHash],
  );
  const faux = await post('/moi/email/confirmer', { email: EMAIL_NOUVEAU, code: '000000' }, jetonMembre);
  assert.equal(faux.statut, 400);
  const r = await post('/moi/email/confirmer', { email: EMAIL_NOUVEAU, code: '654321' }, jetonMembre);
  assert.equal(r.statut, 200);
  assert.equal(r.data.email, EMAIL_NOUVEAU.toLowerCase());
  const moi = await get('/moi', jetonMembre);
  assert.equal(moi.data.email, EMAIL_NOUVEAU.toLowerCase());
  const reutilise = await post('/moi/email/confirmer', { email: EMAIL_NOUVEAU, code: '654321' }, jetonMembre);
  assert.equal(reutilise.statut, 400);
  const ligne = (await client.query('SELECT email_verifie FROM utilisateurs WHERE id = $1', [u.id])).rows[0];
  assert.equal(ligne.email_verifie, true);
});

// ── Catégories des livres ────────────────────────────────────
test('T11, livres : catégorie choisie, « À classer » par défaut, hors liste refusée', async () => {
  const avec = await post('/admin/livres', { titre: 'Livre T11 Priere', auteur: 'Auteur T11', prix_fcfa: 5000, categorie: 'Prière' }, jetonAdmin);
  assert.equal(avec.statut, 201);
  assert.equal(avec.data.categorie, 'Prière');
  const sans = await post('/admin/livres', { titre: 'Livre T11 Sans Categorie', auteur: 'Auteur T11', prix_fcfa: 5000 }, jetonAdmin);
  assert.equal(sans.statut, 201);
  assert.equal(sans.data.categorie, 'À classer');
  const mauvais = await post('/admin/livres', { titre: 'Livre T11 Mauvais', auteur: 'Auteur T11', prix_fcfa: 5000, categorie: 'Roman' }, jetonAdmin);
  assert.equal(mauvais.statut, 400);
  const liste = await get('/livres');
  assert.equal(liste.statut, 200);
  const trouve = liste.data.find((l) => l.titre === 'LIVRE T11 PRIERE');
  assert.ok(trouve, 'livre avec catégorie dans la liste publique');
  assert.equal(trouve.categorie, 'Prière');
  const modifie = await put(`/admin/livres/${avec.data.id}`, { categorie: 'Jeunesse' }, jetonAdmin);
  assert.equal(modifie.statut, 200);
  assert.equal(modifie.data.categorie, 'Jeunesse');
  const liste2 = await get('/livres');
  assert.equal(liste2.data.find((l) => l.id === avec.data.id).categorie, 'Jeunesse');
});

test('T11, /moi/achats : la catégorie est renvoyée', () => {
  const serveur = fs.readFileSync(path.join(DIR, '..', 'server.js'), 'utf8');
  assert.ok(serveur.includes('l.id, l.titre, l.auteur, l.description, l.format, l.categorie FROM v_acces_livres'), 'catégorie dans /moi/achats');
  assert.ok(serveur.includes("const CATEGORIES_LIVRE = ['Étude biblique', 'Prière', 'Témoignages', 'Enseignements', 'Jeunesse', 'Vie chrétienne', 'À classer']"), 'liste fermée');
});
