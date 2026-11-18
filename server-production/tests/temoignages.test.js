// Tests des témoignages vidéo, 17 nov. 2026.
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
  DUREE_MAX_VIDEO_TEMOIGNAGE_SECONDES,
  MIMES_VIDEO_TEMOIGNAGE,
  STATUTS_TEMOIGNAGE,
  statutTemoignageValide,
  cleTemoignage,
  validerTemoignage,
  formaterTemoignagePublic,
} from '../src/temoignages.js';

// ── Constantes ───────────────────────────────────────────────
test('constantes : vidéo seulement, 25 Mo, 60 s, trois statuts décidés', () => {
  assert.equal(TAILLE_MAX_VIDEO_TEMOIGNAGE_OCTETS, 25 * 1024 * 1024);
  assert.equal(DUREE_MAX_VIDEO_TEMOIGNAGE_SECONDES, 60);
  assert.deepEqual(MIMES_VIDEO_TEMOIGNAGE, ['video/mp4', 'video/quicktime', 'video/webm']);
  assert.deepEqual(STATUTS_TEMOIGNAGE, ['en_attente', 'approuve', 'refuse']);
  assert.equal(Object.isFrozen(MIMES_VIDEO_TEMOIGNAGE), true);
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

// ── Clé R2 ───────────────────────────────────────────────────
test('cleTemoignage : dossier temoignages, identifiant aléatoire, extension du type réel', () => {
  const cleMp4 = cleTemoignage('video/mp4');
  assert.match(cleMp4, /^temoignages\/[0-9a-f-]{36}\.mp4$/);
  assert.match(cleTemoignage('video/quicktime'), /^temoignages\/[0-9a-f-]{36}\.mov$/);
  assert.match(cleTemoignage('video/webm'), /^temoignages\/[0-9a-f-]{36}\.webm$/);
  assert.notEqual(cleTemoignage('video/mp4'), cleTemoignage('video/mp4'));
  assert.match(cleTemoignage('video/inconnu'), /^temoignages\/[0-9a-f-]{36}\.mp4$/);
});

// ── Validation ───────────────────────────────────────────────
test('validerTemoignage : null quand tout est bon, refus sinon', () => {
  assert.equal(validerTemoignage({ mime: 'video/mp4', tailleOctets: 1024 }), null);
  assert.equal(validerTemoignage({ mime: 'video/webm', tailleOctets: 25 * 1024 * 1024 }), null);
  assert.deepEqual(validerTemoignage({ mime: 'image/jpeg', tailleOctets: 1024 }), { statut: 415, message: 'Type de média non autorisé.' });
  assert.deepEqual(validerTemoignage({ mime: 'video/mp4', tailleOctets: 0 }), { statut: 413, message: 'Média trop volumineux.' });
  assert.deepEqual(validerTemoignage({ mime: 'video/mp4', tailleOctets: 25 * 1024 * 1024 + 1 }), { statut: 413, message: 'Média trop volumineux.' });
  assert.deepEqual(validerTemoignage({ mime: 'video/mp4', tailleOctets: -1 }), { statut: 413, message: 'Média trop volumineux.' });
});

// ── Forme publique ───────────────────────────────────────────
test('formaterTemoignagePublic : jamais la clé R2, jamais l identifiant de l auteur', () => {
  const public_ = formaterTemoignagePublic(
    { id: 'a1', cle_r2: 'temoignages/secret.mp4', auteur_id: 'auteur-1', auteur_nom: 'Marie K', etablissement_nom: 'Céleste', statut: 'en_attente', cree_le: '2026-11-17T10:00:00.000Z' },
    'https://signee.example/lien',
  );
  assert.deepEqual(public_, {
    id: 'a1',
    auteur_nom: 'Marie K',
    etablissement_nom: 'Céleste',
    url: 'https://signee.example/lien',
    statut: 'en_attente',
    cree_le: '2026-11-17T10:00:00.000Z',
  });
  assert.equal('cle_r2' in public_, false);
  assert.equal('auteur_id' in public_, false);
  const sansNoms = formaterTemoignagePublic({ id: 'a2', statut: 'approuve' }, 'https://signee.example/autre');
  assert.equal(sansNoms.auteur_nom, '');
  assert.equal(sansNoms.etablissement_nom, '');
  assert.equal(sansNoms.cree_le, null);
});
