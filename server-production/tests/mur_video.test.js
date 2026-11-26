// Tests d'intégration : vidéo du mur des membres v2, tranche 2.
// Le serveur réel est lancé en processus enfant sur une base
// PostgreSQL de test (ne JAMAIS pointer vers la production).
// Sans clés R2, l'envoi refuse en 503, comme les stories : la
// suppression et la lecture restent testables sans R2.
//
// Lancer :  TEST_DATABASE_URL=<redacted>
import test from 'node:test';
import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import argon2 from 'argon2';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3468;
const BASE = `http://127.0.0.1:${PORT}`;
const DATABASE_URL = process.env.TEST_DATABASE_URL;
const JWT_SECRET = crypto.randomUUID() + crypto.randomUUID();

if (!DATABASE_URL) {
  console.error('Base de test manquante.');
  process.exit(0);
}

const MDP = 'MotDePasseTest123';
const SUFFIXE = Date.now().toString(36);

// En-tête MP4 minimal, boîte ftyp valide, reconnu par
// fileTypeFromBuffer. Le test reste sans R2, l'envoi refuse
// en 503 avant la lecture, mais le contenu envoyé est honnête.
const MP4 = Buffer.from([
  0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70,
  0x69, 0x73, 0x6f, 0x6d, 0x00, 0x00, 0x00, 0x00,
  0x69, 0x73, 0x6f, 0x6d, 0x69, 0x73, 0x6f, 0x32,
]);

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

async function effacer(chemin, jeton) {
  const r = await fetch(`${BASE}${chemin}`, {
    method: 'DELETE',
    headers: jeton ? { authorization: `Bearer ${jeton}` } : {},
  });
  let data = null;
  try { data = await r.json(); } catch (_) {}
  return { statut: r.status, data };
}

async function posterVideo(chemin, jeton) {
  const formulaire = new FormData();
  formulaire.append('file', new Blob([MP4], { type: 'video/mp4' }), 'video.mp4');
  const r = await fetch(`${BASE}${chemin}`, {
    method: 'POST',
    headers: jeton ? { authorization: `Bearer ${jeton}` } : {},
    body: formulaire,
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

  comptes.a = await creerCompte(client, { email: `membre-a-murvideo-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Membre A Video', etablissementMembreId: etab.id });
  comptes.b = await creerCompte(client, { email: `membre-b-murvideo-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Membre B Video', etablissementMembreId: etab.id });
  comptes.jetonA = await connexion(`membre-a-murvideo-${SUFFIXE}@test.ci`);
  comptes.jetonB = await connexion(`membre-b-murvideo-${SUFFIXE}@test.ci`);
});

test.after(async () => {
  if (client) await client.end().catch(() => {});
  if (server) server.kill('SIGTERM');
});

let publicationId;

test('POST /mur crée la publication, puis POST /mur/:id/video refuse en 503 sans R2', async () => {
  const cree = await post('/mur', { texte: 'Témoignage vidéo.', categorie: 'temoignage' }, comptes.jetonA);
  assert.equal(cree.statut, 201, `création : ${JSON.stringify(cree.data)}`);
  publicationId = cree.data.publication.id;
  assert.equal(cree.data.publication.video, null, 'pas de vidéo au départ');

  const envoi = await posterVideo(`/mur/${publicationId}/video`, comptes.jetonA);
  assert.equal(envoi.statut, 503, `sans R2 : ${JSON.stringify(envoi.data)}`);
});

test('GET /mur/:id/video sans vidéo : 404', async () => {
  const lecture = await get(`/mur/${publicationId}/video`);
  assert.equal(lecture.statut, 404);
});

test('DELETE /mur/:id/video par un autre membre : 404, par l’auteur : 200', async () => {
  const autre = await effacer(`/mur/${publicationId}/video`, comptes.jetonB);
  assert.equal(autre.statut, 404, 'un autre membre ne supprime pas la vidéo');
  const auteur = await effacer(`/mur/${publicationId}/video`, comptes.jetonA);
  assert.equal(auteur.statut, 200, `auteur : ${JSON.stringify(auteur.data)}`);
  assert.equal(auteur.data.ok, true);
});

test('DELETE /mur/:id efface la publication, GET /mur/:id : 404', async () => {
  const supprimee = await effacer(`/mur/${publicationId}`, comptes.jetonA);
  assert.equal(supprimee.statut, 200);
  const relue = await get(`/mur/${publicationId}`, comptes.jetonA);
  assert.equal(relue.statut, 404);
});
