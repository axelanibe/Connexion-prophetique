// Carte 105, 9 nov. 2026 : son de notification propre, carillon
// doux, arpège de mi mineur, 4,5 secondes, approuvé par Axel
// (« C'est bon »). Un seul nouveau canal, verset_du_jour_7h_carillon,
// avec ce son, pour le verset de 7 h et tous les rappels. Sur
// Android, un canal déjà créé ne se met jamais à jour, donc les
// cinq canaux _son de la carte 100 sont supprimés au démarrage,
// une seule fois. Ces tests vérifient le canal, le son des deux
// côtés et la liste des anciens canaux à supprimer, sans téléphone,
// sans canal réel : la preuve audible viendra du test sur le
// téléphone d'Axel, avec la nouvelle APK, application fermée.
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/notifications.dart';

void main() {
  group('Carte 105, canal carillon', () {
    test('le canal unique est verset_du_jour_7h_carillon', () {
      expect(DailyVerseNotifications.canalCarillon, 'verset_du_jour_7h_carillon');
    });

    test('le son Android est la ressource sans extension', () {
      expect(DailyVerseNotifications.sonCarillonAndroid, 'son_notification_cp');
    });

    test('le son iOS est le WAV du bundle Runner', () {
      expect(DailyVerseNotifications.sonCarillonIos, 'son_notification_cp.wav');
    });

    test('les détails partagés portent le canal carillon, avec son', () {
      final android = DailyVerseNotifications.detailsCarillon.android;
      expect(android, isNotNull);
      expect(android!.channelId, 'verset_du_jour_7h_carillon');
      expect(android.playSound, isTrue);
      expect(android.enableVibration, isTrue);
      final sound = android.sound;
      expect(sound, isA<RawResourceAndroidNotificationSound>());
      expect(
        (sound as RawResourceAndroidNotificationSound).sound,
        'son_notification_cp',
      );
    });

    test('les détails partagés nomment le WAV sur iOS, avec son', () {
      final ios = DailyVerseNotifications.detailsCarillon.iOS;
      expect(ios, isNotNull);
      expect(ios!.presentSound, isTrue);
      expect(ios.sound, 'son_notification_cp.wav');
    });
  });

  group('Carte 105, anciens canaux _son à supprimer', () {
    test('les cinq anciens canaux _son sont listés, sans oubli', () {
      expect(
        DailyVerseNotifications.anciensCanauxSon,
        <String>[
          'verset_du_jour_7h_son',
          'anniversaire_son',
          'cotisation_son',
          'priere_matin_6h30_son',
          'bible_non_lue_20h_son',
        ],
      );
    });

    test('le canal carillon n’est dans aucune liste d’anciens canaux', () {
      expect(
        DailyVerseNotifications.anciensCanauxSon.contains(
          DailyVerseNotifications.canalCarillon,
        ),
        isFalse,
      );
      expect(
        DailyVerseNotifications.anciensCanauxSilencieux.contains(
          DailyVerseNotifications.canalCarillon,
        ),
        isFalse,
      );
    });

    test('aucun ancien canal _son n’est le canal carillon', () {
      for (final ancien in DailyVerseNotifications.anciensCanauxSon) {
        expect(ancien, isNot('verset_du_jour_7h_carillon'));
      }
    });

    test('les anciens canaux silencieux de la carte 100 sont inchangés', () {
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
  });
}
