// Nouvelle Connexion, tranche T3, 26 nov. 2026.
// ServiceConnexion branché sur ApiClient : aucune route
// nouvelle côté client, seulement les méthodes du contrat
// ajoutées à lib/api.dart. Les lectures ne font qu'appeler
// des GET, jamais d'écriture en base.
import '../api.dart';
import '../bible.dart';
import 'modeles_connexion.dart';

List<PublicationConnexion> _publications(Object? v) {
  if (v is! List) return const [];
  return v
      .whereType<Map<String, dynamic>>()
      .map(PublicationConnexion.fromJson)
      .toList();
}

class ServiceConnexionApi implements ServiceConnexion {
  ServiceConnexionApi(this._api);
  final ApiClient _api;

  @override
  Future<PagePublications> chargerFil(
      {String? categorie, String? q, String? avant, int limite = 20}) async {
    final data = await _api.fetchMur(
        categorie: categorie, q: q, avant: avant, limite: limite);
    return PagePublications(
      publications: _publications(data['publications']),
      suivante: (data['suivante'] as String?)?.isEmpty == true
          ? null
          : data['suivante'] as String?,
    );
  }

  @override
  Future<List<PublicationConnexion>> chargerActualites() async {
    final liste = await _api.fetchActualites();
    return liste.map(PublicationConnexion.actualite).toList();
  }

  @override
  Future<PublicationConnexion> chargerDetail(String id) async {
    return PublicationConnexion.fromJson(await _api.fetchMurDetail(id));
  }

  @override
  Future<PublicationConnexion> publier(
      {required String texte, required String categorie, String? photo}) async {
    final data =
        await _api.publierMur(texte: texte, photo: photo, categorie: categorie);
    final publication = data['publication'];
    if (publication is Map<String, dynamic>)
      return PublicationConnexion.fromJson(publication);
    return PublicationConnexion.fromJson(data);
  }

  @override
  Future<PublicationConnexion> publierVideo(String id,
      {required List<int> bytes, required String filename}) async {
    final data =
        await _api.publierVideoMur(id, bytes: bytes, filename: filename);
    final publication = data['publication'];
    if (publication is Map<String, dynamic>)
      return PublicationConnexion.fromJson(publication);
    return PublicationConnexion.fromJson(data);
  }

  @override
  Future<void> supprimerVideo(String id) async => _api.supprimerVideoMur(id);

  @override
  Future<void> supprimerPublication(String id) async =>
      _api.supprimerPublicationMur(id);

  @override
  Future<CompteReactions> reagir(String id, String type) async {
    return CompteReactions.fromJson(
        await _api.publierAime('mur', id, type: type));
  }

  @override
  Future<CompteReactions> retirerReaction(String id) async {
    final data = await _api.retirerAime('mur', id);
    return CompteReactions.fromJson(data);
  }

  @override
  Future<List<CommentaireConnexion>> chargerCommentaires(String id) async {
    final data = await _api.fetchCommentaires('mur', id);
    final liste = data['commentaires'];
    if (liste is! List) return const [];
    return liste
        .whereType<Map<String, dynamic>>()
        .map(CommentaireConnexion.fromJson)
        .toList();
  }

  @override
  Future<CommentaireConnexion> commenter(String id, String texte,
      {String? parentId, List<String>? mentions}) async {
    final data = await _api.publierCommentaire('mur', id, texte,
        parentId: parentId, mentions: mentions);
    final commentaire = data['commentaire'];
    if (commentaire is Map<String, dynamic>)
      return CommentaireConnexion.fromJson(commentaire);
    return CommentaireConnexion.fromJson(data);
  }

  @override
  Future<void> supprimerCommentaire(String id) async =>
      _api.supprimerCommentaire(id);

  @override
  Future<List<MembreConnexion>> rechercherMembres(String q) async {
    final liste = await _api.fetchMembresMessagerie(q: q);
    return liste.map(MembreConnexion.fromJson).toList();
  }

  @override
  Future<PageProfil> chargerProfil(String membreId,
      {String? avant, int limite = 20}) async {
    final data =
        await _api.fetchProfilMur(membreId, avant: avant, limite: limite);
    final membre = data['membre'];
    return PageProfil(
      profil: membre is Map<String, dynamic>
          ? ProfilConnexion.fromJson(membre)
          : ProfilConnexion(id: membreId),
      publications: _publications(data['publications']),
      suivante: (data['suivante'] as String?)?.isEmpty == true
          ? null
          : data['suivante'] as String?,
    );
  }

  @override
  Future<void> suivre(String membreId) async => _api.suivreMembre(membreId);

  @override
  Future<void> nePlusSuivre(String membreId) async =>
      _api.nePlusSuivre(membreId);

  @override
  Future<List<MembreConnexion>> chargerAbonnes(String membreId) async {
    final liste = await _api.fetchAbonnes(membreId);
    return liste.map(MembreConnexion.fromJson).toList();
  }

  @override
  Future<List<MembreConnexion>> chargerAbonnements(String membreId) async {
    final liste = await _api.fetchAbonnements(membreId);
    return liste.map(MembreConnexion.fromJson).toList();
  }

  @override
  Future<void> enregistrer(String id) async => _api.enregistrerPublication(id);

  @override
  Future<void> retirerEnregistrement(String id) async =>
      _api.retirerEnregistrement(id);

  @override
  Future<PagePublications> chargerEnregistrements(
      {String? avant, int limite = 20}) async {
    final data = await _api.fetchEnregistrements(avant: avant, limite: limite);
    return PagePublications(
      publications: _publications(data['publications']),
      suivante: (data['suivante'] as String?)?.isEmpty == true
          ? null
          : data['suivante'] as String?,
    );
  }

  @override
  Future<Map<String, String>> chargerPhotosAuteurs(List<String> ids) async {
    final data = await _api.fetchPhotosAuteurs(ids);
    final photos = <String, String>{};
    final liste = data['photos'];
    if (liste is List) {
      for (final ligne in liste.whereType<Map<String, dynamic>>()) {
        final id = (ligne['membre_id'] ?? '').toString();
        final photo = ligne['photo'] as String?;
        if (id.isNotEmpty && photo != null && photo.isNotEmpty)
          photos[id] = photo;
      }
    }
    return photos;
  }

  @override
  Future<List<NotificationConnexion>> chargerNotifications() async {
    final data = await _api.fetchNotifications();
    final liste = data['notifications'];
    if (liste is! List) return const [];
    return liste
        .whereType<Map<String, dynamic>>()
        .map(NotificationConnexion.fromJson)
        .toList();
  }

  @override
  Future<void> marquerNotificationLue(String id) async =>
      _api.markNotificationRead(id);

  @override
  Future<void> toutMarquerLu() async => _api.markAllNotificationsRead();

  @override
  Future<void> signaler(
      {required String cibleType,
      required String cibleId,
      required String motif,
      String? description}) async {
    await _api.signalerContenu(
      cibleType: cibleType,
      cibleId: cibleId,
      motif: motif,
      description: description,
      destinataire: 'etablissement',
    );
  }

  @override
  Future<List<VersetChoisi>> rechercherVersets(String q) async {
    await BibleService.instance.load();
    final hits = BibleService.instance.search('fr', q);
    return hits
        .take(10)
        .map((h) => VersetChoisi(
            reference: _referenceVerset(h.book, h.chapter, h.verse),
            texte: h.text))
        .toList();
  }

  String _referenceVerset(int livre, int chapitre, int verset) {
    return '${BibleService.instance.bookName('fr', livre)} $chapitre, $verset';
  }
}
