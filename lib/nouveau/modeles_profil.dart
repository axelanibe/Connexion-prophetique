// Modèles de Mon profil et Ma carte, tranche T8, 26 nov. 2026.
// Les 11 fonctions connues, sans Plateforme, qui est un
// parcours d'abonnement, pas une fonction de membre. Nom et
// ville, T11 : routes serveur /moi/nom et /moi/ville, renvoyés
// par GET /moi. E-mail, T11 : route /moi/email avec code de
// vérification envoyé à la nouvelle adresse avant le changement.
import '../app_models.dart';

/// Les 11 fonctions connues, dans l'ordre de l'inscription.
const fonctionsMembre = <String>[
  'Président',
  'Secrétaire',
  'Trésorier',
  'Chantre',
  'Organisateur',
  'Responsable',
  'Leader',
  'PCA',
  'Coordinateur',
  'Membre',
  'Aucun',
];

/// Établissement affiché sur la carte quand le serveur n'en
/// donne aucun : Bureau national, d'après le dossier, non
/// confirmé par Axel. Rien d'autre n'est inventé.
String etablissementCarte(Member m) =>
    m.etab.isEmpty ? 'Bureau national' : m.etab;

/// Date au format serveur, aaaa-mm-jj.
String isoDate(DateTime d) =>
    '${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';

/// Date affichée, jj/mm/aaaa.
String afficherDate(DateTime d) => '${d.day}/${d.month}/${d.year}';

/// Champs modifiables de Mon profil, tels que saisis avant
/// Enregistrer. Une valeur vide veut dire non renseignée.
class ModifsProfil {
  const ModifsProfil({
    required this.nom,
    required this.etablissement,
    required this.fonction,
    required this.dateNaissance,
    required this.telephone,
    required this.email,
    required this.ville,
    required this.pays,
  });
  final String nom;
  final String etablissement;
  final String fonction;
  final DateTime? dateNaissance;
  final String telephone;
  final String email;
  final String ville;
  final String pays;
}

/// Ce qu'Enregistrer a fait : vrai quand chaque champ avec
/// une route serveur est parti, faux sinon. Le nom et la ville
/// gardés sur l'appareil seulement quand le serveur les a
// refusés, la page le dit quand c'est le cas ; l'e-mail passe
// par la vérification, jamais par Enregistrer.
class EnregistrementProfil {
  const EnregistrementProfil({
    required this.reussi,
    required this.gardeLocalSeulement,
  });
  final bool reussi;
  final bool gardeLocalSeulement;
}

/// Membre venu de GET /moi, avec le nom local quand sa
/// modification a été refusée par le serveur. L'e-mail et la
/// ville viennent de /moi, T11, jamais devinés.
Member membreDepuisMoi(Map<String, dynamic> moi, {String? nomLocal}) {
  final inscrit = DateTime.tryParse((moi['inscrit_le'] ?? '').toString()) ??
      DateTime.now();
  final valide =
      DateTime.tryParse((moi['valide_jusqua'] ?? '').toString());
  final naissanceRaw = (moi['date_naissance'] ?? '').toString();
  final naissance =
      naissanceRaw.isEmpty ? null : DateTime.tryParse(naissanceRaw);
  final anneeRaw = moi['annee_adhesion'];
  final annee = anneeRaw is num
      ? anneeRaw.toInt()
      : int.tryParse((anneeRaw ?? '').toString());
  return Member(
    nomLocal != null && nomLocal.isNotEmpty
        ? nomLocal
        : (moi['nom_complet'] ?? '').toString(),
    (moi['matricule'] ?? '').toString(),
    (moi['etablissement'] ?? '').toString(),
    inscrit,
    fonction: (moi['fonction'] ?? '').toString(),
    photoData: (moi['photo'] ?? '').toString(),
    validUntilOverride: valide,
    dateNaissance: naissance,
    telephone: (moi['telephone'] ?? '').toString(),
    anneeAdhesion: annee,
    statutAdhesion: (moi['statut_adhesion'] ?? '').toString(),
    ville: (moi['ville'] ?? '').toString(),
    email: (moi['email'] ?? '').toString(),
  );
}
