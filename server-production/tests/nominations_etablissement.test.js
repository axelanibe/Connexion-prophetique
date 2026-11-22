// Tests des nominations et bureaux, 21 nov. 2026 : portée
// établissement des nominations, gardes par établissement.
// Intégration seulement : lance le serveur réel en processus
// enfant sur une base PostgreSQL de test (ne JAMAIS pointer
// vers la production), comme culte_presence.test.js ; sans
// TEST_DATABASE_URL, elle s'arrête (code 0), comme les autres
// tests d'intégration du dépôt.
//
// Lancer :  TEST_DATABASE_URL="postgresql://..." TEST_JWT_SECRET="..." node --test tests/nominations_etablissement.test.js
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
const PORT = 3466;
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

async function creerCompte(clientPg, { email, role, nom, etablissementId, etablissementAdminId }) {
  const hash = await argon2.hash(MDP, { type: argon2.argon2id });
  const u = (
    await clientPg.query(
      `INSERT INTO utilisateurs (email, mot_de_passe_hash, role, etablissement_admin_id) VALUES ($1,$2,$3,$4) RETURNING id`,
      [email, hash, role, etablissementAdminId ?? null],
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

async function creerNomination(jeton, corps) {
  const { statut, data } = await post('/admin/nominations', corps, jeton);
  assert.equal(statut, 201, `création de nomination ${JSON.stringify(corps)}`);
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

  comptes.admin = await creerCompte(client, { email: `nom-admin-${SUFFIXE}@test.ci`, role: 'admin_general', nom: 'Nom Admin Test' });
  comptes.a = await creerCompte(client, { email: `nom-a-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Nom A Test', etablissementId: etabIspam.id });
  comptes.b = await creerCompte(client, { email: `nom-b-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Nom B Test', etablissementId: etabCeleste.id });
  comptes.adminEtab = await creerCompte(client, { email: `nom-etab-${SUFFIXE}@test.ci`, role: 'admin_etablissement', nom: 'Nom Etab Test', etablissementId: etabIspam.id, etablissementAdminId: etabIspam.id });
  comptes.jetonAdmin = await connexion(`nom-admin-${SUFFIXE}@test.ci`);
  comptes.jetonA = await connexion(`nom-a-${SUFFIXE}@test.ci`);
  comptes.jetonB = await connexion(`nom-b-${SUFFIXE}@test.ci`);
  comptes.jetonEtab = await connexion(`nom-etab-${SUFFIXE}@test.ci`);
});

test.after(async () => {
  if (client) await client.end().catch(() => {});
  if (server) server.kill('SIGTERM');
});

// ── Création, portée établissement ───────────────────────────
test('nomination établissement : création, lecture admin et Mes nominations', async () => {
  const creee = await creerNomination(comptes.jetonAdmin, {
    membre_id: comptes.a.membreId,
    portee: 'etablissement',
    etablissement_id: etabIspam.id,
    fonction_code: 'moderateur',
  });
  assert.equal(creee.portee, 'etablissement');
  assert.equal(creee.etablissement_id, etabIspam.id);

  const { statut, data } = await get(`/admin/nominations?etablissement_id=${etabIspam.id}`, comptes.jetonAdmin);
  assert.equal(statut, 200);
  const trouvee = data.find((n) => n.id === creee.id);
  assert.ok(trouvee, 'la nomination est listée par établissement');
  assert.equal(trouvee.etablissement_nom, 'ISPAM');
  assert.equal(trouvee.membre_etablissement, 'ISPAM');

  const moi = await get('/moi/nominations', comptes.jetonA);
  assert.equal(moi.statut, 200);
  const mienne = moi.data.find((n) => n.id === creee.id);
  assert.ok(mienne, 'le membre voit sa nomination');
  assert.equal(mienne.etablissement_nom, 'ISPAM');

  const autre = await get('/moi/nominations', comptes.jetonB);
  assert.equal(autre.data.find((n) => n.id === creee.id), undefined, 'un autre membre ne la voit pas');
});

test('nomination établissement : validation des portées', async () => {
  const base = { membre_id: comptes.b.membreId, fonction_code: 'moderateur' };
  let r = await post('/admin/nominations', { ...base, portee: 'structure', etablissement_id: etabIspam.id }, comptes.jetonAdmin);
  assert.equal(r.statut, 400, 'structure avec établissement');
  r = await post('/admin/nominations', { ...base, portee: 'etablissement' }, comptes.jetonAdmin);
  assert.equal(r.statut, 400, 'établissement sans établissement');
  const ev = (await client.query(`INSERT INTO evenements (nom, type) VALUES ('Nom Activité Test', 'camp') RETURNING id`)).rows[0];
  r = await post('/admin/nominations', { ...base, portee: 'etablissement', etablissement_id: etabIspam.id, evenement_id: ev.id }, comptes.jetonAdmin);
  assert.equal(r.statut, 400, 'établissement avec activité');
  r = await post('/admin/nominations', { ...base, portee: 'activite', evenement_id: ev.id, etablissement_id: etabIspam.id }, comptes.jetonAdmin);
  assert.equal(r.statut, 400, 'activité avec établissement');
  r = await post('/admin/nominations', { ...base, portee: 'etablissement', etablissement_id: '00000000-0000-0000-0000-000000000000' }, comptes.jetonAdmin);
  assert.equal(r.statut, 404, 'établissement inconnu');
});

test('nomination établissement : doublon 409', async () => {
  await creerNomination(comptes.jetonAdmin, {
    membre_id: comptes.b.membreId,
    portee: 'etablissement',
    etablissement_id: etabCeleste.id,
    fonction_code: 'editeur',
  });
  const { statut } = await post('/admin/nominations', {
    membre_id: comptes.b.membreId,
    portee: 'etablissement',
    etablissement_id: etabCeleste.id,
    fonction_code: 'editeur',
  }, comptes.jetonAdmin);
  assert.equal(statut, 409, 'même membre, même portée, même établissement, même fonction');
  // Même fonction, autre établissement : pas un doublon.
  const { statut: s2 } = await post('/admin/nominations', {
    membre_id: comptes.b.membreId,
    portee: 'etablissement',
    etablissement_id: etabIspam.id,
    fonction_code: 'editeur',
  }, comptes.jetonAdmin);
  assert.equal(s2, 201, 'autre établissement, pas un doublon');
});

// ── Modification et révocation ──────────────────────────────
test('nomination établissement : la nomination suit la personne par PUT', async () => {
  const creee = await creerNomination(comptes.jetonAdmin, {
    membre_id: comptes.a.membreId,
    portee: 'etablissement',
    etablissement_id: etabIspam.id,
    fonction_code: 'tresorier',
  });
  const { statut, data } = await put(`/admin/nominations/${creee.id}`, { etablissement_id: etabCeleste.id }, comptes.jetonAdmin);
  assert.equal(statut, 200);
  assert.equal(data.etablissement_id, etabCeleste.id, 'la nomination suit vers Céleste');
  // Une nomination de structure ne change pas d'établissement.
  const structure = await creerNomination(comptes.jetonAdmin, {
    membre_id: comptes.a.membreId,
    portee: 'structure',
    fonction_code: 'communication',
  });
  const { statut: s2 } = await put(`/admin/nominations/${structure.id}`, { etablissement_id: etabIspam.id }, comptes.jetonAdmin);
  assert.equal(s2, 400, 'structure ne prend pas d’établissement');
});

test('nomination établissement : révocation, puis 409', async () => {
  const creee = await creerNomination(comptes.jetonAdmin, {
    membre_id: comptes.b.membreId,
    portee: 'etablissement',
    etablissement_id: etabCeleste.id,
    fonction_code: 'responsable',
  });
  const { statut } = await post(`/admin/nominations/${creee.id}/revoquer`, {}, comptes.jetonAdmin);
  assert.equal(statut, 200);
  const { statut: s2 } = await post(`/admin/nominations/${creee.id}/revoquer`, {}, comptes.jetonAdmin);
  assert.equal(s2, 409, 'déjà révoquée');
  const moi = await get('/moi/nominations', comptes.jetonB);
  assert.equal(moi.data.find((n) => n.id === creee.id), undefined, 'révoquée, plus visible');
});

// ── Nominations publiques d'un établissement ────────────────
test('nominations d’établissement : liste pour les membres, jamais le matricule', async () => {
  const creee = await creerNomination(comptes.jetonAdmin, {
    membre_id: comptes.a.membreId,
    portee: 'etablissement',
    etablissement_id: etabIspam.id,
    fonction_code: 'direction',
  });
  // Sécurité, 22 nov. 2026 : la liste n'est plus publique, une
  // session membre est exigée, et le matricule ne sort plus.
  const sansJeton = await get(`/etablissements/${etabIspam.id}/nominations`);
  assert.equal(sansJeton.statut, 401, 'sans jeton : 401');
  const { statut, data } = await get(`/etablissements/${etabIspam.id}/nominations`, comptes.jetonA);
  assert.equal(statut, 200);
  const trouvee = data.find((n) => n.id === creee.id);
  assert.ok(trouvee, 'la nomination est visible pour un membre');
  assert.equal(trouvee.fonction_libelle, 'Direction générale');
  assert.equal(trouvee.statut, 'active');
  assert.equal(trouvee.permissions, undefined, 'jamais les permissions');
  assert.equal('matricule' in trouvee, false, 'jamais le matricule');
  const { statut: s2 } = await get('/etablissements/00000000-0000-0000-0000-000000000000/nominations', comptes.jetonA);
  assert.equal(s2, 404, 'établissement inconnu');
});

// ── Gardes par établissement ────────────────────────────────
test('garde établissement : la nomination accorde pour son établissement seulement', async () => {
  // Suivi d'un membre de l'ISPAM, sans inscription : sans la
  // portée établissement, la garde le refuserait.
  const suiviIspam = (await client.query(
    `INSERT INTO suivis_scolaires (membre_id, etablissement_id, classe, annee_scolaire) VALUES ($1,$2,'6e','2026-2027') RETURNING id`,
    [comptes.a.membreId, etabIspam.id],
  )).rows[0];
  const suiviCeleste = (await client.query(
    `INSERT INTO suivis_scolaires (membre_id, etablissement_id, classe, annee_scolaire) VALUES ($1,$2,'6e','2026-2027') RETURNING id`,
    [comptes.b.membreId, etabCeleste.id],
  )).rows[0];
  await creerNomination(comptes.jetonAdmin, {
    membre_id: comptes.adminEtab.membreId,
    portee: 'etablissement',
    etablissement_id: etabIspam.id,
    fonction_code: 'direction',
  });
  let r = await get(`/admin/suivis-scolaires/${suiviIspam.id}`, comptes.jetonEtab);
  assert.equal(r.statut, 200, 'suivi de son établissement, accordé');
  r = await get(`/admin/suivis-scolaires/${suiviCeleste.id}`, comptes.jetonEtab);
  assert.equal(r.statut, 403, 'suivi d’un autre établissement, refusé');
});

test('garde établissement : la liste est restreinte aux activités de l’établissement', async () => {
  const evenement = (await client.query(
    `INSERT INTO evenements (nom, type, etablissement_id) VALUES ('Nom Camp ISPAM', 'camp', $1) RETURNING id`,
    [etabIspam.id],
  )).rows[0];
  await client.query(`INSERT INTO inscriptions (evenement_id, membre_id) VALUES ($1,$2)`, [evenement.id, comptes.a.membreId]);
  const r = await get('/admin/suivis-scolaires', comptes.jetonEtab);
  assert.equal(r.statut, 200);
  const ids = r.data.map((s) => s.membre_id);
  assert.ok(ids.includes(comptes.a.membreId), 'le suivi du membre inscrit à une activité de son établissement est visible');
  assert.ok(!ids.includes(comptes.b.membreId), 'le suivi d’un autre établissement ne l’est pas');
});

test('garde établissement : une nomination de structure accorde toujours', async () => {
  const autreEtab = await creerCompte(client, { email: `nom-etab2-${SUFFIXE}@test.ci`, role: 'admin_etablissement', nom: 'Nom Etab2 Test', etablissementId: etabCeleste.id, etablissementAdminId: etabCeleste.id });
  const jeton = await connexion(`nom-etab2-${SUFFIXE}@test.ci`);
  await creerNomination(comptes.jetonAdmin, {
    membre_id: autreEtab.membreId,
    portee: 'structure',
    fonction_code: 'direction',
  });
  // Suivi de Céleste, membre sans aucune inscription : seule une
  // nomination de structure l'accorde, une nomination d'activité
  // ne le ferait pas.
  const suivi = (await client.query(
    `INSERT INTO suivis_scolaires (membre_id, etablissement_id, classe, annee_scolaire) VALUES ($1,$2,'5e','2025-2026') RETURNING id`,
    [comptes.b.membreId, etabCeleste.id],
  )).rows[0];
  const r = await get(`/admin/suivis-scolaires/${suivi.id}`, jeton);
  assert.equal(r.statut, 200, 'structure, sans périmètre');
});
}
