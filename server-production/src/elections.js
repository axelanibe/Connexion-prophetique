// Élections, carte 76, 7 nov. 2026.
// Une élection se crée par la structure, avec dates de début et de
// fin, candidats membres, un vote par membre. Hors période, la
// fonctionnalité n'apparaît pas aux membres : aucune tuile, aucun
// menu, aucune trace. Pendant le vote, aucun résultat n'est renvoyé
// aux membres ; la structure voit les totaux à tout moment côté
// administration, les membres seulement après la fin, par la route
// dédiée. Aucun vote inventé, aucun résultat inventé : les totaux
// ne viennent que des lignes d'election_votes.
// Module pur, sans base : il est testé sans PostgreSQL, et server.js
// l'importe pour les routes /elections et /admin/elections.

function _date(v) {
  if (v instanceof Date) return v;
  const d = new Date(v);
  return d;
}

/// Statut d'une élection à un instant donné. Les bornes sont
/// comprises : à l'heure exacte du début, le vote est ouvert ; à
/// l'heure exacte de la fin, il l'est encore.
export function electionStatut(election, maintenant = new Date()) {
  const debut = _date(election.date_debut);
  const fin = _date(election.date_fin);
  const now = _date(maintenant);
  if (Number.isNaN(debut.getTime()) || Number.isNaN(fin.getTime())) return 'a_venir';
  if (now < debut) return 'a_venir';
  if (now > fin) return 'terminee';
  return 'en_cours';
}

export function electionEstOuverte(election, maintenant = new Date()) {
  return electionStatut(election, maintenant) === 'en_cours';
}

/// Résultats visibles pour un membre : seulement après la fin.
/// Pendant le vote, la route membres répond 404 ; la structure,
/// elle, lit les totaux à tout moment par les routes admin.
export function resultatsVisiblesPourMembre(election, maintenant = new Date()) {
  return electionStatut(election, maintenant) === 'terminee';
}

/// Deux périodes se chevauchent quand chacune commence avant la
/// fin de l'autre. Deux élections qui se suivent exactement, la
/// fin de l'une égale au début de l'autre, ne se chevauchent pas.
/// Une seule élection ouverte à la fois : la création refuse tout
/// chevauchement avec une élection existante.
export function electionsSeChevauchent(aDebut, aFin, bDebut, bFin) {
  const ad = _date(aDebut);
  const af = _date(aFin);
  const bd = _date(bDebut);
  const bf = _date(bFin);
  if ([ad, af, bd, bf].some((d) => Number.isNaN(d.getTime()))) return false;
  return ad < bf && bd < af;
}

/// Contrôle de forme d'une création, avant toute écriture : les
/// dates doivent être lisibles et la fin après le début, le titre
/// non vide, au moins un candidat, sans doublon. La résolution
/// des matricules en membres réels se fait côté serveur, qui
/// refuse un matricule inconnu. Renvoie la liste des erreurs,
/// vide quand tout est bon.
export function validerCreationElection(corps) {
  const erreurs = [];
  const b = corps && typeof corps === 'object' ? corps : {};
  const titre = typeof b.titre === 'string' ? b.titre.trim() : '';
  if (titre.length < 1 || titre.length > 200) erreurs.push('Le titre est requis, 200 caractères maximum.');
  if (b.description !== undefined && b.description !== null) {
    if (typeof b.description !== 'string' || b.description.trim().length > 2000) erreurs.push('La description fait 2000 caractères maximum.');
  }
  if (b.poste !== undefined && b.poste !== null) {
    if (typeof b.poste !== 'string' || b.poste.trim().length > 120) erreurs.push('Le poste fait 120 caractères maximum.');
  }
  const debut = _date(b.date_debut);
  const fin = _date(b.date_fin);
  if (Number.isNaN(debut.getTime())) erreurs.push('La date de début est invalide.');
  if (Number.isNaN(fin.getTime())) erreurs.push('La date de fin est invalide.');
  if (!Number.isNaN(debut.getTime()) && !Number.isNaN(fin.getTime()) && !(fin > debut)) {
    erreurs.push('La date de fin doit être après la date de début.');
  }
  const candidats = Array.isArray(b.candidats) ? b.candidats : null;
  if (!candidats || candidats.length < 1) {
    erreurs.push('Au moins un candidat est requis.');
  } else if (candidats.length > 50) {
    erreurs.push('50 candidats au maximum.');
  } else {
    const vus = new Set();
    for (const c of candidats) {
      const cle = c && typeof c === 'object' && typeof c.matricule === 'string' && c.matricule.trim() !== ''
        ? `mat:${c.matricule.trim()}`
        : c && typeof c === 'object' && typeof c.membre_id === 'string' && c.membre_id.trim() !== ''
          ? `id:${c.membre_id.trim()}`
          : null;
      if (cle === null) {
        erreurs.push('Chaque candidat doit porter un matricule ou un identifiant de membre.');
        break;
      }
      if (vus.has(cle)) {
        erreurs.push('Un même membre ne peut pas être candidat deux fois.');
        break;
      }
      vus.add(cle);
    }
  }
  return erreurs;
}

/// Forme publique d'une élection pour un membre : titre, poste,
/// description, dates, candidats sans aucun total, et son propre
/// vote. Les totaux n'y figurent jamais.
export function formaterElectionMembre(election, candidats, monCandidatId) {
  return {
    id: election.id,
    titre: election.titre,
    description: election.description ?? '',
    poste: election.poste ?? '',
    date_debut: election.date_debut instanceof Date ? election.date_debut.toISOString() : election.date_debut,
    date_fin: election.date_fin instanceof Date ? election.date_fin.toISOString() : election.date_fin,
    statut: 'en_cours',
    candidats: (candidats || []).map((c) => ({
      id: c.id,
      nom: c.nom,
      fonction: c.fonction ?? '',
      ordre: c.ordre ?? 0,
    })),
    a_vote: monCandidatId != null,
    mon_candidat_id: monCandidatId ?? null,
  };
}
