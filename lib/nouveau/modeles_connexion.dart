// Nouvelle Connexion, tranche T3, 26 nov. 2026.
// Modèles du fil, du détail, des profils et des notifications,
// selon la conception du mur v2, sections 2 et 3. Les données
// de test vivent seulement dans les tests, jamais ici.
// ServiceConnexion abstrait l'API pour que les pages se testent
// avec un faux service, comme T1 et T2 avec leurs rappels.
import 'dart:convert';

/// Catégories du mur, côté serveur. Le fil ne filtre que sur
/// Témoignage, Prière et Verset ; les autres ne vivent que sous
/// Tous. L'actualité de la structure n'est pas une catégorie,
/// c'est une publication épinglée en tête du fil.
enum CategorieConnexion {
  temoignage('temoignage', 'Témoignage'),
  priere('priere', 'Prière'),
  verset('verset', 'Verset'),
  encouragement('encouragement', 'Encouragement'),
  enseignement('enseignement', 'Enseignement'),
  autre('autre', 'Autre');

  const CategorieConnexion(this.code, this.libelle);
  final String code;
  final String libelle;

  static CategorieConnexion depuis(String? code) => values.firstWhere(
        (c) => c.code == code,
        orElse: () => CategorieConnexion.autre,
      );
}

/// Filtres du fil : Tous, Témoignages, Prières, Versets.
enum FiltreConnexion {
  tous(null, 'Tous'),
  temoignages('temoignage', 'Témoignages'),
  prieres('priere', 'Prières'),
  versets('verset', 'Versets');

  const FiltreConnexion(this.categorie, this.libelle);
  final String? categorie;
  final String libelle;
}

/// Types de réaction, un seul par membre et par publication.
enum TypeReaction {
  jaime('jaime', "J'aime"),
  amen('amen', 'Amen'),
  priere('priere', 'Prière');

  const TypeReaction(this.code, this.libelle);
  final String code;
  final String libelle;

  static TypeReaction? depuis(String? code) {
    if (code == null || code.isEmpty) return null;
    for (final t in values) {
      if (t.code == code) return t;
    }
    return null;
  }
}

int _nombre(Object? v) =>
    v is int ? v : int.tryParse((v ?? '').toString()) ?? 0;

/// Publication du fil, forme du contrat, section 3.
class PublicationConnexion {
  PublicationConnexion({
    required this.id,
    this.auteurId = '',
    this.auteurNom = '',
    this.etablissementNom = '',
    this.texte = '',
    this.photo,
    this.videoUrl,
    this.categorie = 'autre',
    this.statutModeration = 'visible',
    this.nbJaime = 0,
    this.nbAmen = 0,
    this.nbPriere = 0,
    this.monType,
    this.nbCommentaires = 0,
    this.enregistre = false,
    this.estAuteur = false,
    this.creeLe,
    this.epinglee = false,
    this.titre,
  });

  factory PublicationConnexion.fromJson(Map<String, dynamic> j) {
    int nombre(Object? v) =>
        v is int ? v : int.tryParse((v ?? '').toString()) ?? 0;
    final video = j['video'] as Map<String, dynamic>?;
    final monType = (j['mon_type'] as String?)?.isEmpty == true
        ? null
        : j['mon_type'] as String?;
    return PublicationConnexion(
      id: (j['id'] ?? '').toString(),
      auteurId: (j['auteur_id'] ?? '').toString(),
      auteurNom: (j['auteur_nom'] ?? '').toString(),
      etablissementNom: (j['etablissement_nom'] ?? '').toString(),
      texte: (j['texte'] ?? '').toString(),
      photo: (j['photo'] as String?)?.isEmpty == true
          ? null
          : j['photo'] as String?,
      videoUrl: (video?['url'] as String?)?.isEmpty == true
          ? null
          : video?['url'] as String?,
      categorie: (j['categorie'] ?? 'autre').toString(),
      statutModeration: (j['statut_moderation'] ?? 'visible').toString(),
      nbJaime: nombre(j['nb_jaime']),
      nbAmen: nombre(j['nb_amen']),
      nbPriere: nombre(j['nb_priere']),
      monType: monType,
      nbCommentaires: nombre(j['nb_commentaires']),
      enregistre: j['enregistre'] == true,
      estAuteur: j['est_auteur'] == true,
      creeLe: j['cree_le'] == null
          ? null
          : DateTime.tryParse(j['cree_le'].toString()),
    );
  }

  /// Actualité de la structure, rendue comme une publication
  /// épinglée en tête du fil, sans rubrique séparée. Champs
  /// serveur : id, titre, texte, publiee_le.
  factory PublicationConnexion.actualite(Map<String, dynamic> j) {
    return PublicationConnexion(
      id: 'actualite-${(j['id'] ?? '').toString()}',
      auteurNom: 'CONNEXION PROPHÉTIQUE',
      texte: (j['texte'] ?? '').toString(),
      titre: (j['titre'] ?? '').toString(),
      creeLe: j['publiee_le'] == null
          ? null
          : DateTime.tryParse(j['publiee_le'].toString()),
      epinglee: true,
    );
  }

  final String id;
  final String auteurId;
  final String auteurNom;
  final String etablissementNom;
  final String texte;
  final String? photo;
  final String? videoUrl;
  final String categorie;
  final String statutModeration;
  final int nbJaime;
  final int nbAmen;
  final int nbPriere;
  final String? monType;
  final int nbCommentaires;
  final bool enregistre;
  final bool estAuteur;
  final DateTime? creeLe;

  /// Actualité épinglée, jamais une publication de membre.
  final bool epinglee;

  /// Titre de l'actualité, null pour une publication de membre.
  final String? titre;

  CategorieConnexion get categorieEnum => CategorieConnexion.depuis(categorie);
  TypeReaction? get maReaction => TypeReaction.depuis(monType);

  PublicationConnexion avecReaction(
      {required int jaime,
      required int amen,
      required int priere,
      String? monType}) {
    return PublicationConnexion(
      id: id,
      auteurId: auteurId,
      auteurNom: auteurNom,
      etablissementNom: etablissementNom,
      texte: texte,
      photo: photo,
      videoUrl: videoUrl,
      categorie: categorie,
      statutModeration: statutModeration,
      nbJaime: jaime,
      nbAmen: amen,
      nbPriere: priere,
      monType: monType,
      nbCommentaires: nbCommentaires,
      enregistre: enregistre,
      estAuteur: estAuteur,
      creeLe: creeLe,
      epinglee: epinglee,
      titre: titre,
    );
  }

  PublicationConnexion avecCommentaireEnPlus() {
    return PublicationConnexion(
      id: id,
      auteurId: auteurId,
      auteurNom: auteurNom,
      etablissementNom: etablissementNom,
      texte: texte,
      photo: photo,
      videoUrl: videoUrl,
      categorie: categorie,
      statutModeration: statutModeration,
      nbJaime: nbJaime,
      nbAmen: nbAmen,
      nbPriere: nbPriere,
      monType: monType,
      nbCommentaires: nbCommentaires + 1,
      enregistre: enregistre,
      estAuteur: estAuteur,
      creeLe: creeLe,
      epinglee: epinglee,
      titre: titre,
    );
  }

  PublicationConnexion avecEnregistrement(bool valeur) {
    return PublicationConnexion(
      id: id,
      auteurId: auteurId,
      auteurNom: auteurNom,
      etablissementNom: etablissementNom,
      texte: texte,
      photo: photo,
      videoUrl: videoUrl,
      categorie: categorie,
      statutModeration: statutModeration,
      nbJaime: nbJaime,
      nbAmen: nbAmen,
      nbPriere: nbPriere,
      monType: monType,
      nbCommentaires: nbCommentaires,
      enregistre: valeur,
      estAuteur: estAuteur,
      creeLe: creeLe,
      epinglee: epinglee,
      titre: titre,
    );
  }
}

/// Page de publications, avec le curseur de la suivante.
class PagePublications {
  const PagePublications({required this.publications, this.suivante});
  final List<PublicationConnexion> publications;
  final String? suivante;
}

/// Compte de réactions renvoyé par POST /aimes.
class CompteReactions {
  const CompteReactions(
      {this.nbJaime = 0, this.nbAmen = 0, this.nbPriere = 0, this.monType});
  factory CompteReactions.fromJson(Map<String, dynamic> j) => CompteReactions(
        nbJaime: _nombre(j['nb_jaime']),
        nbAmen: _nombre(j['nb_amen']),
        nbPriere: _nombre(j['nb_priere']),
        monType: (j['mon_type'] as String?)?.isEmpty == true
            ? null
            : j['mon_type'] as String?,
      );
  final int nbJaime;
  final int nbAmen;
  final int nbPriere;
  final String? monType;
}

/// Commentaire, avec sa réponse à un niveau (parentId).
class CommentaireConnexion {
  CommentaireConnexion({
    required this.id,
    this.membreId = '',
    this.auteurNom = '',
    this.texte = '',
    this.parentId,
    this.creeLe,
    this.estAuteur = false,
  });

  factory CommentaireConnexion.fromJson(Map<String, dynamic> j) {
    return CommentaireConnexion(
      id: (j['id'] ?? '').toString(),
      membreId: (j['membre_id'] ?? '').toString(),
      auteurNom: (j['auteur_nom'] ?? j['auteur'] ?? '').toString(),
      texte: (j['texte'] ?? '').toString(),
      parentId: (j['parent_id'] as String?)?.isEmpty == true
          ? null
          : j['parent_id'] as String?,
      creeLe: j['cree_le'] == null
          ? null
          : DateTime.tryParse(j['cree_le'].toString()),
      estAuteur: j['est_auteur'] == true,
    );
  }

  final String id;
  final String membreId;
  final String auteurNom;
  final String texte;
  final String? parentId;
  final DateTime? creeLe;
  final bool estAuteur;
}

/// Membre nommé, pour les mentions, les abonnés et les
/// abonnements : nom et établissement seulement, jamais de
/// coordonnée de contact.
class MembreConnexion {
  MembreConnexion(
      {required this.id, this.nomComplet = '', this.etablissementNom = ''});

  factory MembreConnexion.fromJson(Map<String, dynamic> j) {
    return MembreConnexion(
      id: (j['id'] ?? j['membre_id'] ?? '').toString(),
      nomComplet: (j['nom_complet'] ?? j['nom'] ?? '').toString(),
      etablissementNom:
          (j['etablissement_nom'] ?? j['etablissement'] ?? '').toString(),
    );
  }

  final String id;
  final String nomComplet;
  final String etablissementNom;
}

/// Profil public d'un membre du mur.
class ProfilConnexion {
  ProfilConnexion({
    required this.id,
    this.nomComplet = '',
    this.fonction = '',
    this.etablissementNom = '',
    this.photo,
    this.presentation = '',
    this.inscritLe,
    this.nbPublications = 0,
    this.nbReactions = 0,
    this.nbAbonnes = 0,
    this.nbAbonnements = 0,
    this.suiviParMoi = false,
    this.estMoi = false,
  });

  factory ProfilConnexion.fromJson(Map<String, dynamic> j) {
    return ProfilConnexion(
      id: (j['id'] ?? '').toString(),
      nomComplet: (j['nom_complet'] ?? '').toString(),
      fonction: (j['fonction'] ?? '').toString(),
      etablissementNom: (j['etablissement_nom'] ?? '').toString(),
      photo: (j['photo'] as String?)?.isEmpty == true
          ? null
          : j['photo'] as String?,
      presentation: (j['presentation'] ?? '').toString(),
      inscritLe: j['inscrit_le'] == null
          ? null
          : DateTime.tryParse(j['inscrit_le'].toString()),
      nbPublications: _nombre(j['nb_publications']),
      nbReactions: _nombre(j['nb_reactions']),
      nbAbonnes: _nombre(j['nb_abonnes']),
      nbAbonnements: _nombre(j['nb_abonnements']),
      suiviParMoi: j['suivi_par_moi'] == true,
      estMoi: j['est_moi'] == true,
    );
  }

  final String id;
  final String nomComplet;
  final String fonction;
  final String etablissementNom;
  final String? photo;
  final String presentation;
  final DateTime? inscritLe;
  final int nbPublications;
  final int nbReactions;
  final int nbAbonnes;
  final int nbAbonnements;
  final bool suiviParMoi;
  final bool estMoi;

  ProfilConnexion avecSuivi(bool valeur) {
    return ProfilConnexion(
      id: id,
      nomComplet: nomComplet,
      fonction: fonction,
      etablissementNom: etablissementNom,
      photo: photo,
      presentation: presentation,
      inscritLe: inscritLe,
      nbPublications: nbPublications,
      nbReactions: nbReactions,
      nbAbonnes: nbAbonnes + (valeur ? 1 : -1),
      nbAbonnements: nbAbonnements,
      suiviParMoi: valeur,
      estMoi: estMoi,
    );
  }
}

/// Profil et ses publications, forme de GET /mur/membres/:id.
class PageProfil {
  const PageProfil(
      {required this.profil, required this.publications, this.suivante});
  final ProfilConnexion profil;
  final List<PublicationConnexion> publications;
  final String? suivante;
}

/// Notification de la cloche, forme de GET /notifications.
class NotificationConnexion {
  NotificationConnexion({
    required this.id,
    this.type = '',
    this.titre = '',
    this.message = '',
    this.lienType = '',
    this.lienId = '',
    this.lue = false,
    this.creeLe,
  });

  factory NotificationConnexion.fromJson(Map<String, dynamic> j) {
    return NotificationConnexion(
      id: (j['id'] ?? '').toString(),
      type: (j['type'] ?? '').toString(),
      titre: (j['titre'] ?? '').toString(),
      message: (j['message'] ?? '').toString(),
      lienType: (j['lien_type'] ?? '').toString(),
      lienId: (j['lien_id'] ?? '').toString(),
      lue: j['lue'] == true,
      creeLe: j['cree_le'] == null
          ? null
          : DateTime.tryParse(j['cree_le'].toString()),
    );
  }

  final String id;
  final String type;
  final String titre;
  final String message;
  final String lienType;
  final String lienId;
  final bool lue;
  final DateTime? creeLe;

  bool get estMention => type == 'mur_mention';
  bool get estMur => type.startsWith('mur_');
}

/// Verset choisi dans les données Bible existantes : le texte
/// vient de la Bible embarquée, jamais recopié à la main.
class VersetChoisi {
  const VersetChoisi({required this.reference, required this.texte});
  final String reference;
  final String texte;
}

/// Média choisi dans le compositeur : photo (octets et adresse
/// de données) ou vidéo courte (octets et nom de fichier).
class MediaChoisi {
  const MediaChoisi(
      {required this.bytes,
      required this.nom,
      required this.estVideo,
      this.dataUrl});
  final List<int> bytes;
  final String nom;
  final bool estVideo;
  final String? dataUrl;

  /// Adresse de données JPEG, pour la photo publiée.
  static String dataUrlPhoto(List<int> bytes) =>
      'data:image/jpeg;base64,${base64Encode(bytes)}';
}

/// Motifs de signalement, clés françaises envoyées au serveur,
/// qui les normalise vers ses clés stockées.
const motifsSignalement = <(String, String)>[
  ('harcelement', 'Harcèlement'),
  ('propos_haineux', 'Propos haineux'),
  ('menace', 'Menace'),
  ('desinformation', 'Désinformation'),
  ('spam', 'Contenu indésirable'),
  ('securite_enfant', 'Sécurité des enfants'),
  ('erreur_doctrinale', 'Erreur doctrinale'),
  ('trafic_influence', 'Trafic d’influence'),
  ('mauvaise_gestion_finances', 'Mauvaise gestion des finances'),
  ('autre', 'Autre'),
];

/// Accès au mur pour les pages nouvelles. L'implémentation
/// réelle vit dans service_connexion.dart ; les tests injectent
/// un faux service.
abstract class ServiceConnexion {
  Future<PagePublications> chargerFil(
      {String? categorie, String? q, String? avant, int limite = 20});
  Future<List<PublicationConnexion>> chargerActualites();
  Future<PublicationConnexion> chargerDetail(String id);
  Future<PublicationConnexion> publier(
      {required String texte, required String categorie, String? photo});
  Future<PublicationConnexion> publierVideo(String id,
      {required List<int> bytes, required String filename});
  Future<void> supprimerVideo(String id);
  Future<void> supprimerPublication(String id);
  Future<CompteReactions> reagir(String id, String type);
  Future<CompteReactions> retirerReaction(String id);
  Future<List<CommentaireConnexion>> chargerCommentaires(String id);
  Future<CommentaireConnexion> commenter(String id, String texte,
      {String? parentId, List<String>? mentions});
  Future<void> supprimerCommentaire(String id);
  Future<List<MembreConnexion>> rechercherMembres(String q);
  Future<PageProfil> chargerProfil(String membreId,
      {String? avant, int limite = 20});
  Future<void> suivre(String membreId);
  Future<void> nePlusSuivre(String membreId);
  Future<List<MembreConnexion>> chargerAbonnes(String membreId);
  Future<List<MembreConnexion>> chargerAbonnements(String membreId);
  Future<void> enregistrer(String id);
  Future<void> retirerEnregistrement(String id);
  Future<PagePublications> chargerEnregistrements(
      {String? avant, int limite = 20});
  Future<Map<String, String>> chargerPhotosAuteurs(List<String> ids);
  Future<List<NotificationConnexion>> chargerNotifications();
  Future<void> marquerNotificationLue(String id);
  Future<void> toutMarquerLu();
  Future<void> signaler(
      {required String cibleType,
      required String cibleId,
      required String motif,
      String? description});
  Future<List<VersetChoisi>> rechercherVersets(String q);
}
