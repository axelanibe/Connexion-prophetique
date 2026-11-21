// Tests du culte en direct et du replay chapitré, 21 nov.
// 2026, tranches 4 et 5 de l'audit du 17 nov.
//
// Partie pure seulement : elle teste les aides de
// src/cultes_direct.js sans serveur ni base, et tourne ici. La
// partie intégration (routes contre une base de test) n'est pas
// écrite : elle exigerait TEST_DATABASE_URL, comme pour la
// chaîne de prière et les défis. Les routes sont vérifiées par
// le contrôle de démarrage et par l'exercice réel contre le
// serveur en ligne, comme pour les autres tranches serveur.
//
// Lancer :  npm test   (depuis server-production)
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  STATUTS_CULTE_DIRECT,
  dateCulteValide,
  urlCulteValide,
  validerCulte,
  validerCulteModif,
  normaliserDebutSecondes,
  validerChapitreCulte,
  trierChapitres,
  formaterCulteDirect,
  culteDirectEnAvant,
} from '../src/cultes_direct.js';

// ── Constantes ───────────────────────────────────────────────
test('constantes : statuts à venir, en direct, terminé', () => {
  assert.deepEqual(STATUTS_CULTE_DIRECT, ['à venir', 'en direct', 'terminé']);
});

// ── Date et liens ────────────────────────────────────────────
test('dateCulteValide : date réelle AAAA-MM-JJ seulement', () => {
  assert.equal(dateCulteValide('2026-11-22'), true);
  assert.equal(dateCulteValide('2026-02-30'), false);
  assert.equal(dateCulteValide('22/11/2026'), false);
});

test('urlCulteValide : vide ou http(s), jamais un autre schéma', () => {
  assert.equal(urlCulteValide(''), true);
  assert.equal(urlCulteValide(null), true);
  assert.equal(urlCulteValide('https://exemple.ci/direct'), true);
  assert.equal(urlCulteValide('http://exemple.ci/replay.mp4'), true);
  assert.equal(urlCulteValide('ftp://exemple.ci/x'), false);
  assert.equal(urlCulteValide('javascript:alert(1)'), false);
  assert.equal(urlCulteValide('exemple.ci/direct'), false);
});

// ── Création ─────────────────────────────────────────────────
test('validerCulte : titre et date obligatoires, liens facultatifs, statut contrôlé', () => {
  assert.equal(validerCulte({ titre: 'Culte du dimanche', date: '2026-11-22', url_direct: '', url_replay: '' }), null);
  assert.equal(validerCulte({ titre: 'Culte du dimanche', date: '2026-11-22', url_direct: 'https://exemple.ci/direct', url_replay: '', statut: 'en direct' }), null);
  assert.equal(validerCulte({ titre: '', date: '2026-11-22' }).statut, 400);
  assert.equal(validerCulte({ titre: 'Culte', date: '22/11/2026' }).statut, 400);
  assert.equal(validerCulte({ titre: 'Culte', date: '2026-11-22', url_direct: 'ftp://x' }).statut, 400);
  assert.equal(validerCulte({ titre: 'Culte', date: '2026-11-22', statut: 'bientôt' }).statut, 400);
});

test('validerCulteModif : seuls les champs présents sont contrôlés', () => {
  assert.equal(validerCulteModif({ statut: 'en direct' }), null);
  assert.equal(validerCulteModif({ url_replay: '' }), null);
  assert.equal(validerCulteModif({ statut: 'bientôt' }).statut, 400);
  assert.equal(validerCulteModif({ date: '22/11/2026' }).statut, 400);
});

// ── Chapitres ────────────────────────────────────────────────
test('normaliserDebutSecondes : entier 0 ou plus, chaîne de chiffres acceptée', () => {
  assert.equal(normaliserDebutSecondes(90), 90);
  assert.equal(normaliserDebutSecondes(0), 0);
  assert.equal(normaliserDebutSecondes('90'), 90);
  assert.equal(normaliserDebutSecondes(-5), -5);
  assert.equal(normaliserDebutSecondes('bientôt'), null);
  assert.equal(normaliserDebutSecondes(null), null);
});

test('validerChapitreCulte : titre obligatoire, début 0 ou plus', () => {
  assert.equal(validerChapitreCulte({ titre: 'Louange', debut_secondes: 0 }), null);
  assert.equal(validerChapitreCulte({ titre: 'Message', debut_secondes: '540' }), null);
  assert.equal(validerChapitreCulte({ titre: '', debut_secondes: 0 }).statut, 400);
  assert.equal(validerChapitreCulte({ titre: 'Louange', debut_secondes: -10 }).statut, 400);
  assert.equal(validerChapitreCulte({ titre: 'Louange' }).statut, 400);
});

test('trierChapitres : par début croissant, sans changer la liste donnée', () => {
  const chapitres = [{ titre: 'B', debut_secondes: 600 }, { titre: 'A', debut_secondes: 0 }];
  const tries = trierChapitres(chapitres);
  assert.deepEqual(tries.map((c) => c.titre), ['A', 'B']);
  assert.equal(chapitres[0].titre, 'B');
});

// ── Format et mise en avant ──────────────────────────────────
test('formaterCulteDirect : chapitres triés, liens vides quand absents', () => {
  const forme = formaterCulteDirect(
    { id: 'c1', titre: 'Culte', date: '2026-11-22', url_direct: '', url_replay: '', statut: 'à venir' },
    [{ id: 'h2', titre: 'Message', debut_secondes: 600 }, { id: 'h1', titre: 'Louange', debut_secondes: 0 }],
  );
  assert.deepEqual(forme.chapitres.map((c) => c.titre), ['Louange', 'Message']);
  assert.equal(forme.url_direct, '');
});

test('culteDirectEnAvant : en direct d’abord, sinon programmé, sinon rien', () => {
  const aVenir = { statut: 'à venir' };
  const enDirect = { statut: 'en direct' };
  const termine = { statut: 'terminé' };
  assert.equal(culteDirectEnAvant([aVenir, enDirect]), enDirect);
  assert.equal(culteDirectEnAvant([aVenir, termine]), aVenir);
  assert.equal(culteDirectEnAvant([termine]), null);
  assert.equal(culteDirectEnAvant([]), null);
});
