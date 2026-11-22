// Tests des nominations et bureaux, 21 nov. 2026 : déplacement
// d'un bureau entier, synchronisation au déplacement d'une
// personne, filtre du Bureau, marqueur de nomination.
// Intégration seulement : lance le serveur réel en processus
// enfant sur une base PostgreSQL de test (ne JAMAIS pointer
// vers la production), comme culte_presence.test.js ; sans
// TEST_DATABASE_URL, elle s'arrête (code 0), comme les autres
// tests d'intégration du dépôt.
//
// Lancer :  TEST_DATABASE_URL="postgresql://..." TEST_JWT_SECRET="..." node --test tests/bureau_deplacement.test.js
// ou simplement : npm test   (avec .env.test, voir ci-dessous)
import test from 'node:test';
import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import argon2 from 'argon2';

const DATABASE_URL = process.env.TEST_DATABASE_URL;
const JWT_SECRET = process.env.TEST_JWT_SECRET || 'secret-de-test-32-caracteres-minimum!!';

if (DATABASE_URL) {
const DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3467;
const BASE = `http://127.0.0.1:${PORT}`;

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

async function connexion(email) {
  const { statut, data } = await post('/auth/connexion', { identifiant: email, mot_de_passe: MDP });
  assert.equal(statut, 200, `connexion de ${email}`);
  return data.access;
}

const comptes = {};
let client;
let etabIspam;
let etabCeleste;

async function creerCompte(clientPg, { email, role, nom, etablissementId }) {
  const hash = await argon2.hash(MDP, { type: argon2.argon2id });
  const u = (
    await clientPg.query(
      `INSERT INTO utilisateurs (email, mot_de_passe_hash, role) VALUES ($1,$2,$3) RETURNING id`,
      [email, hash, role],
    )
  ).rows[0];
  const membre = (
    await clientPg.query(
      `INSERT INTO membres (utilisateur_id, nom_complet, etablissement_id, fonction) VALUES ($1,$2,$3,'Membre') RETURNING id`,
      [u.id, nom, etablissementId ?? null],
    )
  ).rows[0];
  return { utilisateurId: u.id, membreId: membre.id };
}

async function creerBureau(jeton, corps) {
  const { statut, data } = await post('/admin/bureau', corps, jeton);
  assert.equal(statut, 201, `création au Bureau ${JSON.stringify(corps)}`);
  return data;
}

async function bureauAdmin(jeton) {
  const { statut, data } = await get('/admin/bureau', jeton);
  assert.equal(statut, 200);
  return data;
}

test.before(async () => {
  server = fork(path.join(DIR, '..', 'server.js'), {
    env: { ...process.env, PORT: String(PORT), DATABASE_URL, JWT_SECRET, DATABASE_SSL: 'false' },
    silent: true,
  });
  await attendreSante();

  client = new pg.Client({ connectionString: DATABASE_URL });
  await client.connect();
  etabIspam = (await client.query(`SELECT id FROM etablissements WHERE nom = 'ISPAM'`)).rows[0];
  if (!etabIspam) etabIspam = (await client.query(`INSERT INTO etablissements (nom) VALUES ('ISPAM') RETURNING id`)).rows[0];
  etabCeleste = (await client.query(`SELECT id FROM etablissements WHERE nom = 'Céleste'`)).rows[0];
  if (!etabCeleste) etabCeleste = (await client.query(`INSERT INTO etablissements (nom) VALUES ('Céleste') RETURNING id`)).rows[0];

  comptes.admin = await creerCompte(client, { email: `bur-admin-${SUFFIXE}@test.ci`, role: 'admin_general', nom: 'Bur Admin Test' });
  comptes.a = await creerCompte(client, { email: `bur-a-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Bur A Test', etablissementId: etabIspam.id });
  comptes.b = await creerCompte(client, { email: `bur-b-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Bur B Test', etablissementId: etabCeleste.id });
  comptes.jetonAdmin = await connexion(`bur-admin-${SUFFIXE}@test.ci`);
  comptes.jetonA = await connexion(`bur-a-${SUFFIXE}@test.ci`);
  comptes.jetonB = await connexion(`bur-b-${SUFFIXE}@test.ci`);
});

test.after(async () => {
  if (client) await client.end().catch(() => {});
  if (server) server.kill('SIGTERM');
});

// ── Filtre et marqueur ────────────────────────────────────────
test('bureau : filtre public par établissement', async () => {
  await creerBureau(comptes.jetonAdmin, { nom: 'Bur Ispam Un', fonction: 'Responsable', etablissement_id: etabIspam.id });
  await creerBureau(comptes.jetonAdmin, { nom: 'Bur Celeste Un', fonction: 'Responsable', etablissement_id: etabCeleste.id });
  const { statut, data } = await get(`/bureau?etablissement_id=${etabIspam.id}`);
  assert.equal(statut, 200);
  assert.ok(data.length >= 1, 'au moins une entrée ISPAM');
  assert.ok(data.every((b) => b.etablissement === 'ISPAM'), 'que des ISPAM');
  const tous = await get('/bureau');
  assert.ok(tous.data.length >= data.length, 'sans filtre, tout le Bureau');
});

test('bureau : marqueur de nomination sur la liste administrateur', async () => {
  const membre = await creerCompte(client, { email: `bur-nom-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Bur Nom Test', etablissementId: etabIspam.id });
  const ligne = await client.query(
    `INSERT INTO bureau_membres (nom, fonction, membre_id, etablissement_id) VALUES ('BUR NOM TEST', 'MODÉRATEUR', $1, $2) RETURNING id`,
    [membre.membreId, etabIspam.id],
  );
  assert.ok(ligne.rows[0].id, 'ligne liée au membre');
  const { statut } = await post('/admin/nominations', {
    membre_id: membre.membreId,
    portee: 'etablissement',
    etablissement_id: etabIspam.id,
    fonction_code: 'moderateur',
  }, comptes.jetonAdmin);
  assert.equal(statut, 201);
  const liste = await bureauAdmin(comptes.jetonAdmin);
  const trouvee = liste.find((b) => b.membre_id === membre.membreId);
  assert.ok(trouvee, 'la ligne liée est dans la liste');
  assert.ok(trouvee.nomination, 'le marqueur est présent');
  assert.equal(trouvee.nomination.portee, 'etablissement');
  assert.equal(trouvee.nomination.etablissement, 'ISPAM');
  const sansNomination = liste.find((b) => b.nom === 'BUR CELESTE UN');
  assert.equal(sansNomination.nomination, null, 'sans nomination, marqueur nul');
});

// ── Déplacement de groupe ────────────────────────────────────
test('bureau : déplacement de tout un établissement', async () => {
  await creerBureau(comptes.jetonAdmin, { nom: 'Bur Dep Un', fonction: 'Responsable', etablissement_id: etabIspam.id });
  await creerBureau(comptes.jetonAdmin, { nom: 'Bur Dep Deux', fonction: 'Trésorier', etablissement_id: etabIspam.id });
  const avant = (await client.query(`SELECT COUNT(*)::int AS n FROM journal_audit WHERE action = 'bureau.deplace'`)).rows[0].n;
  const { statut, data } = await post('/admin/bureau/deplacer', {
    source_etablissement_id: etabIspam.id,
    destination_etablissement_id: etabCeleste.id,
  }, comptes.jetonAdmin);
  assert.equal(statut, 200);
  assert.ok(data.deplaces >= 2, 'au moins les deux lignes créées ici');
  const apres = (await client.query(`SELECT COUNT(*)::int AS n FROM journal_audit WHERE action = 'bureau.deplace'`)).rows[0].n;
  assert.equal(apres - avant, data.deplaces, 'une entrée d’audit par ligne déplacée');
  const celeste = await get(`/bureau?etablissement_id=${etabCeleste.id}`);
  assert.ok(celeste.data.some((b) => b.nom === 'BUR DEP UN'), 'la ligne a suivi vers Céleste');
  const ispam = await get(`/bureau?etablissement_id=${etabIspam.id}`);
  assert.ok(!ispam.data.some((b) => b.nom === 'BUR DEP UN'), 'plus rien sous ISPAM pour cette ligne');
  // Les comptes membres ne suivent pas : le membre A reste ISPAM.
  const membre = (await client.query(`SELECT etablissement_id FROM membres WHERE id = $1`, [comptes.a.membreId])).rows[0];
  assert.equal(membre.etablissement_id, etabIspam.id, 'le compte membre ne bouge pas');
});

test('bureau : déplacement refusé, source vide, destination Structure', async () => {
  const inconnu = '00000000-0000-0000-0000-000000000000';
  let r = await post('/admin/bureau/deplacer', { source_etablissement_id: etabIspam.id, destination_etablissement_id: etabIspam.id }, comptes.jetonAdmin);
  assert.equal(r.statut, 400, 'source et destination identiques');
  r = await post('/admin/bureau/deplacer', { source_etablissement_id: inconnu, destination_etablissement_id: etabCeleste.id }, comptes.jetonAdmin);
  assert.equal(r.statut, 404, 'source inconnue');
  r = await post('/admin/bureau/deplacer', { source_etablissement_id: etabCeleste.id, destination_etablissement_id: inconnu }, comptes.jetonAdmin);
  assert.equal(r.statut, 404, 'destination inconnue');
  // Source vide : zéro ligne, sans erreur. La Structure ne
  // contient aucune ligne ici, la source nulle est donc vide.
  r = await post('/admin/bureau/deplacer', { source_etablissement_id: null, destination_etablissement_id: etabCeleste.id }, comptes.jetonAdmin);
  assert.equal(r.statut, 200);
  assert.equal(r.data.deplaces, 0, 'source vide, zéro déplacement');
  // Un membre seul ne déplace pas un bureau.
  r = await post('/admin/bureau/deplacer', { source_etablissement_id: etabCeleste.id, destination_etablissement_id: etabIspam.id }, comptes.jetonA);
  assert.equal(r.statut, 403, 'administrateur général seulement');
});

// ── Synchronisation au déplacement d'une personne ────────────
test('bureau : la correction du membre déplace son entrée au Bureau', async () => {
  const membre = await creerCompte(client, { email: `bur-sync-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Bur Sync Test', etablissementId: etabIspam.id });
  await client.query(
    `INSERT INTO bureau_membres (nom, fonction, membre_id, etablissement_id) VALUES ('BUR SYNC TEST', 'RESPONSABLE', $1, $2)`,
    [membre.membreId, etabIspam.id],
  );
  const { statut } = await put(`/admin/membres/${membre.membreId}`, { etablissement_id: etabCeleste.id }, comptes.jetonAdmin);
  assert.equal(statut, 200);
  const liste = await bureauAdmin(comptes.jetonAdmin);
  const ligne = liste.find((b) => b.membre_id === membre.membreId);
  assert.ok(ligne, 'la ligne existe toujours');
  assert.equal(ligne.etablissement_id, etabCeleste.id, 'l’entrée au Bureau a suivi');
  assert.equal(ligne.etablissement, 'Céleste');
});

test('bureau : le membre qui change d’établissement déplace son entrée', async () => {
  const membre = await creerCompte(client, { email: `bur-moi-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Bur Moi Test', etablissementId: etabIspam.id });
  await client.query(
    `INSERT INTO bureau_membres (nom, fonction, membre_id, etablissement_id) VALUES ('BUR MOI TEST', 'RESPONSABLE', $1, $2)`,
    [membre.membreId, etabIspam.id],
  );
  const jeton = await connexion(`bur-moi-${SUFFIXE}@test.ci`);
  let r = await post('/moi/etablissement', { etablissement: 'Céleste' }, jeton);
  assert.equal(r.statut, 200);
  let liste = await bureauAdmin(comptes.jetonAdmin);
  let ligne = liste.find((b) => b.membre_id === membre.membreId);
  assert.equal(ligne.etablissement_id, etabCeleste.id, 'l’entrée a suivi vers Céleste');
  r = await post('/moi/etablissement', { etablissement: 'Autre' }, jeton);
  assert.equal(r.statut, 200);
  liste = await bureauAdmin(comptes.jetonAdmin);
  ligne = liste.find((b) => b.membre_id === membre.membreId);
  assert.equal(ligne.etablissement_id, null, 'sans établissement, l’entrée revient sous Structure');
});

test('bureau : le déplacement du compte ne touche pas aux nominations', async () => {
  const membre = await creerCompte(client, { email: `bur-nom2-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Bur Nom2 Test', etablissementId: etabIspam.id });
  await client.query(
    `INSERT INTO bureau_membres (nom, fonction, membre_id, etablissement_id) VALUES ('BUR NOM2 TEST', 'RESPONSABLE', $1, $2)`,
    [membre.membreId, etabIspam.id],
  );
  const nom = await post('/admin/nominations', {
    membre_id: membre.membreId,
    portee: 'etablissement',
    etablissement_id: etabIspam.id,
    fonction_code: 'moderateur',
  }, comptes.jetonAdmin);
  assert.equal(nom.statut, 201);
  const { statut } = await put(`/admin/membres/${membre.membreId}`, { etablissement_id: etabCeleste.id }, comptes.jetonAdmin);
  assert.equal(statut, 200);
  const { data } = await get(`/admin/nominations?membre_id=${membre.membreId}`, comptes.jetonAdmin);
  const trouvee = data.find((n) => n.id === nom.data.id);
  assert.ok(trouvee, 'la nomination existe toujours');
  assert.equal(trouvee.etablissement_id, etabIspam.id, 'elle reste sur l’ancien établissement, à trancher par l’administrateur');
});
}
