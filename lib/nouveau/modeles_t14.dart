// Mes paiements et fiche membre côté Bureau, tranche T14, 26 nov. 2026.
// Historique des paiements du membre (GET /moi/paiements) et
// membres de l'administration (GET /admin/membres, GET
// /admin/membres/:id). Aucune donnée inventée : les libellés
// viennent des champs du serveur.
import 'modeles_profil.dart' show afficherDate;

/// Un paiement du membre, ligne de GET /moi/paiements.
class PaiementMembre {
  const PaiementMembre({
    required this.id,
    required this.reference,
    required this.type,
    required this.montantFcfa,
    required this.statut,
    required this.moyen,
    required this.creeLe,
    required this.confirmeLe,
    required this.campNom,
    required this.numeroVersement,
    required this.moisCible,
    required this.lignes,
    required this.beneficiaireNom,
    required this.donateurNom,
    required this.roleDon,
    required this.messageDon,
  });

  factory PaiementMembre.depuisJson(Map<String, dynamic> json) {
    final lignesBrutes = (json['lignes'] as List?) ?? const [];
    return PaiementMembre(
      id: (json['id'] ?? '').toString(),
      reference: (json['reference'] ?? '').toString(),
      type: (json['type'] ?? '').toString(),
      montantFcfa: (json['montant_fcfa'] as num?)?.toInt() ?? 0,
      statut: (json['statut'] ?? '').toString(),
      moyen: (json['moyen'] ?? '').toString(),
      creeLe: DateTime.tryParse((json['cree_le'] ?? '').toString()),
      confirmeLe:
          DateTime.tryParse((json['confirme_le'] ?? '').toString()),
      campNom: (json['camp_nom'] ?? '').toString(),
      numeroVersement: (json['numero_versement'] as num?)?.toInt() ?? 0,
      moisCible: (json['mois_cible'] ?? '').toString(),
      lignes: [
        for (final l in lignesBrutes)
          if (l is Map<String, dynamic>)
            (l['titre'] ?? '').toString(),
      ].where((t) => t.isNotEmpty).toList(),
      beneficiaireNom: (json['beneficiaire_nom'] ?? '').toString(),
      donateurNom: (json['donateur_nom'] ?? '').toString(),
      roleDon: (json['role_don'] ?? '').toString(),
      messageDon: (json['message_don'] ?? '').toString(),
    );
  }

  final String id;
  final String reference;
  final String type;
  final int montantFcfa;
  final String statut;
  final String moyen;
  final DateTime? creeLe;
  final DateTime? confirmeLe;
  final String campNom;
  final int numeroVersement;
  final String moisCible;
  final List<String> lignes;
  final String beneficiaireNom;
  final String donateurNom;
  final String roleDon;
  final String messageDon;

  /// Libellé du paiement, d'après son type et ses champs.
  String get libelle {
    switch (type) {
      case 'carte':
        return 'Carte de membre';
      case 'cotisation':
        return moisCible.isEmpty ? 'Cotisation' : 'Cotisation $moisCible';
      case 'don':
        return 'Don';
      default:
        if (campNom.isNotEmpty) return 'Camp $campNom';
        if (lignes.isNotEmpty) return 'Librairie';
        return type.isEmpty ? 'Paiement' : type;
    }
  }

  /// Précision sous le libellé : versement de camp, don, livres.
  String get detail {
    if (campNom.isNotEmpty && numeroVersement > 0) {
      return 'Versement n°$numeroVersement';
    }
    if (type == 'don' && roleDon == 'offert' && beneficiaireNom.isNotEmpty) {
      return 'Pour $beneficiaireNom';
    }
    if (type == 'don' && roleDon == 'recu' && donateurNom.isNotEmpty) {
      return 'De $donateurNom';
    }
    if (lignes.isNotEmpty) return lignes.join(', ');
    return '';
  }

  String get libelleStatut {
    switch (statut) {
      case 'confirme':
        return 'Confirmé';
      case 'en_attente':
        return 'En attente';
      case 'refuse':
        return 'Refusé';
      default:
        return statut.isEmpty ? 'En attente' : statut;
    }
  }

  /// La facture n'existe qu'une fois le paiement confirmé,
  /// le serveur répond 409 avant.
  bool get peutTelechargerFacture => statut == 'confirme';

  String get dateTexte =>
      creeLe == null ? '' : afficherDate(creeLe!);
}

/// Un membre vu par l'administration, ligne de GET /admin/membres
/// ou détail de GET /admin/membres/:id.
class MembreAdmin {
  const MembreAdmin({
    required this.id,
    required this.matricule,
    required this.nomComplet,
    required this.fonction,
    required this.etablissementId,
    required this.etablissement,
    required this.cotisationStatut,
    required this.dernierPaiementCotisation,
    required this.photo,
    required this.valideJusqua,
    required this.inscritLe,
    required this.statutAdhesion,
    required this.dateNaissance,
    required this.telephone,
    required this.email,
    required this.roleCompte,
  });

  factory MembreAdmin.depuisJson(Map<String, dynamic> json) {
    return MembreAdmin(
      id: (json['id'] ?? '').toString(),
      matricule: (json['matricule'] ?? '').toString(),
      nomComplet: (json['nom_complet'] ?? '').toString(),
      fonction: (json['fonction'] ?? '').toString(),
      etablissementId: (json['etablissement_id'] ?? '').toString(),
      etablissement: (json['etablissement'] ?? '').toString(),
      cotisationStatut: (json['cotisation_statut'] ?? '').toString(),
      dernierPaiementCotisation: DateTime.tryParse(
          (json['dernier_paiement_cotisation'] ?? '').toString()),
      photo: (json['photo'] as String?),
      valideJusqua: (json['valide_jusqua'] ?? '').toString(),
      inscritLe: (json['inscrit_le'] ?? '').toString(),
      statutAdhesion: (json['statut_adhesion'] ?? '').toString(),
      dateNaissance: (json['date_naissance'] ?? '').toString(),
      telephone: (json['telephone'] ?? '').toString(),
      email: (json['email'] ?? '').toString(),
      roleCompte: (json['role_compte'] ?? '').toString(),
    );
  }

  final String id;
  final String matricule;
  final String nomComplet;
  final String fonction;
  final String etablissementId;
  final String etablissement;
  final String cotisationStatut;
  final DateTime? dernierPaiementCotisation;
  final String? photo;
  final String valideJusqua;
  final String inscritLe;
  final String statutAdhesion;
  final String dateNaissance;
  final String telephone;
  final String email;
  final String roleCompte;

  bool get adhesionValidee => statutAdhesion == 'validee';

  String get libelleAdhesion {
    switch (statutAdhesion) {
      case 'validee':
        return 'Adhésion validée';
      case 'suspendue':
        return 'Adhésion suspendue';
      default:
        return 'Adhésion non validée';
    }
  }

  String get libelleCotisation {
    switch (cotisationStatut) {
      case 'confirme':
        return 'Cotisation confirmée';
      case 'en_attente':
        return 'Cotisation en attente';
      default:
        return 'Aucune cotisation';
    }
  }

  String get validiteTexte {
    final date = DateTime.tryParse(valideJusqua);
    if (date == null) return '';
    return afficherDate(date);
  }

  MembreAdmin copierAvec({
    String? nomComplet,
    String? dateNaissance,
    String? etablissementId,
    String? etablissement,
    String? statutAdhesion,
  }) {
    return MembreAdmin(
      id: id,
      matricule: matricule,
      nomComplet: nomComplet ?? this.nomComplet,
      fonction: fonction,
      etablissementId: etablissementId ?? this.etablissementId,
      etablissement: etablissement ?? this.etablissement,
      cotisationStatut: cotisationStatut,
      dernierPaiementCotisation: dernierPaiementCotisation,
      photo: photo,
      valideJusqua: valideJusqua,
      inscritLe: inscritLe,
      statutAdhesion: statutAdhesion ?? this.statutAdhesion,
      dateNaissance: dateNaissance ?? this.dateNaissance,
      telephone: telephone,
      email: email,
      roleCompte: roleCompte,
    );
  }
}

/// Un établissement à choisir dans le dialogue Corriger.
class EtablissementChoix {
  const EtablissementChoix({required this.id, required this.nom});

  factory EtablissementChoix.depuisJson(Map<String, dynamic> json) {
    return EtablissementChoix(
      id: (json['id'] ?? '').toString(),
      nom: (json['nom'] ?? '').toString(),
    );
  }

  final String id;
  final String nom;
}

/// Nom complet en deux mots minimum, carte 101 : un seul mot ne
/// suffit pas pour identifier la personne. Même règle côté serveur.
bool nomDeuxMots(String nom) {
  final mots =
      nom.trim().split(RegExp(r'\s+')).where((m) => m.isNotEmpty);
  return mots.length >= 2;
}

/// Nom complet en majuscules, carte 125 : espaces superflus
/// réduits à un seul, accents gardés. Même règle côté serveur.
String nomMajuscules(String nom) {
  return nom.trim().replaceAll(RegExp(r'\s+'), ' ').toUpperCase();
}

/// Date ISO AAAA-MM-JJ vers DateTime, null si absente ou invalide.
DateTime? dateIsoVersDate(String? iso) {
  if (iso == null || iso.isEmpty) return null;
  return DateTime.tryParse(iso);
}

/// DateTime vers ISO AAAA-MM-JJ, format attendu par le serveur.
String isoDepuisDate(DateTime date) {
  final mois = date.month.toString().padLeft(2, '0');
  final jour = date.day.toString().padLeft(2, '0');
  return '${date.year}-$mois-$jour';
}
