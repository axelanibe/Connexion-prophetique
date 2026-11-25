// Tests du mur des membres, carte 174, refonte totale
// tranche 2, carte 176, 24 nov. 2026 : texte léger, photo
// plafonnée comme la photo de profil, cible 'mur' pour les
// J'aime et les commentaires génériques.
//
// Partie pure seulement : elle teste les aides de src/mur.js
// et la cible de src/presence_culte.js sans serveur ni base,
// et tourne ici. La partie intégration (routes contre une base
// de test) n'est pas écrite : elle exigerait TEST_DATABASE_URL,
// comme pour les témoignages. Les routes sont vérifiées par le
// contrôle de démarrage et par l'exercice réel contre le
// serveur en ligne, comme pour les autres tranches serveur.
//
// Lancer :  npm test   (depuis server-production)
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  CATEGORIES_MUR,
  LONGUEUR_MAX_TEXTE_MUR,
  TAILLE_MAX_PHOTO_MUR_OCTETS,
  LIMITE_MUR_PUBLICATIONS,
  estImageAutorisee,
  validerPublicationMur,
  formaterPublicationMur,
} from '../src/mur.js';
import { CIBLES_AIME } from '../src/presence_culte.js';

const JPEG = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]);
const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const WEBP = Buffer.concat([Buffer.from('RIFF'), Buffer.from([0, 0, 0, 0]), Buffer.from('WEBP')]);

const photoDe = (octets) => `data:image/jpeg;base64,${octets.toString('base64')}`;

// ── Constantes ───────────────────────────────────────────────
test('constantes : texte 2000, photo 700 Ko, 50 publications', () => {
  assert.equal(LONGUEUR_MAX_TEXTE_MUR, 2000);
  assert.equal(TAILLE_MAX_PHOTO_MUR_OCTETS, 700 * 1024);
  assert.equal(LIMITE_MUR_PUBLICATIONS, 50);
});

test("CIBLES_AIME contient 'mur', pour les J'aime et commentaires", () => {
  assert.equal(CIBLES_AIME.includes('mur'), true);
  assert.equal(CIBLES_AIME.includes('temoignage'), true);
  assert.equal(CIBLES_AIME.includes('temps_fort'), true);
});

// ── Images autorisées ────────────────────────────────────────
test('estImageAutorisee : JPEG, PNG et WebP par leurs premiers octets', () => {
  assert.equal(estImageAutorisee(JPEG), true);
  assert.equal(estImageAutorisee(PNG), true);
  assert.equal(estImageAutorisee(WEBP), true);
  assert.equal(estImageAutorisee(Buffer.from([1, 2, 3])), false);
  assert.equal(estImageAutorisee(Buffer.alloc(0)), false);
  assert.equal(estImageAutorisee(null), false);
});

// ── Validation ───────────────────────────────────────────────
test('validerPublicationMur : texte seul accepté', () => {
  assert.equal(validerPublicationMur({ texte: 'Bonjour à tous', photo: null }), null);
  assert.equal(validerPublicationMur({ texte: '  Bonjour  ', photo: '' }), null);
});

test('validerPublicationMur : photo seule acceptée', () => {
  assert.equal(validerPublicationMur({ texte: '', photo: photoDe(JPEG) }), null);
  assert.equal(validerPublicationMur({ texte: '   ', photo: photoDe(PNG) }), null);
});

test('validerPublicationMur : ni texte ni photo refusé en 400', () => {
  const refus = validerPublicationMur({ texte: '   ', photo: null });
  assert.equal(refus.statut, 400);
});

test('validerPublicationMur : texte trop long refusé en 400', () => {
  const refus = validerPublicationMur({ texte: 'x'.repeat(2001), photo: null });
  assert.equal(refus.statut, 400);
});

test('validerPublicationMur : photo sans préfixe image refusée en 400', () => {
  const refus = validerPublicationMur({ texte: '', photo: 'data:text/plain;base64,abcd' });
  assert.equal(refus.statut, 400);
});

test('validerPublicationMur : photo de plus de 700 Ko refusée en 413', () => {
  const gros = Buffer.alloc(TAILLE_MAX_PHOTO_MUR_OCTETS + 1);
  gros[0] = 0xff;
  gros[1] = 0xd8;
  const refus = validerPublicationMur({ texte: '', photo: photoDe(gros) });
  assert.equal(refus.statut, 413);
});

test('validerPublicationMur : octets non image refusés en 415', () => {
  const refus = validerPublicationMur({ texte: '', photo: photoDe(Buffer.from([1, 2, 3, 4])) });
  assert.equal(refus.statut, 415);
});

// ── Catégories, mur v2 tranche 1 ─────────────────────────────────
test('CATEGORIES_MUR : les 6 catégories, prière comprise', () => {
  assert.deepEqual([...CATEGORIES_MUR], ['temoignage', 'priere', 'verset', 'encouragement', 'enseignement', 'autre']);
});

test('validerPublicationMur : catégorie valide acceptée, invalide refusée en 400', () => {
  assert.equal(validerPublicationMur({ texte: 'Bonjour', photo: null, categorie: 'priere' }), null);
  assert.equal(validerPublicationMur({ texte: 'Bonjour', photo: null }), null);
  const refus = validerPublicationMur({ texte: 'Bonjour', photo: null, categorie: 'nimporte' });
  assert.equal(refus.statut, 400);
});

// ── Format public ────────────────────────────────────────────
test('formaterPublicationMur : forme publique complète', () => {
  const ligne = {
    id: 'p1',
    auteur_id: 'a1',
    auteur_nom: 'Marie K',
    etablissement_nom: 'Céleste',
    texte: 'Courage',
    photo: 'data:image/jpeg;base64,/9j/',
    categorie: 'temoignage',
    statut_moderation: 'visible',
    nb_jaime: '3',
    nb_amen: 1,
    nb_priere: '2',
    mon_type: 'jaime',
    nb_commentaires: 2,
    enregistre: true,
    est_auteur: false,
    cree_le: new Date('2026-11-24T10:00:00.000Z'),
  };
  assert.deepEqual(formaterPublicationMur(ligne), {
    id: 'p1',
    auteur_id: 'a1',
    auteur_nom: 'Marie K',
    etablissement_nom: 'Céleste',
    texte: 'Courage',
    photo: 'data:image/jpeg;base64,/9j/',
    categorie: 'temoignage',
    statut_moderation: 'visible',
    video: null,
    nb_jaime: 3,
    nb_amen: 1,
    nb_priere: 2,
    mon_type: 'jaime',
    nb_commentaires: 2,
    aime: true,
    enregistre: true,
    est_auteur: false,
    cree_le: '2026-11-24T10:00:00.000Z',
  });
});

test('formaterPublicationMur : valeurs absentes, zéros et faux', () => {
  const forme = formaterPublicationMur({ id: 'p2' });
  assert.equal(forme.auteur_id, null);
  assert.equal(forme.auteur_nom, '');
  assert.equal(forme.texte, '');
  assert.equal(forme.photo, null);
  assert.equal(forme.categorie, 'autre');
  assert.equal(forme.statut_moderation, 'visible');
  assert.equal(forme.video, null);
  assert.equal(forme.nb_jaime, 0);
  assert.equal(forme.nb_amen, 0);
  assert.equal(forme.nb_priere, 0);
  assert.equal(forme.mon_type, null);
  assert.equal(forme.nb_commentaires, 0);
  assert.equal(forme.aime, false);
  assert.equal(forme.enregistre, false);
  assert.equal(forme.est_auteur, false);
  assert.equal(forme.cree_le, null);
});

test('formaterPublicationMur : vidéo présente quand la clé R2 est là', () => {
  const forme = formaterPublicationMur({
    id: 'p3',
    cle_r2_video: 'mur-videos/abc.mp4',
    type_mime_video: 'video/mp4',
    taille_video_octets: 12345,
  });
  assert.deepEqual(forme.video, { url: '/mur/p3/video', type_mime: 'video/mp4', taille_octets: 12345 });
});

test('formaterPublicationMur : aime vaut vrai quand mon_type est renseigné', () => {
  assert.equal(formaterPublicationMur({ id: 'p4', mon_type: 'amen' }).aime, true);
  assert.equal(formaterPublicationMur({ id: 'p4', mon_type: null }).aime, false);
  assert.equal(formaterPublicationMur({ id: 'p4', aime: true }).aime, true);
});
