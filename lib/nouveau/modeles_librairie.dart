// Modèles de la nouvelle Librairie, tranche T7, 26 nov. 2026.
// L'espace en ligne est le modèle : titre, panier avec
// pastille, + Ajouter, filtres Tous, Nouveautés, Mes achats,
// recherche, bouton Acheter à sa place, menu trois points.
// Nouveautés de T7 : recherche tactile ouvrant une feuille
// en bas (patron de choisirIndicatif), livres en sections
// repliables par catégorie. Pas de cartes couverture 2:3,
// pas de page panier avec paiement.
// Catégorie, T11, 26 nov. 2026 : le serveur connaît désormais
// la catégorie d'un livre, liste fermée validée par Axel, les
// livres existants sont en « À classer ». La section reprend
// la catégorie ; sans catégorie, « À classer ».
import '../api.dart';
import '../app_models.dart';

/// Catégories des livres, liste fermée, même ordre que le
/// serveur (CATEGORIES_LIVRE). La dernière est le repli des
/// livres existants sans catégorie.
const kCategoriesLivre = [
  'Étude biblique',
  'Prière',
  'Témoignages',
  'Enseignements',
  'Jeunesse',
  'Vie chrétienne',
  'À classer',
];

/// Filtres de la Librairie, sur une seule ligne, pastilles
/// de largeur égale.
enum FiltreLibrairie {
  tous('Tous'),
  nouveautes('Nouveautés'),
  achats('Mes achats');

  const FiltreLibrairie(this.libelle);
  final String libelle;
}

/// Nouveauté, même règle qu'en ligne : moins de 90 jours
/// après la création côté serveur. Sans date, jamais
/// nouveau, la date n'est jamais devinée.
bool livreEstNouveau(Book livre, {DateTime? maintenant}) {
  final creeLe = livre.creeLe;
  if (creeLe == null) return false;
  final m = maintenant ?? DateTime.now();
  return !m.isBefore(creeLe) && m.difference(creeLe).inDays < 90;
}

/// Catégorie d'un livre : sa catégorie serveur, dans la liste
/// fermée ; hors liste ou vide, « À classer », jamais inventée.
String categorieLivre(Book livre) {
  final categorie = livre.categorie.trim();
  return kCategoriesLivre.contains(categorie) ? categorie : 'À classer';
}

/// Livres visibles : recherche en direct sur le titre et
/// l'auteur, puis pastille Tous, Nouveautés ou Mes achats.
List<Book> filtrerLivres(
  List<Book> livres, {
  String requete = '',
  FiltreLibrairie filtre = FiltreLibrairie.tous,
  bool Function(Book livre)? estAchete,
}) {
  var liste = livres;
  final q = requete.trim().toLowerCase();
  if (q.isNotEmpty) {
    liste = liste
        .where((b) =>
            b.title.toLowerCase().contains(q) ||
            b.author.toLowerCase().contains(q))
        .toList();
  }
  if (filtre == FiltreLibrairie.nouveautes) {
    liste = liste.where(livreEstNouveau).toList();
  }
  if (filtre == FiltreLibrairie.achats && estAchete != null) {
    liste = liste.where(estAchete).toList();
  }
  return liste;
}

/// Livres rangés par catégorie, sections triées par nom,
/// livres triés par titre dans chaque section.
Map<String, List<Book>> grouperLivresParCategorie(List<Book> livres) {
  final sections = <String, List<Book>>{};
  for (final livre in livres) {
    sections.putIfAbsent(categorieLivre(livre), () => []).add(livre);
  }
  final noms = sections.keys.toList()..sort();
  return {
    for (final nom in noms)
      nom: (sections[nom]!..sort((a, b) => a.title.compareTo(b.title))),
  };
}

/// Prix en FCFA, même présentation qu'en ligne, espace
/// fine insécable tous les trois chiffres.
String fcfaLivre(int n) {
  final s = n.toString();
  final b = StringBuffer();
  for (var i = 0; i < s.length; i++) {
    final fromEnd = s.length - i;
    b.write(s[i]);
    if (fromEnd > 1 && fromEnd % 3 == 1) b.write(' ');
  }
  return '$b FCFA';
}

/// Livre venu du serveur, GET /livres : mêmes champs que
/// la synchronisation en ligne (titre, auteur, description,
/// prix_fcfa, format, catégorie, couverture_id, cree_le).
/// L'identifiant local est attribué par le service, il ne sert qu'à
/// l'affichage ; l'identifiant serveur sert aux achats et
/// au panier.
Book livreDepuisServeur(Map<String, dynamic> ligne, int idLocal) {
  final couvertureId = (ligne['couverture_id'] ?? '').toString();
  return Book(
    id: idLocal,
    serverId: (ligne['id'] ?? '').toString(),
    title: (ligne['titre'] ?? '').toString(),
    author: (ligne['auteur'] ?? '').toString(),
    description: (ligne['description'] ?? '').toString(),
    format: (ligne['format'] ?? '').toString(),
    categorie: (ligne['categorie'] ?? '').toString(),
    price: (ligne['prix_fcfa'] as num?)?.toInt() ?? 0,
    imageUrl: couvertureId.isEmpty ? '' : '$kApiBaseUrl/fichiers/$couvertureId',
    creeLe: (ligne['cree_le'] as String?) == null
        ? null
        : DateTime.tryParse(ligne['cree_le'] as String),
  );
}
