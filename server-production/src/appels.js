// Appels audio et vidéo dans la messagerie, 16 nov. 2026, décision
// d'Axel : services exclusivement gratuits, aucun coût.
//
// Architecture verrouillée le 16 nov. 2026 : Render garde le
// backend et la signalisation, sur le même service API déjà en
// ligne (compte cile0225@gmail.com, région Virginia, 7 dollars
// par mois, inchangé). La signalisation passe par un WebSocket
// sur ce service (Fastify, @fastify/websocket, route
// /messagerie/ws) pour la remise instantanée ; la source durable
// reste HTTP (table appels_signaux, l'application interroge aussi
// en repli toutes les 2 secondes pendant l'établissement de
// l'appel). Le WebSocket n'existait pas dans le code de la
// messagerie, qui interrogeait en HTTP toutes les 15 secondes :
// il est construit dans cette tranche, sur le même service, sans
// nouvel hébergeur, sans nouveau coût, trafic de signalisation
// négligeable (petits messages JSON seulement).
//
// Le média WebRTC est direct entre les deux téléphones (pair à
// pair), jamais par le serveur : Render n'expose pas de ports UDP
// publics, le média en a besoin, donc ni LiveKit ni TURN
// auto-hébergé sur Render. STUN gratuit de Google, sans compte.
// TURN gratuit OpenRelay (Metered, 20 Go par mois) en repli quand
// la connexion directe échoue : adresse, identifiant et mot de
// passe par variables d'environnement TURN_URL, TURN_USERNAME,
// TURN_CREDENTIAL, saisies dans Render par Axel ; sans ces
// variables, STUN seul. Aucun secret en dur, jamais dans le dépôt.
// Les appels de groupe restent pour une phase suivante, sur le
// plan gratuit LiveKit Cloud Build (5 000 minutes par mois, 100
// connexions au maximum, coupure au lieu de facturation).
//
// Ce module ne contient que des constantes et des aides pures,
// sans accès base, pour être testé sans serveur ni base.

export const TYPES_APPEL = Object.freeze(['audio', 'video']);

export const TYPES_SIGNAL_APPEL = Object.freeze([
  'offre',
  'reponse',
  'candidat_ice',
  'accepte',
  'refuse',
  'annule',
  'termine',
]);

export const STATUTS_APPEL = Object.freeze([
  'sonne',
  'en_cours',
  'termine',
  'expire',
]);

/// Durée de sonnerie côté application : passé ce délai sans
/// réponse, l'appelant envoie 'annule' et l'appelé envoie
/// 'refuse', l'appel se termine des deux côtés.
export const DUREE_SONNERIE_MS = 30000;

/// Délai au-delà duquel le serveur déclare expiré un appel resté
/// en sonnerie (appelant parti sans annuler, par exemple), lu à
/// chaque lecture de l'appel.
export const DELAI_EXPIRATION_SONNERIE_SECONDES = 60;

/// Délai au-delà duquel le serveur déclare expiré un appel resté
/// en cours (raccroché sans signal de fin, application fermée,
/// connexion perdue) : 10 minutes sans fin. Un appel en cours ne
/// s'expire jamais tout seul sinon, et il bloque chaque nouvel
/// appel de la conversation en 409 pour toujours, 19 nov. 2026.
/// Carte 4, 21 nov. 2026 : 10 minutes au lieu de 30, pour
/// débloquer la conversation après une fermeture sans 'termine'.
/// Le délai court depuis la réponse (repondu_le), pas depuis la
/// dernière activité : un appel plus long que 10 minutes voit sa
/// ligne marquée expirée à la prochaine lecture, son média
/// continue, et un 'termine' envoyé après l'expiration est refusé
/// en 409, sans être relayé. Valeur à confirmer avec Axel.
export const DELAI_EXPIRATION_EN_COURS_SECONDES = 10 * 60;

/// Nouveau statut après un signal, null quand le signal ne change
/// pas le statut (offre, réponse, candidat ICE, ou acceptation
/// d'un appel déjà en cours).
export function statutApresSignal(statut, typeSignal) {
  if (typeSignal === 'accepte' && statut === 'sonne') return 'en_cours';
  if (
    (typeSignal === 'refuse' ||
      typeSignal === 'annule' ||
      typeSignal === 'termine') &&
    (statut === 'sonne' || statut === 'en_cours')
  ) {
    return 'termine';
  }
  return null;
}

/// Vrai si un appel en sonnerie depuis [creeLe] a dépassé le
/// délai d'expiration, à [maintenant] (par défaut maintenant).
export function appelExpire(creeLe, maintenant) {
  const debut = creeLe instanceof Date ? creeLe : new Date(creeLe);
  if (Number.isNaN(debut.getTime())) return false;
  const ref = maintenant instanceof Date ? maintenant : new Date();
  return (
    ref.getTime() - debut.getTime() >
    DELAI_EXPIRATION_SONNERIE_SECONDES * 1000
  );
}

/// Vrai si un appel encore actif doit être déclaré expiré, à
/// [maintenant] (par défaut maintenant) : sonnerie au delà de
/// 60 secondes, appel en cours au delà de 10 minutes depuis sa
/// réponse (sa création si la réponse manque). Les autres statuts
/// ne sont jamais obsolètes.
export function appelObsolete(appel, maintenant) {
  if (!appel) return false;
  if (appel.statut === 'sonne') return appelExpire(appel.cree_le, maintenant);
  if (appel.statut === 'en_cours') {
    const debut = appel.repondu_le ?? appel.cree_le;
    const d = debut instanceof Date ? debut : new Date(debut);
    if (Number.isNaN(d.getTime())) return false;
    const ref = maintenant instanceof Date ? maintenant : new Date();
    return (
      ref.getTime() - d.getTime() >
      DELAI_EXPIRATION_EN_COURS_SECONDES * 1000
    );
  }
  return false;
}

/// Vrai si l'appel est manqué pour [monId] : je suis l'appelé,
/// jamais l'appelant, et l'appel s'est terminé sans réponse
/// (refus, annulation, expiration en sonnerie). Un appel répondu,
/// ou expiré après sa réponse, n'est jamais manqué. Tranche T4,
/// 26 nov. 2026 : l'historique d'appels et son badge rouge.
/// [appel] porte statut, appelant_id et repondu_le.
export function estAppelManque(appel, monId) {
  if (!appel || appel.appelant_id === monId) return false;
  if (appel.repondu_le) return false;
  return appel.statut === 'termine' || appel.statut === 'expire';
}

/// Vrai si le contenu d'un signal est un objet (jamais null, jamais
/// une chaîne, jamais un tableau), pour refuser les contenus
/// malformés avant tout stockage.
function estObjet(valeur) {
  return valeur !== null && typeof valeur === 'object' && !Array.isArray(valeur);
}

/// Normalise le contenu d'un signal selon son type, en ne gardant
/// que les champs connus. Lève une Error avec un message clair
/// quand le contenu est malformé, pour un 400 côté route.
export function normaliserContenuSignal(type, contenu) {
  if (!TYPES_SIGNAL_APPEL.includes(type)) {
    throw new Error('Type de signal inconnu.');
  }
  if (!estObjet(contenu)) {
    throw new Error('Contenu de signal invalide.');
  }
  if (type === 'offre' || type === 'reponse') {
    const sdp = contenu.sdp;
    if (typeof sdp !== 'string' || sdp.trim() === '') {
      throw new Error('Offre ou réponse sans SDP.');
    }
    const attendu = type === 'offre' ? 'offer' : 'answer';
    if (contenu.type !== undefined && contenu.type !== attendu) {
      throw new Error('Type SDP incohérent.');
    }
    return { sdp, type: attendu };
  }
  if (type === 'candidat_ice') {
    const candidat = contenu.candidate;
    if (typeof candidat !== 'string') {
      throw new Error('Candidat ICE sans candidate.');
    }
    const normalise = { candidate: candidat };
    if (typeof contenu.sdpMid === 'string' || contenu.sdpMid === null) {
      normalise.sdpMid = contenu.sdpMid;
    }
    if (
      typeof contenu.sdpMLineIndex === 'number' ||
      contenu.sdpMLineIndex === null
    ) {
      normalise.sdpMLineIndex = contenu.sdpMLineIndex;
    }
    return normalise;
  }
  return {};
}

/// Configuration ICE renvoyée à l'application : STUN gratuit de
/// Google toujours, TURN gratuit OpenRelay en plus seulement quand
/// ses trois variables d'environnement sont renseignées. Sans
/// TURN, les appels passent en direct quand le réseau le permet,
/// et échouent derrière certaines box strictes : c'est la limite
/// honnête du STUN seul, à lever en créant le compte OpenRelay.
export function configIce(env) {
  const serveurs = [{ urls: ['stun:stun.l.google.com:19302'] }];
  const turnUrl = (env?.TURN_URL ?? '').trim();
  const turnUtilisateur = (env?.TURN_USERNAME ?? '').trim();
  const turnMotDePasse = (env?.TURN_CREDENTIAL ?? '').trim();
  if (turnUrl !== '' && turnUtilisateur !== '' && turnMotDePasse !== '') {
    serveurs.push({
      urls: [turnUrl],
      username: turnUtilisateur,
      credential: turnMotDePasse,
    });
  }
  return { iceServers: serveurs };
}
