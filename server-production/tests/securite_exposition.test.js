// Tests d'intégration : correctifs de sécurité, exposition des
// données, 22 nov. 2026. Un test par constat, du membre ordinaire
// à l'administrateur général, avec la preuve que les données ne
// sortent plus. Le serveur réel est lancé en processus enfant
// sur une base PostgreSQL de test (ne JAMAIS pointer vers la
// production).
//
// Lancer :  TEST_DATABASE_URL="postgresql://..." TEST_JWT_SECRET="..." node --test tests/securite_exposition.test.js
// ou simplement : npm test   (avec .env.test, voir ci-dessous)
import test from 'node:test';
import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import pg from 'pg';
import argon2 from 'argon2';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3499;
const BASE = `http://127.0.0.1:${PORT}`;
const DATABASE_URL = process.env.TEST_DATABASE_URL;
const JWT_SECRET = process.env.TEST_JWT_SECRET || 'secret-de-test-32-caracteres-minimum!!';
const FICHES_SANTE_KEY = crypto.randomBytes(32).toString('base64');

if (!DATABASE_URL) {
  console.error('TEST_DATABASE_URL manquant : les tests d’intégration sont ignorés.');
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

async function del(chemin, jeton) {
  const r = await fetch(`${BASE}${chemin}`, {
    method: 'DELETE',
    headers: jeton ? { authorization: `Bearer ${jeton}` } : {},
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

async function getOctets(chemin, jeton) {
  const r = await fetch(`${BASE}${chemin}`, {
    headers: jeton ? { authorization: `Bearer ${jeton}` } : {},
  });
  return { statut: r.status, corps: await r.text() };
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
let camp;
let celluleIspam;
let fichierCeleste;
let documentCeleste;
let aideCeleste;
let signalementCeleste;

async function creerCompte(clientPg, { email, role, etablissementAdminId, fonctionAdmin, nom, etablissementMembreId }) {
  const hash = await argon2.hash(MDP, { type: argon2.argon2id });
  const u = (
    await clientPg.query(
      `INSERT INTO utilisateurs (email, mot_de_passe_hash, role, etablissement_admin_id, fonction_admin) VALUES ($1,$2,$3,$4,$5) RETURNING id`,
      [email, hash, role, etablissementAdminId ?? null, fonctionAdmin ?? null],
    )
  ).rows[0];
  let membre = null;
  if (etablissementMembreId !== undefined) {
    membre = (
      await clientPg.query(
        `INSERT INTO membres (utilisateur_id, nom_complet, etablissement_id, fonction) VALUES ($1,$2,$3,'Membre') RETURNING id, matricule`,
        [u.id, nom, etablissementMembreId],
      )
    ).rows[0];
  }
  return { utilisateurId: u.id, membreId: membre?.id ?? null, matricule: membre?.matricule ?? null };
}

test.before(async () => {
  server = fork(path.join(DIR, '..', 'server.js'), {
    env: { ...process.env, PORT: String(PORT), DATABASE_URL, JWT_SECRET, DATABASE_SSL: 'false', FICHES_SANTE_KEY },
    silent: true,
  });
  await attendreSante();

  client = new pg.Client({ connectionString: DATABASE_URL });
  await client.connect();
  // /sante répond avant la fin des migrations : attendre que la
  // table des établissements existe avant de semer les comptes.
  const debutSchema = Date.now();
  for (;;) {
    try {
      await client.query('SELECT 1 FROM etablissements LIMIT 1');
      break;
    } catch (_) {
      if (Date.now() - debutSchema > 60000) throw new Error('Le schéma de test ne se crée pas.');
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  etabIspam = (await client.query(`SELECT id FROM etablissements WHERE nom = 'ISPAM'`)).rows[0];
  etabCeleste = (await client.query(`SELECT id FROM etablissements WHERE nom = 'Céleste'`)).rows[0];
  if (!etabIspam) etabIspam = (await client.query(`INSERT INTO etablissements (nom) VALUES ('ISPAM') RETURNING id`)).rows[0];
  if (!etabCeleste) etabCeleste = (await client.query(`INSERT INTO etablissements (nom) VALUES ('Céleste') RETURNING id`)).rows[0];

  comptes.adminG = await creerCompte(client, { email: `ag-sec2-${SUFFIXE}@test.ci`, role: 'admin_general', nom: 'Admin General Securite', etablissementMembreId: etabIspam.id });
  comptes.adminIspam = await creerCompte(client, { email: `ae-sec2-${SUFFIXE}@test.ci`, role: 'admin_etablissement', etablissementAdminId: etabIspam.id, nom: 'Admin Ispam Securite', etablissementMembreId: etabIspam.id });
  comptes.tresorier = await creerCompte(client, { email: `tr-sec2-${SUFFIXE}@test.ci`, role: 'admin_etablissement', etablissementAdminId: etabIspam.id, fonctionAdmin: 'tresorier', nom: 'Tresorier Securite', etablissementMembreId: etabIspam.id });
  comptes.a = await creerCompte(client, { email: `ma-sec2-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Membre A Securite', etablissementMembreId: etabIspam.id });
  comptes.b = await creerCompte(client, { email: `mb-sec2-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Membre B Securite', etablissementMembreId: etabIspam.id });
  comptes.c = await creerCompte(client, { email: `mc-sec2-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Membre C Securite', etablissementMembreId: etabCeleste.id });
  comptes.d = await creerCompte(client, { email: `md-sec2-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Membre D Securite', etablissementMembreId: etabIspam.id });

  comptes.jetonAdminG = await connexion(`ag-sec2-${SUFFIXE}@test.ci`);
  comptes.jetonAdminIspam = await connexion(`ae-sec2-${SUFFIXE}@test.ci`);
  comptes.jetonTresorier = await connexion(`tr-sec2-${SUFFIXE}@test.ci`);
  comptes.jetonA = await connexion(`ma-sec2-${SUFFIXE}@test.ci`);
  comptes.jetonB = await connexion(`mb-sec2-${SUFFIXE}@test.ci`);
  comptes.jetonC = await connexion(`mc-sec2-${SUFFIXE}@test.ci`);
  comptes.jetonD = await connexion(`md-sec2-${SUFFIXE}@test.ci`);

  camp = (await client.query(
    `INSERT INTO evenements (type, nom, publie, salle_visio, tarif_fcfa) VALUES ('camp', 'Camp Securite Test', true, 'salle-test-secrete', 0) RETURNING id`,
  )).rows[0];
  const inscription = await post(`/evenements/${camp.id}/inscription`, {}, comptes.jetonA);
  assert.equal(inscription.statut, 201, `inscription de A au camp : ${JSON.stringify(inscription.data)}`);

  const conv = await post('/messagerie/conversations', { type: 'directe', participant_member_ids: [comptes.b.membreId] }, comptes.jetonA);
  assert.equal(conv.statut, 201, `conversation A-B : ${JSON.stringify(conv.data)}`);

  const creneauA = await post('/chaine-priere', { heure: 8 }, comptes.jetonA);
  assert.equal(creneauA.statut, 201, `créneau de A : ${JSON.stringify(creneauA.data)}`);
  const creneauB = await post('/chaine-priere', { heure: 9 }, comptes.jetonB);
  assert.equal(creneauB.statut, 201, `créneau de B : ${JSON.stringify(creneauB.data)}`);

  celluleIspam = (await client.query(
    `INSERT INTO cellules (etablissement_id, nom, jour_semaine, heure) VALUES ($1, 'Cellule Securite', 1, '18:00') RETURNING id`,
    [etabIspam.id],
  )).rows[0];
  await client.query(
    `INSERT INTO cellule_assignations (cellule_id, membre_id, role) VALUES ($1, $2, 'Accueil')`,
    [celluleIspam.id, comptes.b.membreId],
  );

  const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  fichierCeleste = (await client.query(
    `INSERT INTO fichiers (cle_stockage, nom_original, type_mime_reel, taille_octets, sha256, verifie, donnees) VALUES ($1, 'test.png', 'image/png', $2, $3, true, $4) RETURNING id`,
    [`sec2-${SUFFIXE}`, png.length, crypto.createHash('sha256').update(png).digest('hex'), png],
  )).rows[0];
  documentCeleste = (await client.query(
    `INSERT INTO documents (titre, fichier_id, etablissement_id) VALUES ('Document Celeste', $1, $2) RETURNING id`,
    [fichierCeleste.id, etabCeleste.id],
  )).rows[0];

  await client.query(
    `INSERT INTO nominations (membre_id, portee, fonction_code, etablissement_id) VALUES ($1, 'etablissement', 'tresorier', $2)`,
    [comptes.b.membreId, etabIspam.id],
  );

  aideCeleste = (await client.query(
    `INSERT INTO conversations (type, title, created_by, aide_statut, aide_motif) VALUES ('aide', 'Aide Celeste', $1, 'ouvert', 'probleme') RETURNING id`,
    [comptes.c.membreId],
  )).rows[0];

  const signalement = await post('/messagerie/signalements', { target_type: 'user', target_id: comptes.a.membreId, reason: 'spam' }, comptes.jetonC);
  assert.equal(signalement.statut, 201, `signalement de C : ${JSON.stringify(signalement.data)}`);
  // Le routage d'un signalement « user » suit l'établissement
  // de la cible : pour tester le 404 hors périmètre, le
  // signalement est rattaché à Céleste en base.
  await client.query(`UPDATE reports SET etablissement_id = $1 WHERE id = $2`, [etabCeleste.id, signalement.data.id]);
  signalementCeleste = signalement.data;

  await client.query(
    `INSERT INTO evenements_wave (evenement_ext, charge, signature_ok, traite, paiement_id) VALUES ($1, $2::jsonb, true, false, NULL)`,
    [`sec2-${SUFFIXE}`, JSON.stringify({ type: 'merchant.payment_received', data: { id: 'tx-sec2', amount: 5000, sender_mobile: '+2250700000001', when_created: '2026-11-22T10:00:00Z' } })],
  );

  const act1 = (await client.query(
    `INSERT INTO activites_etablissement (etablissement_id, titre) VALUES ($1, 'Activite Cloturee') RETURNING id`,
    [etabIspam.id],
  )).rows[0];
  const act2 = (await client.query(
    `INSERT INTO activites_etablissement (etablissement_id, titre) VALUES ($1, 'Activite En Cours') RETURNING id`,
    [etabIspam.id],
  )).rows[0];
  await client.query(`INSERT INTO liens_parent_enfant (parent_membre_id, enfant_membre_id, statut) VALUES ($1, $2, 'valide')`, [comptes.a.membreId, comptes.b.membreId]);
  await client.query(
    `INSERT INTO presences (membre_id, activite_id, methode, statut) VALUES ($1, $2, 'scan', 'present')`,
    [comptes.b.membreId, camp.id],
  );
  await client.query(`INSERT INTO clotures_activite (activite_id) VALUES ($1)`, [act1.id]);
  comptes.actCloturee = act1.id;
  comptes.actEnCours = act2.id;
});

test.after(async () => {
  if (client) await client.end().catch(() => {});
  if (server) server.kill('SIGTERM');
});

// ── H-3 : intrusion, jeton membre ordinaire ───────────────────
test('H-3 : un membre ordinaire est refusé sur les routes admin sensibles et les suppressions', async () => {
  const sansJeton = await get('/admin/membres');
  assert.equal(sansJeton.statut, 401, 'sans jeton : 401');
  const lectures = [
    ['GET /admin/membres', await get('/admin/membres', comptes.jetonA)],
    ['GET /admin/paiements', await get('/admin/paiements', comptes.jetonA)],
    ['GET /admin/audit', await get('/admin/audit', comptes.jetonA)],
    ['GET /admin/comptabilite', await get('/admin/comptabilite', comptes.jetonA)],
    ['GET /admin/en-ligne', await get('/admin/en-ligne', comptes.jetonA)],
    ['GET /admin/fiches-sante/:camp', await get(`/admin/fiches-sante/${camp.id}`, comptes.jetonA)],
  ];
  for (const [nom, r] of lectures) assert.equal(r.statut, 403, `${nom} : 403, ${JSON.stringify(r.data)}`);
  const role = await post(`/admin/membres/${comptes.b.membreId}/role`, { role: 'admin_etablissement', etablissement_id: etabIspam.id }, comptes.jetonA);
  assert.equal(role.statut, 403, 'promotion par un membre : 403');
  const revocation = await post('/admin/certificats/CP-XXXX/revoquer', {}, comptes.jetonA);
  assert.equal(revocation.statut, 403, 'révocation de certificat par un membre : 403');
  const suppression = await del(`/admin/cellules/${celluleIspam.id}`, comptes.jetonA);
  assert.equal(suppression.statut, 403, 'suppression de cellule par un membre : 403');
  const encoreLa = await get(`/etablissements/${etabIspam.id}/cellules`, comptes.jetonB);
  assert.equal(encoreLa.statut, 200, 'la cellule existe toujours après la tentative');
});

// ── H-8 : annuaire restreint ──────────────────────────────────
test('H-8 : sans recherche, un membre ne voit que ses contacts ; la recherche exige 3 caractères', async () => {
  const sansQ = await get('/messagerie/membres', comptes.jetonA);
  assert.equal(sansQ.statut, 200);
  const ids = sansQ.data.map((m) => m.id);
  assert.ok(ids.includes(comptes.b.membreId), 'B, en conversation avec A, est visible');
  assert.equal(ids.includes(comptes.d.membreId), false, 'D, sans conversation, n’est pas listé');
  assert.equal(ids.includes(comptes.c.membreId), false, 'C, d’un autre établissement, n’est pas listé');
  assert.equal(ids.includes(comptes.a.membreId), false, 'l’appelant ne se liste pas lui-même');
  const court = await get('/messagerie/membres?q=Me', comptes.jetonA);
  assert.equal(court.statut, 400, 'préfixe de moins de 3 caractères : 400');
  const recherche = await get('/messagerie/membres?q=Membre D', comptes.jetonA);
  assert.equal(recherche.statut, 200);
  assert.ok(recherche.data.some((m) => m.id === comptes.d.membreId), 'la recherche par préfixe trouve D');
  assert.equal(recherche.data.some((m) => m.id === comptes.b.membreId), false, 'la recherche ne ramène pas B, hors préfixe');
  assert.ok(recherche.data.length <= 50, 'limite de 50 résultats');
});

test('H-8 : aucune photo en base64 dans les listes de conversations', async () => {
  const liste = await get('/messagerie/conversations', comptes.jetonA);
  assert.equal(liste.statut, 200);
  for (const conv of liste.data) {
    assert.equal(conv.autre_photo ?? null, null, 'pas de photo dans la liste');
    assert.equal(JSON.stringify(conv).includes('data:image'), false, 'aucune donnée base64');
  }
});

// ── H-9 : salle Jitsi ─────────────────────────────────────────
test('H-9 : la salle Jitsi ne sort plus en public, seulement pour un inscrit', async () => {
  const publique = await get('/evenements', comptes.jetonA);
  assert.equal(publique.statut, 200);
  assert.equal(JSON.stringify(publique.data).includes('salle_visio'), false, 'aucune salle_visio dans la liste publique');
  assert.equal(JSON.stringify(publique.data).includes('salle-test-secrete'), false, 'le nom de salle ne fuite pas');
  const sansJeton = await get(`/evenements/${camp.id}/salle-visio`);
  assert.equal(sansJeton.statut, 401, 'sans jeton : 401');
  const nonInscrit = await get(`/evenements/${camp.id}/salle-visio`, comptes.jetonC);
  assert.equal(nonInscrit.statut, 403, 'membre non inscrit : 403');
  const inscrit = await get(`/evenements/${camp.id}/salle-visio`, comptes.jetonA);
  assert.equal(inscrit.statut, 200, 'membre inscrit : 200');
  assert.equal(inscrit.data.salle_visio, 'salle-test-secrete');
});

// ── MO-4 : fonction clé ───────────────────────────────────────
test('MO-4 : promotion sans fonction clé refusée, fonction hors liste restreinte, sans fonction inchangée', async () => {
  const sansFonction = await post(`/admin/membres/${comptes.d.membreId}/role`, { role: 'admin_etablissement', etablissement_id: etabIspam.id }, comptes.jetonAdminG);
  assert.equal(sansFonction.statut, 400, 'promotion sans fonction clé : 400');
  const tresorierCulte = await post('/admin/cultes-direct', { titre: 'Culte Securite', date: '2026-11-23', url_direct: 'https://example.com/live' }, comptes.jetonTresorier);
  assert.equal(tresorierCulte.statut, 403, 'un trésorier ne crée pas de culte direct : 403');
  const sansFonctionCulte = await post('/admin/cultes-direct', { titre: 'Culte Securite', date: '2026-11-23', url_direct: 'https://example.com/live' }, comptes.jetonAdminIspam);
  assert.equal(sansFonctionCulte.statut, 201, 'un administrateur sans fonction garde son accès');
  const generalCulte = await post('/admin/cultes-direct', { titre: 'Culte Securite Deux', date: '2026-11-24', url_direct: 'https://example.com/live' }, comptes.jetonAdminG);
  assert.equal(generalCulte.statut, 201, 'l’administrateur général garde son accès');
});

// ── MO-15 : motif 404 unique ──────────────────────────────────
test('MO-15 : hors périmètre, 404 sans révéler l’existence', async () => {
  const membre = await get(`/admin/membres/${comptes.c.membreId}`, comptes.jetonAdminIspam);
  assert.equal(membre.statut, 404, 'membre d’un autre établissement : 404');
  const document = await getOctets(`/documents/${documentCeleste.id}/fichier`, comptes.jetonAdminIspam);
  assert.equal(document.statut, 404, 'fichier d’un document d’un autre établissement : 404');
  const moderation = await post(`/messagerie/moderation/${signalementCeleste.id}/action`, { action: 'avertir', note: 'Test.' }, comptes.jetonAdminIspam);
  assert.equal(moderation.statut, 404, 'signalement d’un autre établissement : 404');
  const aide = await get(`/aide/demandes/${aideCeleste.id}`, comptes.jetonAdminIspam);
  assert.equal(aide.statut, 404, 'demande d’aide d’un autre établissement : 404');
});

// ── MO-16 : fichier de document restreint ─────────────────────
test('MO-16 : un fichier de document restreint exige une session du bon périmètre', async () => {
  const anonyme = await getOctets(`/fichiers/${fichierCeleste.id}`);
  assert.equal(anonyme.statut, 401, 'sans jeton : 401');
  const autreEtab = await getOctets(`/fichiers/${fichierCeleste.id}`, comptes.jetonA);
  assert.equal(autreEtab.statut, 404, 'membre d’un autre établissement : 404');
  const bonEtab = await getOctets(`/fichiers/${fichierCeleste.id}`, comptes.jetonC);
  assert.equal(bonEtab.statut, 200, 'membre du bon établissement : 200');
});

// ── MO-17 : chaîne de prière ──────────────────────────────────
test('MO-17 : la chaîne ne montre que le prénom des autres, le nom complet seulement pour soi', async () => {
  const chaine = await get('/chaine-priere', comptes.jetonA);
  assert.equal(chaine.statut, 200);
  const monCreneau = chaine.data.creneaux.find((c) => c.heure === 8);
  assert.equal(monCreneau.membre_id, comptes.a.membreId, 'mon créneau garde mon identifiant');
  assert.equal(monCreneau.nom_complet, 'Membre A Securite', 'mon créneau garde mon nom complet');
  const autreCreneau = chaine.data.creneaux.find((c) => c.heure === 9);
  assert.equal(autreCreneau.membre_id, null, 'le créneau d’un autre ne porte plus son identifiant');
  assert.equal(autreCreneau.prenom, 'Membre', 'le créneau d’un autre ne montre que le prénom');
  assert.equal('nom_complet' in autreCreneau, false, 'pas de nom complet pour un autre');
  assert.equal(JSON.stringify(chaine.data).includes('Membre B Securite'), false, 'le nom complet de B ne sort nulle part');
});

// ── MO-18 : cellules ──────────────────────────────────────────
test('MO-18 : les cellules d’un établissement ne se lisent que dans son périmètre', async () => {
  const horsPerimetre = await get(`/etablissements/${etabCeleste.id}/cellules`, comptes.jetonA);
  assert.equal(horsPerimetre.statut, 404, 'membre d’un autre établissement : 404');
  const assigne = await get(`/etablissements/${etabIspam.id}/cellules`, comptes.jetonB);
  assert.equal(assigne.statut, 200, 'membre assigné à une cellule : 200');
  assert.ok((assigne.data.cellules ?? []).some((c) => c.id === celluleIspam.id), 'la cellule apparaît');
  const membreEtab = await get(`/etablissements/${etabCeleste.id}/cellules`, comptes.jetonC);
  assert.equal(membreEtab.statut, 200, 'membre de l’établissement : 200');
});

// ── MO-19 : nominations ───────────────────────────────────────
test('MO-19 : les nominations exigent une session et ne montrent plus le matricule', async () => {
  const anonyme = await get(`/etablissements/${etabIspam.id}/nominations`);
  assert.equal(anonyme.statut, 401, 'sans jeton : 401');
  const liste = await get(`/etablissements/${etabIspam.id}/nominations`, comptes.jetonA);
  assert.equal(liste.statut, 200);
  assert.ok(liste.data.length >= 1, 'au moins une nomination');
  for (const n of liste.data) assert.equal('matricule' in n, false, 'aucun matricule dans la réponse');
});

// ── MO-20 : liste des membres admin ───────────────────────────
test('MO-20 : details=1 est réservé à l’administrateur général', async () => {
  const etab = await get('/admin/membres?details=1', comptes.jetonAdminIspam);
  assert.equal(etab.statut, 403, 'administrateur d’établissement : 403');
  const general = await get('/admin/membres?details=1', comptes.jetonAdminG);
  assert.equal(general.statut, 200, 'administrateur général : 200');
  const liste = await get('/admin/membres', comptes.jetonAdminIspam);
  assert.equal(liste.statut, 200, 'la liste simple reste ouverte à l’administrateur d’établissement');
});

// ── MO-21 : fiches santé ──────────────────────────────────────
test('MO-21 : la liste des fiches santé exige la nomination de camp', async () => {
  const sansNomination = await get(`/admin/fiches-sante/${camp.id}`, comptes.jetonAdminIspam);
  assert.equal(sansNomination.statut, 403, 'administrateur sans nomination : 403');
  const general = await get(`/admin/fiches-sante/${camp.id}`, comptes.jetonAdminG);
  assert.equal(general.statut, 200, 'administrateur général : 200');
});

// ── B-6 : colonnes explicites, contacts masqués ───────────────
test('B-6 : les paiements ne montrent plus les contacts des validateurs, le numéro Wave est masqué', async () => {
  const paiements = await get('/admin/paiements', comptes.jetonAdminG);
  assert.equal(paiements.statut, 200);
  for (const p of paiements.data ?? []) {
    for (const cle of ['confirme_par_email', 'confirme_par_telephone', 'refuse_par_email', 'refuse_par_telephone']) {
      assert.equal(cle in p, false, `aucun ${cle} dans la réponse`);
    }
  }
  const mois = new Date().toISOString().slice(0, 7);
  const compta = await get(`/admin/comptabilite?mois=${mois}`, comptes.jetonAdminG);
  assert.equal(compta.statut, 200, 'la comptabilité répond toujours');
  const nonRapproches = await get('/admin/wave/non-rapproches', comptes.jetonAdminG);
  assert.equal(nonRapproches.statut, 200);
  assert.ok(nonRapproches.data.length >= 1, 'au moins un paiement Wave non rapproché');
  for (const w of nonRapproches.data) {
    assert.ok(w.expediteur.startsWith('****'), 'le numéro de l’expéditeur est masqué');
    assert.equal(w.expediteur.includes('0700000001'), false, 'le numéro complet ne sort pas');
  }
});

// ── B-7 : audit sans valeurs sensibles ─────────────────────────
test('B-7 : le journal d’audit ne consigne que le fait de la correction, jamais la date de naissance', async () => {
  const correction = await put(`/admin/membres/${comptes.d.membreId}`, { nom_complet: 'Membre D Securite', date_naissance: '1990-01-02' }, comptes.jetonAdminG);
  assert.equal(correction.statut, 200, `correction : ${JSON.stringify(correction.data)}`);
  // L'écriture d'audit va dans journal_audit (GET /admin/audit
  // lit la table audit, écart préexistant, hors périmètre).
  const lignes = (await client.query(
    `SELECT details FROM journal_audit WHERE action = 'membre.corrige' AND entite_id = $1 ORDER BY id DESC LIMIT 1`,
    [comptes.d.membreId],
  )).rows;
  assert.equal(lignes.length, 1, 'la correction est journalisée');
  const trace = JSON.stringify(lignes[0].details);
  assert.equal(trace.includes('1990-01-02'), false, 'la date de naissance ne figure pas dans la trace');
  assert.equal(trace.includes('ancien'), false, 'aucune ancienne valeur dans la trace');
  assert.equal(trace.includes('nouveau'), false, 'aucune nouvelle valeur dans la trace');
  assert.ok(lignes[0].details.champs.includes('date_naissance'), 'le champ touché est nommé');
});

// ── B-8 : non scanné contre absent ─────────────────────────────
test('B-8 : une activité sans scan est non scannée, absente seulement après clôture', async () => {
  const enfants = await get('/moi/enfants', comptes.jetonA);
  assert.equal(enfants.statut, 200);
  const enfant = enfants.data.find((e) => e.id === comptes.b.membreId);
  assert.ok(enfant, 'l’enfant apparaît chez le parent');
  const parNom = new Map(enfant.presences.map((p) => [p.nom, p.statut]));
  assert.equal(parNom.get('Camp Securite Test'), 'present', 'activité scannée : présent');
  assert.equal(parNom.get('Activite Cloturee'), 'absent', 'activité clôturée sans scan : absent');
  assert.equal(parNom.get('Activite En Cours'), 'non_scanne', 'activité non clôturée sans scan : non scanné');
});
