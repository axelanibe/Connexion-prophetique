// Suppression de son propre compte, carte 92, 7 nov. 2026,
// modifiee en suppression douce le meme jour.
//
// Le membre demande lui-meme la suppression, jamais pour un
// autre membre : la route ne prend aucun id, elle lit seulement
// req.user.sub et req.user.mid. Effacement immediat abandonne :
// la demande desactive le compte pendant 30 jours, pour laisser
// le temps d'annuler, et l'effacement definitif apres 30 jours
// est fait par la purge de src/effacement_compte.js, au demarrage
// puis toutes les 24 heures, avec les memes regles, paiements et
// audit conserves, affiches compte supprime, matricule jamais
// reutilise, numero et e-mail liberes seulement a l'effacement
// definitif, pas pendant les 30 jours. Module pur, sans base : il est teste sans
// PostgreSQL, et server.js l'importe pour les routes
// DELETE /moi/compte et POST /moi/compte/annuler.

export const SUPPRESSION_DELAI_JOURS = 30;

/// Date d'effacement definitif : 30 jours apres la demande.
/// Renvoie null quand la date de demande est invalide.
export function dateEffacementDefinitif(dateDemande) {
  const d = new Date(dateDemande);
  if (Number.isNaN(d.getTime())) return null;
  return new Date(d.getTime() + SUPPRESSION_DELAI_JOURS * 24 * 60 * 60 * 1000);
}

/// Vrai tant que maintenant est avant la date d'effacement :
/// la suppression peut encore etre annulee. Faux quand la
/// date est passee, ou invalide, ou absente.
export function suppressionAnnulable(dateEffacement, maintenant = new Date()) {
  const fin = new Date(dateEffacement);
  if (Number.isNaN(fin.getTime())) return false;
  const m = new Date(maintenant);
  if (Number.isNaN(m.getTime())) return false;
  return m < fin;
}

/// Refus d'une demande de suppression par le membre lui-meme.
/// Renvoie null quand la demande est autorisee, sinon
/// { statut, message }, dans cet ordre : pas de hash, 403,
/// mot de passe faux, 401, dernier administrateur general,
/// 409, suppression deja demandee, 409. Le nombre
/// autresAdminsGeneraux ne compte que les administrateurs
/// generaux autres que le membre lui-meme.
export function validerSuppressionPropreCompte({ role, autresAdminsGeneraux, motDePasseVerifie, aHash, suppressionDejaDemandee } = {}) {
  if (!aHash) return { statut: 403, message: 'Suppression impossible pour ce compte.' };
  if (!motDePasseVerifie) return { statut: 401, message: 'Mot de passe incorrect.' };
  if (suppressionDejaDemandee) return { statut: 409, message: 'La suppression est déjà demandée.' };
  if (role === 'admin_general' && Number(autresAdminsGeneraux ?? 0) === 0) {
    return { statut: 409, message: 'Impossible de supprimer le dernier administrateur général.' };
  }
  return null;
}

/// Refus d'une annulation de suppression. Renvoie null quand
/// l'annulation est autorisee, sinon { statut, message } :
/// 409 quand aucune suppression n'a ete demandee, 409 quand
/// les 30 jours sont passes.
export function validerAnnulationSuppression({ supprimeLe, maintenant = new Date() } = {}) {
  if (supprimeLe === null || supprimeLe === undefined) {
    return { statut: 409, message: 'Aucune suppression demandée.' };
  }
  if (!suppressionAnnulable(supprimeLe, maintenant)) {
    return { statut: 409, message: 'Le délai de 30 jours est passé, la suppression ne peut plus être annulée.' };
  }
  return null;
}

/// Effets de la suppression douce, en texte : compte desactive
/// pendant 30 jours, reconnexion possible pour annuler, puis
/// effacement total, sauf paiements et audit, affiches compte
/// supprime, matricule jamais reutilise.
export function texteSuppressionPropreCompte() {
  return 'Compte désactivé pendant 30 jours, tu peux te reconnecter pour annuler, après 30 jours tes données sont totalement effacées, paiements et audit conservés affichés compte supprimé, matricule jamais réutilisé.';
}
