// Carte 94, 8 nov. 2026 : le verset de 7 h doit partir à 7 h
// heure locale du téléphone, jamais à un 7 h déjà passé, et
// jamais à 7 h UTC. Ces tests vérifient le calcul du prochain
// 7 h et la conversion fuseau local, sans téléphone, sans
// permission et sans programmation réelle.
import 'package:flutter_test/flutter_test.dart';
import 'package:timezone/data/latest_all.dart' as tzdata;
import 'package:timezone/timezone.dart' as tz;

import 'package:connexion_prophetique/notifications.dart';

void main() {
  test('prochain 7 h : le jour même avant 7 h', () {
    expect(
      DailyVerseNotifications.prochain7h(DateTime(2026, 11, 8, 6, 0)),
      DateTime(2026, 11, 8, 7, 0),
    );
  });

  test('prochain 7 h : le lendemain après 7 h', () {
    expect(
      DailyVerseNotifications.prochain7h(DateTime(2026, 11, 8, 8, 0)),
      DateTime(2026, 11, 9, 7, 0),
    );
  });

  test('prochain 7 h : le lendemain à 7 h pile, jamais le jour même passé', () {
    expect(
      DailyVerseNotifications.prochain7h(DateTime(2026, 11, 8, 7, 0)),
      DateTime(2026, 11, 9, 7, 0),
    );
  });

  test('prochain 7 h : minuit, le jour même', () {
    expect(
      DailyVerseNotifications.prochain7h(DateTime(2026, 11, 8, 0, 0)),
      DateTime(2026, 11, 8, 7, 0),
    );
  });

  test('fuseau local Toronto : 7 h locale vaut 12 h UTC en novembre, 11 h UTC en juillet', () {
    tzdata.initializeTimeZones();
    tz.setLocalLocation(tz.getLocation('America/Toronto'));
    // Le constructeur positionnel lit les champs comme une heure
    // murale dans le fuseau, comme _tzAt, quelle que soit la zone
    // de la machine qui lance le test. TZDateTime.from, lui,
    // garderait l'instant et ne conviendrait pas ici.
    // 8 nov. 2026, heure d'hiver, UTC-5.
    final hiver = tz.TZDateTime(tz.local, 2026, 11, 8, 7, 0);
    expect(hiver.timeZoneName, 'EST');
    expect(hiver.toUtc(), DateTime.utc(2026, 11, 8, 12, 0));
    // 8 juillet 2026, heure d'été, UTC-4.
    final ete = tz.TZDateTime(tz.local, 2026, 7, 8, 7, 0);
    expect(ete.timeZoneName, 'EDT');
    expect(ete.toUtc(), DateTime.utc(2026, 7, 8, 11, 0));
  });

  test('fuseau local Abidjan : 7 h locale vaut 7 h UTC, sans changement d heure', () {
    tzdata.initializeTimeZones();
    tz.setLocalLocation(tz.getLocation('Africa/Abidjan'));
    final jour = tz.TZDateTime(tz.local, 2026, 11, 8, 7, 0);
    expect(jour.toUtc(), DateTime.utc(2026, 11, 8, 7, 0));
  });
}
