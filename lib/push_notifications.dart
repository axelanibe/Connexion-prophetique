// Notifications poussées Android, 2 nov. 2026, tranche FCM.
// Android d'abord, iOS différé, web jamais initialisé dans cette
// tranche. Le web doit passer sans google-services.json, qui est
// un fichier Android seulement, et sans aucune clé Firebase dans
// le code, dans le dépôt ou dans le chat.
//
// Principe, à garder en tête :
// - La page Notifications, dans le tiroir, reste la source de vérité.
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
//   dans le coffre du système (StockageAuth, C-2), comme les
//   jetons serveur, et désactivé côté serveur à la
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
import 'package:flutter_callkit_incoming/entities/entities.dart';
import 'package:flutter_callkit_incoming/flutter_callkit_incoming.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'api.dart';
import 'appel_en_cours.dart';
import 'choix_sons.dart';
import 'notif_settings.dart';
import 'stockage_auth.dart';

/// Clé de l'acceptation d'appel persistée à froid, carte 164 :
/// quand l'application est fermée, l'acceptation ne peut pas
/// partir vers l'écouteur de l'application en cours, qui
/// n'existe pas. Le gestionnaire d'arrière-plan la persiste ici,
/// et l'application la rejoue au démarrage.
const String cleAppelAccepteArrierePlan = 'appel_accepte_arriere_plan';

/// Gestionnaire d'arrière-plan CallKit, carte 164 : il tourne
/// dans l'exécuteur d'arrière-plan du paquet, quand l'application
/// est fermée ou tuée. Sans lui, l'acceptation est abandonnée par
/// le paquet, et décrocher ne fait qu'ouvrir l'application.
/// L'acceptation est persistée, puis rejouée au démarrage par
/// rejouerAcceptationArrierePlan. Un refus, une fin ou une
/// expiration efface l'acceptation persistée, pour ne jamais
/// rouvrir un appel déjà terminé.
@pragma('vm:entry-point')
Future<void> gererEvenementAppelArrierePlan(CallEvent evenement) async {
  try {
    final prefs = await SharedPreferences.getInstance();
    if (evenement is CallEventActionCallAccept) {
      final parametres = evenement.callKitParams;
      final supplement = parametres.extra ?? const <String, dynamic>{};
      await prefs.setString(
        cleAppelAccepteArrierePlan,
        jsonEncode(<String, dynamic>{
          'appel_id': parametres.id,
          'appelant_nom': parametres.nameCaller ?? '',
          'conversation_id': (supplement['conversation_id'] ?? '').toString(),
          'type_appel': (supplement['type_appel'] ??
                  (parametres.type == 1 ? 'video' : 'audio'))
              .toString(),
        }),
      );
    } else if (evenement is CallEventActionCallDecline ||
        evenement is CallEventActionCallEnded ||
        evenement is CallEventActionCallTimeout) {
      await prefs.remove(cleAppelAccepteArrierePlan);
    }
  } catch (_) {
    // L'acceptation à froid est un repli : un échec ici ne doit
    // jamais faire planter l'exécuteur d'arrière-plan.
  }
}

/// Écran d'appel natif pour un appel entrant, Android seulement,
/// 20 nov. 2026 : notification avec la sonnerie du téléphone,
/// même application fermée ou téléphone verrouillé, comme
/// WhatsApp. Le plein écran est abandonné, carte 164 : avec le
/// plein écran, la sonnerie native ne démarre jamais, le paquet
/// ne joue la sonnerie que dans le chemin notification.
/// Le serveur envoie un message de données seul pour un appel
/// entrant, sans champ notification. Vrai si l'écran natif est
/// affiché, faux sinon (identifiant manquant ou échec), pour que
/// l'appelant retombe sur la notification locale.
/// Le type 0 est audio, 1 vidéo. La durée 30000 est la sonnerie
/// côté client, 30 secondes, comme dureeSonnerieAppel. La
/// sonnerie est celle du téléphone par défaut (ringtonePath
/// absent). Sur refus, rien à envoyer depuis l'application
/// fermée : l'expiration serveur de 60 secondes et la ligne
/// d'appel manqué couvrent le cas.
Future<bool> _montrerAppelNatif(Map<String, String> donnees) async {
  try {
    final appelId = donnees['appel_id'] ?? '';
    if (appelId.isEmpty) return false;
    final appelantNom = donnees['appelant_nom'] ?? '';
    final typeAppel = donnees['type_appel'] ?? 'audio';
    // Sonnerie choisie par le membre, carte 4, 21 nov. 2026 :
    // la sonnerie CallKit est la variante choisie dans
    // Paramètres, lue ici dans le stockage local, l'écran natif
    // tournant dans un autre isolat sans l'état de l'application.
    String sonnerieId = ChoixSons.sonnerieParDefautId;
    try {
      final prefs = await SharedPreferences.getInstance();
      sonnerieId =
          prefs.getString(ChoixSons.cleSonnerie) ??
          ChoixSons.sonnerieParDefautId;
    } catch (_) {}
    await FlutterCallkitIncoming.showCallkitIncoming(
      CallKitParams(
        id: appelId,
        nameCaller:
            appelantNom.isNotEmpty ? appelantNom : 'CONNEXION PROPHÉTIQUE',
        appName: 'CONNEXION PROPHÉTIQUE',
        type: typeAppel == 'video' ? 1 : 0,
        duration: 30000,
        extra: <String, dynamic>{
          'conversation_id': donnees['conversation_id'] ?? '',
          'type_appel': typeAppel,
        },
        android: AndroidParams(
          textAccept: 'Accepter',
          textDecline: 'Refuser',
          ringtonePath: ChoixSons.ressourceSonneriePour(sonnerieId),
          // Carte 164 : le plein écran de la 163 est abandonné.
          // Le paquet ne joue la sonnerie native qu'à un seul
          // endroit, dans showIncomingNotification, le chemin
          // notification. Avec le plein écran, le récepteur
          // lance l'activité directement, sans notification,
          // donc sans sonnerie ni vibration, et l'activité ne
          // fait que protéger une sonnerie qui ne joue pas. Une
          // sonnerie qui fonctionne compte plus que d'éviter la
          // permission, et la permission est déjà déclarée pour
          // la 1.0.2. La connexion Telecom est créée dans les
          // deux chemins, la mise en attente de la 163 reste.
          isFullScreen: false,
        ),
      ),
    );
    return true;
  } catch (_) {
    return false;
  }
}

/// Adaptateur testable autour des méthodes plein écran de
/// flutter_callkit_incoming, carte 150, 22 nov. 2026.
/// Sur Android 14 et plus, l'autorisation « Notifications plein
/// écran » est spéciale : la déclarer ne suffit pas, l'utilisateur
/// doit l'accorder dans Paramètres. Le paquet renvoie vrai en
/// dessous d'Android 14, où l'autorisation n'existe pas, donc
/// aucune version SDK à tester côté Dart : disponible() est la
/// seule source de vérité. Les méthodes du paquet sont injectables
/// en test, pour ne pas passer par un canal simulé.
class PleinEcranAppel {
  PleinEcranAppel({
    Future<bool> Function()? disponible,
    Future<bool> Function()? demander,
  })  : _disponible =
            disponible ?? FlutterCallkitIncoming.canUseFullScreenIntent,
        _demander =
            demander ?? FlutterCallkitIncoming.requestFullIntentPermission;

  /// Instance partagée, utilisée par l'écran de bienvenue des
  /// autorisations et par Paramètres.
  static final PleinEcranAppel instance = PleinEcranAppel();

  final Future<bool> Function() _disponible;
  final Future<bool> Function() _demander;

  /// Vrai si l'écran d'appel peut s'afficher sur le téléphone
  /// verrouillé. Toujours vrai en dessous d'Android 14.
  Future<bool> disponible() => _disponible();

  /// Ouvre la page Paramètres de l'application pour accorder
  /// l'autorisation. Renvoie l'état après le retour.
  Future<bool> demander() => _demander();
}

/// Vrai si l'exemption d'optimisation de la batterie doit être
/// demandée, carte 151 : une seule fois, et seulement si elle
/// n'est pas déjà accordée. Après un refus, on renvoie vers les
/// réglages du téléphone au lieu de redemander.
bool doitDemanderExemptionBatterie({
  required bool dejaDemandee,
  required bool exemptionAccordee,
}) =>
    !dejaDemandee && !exemptionAccordee;

/// Demande l'exemption d'optimisation de la batterie, carte 164 :
/// une seule fois, par le dialogue système, au premier appel,
/// jamais à l'avance et jamais répétée. Android exige
/// l'approbation de l'utilisateur une fois, l'application ne peut
/// pas se l'accorder seule. La clé exemption_batterie_demandee est
/// la même que celle de l'ancienne carte de bienvenue, un membre
/// qui l'a déjà accordée n'est jamais redemandé. Un échec ne
/// bloque jamais l'appel.
Future<void> demanderExemptionBatterieAuPremierAppel() async {
  if (kIsWeb || !Platform.isAndroid) return;
  try {
    final prefs = await SharedPreferences.getInstance();
    if (prefs.getBool('exemption_batterie_demandee') ?? false) return;
    final accordee =
        await Permission.ignoreBatteryOptimizations.isGranted;
    await prefs.setBool('exemption_batterie_demandee', true);
    if (!accordee) {
      await Permission.ignoreBatteryOptimizations.request();
    }
  } catch (_) {
    // Voir ci-dessus : l'appel continue sans exemption.
  }
}

/// Recrée le canal des messages avec le son choisi, carte 4,
/// 21 nov. 2026 : sur Android, un canal déjà créé ne se met
/// jamais à jour, il faut le supprimer puis le recréer. Le canal
/// dédié 'push_connexion_messages' est celui que le serveur
/// désigne pour les messages (channel_id dans fcm.js) : un
/// nouvel identifiant ne serait jamais utilisé par les poussées,
/// donc c'est ce canal, avec le même identifiant, qui est recréé
/// avec le nouveau son. Un échec ne bloque jamais la poussée.
Future<void> recreerCanalMessages(String ressourceSon) async {
  try {
    final plugin = FlutterLocalNotificationsPlugin();
    const androidInit = AndroidInitializationSettings('@mipmap/ic_launcher');
    await plugin.initialize(const InitializationSettings(android: androidInit));
    final android = plugin
        .resolvePlatformSpecificImplementation<
            AndroidFlutterLocalNotificationsPlugin>();
    if (android == null) return;
    await android.deleteNotificationChannel('push_connexion_messages');
    await android.createNotificationChannel(
      AndroidNotificationChannel(
        'push_connexion_messages',
        'Messages',
        description: 'Messages de CONNEXION PROPHÉTIQUE',
        importance: Importance.high,
        playSound: true,
        sound: RawResourceAndroidNotificationSound(ressourceSon),
      ),
    );
  } catch (_) {}
}

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
    debugPrint('Poussée en arrière-plan ignorée : Firebase non initialisé.');
    return;
  }
  // Appel entrant, 20 nov. 2026 : écran d'appel natif Android,
  // jamais sur le web. En cas d'échec, repli sur la notification
  // locale ci-dessous, avec le nom de l'appelant, pour ne jamais
  // perdre l'appel : le code ci-dessous ne montre rien pour un
  // message de données seul, d'où le titre et le corps construits
  // ici quand le message n'en porte pas.
  final donnees = PushNotifications._data(message);
  if (!kIsWeb &&
      Platform.isAndroid &&
      donnees['type'] == 'appel_entrant') {
    // Acceptation à froid, carte 164 : cet isolate démarre sans
    // l'application, l'exécuteur d'arrière-plan CallKit n'est
    // donc jamais enregistré, et l'acceptation serait perdue.
    // On l'enregistre ici, avant d'afficher l'appel entrant.
    try {
      await FlutterCallkitIncoming.onBackgroundMessage(
        gererEvenementAppelArrierePlan,
      );
    } catch (_) {
      // Voir ci-dessus : l'appel s'affiche quand même.
    }
    if (await _montrerAppelNatif(donnees)) return;
  }
  // Carte 1, 21 nov. 2026 : vérifier la permission avant
  // d'afficher, et journaliser au lieu de passer sous silence.
  // Sans permission, le système bloquerait l'affichage de toute
  // façon, et un appel perdu sans trace ne se diagnostique pas.
  try {
    final reglages =
        await FirebaseMessaging.instance.getNotificationSettings();
    final autorisee =
        reglages.authorizationStatus == AuthorizationStatus.authorized ||
            reglages.authorizationStatus == AuthorizationStatus.provisional;
    if (!autorisee) {
      debugPrint(
          'Poussée en arrière-plan ignorée : notifications non autorisées.');
      return;
    }
  } catch (e) {
    debugPrint(
        'Poussée en arrière-plan : permission illisible, affichage tenté quand même.');
  }
  try {
    final plugin = FlutterLocalNotificationsPlugin();
    const android = AndroidInitializationSettings('@mipmap/ic_launcher');
    await plugin.initialize(const InitializationSettings(android: android));
    final estAppel = donnees['type'] == 'appel_entrant';
    // Carte 1, 21 nov. 2026 : un message de données seul n'est
    // plus abandonné quand le corps est vide. Le titre et le
    // corps sont construits depuis les données (titre, message),
    // comme c'est déjà fait pour l'appel ci-dessous, sinon le
    // titre de l'application seul. Un message sans rien montre
    // quand même sa notification, le toucher ouvre la page.
    final titreDonnees = donnees['titre'] ?? '';
    final messageDonnees = donnees['message'] ?? '';
    final title = message.notification?.title ??
        (titreDonnees.isNotEmpty
            ? titreDonnees
            : (estAppel ? 'Appel entrant' : 'CONNEXION PROPHÉTIQUE'));
    final appelantNom = donnees['appelant_nom'] ?? '';
    final body = message.notification?.body ??
        (messageDonnees.isNotEmpty
            ? messageDonnees
            : (estAppel
                ? (appelantNom.isNotEmpty
                    ? '$appelantNom vous appelle'
                    : 'Un membre vous appelle')
                : ''));
    // Messages, carte 4, 21 nov. 2026 : les messages de données
    // seuls s'affichent sur le canal dédié, avec le son choisi
    // par le membre, les autres sur le canal général.
    final estMessage = donnees['type'] == 'nouveau_message';
    await plugin.show(
      message.hashCode,
      title,
      body,
      NotificationDetails(
        android: AndroidNotificationDetails(
          estMessage ? 'push_connexion_messages' : 'push_connexion',
          estMessage ? 'Messages' : 'Notifications poussées',
          importance: Importance.high,
          priority: Priority.high,
        ),
      ),
      payload: jsonEncode(message.data),
    );
  } catch (e) {
    // En arrière-plan, un échec ne doit jamais planter l'application.
    debugPrint(
        'Poussée en arrière-plan non affichée (${donnees['type'] ?? ''}) : $e');
  }
}

class PushNotifications {
  PushNotifications._() {
    // Acceptation à froid, carte 164 : l'accueil s'abonne après
    // init(), l'acceptation rejouée avant l'abonnement attend ici
    // et part au premier abonné, pour ne jamais être perdue.
    _onAppelEntrantController.onListen = () {
      final enAttente = _appelAccepteEnAttente;
      if (enAttente != null && !_onAppelEntrantController.isClosed) {
        _appelAccepteEnAttente = null;
        _onAppelEntrantController.add(enAttente);
      }
    };
  }
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

  /// Appel entrant reçu en avant-plan, 16 nov. 2026 : la page
  /// d'accueil s'y abonne et ouvre l'écran d'appel entrant, sans
  /// attendre le toucher. Émis en plus du rafraîchissement de la
  /// cloche, après le même filtre de catégorie.
  final StreamController<Map<String, String>> _onAppelEntrantController =
      StreamController<Map<String, String>>.broadcast();
  Stream<Map<String, String>> get onAppelEntrant =>
      _onAppelEntrantController.stream;

  /// Acceptation à froid en attente d'abonné, carte 164 :
  /// init() tourne sans attendre et l'accueil s'abonne plus tard,
  /// un événement émis avant l'abonnement serait perdu, le flux
  /// étant diffusé. On garde l'acceptation ici et on l'émet au
  /// premier abonné, ou aussitôt si l'accueil est déjà abonné.
  Map<String, String>? _appelAccepteEnAttente;

  /// Rejoue l'acceptation persistée à froid, carte 164 : un appel
  /// accepté depuis l'écran système quand l'application était
  /// fermée attend ici, et l'accueil ouvre l'écran d'appel
  /// entrant, qui passe directement en cours, sans relancer la
  /// sonnerie. La clé est effacée après lecture, pour ne jamais
  /// rejouer deux fois le même appel.
  Future<void> rejouerAcceptationArrierePlan() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final brut = prefs.getString(cleAppelAccepteArrierePlan);
      if (brut == null || brut.isEmpty) return;
      await prefs.remove(cleAppelAccepteArrierePlan);
      final donnees = jsonDecode(brut) as Map<String, dynamic>;
      final appelId = (donnees['appel_id'] ?? '').toString();
      if (appelId.isEmpty || _onAppelEntrantController.isClosed) return;
      _appelAccepteEnAttente = <String, String>{
        'type': 'appel_entrant',
        'appel_id': appelId,
        'appelant_nom': (donnees['appelant_nom'] ?? '').toString(),
        'conversation_id': (donnees['conversation_id'] ?? '').toString(),
        'type_appel': (donnees['type_appel'] ?? 'audio').toString(),
        'accepte_via_callkit': 'true',
      };
      if (_onAppelEntrantController.hasListener) {
        _onAppelEntrantController.add(_appelAccepteEnAttente!);
        _appelAccepteEnAttente = null;
      }
    } catch (_) {
      // Un contenu illisible ne bloque jamais le démarrage.
    }
  }

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
    // Carte 1, 21 nov. 2026 : canal 'push_connexion' créé
    // explicitement, importance haute et son, pour que les
    // messages de données affichés en arrière-plan sonnent même
    // application fermée. Sans canal explicite, Android créait
    // le canal avec ses propres réglages au premier affichage.
    // Un échec ici ne bloque jamais la poussée, l'affichage en
    // arrière-plan crée le canal avec ses propres réglages.
    try {
      final pluginLocal = FlutterLocalNotificationsPlugin();
      const androidInit =
          AndroidInitializationSettings('@mipmap/ic_launcher');
      await pluginLocal.initialize(
        const InitializationSettings(android: androidInit),
      );
      await pluginLocal
          .resolvePlatformSpecificImplementation<
              AndroidFlutterLocalNotificationsPlugin>()
          ?.createNotificationChannel(
            const AndroidNotificationChannel(
              'push_connexion',
              'Notifications poussées',
              description:
                  'Notifications poussées de CONNEXION PROPHÉTIQUE',
              importance: Importance.high,
              playSound: true,
            ),
          );
    } catch (_) {
      // Voir ci-dessus : la poussée continue sans canal explicite.
    }
    // Carte 4, 21 nov. 2026 : canal dédié des messages, avec le
    // son choisi dans Paramètres (trois notes par défaut, choisi
    // par Axel), recréé quand le membre en change, un canal déjà
    // créé ne se mettant jamais à jour. Un échec ne bloque jamais
    // la poussée, les messages sonnent alors avec le son par défaut.
    try {
      choixSons.surChangementMessage = recreerCanalMessages;
      await choixSons.appliquerCanalMessages();
    } catch (_) {
      // Voir ci-dessus : la poussée continue sans canal explicite.
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
        // Appel entrant, 16 nov. 2026 : la page d'accueil ouvre
        // l'écran d'appel entrant, en plus de la cloche.
        if (data['type'] == 'appel_entrant' &&
            !_onAppelEntrantController.isClosed) {
          _onAppelEntrantController.add(data);
        }
      });
      // Appel entrant natif, 20 nov. 2026 : acceptation depuis
      // l'écran système, Android seulement, jamais sur le web.
      // L'accueil ouvre l'écran d'appel entrant, comme pour FCM
      // avant-plan. Le sondage global toutes les 3 secondes reste
      // le repli si l'événement est manqué. Sur refus, rien à
      // envoyer : l'expiration serveur et la ligne d'appel manqué
      // couvrent le cas.
      if (!kIsWeb && Platform.isAndroid) {
        FlutterCallkitIncoming.onEvent.listen((evenement) {
          final appel = evenement;
          if (appel is CallEventActionCallAccept) {
            final parametres = appel.callKitParams;
            final supplement = parametres.extra ?? const <String, dynamic>{};
            final donnees = <String, String>{
              'type': 'appel_entrant',
              'appel_id': parametres.id,
              'appelant_nom': parametres.nameCaller ?? '',
              'conversation_id':
                  (supplement['conversation_id'] ?? '').toString(),
              'type_appel': (supplement['type_appel'] ??
                      (parametres.type == 1 ? 'video' : 'audio'))
                  .toString(),
              // Accepté déjà via CallKit, 21 nov. 2026 : l'écran
              // ouvre directement l'appel en cours, sans relancer
              // la sonnerie.
              'accepte_via_callkit': 'true',
            };
            if (!_onAppelEntrantController.isClosed) {
              _onAppelEntrantController.add(donnees);
            }
          } else if (appel is CallEventActionCallToggleHold) {
            // Mise en attente Telecom, carte 163 : un appel
            // cellulaire met notre appel en attente, et sa fin
            // le reprend. Sans cette écoute, le média
            // continuait sans pause et sans affichage. Seul
            // l'appel en cours est concerné.
            if (etatAppelGlobal.actif &&
                etatAppelGlobal.appelId == appel.id) {
              unawaited(etatAppelGlobal.mettreEnAttente(appel.isOnHold));
            }
          }
        });
        // Acceptation à froid, carte 164 : quand l'application
        // est fermée, l'acceptation part vers l'exécuteur
        // d'arrière-plan du paquet, pas vers l'écouteur
        // ci-dessus. On l'enregistre ici pour que l'exécuteur
        // soit démarré, et on rejoue l'acceptation persistée,
        // s'il y en a une.
        try {
          await FlutterCallkitIncoming.onBackgroundMessage(
            gererEvenementAppelArrierePlan,
          );
        } catch (_) {
          // Voir ci-dessus : l'acceptation en avant-plan
          // continue, l'acceptation à froid est perdue.
        }
        unawaited(rejouerAcceptationArrierePlan());
      }
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
  /// dans le tiroir, continue, sans message d'erreur visible.
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
      // C-2, 22 nov. 2026 : le jeton FCM vit dans le coffre du
      // système, plus en clair dans les préférences partagées.
      await StockageAuth.ecrire('push_fcm_token', token);
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
      final token = _token ?? await StockageAuth.lire('push_fcm_token');
      if (token != null && token.isNotEmpty && api.isConnected) {
        await api.deactivatePushToken(token);
      }
      await StockageAuth.effacer('push_fcm_token');
    } catch (_) {
      // La déconnexion continue, le jeton restant sera désactivé
      // par le serveur au premier envoi invalide.
    } finally {
      _token = null;
    }
  }
}
