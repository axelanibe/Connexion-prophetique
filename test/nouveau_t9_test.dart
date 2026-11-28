// Tests de la tranche T9, pages nouvelles et retenues,
// 26 nov. 2026. Le membre ci-dessous est un membre de test,
// jamais un vrai membre : matricule CP-AA-2526, Bureau
// national, Membre depuis 2025. Les offres, les demandes et
// les badges sont des exemples signalés comme tels.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/app_models.dart';
import 'package:connexion_prophetique/nouveau/modeles_t18.dart';
import 'package:connexion_prophetique/nouveau/modeles_t9.dart';
import 'package:connexion_prophetique/nouveau/page_abonnement.dart';
import 'package:connexion_prophetique/nouveau/page_chaine_priere.dart';
import 'package:connexion_prophetique/nouveau/page_croissance.dart';
import 'package:connexion_prophetique/nouveau/page_documents.dart';
import 'package:connexion_prophetique/nouveau/page_fonctions.dart';
import 'package:connexion_prophetique/nouveau/page_galerie.dart';
import 'package:connexion_prophetique/nouveau/page_opportunite.dart';
import 'package:connexion_prophetique/nouveau/page_structure.dart';
import 'package:connexion_prophetique/nouveau/page_suivi.dart';
import 'package:connexion_prophetique/nouveau/service_t9.dart';

Member _membreTest() => Member(
      'Axel Test',
      'CP-AA-2526',
      '',
      DateTime(2025, 3, 2),
      fonction: 'Membre',
    );

class _FauxServiceT9 implements ServiceT9 {
  var _creneaux = <CreneauPriere>[
    for (var h = 0; h < 24; h++)
      CreneauPriere(heure: h, prenom: h == 8 ? 'Marie' : ''),
  ];
  CreneauPriere? _monCreneau;
  var _demandes = <DemandeSuivi>[
    const DemandeSuivi(
      id: 'd1',
      texte: 'Prier pour ma famille',
      statut: 'en_cours',
      noteSuivi: 'Prise en charge par le Bureau.',
    ),
  ];
  var _fonction = 'Membre';
  var _abonnementDemande = false;
  final _joursLus = <int>{1, 2, 3, 4, 5, 6, 7};

  @override
  Future<void> chargerMembre() async {}

  @override
  Member? get membre => _membreTest();

  @override
  String get paysResidence => 'Côte d’Ivoire';

  @override
  Future<void> chargerChaine({String? jour}) async {}

  @override
  String get jourChaine => '2026-11-26';

  @override
  String get aujourdHui => '2026-11-26';

  @override
  List<CreneauPriere> get creneaux => _creneaux;

  @override
  int get couverts => 1;

  @override
  int get totalCreneaux => 24;

  @override
  CreneauPriere? get monCreneau => _monCreneau;

  @override
  bool get chainePasse => false;

  @override
  Future<bool> engagerCreneau(int heure, {bool deplacer = false}) async {
    _monCreneau = CreneauPriere(heure: heure, prenom: 'Axel', estMien: true);
    _creneaux = [
      for (final c in _creneaux)
        c.heure == heure
            ? CreneauPriere(heure: heure, prenom: 'Axel', estMien: true)
            : c,
    ];
    return true;
  }

  @override
  Future<bool> libererCreneau() async {
    _monCreneau = null;
    return true;
  }

  @override
  Future<void> chargerSuivi() async {}

  @override
  List<DemandeSuivi> get demandes => _demandes;

  @override
  ParrainageSuivi? get monParrain =>
      const ParrainageSuivi(nom: 'Parrain Exemple', statut: 'actif');

  @override
  List<ParrainageSuivi> get filleuls => const [
        ParrainageSuivi(nom: 'Filleul Exemple', statut: 'actif'),
      ];

  @override
  Future<bool> envoyerDemande(String texte) async {
    _demandes = [
      DemandeSuivi(id: 'd2', texte: texte, statut: 'en_attente', noteSuivi: ''),
      ..._demandes,
    ];
    return true;
  }

  @override
  Future<void> chargerOpportunites() async {}

  @override
  List<OffreOpportunite> get offres => const [
        OffreOpportunite(
          id: 'o1',
          titre: 'Offre exemple',
          type: 'Emploi',
          pays: 'Côte d’Ivoire',
          organisme: 'Structure exemple',
          ville: 'Abidjan',
        ),
        OffreOpportunite(
          id: 'o2',
          titre: 'Formation exemple',
          type: 'Formation',
          pays: 'Côte d’Ivoire',
        ),
      ];

  @override
  Future<void> chargerDocuments() async {}

  @override
  List<AttestationMembre> get attestations => const [
        AttestationMembre(id: 'a1', type: 'Attestation', reference: 'ATT-1'),
      ];

  @override
  List<DocumentStructure> get documents => const [
        DocumentStructure(id: 'doc1', titre: 'Document exemple'),
      ];

  @override
  Future<List<int>?> telechargerAttestation(String id) async => [1, 2, 3];

  @override
  Future<void> chargerCroissance() async {}

  @override
  Set<int> get joursLus => _joursLus;

  @override
  int get jourPlanAujourdhui => 8;

  @override
  List<(String, int)> get chapitresAujourdHui => const [('Genèse', 8)];

  @override
  Future<void> basculerJour(int jour) async {
    _joursLus.add(jour);
  }

  @override
  Future<bool> changerFonction(String fonction) async {
    _fonction = fonction;
    return true;
  }

  String get fonctionChoisie => _fonction;

  // Correctif global, 27 nov. 2026 : une nomination active,
  // pour la page Mes fonctions.
  @override
  Future<void> chargerMesNominations() async {}

  @override
  List<NominationAdmin> get mesNominations => const [
        NominationAdmin(
          id: 'n1',
          membreId: 'm1',
          nomComplet: 'Axel Test',
          matricule: 'CP-AA-2526',
          fonctionCode: 'chantre',
          fonctionLibelle: 'Chantre',
          portee: 'etablissement',
          etablissementNom: 'ISPAM',
        ),
      ];

  @override
  Future<void> chargerAbonnement() async {}

  @override
  AbonnementEtat get abonnement => const AbonnementEtat(statut: 'Aucun');

  @override
  Future<bool> demanderAbonnement() async {
    _abonnementDemande = true;
    return true;
  }

  bool get abonnementDemande => _abonnementDemande;

  @override
  Future<void> chargerGalerie() async {}

  @override
  List<InscriptionBadge> get inscriptions => const [
        InscriptionBadge(
          evenementId: 'camp1',
          nom: 'Camp National Kairos',
          codePass: 'PASS-EXEMPLE',
          estKairos: true,
          passVisible: true,
        ),
      ];

  @override
  Future<void> chargerStructure() async {}

  @override
  List<MembreBureau> get bureau => const [
        MembreBureau(nom: 'Président Exemple', fonction: 'Président'),
        MembreBureau(nom: 'Secrétaire Exemple', fonction: 'Secrétaire'),
      ];

  @override
  List<EnfantLie> get enfants => const [
        EnfantLie(
          id: 'e1',
          nom: 'Enfant Exemple',
          matricule: 'CP-EE-2526',
          statut: 'valide',
        ),
      ];

  @override
  List<EnfantLie> get liens => const [];

  @override
  Future<List<EnfantLie>> chercherEnfant(String saisie) async => const [];

  @override
  Future<bool> demanderLien(String enfantMembreId) async => true;

  @override
  Future<bool> retirerLien(String lienId) async => true;

  @override
  Future<void> chargerEspaceStructure() async {}

  @override
  bool get accesAdmin => true;

  @override
  List<DemandeSuivi> get demandesBureau => const [
        DemandeSuivi(
          id: 'db1',
          texte: 'Demande exemple',
          statut: 'en_attente',
          noteSuivi: '',
        ),
      ];

  @override
  List<EnfantLie> get liensEnAttente => const [];
}

void main() {
  test('libellé de créneau et statut de demande', () {
    expect(libelleCreneau(8), '08 h – 09 h');
    expect(libelleStatutDemande('en_cours'), 'En cours');
    expect(libelleStatutDemande(''), 'À confirmer');
  });

  test('abonnement actif et QR du badge', () {
    final actif = AbonnementEtat(
      statut: 'Actif',
      dateFin: DateTime.now().add(const Duration(days: 30)),
    );
    expect(actif.estActif, isTrue);
    expect(AbonnementEtat.montantAnnuel, 100000);
    const inscription = InscriptionBadge(
      evenementId: 'camp1',
      nom: 'Camp',
      codePass: 'PASS-1',
      passVisible: true,
    );
    expect(inscription.qrData('CP-AA-2526'), 'PASS-1');
    const sansCode = InscriptionBadge(evenementId: 'c2', nom: 'Camp');
    expect(sansCode.qrData('CP-AA-2526'), 'PASS:CP-AA-2526:c2');
  });

  testWidgets('chaîne de prière, 3 temps nommés et Rejoindre', (tester) async {
    final service = _FauxServiceT9();
    await tester.pumpWidget(
      MaterialApp(home: Scaffold(body: PageChainePriere(service: service))),
    );
    await tester.pumpAndSettle();
    expect(find.text('0 temps couverts sur 3'), findsOneWidget);
    expect(find.text('Prière du matin, 05 h – 06 h'), findsOneWidget);
    expect(find.text('Prière de midi, 12 h – 13 h'), findsOneWidget);
    expect(find.text('Prière du soir, 21 h – 22 h'), findsOneWidget);
    await tester.tap(find.text('Rejoindre').first);
    await tester.pumpAndSettle();
    expect(service.monCreneau, isNotNull);
    expect(service.monCreneau!.heure, 5);
    expect(find.text('Mon temps : Prière du matin'), findsOneWidget);
  });

  testWidgets('suivi, demandes, parrain et envoi', (tester) async {
    final service = _FauxServiceT9();
    await tester.pumpWidget(
        MaterialApp(home: Scaffold(body: PageSuivi(service: service))));
    await tester.pumpAndSettle();
    expect(find.text('Prier pour ma famille'), findsOneWidget);
    expect(find.text('En cours'), findsOneWidget);
    expect(find.text('Parrain Exemple'), findsOneWidget);
    expect(find.text('Filleul Exemple'), findsOneWidget);
    await tester.enterText(find.byType(TextField), 'Nouvelle demande exemple');
    await tester.tap(find.text('Envoyer'));
    await tester.pumpAndSettle();
    expect(find.text('Nouvelle demande exemple'), findsOneWidget);
  });

  testWidgets('opportunité, filtres pays et type', (tester) async {
    final service = _FauxServiceT9();
    await tester.pumpWidget(
      MaterialApp(home: Scaffold(body: PageOpportunite(service: service))),
    );
    await tester.pumpAndSettle();
    expect(find.text('Offre exemple'), findsOneWidget);
    expect(find.text('Mon pays (Côte d’Ivoire)'), findsOneWidget);
    expect(find.text('Formation exemple'), findsOneWidget);
  });

  testWidgets('documents, carte, attestation et document', (tester) async {
    final service = _FauxServiceT9();
    var carteVue = false;
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: PageDocuments(
            service: service,
            onVoirCarte: () => carteVue = true,
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.text('Carte de membre'), findsOneWidget);
    expect(find.text('Attestation'), findsOneWidget);
    expect(find.text('Document exemple'), findsOneWidget);
    await tester.tap(find.text('Carte de membre'));
    expect(carteVue, isTrue);
  });

  testWidgets('croissance, progression et badges', (tester) async {
    final service = _FauxServiceT9();
    await tester.pumpWidget(
      MaterialApp(home: Scaffold(body: PageCroissance(service: service))),
    );
    await tester.pumpAndSettle();
    expect(find.textContaining('7 jours lus sur 365'), findsOneWidget);
    expect(find.text('Genèse 8'), findsOneWidget);
    expect(find.text('7 jours'), findsOneWidget);
    await tester.tap(find.text('Marquer lu'));
    await tester.pumpAndSettle();
    expect(service.joursLus.contains(8), isTrue);
  });

  testWidgets('fonctions, responsabilités affectées', (tester) async {
    final service = _FauxServiceT9();
    await tester.pumpWidget(
      MaterialApp(home: Scaffold(body: PageFonctions(service: service))),
    );
    await tester.pumpAndSettle();
    expect(find.text('Membre'), findsWidgets);
    expect(find.text('Mes responsabilités'), findsOneWidget);
    expect(find.text('Chantre'), findsOneWidget);
    expect(find.text('ISPAM'), findsOneWidget);
  });

  testWidgets('abonnement, demande à 100 000 FCFA', (tester) async {
    final service = _FauxServiceT9();
    await tester.pumpWidget(
      MaterialApp(home: Scaffold(body: PageAbonnement(service: service))),
    );
    await tester.pumpAndSettle();
    expect(find.text('Abonnement Plateforme'), findsOneWidget);
    expect(find.text('100 000 FCFA par an, pour les établissements'),
        findsOneWidget);
    await tester.tap(find.text('S’abonner : 100 000 FCFA par an'));
    await tester.pumpAndSettle();
    expect(service.abonnementDemande, isTrue);
  });

  testWidgets('galerie, badge et page dédiée', (tester) async {
    final service = _FauxServiceT9();
    await tester.pumpWidget(
      MaterialApp(home: Scaffold(body: PageGalerie(service: service))),
    );
    await tester.pumpAndSettle();
    // Correction de suivi, 27 nov. 2026 : badge selon le modèle
    // officiel KAIROS 2027, KAIROS 2027, bande CAMPEUR, devise.
    // Le titre et l'étiquette du QR portent tous les deux
    // « KAIROS 2027 ».
    expect(find.text('KAIROS 2027'), findsWidgets);
    expect(find.text('CAMPEUR'), findsOneWidget);
    expect(
      find.text('Se disposer • S’aligner • Rayonner'),
      findsOneWidget,
    );
    await tester.tap(find.text('CAMPEUR'));
    await tester.pumpAndSettle();
    expect(find.text('Télécharger'), findsOneWidget);
    expect(find.textContaining('CP-AA-2526'), findsWidgets);
  });

  testWidgets('structure, bureau et liaison parents et enfants',
      (tester) async {
    final service = _FauxServiceT9();
    await tester.pumpWidget(
      MaterialApp(home: Scaffold(body: PageStructure(service: service))),
    );
    await tester.pumpAndSettle();
    expect(find.text('Président Exemple'), findsOneWidget);
    await tester.tap(find.text('Liaison'));
    await tester.pumpAndSettle();
    expect(find.text('Enfant Exemple'), findsOneWidget);
    expect(find.text('Liaison parents et enfants'), findsOneWidget);
    await tester.tap(find.text('Le Bureau'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Voir tout le Bureau'));
    await tester.pumpAndSettle();
    expect(find.text('Le Bureau'), findsWidgets);
    expect(find.text('Secrétaire Exemple'), findsOneWidget);
  });

  testWidgets('espace structure, demandes à suivre', (tester) async {
    final service = _FauxServiceT9();
    await tester.pumpWidget(
      MaterialApp(home: Scaffold(body: PageEspaceStructure(service: service))),
    );
    await tester.pumpAndSettle();
    expect(find.text('Demande exemple'), findsOneWidget);
    expect(find.text('Demandes de prière à suivre'), findsOneWidget);
  });
}
