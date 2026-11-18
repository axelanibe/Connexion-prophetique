// Tests des messages vocaux, 18 nov. 2026.
//
// Partie pure seulement : elle teste les aides de
// src/messagerie.js sans serveur ni base, et tourne ici. La
// partie intégration (route contre une base de test et un
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
  TAILLE_MAX_MESSAGE_VOCAL_OCTETS,
  DUREE_MAX_MESSAGE_VOCAL_SECONDES,
  MIMES_AUDIO,
  cleMessageVocal,
  formaterDureeVocal,
  libelleMessageVocal,
  validerMessageVocal,
  formaterMessageAudio,
} from '../src/messagerie.js';

// ── Constantes ───────────────────────────────────────────────
test('constantes : taille 10 Mo, durée 5 minutes, types audio décidés', () => {
  assert.equal(TAILLE_MAX_MESSAGE_VOCAL_OCTETS, 10 * 1024 * 1024);
  assert.equal(DUREE_MAX_MESSAGE_VOCAL_SECONDES, 300);
  assert.deepEqual(MIMES_AUDIO, [
    'audio/webm',
    'audio/mp4',
    'audio/mpeg',
    'audio/ogg',
    'audio/wav',
    'audio/x-m4a',
  ]);
  assert.equal(Object.isFrozen(MIMES_AUDIO), true);
});

// ── Clé d'objet ──────────────────────────────────────────────
test('cleMessageVocal : dossier messages-vocaux, extension du type réel, unique', () => {
  const cle = cleMessageVocal('audio/webm');
  assert.match(cle, /^messages-vocaux\/[0-9a-f-]{36}\.webm$/);
  assert.equal(cleMessageVocal('audio/mp4').endsWith('.m4a'), true);
  assert.equal(cleMessageVocal('audio/mpeg').endsWith('.mp3'), true);
  assert.equal(cleMessageVocal('audio/x-m4a').endsWith('.m4a'), true);
  assert.notEqual(cleMessageVocal('audio/webm'), cleMessageVocal('audio/webm'));
});

// ── Durée et libellé ─────────────────────────────────────────
test('formaterDureeVocal : minutes:secondes, deux chiffres pour les secondes', () => {
  assert.equal(formaterDureeVocal(0), '0:00');
  assert.equal(formaterDureeVocal(8), '0:08');
  assert.equal(formaterDureeVocal(65), '1:05');
  assert.equal(formaterDureeVocal(300), '5:00');
});

test('libelleMessageVocal : contenu stocké du message audio', () => {
  assert.equal(libelleMessageVocal(12), 'Message vocal · 0:12');
  assert.equal(libelleMessageVocal(125), 'Message vocal · 2:05');
});

// ── Validation ───────────────────────────────────────────────
test('validerMessageVocal : accepte un vocal opus court, refuse le reste', () => {
  assert.equal(
    validerMessageVocal({ mime: 'audio/webm', tailleOctets: 120000, dureeSecondes: 45 }),
    null,
  );
  assert.equal(
    validerMessageVocal({ mime: 'audio/mp4', tailleOctets: 4000000, dureeSecondes: 300 }),
    null,
  );
  assert.deepEqual(
    validerMessageVocal({ mime: 'video/mp4', tailleOctets: 1000, dureeSecondes: 10 }),
    { statut: 415, message: 'Type audio non autorisé.' },
  );
  assert.deepEqual(
    validerMessageVocal({ mime: 'audio/webm', tailleOctets: 11 * 1024 * 1024, dureeSecondes: 10 }),
    { statut: 413, message: 'Message vocal trop volumineux.' },
  );
  assert.deepEqual(
    validerMessageVocal({ mime: 'audio/webm', tailleOctets: 1000, dureeSecondes: 0 }),
    { statut: 400, message: 'Durée du message vocal invalide.' },
  );
  assert.deepEqual(
    validerMessageVocal({ mime: 'audio/webm', tailleOctets: 1000, dureeSecondes: 301 }),
    { statut: 400, message: 'Durée du message vocal invalide.' },
  );
});

// ── Forme publique ───────────────────────────────────────────
test('formaterMessageAudio : lien signé ajouté, clé jamais exposée', () => {
  const ligne = { id: 'm1', type: 'audio', content: 'Message vocal · 0:12', duree_secondes: 12 };
  const forme = formaterMessageAudio(ligne, 'https://exemple/son?sig=1');
  assert.equal(forme.audio_url, 'https://exemple/son?sig=1');
  assert.equal(forme.duree_secondes, 12);
  assert.equal(forme.type, 'audio');
  assert.equal('cle_audio' in forme, false);
});
