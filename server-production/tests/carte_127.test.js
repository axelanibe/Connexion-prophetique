// Tests de la carte 127, 10 nov. 2026 : pays de résidence du
// membre. Aucun serveur, aucune base, aucune donnée réelle. Lancer
// depuis server-production : node --test tests/carte_127.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normaliserPaysResidence, PAYS_RESIDENCE } from '../src/telephone_nom.js';

const dossier = path.dirname(fileURLToPath(import.meta.url));
const racine = path.join(dossier, '..');
const serveur = fs.readFileSync(path.join(racine, 'server.js'), 'utf8');
const application = fs.readFileSync(path.join(racine, '..', 'lib', 'main.dart'), 'utf8');
const modeles = fs.readFileSync(path.join(racine, '..', 'lib', 'app_models.dart'), 'utf8');

test('Carte 127, liste : 13 pays, Côte d’Ivoire en premier', () => {
  assert.equal(PAYS_RESIDENCE.length, 13);
  assert.equal(PAYS_RESIDENCE[0], 'Côte d’Ivoire');
  assert.equal(PAYS_RESIDENCE[12], 'Autre pays');
});

test('Carte 127, normalisation : liste fermée, en majuscules', () => {
  assert.equal(normaliserPaysResidence('Côte d’Ivoire'), 'CÔTE D’IVOIRE');
  assert.equal(normaliserPaysResidence('france'), 'FRANCE');
  assert.equal(normaliserPaysResidence('  canada  '), 'CANADA');
  assert.equal(normaliserPaysResidence('Autre pays'), 'AUTRE PAYS');
  assert.equal(normaliserPaysResidence('Japon'), null);
  assert.equal(normaliserPaysResidence(''), null);
  assert.equal(normaliserPaysResidence(null), null);
  assert.equal(normaliserPaysResidence(undefined), null);
});

test('Carte 127, serveur : colonne, route et inscription branchées', () => {
  assert.ok(serveur.includes('ALTER TABLE membres ADD COLUMN IF NOT EXISTS pays_residence text'), 'migration');
  assert.ok(serveur.includes("app.post('/moi/pays-residence'"), 'route');
  assert.ok(serveur.includes("UPDATE membres SET pays_residence = $2 WHERE id = $1"), 'mise à jour');
  assert.ok(serveur.includes('m.pays_residence,'), 'renvoyé par /moi');
  assert.ok(serveur.includes("pays_residence: z.string().trim().min(1).max(50).refine((v) => normaliserPaysResidence(v) != null, { message: 'Pays de résidence invalide.' }).transform(texteMajuscules).optional(),"), 'inscription');
  assert.ok(serveur.includes('matricule, pays_residence) VALUES ($1,$2,$3,$4,$5,$6,$7)'), 'insertion');
  assert.ok(serveur.includes('RETURNING id, matricule, nom_complet, valide_jusqua, pays_residence'), 'renvoyé par inscription');
});

test('Carte 127, application : valeur serveur ramenée au canonique', () => {
  assert.ok(modeles.includes('String paysResidenceCanonique(String v)'), 'aide canonique');
  assert.ok(application.includes('paysResidence = paysResidenceCanonique(paysServeur);'), 'synchronisation');
  assert.ok(application.includes('if (_pays != null && _pays!.isNotEmpty && !kPaysResidence.contains(_pays)) DropdownMenuItem(value: _pays,'), 'valeur gardée dans le menu');
});
