// Tests purs des anniversaires, tranche 5, 4 nov. 2026 : aucun serveur,
// aucune base, aucune donnée réelle. Lancer depuis server-production :
//   node --test tests/anniversaires.test.js
// Les références attendues ci-dessous viennent d'une implémentation
// indépendante (Python) du même FNV-1a, pas du code testé lui-même.
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ANNIVERSAIRE_VERSETS,
  anniversaireHash,
  anniversaireVersetIndex,
  anniversaireReference,
  estAnniversaireAujourdhui,
  formaterDateIntegration,
} from '../src/anniversaires.js';
import { anniversaireCourriel } from '../src/email.js';

test('la liste reprend les 26 versets vérifiés, sans ajout', () => {
  assert.equal(ANNIVERSAIRE_VERSETS.length, 26);
  assert.deepEqual(ANNIVERSAIRE_VERSETS[1], [18, 23, 1]);
  assert.deepEqual(ANNIVERSAIRE_VERSETS[2], [42, 3, 16]);
});

test('le hachage est déterministe et le verset change chaque année', () => {
  assert.equal(anniversaireHash('CP-AA-2526'), anniversaireHash('CP-AA-2526'));
  assert.equal(anniversaireReference('CP-AA-2526', 2026), 'Jérémie 29:11');
  assert.equal(anniversaireReference('CP-AA-2526', 2027), 'Ésaïe 41:10');
  assert.equal(anniversaireReference('CP-AA-2527', 2026), 'Philippiens 4:13');
  assert.notEqual(
    anniversaireVersetIndex('CP-AA-2526', 2026),
    anniversaireVersetIndex('CP-AA-2526', 2027),
  );
  assert.ok(anniversaireVersetIndex('CP-AA-2526', 2026) >= 0);
  assert.ok(anniversaireVersetIndex('CP-AA-2526', 2026) < 26);
});

test('le jour J est reconnu, le lendemain ne l’est pas, y compris le 29 février', () => {
  assert.equal(estAnniversaireAujourdhui('1990-11-04', '2026-11-04'), true);
  assert.equal(estAnniversaireAujourdhui('1990-11-04', '2026-11-05'), false);
  assert.equal(estAnniversaireAujourdhui('1990-11-04', '2026-11-03'), false);
  assert.equal(estAnniversaireAujourdhui(null, '2026-11-04'), false);
  assert.equal(estAnniversaireAujourdhui('2000-02-29', '2027-02-28'), true);
  assert.equal(estAnniversaireAujourdhui('2000-02-29', '2027-02-27'), false);
  assert.equal(estAnniversaireAujourdhui('2000-02-29', '2028-02-29'), true);
  assert.equal(estAnniversaireAujourdhui('2000-02-29', '2028-02-28'), false);
});

test('la date d’intégration s’écrit en toutes lettres, sans âge', () => {
  assert.equal(formaterDateIntegration('2024-03-12'), '12 mars 2024');
  assert.equal(formaterDateIntegration(''), '');
  assert.equal(formaterDateIntegration('nimporte-quoi'), '');
});

test('le courriel reprend le nouveau texte d’Axel du 4 nov. 2026, sans marque étrangère, sans âge', () => {
  const contenu = anniversaireCourriel({
    nom: 'Jean-Claude Kouassi',
    dateIntegration: '12 mars 2024',
    referenceVerset: 'Jérémie 29:11',
  });
  assert.equal(contenu.sujet, 'Joyeux anniversaire - CONNEXION PROPHETIQUE');
  assert.match(contenu.texte, /Bonjour Jean-Claude,/);
  assert.match(contenu.texte, /Nous sommes heureux de vous compter parmi nous Jean-Claude au nom de Connexion Prophétique nous vous souhaitons Joyeux anniversaire\./);
  assert.doesNotMatch(contenu.texte, /grande famille/);
  assert.match(contenu.texte, /Jérémie 29:11/);
  assert.match(contenu.texte, /nouvelle année/);
  assert.match(contenu.texte, /support@connexionprophetique\.com/);
  assert.match(contenu.texte, /Former pour mieux servir/);
  assert.doesNotMatch(contenu.html, /Transfergratis/i);
  assert.doesNotMatch(contenu.texte, /Transfergratis/i);
  assert.match(contenu.html, /#0B1F3A/);
  assert.match(contenu.html, /#D4A72C/);
  assert.doesNotMatch(contenu.html, /#cbb26a/);
  assert.doesNotMatch(contenu.texte, /1990/);
});
