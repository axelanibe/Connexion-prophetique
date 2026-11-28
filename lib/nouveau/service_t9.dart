// Service des pages nouvelles et retenues, tranche T9, 26 nov. 2026.
// Lectures par l'API existante seulement, aucune écriture en
// base lors d'une lecture. Les écritures sont celles que
// l'utilisateur demande : son créneau de prière, sa demande de
// prière, sa fonction, sa demande d'abonnement, son lien
// parent-enfant. Les états individuels (mon créneau, offres
// lues, jours lus du plan) restent en stockage local.
import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../api.dart';
import '../app_models.dart';
import '../parcours_bible.dart';
import 'modeles_profil.dart' show membreDepuisMoi;
import 'modeles_t18.dart' show NominationAdmin;
import 'modeles_t9.dart';
import 'service_bible.dart';

/// Contrat du service T9, pour les pages et leurs tests.
abstract class ServiceT9 {
  Future<void> chargerMembre();
  Member? get membre;
  String get paysResidence;

  Future<void> chargerChaine({String? jour});
  String get jourChaine;
  String get aujourdHui;
  List<CreneauPriere> get creneaux;
  int get couverts;
  int get totalCreneaux;
  CreneauPriere? get monCreneau;
  bool get chainePasse;
  Future<bool> engagerCreneau(int heure, {bool deplacer});
  Future<bool> libererCreneau();

  Future<void> chargerSuivi();
  List<DemandeSuivi> get demandes;
  ParrainageSuivi? get monParrain;
  List<ParrainageSuivi> get filleuls;
  Future<bool> envoyerDemande(String texte);

  Future<void> chargerOpportunites();
  List<OffreOpportunite> get offres;

  Future<void> chargerDocuments();
  List<AttestationMembre> get attestations;
  List<DocumentStructure> get documents;
  Future<List<int>?> telechargerAttestation(String id);

  Future<void> chargerCroissance();
  Set<int> get joursLus;
  int get jourPlanAujourdhui;
  List<(String, int)> get chapitresAujourdHui;
  Future<void> basculerJour(int jour);

  Future<bool> changerFonction(String fonction);

  /// Responsabilités affectées au membre, nominations actives.
  Future<void> chargerMesNominations();
  List<NominationAdmin> get mesNominations;

  Future<void> chargerAbonnement();
  AbonnementEtat get abonnement;
  Future<bool> demanderAbonnement();

  Future<void> chargerGalerie();
  List<InscriptionBadge> get inscriptions;

  Future<void> chargerStructure();
  List<MembreBureau> get bureau;
  List<EnfantLie> get enfants;
  List<EnfantLie> get liens;
  Future<List<EnfantLie>> chercherEnfant(String saisie);
  Future<bool> demanderLien(String enfantMembreId);
  Future<bool> retirerLien(String lienId);

  Future<void> chargerEspaceStructure();
  bool get accesAdmin;
  List<DemandeSuivi> get demandesBureau;
  List<EnfantLie> get liensEnAttente;
}

/// Implémentation réelle, sur l'API existante et le stockage local.
class ServiceT9Reel implements ServiceT9 {
  ServiceT9Reel({ApiClient? client, ServiceBible? bible})
      : _api = client ?? api,
        _bible = bible ?? ServiceBibleReel();
  final ApiClient _api;
  final ServiceBible _bible;

  Member? _membre;
  var _pays = '';

  var _jourChaine = '';
  var _aujourdHui = '';
  var _creneaux = <CreneauPriere>[];
  var _couverts = 0;
  var _totalCreneaux = 24;
  CreneauPriere? _monCreneau;

  static const _cleChaineJour = 't9_chaine_jour';
  static const _cleChaineHeure = 't9_chaine_heure';

  var _demandes = <DemandeSuivi>[];
  ParrainageSuivi? _monParrain;
  var _filleuls = <ParrainageSuivi>[];

  var _offres = <OffreOpportunite>[];

  var _attestations = <AttestationMembre>[];
  var _documents = <DocumentStructure>[];

  var _joursLus = <int>{};
  var _chapitresAujourdHui = <(String, int)>[];

  var _abonnement = AbonnementEtat.aucun();

  var _inscriptions = <InscriptionBadge>[];

  var _bureau = <MembreBureau>[];
  var _enfants = <EnfantLie>[];
  var _liens = <EnfantLie>[];

  var _accesAdmin = false;
  var _demandesBureau = <DemandeSuivi>[];
  var _liensEnAttente = <EnfantLie>[];

  @override
  Member? get membre => _membre;

  @override
  String get paysResidence => _pays;

  @override
  String get jourChaine => _jourChaine;

  @override
  String get aujourdHui => _aujourdHui;

  @override
  List<CreneauPriere> get creneaux => List.unmodifiable(_creneaux);

  @override
  int get couverts => _couverts;

  @override
  int get totalCreneaux => _totalCreneaux;

  @override
  CreneauPriere? get monCreneau => _monCreneau;

  @override
  bool get chainePasse =>
      _jourChaine.isNotEmpty &&
      _aujourdHui.isNotEmpty &&
      _jourChaine.compareTo(_aujourdHui) < 0;

  @override
  List<DemandeSuivi> get demandes => List.unmodifiable(_demandes);

  @override
  ParrainageSuivi? get monParrain => _monParrain;

  @override
  List<ParrainageSuivi> get filleuls => List.unmodifiable(_filleuls);

  @override
  List<OffreOpportunite> get offres => List.unmodifiable(_offres);

  @override
  List<AttestationMembre> get attestations => List.unmodifiable(_attestations);

  @override
  List<DocumentStructure> get documents => List.unmodifiable(_documents);

  @override
  Set<int> get joursLus => Set.unmodifiable(_joursLus);

  @override
  int get jourPlanAujourdhui {
    final now = DateTime.now();
    final debut = DateTime(now.year, 1, 1);
    final jour = now.difference(debut).inDays + 1;
    return jour.clamp(1, nbJoursPlanAnnuel);
  }

  @override
  List<(String, int)> get chapitresAujourdHui =>
      List.unmodifiable(_chapitresAujourdHui);

  @override
  AbonnementEtat get abonnement => _abonnement;

  @override
  List<InscriptionBadge> get inscriptions => List.unmodifiable(_inscriptions);

  @override
  List<MembreBureau> get bureau => List.unmodifiable(_bureau);

  @override
  List<EnfantLie> get enfants => List.unmodifiable(_enfants);

  @override
  List<EnfantLie> get liens => List.unmodifiable(_liens);

  @override
  bool get accesAdmin => _accesAdmin;

  @override
  List<DemandeSuivi> get demandesBureau => List.unmodifiable(_demandesBureau);

  @override
  List<EnfantLie> get liensEnAttente => List.unmodifiable(_liensEnAttente);

  @override
  Future<void> chargerMembre() async {
    try {
      final moi = await _api.fetchMoi();
      _membre = membreDepuisMoi(moi);
      _pays = paysResidenceCanonique((moi['pays_residence'] ?? '').toString());
    } catch (_) {
      // Hors ligne : le membre connu est gardé.
    }
  }

  @override
  Future<void> chargerChaine({String? jour}) async {
    try {
      final data = await _api.fetchChainePriere(jour: jour);
      _jourChaine = (data['jour'] ?? '').toString();
      _aujourdHui = (data['aujourd_hui'] ?? '').toString();
      _couverts = (data['couverts'] as num?)?.toInt() ?? 0;
      _totalCreneaux = (data['total'] as num?)?.toInt() ?? 24;
      final lignes = (data['creneaux'] as List?) ?? const [];
      final prefs = await SharedPreferences.getInstance();
      final jourSouvenu = prefs.getString(_cleChaineJour) ?? '';
      final heureSouvenue = prefs.getInt(_cleChaineHeure);
      _monCreneau = null;
      _creneaux = [
        for (final l in lignes)
          if (l is Map<String, dynamic>)
            CreneauPriere(
              heure: (l['heure'] as num?)?.toInt() ?? 0,
              prenom: (l['prenom'] ?? '').toString(),
              estMien: jourSouvenu == _jourChaine &&
                  heureSouvenue != null &&
                  (l['heure'] as num?)?.toInt() == heureSouvenue,
            ),
      ];
      for (final c in _creneaux) {
        if (c.estMien) _monCreneau = c;
      }
    } catch (_) {
      // Hors ligne : la dernière chaîne connue est gardée.
    }
  }

  @override
  Future<bool> engagerCreneau(int heure, {bool deplacer = false}) async {
    try {
      await _api.engagerCreneauPriere(heure,
          jour: _jourChaine.isEmpty ? null : _jourChaine, deplacer: deplacer);
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_cleChaineJour, _jourChaine);
      await prefs.setInt(_cleChaineHeure, heure);
      await chargerChaine(jour: _jourChaine.isEmpty ? null : _jourChaine);
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<bool> libererCreneau() async {
    try {
      await _api.libererCreneauPriere(
          jour: _jourChaine.isEmpty ? null : _jourChaine);
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(_cleChaineJour);
      await prefs.remove(_cleChaineHeure);
      await chargerChaine(jour: _jourChaine.isEmpty ? null : _jourChaine);
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<void> chargerSuivi() async {
    try {
      final data = await _api.fetchDemandesPriere();
      final lignes = (data['demandes'] as List?) ?? const [];
      _demandes = [
        for (final l in lignes)
          if (l is Map<String, dynamic>) DemandeSuivi.depuisJson(l),
      ];
    } catch (_) {
      // Hors ligne : les demandes connues sont gardées.
    }
    try {
      final data = await _api.fetchParrainages();
      final commeParrain = (data['comme_parrain'] as List?) ?? const [];
      _filleuls = [
        for (final l in commeParrain)
          if (l is Map<String, dynamic>) ParrainageSuivi.filleul(l),
      ];
      final parrain = data['mon_parrain'];
      _monParrain = parrain is Map<String, dynamic>
          ? ParrainageSuivi.parrain(parrain)
          : null;
    } catch (_) {
      // Hors ligne : les parrainages connus sont gardés.
    }
  }

  @override
  Future<bool> envoyerDemande(String texte) async {
    try {
      await _api.envoyerDemandePriere(texte);
      await chargerSuivi();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<void> chargerOpportunites() async {
    final prefs = await SharedPreferences.getInstance();
    final lignes = prefs.getStringList('offres_emploi') ?? const <String>[];
    final offres = <OffreOpportunite>[];
    for (final l in lignes) {
      try {
        final j = jsonDecode(l);
        if (j is Map<String, dynamic>)
          offres.add(OffreOpportunite.depuisJson(j));
      } catch (_) {
        // Ligne locale illisible, ignorée.
      }
    }
    _offres = offres;
  }

  @override
  Future<void> chargerDocuments() async {
    try {
      final lignes = await _api.fetchMesAttestations();
      _attestations = [
        for (final l in lignes) AttestationMembre.depuisJson(l),
      ];
    } catch (_) {
      // Hors ligne : les attestations connues sont gardées.
    }
    try {
      final lignes = await _api.fetchDocuments();
      _documents = [
        for (final l in lignes) DocumentStructure.depuisJson(l),
      ];
    } catch (_) {
      // Hors ligne : les documents connus sont gardés.
    }
  }

  @override
  Future<List<int>?> telechargerAttestation(String id) async {
    try {
      final octets = await _api.fetchAttestationPdf(id, membre: true);
      return octets.toList();
    } catch (_) {
      return null;
    }
  }

  @override
  Future<void> chargerCroissance() async {
    _joursLus = await _bible.joursLusPlan();
    try {
      await _bible.charger();
      final livres = _bible.livres('fr');
      final chapitresParLivre = [
        for (final l in livres) l.chapters.length,
      ];
      final plan = joursPlanAnnuel(chapitresParLivre);
      final jour = jourPlanAujourdhui;
      _chapitresAujourdHui = [
        for (final (livre, chapitre) in plan[jour - 1])
          (livres[livre].name, chapitre),
      ];
    } catch (_) {
      _chapitresAujourdHui = [];
    }
  }

  @override
  Future<void> basculerJour(int jour) async {
    await _bible.basculerJourPlan(jour);
    _joursLus = await _bible.joursLusPlan();
  }

  @override
  Future<bool> changerFonction(String fonction) async {
    try {
      final ok = await _api.updateFonction(fonction);
      if (ok) await chargerMembre();
      return ok;
    } catch (_) {
      return false;
    }
  }

  // Correctif global, 27 nov. 2026 : responsabilités affectées
  // au membre, nominations actives, GET /moi/nominations.
  @override
  List<NominationAdmin> mesNominations = const [];

  @override
  Future<void> chargerMesNominations() async {
    try {
      final lignes = await _api.fetchMesNominations();
      mesNominations = [
        for (final l in lignes) NominationAdmin.depuisJson(l),
      ];
    } catch (_) {
      // Hors ligne : les responsabilités connues sont gardées.
    }
  }

  @override
  Future<void> chargerAbonnement() async {
    try {
      final data = await _api.fetchAbonnementPlateforme();
      _abonnement = data.isEmpty
          ? AbonnementEtat.aucun()
          : AbonnementEtat.depuisJson(data);
    } catch (_) {
      // Hors ligne : l'état connu est gardé.
    }
  }

  @override
  Future<bool> demanderAbonnement() async {
    try {
      await _api.createAbonnementPlateforme(AbonnementEtat.montantAnnuel);
      await chargerAbonnement();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<void> chargerGalerie() async {
    try {
      final lignes = await _api.fetchMesInscriptions();
      _inscriptions = [
        for (final l in lignes) InscriptionBadge.depuisJson(l),
      ];
    } catch (_) {
      // Hors ligne : les inscriptions connues sont gardées.
    }
  }

  @override
  Future<void> chargerStructure() async {
    try {
      final lignes = await _api.fetchBureau();
      _bureau = [for (final l in lignes) MembreBureau.depuisJson(l)];
    } catch (_) {
      // Hors ligne : le Bureau connu est gardé.
    }
    try {
      final lignes = await _api.fetchMesEnfants();
      _enfants = [for (final l in lignes) EnfantLie.depuisEnfants(l)];
    } catch (_) {
      // Hors ligne : les enfants connus sont gardés.
    }
    try {
      final lignes = await _api.fetchMesLiensParentEnfant();
      _liens = [for (final l in lignes) EnfantLie.depuisLien(l)];
    } catch (_) {
      // Hors ligne : les liens connus sont gardés.
    }
  }

  @override
  Future<List<EnfantLie>> chercherEnfant(String saisie) async {
    if (saisie.trim().isEmpty) return const [];
    try {
      final lignes = await _api.chercherMembresParNomOuMatricule(saisie);
      return [
        for (final l in lignes)
          EnfantLie(
            id: (l['id'] ?? '').toString(),
            nom: (l['nom_complet'] ?? '').toString(),
            matricule: (l['matricule'] ?? '').toString(),
            statut: 'trouve',
          ),
      ];
    } catch (_) {
      return const [];
    }
  }

  @override
  Future<bool> demanderLien(String enfantMembreId) async {
    try {
      await _api.demanderLienParentEnfant(enfantMembreId);
      await chargerStructure();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<bool> retirerLien(String lienId) async {
    try {
      await _api.retirerLienParentEnfant(lienId);
      await chargerStructure();
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<void> chargerEspaceStructure() async {
    try {
      final data = await _api.fetchDemandesPriereBureau();
      final lignes = (data['demandes'] as List?) ?? const [];
      _demandesBureau = [
        for (final l in lignes)
          if (l is Map<String, dynamic>) DemandeSuivi.depuisJson(l),
      ];
      _accesAdmin = true;
    } catch (_) {
      _accesAdmin = false;
      _demandesBureau = [];
    }
    if (!_accesAdmin) return;
    try {
      final lignes =
          await _api.fetchLiensParentEnfantAdmin(statut: 'en_attente');
      _liensEnAttente = [for (final l in lignes) EnfantLie.depuisLien(l)];
    } catch (_) {
      _liensEnAttente = [];
    }
  }
}
