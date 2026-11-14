import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { lieuPays, paysEvenementValide } from '../src/pays_evenement.js';

const dossier = path.dirname(fileURLToPath(import.meta.url));

test('carte 109 : lieu et pays se composent en « Lieu, Pays »', () => {
  assert.equal(lieuPays('Bonoua', 'Côte d’Ivoire'), 'Bonoua, Côte d’Ivoire');
  assert.equal(lieuPays('Bonoua', null), 'Bonoua');
  assert.equal(lieuPays('Bonoua', ''), 'Bonoua');
  assert.equal(lieuPays('', 'Canada'), 'Canada');
  assert.equal(lieuPays(null, null), '');
  assert.equal(lieuPays('  Bonoua  ', '  Côte d’Ivoire  '), 'Bonoua, Côte d’Ivoire');
});

test('carte 109 : un pays trop long est refusé, null vaut absence', () => {
  assert.equal(paysEvenementValide('Côte d’Ivoire'), true);
  assert.equal(paysEvenementValide(null), true);
  assert.equal(paysEvenementValide(undefined), true);
  assert.equal(paysEvenementValide('x'.repeat(100)), true);
  assert.equal(paysEvenementValide('x'.repeat(101)), false);
  assert.equal(paysEvenementValide(12), false);
});

test('carte 109 : la migration ajoute la colonne pays sur evenements', () => {
  const serveur = fs.readFileSync(path.join(dossier, '..', 'server.js'), 'utf8');
  assert.ok(
    serveur.includes('ALTER TABLE evenements ADD COLUMN IF NOT EXISTS pays text'),
    'server.js migre evenements.pays au démarrage',
  );
});

test('carte 109 : le schéma de création et de modification accepte le pays', () => {
  const serveur = fs.readFileSync(path.join(dossier, '..', 'server.js'), 'utf8');
  assert.ok(
    serveur.includes("pays: opt(z.string().trim().max(100).transform(texteMajuscules))"),
    'evenementS porte pays, facultatif, 100 caractères au plus, en majuscules (carte 125)',
  );
});

test('carte 109 : la liste publique des événements renvoie le pays', () => {
  const serveur = fs.readFileSync(path.join(dossier, '..', 'server.js'), 'utf8');
  assert.ok(
    serveur.includes('description, lieu, pays, tarif_fcfa'),
    'GET /evenements sélectionne pays après lieu',
  );
});

test('carte 109 : la notification de publication compose lieu et pays', () => {
  const serveur = fs.readFileSync(path.join(dossier, '..', 'server.js'), 'utf8');
  assert.ok(
    serveur.includes('lieuPays(row.lieu, row.pays)'),
    'la notification « Nouveau camp » utilise lieuPays',
  );
  assert.ok(
    serveur.includes("un nouveau camp est publié${lieuTexte}"),
    'le texte de notification porte le lieu composé',
  );
});
