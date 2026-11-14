// Tests purs de la config design, carte 47, 6 nov. 2026 : aucun
// serveur, aucune base, aucune donnée réelle. Lancer depuis
// server-production :
//   node --test tests/design.test.js
// La logique vit dans src/design.js, importé par server.js pour
// GET /config/design et PUT /admin/design. Les routes elles-mêmes
// ne sont pas testées ici, faute de base dans ce dossier de tests.
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_DESIGN_CONFIG,
  designCouleurValide,
  designTitreValide,
  designOrdreValide,
  mergeDesignConfig,
  validateDesignPatch,
} from '../src/design.js';

test('les défauts sont exactement les valeurs actuelles de l application', () => {
  assert.equal(DEFAULT_DESIGN_CONFIG.bleuNuit, '#0B1F3A');
  assert.equal(DEFAULT_DESIGN_CONFIG.or, '#D4A72C');
  assert.equal(DEFAULT_DESIGN_CONFIG.orFonce, '#8A6A12');
  assert.equal(DEFAULT_DESIGN_CONFIG.fond, '#F5F6FA');
  assert.equal(DEFAULT_DESIGN_CONFIG.titreVieSpirituelle, 'Ma vie spirituelle');
  assert.equal(DEFAULT_DESIGN_CONFIG.titreExplorer, 'Explorer');
  assert.equal(DEFAULT_DESIGN_CONFIG.titreDecouvrir, 'Découvrir');
  assert.equal(DEFAULT_DESIGN_CONFIG.titreRendezVous, 'Prochains rendez-vous');
  assert.equal(DEFAULT_DESIGN_CONFIG.titreActualites, 'Actualités de la structure');
  assert.deepEqual(DEFAULT_DESIGN_CONFIG.ordreSections, ['accueil', 'bible', 'librairie', 'structure', 'carte', 'plus']);
});

test('une couleur est valide seulement en hexadécimal #RRGGBB', () => {
  assert.equal(designCouleurValide('#0B1F3A'), true);
  assert.equal(designCouleurValide('#d4a72c'), true);
  assert.equal(designCouleurValide('0B1F3A'), false);
  assert.equal(designCouleurValide('#0B1F3'), false);
  assert.equal(designCouleurValide('#0B1F3AA'), false);
  assert.equal(designCouleurValide('#GGGGGG'), false);
  assert.equal(designCouleurValide('bleu'), false);
  assert.equal(designCouleurValide(''), false);
  assert.equal(designCouleurValide(null), false);
  assert.equal(designCouleurValide(123), false);
});

test('un titre est valide seulement non vide et de 120 caractères au plus', () => {
  assert.equal(designTitreValide('Découvrir'), true);
  assert.equal(designTitreValide(''), false);
  assert.equal(designTitreValide('   '), false);
  assert.equal(designTitreValide('x'.repeat(120)), true);
  assert.equal(designTitreValide('x'.repeat(121)), false);
  assert.equal(designTitreValide(null), false);
});

test('l ordre des sections est valide seulement avec les 6 clés, sans doublon', () => {
  assert.equal(designOrdreValide(['accueil', 'bible', 'librairie', 'structure', 'carte', 'plus']), true);
  assert.equal(designOrdreValide(['plus', 'carte', 'structure', 'librairie', 'bible', 'accueil']), true);
  assert.equal(designOrdreValide(['accueil', 'bible', 'librairie', 'structure', 'carte', 'carte']), false);
  assert.equal(designOrdreValide(['accueil', 'bible', 'librairie', 'structure', 'carte', 'inconnu']), false);
  assert.equal(designOrdreValide(['accueil', 'bible', 'librairie', 'structure', 'carte']), false);
  assert.equal(designOrdreValide(['accueil', 'bible', 'librairie', 'structure', 'carte', 'plus', 'accueil']), false);
  assert.equal(designOrdreValide('accueil'), false);
  assert.equal(designOrdreValide(null), false);
});

test('la fusion sur les défauts garde les valeurs valides et ignore le reste', () => {
  const fusion = mergeDesignConfig({
    or: '#D4AF37',
    titreDecouvrir: 'À découvrir',
    ordreSections: ['plus', 'carte', 'structure', 'librairie', 'bible', 'accueil'],
    inconnue: 'jamais reprise',
    bleuNuit: 'pas une couleur',
    titreExplorer: '',
  });
  assert.equal(fusion.or, '#D4AF37');
  assert.equal(fusion.titreDecouvrir, 'À découvrir');
  assert.deepEqual(fusion.ordreSections, ['plus', 'carte', 'structure', 'librairie', 'bible', 'accueil']);
  assert.equal(fusion.inconnue, undefined);
  assert.equal(fusion.bleuNuit, '#0B1F3A');
  assert.equal(fusion.titreExplorer, 'Explorer');
});

test('la fusion sans objet renvoie les défauts, sans erreur', () => {
  assert.deepEqual(mergeDesignConfig(null), DEFAULT_DESIGN_CONFIG);
  assert.deepEqual(mergeDesignConfig(undefined), DEFAULT_DESIGN_CONFIG);
  assert.deepEqual(mergeDesignConfig({}), DEFAULT_DESIGN_CONFIG);
  assert.deepEqual(mergeDesignConfig([]), DEFAULT_DESIGN_CONFIG);
  const fusion = mergeDesignConfig({ or: '#111111' });
  assert.equal(fusion.or, '#111111');
  assert.equal(DEFAULT_DESIGN_CONFIG.or, '#D4A72C');
});

test('la fusion avec un ordre invalide garde l ordre par défaut', () => {
  const doublon = mergeDesignConfig({ ordreSections: ['accueil', 'accueil', 'bible', 'librairie', 'structure', 'carte'] });
  assert.deepEqual(doublon.ordreSections, DEFAULT_DESIGN_CONFIG.ordreSections);
  const incomplet = mergeDesignConfig({ ordreSections: ['accueil', 'bible'] });
  assert.deepEqual(incomplet.ordreSections, DEFAULT_DESIGN_CONFIG.ordreSections);
});

test('la validation accepte un sous ensemble de clés connues et valides', () => {
  assert.deepEqual(validateDesignPatch({ or: '#D4AF37' }), { or: '#D4AF37' });
  assert.deepEqual(
    validateDesignPatch({ titreDecouvrir: 'Explorer', ordreSections: ['plus', 'carte', 'structure', 'librairie', 'bible', 'accueil'] }),
    { titreDecouvrir: 'Explorer', ordreSections: ['plus', 'carte', 'structure', 'librairie', 'bible', 'accueil'] },
  );
});

test('la validation refuse les clés inconnues en 422', () => {
  assert.throws(() => validateDesignPatch({ prix: 1000 }), (e) => e.statusCode === 422 && /inconnues/.test(e.message));
  assert.throws(() => validateDesignPatch({ or: '#D4AF37', surprise: true }), (e) => e.statusCode === 422);
});

test('la validation refuse les valeurs invalides et les champs vides en 422', () => {
  assert.throws(() => validateDesignPatch({ or: 'rouge' }), (e) => e.statusCode === 422);
  assert.throws(() => validateDesignPatch({ fond: '#12345' }), (e) => e.statusCode === 422);
  assert.throws(() => validateDesignPatch({ titreDecouvrir: '' }), (e) => e.statusCode === 422);
  assert.throws(() => validateDesignPatch({ titreDecouvrir: '   ' }), (e) => e.statusCode === 422);
  assert.throws(() => validateDesignPatch({ titreDecouvrir: 'x'.repeat(121) }), (e) => e.statusCode === 422);
  assert.throws(() => validateDesignPatch({ ordreSections: ['accueil', 'accueil', 'bible', 'librairie', 'structure', 'carte'] }), (e) => e.statusCode === 422);
  assert.throws(() => validateDesignPatch({ ordreSections: ['accueil', 'bible'] }), (e) => e.statusCode === 422);
});

test('la validation refuse un corps vide ou sans clé connue en 400', () => {
  assert.throws(() => validateDesignPatch({}), (e) => e.statusCode === 400);
  assert.throws(() => validateDesignPatch(null), (e) => e.statusCode === 400);
  assert.throws(() => validateDesignPatch([]), (e) => e.statusCode === 400);
});
