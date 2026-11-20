// Sauvegarde de l'application comme WhatsApp, 20 nov. 2026 :
// chiffrement, manifeste, échéance, mot de passe et doré de
// la page Sauvegarde.
import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:google_fonts/src/google_fonts_base.dart' as polices;
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/meditation_journal.dart';
import 'package:connexion_prophetique/sauvegarde_app.dart';
import 'package:connexion_prophetique/sauvegarde_page.dart';

void main() {
  setUp(() {
    SharedPreferences.setMockInitialValues({});
    app.member = null;
  });

  tearDown(() {
    app.member = null;
  });

  const selFixe = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const autreSel = [16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const motDePasse = 'priere-2026';
  final clair = utf8.encode('Journal secret, ne pas lire.');

  group('ChiffrementSauvegarde', () {
    test('aller retour : le déchiffrement rend le clair exact', () {
      final chiffre = ChiffrementSauvegarde.chiffrer(clair, motDePasse, selFixe);
      expect(chiffre.length, clair.length + 16 + 12 + 16);
      expect(chiffre.sublist(0, 16), selFixe);
      final rendu = ChiffrementSauvegarde.dechiffrer(chiffre, motDePasse);
      expect(rendu, clair);
    });

    test('mauvais mot de passe : null, sans exception', () {
      final chiffre = ChiffrementSauvegarde.chiffrer(clair, motDePasse, selFixe);
      expect(ChiffrementSauvegarde.dechiffrer(chiffre, 'mauvais-mdp'), isNull);
    });

    test('octets modifiés : null, sans exception', () {
      final chiffre = ChiffrementSauvegarde.chiffrer(clair, motDePasse, selFixe);
      final modifie = Uint8List.fromList(chiffre);
      modifie[30] ^= 0xFF;
      expect(ChiffrementSauvegarde.dechiffrer(modifie, motDePasse), isNull);
      final tagModifie = Uint8List.fromList(chiffre);
      tagModifie[tagModifie.length - 1] ^= 0xFF;
      expect(ChiffrementSauvegarde.dechiffrer(tagModifie, motDePasse), isNull);
      expect(ChiffrementSauvegarde.dechiffrer([1, 2, 3], motDePasse), isNull);
    });

    test('deux chiffrements du même clair diffèrent', () {
      final a = ChiffrementSauvegarde.chiffrer(clair, motDePasse, selFixe);
      final b = ChiffrementSauvegarde.chiffrer(clair, motDePasse, selFixe);
      expect(a, isNot(equals(b)));
      expect(ChiffrementSauvegarde.dechiffrer(a, motDePasse), clair);
      expect(ChiffrementSauvegarde.dechiffrer(b, motDePasse), clair);
    });

    test('PBKDF2 déterministe avec le même sel, différent avec un autre sel', () {
      final a = ChiffrementSauvegarde.deriverCle(motDePasse, selFixe);
      final b = ChiffrementSauvegarde.deriverCle(motDePasse, selFixe);
      expect(a, equals(b));
      expect(a.length, 32);
      final c = ChiffrementSauvegarde.deriverCle(motDePasse, autreSel);
      expect(c, isNot(equals(a)));
    });
  });

  group('Manifeste', () {
    Map<String, dynamic> manifesteTest() {
      final journalJson = SpiritualJournalStore().exportJson();
      return construireManifeste(
        journalJson: journalJson,
        langue: 'fr',
        niveauTexte: 1,
        enregistrements: [
          {
            'id': 'abc123',
            'nom': 'Prière du matin',
            'mime': 'audio/mp4',
            'dureeMs': 45000,
            'creeLe': '2026-11-20T07:00:00.000',
            'donnees': base64Encode([0, 1, 2, 3]),
          },
        ],
      );
    }

    test('construit puis relu avec le même contenu', () {
      final relu = lireManifeste(jsonEncode(manifesteTest()));
      expect(relu['app'], 'CONNEXION PROPHETIQUE');
      expect(relu['type'], 'sauvegarde-app');
      expect(relu['version'], 1);
      expect(relu['langue'], 'fr');
      expect(relu['taille_texte'], 1);
      expect((relu['journal'] as Map)['type'], 'journal-spirituel');
      final enrs = relu['enregistrements'] as List;
      expect(enrs.length, 1);
      expect(enrs.first['id'], 'abc123');
      expect(enrs.first['nom'], 'Prière du matin');
      expect(enrs.first['dureeMs'], 45000);
      expect(base64Decode(enrs.first['donnees'] as String), [0, 1, 2, 3]);
    });

    test('mauvaise version rejetée', () {
      final mauvais = manifesteTest()..['version'] = 2;
      expect(() => lireManifeste(jsonEncode(mauvais)), throwsFormatException);
      final mauvaiseApp = manifesteTest()..['app'] = 'Autre';
      expect(() => lireManifeste(jsonEncode(mauvaiseApp)), throwsFormatException);
      final mauvaisType = manifesteTest()..['type'] = 'journal-spirituel';
      expect(() => lireManifeste(jsonEncode(mauvaisType)), throwsFormatException);
    });
  });

  group('sauvegardeDue', () {
    test('null, 23 heures et 25 heures', () {
      final maintenant = DateTime(2026, 11, 20, 12);
      expect(sauvegardeDue(null, maintenant: maintenant), isTrue);
      expect(
        sauvegardeDue(maintenant.subtract(const Duration(hours: 23)), maintenant: maintenant),
        isFalse,
      );
      expect(
        sauvegardeDue(maintenant.subtract(const Duration(hours: 25)), maintenant: maintenant),
        isTrue,
      );
      expect(
        sauvegardeDue(maintenant.subtract(const Duration(hours: 24)), maintenant: maintenant),
        isTrue,
      );
    });
  });

  group('SauvegardeApp, mot de passe', () {
    test('moins de 8 caractères refusé, 8 caractères accepté, clé présente', () async {
      final svc = SauvegardeApp();
      expect(await svc.aUneCle(), isFalse);
      expect(await svc.definirMotDePasse('court'), isFalse);
      expect(await svc.aUneCle(), isFalse);
      expect(await svc.definirMotDePasse('huit-car'), isTrue);
      expect(await svc.aUneCle(), isTrue);
    });
  });

  group('SauvegardePage', () {
    testWidgets('doré : compte, mot de passe, dernière sauvegarde et boutons', (tester) async {
      // La police Playfair de l'en-tête arrive par google_fonts,
      // qui la télécharge avec un client HTTP créé à l'import,
      // avant le faux client 400 du binding : le vrai client
      // échoue tardivement sur le proxy, après la fin du test.
      // On donne donc à google_fonts les vrais octets de la
      // police, par un faux client qui répond 200 tout de suite,
      // et un faux canal path_provider, sinon sa lecture du
      // système de fichiers reste bloquée. On précharge aussi
      // la police, pour que le titre rende en Playfair dès le
      // premier pompage, et que le doré soit stable. La police
      // vient de fonts.gstatic.com, licence OFL, c'est le
      // fichier exact demandé par google_fonts, longueur et
      // empreinte vérifiées par le paquet lui-même.
      final dossier = Directory.systemTemp.createTempSync('police_');
      addTearDown(() => dossier.deleteSync(recursive: true));
      TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
          .setMockMethodCallHandler(
        const MethodChannel('plugins.flutter.io/path_provider'),
        (appel) async {
          if (appel.method == 'getApplicationSupportPath') {
            return dossier.path;
          }
          return null;
        },
      );
      final octetsPolice = (await tester.runAsync(
        () => File('test/fixtures/PlayfairDisplay-Bold.ttf').readAsBytes(),
      ))!;
      final clientAvant = polices.httpClient;
      addTearDown(() => polices.httpClient = clientAvant);
      polices.httpClient = MockClient(
        (_) async => http.Response.bytes(octetsPolice, 200),
      );
      final chargeur = FontLoader('PlayfairDisplay_700')
        ..addFont(Future.value(ByteData.view(octetsPolice.buffer)));
      await chargeur.load();
      await _pomperSauvegarde(tester);
      expect(find.text('Sauvegarde'), findsWidgets);
      expect(find.text('Compte Google'), findsOneWidget);
      expect(find.text('Aucun compte lié'), findsOneWidget);
      expect(find.text('Lier mon compte Google'), findsOneWidget);
      expect(find.text('Mot de passe de sauvegarde'), findsOneWidget);
      expect(find.text('Définir le mot de passe'), findsOneWidget);
      expect(find.text('Dernière sauvegarde'), findsOneWidget);
      expect(find.text('Aucune sauvegarde'), findsOneWidget);
      expect(find.text('Sauvegarder maintenant'), findsOneWidget);
      await expectLater(
        find.byType(SauvegardePage),
        matchesGoldenFile('goldens/sauvegarde_app.png'),
      );
      await tester.pumpAndSettle(const Duration(seconds: 2));
      tester.takeException();
    });
  });
}

Future<void> _pomperSauvegarde(WidgetTester tester) async {
  tester.view.physicalSize = const Size(390, 844);
  tester.view.devicePixelRatio = 1.0;
  addTearDown(tester.view.resetPhysicalSize);
  addTearDown(tester.view.resetDevicePixelRatio);
  await tester.pumpWidget(
    MaterialApp(home: SauvegardePage()),
  );
  await tester.pumpAndSettle(const Duration(seconds: 2));
}
