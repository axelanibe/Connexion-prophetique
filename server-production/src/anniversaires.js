// Anniversaires, tranche 5, 4 nov. 2026 : fonctions pures partagées
// par la route d'envoi des courriels, sans base ni envoi.
//
// Le choix du verset est le même que côté application
// (lib/anniversaire.dart) : même liste de 26 références, déjà
// vérifiées présentes en français (Louis Segond) et en anglais
// (King James) dans la Bible embarquée, même hachage FNV-1a 32 bits
// du matricule, même indice (hachage + année) modulo 26. Le verset
// change donc chaque année, garanti, pour chaque membre, et la carte
// dans l'application et le courriel citent la même référence la
// même année. Si la liste change d'un côté, elle doit changer de
// l'autre, sinon carte et courriel divergeraient.
//
// Le courriel ne contient jamais le texte du verset : le serveur ne
// possède pas la Bible, il cite seulement la référence, et le texte
// se lit dans l'application. C'est un choix délibéré, pas un oubli :
// recopier ici 26 textes créerait une deuxième source qui dériverait.
// Le courriel ne contient jamais non plus un âge ni une année de
// naissance, seulement la date d'intégration (inscrit_le).
//
// Un 29 février est fêté le 28 février les années non bissextiles,
// comme la carte dans l'application (isBirthdayToday).

// Mêmes références que kDailyVerses, dans le même ordre :
// [index du livre, chapitre, verset].
export const ANNIVERSAIRE_VERSETS = [
  [0, 1, 1],
  [18, 23, 1],
  [42, 3, 16],
  [39, 6, 33],
  [49, 4, 13],
  [23, 29, 11],
  [22, 41, 10],
  [44, 8, 28],
  [18, 121, 1],
  [19, 3, 5],
  [39, 11, 28],
  [46, 13, 4],
  [0, 28, 15],
  [42, 1, 1],
  [18, 100, 1],
  [18, 1, 1],
  [44, 10, 9],
  [39, 5, 1],
  [22, 40, 31],
  [45, 5, 8],
  [18, 34, 8],
  [18, 37, 5],
  [39, 7, 7],
  [44, 6, 12],
  [18, 119, 105],
  [40, 4, 4],
];

// Noms français des seuls livres utilisés par la liste, vérifiés
// contre la Bible embarquée (ordre canonique des 66 livres).
const NOMS_LIVRES = {
  0: 'Genèse',
  18: 'Psaumes',
  19: 'Proverbes',
  22: 'Ésaïe',
  23: 'Jérémie',
  39: 'Matthieu',
  40: 'Marc',
  42: 'Jean',
  44: 'Romains',
  45: '1 Corinthiens',
  46: '2 Corinthiens',
  49: 'Philippiens',
};

export function anniversaireHash(matricule) {
  const octets = new TextEncoder().encode(String(matricule ?? ''));
  let hash = 0x811c9dc5;
  for (const octet of octets) {
    hash ^= octet;
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

export function anniversaireVersetIndex(matricule, annee) {
  return (anniversaireHash(matricule) + annee) % ANNIVERSAIRE_VERSETS.length;
}

export function anniversaireReference(matricule, annee) {
  const ref = ANNIVERSAIRE_VERSETS[anniversaireVersetIndex(matricule, annee)];
  return `${NOMS_LIVRES[ref[0]]} ${ref[1]}:${ref[2]}`;
}

function estBissextile(annee) {
  return (annee % 4 === 0 && annee % 100 !== 0) || annee % 400 === 0;
}

/// Vrai si la date de naissance (AAAA-MM-JJ) tombe le jour donné
/// (AAAA-MM-JJ), avec la règle du 29 février ci-dessus.
export function estAnniversaireAujourdhui(dateNaissance, jour) {
  if (!dateNaissance || !jour) return false;
  const [aN, mN, jN] = dateNaissance.split('-').map(Number);
  const [aJ, mJ, jJ] = jour.split('-').map(Number);
  if (!aN || !mN || !jN || !aJ || !mJ || !jJ) return false;
  if (mN === 2 && jN === 29 && !estBissextile(aJ)) {
    return mJ === 2 && jJ === 28;
  }
  return mN === mJ && jN === jJ;
}

const MOIS_FR = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
];

/// Date d'intégration en toutes lettres, depuis une date AAAA-MM-JJ.
/// Exemple : 12 mars 2024. Une date invalide donne une chaîne vide,
/// jamais une date inventée.
export function formaterDateIntegration(dateIso) {
  if (!dateIso) return '';
  const [a, m, j] = String(dateIso).split('-').map(Number);
  if (!a || !m || m < 1 || m > 12 || !j) return '';
  return `${j} ${MOIS_FR[m - 1]} ${a}`;
}
