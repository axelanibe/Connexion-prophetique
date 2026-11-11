// Tests de la carte 129, 11 nov. 2026 : fonction et établissement
// affilié modifiables dans Modifier mes infos, côté membre.
// Aucun serveur, aucune base, aucune donnée réelle. Lancer
// depuis server-production : node --test tests/carte_129.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dossier = path.dirname(fileURLToPath(import.meta.url));
const racine = path.join(dossier, '..');
const serveur = fs.readFileSync(path.join(racine, 'server.js'), 'utf8');
const page = fs.readFileSync(path.join(racine, '..', 'lib', 'carte_nouvelle.dart'), 'utf8');
const api = fs.readFileSync(path.join(racine, '..', 'lib', 'api.dart'), 'utf8');

test('Carte 129, bureau national : inséré au démarrage, sans toucher à schema.sql', () => {
  assert.ok(serveur.includes("INSERT INTO etablissements (nom) VALUES ('Bureau national') ON CONFLICT (nom) DO NOTHING"), 'migration');
  const schema = fs.readFileSync(path.join(racine, 'schema.sql'), 'utf8');
  assert.ok(!schema.includes('Bureau national'), 'schema.sql inchangé');
});

test('Carte 129, serveur : route /moi/etablissement, résolution par nom ou id', () => {
  assert.ok(serveur.includes("app.post('/moi/etablissement'"), 'route');
  assert.ok(serveur.includes('UPDATE membres SET etablissement_id = NULL WHERE id = $1'), 'Autre sans identifiant');
  assert.ok(serveur.includes('UPDATE membres SET etablissement_id = $2 WHERE id = $1'), 'mise à jour');
  assert.ok(serveur.includes('SELECT id, nom FROM etablissements WHERE lower(nom) = lower($1)'), 'résolution par nom');
  assert.ok(serveur.includes('SELECT id, nom FROM etablissements WHERE id = $1'), 'résolution par id');
  assert.ok(serveur.includes("throw httpError(400, 'Établissement invalide.')"), 'refus hors liste');
  // La route ne touche ni au matricule, ni aux certificats, ni aux attestations.
  const debut = serveur.indexOf("app.post('/moi/etablissement'");
  const fin = serveur.indexOf("app.post('/moi/date-naissance'", debut);
  const route = serveur.slice(debut, fin).replace(/\/\/.*$/gm, '');
  assert.ok(!route.includes('matricule'), 'matricule intact');
  assert.ok(!route.includes('certificat'), 'certificats intacts');
  assert.ok(!route.includes('attestation'), 'attestations intactes');
});

test('Carte 129, serveur : la route est au premier niveau, leçon tranche 2 carte 126', () => {
  const debut = serveur.indexOf("app.post('/moi/etablissement'");
  assert.ok(debut > 0, 'route présente');
  const profondeur = (texte) => {
    let n = 0;
    for (const c of texte) { if (c === '{') n++; else if (c === '}') n--; }
    return n;
  };
  assert.equal(profondeur(serveur.slice(0, debut)), 0, 'la route commence au premier niveau');
});

test('Carte 129, serveur : la fonction passe par la route existante, liste fermée', () => {
  assert.ok(serveur.includes("app.post('/moi/fonction'"), 'route /moi/fonction gardée');
  assert.ok(serveur.includes('!FONCTIONS_MEMBRE.includes(fonction)'), 'liste fermée');
  assert.ok(serveur.includes('e.nom AS etablissement'), 'renvoyé par /moi');
});

test('Carte 129, application : les deux menus sont dans NouvelleModifierInfosPage', () => {
  assert.ok(page.includes('class NouvelleModifierInfosPage'), 'nouvelle page');
  assert.ok(page.includes("Text(tr('Fonction')"), 'menu fonction');
  assert.ok(page.includes('for (final f in kFonctions) DropdownMenuItem(value: f,'), 'fonctions de la liste');
  assert.ok(page.includes("Text(tr('Établissement')"), 'menu établissement');
  assert.ok(page.includes('for (final e in app.etabs) DropdownMenuItem(value: e.name,'), 'établissements du serveur');
  assert.ok(page.includes("DropdownMenuItem(value: 'Autre', child: Text(tr('Autre')"), 'choix Autre');
  assert.ok(page.includes('api.updateFonction(nouvelleFonction)'), 'envoi fonction');
  assert.ok(page.includes('api.updateMonEtablissement('), 'envoi établissement');
  assert.ok(page.includes('unawaited(app.syncServerProfile())'), 'Profil et carte resynchronisés');
});

test('Carte 129, application : envoi au serveur sans jamais bloquer', () => {
  assert.ok(api.includes("await _post('/moi/etablissement', {'etablissement': etablissement})"), 'route appelée');
  assert.ok(page.includes('Établissement gardé sur cet appareil seulement'), 'message en cas d’échec');
  assert.ok(page.includes('Fonction gardée sur cet appareil seulement'), 'message en cas d’échec');
});
