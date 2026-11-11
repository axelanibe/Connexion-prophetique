// Tests purs de la carte 122, 10 nov. 2026 : envoi automatique
// du reçu et de la nouvelle carte de membre après validation du
// paiement. Aucun serveur, aucune base, aucune donnée réelle.
// Lancer depuis server-production :
//   node --test tests/carte_122.test.js
// Le reçu part pour chaque paiement validé, la nouvelle carte quand
// le paiement concerne la carte. L'envoi est accroché à
// notifierPaiementValide, appelée par les quatre chemins de
// confirmation (validation structure, rapprochement Wave, webhook
// Wave, PayPal), au mieux et sans attendre, pour ne jamais bloquer
// la validation ni ralentir le webhook. Le reçu reste
// téléchargeable dans l'historique de paiement (InvoicePage) et la
// carte visible sur la page Carte : ces deux canaux existent déjà,
// ils sont vérifiés ici par lecture du code de l'application.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { genererCartePdf, validerDonneesCarte } from '../src/generer_carte_pdf.js';
import { envoyerRecuParEmail, envoyerCarteParEmail } from '../src/email.js';

const dossier = path.dirname(fileURLToPath(import.meta.url));
const racine = path.join(dossier, '..');
const serveur = fs.readFileSync(path.join(racine, 'server.js'), 'utf8');
const application = fs.readFileSync(path.join(racine, '..', 'lib', 'differe_membre.dart'), 'utf8');
const pageCarte = fs.readFileSync(path.join(racine, '..', 'lib', 'carte_nouvelle.dart'), 'utf8');

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

function nombreImages(buffer) {
  return (buffer.toString('latin1').match(/\/Subtype\s*\/Image/g) || []).length;
}

// PNG minimal valide, 1 x 1, signature PNG en tête.
const png1x1 = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
const photoDataUrl = `data:image/png;base64,${png1x1.toString('base64')}`;

const membreComplet = {
  nomComplet: 'ANIBE ADJA MAURICE AXEL',
  matricule: 'CP-AA-2526',
  etablissement: 'Groupe Scolaire Céleste',
  anneeAdhesion: 2019,
  valideJusqua: '2027-11-10',
  photoDataUrl,
};

test('carte 122 : la carte PDF porte les données du membre, le QR et la validité', async () => {
  const pdf = await genererCartePdf(membreComplet);
  assert.equal(nombrePages(pdf), 1, 'une seule page');
  const t = extraireTextePdf(pdf);
  assert.ok(t.includes('ANIBE ADJA MAURICE AXEL'), 'nom');
  assert.ok(t.includes('CP-AA-2526'), 'matricule');
  assert.ok(t.includes('Groupe Scolaire Céleste'), 'établissement');
  assert.ok(t.includes('Membre depuis'), 'Membre depuis');
  assert.ok(t.includes('2019'), 'année d’adhésion');
  assert.ok(t.includes('CARTE DE MEMBRE'), 'titre de la carte');
  assert.ok(t.includes('OFFICIEL ET VÉRIFIÉ'), 'mention officiel et vérifié');
  assert.ok(t.includes('Actif'), 'pastille Actif');
  assert.ok(t.includes('Scannez pour la présence'), 'bloc du QR');
  assert.ok(t.includes('Valable jusqu'), 'validité');
  assert.ok(t.includes('Former pour mieux servir'), 'devise actuelle');
  assert.ok(t.includes('Votre carte est aussi visible dans l’application, sur la page Carte.'), 'rappel de la page Carte');
  assert.ok(nombreImages(pdf) >= 2, 'QR et monogramme en images');
});

test('carte 122 : la carte PDF se génère sans photo ni établissement', async () => {
  const pdf = await genererCartePdf({
    nomComplet: 'Marie Konan', matricule: 'CP-MK-3001', anneeAdhesion: 2026, valideJusqua: '2027-01-15',
  });
  assert.equal(nombrePages(pdf), 1, 'une seule page');
  const t = extraireTextePdf(pdf);
  assert.ok(t.includes('Marie Konan'), 'nom');
  assert.ok(t.includes('CP-MK-3001'), 'matricule');
  assert.ok(t.includes('Membre depuis'), 'Membre depuis');
  assert.ok(t.includes('2026'), 'année d’adhésion');
  assert.ok(nombreImages(pdf) >= 2, 'QR et monogramme en images, sans photo');
});

test('carte 122 : l’année d’adhésion se déduit de la date d’inscription', async () => {
  const pdf = await genererCartePdf({
    nomComplet: 'Jean Yao', matricule: 'CP-JY-3002', inscrit_le: '2021-03-14', valideJusqua: '2027-03-14',
  });
  assert.ok(extraireTextePdf(pdf).includes('2021'), 'année de inscrit_le');
});

test('carte 122 : données invalides rejetées avant toute génération', async () => {
  assert.throws(
    () => validerDonneesCarte({ nomComplet: 'Jean Yao', matricule: 'XX-123', anneeAdhesion: 2026 }),
    (e) => e.code === 'CARTE_DONNEES_INVALIDES',
    'matricule invalide',
  );
  assert.throws(
    () => validerDonneesCarte({ nomComplet: 'J', matricule: 'CP-JY-3002', anneeAdhesion: 2026 }),
    (e) => e.code === 'CARTE_DONNEES_INVALIDES',
    'nom trop court',
  );
  assert.throws(
    () => validerDonneesCarte({ nomComplet: 'Jean Yao', matricule: 'CP-JY-3002', anneeAdhesion: 1800 }),
    (e) => e.code === 'CARTE_DONNEES_INVALIDES',
    'année invalide',
  );
  await assert.rejects(
    () => genererCartePdf({ nomComplet: 'Jean Yao', matricule: 'CP-JY-3002' }),
    (e) => e.code === 'CARTE_DONNEES_INVALIDES',
    'année absente',
  );
});

test('carte 122 : envoyerRecuParEmail sans SMTP échoue avec SMTP_NON_CONFIGURE', async () => {
  await assert.rejects(
    () => envoyerRecuParEmail({
      destinataire: 'membre@exemple.ci', nom: 'Jean Yao', reference: 'CARTE-1', libelle: 'carte de membre',
      montant: '1 000 FCFA', pdf: Buffer.from('%PDF-1.4'),
    }, { SMTP_HOST: '', SMTP_USER: '', SMTP_PASS: '' }),
    (e) => e.code === 'SMTP_NON_CONFIGURE',
  );
});

test('carte 122 : envoyerCarteParEmail sans SMTP échoue avec SMTP_NON_CONFIGURE', async () => {
  await assert.rejects(
    () => envoyerCarteParEmail({
      destinataire: 'membre@exemple.ci', nom: 'Jean Yao', matricule: 'CP-JY-3002', pdf: Buffer.from('%PDF-1.4'),
    }, { SMTP_HOST: '', SMTP_USER: '', SMTP_PASS: '' }),
    (e) => e.code === 'SMTP_NON_CONFIGURE',
  );
});

test('carte 122 : l’envoi est accroché à notifierPaiementValide, un seul point pour les quatre chemins', () => {
  assert.ok(serveur.includes('async function envoyerRecuEtCarte(paiement)'), 'fonction d’envoi du reçu et de la carte');
  assert.ok(serveur.includes('async function genererCartePdfPourMembre(membreId)'), 'génération de la carte pour un membre');
  assert.ok(serveur.includes("envoyerRecuEtCarte(paiement).catch((e) => app.log.error(e));"), 'envoi au mieux, sans attendre, échec journalisé');
  assert.ok(serveur.includes("await ensureInvoice(p.id);"), 'facture attendue avant l’envoi du reçu');
  assert.ok(serveur.includes("if (!p || p.statut !== 'confirme') return false;"), 'envoi seulement pour un paiement confirmé');
  assert.ok(serveur.includes("if (p.type === 'carte') {"), 'carte seulement quand le paiement concerne la carte');
  assert.ok(serveur.includes('envoyerRecuParEmail'), 'envoi du reçu par courriel');
  assert.ok(serveur.includes('envoyerCarteParEmail'), 'envoi de la carte par courriel');
  assert.ok(serveur.includes('genererCartePdf'), 'générateur de carte en PDF');
  // Les quatre chemins de confirmation appellent notifierPaiementValide : définition + 4 appels.
  assert.ok((serveur.match(/notifierPaiementValide\(/g) || []).length >= 5, 'validation structure, rapprochement Wave, webhook Wave, PayPal');
  // La validation elle-même ne change pas : la transition reste confirmPayment, en_attente vers confirme.
  assert.ok(serveur.includes("WHERE id = $1 AND statut = 'en_attente' RETURNING *"), 'confirmation inchangée');
});

test('carte 122 : le reçu reste téléchargeable dans l’historique et la carte visible sur la page Carte', () => {
  assert.ok(application.includes('api.downloadFacture(r.ref)'), 'téléchargement de la facture PDF du serveur');
  assert.ok(application.includes("saveToDownloads(bytes, 'facture-${r.ref}.pdf')"), 'facture en Téléchargements');
  assert.ok(pageCarte.includes('QrImageView(data: m.matricule'), 'QR de la carte sur le matricule seul');
  assert.ok(pageCarte.includes('Membre depuis'), 'Membre depuis sur la carte');
  assert.ok(pageCarte.includes('Scannez pour la présence'), 'bloc Scannez pour la présence sur la carte');
});
