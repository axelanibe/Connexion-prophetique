// Messagerie et signalement, 16 nov. 2026, lot application.
// Port du module e-System (spécification v2, sections 2, 6, 10, 11),
// adapté à CONNEXION PROPHÉTIQUE : une seule structure, pas de
// church_id, pas de WebSocket côté serveur (interrogation HTTP
// toutes les 15 secondes quand la conversation est ouverte),
// palette bleu nuit et or. Les routes /messagerie/* relèvent du
// lot serveur (T-Msg-0) : sans elles, les écrans affichent un état
// d'erreur avec réessai, jamais de données fictives.
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'api.dart';
import 'i18n.dart';

/// Types de conversation créables. La pastorale confidentielle
/// est créée par le membre ou le responsable pastoral, le serveur
/// la renvoie, l'application ne la propose pas à la création.
const typesConversationMessagerie = [
  'directe',
  'groupe_etablissement',
  'groupe_structure',
];

/// Libellé court d'un type de conversation.
String libelleTypeConversation(String type) {
  switch (type) {
    case 'directe':
      return 'Directe';
    case 'groupe_etablissement':
      return 'Groupe';
    case 'groupe_structure':
      return 'Canal de la structure';
    case 'pastorale':
      return 'Pastorale';
    case 'moderation':
      return 'Modération';
    case 'aide':
      return 'Aide de la structure';
    default:
      return 'Conversation';
  }
}

/// Pastille éphémère, 21 nov. 2026, carte 3 : « Éphémère · 7 j »
/// quand le mode est actif, vide quand il est désactivé.
String libelleEphemere(int? jours) {
  if (jours == null) return '';
  return 'Éphémère · $jours j';
}

/// Motifs de signalement, spécification v2, section 5.1, décision
/// d'Axel du 16 nov. 2026 : l'erreur doctrinale enseignée est signalable, pas un simple désaccord.
const motifsSignalement = [
  'harcelement',
  'propos_haineux',
  'menace',
  'desinformation',
  'spam',
  'securite_enfant',
  'erreur_doctrinale',
  'trafic_influence',
  'mauvaise_gestion_finances',
  'autre',
];

/// Libellé court d'un motif de signalement. Accepte aussi les clés
/// anglaises renvoyées par le serveur, même libellé.
String libelleMotifSignalement(String motif) {
  switch (motif) {
    case 'harcelement':
    case 'harassment':
      return 'Harcèlement';
    case 'propos_haineux':
    case 'hate_speech':
      return 'Propos haineux';
    case 'menace':
    case 'threat':
      return 'Menace';
    case 'desinformation':
    case 'misinformation':
      return 'Informations trompeuses';
    case 'spam':
      return 'Spam';
    case 'securite_enfant':
    case 'child_safety':
      return 'Sécurité d’un enfant';
    case 'erreur_doctrinale':
    case 'doctrinal_error':
      return 'Erreur doctrinale';
    case 'trafic_influence':
    case 'influence_peddling':
      return 'Trafic d’influence';
    case 'mauvaise_gestion_finances':
    case 'financial_mismanagement':
      return 'Mauvaise gestion des finances';
    case 'autre':
    case 'other':
      return 'Autre';
    default:
      return 'Signalement';
  }
}

/// Destinataires d'un signalement, spécification v2, section 5.1.
/// En CONNEXION PROPHÉTIQUE, une seule structure : l'escalade vers
/// l'église mère devient l'administrateur général.
const destinatairesSignalement = [
  'etablissement',
  'administrateur_general',
];

String libelleDestinataireSignalement(String destinataire) {
  switch (destinataire) {
    case 'administrateur_general':
      return 'Administrateur général';
    default:
      return 'Mon établissement';
  }
}

/// Phrase de visibilité, spécification v2, section 5.3, affichée
/// avant l'envoi du signalement. Le rapporteur est informé de qui
/// verra son signalement, avant d'envoyer.
String phraseVisibiliteSignalement(String destinataire, String motif) {
  if (motif == 'securite_enfant') {
    return 'Ce signalement est transmis au référent protection de l’enfance, hors du circuit ordinaire, quel que soit le destinataire choisi. La personne signalée ne verra jamais votre nom.';
  }
  if (destinataire == 'administrateur_general') {
    return 'L’administrateur général verra votre nom. Votre établissement saura seulement qu’un signalement a été transmis, sans en recevoir le contenu. La personne signalée ne verra jamais votre nom.';
  }
  return 'Les modérateurs de votre établissement verront votre nom. La personne signalée ne verra jamais votre nom.';
}

/// Statuts d'un signalement, spécification v2, section 3.
String libelleStatutSignalement(String statut) {
  switch (statut) {
    case 'en_attente':
      return 'En attente';
    case 'en_cours':
      return 'En cours';
    case 'resolu':
      return 'Résolu';
    case 'rejete':
      return 'Rejeté';
    case 'escalade':
      return 'Transmis';
    case 'conteste':
      return 'Contesté';
    default:
      return statut;
  }
}

/// Actions de modération, spécification v2, section 5.4. Chaque
/// action exige une note motivée. L'escalade n'existe pas ici :
/// l'administrateur général est déjà la dernière instance de la
/// structure, le transfert en cas de conflit d'intérêts passe par
/// le bouton dédié, pas par une action.
const actionsModeration = ['rejeter', 'avertir', 'sourdine', 'suspendre'];

String libelleActionModeration(String action) {
  switch (action) {
    case 'rejeter':
      return 'Rejeter';
    case 'avertir':
      return 'Avertir';
    case 'sourdine':
      return 'Mettre en sourdine';
    case 'suspendre':
      return 'Suspendre la messagerie';
    default:
      return action;
  }
}

/// Durées de sourdine ou de suspension, en heures, proposées par
/// l'écran de modération. Le serveur applique la durée choisie.
const dureesModerationHeures = [24, 168, 720];

// ── Aide de la structure, 21 nov. 2026, carte 4 ─────────────
// Un canal dédié de clavardage avec la structure, qui reprend le
// moteur de la Messagerie : une demande est une conversation de
// type 'aide', motif simple, problème ou abus, et statut suivi
// côté serveur : ouvert, en cours, résolu. Une demande résolue
// reste lisible, sans nouveau message du membre tant qu'il ne
// l'a pas rouverte.

/// Motifs d'une demande d'aide.
const motifsAide = ['probleme', 'abus'];

/// Statuts d'une demande d'aide, dans l'ordre du suivi.
const statutsAide = ['ouvert', 'en_cours', 'resolu'];

/// Libellé court d'un motif d'aide.
String libelleMotifAide(String motif) {
  switch (motif) {
    case 'abus':
      return 'Abus';
    default:
      return 'Problème';
  }
}

/// Libellé court d'un statut d'aide.
String libelleStatutAide(String statut) {
  switch (statut) {
    case 'en_cours':
      return 'En cours';
    case 'resolu':
      return 'Résolu';
    default:
      return 'Ouvert';
  }
}

/// Une demande d'aide, telle que renvoyée par le serveur : la
/// conversation de type 'aide', son motif, son statut, et le nom
/// du membre qui l'a ouverte quand le serveur le joint.
class DemandeAide {
  final String id;
  final String motif;
  final String statut;
  final String? titre;
  final String? demandeurNom;
  final String? demandeurMatricule;
  final DateTime? createdAt;
  final DateTime? lastMessageAt;

  const DemandeAide({
    required this.id,
    required this.motif,
    required this.statut,
    this.titre,
    this.demandeurNom,
    this.demandeurMatricule,
    this.createdAt,
    this.lastMessageAt,
  });

  factory DemandeAide.fromJson(Map<String, dynamic> json) {
    DateTime? lireDate(Object? valeur) {
      if (valeur == null) return null;
      return DateTime.tryParse(valeur.toString());
    }

    return DemandeAide(
      id: (json['id'] ?? '').toString(),
      motif: (json['motif'] ?? json['aide_motif'] ?? 'probleme').toString(),
      statut: (json['statut'] ?? json['aide_statut'] ?? 'ouvert').toString(),
      titre: (json['title'] ?? json['titre']) as String?,
      demandeurNom: json['demandeur_nom'] as String?,
      demandeurMatricule: json['demandeur_matricule'] as String?,
      createdAt: lireDate(json['created_at']),
      lastMessageAt: lireDate(json['last_message_at']),
    );
  }

  /// Vrai quand la demande est résolue : lisible, sans nouveau
  /// message du membre tant qu'il ne l'a pas rouverte.
  bool get resolue => statut == 'resolu';

  /// La demande comme conversation de messagerie, pour ouvrir le
  /// fil avec l'écran de conversation existant.
  ConversationMessagerie toConversation() {
    return ConversationMessagerie(
      id: id,
      type: 'aide',
      title: titre ?? (motif == 'abus' ? 'Aide : Abus' : 'Aide : Problème'),
      createdAt: createdAt,
      lastMessageAt: lastMessageAt,
      aideStatut: statut,
      aideMotif: motif,
    );
  }
}

String libelleDureeModeration(int heures) {
  switch (heures) {
    case 24:
      return '24 heures';
    case 168:
      return '7 jours';
    case 720:
      return '30 jours';
    default:
      return '$heures heures';
  }
}

/// Délai de recours, spécification v2, section 5.5 : 15 jours pour
/// contester une sanction, 30 jours pour répondre. Le délai de
/// réponse relève du serveur ; le client n'applique que le délai
/// de contestation.
const delaiRecoursJours = 15;

/// Vrai si une sanction du [dateSanction] peut encore être
/// contestée à [maintenant] (15 jours, spécification v2, 5.5).
bool peutContester(DateTime dateSanction, [DateTime? maintenant]) {
  final maintenantReel = maintenant ?? DateTime.now();
  return maintenantReel.isBefore(
    dateSanction.add(const Duration(days: delaiRecoursJours)),
  );
}

/// Jours entiers restants pour contester, 0 quand le délai est
/// dépassé. Un reste de quelques heures compte pour 0 jour, la
/// contestation reste possible tant que [peutContester] est vrai.
int joursRestantsRecours(DateTime dateSanction, [DateTime? maintenant]) {
  final maintenantReel = maintenant ?? DateTime.now();
  final reste = dateSanction
      .add(const Duration(days: delaiRecoursJours))
      .difference(maintenantReel);
  if (reste.isNegative) return 0;
  return reste.inDays;
}

/// Une conversation de messagerie, telle que renvoyée par le serveur.
/// [dernierMessage] et [nonLus] sont calculés côté client (voir
/// l'en-tête du fichier) ; [maSanction] est lu quand le serveur le
/// renvoie, sinon la conversation reste ouverte normalement.
class ConversationMessagerie {
  final String id;
  final String type;
  final String? title;
  final DateTime? createdAt;
  final DateTime? lastMessageAt;

  /// Contenu du dernier message, calculé côté client (null tant que
  /// les messages n'ont pas été lus).
  final String? dernierMessage;

  /// Nombre de messages non lus, calculé côté client.
  final int nonLus;

  /// Réponses désactivées (canal de la structure) : la saisie est
  /// alors masquée et une note s'affiche.
  final bool reponsesDesactivees;

  /// Sanction qui me concerne sur cette conversation, quand le
  /// serveur la renvoie ('sourdine' ou 'suspendre'), sinon null.
  final String? maSanction;

  /// Fin de ma sanction sur cette conversation, quand le serveur
  /// la renvoie, sinon null.
  final DateTime? sanctionJusqua;

  /// Autre participant d'une conversation directe, 18 nov. 2026 :
  /// nom complet, matricule et photo (data URL) renvoyés par la
  /// route liste. Null pour les groupes et la pastorale, et pour
  /// une directe dont l'autre membre n'est pas connu.
  final String? autreNom;
  final String? autreMatricule;
  final String? autrePhoto;

  /// Conversation marquée en favori par moi, 18 nov. 2026 : le
  /// favori est posé sur ma participation seulement, il ne se
  /// voit que par moi.
  final bool estFavori;

  /// Messages éphémères, 21 nov. 2026, carte 3 : durée en jours
  /// quand le mode est actif sur cette conversation privée,
  /// null quand il est désactivé. Jamais sur un groupe.
  final int? ephemere;

  /// Aide de la structure, 21 nov. 2026, carte 4 : statut de la
  /// demande, ouvert, en cours ou résolu, et son motif, problème
  /// ou abus. Null quand la conversation n'est pas une demande.
  final String? aideStatut;
  final String? aideMotif;

  const ConversationMessagerie({
    required this.id,
    required this.type,
    this.title,
    this.createdAt,
    this.lastMessageAt,
    this.dernierMessage,
    this.nonLus = 0,
    this.reponsesDesactivees = false,
    this.maSanction,
    this.sanctionJusqua,
    this.autreNom,
    this.autreMatricule,
    this.autrePhoto,
    this.estFavori = false,
    this.ephemere,
    this.aideStatut,
    this.aideMotif,
  });

  factory ConversationMessagerie.fromJson(Map<String, dynamic> json) {
    DateTime? lireDate(Object? valeur) {
      if (valeur == null) return null;
      return DateTime.tryParse(valeur.toString());
    }

    return ConversationMessagerie(
      id: (json['id'] ?? '').toString(),
      type: (json['type'] ?? 'directe').toString(),
      title: json['title'] as String?,
      createdAt: lireDate(json['created_at']),
      lastMessageAt: lireDate(json['last_message_at']),
      reponsesDesactivees:
          json['reponses_desactivees'] as bool? ??
          json['replies_disabled'] as bool? ??
          false,
      maSanction: json['ma_sanction'] as String?,
      sanctionJusqua: lireDate(json['sanction_jusqua']),
      autreNom: (json['autre'] is Map ? json['autre']['nom'] : json['autre_nom']) as String?,
      autreMatricule: (json['autre'] is Map ? json['autre']['matricule'] : json['autre_matricule']) as String?,
      autrePhoto: (json['autre'] is Map ? json['autre']['photo'] : json['autre_photo']) as String?,
      estFavori: json['est_favori'] as bool? ?? false,
      ephemere: (json['ephemere'] as num?)?.toInt(),
      aideStatut: (json['aide_statut'] ?? json['statut']) as String?,
      aideMotif: (json['aide_motif'] ?? json['motif']) as String?,
    );
  }

  ConversationMessagerie copyWith({
    String? dernierMessage,
    int? nonLus,
    bool? reponsesDesactivees,
    String? maSanction,
    DateTime? sanctionJusqua,
    String? autreNom,
    String? autreMatricule,
    String? autrePhoto,
    bool? estFavori,
    int? ephemere,
    String? aideStatut,
    String? aideMotif,
  }) {
    return ConversationMessagerie(
      id: id,
      type: type,
      title: title,
      createdAt: createdAt,
      lastMessageAt: lastMessageAt,
      dernierMessage: dernierMessage ?? this.dernierMessage,
      nonLus: nonLus ?? this.nonLus,
      reponsesDesactivees:
          reponsesDesactivees ?? this.reponsesDesactivees,
      maSanction: maSanction ?? this.maSanction,
      sanctionJusqua: sanctionJusqua ?? this.sanctionJusqua,
      autreNom: autreNom ?? this.autreNom,
      autreMatricule: autreMatricule ?? this.autreMatricule,
      autrePhoto: autrePhoto ?? this.autrePhoto,
      estFavori: estFavori ?? this.estFavori,
      ephemere: ephemere ?? this.ephemere,
      aideStatut: aideStatut ?? this.aideStatut,
      aideMotif: aideMotif ?? this.aideMotif,
    );
  }

  /// Vrai pour un groupe (établissement ou structure), faux pour
  /// une directe ou une pastorale.
  bool get estGroupe =>
      type == 'groupe_etablissement' || type == 'groupe_structure';

  /// Vrai quand cette conversation est une demande d'aide.
  bool get estAide => type == 'aide';

  /// Vrai quand la demande d'aide est résolue.
  bool get aideResolue => aideStatut == 'resolu';
}

/// Un message texte d'une conversation.
class MessageMessagerie {
  final String id;
  final String conversationId;
  final String senderId;
  final String? senderNom;
  final String content;
  final String type;
  final DateTime? createdAt;

  /// Dernière modification, 21 nov. 2026, carte 3 : non null
  /// quand l'auteur a modifié son message texte.
  final DateTime? editedAt;

  /// Suppression pour tout le monde, 21 nov. 2026, carte 3 :
  /// non null quand le message est supprimé, son contenu ne
  /// part plus à personne, il s'affiche « Message supprimé ».
  final DateTime? deletedAt;

  /// Disparition éphémère, 21 nov. 2026, carte 3 : non null
  /// quand le message disparaît, 7 jours après l'envoi par défaut.
  final DateTime? expireLe;

  /// Vrai quand le message est supprimé pour tout le monde.
  bool get supprime => deletedAt != null;

  /// Vrai quand le message a été modifié par son auteur.
  bool get modifie => editedAt != null;

  /// Lien signé temporaire vers le son, messages vocaux
  /// seulement, 18 nov. 2026.
  final String? audioUrl;

  /// Durée du message vocal, en secondes.
  final int? dureeSecondes;

  const MessageMessagerie({
    required this.id,
    required this.conversationId,
    required this.senderId,
    this.senderNom,
    required this.content,
    this.type = 'text',
    this.createdAt,
    this.editedAt,
    this.deletedAt,
    this.expireLe,
    this.audioUrl,
    this.dureeSecondes,
  });

  factory MessageMessagerie.fromJson(Map<String, dynamic> json) {
    DateTime? lireDate(Object? valeur) {
      if (valeur == null) return null;
      return DateTime.tryParse(valeur.toString());
    }

    return MessageMessagerie(
      id: (json['id'] ?? '').toString(),
      conversationId: (json['conversation_id'] ?? '').toString(),
      senderId: (json['sender_id'] ?? '').toString(),
      senderNom:
          (json['sender_nom'] ?? json['expediteur_nom']) as String?,
      content: (json['content'] ?? '').toString(),
      type: (json['type'] ?? 'text').toString(),
      createdAt: lireDate(json['created_at']),
      editedAt: lireDate(json['edited_at']),
      deletedAt: lireDate(json['deleted_at']),
      expireLe: lireDate(json['expire_le']),
      audioUrl: json['audio_url'] as String?,
      dureeSecondes: (json['duree_secondes'] as num?)?.toInt(),
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'conversation_id': conversationId,
    'sender_id': senderId,
    'content': content,
    'type': type,
    'created_at': createdAt?.toIso8601String(),
    if (editedAt != null) 'edited_at': editedAt!.toIso8601String(),
    if (deletedAt != null) 'deleted_at': deletedAt!.toIso8601String(),
    if (expireLe != null) 'expire_le': expireLe!.toIso8601String(),
    if (audioUrl != null) 'audio_url': audioUrl,
    if (dureeSecondes != null) 'duree_secondes': dureeSecondes,
  };
}

/// Un membre de la structure, tel que renvoyé par la route
/// /messagerie/membres pour le choix des participants. Seuls le
/// nom, le matricule et l'établissement servent à l'affichage ; le
/// drapeau mineur n'est jamais renvoyé ni affiché ici, le serveur
/// applique la règle de la section 7.1 et refuse une directe
/// interdite avec un message clair.
class MembreMessagerie {
  final String id;
  final String nomComplet;
  final String matricule;
  final String etablissement;

  const MembreMessagerie({
    required this.id,
    required this.nomComplet,
    required this.matricule,
    required this.etablissement,
  });

  factory MembreMessagerie.fromJson(Map<String, dynamic> json) {
    return MembreMessagerie(
      id: (json['id'] ?? '').toString(),
      nomComplet:
          (json['nom_complet'] ?? json['nom'] ?? '').toString(),
      matricule: (json['matricule'] ?? '').toString(),
      etablissement: (json['etablissement'] ?? '').toString(),
    );
  }
}

/// Un signalement, tel que renvoyé par le serveur. Le contexte
/// figé ([evidence]) est la copie du contenu au moment du
/// signalement : une suppression ultérieure par l'auteur ne fait
/// pas disparaître la preuve (spécification v2, section 1).
class Signalement {
  final String id;
  final String cibleType;
  final String cibleId;
  final String motif;
  final String? description;
  final String statut;
  final String? routedTo;
  final String? rapporteurNom;
  final String? rapporteurMatricule;
  final DateTime? createdAt;
  final DateTime? resolvedAt;
  final String? notesResolution;

  /// Preuve figée : contenu visé, auteur et date au moment du
  /// signalement. Lecture seule, jamais modifiable.
  final Map<String, dynamic>? evidence;

  const Signalement({
    required this.id,
    required this.cibleType,
    required this.cibleId,
    required this.motif,
    this.description,
    required this.statut,
    this.routedTo,
    this.rapporteurNom,
    this.rapporteurMatricule,
    this.createdAt,
    this.resolvedAt,
    this.notesResolution,
    this.evidence,
  });

  factory Signalement.fromJson(Map<String, dynamic> json) {
    DateTime? lireDate(Object? valeur) {
      if (valeur == null) return null;
      return DateTime.tryParse(valeur.toString());
    }

    final evidenceBrut = json['evidence_snapshot'] ?? json['evidence'];
    return Signalement(
      id: (json['id'] ?? '').toString(),
      cibleType: (json['target_type'] ?? json['cible_type'] ?? '').toString(),
      cibleId: (json['target_id'] ?? json['cible_id'] ?? '').toString(),
      motif: (json['reason'] ?? json['motif'] ?? 'autre').toString(),
      description: json['description'] as String?,
      statut: (json['status'] ?? json['statut'] ?? 'en_attente').toString(),
      routedTo: (json['routed_to'] ?? json['destinataire']) as String?,
      rapporteurNom:
          (json['rapporteur_nom'] ?? json['reporter_nom']) as String?,
      rapporteurMatricule:
          (json['rapporteur_matricule'] ?? json['reporter_matricule'])
              as String?,
      createdAt: lireDate(json['created_at']),
      resolvedAt: lireDate(json['resolved_at']),
      notesResolution:
          (json['resolution_notes'] ?? json['notes_resolution']) as String?,
      evidence: evidenceBrut is Map<String, dynamic>
          ? evidenceBrut
          : evidenceBrut is Map
              ? evidenceBrut.cast<String, dynamic>()
              : null,
    );
  }

  /// Contenu figé du message ou de la conversation signalée.
  String get evidenceContenu =>
      (evidence?['content'] ?? evidence?['contenu'] ?? '').toString();

  /// Auteur du contenu figé, quand le serveur le renvoie.
  String get evidenceAuteur =>
      (evidence?['sender_nom'] ??
              evidence?['auteur'] ??
              evidence?['auteur_nom'] ??
              '')
          .toString();

  /// Date du contenu figé, quand le serveur la renvoie.
  DateTime? get evidenceDate {
    final brut = evidence?['created_at'] ?? evidence?['date'];
    if (brut == null) return null;
    return DateTime.tryParse(brut.toString());
  }
}

/// Une sanction qui me concerne, telle que renvoyée par le serveur,
/// avec son action de modération d'origine pour le recours.
class SanctionMessagerie {
  final String id;
  final String signalementId;
  final String actionId;
  final String action;
  final String? notes;
  final DateTime? date;

  const SanctionMessagerie({
    required this.id,
    required this.signalementId,
    required this.actionId,
    required this.action,
    this.notes,
    this.date,
  });

  factory SanctionMessagerie.fromJson(Map<String, dynamic> json) {
    DateTime? lireDate(Object? valeur) {
      if (valeur == null) return null;
      return DateTime.tryParse(valeur.toString());
    }

    return SanctionMessagerie(
      id: (json['id'] ?? '').toString(),
      signalementId:
          (json['report_id'] ?? json['signalement_id'] ?? '').toString(),
      actionId:
          (json['moderation_action_id'] ?? json['action_id'] ?? '')
              .toString(),
      action: (json['action'] ?? '').toString(),
      notes: json['notes'] as String?,
      date: lireDate(json['created_at'] ?? json['date']),
    );
  }

  /// Vrai tant que le délai de recours de 15 jours court.
  bool get contestable =>
      date != null && peutContester(date!);
}

/// Nombre de messages non lus : envoyés par un autre membre, après
/// la dernière lecture [luLe] (null = jamais lu, tout compte).
/// Les messages sans date ne comptent pas, ils sont déjà affichés.
int compterMessagesNonLus(
  List<MessageMessagerie> messages,
  String? monMembreId,
  DateTime? luLe,
) {
  var total = 0;
  for (final message in messages) {
    if (monMembreId != null && message.senderId == monMembreId) continue;
    final date = message.createdAt;
    if (date == null) continue;
    if (luLe == null || date.isAfter(luLe)) total++;
  }
  return total;
}

/// Aperçu d'un message dans la liste des conversations : un appel
/// manqué ne montre jamais son contenu brut (le type d'appel,
/// 'audio' ou 'video'), mais son libellé, selon qui lit : l'appelé
/// voit « Appel manqué », l'appelant « Appel sans réponse ».
String apercuMessage(MessageMessagerie message, String? monMembreId) {
  // Message supprimé, 21 nov. 2026, carte 3 : l'aperçu ne montre
  // plus que « Message supprimé », jamais le contenu d'origine.
  if (message.supprime) return tr('Message supprimé');
  if (message.type == 'appel_manque') {
    return message.senderId == monMembreId
        ? tr('Appel sans réponse')
        : tr('Appel manqué');
  }
  return message.content;
}

/// Messages masqués pour moi, 21 nov. 2026, carte 3 : une
/// suppression « pour moi » ne touche pas le serveur, elle cache
/// le message sur cet appareil seulement, dans les préférences
/// partagées, par conversation. Les autres participants le voient
/// toujours, et la preuve d'un signalement reste intacte.
Future<Set<String>> lireMessagesMasques(String conversationId) async {
  try {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getStringList('messages_masques_$conversationId')?.toSet() ?? {};
  } catch (_) {
    return {};
  }
}

/// Masque un message pour moi, sur cet appareil seulement.
Future<void> masquerMessagePourMoi(String conversationId, String messageId) async {
  try {
    final prefs = await SharedPreferences.getInstance();
    final ids = prefs.getStringList('messages_masques_$conversationId') ?? [];
    if (!ids.contains(messageId)) {
      ids.add(messageId);
      await prefs.setStringList('messages_masques_$conversationId', ids);
    }
  } catch (_) {
    // Le masquage est perdu, le message reste visible.
  }
}

/// Heure courte d'une date : « 14:32 » aujourd'hui, « 12/11 » sinon.
String heureCourteConversation(DateTime? date) {
  if (date == null) return '';
  final locale = date.toLocal();
  final maintenant = DateTime.now();
  final hh = locale.hour.toString().padLeft(2, '0');
  final mm = locale.minute.toString().padLeft(2, '0');
  if (locale.year == maintenant.year &&
      locale.month == maintenant.month &&
      locale.day == maintenant.day) {
    return '$hh:$mm';
  }
  return '${locale.day.toString().padLeft(2, '0')}/'
      '${locale.month.toString().padLeft(2, '0')}';
}

/// Date courte « 12/11/2026 à 14:32 », pour les files et les preuves.
String dateCourteConversation(DateTime? date) {
  if (date == null) return '';
  final locale = date.toLocal();
  return '${locale.day.toString().padLeft(2, '0')}/'
      '${locale.month.toString().padLeft(2, '0')}/'
      '${locale.year} à '
      '${locale.hour.toString().padLeft(2, '0')}:'
      '${locale.minute.toString().padLeft(2, '0')}';
}

/// Initiales d'un nom, pour l'avatar neutre d'une conversation.
String initialesNom(String nom) {
  final mots = nom.split(' ').where((m) => m.isNotEmpty).toList();
  if (mots.isEmpty) return '?';
  if (mots.length == 1) return mots.first[0].toUpperCase();
  return (mots.first[0] + mots.last[0]).toUpperCase();
}

/// Dernière lecture locale par conversation.
///
/// Le serveur ne renvoie pas de nombre de non lus et n'expose pas
/// de route pour marquer une conversation comme lue : le client
/// persiste la date de sa dernière lecture sur l'appareil, dans
/// les préférences partagées, et en déduit les non lus. Les dates
/// de lecture ne sont pas un contenu sensible ; elles restent sur
/// l'appareil, jamais envoyées au serveur. Un compteur serveur
/// exact viendra avec la tranche serveur suivante ; en attendant,
/// le badge ne compte que ce que le client a vu passer.
///
/// Singleton : une seule carte en mémoire, partagée par la liste,
/// la conversation et la tuile de Plus. Les lectures et écritures
/// du stockage sont protégées : un échec ne bloque jamais l'écran,
/// la carte en mémoire reste la référence.
class MessagerieLectureService {
  static final MessagerieLectureService instance =
      MessagerieLectureService._();

  MessagerieLectureService._();

  /// Constructeur de test : même comportement, sans singleton.
  MessagerieLectureService.pourTests();

  final Map<String, DateTime> _lus = {};
  bool _charge = false;

  /// Nombre de conversations avec un message non lu, pour le badge
  /// de la tuile Messagerie dans Plus. Mis à jour par la liste et
  /// par la conversation quand une lecture est marquée.
  final ValueNotifier<int> nonLusNotifier = ValueNotifier<int>(0);

  static const _prefixeCle = 'messagerie_lu_';

  /// Charge les lectures persistées (une seule fois). Jamais d'erreur.
  /// Le délai protège l'écran si le stockage ne répond pas : passé
  /// ce délai, on repart d'une carte vide pour la session, sans
  /// bloquer l'écran.
  Future<void> charger() async {
    if (_charge) return;
    _charge = true;
    try {
      final prefs = await SharedPreferences.getInstance()
          .timeout(const Duration(seconds: 2));
      for (final cle in prefs.getKeys()) {
        if (!cle.startsWith(_prefixeCle)) continue;
        final date = DateTime.tryParse(prefs.getString(cle) ?? '');
        if (date != null) {
          _lus[cle.substring(_prefixeCle.length)] = date;
        }
      }
    } catch (_) {
      // Sans stockage lisible, on repart d'une carte vide.
    }
  }

  /// Date de dernière lecture d'une conversation (null = jamais lue).
  DateTime? luLe(String conversationId) => _lus[conversationId];

  /// Marque une conversation comme lue à [date] (par défaut
  /// maintenant). Met à jour le badge de Plus quand [conversations]
  /// est fourni, sinon le badge est recalculé au prochain chargement
  /// de la liste.
  Future<void> marquerLu(
    String conversationId, [
    DateTime? date,
    List<ConversationMessagerie>? conversations,
  ]) async {
    final moment = date ?? DateTime.now();
    _lus[conversationId] = moment;
    if (conversations != null) {
      recalculerNonLus(conversations);
    }
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(
        '$_prefixeCle$conversationId',
        moment.toIso8601String(),
      );
    } catch (_) {
      // La carte en mémoire reste valable pour la session.
    }
  }

  /// Nombre de conversations avec un message plus récent que la
  /// dernière lecture. Ne demande aucun chargement de messages.
  int compterConversationsNonLues(
    List<ConversationMessagerie> conversations,
  ) {
    var total = 0;
    for (final conversation in conversations) {
      final dernier = conversation.lastMessageAt;
      if (dernier == null) continue;
      final lu = _lus[conversation.id];
      if (lu == null || dernier.isAfter(lu)) total++;
    }
    return total;
  }

  /// Recalcule et publie le badge de la tuile Messagerie dans Plus.
  void recalculerNonLus(List<ConversationMessagerie> conversations) {
    nonLusNotifier.value = compterConversationsNonLues(conversations);
  }

  bool _badgeCharge = false;

  /// Charge le badge de la tuile Messagerie dans Plus, une seule
  /// fois par session, sans ouvrir la liste. Ne fait rien sans
  /// membre connecté, et ne bloque jamais l'écran en cas d'échec.
  /// La liste recalcule le badge à chaque ouverture ensuite.
  Future<void> chargerBadge(ApiClient apiClient) async {
    if (_badgeCharge) return;
    _badgeCharge = true;
    if (!apiClient.isConnected) return;
    try {
      await charger();
      final bruts = await apiClient.fetchConversationsMessagerie();
      final liste =
          bruts.map(ConversationMessagerie.fromJson).toList();
      recalculerNonLus(liste);
    } catch (_) {
      // Sans serveur, la tuile s'affiche sans badge.
    }
  }

  /// Remise à zéro (tests uniquement).
  void reinitialiserPourTests() {
    _lus.clear();
    _charge = false;
    _badgeCharge = false;
    nonLusNotifier.value = 0;
  }
}
