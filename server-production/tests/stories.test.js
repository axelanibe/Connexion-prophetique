// Tests des stories de 24 heures, 17 nov. 2026.
//
// Partie pure seulement : elle teste les aides de src/stories.js
// sans serveur ni base, et tourne ici. La partie intégration
// (routes contre une base de test et un compartiment R2) n'est
// pas écrite : elle exigerait TEST_DATABASE_URL et les clés R2,
// saisies dans Render par Axel, jamais en chat ni dans le dépôt.
// Les routes sont vérifiées par le contrôle de démarrage et par
// l'exercice réel contre le serveur en ligne, comme pour les
// autres tranches serveur.
//
// Lancer :  npm test   (depuis server-production)
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  DUREE_STORY_HEURES,
  DUREE_URL_SIGNEE_SECONDES,
  TAILLE_MAX_PHOTO_OCTETS,
  TAILLE_MAX_VIDEO_OCTETS,
  TYPES_STORY,
  MIMES_PHOTO,
  MIMES_VIDEO,
  configR2,
  r2Actif,
  hoteR2,
  cleStory,
  cleR2Valide,
  DELAI_ENVOI_R2_MS,
  DELAI_SUPPRESSION_R2_MS,
  DELAI_LECTURE_R2_MS,
  dateExpirationStory,
  storyExpiree,
  validerPublication,
  validerEnregistrementStory,
  trouverDoublonRecent,
  urlSigneeR2,
  lireObjetR2,
  urlMediaStory,
  entetesSignesR2,
  formaterStoryPublique,
} from '../src/stories.js';

const CONFIG = {
  accountId: '9f5eba0e155b17dbf6059fff506addd8',
  accessKeyId: 'TESTACCESSKEYID',
  secretAccessKey: 'TESTSECRETACCESSKEY',
  bucket: 'connexion-prophetique-stories',
};
const DATE_FIXE = new Date('2026-11-17T12:00:00.000Z');

// ── Constantes ───────────────────────────────────────────────
test('constantes : durée 24 h, tailles et types décidés', () => {
  assert.equal(DUREE_STORY_HEURES, 24);
  assert.equal(DUREE_URL_SIGNEE_SECONDES, 900);
  assert.equal(TAILLE_MAX_PHOTO_OCTETS, 5 * 1024 * 1024);
  assert.equal(TAILLE_MAX_VIDEO_OCTETS, 25 * 1024 * 1024);
  assert.deepEqual(TYPES_STORY, ['photo', 'video']);
  assert.deepEqual(MIMES_PHOTO, ['image/jpeg', 'image/png', 'image/webp']);
  assert.deepEqual(MIMES_VIDEO, ['video/mp4', 'video/quicktime', 'video/webm']);
  assert.equal(Object.isFrozen(TYPES_STORY), true);
});

// ── Configuration R2 ─────────────────────────────────────────
test('configR2 : null quand une valeur manque, objet quand tout est là', () => {
  assert.equal(configR2({}), null);
  assert.equal(configR2({ R2_ACCOUNT_ID: 'a' }), null);
  assert.equal(configR2({ R2_ACCOUNT_ID: 'a', R2_ACCESS_KEY_ID: 'b', R2_SECRET_ACCESS_KEY: 'c' }), null);
  assert.deepEqual(
    configR2({ R2_ACCOUNT_ID: 'a', R2_ACCESS_KEY_ID: 'b', R2_SECRET_ACCESS_KEY: 'c', R2_BUCKET: 'd' }),
    { accountId: 'a', accessKeyId: 'b', secretAccessKey: 'c', bucket: 'd' },
  );
  assert.equal(r2Actif(null), false);
  assert.equal(r2Actif(CONFIG), true);
  assert.equal(hoteR2(CONFIG), '9f5eba0e155b17dbf6059fff506addd8.r2.cloudflarestorage.com');
});

// ── Clé d'objet ──────────────────────────────────────────────
test('cleStory : dossier stories, extension du type réel, unique', () => {
  const cle = cleStory('photo', 'image/jpeg');
  assert.match(cle, /^stories\/[0-9a-f-]{36}\.jpg$/);
  assert.equal(cleStory('photo', 'image/png').endsWith('.png'), true);
  assert.equal(cleStory('video', 'video/quicktime').endsWith('.mov'), true);
  assert.equal(cleStory('video', 'video/webm').endsWith('.webm'), true);
  assert.notEqual(cleStory('photo', 'image/jpeg'), cleStory('photo', 'image/jpeg'));
});

// ── Clé R2 valable, réécriture 22 nov. 2026 ───────────────
test('cleR2Valide : seulement une clé non vide dans stories/', () => {
  assert.equal(cleR2Valide('stories/abc.jpg'), true);
  assert.equal(cleR2Valide('stories/11111111-1111-1111-1111-111111111111.mp4'), true);
  assert.equal(cleR2Valide('stories/'), false);
  assert.equal(cleR2Valide(''), false);
  assert.equal(cleR2Valide(null), false);
  assert.equal(cleR2Valide(undefined), false);
  assert.equal(cleR2Valide('autre/abc.jpg'), false);
  assert.equal(cleR2Valide(123), false);
});

// ── Délais R2, réécriture 22 nov. 2026 ────────────────────
test('délais R2 : bornés et positifs, envoi plus long que suppression', () => {
  assert.ok(Number.isInteger(DELAI_ENVOI_R2_MS) && DELAI_ENVOI_R2_MS > 0);
  assert.ok(Number.isInteger(DELAI_SUPPRESSION_R2_MS) && DELAI_SUPPRESSION_R2_MS > 0);
  assert.ok(DELAI_ENVOI_R2_MS > DELAI_SUPPRESSION_R2_MS);
});

// ── Expiration ───────────────────────────────────────────────
test('dateExpirationStory : 24 heures exactement après la création', () => {
  const cree = new Date('2026-11-17T12:00:00.000Z');
  assert.equal(dateExpirationStory(cree).toISOString(), '2026-11-18T12:00:00.000Z');
});

test('storyExpiree : avant et après la limite', () => {
  const expire = '2026-11-18T12:00:00.000Z';
  assert.equal(storyExpiree(expire, new Date('2026-11-18T11:59:59.000Z')), false);
  assert.equal(storyExpiree(expire, new Date('2026-11-18T12:00:00.000Z')), true);
  assert.equal(storyExpiree(expire, new Date('2026-11-19T00:00:00.000Z')), true);
});

// ── Validation de publication ────────────────────────────────
test('validerPublication : cas valides et refus', () => {
  assert.equal(validerPublication({ type: 'photo', mime: 'image/jpeg', tailleOctets: 1000 }), null);
  assert.equal(validerPublication({ type: 'video', mime: 'video/mp4', tailleOctets: 25 * 1024 * 1024 }), null);
  assert.deepEqual(
    validerPublication({ type: 'audio', mime: 'audio/mpeg', tailleOctets: 1000 }),
    { statut: 400, message: 'Type de story invalide.' },
  );
  assert.deepEqual(
    validerPublication({ type: 'photo', mime: 'video/mp4', tailleOctets: 1000 }),
    { statut: 415, message: 'Type de média non autorisé.' },
  );
  assert.deepEqual(
    validerPublication({ type: 'photo', mime: 'image/jpeg', tailleOctets: 5 * 1024 * 1024 + 1 }),
    { statut: 413, message: 'Média trop volumineux.' },
  );
  assert.deepEqual(
    validerPublication({ type: 'video', mime: 'video/mp4', tailleOctets: 0 }),
    { statut: 413, message: 'Média trop volumineux.' },
  );
});

// ── Validation d'enregistrement, réécriture 22 nov. 2026 ─
test('validerEnregistrementStory : dossier bon, refus clairs sinon', () => {
  const bon = {
    type: 'photo',
    cle: 'stories/abc.jpg',
    mime: 'image/jpeg',
    tailleOctets: 1000,
    etablissementId: null,
    expireLe: new Date(Date.now() + 24 * 60 * 60 * 1000),
  };
  assert.equal(validerEnregistrementStory(bon), null);
  assert.equal(validerEnregistrementStory({ ...bon, type: 'audio' }).statut, 400);
  assert.equal(validerEnregistrementStory({ ...bon, cle: '' }).statut, 400);
  assert.equal(validerEnregistrementStory({ ...bon, cle: 'autre/abc.jpg' }).statut, 400);
  assert.equal(validerEnregistrementStory({ ...bon, mime: 'video/mp4' }).statut, 415);
  assert.equal(validerEnregistrementStory({ ...bon, tailleOctets: 0 }).statut, 413);
  assert.equal(validerEnregistrementStory({ ...bon, tailleOctets: 5 * 1024 * 1024 + 1 }).statut, 413);
  assert.equal(validerEnregistrementStory({ ...bon, etablissementId: 123 }).statut, 400);
  assert.equal(validerEnregistrementStory({ ...bon, expireLe: new Date(Date.now() - 1000) }).statut, 400);
  assert.equal(validerEnregistrementStory({ ...bon, expireLe: 'demain' }).statut, 400);
});

// ── Dédoublonnage, réécriture 22 nov. 2026 ───────────────
test('trouverDoublonRecent : même publication récente, sinon null', () => {
  const maintenant = new Date('2026-11-22T12:00:00.000Z');
  const candidat = { auteurId: 'auteur-1', type: 'photo', mime: 'image/jpeg', tailleOctets: 1000 };
  const recente = {
    id: '11111111-1111-1111-1111-111111111111',
    auteur_id: 'auteur-1',
    type: 'photo',
    type_mime: 'image/jpeg',
    taille_octets: 1000,
    cree_le: new Date('2026-11-22T11:59:30.000Z'),
  };
  assert.equal(trouverDoublonRecent(candidat, [recente], { maintenant }), recente);
  assert.equal(trouverDoublonRecent(candidat, [], { maintenant }), null);
  assert.equal(trouverDoublonRecent({ ...candidat, auteurId: null }, [recente], { maintenant }), null);
  assert.equal(trouverDoublonRecent({ ...candidat, auteurId: 'auteur-2' }, [recente], { maintenant }), null);
  assert.equal(trouverDoublonRecent({ ...candidat, type: 'video' }, [recente], { maintenant }), null);
  assert.equal(trouverDoublonRecent({ ...candidat, tailleOctets: 2000 }, [recente], { maintenant }), null);
  const ancienne = { ...recente, cree_le: new Date('2026-11-22T11:58:00.000Z') };
  assert.equal(trouverDoublonRecent(candidat, [ancienne], { maintenant }), null);
});

// ── Signature SigV4 ──────────────────────────────────────────
test('urlSigneeR2 : adresse signée, paramètres et signature valides', () => {
  const url = new URL(urlSigneeR2(CONFIG, 'stories/abc.jpg', { maintenant: DATE_FIXE }));
  assert.equal(url.hostname, '9f5eba0e155b17dbf6059fff506addd8.r2.cloudflarestorage.com');
  assert.equal(url.pathname, '/connexion-prophetique-stories/stories/abc.jpg');
  assert.equal(url.searchParams.get('X-Amz-Algorithm'), 'AWS4-HMAC-SHA256');
  assert.equal(
    url.searchParams.get('X-Amz-Credential'),
    'TESTACCESSKEYID/20261117/auto/s3/aws4_request',
  );
  assert.equal(url.searchParams.get('X-Amz-Date'), '20261117T120000Z');
  assert.equal(url.searchParams.get('X-Amz-Expires'), '900');
  assert.equal(url.searchParams.get('X-Amz-SignedHeaders'), 'host');
  assert.match(url.searchParams.get('X-Amz-Signature'), /^[0-9a-f]{64}$/);
  // La même entrée donne la même signature, une autre clé ou un
  // autre secret donne une autre signature.
  const meme = urlSigneeR2(CONFIG, 'stories/abc.jpg', { maintenant: DATE_FIXE });
  assert.equal(meme, urlSigneeR2(CONFIG, 'stories/abc.jpg', { maintenant: DATE_FIXE }));
  assert.notEqual(meme, urlSigneeR2(CONFIG, 'stories/def.jpg', { maintenant: DATE_FIXE }));
  assert.notEqual(
    meme,
    urlSigneeR2({ ...CONFIG, secretAccessKey: 'AUTRESECRET' }, 'stories/abc.jpg', { maintenant: DATE_FIXE }),
  );
});

test('entetesSignesR2 : en-tête Authorization SigV4, sensible à la méthode', () => {
  const { url, headers } = entetesSignesR2(CONFIG, 'PUT', 'stories/abc.jpg', {
    octets: Buffer.from('test'),
    typeMime: 'image/jpeg',
    maintenant: DATE_FIXE,
  });
  assert.equal(url, 'https://9f5eba0e155b17dbf6059fff506addd8.r2.cloudflarestorage.com/connexion-prophetique-stories/stories/abc.jpg');
  assert.match(
    headers.Authorization,
    /^AWS4-HMAC-SHA256 Credential=TESTACCESSKEYID\/20261117\/auto\/s3\/aws4_request, SignedHeaders=content-type;host;x-amz-content-sha256;x-amz-date, Signature=[0-9a-f]{64}$/,
  );
  assert.equal(headers['content-type'], 'image/jpeg');
  const autre = entetesSignesR2(CONFIG, 'DELETE', 'stories/abc.jpg', { maintenant: DATE_FIXE });
  assert.notEqual(autre.headers.Authorization, headers.Authorization);
});

// ── Forme publique ───────────────────────────────────────────
test('formaterStoryPublique : seulement l’adresse signée, jamais la clé R2', () => {
  const ligne = {
    id: '11111111-1111-1111-1111-111111111111',
    type: 'photo',
    cle_r2: 'stories/abc.jpg',
    cree_le: new Date('2026-11-17T12:00:00.000Z'),
    expire_le: new Date('2026-11-18T12:00:00.000Z'),
    auteur_nom: 'ANIBE AXEL',
    etablissement_nom: 'Céleste',
  };
  assert.deepEqual(formaterStoryPublique(ligne, 'https://exemple/abc?sig=1'), {
    id: '11111111-1111-1111-1111-111111111111',
    type: 'photo',
    url: 'https://exemple/abc?sig=1',
    auteur_nom: 'ANIBE AXEL',
    etablissement_nom: 'Céleste',
    cree_le: '2026-11-17T12:00:00.000Z',
    expire_le: '2026-11-18T12:00:00.000Z',
  });
});

// ── Lecture par l'API, carte 153 ─────────────────────────────────
test('urlMediaStory : adresse API de lecture, jamais R2 direct', () => {
  const id = '11111111-1111-1111-1111-111111111111';
  assert.equal(
    urlMediaStory('https://connexion-prophetique.onrender.com', id),
    `https://connexion-prophetique.onrender.com/stories/${id}/media`,
  );
  assert.equal(
    urlMediaStory('https://connexion-prophetique.onrender.com/', id),
    `https://connexion-prophetique.onrender.com/stories/${id}/media`,
  );
  assert.ok(!urlMediaStory('https://connexion-prophetique.onrender.com', id).includes('r2.cloudflarestorage.com'));
  assert.equal(urlMediaStory('', id), null);
  assert.equal(urlMediaStory('https://connexion-prophetique.onrender.com', ''), null);
  assert.equal(urlMediaStory(null, id), null);
  assert.equal(DELAI_LECTURE_R2_MS, 30 * 1000);
});

test('lireObjetR2 : octets renvoyés quand R2 répond, erreur 502 sinon', async () => {
  const dOrigine = globalThis.fetch;
  const png = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
  try {
    let appelee = '';
    globalThis.fetch = async (url) => {
      appelee = String(url);
      return new Response(png, { status: 200 });
    };
    const octets = await lireObjetR2(CONFIG, 'stories/abc.jpg');
    assert.ok(Buffer.isBuffer(octets));
    assert.deepEqual(octets, png);
    assert.ok(appelee.includes('r2.cloudflarestorage.com'), 'la lecture passe par R2 côté serveur');
    assert.ok(appelee.includes('stories/abc.jpg'));
    globalThis.fetch = async () => new Response('Non trouvé', { status: 404 });
    await assert.rejects(
      () => lireObjetR2(CONFIG, 'stories/abc.jpg'),
      (e) => e.statusCode === 502,
    );
    globalThis.fetch = async () => { throw new Error('réseau coupé'); };
    await assert.rejects(
      () => lireObjetR2(CONFIG, 'stories/abc.jpg'),
      (e) => e.statusCode === 502,
    );
  } finally {
    globalThis.fetch = dOrigine;
  }
});

test('câblage, carte 153 : GET /stories renvoie l’adresse API, la route media existe', () => {
  const dossier = path.dirname(fileURLToPath(import.meta.url));
  const serveur = fs.readFileSync(path.join(dossier, '..', 'server.js'), 'utf8');
  assert.ok(serveur.includes("app.get('/stories/:id/media'"), 'la route media existe');
  assert.ok(serveur.includes('urlMediaStory(CFG.publicBaseUrl, ligne.id)'), 'la liste renvoie l’adresse API');
  assert.ok(serveur.includes('urlMediaStory(CFG.publicBaseUrl, doublon.id)'), 'le doublon renvoie l’adresse API');
  assert.ok(serveur.includes('urlMediaStory(CFG.publicBaseUrl, cree.id)'), 'la création renvoie l’adresse API');
  assert.ok(serveur.includes('lireObjetR2(config, ligne.cle_r2)'), 'la route media lit R2 côté serveur');
});
