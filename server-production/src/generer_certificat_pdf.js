// Génération du PDF du certificat d'adhésion (A4 paysage) avec pdfkit et QR de vérification.
// Carte 110, 8 nov. 2026 : lot adapté pour la structure. Couleurs
// alignées sur notre palette (bleu nuit #0B1F3A, or #D4A72C) et
// monogramme officiel CP embarqué (src/monogramme.js), jamais un
// logo inventé, jamais un fichier binaire à déposer.
// Dépendances : pdfkit et qrcode (package.json).
import { MONOGRAMME_PNG } from './monogramme.js';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import { validerDonnees, dateFr, tailleNomAjustee } from './mise_en_page.js';

const NAVY = '#0B1F3A';
const GOLD = '#D4A72C';
const INK = '#303846';
const MUTED = '#6B7280';
const W = 841.89; // A4 paysage, en points
const H = 595.28;

// Renvoie un Buffer PDF. Une seule page, aucune écriture sur disque.
// entree : { numero, url, matricule, nom_complet, inscrit_le, valide_jusqua, emis_le? }
// options : { logoBuffer? } ; par défaut le monogramme officiel embarqué.
// Sans logo lisible, le certificat est généré sans logo.
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

  // Cadre double
  doc.lineWidth(3).strokeColor(NAVY).rect(24, 24, W - 48, H - 48).stroke();
  doc.lineWidth(1).strokeColor(GOLD).rect(34, 34, W - 68, H - 68).stroke();

  // Logo
  if (logo) doc.image(logo, (W - 96) / 2, 50, { width: 96 });

  // Titre
  doc.font('Helvetica-Bold').fontSize(30).fillColor(NAVY)
    .text("CERTIFICAT D'ADHÉSION", 0, 168, { width: W, align: 'center', characterSpacing: 2 });
  doc.lineWidth(1.5).strokeColor(GOLD).moveTo(W / 2 - 120, 212).lineTo(W / 2 + 120, 212).stroke();

  doc.font('Helvetica').fontSize(14).fillColor(INK)
    .text('La structure CONNEXION PROPHÉTIQUE certifie que', 0, 228, { width: W, align: 'center' });

  // Nom : taille ajustée pour tenir sur une ligne
  const taille = tailleNomAjustee(d.nom_complet, 620, (texte, t) => {
    doc.font('Helvetica-Bold').fontSize(t);
    return doc.widthOfString(texte);
  });
  doc.font('Helvetica-Bold').fontSize(taille).fillColor(NAVY)
    .text(d.nom_complet, 0, 258, { width: W, align: 'center' });
  const finNom = doc.y;
  doc.lineWidth(1).strokeColor(GOLD).moveTo(W / 2 - 180, finNom + 4).lineTo(W / 2 + 180, finNom + 4).stroke();

  // Texte de statut
  doc.font('Helvetica').fontSize(14).fillColor(INK)
    .text(`est membre officiel de la structure depuis le ${dateFr(d.inscrit_le)}.`, 0, finNom + 18, { width: W, align: 'center' });
  doc.text(`Adhésion valable jusqu'au ${dateFr(d.valide_jusqua)}.`, 0, doc.y + 4, { width: W, align: 'center' });

  // Bloc gauche : identifiants
  doc.font('Helvetica-Bold').fontSize(10).fillColor(NAVY).text('MATRICULE', 90, H - 178);
  doc.font('Helvetica').fontSize(13).fillColor(INK).text(d.matricule, 90, H - 162);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(NAVY).text('NUMÉRO DE CERTIFICAT', 90, H - 130);
  doc.font('Helvetica').fontSize(13).fillColor(INK).text(d.numero, 90, H - 114);

  // Bloc droit : QR de vérification
  const qrX = W - 90 - 110;
  doc.image(qr, qrX, H - 218, { width: 110 });
  doc.font('Helvetica').fontSize(9).fillColor(MUTED)
    .text('Scanner pour vérifier', qrX - 20, H - 100, { width: 150, align: 'center' });

  // Pied de page
  doc.font('Helvetica').fontSize(9).fillColor(MUTED)
    .text(`Document généré automatiquement le ${dateFr(d.emis_le)}. Authenticité vérifiable par QR code.`,
      0, H - 62, { width: W, align: 'center' });

  doc.end();
  return termine;
}
