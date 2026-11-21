// Tests des témoignages, 17 nov. 2026, compositeur unique
// 21 nov. 2026 : texte seul, photo, vidéo et audio.
//
// Partie pure seulement : elle teste les aides de
// src/temoignages.js sans serveur ni base, et tourne ici. La
// partie intégration (routes contre une base de test et un
// compartiment R2) n'est pas écrite : elle exigerait
// TEST_DATABASE_URL et les clés R2, saisies dans Render par
// Axel, jamais en chat ni dans le dépôt. Les routes sont
// vérifiées par le contrôle de démarrage et par l'exercice réel
// contre le serveur en ligne, comme pour les autres tranches
// serveur.
//
// Lancer :  npm test   (depuis server-production)
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  TAILLE_MAX_VIDEO_TEMOIGNAGE_OCTETS,
  TAILLE_MAX_PHOTO_TEMOIGNAGE_OCTETS,
  TAILLE_MAX_AUDIO_TEMOIGNAGE_OCTETS,
  DUREE_MAX_VIDEO_TEMOIGNAGE_SECONDES,
  DUREE_MAX_AUDIO_TEMOIGNAGE_SECONDES,
  LONGUEUR_MAX_TEXTE_TEMOIGNAGE,
  MIMES_VIDEO_TEMOIGNAGE,
  MIMES_PHOTO_TEMOIGNAGE,
  MIMES_AUDIO_TEMOIGNAGE,
  STATUTS_TEMOIGNAGE,
  statutTemoignageValide,
  typeMediaDepuisMime,
  cleTemoignage,
  validerTemoignage,
  formaterTemoignagePublic,
} from '../src/temoignages.js';

// ── Constantes ───────────────────────────────────────────────
test('constantes : vidéo 25 Mo et 60 s, photo 5 Mo, audio 10 Mo et 5 min, texte 2000, trois statuts', () => {
  assert.equal(TAILLE_MAX_VIDEO_TEMOIGNAGE_OCTETS, 25 * 1024 * 1024);
  assert.equal(TAILLE_MAX_PHOTO_TEMOIGNAGE_OCTETS, 5 * 1024 * 1024);
  assert.equal(TAILLE_MAX_AUDIO_TEMOIGNAGE_OCTETS, 10 * 1024 * 1024);
  assert.equal(DUREE_MAX_VIDEO_TEMOIGNAGE_SECONDES, 60);
  assert.equal(DUREE_MAX_AUDIO_TEMOIGNAGE_SECONDES, 300);
  assert.equal(LONGUEUR_MAX_TEXTE_TEMOIGNAGE, 2000);
  assert.deepEqual(MIMES_VIDEO_TEMOIGNAGE, ['video/mp4', 'video/quicktime', 'video/webm']);
  assert.deepEqual(MIMES_PHOTO_TEMOIGNAGE, ['image/jpeg', 'image/png', 'image/webp']);
  assert.deepEqual(MIMES_AUDIO_TEMOIGNAGE, ['audio/mp4', 'audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/x-m4a']);
  assert.deepEqual(STATUTS_TEMOIGNAGE, ['en_attente', 'approuve', 'refuse']);
  assert.equal(Object.isFrozen(MIMES_VIDEO_TEMOIGNAGE), true);
  assert.equal(Object.isFrozen(MIMES_PHOTO_TEMOIGNAGE), true);
  assert.equal(Object.isFrozen(MIMES_AUDIO_TEMOIGNAGE), true);
  assert.equal(Object.isFrozen(STATUTS_TEMOIGNAGE), true);
});

// ── Statuts ──────────────────────────────────────────────────
test('statutTemoignageValide : les trois statuts seulement', () => {
  assert.equal(statutTemoignageValide('en_attente'), true);
  assert.equal(statutTemoignageValide('approuve'), true);
  assert.equal(statutTemoignageValide('refuse'), true);
  assert.equal(statutTemoignageValide('publie'), false);
  assert.equal(statutTemoignageValide(''), false);
  assert.equal(statutTemoignageValide(null), false);
});

// ── Type de média ────────────────────────────────────────────
test('typeMediaDepuisMime : photo, vidéo, audio, texte sans média', () => {
  assert.equal(typeMediaDepuisMime('image/jpeg'), 'photo');
  assert.equal(typeMediaDepuisMime('image/webp'), 'photo');
  assert.equal(typeMediaDepuisMime('video/mp4'), 'video');
  assert.equal(typeMediaDepuisMime('audio/mpeg'), 'audio');
  assert.equal(typeMediaDepuisMime('audio/mp4'), 'audio');
  assert.equal(typeMediaDepuisMime(''), 'texte');
  assert.equal(typeMediaDepuisMime(null), 'texte');
  assert.equal(typeMediaDepuisMime(undefined), 'texte');
});

// ── Clé R2 ───────────────────────────────────────────────────
test('cleTemoignage : dossier temoignages, identifiant aléatoire, extension du type réel', () => {
  const cleMp4 = cleTemoignage('video/mp4');
  assert.match(cleMp4, /^temoignages\/[0-9a-f-]{36}\.mp4$/);
  assert.match(cleTemoignage('video/quicktime'), /^temoignages\/[0-9a-f-]{36}\.mov$/);
  assert.match(cleTemoignage('video/webm'), /^temoignages\/[0-9a-f-]{36}\.webm$/);
  assert.match(cleTemoignage('image/jpeg'), /^temoignages\/[0-9a-f-]{36}\.jpg$/);
  assert.match(cleTemoignage('image/png'), /^temoignages\/[0-9a-f-]{36}\.png$/);
  assert.match(cleTemoignage('image/webp'), /^temoignages\/[0-9a-f-]{36}\.webp$/);
  assert.match(cleTemoignage('audio/mp4'), /^temoignages\/[0-9a-f-]{36}\.m4a$/);
  assert.match(cleTemoignage('audio/mpeg'), /^temoignages\/[0-9a-f-]{36}\.mp3$/);
  assert.match(cleTemoignage('audio/ogg'), /^temoignages\/[0-9a-f-]{36}\.ogg$/);
  assert.match(cleTemoignage('audio/wav'), /^temoignages\/[0-9a-f-]{36}\.wav$/);
  assert.notEqual(cleTemoignage('video/mp4'), cleTemoignage('video/mp4'));
  assert.match(cleTemoignage('video/inconnu'), /^temoignages\/[0-9a-f-]{36}\.mp4$/);
});

// ── Validation ───────────────────────────────────────────────
test('validerTemoignage : null quand tout est bon, refus sinon', () => {
  assert.equal(validerTemoignage({ mime: 'video/mp4', tailleOctets: 1024 }), null);
  assert.equal(validerTemoignage({ mime: 'video/webm', tailleOctets: 25 * 1024 * 1024 }), null);
  assert.equal(validerTemoignage({ mime: 'image/jpeg', tailleOctets: 5 * 1024 * 1024 }), null);
  assert.equal(validerTemoignage({ mime: 'image/png', tailleOctets: 1024 }), null);
  assert.equal(validerTemoignage({ mime: 'audio/mpeg', tailleOctets: 10 * 1024 * 1024 }), null);
  assert.equal(validerTemoignage({ mime: 'audio/mp4', tailleOctets: 1024 }), null);
  assert.equal(validerTemoignage({ mime: null, tailleOctets: 0, texte: 'Merci Seigneur.' }), null);
  assert.equal(validerTemoignage({ mime: 'video/mp4', tailleOctets: 1024, texte: 'Avec un texte.' }), null);
  assert.deepEqual(validerTemoignage({ mime: 'application/pdf', tailleOctets: 1024 }), { statut: 415, message: 'Type de média non autorisé.' });
  assert.deepEqual(validerTemoignage({ mime: 'video/mp4', tailleOctets: 0 }), { statut: 413, message: 'Média trop volumineux.' });
  assert.deepEqual(validerTemoignage({ mime: 'video/mp4', tailleOctets: 25 * 1024 * 1024 + 1 }), { statut: 413, message: 'Média trop volumineux.' });
  assert.deepEqual(validerTemoignage({ mime: 'image/jpeg', tailleOctets: 5 * 1024 * 1024 + 1 }), { statut: 413, message: 'Média trop volumineux.' });
  assert.deepEqual(validerTemoignage({ mime: 'audio/mpeg', tailleOctets: 10 * 1024 * 1024 + 1 }), { statut: 413, message: 'Média trop volumineux.' });
  assert.deepEqual(validerTemoignage({ mime: 'video/mp4', tailleOctets: -1 }), { statut: 413, message: 'Média trop volumineux.' });
  assert.deepEqual(validerTemoignage({ mime: null, tailleOctets: 0, texte: '' }), { statut: 400, message: 'Ajoutez un texte ou un média.' });
  assert.deepEqual(validerTemoignage({ mime: null, tailleOctets: 0, texte: '   ' }), { statut: 400, message: 'Ajoutez un texte ou un média.' });
  assert.deepEqual(validerTemoignage({ mime: null, tailleOctets: 0 }), { statut: 400, message: 'Ajoutez un texte ou un média.' });
  assert.deepEqual(validerTemoignage({ mime: null, tailleOctets: 0, texte: 'x'.repeat(2001) }), { statut: 400, message: 'Texte trop long : 2000 caractères au plus.' });
  assert.deepEqual(validerTemoignage({ mime: 'video/mp4', tailleOctets: 1024, texte: 'x'.repeat(2001) }), { statut: 400, message: 'Texte trop long : 2000 caractères au plus.' });
  assert.equal(validerTemoignage({ mime: null, tailleOctets: 0, texte: 'x'.repeat(2000) }), null);
});

// ── Forme publique ───────────────────────────────────────────
test('formaterTemoignagePublic : jamais la clé R2, jamais l identifiant de l auteur, texte et type renvoyés', () => {
  const public_ = formaterTemoignagePublic(
    { id: 'a1', cle_r2: 'temoignages/secret.mp4', auteur_id: 'auteur-1', auteur_nom: 'Marie K', etablissement_nom: 'Céleste', type_mime: 'video/mp4', texte: 'Dieu est bon.', statut: 'en_attente', cree_le: '2026-11-17T10:00:00.000Z' },
    'https://signee.example/lien',
  );
  assert.deepEqual(public_, {
    id: 'a1',
    auteur_nom: 'Marie K',
    etablissement_nom: 'Céleste',
    url: 'https://signee.example/lien',
    texte: 'Dieu est bon.',
    type_media: 'video',
    statut: 'en_attente',
    cree_le: '2026-11-17T10:00:00.000Z',
  });
  assert.equal('cle_r2' in public_, false);
  assert.equal('auteur_id' in public_, false);
  const sansNoms = formaterTemoignagePublic({ id: 'a2', statut: 'approuve' }, 'https://signee.example/autre');
  assert.equal(sansNoms.auteur_nom, '');
  assert.equal(sansNoms.etablissement_nom, '');
  assert.equal(sansNoms.texte, '');
  assert.equal(sansNoms.type_media, 'texte');
  assert.equal(sansNoms.cree_le, null);
  const photo = formaterTemoignagePublic({ id: 'a3', type_mime: 'image/jpeg', texte: '' }, 'https://signee.example/photo');
  assert.equal(photo.type_media, 'photo');
  const audio = formaterTemoignagePublic({ id: 'a4', type_mime: 'audio/mpeg', texte: '' }, 'https://signee.example/audio');
  assert.equal(audio.type_media, 'audio');
});
