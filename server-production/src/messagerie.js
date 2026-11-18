// Messagerie, nom et photo de l'interlocuteur, 18 nov. 2026.
// La route liste ne renvoyait que l'identifiant, le type et le
// titre : pour une conversation directe, l'application ne
// connaissait pas l'autre membre et affichait le libellé
// générique « Conversation directe », dans la liste comme dans
// l'en-tête. La liste renvoie désormais l'autre participant des
// directes, nom complet, matricule et photo, jamais le membre
// connecté lui-même, et seulement pour les directes : groupes et
// pastorale gardent leur titre.
//
// Ce module ne contient que des constantes et des aides pures,
// sans accès base, pour être testé sans serveur ni base, comme
// src/temoignages.js. Les routes vivent dans server.js.

/// Requête de la liste des conversations de l'appelant : une
/// ligne par conversation, avec l'autre participant des directes.
/// La jointure de l'autre participant est limitée aux directes
/// (c.type = 'directe') : pour un groupe, elle ne renvoie rien,
/// donc aucune ligne en double, et les colonnes autre_* sont
/// nulles. Le paramètre $1 est l'identifiant du membre connecté.
export const SQL_CONVERSATIONS_LISTE = `SELECT c.id, c.type, c.title, c.created_at, c.last_message_at, c.replies_disabled,
       a.nom_complet AS autre_nom, a.matricule AS autre_matricule, a.photo_donnees AS autre_photo
  FROM conversations c JOIN conversation_participants cp ON cp.conversation_id = c.id
  LEFT JOIN conversation_participants cp2 ON cp2.conversation_id = c.id AND cp2.member_id <> $1 AND cp2.is_active AND c.type = 'directe'
  LEFT JOIN membres a ON a.id = cp2.member_id
 WHERE cp.member_id = $1 AND cp.is_active AND NOT c.is_archived
 ORDER BY c.last_message_at DESC NULLS LAST, c.created_at DESC`;

/// Requête des participants d'une conversation, route détail :
/// nom complet, matricule et photo de chaque participant actif.
export const SQL_PARTICIPANTS_CONVERSATION = `SELECT cp.member_id, cp.role, cp.joined_at, m.nom_complet, m.matricule, m.photo_donnees AS photo
   FROM conversation_participants cp JOIN membres m ON m.id = cp.member_id
  WHERE cp.conversation_id = $1 AND cp.is_active ORDER BY cp.joined_at`;

/// Autre participant d'une ligne de la liste, ou null : seulement
/// pour une directe dont l'autre membre est connu. Les groupes et
/// la pastorale n'ont pas d'autre participant, même si la ligne
/// porte des colonnes autre_* nulles.
export function autreParticipantDeLigne(ligne) {
  if (!ligne || ligne.type !== 'directe') return null;
  const nom = typeof ligne.autre_nom === 'string' ? ligne.autre_nom.trim() : '';
  if (!nom) return null;
  const matricule = typeof ligne.autre_matricule === 'string' ? ligne.autre_matricule : null;
  const photo = typeof ligne.autre_photo === 'string' && ligne.autre_photo ? ligne.autre_photo : null;
  return { nom, matricule, photo };
}

/// Ligne de la liste telle que renvoyée au client : les colonnes
/// de la requête, plus l'objet `autre` (ou null). Les colonnes
/// plates autre_* sont retirées, le client ne lit que `autre`.
export function formaterConversationListe(ligne) {
  if (!ligne) return ligne;
  const { autre_nom: _autreNom, autre_matricule: _autreMatricule, autre_photo: _autrePhoto, ...reste } = ligne;
  return { ...reste, autre: autreParticipantDeLigne(ligne) };
}
