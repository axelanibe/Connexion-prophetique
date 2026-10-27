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
};
if (CFG.jwtSecret.length < 32) throw new Error('JWT_SECRET doit contenir au moins 32 caractères.');

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
await app.register(cors, { origin: CFG.corsOrigins.length ? CFG.corsOrigins : false });
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
  if (err.code === '23505') return reply.code(409).send({ erreur: 'Cette valeur est déjà utilisée.' });
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
const membreG = guard('membre');

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

app.post('/auth/inscription', authLimit, async (req, reply) => {
  const b = z
    .object({
      email: z.string().trim().toLowerCase().email().optional(),
      telephone: z.string().trim().min(6).max(20).optional(),
      mot_de_passe: z.string().min(8).max(128),
      nom_complet: z.string().trim().min(2).max(120),
      etablissement_id: z.string().uuid().optional(),
    })
    .refine((v) => v.email || v.telephone, { message: 'Un e-mail ou un téléphone est requis.' })
    .parse(req.body);

  const hash = await argon2.hash(b.mot_de_passe, { type: argon2.argon2id });
  const out = await tx(async (c) => {
    const u = (
      await c.query(
        "INSERT INTO utilisateurs (email, telephone, mot_de_passe_hash, role) VALUES ($1,$2,$3,'membre') RETURNING id, role, etablissement_admin_id",
        [b.email ?? null, b.telephone ?? null, hash],
      )
    ).rows[0];
    // Le matricule unique est attribué par la base (séquence).
    const m = (
      await c.query(
        'INSERT INTO membres (utilisateur_id, nom_complet, etablissement_id) VALUES ($1,$2,$3) RETURNING id, matricule, nom_complet, valide_jusqua',
        [u.id, b.nom_complet, b.etablissement_id ?? null],
      )
    ).rows[0];
    const tokens = await issueTokens(c, u);
    await audit(c, { user: { sub: u.id }, ip: req.ip }, 'membre.inscrit', 'membres', m.id);
    return { membre: m, ...tokens };
  });
  return reply.code(201).send(out);
});

app.post('/auth/connexion', authLimit, async (req) => {
  const b = z.object({ identifiant: z.string().trim().min(3), mot_de_passe: z.string().min(1) }).parse(req.body);
  const u = (
    await q(
      'SELECT id, role, etablissement_admin_id, mot_de_passe_hash FROM utilisateurs WHERE actif AND (lower(email) = lower($1) OR telephone = $1)',
      [b.identifiant],
    )
  ).rows[0];
  // Même coût de calcul si l'utilisateur n'existe pas (pas d'indice sur les comptes).
  const ok = await argon2.verify(u?.mot_de_passe_hash ?? DUMMY_HASH, b.mot_de_passe).catch(() => false);
  if (!u || !ok) throw httpError(401, 'Identifiants incorrects.');
  return tx((c) => issueTokens(c, u));
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
      await c.query('SELECT id, role, etablissement_admin_id FROM utilisateurs WHERE id = $1 AND actif', [t.utilisateur_id])
    ).rows[0];
    if (!u) throw httpError(401, 'Compte inactif.');
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

app.get('/etablissements', async () => (await q('SELECT id, nom, description, image_id FROM etablissements ORDER BY nom')).rows);

app.get('/etablissements/:id', async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const e = (await q('SELECT id, nom, description, image_id FROM etablissements WHERE id = $1', [id])).rows[0];
  if (!e) throw httpError(404, 'Établissement introuvable.');
  const [activites, actualites] = await Promise.all([
    q('SELECT id, titre, description, image_id FROM activites_etablissement WHERE etablissement_id = $1 ORDER BY cree_le', [id]),
    q('SELECT id, titre, texte, image_id, publiee_le FROM actualites WHERE etablissement_id = $1 ORDER BY publiee_le DESC LIMIT 50', [id]),
  ]);
  return { ...e, activites: activites.rows, actualites: actualites.rows };
});

app.get('/actualites', async (req) => {
  const { etablissement_id } = z.object({ etablissement_id: z.string().uuid().optional() }).parse(req.query);
  return (
    await q(
      `SELECT id, etablissement_id, titre, texte, image_id, publiee_le FROM actualites
       WHERE ($1::uuid IS NULL OR etablissement_id = $1) ORDER BY publiee_le DESC LIMIT 100`,
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

// ───────────────────────── Espace membre ─────────────────────────
app.get('/moi', { preHandler: membreG }, async (req) => {
  const r = (
    await q(
      `SELECT m.id, m.matricule, m.nom_complet, m.valide_jusqua, m.inscrit_le, e.nom AS etablissement,
              (SELECT max(mois) FROM cotisations c WHERE c.membre_id = m.id) AS derniere_cotisation
       FROM membres m LEFT JOIN etablissements e ON e.id = m.etablissement_id WHERE m.id = $1`,
      [req.user.mid],
    )
  ).rows[0];
  if (!r) throw httpError(404, 'Profil introuvable.');
  return r;
});

app.post('/evenements/:id/inscription', { preHandler: membreG }, async (req, reply) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const ev = (await q('SELECT id, nom, est_kairos FROM evenements WHERE id = $1 AND publie', [id])).rows[0];
  if (!ev) throw httpError(404, 'Camp introuvable.');
  const r = (
    await q(
      `WITH ins AS (
         INSERT INTO inscriptions (evenement_id, membre_id) VALUES ($1,$2)
         ON CONFLICT (evenement_id, membre_id) DO NOTHING RETURNING code_pass, inscrit_le)
       SELECT code_pass, inscrit_le FROM ins
       UNION ALL SELECT code_pass, inscrit_le FROM inscriptions WHERE evenement_id = $1 AND membre_id = $2 LIMIT 1`,
      [id, req.user.mid],
    )
  ).rows[0];
  const m = (await q('SELECT nom_complet, matricule FROM membres WHERE id = $1', [req.user.mid])).rows[0];
  // Camp National Kairos : le pass est aussi le badge (nom, matricule, QR), visible tout de suite.
  return reply.code(201).send({ evenement: ev.nom, badge: ev.est_kairos, code_pass: r.code_pass, inscrit_le: r.inscrit_le, ...m });
});

app.get('/moi/inscriptions', { preHandler: membreG }, async (req) =>
  (
    await q(
      `SELECT i.code_pass, i.inscrit_le, e.id AS evenement_id, e.nom, e.date_debut, e.lieu, e.est_kairos
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
      `SELECT p.reference, p.type, p.montant_fcfa, p.statut, p.cree_le, p.confirme_le,
              COALESCE((SELECT json_agg(json_build_object('livre_id', l.livre_id, 'titre', l.titre_copie, 'auteur', l.auteur_copie, 'prix_fcfa', l.prix_copie_fcfa))
                        FROM achats_lignes l WHERE l.paiement_id = p.id), '[]') AS lignes
       FROM paiements p WHERE p.membre_id = $1 ORDER BY p.cree_le DESC LIMIT 100`,
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
async function confirmPayment(c, id, mode, byUser, txId) {
  const r = await c.query(
    `UPDATE paiements SET statut = 'confirme', mode_confirmation = $2, confirme_le = now(), confirme_par = $3,
            wave_transaction_id = COALESCE($4, wave_transaction_id)
     WHERE id = $1 AND statut = 'en_attente' RETURNING *`,
    [id, mode, byUser, txId ?? null],
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
      .text(`Paiement : Wave, confirmé`);
    doc.moveDown();
    if (lignes.length === 0) {
      doc.fontSize(11).text(p.type === 'don' ? 'Contribution (don)' : 'Paiement');
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
      `SELECT p.*, m.nom_complet, m.matricule FROM paiements p JOIN membres m ON m.id = p.membre_id
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

  if (confirmedId) ensureInvoice(confirmedId).catch((e) => app.log.error(e));
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

// ───────────────────────── Espace structure : paiements ─────────────────────────
// Montants en attente présents plus d'une fois : à rapprocher manuellement.
app.get('/admin/paiements/doublons', { preHandler: adminG }, async () =>
  (
    await q(
      `SELECT montant_fcfa, count(*) AS nombre, json_agg(json_build_object('reference', reference, 'nom', m.nom_complet, 'matricule', m.matricule, 'cree_le', p.cree_le) ORDER BY p.cree_le) AS demandes
       FROM paiements p JOIN membres m ON m.id = p.membre_id
       WHERE p.statut = 'en_attente' GROUP BY montant_fcfa HAVING count(*) > 1 ORDER BY montant_fcfa`,
    )
  ).rows);

app.get('/admin/paiements', { preHandler: adminG }, async (req) => {
  const { statut } = z.object({ statut: z.enum(['en_attente', 'confirme', 'refuse', 'annule']).optional() }).parse(req.query);
  return (
    await q(
      `SELECT p.id, p.reference, p.type, p.montant_fcfa, p.statut, p.wave_transaction_id, p.cree_le, m.nom_complet, m.matricule
       FROM paiements p JOIN membres m ON m.id = p.membre_id
       WHERE ($1::statut_paiement IS NULL OR p.statut = $1) ORDER BY p.cree_le DESC LIMIT 200`,
      [statut ?? null],
    )
  ).rows;
});

// Validation explicite : la structure a contrôlé son compte Wave.
app.post('/admin/paiements/:id/valider', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  const b = z.object({ wave_transaction_id: z.string().trim().min(6).max(64).optional() }).parse(req.body ?? {});
  const p = await tx(async (c) => {
    const r = await confirmPayment(c, id, 'validation_structure', req.user.sub, b.wave_transaction_id);
    if (!r) throw httpError(409, 'Demande introuvable ou déjà traitée.');
    await audit(c, req, 'paiement.valide', 'paiements', id, { reference: r.reference, montant: r.montant_fcfa });
    return r;
  });
  ensureInvoice(p.id).catch((e) => app.log.error(e));
  return { reference: p.reference, statut: p.statut };
});

app.post('/admin/paiements/:id/refuser', { preHandler: adminG }, async (req) => {
  const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
  return tx(async (c) => {
    const r = (await c.query("UPDATE paiements SET statut = 'refuse' WHERE id = $1 AND statut = 'en_attente' RETURNING reference, statut", [id])).rows[0];
    if (!r) throw httpError(409, 'Demande introuvable ou déjà traitée.');
    await audit(c, req, 'paiement.refuse', 'paiements', id, { reference: r.reference });
    return r;
  });
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
  return { reference: p.reference, statut: p.statut };
});

// ───────────────────────── Espace structure : contenus ─────────────────────────
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const txt = z.string().trim().min(1).max(5000);
const opt = (s) => s.nullable().optional();

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

function crud(route, table, schema, label) {
  app.post(`/admin/${route}`, { preHandler: adminG }, async (req, reply) => {
    const body = clean(schema.parse(req.body));
    const [sql, params] = insertSql(table, body);
    const row = await tx(async (c) => {
      const r = (await c.query(sql, params)).rows[0];
      await audit(c, req, `${label}.cree`, table, r.id);
      return r;
    });
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
crud('evenements', 'evenements', evenementS, 'evenement');

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
    z.object({ etablissement_id: opt(z.string().uuid()), titre: z.string().trim().min(1).max(200), texte: txt, image_id: opt(z.string().uuid()) }).parse(req.body),
  );
  if (req.user.role === 'admin_etablissement' && (!b.etablissement_id || !peutGerer(req, b.etablissement_id))) {
    throw httpError(403, 'Vous ne pouvez publier que pour votre établissement.');
  }
  const [sql, params] = insertSql('actualites', { ...b, auteur_id: req.user.sub });
  return reply.code(201).send((await q(sql, params)).rows[0]);
});

app.post('/admin/enseignements', { preHandler: adminG }, async (req, reply) => {
  const b = clean(
    z.object({ titre: z.string().trim().min(1).max(200), orateur: opt(z.string().trim().max(200)), description: opt(txt), audio_id: opt(z.string().uuid()) }).parse(req.body),
  );
  const [sql, params] = insertSql('enseignements', b);
  return reply.code(201).send((await q(sql, params)).rows[0]);
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

app.post('/admin/cotisations', { preHandler: adminG }, async (req, reply) => {
  const b = z.object({ matricule: z.string().trim().min(3), mois: date }).parse(req.body);
  const m = (await q('SELECT id FROM membres WHERE matricule = $1', [b.matricule])).rows[0];
  if (!m) throw httpError(404, 'Matricule inconnu.');
  const r = (
    await q(
      "INSERT INTO cotisations (membre_id, mois, enregistre_par) VALUES ($1, date_trunc('month', $2::date)::date, $3) RETURNING *",
      [m.id, b.mois, req.user.sub],
    )
  ).rows[0];
  return reply.code(201).send(r);
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

await app.listen({ port: CFG.port, host: '0.0.0.0' });
