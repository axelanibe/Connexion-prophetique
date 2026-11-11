// Tests d'intégration : Espace parent, 8 nov. 2026.
// Lien parent-enfant (demande, validation, visibilité), tableau de
// bord parent, moyennes visibles par le parent, clôture d'activité.
// Le serveur réel est lancé en processus enfant sur une base
// PostgreSQL de test (ne JAMAIS pointer vers la production).
//
// Lancer :  TEST_DATABASE_URL=<redacted>
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
const JWT_SECRET = process.env.TEST_JWT_SECRET || 'secret-de-test-32-caracteres-minimum!';

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

async function get(chemin, jeton) {
  const r = await fetch(`${BASE}${chemin}`, {
    headers: jeton ? { authorization: `Bearer ${jeton}` } : {},
  });
  let data = null;
  try { data = await r.json(); } catch (_) {}
  return { statut: r.status, data };
}

async function suppr(chemin, jeton) {
  const r = await fetch(`${BASE}${chemin}`, {
    method: 'DELETE',
    headers: jeton ? { authorization: `Bearer ${jeton}` } : {},
  });
  let data = null;
  try { data = await r.json(); } catch (_) {}
  return { statut: r.status, data };
}

const MDP = 'MotDePasseTest123';
let parent;
let enfant;
let etranger;
let jetonsAdmin;
let lienId;

async function inscrire(email, nom) {
  const { statut, data } = await post('/auth/inscription', { email, mot_de_passe: MDP, nom_complet: nom });
  assert.equal(statut, 201, `inscription de ${nom}`);
  return data;
}

// ── Comptes ──────────────────────────────────────────────────
test('inscription : parent, enfant et étranger', async () => {
  parent = await inscrire(`parent${Date.now()}@test.ci`, 'Parent Testeur');
  enfant = await inscrire(`enfant${Date.now()}@test.ci`, 'Enfant Testeur');
  etranger = await inscrire(`etranger${Date.now()}@test.ci`, 'Étranger Testeur');
});

test('connexion : admin_general', async () => {
  const { statut, data } = await post('/auth/connexion', {
    identifiant: 'admin@test.ci',
    mot_de_passe: MDP,
  });
  assert.equal(statut, 200);
  jetonsAdmin = data;
});

// ── Recherche par matricule ──────────────────────────────────
test('par-matricule : le parent retrouve l’enfant, inconnu → 404', async () => {
  const { statut, data } = await get(`/moi/membres/par-matricule/${enfant.membre.matricule}`, parent.access);
  assert.equal(statut, 200);
  assert.equal(data.id, enfant.membre.id);
  assert.equal(data.nom_complet, 'Enfant Testeur');
  const inconnu = await get('/moi/membres/par-matricule/CP-ZZ-9999', parent.access);
  assert.equal(inconnu.statut, 404);
});

// ── Recherche par nom ou par matricule, carte 128 ──────────────
test('recherche : par nom en minuscules, par matricule, trop court → 400, inconnu → vide', async () => {
  const parNom = await get(`/moi/membres/recherche?q=${encodeURIComponent('enfant testeur')}`, parent.access);
  assert.equal(parNom.statut, 200);
  assert.ok(Array.isArray(parNom.data) && parNom.data.length >= 1, 'au moins un résultat');
  const trouve = parNom.data.find((m) => m.id === enfant.membre.id);
  assert.ok(trouve, 'l’enfant est trouvé par son nom, quelle que soit la casse');
  assert.equal(trouve.nom_complet, 'ENFANT TESTEUR');
  assert.equal(trouve.matricule, enfant.membre.matricule);
  assert.deepEqual(Object.keys(trouve).sort(), ['etablissement', 'id', 'matricule', 'nom_complet']);
  const parMatricule = await get(`/moi/membres/recherche?q=${encodeURIComponent(enfant.membre.matricule)}`, parent.access);
  assert.equal(parMatricule.statut, 200);
  assert.equal(parMatricule.data[0]?.id, enfant.membre.id, 'le matricule exact sort en premier');
  const court = await get('/moi/membres/recherche?q=ab', parent.access);
  assert.equal(court.statut, 400);
  const inconnu = await get('/moi/membres/recherche?q=ZZZINCONNU', parent.access);
  assert.equal(inconnu.statut, 200);
  assert.deepEqual(inconnu.data, []);
});

// ── Lien parent-enfant ───────────────────────────────────────
test('lien : création → 201 en_attente ; doublon → 409 ; soi-même → 400', async () => {
  const { statut, data } = await post('/moi/liens-parent-enfant', { enfant_membre_id: enfant.membre.id }, parent.access);
  assert.equal(statut, 201);
  assert.equal(data.statut, 'en_attente');
  lienId = data.id;
  const doublon = await post('/moi/liens-parent-enfant', { enfant_membre_id: enfant.membre.id }, parent.access);
  assert.equal(doublon.statut, 409);
  const soi = await post('/moi/liens-parent-enfant', { enfant_membre_id: parent.membre.id }, parent.access);
  assert.equal(soi.statut, 400);
});

test('enfants : vide tant que le lien n’est pas validé', async () => {
  const { statut, data } = await get('/moi/enfants', parent.access);
  assert.equal(statut, 200);
  assert.deepEqual(data, []);
  const liens = await get('/moi/liens-parent-enfant', parent.access);
  assert.equal(liens.statut, 200);
  assert.equal(liens.data.length, 1);
  assert.equal(liens.data[0].statut, 'en_attente');
});

test('validation : membre → 403 ; admin → 200 ; re-validation → 404', async () => {
  const refuse = await post(`/admin/liens-parent-enfant/${lienId}/valider`, {}, parent.access);
  assert.equal(refuse.statut, 403);
  const { statut, data } = await post(`/admin/liens-parent-enfant/${lienId}/valider`, {}, jetonsAdmin.access);
  assert.equal(statut, 200);
  assert.equal(data.statut, 'valide');
  const deja = await post(`/admin/liens-parent-enfant/${lienId}/valider`, {}, jetonsAdmin.access);
  assert.equal(deja.statut, 404);
});

test('enfants : le parent voit son enfant, l’étranger ne voit rien', async () => {
  const { statut, data } = await get('/moi/enfants', parent.access);
  assert.equal(statut, 200);
  assert.equal(data.length, 1);
  assert.equal(data[0].id, enfant.membre.id);
  assert.ok(Array.isArray(data[0].presences), 'présences présentes');
  assert.ok(Array.isArray(data[0].suivis), 'suivis présents');
  const autre = await get('/moi/enfants', etranger.access);
  assert.equal(autre.statut, 200);
  assert.deepEqual(autre.data, []);
});

// ── Moyennes ─────────────────────────────────────────────────
test('moyennes : publication visible par l’enfant et par le parent, pas par l’étranger', async () => {
  const { statut, data } = await post('/admin/suivis-scolaires', {
    membre_id: enfant.membre.id,
    classe: '6e',
    annee_scolaire: '2026-2027',
    moyenne_t1: 12.5,
  }, jetonsAdmin.access);
  assert.equal(statut, 201);
  assert.equal(data.membre_id, enfant.membre.id);
  const moi = await get('/moi/suivis-scolaires', enfant.access);
  assert.equal(moi.statut, 200);
  assert.equal(moi.data.length, 1);
  assert.equal(Number(moi.data[0].moyenne_t1), 12.5);
  const dashboard = await get('/moi/enfants', parent.access);
  assert.equal(dashboard.data[0].suivis.length, 1);
  assert.equal(Number(dashboard.data[0].suivis[0].moyenne_t1), 12.5);
  const autre = await get('/moi/enfants', etranger.access);
  assert.deepEqual(autre.data, []);
  const notifs = await get('/notifications', parent.access);
  assert.equal(notifs.statut, 200);
  assert.ok(
    (notifs.data ?? []).some((n) => n.type === 'moyenne_enfant'),
    'le parent a été notifié de la publication des moyennes',
  );
});

// ── Clôture ──────────────────────────────────────────────────
test('clôture : activité inconnue → 404', async () => {
  const { statut } = await post('/presences/activite/00000000-0000-0000-0000-000000000000/cloturer', {}, jetonsAdmin.access);
  assert.equal(statut, 404);
});

// Le scan et la clôture demandent une activité réelle (événement
// publié). La base de test n'en contient pas toujours : si la liste
// est vide, ce test ne fait que le constater, sans échouer.
test('scan + clôture : le parent est notifié de l’arrivée puis de la fin', async (t) => {
  const { data: evenements } = await get('/evenements', jetonsAdmin.access);
  const activite = (evenements ?? [])[0];
  if (!activite) {
    t.skip('aucun événement publié dans la base de test');
    return;
  }
  const scan = await post('/presences/scan', { activite_id: activite.id, matricule: enfant.membre.matricule }, jetonsAdmin.access);
  assert.equal(scan.statut, 201);
  const notifs = await get('/notifications', parent.access);
  assert.ok(
    (notifs.data ?? []).some((n) => n.type === 'presence_enfant'),
    'le parent a été notifié de l’arrivée de son enfant',
  );
  const cloture = await post(`/presences/activite/${activite.id}/cloturer`, {}, jetonsAdmin.access);
  assert.equal(cloture.statut, 201);
  const deja = await post(`/presences/activite/${activite.id}/cloturer`, {}, jetonsAdmin.access);
  assert.equal(deja.statut, 409, 'une activité ne se clôture qu’une fois');
});

// ── Retrait du lien ──────────────────────────────────────────
test('lien : retrait par le parent, puis invisible', async () => {
  const { statut } = await suppr(`/moi/liens-parent-enfant/${lienId}`, parent.access);
  assert.equal(statut, 200);
  const { data } = await get('/moi/enfants', parent.access);
  assert.deepEqual(data, []);
});
