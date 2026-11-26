// Messagerie, nom de l'interlocuteur, 18 nov. 2026.
// La route liste ne renvoyait que l'identifiant, le type et le
// titre : pour une conversation entre deux membres, l'application
// ne connaissait pas l'autre membre et affichait un libellé
// générique. La liste renvoie désormais l'autre participant des
// conversations entre deux membres, nom complet et matricule
// seulement, jamais le membre connecté lui-même, et seulement
// pour ces conversations : groupes et pastorale gardent leur titre.
// Sécurité, 22 nov. 2026 : la photo en base64 ne sort plus dans
// une liste, l'application affiche les initiales. La photo reste
// dans le détail des participants, une conversation à laquelle
// l'appelant participe déjà.
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
export const SQL_CONVERSATIONS_LISTE = `SELECT c.id, c.type, c.title, c.created_at, c.last_message_at, c.replies_disabled, c.ephemere, c.aide_statut, c.aide_motif,
       cp.est_favori AS est_favori,
       (SELECT COUNT(*) FROM conversation_participants cp3 WHERE cp3.conversation_id = c.id AND cp3.is_active) AS nb_membres,
       a.nom_complet AS autre_nom, a.matricule AS autre_matricule
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
/// porte des colonnes autre_* nulles. La photo vaut toujours null
/// dans une liste, jamais de base64, l'application affiche les
/// initiales ; une colonne autre_photo héritée est ignorée.
export function autreParticipantDeLigne(ligne) {
  if (!ligne || ligne.type !== 'directe') return null;
  const nom = typeof ligne.autre_nom === 'string' ? ligne.autre_nom.trim() : '';
  if (!nom) return null;
  const matricule = typeof ligne.autre_matricule === 'string' ? ligne.autre_matricule : null;
  return { nom, matricule, photo: null };
}

/// Ligne de la liste telle que renvoyée au client : les colonnes
/// de la requête, plus l'objet `autre` (ou null). Les colonnes
/// plates autre_* sont retirées, le client ne lit que `autre`.
/// `nb_membres` est un nombre : COUNT(*) arrive en chaîne depuis
/// la base, tranche T4, 26 nov. 2026, pour le nombre affiché des
/// groupes.
export function formaterConversationListe(ligne) {
  if (!ligne) return ligne;
  const { autre_nom: _autreNom, autre_matricule: _autreMatricule, autre_photo: _autrePhoto, nb_membres: nbMembres, ...reste } = ligne;
  return { ...reste, nb_membres: nbMembres == null ? null : Number(nbMembres), autre: autreParticipantDeLigne(ligne) };
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

// ── Messages éphémères, 21 nov. 2026, carte 3 ───────────────
// Privé seulement : directe et pastorale, jamais les groupes.
// conversations.ephemere porte la durée en jours, null quand
// le mode est désactivé ; 7 jours par défaut à l'activation.
// Chaque message envoyé dans une conversation éphémère porte
// expire_le, et la purge horaire supprime les messages expirés
// avec leurs pièces R2. Le contenu n'entre jamais dans la
// poussée d'une conversation éphémère, seulement le titre
// « Nouveau message ».

/// Durée éphémère par défaut, en jours, à l'activation.
export const DUREE_EPHEMERE_DEFAUT_JOURS = 7;

/// Durée éphémère réglable, en jours : 1 au moins, 30 au plus.
export const DUREE_EPHEMERE_MIN_JOURS = 1;
export const DUREE_EPHEMERE_MAX_JOURS = 30;

/// Types de conversation qui acceptent le mode éphémère : les
/// conversations privées à deux, jamais les groupes.
export const TYPES_CONVERSATION_EPHEMERE = Object.freeze(['directe', 'pastorale']);

/// Vrai quand la valeur est un réglage éphémère valide : null
/// pour désactiver, ou un nombre entier de jours entre 1 et 30.
export function ephemereValide(valeur) {
  if (valeur === null || valeur === undefined) return true;
  return Number.isInteger(valeur) && valeur >= DUREE_EPHEMERE_MIN_JOURS && valeur <= DUREE_EPHEMERE_MAX_JOURS;
}

/// Vrai quand le type de conversation accepte le mode éphémère.
export function conversationEphemereAutorisee(type) {
  return TYPES_CONVERSATION_EPHEMERE.includes(type);
}

/// Date d'expiration d'un message envoyé à [dateEnvoi] dans une
/// conversation éphémère de [jours] jours, null quand le mode
/// est désactivé.
export function dateExpirationEphemere(dateEnvoi, jours) {
  if (jours === null || jours === undefined) return null;
  const envoi = dateEnvoi instanceof Date ? dateEnvoi : new Date(dateEnvoi);
  return new Date(envoi.getTime() + jours * 24 * 60 * 60 * 1000);
}

/// Vrai quand le message a dépassé son expire_le, faux quand il
/// n'en a pas ou quand il est encore dans sa durée.
export function messageEphemereExpire(expireLe, maintenant = new Date()) {
  if (expireLe === null || expireLe === undefined) return false;
  const expire = expireLe instanceof Date ? expireLe : new Date(expireLe);
  const ref = maintenant instanceof Date ? maintenant : new Date(maintenant);
  return expire.getTime() <= ref.getTime();
}

/// Titre et corps de la notification d'un nouveau message : en
/// conversation éphémère, seulement « Nouveau message », sans
/// nom d'expéditeur ni aperçu du contenu ; sinon le titre
/// « Nouveau message » et le prénom avec l'aperçu.
export function notificationNouveauMessage({ ephemere, prenom, apercu }) {
  if (ephemere !== null && ephemere !== undefined) {
    return { titre: 'Nouveau message', corps: 'Nouveau message' };
  }
  const qui = (prenom ?? '').trim() || 'Un membre';
  return { titre: 'Nouveau message', corps: `${qui} : ${apercu}` };
}

/// Messages expirés avec leurs pièces : une ligne par pièce
/// jointe, cle_r2 null quand le message n'en a pas. La purge
/// supprime les objets R2 puis les lignes, jamais les
/// signalements : la preuve figée d'un signalement vit dans
/// reports.evidence_snapshot, pas dans messages.
export const SQL_MESSAGES_EPHEMERES_EXPIRES = `SELECT m.id, ma.storage_key AS cle_r2 FROM messages m LEFT JOIN message_attachments ma ON ma.message_id = m.id WHERE m.expire_le IS NOT NULL AND m.expire_le <= now()`;

/// Plan de purge à partir des lignes expirées : identifiants
/// des messages à supprimer et clés R2 à effacer, sans doublon.
/// Un message sans pièce n'a pas de clé, il part quand même.
export function planifierPurgeMessagesEphemeres(lignes) {
  const ids = [];
  const clesR2 = [];
  for (const ligne of lignes ?? []) {
    if (ligne?.id && !ids.includes(ligne.id)) ids.push(ligne.id);
    if (ligne?.cle_r2 && !clesR2.includes(ligne.cle_r2)) clesR2.push(ligne.cle_r2);
  }
  return { ids, clesR2 };
}

// ── Modifier ou supprimer un message, 21 nov. 2026, carte 3 ─
// Modifier : l'auteur seulement, message texte seulement, jamais
// un message déjà supprimé. Supprimer : l'auteur, ou la structure
// pour la modération (administrateur général partout,
// administrateur d'établissement sur son établissement
// seulement). Un non participant ne voit jamais le message : 404,
// sans révéler son existence. La suppression met deleted_at, le
// contenu ne part plus au destinataire, mais la preuve figée
// d'un signalement déjà fait reste dans evidence_snapshot.

/// Texte affiché à la place d'un message supprimé.
export const TEXTE_MESSAGE_SUPPRIME = 'Message supprimé';

/// Décision de modification : { ok: true } ou { ok: false,
/// statut, erreur }. [message] porte sender_id, type et
/// deleted_at, ou null quand le message n'existe pas.
export function peutModifierMessage({ message, membreId, estParticipant }) {
  if (!message) return { ok: false, statut: 404, erreur: 'Message introuvable.' };
  if (message.deleted_at) return { ok: false, statut: 409, erreur: 'Ce message est déjà supprimé.' };
  if (!estParticipant) return { ok: false, statut: 404, erreur: 'Message introuvable.' };
  if (message.sender_id !== membreId) return { ok: false, statut: 403, erreur: 'Seul l’auteur peut modifier ce message.' };
  if (message.type !== 'text') return { ok: false, statut: 409, erreur: 'Seul un message texte peut être modifié.' };
  return { ok: true };
}

/// Décision de suppression : mêmes gardes, plus la modération.
/// [role] vaut 'membre', 'admin_general' ou
/// 'admin_etablissement' ; pour ce dernier, l'établissement de
/// l'auteur doit être celui du modérateur.
export function peutSupprimerMessage({ message, membreId, estParticipant, role, etablissementAuteur, etablissementModerateur }) {
  if (!message) return { ok: false, statut: 404, erreur: 'Message introuvable.' };
  if (message.deleted_at) return { ok: false, statut: 409, erreur: 'Ce message est déjà supprimé.' };
  if (message.sender_id === membreId) return { ok: true };
  if (role === 'admin_general') return { ok: true, moderation: true };
  if (role === 'admin_etablissement') {
    if (etablissementAuteur && etablissementAuteur === etablissementModerateur) return { ok: true, moderation: true };
    return { ok: false, statut: 403, erreur: 'Ce message ne relève pas de votre établissement.' };
  }
  if (!estParticipant) return { ok: false, statut: 404, erreur: 'Message introuvable.' };
  return { ok: false, statut: 403, erreur: 'Seul l’auteur peut supprimer ce message.' };
}

/// Ligne de message telle que renvoyée au destinataire : un
/// message supprimé ne montre plus que « Message supprimé »,
/// sans contenu, sans lien audio. Un message intact passe tel quel.
export function masquerMessageSupprime(ligne) {
  if (!ligne || !ligne.deleted_at) return ligne;
  const { audio_url: _audioUrl, cle_audio: _cleAudio, ...reste } = ligne;
  return { ...reste, content: TEXTE_MESSAGE_SUPPRIME };
}

// ── Aide de la structure, 21 nov. 2026, carte 4 ─────────────
// Un canal dédié de clavardage avec la structure, qui reprend le
// moteur de la Messagerie : mêmes tables conversations et
// messages, même envoi, mêmes notifications. Une demande est une
// conversation de type 'aide', créée par POST /aide/demandes,
// avec un motif simple, problème ou abus, stocké dans
// conversations.aide_motif, et un statut suivi côté serveur
// dans conversations.aide_statut : ouvert, en cours, résolu.
// Le statut vit sur la conversation, pas sur une table à part :
// une demande est un fil, son statut est celui du fil. Une
// demande résolue reste lisible, sans nouveau message du membre
// tant qu'il ne l'a pas rouverte, ce qui la repasse en ouvert.

/// Motifs d'une demande d'aide : un problème ou un abus.
export const MOTIFS_AIDE = Object.freeze(['probleme', 'abus']);

/// Statuts d'une demande d'aide, dans l'ordre du suivi.
export const STATUTS_AIDE = Object.freeze(['ouvert', 'en_cours', 'resolu']);

/// Vrai quand le motif est un motif d'aide connu.
export function motifAideValide(motif) {
  return MOTIFS_AIDE.includes(motif);
}

/// Vrai quand le statut est un statut d'aide connu.
export function statutAideValide(statut) {
  return STATUTS_AIDE.includes(statut);
}

/// Titre de la conversation créée pour une demande : le motif en
/// clair, pour que la liste et l'en-tête montrent de quoi il
/// s'agit sans ouvrir le fil.
export function titreDemandeAide(motif) {
  return motif === 'abus' ? 'Aide : Abus' : 'Aide : Problème';
}

/// Libellé court d'un statut d'aide, pour les notifications.
export function libelleStatutAide(statut) {
  if (statut === 'en_cours') return 'En cours';
  if (statut === 'resolu') return 'Résolu';
  return 'Ouvert';
}

/// Vrai quand un message peut être envoyé dans une demande
/// d'aide : toujours, sauf quand elle est résolue et que
/// l'expéditeur n'est pas un responsable. Le membre rouvre
/// d'abord, le responsable peut ajouter un mot de clôture.
export function peutEnvoyerDansAide({ statut, estResponsable }) {
  if (statut !== 'resolu') return true;
  return estResponsable === true;
}

/// Vrai quand le membre peut rouvrir sa demande : seulement
/// quand elle est résolue, et seulement son auteur.
export function peutRouvrirAide({ statut, estDemandeur }) {
  return statut === 'resolu' && estDemandeur === true;
}

/// Vrai quand l'appelant peut changer le statut d'une demande :
/// un responsable seulement, administrateur général partout,
/// administrateur d'établissement sur son établissement
/// seulement. [etablissementDemandeur] est celui du membre qui
/// a ouvert la demande, null quand il n'en a pas.
export function peutChangerStatutAide({ role, etablissementDemandeur, etablissementResponsable }) {
  if (role === 'admin_general') return true;
  if (role === 'admin_etablissement') {
    return etablissementDemandeur !== null && etablissementDemandeur !== undefined
      && etablissementDemandeur === etablissementResponsable;
  }
  return false;
}

/// Ligne de demande telle que renvoyée au client : la
/// conversation, plus le nom du membre qui l'a ouverte quand le
/// serveur le joint. Le motif et le statut sont lus tels quels,
/// null quand la conversation n'est pas une demande d'aide.
export function formaterDemandeAide(ligne) {
  if (!ligne) return ligne;
  return {
    id: ligne.id,
    type: ligne.type ?? 'aide',
    title: ligne.title ?? titreDemandeAide(ligne.aide_motif),
    motif: ligne.aide_motif ?? null,
    statut: ligne.aide_statut ?? 'ouvert',
    demandeur_nom: ligne.demandeur_nom ?? null,
    demandeur_matricule: ligne.demandeur_matricule ?? null,
    created_at: ligne.created_at ?? null,
    last_message_at: ligne.last_message_at ?? null,
  };
}
