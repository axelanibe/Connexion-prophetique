// Tests de la tranche T15, carte verrouillée, 26 nov. 2026.
// Le membre ci-dessous est un membre de test, jamais un vrai
// membre : matricule CP-AA-2526, Bureau national, Membre
// depuis 2025. Trois états : verrouillée sans paiement
// confirmé, en attente de validation une fois payée, validée
// quand l'adhésion est validée. Le paiement Wave de T11
// n'est pas reconstruit, seul le bouton l'ouvre.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/app_models.dart';
import 'package:connexion_prophetique/nouveau/destinations.dart';
import 'package:connexion_prophetique/nouveau/modeles_profil.dart';
import 'package:connexion_prophetique/nouveau/modeles_t15.dart';
import 'package:connexion_prophetique/nouveau/page_carte.dart';
import 'package:connexion_prophetique/nouveau/service_profil.dart';
import 'package:connexion_prophetique/nouveau/tiroir.dart';

class _FauxServiceCarte implements ServiceProfil {
  _FauxServiceCarte({
    this.cartePayee = false,
    this.carteEnAttente = false,
    String statutAdhesion = 'en_attente',
  }) : _membre = Member(
          'Axel Test',
          'CP-AA-2526',
          '',
          DateTime(2025, 3, 2),
          anneeAdhesion: 2025,
          statutAdhesion: statutAdhesion,
        );
  final Member _membre;

  @override
  Future<void> charger() async {}

  @override
  bool get aEchoue => false;

  @override
  Member? get membre => _membre;

  @override
  String get email => '';

  @override
  String get ville => '';

  @override
  String get pays => 'Côte d’Ivoire';

  @override
  List<String> get etablissements => const ['Bureau national'];

  @override
  final bool cartePayee;

  @override
  final bool carteEnAttente;

  @override
  EtatCarte get etatCarte => etatCarteDepuis(
        cartePayee: cartePayee,
        statutAdhesion: _membre.statutAdhesion,
      );

  @override
  Future<EnregistrementProfil> enregistrer(ModifsProfil modifs) async =>
      const EnregistrementProfil(reussi: false, gardeLocalSeulement: false);

  @override
  Future<bool> changerPhoto(PhotoChoisie photo) async => false;

  @override
  Future<bool> demanderChangementEmail(String email) async => false;

  @override
  Future<bool> confirmerChangementEmail(String email, String code) async =>
      false;
}

Future<void> _pomperCarte(
  WidgetTester tester,
  _FauxServiceCarte service, {
  VoidCallback? onCreerCarte,
  VoidCallback? onVoirPaiements,
}) async {
  await tester.pumpWidget(MaterialApp(
    home: Scaffold(
      body: PageCarteNouvelle(
        service: service,
        onCreerCarte: onCreerCarte,
        onVoirPaiements: onVoirPaiements,
      ),
    ),
  ));
  await tester.pump();
  await tester.pump();
}

Future<DestinationNouvelle?> _ouvrirTiroir(
  WidgetTester tester,
  EtatCarte? etat,
) async {
  DestinationNouvelle? navigue;
  final membre = Member('Axel Test', 'CP-AA-2526', '', DateTime(2025, 3, 2),
      anneeAdhesion: 2025);
  await tester.pumpWidget(MaterialApp(
    home: Scaffold(
      drawer: TiroirNouveau(
        membre: membre,
        onNaviguer: (d) => navigue = d,
        etatCarte: etat,
      ),
      body: const Text('corps'),
    ),
  ));
  await tester.pump();
  tester.state<ScaffoldState>(find.byType(Scaffold)).openDrawer();
  await tester.pumpAndSettle();
  return navigue;
}

void main() {
  test('dérivation : sans paiement, verrouillée quoi qu’il arrive', () {
    expect(
        etatCarteDepuis(cartePayee: false, statutAdhesion: 'validee'),
        EtatCarte.verrouillee);
    expect(
        etatCarteDepuis(cartePayee: false, statutAdhesion: 'en_attente'),
        EtatCarte.verrouillee);
  });

  test('dérivation : payée et validée, validée', () {
    expect(
        etatCarteDepuis(cartePayee: true, statutAdhesion: 'validee'),
        EtatCarte.validee);
  });

  test('dérivation : payée sans validation, en attente', () {
    expect(
        etatCarteDepuis(cartePayee: true, statutAdhesion: 'en_attente'),
        EtatCarte.enAttente);
    expect(
        etatCarteDepuis(cartePayee: true, statutAdhesion: 'suspendue'),
        EtatCarte.enAttente);
    expect(etatCarteDepuis(cartePayee: true, statutAdhesion: ''),
        EtatCarte.enAttente);
  });

  testWidgets('page verrouillée : cadenas, matricule tronqué, aperçu',
      (tester) async {
    final service = _FauxServiceCarte();
    var cree = false;
    await _pomperCarte(tester, service,
        onCreerCarte: () => cree = true);
    expect(find.text('Ma carte'), findsOneWidget);
    expect(find.text('Non payée'), findsNWidgets(2));
    expect(find.text('VERROUILLÉE'), findsOneWidget);
    expect(find.text('Carte verrouillée'), findsOneWidget);
    expect(
        find.text('Touchez pour prévisualiser • Activez à 1 000 FCFA'),
        findsOneWidget);
    expect(find.text('Prête à activer'), findsOneWidget);
    expect(find.text('Axel Test'), findsOneWidget);
    expect(find.text('CP-AA-252...'), findsOneWidget);
    expect(find.text('CP-AA-2526'), findsNothing);
    expect(find.text('Créer ma carte • 1 000 FCFA'), findsOneWidget);
    expect(find.text('En attente de validation'), findsNothing);
    expect(
        find.text(
            'Visuel seul, la carte ne se modifie pas ici. Pour changer vos informations, ouvrez Mon profil depuis l’en-tête.'),
        findsOneWidget);
    await tester.tap(find.text('Créer ma carte • 1 000 FCFA'));
    expect(cree, isTrue);
    await tester.tap(find.byType(CartePremium));
    await tester.pump();
    expect(find.text('APERÇU'), findsOneWidget);
    expect(find.text('Prête à activer'), findsOneWidget);
    expect(find.text('Activer'), findsOneWidget);
    expect(find.text('Masquer'), findsOneWidget);
    await tester.tap(find.byType(CartePremium));
    await tester.pump();
    expect(find.text('VERROUILLÉE'), findsOneWidget);
    expect(find.text('Aperçu'), findsOneWidget);
  });

  testWidgets('page verrouillée en cours : bouton création en attente',
      (tester) async {
    final service = _FauxServiceCarte(carteEnAttente: true);
    await _pomperCarte(tester, service);
    expect(find.text('Carte verrouillée'), findsOneWidget);
    expect(find.text('Axel Test'), findsOneWidget);
    expect(find.text('Création en attente'), findsOneWidget);
    expect(find.text('Créer ma carte • 1 000 FCFA'), findsNothing);
  });

  testWidgets('page payée : badge vérification, matricule complet',
      (tester) async {
    final service = _FauxServiceCarte(cartePayee: true);
    var paiements = false;
    await _pomperCarte(tester, service,
        onVoirPaiements: () => paiements = true);
    expect(find.text('VÉRIFICATION'), findsOneWidget);
    expect(find.text('Paiement en cours de vérification'), findsOneWidget);
    expect(find.text('En attente'), findsNWidgets(3));
    expect(find.text('Axel Test'), findsOneWidget);
    expect(find.text('CP-AA-2526'), findsOneWidget);
    expect(find.text('CP-AA-252...'), findsNothing);
    expect(find.text('Création en attente'), findsOneWidget);
    expect(find.text('Créer ma carte • 1 000 FCFA'), findsNothing);
    expect(find.text('Dossier de carte en cours de validation'),
        findsOneWidget);
    expect(find.text('Mes paiements'), findsOneWidget);
    await tester.tap(find.text('Mes paiements'));
    expect(paiements, isTrue);
    await tester.tap(find.byType(CartePremium));
    await tester.pump();
    expect(find.text('Axel Test'), findsOneWidget);
  });

  testWidgets('page validée : badge active, toucher de la carte',
      (tester) async {
    final service = _FauxServiceCarte(
        cartePayee: true, statutAdhesion: 'validee');
    await _pomperCarte(tester, service);
    expect(find.text('ACTIVE'), findsOneWidget);
    expect(find.text('Carte active & vérifiée'), findsOneWidget);
    expect(find.text('Validée'), findsNWidgets(3));
    expect(find.text('Axel Test'), findsOneWidget);
    expect(find.text('CP-AA-2526'), findsOneWidget);
    expect(find.text('Carte verrouillée'), findsNothing);
    expect(find.text('En attente de validation'), findsNothing);
    expect(find.text('Partager mon identifiant membre'), findsOneWidget);
    await tester.tap(find.byType(CartePremium));
    await tester.pump();
    expect(find.text('Carte CP-AA-2526 prête à être présentée'),
        findsOneWidget);
  });

  testWidgets('page validée : partage de l’identifiant',
      (tester) async {
    final service = _FauxServiceCarte(
        cartePayee: true, statutAdhesion: 'validee');
    await _pomperCarte(tester, service);
    await tester.tap(find.text('Partager mon identifiant membre'));
    await tester.pump(const Duration(seconds: 1));
    expect(find.text('Identifiant CP-AA-2526 copié'), findsOneWidget);
  });

  testWidgets('tiroir verrouillé : cadenas, toucher vers Ma carte',
      (tester) async {
    DestinationNouvelle? navigue;
    final membre = Member('Axel Test', 'CP-AA-2526', '', DateTime(2025, 3, 2),
        anneeAdhesion: 2025);
    await tester.pumpWidget(MaterialApp(
      home: Scaffold(
        drawer: TiroirNouveau(
          membre: membre,
          onNaviguer: (d) => navigue = d,
          etatCarte: EtatCarte.verrouillee,
        ),
        body: const Text('corps'),
      ),
    ));
    await tester.pump();
    tester.state<ScaffoldState>(find.byType(Scaffold)).openDrawer();
    await tester.pumpAndSettle();
    expect(find.text('Carte verrouillée'), findsOneWidget);
    expect(find.text('Axel Test'), findsOneWidget);
    expect(find.text('En attente de validation'), findsNothing);
    await tester.tap(find.text('Axel Test'));
    await tester.pumpAndSettle();
    expect(navigue, DestinationNouvelle.carte);
  });

  testWidgets('tiroir en attente : badge, sans cadenas', (tester) async {
    await _ouvrirTiroir(tester, EtatCarte.enAttente);
    expect(find.text('En attente de validation'), findsOneWidget);
    expect(find.text('Carte verrouillée'), findsNothing);
  });

  testWidgets('tiroir validé : carte normale, ni cadenas ni badge',
      (tester) async {
    await _ouvrirTiroir(tester, EtatCarte.validee);
    expect(find.text('Axel Test'), findsOneWidget);
    expect(find.text('Carte verrouillée'), findsNothing);
    expect(find.text('En attente de validation'), findsNothing);
  });

  testWidgets('tiroir sans état : carte comme avant', (tester) async {
    await _ouvrirTiroir(tester, null);
    expect(find.text('Axel Test'), findsOneWidget);
    expect(find.text('Carte verrouillée'), findsNothing);
    expect(find.text('En attente de validation'), findsNothing);
  });
}
