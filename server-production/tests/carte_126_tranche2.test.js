// Tests de la carte 126 tranche 2, 10 nov. 2026 : table
// nominations, colonne permissions sur fonctions_admin, catalogue
// étendu, routes admin de nomination et GET /moi/nominations.
// Aucun serveur, aucune base, aucune donnée réelle. Lancer depuis
// server-production : node --test tests/carte_126_tranche2.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dossier = path.dirname(fileURLToPath(import.meta.url));
const racine = path.join(dossier, '..');
const serveur = fs.readFileSync(path.join(racine, 'server.js'), 'utf8');

const CODES_PERMISSIONS = [
  'camp.lire',
  'camp.inscriptions',
  'finances.lire',
  'finances.valider',
  'suivi.lire',
  'suivi.ecrire',
  'rapports.lire',
];

test('Carte 126 T2, migration : table nominations', () => {
  assert.ok(serveur.includes('CREATE TABLE IF NOT EXISTS nominations ('), 'table');
  assert.ok(serveur.includes('membre_id uuid NOT NULL REFERENCES membres(id) ON DELETE CASCADE'), 'membre');
  assert.ok(serveur.includes("portee text NOT NULL CHECK (portee IN ('structure', 'activite'))"), 'portée');
  assert.ok(serveur.includes('evenement_id uuid REFERENCES evenements(id) ON DELETE CASCADE'), 'événement');
  assert.ok(serveur.includes('fonction_code text NOT NULL REFERENCES fonctions_admin(code)'), 'fonction');
  assert.ok(serveur.includes('debute_le timestamptz NOT NULL DEFAULT now()'), 'début');
  assert.ok(serveur.includes('finit_le timestamptz'), 'fin');
  assert.ok(serveur.includes('revoque boolean NOT NULL DEFAULT false'), 'révoqué');
  assert.ok(serveur.includes("CHECK ((portee = 'structure' AND evenement_id IS NULL) OR (portee = 'activite' AND evenement_id IS NOT NULL))"), 'cohérence portée');
  assert.ok(serveur.includes('CREATE INDEX IF NOT EXISTS ix_nominations_membre ON nominations (membre_id)'), 'index membre');
  assert.ok(serveur.includes('CREATE INDEX IF NOT EXISTS ix_nominations_evenement ON nominations (evenement_id)'), 'index événement');
});

test('Carte 126 T2, colonne permissions sur fonctions_admin', () => {
  assert.ok(serveur.includes('ALTER TABLE fonctions_admin ADD COLUMN IF NOT EXISTS permissions jsonb NOT NULL DEFAULT'), 'alter');
  assert.ok(serveur.includes("permissions jsonb NOT NULL DEFAULT '[]'::jsonb,"), 'colonne dans CREATE TABLE');
  assert.ok(serveur.includes("'INSERT INTO fonctions_admin (code, libelle, description, droits, permissions, ordre) VALUES ($1, $2, $3, $4::jsonb, $5::jsonb, $6) ON CONFLICT (code) DO NOTHING'"), 'seed avec permissions');
  assert.ok(serveur.includes("UPDATE fonctions_admin SET permissions = $2::jsonb WHERE code = $1 AND (permissions IS NULL OR permissions = '[]'::jsonb)"), 'remplissage une fois');
  assert.ok(serveur.includes("SELECT code, libelle, description, droits, permissions, ordre FROM fonctions_admin WHERE actif ORDER BY ordre, code"), 'catalogue servi avec permissions');
});

test('Carte 126 T2, catalogue : 15 fonctions, codes machine connus', () => {
  for (const code of ['moderateur', 'editeur', 'responsable', 'tresorier', 'directeur_camp', 'tresorier_activite', 'responsable_suivi', 'direction', 'secretariat', 'tresorerie', 'coordination', 'administration', 'communication', 'dirigeant_cellule', 'fonction_personnalisee']) {
    assert.ok(serveur.includes(`code: '${code}'`), code);
  }
  // Chaque permission utilisée est un des sept codes machine.
  for (const ligne of serveur.split('\n')) {
    if (!ligne.includes('permissions: [')) continue;
    const trouvees = ligne.match(/'([a-z]+\.[a-z]+)'/g) || [];
    for (const t of trouvees) {
      assert.ok(CODES_PERMISSIONS.includes(t.slice(1, -1)), `${t} inconnu`);
    }
  }
  assert.ok(serveur.includes("code: 'direction', libelle: 'Direction générale'"), 'direction');
  assert.ok(serveur.includes("permissions: ['camp.lire', 'camp.inscriptions', 'finances.lire', 'finances.valider', 'suivi.lire', 'suivi.ecrire', 'rapports.lire']"), 'direction toutes permissions');
  assert.ok(serveur.includes("code: 'tresorier_activite'"), 'trésorier activité');
  assert.ok(serveur.includes("permissions: ['finances.lire', 'finances.valider']"), 'trésorier activité finances');
  assert.ok(serveur.includes("code: 'fonction_personnalisee'"), 'personnalisée');
  assert.ok(serveur.includes("permissions: []"), 'personnalisée sans permission par défaut');
});

test('Carte 126 T2, POST : création, 404, 400, 409, audit, 201', () => {
  assert.ok(serveur.includes("app.post('/admin/nominations', { preHandler: adminG }"), 'route POST adminG');
  assert.ok(serveur.includes("if (body.portee === 'structure' && body.evenement_id) throw httpError(400, 'Une nomination de structure ne porte pas sur une activité.');"), 'structure sans activité');
  assert.ok(serveur.includes("if (body.portee === 'activite' && !body.evenement_id) throw httpError(400, 'Choisissez une activité.');"), 'activité sans événement');
  assert.ok(serveur.includes("if (!membre) throw httpError(404, 'Membre introuvable.');"), '404 membre');
  assert.ok(serveur.includes("if (!ev) throw httpError(404, 'Activité introuvable.');"), '404 activité');
  assert.ok(serveur.includes("if (!fonction) throw httpError(404, 'Fonction introuvable.');"), '404 fonction');
  assert.ok(serveur.includes("if (finit && finit <= debute) throw httpError(400, 'La fin doit être après le début.');"), '400 dates');
  assert.ok(serveur.includes("if (doublon) throw httpError(409, 'Cette nomination existe déjà.');"), '409 doublon');
  assert.ok(serveur.includes("await audit(c, req, 'nomination.creee', 'nominations', r.id,"), 'audit création');
  assert.ok(serveur.includes('return reply.code(201).send(row);'), '201');
});

test('Carte 126 T2, PUT et révocation : 404, 409, audit', () => {
  assert.ok(serveur.includes("app.put('/admin/nominations/:id', { preHandler: adminG }"), 'route PUT adminG');
  assert.ok(serveur.includes("if (!existante) throw httpError(404, 'Nomination introuvable.');"), '404 PUT');
  assert.ok(serveur.includes("if (existante.revoque) throw httpError(409, 'Nomination révoquée, elle ne se modifie plus.');"), '409 révoquée');
  assert.ok(serveur.includes("if (!Object.keys(maj).length) throw httpError(400, 'Aucune modification.');"), '400 sans modification');
  assert.ok(serveur.includes("await audit(c, req, 'nomination.modifiee', 'nominations', id, maj);"), 'audit modification');
  assert.ok(serveur.includes("app.post('/admin/nominations/:id/revoquer', { preHandler: adminG }"), 'route révoquer adminG');
  assert.ok(serveur.includes("if (existante.revoque) throw httpError(409, 'Nomination déjà révoquée.');"), '409 déjà révoquée');
  assert.ok(serveur.includes("await audit(c, req, 'nomination.revoquee', 'nominations', id, {});"), 'audit révocation');
});

test('Carte 126 T2, lectures : liste admin et Mes nominations', () => {
  assert.ok(serveur.includes("app.get('/admin/nominations', { preHandler: adminG }"), 'liste admin');
  assert.ok(serveur.includes("f.libelle AS fonction_libelle, f.permissions"), 'libellé et permissions joints');
  assert.ok(serveur.includes("app.get('/moi/nominations', { preHandler: membreG }"), 'route membre');
  assert.ok(serveur.includes('WHERE n.membre_id = $1 AND NOT n.revoque AND (n.finit_le IS NULL OR n.finit_le > now())'), 'actives seulement');
  assert.ok(serveur.includes("ORDER BY n.portee, n.debute_le"), 'tri par portée');
});

test('Carte 126 T2, périmètre : pas de garde d’activité ici', () => {
  assert.ok(!serveur.includes('exigerNomination'), 'helper tranche 3, pas ici');
  assert.ok(serveur.includes('fonction_admin'), 'fonction clé gardée');
});

test('Carte 126 T2, correctif 404 : les routes nominations sont au premier niveau', () => {
  const retourRole = 'return { ok: true, id: row.id, matricule: row.matricule, role: body.role, etablissement_id: etablissementId, fonction_admin: fonctionAdmin };\n});';
  const debutNominations = serveur.indexOf("app.post('/admin/nominations'");
  assert.ok(debutNominations > 0, 'route POST /admin/nominations présente');
  const fermetureRole = serveur.indexOf(retourRole);
  assert.ok(fermetureRole > 0, 'fermeture de la route rôle présente');
  assert.equal(fermetureRole, serveur.lastIndexOf(retourRole), 'le retour de la route rôle est unique');
  assert.ok(fermetureRole < debutNominations, 'la route rôle se ferme avant le bloc nominations');
  const profondeur = (texte) => {
    let n = 0;
    for (const c of texte) { if (c === '{') n++; else if (c === '}') n--; }
    return n;
  };
  assert.equal(profondeur(serveur.slice(0, debutNominations)), 0, 'le bloc nominations commence au premier niveau');
});
