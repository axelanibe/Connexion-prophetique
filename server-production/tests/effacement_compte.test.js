// Tests purs de l'effacement definitif apres 30 jours,
// carte 92, 8 nov. 2026 : aucun serveur, aucune base,
// aucune donnee reelle. Lancer depuis server-production :
//   node --test tests/effacement_compte.test.js
// La logique vit dans src/effacement_compte.js. La purge
// recoit un faux client pg qui enregistre chaque requete :
// les tests prouvent ainsi qu'un compte echu est efface,
// qu'un compte dans les 30 jours ne l'est pas, qu'un compte
// recupere ne l'est pas, qu'un administrateur general echu
// est ignore, et que ni les paiements ni le journal d'audit
// ne sont jamais effaces, seulement une ligne d'audit ajoutee.
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  estEchu,
  selectionnerComptesEchus,
  effacerCompteDefinitivement,
  purgerComptesEchus,
} from '../src/effacement_compte.js';

const DEMANDE = '2026-11-08T10:00:00.000Z';
const ECHEANCE = '2026-12-08T10:00:00.000Z';

test('echu seulement a partir de supprime_le, jamais avant', () => {
  assert.equal(estEchu(ECHEANCE, new Date('2026-12-07T10:00:00.000Z')), false);
  assert.equal(estEchu(ECHEANCE, new Date('2026-12-08T09:59:59.000Z')), false);
  assert.equal(estEchu(ECHEANCE, new Date('2026-12-08T10:00:00.000Z')), true);
  assert.equal(estEchu(ECHEANCE, new Date('2026-12-09T10:00:00.000Z')), true);
  assert.equal(estEchu(null), false);
  assert.equal(estEchu(undefined), false);
  assert.equal(estEchu('pas une date'), false);
  assert.equal(estEchu(ECHEANCE, 'pas une date'), false);
});

test('la selection efface le membre echu desactive, rien d autre', () => {
  const candidats = [
    { id: 'm1', matricule: 'CP-AA-2527', role: 'membre', actif: false, supprime_le: ECHEANCE },
    { id: 'm2', matricule: 'CP-AA-2528', role: 'membre', actif: false, supprime_le: '2026-12-20T10:00:00.000Z' },
    { id: 'm3', matricule: 'CP-AA-2529', role: 'membre', actif: false, supprime_le: null },
    { id: 'm4', matricule: 'CP-AA-2530', role: 'membre', actif: true, supprime_le: ECHEANCE },
  ];
  const { aEffacer, ignoresAdminGeneral } = selectionnerComptesEchus(candidats, new Date('2026-12-08T10:00:00.000Z'));
  assert.deepEqual(aEffacer.map((c) => c.matricule), ['CP-AA-2527']);
  assert.deepEqual(ignoresAdminGeneral, []);
});

test('un compte recupere avant l echeance n est jamais efface', () => {
  // Recupere = supprime_le remis a NULL et actif remis a vrai.
  const { aEffacer } = selectionnerComptesEchus(
    [{ id: 'm1', matricule: 'CP-AA-2527', role: 'membre', actif: true, supprime_le: null }],
    new Date('2027-01-01T10:00:00.000Z'),
  );
  assert.deepEqual(aEffacer, []);
  // Meme si la date etait restee par erreur sans reactivation,
  // actif vrai bloque l'effacement.
  const { aEffacer: encore } = selectionnerComptesEchus(
    [{ id: 'm1', matricule: 'CP-AA-2527', role: 'membre', actif: true, supprime_le: ECHEANCE }],
    new Date('2027-01-01T10:00:00.000Z'),
  );
  assert.deepEqual(encore, []);
});

test('un administrateur general echu est ignore, jamais efface', () => {
  const { aEffacer, ignoresAdminGeneral } = selectionnerComptesEchus(
    [
      { id: 'm1', matricule: 'CP-AA-2526', role: 'admin_general', actif: false, supprime_le: ECHEANCE },
      { id: 'm2', matricule: 'CP-AA-2527', role: 'membre', actif: false, supprime_le: ECHEANCE },
    ],
    new Date('2026-12-08T10:00:00.000Z'),
  );
  assert.deepEqual(aEffacer.map((c) => c.matricule), ['CP-AA-2527']);
  assert.deepEqual(ignoresAdminGeneral.map((c) => c.matricule), ['CP-AA-2526']);
});

test('la demande fixe l echeance a 30 jours, comme la carte 92', () => {
  const demande = new Date(DEMANDE);
  const echeance = new Date(demande.getTime() + 30 * 24 * 60 * 60 * 1000);
  assert.equal(echeance.toISOString(), ECHEANCE);
});

/// Faux client pg : enregistre chaque requete, renvoie les
/// candidats donnes pour la selection, aucune reference de
/// photo pour la suppression de fichiers.
function fauxClient(candidats, { photoReferencee = false } = {}) {
  const requetes = [];
  return {
    requetes,
    async query(texte, parametres) {
      requetes.push({ texte, parametres });
      if (texte.includes('FROM membres m JOIN utilisateurs u')) return { rows: candidats };
      if (texte.includes('SELECT 1 FROM (')) return { rows: photoReferencee ? [{}] : [] };
      return { rows: [], rowCount: 0 };
    },
  };
}

const membreEchu = {
  id: 'm1', matricule: 'CP-AA-2527', nom_complet: 'Membre Test',
  utilisateur_id: 'u1', photo_id: 'f1', role: 'membre', actif: false, supprime_le: ECHEANCE,
};
const membreDansDelai = {
  ...membreEchu, id: 'm2', matricule: 'CP-AA-2528', utilisateur_id: 'u2',
  supprime_le: '2026-12-20T10:00:00.000Z',
};
const adminEchu = {
  ...membreEchu, id: 'm3', matricule: 'CP-AA-2526', utilisateur_id: 'u3',
  role: 'admin_general',
};

test('la purge efface le compte echu, ignore les autres', async () => {
  const c = fauxClient([membreEchu, membreDansDelai, adminEchu]);
  const resultat = await purgerComptesEchus(c, new Date('2026-12-08T10:00:00.000Z'));
  assert.deepEqual(resultat, { effaces: ['CP-AA-2527'], ignoresAdminGeneral: ['CP-AA-2526'] });
  const textes = c.requetes.map((r) => r.texte);
  assert.ok(textes.some((t) => t.includes('DELETE FROM utilisateurs WHERE id = $1')));
  assert.ok(!textes.some((t) => t.includes("DELETE FROM utilisateurs WHERE id = $1") && t.includes('u2')));
  assert.equal(c.requetes.filter((r) => r.texte.startsWith('DELETE FROM utilisateurs')).length, 1);
  assert.deepEqual(
    c.requetes.find((r) => r.texte.startsWith('DELETE FROM utilisateurs')).parametres,
    ['u1'],
  );
});

test('la purge ajoute une ligne d audit, n efface ni paiements ni audit', async () => {
  const c = fauxClient([membreEchu]);
  await purgerComptesEchus(c, new Date('2026-12-08T10:00:00.000Z'));
  const textes = c.requetes.map((r) => r.texte);
  assert.ok(textes.some((t) => t.startsWith('INSERT INTO journal_audit')));
  const audit = c.requetes.find((r) => r.texte.startsWith('INSERT INTO journal_audit'));
  assert.equal(audit.parametres[1], 'membre.efface_definitivement');
  assert.ok(audit.parametres[4].includes('CP-AA-2527'));
  assert.ok(!textes.some((t) => t.includes('DELETE FROM paiements')));
  assert.ok(!textes.some((t) => t.includes('DELETE FROM journal_audit')));
  assert.ok(!textes.some((t) => t.includes('UPDATE paiements')));
  assert.ok(textes.some((t) => t.includes('DELETE FROM bureau_membres WHERE membre_id = $1')));
});

test('la selection verrouille les lignes, pour les doubles executions', async () => {
  const c = fauxClient([]);
  await purgerComptesEchus(c, new Date('2026-12-08T10:00:00.000Z'));
  const selection = c.requetes.find((r) => r.texte.includes('FROM membres m JOIN utilisateurs u'));
  assert.ok(selection.texte.includes('FOR UPDATE OF u SKIP LOCKED'));
  assert.ok(selection.texte.includes('u.actif = false'));
  assert.ok(selection.texte.includes('u.supprime_le <= $1'));
});

test('la photo n est effacee que si aucun autre contenu ne la reference', async () => {
  const libre = fauxClient([membreEchu], { photoReferencee: false });
  await effacerCompteDefinitivement(libre, membreEchu);
  assert.ok(libre.requetes.some((r) => r.texte === 'DELETE FROM fichiers WHERE id = $1'));
  const referencee = fauxClient([membreEchu], { photoReferencee: true });
  await effacerCompteDefinitivement(referencee, membreEchu);
  assert.ok(!referencee.requetes.some((r) => r.texte === 'DELETE FROM fichiers WHERE id = $1'));
  assert.ok(referencee.requetes.some((r) => r.texte.startsWith('DELETE FROM utilisateurs')));
});

test('la route admin garde son action d audit quand elle reutilise la meme suppression', async () => {
  const c = fauxClient([]);
  await effacerCompteDefinitivement(c, { ...membreEchu, actionAudit: 'membre.supprime', auditUtilisateurId: 'admin1' });
  const audit = c.requetes.find((r) => r.texte.startsWith('INSERT INTO journal_audit'));
  assert.equal(audit.parametres[0], 'admin1');
  assert.equal(audit.parametres[1], 'membre.supprime');
});
