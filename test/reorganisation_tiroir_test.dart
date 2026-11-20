// Réorganisation du tiroir et cartes du Profil, 19 nov. 2026.
// Décision d'Axel : la section Navigation disparaît, Témoignages
// reste seul, les entrées Notifications, Playlist, Mes achats,
// Messagerie, Mon épanouissement, Mes attestations, Mes absences
// et demandes et Visite guidée quittent le tiroir, une tuile
// Paramètres ouvre une page dédiée, une section Sécurité montre
// Signalements et Modération avec leurs nombres, le filigrane
// quitte la Messagerie, la Librairie prend un signet Lucide et
// un pied de page avec Secrétariat et Contact email, et le Profil
// gagne cinq cartes. Aucune entrée Appels ni Stories.
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher_platform_interface/link.dart';
import 'package:url_launcher_platform_interface/url_launcher_platform_interface.dart';

import 'package:connexion_prophetique/home_web.dart';
import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/tiroir_intelligent.dart';

/// Réseau coupé net en test, comme dans attestation_120_test.dart :
/// une demande au serveur de production échoue aussitôt, la page
/// se replie sur ses données locales, sans jamais attendre le
/// délai de 45 secondes du client HTTP.
class _ClientHorsLigne implements HttpClient {
  @override
  Future<HttpClientRequest> openUrl(String method, Uri url) =>
      Future.error(const SocketException('hors ligne (test)'));

  @override
  Future<HttpClientRequest> getUrl(Uri url) =>
      Future.error(const SocketException('hors ligne (test)'));

  @override
  dynamic noSuchMethod(Invocation invocation) => super.noSuchMethod(invocation);
}

class _HorsLigne extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) => _ClientHorsLigne();
}

/// Pompe par pas de 100 ms jusqu'à ce que la cible apparaisse,
/// 40 pas au plus : le spinner de chargement différé et les
/// indicateurs de chargement tournent sans fin, pumpAndSettle ne
/// revient jamais tant que la page charge.
Future<void> _attendre(WidgetTester tester, Finder cible) async {
  for (var i = 0; i < 40; i++) {
    await tester.pump(const Duration(milliseconds: 100));
    if (cible.evaluate().isNotEmpty) return;
  }
  fail('Cible introuvable après le chargement : $cible');
}

class _FauxLanceur extends UrlLauncherPlatform {
  final lancees = <String>[];
  @override
  LinkDelegate? get linkDelegate => null;
  @override
  Future<bool> canLaunch(String url) async => true;
  @override
  Future<bool> launchUrl(String url, LaunchOptions options) async {
    lancees.add(url);
    return true;
  }
}

Future<void> _ouvrirTiroir(WidgetTester tester) async {
  tester.view.physicalSize = const Size(390, 4000);
  tester.view.devicePixelRatio = 1.0;
  addTearDown(tester.view.resetPhysicalSize);
  addTearDown(tester.view.resetDevicePixelRatio);
  final cle = GlobalKey<ScaffoldState>();
  await tester.pumpWidget(MaterialApp(
    home: Scaffold(key: cle, drawer: const MenuLateral(), body: const SizedBox.shrink()),
  ));
  await tester.pump();
  cle.currentState!.openDrawer();
  await tester.pumpAndSettle();
}

void main() {
  HttpOverrides.global = _HorsLigne();

  group('Tiroir réorganisé, membre', () {
    setUp(() {
      SharedPreferences.setMockInitialValues({});
      app.member = Member('Test', 'CP-TT-2526', 'Céleste', DateTime(2026, 1, 1), fonction: 'Membre', statutAdhesion: 'validee');
      app.lang = 'fr';
      app.isAdmin = true;
      TiroirContexte.instance.definirPourTests(aEnfants: true, aResultats: true);
      SignalementsCompteurs.instance.reinitialiserPourTests();
    });

    tearDown(() {
      app.member = null;
      app.isAdmin = false;
      SignalementsCompteurs.instance.reinitialiserPourTests();
    });

    testWidgets('390 px : Témoignages seul, entrées retirées absentes', (tester) async {
      await _ouvrirTiroir(tester);
      expect(find.text('Navigation'), findsNothing);
      expect(find.text('Témoignages'), findsOneWidget);
      expect(find.text('Notifications'), findsNothing);
      expect(find.text('Playlist'), findsNothing);
      expect(find.text('Mes achats'), findsNothing);
      expect(find.text('Messagerie'), findsNothing);
      expect(find.text('Mon épanouissement'), findsNothing);
      expect(find.text('Mes attestations'), findsNothing);
      expect(find.text('Mes absences et demandes'), findsNothing);
      expect(find.text('Visite guidée'), findsNothing);
      expect(find.text('Appels'), findsNothing);
      expect(find.text('Stories'), findsNothing);
      expect(find.text('Magnétophone'), findsOneWidget);
      expect(find.text('Paramètres'), findsOneWidget);
      expect(find.text('Sécurité'), findsOneWidget);
      expect(find.text('Signalements'), findsOneWidget);
      expect(find.text('Modération'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('section Sécurité : nombres affichés', (tester) async {
      SignalementsCompteurs.instance.mesOuverts.value = 2;
      SignalementsCompteurs.instance.moderationEnAttente.value = 1;
      await _ouvrirTiroir(tester);
      expect(find.text('Signalements'), findsOneWidget);
      expect(find.text('Mes signalements, ouverts et résolus.'), findsOneWidget);
      expect(find.text('2'), findsOneWidget);
      expect(find.text('Modération'), findsOneWidget);
      expect(find.text('Signalements à traiter, pour la structure.'), findsOneWidget);
      expect(find.text('1'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('section Sécurité sans nombre : entrées visibles, sans pastille', (tester) async {
      await _ouvrirTiroir(tester);
      expect(find.text('Signalements'), findsOneWidget);
      expect(find.text('Modération'), findsOneWidget);
      expect(find.text('2'), findsNothing);
      expect(find.text('1'), findsNothing);
      expect(tester.takeException(), isNull);
    });

    testWidgets('Paramètres ouvre la page Paramètres', (tester) async {
      await _ouvrirTiroir(tester);
      await tester.tap(find.text('Paramètres'));
      await tester.pumpAndSettle();
      // L'en-tête membre ne montre pas le titre de la page, seules
      // les tuiles de la page prouvent l'ouverture.
      expect(find.text('Taille du texte'), findsOneWidget);
      expect(find.text('Langue'), findsOneWidget);
      expect(find.text('Signaler un problème'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  });

  group('Cartes du Profil', () {
    // Les cartes Document et Engagement vivent dans leurs propres
    // fichiers (reorganisation_tiroir_document_test.dart et
    // reorganisation_tiroir_engagement_test.dart) : un seul
    // chargement différé aboutit par fichier de test, le deuxième
    // reste bloqué sur son spinner. La carte Démarche, premier
    // chargement différé de ce fichier, reste ici.
    Future<void> pomperProfil(WidgetTester tester) async {
      SharedPreferences.setMockInitialValues({});
      tester.view.physicalSize = const Size(390, 4000);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      app.member = Member('Test', 'CP-TT-2526', 'Céleste', DateTime(2026, 1, 1), fonction: 'Membre', statutAdhesion: 'validee');
      app.lang = 'fr';
      addTearDown(() {
        app.member = null;
      });
      await tester.pumpWidget(const MaterialApp(home: ProfilePage()));
      await tester.pumpAndSettle();
    }

    testWidgets('390 px : les cinq cartes, dans l’ordre, sous l’identité', (tester) async {
      await pomperProfil(tester);
      final titres = [
        'Démarche administrative',
        'Document',
        'Mon journal',
        'Engagement',
        'Croissance spirituelle',
      ];
      double precedent = -1;
      for (final titre in titres) {
        expect(find.text(titre), findsOneWidget);
        final haut = tester.getTopLeft(find.text(titre)).dy;
        expect(haut, greaterThan(precedent));
        precedent = haut;
      }
      expect(find.text('Absences, autorisations et requêtes'), findsOneWidget);
      expect(find.text('Attestations et certificats'), findsOneWidget);
      expect(find.text('Activités et historique'), findsOneWidget);
      expect(find.text('Fonctions et responsabilités'), findsOneWidget);
      expect(find.text('Plan de lecture biblique et progression'), findsOneWidget);
      // Les cartes sont au-dessus de Se déconnecter.
      expect(
        tester.getTopLeft(find.text('Croissance spirituelle')).dy,
        lessThan(tester.getTopLeft(find.text('Se déconnecter de cet appareil')).dy),
      );
      expect(tester.takeException(), isNull);
    });

    testWidgets('Démarche administrative ouvre Mes absences et demandes', (tester) async {
      await pomperProfil(tester);
      await tester.tap(find.text('Démarche administrative'));
      await _attendre(tester, find.text('Nouvelle demande'));
      expect(find.text('Nouvelle demande'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('Mon journal ouvre le journal privé', (tester) async {
      await pomperProfil(tester);
      await tester.tap(find.text('Mon journal'));
      await _attendre(tester, find.text('Bilan privé'));
      expect(find.text('Bilan privé'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('Croissance spirituelle ouvre Mon épanouissement', (tester) async {
      await pomperProfil(tester);
      await tester.tap(find.text('Croissance spirituelle'));
      await _attendre(tester, find.text('Minuteur de prière'));
      expect(find.text('Minuteur de prière'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  });

  group('Librairie, signet et pied de page', () {
    setUp(() {
      SharedPreferences.setMockInitialValues({});
      // Membre connecté : le pied de page ne se rend que dans la
      // branche membre de basic(), jamais pour un visiteur, comme
      // le pied de page partagé avant lui.
      app.member = Member('Test', 'CP-TT-2526', 'Céleste', DateTime(2026, 1, 1), fonction: 'Membre', statutAdhesion: 'validee');
      app.lang = 'fr';
      app.books.clear();
      app.cart.clear();
      app.requests.clear();
      app.isAdminGeneral = false;
    });

    tearDown(() {
      app.member = null;
      app.books.clear();
      app.cart.clear();
      app.requests.clear();
    });

    testWidgets('pilule : icône signet Lucide pour la Librairie', (tester) async {
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(
          body: const SizedBox.shrink(),
          bottomNavigationBar: BottomNavWeb(index: 2, onTap: (_) {}),
        ),
      ));
      await tester.pump();
      expect(find.byIcon(Ic.book), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('390 px : devise et deux boutons, sans le long pied de page', (tester) async {
      tester.view.physicalSize = const Size(390, 4000);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      await tester.pumpWidget(const MaterialApp(home: LibrairiePage()));
      await tester.pumpAndSettle();
      expect(find.text('Former pour mieux servir'), findsOneWidget);
      expect(find.text('Secrétariat'), findsOneWidget);
      expect(find.text('Contact email'), findsOneWidget);
      expect(find.text('Association cultuelle en voie de déclaration'), findsNothing);
      expect(find.text('Récépissé n° 0991/MIS/DGAT/DAG/SDVA du 21 juin 2023'), findsNothing);
      expect(tester.takeException(), isNull);
    });

    testWidgets('Secrétariat déclenche l’appel, Contact email ouvre l’e-mail', (tester) async {
      final lanceur = _FauxLanceur();
      UrlLauncherPlatform.instance = lanceur;
      tester.view.physicalSize = const Size(390, 4000);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      await tester.pumpWidget(const MaterialApp(home: LibrairiePage()));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Secrétariat'));
      await tester.pumpAndSettle();
      expect(lanceur.lancees, ['tel:0787406387']);
      await tester.tap(find.text('Contact email'));
      await tester.pumpAndSettle();
      expect(lanceur.lancees, ['tel:0787406387', 'mailto:support@connexionprophetique.com']);
      expect(tester.takeException(), isNull);
    });
  });
}
