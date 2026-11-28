// Exports complets en Excel et PDF, correctif global 27 nov. 2026.
// Mêmes données et même périmètre que les listes : la route
// /admin/exports/:sujet charge les lignes, ce module ne fait que
// les mettre en forme. Lecture seule, aucune écriture en base.
//
// Excel : un classeur minimal (.xlsx), sans nouvelle dépendance.
// Le zip est assemblé à la main (zlib natif pour la compression,
// CRC32 calculé ici), les cellules texte sont en inlineStr, donc
// pas de table de chaînes partagées. LibreOffice et Excel lisent
// ce format. Les nombres restent des nombres, pas du texte.
// PDF : pdfkit, déjà en dépendance, même palette que les
// attestations (bleu nuit, or). Aucune donnée inventée : une
// cellule absente reste vide.
import { deflateRawSync } from 'node:zlib';
import PDFDocument from 'pdfkit';

const NAVY = '#0B1F3A';
const PAPIER = '#F5F6FA';
const MUTED = '#6B7280';

// CRC32, table calculée une fois, comme dans tout zip minimal.
const TABLE_CRC = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(donnees) {
  let c = 0xffffffff;
  for (const b of donnees) c = TABLE_CRC[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

// Zip minimal : en-têtes locaux, répertoire central, fin. Entrées
// en deflate (méthode 8), noms en UTF-8 (drapeau 0x0800).
function zip(fichiers) {
  const locaux = [];
  const centrales = [];
  let decalage = 0;
  for (const [nom, donnees] of fichiers) {
    const nomOctets = Buffer.from(nom, 'utf8');
    const compresse = deflateRawSync(donnees);
    const crc = crc32(donnees);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(8, 8);
    local.writeUInt16LE(0, 10);
    local.writeUInt16LE(0x21, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(compresse.length, 18);
    local.writeUInt32LE(donnees.length, 22);
    local.writeUInt16LE(nomOctets.length, 26);
    local.writeUInt16LE(0, 28);
    locaux.push(local, nomOctets, compresse);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(8, 10);
    central.writeUInt16LE(0, 12);
    central.writeUInt16LE(0x21, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(compresse.length, 20);
    central.writeUInt32LE(donnees.length, 24);
    central.writeUInt16LE(nomOctets.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(decalage, 42);
    centrales.push(central, nomOctets);
    decalage += 30 + nomOctets.length + compresse.length;
  }
  const debutCentral = decalage;
  const tailleCentrale = centrales.reduce((s, b) => s + b.length, 0);
  const fin = Buffer.alloc(22);
  fin.writeUInt32LE(0x06054b50, 0);
  fin.writeUInt16LE(0, 4);
  fin.writeUInt16LE(0, 6);
  fin.writeUInt16LE(fichiers.length, 8);
  fin.writeUInt16LE(fichiers.length, 10);
  fin.writeUInt32LE(tailleCentrale, 12);
  fin.writeUInt32LE(debutCentral, 16);
  fin.writeUInt16LE(0, 20);
  return Buffer.concat([...locaux, ...centrales, fin]);
}

function echapperXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function lettreColonne(i) {
  let n = i;
  let s = '';
  do {
    s = String.fromCharCode(65 + (n % 26)) + s;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return s;
}

// Nom d'onglet : 31 caractères au plus, sans []:*?/\.
function nomOnglet(titre) {
  const propre = String(titre).replace(/[\[\]:*?/\\]/g, '').trim() || 'Export';
  return propre.slice(0, 31);
}

// colonnes : titres. lignes : tableaux de valeurs, nombres ou
// chaînes. Renvoie le tampon .xlsx.
export function genererXlsx(titre, colonnes, lignes) {
  const onglet = nomOnglet(titre);
  const largeurs = colonnes.map((c, i) => {
    let max = String(c).length;
    for (const l of lignes) max = Math.max(max, String(l[i] ?? '').length);
    return Math.min(40, Math.max(12, max + 2));
  });
  const cols = `<cols>${largeurs
    .map((l, i) => `<col min="${i + 1}" max="${i + 1}" width="${l}" customWidth="1"/>`)
    .join('')}</cols>`;
  const cellule = (valeur, ref, entete) => {
    const style = entete ? ' s="1"' : '';
    if (typeof valeur === 'number' && Number.isFinite(valeur)) {
      return `<c r="${ref}"${style}><v>${valeur}</v></c>`;
    }
    return `<c r="${ref}" t="inlineStr"${style}><is><t>${echapperXml(valeur ?? '')}</t></is></c>`;
  };
  const rangees = [
    `<row r="1">${colonnes.map((c, i) => cellule(c, `${lettreColonne(i)}1`, true)).join('')}</row>`,
    ...lignes.map(
      (l, r) =>
        `<row r="${r + 2}">${l.map((v, i) => cellule(v, `${lettreColonne(i)}${r + 2}`, false)).join('')}</row>`,
    ),
  ].join('');
  const feuille = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"/></sheetViews>${cols}<sheetData>${rangees}</sheetData></worksheet>`;
  const classeur = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${echapperXml(onglet)}" sheetId="1" r:id="rId1"/></sheets></workbook>`;
  const types = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`;
  const rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`;
  const relsClasseur = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`;
  const styles = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="11"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF0B1F3A"/><bgColor indexed="64"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/><xf numFmtId="0" fontId="1" fillId="1" borderId="0" applyFont="1" applyFill="1"/></cellXfs></styleSheet>`;
  return zip([
    ['[Content_Types].xml', Buffer.from(types, 'utf8')],
    ['_rels/.rels', Buffer.from(rels, 'utf8')],
    ['xl/workbook.xml', Buffer.from(classeur, 'utf8')],
    ['xl/_rels/workbook.xml.rels', Buffer.from(relsClasseur, 'utf8')],
    ['xl/worksheets/sheet1.xml', Buffer.from(feuille, 'utf8')],
    ['xl/styles.xml', Buffer.from(styles, 'utf8')],
  ]);
}

// Même contenu en PDF, A4 portrait, en-tête bleu nuit, lignes
// en alternance. Renvoie une promesse du tampon.
export function genererPdfExport(titre, colonnes, lignes) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margins: { top: 40, bottom: 40, left: 36, right: 36 } });
    const tampons = [];
    doc.on('data', (b) => tampons.push(b));
    doc.on('end', () => resolve(Buffer.concat(tampons)));
    doc.on('error', reject);
    const largeurUtile = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const poids = colonnes.map((c, i) => {
      let max = String(c).length;
      for (const l of lignes) max = Math.max(max, String(l[i] ?? '').length);
      return Math.min(40, Math.max(8, max));
    });
    const totalPoids = poids.reduce((s, p) => s + p, 0) || 1;
    const largeurs = poids.map((p) => Math.max(60, (largeurUtile * p) / totalPoids));
    const hauteurLigne = 18;
    const bas = doc.page.height - doc.page.margins.bottom;
    const dessinerEntete = (y) => {
      doc.save().fillColor(NAVY).rect(doc.page.margins.left, y, largeurUtile, hauteurLigne).fill().restore();
      doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(9);
      let x = doc.page.margins.left;
      colonnes.forEach((c, i) => {
        doc.text(String(c), x + 4, y + 5, { width: largeurs[i] - 8, height: 12, ellipsis: true });
        x += largeurs[i];
      });
      doc.fillColor('#000000');
      return y + hauteurLigne;
    };
    doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(16).text(titre, doc.page.margins.left, doc.y);
    const date = new Date().toISOString().slice(0, 10);
    doc.fillColor(MUTED).font('Helvetica').fontSize(9).text(`Export du ${date} · ${lignes.length} ligne${lignes.length > 1 ? 's' : ''}`, doc.page.margins.left, doc.y + 4);
    let y = doc.y + 16;
    y = dessinerEntete(y);
    doc.font('Helvetica').fontSize(9);
    lignes.forEach((l, index) => {
      if (y + hauteurLigne > bas) {
        doc.addPage();
        y = doc.page.margins.top;
        y = dessinerEntete(y);
        doc.font('Helvetica').fontSize(9);
      }
      if (index % 2 === 1) {
        doc.save().fillColor(PAPIER).rect(doc.page.margins.left, y, largeurUtile, hauteurLigne).fill().restore();
      }
      doc.fillColor('#000000');
      let x = doc.page.margins.left;
      l.forEach((v, i) => {
        doc.text(String(v ?? ''), x + 4, y + 5, { width: largeurs[i] - 8, height: 12, ellipsis: true });
        x += largeurs[i];
      });
      y += hauteurLigne;
    });
    doc.end();
  });
}
