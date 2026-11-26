// Nouvelle Messagerie, tranche T4, 26 nov. 2026.
// Modèles de la liste, des appels et du détail. Les
// conversations et les messages sont les modèles existants de
// lib/messagerie.dart, réutilisés tels quels : rien n'est
// redéfini ici. Les données de test vivent seulement dans les
// tests, jamais ici. ServiceMessagerie abstrait l'API pour que
// les pages se testent avec un faux service, comme T3.
import '../messagerie.dart';

/// Volets de la Messagerie, Appels à gauche, Discussions à
/// droite. L'ouverture se fait toujours sur Discussions, même
/// après un passage par les Appels.
enum VoletMessagerie {
  appels('Appels'),
  discussions('Discussions');

  const VoletMessagerie(this.libelle);
  final String libelle;
}

/// Filtre en pastilles des Discussions. Messages : les
/// discussions individuelles et la discussion épinglée de la
/// structure, jamais mélangées aux groupes. Groupes : les
/// groupes à part, avec leur nombre. Tous : tout ensemble.
enum FiltreMessagerie {
  messages('Messages'),
  groupes('Groupes'),
  tous('Tous');

  const FiltreMessagerie(this.libelle);
  final String libelle;
}

/// Discussion épinglée de la structure : le canal d'annonces,
/// groupe de structure aux réponses désactivées, créé par
/// l'administrateur général. Aucun champ serveur ne la désigne
/// comme épinglée, cette règle reprend le canal d'annonces
/// existant. Elle est épinglée en haut du filtre Messages et
/// ne figure pas dans le filtre Groupes.
extension DiscussionStructure on ConversationMessagerie {
  bool get estDiscussionStructure =>
      type == 'groupe_structure' && reponsesDesactivees;
}

/// Un appel de l'historique, forme de GET /messagerie/appels.
/// `manque` vient du serveur : je suis l'appelé et l'appel
/// s'est terminé sans réponse.
class AppelMessagerie {
  AppelMessagerie({
    required this.id,
    required this.conversationId,
    this.appelantId = '',
    this.autreNom = '',
    this.autreMatricule = '',
    this.type = 'audio',
    this.statut = 'termine',
    this.manque = false,
    this.creeLe,
    this.reponduLe,
  });

  factory AppelMessagerie.fromJson(Map<String, dynamic> j) {
    DateTime? lireDate(Object? v) =>
        v == null ? null : DateTime.tryParse(v.toString());
    return AppelMessagerie(
      id: (j['id'] ?? '').toString(),
      conversationId: (j['conversation_id'] ?? '').toString(),
      appelantId: (j['appelant_id'] ?? '').toString(),
      autreNom: (j['autre_nom'] ?? '').toString(),
      autreMatricule: (j['autre_matricule'] ?? '').toString(),
      type: (j['type'] ?? 'audio').toString(),
      statut: (j['statut'] ?? 'termine').toString(),
      manque: j['manque'] == true,
      creeLe: lireDate(j['cree_le']),
      reponduLe: lireDate(j['repondu_le']),
    );
  }

  final String id;
  final String conversationId;
  final String appelantId;
  final String autreNom;
  final String autreMatricule;
  final String type;
  final String statut;
  final bool manque;
  final DateTime? creeLe;
  final DateTime? reponduLe;

  bool get estVideo => type == 'video';

  /// Vrai quand c'est moi qui ai appelé.
  bool estSortant(String? monMembreId) =>
      monMembreId != null && appelantId == monMembreId;

  /// Libellé de la ligne, selon qui lit : l'appelé voit
  /// « Appel manqué », l'appelant « Appel sans réponse ».
  String libelle(String? monMembreId) {
    if (manque) return 'Appel manqué';
    if (estSortant(monMembreId)) return 'Appel sortant';
    return 'Appel entrant';
  }
}

/// Accès à la Messagerie pour les pages nouvelles.
/// L'implémentation réelle vit dans service_messagerie.dart ;
/// les tests injectent un faux service.
abstract class ServiceMessagerie {
  Future<String?> monMembreId();
  Future<List<ConversationMessagerie>> chargerConversations();
  Future<Map<String, bool>> chargerPresence(
      List<ConversationMessagerie> conversations);
  Future<List<AppelMessagerie>> chargerAppels();
  Future<List<MessageMessagerie>> chargerMessages(String conversationId);
  Future<MessageMessagerie> envoyerMessage(
      String conversationId, String texte);
  Future<void> marquerLue(String conversationId);
  Future<List<MembreMessagerie>> rechercherMembres(String q);
  Future<ConversationMessagerie> creerConversationDirecte(String membreId);
  Future<void> appeler(String conversationId, {required String type});
  Future<void> signaler(
      {required String cibleType,
      required String cibleId,
      required String motif});
}
