// Plateforme, carte 83, 7 nov. 2026.
//
// Abonnement unique, 100 000 FCFA par an, pour mettre ses
// enseignements sur la plateforme. Une personne choisit la
// fonction « Plateforme » à l'inscription, aucun établissement
// ne lui est proposé. Les enseignements sont gratuits pour les
// membres, y compris les membres gratuits. Un enseignement déjà
// publié reste en ligne même après la fin de la période de
// validité, 12 mois ; pour mettre de nouveaux contenus, il faut
// renouveler, sinon la publication est refusée. Publication en
// deux temps : l'auteur envoie pour validation, rien ne s'affiche
// chez tout le monde tant que la structure n'a pas validé.
// Module pur, sans base : il est testé sans PostgreSQL, et
// server.js l'importe pour les routes /plateforme et
// /admin/plateforme, et pour l'activation à la validation du
// paiement, voir confirmPayment.

export const PLATEFORME_MONTANT_ANNUEL = 100000;
export const PLATEFORME_DUREE_MOIS = 12;

/// Fin d'un abonnement commencé à une date donnée : 12 mois
/// plus tard, même jour du mois, ramené au dernier jour du
/// mois quand ce jour n'existe pas, par exemple 31 janvier
/// plus 12 mois donne 31 janvier l'année suivante.
export function dateFinAbonnement(debut) {
  const d = new Date(debut);
  if (Number.isNaN(d.getTime())) return null;
  const fin = new Date(d.getFullYear(), d.getMonth() + PLATEFORME_DUREE_MOIS, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
  return fin;
}

/// Statut d'un abonnement à un instant donné. Un abonnement
/// actif dont la fin est passée est expiré, jamais actif.
/// Un abonnement en attente de validation du paiement reste
/// en attente, même si une date de fin est déjà renseignée.
export function abonnementStatut(abonnement, maintenant = new Date()) {
  if (!abonnement) return 'Aucun';
  const statut = abonnement.statut;
  if (statut === 'Actif') {
    const fin = abonnement.date_fin ? new Date(abonnement.date_fin) : null;
    if (!fin || Number.isNaN(fin.getTime())) return 'Actif';
    return new Date(maintenant) > fin ? 'Expiré' : 'Actif';
  }
  if (statut === 'En attente' || statut === 'Expiré' || statut === 'Aucun') return statut;
  return 'Aucun';
}

/// Vrai quand l'auteur peut mettre un nouveau contenu en ligne :
/// abonnement actif à cet instant, jamais expiré, jamais en attente.
export function peutPublierPlateforme(abonnement, maintenant = new Date()) {
  return abonnementStatut(abonnement, maintenant) === 'Actif';
}

/// Jours entiers avant la fin, 0 quand la période est finie,
/// jamais négatif. Sert au rappel de renouvellement.
export function joursRestantsAbonnement(abonnement, maintenant = new Date()) {
  if (!abonnement || !abonnement.date_fin) return 0;
  const fin = new Date(abonnement.date_fin);
  if (Number.isNaN(fin.getTime())) return 0;
  const jours = Math.floor((fin.getTime() - new Date(maintenant).getTime()) / 86400000);
  return jours > 0 ? jours : 0;
}

/// Contrôle de forme d'un enseignement Plateforme, avant toute
/// écriture : titre requis, format Audio ou Texte, audio exige
/// un lien audio, texte exige un texte, description 2000
/// caractères maximum. Renvoie la liste des erreurs, vide
/// quand tout est bon.
export function validerCreationEnseignementPlateforme(corps) {
  const erreurs = [];
  const b = corps && typeof corps === 'object' ? corps : {};
  const titre = typeof b.titre === 'string' ? b.titre.trim() : '';
  if (titre.length < 1 || titre.length > 200) erreurs.push('Le titre est requis, 200 caractères maximum.');
  if (b.description !== undefined && b.description !== null) {
    if (typeof b.description !== 'string' || b.description.trim().length > 2000) erreurs.push('La description fait 2000 caractères maximum.');
  }
  const format = typeof b.format === 'string' ? b.format.trim() : 'Audio';
  if (format !== 'Audio' && format !== 'Texte') erreurs.push('Le format est Audio ou Texte.');
  if (format === 'Audio') {
    const lien = typeof b.lien_audio === 'string' ? b.lien_audio.trim() : '';
    if (lien.length < 1 || lien.length > 1000) erreurs.push('Le format Audio exige un lien audio.');
  }
  if (format === 'Texte') {
    const texte = typeof b.texte === 'string' ? b.texte.trim() : '';
    if (texte.length < 1 || texte.length > 10000) erreurs.push('Le format Texte exige un texte, 10 000 caractères maximum.');
  }
  return erreurs;
}

/// Vue membre d'un enseignement Plateforme : seuls les
/// enseignements publiés sont renvoyés aux membres, sans
/// motif de refus, sans statut interne. Un enseignement en
/// attente ou refusé ne sort jamais de cette vue.
export function formaterEnseignementPlateformeMembre(row) {
  if (!row || row.statut !== 'Publié') return null;
  return {
    id: row.id,
    titre: row.titre,
    orateur: row.orateur,
    description: row.description ?? '',
    format: row.format ?? 'Audio',
    lien_audio: row.lien_audio ?? '',
    texte: row.format === 'Texte' ? (row.texte ?? '') : '',
    publie_le: row.publie_le ?? null,
    vues: row.vues ?? 0,
  };
}
