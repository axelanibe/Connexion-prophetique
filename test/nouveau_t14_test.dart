// Tests de la tranche T14, Mes paiements et correction admin,
// 26 nov. 2026. Les paiements et membres ci-dessous sont des
// données de test, jamais de vrais paiements ni de vrais membres.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/nouveau/modeles_t14.dart';
import 'package:connexion_prophetique/nouveau/page_cotisations.dart';
import 'package:connexion_prophetique/nouveau/page_fiche_membre.dart';
import 'package:connexion_prophetique/nouveau/page_structure.dart';
import 'package:connexion_prophetique/nouveau/service_t14.dart';

PaiementMembre _paiementTest({
  required String reference,
  required String type,
  required int montant,
  required String statut,
  String mois = '',
  String camp = '',
  int versement = 0,
}) =>
    PaiementMembre(
      id: 'p-$reference',
      reference: reference,
      type: type,
      montantFcfa: montant,
      statut: statut,
      moyen: 'Wave',
      creeLe: DateTime(2026, 11, 10),
      confirmeLe:
          statut == 'confirme' ? DateTime(2026, 11, 10) : null,
      campNom: camp,
      numeroVersement: versement,
      moisCible: mois,
      lignes: const [],
      beneficiaireNom: '',
      donateurNom: '',
      roleDon: '',
      messageDon: '',
    );

MembreAdmin _membreTest({
  required String id,
  required String nom,
  String adhesion = '',
  String etablissement = 'Bureau national',
}) =>
    MembreAdmin(
      id: id,
      matricule: 'CP-T$id-2526',
      nomComplet: nom,
      fonction: 'Membre',
      etablissementId: 'e1',
      etablissement: etablissement,
      cotisationStatut: 'confirme',
      dernierPaiementCotisation: DateTime(2026, 11, 5),
      photo: null,
      valideJusqua: '2027-10-01',
      inscritLe: '2025-10-01',
      statutAdhesion: adhesion,
      dateNaissance: '1990-05-12',
      telephone: '+225 01020304',
      email: 'membre@test.example',
      roleCompte: 'membre',
    );

class _FauxServiceT14 implements ServiceT14 {
  _FauxServiceT14({this.vide = false});
  final bool vide;

  final _paiements = <PaiementMembre>[
    _paiementTest(
        reference: 'FACT-1', type: 'carte', montant: 1000, statut: 'confirme'),
    _paiementTest(
        reference: 'COT-2',
        type: 'cotisation',
        montant: 1000,
        statut: 'en_attente',
        mois: '2026-11'),
    _paiementTest(
        reference: 'DON-3', type: 'don', montant: 5000, statut: 'refuse'),
  ];

  final _membres = <MembreAdmin>[
    _membreTest(id: 'a', nom: 'Membre Test A'),
    _membreTest(id: 'b', nom: 'Membre Test B', adhesion: 'validee'),
  ];

  var _etablissements = const [
    EtablissementChoix(id: 'e1', nom: 'Bureau national'),
    EtablissementChoix(id: 'e2', nom: 'Établissement test'),
  ];

  final corrigerAppels = <Map<String, String?>>[];
  final validerAppels = <String>[];
  final suspendreAppels = <Map<String, String>>[];

  @override
  Future<void> chargerPaiements() async {}

  @override
  List<PaiementMembre> get paiements =>
      vide ? const [] : List.unmodifiable(_paiements);

  @override
  Future<List<int>?> telechargerFacture(String reference) async =>
      [1, 2, 3];

  @override
  Future<void> chargerEtablissements() async {}

  @override
  List<EtablissementChoix> get etablissements =>
      List.unmodifiable(_etablissements);

  @override
  Future<void> chargerMembresAdmin() async {}

  @override
  bool get accesAdminMembres => true;

  @override
  List<MembreAdmin> get membresAdmin =>
      vide ? const [] : List.unmodifiable(_membres);

  @override
  Future<MembreAdmin?> chargerDetailMembre(String membreId) async {
    for (final m in _membres) {
      if (m.id == membreId) return m;
    }
    return null;
  }

  @override
  Future<bool> corrigerMembre({
    required String membreId,
    required String nomComplet,
    String? dateNaissance,
    String? etablissementId,
  }) async {
    corrigerAppels.add({
      'membreId': membreId,
      'nom': nomComplet,
      'naissance': dateNaissance,
      'etablissement': etablissementId,
    });
    return true;
  }

  @override
  Future<bool> validerAdhesion(String membreId) async {
    validerAppels.add(membreId);
    return true;
  }

  @override
  Future<bool> suspendreAdhesion(String membreId, String motif) async {
    suspendreAppels.add({'membreId': membreId, 'motif': motif});
    return true;
  }
}

Future<void> _pomper(
  WidgetTester tester,
  Widget page,
) async {
  tester.view.physicalSize = const Size(800, 2400);
  tester.view.devicePixelRatio = 1.0;
  addTearDown(tester.view.resetPhysicalSize);
  addTearDown(tester.view.resetDevicePixelRatio);
  await tester.pumpWidget(MaterialApp(home: page));
  await tester.pumpAndSettle();
}

void main() {
  group('T14, modèles', () {
    test('libellés des paiements et facture', () {
      final carte = _paiementTest(
          reference: 'FACT-1',
          type: 'carte',
          montant: 1000,
          statut: 'confirme');
      expect(carte.libelle, 'Carte de membre');
      expect(carte.libelleStatut, 'Confirmé');
      expect(carte.peutTelechargerFacture, true);
      final cotisation = _paiementTest(
          reference: 'COT-2',
          type: 'cotisation',
          montant: 1000,
          statut: 'en_attente',
          mois: '2026-11');
      expect(cotisation.libelle, 'Cotisation 2026-11');
      expect(cotisation.libelleStatut, 'En attente');
      expect(cotisation.peutTelechargerFacture, false);
      final camp = _paiementTest(
          reference: 'CAMP-4',
          type: 'camp',
          montant: 2500,
          statut: 'confirme',
          camp: 'Kairos',
          versement: 2);
      expect(camp.libelle, 'Camp Kairos');
      expect(camp.detail, 'Versement n°2');
      expect(camp.peutTelechargerFacture, true);
      final refuse = _paiementTest(
          reference: 'DON-3',
          type: 'don',
          montant: 5000,
          statut: 'refuse');
      expect(refuse.libelleStatut, 'Refusé');
      expect(refuse.peutTelechargerFacture, false);
    });

    test('libellés membre admin et règles du nom', () {
      final membre = _membreTest(id: 'a', nom: 'Membre Test A');
      expect(membre.libelleAdhesion, 'Adhésion non validée');
      expect(membre.adhesionValidee, false);
      expect(membre.libelleCotisation, 'Cotisation confirmée');
      expect(
          _membreTest(id: 'b', nom: 'Membre Test B', adhesion: 'validee')
              .libelleAdhesion,
          'Adhésion validée');
      expect(
          _membreTest(id: 'b', nom: 'Membre Test B', adhesion: 'suspendue')
              .libelleAdhesion,
          'Adhésion suspendue');
      expect(nomDeuxMots('Axel'), false);
      expect(nomDeuxMots('Axel Anibe'), true);
      expect(nomMajuscules('  axel   anibe '), 'AXEL ANIBE');
      expect(isoDepuisDate(DateTime(1990, 5, 12)), '1990-05-12');
      expect(dateIsoVersDate('1990-05-12'), DateTime(1990, 5, 12));
      expect(dateIsoVersDate(''), null);
    });
  });

  group('T14, Mes cotisations', () {
    testWidgets('historique affiché, facture seulement si confirmé',
        (tester) async {
      await _pomper(
          tester, PageCotisations(service: _FauxServiceT14()));
      expect(find.text('Mes paiements'), findsOneWidget);
      expect(find.text('Carte de membre'), findsOneWidget);
      expect(find.text('Cotisation 2026-11'), findsOneWidget);
      expect(find.text('Don'), findsOneWidget);
      expect(find.text('1 000 FCFA'), findsWidgets);
      expect(find.text('Confirmé'), findsOneWidget);
      expect(find.text('En attente'), findsOneWidget);
      expect(find.text('Refusé'), findsOneWidget);
      expect(find.text('Facture'), findsOneWidget);
    });

    testWidgets('aucun paiement, état honnête', (tester) async {
      await _pomper(tester,
          PageCotisations(service: _FauxServiceT14(vide: true)));
      expect(find.text('Aucun paiement pour le moment.'), findsOneWidget);
      expect(find.text('Facture'), findsNothing);
    });
  });

  group('T14, Espace structure, Membres', () {
    testWidgets('liste et recherche locale', (tester) async {
      await _pomper(
          tester,
          Scaffold(
              body: SectionMembresAdmin(service: _FauxServiceT14())));
      expect(find.text('Membre Test A'), findsOneWidget);
      expect(find.text('Membre Test B'), findsOneWidget);
      await tester.enterText(
          find.widgetWithText(
              TextField, 'Nom ou matricule du membre…'),
          'test b');
      await tester.pumpAndSettle();
      expect(find.text('Membre Test B'), findsOneWidget);
      expect(find.text('Membre Test A'), findsNothing);
    });
  });

  group('T14, fiche membre', () {
    testWidgets('détail, Corriger et Valider l’adhésion', (tester) async {
      final service = _FauxServiceT14();
      await _pomper(
          tester,
          PageFicheMembreAdmin(
              service: service, membreId: 'a', nomInitial: 'Membre Test A'));
      expect(find.text('Membre Test A'), findsOneWidget);
      expect(find.textContaining('CP-Ta-2526'), findsOneWidget);
      expect(find.text('Adhésion non validée'), findsOneWidget);
      expect(find.text('Cotisation confirmée'), findsOneWidget);
      expect(find.text('Valider l’adhésion'), findsOneWidget);
      expect(find.text('Suspendre'), findsNothing);
      expect(find.text('Corriger'), findsOneWidget);
    });

    testWidgets('adhésion validée, Suspendre seulement', (tester) async {
      await _pomper(
          tester,
          PageFicheMembreAdmin(
              service: _FauxServiceT14(),
              membreId: 'b',
              nomInitial: 'Membre Test B'));
      expect(find.text('Adhésion validée'), findsOneWidget);
      expect(find.text('Suspendre'), findsOneWidget);
      expect(find.text('Valider l’adhésion'), findsNothing);
    });

    testWidgets('Corriger refuse un seul mot, accepte deux mots',
        (tester) async {
      final service = _FauxServiceT14();
      await _pomper(
          tester,
          PageFicheMembreAdmin(
              service: service, membreId: 'a', nomInitial: 'Membre Test A'));
      await tester.tap(find.text('Corriger'));
      await tester.pumpAndSettle();
      expect(find.text('Corriger les informations'), findsOneWidget);
      await tester.enterText(
          find.byKey(const ValueKey('corriger-membre-nom')), 'Seul');
      await tester.tap(find.text('Enregistrer'));
      await tester.pumpAndSettle();
      expect(find.text('Écris ton prénom et ton nom.'), findsOneWidget);
      expect(service.corrigerAppels, isEmpty);
      await tester.enterText(
          find.byKey(const ValueKey('corriger-membre-nom')),
          'Nouveau Nom');
      await tester.tap(find.text('Enregistrer'));
      await tester.pumpAndSettle();
      expect(service.corrigerAppels.length, 1);
      expect(service.corrigerAppels.first['nom'], 'NOUVEAU NOM');
      expect(service.corrigerAppels.first['naissance'], '1990-05-12');
    });

    testWidgets('Valider l’adhésion après confirmation', (tester) async {
      final service = _FauxServiceT14();
      await _pomper(
          tester,
          PageFicheMembreAdmin(
              service: service, membreId: 'a', nomInitial: 'Membre Test A'));
      await tester.tap(find.text('Valider l’adhésion'));
      await tester.pumpAndSettle();
      expect(find.text('Valider l’adhésion ?'), findsOneWidget);
      await tester.tap(find.text('Valider'));
      await tester.pumpAndSettle();
      expect(service.validerAppels, ['a']);
    });

    testWidgets('Suspendre avec motif', (tester) async {
      final service = _FauxServiceT14();
      await _pomper(
          tester,
          PageFicheMembreAdmin(
              service: service, membreId: 'b', nomInitial: 'Membre Test B'));
      await tester.tap(find.text('Suspendre'));
      await tester.pumpAndSettle();
      expect(find.text('Suspendre l’adhésion ?'), findsOneWidget);
      await tester.enterText(
          find.widgetWithText(TextField, 'Motif (obligatoire)'),
          'Motif test');
      await tester.tap(find.text('Suspendre').last);
      await tester.pumpAndSettle();
      expect(service.suspendreAppels.length, 1);
      expect(service.suspendreAppels.first['motif'], 'Motif test');
    });
  });
}
