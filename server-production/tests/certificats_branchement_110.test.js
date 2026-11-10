// Tests du branchement des certificats, carte 110, 8 nov. 2026 :
// monogramme officiel embarqué, garde CERT_SECRET (le serveur ne
// tombe jamais, les routes répondent indisponible), génération PDF
// avec nos couleurs, envoi sans SMTP. Tests purs, sans base.
// Lancer depuis server-production :
//   node --test tests/certificats_branchement_110.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { LOGO_JPG } from '../src/logo.js';
import { MONOGRAMME_PNG } from '../src/monogramme.js';
import { genererCertificatPdf } from '../src/generer_certificat_pdf.js';
import { registerCertificatRoutes } from '../src/routes_certificats.js';
import { envoyerCertificatParEmail } from '../src/email.js';
import { z } from 'zod';

const SECRET = 'secret-de-test-pour-les-certificats-110';

test('logotype embarqué : JPEG valide, mêmes octets que le JPEG fourni par Axel', () => {
  assert.equal(LOGO_JPG.subarray(0, 3).toString('hex'), 'ffd8ff');
  assert.equal(LOGO_JPG.length, 53544);
});

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
  // Le logotype JPEG est embarqué en en-tête (DCTDecode) : le PDF
  // dépasse alors les 90 000 octets.
  assert.ok(texte.includes('/DCTDecode'), 'le logotype JPEG doit être embarqué');
  assert.ok(pdf.length > 90000, `PDF trop petit (${pdf.length} octets), logotype absent ?`);
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
  // Carte 121, 10 nov. 2026 : renvoi du certificat par mail.
  ['POST', '/moi/certificat-adhesion/envoyer'],
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
  assert.equal(app.routes.length, 6);
  let code = null;
  const reply = { code: (c) => { code = c; return reply; }, type: () => reply, send: () => reply };
  await app.routes[0].handler({}, reply);
  assert.equal(code, 503);
});

test('avec CERT_SECRET : les 5 routes sont branchées, les 4 privées avec leurs gardes', () => {
  const app = fausseApp();
  registerCertificatRoutes(app, faussesDependances(SECRET));
  assert.deepEqual(app.routes.map((r) => [r.methode, r.chemin]), CHEMINS);
  for (const r of app.routes.slice(0, 5)) {
    assert.equal(typeof r.opts?.preHandler, 'function', `${r.methode} ${r.chemin} doit avoir une garde`);
  }
  // La page de vérification est publique par conception : c'est
  // elle que voit une personne qui scanne le QR, sans compte.
  assert.equal(app.routes[5].opts?.preHandler, undefined);
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

// Carte 121, 10 nov. 2026 : la route de renvoi du certificat
// par mail dit la vérité : succès quand l'envoi part, 403 quand
// l'adhésion n'est pas validée, 409 quand le compte n'a pas
// d'adresse e-mail.
test('carte 121 : POST /moi/certificat-adhesion/envoyer renvoie le certificat par mail', async () => {
  // Les dépendances sont déstructurées à l'enregistrement : un
  // cas par inscription, avec sa propre fonction q.
  const inscrire = (q) => {
    const app = fausseApp();
    const deps = faussesDependances(SECRET);
    deps.envoyerCertificat = async () => true;
    deps.q = q;
    registerCertificatRoutes(app, deps);
    return app.routes.find((r) => r.chemin === '/moi/certificat-adhesion/envoyer');
  };
  const req = { user: { mid: 'm1' } };
  const succes = inscrire(async (sql) => {
    if (sql.includes('statut_adhesion')) return { rows: [{ id: 'm1', statut_adhesion: 'validee' }] };
    if (sql.includes('u.email')) return { rows: [{ email: 'membre@example.org' }] };
    if (sql.includes('FROM certificats')) return { rows: [{ id: 'c1', matricule: 'CP-AA-2526', numero: 'CERT-000001' }] };
    return { rows: [] };
  });
  assert.deepEqual(await succes.handler(req), { envoye: true, numero: 'CERT-000001' });
  const nonValidee = inscrire(async (sql) => (sql.includes('statut_adhesion')
    ? { rows: [{ id: 'm1', statut_adhesion: 'en_attente' }] }
    : { rows: [] }));
  await assert.rejects(() => nonValidee.handler(req), (e) => e.statusCode === 403);
  const sansCourriel = inscrire(async (sql) => (sql.includes('statut_adhesion')
    ? { rows: [{ id: 'm1', statut_adhesion: 'validee' }] }
    : { rows: [] }));
  await assert.rejects(() => sansCourriel.handler(req), (e) => e.statusCode === 409);
});
