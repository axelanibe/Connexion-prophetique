// Tests de la tranche T18, 27 nov. 2026 : refonte de
// l'Espace Structure, lots 1 et 2 ensemble, page À propos,
// établissements. Les membres et les établissements ci-dessous
// sont des exemples de test, jamais de vraies données.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/nouveau/modeles_t14.dart';
import 'package:connexion_prophetique/nouveau/modeles_t18.dart';
import 'package:connexion_prophetique/nouveau/modeles_t9.dart';
import 'package:connexion_prophetique/nouveau/page_a_propos.dart';
import 'package:connexion_prophetique/nouveau/page_espace_admin.dart';
import 'package:connexion_prophetique/nouveau/page_etablissements.dart';
import 'package:connexion_prophetique/nouveau/page_structure.dart';
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

  @override
  List<DocumentStructure> documents = const [];

  @override
  Future<void> chargerDocuments() async {}

  @override
  Future<bool> publierDocument({
    required String titre,
    String? lien,
    String? etablissementId,
  }) async =>
      true;

  @override
  Future<bool> supprimerDocument(String id) async => true;

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
  String exporterMembresCsv(List<MembreAdmin> membres) =>
      ServiceT18Reel().exporterMembresCsv(membres);

  @override
  String exporterPaiementsCsv() =>
      ServiceT18Reel().exporterPaiementsCsv();

  @override
  String exporterPresencesCsv() =>
      ServiceT18Reel().exporterPresencesCsv();

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
    bureau =
        _bureauComplet.where((m) => m.etablissement == nom).toList();
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

  @override
  Future<bool> creerNomination({
    required String membreId,
    required String fonctionCode,
    required String portee,
    String? etablissementId,
    String? evenementId,
  }) async =>
      true;

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
    liensEnAttente =
        liensEnAttente.where((l) => l.id != id).toList();
    return true;
  }

  @override
  Future<bool> rejeterLien(String id) async {
    liensRejetes.add(id);
    liensEnAttente =
        liensEnAttente.where((l) => l.id != id).toList();
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
          {'id': 'c2', 'nom': 'Kofi Test', 'matricule': 'CP-KT-2601', 'voix': 5},
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
    testWidgets('6 chiffres, dont un « — », et 3 actions',
        (tester) async {
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
      for (final libelle in libellesChiffres) {
        // « Inscriptions au camp » est aussi une entrée du lot 1.
        expect(find.text(libelle), findsWidgets, reason: libelle);
      }
      expect(find.text('128'), findsOneWidget);
      expect(find.text('—'), findsOneWidget);
      await voir(tester, 'Valider les paiements');
      await voir(tester, 'Gérer les membres');
      await voir(tester, 'Publier une actualité');
    });

    testWidgets('entrées des lots 1 et 2', (tester) async {
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
      await voir(tester, 'Lot 1');
      await voir(tester, 'Lot 2');
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
        'Tableau de bord',
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
    testWidgets('4 axes, vision et contacts de la vitrine',
        (tester) async {
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
    testWidgets('cartes avec compteurs et badge du mien',
        (tester) async {
      await telephone(tester);
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: PageEtablissements(service: FauxServiceT18()),
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('Nos établissements'), findsOneWidget);
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
      await voir(tester, 'En chiffres');
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
    testWidgets('filtres Tous, Structure, établissement',
        (tester) async {
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
    testWidgets('valider un lien le retire de la liste',
        (tester) async {
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
}
