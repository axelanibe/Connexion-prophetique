// Verset du jour en notification quotidienne, 27 oct. 2026.
//
// Comme les applications de Bible courantes, l'application envoie
// chaque matin à 7 h le texte du verset du jour, avec sa référence.
// Le verset est celui du jour calendaire (dailyVerse, par date),
// pas la rotation d'ouverture de l'accueil, pour que le texte du
// jour soit le même pour tous les membres ce jour-là.
//
// Limite honnête, dite dans l'application : une notification
// programmée porte un texte figé au moment de la programmation.
// L'application programme donc les 7 prochains jours à chaque
// ouverture, et reprogramme à chaque ouverture, pour que les textes
// restent frais. Si l'application n'est pas ouverte pendant plus de
// 7 jours, les notifications s'arrêtent jusqu'à la prochaine ouverture.
// Aucun service en arrière-plan permanent n'est ajouté dans cette
// version, pour ne pas alourdir l'application ni la batterie.
//
// Sur Android 13 et plus, la permission de notification est demandée
// au moment où l'utilisateur active l'option, jamais en silence.
// Si elle est refusée, l'option s'éteint et l'application explique
// d'aller l'activer dans les paramètres du téléphone.
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:timezone/data/latest_all.dart' as tzdata;
import 'package:timezone/timezone.dart' as tz;

import 'bible.dart';

class DailyVerseNotifications {
  DailyVerseNotifications._();
  static final instance = DailyVerseNotifications._();

  final _plugin = FlutterLocalNotificationsPlugin();
  bool _ready = false;

  Future<void> init() async {
    if (_ready) return;
    tzdata.initializeTimeZones();
    const android = AndroidInitializationSettings('@mipmap/ic_launcher');
    const settings = InitializationSettings(android: android);
    await _plugin.initialize(settings);
    _ready = true;
  }

  Future<bool> permissionGranted() async {
    try {
      final android = _plugin.resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();
      if (android == null) return false;
      final granted = await android.areNotificationsEnabled();
      return granted ?? false;
    } catch (_) {
      return false;
    }
  }

  Future<bool> requestPermission() async {
    try {
      final android = _plugin.resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();
      if (android == null) return false;
      final granted = await android.requestNotificationsPermission();
      return granted ?? false;
    } catch (_) {
      return false;
    }
  }

  /// Programme les 7 prochains matins à 7 h, chaque jour avec son
  /// propre verset du jour. Les anciennes programmations sont
  /// annulées d'abord, pour ne jamais envoyer deux fois le même jour.
  Future<bool> scheduleWeek(String lang) async {
    try {
      await init();
      if (!await permissionGranted()) return false;
      await BibleService.instance.load();
      if (!BibleService.instance.loaded) return false;
      await _plugin.cancelAll();
      final now = DateTime.now();
      var day = DateTime(now.year, now.month, now.day, 7);
      if (!day.isAfter(now)) day = day.add(const Duration(days: 1));
      const details = NotificationDetails(
        android: AndroidNotificationDetails(
          'verset_du_jour',
          'Verset du jour',
          channelDescription: 'Verset biblique chaque matin',
          importance: Importance.defaultImportance,
          priority: Priority.defaultPriority,
        ),
      );
      for (var i = 0; i < 7; i++) {
        final date = day.add(Duration(days: i));
        final ref = BibleService.instance.dailyVerse(lang, date: date);
        final label = BibleService.instance.label(lang, ref.book, ref.chapter, ref.verse);
        await _plugin.zonedSchedule(
          1000 + i,
          lang == 'en' ? 'Verse of the day' : 'Verset du jour',
          '« ${ref.text} » — $label',
          tz.TZDateTime.from(date, tz.local),
          details,
          androidScheduleMode: AndroidScheduleMode.inexactAllowWhileIdle,
        );
      }
      return true;
    } catch (_) {
      return false;
    }
  }

  // Minuteur de prière, 27 oct. 2026 : quand le minuteur se
  // termine, le téléphone doit sonner comme les applications de
  // téléphone, pas seulement afficher un petit message. La
  // notification programmée à la fin du minuteur porte le son par
  // défaut du téléphone, avec importance et vibration hautes, et
  // elle se déclenche même si l'utilisateur a quitté la page, tant
  // que l'application n'est pas complètement fermée par le système.
  // Identifiant 2000, distinct des versets du jour (1000 et plus),
  // pour pouvoir l'annuler seul en cas de pause ou de remise à zéro.
  static const int _timerNotifId = 2000;

  NotificationDetails _timerDetails() => const NotificationDetails(
        android: AndroidNotificationDetails(
          'minuteur_priere',
          'Minuteur de prière',
          channelDescription: 'Sonnerie de fin du minuteur de prière',
          importance: Importance.max,
          priority: Priority.high,
          playSound: true,
          enableVibration: true,
        ),
      );

  Future<void> schedulePrayerTimerEnd(String lang, Duration inDuration) async {
    try {
      await init();
      if (!await permissionGranted()) {
        if (!await requestPermission()) return;
      }
      final at = DateTime.now().add(inDuration);
      await _plugin.zonedSchedule(
        _timerNotifId,
        lang == 'en' ? 'Congratulations, your goal has been reached.' : 'Félicitations, votre objectif a été atteint.',
        lang == 'en' ? 'Your prayer time is over.' : 'Votre temps de prière est terminé.',
        tz.TZDateTime.from(at, tz.local),
        _timerDetails(),
        androidScheduleMode: AndroidScheduleMode.exactAllowWhileIdle,
      );
    } catch (_) {}
  }

  Future<void> cancelPrayerTimerEnd() async {
    try {
      await init();
      await _plugin.cancel(_timerNotifId);
    } catch (_) {}
  }

  Future<void> cancel() async {
    try {
      await init();
      await _plugin.cancelAll();
    } catch (_) {}
  }
}
