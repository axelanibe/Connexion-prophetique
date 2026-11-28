// Modèles des pages nouvelles et retenues, tranche T9, 26 nov. 2026.
// Aucune donnée inventée : chaque champ vient d'une route
// existante, d'un stockage local déjà en place, ou reste vide.
// Chaîne de prière : la route existe déjà (GET, POST, DELETE
// /chaine-priere, 24 créneaux, un par membre et par jour),
// l'analyse des écarts se trompait en la disant absente.
// Suivi : mes demandes de prière et mes parrainages, routes
// existantes, le Suivi complet avec affectation de responsable
// reste la carte 175, séparée. Opportunité : les offres vivent
// en stockage local, clé offres_emploi, publiées par le Bureau,
// aucune route serveur, comme l'ancien écran.
import '../app_models.dart' show Member;

/// Un créneau d'une heure de la chaîne, 0 à 23.
class CreneauPriere {
  const CreneauPriere({
    required this.heure,
    required this.prenom,
    this.estMien = false,
  });
  final int heure;
  final String prenom;
  final bool estMien;
  bool get estLibre => prenom.isEmpty;
}

/// « 08 h – 09 h ».
String libelleCreneau(int heure) =>
    '${heure.toString().padLeft(2, '0')} h – ${((heure + 1) % 24).toString().padLeft(2, '0')} h';

/// Une demande de prière suivie, GET /demandes-priere.
class DemandeSuivi {
  const DemandeSuivi({
    required this.id,
    required this.texte,
    required this.statut,
    required this.noteSuivi,
    this.date,
  });
  final String id;
  final String texte;
  final String statut;
  final String noteSuivi;
  final DateTime? date;

  factory DemandeSuivi.depuisJson(Map<String, dynamic> j) => DemandeSuivi(
        id: (j['id'] ?? '').toString(),
        texte: (j['texte'] ?? '').toString(),
        statut: (j['statut'] ?? '').toString(),
        noteSuivi: (j['note_suivi'] ?? '').toString(),
        date: DateTime.tryParse((j['cree_le'] ?? '').toString()),
      );
}

/// Statut affiché d'une demande, tel que le serveur le donne.
String libelleStatutDemande(String statut) => switch (statut) {
      'en_attente' => 'En attente',
      'en_cours' => 'En cours',
      'traitee' => 'Traitée',
      'cloturee' => 'Clôturée',
      '' => 'À confirmer',
      _ => statut,
    };

/// Parrainage, GET /parrainages : mon parrain et mes filleuls.
class ParrainageSuivi {
  const ParrainageSuivi({
    required this.nom,
    required this.statut,
    this.dateBapteme,
  });
  final String nom;
  final String statut;
  final DateTime? dateBapteme;
  bool get estBaptise => dateBapteme != null;

  factory ParrainageSuivi.filleul(Map<String, dynamic> j) => ParrainageSuivi(
        nom: (j['filleul_nom'] ?? '').toString(),
        statut: (j['statut'] ?? '').toString(),
        dateBapteme: DateTime.tryParse((j['date_bapteme'] ?? '').toString()),
      );

  factory ParrainageSuivi.parrain(Map<String, dynamic> j) => ParrainageSuivi(
        nom: (j['parrain_nom'] ?? '').toString(),
        statut: (j['statut'] ?? '').toString(),
        dateBapteme: DateTime.tryParse((j['date_bapteme'] ?? '').toString()),
      );
}

/// Une offre d'emploi, de stage ou de formation, même forme
/// que l'ancien OffreEmploi, lue en stockage local.
class OffreOpportunite {
  const OffreOpportunite({
    required this.id,
    required this.titre,
    required this.type,
    required this.pays,
    this.organisme = '',
    this.ville = '',
    this.dateLimite = '',
    this.description = '',
    this.contact = '',
  });
  final String id;
  final String titre;
  final String type;
  final String pays;
  final String organisme;
  final String ville;
  final String dateLimite;
  final String description;
  final String contact;

  factory OffreOpportunite.depuisJson(Map<String, dynamic> j) =>
      OffreOpportunite(
        id: (j['id'] ?? '').toString(),
        titre: (j['titre'] ?? '').toString(),
        type: (j['type'] ?? '').toString(),
        pays: (j['pays'] ?? '').toString(),
        organisme: (j['organisme'] ?? '').toString(),
        ville: (j['ville'] ?? '').toString(),
        dateLimite: (j['dateLimite'] ?? '').toString(),
        description: (j['description'] ?? '').toString(),
        contact: (j['contact'] ?? '').toString(),
      );
}

/// Les 5 types d'offre, comme l'ancien écran.
const typesOffre = ['Emploi', 'Stage', 'Formation', 'Bourse', 'Bénévolat'];

/// Une attestation ou un certificat du membre, /moi/attestations.
class AttestationMembre {
  const AttestationMembre({
    required this.id,
    required this.type,
    required this.reference,
    this.activite = '',
    this.annulee = false,
  });
  final String id;
  final String type;
  final String reference;
  final String activite;
  final bool annulee;

  factory AttestationMembre.depuisJson(Map<String, dynamic> j) =>
      AttestationMembre(
        id: (j['id'] ?? '').toString(),
        type: (j['type'] ?? '').toString(),
        reference: (j['reference'] ?? '').toString(),
        activite: (j['activite'] ?? '').toString(),
        annulee: j['annulee'] == true || (j['statut'] ?? '') == 'annulee',
      );
}

/// Un document institutionnel, GET /documents.
class DocumentStructure {
  const DocumentStructure({
    required this.id,
    required this.titre,
    this.lien = '',
    this.etablissement = '',
  });
  final String id;
  final String titre;
  final String lien;
  final String etablissement;

  factory DocumentStructure.depuisJson(Map<String, dynamic> j) =>
      DocumentStructure(
        id: (j['id'] ?? '').toString(),
        titre: (j['titre'] ?? '').toString(),
        lien: (j['lien'] ?? '').toString(),
        etablissement: (j['etablissement'] ?? '').toString(),
      );
}

/// Une inscription à un camp ou une retraite, /moi/inscriptions.
/// Le badge n'existe que si le pass est visible, jamais avant
/// le paiement complet quand le camp est payant.
class InscriptionBadge {
  const InscriptionBadge({
    required this.evenementId,
    required this.nom,
    this.lieu = '',
    this.codePass = '',
    this.estKairos = false,
    this.passVisible = false,
    this.dateDebut,
    this.tarifFcfa = 0,
    this.montantPaye = 0,
    this.versementEnAttenteReference = '',
    this.versementEnAttenteMontant = 0,
    this.versementEnAttenteNumero = 0,
    this.badgeId = '',
    this.age,
    this.niveauEtude = '',
    this.structureAppartenance = '',
  });
  final String evenementId;
  final String nom;
  final String lieu;
  final String codePass;
  final bool estKairos;
  final bool passVisible;
  final DateTime? dateDebut;

  /// Progression des versements pour les camps payants, T20 :
  /// tarif, montant payé, versement en attente, pour payer le
  /// reste depuis la page du camp.
  final int tarifFcfa;
  final int montantPaye;
  final String versementEnAttenteReference;
  final int versementEnAttenteMontant;
  final int versementEnAttenteNumero;

  /// Badge KAIROS 2027, correction de suivi 27 nov. 2026 :
  /// identifiant KP-année-numéros et mentions du modèle
  /// officiel. Le médical ne sort jamais ici.
  final String badgeId;
  final int? age;
  final String niveauEtude;
  final String structureAppartenance;

  factory InscriptionBadge.depuisJson(Map<String, dynamic> j) =>
      InscriptionBadge(
        evenementId: (j['evenement_id'] ?? '').toString(),
        nom: (j['nom'] ?? '').toString(),
        lieu: (j['lieu'] ?? '').toString(),
        codePass: (j['code_pass'] ?? '').toString(),
        estKairos: j['est_kairos'] == true,
        passVisible: j['pass_visible'] == true,
        dateDebut: DateTime.tryParse((j['date_debut'] ?? '').toString()),
        tarifFcfa: (j['tarif_fcfa'] as num?)?.toInt() ?? 0,
        montantPaye: (j['montant_paye'] as num?)?.toInt() ?? 0,
        versementEnAttenteReference:
            (j['versement_en_attente_reference'] ?? '').toString(),
        versementEnAttenteMontant:
            (j['versement_en_attente_montant'] as num?)?.toInt() ?? 0,
        versementEnAttenteNumero:
            (j['versement_en_attente_numero'] as num?)?.toInt() ?? 0,
        badgeId: (j['badge_id'] ?? '').toString(),
        age: (j['age'] as num?)?.toInt(),
        niveauEtude: (j['niveau_etude'] ?? '').toString(),
        structureAppartenance:
            (j['structure_appartenance'] ?? '').toString(),
      );

  /// Donnée du QR : le code du pass, sinon matricule et camp.
  String qrData(String matricule) =>
      codePass.isNotEmpty ? codePass : 'PASS:$matricule:$evenementId';
}

/// Un membre du Bureau, GET /bureau, ordre du serveur.
class MembreBureau {
  const MembreBureau({
    required this.nom,
    required this.fonction,
    this.etablissement = '',
    this.contact = '',
  });
  final String nom;
  final String fonction;
  final String etablissement;
  final String contact;

  factory MembreBureau.depuisJson(Map<String, dynamic> j) => MembreBureau(
        nom: (j['nom'] ?? '').toString(),
        fonction: (j['fonction'] ?? '').toString(),
        etablissement: (j['etablissement'] ?? '').toString(),
        contact: (j['contact'] ?? '').toString(),
      );
}

/// Un enfant lié au compte du parent, /moi/enfants et
/// /moi/liens-parent-enfant.
class EnfantLie {
  const EnfantLie({
    required this.id,
    required this.nom,
    required this.matricule,
    required this.statut,
  });
  final String id;
  final String nom;
  final String matricule;
  final String statut;

  factory EnfantLie.depuisEnfants(Map<String, dynamic> j) => EnfantLie(
        id: (j['id'] ?? '').toString(),
        nom: (j['nom_complet'] ?? '').toString(),
        matricule: (j['matricule'] ?? '').toString(),
        statut: 'valide',
      );

  factory EnfantLie.depuisLien(Map<String, dynamic> j) => EnfantLie(
        id: (j['id'] ?? '').toString(),
        nom: (j['enfant_nom'] ?? '').toString(),
        matricule: (j['enfant_matricule'] ?? '').toString(),
        statut: (j['statut'] ?? '').toString(),
      );
}

/// Abonnement Plateforme, carte 83 : 100 000 FCFA par an, pour
/// les établissements. Seul abonnement existant.
class AbonnementEtat {
  const AbonnementEtat({
    required this.statut,
    this.dateDebut,
    this.dateFin,
  });
  final String statut;
  final DateTime? dateDebut;
  final DateTime? dateFin;

  static const montantAnnuel = 100000;

  bool get estActif =>
      statut == 'Actif' && dateFin != null && dateFin!.isAfter(DateTime.now());

  int get joursRestants =>
      dateFin == null ? 0 : dateFin!.difference(DateTime.now()).inDays;

  factory AbonnementEtat.depuisJson(Map<String, dynamic> j) =>
      AbonnementEtat(
        statut: (j['statut'] ?? 'Aucun').toString(),
        dateDebut: DateTime.tryParse((j['date_debut'] ?? '').toString()),
        dateFin: DateTime.tryParse((j['date_fin'] ?? '').toString()),
      );

  factory AbonnementEtat.aucun() => const AbonnementEtat(statut: 'Aucun');
}

/// Une demande de prière à envoyer, texte seul.
typedef TexteDemande = String;

/// Membre minimal pour le badge de camp, nom et matricule.
({String nom, String matricule}) identiteBadge(Member m) =>
    (nom: m.name, matricule: m.matricule);
