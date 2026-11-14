// Notifications poussées Android, 2 nov. 2026, tranche FCM.
// Android d'abord, iOS différé, web jamais initialisé dans cette
// tranche. Le web doit passer sans google-services.json, qui est
// un fichier Android seulement, et sans aucune clé Firebase dans
// le code, dans le dépôt ou dans le chat.
//
// Principe, à garder en tête :
// - La page Notifications, dans Plus, reste la source de vérité.
//   Une poussée ne crée jamais une notification, elle ne fait que
//   signaler une notification déjà créée côté serveur par
//   notifierTous ou notifierMembre. Si la poussée échoue ou si
//   Firebase n'est pas configuré, la page Notifications fonctionne
//   quand même.
// - En avant-plan, aucune bannière système en double : le message
//   déclenche seulement un rafraîchissement de la page
//   Notifications, que la page d'accueil écoute. La bannière
//   système n'apparaît que quand l'application est en arrière-plan
//   ou fermée, grâce au champ notification envoyé par le serveur,
//   affiché par Android lui-même.
// - En arrière-plan ou à froid, toucher la notification ouvre la
//   bonne page. La page d'accueil écoute onTap pour une
//   application déjà ouverte, et vide pending au démarrage pour
//   une application fermée, avec repli sur l'accueil si la cible
//   est inconnue.
// - Un visiteur ne reçoit jamais de poussée : l'enregistrement du
//   jeton n'a lieu que pour un membre connecté, jamais au premier
//   lancement, jamais pour un simple spectateur.
// - Les catégories désactivées par le membre sont envoyées avec le
//   jeton, pour que le serveur filtre avant d'envoyer, et elles
//   sont aussi vérifiées en avant-plan. Attention, limite honnête :
//   une notification déjà affichée par Android en arrière-plan ne
//   peut pas être retirée par l'application, d'où l'importance du
//   filtre côté serveur, et de la resynchronisation du jeton quand
//   un réglage change.
// - Le jeton FCM n'est jamais écrit dans les journaux, jamais
//   affiché, jamais mis dans une URL. Il est gardé en mémoire et
//   dans SharedPreferences sous la clé ci-dessous, comme les
//   jetons serveur existants, et désactivé côté serveur à la
//   déconnexion, au mieux, sans jamais bloquer la déconnexion.
// - Si Firebase n'est pas configuré, parce que google-services.json
//   manque ou que le projet n'existe pas encore, l'initialisation
//   échoue proprement, available reste faux, l'application continue
//   normalement avec la cloche et les notifications locales, et
//   aucun écran vide n'apparaît.
import 'dart:async';
import 'dart:convert';
import 'dart:io' show Platform;

import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'api.dart';
import 'notif_settings.dart';

/// Gestionnaire d'arrière-plan, obligatoirement en haut niveau, pour
/// les messages de données seuls. Les messages avec champ
/// notification sont affichés par Android lui-même quand
/// l'application est fermée, ce gestionnaire ne sert alors qu'aux
/// messages de données, et il ne doit jamais planter.
@pragma('vm:entry-point')
Future<void> pushBackgroundHandler(RemoteMessage message) async {
  try {
    await Firebase.initializeApp();
  } catch (_) {
    return;
  }
  try {
    final plugin = FlutterLocalNotificationsPlugin();
    const android = AndroidInitializationSettings('@mipmap/ic_launcher');
    await plugin.initialize(const InitializationSettings(android: android));
    final title = message.notification?.title ?? 'CONNEXION PROPHÉTIQUE';
    final body = message.notification?.body ?? '';
    if (body.isEmpty && title == 'CONNEXION PROPHÉTIQUE') return;
    await plugin.show(
      message.hashCode,
      title,
      body,
      const NotificationDetails(
        android: AndroidNotificationDetails(
          'push_connexion',
          'Notifications poussées',
          importance: Importance.high,
          priority: Priority.high,
        ),
      ),
      payload: jsonEncode(message.data),
    );
  } catch (_) {
    // En arrière-plan, un échec ne doit jamais planter l'application.
  }
}

class PushNotifications {
  PushNotifications._();
  static final instance = PushNotifications._();

  /// Vrai seulement après une initialisation Firebase réussie sur
  /// Android. Faux sur le web, faux sans configuration Firebase.
  bool available = false;

  /// Dernier toucher de notification en attente, pour un démarrage
  /// à froid. La page d'accueil le vide avec takePending.
  Map<String, String>? _pending;

  /// Toucher de notification, pour une application déjà ouverte ou
  /// en arrière-plan. La page d'accueil s'y abonne et navigue.
  final StreamController<Map<String, String>> _onTapController =
      StreamController<Map<String, String>>.broadcast();
  Stream<Map<String, String>> get onTap => _onTapController.stream;

  /// Rafraîchissement de la cloche demandé par un message reçu en
  /// avant-plan. La page d'accueil s'y abonne et appelle le
  /// rafraîchissement existant, sans bannière en double.
  final StreamController<void> _onForegroundController =
      StreamController<void>.broadcast();
  Stream<void> get onForeground => _onForegroundController.stream;

  bool _initialized = false;
  String? _token;

  /// Données d'un message, normalisées en chaînes, sans jeton, sans
  /// secret, sans champ privé.
  static Map<String, String> _data(RemoteMessage message) {
    final out = <String, String>{};
    message.data.forEach((k, v) => out[k.toString()] = v.toString());
    if (message.notification != null) {
      out.putIfAbsent('titre', () => message.notification!.title ?? '');
      out.putIfAbsent('message', () => message.notification!.body ?? '');
    }
    return out;
  }

  String _categorie(Map<String, String> data) {
    final type = data['type'] ?? '';
    if (type.isNotEmpty) return type;
    return data['categorie'] ?? '';
  }

  void _emitTap(Map<String, String> data) {
    _pending = data;
    if (!_onTapController.isClosed) _onTapController.add(data);
  }

  /// Initialise Firebase seulement sur Android, jamais sur le web.
  /// Ne demande rien au visiteur, ne plante jamais l'application.
  /// À appeler une fois au démarrage, puis registerIfMember après
  /// chaque connexion, depuis la page d'accueil.
  Future<void> init() async {
    if (_initialized) return;
    _initialized = true;
    if (kIsWeb) return;
    if (!Platform.isAndroid) return;
    try {
      FirebaseMessaging.onBackgroundMessage(pushBackgroundHandler);
      await Firebase.initializeApp();
      available = true;
    } catch (_) {
      // Firebase non configuré, google-services.json manquant ou
      // projet absent : la cloche et les notifications locales
      // continuent, la poussée reste simplement indisponible.
      available = false;
      return;
    }
    try {
      FirebaseMessaging.instance.onTokenRefresh.listen((token) {
        _token = token;
        unawaited(_sendToken(token));
      });
      FirebaseMessaging.onMessage.listen((message) {
        final data = _data(message);
        // Filtre client en avant-plan, en plus du filtre serveur.
        if (!notifSettings.enabled(_categorie(data))) return;
        if (!_onForegroundController.isClosed) _onForegroundController.add(null);
      });
      FirebaseMessaging.onMessageOpenedApp.listen((message) {
        _emitTap(_data(message));
      });
      final initial = await FirebaseMessaging.instance.getInitialMessage();
      if (initial != null) _pending = _data(initial);
    } catch (_) {
      available = false;
    }
  }

  /// Vide et renvoie le toucher en attente, ou null s'il n'y en a
  /// pas. Appelé par la page d'accueil après le premier rendu.
  Map<String, String>? takePending() {
    final data = _pending;
    _pending = null;
    return data;
  }

  /// Lecture seule de l'état de la permission, jamais une demande :
  /// seulement pour un membre connecté, jamais pour un visiteur,
  /// jamais au premier lancement pour un simple spectateur.
  /// Carte 98, 8 nov. 2026 : la permission de notification n'est
  /// demandée qu'une seule fois, à l'installation, sur la page de
  /// bienvenue des autorisations. La poussée ne repose donc jamais
  /// la question : si elle est accordée, le jeton s'enregistre ;
  /// sinon, la poussée reste désactivée et la page Notifications,
  /// dans Plus, continue, sans message d'erreur visible.
  Future<bool> notificationAutoriseeSiMembre() async {
    if (!available) return false;
    if (!api.isConnected) return false;
    try {
      final settings = await FirebaseMessaging.instance.getNotificationSettings();
      return settings.authorizationStatus == AuthorizationStatus.authorized ||
          settings.authorizationStatus == AuthorizationStatus.provisional;
    } catch (_) {
      return false;
    }
  }

  Future<void> _sendToken(String token) async {
    if (!api.isConnected) return;
    try {
      await api.registerPushToken({
        'jeton': token,
        'plateforme': 'android',
        'categories': notifSettings.enabledCategories(),
      });
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('push_fcm_token', token);
    } catch (_) {
      // Un échec d'enregistrement ne bloque jamais l'application,
      // le jeton sera renvoyé au prochain démarrage ou à la
      // prochaine synchronisation des réglages.
    }
  }

  /// Enregistre le jeton si l'application est sur Android, si
  /// Firebase est disponible, et si un membre est connecté. À
  /// appeler au démarrage pour un membre déjà connecté, et depuis
  /// la page d'accueil après une connexion, car l'initialisation
  /// au démarrage a lieu avant la connexion dans ce cas.
  Future<void> registerIfMember() async {
    if (!available) return;
    if (!api.isConnected) return;
    try {
      if (!await notificationAutoriseeSiMembre()) return;
      final token = await FirebaseMessaging.instance.getToken();
      if (token == null || token.isEmpty) return;
      _token = token;
      await _sendToken(token);
    } catch (_) {
      // Voir _sendToken : un échec ne bloque jamais l'application.
    }
  }

  /// Resynchronise les catégories du jeton après un changement de
  /// réglage, pour que le serveur filtre les prochaines poussées.
  /// À appeler après chaque bascule dans la page de réglages.
  Future<void> syncCategories() async {
    final token = _token;
    if (!available || token == null || token.isEmpty) return;
    if (!api.isConnected) return;
    await _sendToken(token);
  }

  /// Désactive le jeton côté serveur, au mieux, sans jamais bloquer
  /// la déconnexion. À appeler avant la déconnexion serveur.
  Future<void> unregisterBeforeLogout() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = _token ?? prefs.getString('push_fcm_token');
      if (token != null && token.isNotEmpty && api.isConnected) {
        await api.deactivatePushToken(token);
      }
      await prefs.remove('push_fcm_token');
    } catch (_) {
      // La déconnexion continue, le jeton restant sera désactivé
      // par le serveur au premier envoi invalide.
    } finally {
      _token = null;
    }
  }
}
