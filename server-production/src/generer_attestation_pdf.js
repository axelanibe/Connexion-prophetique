// Génération du PDF de l'attestation (A4 paysage) avec pdfkit et QR de vérification.
// Carte 120, 9 nov. 2026 : les attestations deviennent de vrais PDF, modèle
// du certificat d'adhésion de la carte 110 (vrai PDF, QR et page publique
// de vérification), et le HTML disparaît. Le contenu est le contenu exact
// du gabarit HTML approuvé (cartes 42, 44 et 95) : titre, mention
// d'annulation rouge quand l'attestation est annulée (carte 106),
// « Je soussigné, le Président », nom, matricule, établissement,
// activité, rôle, remerciement, mention de délivrance, période,
// référence et note de vérification, sceau doré dessiné en code,
// signature du signataire (dessinée dans l'application, carte 120,
// ou signature enregistrée de l'administrateur, carte 96) ou ligne
// vide à signer à la main, QR de vérification.
//
// Le PDF est généré à l'ouverture à partir des données de
// l'attestation, comme l'était la page HTML, jamais archivé en base.
// Aucune donnée inventée : un champ absent disparaît de sa ligne,
// il ne devient jamais une durée, un lieu ou une appréciation.
// Palette de la structure (bleu nuit #0B1F3A, or #D4A72C), monogramme
// officiel CP embarqué (src/monogramme.js, filigrane et sceau),
// jamais un logo inventé, jamais un fichier binaire à déposer.
// Dépendances : pdfkit et qrcode (package.json).
import { MONOGRAMME_PNG } from './monogramme.js';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import { tailleNomAjustee } from './mise_en_page.js';
import { signer, signatureValide } from './certificats.js';
import { decoderSignaturePng } from './signature_admin.js';

const NAVY = '#0B1F3A';
const GOLD = '#D4A72C';
const GOLD_FONCE = '#8A6A12';
const GOLD_CLAIR = '#F6EBC9';
const INK = '#303846';
const MUTED = '#6B7280';
const ROUGE = '#B00020';
const W = 841.89; // A4 paysage, en points
const H = 595.28;

const REGEX_REFERENCE = /^ATT-\d{4}-\d{4,}$/;
const REGEX_MATRICULE = /^CP-[A-Z]{2}-\d{4,}$/;

// Coin orné doré, comme sur le certificat : un angle en L et un
// petit carré plein en retrait. (x, y) est le coin du cadre, sx et
// sy donnent la direction vers l'intérieur (+1 ou -1).
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

// Date JJ/MM/AAAA, comme sur le gabarit HTML. null si absente.
export function dateAttestationJjMmAaaa(v) {
  if (!v) return null;
  const s = v instanceof Date ? v.toISOString().slice(0, 10) : String(v).slice(0, 10);
  const [a, m, j] = s.split('-');
  if (!a || !m || !j) return null;
  return `${j}/${m}/${a}`;
}

function erreurDonnees(message) {
  const e = new Error(message);
  e.code = 'ATTESTATION_DONNEES_INVALIDES';
  return e;
}

// Contrôle strict avant toute génération : une attestation ne part
// jamais avec des données douteuses. Les dates d'activité sont
// facultatives, comme sur le gabarit HTML.
export function validerAttestationPdf(d) {
  if (!d || typeof d !== 'object') throw erreurDonnees('Données absentes.');
  if (!REGEX_REFERENCE.test(d.reference ?? '')) throw erreurDonnees('Référence d’attestation invalide.');
  if (!REGEX_MATRICULE.test(d.matricule ?? '')) throw erreurDonnees('Matricule invalide.');
  const nom = String(d.nom_complet ?? '').trim();
  if (nom.length < 2 || nom.length > 120) throw erreurDonnees('Nom invalide.');
  if (d.type !== 'benevolat' && d.type !== 'participation') throw erreurDonnees('Type d’attestation invalide.');
  const activite = String(d.activite ?? '').trim();
  if (activite.length < 1 || activite.length > 300) throw erreurDonnees('Activité invalide.');
  if (d.url != null && (typeof d.url !== 'string' || !/^https?:\/\//.test(d.url))) throw erreurDonnees('URL de vérification invalide.');
  const delivre = d.delivre_le ? new Date(d.delivre_le) : new Date();
  if (Number.isNaN(delivre.getTime())) throw erreurDonnees('Date de délivrance invalide.');
  return {
    reference: d.reference,
    type: d.type,
    nom_complet: nom,
    matricule: d.matricule,
    etablissement: String(d.etablissement ?? '').trim() || null,
    activite,
    role_service: String(d.role_service ?? '').trim() || null,
    date_debut: d.date_debut ? String(d.date_debut).slice(0, 10) : null,
    date_fin: d.date_fin ? String(d.date_fin).slice(0, 10) : null,
    delivre_le: delivre,
    annulee_le: d.annulee_le ? new Date(d.annulee_le) : null,
    url: d.url ?? null,
    signature: d.signature ?? null,
  };
}

// Décodage d'une signature : data URL PNG (le format gardé en
// base), ou Buffer déjà décodé. Renvoie le Buffer, ou null si la
// signature est absente ou illisible : le PDF garde alors la
// ligne vide, sans jamais bloquer la génération. Le contrôle du
// format PNG est celui de la carte 96 (decoderSignaturePng).
const MAGIC_PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
export function decoderSignatureAttestation(signature) {
  if (!signature) return null;
  if (Buffer.isBuffer(signature)) {
    return signature.length >= MAGIC_PNG.length && signature.subarray(0, MAGIC_PNG.length).equals(MAGIC_PNG) ? signature : null;
  }
  if (typeof signature !== 'string') return null;
  return decoderSignaturePng(signature);
}

// URL publique de vérification, ouverte par le QR code. Même
// signature HMAC que les certificats, avec le même secret dédié
// (CERT_SECRET) : sa rotation invaliderait les QR déjà imprimés,
// elle ne se fait jamais sans décision d'Axel.
export function urlVerificationAttestation(baseUrl, reference, matricule, secret) {
  const url = new URL(`/attestations/verification/${encodeURIComponent(reference)}`, baseUrl);
  url.searchParams.set('matricule', matricule);
  url.searchParams.set('signature', signer(secret, reference, matricule));
  return url.toString();
}

// État d'une attestation pour la page de vérification : l'annulation
// prime, une attestation annulée reste vérifiable, marquée annulée.
export function etatAttestation(row) {
  if (!row) return 'introuvable';
  if (row.annulee_le) return 'annulee';
  return 'valide';
}

export function echapperHtmlAttestation(valeur) {
  return String(valeur ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const LIBELLES_VERIFICATION = {
  valide: { titre: 'Attestation valide', couleur: '#1b7f3b' },
  annulee: { titre: 'Attestation annulée', couleur: '#b00020' },
  introuvable: { titre: 'Attestation introuvable', couleur: '#555555' },
};

// Page lisible sur téléphone : c'est ce que voit une personne qui scanne le QR.
export function pageVerificationAttestationHtml({ etat, attestation }) {
  const { titre, couleur } = LIBELLES_VERIFICATION[etat] ?? LIBELLES_VERIFICATION.introuvable;
  const delivre = attestation?.delivre_le ? dateAttestationJjMmAaaa(attestation.delivre_le) : null;
  const annulee = attestation?.annulee_le ? dateAttestationJjMmAaaa(attestation.annulee_le) : null;
  const detail = attestation
    ? `<dl>
        <dt>Nom</dt><dd>${echapperHtmlAttestation(attestation.nom_complet)}</dd>
        <dt>Type</dt><dd>${echapperHtmlAttestation(attestation.type === 'benevolat' ? 'Attestation de bénévolat' : 'Attestation de participation')}</dd>
        <dt>Activité</dt><dd>${echapperHtmlAttestation(attestation.activite)}</dd>
        <dt>Référence</dt><dd>${echapperHtmlAttestation(attestation.reference)}</dd>
        ${delivre ? `<dt>Délivrée le</dt><dd>${echapperHtmlAttestation(delivre)}</dd>` : ''}
        ${annulee ? `<dt>Annulée le</dt><dd>${echapperHtmlAttestation(annulee)}</dd>` : ''}
      </dl>`
    : '';
  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vérification d’attestation - Connexion Prophétique</title>
<style>
  body { font-family: system-ui, sans-serif; background: #f5f6f8; color: #0B1F3A; margin: 0; padding: 24px; }
  main { max-width: 480px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
  h1 { font-size: 20px; color: ${couleur}; margin: 0 0 16px; }
  dl { display: grid; grid-template-columns: max-content 1fr; gap: 8px 16px; margin: 0; }
  dt { font-weight: 600; color: #555; }
  dd { margin: 0; word-break: break-word; }
  footer { margin-top: 20px; font-size: 13px; color: #666; }
</style></head>
<body><main>
  <h1>${echapperHtmlAttestation(titre)}</h1>
  ${detail}
  <footer>Connexion Prophétique — vérification officielle d’une attestation.</footer>
</main></body></html>`;
}

// Renvoie un Buffer PDF. Une seule page, aucune écriture sur disque.
// entree : { reference, type, membre_nom, matricule, etablissement,
//   activite, role_service, date_debut, date_fin, delivre_le,
//   annulee_le, url?, signature? }
// Le nom du membre arrive en membre_nom, comme dans la requête SQL
// des attestations ; nom_complet est accepté aussi, pour les tests.
export async function genererAttestationPdf(entree, options = {}) {
  const d = validerAttestationPdf({
    ...entree,
    nom_complet: entree.nom_complet ?? entree.membre_nom,
  });
  const logo = options.logoBuffer ?? MONOGRAMME_PNG;
  const signatureBytes = decoderSignatureAttestation(d.signature);
  const qr = d.url
    ? await QRCode.toBuffer(d.url, {
        type: 'png', errorCorrectionLevel: 'M', margin: 1, width: 320,
        color: { dark: NAVY, light: '#FFFFFFFF' },
      })
    : null;

  const doc = new PDFDocument({
    size: 'A4',
    layout: 'landscape',
    margin: 0,
    // Sans compression des flux de contenu : le texte reste
    // lisible dans le tampon, en hexadécimal, pour que les tests
    // vérifient le contenu exact sans décompresser. Les images
    // restent compressées, comme toujours en PDF. Le visuel ne
    // change pas.
    compress: false,
    info: {
      Title: `Attestation ${d.reference}`,
      Author: 'Connexion Prophétique',
      Subject: `Attestation ${d.reference} - ${d.matricule}`,
      Keywords: `${d.reference} ${d.matricule}`,
      // Date figée : la même attestation produit toujours le même PDF (empreinte stable).
      CreationDate: d.delivre_le,
      ModDate: d.delivre_le,
    },
  });
  const morceaux = [];
  doc.on('data', (m) => morceaux.push(m));
  const termine = new Promise((resolve, reject) => {
    doc.on('end', () => resolve(Buffer.concat(morceaux)));
    doc.on('error', reject);
  });

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
  // pour ne pas voir le bord du carré, comme sur le certificat.
  if (logo) {
    doc.save();
    doc.opacity(0.04);
    doc.circle(W / 2, H / 2, 150).clip();
    doc.image(logo, (W - 300) / 2, (H - 300) / 2, { width: 300 });
    doc.restore();
  }

  // En-tête : monogramme officiel centré, nom de la structure,
  // devise avec son filet or. Le modèle HTML met le monogramme à
  // gauche du nom ; en PDF, centré, il garde la même place sans
  // pousser le titre vers le bas. L'en-tête est compacte, pour
  // laisser au corps ses douze lignes sur une seule page.
  doc.image(MONOGRAMME_PNG, (W - 44) / 2, 36, { width: 44 });
  doc.font('Times-Bold').fontSize(18).fillColor(NAVY)
    .text('CONNEXION PROPHÉTIQUE', 0, 86, { width: W, align: 'center', characterSpacing: 2 });
  doc.font('Times-Roman').fontSize(9).fillColor(GOLD_FONCE)
    .text('Former • Équiper • Servir', 0, 110, { width: W, align: 'center', characterSpacing: 3 });
  doc.lineWidth(1).strokeColor(GOLD).moveTo(W / 2 - 60, 122).lineTo(W / 2 + 60, 122).stroke();

  // Titre en serif capitales.
  const benevolat = d.type === 'benevolat';
  const titre = benevolat ? 'ATTESTATION DE BÉNÉVOLAT' : 'ATTESTATION DE PARTICIPATION';
  doc.font('Times-Bold').fontSize(22).fillColor(NAVY)
    .text(titre, 0, 130, { width: W, align: 'center', characterSpacing: 2 });
  doc.lineWidth(1.5).strokeColor(GOLD).moveTo(W / 2 - 81, 160).lineTo(W / 2 + 81, 160).stroke();

  let y = 170;
  // Carte 106 : mention rouge d'annulation, juste sous le titre.
  if (d.annulee_le) {
    doc.font('Times-Bold').fontSize(13).fillColor(ROUGE)
      .text(`ANNULÉE LE ${dateAttestationJjMmAaaa(d.annulee_le)}`, 0, y, { width: W, align: 'center', characterSpacing: 1 });
    y += 18;
  }

  // Corps du document, contenu exact du gabarit HTML.
  doc.font('Times-Italic').fontSize(11).fillColor(INK)
    .text('Je soussigné, le Président de CONNEXION PROPHÉTIQUE, atteste que :', 0, y, { width: W, align: 'center' });
  y = doc.y + 5;

  // Nom : taille ajustée pour tenir sur une ligne, en grand serif,
  // plafonnée à 28 pour que le corps tienne sur une seule page.
  const nomMajuscules = d.nom_complet.toUpperCase();
  let taille = tailleNomAjustee(nomMajuscules, 620, (texte, t) => {
    doc.font('Times-Bold').fontSize(t);
    return doc.widthOfString(texte);
  });
  if (taille > 28) taille = 28;
  doc.font('Times-Bold').fontSize(taille).fillColor(NAVY)
    .text(nomMajuscules, 0, y, { width: W, align: 'center' });
  y = doc.y + 3;
  doc.lineWidth(1).strokeColor(GOLD).moveTo(W / 2 - 180, y).lineTo(W / 2 + 180, y).stroke();
  y += 6;
  doc.font('Times-Bold').fontSize(11).fillColor(NAVY)
    .text(`MATRICULE : ${d.matricule}`, 0, y, { width: W, align: 'center', characterSpacing: 1 });
  y = doc.y + 3;
  if (d.etablissement) {
    doc.font('Times-Bold').fontSize(10).fillColor(GOLD_FONCE)
      .text(`ÉTABLISSEMENT : ${d.etablissement.toUpperCase()}`, 0, y, { width: W, align: 'center', characterSpacing: 1 });
    y = doc.y + 3;
  }

  const corps = benevolat
    ? 'a rendu un service bénévole remarquable au sein de la structure, dans le cadre de l\u2019activité suivante :'
    : 'a participé à l\u2019activité suivante :';
  doc.font('Times-Roman').fontSize(11).fillColor(INK)
    .text(corps, 0, y, { width: W, align: 'center' });
  y = doc.y + 5;

  // Pastille d'activité : fond bleu nuit, texte or, comme sur le modèle.
  const activiteTexte = d.activite.toUpperCase();
  doc.font('Times-Bold').fontSize(11);
  const largeurActivite = doc.widthOfString(activiteTexte) + 36;
  doc.save();
  doc.roundedRect((W - largeurActivite) / 2, y, largeurActivite, 22, 6).fill(NAVY);
  doc.fillColor(GOLD).text(activiteTexte, (W - largeurActivite) / 2, y + 5, { width: largeurActivite, align: 'center' });
  doc.restore();
  y += 27;

  if (d.role_service) {
    doc.font('Times-Roman').fontSize(11).fillColor(INK)
      .text(`Rôle ou service : ${d.role_service}.`, 0, y, { width: W, align: 'center' });
    y = doc.y + 3;
  }

  const remerciement = benevolat
    ? `La structure remercie chaleureusement ${nomMajuscules} pour son engagement exemplaire, son dévouement et sa précieuse contribution, et lui exprime sa profonde reconnaissance.`
    : `La structure remercie ${nomMajuscules} pour sa participation et sa contribution, et lui exprime sa reconnaissance.`;
  doc.font('Times-Roman').fontSize(10).fillColor(INK)
    .text(remerciement, 110, y, { width: W - 220, align: 'center' });
  y = doc.y + 5;

  doc.font('Times-Italic').fontSize(10).fillColor(MUTED)
    .text('Cette attestation est délivrée à l\u2019intéressé pour servir et valoir ce que de droit.', 0, y, { width: W, align: 'center' });
  y = doc.y + 5;

  doc.font('Times-Roman').fontSize(11).fillColor(INK)
    .text(`Fait et délivré le ${dateAttestationJjMmAaaa(d.delivre_le)}.`, 0, y, { width: W, align: 'center' });
  y = doc.y + 3;
  const debut = dateAttestationJjMmAaaa(d.date_debut);
  const fin = dateAttestationJjMmAaaa(d.date_fin);
  if (debut && fin) {
    doc.font('Times-Roman').fontSize(10).fillColor(INK)
      .text(`Période : du ${debut} au ${fin}.`, 0, y, { width: W, align: 'center' });
    y = doc.y + 2;
  } else if (debut || fin) {
    doc.font('Times-Roman').fontSize(10).fillColor(INK)
      .text(`Date : ${debut || fin}.`, 0, y, { width: W, align: 'center' });
    y = doc.y + 2;
  }

  // Référence et note de vérification, comme sur le modèle.
  doc.font('Times-Bold').fontSize(10).fillColor(NAVY)
    .text(`Référence : ${d.reference}`, 0, y + 4, { width: W, align: 'center' });
  doc.font('Times-Roman').fontSize(9).fillColor(INK)
    .text('Pour vérifier l\u2019authenticité de ce document, contactez la structure en citant la référence à support@connexionprophetique.com', 0, y + 18, { width: W, align: 'center' });

  // Bas de page : sceau à gauche, signature au centre, QR à droite.
  sceau(doc, 170, 498);

  // Bloc signature : « Le Président », signature dessinée si elle
  // est enregistrée, sinon ligne vide à signer à la main.
  doc.font('Times-Bold').fontSize(12).fillColor(NAVY)
    .text('Le Président', 400, 450, { width: 160, align: 'center' });
  if (signatureBytes) {
    try {
      doc.image(signatureBytes, 400, 468, { fit: [160, 34], align: 'center', valign: 'bottom' });
    } catch {
      // Signature illisible dans le PDF : la ligne vide reste.
    }
  }
  doc.lineWidth(1).strokeColor(NAVY).moveTo(400, 506).lineTo(560, 506).stroke();
  doc.font('Times-Italic').fontSize(8).fillColor(MUTED)
    .text('Signature manuscrite du signataire', 400, 514, { width: 160, align: 'center' });

  // QR de vérification, quand l'URL est signée.
  if (qr) {
    doc.image(qr, 700, 450, { width: 84 });
    doc.font('Helvetica').fontSize(8).fillColor(MUTED)
      .text('Scanner pour vérifier', 680, 540, { width: 124, align: 'center' });
  }

  // Pied de page.
  doc.font('Helvetica').fontSize(8).fillColor(MUTED)
    .text(
      qr
        ? `Document généré automatiquement le ${dateAttestationJjMmAaaa(d.delivre_le)}. Authenticité vérifiable par QR code.`
        : `Document généré automatiquement le ${dateAttestationJjMmAaaa(d.delivre_le)}.`,
      0, 564, { width: W, align: 'center' });

  doc.end();
  return termine;
}
