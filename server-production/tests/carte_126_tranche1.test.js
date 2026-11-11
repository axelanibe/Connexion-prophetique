// Tests de la carte 126 tranche 1, 10 nov. 2026 : création
// d'activité côté serveur, POST /admin/evenements et PUT
// /admin/evenements/:id, ouverts aux administrateurs
// d'établissement pour leur établissement. Aucun serveur, aucune
// base, aucune donnée réelle. Lancer depuis server-production :
// node --test tests/carte_126_tranche1.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dossier = path.dirname(fileURLToPath(import.meta.url));
const racine = path.join(dossier, '..');
const serveur = fs.readFileSync(path.join(racine, 'server.js'), 'utf8');

test('Carte 126 T1, migration : etablissement_id sur evenements', () => {
  assert.ok(serveur.includes('ALTER TABLE evenements ADD COLUMN IF NOT EXISTS etablissement_id uuid REFERENCES etablissements(id) ON DELETE SET NULL'), 'migration');
  assert.ok(!serveur.includes("crud('evenements'"), 'crud evenements retiré');
});

test('Carte 126 T1, POST : contenuG, fonction clé, périmètre par le jeton', () => {
  assert.ok(serveur.includes("app.post('/admin/evenements', { preHandler: contenuG }"), 'route POST');
  assert.ok(serveur.includes("exigerFonctionAdmin(req, 'editeur', 'responsable')"), 'fonction clé');
  assert.ok(serveur.includes("insertSql('evenements', { ...b, etablissement_id: etablissementId })"), 'insertion avec établissement');
  assert.ok(serveur.includes("? (req.user.eid ?? null)"), 'établissement imposé par le jeton');
  assert.ok(serveur.includes("if (req.user.role === 'admin_etablissement' && !etablissementId) throw httpError(403, 'Votre compte n’est rattaché à aucun établissement.');"), '403 sans établissement');
  assert.ok(serveur.includes("await audit(c, req, 'evenement.cree', 'evenements', r.id);"), 'audit création');
  assert.ok(serveur.includes('await apresCreationEvenement(row);'), 'notification gardée');
  assert.ok(serveur.includes('return reply.code(201).send(row);'), '201');
});

test('Carte 126 T1, PUT : chargement, 404, 403 établissement étranger', () => {
  assert.ok(serveur.includes("app.put('/admin/evenements/:id', { preHandler: contenuG }"), 'route PUT');
  assert.ok(serveur.includes("const existant = (await q('SELECT id, etablissement_id FROM evenements WHERE id = $1', [id])).rows[0];"), 'chargement');
  assert.ok(serveur.includes("if (!existant) throw httpError(404, 'Introuvable.');"), '404');
  assert.ok(serveur.includes("if (req.user.role === 'admin_etablissement' && existant.etablissement_id !== req.user.eid) throw httpError(403, 'Cette activité n’appartient pas à votre établissement.');"), '403 étranger');
  assert.ok(serveur.includes("if (req.user.role === 'admin_general' && req.body != null && 'etablissement_id' in req.body)"), 'déplacement réservé au général');
  assert.ok(serveur.includes("if (!Object.keys(body).length) throw httpError(400, 'Aucune modification.');"), '400 sans modification');
  assert.ok(serveur.includes("await audit(c, req, 'evenement.modifie', 'evenements', id, body);"), 'audit modification');
});

test('Carte 126 T1, schéma : champs envoyés par l’application', () => {
  for (const champ of ['nom:', 'type:', 'lieu:', 'pays:', 'tarif_fcfa:', 'est_kairos:', 'image_id:', 'dates_texte:', 'date_debut:', 'date_fin:', 'description:', 'salle_visio:', 'heure_debut:', 'publie:']) {
    assert.ok(serveur.includes(champ), champ);
  }
  assert.ok(serveur.includes("const evenementS = z.object({"), 'schéma evenementS');
  assert.ok(serveur.includes("const apresCreationEvenement = async (row) => {"), 'notification extraite');
  assert.ok(serveur.includes("await notifierTous('nouveau_camp'"), 'notification camp gardée');
  assert.ok(serveur.includes("await notifierTous('nouvelle_reunion'"), 'notification réunion gardée');
});
