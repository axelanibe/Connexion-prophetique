// Tests de sécurité, 22 nov. 2026 : correctifs serveur noyau de
// l'analyse de sécurité critique (C-1, H-1, H-4, MO-1, MO-2, MO-3,
// MO-5, MO-9, MO-13, MO-14, MO-25, B-1, B-2, B-3, B-4, B-13, B-17,
// B-18, B-21, B-22, B-23). Le serveur réel est lancé en processus
// enfant sur une base PostgreSQL de test (ne JAMAIS pointer vers
// la production). Les tests unitaires (IP Cloudflare, TOTP, taux)
// ne touchent pas à la base.
//
// Lancer :  TEST_DATABASE_URL=<redacted>
// ou simplement : npm test   (avec .env.test, voir ci-dessous)
import test from 'node:test';
import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import pg from 'pg';
import argon2 from 'argon2';
import { ipClientCalculee, rafraichirPlagesCloudflare, _fixerPlagesPourTest, PLAGES_CLOUDFLARE_SECOURS } from '../src/ip_cloudflare.js';
import { genererSecret2fa, genererCodeTotp, verifierCodeTotp, encoderBase32, decoderBase32, chiffrerSecret2fa, dechiffrerSecret2fa } from '../src/double_authentification.js';
import { tauxChangePlausible } from '../src/taux_paypal.js';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3490;
const BASE = `http://127.0.0.1:${PORT}`;
const DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgres://postgres@127.0.0.1:5432/sec1_securite';
const JWT_SECRET = process.env.TEST_JWT_SECRET || 'abcdefghijklmnopqrstuvwxyz0123456789abcdef';

if (!DATABASE_URL) {
  console.error('TEST_DATABASE_URL manquant : les tests d’intégration sont ignorés.');
  process.exit(0);
}

const MDP = 'MotDePasseTest123';
const SUFFIXE = Date.now().toString(36);

let server;
let client;
let etabIspam;
const comptes = {};

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
  return { statut: r.status, data, entetes: r.headers };
}

async function get(chemin, jeton, entetes = {}) {
  const r = await fetch(`${BASE}${chemin}`, {
    headers: { ...(jeton ? { authorization: `Bearer ${jeton}` } : {}), ...entetes },
  });
  let data = null;
  try { data = await r.json(); } catch (_) {}
  return { statut: r.status, data, entetes: r.headers, texte: null };
}

async function connexion(email) {
  const { statut, data } = await post('/auth/connexion', { identifiant: email, mot_de_passe: MDP });
  assert.equal(statut, 200, `connexion de ${email}`);
  return data;
}

async function creerCompte({ email, role, etablissementAdminId, nom, etablissementMembreId }) {
  const hash = await argon2.hash(MDP, { type: argon2.argon2id });
  const u = (
    await client.query(
      `INSERT INTO utilisateurs (email, mot_de_passe_hash, role, etablissement_admin_id) VALUES ($1,$2,$3,$4) RETURNING id`,
      [email, hash, role, etablissementAdminId ?? null],
    )
  ).rows[0];
  let membre = null;
  if (etablissementMembreId !== undefined) {
    membre = (
      await client.query(
        `INSERT INTO membres (utilisateur_id, nom_complet, etablissement_id, fonction) VALUES ($1,$2,$3,'Membre') RETURNING id, matricule`,
        [u.id, nom, etablissementMembreId],
      )
    ).rows[0];
  }
  return { utilisateurId: u.id, membreId: membre?.id ?? null, matricule: membre?.matricule ?? null };
}

test.before(async () => {
  server = fork(path.join(DIR, '..', 'server.js'), {
    env: {
      ...process.env, PORT: String(PORT), DATABASE_URL, JWT_SECRET, DATABASE_SSL: 'false',
      PAIRE_SECRET: 'paire-secret-test-32-caracteres-min',
      CORS_ORIGINS: 'https://cors-test.example',
      PAYPAL_CLIENT_ID: 'test-id',
      PAYPAL_CLIENT_SECRET: 'test-secret',
    },
    silent: true,
  });
  await attendreSante();
  client = new pg.Client({ connectionString: DATABASE_URL });
  await client.connect();
  etabIspam = (await client.query(`SELECT id FROM etablissements WHERE nom = 'ISPAM'`)).rows[0];
  if (!etabIspam) etabIspam = (await client.query(`INSERT INTO etablissements (nom) VALUES ('ISPAM') RETURNING id`)).rows[0];
  comptes.adminG = await creerCompte({ email: `ag-sec-${SUFFIXE}@test.ci`, role: 'admin_general', nom: 'Admin Securite', etablissementMembreId: etabIspam.id });
  comptes.admin2fa = await creerCompte({ email: `ag2fa-sec-${SUFFIXE}@test.ci`, role: 'admin_general', nom: 'Admin Deux Fa', etablissementMembreId: etabIspam.id });
  comptes.membreA = await creerCompte({ email: `ma-sec-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Membre A Securite', etablissementMembreId: etabIspam.id });
  comptes.membreB = await creerCompte({ email: `mb-sec-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Membre B Securite', etablissementMembreId: etabIspam.id });
  comptes.jetonAdminG = (await connexion(`ag-sec-${SUFFIXE}@test.ci`)).access;
  comptes.jetonsA = await connexion(`ma-sec-${SUFFIXE}@test.ci`);
  comptes.jetonsB = await connexion(`mb-sec-${SUFFIXE}@test.ci`);
});

test.after(async () => {
  if (client) await client.end().catch(() => {});
  if (server) server.kill('SIGTERM');
});

// ── C-1, unitaires ─────────────────────────────────────────────
test('C-1 : pair Cloudflare + en-tête forgé accepté', () => {
  _fixerPlagesPourTest(PLAGES_CLOUDFLARE_SECOURS);
  const ip = ipClientCalculee({ pair: '173.245.48.10', enTeteCf: '203.0.113.7', ipRepli: '127.0.0.1' });
  assert.equal(ip, '203.0.113.7');
});

test('C-1 : pair non Cloudflare + en-tête forgé ignoré', () => {
  const ip = ipClientCalculee({ pair: '203.0.113.99', enTeteCf: '198.51.100.4', ipRepli: '127.0.0.1' });
  assert.equal(ip, '127.0.0.1');
});

test('C-1 : sans en-tête, repli sur req.ip', () => {
  const ip = ipClientCalculee({ pair: '173.245.48.10', enTeteCf: undefined, ipRepli: '127.0.0.1' });
  assert.equal(ip, '127.0.0.1');
});

test('C-1 : en-tête invalide ignoré, même depuis Cloudflare', () => {
  const ip = ipClientCalculee({ pair: '173.245.48.10', enTeteCf: 'pas-une-ip', ipRepli: '127.0.0.1' });
  assert.equal(ip, '127.0.0.1');
});

test('C-1 : rafraîchissement des plages depuis Cloudflare', async () => {
  const ok = await rafraichirPlagesCloudflare();
  assert.equal(typeof ok, 'boolean');
  _fixerPlagesPourTest(PLAGES_CLOUDFLARE_SECOURS);
});

// ── B-17, unitaire ─────────────────────────────────────────────
test('B-17 : taux PayPal plausible accepté, taux absurde rejeté', () => {
  assert.equal(tauxChangePlausible('USD', 0.0017), true);
  assert.equal(tauxChangePlausible('USD', 0.5), false);
  assert.equal(tauxChangePlausible('USD', 0.00001), false);
  assert.equal(tauxChangePlausible('EUR', 0.0015), false);
  assert.equal(tauxChangePlausible('USD', Number.NaN), false);
});

// ── MO-25 (c), unitaires TOTP ──────────────────────────────────
test('2FA : base32 aller-retour, code valide, code faux rejeté', () => {
  const secret = genererSecret2fa();
  assert.match(secret, /^[A-Z2-7]{32}$/);
  assert.deepEqual(decoderBase32(encoderBase32(Buffer.from('test-secret'))), Buffer.from('test-secret'));
  const code = genererCodeTotp(secret);
  assert.match(code, /^\d{6}$/);
  assert.equal(verifierCodeTotp(secret, code), true);
  assert.equal(verifierCodeTotp(secret, '000000'), code === '000000');
  assert.equal(verifierCodeTotp(secret, '12345'), false);
});

test('2FA : secret chiffré puis déchiffré', () => {
  const cle = crypto.createHash('sha256').update('jwt-secret-test').update('2fa').digest();
  const chiffre = chiffrerSecret2fa('JBSWY3DPEHPK3PXP', cle);
  assert.notEqual(chiffre, 'JBSWY3DPEHPK3PXP');
  assert.equal(dechiffrerSecret2fa(chiffre, cle), 'JBSWY3DPEHPK3PXP');
  assert.throws(() => dechiffrerSecret2fa(chiffre, crypto.randomBytes(32)));
});

// ── MO-5 : CORS_ORIGINS est lue ────────────────────────────────
test('MO-5 : CORS_ORIGINS de l’environnement est appliquée', async () => {
  const { entetes } = await get('/sante', null, { Origin: 'https://cors-test.example' });
  assert.equal(entetes.get('access-control-allow-origin'), 'https://cors-test.example');
});

// ── B-3 : 404 générique ────────────────────────────────────────
test('B-3 : route inconnue → 404 générique sans nom de route', async () => {
  const { statut, data } = await get('/route-inexistante-xyz');
  assert.equal(statut, 404);
  assert.equal(data.erreur, 'Introuvable.');
  assert.equal(JSON.stringify(data).includes('route-inexistante'), false);
});

// ── B-2 : Zod sans détail ──────────────────────────────────────
// Sur /auth/deconnexion, sans limite auth, pour ne pas consommer
// le budget de 10 appels par minute des routes /auth limitées.
test('B-2 : erreur Zod sans détail des champs', async () => {
  const { statut, data } = await post('/auth/deconnexion', { refresh: 'trop-court' });
  assert.equal(statut, 400);
  assert.equal(data.erreur, 'Données invalides.');
  assert.equal(data.details, undefined);
});

// ── MO-25 (b) : vérification d'e-mail ──────────────────────────
const EMAIL_VERIF = `verif-sec-${SUFFIXE}@test.ci`;
let jetonsVerifies;

test('MO-25 (b) : inscription par e-mail → 202, sans jeton', async () => {
  const { statut, data } = await post('/auth/inscription', {
    email: EMAIL_VERIF, mot_de_passe: MDP, nom_complet: 'Verif Securite',
  });
  assert.equal(statut, 202);
  assert.equal(data.verification_requise, true);
  assert.equal(data.email, EMAIL_VERIF);
  assert.equal(data.access, undefined);
  assert.equal(data.refresh, undefined);
});

test('MO-25 (b) : connexion avant vérification → 403', async () => {
  const { statut, data } = await post('/auth/connexion', { identifiant: EMAIL_VERIF, mot_de_passe: MDP });
  assert.equal(statut, 403);
  assert.equal(data.verification_requise, true);
});

test('MO-25 (b) : vérification du code → jetons, même forme que la connexion', async () => {
  const u = (await client.query('SELECT id FROM utilisateurs WHERE lower(email) = lower($1)', [EMAIL_VERIF])).rows[0];
  const codeHash = await argon2.hash('123456', { type: argon2.argon2id });
  await client.query(
    "INSERT INTO codes_verification_email (utilisateur_id, email, code_hash, expire_le) VALUES ($1,$2,$3, now() + interval '30 minutes')",
    [u.id, EMAIL_VERIF, codeHash],
  );
  const { statut, data } = await post('/auth/verifier-email', { email: EMAIL_VERIF, code: '123456' });
  assert.equal(statut, 200);
  assert.equal(typeof data.access, 'string');
  assert.equal(data.refresh?.length, 64);
  assert.equal(data.mot_de_passe_temporaire, false);
  jetonsVerifies = data;
  const ligne = (await client.query('SELECT email_verifie FROM utilisateurs WHERE id = $1', [u.id])).rows[0];
  assert.equal(ligne.email_verifie, true);
});

// ── MO-13 / MO-14 : messages génériques ────────────────────────
test('MO-13 : mot de passe erroné → message générique unique', async () => {
  const { statut, data } = await post('/auth/connexion', { identifiant: EMAIL_VERIF, mot_de_passe: 'MauvaisMotDePasse999' });
  assert.equal(statut, 401);
  assert.equal(data.erreur, 'Identifiants incorrects.');
});

test('MO-14 : inscription en double → 409 générique non révélateur', async () => {
  const { statut, data } = await post('/auth/inscription', {
    email: EMAIL_VERIF, mot_de_passe: MDP, nom_complet: 'Verif Securite',
  });
  assert.equal(statut, 409);
  assert.equal(data.erreur.includes('email'), false);
  assert.equal(data.erreur.includes('téléphone'), false);
  assert.equal(data.erreur.includes('numéro'), false);
});

// ── MO-25 (c) : double authentification ────────────────────────
let secret2fa;
test('2FA : activer renvoie secret et otpauth_url', async () => {
  const jeton = (await connexion(`ag2fa-sec-${SUFFIXE}@test.ci`)).access;
  comptes.jetonAdmin2fa = jeton;
  const { statut, data } = await post('/auth/double-authentification/activer', {}, jeton);
  assert.equal(statut, 200);
  assert.match(data.secret, /^[A-Z2-7]{32}$/);
  assert.ok(data.otpauth_url.startsWith('otpauth://totp/'));
  secret2fa = data.secret;
});

test('2FA : confirmer active, connexion exige le second pas', async () => {
  const { statut } = await post('/auth/double-authentification/confirmer', { code: genererCodeTotp(secret2fa) }, comptes.jetonAdmin2fa);
  assert.equal(statut, 200);
  const { statut: s2, data } = await post('/auth/connexion', { identifiant: `ag2fa-sec-${SUFFIXE}@test.ci`, mot_de_passe: MDP });
  assert.equal(s2, 200);
  assert.equal(data.double_authentification_requise, true);
  assert.equal(data.access, undefined);
  const { statut: s3, data: d3 } = await post('/auth/connexion-2fa', { identifiant: `ag2fa-sec-${SUFFIXE}@test.ci`, code: genererCodeTotp(secret2fa) });
  assert.equal(s3, 200);
  assert.equal(typeof d3.access, 'string');
  assert.equal(d3.refresh?.length, 64);
});

// ── MO-3 : changement de rôle révoque les jetons ───────────────
test('MO-3 : changement de rôle → refresh révoqué', async () => {
  const { statut } = await post(`/admin/membres/${comptes.membreB.membreId}/role`, {
    role: 'admin_etablissement', etablissement_id: etabIspam.id, fonction_admin: 'moderateur',
  }, comptes.jetonAdminG);
  assert.equal(statut, 200);
  const { statut: s2 } = await post('/auth/rafraichir', { refresh: comptes.jetonsB.refresh });
  assert.equal(s2, 401);
});

// ── MO-1 : borne absolue de 90 jours ───────────────────────────
test('MO-1 : famille de plus de 90 jours → 401, famille révoquée', async () => {
  await client.query(
    "UPDATE jetons_rafraichissement SET famille_cree_le = now() - interval '91 days' WHERE empreinte = $1",
    [crypto.createHash('sha256').update(jetonsVerifies.refresh).digest('hex')],
  );
  const { statut } = await post('/auth/rafraichir', { refresh: jetonsVerifies.refresh });
  assert.equal(statut, 401);
});

// ── MO-2 : rejeu dans la grâce journalisé ──────────────────────
test('MO-2 : rejeu dans la grâce → 200 même paire, audit consigné', async () => {
  const ancien = comptes.jetonsA.refresh;
  const r1 = await post('/auth/rafraichir', { refresh: ancien });
  assert.equal(r1.statut, 200);
  const r2 = await post('/auth/rafraichir', { refresh: ancien });
  assert.equal(r2.statut, 200);
  assert.equal(r2.data.refresh, r1.data.refresh);
  comptes.jetonsA = r1.data;
  const lignes = (await client.query(
    "SELECT details FROM journal_audit WHERE action = 'auth.rafraichir.grace_rejeu' AND utilisateur_id = $1 ORDER BY cree_le DESC LIMIT 1",
    [comptes.membreA.utilisateurId],
  )).rows;
  assert.equal(lignes.length, 1, 'le rejeu est consigné dans le journal d’audit');
  assert.equal(lignes[0].details?.adresse_ip, '127.0.0.1');
});

// ── MO-1 (suite) : déconnexion de tous les appareils ──────────
test('MO-1 : déconnecter-tous révoque tous les jetons', async () => {
  const { statut } = await post('/auth/deconnecter-tous', {}, comptes.jetonsA.access);
  assert.equal(statut, 200);
  const { statut: s2 } = await post('/auth/rafraichir', { refresh: comptes.jetonsA.refresh });
  assert.equal(s2, 401);
});

// ── H-1 : revalidation du rôle en base ─────────────────────────
test('H-1 : rôle rétrogradé en base → jeton admin 401', async () => {
  await client.query("UPDATE utilisateurs SET role = 'membre' WHERE id = $1", [comptes.adminG.utilisateurId]);
  const { statut } = await get('/admin/paiements/doublons', comptes.jetonAdminG);
  assert.equal(statut, 401);
  await client.query("UPDATE utilisateurs SET role = 'admin_general' WHERE id = $1", [comptes.adminG.utilisateurId]);
});

// ── B-18 : retour PayPal sans secret lié ───────────────────────
test('B-18 : retour PayPal sans secret de retour → 404', async () => {
  const paiement = (
    await client.query(
      "INSERT INTO paiements (reference, type, membre_id, montant_fcfa, statut) VALUES ($1,'don',$2,1000,'en_attente') RETURNING id",
      [`SEC-TEST-${SUFFIXE}`, comptes.membreA.membreId],
    )
  ).rows[0];
  await client.query(
    "INSERT INTO paypal_commandes (paiement_id, commande_id, devise, montant_devise, statut, utilisateur_id, retour_secret_hash) VALUES ($1,$2,'EUR','1.52','creee',$3,$4)",
    [paiement.id, `TEST-ORDER-${SUFFIXE}`, comptes.membreA.utilisateurId, crypto.createHash('sha256').update('secret-retour-test').digest('hex')],
  );
  const sans = await fetch(`${BASE}/paiements/paypal/retour?token=TEST-ORDER-${SUFFIXE}`);
  assert.equal(sans.status, 404);
  const faux = await fetch(`${BASE}/paiements/paypal/retour?token=TEST-ORDER-${SUFFIXE}&retour=mauvais`);
  assert.equal(faux.status, 404);
});

// ── H-4 : WebSocket, premier message d'authentification ────────
test('H-4 : WebSocket, auth par premier message, puis repli ?jeton=', async () => {
  const ws1 = new WebSocket(`${BASE.replace('http', 'ws')}/messagerie/ws`);
  await new Promise((resolve, reject) => {
    ws1.onopen = () => ws1.send(JSON.stringify({ type: 'auth', jeton: comptes.jetonsA.access }));
    ws1.onerror = reject;
    setTimeout(resolve, 1500);
  });
  assert.equal(ws1.readyState, WebSocket.OPEN, 'la socket authentifiée par message reste ouverte');
  ws1.close();
  const ws2 = new WebSocket(`${BASE.replace('http', 'ws')}/messagerie/ws`);
  const fermeture = await new Promise((resolve) => {
    ws2.onopen = () => ws2.send(JSON.stringify({ type: 'auth', jeton: 'bidon' }));
    ws2.onclose = (e) => resolve(e.code);
    setTimeout(() => resolve(null), 5000);
  });
  assert.equal(fermeture, 4401, 'premier message invalide → fermeture 4401');
  const ws3 = new WebSocket(`${BASE.replace('http', 'ws')}/messagerie/ws?jeton=${comptes.jetonsA.access}`);
  await new Promise((resolve) => setTimeout(resolve, 1500));
  assert.equal(ws3.readyState, WebSocket.OPEN, 'le repli ?jeton= fonctionne toujours');
  ws3.close();
});

// ── B-24 : plafond en flux sur l'import du Bureau ──────────────
test('B-24 : import Bureau de plus de 10 Mo → 413 sans charger en mémoire', async () => {
  const gros = Buffer.alloc(11 * 1024 * 1024, 0x50);
  const formulaire = new FormData();
  formulaire.append('file', new Blob([gros], { type: 'application/octet-stream' }), 'bureau.docx');
  const r = await fetch(`${BASE}/admin/bureau/analyser`, {
    method: 'POST',
    headers: { authorization: `Bearer ${comptes.jetonAdminG}` },
    body: formulaire,
  });
  assert.equal(r.status, 413, 'au-delà de 10 Mo, le flux est coupé en 413');
});
