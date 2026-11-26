// Tests d'intégration : réactions, réponses et mentions du mur
// des membres v2, tranche 3. Le serveur réel est lancé en
// processus enfant sur une base PostgreSQL de test (ne JAMAIS
// pointer vers la production).
//
// Lancer :  TEST_DATABASE_URL=postgresql://postgres@127.0.0.1:5432/<base> node --test tests/mur_reactions.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import pg from 'pg';
import argon2 from 'argon2';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3469;
const BASE = `http://127.0.0.1:${PORT}`;
const DATABASE_URL = process.env.TEST_DATABASE_URL;
const JWT_SECRET = crypto.randomUUID() + crypto.randomUUID();

if (!DATABASE_URL) {
  console.error('Base de test manquante.');
  process.exit(0);
}

const MDP = 'MotDePasseTest123';
const SUFFIXE = Date.now().toString(36);

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

async function compterNotifications(membreId, type) {
  const ligne = (await client.query(
    `SELECT COUNT(*)::int AS n FROM notifications WHERE membre_id = $1 AND type = $2`,
    [membreId, type],
  )).rows[0];
  return ligne.n;
}

async function compterAimes(membreId, cibleId) {
  const ligne = (await client.query(
    `SELECT COUNT(*)::int AS n FROM aimes WHERE membre_id = $1 AND cible_id = $2`,
    [membreId, cibleId],
  )).rows[0];
  return ligne.n;
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

  comptes.a = await creerCompte(client, { email: `membre-a-murreact-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Membre A React', etablissementMembreId: etab.id });
  comptes.b = await creerCompte(client, { email: `membre-b-murreact-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Membre B React', etablissementMembreId: etab.id });
  comptes.c = await creerCompte(client, { email: `membre-c-murreact-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Membre C React', etablissementMembreId: etab.id });
  comptes.jetonA = await connexion(`membre-a-murreact-${SUFFIXE}@test.ci`);
  comptes.jetonB = await connexion(`membre-b-murreact-${SUFFIXE}@test.ci`);
  comptes.jetonC = await connexion(`membre-c-murreact-${SUFFIXE}@test.ci`);
});

test.after(async () => {
  if (client) await client.end().catch(() => {});
  if (server) server.kill('SIGTERM');
});

let publicationId;
let commentaireB;

test('réactions : Amen puis Prière, comptes par type, une seule ligne', async () => {
  const cree = await post('/mur', { texte: 'Témoignage à réagir.', categorie: 'temoignage' }, comptes.jetonA);
  assert.equal(cree.statut, 201);
  publicationId = cree.data.publication.id;

  const amen = await post('/aimes', { cible_type: 'mur', cible_id: publicationId, type: 'amen' }, comptes.jetonB);
  assert.equal(amen.statut, 201, JSON.stringify(amen.data));
  assert.equal(amen.data.aime.nb_amen, 1);
  assert.equal(amen.data.aime.nb_jaime, 0);
  assert.equal(amen.data.aime.mon_type, 'amen');
  assert.equal(amen.data.aime.a_aime, true);
  assert.equal(await compterAimes(comptes.b.membreId, publicationId), 1);
  assert.equal(await compterNotifications(comptes.a.membreId, 'mur_reaction'), 1, 'une cloche pour la réaction');

  const encore = await post('/aimes', { cible_type: 'mur', cible_id: publicationId, type: 'amen' }, comptes.jetonB);
  assert.equal(encore.statut, 201);
  assert.equal(encore.data.aime.nb_amen, 1, 'même type, pas de doublon');
  assert.equal(await compterAimes(comptes.b.membreId, publicationId), 1);
  assert.equal(await compterNotifications(comptes.a.membreId, 'mur_reaction'), 1, 'même type, pas de nouvelle cloche');

  const priere = await post('/aimes', { cible_type: 'mur', cible_id: publicationId, type: 'priere' }, comptes.jetonB);
  assert.equal(priere.statut, 201);
  assert.equal(priere.data.aime.nb_amen, 0);
  assert.equal(priere.data.aime.nb_priere, 1);
  assert.equal(priere.data.aime.mon_type, 'priere');
  assert.equal(await compterNotifications(comptes.a.membreId, 'mur_reaction'), 2, 'type changé, nouvelle cloche');

  const invalide = await post('/aimes', { cible_type: 'mur', cible_id: publicationId, type: 'nimporte' }, comptes.jetonB);
  assert.equal(invalide.statut, 400);

  const soi = await post('/aimes', { cible_type: 'mur', cible_id: publicationId, type: 'jaime' }, comptes.jetonA);
  assert.equal(soi.statut, 201);
  assert.equal(await compterNotifications(comptes.a.membreId, 'mur_reaction'), 2, 'pas de cloche pour soi-même');
});

test('commentaires : réponse à un niveau, parent d’une autre cible refusé', async () => {
  const commentaire = await post('/commentaires', { cible_type: 'mur', cible_id: publicationId, texte: 'Merci pour ce mot.' }, comptes.jetonB);
  assert.equal(commentaire.statut, 201, JSON.stringify(commentaire.data));
  assert.equal(commentaire.data.commentaire.parent_id, null);
  commentaireB = commentaire.data.commentaire;
  assert.equal(await compterNotifications(comptes.a.membreId, 'mur_commentaire'), 1, 'cloche pour l’auteur de la publication');

  const reponse = await post('/commentaires', { cible_type: 'mur', cible_id: publicationId, texte: 'Avec joie.', parent_id: commentaireB.id }, comptes.jetonA);
  assert.equal(reponse.statut, 201);
  assert.equal(reponse.data.commentaire.parent_id, commentaireB.id);
  assert.equal(await compterNotifications(comptes.b.membreId, 'mur_commentaire'), 1, 'cloche pour l’auteur du commentaire parent');
  assert.equal(await compterNotifications(comptes.a.membreId, 'mur_commentaire'), 1, 'pas de doublon pour l’auteur qui répond');

  const reponseDeReponse = await post('/commentaires', { cible_type: 'mur', cible_id: publicationId, texte: 'Trop tard.', parent_id: reponse.data.commentaire.id }, comptes.jetonB);
  assert.equal(reponseDeReponse.statut, 400, 'une réponse ne peut pas avoir de réponse');

  const autrePub = await post('/mur', { texte: 'Autre publication.', categorie: 'autre' }, comptes.jetonC);
  const autreCom = await post('/commentaires', { cible_type: 'mur', cible_id: autrePub.data.publication.id, texte: 'Commentaire ailleurs.' }, comptes.jetonB);
  const mauvaisParent = await post('/commentaires', { cible_type: 'mur', cible_id: publicationId, texte: 'Mauvais parent.', parent_id: autreCom.data.commentaire.id }, comptes.jetonB);
  assert.equal(mauvaisParent.statut, 400, 'le parent doit viser la même cible');

  const liste = await get(`/commentaires?cible_type=mur&cible_id=${publicationId}`, comptes.jetonA);
  assert.equal(liste.statut, 200);
  const trouvee = liste.data.commentaires.find((c) => c.id === reponse.data.commentaire.id);
  assert.equal(trouvee.parent_id, commentaireB.id, 'GET renvoie parent_id');
});

test('mentions : un membre mentionné, déduplication, soi-même ignoré, 6 refusées', async () => {
  const mention = await post('/commentaires', { cible_type: 'mur', cible_id: publicationId, texte: 'Pour @Membre B.', mentions: [comptes.b.membreId] }, comptes.jetonC);
  assert.equal(mention.statut, 201, JSON.stringify(mention.data));
  assert.equal(await compterNotifications(comptes.b.membreId, 'mur_mention'), 1);

  const doublon = await post('/commentaires', { cible_type: 'mur', cible_id: publicationId, texte: 'Encore @Membre B.', mentions: [comptes.b.membreId, comptes.b.membreId] }, comptes.jetonC);
  assert.equal(doublon.statut, 201);
  assert.equal(await compterNotifications(comptes.b.membreId, 'mur_mention'), 2, 'mention dédupliquée, une seule cloche');

  const soi = await post('/commentaires', { cible_type: 'mur', cible_id: publicationId, texte: 'Pour moi.', mentions: [comptes.c.membreId] }, comptes.jetonC);
  assert.equal(soi.statut, 201);
  assert.equal(await compterNotifications(comptes.c.membreId, 'mur_mention'), 0, 'pas de mention pour soi-même');

  const six = [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()];
  const trop = await post('/commentaires', { cible_type: 'mur', cible_id: publicationId, texte: 'Trop de mentions.', mentions: six }, comptes.jetonC);
  assert.equal(trop.statut, 400, '6 mentions refusées');

  const inconnu = await post('/commentaires', { cible_type: 'mur', cible_id: publicationId, texte: 'Mention inconnue.', mentions: [crypto.randomUUID()] }, comptes.jetonC);
  assert.equal(inconnu.statut, 400, 'mention inexistante refusée');
});
