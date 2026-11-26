// Tests de la présence au culte, tranches 2 à 5, 21 nov. 2026.
//
// Partie pure seulement : elle teste les aides de
// src/presence_culte.js sans serveur ni base, et tourne ici. La
// partie intégration (routes contre une base de test) n'est pas
// écrite : elle exigerait TEST_DATABASE_URL, comme pour les
// stories et les témoignages. Les routes sont vérifiées par le
// contrôle de démarrage et par l'exercice réel contre le
// serveur en ligne, comme pour les autres tranches serveur.
//
// Lancer :  npm test   (depuis server-production)
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  CIBLES_AIME,
  LONGUEUR_MAX_TITRE_TEMPS_FORT,
  LONGUEUR_MAX_TEXTE_TEMPS_FORT,
  LONGUEUR_MAX_TEXTE_COMMENTAIRE,
  KINDS_MUR,
  LIMITE_PAR_KIND_MUR,
  LIMITE_MUR,
  uuidValide,
  validerTempsFort,
  validerAime,
  validerCommentaire,
  formaterTempsFort,
  formaterCompteAime,
  formaterCommentaire,
  normaliserDateMur,
  formaterElementMur,
  trierElementsMur,
} from '../src/presence_culte.js';

const UUID_A = '11111111-1111-4111-8111-111111111111';
const UUID_B = '22222222-2222-4222-8222-222222222222';

// ── Cibles et uuid ─────────────────────────────────────────────
test('cibles : temps_fort, temoignage et mur, jamais enseignement ni méditation', () => {
  assert.deepEqual(CIBLES_AIME, ['temps_fort', 'temoignage', 'mur']);
  assert.equal(CIBLES_AIME.includes('enseignement'), false);
  assert.equal(CIBLES_AIME.includes('méditation'), false);
  assert.equal(uuidValide(UUID_A), true);
  assert.equal(uuidValide('pas-un-uuid'), false);
  assert.equal(uuidValide(''), false);
  assert.equal(uuidValide(null), false);
});

// ── Temps forts ────────────────────────────────────────────────
test('validerTempsFort : titre 1 à 200, texte 2000 au plus, image uuid ou vide', () => {
  assert.equal(validerTempsFort({ titre: 'Soirée d’édification' }), null);
  assert.equal(validerTempsFort({ titre: 'Soirée', texte: 'Un beau moment', image_id: UUID_A }), null);
  assert.equal(validerTempsFort({ titre: 'Soirée', image_id: '' }), null);
  assert.equal(validerTempsFort({ titre: '' }).statut, 400);
  assert.equal(validerTempsFort({ titre: '   ' }).statut, 400);
  assert.equal(validerTempsFort({ titre: 'x'.repeat(201) }).statut, 400);
  assert.equal(validerTempsFort({ titre: 'x'.repeat(200) }), null);
  assert.equal(validerTempsFort({ titre: 'Soirée', texte: 'x'.repeat(2001) }).statut, 400);
  assert.equal(validerTempsFort({ titre: 'Soirée', texte: 'x'.repeat(2000) }), null);
  assert.equal(validerTempsFort({ titre: 'Soirée', image_id: 'pas-un-uuid' }).statut, 400);
  assert.equal(LONGUEUR_MAX_TITRE_TEMPS_FORT, 200);
  assert.equal(LONGUEUR_MAX_TEXTE_TEMPS_FORT, 2000);
});

test('formaterTempsFort : champs publics, dates ISO', () => {
  const f = formaterTempsFort({
    id: UUID_A,
    evenement_id: UUID_B,
    titre: 'Soirée',
    texte: 'Beau moment',
    image_id: null,
    publie_le: new Date('2026-11-21T20:00:00.000Z'),
    cree_le: new Date('2026-11-21T19:00:00.000Z'),
  });
  assert.equal(f.id, UUID_A);
  assert.equal(f.titre, 'Soirée');
  assert.equal(f.texte, 'Beau moment');
  assert.equal(f.image_id, '');
  assert.equal(f.publie_le, '2026-11-21T20:00:00.000Z');
  assert.equal(f.cree_le, '2026-11-21T19:00:00.000Z');
});

// ── J'aime ─────────────────────────────────────────────────────
test('validerAime : cible temps_fort ou temoignage, uuid obligatoire', () => {
  assert.equal(validerAime({ cible_type: 'temps_fort', cible_id: UUID_A }), null);
  assert.equal(validerAime({ cible_type: 'temoignage', cible_id: UUID_A }), null);
  assert.equal(validerAime({ cible_type: 'enseignement', cible_id: UUID_A }).statut, 400);
  assert.equal(validerAime({ cible_type: 'méditation', cible_id: UUID_A }).statut, 400);
  assert.equal(validerAime({ cible_type: 'temps_fort', cible_id: 'pas-un-uuid' }).statut, 400);
  assert.equal(validerAime({ cible_type: 'temps_fort', cible_id: '' }).statut, 400);
  assert.equal(validerAime({}).statut, 400);
});

test('formaterCompteAime : nombre et mon J’aime, jamais la liste', () => {
  const c = formaterCompteAime({ cible_type: 'temps_fort', cible_id: UUID_A, nombre: '3', a_aime: true });
  assert.equal(c.nombre, 3);
  assert.equal(c.a_aime, true);
  assert.equal('membres' in c, false);
  assert.equal(formaterCompteAime({ cible_type: 'temoignage', cible_id: UUID_A, nombre: 0, a_aime: false }).nombre, 0);
  assert.equal(formaterCompteAime({ cible_type: 'temoignage', cible_id: UUID_A, nombre: null, a_aime: undefined }).nombre, 0);
});

// ── Commentaires ───────────────────────────────────────────────
test('validerCommentaire : texte 1 à 1000, même cible que le J’aime', () => {
  assert.equal(validerCommentaire({ cible_type: 'temps_fort', cible_id: UUID_A, texte: 'Amen !' }), null);
  assert.equal(validerCommentaire({ cible_type: 'temps_fort', cible_id: UUID_A, texte: '' }).statut, 400);
  assert.equal(validerCommentaire({ cible_type: 'temps_fort', cible_id: UUID_A, texte: '   ' }).statut, 400);
  assert.equal(validerCommentaire({ cible_type: 'temps_fort', cible_id: UUID_A, texte: 'x'.repeat(1001) }).statut, 400);
  assert.equal(validerCommentaire({ cible_type: 'temps_fort', cible_id: UUID_A, texte: 'x'.repeat(1000) }), null);
  assert.equal(validerCommentaire({ cible_type: 'enseignement', cible_id: UUID_A, texte: 'Beau' }).statut, 400);
  assert.equal(LONGUEUR_MAX_TEXTE_COMMENTAIRE, 1000);
});

test('formaterCommentaire : auteur, texte, est_auteur', () => {
  const c = formaterCommentaire({
    id: UUID_A,
    cible_type: 'temoignage',
    cible_id: UUID_B,
    auteur_nom: 'Marie Test',
    texte: 'Merci pour ce témoignage.',
    cree_le: new Date('2026-11-21T20:00:00.000Z'),
    est_auteur: true,
  });
  assert.equal(c.auteur_nom, 'Marie Test');
  assert.equal(c.texte, 'Merci pour ce témoignage.');
  assert.equal(c.est_auteur, true);
  assert.equal(c.cree_le, '2026-11-21T20:00:00.000Z');
});

// ── Mon mur ────────────────────────────────────────────────────
test('mur : 5 kinds, 20 par kind, 50 au total', () => {
  assert.deepEqual(KINDS_MUR, ['enseignement', 'actualite', 'annonce', 'camp', 'temoignage']);
  assert.equal(LIMITE_PAR_KIND_MUR, 20);
  assert.equal(LIMITE_MUR, 50);
});

test('normaliserDateMur : Date en ISO, AAAA-MM-JJ telle quelle, reste vide', () => {
  assert.equal(normaliserDateMur(new Date('2026-11-21T20:00:00.000Z')), '2026-11-21T20:00:00.000Z');
  assert.equal(normaliserDateMur('2027-08-22'), '2027-08-22');
  assert.equal(normaliserDateMur(null), '');
  assert.equal(normaliserDateMur(undefined), '');
  assert.equal(normaliserDateMur(123), '');
});

test('formaterElementMur : une seule forme pour les cinq kinds', () => {
  const e = formaterElementMur({ kind: 'camp', id: UUID_A, titre: 'Kairos', texte: '', date: '2027-08-22', lieu: 'Bingerville' });
  assert.equal(e.kind, 'camp');
  assert.equal(e.titre, 'Kairos');
  assert.equal(e.date, '2027-08-22');
  assert.equal(e.lieu, 'Bingerville');
  const t = formaterElementMur({ kind: 'temoignage', id: UUID_B, texte: 'Dieu m’a relevé.', date: new Date('2026-11-21T20:00:00.000Z'), auteur_nom: 'Marie Test' });
  assert.equal(t.titre, '');
  assert.equal(t.texte, 'Dieu m’a relevé.');
  assert.equal(t.auteur_nom, 'Marie Test');
  assert.equal(t.date, '2026-11-21T20:00:00.000Z');
});

test('trierElementsMur : du plus récent au plus ancien, 50 au plus', () => {
  const elements = [
    formaterElementMur({ kind: 'camp', id: UUID_A, titre: 'Ancien', date: '2026-01-01' }),
    formaterElementMur({ kind: 'enseignement', id: UUID_B, titre: 'Récent', date: '2026-11-21T20:00:00.000Z' }),
    formaterElementMur({ kind: 'actualite', id: UUID_A, titre: 'Milieu', date: '2026-06-15' }),
  ];
  const tries = trierElementsMur(elements);
  assert.equal(tries[0].titre, 'Récent');
  assert.equal(tries[1].titre, 'Milieu');
  assert.equal(tries[2].titre, 'Ancien');
  const cinquante = Array.from({ length: 60 }, (_, i) =>
    formaterElementMur({ kind: 'annonce', id: UUID_A, titre: `A${i}`, date: `2026-11-${String((i % 28) + 1).padStart(2, '0')}` }));
  assert.equal(trierElementsMur(cinquante).length, 50);
  assert.equal(trierElementsMur([]).length, 0);
});
