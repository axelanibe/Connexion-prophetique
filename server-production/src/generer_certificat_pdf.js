// Génération du PDF du certificat d'adhésion (A4 paysage) avec pdfkit et QR de vérification.
// Carte 110, 8 nov. 2026 : lot adapté pour la structure. Visuel repris
// du modèle approuvé de l'attestation de bénévolat (cartes 42 et 44) :
// cadre double or dehors et bleu nuit dedans, coins ornés dorés, filigrane
// central CP très pâle, en-tête avec le logotype complet puis la devise,
// titres en serif capitales, sceau doré rond dessiné en code,
// bloc signature « Le Président » avec une ligne vide à signer à la main.
// Palette de la structure (bleu nuit #0B1F3A, or #D4A72C), logotype
// embarqué (src/logo.js) et monogramme officiel CP embarqué
// (src/monogramme.js, filigrane et sceau), jamais un logo inventé,
// jamais un fichier binaire à déposer.
// Dépendances : pdfkit et qrcode (package.json).
import { LOGO_JPG } from './logo.js';
import { MONOGRAMME_PNG } from './monogramme.js';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import { validerDonnees, dateFr, tailleNomAjustee } from './mise_en_page.js';

const NAVY = '#0B1F3A';
const GOLD = '#D4A72C';
const GOLD_CLAIR = '#F6EBC9';
const INK = '#303846';
const MUTED = '#6B7280';
const W = 841.89; // A4 paysage, en points
const H = 595.28;

// Coin orné doré, comme sur le modèle : un angle en L et un petit
// carré plein en retrait. (x, y) est le coin du cadre, sx et sy
// donnent la direction vers l'intérieur (+1 ou -1).
function coinOrne(doc, x, y, sx, sy) {
  doc.save();
  doc.lineWidth(3.5).strokeColor(GOLD).lineCap('butt');
  doc.moveTo(x + sx * 26, y).lineTo(x, y).lineTo(x, y + sy * 26).stroke();
  doc.rect(x + sx * 10, y + sy * 10, 5, 5).fill(GOLD);
  doc.restore();
}

// Sceau doré rond, dessiné en code : deux cercles or, CP au centre,
// mentions Connexion Prophétique, OFFICIEL et Sceau Officiel.
function sceau(doc, cx, cy) {
  doc.save();
  doc.lineWidth(2).circle(cx, cy, 48).fillAndStroke(GOLD_CLAIR, GOLD);
  doc.lineWidth(1).circle(cx, cy, 42).stroke(GOLD);
  doc.lineWidth(0.75).circle(cx, cy, 33).stroke(GOLD);
  doc.fillColor(NAVY).font('Times-Bold');
  doc.fontSize(7).text('CONNEXION', cx - 48, cy - 27, { width: 96, align: 'center' });
  doc.fontSize(7).text('PROPHÉTIQUE', cx - 48, cy - 18, { width: 96, align: 'center' });
  doc.fontSize(20).text('CP', cx - 48, cy - 9, { width: 96, align: 'center' });
  doc.fontSize(7).text('OFFICIEL', cx - 48, cy + 13, { width: 96, align: 'center' });
  doc.fontSize(5).text('SCEAU OFFICIEL', cx - 48, cy + 22, { width: 96, align: 'center' });
  doc.restore();
}

// Renvoie un Buffer PDF. Une seule page, aucune écriture sur disque.
// entree : { numero, url, matricule, nom_complet, inscrit_le, valide_jusqua, emis_le? }
// options : { logoBuffer? } ; par défaut le monogramme officiel embarqué,
// pour le filigrane seulement. L'en-tête utilise toujours le logotype
// complet embarqué (src/logo.js). Sans logo lisible, le certificat est
// généré sans filigrane.
export async function genererCertificatPdf(entree, options = {}) {
  const d = validerDonnees(entree);
  const logo = options.logoBuffer ?? MONOGRAMME_PNG;

  const qr = await QRCode.toBuffer(d.url, {
    type: 'png', errorCorrectionLevel: 'M', margin: 1, width: 320,
    color: { dark: NAVY, light: '#FFFFFFFF' },
  });

  const doc = new PDFDocument({
    size: 'A4',
    layout: 'landscape',
    margin: 0,
    info: {
      Title: `Certificat d'adhésion ${d.numero}`,
      Author: 'Connexion Prophétique',
      Subject: `Certificat ${d.numero} - ${d.matricule}`,
      Keywords: `${d.numero} ${d.matricule}`,
      // Date figée : le même certificat produit toujours le même PDF (empreinte stable).
      CreationDate: d.emis_le,
      ModDate: d.emis_le,
    },
  });
  const morceaux = [];
  doc.on('data', (m) => morceaux.push(m));
  const termine = new Promise((resolve, reject) => {
    doc.on('end', () => resolve(Buffer.concat(morceaux)));
    doc.on('error', reject);
  });

  // Logotype en en-tête, dessiné AVANT le cadre : le JPEG fait
  // 887 x 592 mais le dessin ne remplit que la bande 110 à 412 px
  // (marges blanches en haut et en bas). À 300 pt de large, l'image
  // fait 200 pt de haut, le dessin 108 pt ; placé à y = 1, le haut
  // du dessin tombe à y = 38, juste sous le cadre intérieur, et le
  // cadre peint ensuite par-dessus les marges blanches, sans trou
  // dans la bordure. Le fond du certificat est blanc comme le logo,
  // aucun cadre autour. Le nom est dans le logo, on ne le répète pas.
  doc.image(LOGO_JPG, (W - 300) / 2, 1, { width: 300 });

  // Cadre double : or dehors, bleu nuit dedans, comme sur le modèle.
  doc.lineWidth(2.5).strokeColor(GOLD).rect(20, 20, W - 40, H - 40).stroke();
  doc.lineWidth(1).strokeColor(NAVY).rect(30, 30, W - 60, H - 60).stroke();

  // Coins ornés dorés aux quatre angles du cadre extérieur.
  coinOrne(doc, 20, 20, 1, 1);
  coinOrne(doc, W - 20, 20, -1, 1);
  coinOrne(doc, 20, H - 20, 1, -1);
  coinOrne(doc, W - 20, H - 20, -1, -1);

  // Filigrane central : le monogramme officiel, très pâle. Le
  // monogramme est un carré à fond noir, on le découpe en cercle
  // pour ne pas voir le bord du carré, comme l'emblème rond du modèle.
  if (logo) {
    doc.save();
    doc.opacity(0.04);
    doc.circle(W / 2, H / 2, 150).clip();
    doc.image(logo, (W - 300) / 2, (H - 300) / 2, { width: 300 });
    doc.restore();
  }

  // Devise de la structure sous le logotype, avec son filet or.
  doc.font('Times-Roman').fontSize(10).fillColor(GOLD)
    .text('Former • Équiper • Servir', 0, 150, { width: W, align: 'center', characterSpacing: 2 });
  doc.lineWidth(1).strokeColor(GOLD).moveTo(W / 2 - 60, 164).lineTo(W / 2 + 60, 164).stroke();

  // Titre en serif capitales.
  doc.font('Times-Bold').fontSize(28).fillColor(NAVY)
    .text("CERTIFICAT D'ADHÉSION", 0, 176, { width: W, align: 'center', characterSpacing: 2 });
  doc.lineWidth(1.5).strokeColor(GOLD).moveTo(W / 2 - 81, 210).lineTo(W / 2 + 81, 210).stroke();

  doc.font('Times-Roman').fontSize(13).fillColor(INK)
    .text('La structure CONNEXION PROPHÉTIQUE certifie que', 0, 220, { width: W, align: 'center' });

  // Nom : taille ajustée pour tenir sur une ligne, en grand serif.
  const taille = tailleNomAjustee(d.nom_complet, 620, (texte, t) => {
    doc.font('Times-Bold').fontSize(t);
    return doc.widthOfString(texte);
  });
  doc.font('Times-Bold').fontSize(taille).fillColor(NAVY)
    .text(d.nom_complet, 0, 238, { width: W, align: 'center' });
  const finNom = doc.y;
  doc.lineWidth(1).strokeColor(GOLD).moveTo(W / 2 - 180, finNom + 6).lineTo(W / 2 + 180, finNom + 6).stroke();

  // Texte de statut.
  doc.font('Times-Roman').fontSize(13).fillColor(INK)
    .text(`est membre officiel de la structure depuis le ${dateFr(d.inscrit_le)}.`, 0, finNom + 24, { width: W, align: 'center' });
  doc.text(`Adhésion valable jusqu'au ${dateFr(d.valide_jusqua)}.`, 0, doc.y + 4, { width: W, align: 'center' });

  // Matricule, comme sur le modèle.
  doc.font('Times-Bold').fontSize(13).fillColor(NAVY)
    .text(`MATRICULE : ${d.matricule}`, 0, 338, { width: W, align: 'center', characterSpacing: 1 });

  // Petit losange doré, séparateur avant le bas de page.
  doc.save();
  doc.translate(W / 2, 368).rotate(45).rect(-4, -4, 8, 8).fill(GOLD);
  doc.restore();
  doc.lineWidth(0.5).strokeColor(GOLD).moveTo(300, 368).lineTo(400, 368).stroke();
  doc.lineWidth(0.5).strokeColor(GOLD).moveTo(W - 400, 368).lineTo(W - 300, 368).stroke();

  // Référence du document et contact de vérification.
  doc.font('Times-Bold').fontSize(10).fillColor(NAVY)
    .text(`Référence : ${d.numero}`, 0, 388, { width: W, align: 'center' });
  doc.font('Times-Roman').fontSize(9).fillColor(INK)
    .text('Pour vérifier l\u2019authenticité de ce document, contactez la structure en citant la référence à support@connexionprophetique.com', 0, 404, { width: W, align: 'center' });

  // Bas de page : sceau à gauche, signature au centre, QR à droite.
  sceau(doc, 170, 482);

  // Bloc signature : « Le Président », ligne vide à signer à la main.
  doc.font('Times-Bold').fontSize(12).fillColor(NAVY)
    .text('Le Président', 400, 438, { width: 160, align: 'center' });
  doc.lineWidth(1).strokeColor(NAVY).moveTo(400, 490).lineTo(560, 490).stroke();
  doc.font('Times-Italic').fontSize(8).fillColor(MUTED)
    .text('Signature manuscrite du signataire', 400, 498, { width: 160, align: 'center' });

  // QR de vérification.
  doc.image(qr, 700, 428, { width: 84 });
  doc.font('Helvetica').fontSize(8).fillColor(MUTED)
    .text('Scanner pour vérifier', 680, 518, { width: 124, align: 'center' });

  // Pied de page.
  doc.font('Helvetica').fontSize(8).fillColor(MUTED)
    .text(`Document généré automatiquement le ${dateFr(d.emis_le)}. Authenticité vérifiable par QR code.`,
      0, 552, { width: W, align: 'center' });

  doc.end();
  return termine;
}
