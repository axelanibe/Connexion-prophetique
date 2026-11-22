// Correction du nom d'un membre, carte 108, 8 nov. 2026 :
// fonctions pures, testables sans base ni serveur, comme
// src/telephone_nom.js ou src/effacement_compte.js.
//
// Constat vérifié dans le code : aujourd'hui personne ne peut
// corriger un nom. Le membre ne peut pas le changer depuis son
// Profil (téléphone, année, mot de passe seulement) et
// l'administrateur n'a aucune route de correction, la liste des
// membres est en lecture seule.
//
// Règles validées par Axel : administrateur général partout,
// administrateur d'établissement seulement pour les membres de
// son établissement, même périmètre que la lecture d'un membre
// (GET /admin/membres/:id). Champs : nom complet (règle des deux
// mots, carte 101), date de naissance, établissement. Le
// matricule n'est jamais recalculé, ses initiales sont figées à
// l'attribution. Le nom est aussi corrigé dans bureau_membres
// pour les lignes liées par membre_id, sinon le Bureau garderait
// l'ancien nom. La correction est journalisée en audit avec
// le fait seulement, jamais les valeurs.
//
// Le nom d'une attestation déjà délivrée est lu en direct dans
// membres au moment de l'affichage, donc il suit la correction à
// la réouverture : rien à changer là.
import { z } from 'zod';
import { nomCompletDeuxMots, nomCompletMajuscules } from './telephone_nom.js';

const dateIso = /^\d{4}-\d{2}-\d{2}$/;

// Corps de la correction : partiel, au moins un des trois
// champs, sinon rien à corriger. Une valeur null efface le
// champ (date de naissance ou établissement) ; une clé absente
// le laisse tel quel. Le nom, quand il est fourni, suit la
// règle des deux mots de la carte 101.
export const correctionMembreSchema = z
  .object({
    nom_complet: z
      .string()
      .trim()
      .min(2)
      .max(120)
      .refine(nomCompletDeuxMots, { message: 'Nom complet incomplet : écris ton prénom et ton nom.' })
      // Carte 125, 10 nov. 2026 : comme à l'inscription, le nom
      // corrigé est enregistré en majuscules.
      .transform(nomCompletMajuscules)
      .optional(),
    date_naissance: z
      .string()
      .regex(dateIso, { message: 'Date de naissance invalide : AAAA-MM-JJ.' })
      .nullable()
      .optional(),
    etablissement_id: z.string().uuid({ message: 'Établissement invalide.' }).nullable().optional(),
  })
  .refine(
    (b) => b.nom_complet !== undefined || b.date_naissance !== undefined || b.etablissement_id !== undefined,
    { message: 'Rien à corriger.' },
  );

// Périmètre de la correction, même que la lecture : général
// partout, établissement seulement pour les membres de son
// établissement, un membre sans établissement restant visible.
// L'écriture ne déplace jamais un membre hors de son périmètre :
// le nouvel établissement, quand il est choisi, doit être celui
// de l'administrateur, et un effacement (null) est aussi un
// déplacement hors périmètre, réservé au général.
// nouvelEtablissementId vaut undefined quand la clé est absente
// du corps, null quand l'établissement est effacé.
export function correctionMembreAutorisee({ role, eidAdmin, membreEtablissementId, nouvelEtablissementId }) {
  if (role === 'admin_general') return true;
  if (role !== 'admin_etablissement') return false;
  if (membreEtablissementId != null && membreEtablissementId !== eidAdmin) return false;
  if (nouvelEtablissementId !== undefined && nouvelEtablissementId !== eidAdmin) return false;
  return true;
}

// Détails d'audit : le fait de la correction seulement, jamais
// les valeurs. Le matricule identifie le membre corrigé, la
// liste des champs touchés dit ce qui a changé, sans consigner
// ni l'ancien ni le nouveau nom, ni la date de naissance, ni
// l'établissement. Sécurité, 22 nov. 2026.
export function correctionMembreDetails(ancien, corps) {
  const champs = [];
  if (corps.nom_complet !== undefined) champs.push('nom_complet');
  if (corps.date_naissance !== undefined) champs.push('date_naissance');
  if (corps.etablissement_id !== undefined) champs.push('etablissement_id');
  return { matricule: ancien.matricule ?? null, champs };
}
