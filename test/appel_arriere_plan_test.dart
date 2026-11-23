// Appel en arrière-plan, carte 4, 21 nov. 2026 : l'appel vit
// dans l'état global hors de l'écran, Réduire quitte l'écran sans
// envoyer 'termine', et la pastille « Appel en cours » rouvre
// l'appel. Les faux (API, service WebRTC, signalisation, lecteur)
// sont ceux de test/appels_test.dart, réutilisés tels quels.
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/appel_en_cours.dart';
import 'package:connexion_prophetique/appels.dart';
import 'package:connexion_prophetique/appels_screens.dart';

import 'appels_test.dart' as appels_test;

void main() {
  group('État global de l’appel', () {
    late appels_test.FauxServiceAppel fauxService;
    late appels_test.FausseSignalisation fausseSignalisation;

    setUp(() {
      fauxService = appels_test.FauxServiceAppel();
      fausseSignalisation = appels_test.FausseSignalisation();
      etatAppelGlobal.surDemarrerSysteme = null;
      etatAppelGlobal.surTerminerSysteme = null;
      etatAppelGlobal.envoyerTermine = null;
      etatAppelGlobal.ouvrirEcran = null;
    });

    tearDown(() async {
      await etatAppelGlobal.terminer();
      etatAppelGlobal.surDemarrerSysteme = null;
      etatAppelGlobal.surTerminerSysteme = null;
      etatAppelGlobal.envoyerTermine = null;
      etatAppelGlobal.ouvrirEcran = null;
    });

    void demarrerAppel() {
      etatAppelGlobal.demarrer(
        appelId: 'a1',
        autreNom: 'Jean',
        typeAppel: 'audio',
        suisAppelant: false,
        service: fauxService,
        signalisation: fausseSignalisation,
      );
    }

    test('démarrer porte l’appel hors de l’écran, sans réduction', () {
      demarrerAppel();
      expect(etatAppelGlobal.actif, isTrue);
      expect(etatAppelGlobal.appelId, 'a1');
      expect(etatAppelGlobal.autreNom, 'Jean');
      expect(etatAppelGlobal.enCours, isFalse);
      expect(etatAppelGlobal.reduit, isFalse);
      expect(etatAppelGlobal.service, same(fauxService));
      expect(etatAppelGlobal.signalisation, same(fausseSignalisation));
    });

    test('décrocher puis réduire garde l’appel et son service', () {
      demarrerAppel();
      etatAppelGlobal.passerEnCours();
      expect(etatAppelGlobal.enCours, isTrue);
      expect(etatAppelGlobal.debut, isNotNull);
      etatAppelGlobal.reduire();
      expect(etatAppelGlobal.reduit, isTrue);
      expect(etatAppelGlobal.actif, isTrue);
      expect(etatAppelGlobal.service, same(fauxService));
    });

    test('démarrer deux fois le même appel garde l’état, reprise', () {
      demarrerAppel();
      etatAppelGlobal.passerEnCours();
      final debut = etatAppelGlobal.debut;
      etatAppelGlobal.marquerPrepare();
      etatAppelGlobal.demarrer(
        appelId: 'a1',
        autreNom: 'Jean',
        typeAppel: 'audio',
        suisAppelant: false,
        service: fauxService,
        signalisation: fausseSignalisation,
      );
      expect(etatAppelGlobal.enCours, isTrue);
      expect(etatAppelGlobal.debut, debut);
      expect(etatAppelGlobal.prepare, isTrue);
    });

    test('même identifiant, autre service : tout repart de zéro', () {
      // Non-régression, 21 nov. 2026 : sans l'identité du service,
      // un nouvel appel avec le même identifiant prenait le chemin
      // de reprise, sans minuteur de sonnerie, et l'appelant
      // n'envoyait jamais 'annule' après 30 s.
      demarrerAppel();
      etatAppelGlobal.passerEnCours();
      etatAppelGlobal.marquerPrepare();
      final autreService = appels_test.FauxServiceAppel();
      etatAppelGlobal.demarrer(
        appelId: 'a1',
        autreNom: 'Jean',
        typeAppel: 'audio',
        suisAppelant: false,
        service: autreService,
        signalisation: fausseSignalisation,
      );
      expect(etatAppelGlobal.enCours, isFalse);
      expect(etatAppelGlobal.prepare, isFalse);
      expect(etatAppelGlobal.debut, isNull);
      expect(etatAppelGlobal.service, same(autreService));
    });

    test('terminer vide l’état et ferme l’appel système', () async {
      demarrerAppel();
      final demarres = <String>[];
      final termines = <String>[];
      etatAppelGlobal.surDemarrerSysteme =
          (appelId, autreNom, typeAppel) async {
        demarres.add('$appelId:$autreNom:$typeAppel');
      };
      etatAppelGlobal.surTerminerSysteme = (appelId) async {
        termines.add(appelId);
      };
      await etatAppelGlobal.demarrerAppelSysteme();
      expect(demarres, ['a1:Jean:audio']);
      await etatAppelGlobal.terminer();
      expect(etatAppelGlobal.actif, isFalse);
      expect(etatAppelGlobal.service, isNull);
      expect(termines, ['a1']);
    });

    test('terminer sans appel système n’appelle pas endCall', () async {
      demarrerAppel();
      var termineAppelee = false;
      etatAppelGlobal.surTerminerSysteme = (_) async {
        termineAppelee = true;
      };
      await etatAppelGlobal.terminer();
      expect(termineAppelee, isFalse);
    });

    test('arrière-plan puis retour : l’appel continue, reprise notée',
        () async {
      demarrerAppel();
      etatAppelGlobal.didChangeAppLifecycleState(AppLifecycleState.paused);
      expect(etatAppelGlobal.enArrierePlan, isTrue);
      expect(etatAppelGlobal.actif, isTrue);
      etatAppelGlobal.didChangeAppLifecycleState(AppLifecycleState.resumed);
      expect(etatAppelGlobal.enArrierePlan, isFalse);
      expect(etatAppelGlobal.derniereReprise, isNotNull);
    });

    test('fermeture de l’application : termine envoyé au mieux', () async {
      demarrerAppel();
      final envoyes = <String>[];
      etatAppelGlobal.envoyerTermine = (appelId) async {
        envoyes.add(appelId);
      };
      etatAppelGlobal.didChangeAppLifecycleState(AppLifecycleState.detached);
      await Future<void>.delayed(Duration.zero);
      expect(envoyes, ['a1']);
    });

    test('mise en attente Telecom : média en pause, puis repris', () async {
      demarrerAppel();
      etatAppelGlobal.passerEnCours();
      expect(etatAppelGlobal.enAttente, isFalse);
      await etatAppelGlobal.mettreEnAttente(true);
      expect(etatAppelGlobal.enAttente, isTrue);
      expect(fauxService.muet, isTrue);
      expect(fauxService.cameraActive, isFalse);
      await etatAppelGlobal.mettreEnAttente(false);
      expect(etatAppelGlobal.enAttente, isFalse);
      expect(fauxService.muet, isFalse);
      expect(fauxService.cameraActive, isTrue);
    });

    test('mise en attente : muet et caméra choisis sont retrouvés',
        () async {
      demarrerAppel();
      etatAppelGlobal.passerEnCours();
      etatAppelGlobal.mettreAJourAudio(muet: true, hautParleur: false);
      etatAppelGlobal.mettreAJourCamera(false);
      await etatAppelGlobal.mettreEnAttente(true);
      expect(fauxService.muet, isTrue);
      expect(fauxService.cameraActive, isFalse);
      await etatAppelGlobal.mettreEnAttente(false);
      expect(fauxService.muet, isTrue);
      expect(fauxService.cameraActive, isFalse);
    });

    test('mise en attente sans appel en cours : rien ne se passe',
        () async {
      await etatAppelGlobal.mettreEnAttente(true);
      expect(etatAppelGlobal.enAttente, isFalse);
      expect(fauxService.muet, isFalse);
    });
  });

  group('Bouton Réduire', () {
    const canalPermissions =
        MethodChannel('flutter.baseflow.com/permissions/methods');

    setUp(() {
      TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
          .setMockMethodCallHandler(canalPermissions,
              (MethodCall call) async {
        if (call.method == 'requestPermissions') {
          final args = (call.arguments as List).cast<int>();
          return {for (final v in args) v: 1};
        }
        return null;
      });
      etatAppelGlobal.surDemarrerSysteme = null;
      etatAppelGlobal.surTerminerSysteme = null;
      etatAppelGlobal.envoyerTermine = null;
      etatAppelGlobal.ouvrirEcran = null;
    });

    tearDown(() async {
      TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
          .setMockMethodCallHandler(canalPermissions, null);
      await etatAppelGlobal.terminer();
      etatAppelGlobal.surDemarrerSysteme = null;
      etatAppelGlobal.surTerminerSysteme = null;
      etatAppelGlobal.envoyerTermine = null;
      etatAppelGlobal.ouvrirEcran = null;
    });

    testWidgets('Réduire quitte l’écran sans envoyer termine',
        (tester) async {
      final fauxApi = appels_test.FauxApiAppels(
        appel: _appelJson(appelantId: 'autre', appeleId: 'autre'),
      );
      final fauxService = appels_test.FauxServiceAppel();
      final fausseSignalisation = appels_test.FausseSignalisation();
      await tester.pumpWidget(
        MaterialApp(
          home: EcranAppelEnCours(
            appelId: 'a1',
            typeAppel: 'audio',
            autreNom: 'Jean',
            suisAppelant: false,
            apiClient: fauxApi,
            serviceAppel: fauxService,
            signalisation: fausseSignalisation,
            lecteurSonnerie: appels_test.FauxLecteurSonnerie(),
          ),
        ),
      );
      await tester.pump();
      await tester.pump();
      await tester.pump();
      expect(fauxService.prepareAppelee, isTrue);
      // Décrochage par l'offre de l'appelant.
      fausseSignalisation.emettre(
        SignalAppel(
          id: 's1',
          appelId: 'a1',
          emetteurId: 'autre',
          type: 'offre',
          contenu: {'sdp': 'offre-sdp', 'type': 'offer'},
          creeLe: DateTime.now(),
        ),
      );
      await tester.pump();
      await tester.pump();
      await tester.pump();
      expect(find.text('Appel en cours… 00:00'), findsOneWidget);
      expect(find.text('Réduire'), findsOneWidget);
      await tester.tap(find.byIcon(Icons.keyboard_arrow_down));
      await tester.pump();
      await tester.pump();
      await tester.pump(const Duration(seconds: 1));
      expect(find.byType(EcranAppelEnCours), findsNothing);
      // Aucun 'termine' : l'appel continue en arrière-plan.
      expect(fauxApi.signauxEnvoyes, isNot(contains('termine')));
      expect(etatAppelGlobal.actif, isTrue);
      expect(etatAppelGlobal.reduit, isTrue);
      expect(etatAppelGlobal.enCours, isTrue);
      // Le service n'est pas libéré : le média survit à l'écran.
      expect(fauxService.libere, isFalse);
    });

    testWidgets('Raccrocher envoie termine et vide l’état global',
        (tester) async {
      final fauxApi = appels_test.FauxApiAppels(
        appel: _appelJson(appelantId: 'autre', appeleId: 'autre'),
      );
      final fauxService = appels_test.FauxServiceAppel();
      final fausseSignalisation = appels_test.FausseSignalisation();
      await tester.pumpWidget(
        MaterialApp(
          home: EcranAppelEnCours(
            appelId: 'a1',
            typeAppel: 'audio',
            autreNom: 'Jean',
            suisAppelant: false,
            apiClient: fauxApi,
            serviceAppel: fauxService,
            signalisation: fausseSignalisation,
            lecteurSonnerie: appels_test.FauxLecteurSonnerie(),
          ),
        ),
      );
      await tester.pump();
      await tester.pump();
      await tester.pump();
      fausseSignalisation.emettre(
        SignalAppel(
          id: 's1',
          appelId: 'a1',
          emetteurId: 'autre',
          type: 'offre',
          contenu: {'sdp': 'offre-sdp', 'type': 'offer'},
          creeLe: DateTime.now(),
        ),
      );
      await tester.pump();
      await tester.pump();
      await tester.pump();
      await tester.tap(find.byIcon(Icons.call_end));
      await tester.pump();
      await tester.pump();
      expect(fauxApi.signauxEnvoyes, contains('termine'));
      expect(etatAppelGlobal.actif, isFalse);
      // La fermeture est animée (300 ms) : on avance le temps
      // factice pour que l'écran sorte de l'arbre et se libère.
      await tester.pump(const Duration(seconds: 1));
      expect(fauxService.libere, isTrue);
    });
  });

  group('Pastille Appel en cours', () {
    late appels_test.FauxServiceAppel fauxService;
    late appels_test.FausseSignalisation fausseSignalisation;

    setUp(() {
      fauxService = appels_test.FauxServiceAppel();
      fausseSignalisation = appels_test.FausseSignalisation();
      etatAppelGlobal.ouvrirEcran = null;
    });

    tearDown(() async {
      await etatAppelGlobal.terminer();
      etatAppelGlobal.ouvrirEcran = null;
    });

    testWidgets('cachée sans appel, visible quand l’appel est réduit',
        (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(body: BarreAppelEnCours()),
        ),
      );
      await tester.pump();
      expect(find.text('Revenir'), findsNothing);
      etatAppelGlobal.demarrer(
        appelId: 'a1',
        autreNom: 'Jean',
        typeAppel: 'audio',
        suisAppelant: false,
        service: fauxService,
        signalisation: fausseSignalisation,
      );
      etatAppelGlobal.passerEnCours();
      await tester.pump();
      // Appel ouvert mais pas réduit : l'écran est affiché, pas la pastille.
      expect(find.text('Revenir'), findsNothing);
      etatAppelGlobal.reduire();
      await tester.pump();
      expect(find.text('Appel en cours · Jean'), findsOneWidget);
      expect(find.text('Revenir'), findsOneWidget);
    });

    testWidgets('le toucher rouvre l’écran d’appel', (tester) async {
      etatAppelGlobal.demarrer(
        appelId: 'a1',
        autreNom: 'Jean',
        typeAppel: 'audio',
        suisAppelant: false,
        service: fauxService,
        signalisation: fausseSignalisation,
      );
      etatAppelGlobal.passerEnCours();
      etatAppelGlobal.reduire();
      var ouvert = false;
      etatAppelGlobal.ouvrirEcran = (_) => ouvert = true;
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(body: BarreAppelEnCours()),
        ),
      );
      await tester.pump();
      await tester.tap(find.text('Revenir'));
      await tester.pump();
      expect(ouvert, isTrue);
      expect(etatAppelGlobal.reduit, isFalse);
    });
  });
}

/// Appel en JSON, même forme que dans test/appels_test.dart.
Map<String, dynamic> _appelJson({
  String id = 'a1',
  String statut = 'sonne',
  String appelantId = 'autre',
  String appeleId = 'moi',
  String type = 'audio',
}) =>
    {
      'id': id,
      'conversation_id': 'c1',
      'appelant_id': appelantId,
      'appele_id': appeleId,
      'appelant_nom': 'Jean',
      'appele_nom': 'Moi',
      'type': type,
      'statut': statut,
      'cree_le': DateTime.now().toIso8601String(),
    };
