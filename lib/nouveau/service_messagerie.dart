// Nouvelle Messagerie, tranche T4, 26 nov. 2026.
// ServiceMessagerie branché sur ApiClient et sur les aides
// existantes de lib/messagerie.dart : aperçu du dernier message
// et non lus calculés côté client, comme l'ancienne liste, la
// route liste ne renvoyant ni aperçu ni non lus. Les lectures
// ne font qu'appeler des GET, jamais d'écriture en base, sauf
// l'envoi d'un message, la création d'une conversation, un
// appel et un signalement, qui sont des actions de l'utilisateur.
import '../api.dart';
import '../messagerie.dart';
import 'modeles_messagerie.dart';

class ServiceMessagerieApi implements ServiceMessagerie {
  ServiceMessagerieApi(this._api);
  final ApiClient _api;

  @override
  Future<String?> monMembreId() async {
    try {
      final moi = await _api.fetchMoi();
      final id = moi['id'] ?? moi['membre_id'] ?? moi['member_id'];
      return id?.toString();
    } catch (_) {
      return null;
    }
  }

  @override
  Future<List<ConversationMessagerie>> chargerConversations() async {
    final brutes = await _api.fetchConversationsMessagerie();
    final monId = await monMembreId();
    final lecture = MessagerieLectureService.instance;
    try {
      await lecture.charger();
    } catch (_) {}
    final enrichies = <ConversationMessagerie>[];
    for (final brut in brutes) {
      final conversation = ConversationMessagerie.fromJson(brut);
      try {
        final messages = await _api.fetchMessagesConversation(
          conversation.id,
          limit: 100,
        );
        final liste =
            messages.map(MessageMessagerie.fromJson).toList();
        enrichies.add(
          conversation.copyWith(
            dernierMessage: liste.isEmpty
                ? null
                : apercuMessage(liste.last, monId),
            nonLus: compterMessagesNonLus(
              liste,
              monId,
              lecture.luLe(conversation.id),
            ),
          ),
        );
      } catch (_) {
        enrichies.add(conversation);
      }
    }
    lecture.recalculerNonLus(enrichies);
    return enrichies;
  }

  @override
  Future<Map<String, bool>> chargerPresence(
      List<ConversationMessagerie> conversations) async {
    final enLigne = <String, bool>{};
    for (final c in conversations) {
      if (c.type != 'directe') continue;
      try {
        final presence = await _api.fetchPresenceConversation(c.id);
        enLigne[c.id] = presence['en_ligne'] == true;
      } catch (_) {
        enLigne[c.id] = false;
      }
    }
    return enLigne;
  }

  @override
  Future<List<AppelMessagerie>> chargerAppels() async {
    final liste = await _api.fetchHistoriqueAppels();
    return liste.map(AppelMessagerie.fromJson).toList();
  }

  @override
  Future<List<MessageMessagerie>> chargerMessages(
      String conversationId) async {
    final liste = await _api.fetchMessagesConversation(conversationId);
    return liste.map(MessageMessagerie.fromJson).toList();
  }

  @override
  Future<MessageMessagerie> envoyerMessage(
      String conversationId, String texte) async {
    final data = await _api.envoyerMessageConversation(
      conversationId,
      content: texte,
    );
    final message = data['message'];
    if (message is Map<String, dynamic>) {
      return MessageMessagerie.fromJson(message);
    }
    return MessageMessagerie.fromJson(data);
  }

  @override
  Future<void> marquerLue(String conversationId) async {
    await MessagerieLectureService.instance.marquerLu(conversationId);
  }

  @override
  Future<List<MembreMessagerie>> rechercherMembres(String q) async {
    final liste = await _api.fetchMembresMessagerie(q: q);
    return liste.map(MembreMessagerie.fromJson).toList();
  }

  @override
  Future<ConversationMessagerie> creerConversationDirecte(
      String membreId) async {
    final data = await _api.creerConversationMessagerie(
      type: 'directe',
      participantIds: [membreId],
    );
    final conversation = data['conversation'];
    if (conversation is Map<String, dynamic>) {
      return ConversationMessagerie.fromJson(conversation);
    }
    return ConversationMessagerie.fromJson(data);
  }

  @override
  Future<Map<String, dynamic>> appeler(String conversationId,
      {required String type}) async {
    return _api.creerAppelConversation(conversationId, type: type);
  }

  @override
  Future<Map<String, dynamic>?> appelActif(String conversationId) async {
    final brut = await _api.fetchAppelActifConversation(conversationId);
    final appel = brut['appel'];
    if (appel is Map<String, dynamic>) return appel;
    return null;
  }

  @override
  Future<void> signaler(
      {required String cibleType,
      required String cibleId,
      required String motif}) async {
    await _api.signalerContenu(
      cibleType: cibleType,
      cibleId: cibleId,
      motif: motif,
      destinataire: 'etablissement',
    );
  }
}
