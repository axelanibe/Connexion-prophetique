// Programme du camp et planification des cellules, 21 nov. 2026.
//
// Le chronogramme n'existait nulle part dans le code : un camp
// n'avait que nom, dates, lieu et tarif. Le modèle vient du Word
// fourni par Axel, « Copie_de_CHRONOGRAMME_CAMP_CONNEXION_
// PROPHETIQUE.docx » : dimanche à samedi, 5 h à 23 h, 14 plages,
// 76 créneaux. Le Word sert de modèle seulement : la structure
// saisit le programme jour par jour dans l'application, et peut
// appliquer le modèle d'un geste sur la semaine d'un camp, sans
// jamais importer le fichier Word tel quel, trop fragile.
//
// Une cellule a un dirigeant, un jour et une heure fixes, des
// personnes assignées par rôle. La répétition est hebdomadaire
// automatique, modifiable semaine par semaine par une exception
// (annulation, autre heure, autre lieu).
//
// Ce module ne contient que des constantes et des aides pures,
// sans accès base, pour être testé sans serveur ni base, comme
// src/chaine_priere.js. Les routes vivent dans server.js.
import { jourValide, normaliserJour } from './chaine_priere.js';

/// Jours de la semaine, 0 = dimanche, même convention que le
/// modèle Word, dimanche à samedi.
export const JOURS_SEMAINE = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
];

/// Libellé d'un jour de semaine, 0 = dimanche, vide sinon.
export function libelleJourSemaine(jour) {
  return Number.isInteger(jour) && jour >= 0 && jour <= 6
    ? JOURS_SEMAINE[jour]
    : '';
}

/// Rôles d'une personne assignée à une cellule.
export const ROLES_CELLULE = [
  'Dirigeant',
  'Louange',
  'Prédication',
  'Accueil',
  'Intercession',
];

/// Vrai quand le rôle est un rôle de cellule connu.
export function roleCelluleValide(role) {
  return typeof role === 'string' && ROLES_CELLULE.includes(role);
}

/// Types de créneaux du modèle Word, proposés dans le
/// formulaire de saisie, jamais imposés : le type saisi reste
/// un texte libre côté serveur.
export const TYPES_CRENEAU_MODELE = [
  'Culte',
  'Enseignement',
  'Atelier',
  'Évangélisation',
  'Prière',
  'Repas',
  'Repos',
  'Partage',
  'Vie quotidienne',
  'Activité',
];

/// Vrai quand l'heure est HH:MM, 00:00 à 23:59.
export function heureValide(heure) {
  return (
    typeof heure === 'string' && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(heure)
  );
}

/// Heure normalisée depuis la demande : la chaîne rognée quand
/// elle est HH:MM, null sinon.
export function normaliserHeure(heure) {
  if (typeof heure !== 'string') return null;
  const propre = heure.trim();
  return heureValide(propre) ? propre : null;
}

/// Vrai quand le jour de semaine est un entier 0 à 6.
export function jourSemaineValide(jour) {
  return Number.isInteger(jour) && jour >= 0 && jour <= 6;
}

/// Modèle du Word, un créneau par ligne : jourSemaine 0 =
/// dimanche, heures de début et de fin, titre tel que dans le
/// Word, type proposé. Les cases vides du Word, dimanche matin
/// n'ont pas de créneau. 76 créneaux au total.
export const MODELE_CHRONOGRAMME = [
  // Réveil, présence, ménage, petit-déjeuner : lundi à vendredi.
  ...[1, 2, 3, 4, 5].flatMap((j) => [
    { jourSemaine: j, debut: '05:00', fin: '05:30', titre: 'Réveil matinal', type: 'Prière' },
    { jourSemaine: j, debut: '05:30', fin: '06:30', titre: 'Dans sa présence', type: 'Prière' },
    { jourSemaine: j, debut: '06:30', fin: '07:30', titre: 'Ménage + toilette', type: 'Vie quotidienne' },
    { jourSemaine: j, debut: '07:30', fin: '08:00', titre: 'Petit-déjeuner', type: 'Repas' },
  ]),
  // Enseignements du matin, numérotés 1, 3, 5, 7, 9.
  { jourSemaine: 1, debut: '08:00', fin: '10:30', titre: 'Enseignement 1', type: 'Enseignement' },
  { jourSemaine: 2, debut: '08:00', fin: '10:30', titre: 'Enseignement 3', type: 'Enseignement' },
  { jourSemaine: 3, debut: '08:00', fin: '10:30', titre: 'Enseignement 5', type: 'Enseignement' },
  { jourSemaine: 4, debut: '08:00', fin: '10:30', titre: 'Enseignement 7', type: 'Enseignement' },
  { jourSemaine: 5, debut: '08:00', fin: '10:30', titre: 'Enseignement 9', type: 'Enseignement' },
  // Ateliers, évangélisation, journée sportive du samedi.
  { jourSemaine: 1, debut: '10:30', fin: '12:15', titre: 'Atelier 1', type: 'Atelier' },
  { jourSemaine: 2, debut: '10:30', fin: '12:15', titre: 'Atelier 2', type: 'Atelier' },
  { jourSemaine: 3, debut: '10:30', fin: '12:15', titre: 'Atelier 3', type: 'Atelier' },
  { jourSemaine: 4, debut: '10:30', fin: '12:15', titre: 'Atelier 4', type: 'Atelier' },
  { jourSemaine: 5, debut: '10:30', fin: '12:15', titre: 'Évangélisation', type: 'Évangélisation' },
  { jourSemaine: 6, debut: '10:30', fin: '12:15', titre: 'Journée sportive', type: 'Activité' },
  // À cœur ouvert, repas de midi.
  { jourSemaine: 1, debut: '12:15', fin: '12:30', titre: 'À cœur ouvert', type: 'Partage' },
  { jourSemaine: 2, debut: '12:15', fin: '12:30', titre: 'À cœur ouvert', type: 'Partage' },
  { jourSemaine: 3, debut: '12:15', fin: '12:30', titre: 'Repas', type: 'Repas' },
  { jourSemaine: 4, debut: '12:15', fin: '12:30', titre: 'À cœur ouvert', type: 'Partage' },
  { jourSemaine: 5, debut: '12:15', fin: '12:30', titre: 'Repas', type: 'Repas' },
  // Repos, lundi à vendredi.
  ...[1, 2, 3, 4, 5].map((j) => (
    { jourSemaine: j, debut: '12:30', fin: '14:00', titre: 'Repos', type: 'Repos' }
  )),
  // Après-midi : rassemblement du dimanche, enseignements 2, 4,
  // 6, 8, sortie du vendredi.
  { jourSemaine: 0, debut: '14:00', fin: '16:00', titre: 'Rassemblement', type: 'Activité' },
  { jourSemaine: 1, debut: '14:00', fin: '16:00', titre: 'Enseignement 2', type: 'Enseignement' },
  { jourSemaine: 2, debut: '14:00', fin: '16:00', titre: 'Enseignement 4', type: 'Enseignement' },
  { jourSemaine: 3, debut: '14:00', fin: '16:00', titre: 'Enseignement 6', type: 'Enseignement' },
  { jourSemaine: 4, debut: '14:00', fin: '16:00', titre: 'Enseignement 8', type: 'Enseignement' },
  { jourSemaine: 5, debut: '14:00', fin: '16:00', titre: 'Sortie', type: 'Activité' },
  // Fin d'après-midi : départ du dimanche, éco-évangile,
  // évangélisation, jeux biblique.
  { jourSemaine: 0, debut: '16:00', fin: '17:00', titre: 'Départ', type: 'Activité' },
  { jourSemaine: 1, debut: '16:00', fin: '17:00', titre: 'Éco-Évangile', type: 'Évangélisation' },
  { jourSemaine: 2, debut: '16:00', fin: '17:00', titre: 'Évangélisation', type: 'Évangélisation' },
  { jourSemaine: 3, debut: '16:00', fin: '17:00', titre: 'Éco-Évangile', type: 'Évangélisation' },
  { jourSemaine: 4, debut: '16:00', fin: '17:00', titre: 'Évangélisation', type: 'Évangélisation' },
  { jourSemaine: 5, debut: '16:00', fin: '17:00', titre: 'Jeux biblique', type: 'Activité' },
  // Toilette du soir, rupture les mardi et jeudi.
  { jourSemaine: 0, debut: '17:00', fin: '18:00', titre: 'Toilette', type: 'Vie quotidienne' },
  { jourSemaine: 1, debut: '17:00', fin: '18:00', titre: 'Toilette', type: 'Vie quotidienne' },
  { jourSemaine: 2, debut: '17:00', fin: '18:00', titre: 'Rupture + toilette', type: 'Vie quotidienne' },
  { jourSemaine: 3, debut: '17:00', fin: '18:00', titre: 'Toilette', type: 'Vie quotidienne' },
  { jourSemaine: 4, debut: '17:00', fin: '18:00', titre: 'Rupture + toilette', type: 'Vie quotidienne' },
  { jourSemaine: 5, debut: '17:00', fin: '18:00', titre: 'Toilette', type: 'Vie quotidienne' },
  // Réfectoire, dimanche à samedi.
  ...[0, 1, 2, 3, 4, 5, 6].map((j) => (
    { jourSemaine: j, debut: '18:00', fin: '19:30', titre: 'Réfectoire', type: 'Repas' }
  )),
  // Soirées : culte d'ouverture, édification, veillée.
  { jourSemaine: 0, debut: '19:45', fin: '22:45', titre: "Culte d'ouverture", type: 'Culte' },
  { jourSemaine: 1, debut: '19:45', fin: '22:45', titre: "Soirée d'édification", type: 'Culte' },
  { jourSemaine: 2, debut: '19:45', fin: '22:45', titre: "Soirée d'édification", type: 'Culte' },
  { jourSemaine: 3, debut: '19:45', fin: '22:45', titre: "Soirée d'édification", type: 'Culte' },
  { jourSemaine: 4, debut: '19:45', fin: '22:45', titre: "Soirée d'édification", type: 'Culte' },
  { jourSemaine: 5, debut: '19:45', fin: '22:45', titre: 'Mise en place pour la veillée', type: 'Culte' },
  // Extinction des lumières, lundi à jeudi.
  ...[1, 2, 3, 4].map((j) => (
    { jourSemaine: j, debut: '22:50', fin: '23:00', titre: 'Extinction des lumières', type: 'Vie quotidienne' }
  )),
];

/// Jour AAAA-MM-JJ, décalé de jours depuis un jour de
/// référence, en UTC pour ne jamais dépendre du fuseau.
function jourDecale(jour, decalage) {
  const d = new Date(`${jour}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + decalage);
  return d.toISOString().slice(0, 10);
}

/// Modèle appliqué à une semaine : le dimanche donné devient
/// le dimanche du modèle, chaque créneau prend sa date.
/// Le dimanche doit être un jour AAAA-MM-JJ réel et un
/// dimanche, sinon la liste est vide.
export function appliquerModeleChronogramme(dimanche) {
  if (!jourValide(dimanche)) return [];
  if (new Date(`${dimanche}T00:00:00Z`).getUTCDay() !== 0) return [];
  return MODELE_CHRONOGRAMME.map((c) => ({
    jour: jourDecale(dimanche, c.jourSemaine),
    heure_debut: c.debut,
    heure_fin: c.fin,
    titre: c.titre,
    type: c.type,
  }));
}

/// Dimanche de la semaine d'un jour, en AAAA-MM-JJ.
export function dimancheDeLaSemaine(jour) {
  if (!jourValide(jour)) return null;
  const decalage = new Date(`${jour}T00:00:00Z`).getUTCDay();
  return jourDecale(jour, -decalage);
}

/// Lundi de la semaine d'un jour, en AAAA-MM-JJ.
export function lundiDeLaSemaine(jour) {
  if (!jourValide(jour)) return null;
  const d = new Date(`${jour}T00:00:00Z`);
  const decalage = (d.getUTCDay() + 6) % 7;
  return jourDecale(jour, -decalage);
}

/// Refus d'une entrée de chronogramme, null quand tout est
/// bon. Le jour doit être réel, la fin après le début, le
/// titre non vide, le lieu et le type courts quand fournis.
export function validerEntreeChronogramme(entree) {
  const e = entree ?? {};
  if (normaliserJour(e.jour) == null) {
    return { statut: 400, message: 'Jour invalide : un jour AAAA-MM-JJ.' };
  }
  const debut = normaliserHeure(e.heure_debut);
  if (debut == null) {
    return { statut: 400, message: 'Heure de début invalide : une heure HH:MM.' };
  }
  const fin = normaliserHeure(e.heure_fin);
  if (fin == null) {
    return { statut: 400, message: 'Heure de fin invalide : une heure HH:MM.' };
  }
  if (debut >= fin) {
    return { statut: 400, message: 'La fin doit être après le début.' };
  }
  if (typeof e.titre !== 'string' || e.titre.trim() === '' || e.titre.trim().length > 200) {
    return { statut: 400, message: 'Titre invalide : un titre de 1 à 200 caractères.' };
  }
  if (e.lieu != null && e.lieu !== '' && (typeof e.lieu !== 'string' || e.lieu.trim().length > 200)) {
    return { statut: 400, message: 'Lieu invalide : 200 caractères au plus.' };
  }
  if (e.type != null && e.type !== '' && (typeof e.type !== 'string' || e.type.trim().length > 80)) {
    return { statut: 400, message: 'Type invalide : 80 caractères au plus.' };
  }
  return null;
}

/// Refus d'une cellule, null quand tout est bon.
export function validerCellule(cellule) {
  const c = cellule ?? {};
  if (typeof c.nom !== 'string' || c.nom.trim() === '' || c.nom.trim().length > 200) {
    return { statut: 400, message: 'Nom invalide : un nom de 1 à 200 caractères.' };
  }
  const jour = typeof c.jour_semaine === 'string' && c.jour_semaine.trim() !== ''
    ? Number(c.jour_semaine)
    : c.jour_semaine;
  if (!jourSemaineValide(jour)) {
    return { statut: 400, message: 'Jour invalide : un jour de semaine, 0 pour dimanche, 6 pour samedi.' };
  }
  if (normaliserHeure(c.heure) == null) {
    return { statut: 400, message: 'Heure invalide : une heure HH:MM.' };
  }
  if (c.lieu != null && c.lieu !== '' && (typeof c.lieu !== 'string' || c.lieu.trim().length > 200)) {
    return { statut: 400, message: 'Lieu invalide : 200 caractères au plus.' };
  }
  return null;
}

/// Refus d'une assignation, null quand tout est bon.
export function validerAssignation(assignation) {
  const a = assignation ?? {};
  if (!roleCelluleValide(a.role)) {
    return { statut: 400, message: 'Rôle invalide : Dirigeant, Louange, Prédication, Accueil ou Intercession.' };
  }
  return null;
}

/// Refus d'une exception de semaine, null quand tout est bon.
/// La semaine est le lundi de la semaine, un jour AAAA-MM-JJ
/// réel et un lundi.
export function validerException(exception) {
  const x = exception ?? {};
  if (normaliserJour(x.semaine) == null) {
    return { statut: 400, message: 'Semaine invalide : un jour AAAA-MM-JJ.' };
  }
  if (new Date(`${x.semaine}T00:00:00Z`).getUTCDay() !== 1) {
    return { statut: 400, message: 'Semaine invalide : le lundi de la semaine.' };
  }
  if (x.annulee != null && typeof x.annulee !== 'boolean') {
    return { statut: 400, message: 'Annulation invalide : vrai ou faux.' };
  }
  if (x.heure != null && x.heure !== '' && normaliserHeure(x.heure) == null) {
    return { statut: 400, message: 'Heure invalide : une heure HH:MM.' };
  }
  if (x.lieu != null && x.lieu !== '' && (typeof x.lieu !== 'string' || x.lieu.trim().length > 200)) {
    return { statut: 400, message: 'Lieu invalide : 200 caractères au plus.' };
  }
  if (x.note != null && x.note !== '' && (typeof x.note !== 'string' || x.note.trim().length > 500)) {
    return { statut: 400, message: 'Note invalide : 500 caractères au plus.' };
  }
  return null;
}

/// Prochaine date d'une cellule, jour de semaine fixe, à
/// partir d'un jour de référence inclus, en AAAA-MM-JJ.
export function prochaineOccurrence(jourSemaine, depuis) {
  if (!jourSemaineValide(jourSemaine) || !jourValide(depuis)) return null;
  const ref = new Date(`${depuis}T00:00:00Z`).getUTCDay();
  const decalage = (jourSemaine - ref + 7) % 7;
  return jourDecale(depuis, decalage);
}

/// Occurrence d'une semaine, avec l'exception appliquée :
/// annulée, ou heure et lieu remplacés. Sans exception,
/// l'occurrence reprend l'heure et le lieu de la cellule.
export function appliquerExceptionCellule(occurrence, exception) {
  const base = {
    date: occurrence.date,
    heure: occurrence.heure,
    lieu: occurrence.lieu ?? '',
    annulee: false,
    note: '',
  };
  if (exception == null) return base;
  if (exception.annulee === true) {
    return { ...base, annulee: true, note: exception.note ?? '' };
  }
  return {
    ...base,
    heure: exception.heure ?? base.heure,
    lieu: exception.lieu ?? base.lieu,
    note: exception.note ?? '',
  };
}
