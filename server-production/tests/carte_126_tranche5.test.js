// Tests de la carte 126 tranche 5, 11 nov. 2026 : suivi éducatif
// filtré aux inscrits. Constat de la tranche : le filtrage était
// déjà en place depuis la tranche 3, liste filtrée par les
// inscriptions et gardes par membre, donc aucun changement de
// production ici, ces tests verrouillent les critères
// d'acceptation de la tranche 5. Aucun serveur, aucune base,
// aucune donnée réelle. Lancer depuis server-production :
// node --test tests/carte_126_tranche5.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dossier = path.dirname(fileURLToPath(import.meta.url));
const racine = path.join(dossier, '..');
const serveur = fs.readFileSync(path.join(racine, 'server.js'), 'utf8');

// Profondeur d'accolades avant une ligne, comme le test de
// non-régression de la tranche 2 : une route au premier niveau
// est à profondeur 0.
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

test('Carte 126 T5, suivi : liste filtrée aux inscrits de son activité', () => {
  assert.ok(serveur.includes("const porteeNomination = await activitesPourPermission(req, 'suivi.lire');"), 'portée par les nominations');
  assert.ok(serveur.includes('AND ($4::uuid[] IS NULL OR EXISTS (SELECT 1 FROM inscriptions i WHERE i.membre_id = s.membre_id AND i.evenement_id = ANY($4::uuid[])))'), 'liste suivis filtrée par les inscriptions');
});

test('Carte 126 T5, suivi : lecture et écriture gardées par membre', () => {
  assert.equal(serveur.split("await exigerNomination(req, 'suivi.lire', { membreId: row.membre_id });").length - 1, 1, 'garde lecture suivi');
  assert.equal(serveur.split("await exigerNomination(req, 'suivi.ecrire', { membreId: b.membre_id });").length - 1, 2, 'garde écriture suivi, création et modification');
});

test('Carte 126 T5, suivi : responsable de structure et administrateur général voient tout', () => {
  assert.ok(serveur.includes("if (n.portee === 'structure') return null;"), 'portée structure, tout');
  assert.ok(serveur.includes("if (req.user.role === 'admin_general') return;"), 'général passe la garde');
  assert.ok(serveur.includes("if (req.user.role === 'admin_general') return null;"), 'général passe la portée');
  assert.ok(serveur.includes("permissions: ['suivi.lire', 'suivi.ecrire']"), 'responsable du suivi éducatif');
  assert.ok(serveur.includes("permissions: ['camp.lire', 'camp.inscriptions', 'suivi.lire', 'rapports.lire', 'membres.inscrire']"), 'secrétariat lit le suivi');
});

test('Carte 126 T5, suivi : gardes non strictes, point ouvert', () => {
  const gardes = serveur.split('\n').filter((l) => l.includes("'suivi.lire'") || l.includes("'suivi.ecrire'"));
  assert.ok(gardes.length >= 3, 'trois gardes suivi');
  assert.ok(gardes.every((l) => !l.includes('obligatoire')), 'aucune garde suivi obligatoire');
  assert.equal(serveur.split('obligatoire: true').length - 1, 5, 'obligatoire vrai seulement sur les routes de camp et le suivi des versements');
});

test('Carte 126 T5, suivi : pas de règle de membre effectif, le membre est direct', () => {
  const debut = serveur.indexOf("app.get('/admin/suivis-scolaires'");
  const fin = serveur.indexOf("app.get('/moi/suivis-scolaires'", debut);
  const bloc = serveur.slice(debut, fin);
  assert.ok(bloc.includes('i.membre_id = s.membre_id'), 'suivi rattaché au membre lui-même');
  assert.ok(!bloc.includes('beneficiaire'), 'aucun payeur ou bénéficiaire pour un suivi');
});

test('Carte 126 T5, non-régression : routes suivi au premier niveau', () => {
  for (const route of [
    "app.get('/admin/suivis-scolaires'",
    "app.get('/admin/suivis-scolaires/:id'",
    "app.post('/admin/suivis-scolaires'",
    "app.put('/admin/suivis-scolaires/:id'",
    "app.get('/moi/suivis-scolaires'",
  ]) {
    const ligne = ligneDe(route);
    assert.ok(ligne > 0, `${route} présente`);
    assert.equal(profondeurAvant(ligne), 0, `${route} au premier niveau`);
  }
  assert.equal(profondeurAvant(serveur.split('\n').length), 0, 'solde total nul');
});
