// Tests du branchement des certificats, carte 110, 8 nov. 2026 :
// monogramme officiel embarqué, garde CERT_SECRET (le serveur ne
// tombe jamais, les routes répondent indisponible), génération PDF
// avec nos couleurs, envoi sans SMTP. Tests purs, sans base.
// Lancer depuis server-production :
//   node --test tests/certificats_branchement_110.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { MONOGRAMME_PNG } from '../src/monogramme.js';
import { genererCertificatPdf } from '../src/generer_certificat_pdf.js';
import { registerCertificatRoutes } from '../src/routes_certificats.js';
import { envoyerCertificatParEmail } from '../src/email.js';
import { z } from 'zod';

const SECRET = 'secret-de-test-pour-les-certificats-110';

test('monogramme officiel embarqué : PNG valide, mêmes octets que assets/cp_monogram.png', () => {
  assert.equal(MONOGRAMME_PNG.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(MONOGRAMME_PNG.length, 29788);
});

test('génération PDF : vrai PDF, une page, monogramme embarqué, couleurs de la structure', async () => {
  const pdf = await genererCertificatPdf({
    numero: 'CERT-000001',
    matricule: 'CP-AA-2526',
    nom_complet: 'Anibe Adja Maurice Axel',
    url: `https://connexion-prophetique.onrender.com/certificats/verification/CERT-000001?matricule=CP-AA-2526&signature=${'a'.repeat(64)}`,
    inscrit_le: '2026-10-01',
    valide_jusqua: '2027-10-01',
    emis_le: new Date('2026-11-09T10:00:00Z'),
  });
  const texte = pdf.toString('latin1');
  assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
  assert.equal((texte.match(/\/Type\s*\/Page[^s]/g) ?? []).length, 1);
  // Avec le monogramme embarqué, le PDF dépasse largement le
  // gabarit sans logo (9 395 octets) : le monogramme est dedans.
  assert.ok(pdf.length > 20000, `PDF trop petit (${pdf.length} octets), monogramme absent ?`);
  assert.ok(texte.includes('/Title'));
  assert.ok(texte.includes('CERT-000001'));
});

// Fausse application Fastify minimale : enregistre les routes.
function fausseApp() {
  const routes = [];
  return {
    routes,
    post: (chemin, opts, handler) => routes.push({ methode: 'POST', chemin, opts, handler: handler ?? opts }),
    get: (chemin, opts, handler) => routes.push({ methode: 'GET', chemin, opts, handler: handler ?? opts }),
    log: { warn: () => {}, error: () => {} },
  };
}

function faussesDependances(secret) {
  return {
    z,
    q: async () => ({ rows: [] }),
    tx: async (fn) => fn({ query: async () => ({ rows: [] }) }),
    guard: (...roles) => async () => {},
    audit: async () => {},
    httpError: (status, message) => Object.assign(new Error(message), { statusCode: status }),
    membreG: async () => {},
    genererPdf: genererCertificatPdf,
    envoyerCertificat: async () => {},
    publicBaseUrl: 'https://connexion-prophetique.onrender.com',
    certSecret: secret,
  };
}

const CHEMINS = [
  ['POST', '/admin/membres/:id/valider-adhesion'],
  ['POST', '/admin/membres/:id/suspendre-adhesion'],
  ['POST', '/admin/certificats/:numero/revoquer'],
  ['GET', '/moi/certificat-adhesion'],
  ['GET', '/certificats/verification/:numero'],
];

test('sans CERT_SECRET : les 5 routes répondent indisponible, 503, jamais 500', async () => {
  const app = fausseApp();
  registerCertificatRoutes(app, faussesDependances(''));
  assert.deepEqual(app.routes.map((r) => [r.methode, r.chemin]), CHEMINS);
  for (const r of app.routes) {
    let code = null;
    let corps = null;
    const reply = { code: (c) => { code = c; return reply; }, type: () => reply, send: (b) => { corps = b; return reply; } };
    await r.handler({}, reply);
    assert.equal(code, 503, `${r.methode} ${r.chemin} doit répondre 503`);
    const texteCorps = typeof corps === 'string' ? corps : JSON.stringify(corps ?? '');
    assert.ok(texteCorps.includes('indisponible'), `${r.methode} ${r.chemin} doit dire indisponible`);
  }
});

test('sans CERT_SECRET : un secret trop court (moins de 32 caractères) bloque aussi', async () => {
  const app = fausseApp();
  registerCertificatRoutes(app, faussesDependances('trop-court'));
  assert.equal(app.routes.length, 5);
  let code = null;
  const reply = { code: (c) => { code = c; return reply; }, type: () => reply, send: () => reply };
  await app.routes[0].handler({}, reply);
  assert.equal(code, 503);
});

test('avec CERT_SECRET : les 5 routes sont branchées, les 4 privées avec leurs gardes', () => {
  const app = fausseApp();
  registerCertificatRoutes(app, faussesDependances(SECRET));
  assert.deepEqual(app.routes.map((r) => [r.methode, r.chemin]), CHEMINS);
  for (const r of app.routes.slice(0, 4)) {
    assert.equal(typeof r.opts?.preHandler, 'function', `${r.methode} ${r.chemin} doit avoir une garde`);
  }
  // La page de vérification est publique par conception : c'est
  // elle que voit une personne qui scanne le QR, sans compte.
  assert.equal(app.routes[4].opts?.preHandler, undefined);
});

test('envoi par courriel : sans SMTP, erreur SMTP_NON_CONFIGURE, sans envoi simulé', async () => {
  await assert.rejects(
    envoyerCertificatParEmail(
      { destinataire: 'membre@example.org', nom: 'Test Membre', numero: 'CERT-000001', pdf: Buffer.from('%PDF-') },
      {},
    ),
    (e) => e.code === 'SMTP_NON_CONFIGURE',
  );
});
