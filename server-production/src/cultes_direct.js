// Culte en direct et replay chapitré, 21 nov. 2026,
// tranches 4 et 5 de l'audit du 17 nov. : la structure publie
// un culte avec le lien du direct et, quand il existe, celui
// du replay, puis découpe le replay en chapitres. Le membre
// voit le culte en direct ou programmé sur l'accueil, ouvre
// le flux fourni par la structure, et reprend un replay à
// partir d'un chapitre.
//
// Aucun fournisseur de diffusion n'est imposé ici, ni
// YouTube, ni Facebook, ni autre : la structure fournit les
// URL, le choix du fournisseur reste à trancher par Axel.
// Aucun culte, aucune date, aucun chapitre n'est inventé : un
// culte sans chapitre n'en montre aucun, un replay sans lien
// n'a pas de bouton de lecture. À ne pas confondre avec les
// cultes présentiels, événements de type 'culte' avec présence
// du membre : ceux-là vivent ailleurs et ne changent pas, ces
// tables et ces routes portent donc le nom cultes-direct.
//
// Ce module ne contient que des constantes et des aides pures,
// sans accès base, pour être testé sans serveur ni base, comme
// src/chaine_priere.js et src/defis_priere.js. Les routes
// vivent dans server.js.

/// Statuts d'un culte en direct, dans l'ordre de sa vie.
export const STATUTS_CULTE_DIRECT = ['à venir', 'en direct', 'terminé'];

/// Longueurs maximales des champs saisis.
export const LONGUEUR_MAX_TITRE_CULTE = 120;
export const LONGUEUR_MAX_URL_CULTE = 2000;
export const LONGUEUR_MAX_TITRE_CHAPITRE = 120;

/// Vrai quand la chaîne est une date AAAA-MM-JJ réelle.
export function dateCulteValide(valeur) {
  if (typeof valeur !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(valeur)) return false;
  const date = new Date(`${valeur}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === valeur;
}

/// Vrai quand le lien est vide, pas de flux, ou une URL http
/// ou https. Un lien non http est refusé : il ne s'ouvrirait
/// pas dans le navigateur du membre.
export function urlCulteValide(valeur) {
  if (valeur == null || valeur === '') return true;
  return typeof valeur === 'string' && valeur.length <= LONGUEUR_MAX_URL_CULTE && /^https?:\/\/\S+$/.test(valeur);
}

/// Refus de création, null quand tout est bon. Le titre et
/// la date sont obligatoires, les liens sont facultatifs : un
// culte programmé n'a pas encore de lien de direct, un culte
/// terminé sans replay reste affichable sans bouton de lecture.
export function validerCulte({ titre, date, url_direct, url_replay, statut }) {
  if (typeof titre !== 'string' || titre.trim() === '') return { statut: 400, message: 'Le titre du culte est obligatoire.' };
  if (titre.trim().length > LONGUEUR_MAX_TITRE_CULTE) return { statut: 400, message: 'Le titre du culte est trop long.' };
  if (!dateCulteValide(date)) return { statut: 400, message: 'La date du culte est invalide.' };
  if (!urlCulteValide(url_direct)) return { statut: 400, message: 'Le lien du direct est invalide.' };
  if (!urlCulteValide(url_replay)) return { statut: 400, message: 'Le lien du replay est invalide.' };
  if (statut != null && !STATUTS_CULTE_DIRECT.includes(statut)) return { statut: 400, message: 'Le statut du culte est invalide.' };
  return null;
}

/// Refus de modification partielle, null quand tout est bon :
/// seuls les champs présents sont contrôlés, avec les mêmes
/// règles que la création.
export function validerCulteModif(corps) {
  if (corps.titre !== undefined) {
    if (typeof corps.titre !== 'string' || corps.titre.trim() === '') return { statut: 400, message: 'Le titre du culte est obligatoire.' };
    if (corps.titre.trim().length > LONGUEUR_MAX_TITRE_CULTE) return { statut: 400, message: 'Le titre du culte est trop long.' };
  }
  if (corps.date !== undefined && !dateCulteValide(corps.date)) return { statut: 400, message: 'La date du culte est invalide.' };
  if (corps.url_direct !== undefined && !urlCulteValide(corps.url_direct)) return { statut: 400, message: 'Le lien du direct est invalide.' };
  if (corps.url_replay !== undefined && !urlCulteValide(corps.url_replay)) return { statut: 400, message: 'Le lien du replay est invalide.' };
  if (corps.statut !== undefined && !STATUTS_CULTE_DIRECT.includes(corps.statut)) return { statut: 400, message: 'Le statut du culte est invalide.' };
  return null;
}

/// Début de chapitre normalisé depuis le corps de la requête :
/// l'entier de secondes quand il est valide, null sinon. Une
/// chaîne de chiffres est acceptée, comme l'envoie un
/// formulaire.
export function normaliserDebutSecondes(valeur) {
  if (typeof valeur === 'string' && valeur.trim() !== '') {
    const nombre = Number(valeur);
    return Number.isInteger(nombre) ? nombre : null;
  }
  return Number.isInteger(valeur) ? valeur : null;
}

/// Refus d'ajout de chapitre, null quand tout est bon.
export function validerChapitreCulte({ titre, debut_secondes }) {
  if (typeof titre !== 'string' || titre.trim() === '') return { statut: 400, message: 'Le titre du chapitre est obligatoire.' };
  if (titre.trim().length > LONGUEUR_MAX_TITRE_CHAPITRE) return { statut: 400, message: 'Le titre du chapitre est trop long.' };
  const debut = normaliserDebutSecondes(debut_secondes);
  if (debut == null || debut < 0) return { statut: 400, message: 'Le début du chapitre est invalide : un nombre de secondes, 0 ou plus.' };
  return null;
}

/// Chapitres triés par début croissant, pour la reprise.
export function trierChapitres(chapitres) {
  return [...(chapitres ?? [])].sort((a, b) => (a.debut_secondes ?? 0) - (b.debut_secondes ?? 0));
}

/// Forme publique d'un chapitre : titre et début en secondes.
export function formaterChapitreCulte(ligne) {
  return {
    id: ligne.id,
    titre: ligne.titre,
    debut_secondes: Number(ligne.debut_secondes ?? 0),
  };
}

/// Forme publique d'un culte, avec ses chapitres triés.
export function formaterCulteDirect(ligne, chapitres = []) {
  return {
    id: ligne.id,
    titre: ligne.titre,
    date: ligne.date instanceof Date ? ligne.date.toISOString().slice(0, 10) : String(ligne.date ?? '').slice(0, 10),
    url_direct: ligne.url_direct ?? '',
    url_replay: ligne.url_replay ?? '',
    statut: ligne.statut,
    chapitres: trierChapitres(chapitres).map(formaterChapitreCulte),
  };
}

/// Culte à mettre en avant sur l'accueil : le premier en
/// direct, sinon le premier programmé, sinon rien. La liste
/// est déjà triée par date décroissante côté route.
export function culteDirectEnAvant(cultes) {
  const liste = cultes ?? [];
  return liste.find((c) => c.statut === 'en direct') ?? liste.find((c) => c.statut === 'à venir') ?? null;
}
