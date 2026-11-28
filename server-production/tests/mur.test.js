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
  cleMurVideo,
  estImageAutorisee,
  validerPublicationMur,
  formaterPublicationMur,
  formaterProfilMur,
  formaterMembreSuivi,
} from '../src/mur.js';
import { CIBLES_AIME, TYPES_REACTION, normaliserMentions, refusReponse, formaterCompteAime, formaterCommentaire } from '../src/presence_culte.js';

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
    suivi_par_moi: true,
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
    // Lot 1, salve 28 nov. 2026 : photos multiples, la photo
    // seule retombe dans la liste quand il n'y en a qu'une.
    photos: ['data:image/jpeg;base64,/9j/'],
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
    suivi_par_moi: true,
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
  assert.equal(forme.suivi_par_moi, false);
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

// ── Clé vidéo, mur v2 tranche 2 ─────────────────────────────
test('cleMurVideo : dossier mur-videos, extension du type réel', () => {
  assert.match(cleMurVideo('video/mp4'), /^mur-videos\/[0-9a-f-]{36}\.mp4$/);
  assert.match(cleMurVideo('video/quicktime'), /^mur-videos\/[0-9a-f-]{36}\.mov$/);
  assert.match(cleMurVideo('video/webm'), /^mur-videos\/[0-9a-f-]{36}\.webm$/);
  assert.match(cleMurVideo('video/inconnu'), /^mur-videos\/[0-9a-f-]{36}\.mp4$/);
});

test('cleMurVideo : deux appels, deux clés différentes', () => {
  assert.notEqual(cleMurVideo('video/mp4'), cleMurVideo('video/mp4'));
});

// ── Réactions, mur v2 tranche 3 ──────────────────────────
test('TYPES_REACTION : J’aime, Amen, Prière', () => {
  assert.deepEqual([...TYPES_REACTION], ['jaime', 'amen', 'priere']);
});

test('formaterCompteAime : comptes par type et mon type', () => {
  assert.deepEqual(
    formaterCompteAime({ cible_type: 'mur', cible_id: 'p1', nombre: '3', a_aime: true, nb_jaime: '1', nb_amen: 2, nb_priere: '0', mon_type: 'amen' }),
    { cible_type: 'mur', cible_id: 'p1', nombre: 3, a_aime: true, nb_jaime: 1, nb_amen: 2, nb_priere: 0, mon_type: 'amen' },
  );
  const vide = formaterCompteAime({ cible_type: 'mur', cible_id: 'p2', nombre: 0, a_aime: false });
  assert.equal(vide.nb_jaime, 0);
  assert.equal(vide.nb_amen, 0);
  assert.equal(vide.nb_priere, 0);
  assert.equal(vide.mon_type, null);
});

// ── Réponses et mentions, mur v2 tranche 3 ───────────────
const UUID_A = '11111111-1111-4111-8111-111111111111';
const UUID_B = '22222222-2222-4222-8222-222222222222';

test('normaliserMentions : 5 au plus, dédupliquées', () => {
  assert.deepEqual(normaliserMentions(null), { mentions: [] });
  assert.deepEqual(normaliserMentions([UUID_A, UUID_B, UUID_A]), { mentions: [UUID_A, UUID_B] });
  assert.equal(normaliserMentions([UUID_A, UUID_B, 'x', UUID_A, UUID_B, UUID_A]).refus.statut, 400);
  assert.equal(normaliserMentions('pas un tableau').refus.statut, 400);
  assert.equal(normaliserMentions(['pas-un-uuid']).refus.statut, 400);
  const six = [UUID_A, UUID_B, '33333333-3333-4333-8333-333333333333', '44444444-4444-4444-8444-444444444444', '55555555-5555-4555-8555-555555555555', '66666666-6666-4666-8666-666666666666'];
  assert.equal(normaliserMentions(six).refus.statut, 400);
});

test('refusReponse : parent absent, autre cible, réponse à une réponse', () => {
  assert.equal(refusReponse(null, { cible_type: 'mur', cible_id: 'p1' }).statut, 404);
  const autreCible = { id: 'c1', cible_type: 'temoignage', cible_id: 't1', parent_id: null };
  assert.equal(refusReponse(autreCible, { cible_type: 'mur', cible_id: 'p1' }).statut, 400);
  const reponse = { id: 'c2', cible_type: 'mur', cible_id: 'p1', parent_id: 'c0' };
  assert.equal(refusReponse(reponse, { cible_type: 'mur', cible_id: 'p1' }).statut, 400);
  const premier = { id: 'c3', cible_type: 'mur', cible_id: 'p1', parent_id: null };
  assert.equal(refusReponse(premier, { cible_type: 'mur', cible_id: 'p1' }), null);
});

test('formaterCommentaire : parent_id renvoyé', () => {
  assert.equal(formaterCommentaire({ id: 'c1', parent_id: 'c0' }).parent_id, 'c0');
  assert.equal(formaterCommentaire({ id: 'c2' }).parent_id, null);
});

test('formaterProfilMur : forme publique complète, sans matricule', () => {
  const forme = formaterProfilMur({
    id: 'm1',
    nom_complet: 'Marie K',
    fonction: 'Chantre',
    etablissement_nom: 'Céleste',
    photo: 'data:image/jpeg;base64,/9j/',
    presentation: 'Membre depuis 2025.',
    inscrit_le: new Date('2025-03-02T10:00:00.000Z'),
    nb_publications: '2',
    nb_reactions: 5,
    nb_abonnes: '1',
    nb_abonnements: 0,
    suivi_par_moi: true,
    est_moi: false,
  });
  assert.deepEqual(forme, {
    id: 'm1',
    nom_complet: 'Marie K',
    fonction: 'Chantre',
    etablissement_nom: 'Céleste',
    photo: 'data:image/jpeg;base64,/9j/',
    presentation: 'Membre depuis 2025.',
    inscrit_le: '2025-03-02T10:00:00.000Z',
    nb_publications: 2,
    nb_reactions: 5,
    nb_abonnes: 1,
    nb_abonnements: 0,
    suivi_par_moi: true,
    // Lot 1, salve 28 nov. 2026 : blocage vu par le profil.
    bloque_par_moi: false,
    est_moi: false,
  });
  assert.equal('matricule' in forme, false);
});

test('formaterProfilMur : valeurs absentes, zéros et faux', () => {
  const forme = formaterProfilMur({ id: 'm2' });
  assert.equal(forme.nom_complet, '');
  assert.equal(forme.fonction, '');
  assert.equal(forme.etablissement_nom, '');
  assert.equal(forme.photo, null);
  assert.equal(forme.presentation, '');
  assert.equal(forme.inscrit_le, null);
  assert.equal(forme.nb_publications, 0);
  assert.equal(forme.nb_reactions, 0);
  assert.equal(forme.nb_abonnes, 0);
  assert.equal(forme.nb_abonnements, 0);
  assert.equal(forme.suivi_par_moi, false);
  assert.equal(forme.est_moi, false);
});

test('formaterMembreSuivi : nom et établissement seulement', () => {
  assert.deepEqual(formaterMembreSuivi({ id: 'm3', nom_complet: 'Grace L', etablissement_nom: 'ISPAM' }), {
    id: 'm3',
    nom_complet: 'Grace L',
    etablissement_nom: 'ISPAM',
  });
  assert.deepEqual(formaterMembreSuivi({ id: 'm4' }), { id: 'm4', nom_complet: '', etablissement_nom: '' });
});
