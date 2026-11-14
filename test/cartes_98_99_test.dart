// Cartes 98 et 99, 8 nov. 2026 : la permission de notification
// n'est demandée qu'une seule fois, à l'installation, et la
// présentation de première installation ne s'active que sur APK.
// Ces tests vérifient les deux décisions pures, sans téléphone,
// sans permission et sans navigation réelle.
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/notifications.dart';

void main() {
  group('Carte 98, une seule demande de notification', () {
    test('demande jamais faite : une nouvelle demande est autorisée', () {
      expect(
        DailyVerseNotifications.instance.nouvelleDemandeNotificationAutorisee(demandeFaite: false),
        isTrue,
      );
    });

    test('demande déjà faite à la bienvenue : plus jamais de demande', () {
      expect(
        DailyVerseNotifications.instance.nouvelleDemandeNotificationAutorisee(demandeFaite: true),
        isFalse,
      );
    });

    test('refus à l’installation : la demande reste faite, pas de seconde chance', () {
      // Le drapeau est posé à la fin de la bienvenue, qu'on ait
      // autorisé ou passé sans autoriser : refuser ne rouvre
      // aucune demande, ni au démarrage, ni par un interrupteur.
      expect(
        DailyVerseNotifications.instance.nouvelleDemandeNotificationAutorisee(demandeFaite: true),
        isFalse,
      );
    });
  });

  group('Carte 99, présentation APK seulement', () {
    test('APK, jamais vue : la présentation s’active', () {
      expect(presentationActive(isWeb: false, dejaVue: false), isTrue);
    });

    test('web, jamais vue : la présentation ne s’active pas', () {
      expect(presentationActive(isWeb: true, dejaVue: false), isFalse);
    });

    test('APK, déjà vue : la présentation ne se relance pas', () {
      expect(presentationActive(isWeb: false, dejaVue: true), isFalse);
    });

    test('web, déjà vue : la présentation ne s’active pas', () {
      expect(presentationActive(isWeb: true, dejaVue: true), isFalse);
    });

    test('7 étapes, dans l’ordre, interface par interface', () {
      expect(kPresentation99Titres, ['Accueil', 'Bible', 'Librairie', 'Structure', 'Carte de membre', 'Plus', 'Donner']);
      expect(kPresentation99Onglets, [0, 1, 2, 3, 4, 5, -1]);
      expect(kPresentation99Titres.length, 7);
      expect(kPresentation99Onglets.length, 7);
    });

    test('Donner est une page hors onglets, aucun onglet en or', () {
      expect(kPresentation99Onglets.last, -1);
      expect(kPresentation99Titres.last, 'Donner');
    });

    test('chaque étape a son onglet, Accueil en premier', () {
      expect(kPresentation99Onglets.first, 0);
      expect(kPresentation99Titres.first, 'Accueil');
    });
  });
}
