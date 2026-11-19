// Messagerie, nom et photo de l'interlocuteur, 18 nov. 2026.
// La route liste ne renvoyait que l'identifiant, le type et le
// titre : pour une conversation entre deux membres, l'application
// ne connaissait pas l'autre membre et affichait un libellé
// générique. La liste renvoie désormais l'autre participant des
// conversations entre deux membres, nom complet, matricule et
// photo, jamais le membre connecté lui-même, et seulement pour
// ces conversations : groupes et pastorale gardent leur titre.
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
       cp.est_favori AS est_favori,
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

// ── Messages vocaux, 18 nov. 2026 ─────────────────────────────
// Un message vocal est un message de type 'audio', son contenu
// est le libellé affiché (« Message vocal · 1:05 »), le son
// voyage en pièce jointe (table message_attachments, clé R2
// sous messages-vocaux/), jamais dans le contenu. Durée mesurée
// côté application, 5 minutes au plus ; taille 10 Mo au plus.
// Le type réel est lu dans les octets, jamais d'après le nom ou
// l'en-tête envoyé, comme pour les stories.

/// Taille maximale d'un message vocal : 10 Mo, environ 5 minutes
/// en opus ou en AAC, la durée étant plafonnée côté application.
export const TAILLE_MAX_MESSAGE_VOCAL_OCTETS = 10 * 1024 * 1024;

/// Durée maximale d'un message vocal, en secondes : 5 minutes.
export const DUREE_MAX_MESSAGE_VOCAL_SECONDES = 300;

/// Types audio acceptés, lus dans les octets par file-type.
export const MIMES_AUDIO = Object.freeze([
  'audio/webm',
  'audio/mp4',
  'audio/mpeg',
  'audio/ogg',
  'audio/wav',
  'audio/x-m4a',
]);

const EXTENSION_MIME_AUDIO = Object.freeze({
  'audio/webm': 'webm',
  'audio/mp4': 'm4a',
  'audio/mpeg': 'mp3',
  'audio/ogg': 'ogg',
  'audio/wav': 'wav',
  'audio/x-m4a': 'm4a',
});

/// Clé d'objet dans le compartiment : dossier messages-vocaux,
/// identifiant aléatoire, extension du type réel. Aucune donnée
/// membre dans la clé, rien qui permette de deviner le contenu.
export function cleMessageVocal(mime) {
  const ext = EXTENSION_MIME_AUDIO[mime] ?? 'webm';
  return `messages-vocaux/${crypto.randomUUID()}.${ext}`;
}

/// Durée affichée, en minutes:secondes : 65 secondes donnent
/// « 1:05 », 8 secondes « 0:08 ».
export function formaterDureeVocal(secondes) {
  const total = Math.max(0, Math.floor(Number(secondes) || 0));
  const minutes = Math.floor(total / 60);
  const reste = String(total % 60).padStart(2, '0');
  return `${minutes}:${reste}`;
}

/// Libellé stocké comme contenu du message audio, pour les
/// notifications, la modération et le cliché de signalement.
export function libelleMessageVocal(dureeSecondes) {
  return `Message vocal · ${formaterDureeVocal(dureeSecondes)}`;
}

/// Refus d'un message vocal, null quand tout est bon.
export function validerMessageVocal({ mime, tailleOctets, dureeSecondes }) {
  if (!MIMES_AUDIO.includes(mime)) return { statut: 415, message: 'Type audio non autorisé.' };
  if (!Number.isInteger(tailleOctets) || tailleOctets <= 0 || tailleOctets > TAILLE_MAX_MESSAGE_VOCAL_OCTETS) {
    return { statut: 413, message: 'Message vocal trop volumineux.' };
  }
  if (!Number.isInteger(dureeSecondes) || dureeSecondes < 1 || dureeSecondes > DUREE_MAX_MESSAGE_VOCAL_SECONDES) {
    return { statut: 400, message: 'Durée du message vocal invalide.' };
  }
  return null;
}

/// Forme publique d'un message audio : la ligne, plus le lien
/// signé temporaire vers le son, jamais la clé R2.
export function formaterMessageAudio(ligne, url) {
  return { ...ligne, audio_url: url, duree_secondes: ligne.duree_secondes ?? null };
}

// ── Groupes automatiques de camp et de retraite, 18 nov. 2026 ─
// Quand une personne s'inscrit à un camp ou une retraite, le
// serveur crée un groupe Messagerie au nom de l'événement s'il
// n'existe pas encore, et y ajoute la personne inscrite. Le
// groupe est un groupe de structure (type 'groupe_structure'),
// lié à l'événement par conversations.evenement_id, unique par
// événement. Seuls les inscrits en sont participants, donc seuls
// eux voient le groupe dans leur liste. Tous les inscrits
// peuvent écrire. La modération par le Bureau et les 3 motifs
// s'appliquent comme aux autres groupes, sans chiffrement de
// bout en bout en version 1, et la mention de transparence est
// gardée. Choix par défaut d'Axel non tranchés, 18 nov. 2026 :
// si la personne annule son inscription, elle sort du groupe
// (is_active à faux) ; le groupe reste après le camp, comme un
// groupe normal ; la création du groupe rattrape tous les
// inscrits actuels, pas seulement la nouvelle inscription.

/// Vrai pour les types d'événement qui ouvrent un groupe
/// automatique : camp et retraite, pas réunion.
export function estTypeEvenementGroupe(type) {
  return type === 'camp' || type === 'retraite';
}

/// Groupe du camp ou de la retraite, s'il existe et n'est pas
/// archivé : son identifiant seulement.
export const SQL_GROUPE_EVENEMENT = `SELECT id FROM conversations WHERE evenement_id = $1 AND NOT is_archived LIMIT 1`;

/// Création du groupe, idempotente : si deux inscriptions
/// arrivent en même temps, une seule crée le groupe, l'autre
/// ne fait rien et relit le groupe existant. L'index unique
/// partiel sur evenement_id rend le conflit visible.
export const SQL_CREER_GROUPE_EVENEMENT = `INSERT INTO conversations (type, title, created_by, evenement_id) VALUES ('groupe_structure', $1, $2, $3) ON CONFLICT (evenement_id) WHERE evenement_id IS NOT NULL DO NOTHING RETURNING id`;

/// Rattrapage des inscrits : tous les inscrits actuels de
/// l'événement entrent dans le groupe, idempotent, et un membre
/// qui s'était retiré redevient actif s'il est encore inscrit.
export const SQL_AJOUTER_INSCRITS_GROUPE = `INSERT INTO conversation_participants (conversation_id, member_id, role) SELECT $1, membre_id, 'membre' FROM inscriptions WHERE evenement_id = $2 ON CONFLICT (conversation_id, member_id) DO UPDATE SET is_active = true`;

/// Ajout d'un seul inscrit, idempotent, avec réactivation si le
/// membre s'était retiré du groupe.
export const SQL_AJOUTER_PARTICIPANT_GROUPE = `INSERT INTO conversation_participants (conversation_id, member_id, role) VALUES ($1, $2, 'membre') ON CONFLICT (conversation_id, member_id) DO UPDATE SET is_active = true`;

/// Retrait du groupe, annulation d'inscription : le membre ne
/// voit plus le groupe, sans effacer son inscription passée ni
/// ses messages, comme un retrait de groupe normal.
export const SQL_RETIRER_PARTICIPANT_GROUPE = `UPDATE conversation_participants SET is_active = false WHERE conversation_id = $1 AND member_id = $2`;

// ── Favoris, 18 nov. 2026 ─────────────────────────────────────
// Une conversation marquée en favori par le membre, dans sa
// participation seulement : le favori ne se voit que par celui
// qui l'a posé, jamais par les autres participants.

/// Bascule du favori de l'appelant sur une conversation dont
/// il est participant actif : renvoie le nouvel état, ou rien
/// quand la participation n'existe pas.
export const SQL_FAVORI_BASCULER = `UPDATE conversation_participants SET est_favori = $3 WHERE conversation_id = $1 AND member_id = $2 AND is_active RETURNING est_favori`;
