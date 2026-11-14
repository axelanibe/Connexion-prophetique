// Carte 100, 8 nov. 2026 : la notification du verset s'affiche
// mais ne sonne pas. Sur Android, un canal déjà créé ne se met
// jamais à jour, donc le canal verset_du_jour_7h, créé sans son
// par la carte 72, reste silencieux même si la carte 94 demande
// ensuite le son. Le correctif est un nouveau canal, avec son,
// et la suppression de l'ancien au démarrage, une seule fois.
// Ces tests vérifient les identifiants des nouveaux canaux et la
// liste des anciens à supprimer, sans téléphone, sans canal réel.
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/notifications.dart';

void main() {
  group('Carte 100, nouveaux canaux avec son', () {
    test('le canal du verset porte le son, ancien identifiant plus _son', () {
      expect(DailyVerseNotifications.canalVerset, 'verset_du_jour_7h_son');
    });

    test('les autres canaux portent le son, ancien identifiant plus _son', () {
      expect(DailyVerseNotifications.canalAnniversaire, 'anniversaire_son');
      expect(DailyVerseNotifications.canalCotisation, 'cotisation_son');
      expect(DailyVerseNotifications.canalPriere, 'priere_matin_6h30_son');
      expect(DailyVerseNotifications.canalBible, 'bible_non_lue_20h_son');
    });

    test('les cinq nouveaux canaux sont distincts', () {
      final canaux = <String>{
        DailyVerseNotifications.canalVerset,
        DailyVerseNotifications.canalAnniversaire,
        DailyVerseNotifications.canalCotisation,
        DailyVerseNotifications.canalPriere,
        DailyVerseNotifications.canalBible,
      };
      expect(canaux.length, 5);
    });

    test('chaque nouveau canal finit par _son, l’ancien ne le fait pas', () {
      for (final canal in <String>[
        DailyVerseNotifications.canalVerset,
        DailyVerseNotifications.canalAnniversaire,
        DailyVerseNotifications.canalCotisation,
        DailyVerseNotifications.canalPriere,
        DailyVerseNotifications.canalBible,
      ]) {
        expect(canal.endsWith('_son'), isTrue);
      }
      for (final ancien in DailyVerseNotifications.anciensCanauxSilencieux) {
        expect(ancien.endsWith('_son'), isFalse);
      }
    });
  });

  group('Carte 100, anciens canaux silencieux à supprimer', () {
    test('les cinq anciens canaux sont listés, sans oubli', () {
      expect(
        DailyVerseNotifications.anciensCanauxSilencieux,
        <String>[
          'verset_du_jour_7h',
          'anniversaire',
          'cotisation',
          'priere_matin_6h30',
          'bible_non_lue_20h',
        ],
      );
    });

    test('aucun ancien canal n’est aussi un nouveau canal', () {
      final nouveaux = <String>{
        DailyVerseNotifications.canalVerset,
        DailyVerseNotifications.canalAnniversaire,
        DailyVerseNotifications.canalCotisation,
        DailyVerseNotifications.canalPriere,
        DailyVerseNotifications.canalBible,
      };
      for (final ancien in DailyVerseNotifications.anciensCanauxSilencieux) {
        expect(nouveaux.contains(ancien), isFalse);
      }
    });

    test('chaque ancien canal a son nouveau canal, ancien plus _son', () {
      for (final ancien in DailyVerseNotifications.anciensCanauxSilencieux) {
        final nouveau = '${ancien}_son';
        expect(
          <String>{
            DailyVerseNotifications.canalVerset,
            DailyVerseNotifications.canalAnniversaire,
            DailyVerseNotifications.canalCotisation,
            DailyVerseNotifications.canalPriere,
            DailyVerseNotifications.canalBible,
          }.contains(nouveau),
          isTrue,
        );
      }
    });
  });
}
