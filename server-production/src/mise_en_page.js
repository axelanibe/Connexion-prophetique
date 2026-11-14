// Logique de mise en page du certificat, sans dépendance PDF : testable sans installer pdfkit.
// Fuseau : Côte d'Ivoire (UTC, sans heure d'été).
export const FUSEAU = 'Africa/Abidjan';
export const TAILLE_NOM_MAX = 34;
export const TAILLE_NOM_MIN = 16;

const REGEX_MATRICULE = /^CP-[A-Z]{2}-\d{4,}$/;
const REGEX_NUMERO = /^CERT-\d{6,}$/;

// Une date « AAAA-MM-JJ » est lue à midi UTC pour ne pas basculer de jour selon le fuseau.
export function normaliserDate(valeur) {
  if (valeur instanceof Date && !Number.isNaN(valeur.getTime())) return valeur;
  if (typeof valeur === 'string' && /^\d{4}-\d{2}-\d{2}/.test(valeur)) {
    return new Date(`${valeur.slice(0, 10)}T12:00:00Z`);
  }
  throw erreurDonnees(`Date invalide : ${String(valeur)}`);
}

export function dateFr(valeur) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: FUSEAU,
  }).format(normaliserDate(valeur));
}

// Plus grande taille (entre MIN et MAX) pour laquelle le nom tient dans la largeur voulue.
// mesurer(texte, taille) renvoie la largeur en points, fournie par le moteur PDF.
export function tailleNomAjustee(nom, largeurMax, mesurer) {
  for (let taille = TAILLE_NOM_MAX; taille >= TAILLE_NOM_MIN; taille -= 1) {
    if (mesurer(nom, taille) <= largeurMax) return taille;
  }
  return TAILLE_NOM_MIN;
}

function erreurDonnees(message) {
  const e = new Error(message);
  e.code = 'CERTIFICAT_DONNEES_INVALIDES';
  return e;
}

// Contrôle strict avant toute génération : un certificat ne part jamais avec des données douteuses.
export function validerDonnees(d) {
  if (!d || typeof d !== 'object') throw erreurDonnees('Données absentes.');
  if (!REGEX_NUMERO.test(d.numero ?? '')) throw erreurDonnees('Numéro de certificat invalide.');
  if (!REGEX_MATRICULE.test(d.matricule ?? '')) throw erreurDonnees('Matricule invalide.');
  const nom = String(d.nom_complet ?? '').trim();
  if (nom.length < 2 || nom.length > 120) throw erreurDonnees('Nom invalide.');
  if (typeof d.url !== 'string' || !/^https?:\/\//.test(d.url)) throw erreurDonnees('URL de vérification invalide.');
  const inscrit = normaliserDate(d.inscrit_le);
  const valide = normaliserDate(d.valide_jusqua);
  if (valide < inscrit) throw erreurDonnees('La date de fin précède la date d\'adhésion.');
  return {
    numero: d.numero,
    matricule: d.matricule,
    nom_complet: nom,
    url: d.url,
    inscrit_le: inscrit,
    valide_jusqua: valide,
    emis_le: d.emis_le ? normaliserDate(d.emis_le) : new Date(),
  };
}
