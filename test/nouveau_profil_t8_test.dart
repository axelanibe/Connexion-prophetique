// Tests de la tranche T8, nouveau Mon profil et Ma carte,
// 26 nov. 2026. Le membre ci-dessous est un membre de test,
// jamais un vrai membre : matricule CP-AA-2526, Bureau
// national, Membre depuis 2025.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/app_models.dart';
import 'package:connexion_prophetique/nouveau/modeles_profil.dart';
import 'package:connexion_prophetique/nouveau/modeles_t15.dart';
import 'package:connexion_prophetique/nouveau/page_carte.dart';
import 'package:connexion_prophetique/nouveau/page_profil.dart';
import 'package:connexion_prophetique/nouveau/service_profil.dart';

class _FauxServiceProfil implements ServiceProfil {
  _FauxServiceProfil({
    this.cartePayee = false,
    this.carteEnAttente = false,
    Member? membre,
  }) : _membre = membre ??
            Member(
              'Axel Test',
              'CP-AA-2526',
              '',
              DateTime(2025, 3, 2),
              fonction: 'Membre',
              telephone: '+225 07 00 00 00',
              dateNaissance: DateTime(1990, 5, 10),
              anneeAdhesion: 2025,
              statutAdhesion: 'validee',
            );
  Member _membre;
  var _email = '';
  var _ville = '';
  var _pays = 'Côte d’Ivoire';
  final enregistrements = <ModifsProfil>[];
  var photoChangee = false;

  @override
  Future<void> charger() async {}

  @override
  bool get aEchoue => false;

  @override
  Member? get membre => _membre;

  @override
  String get email => _email;

  @override
  String get ville => _ville;

  @override
  String get pays => _pays;

  @override
  List<String> get etablissements => const ['Bureau national', 'Abidjan'];

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
  Future<EnregistrementProfil> enregistrer(ModifsProfil modifs) async {
    enregistrements.add(modifs);
    final local = modifs.nom.trim() != _membre.name ||
        modifs.ville.trim() != _ville;
    _membre = Member(
      modifs.nom.trim(),
      _membre.matricule,
      modifs.etablissement == 'Autre' ? '' : modifs.etablissement,
      _membre.since,
      fonction: modifs.fonction,
      photoData: _membre.photoData,
      dateNaissance: modifs.dateNaissance,
      telephone: modifs.telephone,
      anneeAdhesion: _membre.anneeAdhesion,
      statutAdhesion: _membre.statutAdhesion,
    );
    _email = modifs.email.trim();
    _ville = modifs.ville.trim();
    _pays = modifs.pays;
    return EnregistrementProfil(reussi: true, gardeLocalSeulement: local);
  }

  @override
  Future<bool> changerPhoto(PhotoChoisie photo) async {
    photoChangee = true;
    return true;
  }

  @override
  Future<bool> demanderChangementEmail(String email) async {
    return true;
  }

  @override
  Future<bool> confirmerChangementEmail(String email, String code) async {
    if (code != '123456') return false;
    _email = email;
    return true;
  }
}

Future<void> _pomperProfil(
  WidgetTester tester,
  _FauxServiceProfil service, {
  bool depuisCarte = false,
  VoidCallback? onVoirCarte,
  VoidCallback? onRetourCarte,
}) async {
  await tester.pumpWidget(MaterialApp(
    home: Scaffold(
      body: PageMonProfilNouvelle(
        service: service,
        depuisCarte: depuisCarte,
        onVoirCarte: onVoirCarte,
        onRetourCarte: onRetourCarte,
      ),
    ),
  ));
  await tester.pump();
  await tester.pump();
}

Future<void> _pomperCarte(
  WidgetTester tester,
  _FauxServiceProfil service, {
  VoidCallback? onCreerCarte,
}) async {
  await tester.pumpWidget(MaterialApp(
    home: Scaffold(
      body: PageCarteNouvelle(
        service: service,
        onCreerCarte: onCreerCarte,
      ),
    ),
  ));
  await tester.pump();
  await tester.pump();
}

void main() {
  test('les 11 fonctions connues, sans Plateforme', () {
    expect(fonctionsMembre, hasLength(11));
    expect(fonctionsMembre, contains('Président'));
    expect(fonctionsMembre, contains('Aucun'));
    expect(fonctionsMembre, isNot(contains('Plateforme')));
  });

  test('établissement de la carte : Bureau national sans valeur', () {
    final sansEtab = Member('Axel Test', 'CP-AA-2526', '', DateTime(2025, 3, 2));
    expect(etablissementCarte(sansEtab), 'Bureau national');
    final avecEtab =
        Member('Axel Test', 'CP-AA-2526', 'Abidjan', DateTime(2025, 3, 2));
    expect(etablissementCarte(avecEtab), 'Abidjan');
  });

  testWidgets('profil : bloc photo et tous les champs', (tester) async {
    final service = _FauxServiceProfil(cartePayee: true);
    await _pomperProfil(tester, service);
    expect(find.text('Changer la photo'), findsOneWidget);
    expect(find.text('Nom'), findsOneWidget);
    expect(find.text('Établissement'), findsOneWidget);
    expect(find.text('Fonction'), findsOneWidget);
    expect(find.text('Date de naissance'), findsOneWidget);
    expect(find.text('Axel Test'), findsOneWidget);
    expect(find.text('10/5/1990'), findsOneWidget);
    expect(find.text('Retour vers la carte'), findsNothing);
    await tester.drag(find.byType(ListView), const Offset(0, -500));
    await tester.pump();
    expect(find.text('Téléphone'), findsOneWidget);
    expect(find.text('E-mail'), findsOneWidget);
    expect(find.text('Ville de résidence'), findsOneWidget);
    expect(find.text('Pays de résidence'), findsOneWidget);
    expect(find.text('Enregistrer'), findsOneWidget);
    expect(find.text('Ma carte'), findsOneWidget);
  });

  testWidgets('profil depuis la carte : retour vers la carte',
      (tester) async {
    final service = _FauxServiceProfil();
    var retour = false;
    var voirCarte = false;
    await _pomperProfil(
      tester,
      service,
      depuisCarte: true,
      onVoirCarte: () => voirCarte = true,
      onRetourCarte: () => retour = true,
    );
    await tester.tap(find.byKey(const ValueKey('retourCarte')));
    expect(retour, isTrue);
    await tester.drag(find.byType(ListView), const Offset(0, -500));
    await tester.pump();
    await tester.tap(find.byKey(const ValueKey('boutonCarte')));
    expect(voirCarte, isTrue);
  });

  testWidgets('enregistrer un nouveau nom, répercuté sur la carte',
      (tester) async {
    final service = _FauxServiceProfil(cartePayee: true);
    await _pomperProfil(tester, service);
    await tester.enterText(
        find.byKey(const ValueKey('champNom')), 'Axel Nouveau');
    await tester.scrollUntilVisible(
      find.text('Enregistrer'),
      500,
      scrollable: find.byType(Scrollable).first,
    );
    await tester.pumpAndSettle();
    await tester.tap(find.text('Enregistrer'));
    await tester.pumpAndSettle();
    await tester.pump();
    expect(service.enregistrements.single.nom, 'Axel Nouveau');
    expect(service.membre!.name, 'Axel Nouveau');
    expect(
        find.text(
            'Informations mises à jour. Nom ou ville gardés sur cet appareil seulement.'),
        findsOneWidget);
    await _pomperCarte(tester, service);
    expect(find.text('Axel Nouveau'), findsOneWidget);
  });

  testWidgets('changer la photo passe par le service', (tester) async {
    final service = _FauxServiceProfil();
    await tester.pumpWidget(MaterialApp(
      home: Scaffold(
        body: PageMonProfilNouvelle(
          service: service,
          choisirPhoto: () async =>
              (octets: <int>[1, 2, 3], mime: 'jpeg'),
        ),
      ),
    ));
    await tester.pump();
    await tester.pump();
    await tester.tap(find.text('Changer la photo'));
    await tester.pump();
    expect(service.photoChangee, isTrue);
    expect(find.text('Photo mise à jour.'), findsOneWidget);
  });

  testWidgets('carte verrouillée : cadenas et bouton créer',
      (tester) async {
    final service = _FauxServiceProfil();
    var cree = false;
    await _pomperCarte(tester, service, onCreerCarte: () => cree = true);
    expect(find.text('Carte verrouillée'), findsOneWidget);
    expect(find.text('Axel Test'), findsOneWidget);
    expect(find.text('Créer ma carte • 1 000 FCFA'), findsOneWidget);
    expect(find.text('Création en attente'), findsNothing);
    await tester.tap(find.text('Créer ma carte • 1 000 FCFA'));
    expect(cree, isTrue);
  });

  testWidgets('carte en attente : verrouillée, bouton désactivé',
      (tester) async {
    final service = _FauxServiceProfil(carteEnAttente: true);
    await _pomperCarte(tester, service);
    expect(find.text('Carte verrouillée'), findsOneWidget);
    expect(find.text('Axel Test'), findsOneWidget);
    expect(find.text('Création en attente'), findsOneWidget);
    expect(find.text('Créer ma carte • 1 000 FCFA'), findsNothing);
  });

  testWidgets('carte visible : seul le visuel, sans toucher vers le profil',
      (tester) async {
    final service = _FauxServiceProfil(cartePayee: true);
    await _pomperCarte(tester, service);
    expect(find.text('Axel Test'), findsOneWidget);
    expect(find.text('CP-AA-2526'), findsOneWidget);
    expect(find.text('Bureau national'), findsOneWidget);
    expect(find.text('Membre depuis 2025'), findsOneWidget);
    expect(find.text('Créer ma carte • 1 000 FCFA'), findsNothing);
    expect(find.text('Enregistrer'), findsNothing);
    await tester.tap(find.byType(CartePremium));
    await tester.pump();
    expect(find.text('Axel Test'), findsOneWidget);
  });

  testWidgets('carte visible : établissement serveur gardé',
      (tester) async {
    final service = _FauxServiceProfil(
      cartePayee: true,
      membre: Member('Axel Test', 'CP-AA-2526', 'Abidjan',
          DateTime(2025, 3, 2),
          anneeAdhesion: 2025),
    );
    await _pomperCarte(tester, service);
    expect(find.text('Abidjan'), findsOneWidget);
    expect(find.text('Bureau national'), findsNothing);
  });
}
