// Carte 121, 10 nov. 2026 : le certificat d'adhésion
// s'affiche dans l'application, et le choix au toucher,
// télécharger ou recevoir par mail, vaut pour le certificat
// comme pour les attestations. Ces tests vérifient la page et
// le dialogue sans serveur : hors ligne, la page affiche
// l'erreur et propose d'actualiser ; le dialogue renvoie le
// bon choix, ou null quand la personne annule. L'affichage du
// PDF lui-même, visualiseur natif sur téléphone et cadre du
// navigateur sur le web, se vérifie sur l'appareil, pas ici.
// Les routes d'envoi par mail sont vérifiées côté serveur, dans
// server-production/tests/.
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/certificat_page.dart';

/// En test, le réseau est coupé net : la demande du certificat
/// échoue aussitôt, la page affiche son erreur, sans jamais
/// attendre le délai de 45 secondes du client HTTP.
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

void main() {
  setUp(() {
    HttpOverrides.global = _HorsLigne();
  });
  tearDown(() {
    HttpOverrides.global = null;
  });

  /// Pompe la page du certificat jusqu'à ce que l'erreur
  /// s'affiche, ou échoue après 30 pompes si la page reste sur
  /// son indicateur de chargement.
  Future<void> pomperErreur(WidgetTester tester) async {
    for (var i = 0; i < 30; i++) {
      await tester.pump(const Duration(milliseconds: 100));
      if (find.text('Impossible d’afficher le certificat.').evaluate().isNotEmpty) return;
    }
    fail('L’erreur ne s’est pas affichée après le chargement.');
  }

  testWidgets('carte 121 : hors ligne, Mon certificat affiche l’erreur et propose d’actualiser',
      (tester) async {
    await tester.pumpWidget(
      const MaterialApp(home: MonCertificatPage(matricule: 'CP-AA-2526')),
    );
    await pomperErreur(tester);
    expect(find.text('Mon certificat d’adhésion'), findsOneWidget);
    expect(find.text('Impossible d’afficher le certificat.'), findsOneWidget);
    expect(find.text('Actualiser'), findsOneWidget);
    expect(find.text('Télécharger ou recevoir par mail'), findsNothing);
    await tester.tap(find.text('Actualiser'));
    await pomperErreur(tester);
    expect(find.text('Impossible d’afficher le certificat.'), findsOneWidget);
  });

  testWidgets('carte 121 : le choix propose télécharger ou recevoir par mail',
      (tester) async {
    ChoixDocument? choix;
    await tester.pumpWidget(MaterialApp(
      home: Scaffold(
        body: Builder(
          builder: (context) => FilledButton(
            onPressed: () async {
              choix = await choisirDocumentAction(context);
            },
            child: const Text('Ouvrir'),
          ),
        ),
      ),
    ));
    await tester.tap(find.text('Ouvrir'));
    await tester.pumpAndSettle();
    expect(find.text('Télécharger ou recevoir par mail'), findsOneWidget);
    expect(find.text('Télécharger'), findsOneWidget);
    expect(find.text('Recevoir par mail'), findsOneWidget);
    expect(find.text('Annuler'), findsOneWidget);
    await tester.tap(find.text('Recevoir par mail'));
    await tester.pumpAndSettle();
    expect(choix, ChoixDocument.recevoirParMail);
  });

  testWidgets('carte 121 : le choix Télécharger renvoie télécharger', (tester) async {
    ChoixDocument? choix;
    await tester.pumpWidget(MaterialApp(
      home: Scaffold(
        body: Builder(
          builder: (context) => FilledButton(
            onPressed: () async {
              choix = await choisirDocumentAction(context);
            },
            child: const Text('Ouvrir'),
          ),
        ),
      ),
    ));
    await tester.tap(find.text('Ouvrir'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Télécharger'));
    await tester.pumpAndSettle();
    expect(choix, ChoixDocument.telecharger);
  });

  testWidgets('carte 121 : annuler le choix ne renvoie rien', (tester) async {
    ChoixDocument? choix = ChoixDocument.telecharger;
    await tester.pumpWidget(MaterialApp(
      home: Scaffold(
        body: Builder(
          builder: (context) => FilledButton(
            onPressed: () async {
              choix = await choisirDocumentAction(context);
            },
            child: const Text('Ouvrir'),
          ),
        ),
      ),
    ));
    await tester.tap(find.text('Ouvrir'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Annuler'));
    await tester.pumpAndSettle();
    expect(choix, isNull);
  });
}
