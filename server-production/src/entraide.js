// Entraide entre membres, offres et demandes, 21 nov. 2026,
// tranche 7 de l'audit du 17 nov. : un membre publie une offre
// ou une demande, visible par tous les membres, l'auteur seul
// marque sa publication résolue. Le contact avec l'auteur se
// fait par la messagerie existante, côté application, jamais
// ici. À ne pas confondre avec le clavardage d'aide avec la
// structure, qui est un canal vers la structure, pas entre
// membres.
//
// Ce module ne contient que des constantes et des aides pures,
// sans accès base, pour être testé sans serveur ni base, comme
// src/chaine_priere.js. Les routes vivent dans server.js.

/// Types de publication d'entraide.
export const TYPES_ENTRAIDE = ['offre', 'demande'];

/// Statuts d'une publication : ouverte, en cours, résolue.
export const STATUTS_ENTRAIDE = ['ouverte', 'en cours', 'résolue'];

/// Longueurs maximales des champs saisis.
export const LONGUEUR_MAX_CATEGORIE_ENTRAIDE = 80;
export const LONGUEUR_MAX_TITRE_ENTRAIDE = 200;
export const LONGUEUR_MAX_DESCRIPTION_ENTRAIDE = 2000;

/// Refus d'enregistrement, null quand tout est bon. Le type,
// la catégorie et le titre sont obligatoires, la description
// est facultative.
export function validerEntraide({ type, categorie, titre, description }) {
  if (!TYPES_ENTRAIDE.includes(type)) return { statut: 400, message: 'Le type de la publication est invalide.' };
  if (typeof categorie !== 'string' || categorie.trim() === '') return { statut: 400, message: 'La catégorie est obligatoire.' };
  if (categorie.trim().length > LONGUEUR_MAX_CATEGORIE_ENTRAIDE) return { statut: 400, message: 'La catégorie est trop longue.' };
  if (typeof titre !== 'string' || titre.trim() === '') return { statut: 400, message: 'Le titre est obligatoire.' };
  if (titre.trim().length > LONGUEUR_MAX_TITRE_ENTRAIDE) return { statut: 400, message: 'Le titre est trop long.' };
  if (description != null && typeof description !== 'string') return { statut: 400, message: 'La description est invalide.' };
  if (typeof description === 'string' && description.length > LONGUEUR_MAX_DESCRIPTION_ENTRAIDE) return { statut: 400, message: 'La description est trop longue.' };
  return null;
}

/// Refus de changement de statut, null quand tout est bon.
export function validerStatutEntraide({ statut }) {
  if (!STATUTS_ENTRAIDE.includes(statut)) return { statut: 400, message: 'Le statut est invalide.' };
  return null;
}

/// Forme renvoyée aux membres : la publication avec le nom de
/// son auteur, jamais son contact, le contact passe par la
/// messagerie. est_auteur dit si c'est ma publication.
export function formaterEntraide(ligne, membreId) {
  return {
    id: ligne.id,
    type: ligne.type,
    categorie: ligne.categorie,
    titre: ligne.titre,
    description: ligne.description ?? '',
    statut: ligne.statut,
    auteur_id: ligne.membre_id,
    auteur_nom: ligne.auteur_nom ?? '',
    est_auteur: membreId != null && ligne.membre_id === membreId,
    cree_le: ligne.cree_le instanceof Date ? ligne.cree_le.toISOString() : String(ligne.cree_le ?? ''),
    modifie_le: ligne.modifie_le instanceof Date ? ligne.modifie_le.toISOString() : String(ligne.modifie_le ?? ''),
  };
}
