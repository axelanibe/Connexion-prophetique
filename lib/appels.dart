// Appels audio et vidéo dans la messagerie, 16 nov. 2026.
// Décision d'Axel : services exclusivement gratuits, aucun coût.
// Signalisation par WebSocket sur le même service Render
// (/messagerie/ws, remise instantanée) et par HTTP (source
// durable, repli par interrogation toutes les 2 secondes pendant
// l'établissement). Le média WebRTC est direct entre les deux
// téléphones, jamais par le serveur. Appels à deux seulement,
// depuis une conversation directe.
//
// Ce fichier ne contient que des modèles et des aides pures, sans
// WebRTC ni réseau, pour être testé sans téléphone ni serveur.

/// Types d'appel, mêmes clés que le serveur (src/appels.js).
const typesAppel = ['audio', 'video'];

/// Types de signaux, mêmes clés que le serveur.
const typesSignalAppel = [
  'offre',
  'reponse',
  'candidat_ice',
  'accepte',
  'refuse',
  'annule',
  'termine',
];

/// Durée de sonnerie : passé ce délai sans réponse, l'appelant
/// envoie 'annule' et l'appelé envoie 'refuse', l'appel se
/// termine des deux côtés.
const dureeSonnerieAppel = Duration(seconds: 30);

/// Délai d'interrogation des signaux en repli, quand le
/// WebSocket est indisponible, pendant l'établissement de l'appel.
const delaiRepliSignauxAppel = Duration(seconds: 2);

/// Vérification des appels entrants dans une conversation : toutes
/// les 3 secondes, étape 2, 20 nov. 2026. Avant, l'écran
/// d'appel entrant n'apparaissait que par le rafraîchissement des
/// messages, toutes les 15 secondes, donc jusqu'à 15 secondes de
/// retard. Les messages restent à 15 secondes.
const delaiVerificationAppelEntrant = Duration(seconds: 3);

/// Un appel, tel que renvoyé par le serveur.
class AppelMessagerie {
  final String id;
  final String conversationId;
  final String appelantId;
  final String appelantNom;
  final String? appeleId;
  final String? appeleNom;
  final String type;
  final String statut;
  final DateTime? creeLe;
  final DateTime? reponduLe;

  const AppelMessagerie({
    required this.id,
    required this.conversationId,
    required this.appelantId,
    this.appelantNom = '',
    this.appeleId,
    this.appeleNom,
    this.type = 'audio',
    this.statut = 'sonne',
    this.creeLe,
    this.reponduLe,
  });

  factory AppelMessagerie.fromJson(Map<String, dynamic> json) {
    DateTime? lireDate(Object? valeur) {
      if (valeur == null) return null;
      return DateTime.tryParse(valeur.toString());
    }

    return AppelMessagerie(
      id: (json['id'] ?? '').toString(),
      conversationId: (json['conversation_id'] ?? '').toString(),
      appelantId: (json['appelant_id'] ?? '').toString(),
      appelantNom: (json['appelant_nom'] ?? '').toString(),
      appeleId: (json['appele_id'] as String?),
      appeleNom: (json['appele_nom'] as String?),
      type: (json['type'] ?? 'audio').toString(),
      statut: (json['statut'] ?? 'sonne').toString(),
      creeLe: lireDate(json['cree_le']),
      reponduLe: lireDate(json['repondu_le']),
    );
  }

  bool get estAudio => type != 'video';
  bool get estVideo => type == 'video';
  bool get sonne => statut == 'sonne';
  bool get enCours => statut == 'en_cours';
  bool get termine => statut == 'termine' || statut == 'expire';

  AppelMessagerie copyWith({String? statut, DateTime? reponduLe}) {
    return AppelMessagerie(
      id: id,
      conversationId: conversationId,
      appelantId: appelantId,
      appelantNom: appelantNom,
      appeleId: appeleId,
      appeleNom: appeleNom,
      type: type,
      statut: statut ?? this.statut,
      creeLe: creeLe,
      reponduLe: reponduLe ?? this.reponduLe,
    );
  }
}

/// Un signal d'appel, tel que renvoyé par le serveur : offre SDP,
/// réponse SDP, candidat ICE, acceptation, refus, annulation ou fin.
class SignalAppel {
  final String id;
  final String appelId;
  final String emetteurId;
  final String type;
  final Map<String, dynamic> contenu;
  final DateTime? creeLe;

  const SignalAppel({
    required this.id,
    required this.appelId,
    required this.emetteurId,
    required this.type,
    this.contenu = const {},
    this.creeLe,
  });

  factory SignalAppel.fromJson(Map<String, dynamic> json) {
    final brut = json['contenu'];
    return SignalAppel(
      id: (json['id'] ?? '').toString(),
      appelId: (json['appel_id'] ?? '').toString(),
      emetteurId: (json['emetteur_id'] ?? '').toString(),
      type: (json['type'] ?? '').toString(),
      contenu: brut is Map<String, dynamic>
          ? brut
          : brut is Map
              ? brut.cast<String, dynamic>()
              : const {},
      creeLe: json['cree_le'] == null
          ? null
          : DateTime.tryParse(json['cree_le'].toString()),
    );
  }
}

/// Configuration ICE renvoyée par le serveur : STUN gratuit de
/// Google toujours, TURN OpenRelay en plus quand le compte est
/// configuré côté serveur.
class ConfigIce {
  final List<Map<String, dynamic>> serveurs;

  const ConfigIce({this.serveurs = const []});

  factory ConfigIce.fromJson(Map<String, dynamic> json) {
    // Le serveur renvoie iceServers (camelCase WebRTC) ; on
    // accepte aussi ice_servers, au cas où l'API s'alignerait
    // sur ses autres champs, pour ne jamais perdre le STUN.
    final bruts = json['iceServers'] ?? json['ice_servers'];
    if (bruts is! List) return const ConfigIce();
    final serveurs = <Map<String, dynamic>>[];
    for (final brut in bruts) {
      if (brut is Map<String, dynamic>) {
        serveurs.add(brut);
      } else if (brut is Map) {
        serveurs.add(brut.cast<String, dynamic>());
      }
    }
    return ConfigIce(serveurs: serveurs);
  }

  /// Vrai quand un TURN est configuré en plus du STUN.
  bool get aTurn => serveurs.length > 1;

  Map<String, dynamic> get pourWebRtc => {'iceServers': serveurs};
}

/// Nouveau statut d'un appel après un signal, null quand le signal
/// ne change pas le statut. Miroir de statutApresSignal côté
/// serveur (src/appels.js) : les deux doivent rester identiques.
String? statutAppelApresSignal(String statut, String typeSignal) {
  if (typeSignal == 'accepte' && statut == 'sonne') return 'en_cours';
  if ((typeSignal == 'refuse' ||
          typeSignal == 'annule' ||
          typeSignal == 'termine') &&
      (statut == 'sonne' || statut == 'en_cours')) {
    return 'termine';
  }
  return null;
}

/// Durée d'appel « 04:32 », pour l'écran en cours d'appel.
String dureeAppelFormatee(Duration duree) {
  final total = duree.inSeconds;
  final minutes = (total ~/ 60).toString().padLeft(2, '0');
  final secondes = (total % 60).toString().padLeft(2, '0');
  return '$minutes:$secondes';
}

/// SDP d'une offre ou d'une réponse, ou null si le contenu est
/// malformé (jamais planté, le signal est alors ignoré).
({String sdp, String type})? offreDepuisContenu(Map<String, dynamic> contenu) {
  final sdp = contenu['sdp'];
  final type = contenu['type'];
  if (sdp is! String || sdp.isEmpty) return null;
  if (type != 'offer' && type != 'answer') return null;
  return (sdp: sdp, type: type);
}

/// Candidat ICE d'un signal, ou null si le contenu est malformé
/// (jamais planté, le signal est alors ignoré).
({String candidate, String? sdpMid, int? sdpMLineIndex})?
    candidatIceDepuisContenu(Map<String, dynamic> contenu) {
  final candidat = contenu['candidate'];
  if (candidat is! String) return null;
  final sdpMid = contenu['sdpMid'];
  final sdpMLineIndex = contenu['sdpMLineIndex'];
  return (
    candidate: candidat,
    sdpMid: sdpMid is String ? sdpMid : null,
    sdpMLineIndex: sdpMLineIndex is int ? sdpMLineIndex : null,
  );
}
