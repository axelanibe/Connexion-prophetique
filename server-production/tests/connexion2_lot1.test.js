// Tests d'intégration : Connexion 2.0 lot 1, salve 28 nov. 2026.
// Modifier sa publication, bloquer un membre, découvrir des
// membres, photos multiples. Serveur actuel, PostgreSQL.
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
const PORT = 3466;
const BASE = `http://127.0.0.1:${PORT}`;
const DATABASE_URL = process.env.TEST_DATABASE_URL ?? '';
const JWT_SECRET = process.env.JWT_SECRET ?? 'secret-test';

if (!DATABASE_URL) {
  console.error('TEST_DATABASE_URL manquant: <redacted>');
  process.exit(0);
}

const MDP = 'MotDePasseTest123';
const SUFFIXE = Date.now().toString(36);
// PNG 1x1, valide pour les contrôles de photo du mur.
const PHOTO = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

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

async function appel(methode, chemin, corps, jeton) {
  const r = await fetch(`${BASE}${chemin}`, {
    method: methode,
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
const post = (c, b, j) => appel('POST', c, b, j);
const put = (c, b, j) => appel('PUT', c, b, j);
const get = (c, j) => appel('GET', c, undefined, j);
const suppr = (c, j) => appel('DELETE', c, undefined, j);

async function connexion(email) {
  const { statut, data } = await post('/auth/connexion', { identifiant: email, mot_de_passe: MDP });
  assert.equal(statut, 200, `connexion de ${email}`);
  return data.access;
}

const comptes = {};
let client;
let postA;
let postC1;
let postC2;

async function creerCompte(clientPg, { email, role, nom, etablissementMembreId }) {
  const hash = await argon2.hash(MDP, { type: argon2.argon2id });
  const u = (
    await clientPg.query(
      `INSERT INTO utilisateurs (email, mot_de_passe_hash, role) VALUES ($1,$2,$3) RETURNING id`,
      [email, hash, role],
    )
  ).rows[0];
  const membre = (
    await clientPg.query(
      `INSERT INTO membres (utilisateur_id, nom_complet, etablissement_id, fonction) VALUES ($1,$2,$3,'Membre') RETURNING id, matricule`,
      [u.id, nom, etablissementMembreId],
    )
  ).rows[0];
  return { utilisateurId: u.id, membreId: membre.id, matricule: membre.matricule, nom };
}

async function publier(jeton, texte, photos) {
  const r = await post('/mur', { texte, categorie: 'temoignage', ...(photos ? { photos } : {}) }, jeton);
  assert.equal(r.statut, 201, `publication : ${JSON.stringify(r.data)}`);
  return r.data.publication;
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

  comptes.a = await creerCompte(client, { email: `a-c2-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Awa Marie Diallo', etablissementMembreId: etab.id });
  comptes.b = await creerCompte(client, { email: `b-c2-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Jean Aka Yao', etablissementMembreId: etab.id });
  comptes.c = await creerCompte(client, { email: `c-c2-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Paul Yao Kone', etablissementMembreId: etab.id });
  comptes.jetonA = await connexion(`a-c2-${SUFFIXE}@test.ci`);
  comptes.jetonB = await connexion(`b-c2-${SUFFIXE}@test.ci`);
  comptes.jetonC = await connexion(`c-c2-${SUFFIXE}@test.ci`);

  postA = await publier(comptes.jetonA, 'Témoignage de Awa.', [PHOTO, PHOTO]);
  postC1 = await publier(comptes.jetonC, 'Témoignage de Paul, un.', [PHOTO]);
  postC2 = await publier(comptes.jetonC, 'Témoignage de Paul, deux.', undefined);
});

test.after(async () => {
  if (client) await client.end().catch(() => {});
  if (server) server.kill('SIGTERM');
});

// ── Photos multiples ──────────────────────────────────────────
test('photos multiples : deux photos publiées, renvoyées dans le fil et le détail', async () => {
  assert.equal(postA.photos.length, 2, 'deux photos renvoyées à la création');
  assert.equal(postA.photo, PHOTO, 'photo reste la première');
  const fil = await get('/mur', comptes.jetonB);
  assert.equal(fil.statut, 200);
  const ligne = fil.data.publications.find((p) => p.id === postA.id);
  assert.ok(ligne, 'la publication est dans le fil');
  assert.equal(ligne.photos.length, 2);
  const detail = await get(`/mur/${postA.id}`, comptes.jetonB);
  assert.equal(detail.data.publication.photos.length, 2);
});

test('photos multiples : 5 photos refusées, photo invalide refusée', async () => {
  const trop = await post('/mur', { texte: 'Trop de photos.', categorie: 'autre', photos: [PHOTO, PHOTO, PHOTO, PHOTO, PHOTO] }, comptes.jetonB);
  assert.equal(trop.statut, 400, '5 photos refusées');
  const invalide = await post('/mur', { texte: 'Photo invalide.', categorie: 'autre', photos: ['pas-une-image'] }, comptes.jetonB);
  assert.equal(invalide.statut, 400, 'photo invalide refusée');
});

test('migration : la table des photos multiples existe', async () => {
  const ligne = (await client.query(
    `SELECT 1 FROM information_schema.tables WHERE table_name = 'mur_publication_photos'`,
  )).rows[0];
  assert.ok(ligne, 'table mur_publication_photos créée au démarrage');
});

// ── Modifier sa publication ───────────────────────────────────
test('modifier : l’auteur modifie texte et catégorie, jamais les médias', async () => {
  const r = await put(`/mur/${postA.id}`, { texte: 'Témoignage de Awa, modifié.', categorie: 'encouragement' }, comptes.jetonA);
  assert.equal(r.statut, 200, `modification : ${JSON.stringify(r.data)}`);
  assert.equal(r.data.publication.texte, 'Témoignage de Awa, modifié.');
  assert.equal(r.data.publication.categorie, 'encouragement');
  assert.equal(r.data.publication.photos.length, 2, 'les photos ne bougent pas');
  const detail = await get(`/mur/${postA.id}`, comptes.jetonB);
  assert.equal(detail.data.publication.texte, 'Témoignage de Awa, modifié.');
});

test('modifier : un autre membre est refusé en 403, texte vide en 400, inconnue en 404', async () => {
  const autre = await put(`/mur/${postA.id}`, { texte: 'Je modifie à ta place.', categorie: 'autre' }, comptes.jetonB);
  assert.equal(autre.statut, 403, 'pas l’auteur : 403');
  const vide = await put(`/mur/${postA.id}`, { texte: '   ', categorie: 'autre' }, comptes.jetonA);
  assert.equal(vide.statut, 400, 'texte vide : 400');
  const longue = await put(`/mur/${postA.id}`, { texte: 'x'.repeat(2001), categorie: 'autre' }, comptes.jetonA);
  assert.equal(longue.statut, 400, 'texte trop long : 400');
  const inconnue = await put('/mur/00000000-0000-0000-0000-000000000000', { texte: 'Texte.', categorie: 'autre' }, comptes.jetonA);
  assert.equal(inconnue.statut, 404);
});

// ── Blocage ───────────────────────────────────────────────────
test('bloquer : le fil cache l’auteur, suivre, réagir et commenter sont refusés, débloquer restaure', async () => {
  const avant = await get('/mur', comptes.jetonB);
  assert.ok(avant.data.publications.some((p) => p.id === postA.id), 'Awa est dans le fil avant le blocage');
  const blocage = await post(`/mur/membres/${comptes.a.membreId}/bloquer`, {}, comptes.jetonB);
  assert.equal(blocage.statut, 200, `blocage : ${JSON.stringify(blocage.data)}`);
  assert.equal(blocage.data.bloque, true);
  const encore = await post(`/mur/membres/${comptes.a.membreId}/bloquer`, {}, comptes.jetonB);
  assert.equal(encore.statut, 200, 'blocage idempotent');

  const fil = await get('/mur', comptes.jetonB);
  assert.ok(!fil.data.publications.some((p) => p.id === postA.id), 'Awa n’est plus dans le fil');
  const detail = await get(`/mur/${postA.id}`, comptes.jetonB);
  assert.equal(detail.statut, 404, 'détail masqué');
  const suivi = await post('/mur/suivis', { suivi_id: comptes.a.membreId }, comptes.jetonB);
  assert.equal(suivi.statut, 403, 'suivre un membre bloqué : 403');
  const suiviInverse = await post('/mur/suivis', { suivi_id: comptes.b.membreId }, comptes.jetonA);
  assert.equal(suiviInverse.statut, 403, 'l’auteur bloqué ne peut pas suivre non plus');
  const reaction = await post('/aimes', { cible_type: 'mur', cible_id: postA.id, type: 'jaime' }, comptes.jetonB);
  assert.equal(reaction.statut, 403, 'réagir : 403');
  const commentaire = await post('/commentaires', { cible_type: 'mur', cible_id: postA.id, texte: 'Beau témoignage.' }, comptes.jetonB);
  assert.equal(commentaire.statut, 403, 'commenter : 403');

  const profil = await get(`/mur/membres/${comptes.a.membreId}`, comptes.jetonB);
  assert.equal(profil.data.membre.bloque_par_moi, true, 'le profil dit bloqué');

  const deblocage = await suppr(`/mur/membres/${comptes.a.membreId}/bloquer`, comptes.jetonB);
  assert.equal(deblocage.statut, 200);
  const apres = await get('/mur', comptes.jetonB);
  assert.ok(apres.data.publications.some((p) => p.id === postA.id), 'Awa revient dans le fil après déblocage');
  const suiviApres = await post('/mur/suivis', { suivi_id: comptes.a.membreId }, comptes.jetonB);
  assert.equal(suiviApres.statut, 200, 'suivre à nouveau après déblocage');
});

test('bloquer : se bloquer soi-même en 400, membre inconnu en 404, débloquer sans blocage en 404', async () => {
  const soi = await post(`/mur/membres/${comptes.b.membreId}/bloquer`, {}, comptes.jetonB);
  assert.equal(soi.statut, 400);
  const inconnu = await post('/mur/membres/00000000-0000-0000-0000-000000000000/bloquer', {}, comptes.jetonB);
  assert.equal(inconnu.statut, 404);
  const sansBlocage = await suppr(`/mur/membres/${comptes.c.membreId}/bloquer`, comptes.jetonB);
  assert.equal(sansBlocage.statut, 404);
});

// ── Découvrir ─────────────────────────────────────────────────
test('découvrir : sans recherche, les plus actifs d’abord, hors moi', async () => {
  const r = await get('/mur/decouvrir', comptes.jetonB);
  assert.equal(r.statut, 200);
  const noms = r.data.membres.map((m) => m.nom_complet);
  assert.ok(!noms.includes('Jean Aka Yao'), 'je ne me découvre pas moi-même');
  assert.ok(noms.includes('Paul Yao Kone'), 'Paul est suggéré');
  assert.ok(noms.includes('Awa Marie Diallo'), 'Awa est suggérée');
  const paul = r.data.membres.find((m) => m.nom_complet === 'Paul Yao Kone');
  const awa = r.data.membres.find((m) => m.nom_complet === 'Awa Marie Diallo');
  assert.ok(paul.nb_publications > awa.nb_publications, 'Paul, 2 publications, avant Awa, 1');
  assert.equal(paul.suivi_par_moi, false);
  assert.equal('matricule' in paul, false, 'jamais de matricule');
  assert.equal('photo' in paul, false, 'jamais de photo en liste');
});

test('découvrir : recherche par mot dès 1 caractère, un mot au milieu suffit', async () => {
  const r = await get('/mur/decouvrir?q=marie', comptes.jetonB);
  assert.equal(r.statut, 200);
  assert.deepEqual(r.data.membres.map((m) => m.nom_complet), ['Awa Marie Diallo']);
  const un = await get('/mur/decouvrir?q=p', comptes.jetonB);
  assert.equal(un.statut, 200, '1 caractère accepté');
  assert.ok(un.data.membres.some((m) => m.nom_complet === 'Paul Yao Kone'));
  const vide = await get('/mur/decouvrir?q=zzzzintrouvable', comptes.jetonB);
  assert.deepEqual(vide.data.membres, []);
});
