// Tests purs de l'attestation en vrai PDF, carte 120, 9 nov.
// 2026 : aucun serveur, aucune base, aucune donnée réelle.
// Lancer depuis server-production :
//   node --test tests/attestation.test.js
// Le HTML disparaît : les routes /html et le gabarit
// src/attestation.html sont retirés, l'attestation est un vrai
// PDF généré à l'ouverture, modèle du certificat d'adhésion de
// la carte 110 (vrai PDF, QR et page publique de vérification),
// avec la mention d'annulation rouge quand l'attestation est
// annulée (carte 106), le sceau doré, la signature du
// signataire et le QR de vérification. Aucune attestation n'est
// supprimée ici : les tests ne font que générer des PDF en
// mémoire, jamais de DELETE.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import {
  genererAttestationPdf, validerAttestationPdf, dateAttestationJjMmAaaa,
  urlVerificationAttestation, etatAttestation, pageVerificationAttestationHtml,
} from '../src/generer_attestation_pdf.js';
import { signatureValide } from '../src/certificats.js';

const dossier = path.dirname(fileURLToPath(import.meta.url));
const serveur = fs.readFileSync(path.join(dossier, '..', 'server.js'), 'utf8');

// Le texte d'un PDF pdfkit est écrit en hexadécimal, découpé
// par mots : on décode les chaînes <...> des flux de contenu
// (BT ... Tj/TJ) et on les recolle, dans l'ordre. Les flux
// d'images sont ignorés : ils n'ont pas de BT. Les caractères
// Windows-1252 (’, •, …) sont ramenés à leur équivalent
// Unicode, pour comparer avec les chaînes du test.
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
  return textes.join('')
    .replace(/\x92/g, '’').replace(/\x93/g, '“').replace(/\x94/g, '”')
    .replace(/\x95/g, '•').replace(/\x85/g, '…');
}

function nombrePages(buffer) {
  return (buffer.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
}

// PNG minimal valide, 1 x 1, signature PNG en tête.
const png1x1 = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
const dataUrl = `data:image/png;base64,${png1x1.toString('base64')}`;
const secret = 's'.repeat(64);

const complete = {
  type: 'benevolat',
  membre_nom: 'Anibe Adja Maurice Axel',
  matricule: 'CP-AA-2526',
  etablissement: 'Groupe Scolaire Céleste',
  activite: 'Camp National Kairos',
  role_service: 'Organisateur',
  date_debut: '2027-08-22',
  date_fin: '2027-08-28',
  delivre_le: new Date('2026-11-05T10:00:00Z'),
  reference: 'ATT-2026-0001',
};

const minimale = {
  type: 'participation',
  membre_nom: 'Membre Test',
  matricule: 'CP-AA-9999',
  etablissement: null,
  activite: 'Retraite',
  role_service: null,
  date_debut: null,
  date_fin: null,
  delivre_le: new Date('2026-11-05T10:00:00Z'),
  reference: 'ATT-2026-0002',
};

test('le PDF bénévolat complet remplit chaque champ, sur une seule page', async () => {
  const pdf = await genererAttestationPdf(complete);
  assert.ok(pdf.subarray(0, 5).toString() === '%PDF-', 'en-tête PDF');
  assert.equal(nombrePages(pdf), 1, 'une seule page');
  const t = extraireTextePdf(pdf);
  assert.ok(t.includes('ATTESTATION DE BÉNÉVOLAT'), 'titre');
  assert.ok(t.includes('CONNEXION PROPHÉTIQUE'), 'structure');
  assert.ok(t.includes('Former • Équiper • Servir'), 'devise');
  assert.ok(t.includes('ANIBE ADJA MAURICE AXEL'), 'nom en majuscules');
  assert.ok(t.includes('MATRICULE : CP-AA-2526'), 'matricule');
  assert.ok(t.includes('ÉTABLISSEMENT : GROUPE SCOLAIRE CÉLESTE'), 'établissement');
  assert.ok(t.includes('a rendu un service bénévole remarquable'), 'corps bénévolat');
  assert.ok(t.includes('CAMP NATIONAL KAIROS'), 'activité');
  assert.ok(t.includes('Rôle ou service : Organisateur.'), 'rôle');
  assert.ok(t.includes('Période : du 22/08/2027 au 28/08/2027.'), 'période');
  assert.ok(t.includes('Fait et délivré le 05/11/2026.'), 'date de délivrance');
  assert.ok(t.includes('Référence : ATT-2026-0001'), 'référence');
  assert.ok(t.includes('Cette attestation est délivrée à l’intéressé pour servir et valoir ce que de droit.'), 'mention de délivrance');
  assert.ok(t.includes('SCEAU OFFICIEL'), 'sceau');
  assert.ok(t.includes('Le Président'), 'signataire');
  assert.ok(t.includes('Signature manuscrite du signataire'), 'ligne de signature');
});

test('le PDF participation minimal omet établissement, rôle et période', async () => {
  const pdf = await genererAttestationPdf(minimale);
  assert.equal(nombrePages(pdf), 1, 'une seule page');
  const t = extraireTextePdf(pdf);
  assert.ok(t.includes('ATTESTATION DE PARTICIPATION'), 'titre');
  assert.ok(t.includes('MEMBRE TEST'), 'nom');
  assert.ok(!t.includes('ÉTABLISSEMENT'), 'pas d’établissement');
  assert.ok(!t.includes('Rôle ou service'), 'pas de rôle');
  assert.ok(!t.includes('Période'), 'pas de période');
  assert.ok(!t.includes('Date :'), 'pas de date d’activité');
  assert.ok(t.includes('a participé à l’activité suivante :'), 'corps participation');
  assert.ok(!t.includes('Scanner pour vérifier'), 'pas de QR sans URL signée');
});

test('carte 106 : le PDF d’une attestation annulée porte la mention rouge et sa date', async () => {
  const pdf = await genererAttestationPdf({ ...complete, annulee_le: new Date('2026-11-09T10:30:00Z') });
  assert.equal(nombrePages(pdf), 1, 'une seule page');
  const t = extraireTextePdf(pdf);
  assert.ok(t.includes('ANNULÉE LE 09/11/2026'), 'mention avec la date d’annulation JJ/MM/AAAA');
  assert.ok(t.includes('ATTESTATION DE BÉNÉVOLAT'), 'le reste du document est intact');
  assert.ok(t.includes('Référence : ATT-2026-0001'), 'référence toujours là');
  const source = fs.readFileSync(path.join(dossier, '..', 'src', 'generer_attestation_pdf.js'), 'utf8');
  assert.ok(source.includes('fillColor(ROUGE)'), 'mention en rouge');
});

test('carte 106 : le PDF d’une attestation non annulée ne porte aucune mention', async () => {
  for (const a of [complete, minimale, { ...complete, annulee_le: null }]) {
    const t = extraireTextePdf(await genererAttestationPdf(a));
    assert.ok(!t.includes('ANNULÉE'), 'aucune mention ANNULÉE');
    assert.ok(!t.includes('Annulée'), 'aucune mention Annulée');
  }
});

test('le PDF avec URL signée porte le QR et sa légende, sans URL il n’y en a pas', async () => {
  const url = urlVerificationAttestation('https://connexion-prophetique.onrender.com', 'ATT-2026-0001', 'CP-AA-2526', secret);
  const avec = extraireTextePdf(await genererAttestationPdf({ ...complete, url }));
  assert.ok(avec.includes('Scanner pour vérifier'), 'légende du QR');
  assert.ok(avec.includes('Authenticité vérifiable par QR code.'), 'pied de page avec QR');
  const sans = extraireTextePdf(await genererAttestationPdf(complete));
  assert.ok(!sans.includes('Scanner pour vérifier'), 'pas de légende sans URL');
  assert.ok(sans.includes('Document généré automatiquement le 05/11/2026.'), 'pied de page sans QR');
});

test('la signature dessinée est acceptée, une signature illisible ne bloque pas le PDF', async () => {
  const signe = await genererAttestationPdf({ ...complete, signature: dataUrl });
  assert.equal(nombrePages(signe), 1, 'une seule page avec signature');
  assert.ok(extraireTextePdf(signe).includes('Signature manuscrite du signataire'), 'bloc signature gardé');
  const illisible = await genererAttestationPdf({ ...complete, signature: 'ceci n’est pas un PNG' });
  assert.equal(nombrePages(illisible), 1, 'une seule page sans signature valide');
  assert.ok(extraireTextePdf(illisible).includes('Signature manuscrite du signataire'), 'ligne vide gardée');
});

test('les données invalides sont refusées avant toute génération', () => {
  for (const [cas, donnees] of [
    ['référence', { ...complete, reference: 'XXX' }],
    ['matricule', { ...complete, matricule: 'CP-AA-252' }],
    ['type', { ...complete, type: 'autre' }],
    ['activité vide', { ...complete, activite: '  ' }],
    ['nom absent', { ...complete, membre_nom: '' }],
    ['URL non http', { ...complete, url: 'javascript:alert(1)' }],
  ]) {
    assert.throws(() => validerAttestationPdf(donnees), (e) => e.code === 'ATTESTATION_DONNEES_INVALIDES', cas);
  }
  assert.equal(dateAttestationJjMmAaaa('2027-08-22'), '22/08/2027');
  assert.equal(dateAttestationJjMmAaaa(new Date('2026-11-05T10:00:00Z')), '05/11/2026');
  assert.equal(dateAttestationJjMmAaaa(null), null);
});

test('l’URL de vérification se signe et se vérifie avec le même secret que les certificats', () => {
  const url = urlVerificationAttestation('https://connexion-prophetique.onrender.com', 'ATT-2026-0001', 'CP-AA-2526', secret);
  assert.ok(url.startsWith('https://connexion-prophetique.onrender.com/attestations/verification/ATT-2026-0001?'), 'chemin public');
  const u = new URL(url);
  assert.equal(u.searchParams.get('matricule'), 'CP-AA-2526');
  assert.equal(signatureValide(secret, 'ATT-2026-0001', 'CP-AA-2526', u.searchParams.get('signature')), true, 'signature valide');
  assert.equal(signatureValide(secret, 'ATT-2026-0001', 'CP-AA-2526', '0'.repeat(64)), false, 'signature altérée refusée');
  assert.equal(signatureValide(secret, 'ATT-2026-0002', 'CP-AA-2526', u.searchParams.get('signature')), false, 'autre référence refusée');
});

test('la page de vérification affiche l’état, échappe le nom et marque l’annulation', () => {
  const base = { reference: 'ATT-2026-0001', type: 'benevolat', nom_complet: 'Anibe Adja Maurice Axel', activite: 'Camp National Kairos', delivre_le: new Date('2026-11-05T10:00:00Z'), annulee_le: null };
  const valide = pageVerificationAttestationHtml({ etat: 'valide', attestation: base });
  assert.ok(valide.includes('Attestation valide'), 'titre valide');
  assert.ok(valide.includes('Anibe Adja Maurice Axel'), 'nom affiché');
  assert.ok(valide.includes('ATT-2026-0001'), 'référence affichée');
  assert.ok(valide.includes('05/11/2026'), 'date de délivrance affichée');
  const annulee = pageVerificationAttestationHtml({ etat: 'annulee', attestation: { ...base, annulee_le: new Date('2026-11-09T10:30:00Z') } });
  assert.ok(annulee.includes('Attestation annulée'), 'titre annulée');
  assert.ok(annulee.includes('09/11/2026'), 'date d’annulation affichée');
  const introuvable = pageVerificationAttestationHtml({ etat: 'introuvable', attestation: null });
  assert.ok(introuvable.includes('Attestation introuvable'), 'titre introuvable');
  const mechant = pageVerificationAttestationHtml({ etat: 'valide', attestation: { ...base, nom_complet: '<script>alert(1)</script>' } });
  assert.ok(!mechant.includes('<script>alert(1)</script>'), 'pas de script injecté');
  assert.equal(etatAttestation({ annulee_le: new Date() }), 'annulee', 'l’annulation prime');
  assert.equal(etatAttestation({}), 'valide');
  assert.equal(etatAttestation(null), 'introuvable');
});

test('carte 120 : les routes PDF, signature, suppression et vérification existent, les routes HTML ont disparu', () => {
  assert.ok(serveur.includes("app.get('/admin/attestations/:id/pdf'"), 'route PDF administrateur');
  assert.ok(serveur.includes("app.get('/moi/attestations/:id/pdf'"), 'route PDF membre');
  assert.ok(serveur.includes("app.post('/admin/attestations/:id/signer'"), 'route de signature');
  assert.ok(serveur.includes("app.delete('/admin/attestations/:id'"), 'route de suppression');
  assert.ok(serveur.includes("app.get('/attestations/verification/:reference'"), 'route publique de vérification');
  assert.ok(!serveur.includes("attestations/:id/html"), 'plus de route /html');
  assert.ok(!serveur.includes("attestationHtml"), 'plus d’import HTML');
  assert.ok(!fs.existsSync(path.join(dossier, '..', 'src', 'attestation.html')), 'gabarit HTML retiré');
  assert.ok(!fs.existsSync(path.join(dossier, '..', 'src', 'attestation.js')), 'module HTML retiré');
  assert.ok(serveur.includes("'attestation.signee'"), 'événement d’audit attestation.signee');
  assert.ok(serveur.includes("'attestation.supprimee'"), 'événement d’audit attestation.supprimee');
  assert.ok(serveur.includes('ADD COLUMN IF NOT EXISTS signature_attestation text'), 'colonne signature_attestation');
  assert.ok(serveur.includes("exigerFonctionAdmin(req, 'responsable')"), 'fonction responsable exigée');
  // Un seul DELETE sur les attestations, dans la route de
  // suppression : aucun autre effacement n’est ajouté.
  const suppressions = serveur.match(/DELETE FROM attestations/g) || [];
  assert.equal(suppressions.length, 1, 'un seul DELETE FROM attestations');
  assert.ok(serveur.includes('DELETE FROM attestations WHERE id = $1'), 'suppression par identifiant');
});

test('carte 106 : la route d’annulation existe toujours, sans toucher au PDF', () => {
  assert.ok(serveur.includes("app.post('/admin/attestations/:id/annuler'"), 'route POST /admin/attestations/:id/annuler');
  assert.ok(serveur.includes("'Cette attestation est déjà annulée.'"), '409 si déjà annulée');
  assert.ok(serveur.includes("'attestation.annulee'"), 'événement d’audit attestation.annulee');
  assert.ok(serveur.includes('ADD COLUMN IF NOT EXISTS annulee_le timestamptz'), 'colonne annulee_le');
  assert.ok(serveur.includes('ADD COLUMN IF NOT EXISTS annulee_par uuid REFERENCES utilisateurs(id) ON DELETE SET NULL'), 'colonne annulee_par');
});
