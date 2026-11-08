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
// Sur Android 13 et plus, la permission de notification n'est
// demandée qu'une seule fois, à l'installation, sur la page de
// bienvenue des autorisations, carte 98, jamais en silence, jamais
// ensuite. Si elle est refusée, rien n'est programmé et
// l'application explique d'aller l'activer dans les paramètres du
// téléphone.
//
// iOS, 7 nov. 2026 : même modèle, avec les réglages Darwin du
// plugin. La permission n'est jamais demandée à
// l'initialisation, elle passe par la page de bienvenue du
// premier lancement et par requestPermission, comme sur Android.
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
//
// Carte 94, 8 nov. 2026, test décisif du 8 nov. à 7 h : aucune
// notification, application fermée, téléphone pas en Ne pas
// déranger. Cause principale trouvée en relisant le paquet
// flutter_local_notifications 19.5.0 : le manifeste de
// l'application ne déclarait AUCUN receveur du paquet, ni
// ScheduledNotificationReceiver, ni ScheduledNotificationBootReceiver,
// ni SCHEDULE_EXACT_ALARM, ni RECEIVE_BOOT_COMPLETED. Sans receveur,
// une notification programmée ne peut jamais être délivrée par
// Android, même permission accordée et heure juste, et sans
// receveur de démarrage elle ne survit pas à un redémarrage. Le
// manifeste les déclare désormais, voir AndroidManifest.xml. Le
// paquet lui-même reprogramme ses notifications en cache au
// démarrage, par son ScheduledNotificationBootReceiver, aucun
// receveur natif propre n'a été construit, et la reprogrammation
// à chaque ouverture de l'application reste le second filet.
//
// Carte 100, 8 nov. 2026, la notification s'affiche mais ne
// sonne pas : le canal verset_du_jour_7h a été créé pour la
// première fois par la carte 72, sans son précisé, et sur Android
// un canal déjà créé ne se met jamais à jour, même si la carte 94
// demande ensuite le son. Le téléphone garde donc l'ancien canal
// silencieux. Le correctif est un nouveau canal, avec son, et la
// suppression de l'ancien au démarrage, une seule fois. Même
// traitement pour les autres canaux créés sans son précisé :
// anniversaire, cotisation, prière du matin et Bible non lue.
// Les canaux paiements et minuteur_priere demandaient déjà le
// son à leur création, ils ne changent pas.
import 'package:flutter/foundation.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutter_timezone/flutter_timezone.dart';
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

  // Carte 100, 8 nov. 2026 : nouveaux canaux, avec son, pour
  // remplacer les canaux créés sans son précisé par la carte 72
  // et avant. Sur Android, un canal déjà créé ne se met jamais à
  // jour, donc changer les réglages ne suffit pas, il faut un
  // nouvel identifiant, et supprimer l'ancien, sinon le téléphone
  // garde le canal silencieux. Les identifiants de notification
  // et les heures ne changent pas, seuls les canaux changent.
  static const String canalVerset = 'verset_du_jour_7h_son';
  static const String canalAnniversaire = 'anniversaire_son';
  static const String canalCotisation = 'cotisation_son';
  static const String canalPriere = 'priere_matin_6h30_son';
  static const String canalBible = 'bible_non_lue_20h_son';

  // Anciens canaux silencieux, à supprimer au démarrage, une
  // seule fois, par supprimerAnciensCanauxSilencieux. Aucun de
  // ces identifiants ne doit plus être utilisé pour programmer.
  static const List<String> anciensCanauxSilencieux = <String>[
    'verset_du_jour_7h',
    'anniversaire',
    'cotisation',
    'priere_matin_6h30',
    'bible_non_lue_20h',
  ];

  // Carte 94, 8 nov. 2026 : nom IANA du fuseau de l'appareil,
  // par exemple America/Toronto. Vrai seulement si init() a pu
  // le lire et régler tz.local, sinon _tzAt garde la conversion
  // UTC de la carte 72, qui donne le même instant, mais sans
  // nom de fuseau à afficher dans le diagnostic.
  String? _nomFuseauLocal;
  bool get fuseauLocalOk => _nomFuseauLocal != null;
  String? get nomFuseauLocal => _nomFuseauLocal;

  // Carte 94 : tz.local est réglé sur le fuseau de l'appareil,
  // donc _tzAt lit 7 h comme 7 h locale, avec les règles de
  // changement d'heure du fuseau. Attention, TZDateTime.from
  // garde l'instant et ne lit pas les champs comme une heure
  // murale, donc c'est le constructeur positionnel TZDateTime
  // qui est utilisé, il lit bien 7 h comme 7 h dans le fuseau.
  // Repli, si le fuseau n'a pas pu être lu : la conversion UTC
  // de la carte 72, qui donne le même instant, DateTime.toUtc()
  // connaissant le fuseau de l'appareil. Ne jamais programmer
  // en UTC brut, c'est à dire 7 h lues comme 7 h UTC.
  tz.TZDateTime _tzAt(DateTime local) {
    if (_nomFuseauLocal != null) {
      return tz.TZDateTime(
        tz.local,
        local.year,
        local.month,
        local.day,
        local.hour,
        local.minute,
        local.second,
        local.millisecond,
        local.microsecond,
      );
    }
    return tz.TZDateTime.from(local.toUtc(), tz.UTC);
  }

  // Carte 94 : prochain 7 h local, jamais un 7 h déjà passé.
  // Fonction pure, testée dans test/verset_94_test.dart.
  static DateTime prochain7h(DateTime now) {
    var day = DateTime(now.year, now.month, now.day, 7);
    if (!day.isAfter(now)) day = day.add(const Duration(days: 1));
    return day;
  }

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

  // Carte 94, diagnostic : l'alarme exacte est-elle autorisée
  // sur cet appareil, Android seulement, vrai sur iOS et sur
  // le web, où cette autorisation n'existe pas. Exposé par
  // flutter_local_notifications 19.5.0, canScheduleExactNotifications.
  Future<bool> exactAlarmAutorise() async {
    try {
      await init();
      if (defaultTargetPlatform != TargetPlatform.android) return true;
      final android = _plugin.resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();
      return await android?.canScheduleExactNotifications() ?? false;
    } catch (_) {
      return false;
    }
  }

  // Carte 94 : demande l'autorisation d'alarme exacte, ce qui
  // ouvre les réglages du système sur Android 12 et plus,
  // exposé par flutter_local_notifications 19.5.0,
  // requestExactAlarmsPermission. À appeler depuis un bouton,
  // jamais au démarrage, pour ne pas sortir l'utilisateur de
  // l'application sans qu'il l'ait demandé.
  Future<bool> demanderAlarmeExacte() async {
    try {
      await init();
      final android = _plugin.resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();
      if (android == null) return true;
      return await android.requestExactAlarmsPermission() ?? false;
    } catch (_) {
      return false;
    }
  }

  // Carte 94, diagnostic : nombre de notifications programmées
  // en attente, toutes catégories, lu dans le paquet.
  Future<int> notificationsProgrammeCount() async {
    try {
      await init();
      final enAttente = await _plugin.pendingNotificationRequests();
      return enAttente.length;
    } catch (_) {
      return 0;
    }
  }

  // Carte 94, diagnostic : prochain 7 h programmé, gardé en
  // local par scheduleWeek, null si rien n'est programmé.
  Future<DateTime?> prochainVerset7h() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final brut = prefs.getString('verset_7h_prochain');
      if (brut == null) return null;
      return DateTime.tryParse(brut);
    } catch (_) {
      return null;
    }
  }

  Future<void> init() async {
    if (_ready) return;
    tzdata.initializeTimeZones();
    // Carte 94 : régler tz.local sur le fuseau de l'appareil,
    // lu par flutter_timezone, nom IANA, par exemple
    // America/Toronto. Sans lui, tz.local reste UTC. En cas
    // d'échec, le repli UTC de _tzAt s'applique, sans erreur.
    try {
      final nom = await FlutterTimezone.getLocalTimezone();
      tz.setLocalLocation(tz.getLocation(nom));
      _nomFuseauLocal = nom;
    } catch (_) {
      _nomFuseauLocal = null;
    }
    const android = AndroidInitializationSettings('@mipmap/ic_launcher');
    const darwin = DarwinInitializationSettings(
      requestAlertPermission: false,
      requestBadgePermission: false,
      requestSoundPermission: false,
    );
    const settings = InitializationSettings(android: android, iOS: darwin);
    await _plugin.initialize(
      settings,
      onDidReceiveNotificationResponse: (response) {
        final payload = response.payload;
        if (payload == 'bible' || payload == 'priere' || payload == 'meditation') {
          pendingNotifDestination.value = payload;
        }
      },
    );
    // Carte 100 : supprimer les anciens canaux silencieux, une
    // seule fois, pour ne pas les laisser dans les réglages du
    // téléphone. Sans effet sur un téléphone neuf, où ils
    // n'existent pas, et sans effet sur les programmations, qui
    // utilisent déjà les nouveaux canaux.
    await supprimerAnciensCanauxSilencieux();
    _ready = true;
  }

  // Carte 100 : suppression des anciens canaux silencieux, une
  // seule fois par appareil, drapeau
  // anciens_canaux_silencieux_supprimes. Android seulement, la
  // suppression d'un canal inexistant ne fait rien, et un échec
  // ne bloque jamais le démarrage, il sera retenté à la prochaine
  // ouverture tant que le drapeau n'est pas posé.
  Future<void> supprimerAnciensCanauxSilencieux() async {
    try {
      if (defaultTargetPlatform != TargetPlatform.android) return;
      final prefs = await SharedPreferences.getInstance();
      if (prefs.getBool('anciens_canaux_silencieux_supprimes') ?? false) return;
      final android = _plugin.resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();
      if (android == null) return;
      for (final id in anciensCanauxSilencieux) {
        try {
          await android.deleteNotificationChannel(id);
        } catch (_) {}
      }
      await prefs.setBool('anciens_canaux_silencieux_supprimes', true);
    } catch (_) {}
  }

  // Carte 100, diagnostic : le canal du verset a-t-il du son ?
  // Android seulement, lu dans le paquet par
  // getNotificationChannels : vrai si le canal
  // verset_du_jour_7h_son existe avec playSound vrai, faux s'il
  // existe sans son, null si le canal n'existe pas encore, jamais
  // programmé, ou hors Android. Ne jamais inventer un état.
  Future<bool?> canalVersetASon() async {
    try {
      if (defaultTargetPlatform != TargetPlatform.android) return null;
      await init();
      final android = _plugin.resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();
      final canaux = await android?.getNotificationChannels();
      if (canaux == null) return null;
      for (final canal in canaux) {
        if (canal.id == canalVerset) return canal.playSound;
      }
      return null;
    } catch (_) {
      return null;
    }
  }

  Future<bool> permissionGranted() async {
    try {
      final android = _plugin.resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();
      if (android != null) {
        final granted = await android.areNotificationsEnabled();
        return granted ?? false;
      }
      final ios = _plugin.resolvePlatformSpecificImplementation<IOSFlutterLocalNotificationsPlugin>();
      if (ios != null) {
        final options = await ios.checkPermissions();
        return options?.isEnabled ?? false;
      }
      return false;
    } catch (_) {
      return false;
    }
  }

  /// Carte 98, 8 nov. 2026 : une seule demande de permission, à
  /// l'installation, sur la page de bienvenue. `demandeFaite` est le
  /// drapeau verset_notif_permission_demandee : une fois la demande
  /// faite, plus aucune demande, ni au démarrage, ni par un
  /// interrupteur, ni par la poussée.
  bool nouvelleDemandeNotificationAutorisee({required bool demandeFaite}) => !demandeFaite;

  Future<bool> requestPermission() async {
    try {
      final android = _plugin.resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();
      if (android != null) {
        final granted = await android.requestNotificationsPermission();
        return granted ?? false;
      }
      final ios = _plugin.resolvePlatformSpecificImplementation<IOSFlutterLocalNotificationsPlugin>();
      if (ios != null) {
        final granted = await ios.requestPermissions(alert: true, badge: true, sound: true);
        return granted ?? false;
      }
      return false;
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
        iOS: DarwinNotificationDetails(
          presentAlert: true,
          presentBadge: true,
          presentSound: true,
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
      final day = prochain7h(now);
      // Carte 100 : nouveau canal verset_du_jour_7h_son, avec son.
      // L'ancien canal verset_du_jour_7h, créé sans son par la
      // carte 72, ne se met jamais à jour sur Android, il est
      // supprimé au démarrage, voir supprimerAnciensCanauxSilencieux.
      // Canal en importance haute, son, vibration et visibilité
      // publique, pour un affichage en haut de l'écran, même
      // verrouillé.
      const details = NotificationDetails(
        android: AndroidNotificationDetails(
          canalVerset,
          'Verset du jour',
          channelDescription: 'Verset biblique chaque matin',
          importance: Importance.high,
          priority: Priority.high,
          playSound: true,
          enableVibration: true,
          visibility: NotificationVisibility.public,
        ),
        iOS: DarwinNotificationDetails(
          presentAlert: true,
          presentBadge: true,
          presentSound: true,
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
      // Carte 94, preuve de programmation : le prochain 7 h et
      // le fuseau utilisé sont gardés en local, pour le diagnostic
      // de la page Bible, avant tout test réel.
      try {
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('verset_7h_prochain', day.toIso8601String());
        await prefs.setString('verset_7h_fuseau', _nomFuseauLocal ?? 'UTC');
      } catch (_) {}
      return true;
    } catch (_) {
      return false;
    }
  }

  // Carte 94, test court : programme une notification de test
  // dans 3 minutes, avec le verset du jour, même canal, même
  // payload meditation. Ne touche pas à la semaine programmée,
  // elle n'annule que son propre identifiant 1999. À lancer
  // depuis le diagnostic de la page Bible, application fermée
  // ensuite, pour prouver permission et programmation avant le
  // test réel de 7 h.
  Future<bool> scheduleTest3Min(String lang) async {
    try {
      await init();
      if (!await permissionGranted()) return false;
      await BibleService.instance.load();
      if (!BibleService.instance.loaded) return false;
      await _plugin.cancel(1999);
      final mode = await _modeExactSiPossible();
      final at = DateTime.now().add(const Duration(minutes: 3));
      final ref = BibleService.instance.dailyVerse(lang, date: DateTime.now());
      final label = BibleService.instance.label(lang, ref.book, ref.chapter, ref.verse);
      // Carte 100 : même nouveau canal que le verset à 7 h,
      // verset_du_jour_7h_son, avec son, pour que le test sonne
      // comme la vraie notification du matin.
      const details = NotificationDetails(
        android: AndroidNotificationDetails(
          canalVerset,
          'Verset du jour',
          channelDescription: 'Verset biblique chaque matin',
          importance: Importance.high,
          priority: Priority.high,
          playSound: true,
          enableVibration: true,
          visibility: NotificationVisibility.public,
        ),
        iOS: DarwinNotificationDetails(
          presentAlert: true,
          presentBadge: true,
          presentSound: true,
        ),
      );
      await _plugin.zonedSchedule(
        1999,
        lang == 'en' ? 'Test, verse of the day' : 'Test, verset du jour',
        '« ${ref.text} » — $label',
        _tzAt(at),
        details,
        androidScheduleMode: mode,
        payload: 'meditation',
      );
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
      // Carte 100 : nouveau canal anniversaire_son, avec son, même
      // raison que le verset, l'ancien canal a été créé sans son.
      const details = NotificationDetails(
        android: AndroidNotificationDetails(
          canalAnniversaire,
          'Anniversaire',
          channelDescription: 'Message le matin de votre anniversaire',
          importance: Importance.high,
          priority: Priority.high,
          playSound: true,
          enableVibration: true,
        ),
        iOS: DarwinNotificationDetails(
          presentAlert: true,
          presentBadge: true,
          presentSound: true,
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
      // Carte 100 : nouveau canal cotisation_son, avec son, même
      // raison que le verset, l'ancien canal a été créé sans son.
      const details = NotificationDetails(
        android: AndroidNotificationDetails(
          canalCotisation,
          'Cotisation mensuelle',
          channelDescription: 'Rappel de cotisation mensuelle',
          importance: Importance.high,
          priority: Priority.high,
          playSound: true,
          enableVibration: true,
        ),
        iOS: DarwinNotificationDetails(
          presentAlert: true,
          presentBadge: true,
          presentSound: true,
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
  // téléphone seulement, jamais sur le web : l'appelant garde
  // defaultTargetPlatform, comme pour le verset du jour.
  // iOS ajouté le 7 nov. 2026, mêmes réglages Darwin.
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
      // Carte 100 : nouveau canal priere_matin_6h30_son, avec son,
      // même raison que le verset, l'ancien canal a été créé sans son.
      const details = NotificationDetails(
        android: AndroidNotificationDetails(
          canalPriere,
          'Prière du matin',
          channelDescription: 'Rappel de prière chaque matin',
          importance: Importance.high,
          priority: Priority.high,
          playSound: true,
          enableVibration: true,
          visibility: NotificationVisibility.public,
        ),
        iOS: DarwinNotificationDetails(
          presentAlert: true,
          presentBadge: true,
          presentSound: true,
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
      // Carte 100 : nouveau canal bible_non_lue_20h_son, avec son,
      // même raison que le verset, l'ancien canal a été créé sans son.
      const details = NotificationDetails(
        android: AndroidNotificationDetails(
          canalBible,
          'Bible non lue',
          channelDescription: 'Rappel si la Bible n’a pas été lue dans la journée',
          importance: Importance.high,
          priority: Priority.high,
          playSound: true,
          enableVibration: true,
          visibility: NotificationVisibility.public,
        ),
        iOS: DarwinNotificationDetails(
          presentAlert: true,
          presentBadge: true,
          presentSound: true,
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

  /// Appelée à l'ouverture de la page Bible, téléphone seulement.
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
        iOS: DarwinNotificationDetails(
          presentAlert: true,
          presentBadge: true,
          presentSound: true,
        ),
      );

  Future<void> schedulePrayerTimerEnd(String lang, Duration inDuration) async {
    try {
      await init();
      // Carte 98, 8 nov. 2026 : plus de nouvelle demande de
      // permission ici non plus. Une seule demande, à
      // l'installation. Sans permission, le minuteur finit sans
      // notification, sans erreur.
      if (!await permissionGranted()) return;
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
