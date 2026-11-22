// Chaîne de prière en direct, 21 nov. 2026, tranche 1,
// décision d'Axel : 24 créneaux d'une heure, un membre par
// créneau, un créneau par membre et par jour. La chaîne est
// celle du jour courant côté serveur (CURRENT_DATE, même
// convention que les rapports et les cotisations). Le prénom
// affiché est le premier mot du nom complet en base, jamais
// inventé, comme pour les stories et les témoignages.
//
// Ce module ne contient que des constantes et des aides pures,
// sans accès base, pour être testé sans serveur ni base, comme
// src/stories.js et src/temoignages.js. Les routes vivent dans
// server.js.

/// Nombre de créneaux dans une journée, un par heure.
export const NB_CRENEAUX = 24;

/// Première et dernière heure d'un créneau.
export const HEURE_MIN = 0;
export const HEURE_MAX = 23;

/// Vrai quand l'heure est un créneau valide, 0 à 23.
export function heureValide(heure) {
  return Number.isInteger(heure) && heure >= HEURE_MIN && heure <= HEURE_MAX;
}

/// Heure normalisée depuis le corps de la requête : l'entier
/// quand il est valide, null sinon. Une chaîne de chiffres est
/// acceptée, comme l'envoie un formulaire.
export function normaliserHeure(valeur) {
  if (typeof valeur === 'string' && valeur.trim() !== '') {
    const nombre = Number(valeur);
    return Number.isInteger(nombre) ? nombre : null;
  }
  return Number.isInteger(valeur) ? valeur : null;
}

/// Vrai quand la chaîne est un jour AAAA-MM-JJ réel, par
/// exemple 2026-11-21. Le mois et le jour doivent exister,
/// 2026-02-30 est refusé.
export function jourValide(jour) {
  if (typeof jour !== 'string') return false;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(jour);
  if (!m) return false;
  const annee = Number(m[1]);
  const mois = Number(m[2]);
  const quantieme = Number(m[3]);
  if (mois < 1 || mois > 12 || quantieme < 1 || quantieme > 31) return false;
  const d = new Date(Date.UTC(annee, mois - 1, quantieme));
  return (
    d.getUTCFullYear() === annee &&
    d.getUTCMonth() === mois - 1 &&
    d.getUTCDate() === quantieme
  );
}

/// Jour normalisé depuis la demande : la chaîne quand elle
/// est un jour AAAA-MM-JJ réel, null sinon. Une chaîne vide
/// vaut absence, comme pour l'heure.
export function normaliserJour(valeur) {
  if (typeof valeur !== 'string' || valeur.trim() === '') return null;
  return jourValide(valeur) ? valeur : null;
}

/// Vrai quand le jour demandé est avant le jour de référence,
/// les deux en AAAA-MM-JJ : la comparaison de chaînes suffit.
/// Un jour passé est en lecture seule, on ne peut ni
/// réserver ni libérer dessus.
export function jourPasse(jour, aujourdHui) {
  return jour < aujourdHui;
}

/// Refus d'engagement, null quand tout est bon. La prise du
/// créneau et le créneau déjà pris par le membre sont vérifiés
/// par l'appelant en base, jamais ici. Le jour, quand il est
/// fourni, doit être un jour AAAA-MM-JJ réel.
export function validerEngagement({ heure, jour }) {
  const h = normaliserHeure(heure);
  if (h == null || !heureValide(h)) return { statut: 400, message: 'Créneau invalide : une heure de 0 à 23.' };
  if (jour != null && jour !== '' && normaliserJour(jour) == null) {
    return { statut: 400, message: 'Jour invalide : un jour AAAA-MM-JJ.' };
  }
  return null;
}

/// Prénom depuis le nom complet en base : le premier mot,
/// vide quand le nom est vide. Même règle que le prénom
/// d'auteur des stories et des témoignages.
export function prenomDepuisNomComplet(nomComplet) {
  if (typeof nomComplet !== 'string') return '';
  const propre = nomComplet.trim();
  if (propre === '') return '';
  return propre.split(/\s+/)[0];
}

/// Forme publique d'un créneau pris : l'heure, l'identifiant
/// du membre et son prénom seulement, jamais son nom complet
/// ni son matricule.
export function formaterCreneauPublic(ligne) {
  return {
    heure: ligne.heure,
    membre_id: ligne.membre_id ?? null,
    prenom: prenomDepuisNomComplet(ligne.nom_complet ?? ligne.prenom ?? ''),
  };
}

/// Chaîne complète du jour : les 24 créneaux, de 0 h à 23 h,
/// dans l'ordre. Un créneau libre a membre_id null et un
/// prénom vide, un créneau pris porte le membre en base.
export function chaineComplete(lignes) {
  const parHeure = new Map();
  for (const ligne of lignes ?? []) {
    if (heureValide(ligne.heure) && !parHeure.has(ligne.heure)) {
      parHeure.set(ligne.heure, formaterCreneauPublic(ligne));
    }
  }
  const creneaux = [];
  for (let heure = HEURE_MIN; heure <= HEURE_MAX; heure += 1) {
    creneaux.push(parHeure.get(heure) ?? { heure, membre_id: null, prenom: '' });
  }
  return creneaux;
}

/// Nombre d'heures couvertes sur 24, pour l'en-tête.
export function compterCouverts(creneaux) {
  return (creneaux ?? []).filter((c) => c.membre_id != null).length;
}
