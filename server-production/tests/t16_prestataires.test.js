// Tests T16, 26 nov. 2026 : infrastructure moyens de paiement.
// Prestataires Wave, MTN MoMo, Orange Money et CinetPay pour la
// carte : une seule interface, registre par la configuration,
// aucun paiement confirmé sans vérification côté serveur.
// Les tests purs n'ont besoin ni de base ni de réseau : l'appel
// HTTP est injecté. Les routes tournent sur un serveur réel en
// processus enfant sur une base de test (ne JAMAIS pointer
// vers la production).
import test from 'node:test';
import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import argon2 from 'argon2';
import {
  listeMoyens,
  prestataireDisponible,
  normaliserMsisdn,
  statutMtn,
  statutOrange,
  statutCinetpay,
  referenceWebhook,
  creerPaiementPrestataire,
  verifierPaiementPrestataire,
} from '../src/prestataires_paiement.js';

const CFG_VIDE = {};
const CFG_WAVE = { wavePayUrl: 'https://pay.wave.com/m/test/c/ci/' };
const CFG_MTN = {
  mtnMomoSubscriptionKey: 'cle-abonnement',
  mtnMomoApiUser: 'utilisateur-api',
  mtnMomoApiKey: 'cle-api',
  mtnMomoEnvironnement: 'sandbox',
};
const CFG_ORANGE = {
  orangeClientId: 'client',
  orangeClientSecret: 'secret',
  orangeMerchantKey: 'marchand',
};
const CFG_CINETPAY = { cinetpayApiKey: 'cle-api', cinetpaySiteId: 'site' };

// Faux appel HTTP, qui enregistre les appels et répond selon
// la table, comme fetch : { ok, status, json }.
function fauxAppel(table) {
  const appels = [];
  const fn = async (url, options = {}) => {
    appels.push({ url, options });
    const cle = `${options.method ?? 'GET'} ${url}`;
    const trouve = table[cle];
    if (!trouve) throw new Error(`appel non prévu : ${cle}`);
    return {
      ok: trouve.statut >= 200 && trouve.statut < 300,
      status: trouve.statut,
      json: async () => trouve.corps,
    };
  };
  fn.appels = appels;
  return fn;
}

// ── Registre ─────────────────────────────────────────────────
test('T16, registre : rien de disponible sans configuration', () => {
  const moyens = listeMoyens(CFG_VIDE);
  assert.deepEqual(
    moyens.map((m) => m.id),
    ['wave', 'mtn', 'orange', 'cinetpay'],
  );
  assert.equal(moyens.every((m) => m.disponible === false), true);
});

test('T16, registre : chaque prestataire s’active par ses identifiants seuls', () => {
  assert.equal(prestataireDisponible('wave', CFG_WAVE), true);
  assert.equal(prestataireDisponible('mtn', CFG_MTN), true);
  assert.equal(prestataireDisponible('orange', CFG_ORANGE), true);
  assert.equal(prestataireDisponible('cinetpay', CFG_CINETPAY), true);
  assert.equal(prestataireDisponible('mtn', { ...CFG_MTN, mtnMomoApiKey: '' }), false);
  assert.equal(prestataireDisponible('orange', { ...CFG_ORANGE, orangeMerchantKey: '' }), false);
  assert.equal(prestataireDisponible('cinetpay', { ...CFG_CINETPAY, cinetpaySiteId: '' }), false);
  assert.equal(prestataireDisponible('wave', CFG_VIDE), false);
  assert.equal(prestataireDisponible('inconnu', CFG_WAVE), false);
});

// ── Numéro MTN ───────────────────────────────────────────────
test('T16, MTN : numéro normalisé en indicatif 225, formats refusés', () => {
  assert.equal(normaliserMsisdn('05 00 11 22 33'), '225500112233');
  assert.equal(normaliserMsisdn('+225 05 00 11 22 33'), '225500112233');
  assert.equal(normaliserMsisdn('225500112233'), '225500112233');
  assert.equal(normaliserMsisdn('123'), null);
  assert.equal(normaliserMsisdn(''), null);
  assert.equal(normaliserMsisdn(null), null);
});

// ── Statuts ──────────────────────────────────────────────────
test('T16, statuts : succès, refus et inconnus vers confirme, refuse, en attente', () => {
  assert.equal(statutMtn('SUCCESSFUL'), 'confirme');
  assert.equal(statutMtn('FAILED'), 'refuse');
  assert.equal(statutMtn('REJECTED'), 'refuse');
  assert.equal(statutMtn('PENDING'), 'en_attente');
  assert.equal(statutMtn('QUELQUECHOSE'), 'en_attente');
  assert.equal(statutOrange('SUCCESS'), 'confirme');
  assert.equal(statutOrange('FAILED'), 'refuse');
  assert.equal(statutOrange('PENDING'), 'en_attente');
  assert.equal(statutCinetpay('ACCEPTED'), 'confirme');
  assert.equal(statutCinetpay('REFUSED'), 'refuse');
  assert.equal(statutCinetpay('PENDING'), 'en_attente');
});

// ── Référence webhook ────────────────────────────────────────
test('T16, webhook : la référence se lit dans la notification, rien d’autre', () => {
  assert.equal(referenceWebhook('mtn', { externalId: 'CARTE-1' }), 'CARTE-1');
  assert.equal(referenceWebhook('orange', { order_id: 'CARTE-2' }), 'CARTE-2');
  assert.equal(referenceWebhook('cinetpay', { cpm_trans_id: 'CARTE-3' }), 'CARTE-3');
  assert.equal(referenceWebhook('mtn', {}), null);
  assert.equal(referenceWebhook('mtn', null), null);
  assert.equal(referenceWebhook('wave', { externalId: 'CARTE-1' }), null);
});

// ── Création Wave ────────────────────────────────────────────
test('T16, Wave : lien exact, montant entier, sans appel réseau', async () => {
  const appel = fauxAppel({});
  const cree = await creerPaiementPrestataire(
    'wave',
    CFG_WAVE,
    { reference: 'CARTE-1', montantFcfa: 1000 },
    appel,
  );
  assert.equal(cree.url, 'https://pay.wave.com/m/test/c/ci/?amount=1000');
  assert.equal(cree.referencePrestataire, null);
  assert.equal(appel.appels.length, 0);
});

test('T16, Wave : non configuré, création refusée', async () => {
  await assert.rejects(
    creerPaiementPrestataire('wave', CFG_VIDE, { reference: 'CARTE-1', montantFcfa: 1000 }),
    /non configuré/,
  );
});

// ── Création MTN ─────────────────────────────────────────────
test('T16, MTN : jeton puis demande 202, pas d’URL, référence UUID gardée', async () => {
  const appel = fauxAppel({
    'POST https://sandbox.momodeveloper.mtn.com/collection/token/': {
      statut: 200,
      corps: { access_token: 'jeton-test' },
    },
    'POST https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay': {
      statut: 202,
      corps: {},
    },
  });
  const cree = await creerPaiementPrestataire(
    'mtn',
    CFG_MTN,
    { reference: 'CARTE-1', montantFcfa: 1000, telephone: '05 00 11 22 33' },
    appel,
  );
  assert.equal(cree.url, null);
  assert.match(cree.referencePrestataire, /^[0-9a-f-]{36}$/);
  const demande = appel.appels.find((a) => a.url.endsWith('/requesttopay'));
  assert.ok(demande, 'demande envoyée');
  const corps = JSON.parse(demande.options.body);
  assert.equal(corps.amount, '1000');
  assert.equal(corps.currency, 'XOF');
  assert.equal(corps.externalId, 'CARTE-1');
  assert.equal(corps.payer.partyIdType, 'MSISDN');
  assert.equal(corps.payer.partyId, '225500112233');
  assert.equal(demande.options.headers['X-Reference-Id'], cree.referencePrestataire);
});

test('T16, MTN : sans téléphone, création refusée en 400, sans appel', async () => {
  const appel = fauxAppel({});
  await assert.rejects(
    creerPaiementPrestataire('mtn', CFG_MTN, { reference: 'CARTE-1', montantFcfa: 1000 }, appel),
    /téléphone/,
  );
  assert.equal(appel.appels.length, 0);
});

test('T16, MTN : sans identifiants, création refusée', async () => {
  await assert.rejects(
    creerPaiementPrestataire(
      'mtn',
      CFG_VIDE,
      { reference: 'CARTE-1', montantFcfa: 1000, telephone: '05 00 11 22 33' },
    ),
    /non configuré/,
  );
});

// ── Création Orange ──────────────────────────────────────────
test('T16, Orange : jeton puis webpayment, URL et pay_token gardés', async () => {
  const appel = fauxAppel({
    'POST https://api.orange.com/oauth/v3/token': {
      statut: 200,
      corps: { access_token: 'jeton-test' },
    },
    'POST https://api.orange.com/orange/payment/v1/webpayment': {
      statut: 200,
      corps: { payment_url: 'https://webpayment.orange.com/page/xyz', pay_token: 'jeton-paiement' },
    },
  });
  const cree = await creerPaiementPrestataire(
    'orange',
    CFG_ORANGE,
    {
      reference: 'CARTE-1',
      montantFcfa: 1000,
      urls: { retour: 'https://exemple.ci/retour', annule: 'https://exemple.ci/annule', notification: 'https://exemple.ci/webhooks/orange' },
    },
    appel,
  );
  assert.equal(cree.url, 'https://webpayment.orange.com/page/xyz');
  assert.equal(cree.referencePrestataire, 'jeton-paiement');
  const demande = appel.appels.find((a) => a.url.endsWith('/webpayment'));
  const corps = JSON.parse(demande.options.body);
  assert.equal(corps.merchant_key, 'marchand');
  assert.equal(corps.currency, 'XOF');
  assert.equal(corps.order_id, 'CARTE-1');
  assert.equal(corps.amount, 1000);
});

// ── Création CinetPay ────────────────────────────────────────
test('T16, CinetPay : paiement 201, URL et jeton gardés, carte seulement', async () => {
  const appel = fauxAppel({
    'POST https://api-checkout.cinetpay.com/v2/payment': {
      statut: 200,
      corps: { code: '201', data: { payment_url: 'https://secure.cinetpay.co/checkout/abc', payment_token: 'jeton-cinetpay' } },
    },
  });
  const cree = await creerPaiementPrestataire(
    'cinetpay',
    CFG_CINETPAY,
    { reference: 'CARTE-1', montantFcfa: 1000, nomMembre: 'Axel Test' },
    appel,
  );
  assert.equal(cree.url, 'https://secure.cinetpay.co/checkout/abc');
  assert.equal(cree.referencePrestataire, 'jeton-cinetpay');
  const demande = appel.appels[0];
  const corps = JSON.parse(demande.options.body);
  assert.equal(corps.channels, 'CREDIT_CARD');
  assert.equal(corps.transaction_id, 'CARTE-1');
  assert.equal(corps.amount, 1000);
  assert.equal(corps.currency, 'XOF');
});

test('T16, CinetPay : création refusée sans URL', async () => {
  const appel = fauxAppel({
    'POST https://api-checkout.cinetpay.com/v2/payment': {
      statut: 200,
      corps: { code: '624', message: 'UNKNOWN_ERROR', data: {} },
    },
  });
  await assert.rejects(
    creerPaiementPrestataire('cinetpay', CFG_CINETPAY, { reference: 'CARTE-1', montantFcfa: 1000 }, appel),
    /refusée/,
  );
});

// ── Vérification ─────────────────────────────────────────────
test('T16, vérification Wave : toujours en attente, jamais par état', async () => {
  assert.equal(
    await verifierPaiementPrestataire('wave', CFG_WAVE, { reference: 'CARTE-1', montantFcfa: 1000 }),
    'en_attente',
  );
});

test('T16, vérification MTN : succès vérifié confirme, montant différent reste en attente', async () => {
  const base = 'https://sandbox.momodeveloper.mtn.com';
  const succes = fauxAppel({
    'POST https://sandbox.momodeveloper.mtn.com/collection/token/': { statut: 200, corps: { access_token: 'jeton-test' } },
    [`GET ${base}/collection/v1_0/requesttopay/uuid-test`]: {
      statut: 200,
      corps: { amount: '1000', currency: 'XOF', externalId: 'CARTE-1', financialTransactionId: 'tx-1', status: 'SUCCESSFUL' },
    },
  });
  assert.equal(
    await verifierPaiementPrestataire('mtn', CFG_MTN, { reference: 'CARTE-1', referencePrestataire: 'uuid-test', montantFcfa: 1000 }, succes),
    'confirme',
  );
  const montantFaux = fauxAppel({
    'POST https://sandbox.momodeveloper.mtn.com/collection/token/': { statut: 200, corps: { access_token: 'jeton-test' } },
    [`GET ${base}/collection/v1_0/requesttopay/uuid-test`]: {
      statut: 200,
      corps: { amount: '2000', currency: 'XOF', externalId: 'CARTE-1', financialTransactionId: 'tx-1', status: 'SUCCESSFUL' },
    },
  });
  assert.equal(
    await verifierPaiementPrestataire('mtn', CFG_MTN, { reference: 'CARTE-1', referencePrestataire: 'uuid-test', montantFcfa: 1000 }, montantFaux),
    'en_attente',
  );
  const echec = fauxAppel({
    'POST https://sandbox.momodeveloper.mtn.com/collection/token/': { statut: 200, corps: { access_token: 'jeton-test' } },
    [`GET ${base}/collection/v1_0/requesttopay/uuid-test`]: {
      statut: 200,
      corps: { amount: '1000', currency: 'XOF', externalId: 'CARTE-1', status: 'FAILED' },
    },
  });
  assert.equal(
    await verifierPaiementPrestataire('mtn', CFG_MTN, { reference: 'CARTE-1', referencePrestataire: 'uuid-test', montantFcfa: 1000 }, echec),
    'refuse',
  );
});

test('T16, vérification Orange : succès confirme, échec refuse', async () => {
  const succes = fauxAppel({
    'POST https://api.orange.com/oauth/v3/token': { statut: 200, corps: { access_token: 'jeton-test' } },
    'GET https://api.orange.com/orange/payment/v1/transactionstatus/CARTE-1': {
      statut: 200,
      corps: { status: 'SUCCESS', order_id: 'CARTE-1', amount: 1000, currency: 'XOF' },
    },
  });
  assert.equal(
    await verifierPaiementPrestataire('orange', CFG_ORANGE, { reference: 'CARTE-1', montantFcfa: 1000 }, succes),
    'confirme',
  );
  const echec = fauxAppel({
    'POST https://api.orange.com/oauth/v3/token': { statut: 200, corps: { access_token: 'jeton-test' } },
    'GET https://api.orange.com/orange/payment/v1/transactionstatus/CARTE-1': {
      statut: 200,
      corps: { status: 'FAILED', order_id: 'CARTE-1', amount: 1000, currency: 'XOF' },
    },
  });
  assert.equal(
    await verifierPaiementPrestataire('orange', CFG_ORANGE, { reference: 'CARTE-1', montantFcfa: 1000 }, echec),
    'refuse',
  );
});

test('T16, vérification CinetPay : accepté confirme, refusé refuse', async () => {
  const accepte = fauxAppel({
    'POST https://api-checkout.cinetpay.com/v2/payment/check': {
      statut: 200,
      corps: { code: '00', data: { status: 'ACCEPTED', amount: 1000, currency: 'XOF', transaction_id: 'CARTE-1' } },
    },
  });
  assert.equal(
    await verifierPaiementPrestataire('cinetpay', CFG_CINETPAY, { reference: 'CARTE-1', montantFcfa: 1000 }, accepte),
    'confirme',
  );
  const refuse = fauxAppel({
    'POST https://api-checkout.cinetpay.com/v2/payment/check': {
      statut: 200,
      corps: { code: '00', data: { status: 'REFUSED', amount: 1000, currency: 'XOF', transaction_id: 'CARTE-1' } },
    },
  });
  assert.equal(
    await verifierPaiementPrestataire('cinetpay', CFG_CINETPAY, { reference: 'CARTE-1', montantFcfa: 1000 }, refuse),
    'refuse',
  );
});

// ── Routes ───────────────────────────────────────────────────
const DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3462;
const BASE = `http://127.0.0.1:${PORT}`;
const DATABASE_URL = process.env.TEST_DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

// Sans TEST_DATABASE_URL, seuls les tests purs tournent :
// les routes sont enregistrées seulement avec une base.
if (DATABASE_URL) {
  let server;
  let client;
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

  async function getTexte(chemin) {
    const r = await fetch(`${BASE}${chemin}`);
    return { statut: r.status, texte: await r.text() };
  }

  const EMAIL_MEMBRE = `t16-${Date.now()}@test.ci`;
  const MDP = 'MotDePasseTest123';
  let jetonMembre;

  test.before(async () => {
    server = fork(path.join(DIR, '..', 'server.js'), {
      env: {
        ...process.env,
        PORT: String(PORT),
        DATABASE_URL,
        JWT_SECRET,
        DATABASE_SSL: 'false',
        WAVE_PAYMENT_LINK: 'https://pay.wave.com/m/test/c/ci/',
      },
      silent: true,
    });
    await attendreSante();
    client = new pg.Client({ connectionString: DATABASE_URL });
    await client.connect();
    const inscription = await post('/auth/inscription', {
      email: EMAIL_MEMBRE,
      mot_de_passe: MDP,
      nom_complet: 'Testeur T16',
    });
    assert.equal(inscription.statut, 202);
    const u = (await client.query('SELECT id FROM utilisateurs WHERE lower(email) = lower($1)', [EMAIL_MEMBRE])).rows[0];
    const codeHash = await argon2.hash('123456', { type: argon2.argon2id });
    await client.query(
      "INSERT INTO codes_verification_email (utilisateur_id, email, code_hash, expire_le) VALUES ($1,$2,$3, now() + interval '30 minutes')",
      [u.id, EMAIL_MEMBRE, codeHash],
    );
    const verif = await post('/auth/verifier-email', { email: EMAIL_MEMBRE, code: '123456' });
    assert.equal(verif.statut, 200);
    jetonMembre = verif.data.access;
  });

  test.after(async () => {
    if (client) await client.end().catch(() => {});
    if (server) server.kill('SIGTERM');
  });

  test('T16, routes : moyens, Wave seul disponible sans identifiants', async () => {
    const r = await get('/paiements/moyens', jetonMembre);
    assert.equal(r.statut, 200);
    assert.deepEqual(
      r.data.map((m) => m.id),
      ['wave', 'mtn', 'orange', 'cinetpay'],
    );
    assert.equal(r.data.find((m) => m.id === 'wave').disponible, true);
    assert.equal(r.data.filter((m) => m.id !== 'wave').every((m) => m.disponible === false), true);
  });

  test('T16, routes : moyens sans jeton refusés', async () => {
    const r = await get('/paiements/moyens');
    assert.equal(r.statut, 401);
  });

  test('T16, routes : payer Wave crée le paiement chez Wave, état en attente', async () => {
    const cree = await post('/paiements/carte', { montant_fcfa: 1000 }, jetonMembre);
    assert.equal(cree.statut, 201);
    const reference = cree.data.reference;
    const paye = await post(`/paiements/${reference}/payer`, { moyen: 'wave' }, jetonMembre);
    assert.equal(paye.statut, 201);
    assert.equal(paye.data.moyen, 'wave');
    assert.equal(paye.data.url, 'https://pay.wave.com/m/test/c/ci/?amount=1000');
    const etat = await get(`/paiements/${reference}/etat`, jetonMembre);
    assert.equal(etat.statut, 200);
    assert.equal(etat.data.statut, 'en_attente');
    assert.equal(etat.data.prestataire_statut, 'inconnu');
  });

  test('T16, routes : payer MTN sans identifiants répond 503, sans faux succès', async () => {
    const cree = await post('/paiements/carte', { montant_fcfa: 1000 }, jetonMembre);
    assert.equal(cree.statut, 201);
    const r = await post(`/paiements/${cree.data.reference}/payer`, { moyen: 'mtn' }, jetonMembre);
    assert.equal(r.statut, 503);
    const etat = await get(`/paiements/${cree.data.reference}/etat`, jetonMembre);
    assert.equal(etat.data.statut, 'en_attente');
  });

  test('T16, routes : moyen inconnu 400, demande inconnue 404', async () => {
    const cree = await post('/paiements/carte', { montant_fcfa: 1000 }, jetonMembre);
    assert.equal(cree.statut, 201);
    const inconnu = await post(`/paiements/${cree.data.reference}/payer`, { moyen: 'bidon' }, jetonMembre);
    assert.equal(inconnu.statut, 400);
    const absente = await post('/paiements/CARTE-ABSENTE/payer', { moyen: 'wave' }, jetonMembre);
    assert.equal(absente.statut, 404);
  });

  test('T16, routes : webhooks sans identifiants 503, retour non confirmé', async () => {
    const mtn = await post('/webhooks/mtn', { externalId: 'CARTE-1' });
    assert.equal(mtn.statut, 503);
    const orange = await post('/webhooks/orange', { order_id: 'CARTE-1' });
    assert.equal(orange.statut, 503);
    const cinetpay = await post('/webhooks/cinetpay', { cpm_trans_id: 'CARTE-1' });
    assert.equal(cinetpay.statut, 503);
    const cree = await post('/paiements/carte', { montant_fcfa: 1000 }, jetonMembre);
    const retour = await getTexte(`/paiements/retour?moyen=wave&reference=${cree.data.reference}`);
    assert.equal(retour.statut, 200);
    assert.match(retour.texte, /non confirmé/);
    const retourSans = await getTexte('/paiements/retour');
    assert.equal(retourSans.statut, 400);
  });
}
