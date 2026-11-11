// Tests de la carte 128, 11 nov. 2026 : lier un enfant par nom ou
// par matricule. Vérifications statiques du code du serveur, sans
// base, dans le style des tranches de la carte 126. Les tests
// d'intégration contre une vraie base sont dans
// tests/espace-parent.test.js. Lancer depuis server-production :
// node --test tests/carte_128.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dossier = path.dirname(fileURLToPath(import.meta.url));
const serveur = fs.readFileSync(path.join(dossier, '..', 'server.js'), 'utf8');

// Profondeur d'accolades avant une ligne, comme le test de
// non-régression de la tranche 2 de la carte 126 : une route au
// premier niveau est à profondeur 0.
const profondeurAvant = (ligneCible) => {
  const lignes = serveur.split('\n');
  let n = 0;
  for (let i = 0; i < ligneCible - 1; i++) {
    for (const c of lignes[i]) { if (c === '{') n++; else if (c === '}') n--; }
  }
  return n;
};
const ligneDe = (texte) => {
  const i = serveur.split('\n').findIndex((l) => l.includes(texte));
  return i < 0 ? -1 : i + 1;
};
const blocRoute = (texte) => {
  const debut = serveur.indexOf(texte);
  assert.ok(debut >= 0, `${texte} présent`);
  return serveur.slice(debut, serveur.indexOf('});', debut));
};

test('Carte 128, route recherche : au premier niveau, solde nul', () => {
  const ligne = ligneDe("app.get('/moi/membres/recherche'");
  assert.ok(ligne > 0, 'route recherche présente');
  assert.equal(profondeurAvant(ligne), 0, 'route recherche au premier niveau');
  assert.equal(profondeurAvant(serveur.split('\n').length), 0, 'solde total nul');
});

test('Carte 128, route recherche : bornée à 10, triée par pertinence', () => {
  const bloc = blocRoute("app.get('/moi/membres/recherche'");
  assert.ok(bloc.includes('LIMIT 10'), 'au plus 10 résultats');
  assert.ok(bloc.includes('m.matricule = $1 THEN 0'), 'matricule exact en premier');
  assert.ok(bloc.includes('UPPER(m.nom_complet) = $3 THEN 1'), 'nom exact ensuite');
  assert.ok(bloc.includes("UPPER(m.nom_complet) LIKE $4 ESCAPE"), 'nom qui commence par la saisie ensuite');
  assert.ok(bloc.includes('ORDER BY CASE'), 'tri par pertinence');
});

test('Carte 128, route recherche : insensible à la casse, au moins 3 caractères', () => {
  const bloc = blocRoute("app.get('/moi/membres/recherche'");
  assert.ok(bloc.includes('.toUpperCase()'), 'saisie passée en majuscules');
  assert.ok(bloc.includes('UPPER(m.nom_complet) LIKE $2'), 'noms anciens en casse mixte couverts par UPPER');
  assert.ok(bloc.includes('saisie.length < 3'), 'au moins 3 caractères');
  assert.ok(bloc.includes("Saisissez au moins 3 caractères."), 'message en français');
});

test('Carte 128, route recherche : que nom, matricule et établissement, jamais soi-même', () => {
  const bloc = blocRoute("app.get('/moi/membres/recherche'");
  assert.ok(bloc.includes('SELECT m.id, m.nom_complet, m.matricule, e.nom AS etablissement'), 'que ce qui sert à choisir');
  assert.ok(bloc.includes('LEFT JOIN etablissements e'), 'nom de l’établissement joint');
  assert.ok(bloc.includes('m.id IS DISTINCT FROM $5'), 'le parent ne se retrouve pas lui-même');
  assert.ok(!bloc.includes('email'), 'aucun e-mail exposé');
  assert.ok(!bloc.includes('telephone'), 'aucun téléphone exposé');
});

test('Carte 128, route par matricule : intacte, au premier niveau', () => {
  const ligne = ligneDe("app.get('/moi/membres/par-matricule/:matricule'");
  assert.ok(ligne > 0, 'route par matricule toujours là');
  assert.equal(profondeurAvant(ligne), 0, 'route par matricule au premier niveau');
  const bloc = blocRoute("app.get('/moi/membres/par-matricule/:matricule'");
  assert.ok(bloc.includes("SELECT id, nom_complet, matricule FROM membres WHERE matricule = $1"), 'flux actuel inchangé');
});
