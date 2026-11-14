// Tests de la carte 126 tranche 7, 11 nov. 2026 : les sept scénarios
// de la demande d'Axel. Chaque scénario est verrouillé ici, ou
// renvoyé aux tests des tranches 1 à 6 qui le verrouillent déjà.
// Couverture : S1 directeur, T3 inscriptions et présence, T4
// politique, T7 catalogue ; S2 financier, T3 listes, T4 repli et
// validation, T7 catalogue ; S3 éducatif, T3 suivi, T5, T7
// catalogue ; S4 général, T2 catalogue direction, T3 helper, T7
// négatif structure ; S5 cumul, T7 nominationAccorde ; S6 expirée
// ou révoquée, T2 migration et lectures, T3 helper, T6 affichage,
// T7 jeton sans nominations ; S7 contournement, T3 validation et
// import, T2 correctif 404, T7 inventaire des gardes. Ce qui reste
// à exercer contre une vraie base est décrit dans le compte rendu
// de la tranche, pas ici. Aucun serveur, aucune base, aucune
// donnée réelle. Lancer depuis server-production :
// node --test tests/carte_126_tranche7.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dossier = path.dirname(fileURLToPath(import.meta.url));
const racine = path.join(dossier, '..');
const serveur = fs.readFileSync(path.join(racine, 'server.js'), 'utf8');
const api = fs.readFileSync(path.join(racine, '..', 'lib', 'api.dart'), 'utf8');

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
const ligneCatalogue = (code) => serveur.split('\n').find((l) => l.includes(`code: '${code}'`));

test('Carte 126 T7, S1 directeur : son camp seulement, pas les finances ni le suivi', () => {
  const ligne = ligneCatalogue('directeur_camp');
  assert.ok(ligne, 'directeur de camp au catalogue');
  assert.ok(ligne.includes("permissions: ['camp.lire', 'camp.inscriptions', 'rapports.lire']"), 'directeur, camp et rapports');
  assert.ok(!ligne.includes('finances'), 'directeur sans finances');
  assert.ok(!ligne.includes('suivi'), 'directeur sans suivi');
  assert.ok(serveur.includes("await exigerNomination(req, 'camp.inscriptions', { evenementId, obligatoire: true });"), 'liste des inscriptions gardée, nomination obligatoire');
  assert.equal(serveur.split("await activitesPourPermission(req, 'finances.lire')").length - 1, 3, 'trois listes finances filtrées, le directeur sans finances.lire voit une portée vide');
});

test('Carte 126 T7, S2 financier : ses finances seulement', () => {
  const ligne = ligneCatalogue('tresorier_activite');
  assert.ok(ligne, 'trésorier d’activité au catalogue');
  assert.ok(ligne.includes("permissions: ['finances.lire', 'finances.valider']"), 'trésorier, finances seulement');
  assert.ok(!ligne.includes('camp'), 'trésorier sans inscriptions');
  assert.ok(!ligne.includes('suivi'), 'trésorier sans suivi');
  assert.ok(serveur.includes("await exigerNomination(req, 'finances.valider', { evenementId: row.evenement_id, membreId: row.type === 'camp' ? membreEffectif : null, obligatoire: row.type === 'camp' });"), 'validation par activité, repli inscrits');
});

test('Carte 126 T7, S3 éducatif : son suivi seulement', () => {
  const ligne = ligneCatalogue('responsable_suivi');
  assert.ok(ligne, 'responsable du suivi au catalogue');
  assert.ok(ligne.includes("permissions: ['suivi.lire', 'suivi.ecrire']"), 'responsable, suivi seulement');
  assert.ok(!ligne.includes('camp'), 'responsable sans inscriptions');
  assert.ok(!ligne.includes('finances'), 'responsable sans finances');
  assert.ok(serveur.includes("await activitesPourPermission(req, 'suivi.lire')"), 'liste suivis filtrée par les inscriptions');
});

test('Carte 126 T7, S4 général : ses modules seulement, la structure ne donne rien de plus', () => {
  const debut = serveur.indexOf('const nominationAccorde = (actives, permission, ids) => actives.some((n) => {');
  const sansPermission = serveur.indexOf("if (!permissions.includes(permission)) return false;", debut);
  const structure = serveur.indexOf("if (n.portee === 'structure') return true;", debut);
  assert.ok(debut > 0 && sansPermission > debut && structure > sansPermission, 'la permission est vérifiée avant la portée structure');
  const secretariat = ligneCatalogue('secretariat');
  assert.ok(secretariat.includes("permissions: ['camp.lire', 'camp.inscriptions', 'suivi.lire', 'rapports.lire', 'membres.inscrire']"), 'secrétariat');
  assert.ok(!secretariat.includes('finances'), 'secrétariat de structure sans finances');
  const tresorerie = ligneCatalogue('tresorerie');
  assert.ok(tresorerie.includes("permissions: ['finances.lire', 'finances.valider', 'rapports.lire']"), 'trésorerie');
  assert.ok(!tresorerie.includes('camp'), 'trésorerie sans inscriptions');
  assert.ok(!tresorerie.includes('suivi'), 'trésorerie sans suivi');
  const coordination = ligneCatalogue('coordination');
  assert.ok(!coordination.includes('finances'), 'coordination sans finances');
  const direction = ligneCatalogue('direction');
  assert.ok(direction.includes("permissions: ['camp.lire', 'camp.inscriptions', 'finances.lire', 'finances.valider', 'suivi.lire', 'suivi.ecrire', 'rapports.lire', 'membres.inscrire']"), 'direction, les 8 codes');
  const debutPortee = serveur.indexOf('const activitesPourPermission = async (req, permission) => {');
  const passe = serveur.indexOf("if (!permissions.includes(permission)) continue;", debutPortee);
  const structureNulle = serveur.indexOf("if (n.portee === 'structure') return null;", debutPortee);
  assert.ok(debutPortee > 0 && passe > debutPortee && structureNulle > passe, 'la portée ne s’ouvre que pour une nomination qui a la permission');
});

test('Carte 126 T7, S5 cumul : union sans escalade, permission et activité de la même nomination', () => {
  const debut = serveur.indexOf('const nominationAccorde = (actives, permission, ids) => actives.some((n) => {');
  assert.ok(debut > 0, 'cumul par some sur les nominations actives');
  const corps = serveur.slice(debut, serveur.indexOf('});', debut));
  assert.ok(corps.includes("if (!permissions.includes(permission)) return false;"), 'permission de cette nomination');
  assert.ok(corps.includes("if (n.portee === 'structure') return true;"), 'structure de cette nomination');
  assert.ok(corps.includes('return ids.includes(n.evenement_id);'), 'activité de cette nomination');
  assert.ok(!corps.includes('flatMap') && !corps.includes('map('), 'aucune combinaison entre nominations');
  const debutPortee = serveur.indexOf('const activitesPourPermission = async (req, permission) => {');
  assert.ok(serveur.indexOf("if (!permissions.includes(permission)) continue;", debutPortee) > debutPortee, 'portée par nomination, une à une');
});

test('Carte 126 T7, S6 expirée ou révoquée : lue en base à chaque requête, effet immédiat', () => {
  assert.ok(serveur.includes("{ sub: u.id, role: u.role, mid: m?.id ?? null, eid: u.etablissement_admin_id ?? null, fad: u.fonction_admin ?? null }"), 'jeton sans nominations');
  assert.equal(serveur.split('await nominationsActives(req)').length - 1, 2, 'une seule lecture, garde et portée');
  assert.equal(serveur.split('AND n.debute_le <= now() AND (n.finit_le IS NULL OR n.finit_le > now())').length - 1, 1, 'début atteint, fin non dépassée, une seule fois');
  const debut = serveur.indexOf('const nominationsActives = async (req) => {');
  assert.ok(serveur.slice(debut, debut + 600).includes('NOT n.revoque'), 'révoquée exclue');
  assert.ok(serveur.includes('WHERE n.membre_id = $1 AND NOT n.revoque AND (n.finit_le IS NULL OR n.finit_le > now())'), 'Mes nominations, actives seulement');
});

test('Carte 126 T7, S7 contournement : inventaire des gardes, lectures propres, écarts connus', () => {
  assert.equal(serveur.split('await exigerNomination(').length - 1, 10, 'dix gardes, aucune perdue');
  assert.equal(serveur.split('await activitesPourPermission(').length - 1, 4, 'quatre listes filtrées');
  assert.ok(serveur.includes("app.post('/admin/nominations', { preHandler: adminG }"), 'création nominations adminG');
  assert.ok(serveur.includes("app.put('/admin/nominations/:id', { preHandler: adminG }"), 'modification nominations adminG');
  assert.ok(serveur.includes("app.post('/admin/nominations/:id/revoquer', { preHandler: adminG }"), 'révocation nominations adminG');
  assert.ok(serveur.includes("app.get('/admin/nominations', { preHandler: adminG }"), 'liste nominations adminG');
  assert.ok(serveur.includes("app.get('/moi/nominations', { preHandler: membreG }"), 'Mes nominations membreG');
  assert.ok(serveur.includes('WHERE n.membre_id = $1 AND NOT n.revoque'), 'Mes nominations, ses lignes seulement, sans paramètre membre');
  assert.ok(api.includes("fetchMesNominations() => _list('/moi/nominations')"), 'application, affichage seulement, aucune gestion côté membre');
  const santeDebut = serveur.indexOf("app.get('/admin/fiches-sante/:evenementId'");
  const santeFin = serveur.indexOf("app.post('/admin/fiches-presence/:evenementId'", santeDebut);
  assert.ok(santeDebut > 0 && santeFin > santeDebut, 'routes santé trouvées');
  assert.ok(!serveur.slice(santeDebut, santeFin).includes('exigerNomination'), 'santé non gardée par nomination, écart connu tranche 3');
  const evDebut = serveur.indexOf("app.post('/admin/evenements'");
  const evFin = serveur.indexOf("app.post('/admin/etablissements'", evDebut);
  const blocEv = serveur.slice(evDebut, evFin);
  assert.ok(blocEv.includes("exigerFonctionAdmin(req, 'editeur', 'responsable')"), 'création et modification d’activité par fonction clé');
  assert.ok(!blocEv.includes('exigerNomination'), 'activité non gardée par nomination, écart connu tranche 3');
});

test('Carte 126 T7, non-régression : routes 126 au premier niveau', () => {
  for (const route of [
    "app.post('/admin/nominations'",
    "app.put('/admin/nominations/:id'",
    "app.post('/admin/nominations/:id/revoquer'",
    "app.get('/admin/nominations'",
    "app.get('/moi/nominations'",
    "app.get('/admin/comptabilite'",
    "app.get('/admin/suivis-scolaires'",
    "app.get('/admin/suivis-scolaires/:id'",
    "app.post('/admin/suivis-scolaires'",
    "app.put('/admin/suivis-scolaires/:id'",
    "app.get('/moi/suivis-scolaires'",
    "app.post('/admin/fiches-presence/:evenementId'",
    "app.get('/admin/fiches-presence/:evenementId/:id'",
    "app.delete('/admin/fiches-presence/:evenementId/:id'",
    "app.get('/admin/paiements'",
    "app.get('/admin/paiements/totaux'",
    "app.post('/admin/paiements/:id/valider'",
    "app.get('/admin/inscriptions'",
    "app.get('/admin/suivi-versements'",
    "app.post('/admin/membres/import'",
    "app.post('/admin/evenements'",
    "app.put('/admin/evenements/:id'",
  ]) {
    const ligne = ligneDe(route);
    assert.ok(ligne > 0, `${route} présente`);
    assert.equal(profondeurAvant(ligne), 0, `${route} au premier niveau`);
  }
  assert.equal(profondeurAvant(serveur.split('\n').length), 0, 'solde total nul');
});
