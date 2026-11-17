// Tests purs de la configuration de version, 16 nov. 2026 : aucun
// serveur, aucune base, aucune donnée réelle. Lancer depuis
// server-production :
//   node --test tests/config_version.test.js
// Les valeurs vivent dans src/config_version.js, importé par
// server.js pour GET /api/config. La route elle-même n'est pas
// testée ici, faute de base dans ce dossier de tests.
import test from 'node:test';
import assert from 'node:assert/strict';
import { VERSION_CONFIG } from '../src/config_version.js';

test('la réponse a exactement la forme attendue', () => {
  assert.deepEqual(Object.keys(VERSION_CONFIG).sort(), [
    'configVersion',
    'minAppVersion',
    'updateUrl',
  ]);
  assert.equal(typeof VERSION_CONFIG.configVersion, 'number');
  assert.equal(Number.isInteger(VERSION_CONFIG.configVersion), true);
  assert.equal(typeof VERSION_CONFIG.minAppVersion, 'string');
  assert.equal(typeof VERSION_CONFIG.updateUrl, 'string');
});

test('les valeurs de la v1 sont celles décidées', () => {
  assert.equal(VERSION_CONFIG.configVersion, 1);
  assert.equal(VERSION_CONFIG.minAppVersion, '1.0.1');
  assert.equal(VERSION_CONFIG.updateUrl, 'https://www.connexionprophetique.com/');
});

test('minAppVersion est une version majeur.mineur.correctif', () => {
  assert.match(VERSION_CONFIG.minAppVersion, /^\d+\.\d+\.\d+$/);
});

test('updateUrl est une adresse https du site de la structure', () => {
  assert.ok(VERSION_CONFIG.updateUrl.startsWith('https://www.connexionprophetique.com'));
});

test('les constantes sont figées', () => {
  assert.equal(Object.isFrozen(VERSION_CONFIG), true);
});
