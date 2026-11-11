// Téléphone Côte d'Ivoire avec le 0 et nom complet en deux mots,
// carte 101, 8 nov. 2026 : fonctions pures, testables sans base
// ni serveur, comme src/signature_admin.js ou src/effacement_compte.js.
//
// Constat vérifié dans le code : l'inscription, la modification du
// téléphone (/moi/telephone) et l'import enregistrent déjà le numéro
// tel que tapé, 0 conservé, par displayPhoneServer côté serveur et
// normalizePhone côté application. Le 0 ne se perd plus à l'écriture.
// Il manque encore aux numéros enregistrés avant le correctif du
// 4 nov. 2026, qui passaient par normalizePhoneServer à l'insertion
// : seul le compte CP-AA-2526 avait été réparé, par une migration
// ponctuelle. Le seul autre endroit qui écrivait encore la forme
// sans 0 était le contact du Bureau, lié à l'inscription par
// lierBureauAInscription, qui réutilisait la forme normalisée pour
// écrire bureau_membres.contact : corrigé dans server.js, qui passe
// désormais les deux formes, la forme normalisée pour comparer, la
// forme affichée pour écrire.

// Nom complet en deux mots minimum : découpé sur les espaces, mots
// non vides. Un seul mot, « Axel », ne passe pas ; « Axel Anibe »
// passe. Les comptes déjà inscrits avec un seul nom ne sont ni
// bloqués ni supprimés : la règle vaut pour les nouvelles inscriptions
// et les modifications. Le matricule garde sa règle existante, lettre
// doublée pour un nom en un seul mot.
export function nomCompletDeuxMots(nomComplet) {
  const mots = String(nomComplet ?? '').trim().split(/\s+/).filter(Boolean);
  return mots.length >= 2;
}

// Nom complet en majuscules, carte 125, 10 nov. 2026 : tous les
// noms et prénoms sont en majuscules au moment de l'inscription,
// décision d'Axel. Espaces superflus réduits à un seul, accents
// gardés, « Élodie Martin » devient « ÉLODIE MARTIN ». La
// fonction sert à l'inscription, à l'import et à la correction
// d'un nom ; l'affichage de la carte, dans l'application comme
// en PDF, passe aussi par elle, sans migration de données.
export function nomCompletMajuscules(nomComplet) {
  return String(nomComplet ?? '').trim().replace(/\s+/g, ' ').toUpperCase();
}

// Texte de nom ou de libellé en majuscules, carte 125, 10 nov. 2026 :
// comme nomCompletMajuscules, mais null et undefined passent tels
// quels, pour les champs facultatifs des schémas zod.
export function texteMajuscules(v) {
  return v == null ? v : nomCompletMajuscules(v);
}

// Pays de résidence, carte 127, 10 nov. 2026 : liste fermée, même
// ordre que kPaysResidence côté application. Stocké en majuscules,
// carte 125. Renvoie la forme en majuscules, ou null si le pays
// n'est pas dans la liste ou si la valeur est vide.
export const PAYS_RESIDENCE = [
  'Côte d’Ivoire', 'France', 'Belgique', 'Canada', 'Sénégal',
  'Cameroun', 'Burkina Faso', 'Mali', 'Togo', 'Bénin', 'Guinée',
  'Suisse', 'Autre pays',
];
export function normaliserPaysResidence(v) {
  const t = texteMajuscules(v);
  if (!t) return null;
  return PAYS_RESIDENCE.some((p) => texteMajuscules(p) === t) ? t : null;
}

// Restauration du 0 après +225 pour un numéro ivoirien stocké sans
// 0 : +225 suivi de 9 chiffres commençant par 07, 05 ou 01 sans le
// 0, forme de 13 caractères au total, devient +2250 suivi des mêmes
// 9 chiffres. Renvoie le numéro restauré, ou null si le numéro n'est
// pas concerné : déjà avec le 0, autre pays, ou autre forme.
// Ne devine jamais : un numéro +225 suivi de 9 chiffres qui ne
// commencent ni par 7, ni par 5, ni par 1 n'est pas touché.
export function restaurerZeroIvoirien(telephone) {
  const tel = String(telephone ?? '').trim();
  if (!/^\+225[751][0-9]{8}$/.test(tel)) return null;
  return `+2250${tel.slice(4)}`;
}
