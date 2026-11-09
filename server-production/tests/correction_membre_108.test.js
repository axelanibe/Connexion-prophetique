// Tests purs de la carte 108, 8 nov. 2026 : corriger le nom
// d'un membre. Aucun serveur, aucune base, aucune donnée réelle.
// Lancer depuis server-production :
//   node --test tests/correction_membre_108.test.js
// La logique vit dans src/correction_membre.js, importé par
// server.js pour la route PUT /admin/membres/:id. La route
// elle-même, comme les autres routes d'écriture, n'est pas
// essayée contre une vraie base ici : le périmètre, la règle
// des deux mots, le matricule figé et l'audit sont vérifiés sur
// les fonctions pures.
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  correctionMembreSchema,
  correctionMembreAutorisee,
  correctionMembreDetails,
} from '../src/correction_membre.js';

const ancien = {
  id: '11111111-1111-1111-1111-111111111111',
  matricule: 'CP-AA-2526',
  nom_complet: 'Anibe Axel',
  date_naissance: '1990-05-12',
  etablissement_id: '22222222-2222-2222-2222-222222222222',
};
const autreEtab = '33333333-3333-3333-3333-333333333333';

test('Carte 108, schéma : un corps complet et valide passe', () => {
  const corps = correctionMembreSchema.parse({
    nom_complet: 'Anibe Adja Maurice Axel',
    date_naissance: '1990-05-12',
    etablissement_id: autreEtab,
  });
  assert.equal(corps.nom_complet, 'Anibe Adja Maurice Axel');
  assert.equal(corps.date_naissance, '1990-05-12');
  assert.equal(corps.etablissement_id, autreEtab);
});

test('Carte 108, schéma : un seul champ suffit, les autres restent tels quels', () => {
  const corps = correctionMembreSchema.parse({ nom_complet: 'Anibe Adja Maurice Axel' });
  assert.equal(corps.nom_complet, 'Anibe Adja Maurice Axel');
  assert.equal(corps.date_naissance, undefined);
  assert.equal(corps.etablissement_id, undefined);
});

test('Carte 108, schéma : un corps vide est refusé, rien à corriger', () => {
  assert.throws(() => correctionMembreSchema.parse({}), /Rien à corriger/);
});

test('Carte 108, schéma : un seul mot est refusé, règle des deux mots de la carte 101', () => {
  assert.throws(() => correctionMembreSchema.parse({ nom_complet: 'Axel' }), /prénom et ton nom/);
  assert.throws(() => correctionMembreSchema.parse({ nom_complet: '   ' }));
});

test('Carte 108, schéma : deux mots passent, bouts taillés, comme à l’inscription', () => {
  const corps = correctionMembreSchema.parse({ nom_complet: '  Anibe   Adja  ' });
  assert.equal(corps.nom_complet, 'Anibe   Adja');
});

test('Carte 108, schéma : une date hors format AAAA-MM-JJ est refusée', () => {
  assert.throws(() => correctionMembreSchema.parse({ date_naissance: '12/05/1990' }), /Date de naissance invalide/);
  assert.throws(() => correctionMembreSchema.parse({ date_naissance: '1990-5-12' }), /Date de naissance invalide/);
});

test('Carte 108, schéma : null efface la date ou l’établissement, sans les inventer', () => {
  const corps = correctionMembreSchema.parse({ date_naissance: null, etablissement_id: null });
  assert.equal(corps.date_naissance, null);
  assert.equal(corps.etablissement_id, null);
});

test('Carte 108, schéma : un établissement qui n’est pas un UUID est refusé', () => {
  assert.throws(() => correctionMembreSchema.parse({ etablissement_id: 'celeste' }), /Établissement invalide/);
});

test('Carte 108, périmètre : administrateur général partout', () => {
  assert.equal(
    correctionMembreAutorisee({ role: 'admin_general', eidAdmin: null, membreEtablissementId: autreEtab, nouvelEtablissementId: autreEtab }),
    true,
  );
  assert.equal(
    correctionMembreAutorisee({ role: 'admin_general', eidAdmin: null, membreEtablissementId: null, nouvelEtablissementId: null }),
    true,
  );
});

test('Carte 108, périmètre : administrateur d’établissement, membre de son établissement, nom seul', () => {
  assert.equal(
    correctionMembreAutorisee({
      role: 'admin_etablissement',
      eidAdmin: ancien.etablissement_id,
      membreEtablissementId: ancien.etablissement_id,
      nouvelEtablissementId: undefined,
    }),
    true,
  );
});

test('Carte 108, périmètre : administrateur d’établissement, membre sans établissement, nom seul', () => {
  assert.equal(
    correctionMembreAutorisee({ role: 'admin_etablissement', eidAdmin: ancien.etablissement_id, membreEtablissementId: null, nouvelEtablissementId: undefined }),
    true,
  );
});

test('Carte 108, périmètre : administrateur d’établissement, membre d’un autre établissement, refusé', () => {
  assert.equal(
    correctionMembreAutorisee({ role: 'admin_etablissement', eidAdmin: ancien.etablissement_id, membreEtablissementId: autreEtab, nouvelEtablissementId: undefined }),
    false,
  );
});

test('Carte 108, périmètre : administrateur d’établissement, nouvel établissement vers le sien, accepté', () => {
  assert.equal(
    correctionMembreAutorisee({
      role: 'admin_etablissement',
      eidAdmin: ancien.etablissement_id,
      membreEtablissementId: null,
      nouvelEtablissementId: ancien.etablissement_id,
    }),
    true,
  );
});

test('Carte 108, périmètre : administrateur d’établissement, nouvel établissement vers un autre, refusé', () => {
  assert.equal(
    correctionMembreAutorisee({
      role: 'admin_etablissement',
      eidAdmin: ancien.etablissement_id,
      membreEtablissementId: ancien.etablissement_id,
      nouvelEtablissementId: autreEtab,
    }),
    false,
  );
});

test('Carte 108, périmètre : administrateur d’établissement, effacement de l’établissement, refusé', () => {
  assert.equal(
    correctionMembreAutorisee({
      role: 'admin_etablissement',
      eidAdmin: ancien.etablissement_id,
      membreEtablissementId: ancien.etablissement_id,
      nouvelEtablissementId: null,
    }),
    false,
  );
});

test('Carte 108, périmètre : un membre ne corrige jamais, même le sien', () => {
  assert.equal(
    correctionMembreAutorisee({ role: 'membre', eidAdmin: null, membreEtablissementId: ancien.etablissement_id, nouvelEtablissementId: undefined }),
    false,
  );
});

test('Carte 108, audit : ancienne et nouvelle valeur, pour chaque champ corrigé', () => {
  const details = correctionMembreDetails(ancien, { nom_complet: 'Anibe Adja Maurice Axel', date_naissance: '1990-05-13' });
  assert.equal(details.ancien.nom_complet, 'Anibe Axel');
  assert.equal(details.nouveau.nom_complet, 'Anibe Adja Maurice Axel');
  assert.equal(details.ancien.date_naissance, '1990-05-12');
  assert.equal(details.nouveau.date_naissance, '1990-05-13');
  assert.equal(details.ancien.etablissement_id, undefined);
  assert.equal(details.nouveau.etablissement_id, undefined);
});

test('Carte 108, audit : le matricule est dans la trace, jamais dans les valeurs corrigées', () => {
  const details = correctionMembreDetails(ancien, { nom_complet: 'Anibe Adja Maurice Axel' });
  assert.equal(details.matricule, 'CP-AA-2526');
  assert.equal('matricule' in details.ancien, false);
  assert.equal('matricule' in details.nouveau, false);
});

test('Carte 108, audit : un effacement se voit, null ancien et nouveau', () => {
  const details = correctionMembreDetails(ancien, { etablissement_id: null });
  assert.equal(details.ancien.etablissement_id, ancien.etablissement_id);
  assert.equal(details.nouveau.etablissement_id, null);
});
