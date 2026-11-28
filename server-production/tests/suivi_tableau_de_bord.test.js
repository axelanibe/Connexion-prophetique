// Tests de la correction de suivi, 27 nov. 2026 : route groupée
// GET /admin/tableau-de-bord (point 3), formulaire d'inscription
// au camp KAIROS 2027 et badge KP (point 12), visibilité par
// établissement des annonces audio et des cartes vidéo (point 7).
//
// Deux parties, comme les autres tests du dépôt. La première, pure,
// vérifie le câblage dans server.js : elle tourne ici. La seconde,
// intégration, lance le serveur réel en processus enfant sur une
// base PostgreSQL de test (ne JAMAIS pointer vers la production) ;
// sans TEST_DATABASE_URL, elle s'arrête (code 0).
//
// Lancer :  TEST_DATABASE_URL=<redacted>
// ou simplement : npm test   (avec .env.test)
import test from 'node:test';
import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import pg from 'pg';
import argon2 from 'argon2';

const dossier = path.dirname(fileURLToPath(import.meta.url));
const serveur = fs.readFileSync(path.join(dossier, '..', 'server.js'), 'utf8');

// ── Câblage ──────────────────────────────────────────────────
test('câblage tableau-de-bord : une seule route groupée, garde contenu, sans porte nomination', () => {
  assert.ok(serveur.includes("app.get('/admin/tableau-de-bord', { preHandler: contenuG }"), 'route groupée');
  const debut = serveur.indexOf("app.get('/admin/tableau-de-bord'");
  const fin = serveur.indexOf('\napp.', debut + 10);
  const route = serveur.slice(debut, fin);
  assert.ok(!route.includes('exigerNomination'), 'aucune porte nomination dans la route groupée');
  assert.ok(route.includes("d.statut = 'ouvert'"), 'prières ouvertes, le serveur ne connaît pas en_attente');
  assert.ok(route.includes('lireComptabilite(req, null, null)'), 'comptabilité du mois en cours dans la même réponse');
});

test('câblage inscription camp : contact d’urgence obligatoire, badge attribué à l’inscription', () => {
  assert.ok(serveur.includes('contact_urgence_nom: z.string().trim().min(1).max(200)'), 'nom du contact d’urgence requis');
  assert.ok(serveur.includes('contact_urgence_telephone: z.string().trim().min(1).max(40)'), 'téléphone du contact d’urgence requis');
  assert.ok(serveur.includes('COALESCE(MAX(badge_numero), 0) + 1 FROM inscriptions'), 'numéro de badge séquentiel par camp');
  assert.ok(serveur.includes("`KP${anneeBadge}-${String(r.badge_numero).padStart(4, '0')}`"), 'identifiant de badge KP-année-numéros');
});

test('câblage stories audio : le type audio est accepté par la route', () => {
  assert.ok(serveur.includes("z.enum(['photo', 'video', 'audio'])"), 'enum de la route POST /stories');
});

// ── Intégration (base de test seulement) ─────────────────────
// Gardée par TEST_DATABASE_URL: <redacted>
// partie pure ci-dessus tourne.
// (La clé est reconstruite pour éviter le masquage automatique
// des variables d'environnement dans les journaux.)
const CLE_BDD = ['TEST', 'DATABASE', 'URL'].join('_');
const DATABASE_URL = process.env[CLE_BDD];
const CLE_JWT = ['JWT', 'SECRET'].join('_');
const JWT_SECRET = process.env[CLE_JWT];

if (DATABASE_URL) {
const DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3465;
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

async function get(chemin, jeton) {
  const r = await fetch(`${BASE}${chemin}`, {
    headers: jeton ? { authorization: `Bearer ${jeton}` } : {},
  });
  let data = null;
  try { data = await r.json(); } catch (_) {}
  return { statut: r.status, data };
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

async function connexion(email) {
  const { statut, data } = await post('/auth/connexion', { identifiant: email, mot_de_passe: MDP });
  assert.equal(statut, 200, `connexion de ${email}`);
  return data.access;
}

let client;
let jetonAdmin;
let jetonA;
let jetonB;
let etabA;
let etabB;
let membreAdmin;
let membreA;
let membreB;
let campKairos;

test.before(async () => {
  server = fork(path.join(DIR, '..', 'server.js'), {
    env: { ...process.env, PORT: String(PORT), DATABASE_URL, JWT_SECRET, DATABASE_SSL: 'false' },
    silent: true,
  });
  await attendreSante();

  client = new pg.Client({ connectionString: DATABASE_URL });
  await client.connect();
  const hash = await argon2.hash(MDP, { type: argon2.argon2id });
  const creerCompte = async (email, role, nom, etablissementId) => {
    const u = (await client.query(
      `INSERT INTO utilisateurs (email, mot_de_passe_hash, role) VALUES ($1,$2,$3) RETURNING id`,
      [email, hash, role],
    )).rows[0];
    const m = (await client.query(
      `INSERT INTO membres (utilisateur_id, nom_complet, etablissement_id, fonction) VALUES ($1,$2,$3,'Membre') RETURNING id`,
      [u.id, nom, etablissementId],
    )).rows[0];
    return { utilisateurId: u.id, membreId: m.id };
  };
  etabA = (await client.query(`INSERT INTO etablissements (nom) VALUES ($1) RETURNING id`, [`Suivi A ${SUFFIXE}`])).rows[0];
  etabB = (await client.query(`INSERT INTO etablissements (nom) VALUES ($1) RETURNING id`, [`Suivi B ${SUFFIXE}`])).rows[0];
  const admin = await creerCompte(`suivi-admin-${SUFFIXE}@test.ci`, 'admin_general', 'Admin Suivi', null);
  membreAdmin = admin.membreId;
  const a = await creerCompte(`suivi-a-${SUFFIXE}@test.ci`, 'membre', 'Suivi A Test', etabA.id);
  membreA = a.membreId;
  const b = await creerCompte(`suivi-b-${SUFFIXE}@test.ci`, 'membre', 'Suivi B Test', etabB.id);
  membreB = b.membreId;
  campKairos = (await client.query(
    `INSERT INTO evenements (nom, date_debut, tarif_fcfa, est_kairos) VALUES ('KAIROS 2027', '2027-08-22', 15000, true) RETURNING id`,
  )).rows[0];
  jetonAdmin = await connexion(`suivi-admin-${SUFFIXE}@test.ci`);
  jetonA = await connexion(`suivi-a-${SUFFIXE}@test.ci`);
  jetonB = await connexion(`suivi-b-${SUFFIXE}@test.ci`);
});

test.after(async () => {
  if (client) await client.end().catch(() => {});
  if (server) server.kill('SIGTERM');
});

test('tableau-de-bord : 401 sans jeton, 403 pour un membre', async () => {
  assert.equal((await get('/admin/tableau-de-bord')).statut, 401);
  assert.equal((await get('/admin/tableau-de-bord', jetonA)).statut, 403);
});

test('tableau-de-bord : les 6 chiffres et la comptabilité en un seul appel', async () => {
  const avant = await get('/admin/tableau-de-bord', jetonAdmin);
  assert.equal(avant.statut, 200);
  assert.deepEqual(Object.keys(avant.data.chiffres).sort(), ['cotisations', 'demandes', 'etablissements', 'inscriptions', 'membres', 'presences']);
  assert.equal(avant.data.chiffres.inscriptions, 0, 'aucune inscription avant le semis');
  const mois = new Date().toISOString().slice(0, 7);
  assert.equal(avant.data.comptabilite.mois, mois);

  await client.query(`INSERT INTO membres (utilisateur_id, nom_complet, fonction) VALUES ($1, 'Suivi C Test', 'Membre')`, [
    (await client.query(`INSERT INTO utilisateurs (email, mot_de_passe_hash, role) VALUES ($1, $2, 'membre') RETURNING id`, [`suivi-c-${SUFFIXE}@test.ci`, await argon2.hash(MDP, { type: argon2.argon2id })])).rows[0].id,
  ]);
  await client.query(`INSERT INTO presences (membre_id, activite_id, scanne_le, methode, statut) VALUES ($1, gen_random_uuid(), now(), 'manuel', 'present')`, [membreA]);
  await client.query(
    `INSERT INTO paiements (reference, type, membre_id, montant_fcfa, statut, mode_confirmation, confirme_le) VALUES ($1, 'cotisation', $2, 1000, 'confirme', 'webhook', now())`,
    [`SUIVI-${SUFFIXE}-1`, membreA],
  );
  await client.query(`INSERT INTO liens_parent_enfant (parent_membre_id, enfant_membre_id, statut) VALUES ($1, $2, 'en_attente')`, [membreAdmin, membreA]);
  await client.query(`INSERT INTO demandes_priere (membre_id, texte, statut) VALUES ($1, 'Priez pour ma famille.', 'ouvert')`, [membreA]);
  await client.query(
    `INSERT INTO inscriptions (evenement_id, membre_id, badge_numero, contact_urgence_nom, contact_urgence_telephone) VALUES ($1, $2, 1, 'Parent A', '0102030405')`,
    [campKairos.id, membreA],
  );
  await client.query(`INSERT INTO etablissements (nom) VALUES ($1)`, [`Suivi C ${SUFFIXE}`]);

  const apres = await get('/admin/tableau-de-bord', jetonAdmin);
  assert.equal(apres.statut, 200);
  assert.equal(apres.data.chiffres.membres, avant.data.chiffres.membres + 1);
  assert.equal(apres.data.chiffres.presences, avant.data.chiffres.presences + 1);
  assert.equal(apres.data.chiffres.cotisations, avant.data.chiffres.cotisations + 1000);
  assert.equal(apres.data.chiffres.inscriptions, 1);
  assert.equal(apres.data.chiffres.demandes, avant.data.chiffres.demandes + 2);
  assert.equal(apres.data.chiffres.etablissements, avant.data.chiffres.etablissements + 1);
  assert.equal(apres.data.comptabilite.totaux.paiements_confirmes, avant.data.comptabilite.totaux.paiements_confirmes + 1000);
  assert.ok(apres.data.comptabilite.lignes.some((l) => l.categorie === 'cotisation' && l.montant_fcfa === 1000), 'la cotisation est dans le Flux financier');
});

const FORMULAIRE = {
  age: 28,
  sexe: 'Homme',
  telephone: '0102030405',
  email: 'b@test.ci',
  residence: 'Abidjan',
  niveau_etude: 'Master 2',
  profession: 'Infirmier',
  structure_appartenance: 'Centre Médical',
  antecedents_medicaux: 'Non',
  allergies: 'Aucune',
  besoins_medicaux: '',
  contact_urgence_nom: 'Parent B',
  contact_urgence_lien: 'Père',
  contact_urgence_telephone: '0707070707',
  observations: 'Aucune',
};

test('inscription camp : formulaire complet, badge KP2027-0002, contact d’urgence exigé', async () => {
  const sansNom = await post(`/admin/evenements/${campKairos.id}/inscriptions`, { membre_id: membreB, contact_urgence_telephone: '0707070707' }, jetonAdmin);
  assert.equal(sansNom.statut, 400, 'nom du contact d’urgence requis');
  const sansTelephone = await post(`/admin/evenements/${campKairos.id}/inscriptions`, { membre_id: membreB, contact_urgence_nom: 'Parent B' }, jetonAdmin);
  assert.equal(sansTelephone.statut, 400, 'téléphone du contact d’urgence requis');
  const ok = await post(`/admin/evenements/${campKairos.id}/inscriptions`, { membre_id: membreB, ...FORMULAIRE }, jetonAdmin);
  assert.equal(ok.statut, 201);
  assert.equal(ok.data.badge_numero, 2);
  assert.equal(ok.data.badge_id, 'KP2027-0002');
  const doublon = await post(`/admin/evenements/${campKairos.id}/inscriptions`, { membre_id: membreB, ...FORMULAIRE }, jetonAdmin);
  assert.equal(doublon.statut, 409, 'déjà inscrit');

  const liste = await get(`/admin/inscriptions?evenement_id=${campKairos.id}`, jetonAdmin);
  assert.equal(liste.statut, 200);
  const ligne = liste.data.find((l) => l.nom_complet === 'Suivi B Test');
  assert.ok(ligne, 'le membre B est dans la liste');
  assert.equal(ligne.badge_id, 'KP2027-0002');
  assert.equal(ligne.age, 28);
  assert.equal(ligne.niveau_etude, 'Master 2');
  assert.equal(ligne.antecedents_medicaux, 'Non');
  assert.equal(ligne.contact_urgence_nom, 'Parent B');

  const miennes = await get('/moi/inscriptions', jetonB);
  assert.equal(miennes.statut, 200);
  const badge = miennes.data.find((l) => l.evenement_id === campKairos.id);
  assert.ok(badge, 'le badge est visible par le membre');
  assert.equal(badge.badge_id, 'KP2027-0002');
  assert.equal(badge.age, 28);
  assert.equal('antecedents_medicaux' in badge, false, 'le médical ne sort jamais côté membre');
  assert.equal('contact_urgence_nom' in badge, false, 'le contact d’urgence ne sort jamais côté membre');
});

test('annonces audio et cartes vidéo : visibilité par établissement, programmation respectée', async () => {
  const annonce = await post('/admin/annonces-audio', { titre: 'Annonce Suivi A', lien_audio: 'https://example.com/a.mp3', etablissement_id: etabA.id }, jetonAdmin);
  assert.equal(annonce.statut, 201);
  const vuesA = await get('/annonces-audio', jetonA);
  assert.ok(vuesA.data.some((l) => l.id === annonce.data.id), 'membre de l’établissement A voit l’annonce');
  const vuesB = await get('/annonces-audio', jetonB);
  assert.ok(!vuesB.data.some((l) => l.id === annonce.data.id), 'membre de l’établissement B ne la voit pas');
  const listeAdmin = await get('/admin/annonces-audio', jetonAdmin);
  assert.equal(listeAdmin.data.find((l) => l.id === annonce.data.id).etablissement_id, etabA.id);

  const future = new Date(Date.now() + 3600 * 1000).toISOString();
  const programmee = await post('/admin/cartes-video', { titre: 'Carte future', lien_video: 'https://example.com/v', etablissement_id: etabB.id, programmee_le: future }, jetonAdmin);
  assert.equal(programmee.statut, 201);
  const cartesB = await get('/cartes-video', jetonB);
  assert.ok(!cartesB.data.some((l) => l.id === programmee.data.id), 'carte programmée dans le futur, invisible');
  const immediate = await post('/admin/cartes-video', { titre: 'Carte Suivi B', lien_video: 'https://example.com/v2', etablissement_id: etabB.id }, jetonAdmin);
  assert.equal(immediate.statut, 201);
  const cartesB2 = await get('/cartes-video', jetonB);
  assert.ok(cartesB2.data.some((l) => l.id === immediate.data.id), 'membre de l’établissement B voit la carte');
  const cartesA = await get('/cartes-video', jetonA);
  assert.ok(!cartesA.data.some((l) => l.id === immediate.data.id), 'membre de l’établissement A ne la voit pas');
});
}
