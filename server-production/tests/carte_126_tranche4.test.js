// Tests de la carte 126 tranche 4, 11 nov. 2026 : finances par
// activité via les inscrits, et nomination obligatoire pour les
// camps, décision d'Axel le 10 nov. 2026. Aucun serveur, aucune
// base, aucune donnée réelle. Lancer depuis server-production :
// node --test tests/carte_126_tranche4.test.js
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

const repliInscrits = (param) => `OR (p.type = 'camp' AND EXISTS (SELECT 1 FROM inscriptions i WHERE i.membre_id = (CASE WHEN p.beneficiaire_contact IS NOT NULL THEN p.beneficiaire_id ELSE p.membre_id END) AND i.evenement_id = ANY(${param}::uuid[])))`;

test('Carte 126 T4, helper : nomination obligatoire pour les camps', () => {
  assert.ok(serveur.includes('const exigerNomination = async (req, permission, { evenementId, membreId, obligatoire } = {}) => {'), 'option obligatoire');
  assert.ok(serveur.includes("if (obligatoire) throw httpError(403, 'Une nomination est requise pour cette action.');"), 'sans nomination, route de camp refusée');
  assert.ok(serveur.includes("if (req.user.role === 'admin_general') return;"), 'général passe toujours');
  const aide = serveur.indexOf('const exigerNomination = async');
  const general = serveur.indexOf("if (req.user.role === 'admin_general') return;", aide);
  const obligatoire = serveur.indexOf("if (obligatoire) throw httpError(403, 'Une nomination est requise pour cette action.');", aide);
  assert.ok(general > 0 && obligatoire > general, 'général avant la règle obligatoire');
});

test('Carte 126 T4, politique : les routes de camp exigent une nomination', () => {
  assert.equal(serveur.split("await exigerNomination(req, 'camp.inscriptions', { evenementId: camp.id, obligatoire: true });").length - 1, 3, 'trois routes fiches de présence');
  assert.ok(serveur.includes("await exigerNomination(req, 'camp.inscriptions', { evenementId, obligatoire: true });"), 'liste des inscriptions');
  assert.ok(serveur.includes("await exigerNomination(req, 'finances.lire', { evenementId, obligatoire: true });"), 'suivi des versements');
  assert.ok(serveur.includes("obligatoire: row.type === 'camp'"), 'validation obligatoire pour un paiement de camp seulement');
});

test('Carte 126 T4, politique : les autres périmètres ne changent pas', () => {
  assert.ok(serveur.includes("await exigerNomination(req, 'membres.inscrire');"), 'import sans obligatoire');
  assert.ok(serveur.includes("await exigerNomination(req, 'suivi.lire', { membreId: row.membre_id });"), 'lecture suivi sans obligatoire');
  assert.equal(serveur.split("await exigerNomination(req, 'suivi.ecrire', { membreId: b.membre_id });").length - 1, 2, 'écriture suivi sans obligatoire');
  assert.ok(serveur.includes("if (!actives.length) return null;"), 'listes gardent la compatibilité');
});

test('Carte 126 T4, finances : périmètre par les inscrits', () => {
  assert.ok(serveur.includes(`($3::uuid[] IS NULL OR p.evenement_id = ANY($3::uuid[]) ${repliInscrits('$3')}`), 'comptabilité, repli inscrits');
  assert.ok(serveur.includes(`($7::uuid[] IS NULL OR p.evenement_id = ANY($7::uuid[]) ${repliInscrits('$7')}`), 'paiements et totaux, repli inscrits');
  assert.ok(serveur.includes("CASE WHEN p.beneficiaire_contact IS NOT NULL THEN p.beneficiaire_id ELSE p.membre_id END"), 'membre effectif, payeur ou bénéficiaire');
  assert.equal(serveur.split("p.type = 'camp' AND EXISTS (SELECT 1 FROM inscriptions i").length - 1, 3, 'repli camp seulement, trois listes finances');
});

test('Carte 126 T4, finances : validation, repli par les inscriptions', () => {
  assert.ok(serveur.includes('SELECT p.type, p.evenement_id, p.membre_id, p.beneficiaire_id, p.beneficiaire_contact, m.etablissement_id FROM paiements p'), 'type et membre effectif lus');
  assert.ok(serveur.includes('const membreEffectif = row.beneficiaire_contact != null ? row.beneficiaire_id : row.membre_id;'), 'membre effectif');
  assert.ok(serveur.includes("membreId: row.type === 'camp' ? membreEffectif : null"), 'repli seulement pour un paiement de camp');
});

test('Carte 126 T4, non-régression : routes modifiées au premier niveau', () => {
  for (const route of [
    "app.get('/admin/comptabilite'",
    "app.post('/admin/fiches-presence/:evenementId'",
    "app.get('/admin/fiches-presence/:evenementId/:id'",
    "app.delete('/admin/fiches-presence/:evenementId/:id'",
    "app.get('/admin/paiements'",
    "app.get('/admin/paiements/totaux'",
    "app.post('/admin/paiements/:id/valider'",
    "app.get('/admin/inscriptions'",
    "app.get('/admin/suivi-versements'",
  ]) {
    const ligne = ligneDe(route);
    assert.ok(ligne > 0, `${route} présente`);
    assert.equal(profondeurAvant(ligne), 0, `${route} au premier niveau`);
  }
  assert.equal(profondeurAvant(serveur.split('\n').length), 0, 'solde total nul');
});
