// Défis de prière de 7 jours en groupe, 21 nov. 2026,
// tranches 1 à 3 de l'audit du 17 nov. : un défi dure 7 jours
// à partir de sa date de début, la structure comme un membre
// peut en créer un, chaque participant coche chaque jour fait,
// progression x/7. Le rappel matinal est local, côté
// application, jamais envoyé par le serveur.
//
// Ce module ne contient que des constantes et des aides pures,
// sans accès base, pour être testé sans serveur ni base, comme
// src/chaine_priere.js. Les routes vivent dans server.js.

/// Nombre de jours d'un défi.
export const NB_JOURS_DEFI = 7;

/// Premier et dernier jour cochable d'un défi.
export const JOUR_MIN = 1;
export const JOUR_MAX = NB_JOURS_DEFI;

/// Longueurs maximales des champs saisis.
export const LONGUEUR_MAX_TITRE_DEFI = 120;
export const LONGUEUR_MAX_DESCRIPTION_DEFI = 500;

/// Vrai quand la valeur est un jour de défi valide, 1 à 7.
export function jourDefiValide(jour) {
  return Number.isInteger(jour) && jour >= JOUR_MIN && jour <= JOUR_MAX;
}

/// Jour normalisé depuis le corps de la requête : l'entier
/// quand il est valide, null sinon. Une chaîne de chiffres est
/// acceptée, comme l'envoie un formulaire.
export function normaliserJourDefi(valeur) {
  if (typeof valeur === 'string' && valeur.trim() !== '') {
    const nombre = Number(valeur);
    return Number.isInteger(nombre) ? nombre : null;
  }
  return Number.isInteger(valeur) ? valeur : null;
}

/// Vrai quand la chaîne est une date AAAA-MM-JJ réelle.
export function dateDefiValide(valeur) {
  if (typeof valeur !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(valeur)) return false;
  const date = new Date(`${valeur}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === valeur;
}

/// Date de fin d'un défi, 6 jours après son début, en
/// AAAA-MM-JJ. Les comparaisons de dates restent lexicales,
/// le format AAAA-MM-JJ les rend chronologiques.
export function dateFinDefi(dateDebut) {
  const date = new Date(`${dateDebut}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + NB_JOURS_DEFI - 1);
  return date.toISOString().slice(0, 10);
}

/// Numéro du jour en cours dans le défi, 1 à 7, ou null quand
/// aujourd'hui est hors de la fenêtre du défi.
export function jourCourantDefi(dateDebut, aujourdHui) {
  if (!dateDefiValide(dateDebut) || !dateDefiValide(aujourdHui)) return null;
  const debut = new Date(`${dateDebut}T00:00:00Z`).getTime();
  const jour = new Date(`${aujourdHui}T00:00:00Z`).getTime();
  const ecart = Math.round((jour - debut) / 86400000);
  if (ecart < 0 || ecart >= NB_JOURS_DEFI) return null;
  return ecart + 1;
}

/// Refus de création, null quand tout est bon. Le titre est
/// obligatoire, la description facultative, la date de début
/// est une date AAAA-MM-JJ réelle, jamais dans le passé lointain :
/// une date passée de plus de 7 jours est refusée, une date
/// passée de moins de 7 jours reste acceptée pour un défi déjà
/// commencé. aujourdHui est injecté pour les tests.
export function validerDefi({ titre, description, date_debut }, aujourdHui = new Date().toISOString().slice(0, 10)) {
  if (typeof titre !== 'string' || titre.trim() === '') return { statut: 400, message: 'Le titre du défi est obligatoire.' };
  if (titre.trim().length > LONGUEUR_MAX_TITRE_DEFI) return { statut: 400, message: 'Le titre du défi est trop long.' };
  if (description != null && typeof description !== 'string') return { statut: 400, message: 'La description du défi est invalide.' };
  if (typeof description === 'string' && description.length > LONGUEUR_MAX_DESCRIPTION_DEFI) return { statut: 400, message: 'La description du défi est trop longue.' };
  if (!dateDefiValide(date_debut)) return { statut: 400, message: 'La date de début du défi est invalide.' };
  // Une date dont la fenêtre de 7 jours est déjà passée est
  // refusée, une date passée de moins de 7 jours reste
  // acceptée pour un défi déjà commencé.
  if (dateFinDefi(date_debut) < aujourdHui) return { statut: 400, message: 'La date de début du défi est passée.' };
  return null;
}

/// Refus de coche d'un jour, null quand tout est bon.
export function validerJourDefi({ jour }) {
  const j = normaliserJourDefi(jour);
  if (j == null || !jourDefiValide(j)) return { statut: 400, message: 'Jour invalide : un nombre de 1 à 7.' };
  return null;
}

/// Jours validés dédupliqués et triés, 1 à 7 seulement.
export function joursValidesUniques(jours) {
  const vus = new Set();
  for (const j of jours ?? []) {
    if (jourDefiValide(j)) vus.add(j);
  }
  return [...vus].sort((a, b) => a - b);
}

/// Nombre de jours cochés, pour la progression x/7.
export function compterJoursValides(jours) {
  return joursValidesUniques(jours).length;
}

/// Forme publique d'un défi : titre, description, dates,
/// nombre de participants et ma participation seulement, jamais
/// la liste des autres participants.
export function formaterDefiPublic(ligne, mesJours = null) {
  const jours = mesJours == null ? null : joursValidesUniques(mesJours);
  return {
    id: ligne.id,
    titre: ligne.titre,
    description: ligne.description ?? '',
    date_debut: ligne.date_debut instanceof Date ? ligne.date_debut.toISOString().slice(0, 10) : String(ligne.date_debut ?? '').slice(0, 10),
    date_fin: dateDefiValide(String(ligne.date_debut ?? '').slice(0, 10)) ? dateFinDefi(String(ligne.date_debut).slice(0, 10)) : null,
    participants: Number(ligne.participants ?? 0),
    inscrit: jours != null,
    jours_valides: jours ?? [],
    progression: jours == null ? null : compterJoursValides(jours),
  };
}
