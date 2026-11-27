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

  List<PresenceLigne> get presences;
  Future<void> chargerPresences();
  List<PresenceActiviteEntree> get presencesActivite;
  String get presencesActiviteNom;
  TauxPresence? get tauxPresence;
  Future<void> chargerPresencesActivite(String activiteId, String nom);

  List<DocumentStructure> get documents;
  Future<void> chargerDocuments();
  Future<bool> publierDocument({
    required String titre,
    String? lien,
    String? etablissementId,
  });
  Future<bool> supprimerDocument(String id);

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
    required String membreId,
    required String fonctionCode,
    required String portee,
    String? etablissementId,
    String? evenementId,
  });
  Future<bool> revoquerNomination(String id);

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

  @override
  Future<void> chargerChiffres() async {
    final valeurs = List<String?>.filled(6, null);
    // 1. Membres inscrits, GET /admin/membres.
    try {
      final lignes = await _api.fetchAdminMembres();
      valeurs[0] = formaterNombre(lignes.length);
      accesAdmin = true;
    } catch (_) {
      accesAdmin = false;
    }
    // 2. Présences ce mois, GET /presences, en nombre.
    try {
      final lignes = await _api.fetchPresences();
      final maintenant = DateTime.now();
      var nb = 0;
      for (final l in lignes) {
        final p = PresenceLigne.depuisJson(l);
        final d = p.scanneLe;
        if (d != null &&
            d.year == maintenant.year &&
            d.month == maintenant.month) {
          nb++;
        }
      }
      valeurs[1] = formaterNombre(nb);
    } catch (_) {}
    // 3. Cotisations, GET /admin/paiements/totaux?type=cotisation.
    try {
      final totaux = await _api.fetchAdminPaymentsTotaux(
        type: 'cotisation',
      );
      final total = (totaux['total_confirme'] as num?)?.toInt() ?? 0;
      valeurs[2] = formaterNombre(total);
    } catch (_) {}
    // 4. Inscriptions au camp, prochain événement.
    try {
      final lignes = await _api.fetchEvenements();
      final camps = [
        for (final l in lignes) EvenementAdmin.depuisJson(l),
      ];
      final prochain = EvenementAdmin.prochain(camps);
      if (prochain != null) {
        final inscriptions =
            await _api.fetchAdminInscriptions(prochain.id);
        valeurs[3] = formaterNombre(inscriptions.length);
      }
    } catch (_) {}
    // 5. Demandes en attente : liens parent-enfant en attente
    // plus demandes de prière en attente.
    try {
      var nb = 0;
      final liens =
          await _api.fetchLiensParentEnfantAdmin(statut: 'en_attente');
      nb += liens.length;
      final data = await _api.fetchDemandesPriereBureau();
      final demandes = (data['demandes'] as List?) ?? const [];
      for (final l in demandes) {
        if (l is Map<String, dynamic>) {
          final d = DemandeSuivi.depuisJson(l);
          if (d.statut == 'en_attente') nb++;
        }
      }
      valeurs[4] = formaterNombre(nb);
    } catch (_) {}
    // 6. Établissements, GET /etablissements.
    try {
      final lignes = await _api.fetchEtablissements();
      valeurs[5] = formaterNombre(lignes.length);
    } catch (_) {}
    chiffres = [
      for (var i = 0; i < libellesChiffres.length; i++)
        ChiffreAdmin(
          libelle: libellesChiffres[i],
          valeur: valeurs[i] ?? '—',
        ),
    ];
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
      final lignes =
          await _api.fetchAdminPayments(statut: 'en_attente');
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
          if (l is Map<String, dynamic>)
            PresenceActiviteEntree.depuisJson(l),
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
    String? etablissementId,
  }) async {
    try {
      await _api.publishDocument(
        titre: titre,
        lien: lien,
        etablissementId: etablissementId,
      );
      await chargerDocuments();
      return true;
    } catch (_) {
      return false;
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

  String _csv(List<List<String>> lignes) {
    final b = StringBuffer();
    for (final ligne in lignes) {
      b.writeln(
        ligne
            .map((c) => '"${c.replaceAll('"', '""')}"')
            .join(';'),
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
      final lignes =
          await _api.fetchBureau(etablissementId: etablissementId);
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
        for (final l in lignes)
          MembreAdmin.depuisJson(l),
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
    required String membreId,
    required String fonctionCode,
    required String portee,
    String? etablissementId,
    String? evenementId,
  }) async {
    try {
      await _api.creerNomination({
        'membre_id': membreId,
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
