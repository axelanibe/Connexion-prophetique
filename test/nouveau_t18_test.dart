// Tests de la tranche T18, 27 nov. 2026 : refonte de
// l'Espace Structure, lots 1 et 2 ensemble, page À propos,
// établissements. Les membres et les établissements ci-dessous
// sont des exemples de test, jamais de vraies données.
import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:share_plus/share_plus.dart';
import 'package:share_plus_platform_interface/share_plus_platform_interface.dart';

import 'package:connexion_prophetique/nouveau/modeles_t14.dart';
import 'package:connexion_prophetique/nouveau/modeles_t18.dart';
import 'package:connexion_prophetique/nouveau/modeles_t9.dart';
import 'package:connexion_prophetique/nouveau/page_a_propos.dart';
import 'package:connexion_prophetique/nouveau/page_chronogramme.dart';
import 'package:connexion_prophetique/nouveau/page_espace_admin.dart';
import 'package:connexion_prophetique/nouveau/page_etablissements.dart';
import 'package:connexion_prophetique/nouveau/page_structure.dart';
import 'package:connexion_prophetique/nouveau/service_t14.dart';
import 'package:connexion_prophetique/nouveau/service_t18.dart';
import 'package:connexion_prophetique/nouveau/service_t9.dart';

class FauxServiceT9 implements ServiceT9 {
  @override
  dynamic noSuchMethod(Invocation invocation) {
    final nom = invocation.memberName
        .toString()
        .replaceAll('Symbol("', '')
        .replaceAll('")', '');
    if (nom == 'accesAdmin') return true;
    if (nom == 'demandesBureau') return const <DemandeSuivi>[];
    if (nom == 'liensEnAttente') return const <EnfantLie>[];
    if (nom == 'chargerEspaceStructure') return Future<void>.value();
    return super.noSuchMethod(invocation);
  }
}

/// Service T14 minimal pour la page Exports : seul le format
/// Excel est testé, le service n'est jamais appelé.
class _FauxServiceT14 implements ServiceT14 {
  @override
  dynamic noSuchMethod(Invocation invocation) => super.noSuchMethod(invocation);
}

/// Partage simulé : sur Linux, le partage de fichiers n'est pas
/// implémenté, le téléchargement s'arrêterait en erreur sans lui.
class _FauxSharePlatform extends SharePlatform {
  @override
  Future<ShareResult> share(ShareParams params) async =>
      const ShareResult('', ShareResultStatus.success);
}

/// Sélecteur de fichier simulé : renvoie un PDF de 3 octets.
class _FauxFilePicker extends FilePicker {
  @override
  dynamic noSuchMethod(Invocation invocation) => super.noSuchMethod(invocation);

  @override
  Future<FilePickerResult?> pickFiles({
    FileType type = FileType.any,
    List<String>? allowedExtensions,
    String? dialogTitle,
    String? initialDirectory,
    Function(FilePickerStatus)? onFileLoading,
    bool? allowCompression = true,
    bool allowMultiple = false,
    bool? withData = false,
    int compressionQuality = 30,
    bool? withReadStream = false,
    bool lockParentWindow = false,
    bool readSequential = false,
  }) async {
    return FilePickerResult([
      PlatformFile(
        name: 'doc.pdf',
        size: 3,
        bytes: Uint8List.fromList([1, 2, 3]),
      ),
    ]);
  }
}

class FauxServiceT18 implements ServiceT18 {
  @override
  bool accesAdmin = true;

  @override
  Future<void> chargerAccesAdmin() async {}

  @override
  List<ChiffreAdmin> chiffres = const [
    ChiffreAdmin(libelle: 'Membres inscrits', valeur: '128'),
    ChiffreAdmin(libelle: 'Présences ce mois', valeur: '54'),
    ChiffreAdmin(libelle: 'Cotisations, FCFA', valeur: '96 000'),
    ChiffreAdmin(libelle: 'Inscriptions au camp', valeur: '37'),
    ChiffreAdmin(libelle: 'Demandes en attente', valeur: '3'),
    ChiffreAdmin(libelle: 'Établissements', valeur: '—'),
  ];

  @override
  Future<void> chargerChiffres() async {}

  @override
  Future<void> chargerTableauDeBord() async {}

  @override
  ComptabiliteAdmin? comptabilite;

  @override
  Future<void> chargerComptabilite({
    String? mois,
    String? etablissementId,
  }) async {}

  @override
  List<PaiementAdmin> paiementsEnAttente = const [];

  @override
  Future<void> chargerPaiementsEnAttente() async {}

  @override
  Future<bool> validerPaiement(
    String id, {
    String? waveTransactionId,
    String? moyen,
  }) async =>
      true;

  @override
  Map<String, dynamic> totauxPaiements = const {};

  @override
  Future<void> chargerTotauxPaiements() async {}

  @override
  int nbEnLigne = 0;

  @override
  Future<void> chargerEnLigne() async {}

  @override
  List<ActualiteAdmin> actualitesAdmin = const [];

  @override
  Future<void> chargerActualitesAdmin() async {}

  @override
  Future<bool> publierActualite({
    required String titre,
    required String texte,
    String? etablissementId,
    DateTime? programmeeLe,
  }) async =>
      true;

  @override
  Future<bool> publierAnnonceAudio({
    required String titre,
    String? texte,
    String? audioId,
    String? lienAudio,
    String? etablissementId,
    DateTime? programmeeLe,
  }) async =>
      true;

  @override
  Future<bool> publierCarteVideo({
    required String titre,
    String? explication,
    required String lienVideo,
    String? etablissementId,
    DateTime? programmeeLe,
  }) async =>
      true;

  @override
  Future<String?> televerserAudio(List<int> octets, String nomFichier) async => null;

  @override
  Future<bool> modifierActualite(
    String id, {
    String? titre,
    String? texte,
    DateTime? programmeeLe,
    bool annulerProgrammation = false,
  }) async =>
      true;

  @override
  Future<bool> supprimerActualite(String id) async => true;

  @override
  List<EvenementAdmin> evenements = const [];

  @override
  Future<void> chargerEvenements() async {}

  @override
  List<InscriptionCampAdmin> inscriptionsCamp = const [];

  @override
  Future<void> chargerInscriptions(String evenementId) async {}

  @override
  SuiviVersements suiviVersements = SuiviVersements.vide();

  @override
  Future<void> chargerSuiviVersements(String evenementId) async {}

  @override
  List<PresenceLigne> presences = const [];

  @override
  Future<void> chargerPresences() async {}

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
  ) async {}

  // Correctif global, 27 nov. 2026 : pointage par scan QR.
  @override
  Future<bool> scannerPresence(String activiteId, String matricule) async {
    return true;
  }

  @override
  Future<bool> marquerEspeces(String matricule) async {
    return true;
  }

  @override
  List<DocumentStructure> documents = const [];

  @override
  Future<void> chargerDocuments() async {}

  @override
  Future<bool> publierDocument({
    required String titre,
    String? lien,
    String? fichierId,
    String? etablissementId,
  }) async =>
      true;

  @override
  Future<bool> supprimerDocument(String id) async => true;

  @override
  List<EntreeChronogramme> chronogramme = [
    const EntreeChronogramme(
      id: 'c1',
      jour: '2026-07-12',
      heureDebut: '05:00',
      heureFin: '06:00',
      titre: 'Prière du matin',
      type: 'Prière',
    ),
    const EntreeChronogramme(
      id: 'c2',
      jour: '2026-07-12',
      heureDebut: '08:00',
      heureFin: '09:30',
      titre: 'Enseignement',
      lieu: 'Grande salle',
      type: 'Enseignement',
    ),
    const EntreeChronogramme(
      id: 'c3',
      jour: '2026-07-13',
      heureDebut: '05:00',
      heureFin: '06:00',
      titre: 'Prière du matin',
      type: 'Prière',
    ),
  ];

  @override
  List<String> chronogrammeTypes = const [
    'Culte',
    'Enseignement',
    'Atelier',
    'Évangélisation',
    'Prière',
    'Repas',
    'Repos',
    'Partage',
    'Vie quotidienne',
    'Activité',
  ];

  @override
  String? chronogrammeDebut = '2026-07-12';

  @override
  String? chronogrammeFin = '2026-07-18';

  @override
  Future<bool> chargerChronogramme(String evenementId) async => true;

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
    chronogramme = [
      ...chronogramme,
      EntreeChronogramme(
        id: 'c-test',
        jour: jour,
        heureDebut: heureDebut,
        heureFin: heureFin,
        titre: titre,
        lieu: lieu ?? '',
        type: type ?? '',
      ),
    ];
    return true;
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
    chronogramme = [
      for (final e in chronogramme)
        if (e.id == entreeId)
          EntreeChronogramme(
            id: e.id,
            jour: jour,
            heureDebut: heureDebut,
            heureFin: heureFin,
            titre: titre,
            lieu: lieu ?? '',
            type: type ?? '',
          )
        else
          e,
    ];
    return true;
  }

  @override
  Future<bool> supprimerEntreeChronogramme(
    String evenementId,
    String entreeId,
  ) async {
    chronogramme = [
      for (final e in chronogramme)
        if (e.id != entreeId) e,
    ];
    return true;
  }

  @override
  Future<bool> appliquerModeleChronogramme(
    String evenementId,
    String dimanche,
  ) async =>
      true;

  String? dernierFichierTeleverse;
  String? dernierExport;
  String? dernierFormatExport;

  @override
  Future<String?> televerserDocument(
      List<int> octets, String nomFichier) async {
    dernierFichierTeleverse = nomFichier;
    return 'fichier-test';
  }

  @override
  Future<List<int>?> telechargerExport(String sujet,
      {String format = 'xlsx', String? evenementId}) async {
    dernierExport = sujet;
    dernierFormatExport = format;
    return [1, 2, 3];
  }

  @override
  List<AttestationAdmin> attestations = const [];

  @override
  Future<void> chargerAttestations() async {}

  @override
  Future<bool> creerAttestation({
    required String membreId,
    required String type,
    required String activite,
  }) async =>
      true;

  @override
  Future<bool> annulerAttestation(String id) async => true;

  @override
  Future<List<int>?> telechargerAttestationPdf(String id) async => null;

  @override
  List<LigneAudit> audit = const [];

  @override
  Future<void> chargerAudit() async {}

  @override
  List<PaiementAdmin> paiementsTous = const [];

  @override
  Future<void> chargerPaiementsTous({String? statut}) async {}

  @override
  List<PaiementAdmin> paiementsCotisations = const [];

  @override
  Map<String, dynamic> totauxCotisations = const {};

  @override
  Future<void> chargerPaiementsCotisations() async {}

  @override
  String exporterMembresCsv(List<MembreAdmin> membres) =>
      ServiceT18Reel().exporterMembresCsv(membres);

  @override
  String exporterPaiementsCsv() => ServiceT18Reel().exporterPaiementsCsv();

  @override
  String exporterPresencesCsv() => ServiceT18Reel().exporterPresencesCsv();

  @override
  String exporterInscriptionsCsv() =>
      ServiceT18Reel().exporterInscriptionsCsv();

  @override
  List<EtablissementAdmin> etablissements = const [
    EtablissementAdmin(
      id: 'e1',
      nom: 'Groupe Scolaire Test',
      nbActivites: 2,
      nbEvenements: 1,
      nbActualites: 3,
      estMien: true,
    ),
    EtablissementAdmin(
      id: 'e2',
      nom: 'Collège Test',
      nbActivites: 1,
      nbEvenements: 0,
      nbActualites: 0,
    ),
  ];

  @override
  String? monEtablissementId = 'e1';

  @override
  Future<void> chargerEtablissements() async {}

  @override
  Future<bool> creerEtablissement(String nom) async => true;

  @override
  Future<bool> renommerEtablissement(String id, String nom) async => true;

  @override
  Future<bool> definirMonEtablissement(String? id) async => true;

  @override
  FicheEtablissement? ficheEtablissement;

  @override
  Future<void> chargerFicheEtablissement(String id) async {}

  @override
  Future<bool> publierActiviteEtablissement(String id, String titre) async =>
      true;

  static const _bureauComplet = [
    MembreBureau(nom: 'Awa Test', fonction: 'Présidente'),
    MembreBureau(
      nom: 'Kofi Test',
      fonction: 'Trésorier',
      etablissement: 'Groupe Scolaire Test',
    ),
    MembreBureau(nom: 'Mariam Test', fonction: 'Secrétaire'),
  ];

  @override
  List<MembreBureau> bureau = _bureauComplet;

  @override
  Future<void> chargerBureau({String? etablissementId}) async {
    // Le faux filtre comme le serveur : par identifiant.
    if (etablissementId == null) {
      bureau = _bureauComplet;
      return;
    }
    final nom = etablissements
        .firstWhere(
          (e) => e.id == etablissementId,
          orElse: () => const EtablissementAdmin(id: '', nom: ''),
        )
        .nom;
    bureau = _bureauComplet.where((m) => m.etablissement == nom).toList();
  }

  @override
  Future<bool> ajouterResponsable({
    required String nom,
    required String fonction,
    String? contact,
    bool contactPublic = false,
    String? etablissementId,
  }) async =>
      true;

  @override
  Future<bool> importerBureau(
    List<Map<String, dynamic>> lignes, {
    String? etablissementId,
  }) async =>
      true;

  @override
  Future<bool> deplacerBureau({
    String? sourceEtablissementId,
    String? destinationEtablissementId,
  }) async =>
      true;

  @override
  List<NominationAdmin> nominationsEtablissement = const [];

  @override
  Future<void> chargerNominationsEtablissement(String id) async {}

  @override
  List<AttestationMembre> mesAttestations = const [];

  @override
  Future<void> chargerMesAttestations() async {}

  @override
  List<MembreAdmin> administrateurs = const [];

  @override
  Future<void> chargerAdministrateurs() async {}

  @override
  List<MembreAdmin> membresAdmin = const [];

  @override
  Future<void> chargerMembresAdmin() async {}

  @override
  Future<bool> definirRole(
    String membreId,
    String role, {
    String? etablissementId,
    String? fonctionAdmin,
  }) async =>
      true;

  @override
  List<NominationAdmin> nominations = const [];

  @override
  Future<void> chargerNominations({String? etablissementId}) async {}

  /// Dernière nomination créée, pour vérifier la personne visée.
  Map<String, dynamic>? derniereNomination;

  @override
  Future<bool> creerNomination({
    String? membreId,
    String? personneExterneId,
    required String fonctionCode,
    required String portee,
    String? etablissementId,
    String? evenementId,
  }) async {
    derniereNomination = {
      if (membreId != null) 'membre_id': membreId,
      if (personneExterneId != null) 'personne_externe_id': personneExterneId,
      'fonction_code': fonctionCode,
      'portee': portee,
    };
    return true;
  }

  @override
  List<PersonneExterne> personnesExternes = const [];

  @override
  Future<void> chargerPersonnesExternes() async {}

  @override
  Future<PersonneExterne?> creerPersonneExterne(
    Map<String, dynamic> corps,
  ) async =>
      PersonneExterne(
        id: 'pe-test',
        nomComplet: (corps['nom_complet'] ?? '').toString(),
        fonction: (corps['fonction'] ?? 'Membre').toString(),
        contact: (corps['contact'] ?? '').toString(),
        roleAdmin: (corps['role_admin'] ?? '').toString(),
      );

  @override
  Future<bool> modifierPersonneExterne(
    String id,
    Map<String, dynamic> corps,
  ) async =>
      true;

  @override
  Future<bool> supprimerPersonneExterne(String id) async => true;

  @override
  Future<Map<String, dynamic>?> inscrireAuCampAdmin(
    String evenementId,
    Map<String, dynamic> corps,
  ) async =>
      null;

  @override
  Future<bool> revoquerNomination(String id) async => true;

  @override
  List<ElectionAdmin> elections = const [];

  @override
  Future<void> chargerElections() async {}

  @override
  Future<bool> creerElection({
    required String titre,
    String? description,
    String? poste,
    required DateTime debut,
    required DateTime fin,
    required List<String> matriculesCandidats,
  }) async =>
      true;

  @override
  Future<bool> ajouterCandidat(String electionId, String matricule) async =>
      true;

  @override
  ElectionAdmin? electionDetail;

  @override
  List<CandidatElection> candidatsElection = const [];

  @override
  Future<void> chargerElection(String id) async {}

  @override
  Future<Map<String, dynamic>?> chargerResultatsElection(String id) async =>
      null;

  @override
  Future<bool> voterElection(String electionId, String candidatId) async =>
      true;

  @override
  List<LienAdmin> liensEnAttente = [
    const LienAdmin(
      id: 'l1',
      parentNom: 'Awa Test',
      enfantNom: 'Kofi Test',
      enfantMatricule: 'CP-KT-2601',
      statut: 'en_attente',
    ),
  ];

  final liensValides = <String>[];
  final liensRejetes = <String>[];

  @override
  Future<void> chargerLiensEnAttente() async {}

  @override
  Future<bool> validerLien(String id) async {
    liensValides.add(id);
    liensEnAttente = liensEnAttente.where((l) => l.id != id).toList();
    return true;
  }

  @override
  Future<bool> rejeterLien(String id) async {
    liensRejetes.add(id);
    liensEnAttente = liensEnAttente.where((l) => l.id != id).toList();
    return true;
  }

  @override
  List<SuiviScolaire> suivisScolaires = const [];

  @override
  Future<void> chargerSuivisScolaires({
    String? etablissementId,
    String? anneeScolaire,
  }) async {}

  @override
  Future<bool> creerSuiviScolaire(Map<String, dynamic> corps) async => true;

  @override
  List<PlanningResponsable> plannings = const [];

  @override
  Future<void> chargerPlannings({
    String? mois,
    String? etablissementId,
  }) async {}

  @override
  Future<bool> creerPlanning(Map<String, dynamic> corps) async => true;

  @override
  Future<bool> modifierPlanning(
    String id,
    Map<String, dynamic> corps,
  ) async =>
      true;

  @override
  List<OffreOpportunite> offresLocales = const [];

  @override
  Future<void> chargerOffresLocales() async {}

  @override
  Future<bool> ajouterOffreLocale(OffreOpportunite offre) async => true;

  @override
  Future<bool> retirerOffreLocale(String id) async => true;
}

MembreAdmin _membreAdminTest() => MembreAdmin(
      id: 'm1',
      matricule: 'CP-AT-2601',
      nomComplet: 'Awa Test',
      fonction: 'Membre',
      etablissementId: '',
      etablissement: 'Groupe Scolaire Test',
      cotisationStatut: 'payee',
      dernierPaiementCotisation: null,
      photo: null,
      valideJusqua: '',
      inscritLe: '',
      statutAdhesion: 'valide',
      dateNaissance: '',
      telephone: '',
      email: '',
      roleCompte: 'membre',
    );

void main() {
  /// Fenêtre de téléphone, pour que les pages longues rendent
  /// comme sur l'appareil d'Axel.
  Future<void> telephone(WidgetTester tester) async {
    tester.view.physicalSize = const Size(390, 844);
    tester.view.devicePixelRatio = 1.0;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
  }

  /// Fait défiler la page jusqu'au texte, puis vérifie qu'il
  /// est là. Défilement manuel : les éléments hors écran ne
  /// sont pas construits, scrollUntilVisible ne peut pas les
  /// trouver, et il exige un seul résultat.
  Future<void> voir(WidgetTester tester, String texte) async {
    final liste = find.byType(ListView).first;
    // Retour en haut : un texte déjà dépassé ne serait jamais
    // retrouvé en ne défilant que vers le bas.
    await tester.drag(liste, const Offset(0, 5000));
    await tester.pumpAndSettle();
    for (var i = 0; i < 30; i++) {
      if (find.text(texte).evaluate().isNotEmpty) break;
      await tester.drag(liste, const Offset(0, -400));
      await tester.pumpAndSettle();
    }
    expect(find.text(texte), findsWidgets, reason: texte);
  }

  group('T18 modèles', () {
    test('formaterFcfa met les espaces', () {
      expect(formaterFcfa(96000), '96 000 FCFA');
      expect(formaterFcfa(1000), '1 000 FCFA');
      expect(formaterFcfa(0), '0 FCFA');
    });

    test('ElectionAdmin lit voix et total_voix du serveur', () {
      final e = ElectionAdmin.depuisJson({
        'id': 'el1',
        'titre': 'Élection test',
        'date_debut': '2026-12-01T00:00:00Z',
        'date_fin': '2026-12-07T00:00:00Z',
        'total_voix': 12,
        'candidats': [
          {'id': 'c1', 'nom': 'Awa Test', 'matricule': 'CP-AT-2601', 'voix': 7},
          {
            'id': 'c2',
            'nom': 'Kofi Test',
            'matricule': 'CP-KT-2601',
            'voix': 5
          },
        ],
      });
      expect(e.nbVotes, 12);
      expect(e.nbCandidats, 2);
      final c = CandidatElection.depuisJson({
        'id': 'c1',
        'nom': 'Awa Test',
        'matricule': 'CP-AT-2601',
        'voix': 7,
      });
      expect(c.nbVotes, 7);
    });

    test('EtablissementAdmin compteurs', () {
      const e = EtablissementAdmin(
        id: 'e1',
        nom: 'Groupe Scolaire Test',
        nbActivites: 2,
        nbEvenements: 1,
        nbActualites: 3,
      );
      expect(
        e.compteurs,
        '2 activités · 1 événement · 3 actualités',
      );
    });

    test('export membres CSV : en-tête et ligne', () {
      final faux = FauxServiceT18();
      final csv = faux.exporterMembresCsv([_membreAdminTest()]);
      expect(csv, contains('"Nom";"Matricule"'));
      expect(csv, contains('Awa Test'));
      expect(csv, contains('CP-AT-2601'));
    });
  });

  group('T18 Espace structure', () {
    testWidgets('section En chiffres en haut, 3 actions', (tester) async {
      await telephone(tester);
      final serviceT18 = FauxServiceT18();
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: PageEspaceStructure(
              service: FauxServiceT9(),
              serviceT18: serviceT18,
            ),
          ),
        ),
      );
      await tester.pumpAndSettle();
      // Correction de suivi, 27 nov. 2026 : les chiffres sont
      // en haut de l'Espace structure, et seulement ici.
      expect(find.text('En chiffres'), findsOneWidget);
      expect(find.text('128'), findsOneWidget);
      expect(find.text('Membres inscrits'), findsOneWidget);
      await voir(tester, 'Valider les paiements');
      await voir(tester, 'Gérer les membres');
      await voir(tester, 'Publier une actualité');
    });

    testWidgets('entrées Quotidien et Gouvernance et réglages', (tester) async {
      await telephone(tester);
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: PageEspaceStructure(
              service: FauxServiceT9(),
              serviceT18: FauxServiceT18(),
              onOuvrirCamps: () {},
            ),
          ),
        ),
      );
      await tester.pumpAndSettle();
      await voir(tester, 'Quotidien');
      await voir(tester, 'Gouvernance et réglages');
      for (final entree in [
        'Comptabilité',
        'Actualités',
        'Prochain camp',
        'Inscriptions au camp',
        'Badges du camp',
        'Présences',
        'Documents',
        'Attestations',
        'Journal d’audit',
        'Exports complets',
        'Administrateurs',
        'Nominations',
        'Élections',
        'Liens parent-enfant',
        'Département scolaire',
        'Tremplin professionnel',
        'Planning des responsables',
        'Réglages des notifications',
      ]) {
        await voir(tester, entree);
      }
    });
  });

  group('T18 À propos', () {
    testWidgets('4 axes, vision et contacts de la vitrine', (tester) async {
      await telephone(tester);
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(body: PageAPropos()),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.textContaining('Former pour mieux servir'), findsWidgets);
      expect(
        find.textContaining('créée en 2019 en Côte d’Ivoire'),
        findsWidgets,
      );
      for (final axe in [
        'Formation spirituelle',
        'Lutte contre les grossesses en milieu scolaire',
        'Réinsertion des jeunes en dépendance',
        'Scolarisation d’enfants défavorisés',
      ]) {
        await voir(tester, axe);
      }
      for (final valeur in [
        'Foi',
        'Entrepreneuriat',
        'Fraternité',
        'Valeurs de la nation',
      ]) {
        await voir(tester, valeur);
      }
      await voir(tester, '200+');
      await voir(tester, '+225 07 87 40 63 87');
      await voir(tester, 'support@connexionprophetique.com');
      await voir(tester, 'Voir le Bureau');
    });
  });

  group('T18 établissements', () {
    testWidgets('cartes avec compteurs et badge du mien', (tester) async {
      await telephone(tester);
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: PageEtablissements(service: FauxServiceT18()),
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.byType(AppBar), findsNothing);
      expect(
        find.text(
          'Chaque établissement a ses activités, événements et actualités.',
        ),
        findsOneWidget,
      );
      expect(find.text('Groupe Scolaire Test'), findsOneWidget);
      expect(find.text('Collège Test'), findsOneWidget);
      expect(
        find.text('2 activités · 1 événement · 3 actualités'),
        findsOneWidget,
      );
      expect(find.text('MON ÉTABLISSEMENT'), findsOneWidget);
      await voir(tester, 'Structure (tous)');
    });
  });

  group('T18 retours', () {
    testWidgets('Espace structure poussé : flèche retour, et retour',
        (tester) async {
      await telephone(tester);
      await tester.pumpWidget(
        MaterialApp(
          home: Builder(
            builder: (context) => Scaffold(
              body: Center(
                child: TextButton(
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (_) => PageEspaceStructure(
                          service: FauxServiceT9(),
                          serviceT18: FauxServiceT18(),
                          poussee: true,
                        ),
                      ),
                    );
                  },
                  child: const Text('Ouvrir'),
                ),
              ),
            ),
          ),
        ),
      );
      await tester.tap(find.text('Ouvrir'));
      await tester.pumpAndSettle();
      expect(find.byType(BackButton), findsOneWidget);
      await voir(tester, 'Quotidien');
      await tester.tap(find.byType(BackButton));
      await tester.pumpAndSettle();
      expect(find.text('Ouvrir'), findsOneWidget);
    });

    testWidgets('Espace structure en destination : pas de double barre',
        (tester) async {
      await telephone(tester);
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: PageEspaceStructure(
              service: FauxServiceT9(),
              serviceT18: FauxServiceT18(),
            ),
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.byType(AppBar), findsNothing);
    });

    testWidgets('Nos établissements poussés : flèche retour, et retour',
        (tester) async {
      await telephone(tester);
      await tester.pumpWidget(
        MaterialApp(
          home: Builder(
            builder: (context) => Scaffold(
              body: Center(
                child: TextButton(
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (_) => PageEtablissements(
                          service: FauxServiceT18(),
                          poussee: true,
                        ),
                      ),
                    );
                  },
                  child: const Text('Ouvrir'),
                ),
              ),
            ),
          ),
        ),
      );
      await tester.tap(find.text('Ouvrir'));
      await tester.pumpAndSettle();
      expect(find.byType(BackButton), findsOneWidget);
      expect(find.text('Nos établissements'), findsOneWidget);
      await tester.tap(find.byType(BackButton));
      await tester.pumpAndSettle();
      expect(find.text('Ouvrir'), findsOneWidget);
    });
  });

  group('T18 Bureau', () {
    testWidgets('filtres Tous, Structure, établissement', (tester) async {
      await telephone(tester);
      await tester.pumpWidget(
        MaterialApp(
          home: PageBureau(serviceT18: FauxServiceT18()),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('Awa Test'), findsOneWidget);
      expect(find.text('Kofi Test'), findsOneWidget);
      expect(find.text('Mariam Test'), findsOneWidget);
      await tester.tap(find.text('Structure'));
      await tester.pumpAndSettle();
      expect(find.text('Awa Test'), findsOneWidget);
      expect(find.text('Mariam Test'), findsOneWidget);
      expect(find.text('Kofi Test'), findsNothing);
      await tester.tap(find.text('Tous'));
      await tester.pumpAndSettle();
      expect(find.text('Kofi Test'), findsOneWidget);
      await tester.ensureVisible(find.text('Groupe Scolaire Test').last);
      await tester.pumpAndSettle();
      await tester.tap(find.text('Groupe Scolaire Test').last);
      await tester.pumpAndSettle();
      expect(find.text('Kofi Test'), findsOneWidget);
      expect(find.text('Awa Test'), findsNothing);
    });
  });

  group('T18 liens parent-enfant', () {
    testWidgets('valider un lien le retire de la liste', (tester) async {
      await telephone(tester);
      final service = FauxServiceT18();
      await tester.pumpWidget(
        MaterialApp(
          home: PageLiensAdmin(service: service),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('Kofi Test'), findsOneWidget);
      await tester.tap(find.text('Valider'));
      await tester.pumpAndSettle();
      expect(service.liensValides, ['l1']);
      expect(find.text('Kofi Test'), findsNothing);
      expect(
        find.text('Aucun lien en attente de validation.'),
        findsOneWidget,
      );
    });
  });

  group('Correctif global personnes externes', () {
    test('PersonneExterne depuisJson et libellé du rôle', () {
      const p = PersonneExterne(
        id: 'pe1',
        nomComplet: 'Awa Externe',
        fonction: 'Chantre',
        contact: '+225 07 00 00 00',
        roleAdmin: 'admin_etablissement',
      );
      expect(p.roleAdminLibelle, 'Administrateur d’établissement');
      final relue = PersonneExterne.depuisJson({
        'id': 'pe1',
        'nom_complet': 'Awa Externe',
        'fonction': 'Chantre',
        'contact': '+225 07 00 00 00',
        'etablissement_id': 'e1',
        'etablissement_nom': 'ISPAM',
        'role_admin': 'admin_general',
      });
      expect(relue.nomComplet, 'Awa Externe');
      expect(relue.etablissementNom, 'ISPAM');
      expect(relue.roleAdminLibelle, 'Administrateur général');
      expect(
        const PersonneExterne(id: 'pe2', nomComplet: 'Kofi').roleAdminLibelle,
        '',
      );
    });

    test('Nomination, suivi et planning marquent la personne externe', () {
      final nomination = NominationAdmin.depuisJson({
        'id': 'n1',
        'membre_id': null,
        'personne_externe_id': 'pe1',
        'nom_complet': 'Awa Externe',
        'fonction_code': 'chantre',
        'fonction_libelle': 'Chantre',
        'portee': 'structure',
      });
      expect(nomination.estExterne, isTrue);
      expect(nomination.matricule, '');
      final suivi = SuiviScolaire.depuisJson({
        'id': 's1',
        'membre_id': null,
        'personne_externe_id': 'pe1',
        'membre_nom': 'Awa Externe',
        'annee_scolaire': '2026-2027',
      });
      expect(suivi.estExterne, isTrue);
      final creneau = PlanningResponsable.depuisJson({
        'id': 'p1',
        'membre_id': null,
        'personne_externe_id': 'pe1',
        'activite': 'Culte',
        'membre_nom': 'Awa Externe',
      });
      expect(creneau.estExterne, isTrue);
      expect(creneau.membreNom, 'Awa Externe');
    });

    testWidgets('nominations, la ligne externe porte Hors système',
        (tester) async {
      await telephone(tester);
      final service = FauxServiceT18();
      service.nominations = [
        NominationAdmin.depuisJson({
          'id': 'n1',
          'membre_id': null,
          'personne_externe_id': 'pe1',
          'nom_complet': 'Awa Externe',
          'fonction_code': 'chantre',
          'fonction_libelle': 'Chantre',
          'portee': 'structure',
        }),
      ];
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(body: PageNominationsAdmin(service: service)),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('Awa Externe'), findsOneWidget);
      expect(find.text('Chantre · Structure · Hors système'), findsOneWidget);
    });

    testWidgets('nouvelle nomination, création d’une personne hors système',
        (tester) async {
      await telephone(tester);
      final service = FauxServiceT18();
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(body: PageNominationsAdmin(service: service)),
        ),
      );
      await tester.pumpAndSettle();
      await tester.tap(find.text('Nouvelle nomination'));
      await tester.pumpAndSettle();
      expect(find.text('Choisir une personne'), findsOneWidget);
      await tester.tap(find.text('Nouvelle personne'));
      await tester.pumpAndSettle();
      expect(find.text('Nouvelle personne hors système'), findsOneWidget);
      final nom = find.byWidgetPredicate(
        (w) => w is TextField && w.decoration?.labelText == 'Nom complet',
      );
      await tester.enterText(nom, 'Awa Externe');
      await tester.tap(find.text('Créer'));
      await tester.pumpAndSettle();
      expect(find.text('Nommer Awa Externe'), findsOneWidget);
      await tester.tap(find.text('Nommer'));
      await tester.pumpAndSettle();
      expect(find.text('Nomination créée.'), findsOneWidget);
      expect(
        service.derniereNomination?['personne_externe_id'],
        'pe-test',
      );
      expect(service.derniereNomination?.containsKey('membre_id'), isFalse);
    });
  });

  group('Correctif global documents et exports', () {
    testWidgets('documents, le choix de fichier est proposé', (tester) async {
      await telephone(tester);
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: PageDocumentsAdmin(service: FauxServiceT18()),
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('Choisir un fichier'), findsOneWidget);
      expect(find.text('Lien (facultatif)'), findsOneWidget);
    });

    testWidgets('documents, fichier choisi puis publié', (tester) async {
      // La plateforme n'est pas enregistrée en test : on pose le
      // faux directement, sans lire la précédente.
      FilePicker.platform = _FauxFilePicker();
      await telephone(tester);
      final service = FauxServiceT18();
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(body: PageDocumentsAdmin(service: service)),
        ),
      );
      await tester.pumpAndSettle();
      await tester.tap(find.text('Choisir un fichier'));
      await tester.pumpAndSettle();
      expect(find.text('doc.pdf'), findsOneWidget);
      await tester.enterText(
        find.byWidgetPredicate(
          (w) =>
              w is TextField && w.decoration?.labelText == 'Titre du document',
        ),
        'Règlement intérieur',
      );
      await tester.tap(find.text('Publier le document'));
      await tester.pumpAndSettle();
      expect(service.dernierFichierTeleverse, 'doc.pdf');
      expect(find.text('Document publié.'), findsOneWidget);
    });

    testWidgets('exports, Excel choisi puis téléchargé', (tester) async {
      final dossier = Directory.systemTemp.createTempSync();
      addTearDown(() => dossier.deleteSync(recursive: true));
      TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
          .setMockMethodCallHandler(
        const MethodChannel('plugins.flutter.io/path_provider'),
        (appel) async {
          if (appel.method == 'getApplicationDocumentsDirectory') {
            return dossier.path;
          }
          return null;
        },
      );
      final partagePrecedent = SharePlatform.instance;
      SharePlatform.instance = _FauxSharePlatform();
      addTearDown(() {
        SharePlatform.instance = partagePrecedent;
        TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
            .setMockMethodCallHandler(
          const MethodChannel('plugins.flutter.io/path_provider'),
          null,
        );
      });
      await telephone(tester);
      final service = FauxServiceT18();
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: PageExportsAdmin(
              service: service,
              serviceT14: _FauxServiceT14(),
            ),
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('CSV'), findsOneWidget);
      await tester.tap(find.text('CSV'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Excel (.xlsx)').last);
      await tester.pumpAndSettle();
      await tester.tap(find.text('Télécharger').first);
      // Écriture réelle du fichier : le faux temps des tests ne
      // la laisse pas finir, il faut du temps réel.
      await tester.runAsync(
        () => Future.delayed(const Duration(milliseconds: 500)),
      );
      await tester.pumpAndSettle();
      expect(service.dernierExport, 'membres');
      expect(service.dernierFormatExport, 'xlsx');
      expect(File('${dossier.path}/membres.xlsx').existsSync(), isTrue);
    });
  });

  group('Correctif global planning du camp', () {
    test('EntreeChronogramme depuisJson et plage', () {
      final e = EntreeChronogramme.depuisJson({
        'id': 'c1',
        'jour': '2026-07-12',
        'heure_debut': '05:00',
        'heure_fin': '06:00',
        'titre': 'Prière du matin',
        'lieu': 'Grande salle',
        'type': 'Prière',
      });
      expect(e.jour, '2026-07-12');
      expect(e.plage, '05:00 – 06:00');
      expect(e.lieu, 'Grande salle');
      expect(jourLong('2026-07-12'), 'dimanche 12 juillet 2026');
      expect(jourLong('2026-07-13'), 'lundi 13 juillet 2026');
    });

    testWidgets('programme admin, jours groupés et ajout', (tester) async {
      await telephone(tester);
      final service = FauxServiceT18();
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: PageChronogrammeAdmin(
              service: service,
              evenementId: 'ev-test',
              nomCamp: 'Camp Test',
            ),
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('dimanche 12 juillet 2026'), findsOneWidget);
      expect(find.text('lundi 13 juillet 2026'), findsOneWidget);
      expect(find.text('Prière du matin'), findsNWidgets(2));
      expect(find.text('Enseignement'), findsOneWidget);
      expect(find.text('Appliquer le modèle'), findsOneWidget);
      expect(find.text('Ajouter un créneau'), findsOneWidget);
      await tester.tap(find.text('Ajouter un créneau'));
      await tester.pumpAndSettle();
      await tester.enterText(
        find.byWidgetPredicate(
          (w) => w is TextField && w.decoration?.labelText == 'Titre',
        ),
        'Louange',
      );
      await tester.tap(find.text('Ajouter'));
      await tester.pumpAndSettle();
      expect(find.text('Créneau ajouté.'), findsOneWidget);
      expect(find.text('Louange'), findsOneWidget);
    });
  });
}
