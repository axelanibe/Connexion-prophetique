// Modèles de la nouvelle Bible, tranche T6, 26 nov. 2026.
// Structure canonique des 66 livres, sans texte inventé : les
// noms et les textes viennent de BibleService, jamais recopiés
// ici. Ancien Testament : livres 0 à 38. Nouveau Testament :
// livres 39 à 65. Groupes repris de l'ancienne page Bible,
// mêmes bornes, mêmes libellés.

/// Nombre de livres de la Bible.
const kNbLivresBible = 66;

/// Nombre de livres de l'Ancien Testament.
const kNbLivresAncienTestament = 39;

/// Indices des livres d'un testament, dans l'ordre canonique.
List<int> indicesTestament(bool ancien) {
  final debut = ancien ? 0 : kNbLivresAncienTestament;
  final fin = ancien ? kNbLivresAncienTestament : kNbLivresBible;
  return [for (var i = debut; i < fin; i++) i];
}

/// Vrai si le livre appartient à l'Ancien Testament.
bool estAncienTestament(int livre) => livre < kNbLivresAncienTestament;

/// Groupe de livres, titre et bornes incluses.
class GroupeLivresBible {
  const GroupeLivresBible(this.titre, this.debut, this.fin);
  final String titre;
  final int debut;
  final int fin;
}

/// Groupes de l'Ancien Testament.
const groupesAncienTestament = <GroupeLivresBible>[
  GroupeLivresBible('La Loi', 0, 4),
  GroupeLivresBible('Livres historiques', 5, 16),
  GroupeLivresBible('Poésie et sagesse', 17, 21),
  GroupeLivresBible('Prophètes', 22, 38),
];

/// Groupes du Nouveau Testament.
const groupesNouveauTestament = <GroupeLivresBible>[
  GroupeLivresBible('Évangiles', 39, 42),
  GroupeLivresBible('Actes', 43, 43),
  GroupeLivresBible('Lettres de Paul', 44, 56),
  GroupeLivresBible('Lettres générales', 57, 64),
  GroupeLivresBible('Apocalypse', 65, 65),
];

/// Groupes du testament demandé.
List<GroupeLivresBible> groupesTestament(bool ancien) =>
    ancien ? groupesAncienTestament : groupesNouveauTestament;
