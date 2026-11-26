// Tests d'intégration : enregistrements et modération du mur
// des membres v2, tranche 5. Le serveur réel est lancé en
// processus enfant sur une base PostgreSQL de test (ne JAMAIS
// pointer vers la production).
//
// Lancer :  TEST_DATABASE_URL=postgresql://postgres@127.0.0.1:5432/<base> node --test tests/mur_moderation.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import pg from 'pg';
import argon2 from 'argon2';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3471;
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

async function del(chemin, jeton) {
  const r = await fetch(`${BASE}${chemin}`, {
    method: 'DELETE',
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

async function statutPublication(id) {
  const ligne = (await client.query(`SELECT statut_moderation FROM mur_publications WHERE id = $1`, [id])).rows[0];
  return ligne?.statut_moderation ?? null;
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

  comptes.a = await creerCompte(client, { email: `membre-a-murmod-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Membre A Mod', etablissementMembreId: etab.id });
  comptes.b = await creerCompte(client, { email: `membre-b-murmod-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Membre B Mod', etablissementMembreId: etab.id });
  comptes.c = await creerCompte(client, { email: `admin-c-murmod-${SUFFIXE}@test.ci`, role: 'admin_general', nom: 'Admin C Mod', etablissementMembreId: etab.id });
  comptes.jetonA = await connexion(`membre-a-murmod-${SUFFIXE}@test.ci`);
  comptes.jetonB = await connexion(`membre-b-murmod-${SUFFIXE}@test.ci`);
  comptes.jetonC = await connexion(`admin-c-murmod-${SUFFIXE}@test.ci`);
});

test.after(async () => {
  if (client) await client.end().catch(() => {});
  if (server) server.kill('SIGTERM');
});

let p1;
let p2;

test('enregistrements : enregistrer, liste par date, retirer, idempotents', async () => {
  const cree1 = await post('/mur', { texte: 'À garder.', categorie: 'temoignage' }, comptes.jetonA);
  assert.equal(cree1.statut, 201);
  p1 = cree1.data.publication.id;
  const cree2 = await post('/mur', { texte: 'À garder aussi.', categorie: 'verset' }, comptes.jetonA);
  assert.equal(cree2.statut, 201);
  p2 = cree2.data.publication.id;

  const sauve1 = await post(`/mur/${p1}/enregistrer`, {}, comptes.jetonB);
  assert.equal(sauve1.statut, 200, JSON.stringify(sauve1.data));
  assert.equal(sauve1.data.enregistre, true);
  const encore = await post(`/mur/${p1}/enregistrer`, {}, comptes.jetonB);
  assert.equal(encore.statut, 200, 'déjà enregistré, toujours 200');

  const fil = await get('/mur', comptes.jetonB);
  const trouvee1 = fil.data.publications.find((p) => p.id === p1);
  const trouvee2 = fil.data.publications.find((p) => p.id === p2);
  assert.equal(trouvee1.enregistre, true);
  assert.equal(trouvee2.enregistre, false);

  await post(`/mur/${p2}/enregistrer`, {}, comptes.jetonB);
  const liste = await get('/mur/enregistrements', comptes.jetonB);
  assert.equal(liste.statut, 200);
  assert.equal(liste.data.publications.length, 2);
  assert.equal(liste.data.publications[0].id, p2, 'la plus récemment enregistrée d’abord');

  const page1 = await get('/mur/enregistrements?limite=1', comptes.jetonB);
  assert.equal(page1.data.publications.length, 1);
  assert.ok(page1.data.suivante, 'un curseur pour la suite');
  const page2 = await get(`/mur/enregistrements?limite=1&avant=${page1.data.suivante}`, comptes.jetonB);
  assert.equal(page2.data.publications.length, 1);
  assert.equal(page2.data.publications[0].id, p1);

  const retire = await del(`/mur/${p1}/enregistrer`, comptes.jetonB);
  assert.equal(retire.statut, 200);
  assert.equal(retire.data.enregistre, false);
  const encoreRetire = await del(`/mur/${p1}/enregistrer`, comptes.jetonB);
  assert.equal(encoreRetire.statut, 200, 'déjà retiré, toujours 200');
  const apres = await get('/mur/enregistrements', comptes.jetonB);
  assert.equal(apres.data.publications.length, 1);

  const absente = await post(`/mur/${crypto.randomUUID()}/enregistrer`, {}, comptes.jetonB);
  assert.equal(absente.statut, 404);
});

test('signalement publication : cliché, en_examen, masquer puis retirer', async () => {
  const signale = await post('/messagerie/signalements', { target_type: 'mur_publication', target_id: p1, reason: 'spam' }, comptes.jetonB);
  assert.equal(signale.statut, 201, JSON.stringify(signale.data));
  const rapport = (await client.query(`SELECT evidence_snapshot, status FROM reports WHERE id = $1`, [signale.data.id])).rows[0];
  assert.equal(rapport.evidence_snapshot.cible, 'mur_publication');
  assert.equal(rapport.evidence_snapshot.publication.id, p1);
  assert.equal(rapport.evidence_snapshot.publication.auteur_id, comptes.a.membreId);
  assert.equal(rapport.evidence_snapshot.publication.texte, 'À garder.');
  assert.equal(await statutPublication(p1), 'en_examen', 'reste visible pendant l’examen');
  const detail = await get(`/mur/${p1}`, comptes.jetonB);
  assert.equal(detail.statut, 200, 'en_examen reste lisible');

  const masque = await post(`/messagerie/moderation/${signale.data.id}/action`, { action: 'masquer', note: 'À examiner.' }, comptes.jetonC);
  assert.equal(masque.statut, 201, JSON.stringify(masque.data));
  assert.equal(await statutPublication(p1), 'masque');
  assert.equal((await get(`/mur/${p1}`, comptes.jetonB)).statut, 404, 'masquée, plus lisible');
  const fil = await get('/mur', comptes.jetonB);
  assert.equal(fil.data.publications.some((p) => p.id === p1), false, 'masquée, hors du fil');

  const signale2 = await post('/messagerie/signalements', { target_type: 'mur_publication', target_id: p1, reason: 'spam' }, comptes.jetonB);
  assert.equal(signale2.statut, 201, 'une publication masquée se signale encore');
  const retire = await post(`/messagerie/moderation/${signale2.data.id}/action`, { action: 'retirer', note: 'Contenu retiré.' }, comptes.jetonC);
  assert.equal(retire.statut, 201, JSON.stringify(retire.data));
  assert.equal(await statutPublication(p1), 'retire');
  const existe = (await client.query(`SELECT COUNT(*)::int AS n FROM mur_publications WHERE id = $1`, [p1])).rows[0];
  assert.equal(existe.n, 1, 'la ligne reste en base pour la traçabilité');

  const tropTard = await post('/messagerie/signalements', { target_type: 'mur_publication', target_id: p1, reason: 'spam' }, comptes.jetonB);
  assert.equal(tropTard.statut, 422, 'une publication retirée ne se signale plus');

  const signaleMembre = await post('/messagerie/signalements', { target_type: 'user', target_id: comptes.a.membreId, reason: 'spam' }, comptes.jetonB);
  assert.equal(signaleMembre.statut, 201);
  const mauvais = await post(`/messagerie/moderation/${signaleMembre.data.id}/action`, { action: 'retirer', note: 'Non.' }, comptes.jetonC);
  assert.equal(mauvais.statut, 422, 'le retrait vise une publication du mur');
});

test('signalement commentaire : cliché, rejeter remet en visible', async () => {
  const cree = await post('/mur', { texte: 'À examiner.', categorie: 'autre' }, comptes.jetonA);
  const p3 = cree.data.publication.id;
  const signale = await post('/messagerie/signalements', { target_type: 'mur_publication', target_id: p3, reason: 'spam' }, comptes.jetonB);
  assert.equal(signale.statut, 201);
  assert.equal(await statutPublication(p3), 'en_examen');
  const rejete = await post(`/messagerie/moderation/${signale.data.id}/action`, { action: 'rejeter', note: 'Rien à signaler.' }, comptes.jetonC);
  assert.equal(rejete.statut, 201, JSON.stringify(rejete.data));
  assert.equal(await statutPublication(p3), 'visible', 'le rejet remet en visible');
  assert.equal((await get(`/mur/${p3}`, comptes.jetonB)).statut, 200);

  const com = await post('/commentaires', { cible_type: 'mur', cible_id: p3, texte: 'Mot déplacé.' }, comptes.jetonB);
  assert.equal(com.statut, 201);
  const comId = com.data.commentaire.id;
  const signaleCom = await post('/messagerie/signalements', { target_type: 'mur_commentaire', target_id: comId, reason: 'harassment' }, comptes.jetonA);
  assert.equal(signaleCom.statut, 201, JSON.stringify(signaleCom.data));
  const rapport = (await client.query(`SELECT evidence_snapshot FROM reports WHERE id = $1`, [signaleCom.data.id])).rows[0];
  assert.equal(rapport.evidence_snapshot.cible, 'mur_commentaire');
  assert.equal(rapport.evidence_snapshot.commentaire.id, comId);
  assert.equal(rapport.evidence_snapshot.commentaire.texte, 'Mot déplacé.');
  assert.equal(rapport.evidence_snapshot.commentaire.auteur, comptes.b.membreId);
  assert.equal(rapport.evidence_snapshot.commentaire.publication_id, p3);
  const averti = await post(`/messagerie/moderation/${signaleCom.data.id}/action`, { action: 'avertir', note: 'Rappel à l’ordre.' }, comptes.jetonC);
  assert.equal(averti.statut, 201);

  const mauvaisCom = await post('/messagerie/signalements', { target_type: 'mur_commentaire', target_id: crypto.randomUUID(), reason: 'spam' }, comptes.jetonA);
  assert.equal(mauvaisCom.statut, 422, 'commentaire inconnu');
  const mauvaisPub = await post('/messagerie/signalements', { target_type: 'mur_publication', target_id: comId, reason: 'spam' }, comptes.jetonA);
  assert.equal(mauvaisPub.statut, 422, 'un commentaire n’est pas une publication');
});
