// ═══════════════════════════════════════════════════════════════════
//  CONNEXION PROPHÉTIQUE — API (Node.js 20+ / Fastify 5 / PostgreSQL)
//  « Former pour mieux servir »
//
//  Un seul fichier. Base de données : schema.sql, appliqué au démarrage
//  si la base est encore vide (première mise en ligne), puis jamais
//  retouché. Sans cela, /sante répond mais toutes les autres routes
//  échouent, faute de tables.
//  Variables d'environnement : voir .env.example
//
//  Règles d'architecture appliquées :
//   • Wave Business direct : aucun agrégateur.
//   • Un paiement n'est « confirmé » que par :
//       (a) webhook Wave signé dont l'identifiant de transaction ET le montant
//           correspondent à ceux déclarés par le membre, ou
//       (b) validation explicite de la structure (qui a contrôlé son compte Wave).
//     Jamais sur un simple retour de navigateur, un numéro saisi ou une capture.
//   • Montant calculé côté serveur (jamais pris du client pour un achat).
//   • Facture et fichier du livre : seulement après confirmation.
//   • Secrets (Wave, JWT, base) : variables d'environnement serveur uniquement.
//   • Fichiers téléversés : type réel vérifié depuis les octets.
//   • Sujets de prière : aucune route, aucun stockage (envoi par e-mail depuis l'app).
//
//  Webhook Wave (docs.wave.com/webhook) :
//   • en-tête Wave-Signature : t=<timestamp>,v1=<hmac>
//   • hmac = HMAC-SHA256(secret, timestamp + corps brut), comparaison à temps constant
//   • rejet au-delà de 5 minutes (anti-rejeu), idempotence par l'id d'événement
// ═══════════════════════════════════════════════════════════════════

import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import multipart from '@fastify/multipart';
import jwt from '@fastify/jwt';
import pg from 'pg';
import argon2 from 'argon2';
import { z } from 'zod';
import { fileTypeFromFile } from 'file-type';
import PDFDocument from 'pdfkit';
import { timingSafeEqual } from 'node:crypto';
import crypto from 'node:crypto';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { waveUrl, verifyWaveSignature, hasDuplicatePendingAmount } from './src/wave.js';

// ───────────────────────── Configuration ─────────────────────────
const env = process.env;
const need = (k) => {
  if (!env[k]) throw new Error(`Variable d'environnement manquante : ${k}`);
  return env[k];
};

const CFG = {
  port: Number(env.PORT || 3000),
  databaseUrl: need('DATABASE_URL'),
  databaseSsl: env.DATABASE_SSL === 'true',
  jwtSecret: need('JWT_SECRET'),
  corsOrigins: (env.CORS_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean),
  uploadDir: path.resolve(env.UPLOAD_DIR || './uploads'),
  // Lien Wave Business de la structure (fourni par Wave). Le serveur y ajoute ?amount=
  wavePayUrl: env.WAVE_PAYMENT_LINK || '',
  // Secret de signature du webhook (affiché une seule fois par Wave à l'enregistrement).
  waveWebhookSecret: env.WAVE_WEBHOOK_SECRET || '',
  // Restreint le webhook aux IP publiées par Wave (voir docs.wave.com/webhook). Nécessite trustProxy correct.
  waveEnforceIp: env.WAVE_ENFORCE_IP === 'true',
  // PayPal API, 27 oct. 2026 : identifiant et secret passent
  // uniquement par variables d'environnement, jamais dans le code,
  // jamais dans un dépôt public. Sans ces deux variables, les
  // routes PayPal API répondent 503 et l'application retombe sur
  // le lien de don PayPal. Base par défaut production, ou sandbox
  // si PAYPAL_MODE=sandbox, ou base explicite PAYPAL_API_BASE.
  paypalClientId: env.PAYPAL_CLIENT_ID || '',
  paypalClientSecret: env.PAYPAL_CLIENT_SECRET || '',
  paypalApiBase:
    env.PAYPAL_API_BASE ||
    (env.PAYPAL_MODE === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com'),
  // Adresse publique de l'API, pour le retour PayPal après approbation.
  // Par défaut, l'adresse Render de production ; à surcharger si besoin.
  publicBaseUrl: env.PUBLIC_BASE_URL || 'https://connexion-prophetique.onrender.com',
};
if (CFG.jwtSecret.length < 32) throw new Error('JWT_SECRET doit contenir au moins 32 caractères.');

// Fonctions de membre, 28 oct. 2026 : la même liste que le
// formulaire d'inscription, choix unique, sans texte libre.
// Le serveur refuse toute autre valeur, pour que la fonction
// affichée sur la carte soit toujours une de ces neuf.
const FONCTIONS_MEMBRE = ['Président', 'Secrétaire', 'Trésorier', 'Chantre', 'Organisateur', 'Responsable', 'Leader', 'PCA', 'Coordinateur', 'Membre', 'Aucun'];

const WAVE_IPS = [
  '104.155.43.220', '34.140.23.175', '34.22.138.147', '34.76.157.22', '34.78.253.137',
  '34.79.119.200', '35.189.207.30', '35.195.255.192', '35.205.122.113', '35.205.190.121',
  '35.233.61.130', '35.240.61.196', '35.240.75.65', '35.241.190.127', '35.241.219.1',
];

// ───────────────────────── Base de données ─────────────────────────
const pool = new pg.Pool({
  connectionString: CFG.databaseUrl,
  ssl: CFG.databaseSsl ? { rejectUnauthorized: false } : undefined,
  max: 10,
});
const q = (text, params) => pool.query(text, params);

async function tx(fn) {
  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    const r = await fn(c);
    await c.query('COMMIT');
    return r;
  } catch (e) {
    await c.query('ROLLBACK').catch(() => {});
    throw e;
  } finally {
    c.release();
  }
}

// ───────────────────────── Outils ─────────────────────────
const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');
const httpError = (status, message) => Object.assign(new Error(message), { statusCode: status });
const clean = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined));

// Les clés viennent toujours de schémas zod fixes (jamais du client) : pas d'injection possible.
const insertSql = (table, obj) => {
  const k = Object.keys(obj);
  return [`INSERT INTO ${table} (${k.join(', ')}) VALUES (${k.map((_, i) => `$${i + 1}`).join(', ')}) RETURNING *`, k.map((x) => obj[x])];
};
const updateSql = (table, id, obj) => {
  const k = Object.keys(obj);
  return [`UPDATE ${table} SET ${k.map((x, i) => `${x} = $${i + 1}`).join(', ')} WHERE id = $${k.length + 1} RETURNING *`, [...k.map((x) => obj[x]), id]];
};

const audit = (c, req, action, entite, entiteId, details) =>
  c.query(
    'INSERT INTO journal_audit (utilisateur_id, action, entite, entite_id, details, adresse_ip) VALUES ($1,$2,$3,$4,$5,$6)',
    [req?.user?.sub ?? null, action, entite, entiteId ?? null, details ? JSON.stringify(details) : null, req?.ip ?? null],
  );

const newRef = (prefix) =>
  `${prefix}-${Date.now().toString(36).toUpperCase()}${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

// Envoi de fichier avec prise en charge de Range (lecture audio en continu).
async function sendFile(req, reply, key, mime, { inline = true, filename } = {}) {
  const file = path.resolve(CFG.uploadDir, key);
  if (!file.startsWith(CFG.uploadDir + path.sep)) throw httpError(400, 'Chemin invalide.');
  let st;
  try {
    st = await fsp.stat(file);
  } catch {
    throw httpError(404, 'Fichier introuvable.');
  }
  reply.header('Content-Type', mime).header('Accept-Ranges', 'bytes');
  if (filename) {
    reply.header('Content-Disposition', `${inline ? 'inline' : 'attachment'}; filename="${filename.replace(/"/g, '')}"`);
  }
  const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
  if (range && (range[1] || range[2])) {
    let start = range[1] ? Number(range[1]) : st.size - Number(range[2]);
    let end = range[1] && range[2] ? Number(range[2]) : st.size - 1;
    start = Math.max(0, start);
    end = Math.min(end, st.size - 1);
    if (start > end) return reply.code(416).header('Content-Range', `bytes */${st.size}`).send();
    return reply
      .code(206)
      .header('Content-Range', `bytes ${start}-${end}/${st.size}`)
      .header('Content-Length', end - start + 1)
      .send(fs.createReadStream(file, { start, end }));
  }
  return reply.header('Content-Length', st.size).send(fs.createReadStream(file));
}

// ───────────────────────── Commande : créer un administrateur ─────────────────────────
//   node server.js create-admin email@exemple.com "MotDePasseSolide"
if (process.argv[2] === 'create-admin') {
  const [email, password] = process.argv.slice(3);
  if (!email || !password || password.length < 10) {
    console.error('Usage : node server.js create-admin <email> <mot_de_passe_10_caractères_min>');
    process.exit(1);
  }
  const hash = await argon2.hash(password, { type: argon2.argon2id });
  const r = await q(
    "INSERT INTO utilisateurs (email, mot_de_passe_hash, role) VALUES ($1,$2,'admin_general') RETURNING id",
    [email.trim().toLowerCase(), hash],
  );
  console.log(`Administrateur général créé : ${r.rows[0].id}`);
  await pool.end();
  process.exit(0);
}

// ───────────────────────── Serveur ─────────────────────────
const app = Fastify({ logger: true, trustProxy: true, bodyLimit: 1_048_576 });

// On garde le corps brut : indispensable à la signature du webhook Wave.
app.addContentTypeParser('application/json', { parseAs: 'string' }, (req, body, done) => {
  req.rawBody = body;
  if (!body) return done(null, {});
  try {
    done(null, JSON.parse(body));
  } catch {
    done(httpError(400, 'JSON invalide.'));
  }
});

await app.register(helmet);
// CORS, correctif 27 oct. 2026 : sans origine autorisée, le navigateur
// bloque les appels de la version web vers l'API, même quand le serveur
// répond 200. Le bouton Réessayer de l'accueil semblait donc ne rien
// faire, alors que la synchronisation échouait avant même d'atteindre
// le serveur. Par défaut, les origines connues de la structure sont
// autorisées ; CORS_ORIGINS dans Render, si renseignée, les remplace.
// L'application téléphone, native, n'est pas concernée par CORS.
const corsOrigins = CFG.corsOrigins.isNotEmpty ? CFG.corsOrigins : [
  'https://connexion-prophetique-site.onrender.com',
  'https://www.connexionprophetique.com',
  'https://connexionprophetique.com',
];
await app.register(cors, { origin: corsOrigins });
await app.register(rateLimit, { max: 120, timeWindow: '1 minute' });
await app.register(multipart, { limits: { fileSize: 100 * 1024 * 1024, files: 1 } });
await app.register(jwt, { secret: CFG.jwtSecret });

app.setErrorHandler((err, req, reply) => {
  if (err instanceof z.ZodError) {
    return reply.code(400).send({
      erreur: 'Données invalides.',
      details: err.issues.map((i) => ({ champ: i.path.join('.'), message: i.message })),
    });
  }
  if (err.code === '23505') return reply.code(409).send({ erreur: 'Un compte est déjà associé à ce numéro ou email.' });
  if (err.code === 'P0001') return reply.code(422).send({ erreur: err.message }); // règles du schéma
  if (err.code === '23514' || err.code === '23503') return reply.code(422).send({ erreur: 'Données refusées par la base.' });
  const status = err.statusCode && err.statusCode < 500 ? err.statusCode : 500;
  if (status === 500) req.log.error(err);
  return reply.code(status).send({ erreur: status === 500 ? 'Erreur interne.' : err.message });
});

// Protection de route : jeton valide + rôle autorisé.
const guard = (...allowed) => async (req, reply) => {
  try {
    await req.jwtVerify();
  } catch {
    return reply.code(401).send({ erreur: 'Authentification requise.' });
  }
  if (allowed.length && !allowed.includes(req.user.role)) {
    return reply.code(403).send({ erreur: 'Accès refusé.' });
  }
};
const adminG = guard('admin_general');
// Un administrateur général, ou d'établissement, qui possède aussi un
// profil membre, doit pouvoir récupérer son profil et utiliser
// l'application comme membre, sinon sa connexion échoue après
// /auth/connexion avec « Accès refusé » sur /moi. Correctif 27 oct. 2026.
const membreG = guard('membre', 'admin_general', 'admin_etablissement');

// ───────────────────────── Authentification ─────────────────────────
const DUMMY_HASH = await argon2.hash('mot-de-passe-factice', { type: argon2.argon2id });

async function issueTokens(c, u) {
  const m = (await c.query('SELECT id FROM membres WHERE utilisateur_id = $1', [u.id])).rows[0];
  const access = app.jwt.sign(
    { sub: u.id, role: u.role, mid: m?.id ?? null, eid: u.etablissement_admin_id ?? null },
    { expiresIn: '15m' },
  );
  const refresh = crypto.randomBytes(32).toString('hex');
  await c.query(
    "INSERT INTO jetons_rafraichissement (utilisateur_id, empreinte, expire_le) VALUES ($1,$2, now() + interval '30 days')",
    [u.id, sha256(refresh)],
  );
  return { access, refresh };
}

const authLimit = { config: { rateLimit: { max: 10, timeWindow: '1 minute' } } };

// Mot de passe temporaire, 29 oct. 2026 : réinitialisation assistée
// par l'administrateur général, sans e-mail ni SMS. Le temporaire
// remplace l'ancien mot de passe (empreinte argon2id, jamais en
// clair), il est valable 24 heures, et la première connexion avec
// lui impose un changement. Alphabet lisible au téléphone, sans 0,
// O, 1 ni I, pour éviter les confusions à la dictée.
const ALPHABET_TEMPORAIRE = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function genererMotDePasseTemporaire() {
  const groupes = [];
  for (let g = 0; g < 3; g++) {
    let groupe = '';
    for (let i = 0; i < 4; i++) groupe += ALPHABET_TEMPORAIRE[crypto.randomInt(ALPHABET_TEMPORAIRE.length)];
    groupes.push(groupe);
  }
  return groupes.join('-');
}

// Normalisation serveur, 27 oct. 2026, en miroir de l'application :
// espaces, tirets, points et parenthèses retirés, 00 initial
// remplacé par +, 0 de tronc après +225 retiré, pour que les
// anciennes applications, qui envoyaient +225074..., retrouvent
// le même compte que +225749..., sans créer de doublon. Un e-mail
// passe tel quel, sans être touché.
function normalizePhoneServer(raw) {
  if (!raw || raw.includes('@')) return raw;
  let v = String(raw).trim().replace(/[\s\-.\(\)]/g, '');
  if (v.startsWith('00')) v = `+${v.slice(2)}`;
  if (v.startsWith('+2250')) v = `+225${v.slice(5)}`;
  return v;
}

// Nouveau format officiel de matricule, 31 oct. 2026 : CP-AA-NNNN.
// AA = initiales du nom complet (premiere lettre du premier mot et
// premiere lettre du dernier mot, en majuscules, accents retires ;
// nom en un seul mot : lettre doublee). Les initiales sont figees
// a l'attribution : un changement de nom ne change jamais le
// matricule, sinon les QR deja imprimes seraient invalides.
function initialesMatricule(nomComplet) {
  const mots = String(nomComplet ?? '').trim().split(/\s+/).filter(Boolean);
  const lettre = (mot) => (mot ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().charAt(0) || 'X';
  if (mots.length === 0) return 'XX';
  if (mots.length === 1) {
    const l = lettre(mots[0]);
    return l + l;
  }
  return lettre(mots[0]) + lettre(mots[mots.length - 1]);
}

app.post('/auth/inscription', authLimit, async (req, reply) => {
  const b = z
    .object({
      email: z.string().trim().toLowerCase().email().optional(),
      telephone: z.string().trim().min(6).max(20).optional(),
      mot_de_passe: z.string().min(8).max(128),
      nom_complet: z.string().trim().min(2).max(120),
      etablissement_id: z.string().uuid().optional(),
      fonction: z.enum(FONCTIONS_MEMBRE).optional(),
      date_naissance: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    })
    .refine((v) => v.email || v.telephone, { message: 'Un e-mail ou un téléphone est requis.' })
    .parse(req.body);

  // Date de naissance facultative, 29 oct. 2026 : le format seul ne
  // suffit pas, une date impossible comme 2026-02-30 doit être refusée.
  let dateNaissance = null;
  if (b.date_naissance) {
    const [y, mo, d] = b.date_naissance.split('-').map(Number);
    const dt = new Date(Date.UTC(y, mo - 1, d));
    if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) {
      throw httpError(400, 'Date de naissance invalide.');
    }
    dateNaissance = b.date_naissance;
  }

  const hash = await argon2.hash(b.mot_de_passe, { type: argon2.argon2id });
  const telephone = normalizePhoneServer(b.telephone);
  const out = await tx(async (c) => {
    const u = (
      await c.query(
        "INSERT INTO utilisateurs (email, telephone, mot_de_passe_hash, role) VALUES ($1,$2,$3,'membre') RETURNING id, role, etablissement_admin_id",
        [b.email ?? null, telephone ?? null, hash],
      )
    ).rows[0];
    // Nouveau format officiel, 31 oct. 2026 : le matricule est
    // calcule ici (initiales + numero suivant de la suite), jamais
    // par le defaut base. nextval est atomique : deux inscriptions
    // simultanees ne recoivent jamais le meme numero.
    const numero = (await c.query("SELECT nextval('seq_matricule_nouveau') AS n")).rows[0].n;
    const matricule = `CP-${initialesMatricule(b.nom_complet)}-${String(numero).padStart(4, '0')}`;
    const m = (
      await c.query(
        'INSERT INTO membres (utilisateur_id, nom_complet, etablissement_id, fonction, date_naissance, matricule) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, matricule, nom_complet, valide_jusqua',
        [u.id, b.nom_complet, b.etablissement_id ?? null, b.fonction ?? '', dateNaissance, matricule],
      )
    ).rows[0];
    const tokens = await issueTokens(c, u);
    await audit(c, { user: { sub: u.id }, ip: req.ip }, 'membre.inscrit', 'membres', m.id);
    return { membre: m, ...tokens };
  });
  // Don de camp, 31 oct. 2026 : les dons deja valides pour ce
  // contact s'attachent seuls a ce nouveau compte.
  attacherDonsEnAttente(out.membre.id, b.email ?? null, telephone ?? null).catch((e) => app.log.error(e));
  return reply.code(201).send(out);
});

app.post('/auth/connexion', authLimit, async (req) => {
  const b = z.object({ identifiant: z.string().trim().min(3), mot_de_passe: z.string().min(1) }).parse(req.body);
  const identifiant = normalizePhoneServer(b.identifiant);
  const u = (
    await q(
      'SELECT id, role, etablissement_admin_id, mot_de_passe_hash, mot_de_passe_temporaire_expire_le FROM utilisateurs WHERE actif AND (lower(email) = lower($1) OR telephone = $1)',
      [identifiant],
    )
  ).rows[0];
  // Même coût de calcul si l'utilisateur n'existe pas (pas d'indice sur les comptes).
  const ok = await argon2.verify(u?.mot_de_passe_hash ?? DUMMY_HASH, b.mot_de_passe).catch(() => false);
  if (!u || !ok) throw httpError(401, 'Identifiants incorrects.');
  // Temporaire, 29 oct. 2026 : expiré, aucun jeton n'est émis, le
  // membre doit demander une réémission à l'administrateur général.
  // Non expiré, le drapeau impose le changement forcé côté application.
  const temporaireActif = u.mot_de_passe_temporaire_expire_le != null;
  if (temporaireActif && new Date(u.mot_de_passe_temporaire_expire_le) <= new Date()) {
    throw httpError(401, 'Ce mot de passe temporaire a expiré. Contacte la structure pour en recevoir un nouveau.');
  }
  const tokens = await tx((c) => issueTokens(c, u));
  return { ...tokens, mot_de_passe_temporaire: temporaireActif };
});

app.post('/auth/rafraichir', authLimit, async (req) => {
  const { refresh } = z.object({ refresh: z.string().length(64) }).parse(req.body);
  return tx(async (c) => {
    const t = (
      await c.query(
        'UPDATE jetons_rafraichissement SET revoque = true WHERE empreinte = $1 AND NOT revoque AND expire_le > now() RETURNING utilisateur_id',
        [sha256(refresh)],
      )
    ).rows[0];
    if (!t) throw httpError(401, 'Session expirée. Reconnectez-vous.');
    const u = (
      await c.query('SELECT id, role, etablissement_admin_id, mot_de_passe_temporaire_expire_le FROM utilisateurs WHERE id = $1 AND actif', [t.utilisateur_id])
    ).rows[0];
    if (!u) throw httpError(401, 'Compte inactif.');
    // Temporaire en cours, 29 oct. 2026 : le rafraîchissement est
    // refusé, pour que la session ne survive pas à un changement
    // forcé non effectué. Le jeton présenté est déjà révoqué
    // ci-dessus, le membre se reconnecte avec son temporaire et
    // retombe sur le changement forcé.
    if (u.mot_de_passe_temporaire_expire_le) {
      throw httpError(401, 'Changement de mot de passe requis. Connecte-toi avec ton mot de passe temporaire.');
    }
    return issueTokens(c, u);
  });
});

app.post('/auth/deconnexion', async (req) => {
  const { refresh } = z.object({ refresh: z.string().length(64) }).parse(req.body);
  await q('UPDATE jetons_rafraichissement SET revoque = true WHERE empreinte = $1', [sha256(refresh)]);
  return { ok: true };
});

// ───────────────────────── Consultation publique (visiteur) ─────────────────────────
// Racine : l'API seule n'est pas un site web, on évite une erreur 404
// quand l'adresse est ouverte dans un navigateur.
app.get('/', async () => ({ ok: true, service: 'CONNEXION PROPHETIQUE', api: 'https://connexion-prophetique.onrender.com', sante: '/sante' }));

app.get('/sante', async () => {
  await q('SELECT 1');
  return { ok: true };
});

// ───────────────────────── Configuration pilotée par le serveur ──
// Modèle Desjardins, 27 oct. 2026 : les petits réglages de contenu
// (textes d'accueil, libellés de base, messages d'information,
// activation d'une section) se changent côté serveur, sans nouvelle
// APK. L'application lit /config au démarrage et à chaque
// synchronisation, et garde la dernière configuration en local
// comme repli hors ligne. Les valeurs par défaut ci-dessous sont
// exactement les valeurs actuelles de l'application, rien n'est
// inventé : changer une valeur ici ne change aucune fonction, aucun
// prix, aucun paiement, aucun texte biblique.
// La table config_app n'existe que si la base est neuve (schema.sql)
// ou si un premier PUT /admin/config l'a créée, ou si la migration
// documentée dans docs/DEPLOIEMENT.md a été appliquée à la main.
// Tant qu'elle est absente, GET /config renvoie les défauts, jamais
// une erreur : l'application existante continue donc de fonctionner.
const DEFAULT_CONFIG = {
  version: 1,
  accueil_salutation: 'Shalom',
  titre_vie_spirituelle: 'Ma vie spirituelle',
  titre_explorer: 'Explorer',
  titre_rendez_vous: 'Prochains rendez-vous',
  titre_actualites: 'Actualités de la communauté',
  message_visiteur: 'Mode visiteur, consultation sans inscription',
  message_hors_ligne: 'Hors ligne : contenus locaux affichés. La synchronisation reprendra en ligne.',
  message_aucune_actualite: 'Aucune actualité pour le moment',
  nav_accueil: 'Accueil',
  nav_bible: 'Bible',
  nav_carte: 'Carte',
  nav_communaute: 'Communauté',
  nav_plus: 'Plus',
  // URL du logo, vide par défaut : l'application utilise alors
  // son logo officiel local, redimensionné en en-tête. Si la
  // structure renseigne ici une URL, par exemple un fichier
  // téléversé sur le serveur, l'application l'utilise à la place,
  // sans nouvelle APK, avec repli local en cas d'échec ou hors ligne.
  logo_url: '',
  sections: {
    vie_spirituelle: true,
    explorer: true,
    verset_du_jour: true,
    quiz: true,
    rendez_vous: true,
    actualites: true,
    priere: true,
  },
};
const CONFIG_TEXT_KEYS = [
  'accueil_salutation', 'titre_vie_spirituelle', 'titre_explorer',
  'titre_rendez_vous', 'titre_actualites', 'message_visiteur',
  'message_hors_ligne', 'message_aucune_actualite', 'nav_accueil',
  'nav_bible', 'nav_carte', 'nav_communaute', 'nav_plus',
  'logo_url',
];
const CONFIG_SECTION_KEYS = [
  'vie_spirituelle', 'explorer', 'verset_du_jour', 'quiz',
  'rendez_vous', 'actualites', 'priere',
];
async function readConfig() {
  const merged = { ...DEFAULT_CONFIG, sections: { ...DEFAULT_CONFIG.sections } };
  try {
    const rows = (await q('SELECT cle, valeur FROM config_app')).rows;
    for (const r of rows) {
      if (CONFIG_TEXT_KEYS.includes(r.cle) && typeof r.valeur === 'string') merged[r.cle] = r.valeur;
      if (r.cle === 'sections' && r.valeur && typeof r.valeur === 'object') {
        for (const k of CONFIG_SECTION_KEYS) {
          if (typeof r.valeur[k] === 'boolean') merged.sections[k] = r.valeur[k];
        }
      }
    }
  } catch (e) {
    // Table absente sur une base existante (42P01) ou toute autre
    // erreur de lecture : on renvoie les défauts, on ne casse pas
    // l'application. L'erreur reste journalisée côté serveur.
    if (e?.code !== '42P01') app.log.error(e);
  }
  return { ...merged, source: 'serveur' };
}

app.get('/config', async () => readConfig());

// Modification réservée à l'administrateur général, comme les livres.
// Corps accepté : tout sous-ensemble des clés connues, plus
// éventuellement sections (objet, booléens pour les sections connues).
// Les clés inconnues sont refusées, pour ne pas laisser passer une
// faute de frappe silencieuse. Le premier PUT crée la table si elle
// est absente, ce qui évite une migration forcée sur une base existante.
app.put('/admin/config', { preHandler: adminG }, async (req, reply) => {
  const body = req.body && typeof req.body === 'object' && !Array.isArray(req.body) ? req.body : null;
  if (!body) throw httpError(400, 'Corps JSON objet requis.');
  const unknown = Object.keys(body).filter((k) => k !== 'sections' && !CONFIG_TEXT_KEYS.includes(k));
  if (unknown.length) throw httpError(422, `Clés inconnues : ${unknown.join(', ')}.`);
  const updates = {};
  for (const k of CONFIG_TEXT_KEYS) {
    if (body[k] === undefined) continue;
    if (typeof body[k] !== 'string' || body[k].trim().isEmpty || body[k].length > 300) {
      throw httpError(422, `La clé ${k} doit être un texte non vide de 300 caractères maximum.`);
    }
    updates[k] = body[k];
  }
  if (body.sections !== undefined) {
    if (!body.sections || typeof body.sections !== 'object' || Array.isArray(body.sections)) {
      throw httpError(422, 'sections doit être un objet.');
    }
    const secUnknown = Object.keys(body.sections).filter((k) => !CONFIG_SECTION_KEYS.includes(k));
    if (secUnknown.length) throw httpError(422, `Sections inconnues : ${secUnknown.join(', ')}.`);
    const sec = {};
    for (const k of CONFIG_SECTION_KEYS) {
      if (body.sections[k] === undefined) continue;
      if (typeof body.sections[k] !== 'boolean') throw httpError(422, `La section ${k} doit être un booléen.`);
      sec[k] = body.sections[k];
    }
    if (Object.keys(sec).length) updates.sections = sec;
  }
  if (!Object.keys(updates).length) throw httpError(400, 'Aucune clé connue à modifier.');
  await q(`CREATE TABLE IF NOT EXISTS config_app (
    cle text PRIMARY KEY,
    valeur jsonb NOT NULL,
    modifie_le timestamptz NOT NULL DEFAULT now()
  )`);
  for (const [k, v] of Object.entries(updates)) {
    await q(
      `INSERT INTO config_app (cle, valeur, modifie_le) VALUES ($1, $2::jsonb, now())
       ON CONFLICT (cle) DO UPDATE SET valeur = EXCLUDED.valeur, modifie_le = now()`,
      [k, JSON.stringify(v)],
    );
  }
  try {
    await q(
      "INSERT INTO journal_audit (utilisateur_id, action, entite, details) VALUES ($1, 'config.modifie', 'config_app', $2::jsonb)",
      [req.user.sub, JSON.stringify({ cles: Object.keys(updates) })],
    );
  } catch (_) {}
  return reply.code(200).send(await readConfig());
});

app.get('/etablissements', async () => (await q('SELECT id, nom, description, image_id FROM etablissements ORDER BY nom')).rows);

app.get('/etablissements/:id', async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const e = (await q('SELECT id, nom, description, image_id FROM etablissements WHERE id = $1', [id])).rows[0];
  if (!e) throw httpError(404, 'Établissement introuvable.');
  const [activites, actualites] = await Promise.all([
    q('SELECT id, titre, description, image_id FROM activites_etablissement WHERE etablissement_id = $1 ORDER BY cree_le', [id]),
    q('SELECT id, titre, texte, image_id, publiee_le FROM actualites WHERE etablissement_id = $1 AND (programmee_le IS NULL OR programmee_le <= now()) ORDER BY publiee_le DESC LIMIT 50', [id]),
  ]);
  return { ...e, activites: activites.rows, actualites: actualites.rows };
});

app.get('/actualites', async (req) => {
  // Programmation, 30 oct. 2026 : une actualité programmée ne
  // sonne la cloche qu'à sa publication, une seule fois, grâce
  // au drapeau. La prise du drapeau est atomique : deux appels
  // en même temps ne notifient qu'une fois.
  try {
    const dues = (await q(`SELECT id, titre FROM actualites WHERE programmee_le IS NOT NULL AND programmee_le <= now() AND NOT notif_envoyee`)).rows;
    for (const d of dues) {
      const prise = (await q(`UPDATE actualites SET notif_envoyee = true WHERE id = $1 AND NOT notif_envoyee RETURNING id`, [d.id])).rows[0];
      if (prise) await notifierTous('nouvelle_actualite', 'Nouvelle actualité', `Bonjour {prenom}, ${d.titre}`, 'actualite', d.id, undefined, d.titre);
    }
  } catch (e) {
    app.log.error(e);
  }
  const { etablissement_id } = z.object({ etablissement_id: z.string().uuid().optional() }).parse(req.query);
  return (
    await q(
      `SELECT id, etablissement_id, titre, texte, image_id, publiee_le FROM actualites
       WHERE ($1::uuid IS NULL OR etablissement_id = $1) AND (programmee_le IS NULL OR programmee_le <= now()) ORDER BY publiee_le DESC LIMIT 100`,
      [etablissement_id ?? null],
    )
  ).rows;
});

// Dates, lieu, tarif NULL = « À confirmer » côté application.
app.get('/evenements', async () =>
  (
    await q(
      'SELECT id, type, nom, date_debut, date_fin, lieu, tarif_fcfa, image_id, est_kairos FROM evenements WHERE publie ORDER BY date_debut NULLS LAST, nom',
    )
  ).rows);

// Le contact n'est renvoyé qu'avec l'accord de la personne.
app.get('/bureau', async () =>
  (await q('SELECT id, nom, fonction, CASE WHEN contact_public THEN contact END AS contact FROM bureau_membres ORDER BY ordre, nom')).rows);

app.get('/enseignements', async () =>
  (await q('SELECT id, titre, orateur, description, audio_id, publie_le FROM enseignements WHERE publie ORDER BY publie_le DESC')).rows);

// Annonces audio, 29 oct. 2026 : seules les annonces actives, les
// plus récentes d'abord. L'état d'écoute d'un membre n'est jamais
// enregistré ici : il reste local sur son appareil.
app.get('/annonces-audio', async () =>
  (await q('SELECT id, titre, texte, audio_id, lien_audio, publiee_le FROM annonces_audio WHERE actif AND (programmee_le IS NULL OR programmee_le <= now()) ORDER BY publiee_le DESC, id DESC')).rows);

// Catalogue : le fichier du livre n'apparaît JAMAIS ici.
app.get('/livres', async () =>
  (await q('SELECT id, titre, auteur, description, prix_fcfa, format, couverture_id FROM livres WHERE publie ORDER BY titre')).rows);

// Images et audio publics (couvertures, photos, enseignements). Jamais de PDF/EPUB ici.
app.get('/fichiers/:id', async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const f = (await q('SELECT cle_stockage, type_mime_reel FROM fichiers WHERE id = $1 AND verifie', [id])).rows[0];
  if (!f || !/^(image|audio)\//.test(f.type_mime_reel)) throw httpError(404, 'Fichier introuvable.');
  reply.header('Cache-Control', 'public, max-age=86400');
  return sendFile(req, reply, f.cle_stockage, f.type_mime_reel);
});

// Cloche de notifications internes, 29 oct. 2026 : création faite
// au mieux, après la validation de l'action principale et hors
// transaction, pour qu'un échec de notification ne puisse jamais
// faire échouer une validation de paiement ou une publication.
// Chaque échec est journalisé puis ignoré. Les textes viennent du
// serveur, en français, comme les autres messages serveur.
const libellePaiement = (t) =>
  t === 'don' ? 'don' : t === 'achat' ? 'achat' : t === 'carte' ? 'carte de membre' : t === 'cotisation' ? 'cotisation' : t === 'camp' ? 'versement du camp' : 'paiement';
const fcfaTexte = (n) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA`;

// Plafond : 100 dernières notifications par membre, les plus
// anciennes supprimées à l'insertion.
async function taillerNotifications() {
  try {
    await q(`DELETE FROM notifications n WHERE n.id IN (
      SELECT id FROM (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY membre_id ORDER BY cree_le DESC, id DESC) AS rn FROM notifications
      ) s WHERE rn > 100)`);
  } catch (e) {
    app.log.error(e);
  }
}
// Prénom du membre, 30 oct. 2026 : premier mot du nom complet,
// exactement comme la salutation de l'accueil dans l'application.
// Chaîne vide si aucun nom utilisable, jamais un texte cassé.
function prenomDe(nomComplet) {
  const nom = (nomComplet ?? '').toString().trim();
  if (!nom) return '';
  return nom.split(/\s+/)[0];
}

// Notifications adressées à un seul membre. Les libellés peuvent
// contenir {prenom}, remplacé par le prénom du membre. Sans prénom,
// les libellés de repli sont utilisés tels quels.
async function notifierMembre(membreId, type, titre, message, lienType, lienId, titreSansPrenom, messageSansPrenom) {
  if (!membreId) return;
  try {
    const m = (await q('SELECT nom_complet FROM membres WHERE id = $1', [membreId])).rows[0];
    const prenom = prenomDe(m?.nom_complet);
    const titreFinal = prenom ? titre.replaceAll('{prenom}', prenom) : (titreSansPrenom ?? titre);
    const messageFinal = prenom ? message.replaceAll('{prenom}', prenom) : (messageSansPrenom ?? message);
    await q(
      `INSERT INTO notifications (membre_id, type, titre, message, lien_type, lien_id) VALUES ($1,$2,$3,$4,$5,$6)`,
      [membreId, type, titreFinal, messageFinal, lienType ?? null, lienId ?? null],
    );
    await taillerNotifications();
  } catch (e) {
    app.log.error(e);
  }
}
// Notifications adressées à tous les membres, personnalisées une
// par une. Les libellés peuvent contenir {prenom}, remplacé par le
// prénom de chaque membre. Sans prénom, les libellés de repli sont
// utilisés tels quels. Une seule requête, aucun changement de type
// ni de déclencheur.
async function notifierTous(type, titre, message, lienType, lienId, titreSansPrenom, messageSansPrenom) {
  try {
    await q(
      `INSERT INTO notifications (membre_id, type, titre, message, lien_type, lien_id)
       SELECT id, $1,
         CASE WHEN btrim(COALESCE(nom_complet, '')) = '' THEN $6 ELSE REPLACE($2, '{prenom}', split_part(btrim(nom_complet), ' ', 1)) END,
         CASE WHEN btrim(COALESCE(nom_complet, '')) = '' THEN $7 ELSE REPLACE($3, '{prenom}', split_part(btrim(nom_complet), ' ', 1)) END,
         $4, $5 FROM membres`,
      [type, titre, message, lienType ?? null, lienId ?? null, titreSansPrenom ?? titre, messageSansPrenom ?? message],
    );
    await taillerNotifications();
  } catch (e) {
    app.log.error(e);
  }
}
// Don de camp, 31 oct. 2026 : le beneficiaire effectif d'un paiement
// de camp, celui qui offre pour un don, le membre lui-meme sinon.
function beneficiaireEffectif(paiement) {
  if (!paiement) return null;
  if (paiement.beneficiaire_contact) return paiement.beneficiaire_id ?? null;
  return paiement.membre_id ?? null;
}

// Don de camp, 31 oct. 2026 : rattache un don deja valide a un
// beneficiaire qui vient d'etre identifie (creation de compte ou
// validation tardive). Cree son inscription si elle manque, puis
// lui annonce le don dans sa cloche. Best effort : un echec ici
// ne doit jamais faire echouer la validation ou l'inscription.
async function annoncerDon(paiement, beneficiaireId) {
  try {
    if (!paiement || !paiement.evenement_id || !beneficiaireId) return;
    const ev = (await q('SELECT id, nom, tarif_fcfa FROM evenements WHERE id = $1', [paiement.evenement_id])).rows[0];
    if (!ev) return;
    await q(
      'INSERT INTO inscriptions (evenement_id, membre_id, versements_requis) VALUES ($1,$2,$3) ON CONFLICT (evenement_id, membre_id) DO NOTHING',
      [paiement.evenement_id, beneficiaireId, (ev.tarif_fcfa ?? 0) > 0],
    );
    const donateur = (await q('SELECT nom_complet FROM membres WHERE id = $1', [paiement.membre_id])).rows[0];
    const nomDonateur = donateur?.nom_complet ?? 'Un membre';
    const messageDon = paiement.message_don ? ` Message de ${nomDonateur} : « ${paiement.message_don} »` : '';
    await notifierMembre(
      beneficiaireId,
      'camp_rappel',
      'Camp offert, entièrement payé',
      `Bonjour {prenom}, ${nomDonateur} vous a offert le camp ${ev.nom}. Votre pass est maintenant disponible dans vos inscriptions.${messageDon}`,
      'camp',
      paiement.evenement_id,
      'Camp offert, entièrement payé',
      `${nomDonateur} vous a offert le camp ${ev.nom}. Votre pass est maintenant disponible dans vos inscriptions.${messageDon}`,
    );
  } catch (e) {
    app.log.error(e);
  }
}

// Don de camp, 31 oct. 2026 : resolution d'un beneficiaire deja
// membre par le contact saisi, sans exposer ses donnees.
async function resoudreBeneficiaire(contact) {
  if (!contact) return null;
  const normalise = contact.includes('@') ? contact.trim().toLowerCase() : normalizePhoneServer(contact);
  const row = (await q(
    `SELECT m.id FROM membres m JOIN utilisateurs u ON u.id = m.utilisateur_id
     WHERE u.email = $1 OR u.telephone = $1`,
    [normalise],
  )).rows[0];
  return row?.id ?? null;
}

// Don de camp, 31 oct. 2026 : a la creation d'un compte, les dons
// deja valides pour ce contact (e-mail ou telephone, normalises
// comme a l'inscription) s'attachent seuls au nouveau membre :
// inscription creee, pass debloque par le montant paye,
// notification dans sa cloche. Best effort, jamais bloquant.
async function attacherDonsEnAttente(membreId, email, telephone) {
  try {
    const contacts = [email ?? null, telephone ?? null].filter((v) => v);
    if (contacts.length === 0) return;
    const rows = (await q(
      `SELECT p.* FROM paiements p WHERE p.type = 'camp' AND p.statut = 'confirme'
       AND p.beneficiaire_id IS NULL AND p.beneficiaire_contact IS NOT NULL AND p.beneficiaire_contact = ANY($1)`,
      [contacts],
    )).rows;
    for (const row of rows) {
      await q('UPDATE paiements SET beneficiaire_id = $1 WHERE id = $2 AND beneficiaire_id IS NULL', [membreId, row.id]);
      await annoncerDon({ ...row, beneficiaire_id: membreId }, membreId);
    }
  } catch (e) {
    app.log.error(e);
  }
}

async function notifierPaiementValide(paiement) {
  if (!paiement) return;
  // Don de camp, 31 oct. 2026 : si le beneficiaire n'etait pas
  // encore connu a la creation du don, une validation tardive
  // (apres sa creation de compte) le rattache maintenant.
  if (paiement.type === 'camp' && paiement.beneficiaire_contact && !paiement.beneficiaire_id) {
    const trouve = await resoudreBeneficiaire(paiement.beneficiaire_contact);
    if (trouve) {
      await q('UPDATE paiements SET beneficiaire_id = $1 WHERE id = $2 AND beneficiaire_id IS NULL', [trouve, paiement.id]);
      paiement = { ...paiement, beneficiaire_id: trouve };
    }
  }
  const estDon = paiement.type === 'camp' && (paiement.beneficiaire_id || paiement.beneficiaire_contact);
  const libelle = estDon ? 'don de camp' : libellePaiement(paiement.type);
  await notifierMembre(
    paiement.membre_id,
    'paiement_valide',
    'Paiement validé',
    `Bonjour {prenom}, votre ${libelle} de ${fcfaTexte(paiement.montant_fcfa)} a été validé par la structure.`,
    'paiement',
    paiement.id,
    undefined,
    `Votre ${libelle} de ${fcfaTexte(paiement.montant_fcfa)} a été validé par la structure.`,
  );
  // Paiement du camp en 6 fois, 31 oct. 2026 : après chaque
  // versement validé, un rappel personnalisé dit ce qu'il reste à
  // payer et combien de versements restent, ou que le pass est
  // débloqué quand la totalité est atteinte. La totalité se mesure
  // au montant payé, pas au seul compte de 6 versements, pour
  // qu'un paiement en une fois ou un don débloque aussi le pass.
  if (paiement.type === 'camp' && paiement.evenement_id) {
    const cible = beneficiaireEffectif(paiement);
    const prog = cible ? await progressionCamp(cible, paiement.evenement_id) : null;
    if (prog) {
      if (estDon && paiement.beneficiaire_id) {
        await annoncerDon(paiement, paiement.beneficiaire_id);
      } else if (prog.restant <= 0) {
        if (!estDon) {
          await notifierMembre(
            paiement.membre_id,
            'camp_rappel',
            'Camp entièrement payé',
            `Bonjour {prenom}, votre camp ${prog.camp_nom} est entièrement payé. Votre pass est maintenant disponible dans vos inscriptions.`,
            'camp',
            paiement.evenement_id,
            'Camp entièrement payé',
            `Votre camp ${prog.camp_nom} est entièrement payé. Votre pass est maintenant disponible dans vos inscriptions.`,
          );
        }
      } else {
        const restants = 6 - prog.valides;
        await notifierMembre(
          cible,
          'camp_rappel',
          'Versement du camp validé',
          `Bonjour {prenom}, votre versement pour ${prog.camp_nom} est validé. Il vous reste ${fcfaTexte(prog.restant)} à payer, soit ${restants} versement${restants > 1 ? 's' : ''} sur 6.`,
          'camp',
          paiement.evenement_id,
          'Versement du camp validé',
          `Votre versement pour ${prog.camp_nom} est validé. Il vous reste ${fcfaTexte(prog.restant)} à payer, soit ${restants} versement${restants > 1 ? 's' : ''} sur 6.`,
        );
      }
    }
  }
}

// Paiement du camp en 6 fois, 31 oct. 2026 : montant d'un versement.
// Les 5 premiers prennent la part entière, le 6e prend le reste,
// pour que 6 versements validés égalent exactement le tarif.
function montantVersement(tarif, numero) {
  if (numero >= 6) return tarif - 5 * Math.floor(tarif / 6);
  return Math.floor(tarif / 6);
}

// Progression d'un membre pour un camp : versements validés
// (numéros distincts), montant payé, montant restant, versement
// suivant et son montant, versement en attente éventuel.
async function progressionCamp(membreId, evenementId) {
  const ev = (await q('SELECT id, nom, tarif_fcfa FROM evenements WHERE id = $1', [evenementId])).rows[0];
  if (!ev) return null;
  const tarif = ev.tarif_fcfa ?? 0;
  const agg = (await q(
    `SELECT COUNT(DISTINCT numero_versement) FILTER (WHERE statut = 'confirme')::int AS valides,
            COALESCE(SUM(montant_fcfa) FILTER (WHERE statut = 'confirme'), 0)::int AS paye
     FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = $1 AND evenement_id = $2 AND type = 'camp'`,
    [membreId, evenementId],
  )).rows[0];
  const valides = agg?.valides ?? 0;
  const paye = agg?.paye ?? 0;
  const suivant = valides >= 6 ? null : valides + 1;
  const enAttente = (await q(
    `SELECT reference, montant_fcfa, numero_versement FROM paiements
     WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = $1 AND evenement_id = $2 AND type = 'camp' AND statut = 'en_attente'
     ORDER BY cree_le DESC LIMIT 1`,
    [membreId, evenementId],
  )).rows[0] ?? null;
  return {
    camp_nom: ev.nom, tarif, paye,
    restant: Math.max(0, tarif - paye),
    valides, suivant,
    montant_suivant: suivant == null ? null : montantVersement(tarif, suivant),
    en_attente: enAttente ? { reference: enAttente.reference, montant_fcfa: enAttente.montant_fcfa, numero_versement: enAttente.numero_versement } : null,
  };
}

// Rappel de cotisation mensuelle, 29 oct. 2026 : un seul rappel
// par membre et par mois, à partir du 15, jamais rétroactif, qui
// disparaît seul dès que la cotisation du mois est soldée. Soldée
// veut dire : un paiement de cotisation confirmé pour le mois en
// cours, ou une cotisation enregistrée par la structure pour ce
// mois (espèces, via /admin/cotisations). Une demande en attente
// ne solde jamais. Appelée à chaque lecture de la cloche, donc à
// chaque ouverture et synchronisation de l'application.
async function entretenirRappelCotisation(membreId) {
  if (!membreId) return;
  try {
    // Nettoyage : les rappels des mois passés ne comptent jamais.
    await q(`DELETE FROM notifications WHERE membre_id = $1 AND type = 'cotisation_rappel'
             AND date_trunc('month', cree_le) < date_trunc('month', CURRENT_DATE)`, [membreId]);
    const solde = (
      await q(
        `SELECT 1 FROM paiements WHERE membre_id = $1 AND type = 'cotisation' AND statut = 'confirme'
           AND date_trunc('month', COALESCE(confirme_le, cree_le)) = date_trunc('month', CURRENT_DATE)
         UNION ALL
         SELECT 1 FROM cotisations WHERE membre_id = $1 AND mois = date_trunc('month', CURRENT_DATE)::date
         LIMIT 1`,
        [membreId],
      )
    ).rows[0];
    if (solde) {
      // Réglé : le rappel du mois disparaît seul.
      await q(`DELETE FROM notifications WHERE membre_id = $1 AND type = 'cotisation_rappel'
               AND date_trunc('month', cree_le) = date_trunc('month', CURRENT_DATE)`, [membreId]);
      return;
    }
    const jour = (await q(`SELECT EXTRACT(DAY FROM CURRENT_DATE)::int AS j`)).rows[0]?.j ?? 1;
    if (jour < 15) return;
    const deja = (
      await q(
        `SELECT 1 FROM notifications WHERE membre_id = $1 AND type = 'cotisation_rappel'
           AND date_trunc('month', cree_le) = date_trunc('month', CURRENT_DATE) LIMIT 1`,
        [membreId],
      )
    ).rows[0];
    if (deja) return;
    const membre = (await q('SELECT nom_complet FROM membres WHERE id = $1', [membreId])).rows[0];
    const prenom = prenomDe(membre?.nom_complet);
    const messageRappel = prenom
      ? `Bonjour ${prenom}, votre cotisation du mois n’est pas encore réglée. Réglez-la pour rester à jour.`
      : 'Votre cotisation du mois n’est pas encore réglée. Réglez-la pour rester à jour.';
    await q(
      `INSERT INTO notifications (membre_id, type, titre, message, lien_type, lien_id)
       VALUES ($1, 'cotisation_rappel', 'Rappel, cotisation mensuelle', $2, 'cotisation', NULL)`,
      [membreId, messageRappel],
    );
  } catch (e) {
    app.log.error(e);
  }
}

// Rappel mensuel des versements de camp, 31 oct. 2026 : même
// précédent que la cotisation, un seul rappel par camp et par
// mois, généré quand l'application tourne, jamais poussé si elle
// est fermée. Tant que le solde reste, le membre reçoit chaque
// mois un rappel personnalisé (montant restant, versements
// restants). Les rappels s'arrêtent 12 jours avant le début du
// camp, ce qui donne le 10 août 2027 pour un camp commençant le
// 22 août ; sans date de début utilisable, ils continuent tant
// que le solde reste. L'échéance arrête seulement les rappels :
// aucun paiement n'est jamais bloqué après elle, un versement
// tardif débloque toujours le pass dès que la totalité est
// atteinte. Appelée à chaque lecture de la cloche, comme le
// rappel de cotisation.
async function entretenirRappelsCamp(membreId) {
  if (!membreId) return;
  try {
    const plans = (await q(
      `SELECT i.evenement_id, e.nom, e.date_debut, e.tarif_fcfa,
              (SELECT COUNT(DISTINCT numero_versement) FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = i.membre_id AND evenement_id = i.evenement_id AND type = 'camp' AND statut = 'confirme')::int AS valides,
              (SELECT COALESCE(SUM(montant_fcfa), 0) FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = i.membre_id AND evenement_id = i.evenement_id AND type = 'camp' AND statut = 'confirme')::int AS paye
       FROM inscriptions i JOIN evenements e ON e.id = i.evenement_id
       WHERE i.membre_id = $1 AND i.versements_requis
         AND (e.date_debut IS NULL OR CURRENT_DATE <= e.date_debut - INTERVAL '12 days')`,
      [membreId],
    )).rows;
    for (const plan of plans) {
      const valides = plan.valides ?? 0;
      const tarif = plan.tarif_fcfa ?? 0;
      const restant = Math.max(0, tarif - (plan.paye ?? 0));
      if (restant <= 0) continue;
      const restants = 6 - valides;
      // Un seul rappel par camp et par mois, quel que soit son
      // déclencheur (plan, validation ou mensuel).
      const deja = (await q(
        `SELECT 1 FROM notifications WHERE membre_id = $1 AND lien_type = 'camp' AND lien_id = $2 AND type IN ('camp_rappel', 'camp_rappel_mensuel')
           AND date_trunc('month', cree_le) = date_trunc('month', CURRENT_DATE) LIMIT 1`,
        [membreId, plan.evenement_id],
      )).rows[0];
      if (deja) continue;
      await notifierMembre(
        membreId,
        'camp_rappel_mensuel',
        'Rappel, paiement du camp',
        `Bonjour {prenom}, il vous reste ${fcfaTexte(restant)} à payer pour ${plan.nom}, soit ${restants} versement${restants > 1 ? 's' : ''} sur 6.`,
        'camp',
        plan.evenement_id,
        'Rappel, paiement du camp',
        `Il vous reste ${fcfaTexte(restant)} à payer pour ${plan.nom}, soit ${restants} versement${restants > 1 ? 's' : ''} sur 6.`,
      );
    }
  } catch (e) {
    app.log.error(e);
  }
}

// ───────────────────────── Espace membre ─────────────────────────
app.get('/moi', { preHandler: membreG }, async (req) => {
  const r = (
    await q(
      `SELECT m.id, m.matricule, m.nom_complet, m.valide_jusqua, m.inscrit_le, e.nom AS etablissement, m.photo_donnees AS photo, m.fonction AS fonction,
              to_char(m.date_naissance, 'YYYY-MM-DD') AS date_naissance,
              (SELECT max(mois) FROM cotisations c WHERE c.membre_id = m.id) AS derniere_cotisation
       FROM membres m LEFT JOIN etablissements e ON e.id = m.etablissement_id WHERE m.id = $1`,
      [req.user.mid],
    )
  ).rows[0];
  if (!r) throw httpError(404, 'Profil introuvable.');
  return r;
});

// Presence : chaque ouverture ou synchronisation de l'application
// signale l'activite du membre. Sans ce signal, le serveur ne saurait
// pas qui est en ligne, car il n'y a ni WebSocket ni notification poussee.
app.post('/moi/activite', { preHandler: membreG }, async (req) => {
  await q('UPDATE membres SET derniere_activite = now() WHERE id = $1', [req.user.mid ?? null]);
  return { ok: true };
});

// Photo de profil du membre, 28 oct. 2026 : avant, la photo
// n'existait que sur le téléphone, dans un chemin local, donc elle
// disparaissait à la déconnexion, et la déconnexion efface le
// profil local. Ici la photo est gardée côté serveur, dans la base,
// pas dans un fichier du serveur, car le disque Render s'efface à
// chaque redéploiement. À la connexion, /moi renvoie la photo, et
// l'application l'affiche au même moment que le compte. Taille
// limitée : la photo est réduite côté application avant l'envoi,
// et le serveur refuse toute image de plus de 700 Ko décodée, ou
// qui n'est pas JPEG, PNG ou WebP, d'après ses premiers octets.
app.post('/moi/photo', { preHandler: membreG }, async (req) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const photo = body.photo;
  if (photo === null || photo === '') {
    await q('UPDATE membres SET photo_donnees = NULL WHERE id = $1', [req.user.mid]);
    return { ok: true, photo: null };
  }
  if (typeof photo !== 'string') throw httpError(400, 'Photo invalide.');
  const m = /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=\r\n]+)$/.exec(photo);
  if (!m) throw httpError(400, 'Photo invalide : image JPEG, PNG ou WebP attendue.');
  let bytes;
  try {
    bytes = Buffer.from(m[2], 'base64');
  } catch {
    throw httpError(400, 'Photo invalide.');
  }
  if (bytes.length === 0 || bytes.length > 700 * 1024) throw httpError(413, 'Photo trop volumineuse.');
  const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8;
  const isPng = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  const isWebp = bytes.length > 11 && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
  if (!isJpeg && !isPng && !isWebp) throw httpError(415, 'Type de photo non autorisé.');
  await q('UPDATE membres SET photo_donnees = $2 WHERE id = $1', [req.user.mid, photo]);
  return { ok: true, photo };
});

// Fonction du membre, 28 oct. 2026 : comme la photo, elle est
// gardée côté serveur, dans la base, pour survivre à la
// déconnexion, qui efface le profil local. Avant, elle n'existait
// que sur l'appareil, donc après déconnexion puis reconnexion,
// la carte retombait sur « Membre », sans fonction.
app.post('/moi/fonction', { preHandler: membreG }, async (req) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const fonction = body.fonction;
  if (typeof fonction !== 'string' || !FONCTIONS_MEMBRE.includes(fonction)) {
    throw httpError(400, 'Fonction invalide : choisissez une fonction dans la liste.');
  }
  await q('UPDATE membres SET fonction = $2 WHERE id = $1', [req.user.mid, fonction]);
  return { ok: true, fonction };
});

// Date de naissance du membre, 29 oct. 2026 : modifiable par le
// membre lui-même, jamais obligatoire, effaçable en envoyant null
// ou une chaîne vide. Même validation de date réelle qu'à
// l'inscription, pour refuser une date impossible.
app.post('/moi/date-naissance', { preHandler: membreG }, async (req) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const raw = body.date_naissance;
  if (raw === null || raw === '') {
    await q('UPDATE membres SET date_naissance = NULL WHERE id = $1', [req.user.mid]);
    return { ok: true, date_naissance: null };
  }
  if (typeof raw !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(raw)) throw httpError(400, 'Date de naissance invalide.');
  const [y, mo, d] = raw.split('-').map(Number);
  const dt = new Date(Date.UTC(y, mo - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) throw httpError(400, 'Date de naissance invalide.');
  await q('UPDATE membres SET date_naissance = $2 WHERE id = $1', [req.user.mid, raw]);
  return { ok: true, date_naissance: raw };
});

// Changement forcé, 29 oct. 2026 : seuls les membres connectés avec
// un temporaire actif peuvent l'utiliser, et le temporaire expire
// après 24 heures. Après le changement, le temporaire disparaît et
// la session en cours continue normalement.
app.post('/moi/mot-de-passe', { preHandler: membreG }, async (req) => {
  const b = z.object({ mot_de_passe: z.string().min(8).max(128) }).parse(req.body);
  await tx(async (c) => {
    const u = (
      await c.query('SELECT mot_de_passe_temporaire_expire_le FROM utilisateurs WHERE id = $1', [req.user.sub])
    ).rows[0];
    if (!u?.mot_de_passe_temporaire_expire_le) throw httpError(403, 'Aucun changement de mot de passe requis.');
    if (new Date(u.mot_de_passe_temporaire_expire_le) <= new Date()) {
      throw httpError(401, 'Ce mot de passe temporaire a expiré. Contacte la structure pour en recevoir un nouveau.');
    }
    const hash = await argon2.hash(b.mot_de_passe, { type: argon2.argon2id });
    await c.query('UPDATE utilisateurs SET mot_de_passe_hash = $2, mot_de_passe_temporaire_expire_le = NULL WHERE id = $1', [req.user.sub, hash]);
    await audit(c, req, 'motdepasse.change', 'membres', req.user.mid);
  });
  return { ok: true };
});

app.post('/evenements/:id/inscription', { preHandler: membreG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const ev = (await q('SELECT id, nom, est_kairos, tarif_fcfa FROM evenements WHERE id = $1 AND publie', [id])).rows[0];
  if (!ev) throw httpError(404, 'Camp introuvable.');
  // Paiement du camp en 6 fois, 31 oct. 2026 : une inscription
  // créée pour un camp au tarif supérieur à 0 exige les 6
  // versements, et son pass reste masqué jusque-là. Une inscription
  // créée avant ce déploiement garde versements_requis à faux,
  // donc son pass reste visible comme avant, sans retrait.
  const r = (
    await q(
      `WITH ins AS (
         INSERT INTO inscriptions (evenement_id, membre_id, versements_requis) VALUES ($1,$2,$3)
         ON CONFLICT (evenement_id, membre_id) DO NOTHING RETURNING code_pass, inscrit_le, versements_requis)
       SELECT code_pass, inscrit_le, versements_requis, true AS nouveau FROM ins
       UNION ALL SELECT code_pass, inscrit_le, versements_requis, false AS nouveau FROM inscriptions WHERE evenement_id = $1 AND membre_id = $2 LIMIT 1`,
      [id, req.user.mid, (ev.tarif_fcfa ?? 0) > 0],
    )
  ).rows[0];
  const m = (await q('SELECT nom_complet, matricule FROM membres WHERE id = $1', [req.user.mid])).rows[0];
  let versements = null;
  if (r.versements_requis) {
    const prog = await progressionCamp(req.user.mid, id);
    versements = { ...prog, requis: true };
    // Plan rappelé dans la cloche à l'inscription, puis après
    // chaque versement validé, et chaque mois par l'entretien de
    // la cloche tant que le solde reste (voir
    // entretenirRappelsCamp).
    if (r.nouveau) {
      const tarif = ev.tarif_fcfa ?? 0;
      await notifierMembre(
        req.user.mid,
        'camp_rappel',
        'Paiement du camp en 6 fois',
        `Bonjour {prenom}, votre inscription à ${ev.nom} est enregistrée. Votre pass sera généré quand les 6 versements seront payés, soit ${fcfaTexte(montantVersement(tarif, 1))} par versement, ${fcfaTexte(tarif)} au total. Il vous reste ${fcfaTexte(tarif)} à payer.`,
        'camp',
        id,
        'Paiement du camp en 6 fois',
        `Votre inscription à ${ev.nom} est enregistrée. Votre pass sera généré quand les 6 versements seront payés, soit ${fcfaTexte(montantVersement(tarif, 1))} par versement, ${fcfaTexte(tarif)} au total. Il vous reste ${fcfaTexte(tarif)} à payer.`,
      );
    }
  }
  // Camp National Kairos : le pass est aussi le badge (nom, matricule, QR), visible tout de suite.
  return reply.code(201).send({ evenement: ev.nom, badge: ev.est_kairos, code_pass: r.code_pass, inscrit_le: r.inscrit_le, versements, ...m });
});

app.get('/moi/inscriptions', { preHandler: membreG }, async (req) =>
  (
    await q(
      `SELECT i.code_pass, i.inscrit_le, i.versements_requis, e.id AS evenement_id, e.nom, e.date_debut, e.lieu, e.est_kairos, e.tarif_fcfa,
              (SELECT COUNT(DISTINCT numero_versement) FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = i.membre_id AND evenement_id = i.evenement_id AND type = 'camp' AND statut = 'confirme')::int AS versements_valides,
              (SELECT COALESCE(SUM(montant_fcfa), 0) FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = i.membre_id AND evenement_id = i.evenement_id AND type = 'camp' AND statut = 'confirme')::int AS montant_paye,
              (NOT i.versements_requis OR (SELECT COALESCE(SUM(montant_fcfa), 0) FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = i.membre_id AND evenement_id = i.evenement_id AND type = 'camp' AND statut = 'confirme') >= e.tarif_fcfa) AS pass_visible,
              (SELECT reference FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = i.membre_id AND evenement_id = i.evenement_id AND type = 'camp' AND statut = 'en_attente' ORDER BY cree_le DESC LIMIT 1) AS versement_en_attente_reference,
              (SELECT montant_fcfa FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = i.membre_id AND evenement_id = i.evenement_id AND type = 'camp' AND statut = 'en_attente' ORDER BY cree_le DESC LIMIT 1) AS versement_en_attente_montant,
              (SELECT numero_versement FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = i.membre_id AND evenement_id = i.evenement_id AND type = 'camp' AND statut = 'en_attente' ORDER BY cree_le DESC LIMIT 1) AS versement_en_attente_numero
       FROM inscriptions i JOIN evenements e ON e.id = i.evenement_id WHERE i.membre_id = $1 ORDER BY i.inscrit_le DESC`,
      [req.user.mid],
    )
  ).rows);

// ───────────────────────── Paiements Wave (membre) ─────────────────────────
function requireWaveLink() {
  if (!CFG.wavePayUrl) throw httpError(503, 'Le paiement Wave n\u2019est pas encore configuré par la structure.');
}

const paiementReponse = (p) => ({
  reference: p.reference,
  type: p.type,
  montant_fcfa: p.montant_fcfa,
  statut: p.statut,
  wave_url: waveUrl(CFG.wavePayUrl, p.montant_fcfa),
  message:
    p.statut === 'en_attente'
      ? 'En attente de confirmation Wave. La facture arrive après confirmation vérifiée.'
      : undefined,
});

// ───────────────────────── PayPal API : retour sur les achats ─────────────────────────
// Grâce à l'API PayPal, et non plus au seul lien de don, le serveur
// crée une commande PayPal pour une demande déjà créée, le membre
// l'approuve dans PayPal, PayPal renvoie vers le serveur, le serveur
// capture la commande, vérifie devise et montant, puis confirme la
// demande, comme pour Wave. La demande passe donc de « en attente »
// à « confirmée » avec un retour vérifié, et la facture peut suivre.
// Aucun secret n'est lu ailleurs que dans CFG, donc dans les variables
// d'environnement. Le franc CFA est arrimé à l'euro, taux fixe
// 1 EUR = 655,957 FCFA : le montant en euros est exact. Pour les
// autres devises, le taux du jour est lu sur un service public de
// taux de change, au moment de la création ; si ce service est
// injoignable, la création échoue en 503 et l'application retombe
// sur le lien de don, plutôt que d'inventer un taux.
function requirePaypal() {
  if (!CFG.paypalClientId || !CFG.paypalClientSecret) {
    throw httpError(503, 'PayPal API non configuré par la structure.');
  }
}

async function paypalToken() {
  const basic = Buffer.from(`${CFG.paypalClientId}:${CFG.paypalClientSecret}`).toString('base64');
  const res = await fetch(`${CFG.paypalApiBase}/v1/oauth2/token`, {
    method: 'POST',
    headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials',
  });
  if (!res.ok) throw httpError(502, 'PayPal : impossible d’obtenir un jeton d’accès.');
  const data = await res.json();
  if (!data.access_token) throw httpError(502, 'PayPal : jeton d’accès introuvable.');
  return data.access_token;
}

async function paypalConvertFcfa(amountFcfa, currency) {
  if (currency === 'EUR') return (amountFcfa / 655.957).toFixed(2);
  const res = await fetch('https://open.er-api.com/v6/latest/XOF', { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw httpError(503, 'Taux de change du jour injoignable, réessayez plus tard.');
  const data = await res.json();
  const rate = data?.rates?.[currency];
  if (!rate || typeof rate !== 'number' || rate <= 0) {
    throw httpError(400, 'Devise non proposée par le service de taux de change.');
  }
  return (amountFcfa * rate).toFixed(2);
}

async function paypalCall(token, path, method, body) {
  const res = await fetch(`${CFG.paypalApiBase}${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = data?.details?.[0]?.description || data?.message || 'Appel PayPal refusé.';
    throw httpError(502, `PayPal : ${detail}`);
  }
  return data;
}

// Création d'une commande PayPal pour une demande existante, en attente.
// Retourne l'URL d'approbation à ouvrir dans PayPal, et la commande
// enregistrée en base, pour que la capture puisse la retrouver.
app.post('/paiements/paypal/creer', { preHandler: membreG }, async (req, reply) => {
  requirePaypal();
  const b = z.object({ reference: z.string().min(5).max(40), devise: z.string().trim().toUpperCase().length(3) }).parse(req.body);
  const allowed = ['EUR', 'USD', 'GBP', 'CAD', 'CHF'];
  if (!allowed.includes(b.devise)) throw httpError(400, 'Devise PayPal non proposée.');
  const p = (
    await q('SELECT * FROM paiements WHERE reference = $1 AND membre_id = $2', [b.reference, req.user.mid])
  ).rows[0];
  if (!p) throw httpError(404, 'Demande introuvable.');
  if (p.statut !== 'en_attente') throw httpError(409, 'Cette demande n’est plus en attente.');
  const montantDevise = await paypalConvertFcfa(p.montant_fcfa, b.devise);
  const token = await paypalToken();
  const order = await paypalCall(token, '/v2/checkout/orders', 'POST', {
    intent: 'CAPTURE',
    purchase_units: [
      {
        reference_id: p.reference,
        description: `CONNEXION PROPHETIQUE - ${p.type} ${p.reference}`,
        amount: { currency_code: b.devise, value: montantDevise },
      },
    ],
    application_context: {
      return_url: `${CFG.publicBaseUrl}/paiements/paypal/retour`,
      cancel_url: `${CFG.publicBaseUrl}/paiements/paypal/annule`,
    },
  });
  const approve = (order.links || []).find((l) => l.rel === 'approve');
  if (!order.id || !approve?.href) throw httpError(502, 'PayPal : URL d’approbation introuvable.');
  await q(
    `INSERT INTO paypal_commandes (paiement_id, commande_id, devise, montant_devise, statut)
     VALUES ($1,$2,$3,$4,'creee')
     ON CONFLICT (commande_id) DO NOTHING`,
    [p.id, order.id, b.devise, montantDevise],
  );
  return reply.code(201).send({
    reference: p.reference,
    montant_fcfa: p.montant_fcfa,
    devise: b.devise,
    montant_devise: montantDevise,
    commande_id: order.id,
    url_approbation: approve.href,
  });
});

// Retour PayPal après approbation : capture, vérification, confirmation.
// Ce retour ne confirme jamais sur le seul paramètre token : il capture
// chez PayPal, puis compare devise et montant capturés avec ceux
// enregistrés à la création, avant toute confirmation.
app.get('/paiements/paypal/retour', async (req, reply) => {
  const token = String(req.query.token || '');
  if (!token) return reply.code(400).type('text/html').send('<h1>Commande PayPal introuvable.</h1><p>Retournez dans l’application et réessayez.</p>');
  try {
    requirePaypal();
    const cmd = (
      await q('SELECT pc.*, p.reference, p.statut, p.montant_fcfa FROM paypal_commandes pc JOIN paiements p ON p.id = pc.paiement_id WHERE pc.commande_id = $1', [token])
    ).rows[0];
    if (!cmd) return reply.code(404).type('text/html').send('<h1>Commande PayPal introuvable.</h1><p>Retournez dans l’application et réessayez.</p>');
    if (cmd.statut === 'capturee') {
      return reply.type('text/html').send(`<h1>Paiement confirmé</h1><p>Référence ${cmd.reference} : ${cmd.montant_fcfa} FCFA, via PayPal ${cmd.devise} ${cmd.montant_devise}.</p><p>Retournez dans l’application, puis vérifiez votre paiement : il doit apparaître confirmé, avec sa facture.</p>`);
    }
    const access = await paypalToken();
    const captured = await paypalCall(access, `/v2/checkout/orders/${token}/capture`, 'POST', {});
    const unit = captured.purchase_units?.[0];
    const capture = unit?.payments?.captures?.[0];
    const capturedAmount = capture?.amount?.value;
    const capturedCurrency = capture?.amount?.currency_code;
    const completed = capture?.status === 'COMPLETED';
    if (!completed || capturedCurrency !== cmd.devise || capturedAmount !== cmd.montant_devise) {
      await q(`UPDATE paypal_commandes SET statut = 'refusee' WHERE commande_id = $1`, [token]);
      return reply.type('text/html').send(`<h1>Paiement non confirmé</h1><p>Le montant ou la devise capturés ne correspondent pas à la commande ${cmd.reference}. Retournez dans l’application, la demande reste en attente, et la structure peut la vérifier.</p>`);
    }
    const done = await tx(async (c) => {
      const paiement = await confirmPayment(c, cmd.paiement_id, 'paypal', null, token);
      if (paiement) {
        await c.query(`UPDATE paypal_commandes SET statut = 'capturee' WHERE commande_id = $1`, [token]);
      }
      return paiement;
    });
    if (done) {
      queueMicrotask(() => ensureInvoice(cmd.paiement_id).catch((e) => app.log.error(e)));
      await notifierPaiementValide(done);
    }
    return reply.type('text/html').send(`<h1>Paiement confirmé</h1><p>Référence ${cmd.reference} : ${cmd.montant_fcfa} FCFA, via PayPal ${cmd.devise} ${cmd.montant_devise}.</p><p>Retournez dans l’application, puis vérifiez votre paiement : il doit apparaître confirmé, avec sa facture.</p>`);
  } catch (e) {
    app.log.error(e);
    return reply.code(500).type('text/html').send('<h1>Paiement non confirmé</h1><p>La capture PayPal a échoué. Retournez dans l’application, la demande reste en attente.</p>');
  }
});

app.get('/paiements/paypal/annule', async (req, reply) => {
  return reply.type('text/html').send('<h1>Paiement annulé dans PayPal</h1><p>Retournez dans l’application, la demande reste en attente, vous pouvez choisir un autre moyen.</p>');
});

// Retour d'état PayPal pour une demande, consulté par l'application
// après le retour du navigateur : si le serveur a confirmé, l'app
// marque sa demande locale comme confirmée, avec facture.
app.get('/paiements/paypal/etat/:reference', { preHandler: membreG }, async (req) => {
  const { reference } = z.object({ reference: z.string().min(5).max(40) }).parse(req.params);
  const p = (
    await q('SELECT reference, type, montant_fcfa, statut FROM paiements WHERE reference = $1 AND membre_id = $2', [reference, req.user.mid])
  ).rows[0];
  if (!p) throw httpError(404, 'Demande introuvable.');
  return p;
});

app.post('/paiements/don', { preHandler: membreG }, async (req, reply) => {
  requireWaveLink();
  const b = z.object({ montant_fcfa: z.number().int().min(1).max(10_000_000) }).parse(req.body);
  const p = await tx(async (c) => {
    const r = (
      await c.query(
        "INSERT INTO paiements (reference, type, membre_id, montant_fcfa) VALUES ($1,'don',$2,$3) RETURNING *",
        [newRef('DON'), req.user.mid, b.montant_fcfa],
      )
    ).rows[0];
    await audit(c, req, 'paiement.cree', 'paiements', r.id, { type: 'don', montant: r.montant_fcfa });
    return r;
  });
  return reply.code(201).send(paiementReponse(p));
});

// Cotisation et carte, 28 oct. 2026 : comme le don, mais avec un
// type distinct, pour que l'administrateur voie exactement ce que
// le membre a payé, et ne confonde pas une cotisation ou une carte
// avec un don. Montant fixe de 1 000 FCFA, comme dans l'application,
// refusé côté serveur si le montant diffère, pour ne pas valider
// une carte ou une cotisation à un autre montant.
for (const [route, type, prefix] of [['cotisation', 'cotisation', 'COT'], ['carte', 'carte', 'CARTE']]) {
  app.post(`/paiements/${route}`, { preHandler: membreG }, async (req, reply) => {
    requireWaveLink();
    const b = z.object({ montant_fcfa: z.number().int() }).parse(req.body);
    if (b.montant_fcfa !== 1000) throw httpError(400, 'Le montant de la carte et de la cotisation est de 1 000 FCFA.');
    const p = await tx(async (c) => {
      const r = (
        await c.query(
          `INSERT INTO paiements (reference, type, membre_id, montant_fcfa) VALUES ($1,$2,$3,$4) RETURNING *`,
          [newRef(prefix), type, req.user.mid, b.montant_fcfa],
        )
      ).rows[0];
      await audit(c, req, 'paiement.cree', 'paiements', r.id, { type, montant: r.montant_fcfa });
      return r;
    });
    return reply.code(201).send(paiementReponse(p));
  });
}

app.post('/paiements/achat', { preHandler: membreG }, async (req, reply) => {
  requireWaveLink();
  const b = z.object({ livre_ids: z.array(z.string().uuid()).min(1).max(20) }).parse(req.body);
  const ids = [...new Set(b.livre_ids)];
  const p = await tx(async (c) => {
    const livres = (await c.query('SELECT id, titre, auteur, prix_fcfa FROM livres WHERE publie AND id = ANY($1)', [ids])).rows;
    if (livres.length !== ids.length) throw httpError(404, 'Un des livres demandés est introuvable.');
    const deja = (await c.query('SELECT livre_id FROM v_acces_livres WHERE membre_id = $1 AND livre_id = ANY($2)', [req.user.mid, ids])).rows;
    if (deja.length) throw httpError(409, 'Un des livres est déjà acheté.');
    const total = livres.reduce((s, l) => s + l.prix_fcfa, 0); // montant calculé côté serveur
    const r = (
      await c.query(
        "INSERT INTO paiements (reference, type, membre_id, montant_fcfa) VALUES ($1,'achat',$2,$3) RETURNING *",
        [newRef('ACH'), req.user.mid, total],
      )
    ).rows[0];
    for (const l of livres) {
      await c.query(
        'INSERT INTO achats_lignes (paiement_id, livre_id, titre_copie, auteur_copie, prix_copie_fcfa) VALUES ($1,$2,$3,$4,$5)',
        [r.id, l.id, l.titre, l.auteur, l.prix_fcfa],
      );
    }
    await audit(c, req, 'paiement.cree', 'paiements', r.id, { type: 'achat', montant: total, livres: ids });
    return r;
  });
  return reply.code(201).send(paiementReponse(p));
});

// Versement d'un camp, 31 oct. 2026 : le membre paie le versement
// suivant de son plan, jamais un montant choisi. Le serveur calcule
// le numéro et le montant exact depuis le tarif du camp et les
// versements déjà validés. Une demande en attente pour ce versement
// est renvoyée telle quelle, sans doublon. Comme toute demande, elle
// reste en attente tant que la structure ne l'a pas validée après
// contrôle de son compte, jamais payée sur seul lien ou numéro.
app.post('/paiements/camp', { preHandler: membreG }, async (req, reply) => {
  const b = z.object({ evenement_id: z.string().uuid() }).parse(req.body);
  const ev = (await q('SELECT id, nom, tarif_fcfa FROM evenements WHERE id = $1 AND publie', [b.evenement_id])).rows[0];
  if (!ev) throw httpError(404, 'Camp introuvable.');
  const tarif = ev.tarif_fcfa ?? 0;
  if (tarif <= 0) throw httpError(400, 'Ce camp ne demande pas de versements.');
  const inscrit = (await q('SELECT inscrit_le FROM inscriptions WHERE evenement_id = $1 AND membre_id = $2', [b.evenement_id, req.user.mid])).rows[0];
  if (!inscrit) throw httpError(409, 'Inscrivez-vous d’abord à ce camp avant de payer un versement.');
  const p = await tx(async (c) => {
    const valides = (await c.query(
      `SELECT COUNT(DISTINCT numero_versement)::int AS n FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = $1 AND evenement_id = $2 AND type = 'camp' AND statut = 'confirme'`,
      [req.user.mid, b.evenement_id],
    )).rows[0]?.n ?? 0;
    const paye = (await c.query(
      `SELECT COALESCE(SUM(montant_fcfa), 0)::int AS s FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = $1 AND evenement_id = $2 AND type = 'camp' AND statut = 'confirme'`,
      [req.user.mid, b.evenement_id],
    )).rows[0]?.s ?? 0;
    if (paye >= tarif) throw httpError(409, 'Ce camp est déjà entièrement payé.');
    const suivant = valides + 1;
    const deja = (await c.query(
      `SELECT * FROM paiements WHERE membre_id = $1 AND evenement_id = $2 AND type = 'camp' AND numero_versement = $3 AND statut = 'en_attente' ORDER BY cree_le DESC LIMIT 1`,
      [req.user.mid, b.evenement_id, suivant],
    )).rows[0];
    if (deja) return { row: deja, cree: false };
    const montant = montantVersement(tarif, suivant);
    // Mois cible, 31 oct. 2026, préparation de l'automatique sans
    // activation : le versement numéro N vise le N-ième mois à
    // compter du mois d'inscription. Abidjan est à UTC+0 toute
    // l'année, le mois UTC est donc le mois local.
    const base = inscrit.inscrit_le ? new Date(inscrit.inscrit_le) : new Date();
    const cible = new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth() + (suivant - 1), 1));
    const moisCible = Number.isNaN(cible.getTime()) ? null : cible.toISOString().slice(0, 10);
    const r = (await c.query(
      `INSERT INTO paiements (reference, type, membre_id, montant_fcfa, evenement_id, numero_versement, mois_cible) VALUES ($1,'camp',$2,$3,$4,$5,$6) RETURNING *`,
      [newRef('CAMP'), req.user.mid, montant, b.evenement_id, suivant, moisCible],
    )).rows[0];
    await audit(c, req, 'paiement.cree', 'paiements', r.id, { type: 'camp', montant, evenement_id: b.evenement_id, numero_versement: suivant, mois_cible: moisCible });
    return { row: r, cree: true };
  });
  const rep = paiementReponse(p.row);
  rep.evenement_id = b.evenement_id;
  rep.numero_versement = p.row.numero_versement;
  rep.camp_nom = ev.nom;
  rep.mois_cible = p.row.mois_cible ?? null;
  return reply.code(p.cree ? 201 : 200).send(rep);
});

// Paiement du camp en une fois, 31 oct. 2026 : le solde complet en
// une seule demande ordinaire du circuit existant, sans numero de
// versement. Le pass se debloque a la validation, comme au 6e
// versement, parce que la visibilite se mesure au montant paye.
app.post('/paiements/camp/total', { preHandler: membreG }, async (req, reply) => {
  const b = z.object({ evenement_id: z.string().uuid() }).parse(req.body);
  const ev = (await q('SELECT id, nom, tarif_fcfa FROM evenements WHERE id = $1 AND publie', [b.evenement_id])).rows[0];
  if (!ev) throw httpError(404, 'Camp introuvable.');
  const tarif = ev.tarif_fcfa ?? 0;
  if (tarif <= 0) throw httpError(400, 'Ce camp ne demande pas de paiement en une fois.');
  const inscrit = (await q('SELECT inscrit_le, versements_requis FROM inscriptions WHERE evenement_id = $1 AND membre_id = $2', [b.evenement_id, req.user.mid])).rows[0];
  if (!inscrit) throw httpError(409, 'Inscrivez-vous d’abord à ce camp avant de payer.');
  if (!inscrit.versements_requis) throw httpError(409, 'Ce camp est déjà accessible sans paiement.');
  const p = await tx(async (c) => {
    const paye = (await c.query(
      `SELECT COALESCE(SUM(montant_fcfa), 0)::int AS s FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = $1 AND evenement_id = $2 AND type = 'camp' AND statut = 'confirme'`,
      [req.user.mid, b.evenement_id],
    )).rows[0]?.s ?? 0;
    if (paye >= tarif) throw httpError(409, 'Ce camp est déjà entièrement payé.');
    const enAttente = (await c.query(
      `SELECT * FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = $1 AND evenement_id = $2 AND type = 'camp' AND statut = 'en_attente' ORDER BY cree_le DESC LIMIT 1`,
      [req.user.mid, b.evenement_id],
    )).rows[0];
    if (enAttente) {
      if (enAttente.numero_versement == null) return { row: enAttente, cree: false };
      throw httpError(409, 'Un versement est déjà en attente de validation pour ce camp.');
    }
    const montant = tarif - paye;
    const r = (await c.query(
      `INSERT INTO paiements (reference, type, membre_id, montant_fcfa, evenement_id) VALUES ($1,'camp',$2,$3,$4) RETURNING *`,
      [newRef('CAMP'), req.user.mid, montant, b.evenement_id],
    )).rows[0];
    await audit(c, req, 'paiement.cree', 'paiements', r.id, { type: 'camp', montant, evenement_id: b.evenement_id, total: true });
    return { row: r, cree: true };
  });
  const rep = paiementReponse(p.row);
  rep.evenement_id = b.evenement_id;
  rep.camp_nom = ev.nom;
  rep.total = true;
  return reply.code(p.cree ? 201 : 200).send(rep);
});

// Don de camp ou de retraite, 31 oct. 2026 : celui qui offre paie,
// le beneficiaire recoit le pass. Le beneficiaire est resolu en
// interne par son numero ou son e-mail, sans endpoint public de
// recherche, et la reponse ne dit que si le don est attache tout
// de suite ou en attente, jamais de matricule ni d'etablissement.
// Un don couvre le reste a payer du beneficiaire deja inscrit, le
// tarif complet sinon. Un don pour une personne deja entierement
// payee, ou deja en acces libre, est refuse clairement.
app.post('/dons/camp', { preHandler: membreG }, async (req, reply) => {
  const b = z.object({
    evenement_id: z.string().uuid(),
    beneficiaire_nom: z.string().trim().min(2).max(120),
    beneficiaire_contact: z.string().trim().min(6).max(120),
    message: z.string().trim().max(500).optional(),
  }).refine((v) => !v.beneficiaire_contact.includes('@') || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.beneficiaire_contact), { message: 'E-mail invalide.' }).parse(req.body);
  const ev = (await q('SELECT id, nom, tarif_fcfa FROM evenements WHERE id = $1 AND publie', [b.evenement_id])).rows[0];
  if (!ev) throw httpError(404, 'Camp introuvable.');
  const tarif = ev.tarif_fcfa ?? 0;
  if (tarif <= 0) throw httpError(400, 'Ce camp ne peut pas être offert, son tarif n’est pas fixé.');
  const contact = b.beneficiaire_contact.includes('@') ? b.beneficiaire_contact.trim().toLowerCase() : normalizePhoneServer(b.beneficiaire_contact);
  const beneficiaireId = await resoudreBeneficiaire(b.beneficiaire_contact);
  if (beneficiaireId && beneficiaireId === req.user.mid) throw httpError(409, 'Vous ne pouvez pas vous offrir un camp à vous-même, utilisez le paiement en une fois.');
  const p = await tx(async (c) => {
    let paye = 0;
    if (beneficiaireId) {
      const insc = (await c.query('SELECT versements_requis FROM inscriptions WHERE evenement_id = $1 AND membre_id = $2', [b.evenement_id, beneficiaireId])).rows[0];
      if (insc && !insc.versements_requis) throw httpError(409, 'Cette personne a déjà accès à ce camp.');
      paye = (await c.query(
        `SELECT COALESCE(SUM(montant_fcfa), 0)::int AS s FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = $1 AND evenement_id = $2 AND type = 'camp' AND statut = 'confirme'`,
        [beneficiaireId, b.evenement_id],
      )).rows[0]?.s ?? 0;
      if (paye >= tarif) throw httpError(409, 'Ce camp est déjà entièrement payé pour cette personne.');
    }
    const deja = (await c.query(
      `SELECT * FROM paiements WHERE membre_id = $1 AND evenement_id = $2 AND type = 'camp' AND beneficiaire_contact = $3 AND statut = 'en_attente' ORDER BY cree_le DESC LIMIT 1`,
      [req.user.mid, b.evenement_id, contact],
    )).rows[0];
    if (deja) return { row: deja, cree: false, attache: !!beneficiaireId };
    const montant = beneficiaireId ? Math.max(1, tarif - paye) : tarif;
    const r = (await c.query(
      `INSERT INTO paiements (reference, type, membre_id, montant_fcfa, evenement_id, beneficiaire_id, beneficiaire_nom, beneficiaire_contact, message_don) VALUES ($1,'camp',$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [newRef('CAMP'), req.user.mid, montant, b.evenement_id, beneficiaireId ?? null, b.beneficiaire_nom, contact, b.message ?? null],
    )).rows[0];
    await audit(c, req, 'don.camp.cree', 'paiements', r.id, { type: 'camp', montant, evenement_id: b.evenement_id, beneficiaire_id: beneficiaireId ?? null, beneficiaire_contact: contact });
    return { row: r, cree: true, attache: !!beneficiaireId };
  });
  const rep = paiementReponse(p.row);
  rep.evenement_id = b.evenement_id;
  rep.camp_nom = ev.nom;
  rep.beneficiaire_nom = b.beneficiaire_nom;
  rep.attache = p.attache;
  return reply.code(p.cree ? 201 : 200).send(rep);
});

// Le membre déclare l'identifiant de transaction Wave de son reçu.
// Un identifiant déjà utilisé est refusé dès la déclaration (contrainte UNIQUE).
// Cela ne confirme RIEN : seule la correspondance avec le webhook signé, ou la structure, confirme.
app.post('/paiements/:reference/declarer', { preHandler: membreG }, async (req) => {
  const { reference } = z.object({ reference: z.string().min(5).max(40) }).parse(req.params);
  const b = z.object({ wave_transaction_id: z.string().trim().min(6).max(64) }).parse(req.body);
  return tx(async (c) => {
    const p = (
      await c.query('SELECT * FROM paiements WHERE reference = $1 AND membre_id = $2 FOR UPDATE', [reference, req.user.mid])
    ).rows[0];
    if (!p) throw httpError(404, 'Demande introuvable.');
    if (p.statut !== 'en_attente') throw httpError(409, 'Cette demande n\u2019est plus en attente.');
    try {
      await c.query('SAVEPOINT decl');
      await c.query('UPDATE paiements SET wave_transaction_id = $1 WHERE id = $2', [b.wave_transaction_id, p.id]);
    } catch (e) {
      if (e.code === '23505') {
        await c.query('ROLLBACK TO SAVEPOINT decl');
        throw httpError(409, 'Cet identifiant de transaction a déjà été utilisé.');
      }
      throw e;
    }
    // Le webhook est peut-être déjà arrivé : on rapproche (identifiant ET montant identiques).
    const ev = (
      await c.query(
        `SELECT id, charge FROM evenements_wave
         WHERE signature_ok AND NOT traite AND charge->>'type' = 'merchant.payment_received' AND charge->'data'->>'id' = $1 LIMIT 1`,
        [b.wave_transaction_id],
      )
    ).rows[0];
    let statut = 'en_attente';
    if (ev && Number(ev.charge.data.amount) === p.montant_fcfa && ev.charge.data.currency === 'XOF') {
      const done = await confirmPayment(c, p.id, 'webhook', null, null);
      if (done) {
        statut = 'confirme';
        await c.query('UPDATE evenements_wave SET traite = true, paiement_id = $1 WHERE id = $2', [p.id, ev.id]);
        await audit(c, req, 'paiement.confirme_webhook', 'paiements', p.id, { evenement: ev.id });
      }
    } else {
      await audit(c, req, 'paiement.declare', 'paiements', p.id, { wave_transaction_id: b.wave_transaction_id });
    }
    if (statut === 'confirme') queueMicrotask(() => ensureInvoice(p.id).catch((e) => app.log.error(e)));
    // Avertissement, sans confirmation automatique : si un autre paiement
    // en attente partage ce montant, le rapprochement reste manuel, avec
    // identifiant, date et expéditeur, puis validation de la structure.
    const autres = (await c.query("SELECT montant_fcfa FROM paiements WHERE statut = 'en_attente' AND id <> $1", [p.id])).rows.map((r) => r.montant_fcfa);
    const doublon = hasDuplicatePendingAmount([...autres, p.montant_fcfa], p.montant_fcfa);
    return {
      reference: p.reference,
      statut,
      doublon_montant: doublon,
      message: doublon
        ? 'Plusieurs demandes en attente partagent ce montant : rapprochement manuel requis, jamais de confirmation sur le montant seul.'
        : undefined,
    };
  });
});

app.get('/moi/paiements', { preHandler: membreG }, async (req) =>
  (
    await q(
      `SELECT p.id, p.reference, p.type, p.montant_fcfa, p.statut, p.moyen, p.cree_le, p.confirme_le, p.refuse_le,
              p.evenement_id, p.numero_versement, p.mois_cible, ev.nom AS camp_nom,
              p.beneficiaire_id, p.beneficiaire_nom, p.message_don,
              gm.nom_complet AS donateur_nom,
              CASE WHEN p.beneficiaire_id = $1 THEN 'recu' WHEN p.beneficiaire_id IS NOT NULL THEN 'offert' ELSE NULL END AS role_don,
              cm.nom_complet AS confirme_par_nom, rm.nom_complet AS refuse_par_nom,
              COALESCE((SELECT json_agg(json_build_object('livre_id', l.livre_id, 'titre', l.titre_copie, 'auteur', l.auteur_copie, 'prix_fcfa', l.prix_copie_fcfa))
                        FROM achats_lignes l WHERE l.paiement_id = p.id), '[]') AS lignes
       FROM paiements p
       LEFT JOIN membres gm ON gm.id = p.membre_id
       LEFT JOIN membres cm ON cm.utilisateur_id = p.confirme_par
       LEFT JOIN membres rm ON rm.utilisateur_id = p.refuse_par
       LEFT JOIN evenements ev ON ev.id = p.evenement_id
       WHERE (p.membre_id = $1 OR p.beneficiaire_id = $1) ORDER BY p.cree_le DESC LIMIT 100`,
      [req.user.mid],
    )
  ).rows);

app.get('/moi/achats', { preHandler: membreG }, async (req) =>
  (
    await q(
      `SELECT l.id, l.titre, l.auteur, l.description, l.format FROM v_acces_livres a
       JOIN livres l ON l.id = a.livre_id WHERE a.membre_id = $1 ORDER BY l.titre`,
      [req.user.mid],
    )
  ).rows);

// Fichier du livre : renvoyé uniquement si l'achat est confirmé.
app.get('/livres/:id/fichier', { preHandler: membreG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const ok = (await q('SELECT peut_lire_livre($1,$2) AS ok', [req.user.mid, id])).rows[0].ok;
  if (!ok) throw httpError(403, 'Livre verrouillé : achat non confirmé.');
  const f = (
    await q('SELECT f.cle_stockage, f.type_mime_reel, l.titre FROM livres l JOIN fichiers f ON f.id = l.fichier_id WHERE l.id = $1 AND f.verifie', [id])
  ).rows[0];
  if (!f) throw httpError(404, 'La structure n\u2019a pas encore fourni le fichier de ce livre.');
  reply.header('Cache-Control', 'private, no-store');
  return sendFile(req, reply, f.cle_stockage, f.type_mime_reel, { inline: true, filename: `${f.titre}` });
});

// ───────────────────────── Confirmation et facture ─────────────────────────
// Unique point de passage vers le statut « confirmé ».
async function confirmPayment(c, id, mode, byUser, txId, moyen) {
  // Paiement du camp en 6 fois, 31 oct. 2026 : un même versement ne
  // peut jamais être validé deux fois, quel que soit le chemin de
  // confirmation (validation structure, webhook ou rapprochement).
  const cible = (await c.query(
    'SELECT type, membre_id, beneficiaire_id, beneficiaire_contact, evenement_id, numero_versement FROM paiements WHERE id = $1 AND statut = $2',
    [id, 'en_attente'],
  )).rows[0];
  if (!cible) return null;
  if (cible.type === 'camp' && cible.evenement_id && cible.numero_versement) {
    const doublon = (await c.query(
      `SELECT 1 FROM paiements WHERE membre_id = $1 AND evenement_id = $2 AND numero_versement = $3 AND statut = 'confirme' AND id <> $4`,
      [cible.membre_id, cible.evenement_id, cible.numero_versement, id],
    )).rows[0];
    if (doublon) return null;
  }
  // Don de camp, 31 oct. 2026 : un paiement sans numero (total en
  // une fois ou don) ne peut pas etre confirme deux fois pour le
  // meme beneficiaire et le meme camp, meme par deux lignes
  // differentes creees avant toute validation.
  if (cible.type === 'camp' && cible.evenement_id && !cible.numero_versement) {
    const cibleBenef = cible.beneficiaire_contact ? cible.beneficiaire_id : cible.membre_id;
    if (cibleBenef) {
      const doublonTotal = (await c.query(
        `SELECT 1 FROM paiements WHERE (CASE WHEN beneficiaire_contact IS NOT NULL THEN beneficiaire_id ELSE membre_id END) = $1 AND evenement_id = $2 AND numero_versement IS NULL AND statut = 'confirme' AND id <> $3`,
        [cibleBenef, cible.evenement_id, id],
      )).rows[0];
      if (doublonTotal) return null;
    }
  }
  const r = await c.query(
    `UPDATE paiements SET statut = 'confirme', mode_confirmation = $2, confirme_le = now(), confirme_par = $3,
            wave_transaction_id = COALESCE($4, wave_transaction_id),
            moyen = COALESCE($5, moyen)
     WHERE id = $1 AND statut = 'en_attente' RETURNING *`,
    [id, mode, byUser, txId ?? null, moyen ?? null],
  );
  return r.rows[0] ?? null;
}

function writeInvoicePdf(file, p, lignes) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const out = fs.createWriteStream(file);
    out.on('finish', resolve);
    out.on('error', reject);
    doc.pipe(out);
    const f = (n) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA`;
    doc.fillColor('#0B1F3A').fontSize(22).text('Connexion Prophétique');
    doc.fontSize(10).fillColor('#55607A').text('Former pour mieux servir');
    doc.moveDown(1.5).fillColor('#0B1F3A').fontSize(16).text(`Facture F-${p.reference}`);
    doc.fontSize(10).fillColor('#000000')
      .text(`Date : ${new Date(p.confirme_le).toLocaleDateString('fr-FR')}`)
      .text(`Client : ${p.nom_complet} (${p.matricule})`)
      .text(`Paiement : ${p.mode_confirmation === 'paypal' ? 'PayPal' : 'Wave'}, confirmé`);
    doc.moveDown();
    if (lignes.length === 0) {
      doc.fontSize(11).text(p.type === 'don' ? 'Contribution (don)' : p.type === 'carte' ? 'Carte de membre' : p.type === 'cotisation' ? 'Cotisation mensuelle' : p.type === 'camp' ? (p.beneficiaire_nom ? `Don de camp${p.camp_nom ? `, ${p.camp_nom}` : ''}, pour ${p.beneficiaire_nom}` : p.numero_versement ? `Versement du camp${p.camp_nom ? `, ${p.camp_nom}` : ''}, versement ${p.numero_versement} sur 6` : `Paiement du camp en une fois${p.camp_nom ? `, ${p.camp_nom}` : ''}`) : 'Paiement');
    } else {
      for (const l of lignes) doc.fontSize(11).text(`${l.titre_copie} — ${l.auteur_copie}      ${f(l.prix_copie_fcfa)}`);
    }
    doc.moveDown().fontSize(13).text(`Total payé : ${f(p.montant_fcfa)}`);
    doc.end();
  });
}

// Idempotente : une seule facture par paiement, jamais avant confirmation.
async function ensureInvoice(paiementId) {
  if ((await q('SELECT 1 FROM factures WHERE paiement_id = $1', [paiementId])).rows[0]) return;
  const p = (
    await q(
      `SELECT p.*, m.nom_complet, m.matricule, ev.nom AS camp_nom FROM paiements p LEFT JOIN membres m ON m.id = p.membre_id
       LEFT JOIN evenements ev ON ev.id = p.evenement_id
       WHERE p.id = $1 AND p.statut = 'confirme'`,
      [paiementId],
    )
  ).rows[0];
  if (!p) return;
  const lignes = (await q('SELECT titre_copie, auteur_copie, prix_copie_fcfa FROM achats_lignes WHERE paiement_id = $1', [paiementId])).rows;
  const key = `factures/${p.reference}.pdf`;
  const file = path.join(CFG.uploadDir, key);
  await fsp.mkdir(path.dirname(file), { recursive: true });
  await writeInvoicePdf(file, p, lignes);
  const st = await fsp.stat(file);
  const hash = sha256(await fsp.readFile(file));
  await tx(async (c) => {
    const f = (
      await c.query(
        `INSERT INTO fichiers (cle_stockage, nom_original, type_mime_reel, taille_octets, sha256, verifie)
         VALUES ($1,$2,'application/pdf',$3,$4,true)
         ON CONFLICT (cle_stockage) DO UPDATE SET sha256 = EXCLUDED.sha256 RETURNING id`,
        [key, `${p.reference}.pdf`, st.size, hash],
      )
    ).rows[0];
    await c.query('INSERT INTO factures (numero, paiement_id, fichier_id) VALUES ($1,$2,$3) ON CONFLICT (paiement_id) DO NOTHING', [
      `F-${p.reference}`,
      p.id,
      f.id,
    ]);
  });
}

app.get('/moi/paiements/:reference/facture', { preHandler: membreG }, async (req, reply) => {
  const { reference } = z.object({ reference: z.string().min(5).max(40) }).parse(req.params);
  const p = (await q('SELECT id, statut FROM paiements WHERE reference = $1 AND membre_id = $2', [reference, req.user.mid])).rows[0];
  if (!p) throw httpError(404, 'Demande introuvable.');
  if (p.statut !== 'confirme') throw httpError(409, 'Aucune facture avant la confirmation du paiement.');
  await ensureInvoice(p.id);
  const f = (
    await q('SELECT fi.cle_stockage, fa.numero FROM factures fa JOIN fichiers fi ON fi.id = fa.fichier_id WHERE fa.paiement_id = $1', [p.id])
  ).rows[0];
  if (!f) throw httpError(404, 'Facture indisponible.');
  reply.header('Cache-Control', 'private, no-store');
  return sendFile(req, reply, f.cle_stockage, 'application/pdf', { inline: false, filename: `${f.numero}.pdf` });
});

// ───────────────────────── Webhook Wave ─────────────────────────

app.post('/webhooks/wave', { config: { rateLimit: { max: 300, timeWindow: '1 minute' } } }, async (req, reply) => {
  if (!CFG.waveWebhookSecret) return reply.code(503).send({ erreur: 'Webhook non configuré.' });
  if (CFG.waveEnforceIp && !WAVE_IPS.includes(String(req.ip).replace(/^::ffff:/, ''))) {
    return reply.code(403).send({ erreur: 'Origine non autorisée.' });
  }
  if (!verifyWaveSignature(req.headers['wave-signature'], req.rawBody, CFG.waveWebhookSecret)) {
    return reply.code(401).send({ erreur: 'Signature invalide.' });
  }
  const ev = req.body;
  if (!ev || typeof ev.id !== 'string' || typeof ev.type !== 'string') return reply.code(400).send({ erreur: 'Événement invalide.' });

  const confirmedId = await tx(async (c) => {
    // Idempotence : Wave peut renvoyer le même événement plusieurs fois.
    const ins = (
      await c.query(
        'INSERT INTO evenements_wave (evenement_ext, signature_ok, charge) VALUES ($1, true, $2) ON CONFLICT (evenement_ext) DO NOTHING RETURNING id',
        [ev.id, JSON.stringify(ev)],
      )
    ).rows[0];
    if (!ins) return null;

    let paiement = null;
    const d = ev.data ?? {};
    const amount = Number(d.amount);

    if (ev.type === 'merchant.payment_received' && d.currency === 'XOF' && Number.isInteger(amount)) {
      // Rapprochement strict : identifiant de transaction déclaré par le membre ET même montant.
      const p = (
        await c.query(
          "SELECT id FROM paiements WHERE wave_transaction_id = $1 AND statut = 'en_attente' AND montant_fcfa = $2 FOR UPDATE",
          [d.id, amount],
        )
      ).rows[0];
      if (p) paiement = await confirmPayment(c, p.id, 'webhook', null, null);
    } else if (ev.type === 'checkout.session.completed' && d.payment_status === 'succeeded' && d.currency === 'XOF' && d.client_reference) {
      // Utilisable si la structure passe plus tard par l'API Checkout (client_reference = notre référence).
      const p = (
        await c.query(
          "SELECT id FROM paiements WHERE reference = $1 AND statut = 'en_attente' AND montant_fcfa = $2 FOR UPDATE",
          [d.client_reference, amount],
        )
      ).rows[0];
      const used = d.transaction_id
        ? (await c.query('SELECT 1 FROM paiements WHERE wave_transaction_id = $1', [d.transaction_id])).rows[0]
        : null;
      if (p && !used) paiement = await confirmPayment(c, p.id, 'webhook', null, d.transaction_id ?? null);
    } else if (ev.type === 'test.test_event') {
      await c.query('UPDATE evenements_wave SET traite = true WHERE id = $1', [ins.id]);
    }

    if (paiement) {
      await c.query('UPDATE evenements_wave SET traite = true, paiement_id = $1 WHERE id = $2', [paiement.id, ins.id]);
      await audit(c, null, 'paiement.confirme_webhook', 'paiements', paiement.id, { evenement: ev.id });
      return paiement.id;
    }
    // Sinon l'événement reste « non rapproché » : la structure le traite depuis son espace.
    return null;
  });

  if (confirmedId) {
    ensureInvoice(confirmedId).catch((e) => app.log.error(e));
    const p = (await q('SELECT id, membre_id, type, montant_fcfa FROM paiements WHERE id = $1', [confirmedId])).rows[0];
    await notifierPaiementValide(p);
  }
  return { ok: true }; // 2xx rapide, sinon Wave retente
});

// ───────────────────────── Quiz Bible ─────────────────────────
// Pas de répétition tant que toutes les questions n'ont pas été passées (cycles).
app.get('/quiz/prochaine', { preHandler: membreG }, async (req) => {
  const { n } = z.object({ n: z.coerce.number().int().min(1).max(20).default(5) }).parse(req.query);
  const cur = (await q('SELECT COALESCE(max(cycle),1) AS c FROM quiz_vus WHERE membre_id = $1', [req.user.mid])).rows[0].c;
  const pick = (cycle) =>
    q(
      `SELECT qq.id, qq.enonce, qp.nom AS personnage, qp.testament FROM quiz_questions qq
       JOIN quiz_personnages qp ON qp.id = qq.personnage_id
       WHERE qq.actif AND NOT EXISTS (SELECT 1 FROM quiz_vus v WHERE v.membre_id = $1 AND v.question_id = qq.id AND v.cycle = $2)
       ORDER BY random() LIMIT $3`,
      [req.user.mid, cycle, n],
    );
  let r = await pick(cur);
  if (r.rows.length === 0) r = await pick(cur + 1); // tout est passé : nouveau cycle
  const ids = r.rows.map((x) => x.id);
  const choix = ids.length
    ? (await q('SELECT id, question_id, position, libelle FROM quiz_choix WHERE question_id = ANY($1) ORDER BY position', [ids])).rows
    : [];
  // La bonne réponse n'est jamais envoyée avant que le membre ait répondu.
  return r.rows.map((x) => ({ ...x, choix: choix.filter((c) => c.question_id === x.id).map(({ id, position, libelle }) => ({ id, position, libelle })) }));
});

app.post('/quiz/repondre', { preHandler: membreG }, async (req) => {
  const b = z.object({ question_id: z.string().uuid(), choix_id: z.string().uuid() }).parse(req.body);
  return tx(async (c) => {
    const bonne = (
      await c.query(
        `SELECT ch.id AS bonne_id, qq.reference_verset, qq.explication FROM quiz_choix ch
         JOIN quiz_questions qq ON qq.id = ch.question_id WHERE ch.question_id = $1 AND ch.est_correct`,
        [b.question_id],
      )
    ).rows[0];
    if (!bonne) throw httpError(404, 'Question introuvable.');
    const cur = (await c.query('SELECT COALESCE(max(cycle),1) AS c FROM quiz_vus WHERE membre_id = $1', [req.user.mid])).rows[0].c;
    const dejaVue = (await c.query('SELECT 1 FROM quiz_vus WHERE membre_id=$1 AND question_id=$2 AND cycle=$3', [req.user.mid, b.question_id, cur])).rows[0];
    await c.query('INSERT INTO quiz_vus (membre_id, question_id, cycle) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING', [
      req.user.mid,
      b.question_id,
      dejaVue ? cur + 1 : cur,
    ]);
    return {
      correct: bonne.bonne_id === b.choix_id,
      bonne_reponse_id: bonne.bonne_id,
      reference: bonne.reference_verset,
      explication: bonne.explication,
    };
  });
});

// ───────────────────────── Défi quiz hebdomadaire ─────────────────────────
// Défi entre établissements, 31 oct. 2026 : une seule participation
// comptée par membre et par semaine, du lundi 00 h 00 au dimanche
// 23 h 59, heure d'Abidjan (UTC+0 toute l'année, donc la semaine UTC
// est la semaine locale). La première partie terminée de la semaine
// compte, les suivantes restent du jeu libre. Les scores sont déclarés
// par le client en fin de partie, le contenu du quiz étant local ;
// le serveur garantit une seule participation par semaine et calcule
// les moyennes, il ne corrige pas les réponses lui-même.
function lundiSemaine(d = new Date()) {
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const decalage = (t.getUTCDay() + 6) % 7; // lundi = 0
  t.setUTCDate(t.getUTCDate() - decalage);
  return t.toISOString().slice(0, 10);
}

app.post('/defi/participer', { preHandler: membreG }, async (req) => {
  const b = z.object({ score: z.number().int().min(0), total: z.number().int().min(1).max(50) }).parse(req.body);
  if (b.score > b.total) throw httpError(400, 'Score invalide.');
  const semaine = lundiSemaine();
  const r = await q(
    `INSERT INTO quiz_defi (membre_id, semaine, score, total) VALUES ($1,$2,$3,$4)
     ON CONFLICT (membre_id, semaine) DO NOTHING RETURNING *`,
    [req.user.mid, semaine, b.score, b.total],
  );
  const ligne =
    r.rows[0] ?? (await q('SELECT * FROM quiz_defi WHERE membre_id = $1 AND semaine = $2', [req.user.mid, semaine])).rows[0];
  return { semaine, score: ligne.score, total: ligne.total, joue_le: ligne.joue_le, comptee: r.rows.length > 0, deja_comptee: r.rows.length === 0 };
});

app.get('/defi/moi', { preHandler: membreG }, async (req) => {
  const semaine = lundiSemaine();
  const ligne = (await q('SELECT * FROM quiz_defi WHERE membre_id = $1 AND semaine = $2', [req.user.mid, semaine])).rows[0];
  return { semaine, participation: ligne ?? null };
});

app.get('/defi/classement', { preHandler: membreG }, async (req) => {
  const semaine = lundiSemaine();
  const [classement, moi] = await Promise.all([
    q(
      `SELECT e.id AS etablissement_id, e.nom AS etablissement_nom,
              ROUND(AVG(d.score)::numeric, 2) AS moyenne,
              COUNT(*)::int AS participants
       FROM quiz_defi d
       JOIN membres m ON m.id = d.membre_id
       JOIN etablissements e ON e.id = m.etablissement_id
       WHERE d.semaine = $1
       GROUP BY e.id, e.nom
       ORDER BY moyenne DESC, participants DESC, e.nom ASC`,
      [semaine],
    ),
    q(
      `SELECT m.etablissement_id, e.nom AS etablissement_nom, d.score, d.total, d.joue_le
       FROM membres m
       LEFT JOIN etablissements e ON e.id = m.etablissement_id
       LEFT JOIN quiz_defi d ON d.membre_id = m.id AND d.semaine = $2
       WHERE m.id = $1`,
      [req.user.mid, semaine],
    ),
  ]);
  const m = moi.rows[0];
  return {
    semaine,
    classement: classement.rows,
    membre: {
      etablissement_id: m?.etablissement_id ?? null,
      etablissement_nom: m?.etablissement_nom ?? null,
      score: m?.score ?? null,
      total: m?.total ?? null,
      joue_le: m?.joue_le ?? null,
    },
  };
});

// ───────────────────────── Espace structure : paiements ─────────────────────────
// Montants en attente présents plus d'une fois : à rapprocher manuellement.
app.get('/admin/paiements/doublons', { preHandler: adminG }, async () =>
  (
    await q(
      `SELECT montant_fcfa, count(*) AS nombre, json_agg(json_build_object('reference', reference, 'nom', m.nom_complet, 'matricule', m.matricule, 'cree_le', p.cree_le) ORDER BY p.cree_le) AS demandes
       FROM paiements p LEFT JOIN membres m ON m.id = p.membre_id
       WHERE p.statut = 'en_attente' GROUP BY montant_fcfa HAVING count(*) > 1 ORDER BY montant_fcfa`,
    )
  ).rows);

app.get('/admin/paiements', { preHandler: guard('admin_general', 'admin_etablissement') }, async (req) => {
  const { statut, matricule, type, etablissement_id, debut, fin } = z.object({
    statut: z.enum(['en_attente', 'confirme', 'refuse', 'annule']).optional(),
    matricule: z.string().max(40).optional(),
    type: z.enum(['don', 'achat', 'carte', 'cotisation', 'camp']).optional(),
    etablissement_id: z.string().uuid().optional(),
    debut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    fin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  }).parse(req.query);
  // Un administrateur d'établissement qui demanderait un autre
  // établissement est refusé proprement, jamais filtré en silence.
  if (req.user.role === 'admin_etablissement' && etablissement_id && etablissement_id !== req.user.eid) throw httpError(403, 'Accès refusé.');
  // Périmètre serveur : un administrateur d'établissement ne voit que
  // les paiements des membres de son établissement. Un matricule hors
  // périmètre est refusé proprement, jamais filtré en silence.
  if (req.user.role === 'admin_etablissement' && matricule) {
    const m = (await q('SELECT etablissement_id FROM membres WHERE matricule = $1', [matricule])).rows[0];
    if (!m || m.etablissement_id == null || m.etablissement_id !== req.user.eid) throw httpError(403, 'Accès refusé.');
  }
  return (
    await q(
      `SELECT p.id, p.reference, p.type, p.montant_fcfa, p.statut, p.wave_transaction_id, p.moyen, p.cree_le,
              p.confirme_le, p.refuse_le, cm.nom_complet AS confirme_par_nom, rm.nom_complet AS refuse_par_nom,
              m.nom_complet, m.matricule, e.nom AS etablissement_nom,
              p.evenement_id, p.numero_versement, p.mois_cible, ev.nom AS camp_nom,
              p.beneficiaire_id, p.beneficiaire_nom, p.message_don,
              bm.nom_complet AS beneficiaire_membre_nom, bm.matricule AS beneficiaire_matricule
       FROM paiements p LEFT JOIN membres m ON m.id = p.membre_id
       LEFT JOIN membres bm ON bm.id = p.beneficiaire_id
       LEFT JOIN etablissements e ON e.id = m.etablissement_id
       LEFT JOIN evenements ev ON ev.id = p.evenement_id
       LEFT JOIN membres cm ON cm.utilisateur_id = p.confirme_par
       LEFT JOIN membres rm ON rm.utilisateur_id = p.refuse_par
       WHERE ($1::statut_paiement IS NULL OR p.statut = $1)
         AND ($2::text IS NULL OR m.matricule = $2)
         AND ($3::uuid IS NULL OR m.etablissement_id = $3)
         AND ($4::type_paiement IS NULL OR p.type = $4)
         AND ($5::date IS NULL OR p.cree_le::date >= $5)
         AND ($6::date IS NULL OR p.cree_le::date <= $6)
       ORDER BY p.cree_le DESC LIMIT 200`,
      [statut ?? null, matricule ?? null, req.user.role === 'admin_etablissement' ? req.user.eid : (etablissement_id ?? null), type ?? null, debut ?? null, fin ?? null],
    )
  ).rows;
});

// Historique des transactions, 30 oct. 2026 : totaux par période,
// mêmes filtres et même périmètre que la liste, sans nouvelle table.
// Route statique, donc prioritaire sur /admin/paiements/:id.
app.get('/admin/paiements/totaux', { preHandler: guard('admin_general', 'admin_etablissement') }, async (req) => {
  const { type, statut, matricule, etablissement_id, debut, fin } = z.object({
    type: z.enum(['don', 'achat', 'carte', 'cotisation', 'camp']).optional(),
    statut: z.enum(['en_attente', 'confirme', 'refuse', 'annule']).optional(),
    matricule: z.string().max(40).optional(),
    etablissement_id: z.string().uuid().optional(),
    debut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    fin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  }).parse(req.query);
  if (req.user.role === 'admin_etablissement' && etablissement_id && etablissement_id !== req.user.eid) throw httpError(403, 'Accès refusé.');
  const rows = (await q(
    `SELECT COUNT(*) FILTER (WHERE p.statut = 'confirme')::int AS nombre_confirme,
            COALESCE(SUM(p.montant_fcfa) FILTER (WHERE p.statut = 'confirme'), 0)::int AS total_confirme,
            COUNT(*) FILTER (WHERE p.statut = 'en_attente')::int AS nombre_en_attente,
            COALESCE(SUM(p.montant_fcfa) FILTER (WHERE p.statut = 'en_attente'), 0)::int AS total_en_attente,
            COUNT(*) FILTER (WHERE p.statut = 'refuse')::int AS nombre_refuse,
            COALESCE(SUM(p.montant_fcfa) FILTER (WHERE p.statut = 'refuse'), 0)::int AS total_refuse,
            COUNT(*) FILTER (WHERE p.statut = 'annule')::int AS nombre_annule,
            COALESCE(SUM(p.montant_fcfa) FILTER (WHERE p.statut = 'annule'), 0)::int AS total_annule
     FROM paiements p LEFT JOIN membres m ON m.id = p.membre_id
     WHERE ($1::type_paiement IS NULL OR p.type = $1)
       AND ($2::statut_paiement IS NULL OR p.statut = $2)
       AND ($3::text IS NULL OR m.matricule = $3)
       AND ($4::uuid IS NULL OR m.etablissement_id = $4)
       AND ($5::date IS NULL OR p.cree_le::date >= $5)
       AND ($6::date IS NULL OR p.cree_le::date <= $6)`,
    [type ?? null, statut ?? null, matricule ?? null, req.user.role === 'admin_etablissement' ? req.user.eid : (etablissement_id ?? null), debut ?? null, fin ?? null],
  )).rows;
  return rows[0] ?? { nombre_confirme: 0, total_confirme: 0, nombre_en_attente: 0, total_en_attente: 0, nombre_refuse: 0, total_refuse: 0, nombre_annule: 0, total_annule: 0 };
});

// Membres vus recemment : un membre est compte en ligne s'il a signale
// son activite dans les 10 dernieres minutes. Au-dela, il n'apparait plus.
app.get('/admin/en-ligne', { preHandler: adminG }, async () => {
  return (
    await q(
      `SELECT nom_complet, matricule, derniere_activite FROM membres
       WHERE derniere_activite > now() - interval '10 minutes'
       ORDER BY derniere_activite DESC`
    )
  ).rows;
});

// Rapports de bug, 29 oct. 2026 : un membre signale un plantage ou un
// écran qui ne marche pas, depuis l'onglet Plus ou par capture
// automatique d'erreur. Le rapport ne contient jamais de mot de passe,
// de jeton, d'e-mail, de numéro, de donnée de santé, d'information de
// paiement ni de contenu de prière : l'application nettoie le message
// avant l'envoi, et le serveur ne garde que version, appareil,
// système, écran, message technique nettoyé et description tapée.
// Le statut passe de Nouveau à En cours puis Corrigé, avec la version
// qui a apporté le correctif, visible par l'administrateur général.
const rapportBugS = z
  .object({
    version_app: z.string().trim().max(40).optional(),
    modele: z.string().trim().max(200).optional(),
    systeme: z.string().trim().max(200).optional(),
    ecran: z.string().trim().max(200).optional(),
    message_erreur: z.string().trim().max(2000).optional(),
    description: z.string().trim().max(2000).optional(),
  })
  .refine((v) => (v.message_erreur ?? '').length > 0 || (v.description ?? '').length > 0, {
    message: 'Un message d’erreur ou une description est requis.',
  });

app.post('/rapports-bug', { preHandler: membreG }, async (req, reply) => {
  const b = rapportBugS.parse(req.body ?? {});
  const rows = await q(
    `INSERT INTO rapports_bug (membre_id, version_app, modele, systeme, ecran, message_erreur, description, statut)
     VALUES ($1, $2, $3, $4, $5, $6, $7, 'Nouveau') RETURNING *`,
    [req.user.mid ?? null, b.version_app ?? '', b.modele ?? '', b.systeme ?? '', b.ecran ?? '', b.message_erreur ?? '', b.description ?? ''],
  );
  return reply.code(201).send(rows.rows[0]);
});

app.get('/admin/rapports-bug', { preHandler: adminG }, async (req) => {
  const { statut } = z.object({ statut: z.enum(['Nouveau', 'En cours', 'Corrigé']).optional() }).parse(req.query);
  return (
    await q(
      `SELECT r.id, r.membre_id, r.version_app, r.modele, r.systeme, r.ecran, r.message_erreur, r.description, r.statut, r.cree_le, r.corrige_version, m.nom_complet, m.matricule
       FROM rapports_bug r LEFT JOIN membres m ON m.id = r.membre_id
       WHERE ($1::text IS NULL OR r.statut = $1)
       ORDER BY r.cree_le DESC LIMIT 200`,
      [statut ?? null],
    )
  ).rows;
});

app.put('/admin/rapports-bug/:id', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const b = z.object({ statut: z.enum(['Nouveau', 'En cours', 'Corrigé']), corrige_version: z.string().trim().max(40).optional() }).parse(req.body ?? {});
  const rows = await q(
    `UPDATE rapports_bug SET statut = $2, corrige_version = COALESCE($3, corrige_version) WHERE id = $1 RETURNING *`,
    [id, b.statut, b.corrige_version ?? null],
  );
  if (!rows.rows[0]) throw httpError(404, 'Rapport introuvable.');
  return rows.rows[0];
});

// Lecture réservée à Muse, 29 oct. 2026 : les rapports de bug ne sont
// plus affichés dans l'Espace structure. Cette route en lecture seule
// exige l'en-tête X-Dev-Key, comparé en temps constant à la variable
// d'environnement RAPPORTS_DEV_KEY. Si la variable est absente ou vide,
// la route répond 404, comme si elle n'existait pas. Aucune clé n'est
// écrite en dur : la valeur vient uniquement de l'environnement Render,
// que Axel renseigne lui-même.
app.get('/dev/rapports-bug', async (req) => {
  const key = process.env.RAPPORTS_DEV_KEY ?? '';
  if (!key) throw httpError(404, 'Introuvable.');
  const provided = req.headers['x-dev-key'];
  const a = Buffer.from(typeof provided === 'string' ? provided : '');
  const b = Buffer.from(key);
  if (a.length !== b.length || !timingSafeEqual(a, b)) throw httpError(404, 'Introuvable.');
  const { statut } = z.object({ statut: z.enum(['Nouveau', 'En cours', 'Corrigé']).optional() }).parse(req.query);
  return (
    await q(
      `SELECT id, membre_id, version_app, modele, systeme, ecran, message_erreur, description, statut, cree_le, corrige_version
       FROM rapports_bug
       WHERE ($1::text IS NULL OR statut = $1)
       ORDER BY cree_le DESC LIMIT 200`,
      [statut ?? null],
    )
  ).rows;
});

// Détail d'un paiement, avec les lignes d'achat, pour que
// l'administrateur voie quels livres ont été achetés avant de valider.
app.get('/admin/paiements/:id', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const rows = await q(
    `SELECT p.id, p.reference, p.type, p.montant_fcfa, p.statut, p.wave_transaction_id, p.cree_le, m.nom_complet, m.matricule,
            COALESCE((SELECT json_agg(json_build_object('livre_id', l.livre_id, 'titre', l.titre_copie, 'auteur', l.auteur_copie, 'prix_fcfa', l.prix_copie_fcfa))
                      FROM achats_lignes l WHERE l.paiement_id = p.id), '[]') AS lignes
     FROM paiements p LEFT JOIN membres m ON m.id = p.membre_id WHERE p.id = $1`,
    [id],
  );
  if (!rows.rows[0]) throw httpError(404, 'Paiement introuvable.');
  return rows.rows[0];
});

// Validation explicite : la structure a contrôlé son compte Wave.
app.post('/admin/paiements/:id/valider', { preHandler: guard('admin_general', 'admin_etablissement') }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const b = z.object({ wave_transaction_id: z.string().trim().min(6).max(64).optional(), moyen: z.enum(['especes', 'wave', 'orange_money', 'paypal']).optional() }).parse(req.body ?? {});
  const p = await tx(async (c) => {
    // Périmètre serveur, jamais côté application : un administrateur
    // d'établissement ne valide que les paiements de ses membres.
    // Un membre sans établissement n'est validé que par l'admin général.
    const row = (await c.query('SELECT m.etablissement_id FROM paiements p LEFT JOIN membres m ON m.id = p.membre_id WHERE p.id = $1', [id])).rows[0];
    if (!row) throw httpError(409, 'Demande introuvable ou déjà traitée.');
    if (req.user.role === 'admin_etablissement' && (row.etablissement_id == null || row.etablissement_id !== req.user.eid)) throw httpError(403, 'Accès refusé.');
    // L'identifiant Wave n'a de sens que pour un règlement Wave ; il
    // n'est jamais conservé sur un règlement par un autre moyen.
    const waveId = b.moyen === 'wave' ? b.wave_transaction_id : (b.moyen == null ? b.wave_transaction_id : null);
    const r = await confirmPayment(c, id, 'validation_structure', req.user.sub, waveId, b.moyen);
    if (!r) throw httpError(409, 'Demande introuvable ou déjà traitée.');
    await audit(c, req, 'paiement.valide', 'paiements', id, { reference: r.reference, montant: r.montant_fcfa, moyen: b.moyen ?? null });
    return r;
  });
  ensureInvoice(p.id).catch((e) => app.log.error(e));
  await notifierPaiementValide(p);
  return { reference: p.reference, statut: p.statut };
});

app.post('/admin/paiements/:id/refuser', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const r = await tx(async (c) => {
    const row = (await c.query("UPDATE paiements SET statut = 'refuse', refuse_le = now(), refuse_par = $2 WHERE id = $1 AND statut = 'en_attente' RETURNING reference, statut, membre_id, type, montant_fcfa, beneficiaire_id, beneficiaire_nom", [id, req.user.sub])).rows[0];
    if (!row) throw httpError(409, 'Demande introuvable ou déjà traitée.');
    await audit(c, req, 'paiement.refuse', 'paiements', id, { reference: row.reference });
    return row;
  });
  const libelleRefus = (r.beneficiaire_id || r.beneficiaire_nom) ? 'don de camp' : libellePaiement(r.type);
  await notifierMembre(
    r.membre_id,
    'paiement_refuse',
    'Paiement refusé',
    `Bonjour {prenom}, votre ${libelleRefus} de ${fcfaTexte(r.montant_fcfa)} a été refusé par la structure.`,
    'paiement',
    id,
    undefined,
    `Votre ${libelleRefus} de ${fcfaTexte(r.montant_fcfa)} a été refusé par la structure.`,
  );
  return { reference: r.reference, statut: r.statut };
});

// Événements Wave reçus mais non rapprochés (le membre n'a pas encore déclaré sa transaction).
app.get('/admin/wave/non-rapproches', { preHandler: adminG }, async () =>
  (
    await q(
      `SELECT id, charge->'data'->>'id' AS transaction_id, (charge->'data'->>'amount')::int AS montant_fcfa,
              charge->'data'->>'sender_mobile' AS expediteur, charge->'data'->>'when_created' AS date_wave, recu_le
       FROM evenements_wave
       WHERE signature_ok AND NOT traite AND paiement_id IS NULL AND charge->>'type' = 'merchant.payment_received'
       ORDER BY recu_le DESC LIMIT 200`,
    )
  ).rows);

app.post('/admin/wave/:id/rapprocher', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const b = z.object({ paiement_id: z.string().uuid() }).parse(req.body);
  const p = await tx(async (c) => {
    const ev = (await c.query('SELECT id, charge FROM evenements_wave WHERE id = $1 AND signature_ok AND NOT traite FOR UPDATE', [id])).rows[0];
    if (!ev) throw httpError(404, 'Événement introuvable ou déjà traité.');
    const pay = (await c.query("SELECT id, montant_fcfa FROM paiements WHERE id = $1 AND statut = 'en_attente' FOR UPDATE", [b.paiement_id])).rows[0];
    if (!pay) throw httpError(404, 'Demande introuvable ou déjà traitée.');
    if (Number(ev.charge.data.amount) !== pay.montant_fcfa) throw httpError(409, 'Les montants ne correspondent pas.');
    const r = await confirmPayment(c, pay.id, 'validation_structure', req.user.sub, ev.charge.data.id);
    await c.query('UPDATE evenements_wave SET traite = true, paiement_id = $1 WHERE id = $2', [pay.id, ev.id]);
    await audit(c, req, 'paiement.rapproche', 'paiements', pay.id, { evenement: ev.id });
    return r;
  });
  ensureInvoice(p.id).catch((e) => app.log.error(e));
  await notifierPaiementValide(p);
  return { reference: p.reference, statut: p.statut };
});

// ───────────────────────── Espace structure : contenus ─────────────────────────
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const txt = z.string().trim().min(1).max(5000);
const opt = (s) => s.nullable().optional();

// Programmation façon Facebook, 30 oct. 2026 : date et heure avec
// décalage, validées comme texte ISO. Le serveur stocke un
// horodatage avec fuseau et compare avec son heure actuelle.
const dateHeure = z.string().refine((s) => !Number.isNaN(Date.parse(s)), 'Date et heure invalides');

const livreS = z.object({
  titre: z.string().trim().min(1).max(200),
  auteur: z.string().trim().min(1).max(200),
  description: opt(txt),
  prix_fcfa: z.number().int().min(1),
  format: opt(z.string().trim().max(30)),
  couverture_id: opt(z.string().uuid()),
  fichier_id: opt(z.string().uuid()),
  publie: z.boolean().optional(),
});
const evenementS = z.object({
  type: z.enum(['camp', 'retraite']).optional(),
  nom: z.string().trim().min(1).max(200),
  date_debut: opt(date),
  date_fin: opt(date),
  lieu: opt(z.string().trim().max(200)),
  tarif_fcfa: opt(z.number().int().min(0)),
  image_id: opt(z.string().uuid()),
  est_kairos: z.boolean().optional(), // badge automatique pour le Camp National Kairos
  publie: z.boolean().optional(),
});

function crud(route, table, schema, label, apresCreation) {
  app.post(`/admin/${route}`, { preHandler: adminG }, async (req, reply) => {
    const body = clean(schema.parse(req.body));
    const [sql, params] = insertSql(table, body);
    const row = await tx(async (c) => {
      const r = (await c.query(sql, params)).rows[0];
      await audit(c, req, `${label}.cree`, table, r.id);
      return r;
    });
    // Notification au mieux, après la création : un échec ici ne
    // remet jamais en cause la publication.
    if (apresCreation) await apresCreation(row);
    return reply.code(201).send(row);
  });
  app.put(`/admin/${route}/:id`, { preHandler: adminG }, async (req) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
    const body = clean(schema.partial().parse(req.body));
    if (!Object.keys(body).length) throw httpError(400, 'Aucune modification.');
    const [sql, params] = updateSql(table, id, body);
    // Une modification du catalogue ne change ni les achats payés ni leurs factures (copies d'origine).
    const row = await tx(async (c) => {
      const r = (await c.query(sql, params)).rows[0];
      if (!r) throw httpError(404, 'Introuvable.');
      await audit(c, req, `${label}.modifie`, table, id, body);
      return r;
    });
    return row;
  });
}
crud('livres', 'livres', livreS, 'livre');
crud('evenements', 'evenements', evenementS, 'evenement', async (row) => {
  // Seul un camp publié notifie. Un camp créé non publié reste
  // silencieux.
  if (row.publie === false) return;
  const lieu = row.lieu ? ` à ${row.lieu}` : '';
  await notifierTous('nouveau_camp', `Nouveau camp : ${row.nom}`, `Bonjour {prenom}, un nouveau camp est publié${lieu}. Retrouvez-le dans l'onglet Camps.`, 'camp', row.id, undefined, `Un nouveau camp est publié${lieu}. Retrouvez-le dans l'onglet Camps.`);
});

app.post('/admin/etablissements', { preHandler: adminG }, async (req, reply) => {
  const b = clean(z.object({ nom: z.string().trim().min(1).max(120), description: opt(txt), image_id: opt(z.string().uuid()) }).parse(req.body));
  const [sql, params] = insertSql('etablissements', b);
  return reply.code(201).send((await q(sql, params)).rows[0]);
});

// Admin d'établissement : uniquement son établissement. Admin général : tous.
const contenuG = guard('admin_general', 'admin_etablissement');
const peutGerer = (req, etabId) => req.user.role === 'admin_general' || req.user.eid === etabId;

app.post('/admin/etablissements/:id/activites', { preHandler: contenuG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  if (!peutGerer(req, id)) throw httpError(403, 'Accès refusé à cet établissement.');
  const b = clean(z.object({ titre: z.string().trim().min(1).max(200), description: opt(txt), image_id: opt(z.string().uuid()) }).parse(req.body));
  const [sql, params] = insertSql('activites_etablissement', { ...b, etablissement_id: id });
  return reply.code(201).send((await q(sql, params)).rows[0]);
});

app.post('/admin/actualites', { preHandler: contenuG }, async (req, reply) => {
  const b = clean(
    z.object({ etablissement_id: opt(z.string().uuid()), titre: z.string().trim().min(1).max(200), texte: txt, image_id: opt(z.string().uuid()), programmee_le: opt(dateHeure) }).parse(req.body),
  );
  if (req.user.role === 'admin_etablissement' && (!b.etablissement_id || !peutGerer(req, b.etablissement_id))) {
    throw httpError(403, 'Vous ne pouvez publier que pour votre établissement.');
  }
  const [sql, params] = insertSql('actualites', { ...b, auteur_id: req.user.sub });
  const row = (await q(sql, params)).rows[0];
  // Programmation, 30 oct. 2026 : une actualité programmée ne
  // sonne pas à sa création, mais à sa publication, par le
  // balayage de la lecture membres. Immédiate ou passée, elle
  // sonne comme avant.
  if (!b.programmee_le || new Date(b.programmee_le) <= new Date()) {
    await notifierTous('nouvelle_actualite', 'Nouvelle actualité', `Bonjour {prenom}, ${row.titre}`, 'actualite', row.id, undefined, row.titre);
  }
  return reply.code(201).send(row);
});

app.put('/admin/enseignements/:id', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const body = clean(z.object({ titre: opt(z.string().trim().min(1).max(200)), orateur: opt(z.string().trim().max(200)), description: opt(txt), audio_id: opt(z.string().uuid()), lien_audio: opt(z.string().trim().max(1000)) }).partial().parse(req.body));
  if (!Object.keys(body).length) throw httpError(400, 'Aucune modification.');
  const [sql, params] = updateSql('enseignements', id, body);
  const row = (await q(sql, params)).rows[0];
  if (!row) throw httpError(404, 'Introuvable.');
  return row;
});

app.delete('/admin/actualites/:id', { preHandler: adminG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const r = await q('DELETE FROM actualites WHERE id = $1', [id]);
  if (r.rowCount === 0) throw httpError(404, 'Actualité introuvable.');
  return { ok: true };
});

// Modification d'une actualité, 30 oct. 2026, réservée à
// l'administrateur général, comme sa suppression. Même schéma
// partiel que la création, plus la date de publication.
// L'application appelait déjà cette route : elle n'existait pas.
app.put('/admin/actualites/:id', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const body = clean(z.object({ titre: opt(z.string().trim().min(1).max(200)), texte: opt(txt), image_id: opt(z.string().uuid()), programmee_le: opt(dateHeure) }).partial().parse(req.body));
  if (!Object.keys(body).length) throw httpError(400, 'Aucune modification.');
  const [sql, params] = updateSql('actualites', id, body);
  const row = (await q(sql, params)).rows[0];
  if (!row) throw httpError(404, 'Introuvable.');
  return row;
});

// Listes administrateur, 30 oct. 2026 : contrairement aux lectures
// membres, elles montrent aussi les éléments programmés, avec
// leur date prévue, pour que la structure les voie et les modifie
// avant publication.
app.get('/admin/annonces-audio', { preHandler: adminG }, async () =>
  (await q('SELECT id, titre, texte, audio_id, lien_audio, publiee_le, programmee_le, actif FROM annonces_audio ORDER BY publiee_le DESC, id DESC')).rows);

app.get('/admin/actualites', { preHandler: contenuG }, async (req) => {
  const general = req.user.role === 'admin_general';
  return (await q(
    `SELECT id, etablissement_id, titre, texte, image_id, publiee_le, programmee_le FROM actualites
     WHERE ($1 OR etablissement_id = $2 OR etablissement_id IS NULL) ORDER BY publiee_le DESC LIMIT 200`,
    [general, req.user.eid ?? null],
  )).rows;
});

app.post('/admin/enseignements', { preHandler: adminG }, async (req, reply) => {
  const b = clean(
    z.object({ titre: z.string().trim().min(1).max(200), orateur: opt(z.string().trim().max(200)), description: opt(txt), audio_id: opt(z.string().uuid()) }).parse(req.body),
  );
  const [sql, params] = insertSql('enseignements', b);
  const row = (await q(sql, params)).rows[0];
  if (row.publie !== false) {
    const parOrateur = row.orateur ? `, par ${row.orateur}` : '';
    await notifierTous('nouvel_enseignement', '{prenom}, un enseignement pour vous', `« ${row.titre} »${parOrateur}. Retrouvez-le dans les enseignements.`, 'enseignement', row.id, 'Un enseignement pour vous');
  }
  return reply.code(201).send(row);
});

// Annonces audio, 29 oct. 2026 : création, modification et retrait
// par l'administrateur général seulement. Table séparée des
// enseignements, sans notification par cloche en version 1.
app.post('/admin/annonces-audio', { preHandler: adminG }, async (req, reply) => {
  const b = clean(
    z.object({ titre: z.string().trim().min(1).max(200), texte: opt(txt), audio_id: opt(z.string().uuid()), lien_audio: opt(z.string().trim().max(1000)), programmee_le: opt(dateHeure) }).parse(req.body),
  );
  const [sql, params] = insertSql('annonces_audio', b);
  const row = (await q(sql, params)).rows[0];
  return reply.code(201).send(row);
});

app.put('/admin/annonces-audio/:id', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const body = clean(z.object({ titre: opt(z.string().trim().min(1).max(200)), texte: opt(txt), audio_id: opt(z.string().uuid()), lien_audio: opt(z.string().trim().max(1000)), programmee_le: opt(dateHeure) }).partial().parse(req.body));
  if (!Object.keys(body).length) throw httpError(400, 'Aucune modification.');
  const [sql, params] = updateSql('annonces_audio', id, body);
  const row = (await q(sql, params)).rows[0];
  if (!row) throw httpError(404, 'Introuvable.');
  return row;
});

// Retrait d'une annonce audio : l'annonce passe inactive et
// disparaît pour tous les membres, sans effacer la ligne ni
// aucune autre donnée. Administrateur général seulement.
app.delete('/admin/annonces-audio/:id', { preHandler: adminG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const row = await tx(async (c) => {
    const r = (await c.query('UPDATE annonces_audio SET actif = false WHERE id = $1 AND actif RETURNING id', [id])).rows[0];
    if (!r) throw httpError(404, 'Annonce introuvable.');
    await audit(c, req, 'annonce.retiree', 'annonces_audio', id);
    return r;
  });
  return { ok: true };
});

app.get('/cartes-video', async () =>
  (await q('SELECT id, titre, explication, lien_video, publiee_le FROM cartes_video WHERE actif ORDER BY publiee_le DESC, id DESC')).rows);

app.get('/admin/cartes-video', { preHandler: adminG }, async () =>
  (await q('SELECT id, titre, explication, lien_video, publiee_le, actif FROM cartes_video ORDER BY publiee_le DESC, id DESC')).rows);

app.post('/admin/cartes-video', { preHandler: adminG }, async (req, reply) => {
  const b = clean(
    z.object({ titre: z.string().trim().min(1).max(200), explication: opt(txt), lien_video: z.string().trim().min(1).max(1000) }).parse(req.body),
  );
  const [sql, params] = insertSql('cartes_video', b);
  const row = (await q(sql, params)).rows[0];
  return reply.code(201).send(row);
});

app.put('/admin/cartes-video/:id', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const body = clean(z.object({ titre: opt(z.string().trim().min(1).max(200)), explication: opt(txt), lien_video: opt(z.string().trim().min(1).max(1000)) }).partial().parse(req.body));
  if (!Object.keys(body).length) throw httpError(400, 'Aucune modification.');
  const [sql, params] = updateSql('cartes_video', id, body);
  const row = (await q(sql, params)).rows[0];
  if (!row) throw httpError(404, 'Introuvable.');
  return row;
});

// Retrait d'une carte vidéo : la carte passe inactive et
// disparaît pour tous les membres, sans effacer la ligne.
// Administrateur général seulement.
app.delete('/admin/cartes-video/:id', { preHandler: adminG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const row = await tx(async (c) => {
    const r = (await c.query('UPDATE cartes_video SET actif = false WHERE id = $1 AND actif RETURNING id', [id])).rows[0];
    if (!r) throw httpError(404, 'Carte introuvable.');
    await audit(c, req, 'carte_video.retiree', 'cartes_video', id);
    return r;
  });
  return { ok: true };
});

app.post('/admin/bureau', { preHandler: adminG }, async (req, reply) => {
  const b = clean(
    z
      .object({
        nom: z.string().trim().min(1).max(200),
        fonction: z.string().trim().min(1).max(200),
        contact: opt(z.string().trim().max(200)),
        contact_public: z.boolean().optional(), // seulement avec l'accord de la personne
        ordre: z.number().int().optional(),
      })
      .parse(req.body),
  );
  const [sql, params] = insertSql('bureau_membres', b);
  return reply.code(201).send((await q(sql, params)).rows[0]);
});

app.post('/admin/cotisations', { preHandler: guard('admin_general', 'admin_etablissement') }, async (req, reply) => {
  const b = z.object({ matricule: z.string().trim().min(3), mois: date.optional(), moyen: z.enum(['especes', 'wave', 'orange_money', 'paypal']).optional() }).parse(req.body);
  const m = (await q('SELECT id, etablissement_id FROM membres WHERE matricule = $1', [b.matricule])).rows[0];
  if (!m) throw httpError(404, 'Matricule inconnu.');
  // Périmètre serveur : un administrateur d'établissement n'enregistre
  // que pour les membres de son établissement. Un membre sans
  // établissement n'est enregistré que par l'admin général.
  if (req.user.role === 'admin_etablissement' && (m.etablissement_id == null || m.etablissement_id !== req.user.eid)) throw httpError(403, 'Accès refusé.');
  // Mois omis : mois en cours côté serveur. Le montant reste celui
  // imposé par la table, 1000 FCFA par mois, jamais envoyé par le client.
  const mois = b.mois ?? new Date().toISOString().slice(0, 10);
  const r = await tx(async (c) => {
    let row;
    try {
      row = (await c.query(
        "INSERT INTO cotisations (membre_id, mois, enregistre_par, moyen) VALUES ($1, date_trunc('month', $2::date)::date, $3, $4) RETURNING *",
        [m.id, mois, req.user.sub, b.moyen ?? 'especes'],
      )).rows[0];
    } catch (e) {
      if (e.code === '23505') throw httpError(409, 'Cotisation du mois déjà enregistrée.');
      throw e;
    }
    await audit(c, req, 'cotisation.enregistree', 'cotisations', row.id, { matricule: b.matricule, mois: String(row.mois).slice(0, 10), moyen: row.moyen, montant: row.montant_fcfa });
    return row;
  });
  // La ligne cotisations du mois compte dans la définition de « soldé »
  // de la cloche : le rappel de cotisation du mois disparaît seul à la
  // prochaine lecture de la cloche, sans changer ses règles.
  return reply.code(201).send(r);
});

// ───────────────────────── Présences, phase 1, 29 oct. 2026 ─────────────────────────
// Une activité de présence est soit un camp (evenements), soit une activité
// d'établissement (activites_etablissement). Le périmètre est contrôlé ici,
// jamais côté application : un admin_etablissement ne voit et ne marque que
// les membres de son établissement, et seulement ses propres activités
// d'établissement. Les camps sont communautaires : pour eux, seul
// l'établissement du membre compte. Une présence annulée est marquée,
// jamais effacée. Le journal d'audit propre aux présences ne remplace pas
// journal_audit, qui garde les autres actions.
async function resolveActivite(id) {
  const ev = (await q("SELECT id, nom, NULL::uuid AS etablissement_id, 'evenement' AS type FROM evenements WHERE id = $1", [id])).rows[0];
  if (ev) return ev;
  return (await q("SELECT id, titre AS nom, etablissement_id, 'activite_etablissement' AS type FROM activites_etablissement WHERE id = $1", [id])).rows[0] ?? null;
}
const peutPresence = (req, membreEtabId, activite) => {
  if (req.user.role === 'admin_general') return true;
  if (req.user.role !== 'admin_etablissement') return false;
  // Membre sans établissement, camp communautaire, 30 oct. 2026 : un
  // membre sans établissement n'appartient au périmètre d'aucun
  // établissement, et les camps sont communautaires. L'administrateur
  // d'établissement peut donc le marquer présent à un camp. Les
  // activités d'établissement restent strictes, et les membres d'un
  // autre établissement restent refusés.
  if (membreEtabId == null) return activite != null && activite.type === 'evenement';
  if (membreEtabId !== req.user.eid) return false;
  if (activite && activite.type === 'activite_etablissement' && activite.etablissement_id !== req.user.eid) return false;
  return true;
};
const auditPresence = (c, req, action, entite, entiteId, details) =>
  c.query('INSERT INTO audit (acteur_id, action, entite, entite_id, details) VALUES ($1,$2,$3,$4,$5)', [
    req?.user?.mid ?? null,
    action,
    entite,
    entiteId ?? null,
    details ? JSON.stringify(details) : null,
  ]);
async function marquerPresence(c, req, activite, membre, methode) {
  const ancien = (await c.query('SELECT * FROM presences WHERE membre_id = $1 AND activite_id = $2', [membre.id, activite.id])).rows[0];
  if (ancien && ancien.statut === 'present') throw httpError(409, 'Ce membre est déjà présent à cette activité.');
  const details = { activite_id: activite.id, activite_nom: activite.nom, membre_nom: membre.nom_complet, matricule: membre.matricule, methode };
  let ligne;
  if (ancien) {
    ligne = (await c.query("UPDATE presences SET statut = 'present', scanne_le = now(), scanne_par = $2, methode = $3 WHERE id = $1 RETURNING *", [ancien.id, req.user.mid ?? null, methode])).rows[0];
    await auditPresence(c, req, 'presence.reprise', 'presences', ligne.id, details);
  } else {
    ligne = (await c.query('INSERT INTO presences (membre_id, activite_id, scanne_par, methode) VALUES ($1,$2,$3,$4) RETURNING *', [membre.id, activite.id, req.user.mid ?? null, methode])).rows[0];
    await auditPresence(c, req, methode === 'scan' ? 'presence.scan' : 'presence.manuel', 'presences', ligne.id, details);
  }
  return { ...ligne, nom_complet: membre.nom_complet, matricule: membre.matricule };
}

app.post('/presences/scan', { preHandler: contenuG }, async (req, reply) => {
  const b = z.object({ activite_id: z.string().uuid(), matricule: z.string().trim().min(3).max(40) }).parse(req.body);
  const activite = await resolveActivite(b.activite_id);
  if (!activite) throw httpError(404, 'Activité introuvable.');
  const membre = (await q('SELECT id, nom_complet, matricule, etablissement_id FROM membres WHERE matricule = $1', [b.matricule.toUpperCase()])).rows[0];
  if (!membre) throw httpError(404, 'Matricule inconnu.');
  if (!peutPresence(req, membre.etablissement_id, activite)) throw httpError(403, 'Accès refusé à cet établissement.');
  const ligne = await tx((c) => marquerPresence(c, req, activite, membre, 'scan'));
  return reply.code(201).send(ligne);
});

app.post('/presences/manuel', { preHandler: contenuG }, async (req, reply) => {
  const b = z.object({ activite_id: z.string().uuid(), membre_id: z.string().uuid() }).parse(req.body);
  const activite = await resolveActivite(b.activite_id);
  if (!activite) throw httpError(404, 'Activité introuvable.');
  const membre = (await q('SELECT id, nom_complet, matricule, etablissement_id FROM membres WHERE id = $1', [b.membre_id])).rows[0];
  if (!membre) throw httpError(404, 'Membre introuvable.');
  if (!peutPresence(req, membre.etablissement_id, activite)) throw httpError(403, 'Accès refusé à cet établissement.');
  const ligne = await tx((c) => marquerPresence(c, req, activite, membre, 'manuel'));
  return reply.code(201).send(ligne);
});

app.get('/presences/activite/:id', { preHandler: contenuG }, async (req) => {
  const activite = await resolveActivite(req.params.id);
  if (!activite) throw httpError(404, 'Activité introuvable.');
  if (req.user.role === 'admin_etablissement' && activite.type === 'activite_etablissement' && activite.etablissement_id !== req.user.eid) {
    throw httpError(403, 'Accès refusé à cet établissement.');
  }
  const perimetre = req.user.role === 'admin_etablissement' ? req.user.eid : null;
  // Camp communautaire, 30 oct. 2026 : l'administrateur d'établissement
  // voit aussi les membres sans établissement, qui n'appartiennent à
  // aucun périmètre, pour que les présences ajoutées à la main restent
  // visibles dans sa liste. Les activités d'établissement restent
  // strictes, et les autres établissements restent invisibles.
  const inclureSans = req.user.role === 'admin_etablissement' && activite.type === 'evenement';
  const pres = (
    await q(
      `SELECT p.*, m.nom_complet, m.matricule, m.etablissement_id
       FROM presences p JOIN membres m ON m.id = p.membre_id
       WHERE p.activite_id = $1 AND ($2::uuid IS NULL OR m.etablissement_id = $2 OR ($3::boolean AND m.etablissement_id IS NULL))
       ORDER BY p.scanne_le`,
      [activite.id, perimetre, inclureSans],
    )
  ).rows;
  let inscrits = [];
  if (activite.type === 'evenement') {
    inscrits = (
      await q(
        `SELECT i.membre_id, m.nom_complet, m.matricule, m.etablissement_id
         FROM inscriptions i JOIN membres m ON m.id = i.membre_id
         WHERE i.evenement_id = $1 AND ($2::uuid IS NULL OR m.etablissement_id = $2 OR ($3::boolean AND m.etablissement_id IS NULL))
         ORDER BY m.nom_complet`,
        [activite.id, perimetre, inclureSans],
      )
    ).rows;
  }
  const parMembre = new Map(pres.map((p) => [p.membre_id, p]));
  const entrees = inscrits.map((i) => {
    const p = parMembre.get(i.membre_id);
    return {
      presence_id: p?.id ?? null,
      membre_id: i.membre_id,
      nom_complet: i.nom_complet,
      matricule: i.matricule,
      statut: p ? p.statut : 'absent',
      scanne_le: p?.scanne_le ?? null,
      methode: p?.methode ?? null,
      inscrit: true,
    };
  });
  for (const p of pres) {
    if (!inscrits.some((i) => i.membre_id === p.membre_id)) {
      entrees.push({
        presence_id: p.id,
        membre_id: p.membre_id,
        nom_complet: p.nom_complet,
        matricule: p.matricule,
        statut: p.statut,
        scanne_le: p.scanne_le,
        methode: p.methode,
        inscrit: false,
      });
    }
  }
  return { activite: { id: activite.id, type: activite.type, nom: activite.nom }, entrees };
});

// Taux de présence par camp, lot 1, 31 oct. 2026 : mêmes garde et
// périmètre que la liste de présence. Le numérateur compte les
// membres avec statut present sur ce camp, y compris les présents
// sans inscription marqués à la main. Le dénominateur compte les
// inscrits du camp. Les annulés ne comptent jamais comme présents.
// Pour une activité d'établissement, il n'y a pas d'inscriptions :
// inscrits vaut 0 et taux vaut null.
app.get('/presences/activite/:id/taux', { preHandler: contenuG }, async (req) => {
  const activite = await resolveActivite(req.params.id);
  if (!activite) throw httpError(404, 'Activité introuvable.');
  if (req.user.role === 'admin_etablissement' && activite.type === 'activite_etablissement' && activite.etablissement_id !== req.user.eid) {
    throw httpError(403, 'Accès refusé à cet établissement.');
  }
  const perimetre = req.user.role === 'admin_etablissement' ? req.user.eid : null;
  const inclureSans = req.user.role === 'admin_etablissement' && activite.type === 'evenement';
  const filtre = `($2::uuid IS NULL OR m.etablissement_id = $2 OR ($3::boolean AND m.etablissement_id IS NULL))`;
  const presents = (await q(
    `SELECT COUNT(*)::int AS n FROM presences p JOIN membres m ON m.id = p.membre_id
     WHERE p.activite_id = $1 AND p.statut = 'present' AND ${filtre}`,
    [activite.id, perimetre, inclureSans],
  )).rows[0].n;
  let inscrits = 0;
  if (activite.type === 'evenement') {
    inscrits = (await q(
      `SELECT COUNT(*)::int AS n FROM inscriptions i JOIN membres m ON m.id = i.membre_id
       WHERE i.evenement_id = $1 AND ${filtre}`,
      [activite.id, perimetre, inclureSans],
    )).rows[0].n;
  }
  return {
    activite: { id: activite.id, type: activite.type, nom: activite.nom },
    inscrits,
    presents,
    taux: inscrits > 0 ? Math.round((presents * 100) / inscrits) : null,
  };
});

// Présence du membre connecté sur un camp, lot 1, 31 oct. 2026 : le
// membre ne voit que sa propre ligne, jamais celle d'un autre membre.
// Sert au bouton Certificat sur ses propres camps. Sans ligne, le
// statut vaut null, comme une absence.
app.get('/moi/presences/:activiteId', { preHandler: membreG }, async (req) => {
  if (req.user.mid == null) return { statut: null };
  const ligne = (await q(
    'SELECT statut FROM presences WHERE membre_id = $1 AND activite_id = $2',
    [req.user.mid, req.params.activiteId],
  )).rows[0];
  return { statut: ligne?.statut ?? null };
});

app.post('/presences/:id/annuler', { preHandler: contenuG }, async (req) => {
  const ligne = (
    await q(
      `SELECT p.*, m.etablissement_id AS membre_etablissement_id, m.nom_complet, m.matricule FROM presences p JOIN membres m ON m.id = p.membre_id WHERE p.id = $1`,
      [req.params.id],
    )
  ).rows[0];
  if (!ligne) throw httpError(404, 'Présence introuvable.');
  const activite = await resolveActivite(ligne.activite_id);
  if (!peutPresence(req, ligne.membre_etablissement_id, activite)) throw httpError(403, 'Accès refusé à cet établissement.');
  if (ligne.statut === 'annule') return ligne;
  return tx(async (c) => {
    const maj = (await c.query(`UPDATE presences SET statut = 'annule' WHERE id = $1 RETURNING *`, [ligne.id])).rows[0];
    await auditPresence(c, req, 'presence.annuler', 'presences', ligne.id, {
      activite_id: ligne.activite_id,
      activite_nom: activite?.nom ?? '',
      membre_nom: ligne.nom_complet,
      matricule: ligne.matricule,
    });
    return maj;
  });
});

app.get('/presences', { preHandler: contenuG }, async (req) => {
  const perimetre = req.user.role === 'admin_etablissement' ? req.user.eid : null;
  return (
    await q(
      `SELECT p.id, p.activite_id, p.statut, p.scanne_le, p.methode,
         m.nom_complet, m.matricule,
         COALESCE(e.nom, a.titre, '') AS activite_nom,
         CASE WHEN e.id IS NOT NULL THEN 'evenement' ELSE 'activite_etablissement' END AS activite_type,
         s.nom_complet AS scanne_par_nom
       FROM presences p
       JOIN membres m ON m.id = p.membre_id
       LEFT JOIN evenements e ON e.id = p.activite_id
       LEFT JOIN activites_etablissement a ON a.id = p.activite_id
       LEFT JOIN membres s ON s.id = p.scanne_par
       WHERE ($1::uuid IS NULL OR m.etablissement_id = $1)
       ORDER BY p.scanne_le DESC LIMIT 500`,
      [perimetre],
    )
  ).rows;
});

app.get('/admin/membres', { preHandler: contenuG }, async (req) => {
  const demande = typeof req.query.etablissement_id === 'string' && /^[0-9a-f-]{36}$/i.test(req.query.etablissement_id) ? req.query.etablissement_id : null;
  const filtre = req.user.role === 'admin_etablissement' ? req.user.eid : demande;
  // Sélecteur d'ajout manuel, 30 oct. 2026 : avec
  // inclure_sans_etablissement=1, l'administrateur d'établissement voit
  // aussi les membres sans établissement, qui n'appartiennent à aucun
  // périmètre. Sans ce paramètre, le comportement ne change pas, les
  // pages Membres et Cotisations restent strictes.
  const inclureSans = req.query.inclure_sans_etablissement === '1';
  // Cartes et fiches, 30 oct. 2026 : avec details=1, la liste
  // renvoie aussi la photo, la validité, l'inscription et le
  // contact, pour l'impression et l'export. Sans ce paramètre,
  // la réponse ne change pas.
  const details = req.query.details === '1';
  const colonnesDetails = details ? ', m.photo_donnees AS photo, m.valide_jusqua, m.inscrit_le, u.telephone, u.email' : '';
  return (
    await q(
      `SELECT m.id, m.matricule, m.nom_complet, m.fonction, m.etablissement_id, e.nom AS etablissement,
         CASE WHEN EXISTS (SELECT 1 FROM paiements p WHERE p.membre_id = m.id AND p.type = 'cotisation' AND p.statut = 'confirme') THEN 'confirme'
              WHEN EXISTS (SELECT 1 FROM paiements p WHERE p.membre_id = m.id AND p.type = 'cotisation' AND p.statut = 'en_attente') THEN 'en_attente'
              ELSE 'aucune' END AS cotisation_statut,
         (SELECT max(cree_le) FROM paiements p WHERE p.membre_id = m.id AND p.type = 'cotisation') AS dernier_paiement_cotisation${colonnesDetails}
       FROM membres m LEFT JOIN etablissements e ON e.id = m.etablissement_id
       LEFT JOIN utilisateurs u ON u.id = m.utilisateur_id
       WHERE ($1::uuid IS NULL OR m.etablissement_id = $1 OR ($2::boolean AND m.etablissement_id IS NULL))
       ORDER BY m.nom_complet LIMIT 500`,
      [filtre, inclureSans],
    )
  ).rows;
});

// Carte d'un membre pour l'administration, 30 oct. 2026 : lecture
// seule, pour voir et imprimer la carte. Périmètre : général voit
// tout, établissement voit son établissement, et un membre sans
// établissement reste visible en lecture seule pour
// l'administration d'établissement, comme pour les présences
// d'un camp communautaire. Les exports en masse, eux, restent
// stricts : sans établissement, pas de périmètre d'établissement.
app.get('/admin/membres/:id', { preHandler: contenuG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const r = (
    await q(
      `SELECT m.id, m.matricule, m.nom_complet, m.fonction, m.etablissement_id, e.nom AS etablissement,
         m.photo_donnees AS photo, m.valide_jusqua, m.inscrit_le, u.telephone, u.email,
         CASE WHEN EXISTS (SELECT 1 FROM paiements p WHERE p.membre_id = m.id AND p.type = 'cotisation' AND p.statut = 'confirme') THEN 'confirme'
              WHEN EXISTS (SELECT 1 FROM paiements p WHERE p.membre_id = m.id AND p.type = 'cotisation' AND p.statut = 'en_attente') THEN 'en_attente'
              ELSE 'aucune' END AS cotisation_statut
       FROM membres m LEFT JOIN etablissements e ON e.id = m.etablissement_id
       LEFT JOIN utilisateurs u ON u.id = m.utilisateur_id
       WHERE m.id = $1`,
      [id],
    )
  ).rows[0];
  if (!r) throw httpError(404, 'Membre introuvable.');
  if (req.user.role === 'admin_etablissement' && r.etablissement_id != null && r.etablissement_id !== req.user.eid) {
    throw httpError(403, 'Accès refusé à cet établissement.');
  }
  return r;
});

// Réinitialisation assistée, 29 oct. 2026 : administrateur général
// seul, jamais un simple masquage, le garde refuse les autres rôles.
// Le temporaire est renvoyé une seule fois, par TLS, à
// l'administrateur qui le transmet hors application. Il n'est jamais
// journalisé, ni en clair ni en empreinte, et n'est jamais stocké en
// clair : seule son empreinte remplace l'ancien mot de passe.
// Les sessions existantes sont révoquées en même temps.
app.post('/admin/membres/:id/mot-de-passe-temporaire', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const temporaire = genererMotDePasseTemporaire();
  const hash = await argon2.hash(temporaire, { type: argon2.argon2id });
  const m = await tx(async (c) => {
    const row = (
      await c.query('SELECT id, matricule, nom_complet, utilisateur_id FROM membres WHERE id = $1', [id])
    ).rows[0];
    if (!row) throw httpError(404, 'Membre introuvable.');
    await c.query(
      `UPDATE utilisateurs SET mot_de_passe_hash = $2, mot_de_passe_temporaire_expire_le = now() + interval '24 hours' WHERE id = $1`,
      [row.utilisateur_id, hash],
    );
    await c.query('UPDATE jetons_rafraichissement SET revoque = true WHERE utilisateur_id = $1 AND NOT revoque', [row.utilisateur_id]);
    await audit(c, req, 'motdepasse.temporaire_genere', 'membres', row.id, { matricule: row.matricule });
    return row;
  });
  return { matricule: m.matricule, nom_complet: m.nom_complet, mot_de_passe_temporaire: temporaire, valable_heures: 24 };
});

// Suppression definitive de compte, 31 oct. 2026 : administrateur
// general seulement, jamais son propre compte, jamais le dernier
// administrateur general. Le compte et ses donnees personnelles
// disparaissent definitivement (identifiants, sessions par cascade,
// inscriptions, presences, scores, cotisations) ; les paiements et
// les traces d'audit ne sont jamais effaces (paiements en SET NULL,
// affiches « compte supprime »), le matricule n'est jamais reutilise,
// le numero et l'e-mail sont liberes pour une nouvelle inscription.
app.delete('/admin/membres/:id', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const m = await tx(async (c) => {
    const row = (
      await c.query('SELECT m.id, m.matricule, m.nom_complet, m.utilisateur_id, m.photo_id, u.role FROM membres m JOIN utilisateurs u ON u.id = m.utilisateur_id WHERE m.id = $1', [id])
    ).rows[0];
    if (!row) throw httpError(404, 'Membre introuvable.');
    if (row.utilisateur_id === req.user.sub) throw httpError(409, 'Vous ne pouvez pas supprimer votre propre compte.');
    if (row.role === 'admin_general') {
      const n = (await c.query("SELECT COUNT(*)::int AS n FROM utilisateurs WHERE role = 'admin_general' AND id <> $1", [row.utilisateur_id])).rows[0].n;
      if (n === 0) throw httpError(409, 'Impossible de supprimer le dernier administrateur général.');
    }
    await audit(c, req, 'membre.supprime', 'membres', row.id, { matricule: row.matricule, nom_complet: row.nom_complet });
    await c.query('DELETE FROM bureau_membres WHERE membre_id = $1', [id]);
    // La photo de profil n'est effacee que si aucun autre contenu
    // ne la reference ; sinon elle reste, liee a ce contenu vivant.
    if (row.photo_id) {
      const refs = (await c.query(
        `SELECT 1 FROM (
           SELECT image_id AS f FROM etablissements UNION ALL SELECT image_id FROM activites_etablissement
           UNION ALL SELECT image_id FROM actualites UNION ALL SELECT image_id FROM evenements
           UNION ALL SELECT couverture_id FROM livres UNION ALL SELECT fichier_id FROM livres
           UNION ALL SELECT fichier_id FROM enseignements UNION ALL SELECT audio_id FROM enseignements
           UNION ALL SELECT audio_id FROM annonces_audio UNION ALL SELECT photo_id FROM membres WHERE id <> $2
         ) refs WHERE f = $1 LIMIT 1`,
        [row.photo_id, id],
      )).rows[0];
      if (!refs) await c.query('DELETE FROM fichiers WHERE id = $1', [row.photo_id]);
    }
    await c.query('DELETE FROM utilisateurs WHERE id = $1', [row.utilisateur_id]);
    return row;
  });
  return { supprime: true, matricule: m.matricule, nom_complet: m.nom_complet };
});

// Anniversaires, 29 oct. 2026 : l'admin général voit tout,
// l'admin d'établissement voit son périmètre seulement, comme pour
// les membres et les présences. La réponse ne contient que jour et
// mois, jamais l'année de naissance ni un âge, pour aucun membre.
// Le jour de référence est la date du serveur (Abidjan est à UTC,
// sans décalage, donc le jour du serveur est le jour du membre).
// Limite connue : un anniversaire du 29 février n'apparaît dans la
// liste du jour que les années bissextiles ; il reste visible dans
// la liste du mois de février les autres années.
app.get('/admin/anniversaires', { preHandler: contenuG }, async (req) => {
  const perimetre = req.user.role === 'admin_etablissement' ? req.user.eid : null;
  const select = `SELECT m.nom_complet, m.matricule, EXTRACT(MONTH FROM m.date_naissance)::int AS mois, EXTRACT(DAY FROM m.date_naissance)::int AS jour, e.nom AS etablissement `;
  const base = `FROM membres m LEFT JOIN etablissements e ON e.id = m.etablissement_id
    WHERE m.date_naissance IS NOT NULL AND ($1::uuid IS NULL OR m.etablissement_id = $1)`;
  const jour = (await q(`${select} ${base} AND EXTRACT(MONTH FROM m.date_naissance) = EXTRACT(MONTH FROM CURRENT_DATE) AND EXTRACT(DAY FROM m.date_naissance) = EXTRACT(DAY FROM CURRENT_DATE) ORDER BY m.nom_complet`, [perimetre])).rows;
  const mois = (await q(`${select} ${base} AND EXTRACT(MONTH FROM m.date_naissance) = EXTRACT(MONTH FROM CURRENT_DATE) AND EXTRACT(DAY FROM m.date_naissance) <> EXTRACT(DAY FROM CURRENT_DATE) ORDER BY EXTRACT(DAY FROM m.date_naissance), m.nom_complet`, [perimetre])).rows;
  return { jour, mois };
});

// Cloche de notifications internes, 29 oct. 2026 : lecture seule
// pour le membre connecté, sur l'identifiant membre du jeton,
// jamais sur un identifiant fourni par le client. Un membre ne
// voit donc jamais la notification de paiement d'un autre membre.
app.get('/notifications', { preHandler: membreG }, async (req) => {
  // Rappel de cotisation entretenu à chaque lecture : un seul par
  // mois, à partir du 15, effacé seul dès que le mois est soldé.
  await entretenirRappelCotisation(req.user.mid);
  // Rappel mensuel des versements de camp, 31 oct. 2026 : un seul
  // par camp et par mois, tant que le solde reste, arrêté 12 jours
  // avant le début du camp.
  await entretenirRappelsCamp(req.user.mid);
  const list = (
    await q(
      `SELECT id, type, titre, message, lien_type, lien_id, lue, cree_le FROM notifications
       WHERE membre_id = $1 ORDER BY cree_le DESC, id DESC LIMIT 100`,
      [req.user.mid],
    )
  ).rows;
  const nonLues = (await q(`SELECT COUNT(*)::int AS n FROM notifications WHERE membre_id = $1 AND NOT lue`, [req.user.mid])).rows[0]?.n ?? 0;
  return { notifications: list, non_lues: nonLues };
});
app.post('/notifications/:id/lue', { preHandler: membreG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const r = await q(`UPDATE notifications SET lue = true WHERE id = $1 AND membre_id = $2 RETURNING id`, [id, req.user.mid]);
  if (!r.rows[0]) throw httpError(404, 'Introuvable.');
  return { ok: true };
});
app.post('/notifications/tout-lire', { preHandler: membreG }, async (req) => {
  const r = await q(`UPDATE notifications SET lue = true WHERE membre_id = $1 AND NOT lue`, [req.user.mid]);
  return { ok: true, marquees: r.rowCount ?? 0 };
});

app.get('/admin/audit', { preHandler: adminG }, async (req) => {
  return (
    await q(
      `SELECT a.id, a.action, a.entite, a.entite_id, a.details, a.horodatage,
         m.nom_complet AS acteur_nom, m.matricule AS acteur_matricule
       FROM audit a LEFT JOIN membres m ON m.id = a.acteur_id
       ORDER BY a.horodatage DESC LIMIT 200`,
    )
  ).rows;
});

// Question de quiz : 4 choix, une seule bonne réponse (vérifié aussi par la base).
app.post('/admin/quiz/questions', { preHandler: adminG }, async (req, reply) => {
  const b = z
    .object({
      personnage: z.string().trim().min(1).max(120),
      testament: z.enum(['ancien', 'nouveau']),
      enonce: txt,
      reference_verset: z.string().trim().min(1).max(80),
      explication: opt(txt),
      choix: z.array(z.string().trim().min(1).max(300)).length(4),
      bonne: z.number().int().min(1).max(4), // position de la bonne réponse
    })
    .parse(req.body);
  const out = await tx(async (c) => {
    const pers = (
      await c.query(
        'INSERT INTO quiz_personnages (nom, testament) VALUES ($1,$2) ON CONFLICT (nom) DO UPDATE SET nom = EXCLUDED.nom RETURNING id',
        [b.personnage, b.testament],
      )
    ).rows[0];
    const qu = (
      await c.query(
        'INSERT INTO quiz_questions (personnage_id, enonce, reference_verset, explication) VALUES ($1,$2,$3,$4) RETURNING id',
        [pers.id, b.enonce, b.reference_verset, b.explication ?? null],
      )
    ).rows[0];
    for (let i = 0; i < 4; i++) {
      await c.query('INSERT INTO quiz_choix (question_id, position, libelle, est_correct) VALUES ($1,$2,$3,$4)', [qu.id, i + 1, b.choix[i], i + 1 === b.bonne]);
    }
    await audit(c, req, 'quiz.question_creee', 'quiz_questions', qu.id);
    return qu;
  });
  return reply.code(201).send(out);
});

// ───────────────────────── Téléversement (type réel vérifié) ─────────────────────────
const AUTORISES = {
  livre: { mimes: ['application/pdf', 'application/epub+zip'], max: 50 * 1024 * 1024 },
  audio: { mimes: ['audio/mpeg', 'audio/mp4', 'audio/x-m4a', 'audio/aac', 'audio/ogg', 'audio/vnd.wave', 'audio/x-wav'], max: 100 * 1024 * 1024 },
  image: { mimes: ['image/jpeg', 'image/png', 'image/webp'], max: 5 * 1024 * 1024 },
};

app.post('/admin/fichiers', { preHandler: contenuG }, async (req, reply) => {
  const { type } = z.object({ type: z.enum(['livre', 'audio', 'image']) }).parse(req.query);
  if (type !== 'image' && req.user.role !== 'admin_general') throw httpError(403, 'Accès refusé.');
  const part = await req.file();
  if (!part) throw httpError(400, 'Aucun fichier reçu.');

  const rule = AUTORISES[type];
  const tmpDir = path.join(CFG.uploadDir, 'tmp');
  await fsp.mkdir(tmpDir, { recursive: true });
  const tmp = path.join(tmpDir, crypto.randomUUID());
  const hash = crypto.createHash('sha256');
  let size = 0;
  part.file.on('data', (ch) => {
    size += ch.length;
    hash.update(ch);
  });
  try {
    await pipeline(part.file, fs.createWriteStream(tmp));
    if (part.file.truncated || size > rule.max) throw httpError(413, 'Fichier trop volumineux.');
    if (size === 0) throw httpError(400, 'Fichier vide.');
    // Le type est lu dans les octets, jamais d'après le nom ou l'en-tête envoyé.
    const ft = await fileTypeFromFile(tmp);
    if (!ft || !rule.mimes.includes(ft.mime)) throw httpError(415, 'Type de fichier non autorisé.');
    const key = `${type}/${crypto.randomUUID()}.${ft.ext}`;
    await fsp.mkdir(path.dirname(path.join(CFG.uploadDir, key)), { recursive: true });
    await fsp.rename(tmp, path.join(CFG.uploadDir, key));
    const row = await tx(async (c) => {
      const r = (
        await c.query(
          `INSERT INTO fichiers (cle_stockage, nom_original, type_mime_reel, taille_octets, sha256, verifie)
           VALUES ($1,$2,$3,$4,$5,true) RETURNING id, type_mime_reel, taille_octets`,
          [key, (part.filename || '').slice(0, 200), ft.mime, size, hash.digest('hex')],
        )
      ).rows[0];
      await audit(c, req, 'fichier.televerse', 'fichiers', r.id, { type, mime: ft.mime });
      return r;
    });
    return reply.code(201).send(row);
  } finally {
    await fsp.rm(tmp, { force: true });
  }
});

// ───────────────────────── Démarrage ─────────────────────────
const stop = async () => {
  await app.close();
  await pool.end();
  process.exit(0);
};
process.on('SIGTERM', stop);
process.on('SIGINT', stop);

await fsp.mkdir(CFG.uploadDir, { recursive: true });

// Schéma initial, une seule fois, si la base est vide.
const existing = await q(
  "SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'etablissements'",
);
if (existing.rows.length === 0) {
  const schemaPath = path.resolve('schema.sql');
  const schema = await fsp.readFile(schemaPath, 'utf-8');
  await q(schema);
}

// Migrations légères, idempotentes, pour une base déjà existante :
// table des commandes PayPal, et mode de confirmation 'paypal'.
try {
  await q(`CREATE TABLE IF NOT EXISTS paypal_commandes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    paiement_id uuid NOT NULL REFERENCES paiements(id) ON DELETE RESTRICT,
    commande_id text NOT NULL UNIQUE,
    devise text NOT NULL,
    montant_devise text NOT NULL,
    statut text NOT NULL DEFAULT 'creee',
    cree_le timestamptz NOT NULL DEFAULT now()
  )`);
} catch (_) {}
try {
  await q(`ALTER TYPE mode_confirmation ADD VALUE IF NOT EXISTS 'paypal'`);
} catch (_) {}
try {
  await q(`ALTER TYPE type_paiement ADD VALUE IF NOT EXISTS 'carte'`);
} catch (_) {}
try {
  await q(`ALTER TYPE type_paiement ADD VALUE IF NOT EXISTS 'cotisation'`);
} catch (_) {}
// Paiement du camp en 6 fois, 31 oct. 2026 : le type camp rejoint
// les types de paiement, sans toucher à schema.sql.
try {
  await q(`ALTER TYPE type_paiement ADD VALUE IF NOT EXISTS 'camp'`);
} catch (_) {}
try {
  await q(`ALTER TABLE membres ADD COLUMN IF NOT EXISTS photo_donnees text`);
} catch (_) {}
try {
  await q(`ALTER TABLE membres ADD COLUMN IF NOT EXISTS fonction text NOT NULL DEFAULT ''`);
} catch (_) {}

try { await q(`ALTER TABLE membres ADD COLUMN IF NOT EXISTS derniere_activite timestamptz`); } catch (_) {}

// Rapports de bug, 29 oct. 2026 : table créée une seule fois, si elle
// n'existe pas encore, sans toucher à schema.sql.
try {
  await q(`CREATE TABLE IF NOT EXISTS rapports_bug (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid REFERENCES membres(id) ON DELETE SET NULL,
    version_app text NOT NULL DEFAULT '',
    modele text NOT NULL DEFAULT '',
    systeme text NOT NULL DEFAULT '',
    ecran text NOT NULL DEFAULT '',
    message_erreur text NOT NULL DEFAULT '',
    description text NOT NULL DEFAULT '',
    statut text NOT NULL DEFAULT 'Nouveau',
    cree_le timestamptz NOT NULL DEFAULT now(),
    corrige_version text
  )`);
} catch (_) {}

// Anniversaires, 29 oct. 2026 : date de naissance facultative du
// membre, pour la carte d'anniversaire et la liste des anniversaires.
// La colonne ne contient qu'une date, jamais un âge calculé, et les
// routes admin ne renvoient que jour et mois, jamais l'année.
try {
  await q(`ALTER TABLE membres ADD COLUMN IF NOT EXISTS date_naissance date`);
} catch (_) {}

// Moyen de paiement, 29 oct. 2026, marquage espèces depuis le scan :
// la demande ne stockait pas le moyen choisi à la création, la
// validation l'enregistre donc, et le règlement en espèces d'une
// cotisation l'enregistre aussi. Jamais de modification de schema.sql.
try {
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS moyen text CHECK (moyen IN ('especes','wave','orange_money','paypal'))`);
} catch (_) {}
try {
  await q(`ALTER TABLE cotisations ADD COLUMN IF NOT EXISTS moyen text CHECK (moyen IN ('especes','wave','orange_money','paypal'))`);
} catch (_) {}

// Paiement du camp en 6 fois, 31 oct. 2026 : un versement est une
// demande de paiement ordinaire, liée à son camp et numérotée de 1
// à 6. Une inscription créée avant ce déploiement garde
// versements_requis à faux, donc son pass reste visible comme
// avant ; seules les inscriptions créées après, pour un camp au
// tarif supérieur à 0, exigent les 6 versements. Jamais de
// modification de schema.sql.
try {
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS evenement_id uuid REFERENCES evenements(id) ON DELETE SET NULL`);
} catch (_) {}
try {
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS numero_versement smallint CHECK (numero_versement BETWEEN 1 AND 6)`);
} catch (_) {}
try {
  await q(`ALTER TABLE inscriptions ADD COLUMN IF NOT EXISTS versements_requis boolean NOT NULL DEFAULT false`);
} catch (_) {}
// Préparation du prélèvement automatique, 31 oct. 2026, sans
// activation : chaque versement porte son mois cible, pour que
// le passage à l'automatique plus tard ne demande pas de refonte
// des enregistrements. Aucun débit automatique n'est implémenté,
// les versements restent manuels de bout en bout.
try {
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS mois_cible date`);
} catch (_) {}

// Don de camp ou de retraite, 31 oct. 2026 : un don est une
// demande de paiement ordinaire de type camp, payée par celui qui
// offre (membre_id), rattachée à son bénéficiaire quand il est
// connu (beneficiaire_id), sinon gardée en attente sur le contact
// saisi (beneficiaire_contact, normalisé comme à l'inscription),
// pour s'attacher seule à la création du compte. Jamais de
// modification de schema.sql.
try {
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS beneficiaire_id uuid REFERENCES membres(id) ON DELETE SET NULL`);
} catch (_) {}
try {
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS beneficiaire_nom text`);
} catch (_) {}
try {
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS beneficiaire_contact text`);
} catch (_) {}
try {
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS message_don text`);
} catch (_) {}

// Défi quiz hebdomadaire entre établissements, 31 oct. 2026 : une
// seule participation comptée par membre et par semaine, sans
// toucher à schema.sql.
try {
  await q(`CREATE TABLE IF NOT EXISTS quiz_defi (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    semaine date NOT NULL,
    score smallint NOT NULL,
    total smallint NOT NULL DEFAULT 5,
    joue_le timestamptz NOT NULL DEFAULT now(),
    UNIQUE (membre_id, semaine),
    CHECK (score >= 0 AND score <= total AND total >= 1)
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_quiz_defi_semaine ON quiz_defi (semaine)`);
} catch (_) {}

// Historique des transactions, 30 oct. 2026 : trace du refus,
// comme la confirmation déjà tracée (confirme_le, confirme_par).
// Jamais de modification de schema.sql.
try {
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS refuse_le timestamptz`);
} catch (_) {}
try {
  await q(`ALTER TABLE paiements ADD COLUMN IF NOT EXISTS refuse_par uuid REFERENCES utilisateurs(id) ON DELETE SET NULL`);
} catch (_) {}

// Présences et journal d'audit, 29 oct. 2026, phase 1 : tables créées une
// seule fois, si elles n'existent pas encore, sans toucher à schema.sql.
// activite_id est volontairement sans clé étrangère : il désigne soit un
// camp (evenements.id), soit une activité d'établissement
// (activites_etablissement.id). La contrainte unique empêche deux présences
// pour le même membre sur la même activité, même après annulation : une
// présence annulée se réactive, elle n'est jamais effacée ni dupliquée.
try {
  await q(`CREATE TABLE IF NOT EXISTS presences (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    activite_id uuid NOT NULL,
    scanne_le timestamptz NOT NULL DEFAULT now(),
    scanne_par uuid REFERENCES membres(id) ON DELETE SET NULL,
    methode text NOT NULL CHECK (methode IN ('scan', 'manuel')),
    statut text NOT NULL DEFAULT 'present' CHECK (statut IN ('present', 'annule')),
    UNIQUE (membre_id, activite_id)
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_presences_activite ON presences (activite_id)`);
  await q(`CREATE TABLE IF NOT EXISTS audit (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    acteur_id uuid REFERENCES membres(id) ON DELETE SET NULL,
    action text NOT NULL,
    entite text NOT NULL,
    entite_id text,
    details jsonb,
    horodatage timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_audit_date ON audit (horodatage DESC)`);
} catch (_) {}

// Cloche de notifications internes, 29 oct. 2026 : une ligne par
// membre et par événement, lue à l'ouverture de l'application.
// Aucune notification poussée, aucun e-mail, aucun SMS. Les types
// sont extensibles : un nouveau type s'ajoute dans les appels à
// notifierMembre ou notifierTous, sans refonte.
try {
  await q(`CREATE TABLE IF NOT EXISTS notifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE,
    type text NOT NULL,
    titre text NOT NULL DEFAULT '',
    message text NOT NULL DEFAULT '',
    lien_type text,
    lien_id uuid,
    lue boolean NOT NULL DEFAULT false,
    cree_le timestamptz NOT NULL DEFAULT now()
  )`);
  await q(`CREATE INDEX IF NOT EXISTS ix_notifications_membre ON notifications (membre_id, cree_le DESC)`);
} catch (_) {}

// Réinitialisation assistée du mot de passe, 29 oct. 2026 : une seule
// colonne, sans toucher à schema.sql. Non nulle, le mot de passe
// stocké est un temporaire, valable jusqu'à cette date, et la
// connexion impose un changement. Nulle, le mot de passe est normal.
try {
  await q(`ALTER TABLE utilisateurs ADD COLUMN IF NOT EXISTS mot_de_passe_temporaire_expire_le timestamptz`);
} catch (_) {}

// Annonces audio, 29 oct. 2026 : cartes façon Wave sur l'accueil,
// publiées par l'administrateur général seulement, pour signaler
// une mise à jour ou expliquer un fonctionnement. Table séparée
// des enseignements, jamais réutilisée pour eux, et sans toucher
// à schema.sql. Le retrait met actif à faux, sans effacer la ligne.
try {
  await q(`CREATE TABLE IF NOT EXISTS annonces_audio (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    titre text NOT NULL,
    texte text,
    audio_id uuid REFERENCES fichiers(id) ON DELETE SET NULL,
    lien_audio text,
    actif boolean NOT NULL DEFAULT true,
    publiee_le timestamptz NOT NULL DEFAULT now()
  )`);
} catch (_) {}

// Programmation des annonces façon Facebook, 30 oct. 2026 : date
// et heure de publication choisies par l'administrateur. Nulle =
// publication immédiate, comme avant. Le drapeau notif_envoyee
// sert à ne sonner la cloche qu'une fois, à la publication.
await q(`ALTER TABLE annonces_audio ADD COLUMN IF NOT EXISTS programmee_le timestamptz`);

// Cartes vidéo, 30 oct. 2026 : titre, explication courte et
// lien vidéo lu dans l'application, téléphone seulement.
// Aucune vidéo n'est stockée en base, seul le lien l'est.
// Le retrait met actif à faux, sans effacer la ligne.
try {
  await q(`CREATE TABLE IF NOT EXISTS cartes_video (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    titre text NOT NULL,
    explication text,
    lien_video text NOT NULL,
    actif boolean NOT NULL DEFAULT true,
    publiee_le timestamptz NOT NULL DEFAULT now()
  )`);
} catch (_) {}
await q(`ALTER TABLE actualites ADD COLUMN IF NOT EXISTS programmee_le timestamptz`);
await q(`ALTER TABLE actualites ADD COLUMN IF NOT EXISTS notif_envoyee boolean NOT NULL DEFAULT false`);

// Nouveau format officiel de matricule, 31 oct. 2026 : CP-AA-NNNN,
// suite a partir de 2526, sans toucher a schema.sql.
// - Sequence dediee, atomique (nextval), jamais reutilisee.
// - Reattribution des anciens matricules (CP + 6 chiffres) en une
//   seule transaction verrouillee : d'abord le compte
//   administrateur general le plus ancien (2526), puis tous les
//   autres par ordre de creation, en sequence. Les matricules deja
//   au nouveau format ne sont jamais touches : la migration est
//   idempotente et relancable sans effet.
// - Les paiements passent en SET NULL : supprimer un membre ne
//   supprime jamais un paiement, il s'affiche « compte supprime ».
try {
  await q(`CREATE SEQUENCE IF NOT EXISTS seq_matricule_nouveau START WITH 2526`);
} catch (_) {}
try {
  await tx(async (c) => {
    await c.query('LOCK TABLE membres IN EXCLUSIVE MODE');
    const anciens = (await c.query(
      `SELECT m.id, m.nom_complet, u.role FROM membres m JOIN utilisateurs u ON u.id = m.utilisateur_id WHERE m.matricule ~ '^CP-[0-9]{6}$' ORDER BY m.inscrit_le ASC, m.id ASC`,
    )).rows;
    const idxAdmin = anciens.findIndex((r) => r.role === 'admin_general');
    const ordonnes = idxAdmin >= 0 ? [anciens[idxAdmin], ...anciens.filter((_, i) => i !== idxAdmin)] : anciens;
    let numero = 2526;
    for (const r of ordonnes) {
      const matricule = `CP-${initialesMatricule(r.nom_complet)}-${String(numero).padStart(4, '0')}`;
      await c.query('UPDATE membres SET matricule = $1 WHERE id = $2', [matricule, r.id]);
      numero += 1;
    }
    if (ordonnes.length > 0) {
      const seq = (await c.query('SELECT last_value, is_called FROM seq_matricule_nouveau')).rows[0];
      const prochain = seq.is_called ? Number(seq.last_value) + 1 : Number(seq.last_value);
      if (numero - 1 >= prochain) await c.query('SELECT setval($1, $2, true)', ['seq_matricule_nouveau', numero - 1]);
    }
  });
} catch (_) {}
try {
  const fk = (await q(
    `SELECT c.conname, c.confdeltype FROM pg_constraint c JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = ANY(c.conkey)
     WHERE c.conrelid = 'paiements'::regclass AND c.confrelid = 'membres'::regclass AND c.contype = 'f' AND a.attname = 'membre_id'`,
  )).rows[0];
  if (fk && fk.confdeltype !== 'n') {
    await q(`ALTER TABLE paiements ALTER COLUMN membre_id DROP NOT NULL`);
    await q(`ALTER TABLE paiements DROP CONSTRAINT "${fk.conname}"`);
    await q(`ALTER TABLE paiements ADD CONSTRAINT paiements_membre_id_fkey FOREIGN KEY (membre_id) REFERENCES membres(id) ON DELETE SET NULL`);
  }
} catch (_) {}

await app.listen({ port: CFG.port, host: '0.0.0.0' });
