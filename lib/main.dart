// CONNEXION PROPHÉTIQUE, remplacement total par la maquette,
// tranche T11, 26 nov. 2026 : ce fichier ne garde que l'amorce,
// l'état léger, la connexion et l'inscription, et les écrans
// d'accueil. La coquille vit dans lib/nouveau/. L'ancienne
// interface a été supprimée, jamais les deux en doublon.
import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:image_picker/image_picker.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'api.dart';
import 'app_models.dart';
import 'appel_en_cours.dart';
import 'bible_sync.dart';
import 'bug_reports.dart';
import 'choix_sons.dart';
import 'config_service.dart';
import 'design_config.dart';
import 'fuseau_membre.dart';
import 'i18n.dart';
import 'identifiant_connexion.dart';
import 'indicatif_pays.dart';
import 'messagerie.dart';
import 'notif_settings.dart';
import 'notifications.dart';
import 'nouveau/cache_contenus.dart';
import 'nouveau/page_abonnement.dart';
import 'nouveau/racine.dart';
import 'nouveau/service_t9.dart';
import 'push_notifications.dart';
import 'responsive.dart';
import 'retrait_chargement.dart';
import 'stockage_auth.dart';
import 'text_size.dart';
import 'ux_global.dart';
import 'verification_auth.dart';
import 'web_assets.dart';
import 'appels_screens.dart' deferred as appels;
import 'mot_de_passe_force.dart' deferred as motDePasseForce;

export 'app_models.dart';

Future<void> effacerSessionRestaureeSiPremierLancement() async {
  try {
    if (!await StockageAuth.premierLancement()) return;
    await StockageAuth.effacer('api_access_token');
    await StockageAuth.effacer('api_refresh_token');
    final prefs = await SharedPreferences.getInstance();
    // Clés de l'ancienne sauvegarde : profil et caches liés au membre,
    // drapeaux de première ouverture. Sans elles, le démarrage retombe
    // sur la présentation, les autorisations, l'écran d'ouverture avec
    // la photo, puis la connexion.
    const clesSession = <String>[
      'api_access_token',
      'api_refresh_token',
      'member',
      'paidCards',
      'pays_residence',
      'offres_emploi',
      'demandes_membres',
      'enseignements_plateforme',
      'abonnement_plateforme',
      'fiches_sante_en_attente',
      'wave_recipient',
      'wave_number',
      kPresentationApresInscriptionFlag,
      kPresentationPremiereInstallationFlag,
      'permissions_bienvenue_vues',
      'ouverture_vue',
    ];
    for (final cle in clesSession) {
      await prefs.remove(cle);
    }
  } catch (_) {
    // Nettoyage manqué : le démarrage continue, sans session
    // restaurée si les règles de sauvegarde ont déjà fait leur effet.
  }
}

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // Rapports de bug, 29 oct. 2026 : capture automatique des erreurs,
  // installée avant runApp, pour ne manquer aucune erreur de
  // démarrage. La capture ne change pas le comportement visible.
  BugReports.install();
  // Carte 116, 9 nov. 2026 : à la première ouverture après une
  // installation, toute session restaurée par une ancienne sauvegarde
  // est effacée avant tout chargement, sinon le démarrage sauterait
  // l'écran d'accueil avec la photo et arriverait sur le compte.
  await effacerSessionRestaureeSiPremierLancement();
  // Chargements locaux en parallèle, 2 nov. 2026, levier 2
  // d'optimisation du démarrage : les cinq lectures ne dépendent
  // d'aucune autre, chacune ne lit que ses propres clés
  // SharedPreferences, restoreToken les jetons, app.load le profil
  // local, textSize.load la taille du texte, notifSettings.load les
  // catégories, configService.load la configuration de version,
  // sans jamais utiliser le résultat d'une autre.
  await Future.wait([
    api.restoreToken(), // jetons serveur conservés sur l'appareil
    app.load(), // restaure profil, plan de 21 jours et journal
    textSize.load(), // taille du texte de lecture, conservée sur l'appareil
    notifSettings.load(), // réglages des notifications par catégorie, sur l'appareil
    choixSons.charger(), // choix des sons, gardés sur l'appareil seulement
    configService.load(), // version minimale en cache, repli hors ligne
  ]);
  // Rôle administrateur, 22 nov. 2026 : dérivé du jeton restauré,
  // sans appel réseau, pour que l'entrée Espace structure soit
  // visible dès l'ouverture, avant la première synchro réussie.
  app.restaurerRoleDuJeton();
  // Session définitivement perdue, 21 nov. 2026 : renouvellement
  // en échec répété. On déconnecte comme d'habitude, puis on
  // renvoie vers l'écran de connexion existant, au lieu de
  // laisser des pages vides. La déconnexion efface les jetons.
  api.onSessionExpiree = () {
    app.logout();
    cleNavigateurApp.currentState?.pushAndRemoveUntil(
      MaterialPageRoute(
          builder: (_) => const ProfilePage(initialRegister: false)),
      (_) => false,
    );
  };
  // Appel en arrière-plan, carte 4, 21 nov. 2026 : la pastille
  // « Appel en cours » rouvre l'écran d'appel, bibliothèque
  // différée, chargée à la demande comme les autres écrans.
  etatAppelGlobal.ouvrirEcran = (c) => goAppels(
        c,
        () => appels.EcranAppelEnCours(
          appelId: etatAppelGlobal.appelId,
          typeAppel: etatAppelGlobal.typeAppel,
          autreNom: etatAppelGlobal.autreNom,
          suisAppelant: etatAppelGlobal.suisAppelant,
          serviceAppel: etatAppelGlobal.service,
          signalisation: etatAppelGlobal.signalisation,
        ),
      );
  // Notifications poussées Android, 2 nov. 2026 : initialisation
  // seulement, sans demande pour un visiteur, sans jeton tant
  // qu'aucun membre n'est connecté. Sur le web, init retourne
  // aussitôt, Firebase n'est jamais initialisé. Un échec, par
  // exemple google-services.json manquant, ne bloque jamais le
  // démarrage, les notifications internes et locales continuent.
  unawaited(PushNotifications.instance.init());
  BibleSync.instance.attach(); // favoris, surlignages et taille synchronisés, 31 oct. 2026
  runApp(const ConnexionProphetiqueApp());
  // Suppression de secours de l'indicateur de chargement, 31 oct. 2026 :
  // le 31 oct. au soir, une ancienne page gardée en cache hors ligne a
  // gardé son indicateur bloqué quand la politique de sécurité a bloqué
  // son petit script interne. L'application retire donc elle-même son
  // indicateur dès son premier rendu, même si le script externe est
  // bloqué ou absent. Web seulement (garde kIsWeb, version sans effet
  // ailleurs) ; sans effet sur les builds téléphone et Windows.
  if (kIsWeb) retirerIndicateurChargementApresPremierRendu();
  // Verset du jour en notification, carte 72, 7 nov. 2026 :
  // avant, il était reprogrammé à chaque ouverture seulement si
  // la permission était déjà accordée, sans jamais la demander au
  // démarrage, et le seul endroit qui la demandait était
  // l'interrupteur de la page Bible. Résultat : sans jamais toucher
  // cet interrupteur, rien n'était programmé, jamais, alors que
  // l'option s'affichait activée par défaut. Maintenant, au
  // démarrage, si la permission manque, elle est demandée une seule
  // fois, drapeau verset_notif_permission_demandee, puis le verset
  // est programmé si elle est accordée. Jonction cartes 71 et 72,
  // fusion 71 à 79 : sur une première installation, la page de
  // bienvenue demande après la présentation, pas le démarrage.
  // L'anniversaire suit, après,
  // car scheduleWeek annule tout. Les rappels prière et Bible
  // suivent aussi, après l'anniversaire, pour la même raison.
  if (app.dailyVerseNotif) {
    unawaited(_programmerVersetEtRappels());
  } else {
    // Verset coupé, mais rappels activés : ils doivent quand même
    // être reprogrammés à l'ouverture, sans passer par scheduleWeek.
    unawaited(scheduleRappelsIfEnabled());
  }
  // Synchronisation avec le serveur de production, sans bloquer l'ouverture.
  // En cas d'échec, l'application continue avec ses données locales.
  unawaited(app.syncFromServer());
}

// ═══════════════════════════════════════════════════════════════════
// 1. JETONS DE DESIGN
// ═══════════════════════════════════════════════════════════════════
class Cp {
  Cp._();
  static const navy = Color(0xFF0F1C2E);
  static const gold = Color(0xFFE5C158); // or, 18 nov. 2026, sur fond bleu nuit uniquement
  static const goldDeep = Color(0xFFB47B17); // bronze ambré, 18 nov. 2026, textes or sur fond blanc
  static const paper = Color(0xFFF4F6F9);
  static const card = Color(0xFFFFFFFF);
  static const ink = Color(0xFF0F1C2E);
  static const inkMuted = Color(0xFF5E687C);
  static const line = Color(0xFFE4E7EF);
  static const verseTint = Color(0xFFFDF4D8);
  static const verseLine = Color(0xFFE5C158);
  static const ok = Color(0xFF1B6B3A);
  static const danger = Color(0xFFB3261E);

  static const s1 = 8.0;
  static const s2 = 16.0;
  static const s3 = 24.0;
  static const s4 = 32.0;
  static const radiusCard = 16.0;
  static const radiusTile = 14.0;
  static const touch = 48.0;
}

ThemeData buildTheme([DesignConfig? config]) {
  // Couleurs pilotées par le serveur, carte 47, 6 nov. 2026 : sans
  // config serveur, ce sont exactement les constantes Cp actuelles.
  // Les constantes Cp restent le repli, jamais modifiées.
  final design = config ?? currentDesignConfig;
  final scheme = ColorScheme(
    brightness: Brightness.light,
    primary: design.bleuNuit,
    onPrimary: Colors.white,
    secondary: design.orFonce,
    onSecondary: Colors.white,
    error: Cp.danger,
    onError: Colors.white,
    surface: design.fond,
    onSurface: Cp.ink,
  );
  // Typographie soft globale, 4 nov. 2026 : Plus Jakarta Sans
  // pour le texte, Outfit pour les titres, embarquées en assets
  // depuis le 22 nov. 2026 (MO-23), avec repli système si la
  // police n'est pas disponible hors ligne.
  // Mêmes tailles qu'avant, seuls les caractères changent.
  final textTheme = TextTheme(
    displaySmall: Ux.title(size: 28, weight: FontWeight.w900, height: 1.2),
    titleLarge: Ux.title(size: 22, height: 1.25),
    titleMedium: Ux.title(size: 16, height: 1.3),
    bodyMedium: Ux.body(size: 14, height: 1.45),
    bodySmall: Ux.body(size: 12, height: 1.4),
    labelLarge: Ux.body(size: 14, weight: FontWeight.w700, color: Cp.ink),
  );
  return ThemeData(
    useMaterial3: true,
    colorScheme: scheme,
    // Eclair au toucher, 1er nov. 2026 : par defaut, l'onde du toucher
    // Material est claire et couvre toute la tuile, ce qui donne un
    // eclair blanc a chaque clic, partout dans l'application. Onde
    // adoucie en or transparent et surbrillance supprimee, pour garder
    // un retour au toucher sans eclair.
    splashColor: design.or.withValues(alpha: 0.15),
    highlightColor: Colors.transparent,
    scaffoldBackgroundColor: design.fond,
    textTheme: textTheme,
    appBarTheme: AppBarTheme(
      backgroundColor: design.bleuNuit,
      foregroundColor: Colors.white,
      elevation: 0,
      centerTitle: false,
      titleTextStyle: Ux.title(size: 18, color: Colors.white),
    ),
    navigationBarTheme: NavigationBarThemeData(
      height: 68,
      backgroundColor: design.bleuNuit,
      indicatorColor: design.or,
      iconTheme: WidgetStateProperty.resolveWith((s) => IconThemeData(
          color: s.contains(WidgetState.selected) ? design.bleuNuit : Colors.white70, size: 24)),
      labelTextStyle: WidgetStateProperty.resolveWith((s) {
        final sel = s.contains(WidgetState.selected);
        return TextStyle(
            fontSize: 12,
            fontWeight: sel ? FontWeight.w700 : FontWeight.w500,
            color: sel ? design.or : Colors.white70);
      }),
    ),
    // Cartes douces globales, 4 nov. 2026 : coins 20, ombre douce
    // bleu nuit très légère, bordure fine gardée.
    cardTheme: CardThemeData(
      color: Cp.card,
      elevation: 2,
      shadowColor: Cp.navy.withValues(alpha: 0.08),
      margin: EdgeInsets.zero,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
        side: const BorderSide(color: Cp.line),
      ),
    ),
    // Boutons et champs doux, mêmes couleurs, coins arrondis 14.
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(14)),
    ),
    // Transitions douces entre écrans, sans ralentir : fondu
    // montant, ordre des écrans inchangé.
    pageTransitionsTheme: const PageTransitionsTheme(builders: {
      TargetPlatform.android: FadeUpwardsPageTransitionsBuilder(),
      TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
      TargetPlatform.windows: FadeUpwardsPageTransitionsBuilder(),
      TargetPlatform.macOS: FadeUpwardsPageTransitionsBuilder(),
      TargetPlatform.linux: FadeUpwardsPageTransitionsBuilder(),
    }),
    dividerTheme: const DividerThemeData(color: Cp.line, space: 1, thickness: 1),
    tabBarTheme: const TabBarThemeData(
      labelColor: Cp.gold,
      unselectedLabelColor: Colors.white70,
      indicatorColor: Cp.gold,
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════
// 2. MODÈLES ET ÉTAT (en mémoire)
// ═══════════════════════════════════════════════════════════════════
// Modèles déplacés vers lib/app_models.dart (réexporté ci-dessus) — voir ce fichier.

/// Verset du jour au démarrage, carte 72, 7 nov. 2026 : programme
/// la semaine si la permission est accordée, puis anniversaire et
/// rappels, dans l'ordre. Sans permission, rien n'est programmé,
/// sans erreur.
/// Carte 98, 8 nov. 2026 : une seule demande de permission, au
/// moment de l'installation, sur la page de bienvenue des
/// autorisations, et plus jamais ensuite. Le démarrage ne redemande
/// donc plus rien, même si la permission manque : la partie de la
/// carte 94 qui redemandait au démarrage est retirée, le drapeau
/// verset_notif_permission_demandee ne sert plus à redemander.
/// Qui a refusé à l'installation active les notifications lui-même
/// dans les réglages du téléphone, jamais par une nouvelle demande.
Future<void> _programmerVersetEtRappels() async {
  try {
    // iOS ajouté le 7 nov. 2026, mêmes réglages Darwin que le verset.
    if (defaultTargetPlatform != TargetPlatform.android && defaultTargetPlatform != TargetPlatform.iOS) return;
    await DailyVerseNotifications.instance.init();
    final granted = await DailyVerseNotifications.instance.permissionGranted();
    if (granted) {
      await DailyVerseNotifications.instance.scheduleWeek(app.lang);
    }
    await scheduleBirthdayIfSoon();
    await scheduleRappelsIfEnabled();
  } catch (_) {}
}

/// Notification locale d'anniversaire, 29 oct. 2026 : même modèle
/// que le verset du jour, téléphone seulement, programmée à
/// l'ouverture si l'anniversaire tombe dans les 7 prochains jours.
/// iOS ajouté le 7 nov. 2026, mêmes réglages Darwin que le verset.
/// Elle suit l'option du verset du jour et la même permission : si
/// la permission manque, rien n'est programmé, et la carte à
/// l'ouverture fait le travail. Appelée après scheduleWeek, jamais
/// avant, car scheduleWeek annule toutes les programmations.
Future<void> scheduleBirthdayIfSoon() async {
  try {
    if (!app.dailyVerseNotif) return;
    if (defaultTargetPlatform != TargetPlatform.android && defaultTargetPlatform != TargetPlatform.iOS) return;
    final birth = app.member?.dateNaissance;
    if (birth == null) return;
    await DailyVerseNotifications.instance.scheduleBirthday(app.lang, birth);
  } catch (_) {}
}

/// Notification locale de rappel de cotisation, 29 oct. 2026 :
/// même modèle que l'anniversaire, téléphone seulement. iOS ajouté
/// le 7 nov. 2026. Programmée à chaque synchronisation quand le
/// rappel du mois est présent, annulée dès qu'il disparaît
/// (cotisation réglée). Elle suit la même option du verset du jour
/// et la même permission : sans permission, rien n'est programmé,
/// et la cloche avec la carte font le travail. Appelée après
/// scheduleBirthdayIfSoon aux points de reprogrammation, car
/// scheduleWeek annule tout.
Future<void> scheduleCotisationIfDue() async {
  try {
    if (!app.dailyVerseNotif) return;
    if (defaultTargetPlatform != TargetPlatform.android && defaultTargetPlatform != TargetPlatform.iOS) return;
    if (app.hasCotisationReminder) {
      await DailyVerseNotifications.instance.scheduleCotisationReminder(app.lang);
    } else {
      await DailyVerseNotifications.instance.cancelCotisationReminder();
    }
  } catch (_) {}
}

/// Rappels prière du matin et Bible non lue, 3 nov. 2026 :
/// téléphone seulement, reprogrammés à chaque ouverture quand
/// la permission est déjà accordée, sans la demander au
/// démarrage, comme le verset du jour. iOS ajouté le 7 nov.
/// 2026. Appelée APRÈS scheduleWeek, jamais avant, car
/// scheduleWeek annule tout. Un rappel désactivé annule ses
/// propres programmations, pour qu'aucun rappel coupé ne
/// continue à arriver. Après un redémarrage du téléphone,
/// c'est cette reprogrammation à l'ouverture qui fait reprendre
/// les rappels.
Future<void> scheduleRappelsIfEnabled() async {
  try {
    if (defaultTargetPlatform != TargetPlatform.android && defaultTargetPlatform != TargetPlatform.iOS) return;
    if (app.priereMatinNotif) {
      await DailyVerseNotifications.instance.schedulePrayerReminder(app.lang);
    } else {
      await DailyVerseNotifications.instance.cancelPrayerReminder();
    }
    if (app.bibleNonLueNotif) {
      await DailyVerseNotifications.instance.scheduleBibleReminder(app.lang);
    } else {
      await DailyVerseNotifications.instance.cancelBibleReminder();
    }
    // Défis de prière 7 jours, 21 nov. 2026, tranches 1 à 3 de
    // l'audit du 17 nov. : reprend le rappel matinal à 6 h tant
    // que le défi est en cours, après scheduleWeek comme les
    // autres rappels, sinon scheduleWeek l'aurait annulé.
    await DailyVerseNotifications.instance.reprogrammerDefiSiActif(app.lang);
  } catch (_) {}
}

// ═══════════════════════════════════════════════════════════════════
// 2. ÉTAT LÉGER DE L'APPLICATION
// ═══════════════════════════════════════════════════════════════════
/// État léger, tranche T11 : ne restent que le profil du membre,
/// son rôle, son pays, ses établissements, ses notifications et
/// ses réglages de rappel. Tout le reste (catalogue, camps,
/// enseignements, paiements, journal, plan) vit désormais dans
/// les services de lib/nouveau/ ou côté serveur.
class AppState extends ChangeNotifier {
  Member? member;
  bool isAdmin = false;
  // Rôle exact, 28 oct. 2026 : le serveur ne donne pas les mêmes
  // droits aux deux rôles. Un administrateur d'établissement ne
  // peut ni valider un paiement, ni publier un livre, un camp, un
  // enseignement ou un responsable, ni créer un établissement.
  bool isAdminGeneral = false;
  // Administrateur d'établissement : administrateur sans être général.
  bool get isAdminEtablissement => isAdmin && !isAdminGeneral;

  String lang = 'fr';

  // Cloche de notifications internes, 29 oct. 2026 : liste lue à
  // chaque synchronisation, jamais bloquante.
  List<Map<String, dynamic>> notifications = [];
  int unreadNotifications = 0;

  /// Rappel de cotisation du mois en cours, 29 oct. 2026 : vrai
  /// quand le serveur a émis la ligne de rappel, donc à partir du
  /// 15 et tant que la cotisation n'est pas soldée.
  bool get hasCotisationReminder => notifications.any((n) => (n['type'] ?? '') == 'cotisation_rappel');

  Future<void> refreshNotifications() async {
    if (!api.isConnected) return;
    try {
      final data = await api.fetchNotifications();
      final list = data['notifications'];
      if (list is List) notifications = list.cast<Map<String, dynamic>>();
      final nonLues = (data['non_lues'] as num?)?.toInt();
      unreadNotifications = nonLues ?? notifications.where((n) => n['lue'] != true).length;
      notifyListeners();
      unawaited(scheduleCotisationIfDue());
    } catch (_) {}
  }
  Future<void> markNotificationRead(String id) async {
    final i = notifications.indexWhere((n) => (n['id'] ?? '').toString() == id);
    if (i >= 0 && notifications[i]['lue'] != true) {
      notifications[i] = {...notifications[i], 'lue': true};
      if (unreadNotifications > 0) unreadNotifications--;
      notifyListeners();
    }
    try {
      await api.markNotificationRead(id);
    } catch (_) {
      try {
        await refreshNotifications();
      } catch (_) {}
    }
  }
  Future<void> markAllNotificationsRead() async {
    for (var i = 0; i < notifications.length; i++) {
      notifications[i] = {...notifications[i], 'lue': true};
    }
    unreadNotifications = 0;
    notifyListeners();
    try {
      await api.markAllNotificationsRead();
    } catch (_) {
      try {
        await refreshNotifications();
      } catch (_) {}
    }
  }

  // Pays de résidence du membre, carte 64, 6 nov. 2026 : choisi
  // par le membre à l'inscription, dans la liste fermée
  // kPaysResidence, modifiable depuis le Profil. Vide veut dire
  // non renseigné, jamais deviné.
  String paysResidence = '';
  void setPaysResidence(String v) {
    paysResidence = v;
    notifyListeners();
    _save();
  }

  // Établissements, repli local : la liste du serveur, gardée
  // d'une synchro à l'autre pour le formulaire d'inscription.
  final etabs = <Etab>[Etab('ISPAM'), Etab('Céleste'), Etab('La Silhouette'), Etab('BNC')];

  // Notification du verset du jour, 27 oct. 2026 : activée par
  // défaut, l'utilisateur peut l'éteindre depuis la page Bible.
  bool dailyVerseNotif = true;
  void setDailyVerseNotif(bool v) {
    dailyVerseNotif = v;
    changed();
  }
  // Rappels prière du matin et Bible non lue, 3 nov. 2026 :
  // activés par défaut comme le verset du jour, réglés depuis
  // la page Réglages des notifications, téléphone seulement.
  // iOS ajouté le 7 nov. 2026.
  // Rien n'est programmé sans permission, comme le verset.
  bool priereMatinNotif = true;
  bool bibleNonLueNotif = true;
  void setPriereMatinNotif(bool v) {
    priereMatinNotif = v;
    changed();
  }

  void setBibleNonLueNotif(bool v) {
    bibleNonLueNotif = v;
    changed();
  }

  bool _syncing = false;

  void changed() {
    notifyListeners();
    _save();
  }

  /// Sauvegarde locale : uniquement les données personnelles de
  /// l'appareil, profil, pays et réglages de rappel.
  Future<void> _save() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('lang', lang);
      final m = member;
      if (m == null) {
        await prefs.remove('member');
      } else {
        await prefs.setString('member', jsonEncode({'name': m.name, 'mat': m.matricule, 'etab': m.etab, 'fonction': m.fonction, 'ministere': m.ministere, 'photo': m.photoPath, 'photoData': m.photoData, 'since': m.since.toIso8601String(), 'validUntil': m.validUntilOverride?.toIso8601String(), 'birth': m.dateNaissance?.toIso8601String(), 'tel': m.telephone, 'anneeAdhesion': m.anneeAdhesion, 'statutAdhesion': m.statutAdhesion, 'ville': m.ville, 'email': m.email}));
      }
      await prefs.setStringList('etabs', etabs.map((e) => jsonEncode({'name': e.name, 'id': e.id, 'imagePath': e.imagePath, 'imageUrl': e.imageUrl, 'activities': e.activities.map((a) => {'title': a.title, 'imagePath': a.imagePath, 'imageUrl': a.imageUrl, 'serverId': a.serverId}).toList()})).toList());
      await prefs.setString('pays_residence', paysResidence);
      await prefs.setBool('daily_verse_notif', dailyVerseNotif);
      await prefs.setBool('priere_matin_notif', priereMatinNotif);
      await prefs.setBool('bible_non_lue_notif', bibleNonLueNotif);
    } catch (_) {
      // Échec de sauvegarde : l'application continue de fonctionner en mémoire.
    }
  }

  Future<void> load() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final savedLang = prefs.getString('lang');
      if (savedLang == 'fr' || savedLang == 'en') { lang = savedLang!; setCurrentLang(lang); }
      paysResidence = prefs.getString('pays_residence') ?? '';
      dailyVerseNotif = prefs.getBool('daily_verse_notif') ?? true;
      priereMatinNotif = prefs.getBool('priere_matin_notif') ?? true;
      bibleNonLueNotif = prefs.getBool('bible_non_lue_notif') ?? true;
      final m = prefs.getString('member');
      if (m != null) {
        final j = jsonDecode(m) as Map<String, dynamic>;
        final validSaved = j['validUntil'] as String?;
        member = Member(j['name'] as String, j['mat'] as String, j['etab'] as String, DateTime.parse(j['since'] as String), fonction: (j['fonction'] as String?) ?? '', ministere: (j['ministere'] as String?) ?? '', photoPath: (j['photo'] as String?) ?? '', photoData: (j['photoData'] as String?) ?? '', validUntilOverride: validSaved == null ? null : DateTime.tryParse(validSaved), dateNaissance: (j['birth'] as String?) == null ? null : DateTime.tryParse(j['birth'] as String), telephone: (j['tel'] as String?) ?? '', anneeAdhesion: (j['anneeAdhesion'] as num?)?.toInt(), statutAdhesion: (j['statutAdhesion'] as String?) ?? '', ville: (j['ville'] as String?) ?? '', email: (j['email'] as String?) ?? '');
      }
      final savedEtabs = prefs.getStringList('etabs');
      if (savedEtabs != null && savedEtabs.isNotEmpty) {
        etabs
          ..clear()
          ..addAll(savedEtabs.map((x) {
            try {
              final j = jsonDecode(x) as Map<String, dynamic>;
              final e = Etab((j['name'] ?? '').toString(), id: (j['id'] ?? '').toString(), imagePath: (j['imagePath'] ?? '').toString(), imageUrl: (j['imageUrl'] ?? '').toString());
              final acts = j['activities'];
              if (acts is List) {
                for (final a in acts) {
                  if (a is Map) e.activities.add(ActivityItem((a['title'] ?? '').toString(), imagePath: (a['imagePath'] ?? '').toString(), imageUrl: (a['imageUrl'] ?? '').toString(), serverId: (a['serverId'] ?? '').toString()));
                }
              }
              return e;
            } catch (_) {
              return null;
            }
          }).whereType<Etab>());
      }
    } catch (_) {
      // Chargement local en échec : l'application démarre sans
      // profil local, la connexion suit.
    }
  }

  void restaurerRoleDuJeton() {
    final role = api.role;
    isAdmin = role == 'admin_general' || role == 'admin_etablissement';
    isAdminGeneral = role == 'admin_general';
    notifyListeners();
  }
  Future<bool> syncServerProfile() async {
    if (!api.isConnected) return false;
    try {
      final moi = await api.fetchMoi();
      final matricule = (moi['matricule'] ?? '').toString();
      final name = (moi['nom_complet'] ?? '').toString();
      if (matricule.isEmpty || name.isEmpty) return false;
      final etab = (moi['etablissement'] ?? '').toString();
      final valide = DateTime.tryParse((moi['valide_jusqua'] ?? '').toString());
      final inscrit = DateTime.tryParse((moi['inscrit_le'] ?? '').toString()) ?? DateTime.now();
      final old = member;
      final serverPhoto = (moi['photo'] ?? '').toString();
      final serverFonction = (moi['fonction'] ?? '').toString();
      if (serverFonction.isEmpty && (old?.fonction ?? '').isNotEmpty && kFonctions.contains(old!.fonction)) {
        unawaited(api.updateFonction(old.fonction));
      }
      // Correctif anniversaire, 4 nov. 2026 : avant, cette
      // reconstruction oubliait dateNaissance (et telephone), puis
      // _save() persistait ce membre sans date. Chaque
      // synchronisation effaçait donc la date venue de /moi, y
      // compris celle que la connexion venait de lire, et la carte
      // ne pouvait plus jamais apparaître, ni sur web ni en APK.
      // La date serveur fait foi quand elle est présente, sinon
      // l'ancienne date locale est gardée, jamais effacée ici.
      final birthRaw = (moi['date_naissance'] ?? '').toString();
      final birth = birthRaw.isEmpty ? null : DateTime.tryParse(birthRaw);
      final anneeRaw = moi['annee_adhesion'];
      final anneeServeur = anneeRaw is num ? anneeRaw.toInt() : int.tryParse((anneeRaw ?? '').toString());
      member = Member(
        name,
        matricule,
        etab.isEmpty ? (old?.etab ?? '') : etab,
        inscrit,
        fonction: serverFonction.isNotEmpty ? serverFonction : (old?.fonction ?? ''),
        ministere: old?.ministere ?? '',
        photoPath: serverPhoto.isNotEmpty ? '' : (old?.photoPath ?? ''),
        photoData: serverPhoto,
        validUntilOverride: valide,
        dateNaissance: birth ?? old?.dateNaissance,
        telephone: (moi['telephone'] ?? '').toString().isNotEmpty
            ? (moi['telephone'] ?? '').toString()
            : (old?.telephone ?? ''),
        anneeAdhesion: anneeServeur ?? old?.anneeAdhesion,
        // Carte 110, 8 nov. 2026 : statut d'adhésion venu de /moi.
        // La valeur serveur fait foi quand elle est présente,
        // sinon l'ancienne valeur est gardée, jamais effacée ici.
        statutAdhesion: (moi['statut_adhesion'] ?? '').toString().isNotEmpty
            ? (moi['statut_adhesion'] ?? '').toString()
            : (old?.statutAdhesion ?? ''),
        ville: (moi['ville'] ?? '').toString(),
        email: (moi['email'] ?? '').toString(),
      );
      final role = api.role;
      isAdmin = role == 'admin_general' || role == 'admin_etablissement';
      isAdminGeneral = role == 'admin_general';
      notifyListeners();
      await _save();
      // Fuseau du 4 nov. 2026 : à chaque synchronisation, l'appareil
      // renvoie son fuseau courant au serveur, sans GPS, sans pays
      // deviné. Si l'appareil a changé de fuseau, le serveur est
      // mis à jour ; sinon la mise à jour est sans effet.
      unawaited(api.updateFuseau(fuseauAppareilLabel(), fuseauDecalageMinutes()));
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Membre créé depuis la réponse serveur d'inscription ou de connexion.
  Future<void> setServerMember(Map<String, dynamic> moi,
      {String fonction = '', String ministere = '', String photoPath = ''}) async {
    final matricule = (moi['matricule'] ?? '').toString();
    final name = (moi['nom_complet'] ?? '').toString();
    final etab = (moi['etablissement'] ?? '').toString();
    final valide = DateTime.tryParse((moi['valide_jusqua'] ?? '').toString());
    final inscrit = DateTime.tryParse((moi['inscrit_le'] ?? '').toString()) ?? DateTime.now();
    // Photo serveur d'abord : un membre qui se reconnecte retrouve
    // la photo envoyée avant, même si la déconnexion a effacé le
    // profil local. Sans photo serveur, on garde celle du formulaire.
    final serverPhoto = (moi['photo'] ?? '').toString();
    final serverFonction = (moi['fonction'] ?? '').toString();
    final oldFonction = member?.matricule == matricule ? (member?.fonction ?? '') : '';
    // Date de naissance venue du serveur, 29 oct. 2026 : seuls le
    // mois et le jour seront comparés, jamais l'année ni un âge.
    // Une chaîne vide ou absente donne null, pas d'erreur.
    final birthRaw = (moi['date_naissance'] ?? '').toString();
    final birth = birthRaw.isEmpty ? null : DateTime.tryParse(birthRaw);
    final anneeRaw2 = moi['annee_adhesion'];
    final anneeServeur2 = anneeRaw2 is num ? anneeRaw2.toInt() : int.tryParse((anneeRaw2 ?? '').toString());
    // Pays de résidence venu du serveur, cartes 64 et 127 : la
    // colonne existe depuis la carte 127. Un pays serveur non
    // vide l'emporte, sinon le pays local choisi à l'inscription
    // est gardé, jamais effacé ici. La valeur serveur, en
    // majuscules, est ramenée à l'entrée canonique de la liste.
    final paysServeur = (moi['pays_residence'] ?? moi['pays'] ?? '').toString();
    if (paysServeur.isNotEmpty) paysResidence = paysResidenceCanonique(paysServeur);
    member = Member(name, matricule, etab, inscrit,
        fonction: serverFonction.isNotEmpty ? serverFonction : (fonction.isNotEmpty ? fonction : oldFonction), ministere: ministere,
        photoPath: serverPhoto.isNotEmpty ? '' : photoPath, photoData: serverPhoto, validUntilOverride: valide, dateNaissance: birth, telephone: (moi['telephone'] ?? '').toString(), anneeAdhesion: anneeServeur2, statutAdhesion: (moi['statut_adhesion'] ?? '').toString(), ville: (moi['ville'] ?? '').toString(), email: (moi['email'] ?? '').toString());
    final role = api.role;
    isAdmin = role == 'admin_general' || role == 'admin_etablissement';
    isAdminGeneral = role == 'admin_general';
    notifyListeners();
    await _save();
    // Fuseau à la connexion, même règle que ci-dessus : l'appareil
    // envoie son fuseau courant, le serveur le stocke pour le
    // courriel d'anniversaire, sans GPS, sans pays deviné.
    unawaited(api.updateFuseau(fuseauAppareilLabel(), fuseauDecalageMinutes()));
  }
  Future<bool> uploadMemberPhotoData(String dataUrl) async {
    if (member == null) return false;
    try {
      final saved = await api.uploadMemberPhoto(dataUrl);
      if (saved == null || saved.isEmpty) return false;
      member = member!.withServerPhoto(saved);
      notifyListeners();
      await _save();
      return true;
    } catch (_) {
      return false;
    }
  }
  void updateLocalProfile({String? fonction, String? ministere, DateTime? dateNaissance, bool clearBirth = false, int? anneeAdhesion, String? telephone, String? paysResidence}) {
    if (member == null) return;
    final m = member!;
    // Pays de résidence, carte 64 : gardé ici aussi, pour que
    // chaque mise à jour locale ne l'efface pas.
    if (paysResidence != null) this.paysResidence = paysResidence;
    // Tranche carte, 4 nov. 2026 : le telephone et l'annee d'adhesion
    // sont conserves ici, sinon chaque mise a jour locale les
    // effacait, le telephone n'etant meme pas repris avant.
    member = Member(m.name, m.matricule, m.etab, m.since, fonction: fonction ?? m.fonction, ministere: ministere ?? m.ministere, photoPath: m.photoPath, photoData: m.photoData, validUntilOverride: m.validUntilOverride, dateNaissance: clearBirth ? null : (dateNaissance ?? m.dateNaissance), telephone: telephone ?? m.telephone, anneeAdhesion: anneeAdhesion ?? m.anneeAdhesion, statutAdhesion: m.statutAdhesion, ville: m.ville, email: m.email);
    notifyListeners();
    _save();
  }

  /// Synchronisation légère, tranche T11 : santé, profil, version
  /// minimale, établissements et contenus publics vers le cache
  /// local, puis cloche. Un échec ne vide jamais le contenu local.
  Future<void> syncFromServer() async {
    if (_syncing) return;
    _syncing = true;
    try {
      var ok = false;
      for (var attempt = 0; attempt < 2 && !ok; attempt++) {
        try {
          ok = await api.checkHealth();
        } catch (_) {
          ok = false;
        }
        if (!ok && attempt == 0) await Future.delayed(const Duration(seconds: 3));
      }
      if (!ok) return;
      await syncServerProfile();
      await configService.apply(await api.fetchVersionConfig());
      try {
        final cache = CacheContenus(api);
        final etabsJson = await cache.chargerEtablissements();
        if (etabsJson.isNotEmpty) {
          final anciennesActivites = {for (final e in etabs) if (e.id.isNotEmpty) e.id: e.activities};
          etabs.clear();
          for (final e in etabsJson) {
            final id = (e['id'] ?? '').toString();
            final name = (e['nom'] ?? '').toString();
            final etab = Etab(name, id: id, imageUrl: (e['image_id'] ?? '').toString().isEmpty ? '' : '$kApiBaseUrl/fichiers/${e['image_id']}');
            final anciennes = id.isEmpty ? null : anciennesActivites[id];
            if (anciennes != null) etab.activities.addAll(anciennes);
            etabs.add(etab);
          }
        }
        await cache.chargerEvenements();
        await cache.chargerActualites();
      } catch (_) {}
      await refreshNotifications();
      notifyListeners();
      await _save();
    } finally {
      _syncing = false;
    }
  }

  void logout() {
    member = null;
    isAdmin = false;
    isAdminGeneral = false;
    notifyListeners();
    _save();
    // Déconnexion serveur aussi, sans bloquer l'interface.
    // La poussée est désactivée d'abord, tant que le jeton serveur
    // est encore présent, puis la déconnexion serveur suit, dans
    // cet ordre, pour que la désactivation ne soit pas rejetée
    // comme non authentifiée. Un échec de désactivation ne bloque
    // jamais la déconnexion.
    unawaited(PushNotifications.instance
        .unregisterBeforeLogout()
        .then((_) => api.logout()));
    // Rapports de bug en attente, 29 oct. 2026 : effacés, pour ne
    // pas les envoyer sous un autre compte à la prochaine connexion.
    unawaited(BugReports.instance.clearPending());
  }
}

final app = AppState();
// Clé de navigation globale, 21 nov. 2026 : sert au renvoi vers
// l'écran de connexion quand la session est définitivement perdue
// (renouvellement en échec répété), sans contexte à portée.
final GlobalKey<NavigatorState> cleNavigateurApp = GlobalKey<NavigatorState>();

void go(BuildContext c, Widget page) => Navigator.of(c).push(MaterialPageRoute(builder: (_) => page));
const _cheminsConnus = {'', '/', '/index.html', '/bible', '/librairie', '/carte'};

bool cheminAppConnu(String chemin) {
  var c = chemin;
  if (c.length > 1 && c.endsWith('/')) c = c.substring(0, c.length - 1);
  return _cheminsConnus.contains(c);
}

void goAppels(BuildContext c, Widget Function() page) =>
    go(c, _ChargementDifferePage(page: page, charger: appels.loadLibrary));

class _ChargementDifferePage extends StatefulWidget {
  const _ChargementDifferePage({required this.page, required this.charger});
  final Widget Function() page;
  final Future<void> Function() charger;
  @override
  State<_ChargementDifferePage> createState() => _ChargementDifferePageState();
}

class _ChargementDifferePageState extends State<_ChargementDifferePage> {
  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    try {
      await widget.charger();
    } catch (_) {
      if (!mounted) return;
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(
          builder: (_) => _ErreurChargementDifferePage(page: widget.page, charger: widget.charger),
        ),
      );
      return;
    }
    if (!mounted) return;
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(builder: (_) => widget.page()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const CircularProgressIndicator(),
            const SizedBox(height: 16),
            Text(tr('Chargement…')),
          ],
        ),
      ),
    );
  }
}

class _ErreurChargementDifferePage extends StatelessWidget {
  const _ErreurChargementDifferePage({required this.page, required this.charger});
  final Widget Function() page;
  final Future<void> Function() charger;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                tr('Impossible de charger cette page. Vérifiez votre connexion, puis réessayez.'),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: () => Navigator.of(context).pushReplacement(
                  MaterialPageRoute(
                    builder: (_) => _ChargementDifferePage(page: page, charger: charger),
                  ),
                ),
                child: Text(tr('Réessayer')),
              ),
            ],
          ),
        ),
      ),
    );
  }
}


void toast(BuildContext c, String m) =>
    ScaffoldMessenger.of(c).showSnackBar(SnackBar(content: Text(m)));
Widget live(Widget Function(BuildContext) build) =>
    ListenableBuilder(listenable: app, builder: (c, _) => build(c));
/// Cadre fin, tranche T11 : l'ancienne coquille (tiroir, onglets,
/// barre du haut) a disparu avec l'ancienne version. Il ne reste
/// qu'un Scaffold avec une barre de titre et le corps, pour les
/// deux pages qui l'utilisaient encore, la bienvenue des
/// autorisations et le formulaire de connexion et d'inscription.
Widget basic(String title, List<Widget> children) {
  return Scaffold(
    backgroundColor: Cp.paper,
    appBar: AppBar(
      backgroundColor: Cp.navy,
      foregroundColor: Colors.white,
      title: Text(title),
    ),
    body: SingleChildScrollView(
      padding: const EdgeInsets.all(Cp.s3),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: children,
      ),
    ),
  );
}

/// Racine de la nouvelle coquille, tranche T11 : la coquille
/// lib/nouveau/ remplace l'ancienne AppShell, avec les services
/// réels et les vrais flux de déconnexion et de suppression.
Widget _racineNouvelle() => RacineNouvelle(
      membre: app.member,
      nonLus: MessagerieLectureService.instance.nonLusNotifier,
      onDeconnexion: _deconnecter,
      onSupprimerCompte: _supprimerCompteDepuisRacine,
    );

/// Accueil ou connexion : la coquille quand un membre est
/// connecté, le formulaire de connexion sinon.
Widget _accueilOuConnexion() =>
    app.member != null ? _racineNouvelle() : const ProfilePage(initialRegister: false);

void _deconnecter() {
  app.logout();
  cleNavigateurApp.currentState?.pushAndRemoveUntil(
    MaterialPageRoute(builder: (_) => const ProfilePage()),
    (_) => false,
  );
}

void _supprimerCompteDepuisRacine() {
  final c = cleNavigateurApp.currentContext;
  if (c != null) unawaited(supprimerMonCompte(c));
}

class ConnexionProphetiqueApp extends StatelessWidget {
  const ConnexionProphetiqueApp({super.key});

  // Taille du texte globale, 1er nov. 2026 : le textScaler du systeme
  // est multiplie par le facteur du reglage, jamais remplace, pour
  // que tout le texte de l'application suive le reglage, comme sur
  // l'artefact, sans neutraliser l'accessibilite du systeme.
  @override
  Widget build(BuildContext context) => ListenableBuilder(
        // Carte 47, 6 nov. 2026 : le thème lit la config design
        // courante, donc l'application se reconstruit aussi quand
        // AppState change, pour appliquer une couleur serveur sans
        // redémarrage. Sans config serveur, les couleurs sont
        // identiques aux constantes Cp, rien ne change à l'écran.
        // Config de version, 16 nov. 2026 : la reconstruction suit
        // aussi configService, pour afficher l'écran de mise à jour
        // obligatoire dès que la synchronisation le déclenche.
        listenable: Listenable.merge([textSize, app, configService]),
        // Responsive global, 4 nov. 2026 : base 360 px, adaptation
        // texte minimale. Les largeurs fixes existantes ne sont pas
        // converties, seuls les nouveaux widgets UX utilisent .h/.w,
        // pour ne pas déformer les écrans ordinateur existants.
        builder: (context, _) => ScreenUtilInit(
          designSize: const Size(360, 690),
          minTextAdapt: true,
          splitScreenMode: true,
          builder: (context, _) => MaterialApp(
          navigatorKey: cleNavigateurApp,
          title: 'Connexion Prophétique',
          debugShowCheckedModeBanner: false,
          theme: buildTheme(),
          scrollBehavior: AppScrollBehavior(),
          builder: (context, child) {
            // scale(1.0) donne le facteur systeme effectif ; on le
            // multiplie par le facteur du reglage, sans le remplacer.
            final facteur = MediaQuery.of(context).textScaler.scale(1.0) * textSize.factor;
            // Mise à jour obligatoire, 16 nov. 2026 : quand la
            // version installée est inférieure à la version minimale
            // du serveur, l'écran de mise à jour remplace tout le
            // contenu, sans barre du bas ni retour possible. Le
            // réglage de taille du texte s'applique aussi à cet écran.
            final contenu = configService.mustUpdate
                ? UpdateRequiredScreen(updateUrl: configService.current.updateUrl)
                : (child ?? const SizedBox.shrink());
            return MediaQuery(
              data: MediaQuery.of(context).copyWith(
                textScaler: TextScaler.linear(facteur),
              ),
              child: contenu,
            );
          },
          home: const SplashScreen(),
        ),
      ),
      );
}

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with SingleTickerProviderStateMixin {
  bool _navigated = false;
  late final AnimationController _controller;
  late final Animation<double> _logoOpacity;
  late final Animation<double> _lineOpacity;
  late final Animation<double> _textOpacity;

  @override
  void initState() {
    super.initState();
    // Écran de démarrage fixe, 28 oct. 2026 : le fondu par étapes
    // (logo, puis trait or, puis texte) scintillait sur l'écran de
    // démarrage. Le logo, le trait et le texte s'affichent donc
    // d'emblée à pleine opacité, sans fondu, puis passage à l'accueil
    // comme avant (1,8 s au total).
    _controller = AnimationController(vsync: this, duration: const Duration(milliseconds: 1400));
    _logoOpacity = Tween<double>(begin: 0, end: 1).animate(CurvedAnimation(parent: _controller, curve: const Interval(0, 0.5, curve: Curves.easeOut)));
    // Pas d'agrandissement pendant l'animation, 27 oct. 2026 : le
    // scale 0,92 vers 1,0 forçait l'image à être redessinée à une
    // taille intermédiaire, ce qui floutait les traits fins du C
    // et faisait disparaître la flamme. Fondu seul, taille finale
    // dès le premier affichage, donc net dès le départ.
    _lineOpacity = Tween<double>(begin: 0, end: 1).animate(CurvedAnimation(parent: _controller, curve: const Interval(0.45, 0.75, curve: Curves.easeOut)));
    _textOpacity = Tween<double>(begin: 0, end: 1).animate(CurvedAnimation(parent: _controller, curve: const Interval(0.6, 1, curve: Curves.easeOut)));
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final reduceMotion = MediaQuery.of(context).disableAnimations;
      // Affichage d'emblée, sans fondu : voir le commentaire ci-dessus.
      _controller.value = 1;
      // Tenue de l'écran de démarrage, 2 nov. 2026, levier 1
      // d'optimisation du chargement web : sur le web seulement,
      // 300 ms au lieu de 1800 ms, le moteur a déjà démarré quand
      // cet écran s'affiche. Sur téléphone, 1800 ms inchangés.
      // En mode mouvement réduit, 300 ms partout, comme avant.
      Future.delayed(
        Duration(milliseconds: reduceMotion ? 300 : (kIsWeb ? 300 : 1800)),
        _goHome,
      );
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _goHome() async {
    if (_navigated || !mounted) return;
    _navigated = true;
    // Adresse inconnue, web seulement, 22 nov. 2026 : la page
    // « non trouvée » remplace l'accueil, avec un retour vers
    // l'accueil, au lieu d'ouvrir l'accueil comme si de rien n'était.
    if (kIsWeb && !cheminAppConnu(Uri.base.path)) {
      if (mounted) {
        Navigator.of(context).pushReplacement(PageRouteBuilder(
          transitionDuration: Duration.zero,
          pageBuilder: (_, __, ___) => const PageNonTrouvee(),
          transitionsBuilder: (_, __, ___, child) => child,
        ));
      }
      return;
    }
    // Passage instantané, sans fondu : le fondu de 400 ms mélangeait
    // le bleu nuit de l'écran de démarrage avec le fond clair de
    // l'accueil, ce qui scintillait sur APK. Coupure nette, comme
    // un écran de démarrage classique.
    Widget next = _accueilOuConnexion();
    // Présentation de première installation, carte 71, 7 nov. 2026 :
    // comme toutes les applications du marché, elle s'active au
    // premier lancement après l'installation, avant la connexion
    // et l'inscription, une seule fois, drapeau local, jamais à
    // chaque visite. Carte 99, 8 nov. 2026 : APK seulement, jamais
    // sur le web, où l'on arrive directement à la connexion et à
    // l'inscription. Android ne permet pas de la montrer pendant
    // l'installation elle-même, c'est donc le premier lancement
    // qui la porte, comme les autorisations. La page marque
    // elle-même le drapeau, puis mène à la suite, autorisations,
    // ouverture, connexion.
    if (presentationActive(isWeb: kIsWeb, dejaVue: await presentationDejaVue())) {
      next = const PresentationApresInscriptionPage(premiereInstallation: true);
      if (mounted) {
        Navigator.of(context).pushReplacement(PageRouteBuilder(
          transitionDuration: Duration.zero,
          pageBuilder: (_, __, ___) => next,
          transitionsBuilder: (_, __, ___, child) => child,
        ));
      }
      return;
    }
    // Écran de bienvenue des autorisations, 29 oct. 2026 : téléphone
    // seulement, premier lancement seulement. iOS ajouté le 7 nov.
    // 2026. Ni Android ni iOS ne permettent de demander les
    // autorisations pendant l'installation elle-même, c'est donc
    // le premier lancement qui les porte. Sur le web, jamais affiché.
    // L'écran d'ouverture reste réservé à Android (APK), jamais sur iOS.
    if (!kIsWeb && (defaultTargetPlatform == TargetPlatform.android || defaultTargetPlatform == TargetPlatform.iOS)) {
      try {
        final prefs = await SharedPreferences.getInstance();
        if (prefs.getBool('permissions_bienvenue_vues') != true) {
          next = const PermissionsWelcomePage();
        } else if (defaultTargetPlatform == TargetPlatform.android && app.member == null && prefs.getBool('ouverture_vue') != true) {
          next = const OuverturePage();
        } else if (app.member == null) {
          // Vitrine web seulement, 1er nov. 2026 : sur application,
          // sans membre et écran d'ouverture déjà vu, on arrive
          // directement sur la connexion, jamais sur la vitrine.
          next = const ProfilePage(initialRegister: false);
        }
      } catch (_) {}
    }
    if (!mounted) return;
    Navigator.of(context).pushReplacement(PageRouteBuilder(
      transitionDuration: Duration.zero,
      pageBuilder: (_, __, ___) => next,
      transitionsBuilder: (_, __, ___, child) => child,
    ));
  }

  @override
  Widget build(BuildContext context) {
    // Logo de démarrage, 27 oct. 2026 : avant, largeur fixe de 200,
    // minuscule sur tablette, comme sur la capture d'Axel. Le logo
    // fait maintenant 70 % de la largeur de l'écran, entre 240 et
    // 420, pour être bien visible sur téléphone comme sur tablette.
    // Plafond à 420 : le fichier officiel ne fait que 703 x 221,
    // l'afficher plus grand sur un écran dense le rendrait flou.
    // Un fichier logo plus grand, fourni par la structure,
    // permettrait de relever ce plafond sans perte de netteté.
    final logoWidth = (MediaQuery.of(context).size.width * 0.7).clamp(240.0, 420.0);
    return GestureDetector(
      onTap: _goHome,
      child: Scaffold(
        backgroundColor: Cp.navy,
        body: SafeArea(
          child: Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                AnimatedBuilder(
                  animation: _controller,
                  builder: (_, child) => Opacity(
                    opacity: _logoOpacity.value,
                    child: child,
                  ),
                  child: WebAssetImage(
                      asset: 'assets/logo.png',
                      partUrls: kLogoParts,
                      width: logoWidth,
                      filterQuality: FilterQuality.high,
                      fallback: Text('Connexion\nProphétique',
                          textAlign: TextAlign.center,
                          style: TextStyle(color: Colors.white, fontSize: 30, fontWeight: FontWeight.w700))),
                ),
                const SizedBox(height: Cp.s3),
                AnimatedBuilder(
                  animation: _controller,
                  builder: (_, child) => Opacity(opacity: _lineOpacity.value, child: child),
                  child: Container(width: 64, height: 3, color: Cp.gold),
                ),
                const SizedBox(height: Cp.s2),
                AnimatedBuilder(
                  animation: _controller,
                  builder: (_, child) => Opacity(opacity: _textOpacity.value, child: child),
                  child: Text(tr('Former pour mieux servir'),
                      style: TextStyle(color: Cp.gold, fontSize: 16, fontWeight: FontWeight.w700, letterSpacing: 0.5)),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// Page « non trouvée » de l'application web, audit de lancement,
// 22 nov. 2026 : l'hébergeur sert l'application pour toute adresse,
// une adresse inconnue affiche donc cette page, avec un retour
// vers l'accueil, au lieu d'ouvrir l'accueil comme si de rien n'était.
class PageNonTrouvee extends StatelessWidget {
  const PageNonTrouvee({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Cp.paper,
      appBar: AppBar(
        backgroundColor: Cp.navy,
        foregroundColor: Colors.white,
        title: Text(tr('Page non trouvée')),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                tr('Cette page n’existe pas ou a été déplacée.'),
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 17),
              ),
              const SizedBox(height: 24),
              SizedBox(
                height: 52,
                child: FilledButton(
                  onPressed: () => Navigator.of(context).pushReplacement(
                    MaterialPageRoute(builder: (_) => _accueilOuConnexion()),
                  ),
                  child: Text(tr('Retour à l’accueil')),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// Autorisations au moment de l'utilisation, carte 71, 7 nov. 2026 :
// comme toutes les applications du marché, une autorisation n'est
// demandée qu'au moment où la fonctionnalité qui en a besoin est
// sollicitée, jamais toutes au lancement, sauf la notification,
// qui sert les rappels. Courte explication avant la demande
// système, refus ne bloque jamais l'application, et refus
// définitif renvoie vers les réglages du téléphone, où
// l'autorisation pourra être activée plus tard. Sur le web, le
// sélecteur du navigateur demande lui-même, rien n'est demandé
// ici. Microphone et localisation : aucune fonctionnalité de
// l'application ne les utilise aujourd'hui, donc rien n'est
// demandé pour eux ; une future fonctionnalité suivra la même
// règle, au moment de son utilisation. Fichiers : FilePicker
// passe par le sélecteur du système, sans autorisation à demander.
Future<bool> demanderPermissionAuMoment(
  BuildContext context,
  Permission permission, {
  required String titre,
  required String explication,
}) async {
  if (kIsWeb) return true;
  PermissionStatus statut;
  try {
    statut = await permission.status;
  } catch (_) {
    return true;
  }
  if (statut.isGranted || statut == PermissionStatus.limited) return true;
  if (statut.isPermanentlyDenied || statut == PermissionStatus.restricted) {
    if (!context.mounted) return false;
    final ouvrir = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(titre),
        content: Text(tr('Cette autorisation est refusée sur ce téléphone. Active-la dans les réglages du téléphone pour utiliser cette fonctionnalité.')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Plus tard'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Ouvrir les réglages'))),
        ],
      ),
    );
    if (ouvrir == true) {
      try {
        await openAppSettings();
      } catch (_) {}
    }
    return false;
  }
  if (context.mounted) {
    final continuer = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(titre),
        content: Text(explication),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Continuer'))),
        ],
      ),
    );
    if (continuer != true) return false;
  }
  try {
    statut = await permission.request();
  } catch (_) {
    return false;
  }
  if (statut.isGranted || statut == PermissionStatus.limited) return true;
  if (context.mounted) {
    toast(context, tr('Autorisation refusée : tu pourras l’activer plus tard dans les réglages du téléphone.'));
  }
  return false;
}

Future<bool> demanderCameraAuMoment(BuildContext context) => demanderPermissionAuMoment(
      context,
      Permission.camera,
      titre: tr('Appareil photo'),
      explication: tr('Pour scanner le QR code de la carte d’un membre, l’application a besoin de l’appareil photo.'),
    );

Future<bool> demanderPhotosAuMoment(BuildContext context) => demanderPermissionAuMoment(
      context,
      Permission.photos,
      titre: tr('Photos'),
      explication: tr('Pour choisir une photo, l’application a besoin d’accéder à tes photos.'),
    );

// Écran de bienvenue des autorisations, 29 oct. 2026 : affiché une
// seule fois, au premier lancement sur Android, jamais ensuite.
// Carte 71, 7 nov. 2026 : seule la notification y est demandée,
// car elle sert les rappels. Appareil photo et photos ne le sont
// plus ici, ils sont demandés au moment de leur utilisation, au
// scan ou au choix d'une photo, avec une courte explication.
// Carte 164, 23 nov. 2026 : batterie et plein écran retirés, ils
// étaient demandés ici à l'avance. La batterie est demandée une
// seule fois, au premier appel, le micro à l'acceptation et la
// caméra à la bascule en vidéo.
// Chaque autorisation est expliquée en français avant que le système
// ne pose la question. Refuser ici ne bloque rien : la notification
// ne sera plus jamais demandée, carte 98, un refus renvoie vers les
// réglages du téléphone pour l'activer soi-même. Appareil photo et
// photos gardent leur demande au moment de l'utilisation.
class PermissionsWelcomePage extends StatefulWidget {
  const PermissionsWelcomePage({super.key});

  @override
  State<PermissionsWelcomePage> createState() => _PermissionsWelcomePageState();
}

class _PermissionsWelcomePageState extends State<PermissionsWelcomePage> with WidgetsBindingObserver {
  PermissionStatus? _notif;
  bool _busy = false;
  // Carte 1, 21 nov. 2026 : vrai une fois la demande unique de
  // notification faite, lu depuis le drapeau
  // verset_notif_permission_demandee. Sert à montrer
  // « Activer dans les réglages » au lieu de redemander.
  bool _demandeFaite = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _refresh();
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    // Retour des réglages du téléphone : le statut a pu changer.
    if (state == AppLifecycleState.resumed) _refresh();
  }

  Future<void> _refresh() async {
    try {
      final n = await Permission.notification.status;
      var faite = false;
      try {
        final prefs = await SharedPreferences.getInstance();
        faite = prefs.getBool('verset_notif_permission_demandee') ?? false;
      } catch (_) {}
      if (mounted) {
        setState(() {
          _notif = n;
          _demandeFaite = faite;
        });
      }
    } catch (_) {}
  }

  Future<void> _request(Permission permission) async {
    // Jonction cartes 71 et 72, fusion 71 à 79, 7 nov. 2026 : une
    // seule demande de notification, partagee avec le demarrage.
    // Si le drapeau verset_notif_permission_demandee est deja vrai,
    // la permission a deja ete demandee au demarrage, on relit
    // seulement le statut, sans redemander. Sinon, on pose le
    // drapeau avant de demander, pour que le demarrage ne redemande
    // pas au prochain lancement.
    if (permission == Permission.notification) {
      try {
        final prefs = await SharedPreferences.getInstance();
        // Carte 98, 8 nov. 2026 : une seule demande, à
        // l'installation. Si le drapeau est déjà vrai, la demande
        // a déjà eu lieu, on relit seulement le statut.
        if (!DailyVerseNotifications.instance.nouvelleDemandeNotificationAutorisee(demandeFaite: prefs.getBool('verset_notif_permission_demandee') ?? false)) {
          await _refresh();
          return;
        }
        await prefs.setBool('verset_notif_permission_demandee', true);
      } catch (_) {}
    }
    PermissionStatus status;
    try {
      status = await permission.request();
    } catch (_) {
      return;
    }
    if (!mounted) return;
    setState(() {
      _notif = status;
      if (permission == Permission.notification) _demandeFaite = true;
    });
  }

  Future<void> _requestNotification() async {
    if (_busy) return;
    setState(() => _busy = true);
    await _request(Permission.notification);
    if (mounted) setState(() => _busy = false);
  }

  Future<void> _finish() async {
    Widget next = _accueilOuConnexion();
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool('permissions_bienvenue_vues', true);
      // Carte 98, 8 nov. 2026 : la demande unique de notification
      // a eu lieu ici, à l'installation, qu'on ait autorisé ou
      // passé sans autoriser. Le drapeau marque la demande comme
      // faite, pour que plus rien ne la repose ensuite, ni au
      // démarrage, ni par un interrupteur, ni par la poussée.
      await prefs.setBool('verset_notif_permission_demandee', true);
      // Enchaînement vers l'écran d'ouverture APK, 1er nov. 2026 :
      // au tout premier lancement, l'écran des autorisations est
      // suivi de l'écran d'ouverture quand aucun membre n'est
      // connecté et que l'écran n'a pas encore été vu.
      if (!kIsWeb && defaultTargetPlatform == TargetPlatform.android && app.member == null && prefs.getBool('ouverture_vue') != true) {
        next = const OuverturePage();
      }
    } catch (_) {}
    if (!mounted) return;
    Navigator.of(context).pushReplacement(PageRouteBuilder(
      transitionDuration: Duration.zero,
      pageBuilder: (_, __, ___) => next,
      transitionsBuilder: (_, __, ___, child) => child,
    ));
  }

  String _statusLabel(PermissionStatus? s) {
    if (s == null) return tr('À demander');
    if (s.isGranted || s == PermissionStatus.limited) return tr('Autorisée');
    if (s.isPermanentlyDenied || s == PermissionStatus.restricted) return tr('Refusée définitivement');
    return tr('Refusée');
  }

  Widget _permCard({
    required IconData icon,
    required String title,
    required String text,
    required PermissionStatus? status,
    required Permission permission,
  }) {
    final granted = status != null && (status.isGranted || status == PermissionStatus.limited);
    final blocked = status != null && (status.isPermanentlyDenied || status == PermissionStatus.restricted);
    // Carte 1, 21 nov. 2026 : refusée après la demande unique,
    // on ne redemande jamais, on renvoie vers les réglages du
    // téléphone. Avant la demande, le bouton reste « Autoriser ».
    final refuseApresDemande =
        status != null && status.isDenied && _demandeFaite;
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(Cp.s2),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Icon(icon, color: Cp.navy),
            const SizedBox(width: Cp.s1),
            Expanded(child: Text(title, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800))),
            if (granted) const Icon(Icons.check_circle_outlined, color: Cp.goldDeep),
          ]),
          const SizedBox(height: Cp.s1),
          Text(text, style: Theme.of(context).textTheme.bodyMedium),
          const SizedBox(height: Cp.s1),
          Row(children: [
            Text(_statusLabel(status), style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted)),
            const Spacer(),
            if (granted)
              Text(tr('Autorisée'), style: const TextStyle(color: Cp.goldDeep, fontWeight: FontWeight.w700))
            else if (blocked || refuseApresDemande)
              FilledButton(onPressed: () => openAppSettings(), child: Text(tr('Activer dans les réglages')))
            else
              FilledButton(onPressed: () => _request(permission), child: Text(tr('Autoriser'))),
          ]),
        ]),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return basic(tr('Bienvenue'), [
      Text(tr(defaultTargetPlatform == TargetPlatform.iOS ? 'Pour recevoir tes rappels, l’application a besoin d’une seule autorisation au lancement : les notifications. iOS ne permet pas de la demander pendant l’installation, c’est donc ici qu’elle se demande.' : 'Pour recevoir tes rappels, l’application a besoin d’une seule autorisation au lancement : les notifications. Android ne permet pas de la demander pendant l’installation, c’est donc ici qu’elle se demande.'), style: Theme.of(context).textTheme.bodyMedium),
      const SizedBox(height: Cp.s1),
      Text(tr('Tu peux refuser : elle ne sera plus jamais demandée, tu pourras l’activer toi-même dans les réglages du téléphone. Le micro et la caméra, eux, ne sont demandés qu’au moment où tu en as besoin, à l’acceptation d’un appel et à la bascule en vidéo.'), style: Theme.of(context).textTheme.bodyMedium),
      const SizedBox(height: Cp.s2),
      _permCard(
        icon: Icons.notifications_outlined,
        title: tr('Notifications'),
        text: tr('Verset du jour chaque matin à 7 h, anniversaires, rappels de cotisation et alertes de paiement.'),
        status: _notif,
        permission: Permission.notification,
      ),
      const SizedBox(height: Cp.s3),
      SizedBox(
        width: double.infinity,
        height: 52,
        child: FilledButton(
          onPressed: _busy ? null : _requestNotification,
          child: Text(_busy ? tr('En cours…') : tr('Autoriser les notifications')),
        ),
      ),
      const SizedBox(height: Cp.s1),
      Row(children: [
        Expanded(child: OutlinedButton(onPressed: _finish, child: Text(tr('Passer')))),
        const SizedBox(width: Cp.s2),
        Expanded(child: FilledButton(onPressed: _finish, child: Text(tr('Continuer')))),
      ]),
    ]);
  }
}

// Écran d'ouverture APK, 1er nov. 2026 : Android seulement, premier
// lancement seulement, quand aucun membre n'est connecté. Maquette
// d'Axel façon Wave : photo plein écran, logo, panneau bas avec
// « S'inscrire » vers l'inscription directe et « Se connecter »
// vers la connexion directe. Chaque action marque l'écran comme vu,
// il ne réapparaît jamais. L'écran de bienvenue des autorisations
// reste en place avant lui au tout premier lancement. Correctif du
// même jour : la phrase « Priez, Apprenez, Partagez... » est celle
// de la photo elle-même, nette, sans surimpression, et la
// vitrine reste sur le web seulement, jamais dans l'application.
class OuverturePage extends StatelessWidget {
  const OuverturePage({super.key});

  Future<void> _marquerVue() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool('ouverture_vue', true);
    } catch (_) {}
  }

  Future<void> _sInscrire(BuildContext context) async {
    await _marquerVue();
    if (!context.mounted) return;
    await Navigator.of(context).push(MaterialPageRoute(builder: (_) => const ProfilePage(initialRegister: true)));
    if (!context.mounted) return;
    if (app.member != null) {
      Navigator.of(context).pushReplacement(PageRouteBuilder(
        transitionDuration: Duration.zero,
        pageBuilder: (_, __, ___) => _racineNouvelle(),
        transitionsBuilder: (_, __, ___, child) => child,
      ));
    }
  }

  Future<void> _seConnecter(BuildContext context) async {
    await _marquerVue();
    if (!context.mounted) return;
    await Navigator.of(context).push(MaterialPageRoute(builder: (_) => const ProfilePage(initialRegister: false)));
    if (!context.mounted) return;
    if (app.member != null) {
      Navigator.of(context).pushReplacement(PageRouteBuilder(
        transitionDuration: Duration.zero,
        pageBuilder: (_, __, ___) => _racineNouvelle(),
        transitionsBuilder: (_, __, ___, child) => child,
      ));
    }
  }

  @override
  Widget build(BuildContext context) {
    const bleu = Color(0xFF0F1C2E);
    final size = MediaQuery.of(context).size;
    final photoHeight = size.height * 0.55;
    // Pastille CP responsive, 1er nov. 2026 : 21 % de la largeur,
    // entre 112 et 180, pour retrouver la proportion de la maquette
    // sur tablette. Le centre reste sur le bas de la vague.
    final pastille = (size.width * 0.21).clamp(112.0, 180.0).toDouble();
    // Détails maquette, 1er nov. 2026 (complément) : proportions
    // liées à la largeur, pour retrouver les grandeurs de la
    // maquette sur tablette sans jamais déborder à 320 px.
    final vagueHauteur = (size.width * 0.133).clamp(56.0, 112.0).toDouble();
    final titreSize = (size.width * 0.067).clamp(34.0, 56.0).toDouble();
    final bienvenueSize = (size.width * 0.055).clamp(30.0, 42.0).toDouble();
    final sousTitreSize = (size.width * 0.037).clamp(17.0, 30.0).toDouble();
    final hauteurBouton = (size.width * 0.14).clamp(54.0, 72.0).toDouble();
    return Scaffold(
      backgroundColor: Colors.white,
      body: Column(children: [
        SizedBox(
          height: photoHeight,
          child: Stack(children: [
            // Fond ciel, 1er nov. 2026 : sur les téléphones étroits
            // la photo en largeur ne remplit pas tout le cadre de
            // 55 %, le haut restant est du ciel, comme la maquette.
            Positioned.fill(
              child: Container(color: const Color(0xFFF4F6F9)),
            ),
            // Photo de la maquette, 1er nov. 2026 : largeur
            // complète, jamais de coupe latérale, le texte reste
            // entièrement visible. Seul un recadrage vertical par
            // le haut est possible sur les écrans larges, où le
            // haut coupé n'est que du ciel nettoyé.
            Positioned.fill(
              child: Image.asset('assets/ouverture_priere.jpg', fit: BoxFit.fitWidth, alignment: Alignment.bottomCenter, filterQuality: FilterQuality.high),
            ),
            // Courbes décoratives de la maquette, 1er nov. 2026 :
            // bleu en haut à gauche, arc violet en haut
            // à droite. Elles ne captent aucun toucher.
            Positioned(
              left: 0,
              top: 0,
              width: size.width * 0.44,
              height: photoHeight * 0.30,
              child: const IgnorePointer(child: CustomPaint(painter: _SwooshHautPainter())),
            ),
            Positioned(
              right: 0,
              top: 0,
              width: size.width * 0.30,
              height: photoHeight * 0.34,
              child: const IgnorePointer(child: CustomPaint(painter: _ArcHautPainter())),
            ),
          ]),
        ),
        Expanded(
          child: Stack(clipBehavior: Clip.none, children: [
            Positioned.fill(
              child: Container(
                decoration: const BoxDecoration(
                  color: Colors.white,
                ),
                // Courbes décoratives du bas de la maquette, 1er
                // nov. 2026 : bleu et rouge en bas à gauche,
                // peintes derrière le contenu, sans toucher.
                child: CustomPaint(
                  painter: const _DecorBasPainter(),
                  child: LayoutBuilder(
                    builder: (_, constraints) {
                      return SingleChildScrollView(
                        padding: const EdgeInsets.fromLTRB(28, 28, 28, 20),
                        child: ConstrainedBox(
                          constraints: BoxConstraints(minHeight: constraints.hasBoundedHeight ? (constraints.maxHeight - 48).clamp(0.0, double.infinity).toDouble() : 0.0),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                    Text(tr('Bienvenue sur'), style: TextStyle(color: Cp.ink, fontSize: bienvenueSize, fontWeight: FontWeight.w800)),
                    FittedBox(
                      fit: BoxFit.scaleDown,
                      child: Text(tr('Connexion Prophétique'), textAlign: TextAlign.center, style: TextStyle(color: bleu, fontSize: titreSize, fontWeight: FontWeight.w900)),
                    ),
                    const SizedBox(height: 8),
                    Container(width: size.width * 0.45, height: 5, decoration: BoxDecoration(color: Cp.danger, borderRadius: BorderRadius.circular(2.5))),
                    const SizedBox(height: 14),
                    Text(tr('Une structure chrétienne unie pour prier, apprendre et partager la foi.'), textAlign: TextAlign.center, style: TextStyle(color: Cp.ink, fontSize: sousTitreSize, fontWeight: FontWeight.w600, height: 1.35)),
                    const SizedBox(height: 24),
                    SizedBox(
                      width: double.infinity,
                      height: hauteurBouton,
                      child: Container(
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                            colors: [Color(0xFF0F1C2E), Color(0xFF0F1C2E)],
                          ),
                          borderRadius: BorderRadius.circular(hauteurBouton / 2),
                        ),
                        child: FilledButton(
                          style: FilledButton.styleFrom(backgroundColor: Colors.transparent, shadowColor: Colors.transparent, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(hauteurBouton / 2))),
                          onPressed: () => _sInscrire(context),
                          child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                            Text(tr("S'inscrire"), style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
                            const SizedBox(width: 8),
                            const Icon(Icons.chevron_right_outlined, size: 28),
                          ]),
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    SizedBox(
                      width: double.infinity,
                      height: hauteurBouton,
                      child: OutlinedButton(
                        style: OutlinedButton.styleFrom(foregroundColor: Cp.ink, side: const BorderSide(color: bleu, width: 1.5), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(hauteurBouton / 2))),
                        onPressed: () => _seConnecter(context),
                        child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                          const Icon(Icons.login, size: 24),
                          const SizedBox(width: 8),
                          Text(tr('Se connecter'), style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
                        ]),
                      ),
                    ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ),
            ),
            // Vague de la maquette, 1er nov. 2026 (complément) :
            // large ruban ondulé à la jonction entre la photo et
            // le panneau, sans capter de toucher.
            Positioned(
              top: -vagueHauteur,
              left: 0,
              right: 0,
              height: vagueHauteur,
              child: const IgnorePointer(child: CustomPaint(painter: _VagueOuverturePainter())),
            ),
            Positioned(
              top: -vagueHauteur * 0.54 - pastille / 2,
              right: 24,
              child: Container(
                width: pastille,
                height: pastille,
                decoration: BoxDecoration(shape: BoxShape.circle, border: Border.all(color: Cp.gold, width: 3), color: const Color(0xFF0B0B0B)),
                padding: const EdgeInsets.all(4),
                child: ClipOval(
                  child: WebAssetImage(
                    asset: 'assets/cp_monogram.png',
                    partUrls: kMonogramParts,
                    width: pastille - 8,
                    height: pastille - 8,
                    fit: BoxFit.cover,
                    fallback: const Center(child: Text('CP', style: TextStyle(color: Cp.gold, fontSize: 26, fontWeight: FontWeight.w700, fontStyle: FontStyle.italic, fontFamily: 'serif'))),
                  ),
                ),
              ),
            ),
          ]),
        ),
      ]),
    );
  }
}



// Vague de la maquette, 1er nov. 2026 (complément) : large ruban
// ondulé, bord supérieur or, corps bleu et violet.
class _VagueOuverturePainter extends CustomPainter {
  const _VagueOuverturePainter();
  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;
    // Corps bleu et violet, du bord inférieur de la bande or
    // jusqu'au bord inférieur du ruban.
    final bluePath = Path()
      ..moveTo(0, 0.44 * h)
      ..quadraticBezierTo(w * 0.28, 0.08 * h, w * 0.55, 0.42 * h)
      ..quadraticBezierTo(w * 0.80, 0.66 * h, w, 0.38 * h)
      ..lineTo(w, 0.80 * h)
      ..quadraticBezierTo(w * 0.80, 0.95 * h, w * 0.55, 0.82 * h)
      ..quadraticBezierTo(w * 0.28, 0.60 * h, 0, 0.88 * h)
      ..close();
    final bluePaint = Paint()
      ..shader = const LinearGradient(
        colors: [Color(0xFF0F1C2E), Color(0xFF0F1C2E)],
      ).createShader(Rect.fromLTWH(0, 0, w, h));
    canvas.drawPath(bluePath, bluePaint);
    // Bande or du bord supérieur, ondulée comme la maquette.
    final goldPath = Path()
      ..moveTo(0, 0.28 * h)
      ..quadraticBezierTo(w * 0.28, -0.10 * h, w * 0.55, 0.26 * h)
      ..quadraticBezierTo(w * 0.80, 0.55 * h, w, 0.18 * h)
      ..lineTo(w, 0.40 * h)
      ..quadraticBezierTo(w * 0.80, 0.68 * h, w * 0.55, 0.44 * h)
      ..quadraticBezierTo(w * 0.28, 0.10 * h, 0, 0.46 * h)
      ..close();
    canvas.drawPath(goldPath, Paint()..color = const Color(0xFFE5C158));
    // Blanc du panneau sous le ruban.
    final whitePath = Path()
      ..moveTo(0, 0.86 * h)
      ..quadraticBezierTo(w * 0.28, 0.58 * h, w * 0.55, 0.80 * h)
      ..quadraticBezierTo(w * 0.80, 0.93 * h, w, 0.78 * h)
      ..lineTo(w, h)
      ..lineTo(0, h)
      ..close();
    canvas.drawPath(whitePath, Paint()..color = Colors.white);
  }
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

// Courbes décoratives du haut de la maquette, 1er nov. 2026 (complément) :
// courbes plus amples, toujours derrière le logo.
class _SwooshHautPainter extends CustomPainter {
  const _SwooshHautPainter();
  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;
    final bluePath = Path()
      ..moveTo(0, 0)
      ..lineTo(w * 0.80, 0)
      ..quadraticBezierTo(w * 0.66, h * 0.55, 0, h)
      ..close();
    canvas.drawPath(bluePath, Paint()..color = const Color(0xFF0F1C2E));
  }
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

// Arc violet du haut droit de la maquette, 1er nov. 2026 (complément) :
// arc fin et élégant, comme la maquette, toujours derrière le logo.
class _ArcHautPainter extends CustomPainter {
  const _ArcHautPainter();
  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;
    final arcPaint = Paint()
      ..color = const Color(0xFFE5C158)
      ..style = PaintingStyle.stroke
      ..strokeWidth = h * 0.08
      ..strokeCap = StrokeCap.round;
    final arcPath = Path()
      ..moveTo(w * 0.92, 0)
      ..quadraticBezierTo(w * 0.45, h * 0.70, 0, h * 0.92);
    canvas.drawPath(arcPath, arcPaint);
  }
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

// Courbes décoratives du bas de la maquette, 1er nov. 2026 (complément) :
// petites courbes rouge et bleue tout en bas à gauche, voile lavande,
// peintes derrière le contenu, sans jamais le recouvrir.
class _DecorBasPainter extends CustomPainter {
  const _DecorBasPainter();
  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;
    // Léger voile lavande tout en bas du panneau, comme la maquette.
    final veilPaint = Paint()
      ..shader = const LinearGradient(
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
        colors: [Color(0x00000000), Color(0xFFE4E7EF)],
      ).createShader(Rect.fromLTWH(0, h - 30, w, 30));
    canvas.drawRect(Rect.fromLTWH(0, h - 30, w, 30), veilPaint);
    final bluePaint = Paint()
      ..color = const Color(0xFF0F1C2E)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 12
      ..strokeCap = StrokeCap.round;
    final blueArc = Path()
      ..moveTo(0, h - 40)
      ..quadraticBezierTo(w * 0.16, h - 2, w * 0.30, h);
    canvas.drawPath(blueArc, bluePaint);
    final redPaint = Paint()
      ..color = const Color(0xFFB3261E)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 10
      ..strokeCap = StrokeCap.round;
    final redArc = Path()
      ..moveTo(0, h - 22)
      ..quadraticBezierTo(w * 0.10, h - 2, w * 0.20, h);
    canvas.drawPath(redArc, redPaint);
  }
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

// Drapeau de la présentation après inscription, 3 nov. 2026 :
// conservé sur cet appareil seulement, comme ouverture_vue.
// Présentation de première installation, carte 71, 7 nov. 2026 :
// comme toutes les applications du marché, écrans défilants, un
// par fonctionnalité, points de progression en bas, Passer en
// haut, Suivant, puis Commencer sur le dernier écran, qui mène à
// la connexion et à l'inscription. Elle s'active au premier
// lancement après l'installation, avant connexion et inscription,
// une seule fois, grâce au drapeau
// presentation_premiere_installation_vue. Carte 99, 8 nov. 2026 :
// APK seulement, jamais sur le web. Chaque écran montre une
// miniature de la vraie interface, dessinée par l'application,
// dans l'ordre Accueil, Bible, Librairie, Structure, Témoignages,
// Donner, comme DoorDash pour un premier inscrit. Passer ou
// Commencer marque aussi le drapeau après inscription, pour ne pas
// la revoir après une inscription. Relecture possible depuis le
// tiroir, À propos et Aide, sur APK seulement, sans jamais la
// réafficher d'elle-même. Chaque écran : une miniature, un titre
// court, une phrase pour dire ce que c'est, une phrase pour dire
// comment l'utiliser. Passer ou Commencer marque le drapeau comme
// vu, puis ferme la page. En relecture (depuis À propos et Aide),
// la page se contente de se fermer, sans naviguer vers l'accueil.
// Les tailles de texte suivent le réglage global, déjà appliqué
// par le MediaQuery de l'application, donc aucun facteur local
// n'est ajouté ici.
const String kPresentationApresInscriptionFlag = 'presentation_apres_inscription_vue';
const String kPresentationPremiereInstallationFlag = 'presentation_premiere_installation_vue';

// Carte 99, 8 nov. 2026 : les 6 étapes de la présentation, dans
// l'ordre, avec l'onglet de la miniature, -1 pour Donner, page
// hors onglets. La page elle-même construit les 6 écrans dans ce
// même ordre, avec les mêmes titres. La page Plus est supprimée,
// 19 nov. 2026, décision d'Axel : elle n'a plus d'écran ici.
const List<int> kPresentation99Onglets = [0, 1, 2, 3, 4, -1];
const List<String> kPresentation99Titres = ['Accueil', 'Bible', 'Librairie', 'Structure', 'Témoignages', 'Donner'];

/// Carte 99, 8 nov. 2026 : la présentation de première installation
/// ne s'active que sur APK, jamais sur le web, et une seule fois
/// par appareil.
bool presentationActive({required bool isWeb, required bool dejaVue}) => !isWeb && !dejaVue;

/// Lecture du drapeau de la présentation, faux en cas d'erreur.
Future<bool> presentationDejaVue() async {
  try {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool(kPresentationPremiereInstallationFlag) == true;
  } catch (_) {
    return false;
  }
}

class PresentationApresInscriptionPage extends StatefulWidget {
  const PresentationApresInscriptionPage({super.key, this.revoir = false, this.premiereInstallation = false});
  final bool revoir;
  final bool premiereInstallation;

  @override
  State<PresentationApresInscriptionPage> createState() => _PresentationApresInscriptionPageState();
}

class _PresentationApresInscriptionPageState extends State<PresentationApresInscriptionPage> {
  final _controleur = PageController();
  int _index = 0;
  bool _termine = false;

  @override
  void dispose() {
    _controleur.dispose();
    super.dispose();
  }

  // Destination après la présentation de première installation,
  // carte 71 : même suite que l'écran de démarrage, autorisations
  // téléphone, puis écran d'ouverture (Android seulement), puis
  // connexion, jamais la vitrine sur application, jamais la
  // présentation une seconde fois. Sur le web, ou membre déjà
  // connecté, l'accueil. iOS ajouté le 7 nov. 2026, sans l'écran
  // d'ouverture, réservé à l'APK.
  Future<Widget> _destinationApresPresentation() async {
    if (app.member != null) return _racineNouvelle();
    if (!kIsWeb && (defaultTargetPlatform == TargetPlatform.android || defaultTargetPlatform == TargetPlatform.iOS)) {
      try {
        final prefs = await SharedPreferences.getInstance();
        if (prefs.getBool('permissions_bienvenue_vues') != true) {
          return const PermissionsWelcomePage();
        }
        if (defaultTargetPlatform == TargetPlatform.android && prefs.getBool('ouverture_vue') != true) {
          return const OuverturePage();
        }
      } catch (_) {}
      return const ProfilePage(initialRegister: false);
    }
    return _accueilOuConnexion();
  }

  Future<void> _terminer() async {
    if (_termine) return;
    _termine = true;
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool(kPresentationApresInscriptionFlag, true);
      if (widget.premiereInstallation) {
        await prefs.setBool(kPresentationPremiereInstallationFlag, true);
      }
    } catch (_) {}
    if (!mounted) return;
    // Première installation, carte 71 : la page a remplacé
    // l'écran de démarrage, il n'y a rien à refermer en dessous,
    // elle est donc remplacée par la suite, connexion et
    // inscription. En relecture ou après inscription, simple
    // fermeture, comme avant.
    if (widget.premiereInstallation) {
      final next = await _destinationApresPresentation();
      if (!mounted) return;
      Navigator.of(context).pushReplacement(
        PageRouteBuilder(
          transitionDuration: Duration.zero,
          pageBuilder: (_, __, ___) => next,
          transitionsBuilder: (_, __, ___, child) => child,
        ),
      );
      return;
    }
    Navigator.of(context).pop();
  }

  void _suivant() {
    if (_index >= 5) {
      _terminer();
    } else {
      _controleur.nextPage(duration: const Duration(milliseconds: 300), curve: Curves.easeOut);
    }
  }

  // Miniature d'un écran réel, carte 99, 8 nov. 2026 : un petit
  // cadre téléphone, bleu nuit et or, dessiné par l'application
  // elle-même, sans fichier image, sans nouvelle dépendance. En
  // haut, la barre de l'application ; au milieu, les traits de
  // l'interface réelle de l'écran ; en bas, la barre des 5 onglets,
  // l'onglet de l'écran en or, les autres en gris. Pour une page
  // hors onglets, comme Donner, onglet -1, aucun onglet en or.
  Widget _cadreTelephone({required int onglet, required Widget corps}) {
    const onglets = [Icons.home_outlined, Icons.menu_book_outlined, LucideIcons.bookmark, Icons.group_outlined, Icons.badge_outlined];
    return Container(
      width: 220,
      height: 300,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Cp.navy, width: 2),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(22),
        child: Column(children: [
          Container(
            width: double.infinity,
            color: Cp.navy,
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
            child: Row(children: [
              Container(
                width: 16,
                height: 16,
                decoration: const BoxDecoration(color: Cp.gold, shape: BoxShape.circle),
                child: const Center(child: Text('CP', style: TextStyle(color: Cp.navy, fontSize: 7, fontWeight: FontWeight.w800))),
              ),
              const SizedBox(width: 6),
              const Expanded(
                child: Text('CONNEXION PROPHÉTIQUE', maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(color: Colors.white, fontSize: 8, fontWeight: FontWeight.w700)),
              ),
            ]),
          ),
          Expanded(child: Padding(padding: const EdgeInsets.all(10), child: corps)),
          Container(
            decoration: const BoxDecoration(border: Border(top: BorderSide(color: Cp.line))),
            padding: const EdgeInsets.symmetric(vertical: 6),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                for (var i = 0; i < onglets.length; i++) Icon(onglets[i], size: 18, color: i == onglet ? Cp.goldDeep : Cp.inkMuted),
              ],
            ),
          ),
        ]),
      ),
    );
  }

  // Un trait de texte de la miniature, largeur en pixels.
  Widget _trait(double largeur, {Color couleur = Cp.line, double hauteur = 8}) {
    return Align(
      alignment: Alignment.centerLeft,
      child: Container(width: largeur, height: hauteur, decoration: BoxDecoration(color: couleur, borderRadius: BorderRadius.circular(4))),
    );
  }

  Widget _ecran({required int onglet, required Widget apercu, required String titre, required String quoi, required String comment}) {
    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(Cp.s2, Cp.s2, Cp.s2, Cp.s2),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const SizedBox(height: Cp.s2),
          _cadreTelephone(onglet: onglet, corps: apercu),
          const SizedBox(height: Cp.s2),
          Text(titre, textAlign: TextAlign.center, style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: Cp.s2),
          Text(quoi, textAlign: TextAlign.center, style: Theme.of(context).textTheme.bodyMedium),
          const SizedBox(height: Cp.s1),
          Text(comment, textAlign: TextAlign.center, style: Theme.of(context).textTheme.bodyMedium),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: widget.revoir,
      child: Scaffold(
        backgroundColor: Cp.paper,
        body: SafeArea(
          child: Column(
            children: [
              Align(
                alignment: Alignment.centerRight,
                child: TextButton(onPressed: _terminer, child: Text(tr('Passer'))),
              ),
              Expanded(
                child: PageView(
                  controller: _controleur,
                  onPageChanged: (i) => setState(() => _index = i),
                  children: [
                    // Carte 99, 8 nov. 2026 : 7 écrans, interface par
                    // interface, image par image, comme DoorDash pour
                    // un premier inscrit. Chaque écran montre une
                    // miniature de la vraie interface, dessinée par
                    // l'application elle-même, puis un titre court,
                    // une phrase pour dire ce que c'est, une phrase
                    // pour dire comment l'utiliser.
                    _ecran(
                      onglet: 0,
                      apercu: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Container(
                          width: double.infinity,
                          decoration: BoxDecoration(color: Cp.gold.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(12)),
                          padding: const EdgeInsets.all(10),
                          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                            _trait(120, couleur: Cp.goldDeep, hauteur: 10),
                            const SizedBox(height: 6),
                            _trait(160),
                            const SizedBox(height: 4),
                            _trait(140),
                          ]),
                        ),
                        const SizedBox(height: 10),
                        const Row(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
                          Icon(Icons.menu_book_outlined, color: Cp.goldDeep, size: 20),
                          Icon(Icons.play_circle_outlined, color: Cp.goldDeep, size: 20),
                          Icon(Icons.share_outlined, color: Cp.goldDeep, size: 20),
                        ]),
                        const SizedBox(height: 10),
                        _trait(170),
                        const SizedBox(height: 4),
                        _trait(150),
                      ]),
                      titre: tr('Accueil'),
                      quoi: tr('Tout commence ici : ta méditation du jour et tes actualités.'),
                      comment: tr('Lis la méditation en entier, écoute-la, puis partage-la.'),
                    ),
                    _ecran(
                      onglet: 1,
                      apercu: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        _trait(110, couleur: Cp.navy, hauteur: 11),
                        const SizedBox(height: 10),
                        _trait(170),
                        const SizedBox(height: 5),
                        _trait(165),
                        const SizedBox(height: 5),
                        _trait(175),
                        const SizedBox(height: 5),
                        _trait(150),
                        const SizedBox(height: 5),
                        _trait(170),
                        const SizedBox(height: 5),
                        _trait(90, couleur: Cp.goldDeep, hauteur: 9),
                      ]),
                      titre: tr('Bible'),
                      quoi: tr('La Bible complète, Louis Segond et King James.'),
                      comment: tr('Lis en texte continu, cherche un passage, touche un mot pour son sens.'),
                    ),
                    _ecran(
                      onglet: 2,
                      apercu: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Row(children: [
                          const Icon(Icons.play_circle_outlined, color: Cp.goldDeep, size: 34),
                          const SizedBox(width: 8),
                          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                            _trait(110, hauteur: 10),
                            const SizedBox(height: 5),
                            _trait(80),
                          ])),
                        ]),
                        const SizedBox(height: 12),
                        Row(children: [
                          Container(width: 34, height: 48, decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(4))),
                          const SizedBox(width: 8),
                          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                            _trait(100, hauteur: 10),
                            const SizedBox(height: 5),
                            _trait(70),
                          ])),
                        ]),
                        const SizedBox(height: 12),
                        _trait(160),
                      ]),
                      titre: tr('Librairie'),
                      quoi: tr('Les enseignements à écouter et les livres.'),
                      comment: tr('Écoute un enseignement, achète un livre comme LE VOYAGEUR à 500 FCFA.'),
                    ),
                    _ecran(
                      onglet: 3,
                      apercu: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Container(
                          width: double.infinity,
                          decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(12)),
                          padding: const EdgeInsets.all(10),
                          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                            const Text('KAIROS 2027', style: TextStyle(color: Cp.gold, fontSize: 12, fontWeight: FontWeight.w800)),
                            const SizedBox(height: 6),
                            _trait(130, couleur: Colors.white70),
                            const SizedBox(height: 4),
                            _trait(100, couleur: Colors.white70),
                          ]),
                        ),
                        const SizedBox(height: 10),
                        Container(
                          width: double.infinity,
                          decoration: BoxDecoration(color: Cp.gold, borderRadius: BorderRadius.circular(20)),
                          padding: const EdgeInsets.symmetric(vertical: 8),
                          child: Center(child: Text(tr('S’inscrire'), style: const TextStyle(color: Cp.navy, fontSize: 11, fontWeight: FontWeight.w800))),
                        ),
                        const SizedBox(height: 10),
                        _trait(150),
                      ]),
                      titre: tr('Structure'),
                      quoi: tr('Établissements, camps et présences, tout est ici.'),
                      comment: tr('Inscris-toi : ton pass se crée quand le total est payé.'),
                    ),
                    _ecran(
                      onglet: 4,
                      apercu: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Container(
                          width: double.infinity,
                          decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(12), border: Border.all(color: Cp.gold)),
                          padding: const EdgeInsets.all(10),
                          child: Column(children: [
                            Row(children: [
                              Container(
                                width: 26,
                                height: 26,
                                decoration: const BoxDecoration(color: Cp.gold, shape: BoxShape.circle),
                                child: const Center(child: Text('CP', style: TextStyle(color: Cp.navy, fontSize: 9, fontWeight: FontWeight.w800))),
                              ),
                              const SizedBox(width: 8),
                              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                                _trait(90, couleur: Colors.white),
                                const SizedBox(height: 4),
                                _trait(70, couleur: Cp.gold),
                              ])),
                            ]),
                            const SizedBox(height: 10),
                            Row(children: [
                              Container(
                                width: 40,
                                height: 40,
                                color: Colors.white,
                                padding: const EdgeInsets.all(3),
                                child: Column(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                                  Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                                    Container(width: 10, height: 10, color: Cp.navy),
                                    Container(width: 10, height: 10, color: Cp.navy),
                                    Container(width: 10, height: 10, color: Cp.navy),
                                  ]),
                                  Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                                    Container(width: 10, height: 10, color: Cp.navy),
                                    Container(width: 10, height: 10, color: Colors.white),
                                    Container(width: 10, height: 10, color: Cp.navy),
                                  ]),
                                  Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                                    Container(width: 10, height: 10, color: Cp.navy),
                                    Container(width: 10, height: 10, color: Cp.navy),
                                    Container(width: 10, height: 10, color: Cp.navy),
                                  ]),
                                ]),
                              ),
                              const SizedBox(width: 8),
                              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                                _trait(90, couleur: Colors.white70),
                                const SizedBox(height: 4),
                                _trait(70, couleur: Colors.white70),
                              ])),
                            ]),
                          ]),
                        ),
                        const SizedBox(height: 10),
                        _trait(150),
                      ]),
                      titre: tr('Carte de membre'),
                      quoi: tr('Ta carte, ton matricule et ton QR, rien d’autre.'),
                      comment: tr('La carte complète apparaît quand la structure a validé ton paiement de 1 000 FCFA, non obligatoire pour utiliser l’application.'),
                    ),
                    _ecran(
                      onglet: -1,
                      apercu: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        _trait(100, couleur: Cp.navy, hauteur: 11),
                        const SizedBox(height: 10),
                        Container(
                          width: double.infinity,
                          decoration: BoxDecoration(border: Border.all(color: Cp.line), borderRadius: BorderRadius.circular(12)),
                          padding: const EdgeInsets.all(10),
                          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                            const Text('1 000 FCFA', style: TextStyle(color: Cp.navy, fontSize: 16, fontWeight: FontWeight.w800)),
                            const SizedBox(height: 4),
                            _trait(110),
                          ]),
                        ),
                        const SizedBox(height: 10),
                        Container(
                          width: double.infinity,
                          decoration: BoxDecoration(color: Cp.gold, borderRadius: BorderRadius.circular(20)),
                          padding: const EdgeInsets.symmetric(vertical: 8),
                          child: const Center(child: Text('Donner par Wave', style: TextStyle(color: Cp.navy, fontSize: 11, fontWeight: FontWeight.w800))),
                        ),
                      ]),
                      titre: tr('Donner'),
                      quoi: tr('Les dons, dîmes et offrandes.'),
                      comment: tr('Donne par Wave : le montant est affiché avant l’ouverture, la structure valide après contrôle.'),
                    ),
                  ],
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  for (var i = 0; i < 6; i++)
                    Container(
                      margin: const EdgeInsets.symmetric(horizontal: 4),
                      width: _index == i ? 24 : 8,
                      height: 8,
                      decoration: BoxDecoration(
                        color: _index == i ? Cp.navy : Cp.line,
                        borderRadius: BorderRadius.circular(4),
                      ),
                    ),
                ],
              ),
              const SizedBox(height: Cp.s2),
              Padding(
                padding: const EdgeInsets.fromLTRB(Cp.s2, 0, Cp.s2, Cp.s2),
                child: SizedBox(
                  width: double.infinity,
                  height: 52,
                  child: FilledButton(
                    onPressed: _suivant,
                    child: Text(_index >= 5 ? tr('Commencer') : tr('Suivant')),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// Navigation par largeur, 17 nov. 2026, corrigé : sur écran
class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key, this.initialRegister = true});
  final bool initialRegister;

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

/// Indicatifs de tous les pays, 27 oct. 2026, carte 87 :
/// Côte d'Ivoire en premier, puis ordre alphabétique français.
/// Les pays qui partagent un même indicatif sont regroupés sur
/// une seule ligne, car le menu déroulant exige une valeur unique :
/// +7 pour Russie et Kazakhstan, +44 pour Royaume-Uni
/// et dépendances, +590 pour Guadeloupe, Saint-Barthélemy et
/// Saint-Martin. Exception, carte 87 : le Canada et les
/// États-Unis ont chacun leur propre entrée, +1 tous les deux,
/// pour que le mot Canada soit visible dans la liste, comme
/// Axel l'a demandé. Les menus utilisent donc l'index de
/// l'entrée pour valeur, jamais l'indicatif, sinon deux
/// entrées +1 auraient la même valeur et le menu planterait.
/// Aucun numéro n'est inventé : l'indicatif choisi
/// est simplement ajouté devant le numéro saisi, sauf si le numéro
/// commence déjà par un +.
List<(String, String)> countryCodes() => [
  ('+225', tr('Côte d’Ivoire')),
  ('+93', tr('Afghanistan')),
  ('+27', tr('Afrique du Sud')),
  ('+355', tr('Albanie')),
  ('+213', tr('Algérie')),
  ('+49', tr('Allemagne')),
  ('+376', tr('Andorre')),
  ('+244', tr('Angola')),
  ('+1264', tr('Anguilla')),
  ('+672', tr('Antarctique')),
  ('+1268', tr('Antigua-et-Barbuda')),
  ('+966', tr('Arabie saoudite')),
  ('+54', tr('Argentine')),
  ('+374', tr('Arménie')),
  ('+297', tr('Aruba')),
  ('+61', tr('Australie')),
  ('+43', tr('Autriche')),
  ('+994', tr('Azerbaïdjan')),
  ('+1242', tr('Bahamas')),
  ('+973', tr('Bahreïn')),
  ('+880', tr('Bangladesh')),
  ('+1246', tr('Barbade')),
  ('+32', tr('Belgique')),
  ('+501', tr('Belize')),
  ('+229', tr('Bénin')),
  ('+1441', tr('Bermudes')),
  ('+975', tr('Bhoutan')),
  ('+375', tr('Biélorussie')),
  ('+95', tr('Birmanie (Myanmar)')),
  ('+591', tr('Bolivie')),
  ('+387', tr('Bosnie-Herzégovine')),
  ('+267', tr('Botswana')),
  ('+55', tr('Brésil')),
  ('+673', tr('Brunei')),
  ('+359', tr('Bulgarie')),
  ('+226', tr('Burkina Faso')),
  ('+257', tr('Burundi')),
  ('+855', tr('Cambodge')),
  ('+237', tr('Cameroun')),
  ('+1', tr('Canada')),
  ('+238', tr('Cap-Vert')),
  ('+56', tr('Chili')),
  ('+86', tr('Chine')),
  ('+357', tr('Chypre')),
  ('+57', tr('Colombie')),
  ('+269', tr('Comores')),
  ('+242', tr('Congo')),
  ('+243', tr('RD Congo')),
  ('+850', tr('Corée du Nord')),
  ('+82', tr('Corée du Sud')),
  ('+506', tr('Costa Rica')),
  ('+385', tr('Croatie')),
  ('+53', tr('Cuba')),
  ('+599', tr('Curaçao')),
  ('+45', tr('Danemark')),
  ('+253', tr('Djibouti')),
  ('+1767', tr('Dominique')),
  ('+20', tr('Égypte')),
  ('+971', tr('Émirats arabes unis')),
  ('+593', tr('Équateur')),
  ('+291', tr('Érythrée')),
  ('+34', tr('Espagne')),
  ('+372', tr('Estonie')),
  ('+268', tr('Eswatini')),
  ('+1', tr('États-Unis')),
  ('+251', tr('Éthiopie')),
  ('+679', tr('Fidji')),
  ('+358', tr('Finlande')),
  ('+33', tr('France')),
  ('+241', tr('Gabon')),
  ('+220', tr('Gambie')),
  ('+995', tr('Géorgie')),
  ('+233', tr('Ghana')),
  ('+350', tr('Gibraltar')),
  ('+30', tr('Grèce')),
  ('+1473', tr('Grenade')),
  ('+299', tr('Groenland')),
  ('+590', tr('Guadeloupe, Saint-Barthélemy et Saint-Martin')),
  ('+1671', tr('Guam')),
  ('+502', tr('Guatemala')),
  ('+224', tr('Guinée')),
  ('+245', tr('Guinée-Bissau')),
  ('+240', tr('Guinée équatoriale')),
  ('+592', tr('Guyana')),
  ('+509', tr('Haïti')),
  ('+504', tr('Honduras')),
  ('+852', tr('Hong Kong')),
  ('+36', tr('Hongrie')),
  ('+1345', tr('Îles Caïmans')),
  ('+682', tr('Îles Cook')),
  ('+298', tr('Îles Féroé')),
  ('+500', tr('Îles Malouines')),
  ('+692', tr('Îles Marshall')),
  ('+677', tr('Îles Salomon')),
  ('+1284', tr('Îles Vierges britanniques')),
  ('+1340', tr('Îles Vierges américaines')),
  ('+91', tr('Inde')),
  ('+62', tr('Indonésie')),
  ('+964', tr('Irak')),
  ('+98', tr('Iran')),
  ('+353', tr('Irlande')),
  ('+354', tr('Islande')),
  ('+972', tr('Israël')),
  ('+39', tr('Italie')),
  ('+1876', tr('Jamaïque')),
  ('+81', tr('Japon')),
  ('+962', tr('Jordanie')),
  ('+7', tr('Russie et Kazakhstan')),
  ('+254', tr('Kenya')),
  ('+996', tr('Kirghizistan')),
  ('+686', tr('Kiribati')),
  ('+383', tr('Kosovo')),
  ('+965', tr('Koweït')),
  ('+856', tr('Laos')),
  ('+266', tr('Lesotho')),
  ('+371', tr('Lettonie')),
  ('+961', tr('Liban')),
  ('+231', tr('Liberia')),
  ('+218', tr('Libye')),
  ('+423', tr('Liechtenstein')),
  ('+370', tr('Lituanie')),
  ('+352', tr('Luxembourg')),
  ('+853', tr('Macao')),
  ('+389', tr('Macédoine du Nord')),
  ('+261', tr('Madagascar')),
  ('+60', tr('Malaisie')),
  ('+265', tr('Malawi')),
  ('+960', tr('Maldives')),
  ('+223', tr('Mali')),
  ('+356', tr('Malte')),
  ('+212', tr('Maroc')),
  ('+596', tr('Martinique')),
  ('+230', tr('Maurice')),
  ('+222', tr('Mauritanie')),
  ('+52', tr('Mexique')),
  ('+691', tr('Micronésie')),
  ('+373', tr('Moldavie')),
  ('+377', tr('Monaco')),
  ('+976', tr('Mongolie')),
  ('+382', tr('Monténégro')),
  ('+1664', tr('Montserrat')),
  ('+258', tr('Mozambique')),
  ('+264', tr('Namibie')),
  ('+674', tr('Nauru')),
  ('+977', tr('Népal')),
  ('+505', tr('Nicaragua')),
  ('+227', tr('Niger')),
  ('+234', tr('Nigeria')),
  ('+683', tr('Niue')),
  ('+47', tr('Norvège')),
  ('+687', tr('Nouvelle-Calédonie')),
  ('+64', tr('Nouvelle-Zélande')),
  ('+968', tr('Oman')),
  ('+256', tr('Ouganda')),
  ('+998', tr('Ouzbékistan')),
  ('+92', tr('Pakistan')),
  ('+680', tr('Palaos')),
  ('+970', tr('Palestine')),
  ('+507', tr('Panama')),
  ('+675', tr('Papouasie-Nouvelle-Guinée')),
  ('+595', tr('Paraguay')),
  ('+31', tr('Pays-Bas')),
  ('+51', tr('Pérou')),
  ('+63', tr('Philippines')),
  ('+48', tr('Pologne')),
  ('+689', tr('Polynésie française')),
  ('+1787', tr('Porto Rico')),
  ('+351', tr('Portugal')),
  ('+974', tr('Qatar')),
  ('+236', tr('République centrafricaine')),
  ('+1809', tr('République dominicaine')),
  ('+40', tr('Roumanie')),
  ('+44', tr('Royaume-Uni')),
  ('+250', tr('Rwanda')),
  ('+1869', tr('Saint-Kitts-et-Nevis')),
  ('+378', tr('Saint-Marin')),
  ('+1784', tr('Saint-Vincent-et-les-Grenadines')),
  ('+1758', tr('Sainte-Lucie')),
  ('+503', tr('Salvador')),
  ('+685', tr('Samoa')),
  ('+1684', tr('Samoa américaines')),
  ('+239', tr('Sao Tomé-et-Principe')),
  ('+221', tr('Sénégal')),
  ('+381', tr('Serbie')),
  ('+248', tr('Seychelles')),
  ('+232', tr('Sierra Leone')),
  ('+65', tr('Singapour')),
  ('+421', tr('Slovaquie')),
  ('+386', tr('Slovénie')),
  ('+252', tr('Somalie')),
  ('+249', tr('Soudan')),
  ('+211', tr('Soudan du Sud')),
  ('+94', tr('Sri Lanka')),
  ('+46', tr('Suède')),
  ('+41', tr('Suisse')),
  ('+597', tr('Suriname')),
  ('+963', tr('Syrie')),
  ('+992', tr('Tadjikistan')),
  ('+886', tr('Taïwan')),
  ('+255', tr('Tanzanie')),
  ('+235', tr('Tchad')),
  ('+420', tr('Tchéquie')),
  ('+66', tr('Thaïlande')),
  ('+670', tr('Timor-Leste')),
  ('+228', tr('Togo')),
  ('+690', tr('Tokelau')),
  ('+676', tr('Tonga')),
  ('+1868', tr('Trinité-et-Tobago')),
  ('+216', tr('Tunisie')),
  ('+993', tr('Turkménistan')),
  ('+90', tr('Turquie')),
  ('+688', tr('Tuvalu')),
  ('+380', tr('Ukraine')),
  ('+598', tr('Uruguay')),
  ('+678', tr('Vanuatu')),
  ('+379', tr('Vatican')),
  ('+58', tr('Venezuela')),
  ('+84', tr('Vietnam')),
  ('+681', tr('Wallis-et-Futuna')),
  ('+967', tr('Yémen')),
  ('+260', tr('Zambie')),
  ('+263', tr('Zimbabwe')),
];

/// Normalisation d'un numéro, correctif 4 nov. 2026 : le numéro
/// est gardé tel que tapé, espaces, tirets, points et parenthèses
/// retirés, 00 initial remplacé par +, 0 de tronc après l'indicatif
/// CONSERVÉ, par exemple +225 07 49 36 94 33 devient +2250749369433.
/// Le serveur compare les deux formes, avec et sans 0, pour la
/// connexion, l'unicité et les recherches, sans créer de doublon.
/// Un e-mail est renvoyé tel quel, AVANT toute normalisation :
/// le test sur '@' se fait sur le texte brut, sinon la suppression
/// des points casserait l'e-mail, axelanibe1@gmail.com devenait
/// axelanibe1@gmailcom et la connexion par e-mail échouait en 401
/// même avec le bon mot de passe (carte 46).
String normalizePhone(String raw, String dialCode) {
  final brut = raw.trim();
  if (brut.contains('@')) return brut;
  final cleaned = brut.replaceAll(RegExp(r'[\s\-\.\(\)]'), '');
  if (cleaned.isEmpty) return cleaned;
  var digits = cleaned;
  if (digits.startsWith('00')) digits = '+${digits.substring(2)}';
  if (digits.startsWith('+')) return digits;
  return '$dialCode$digits';
}

/// Nom complet en deux mots minimum, carte 101, 8 nov. 2026 : un
/// seul mot ne suffit pas pour identifier la personne, « Axel »
/// est refusé, « Axel Anibe » passe. Même règle côté serveur, à
/// l'inscription et à l'import. Les comptes déjà inscrits avec un
/// seul nom ne sont ni bloqués ni supprimés.
bool nomCompletDeuxMots(String nom) {
  final mots = nom.trim().split(RegExp(r'\s+')).where((m) => m.isNotEmpty);
  return mots.length >= 2;
}

/// Nom complet en majuscules, carte 125, 10 nov. 2026 : tous les
/// noms et prénoms sont en majuscules au moment de l'inscription,
/// décision d'Axel. Espaces superflus réduits à un seul, accents
/// gardés, « Élodie Martin » devient « ÉLODIE MARTIN ». Même règle
/// côté serveur, à l'inscription, à l'import et à la correction.
String nomCompletMajuscules(String nom) {
  return nom.trim().replaceAll(RegExp(r'\s+'), ' ').toUpperCase();
}

// Profil : l'or foncé 0xFFB47B17 est conservé ici, exception palette
// du 5 nov. 2026, comme pour Modifier mes infos.
class _ProfilePageState extends State<ProfilePage> {
  @override
  void initState() {
    super.initState();
    // Carte 86, 7 nov. 2026, corrigée carte 87 : l'indicatif
    // s'affiche automatiquement selon le pays de l'appareil,
    // langues préférées, fuseau IANA sur le web et fuseau,
    // sans GPS, sans pays deviné par le serveur. Avant, il
    // était figé à +225, et un membre au Canada devait chercher
    // +1 dans toute la liste. Le pays détecté passe en tête de
    // la liste des indicatifs, et le menu montre son indicatif.
    // Le membre peut toujours le changer à la main dans le
    // menu, comme avant.
    final detection = indicatifDetecteAppareil();
    _codesIndicatif = _ordonnerCodesIndicatif(detection);
    _indicatifIndex = _indexIndicatif(detection);
    _dialCode = _codesIndicatif[_indicatifIndex].$1;
    // Mode initial, 1er nov. 2026 : l'écran d'ouverture choisit
    // le mode (inscription ou connexion) ; les appels existants
    // sans paramètre ouvrent la connexion.
    _register = widget.initialRegister;
  }

  /// Liste des indicatifs avec le pays détecté en tête, carte 87 :
  /// quand un pays est détecté, son entrée passe en premier, pour
  /// qu'on la voie sans chercher dans la liste. Sans pays détecté,
  /// l'ordre reste celui de countryCodes(), Côte d'Ivoire en premier.
  List<(String, String)> _ordonnerCodesIndicatif(DetectionIndicatif detection) {
    final codes = countryCodes();
    final codePays = detection.codePays;
    if (codePays == null) return codes;
    final libelle = switch (codePays) {
      'CA' => tr('Canada'),
      'US' => tr('États-Unis'),
      _ => null,
    };
    final i = libelle == null
        ? codes.indexWhere((c) => c.$1 == detection.indicatif)
        : codes.indexWhere((c) => c.$2 == libelle);
    if (i <= 0) return codes;
    final entree = codes.removeAt(i);
    return [entree, ...codes];
  }

  /// Index de l'entrée d'indicatif à sélectionner d'office,
  /// carte 87 : l'entrée du pays détecté quand il est connu,
  /// sinon la première entrée avec l'indicatif détecté, sinon
  /// la première entrée, Côte d'Ivoire +225. Le Canada et les
  /// États-Unis partagent +1, on les distingue par leur nom.
  int _indexIndicatif(DetectionIndicatif detection) {
    if (detection.codePays != null) {
      final libelle = switch (detection.codePays) {
        'CA' => tr('Canada'),
        'US' => tr('États-Unis'),
        _ => null,
      };
      if (libelle != null) {
        final i = _codesIndicatif.indexWhere((c) => c.$2 == libelle);
        if (i >= 0) return i;
      }
    }
    final i = _codesIndicatif.indexWhere((c) => c.$1 == detection.indicatif);
    return i >= 0 ? i : 0;
  }
  // Inscription et connexion serveur, comme sur la version web :
  // le matricule vient du serveur, jamais d'un compteur local.
  // Fonction et ministère n'existent pas côté serveur : ils restent
  // conservés sur cet appareil seulement.
  late bool _register;
  bool _busy = false;
  // Case « Rester connecté », 29 oct. 2026, cochée par défaut :
  // décochée, les jetons ne sont pas enregistrés sur l'appareil
  // et la prochaine ouverture complète exige une reconnexion.
  bool _rememberMe = true;
  bool _showPassword = false;
  // Mode de connexion, 17 nov. 2026 : déduit de la saisie dans
  // le champ unique, une lettre c'est un e-mail, un chiffre ou
  // un + c'est un numéro, champ vidé c'est neutre. L'ancien
  // choix manuel Numéro et E-mail est retiré, le champ
  // intelligent prévient à chaque changement de mode, et le
  // mode alimente l'envoi.
  ModeIdentifiant _modeIdentifiant = ModeIdentifiant.neutre;
  String? _fonctionChoisie;
  // Pays de résidence, carte 64, 6 nov. 2026 : choisi par le
  // membre dans la liste fermée du modèle Bureau, jamais
  // deviné, jamais prérempli. Null veut dire non renseigné.
  String? _paysResidence;
  String _dialCode = '+225';
  // Carte 87 : pays détecté, code ISO ou null, et liste des
  // indicatifs avec le pays détecté en tête, figée à
  // l'ouverture du formulaire. Le menu utilise l'index de
  // l'entrée pour valeur, car le Canada et les États-Unis
  // partagent +1 : deux entrées ne peuvent pas avoir la même
  // valeur dans un menu déroulant.
  List<(String, String)> _codesIndicatif = countryCodes();
  int _indicatifIndex = 0;
  final _name = TextEditingController();
  final _identifiant = TextEditingController();
  final _telephone = TextEditingController();
  final _email = TextEditingController();
  final _password = TextEditingController();
  String? _etab;
  String? _error;
  String _photoPath = '';
  Uint8List? _photoBytes;
  // Date de naissance facultative, 29 oct. 2026 : elle ne sert qu'au
  // message d'anniversaire, jamais obligatoire, jamais montrée à un
  // autre membre. Null veut dire non renseignée.
  DateTime? _birthDate;

  Future<void> _pickBirthDate() async {
    final now = DateTime.now();
    final picked = await showDatePicker(
      context: context,
      initialDate: _birthDate ?? DateTime(now.year - 30, now.month, now.day),
      firstDate: DateTime(1900),
      lastDate: now,
    );
    if (picked != null && mounted) setState(() => _birthDate = picked);
  }

  Future<void> _pickPhoto() async {
    if (!await demanderPhotosAuMoment(context)) return;
    final picked = await ImagePicker().pickImage(source: ImageSource.gallery, maxWidth: 800, maxHeight: 800, imageQuality: 80);
    if (picked == null || !mounted) return;
    // Aperçu par octets, 30 oct. 2026 : sur le web, le chemin
    // d'ImagePicker est une adresse blob que FileImage ne peut pas
    // afficher, donc aucun aperçu n'apparaissait après sélection.
    // Les octets s'affichent partout. L'envoi ne change pas.
    final bytes = await picked.readAsBytes();
    if (!mounted) return;
    setState(() {
      _photoPath = picked.path;
      _photoBytes = bytes;
    });
  }

  @override
  void dispose() {
    _name.dispose();
    _identifiant.dispose();
    _telephone.dispose();
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  InputDecoration _dec(String label) => InputDecoration(
        labelText: label,
        filled: true,
        fillColor: Cp.card,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
      );

  // Choix d'une fonction sans longue liste, 28 oct. 2026 : un
  // seul champ compact, qui ouvre une feuille avec un champ de
  // recherche et la liste filtrée, défilement rapide, coche sur
  // la fonction choisie, une seule fonction possible, jamais de
  // texte libre, pour respecter la liste fermée.
  Future<void> _pickFonction() async {
    var query = '';
    final chosen = await showModalBottomSheet<String>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Cp.paper,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(Cp.radiusCard))),
      builder: (ctx) => StatefulBuilder(builder: (ctx, setS) {
        final filtered = query.isEmpty ? kFonctions : kFonctions.where((f) => sansAccents(f).contains(sansAccents(query))).toList();
        // Feuille haute, 29 oct. 2026 : 85 % de la hauteur de
        // l'écran, pour montrer beaucoup plus d'éléments que
        // l'ancienne hauteur fixe de 420 px, qui ouvrait la
        // feuille trop bas sur les grands téléphones. La
        // recherche reste visible en haut, la liste défile dedans.
        return SizedBox(
          height: MediaQuery.of(ctx).size.height * 0.85,
          child: Padding(
            padding: EdgeInsets.fromLTRB(Cp.s2, Cp.s2, Cp.s2, MediaQuery.of(ctx).viewInsets.bottom + Cp.s2),
            child: Column(children: [
              Text(tr('Fonction'), style: Theme.of(ctx).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
              const SizedBox(height: Cp.s1),
              TextField(
                decoration: InputDecoration(
                  prefixIcon: const Icon(Icons.search_outlined),
                  hintText: tr('Rechercher une fonction'),
                  filled: true,
                  fillColor: Cp.card,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
                ),
                onChanged: (v) => setS(() => query = v),
              ),
              const SizedBox(height: Cp.s1),
              Expanded(
                child: filtered.isEmpty
                    ? Center(child: Text(tr('Aucune fonction trouvée.')))
                    : ListView(children: [
                        for (final f in filtered)
                          ListTile(
                            title: Text(f, style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w600, color: Cp.navy, letterSpacing: 0.2)),
                            trailing: f == _fonctionChoisie ? const Icon(Icons.check, color: const Color(0xFFB47B17)) : null,
                            onTap: () => Navigator.pop(ctx, f),
                          ),
                      ]),
              ),
            ]),
          ),
        );
      }),
    );
    if (chosen != null) setState(() => _fonctionChoisie = chosen);
  }

  /// Choix d'un indicatif avec recherche, 22 nov. 2026 : 60
  /// entrées, la feuille de recherche remplace le menu déroulant
  /// nu, même patron que _pickFonction.
  Future<void> _pickIndicatif() async {
    final choisi = await choisirIndicatif(context, _codesIndicatif, _indicatifIndex);
    if (choisi != null) {
      setState(() {
        _indicatifIndex = choisi;
        _dialCode = _codesIndicatif[choisi].$1;
      });
    }
  }

  Future<void> _submit() async {
    final password = _password.text;
    if (password.length < 8) {
      setState(() => _error = tr('Ajoutez un mot de passe d’au moins 8 caractères.'));
      return;
    }
    String? etabId;
    String etabName = '';
    if (_etab != null) {
      final found = app.etabs.where((e) => e.name == _etab).toList();
      if (found.isNotEmpty) {
        etabId = found.first.id;
        etabName = found.first.name;
      } else {
        etabName = _etab!;
      }
    }
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      Map<String, dynamic> moi;
      if (_register) {
        final name = nomCompletMajuscules(_name.text);
        // Normalisation unique, 27 oct. 2026 : même numéro, avec
        // ou sans indicatif, avec ou sans 0 initial, donne le même
        // compte, pour ne plus créer de doublon à l'inscription.
        final tel = normalizePhone(_telephone.text, _dialCode);
        final mail = _email.text.trim();
        if (name.isEmpty) throw ApiException(tr('Renseignez votre nom complet.'));
        // Carte 101, 8 nov. 2026 : un seul mot ne suffit pas pour
        // identifier la personne, la demande n'est pas envoyée.
        if (!nomCompletDeuxMots(name)) throw ApiException(tr('Écris ton prénom et ton nom.'));
        if (tel.isEmpty && mail.isEmpty) throw ApiException(tr('Renseignez un téléphone ou un e-mail.'));
        // Carte 83 : la fonction Plateforme est déterminante,
        // aucun établissement n'est proposé dans ce cas, ni
        // exigé. Toute autre fonction garde l'établissement
        // obligatoire, comme avant.
        if (_fonctionChoisie == 'Plateforme') {
          _etab = null;
          etabId = null;
          etabName = '';
        } else if (_etab == null) {
          throw ApiException(tr('Choisissez votre établissement.'));
        }
        if (_fonctionChoisie == null) throw ApiException(tr('Choisissez une fonction dans la liste.'));
        final created = await api.register(
          nomComplet: name,
          motDePasse: password,
          email: mail.isEmpty ? null : mail,
          telephone: tel.isEmpty ? null : tel,
          etablissementId: etabId,
          fonction: _fonctionChoisie,
          dateNaissance: _birthDate == null ? null : birthIso(_birthDate!),
          paysResidence: _paysResidence,
        );
        // MO-25, 22 nov. 2026 : vérification d'e-mail, le serveur
        // renvoie 202 avec verification_requise et l'e-mail, sans
        // jetons. L'écran de saisie du code s'ouvre, et sans code
        // validé on reste sur le formulaire.
        if (created['verification_requise'] == true) {
          final emailVerif = (created['email'] ?? mail).toString();
          final verifie = await Navigator.of(context).push<bool>(
            MaterialPageRoute(
              builder: (_) => VerificationEmailPage(email: emailVerif),
            ),
          );
          if (verifie != true) return;
        }
        final m = created['membre'];
        if (m is Map<String, dynamic>) {
          moi = {...m, 'etablissement': etabName};
        } else {
          moi = await api.fetchMoi();
        }
      } else {
        // Connexion à champ unique, 17 nov. 2026 : le mode est
        // déduit de la saisie, une lettre c'est un e-mail, un
        // chiffre ou un + c'est un numéro. La frappe est
        // vérifiée avant l'envoi, jamais un e-mail ou un numéro
        // réel n'est refusé. Normalisation comme l'inscription,
        // 27 oct. 2026 : taper 0749369433, +2250749369433 ou
        // +225749369433 avec l'indicatif +225 retrouve le même
        // compte, sans doublon. L'e-mail passe tel quel.
        final saisie = _identifiant.text;
        final erreurSaisie =
            erreurIdentifiantConnexion(saisie, _modeIdentifiant);
        if (erreurSaisie != null) throw ApiException(tr(erreurSaisie));
        final ident = normalizePhone(saisie, _dialCode);
        final logged = await api.login(ident, password, rememberMe: _rememberMe);
        // MO-25, 22 nov. 2026 : double authentification, le serveur
        // renvoie double_authentification_requise avec un identifiant,
        // sans jetons. L'écran de saisie du code s'ouvre, et sans code
        // validé on reste sur le formulaire.
        if (logged['double_authentification_requise'] == true) {
          final confirme = await Navigator.of(context).push<bool>(
            MaterialPageRoute(
              builder: (_) => Connexion2faPage(
                identifiant: (logged['identifiant'] ?? ident).toString(),
              ),
            ),
          );
          if (confirme != true) return;
        }
        // Temporaire, 29 oct. 2026 : le membre doit choisir un nouveau
        // mot de passe avant tout autre usage, sinon il reste bloqué
        // sur l'écran de changement.
        if (logged['mot_de_passe_temporaire'] == true) {
          try {
            await motDePasseForce.loadLibrary();
          } catch (_) {
            toast(context, tr('Impossible de charger cette page. Vérifiez votre connexion, puis réessayez.'));
            return;
          }
          final changed = await Navigator.of(context).push<bool>(
            MaterialPageRoute(builder: (_) => motDePasseForce.ForcedPasswordPage()),
          );
          if (changed != true) return;
        }
        moi = await api.fetchMoi();
        // Suppression douce, carte 92 : un compte desactive par
        // sa propre demande ne se reconnecte que pour annuler.
        // L'application montre seulement ce choix, jamais le
        // profil normal, tant que la suppression n'est pas annulee.
        if (logged['suppression_demandee'] == true || _suppressionEnCours(moi)) {
          final annulee = await _proposerAnnulationSuppression();
          if (!annulee) {
            app.logout();
            return;
          }
          moi = await api.fetchMoi();
        }
      }
      await app.setServerMember(moi, fonction: _fonctionChoisie ?? '', photoPath: _photoPath);
      // Pays de résidence, cartes 64 et 127 : gardé en local après
      // l'inscription, en repli si la réponse ne le renvoie pas.
      if (_register && _paysResidence != null && _paysResidence!.isNotEmpty) app.setPaysResidence(_paysResidence!);
      // Anniversaire, 29 oct. 2026 : la réponse d'inscription ne
      // renvoie pas la date, et la synchronisation ne recharge pas
      // le profil, donc la date choisie est appliquée ici, sinon la
      // carte n'apparaîtrait qu'à la prochaine connexion.
      if (_register && _birthDate != null) app.updateLocalProfile(dateNaissance: _birthDate);
      // Programmer la notification locale si le jour J est dans les
      // 7 prochains jours.
      unawaited(scheduleBirthdayIfSoon());
      // Photo choisie à l'inscription : elle part au serveur tout de
      // suite, sauf si le compte en a déjà une, qui a priorité.
      if (_photoPath.isNotEmpty && (app.member?.photoData ?? '').isEmpty) {
        try {
          final pickedBytes = await XFile(_photoPath).readAsBytes();
          await app.uploadMemberPhotoData('data:image/jpeg;base64,${base64Encode(pickedBytes)}');
        } catch (_) {}
      }
      // La synchronisation des contenus publics se relance, avec le profil serveur.
      unawaited(app.syncFromServer());
      // Présentation après inscription, 3 nov. 2026 : seulement
      // quand ce formulaire vient de créer un compte (_register),
      // jamais en connexion, jamais pour un visiteur, et une
      // seule fois par appareil, grâce au drapeau vérifié ici.
      // La page elle-même marque le drapeau sur Passer ou sur
      // Commencer, puis revient ici, qui ferme le profil.
      if (_register && mounted) {
        try {
          final prefs = await SharedPreferences.getInstance();
          // Carte 99, 8 nov. 2026 : présentation APK seulement,
          // jamais sur le web, même juste après l'inscription.
          if (presentationActive(isWeb: kIsWeb, dejaVue: prefs.getBool(kPresentationApresInscriptionFlag) == true)) {
            await Navigator.of(context).push(
              MaterialPageRoute(builder: (_) => const PresentationApresInscriptionPage()),
            );
          }
        } catch (_) {}
        // Carte 83 : une fois l'inscription terminée, la
        // personne Plateforme souscrit à l'abonnement, 100 000
        // FCFA par an, paiement unique au moment de l'inscription.
        if (_fonctionChoisie == 'Plateforme') {
          go(context, PageAbonnement(service: ServiceT9Reel()));
        }
      }
      if (mounted) {
        Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (_) => _racineNouvelle()),
          (_) => false,
        );
      }
    } on ApiException catch (e) {
      if (mounted) setState(() => _error = e.message);
    } catch (_) {
      if (mounted) {
        setState(() => _error = tr('Serveur injoignable. Vérifiez votre connexion, puis réessayez. Aucun compte local n’est créé.'));
      }
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  bool _suppressionEnCours(Map<String, dynamic> moi) {
    final brut = moi['supprime_le'];
    if (brut is! String || brut.isEmpty) return false;
    final fin = DateTime.tryParse(brut);
    return fin != null && fin.isAfter(DateTime.now());
  }

  /// Apres une connexion pour annuler, carte 92 : un seul choix,
  /// annuler la suppression, ou se deconnecter. Renvoie vrai
  /// quand la suppression est annulee, faux sinon.
  Future<bool> _proposerAnnulationSuppression() async {
    final annulee = await showDialog<bool>(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Suppression demandée')),
        content: Text(tr('Ton compte est désactivé pendant 30 jours. Tu peux annuler la suppression maintenant, ou te déconnecter.')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Se déconnecter'))),
          FilledButton(
            onPressed: () async {
              try {
                await api.annulerSuppressionCompte();
                if (mounted) toast(context, tr('Suppression annulée. Ton compte est réactivé.'));
                if (ctx.mounted) Navigator.pop(ctx, true);
              } on ApiException catch (e) {
                if (mounted) toast(context, e.message);
                if (ctx.mounted) Navigator.pop(ctx, false);
              } catch (_) {
                if (mounted) toast(context, tr('Impossible d’annuler la suppression. Vérifie ta connexion, puis réessaie.'));
                if (ctx.mounted) Navigator.pop(ctx, false);
              }
            },
            child: Text(tr('Annuler la suppression')),
          ),
        ],
      ),
    );
    return annulee == true;
  }

  @override
  Widget build(BuildContext context) {
    // Le formulaire ne s'affiche que s'il n'y a aucun membre :
    // un membre connecté arrive ici par la coquille, jamais par
    // ce formulaire, dont la branche connectée a disparu en T11.
    return basic(tr('Mon profil'), [
      Text(_register ? tr('Devenir membre') : tr('Se connecter'), style: Theme.of(context).textTheme.titleLarge),
      const SizedBox(height: Cp.s1),
      Text(
        _register
            ? tr('Votre matricule unique et votre carte avec QR sont créés par le serveur à l’inscription.')
            : tr('Retrouvez votre carte et votre matricule, déjà créés sur le serveur.'),
        style: Theme.of(context).textTheme.bodyMedium),
      const SizedBox(height: Cp.s2),
      SegmentedButton<bool>(
        segments: [
          ButtonSegment(value: true, label: Text(tr('Créer un compte'))),
          ButtonSegment(value: false, label: Text(tr('Se connecter'))),
        ],
        selected: {_register},
        onSelectionChanged: (s) => setState(() {
          _register = s.first;
          _error = null;
        }),
      ),
      const SizedBox(height: Cp.s3),
      if (_register) ...[
        // Inscription simplifiée, 28 oct. 2026 : nom, numéro et
        // e-mail, terminé. Ni fonction, ni ministère, ni
        // établissement obligatoire à l'inscription : la fonction
        // et le ministère se règlent après, depuis le Profil, avec
        // « Modifier mes infos ».
        TextField(
          controller: _name,
          // Carte 125, 10 nov. 2026 : le clavier tape en
          // majuscules, le nom est enregistré en majuscules.
          textCapitalization: TextCapitalization.characters,
          decoration: _dec(tr('Nom et prénom')),
        ),
        const SizedBox(height: Cp.s2),
        Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
          SizedBox(
            width: 132,
            // Indicatif avec recherche, 22 nov. 2026 : 60 entrées,
            // la feuille de recherche remplace le menu déroulant
            // nu, même patron que _pickFonction. La valeur gardée
            // reste l'index de l'entrée, jamais l'indicatif, car
            // le Canada et les États-Unis partagent +1 (carte 87).
            child: InkWell(
              onTap: _pickIndicatif,
              borderRadius: BorderRadius.circular(14),
              child: InputDecorator(
                decoration: _dec(tr('Indicatif')),
                child: Row(children: [
                  Expanded(child: Text(_dialCode, overflow: TextOverflow.ellipsis)),
                  const Icon(Icons.keyboard_arrow_down_outlined, size: 20, color: Cp.navy),
                ]),
              ),
            ),
          ),
          const SizedBox(width: Cp.s1),
          Expanded(
            child: TextField(
              controller: _telephone,
              keyboardType: TextInputType.phone,
              decoration: _dec(tr('Numéro')),
            ),
          ),
        ]),
        const SizedBox(height: Cp.s1),
        Text(tr('Indicatif détecté automatiquement selon votre appareil. Touchez pour le changer, puis saisissez votre numéro local, sans indicatif.'), style: Theme.of(context).textTheme.bodyMedium),
        const SizedBox(height: Cp.s2),
        TextField(
          controller: _email,
          keyboardType: TextInputType.emailAddress,
          decoration: _dec(tr('E-mail')),
        ),
        const SizedBox(height: Cp.s2),
        // Carte 83 : fonction Plateforme choisie, aucun
        // établissement n'est proposé, le champ disparaît.
        // Toute autre fonction garde la liste, comme avant.
        if (_fonctionChoisie != 'Plateforme') ...[
          DropdownButtonFormField<String>(
            value: _etab,
            isExpanded: true,
            items: [for (final e in app.etabs) DropdownMenuItem(value: e.name, child: Text(etabDisplayName(e.name))), DropdownMenuItem(value: 'Autre', child: Text(tr('Autre')))],
            onChanged: (v) => setState(() => _etab = v),
            decoration: _dec(tr('Établissement')),
          ),
          const SizedBox(height: Cp.s2),
        ],
        // Carte 93, 8 nov. 2026 : choix « Devenir partenaire »,
        // visible à l'inscription, à côté du parcours classique.
        // Il choisit la fonction Plateforme, sans établissement.
        // Toucher de nouveau le retire, comme choisir une autre
        // fonction dans la liste retire aussi ce choix.
        Card(
          child: ListTile(
            leading: const Icon(Icons.workspace_premium_outlined, color: const Color(0xFFB47B17)),
            title: Text(tr('Devenir partenaire'), style: TextStyle(fontWeight: _fonctionChoisie == 'Plateforme' ? FontWeight.w800 : FontWeight.w600, color: Cp.navy)),
            subtitle: Text(tr('Publier vos enseignements, 100 000 FCFA par an, validation par la structure.')),
            trailing: _fonctionChoisie == 'Plateforme' ? const Icon(Icons.check_circle_outlined, color: const Color(0xFFB47B17)) : null,
            onTap: () => setState(() => _fonctionChoisie = _fonctionChoisie == 'Plateforme' ? null : 'Plateforme'),
          ),
        ),
        const SizedBox(height: Cp.s2),
        Card(
          child: ListTile(
            title: Text(_fonctionChoisie ?? tr('Fonction')),
            subtitle: _fonctionChoisie == null ? Text(tr('Touchez pour rechercher, puis choisir une seule fonction.')) : null,
            trailing: const Icon(Icons.keyboard_arrow_down_outlined),
            onTap: _pickFonction,
          ),
        ),
        if (_fonctionChoisie == 'Plateforme') ...[
          const SizedBox(height: Cp.s1),
          Text(tr('Fonction Plateforme : aucun établissement ne vous sera proposé. Après votre inscription, vous souscrirez à l’abonnement Plateforme, 100 000 FCFA par an, pour mettre vos enseignements en ligne.'), style: Theme.of(context).textTheme.bodyMedium),
        ],
        const SizedBox(height: Cp.s2),
        // Pays de résidence, carte 64, 6 nov. 2026 : liste
        // exacte du modèle Bureau, Côte d'Ivoire en premier.
        // Facultatif, sans pays deviné : sans choix, les offres
        // s'affichent pour tous les pays, et le Profil montre
        // À confirmer. Modifiable ensuite depuis le Profil.
        DropdownButtonFormField<String>(
          value: _paysResidence,
          isExpanded: true,
          items: [for (final p in kPaysResidence) DropdownMenuItem(value: p, child: Text(p))],
          onChanged: (v) => setState(() => _paysResidence = v),
          decoration: _dec(tr('Pays de résidence')),
        ),
        const SizedBox(height: Cp.s1),
        Text(tr('Les offres d’emploi et de formation s’afficheront selon ce pays, avec un filtre Tous les pays pour voir les autres.'), style: Theme.of(context).textTheme.bodyMedium),
        const SizedBox(height: Cp.s2),
        // Date de naissance facultative, 29 oct. 2026 : elle ne sert
        // qu'à recevoir un message le jour de l'anniversaire. Elle
        // n'est jamais obligatoire et reste modifiable ensuite.
        Card(
          child: ListTile(
            title: Text(_birthDate == null ? tr('Date de naissance') : birthLabel(_birthDate!)),
            subtitle: Text(tr('Pour recevoir un message le jour de ton anniversaire.')),
            trailing: Row(mainAxisSize: MainAxisSize.min, children: [
              if (_birthDate != null)
                IconButton(
                  tooltip: tr('Effacer'),
                  icon: const Icon(Icons.clear_outlined),
                  onPressed: () => setState(() => _birthDate = null),
                ),
              const Icon(Icons.calendar_month_outlined),
            ]),
            onTap: _pickBirthDate,
          ),
        ),
        const SizedBox(height: Cp.s2),
        Row(children: [
          if (_photoPath.isNotEmpty)
          if (_photoBytes != null)
            CircleAvatar(radius: 28, backgroundImage: MemoryImage(_photoBytes!))
          else if (_photoPath.isNotEmpty)
            CircleAvatar(radius: 28, backgroundImage: FileImage(File(_photoPath)))
          else
            const CircleAvatar(radius: 28, backgroundColor: Cp.gold, child: Icon(Icons.person_outlined, color: Cp.navy)),
          const SizedBox(width: Cp.s2),
          Expanded(
            child: OutlinedButton.icon(
              onPressed: _pickPhoto,
              icon: const Icon(Icons.photo_camera_outlined),
              label: Text(_photoPath.isEmpty ? tr('Ajouter une photo') : tr('Changer la photo')),
            ),
          ),
        ]),
        const SizedBox(height: Cp.s1),
        Text(tr('Photo facultative, pour votre carte de membre.'), style: Theme.of(context).textTheme.bodyMedium),
      ] else ...[
        // Connexion à champ unique, 17 nov. 2026 : une lettre
        // tapée, c'est un e-mail ; un chiffre ou un + tapé,
        // c'est un numéro, avec le menu d'indicatif. L'ancien
        // choix manuel Numéro et E-mail et ses deux champs
        // séparés sont retirés, le champ intelligent les
        // remplace. Le mode déduit alimente l'envoi, la
        // normalisation renvoie l'e-mail tel quel.
        ChampIdentifiantConnexion(
          controller: _identifiant,
          codes: _codesIndicatif,
          indicatifIndex: _indicatifIndex,
          onIndicatifChanged: (v) => setState(() {
            _indicatifIndex = v;
            _dialCode = _codesIndicatif[v].$1;
          }),
          onModeChanged: (mode) => setState(() => _modeIdentifiant = mode),
          decoration: _dec,
        ),
        const SizedBox(height: Cp.s1),
        Text(
          switch (_modeIdentifiant) {
            ModeIdentifiant.email => tr('Saisissez l’e-mail de votre compte.'),
            ModeIdentifiant.telephone => tr('Indicatif détecté automatiquement selon votre appareil. Touchez pour le changer, puis saisissez votre numéro local, sans indicatif, ou votre numéro complet avec +.'),
            ModeIdentifiant.neutre => tr('Saisissez votre e-mail ou votre numéro.'),
          },
          style: Theme.of(context).textTheme.bodyMedium,
        ),
      ],
      const SizedBox(height: Cp.s2),
      TextField(
        controller: _password,
        obscureText: !_showPassword,
        decoration: _dec(tr('Mot de passe (au moins 8 caractères)')).copyWith(
          suffixIcon: IconButton(
            icon: Icon(_showPassword ? Icons.visibility_off_outlined : Icons.visibility_outlined),
            onPressed: () => setState(() => _showPassword = !_showPassword),
          ),
        ),
      ),
      // Case « Rester connecté », 29 oct. 2026, en connexion
      // seulement : cochée par défaut, comme aujourd'hui. Décochée,
      // la session n'est pas conservée sur l'appareil.
      if (!_register) ...[
        CheckboxListTile(
          value: _rememberMe,
          onChanged: (v) => setState(() => _rememberMe = v ?? true),
          title: Text(tr('Rester connecté')),
          subtitle: Text(tr('Rester connecté sur cet appareil, sans retaper ton mot de passe à chaque ouverture.')),
          controlAffinity: ListTileControlAffinity.leading,
          contentPadding: EdgeInsets.zero,
        ),
      ],
      // Mot de passe oublié, 2 nov. 2026 : réinitialisation
      // autonome en deux étapes, e-mail puis code et nouveau mot
      // de passe. La réinitialisation assistée par l'administrateur
      // général reste possible pour un membre sans e-mail.
      if (!_register) ...[
        const SizedBox(height: Cp.s1),
        Align(
          alignment: Alignment.centerLeft,
          child: TextButton(
            onPressed: () {
              final emailC = TextEditingController();
              final codeC = TextEditingController();
              final nouveauC = TextEditingController();
              final confirmationC = TextEditingController();
              var etape = 1;
              var enCours = false;
              String? erreur;
              String? info;
              showDialog(
                context: context,
                builder: (ctx) => StatefulBuilder(
                  builder: (ctx, setDialog) => AlertDialog(
                    title: Text(tr('Mot de passe oublié ?')),
                    content: SingleChildScrollView(
                      child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.stretch, children: [
                        if (etape == 1) ...[
                          Text(tr('Saisis l’e-mail de ton compte : un code à 6 chiffres, valable 15 minutes, te sera envoyé.')),
                          const SizedBox(height: Cp.s2),
                          TextField(controller: emailC, keyboardType: TextInputType.emailAddress, decoration: _dec(tr('E-mail'))),
                          const SizedBox(height: Cp.s1),
                          Text(tr('Sans e-mail sur ton compte, contacte la structure : un administrateur général te remettra un mot de passe temporaire.')),
                        ] else ...[
                          Text(tr('Saisis le code reçu par e-mail, puis ton nouveau mot de passe.')),
                          const SizedBox(height: Cp.s2),
                          TextField(controller: codeC, keyboardType: TextInputType.number, decoration: _dec(tr('Code à 6 chiffres'))),
                          const SizedBox(height: Cp.s2),
                          TextField(controller: nouveauC, obscureText: true, decoration: _dec(tr('Nouveau mot de passe (au moins 8 caractères)'))),
                          const SizedBox(height: Cp.s2),
                          TextField(controller: confirmationC, obscureText: true, decoration: _dec(tr('Confirmer le nouveau mot de passe'))),
                        ],
                        if (info != null) ...[
                          const SizedBox(height: Cp.s2),
                          Text(info!, style: const TextStyle(color: Cp.navy)),
                        ],
                        if (erreur != null) ...[
                          const SizedBox(height: Cp.s2),
                          Text(erreur!, style: const TextStyle(color: Cp.danger)),
                        ],
                      ]),
                    ),
                    actions: [
                      TextButton(onPressed: enCours ? null : () => Navigator.pop(ctx), child: Text(tr('Annuler'))),
                      // Renvoyer le code, carte 46 : nouvelle demande,
                      // donc nouvel envoi, ancien code invalidé, nouveau
                      // valable 30 minutes, limite serveur de 5 demandes
                      // par e-mail et par heure (429 en cas de dépassement).
                      if (etape == 2)
                        TextButton(
                          onPressed: enCours
                              ? null
                              : () async {
                                  setDialog(() {
                                    enCours = true;
                                    erreur = null;
                                    info = null;
                                  });
                                  try {
                                    codeC.clear();
                                    await api.requestPasswordResetCode(emailC.text.trim());
                                    setDialog(() {
                                      enCours = false;
                                      info = tr('Un nouveau code a été envoyé.');
                                    });
                                  } on ApiException catch (e) {
                                    setDialog(() {
                                      enCours = false;
                                      erreur = e.message;
                                    });
                                  } catch (_) {
                                    setDialog(() {
                                      enCours = false;
                                      erreur = tr('Serveur injoignable. Vérifie ta connexion, puis réessaie.');
                                    });
                                  }
                                },
                          child: Text(tr('Renvoyer le code')),
                        ),
                      if (etape == 1)
                        FilledButton(
                          onPressed: enCours
                              ? null
                              : () async {
                                  final email = emailC.text.trim();
                                  if (email.isEmpty || !email.contains('@')) {
                                    setDialog(() => erreur = tr('Saisis un e-mail valide.'));
                                    return;
                                  }
                                  setDialog(() {
                                    enCours = true;
                                    erreur = null;
                                  });
                                  try {
                                    await api.requestPasswordResetCode(email);
                                    setDialog(() {
                                      enCours = false;
                                      etape = 2;
                                      info = tr('Si un compte est associé à cet e-mail, un code a été envoyé.');
                                    });
                                  } on ApiException catch (e) {
                                    setDialog(() {
                                      enCours = false;
                                      erreur = e.message;
                                    });
                                  } catch (_) {
                                    setDialog(() {
                                      enCours = false;
                                      erreur = tr('Serveur injoignable. Vérifie ta connexion, puis réessaie.');
                                    });
                                  }
                                },
                          child: Text(enCours ? tr('En cours…') : tr('Envoyer le code')),
                        )
                      else
                        FilledButton(
                          onPressed: enCours
                              ? null
                              : () async {
                                  final code = codeC.text.trim();
                                  final nouveau = nouveauC.text;
                                  if (code.length != 6 || int.tryParse(code) == null) {
                                    setDialog(() => erreur = tr('Saisis le code à 6 chiffres reçu par e-mail.'));
                                    return;
                                  }
                                  if (nouveau.length < 8) {
                                    setDialog(() => erreur = tr('Le nouveau mot de passe doit avoir au moins 8 caractères.'));
                                    return;
                                  }
                                  if (nouveau != confirmationC.text) {
                                    setDialog(() => erreur = tr('Les deux mots de passe ne correspondent pas.'));
                                    return;
                                  }
                                  setDialog(() {
                                    enCours = true;
                                    erreur = null;
                                  });
                                  try {
                                    // Carte 46 : le serveur renvoie des
                                    // jetons, enregistrés par
                                    // resetPasswordWithCode comme après
                                    // une connexion normale, avec la case
                                    // Rester connecté respectée. Le membre
                                    // est connecté directement, sans
                                    // retaper son nouveau mot de passe.
                                    await api.resetPasswordWithCode(emailC.text.trim(), code, nouveau, rememberMe: _rememberMe);
                                    if (ctx.mounted) Navigator.pop(ctx);
                                    if (!mounted) return;
                                    try {
                                      final moi = await api.fetchMoi();
                                      await app.setServerMember(moi);
                                      unawaited(app.syncFromServer());
                                      if (mounted) {
                                        Navigator.of(context).pushAndRemoveUntil(
                                          MaterialPageRoute(builder: (_) => _racineNouvelle()),
                                          (_) => false,
                                        );
                                      }
                                    } catch (_) {
                                      // Repli : pas d'auto-connexion
                                      // partielle, retour à l'écran de
                                      // connexion avec le message habituel.
                                      if (mounted) {
                                        showDialog(
                                          context: context,
                                          builder: (ctx2) => AlertDialog(
                                            title: Text(tr('Mot de passe changé')),
                                            content: Text(tr('Connecte-toi avec ton nouveau mot de passe.')),
                                            actions: [
                                              FilledButton(onPressed: () => Navigator.pop(ctx2), child: Text(tr('Compris'))),
                                            ],
                                          ),
                                        );
                                      }
                                    }
                                  } on ApiException catch (e) {
                                    setDialog(() {
                                      enCours = false;
                                      erreur = e.message;
                                    });
                                  } catch (_) {
                                    setDialog(() {
                                      enCours = false;
                                      erreur = tr('Serveur injoignable. Vérifie ta connexion, puis réessaie.');
                                    });
                                  }
                                },
                          child: Text(enCours ? tr('En cours…') : tr('Changer mon mot de passe')),
                        ),
                    ],
                  ),
                ),
              );
            },
            child: Text(tr('Mot de passe oublié ?')),
          ),
        ),
      ],
      if (_error != null) ...[
        const SizedBox(height: Cp.s1),
        Text(_error!, style: const TextStyle(color: Cp.danger)),
      ],
      const SizedBox(height: Cp.s3),
      SizedBox(
        height: 56,
        child: FilledButton(
          onPressed: _busy ? null : _submit,
          child: Text(
            _busy
                ? tr('En cours…')
                : (_register ? tr('Créer mon compte') : tr('Se connecter')),
            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
          ),
        ),
      ),
      const SizedBox(height: Cp.s1),
      Text(
        'En ligne seulement : sans connexion, aucun compte n’est créé et aucune reconnexion serveur n’est possible. Vos contenus déjà chargés restent consultables hors ligne.',
        style: Theme.of(context).textTheme.bodyMedium,
      ),
    ]);
  }
}
Future<void> supprimerMonCompte(BuildContext context) async {
  final continuer = await showDialog<bool>(
    context: context,
    builder: (ctx) => AlertDialog(
      title: Text(tr('Supprimer mon compte ?')),
      content: Text(tr('Ton compte est désactivé pendant 30 jours, tu peux te reconnecter pour annuler, après 30 jours tes données sont totalement effacées, paiements et audit conservés affichés compte supprimé, matricule jamais réutilisé.')),
      actions: [
        TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
        FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Continuer'))),
      ],
    ),
  );
  if (continuer != true || !context.mounted) return;
  final motDePasse = TextEditingController();
  try {
    final confirmer = await showDialog<bool>(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setS) => AlertDialog(
          title: Text(tr('Supprimer mon compte ?')),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(tr('Saisis ton mot de passe pour confirmer la suppression.')),
              const SizedBox(height: Cp.s2),
              TextField(
                controller: motDePasse,
                obscureText: true,
                onChanged: (_) => setS(() {}),
                decoration: InputDecoration(
                  labelText: tr('Mot de passe'),
                  filled: true,
                  fillColor: Cp.card,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
                ),
              ),
            ],
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
            FilledButton(
              onPressed: motDePasse.text.isEmpty ? null : () => Navigator.pop(ctx, true),
              child: Text(tr('Supprimer définitivement')),
            ),
          ],
        ),
      ),
    );
    if (confirmer != true || !context.mounted) return;
    try {
      await api.supprimerMonCompte(motDePasse.text);
    } on ApiException catch (e) {
      if (context.mounted) toast(context, e.message);
      return;
    } catch (_) {
      if (context.mounted) toast(context, tr('Impossible de supprimer ton compte. Vérifie ta connexion, puis réessaie.'));
      return;
    }
    app.logout();
    if (context.mounted) {
      Navigator.of(context).pushAndRemoveUntil(
        MaterialPageRoute(builder: (_) => const ProfilePage()),
        (_) => false,
      );
    }
  } finally {
    motDePasse.dispose();
  }
}

// Compteurs de signalements pour la section Sécurité du tiroir,
// 19 nov. 2026 : le nombre de mes signalements ouverts et le nombre
// de signalements en attente pour la structure. Chargés quand le
// tiroir s'ouvre, gardés deux minutes, jamais bloquants : sans
String etabDisplayName(String name) {
  switch (name) {
    case 'ISPAM':
      return 'Groupe Scolaire ISPAM';
    case 'Céleste':
      return 'Groupe Scolaire Céleste';
    case 'La Silhouette':
      return 'Collège La Silhouette';
    default:
      return name;
  }
}

// Fonctions proposées à l'inscription, 28 oct. 2026 : une seule
// fonction cochée par membre, dans cette liste, sans texte libre.
const List<String> kFonctions = [
  // Carte 83, 7 nov. 2026 : « Plateforme », en tête, fonction
  // déterminante. Choisie, aucun établissement n'est proposé
  // à l'inscription, et le parcours devient celui de l'abonnement
  // Plateforme, 100 000 FCFA par an, pour publier des enseignements.
  'Plateforme',
  'Président',
  'Secrétaire',
  'Trésorier',
  'Chantre',
  'Organisateur',
  'Responsable',
  'Leader',
  'PCA',
  'Coordinateur',
  'Membre',
  'Membre Actif',
  'Intercesseur',
  'Ancien',
  'Diacre',
  'Nouveau membre',
  'Aucun',
];

// Recherche sans accents, 28 oct. 2026 : taper « president »
/// sans accent retrouve « Président », comme « tresorier »
/// retrouve « Trésorier ».
String sansAccents(String v) {
  var out = v.toLowerCase();
  const repl = {'à': 'a', 'â': 'a', 'ä': 'a', 'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e', 'î': 'i', 'ï': 'i', 'ô': 'o', 'ö': 'o', 'ù': 'u', 'û': 'u', 'ü': 'u', 'ç': 'c', 'ÿ': 'y'};
  repl.forEach((k, r) => out = out.replaceAll(k, r));
  return out;
}
