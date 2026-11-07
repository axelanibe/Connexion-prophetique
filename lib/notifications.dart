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
//
// Carte 72, 7 nov. 2026, pourquoi le verset n'est jamais arrivé :
// 1. la permission n'était jamais demandée au démarrage : main()
//    appelait scheduleWeek, qui rend false en silence sans permission,
//    et le seul endroit qui la demandait était l'interrupteur de la
//    page Bible, que l'utilisateur n'a jamais touché. L'option
//    affichée activée par défaut ne programmait donc rien.
// 2. tz.local n'était jamais réglé : initializeTimeZones charge
//    la base, mais tz.local reste UTC. TZDateTime.from(date, tz.local)
//    lisait donc 7 h comme 7 h UTC, soit 2 h du matin à Toronto.
//    Le correctif convertit l'heure locale en instant UTC avec
//    DateTime.toUtc(), qui connaît le fuseau de l'appareil, DST
//    comprise, sans nouvelle dépendance.
// 3. la notification du verset ne portait aucun payload : le toucher
//    ouvrait seulement l'application, jamais la Méditation.
import 'package:flutter/foundation.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:timezone/data/latest_all.dart' as tzdata;
import 'package:timezone/timezone.dart' as tz;

import 'bible.dart';
import 'i18n.dart';

// Destination demandée par le toucher d'une notification locale,
// 3 nov. 2026 : 'bible' pour le rappel Bible, 'priere' pour le
// rappel de prière du matin. AppShell la lit à son ouverture et
// quand elle change, puis l'efface, pour ouvrir l'onglet adapté
// sans nouvelle page. Carte 72, 7 nov. 2026 : 'meditation' pour
// le verset du jour, qui ouvre l'accueil, où est la Méditation
// Quotidienne. Sans elle, le toucher ouvrirait seulement
// l'application, comme le verset du jour avant cette carte.
final pendingNotifDestination = ValueNotifier<String?>(null);

class DailyVerseNotifications {
  DailyVerseNotifications._();
  static final instance = DailyVerseNotifications._();

  final _plugin = FlutterLocalNotificationsPlugin();
  bool _ready = false;

  // Carte 72, 7 nov. 2026 : tz.local reste UTC si on ne le règle
  // jamais, donc on ne l'utilise pas. L'heure locale voulue est
  // convertie en instant UTC par DateTime.toUtc(), qui connaît le
  // fuseau de l'appareil et ses changements d'heure, puis l'instant
  // est porté en TZDateTime UTC, sans décalage. Utilisé par toutes
  // les programmations de ce fichier, verset, anniversaire,
  // cotisation, prière, Bible et minuteur.
  tz.TZDateTime _tzAt(DateTime local) => tz.TZDateTime.from(local.toUtc(), tz.UTC);

  // Alarme exacte si le téléphone l'autorise, sinon inexacte :
  // sur Android 12 et plus, l'exacte exige l'autorisation
  // d'alarme exacte, sinon la programmation lèverait une erreur.
  Future<AndroidScheduleMode> _modeExactSiPossible() async {
    try {
      final android = _plugin.resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();
      final exact = await android?.canScheduleExactNotifications() ?? false;
      return exact ? AndroidScheduleMode.exactAllowWhileIdle : AndroidScheduleMode.inexactAllowWhileIdle;
    } catch (_) {
      return AndroidScheduleMode.inexactAllowWhileIdle;
    }
  }

  Future<void> init() async {
    if (_ready) return;
    tzdata.initializeTimeZones();
    const android = AndroidInitializationSettings('@mipmap/ic_launcher');
    const settings = InitializationSettings(android: android);
    await _plugin.initialize(
      settings,
      onDidReceiveNotificationResponse: (response) {
        final payload = response.payload;
        if (payload == 'bible' || payload == 'priere' || payload == 'meditation') {
          pendingNotifDestination.value = payload;
        }
      },
    );
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
  /// Alerte immédiate pour un nouveau paiement en attente, pour
  /// l'administrateur général, quand l'application tourne. Sans
  /// service de notification externe, aucune alerte n'arrive quand
  /// l'application est complètement fermée : le bandeau et le point
  /// sur Plus, dans l'application, restent alors l'alerte. Si la
  /// permission n'est pas accordée, l'alerte système est silencieuse
  /// et le bandeau dans l'application fait le travail.
  Future<bool> showPayment(int count) async {
    try {
      await init();
      if (!await permissionGranted()) return false;
      const details = NotificationDetails(
        android: AndroidNotificationDetails(
          'paiements',
          'Paiements à valider',
          importance: Importance.high,
          priority: Priority.high,
        ),
      );
      await _plugin.show(
        999,
        'CONNEXION PROPHÉTIQUE',
        count == 1
            ? 'Nouveau paiement en attente de validation.'
            : '$count paiements en attente de validation.',
        details,
      );
      return true;
    } catch (_) {
      return false;
    }
  }

  Future<bool> scheduleWeek(String lang) async {
    try {
      await init();
      if (!await permissionGranted()) return false;
      await BibleService.instance.load();
      if (!BibleService.instance.loaded) return false;
      await _plugin.cancelAll();
      final mode = await _modeExactSiPossible();
      final now = DateTime.now();
      var day = DateTime(now.year, now.month, now.day, 7);
      if (!day.isAfter(now)) day = day.add(const Duration(days: 1));
      // Canal dedie avec importance haute : la notification s'affiche
      // sur l'ecran, comme les autres applications de Bible, au lieu
      // de rester silencieuse dans le volet. Nouvel identifiant, car
      // Android conserve les reglages d'un canal deja cree sur
      // l'appareil : garder l'ancien identifiant aurait conserve
      // l'ancienne importance par defaut.
      const details = NotificationDetails(
        android: AndroidNotificationDetails(
          'verset_du_jour_7h',
          'Verset du jour',
          channelDescription: 'Verset biblique chaque matin',
          importance: Importance.high,
          priority: Priority.high,
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
          _tzAt(date),
          details,
          androidScheduleMode: mode,
          payload: 'meditation',
        );
      }
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Anniversaire, 29 oct. 2026 : notification locale le matin du
  /// jour J, à 7 h, avec le verset Psaume 118:24 lu dans la source.
  /// Identifiant 3000, distinct des versets du jour (1000 et plus),
  /// du minuteur (2000) et de l'alerte paiement (999). Elle ne
  /// touche jamais aux autres programmations : elle n'annule que la
  /// sienne, pour survivre à scheduleWeek, qui annule tout. Si
  /// l'anniversaire est passé ou à plus de 7 jours, rien n'est
  /// programmé, sans erreur. Un 29 février est fêté le 28 les
  /// années non bissextiles, même règle que la carte à l'ouverture.
  Future<bool> scheduleBirthday(String lang, DateTime birth) async {
    try {
      await init();
      if (!await permissionGranted()) return false;
      await BibleService.instance.load();
      if (!BibleService.instance.loaded) return false;
      final text = BibleService.instance.verseText(lang, 18, 118, 24);
      if (text == null || text.isEmpty) return false;
      final now = DateTime.now();
      var year = now.year;
      late DateTime at;
      while (true) {
        var day = birth.day;
        if (birth.month == 2 && day == 29) {
          final leap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
          if (!leap) day = 28;
        }
        at = DateTime(year, birth.month, day, 7);
        if (at.isAfter(now)) break;
        year++;
      }
      if (at.difference(now) > const Duration(days: 7)) return false;
      await _plugin.cancel(3000);
      const details = NotificationDetails(
        android: AndroidNotificationDetails(
          'anniversaire',
          'Anniversaire',
          channelDescription: 'Message le matin de votre anniversaire',
          importance: Importance.high,
          priority: Priority.high,
        ),
      );
      final label = BibleService.instance.label(lang, 18, 118, 24);
      await _plugin.zonedSchedule(
        3000,
        lang == 'en' ? 'Happy birthday' : 'Joyeux anniversaire',
        '« $text » — $label',
        _tzAt(at),
        details,
        androidScheduleMode: AndroidScheduleMode.inexactAllowWhileIdle,
      );
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Rappel de cotisation mensuelle, 29 oct. 2026 : notifications
  /// locales les 7 prochains matins à 7 h, tant que la cotisation
  /// du mois n'est pas réglée et qu'on est à partir du 15.
  /// Identifiants 3001 à 3007, distincts de l'anniversaire (3000),
  /// des versets (1000 et plus), du minuteur (2000) et de l'alerte
  /// paiement (999). Elle ne touche jamais aux autres
  /// programmations : elle n'annule que les siens. Comme
  /// l'anniversaire, elle suit la même permission que le verset du
  /// jour : sans permission, rien n'est programmé, sans erreur, et
  /// la cloche avec la carte à l'ouverture font le travail.
  /// Programmée à chaque synchronisation, donc un rappel chaque
  /// matin tant que le membre ouvre l'application, et au moins le
  /// lendemain matin de la dernière ouverture.
  Future<bool> scheduleCotisationReminder(String lang) async {
    try {
      await init();
      if (!await permissionGranted()) return false;
      for (var i = 3001; i <= 3007; i++) {
        await _plugin.cancel(i);
      }
      const details = NotificationDetails(
        android: AndroidNotificationDetails(
          'cotisation',
          'Cotisation mensuelle',
          channelDescription: 'Rappel de cotisation mensuelle',
          importance: Importance.high,
          priority: Priority.high,
        ),
      );
      final now = DateTime.now();
      var day = DateTime(now.year, now.month, now.day, 7);
      if (!day.isAfter(now)) day = day.add(const Duration(days: 1));
      for (var i = 0; i < 7; i++) {
        final date = day.add(Duration(days: i));
        await _plugin.zonedSchedule(
          3001 + i,
          lang == 'en' ? 'Monthly contribution' : 'Cotisation mensuelle',
          lang == 'en'
              ? 'Your contribution for this month is not settled yet.'
              : 'Votre cotisation du mois n’est pas encore réglée.',
          _tzAt(date),
          details,
          androidScheduleMode: AndroidScheduleMode.inexactAllowWhileIdle,
        );
      }
      return true;
    } catch (_) {
      return false;
    }
  }

  Future<void> cancelCotisationReminder() async {
    try {
      await init();
      for (var i = 3001; i <= 3007; i++) {
        await _plugin.cancel(i);
      }
    } catch (_) {}
  }

  // Rappels prière du matin et Bible non lue, 3 nov. 2026,
  // Android seulement, jamais sur le web : l'appelant garde
  // defaultTargetPlatform, comme pour le verset du jour.
  // Canaux distincts, importance haute et visibilité publique,
  // pour que la notification s'affiche sur l'écran verrouillé,
  // comme la photo montrée par Axel. Identifiants 4000 à 4006
  // pour la prière, 4100 à 4106 pour la Bible, distincts des
  // versets (1000 et plus), du minuteur (2000), de l'anniversaire
  // (3000) et de la cotisation (3001 à 3007). Ces méthodes
  // n'annulent que leurs propres identifiants, jamais tout :
  // elles doivent donc être appelées APRÈS scheduleWeek, qui
  // annule tout, aux mêmes points de reprogrammation.
  // La prière ne peut pas être détectée : le rappel du matin
  // est systématique quand il est activé, jamais conditionné
  // à une prière réelle, et jamais envoyé au serveur.
  static const _priereMessagesFr = [
    'As-tu prié ce matin ?',
    'Prends 5 minutes pour prier avant de commencer ta journée.',
    'Confie ta journée au Seigneur avant de sortir.',
    'Commence ta journée par la prière, même quelques minutes.',
    'As-tu pris un moment pour prier aujourd’hui ?',
    'Prier d’abord, puis commencer ta journée.',
    'Un moment de prière ce matin pour confier ta journée à Dieu.',
  ];

  DateTime _prochainJour(int heure) {
    final now = DateTime.now();
    var day = DateTime(now.year, now.month, now.day, heure);
    if (!day.isAfter(now)) day = day.add(const Duration(days: 1));
    return day;
  }

  Future<bool> schedulePrayerReminder(String lang) async {
    try {
      await init();
      if (!await permissionGranted()) return false;
      for (var i = 4000; i <= 4006; i++) {
        await _plugin.cancel(i);
      }
      const details = NotificationDetails(
        android: AndroidNotificationDetails(
          'priere_matin_6h30',
          'Prière du matin',
          channelDescription: 'Rappel de prière chaque matin',
          importance: Importance.high,
          priority: Priority.high,
          visibility: NotificationVisibility.public,
        ),
      );
      final start = _prochainJour(6).add(const Duration(minutes: 30));
      for (var i = 0; i < 7; i++) {
        final date = start.add(Duration(days: i));
        // Rotation sans répétition d'un jour à l'autre : l'index
        // avance de 1 chaque jour, donc jamais le même message
        // deux jours de suite, et la semaine couvre les 7 messages.
        final dayOfYear = DateTime(date.year, date.month, date.day).difference(DateTime(date.year, 1, 1)).inDays;
        final message = _priereMessagesFr[(date.year * 366 + dayOfYear) % 7];
        await _plugin.zonedSchedule(
          4000 + i,
          lang == 'en' ? 'Morning prayer' : 'Prière du matin',
          tr(message),
          _tzAt(date),
          details,
          androidScheduleMode: AndroidScheduleMode.inexactAllowWhileIdle,
          payload: 'priere',
        );
      }
      return true;
    } catch (_) {
      return false;
    }
  }

  Future<void> cancelPrayerReminder() async {
    try {
      await init();
      for (var i = 4000; i <= 4006; i++) {
        await _plugin.cancel(i);
      }
    } catch (_) {}
  }

  // Bible non lue, 20 h : un seul rappel par jour, programmé
  // 7 jours à l'avance. Le déclenchement à 20 h vaut preuve
  // locale que la Bible n'a pas été ouverte ce jour-là, car
  // l'ouverture de la page Bible annule le rappel du jour
  // (voir noteBibleOpened) et reprogramme les jours suivants.
  // Aucune lecture n'est envoyée au serveur, la trace est une
  // simple date locale dans SharedPreferences.
  Future<bool> scheduleBibleReminder(String lang) async {
    return _scheduleBibleReminderFrom(lang, _prochainJour(20));
  }

  // Variante pour noteBibleOpened : après une ouverture de Bible,
  // le rappel de ce soir doit disparaître, donc la reprogrammation
  // commence demain 20 h, jamais ce soir. Sans elle, _prochainJour
  // reprogrammerait ce soir même, et annuler ne servirait à rien.
  Future<bool> _scheduleBibleReminderFrom(String lang, DateTime start) async {
    try {
      await init();
      if (!await permissionGranted()) return false;
      for (var i = 4100; i <= 4106; i++) {
        await _plugin.cancel(i);
      }
      const details = NotificationDetails(
        android: AndroidNotificationDetails(
          'bible_non_lue_20h',
          'Bible non lue',
          channelDescription: 'Rappel si la Bible n’a pas été lue dans la journée',
          importance: Importance.high,
          priority: Priority.high,
          visibility: NotificationVisibility.public,
        ),
      );
      for (var i = 0; i < 7; i++) {
        final date = start.add(Duration(days: i));
        await _plugin.zonedSchedule(
          4100 + i,
          lang == 'en' ? 'Bible' : 'Bible',
          lang == 'en'
              ? 'You have not read your Bible yet today. Take a moment to read a passage.'
              : 'Tu n’as pas encore lu ta Bible aujourd’hui. Prends un moment pour lire un passage.',
          _tzAt(date),
          details,
          androidScheduleMode: AndroidScheduleMode.inexactAllowWhileIdle,
          payload: 'bible',
        );
      }
      return true;
    } catch (_) {
      return false;
    }
  }

  Future<void> cancelBibleReminder() async {
    try {
      await init();
      for (var i = 4100; i <= 4106; i++) {
        await _plugin.cancel(i);
      }
    } catch (_) {}
  }

  /// Appelée à l'ouverture de la page Bible, Android seulement.
  /// Elle note la date du jour en local, annule tous les rappels
  /// Bible programmés, donc celui de ce soir, puis reprogramme
  /// les jours suivants à 20 h si le rappel est activé. Si le
  /// rappel est désactivé, elle annule seulement, sans reprogrammer.
  Future<void> noteBibleOpened(String lang, bool bibleReminderEnabled) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final now = DateTime.now();
      final today = '${now.year}-${now.month.toString().padLeft(2, '0')}-${now.day.toString().padLeft(2, '0')}';
      await prefs.setString('bible_ouverte_date', today);
      await cancelBibleReminder();
      if (bibleReminderEnabled) {
        final now = DateTime.now();
        await _scheduleBibleReminderFrom(lang, DateTime(now.year, now.month, now.day, 20).add(const Duration(days: 1)));
      }
    } catch (_) {}
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
        _tzAt(at),
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
