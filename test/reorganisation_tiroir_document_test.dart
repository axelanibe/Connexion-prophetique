// Carte Document du Profil, 19 nov. 2026, réorganisation du
// tiroir. Fichier à part : un seul chargement différé aboutit
// par fichier de test, la carte Document charge la bibliothèque
// d'administration, elle ne peut pas partager le fichier avec
// la carte Démarche (emploi) ni la carte Engagement (membre).
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/main.dart';

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
/// 40 pas au plus : le spinner de chargement différé tourne sans
/// fin, pumpAndSettle ne revient jamais tant que la page charge.
Future<void> _attendre(WidgetTester tester, Finder cible) async {
  for (var i = 0; i < 40; i++) {
    await tester.pump(const Duration(milliseconds: 100));
    if (cible.evaluate().isNotEmpty) return;
  }
  fail('Cible introuvable après le chargement : $cible');
}

void main() {
  HttpOverrides.global = _HorsLigne();

  testWidgets('390 px : Document ouvre Mes attestations', (tester) async {
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
    await tester.tap(find.text('Document'));
    const intro = 'Ces attestations ont été délivrées par la structure, elles ne se créent pas ici. Seules vos propres attestations sont affichées.';
    await _attendre(tester, find.text(intro));
    expect(find.text(intro), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}
