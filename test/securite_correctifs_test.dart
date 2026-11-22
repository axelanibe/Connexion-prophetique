// Correctifs de sécurité du 22 nov. 2026, constats C-2, H-2, H-4,
// H-15, B-4, B-11, MO-1, MO-7, MO-25. Sans serveur réel : l'API
// est simulée par un client HTTP en mémoire, le coffre par un
// canal simulé, la WebSocket par un serveur local.
import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/appels_ws.dart';
import 'package:connexion_prophetique/bug_reports.dart';
import 'package:connexion_prophetique/link_embed.dart';
import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/stockage_auth.dart';
import 'package:connexion_prophetique/verification_auth.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  const canalCoffre = MethodChannel(
    'plugins.it_nomads.com/flutter_secure_storage',
  );
  const canalNatif = MethodChannel('connexionprophetique/app');
  late Map<String, String> coffre;
  late ApiClient clientSauvegarde;

  setUp(() {
    coffre = {};
    SharedPreferences.setMockInitialValues({});
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
        .setMockMethodCallHandler(canalCoffre, (MethodCall appel) async {
      final args = appel.arguments as Map?;
      switch (appel.method) {
        case 'read':
          return coffre[args?['key'] as String?];
        case 'write':
          coffre[args?['key'] as String] = args?['value'] as String;
          return null;
        case 'delete':
          coffre.remove(args?['key'] as String);
          return null;
        default:
          return null;
      }
    });
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
        .setMockMethodCallHandler(canalNatif, (MethodCall appel) async {
      return null;
    });
    clientSauvegarde = api;
  });

  tearDown(() {
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
        .setMockMethodCallHandler(canalCoffre, null);
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
        .setMockMethodCallHandler(canalNatif, null);
    api = clientSauvegarde;
    app.member = null;
    app.isAdmin = false;
    app.isAdminGeneral = false;
    app.journal.clear();
    app.requests.clear();
    app.paidCardMatricules.clear();
    app.waveRecipient = '';
    app.confirmedWaveNumber = '';
    app.fichesSanteEnAttente.clear();
  });

  group('B-4, delaiReessai429', () {
    test('l’en-tête Retry-After prime sur le texte', () {
      expect(delaiReessai429('Rate limit exceeded, retry in 17 seconds', retryAfter: 5), 5);
    });

    test('sans en-tête, le texte anglais reste le repli', () {
      expect(delaiReessai429('Rate limit exceeded, retry in 17 seconds'), 17);
      expect(delaiReessai429('autre message'), 30);
    });

    test('plafonné à 65 secondes, plancher à 1', () {
      expect(delaiReessai429('', retryAfter: 300), 65);
      expect(delaiReessai429('', retryAfter: 0), 1);
    });
  });

  group('B-11, nettoyage des rapports de bug', () {
    test('une chaîne hexadécimale de 64 caractères est retirée', () {
      const jeton = 'a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90';
      expect(BugReports.scrub('erreur $jeton fin'), 'erreur [jeton retire] fin');
    });

    test('un JWT est toujours retiré', () {
      const jwt = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoibWVtYnJlIn0.signature-0123456789abcdef';
      expect(BugReports.scrub('erreur $jwt fin'), isNot(contains('eyJhbGci')));
    });
  });

  group('MO-7, liens et liste blanche', () {
    test('http est remonté en https dans embedUrl', () {
      expect(embedUrl('http://www.youtube.com/watch?v=abc'), 'https://www.youtube.com/embed/abc');
      expect(embedUrl('https://youtu.be/abc'), 'https://www.youtube.com/embed/abc');
    });

    test('hôtes autorisés et refusés', () {
      expect(hoteWebViewAutorise('https://www.youtube.com/embed/abc'), isTrue);
      expect(hoteWebViewAutorise('https://player.vimeo.com/video/123'), isTrue);
      expect(hoteWebViewAutorise('https://connexionprophetique.com/page'), isTrue);
      expect(hoteWebViewAutorise('https://piege.example.com/page'), isFalse);
      expect(hoteWebViewAutorise('https://unpkg.com/@zxing/library@0.21.3'), isFalse);
    });
  });

  group('H-2 et MO-1, déconnexion', () {
    test('la révocation est tentée quel que soit le format du jeton', () async {
      final appeles = <String>[];
      final mock = MockClient((http.Request request) async {
        appeles.add(request.url.path);
        return http.Response('{}', 200);
      });
      final client = ApiClient(client: mock);
      await client.restoreToken();
      // Jeton court, pas 64 caractères : l'ancien code ne
      // tentait même pas la révocation.
      await StockageAuth.ecrire('api_refresh_token', 'court');
      await client.restoreToken();
      await client.logout();
      expect(appeles, contains('/auth/deconnexion'));
      expect(await StockageAuth.lire('api_refresh_token'), isNull);
    });

    test('un échec serveur ne bloque pas la déconnexion locale', () async {
      final mock = MockClient((http.Request request) async {
        return http.Response('erreur', 500);
      });
      final client = ApiClient(client: mock);
      await StockageAuth.ecrire('api_access_token', 'acces');
      await StockageAuth.ecrire('api_refresh_token', 'renouvellement');
      await client.restoreToken();
      await client.logout();
      expect(client.isConnected, isFalse);
      expect(await StockageAuth.lire('api_access_token'), isNull);
    });

    test('déconnecter tous les appareils appelle la route dédiée', () async {
      final appeles = <String>[];
      final mock = MockClient((http.Request request) async {
        appeles.add(request.url.path);
        return http.Response('{}', 200);
      });
      final client = ApiClient(client: mock);
      await StockageAuth.ecrire('api_access_token', 'acces');
      await client.restoreToken();
      await client.deconnecterTous();
      expect(appeles, contains('/auth/deconnecter-tous'));
    });

    test('logout efface les données personnelles locales', () async {
      final mock = MockClient((http.Request request) async {
        return http.Response('{}', 200);
      });
      api = ApiClient(client: mock);
      await app.load();
      app.member = Member('Test', 'CP-TT-2526', 'Céleste', DateTime(2026, 1, 1));
      app.journal.add(JournalEntry(DateTime(2026, 11, 22), 'prière privée'));
      app.requests.add(PayRequest('ref1', 'achat', 1000, [], 'Test', 'CP-TT-2526', DateTime.now()));
      app.paidCardMatricules.add('CP-TT-2526');
      app.waveRecipient = 'Destinataire';
      app.confirmedWaveNumber = '+2250700000000';
      app.fichesSanteEnAttente.add('fiche-1');
      // Le lecteur audio de fond n'existe pas en test : son
      // erreur de canal est absorbée ici, pour ne tester que
      // l'effacement.
      await runZonedGuarded(() async {
        app.logout();
        await Future<void>.delayed(const Duration(milliseconds: 300));
      }, (Object e, StackTrace s) {});
      expect(app.journal, isEmpty);
      expect(app.requests, isEmpty);
      expect(app.paidCardMatricules, isEmpty);
      expect(app.waveRecipient, '');
      expect(app.confirmedWaveNumber, '');
      expect(app.fichesSanteEnAttente, isEmpty);
      final prefs = await SharedPreferences.getInstance();
      expect(prefs.getStringList('journal'), isEmpty);
      expect(prefs.getStringList('requests'), isEmpty);
      expect(prefs.getStringList('paidCards'), isEmpty);
      expect(prefs.getString('wave_recipient'), '');
      expect(prefs.getString('wave_number'), '');
      expect(prefs.getStringList('fiches_sante_en_attente'), isEmpty);
    });
  });

  group('B-4, Retry-After dans les erreurs API', () {
    test('une 429 porte le délai de l’en-tête', () async {
      final mock = MockClient((http.Request request) async {
        return http.Response(
          jsonEncode({'erreur': 'Rate limit exceeded, retry in 17 seconds'}),
          429,
          headers: {'retry-after': '17'},
        );
      });
      final client = ApiClient(client: mock);
      try {
        await client.login('identifiant', 'motdepasse');
        fail('une ApiException était attendue');
      } on ApiException catch (e) {
        expect(e.status, 429);
        expect(e.delaiReessai, 17);
        expect(delaiReessai429(e.message, retryAfter: e.delaiReessai), 17);
      }
    });
  });

  group('MO-25, vérification d’e-mail et 2FA', () {
    test('verifierEmail enregistre les jetons renvoyés', () async {
      final appeles = <String>[];
      final mock = MockClient((http.Request request) async {
        appeles.add(request.url.path);
        return http.Response(
          jsonEncode({'access': 'acces', 'refresh': 'renouvellement'}),
          200,
        );
      });
      final client = ApiClient(client: mock);
      final reponse = await client.verifierEmail(email: 'a@b.c', code: '123456');
      expect(appeles, contains('/auth/verifier-email'));
      expect(reponse['access'], 'acces');
      expect(client.isConnected, isTrue);
      expect(await StockageAuth.lire('api_access_token'), 'acces');
    });

    test('connexion2fa enregistre les jetons renvoyés', () async {
      final appeles = <String>[];
      final mock = MockClient((http.Request request) async {
        appeles.add(request.url.path);
        return http.Response(
          jsonEncode({'access': 'acces', 'refresh': 'renouvellement'}),
          200,
        );
      });
      final client = ApiClient(client: mock);
      await client.connexion2fa(identifiant: 'identifiant', code: '123456');
      expect(appeles, contains('/auth/connexion-2fa'));
      expect(client.isConnected, isTrue);
    });

    testWidgets('écran de vérification : code validé, écran fermé', (tester) async {
      final mock = MockClient((http.Request request) async {
        if (request.url.path == '/auth/verifier-email') {
          return http.Response(
            jsonEncode({'access': 'acces', 'refresh': 'renouvellement'}),
            200,
          );
        }
        return http.Response('{}', 200);
      });
      api = ApiClient(client: mock);
      var verifie = false;
      await tester.pumpWidget(
        MaterialApp(
          home: Builder(
            builder: (context) => FilledButton(
              onPressed: () async {
                final ok = await Navigator.of(context).push<bool>(
                  MaterialPageRoute(
                    builder: (_) => const VerificationEmailPage(email: 'a@b.c'),
                  ),
                );
                verifie = ok == true;
              },
              child: const Text('Ouvrir'),
            ),
          ),
        ),
      );
      await tester.tap(find.text('Ouvrir'));
      await tester.pumpAndSettle();
      expect(find.text('Vérifiez votre e-mail'), findsOneWidget);
      await tester.enterText(find.byType(TextField), '123456');
      await tester.tap(find.text('Vérifier'));
      await tester.pumpAndSettle();
      expect(verifie, isTrue);
      expect(api.isConnected, isTrue);
    });

    testWidgets('section 2FA : activation affiche le QR', (tester) async {
      final mock = MockClient((http.Request request) async {
        if (request.url.path == '/auth/double-authentification/activer') {
          return http.Response(
            jsonEncode({'otpauth_url': 'otpauth://totp/CP?secret=ABC'}),
            200,
          );
        }
        if (request.url.path == '/auth/double-authentification/confirmer') {
          return http.Response('{}', 200);
        }
        return http.Response('{}', 200);
      });
      api = ApiClient(client: mock);
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(body: SectionDoubleAuthentification()),
        ),
      );
      await tester.tap(find.text('Activer la double authentification'));
      await tester.pumpAndSettle();
      expect(find.byType(QrImageView), findsOneWidget);
      await tester.enterText(find.byType(TextField).first, '123456');
      await tester.tap(find.text('Confirmer l’activation'));
      await tester.pumpAndSettle();
      expect(find.text('Double authentification activée.'), findsOneWidget);
    });
  });

  group('H-4, WebSocket sans jeton en URL', () {
    test('le jeton part en premier message JSON, pas dans l’URL', () async {
      final serveur = await HttpServer.bind(InternetAddress.loopbackIPv4, 0);
      String? premierMessage;
      String? cheminDemande;
      serveur.listen((HttpRequest requete) async {
        cheminDemande = requete.uri.toString();
        final socket = await WebSocketTransformer.upgrade(requete);
        socket.listen((message) {
          premierMessage ??= message.toString();
        });
      });
      final client = ClientSignalisationAppels();
      addTearDown(() async {
        await client.deconnecter();
        await serveur.close(force: true);
      });
      await client.connecter(
        'ws://127.0.0.1:${serveur.port}/messagerie/ws',
        jeton: 'jeton-test',
      );
      await Future<void>.delayed(const Duration(milliseconds: 300));
      expect(cheminDemande, '/messagerie/ws');
      expect(cheminDemande, isNot(contains('jeton')));
      expect(premierMessage, '{"type":"auth","jeton":"jeton-test"}');
      expect(client.connecte, isTrue);
    });
  });
}
