// Service de la tranche T18, 27 nov. 2026 : refonte de
// l'Espace Structure, lots 1 et 2 ensemble, page À propos,
// établissements. Chaque lecture est indépendante : un échec
// laisse la valeur précédente, ou « — » pour les chiffres,
// jamais un 0 inventé. Aucune écriture en base lors d'une
// lecture. Le Tremplin professionnel n'a pas de route serveur
// : ses offres restent en local, comme dans le service T9.
import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../api.dart';
import 'modeles_t14.dart';
import 'modeles_t18.dart';
import 'modeles_t9.dart';

/// Contrat du service T18, pour les pages et les tests.
abstract class ServiceT18 {
  bool get accesAdmin;
  Future<void> chargerAccesAdmin();
  List<ChiffreAdmin> get chiffres;
  Future<void> chargerChiffres();

  /// Lecture groupée du tableau de bord, correction de suivi
  /// 27 nov. 2026 : les 6 chiffres et la comptabilité du mois
  /// en cours en un seul appel.
  Future<void> chargerTableauDeBord();

  ComptabiliteAdmin? get comptabilite;
  Future<void> chargerComptabilite({String? mois, String? etablissementId});

  List<PaiementAdmin> get paiementsEnAttente;
  Future<void> chargerPaiementsEnAttente();
  Future<bool> validerPaiement(
    String id, {
    String? waveTransactionId,
    String? moyen,
  });
  Map<String, dynamic> get totauxPaiements;
  Future<void> chargerTotauxPaiements();
  int get nbEnLigne;
  Future<void> chargerEnLigne();

  List<ActualiteAdmin> get actualitesAdmin;
  Future<void> chargerActualitesAdmin();
  Future<bool> publierActualite({
    required String titre,
    required String texte,
    String? etablissementId,
    DateTime? programmeeLe,
  });

  /// Annonce audio, correction de suivi 27 nov. 2026 : même
  /// outil de publication que le texte, avec établissement et
  /// programmation.
  Future<bool> publierAnnonceAudio({
    required String titre,
    String? texte,
    String? audioId,
    String? lienAudio,
    String? etablissementId,
    DateTime? programmeeLe,
  });

  /// Carte vidéo, correction de suivi 27 nov. 2026 : même
  /// outil de publication, avec établissement et programmation.
  Future<bool> publierCarteVideo({
    required String titre,
    String? explication,
    required String lienVideo,
    String? etablissementId,
    DateTime? programmeeLe,
  });

  /// Téléversement d'un audio, renvoie l'identifiant du
  /// fichier, null en cas d'échec.
  Future<String?> televerserAudio(List<int> octets, String nomFichier);
  Future<bool> modifierActualite(
    String id, {
    String? titre,
    String? texte,
    DateTime? programmeeLe,
    bool annulerProgrammation = false,
  });
  Future<bool> supprimerActualite(String id);

  List<EvenementAdmin> get evenements;
  Future<void> chargerEvenements();
  List<InscriptionCampAdmin> get inscriptionsCamp;
  Future<void> chargerInscriptions(String evenementId);
  SuiviVersements get suiviVersements;
  Future<void> chargerSuiviVersements(String evenementId);

  /// Programme du camp, correctif global 27 nov. 2026 :
  /// lecture par les campeurs inscrits et leurs parents,
  /// gestion par la structure. Les types viennent du serveur.
  List<EntreeChronogramme> get chronogramme;
  List<String> get chronogrammeTypes;
  String? get chronogrammeDebut;
  String? get chronogrammeFin;
  Future<bool> chargerChronogramme(String evenementId);
  Future<bool> creerEntreeChronogramme(
    String evenementId, {
    required String jour,
    required String heureDebut,
    required String heureFin,
    required String titre,
    String? lieu,
    String? type,
  });
  Future<bool> modifierEntreeChronogramme(
    String evenementId,
    String entreeId, {
    required String jour,
    required String heureDebut,
    required String heureFin,
    required String titre,
    String? lieu,
    String? type,
  });
  Future<bool> supprimerEntreeChronogramme(
    String evenementId,
    String entreeId,
  );
  Future<bool> appliquerModeleChronogramme(
    String evenementId,
    String dimanche,
  );

  List<PresenceLigne> get presences;
  Future<void> chargerPresences();
  List<PresenceActiviteEntree> get presencesActivite;
  String get presencesActiviteNom;
  TauxPresence? get tauxPresence;
  Future<void> chargerPresencesActivite(String activiteId, String nom);

  /// Pointage par scan QR, correctif global 27 nov. 2026 :
  /// présence sur une activité, ou règlement espèces de la
  /// cotisation du mois, 1 000 FCFA, mois en cours côté serveur.
  Future<bool> scannerPresence(String activiteId, String matricule);
  Future<bool> marquerEspeces(String matricule);

  List<DocumentStructure> get documents;
  Future<void> chargerDocuments();
  Future<bool> publierDocument({
    required String titre,
    String? lien,
    String? fichierId,
    String? etablissementId,
  });
  Future<bool> supprimerDocument(String id);

  /// Téléversement d'un document (PDF, Word, Excel, PowerPoint),
  /// renvoie l'identifiant du fichier, null en cas d'échec.
  Future<String?> televerserDocument(List<int> octets, String nomFichier);

  /// Export complet en Excel ou PDF, généré côté serveur.
  /// Renvoie les octets, null en cas d'échec.
  Future<List<int>?> telechargerExport(String sujet,
      {String format = 'xlsx', String? evenementId});

  List<AttestationAdmin> get attestations;
  Future<void> chargerAttestations();
  Future<bool> creerAttestation({
    required String membreId,
    required String type,
    required String activite,
  });
  Future<bool> annulerAttestation(String id);
  Future<List<int>?> telechargerAttestationPdf(String id);

  List<LigneAudit> get audit;
  Future<void> chargerAudit();

  List<PaiementAdmin> get paiementsTous;
  Future<void> chargerPaiementsTous({String? statut});

  /// Détail des cotisations, correction de suivi 27 nov. 2026.
  List<PaiementAdmin> get paiementsCotisations;
  Map<String, dynamic> get totauxCotisations;
  Future<void> chargerPaiementsCotisations();
  String exporterMembresCsv(List<MembreAdmin> membres);
  String exporterPaiementsCsv();
  String exporterPresencesCsv();
  String exporterInscriptionsCsv();

  List<EtablissementAdmin> get etablissements;
  String? get monEtablissementId;
  Future<void> chargerEtablissements();
  Future<bool> creerEtablissement(String nom);
  Future<bool> renommerEtablissement(String id, String nom);
  Future<bool> definirMonEtablissement(String? id);
  FicheEtablissement? get ficheEtablissement;
  Future<void> chargerFicheEtablissement(String id);
  Future<bool> publierActiviteEtablissement(String id, String titre);

  List<MembreBureau> get bureau;
  Future<void> chargerBureau({String? etablissementId});
  Future<bool> ajouterResponsable({
    required String nom,
    required String fonction,
    String? contact,
    bool contactPublic,
    String? etablissementId,
  });
  Future<bool> importerBureau(
    List<Map<String, dynamic>> lignes, {
    String? etablissementId,
  });
  Future<bool> deplacerBureau({
    String? sourceEtablissementId,
    String? destinationEtablissementId,
  });
  List<NominationAdmin> get nominationsEtablissement;
  Future<void> chargerNominationsEtablissement(String id);
  List<AttestationMembre> get mesAttestations;
  Future<void> chargerMesAttestations();

  List<MembreAdmin> get administrateurs;
  Future<void> chargerAdministrateurs();
  List<MembreAdmin> get membresAdmin;
  Future<void> chargerMembresAdmin();
  Future<bool> definirRole(
    String membreId,
    String role, {
    String? etablissementId,
    String? fonctionAdmin,
  });

  List<NominationAdmin> get nominations;
  Future<void> chargerNominations({String? etablissementId});
  Future<bool> creerNomination({
    String? membreId,
    String? personneExterneId,
    required String fonctionCode,
    required String portee,
    String? etablissementId,
    String? evenementId,
  });
  Future<bool> revoquerNomination(String id);

  /// Personnes hors système, correctif global 27 nov. 2026.
  List<PersonneExterne> get personnesExternes;
  Future<void> chargerPersonnesExternes();
  Future<PersonneExterne?> creerPersonneExterne(
    Map<String, dynamic> corps,
  );
  Future<bool> modifierPersonneExterne(
    String id,
    Map<String, dynamic> corps,
  );
  Future<bool> supprimerPersonneExterne(String id);
  Future<Map<String, dynamic>?> inscrireAuCampAdmin(
    String evenementId,
    Map<String, dynamic> corps,
  );

  List<ElectionAdmin> get elections;
  Future<void> chargerElections();
  Future<bool> creerElection({
    required String titre,
    String? description,
    String? poste,
    required DateTime debut,
    required DateTime fin,
    required List<String> matriculesCandidats,
  });
  Future<bool> ajouterCandidat(String electionId, String matricule);
  ElectionAdmin? get electionDetail;
  List<CandidatElection> get candidatsElection;
  Future<void> chargerElection(String id);
  Future<Map<String, dynamic>?> chargerResultatsElection(String id);
  Future<bool> voterElection(String electionId, String candidatId);

  List<LienAdmin> get liensEnAttente;
  Future<void> chargerLiensEnAttente();
  Future<bool> validerLien(String id);
  Future<bool> rejeterLien(String id);

  List<SuiviScolaire> get suivisScolaires;
  Future<void> chargerSuivisScolaires({
    String? etablissementId,
    String? anneeScolaire,
  });
  Future<bool> creerSuiviScolaire(Map<String, dynamic> corps);

  List<PlanningResponsable> get plannings;
  Future<void> chargerPlannings({String? mois, String? etablissementId});
  Future<bool> creerPlanning(Map<String, dynamic> corps);
  Future<bool> modifierPlanning(String id, Map<String, dynamic> corps);

  List<OffreOpportunite> get offresLocales;
  Future<void> chargerOffresLocales();
  Future<bool> ajouterOffreLocale(OffreOpportunite offre);
  Future<bool> retirerOffreLocale(String id);
}

/// Implémentation réelle du service T18.
class ServiceT18Reel implements ServiceT18 {
  ServiceT18Reel({ApiClient? api}) : _api = api ?? ApiClient();
  final ApiClient _api;

  @override
  bool accesAdmin = false;

  /// Accès administrateur : GET /admin/membres réussit en 200.
  @override
  Future<void> chargerAccesAdmin() async {
    try {
      await _api.fetchAdminMembres();
      accesAdmin = true;
    } catch (_) {
      accesAdmin = false;
    }
  }

  @override
  List<ChiffreAdmin> chiffres = const [];

  /// Clés de la route groupée, dans l'ordre des libellés.
  static const _clesChiffres = [
    'membres',
    'presences',
    'cotisations',
    'inscriptions',
    'demandes',
    'etablissements',
  ];

  @override
  Future<void> chargerChiffres() async => chargerTableauDeBord();

  /// Tableau de bord, correction de suivi 27 nov. 2026 : UNE
  /// seule lecture groupée, les 6 chiffres et la comptabilité
  /// du mois en cours, au lieu des 6 lectures séquentielles
  /// qui se faisaient 429 en rafale. La dernière valeur connue
  /// est gardée quand la lecture échoue : jamais de « — » comme
  /// état final quand on a déjà un chiffre.
  @override
  Future<void> chargerTableauDeBord() async {
    final anciennes = {
      for (final c in chiffres) c.libelle: c.valeur,
    };
    try {
      final data = await _api.fetchTableauDeBord();
      final valeurs = data['chiffres'];
      if (valeurs is Map<String, dynamic>) {
        chiffres = [
          for (var i = 0; i < libellesChiffres.length; i++)
            ChiffreAdmin(
              libelle: libellesChiffres[i],
              valeur: valeurs[_clesChiffres[i]] is num
                  ? formaterNombre((valeurs[_clesChiffres[i]] as num).toInt())
                  : anciennes[libellesChiffres[i]] ?? '—',
            ),
        ];
        accesAdmin = true;
      }
      final compta = data['comptabilite'];
      if (compta is Map<String, dynamic>) {
        comptabilite = ComptabiliteAdmin.depuisJson(compta);
      }
    } catch (_) {
      if (chiffres.isEmpty) {
        chiffres = [
          for (final libelle in libellesChiffres)
            ChiffreAdmin(libelle: libelle, valeur: '—'),
        ];
      }
    }
  }

  @override
  ComptabiliteAdmin? comptabilite;

  @override
  Future<void> chargerComptabilite({
    String? mois,
    String? etablissementId,
  }) async {
    try {
      final data = await _api.fetchComptabilite(
        mois: mois,
        etablissementId: etablissementId,
      );
      comptabilite = ComptabiliteAdmin.depuisJson(data);
    } catch (_) {}
  }

  @override
  List<PaiementAdmin> paiementsEnAttente = const [];

  @override
  Future<void> chargerPaiementsEnAttente() async {
    try {
      final lignes = await _api.fetchAdminPayments(statut: 'en_attente');
      paiementsEnAttente = [
        for (final l in lignes) PaiementAdmin.depuisJson(l),
      ];
    } catch (_) {
      paiementsEnAttente = [];
    }
  }

  @override
  Future<bool> validerPaiement(
    String id, {
    String? waveTransactionId,
    String? moyen,
  }) async {
    try {
      await _api.validateAdminPayment(
        id,
        waveTransactionId: waveTransactionId,
        moyen: moyen,
      );
      await chargerPaiementsEnAttente();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Map<String, dynamic> totauxPaiements = const {};

  @override
  Future<void> chargerTotauxPaiements() async {
    try {
      totauxPaiements = await _api.fetchAdminPaymentsTotaux();
    } catch (_) {}
  }

  @override
  int nbEnLigne = 0;

  @override
  Future<void> chargerEnLigne() async {
    try {
      final lignes = await _api.fetchOnlineMembers();
      nbEnLigne = lignes.length;
    } catch (_) {}
  }

  @override
  List<ActualiteAdmin> actualitesAdmin = const [];

  @override
  Future<void> chargerActualitesAdmin() async {
    try {
      final lignes = await _api.fetchActualitesAdmin();
      actualitesAdmin = [
        for (final l in lignes) ActualiteAdmin.depuisJson(l),
      ];
    } catch (_) {
      actualitesAdmin = [];
    }
  }

  @override
  Future<bool> publierActualite({
    required String titre,
    required String texte,
    String? etablissementId,
    DateTime? programmeeLe,
  }) async {
    try {
      await _api.createActualite(
        titre: titre,
        texte: texte,
        etablissementId: etablissementId,
        programmeeLe: programmeeLe,
      );
      await chargerActualitesAdmin();
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Annonce audio, correction de suivi 27 nov. 2026 : l'audio
  /// revient dans l'outil unique de publication, avec le choix
  /// de l'établissement et la programmation.
  @override
  Future<bool> publierAnnonceAudio({
    required String titre,
    String? texte,
    String? audioId,
    String? lienAudio,
    String? etablissementId,
    DateTime? programmeeLe,
  }) async {
    try {
      await _api.createAnnonceAudio(
        titre: titre,
        texte: texte,
        audioId: audioId,
        lienAudio: lienAudio,
        etablissementId: etablissementId,
        programmeeLe: programmeeLe,
      );
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Carte vidéo, correction de suivi 27 nov. 2026 : même
  /// outil unique, avec le choix de l'établissement et la
  /// programmation, comme l'annonce audio.
  @override
  Future<bool> publierCarteVideo({
    required String titre,
    String? explication,
    required String lienVideo,
    String? etablissementId,
    DateTime? programmeeLe,
  }) async {
    try {
      await _api.createCarteVideo(
        titre: titre,
        explication: explication,
        lienVideo: lienVideo,
        etablissementId: etablissementId,
        programmeeLe: programmeeLe,
      );
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Téléversement d'un audio (annonce audio), renvoie
  /// l'identifiant du fichier, null en cas d'échec.
  @override
  Future<String?> televerserAudio(List<int> octets, String nomFichier) async {
    try {
      return await _api.uploadAudio(bytes: octets, filename: nomFichier);
    } catch (_) {
      return null;
    }
  }

  @override
  Future<bool> modifierActualite(
    String id, {
    String? titre,
    String? texte,
    DateTime? programmeeLe,
    bool annulerProgrammation = false,
  }) async {
    try {
      await _api.updateActualite(
        id,
        titre: titre,
        texte: texte,
        programmeeLe: programmeeLe,
        annulerProgrammation: annulerProgrammation,
      );
      await chargerActualitesAdmin();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<bool> supprimerActualite(String id) async {
    try {
      await _api.deleteActualite(id);
      await chargerActualitesAdmin();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  List<EvenementAdmin> evenements = const [];

  @override
  Future<void> chargerEvenements() async {
    try {
      final lignes = await _api.fetchEvenements();
      evenements = [
        for (final l in lignes) EvenementAdmin.depuisJson(l),
      ];
    } catch (_) {
      evenements = [];
    }
  }

  @override
  List<InscriptionCampAdmin> inscriptionsCamp = const [];

  @override
  Future<void> chargerInscriptions(String evenementId) async {
    try {
      final lignes = await _api.fetchAdminInscriptions(evenementId);
      inscriptionsCamp = [
        for (final l in lignes) InscriptionCampAdmin.depuisJson(l),
      ];
    } catch (_) {
      inscriptionsCamp = [];
    }
  }

  @override
  SuiviVersements suiviVersements = SuiviVersements.vide();

  @override
  Future<void> chargerSuiviVersements(String evenementId) async {
    try {
      final data = await _api.fetchSuiviVersements(evenementId);
      suiviVersements = SuiviVersements.depuisJson(data);
    } catch (_) {
      suiviVersements = SuiviVersements.vide();
    }
  }

  @override
  List<EntreeChronogramme> chronogramme = const [];

  @override
  List<String> chronogrammeTypes = const [];

  @override
  String? chronogrammeDebut;

  @override
  String? chronogrammeFin;

  @override
  Future<bool> chargerChronogramme(String evenementId) async {
    try {
      final data = await _api.fetchChronogramme(evenementId);
      final lignes = data['entrees'];
      chronogramme = [
        if (lignes is List)
          for (final l in lignes)
            if (l is Map<String, dynamic>) EntreeChronogramme.depuisJson(l),
      ];
      final types = data['types'];
      chronogrammeTypes = [
        if (types is List)
          for (final t in types) t.toString(),
      ];
      final ev = data['evenement'];
      if (ev is Map<String, dynamic>) {
        chronogrammeDebut = (ev['date_debut'] ?? '').toString();
        chronogrammeFin = (ev['date_fin'] ?? '').toString();
      }
      return true;
    } catch (_) {
      chronogramme = const [];
      chronogrammeTypes = const [];
      return false;
    }
  }

  @override
  Future<bool> creerEntreeChronogramme(
    String evenementId, {
    required String jour,
    required String heureDebut,
    required String heureFin,
    required String titre,
    String? lieu,
    String? type,
  }) async {
    try {
      await _api.creerEntreeChronogramme(
        evenementId,
        jour: jour,
        heureDebut: heureDebut,
        heureFin: heureFin,
        titre: titre,
        lieu: lieu,
        type: type,
      );
      return chargerChronogramme(evenementId);
    } catch (_) {
      return false;
    }
  }

  @override
  Future<bool> modifierEntreeChronogramme(
    String evenementId,
    String entreeId, {
    required String jour,
    required String heureDebut,
    required String heureFin,
    required String titre,
    String? lieu,
    String? type,
  }) async {
    try {
      await _api.modifierEntreeChronogramme(
        evenementId,
        entreeId,
        jour: jour,
        heureDebut: heureDebut,
        heureFin: heureFin,
        titre: titre,
        lieu: lieu,
        type: type,
      );
      return chargerChronogramme(evenementId);
    } catch (_) {
      return false;
    }
  }

  @override
  Future<bool> supprimerEntreeChronogramme(
    String evenementId,
    String entreeId,
  ) async {
    try {
      await _api.supprimerEntreeChronogramme(evenementId, entreeId);
      return chargerChronogramme(evenementId);
    } catch (_) {
      return false;
    }
  }

  @override
  Future<bool> appliquerModeleChronogramme(
    String evenementId,
    String dimanche,
  ) async {
    try {
      await _api.appliquerModeleChronogramme(evenementId, dimanche);
      return chargerChronogramme(evenementId);
    } catch (_) {
      return false;
    }
  }

  @override
  List<PresenceLigne> presences = const [];

  @override
  Future<void> chargerPresences() async {
    try {
      final lignes = await _api.fetchPresences();
      presences = [
        for (final l in lignes) PresenceLigne.depuisJson(l),
      ];
    } catch (_) {
      presences = [];
    }
  }

  // Correctif global, 27 nov. 2026 : pointage par scan QR.
  @override
  Future<bool> scannerPresence(String activiteId, String matricule) async {
    try {
      await _api.scanPresence(
        activiteId: activiteId,
        matricule: matricule,
      );
      await chargerPresencesActivite(activiteId, presencesActiviteNom);
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<bool> marquerEspeces(String matricule) async {
    try {
      await _api.enregistrerCotisationEspeces(matricule);
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  List<PresenceActiviteEntree> presencesActivite = const [];

  @override
  String presencesActiviteNom = '';

  @override
  TauxPresence? tauxPresence;

  @override
  Future<void> chargerPresencesActivite(
    String activiteId,
    String nom,
  ) async {
    presencesActiviteNom = nom;
    try {
      final data = await _api.fetchPresencesActivite(activiteId);
      final entrees = (data['entrees'] as List?) ?? const [];
      presencesActivite = [
        for (final l in entrees)
          if (l is Map<String, dynamic>) PresenceActiviteEntree.depuisJson(l),
      ];
    } catch (_) {
      presencesActivite = [];
    }
    try {
      final data = await _api.fetchTauxPresence(activiteId);
      tauxPresence = TauxPresence.depuisJson(data);
    } catch (_) {
      tauxPresence = null;
    }
  }

  @override
  List<DocumentStructure> documents = const [];

  @override
  Future<void> chargerDocuments() async {
    try {
      final lignes = await _api.fetchDocuments();
      documents = [
        for (final l in lignes) DocumentStructure.depuisJson(l),
      ];
    } catch (_) {
      documents = [];
    }
  }

  @override
  Future<bool> publierDocument({
    required String titre,
    String? lien,
    String? fichierId,
    String? etablissementId,
  }) async {
    try {
      await _api.publishDocument(
        titre: titre,
        lien: lien,
        fichierId: fichierId,
        etablissementId: etablissementId,
      );
      await chargerDocuments();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<String?> televerserDocument(
      List<int> octets, String nomFichier) async {
    try {
      return await _api.uploadDocument(bytes: octets, filename: nomFichier);
    } catch (_) {
      return null;
    }
  }

  @override
  Future<List<int>?> telechargerExport(String sujet,
      {String format = 'xlsx', String? evenementId}) async {
    try {
      return await _api.telechargerExport(sujet,
          format: format, evenementId: evenementId);
    } catch (_) {
      return null;
    }
  }

  @override
  Future<bool> supprimerDocument(String id) async {
    try {
      await _api.deleteDocument(id);
      await chargerDocuments();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  List<AttestationAdmin> attestations = const [];

  @override
  Future<void> chargerAttestations() async {
    try {
      final lignes = await _api.fetchAttestations();
      attestations = [
        for (final l in lignes) AttestationAdmin.depuisJson(l),
      ];
    } catch (_) {
      attestations = [];
    }
  }

  @override
  Future<bool> creerAttestation({
    required String membreId,
    required String type,
    required String activite,
  }) async {
    try {
      await _api.createAttestation({
        'membre_id': membreId,
        'type': type,
        'activite': activite,
      });
      await chargerAttestations();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<bool> annulerAttestation(String id) async {
    try {
      await _api.annulerAttestation(id);
      await chargerAttestations();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<List<int>?> telechargerAttestationPdf(String id) async {
    try {
      return await _api.fetchAttestationPdf(id);
    } catch (_) {
      return null;
    }
  }

  @override
  List<LigneAudit> audit = const [];

  @override
  Future<void> chargerAudit() async {
    try {
      final lignes = await _api.fetchAudit();
      audit = [for (final l in lignes) LigneAudit.depuisJson(l)];
    } catch (_) {
      audit = [];
    }
  }

  @override
  List<PaiementAdmin> paiementsTous = const [];

  @override
  Future<void> chargerPaiementsTous({String? statut}) async {
    try {
      final lignes = await _api.fetchAdminPayments(statut: statut);
      paiementsTous = [
        for (final l in lignes) PaiementAdmin.depuisJson(l),
      ];
    } catch (_) {
      paiementsTous = [];
    }
  }

  /// Détail des cotisations, correction de suivi 27 nov. 2026 :
  /// liste des paiements de cotisation et leurs totaux, pour la
  /// carte Cotisations du tableau de bord.
  @override
  List<PaiementAdmin> paiementsCotisations = const [];

  @override
  Map<String, dynamic> totauxCotisations = const {};

  @override
  Future<void> chargerPaiementsCotisations() async {
    try {
      final lignes = await _api.fetchAdminPayments(type: 'cotisation');
      paiementsCotisations = [
        for (final l in lignes) PaiementAdmin.depuisJson(l),
      ];
    } catch (_) {
      paiementsCotisations = [];
    }
    try {
      totauxCotisations =
          await _api.fetchAdminPaymentsTotaux(type: 'cotisation');
    } catch (_) {}
  }

  String _csv(List<List<String>> lignes) {
    final b = StringBuffer();
    for (final ligne in lignes) {
      b.writeln(
        ligne.map((c) => '"${c.replaceAll('"', '""')}"').join(';'),
      );
    }
    return b.toString();
  }

  @override
  String exporterMembresCsv(List<MembreAdmin> membres) => _csv([
        ['Nom', 'Matricule', 'Fonction', 'Rôle', 'Établissement'],
        for (final m in membres)
          [
            m.nomComplet,
            m.matricule,
            m.fonction,
            m.roleCompte,
            m.etablissement,
          ],
      ]);

  @override
  String exporterPaiementsCsv() => _csv([
        ['Référence', 'Type', 'Montant FCFA', 'Statut', 'Moyen', 'Membre'],
        for (final p in paiementsTous)
          [
            p.reference,
            p.type,
            p.montantFcfa.toString(),
            p.statut,
            p.moyen,
            p.nomMembre,
          ],
      ]);

  @override
  String exporterPresencesCsv() => _csv([
        ['Activité', 'Statut', 'Scanné le', 'Méthode', 'Scanné par'],
        for (final p in presences)
          [
            p.activiteId,
            p.statut,
            p.scanneLe?.toIso8601String() ?? '',
            p.methode,
            p.scanneParNom,
          ],
      ]);

  @override
  String exporterInscriptionsCsv() => _csv([
        ['Nom', 'Matricule', 'Inscrit le', 'Pass visible'],
        for (final i in inscriptionsCamp)
          [
            i.nomComplet,
            i.matricule,
            i.inscritLe?.toIso8601String() ?? '',
            i.passVisible ? 'oui' : 'non',
          ],
      ]);

  @override
  List<EtablissementAdmin> etablissements = const [];

  @override
  String? monEtablissementId;

  @override
  Future<void> chargerEtablissements() async {
    try {
      final lignes = await _api.fetchEtablissements();
      final base = [
        for (final l in lignes) EtablissementAdmin.depuisJson(l),
      ];
      String? mien;
      try {
        final moi = await _api.fetchMoi();
        mien = (moi['etablissement_id'] as String?) ??
            (moi['etablissement'] is Map
                ? (moi['etablissement'] as Map)['id']?.toString()
                : null);
      } catch (_) {}
      monEtablissementId = mien;
      final avecCompteurs = <EtablissementAdmin>[];
      for (final e in base) {
        var activites = 0;
        var actualites = 0;
        try {
          final detail = await _api.fetchEtablissement(e.id);
          activites = (detail['activites'] as List?)?.length ?? 0;
          actualites = (detail['actualites'] as List?)?.length ?? 0;
        } catch (_) {}
        var evenements = 0;
        try {
          final tous = await _api.fetchEvenements();
          for (final l in tous) {
            if ((l['etablissement_id'] ?? '').toString() == e.id) {
              evenements++;
            }
          }
        } catch (_) {}
        avecCompteurs.add(
          e.avecCompteurs(
            activites: activites,
            evenements: evenements,
            actualites: actualites,
            mien: mien != null && mien == e.id,
          ),
        );
      }
      etablissements = avecCompteurs;
    } catch (_) {
      etablissements = [];
    }
  }

  @override
  Future<bool> creerEtablissement(String nom) async {
    try {
      await _api.createEtablissement(nom: nom);
      await chargerEtablissements();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<bool> renommerEtablissement(String id, String nom) async {
    try {
      await _api.updateEtablissement(id: id, nom: nom);
      await chargerEtablissements();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<bool> definirMonEtablissement(String? id) async {
    try {
      await _api.updateMonEtablissement(id);
      await chargerEtablissements();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  FicheEtablissement? ficheEtablissement;

  @override
  Future<void> chargerFicheEtablissement(String id) async {
    try {
      final detail = await _api.fetchEtablissement(id);
      final activites = <ActiviteEtablissement>[];
      for (final a in (detail['activites'] as List?) ?? const []) {
        if (a is Map<String, dynamic>) {
          activites.add(ActiviteEtablissement.depuisJson(a));
        }
      }
      final actualites = <ActualiteAdmin>[];
      for (final a in (detail['actualites'] as List?) ?? const []) {
        if (a is Map<String, dynamic>) {
          actualites.add(ActualiteAdmin.depuisJson(a));
        }
      }
      var bureau = <Map<String, dynamic>>[];
      try {
        bureau = await _api.fetchBureau(etablissementId: id);
      } catch (_) {}
      var nominations = <NominationAdmin>[];
      try {
        final lignes = await _api.fetchNominationsEtablissement(id);
        nominations = [
          for (final l in lignes) NominationAdmin.depuisJson(l),
        ];
      } catch (_) {}
      var mesAttestations = <AttestationMembre>[];
      try {
        final lignes = await _api.fetchMesAttestations();
        mesAttestations = [
          for (final l in lignes) AttestationMembre.depuisJson(l),
        ];
      } catch (_) {}
      ficheEtablissement = FicheEtablissement(
        etablissement: EtablissementAdmin.depuisJson(detail),
        activites: activites,
        actualites: actualites,
        bureau: bureau,
        nominations: nominations,
        mesAttestations: mesAttestations,
      );
    } catch (_) {
      ficheEtablissement = null;
    }
  }

  @override
  Future<bool> publierActiviteEtablissement(
    String id,
    String titre,
  ) async {
    try {
      await _api.createActivite(etablissementId: id, titre: titre);
      await chargerFicheEtablissement(id);
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  List<MembreBureau> bureau = const [];

  @override
  Future<void> chargerBureau({String? etablissementId}) async {
    try {
      final lignes = await _api.fetchBureau(etablissementId: etablissementId);
      bureau = [
        for (final l in lignes) MembreBureau.depuisJson(l),
      ];
    } catch (_) {
      bureau = [];
    }
  }

  @override
  Future<bool> ajouterResponsable({
    required String nom,
    required String fonction,
    String? contact,
    bool contactPublic = false,
    String? etablissementId,
  }) async {
    try {
      await _api.creerBureau({
        'nom': nom,
        'fonction': fonction,
        if (contact != null && contact.isNotEmpty) 'contact': contact,
        'contact_public': contactPublic,
        if (etablissementId != null) 'etablissement_id': etablissementId,
      });
      await chargerBureau(etablissementId: etablissementId);
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<bool> importerBureau(
    List<Map<String, dynamic>> lignes, {
    String? etablissementId,
  }) async {
    try {
      await _api.importBureau(lignes, etablissementId: etablissementId);
      await chargerBureau(etablissementId: etablissementId);
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<bool> deplacerBureau({
    String? sourceEtablissementId,
    String? destinationEtablissementId,
  }) async {
    try {
      await _api.deplacerBureau(
        sourceEtablissementId: sourceEtablissementId,
        destinationEtablissementId: destinationEtablissementId,
      );
      await chargerBureau();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  List<NominationAdmin> nominationsEtablissement = const [];

  @override
  Future<void> chargerNominationsEtablissement(String id) async {
    try {
      final lignes = await _api.fetchNominationsEtablissement(id);
      nominationsEtablissement = [
        for (final l in lignes) NominationAdmin.depuisJson(l),
      ];
    } catch (_) {
      nominationsEtablissement = [];
    }
  }

  @override
  List<AttestationMembre> mesAttestations = const [];

  @override
  Future<void> chargerMesAttestations() async {
    try {
      final lignes = await _api.fetchMesAttestations();
      mesAttestations = [
        for (final l in lignes) AttestationMembre.depuisJson(l),
      ];
    } catch (_) {
      mesAttestations = [];
    }
  }

  @override
  List<MembreAdmin> administrateurs = const [];

  @override
  Future<void> chargerAdministrateurs() async {
    try {
      final lignes = await _api.fetchAdminMembres();
      administrateurs = [
        for (final l in lignes) MembreAdmin.depuisJson(l),
      ].where((m) => m.roleCompte != 'membre').toList();
    } catch (_) {
      administrateurs = [];
    }
  }

  /// Tous les membres, pour la recherche par matricule ou nom
  /// dans les formulaires administrateurs.
  @override
  List<MembreAdmin> membresAdmin = const [];

  @override
  Future<void> chargerMembresAdmin() async {
    try {
      final lignes = await _api.fetchAdminMembres();
      membresAdmin = [
        for (final l in lignes) MembreAdmin.depuisJson(l),
      ];
    } catch (_) {
      membresAdmin = [];
    }
  }

  @override
  Future<bool> definirRole(
    String membreId,
    String role, {
    String? etablissementId,
    String? fonctionAdmin,
  }) async {
    try {
      await _api.definirRoleMembre(
        membreId,
        role,
        etablissementId: etablissementId,
        fonctionAdmin: fonctionAdmin,
      );
      await chargerAdministrateurs();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  List<NominationAdmin> nominations = const [];

  @override
  Future<void> chargerNominations({String? etablissementId}) async {
    try {
      final lignes = await _api.fetchNominationsAdmin(
        etablissementId: etablissementId,
      );
      nominations = [
        for (final l in lignes) NominationAdmin.depuisJson(l),
      ];
    } catch (_) {
      nominations = [];
    }
  }

  @override
  Future<bool> creerNomination({
    String? membreId,
    String? personneExterneId,
    required String fonctionCode,
    required String portee,
    String? etablissementId,
    String? evenementId,
  }) async {
    try {
      await _api.creerNomination({
        if (membreId != null && membreId.isNotEmpty) 'membre_id': membreId,
        if (personneExterneId != null && personneExterneId.isNotEmpty)
          'personne_externe_id': personneExterneId,
        'fonction_code': fonctionCode,
        'portee': portee,
        if (etablissementId != null) 'etablissement_id': etablissementId,
        if (evenementId != null) 'evenement_id': evenementId,
      });
      await chargerNominations();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  List<PersonneExterne> personnesExternes = const [];

  @override
  Future<void> chargerPersonnesExternes() async {
    try {
      final lignes = await _api.fetchPersonnesExternes();
      personnesExternes = [
        for (final l in lignes) PersonneExterne.depuisJson(l),
      ];
    } catch (_) {
      personnesExternes = [];
    }
  }

  @override
  Future<PersonneExterne?> creerPersonneExterne(
    Map<String, dynamic> corps,
  ) async {
    try {
      final ligne = await _api.creerPersonneExterne(corps);
      await chargerPersonnesExternes();
      return PersonneExterne.depuisJson(ligne);
    } catch (_) {
      return null;
    }
  }

  @override
  Future<bool> modifierPersonneExterne(
    String id,
    Map<String, dynamic> corps,
  ) async {
    try {
      await _api.modifierPersonneExterne(id, corps);
      await chargerPersonnesExternes();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<bool> supprimerPersonneExterne(String id) async {
    try {
      await _api.supprimerPersonneExterne(id);
      await chargerPersonnesExternes();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<Map<String, dynamic>?> inscrireAuCampAdmin(
    String evenementId,
    Map<String, dynamic> corps,
  ) async {
    try {
      return await _api.inscrireAuCampAdmin(evenementId, corps);
    } catch (_) {
      return null;
    }
  }

  @override
  Future<bool> revoquerNomination(String id) async {
    try {
      await _api.revoquerNomination(id);
      await chargerNominations();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  List<ElectionAdmin> elections = const [];

  @override
  Future<void> chargerElections() async {
    try {
      final lignes = await _api.fetchElectionsAdmin();
      elections = [
        for (final l in lignes) ElectionAdmin.depuisJson(l),
      ];
    } catch (_) {
      elections = [];
    }
  }

  @override
  Future<bool> creerElection({
    required String titre,
    String? description,
    String? poste,
    required DateTime debut,
    required DateTime fin,
    required List<String> matriculesCandidats,
  }) async {
    try {
      await _api.creerElection(
        titre: titre,
        description: description,
        poste: poste,
        debut: debut,
        fin: fin,
        matricules: matriculesCandidats,
      );
      await chargerElections();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<bool> ajouterCandidat(String electionId, String matricule) async {
    try {
      await _api.ajouterCandidatElection(electionId, matricule);
      await chargerElection(electionId);
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  ElectionAdmin? electionDetail;

  @override
  List<CandidatElection> candidatsElection = const [];

  @override
  Future<void> chargerElection(String id) async {
    try {
      final data = await _api.fetchElectionAdmin(id);
      electionDetail = ElectionAdmin.depuisJson(data);
      final candidats = (data['candidats'] as List?) ?? const [];
      candidatsElection = [
        for (final c in candidats)
          if (c is Map<String, dynamic>) CandidatElection.depuisJson(c),
      ];
    } catch (_) {
      electionDetail = null;
      candidatsElection = [];
    }
  }

  @override
  Future<Map<String, dynamic>?> chargerResultatsElection(
    String id,
  ) async {
    try {
      return await _api.fetchResultatsElection(id);
    } catch (_) {
      return null;
    }
  }

  @override
  Future<bool> voterElection(String electionId, String candidatId) async {
    try {
      await _api.voterElection(electionId, candidatId);
      await chargerElection(electionId);
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  List<LienAdmin> liensEnAttente = const [];

  @override
  Future<void> chargerLiensEnAttente() async {
    try {
      final lignes =
          await _api.fetchLiensParentEnfantAdmin(statut: 'en_attente');
      liensEnAttente = [
        for (final l in lignes) LienAdmin.depuisJson(l),
      ];
    } catch (_) {
      liensEnAttente = [];
    }
  }

  @override
  Future<bool> validerLien(String id) async {
    try {
      await _api.validerLienParentEnfant(id);
      await chargerLiensEnAttente();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<bool> rejeterLien(String id) async {
    try {
      await _api.rejeterLienParentEnfant(id);
      await chargerLiensEnAttente();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  List<SuiviScolaire> suivisScolaires = const [];

  @override
  Future<void> chargerSuivisScolaires({
    String? etablissementId,
    String? anneeScolaire,
  }) async {
    try {
      final lignes = await _api.fetchSuivisScolaires(
        etablissementId: etablissementId,
        anneeScolaire: anneeScolaire,
      );
      suivisScolaires = [
        for (final l in lignes) SuiviScolaire.depuisJson(l),
      ];
    } catch (_) {
      suivisScolaires = [];
    }
  }

  @override
  Future<bool> creerSuiviScolaire(Map<String, dynamic> corps) async {
    try {
      await _api.createSuiviScolaire(corps);
      await chargerSuivisScolaires();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  List<PlanningResponsable> plannings = const [];

  @override
  Future<void> chargerPlannings({
    String? mois,
    String? etablissementId,
  }) async {
    try {
      final lignes = await _api.fetchPlannings(
        mois: mois,
        etablissementId: etablissementId,
      );
      plannings = [
        for (final l in lignes) PlanningResponsable.depuisJson(l),
      ];
    } catch (_) {
      plannings = [];
    }
  }

  @override
  Future<bool> creerPlanning(Map<String, dynamic> corps) async {
    try {
      await _api.createPlanning(corps);
      await chargerPlannings();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<bool> modifierPlanning(
    String id,
    Map<String, dynamic> corps,
  ) async {
    try {
      await _api.updatePlanning(id, corps);
      await chargerPlannings();
      return true;
    } catch (_) {
      return false;
    }
  }

  // Tremplin professionnel : pas de route serveur. Les offres
  // restent en local, même clé que le service T9, pour que le
  // Bureau et les membres voient les mêmes offres.
  @override
  List<OffreOpportunite> offresLocales = const [];

  @override
  Future<void> chargerOffresLocales() async {
    final prefs = await SharedPreferences.getInstance();
    final lignes = prefs.getStringList('offres_emploi') ?? const <String>[];
    final offres = <OffreOpportunite>[];
    for (final l in lignes) {
      try {
        final j = jsonDecode(l);
        if (j is Map<String, dynamic>) {
          offres.add(OffreOpportunite.depuisJson(j));
        }
      } catch (_) {}
    }
    offresLocales = offres;
  }

  Future<void> _sauverOffres() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList(
      'offres_emploi',
      [
        for (final o in offresLocales)
          jsonEncode({
            'id': o.id,
            'titre': o.titre,
            'type': o.type,
            'pays': o.pays,
            'organisme': o.organisme,
            'ville': o.ville,
            'dateLimite': o.dateLimite,
            'description': o.description,
            'contact': o.contact,
          }),
      ],
    );
  }

  @override
  Future<bool> ajouterOffreLocale(OffreOpportunite offre) async {
    try {
      offresLocales = [...offresLocales, offre];
      await _sauverOffres();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<bool> retirerOffreLocale(String id) async {
    try {
      offresLocales = offresLocales.where((o) => o.id != id).toList();
      await _sauverOffres();
      return true;
    } catch (_) {
      return false;
    }
  }
}
