// Tests de la carte 125, 10 nov. 2026 : noms et prénoms en
// majuscules à l'inscription et sur les cartes. Aucun serveur,
// aucune base, aucune donnée réelle. Lancer depuis
// server-production : node --test tests/carte_125.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { nomCompletMajuscules, texteMajuscules } from '../src/telephone_nom.js';
import { correctionMembreSchema } from '../src/correction_membre.js';
import { genererCartePdf, validerDonneesCarte } from '../src/generer_carte_pdf.js';

const dossier = path.dirname(fileURLToPath(import.meta.url));
const racine = path.join(dossier, '..');
const serveur = fs.readFileSync(path.join(racine, 'server.js'), 'utf8');
const pageCarte = fs.readFileSync(path.join(racine, '..', 'lib', 'carte_nouvelle.dart'), 'utf8');
const application = fs.readFileSync(path.join(racine, '..', 'lib', 'main.dart'), 'utf8');
const admin = fs.readFileSync(path.join(racine, '..', 'lib', 'admin_pages.dart'), 'utf8');

test('Carte 125, aide : casse mixte, accents et espaces', () => {
  assert.equal(nomCompletMajuscules('Axel Anibe'), 'AXEL ANIBE');
  assert.equal(nomCompletMajuscules('Élodie Martin'), 'ÉLODIE MARTIN');
  assert.equal(nomCompletMajuscules('  Koffi   Jean-Boanerges  '), 'KOFFI JEAN-BOANERGES');
  assert.equal(nomCompletMajuscules(''), '');
  assert.equal(nomCompletMajuscules(null), '');
});

test('Carte 125, correction : le schéma renvoie le nom en majuscules', () => {
  const corps = correctionMembreSchema.parse({ nom_complet: 'Anibe Adja Maurice Axel' });
  assert.equal(corps.nom_complet, 'ANIBE ADJA MAURICE AXEL');
});

test('Carte 125, inscription et import : la normalisation est branchée', () => {
  assert.ok(serveur.includes('.transform(nomCompletMajuscules)'), 'inscription');
  assert.ok(serveur.includes('const nom = nomCompletMajuscules(l.nom_complet);'), 'import');
  assert.ok(serveur.includes("import { nomCompletDeuxMots, nomCompletMajuscules, texteMajuscules, restaurerZeroIvoirien, normaliserPaysResidence }"), 'import aide');
});

test('Carte 125, extension : texteMajuscules laisse passer null et undefined', () => {
  assert.equal(texteMajuscules('Céleste'), 'CÉLESTE');
  assert.equal(texteMajuscules('  lieu   de culte  '), 'LIEU DE CULTE');
  assert.equal(texteMajuscules(null), null);
  assert.equal(texteMajuscules(undefined), undefined);
});

test('Carte 125, extension : tous les champs de nom ou de libellé sont normalisés', () => {
  // Un site par champ, dans server.js ; les exclus (e-mail, téléphone,
  // mot de passe, URL, montant, date, code, matricule, jeton) ne portent
  // aucun transform.
  const sites = [
    'titre: z.string().trim().min(1).max(200).transform(texteMajuscules),',
    'titre: opt(z.string().trim().min(1).max(200).transform(texteMajuscules))',
    'titre: z.string().trim().min(1).max(200).transform(texteMajuscules).optional(),',
    'auteur: z.string().trim().min(1).max(200).transform(texteMajuscules),',
    'format: opt(z.string().trim().max(30).transform(texteMajuscules))',
    'nom: z.string().trim().min(1).max(200).transform(texteMajuscules),',
    'lieu: opt(z.string().trim().max(200).transform(texteMajuscules))',
    'pays: opt(z.string().trim().max(100).transform(texteMajuscules))',
    'nom: z.string().trim().min(1).max(120).transform(texteMajuscules),',
    'fonction: z.string().trim().min(1).max(200).transform(texteMajuscules),',
    'lieu: z.string().trim().max(200).transform(texteMajuscules).optional().nullable(),',
    'activite_nom: z.string().trim().max(200).transform(texteMajuscules).optional().nullable(),',
    'orateur: z.string().trim().max(200).transform(texteMajuscules).optional().nullable(),',
    'theme: z.string().trim().max(300).transform(texteMajuscules).optional().nullable(),',
    'nom_complet: z.string().trim().max(200).transform(texteMajuscules), matricule:',
    'offrande_compte_par: z.string().trim().max(200).transform(texteMajuscules).optional().nullable(),',
    'libelle: z.string().trim().min(1).max(200).transform(texteMajuscules), montant:',
    'incident_type: z.string().trim().max(200).transform(texteMajuscules).optional().nullable(),',
    'incident_personnes: z.string().trim().max(1000).transform(texteMajuscules).optional().nullable(),',
    'classe_libre: z.string().trim().max(100).transform(texteMajuscules).optional().nullable(),',
    'activite: z.string().trim().min(1).max(300).transform(texteMajuscules),',
    'role_service: z.string().trim().max(300).transform(texteMajuscules).optional().nullable(),',
    'nom: z.string().trim().min(1).max(300).transform(texteMajuscules),',
    'categorie: z.string().trim().max(300).transform(texteMajuscules).optional().nullable(),',
    'lieu: z.string().trim().max(300).transform(texteMajuscules).optional().nullable(),',
    'nom_complet: z.string().trim().min(1).max(200).transform(texteMajuscules),',
    'beneficiaire_nom: z.string().trim().min(2).max(120).transform(texteMajuscules),',
    "poste: z.string().trim().max(120).transform(texteMajuscules).optional().default(''),",
    'poste: z.string().trim().max(120).transform(texteMajuscules).nullable().optional(),',
    'orateur: z.string().trim().max(200).transform(texteMajuscules).optional(),',
    'orateur: opt(z.string().trim().max(200).transform(texteMajuscules))',
    'thematique: opt(z.string().trim().max(200).transform(texteMajuscules))',
    'libelle: z.string().trim().min(1).max(200).transform(texteMajuscules), cible_fcfa',
    'personnage: z.string().trim().min(1).max(120).transform(texteMajuscules),',
    "const base = { ligne: i + 1, nom: nomCompletMajuscules(l.nom ?? '') };",
    "const nom = nomCompletMajuscules(l.nom ?? '');",
    'const fonction = nomCompletMajuscules(l.fonction_brute',
  ];
  for (const site of sites) assert.ok(serveur.includes(site), site);
});

test('Carte 125, carte PDF : un nom stocké en casse mixte sort en majuscules', async () => {
  const d = validerDonneesCarte({ nomComplet: 'Axel Anibe', matricule: 'CP-AA-2526', etablissement: 'Céleste', anneeAdhesion: 2026 });
  assert.equal(d.nomComplet, 'AXEL ANIBE');
  const pdf = await genererCartePdf({ nomComplet: 'Axel Anibe', matricule: 'CP-AA-2526', etablissement: 'Céleste', anneeAdhesion: 2026 });
  assert.ok(extraireTextePdf(pdf).includes('AXEL ANIBE'), 'nom en majuscules dans le PDF');
  assert.ok(!extraireTextePdf(pdf).includes('Axel Anibe'), 'pas de casse mixte dans le PDF');
});

// Le texte d'un PDF pdfkit est écrit en hexadécimal : on décode
// les chaînes <...> des flux de contenu et on les recolle.
function extraireTextePdf(buffer) {
  const s = buffer.toString('latin1');
  const textes = [];
  for (const m of s.matchAll(/stream\r?\n([\s\S]*?)\r?\nendstream/g)) {
    let contenu = m[1];
    if (contenu.charCodeAt(0) === 0x78) {
      try { contenu = zlib.inflateSync(Buffer.from(contenu, 'latin1')).toString('latin1'); } catch { continue; }
    }
    if (!contenu.includes('BT') || (!contenu.includes('Tj') && !contenu.includes('TJ'))) continue;
    for (const h of contenu.matchAll(/<([0-9A-Fa-f]+)>/g)) {
      textes.push(Buffer.from(h[1], 'hex').toString('latin1'));
    }
  }
  return textes.join('');
}

test('Carte 125, application : inscription, correction et page Carte', () => {
  assert.ok(application.includes('nomCompletMajuscules(_name.text)'), 'inscription normalisée');
  assert.ok(application.includes('TextCapitalization.characters'), 'clavier en majuscules');
  assert.ok(admin.includes('nomCompletMajuscules(_nomCtrl.text)'), 'correction normalisée');
  assert.ok(pageCarte.includes('Text(m.name.toUpperCase()'), 'carte affichée en majuscules');
});
