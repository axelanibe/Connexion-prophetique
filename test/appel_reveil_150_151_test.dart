// Cartes 150 et 151, 22 nov. 2026 : adaptateur plein écran,
// règle de demande unique de l'exemption batterie, et réveil en
// arrière-plan. Faux adaptateur et faux flux, aucun canal
// système, aucun réseau réel, aucun serveur.
// Carte 164, 23 nov. 2026 : la carte de bienvenue plein écran
// est retirée, les tests du widget sont retirés avec elle.
// L'adaptateur reste, pour le diagnostic et le repli.
import 'dart:async';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter_test/flutter_test.dart';

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
