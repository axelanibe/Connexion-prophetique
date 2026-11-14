// Import autonome des membres du Bureau, 3 nov. 2026.
// Objectif : que la structure dépose elle-même une liste Word ou
// PDF dans l'Espace structure, voie l'aperçu, puis valide, sans
// passer par Muse à chaque liste. Aucun appel à une IA, aucun
// service externe, aucune nouvelle dépendance : le Word est un
// ZIP lu avec zlib de Node, le PDF n'est tenté qu'en extraction
// de texte simple, sans OCR. Un PDF dont le texte n'est pas
// extractible est refusé avec un message clair, jamais deviné.
//
// Règles validées par Axel, codées ici et jamais comme cas
// particulier d'une liste :
// - Présidente ou Président des chantres -> Responsable chantre.
// - Présidente ou Président de l'organisation -> Responsable
//   organisation.
// - Les autres titres sont gardés tels quels, car la fonction de
//   bureau_membres est un texte libre, pas la liste des fonctions
//   de membre : Présidente de la cellule ISPAM, Vice-président
//   de l'organisation, Secrétaire et trésorière, Chantre.
// - Un titre inconnu est gardé tel quel dans l'aperçu et signalé
//   comme à vérifier, jamais remplacé par un titre inventé.
// - Un contact vide est accepté pour une entrée de Bureau, et
//   le contact n'est jamais public par défaut (contact_public
//   faux), tant qu'aucun accord explicite n'est saisi.
// - Aucun compte membre, aucune carte, aucun paiement, aucune
//   cotisation n'est créé par cet import.

import zlib from 'node:zlib';

const MAX_LIGNES = 500;
const MAX_OCTETS = 6 * 1024 * 1024;

export function erreurBureauImport(message, statut = 400) {
  const e = new Error(message);
  e.statusCode = statut;
  return e;
}

// Normalisation simple et explicite : casse, accents, féminin
// et masculin ramenés par la règle de correspondance, espaces.
export function normaliserTitre(titre) {
  return String(titre ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/’/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

const TITRES_CONNUS = new Set([
  'presidente de la cellule ispam',
  'president de la cellule ispam',
  'vice-president de l\'organisation',
  'vice-presidente de l\'organisation',
  'secretaire et tresoriere',
  'secretaire et tresorier',
  'secretaire',
  'tresoriere',
  'tresorier',
  'chantre',
]);

// Correspondance exacte, après normalisation. Le préfixe
// "vice-" n'est volontairement pas mappé : Vice-président de
// l'organisation reste tel quel, comme validé.
export function mapperFonctionBureau(titreBrut) {
  const brut = String(titreBrut ?? '').trim();
  const n = normaliserTitre(brut);
  let fonction = brut;
  let mappee = false;
  if (n.startsWith('president') && n.includes('chantre')) {
    fonction = 'Responsable chantre';
    mappee = true;
  } else if (n.startsWith('president') && n.includes('organisation')) {
    fonction = 'Responsable organisation';
    mappee = true;
  }
  const aVerifier = !mappee && !TITRES_CONNUS.has(n);
  return { fonction, mappee, aVerifier };
}

function decoderEntitesXml(texte) {
  return String(texte ?? '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&amp;/g, '&');
}

// Lecture minimale d'un ZIP, suffisante pour un .docx : on lit
// le répertoire central, puis chaque entrée locale. Méthodes
// acceptées : 0 (stockée) et 8 (deflate, via zlib).
function extraireEntreeZip(buf, nomRecherche) {
  // Recherche du répertoire de fin, depuis la fin du fichier.
  let eocd = -1;
  const debut = Math.max(0, buf.length - 65557);
  for (let i = buf.length - 22; i >= debut; i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw erreurBureauImport('Le fichier Word est illisible.');
  const total = buf.readUInt16LE(eocd + 10);
  let offset = buf.readUInt32LE(eocd + 16);
  for (let k = 0; k < total; k++) {
    if (buf.readUInt32LE(offset) !== 0x02014b50) break;
    const methode = buf.readUInt16LE(offset + 10);
    const tailleCompressee = buf.readUInt32LE(offset + 20);
    const nomLong = buf.readUInt16LE(offset + 28);
    const extraLong = buf.readUInt16LE(offset + 30);
    const commentaireLong = buf.readUInt16LE(offset + 32);
    const offsetLocal = buf.readUInt32LE(offset + 42);
    const nom = buf.toString('utf8', offset + 46, offset + 46 + nomLong);
    offset += 46 + nomLong + extraLong + commentaireLong;
    if (nom !== nomRecherche) continue;
    if (buf.readUInt32LE(offsetLocal) !== 0x04034b50) {
      throw erreurBureauImport('Le fichier Word est illisible.');
    }
    const nomLocalLong = buf.readUInt16LE(offsetLocal + 26);
    const extraLocalLong = buf.readUInt16LE(offsetLocal + 28);
    const debutDonnees = offsetLocal + 30 + nomLocalLong + extraLocalLong;
    const compresse = buf.subarray(debutDonnees, debutDonnees + tailleCompressee);
    if (methode === 0) return Buffer.from(compresse);
    if (methode === 8) return zlib.inflateRawSync(compresse);
    throw erreurBureauImport('Le fichier Word utilise une compression non prise en charge.');
  }
  throw erreurBureauImport('Le document Word ne contient pas de texte lisible.');
}

function lignesDepuisTableauxWord(xml) {
  const lignes = [];
  const tableaux = xml.match(/<w:tbl[\s>][\s\S]*?<\/w:tbl>/g) ?? [];
  for (const tableau of tableaux) {
    const rangees = tableau.match(/<w:tr[\s>][\s\S]*?<\/w:tr>/g) ?? [];
    for (const rangee of rangees) {
      const cellules = [];
      const blocs = rangee.match(/<w:tc[\s>][\s\S]*?<\/w:tc>/g) ?? [];
      for (const bloc of blocs) {
        const morceaux = bloc.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) ?? [];
        const texte = morceaux
          .map((m) => m.replace(/<w:t[^>]*>([^<]*)<\/w:t>/, '$1'))
          .join('');
        cellules.push(decoderEntitesXml(texte).trim());
      }
      lignes.push(cellules);
    }
  }
  return lignes;
}

function estEnTete(cellules) {
  const n = cellules.map(normaliserTitre).join(' ');
  return n.includes('nom') && n.includes('fonction');
}

function lignesBrutesDepuisCellules(cellulesParLigne) {
  const brutes = [];
  for (const cellules of cellulesParLigne) {
    if (cellules.every((c) => c === '')) continue;
    if (estEnTete(cellules)) continue;
    let nom = '';
    let fonction = '';
    let contact = '';
    if (cellules.length >= 4) {
      // Format de référence : N°, Nom et prénom, Fonction, Contact.
      [nom, fonction, contact] = [cellules[1], cellules[2], cellules[3]];
    } else if (cellules.length === 3) {
      [nom, fonction, contact] = cellules;
    } else if (cellules.length === 2) {
      [nom, fonction] = cellules;
    } else {
      brutes.push({ nom: '', fonction: '', contact: '', rejet: 'Ligne incomplète.' });
      continue;
    }
    brutes.push({ nom: nom.trim(), fonction: fonction.trim(), contact: contact.trim() });
  }
  return brutes;
}

function extraireDocx(buf) {
  const xml = extraireEntreeZip(buf, 'word/document.xml').toString('utf8');
  const cellules = lignesDepuisTableauxWord(xml);
  if (cellules.length === 0) {
    throw erreurBureauImport('Aucun tableau trouvé dans le document Word.');
  }
  return lignesBrutesDepuisCellules(cellules);
}

// PDF, extraction de texte simple seulement, sans OCR et sans
// nouvelle dépendance. On décompresse les flux, on regroupe les
// chaînes par bloc de texte, et on ne retient que des lignes
// séparées par des tabulations ou au moins deux espaces. Si
// aucune ligne structurée n'en sort, le PDF est refusé avec
// un message clair, au lieu d'inventer des lignes.
function extrairePdf(buf) {
  const textes = [];
  const flux = buf.toString('latin1').match(/stream\r?\n([\s\S]*?)\r?\nendstream/g) ?? [];
  for (const bloc of flux) {
    const contenu = bloc.replace(/^stream\r?\n/, '').replace(/\r?\nendstream$/, '');
    let decompresse;
    try {
      decompresse = zlib.inflateSync(Buffer.from(contenu, 'latin1')).toString('latin1');
    } catch {
      decompresse = contenu;
    }
    const objets = decompresse.match(/BT[\s\S]*?ET/g) ?? [];
    for (const objet of objets) {
      const chaines = objet.match(/\((?:[^()\\]|\\.)*\)/g) ?? [];
      const ligne = chaines
        .map((c) => c.slice(1, -1).replace(/\\([()\\])/g, '$1'))
        .join(' ')
        .trim();
      if (ligne) textes.push(ligne);
    }
  }
  if (textes.length === 0) {
    throw erreurBureauImport('Le PDF ne contient pas de texte extractible. Utilisez le fichier Word .docx.');
  }
  const cellulesParLigne = textes
    .map((ligne) => ligne.split(/\t| {2,}|\|/).map((c) => c.trim()).filter((c) => c !== ''))
    .filter((c) => c.length >= 2);
  const brutes = lignesBrutesDepuisCellules(cellulesParLigne);
  if (brutes.filter((l) => !l.rejet).length === 0) {
    throw erreurBureauImport('Le PDF n’a pas pu être lu ligne par ligne de façon fiable. Utilisez le fichier Word .docx.');
  }
  return brutes;
}

// Lien automatique à l'inscription, 3 nov. 2026 : décision pure,
// testable sans base. L'appelant passe les deux formes du téléphone
// (carte 101, 8 nov. 2026) : telephoneNormalise, sans 0, pour
// comparer, et telephone, forme affichée avec le 0, pour écrire le
// contact du Bureau une fois le lien décidé ; l'e-mail passe en
// minuscules. Cette fonction ne fait que comparer. Règles strictes :
// - nom complet normalisé exactement égal, accents et casse
//   ignorés, espaces repliés ;
// - les prénoms seuls ne sont jamais liés, ni côté entrée ni
//   côté inscription ;
// - si l'entrée a un contact, il doit correspondre au téléphone
//   normalisé ou à l'e-mail de l'inscription, sinon pas de lien ;
// - sans contact sur l'entrée, le nom complet exact suffit.
// La fonction ne touche jamais à la fonction du membre : le
// lien ne fait que remplir bureau_membres.membre_id.
export function deciderLienBureau(entree, inscription) {
  const nomInscription = normaliserTitre(inscription.nomComplet ?? '');
  if (nomInscription.split(' ').filter(Boolean).length < 2) {
    return { lier: false, motif: 'Prénom seul, jamais lié.' };
  }
  const nomEntree = normaliserTitre(entree.nom ?? '');
  if (nomEntree.split(' ').filter(Boolean).length < 2) {
    return { lier: false, motif: 'Entrée à prénom seul, jamais liée.' };
  }
  if (nomEntree !== nomInscription) {
    return { lier: false, motif: 'Nom différent.' };
  }
  const contact = (entree.contactNormalise ?? '').trim();
  if (contact) {
    const contactCompare = contact.includes('@') ? contact.toLowerCase() : contact;
    const emailCompare = (inscription.emailNormalise ?? '').trim().toLowerCase();
    const telephoneCompare = (inscription.telephoneNormalise ?? '').trim();
    if (contactCompare !== emailCompare && contactCompare !== telephoneCompare) {
      return { lier: false, motif: 'Contact différent.' };
    }
  }
  return { lier: true, motif: '' };
}

// Analyse d'un fichier, sans création : c'est l'aperçu que la
// structure valide ensuite. Les lignes rejetées gardent leur
// motif, pour que rien ne disparaisse en silence.
export function analyserBureauImport(buf, nomFichier = '') {
  if (!buf || buf.length === 0) throw erreurBureauImport('Fichier vide.');
  if (buf.length > MAX_OCTETS) throw erreurBureauImport('Fichier trop volumineux (6 Mo maximum).', 413);
  const estDocx = buf[0] === 0x50 && buf[1] === 0x4b;
  const estPdf = buf.subarray(0, 5).toString('latin1') === '%PDF-';
  if (!estDocx && !estPdf) {
    throw erreurBureauImport('Format non reconnu. Utilisez un fichier Word .docx ou un PDF texte.', 415);
  }
  const brutes = estDocx ? extraireDocx(buf) : extrairePdf(buf);
  if (brutes.length > MAX_LIGNES) throw erreurBureauImport('Le fichier dépasse 500 lignes.');
  const lignes = [];
  const rejetees = [];
  brutes.forEach((brute, index) => {
    const numero = index + 1;
    if (brute.rejet) {
      rejetees.push({ ligne: numero, nom: brute.nom, motif: brute.rejet });
      return;
    }
    if (brute.nom.length < 1 || brute.nom.length > 200) {
      rejetees.push({ ligne: numero, nom: brute.nom, motif: 'Nom manquant ou trop long.' });
      return;
    }
    if (brute.fonction.length < 1 || brute.fonction.length > 200) {
      rejetees.push({ ligne: numero, nom: brute.nom, motif: 'Fonction manquante ou trop longue.' });
      return;
    }
    if (brute.contact.length > 200) {
      rejetees.push({ ligne: numero, nom: brute.nom, motif: 'Contact trop long.' });
      return;
    }
    const mappee = mapperFonctionBureau(brute.fonction);
    lignes.push({
      ligne: numero,
      nom: brute.nom,
      fonction_brute: brute.fonction,
      fonction: mappee.fonction,
      contact: brute.contact,
      a_verifier: mappee.aVerifier,
    });
  });
  return { format: estDocx ? 'docx' : 'pdf', nom_fichier: nomFichier, lignes, rejetees };
}
