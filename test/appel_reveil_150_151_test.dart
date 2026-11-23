// Cartes 150 et 151, 22 nov. 2026 : autorisation plein écran et
// réveil en arrière-plan. Faux adaptateur et faux flux, aucun
// canal système, aucun réseau réel, aucun serveur.
import 'dart:async';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/push_notifications.dart';
import 'package:connexion_prophetique/reprise_reseau.dart';

void main() {
  group('Carte 150, adaptateur plein écran', () {
    test('délègue aux fonctions injectées', () async {
      var appeleDisponible = false;
      var appeleDemander = false;
      final adaptateur = PleinEcranAppel(
        disponible: () async {
          appeleDisponible = true;
          return false;
        },
        demander: () async {
          appeleDemander = true;
          return true;
        },
      );
      expect(await adaptateur.disponible(), isFalse);
      expect(appeleDisponible, isTrue);
      expect(await adaptateur.demander(), isTrue);
      expect(appeleDemander, isTrue);
    });

    testWidgets('invite quand l’autorisation manque, pas quand elle est accordée',
        (tester) async {
      // Remise en place AVANT la fin du test : le cadre refuse
      // qu'une variable de débogage reste changée, un addTearDown
      // arrive trop tard pour ce contrôle, voir
      // connexion_auto_test.dart.
      debugDefaultTargetPlatformOverride = TargetPlatform.android;
      try {
        var disponibleValeur = false;
        var demandes = 0;
        final faux = PleinEcranAppel(
          disponible: () async => disponibleValeur,
          demander: () async {
            demandes++;
            disponibleValeur = true;
            return true;
          },
        );

        await tester.pumpWidget(
          MaterialApp(
            home: Scaffold(body: CarteAppelPleinEcran(adaptateur: faux)),
          ),
        );
        await tester.pumpAndSettle();

        // Autorisation absente : l'invite s'affiche, avec le bouton.
        expect(find.textContaining('plein écran'), findsOneWidget);
        expect(find.text('À activer'), findsOneWidget);
        expect(find.text('Autoriser'), findsOneWidget);

        await tester.tap(find.text('Autoriser'));
        await tester.pumpAndSettle();

        // Après la demande : une seule demande, état activé, plus de bouton.
        expect(demandes, 1);
        expect(find.text('Autoriser'), findsNothing);
        expect(find.text('À activer'), findsNothing);
        expect(find.text('Activé'), findsWidgets);
      } finally {
        debugDefaultTargetPlatformOverride = null;
      }
    });

    testWidgets('pas d’invite quand l’autorisation est déjà accordée',
        (tester) async {
      debugDefaultTargetPlatformOverride = TargetPlatform.android;
      try {
        final faux = PleinEcranAppel(
          disponible: () async => true,
          demander: () async => true,
        );
        await tester.pumpWidget(
          MaterialApp(
            home: Scaffold(body: CarteAppelPleinEcran(adaptateur: faux)),
          ),
        );
        await tester.pumpAndSettle();

        expect(find.text('Autoriser'), findsNothing);
        expect(find.text('À activer'), findsNothing);
        expect(find.text('Activé'), findsWidgets);
      } finally {
        debugDefaultTargetPlatformOverride = null;
      }
    });
  });

  group('Carte 151, exemption batterie', () {
    test('demandée une seule fois, jamais si accordée', () {
      expect(
        doitDemanderExemptionBatterie(
          dejaDemandee: false,
          exemptionAccordee: false,
        ),
        isTrue,
      );
      expect(
        doitDemanderExemptionBatterie(
          dejaDemandee: true,
          exemptionAccordee: false,
        ),
        isFalse,
      );
      expect(
        doitDemanderExemptionBatterie(
          dejaDemandee: false,
          exemptionAccordee: true,
        ),
        isFalse,
      );
      expect(
        doitDemanderExemptionBatterie(
          dejaDemandee: true,
          exemptionAccordee: true,
        ),
        isFalse,
      );
    });
  });

  group('Carte 151, surveillant réseau', () {
    Future<void> tour() =>
        Future<void>.delayed(const Duration(milliseconds: 5));

    test('reprise seulement sur coupure puis retour', () async {
      final controleur = StreamController<List<ConnectivityResult>>();
      var reprises = 0;
      final surveillant = SurveillantReseau(
        flux: controleur.stream,
        auRetour: () async {
          reprises++;
        },
      );
      surveillant.demarrer();

      // Premier événement connecté : pas de reprise, l'application
      // est connectée au démarrage.
      controleur.add([ConnectivityResult.wifi]);
      await tour();
      expect(reprises, 0);

      // Coupure puis retour : une seule reprise.
      controleur.add([ConnectivityResult.none]);
      await tour();
      expect(reprises, 0);
      controleur.add([ConnectivityResult.mobile]);
      await tour();
      expect(reprises, 1);

      // Connecté puis connecté : pas de reprise.
      controleur.add([ConnectivityResult.wifi]);
      await tour();
      expect(reprises, 1);

      // Coupure sans retour : pas de reprise.
      controleur.add([ConnectivityResult.none]);
      await tour();
      expect(reprises, 1);

      // Après l'arrêt : plus aucune reprise.
      await surveillant.arreter();
      controleur.add([ConnectivityResult.wifi]);
      await tour();
      expect(reprises, 1);

      await controleur.close();
    });

    test('pas de reprise sur une liste vide ou sans réseau', () async {
      final controleur = StreamController<List<ConnectivityResult>>();
      var reprises = 0;
      final surveillant = SurveillantReseau(
        flux: controleur.stream,
        auRetour: () async {
          reprises++;
        },
      );
      surveillant.demarrer();

      controleur.add([ConnectivityResult.none]);
      await tour();
      controleur.add([]);
      await tour();
      expect(reprises, 0);

      await surveillant.arreter();
      await controleur.close();
    });
  });
}
