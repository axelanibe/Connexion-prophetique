// Modèles de la tranche T18, 27 nov. 2026 : refonte de
// l'Espace Structure, lots 1 et 2 ensemble, page À propos,
// établissements. Aucune donnée inventée : chaque champ vient
// d'une route existante, ou reste vide. Un chiffre dont la
// lecture échoue s'affiche « — », jamais un 0 inventé.
import 'modeles_t9.dart' show AttestationMembre;

/// Montant en FCFA, « 96 000 FCFA ».
String formaterFcfa(int montant) {
  final s = montant.abs().toString();
  final b = StringBuffer();
  for (var i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 == 0) b.write(' ');
    b.write(s[i]);
  }
  return '${montant < 0 ? '-' : ''}$b FCFA';
}

/// Nombre entier avec espaces, « 1 234 ».
String formaterNombre(int n) {
  final s = n.abs().toString();
  final b = StringBuffer();
  for (var i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 == 0) b.write(' ');
    b.write(s[i]);
  }
  return '${n < 0 ? '-' : ''}$b';
}

/// Un des 6 chiffres de l'Espace structure, maquette lignes
/// 2236-2246. La valeur est déjà mise en forme, « — » quand la
/// lecture a échoué.
class ChiffreAdmin {
  const ChiffreAdmin({required this.libelle, required this.valeur});
  final String libelle;
  final String valeur;
}

/// Les 6 libellés de la maquette, dans l'ordre.
const libellesChiffres = [
  'Membres inscrits',
  'Présences ce mois',
  'Cotisations, FCFA',
  'Inscriptions au camp',
  'Demandes en attente',
  'Établissements',
];

/// Un paiement vu par l'administration, ligne de
/// GET /admin/paiements.
class PaiementAdmin {
  const PaiementAdmin({
    required this.id,
    required this.reference,
    required this.type,
    required this.montantFcfa,
    required this.statut,
    required this.moyen,
    this.creeLe,
    this.nomMembre = '',
    this.matricule = '',
    this.beneficiaireNom = '',
    this.waveTransactionId = '',
  });
  final String id;
  final String reference;
  final String type;
  final int montantFcfa;
  final String statut;
  final String moyen;
  final DateTime? creeLe;
  final String nomMembre;
  final String matricule;
  final String beneficiaireNom;
  final String waveTransactionId;

  factory PaiementAdmin.depuisJson(Map<String, dynamic> j) => PaiementAdmin(
        id: (j['id'] ?? '').toString(),
        reference: (j['reference'] ?? '').toString(),
        type: (j['type'] ?? '').toString(),
        montantFcfa: (j['montant_fcfa'] as num?)?.toInt() ?? 0,
        statut: (j['statut'] ?? '').toString(),
        moyen: (j['moyen'] ?? '').toString(),
        creeLe: DateTime.tryParse((j['cree_le'] ?? '').toString()),
        nomMembre: (j['nom_complet'] ?? '').toString(),
        matricule: (j['matricule'] ?? '').toString(),
        beneficiaireNom: (j['beneficiaire_membre_nom'] ?? '').toString(),
        waveTransactionId: (j['wave_transaction_id'] ?? '').toString(),
      );

  String get libelle {
    switch (type) {
      case 'carte':
        return 'Carte de membre';
      case 'cotisation':
        return 'Cotisation';
      case 'don':
        return 'Don';
      case 'camp':
        return 'Camp';
      case 'achat':
        return 'Librairie';
      default:
        return type.isEmpty ? 'Paiement' : type;
    }
  }

  String get libelleStatut {
    switch (statut) {
      case 'confirme':
        return 'Confirmé';
      case 'en_attente':
        return 'En attente';
      case 'refuse':
        return 'Refusé';
      case 'annule':
        return 'Annulé';
      default:
        return statut.isEmpty ? 'En attente' : statut;
    }
  }
}

/// Comptabilité, GET /admin/comptabilite : totaux, ventilation
/// par catégorie, lignes du mois.
class ComptabiliteAdmin {
  const ComptabiliteAdmin({
    required this.mois,
    required this.totaux,
    required this.parCategorie,
    required this.lignes,
  });
  final String mois;
  final Map<String, dynamic> totaux;
  final List<(String, int)> parCategorie;
  final List<Map<String, dynamic>> lignes;

  factory ComptabiliteAdmin.depuisJson(Map<String, dynamic> j) {
    final par = <(String, int)>[];
    final brut = j['par_categorie'];
    if (brut is Map) {
      for (final e in brut.entries) {
        par.add((e.key.toString(), (e.value as num?)?.toInt() ?? 0));
      }
    } else if (brut is List) {
      for (final l in brut) {
        if (l is Map<String, dynamic>) {
          par.add((
            (l['categorie'] ?? l['libelle'] ?? '').toString(),
            (l['total'] ?? l['montant'] as num?)?.toInt() ?? 0,
          ));
        }
      }
    }
    return ComptabiliteAdmin(
      mois: (j['mois'] ?? '').toString(),
      totaux: j['totaux'] is Map<String, dynamic>
          ? j['totaux'] as Map<String, dynamic>
          : const {},
      parCategorie: par,
      lignes: [
        for (final l in (j['lignes'] as List?) ?? const [])
          if (l is Map<String, dynamic>) l,
      ],
    );
  }
}

/// Une actualité vue par l'administration, GET /admin/actualites.
class ActualiteAdmin {
  const ActualiteAdmin({
    required this.id,
    required this.titre,
    required this.texte,
    this.etablissementId = '',
    this.publieeLe,
    this.programmeeLe,
  });
  final String id;
  final String titre;
  final String texte;
  final String etablissementId;
  final DateTime? publieeLe;
  final DateTime? programmeeLe;

  factory ActualiteAdmin.depuisJson(Map<String, dynamic> j) => ActualiteAdmin(
        id: (j['id'] ?? '').toString(),
        titre: (j['titre'] ?? '').toString(),
        texte: (j['texte'] ?? '').toString(),
        etablissementId: (j['etablissement_id'] ?? '').toString(),
        publieeLe: DateTime.tryParse((j['publiee_le'] ?? '').toString()),
        programmeeLe: DateTime.tryParse((j['programmee_le'] ?? '').toString()),
      );

  bool get estProgrammee =>
      programmeeLe != null && programmeeLe!.isAfter(DateTime.now());
}

/// Un événement, ligne de GET /evenements.
class EvenementAdmin {
  const EvenementAdmin({
    required this.id,
    required this.nom,
    this.dateDebut,
    this.lieu = '',
    this.tarifFcfa = 0,
    this.inscrits = 0,
    this.etablissementId = '',
    this.etablissementNom = '',
    this.estKairos = false,
  });
  final String id;
  final String nom;
  final DateTime? dateDebut;
  final String lieu;
  final int tarifFcfa;
  final int inscrits;
  final String etablissementId;
  final String etablissementNom;
  final bool estKairos;

  factory EvenementAdmin.depuisJson(Map<String, dynamic> j) => EvenementAdmin(
        id: (j['id'] ?? '').toString(),
        nom: (j['nom'] ?? '').toString(),
        dateDebut: DateTime.tryParse((j['date_debut'] ?? '').toString()),
        lieu: (j['lieu'] ?? '').toString(),
        tarifFcfa: (j['tarif_fcfa'] as num?)?.toInt() ?? 0,
        inscrits: (j['inscrits'] as num?)?.toInt() ?? 0,
        etablissementId: (j['etablissement_id'] ?? '').toString(),
        etablissementNom: (j['etablissement_nom'] ?? '').toString(),
        estKairos: j['est_kairos'] == true,
      );

  /// Le prochain camp : le premier événement à venir, sinon le
  /// plus récent.
  static EvenementAdmin? prochain(List<EvenementAdmin> tous) {
    if (tous.isEmpty) return null;
    final maintenant = DateTime.now();
    final avenirs = tous
        .where((e) => e.dateDebut == null || !e.dateDebut!.isBefore(maintenant))
        .toList()
      ..sort((a, b) => (a.dateDebut ?? DateTime(2100))
          .compareTo(b.dateDebut ?? DateTime(2100)));
    if (avenirs.isNotEmpty) return avenirs.first;
    final passes = [...tous]..sort((a, b) => (b.dateDebut ?? DateTime(2000))
        .compareTo(a.dateDebut ?? DateTime(2000)));
    return passes.first;
  }
}

/// Une inscription à un camp, GET /admin/inscriptions.
/// Formulaire KAIROS 2027, correction de suivi 27 nov. 2026 :
/// les 5 sections vivent sur l'inscription, le médical ne
/// sort que par cette liste administrateur.
class InscriptionCampAdmin {
  const InscriptionCampAdmin({
    required this.nomComplet,
    required this.matricule,
    this.inscritLe,
    this.passVisible = false,
    this.contactParent = '',
    this.badgeId = '',
    this.badgeNumero = 0,
    this.age,
    this.sexe = '',
    this.telephone = '',
    this.email = '',
    this.residence = '',
    this.niveauEtude = '',
    this.profession = '',
    this.structureAppartenance = '',
    this.antecedentsMedicaux = '',
    this.precisionsMedicales = '',
    this.allergies = '',
    this.besoinsMedicaux = '',
    this.contactUrgenceNom = '',
    this.contactUrgenceLien = '',
    this.contactUrgenceTelephone = '',
    this.observations = '',
  });
  final String nomComplet;
  final String matricule;
  final DateTime? inscritLe;
  final bool passVisible;
  final String contactParent;
  final String badgeId;
  final int badgeNumero;
  final int? age;
  final String sexe;
  final String telephone;
  final String email;
  final String residence;
  final String niveauEtude;
  final String profession;
  final String structureAppartenance;
  final String antecedentsMedicaux;
  final String precisionsMedicales;
  final String allergies;
  final String besoinsMedicaux;
  final String contactUrgenceNom;
  final String contactUrgenceLien;
  final String contactUrgenceTelephone;
  final String observations;

  factory InscriptionCampAdmin.depuisJson(Map<String, dynamic> j) =>
      InscriptionCampAdmin(
        nomComplet: (j['nom_complet'] ?? '').toString(),
        matricule: (j['matricule'] ?? '').toString(),
        inscritLe: DateTime.tryParse((j['inscrit_le'] ?? '').toString()),
        passVisible: j['pass_visible'] == true,
        contactParent: (j['contact_parent'] ?? '').toString(),
        badgeId: (j['badge_id'] ?? '').toString(),
        badgeNumero: (j['badge_numero'] as num?)?.toInt() ?? 0,
        age: (j['age'] as num?)?.toInt(),
        sexe: (j['sexe'] ?? '').toString(),
        telephone: (j['telephone'] ?? '').toString(),
        email: (j['email'] ?? '').toString(),
        residence: (j['residence'] ?? '').toString(),
        niveauEtude: (j['niveau_etude'] ?? '').toString(),
        profession: (j['profession'] ?? '').toString(),
        structureAppartenance:
            (j['structure_appartenance'] ?? '').toString(),
        antecedentsMedicaux: (j['antecedents_medicaux'] ?? '').toString(),
        precisionsMedicales: (j['precisions_medicales'] ?? '').toString(),
        allergies: (j['allergies'] ?? '').toString(),
        besoinsMedicaux: (j['besoins_medicaux'] ?? '').toString(),
        contactUrgenceNom: (j['contact_urgence_nom'] ?? '').toString(),
        contactUrgenceLien: (j['contact_urgence_lien'] ?? '').toString(),
        contactUrgenceTelephone:
            (j['contact_urgence_telephone'] ?? '').toString(),
        observations: (j['observations'] ?? '').toString(),
      );
}

/// Une entrée du programme d'un camp, GET
/// /evenements/:id/chronogramme. Jour AAAA-MM-JJ, heures HH:MM.
class EntreeChronogramme {
  const EntreeChronogramme({
    required this.id,
    required this.jour,
    required this.heureDebut,
    required this.heureFin,
    required this.titre,
    this.lieu = '',
    this.type = '',
  });
  final String id;
  final String jour;
  final String heureDebut;
  final String heureFin;
  final String titre;
  final String lieu;
  final String type;

  String get plage => '$heureDebut – $heureFin';

  factory EntreeChronogramme.depuisJson(Map<String, dynamic> j) {
    String coupe(Object? v, int n) {
      final s = (v ?? '').toString();
      return s.length >= n ? s.substring(0, n) : s;
    }

    return EntreeChronogramme(
      id: (j['id'] ?? '').toString(),
      jour: coupe(j['jour'], 10),
      heureDebut: coupe(j['heure_debut'], 5),
      heureFin: coupe(j['heure_fin'], 5),
      titre: (j['titre'] ?? '').toString(),
      lieu: (j['lieu'] ?? '').toString(),
      type: (j['type'] ?? '').toString(),
    );
  }
}

/// Suivi des versements d'un camp, GET /admin/suivi-versements.
class SuiviVersements {
  const SuiviVersements({
    required this.campNom,
    required this.tarifFcfa,
    required this.inscritsVersements,
    required this.totalPaye,
    required this.totalRestant,
    required this.passDebloques,
    required this.avecEnAttente,
    required this.membres,
  });
  final String campNom;
  final int tarifFcfa;
  final int inscritsVersements;
  final int totalPaye;
  final int totalRestant;
  final int passDebloques;
  final int avecEnAttente;
  final List<MembreVersement> membres;

  factory SuiviVersements.vide() => const SuiviVersements(
        campNom: '',
        tarifFcfa: 0,
        inscritsVersements: 0,
        totalPaye: 0,
        totalRestant: 0,
        passDebloques: 0,
        avecEnAttente: 0,
        membres: [],
      );

  factory SuiviVersements.depuisJson(Map<String, dynamic> j) {
    final camp = j['camp'] is Map<String, dynamic>
        ? j['camp'] as Map<String, dynamic>
        : const <String, dynamic>{};
    final totaux = j['totaux'] is Map<String, dynamic>
        ? j['totaux'] as Map<String, dynamic>
        : const <String, dynamic>{};
    return SuiviVersements(
      campNom: (camp['nom'] ?? '').toString(),
      tarifFcfa: (camp['tarif_fcfa'] as num?)?.toInt() ?? 0,
      inscritsVersements: (totaux['inscrits_versements'] as num?)?.toInt() ?? 0,
      totalPaye: (totaux['total_paye'] as num?)?.toInt() ?? 0,
      totalRestant: (totaux['total_restant'] as num?)?.toInt() ?? 0,
      passDebloques: (totaux['pass_debloques'] as num?)?.toInt() ?? 0,
      avecEnAttente: (totaux['avec_en_attente'] as num?)?.toInt() ?? 0,
      membres: [
        for (final l in (j['membres'] as List?) ?? const [])
          if (l is Map<String, dynamic>) MembreVersement.depuisJson(l),
      ],
    );
  }
}

/// Un membre dans le suivi des versements.
class MembreVersement {
  const MembreVersement({
    required this.nomComplet,
    required this.matricule,
    this.etablissement = '',
    this.inscritLe,
    this.montantPaye = 0,
    this.reste = 0,
  });
  final String nomComplet;
  final String matricule;
  final String etablissement;
  final DateTime? inscritLe;
  final int montantPaye;
  final int reste;

  factory MembreVersement.depuisJson(Map<String, dynamic> j) => MembreVersement(
        nomComplet: (j['nom_complet'] ?? '').toString(),
        matricule: (j['matricule'] ?? '').toString(),
        etablissement: (j['etablissement'] ?? '').toString(),
        inscritLe: DateTime.tryParse((j['inscrit_le'] ?? '').toString()),
        montantPaye: (j['montant_paye'] as num?)?.toInt() ?? 0,
        reste: (j['reste'] as num?)?.toInt() ?? 0,
      );
}

/// Une présence scannée, ligne de GET /presences.
class PresenceLigne {
  const PresenceLigne({
    required this.id,
    required this.activiteId,
    required this.statut,
    this.scanneLe,
    this.methode = '',
    this.scanneParNom = '',
  });
  final String id;
  final String activiteId;
  final String statut;
  final DateTime? scanneLe;
  final String methode;
  final String scanneParNom;

  factory PresenceLigne.depuisJson(Map<String, dynamic> j) => PresenceLigne(
        id: (j['id'] ?? '').toString(),
        activiteId: (j['activite_id'] ?? '').toString(),
        statut: (j['statut'] ?? '').toString(),
        scanneLe: DateTime.tryParse((j['scanne_le'] ?? '').toString()),
        methode: (j['methode'] ?? '').toString(),
        scanneParNom: (j['scanne_par_nom'] ?? '').toString(),
      );
}

/// Une entrée de présence sur une activité, GET
/// /presences/activite/:id.
class PresenceActiviteEntree {
  const PresenceActiviteEntree({
    required this.nomComplet,
    required this.matricule,
    required this.statut,
    this.scanneLe,
  });
  final String nomComplet;
  final String matricule;
  final String statut;
  final DateTime? scanneLe;

  factory PresenceActiviteEntree.depuisJson(Map<String, dynamic> j) =>
      PresenceActiviteEntree(
        nomComplet: (j['nom_complet'] ?? '').toString(),
        matricule: (j['matricule'] ?? '').toString(),
        statut: (j['statut'] ?? '').toString(),
        scanneLe: DateTime.tryParse((j['scanne_le'] ?? '').toString()),
      );
}

/// Taux de présence d'une activité, GET
/// /presences/activite/:id/taux.
class TauxPresence {
  const TauxPresence({
    required this.inscrits,
    required this.presents,
    this.taux,
  });
  final int inscrits;
  final int presents;
  final double? taux;

  factory TauxPresence.depuisJson(Map<String, dynamic> j) => TauxPresence(
        inscrits: (j['inscrits'] as num?)?.toInt() ?? 0,
        presents: (j['presents'] as num?)?.toInt() ?? 0,
        taux: (j['taux'] as num?)?.toDouble(),
      );
}

/// Une attestation vue par l'administration, GET
/// /admin/attestations.
class AttestationAdmin {
  const AttestationAdmin({
    required this.id,
    required this.type,
    required this.reference,
    this.membreNom = '',
    this.delivreLe,
    this.annulee = false,
  });
  final String id;
  final String type;
  final String reference;
  final String membreNom;
  final DateTime? delivreLe;
  final bool annulee;

  factory AttestationAdmin.depuisJson(Map<String, dynamic> j) =>
      AttestationAdmin(
        id: (j['id'] ?? '').toString(),
        type: (j['type'] ?? '').toString(),
        reference: (j['reference'] ?? '').toString(),
        membreNom: (j['membre_nom'] ?? j['nom_complet'] ?? '').toString(),
        delivreLe: DateTime.tryParse((j['delivre_le'] ?? '').toString()),
        annulee: j['annulee'] == true || (j['statut'] ?? '') == 'annulee',
      );
}

/// Une ligne du journal d'audit, GET /admin/audit.
class LigneAudit {
  const LigneAudit({
    required this.id,
    required this.action,
    required this.entite,
    this.entiteId = '',
    this.details = '',
    this.horodatage,
    this.acteurNom = '',
  });
  final String id;
  final String action;
  final String entite;
  final String entiteId;
  final String details;
  final DateTime? horodatage;
  final String acteurNom;

  factory LigneAudit.depuisJson(Map<String, dynamic> j) => LigneAudit(
        id: (j['id'] ?? '').toString(),
        action: (j['action'] ?? '').toString(),
        entite: (j['entite'] ?? '').toString(),
        entiteId: (j['entite_id'] ?? '').toString(),
        details: (j['details'] ?? '').toString(),
        horodatage: DateTime.tryParse((j['horodatage'] ?? '').toString()),
        acteurNom: (j['acteur_nom'] ?? j['nom_complet'] ?? '').toString(),
      );
}

/// Un établissement, GET /etablissements, avec ses compteurs.
class EtablissementAdmin {
  const EtablissementAdmin({
    required this.id,
    required this.nom,
    this.description = '',
    this.nbActivites = 0,
    this.nbEvenements = 0,
    this.nbActualites = 0,
    this.estMien = false,
  });
  final String id;
  final String nom;
  final String description;
  final int nbActivites;
  final int nbEvenements;
  final int nbActualites;
  final bool estMien;

  factory EtablissementAdmin.depuisJson(Map<String, dynamic> j) =>
      EtablissementAdmin(
        id: (j['id'] ?? '').toString(),
        nom: (j['nom'] ?? '').toString(),
        description: (j['description'] ?? '').toString(),
      );

  EtablissementAdmin avecCompteurs({
    int? activites,
    int? evenements,
    int? actualites,
    bool? mien,
  }) =>
      EtablissementAdmin(
        id: id,
        nom: nom,
        description: description,
        nbActivites: activites ?? nbActivites,
        nbEvenements: evenements ?? nbEvenements,
        nbActualites: actualites ?? nbActualites,
        estMien: mien ?? estMien,
      );

  /// « X activité(s) · Y événements · Z actualités ».
  String get compteurs =>
      '$nbActivites activité${nbActivites > 1 ? 's' : ''} · '
      '$nbEvenements événement${nbEvenements > 1 ? 's' : ''} · '
      '$nbActualites actualité${nbActualites > 1 ? 's' : ''}';
}

/// Une activité d'établissement, GET /etablissements/:id.
class ActiviteEtablissement {
  const ActiviteEtablissement({
    required this.id,
    required this.titre,
    this.description = '',
  });
  final String id;
  final String titre;
  final String description;

  factory ActiviteEtablissement.depuisJson(Map<String, dynamic> j) =>
      ActiviteEtablissement(
        id: (j['id'] ?? '').toString(),
        titre: (j['titre'] ?? '').toString(),
        description: (j['description'] ?? '').toString(),
      );
}

/// Fiche d'un établissement : ses activités, ses actualités, son
/// Bureau, ses nominations, mes attestations.
class FicheEtablissement {
  const FicheEtablissement({
    required this.etablissement,
    required this.activites,
    required this.actualites,
    required this.bureau,
    required this.nominations,
    required this.mesAttestations,
  });
  final EtablissementAdmin etablissement;
  final List<ActiviteEtablissement> activites;
  final List<ActualiteAdmin> actualites;
  final List<Map<String, dynamic>> bureau;
  final List<NominationAdmin> nominations;
  final List<AttestationMembre> mesAttestations;
}

/// Une élection, GET /admin/elections.
class ElectionAdmin {
  const ElectionAdmin({
    required this.id,
    required this.titre,
    this.description = '',
    this.poste = '',
    this.dateDebut,
    this.dateFin,
    this.nbCandidats = 0,
    this.nbVotes = 0,
  });
  final String id;
  final String titre;
  final String description;
  final String poste;
  final DateTime? dateDebut;
  final DateTime? dateFin;
  final int nbCandidats;
  final int nbVotes;

  factory ElectionAdmin.depuisJson(Map<String, dynamic> j) {
    final candidats = (j['candidats'] as List?) ?? const [];
    return ElectionAdmin(
      id: (j['id'] ?? '').toString(),
      titre: (j['titre'] ?? '').toString(),
      description: (j['description'] ?? '').toString(),
      poste: (j['poste'] ?? '').toString(),
      dateDebut: DateTime.tryParse((j['date_debut'] ?? '').toString()),
      dateFin: DateTime.tryParse((j['date_fin'] ?? '').toString()),
      nbCandidats: (j['nb_candidats'] as num?)?.toInt() ?? candidats.length,
      nbVotes: (j['nb_votes'] as num?)?.toInt() ??
          (j['total_voix'] as num?)?.toInt() ??
          0,
    );
  }

  /// En cours quand la date de fin n'est pas passée.
  bool get enCours => dateFin == null || dateFin!.isAfter(DateTime.now());
}

/// Un candidat à une élection.
class CandidatElection {
  const CandidatElection({
    required this.id,
    required this.nomComplet,
    required this.matricule,
    this.nbVotes = 0,
  });
  final String id;
  final String nomComplet;
  final String matricule;
  final int nbVotes;

  factory CandidatElection.depuisJson(Map<String, dynamic> j) =>
      CandidatElection(
        id: (j['id'] ?? '').toString(),
        nomComplet: (j['nom_complet'] ?? j['nom'] ?? '').toString(),
        matricule: (j['matricule'] ?? '').toString(),
        nbVotes: (j['voix'] as num?)?.toInt() ??
            (j['nb_votes'] as num?)?.toInt() ??
            0,
      );
}

/// Une élection en cours pour un membre, GET /elections/actuelle,
/// salve 28 nov. 2026 : candidats avec leurs voix en direct et
/// total, son propre vote. Jamais qui a voté pour qui, seuls
/// les chiffres.
class ElectionMembre {
  const ElectionMembre({
    required this.id,
    required this.titre,
    this.description = '',
    this.poste = '',
    this.dateDebut,
    this.dateFin,
    this.candidats = const [],
    this.totalVoix = 0,
    this.aVote = false,
    this.monCandidatId,
  });
  final String id;
  final String titre;
  final String description;
  final String poste;
  final DateTime? dateDebut;
  final DateTime? dateFin;
  final List<CandidatMembre> candidats;
  final int totalVoix;
  final bool aVote;
  final String? monCandidatId;

  factory ElectionMembre.depuisJson(Map<String, dynamic> j) {
    final e = (j['election'] as Map<String, dynamic>?) ?? j;
    final lignes = (e['candidats'] as List?) ?? const [];
    final candidats = [
      for (final c in lignes)
        if (c is Map<String, dynamic>) CandidatMembre.depuisJson(c),
    ];
    final total = (e['total_voix'] as num?)?.toInt() ??
        (j['total_voix'] as num?)?.toInt() ??
        candidats.fold<int>(0, (s, c) => s + c.voix);
    return ElectionMembre(
      id: (e['id'] ?? '').toString(),
      titre: (e['titre'] ?? '').toString(),
      description: (e['description'] ?? '').toString(),
      poste: (e['poste'] ?? '').toString(),
      dateDebut: DateTime.tryParse((e['date_debut'] ?? '').toString()),
      dateFin: DateTime.tryParse((e['date_fin'] ?? '').toString()),
      candidats: candidats,
      totalVoix: total,
      aVote: e['a_vote'] == true,
      monCandidatId: (e['mon_candidat_id'] as String?)?.isEmpty == true
          ? null
          : e['mon_candidat_id'] as String?,
    );
  }

  /// En cours quand la date de fin n'est pas passée.
  bool get enCours => dateFin == null || dateFin!.isAfter(DateTime.now());

  String? get nomMonCandidat {
    if (monCandidatId == null) return null;
    for (final c in candidats) {
      if (c.id == monCandidatId) return c.nom;
    }
    return null;
  }
}

/// Un candidat vu par un membre, avec ses voix en direct.
class CandidatMembre {
  const CandidatMembre({
    required this.id,
    required this.nom,
    this.fonction = '',
    this.voix = 0,
  });
  final String id;
  final String nom;
  final String fonction;
  final int voix;

  factory CandidatMembre.depuisJson(Map<String, dynamic> j) =>
      CandidatMembre(
        id: (j['id'] ?? '').toString(),
        nom: (j['nom'] ?? '').toString(),
        fonction: (j['fonction'] ?? '').toString(),
        voix: (j['voix'] as num?)?.toInt() ??
            (j['nb_votes'] as num?)?.toInt() ??
            0,
      );
}

/// Une personne hors système, GET /admin/personnes-externes.
/// Correctif global 27 nov. 2026 : fiche personne sans compte
/// application (nom, fonction, contact), utilisable dans
/// Nominations, Planning des responsables, Département scolaire,
/// Administrateurs (désignation) et inscriptions au camp.
class PersonneExterne {
  const PersonneExterne({
    required this.id,
    required this.nomComplet,
    this.fonction = 'Membre',
    this.contact = '',
    this.etablissementId = '',
    this.etablissementNom = '',
    this.roleAdmin = '',
  });
  final String id;
  final String nomComplet;
  final String fonction;
  final String contact;
  final String etablissementId;
  final String etablissementNom;
  final String roleAdmin;

  factory PersonneExterne.depuisJson(Map<String, dynamic> j) => PersonneExterne(
        id: (j['id'] ?? '').toString(),
        nomComplet: (j['nom_complet'] ?? '').toString(),
        fonction: (j['fonction'] ?? 'Membre').toString(),
        contact: (j['contact'] ?? '').toString(),
        etablissementId: (j['etablissement_id'] ?? '').toString(),
        etablissementNom: (j['etablissement_nom'] ?? '').toString(),
        roleAdmin: (j['role_admin'] ?? '').toString(),
      );

  /// Libellé du rôle admin désigné, vide quand aucun.
  String get roleAdminLibelle {
    switch (roleAdmin) {
      case 'admin_general':
        return 'Administrateur général';
      case 'admin_etablissement':
        return 'Administrateur d’établissement';
      default:
        return '';
    }
  }
}

/// Une nomination, GET /admin/nominations.
class NominationAdmin {
  const NominationAdmin({
    required this.id,
    required this.membreId,
    this.personneExterneId = '',
    required this.nomComplet,
    required this.matricule,
    required this.fonctionCode,
    required this.fonctionLibelle,
    required this.portee,
    this.etablissementId = '',
    this.etablissementNom = '',
    this.evenementId = '',
    this.evenementNom = '',
    this.creeLe,
  });
  final String id;
  final String membreId;
  final String personneExterneId;
  final String nomComplet;
  final String matricule;
  final String fonctionCode;
  final String fonctionLibelle;
  final String portee;
  final String etablissementId;
  final String etablissementNom;
  final String evenementId;
  final String evenementNom;
  final DateTime? creeLe;

  /// Vrai quand la nomination porte sur une personne hors système.
  bool get estExterne => personneExterneId.isNotEmpty;

  factory NominationAdmin.depuisJson(Map<String, dynamic> j) => NominationAdmin(
        id: (j['id'] ?? '').toString(),
        membreId: (j['membre_id'] ?? '').toString(),
        personneExterneId: (j['personne_externe_id'] ?? '').toString(),
        nomComplet: (j['nom_complet'] ?? '').toString(),
        matricule: (j['matricule'] ?? '').toString(),
        fonctionCode: (j['fonction_code'] ?? '').toString(),
        fonctionLibelle: (j['fonction_libelle'] ?? '').toString(),
        portee: (j['portee'] ?? '').toString(),
        etablissementId: (j['etablissement_id'] ?? '').toString(),
        etablissementNom: (j['etablissement_nom'] ?? '').toString(),
        evenementId: (j['evenement_id'] ?? '').toString(),
        evenementNom: (j['evenement_nom'] ?? '').toString(),
        creeLe: DateTime.tryParse((j['cree_le'] ?? '').toString()),
      );

  /// Portée affichée : structure, établissement ou activité.
  String get porteeLibelle {
    switch (portee) {
      case 'etablissement':
        return etablissementNom.isEmpty ? 'Établissement' : etablissementNom;
      case 'activite':
        return evenementNom.isEmpty ? 'Activité' : evenementNom;
      default:
        return 'Structure';
    }
  }
}

/// Codes de fonction administrable, tels que le serveur les
/// connaît pour les nominations. La liste des libellés vient du
/// serveur (fonction_libelle) ; ici, seuls les codes déjà
/// utilisés sont proposés, jamais inventés.
const codesFonctionNomination = [
  'president',
  'secretaire',
  'tresorier',
  'chantre',
  'organisateur',
  'responsable',
  'leader',
  'pca',
  'coordinateur',
  'membre',
];

/// Classes scolaires, liste exacte du serveur.
const classesScolaires = [
  'CP1',
  'CP2',
  'CE1',
  'CE2',
  'CM1',
  'CM2',
  '6e',
  '5e',
  '4e',
  '3e',
  '2nde',
  '1ère',
  'Terminale',
  'Université',
  'Formation professionnelle',
  'Autre',
];

/// Un suivi scolaire, GET /admin/suivis-scolaires.
class SuiviScolaire {
  const SuiviScolaire({
    required this.id,
    required this.membreId,
    this.personneExterneId = '',
    required this.membreNom,
    required this.matricule,
    this.etablissement = '',
    this.classe = '',
    required this.anneeScolaire,
    this.moyenneT1,
    this.moyenneT2,
    this.moyenneT3,
    this.moyenneAnnuelle,
    this.examen = false,
    this.typeExamen = '',
    this.resultatExamen = '',
  });
  final String id;
  final String membreId;
  final String personneExterneId;
  final String membreNom;
  final String matricule;
  final String etablissement;
  final String classe;
  final String anneeScolaire;
  final double? moyenneT1;
  final double? moyenneT2;
  final double? moyenneT3;
  final double? moyenneAnnuelle;
  final bool examen;
  final String typeExamen;
  final String resultatExamen;

  /// Vrai quand le suivi porte sur une personne hors système.
  bool get estExterne => personneExterneId.isNotEmpty;

  factory SuiviScolaire.depuisJson(Map<String, dynamic> j) => SuiviScolaire(
        id: (j['id'] ?? '').toString(),
        membreId: (j['membre_id'] ?? '').toString(),
        personneExterneId: (j['personne_externe_id'] ?? '').toString(),
        membreNom: (j['membre_nom'] ?? '').toString(),
        matricule: (j['matricule'] ?? '').toString(),
        etablissement: (j['etablissement'] ?? '').toString(),
        classe: (j['classe'] ?? '').toString(),
        anneeScolaire: (j['annee_scolaire'] ?? '').toString(),
        moyenneT1: (j['moyenne_t1'] as num?)?.toDouble(),
        moyenneT2: (j['moyenne_t2'] as num?)?.toDouble(),
        moyenneT3: (j['moyenne_t3'] as num?)?.toDouble(),
        moyenneAnnuelle: (j['moyenne_annuelle'] as num?)?.toDouble(),
        examen: j['examen'] == true,
        typeExamen: (j['type_examen'] ?? '').toString(),
        resultatExamen: (j['resultat_examen'] ?? '').toString(),
      );
}

/// Un créneau du planning des responsables, GET /admin/plannings.
class PlanningResponsable {
  const PlanningResponsable({
    required this.id,
    this.membreId = '',
    this.personneExterneId = '',
    this.titre = '',
    this.date,
    this.heureDebut = '',
    this.heureFin = '',
    this.membreNom = '',
    this.matricule = '',
    this.etablissementNom = '',
    this.evenementNom = '',
    this.roleService = '',
    this.description = '',
  });
  final String id;
  final String membreId;
  final String personneExterneId;
  final String titre;
  final DateTime? date;
  final String heureDebut;
  final String heureFin;
  final String membreNom;
  final String matricule;
  final String etablissementNom;
  final String evenementNom;
  final String roleService;
  final String description;

  /// Vrai quand le créneau porte sur une personne hors système.
  bool get estExterne => personneExterneId.isNotEmpty;

  factory PlanningResponsable.depuisJson(Map<String, dynamic> j) =>
      PlanningResponsable(
        id: (j['id'] ?? '').toString(),
        membreId: (j['membre_id'] ?? '').toString(),
        personneExterneId: (j['personne_externe_id'] ?? '').toString(),
        titre: (j['titre'] ?? j['activite'] ?? '').toString(),
        date: DateTime.tryParse((j['date'] ?? '').toString()),
        heureDebut: (j['heure_debut'] ?? '').toString(),
        heureFin: (j['heure_fin'] ?? '').toString(),
        membreNom: (j['membre_nom'] ?? j['nom_complet'] ?? '').toString(),
        matricule: (j['matricule'] ?? '').toString(),
        etablissementNom:
            (j['etablissement_nom'] ?? j['etablissement'] ?? '').toString(),
        evenementNom: (j['evenement_nom'] ?? '').toString(),
        roleService: (j['role_service'] ?? '').toString(),
        description: (j['description'] ?? '').toString(),
      );
}

/// Un lien parent-enfant vu par l'administration, GET
/// /admin/liens-parent-enfant.
class LienAdmin {
  const LienAdmin({
    required this.id,
    required this.parentNom,
    required this.enfantNom,
    required this.enfantMatricule,
    required this.statut,
    this.creeLe,
  });
  final String id;
  final String parentNom;
  final String enfantNom;
  final String enfantMatricule;
  final String statut;
  final DateTime? creeLe;

  factory LienAdmin.depuisJson(Map<String, dynamic> j) => LienAdmin(
        id: (j['id'] ?? '').toString(),
        parentNom: (j['parent_nom'] ?? j['nom_complet'] ?? '').toString(),
        enfantNom: (j['enfant_nom'] ?? '').toString(),
        enfantMatricule: (j['enfant_matricule'] ?? '').toString(),
        statut: (j['statut'] ?? '').toString(),
        creeLe: DateTime.tryParse((j['cree_le'] ?? '').toString()),
      );
}
