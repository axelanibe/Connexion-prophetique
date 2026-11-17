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
  dateExpirationStory,
  storyExpiree,
  validerPublication,
  urlSigneeR2,
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
