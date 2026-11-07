// Tests purs de l'analyse d'import de membres, carte 74,
// 7 nov. 2026 : aucun serveur, aucune base, aucune donnée
// réelle. Lancer depuis server-production :
//   node --test tests/membres_import.test.js
// La logique vit dans src/membres_import.js, importé par
// server.js pour POST /admin/membres/analyser. La route elle-même
// n'est pas testée ici, faute de base dans ce dossier de tests.
// Les normaliseurs téléphone sont des copies fidèles, en petit,
// des règles serveur (espaces, tirets, points et parenthèses
// retirés, 00 initial remplacé par +, 0 de tronc après +225
// retiré pour la comparaison seulement).
import test from 'node:test';
import assert from 'node:assert/strict';
import { analyserMembresImport } from '../src/membres_import.js';

const FONCTIONS = ['Président', 'Secrétaire', 'Trésorier', 'Chantre', 'Organisateur', 'Responsable', 'Leader', 'PCA', 'Coordinateur', 'Membre', 'Membre Actif', 'Intercesseur', 'Ancien', 'Diacre', 'Nouveau membre', 'Aucun'];
const ETABLISSEMENTS = [
  { id: 'etab-1', nom: 'ISPAM' },
  { id: 'etab-2', nom: 'Yopougon' },
];

function normaliserTelephone(raw) {
  let v = String(raw ?? '').trim().replace(/[\s\-.\(\)]/g, '');
  if (v.startsWith('00')) v = `+${v.slice(2)}`;
  if (v.startsWith('+2250')) v = `+225${v.slice(5)}`;
  return v;
}
function afficherTelephone(raw) {
  let v = String(raw ?? '').trim().replace(/[\s\-.\(\)]/g, '');
  if (v.startsWith('00')) v = `+${v.slice(2)}`;
  if (!v.startsWith('+') && /^\d+$/.test(v)) v = `+225${v}`;
  return v;
}
function variantesTelephone(raw) {
  const affiche = afficherTelephone(raw);
  const canonique = normaliserTelephone(raw);
  return [...new Set([affiche, canonique])];
}
const contexteBase = (surcharge = {}) => ({
  etablissements: ETABLISSEMENTS,
  fonctions: FONCTIONS,
  perimetreEtablissementId: null,
  telephonesExistants: new Set(),
  emailsExistants: new Set(),
  normaliserTelephone,
  afficherTelephone,
  variantesTelephone,
  ...surcharge,
});
const ligne = (surcharge = {}) => ({
  nom_complet: 'Awa Koné',
  telephone: '+2250701000200',
  email: 'awa@exemple.ci',
  etablissement: 'ISPAM',
  fonction: 'Membre',
  date_naissance: '1990-01-01',
  ...surcharge,
});

test('une ligne valide est prête, fonction vide veut dire Membre', () => {
  const r = analyserMembresImport([ligne({ fonction: '' })], contexteBase());
  assert.equal(r.prets, 1);
  assert.equal(r.doublons, 0);
  assert.equal(r.erreurs, 0);
  assert.equal(r.lignes[0].statut, 'pret');
  assert.equal(r.lignes[0].fonction, 'Membre');
  assert.equal(r.lignes[0].choisi, true);
});

test('sans téléphone ni e-mail, la ligne est une erreur, jamais prête', () => {
  const r = analyserMembresImport([ligne({ telephone: '', email: '' })], contexteBase());
  assert.equal(r.lignes[0].statut, 'erreur');
  assert.equal(r.lignes[0].motif, 'Un téléphone ou un e-mail est requis.');
  assert.equal(r.lignes[0].choisi, false);
});

test('nom trop court, e-mail invalide, date impossible et fonction inconnue sont des erreurs', () => {
  const r = analyserMembresImport(
    [
      ligne({ nom_complet: 'A' }),
      ligne({ nom_complet: 'Basile Yao', email: 'pas-un-email' }),
      ligne({ nom_complet: 'Claire Boni', date_naissance: '2026-02-30' }),
      ligne({ nom_complet: 'David NGuessan', fonction: 'Super membre' }),
    ],
    contexteBase(),
  );
  assert.equal(r.erreurs, 4);
  assert.deepEqual(r.lignes.map((x) => x.motif), ['Nom complet invalide.', 'E-mail invalide.', 'Date de naissance invalide.', 'Fonction inconnue.']);
});

test('établissement inconnu est une erreur, la casse du nom est ignorée', () => {
  const r = analyserMembresImport(
    [ligne({ etablissement: 'ispam' }), ligne({ nom_complet: 'Emma Koffi', etablissement: 'Inconnu' })],
    contexteBase(),
  );
  assert.equal(r.lignes[0].statut, 'pret');
  assert.equal(r.lignes[1].motif, 'Établissement inconnu.');
});

test('un administrateur d’établissement ne voit passer que son établissement', () => {
  const r = analyserMembresImport(
    [ligne({ etablissement: 'Yopougon' }), ligne({ nom_complet: 'Fatou Diallo', etablissement: '' })],
    contexteBase({ perimetreEtablissementId: 'etab-1' }),
  );
  assert.equal(r.lignes[0].motif, 'Cet établissement ne fait pas partie de votre périmètre.');
  assert.equal(r.lignes[1].motif, 'Cet établissement ne fait pas partie de votre périmètre.');
});

test('un doublon dans le fichier est ignoré, jamais écrasé, et la première ligne reste prête', () => {
  const r = analyserMembresImport(
    [ligne(), ligne({ nom_complet: 'Awa Koné Bis' }), ligne({ nom_complet: 'Autre Nom', telephone: '', email: 'awa@exemple.ci' })],
    contexteBase(),
  );
  assert.equal(r.prets, 1);
  assert.equal(r.doublons, 2);
  assert.equal(r.lignes[1].motif, 'Déjà existant dans ce fichier.');
  assert.equal(r.lignes[2].motif, 'Déjà existant dans ce fichier.');
});

test('un téléphone ou un e-mail déjà en base est un doublon, variantes comprises', () => {
  const r = analyserMembresImport(
    [
      ligne({ telephone: '+225701000200', email: 'nouveau@exemple.ci' }),
      ligne({ nom_complet: 'Gisèle Yao', telephone: '', email: 'ANCIEN@EXEMPLE.CI' }),
    ],
    contexteBase({
      telephonesExistants: new Set(['+2250701000200', '+225701000200']),
      emailsExistants: new Set(['ancien@exemple.ci']),
    }),
  );
  assert.equal(r.doublons, 2);
  assert.equal(r.lignes[0].motif, 'Déjà existant.');
  assert.equal(r.lignes[1].motif, 'Déjà existant.');
});

test('une ligne en erreur ne marque pas son contact comme vu dans le fichier', () => {
  const r = analyserMembresImport(
    [ligne({ fonction: 'Super membre' }), ligne({ nom_complet: 'Hervé Kouassi' })],
    contexteBase(),
  );
  assert.equal(r.lignes[0].statut, 'erreur');
  assert.equal(r.lignes[1].statut, 'pret');
});

test('l’analyse ne crée rien : aucun matricule, aucun temporaire', () => {
  const r = analyserMembresImport([ligne()], contexteBase());
  assert.equal(r.lignes[0].matricule, undefined);
  assert.equal(r.lignes[0].mot_de_passe_temporaire, undefined);
});
