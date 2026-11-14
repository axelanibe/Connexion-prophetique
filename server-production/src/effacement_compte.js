// Effacement definitif apres 30 jours, carte 92, 8 nov. 2026.
//
// La carte 92 ne construisait que la suppression douce : le membre
// demande lui-meme, le compte est desactive 30 jours
// (actif = false, supprime_le = demande + 30 jours), la
// recuperation reste possible pendant ces 30 jours par
// POST /moi/compte/annuler. Ce module construit l'effacement
// definitif qui manquait : passe supprime_le, le compte et ses
// donnees personnelles disparaissent, avec exactement les memes
// regles que la route admin DELETE /admin/membres/:id, qui
// reutilise effacerCompteDefinitivement ci-dessous.
//
// Regles dures, toutes testees sans base dans
// tests/effacement_compte.test.js :
// - jamais avant supprime_le, jamais a supprime_le moins une
//   seconde, efface seulement quand maintenant >= supprime_le,
//   comme l'annulation qui refuse a partir de supprime_le ;
// - jamais un compte reactif : la selection exige actif = false,
//   donc un compte recupere (supprime_le remis a NULL, actif
//   remis a vrai) n'est jamais efface ;
// - jamais un administrateur general, meme non dernier : la
//   purge automatique les ignore et les compte a part, pour
//   qu'un humain les traite par la route admin, jamais en
//   automatique. Le dernier administrateur general est donc
//   couvert aussi, sans cas particulier ;
// - paiements et audit jamais effaces : la suppression passe
//   par DELETE FROM utilisateurs, les paiements passent en
//   SET NULL par la migration de demarrage du 31 oct. 2026 et
//   s'affichent « compte supprime », le journal d'audit ne
//   recoit qu'une ligne en ajout, jamais un DELETE, et sa
//   colonne utilisateur_id passe en SET NULL ;
// - matricule jamais reutilise : il part avec la ligne membre,
//   la sequence seq_matricule_nouveau n'est jamais remise a
//   zero, numero et e-mail sont liberes par la suppression
//   de la ligne utilisateurs (index uniques partiels) ;
// - idempotent et sur contre les doubles executions : la
//   selection verrouille les lignes utilisateurs
//   (FOR UPDATE SKIP LOCKED), une deuxieme purge simultanee
//   saute les lignes deja verrouillees, et une ligne effacee
//   n'existe plus au passage suivant.
//
// Declenchement, dans server.js, comme la purge des jetons
// expires du 1er nov. 2026, jamais un workflow ni un secret
// de plus : une fois au demarrage du serveur, puis toutes
// les 24 heures, plus la route manuelle
// POST /admin/comptes/effacer-echus, administrateur general
// seulement, qui appelle la meme fonction et renvoie les
// comptes. Module pur cote selection, sans base : la fonction
// de purge recoit un client pg, comme tx() le fournit.
//
// Le client recu par purgerComptesEchus et
// effacerCompteDefinitivement doit exposer query(texte,
// parametres) et renvoyer { rows } : en production c'est le
// client de la transaction tx(), en test c'est un faux client.

/// Vrai quand la date d'effacement est passee ou atteinte :
/// maintenant >= supprime_le. Faux quand la date est absente,
/// invalide, ou dans le futur. A supprime_le pile, l'effacement
/// a lieu, comme l'annulation qui refuse a partir de ce moment.
export function estEchu(supprimeLe, maintenant = new Date()) {
  // Attention : new Date(null) donne l'epoque 1970, une date
  // valide, donc null doit etre refuse avant toute conversion,
  // sinon un compte sans suppression demandee passerait echu.
  if (supprimeLe === null || supprimeLe === undefined) return false;
  const fin = new Date(supprimeLe);
  if (Number.isNaN(fin.getTime())) return false;
  const m = new Date(maintenant);
  if (Number.isNaN(m.getTime())) return false;
  return m >= fin;
}

/// Repartit des candidats lus en base entre comptes a effacer
/// et comptes ignores. Un candidat porte : id (membre), role,
/// actif, supprime_le. Un compte est a effacer seulement si
/// supprime_le est echu ET actif est faux. Un administrateur
/// general echu va dans ignoresAdminGeneral, jamais dans
/// aEffacer, meme non dernier. Les autres (pas de date, date
/// future, date invalide, compte reactif) ne sortent dans
/// aucune des deux listes : ils restent tels quels.
export function selectionnerComptesEchus(candidats, maintenant = new Date()) {
  const aEffacer = [];
  const ignoresAdminGeneral = [];
  for (const candidat of candidats ?? []) {
    if (!estEchu(candidat?.supprime_le, maintenant)) continue;
    if (candidat?.actif !== false) continue;
    if (candidat?.role === 'admin_general') {
      ignoresAdminGeneral.push(candidat);
    } else {
      aEffacer.push(candidat);
    }
  }
  return { aEffacer, ignoresAdminGeneral };
}

/// Effacement definitif d'un seul compte, meme corps que la
/// route admin DELETE /admin/membres/:id, qui l'appelle.
/// L'audit est ecrit avant la suppression, avec l'action
/// donnee (par defaut 'membre.efface_definitivement' pour la
/// purge, 'membre.supprime' pour la route admin) et
/// auditUtilisateurId null pour la purge (action systeme),
/// ou l'id de l'administrateur pour la route admin. Les
/// paiements ne sont jamais touches ici : ils passent en
/// SET NULL par la suppression de la ligne utilisateurs.
/// La photo de profil n'est effacee que si aucun autre
/// contenu ne la reference, comme la route admin.
export async function effacerCompteDefinitivement(
  c,
  { id, matricule, nom_complet, utilisateur_id, photo_id, actionAudit = 'membre.efface_definitivement', auditUtilisateurId = null, origine = 'effacement_30_jours' } = {},
) {
  await c.query(
    'INSERT INTO journal_audit (utilisateur_id, action, entite, entite_id, details, adresse_ip) VALUES ($1,$2,$3,$4,$5,$6)',
    [auditUtilisateurId, actionAudit, 'membres', id ?? null, JSON.stringify({ matricule, nom_complet, origine }), null],
  );
  await c.query('DELETE FROM bureau_membres WHERE membre_id = $1', [id]);
  if (photo_id) {
    const refs = (
      await c.query(
        `SELECT 1 FROM (
           SELECT image_id AS f FROM etablissements UNION ALL SELECT image_id FROM activites_etablissement
           UNION ALL SELECT image_id FROM actualites UNION ALL SELECT image_id FROM evenements
           UNION ALL SELECT couverture_id FROM livres UNION ALL SELECT fichier_id FROM livres
           UNION ALL SELECT fichier_id FROM enseignements UNION ALL SELECT audio_id FROM enseignements
           UNION ALL SELECT audio_id FROM annonces_audio UNION ALL SELECT photo_id FROM membres WHERE id <> $2
         ) refs WHERE f = $1 LIMIT 1`,
        [photo_id, id],
      )
    ).rows[0];
    if (!refs) await c.query('DELETE FROM fichiers WHERE id = $1', [photo_id]);
  }
  await c.query('DELETE FROM utilisateurs WHERE id = $1', [utilisateur_id]);
  return { matricule, nom_complet };
}

/// Purge les comptes dont la suppression douce a depasse
/// 30 jours. A appeler dans une transaction : la selection
/// verrouille les lignes utilisateurs, donc deux purges
/// simultanees ne traitent jamais le meme compte. Renvoie
/// les matricules effaces et ceux ignores parce que
/// administrateurs generaux. Ne touche jamais aux paiements
/// ni au journal d'audit, sauf l'ajout d'une ligne d'audit
/// par compte efface. Ne jette jamais : l'appelant journalise
/// l'echec, comme purgerJetonsExpires.
export async function purgerComptesEchus(c, maintenant = new Date()) {
  const candidats = (
    await c.query(
      `SELECT m.id, m.matricule, m.nom_complet, m.utilisateur_id, m.photo_id, u.role, u.actif, u.supprime_le
       FROM membres m JOIN utilisateurs u ON u.id = m.utilisateur_id
       WHERE u.supprime_le IS NOT NULL AND u.actif = false AND u.supprime_le <= $1
       ORDER BY u.supprime_le ASC FOR UPDATE OF u SKIP LOCKED`,
      [maintenant instanceof Date ? maintenant.toISOString() : maintenant],
    )
  ).rows;
  const { aEffacer, ignoresAdminGeneral } = selectionnerComptesEchus(candidats, maintenant);
  const effaces = [];
  for (const candidat of aEffacer) {
    const efface = await effacerCompteDefinitivement(c, candidat);
    effaces.push(efface.matricule);
  }
  return {
    effaces,
    ignoresAdminGeneral: ignoresAdminGeneral.map((candidat) => candidat.matricule),
  };
}
