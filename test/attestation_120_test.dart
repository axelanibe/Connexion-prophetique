// Carte 120, 9 nov. 2026 : attestations en vrai PDF, signature
// dans l'application et bouton Supprimer, côté application. Ces
// tests vérifient la carte seule, sans serveur : Supprimer
// apparaît côté administration, sur une attestation annulée
// comme sur une autre, Signer seulement sur une attestation non
// annulée, et ni l'un ni l'autre côté membre. La page de
// signature reprend la zone de dessin de Ma signature (carte
// 117) : un trait dessiné s'exporte en data URL PNG, prête pour
// le serveur. Les routes, le 409 si déjà annulée, le périmètre
// et la génération du PDF sont vérifiés côté serveur, dans
// server-production/tests/.
import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/admin_pages.dart';
import 'package:connexion_prophetique/signature_admin.dart';

/// Le chargement de la page appelle le serveur de production
/// pour la signature enregistrée. En test, le réseau est coupé
/// net : la demande échoue aussitôt, la page se replie sur la
/// copie locale, vide ici, et affiche la zone de dessin, sans
/// jamais attendre le délai de 45 secondes du client HTTP.
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

/// Pompe la page de signature jusqu'à ce que la zone de dessin
/// apparaisse, une fois le chargement terminé, ou échoue après
/// 30 pompes si la page reste sur son indicateur de chargement.
Future<void> _pomperPageSignature(WidgetTester tester) async {
  for (var i = 0; i < 30; i++) {
    await tester.pump(const Duration(milliseconds: 100));
    if (find.byType(ZoneSignature).evaluate().isNotEmpty) return;
  }
  fail('La zone de dessin ne s’est pas affichée après le chargement.');
}

Map<String, dynamic> attestation({String? annuleeLe}) => {
      'id': 'att-1',
      'type': 'benevolat',
      'membre_nom': 'Anibe Axel',
      'matricule': 'CP-AA-2526',
      'activite': 'Distribution de repas',
      'role_service': 'Service',
      'date_debut': '2026-11-01',
      'date_fin': '2026-11-02',
      'reference': 'ATT-2026-0001',
      'delivre_le': '2026-11-03',
      'annulee_le': annuleeLe,
    };

Future<void> pomperCarte(
  WidgetTester tester,
  Map<String, dynamic> a, {
  Future<void> Function()? onAnnuler,
  Future<void> Function()? onSigner,
  Future<void> Function()? onSupprimer,
  bool membre = false,
}) async {
  await tester.pumpWidget(
    MaterialApp(
      home: Scaffold(
        body: SingleChildScrollView(
          child: AttestationCarte(
            attestation: a,
            membre: membre,
            onTelecharger: () async {},
            onAnnuler: onAnnuler,
            onSigner: onSigner,
            onSupprimer: onSupprimer,
          ),
        ),
      ),
    ),
  );
  await tester.pumpAndSettle();
}

void main() {
  group('Carte 120, bouton Supprimer', () {
    testWidgets('il apparaît quand l’attestation n’est pas annulée et qu’onSupprimer est fourni', (tester) async {
      var appels = 0;
      await pomperCarte(tester, attestation(), onSupprimer: () async {
        appels++;
      });
      expect(find.text('Supprimer'), findsOneWidget);
      await tester.tap(find.text('Supprimer'));
      await tester.pumpAndSettle();
      expect(appels, 1);
    });

    testWidgets('il apparaît aussi sur une attestation déjà annulée', (tester) async {
      await pomperCarte(tester, attestation(annuleeLe: '2026-11-09T10:00:00Z'), onSupprimer: () async {});
      expect(find.text('Supprimer'), findsOneWidget);
      expect(find.text('Annuler'), findsNothing);
      expect(find.text('Signer'), findsNothing);
    });

    testWidgets('il n’apparaît pas sans onSupprimer, même non annulée', (tester) async {
      await pomperCarte(tester, attestation());
      expect(find.text('Supprimer'), findsNothing);
    });

    testWidgets('il n’apparaît pas côté membre', (tester) async {
      await pomperCarte(tester, attestation(), membre: true, onSupprimer: () async {});
      expect(find.text('Supprimer'), findsNothing);
    });
  });

  group('Carte 120, bouton Signer', () {
    testWidgets('il apparaît quand l’attestation n’est pas annulée et qu’onSigner est fourni', (tester) async {
      var appels = 0;
      await pomperCarte(tester, attestation(), onSigner: () async {
        appels++;
      });
      expect(find.text('Signer'), findsOneWidget);
      await tester.tap(find.text('Signer'));
      await tester.pumpAndSettle();
      expect(appels, 1);
    });

    testWidgets('il n’apparaît pas sur une attestation déjà annulée, même avec onSigner', (tester) async {
      await pomperCarte(tester, attestation(annuleeLe: '2026-11-09T10:00:00Z'), onSigner: () async {});
      expect(find.text('Signer'), findsNothing);
    });

    testWidgets('il n’apparaît pas sans onSigner, même non annulée', (tester) async {
      await pomperCarte(tester, attestation());
      expect(find.text('Signer'), findsNothing);
    });

    testWidgets('il n’apparaît pas côté membre', (tester) async {
      await pomperCarte(tester, attestation(), membre: true, onSigner: () async {});
      expect(find.text('Signer'), findsNothing);
    });

    testWidgets('Annuler, Signer et Supprimer sont ensemble sur une attestation non annulée', (tester) async {
      await pomperCarte(
        tester,
        attestation(),
        onAnnuler: () async {},
        onSigner: () async {},
        onSupprimer: () async {},
      );
      expect(find.text('Annuler'), findsOneWidget);
      expect(find.text('Signer'), findsOneWidget);
      expect(find.text('Supprimer'), findsOneWidget);
    });
  });

  group('Carte 120, page de signature', () {
    setUp(() {
      HttpOverrides.global = _HorsLigne();
      SharedPreferences.setMockInitialValues({});
    });

    tearDown(() {
      HttpOverrides.global = null;
    });

    testWidgets('elle affiche le titre, la zone de dessin et le bouton Signer', (tester) async {
      await tester.pumpWidget(
        MaterialApp(home: SignerAttestationPage(attestation: attestation())),
      );
      // La signature enregistrée se charge en arrière-plan, sans
      // jamais bloquer l'affichage : avec le réseau coupé, le
      // repli local est immédiat et la zone de dessin apparaît.
      await _pomperPageSignature(tester);
      expect(find.text('Signer cette attestation'), findsOneWidget);
      expect(find.byType(ZoneSignature), findsOneWidget);
      expect(find.text('Signer l’attestation'), findsOneWidget);
      expect(find.text('Dessinez votre signature ici pour signer cette attestation.'), findsOneWidget);
    });

    testWidgets('un trait dessiné dans la zone s’exporte en data URL PNG', (tester) async {
      final cle = GlobalKey<ZoneSignatureState>();
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: ZoneSignature(key: cle, onDessinEnCours: (_) {}),
          ),
        ),
      );
      await tester.pump();
      final centre = tester.getCenter(find.byType(ZoneSignature));
      final geste = await tester.startGesture(centre);
      await geste.moveBy(const Offset(0, 20));
      await geste.moveBy(const Offset(3, 20));
      await geste.moveBy(const Offset(-3, 20));
      await geste.moveBy(const Offset(0, 20));
      await geste.up();
      await tester.pump();
      expect(cle.currentState?.estVide, isFalse);
      final zone = cle.currentState!;
      // toImage passe par le moteur, en asynchrone réel : hors de
      // la fausse zone asynchrone des tests, sans runAsync, il
      // n'aboutit jamais (carte 117). Sur le téléphone, aucun
      // runAsync n'est nécessaire.
      final dataUrl = await tester.runAsync(() => zone.exporterDataUrl());
      expect(dataUrl, isNotNull);
      expect(dataUrl, startsWith('data:image/png;base64,'));
      final octets = base64Decode(dataUrl!.substring('data:image/png;base64,'.length));
      expect(octets.sublist(0, 8), [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
      expect(octets.length, lessThan(200 * 1024));
    });
  });
}
