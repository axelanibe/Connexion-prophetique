// Tests de la carte 126 tranche 3, 10 nov. 2026 : helper
// exigerNomination, garde par activité sur les routes camp,
// inscriptions, finances et suivi, et permission membres.inscrire
// pour le secrétariat et la direction. Aucun serveur, aucune base,
// aucune donnée réelle. Lancer depuis server-production :
// node --test tests/carte_126_tranche3.test.js
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

test('Carte 126 T3, helper : une seule règle, lue une fois', () => {
  assert.ok(serveur.includes('const exigerNomination = async (req, permission, { evenementId, membreId } = {}) => {'), 'helper');
  assert.ok(serveur.includes('const nominationsActives = async (req) => {'), 'lecture des nominations');
  assert.ok(serveur.includes('const activitesPourPermission = async (req, permission) => {'), 'portée pour les listes');
  assert.equal(serveur.split('AND n.debute_le <= now() AND (n.finit_le IS NULL OR n.finit_le > now())').length - 1, 1, 'une seule lecture des nominations actives, avec début');
  assert.ok(serveur.includes('WHERE n.membre_id = $1 AND NOT n.revoque'), 'non révoquées');
  assert.ok(serveur.includes('AND n.debute_le <= now() AND (n.finit_le IS NULL OR n.finit_le > now())'), 'début atteint, fin non dépassée');
  assert.ok(serveur.includes("if (n.portee === 'structure') return true;"), 'structure voit tout');
  assert.ok(serveur.includes('SELECT evenement_id FROM inscriptions WHERE membre_id = $1'), 'activités du membre pour le suivi');
  assert.ok(serveur.includes("throw httpError(403, 'Cette nomination ne permet pas cette action.');"), '403 nomination');
});

test('Carte 126 T3, helper : général et sans nomination gardent tout', () => {
  assert.ok(serveur.includes("if (req.user.role === 'admin_general') return;"), 'général passe la garde');
  assert.ok(serveur.includes('if (!actives.length) return;'), 'sans nomination, comportement d’avant');
  assert.ok(serveur.includes("if (req.user.role === 'admin_general') return null;"), 'général voit tout en liste');
  assert.ok(serveur.includes('if (!actives.length) return null;'), 'sans nomination, liste entière');
});

test('Carte 126 T3, inscriptions : directeur ne voit que son camp', () => {
  assert.ok(serveur.includes("app.get('/admin/inscriptions', { preHandler: contenuG }"), 'route inscriptions contenuG');
  const gate = serveur.indexOf("await exigerNomination(req, 'camp.inscriptions', { evenementId });");
  assert.ok(gate > 0, 'garde inscriptions');
  const debut = serveur.indexOf("app.get('/admin/inscriptions'");
  const ev404 = serveur.indexOf("if (!ev) throw httpError(404, 'Camp introuvable.');", debut);
  assert.ok(ev404 > debut && gate > ev404, 'garde après le 404 du camp');
  assert.ok(serveur.includes("await exigerNomination(req, 'finances.lire', { evenementId });"), 'garde suivi des versements');
});

test('Carte 126 T3, présence : fiches de présence par camp', () => {
  assert.equal(serveur.split("await exigerNomination(req, 'camp.inscriptions', { evenementId: camp.id });").length - 1, 3, 'trois routes fiches de présence');
  const debut = serveur.indexOf("app.get('/admin/fiches-sante/:evenementId'");
  const fin = serveur.indexOf("app.delete('/admin/fiches-sante/:evenementId/:membreId'", debut);
  assert.ok(debut > 0 && fin > debut, 'routes santé trouvées');
  assert.ok(!serveur.slice(debut, fin).includes('exigerNomination'), 'santé non touchée, écart tranche 3');
});

test('Carte 126 T3, finances : listes filtrées par activité', () => {
  assert.ok(serveur.includes("const porteeNomination = await activitesPourPermission(req, 'finances.lire');"), 'portée finances');
  assert.ok(serveur.includes('AND ($7::uuid[] IS NULL OR p.evenement_id = ANY($7::uuid[]))'), 'paiements et totaux filtrés');
  assert.ok(serveur.includes('AND ($3::uuid[] IS NULL OR p.evenement_id = ANY($3::uuid[]))'), 'comptabilité filtrée');
  assert.ok(serveur.includes('const rapports = porteeNomination === null ? (await q('), 'rapports vides pour un trésorier d’activité');
  assert.ok(serveur.includes('const cotisations = porteeNomination === null ? (await q('), 'cotisations vides pour un trésorier d’activité');
});

test('Carte 126 T3, finances : validation par activité, pas de contournement', () => {
  assert.ok(serveur.includes('SELECT p.evenement_id, m.etablissement_id FROM paiements p'), 'activité du paiement lue');
  const gate = serveur.indexOf("await exigerNomination(req, 'finances.valider', { evenementId: row.evenement_id });");
  assert.ok(gate > 0, 'garde validation');
  const confirmation = serveur.indexOf("await confirmPayment(c, id, 'validation_structure'");
  assert.ok(confirmation > gate, 'garde avant la confirmation du paiement');
  assert.ok(serveur.includes("app.post('/admin/paiements/:id/valider', { preHandler: guard('admin_general', 'admin_etablissement') }"), 'garde contenuG inchangée');
});

test('Carte 126 T3, suivi : responsable éducatif, inscrits de son activité', () => {
  assert.ok(serveur.includes('AND ($4::uuid[] IS NULL OR EXISTS (SELECT 1 FROM inscriptions i WHERE i.membre_id = s.membre_id AND i.evenement_id = ANY($4::uuid[])))'), 'liste suivis filtrée');
  assert.ok(serveur.includes("await exigerNomination(req, 'suivi.lire', { membreId: row.membre_id });"), 'garde lecture suivi');
  assert.equal(serveur.split("await exigerNomination(req, 'suivi.ecrire', { membreId: b.membre_id });").length - 1, 2, 'garde écriture suivi, création et modification');
});

test('Carte 126 T3, membres.inscrire : secrétariat et direction', () => {
  assert.ok(serveur.includes("permissions: ['camp.lire', 'camp.inscriptions', 'suivi.lire', 'rapports.lire', 'membres.inscrire']"), 'secrétariat');
  assert.ok(serveur.includes("'Enregistrer des membres'"), 'droit affiché secrétariat');
  assert.ok(serveur.includes("UPDATE fonctions_admin SET permissions = permissions || '[\"membres.inscrire\"]'::jsonb"), 'migration lignes existantes');
  assert.ok(serveur.includes("WHERE code IN ('secretariat', 'direction') AND NOT (permissions @> '[\"membres.inscrire\"]'::jsonb)"), 'sans doublon');
  const gate = serveur.indexOf("await exigerNomination(req, 'membres.inscrire');");
  assert.ok(gate > 0, 'garde import');
  const debut = serveur.indexOf("app.post('/admin/membres/import'");
  const creation = serveur.indexOf("const etablissements = (await q('SELECT id, nom FROM etablissements')).rows;", debut);
  assert.ok(gate > debut && gate < creation, 'garde avant toute création');
  assert.ok(serveur.includes("app.post('/auth/inscription', authLimit"), 'auto-inscription inchangée');
});

test('Carte 126 T3, non-régression : routes modifiées au premier niveau', () => {
  for (const route of [
    "app.get('/admin/comptabilite'",
    "app.get('/admin/suivis-scolaires'",
    "app.get('/admin/suivis-scolaires/:id'",
    "app.post('/admin/suivis-scolaires'",
    "app.put('/admin/suivis-scolaires/:id'",
    "app.post('/admin/fiches-presence/:evenementId'",
    "app.get('/admin/fiches-presence/:evenementId/:id'",
    "app.delete('/admin/fiches-presence/:evenementId/:id'",
    "app.get('/admin/paiements'",
    "app.get('/admin/paiements/totaux'",
    "app.post('/admin/paiements/:id/valider'",
    "app.get('/admin/inscriptions'",
    "app.get('/admin/suivi-versements'",
    "app.post('/admin/membres/import'",
  ]) {
    const ligne = ligneDe(route);
    assert.ok(ligne > 0, `${route} présente`);
    assert.equal(profondeurAvant(ligne), 0, `${route} au premier niveau`);
  }
  assert.equal(profondeurAvant(serveur.split('\n').length), 0, 'solde total nul');
});
