// Génération du PDF de la carte de membre (A4 portrait) avec pdfkit et QR du matricule.
// Carte 122, 10 nov. 2026 : à la validation d'un paiement de carte, la nouvelle carte
// part par courriel au membre, en plus du reçu. Visuel repris de la page Carte de
// l'application (carte_nouvelle.dart) : fond bleu nuit, liseré or, monogramme CP,
// CARTE DE MEMBRE, OFFICIEL ET VÉRIFIÉ, pastille Actif, photo, nom, matricule,
// établissement, Membre depuis, QR réel du matricule seul et son bloc interne
// « Scannez pour la présence ». Palette de la structure (bleu nuit #0B1F3A,
// or #D4A72C), monogramme officiel CP embarqué (src/monogramme.js), jamais un
// logo inventé, jamais un fichier binaire à déposer. Devise actuelle,
// « Former pour mieux servir », tranchée par Axel le 10 nov. 2026.
// Dépendances : pdfkit et qrcode (package.json).
import { MONOGRAMME_PNG } from './monogramme.js';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import { dateFr, normaliserDate } from './mise_en_page.js';

const NAVY = '#0B1F3A';
const GOLD = '#D4A72C';
const PAPIER = '#F5F6FA';
const VERT = '#34D399';
const MUTED = '#6B7280';
const W = 595.28; // A4 portrait, en points
const H = 841.89;

// Carte dessinée, proportions d'une carte bancaire (1,586).
const CARTE_X = 57;
const CARTE_Y = 160;
const CARTE_L = 481;
const CARTE_H = 320;

const REGEX_MATRICULE = /^CP-[A-Z]{2}-\d{4,}$/;

function erreurDonnees(message) {
  const e = new Error(message);
  e.code = 'CARTE_DONNEES_INVALIDES';
  return e;
}

// Contrôle strict avant toute génération : une carte ne part jamais avec des données douteuses.
// entree : { nomComplet, matricule, etablissement?, anneeAdhesion?, inscrit_le?, valideJusqua?, photoDataUrl? }
// L'année d'adhésion vient de anneeAdhesion, sinon de l'année de inscrit_le.
export function validerDonneesCarte(d) {
  if (!d || typeof d !== 'object') throw erreurDonnees('Données absentes.');
  if (!REGEX_MATRICULE.test(d.matricule ?? '')) throw erreurDonnees('Matricule invalide.');
  const nom = String(d.nomComplet ?? '').trim();
  if (nom.length < 2 || nom.length > 120) throw erreurDonnees('Nom invalide.');
  const etablissement = String(d.etablissement ?? '').trim().slice(0, 120);
  let annee = d.anneeAdhesion;
  if (annee == null && d.inscrit_le != null) annee = normaliserDate(d.inscrit_le).getFullYear();
  if (!Number.isInteger(annee) || annee < 1900 || annee > 2100) throw erreurDonnees('Année d’adhésion invalide.');
  const valideJusqua = d.valideJusqua != null ? normaliserDate(d.valideJusqua) : null;
  // La photo est facultative : une valeur mal formée est ignorée, le monogramme prend sa place.
  const photo = typeof d.photoDataUrl === 'string' && /^data:image\/(png|jpeg|jpg);base64,/.test(d.photoDataUrl)
    ? d.photoDataUrl
    : null;
  // Carte 125, 10 nov. 2026 : le nom s'affiche en majuscules sur
  // la carte, même pour un membre inscrit avant, dont le nom est
  // stocké en casse mixte, sans migration de données.
  return { nomComplet: nom.toUpperCase(), matricule: d.matricule, etablissement, anneeAdhesion: annee, valideJusqua, photoDataUrl: photo };
}

// Renvoie un Buffer PDF. Une seule page, aucune écriture sur disque.
export async function genererCartePdf(entree) {
  const d = validerDonneesCarte(entree);

  const qr = await QRCode.toBuffer(d.matricule, {
    type: 'png', errorCorrectionLevel: 'M', margin: 1, width: 320,
    color: { dark: NAVY, light: '#FFFFFFFF' },
  });

  const doc = new PDFDocument({
    size: 'A4',
    margin: 0,
    info: {
      Title: `Carte de membre ${d.matricule}`,
      Author: 'Connexion Prophétique',
      Subject: `Carte ${d.matricule} - ${d.nomComplet}`,
      Keywords: `${d.matricule}`,
    },
  });
  const morceaux = [];
  doc.on('data', (m) => morceaux.push(m));
  const termine = new Promise((resolve, reject) => {
    doc.on('end', () => resolve(Buffer.concat(morceaux)));
    doc.on('error', reject);
  });

  // En-tête : nom de la structure, filet or.
  doc.font('Times-Bold').fontSize(20).fillColor(NAVY)
    .text('CONNEXION PROPHÉTIQUE', 0, 108, { width: W, align: 'center', characterSpacing: 1 });
  doc.lineWidth(1.5).strokeColor(GOLD).moveTo(W / 2 - 81, 136).lineTo(W / 2 + 81, 136).stroke();

  // Carte : fond bleu nuit, cadre or double.
  doc.save();
  doc.rect(CARTE_X, CARTE_Y, CARTE_L, CARTE_H).fill(NAVY);
  doc.lineWidth(2.5).strokeColor(GOLD).rect(CARTE_X, CARTE_Y, CARTE_L, CARTE_H).stroke();
  doc.lineWidth(0.75).strokeColor(GOLD).rect(CARTE_X + 8, CARTE_Y + 8, CARTE_L - 16, CARTE_H - 16).stroke();
  doc.restore();

  // Monogramme officiel en haut de la carte, découpé en cercle.
  doc.save();
  doc.circle(W / 2, CARTE_Y + 46, 22).clip();
  doc.image(MONOGRAMME_PNG, W / 2 - 22, CARTE_Y + 24, { width: 44, height: 44 });
  doc.restore();

  // Titres de la carte.
  doc.font('Times-Bold').fontSize(15).fillColor(GOLD)
    .text('CARTE DE MEMBRE', 0, CARTE_Y + 82, { width: W, align: 'center', characterSpacing: 1 });
  doc.font('Helvetica').fontSize(8).fillColor(PAPIER)
    .text('OFFICIEL ET VÉRIFIÉ', 0, CARTE_Y + 102, { width: W, align: 'center', characterSpacing: 2 });

  // Pastille Actif, en haut à droite de la carte.
  doc.save();
  doc.roundedRect(CARTE_X + CARTE_L - 60, CARTE_Y + 16, 52, 20, 10).fill(VERT);
  doc.font('Helvetica-Bold').fontSize(10).fillColor('#FFFFFF')
    .text('Actif', CARTE_X + CARTE_L - 60, CARTE_Y + 21, { width: 52, align: 'center' });
  doc.restore();

  // Photo du membre, à gauche ; monogramme si pas de photo.
  const photoX = CARTE_X + 20;
  const photoY = CARTE_Y + 140;
  const photoTaille = 76;
  if (d.photoDataUrl) {
    try {
      const tampon = Buffer.from(d.photoDataUrl.split(',')[1], 'base64');
      doc.image(tampon, photoX, photoY, { fit: [photoTaille, photoTaille] });
    } catch {
      doc.save();
      doc.circle(photoX + photoTaille / 2, photoY + photoTaille / 2, photoTaille / 2).clip();
      doc.image(MONOGRAMME_PNG, photoX, photoY, { width: photoTaille, height: photoTaille });
      doc.restore();
    }
  } else {
    doc.save();
    doc.circle(photoX + photoTaille / 2, photoY + photoTaille / 2, photoTaille / 2).clip();
    doc.image(MONOGRAMME_PNG, photoX, photoY, { width: photoTaille, height: photoTaille });
    doc.restore();
  }

  // Nom, matricule, établissement, Membre depuis, à droite de la photo.
  const texteX = photoX + photoTaille + 12;
  const texteL = 250;
  let tailleNom = 20;
  for (; tailleNom > 14; tailleNom -= 1) {
    doc.font('Helvetica-Bold').fontSize(tailleNom);
    if (doc.widthOfString(d.nomComplet) <= texteL) break;
  }
  let y = photoY + 2;
  doc.font('Helvetica-Bold').fontSize(tailleNom).fillColor('#FFFFFF')
    .text(d.nomComplet, texteX, y, { width: texteL });
  y = doc.y + 8;
  doc.font('Helvetica-Bold').fontSize(13).fillColor(GOLD)
    .text(d.matricule, texteX, y, { width: texteL });
  y = doc.y + 6;
  if (d.etablissement) {
    doc.font('Helvetica').fontSize(12).fillColor(PAPIER)
      .text(d.etablissement, texteX, y, { width: texteL });
    y = doc.y + 6;
  }
  doc.font('Helvetica').fontSize(11).fillColor(PAPIER)
    .text(`Membre depuis : ${d.anneeAdhesion}`, texteX, y, { width: texteL });

  // QR du matricule seul, sur fond blanc, en bas à droite de la carte.
  const qrX = CARTE_X + CARTE_L - 108;
  const qrY = CARTE_Y + 204;
  doc.save();
  doc.rect(qrX, qrY, 92, 92).fill('#FFFFFF');
  doc.image(qr, qrX + 4, qrY + 4, { width: 84, height: 84 });
  doc.restore();
  doc.font('Helvetica').fontSize(7.5).fillColor(PAPIER)
    .text('Scannez pour la présence', qrX - 6, qrY + 96, { width: 104, align: 'center' });

  // Sous la carte : validité, devise, rappel.
  let bas = CARTE_Y + CARTE_H + 28;
  if (d.valideJusqua) {
    doc.font('Helvetica').fontSize(11).fillColor(NAVY)
      .text(`Valable jusqu'au ${dateFr(d.valideJusqua)}.`, 0, bas, { width: W, align: 'center' });
    bas = doc.y + 8;
  }
  doc.font('Times-Italic').fontSize(11).fillColor(GOLD)
    .text('Former pour mieux servir.', 0, bas, { width: W, align: 'center' });
  bas = doc.y + 8;
  doc.font('Helvetica').fontSize(9).fillColor(MUTED)
    .text('Votre carte est aussi visible dans l’application, sur la page Carte.', 0, bas, { width: W, align: 'center' });

  doc.end();
  return termine;
}
