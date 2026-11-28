// Faux service Connexion partagé par les tests de la salve :
// seules les méthodes utilisées par chaque test sont
// vraiment implémentées, le reste renvoie du vide.
import 'package:connexion_prophetique/nouveau/modeles_connexion.dart';

class FauxConnexionSalve implements ServiceConnexion {
  FauxConnexionSalve({this.enErreur = false, List<NotificationConnexion>? notifications})
      : notifications = notifications ??
            [
              NotificationConnexion(
                id: 'n1',
                type: 'mention',
                titre: 'Awa Diallo',
                message: 't’a mentionné dans Connexion.',
                creeLe: DateTime.now().subtract(const Duration(minutes: 10)),
              ),
              NotificationConnexion(
                id: 'n2',
                type: 'activite',
                titre: 'Cotisation',
                message: 'ta cotisation de décembre est ouverte.',
                lue: true,
                creeLe:
                    DateTime.now().subtract(const Duration(days: 1, hours: 2)),
              ),
            ];

  final bool enErreur;
  final List<NotificationConnexion> notifications;
  bool toutLu = false;

  @override
  Future<PagePublications> chargerFil(
          {String? categorie,
          String? q,
          String? avant,
          int limite = 20}) async =>
      PagePublications(publications: List.of(fil));

  /// Fil renvoyé par chargerFil, pour les tests.
  List<PublicationConnexion> fil = [
    PublicationConnexion(
      id: 'p1',
      auteurId: 'moi',
      auteurNom: 'Test Membre',
      texte: 'Témoignage de test.',
      categorie: 'temoignage',
      estAuteur: true,
      creeLe: DateTime(2026, 11, 27),
    ),
  ];

  @override
  Future<List<PublicationConnexion>> chargerActualites() async => const [];

  @override
  Future<PublicationConnexion> chargerDetail(String id) async =>
      throw UnimplementedError();

  @override
  Future<PublicationConnexion> publier(
          {required String texte,
          required String categorie,
          String? photo,
          List<String>? photos}) async =>
      throw UnimplementedError();

  @override
  Future<PublicationConnexion> modifierPublication(String id,
      {required String texte, required String categorie}) async {
    final p = publicationModifiable;
    if (p == null || p.id != id) throw Exception('test');
    return p.avecModification(texte: texte, categorie: categorie);
  }

  /// Publication renvoyée par modifierPublication, pour les tests.
  PublicationConnexion? publicationModifiable;

  final Set<String> bloques = {};

  @override
  Future<void> bloquerMembre(String membreId) async {
    bloques.add(membreId);
  }

  @override
  Future<void> debloquerMembre(String membreId) async {
    bloques.remove(membreId);
  }

  List<MembreConnexion> decouvrir = [
    MembreConnexion(
        id: 'm1',
        nomComplet: 'Sarah Kouamé',
        etablissementNom: 'ISPAM',
        nbPublications: 12,
        nbAbonnes: 40),
    MembreConnexion(
        id: 'm2',
        nomComplet: 'Patrick D.',
        etablissementNom: 'Céleste',
        nbPublications: 8,
        nbAbonnes: 15),
  ];

  @override
  Future<List<MembreConnexion>> chargerDecouvrir({String? q}) async {
    if (q == null || q.trim().isEmpty) return List.of(decouvrir);
    final s = q.toLowerCase();
    return decouvrir
        .where((m) => m.nomComplet.toLowerCase().contains(s))
        .toList();
  }

  @override
  Future<PublicationConnexion> publierVideo(String id,
          {required List<int> bytes, required String filename}) async =>
      throw UnimplementedError();

  @override
  Future<void> supprimerVideo(String id) async {}

  @override
  Future<void> supprimerPublication(String id) async {}

  @override
  Future<CompteReactions> reagir(String id, String type) async =>
      throw UnimplementedError();

  @override
  Future<CompteReactions> retirerReaction(String id) async =>
      throw UnimplementedError();

  @override
  Future<List<CommentaireConnexion>> chargerCommentaires(String id) async =>
      const [];

  @override
  Future<CommentaireConnexion> commenter(String id, String texte,
          {String? parentId, List<String>? mentions}) async =>
      throw UnimplementedError();

  @override
  Future<void> supprimerCommentaire(String id) async {}

  @override
  Future<List<MembreConnexion>> rechercherMembres(String q) async => const [];

  @override
  Future<PageProfil> chargerProfil(String membreId,
      {String? avant, int limite = 20}) async {
    final p = profil;
    if (p == null) throw Exception('test');
    return PageProfil(profil: p, publications: const []);
  }

  /// Profil renvoyé par chargerProfil, pour les tests.
  ProfilConnexion? profil;

  @override
  Future<void> suivre(String membreId) async {}

  @override
  Future<void> nePlusSuivre(String membreId) async {}

  @override
  Future<List<MembreConnexion>> chargerAbonnes(String membreId) async =>
      const [];

  @override
  Future<List<MembreConnexion>> chargerAbonnements(String membreId) async =>
      const [];

  @override
  Future<void> enregistrer(String id) async {}

  @override
  Future<void> retirerEnregistrement(String id) async {}

  @override
  Future<PagePublications> chargerEnregistrements(
          {String? avant, int limite = 20}) async =>
      const PagePublications(publications: []);

  @override
  Future<Map<String, String>> chargerPhotosAuteurs(List<String> ids) async =>
      {};

  @override
  Future<List<NotificationConnexion>> chargerNotifications() async {
    if (enErreur) throw Exception('test');
    return List.of(notifications);
  }

  @override
  Future<void> marquerNotificationLue(String id) async {}

  @override
  Future<void> toutMarquerLu() async {
    toutLu = true;
  }

  @override
  Future<Map<String, dynamic>?> chargerPaiement(String id) async => null;

  @override
  Future<List<int>?> telechargerFacture(String reference) async => null;

  @override
  Future<void> signaler(
          {required String cibleType,
          required String cibleId,
          required String motif,
          String? description}) async {}

  @override
  Future<List<VersetChoisi>> rechercherVersets(String q) async => const [];
}
