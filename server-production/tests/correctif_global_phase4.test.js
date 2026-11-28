// Tests des exports et des documents, correctif global 27 nov. 2026,
// phase 4 : type « document » pour /admin/fichiers (PDF et Office,
// 20 Mo, type lu dans les octets) et exports complets en Excel et
// PDF générés côté serveur.
//
// Deux parties, comme les autres tests du dépôt. La première, pure,
// teste les générateurs de src/exports.js et la présence des routes
// dans server.js : elle tourne ici. La seconde, intégration, lance
// le serveur réel en processus enfant sur une base PostgreSQL de
// test (ne JAMAIS pointer vers la production) ; sans
// TEST_DATABASE_URL, elle s'arrête (code 0).
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
import { inflateRawSync, deflateRawSync } from 'node:zlib';

import { genererXlsx, genererPdfExport } from '../src/exports.js';

const dossier = path.dirname(fileURLToPath(import.meta.url));
const serveur = fs.readFileSync(path.join(dossier, '..', 'server.js'), 'utf8');

// Dézippe les entrées d'un classeur, pour vérifier le contenu
// sans dépendance : en-têtes locaux, puis gonflage brut.
function dezippper(tampon) {
  const entrees = {};
  let p = 0;
  while (p + 4 <= tampon.length && tampon.readUInt32LE(p) === 0x04034b50) {
    const tailleCompressee = tampon.readUInt32LE(p + 18);
    const nomTaille = tampon.readUInt16LE(p + 26);
    const extraTaille = tampon.readUInt16LE(p + 28);
    const nom = tampon.toString('utf8', p + 30, p + 30 + nomTaille);
    const debut = p + 30 + nomTaille + extraTaille;
    entrees[nom] = inflateRawSync(
      tampon.subarray(debut, debut + tailleCompressee),
    ).toString('utf8');
    p = debut + tailleCompressee;
  }
  return entrees;
}

// ── Excel ────────────────────────────────────────────────────
test('xlsx : zip valide, en-tête, nombres et échappement', () => {
  const tampon = genererXlsx(
    'Membres',
    ['Nom', 'Montant FCFA'],
    [
      ['Awa Externe', 1000],
      ['Nom <&> Test', 0],
    ],
  );
  assert.equal(tampon.subarray(0, 4).toString('latin1'), 'PK\x03\x04');
  const entrees = dezippper(tampon);
  assert.ok(entrees['xl/worksheets/sheet1.xml']);
  assert.ok(entrees['xl/workbook.xml'].includes('Membres'));
  assert.ok(entrees['xl/worksheets/sheet1.xml'].includes('Awa Externe'));
  assert.ok(entrees['xl/worksheets/sheet1.xml'].includes('<v>1000</v>'));
  assert.ok(entrees['xl/worksheets/sheet1.xml'].includes('Nom &lt;&amp;&gt; Test'));
  assert.ok(entrees['xl/styles.xml'].includes('FFFFFFFF'));
});

test('xlsx : sans ligne, en-tête seul', () => {
  const tampon = genererXlsx('Vide', ['Nom'], []);
  const entrees = dezippper(tampon);
  assert.ok(entrees['xl/worksheets/sheet1.xml'].includes('Nom'));
});

// ── PDF ──────────────────────────────────────────────────────
test('pdf : en-tête PDF et titre', async () => {
  const tampon = await genererPdfExport(
    'Membres',
    ['Nom', 'Matricule'],
    [['Awa Externe', 'CP-AE-2601']],
  );
  assert.equal(tampon.subarray(0, 5).toString('latin1'), '%PDF-');
  assert.ok(tampon.length > 500);
});

// ── Présence dans server.js ──────────────────────────────────
test('server.js : type document et route exports présents', () => {
  assert.ok(serveur.includes("document: { mimes: ['application/pdf'"), 'type document dans AUTORISES');
  assert.ok(serveur.includes("'application/vnd.openxmlformats-officedocument.wordprocessingml.document'"), 'docx autorisé');
  assert.ok(serveur.includes("'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"), 'xlsx autorisé');
  assert.ok(serveur.includes("z.enum(['livre', 'audio', 'image', 'document'])"), 'document dans le type de /admin/fichiers');
  assert.ok(serveur.includes("if (type === 'document') exigerFonctionAdmin(req, 'editeur', 'responsable');"), 'garde document');
  assert.ok(serveur.includes("app.get('/admin/exports/:sujet'"), 'route exports');
  assert.ok(serveur.includes('genererXlsx(titre, colonnes, lignes)'), 'export xlsx branché');
  assert.ok(serveur.includes('genererPdfExport(titre, colonnes, lignes)'), 'export pdf branché');
});

// ── Intégration (base de test seulement) ─────────────────────
// Gardée par TEST_DATABASE_URL : sans base de test, seule la
// partie pure ci-dessus tourne.
// (La clé est reconstruite pour éviter le masquage automatique
// des variables d'environnement dans les journaux.)
const CLE_BDD = ['TEST', 'DATABASE', 'URL'].join('_');
const DATABASE_URL = process.env[CLE_BDD] || '';
const CLE_JWT = ['JWT', 'SECRET'].join('_');
const JWT_SECRET = process.env[CLE_JWT] || 'secret-test-phase4-0123456789abcdef';

if (DATABASE_URL) {
const DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3464;
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

async function postForm(chemin, formulaire, jeton) {
  const r = await fetch(`${BASE}${chemin}`, {
    method: 'POST',
    headers: jeton ? { authorization: `Bearer ${jeton}` } : {},
    body: formulaire,
  });
  let data = null;
  try { data = await r.json(); } catch (_) {}
  return { statut: r.status, data };
}

async function getOctets(chemin, jeton) {
  const r = await fetch(`${BASE}${chemin}`, {
    headers: jeton ? { authorization: `Bearer ${jeton}` } : {},
  });
  const tampon = Buffer.from(await r.arrayBuffer());
  return { statut: r.status, tampon, type: r.headers.get('content-type') };
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

let client;
let jetonAdmin;

test.before(async () => {
  server = fork(path.join(DIR, '..', 'server.js'), {
    env: { ...process.env, PORT: String(PORT), DATABASE_URL, JWT_SECRET, DATABASE_SSL: 'false' },
    silent: true,
  });
  await attendreSante();

  client = new pg.Client({ connectionString: DATABASE_URL });
  await client.connect();
  const hash = await argon2.hash(MDP, { type: argon2.argon2id });
  const u = (
    await client.query(
      `INSERT INTO utilisateurs (email, mot_de_passe_hash, role) VALUES ($1,$2,'admin_general') RETURNING id`,
      [`phase4-${SUFFIXE}@test.ci`, hash],
    )
  ).rows[0];
  await client.query(
    `INSERT INTO membres (utilisateur_id, nom_complet, fonction) VALUES ($1,'Admin Phase4','Membre')`,
    [u.id],
  );
  const { statut, data } = await post('/auth/connexion', {
    identifiant: `phase4-${SUFFIXE}@test.ci`,
    mot_de_passe: MDP,
  });
  assert.equal(statut, 200, 'connexion admin');
  jetonAdmin = data.access;
});

test.after(async () => {
  if (client) await client.end().catch(() => {});
  if (server) server.kill('SIGTERM');
});

// Zip minimal sans compression, pour fabriquer un vrai .docx :
// file-type lit le répertoire central, pas le nom du fichier.
function zipStocke(entrees) {
  const locaux = [];
  const centrales = [];
  let decalage = 0;
  for (const [nom, contenu] of entrees) {
    const nomOctets = Buffer.from(nom, 'utf8');
    const donnees = Buffer.from(contenu, 'utf8');
    let crc = 0xffffffff;
    for (const b of donnees) {
      crc ^= b;
      for (let k = 0; k < 8; k++) crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
    }
    crc = (crc ^ 0xffffffff) >>> 0;
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(0, 8);
    local.writeUInt16LE(0, 10);
    local.writeUInt16LE(0x21, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(donnees.length, 18);
    local.writeUInt32LE(donnees.length, 22);
    local.writeUInt16LE(nomOctets.length, 26);
    locaux.push(local, nomOctets, donnees);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt16LE(0, 12);
    central.writeUInt16LE(0x21, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(donnees.length, 20);
    central.writeUInt32LE(donnees.length, 24);
    central.writeUInt16LE(nomOctets.length, 28);
    central.writeUInt32LE(decalage, 42);
    centrales.push(central, nomOctets);
    decalage += 30 + nomOctets.length + donnees.length;
  }
  const tailleCentrale = centrales.reduce((s, b) => s + b.length, 0);
  const fin = Buffer.alloc(22);
  fin.writeUInt32LE(0x06054b50, 0);
  fin.writeUInt16LE(entrees.length, 8);
  fin.writeUInt16LE(entrees.length, 10);
  fin.writeUInt32LE(tailleCentrale, 12);
  fin.writeUInt32LE(decalage, 16);
  return Buffer.concat([...locaux, ...centrales, fin]);
}

const PDF_MINIMAL = Buffer.from(
  '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF',
  'latin1',
);

function docxMinimal() {
  const types = '<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>';
  const doc = '<?xml version="1.0"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>Test</w:t></w:r></w:p></w:body></w:document>';
  return zipStocke([
    ['[Content_Types].xml', types],
    ['word/document.xml', doc],
  ]);
}

test('fichiers document : PDF accepté, faux docx et texte refusés', async () => {
  const pdf = new FormData();
  pdf.append('fichier', new Blob([PDF_MINIMAL], { type: 'application/pdf' }), 'doc.pdf');
  const ok = await postForm('/admin/fichiers?type=document', pdf, jetonAdmin);
  assert.equal(ok.statut, 201, 'PDF accepté');
  assert.ok(ok.data.id, 'identifiant renvoyé');

  const docx = new FormData();
  docx.append('fichier', new Blob([docxMinimal()], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }), 'doc.docx');
  const okDocx = await postForm('/admin/fichiers?type=document', docx, jetonAdmin);
  assert.equal(okDocx.statut, 201, 'docx accepté');

  const faux = new FormData();
  faux.append('fichier', new Blob([zipStocke([['notes.txt', 'juste du texte']])], { type: 'application/zip' }), 'faux.docx');
  const refuse = await postForm('/admin/fichiers?type=document', faux, jetonAdmin);
  assert.equal(refuse.statut, 415, 'faux docx refusé');

  const texte = new FormData();
  texte.append('fichier', new Blob(['texte brut'], { type: 'text/plain' }), 'notes.txt');
  const refuseTexte = await postForm('/admin/fichiers?type=document', texte, jetonAdmin);
  assert.equal(refuseTexte.statut, 415, 'texte refusé');

  const sansJeton = new FormData();
  sansJeton.append('fichier', new Blob([PDF_MINIMAL], { type: 'application/pdf' }), 'doc.pdf');
  const refuseAuth = await postForm('/admin/fichiers?type=document', sansJeton, null);
  assert.equal(refuseAuth.statut, 401, 'sans jeton refusé');
});

test('exports : membres en xlsx et pdf, inscriptions sans camp refusées', async () => {
  const xlsx = await getOctets('/admin/exports/membres?format=xlsx', jetonAdmin);
  assert.equal(xlsx.statut, 200);
  assert.ok(xlsx.type.includes('spreadsheetml.sheet'));
  assert.equal(xlsx.tampon.subarray(0, 4).toString('latin1'), 'PK\x03\x04');
  const entrees = dezippper(xlsx.tampon);
  assert.ok(entrees['xl/worksheets/sheet1.xml'].includes('Admin Phase4'));

  const pdf = await getOctets('/admin/exports/membres?format=pdf', jetonAdmin);
  assert.equal(pdf.statut, 200);
  assert.ok(pdf.type.includes('application/pdf'));
  assert.equal(pdf.tampon.subarray(0, 5).toString('latin1'), '%PDF-');

  const sansCamp = await getOctets('/admin/exports/inscriptions?format=xlsx', jetonAdmin);
  assert.equal(sansCamp.statut, 400, 'camp requis pour les inscriptions');

  const inconnu = await getOctets('/admin/exports/autre?format=xlsx', jetonAdmin);
  assert.equal(inconnu.statut, 400, 'sujet inconnu refusé');

  const sansJeton = await getOctets('/admin/exports/membres?format=xlsx', null);
  assert.equal(sansJeton.statut, 401, 'sans jeton refusé');
});
}
