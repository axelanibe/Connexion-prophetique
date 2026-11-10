// ═══════════════════════════════════════════════════════════════════
//  CONNEXION PROPHÉTIQUE — Application complète en un seul fichier
//  « Former pour mieux servir »
// ═══════════════════════════════════════════════════════════════════
//
//  Remplace lib/main.dart par ce fichier.
//  Flutter 3.27+ / Material 3.
//
//  1) Dépendance :  flutter pub add url_launcher
//  2) Android 11+ : dans android/app/src/main/AndroidManifest.xml, avant <application> :
//       <queries>
//         <intent><action android:name="android.intent.action.VIEW" /><data android:scheme="https" /></intent>
//         <intent><action android:name="android.intent.action.SENDTO" /><data android:scheme="mailto" /></intent>
//       </queries>
//  3) Logo : assets/logo.png, déclaré dans pubspec.yaml :
//       flutter:
//         uses-material-design: true
//         assets:
//           - assets/logo.png
//     (sans logo, un texte de secours s'affiche)
//  4) Constantes renseignées ci-dessous avec les valeurs déjà fournies
//     par Axel, et non inventées. Reste vide : le code de l'espace
//     structure, non fourni. Depuis le 27 oct. 2026, ce vide ne bloque
//     plus : à la première ouverture, l'utilisateur crée lui-même son
//     code, enregistré localement seulement. En production, la
//     connexion de la structure doit passer par le serveur, jamais par
//     un code dans l'application.
//
//  Corrections appliquées à l'intégration du 26 octobre 2026, par
//  rapport au fichier brut fourni :
//  - écran d'ouverture : touch pour passer, respect de la réduction
//    des animations, seul texte « Former pour mieux servir » ;
//  - action Bible de l'accueil : elle ouvre l'onglet Bible, et non
//    une nouvelle page Bible, pour éviter deux entrées Bible ;
//  - verset du jour : un vrai verset avec sa référence, Psaume 23:1,
//    et non un texte générique en attente de la source ;
//  - carte de membre et pass de camp : vrai QR généré depuis le
//    matricule, et non une icône de QR ;
//  - lien Wave et adresse de prière : valeurs déjà fournies par Axel,
//    et non des constantes vides qui désactiveraient les paiements
//    et la prière par e-mail.
//  ÉTAT : tout fonctionne en mémoire (démonstration complète des parcours).
//  Les données sont perdues à la fermeture : la persistance, la vraie
//  confirmation Wave (webhook), la source biblique et la lecture
//  audio relèvent du serveur / de packages à brancher (voir feuille de route).
//  Rien n'est inventé : tout champ non fourni reste « À confirmer » / « À compléter ».
// ═══════════════════════════════════════════════════════════════════

import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:math';
import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/rendering.dart';
import 'package:image/image.dart' as img;
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';
import 'package:file_picker/file_picker.dart';
import 'package:gal/gal.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:cached_network_image_platform_interface/cached_network_image_platform_interface.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:share_plus/share_plus.dart';
import 'package:permission_handler/permission_handler.dart';

import 'anniversaire.dart';
import 'fuseau_membre.dart';
import 'indicatif_pays.dart';
import 'carte_nouvelle.dart';
import 'api.dart';
import 'stockage_auth.dart';
import 'audio.dart';
import 'bug_reports.dart';
import 'remote_config.dart';
import 'design_config.dart';
import 'package:path_provider/path_provider.dart';
import 'bible.dart';
import 'meditation_journal.dart';
import 'bible_sync.dart';
import 'dictionary.dart';
import 'strong_lexicon.dart';
import 'littre.dart';
import 'verse_words.dart';
import 'word_sense.dart';
import 'notifications.dart';
import 'push_notifications.dart';
import 'home_web.dart';
import 'meditation_share.dart';
import 'visite_guidee.dart';
import 'kairos_countdown.dart';
import 'text_size.dart';
import 'notif_settings.dart';
import 'responsive.dart';
import 'retreat_poster.dart';
import 'web_assets.dart';
import 'header_logo.dart';
import 'i18n.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';
import 'link_embed.dart';
import 'link_view.dart';
import 'tab_title.dart';
import 'telechargement_image.dart';
import 'telechargement_audio.dart';
import 'route_path.dart';
import 'print_doc.dart';
import 'print_html.dart';
import 'signature_admin.dart';
import 'admin_pages.dart' deferred as admin;
import 'differe_membre.dart' deferred as membre;
import 'emploi_absence.dart' deferred as emploi;
import 'plateforme.dart' deferred as plateforme;
import 'elections.dart' deferred as elections;
import 'retrait_chargement.dart';
import 'app_models.dart';
import 'ux_global.dart';
export 'app_models.dart';

part 'quiz_bank.dart';

// ───────────── CONSTANTES DE LA STRUCTURE ─────────────
/// Lien Wave Business de la structure, fourni par Axel le 25 octobre 2026.
/// Confirmé par Axel le 4 novembre 2026 comme lien de la structure,
/// tel quel. Si la structure fournit un autre lien, remplacer cette
/// seule constante. Ne jamais inventer un autre lien.
const String kWaveBaseUrl =
    'https://pay.wave.com/m/M_ci_6r2wC06ngy-3/c/ci/';

/// Orange Money, réactivé le 4 nov. 2026, tranche Orange Money, même
/// principe que Wave : lien fourni et confirmé expressément par Axel
/// le 4 nov. 2026 comme lien de CONNEXION PROPHÉTIQUE, même si son
/// chemin dit odyssee. Ne pas remplacer par un autre lien, ne jamais
/// en inventer un. Montant généré automatiquement par l'application
/// en paramètre amount, en nombre entier, en conservant id et v.
/// Limite honnête, non prouvée : rien ne prouve que Kapptivate
/// Orange Money verrouille ce paramètre amount côté Orange. Si le
/// paramètre est ignoré, le membre saisit le montant affiché dans
/// l'application, et la structure vérifie l'équivalent reçu avant
/// de valider. Aucune confirmation automatique, aucune clé API,
/// aucun agrégateur.
const String kOrangeMoneyBaseUrl =
    'https://multi.app.orange-money.com/app/v1/kapptivate/qrcode/odyssee/?id=codgen70-9d3f1d16278e4539bbe96bb2f3426116&v=1';

/// Troisième moyen de paiement, PayPal, ajouté le 27 octobre 2026,
/// en plus de Wave, sans le remplacer. Adresse
/// PayPal fournie par Axel le 27 octobre 2026. Parcours identique :
/// choix du moyen, montant de référence affiché avant l'ouverture,
/// demande créée avec ce montant, statut en attente, jamais payée
/// sur seul lien ou seule capture, facture uniquement après
/// confirmation vérifiée ou validation par la structure après
/// contrôle de son compte PayPal. Limite honnête : PayPal ne
/// propose pas le FCFA, donc le lien
/// de don PayPal ne porte pas de montant verrouillé en FCFA. Le
/// membre saisit l'équivalent dans la devise proposée par PayPal,
/// et c'est la structure qui vérifie l'équivalent reçu avant
/// de valider.
const String kPayPalEmail = 'support@connexionprophetique.com';

/// Adresse e-mail qui reçoit les sujets de prière, fournie par Axel.
const String kStructureEmail = 'support@connexionprophetique.com';

/// Code d'accès de l'espace structure (DÉMO LOCALE uniquement).
/// Non fourni à ce jour, donc l'espace reste désactivé.
/// En production : connexion serveur avec rôles, jamais de code dans l'app.
const String kAdminPin = '';

/// Carte 116, 9 nov. 2026 : à la première ouverture après une
/// installation, toute session restaurée par une ancienne sauvegarde
/// est effacée, pour que l'écran d'accueil avec la photo réapparaisse,
/// puis l'écran de connexion, sans aucun compte connecté. Le marqueur
/// de première ouverture vit hors sauvegarde, il disparaît à la
/// désinstallation et survit aux simples mises à jour, donc la case
/// « Rester connecté » garde son comportement entre deux ouvertures
/// normales. Le journal, la taille du texte et les réglages restent :
/// ce sont les données personnelles de l'appareil, pas une session.
/// Ne bloque jamais le démarrage, même en cas d'échec.
Future<void> effacerSessionRestaureeSiPremierLancement() async {
  try {
    if (!await StockageAuth.premierLancement()) return;
    await StockageAuth.effacer('api_access_token');
    await StockageAuth.effacer('api_refresh_token');
    await StockageAuth.effacer('adminPinHash');
    final prefs = await SharedPreferences.getInstance();
    // Clés de l'ancienne sauvegarde : profil et caches liés au membre,
    // drapeaux de première ouverture. Sans elles, le démarrage retombe
    // sur la présentation, les autorisations, l'écran d'ouverture avec
    // la photo, puis la connexion.
    const clesSession = <String>[
      'api_access_token',
      'api_refresh_token',
      'adminPinHash',
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
  // d'optimisation du démarrage : les quatre lectures ne dépendent
  // d'aucune autre, chacune ne lit que ses propres clés
  // SharedPreferences, restoreToken les jetons, app.load le profil
  // local, textSize.load la taille du texte, notifSettings.load les
  // catégories, sans jamais utiliser le résultat d'une autre.
  await Future.wait([
    api.restoreToken(), // jetons serveur conservés sur l'appareil
    app.load(), // restaure profil, plan de 21 jours et journal
    textSize.load(), // taille du texte de lecture, conservée sur l'appareil
    notifSettings.load(), // réglages des notifications par catégorie, sur l'appareil
  ]);
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
  static const navy = Color(0xFF0B1F3A);
  static const gold = Color(0xFFD4A72C); // or première conception, 26 oct. 2026, sur fond bleu nuit uniquement
  static const goldDeep = Color(0xFF8A6A12); // texte or sur fond clair (AA)
  static const paper = Color(0xFFF5F6FA);
  static const card = Color(0xFFFFFFFF);
  static const ink = Color(0xFF0B1F3A);
  static const inkMuted = Color(0xFF55607A);
  static const line = Color(0xFFE2E5EE);
  static const verseTint = Color(0xFFFDF4D8);
  static const verseLine = Color(0xFFEBD98E);
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
  // pour le texte, Outfit pour les titres, via google_fonts, avec
  // repli système si la police n'est pas disponible hors ligne.
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



/// Verset d'anniversaire, tranche 5, 4 nov. 2026 : remplace le
/// verset fixe Psaume 118:24 du 29 oct. 2026. Le choix est désormais
/// déterministe par membre et par année, voir lib/anniversaire.dart.
/// Le texte est toujours lu dans BibleService, jamais recopié ici.
BibleVerseRef? birthdayVerse(String lang, String matricule, int annee) =>
    anniversaireVerset(lang, matricule, annee);

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
  } catch (_) {}
}

class AppState extends ChangeNotifier {
  Member? member;
  bool isAdmin = false;
  // Rôle exact, 28 oct. 2026 : le serveur ne donne pas les mêmes
  // droits aux deux rôles. Un administrateur d'établissement ne
  // peut ni valider un paiement, ni publier un livre, un camp, un
  // enseignement ou un responsable, ni créer un établissement :
  // ces options ne doivent donc pas lui apparaître, pas seulement
  // lui être refusées au toucher.
  bool isAdminGeneral = false;
  // Administrateur d'établissement : administrateur sans être général.
  // Il voit son périmètre en lecture, jamais celui des autres.
  bool get isAdminEtablissement => isAdmin && !isAdminGeneral;

  // Lecteur audio global, 28 oct. 2026 : un seul lecteur pour les
  // enseignements et les musiques, créé une fois avec l'état de
  // l'application. Il n'est jamais détruit quand on quitte la page
  // du lecteur, donc la lecture continue quand on change d'onglet
  // dans l'application. Une mini barre dans la coquille permet
  // de reprendre, de mettre en pause ou d'arrêter.
  final AudioPlayer bgPlayer = AudioPlayer();
  Teaching? currentTeaching;
  // Carte 53, 6 nov. 2026 : vrai quand le lecteur lit le fichier
  // téléchargé, pas le flux en ligne. La mini barre l'affiche.
  bool currentTeachingHorsLigne = false;

  // Annonces audio, 29 oct. 2026 : cartes façon Wave sur l'accueil.
  // L'état d'écoute et de fermeture est gardé sur cet appareil
  // seulement, jamais envoyé au serveur : une annonce écoutée ou
  // fermée disparaît de l'accueil de ce membre, sur cet appareil,
  // mais reste visible pour les autres membres. Aucun lien avec
  // les enseignements, dont la liste n'est jamais réutilisée ici.
  final annoncesAudioHidden = <String>{};
  String? currentAnnonceId;
  StreamSubscription<PlayerState>? _annonceSub;

  // Élection en cours, carte 76, 7 nov. 2026 : l'élection ouverte
  // venue du serveur, ou null hors période. La tuile Élections de
  // l'onglet Structure ne s'affiche que quand ce champ n'est pas
  // null ; hors période, aucune tuile, aucun menu, aucune trace.
  // Mis à jour à chaque synchronisation, sans faire échouer la
  // synchronisation si l'appel échoue, comme les annonces audio.
  Map<String, dynamic>? electionOuverte;

  /// Lecture d'une annonce dans le lecteur audio existant, sans
  /// créer un nouveau lecteur. À la fin de l'écoute, la carte
  /// disparaît de l'accueil de ce membre, comme le modèle Wave.
  /// Renvoie faux si l'audio ne démarre pas (lien invalide, hors
  /// ligne), sans jamais masquer l'annonce dans ce cas.
  Future<bool> playAnnonce(AnnonceAudio a) async {
    await _annonceSub?.cancel();
    _annonceSub = null;
    currentAnnonceId = a.serverId;
    changed();
    try {
      await playStreamingUrl(bgPlayer, a.audioUrl);
      await bgPlayer.play();
    } catch (_) {
      currentAnnonceId = null;
      changed();
      return false;
    }
    _annonceSub = bgPlayer.playerStateStream.listen((s) {
      if (s.processingState == ProcessingState.completed && currentAnnonceId == a.serverId) {
        unawaited(hideAnnonce(a.serverId));
      }
    });
    return true;
  }

  Future<bool> toggleAnnonce(AnnonceAudio a) async {
    if (currentAnnonceId == a.serverId) {
      try {
        if (bgPlayer.playing) {
          await bgPlayer.pause();
        } else {
          await bgPlayer.play();
        }
        changed();
        return true;
      } catch (_) {
        return false;
      }
    }
    return playAnnonce(a);
  }

  /// Arrêt du suivi d'écoute d'annonce, sans toucher à la lecture
  /// en cours : appelé quand un enseignement démarre, pour que la
  /// fin de l'enseignement ne fasse jamais disparaître une annonce.
  void stopAnnonceTracking() {
    unawaited(_annonceSub?.cancel());
    _annonceSub = null;
    currentAnnonceId = null;
  }

  /// Masquage local d'une annonce (écoute complète ou X), gardé
  /// sur cet appareil seulement. Une annonce fermée par accident
  /// est perdue pour ce membre sur cet appareil, c'est le modèle
  /// Wave voulu ; il n'y a pas de liste de réécoute en version 1.
  Future<void> hideAnnonce(String id) async {
    annoncesAudioHidden.add(id);
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setStringList('annonces_audio_masquees', annoncesAudioHidden.toList());
    } catch (_) {}
    if (currentAnnonceId == id) {
      await _annonceSub?.cancel();
      _annonceSub = null;
      currentAnnonceId = null;
    }
    changed();
  }

  /// Masquage local d'une carte vidéo (X), gardé sur cet
  /// appareil seulement, comme les annonces audio.
  Future<void> hideCarteVideo(String id) async {
    cartesVideoMasquees.add(id);
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setStringList('cartes_video_masquees', cartesVideoMasquees.toList());
    } catch (_) {}
    changed();
  }

  /// Fiches santé en attente après une inscription, 31 oct. 2026 :
  /// clés « matricule:camp », gardées sur cet appareil seulement,
  /// comme les annonces masquées. Tant qu'une clé est présente,
  /// la carte de l'inscription propose « Compléter ma fiche
  /// santé » à la place du pass.
  final fichesSanteEnAttente = <String>{};
  String cleFicheEnAttente(String matricule, String campId) => '$matricule:$campId';
  Future<void> marquerFicheSanteEnAttente(String cle) async {
    fichesSanteEnAttente.add(cle);
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setStringList('fiches_sante_en_attente', fichesSanteEnAttente.toList());
    } catch (_) {}
    changed();
  }

  Future<void> effacerFicheSanteEnAttente(String cle) async {
    fichesSanteEnAttente.remove(cle);
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setStringList('fiches_sante_en_attente', fichesSanteEnAttente.toList());
    } catch (_) {}
    changed();
  }

  // Demande de retour à l'accueil, 27 oct. 2026 : un appui sur le
  // logo de l'en-tête incrémente ce compteur, l'écran d'accueil
  // revient alors sur l'onglet Accueil, même si l'utilisateur
  // venait d'un autre onglet ou d'une page poussée par-dessus.
  int homeRequest = 0;
  void requestHome() {
    homeRequest++;
    notifyListeners();
  }

  /// Code d'accès à l'espace structure choisi par l'utilisateur, 27 oct.
  /// 2026 : il n'est jamais stocké en clair. Seule une empreinte locale
  /// est conservée dans SharedPreferences, sur cet appareil seulement,
  /// jamais envoyée au serveur, jamais écrite dans le code, jamais
  /// affichée. C'est un verrou d'usage local, pas une protection
  /// cryptographique forte et pas un compte serveur : la publication
  /// serveur garde ses propres règles (compte administrateur).
  /// Si un kAdminPin est un jour configuré dans le code, ce code-là
  /// reste valable en plus du code local.
  String? _localAdminPinHash;
  bool get hasLocalAdminPin => _localAdminPinHash != null && _localAdminPinHash!.isNotEmpty;
  static String _hashPin(String pin) {
    // Empreinte simple et déterministe, sans dépendance externe : elle
    // évite de conserver le code en clair dans les préférences.
    var h = 5381;
    final bytes = utf8.encode(pin);
    for (var round = 0; round < 1000; round++) {
      for (final b in bytes) {
        h = ((h << 5) + h) ^ b;
        h = h & 0xFFFFFFFF;
      }
    }
    return h.toRadixString(16).padLeft(8, '0');
  }

  bool checkLocalAdminPin(String pin) => hasLocalAdminPin && _hashPin(pin) == _localAdminPinHash;
  void setLocalAdminPin(String pin) {
    _localAdminPinHash = _hashPin(pin);
    notifyListeners();
    _save();
  }

  /// Langue de toute l'application : 'fr' (Louis Segond) ou 'en'
  /// (King James). Les pages Bible, Quiz et accueil la lisent ici,
  /// la bascule de l'en-tête la change pour toutes, pas seulement
  /// pour le verset et le quiz de l'accueil.
  /// Configuration pilotée par le serveur (modèle Desjardins, 27 oct.
  /// 2026) : textes d'accueil, libellés, messages, activation des
  /// sections. Chargée en local au démarrage, puis relue sur /config
  /// à chaque synchronisation. Si le serveur est injoignable, la
  /// dernière configuration locale est gardée, sinon les défauts.
  RemoteConfig remoteConfig = RemoteConfig.defaults();
  Future<void> applyRemoteConfig(Map<String, dynamic> json) async {
    if (json.isEmpty) return;
    remoteConfig = RemoteConfig.fromJson(json);
    setCurrentRemoteConfig(remoteConfig);
    notifyListeners();
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('remote_config_json', jsonEncode(remoteConfig.toJson()));
    } catch (_) {}
  }

  /// Configuration design pilotée par le serveur, carte 47, 6 nov.
  /// 2026 : couleurs, titres d'accueil et ordre de la barre du bas.
  /// Chargée en local au démarrage, puis relue sur /config/design
  /// à chaque synchronisation. Si le serveur est injoignable, la
  /// dernière configuration locale est gardée, sinon les défauts.
  DesignConfig designConfig = DesignConfig.defaults();
  Future<void> applyDesignConfig(Map<String, dynamic> json) async {
    if (json.isEmpty) return;
    designConfig = DesignConfig.fromJson(json);
    setCurrentDesignConfig(designConfig);
    notifyListeners();
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('design_config_json', jsonEncode(designConfig.toJson()));
    } catch (_) {}
  }

  String lang = 'fr';
  void setLang(String value) {
    if (value != 'fr' && value != 'en') return;
    if (lang == value) return;
    lang = value;
    setCurrentLang(value);
    notifyListeners();
    _save();
  }

  /// Achats retirés de l'affichage « Mes achats » par l'utilisateur,
  /// clé « référence:idLivre ». Les demandes elles-mêmes ne sont pas
  /// supprimées : la restauration les réaffiche, sans toucher au
  /// paiement ni à la facture.
  final removedPurchaseKeys = <String>{};
  void removePurchase(String key) {
    removedPurchaseKeys.add(key);
    notifyListeners();
  }
  void restorePurchases() {
    removedPurchaseKeys.clear();
    notifyListeners();
  }
  void restorePurchase(String key) {
    removedPurchaseKeys.remove(key);
    notifyListeners();
  }

  /// État de la connexion au serveur de production.
  /// 'local' : données locales, serveur non joint. 'serveur' : données
  /// publiques synchronisées depuis le serveur. 'erreur' : tentative
  /// échouée, données locales conservées.
  String serverStatus = 'local';

  /// Paiements en attente de validation, pour l'administrateur général
  /// seulement : bandeau sur l'accueil, point sur Plus, et alerte
  /// système quand le nombre augmente pendant que l'application tourne.
  int pendingPaymentsCount = 0;
  bool pendingPaymentsKnown = false;

  /// Cloche de notifications internes, 29 oct. 2026 : liste lue à
  /// l'ouverture et compteur de non lues, pour le membre connecté
  /// seulement. Le serveur filtre sur le jeton, jamais sur un
  /// identifiant fourni par l'application. Aucune notification
  /// poussée, aucun e-mail, aucun SMS : la cloche est interne.
  List<Map<String, dynamic>> notifications = [];
  int unreadNotifications = 0;

  /// Rappel de cotisation du mois en cours, 29 oct. 2026 : vrai
  /// quand le serveur a émis la ligne de rappel, donc à partir du
  /// 15 et tant que la cotisation n'est pas soldée. La carte
  /// d'accueil persiste tant que cette ligne existe, même lue.
  bool get hasCotisationReminder => notifications.any((n) => (n['type'] ?? '') == 'cotisation_rappel');

  /// Actualise la cloche, sans jamais échouer la synchronisation :
  /// hors ligne, la dernière liste connue est gardée. La
  /// notification locale de cotisation suit, programmée ou annulée
  /// selon la présence du rappel, à chaque synchronisation.
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

  /// Marque une notification comme lue, d'abord en local pour un
  /// retour immédiat, puis côté serveur, avec resynchronisation
  /// en cas d'échec.
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

  /// Marque toutes les notifications comme lues, même modèle.
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

  /// Synchronise les contenus publics depuis l'API de production.
  /// Une liste n'est remplacée que si le serveur renvoie au moins un
  /// élément pour elle : un catalogue serveur encore vide ne doit pas
  /// effacer les contenus déjà présents sur l'appareil. Les
  /// identifiants serveur sont conservés, car ils servent aux
  /// inscriptions, aux achats et aux fichiers côté serveur.
  // Synchronisation des paiements au chargement, 28 oct. 2026 :
  // quand un membre clique sur Payer, sa demande est créée côté
  // serveur en attente, l'administrateur la voit et la valide, et
  // au prochain chargement l'application du membre retrouve ici
  // le statut serveur, confirmé ou refusé, même si la demande
  // locale a disparu, car les demandes ne sont pas sauvegardées
  // sur l'appareil. Les livres d'un achat confirmé sont retrouvés
  // par leur identifiant serveur, pour débloquer le fichier.
  Future<void> syncServerPayments() async {
    if (member == null || !api.isConnected) return;
    try {
      final list = await api.fetchMyPayments();
      var changed = false;
      // Du plus ancien au plus récent, insérés en tête : l'ordre
      // final reste du plus récent au plus ancien, comme le serveur.
      for (final p in list.reversed) {
        final ref = (p['reference'] ?? '').toString();
        final statut = (p['statut'] ?? '').toString();
        if (ref.isEmpty) continue;
        final existing = requests.where((r) => r.ref == ref).toList();
        if (existing.isNotEmpty) {
          final r = existing.first;
          if (statut == 'confirme' && !r.confirmed) {
            confirm(r);
            changed = true;
          } else if (statut == 'refuse' && !r.refused) {
            r.refused = true;
            r.refusedAt = DateTime.tryParse((p['refuse_le'] ?? '').toString()) ?? DateTime.now();
            changed = true;
          }
          // Versement du camp, 31 oct. 2026 : le nom du camp et le
          // numéro du versement arrivent avec la ligne serveur.
          if (r.kind == 'camp') {
            final nom = (p['camp_nom'] ?? '').toString();
            final numero = (p['numero_versement'] as num?)?.toInt() ?? 0;
            final evid = (p['evenement_id'] ?? '').toString();
            if ((nom.isNotEmpty && r.campName != nom) || (numero != 0 && r.numeroVersement != numero) || (evid.isNotEmpty && r.evenementId != evid)) {
              if (nom.isNotEmpty) r.campName = nom;
              if (numero != 0) r.numeroVersement = numero;
              if (evid.isNotEmpty) r.evenementId = evid;
              changed = true;
            }
            // Don de camp et paiement en une fois, 31 oct. 2026 :
            // les marqueurs arrivent avec la ligne serveur.
            final benefSync = (p['beneficiaire_nom'] ?? '').toString();
            final roleSync = (p['role_don'] ?? '').toString();
            final donateurSync = (p['donateur_nom'] ?? '').toString();
            if ((benefSync.isNotEmpty && r.donBeneficiaireNom != benefSync) || (roleSync.isNotEmpty && r.donRole != roleSync) || (donateurSync.isNotEmpty && r.donateurNom != donateurSync)) {
              if (benefSync.isNotEmpty) r.donBeneficiaireNom = benefSync;
              if (roleSync.isNotEmpty) r.donRole = roleSync;
              if (donateurSync.isNotEmpty) r.donateurNom = donateurSync;
              changed = true;
            }
            if (numero == 0 && benefSync.isEmpty && !r.campTotal) {
              r.campTotal = true;
              changed = true;
            }
          }
          final lignesExistantes = p['lignes'];
          if (r.kind == 'achat' && lignesExistantes is List) {
            for (final l in lignesExistantes) {
              final livreId = (l['livre_id'] ?? '').toString();
              final titre = (l['titre'] ?? '').toString();
              final auteur = (l['auteur'] ?? '').toString();
              final book = findBookForItem(PurchaseItem(-1, titre, auteur, 0, serverId: livreId));
              final existing = r.items.where((i) => i.serverId == livreId || i.title == titre).toList();
              if (existing.isNotEmpty) {
                final item = existing.first;
                if (book != null) item.bookId = book.id;
                if (livreId.isNotEmpty) item.serverId = livreId;
                changed = true;
              } else if (r.items.isEmpty) {
                r.items.add(PurchaseItem(book == null ? -1 : book.id, titre, auteur, (l['prix_fcfa'] as num?)?.toInt() ?? 0, serverId: livreId));
                changed = true;
              }
            }
          }
          continue;
        }
        final type = (p['type'] ?? 'don').toString();
        final amount = (p['montant_fcfa'] as num?)?.toInt() ?? 0;
        final date = DateTime.tryParse((p['cree_le'] ?? '').toString()) ?? DateTime.now();
        final items = <PurchaseItem>[];
        final lignes = p['lignes'];
        if (lignes is List) {
          for (final l in lignes) {
            final livreId = (l['livre_id'] ?? '').toString();
            final book = books.where((b) => b.serverId == livreId).toList();
            // Titre, auteur et prix viennent de la copie serveur de
            // la ligne : l'achat reste visible même si le livre a
            // quitté le catalogue local, au lieu de disparaître.
            items.add(PurchaseItem(book.isEmpty ? -1 : book.first.id, (l['titre'] ?? '').toString(), (l['auteur'] ?? '').toString(), (l['prix_fcfa'] as num?)?.toInt() ?? 0, serverId: livreId));
          }
        }
        final r = PayRequest(ref, type, amount, items, member!.name, member!.matricule, date,
            campName: (p['camp_nom'] ?? '').toString(),
            numeroVersement: (p['numero_versement'] as num?)?.toInt() ?? 0,
            evenementId: (p['evenement_id'] ?? '').toString(),
            campTotal: type == 'camp' && ((p['numero_versement'] as num?)?.toInt() ?? 0) == 0 && (p['beneficiaire_nom'] ?? '').toString().isEmpty,
            donBeneficiaireNom: (p['beneficiaire_nom'] ?? '').toString(),
            donRole: (p['role_don'] ?? '').toString(),
            donateurNom: (p['donateur_nom'] ?? '').toString());
        if (statut == 'confirme') {
          r.confirmed = true;
          r.confirmedAt = DateTime.tryParse((p['confirme_le'] ?? '').toString());
          if (type == 'carte') paidCardMatricules.add(member!.matricule);
        } else if (statut == 'refuse') {
          r.refused = true;
          r.refusedAt = DateTime.tryParse((p['refuse_le'] ?? '').toString());
        }
        requests.insert(0, r);
        changed = true;
      }
      if (changed) {
        notifyListeners();
        _save();
      }
    } catch (_) {
      // Serveur injoignable ou paiements indisponibles : les
      // demandes locales restent affichées en attente, sans erreur.
    }
  }

  // Paiement du camp en 6 fois, 31 oct. 2026 : les inscriptions
  // serveur du membre, avec la progression des versements. Les
  // inscriptions déjà connues voient leur progression mise à jour,
  // les autres sont recréées pour que la carte de progression
  // survive à un redémarrage. Les inscriptions locales hors
  // serveur (sans identifiant serveur) ne sont jamais touchées.
  // Le serveur reste la source de vérité pour le pass visible.
  Future<void> refreshInscriptionsProgress() async {
    if (member == null || !api.isConnected) return;
    try {
      final list = await api.fetchMesInscriptions();
      var changed = false;
      for (final row in list) {
        final serverId = (row['evenement_id'] ?? '').toString();
        if (serverId.isEmpty) continue;
        final campsIci = camps.where((c) => c.serverId == serverId).toList();
        if (campsIci.isEmpty) continue;
        final camp = campsIci.first;
        final tarif = (row['tarif_fcfa'] as num?)?.toInt() ?? 0;
        final paye = (row['montant_paye'] as num?)?.toInt() ?? 0;
        final valides = (row['versements_valides'] as num?)?.toInt() ?? 0;
        final requis = row['versements_requis'] == true;
        final visible = row['pass_visible'] != false;
        final code = (row['code_pass'] ?? '').toString();
        final date = DateTime.tryParse((row['inscrit_le'] ?? '').toString()) ?? DateTime.now();
        final montantSuivant = valides >= 6 ? null : montantVersementCamp(tarif, valides + 1);
        final existants = registrations.where((r) => r.member.matricule == member!.matricule && (r.camp.serverId == serverId || r.camp.serverId.isEmpty && r.camp.id == camp.id)).toList();
        if (existants.isNotEmpty) {
          final r = existants.first;
          // La carte du camp est rattachée à la version synchronisée,
          // pour que le toucher retrouve la bonne inscription.
          if (r.camp.serverId != serverId) {
            registrations.remove(r);
            registrations.add(Registration(camp, r.member, r.date, codePass: code.isNotEmpty ? code : r.codePass, participants: r.participants, hebergement: r.hebergement, repas: r.repas, transport: r.transport,
                tarif: tarif, montantPaye: paye, versementsValides: valides, versementsRequis: requis, passVisible: visible, montantSuivant: montantSuivant, versementSuivant: valides >= 6 ? null : valides + 1,
                versementEnAttenteRef: (row['versement_en_attente_reference'] ?? '').toString().isEmpty ? null : (row['versement_en_attente_reference'] ?? '').toString(),
                versementEnAttenteMontant: (row['versement_en_attente_montant'] as num?)?.toInt(),
                versementEnAttenteNumero: (row['versement_en_attente_numero'] as num?)?.toInt()));
            changed = true;
          } else {
            if (r.tarif != tarif || r.montantPaye != paye || r.versementsValides != valides || r.versementsRequis != requis || r.passVisible != visible || r.montantSuivant != montantSuivant || r.versementSuivant != (valides >= 6 ? null : valides + 1)) {
              r.tarif = tarif;
              r.montantPaye = paye;
              r.versementsValides = valides;
              r.versementsRequis = requis;
              r.passVisible = visible;
              r.montantSuivant = montantSuivant;
              r.versementSuivant = valides >= 6 ? null : valides + 1;
              r.versementEnAttenteRef = (row['versement_en_attente_reference'] ?? '').toString().isEmpty ? null : (row['versement_en_attente_reference'] ?? '').toString();
              r.versementEnAttenteMontant = (row['versement_en_attente_montant'] as num?)?.toInt();
              r.versementEnAttenteNumero = (row['versement_en_attente_numero'] as num?)?.toInt();
              changed = true;
            }
          }
        } else {
          registrations.add(Registration(camp, member!, date, codePass: code,
              tarif: tarif, montantPaye: paye, versementsValides: valides, versementsRequis: requis, passVisible: visible, montantSuivant: montantSuivant, versementSuivant: valides >= 6 ? null : valides + 1,
              versementEnAttenteRef: (row['versement_en_attente_reference'] ?? '').toString().isEmpty ? null : (row['versement_en_attente_reference'] ?? '').toString(),
              versementEnAttenteMontant: (row['versement_en_attente_montant'] as num?)?.toInt(),
              versementEnAttenteNumero: (row['versement_en_attente_numero'] as num?)?.toInt()));
          changed = true;
        }
      }
      if (changed) {
        notifyListeners();
        _save();
      }
    } catch (_) {
      // Serveur injoignable : la progression locale reste affichée.
    }
  }

  bool _syncing = false;
  DateTime? lastSyncAt;

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
      if (!ok) {
        serverStatus = 'erreur';
        notifyListeners();
        _syncing = false;
        lastSyncAt = DateTime.now();
        return;
      }
      // Configuration pilotée par le serveur, avant les contenus :
      // un texte ou une section changé côté serveur s'applique sans
      // nouvelle APK. En cas d'échec, fetchConfig renvoie un objet
      // vide et la dernière configuration locale est gardée.
      await applyRemoteConfig(await api.fetchConfig());
      await applyDesignConfig(await api.fetchDesignConfig());
      final etabs = await api.fetchEtablissements();
      final news = await api.fetchActualites();
      final events = await api.fetchEvenements();
      final books = await api.fetchLivres();
      final teachings = await api.fetchEnseignements();
      // Bureau, 3 nov. 2026 : l'administrateur général récupère
      // la liste complète avec id et établissement, les autres
      // passent par la route publique, qui renvoie désormais
      // aussi le nom d'établissement, sans id ni contact non public.
      List<Map<String, dynamic>> bureau;
      if (isAdminGeneral) {
        try {
          bureau = await api.fetchBureauAdmin();
        } catch (_) {
          bureau = await api.fetchBureau();
        }
      } else {
        bureau = await api.fetchBureau();
      }
      // Annonces audio : contenu non critique, son échec ne doit
      // jamais faire échouer toute la synchronisation. Null veut
      // dire échec : l'ancienne liste est alors gardée telle quelle.
      List<Map<String, dynamic>>? annonces;
      try {
        annonces = await api.fetchAnnoncesAudio();
      } catch (_) {
        annonces = null;
      }
      // Cartes vidéo : contenu non critique lui aussi, un
      // échec garde l'ancienne liste telle quelle.
      List<Map<String, dynamic>>? cartesVideo;
      try {
        cartesVideo = await api.fetchCartesVideo();
      } catch (_) {
        cartesVideo = null;
      }
      // Listes administrateur, 30 oct. 2026 : contenu non critique
      // lui aussi, un échec garde les anciennes listes telles
      // quelles, sans faire échouer la synchronisation.
      List<Map<String, dynamic>>? annoncesAdmin;
      List<Map<String, dynamic>>? cartesVideoAdmin;
      List<Map<String, dynamic>>? newsAdmin;
      if (isAdminGeneral) {
        try {
          annoncesAdmin = await api.fetchAnnoncesAudioAdmin();
        } catch (_) {
          annoncesAdmin = null;
        }
        try {
          cartesVideoAdmin = await api.fetchCartesVideoAdmin();
        } catch (_) {
          cartesVideoAdmin = null;
        }
        try {
          newsAdmin = await api.fetchActualitesAdmin();
        } catch (_) {
          newsAdmin = null;
        }
      }
      final etabNamesById = <String, String>{};
      if (etabs.isNotEmpty) {
        this.etabs.clear();
        for (final e in etabs) {
          final id = (e['id'] ?? '').toString();
          final name = (e['nom'] ?? '').toString();
          etabNamesById[id] = name;
          final etab = Etab(name, id: id, imageUrl: (e['image_id'] ?? '').toString().isEmpty ? '' : '$kApiBaseUrl/fichiers/${e['image_id']}');
          this.etabs.add(etab);
          // Activités : elles ne figurent que dans le détail de l'établissement.
          try {
            final detail = await api.fetchEtablissement(id);
            final acts = detail['activites'];
            if (acts is List) {
              for (final a in acts) {
                final titre = (a['titre'] ?? '').toString();
                if (titre.isNotEmpty) etab.activities.add(ActivityItem(titre, serverId: (a['id'] ?? '').toString(), imageUrl: (a['image_id'] ?? '').toString().isEmpty ? '' : '$kApiBaseUrl/fichiers/${a['image_id']}'));
              }
            }
          } catch (_) {
            // Détail indisponible : la liste des établissements reste affichée.
          }
        }
      } else {
        for (final e in this.etabs) {
          etabNamesById[e.id] = e.name;
        }
      }
      if (news.isNotEmpty) {
        this.news.clear();
        for (final n in news) {
          final etabId = (n['etablissement_id'] ?? '').toString();
          this.news.add(NewsItem(
            (n['titre'] ?? '').toString(),
            (n['texte'] ?? '').toString(),
            etabNamesById[etabId] ?? '',
            DateTime.tryParse((n['publiee_le'] ?? '').toString()) ?? DateTime.now(),
            etablissementId: etabId,
            imageUrl: (n['image_id'] ?? '').toString().isEmpty ? '' : '$kApiBaseUrl/fichiers/${n['image_id']}',
            serverId: (n['id'] ?? '').toString(),
            programmeeLe: DateTime.tryParse((n['programmee_le'] ?? '').toString()),
          ));
        }
      }
      // Liste administrateur des actualités, 30 oct. 2026 : la
      // liste serveur fait foi, y compris quand elle est vide.
      if (newsAdmin != null) {
        this.newsAdmin.clear();
        for (final n in newsAdmin) {
          final etabId = (n['etablissement_id'] ?? '').toString();
          this.newsAdmin.add(NewsItem(
            (n['titre'] ?? '').toString(),
            (n['texte'] ?? '').toString(),
            etabNamesById[etabId] ?? '',
            DateTime.tryParse((n['publiee_le'] ?? '').toString()) ?? DateTime.now(),
            etablissementId: etabId,
            imageUrl: (n['image_id'] ?? '').toString().isEmpty ? '' : '$kApiBaseUrl/fichiers/${n['image_id']}',
            serverId: (n['id'] ?? '').toString(),
            programmeeLe: DateTime.tryParse((n['programmee_le'] ?? '').toString()),
          ));
        }
      }
      if (events.isNotEmpty) {
        camps.clear();
        var campIndex = 0;
        for (final e in events) {
          // Retrait Réunions, 2 nov. 2026 : les événements de
          // type 'reunion' restent masqués, ils n'ont plus
          // d'espace dans l'application pour le moment.
          final type = (e['type'] ?? 'camp').toString();
          if (type == 'reunion') continue;
          final debut = (e['date_debut'] ?? '').toString();
          final fin = (e['date_fin'] ?? '').toString();
          final datesTexte = (e['dates_texte'] ?? '').toString();
          final dates = datesTexte.isNotEmpty ? datesTexte : (debut.isEmpty ? '' : (fin.isEmpty || fin == debut ? debut : '$debut - $fin'));
          camps.add(Camp(
            id: ++campIndex,
            serverId: (e['id'] ?? '').toString(),
            name: (e['nom'] ?? '').toString(),
            dates: dates,
            place: (e['lieu'] ?? '').toString(),
            // Carte 109, 8 nov. 2026 : pays où se tient l'activité,
            // vide pour les anciennes activités sans pays.
            pays: (e['pays'] ?? '').toString(),
            tariff: e['tarif_fcfa'] == null ? '' : '${e['tarif_fcfa']} FCFA',
            tarifFcfa: (e['tarif_fcfa'] as num?)?.toInt() ?? 0,
            kairos: e['est_kairos'] == true,
            type: (e['type'] ?? 'camp').toString(),
            imageUrl: (e['image_id'] ?? '').toString().isEmpty ? '' : '$kApiBaseUrl/fichiers/${e['image_id']}',
            description: (e['description'] ?? '').toString(),
            dateDebut: parseCampDate(debut),
            dateFin: parseCampDate(fin),
            nombrePlaces: (e['nombre_places'] as num?)?.toInt(),
            inscrits: (e['inscrits'] as num?)?.toInt() ?? 0,
          ));
        }
      }
      if (books.isNotEmpty) {
        final oldIds = {for (final b in this.books) b.serverId: b.id};
        var maxOldId = 0;
        for (final v in oldIds.values) {
          if (v > maxOldId) maxOldId = v;
        }
        this.books.clear();
        var i = maxOldId;
        for (final b in books) {
          final sid = (b['id'] ?? '').toString();
          this.books.add(Book(
            id: oldIds[sid] ?? ++i,
            serverId: (b['id'] ?? '').toString(),
            title: (b['titre'] ?? '').toString(),
            author: (b['auteur'] ?? '').toString(),
            description: (b['description'] ?? '').toString(),
            format: (b['format'] ?? '').toString(),
            price: (b['prix_fcfa'] as num?)?.toInt() ?? 0,
            imageUrl: (b['couverture_id'] ?? '').toString().isEmpty ? '' : '$kApiBaseUrl/fichiers/${b['couverture_id']}',
          ));
        }
      }
      if (teachings.isNotEmpty) {
        // Fusion, pas remplacement (correctif 27 oct. 2026) : les
        // enseignements et musiques ajoutés en local dans l'espace
        // structure ne doivent plus disparaître à la synchronisation.
        // Les enseignements du serveur passent d'abord, puis les
        // ajouts locaux dont le titre et l'orateur ne figurent pas
        // déjà dans la liste serveur sont conservés sur cet appareil.
        final serverTeachings = <Teaching>[];
        for (final t in teachings) {
          final audioId = (t['audio_id'] ?? '').toString();
          final lien = (t['lien_audio'] ?? '').toString();
          // Carte 53 : le serveur ne renvoie pas le type, on garde
          // le type local quand le titre et l'orateur correspondent,
          // sinon un podcast publié localement redeviendrait un
          // enseignement à chaque synchronisation.
          final typeLocal = this.teachings.where((l) =>
              l.title == (t['titre'] ?? '').toString() &&
              l.speaker == (t['orateur'] ?? '').toString()).toList();
          serverTeachings.add(Teaching(
            (t['titre'] ?? '').toString(),
            (t['orateur'] ?? '').toString(),
            audioId.isEmpty ? lien : '$kApiBaseUrl/fichiers/$audioId',
            kind: typeLocal.isEmpty ? 'enseignement' : typeLocal.first.kind,
            serverId: (t['id'] ?? '').toString(),
            thematique: (t['thematique'] ?? '').toString(),
            format: (t['format'] ?? '').toString(),
            duree: (t['duree'] ?? '').toString(),
            dateTexte: (t['date_texte'] ?? '').toString(),
            description: (t['description'] ?? '').toString(),
          ));
        }
        final keptLocal = this.teachings.where((local) => !serverTeachings.any(
            (s) => s.title == local.title && s.speaker == local.speaker));
        this.teachings
          ..clear()
          ..addAll(serverTeachings)
          ..addAll(keptLocal);
      }
      if (bureau.isNotEmpty) {
        this.bureau.clear();
        for (final b in bureau) {
          final etabServeur = (b['etablissement'] ?? '').toString();
          this.bureau.add(BureauMember(
            (b['nom'] ?? '').toString(),
            (b['fonction'] ?? '').toString(),
            (b['contact'] ?? '').toString(),
            b['contact'] != null,
            etab: etabServeur.isEmpty ? 'Structure' : etabServeur,
            serverId: (b['id'] ?? '').toString(),
            etablissementId: (b['etablissement_id'] ?? '').toString(),
          ));
        }
      }
      // Annonces audio, 29 oct. 2026 : quand la récupération a
      // réussi, la liste serveur fait foi, y compris quand elle
      // est vide, pour que le retrait d'une annonce par la
      // structure la fasse disparaître pour tous.
      if (annonces != null) {
        annoncesAudio.clear();
        for (final a in annonces) {
          final audioId = (a['audio_id'] ?? '').toString();
          final lien = (a['lien_audio'] ?? '').toString();
          annoncesAudio.add(AnnonceAudio(
            (a['titre'] ?? '').toString(),
            (a['texte'] ?? '').toString(),
            audioId.isEmpty ? lien : '$kApiBaseUrl/fichiers/$audioId',
            serverId: (a['id'] ?? '').toString(),
            publieeLe: DateTime.tryParse((a['publiee_le'] ?? '').toString()),
            programmeeLe: DateTime.tryParse((a['programmee_le'] ?? '').toString()),
          ));
        }
      }
      // Cartes vidéo, 30 oct. 2026 : quand la récupération a
      // réussi, la liste serveur fait foi, y compris quand elle
      // est vide, pour que le retrait d'une carte par la
      // structure la fasse disparaître pour tous.
      if (cartesVideo != null) {
        this.cartesVideo.clear();
        for (final v in cartesVideo) {
          this.cartesVideo.add(CarteVideo(
            (v['titre'] ?? '').toString(),
            (v['explication'] ?? '').toString(),
            (v['lien_video'] ?? '').toString(),
            serverId: (v['id'] ?? '').toString(),
          ));
        }
      }
      // Liste administrateur des annonces audio, 30 oct. 2026 :
      // la liste serveur fait foi, y compris quand elle est vide.
      if (annoncesAdmin != null) {
        annoncesAudioAdmin.clear();
        for (final a in annoncesAdmin) {
          final audioId = (a['audio_id'] ?? '').toString();
          final lien = (a['lien_audio'] ?? '').toString();
          annoncesAudioAdmin.add(AnnonceAudio(
            (a['titre'] ?? '').toString(),
            (a['texte'] ?? '').toString(),
            audioId.isEmpty ? lien : '$kApiBaseUrl/fichiers/$audioId',
            serverId: (a['id'] ?? '').toString(),
            publieeLe: DateTime.tryParse((a['publiee_le'] ?? '').toString()),
            programmeeLe: DateTime.tryParse((a['programmee_le'] ?? '').toString()),
          ));
        }
      }
      // Liste administrateur des cartes vidéo, 30 oct. 2026 :
      // la liste serveur fait foi, y compris quand elle est vide.
      if (cartesVideoAdmin != null) {
        this.cartesVideoAdmin.clear();
        for (final v in cartesVideoAdmin) {
          this.cartesVideoAdmin.add(CarteVideo(
            (v['titre'] ?? '').toString(),
            (v['explication'] ?? '').toString(),
            (v['lien_video'] ?? '').toString(),
            serverId: (v['id'] ?? '').toString(),
          ));
        }
      }
      ensureKairosCamp();
      await syncServerPayments();
      // Paiement du camp en 6 fois, 31 oct. 2026 : la progression
      // des versements est rafraîchie avec les camps, pour que la
      // carte de progression et le pass débloqué suivent les
      // validations de la structure.
      await refreshInscriptionsProgress();
      // Cloche, 29 oct. 2026 : compteur actualisé à chaque
      // synchronisation, donc aussi toutes les 60 secondes par la
      // minuterie de la coquille, et à chaque changement d'onglet.
      try {
        await refreshNotifications();
      } catch (_) {}
      if (isAdminGeneral) {
        try {
          final pending = await api.fetchAdminPayments(statut: 'en_attente');
          final count = pending.length;
          if (pendingPaymentsKnown && count > pendingPaymentsCount) {
            try {
              await DailyVerseNotifications.instance.showPayment(count);
            } catch (_) {}
          }
          pendingPaymentsCount = count;
          pendingPaymentsKnown = true;
        } catch (_) {}
      }
      // Élections, carte 76, 7 nov. 2026 : contenu non critique,
      // comme les annonces audio. Un échec garde l'ancienne valeur,
      // sans faire échouer la synchronisation. Un succès avec
      // election null efface la tuile : hors période, aucune trace.
      // Visiteurs et membres déconnectés : pas d'appel, le serveur
      // exige un jeton, la tuile reste cachée.
      if (api.isConnected) {
        try {
          final actuelle = await api.fetchElectionActuelle();
          electionOuverte = actuelle['election'] as Map<String, dynamic>?;
        } catch (_) {}
      }
      serverStatus = 'serveur';
      notifyListeners();
      // Profil serveur, si un jeton est conservé sur l'appareil.
      await syncServerProfile();
      // Favoris et surlignages Bible, 31 oct. 2026, lot 1 chantier 5 sur 6 :
      // synchronisation silencieuse pour le membre connecté seulement,
      // un échec ne fait jamais échouer la synchronisation publique.
      if (api.isConnected) {
        try {
          await BibleSync.instance.syncIfNeeded();
        } catch (_) {}
      }
    } catch (_) {
      // Un contenu en échec ne doit plus faire disparaître les
      // paiements : tentative de restauration, silencieuse si le
      // serveur est vraiment injoignable.
      try {
        await syncServerPayments();
      } catch (_) {}
      serverStatus = 'erreur';
      notifyListeners();
    }
    _syncing = false;
    lastSyncAt = DateTime.now();
    // Presence : signalee en arriere-plan, sans bloquer ni echouer
    // la synchronisation si le serveur est injoignable.
    if (api.isConnected) {
      unawaited(Future(() async {
        try {
          await api.heartbeat();
        } catch (_) {}
      }));
    }
    // Rapports de bug en attente, 29 oct. 2026 : envoyés à la
    // prochaine synchronisation, quand un membre est connecté.
    if (api.isConnected) {
      unawaited(BugReports.instance.flushPending());
    }
  }

  /// Profil venu du serveur : matricule, nom, établissement, validité
  /// et fonction sont ceux du serveur, jamais un matricule local.
  /// Le ministère et la photo locale, eux, restent locaux quand le
  /// serveur n'en a pas.
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
    // Pays de résidence venu du serveur, carte 64 : la colonne
    // n'existe pas encore côté serveur, donc vide pour l'instant.
    // Un pays serveur non vide l'emporte, sinon le pays local
    // choisi à l'inscription est gardé, jamais effacé ici.
    final paysServeur = (moi['pays_residence'] ?? moi['pays'] ?? '').toString();
    if (paysServeur.isNotEmpty) paysResidence = paysServeur;
    member = Member(name, matricule, etab, inscrit,
        fonction: serverFonction.isNotEmpty ? serverFonction : (fonction.isNotEmpty ? fonction : oldFonction), ministere: ministere,
        photoPath: serverPhoto.isNotEmpty ? '' : photoPath, photoData: serverPhoto, validUntilOverride: valide, dateNaissance: birth, telephone: (moi['telephone'] ?? '').toString(), anneeAdhesion: anneeServeur2, statutAdhesion: (moi['statut_adhesion'] ?? '').toString());
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
  int _id = 0, _mat = 0;

  final books = <Book>[];
  final camps = <Camp>[];

  /// Camp National Kairos à confirmer, du modèle web : dates, lieu
  /// et tarif restent « À confirmer », sans rien inventer, et le
  /// badge automatique à l'inscription reste testable. Ce camp
  /// local n'est ajouté que si aucun camp Kairos n'est déjà présent,
  /// serveur ou local, pour ne jamais le dupliquer, et il survit à
  /// une synchronisation serveur vide, qui effaçait auparavant
  /// tout camp local. La retraite du web, dont le nom est fourni
  /// par la capture du 27 oct. 2026, est ajoutée de la même façon.
  /// Un troisième événement du web, dont le nom n'est pas fourni,
  /// n'est pas recréé ici : la structure le publie depuis son espace.
  void ensureKairosCamp() {
    if (!camps.any((c) => c.kairos)) {
      camps.insert(0, Camp(id: 999001, name: 'Camp National Kairos', dates: '', place: '', tariff: '', kairos: true));
    }
    // Retraite du catalogue web, capture du 27 oct. 2026 : dates et
    // lieu « À confirmer », comme sur la page Camps du prototype.
    // Portée Structure par défaut, le prototype ne donnant pas
    // son rattachement à un établissement, à corriger si la
    // structure le rattache à un établissement précis.
    if (!camps.any((c) => c.name == 'Retraite de Jeûne & Prière')) {
      camps.add(Camp(id: 999002, name: 'Retraite de Jeûne & Prière', dates: '', place: '', tariff: '', type: 'retraite'));
    }
  }
  final news = <NewsItem>[];
  // Listes administrateur, 30 oct. 2026 : comme les lectures
  // membres, plus les éléments programmés, avec leur date prévue.
  final newsAdmin = <NewsItem>[];
  final bureau = <BureauMember>[];
  final teachings = <Teaching>[];
  // Tremplin professionnel, carte 82, 7 nov. 2026, ancien nom Info Emploi ou formation, et demandes à la structure,
  // cartes 63 et 65, 6 nov. 2026 : listes locales d'abord,
  // comme les enseignements, sans nouveau serveur. La
  // structure publie les offres depuis le Bureau, le membre
  // envoie ses demandes depuis Plus ou son Profil. Aucune
  // offre préremplie, aucune demande préremplie, listes
  // vides tant que personne n'a rien publié ni envoyé.
  final offresEmploi = <OffreEmploi>[];
  final demandesMembres = <DemandeMembre>[];
  // Pays de résidence du membre, carte 64, 6 nov. 2026 :
  // choisi par le membre à l'inscription, dans la liste
  // fermée kPaysResidence, modifiable depuis le Profil.
  // Vide veut dire non renseigné, jamais deviné, jamais
  // déduit du GPS ni de l'indicatif. Gardé hors de Member
  // pour ne toucher à aucun constructeur existant.
  String paysResidence = '';
  void setPaysResidence(String v) {
    paysResidence = v;
    notifyListeners();
    _save();
  }

  /// Offres visibles pour un pays : jamais mélangées par
  /// défaut. Un pays vide veut dire Tous les pays.
  List<OffreEmploi> offresPourPays(String pays) =>
      pays.isEmpty ? offresEmploi : offresEmploi.where((o) => o.pays == pays).toList();

  void ajouterOffre(OffreEmploi o) {
    offresEmploi.insert(0, o);
    changed();
  }

  void retirerOffre(OffreEmploi o) {
    offresEmploi.remove(o);
    changed();
  }

  void ajouterDemande(DemandeMembre d) {
    demandesMembres.insert(0, d);
    changed();
  }

  void changerStatutDemande(DemandeMembre d, String statut) {
    if (!kStatutsDemande.contains(statut)) return;
    d.statut = statut;
    changed();
  }

  void enregistrerNoteDemande(DemandeMembre d, String note) {
    d.noteInterne = note;
    changed();
  }

  // Abonnement Plateforme, carte 83, 7 nov. 2026 : listes
  // locales d'abord, comme les offres et demandes des cartes
  // 63 à 65, en attendant le serveur. Un enseignement déjà
  // publié reste en ligne même après la fin de la période,
  // seul le bouton Publier est bloqué sans abonnement actif.
  final enseignementsPlateforme = <EnseignementPlateforme>[];
  AbonnementPlateforme abonnementPlateforme = AbonnementPlateforme();

  /// Vrai quand le membre connecté a choisi la fonction
  /// Plateforme, à l'inscription ou depuis Modifier mes infos.
  bool get isPlateforme => (member?.fonction ?? '') == 'Plateforme';

  /// Abonnement actif : statut Actif et date de fin future.
  bool get abonnementActif => abonnementPlateforme.estActif;

  /// Période terminée : un abonnement actif dont la fin est
  /// passée. Les enseignements déjà publiés restent en ligne.
  bool get abonnementExpire => abonnementPlateforme.estExpire;

  /// Nombre de jours avant la fin, pour le rappel de renouvellement.
  int get joursRestantsAbonnement => abonnementPlateforme.joursRestants;

  void setAbonnementPlateforme(AbonnementPlateforme a) {
    abonnementPlateforme = a;
    changed();
  }

  void ajouterEnseignementPlateforme(EnseignementPlateforme e) {
    enseignementsPlateforme.insert(0, e);
    changed();
  }

  void changerStatutEnseignementPlateforme(EnseignementPlateforme e, String statut) {
    if (!kStatutsEnseignementPlateforme.contains(statut)) return;
    e.statut = statut;
    changed();
  }

  void refuserEnseignementPlateforme(EnseignementPlateforme e, String motif) {
    e.statut = 'Refusé';
    e.motifRefus = motif;
    changed();
  }

  /// Validation par la structure : l'enseignement devient
  /// Publié et apparaît dans les Enseignements pour tout le
  /// monde, gratuit, comme un enseignement de la structure.
  /// Un enseignement déjà publié par le même auteur, même
  /// titre, n'est jamais ajouté deux fois.
  void validerEnseignementPlateforme(EnseignementPlateforme e) {
    e.statut = 'Publié';
    final deja = teachings.any((t) => t.title == e.titre && t.speaker == e.auteur);
    if (!deja) {
      teachings.insert(0, Teaching(e.titre, e.auteur, e.lienAudio, kind: 'enseignement', description: e.description, format: e.format, dateTexte: e.creeLe.toIso8601String().substring(0, 10)));
    }
    changed();
  }

  void retirerEnseignementPlateforme(EnseignementPlateforme e) {
    enseignementsPlateforme.remove(e);
    if (e.statut == 'Publié') {
      teachings.removeWhere((t) => t.title == e.titre && t.speaker == e.auteur);
    }
    changed();
  }

  /// Vues, compteur local sur cet appareil seulement, en
  /// attendant le compteur serveur : une vue quand l'auteur
  /// ou la structure ouvre l'enseignement.
  void compterVuePlateforme(EnseignementPlateforme e) {
    e.vues += 1;
    changed();
  }

  /// Valider et publier une Proposition d'opportunité,
  /// modèle Bureau : l'offre est publiée avec le titre, la
  /// description et le pays de la demande, et la demande
  /// passe à Validée, en une seule fois.
  void validerProposition(DemandeMembre d, OffreEmploi o) {
    offresEmploi.insert(0, o);
    d.statut = 'Validée';
    changed();
  }

  /// Demandes visibles par un administrateur, selon son
  /// périmètre, jamais élargi : l'administrateur général
  /// voit tout, l'administrateur d'établissement voit
  /// seulement les demandes de son établissement. Une
  /// demande sans établissement ne se voit que par le
  /// général. Le membre, lui, ne voit que les siennes,
  /// par matricule, voir MesDemandesPage.
  List<DemandeMembre> demandesPourAdmin() {
    if (isAdminGeneral) return demandesMembres;
    final etab = member?.etab ?? '';
    if (etab.isEmpty) return const <DemandeMembre>[];
    return demandesMembres.where((d) => d.etablissement == etab).toList();
  }
  // Annonces audio, 29 oct. 2026 : liste serveur, séparée des
  // enseignements, jamais fusionnée avec eux.
  final annoncesAudio = <AnnonceAudio>[];
  final annoncesAudioAdmin = <AnnonceAudio>[];
  // Cartes vidéo, 30 oct. 2026 : liste serveur, téléphone
  // seulement, jamais affichée sur le web.
  final cartesVideo = <CarteVideo>[];
  final cartesVideoAdmin = <CarteVideo>[];
  final cartesVideoMasquees = <String>{};
  final cart = <Book>[];
  final requests = <PayRequest>[];
  // Matricules dont la carte a été payée puis validée : la carte est un
  // paiement unique de 1000 FCFA, non obligatoire pour utiliser
  // l'application. Les demandes sont désormais sauvegardées en
  // local en plus du serveur, le serveur restant la source de
  // vérité pour leur statut.
  final paidCardMatricules = <String>{};
  // Destinataire Wave attendu et numéro Wave confirmé du membre,
  // page Don du prototype, 27 oct. 2026. Le destinataire sert au
  // scan des reçus quand il sera livré, le numéro confirmé est
  // une relecture locale, pas encore transmise au serveur, dont
  // la création de don ne prend que le montant.
  String waveRecipient = '';
  String confirmedWaveNumber = '';
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
  void setWaveRecipient(String v) {
    waveRecipient = v;
    changed();
  }
  void setConfirmedWaveNumber(String v) {
    confirmedWaveNumber = v;
    changed();
  }
  bool hasPaidCard(String? matricule) => matricule != null && paidCardMatricules.contains(matricule);
  final registrations = <Registration>[];
  final journal = <JournalEntry>[];
  final planDone = <int>{};
  final etabs = <Etab>[Etab('ISPAM'), Etab('Céleste'), Etab('La Silhouette'), Etab('BNC')];

  // Banque complète dans lib/quiz_bank.dart (quizFr, quizEn), reprise
  // exactement du prototype web. Les 5 questions d'exemple sont supprimées.
  // Cette liste ne contient que les questions ajoutées par la structure
  // depuis l'interface ; elles sont jouées en plus de la banque choisie.
  final quiz = <QuizQ>[];
  // Rotation sans répétition, séparée par langue.
  final _seenByLang = <String, Set<int>>{};

  int nextId() => ++_id;
  void changed() {
    notifyListeners();
    _save();
  }

  /// Sauvegarde locale : uniquement les données personnelles de l'appareil.
  /// Profil et matricule, plan de 21 jours, journal privé.
  /// Le catalogue, les camps, les actualités, les quiz ajoutés, les
  /// inscriptions, les paiements, les factures et le panier ne sont pas
  /// sauvegardés ici : ils relèvent du serveur.
  Future<void> _save() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setInt('mat', _mat);
      await prefs.setString('lang', lang);
      // Code local de l'espace structure : seule l'empreinte est
      // conservée, jamais le code en clair, jamais envoyée au serveur.
      // Carte 116, 9 nov. 2026 : elle vit dans le stockage séparé,
      // exclu de la sauvegarde Android, comme les jetons de session.
      final pinHash = _localAdminPinHash;
      if (pinHash == null || pinHash.isEmpty) {
        await StockageAuth.effacer('adminPinHash');
      } else {
        await StockageAuth.ecrire('adminPinHash', pinHash);
      }
      final m = member;
      if (m == null) {
        await prefs.remove('member');
      } else {
        await prefs.setString('member', jsonEncode({'name': m.name, 'mat': m.matricule, 'etab': m.etab, 'fonction': m.fonction, 'ministere': m.ministere, 'photo': m.photoPath, 'photoData': m.photoData, 'since': m.since.toIso8601String(), 'validUntil': m.validUntilOverride?.toIso8601String(), 'birth': m.dateNaissance?.toIso8601String(), 'tel': m.telephone, 'anneeAdhesion': m.anneeAdhesion, 'statutAdhesion': m.statutAdhesion}));
        await prefs.setStringList('books', books.map((b) => jsonEncode({'id': b.id, 'title': b.title, 'author': b.author, 'desc': b.description, 'format': b.format, 'url': b.fileUrl, 'price': b.price, 'imagePath': b.imagePath, 'imageUrl': b.imageUrl, 'fichierId': b.fichierId})).toList());
        await prefs.setStringList('teachings', teachings.map((x) => jsonEncode({'title': x.title, 'speaker': x.speaker, 'url': x.url, 'kind': x.kind, 'imagePath': x.imagePath, 'imageUrl': x.imageUrl, 'thematique': x.thematique, 'format': x.format, 'duree': x.duree, 'date': x.dateTexte, 'desc': x.description})).toList());
      }
      await prefs.setStringList('paidCards', paidCardMatricules.toList());
      // Tremplin professionnel, carte 82, 7 nov. 2026, ancien nom Emploi et demandes, cartes 63 et 65, 6 nov. 2026 :
      // listes locales, comme les enseignements, gardées
      // sur cet appareil en attendant le serveur.
      await prefs.setString('pays_residence', paysResidence);
      await prefs.setStringList('offres_emploi', offresEmploi.map((o) => jsonEncode(o.toJson())).toList());
      await prefs.setStringList('demandes_membres', demandesMembres.map((d) => jsonEncode(d.toJson())).toList());
      // Abonnement Plateforme, carte 83, 7 nov. 2026 : listes
      // locales, comme les offres et demandes, en attendant
      // le serveur.
      await prefs.setStringList('enseignements_plateforme', enseignementsPlateforme.map((e) => jsonEncode(e.toJson())).toList());
      await prefs.setString('abonnement_plateforme', jsonEncode(abonnementPlateforme.toJson()));
      // Demandes de paiement, 28 oct. 2026 : un achat ne doit plus
      // disparaître du côté du client. Avant, les demandes
      // n'étaient jamais sauvegardées sur l'appareil, elles ne
      // revenaient que si la synchronisation serveur complète
      // réussissait, et Mes achats ne montrait rien si un livre
      // n'était pas retrouvé. Désormais elles survivent à la
      // fermeture, le serveur restant la source de vérité pour
      // le statut confirmé ou refusé, mis à jour à chaque
      // synchronisation.
      await prefs.setStringList('requests', requests.map((r) => jsonEncode({
        'ref': r.ref, 'kind': r.kind, 'amount': r.amount,
        'items': [for (final i in r.items) {'bookId': i.bookId, 'title': i.title, 'author': i.author, 'price': i.price, 'serverId': i.serverId}],
        'memberName': r.memberName, 'matricule': r.matricule,
        'date': r.date.toIso8601String(), 'method': r.method, 'currency': r.currency,
        'confirmed': r.confirmed, 'refused': r.refused,
        'confirmedAt': r.confirmedAt?.toIso8601String(),
        'refusedAt': r.refusedAt?.toIso8601String(),
      })).toList());
      await prefs.setString('wave_recipient', waveRecipient);
      await prefs.setString('wave_number', confirmedWaveNumber);
      await prefs.setBool('daily_verse_notif', dailyVerseNotif);
      await prefs.setBool('priere_matin_notif', priereMatinNotif);
      await prefs.setBool('bible_non_lue_notif', bibleNonLueNotif);
      await prefs.setStringList('plan', planDone.map((d) => d.toString()).toList());
      await prefs.setStringList('journal', journal.map((e) => jsonEncode({'d': e.date.toIso8601String(), 't': e.text})).toList());
    } catch (_) {
      // Échec de sauvegarde : l'application continue de fonctionner en mémoire.
    }
  }

  Future<void> load() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      _mat = prefs.getInt('mat') ?? 0;
      final savedLang = prefs.getString('lang');
      if (savedLang == 'fr' || savedLang == 'en') { lang = savedLang!; setCurrentLang(lang); }
      // Carte 116, 9 nov. 2026 : l'empreinte vit dans le stockage
      // séparé, exclu de la sauvegarde Android. Migration : l'ancienne
      // clé dans les préférences partagées est effacée, jamais relue.
      final savedPinHash = await StockageAuth.lire('adminPinHash');
      _localAdminPinHash = (savedPinHash != null && savedPinHash.isNotEmpty) ? savedPinHash : null;
      if (StockageAuth.estNatif) {
        await prefs.remove('adminPinHash');
      }
      // Dernière configuration serveur, repli hors ligne : si le
      // serveur est injoignable au démarrage, ces valeurs s'affichent.
      final savedConfig = prefs.getString('remote_config_json');
      if (savedConfig != null) {
        try {
          remoteConfig = RemoteConfig.fromJson(jsonDecode(savedConfig) as Map<String, dynamic>);
          setCurrentRemoteConfig(remoteConfig);
        } catch (_) {}
      }
      // Dernière config design, repli hors ligne, même modèle.
      final savedDesign = prefs.getString('design_config_json');
      if (savedDesign != null) {
        try {
          designConfig = DesignConfig.fromJson(jsonDecode(savedDesign) as Map<String, dynamic>);
          setCurrentDesignConfig(designConfig);
        } catch (_) {}
      }
      paidCardMatricules
        ..clear()
        ..addAll(prefs.getStringList('paidCards') ?? const <String>[]);
      // Pays de résidence, offres et demandes, cartes 63 à 65,
      // 6 nov. 2026 : relus tels quels, sans rien inventer.
      // Un ancien compte n'a pas de pays : vide, À confirmer,
      // jusqu'à ce que le membre le renseigne depuis le Profil.
      paysResidence = prefs.getString('pays_residence') ?? '';
      offresEmploi
        ..clear()
        ..addAll((prefs.getStringList('offres_emploi') ?? const <String>[]).map((x) {
          try {
            return OffreEmploi.fromJson(jsonDecode(x) as Map<String, dynamic>);
          } catch (_) {
            return null;
          }
        }).whereType<OffreEmploi>());
      demandesMembres
        ..clear()
        ..addAll((prefs.getStringList('demandes_membres') ?? const <String>[]).map((x) {
          try {
            return DemandeMembre.fromJson(jsonDecode(x) as Map<String, dynamic>);
          } catch (_) {
            return null;
          }
        }).whereType<DemandeMembre>());
      // Abonnement Plateforme, carte 83, 7 nov. 2026 : relus
      // tels quels, sans rien inventer. Un ancien compte n'a
      // ni enseignement Plateforme ni abonnement : listes vides,
      // statut Aucun, jusqu'à souscription.
      enseignementsPlateforme
        ..clear()
        ..addAll((prefs.getStringList('enseignements_plateforme') ?? const <String>[]).map((x) {
          try {
            return EnseignementPlateforme.fromJson(jsonDecode(x) as Map<String, dynamic>);
          } catch (_) {
            return null;
          }
        }).whereType<EnseignementPlateforme>());
      final savedAbo = prefs.getString('abonnement_plateforme');
      if (savedAbo != null) {
        try {
          abonnementPlateforme = AbonnementPlateforme.fromJson(jsonDecode(savedAbo) as Map<String, dynamic>);
        } catch (_) {}
      }
      // Annonces audio masquées, 29 oct. 2026 : écoutées ou
      // fermées avec le X, sur cet appareil seulement.
      annoncesAudioHidden
        ..clear()
        ..addAll(prefs.getStringList('annonces_audio_masquees') ?? const <String>[]);
      // Cartes vidéo masquées, 30 oct. 2026 : fermées avec
      // le X, sur cet appareil seulement, comme les annonces.
      cartesVideoMasquees
        ..clear()
        ..addAll(prefs.getStringList('cartes_video_masquees') ?? const <String>[]);
      // Fiches santé en attente après une inscription, 31 oct. 2026.
      fichesSanteEnAttente
        ..clear()
        ..addAll(prefs.getStringList('fiches_sante_en_attente') ?? const <String>[]);
      waveRecipient = prefs.getString('wave_recipient') ?? '';
      confirmedWaveNumber = prefs.getString('wave_number') ?? '';
      dailyVerseNotif = prefs.getBool('daily_verse_notif') ?? true;
      priereMatinNotif = prefs.getBool('priere_matin_notif') ?? true;
      bibleNonLueNotif = prefs.getBool('bible_non_lue_notif') ?? true;
      final m = prefs.getString('member');
      if (m != null) {
        final j = jsonDecode(m) as Map<String, dynamic>;
        final validSaved = j['validUntil'] as String?;
        member = Member(j['name'] as String, j['mat'] as String, j['etab'] as String, DateTime.parse(j['since'] as String), fonction: (j['fonction'] as String?) ?? '', ministere: (j['ministere'] as String?) ?? '', photoPath: (j['photo'] as String?) ?? '', photoData: (j['photoData'] as String?) ?? '', validUntilOverride: validSaved == null ? null : DateTime.tryParse(validSaved), dateNaissance: (j['birth'] as String?) == null ? null : DateTime.tryParse(j['birth'] as String), telephone: (j['tel'] as String?) ?? '', anneeAdhesion: (j['anneeAdhesion'] as num?)?.toInt(), statutAdhesion: (j['statutAdhesion'] as String?) ?? '');
      books
        ..clear()
        ..addAll((prefs.getStringList('books') ?? const <String>[]).map((x) {
          final j = jsonDecode(x) as Map<String, dynamic>;
          return Book(id: (j['id'] as num).toInt(), title: j['title'] as String, author: j['author'] as String, price: (j['price'] as num).toInt(), description: (j['desc'] as String?) ?? '', format: (j['format'] as String?) ?? '', fileUrl: (j['url'] as String?) ?? '', imagePath: (j['imagePath'] as String?) ?? '', imageUrl: (j['imageUrl'] as String?) ?? '', fichierId: (j['fichierId'] as String?) ?? '');
        }));
      teachings
        ..clear()
        ..addAll((prefs.getStringList('teachings') ?? const <String>[]).map((x) {
          final j = jsonDecode(x) as Map<String, dynamic>;
          return Teaching(j['title'] as String, (j['speaker'] as String?) ?? '', (j['url'] as String?) ?? '', kind: (j['kind'] as String?) ?? 'enseignement', imagePath: (j['imagePath'] as String?) ?? '', imageUrl: (j['imageUrl'] as String?) ?? '', thematique: (j['thematique'] as String?) ?? '', format: (j['format'] as String?) ?? '', duree: (j['duree'] as String?) ?? '', dateTexte: (j['date'] as String?) ?? '', description: (j['desc'] as String?) ?? '');
        }));
      }
      planDone
        ..clear()
        ..addAll((prefs.getStringList('plan') ?? const <String>[]).map(int.parse));
      journal
        ..clear()
        ..addAll((prefs.getStringList('journal') ?? const <String>[]).map((x) {
          final j = jsonDecode(x) as Map<String, dynamic>;
          return JournalEntry(DateTime.parse(j['d'] as String), j['t'] as String);
        }));
      // Demandes restaurées, sans doublon avec celles que la
      // synchronisation serveur ajoutera ensuite par référence.
      for (final x in prefs.getStringList('requests') ?? const <String>[]) {
        try {
          final j = jsonDecode(x) as Map<String, dynamic>;
          final ref = (j['ref'] ?? '').toString();
          if (ref.isEmpty || requests.any((r) => r.ref == ref)) continue;
          final items = <PurchaseItem>[];
          final rawItems = j['items'];
          if (rawItems is List) {
            for (final it in rawItems) {
              if (it is Map) {
                items.add(PurchaseItem((it['bookId'] as num?)?.toInt() ?? -1, (it['title'] ?? '').toString(), (it['author'] ?? '').toString(), (it['price'] as num?)?.toInt() ?? 0, serverId: (it['serverId'] ?? '').toString()));
              }
            }
          }
          final r = PayRequest(ref, (j['kind'] ?? 'don').toString(), (j['amount'] as num?)?.toInt() ?? 0, items, (j['memberName'] ?? '').toString(), (j['matricule'] ?? '').toString(), DateTime.tryParse((j['date'] ?? '').toString()) ?? DateTime.now(), method: (j['method'] ?? 'Wave').toString(), currency: (j['currency'] ?? '').toString());
          r.confirmed = j['confirmed'] == true;
          r.refused = j['refused'] == true;
          final ca = (j['confirmedAt'] ?? '').toString();
          if (ca.isNotEmpty) r.confirmedAt = DateTime.tryParse(ca);
          final ra = (j['refusedAt'] ?? '').toString();
          if (ra.isNotEmpty) r.refusedAt = DateTime.tryParse(ra);
          requests.add(r);
        } catch (_) {}
      }
      ensureKairosCamp();
    } catch (_) {
      // Données illisibles : on repart à zéro sans bloquer l'application.
    }
  }

  // L'inscription passe par le serveur (voir ProfilePage) : aucun
  // matricule local n'est plus créé. Cette méthode n'est conservée que
  // pour les profils locaux déjà enregistrés avant le branchement
  // serveur, et ne doit plus être appelée pour un nouveau membre.
  @Deprecated('Utiliser le serveur : ProfilePage puis setServerMember.')
  void createProfile(String name, String etab, {String fonction = '', String ministere = '', String photoPath = ''}) {
    _mat++;
    member = Member(name, 'CP-${_mat.toString().padLeft(6, '0')}', etab, DateTime.now(), fonction: fonction, ministere: ministere, photoPath: photoPath);
    notifyListeners();
    _save();
  }

  void setMemberPhoto(String path) {
    if (member == null) return;
    member = member!.withPhoto(path);
    notifyListeners();
    _save();
  }

  /// Envoi de la photo au serveur, 28 oct. 2026, puis affichage de
  /// la photo serveur. Renvoie true si le serveur l'a gardée, false
  /// sinon, auquel cas la photo reste visible sur cet appareil
  /// seulement, et disparaîtra à la prochaine déconnexion.
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

  // Choix de l'établissement du membre, bouton « C'est mon
  // établissement » de la page Établissements, modèle web, 27 oct.
  // 2026. Seuls les champs locaux sont conservés, la synchronisation
  // serveur peut restaurer l'établissement serveur pour un compte
  // serveur, ce qui est dit à l'utilisateur dans le compte rendu.
  void setMemberEtab(String etab) {
    if (member == null) return;
    final m = member!;
    // Correctif anniversaire, 4 nov. 2026 : même oubli que dans
    // syncServerProfile, la date et le téléphone étaient perdus ici.
    member = Member(m.name, m.matricule, etab, m.since, fonction: m.fonction, ministere: m.ministere, photoPath: m.photoPath, photoData: m.photoData, validUntilOverride: m.validUntilOverride, dateNaissance: m.dateNaissance, telephone: m.telephone, anneeAdhesion: m.anneeAdhesion, statutAdhesion: m.statutAdhesion);
    notifyListeners();
    _save();
  }

  // Modification des informations locales du membre, bouton
  // « Modifier mes informations » de la page Carte, modèle web.
  // Nom, matricule, établissement et validité ne changent pas ici,
  // seuls la fonction et le ministère, qui sont locaux, sont édités.
  void updateLocalProfile({String? fonction, String? ministere, DateTime? dateNaissance, bool clearBirth = false, int? anneeAdhesion, String? telephone, String? paysResidence}) {
    if (member == null) return;
    final m = member!;
    // Pays de résidence, carte 64 : gardé ici aussi, pour que
    // chaque mise à jour locale ne l'efface pas.
    if (paysResidence != null) this.paysResidence = paysResidence;
    // Tranche carte, 4 nov. 2026 : le telephone et l'annee d'adhesion
    // sont conserves ici, sinon chaque mise a jour locale les
    // effacait, le telephone n'etant meme pas repris avant.
    member = Member(m.name, m.matricule, m.etab, m.since, fonction: fonction ?? m.fonction, ministere: ministere ?? m.ministere, photoPath: m.photoPath, photoData: m.photoData, validUntilOverride: m.validUntilOverride, dateNaissance: clearBirth ? null : (dateNaissance ?? m.dateNaissance), telephone: telephone ?? m.telephone, anneeAdhesion: anneeAdhesion ?? m.anneeAdhesion, statutAdhesion: m.statutAdhesion);
    notifyListeners();
    _save();
  }

  void logout() {
    member = null;
    isAdmin = false;
    isAdminGeneral = false;
    unawaited(bgPlayer.stop());
    currentTeaching = null;
    stopAnnonceTracking();
    notifyListeners();
    _save();
    // Déconnexion serveur aussi, sans bloquer l'interface.
    // La poussée est désactivée d'abord, tant que le jeton serveur
    // est encore présent, puis la déconnexion serveur suit, dans
    // cet ordre, pour que la désactivation ne soit pas rejetée
    // comme non authentifiée. Un échec de désactivation ne bloque
    // jamais la déconnexion, le jeton restant sera désactivé par
    // le serveur au premier envoi invalide.
    unawaited(PushNotifications.instance
        .unregisterBeforeLogout()
        .then((_) => api.logout()));
    // Rapports de bug en attente, 29 oct. 2026 : effacés, pour ne
    // pas les envoyer sous un autre compte à la prochaine connexion.
    unawaited(BugReports.instance.clearPending());
  }

  PayRequest createRequest(String kind, int amount, {List<PurchaseItem> items = const <PurchaseItem>[], String? serverRef, String method = 'Wave', String currency = '', String campName = '', int numeroVersement = 0, String evenementId = '', bool campTotal = false, String donBeneficiaireNom = '', String donRole = '', String donateurNom = ''}) {
    final m = member!;
    // Référence serveur quand la demande a été créée côté serveur,
    // sinon référence locale provisoire, en attente de confirmation.
    final r = PayRequest(
        serverRef ??
            '${kind == 'don' ? 'DON' : kind == 'carte' ? 'CARTE' : kind == 'cotisation' ? 'COT' : kind == 'camp' ? 'CAMP' : kind == 'plateforme' ? 'PLT' : 'ACH'}-${DateTime.now().millisecondsSinceEpoch}',
        kind,
        amount,
        items,
        m.name,
        m.matricule,
        DateTime.now(),
        method: method,
        currency: currency,
        campName: campName,
        numeroVersement: numeroVersement,
        evenementId: evenementId,
        campTotal: campTotal,
        donBeneficiaireNom: donBeneficiaireNom,
        donRole: donRole,
        donateurNom: donateurNom);
    requests.insert(0, r);
    notifyListeners();
    _save();
    return r;
  }

  /// Validation explicite de la structure (compte Wave contrôlé).
  void confirm(PayRequest r) {
    r.confirmed = true;
    r.confirmedAt = DateTime.now();
    // Carte : le drapeau par matricule survit à la fermeture, même si
    // la demande elle-même n'est pas sauvegardée localement.
    if (r.kind == 'carte') paidCardMatricules.add(r.matricule);
    // Carte 83 : la validation du paiement Plateforme par la
    // structure active l'abonnement pour 12 mois, à partir de
    // la validation, jamais à partir du paiement. Un renouvellement
    // repart de la validation, jamais de l'ancienne fin.
    if (r.kind == 'plateforme') {
      final debut = DateTime.now();
      abonnementPlateforme = AbonnementPlateforme(
        statut: 'Actif',
        referencePaiement: r.ref,
        dateDebut: debut,
        dateFin: DateTime(debut.year + 1, debut.month, debut.day),
      );
    }
    notifyListeners();
    _save();
  }

  /// Refus explicite de la structure, 3 nov. 2026 : miroir de
  /// confirm, pour les paiements locaux à valider. Un refusé ne
  /// reste pas dans la file, il ne compte jamais dans les totaux,
  /// et le membre voit l'invitation à refaire sa demande.
  /// La date du refus est enregistrée, pour le filtre 72 heures
  /// de l'historique des refus, et du journal d'audit en
  /// affichage après 72 heures, sans suppression physique ici.
  void refuse(PayRequest r) {
    r.refused = true;
    r.refusedAt = DateTime.now();
    notifyListeners();
    _save();
  }

  /// Un livre est acheté quand une demande d'achat confirmée le
  /// désigne, 28 oct. 2026 : avant, seul le numéro local comptait,
  /// et ce numéro change à la synchronisation (un livre publié
  /// après son achat, un achat fait sur un autre appareil, une
  /// ligne serveur retrouvée sans livre au catalogue à cet
  /// instant). Le livre acheté affichait alors de nouveau
  /// Acheter, au lieu de Lire. Désormais, trois reconnaissances,
  /// dans cet ordre : identifiant serveur, numéro local, puis
  /// titre et auteur, qui désignent le même ouvrage.
  bool hasPurchasedBook(Book b) => requests.any((r) =>
      r.kind == 'achat' &&
      r.confirmed &&
      r.items.any((i) =>
          (i.serverId.isNotEmpty && b.serverId.isNotEmpty && i.serverId == b.serverId) ||
          i.bookId == b.id ||
          (i.title.isNotEmpty &&
              i.title == b.title &&
              (i.author.isEmpty || b.author.isEmpty || i.author == b.author))));

  /// Retrouve le livre du catalogue pour une ligne d'achat, avec
  /// les mêmes trois reconnaissances, pour Mes achats comme pour
  /// la Librairie, au lieu du seul numéro local.
  Book? findBookForItem(PurchaseItem i) {
    final byServer = i.serverId.isNotEmpty ? books.where((b) => b.serverId == i.serverId).toList() : <Book>[];
    if (byServer.isNotEmpty) return byServer.first;
    final byId = books.where((b) => b.id == i.bookId).toList();
    if (byId.isNotEmpty) return byId.first;
    final byTitle = books.where((b) => b.title == i.title && (i.author.isEmpty || b.author.isEmpty || b.author == i.author)).toList();
    if (byTitle.isNotEmpty) return byTitle.first;
    return null;
  }

  /// Le fichier n'est JAMAIS renvoyé avant un paiement confirmé.
  String? fileFor(Book b) => hasPurchasedBook(b) ? b.fileUrl : null;

  /// Tirage de quiz sans répétition tant que toutes les questions n'ont pas été passées.
  /// Banque choisie par langue (quizFr ou quizEn), plus les questions
  /// ajoutées par la structure. La rotation est séparée par langue.
  List<QuizQ> drawQuiz([int n = 5, String lang = 'fr']) {
    final bank = <QuizQ>[...(lang == 'en' ? quizEn : quizFr), ...quiz];
    if (bank.isEmpty) return [];
    final seen = _seenByLang.putIfAbsent(lang, () => <int>{});
    var pool = [for (var i = 0; i < bank.length; i++) if (!seen.contains(i)) i];
    if (pool.isEmpty) {
      seen.clear();
      pool = [for (var i = 0; i < bank.length; i++) i];
    }
    pool.shuffle(Random());
    final pick = pool.take(n).toList();
    seen.addAll(pick);
    return [for (final i in pick) bank[i]];
  }
}

final app = AppState();
final verseTts = VerseTts();

// ═══════════════════════════════════════════════════════════════════
// 3. OUTILS COMMUNS
// ═══════════════════════════════════════════════════════════════════
String fcfa(int n) {
  final s = n.toString();
  final b = StringBuffer();
  for (var i = 0; i < s.length; i++) {
    final fromEnd = s.length - i;
    b.write(s[i]);
    if (fromEnd > 1 && fromEnd % 3 == 1) b.write('\u202F');
  }
  return '$b FCFA';
}

String dateFr(DateTime d) =>
    '${d.day.toString().padLeft(2, '0')}/${d.month.toString().padLeft(2, '0')}/${d.year}';

// Paiement du camp en 6 fois, 31 oct. 2026 : montant d'un versement.
// Les 5 premiers prennent la part entière, le 6e prend le reste,
// pour que 6 versements validés égalent exactement le tarif. Le
// serveur reste la source de vérité, ce calcul ne sert qu'à
// l'affichage avant la réponse serveur.
int montantVersementCamp(int tarif, int numero) =>
    numero >= 6 ? tarif - 5 * (tarif ~/ 6) : tarif ~/ 6;

const List<int> kQuickAmounts = [1000, 2000, 5000, 10000];

void go(BuildContext c, Widget page) => Navigator.of(c).push(MaterialPageRoute(builder: (_) => page));

// Ouverture d'un écran d'administration en chargement différé,
// 31 oct. 2026 : les écrans d'administration vivent dans
// lib/admin_pages.dart, chargé à la demande. La page de chargement
// s'affiche d'abord, puis l'écran demandé la remplace ; en cas
// d'échec (par exemple hors ligne, l'administration exigeant une
// connexion), une page d'erreur propose de réessayer. Les écrans
// d'administration ne sont jamais sur le premier écran, seuls les
// administrateurs les ouvrent.
void goAdmin(BuildContext c, Widget Function() page) =>
    go(c, _ChargementDifferePage(page: page, charger: admin.loadLibrary));

// Ouverture d'un écran membre rarement ouvert en chargement différé,
// phase 2, 31 oct. 2026 : même porte que goAdmin, avec la bibliothèque
// membre (lib/differe_membre.dart) au lieu de celle d'administration.
void goMembre(BuildContext c, Widget Function() page) =>
    go(c, _ChargementDifferePage(page: page, charger: membre.loadLibrary));

// Ouverture de la page Élections, carte 76, 7 nov. 2026 : même
// porte que goAdmin et goMembre, avec la bibliothèque
// lib/elections.dart, chargée à la demande, puisque la page
// n'existe que pendant la période des élections.
void goElections(BuildContext c, Widget Function() page) =>
    go(c, _ChargementDifferePage(page: page, charger: elections.loadLibrary));

// Ouverture d'un écran Emploi ou demandes, cartes 63 et 65,
// 6 nov. 2026 : même porte que goAdmin et goMembre, avec la
// bibliothèque lib/emploi_absence.dart, chargée à la demande.
void goEmploi(BuildContext c, Widget Function() page) =>
    go(c, _ChargementDifferePage(page: page, charger: emploi.loadLibrary));

// Ouverture d'un écran Plateforme, carte 83, 7 nov. 2026 : même
// porte que goEmploi, avec la bibliothèque lib/plateforme.dart,
// chargée à la demande, puisque seules les personnes Plateforme
// et la structure ouvrent ces écrans.
void goPlateforme(BuildContext c, Widget Function() page) =>
    go(c, _ChargementDifferePage(page: page, charger: plateforme.loadLibrary));

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

String orTbc(String s) => s.trim().isEmpty ? tr('À confirmer') : s.trim();

// Date structurée d'un camp, lot 1, 31 oct. 2026 : le serveur
// renvoie une colonne date au format AAAA-MM-JJ. La découpe
// manuelle évite tout décalage de fuseau horaire : un jour calendaire
// reste ce jour, quel que soit l'appareil. Null si le texte est
// vide ou invalide, sans jamais inventer une date.
DateTime? parseCampDate(String s) {
  final t = s.trim();
  if (t.isEmpty) return null;
  final date = t.length >= 10 ? t.substring(0, 10) : t;
  final parts = date.split('-');
  if (parts.length != 3) return null;
  final y = int.tryParse(parts[0]);
  final m = int.tryParse(parts[1]);
  final d = int.tryParse(parts[2]);
  if (y == null || m == null || d == null) return null;
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  try {
    final dt = DateTime(y, m, d);
    if (dt.year != y || dt.month != m || dt.day != d) return null;
    return dt;
  } catch (_) {
    return null;
  }
}

Widget live(Widget Function(BuildContext) build) =>
    ListenableBuilder(listenable: app, builder: (c, _) => build(c));

bool requireMember(BuildContext c) {
  if (app.member != null) return true;
  toast(c, tr('Créez votre profil de membre pour continuer.'));
  go(c, const ProfilePage());
  return false;
}


/// Message d'échec audio selon la raison renvoyée par VerseTts :
/// aucune voix de la langue installée, ou échec de la synthèse.
/// Jamais un bouton Arrêter sans son et sans explication.
String audioFailureMessage() {
  if (verseTts.lastErrorKey == 'no_voice_en') return tr('Aucune voix anglaise n’est installée sur cet appareil. Installez une voix anglaise dans les paramètres de synthèse vocale, puis réessayez.');
  if (verseTts.lastErrorKey == 'no_voice_fr') return tr('Aucune voix française n’est installée sur cet appareil. Installez une voix française dans les paramètres de synthèse vocale, puis réessayez.');
  return tr('La synthèse vocale de votre appareil est indisponible. Vérifiez le volume et la voix installée, puis réessayez.');
}

Future<bool> openWave(int amount) async {
  if (kWaveBaseUrl.isEmpty) return false;
  try {
    final base = Uri.parse(kWaveBaseUrl);
    final uri = base.replace(queryParameters: {...base.queryParameters, 'amount': amount.toString()});
    return await launchUrl(uri, mode: LaunchMode.externalApplication);
  } catch (_) {
    return false;
  }
}

/// Ouvre le lien Orange Money confirmé pour la structure, avec le
/// montant de la demande en paramètre amount, en nombre entier,
/// après le =, en conservant id et v du lien fourni. Le montant
/// exact est affiché dans l'application avant l'ouverture. Si
/// Orange Money ignore ce paramètre, le membre saisit ce montant
/// affiché, et la structure vérifie l'équivalent reçu avant de
/// valider. L'ouverture ne marque jamais un paiement comme payé.
Future<bool> openOrangeMoney(int amount) async {
  if (kOrangeMoneyBaseUrl.isEmpty) return false;
  try {
    final base = Uri.parse(kOrangeMoneyBaseUrl);
    final uri = base.replace(queryParameters: {...base.queryParameters, 'amount': amount.toString()});
    return await launchUrl(uri, mode: LaunchMode.externalApplication);
  } catch (_) {
    return false;
  }
}

/// Don PayPal selon la devise choisie par le membre, 27 oct. 2026 :
/// comme sur d'autres sites de don, le membre choisit sa devise
/// avant l'ouverture de PayPal, et PayPal s'ouvre dans cette devise.
/// Pour l'euro, le taux est fixe et connu, 1 EUR = 655,957 FCFA,
/// car le franc CFA est arrimé à l'euro : le montant en euros est
/// donc calculé et pré-rempli dans le lien PayPal, avec la devise.
/// Pour les autres devises, le taux varie chaque jour et n'est pas
/// calculé ici, pour ne pas inventer un taux : PayPal s'ouvre dans
/// la devise choisie, le membre saisit le montant, et la structure
/// vérifie l'équivalent reçu avant de valider, comme avant.
Future<bool> openPayPal({String currency = 'EUR', int? amountFcfa}) async {
  if (kPayPalEmail.isEmpty) return false;
  try {
    final params = <String, String>{'business': kPayPalEmail};
    if (currency.isNotEmpty) params['currency_code'] = currency;
    if (currency == 'EUR' && amountFcfa != null) {
      params['amount'] = (amountFcfa / 655.957).toStringAsFixed(2);
    }
    final uri = Uri.https('www.paypal.com', '/donate/', params);
    return await launchUrl(uri, mode: LaunchMode.externalApplication);
  } catch (_) {
    return false;
  }
}

/// Choix de la devise PayPal, avant l'ouverture. L'euro est proposé
/// en premier, avec son montant converti au taux fixe, les autres
/// devises ensuite, sans montant pré-rempli, car leur taux varie.
Future<String?> choosePayPalCurrency(BuildContext c, int amountFcfa) async {
  final eur = (amountFcfa / 655.957).toStringAsFixed(2);
  return pick<String>(
    c,
    tr('Choisir votre devise'),
    ['EUR', 'USD', 'GBP', 'CAD', 'CHF'],
    (cur) => cur == 'EUR'
        ? 'EUR – Euro, $eur € pour ${fcfa(amountFcfa)}'
        : isEn
            ? '$cur – amount to enter in PayPal, organisation checks the equivalent received'
            : '$cur – montant à saisir dans PayPal, la structure vérifiera l’équivalent reçu',
  );
}

/// Choix du moyen de paiement, montant exact affiché avant
/// l'ouverture, pour Wave, Orange Money et PayPal. Retourne
/// 'Wave', 'Orange Money', 'PayPal', ou null si l'utilisateur annule.
/// Aucun paiement n'est créé ici, seulement le choix. Pour PayPal,
/// le montant FCFA est une référence : PayPal ne propose pas le
/// FCFA, le membre saisit l'équivalent dans la devise proposée,
/// et la structure vérifie l'équivalent reçu avant de valider.
/// Pour Orange Money, le montant est généré en paramètre amount
/// du lien ; si Orange Money l'ignore, le membre saisit le montant
/// affiché ici, et la structure vérifie l'équivalent reçu avant
/// de valider. Espèces en complément, auprès de la structure,
/// sans lien.
Future<String?> choosePaymentMethod(BuildContext c, int amount) async {
  return showDialog<String>(
    context: c,
    builder: (ctx) => AlertDialog(
      title: Text(tr('Choisir le moyen de paiement')),
      content: Text(isEn ? 'Exact amount to confirm: ${fcfa(amount)}.\n\nThe request stays pending until payment is confirmed, or validated by the organisation after checking its account.\n\nFor PayPal, FCFA is not offered by PayPal: enter the equivalent in the currency PayPal offers, the organisation will check the equivalent received before validating.\n\nFor Orange Money, the amount is sent in the link; if Orange Money ignores it, enter the amount shown here, the organisation will check the equivalent received before validating.\n\nCash as a complement, with the organisation, without a link.' : 'Montant exact à valider : ${fcfa(amount)}.\n\nLa demande restera en attente tant que le paiement n’a pas été confirmé, ou validé par la structure après contrôle de son compte.\n\nPour PayPal, le FCFA n’est pas proposé par PayPal : saisissez l’équivalent dans la devise proposée par PayPal, la structure vérifiera l’équivalent reçu avant de valider.\n\nPour Orange Money, le montant est envoyé dans le lien ; si Orange Money l’ignore, saisissez le montant affiché ici, la structure vérifiera l’équivalent reçu avant de valider.\n\nEspèces en complément, auprès de la structure, sans lien.'),
      actions: [
        TextButton(onPressed: () => Navigator.pop(ctx), child: Text(tr('Annuler'))),
        FilledButton(onPressed: () => Navigator.pop(ctx, 'Wave'), child: Text('Wave')),
        FilledButton(onPressed: () => Navigator.pop(ctx, 'Orange Money'), child: Text('Orange Money')),
        FilledButton(onPressed: () => Navigator.pop(ctx, 'PayPal'), child: Text('PayPal')),
      ],
    ),
  );
}

Future<bool> _openPayment(String method, int amount, {String currency = ''}) {
  // Orange Money réactivé, tranche Orange Money, 4 nov. 2026 :
  // ouverture du lien confirmé, montant en paramètre amount.
  // Les demandes anciennes restent visibles pour la structure,
  // et peuvent de nouveau être rouvertes par ce moyen.
  if (method == 'Orange Money') return openOrangeMoney(amount);
  if (method == 'PayPal') return openPayPal(currency: currency.isEmpty ? 'EUR' : currency, amountFcfa: amount);
  return openWave(amount);
}

/// Crée la demande « en attente » puis ouvre le moyen choisi.
/// Ne marque JAMAIS comme payé, ni Wave, ni Orange Money, ni PayPal. Quand le
/// membre est connecté au serveur, la demande est d'abord créée
/// côté serveur pour obtenir sa référence ; si le serveur ne peut
/// pas, on garde la demande locale et le lien de l'application.
/// La cotisation passe par la même route serveur qu'un don, car
/// le serveur n'a pas de type cotisation distinct.
Future<PayRequest?> startPayment(BuildContext c, String kind, int amount,
    {List<PurchaseItem> items = const <PurchaseItem>[], String? method, String? evenementId, Map<String, dynamic>? paiementExistant}) async {
  method ??= await choosePaymentMethod(c, amount);
  if (method == null) return null;
  if (method == 'Wave' && kWaveBaseUrl.isEmpty) {
    toast(c, tr('Le lien Wave de la structure n’est pas encore configuré.'));
    return null;
  }
  if (method == 'Orange Money' && kOrangeMoneyBaseUrl.isEmpty) {
    toast(c, tr('Le lien Orange Money de la structure n’est pas encore configuré.'));
    return null;
  }
  if (method == 'PayPal' && kPayPalEmail.isEmpty) {
    toast(c, tr('Le compte PayPal de la structure n’est pas encore configuré.'));
    return null;
  }
  // Devise PayPal, choisie par le membre avant l'ouverture, comme
  // sur d'autres sites de don. Annulation = aucun paiement créé.
  String paypalCurrency = '';
  if (method == 'PayPal') {
    final chosen = await choosePayPalCurrency(c, amount);
    if (chosen == null) return null;
    paypalCurrency = chosen;
  }
  String? serverRef;
  int serverAmount = amount;
  String campName = '';
  int numeroVersement = 0;
  bool campTotal = false;
  String donBeneficiaireNom = '';
  String donRole = '';
  if (api.isConnected) {
    try {
      if (paiementExistant != null) {
        // 31 oct. 2026 : paiement en une fois ou don, demande déjà
        // créée côté serveur avec le montant exact et le
        // bénéficiaire résolu, on ne la recrée jamais.
        serverRef = (paiementExistant['reference'] ?? '').toString();
        final m = paiementExistant['montant_fcfa'];
        if (m is num) serverAmount = m.toInt();
        campName = (paiementExistant['camp_nom'] ?? '').toString();
        campTotal = paiementExistant['total'] == true;
        donBeneficiaireNom = (paiementExistant['beneficiaire_nom'] ?? '').toString();
        donRole = donBeneficiaireNom.isNotEmpty ? 'offert' : '';
      } else if (kind == 'don') {
        final created = await api.createDon(amount);
        serverRef = (created['reference'] ?? '').toString();
        final m = created['montant_fcfa'];
        if (m is num) serverAmount = m.toInt();
      } else if (kind == 'cotisation') {
        // 28 oct. 2026 : la cotisation crée sa propre demande
        // serveur, visible par l'administrateur, au lieu d'un don.
        final created = await api.createCotisation(amount);
        serverRef = (created['reference'] ?? '').toString();
        final m = created['montant_fcfa'];
        if (m is num) serverAmount = m.toInt();
      } else if (kind == 'plateforme') {
        // Carte 83 : l'abonnement crée sa propre demande
        // serveur, 100 000 FCFA, visible par la structure,
        // au lieu d'une demande locale seulement.
        final created = await api.createAbonnementPlateforme(amount);
        serverRef = (created['reference'] ?? '').toString();
        final m = created['montant_fcfa'];
        if (m is num) serverAmount = m.toInt();
      } else if (kind == 'carte') {
        // 28 oct. 2026 : la carte crée sa propre demande serveur,
        // visible par l'administrateur, au lieu d'une demande locale
        // seulement, que la structure ne pouvait jamais voir.
        final created = await api.createCarte(amount);
        serverRef = (created['reference'] ?? '').toString();
        final m = created['montant_fcfa'];
        if (m is num) serverAmount = m.toInt();
      } else if (kind == 'camp' && evenementId != null && evenementId.isNotEmpty) {
        // 31 oct. 2026 : le versement du camp crée sa propre demande
        // serveur, avec le numéro et le montant exact calculés côté
        // serveur, visible par l'administrateur avec le nom du camp.
        final created = await api.createVersementCamp(evenementId);
        serverRef = (created['reference'] ?? '').toString();
        final m = created['montant_fcfa'];
        if (m is num) serverAmount = m.toInt();
        campName = (created['camp_nom'] ?? '').toString();
        numeroVersement = (created['numero_versement'] as num?)?.toInt() ?? 0;
      } else {
        final ids = <String>[];
        var allServer = items.isNotEmpty;
        for (final i in items) {
          final book = app.books.where((b) => b.id == i.bookId).toList();
          if (book.isEmpty || book.first.serverId.isEmpty) {
            allServer = false;
            break;
          }
          ids.add(book.first.serverId);
        }
        if (allServer) {
          final created = await api.createAchat(ids);
          serverRef = (created['reference'] ?? '').toString();
          final m = created['montant_fcfa'];
          if (m is num) serverAmount = m.toInt();
        }
      }
      if (serverRef != null && serverRef.isEmpty) serverRef = null;
    } catch (_) {
      serverRef = null;
      serverAmount = amount;
    }
  }
  final r = app.createRequest(kind, serverAmount, items: items, serverRef: serverRef, method: method, currency: paypalCurrency, campName: campName, numeroVersement: numeroVersement, evenementId: evenementId ?? '', campTotal: campTotal, donBeneficiaireNom: donBeneficiaireNom, donRole: donRole);
  // Correction P0, 28 oct. 2026 : une demande sans référence serveur
  // n'est visible que sur cet appareil, la structure ne la verra
  // jamais dans ses paiements à valider. Le membre le sait avant
  // d'ouvrir le moyen de paiement, et il peut annuler au lieu de
  // payer dans le vide. Aucune promesse d'envoi différé, qui
  // n'existe pas aujourd'hui.
  if (serverRef == null && c.mounted) {
    final proceed = await showDialog<bool>(
      context: c,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Demande visible sur cet appareil seulement')),
        content: Text(isEn
            ? 'This request is only visible on this device. The structure will not see it in its payments to validate. Once online, create it again so it appears for the structure.'
            : 'Cette demande n’est visible que sur cet appareil. La structure ne la verra pas dans ses paiements à valider. Une fois en ligne, recréez-la pour qu’elle apparaisse chez la structure.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Continuer quand même'))),
        ],
      ),
    );
    if (proceed != true) {
      app.requests.remove(r);
      app.changed();
      return null;
    }
  }
  // PayPal API d'abord, 27 oct. 2026 : si la demande existe côté
  // serveur, le serveur crée une commande PayPal et renvoie son URL
  // d'approbation. Le membre approuve dans PayPal, PayPal renvoie
  // vers le serveur, le serveur capture et confirme, et l'application
  // retrouve ce retour dans « Vérifier mon paiement ». Si l'API
  // n'est pas configurée côté serveur, ou si la demande est locale
  // seulement, par exemple la carte, on retombe sur le lien de don
  // PayPal, avec validation manuelle par la structure, comme avant.
  bool ok = false;
  if (method == 'PayPal' && serverRef != null) {
    try {
      final order = await api.createPaypalOrder(serverRef, paypalCurrency);
      final url = (order['url_approbation'] ?? '').toString();
      if (url.isNotEmpty) {
        ok = await launchUrl(Uri.parse(url), mode: LaunchMode.externalApplication);
        if (ok && c.mounted) {
          toast(c, tr('PayPal ouvert : approuvez le paiement, puis revenez dans l’application et vérifiez votre paiement, il doit apparaître confirmé.'));
        }
      }
    } catch (_) {
      ok = false;
    }
  }
  if (!ok) {
    // Repli : lien de don PayPal si l'API a échoué, ou moyen
    // Wave. Si l'API a réussi, ok est vrai et
    // on ne rouvre rien, pour ne pas ouvrir deux fois PayPal.
    ok = await _openPayment(method, serverAmount, currency: paypalCurrency);
  }
  if (!ok) {
    app.requests.remove(r);
    app.changed();
    if (c.mounted) toast(c, 'Impossible d’ouvrir $method. Vérifiez que l’application est installée.');
    return null;
  }
  return r;
}

Future<void> openUrl(BuildContext c, String url) async {
  try {
    final ok = await launchUrl(Uri.parse(url), mode: LaunchMode.externalApplication);
    if (!ok && c.mounted) toast(c, tr('Impossible d’ouvrir ce lien.'));
  } catch (_) {
    if (c.mounted) toast(c, tr('Lien invalide.'));
  }
}


/// Logo CP d'en-tête, comme sur la version web, 27 oct. 2026 :
/// voir lib/header_logo.dart. Le logo CP doré sur carré noir,
/// recadré depuis la capture web, suivi du titre CONNEXION
/// PROPHÉTIQUE, avec repli texte CP seulement si le fichier
/// manque, et logo distant si le serveur en renseigne un.
/// Le logo de lancement et les icônes ne changent pas.
Widget cpMonogram({double size = 36}) => headerLogo(size: size);

Widget basic(String title, List<Widget> children, {List<Widget>? actions, PreferredSizeWidget? bottom, ScrollController? controller}) {
  // En-tête connecté identique sur toutes les pages, 27 oct. 2026 :
  // fond bleu nuit, monogramme CP doré sur carré noir 36x36 à
  // gauche, titre CONNEXION PROPHÉTIQUE en or, sous-titre = la
  // page en cours (le paramètre title), à droite le bouton FR
  // avec globe, le sac vers Mes achats, et la photo ronde du
  // membre connecté si elle est renseignée, sinon un cercle
  // neutre, jamais une photo inventée. En mode visiteur, l'ancien
  // en-tête simple est conservé, sans photo de membre.
  // Correctif langue 27 oct. 2026 : basic() est enveloppé dans
  // live(), sinon une page ouverte par navigation ne se reconstruit
  // pas au changement de langue, et seule la Bible, qui appelle
  // setState elle-même, passait en anglais.
  return live((liveCtx) {
  final m = app.member;
  // En-tête ordinateur, 30 oct. 2026 : comme l'en-tête de l'accueil,
  // plus présente sur grand écran, mêmes couleurs, même structure.
  final desktop = Rx.isDesktop(liveCtx);
  if (m != null) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Cp.navy,
        foregroundColor: Colors.white,
        toolbarHeight: desktop ? 72 : null,
        titleSpacing: desktop ? 12 : 8,
        leadingWidth: 40,
        title: Row(children: [
          Builder(
            builder: (ctx) => Tooltip(
              message: tr('Accueil'),
              child: InkWell(
                customBorder: RoundedRectangleBorder(borderRadius: BorderRadius.circular(9)),
                onTap: () {
                  app.requestHome();
                  Navigator.of(ctx).popUntil((r) => r.isFirst);
                },
                child: cpMonogram(size: desktop ? 48 : 36),
              ),
            ),
          ),
          SizedBox(width: desktop ? 12 : 8),
          Expanded(
            // En-tête web, 27 oct. 2026 : logo CP à gauche, titre
            // CONNEXION PROPHÉTIQUE en or, sous-titre = page en cours.
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
              Text('CONNEXION PROPHÉTIQUE',
                  maxLines: 1, overflow: TextOverflow.ellipsis, softWrap: false,
                  style: TextStyle(color: Color(0xFFD4A72C), fontSize: desktop ? 15 : 11.5, fontWeight: FontWeight.w700, letterSpacing: 0.8)),
              Text(title, maxLines: 1, overflow: TextOverflow.ellipsis, softWrap: false, style: TextStyle(color: Colors.white70, fontSize: desktop ? 14 : 12)),
            ]),
          ),
        ]),
        actions: [
          // FR fonctionnel : bascule de langue de toute l'application,
          // et arrêt de la lecture Bible en cours, comme _setLang.
          Builder(builder: (ctx) {
            return TextButton.icon(
              style: TextButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 12), minimumSize: const Size(48, 48)),
              onPressed: () {
                verseTts.stop();
                onRequestStopChapterAudio?.call();
                app.setLang(app.lang == 'fr' ? 'en' : 'fr');
              },
              icon: Icon(Icons.language_outlined, color: const Color(0xFFD4A72C), size: desktop ? 20 : 16),
              label: Text(app.lang == 'fr' ? 'FR' : 'EN', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: desktop ? 14 : 12)),
            );
          }),
          const SearchLoupeAction(),
          Builder(builder: (ctx) {
            return IconButton(
              tooltip: tr('Mes achats'),
              padding: const EdgeInsets.all(14),
              iconSize: desktop ? 26 : 20,
              icon: const Icon(Icons.shopping_bag_outlined, color: Colors.white),
              onPressed: () => go(ctx, const MyPurchasesPage()),
            );
          }),
          // Correctif 27 oct. 2026, petit bonhomme en en-tête :
          // avant, la photo ronde n'avait aucune action au toucher,
          // donc rien ne se passait. Comme dans la version web, un
          // appui ouvre l'espace profil.
          Builder(builder: (ctx) {
            return Padding(
              padding: const EdgeInsets.only(right: 4),
              child: InkWell(
                customBorder: const CircleBorder(),
                onTap: () => go(ctx, const ProfilePage()),
                child: Padding(
                  padding: const EdgeInsets.all(9),
                  child: memberPhotoProvider(m) != null
                      ? CircleAvatar(radius: desktop ? 20 : 15, backgroundImage: memberPhotoProvider(m))
                      : CircleAvatar(radius: desktop ? 20 : 15, backgroundColor: const Color(0xFFD4A72C), child: Icon(Icons.person_outlined, color: const Color(0xFF0B1F3A), size: desktop ? 22 : 18)),
                ),
              ),
            );
          }),
        ],
        bottom: bottom,
      ),
      body: SafeArea(
        child: Builder(builder: (ctx) {
          // Marge basse ordinateur et tablette, 30 oct. 2026 : la
          // barre du bas ne cache plus le bas d'une page.
          // Téléphone : 0, aucun changement visible.
          final bottom = Cp.s2 + Rx.bottomClearance(ctx);
          return WideCenter(
            child: KeyboardScroll(
              controller: controller,
              child: ListView(controller: controller, padding: EdgeInsets.fromLTRB(Cp.s2, Cp.s2, Cp.s2, bottom), children: children),
            ),
          );
        }),
      ),
    );
  }
  return Scaffold(
    appBar: AppBar(
      toolbarHeight: desktop ? 72 : null,
      titleSpacing: desktop ? 12 : 8,
      leadingWidth: 40,
      title: Row(mainAxisSize: MainAxisSize.min, children: [
        Builder(
          builder: (ctx) => Tooltip(
            message: tr('Accueil'),
            child: InkWell(
              customBorder: RoundedRectangleBorder(borderRadius: BorderRadius.circular(9)),
              onTap: () {
                app.requestHome();
                Navigator.of(ctx).popUntil((r) => r.isFirst);
              },
              child: cpMonogram(size: desktop ? 48 : 36),
            ),
          ),
        ),
        SizedBox(width: desktop ? 12 : 8),
        Flexible(child: Text(title, overflow: TextOverflow.ellipsis, softWrap: false, style: desktop ? const TextStyle(fontSize: 18) : null)),
      ]),
      actions: actions,
      bottom: bottom,
    ),
    body: SafeArea(
      child: Builder(builder: (ctx) {
        // Marge basse ordinateur et tablette, 30 oct. 2026 : la
        // barre du bas ne cache plus le bas d'une page.
        // Téléphone : 0, aucun changement visible.
        final bottom = Cp.s2 + Rx.bottomClearance(ctx);
        return WideCenter(
          child: KeyboardScroll(
            controller: controller,
            child: ListView(controller: controller, padding: EdgeInsets.fromLTRB(Cp.s2, Cp.s2, Cp.s2, bottom), children: children),
          ),
        );
      }),
    ),
  );
  });
}

Widget heading(BuildContext c, String t) => Padding(
      padding: const EdgeInsets.only(bottom: Cp.s1),
      child: Text(t, style: Theme.of(c).textTheme.titleMedium?.copyWith(color: Cp.goldDeep)),
    );

class EmptyNote extends StatelessWidget {
  EmptyNote({super.key, required this.icon, required this.text, this.action});
  final IconData icon;
  final String text;
  final Widget? action;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: Cp.s4, horizontal: Cp.s2),
      child: Column(
        children: [
          Icon(icon, size: 44, color: Cp.inkMuted),
          const SizedBox(height: Cp.s2),
          Text(text, textAlign: TextAlign.center, style: Theme.of(context).textTheme.bodyMedium),
          if (action != null) ...[const SizedBox(height: Cp.s2), action!],
        ],
      ),
    );
  }
}

class NavTile extends StatelessWidget {
  const NavTile({super.key, required this.icon, required this.label, required this.sub, required this.onTap});
  final IconData icon;
  final String label, sub;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return ListTile(
      minVerticalPadding: Cp.s1,
      leading: Icon(icon, color: Cp.navy, size: 20),
      title: Text(label, style: t.labelLarge),
      subtitle: Text(sub, style: t.bodyMedium),
      trailing: const Icon(Icons.chevron_right_outlined, color: Cp.inkMuted, size: 20),
      onTap: onTap,
    );
  }
}

Widget navCard(List<Widget> tiles) => Card(
      clipBehavior: Clip.antiAlias,
      child: Column(children: [
        for (var i = 0; i < tiles.length; i++) ...[if (i > 0) const Divider(), tiles[i]],
      ]),
    );

class StatusChip extends StatelessWidget {
  const StatusChip({super.key, required this.confirmed, this.refused = false});
  final bool confirmed;
  final bool refused;

  @override
  Widget build(BuildContext context) {
    final color = confirmed ? Cp.ok : refused ? const Color(0xFFB42318) : Cp.goldDeep;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(confirmed ? tr('Confirmé') : refused ? tr('Refusé') : tr('En attente de confirmation'),
          style: TextStyle(color: color, fontSize: 12, fontWeight: FontWeight.w700)),
    );
  }
}

/// Champ de formulaire pour la feuille générique.
class F {
  const F(this.key, this.label, {this.lines = 1, this.number = false, this.optional = false, this.initial = '', this.options = const [], this.emptyLabel = '', this.dateRange = false});
  final String key, label, initial;
  final int lines;
  final bool number, optional, dateRange;
  final List<String> options;
  // Carte 109, 8 nov. 2026 : libellé du choix vide d'une liste
  // déroulante, par exemple « Aucun pays » pour le pays d'une
  // activité. Sans lui, un champ à options ne peut pas être vidé.
  final String emptyLabel;
}

Future<void> formSheet(BuildContext c, String title, List<F> fields, String cta,
    void Function(Map<String, String>) onSubmit) {
  final ctrls = {for (final f in fields) f.key: TextEditingController(text: f.initial)};
  return showModalBottomSheet(
    context: c,
    isScrollControlled: true,
    backgroundColor: Cp.paper,
    shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(Cp.radiusCard))),
    builder: (ctx) {
      String? err;
      return StatefulBuilder(builder: (ctx, setS) {
        return Padding(
          padding: EdgeInsets.fromLTRB(Cp.s2, Cp.s2, Cp.s2, MediaQuery.of(ctx).viewInsets.bottom + Cp.s2),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: Theme.of(ctx).textTheme.titleLarge),
                const SizedBox(height: Cp.s2),
                for (final f in fields) ...[
                  TextField(
                    controller: ctrls[f.key],
                    maxLines: f.lines,
                    keyboardType: f.number ? TextInputType.number : (f.lines > 1 ? TextInputType.multiline : TextInputType.text),
                    decoration: InputDecoration(
                      labelText: f.optional ? '${f.label} (facultatif)' : f.label,
                      filled: true,
                      fillColor: Cp.card,
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
                    ),
                  ),
                  const SizedBox(height: Cp.s1),
                ],
                if (err != null) Text(err!, style: const TextStyle(color: Cp.danger)),
                const SizedBox(height: Cp.s1),
                SizedBox(
                  width: double.infinity,
                  height: 52,
                  child: FilledButton(
                    onPressed: () {
                      final values = {for (final f in fields) f.key: ctrls[f.key]!.text.trim()};
                      final missing = fields.where((f) => !f.optional && values[f.key]!.isEmpty);
                      if (missing.isNotEmpty) {
                        setS(() => err = 'Renseignez : ${missing.first.label}.');
                        return;
                      }
                      onSubmit(values);
                      Navigator.pop(ctx);
                    },
                    child: Text(cta),
                  ),
                ),
              ],
            ),
          ),
        );
      });
    },
  );
}



/// Questions de quiz ajoutées, cartes de l'accueil façon artefact,
/// 1er nov. 2026 : le formulaire est exactement celui de l'Espace
/// structure (mêmes champs, même validation, même ajout). Seules
/// les questions ajoutées sont gérées ici, jamais la banque.
void ajouterQuestionQuiz(BuildContext c) {
  formSheet(c, tr('Nouvelle question'), [
    F('char', tr('Personnage')),
    F('q', tr('Question'), lines: 2),
    F('a', tr('Choix A')),
    F('b', tr('Choix B')),
    F('c', tr('Choix C')),
    F('d', tr('Choix D')),
    F('ok', tr('Bonne réponse (A, B, C ou D)')),
    F('ref', tr('Référence du verset')),
    F('exp', tr('Courte explication'), optional: true),
  ], tr('Ajouter'), (v) {
    final idx = 'ABCD'.indexOf(v['ok']!.toUpperCase());
    if (idx < 0 || v['ok']!.length != 1) {
      toast(c, tr('La bonne réponse doit être A, B, C ou D.'));
      return;
    }
    app.quiz.add(QuizQ(v['char']!, v['q']!, [v['a']!, v['b']!, v['c']!, v['d']!], idx, v['ref']!, v['exp']!));
    app.changed();
  });
}

/// Modification d'une question ajoutée, même formulaire pré-rempli.
/// La banque n'est jamais touchée : app.quiz ne contient que les
/// questions ajoutées par la structure.
void modifierQuestionQuiz(BuildContext c, int index) {
  final q = app.quiz[index];
  formSheet(c, tr('Modifier la question'), [
    F('char', tr('Personnage'), initial: q.character),
    F('q', tr('Question'), lines: 2, initial: q.question),
    F('a', tr('Choix A'), initial: q.choices[0]),
    F('b', tr('Choix B'), initial: q.choices[1]),
    F('c', tr('Choix C'), initial: q.choices[2]),
    F('d', tr('Choix D'), initial: q.choices[3]),
    F('ok', tr('Bonne réponse (A, B, C ou D)'), initial: 'ABCD'[q.correct]),
    F('ref', tr('Référence du verset'), initial: q.ref),
    F('exp', tr('Courte explication'), optional: true, initial: q.explanation),
  ], tr('Enregistrer'), (v) {
    final idx = 'ABCD'.indexOf(v['ok']!.toUpperCase());
    if (idx < 0 || v['ok']!.length != 1) {
      toast(c, tr('La bonne réponse doit être A, B, C ou D.'));
      return;
    }
    app.quiz[index] = QuizQ(v['char']!, v['q']!, [v['a']!, v['b']!, v['c']!, v['d']!], idx, v['ref']!, v['exp']!);
    app.changed();
    toast(c, tr('Question enregistrée.'));
  });
}

/// Gestion des questions ajoutées, cartes de l'accueil façon
/// artefact, 1er nov. 2026 : liste des questions ajoutées, chacune
/// avec un menu ⋯ proposant Modifier et Supprimer (avec
/// confirmation). La liste se rafraîchit par live() après chaque
/// modification ou suppression.
void gererQuestionsQuiz(BuildContext c) {
  showModalBottomSheet(
    context: c,
    isScrollControlled: true,
    backgroundColor: Cp.paper,
    shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(Cp.radiusCard))),
    builder: (ctx) => live((_) {
      return Padding(
        padding: EdgeInsets.fromLTRB(Cp.s2, Cp.s2, Cp.s2, MediaQuery.of(ctx).viewInsets.bottom + Cp.s2),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(tr('Questions ajoutées'), style: Theme.of(ctx).textTheme.titleLarge),
            const SizedBox(height: Cp.s1),
            Text(tr('Seules les questions ajoutées par la structure apparaissent ici. Les questions de la banque ne sont jamais modifiées.')),
            const SizedBox(height: Cp.s2),
            if (app.quiz.isEmpty)
              Text(tr('Aucune question ajoutée pour le moment.'))
            else
              SizedBox(
                height: MediaQuery.of(ctx).size.height * 0.6,
                child: ListView.builder(
                  itemCount: app.quiz.length,
                  itemBuilder: (_, i) {
                    final q = app.quiz[i];
                    return ListTile(
                      contentPadding: EdgeInsets.zero,
                      title: Text(q.question, maxLines: 2, overflow: TextOverflow.ellipsis),
                      subtitle: Text(q.character),
                      trailing: PopupMenuButton<String>(
                        onSelected: (v) async {
                          if (v == 'modifier') {
                            modifierQuestionQuiz(c, i);
                          } else if (v == 'supprimer') {
                            final ok = await showDialog<bool>(
                              context: c,
                              builder: (d) => AlertDialog(
                                title: Text(tr('Supprimer cette question ?')),
                                content: Text(tr('Cette question sera définitivement supprimée.')),
                                actions: [
                                  TextButton(onPressed: () => Navigator.pop(d, false), child: Text(tr('Annuler'))),
                                  FilledButton(onPressed: () => Navigator.pop(d, true), child: Text(tr('Supprimer'))),
                                ],
                              ),
                            );
                            if (ok == true) {
                              app.quiz.removeAt(i);
                              app.changed();
                              toast(c, tr('Question supprimée.'));
                            }
                          }
                        },
                        itemBuilder: (_) => [
                          PopupMenuItem(value: 'modifier', child: Text(tr('Modifier'))),
                          PopupMenuItem(value: 'supprimer', child: Text(tr('Supprimer'))),
                        ],
                      ),
                    );
                  },
                ),
              ),
          ],
        ),
      );
    }),
  );
}

/// Image d'un contenu : URL serveur en priorité (visible par tous les
/// appareils), sinon fichier local choisi dans l'espace structure.
/// Rien si aucune image n'a été ajoutée.
// Carte 79, 7 nov. 2026 : toutes les branches affichent en
// FilterQuality.high, sans cacheWidth, pleine resolution.
Widget contentImage(String imagePath, String imageUrl, {double height = 160, Uint8List? bytes}) {
  // Aperçu par octets, 30 oct. 2026 : sur le web, le chemin
  // d'ImagePicker est une adresse blob que Image.file ne peut pas
  // afficher. Les octets s'affichent partout, téléphone inchangé.
  if (bytes != null) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(Cp.radiusTile),
      child: Image.memory(bytes, height: height, width: double.infinity, fit: BoxFit.cover, filterQuality: FilterQuality.high),
    );
  }
  // Image en cache, 4 nov. 2026 : même ordre, même repli (rien
  // si l'image manque), jamais une image inventée. Couvre les
  // couvertures de livres, les photos de camps, d'établissements,
  // d'enseignements et d'actualités, qui passent toutes par ici.
  if (imageUrl.isNotEmpty) {
    return UxNetworkImage(imageUrl, height: height, radius: Cp.radiusTile);
  }
  if (imagePath.isNotEmpty) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(Cp.radiusTile),
      child: Image.file(File(imagePath), height: height, width: double.infinity, fit: BoxFit.cover,
          // Carte 79, 7 nov. 2026 : haute resolution, comme
          // UxNetworkImage, sans cacheWidth, pleine resolution.
          filterQuality: FilterQuality.high,
          errorBuilder: (_, __, ___) => const SizedBox.shrink()),
    );
  }
  return const SizedBox.shrink();
}

bool hasContentImage(String imagePath, String imageUrl) => imagePath.isNotEmpty || imageUrl.isNotEmpty;

// Carte 115, 9 nov. 2026 : pochette d'un audio, enseignement,
// musique ou podcast. L'image choisie à la soumission s'affiche
// en priorité ; sans image, c'est le logo de la structure qui
// s'affiche, jamais une icône seule, jamais une image inventée.
// Même logique que la pochette de la playlist (carte 113).
Widget audioPochette(Teaching x, double taille, {double rayon = 12}) {
  if (hasContentImage(x.imagePath, x.imageUrl)) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(rayon),
      child: SizedBox(width: taille, height: taille, child: contentImage(x.imagePath, x.imageUrl, height: taille)),
    );
  }
  return Container(
    width: taille,
    height: taille,
    decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(rayon)),
    child: Padding(
      padding: EdgeInsets.all(taille * 0.14),
      child: const WebAssetImage(asset: 'assets/logo.png', partUrls: kLogoParts, fit: BoxFit.contain),
    ),
  );
}

/// Retraite locale, sans photo serveur : c'est elle qui porte
/// l'affiche du prototype sur l'accueil. La structure la remplace
/// en publiant la Retraite comme un vrai camp avec sa photo.
bool _isLocalRetreat(Camp camp) => camp.serverId.isEmpty && camp.name == 'Retraite de Jeûne & Prière';

/// Image d'accueil d'un camp, 29 oct. 2026 : la carte d'accueil
/// savait déjà afficher une image, mais l'image du camp ne lui
/// était jamais transmise, d'où des cartes sans affiche même pour
/// un camp qui a une photo. Ordre : photo serveur, puis fichier
/// local hors web, puis affiche de la Retraite locale, sinon rien.
/// Carte 80, 7 nov. 2026 : sur le web, la photo serveur passe par
/// HttpGet, jamais HtmlImage ; le chargement par balise image sans
/// CORS est bloque par l'en-tete cross-origin-resource-policy:
/// same-origin du serveur, alors que le telechargement XHR, avec
/// l'en-tete access-control-allow-origin deja renvoye, passe.
ImageProvider? _campHomeImage(Camp camp) {
  if (camp.imageUrl.isNotEmpty) return CachedNetworkImageProvider(camp.imageUrl, imageRenderMethodForWeb: ImageRenderMethodForWeb.HttpGet);
  if (!kIsWeb && camp.imagePath.isNotEmpty) return FileImage(File(camp.imagePath));
  if (_isLocalRetreat(camp)) return MemoryImage(base64Decode(kRetreatPosterBase64));
  return null;
}

/// Sélecteur de plage pour les dates de camp, 29 oct. 2026 : le champ
/// Dates reste un texte libre, modifiable à la main, et peut rester
/// vide. L'icône calendrier à droite ouvre un sélecteur de plage,
/// comme les sites de réservation de billets. Le sélecteur ne fait
/// qu'écrire, il ne relit jamais le texte déjà présent, et ne change
/// rien d'autre dans le formulaire. Carte 107, 8 nov. 2026 : la plage
/// choisie s'écrit JJ/MM/AAAA, comme à l'inscription, « 08/11/2026
/// au 15/11/2026 », un seul jour la date seule.
String formatCampRange(DateTime start, DateTime end) {
  if (start.year == end.year && start.month == end.month && start.day == end.day) {
    return birthLabel(start);
  }
  return '${birthLabel(start)} au ${birthLabel(end)}';
}

/// Date au format AAAA-MM-JJ, tel que le serveur l'accepte pour
/// date_debut et date_fin, 31 oct. 2026.
String formatDateIso(DateTime d) =>
    '${d.year.toString().padLeft(4, '0')}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';

/// Sélecteur de période d'un camp, 31 oct. 2026 : écrit le texte
/// français dans le champ, comme avant, et renvoie aussi la plage
/// choisie, pour que le formulaire l'envoie en dates structurées.
/// Sans choix (annulation), renvoie null et le texte reste tel quel.
Future<DateTimeRange?> pickCampRange(BuildContext c, TextEditingController ctrl) async {
  final range = await showDateRangePicker(
    context: c,
    firstDate: DateTime(2020),
    lastDate: DateTime(2100),
    helpText: tr('Choisissez une période'),
    cancelText: tr('Annuler'),
    confirmText: tr('Confirmer'),
    builder: (ctx, child) {
      return Theme(
        data: Theme.of(ctx).copyWith(
          colorScheme: const ColorScheme.light(primary: Cp.navy, onPrimary: Colors.white, surface: Colors.white, onSurface: Cp.navy),
        ),
        child: child!,
      );
    },
  );
  if (range != null) ctrl.text = formatCampRange(range.start, range.end);
  return range;
}

/// Mention de programmation, 30 oct. 2026 : affichée dans les
/// listes administrateur, pour un élément pas encore publié.
/// La date est montrée en heure locale de l'appareil.
String formatDateHeure(DateTime d) {
  final local = d.toLocal();
  const mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  final heure = '${local.hour.toString().padLeft(2, '0')}:${local.minute.toString().padLeft(2, '0')}';
  if (isEn) return '${months[local.month - 1]} ${local.day}, ${local.year} at $heure';
  return '${local.day} ${mois[local.month - 1]} ${local.year} à ${local.hour} h ${local.minute.toString().padLeft(2, '0')}';
}

/// Date au format JJ/MM/AAAA, carte 107, 8 nov. 2026 : c'est le
/// format de l'inscription (birthLabel). Toute saisie de date
/// l'affiche ainsi, l'envoi au serveur reste en ISO AAAA-MM-JJ.
String formatDateCourte(DateTime d) => birthLabel(d);

/// Date et heure au format court, carte 107 : JJ/MM/AAAA comme à
/// l'inscription, plus l'heure. Pour les saisies seulement, les
/// listes gardent formatDateHeure en toutes lettres.
String formatDateHeureCourte(DateTime d) {
  final local = d.toLocal();
  final heure = '${local.hour.toString().padLeft(2, '0')}:${local.minute.toString().padLeft(2, '0')}';
  if (isEn) return '${birthLabel(local)} at $heure';
  return '${birthLabel(local)} à ${local.hour} h ${local.minute.toString().padLeft(2, '0')}';
}

String formatProgramme(DateTime d) {
  if (isEn) return 'Scheduled for ${formatDateHeure(d)}';
  return 'Programmé pour le ${formatDateHeure(d)}';
}

/// Mention de programmation au format court, carte 107 : même
/// préfixe que formatProgramme, date en JJ/MM/AAAA. Pour la ligne
/// de programmation seulement, les listes gardent formatProgramme.
String formatProgrammeCourt(DateTime d) {
  if (isEn) return 'Scheduled for ${formatDateHeureCourte(d)}';
  return 'Programmé pour le ${formatDateHeureCourte(d)}';
}

/// Ligne de programmation, 30 oct. 2026 : dans les formulaires
/// d'annonce audio et d'actualité seulement. Sans date, la
/// publication est immédiate, comme avant. La date choisie est
/// renvoyée en heure locale, le serveur la stocke avec son
/// décalage. L'état vit dans ce widget, la valeur courante part
/// par onChanged à chaque choix.
class SchedulePickerRow extends StatefulWidget {
  const SchedulePickerRow({super.key, this.initial, required this.onChanged});
  final DateTime? initial;
  final ValueChanged<DateTime?> onChanged;
  @override
  State<SchedulePickerRow> createState() => _SchedulePickerRowState();
}

class _SchedulePickerRowState extends State<SchedulePickerRow> {
  DateTime? value;
  @override
  void initState() {
    super.initState();
    value = widget.initial;
  }

  Future<void> _pick() async {
    Theme themeOf(BuildContext ctx, Widget? child) => Theme(
          data: Theme.of(ctx).copyWith(
            colorScheme: const ColorScheme.light(primary: Cp.navy, onPrimary: Colors.white, surface: Colors.white, onSurface: Cp.navy),
          ),
          child: child!,
        );
    final now = DateTime.now();
    final start = value ?? now;
    final date = await showDatePicker(
      context: context,
      initialDate: start,
      firstDate: DateTime(now.year, now.month, now.day),
      lastDate: DateTime(2100),
      helpText: tr('Choisissez une date de publication'),
      cancelText: tr('Annuler'),
      confirmText: tr('Confirmer'),
      builder: themeOf,
    );
    if (date == null || !mounted) return;
    // Carte 107 (ajout heures), 8 nov. 2026 : l'heure se choisit à
    // la molette comme sur iPhone, pas avec le sélecteur Material.
    final time = await choisirHeureMolette(
      context,
      initial: TimeOfDay.fromDateTime(start),
    );
    if (time == null || !mounted) return;
    final picked = DateTime(date.year, date.month, date.day, time.hour, time.minute);
    setState(() => value = picked);
    widget.onChanged(picked);
  }

  @override
  Widget build(BuildContext context) {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text(tr('Publication'), style: Theme.of(context).textTheme.titleSmall),
      const SizedBox(height: 4),
      Text(
        value == null ? tr('Publication immédiate. Sans date choisie, l’élément apparaît tout de suite pour les membres.') : formatProgrammeCourt(value!),
        style: Theme.of(context).textTheme.bodyMedium,
      ),
      Row(children: [
        TextButton.icon(
          icon: const Icon(Icons.calendar_month_outlined, size: 18),
          label: Text(value == null ? tr('Programmer une date et une heure') : tr('Changer la date et l’heure')),
          onPressed: _pick,
        ),
        if (value != null)
          TextButton(
            onPressed: () {
              setState(() => value = null);
              widget.onChanged(null);
            },
            child: Text(tr('Publier immédiatement')),
          ),
      ]),
    ]);
  }
}

/// Champ de date au format de l'inscription, carte 107, 8 nov. 2026 :
/// calendrier au toucher, affichage JJ/MM/AAAA, valeur gardée en ISO
/// AAAA-MM-JJ dans le contrôleur, donc la validation et l'envoi ne
/// changent pas. `effacable` ajoute une croix pour les dates
/// facultatives. `sansCadre` reprend le style souligné des champs
/// simples, par exemple dans le formulaire d'import. Les heures ne
/// sont pas saisies ici. Le parent passe `onChanged` avec un
/// setState, pour que l'affichage suive le choix.
class ChampDate extends StatelessWidget {
  const ChampDate({
    super.key,
    required this.label,
    required this.controleur,
    this.effacable = false,
    this.sansCadre = false,
    this.premiereDate,
    this.derniereDate,
    this.initialSiVide,
    this.onChanged,
  });
  final String label;
  final TextEditingController controleur;
  final bool effacable;
  final bool sansCadre;
  final DateTime? premiereDate;
  final DateTime? derniereDate;
  final DateTime? initialSiVide;
  final VoidCallback? onChanged;

  @override
  Widget build(BuildContext context) {
    final choisie = DateTime.tryParse(controleur.text.trim());
    return Padding(
      padding: const EdgeInsets.only(bottom: Cp.s2),
      child: TextFormField(
        key: ValueKey('champ-date-$label-${controleur.text}'),
        readOnly: true,
        initialValue: choisie == null ? controleur.text : formatDateCourte(choisie),
        onTap: () async {
          final now = DateTime.now();
          final picked = await showDatePicker(
            context: context,
            initialDate: choisie ?? initialSiVide ?? now,
            firstDate: premiereDate ?? DateTime(2000),
            lastDate: derniereDate ?? DateTime(2100),
          );
          if (picked != null) {
            controleur.text = formatDateIso(picked);
            onChanged?.call();
          }
        },
        decoration: InputDecoration(
          labelText: label,
          hintText: 'JJ/MM/AAAA',
          suffixIcon: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (effacable && controleur.text.isNotEmpty)
                IconButton(
                  tooltip: tr('Effacer'),
                  icon: const Icon(Icons.clear_outlined),
                  onPressed: () {
                    controleur.clear();
                    onChanged?.call();
                  },
                ),
              const Icon(Icons.calendar_month_outlined),
            ],
          ),
          border: sansCadre ? null : const OutlineInputBorder(),
        ),
      ),
    );
  }
}

/// Heure au format HH:MM, carte 107 (ajout heures), 8 nov. 2026 :
/// deux chiffres pour l'heure et les minutes, zéro devant.
String formatHeure(TimeOfDay h) =>
    '${h.hour.toString().padLeft(2, '0')}:${h.minute.toString().padLeft(2, '0')}';

/// Lit une heure HH:MM, un chiffre admis pour l'heure, deux pour
/// les minutes, 00 à 23 et 00 à 59, sinon null.
TimeOfDay? heureDepuisTexte(String s) {
  final m = RegExp(r'^(\d{1,2}):(\d{2})$').firstMatch(s.trim());
  if (m == null) return null;
  final h = int.parse(m.group(1)!);
  final min = int.parse(m.group(2)!);
  if (h > 23 || min > 59) return null;
  return TimeOfDay(hour: h, minute: min);
}

/// Sélecteur d'heure à molette comme sur iPhone, carte 107 (ajout
/// heures), 8 nov. 2026 : CupertinoDatePicker en mode heure, format
/// 24 h, dans une feuille du bas avec Annuler et Confirmer. Le choix
/// ne s'applique qu'à la confirmation, l'annulation ne change rien.
/// Retourne null en cas d'annulation.
Future<TimeOfDay?> choisirHeureMolette(BuildContext context, {TimeOfDay? initial}) async {
  var courant = initial ?? TimeOfDay.now();
  var confirme = false;
  await showCupertinoModalPopup<void>(
    context: context,
    builder: (ctx) => Container(
      height: 300,
      color: Cp.paper,
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              CupertinoButton(
                onPressed: () => Navigator.of(ctx).pop(),
                child: Text(tr('Annuler')),
              ),
              CupertinoButton(
                onPressed: () {
                  confirme = true;
                  Navigator.of(ctx).pop();
                },
                child: Text(tr('Confirmer')),
              ),
            ],
          ),
          Expanded(
            child: CupertinoDatePicker(
              mode: CupertinoDatePickerMode.time,
              use24hFormat: true,
              initialDateTime: DateTime(2000, 1, 1, courant.hour, courant.minute),
              onDateTimeChanged: (d) => courant = TimeOfDay(hour: d.hour, minute: d.minute),
            ),
          ),
        ],
      ),
    ),
  );
  return confirme ? courant : null;
}

/// Champ d'heure au format HH:MM, carte 107 (ajout heures),
/// 8 nov. 2026 : molette comme sur iPhone au toucher, affichage
/// HH:MM, valeur gardée en HH:MM dans le contrôleur, donc la
/// validation et l'envoi ne changent pas. `effacable` ajoute une
/// croix pour les heures facultatives. `initialSiVide` sert de
/// départ quand le champ est vide. Le parent passe `onChanged`
/// avec un setState, pour que l'affichage suive le choix.
class ChampHeure extends StatelessWidget {
  const ChampHeure({
    super.key,
    required this.label,
    required this.controleur,
    this.effacable = false,
    this.initialSiVide,
    this.onChanged,
  });
  final String label;
  final TextEditingController controleur;
  final bool effacable;
  final TimeOfDay? initialSiVide;
  final VoidCallback? onChanged;

  @override
  Widget build(BuildContext context) {
    final choisie = heureDepuisTexte(controleur.text.trim());
    return Padding(
      padding: const EdgeInsets.only(bottom: Cp.s2),
      child: TextFormField(
        key: ValueKey('champ-heure-$label-${controleur.text}'),
        readOnly: true,
        initialValue: choisie == null ? controleur.text : formatHeure(choisie),
        onTap: () async {
          final nouvelle = await choisirHeureMolette(
            context,
            initial: heureDepuisTexte(controleur.text.trim()) ?? initialSiVide,
          );
          if (nouvelle != null) {
            controleur.text = formatHeure(nouvelle);
            onChanged?.call();
          }
        },
        decoration: InputDecoration(
          labelText: label,
          hintText: 'HH:MM',
          suffixIcon: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (effacable && controleur.text.isNotEmpty)
                IconButton(
                  tooltip: tr('Effacer'),
                  icon: const Icon(Icons.clear_outlined),
                  onPressed: () {
                    controleur.clear();
                    onChanged?.call();
                  },
                ),
              const Icon(Icons.access_time_outlined),
            ],
          ),
          border: const OutlineInputBorder(),
        ),
      ),
    );
  }
}

/// Variante de formSheet avec un champ image, 27 oct. 2026 : c'est
/// ce qui manquait dans l'espace structure. Le bouton ouvre la
/// galerie du téléphone (ImagePicker, déjà utilisé pour la photo de
/// profil), l'aperçu s'affiche dans le formulaire, et le chemin
/// choisi est rendu à onSubmit en plus des champs texte. L'image
/// reste facultative : un contenu sans image se publie comme avant.
/// Le téléversement serveur, lui, est fait par la fonction de
/// publication appelée ensuite, pas ici.
/// Carte 109, 8 nov. 2026 : valeur courante d'un champ à options
/// dans une feuille de formulaire. null quand rien n'est choisi.
/// La valeur actuelle est gardée même si elle n'est plus dans la
/// liste, sinon la liste déroulante refuserait de s'afficher.
String? _valeurDeroulante(String texte, F f) {
  final t = texte.trim();
  if (t.isEmpty) return null;
  return t;
}

List<DropdownMenuItem<String>> _itemsDeroulants(F f, String texte) {
  final items = <DropdownMenuItem<String>>[];
  if (f.optional && f.emptyLabel.isNotEmpty) {
    items.add(DropdownMenuItem(value: '', child: Text(f.emptyLabel)));
  }
  final valeurs = [...f.options];
  final t = texte.trim();
  if (t.isNotEmpty && !valeurs.contains(t)) valeurs.add(t);
  for (final o in valeurs) {
    items.add(DropdownMenuItem(value: o, child: Text(o)));
  }
  return items;
}

Future<void> imageFormSheet(BuildContext c, String title, List<F> fields, String cta,
    void Function(Map<String, String>, String imagePath) onSubmit, {String initialImagePath = '', bool programmer = false, DateTime? initialProgrammeeLe, ValueChanged<DateTimeRange?>? onDateRange}) {
  final ctrls = {for (final f in fields) f.key: TextEditingController(text: f.initial)};
  var imagePath = initialImagePath;
  Uint8List? imageBytes;
  DateTime? programmeeLe = initialProgrammeeLe;
  return showModalBottomSheet(
    context: c,
    isScrollControlled: true,
    backgroundColor: Cp.paper,
    shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(Cp.radiusCard))),
    builder: (ctx) {
      String? err;
      return StatefulBuilder(builder: (ctx, setS) {
        return Padding(
          padding: EdgeInsets.fromLTRB(Cp.s2, Cp.s2, Cp.s2, MediaQuery.of(ctx).viewInsets.bottom + Cp.s2),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: Theme.of(ctx).textTheme.titleLarge),
                const SizedBox(height: Cp.s2),
                for (final f in fields) ...[
                  // Carte 109, 8 nov. 2026 : champ à options, liste
                  // déroulante, par exemple le pays d'une activité.
                  // Le choix est gardé dans le contrôleur, comme le
                  // texte des autres champs, donc values ne change
                  // pas. Sans choix, la valeur est null et le
                  // contrôleur reste vide.
                  if (f.options.isNotEmpty)
                    DropdownButtonFormField<String>(
                      value: _valeurDeroulante(ctrls[f.key]!.text, f),
                      items: _itemsDeroulants(f, ctrls[f.key]!.text),
                      onChanged: (v) => setS(() => ctrls[f.key]!.text = v ?? ''),
                      isExpanded: true,
                      decoration: InputDecoration(
                        labelText: f.optional ? '${f.label} (facultatif)' : f.label,
                        filled: true,
                        fillColor: Cp.card,
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
                      ),
                    )
                  else
                    TextField(
                      controller: ctrls[f.key],
                      maxLines: f.lines,
                      keyboardType: f.number ? TextInputType.number : (f.lines > 1 ? TextInputType.multiline : TextInputType.text),
                      decoration: InputDecoration(
                        labelText: f.optional ? '${f.label} (facultatif)' : f.label,
                        filled: true,
                        fillColor: Cp.card,
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
                        suffixIcon: f.dateRange
                            ? IconButton(
                                tooltip: tr('Choisir une période'),
                                icon: const Icon(Icons.calendar_month_outlined, color: Cp.goldDeep),
                                onPressed: () async {
                                  final plage = await pickCampRange(ctx, ctrls[f.key]!);
                                  onDateRange?.call(plage);
                                },
                              )
                            : null,
                      ),
                    ),
                  const SizedBox(height: Cp.s1),
                ],
                if (imagePath.isNotEmpty) ...[
                  contentImage(imagePath, '', bytes: imageBytes),
                  const SizedBox(height: Cp.s1),
                ],
                Row(children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () async {
                        if (!await demanderPhotosAuMoment(ctx)) return;
                        final picked = await ImagePicker().pickImage(source: ImageSource.gallery);
                        if (picked != null) {
                          final bytes = await picked.readAsBytes();
                          setS(() {
                            imagePath = picked.path;
                            imageBytes = bytes;
                          });
                        }
                      },
                      icon: const Icon(Icons.image_outlined),
                      label: Text(imagePath.isEmpty ? tr('Choisir une image') : tr('Changer l’image')),
                    ),
                  ),
                  if (imagePath.isNotEmpty) ...[
                    const SizedBox(width: Cp.s1),
                    IconButton(
                      tooltip: tr('Retirer l’image'),
                      icon: const Icon(Icons.delete_outline),
                      onPressed: () => setS(() => imagePath = ''),
                    ),
                  ],
                ]),
                const SizedBox(height: Cp.s1),
                Text(tr('Image facultative, JPEG, PNG ou WebP, 5 Mo max côté serveur. Sans serveur, elle reste visible sur cet appareil seulement.'), style: Theme.of(ctx).textTheme.bodyMedium),
                if (programmer) ...[
                  const SizedBox(height: Cp.s1),
                  SchedulePickerRow(initial: initialProgrammeeLe, onChanged: (v) => programmeeLe = v),
                ],
                if (err != null) Text(err!, style: const TextStyle(color: Cp.danger)),
                const SizedBox(height: Cp.s1),
                SizedBox(
                  width: double.infinity,
                  height: 52,
                  child: FilledButton(
                    onPressed: () {
                      final values = {for (final f in fields) f.key: ctrls[f.key]!.text.trim()};
                      final missing = fields.where((f) => !f.optional && values[f.key]!.isEmpty);
                      if (missing.isNotEmpty) {
                        setS(() => err = 'Renseignez : ${missing.first.label}.');
                        return;
                      }
                      if (programmer) values['programmee_le'] = programmeeLe == null ? '' : programmeeLe!.toIso8601String();
                      onSubmit(values, imagePath);
                      Navigator.pop(ctx);
                    },
                    child: Text(cta),
                  ),
                ),
              ],
            ),
          ),
        );
      });
    },
  );
}

/// Formulaire d'un livre, 28 oct. 2026 : comme imageFormSheet,
/// plus l'import du fichier du livre lui-même, PDF ou EPUB,
/// 50 Mo max côté serveur, que l'ancien formulaire n'offrait pas :
/// il n'y avait qu'un champ texte « Lien du fichier », jamais un
/// vrai import. Le fichier choisi est téléversé à la publication,
/// puis son identifiant est enregistré côté serveur en fichier_id.
/// Choix d'un fichier de livre (PDF, EPUB), partage par la feuille de
/// formulaire et l'editeur dans la carte, pour ne pas dupliquer la
/// lecture du fichier. Sur le web, `path` n'existe pas : seuls les
/// octets servent, le televersement passe alors par les octets.
class _FichierLivreChoisi {
  const _FichierLivreChoisi({this.path, this.bytes, this.name, this.error});
  final String? path;
  final List<int>? bytes;
  final String? name;
  final String? error;
}

Future<_FichierLivreChoisi> _choisirFichierLivre() async {
  try {
    final picked = await FilePicker.platform.pickFiles(
      type: FileType.custom,
      allowedExtensions: const ['pdf', 'epub'],
      withData: true,
    );
    if (picked == null || picked.files.isEmpty) {
      return const _FichierLivreChoisi(error: 'Aucun fichier retenu. Choisissez un fichier PDF ou EPUB déjà téléchargé sur cet appareil.');
    }
    if (picked.files.single.bytes == null) {
      return const _FichierLivreChoisi(error: 'Ce fichier n’a pas pu être lu sur cet appareil. Réessayez avec un fichier déjà téléchargé, pas une archive.');
    }
    return _FichierLivreChoisi(
      path: kIsWeb ? null : picked.files.single.path,
      bytes: picked.files.single.bytes,
      name: picked.files.single.name,
    );
  } catch (_) {
    return const _FichierLivreChoisi(error: 'Impossible de lire ce fichier. Réessayez avec un fichier PDF ou EPUB déjà téléchargé sur cet appareil.');
  }
}

Future<void> bookFormSheet(BuildContext c, String title, List<F> fields, String cta,
    void Function(Map<String, String>, String imagePath, String? livrePath, List<int>? livreBytes, String? livreName) onSubmit,
    {String initialImagePath = '', String initialLivreName = ''}) {
  final ctrls = {for (final f in fields) f.key: TextEditingController(text: f.initial)};
  var imagePath = initialImagePath;
  Uint8List? imageBytes;
  String? livrePath;
  List<int>? livreBytes;
  var livreName = initialLivreName;
  var livrePicking = false;
  var livrePickError = '';
  return showModalBottomSheet(
    context: c,
    isScrollControlled: true,
    backgroundColor: Cp.paper,
    shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(Cp.radiusCard))),
    builder: (ctx) {
      String? err;
      return StatefulBuilder(builder: (ctx, setS) {
        return Padding(
          padding: EdgeInsets.fromLTRB(Cp.s2, Cp.s2, Cp.s2, MediaQuery.of(ctx).viewInsets.bottom + Cp.s2),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: Theme.of(ctx).textTheme.titleLarge),
                const SizedBox(height: Cp.s2),
                for (final f in fields) ...[
                  TextField(
                    controller: ctrls[f.key],
                    maxLines: f.lines,
                    keyboardType: f.number ? TextInputType.number : (f.lines > 1 ? TextInputType.multiline : TextInputType.text),
                    decoration: InputDecoration(
                      labelText: f.optional ? '${f.label} (facultatif)' : f.label,
                      filled: true,
                      fillColor: Cp.card,
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
                    ),
                  ),
                  const SizedBox(height: Cp.s1),
                ],
                if (imagePath.isNotEmpty) ...[
                  contentImage(imagePath, '', bytes: imageBytes),
                  const SizedBox(height: Cp.s1),
                ],
                Row(children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () async {
                        if (!await demanderPhotosAuMoment(ctx)) return;
                        final picked = await ImagePicker().pickImage(source: ImageSource.gallery);
                        if (picked != null) {
                          final bytes = await picked.readAsBytes();
                          setS(() {
                            imagePath = picked.path;
                            imageBytes = bytes;
                          });
                        }
                      },
                      icon: const Icon(Icons.image_outlined),
                      label: Text(imagePath.isEmpty ? tr('Choisir une image') : tr('Changer l’image')),
                    ),
                  ),
                  if (imagePath.isNotEmpty) ...[
                    const SizedBox(width: Cp.s1),
                    IconButton(
                      tooltip: tr('Retirer l’image'),
                      icon: const Icon(Icons.delete_outline),
                      onPressed: () => setS(() => imagePath = ''),
                    ),
                  ],
                ]),
                const SizedBox(height: Cp.s1),
                Row(children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: livrePicking ? null : () async {
                        setS(() {
                          livrePicking = true;
                          livrePickError = '';
                        });
                        final choisi = await _choisirFichierLivre();
                        setS(() {
                          livrePicking = false;
                          if (choisi.error != null) {
                            livrePickError = choisi.error!;
                          } else {
                            livrePath = choisi.path;
                            livreBytes = choisi.bytes;
                            livreName = choisi.name ?? '';
                          }
                        });
                      },
                      icon: const Icon(Icons.upload_file_outlined),
                      label: Text(livrePicking ? 'Chargement du fichier…' : (livreName.isEmpty ? tr('Importer le fichier du livre (PDF, EPUB)') : livreName)),
                    ),
                  ),
                  if (livreName.isNotEmpty) ...[
                    const SizedBox(width: Cp.s1),
                    IconButton(
                      tooltip: tr('Retirer le fichier'),
                      icon: const Icon(Icons.delete_outline),
                      onPressed: () => setS(() {
                        livrePath = null;
                        livreBytes = null;
                        livreName = '';
                      }),
                    ),
                  ],
                ]),
                const SizedBox(height: Cp.s1),
                Text(tr('Fichier PDF ou EPUB, 50 Mo max côté serveur. Sans fichier téléversé, le livre reste achetable mais ne s’ouvrira pas après paiement.'), style: Theme.of(ctx).textTheme.bodyMedium),
                if (livrePicking) ...[
                  const SizedBox(height: Cp.s1),
                  Row(children: [
                    const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2)),
                    const SizedBox(width: Cp.s1),
                    const Expanded(child: Text('Chargement du fichier, ne fermez pas le formulaire…')),
                  ]),
                ],
                if (livreName.isNotEmpty && livreBytes != null) Text('Fichier retenu : $livreName (${(livreBytes!.length / 1048576).toStringAsFixed(1)} Mo).', style: const TextStyle(color: Cp.goldDeep, fontWeight: FontWeight.w700)),
                if (livrePickError.isNotEmpty) Text(livrePickError, style: const TextStyle(color: Cp.danger)),
                if (err != null) Text(err!, style: const TextStyle(color: Cp.danger)),
                const SizedBox(height: Cp.s1),
                SizedBox(
                  width: double.infinity,
                  height: 52,
                  child: FilledButton(
                    onPressed: () {
                      final values = {for (final f in fields) f.key: ctrls[f.key]!.text.trim()};
                      final missing = fields.where((f) => !f.optional && values[f.key]!.isEmpty);
                      if (missing.isNotEmpty) {
                        setS(() => err = 'Renseignez : ${missing.first.label}.');
                        return;
                      }
                      onSubmit(values, imagePath, livrePath, livreBytes, livreName.isEmpty ? null : livreName);
                      Navigator.pop(ctx);
                    },
                    child: Text(cta),
                  ),
                ),
              ],
            ),
          ),
        );
      });
    },
  );
}

/// Téléversement d'une image locale vers le serveur, partagé par les
/// publications de l'espace structure. Renvoie l'URL /fichiers/<id>
/// à afficher, ou '' si l'image est absente ou si le téléversement
/// échoue : dans ce cas le contenu est quand même publié, avec son
/// image locale seulement, et l'échec est expliqué, sans bloquer
/// la publication. Ne jamais marquer un contenu comme publié sur le
/// serveur pour son image seule.
Future<String> uploadContentImage(BuildContext c, String imagePath) async {
  if (imagePath.isEmpty || !api.isConnected) return '';
  try {
    if (kIsWeb) {
      final res = await http.get(Uri.parse(imagePath));
      if (res.statusCode != 200 || res.bodyBytes.isEmpty) throw Exception('Image web illisible.');
      final id = await api.uploadImageBytes(res.bodyBytes, 'image.jpg');
      return '$kApiBaseUrl/fichiers/$id';
    }
    final id = await api.uploadImage(imagePath);
    return '$kApiBaseUrl/fichiers/$id';
  } catch (e) {
    if (c.mounted) toast(c, 'Image conservée en local seulement. Téléversement serveur refusé ($e).');
    return '';
  }
}

/// Identifiant de fichier serveur extrait d'une URL /fichiers/<id>,
/// ou '' si l'URL ne vient pas du serveur.
String fileIdFromUrl(String url) {
  const prefix = '$kApiBaseUrl/fichiers/';
  if (url.startsWith(prefix) && url.length > prefix.length) return url.substring(prefix.length);
  return '';
}

// ═══════════════════════════════════════════════════════════════════
// 4. APPLICATION, OUVERTURE, NAVIGATION
// ═══════════════════════════════════════════════════════════════════
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
        listenable: Listenable.merge([textSize, app]),
        // Responsive global, 4 nov. 2026 : base 360 px, adaptation
        // texte minimale. Les largeurs fixes existantes ne sont pas
        // converties, seuls les nouveaux widgets UX utilisent .h/.w,
        // pour ne pas déformer les écrans ordinateur existants.
        builder: (context, _) => ScreenUtilInit(
          designSize: const Size(360, 690),
          minTextAdapt: true,
          splitScreenMode: true,
          builder: (context, _) => MaterialApp(
          title: 'Connexion Prophétique',
          debugShowCheckedModeBanner: false,
          theme: buildTheme(),
          scrollBehavior: AppScrollBehavior(),
          builder: (context, child) {
            // scale(1.0) donne le facteur systeme effectif ; on le
            // multiplie par le facteur du reglage, sans le remplacer.
            final facteur = MediaQuery.of(context).textScaler.scale(1.0) * textSize.factor;
            return MediaQuery(
              data: MediaQuery.of(context).copyWith(
                textScaler: TextScaler.linear(facteur),
              ),
              child: child ?? const SizedBox.shrink(),
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
    // Passage instantané, sans fondu : le fondu de 400 ms mélangeait
    // le bleu nuit de l'écran de démarrage avec le fond clair de
    // l'accueil, ce qui scintillait sur APK. Coupure nette, comme
    // un écran de démarrage classique.
    Widget next = const AppShell();
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
      if (mounted) setState(() => _notif = n);
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
    setState(() => _notif = status);
  }

  Future<void> _requestNotification() async {
    if (_busy) return;
    setState(() => _busy = true);
    await _request(Permission.notification);
    if (mounted) setState(() => _busy = false);
  }

  Future<void> _finish() async {
    Widget next = const AppShell();
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
            else if (blocked)
              FilledButton(onPressed: () => openAppSettings(), child: Text(tr('Ouvrir les réglages')))
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
      Text(tr('Tu peux la refuser : elle ne sera plus jamais demandée, tu pourras l’activer toi-même dans les réglages du téléphone. L’appareil photo et les photos, eux, ne sont demandés qu’au moment où tu en as besoin, au scan ou au choix d’une photo.'), style: Theme.of(context).textTheme.bodyMedium),
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
        pageBuilder: (_, __, ___) => const AppShell(),
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
        pageBuilder: (_, __, ___) => const AppShell(),
        transitionsBuilder: (_, __, ___, child) => child,
      ));
    }
  }

  @override
  Widget build(BuildContext context) {
    const bleu = Color(0xFF1D4ED8);
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
              child: Container(color: const Color(0xFFF8F7FC)),
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
                    Container(width: size.width * 0.45, height: 5, decoration: BoxDecoration(color: Colors.red, borderRadius: BorderRadius.circular(2.5))),
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
                            colors: [Color(0xFF2745D9), Color(0xFF0119B1)],
                          ),
                          borderRadius: BorderRadius.circular(hauteurBouton / 2),
                        ),
                        child: FilledButton(
                          style: FilledButton.styleFrom(backgroundColor: Colors.transparent, shadowColor: Colors.transparent, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(hauteurBouton / 2))),
                          onPressed: () => _sInscrire(context),
                          child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                            Text(tr("S'inscrire"), style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
                            const SizedBox(width: 8),
                            const Icon(Icons.chevron_right, size: 28),
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
        colors: [Color(0xFF1D4ED8), Color(0xFF6D28D9)],
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
    canvas.drawPath(goldPath, Paint()..color = const Color(0xFFD4A72C));
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
    canvas.drawPath(bluePath, Paint()..color = const Color(0xFF2E44E0));
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
      ..color = const Color(0xFF8A82D4)
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
        colors: [Color(0x00000000), Color(0xFFCCCDFD)],
      ).createShader(Rect.fromLTWH(0, h - 30, w, 30));
    canvas.drawRect(Rect.fromLTWH(0, h - 30, w, 30), veilPaint);
    final bluePaint = Paint()
      ..color = const Color(0xFF2E44E0)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 12
      ..strokeCap = StrokeCap.round;
    final blueArc = Path()
      ..moveTo(0, h - 40)
      ..quadraticBezierTo(w * 0.16, h - 2, w * 0.30, h);
    canvas.drawPath(blueArc, bluePaint);
    final redPaint = Paint()
      ..color = const Color(0xFFCE1840)
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
// dans l'ordre Accueil, Bible, Librairie, Structure, Carte, Plus,
// Donner, comme DoorDash pour un premier inscrit. Passer ou
// Commencer marque aussi le drapeau après inscription, pour ne pas
// la revoir après une inscription. Relecture possible depuis Plus,
// À propos et Aide, sur APK seulement, sans jamais la réafficher
// d'elle-même. Chaque écran : une miniature, un titre court, une
// phrase pour dire ce que c'est, une phrase pour dire comment
// l'utiliser. Passer ou Commencer marque le drapeau comme vu,
// puis ferme la page. En relecture (depuis À propos et Aide), la
// page se contente de se fermer, sans naviguer vers l'accueil.
// Les tailles de texte suivent le réglage global, déjà appliqué
// par le MediaQuery de l'application, donc aucun facteur local
// n'est ajouté ici.
const String kPresentationApresInscriptionFlag = 'presentation_apres_inscription_vue';
const String kPresentationPremiereInstallationFlag = 'presentation_premiere_installation_vue';

// Carte 99, 8 nov. 2026 : les 7 étapes de la présentation, dans
// l'ordre, avec l'onglet de la miniature, -1 pour Donner, page
// hors onglets. La page elle-même construit les 7 écrans dans ce
// même ordre, avec les mêmes titres.
const List<int> kPresentation99Onglets = [0, 1, 2, 3, 4, 5, -1];
const List<String> kPresentation99Titres = ['Accueil', 'Bible', 'Librairie', 'Structure', 'Carte de membre', 'Plus', 'Donner'];

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
    if (app.member != null) return const AppShell();
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
    return const AppShell();
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
    if (_index >= 6) {
      _terminer();
    } else {
      _controleur.nextPage(duration: const Duration(milliseconds: 300), curve: Curves.easeOut);
    }
  }

  // Miniature d'un écran réel, carte 99, 8 nov. 2026 : un petit
  // cadre téléphone, bleu nuit et or, dessiné par l'application
  // elle-même, sans fichier image, sans nouvelle dépendance. En
  // haut, la barre de l'application ; au milieu, les traits de
  // l'interface réelle de l'écran ; en bas, la barre des 6 onglets,
  // l'onglet de l'écran en or, les autres en gris. Pour une page
  // hors onglets, comme Donner, onglet -1, aucun onglet en or.
  Widget _cadreTelephone({required int onglet, required Widget corps}) {
    const onglets = [Ic.home, Ic.bible, Ic.book, Ic.users, Ic.card, Ic.plus];
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
                      onglet: 5,
                      apercu: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        for (final icone in [Icons.person_outlined, Icons.edit_outlined, Icons.timer_outlined, Icons.settings_outlined])
                          Padding(
                            padding: const EdgeInsets.only(bottom: 10),
                            child: Row(children: [
                              Icon(icone, color: Cp.goldDeep, size: 18),
                              const SizedBox(width: 8),
                              Expanded(child: _trait(120)),
                            ]),
                          ),
                      ]),
                      titre: tr('Plus'),
                      quoi: tr('Ton profil, ton journal et tes réglages sont ici.'),
                      comment: tr('Tout se règle ici, sans passer par les paramètres généraux.'),
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
                  for (var i = 0; i < 7; i++)
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
                    child: Text(_index >= 6 ? tr('Commencer') : tr('Suivant')),
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

class AppShell extends StatefulWidget {
  const AppShell({super.key});

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  int _index = 0;
  int _seenHomeRequest = 0;
  Timer? _syncTimer;
  // Visite guidée interactive, carte 90, 7 nov. 2026 : l'encadré
  // en bas de l'écran, au-dessus de la barre du bas, sur l'onglet
  // réel de chaque étape. Une seule fois, à la première connexion,
  // drapeau visite_guidee_vue, puis revoir depuis Plus, À propos
  // et Aide, par demandeVisiteGuidee.
  bool _visiteActive = false;
  bool _visiteVerifiee = false;
  int _etapeVisite = 0;
  List<VisiteGuideeEtape> _etapesVisite = const [];
  // Retour en haut, 29 oct. 2026 : un contrôleur par onglet, pour
  // que toute touche sur la barre du bas affiche l'onglet en haut
  // de page, jamais au milieu, que l'on soit déjà dessus ou que
  // l'on vienne d'un autre onglet.
  final _tabScroll = List.generate(6, (_) => ScrollController());

  @override
  void initState() {
    super.initState();
    // Adresses réelles, 30 oct. 2026 : à l'arrivée sur /bible,
    // /librairie, /carte, /structure ou /plus, la section
    // correspondante s'ouvre. Sur téléphone, toujours l'accueil.
    _index = initialTabIndex();
    // Toucher d'une notification locale, 3 nov. 2026 : si la
    // notification a été touchée avant la création de l'onglet,
    // sa destination est déjà en attente, on l'applique ici.
    // Sinon, l'écouteur ci-dessous l'applique dès qu'elle arrive.
    final enAttente = pendingNotifDestination.value;
    if (enAttente == 'bible') {
      _index = 1;
      pendingNotifDestination.value = null;
    } else if (enAttente == 'priere' || enAttente == 'meditation') {
      // Carte 72 : le toucher du verset du jour ouvre l'accueil,
      // où est la Méditation Quotidienne, comme la prière.
      _index = 0;
      pendingNotifDestination.value = null;
    }
    pendingNotifDestination.addListener(_appliquerDestinationNotification);
    // Visite guidée, carte 90 : revoir depuis Plus, À propos et
    // Aide, par demandeVisiteGuidee, sans jamais la relancer
    // d'elle-même une fois vue, sauf par ce geste.
    demandeVisiteGuidee.addListener(_revoirVisite);
    // Boutons Retour et Suivant du navigateur, 30 oct. 2026 : sur
    // le web, ils rouvrent la section de l'adresse, sans écrire
    // une nouvelle entrée dans l'historique. Sur téléphone, rien.
    // L'ancienne section, si elle existe encore, est ignorée grâce
    // à la vérification mounted.
    listenTabPath((i) {
      if (!mounted) return;
      final target = i.clamp(0, 5);
      setState(() => _index = target);
      WidgetsBinding.instance.addPostFrameCallback((_) {
        final c = _tabScroll[target];
        if (c.hasClients) c.animateTo(0, duration: const Duration(milliseconds: 300), curve: Curves.easeOut);
      });
      BugReports.currentScreen = const ['Accueil', 'Bible', 'Librairie', 'Structure', 'Carte', 'Plus'][target];
    });
    _syncTimer = Timer.periodic(const Duration(seconds: 60), (_) {
      if (mounted && api.isConnected) unawaited(app.syncFromServer());
    });
  }

  // Toucher d'une notification locale, 3 nov. 2026 : 'bible'
  // ouvre l'onglet Bible, 'priere' revient à l'accueil, sans
  // nouvelle page. La destination est effacée aussitôt, pour
  // ne pas rouvrir l'onglet à la prochaine écoute. Carte 72 :
  // 'meditation' revient aussi à l'accueil, où est la Méditation
  // Quotidienne, que le verset du jour doit ouvrir.
  void _appliquerDestinationNotification() {
    final destination = pendingNotifDestination.value;
    if (destination == null || !mounted) return;
    pendingNotifDestination.value = null;
    if (destination == 'bible') {
      _goTo(1);
    } else if (destination == 'priere' || destination == 'meditation') {
      _goTo(0);
    }
  }

  // Visite guidée, carte 90 : démarrer, sur le premier onglet,
  // puis Suivant amène sur l'onglet de l'étape suivante, pour
  // que le membre voie la vraie fonction derrière l'encadré.
  // Passer ou Terminer marque le drapeau comme vu, pour ne pas
  // la revoir à la prochaine connexion. Revoir ne touche pas
  // au drapeau : il est déjà vu, on ne fait que relancer.
  void _demarrerVisite() {
    if (!mounted || _visiteActive) return;
    setState(() {
      _etapesVisite = etapesVisiteGuidee(admin: app.isAdmin);
      _etapeVisite = 0;
      _visiteActive = true;
    });
    _goTo(_etapesVisite.first.tab);
  }

  Future<void> _demarrerVisiteSiPremiere() async {
    if (!mounted || _visiteActive || app.member == null) return;
    try {
      final prefs = await SharedPreferences.getInstance();
      if (prefs.getBool(kVisiteGuideeFlag) == true) return;
    } catch (_) {}
    if (mounted) _demarrerVisite();
  }

  void _revoirVisite() {
    if (!mounted) return;
    _demarrerVisite();
  }

  Future<void> _terminerVisite() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool(kVisiteGuideeFlag, true);
    } catch (_) {}
    if (mounted) setState(() => _visiteActive = false);
  }

  void _suivantVisite() {
    if (_etapeVisite >= _etapesVisite.length - 1) {
      unawaited(_terminerVisite());
      return;
    }
    setState(() => _etapeVisite++);
    _goTo(_etapesVisite[_etapeVisite].tab);
  }

  // L'encadré de la visite : fond sombre léger sur l'écran réel,
  // carte blanche en bas, icône or sur bleu nuit, titre court,
  // une phrase, points de progression, Passer et Suivant.
  Widget _encadreVisite() {
    final etape = _etapesVisite[_etapeVisite];
    final dernier = _etapeVisite >= _etapesVisite.length - 1;
    return Positioned.fill(
      child: Container(
        color: Colors.black54,
        child: Align(
          alignment: Alignment.bottomCenter,
          child: Container(
            margin: const EdgeInsets.fromLTRB(Cp.s2, 0, Cp.s2, Cp.s2),
            padding: const EdgeInsets.all(Cp.s2),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: Cp.gold),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(children: [
                  Container(
                    width: 48,
                    height: 48,
                    decoration: const BoxDecoration(color: Cp.navy, shape: BoxShape.circle),
                    child: Icon(etape.icone, color: Cp.gold, size: 24),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(etape.titre, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
                        Text('${tr('Étape')} ${_etapeVisite + 1} / ${_etapesVisite.length}', style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted)),
                      ],
                    ),
                  ),
                ]),
                const SizedBox(height: Cp.s1),
                Text(etape.texte, style: Theme.of(context).textTheme.bodyMedium),
                const SizedBox(height: Cp.s1),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    for (var i = 0; i < _etapesVisite.length; i++)
                      Container(
                        margin: const EdgeInsets.symmetric(horizontal: 3),
                        width: _etapeVisite == i ? 20 : 7,
                        height: 7,
                        decoration: BoxDecoration(
                          color: _etapeVisite == i ? Cp.navy : Cp.line,
                          borderRadius: BorderRadius.circular(4),
                        ),
                      ),
                  ],
                ),
                const SizedBox(height: Cp.s1),
                Row(children: [
                  TextButton(onPressed: () => unawaited(_terminerVisite()), child: Text(tr('Passer'))),
                  const Spacer(),
                  FilledButton(
                    onPressed: _suivantVisite,
                    child: Text(dernier ? tr('Terminer') : tr('Suivant')),
                  ),
                ]),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    pendingNotifDestination.removeListener(_appliquerDestinationNotification);
    demandeVisiteGuidee.removeListener(_revoirVisite);
    _syncTimer?.cancel();
    for (final c in _tabScroll) {
      c.dispose();
    }
    super.dispose();
  }

  void _goTo(int i) {
    // Barre du bas, visiteur comme connecté, comme le modèle web,
    // avec la Librairie juste après Bible depuis le 28 oct. 2026.
    // Depuis la tranche carte, 4 nov. 2026, la tuile Cartes revient
    // entre Structure et Plus, et ouvre l'ancienne page Carte
    // complete : Accueil 0, Bible 1, Librairie 2, Structure 3,
    // Cartes 4, Plus 5. La nouvelle carte, elle, ne s'ouvre que
    // jamais par un onglet : la tuile Carte ouvre la carte seule.
    final target = i.clamp(0, 5);
    // Rappel Bible non lue, 3 nov. 2026 : la page Bible reste
    // dans la pile des onglets, donc son initState ne se rejoue
    // pas à chaque passage par la barre du bas. Chaque passage
    // sur l'onglet Bible marque donc aussi la Bible comme lue
    // ce jour-là, en local seulement, téléphone seulement.
    // iOS ajouté le 7 nov. 2026.
    if (target == 1 && (defaultTargetPlatform == TargetPlatform.android || defaultTargetPlatform == TargetPlatform.iOS)) {
      unawaited(DailyVerseNotifications.instance.noteBibleOpened(app.lang, app.bibleNonLueNotif));
    }
    // Carte 97 : quitter l'onglet Bible arrête l'audio du
    // chapitre, MP3 haute qualité comme voix de l'appareil. La
    // page Bible reste vivante dans la pile des onglets, donc
    // son dispose ne se joue pas à ce moment-là.
    if (_index == 1 && target != 1) {
      verseTts.stop();
      onRequestStopChapterAudio?.call();
    }
    setState(() => _index = target);
    // Adresses réelles, 30 oct. 2026 : l'adresse suit la section,
    // sur le web seulement, sans recharger la page.
    writeTabPath(target);
    // Retour en haut, 29 oct. 2026 : toute touche sur la barre du
    // bas affiche l'onglet en haut de page. Les boutons retour et
    // les liens dans les pages gardent leur comportement.
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final c = _tabScroll[target];
      if (c.hasClients) c.animateTo(0, duration: const Duration(milliseconds: 300), curve: Curves.easeOut);
    });
    // Écran courant pour les rapports de bug, 29 oct. 2026.
    BugReports.currentScreen = const ['Accueil', 'Bible', 'Librairie', 'Structure', 'Carte', 'Plus'][i.clamp(0, 5)];
    final last = app.lastSyncAt;
    if (api.isConnected && (last == null || DateTime.now().difference(last).inSeconds > 60)) {
      unawaited(app.syncFromServer());
    }
  }

  @override
  Widget build(BuildContext context) {
    // Visite guidée, carte 90 : à la première connexion, après la
    // présentation de première installation de la carte 71, la
    // visite se lance une seule fois, sur le vrai écran. Le
    // contrôle se fait une fois par vie de l'AppShell, après
    // l'image en cours, jamais pendant la construction.
    if (!_visiteVerifiee && app.member != null) {
      _visiteVerifiee = true;
      WidgetsBinding.instance.addPostFrameCallback((_) => _demarrerVisiteSiPremiere());
    }
    // Correctif 27 oct. 2026, mis à jour le 28 oct. 2026 : une seule
    // liste de pages, visiteur comme connecté. Camps, Établissements,
    // Actualités et Bureau sont dans Structure, Dons, Mes achats,
    // Mon épanouissement, Espace structure, À propos et Aide dans
    // Plus, et la Librairie est un onglet à part, juste après Bible.
    return live((c) {
      // Retour à l'accueil demandé par le logo de l'en-tête :
      // l'onglet Accueil est sélectionné à la fin de l'image
      // en cours, pour ne pas modifier l'état pendant la
      // construction de l'écran.
      if (app.homeRequest != _seenHomeRequest) {
        _seenHomeRequest = app.homeRequest;
        WidgetsBinding.instance.addPostFrameCallback((_) => _goTo(0));
      }
      // Barre du bas a 6 entrees, tranche carte seule, 4 nov. 2026 :
      // la tuile Carte ouvre NouvelleCartePage, carte seule, sans
      // ecriture autour. Le Profil n'ouvre plus la carte, la carte
      // n'ouvre plus le Profil. CardPage reste comme repli, aussi
      // en carte seule.
      final pages = <Widget>[
        HomePage(onOpenCard: () => _goTo(4), onOpenBible: () => _goTo(1), onTab: _goTo, scrollController: _tabScroll[0]),
        BiblePage(scrollController: _tabScroll[1]),
        LibrairiePage(scrollController: _tabScroll[2]),
        CommunityPage(scrollController: _tabScroll[3]),
        const NouvelleCartePage(),
        MorePage(scrollController: _tabScroll[5]),
      ];
      final idx = _index.clamp(0, pages.length - 1);
      // Titre de l'onglet du navigateur, web seulement, 30 oct. 2026 :
      // l'application est une page unique, l'onglet gardait toujours
      // le titre de l'accueil. Le titre suit la section affichée,
      // avec les mêmes libellés que la barre du bas. Sur téléphone,
      // la fonction ne fait rien. L'adresse suit aussi la section,
      // voir route_path.dart, 30 oct. 2026.
      final sectionTitles = [
        rcText('nav_accueil', tr('Accueil')),
        rcText('nav_bible', tr('Bible')),
        rcText('nav_librairie', tr('Librairie')),
        rcText('nav_structure', tr('Structure')),
        rcText('nav_carte', tr('Carte')),
        rcText('nav_plus', tr('Plus')),
      ];
      setBrowserTabTitle(idx == 0
          ? 'Connexion Prophétique'
          : '${sectionTitles[idx]} – Connexion Prophétique');
      final pendingBanner = idx == 0 && app.isAdminGeneral && app.pendingPaymentsCount > 0;
      final corps = Scaffold(
        body: pendingBanner
            ? Column(children: [
                Container(
                  width: double.infinity,
                  color: Cp.navy,
                  padding: const EdgeInsets.symmetric(horizontal: Cp.s2, vertical: Cp.s1),
                  child: Row(children: [
                    const Icon(Icons.notifications_outlined, color: Cp.gold, size: 22),
                    const SizedBox(width: Cp.s1),
                    Expanded(
                      child: Text(
                        app.pendingPaymentsCount == 1
                            ? tr('1 paiement en attente de validation.')
                            : tr('${app.pendingPaymentsCount} paiements en attente de validation.'),
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white, fontWeight: FontWeight.w700),
                      ),
                    ),
                    TextButton(
                      onPressed: () => goAdmin(c, () => admin.AdminPage()),
                      child: Text(tr('Voir'), style: const TextStyle(color: Cp.gold, fontWeight: FontWeight.w800)),
                    ),
                  ]),
                ),
                Expanded(child: WideCenter(child: KeyboardScroll(controller: _tabScroll[idx], child: IndexedStack(index: idx, children: pages)))),
              ])
            : WideCenter(child: KeyboardScroll(controller: _tabScroll[idx], child: IndexedStack(index: idx, children: pages))),
        bottomNavigationBar: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (app.currentTeaching != null) const MiniPlayerBar(),
            BottomNavWeb(index: idx, onTap: _goTo, pendingPayments: app.isAdminGeneral ? app.pendingPaymentsCount : 0),
          ],
        ),
      );
      // Visite guidée, carte 90 : l'encadré se pose au-dessus de
      // l'écran réel et de la barre du bas, sans les remplacer.
      // Sans visite, l'écran est exactement celui d'avant.
      return Stack(children: [corps, if (_visiteActive) _encadreVisite()]);
    });
  }
}

// ═══════════════════════════════════════════════════════════════════
// 5. ACCUEIL
// ═══════════════════════════════════════════════════════════════════
// ───────────────────────── ACCUEIL (version web, branchée) ─────────────────────────
// Remplace l'ancien accueil : HomeWeb (lib/home_web.dart) est l'écran
// d'accueil, alimenté par les données réelles de l'application. La barre
// du bas est celle de HomeWeb (BottomNavWeb), portée par l'AppShell, pour
// ne garder qu'une seule barre. La carte héros de HomeWeb renvoie vers
// la carte de membre ou vers l'inscription, comme sur le web.
class HomePage extends StatefulWidget {
  const HomePage({super.key, required this.onOpenCard, required this.onOpenBible, required this.onTab, this.scrollController});
  final VoidCallback onOpenCard;
  final VoidCallback onOpenBible;
  final ValueChanged<int> onTab;
  final ScrollController? scrollController;

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _scope = 0;
  late List<QuizQ> _game;
  String _gameLang = '';
  int _qIndex = 0;
  int? _picked;
  int _score = 0;
  bool _quizFinished = false;
  // Défi hebdomadaire, 31 oct. 2026 : envoi une seule fois par partie
  // terminée, jamais au réaffichage de l'écran du score.
  bool _defiEnvoye = false;
  String? _defiMessage;
  bool _speaking = false;
  HomeVerse? _verse;
  // Carte anniversaire, 29 oct. 2026, refaite tranche 5, 4 nov. 2026 :
  // calculée avec le verset, à chaque ouverture et à chaque
  // changement de langue, à partir de la date du téléphone. Le jour
  // de l'anniversaire seulement, elle remplace la carte habituelle
  // (verset du jour), qui revient le lendemain. Voir home_web.dart.
  HomeBirthday? _birthday;
  // Correctif anniversaire, 4 nov. 2026 : empreinte du membre
  // pour lequel _birthday a été calculée. Avant, _loadVerse ne
  // tournait qu'à l'initialisation et au changement de langue,
  // donc un visiteur devenu membre, un membre chargé après
  // l'initialisation, ou un profil rafraîchi par la
  // synchronisation ne recalculaient jamais l'anniversaire.
  // La carte restait à null toute la journée, y compris le jour J.
  String _birthdayKey = '';
  bool _birthdayLoading = false;
  // Clé demandée pendant un chargement déjà en cours : elle est
  // reprise à la fin de ce chargement, sinon un membre changé
  // pendant le chargement resterait avec l'ancien calcul.
  String _birthdayPendingKey = '';
  String _verseLang = '';
  // Notifications poussées Android, 2 nov. 2026 : abonnements
  // annulés à la destruction de la page, pour ne jamais naviguer
  // après la destruction d'un contexte.
  StreamSubscription<Map<String, String>>? _pushTapSub;
  StreamSubscription<void>? _pushForegroundSub;

  @override
  void initState() {
    super.initState();
    _gameLang = app.lang;
    _game = app.drawQuiz(5, _gameLang);
    _loadVerse();
    // Enregistrement du jeton pour un membre déjà connecté, et
    // pour un membre qui vient de se connecter, car l'initialisation
    // au démarrage a lieu avant la connexion dans ce cas. Pour un
    // visiteur, registerIfMember ne fait rien.
    unawaited(PushNotifications.instance.registerIfMember());
    _pushTapSub =
        PushNotifications.instance.onTap.listen(_openPushTarget);
    _pushForegroundSub = PushNotifications.instance.onForeground.listen(
        (_) => unawaited(app.refreshNotifications()));
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      final pending = PushNotifications.instance.takePending();
      if (pending != null) _openPushTarget(pending);
    });
  }

  // Destination d'une notification poussée touchée, depuis le type
  // ou le lien serveur, avec repli sur l'accueil, déjà affiché,
  // si la cible est inconnue, et rafraîchissement de la page
  // Notifications. La page Notifications, dans Plus, reste la
  // source de vérité : toucher une poussée n'efface pas l'entrée,
  // qui se marque lue quand elle est ouverte depuis la page
  // Notifications elle-même.
  void _openPushTarget(Map<String, String> data) {
    if (!mounted) return;
    unawaited(app.refreshNotifications());
    final cible = (data['lien_type'] ?? '').isNotEmpty
        ? data['lien_type']!
        : (data['type'] ?? '');
    switch (cible) {
      case 'camp':
      case 'nouveau_camp':
      case 'camp_rappel':
      case 'camp_rappel_mensuel':
        go(context, const CampsPage());
      case 'actualite':
      case 'nouvelle_actualite':
        go(context, const NewsPage());
      case 'enseignement':
      case 'nouvel_enseignement':
        go(context, const TeachingsPage());
      case 'paiement':
      case 'paiement_valide':
      case 'paiement_refuse':
        go(context, const MyPurchasesPage());
      case 'cotisation':
      case 'cotisation_rappel':
        go(context, const DonsPage());
      default:
        // Cible inconnue : on reste sur l'accueil, la cloche
        // rafraîchie ci-dessus montre l'entrée correspondante.
        break;
    }
  }

  @override
  void dispose() {
    _pushTapSub?.cancel();
    _pushForegroundSub?.cancel();
    verseTts.stop();
    unawaited(bibleHqAudio.stop());
    super.dispose();
  }

  // Si la langue globale a changé depuis une autre page (Bible, Quiz),
  // l'accueil, conservé dans l'IndexedStack, se resynchronise ici,
  // sans nouveau tirage à chaque reconstruction.
  void _syncLang() {
    if (_gameLang == app.lang && _verseLang == app.lang) return;
    _gameLang = app.lang;
    _verseLang = app.lang;
    _game = app.drawQuiz(5, _gameLang);
    _qIndex = 0;
    _picked = null;
    _score = 0;
    _quizFinished = false;
    _defiEnvoye = false;
    _defiMessage = null;
    _verse = null;
    WidgetsBinding.instance.addPostFrameCallback((_) => _loadVerse());
  }

  // Anniversaire du membre connecté, calcul seul, sans toucher
  // au verset du jour. Date d'intégration = date d'inscription
  // du membre, jamais inventée ; verset déterministe par membre
  // et par année, voir lib/anniversaire.dart. Aucun âge, aucune
  // année de naissance n'entre dans la carte. Si le verset est
  // introuvable dans la Bible chargée, la carte reste absente,
  // sans texte inventé : voir le repli proposé au parent.
  HomeBirthday? _computeBirthday(String lang) {
    final member = app.member;
    final birth = member?.dateNaissance;
    if (member == null || birth == null) return null;
    if (!isBirthdayToday(birth, DateTime.now())) return null;
    final bv = birthdayVerse(lang, member.matricule, DateTime.now().year);
    if (bv == null) return null;
    final refLabel =
        BibleService.instance.label(lang, bv.book, bv.chapter, bv.verse);
    return HomeBirthday(
      verse: HomeVerse(
        text: bv.text,
        ref: refLabel,
        version: lang == 'fr' ? 'Louis Segond' : 'King James',
        book: bv.book,
        chapter: bv.chapter,
        verse: bv.verse,
      ),
      message: anniversaireMessage(
        anglais: lang != 'fr',
        prenom: member.name.trim().split(' ').firstWhere((e) => e.isNotEmpty, orElse: () => 'membre'),
      ),
    );
  }

  // Correctif anniversaire, 4 nov. 2026 : recalcul déclenché par
  // le build de l'accueil quand le membre, sa date ou la langue
  // a changé depuis le dernier calcul. Couvre la connexion, le
  // rafraîchissement du profil, la modification de la date dans
  // Modifier mes informations, et chaque retour sur l'accueil,
  // car HomePage est conservée dans l'IndexedStack et son
  // initState ne tourne qu'une fois. Aucun setState pendant le
  // build : le recalcul passe par un postFrameCallback, et
  // l'empreinte est mise à jour avant l'appel asynchrone, pour
  // ne jamais boucler. Le verset du jour n'est pas retiré ici,
  // rotatingVerse n'est pas appelé, donc aucun nouveau tirage.
  void _syncBirthday() {
    final member = app.member;
    final key = member == null
        ? 'visiteur|${app.lang}'
        : '${member.matricule}|${member.dateNaissance == null ? '' : birthIso(member.dateNaissance!)}|${app.lang}';
    if (key == _birthdayKey) return;
    if (_birthdayLoading) {
      // Un chargement est déjà en cours : retenir la nouvelle
      // clé, elle sera reprise à la fin de ce chargement, sinon
      // le membre changé pendant le chargement garderait
      // l'ancien calcul.
      _birthdayPendingKey = key;
      return;
    }
    _birthdayLoading = true;
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      try {
        await BibleService.instance.load();
        if (!mounted) return;
        // Calcul avec le membre courant à la fin du chargement,
        // pas celui du déclenchement, pour couvrir un membre
        // changé pendant le chargement.
        final bDay = _computeBirthday(app.lang);
        final current = app.member == null
            ? 'visiteur|${app.lang}'
            : '${app.member!.matricule}|${app.member!.dateNaissance == null ? '' : birthIso(app.member!.dateNaissance!)}|${app.lang}';
        _birthdayKey = current;
        setState(() => _birthday = bDay);
      } finally {
        _birthdayLoading = false;
        final pending = _birthdayPendingKey;
        _birthdayPendingKey = '';
        if (pending.isNotEmpty && pending != _birthdayKey) {
          WidgetsBinding.instance.addPostFrameCallback((_) => _syncBirthday());
        }
      }
    });
  }

  // Carte 61, 6 nov. 2026 : le verset du jour est désormais celui
  // de la méditation du jour, jour de l'année modulo 7, lu dans la
  // Bible de l'application au moment de l'affichage, jamais recopié
  // en dur. rotatingVerse n'est plus appelé ici : un verset du jour
  // ne change plus à chaque ouverture, il suit la méditation.
  Future<void> _loadVerse() async {
    final lang = app.lang;
    await BibleService.instance.load();
    if (!mounted || app.lang != lang) return;
    final med = dailyMeditation();
    final text = BibleService.instance.verseText(lang, med.book, med.chapter, med.verse) ?? '';
    // Anniversaire calculé ici aussi, car la Bible est chargée
    // à ce stade, avec le même calcul que _refreshBirthday.
    // L'empreinte est alignée, pour que le build suivant ne
    // relance pas un recalcul inutile pour le même membre.
    final member = app.member;
    _birthdayKey = member == null
        ? 'visiteur|$lang'
        : '${member.matricule}|${member.dateNaissance == null ? '' : birthIso(member.dateNaissance!)}|$lang';
    final bDay = _computeBirthday(lang);
    setState(() {
      _verseLang = lang;
      _verse = HomeVerse(
        text: text,
        ref: BibleService.instance.label(lang, med.book, med.chapter, med.verse),
        version: lang == 'fr' ? 'Louis Segond' : 'King James',
        book: med.book,
        chapter: med.chapter,
        verse: med.verse,
      );
      _birthday = bDay;
    });
  }

  void _toggleLanguage() {
    // Bascule globale : toute l'application change de langue, pas
    // seulement le verset et le quiz de l'accueil.
    app.setLang(app.lang == 'fr' ? 'en' : 'fr');
    _syncLang();
  }

  void _restartHomeQuiz() {
    setState(() {
      _game = app.drawQuiz(5, app.lang);
      _gameLang = app.lang;
      _qIndex = 0;
      _picked = null;
      _score = 0;
      _quizFinished = false;
      _defiEnvoye = false;
      _defiMessage = null;
    });
  }

  void _answer(int i) {
    if (_picked != null || _game.isEmpty || _qIndex >= _game.length) return;
    setState(() {
      _picked = i;
      if (i == _game[_qIndex].correct) _score++;
    });
  }

  void _nextHomeQuestion() {
    if (_picked == null) return;
    final dernier = _qIndex + 1 >= _game.length;
    setState(() {
      if (dernier) {
        _quizFinished = true;
      } else {
        _qIndex++;
        _picked = null;
      }
    });
    if (dernier) _envoyerDefiHome();
  }

  // Défi hebdomadaire, 31 oct. 2026 : envoi une seule fois pour cette
  // partie terminée ; visiteur ou hors ligne, rien n'est envoyé et la
  // prochaine partie terminée en ligne deviendra la participation.
  Future<void> _envoyerDefiHome() async {
    if (_defiEnvoye) return;
    _defiEnvoye = true;
    final rep = await envoyerDefiParticipation(_score, _game.length);
    if (!mounted || rep == null) return;
    setState(() => _defiMessage = messageDefi(rep));
  }

  // Lecture vocale normale seulement, carte 54, correctif 6 nov. 2026 :
  // la lecture MP3 en ligne a été retirée, elle n'a pas fonctionné.
  // La lecture avec la voix de l'appareil reste telle quelle.
  // Carte 61, 6 nov. 2026, touche de Muse : Écouter la méditation,
  // à 0,9, sans puces de vitesse, comme la lecture du chapitre :
  // titre, verset, réflexion, prière, question du jour et petit pas.
  Future<void> _toggleVerseAudio() async {
    final v = _verse;
    if (v == null) return;
    if (_speaking) {
      await verseTts.stop();
      if (mounted) setState(() => _speaking = false);
      return;
    }
    final med = meditationForRef(v.book, v.chapter, v.verse) ?? dailyMeditation();
    setState(() => _speaking = true);
    final ok = await verseTts.speak(meditationListenText(med, v.text), app.lang, rate: 0.9);
    if (mounted) {
      setState(() => _speaking = false);
      if (!ok) toast(context, audioFailureMessage());
    }
  }

  @override
  Widget build(BuildContext context) {
    _syncLang();
    // Correctif anniversaire, 4 nov. 2026 : chaque build de
    // l'accueil vérifie si le membre ou sa date a changé, et
    // relance le recalcul si besoin, sans toucher au verset du
    // jour. Couvre la connexion, le rafraîchissement du profil
    // et chaque retour sur l'accueil.
    _syncBirthday();
    return live((c) {
      final scopes = [tr('Tous'), for (final e in app.etabs) e.name];
      final scope = _scope.clamp(0, scopes.length - 1);
      // Périmètre, comportement documenté : il ne s'applique qu'aux
      // actualités, par nom ou par identifiant serveur. Les camps sont
      // communautaires : le modèle Camp n'a pas de champ établissement,
      // ni côté serveur ni côté application, donc les filtrer par
      // établissement les cacherait à tort. Ils restent donc affichés
      // quel que soit le périmètre choisi, comme les rendez-vous du web.
      final filteredNews = scope == 0
          ? app.news
          : app.news.where((n) {
              final etab = app.etabs[scope - 1];
              return n.etab == etab.name || (etab.id.isNotEmpty && n.etablissementId == etab.id);
            }).toList();
      HomeQuiz? quizHome;
      if (!_quizFinished && _game.isNotEmpty && _qIndex < _game.length) {
        // Un seul tirage pour les 5 questions de l'accueil : la question
        // affichée est _game[_qIndex], jamais un nouveau tirage.
        final bank = [...(app.lang == 'en' ? quizEn : quizFr), ...app.quiz];
        final characters = <String>[];
        for (final q in bank) {
          if (!characters.contains(q.character)) characters.add(q.character);
        }
        final current = _game[_qIndex];
        quizHome = HomeQuiz(
          character: current.character,
          questionIndex: _qIndex + 1,
          questionCount: _game.length,
          score: _score,
          question: current.question,
          choices: current.choices,
          quizNumber: characters.isEmpty ? 1 : (characters.indexOf(current.character) + 1),
          quizTotal: characters.isEmpty ? 1 : characters.length,
          picked: _picked,
          correct: current.correct,
          isLast: _qIndex + 1 >= _game.length,
        );
      }
      // Annonces audio, 29 oct. 2026 : l'état de lecture du
      // lecteur (lecture ou pause) doit rafraîchir l'icône de la
      // carte, d'où ce StreamBuilder autour de l'accueil, comme
      // la mini barre du lecteur.
      // Listes déjà mappées pour l'accueil, partagées par HomeWeb
      // (membre connecté) et par la vitrine (visiteur) : un seul
      // calcul, un seul ordre, pour les deux branches.
      final homeEvents = [
        for (final camp in app.camps)
          HomeEvent(
            title: camp.name,
            date: camp.dates.isEmpty ? null : camp.dates,
            // Carte 109, 8 nov. 2026 : « Lieu, Pays » sur la carte
            // d'accueil, le lieu seul sans pays.
            place: camp.lieuPays.isEmpty ? null : camp.lieuPays,
            image: _campHomeImage(camp),
            // Carte 56 : l'adresse serveur est passée telle quelle,
            // pour le chargement fiable de la carte d'accueil,
            // image gardant le repli local, Retraite et fichier.
            imageUrl: camp.imageUrl,
            onTap: () => go(c, const CampsPage()),
            // Compte à rebours Kairos, 3 nov. 2026 : la carte
            // en direct de l'accueil ne le montre que pour Kairos.
            isKairos: camp.kairos,
            kairosDateDebut: camp.dateDebut,
            kairosDateFin: camp.dateFin,
          ),
      ];
      // Camp mis en avant par la vitrine : Kairos s'il est publié,
      // sinon le premier camp. Même choix pour le tarif affiché.
      final kairosIndex = app.camps.indexWhere((camp) => camp.kairos);
      final homeNews = [for (final n in filteredNews) HomeNews(title: n.title, text: n.text)];
      // Réessayer, correctif 27 oct. 2026, déplacé ici sans changement
      // pour être partagé par HomeWeb et par la vitrine.
      final onRetry = () {
        toast(c, tr('Synchronisation en cours…'));
        unawaited(app.syncFromServer().then((_) {
          if (app.serverStatus == 'erreur' && c.mounted) {
            toast(c, tr('Serveur toujours injoignable. Vérifiez votre connexion, puis réessayez.'));
          }
        }));
      };
      // Actions d'accueil, déplacées ici sans changement pour être
      // partagées par HomeWeb (membre connecté) et par la vitrine.
      // Carte 61, 6 nov. 2026 : méditation du jour, pour les boutons
      // de partage, de lecture et d'ouverture du journal prérempli.
      final medToday = dailyMeditation();
      final medRefLabel = _verse == null
          ? ''
          : BibleService.instance.label(app.lang, _verse!.book, _verse!.chapter, _verse!.verse);
      final actions = HomeActions(
        onSignup: () => go(c, const ProfilePage()),
        // Quitter le mode visiteur, dans l'application : passer à l'inscription,
        // l'application n'ayant pas d'écran de sortie visiteur séparé.
        onQuitVisitor: () => go(c, const ProfilePage()),
        onLanguage: _toggleLanguage,
        onBag: () => go(c, const MyPurchasesPage()),
        onSearch: () => go(c, const RechercheGlobalePage()),
        onPayCotisation: () async {
          await startPayment(c, 'cotisation', 1000);
        },
        onProfile: () => go(c, const ProfilePage()),
        onCreateCard: app.member == null ? () => go(c, const ProfilePage()) : widget.onOpenCard,
        onBible: widget.onOpenBible,
        onQuiz: () => go(c, const QuizPage()),
        onTeachings: () => go(c, const TeachingsPage()),
        onEmploi: () => goEmploi(c, () => emploi.OffresEmploiPage()),
        onPrayer: () => go(c, const PrayerPage()),
        onReadChapter: _verse == null || _verse!.book < 0
            ? widget.onOpenBible
            // Carte 61, touche de Muse : Ouvrir dans la Bible ouvre
            // le chapitre du verset de la méditation, pas seulement
            // l'onglet Bible.
            : () => go(c, BiblePage(initialBook: _verse!.book, initialChapter: _verse!.chapter)),
        // Bible audio de la version web : synthèse vocale de l'appareil,
        // jamais une voix clonée. Mention du web reprise dans le texte
        // de la carte verset ; ici, lecture ou arrêt du verset affiché.
        onListen: _toggleVerseAudio,
        // Carte 89, 7 nov. 2026 : partage de la méditation avec
        // son image, titre et réflexion, WhatsApp en premier dans
        // le dialogue. Le dialogue du verset seul, carte 81, ne
        // portait ni le titre ni la réflexion de la méditation.
        // Sur le web, la carte _MeditationCard de home_web.dart
        // utilise aussi ce onShare, elle est donc corrigée ici
        // en même temps, sans toucher à home_web.dart.
        onShare: _verse == null
            ? null
            : () => showMeditationShareDialog(
                  c,
                  medToday,
                  _verse!.text,
                  medRefLabel,
                  app.lang == 'fr' ? 'Louis Segond' : 'King James',
                ),
        // Carte 61, boutons de la méditation : ils ouvrent le
        // journal prérempli, carte 62. Révélation : onglet
        // Orientations, type Révélation, titre Suite à <référence>.
        // Message : onglet Messages, titre Message : <titre de la
        // méditation>, thème <référence>, accroche = réflexion.
        onJournalRevelation: () => go(c, SpiritualJournalPage(
              initialTab: 2,
              openForm: true,
              prefill: {
                'type': 'Révélation',
                'titre': medRefLabel.isEmpty ? 'Suite à la méditation' : 'Suite à $medRefLabel',
                'description': '',
                'horizon': 'Court terme',
                'statut': 'En attente',
                'confirme': '',
              },
            )),
        onJournalMessage: () => go(c, SpiritualJournalPage(
              initialTab: 3,
              openForm: true,
              prefill: {
                'titre': 'Message : ${medToday.title}',
                'public': '',
                'duree': '',
                'theme': medRefLabel,
                'accroche': medToday.reflection,
                'points': '',
                'illustration': '',
                'conclusion': '',
                'lien': '',
              },
            )),
        onCamps: () => go(c, const CampsPage()),
        onEtabs: () => go(c, const EtabsPage()),
        onNews: () => go(c, const NewsPage()),
        onShop: () => widget.onTab(2),
        onGrowth: () => go(c, const EpanouissementPage()),
        // Plus n'est plus dans l'Explorer : il est en bas, 5e
        // onglet de la barre, page Plus. Voir AppShell.
        onAnswer: _answer,
        onNextQuiz: _nextHomeQuestion,
        onQuizRestart: _restartHomeQuiz,
        onQuizFull: () => go(c, QuizPage(initialGame: List<QuizQ>.from(_game))),
        onDefi: app.member == null ? null : () => go(c, const DefiPage()),
        onScope: (i) => setState(() => _scope = i),
        onSeeAllEvents: () => go(c, const CampsPage()),
        onAddQuizQuestion: app.isAdminGeneral ? () => ajouterQuestionQuiz(c) : null,
        onManageQuizQuestions: app.isAdminGeneral ? () => gererQuestionsQuiz(c) : null,
        onPublishNews: app.isAdmin ? () => ajouterActualite(c) : null,
        onSendPrayer: () => go(c, const PrayerPage()),
        onTab: widget.onTab,
      );
      return StreamBuilder<PlayerState>(
        stream: app.bgPlayer.playerStateStream,
        builder: (ctx, snap) {
          final annoncePlaying = snap.data?.playing ?? false;
          // Vitrine d'accueil, 1er nov. 2026 : quand aucun compte
          // n'est connecté, l'accueil est la vitrine, pas HomeWeb.
          // Les membres connectés gardent HomeWeb, inchangé.
          if (app.member == null) {
            // Vitrine web seulement, 1er nov. 2026 : sur
            // application, un visiteur arrive sur la connexion,
            // jamais sur la vitrine. Les onglets du bas restent
            // utilisables comme pour les visiteurs du web.
            if (!kIsWeb) return const ProfilePage();
            final selectedCamp = kairosIndex >= 0
                ? app.camps[kairosIndex]
                : (app.camps.isNotEmpty ? app.camps.first : null);
            return VitrinePage(
              verse: _verse,
              events: homeEvents,
              kairosIndex: kairosIndex,
              campTariff: selectedCamp?.tariff ?? '',
              // Compte à rebours Kairos, 3 nov. 2026 : dates
              // serveur du camp mis en avant, repli 2027-08-22
              // dans le widget si elles sont absentes.
              kairosDateDebut: selectedCamp?.dateDebut,
              kairosDateFin: selectedCamp?.dateFin,
              etabNames: scopes.skip(1).toList(),
              news: homeNews,
              actions: actions,
              onDon: () => go(c, const DonsPage()),
              onAbout: () => goMembre(c, () => membre.AboutPage()),
              scrollController: widget.scrollController,
              offline: app.serverStatus == 'erreur',
              onRetry: onRetry,
            );
          }
          return HomeWeb(
        scrollController: widget.scrollController,
        visitor: app.member == null,
        language: app.lang == 'fr' ? 'FR' : 'EN',
        cotisationReminder: app.hasCotisationReminder,
        birthday: _birthday,
        // Logo complet, jamais rogné : contain, pas cover, dans le
        // carré noir 36x36 de l'en-tête de l'accueil.
        logo: const WebAssetImage(asset: 'assets/logo.png', partUrls: kLogoParts, fit: BoxFit.contain),
        verse: _verse,
        // Carte 61, 6 nov. 2026, touche de Muse : la carte
        // Méditation affiche Écouter ou Arrêter selon la lecture.
        listening: _speaking,
        quiz: quizHome,
        scopes: scopes,
        scopeIndex: scope,
        events: homeEvents,
        // Annonces audio, 29 oct. 2026 : membre connecté seulement,
        // jamais visiteur ; les annonces écoutées ou fermées sur
        // cet appareil sont déjà filtrées ici, sans toucher à la
        // liste serveur, qui reste visible pour les autres membres.
        annonces: app.member == null
            ? const []
            : [
                for (final a in app.annoncesAudio)
                  if (!app.annoncesAudioHidden.contains(a.serverId))
                    HomeAnnonce(
                      id: a.serverId,
                      title: a.title,
                      text: a.text,
                      playing: annoncePlaying && app.currentAnnonceId == a.serverId,
                      onToggle: () async {
                        if (!await app.toggleAnnonce(a) && c.mounted) {
                          toast(c, tr('Impossible de lire cet audio. Vérifiez votre connexion, puis réessayez.'));
                        }
                      },
                      onDismiss: () => app.hideAnnonce(a.serverId),
                    ),
              ],
        // Cartes vidéo, 30 oct. 2026 : téléphone seulement,
        // membre connecté seulement, jamais visiteur ni web.
        // Les cartes fermées sur cet appareil sont filtrées
        // ici, sans toucher à la liste serveur.
        videos: kIsWeb || app.member == null
            ? const []
            : [
                for (final v in app.cartesVideo)
                  if (!app.cartesVideoMasquees.contains(v.serverId))
                    HomeVideo(
                      id: v.serverId,
                      title: v.title,
                      text: v.explication,
                      onOpen: () => go(c, LinkViewPage(title: v.title, url: v.videoUrl)),
                      onDismiss: () => app.hideCarteVideo(v.serverId),
                    ),
              ],
        news: homeNews,
        isAdminGeneral: app.isAdminGeneral,
        canPublishNews: app.isAdmin,
        structureEmail: kStructureEmail,
        tabIndex: 0,
        showBottomNav: false,
        memberName: app.member?.name ?? '',
        memberMatricule: app.member?.matricule ?? '',
        // Photo réelle du membre, si renseignée, sinon repli carte.
        // Validité réelle de la carte, au format MM/AAAA, comme le modèle.
        memberPhoto: (app.member != null && app.member!.hasPhoto)
            ? memberPhotoWidget(app.member!)
            : null,
        memberValidUntilLabel: app.member == null
            ? ''
            : '${app.member!.validUntil.month.toString().padLeft(2, '0')}/${app.member!.validUntil.year}',
        quizFinished: _quizFinished,
        quizFinalScore: _score,
        quizFinalTotal: _game.length,
        defiMessage: _defiMessage,
        offline: app.serverStatus == 'erreur',
        // Réessayer, correctif 27 oct. 2026 : avant, le bouton lançait
        // la synchronisation sans aucun retour, donc un échec silencieux
        // (par exemple un blocage CORS sur le web) donnait l'impression
        // que le bouton ne faisait rien. Désormais, un message annonce
        // la tentative, et un second message dit si le serveur reste
        // injoignable, au lieu de laisser le bandeau inchangé.
        onRetry: onRetry,
        actions: actions,
      );
        },
      );
    });
  }
}

// Carte 61, Méditation Quotidienne, 6 nov. 2026 : elle remplace la
// carte Verset du jour sur l'accueil. Le verset du jour reste, tel
// quel, en haut de la carte, lu dans la Bible de l'application au
// moment de l'affichage, jamais recopié en dur, puis titre de la
// méditation, courte réflexion, courte prière, question du jour et
// petit pas concret, touche de Muse, une seule phrase chacun.
// Une méditation nouvelle chaque jour, dans l'ordre de la liste,
// rotation jour de l'année modulo 7, cycle de 7 jours, la structure
// devra fournir la suite pour un cycle plus long.
// Design premium bleu nuit et or de la carte 55, monogramme CP,
// Lora pour le verset, filet or, pastille or. Le verset reste
// touchable mot à mot, comme dans la Bible : fiche Sens et origine
// au toucher simple, soulignement or au toucher long.
// Méditations rédigées en français seulement, verset dans la langue
// de l'application ; traduction anglaise à fournir par la structure
// si elle est voulue, voir le manifeste.
class MeditationCard extends StatefulWidget {
  const MeditationCard({super.key, this.lang = 'fr'});
  final String lang;

  @override
  State<MeditationCard> createState() => _MeditationCardState();
}

// Bouton d'action de la carte Méditation, correctif 6 nov. 2026 :
// même hauteur 40 px, même padding, icône 18 px, libellé sur une seule
// ligne, sans coupure. Carte 55, 6 nov. 2026, premium bleu nuit et or :
// premier bouton fond or, les autres fond blanc doux, texte bleu nuit
// lisible sur les deux. Utilisé par MeditationCard, main.dart.
Widget _verseActionButton(BuildContext context, IconData icon, String label, VoidCallback onPressed, {bool filledGold = false}) => TextButton.icon(
      onPressed: onPressed,
      icon: Icon(icon, size: 18, color: Cp.navy),
      label: Text(label, maxLines: 1, overflow: TextOverflow.visible, style: const TextStyle(color: Cp.navy, fontWeight: FontWeight.w700, fontSize: 13)),
      style: TextButton.styleFrom(
        minimumSize: const Size(0, 40),
        padding: const EdgeInsets.symmetric(horizontal: 10),
        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
        backgroundColor: filledGold ? Cp.gold : Colors.white,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      ),
    );

// Carte 68, précision Axel 6 nov. 2026, 18 h 14 : bouton à icône
// seule, sans écriture, 40 px, icône 20 px, or sur fond bleu nuit,
// Écouter fond or avec icône bleu nuit. Le texte passé en tooltip
// sert seulement d'aide à l'accessibilité, il n'est jamais affiché.
Widget _medIconButton(BuildContext context, IconData icon, String tooltip, VoidCallback onPressed, {bool filledGold = false}) => Tooltip(
      message: tooltip,
      child: SizedBox(
        width: 40,
        height: 40,
        child: IconButton(
          onPressed: onPressed,
          icon: Icon(icon, size: 20),
          color: filledGold ? Cp.navy : Cp.gold,
          padding: EdgeInsets.zero,
          style: IconButton.styleFrom(
            backgroundColor: filledGold ? Cp.gold : Colors.transparent,
            side: filledGold ? null : BorderSide(color: Cp.gold.withValues(alpha: 0.5)),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          ),
        ),
      ),
    );

class _MeditationCardState extends State<MeditationCard> {
  final DailyMeditation _med = dailyMeditation();
  late Future<BibleVerseRef> _future;
  Set<int> _words = {};
  BibleVerseRef? _ref;
  bool _speaking = false;
  // Carte 68, 6 nov. 2026 : méditation dépliée ou non, sur
  // l'accueil seulement, en local, jamais sur le serveur.
  bool _depliee = false;

  @override
  void initState() {
    super.initState();
    _future = _loadMeditationVerse();
    _future.then((r) {
      if (!mounted) return;
      _ref = r;
      _loadWords();
    });
  }

  Future<BibleVerseRef> _loadMeditationVerse() async {
    await BibleService.instance.load();
    final text = BibleService.instance.verseText(widget.lang, _med.book, _med.chapter, _med.verse) ?? '';
    return BibleVerseRef(_med.book, _med.chapter, _med.verse, text);
  }

  Future<void> _loadWords() async {
    final r = _ref;
    if (r == null) return;
    final words = await BibleService.instance.verseWordIndexes(widget.lang, r);
    if (!mounted) return;
    setState(() => _words = words);
  }

  Future<void> _toggleWord(int index) async {
    final r = _ref;
    if (r == null) return;
    await BibleService.instance.toggleVerseWord(widget.lang, r, index);
    await _loadWords();
  }

  Future<void> _clearWords() async {
    final r = _ref;
    if (r == null) return;
    await BibleService.instance.clearVerseWords(widget.lang, r);
    await _loadWords();
  }

  // Écouter la méditation, touche de Muse, à 0,9, sans puces de
  // vitesse, comme la lecture du chapitre : titre, verset,
  // réflexion, prière, question du jour et petit pas.
  Future<void> _toggleListen(String text) async {
    if (_speaking) {
      await verseTts.stop();
      if (mounted) setState(() => _speaking = false);
      return;
    }
    setState(() => _speaking = true);
    final ok = await verseTts.speak(meditationListenText(_med, text), widget.lang, rate: 0.9);
    if (mounted) {
      setState(() => _speaking = false);
      if (!ok) toast(context, audioFailureMessage());
    }
  }

  @override
  void didUpdateWidget(covariant MeditationCard oldWidget) {
    super.didUpdateWidget(oldWidget);
    // Langue globale changée depuis une autre page : recharger le
    // verset dans la nouvelle langue, au lieu de garder l'ancien.
    if (oldWidget.lang != widget.lang) {
      _future = _loadMeditationVerse();
      _future.then((r) {
        if (!mounted) return;
        _ref = r;
        _loadWords();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final med = _med;
    return FutureBuilder<BibleVerseRef>(
      future: _future,
      builder: (context, snap) {
        final ref = snap.data;
        final text = ref?.text.isNotEmpty == true
            ? ref!.text
            : 'L’Éternel est mon berger : je ne manquerai de rien.';
        final refText = ref != null
            ? BibleService.instance.label(widget.lang, ref.book, ref.chapter, ref.verse)
            : 'Psaumes 23:1';
        final versionText = widget.lang == 'fr' ? 'Louis Segond' : 'King James';
        return Container(
          padding: const EdgeInsets.fromLTRB(20, 18, 16, 16),
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [Cp.navy, Color(0xFF06101F)],
            ),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: Cp.gold, width: 1),
            boxShadow: [
              BoxShadow(
                color: Cp.navy.withValues(alpha: 0.25),
                blurRadius: 16,
                offset: const Offset(0, 6),
              ),
            ],
          ),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            // Monogramme CP officiel, petit, à gauche, comme la carte
            // de membre, libellé en or à côté, pastille or à droite,
            // liseré or fin sous l'en-tête, comme la carte 55.
            Row(children: [
              cpMonogram(size: 32),
              const SizedBox(width: 10),
              Expanded(
                child: Text(widget.lang == 'fr' ? 'MÉDITATION QUOTIDIENNE' : 'DAILY MEDITATION',
                    style: t.labelMedium?.copyWith(color: Cp.gold, fontWeight: FontWeight.w800, letterSpacing: 2)),
              ),
              Container(width: 8, height: 8, decoration: const BoxDecoration(color: Cp.gold, shape: BoxShape.circle)),
            ]),
            const SizedBox(height: 12),
            Container(height: 1, color: Cp.gold.withValues(alpha: 0.35)),
            const SizedBox(height: 12),
            Text(dateFr(DateTime.now()), style: t.bodySmall?.copyWith(color: const Color(0xFFA9B2C4), fontWeight: FontWeight.w600)),
            const SizedBox(height: 8),
            // Texte biblique en Lora, taille 17, hauteur 1,5, blanc
            // sur fond bleu nuit, carte 55, jamais modifié.
            // Un toucher sur un mot ouvre sa fiche Sens et origine,
            // un toucher long le souligne en or, un deuxième
            // toucher long retire le soulignement.
            ListenableBuilder(
              listenable: textSize,
              builder: (c, _) => verseWordRichText(
                    text,
                    Ux.bible(size: 17, height: 1.5, color: Colors.white),
                    _words,
                    (i) => showWordSenseSheet(
                      context,
                      text.split(' ')[i],
                      ref,
                      widget.lang,
                      _words.contains(i),
                      i,
                      _toggleWord,
                      () => go(context, BiblePage(initialTab: 'dictionnaire', initialDictQuery: verseWordClean(text.split(' ')[i]))),
                    ),
                    _toggleWord,
                  ),
            ),
            const SizedBox(height: Cp.s1),
            Text.rich(
              TextSpan(children: [
                TextSpan(text: refText, style: const TextStyle(color: Cp.gold, fontWeight: FontWeight.w800)),
                TextSpan(text: ', $versionText', style: const TextStyle(color: Color(0xFFA9B2C4), fontWeight: FontWeight.w600)),
              ]),
              style: t.bodyMedium?.copyWith(fontSize: 15),
            ),
            if (_words.isNotEmpty) ...[
              const SizedBox(height: 4),
              Row(children: [
                Expanded(
                  child: Text(
                      '${_words.length} ${_words.length == 1 ? tr('mot souligné') : tr('mots soulignés')}',
                      style: t.bodySmall?.copyWith(color: Cp.gold, fontWeight: FontWeight.w700)),
                ),
                TextButton(
                  onPressed: _clearWords,
                  style: TextButton.styleFrom(foregroundColor: Colors.white70),
                  child: Text(tr('Effacer mes soulignements de ce verset')),
                ),
              ]),
            ],
            const SizedBox(height: 12),
            // Titre de la méditation, en Lora, blanc, comme le verset.
            Text(med.title, style: Ux.bible(size: 20, height: 1.3, color: Colors.white).copyWith(fontWeight: FontWeight.w800)),
            const SizedBox(height: 12),
            // Carte 68, 6 nov. 2026 : lire en entier sur l'accueil.
            // Repliée par défaut, la carte montre le verset, le
            // titre et deux lignes de la réflexion ; un toucher
            // sur Lire en entier déplie tout sur l'accueil,
            // réflexion, prière, question du jour et petit pas,
            // sans aller ailleurs. Réduire replie.
            if (!_depliee) ...[
              Text('RÉFLEXION', style: t.labelMedium?.copyWith(color: Cp.gold, fontWeight: FontWeight.w800, letterSpacing: 1.5)),
              const SizedBox(height: 4),
              Text(med.reflection, maxLines: 2, overflow: TextOverflow.ellipsis, style: t.bodyMedium?.copyWith(color: Colors.white, height: 1.5)),
              // Carte 68, précision Axel 6 nov. 2026, 18 h 14 : plus
              // de bouton Lire en entier pleine largeur avec écriture,
              // Lire passe en icône seule dans la rangée des trois,
              // ci-dessous, avec Écouter et Partager.
            ] else ...[
              Text('RÉFLEXION', style: t.labelMedium?.copyWith(color: Cp.gold, fontWeight: FontWeight.w800, letterSpacing: 1.5)),
              const SizedBox(height: 4),
              Text(med.reflection, style: t.bodyMedium?.copyWith(color: Colors.white, height: 1.5)),
              const SizedBox(height: 12),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: const Color(0xFF06101F),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Cp.gold.withValues(alpha: 0.35)),
                ),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text('PRIÈRE', style: t.labelMedium?.copyWith(color: Cp.gold, fontWeight: FontWeight.w800, letterSpacing: 1.5)),
                  const SizedBox(height: 4),
                  Text(med.prayer, style: t.bodyMedium?.copyWith(color: Colors.white, fontStyle: FontStyle.italic, height: 1.5)),
                ]),
              ),
              const SizedBox(height: 12),
              // Question du jour et petit pas concret, touche de Muse,
              // une seule phrase chacun, en français.
              Text('QUESTION DU JOUR', style: t.labelMedium?.copyWith(color: Cp.gold, fontWeight: FontWeight.w800, letterSpacing: 1.5)),
              const SizedBox(height: 4),
              Text(med.question, style: t.bodyMedium?.copyWith(color: Colors.white, height: 1.5)),
              const SizedBox(height: 12),
              Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                const Icon(Icons.check_circle_outline, size: 20, color: Cp.gold),
                const SizedBox(width: 8),
                Expanded(
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text('PETIT PAS', style: t.labelMedium?.copyWith(color: Cp.gold, fontWeight: FontWeight.w800, letterSpacing: 1.5)),
                    const SizedBox(height: 4),
                    Text(med.step, style: t.bodyMedium?.copyWith(color: Colors.white, height: 1.5)),
                  ]),
                ),
              ]),
              const SizedBox(height: 12),
              Text(
                'Une méditation nouvelle chaque jour, dans l’ordre de la liste, cycle de 7 jours.',
                textAlign: TextAlign.center,
                style: t.bodySmall?.copyWith(color: const Color(0xFFA9B2C4)),
              ),
              // Carte 68, précision Axel 6 nov. 2026, 18 h 14 : plus
              // de bouton Réduire pleine largeur avec écriture,
              // Réduire passe en icône seule dans la rangée des trois,
              // ci-dessous, avec Écouter et Partager.
            ],
            const SizedBox(height: 12),
            // Carte 68, précision Axel 6 nov. 2026, 18 h 14 : les
            // trois boutons à icône seule, sans écriture, alignés,
            // 40 px, icône 20 px, or sur fond bleu nuit, Écouter
            // fond or. Lire déplie la méditation en entier sur
            // l'accueil, Réduire replie. Correction 6 nov. 2026,
            // 18 h 24 : Lire, un livre fermé book_outlined, pas un
            // livre ouvert. Ouvrir dans la Bible est
            // retiré de cette carte, les trois suffisent, le chapitre
            // reste accessible depuis l'onglet Bible et depuis la
            // fiche d'un mot touché.
            Row(
              children: [
                _medIconButton(
                  context,
                  _depliee ? Icons.expand_less_outlined : Icons.book_outlined,
                  _depliee ? tr('Réduire') : tr('Lire en entier'),
                  () => setState(() => _depliee = !_depliee),
                ),
                const SizedBox(width: 8),
                _medIconButton(
                  context,
                  _speaking ? Icons.stop_outlined : Icons.volume_up_outlined,
                  _speaking ? tr('Arrêter') : tr('Écouter la méditation'),
                  () => _toggleListen(text),
                  filledGold: true,
                ),
                const SizedBox(width: 8),
                _medIconButton(
                  context,
                  Icons.share_outlined,
                  tr('Partager'),
                  // Carte 89, 7 nov. 2026 : partage de la méditation
                  // avec son image, titre et réflexion, WhatsApp en
                  // premier, au lieu du dialogue du verset seul.
                  () => showMeditationShareDialog(context, _med, text, refText, versionText),
                ),
              ],
            ),
            const SizedBox(height: 8),
            // Boutons du journal, en dessous, séparés des trois
            // alignés, carte 66, 6 nov. 2026.
            Wrap(
              spacing: 8,
              runSpacing: 8,
              crossAxisAlignment: WrapCrossAlignment.center,
              children: [
                _verseActionButton(
                  context,
                  Icons.lightbulb_outlined,
                  tr('Noter une révélation liée à ce passage'),
                  () => go(context, SpiritualJournalPage(
                        initialTab: 2,
                        openForm: true,
                        prefill: {
                          'type': 'Révélation',
                          'titre': 'Suite à $refText',
                          'description': '',
                          'horizon': 'Court terme',
                          'statut': 'En attente',
                          'confirme': '',
                        },
                      )),
                ),
                _verseActionButton(
                  context,
                  Icons.edit_outlined,
                  tr('Préparer un message à partir de ce passage'),
                  () => go(context, SpiritualJournalPage(
                        initialTab: 3,
                        openForm: true,
                        prefill: {
                          'titre': 'Message : ${med.title}',
                          'public': '',
                          'duree': '',
                          'theme': refText,
                          'accroche': med.reflection,
                          'points': '',
                          'illustration': '',
                          'conclusion': '',
                          'lien': '',
                        },
                      )),
                ),
              ],
            ),
          ]),
        );
      },
    );
  }
}

class ActionTile extends StatelessWidget {
  const ActionTile({super.key, required this.icon, required this.label, required this.onTap});
  final IconData icon;
  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      label: label,
      child: Material(
        color: Cp.card,
        borderRadius: BorderRadius.circular(Cp.radiusTile),
        child: InkWell(
          borderRadius: BorderRadius.circular(Cp.radiusTile),
          onTap: onTap,
          child: Ink(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(Cp.radiusTile),
              border: Border.all(color: Cp.line),
            ),
            padding: const EdgeInsets.symmetric(horizontal: Cp.s2, vertical: Cp.s1),
            child: Column(mainAxisAlignment: MainAxisAlignment.center, crossAxisAlignment: CrossAxisAlignment.start, children: [
              Icon(icon, size: 20, color: Cp.navy),
              const SizedBox(height: Cp.s1),
              Text(label, maxLines: 1, overflow: TextOverflow.ellipsis, style: Theme.of(context).textTheme.labelLarge),
            ]),
          ),
        ),
      ),
    );
  }
}

class ExploreRow extends StatelessWidget {
  const ExploreRow({super.key, required this.icon, required this.label, required this.onTap});
  final IconData icon;
  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: ConstrainedBox(
        constraints: const BoxConstraints(minHeight: Cp.touch + 8),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: Cp.s2),
          child: Row(children: [
            Icon(icon, color: Cp.navy, size: 20),
            const SizedBox(width: Cp.s2),
            Expanded(child: Text(label, style: Theme.of(context).textTheme.labelLarge)),
            const Icon(Icons.chevron_right_outlined, color: Cp.inkMuted, size: 20),
          ]),
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════
// 6. PROFIL ET CARTE DE MEMBRE
// ═══════════════════════════════════════════════════════════════════
/// Libellé du statut d'adhésion, carte 110, 8 nov. 2026 :
/// 'validee', 'suspendue', 'en_attente', ou vide pour un compte
/// non encore synchronisé. Le même libellé sert au Profil du
/// membre et à la carte du Bureau.
String libelleStatutAdhesion(String statut) => switch (statut) {
      'validee' => tr('Validée'),
      'suspendue' => tr('Suspendue'),
      'en_attente' => tr('En attente de validation'),
      _ => tr('À confirmer'),
    };

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
  // Mode de connexion, 28 oct. 2026 : e-mail ou numéro, au choix,
  // au lieu d'un seul champ « Téléphone ou e-mail » avec un
  // indicatif qui ne servait à rien pour un e-mail.
  bool _loginByEmail = false;
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
                  prefixIcon: const Icon(Icons.search),
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
                            trailing: f == _fonctionChoisie ? const Icon(Icons.check, color: Cp.goldDeep) : null,
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
        final name = _name.text.trim();
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
        final m = created['membre'];
        if (m is Map<String, dynamic>) {
          moi = {...m, 'etablissement': etabName};
        } else {
          moi = await api.fetchMoi();
        }
      } else {
        // Connexion normalisée comme l'inscription, 27 oct. 2026 :
        // taper 0749369433, +2250749369433 ou +225749369433 avec
        // l'indicatif +225 retrouve le même compte, sans doublon.
        final ident = normalizePhone(_identifiant.text, _dialCode);
        if (ident.isEmpty) throw ApiException(tr('Renseignez votre téléphone ou votre e-mail.'));
        final logged = await api.login(ident, password, rememberMe: _rememberMe);
        // Temporaire, 29 oct. 2026 : le membre doit choisir un nouveau
        // mot de passe avant tout autre usage, sinon il reste bloqué
        // sur l'écran de changement.
        if (logged['mot_de_passe_temporaire'] == true) {
          try {
            await membre.loadLibrary();
          } catch (_) {
            toast(context, tr('Impossible de charger cette page. Vérifiez votre connexion, puis réessayez.'));
            return;
          }
          final changed = await Navigator.of(context).push<bool>(
            MaterialPageRoute(builder: (_) => membre.ForcedPasswordPage()),
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
      // Pays de résidence, carte 64 : gardé en local après
      // l'inscription, le serveur ne le renvoyant pas encore.
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
          goPlateforme(context, () => plateforme.PlateformeAbonnementPage());
        }
      }
      if (mounted) Navigator.of(context).pop();
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

  /// Suppression douce de son propre compte, carte 92, en bas
  /// du Profil seulement, jamais sur la page Carte. Confirmation
  /// en deux temps, mot de passe demande au deuxieme temps.
  /// En cas de succes, deconnexion et retour a l'ecran de
  /// connexion, comme la deconnexion. En cas d'echec, toast
  /// avec le message du serveur.
  Future<void> _supprimerMonCompte() async {
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
    if (continuer != true || !mounted) return;
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
                  decoration: _dec(tr('Mot de passe')),
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
      if (confirmer != true || !mounted) return;
      try {
        await api.supprimerMonCompte(motDePasse.text);
      } on ApiException catch (e) {
        if (mounted) toast(context, e.message);
        return;
      } catch (_) {
        if (mounted) toast(context, tr('Impossible de supprimer ton compte. Vérifie ta connexion, puis réessaie.'));
        return;
      }
      app.logout();
      app.requestHome();
      if (mounted) Navigator.of(context).popUntil((r) => r.isFirst);
    } finally {
      motDePasse.dispose();
    }
  }

  /// Téléchargement du certificat d'adhésion, carte 110, 8 nov.
  /// 2026 : le PDF archivé côté serveur, jamais régénéré. Si
  /// l'adhésion n'est pas validée, le serveur répond 403 avec
  /// son message en français, affiché tel quel.
  Future<void> _telechargerCertificat() async {
    final m = app.member;
    if (m == null) return;
    try {
      final bytes = await api.telechargerCertificatAdhesion();
      await downloadBytesFile('certificat-adhesion-${m.matricule}.pdf', bytes, 'application/pdf');
      if (mounted) toast(context, tr('Certificat téléchargé.'));
    } on ApiException catch (e) {
      if (mounted) toast(context, e.message);
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de télécharger le certificat.'));
    }
  }

  Future<void> _changerPhotoProfil(BuildContext c) async {
    try {
      if (!await demanderPhotosAuMoment(c)) return;
      final picked = await ImagePicker().pickImage(source: ImageSource.gallery, maxWidth: 800, maxHeight: 800, imageQuality: 80);
      if (picked == null) return;
      app.setMemberPhoto(picked.path);
      final bytes = await picked.readAsBytes();
      final mime = picked.mimeType ?? 'image/jpeg';
      final dataUrl = 'data:$mime;base64,${base64Encode(bytes)}';
      final saved = await app.uploadMemberPhotoData(dataUrl);
      if (c.mounted) toast(c, saved ? tr('Photo enregistrée : elle réapparaîtra à votre prochaine connexion.') : tr('Photo visible sur cet appareil seulement : envoi au serveur impossible, elle ne suivra pas après déconnexion.'));
    } catch (_) {
      if (c.mounted) toast(c, tr('Impossible de changer la photo.'));
    }
  }

  @override
  Widget build(BuildContext context) {
    // Correctif 27 oct. 2026, petit bonhomme en en-tête :
    // avant, cette page affichait toujours le formulaire
    // d'inscription, même pour un membre déjà connecté, avec
    // tous les champs vides, comme sur la capture. Comme dans
    // la version web, un membre connecté voit ici son espace
    // profil, pas un formulaire de création de compte. Le
    // formulaire ne s'affiche que s'il n'y a aucun membre.
    final m = app.member;
    if (m != null) {
      final t = Theme.of(context).textTheme;
      return basic(tr('Mon profil'), [
        Row(children: [
          if (m.hasPhoto)
            CircleAvatar(radius: 36, backgroundImage: memberPhotoProvider(m))
          else
            const CircleAvatar(radius: 36, backgroundColor: Cp.gold, child: Icon(Icons.person_outlined, color: Cp.navy, size: 36)),
          const SizedBox(width: Cp.s2),
          Expanded(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(m.name, style: t.titleLarge),
              const SizedBox(height: 4),
              Text(isEn ? 'Member number: ${m.matricule}' : 'Membre numéro : ${m.matricule}', style: t.bodyMedium),
              if (app.isAdmin) ...[
                const SizedBox(height: 4),
                Text(tr('Compte administrateur'), style: t.bodyMedium?.copyWith(color: Cp.goldDeep, fontWeight: FontWeight.w700)),
              ],
            ]),
          ),
        ]),
        const SizedBox(height: Cp.s3),
        if (m.etab.isNotEmpty) Text(isEn ? 'Establishment: ${m.etab}' : 'Établissement : ${m.etab}', style: t.bodyMedium),
        const SizedBox(height: Cp.s1),
        // Pays de résidence, carte 64 : vide pour un ancien
        // compte, À confirmer, jusqu'à ce que le membre le
        // renseigne depuis Modifier mes infos.
        Text(isEn ? 'Country of residence: ${app.paysResidence.isEmpty ? 'To confirm' : app.paysResidence}' : 'Pays de résidence : ${app.paysResidence.isEmpty ? 'À confirmer' : app.paysResidence}', style: t.bodyMedium),
        if (m.fonction.isNotEmpty && m.fonction != 'Aucun') ...[const SizedBox(height: Cp.s1), Text(isEn ? 'Role: ${m.fonction}' : 'Fonction : ${m.fonction}', style: t.bodyMedium)],
        if (m.ministere.isNotEmpty) ...[const SizedBox(height: Cp.s1), Text(isEn ? 'Department: ${m.ministere}' : 'Département : ${m.ministere}', style: t.bodyMedium)],
        const SizedBox(height: Cp.s1),
        Text(isEn ? 'Valid until: ${m.validUntil.month.toString().padLeft(2, '0')}/${m.validUntil.year}' : 'Valide jusqu’au : ${m.validUntil.month.toString().padLeft(2, '0')}/${m.validUntil.year}', style: t.bodyMedium),
        const SizedBox(height: Cp.s1),
        // Adhésion, carte 110, 8 nov. 2026 : statut venu du
        // serveur. Seule une adhésion validée donne droit au
        // certificat d'adhésion en PDF, téléchargeable ici.
        Text(isEn ? 'Membership: ${libelleStatutAdhesion(m.statutAdhesion)}' : 'Adhésion : ${libelleStatutAdhesion(m.statutAdhesion)}', style: t.bodyMedium),
        if (m.statutAdhesion == 'validee') ...[
          const SizedBox(height: Cp.s2),
          SizedBox(
            height: 52,
            child: OutlinedButton.icon(
              onPressed: _telechargerCertificat,
              icon: const Icon(Icons.download_outlined),
              label: Text(tr('Télécharger mon certificat d’adhésion')),
            ),
          ),
        ],
        const SizedBox(height: Cp.s3),
        SizedBox(
          height: 52,
          child: FilledButton.icon(
            onPressed: () => go(context, NouvelleModifierInfosPage(member: m)),
            icon: const Icon(Icons.edit_outlined),
            label: Text(tr('Modifier mes infos')),
          ),
        ),
        const SizedBox(height: Cp.s2),
        SizedBox(
          height: 52,
          child: OutlinedButton.icon(
            onPressed: () => _changerPhotoProfil(context),
            icon: const Icon(Icons.photo_camera_outlined),
            label: Text(tr('Changer ma photo')),
          ),
        ),
        const SizedBox(height: Cp.s2),
        // Absences et demandes, carte 65 : depuis le Profil
        // aussi, comme depuis Plus. Le membre y voit ses
        // propres demandes et leur statut, jamais celles des autres.
        SizedBox(
          height: 52,
          child: OutlinedButton.icon(
            onPressed: () => goEmploi(context, () => emploi.MesDemandesPage()),
            icon: const Icon(Icons.assignment_outlined),
            label: Text(tr('Mes absences et demandes')),
          ),
        ),
        // Carte 83 : la personne Plateforme voit son espace
        // Mes enseignements et son abonnement depuis son Profil.
        if (app.isPlateforme) ...[
          const SizedBox(height: Cp.s2),
          SizedBox(
            height: 52,
            child: OutlinedButton.icon(
              onPressed: () => goPlateforme(context, () => plateforme.MesEnseignementsPage()),
              icon: const Icon(Icons.headphones_outlined),
              label: Text(tr('Mes enseignements')),
            ),
          ),
          const SizedBox(height: Cp.s2),
          SizedBox(
            height: 52,
            child: OutlinedButton.icon(
              onPressed: () => goPlateforme(context, () => plateforme.PlateformeAbonnementPage()),
              icon: const Icon(Icons.workspace_premium_outlined),
              label: Text(tr('Abonnement Plateforme')),
            ),
          ),
        ],
        const SizedBox(height: Cp.s2),
        SizedBox(
          height: 52,
          child: OutlinedButton.icon(
            onPressed: () async {
              final ok = await showDialog<bool>(
                context: context,
                builder: (ctx) => AlertDialog(
                  title: Text(tr('Déconnecter cet appareil ?')),
                  content: Text(tr('La déconnexion verrouille seulement cet appareil : votre profil, votre carte, vos inscriptions et vos contributions sont conservés, et vous vous reconnectez depuis l’écran d’ouverture avec votre numéro de téléphone et votre matricule.')),
                  actions: [
                    TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
                    FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Se déconnecter'))),
                  ],
                ),
              );
              if (ok == true) {
                app.logout();
                app.requestHome();
                Navigator.of(context).popUntil((r) => r.isFirst);
              }
            },
            icon: const Icon(Icons.logout_outlined),
            label: Text(tr('Se déconnecter de cet appareil')),
          ),
        ),
        const SizedBox(height: Cp.s2),
        // Suppression douce de son propre compte, carte 92 :
        // en bas du Profil seulement, jamais sur la page Carte.
        SizedBox(
          height: 52,
          child: OutlinedButton.icon(
            onPressed: _supprimerMonCompte,
            style: OutlinedButton.styleFrom(foregroundColor: Colors.red, side: const BorderSide(color: Colors.red)),
            icon: const Icon(Icons.delete_outlined, color: Colors.red),
            label: Text(tr('Supprimer mon compte')),
          ),
        ),
      ]);
    }
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
          textCapitalization: TextCapitalization.words,
          decoration: _dec(tr('Nom et prénom')),
        ),
        const SizedBox(height: Cp.s2),
        Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
          SizedBox(
            width: 132,
            // Carte 87 : la valeur du menu est l'index de
            // l'entrée, jamais l'indicatif, car le Canada et les
            // États-Unis partagent +1. Choisir Canada donne +1,
            // choisir États-Unis donne +1 aussi, sans doublon.
            child: DropdownButtonFormField<int>(
              value: _indicatifIndex,
              selectedItemBuilder: (context) => [for (final c in _codesIndicatif) Text(c.$1, overflow: TextOverflow.ellipsis)],
              items: [for (var i = 0; i < _codesIndicatif.length; i++) DropdownMenuItem(value: i, child: Text('${_codesIndicatif[i].$1} ${_codesIndicatif[i].$2}', overflow: TextOverflow.ellipsis))],
              onChanged: (v) {
                if (v != null) setState(() {
                  _indicatifIndex = v;
                  _dialCode = _codesIndicatif[v].$1;
                });
              },
              decoration: _dec(tr('Indicatif')),
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
            leading: const Icon(Icons.workspace_premium_outlined, color: Cp.goldDeep),
            title: Text(tr('Devenir partenaire'), style: TextStyle(fontWeight: _fonctionChoisie == 'Plateforme' ? FontWeight.w800 : FontWeight.w600, color: Cp.navy)),
            subtitle: Text(tr('Publier vos enseignements, 100 000 FCFA par an, validation par la structure.')),
            trailing: _fonctionChoisie == 'Plateforme' ? const Icon(Icons.check_circle, color: Cp.goldDeep) : null,
            onTap: () => setState(() => _fonctionChoisie = _fonctionChoisie == 'Plateforme' ? null : 'Plateforme'),
          ),
        ),
        const SizedBox(height: Cp.s2),
        Card(
          child: ListTile(
            title: Text(_fonctionChoisie ?? tr('Fonction')),
            subtitle: _fonctionChoisie == null ? Text(tr('Touchez pour rechercher, puis choisir une seule fonction.')) : null,
            trailing: const Icon(Icons.keyboard_arrow_down),
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
        // Connexion au choix, 28 oct. 2026 : e-mail ou numéro,
        // puis mot de passe. L'indicatif ne s'affiche que pour
        // un numéro, jamais pour un e-mail, que la normalisation
        // renvoie tel quel.
        SegmentedButton<bool>(
          segments: [
            ButtonSegment(value: false, label: Text(tr('Numéro'))),
            ButtonSegment(value: true, label: Text(tr('E-mail'))),
          ],
          selected: {_loginByEmail},
          onSelectionChanged: (v) => setState(() => _loginByEmail = v.first),
        ),
        const SizedBox(height: Cp.s2),
        if (_loginByEmail)
          TextField(
            controller: _identifiant,
            keyboardType: TextInputType.emailAddress,
            decoration: _dec(tr('E-mail')),
          )
        else
          Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
            SizedBox(
              width: 132,
              // Carte 87 : valeur = index de l'entrée, voir
              // le menu d'inscription ci-dessus, Canada et
              // États-Unis partagent +1.
              child: DropdownButtonFormField<int>(
                value: _indicatifIndex,
                selectedItemBuilder: (context) => [for (final c in _codesIndicatif) Text(c.$1, overflow: TextOverflow.ellipsis)],
                items: [for (var i = 0; i < _codesIndicatif.length; i++) DropdownMenuItem(value: i, child: Text('${_codesIndicatif[i].$1} ${_codesIndicatif[i].$2}', overflow: TextOverflow.ellipsis))],
                onChanged: (v) {
                  if (v != null) setState(() {
                    _indicatifIndex = v;
                    _dialCode = _codesIndicatif[v].$1;
                  });
                },
                decoration: _dec(tr('Indicatif')),
              ),
            ),
            const SizedBox(width: Cp.s1),
            Expanded(
              child: TextField(
                controller: _identifiant,
                keyboardType: TextInputType.phone,
                decoration: _dec(tr('Numéro')),
              ),
            ),
          ]),
        const SizedBox(height: Cp.s1),
        Text(_loginByEmail ? tr('Saisissez l’e-mail de votre compte.') : tr('Indicatif détecté automatiquement selon votre appareil. Touchez pour le changer, puis saisissez votre numéro local, sans indicatif, ou votre numéro complet avec +.'), style: Theme.of(context).textTheme.bodyMedium),
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
                                      if (mounted) Navigator.of(context).pop();
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

// Téléchargement réel, activé le 27 oct. 2026, fonctions de niveau supérieur
// pour être utilisables par la carte, par Mes achats et par la facture :
// le fichier est d'abord écrit dans le dossier Téléchargements de
// l'appareil (repli : dossier Documents de l'application si
// Téléchargements n'est pas accessible), puis proposé en partage. Avant,
// la carte n'existait que dans un fichier temporaire partagé, et le livre
// acheté ne faisait qu'ouvrir un lien : si le partage était annulé, rien
// n'était téléchargé. Maintenant, le fichier reste sur l'appareil même si
// le partage est annulé, et un message confirme le nom du fichier.
/// Enregistre une image dans la galerie du téléphone, album
/// CONNEXION PROPHETIQUE, pour qu'elle apparaisse dans Photos.
/// Sur le web, impossible : le navigateur ne peut écrire que dans
/// Téléchargements. Si la permission d'ajout est refusée, repli
/// vers Téléchargements, jamais un échec silencieux.
Future<bool> saveToGallery(List<int> bytes, String name) async {
  // Windows, 30 oct. 2026 : pas de galerie, le repli Telechargements
  // existant prend le relais.
  if (kIsWeb || isWindowsDesktop) return false;
  try {
    final granted = await Gal.requestAccess(toAlbum: true);
    if (!granted) return false;
    await Gal.putImageBytes(Uint8List.fromList(bytes), album: 'CONNEXION PROPHETIQUE', name: name);
    return true;
  } catch (_) {
    return false;
  }
}

Future<File> saveToDownloads(List<int> bytes, String filename) async {
  Directory? dir;
  try {
    dir = await getDownloadsDirectory();
  } catch (_) {
    dir = null;
  }
  dir ??= await getApplicationDocumentsDirectory();
  await dir.create(recursive: true);
  final file = File('${dir.path}/$filename');
  await file.writeAsBytes(bytes, flush: true);
  return file;
}

// Télécharge un fichier de livre par HTTP et le sauvegarde dans
// Téléchargements. Renvoie true en succès, false en échec, sans afficher
// d'erreur elle-même : c'est l'appelant qui décide du repli (par exemple
// ouvrir le lien dans le navigateur). Les URL non HTTP (données, chemins
// relatifs) échouent ici et passent donc par ce repli, ce qui est voulu.
Future<bool> downloadBookFile(BuildContext c, String url, String title) async {
  try {
    toast(c, tr('Téléchargement en cours…'));
    final uri = Uri.parse(url);
    if (uri.scheme != 'http' && uri.scheme != 'https') return false;
    final safeTitle = title.replaceAll(RegExp(r'[^A-Za-z0-9 _-]'), '').trim().replaceAll(' ', '_');
    var ext = uri.pathSegments.isEmpty ? 'pdf' : uri.pathSegments.last.split('.').last.toLowerCase();
    if (ext.length > 4 || ext.contains('/')) ext = 'pdf';
    final client = HttpClient();
    try {
      final request = await client.getUrl(uri);
      final response = await request.close();
      if (response.statusCode != 200) return false;
      final bytes = <int>[];
      await for (final chunk in response) {
        bytes.addAll(chunk);
      }
      if (bytes.isEmpty) return false;
      final file = await saveToDownloads(bytes, '${safeTitle.isEmpty ? 'livre' : safeTitle}.$ext');
      if (c.mounted) toast(c, 'Téléchargé : ${file.path.split('/').last}');
      await Share.shareXFiles([XFile(file.path)], text: title);
      return true;
    } finally {
      client.close();
    }
  } catch (_) {
    return false;
  }
}

// Carte de membre, extraite de la page Carte le 30 oct. 2026 pour
// être réutilisée telle quelle par l'administration : même design,
// mêmes données, aucun changement visuel pour le membre.
class MemberCardView extends StatelessWidget {
  const MemberCardView({super.key, required this.m});
  final Member m;

  @override
  Widget build(BuildContext context) {
    // Pastille conditionnelle, 1er nov. 2026 : le statut de cotisation vient
    // uniquement des paiements confirmés par la structure, jamais déclaré.
    final now = DateTime.now();
    final paidThisMonth = app.requests.any((r) => r.kind == 'cotisation' && r.matricule == m.matricule && r.confirmed && (r.confirmedAt ?? r.date).year == now.year && (r.confirmedAt ?? r.date).month == now.month);
    return ClipRRect(
              borderRadius: BorderRadius.circular(24),
              child: Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Cp.navy,
                  border: Border.all(color: Cp.gold, width: 1.5),
                ),
                child: Stack(children: [
                  // Grands cercles décoratifs du prototype, à droite,
                  // en bleu plus clair, sans toucher aux données.
                  Positioned(
                    right: -60,
                    top: -60,
                    child: Container(width: 220, height: 220, decoration: const BoxDecoration(color: Color(0xFF1B3A63), shape: BoxShape.circle)),
                  ),
                  Positioned(
                    right: -20,
                    top: 60,
                    child: Container(width: 140, height: 140, decoration: const BoxDecoration(color: Color(0xFF163254), shape: BoxShape.circle)),
                  ),
                  Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Row(children: [
                  const WebAssetImage(asset: 'assets/logo.png', partUrls: kLogoParts, height: 40),
                  const Spacer(),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(borderRadius: BorderRadius.circular(20), border: Border.all(color: Cp.gold, width: 1.5)),
                    child: const Text('VIP', style: TextStyle(color: Cp.gold, fontSize: 12, fontWeight: FontWeight.w800, letterSpacing: 2)),
                  ),
                ]),
                const SizedBox(height: 10),
                Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Container(
                    width: 96,
                    height: 122,
                    clipBehavior: Clip.antiAlias,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: const Color(0xFFD4A72C), width: 1.5),
                    ),
                    child: m.hasPhoto
                        ? memberPhotoWidget(m)
                        : Container(
                            color: Cp.gold,
                            child: Center(
                              child: Text(m.name.isEmpty ? '?' : m.name[0].toUpperCase(),
                                  style: const TextStyle(color: Cp.navy, fontSize: 28, fontWeight: FontWeight.w700)),
                            ),
                          ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Text(isEn ? 'MEMBER NUMBER' : 'MEMBRE NUMÉRO',
                          style: TextStyle(color: Cp.gold, fontSize: 10, fontWeight: FontWeight.w700, letterSpacing: 1)),
                      Text(m.matricule,
                          style: TextStyle(color: Cp.gold, fontSize: 19, fontWeight: FontWeight.w800)),
                      const SizedBox(height: 4),
                      Text(isEn ? 'FULL NAME' : 'NOM COMPLET',
                          style: TextStyle(color: Cp.gold, fontSize: 10, fontWeight: FontWeight.w700, letterSpacing: 1)),
                      Text(m.name,
                          style: const TextStyle(color: Colors.white, fontSize: 17, fontWeight: FontWeight.w700)),
                      const SizedBox(height: 4),
                      Text(isEn ? 'ROLE' : 'FONCTION',
                          style: TextStyle(color: Cp.gold, fontSize: 10, fontWeight: FontWeight.w700, letterSpacing: 1)),
                      Text(m.fonction.isEmpty || m.fonction == 'Aucun' ? (isEn ? 'Member' : 'Membre') : m.fonction,
                          style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w700)),
                      if (m.ministere.isNotEmpty) ...[
                        const SizedBox(height: 4),
                        Text(m.ministere, style: const TextStyle(color: Colors.white70, fontSize: 13)),
                      ],
                      const SizedBox(height: 4),
                      Text(isEn ? 'ESTABLISHMENT' : 'ÉTABLISSEMENT',
                          style: TextStyle(color: Cp.gold, fontSize: 10, fontWeight: FontWeight.w700, letterSpacing: 1)),
                      Text(m.etab,
                          style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w700)),
                    ]),
                  ),
                ]),
                const SizedBox(height: 10),
                Row(crossAxisAlignment: CrossAxisAlignment.end, children: [
                  Expanded(
                    child: Row(children: [
                      Flexible(
                        flex: 3,
                        child: FittedBox(
                          fit: BoxFit.scaleDown,
                          alignment: Alignment.centerLeft,
                          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                            Text(isEn ? 'VALID UNTIL' : 'VALIDE JUSQU’AU',
                                style: TextStyle(color: Cp.gold, fontSize: 10, fontWeight: FontWeight.w700, letterSpacing: 1)),
                            Text('${m.validUntil.month.toString().padLeft(2, '0')}/${m.validUntil.year}',
                                style: const TextStyle(color: Colors.white, fontSize: 17, fontWeight: FontWeight.w800)),
                          ]),
                        ),
                      ),
                      Container(width: 2, height: 36, margin: const EdgeInsets.symmetric(horizontal: 10), color: Cp.gold),
                      Flexible(
                        child: FittedBox(
                          fit: BoxFit.scaleDown,
                          alignment: Alignment.centerLeft,
                          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                            Text(isEn ? 'DURATION' : 'DURÉE',
                                style: TextStyle(color: Cp.gold, fontSize: 10, fontWeight: FontWeight.w700, letterSpacing: 1)),
                            Text(isEn ? '1 year' : '1 an',
                                style: const TextStyle(color: Colors.white, fontSize: 17, fontWeight: FontWeight.w800)),
                          ]),
                        ),
                      ),
                    ]),
                  ),
                  const SizedBox(width: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: paidThisMonth ? const Color(0xFF34D399) : Cp.danger, width: 1),
                    ),
                    child: Text(paidThisMonth ? (isEn ? 'Contribution up to date' : 'Cotisation à jour') : (isEn ? 'Contribution due' : 'Cotisation à régler'),
                        style: TextStyle(color: paidThisMonth ? const Color(0xFF34D399) : Cp.danger, fontSize: 11, fontWeight: FontWeight.w700)),
                  ),
                  const SizedBox(width: 8),
                  Container(
                    width: 56,
                    height: 56,
                    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(8)),
                    child: QrImageView(data: m.matricule, size: 48, backgroundColor: Colors.white),
                  ),
                ]),
              ])]),
            ),
          );
  }
}

class CardPage extends StatefulWidget {
  const CardPage({super.key, this.scrollController});
  final ScrollController? scrollController;

  @override
  State<CardPage> createState() => _CardPageState();
}

// Ancienne carte, tranche carte seule, 4 nov. 2026 : meme regle
// que la nouvelle, seulement le visuel MemberCardView, sans
// titre, sans validite ecrite autour, sans boutons PNG, JPG,
// portefeuille, photo, informations, sans cotisation, sans
// notifications, sans recu, sans carte d'information finale,
// sans note de telechargement, sans deconnexion. Cette classe
// n'est plus une entree : la tuile Carte du bas ouvre
// NouvelleCartePage, l'avatar d'en-tete ouvre le Profil. Elle
// reste dans le code comme repli, avec le meme visuel ancien,
// et la meme exception de masquage que la nouvelle carte.
class _CardPageState extends State<CardPage> {
  bool _creating = false;

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final m = app.member;
      if (m == null) {
        return Scaffold(
          body: Center(
            child: FilledButton(
              onPressed: () => go(c, const ProfilePage()),
              child: Text(tr('Créer un compte ou se connecter')),
            ),
          ),
        );
      }
      if (!app.hasPaidCard(m.matricule) && !app.isAdmin) {
        final pendingCard = app.requests.where((r) => r.kind == 'carte' && r.matricule == m.matricule && !r.confirmed).toList();
        return Scaffold(
          body: Center(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: pendingCard.isNotEmpty
                  ? OutlinedButton(onPressed: null, child: Text(tr('Création en attente')))
                  : FilledButton(
                      onPressed: _creating
                          ? null
                          : () async {
                              setState(() => _creating = true);
                              try {
                                await startPayment(c, 'carte', 1000);
                              } finally {
                                if (mounted) setState(() => _creating = false);
                              }
                            },
                      child: Text(_creating ? tr('Création…') : tr('Créer ma carte : 1 000 FCFA')),
                    ),
            ),
          ),
        );
      }
      return Scaffold(
        body: Center(
          child: SingleChildScrollView(
            controller: widget.scrollController,
            padding: const EdgeInsets.all(16),
            child: MemberCardView(m: m),
          ),
        ),
      );
    });
  }
}


// Modifier mes informations, page complète façon artefact, 1er nov.
// 2026 : champs arrondis, libellés en gras au-dessus, dans l'ordre
// de la photo. Nom, téléphone, statut de cotisation et membre
// depuis sont affichés seulement, jamais modifiables ici : aucune
// route serveur ne modifie le nom ni le téléphone, le téléphone
// n'est même pas stocké dans l'application, et le statut de
// cotisation n'est validé que par la structure, jamais déclaré par
// le membre. Fonction, département, date de naissance, établissement
// et langue sont les seuls champs qui s'enregistrent, par les
// mécanismes déjà existants.
class ModifierInfosPage extends StatefulWidget {
  const ModifierInfosPage({super.key, required this.member});
  final Member member;

  @override
  State<ModifierInfosPage> createState() => _ModifierInfosPageState();
}

class _ModifierInfosPageState extends State<ModifierInfosPage> {
  late final TextEditingController _departement;
  late String? _fonction;
  late String? _etab;
  late String _etabInitial;
  late String _lang;
  // Pays de résidence, carte 64 : null veut dire non renseigné.
  String? _pays;
  DateTime? _birth;
  bool _saving = false;

  InputDecoration _dec() => const InputDecoration(
        border: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(16)), borderSide: BorderSide(color: Cp.line)),
        enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(16)), borderSide: BorderSide(color: Cp.line)),
        disabledBorder: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(16)), borderSide: BorderSide(color: Cp.line)),
        filled: true,
        fillColor: Colors.white,
        contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 16),
      );

  Widget _libelle(String t) => Padding(
        padding: const EdgeInsets.only(bottom: 8),
        child: Text(t, style: const TextStyle(fontWeight: FontWeight.w800, color: Cp.navy, fontSize: 16)),
      );

  Widget _champ(String label, Widget child) => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [_libelle(label), child, const SizedBox(height: 16)],
      );

  @override
  void initState() {
    super.initState();
    final m = widget.member;
    _departement = TextEditingController(text: m.ministere);
    _fonction = m.fonction.isEmpty ? null : m.fonction;
    if (m.etab.isEmpty) {
      _etab = 'Autre';
    } else if (app.etabs.any((e) => e.name == m.etab)) {
      _etab = m.etab;
    } else {
      _etab = m.etab;
    }
    _etabInitial = _etab ?? 'Autre';
    _lang = app.lang;
    _pays = app.paysResidence.isEmpty ? null : app.paysResidence;
    _birth = m.dateNaissance;
  }

  @override
  void dispose() {
    _departement.dispose();
    super.dispose();
  }

  Future<void> _enregistrer() async {
    if (_saving) return;
    setState(() => _saving = true);
    try {
      final m = widget.member;
      final nouvelleFonction = _fonction ?? '';
      app.updateLocalProfile(fonction: nouvelleFonction, ministere: _departement.text.trim());
      if (nouvelleFonction.isNotEmpty) {
        final saved = await api.updateFonction(nouvelleFonction);
        if (mounted && !saved) {
          toast(context, tr('Informations mises à jour sur cet appareil seulement : envoi au serveur impossible, la fonction ne suivra pas après déconnexion.'));
        }
      }
      if (_etab != null && _etab != _etabInitial) app.setMemberEtab(_etab!);
      // Pays de résidence, carte 64 : gardé en local, envoi
      // au serveur tenté, route pas encore existante, donc
      // le pays reste local en attendant, sans bloquer.
      final nouveauPays = _pays ?? '';
      if (nouveauPays != app.paysResidence) {
        app.setPaysResidence(nouveauPays);
        final paysSauve = await api.updatePaysResidence(nouveauPays);
        if (!paysSauve && mounted) {
          toast(context, tr('Pays de résidence gardé sur cet appareil seulement : envoi au serveur impossible, il ne suivra pas après déconnexion.'));
        }
      }
      if (_lang != app.lang) app.setLang(_lang);
      final oldBirth = m.dateNaissance;
      final birthChanged = (_birth == null) != (oldBirth == null) || (_birth != null && oldBirth != null && birthIso(_birth!) != birthIso(oldBirth));
      if (birthChanged) {
        final birthSaved = await api.updateDateNaissance(_birth == null ? null : birthIso(_birth!));
        if (birthSaved) {
          app.updateLocalProfile(dateNaissance: _birth, clearBirth: _birth == null);
          unawaited(scheduleBirthdayIfSoon());
        } else if (mounted) {
          toast(context, tr('Date de naissance non enregistrée sur le serveur : vérifiez votre connexion, puis réessayez.'));
        }
      }
      if (mounted) {
        toast(context, tr('Informations mises à jour.'));
        Navigator.of(context).pop();
      }
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final m = widget.member;
    final t = Theme.of(context).textTheme;
    final now = DateTime.now();
    final paidThisMonth = app.requests.any((r) => r.kind == 'cotisation' && r.matricule == m.matricule && r.confirmed && (r.confirmedAt ?? r.date).year == now.year && (r.confirmedAt ?? r.date).month == now.month);
    final fonctionItems = [...kFonctions, if (_fonction != null && !kFonctions.contains(_fonction)) _fonction!];
    final etabItems = <DropdownMenuItem<String>>[
      for (final e in app.etabs) DropdownMenuItem(value: e.name, child: Text(etabDisplayName(e.name))),
      if (_etab != null && _etab != 'Autre' && !app.etabs.any((e) => e.name == _etab)) DropdownMenuItem(value: _etab!, child: Text(_etab!)),
      DropdownMenuItem(value: 'Autre', child: Text(tr('Autre'))),
    ];
    return basic(tr('Modifier mes informations'), [
      _champ(tr('Nom & prénom'), TextField(enabled: false, controller: TextEditingController(text: m.name), decoration: _dec())),
      _champ(
        tr('Numéro de téléphone (inscription)'),
        Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: Cp.line)),
            child: Text(m.telephone.isNotEmpty ? m.telephone : (isEn ? 'Login number, not shown here' : 'Numéro de connexion, non affiché ici'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
          ),
          const SizedBox(height: 8),
          Text(isEn ? 'This is your registration number: with your member number, it lets you sign back in from the opening screen. It cannot be changed here.' : 'C’est le numéro de votre inscription : avec votre matricule, il vous sert à vous reconnecter depuis l’écran d’ouverture. Il ne se modifie pas ici.', style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
        ]),
      ),
      Row(children: [
        Expanded(child: _champ(
          tr('Rôle'),
          DropdownButtonFormField<String>(
            value: _fonction,
            items: [for (final f in fonctionItems) DropdownMenuItem(value: f, child: Text(f, style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w600, color: Cp.navy)))],
            onChanged: (v) => setState(() => _fonction = v),
            decoration: _dec(),
            icon: const Icon(Icons.unfold_more_outlined, color: Cp.navy),
          ),
        )),
        const SizedBox(width: 12),
        Expanded(child: _champ(
          tr('Statut de cotisation'),
          Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            TextField(enabled: false, controller: TextEditingController(text: paidThisMonth ? (isEn ? 'Up to date' : 'À jour') : (isEn ? 'Due' : 'À régler')), decoration: _dec()),
            const SizedBox(height: 8),
            Text(isEn ? 'Validated by the organisation only.' : 'Validé par la structure seulement.', style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
          ]),
        )),
      ]),
      _champ(tr('Département'), TextField(controller: _departement, decoration: _dec())),
      Row(children: [
        Expanded(child: _champ(
          tr('Membre depuis'),
          TextField(enabled: false, controller: TextEditingController(text: '${m.since.year}'), decoration: _dec()),
        )),
        const SizedBox(width: 12),
        Expanded(child: _champ(
          tr('Date de naissance'),
          InkWell(
            borderRadius: BorderRadius.circular(16),
            onTap: () async {
              final picked = await showDatePicker(context: context, initialDate: _birth ?? DateTime(now.year - 30, now.month, now.day), firstDate: DateTime(1900), lastDate: now);
              if (picked != null) setState(() => _birth = picked);
            },
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: Cp.line)),
              child: Row(children: [
                Expanded(child: Text(_birth == null ? tr('Non renseignée') : birthLabel(_birth!), style: t.bodyMedium)),
                if (_birth != null)
                  IconButton(
                    tooltip: tr('Effacer'),
                    icon: const Icon(Icons.clear_outlined),
                    onPressed: () => setState(() => _birth = null),
                  ),
                const Icon(Icons.calendar_month_outlined, color: Cp.navy),
              ]),
            ),
          ),
        )),
      ]),
      Row(children: [
        Expanded(child: _champ(
          tr('Établissement'),
          DropdownButtonFormField<String>(
            value: _etab,
            items: etabItems,
            onChanged: (v) => setState(() => _etab = v),
            decoration: _dec(),
            icon: const Icon(Icons.unfold_more_outlined, color: Cp.navy),
          ),
        )),
        const SizedBox(width: 12),
        Expanded(child: _champ(
          tr('Langue de l’interface'),
          DropdownButtonFormField<String>(
            value: _lang,
            items: const [DropdownMenuItem(value: 'fr', child: Text('Français')), DropdownMenuItem(value: 'en', child: Text('English'))],
            onChanged: (v) => setState(() => _lang = v ?? 'fr'),
            decoration: _dec(),
            icon: const Icon(Icons.unfold_more_outlined, color: Cp.navy),
          ),
        )),
      ]),
      _champ(
        tr('Pays de résidence'),
        DropdownButtonFormField<String>(
          value: _pays,
          items: [for (final p in kPaysResidence) DropdownMenuItem(value: p, child: Text(p, style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w600, color: Cp.navy)))],
          onChanged: (v) => setState(() => _pays = v),
          decoration: _dec(),
          icon: const Icon(Icons.unfold_more_outlined, color: Cp.navy),
        ),
      ),
      const SizedBox(height: 8),
      Row(children: [
        Expanded(child: SizedBox(height: 52, child: OutlinedButton(onPressed: _saving ? null : () => Navigator.of(context).pop(), child: Text(tr('Annuler'))))),
        const SizedBox(width: 12),
        Expanded(child: SizedBox(height: 52, child: FilledButton(onPressed: _saving ? null : _enregistrer, child: Text(_saving ? tr('Enregistrement…') : tr('Enregistrer'))))),
      ]),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════════════
// 7. STRUCTURE ET PLUS
// ═══════════════════════════════════════════════════════════════════
class CommunityPage extends StatelessWidget {
  const CommunityPage({super.key, this.scrollController});
  final ScrollController? scrollController;

  @override
  Widget build(BuildContext context) {
    // Élections, carte 76, 7 nov. 2026 : la tuile n'existe que
    // pendant la période décidée par la structure. Hors période,
    // app.electionOuverte est null et il n'y a aucune trace ici :
    // ni tuile, ni menu, ni mention. La page est reconstruite à
    // chaque synchronisation par live(), la tuile apparaît et
    // disparaît sans redémarrage. Icône check_circle_outlined,
    // déjà utilisée dans l'application, donc déjà dans l'ancienne
    // police en cache, comme la carte 67.
    final election = app.electionOuverte;
    return basic(tr('Structure'), [
      navCard([
        NavTile(icon: Icons.change_history_outlined, label: tr('Camps et retraites'), sub: tr('Inscription et pass numérique.'), onTap: () => go(context, const CampsPage())),
        NavTile(icon: Icons.apartment_outlined, label: tr('Établissements'), sub: tr('Activités et actualités de chaque établissement.'), onTap: () => go(context, const EtabsPage())),
        NavTile(icon: Icons.chat_bubble_outline, label: tr('Actualités'), sub: tr('Les nouvelles de la structure.'), onTap: () => go(context, const NewsPage())),
        NavTile(icon: Icons.calendar_month_outlined, label: tr('Agenda'), sub: tr('Calendrier des événements publiés à leur vraie date.'), onTap: () => go(context, const AgendaPage())),
        NavTile(icon: Icons.folder_open_outlined, label: tr('Documents'), sub: tr('Dossiers de la structure, selon votre établissement.'), onTap: () => go(context, const DocumentsPage())),
        NavTile(icon: Icons.people_outlined, label: tr('Bureau'), sub: tr('Les responsables de la structure.'), onTap: () => go(context, const BureauPage())),
        if (election != null)
          NavTile(icon: Icons.check_circle_outlined, label: tr('Élections'), sub: tr('Votez pour vos responsables, un seul vote par membre.'), onTap: () => goElections(context, () => elections.ElectionsPage())),
      ]),
    ], controller: scrollController);
  }
}

// Recherche globale, 1er nov. 2026, version 1 : un seul champ, qui
// cherche dans les données déjà chargées dans l'application, jamais
// sur le serveur, jamais de résultat inventé. Résultats groupés par
// type, avec le nombre par groupe. Le toucher ouvre la page
// existante de l'élément : Camps pour un camp, Actualités pour une
// actualité, lecteur pour un enseignement avec audio ou lien,
// Librairie pour un livre. Les camps, actualités et livres n'ont
// pas de page de détail séparée en production, le toucher ouvre
// donc leur page existante, comme le fait déjà leur carte.
// Bouton loupe, restructuration 3 nov. 2026 : plus de barre
// de recherche en haut de page. Sur mobile, style Facebook,
// une simple loupe en en-tête ouvre la recherche globale.
// Sur ordinateur, style sites web, la loupe déploie d'abord
// un petit champ dans l'en-tête, et l'envoi ouvre la même
// recherche globale, déjà remplie. Aucune fonction perdue.
class SearchLoupeAction extends StatefulWidget {
  const SearchLoupeAction({super.key});
  @override
  State<SearchLoupeAction> createState() => _SearchLoupeActionState();
}

class _SearchLoupeActionState extends State<SearchLoupeAction> {
  bool _ouvert = false;
  final _ctrl = TextEditingController();

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!Rx.isDesktop(context)) {
      return IconButton(
        tooltip: tr('Rechercher'),
        icon: const Icon(Icons.search_outlined, color: Colors.white),
        onPressed: () => go(context, const RechercheGlobalePage()),
      );
    }
    if (!_ouvert) {
      return IconButton(
        tooltip: tr('Rechercher'),
        icon: const Icon(Icons.search_outlined, color: Colors.white),
        onPressed: () => setState(() => _ouvert = true),
      );
    }
    return Row(mainAxisSize: MainAxisSize.min, children: [
      SizedBox(
        width: 220,
        child: TextField(
          controller: _ctrl,
          autofocus: true,
          textInputAction: TextInputAction.search,
          style: const TextStyle(color: Colors.white),
          decoration: InputDecoration(
            hintText: tr('Rechercher…'),
            hintStyle: const TextStyle(color: Colors.white70),
            prefixIcon: const Icon(Icons.search_outlined, color: Color(0xFFD4A72C)),
            border: const OutlineInputBorder(),
            contentPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
          ),
          onSubmitted: (v) {
            final q = v.trim();
            setState(() => _ouvert = false);
            if (q.isNotEmpty) go(context, RechercheGlobalePage(initialQuery: q));
          },
        ),
      ),
      IconButton(
        tooltip: tr('Fermer'),
        icon: const Icon(Icons.close_outlined, color: Colors.white),
        onPressed: () => setState(() => _ouvert = false),
      ),
    ]);
  }
}

class RechercheGlobalePage extends StatefulWidget {
  const RechercheGlobalePage({super.key, this.initialQuery});
  final String? initialQuery;

  @override
  State<RechercheGlobalePage> createState() => _RechercheGlobalePageState();
}

class _RechercheGlobalePageState extends State<RechercheGlobalePage> {
  final _ctrl = TextEditingController();
  var _query = '';

  @override
  void initState() {
    super.initState();
    if ((widget.initialQuery ?? '').isNotEmpty) {
      _ctrl.text = widget.initialQuery!;
      _query = widget.initialQuery!;
    }
  }

  bool _match(String hay) => _query.isEmpty || sansAccents(hay.toLowerCase()).contains(sansAccents(_query.toLowerCase()));

  bool _matchAll(List<String> parts) => parts.any(_match);

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  Widget _groupe(BuildContext c, String titre, int count, List<Widget> items) {
    if (items.isEmpty) return const SizedBox.shrink();
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text('$titre ($count)', style: Theme.of(c).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
      const SizedBox(height: Cp.s1),
      ...items,
      const SizedBox(height: Cp.s2),
    ]);
  }

  Widget _ligne(BuildContext c, String titre, String sub, VoidCallback onTap) {
    return Padding(
      padding: const EdgeInsets.only(bottom: Cp.s1),
      child: Container(
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
        child: InkWell(
          borderRadius: BorderRadius.circular(24),
          onTap: onTap,
          child: Padding(
            padding: const EdgeInsets.all(Cp.s2),
            child: Row(children: [
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(titre, style: const TextStyle(fontWeight: FontWeight.w700, color: Cp.navy)),
                if (sub.isNotEmpty) ...[const SizedBox(height: 2), Text(sub, style: Theme.of(c).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted))],
              ])),
              const Icon(Icons.chevron_right_outlined, color: Cp.inkMuted),
            ]),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final q = _query.trim();
      final camps = q.isEmpty ? <Camp>[] : app.camps.where((x) => _matchAll([x.name, x.place, x.pays, x.dates, x.description])).toList();
      final news = q.isEmpty ? <NewsItem>[] : app.news.where((x) => _matchAll([x.title, x.text, x.etab])).toList();
      final teachings = q.isEmpty ? <Teaching>[] : app.teachings.where((x) => _matchAll([x.title, x.speaker, x.description, x.thematique])).toList();
      final books = q.isEmpty ? <Book>[] : app.books.where((x) => _matchAll([x.title, x.author, x.description])).toList();
      final total = camps.length + news.length + teachings.length + books.length;
      return basic(tr('Recherche globale'), [
        TextField(
          controller: _ctrl,
          onChanged: (v) => setState(() => _query = v),
          decoration: InputDecoration(
            hintText: tr('Rechercher camps, actualités, enseignements, livres…'),
            prefixIcon: const Icon(Icons.search_outlined),
            filled: true,
            fillColor: Cp.card,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
          ),
        ),
        const SizedBox(height: Cp.s2),
        if (q.isEmpty)
          Text(tr('Tapez un mot pour chercher dans ce qui est déjà chargé sur cet appareil.'), style: Theme.of(c).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted))
        else if (total == 0)
          EmptyNote(icon: Icons.search_off_outlined, text: tr('Aucun résultat pour cette recherche.'))
        else ...[
          _groupe(c, tr('Camps'), camps.length, [for (final x in camps) _ligne(c, x.name, [x.lieuPays, x.dates].where((e) => e.isNotEmpty).join(' · '), () => go(c, const CampsPage()))]),
          _groupe(c, tr('Actualités'), news.length, [for (final x in news) _ligne(c, x.title, x.etab, () => go(c, const NewsPage()))]),
          _groupe(c, tr('Enseignements'), teachings.length, [for (final x in teachings) _ligne(c, x.title, x.speaker, () {
            if (x.url.isEmpty) {
              go(c, const TeachingsPage());
            } else if (isPageLink(x.url)) {
              go(c, LinkViewPage(title: x.title, url: x.url));
            } else {
              go(c, AudioPlayerPage(teaching: x));
            }
          })]),
          _groupe(c, tr('Livres'), books.length, [for (final x in books) _ligne(c, x.title, x.author, () => go(c, const LibrairiePage()))]),
        ],
      ]);
    });
  }
}

// Agenda institutionnel, 1er nov. 2026, version 1 : calendrier
// mensuel en haut, liste du jour ou du mois choisi en dessous.
// Seuls les événements publiés à leur vraie date sont placés :
// camps avec dates structurées, réunions en ligne avec leur date
// et leur heure de début, actualités avec leur date. Les camps
// publiés sans dates structurées ne sont jamais placés sur un jour,
// ils apparaissent en bas dans Dates à confirmer, comme pour le
// calendrier des camps. Le toucher ouvre la page existante de
// l'événement : Camps, Réunions en ligne ou Actualités.

// Calendrier beau, 3 nov. 2026 : même langage visuel pour Agenda et
// pour la vue Calendrier des camps. En-tête bleu nuit avec mois en
// grand en blanc et année en or, aujourd'hui en pastille bleu nuit,
// jour sélectionné en pastille or, jours sans événement en gris
// discret, week-ends atténués. Les points colorent le type,
// camp en or, actualité en bleu nuit, jusqu'à 3 points puis +n.
// Une barre or continue marque un camp sur plusieurs jours,
// arrondie au début et à la fin seulement. Aucune date n'est
// inventée ici, les jours ne montrent que les dates déjà en base.
class _CalendrierEntete extends StatelessWidget {
  const _CalendrierEntete({required this.mois, required this.annee, required this.onPrev, required this.onNext, required this.onToday});
  final String mois;
  final String annee;
  final VoidCallback onPrev;
  final VoidCallback onNext;
  final VoidCallback onToday;
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(24)),
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 12),
      child: Column(children: [
        Row(children: [
          IconButton(icon: const Icon(Icons.chevron_left, color: Colors.white, size: 28), onPressed: onPrev),
          Expanded(child: Column(children: [
            Text(mois, textAlign: TextAlign.center, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: Colors.white)),
            const SizedBox(height: 2),
            Text(annee, textAlign: TextAlign.center, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: Cp.gold, letterSpacing: 1.5)),
          ])),
          IconButton(icon: const Icon(Icons.chevron_right, color: Colors.white, size: 28), onPressed: onNext),
        ]),
        const SizedBox(height: 8),
        SizedBox(
          height: 36,
          child: FilledButton(
            style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy, padding: const EdgeInsets.symmetric(horizontal: 20)),
            onPressed: onToday,
            child: Text(tr('Aujourd’hui'), style: const TextStyle(fontWeight: FontWeight.w800)),
          ),
        ),
      ]),
    );
  }
}

Widget _calendrierLegende() {
  Widget point(Color c, String label) => Row(mainAxisSize: MainAxisSize.min, children: [
        Container(width: 8, height: 8, decoration: BoxDecoration(color: c, shape: BoxShape.circle)),
        const SizedBox(width: 6),
        Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Cp.inkMuted)),
      ]);
  return Wrap(
    spacing: 16,
    runSpacing: 6,
    children: [
      point(Cp.gold, tr('Camps')),
      point(Cp.navy, tr('Actualités')),
      Row(mainAxisSize: MainAxisSize.min, children: [
        Container(width: 24, height: 4, decoration: BoxDecoration(color: Cp.gold, borderRadius: BorderRadius.circular(2))),
        const SizedBox(width: 6),
        Text(tr('Camp sur plusieurs jours'), style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Cp.inkMuted)),
      ]),
    ],
  );
}

Widget _calJour({
  int? dayNum,
  required bool isToday,
  required bool selected,
  required bool weekend,
  required bool hasEvent,
  required List<Color> points,
  required int reste,
  required bool barre,
  required bool barreDebut,
  required bool barreFin,
  required VoidCallback? onTap,
}) {
  if (dayNum == null) return const Expanded(child: SizedBox(height: 58));
  final numberColor = isToday
      ? Colors.white
      : selected
          ? Cp.navy
          : hasEvent
              ? Cp.navy
              : Cp.inkMuted;
  return Expanded(
    child: InkWell(
      borderRadius: BorderRadius.circular(12),
      onTap: onTap,
      child: SizedBox(
        height: 58,
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Container(
            width: 34,
            height: 34,
            decoration: BoxDecoration(shape: BoxShape.circle, color: isToday ? Cp.navy : selected ? Cp.gold : null),
            child: Center(child: Text('$dayNum', style: TextStyle(fontSize: 15, fontWeight: hasEvent || isToday || selected ? FontWeight.w800 : FontWeight.w500, color: numberColor))),
          ),
          const SizedBox(height: 2),
          SizedBox(
            height: 10,
            child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
              for (final c in points) Container(width: 6, height: 6, margin: const EdgeInsets.symmetric(horizontal: 1.5), decoration: BoxDecoration(color: c, shape: BoxShape.circle)),
              if (reste > 0) Text('+$reste', style: const TextStyle(fontSize: 9, fontWeight: FontWeight.w800, color: Cp.goldDeep)),
            ]),
          ),
          Container(
            height: 4,
            width: double.infinity,
            decoration: BoxDecoration(
              color: barre ? Cp.gold : Colors.transparent,
              borderRadius: BorderRadius.horizontal(left: barreDebut ? const Radius.circular(2) : Radius.zero, right: barreFin ? const Radius.circular(2) : Radius.zero),
            ),
          ),
        ]),
      ),
    ),
  );
}

class AgendaPage extends StatefulWidget {
  const AgendaPage({super.key});

  @override
  State<AgendaPage> createState() => _AgendaPageState();
}

class _AgendaItem {
  _AgendaItem(this.titre, this.date, this.sousTitre, this.type);
  final String titre;
  final DateTime date;
  final String sousTitre;
  final String type;
}

class _AgendaPageState extends State<AgendaPage> {
  late DateTime _month;
  DateTime? _selected;

  static const _monthsFr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  static const _monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  @override
  void initState() {
    super.initState();
    final now = DateTime.now();
    _month = DateTime(now.year, now.month);
  }

  DateTime _dayOnly(DateTime d) => DateTime(d.year, d.month, d.day);

  List<_AgendaItem> _items() {
    final items = <_AgendaItem>[];
    for (final camp in app.camps) {
      if (camp.dateDebut == null) continue;
      final fin = camp.dateFin ?? camp.dateDebut!;
      var d = _dayOnly(camp.dateDebut!);
      final last = _dayOnly(fin);
      while (!d.isAfter(last)) {
        items.add(_AgendaItem(camp.name, d, [camp.lieuPays, camp.dates].where((e) => e.isNotEmpty).join(' · '), 'camp'));
        d = d.add(const Duration(days: 1));
      }
    }
    for (final n in app.news) {
      items.add(_AgendaItem(n.title, n.date, n.etab, 'actualite'));
    }
    items.sort((a, b) => a.date.compareTo(b.date));
    return items;
  }

  List<Camp> get _sansDate => app.camps.where((c) => c.dateDebut == null).toList();

  String _monthName() {
    final months = isEn ? _monthsEn : _monthsFr;
    return months[_month.month - 1];
  }

  void _goToday() {
    final now = DateTime.now();
    setState(() {
      _month = DateTime(now.year, now.month);
      _selected = _dayOnly(now);
    });
  }

  // Camp sur plusieurs jours couvrant ce jour, pour la barre or.
  (bool, bool, bool) _barreCamp(DateTime day) {
    var barre = false;
    var debut = false;
    var fin = false;
    for (final camp in app.camps) {
      if (camp.dateDebut == null || camp.dateFin == null) continue;
      final start = _dayOnly(camp.dateDebut!);
      final end = _dayOnly(camp.dateFin!);
      if (end.isAfter(start) && !day.isBefore(start) && !day.isAfter(end)) {
        barre = true;
        if (day == start) debut = true;
        if (day == end) fin = true;
      }
    }
    return (barre, debut, fin);
  }

  String _dateLabel(DateTime day) {
    final months = isEn ? _monthsEn : _monthsFr;
    return isEn ? '${months[day.month - 1]} ${day.day}, ${day.year}' : '${day.day} ${months[day.month - 1].toLowerCase()} ${day.year}';
  }

  String _heureLabel(DateTime d) {
    final h = d.hour.toString().padLeft(2, '0');
    final m = d.minute.toString().padLeft(2, '0');
    return d.hour == 0 && d.minute == 0 ? '' : ' à $h:$m';
  }

  void _open(BuildContext c, _AgendaItem item) {
    switch (item.type) {
      case 'camp':
        go(c, const CampsPage());
      default:
        go(c, const NewsPage());
    }
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      final items = _items();
      final daysInMonth = DateTime(_month.year, _month.month + 1, 0).day;
      final firstWeekday = DateTime(_month.year, _month.month, 1).weekday;
      final today = _dayOnly(DateTime.now());
      final monthItems = items.where((i) => i.date.year == _month.year && i.date.month == _month.month).toList();
      final dayItems = _selected == null ? monthItems : items.where((i) => _dayOnly(i.date) == _selected).toList();
      final daysFr = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
      final daysEn = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
      final days = isEn ? daysEn : daysFr;
      final offset = firstWeekday - 1;
      final weeks = ((offset + daysInMonth) / 7).ceil();
      return basic(tr('Agenda'), [
        _CalendrierEntete(
          mois: _monthName(),
          annee: '${_month.year}',
          onPrev: () => setState(() {
                _month = DateTime(_month.year, _month.month - 1);
                _selected = null;
              }),
          onNext: () => setState(() {
                _month = DateTime(_month.year, _month.month + 1);
                _selected = null;
              }),
          onToday: _goToday,
        ),
        const SizedBox(height: Cp.s2),
        Row(children: [
          for (var wd = 0; wd < 7; wd++)
            Expanded(child: Center(child: Text(days[wd], style: t.bodySmall?.copyWith(fontWeight: FontWeight.w700, color: wd >= 5 ? Cp.inkMuted.withValues(alpha: 0.6) : Cp.navy))))
        ]),
        const SizedBox(height: 4),
        for (var w = 0; w < weeks; w++)
          Row(children: [
            for (var wd = 0; wd < 7; wd++) ...[
              () {
                final dayNum = w * 7 + wd - offset + 1;
                if (dayNum < 1 || dayNum > daysInMonth) return _calJour(dayNum: null, isToday: false, selected: false, weekend: false, hasEvent: false, points: const [], reste: 0, barre: false, barreDebut: false, barreFin: false, onTap: null);
                final day = DateTime(_month.year, _month.month, dayNum);
                final dayList = items.where((x) => _dayOnly(x.date) == day).toList();
                final points = dayList.take(3).map((x) => x.type == 'camp' ? Cp.gold : Cp.navy).toList();
                final (barre, barreDebut, barreFin) = _barreCamp(day);
                final isSel = _selected != null && _selected == day;
                return _calJour(
                  dayNum: dayNum,
                  isToday: day == today,
                  selected: isSel,
                  weekend: wd >= 5,
                  hasEvent: dayList.isNotEmpty,
                  points: points,
                  reste: dayList.length > 3 ? dayList.length - 3 : 0,
                  barre: barre,
                  barreDebut: barreDebut,
                  barreFin: barreFin,
                  onTap: () => setState(() => _selected = isSel ? null : day),
                );
              }(),
            ],
          ]),
        const SizedBox(height: Cp.s1),
        _calendrierLegende(),
        const SizedBox(height: Cp.s2),
        Text(_selected == null ? tr('Ce mois') : _dateLabel(_selected!), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
        const SizedBox(height: Cp.s1),
        if (dayItems.isEmpty)
          Text(tr('Aucun événement publié à cette date.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted))
        else
          for (final item in dayItems)
            Padding(
              padding: const EdgeInsets.only(bottom: Cp.s1),
              child: Container(
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
                child: InkWell(
                  borderRadius: BorderRadius.circular(24),
                  onTap: () => _open(c, item),
                  child: Padding(
                    padding: const EdgeInsets.all(Cp.s2),
                    child: Row(children: [
                      Container(
                        width: 36,
                        height: 36,
                        decoration: BoxDecoration(color: Cp.gold.withValues(alpha: 0.15), shape: BoxShape.circle),
                        child: Icon(item.type == 'camp' ? Icons.change_history_outlined : Icons.chat_bubble_outline, color: Cp.navy, size: 20),
                      ),
                      const SizedBox(width: Cp.s1),
                      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text(item.titre, style: const TextStyle(fontWeight: FontWeight.w700, color: Cp.navy)),
                        Text('${_dateLabel(_dayOnly(item.date))}${_heureLabel(item.date)}${item.sousTitre.isNotEmpty ? ' · ${item.sousTitre}' : ''}', style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
                      ])),
                      const Icon(Icons.chevron_right_outlined, color: Cp.inkMuted),
                    ]),
                  ),
                ),
              ),
            ),
        if (_sansDate.isNotEmpty) ...[
          const SizedBox(height: Cp.s2),
          Text(tr('Dates à confirmer'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
          const SizedBox(height: Cp.s1),
          Text(tr('Ces camps sont publiés, mais sans dates structurées, ils ne sont placés sur aucun jour.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
          const SizedBox(height: Cp.s1),
          for (final camp in _sansDate)
            Padding(
              padding: const EdgeInsets.only(bottom: Cp.s1),
              child: Container(
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
                child: InkWell(
                  borderRadius: BorderRadius.circular(24),
                  onTap: () => go(c, const CampsPage()),
                  child: Padding(
                    padding: const EdgeInsets.all(Cp.s2),
                    child: Row(children: [
                      const Icon(Icons.change_history_outlined, color: Cp.navy),
                      const SizedBox(width: Cp.s1),
                      Expanded(child: Text(camp.name, style: const TextStyle(fontWeight: FontWeight.w700, color: Cp.navy))),
                      const Icon(Icons.chevron_right_outlined, color: Cp.inkMuted),
                    ]),
                  ),
                ),
              ),
            ),
        ],
      ]);
    });
  }
}

// Gestion documentaire institutionnelle, 1er nov. 2026, version 1 :
// dossiers de la structure, titre, date et visibilité affichés, la
// page démarre vide, aucun document inventé. Publication par la
// structure seulement, administrateur général pour tous,
// administrateur d'établissement pour son établissement seulement,
// lecture filtrée côté serveur. Un document, c'est un titre avec
// un lien ou un fichier téléversé par le mécanisme existant,
// PDF, EPUB ou image, jamais un autre type. Le toucher ouvre le
// lien dans l'application, ou télécharge le fichier.
class DocumentsPage extends StatefulWidget {
  const DocumentsPage({super.key});

  @override
  State<DocumentsPage> createState() => _DocumentsPageState();
}

class _DocumentsPageState extends State<DocumentsPage> {
  List<Map<String, dynamic>> _docs = [];
  var _loading = true;
  String? _error;
  var _publishing = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final docs = await api.fetchDocuments();
      if (!mounted) return;
      setState(() {
        _docs = docs;
        _loading = false;
      });
    } catch (_) {
      if (mounted) setState(() {
        _loading = false;
        _error = 'offline';
      });
    }
  }

  String _date(String? iso) {
    if (iso == null || iso.isEmpty) return '';
    final d = DateTime.tryParse(iso);
    if (d == null) return '';
    return '${d.day.toString().padLeft(2, '0')}/${d.month.toString().padLeft(2, '0')}/${d.year}';
  }

  String _visibilite(Map<String, dynamic> doc) {
    final etab = (doc['etablissement'] ?? '').toString();
    if (etab.isNotEmpty) return etab;
    return isEn ? 'Whole structure' : 'Toute la structure';
  }

  Future<void> _ouvrir(BuildContext c, Map<String, dynamic> doc) async {
    final lien = (doc['lien'] ?? '').toString();
    if (lien.isNotEmpty) {
      go(c, LinkViewPage(title: (doc['titre'] ?? '').toString(), url: lien));
      return;
    }
    final id = (doc['id'] ?? '').toString();
    if (id.isEmpty) return;
    try {
      toast(c, tr('Téléchargement en cours…'));
      final bytes = await api.fetchDocumentFile(id);
      final titre = (doc['titre'] ?? 'document').toString().replaceAll(RegExp(r'[^A-Za-z0-9 _-]'), '').trim().replaceAll(' ', '_');
      final mime = (doc['mime'] ?? '').toString();
      final ext = mime.contains('pdf') ? 'pdf' : mime.contains('epub') ? 'epub' : mime.contains('png') ? 'png' : mime.contains('webp') ? 'webp' : 'jpg';
      final file = await saveToDownloads(bytes, '${titre.isEmpty ? 'document' : titre}.$ext');
      if (c.mounted) toast(c, 'Téléchargé : ${file.path.split('/').last}');
      await Share.shareXFiles([XFile(file.path)], text: (doc['titre'] ?? '').toString());
    } catch (_) {
      if (c.mounted) toast(c, tr('Impossible de télécharger ce document. Vérifiez votre connexion.'));
    }
  }

  Future<void> _publier(BuildContext c) async {
    final titreCtrl = TextEditingController();
    final lienCtrl = TextEditingController();
    String? etabId;
    String? fichierNom;
    List<int>? fichierBytes;
    String? fichierId;
    final ok = await showDialog<bool>(
      context: c,
      builder: (ctx) => StatefulBuilder(builder: (ctx, setS) => AlertDialog(
            title: Text(tr('Publier un document')),
            content: SingleChildScrollView(child: Column(mainAxisSize: MainAxisSize.min, children: [
              TextField(controller: titreCtrl, decoration: InputDecoration(labelText: tr('Titre'))),
              const SizedBox(height: 8),
              TextField(controller: lienCtrl, decoration: InputDecoration(labelText: tr('Lien (facultatif)'))),
              const SizedBox(height: 8),
              if (!app.isAdminEtablissement)
                DropdownButtonFormField<String>(
                  value: etabId,
                  items: [
                    DropdownMenuItem(value: null, child: Text(tr('Toute la structure'))),
                    for (final e in app.etabs) if (e.id.isNotEmpty) DropdownMenuItem(value: e.id, child: Text(etabDisplayName(e.name))),
                  ],
                  onChanged: (v) => setS(() => etabId = v),
                  decoration: InputDecoration(labelText: tr('Visible pour')),
                ),
              const SizedBox(height: 8),
              OutlinedButton.icon(
                icon: const Icon(Icons.attach_file_outlined),
                label: Text(fichierNom ?? tr('Choisir un fichier PDF, EPUB ou image')),
                onPressed: () async {
                  final picked = await FilePicker.platform.pickFiles(
                    type: FileType.custom,
                    allowedExtensions: const ['pdf', 'epub', 'jpg', 'jpeg', 'png', 'webp'],
                    withData: true,
                  );
                  if (picked == null || picked.files.isEmpty) return;
                  final f = picked.files.first;
                  setS(() {
                    fichierNom = f.name;
                    fichierBytes = f.bytes?.toList();
                  });
                },
              ),
              if (app.isAdminEtablissement) ...[
                const SizedBox(height: 8),
                Text(tr('Administrateur d’établissement : publication pour votre établissement seulement.'), style: Theme.of(c).textTheme.bodySmall?.copyWith(color: Cp.inkMuted)),
              ],
            ])),
            actions: [
              TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
              FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Publier'))),
            ],
          )),
    );
    if (ok != true) return;
    final titre = titreCtrl.text.trim();
    if (titre.isEmpty) {
      toast(c, tr('Le titre est requis.'));
      return;
    }
    setState(() => _publishing = true);
    try {
      if (fichierBytes != null && fichierNom != null) {
        final bas = fichierNom!.toLowerCase();
        try {
          if (bas.endsWith('.pdf') || bas.endsWith('.epub')) {
            fichierId = await api.uploadLivre(bytes: fichierBytes, filename: fichierNom);
          } else {
            fichierId = await api.uploadImageBytes(fichierBytes!, fichierNom!);
          }
        } catch (e) {
          if (c.mounted) toast(c, 'Fichier non téléversé ($e). Le document n’est pas publié.');
          return;
        }
      }
      final cible = app.isAdminEtablissement ? null : etabId;
      await api.publishDocument(titre: titre, lien: lienCtrl.text.trim().isEmpty ? null : lienCtrl.text.trim(), fichierId: fichierId, etablissementId: cible);
      if (c.mounted) toast(c, tr('Document publié.'));
      await _charger();
    } catch (e) {
      if (c.mounted) toast(c, 'Publication refusée ($e).');
    } finally {
      if (mounted) setState(() => _publishing = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      return basic(tr('Documents'), [
        if (app.isAdmin)
          Padding(
            padding: const EdgeInsets.only(bottom: Cp.s2),
            child: SizedBox(
              width: double.infinity,
              height: 52,
              child: FilledButton.icon(
                icon: const Icon(Icons.add_outlined),
                label: Text(_publishing ? tr('Publication…') : tr('Publier un document')),
                onPressed: _publishing ? null : () => _publier(c),
              ),
            ),
          ),
        if (_loading)
          const Center(child: UxShimmerList())
        else if (_error != null) ...[
          EmptyNote(icon: Icons.folder_off_outlined, text: tr('Documents indisponibles hors ligne. Reconnectez-vous pour les voir.')),
          const SizedBox(height: Cp.s1),
          OutlinedButton(onPressed: _charger, child: Text(tr('Réessayer'))),
        ] else if (_docs.isEmpty)
          EmptyNote(icon: Icons.folder_open_outlined, text: tr('Aucun document publié pour le moment.'))
        else
          for (final doc in _docs)
            Padding(
              padding: const EdgeInsets.only(bottom: Cp.s1),
              child: Container(
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
                child: InkWell(
                  borderRadius: BorderRadius.circular(24),
                  onTap: () => _ouvrir(c, doc),
                  child: Padding(
                    padding: const EdgeInsets.all(Cp.s2),
                    child: Row(children: [
                      const Icon(Icons.description_outlined, color: Cp.navy, size: 20),
                      const SizedBox(width: Cp.s1),
                      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text((doc['titre'] ?? '').toString(), style: const TextStyle(fontWeight: FontWeight.w700, color: Cp.navy)),
                        const SizedBox(height: 2),
                        Text([_date((doc['publie_le'] ?? '').toString()), _visibilite(doc)].where((e) => e.isNotEmpty).join(' · '), style: Theme.of(c).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted)),
                      ])),
                      if (app.isAdmin)
                        IconButton(
                          tooltip: tr('Supprimer'),
                          icon: const Icon(Icons.delete_outline, color: Cp.danger),
                          onPressed: () async {
                            final ok = await showDialog<bool>(
                              context: c,
                              builder: (ctx) => AlertDialog(
                                title: Text(tr('Supprimer ce document ?')),
                                content: Text((doc['titre'] ?? '').toString()),
                                actions: [
                                  TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
                                  FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Supprimer'))),
                                ],
                              ),
                            );
                            if (ok == true) {
                              try {
                                await api.deleteDocument((doc['id'] ?? '').toString());
                                await _charger();
                              } catch (_) {
                                if (c.mounted) toast(c, tr('Suppression refusée.'));
                              }
                            }
                          },
                        )
                      else
                        const Icon(Icons.chevron_right_outlined, color: Cp.inkMuted),
                    ]),
                  ),
                ),
              ),
            ),
      ]);
    });
  }
}

class MorePage extends StatelessWidget {
  const MorePage({super.key, this.scrollController});
  final ScrollController? scrollController;

  void _admin(BuildContext c) {
    if (app.isAdmin) {
      goAdmin(c, () => admin.AdminPage());
      return;
    }
    // 27 oct. 2026, porte locale fermée : l'espace structure n'est
    // plus ouvert par un code créé sur l'appareil, car n'importe
    // qui pouvait alors entrer dans la page, même sans rôle serveur.
    // Seul un compte administrateur serveur (admin_general ou
    // admin_etablissement, promu par la structure) ouvre la page.
    // Les publications serveur refusaient déjà les membres ordinaires,
    // mais la page elle-même ne doit pas s'ouvrir pour eux.
    showDialog(
      context: c,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Espace structure')),
        content: Text(tr('Accès réservé aux administrateurs de la structure. Si vous faites partie de la structure, demandez à un administrateur de promouvoir votre compte, puis reconnectez-vous.')),
        actions: [TextButton(onPressed: () => Navigator.pop(ctx), child: Text(tr('Fermer')))],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      // Icones Plus reduites, 5 nov. 2026, modele Gemini : les tuiles
      // internes de l'Espace Structure Gemini font 36 px avec une
      // icone d'environ 16 px, ses en-tetes de section 44 px avec
      // une icone de 18 px. Ici 40 px et 20 px : meme echelle, en
      // gardant une icone lisible. Hauteur de ligne 96 px avant,
      // 64 px apres, toujours au-dessus de la cible tactile de 48 px.
      Widget tile(IconData icon, String label, String sub, VoidCallback onTap) {
        return InkWell(
          onTap: onTap,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: Cp.s2, vertical: 12),
            child: Row(children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(12)),
                child: Icon(icon, color: Cp.gold, size: 20),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(label, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
                  const SizedBox(height: 2),
                  Text(sub, style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
                ]),
              ),
              const Icon(Icons.chevron_right_outlined, color: Cp.inkMuted, size: 20),
            ]),
          ),
        );
      }
      return basic(tr('Plus'), [
        Container(
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
          child: Column(children: [
            tile(Icons.text_fields_outlined, tr('Taille du texte'), tr('Normale, grande ou très grande, pour toute l’application.'), () => goMembre(c, () => membre.TextSizePage())),
            const Divider(height: 1, color: Cp.line),
            // Carte 113, 9 nov. 2026 : playlist, tous les audios
            // de la structure, enseignements, musiques et
            // podcasts, dans un seul écran doux façon Apple Music.
            tile(Icons.queue_music_outlined, tr('Playlist'), tr('Tous les audios de la structure, enseignements, musiques et podcasts.'), () => go(c, const PlaylistPage())),
            const Divider(height: 1, color: Cp.line),
            tile(Icons.favorite_border, tr('Don'), tr('Dîmes & offrandes'), () => go(c, const DonsPage())),
            const Divider(height: 1, color: Cp.line),
            // Carte 80, 7 nov. 2026 : work_outline, 0xe6f4, absent de
            // la police web servie ; assignment_outlined, deja
            // l'icone Emploi de la carte 67, est dans les deux.
            tile(Icons.assignment_outlined, tr('Tremplin professionnel'), tr('Offres d’emploi, stages et formations, selon votre pays.'), () => goEmploi(c, () => emploi.OffresEmploiPage())),
            const Divider(height: 1, color: Cp.line),
            tile(Icons.assignment_outlined, tr('Mes absences et demandes'), tr('Signaler une absence ou faire une demande à la structure.'), () => goEmploi(c, () => emploi.MesDemandesPage())),
            // Carte 93 : « Devenir partenaire », seulement pour
            // un membre connecté qui n'est pas déjà Plateforme.
            // Même parcours que le choix à l'inscription, sans
            // deuxième compte. Pas dans le Profil, règle Profil
            // seul : l'entrée vit ici, dans Plus.
            if (app.member != null && !app.isPlateforme) ...[
              const Divider(height: 1, color: Cp.line),
              tile(Icons.workspace_premium_outlined, tr('Devenir partenaire'), tr('Publier vos enseignements, 100 000 FCFA par an, validation par la structure.'), () => goPlateforme(c, () => plateforme.DevenirPartenairePage())),
            ],
            // Carte 83 : tuiles Plateforme, seulement pour la
            // fonction Plateforme, jamais pour les autres membres.
            if (app.isPlateforme) ...[
              const Divider(height: 1, color: Cp.line),
              tile(Icons.headphones_outlined, tr('Mes enseignements'), tr('Publier vos enseignements, la structure valide avant publication.'), () => goPlateforme(c, () => plateforme.MesEnseignementsPage())),
              const Divider(height: 1, color: Cp.line),
              tile(Icons.workspace_premium_outlined, tr('Abonnement Plateforme'), tr('100 000 FCFA par an, pour mettre vos enseignements en ligne.'), () => goPlateforme(c, () => plateforme.PlateformeAbonnementPage())),
            ],
            const Divider(height: 1, color: Cp.line),
            tile(Icons.account_balance_wallet_outlined, tr('Mes achats'), tr('Achats en attente et achats confirmés, avec Télécharger et la facture.'), () => go(c, const MyPurchasesPage())),
            const Divider(height: 1, color: Cp.line),
            if (!kIsWeb) tile(Icons.receipt_long_outlined, tr('Historique des transactions'), tr('Cotisations, dons, carte et achats, avec le détail de chaque opération.'), () => goMembre(c, () => membre.TransactionHistoryPage())),
            if (!kIsWeb) const Divider(height: 1, color: Cp.line),
            tile(Icons.whatshot_outlined, tr('Mon épanouissement'), tr('Plan de lecture de 21 jours, journal privé et minuteur de prière.'), () => go(c, const EpanouissementPage())),
            const Divider(height: 1, color: Cp.line),
            tile(Icons.school_outlined, tr('Mes résultats scolaires'), tr('Mes moyennes par trimestre, pour moi seulement.'), () => goMembre(c, () => membre.MesResultatsScolairesPage())),
            tile(Icons.workspace_premium_outlined, tr('Mes attestations'), tr('Bénévolat et participation délivrés par la structure, pour moi seulement.'), () => goAdmin(c, () => admin.MesAttestationsPage())),
            const Divider(height: 1, color: Cp.line),
            if (app.isAdmin) tile(Icons.shield_outlined, tr('Espace structure'), tr('Paiements à valider et publications de la structure.'), () => _admin(c)),
            const Divider(height: 1, color: Cp.line),
            tile(Icons.bug_report_outlined, tr('Signaler un problème'), tr('Un plantage ou un écran qui ne marche pas ? Envoyez un rapport à la structure.'), () => goMembre(c, () => membre.BugReportPage())),
            const Divider(height: 1, color: Cp.line),
            // Carte 98, 8 nov. 2026 : la page Notifications n'est
            // plus ouverte par une cloche en haut de l'application,
            // elle s'ouvre depuis Plus, par cette entrée en texte,
            // sans icône cloche, sans compteur de non lues.
            tile(Icons.inbox_outlined, tr('Notifications'), tr('Les messages de la structure, lus et non lus.'), () => go(c, const NotificationsPage())),
            const Divider(height: 1, color: Cp.line),
            // Carte 90, 7 nov. 2026 : revoir la visite guidée
            // interactive, étape par étape, dans l'application.
            // Elle se lance au-dessus de l'onglet Plus, sans
            // quitter l'application, et Passer la ferme.
            tile(Icons.explore_outlined, tr('Visite guidée'), tr('Revoir la visite guidée, étape par étape, dans l’application.'), () => demandeVisiteGuidee.value++),
            const Divider(height: 1, color: Cp.line),
            tile(Icons.info_outlined, tr('À propos & Aide'), tr('Ce que fait l’application, les données gardées, les paiements et l’aide par module.'), () => goMembre(c, () => membre.AboutPage())),
          ]),
        ),
      ], controller: scrollController);
    });
  }
}

// Taille du texte de lecture, 31 oct. 2026, lot 1 chantier 4 sur 6.
// Le réglage est local à l'appareil (voir lib/text_size.dart), il
// n'est pas synchronisé au compte. Seules les surfaces de lecture
// suivent le facteur : versets de la Bible, verset du jour, questions
// du quiz. Les boutons, libellés et cartes gardent leur taille.
String textSizeLevelName(int level) {
  switch (level.clamp(0, 2)) {
    case 1:
      return tr('Grande');
    case 2:
      return tr('Très grande');
    default:
      return tr('Normale');
  }
}

// ═══════════════════════════════════════════════════════════════════
// 8. BIBLE, QUIZ, ENSEIGNEMENTS, PRIÈRE
// ═══════════════════════════════════════════════════════════════════
// Bandeau compact du verset du jour, réorganisation Bible,
// 30 oct. 2026 : même verset tournant que la grande carte,
// en un bandeau fin. Carte 54, 6 nov. 2026 : plus de bouton
// Autre verset, un verset du jour ne change pas au hasard.
// Carte 55, 6 nov. 2026 : même premium bleu nuit et or que la
// grande carte, monogramme CP à gauche, libellé en or, texte
// blanc en Lora, sans photo de fond.
// Toucher le bandeau ouvre le chapitre du verset, comme les
// autres tuiles de verset de l'application.
class _CompactVerseBanner extends StatefulWidget {
  const _CompactVerseBanner({required this.lang, required this.onOpenChapter});
  final String lang;
  final void Function(int book, int chapter) onOpenChapter;

  @override
  State<_CompactVerseBanner> createState() => _CompactVerseBannerState();
}

class _CompactVerseBannerState extends State<_CompactVerseBanner> {
  late Future<BibleVerseRef> _future;

  @override
  void initState() {
    super.initState();
    _future = BibleService.instance.rotatingVerse(widget.lang);
  }

  @override
  void didUpdateWidget(covariant _CompactVerseBanner oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.lang != widget.lang) {
      _future = BibleService.instance.rotatingVerse(widget.lang);
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return FutureBuilder<BibleVerseRef>(
      future: _future,
      builder: (context, snap) {
        final ref = snap.data;
        final text = ref?.text.isNotEmpty == true
            ? ref!.text
            : (widget.lang == 'fr' ? 'L’Éternel est mon berger : je ne manquerai de rien.' : 'The LORD is my shepherd; I shall not want.');
        final label = ref != null
            ? BibleService.instance.label(widget.lang, ref.book, ref.chapter, ref.verse)
            : (widget.lang == 'fr' ? 'Psaumes 23:1' : 'Psalms 23:1');
        return Container(
          padding: const EdgeInsets.symmetric(horizontal: Cp.s2, vertical: Cp.s1),
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [Cp.navy, Color(0xFF06101F)],
            ),
            borderRadius: BorderRadius.circular(Cp.radiusTile),
            border: Border.all(color: Cp.gold, width: 1),
            boxShadow: [
              BoxShadow(
                color: Cp.navy.withValues(alpha: 0.2),
                blurRadius: 12,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Row(children: [
            cpMonogram(size: 24),
            const SizedBox(width: 10),
            Expanded(
              child: InkWell(
                onTap: ref == null ? null : () => widget.onOpenChapter(ref.book, ref.chapter),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text('${tr('Verset du jour')} · $label',
                      style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.gold)),
                  // Texte biblique en Lora, 4 nov. 2026, blanc sur
                  // fond bleu nuit, carte 55.
                  Text(text, maxLines: 2, overflow: TextOverflow.ellipsis, style: Ux.bible(size: 14, height: 1.45, color: Colors.white)),
                ]),
              ),
            ),
          ]),
        );
      },
    );
  }
}

// Texte de verset touchable, carte 56, 6 nov. 2026 : même geste
// que la carte Verset du jour et la lecture d'un chapitre, un
// toucher simple ouvre la fiche Sens et origine, un toucher long
// souligne le mot en or, sans inventer ni sens ni numéro Strong.
// Sert les listes de la page Bible, recherche, favoris, versets
// soulignés et reprise de lecture, qui montraient un verset
// complet avec sa référence en texte fixe. Les mots soulignés
// sont lus et écrits dans le même stockage local que le chapitre,
// par référence complète livre, chapitre, verset, donc un mot
// souligné ici se retrouve souligné dans le chapitre, et
// inversement. Le dictionnaire s'ouvre sur l'onglet
// Dictionnaire de la page, sans nouvelle page empilée.
class _TouchableVerseText extends StatefulWidget {
  const _TouchableVerseText({required this.ref, required this.style, required this.lang, this.onOpenDictionary});
  final BibleVerseRef ref;
  final TextStyle style;
  final String lang;
  final void Function(String word)? onOpenDictionary;

  @override
  State<_TouchableVerseText> createState() => _TouchableVerseTextState();
}

class _TouchableVerseTextState extends State<_TouchableVerseText> {
  Set<int> _words = const {};

  @override
  void initState() {
    super.initState();
    _loadWords();
  }

  @override
  void didUpdateWidget(covariant _TouchableVerseText oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.ref.book != widget.ref.book ||
        oldWidget.ref.chapter != widget.ref.chapter ||
        oldWidget.ref.verse != widget.ref.verse ||
        oldWidget.lang != widget.lang) {
      _loadWords();
    }
  }

  Future<void> _loadWords() async {
    final words = await BibleService.instance.verseWordIndexes(widget.lang, widget.ref);
    if (!mounted) return;
    setState(() => _words = words);
  }

  Future<void> _toggleWord(int index) async {
    await BibleService.instance.toggleVerseWord(widget.lang, widget.ref, index);
    await _loadWords();
  }

  @override
  Widget build(BuildContext context) {
    final text = widget.ref.text;
    return ListenableBuilder(
      listenable: textSize,
      builder: (c, _) => verseWordRichText(
        text,
        widget.style,
        _words,
        (i) => showWordSenseSheet(
          context,
          text.split(' ')[i],
          widget.ref,
          widget.lang,
          _words.contains(i),
          i,
          _toggleWord,
          widget.onOpenDictionary == null ? null : () => widget.onOpenDictionary!(verseWordClean(text.split(' ')[i])),
        ),
        _toggleWord,
      ),
    );
  }
}

// Titres de section d'un chapitre, carte 59, 6 nov. 2026 :
// titres de péricopes classiques des éditions Louis Segond et
// King James, par exemple « Création du monde » pour Genèse 1,
// tels que sur la capture d'Axel. Seuls ces chapitres connus
// ont un titre ; les autres n'en montrent aucun, jamais un
// titre inventé. Clé livre:chapitre, livre en index 0..65.
const Map<String, List<String>> kBibleSectionTitles = {
  '0:1': ['Création du monde', 'The Creation'],
  '0:3': ['La chute de l’homme', 'The Fall'],
  '1:20': ['Les dix commandements', 'The Ten Commandments'],
  '18:23': ['L’Éternel est mon berger', 'The Lord Is My Shepherd'],
  '39:5': ['Le sermon sur la montagne', 'The Sermon on the Mount'],
  '42:1': ['La Parole faite chair', 'The Word Became Flesh'],
  '42:3': ['Jésus et Nicodème', 'Jesus and Nicodemus'],
  '43:2': ['La venue du Saint-Esprit', 'The Coming of the Holy Spirit'],
  '45:13': ['L’amour', 'Love'],
  '65:21': ['Un ciel nouveau et une terre nouvelle', 'A New Heaven and a New Earth'],
};

// Carte 103, 8 nov. 2026 : diagnostic du verset de 7 h retiré,
// décision d'Axel, rien ne s'affiche sur la page Bible, ni sur
// le web ni sur l'APK. Une seule demande de notification, à la
// première installation, puis terminé. Le test décisif est le
// vrai test du 9 novembre à 7 h, application fermée.
class BiblePage extends StatefulWidget {
  const BiblePage({super.key, this.initialBook, this.initialChapter, this.scrollController, this.initialTab, this.initialDictQuery});
  final int? initialBook;
  final int? initialChapter;
  final ScrollController? scrollController;
  // Carte 54 : ouvrir la page directement sur l'onglet
  // Dictionnaire, avec une recherche déjà remplie, depuis la
  // fiche Sens et origine d'un mot.
  final String? initialTab;
  final String? initialDictQuery;

  @override
  State<BiblePage> createState() => _BiblePageState();
}

class _BiblePageState extends State<BiblePage> {
  int? _book;
  int? _chapter;
  String _query = '';
  List<BibleHit> _hits = [];
  bool _loaded = false;
  BibleVerseRef? _last;
  List<BibleVerseRef> _favorites = [];
  List<BibleVerseRef> _highlights = [];
  Set<String> _wordHighlights = {};
  // Mots soulignés dans les versets, carte 54 : index du mot par
  // référence de verset, chargés en une seule lecture par chapitre.
  Map<int, Set<int>> _verseWords = {};
  // Résultats du lexique de Strong, cartes 54 et 58 : 8 674
  // entrées en hébreu, 5 523 en grec.
  List<StrongEntry> _strongResults = [];
  bool _strongLoading = false;
  // Résultats du dictionnaire Littré, carte 60 : 75 866
  // vedettes françaises, une lettre chargée à la demande.
  List<LittreEntry> _littreResults = [];
  bool _littreLoading = false;
  // Parcours du Littré par lettre, carte 60 : lettre choisie
  // et ses 200 premières vedettes, sans recherche tapée.
  String _littreLetter = '';
  List<String> _littreBrowse = [];
  final _searchCtrl = TextEditingController();
  final _dictCtrl = TextEditingController();
  String _dictQuery = '';
  // Réorganisation Bible, 30 oct. 2026 : filtre de la liste des
  // livres, par testament et par recherche de nom, pour ne plus
  // défiler 66 livres.
  String _bookTestament = 'tous';
  String _bookQuery = '';
  final _bookSearchCtrl = TextEditingController();
  // Audio du chapitre, synthèse vocale de l'appareil seulement, jamais
  // clonée, comme pour le verset du jour. Voir _toggleChapterAudio.
  bool _speakingChapter = false;
  // Carte 97, 8 nov. 2026 : lecteur MP3 haute qualité embarqué.
  // _hqActive vrai quand c'est le MP3 qui joue, faux quand c'est
  // la voix de l'appareil ; _hqPaused vrai quand le MP3 est en
  // pause. La synthèse vocale n'a pas de pause, seulement Arrêter.
  bool _hqActive = false;
  bool _hqPaused = false;
  // Onglet Bible du modèle web : Lire, Rechercher, Dictionnaire, Favoris.
  String _tab = 'lire';
  // Vitesse de la carte Écouter, carte 56, 6 nov. 2026 : verrouillée
  // à 0,9, sans choix affiché, à la demande d'Axel. Les puces de
  // vitesse et le libellé Vitesse de lecture sont retirés. Le
  // verset du jour garde son débit, 0,5, et le lecteur audio des
  // podcasts, musiques et enseignements, carte 53, garde son
  // propre réglage, 1,0 par défaut, sans partage avec celui-ci.
  double _speechRate = 0.9;
  int? _speakingFrom;
  // Lecture en texte continu et sélection de verset, carte 59,
  // 6 nov. 2026 : verset sélectionné par son numéro, couleurs
  // de surlignage gardées en local par verset, annotations du
  // verset sélectionné, note, étiquette, lien, relation.
  int? _selectedVerse;
  Map<int, Color> _verseColors = {};
  String? _selNote;
  String? _selTag;
  String? _selLink;
  String? _selRelation;

  @override
  void dispose() {
    if (onRequestStopChapterAudio == _stopChapterAudio) onRequestStopChapterAudio = null;
    verseTts.stop();
    unawaited(bibleHqAudio.stop());
    _searchCtrl.dispose();
    _dictCtrl.dispose();
    _bookSearchCtrl.dispose();
    super.dispose();
  }

  void _stopChapterAudio() {
    if (_speakingChapter || _speakingFrom != null) {
      setState(() {
        _speakingChapter = false;
        _speakingFrom = null;
        _hqActive = false;
        _hqPaused = false;
      });
    }
    verseTts.stop();
    unawaited(bibleHqAudio.stop());
  }

  // Pause et reprise du MP3 haute qualité, carte 97. La synthèse
  // vocale n'a pas de pause, seulement Arrêter, donc ce bouton
  // n'apparaît que quand c'est le MP3 qui joue.
  Future<void> _toggleHqPause() async {
    if (!_hqActive || !_speakingChapter) return;
    if (_hqPaused) {
      await bibleHqAudio.resume();
    } else {
      await bibleHqAudio.pause();
    }
    if (mounted) setState(() => _hqPaused = !_hqPaused);
  }

  Future<void> _toggleChapterAudio(List<String> verses, {int from = 0}) async {
    if (_speakingChapter) {
      _stopChapterAudio();
      return;
    }
    if (verses.isEmpty || from >= verses.length) return;
    // Un seul lecteur à la fois, carte 97 : l'enseignement ou
    // l'annonce en cours s'arrête quand l'écoute du chapitre démarre.
    unawaited(app.bgPlayer.stop());
    // Carte 97, 8 nov. 2026 : MP3 haute qualité d'abord, chapitre
    // entier depuis le début seulement, français seulement, Psaume
    // 23 et Jean 3 pour commencer. Si le fichier n'est pas en
    // ligne (404, hors ligne), la lecture échoue proprement et
    // l'appelant garde la voix de l'appareil, jamais un lecteur
    // vide, comme prévu dans lib/audio.dart.
    if (from == 0 && _book != null && _chapter != null) {
      final hqUrl = bibleHqChapterUrl(_book!, _chapter!, app.lang);
      if (hqUrl != null) {
        final hqOk = await bibleHqAudio.playUrl(hqUrl, onDone: () {
          if (mounted) _stopChapterAudio();
        });
        if (hqOk && mounted) {
          setState(() {
            _speakingChapter = true;
            _speakingFrom = 0;
            _hqActive = true;
            _hqPaused = false;
          });
          return;
        }
      }
    }
    setState(() {
      _speakingChapter = true;
      _speakingFrom = from;
      _hqActive = false;
      _hqPaused = false;
    });
    // Texte biblique inchangé, seuls les numéros de verset sont lus
    // avant chaque verset, pour suivre la lecture à l'oreille.
    // Lecture verset par verset : un chapitre entier d'un coup
    // dépasse la limite de la synthèse Android et échoue en silence.
    final label = app.lang == 'en' ? 'Verse' : 'Verset';
    final texts = [for (var i = from; i < verses.length; i++) '$label ${i + 1}. ${verses[i]}'];
    final ok = await verseTts.speakVerses(texts, app.lang, rate: _speechRate);
    if (mounted) {
      // Si _stopChapterAudio a déjà remis le drapeau à false, c'est
      // un arrêt volontaire de l'utilisateur, pas un échec : aucun
      // message d'erreur dans ce cas.
      final stoppedByUser = !_speakingChapter;
      setState(() {
        _speakingChapter = false;
        _speakingFrom = null;
        _hqActive = false;
        _hqPaused = false;
      });
      if (!ok && !stoppedByUser) toast(context, audioFailureMessage());
    }
  }

  @override
  void initState() {
    super.initState();
    // Carte 97 : la page Bible pose sa méthode d'arrêt, pour
    // qu'on puisse arrêter l'audio du chapitre quand on quitte
    // l'onglet ou quand un autre lecteur démarre.
    onRequestStopChapterAudio = _stopChapterAudio;
    // Ouverture directe d'un chapitre, utilisée par le plan de lecture
    // de 21 jours de Mon épanouissement : l'index du livre est le même
    // dans les deux langues (ordre canonique des 66 livres).
    _book = widget.initialBook;
    _chapter = widget.initialChapter;
    if (widget.initialTab != null && ['lire', 'rechercher', 'dictionnaire', 'favoris'].contains(widget.initialTab)) {
      _tab = widget.initialTab!;
    }
    if (widget.initialDictQuery != null && widget.initialDictQuery!.isNotEmpty) {
      _dictQuery = widget.initialDictQuery!;
      _dictCtrl.text = widget.initialDictQuery!;
    }
    // Rappel Bible non lue, 3 nov. 2026 : l'ouverture de la page
    // Bible marque la Bible comme lue ce jour-là, en local
    // seulement, et annule le rappel de 20 h de ce soir, puis
    // reprogramme les jours suivants si le rappel est activé.
    // Téléphone seulement, jamais sur le web. iOS ajouté le 7 nov. 2026.
    if (defaultTargetPlatform == TargetPlatform.android || defaultTargetPlatform == TargetPlatform.iOS) {
      unawaited(DailyVerseNotifications.instance.noteBibleOpened(app.lang, app.bibleNonLueNotif));
    }
    _refresh();
  }

  Future<void> _refresh() async {
    await BibleService.instance.load();
    final last = await BibleService.instance.lastRead(app.lang);
    final favs = await BibleService.instance.favorites(app.lang);
    final hls = await BibleService.instance.highlights(app.lang);
    final whls = await BibleService.instance.wordHighlights();
    if (!mounted) return;
    setState(() {
      _loaded = true;
      _last = last;
      _favorites = favs;
      _highlights = hls;
      _wordHighlights = whls;
    });
    if (_tab == 'dictionnaire' && _dictQuery.isNotEmpty) {
      unawaited(_runStrongSearch());
      unawaited(_runLittreSearch());
    }
    // Favoris et surlignages synchronisés, 31 oct. 2026 : si la
    // synchronisation a ramené des changements, on relit les listes.
    // Sans changement en attente, cet appel ne fait rien.
    unawaited(BibleSync.instance.syncIfNeeded().then((changed) {
      if (changed && mounted) _refresh();
    }));
  }

  void _setLang(String lang) {
    _stopChapterAudio();
    app.setLang(lang);
    setState(() {
      _book = null;
      _chapter = null;
      _query = '';
      _hits = [];
      _searchCtrl.clear();
      _dictQuery = '';
      _dictCtrl.clear();
    });
    _refresh();
  }

  void _openChapter(int book, int chapter) {
    _stopChapterAudio();
    setState(() {
      _book = book;
      _chapter = chapter;
      _query = '';
      _hits = [];
      _selectedVerse = null;
    });
    _loadVerseWords(book, chapter);
    _loadVerseColors(book, chapter);
  }

  // Mots soulignés du chapitre, carte 54 : une seule lecture
  // locale pour tout le chapitre, jamais un appel par verset.
  Future<void> _loadVerseWords(int book, int chapter) async {
    final verses = BibleService.instance.chapterVerses(app.lang, book, chapter);
    final words = await BibleService.instance
        .verseWordIndexesForChapter(app.lang, book, chapter, verses.length);
    if (!mounted || _book != book || _chapter != chapter) return;
    setState(() => _verseWords = words);
  }

  Future<void> _toggleVerseWord(BibleVerseRef r, int index) async {
    await BibleService.instance.toggleVerseWord(app.lang, r, index);
    if (!mounted) return;
    final words = await BibleService.instance.verseWordIndexes(app.lang, r);
    if (!mounted) return;
    setState(() => _verseWords = {..._verseWords, r.verse: words});
  }

  Future<void> _clearVerseWords(BibleVerseRef r) async {
    await BibleService.instance.clearVerseWords(app.lang, r);
    if (!mounted) return;
    setState(() => _verseWords = {..._verseWords, r.verse: <int>{}});
  }

  // Recherche dans le dictionnaire Littré, carte 60 : mot
  // exact en français, avec repli sur le lemme quand le mot
  // touché est une forme fléchie, puis mots qui commencent
  // par la recherche, 50 résultats au plus.
  Future<void> _runLittreSearch() async {
    final q = _dictQuery.trim();
    if (q.isEmpty) {
      if (mounted) {
        setState(() {
          _littreResults = [];
          _littreBrowse = [];
          _littreLetter = '';
        });
      }
      return;
    }
    setState(() => _littreLoading = true);
    final results = await LittreLexicon.instance.search(q);
    if (!mounted || _dictQuery.trim() != q) return;
    setState(() {
      _littreResults = results;
      _littreLoading = false;
    });
  }

  // Parcours du Littré par lettre, carte 60.
  Future<void> _browseLittre(String letter) async {
    final heads = await LittreLexicon.instance.browseHeads(letter);
    if (!mounted) return;
    setState(() {
      _littreLetter = letter;
      _littreBrowse = heads;
    });
  }

  // Recherche dans le lexique de Strong, carte 54 : par numéro
  // Strong, translittération ou mot anglais, 50 résultats au plus.
  Future<void> _runStrongSearch() async {
    final q = _dictQuery.trim();
    if (q.isEmpty) {
      if (mounted) setState(() => _strongResults = []);
      return;
    }
    setState(() => _strongLoading = true);
    final results = await StrongLexicon.instance.search(q);
    if (!mounted || _dictQuery.trim() != q) return;
    setState(() {
      _strongResults = results;
      _strongLoading = false;
    });
  }

  void _backToBook() {
    _stopChapterAudio();
    setState(() => _chapter = null);
  }

  void _backToBooks() {
    _stopChapterAudio();
    setState(() => _book = null);
  }

  void _openHit(BibleHit h) {
    _openChapter(h.book, h.chapter);
  }

  // Recherche Bible, 27 oct. 2026 : avant, seul l'appui sur la touche
  // de recherche du clavier lançait la recherche, l'icône loupe ne
  // faisait rien et aucun bouton n'existait, donc sur téléphone la
  // recherche semblait ne pas fonctionner. Le bouton ci-dessous
  // lance exactement la même recherche que la touche clavier.
  void _runSearch() {
    final q = _searchCtrl.text.trim();
    setState(() {
      _query = q;
      _hits = q.isEmpty ? [] : BibleService.instance.search(app.lang, q);
    });
  }

  // Dictionnaire depuis la fiche Sens et origine d'un verset de
  // liste, carte 56 : la page reste la même, seul l'onglet
  // change, avec la recherche déjà remplie, comme depuis le
  // chapitre. Aucune page Bible n'est empilée par-dessus.
  void _openDictionaryForWord(String word) {
    setState(() {
      _tab = 'dictionnaire';
      _dictQuery = word;
      _dictCtrl.text = word;
    });
    unawaited(_runStrongSearch());
    unawaited(_runLittreSearch());
  }

  Future<void> _toggleFav(BibleVerseRef r) async {
    await BibleService.instance.toggleFavorite(app.lang, r);
    final favs = await BibleService.instance.favorites(app.lang);
    if (!mounted) return;
    setState(() => _favorites = favs);
    final removed = !_favorites.any((f) => f.book == r.book && f.chapter == r.chapter && f.verse == r.verse);
    unawaited(BibleSync.instance.noteFavoriteChanged(app.lang, r, removed));
  }

  bool _isFav(BibleVerseRef r) =>
      _favorites.any((f) => f.book == r.book && f.chapter == r.chapter && f.verse == r.verse);

  // Soulignement, 27 oct. 2026 : un verset ou un mot du dictionnaire
  // qui intéresse la personne se souligne d'un trait or, et reste
  // souligné après fermeture, synchronisé au compte pour le membre
  // connecté depuis le 31 oct. 2026, comme les favoris. Un nouvel
  // appui enlève le soulignement.
  Future<void> _toggleHighlight(BibleVerseRef r) async {
    await BibleService.instance.toggleHighlight(app.lang, r);
    final hls = await BibleService.instance.highlights(app.lang);
    if (!mounted) return;
    setState(() => _highlights = hls);
    final removed = !_highlights.any((f) => f.book == r.book && f.chapter == r.chapter && f.verse == r.verse);
    unawaited(BibleSync.instance.noteHighlightChanged(app.lang, r, removed));
  }

  bool _isHighlighted(BibleVerseRef r) =>
      _highlights.any((f) => f.book == r.book && f.chapter == r.chapter && f.verse == r.verse);

  Future<void> _toggleWordHighlight(DictEntry e) async {
    await BibleService.instance.toggleWordHighlight('${e.french}|${e.strong}');
    final whls = await BibleService.instance.wordHighlights();
    if (!mounted) return;
    setState(() => _wordHighlights = whls);
  }

  bool _isWordHighlighted(DictEntry e) => _wordHighlights.contains('${e.french}|${e.strong}');

  Future<void> _markRead(BibleVerseRef r) async {
    await BibleService.instance.saveLastRead(app.lang, r);
    if (!mounted) return;
    setState(() => _last = r);
  }

  // Carte de verset en liste, carte 56 : la référence et le
  // chevron ouvrent le chapitre, le texte du verset est touchable
  // mot à mot, sans que les deux gestes se confondent, le texte
  // n'étant pas dans la zone du toucher qui ouvre le chapitre.
  // Sert la recherche, les favoris, les versets soulignés et la
  // reprise de lecture. Le texte reste en Lora, plus grand et
  // plus aéré qu'avant, 16 et hauteur 1,6, sans rien couper.
  Widget _verseListCard(BibleVerseRef ref, VoidCallback onOpen, {IconData? leadingIcon, TextStyle? textStyle}) {
    final style = textStyle ?? Ux.bible(size: 16, height: 1.6, color: Cp.ink);
    return Card(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(Cp.s2, Cp.s1, Cp.s2, Cp.s1),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          InkWell(
            onTap: onOpen,
            borderRadius: BorderRadius.circular(8),
            child: Row(children: [
              if (leadingIcon != null) ...[Icon(leadingIcon, color: Cp.goldDeep), const SizedBox(width: Cp.s1)],
              Expanded(
                  child: Text(BibleService.instance.label(app.lang, ref.book, ref.chapter, ref.verse),
                      style: const TextStyle(fontWeight: FontWeight.w700))),
              const Icon(Icons.chevron_right_outlined),
            ]),
          ),
          const SizedBox(height: 6),
          _TouchableVerseText(ref: ref, style: style, lang: app.lang, onOpenDictionary: _openDictionaryForWord),
        ]),
      ),
    );
  }

  // Recherche de livre sans accent, 30 oct. 2026 : « genese »
  // trouve « Genèse ».
  String _normBookQuery(String s) {
    const map = {'à': 'a', 'â': 'a', 'ä': 'a', 'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e', 'î': 'i', 'ï': 'i', 'ô': 'o', 'ö': 'o', 'ù': 'u', 'û': 'u', 'ü': 'u', 'ç': 'c', 'ÿ': 'y', 'æ': 'ae', 'œ': 'oe'};
    var out = s.toLowerCase();
    map.forEach((k, v) => out = out.replaceAll(k, v));
    return out;
  }

  // Sélecteurs Livre et Chapitre du modèle web, en haut de
  // l'onglet Lire. Changer de livre réinitialise le chapitre et
  // arrête la lecture ; changer de chapitre arrête aussi la lecture.
  // Réorganisation, 30 oct. 2026 : les sélecteurs ne sont jamais
  // vides, ils montrent le dernier livre lu, ou Genèse au premier
  // usage, avec le chapitre lu, ou le chapitre 1. La sélection
  // affichée par défaut ne change pas la page : choisir un livre
  // ou un chapitre navigue comme avant.
  int _defaultBook(List<BibleBook> books) {
    if (books.isEmpty) return 0;
    final b = _last?.book ?? 0;
    return (b >= 0 && b < books.length) ? b : 0;
  }

  int _defaultChapter(List<BibleBook> books) {
    if (books.isEmpty) return 1;
    final b = _defaultBook(books);
    final count = books[b].chapters.length;
    final c = _last?.chapter ?? 1;
    return (c >= 1 && c <= count) ? c : 1;
  }

  List<Widget> _bookSelectors(List<BibleBook> books) {
    final displayBook = _book ?? _defaultBook(books);
    final chapterCount = books.isEmpty ? 0 : books[displayBook].chapters.length;
    var displayChapter = _chapter ?? _defaultChapter(books);
    if (chapterCount > 0 && displayChapter > chapterCount) displayChapter = chapterCount;
    if (displayChapter < 1) displayChapter = 1;
    return [
      Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Expanded(
          child: DropdownButtonFormField<int>(
            value: books.isEmpty ? null : displayBook,
            hint: Text(tr('Livre')),
            items: [for (var i = 0; i < books.length; i++) DropdownMenuItem(value: i, child: Text(books[i].name, overflow: TextOverflow.ellipsis))],
            onChanged: (v) {
              _stopChapterAudio();
              setState(() {
                _book = v;
                _chapter = null;
              });
            },
            decoration: InputDecoration(
              labelText: tr('Livre'),
              filled: true,
              fillColor: Cp.card,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
              focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile), borderSide: const BorderSide(color: Cp.navy, width: 1.5)),
            ),
          ),
        ),
        const SizedBox(width: Cp.s1),
        SizedBox(
          width: 132,
          child: DropdownButtonFormField<int>(
            value: books.isEmpty ? null : displayChapter,
            hint: Text(tr('Chapitre')),
            items: [for (var c = 1; c <= chapterCount; c++) DropdownMenuItem(value: c, child: Text(isEn ? 'Chapter $c' : 'Chapitre $c'))],
            onChanged: books.isEmpty
                ? null
                : (v) {
                    _stopChapterAudio();
                    setState(() {
                      if (_book == null) _book = displayBook;
                      _chapter = v;
                    });
                  },
            decoration: InputDecoration(
              labelText: tr('Chapitre'),
              filled: true,
              fillColor: Cp.card,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
              focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile), borderSide: const BorderSide(color: Cp.navy, width: 1.5)),
            ),
          ),
        ),
      ]),
      const SizedBox(height: Cp.s2),
    ];
  }

  // Aides de la refonte Bible, 29 oct. 2026 : mêmes données et
  // mêmes gestes qu'avant, seule la présentation change. Palette
  // inchangée, aucun texte biblique modifié.
  Widget _bibleLangPill(String lang, String label) {
    final selected = app.lang == lang;
    return SizedBox(
      height: 48,
      child: OutlinedButton(
        onPressed: () => _setLang(lang),
        style: OutlinedButton.styleFrom(
          backgroundColor: selected ? Cp.gold : Colors.transparent,
          foregroundColor: selected ? Cp.navy : Colors.white,
          side: BorderSide(color: selected ? Cp.gold : Colors.white54, width: 1.5),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
        ),
        child: Text(label, maxLines: 1, overflow: TextOverflow.ellipsis, softWrap: false, style: const TextStyle(fontWeight: FontWeight.w800)),
      ),
    );
  }

  Widget _bibleSectionHeader(String title, int count) {
    return Padding(
      padding: const EdgeInsets.only(top: Cp.s1, bottom: Cp.s1),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Expanded(child: Text(title, style: const TextStyle(fontSize: 19, fontWeight: FontWeight.w800, color: Cp.navy))),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(color: Cp.gold, borderRadius: BorderRadius.circular(20)),
            child: Text('$count', style: const TextStyle(fontWeight: FontWeight.w800, color: Cp.navy, fontSize: 13)),
          ),
          const SizedBox(width: 6),
          const Icon(Icons.chevron_right_outlined, color: Cp.goldDeep),
        ]),
        const SizedBox(height: 6),
        Container(width: 44, height: 4, decoration: BoxDecoration(color: Cp.gold, borderRadius: BorderRadius.circular(2))),
      ]),
    );
  }

  Widget _bibleBookTile(int index, String name, int chapters, VoidCallback onTap) {
    return Card(
      margin: const EdgeInsets.only(bottom: Cp.s1),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: Cp.s2, vertical: 4),
        leading: Container(
          width: 40,
          height: 40,
          alignment: Alignment.center,
          decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(12)),
          child: Text('${index + 1}', style: const TextStyle(color: Cp.gold, fontWeight: FontWeight.w800, fontSize: 14)),
        ),
        title: Text(name, style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: Cp.navy)),
        subtitle: Text(isEn ? '$chapters chapters' : '$chapters chapitres', style: const TextStyle(color: Cp.inkMuted)),
        trailing: const Icon(Icons.chevron_right_outlined, color: Cp.goldDeep, size: 20),
        onTap: onTap,
      ),
    );
  }

  // Titre de section d'un chapitre, carte 59 : seulement
  // quand il est connu, voir kBibleSectionTitles, jamais inventé.
  String? _sectionTitle(int book, int chapter) {
    final pair = kBibleSectionTitles['$book:$chapter'];
    if (pair == null) return null;
    return app.lang == 'en' ? pair[1] : pair[0];
  }

  // Couleurs de surlignage du chapitre, carte 59, en une seule
  // lecture locale, comme les mots soulignés.
  Future<void> _loadVerseColors(int book, int chapter) async {
    final verses = BibleService.instance.chapterVerses(app.lang, book, chapter);
    final colors = await BibleService.instance.verseColorsForChapter(app.lang, book, chapter, verses.length);
    if (!mounted || _book != book || _chapter != chapter) return;
    setState(() => _verseColors = colors);
  }

  Future<void> _setVerseColor(BibleVerseRef ref, Color? color) async {
    await BibleService.instance.setVerseColor(app.lang, ref, color);
    if (!mounted) return;
    final verses = BibleService.instance.chapterVerses(app.lang, ref.book, ref.chapter);
    final colors = await BibleService.instance.verseColorsForChapter(app.lang, ref.book, ref.chapter, verses.length);
    if (!mounted) return;
    setState(() => _verseColors = colors);
  }

  // Lecture en texte continu, carte 59, 6 nov. 2026 : un seul
  // bloc de texte, pas une carte par verset, pas de bordure par
  // verset. Les numéros sont petits, en ligne dans le texte, en
  // or, et le toucher sur un numéro sélectionne le verset et
  // ouvre son panneau. Les mots restent touchables, toucher
  // simple fiche Sens et origine, toucher long soulignement or,
  // comme avant, dans le même flux, sans casser la lecture.
  Widget _chapterContinuousText(List<String> verses) {
    return ListenableBuilder(
      listenable: textSize,
      builder: (c, _) {
        final base = Ux.bible(size: 18, height: 1.7, color: Cp.ink);
        final spans = <InlineSpan>[];
        for (var i = 0; i < verses.length; i++) {
          final ref = BibleVerseRef(_book!, _chapter!, i + 1, verses[i]);
          final words = _verseWords[ref.verse] ?? <int>{};
          final hl = _isHighlighted(ref);
          final color = _verseColors[ref.verse];
          final selected = _selectedVerse == ref.verse;
          final bg = selected
              ? (color ?? const Color(0xFF2F80ED)).withValues(alpha: 0.30)
              : (color == null ? null : color.withValues(alpha: 0.22));
          final wordHl = hl ? {for (var k = 0; k < verses[i].split(' ').length; k++) k} : words;
          spans.add(TextSpan(
            text: '${ref.verse} ',
            style: base.copyWith(fontSize: 12, fontWeight: FontWeight.w800, color: Cp.goldDeep, backgroundColor: bg),
            recognizer: VerseSelectGesture(onSelect: () => _selectVerse(ref, verses)),
          ));
          spans.addAll(verseWordSpans(
            verses[i],
            base,
            wordHl,
            (index) => showWordSenseSheet(
              context,
              verses[i].split(' ')[index],
              ref,
              app.lang,
              words.contains(index),
              index,
              (idx) => _toggleVerseWord(ref, idx),
              () => go(context, BiblePage(initialTab: 'dictionnaire', initialDictQuery: verseWordClean(verses[i].split(' ')[index]))),
            ),
            (index) => _toggleVerseWord(ref, index),
            background: bg,
          ));
          spans.add(const TextSpan(text: '  '));
        }
        return Container(
          width: double.infinity,
          padding: const EdgeInsets.fromLTRB(24, 24, 24, 28),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Cp.line),
          ),
          child: RichText(text: TextSpan(style: base, children: spans)),
        );
      },
    );
  }

  // Sélection d'un verset, carte 59 : le verset se surligne
  // dans le texte continu, puis son panneau s'ouvre en bas.
  // Quand le panneau se referme, la sélection se retire, le
  // surlignage de couleur choisi, lui, reste gardé en local.
  Future<void> _selectVerse(BibleVerseRef ref, List<String> verses) async {
    await _markRead(ref);
    final note = await BibleService.instance.verseNote(app.lang, ref);
    final tag = await BibleService.instance.verseTag(app.lang, ref);
    final link = await BibleService.instance.verseLink(app.lang, ref);
    final relation = await BibleService.instance.verseRelation(app.lang, ref);
    if (!mounted) return;
    setState(() {
      _selectedVerse = ref.verse;
      _selNote = note;
      _selTag = tag;
      _selLink = link;
      _selRelation = relation;
    });
    await _showVersePanel(ref, verses);
    if (mounted) setState(() => _selectedVerse = null);
  }

  // Référence tapée par le membre, par exemple Jean 3:16, carte
  // 59 : nom complet du livre, sans accent, puis chapitre:verset.
  // Rien n'est deviné, une référence inconnue ne se garde pas.
  BibleVerseRef? _parseRef(String input) {
    final m = RegExp(r'^(.+?)\s+(\d+)\s*:\s*(\d+)\s*$').firstMatch(input.trim());
    if (m == null) return null;
    final name = _normBookQuery(m.group(1)!);
    final books = BibleService.instance.books(app.lang);
    for (var i = 0; i < books.length; i++) {
      if (_normBookQuery(books[i].name) != name) continue;
      final ch = int.parse(m.group(2)!);
      final v = int.parse(m.group(3)!);
      final text = BibleService.instance.verseText(app.lang, i, ch, v);
      if (text == null || text.isEmpty) return null;
      return BibleVerseRef(i, ch, v, text);
    }
    return null;
  }

  // Petite boîte de saisie pour une annotation, carte 59 :
  // renvoie le texte à garder, '' pour supprimer, null pour
  // annuler sans rien changer.
  Future<String?> _askVerseText(String title, String? current, String hint, {int maxLines = 1}) async {
    final ctrl = TextEditingController(text: current ?? '');
    final action = await showDialog<String>(
      context: context,
      builder: (c) => AlertDialog(
        title: Text(title),
        content: TextField(
          controller: ctrl,
          maxLines: maxLines,
          decoration: InputDecoration(hintText: hint),
        ),
        actions: [
          if ((current ?? '').isNotEmpty)
            TextButton(onPressed: () => Navigator.of(c).pop('delete'), child: Text(tr('Supprimer'))),
          TextButton(onPressed: () => Navigator.of(c).pop(), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.of(c).pop('save'), child: Text(tr('Enregistrer'))),
        ],
      ),
    );
    if (action == 'save') return ctrl.text;
    if (action == 'delete') return '';
    return null;
  }

  Future<void> _editVerseNote(BibleVerseRef ref) async {
    final value = await _askVerseText(tr('Note sur le verset'), _selNote, tr('Écrivez votre note…'), maxLines: 4);
    if (value == null || !mounted) return;
    await BibleService.instance.saveVerseNote(app.lang, ref, value);
    final note = await BibleService.instance.verseNote(app.lang, ref);
    if (!mounted) return;
    setState(() => _selNote = note);
  }

  Future<void> _editVerseTag(BibleVerseRef ref) async {
    final value = await _askVerseText(tr('Étiquette'), _selTag, tr('Par exemple : promesse, prière, famille'));
    if (value == null || !mounted) return;
    await BibleService.instance.saveVerseTag(app.lang, ref, value);
    final tag = await BibleService.instance.verseTag(app.lang, ref);
    if (!mounted) return;
    setState(() => _selTag = tag);
  }

  Future<void> _editVerseLink(BibleVerseRef ref) async {
    final value = await _askVerseText(tr('Lien vers un verset'), _selLink, tr('Par exemple : Jean 3:16'));
    if (value == null || !mounted) return;
    if (value.isNotEmpty && _parseRef(value) == null) {
      if (mounted) toast(context, tr('Référence non reconnue, par exemple Jean 3:16.'));
      return;
    }
    await BibleService.instance.saveVerseLink(app.lang, ref, value);
    final link = await BibleService.instance.verseLink(app.lang, ref);
    if (!mounted) return;
    setState(() => _selLink = link);
  }

  // Relation entre deux versets, carte 59 : la cible est une
  // référence, le type est choisi parmi Parallèle, Accomplissement,
  // Contraste et Suite, la relation se garde en local seulement.
  Future<void> _editVerseRelation(BibleVerseRef ref) async {
    final current = _selRelation ?? '';
    var currentType = 'Parallèle';
    var currentTarget = '';
    if (current.contains(' :: ')) {
      final parts = current.split(' :: ');
      currentType = parts[0];
      currentTarget = parts.sublist(1).join(' :: ');
    }
    final ctrl = TextEditingController(text: currentTarget);
    var type = currentType;
    const types = ['Parallèle', 'Accomplissement', 'Contraste', 'Suite'];
    final action = await showDialog<String>(
      context: context,
      builder: (c) => StatefulBuilder(
        builder: (c, setDialog) => AlertDialog(
          title: Text(tr('Relation avec un autre verset')),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  for (final t in types)
                    ChoiceChip(
                      label: Text(t),
                      selected: type == t,
                      onSelected: (_) => setDialog(() => type = t),
                    ),
                ],
              ),
              const SizedBox(height: 12),
              TextField(
                controller: ctrl,
                decoration: InputDecoration(hintText: tr('Par exemple : Jean 3:16')),
              ),
            ],
          ),
          actions: [
            if (current.isNotEmpty)
              TextButton(onPressed: () => Navigator.of(c).pop('delete'), child: Text(tr('Supprimer'))),
            TextButton(onPressed: () => Navigator.of(c).pop(), child: Text(tr('Annuler'))),
            FilledButton(onPressed: () => Navigator.of(c).pop('save'), child: Text(tr('Enregistrer'))),
          ],
        ),
      ),
    );
    if (action == null || !mounted) return;
    if (action == 'delete') {
      await BibleService.instance.saveVerseRelation(app.lang, ref, '');
    } else if (action == 'save') {
      if (ctrl.text.trim().isEmpty) {
        await BibleService.instance.saveVerseRelation(app.lang, ref, '');
      } else if (_parseRef(ctrl.text) == null) {
        if (mounted) toast(context, tr('Référence non reconnue, par exemple Jean 3:16.'));
        return;
      } else {
        await BibleService.instance.saveVerseRelation(app.lang, ref, '$type :: ${ctrl.text.trim()}');
      }
    }
    final relation = await BibleService.instance.verseRelation(app.lang, ref);
    if (!mounted) return;
    setState(() => _selRelation = relation);
  }

  // Panneau du verset sélectionné, carte 59, 6 nov. 2026, d'après
  // le bas de la capture d'Axel : 5 couleurs de surlignage,
  // turquoise, rouge, jaune, bleu, gris, plus une flèche pour
  // plus de couleurs, or, vert, violet, orange, et Aucune pour
  // retirer la couleur ; 6 actions, Note, Étiquette, Lien,
  // Relation, Marque-page, Vers étude ; 3 boutons en bas,
  // Annoter, Étudier, Partager. Les gestes déjà là sont repris,
  // pas doublés : Marque-page est le favori, Étudier ouvre le
  // dictionnaire et le lexique de Strong, Partager partage le
  // verset, Annoter ouvre la même note que l'action Note, comme
  // sur la capture. Écouter à partir de ce verset, Souligner ce
  // verset et Copier restent dans une rangée au-dessus, ce sont
  // les gestes par verset d'avant, déplacés ici puisque la carte
  // par verset n'existe plus.
  Future<void> _showVersePanel(BibleVerseRef ref, List<String> verses) async {
    final label = BibleService.instance.label(app.lang, ref.book, ref.chapter, ref.verse);
    const colors = <Color>[
      Color(0xFF1FB6A6),
      Color(0xFFE05252),
      Color(0xFFF2C94C),
      Color(0xFF2F80ED),
      Color(0xFF9AA5B1),
    ];
    const moreColors = <Color>[
      Color(0xFFD4A72C),
      Color(0xFF27AE60),
      Color(0xFF9B51E0),
      Color(0xFFF2994A),
    ];
    await showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (c) {
        Color? chosen = _verseColors[ref.verse];
        bool showMore = false;
        return StatefulBuilder(builder: (c, setPanel) {
          final t = Theme.of(c).textTheme;
          final favNow = _isFav(ref);
          final hlNow = _isHighlighted(ref);
          Widget colorDot(Color col) {
            final isChosen = chosen == col;
            return GestureDetector(
              onTap: () async {
                final next = isChosen ? null : col;
                setPanel(() => chosen = next);
                await _setVerseColor(ref, next);
              },
              child: Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  color: col,
                  shape: BoxShape.circle,
                  border: isChosen ? Border.all(color: Cp.navy, width: 3) : Border.all(color: Colors.white, width: 2),
                  boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.15), blurRadius: 4, offset: const Offset(0, 2))],
                ),
                child: isChosen ? const Icon(Icons.check, color: Colors.white, size: 20) : null,
              ),
            );
          }

          Widget panelAction(IconData icon, String text, VoidCallback onTap, {bool active = false}) {
            return InkWell(
              onTap: onTap,
              borderRadius: BorderRadius.circular(12),
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 10),
                child: Column(children: [
                  Icon(icon, color: active ? Cp.goldDeep : Cp.navy, size: 26),
                  const SizedBox(height: 4),
                  Text(text,
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: active ? Cp.goldDeep : Cp.navy)),
                ]),
              ),
            );
          }

          void openDictionaryTab() {
            Navigator.of(c).pop();
            setState(() {
              _tab = 'dictionnaire';
              _dictQuery = '';
              _dictCtrl.clear();
            });
          }

          return Padding(
            padding: EdgeInsets.fromLTRB(20, 12, 20, 24 + MediaQuery.of(c).viewInsets.bottom),
            child: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: Cp.line, borderRadius: BorderRadius.circular(2)))),
                  const SizedBox(height: 12),
                  Text(label, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.goldDeep)),
                  const SizedBox(height: 4),
                  Text(ref.text, maxLines: 3, overflow: TextOverflow.ellipsis, style: Ux.bible(size: 15, height: 1.5, color: Cp.ink)),
                  const SizedBox(height: 12),
                  Text(tr('Surlignage'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
                  const SizedBox(height: 8),
                  Row(children: [
                    for (final col in colors) ...[colorDot(col), const SizedBox(width: 10)],
                    IconButton(
                      tooltip: tr('Plus de couleurs'),
                      onPressed: () => setPanel(() => showMore = !showMore),
                      icon: Icon(showMore ? Icons.keyboard_arrow_up_outlined : Icons.keyboard_arrow_right_outlined, color: Cp.navy),
                    ),
                    if (chosen != null)
                      TextButton(
                        onPressed: () async {
                          setPanel(() => chosen = null);
                          await _setVerseColor(ref, null);
                        },
                        child: Text(tr('Aucune')),
                      ),
                  ]),
                  if (showMore) ...[
                    const SizedBox(height: 8),
                    Row(children: [
                      for (final col in moreColors) ...[colorDot(col), const SizedBox(width: 10)],
                    ]),
                  ],
                  if (_selTag != null || _selLink != null || _selRelation != null || _selNote != null) ...[
                    const SizedBox(height: 8),
                    if (_selTag != null) Text('${tr('Étiquette')} : $_selTag', style: t.bodyMedium),
                    if (_selLink != null)
                      InkWell(
                        onTap: () {
                          final target = _parseRef(_selLink!);
                          if (target == null) return;
                          Navigator.of(c).pop();
                          _openChapter(target.book, target.chapter);
                        },
                        child: Text('${tr('Lien')} : $_selLink', style: t.bodyMedium?.copyWith(color: Cp.goldDeep, fontWeight: FontWeight.w700)),
                      ),
                    if (_selRelation != null) Text('${tr('Relation')} : $_selRelation', style: t.bodyMedium),
                    if (_selNote != null)
                      Text('${tr('Note')} : $_selNote',
                          maxLines: 2, overflow: TextOverflow.ellipsis, style: t.bodyMedium),
                  ],
                  const SizedBox(height: 12),
                  GridView.count(
                    crossAxisCount: 3,
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    children: [
                      panelAction(Icons.edit_note_outlined, tr('Note'), () async {
                        Navigator.of(c).pop();
                        await _editVerseNote(ref);
                      }, active: _selNote != null),
                      panelAction(Icons.label_outline, tr('Étiquette'), () async {
                        Navigator.of(c).pop();
                        await _editVerseTag(ref);
                      }, active: _selTag != null),
                      panelAction(Icons.link_outlined, tr('Lien'), () async {
                        Navigator.of(c).pop();
                        await _editVerseLink(ref);
                      }, active: _selLink != null),
                      panelAction(Icons.hub_outlined, tr('Relation'), () async {
                        Navigator.of(c).pop();
                        await _editVerseRelation(ref);
                      }, active: _selRelation != null),
                      panelAction(favNow ? Icons.bookmark_outlined : Icons.bookmark_border_outlined, tr('Marque-page'), () async {
                        await _toggleFav(ref);
                        setPanel(() {});
                      }, active: favNow),
                      panelAction(Icons.school_outlined, tr('Vers étude'), openDictionaryTab),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                    IconButton(
                      tooltip: tr('Écouter à partir de ce verset'),
                      icon: Icon(_speakingChapter && _speakingFrom == ref.verse - 1 ? Icons.stop_outlined : Icons.volume_up_outlined),
                      onPressed: () {
                        Navigator.of(c).pop();
                        _toggleChapterAudio(verses, from: ref.verse - 1);
                      },
                    ),
                    IconButton(
                      tooltip: tr('Souligner ce verset'),
                      icon: Icon(Icons.format_underline_outlined, color: hlNow ? Cp.goldDeep : null),
                      onPressed: () async {
                        await _toggleHighlight(ref);
                        setPanel(() {});
                      },
                    ),
                    IconButton(
                      tooltip: tr('Copier'),
                      icon: const Icon(Icons.copy_outlined),
                      onPressed: () async {
                        await Clipboard.setData(ClipboardData(text: '${ref.text}\n$label'));
                        if (context.mounted) toast(context, tr('Verset copié'));
                      },
                    ),
                  ]),
                  const SizedBox(height: 8),
                  Row(children: [
                    Expanded(
                      child: FilledButton(
                        onPressed: () async {
                          Navigator.of(c).pop();
                          await _editVerseNote(ref);
                        },
                        child: Text(tr('Annoter')),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: OutlinedButton(
                        onPressed: openDictionaryTab,
                        child: Text(tr('Étudier')),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: OutlinedButton.icon(
                        onPressed: () => Share.share('${ref.text}\n$label'),
                        icon: const Icon(Icons.share_outlined),
                        label: Text(tr('Partager')),
                      ),
                    ),
                  ]),
                ],
              ),
            ),
          );
        });
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final svc = BibleService.instance;
    final books = svc.books(app.lang);
    final children = <Widget>[
      // En-tête Bible, refonte 29 oct. 2026 : carte bleu nuit,
      // titre blanc, choix de version en pastilles or. Même
      // contenu et mêmes gestes qu'avant, seul le design change.
      Container(
        width: double.infinity,
        padding: const EdgeInsets.all(Cp.s2),
        decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(20)),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(color: Cp.gold, borderRadius: BorderRadius.circular(14)),
              child: const Icon(Icons.menu_book_outlined, color: Cp.navy),
            ),
            const SizedBox(width: Cp.s1),
            Expanded(
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(tr('Bible'), style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.w800, height: 1.1)),
                Text(isEn ? 'Old and New Testaments' : 'Ancien et Nouveau Testaments', style: const TextStyle(color: Colors.white70, fontSize: 13)),
              ]),
            ),
          ]),
          const SizedBox(height: Cp.s2),
          Row(children: [
            Expanded(child: _bibleLangPill('fr', 'Louis Segond')),
            const SizedBox(width: Cp.s1),
            Expanded(child: _bibleLangPill('en', 'King James')),
          ]),
        ]),
      ),
      const SizedBox(height: Cp.s2),
      // Onglets du modèle web : Lire, Rechercher, Dictionnaire, Favoris.
      // Ils remplacent l'ancienne page Bible à simple liste de livres.
      // Barre des sous-onglets, refonte 29 oct. 2026 : pastilles
      // défilantes, pastille active bleu nuit, pour ne jamais
      // déborder sur petit écran.
      SizedBox(
        height: 46,
        child: ListView(
          scrollDirection: Axis.horizontal,
          children: [
            for (final tab in const ['lire', 'rechercher', 'dictionnaire', 'favoris'])
              Padding(
                padding: const EdgeInsets.only(right: Cp.s1),
                child: ChoiceChip(
                  label: Text(tab == 'lire' ? tr('Lire') : tab == 'rechercher' ? tr('Rechercher') : tab == 'dictionnaire' ? tr('Dictionnaire') : tr('Favoris')),
                  selected: _tab == tab,
                  onSelected: (_) {
                    _stopChapterAudio();
                    setState(() => _tab = tab);
                  },
                  labelStyle: TextStyle(fontWeight: FontWeight.w800, color: _tab == tab ? Colors.white : Cp.navy),
                  selectedColor: Cp.navy,
                  backgroundColor: Cp.card,
                  side: BorderSide(color: _tab == tab ? Cp.navy : Cp.line),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(23)),
                ),
              ),
          ],
        ),
      ),
      const SizedBox(height: Cp.s3),
    ];

    if (!_loaded) {
      children.add(EmptyNote(icon: Icons.auto_stories_outlined, text: tr('Chargement de la Bible…')));
    } else if (books.isEmpty) {
      // Bible non chargée : avant, l'écran restait vide et la
      // recherche rendait 0 résultat sans explication. Le message
      // dit maintenant ce qui manque et propose de réessayer.
      children.add(EmptyNote(
        icon: Icons.menu_book_outlined,
        text: isEn ? 'The Bible text did not load on this device. Check that the app is fully installed, then try again.' : 'Le texte de la Bible n’a pas chargé sur cet appareil. Vérifiez que l’application est bien installée en entier, puis réessayez.',
        action: OutlinedButton(
          onPressed: () {
            setState(() => _loaded = false);
            _refresh();
          },
          child: Text(tr('Réessayer')),
        ),
      ));
    } else if (_tab == 'dictionnaire') {
      children.add(TextField(
        controller: _dictCtrl,
        textInputAction: TextInputAction.search,
        onChanged: (q) {
          setState(() => _dictQuery = q.trim());
          unawaited(_runStrongSearch());
          unawaited(_runLittreSearch());
        },
        decoration: InputDecoration(
          hintText: isEn ? 'Search a word, in French, Hebrew or Greek, or a Strong number…' : 'Rechercher un mot, en français, en hébreu ou en grec, ou un numéro Strong…',
          prefixIcon: const Icon(Icons.search_outlined, color: Cp.goldDeep),
          focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile), borderSide: const BorderSide(color: Cp.navy, width: 1.5)),
          suffixIcon: _dictQuery.isEmpty
              ? null
              : IconButton(
                  icon: const Icon(Icons.clear_outlined),
                  onPressed: () => setState(() {
                    _dictQuery = '';
                    _dictCtrl.clear();
                  }),
                ),
          filled: true,
          fillColor: Cp.card,
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
        ),
      ));
      children.add(const SizedBox(height: Cp.s1));
      children.add(Text(isEn ? '36 essential words, plus one key word per book, in Hebrew and Greek, with Strong number.' : '36 mots essentiels, plus un mot clé par livre, en hébreu et en grec, avec numéro Strong.', style: t.bodyMedium));
      children.add(const SizedBox(height: 4));
      children.add(Text(
        tr('Plus 8 674 entrées du lexique de Strong en hébreu (H1-H8674) et 5 523 en grec (G1-G5624), en anglais, cherchez par numéro Strong, par exemple H7965 ou G26.'),
        style: t.bodyMedium?.copyWith(color: Cp.inkMuted),
      ));
      children.add(Text(
        tr('Plus 75 866 mots du dictionnaire Littré, en français, cherchez un mot ou parcourez par lettre, sans connexion une fois la lettre chargée.'),
        style: t.bodyMedium?.copyWith(color: Cp.inkMuted),
      ));
      children.add(Text(
        tr('Lexique de Strong en hébreu, H1 à H8674, James Strong, 1894, édition Open Scriptures, 2010.'),
        style: t.bodySmall?.copyWith(color: Cp.inkMuted),
      ));
      children.add(Text(
        tr('Lexique de Strong en grec, G1 à G5624, 5 523 entrées, James Strong, 1890, édition Open Scriptures, 2009.'),
        style: t.bodySmall?.copyWith(color: Cp.inkMuted),
      ));
      children.add(Text(
        tr('Dictionnaire Littré, Émile Littré, 1863-1872, texte domaine public, numérisation François Gannaz, CC-BY-SA 3.0, littre.org.'),
        style: t.bodySmall?.copyWith(color: Cp.inkMuted),
      ));
      children.add(const SizedBox(height: Cp.s2));
      // Parcours du Littré par lettre, carte 60 : sans recherche
      // tapée, des pastilles A à Z ouvrent les 200 premières
      // vedettes de la lettre, un toucher sur une vedette lance
      // sa recherche. Une lettre se charge à la demande.
      if (_dictQuery.isEmpty) {
        children.add(Text(
          isEn ? 'Browse the Littré dictionary by letter' : 'Parcourir le dictionnaire Littré par lettre',
          style: t.titleMedium,
        ));
        children.add(const SizedBox(height: Cp.s1));
        children.add(Wrap(
          spacing: 6,
          runSpacing: 6,
          children: [
            for (final letter in const ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'])
              ChoiceChip(
                label: Text(letter.toUpperCase()),
                selected: _littreLetter == letter,
                onSelected: (_) => _browseLittre(letter),
              ),
          ],
        ));
        children.add(const SizedBox(height: Cp.s1));
        if (_littreLetter.isNotEmpty) {
          children.add(Text(
            isEn ? '${_littreBrowse.length} headwords, letter ${_littreLetter.toUpperCase()} (first 200)' : '${_littreBrowse.length} vedettes, lettre ${_littreLetter.toUpperCase()} (200 premières)',
            style: t.bodyMedium?.copyWith(color: Cp.inkMuted),
          ));
          children.add(const SizedBox(height: Cp.s1));
          for (final head in _littreBrowse) {
            children.add(ListTile(
              title: Text(head, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w700, color: Cp.navy)),
              trailing: const Icon(Icons.chevron_right_outlined),
              onTap: () {
                setState(() {
                  _dictQuery = head;
                  _dictCtrl.text = head;
                });
                unawaited(_runStrongSearch());
                unawaited(_runLittreSearch());
              },
            ));
          }
        }
        children.add(const SizedBox(height: Cp.s2));
      }
      final allEntries = [...kBibleDictionary, ...kBibleBookWords];
      final entries = _dictQuery.isEmpty
          ? allEntries
          : allEntries.where((e) {
              final q = _dictQuery.toLowerCase();
              return e.french.toLowerCase().contains(q) ||
                  e.transliteration.toLowerCase().contains(q) ||
                  e.hebrew.contains(_dictQuery) ||
                  e.strong.toLowerCase().contains(q) ||
                  e.book.toLowerCase().contains(q) ||
                  e.meaningFr.toLowerCase().contains(q);
            }).toList();
      // Lexique de Strong, cartes 54 et 58 : résultats par numéro,
      // translittération ou mot anglais, avant les 114 entrées
      // du dictionnaire, jamais mélangés avec elles. Hébreu
      // d'abord, grec ensuite, 50 résultats au plus.
      if (_dictQuery.isNotEmpty) {
        if (_strongLoading) {
          children.add(const LinearProgressIndicator(color: Cp.gold));
          children.add(const SizedBox(height: Cp.s1));
        } else if (_strongResults.isNotEmpty) {
          children.add(Text(
            '${_strongResults.length} ${tr('entrées du lexique de Strong')}',
            style: t.titleMedium,
          ));
          children.add(const SizedBox(height: Cp.s1));
          for (final e in _strongResults) {
            children.add(Card(
              child: Padding(
                padding: const EdgeInsets.all(Cp.s2),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Row(children: [
                    Expanded(
                      child: Text(e.lemma, textDirection: e.isGreek ? TextDirection.ltr : TextDirection.rtl, style: const TextStyle(fontSize: 26, fontWeight: FontWeight.w700, color: Cp.navy)),
                    ),
                    Text('Strong ${e.strong}', style: t.bodyMedium?.copyWith(color: Cp.goldDeep, fontWeight: FontWeight.w700)),
                  ]),
                  const SizedBox(height: 2),
                  Text(e.xlit, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: Cp.goldDeep)),
                  if (e.pron.isNotEmpty) Text(e.pron, style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
                  if (e.derivation.isNotEmpty) ...[
                    const SizedBox(height: 4),
                    Text('${tr('Origine')} : ${e.derivation}', style: t.bodyMedium),
                  ],
                  const SizedBox(height: 4),
                  Text(tr('Définition en anglais, telle que dans le lexique de Strong'), style: t.bodySmall?.copyWith(color: Cp.goldDeep, fontWeight: FontWeight.w700)),
                  Text(e.strongsDef, style: t.bodyMedium),
                  if (e.kjvDef.isNotEmpty) ...[
                    const SizedBox(height: 4),
                    Text(tr('Usages dans la version King James'), style: t.bodySmall?.copyWith(color: Cp.goldDeep, fontWeight: FontWeight.w700)),
                    Text(e.kjvDef, style: t.bodyMedium),
                  ],
                ]),
              ),
            ));
          }
          children.add(const SizedBox(height: Cp.s2));
        } else {
          children.add(Text(tr('Aucune entrée Strong trouvée.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)));
          children.add(const SizedBox(height: Cp.s2));
        }
      }
      // Dictionnaire Littré, carte 60 : résultats en français,
      // après Strong, jamais mélangés avec lui, 50 au plus.
      // Chaque carte donne la vedette, sa nature et ses
      // premiers sens, 3 au plus, avec la source en bas.
      if (_dictQuery.isNotEmpty) {
        if (_littreLoading) {
          children.add(const LinearProgressIndicator(color: Cp.gold));
          children.add(const SizedBox(height: Cp.s1));
        } else if (_littreResults.isNotEmpty) {
          children.add(Text(
            '${_littreResults.length} ${isEn ? 'Littré dictionary entries' : 'entrées du dictionnaire Littré'}',
            style: t.titleMedium,
          ));
          children.add(const SizedBox(height: Cp.s1));
          for (final e in _littreResults) {
            children.add(Card(
              child: Padding(
                padding: const EdgeInsets.all(Cp.s2),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Row(children: [
                    Expanded(
                      child: Text(e.word, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
                    ),
                    if (e.nature.isNotEmpty) Text(e.nature, style: t.bodyMedium?.copyWith(color: Cp.goldDeep, fontWeight: FontWeight.w700)),
                  ]),
                  const SizedBox(height: 4),
                  for (var i = 0; i < e.definitions.length; i++) ...[
                    if (i > 0) const SizedBox(height: 4),
                    Text('${i + 1}. ${e.definitions[i]}', style: t.bodyMedium),
                  ],
                  const SizedBox(height: 4),
                  Text(
                    isEn ? 'Littré, first senses. Full entry: littre.org.' : 'Littré, premiers sens. Entrée complète : littre.org.',
                    style: t.bodySmall?.copyWith(color: Cp.inkMuted),
                  ),
                ]),
              ),
            ));
          }
          children.add(const SizedBox(height: Cp.s2));
        } else {
          children.add(Text(
            isEn ? 'No Littré entry found. Try the word in its simplest form.' : 'Aucune entrée Littré trouvée. Essayez le mot sous sa forme la plus simple, par exemple « paix ».',
            style: t.bodyMedium?.copyWith(color: Cp.inkMuted),
          ));
          children.add(const SizedBox(height: Cp.s2));
        }
      }
      if (entries.isEmpty) {
        children.add(EmptyNote(
          icon: Icons.search_off_outlined,
          text: isEn ? 'No word found in the dictionary. Try another word.' : 'Aucun mot trouvé dans le dictionnaire. Essayez un autre mot.',
          action: OutlinedButton(
            onPressed: () => setState(() {
              _dictQuery = '';
              _dictCtrl.clear();
            }),
            child: Text(tr('Effacer la recherche')),
          ),
        ));
      } else {
        children.add(Text(isEn ? '${entries.length} word(s) in the dictionary' : '${entries.length} mot(s) dans le dictionnaire', style: t.titleMedium));
        children.add(const SizedBox(height: Cp.s1));
        for (final e in entries) {
          final wordHl = _isWordHighlighted(e);
          children.add(Card(
            child: Padding(
              padding: const EdgeInsets.all(Cp.s2),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Row(children: [
                  Expanded(
                    child: Text(e.french,
                        style: t.titleMedium?.copyWith(
                            fontWeight: FontWeight.w800,
                            color: Cp.navy,
                            decoration: wordHl ? TextDecoration.underline : null,
                            decorationColor: Cp.gold,
                            decorationThickness: 2)),
                  ),
                  Text(e.hebrew, style: const TextStyle(fontSize: 26, fontWeight: FontWeight.w700, color: Cp.navy), textDirection: TextDirection.rtl),
                  IconButton(
                    tooltip: tr('Souligner ce mot'),
                    icon: Icon(Icons.format_underline_outlined, color: wordHl ? Cp.goldDeep : null),
                    onPressed: () => _toggleWordHighlight(e),
                  ),
                ]),
                const SizedBox(height: 2),
                Text(e.transliteration, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: Cp.goldDeep)),
                const SizedBox(height: 2),
                Text(isEn ? 'Strong ${e.strong}' : 'Strong ${e.strong}', style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontWeight: FontWeight.w700)),
                if (e.book.isNotEmpty) ...[
                  const SizedBox(height: 2),
                  Text(isEn ? '${e.book} · ${e.reference}' : '${e.book} · ${e.reference}', style: t.bodyMedium?.copyWith(color: Cp.goldDeep, fontWeight: FontWeight.w700)),
                ],
                const SizedBox(height: 4),
                Text(isEn ? e.meaningEn : e.meaningFr, style: t.bodyMedium),
              ]),
            ),
          ));
        }
      }
    } else if (_tab == 'rechercher') {
      children.add(TextField(
        controller: _searchCtrl,
        textInputAction: TextInputAction.search,
        onSubmitted: (_) => _runSearch(),
        decoration: InputDecoration(
          hintText: tr('Rechercher un livre, un chapitre, un mot…'),
          prefixIcon: const Icon(Icons.search_outlined, color: Cp.goldDeep),
          focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile), borderSide: const BorderSide(color: Cp.navy, width: 1.5)),
          suffixIcon: _query.isEmpty
              ? null
              : IconButton(
                  icon: const Icon(Icons.clear_outlined),
                  onPressed: () => setState(() {
                    _query = '';
                    _hits = [];
                    _searchCtrl.clear();
                  }),
                ),
          filled: true,
          fillColor: Cp.card,
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
        ),
      ));
      children.add(const SizedBox(height: Cp.s1));
      children.add(SizedBox(
        width: double.infinity,
        height: 52,
        child: FilledButton.icon(
          onPressed: _runSearch,
          icon: const Icon(Icons.search_outlined),
          label: Text(tr('Rechercher')),
        ),
      ));
      children.add(const SizedBox(height: Cp.s2));
      if (_query.isEmpty) {
        children.add(EmptyNote(icon: Icons.search_outlined, text: tr('Saisissez un mot, un livre ou une référence, puis lancez la recherche.')));
      } else {
        children.add(Text(isEn ? '${_hits.length} result(s) for “$_query”' : '${_hits.length} résultat(s) pour « $_query »', style: t.titleMedium));
        children.add(const SizedBox(height: Cp.s1));
        if (_hits.isEmpty) {
          children.add(EmptyNote(
            icon: Icons.search_off_outlined,
            text: tr('Aucun verset trouvé. Essayez un autre mot, ou vérifiez l’orthographe.'),
            action: OutlinedButton(
              onPressed: () => setState(() {
                _query = '';
                _hits = [];
                _searchCtrl.clear();
              }),
              child: Text(tr('Effacer la recherche')),
            ),
          ));
        } else {
          for (final h in _hits) {
            children.add(_verseListCard(BibleVerseRef(h.book, h.chapter, h.verse, h.text), () {
              setState(() => _tab = 'lire');
              _openHit(h);
            }));
          }
        }
      }
    } else if (_tab == 'favoris') {
      children.add(Text(tr('Touchez l’étoile à côté d’un verset pour l’enregistrer dans vos favoris.'), style: t.bodyMedium));
      children.add(const SizedBox(height: Cp.s2));
      if (_favorites.isEmpty) {
        children.add(EmptyNote(icon: Icons.star_border, text: tr('Aucun verset favori pour le moment.')));
      } else {
        for (final f in _favorites) {
          children.add(_verseListCard(
            f,
            () {
              setState(() => _tab = 'lire');
              _openChapter(f.book, f.chapter);
            },
            leadingIcon: Icons.star_outline,
          ));
        }
      }
    } else if (_query.isNotEmpty) {
      children.add(Text(isEn ? '${_hits.length} result(s) for “$_query”' : '${_hits.length} résultat(s) pour « $_query »', style: t.titleMedium));
      children.add(const SizedBox(height: Cp.s1));
      if (_hits.isEmpty) {
        children.add(EmptyNote(
          icon: Icons.search_off_outlined,
          text: tr('Aucun verset trouvé. Essayez un autre mot, ou vérifiez l’orthographe.'),
          action: OutlinedButton(
            onPressed: () => setState(() {
              _query = '';
              _hits = [];
              _searchCtrl.clear();
            }),
            child: Text(tr('Effacer la recherche')),
          ),
        ));
      } else {
        for (final h in _hits) {
          children.add(_verseListCard(BibleVerseRef(h.book, h.chapter, h.verse, h.text), () => _openHit(h)));
        }
      }
    } else if (_chapter != null && _book != null) {
      final bookName = svc.bookName(app.lang, _book!);
      final verses = svc.chapterVerses(app.lang, _book!, _chapter!);
      children.addAll(_bookSelectors(books));
      children.add(TextButton.icon(
        onPressed: _backToBook,
        icon: const Icon(Icons.chevron_left_outlined),
        label: Text(bookName),
      ));
      children.addAll(_bookSelectors(books));
      children.add(TextButton.icon(
        onPressed: _backToBook,
        icon: const Icon(Icons.chevron_left_outlined),
        label: Text(bookName),
      ));
      // Carte 59, 6 nov. 2026 : titre du chapitre bien dégagé,
      // jamais coupé en haut, avec un espace au-dessus, puis le
      // titre de section quand il est connu, jamais inventé, le
      // filet or et la version, Genèse 1, LSG. La carte Écouter
      // ce chapitre disparaît, la lecture se lance par le bouton
      // audio flottant, en bas au centre, à 0,9, sans puces.
      children.add(const SizedBox(height: 8));
      children.add(Text('$bookName $_chapter', style: const TextStyle(fontSize: 30, fontWeight: FontWeight.w800, color: Cp.navy, height: 1.15)));
      final sectionTitle = _sectionTitle(_book!, _chapter!);
      if (sectionTitle != null) {
        children.add(const SizedBox(height: 6));
        children.add(Text(sectionTitle, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: Cp.goldDeep, height: 1.2)));
      }
      children.add(const SizedBox(height: 8));
      children.add(Container(width: 56, height: 4, decoration: BoxDecoration(color: Cp.gold, borderRadius: BorderRadius.circular(2))));
      children.add(const SizedBox(height: Cp.s1));
      children.add(Text(app.lang == 'fr' ? 'Louis Segond · LSG' : 'King James · KJV',
          style: const TextStyle(color: Cp.goldDeep, fontSize: 12, fontWeight: FontWeight.w700, letterSpacing: 1)));
      children.add(const SizedBox(height: Cp.s1));
      // Contrôle rapide de la taille du texte, 31 oct. 2026 : il agit
      // sur le même réglage que la page Plus, sans reconstruire
      // toute la page, chaque verset écoutant le réglage lui-même.
      children.add(ListenableBuilder(
        listenable: textSize,
        builder: (c, _) => Row(children: [
          Expanded(child: Text('${tr('Taille du texte')} : ${textSizeLevelName(textSize.level)}', style: const TextStyle(fontWeight: FontWeight.w700, color: Cp.navy))),
          IconButton(
            tooltip: tr('Réduire la taille du texte'),
            onPressed: textSize.canDecrease ? () => textSize.decrease() : null,
            icon: const Icon(Icons.text_decrease_outlined),
          ),
          IconButton(
            tooltip: tr('Agrandir la taille du texte'),
            onPressed: textSize.canIncrease ? () => textSize.increase() : null,
            icon: const Icon(Icons.text_increase_outlined),
          ),
        ]),
      ));
      children.add(const SizedBox(height: Cp.s1));
      children.add(Text(
        tr('Toucher un mot pour voir son sens, toucher long pour le souligner. Toucher le numéro d’un verset pour le sélectionner.'),
        style: t.bodySmall?.copyWith(color: Cp.inkMuted),
      ));
      children.add(const SizedBox(height: Cp.s1));
      children.add(_chapterContinuousText(verses));
      // Versets avec des mots soulignés : nombre et effacement,
      // sans rouvrir une carte par verset.
      final withWords = _verseWords.entries.where((e) => e.value.isNotEmpty).toList()..sort((a, b) => a.key.compareTo(b.key));
      for (final e in withWords) {
        final wref = BibleVerseRef(_book!, _chapter!, e.key, verses[e.key - 1]);
        children.add(Row(children: [
          Expanded(
            child: Text(
                '${BibleService.instance.label(app.lang, _book!, _chapter!, e.key)} : ${e.value.length} ${e.value.length == 1 ? tr('mot souligné') : tr('mots soulignés')}',
                style: const TextStyle(color: Cp.goldDeep, fontWeight: FontWeight.w700, fontSize: 12)),
          ),
          TextButton(
            onPressed: () => _clearVerseWords(wref),
            child: Text(tr('Effacer')),
          ),
        ]));
      }
      // Place pour le bouton audio flottant, en bas au centre.
      children.add(const SizedBox(height: 96));
    } else if (_book != null) {
      final book = books[_book!];
      children.addAll(_bookSelectors(books));
      children.add(TextButton.icon(
        onPressed: _backToBooks,
        icon: const Icon(Icons.chevron_left_outlined),
        label: Text(tr('Tous les livres')),
      ));
      children.add(Text(book.name, style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w800, color: Cp.navy, height: 1.15)));
      children.add(const SizedBox(height: 6));
      children.add(Container(width: 44, height: 4, decoration: BoxDecoration(color: Cp.gold, borderRadius: BorderRadius.circular(2))));
      children.add(const SizedBox(height: Cp.s1));
      children.add(Wrap(
        spacing: Cp.s1,
        runSpacing: Cp.s1,
        children: [
          for (var c = 1; c <= book.chapters.length; c++)
            SizedBox(
              width: 56,
              height: Cp.touch,
              child: OutlinedButton(
                style: OutlinedButton.styleFrom(
                    padding: EdgeInsets.zero,
                    minimumSize: Size.zero,
                    tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                    side: const BorderSide(color: Cp.navy, width: 1.2),
                    foregroundColor: Cp.navy,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
                onPressed: () => _openChapter(_book!, c),
                child: Text('$c', softWrap: false, style: const TextStyle(fontWeight: FontWeight.w800)),
              ),
            ),
        ],
      ));
    } else {
      children.addAll(_bookSelectors(books));
      children.add(_CompactVerseBanner(
        lang: app.lang,
        onOpenChapter: (book, chapter) => _openChapter(book, chapter),
      ));
      children.add(const SizedBox(height: Cp.s2));
      if (_last != null) {
        children.add(Text(tr('Reprise de lecture'), style: t.titleMedium));
        children.add(const SizedBox(height: Cp.s1));
        children.add(_verseListCard(
          _last!,
          () => _openChapter(_last!.book, _last!.chapter),
          leadingIcon: Icons.history_outlined,
        ));
        children.add(const SizedBox(height: Cp.s1));
      }
      if (_favorites.isNotEmpty) {
        children.add(Text(tr('Favoris'), style: t.titleMedium));
        children.add(const SizedBox(height: Cp.s1));
        for (final f in _favorites) {
          children.add(_verseListCard(
            f,
            () => _openChapter(f.book, f.chapter),
            leadingIcon: Icons.star_outline,
          ));
        }
        children.add(const SizedBox(height: Cp.s2));
      }
      if (_highlights.isNotEmpty) {
        children.add(Text(tr('Versets soulignés'), style: t.titleMedium));
        children.add(const SizedBox(height: Cp.s1));
        for (final f in _highlights) {
          children.add(_verseListCard(
            f,
            () => _openChapter(f.book, f.chapter),
            leadingIcon: Icons.format_underline_outlined,
            textStyle: Ux.bible(size: 16, height: 1.6, color: Cp.ink).copyWith(
                decoration: TextDecoration.underline, decorationColor: Cp.gold, decorationThickness: 2),
          ));
        }
        children.add(const SizedBox(height: Cp.s2));
      }
      if (books.isEmpty) {
        children.add(EmptyNote(
            icon: Icons.auto_stories_outlined,
            text: tr('La Bible n’a pas pu être chargée. Fermez puis rouvrez l’application.')));
      } else {
        // Réorganisation, 30 oct. 2026 : filtre par testament et
        // recherche par nom, pour ne plus défiler 66 livres. Sans
        // filtre ni recherche, la liste garde ses deux sections.
        children.add(TextField(
          controller: _bookSearchCtrl,
          textInputAction: TextInputAction.search,
          onChanged: (q) => setState(() => _bookQuery = q.trim()),
          decoration: InputDecoration(
            hintText: isEn ? 'Search a book…' : 'Rechercher un livre…',
            prefixIcon: const Icon(Icons.search_outlined, color: Cp.goldDeep),
            focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile), borderSide: const BorderSide(color: Cp.navy, width: 1.5)),
            suffixIcon: _bookQuery.isEmpty
                ? null
                : IconButton(
                    icon: const Icon(Icons.clear_outlined),
                    onPressed: () => setState(() {
                      _bookQuery = '';
                      _bookSearchCtrl.clear();
                    }),
                  ),
            filled: true,
            fillColor: Cp.card,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
          ),
        ));
        children.add(const SizedBox(height: Cp.s1));
        children.add(Wrap(
          spacing: Cp.s1,
          runSpacing: Cp.s1,
          children: [
            for (final f in const ['tous', 'ancien', 'nouveau'])
              ChoiceChip(
                label: Text(f == 'tous' ? (isEn ? 'All' : 'Tous') : f == 'ancien' ? tr('Ancien Testament') : tr('Nouveau Testament')),
                selected: _bookTestament == f,
                onSelected: (_) => setState(() => _bookTestament = f),
                selectedColor: Cp.navy,
                backgroundColor: Cp.card,
                labelStyle: TextStyle(fontWeight: FontWeight.w800, color: _bookTestament == f ? Colors.white : Cp.navy),
                side: BorderSide(color: _bookTestament == f ? Cp.navy : Cp.line),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(23)),
              ),
          ],
        ));
        children.add(const SizedBox(height: Cp.s2));
        final normQuery = _normBookQuery(_bookQuery);
        final visible = <int>[];
        for (var i = 0; i < books.length; i++) {
          if (_bookTestament == 'ancien' && i >= 39) continue;
          if (_bookTestament == 'nouveau' && i < 39) continue;
          if (normQuery.isNotEmpty && !_normBookQuery(books[i].name).contains(normQuery)) continue;
          visible.add(i);
        }
        if (_bookTestament == 'tous' && _bookQuery.isEmpty) {
          children.add(InkWell(
            onTap: () => setState(() => _bookTestament = 'ancien'),
            child: _bibleSectionHeader(tr('Ancien Testament'), 39),
          ));
          children.add(const SizedBox(height: Cp.s2));
          children.add(InkWell(
            onTap: () => setState(() => _bookTestament = 'nouveau'),
            child: _bibleSectionHeader(tr('Nouveau Testament'), books.length > 39 ? books.length - 39 : 0),
          ));
        } else {
          children.add(Text(isEn ? '${visible.length} book(s)' : '${visible.length} livre(s)', style: t.titleMedium));
          children.add(const SizedBox(height: Cp.s1));
          if (visible.isEmpty) {
            children.add(EmptyNote(
                icon: Icons.search_off_outlined,
                text: isEn ? 'No book matches this search.' : 'Aucun livre ne correspond à cette recherche.'));
          } else {
            for (final i in visible) {
              children.add(_bibleBookTile(i, books[i].name, books[i].chapters.length, () => setState(() => _book = i)));
            }
          }
        }
      }
    }

    // Bouton quiz retiré de l'onglet Bible, 29 oct. 2026 : le
    // système de quiz lui-même et sa présence sur l'accueil
    // restent intacts, seule cette instance disparaît.
    final page = basic(tr('Bible'), children, controller: widget.scrollController);
    // Carte 59, 6 nov. 2026 : bouton audio flottant, discret, en
    // bas au centre, comme sur la capture, lecture du chapitre à
    // 0,9, sans puces de vitesse, gardée de la carte 56.
    if (_tab == 'lire' && _chapter != null && _book != null) {
      final chapterVerses = svc.chapterVerses(app.lang, _book!, _chapter!);
      // Carte 97, 8 nov. 2026 : quand l'écoute tourne, le bouton
      // rond devient une barre de lecture visible, avec la source
      // (MP3 haute qualité ou voix de l'appareil), pause et
      // reprise pour le MP3, et Arrêter. Le texte du chapitre
      // reste affiché pendant l'écoute.
      final audioControl = _speakingChapter
          ? Material(
              elevation: 6,
              borderRadius: BorderRadius.circular(28),
              color: Colors.white,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    if (_hqActive)
                      IconButton(
                        tooltip: _hqPaused ? tr('Reprendre') : tr('Pause'),
                        icon: Icon(_hqPaused ? Icons.play_arrow_outlined : Icons.pause_outlined, color: Cp.navy, size: 26),
                        onPressed: _toggleHqPause,
                      ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 6),
                      child: Text(
                        _hqActive ? tr('Audio haute qualité') : tr('Voix de l’appareil'),
                        style: const TextStyle(color: Cp.navy, fontWeight: FontWeight.w700, fontSize: 13),
                      ),
                    ),
                    IconButton(
                      tooltip: tr('Arrêter'),
                      icon: const Icon(Icons.stop_outlined, color: Cp.navy, size: 26),
                      onPressed: _stopChapterAudio,
                    ),
                  ],
                ),
              ),
            )
          : Tooltip(
              message: tr('Écouter ce chapitre'),
              child: Material(
                elevation: 6,
                shape: const CircleBorder(),
                color: Colors.white,
                child: InkWell(
                  customBorder: const CircleBorder(),
                  onTap: () => _toggleChapterAudio(chapterVerses),
                  child: const SizedBox(
                    width: 56,
                    height: 56,
                    child: Icon(
                      Icons.volume_up_outlined,
                      color: Cp.navy,
                      size: 28,
                    ),
                  ),
                ),
              ),
            );
      return Stack(children: [
        page,
        Positioned(
          left: 0,
          right: 0,
          bottom: 16,
          child: Center(child: audioControl),
        ),
      ]);
    }
    return page;
  }
}

/// Défi quiz hebdomadaire, 31 oct. 2026 : envoi de la participation en
/// fin de partie, une seule fois par partie terminée. Renvoie la
/// réponse du serveur, ou null si l'envoi n'a pas lieu (visiteur, hors
/// ligne, échec réseau) : la prochaine partie terminée en ligne
/// deviendra alors la participation comptée.
Future<Map<String, dynamic>?> envoyerDefiParticipation(int score, int total) async {
  if (app.member == null || app.serverStatus == 'erreur') return null;
  try {
    return await api.submitDefiParticipation(score, total);
  } catch (_) {
    return null;
  }
}

/// Message visible après l'envoi : participation comptée, ou déjà
/// comptée cette semaine avec le score compté.
String messageDefi(Map<String, dynamic> rep) {
  if (rep['deja_comptee'] == true) {
    final s = (rep['score'] as num?)?.toInt();
    final t = (rep['total'] as num?)?.toInt();
    if (s != null && t != null) return '${tr('Déjà comptée cette semaine.')} $s / $t';
    return tr('Déjà comptée cette semaine.');
  }
  return tr('Participation comptée pour le défi de la semaine.');
}

/// Libellé de la semaine du défi, à partir de sa clé (lundi, AAAA-MM-JJ).
String formatSemaineDefi(String semaine) {
  final parts = semaine.split('-');
  if (parts.length != 3) return semaine;
  final y = int.tryParse(parts[0]);
  final m = int.tryParse(parts[1]);
  final d = int.tryParse(parts[2]);
  if (y == null || m == null || d == null || m < 1 || m > 12) return semaine;
  const moisFr = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const moisEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  if (isEn) return '${moisEn[m - 1]} $d, $y';
  return '$d ${moisFr[m - 1]} $y';
}

/// Défi quiz hebdomadaire entre établissements, 31 oct. 2026 :
/// classement de la semaine en cours, moyenne et participants par
/// établissement, établissement du membre mis en évidence. Point
/// d'entrée : les écrans de fin de partie (accueil et jeu complet),
/// là où le défi se joue, sans nouvel onglet dans la barre du bas.
class DefiPage extends StatefulWidget {
  const DefiPage({super.key});
  @override
  State<DefiPage> createState() => _DefiPageState();
}

class _DefiPageState extends State<DefiPage> {
  late Future<Map<String, dynamic>> _futur;

  @override
  void initState() {
    super.initState();
    _futur = api.fetchDefiClassement();
  }

  void _recharger() => setState(() => _futur = api.fetchDefiClassement());

  double _moyenne(dynamic v) {
    if (v is num) return v.toDouble();
    return double.tryParse(v.toString()) ?? 0;
  }

  String _moyenneTexte(double m) {
    final t = m.toStringAsFixed(2);
    return isEn ? t : t.replaceAll('.', ',');
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(tr('Défi de la semaine'), [
      FutureBuilder<Map<String, dynamic>>(
        future: _futur,
        builder: (c, snap) {
          if (snap.connectionState == ConnectionState.waiting) {
            return const Padding(padding: EdgeInsets.all(24), child: UxShimmerList(itemCount: 3));
          }
          if (snap.hasError) {
            return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(tr('Impossible de charger le classement. Vérifiez votre connexion, puis réessayez.'), style: t.bodyMedium),
              const SizedBox(height: Cp.s2),
              SizedBox(height: 52, child: OutlinedButton(onPressed: _recharger, child: Text(tr('Réessayer')))),
            ]);
          }
          final data = snap.data ?? {};
          final semaine = (data['semaine'] ?? '').toString();
          final lignes = (data['classement'] as List?) ?? [];
          final membre = (data['membre'] as Map?) ?? {};
          final monEtab = (membre['etablissement_id'] ?? '').toString();
          final monScore = (membre['score'] as num?)?.toInt();
          final monTotal = (membre['total'] as num?)?.toInt();
          final monEtabNom = (membre['etablissement_nom'] ?? '').toString();
          return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text('${tr('Semaine du')} ${formatSemaineDefi(semaine)}', style: t.titleMedium),
            const SizedBox(height: Cp.s1),
            Text(tr('Seule la première partie de la semaine compte.'), style: t.bodyMedium),
            const SizedBox(height: Cp.s2),
            if (monScore != null && monTotal != null) ...[
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(Cp.s2),
                decoration: BoxDecoration(
                  color: Cp.gold.withValues(alpha: 0.12),
                  borderRadius: BorderRadius.circular(Cp.radiusCard),
                  border: Border.all(color: Cp.gold),
                ),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text('${tr('Votre score compté')} : $monScore / $monTotal', style: t.titleMedium),
                  if (monEtabNom.isNotEmpty) ...[
                    const SizedBox(height: 4),
                    Text(etabDisplayName(monEtabNom), style: t.bodyMedium),
                  ] else ...[
                    const SizedBox(height: 4),
                    Text(tr('Votre score ne compte pour aucun établissement.'), style: t.bodyMedium),
                  ],
                ]),
              ),
              const SizedBox(height: Cp.s2),
            ] else ...[
              Text(tr('Vous n’avez pas encore joué cette semaine.'), style: t.bodyMedium),
              const SizedBox(height: Cp.s2),
            ],
            Text(tr('Classement de la semaine'), style: t.titleMedium),
            const SizedBox(height: Cp.s1),
            if (lignes.isEmpty)
              Text(tr('Aucun joueur cette semaine.'), style: t.bodyMedium)
            else
              for (var i = 0; i < lignes.length; i++) ...[
                Builder(builder: (_) {
                  final ligne = lignes[i] as Map;
                  final id = (ligne['etablissement_id'] ?? '').toString();
                  final nom = (ligne['etablissement_nom'] ?? '').toString();
                  final participants = (ligne['participants'] as num?)?.toInt() ?? 0;
                  final moi = monEtab.isNotEmpty && id == monEtab;
                  return Container(
                    width: double.infinity,
                    margin: const EdgeInsets.only(bottom: Cp.s1),
                    padding: const EdgeInsets.all(Cp.s2),
                    decoration: BoxDecoration(
                      color: moi ? Cp.gold.withValues(alpha: 0.12) : Cp.card,
                      borderRadius: BorderRadius.circular(Cp.radiusCard),
                      border: Border.all(color: moi ? Cp.gold : Cp.line),
                    ),
                    child: Row(children: [
                      Text('${i + 1}', style: t.titleLarge?.copyWith(color: moi ? Cp.goldDeep : Cp.navy)),
                      const SizedBox(width: Cp.s2),
                      Expanded(child: Text(etabDisplayName(nom), style: t.titleMedium)),
                      const SizedBox(width: Cp.s2),
                      Text(_moyenneTexte(_moyenne(ligne['moyenne'])), style: t.titleMedium),
                      const SizedBox(width: Cp.s2),
                      Text('$participants ${tr('Participants')}', style: t.bodyMedium),
                    ]),
                  );
                }),
              ],
          ]);
        },
      ),
    ], actions: [IconButton(icon: const Icon(Icons.refresh), onPressed: _recharger, tooltip: tr('Réessayer'))]);
  }
}

class QuizPage extends StatefulWidget {
  const QuizPage({super.key, this.initialGame});
  // Jeu déjà tiré (par exemple l'aperçu de l'accueil) : il est joué tel
  // quel, sans nouveau tirage, puis un nouveau tirage au rejouer.
  final List<QuizQ>? initialGame;

  @override
  State<QuizPage> createState() => _QuizPageState();
}

class _QuizPageState extends State<QuizPage> {
  late List<QuizQ> _game;
  int _i = 0, _score = 0;
  int? _picked;
  // Défi hebdomadaire, 31 oct. 2026 : envoi une seule fois par partie
  // terminée, jamais au réaffichage de l'écran du score.
  bool _defiEnvoye = false;
  String? _defiMessage;

  @override
  void initState() {
    super.initState();
    _game = widget.initialGame ?? app.drawQuiz(5, app.lang);
  }

  void _restart() => setState(() {
        _game = app.drawQuiz(5, app.lang);
        _i = 0;
        _score = 0;
        _picked = null;
        _defiEnvoye = false;
        _defiMessage = null;
      });

  void _suivant() {
    final dernier = _i + 1 >= _game.length;
    setState(() {
      _i++;
      _picked = null;
    });
    if (dernier) _envoyerDefi();
  }

  // Défi hebdomadaire, 31 oct. 2026 : visiteur ou hors ligne, rien
  // n'est envoyé et la prochaine partie terminée en ligne deviendra
  // la participation comptée.
  Future<void> _envoyerDefi() async {
    if (_defiEnvoye) return;
    _defiEnvoye = true;
    final rep = await envoyerDefiParticipation(_score, _game.length);
    if (!mounted || rep == null) return;
    setState(() => _defiMessage = messageDefi(rep));
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;

    final langSelector = SegmentedButton<String>(
      segments: [
        ButtonSegment(value: 'fr', label: Text(tr('Français'))),
        ButtonSegment(value: 'en', label: Text(tr('English'))),
      ],
      selected: {app.lang},
      onSelectionChanged: (sel) => setState(() {
        app.setLang(sel.first);
        _game = app.drawQuiz(5, app.lang);
        _i = 0;
        _score = 0;
        _picked = null;
        _defiEnvoye = false;
        _defiMessage = null;
      }),
    );

    if (_game.isEmpty) {
      return basic(tr('Quiz Bible'), [
        langSelector,
        const SizedBox(height: Cp.s2),
        EmptyNote(icon: Icons.quiz_outlined, text: tr('Aucune question pour le moment. La structure peut en ajouter.')),
      ]);
    }

    if (_i >= _game.length) {
      return basic(tr('Quiz Bible'), [
        const SizedBox(height: Cp.s3),
        Center(child: Text(tr('Partie terminée'), style: t.titleLarge)),
        const SizedBox(height: Cp.s2),
        Center(
          child: Text('$_score / ${_game.length}',
              style: const TextStyle(fontSize: 48, fontWeight: FontWeight.w700, color: Cp.navy)),
        ),
        if (_defiMessage != null) ...[
          const SizedBox(height: Cp.s2),
          Center(child: Text(_defiMessage!, style: t.bodyMedium, textAlign: TextAlign.center)),
        ],
        const SizedBox(height: Cp.s3),
        SizedBox(height: 56, child: FilledButton(onPressed: _restart, child: Text(tr('Rejouer')))),
        if (app.member != null) ...[
          const SizedBox(height: Cp.s2),
          SizedBox(height: 56, child: OutlinedButton(onPressed: () => go(context, const DefiPage()), child: Text(tr('Défi de la semaine')))),
        ],
      ]);
    }

    final q = _game[_i];
    final answered = _picked != null;
    return basic(tr('Quiz Bible'), [
      langSelector,
      const SizedBox(height: Cp.s2),
      Text(isEn ? 'Question ${_i + 1} of ${_game.length}' : 'Question ${_i + 1} sur ${_game.length}', style: t.bodyMedium),
      const SizedBox(height: 4),
      LinearProgressIndicator(
        value: (_i + (answered ? 1 : 0)) / _game.length,
        color: Cp.gold,
        backgroundColor: Cp.line,
        minHeight: 6,
        borderRadius: BorderRadius.circular(3),
      ),
      const SizedBox(height: Cp.s3),
      Text(q.character, style: t.titleMedium?.copyWith(color: Cp.goldDeep)),
      const SizedBox(height: Cp.s1),
      // Taille du texte, 1er nov. 2026 : la question suit desormais
      // le reglage global de l'application, sans multiplication
      // explicite ici, sinon elle serait agrandie deux fois.
      ListenableBuilder(
        listenable: textSize,
        builder: (c, _) => Text(q.question, style: t.titleLarge),
      ),
      const SizedBox(height: Cp.s3),
      for (var k = 0; k < q.choices.length; k++) ...[
        _Choice(
          letter: String.fromCharCode(65 + k),
          text: q.choices[k],
          state: !answered
              ? 0
              : (k == q.correct ? 1 : (k == _picked ? 2 : 0)),
          onTap: answered
              ? null
              : () => setState(() {
                    _picked = k;
                    if (k == q.correct) _score++;
                  }),
        ),
        const SizedBox(height: Cp.s1),
      ],
      if (answered) ...[
        const SizedBox(height: Cp.s1),
        Container(
          padding: const EdgeInsets.all(Cp.s2),
          decoration: BoxDecoration(
            color: Cp.verseTint,
            borderRadius: BorderRadius.circular(Cp.radiusCard),
            border: Border.all(color: Cp.verseLine),
          ),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(q.ref, style: t.titleMedium),
            const SizedBox(height: 4),
            Text(q.explanation, style: t.bodyMedium),
          ]),
        ),
        const SizedBox(height: Cp.s2),
        SizedBox(
          height: 56,
          child: FilledButton(
            onPressed: _suivant,
            child: Text(_i + 1 >= _game.length ? tr('Voir mon score') : tr('Question suivante')),
          ),
        ),
      ],
    ]);
  }
}

class _Choice extends StatelessWidget {
  const _Choice({required this.letter, required this.text, required this.state, required this.onTap});
  final String letter, text;
  final int state; // 0 neutre, 1 bonne réponse, 2 mauvaise réponse
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final color = state == 1 ? Cp.ok : (state == 2 ? Cp.danger : Cp.line);
    return Material(
      color: state == 0 ? Cp.card : color.withValues(alpha: 0.10),
      borderRadius: BorderRadius.circular(Cp.radiusTile),
      child: InkWell(
        borderRadius: BorderRadius.circular(Cp.radiusTile),
        onTap: onTap,
        child: Container(
          constraints: const BoxConstraints(minHeight: Cp.touch + 8),
          padding: const EdgeInsets.symmetric(horizontal: Cp.s2, vertical: Cp.s1),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(Cp.radiusTile),
            border: Border.all(color: color, width: state == 0 ? 1 : 2),
          ),
          child: Row(children: [
            CircleAvatar(
              radius: 14,
              backgroundColor: Cp.navy,
              child: Text(letter, style: const TextStyle(color: Cp.gold, fontSize: 13, fontWeight: FontWeight.w700)),
            ),
            const SizedBox(width: Cp.s2),
            Expanded(child: Text(text, style: Theme.of(context).textTheme.labelLarge)),
            if (state == 1) const Icon(Icons.check_circle_outlined, color: Cp.ok),
            if (state == 2) const Icon(Icons.cancel_outlined, color: Cp.danger),
          ]),
        ),
      ),
    );
  }
}

// Champs du formulaire médiathèque du prototype, 29 oct. 2026 :
// Titre, Thématique, Format, Lien, Orateur, Durée, Date, Résumé.
// Thématique et Format n'ont qu'une valeur vue sur les captures
// du prototype, Prophétique et Vidéo, rien d'inventé. Le format
// ne s'applique qu'aux enseignements, pas aux musiques.
List<F> _teachingFields(String kind, String artistLabel, [Teaching? x]) {
  return [
    F('title', tr('Titre'), initial: x?.title ?? ''),
    F('thematique', tr('Thématique'), optional: true, options: const ['Prophétique'], initial: x?.thematique ?? ''),
    if (kind == 'enseignement') F('format', tr('Format'), optional: true, options: const ['Vidéo'], initial: x?.format ?? ''),
    F('url', tr('Lien (YouTube, Vimeo, audio ou article)'), optional: true, initial: x?.url ?? ''),
    F('speaker', artistLabel, optional: true, initial: x?.speaker ?? ''),
    F('duree', tr('Durée'), optional: true, initial: x?.duree ?? ''),
    F('date', tr('Date'), optional: true, initial: x?.dateTexte ?? ''),
    F('desc', tr('Résumé'), lines: 3, optional: true, initial: x?.description ?? ''),
  ];
}

/// Panneau d'edition dans la carte, tranche 3, 1er nov. 2026 : memes
/// champs texte que la feuille complete, sans remplacement du fichier
/// audio ni de l'image, qui restent dans la feuille complete. La
/// sauvegarde reprend exactement le chemin existant
/// (_updateTeachingServer, sans nouvel audio), donc la route serveur
/// et les gardes ne changent pas.
class _TeachingEditPanel extends StatefulWidget {
  const _TeachingEditPanel({super.key, required this.teaching, required this.onClose});
  final Teaching teaching;
  final VoidCallback onClose;

  @override
  State<_TeachingEditPanel> createState() => _TeachingEditPanelState();
}

class _TeachingEditPanelState extends State<_TeachingEditPanel> {
  late final TextEditingController _titre;
  late final TextEditingController _thematique;
  late final TextEditingController _lien;
  late final TextEditingController _orateur;
  late final TextEditingController _duree;
  late final TextEditingController _date;
  late final TextEditingController _desc;
  late final TextEditingController _format;
  var _saving = false;

  @override
  void initState() {
    super.initState();
    final x = widget.teaching;
    _titre = TextEditingController(text: x.title);
    _thematique = TextEditingController(text: x.thematique);
    _lien = TextEditingController(text: x.url);
    _orateur = TextEditingController(text: x.speaker);
    _duree = TextEditingController(text: x.duree);
    _date = TextEditingController(text: x.dateTexte);
    _desc = TextEditingController(text: x.description);
    _format = TextEditingController(text: x.format);
  }

  @override
  void dispose() {
    _titre.dispose();
    _thematique.dispose();
    _lien.dispose();
    _orateur.dispose();
    _duree.dispose();
    _date.dispose();
    _desc.dispose();
    _format.dispose();
    super.dispose();
  }

  InputDecoration _decoration(String label) => InputDecoration(
        labelText: label,
        filled: true,
        fillColor: Cp.card,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
      );

  Widget _field(TextEditingController ctrl, String label, {int lines = 1}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: Cp.s1),
      child: TextField(
        controller: ctrl,
        maxLines: lines,
        keyboardType: lines > 1 ? TextInputType.multiline : TextInputType.text,
        decoration: _decoration(label),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final x = widget.teaching;
    final artistLabel = x.kind == 'musique' ? tr('Artiste') : tr('Orateur');
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(
        color: Cp.paper,
        borderRadius: BorderRadius.circular(Cp.radiusCard),
        border: Border.all(color: Cp.gold.withValues(alpha: 0.4)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(tr('Modifier sur place'), style: t.titleMedium),
          const SizedBox(height: Cp.s1),
          _field(_titre, tr('Titre')),
          _field(_thematique, tr('Thématique')),
          if (x.kind == 'enseignement') _field(_format, tr('Format')),
          _field(_lien, tr('Lien (YouTube, Vimeo, audio ou article)')),
          _field(_orateur, artistLabel),
          _field(_duree, tr('Durée')),
          _field(_date, tr('Date')),
          _field(_desc, tr('Résumé'), lines: 3),
          Row(children: [
            Expanded(
              child: FilledButton(
                onPressed: _saving
                    ? null
                    : () async {
                        final titre = _titre.text.trim();
                        if (titre.isEmpty) return;
                        setState(() => _saving = true);
                        final updated = Teaching(
                          titre,
                          _orateur.text.trim(),
                          _lien.text.trim(),
                          kind: x.kind,
                          imagePath: x.imagePath,
                          imageUrl: x.imageUrl,
                          audioId: x.audioId,
                          serverId: x.serverId,
                          thematique: _thematique.text.trim(),
                          format: x.kind == 'enseignement' ? _format.text.trim() : x.format,
                          duree: _duree.text.trim(),
                          dateTexte: _date.text.trim(),
                          description: _desc.text.trim(),
                        );
                        final idx = app.teachings.indexOf(x);
                        if (idx >= 0) {
                          app.teachings[idx] = updated;
                        } else {
                          app.teachings.insert(0, updated);
                        }
                        app.changed();
                        await _updateTeachingServer(context, updated);
                        if (!mounted) return;
                        widget.onClose();
                      },
                child: Text(_saving ? 'Enregistrement…' : tr('Enregistrer')),
              ),
            ),
            const SizedBox(width: Cp.s1),
            Expanded(
              child: OutlinedButton(
                onPressed: _saving ? null : widget.onClose,
                child: Text(tr('Annuler')),
              ),
            ),
          ]),
        ],
      ),
    );
  }
}

// Publication d'un enseignement, d'une musique ou d'un
// podcast, carte 57, 6 nov. 2026 : même flux que le bouton
// Ajouter de la page Enseignements, appelé aussi depuis la
// tuile unique Publier, jamais dupliqué.
Future<void> publierEnseignement(BuildContext c) async {
  final type = await pick<String>(c, tr('Musique, enseignement ou podcast ?'), [tr('Musique'), tr('Enseignement'), tr('Podcast')], (s) => s);
  if (type == null || !c.mounted) return;
  final kind = type == tr('Musique')
      ? 'musique'
      : type == tr('Podcast')
          ? 'podcast'
          : 'enseignement';
  final artistLabel = kind == 'musique'
      ? tr('Artiste')
      : kind == 'podcast'
          ? tr('Animateur')
          : tr('Orateur');
  audioFormSheet(c, kind == 'musique' ? tr('Nouvelle musique') : kind == 'podcast' ? tr('Nouveau podcast') : tr('Nouvel enseignement'), _teachingFields(kind, artistLabel), tr('Publier'), (v, imagePath, audioPath, audioBytes, audioName) {
    final teaching = Teaching(v['title']!, v['speaker']!, v['url']!, kind: kind, imagePath: imagePath, thematique: v['thematique'] ?? '', format: v['format'] ?? '', duree: v['duree'] ?? '', dateTexte: v['date'] ?? '', description: v['desc'] ?? '');
    app.teachings.insert(0, teaching);
    app.changed();
    _publishTeaching(c, teaching, audioPath: audioPath, audioBytes: audioBytes, audioName: audioName);
  });
}

// Lecteur audio vide, carte 70, 6 nov. 2026 : même langage que
// le lecteur de la carte 53, fond bleu nuit, bordure or, grande
// pochette, barre or, gros bouton lecture, mais sans aucun contenu
// inventé, bouton désactivé, barre à zéro, durée en tiret.
class _LecteurVide extends StatelessWidget {
  const _LecteurVide();

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(
        color: Cp.navy,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Cp.gold.withValues(alpha: 0.5)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(children: [
            Container(
              width: 72,
              height: 72,
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Cp.gold.withValues(alpha: 0.5)),
              ),
              child: const Icon(Icons.headphones_outlined, color: Cp.gold, size: 36),
            ),
            const SizedBox(width: Cp.s1),
            Expanded(
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(color: Cp.gold, borderRadius: BorderRadius.circular(8)),
                  child: Text(tr('LECTEUR'), style: const TextStyle(color: Cp.navy, fontSize: 11, fontWeight: FontWeight.w800)),
                ),
                const SizedBox(height: 6),
                Text(tr('Aucun audio pour le moment'), style: t.titleMedium?.copyWith(color: Colors.white, fontWeight: FontWeight.w700)),
                const SizedBox(height: 2),
                Text(tr('Le lecteur s\'activera dès qu\'un audio sera publié par la structure.'), style: t.bodyMedium?.copyWith(color: Colors.white.withValues(alpha: 0.7))),
              ]),
            ),
          ]),
          const SizedBox(height: Cp.s2),
          Container(
            height: 4,
            decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.2), borderRadius: BorderRadius.circular(2)),
          ),
          const SizedBox(height: 6),
          Row(children: [
            const Text('—', style: TextStyle(color: Colors.white70, fontSize: 12)),
            const Spacer(),
            IconButton(
              tooltip: tr('Lecture'),
              icon: const Icon(Icons.play_arrow_outlined, color: Colors.white38, size: 32),
              onPressed: null,
            ),
            const Spacer(),
            const Text('—', style: TextStyle(color: Colors.white70, fontSize: 12)),
          ]),
        ],
      ),
    );
  }
}

class TeachingsPage extends StatefulWidget {
  const TeachingsPage({super.key});

  @override
  State<TeachingsPage> createState() => _TeachingsPageState();
}

class _TeachingsPageState extends State<TeachingsPage> {
  Teaching? _editingTeaching;
  // Carte 53, 6 nov. 2026 : filtre de la liste, Tous par défaut.
  String _filtre = 'tous';

  List<Teaching> get _filtres => _filtre == 'tous'
      ? app.teachings
      : app.teachings.where((x) => x.kind == _filtre).toList();

  // Gestes repris dans le menu de la carte, tranche 2, 1er nov. 2026 :
  // mêmes feuilles et mêmes confirmations que la ligne sous la
  // tuile d'avant.
  void _modifierTeaching(BuildContext c, Teaching x) {
    final artistLabel = x.kind == 'musique'
        ? tr('Artiste')
        : x.kind == 'podcast'
            ? tr('Animateur')
            : tr('Orateur');
    audioFormSheet(c, x.kind == 'musique' ? tr('Modifier la musique') : x.kind == 'podcast' ? tr('Modifier le podcast') : tr('Modifier l’enseignement'), _teachingFields(x.kind, artistLabel, x), tr('Enregistrer'), (v, imagePath, audioPath, audioBytes, audioName) {
      final updated = Teaching(v['title']!, v['speaker']!, v['url']!, kind: x.kind, imagePath: imagePath, audioId: x.audioId, serverId: x.serverId, thematique: v['thematique'] ?? '', format: v['format'] ?? '', duree: v['duree'] ?? '', dateTexte: v['date'] ?? '', description: v['desc'] ?? '');
      final idx = app.teachings.indexOf(x);
      if (idx >= 0) {
        app.teachings[idx] = updated;
      } else {
        app.teachings.insert(0, updated);
      }
      app.changed();
      _updateTeachingServer(c, updated, audioPath: audioPath, audioBytes: audioBytes, audioName: audioName);
    });
  }

  Future<void> _supprimerTeaching(BuildContext c, Teaching x) async {
    final ok = await _confirmRetirer(c, tr('Supprimer cet enseignement ?'), tr('L’enseignement disparaîtra pour tous les membres.'));
    if (!ok) return;
    try {
      if (x.serverId.isNotEmpty) await api.deleteEnseignement(x.serverId);
      app.teachings.remove(x);
      app.changed();
      toast(c, tr('Enseignement supprimé.'));
    } catch (e) {
      toast(c, 'Suppression refusée ($e). Rôle administrateur général requis.');
    }
  }

  // Enseignements en défilement horizontal, tranche 2, 1er nov. 2026 :
  // mêmes données, même toucher que la tuile d'avant (lecteur, lien
  // ou message), bouton lecture visible, menu administrateur
  // général pour Modifier et Supprimer.
  Widget _teachingCarousel(BuildContext c) {
    final available = MediaQuery.of(c).size.width - 28;
    final cardWidth = (available * 0.82).clamp(220.0, 340.0).toDouble();
    void ouvrir(Teaching x) {
      if (x.url.isEmpty) {
        toast(c, tr('Audio non fourni par la structure.'));
      } else if (isPageLink(x.url)) {
        go(c, LinkViewPage(title: x.title, url: x.url));
      } else {
        go(c, AudioPlayerPage(teaching: x));
      }
    }
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            for (final x in _filtres) ...[
              SizedBox(
                width: cardWidth,
                child: Card(
                  clipBehavior: Clip.antiAlias,
                  child: InkWell(
                    onTap: () => ouvrir(x),
                    child: Padding(
                      padding: const EdgeInsets.all(Cp.s2),
                      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Row(children: [
                          // Carte 115, 9 nov. 2026 : pochette de
                          // l'audio, image choisie ou logo.
                          audioPochette(x, 40),
                          const SizedBox(width: Cp.s1),
                          Expanded(child: Text(x.title, style: Theme.of(c).textTheme.titleMedium)),
                          // Carte 53 : téléchargement hors ligne, dans
                          // la liste comme dans le lecteur.
                          _BoutonTelechargementAudio(teaching: x),
                          IconButton(
                            tooltip: tr('Écouter'),
                            icon: const Icon(Icons.play_arrow_outlined, color: Cp.goldDeep),
                            onPressed: () => ouvrir(x),
                          ),
                          if (app.isAdminGeneral)
                            PopupMenuButton<String>(
                              tooltip: tr('Actions'),
                              icon: const Icon(Icons.more_vert, color: Cp.navy),
                              onSelected: (v) async {
                                if (v == 'sur_place') setState(() => _editingTeaching = x);
                                if (v == 'modifier') _modifierTeaching(c, x);
                                if (v == 'supprimer') await _supprimerTeaching(c, x);
                              },
                              itemBuilder: (_) => [
                                PopupMenuItem(value: 'sur_place', child: Text(tr('Modifier sur place'))),
                                PopupMenuItem(value: 'modifier', child: Text(tr('Modifier'))),
                                PopupMenuItem(value: 'supprimer', child: Text(tr('Supprimer'))),
                              ],
                            ),
                        ]),
                        const SizedBox(height: 2),
                        Text(x.metaLine.isEmpty ? (x.kind == 'musique' ? 'Musique · Écouter' : tr('Écouter')) : x.metaLine, style: Theme.of(c).textTheme.bodyMedium),
                        if (_editingTeaching == x) ...[
                          const SizedBox(height: Cp.s1),
                          _TeachingEditPanel(
                            key: ValueKey(x),
                            teaching: x,
                            onClose: () => setState(() => _editingTeaching = null),
                          ),
                        ],
                      ]),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 12),
            ],
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return live((c) => basic(tr('Enseignements'), [
          if (app.isAdminGeneral)
            Padding(
              padding: const EdgeInsets.only(bottom: Cp.s1),
              child: SizedBox(
                width: double.infinity,
                height: 52,
                child: FilledButton.icon(
                  icon: const Icon(Icons.add),
                  label: Text(tr('Ajouter')),
                  onPressed: () => publierEnseignement(c),
                ),
              ),
            ),
          // Carte 70, 6 nov. 2026 : les filtres et le lecteur
          // s'affichent même quand il n'y a rien, la page ne reste
          // jamais vide. Le lecteur vide n'invente aucun titre,
          // aucune pochette, aucune durée : pochette neutre, bouton
          // lecture désactivé, barre à zéro.
          // Carte 84, 7 nov. 2026 : filtre en déroulant fermé,
          // pas une rangée de puces, pour ne pas charger l'écran.
          // Le choix reste visible, le menu s'ouvre au toucher.
          DropdownButtonFormField<String>(
            value: _filtre,
            isExpanded: true,
            items: [
              for (final f in const [
                ('tous', 'Tous'),
                ('enseignement', 'Enseignements'),
                ('podcast', 'Podcasts'),
                ('musique', 'Musique'),
              ])
                DropdownMenuItem(value: f.$1, child: Text(tr(f.$2))),
            ],
            onChanged: (v) => setState(() => _filtre = v ?? 'tous'),
            decoration: InputDecoration(
              labelText: tr('Catégorie'),
              filled: true,
              fillColor: Cp.card,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
            ),
          ),
          const SizedBox(height: Cp.s1),
          if (_filtres.isEmpty) ...[
            const _LecteurVide(),
            if (app.teachings.isEmpty)
              EmptyNote(
                icon: Icons.headphones_outlined,
                text: tr('Aucun enseignement publié pour le moment. Un administrateur peut en ajouter depuis cette page.'),
              )
            else
              EmptyNote(icon: Icons.headphones_outlined, text: tr('Rien dans cette catégorie pour le moment.')),
          ] else
            _teachingCarousel(c),
        ]));
  }
}

// Carte 113, 9 nov. 2026 : playlist, tous les audios de
// l'application, enseignements, musiques et podcasts, dans
// l'ordre de la liste des enseignements, jamais inventés.
List<Teaching> playlistAudios(List<Teaching> audios) => List.of(audios);

// Nombre d'audios par type, pour le résumé de la playlist.
Map<String, int> playlistComptes(List<Teaching> audios) {
  final comptes = <String, int>{};
  for (final a in audios) {
    comptes[a.kind] = (comptes[a.kind] ?? 0) + 1;
  }
  return comptes;
}

// Résumé court, par exemple « 12 audios · 5 enseignements ·
// 4 musiques · 3 podcasts », seuls les types présents sont
// cités, jamais un type absent.
String playlistResume(List<Teaching> audios) {
  final n = audios.length;
  if (n == 0) return tr('Aucun audio');
  final comptes = playlistComptes(audios);
  final parties = <String>['$n ${n == 1 ? tr('audio') : tr('audios')}'];
  for (final kind in const ['enseignement', 'musique', 'podcast']) {
    final c = comptes[kind] ?? 0;
    if (c == 0) continue;
    final label = kind == 'musique'
        ? (c == 1 ? tr('musique') : tr('musiques'))
        : kind == 'podcast'
            ? (c == 1 ? tr('podcast') : tr('podcasts'))
            : (c == 1 ? tr('enseignement') : tr('enseignements'));
    parties.add('$c $label');
  }
  return parties.join(' · ');
}

// Pochette de la playlist : le premier audio qui a une image,
// sinon rien, et c'est alors le logo de la structure qui
// s'affiche (carte 115, même logique).
Teaching? playlistPochette(List<Teaching> audios) {
  for (final a in audios) {
    if (hasContentImage(a.imagePath, a.imageUrl)) return a;
  }
  return null;
}

// Titre au hasard, pour le bouton Aléatoire : un élément de
// la liste, jamais un titre inventé.
Teaching? playlistAleatoire(List<Teaching> audios, [Random? hasard]) {
  if (audios.isEmpty) return null;
  return audios[(hasard ?? Random()).nextInt(audios.length)];
}

// Playlist, 9 nov. 2026 : écran doux façon Apple Music, aux
// couleurs de la structure, bleu nuit, or, fond papier.
// Grande pochette, boutons Lecture et Aléatoire, liste des
// titres avec miniature et durée, mini lecteur en bas, déjà
// affiché partout par l'application tant qu'un audio joue.
// Un audio sans image prend le logo de la structure en
// pochette (carte 115, même logique), jamais une icône seule.
class PlaylistPage extends StatelessWidget {
  const PlaylistPage({super.key});

  void _ouvrir(BuildContext c, Teaching x) {
    if (x.url.isEmpty) {
      toast(c, tr('Audio non fourni par la structure.'));
    } else if (isPageLink(x.url)) {
      go(c, LinkViewPage(title: x.title, url: x.url));
    } else {
      go(c, AudioPlayerPage(teaching: x));
    }
  }

  Widget _pochetteAudio(Teaching x, double taille) {
    if (hasContentImage(x.imagePath, x.imageUrl)) {
      return ClipRRect(
        borderRadius: BorderRadius.circular(12),
        child: SizedBox(width: taille, height: taille, child: contentImage(x.imagePath, x.imageUrl, height: taille)),
      );
    }
    return Container(
      width: taille,
      height: taille,
      decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(12)),
      child: const Padding(
        padding: EdgeInsets.all(8),
        child: WebAssetImage(asset: 'assets/logo.png', partUrls: kLogoParts, fit: BoxFit.contain),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final audios = playlistAudios(app.teachings);
      final pochette = playlistPochette(audios);
      final largeur = MediaQuery.of(c).size.width;
      final grande = (largeur - 96).clamp(200.0, 280.0);
      return basic(tr('Playlist'), [
        if (audios.isEmpty) ...[
          const _LecteurVide(),
          EmptyNote(icon: Icons.queue_music_outlined, text: tr('Aucun audio publié pour le moment.')),
        ] else ...[
          Container(
            width: double.infinity,
            padding: const EdgeInsets.fromLTRB(24, 28, 24, 28),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF0B1F3A), Color(0xFF12294D)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: Cp.gold.withValues(alpha: 0.35)),
              boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.15), blurRadius: 24, offset: const Offset(0, 8))],
            ),
            child: Column(children: [
              // Grande pochette : la première image de la liste,
              // sinon le logo de la structure, jamais vide.
              if (pochette != null)
                ClipRRect(
                  borderRadius: BorderRadius.circular(24),
                  child: SizedBox(width: grande, height: grande, child: contentImage(pochette.imagePath, pochette.imageUrl, height: grande)),
                )
              else
                Container(
                  width: grande,
                  height: grande,
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.08),
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(color: Cp.gold.withValues(alpha: 0.5)),
                  ),
                  child: const Padding(
                    padding: EdgeInsets.all(28),
                    child: WebAssetImage(asset: 'assets/logo.png', partUrls: kLogoParts, fit: BoxFit.contain),
                  ),
                ),
              const SizedBox(height: Cp.s2),
              Text(
                tr('Playlist'),
                textAlign: TextAlign.center,
                style: const TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w800, height: 1.2),
              ),
              const SizedBox(height: 4),
              Text(
                playlistResume(audios),
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.white.withValues(alpha: 0.7), fontSize: 14),
              ),
              const SizedBox(height: Cp.s2),
              Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                FilledButton.icon(
                  onPressed: () => _ouvrir(c, audios.first),
                  icon: const Icon(Icons.play_arrow_outlined, color: Cp.navy),
                  label: Text(tr('Lecture'), style: const TextStyle(color: Cp.navy, fontWeight: FontWeight.w800)),
                  style: FilledButton.styleFrom(backgroundColor: Cp.gold, padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12)),
                ),
                const SizedBox(width: 12),
                OutlinedButton.icon(
                  onPressed: () {
                    final x = playlistAleatoire(audios);
                    if (x != null) _ouvrir(c, x);
                  },
                  icon: const Icon(Icons.shuffle_outlined, color: Colors.white),
                  label: Text(tr('Aléatoire'), style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700)),
                  style: OutlinedButton.styleFrom(side: BorderSide(color: Colors.white.withValues(alpha: 0.6)), padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12)),
                ),
              ]),
            ]),
          ),
          const SizedBox(height: Cp.s2),
          for (final x in audios)
            ListTile(
              leading: _pochetteAudio(x, 56),
              title: Text(x.title, maxLines: 2, overflow: TextOverflow.ellipsis),
              subtitle: Text([x.kindLabel, x.speaker, x.duree].where((v) => v.isNotEmpty).join(' · '), maxLines: 1, overflow: TextOverflow.ellipsis),
              trailing: const Icon(Icons.play_arrow_outlined, color: Cp.goldDeep),
              onTap: () => _ouvrir(c, x),
            ),
        ],
      ]);
    });
  }
}

// Lecteur audio premium d'un enseignement, 28 oct. 2026 : carte bleu nuit
// et or, grande pochette, gros bouton lecture central, retour et avance
// de 10 secondes, vitesse de lecture, reprise au début, barre de
// progression or. Mêmes fonctions qu'avant, lecture, pause, reprise,
// avance et retour de 10 secondes, barre de progression, durée.
// Le fichier vient de la structure (serveur) ; il n'est jamais inventé.
/// Mini lecteur, visible dans toute l'application tant qu'un
/// enseignement ou une musique joue. Un toucher rouvre le grand
/// lecteur, le bouton central met en pause ou reprend, la croix
/// arrête la lecture.
class MiniPlayerBar extends StatelessWidget {
  const MiniPlayerBar({super.key});

  @override
  Widget build(BuildContext context) {
    final teaching = app.currentTeaching;
    if (teaching == null) return const SizedBox.shrink();
    return Container(
      color: Cp.navy,
      padding: const EdgeInsets.symmetric(horizontal: Cp.s1, vertical: 8),
      child: Row(children: [
        // Carte 115, 9 nov. 2026 : la pochette de l'audio en
        // cours, image choisie ou logo de la structure.
        audioPochette(teaching, 40, rayon: 10),
        const SizedBox(width: 10),
        Expanded(
          child: InkWell(
            onTap: () => go(context, AudioPlayerPage(teaching: teaching)),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                Expanded(child: Text(teaching.title, overflow: TextOverflow.ellipsis, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700))),
                if (app.currentTeachingHorsLigne) ...[
                  const SizedBox(width: 6),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(color: Cp.gold, borderRadius: BorderRadius.circular(8)),
                    child: Text(tr('Hors ligne'), style: const TextStyle(color: Cp.navy, fontSize: 10, fontWeight: FontWeight.w800)),
                  ),
                ],
              ]),
              if (teaching.speaker.isNotEmpty)
                Text(teaching.speaker, overflow: TextOverflow.ellipsis, style: TextStyle(color: Colors.white.withValues(alpha: 0.7), fontSize: 12)),
            ]),
          ),
        ),
        StreamBuilder<PlayerState>(
          stream: app.bgPlayer.playerStateStream,
          builder: (c, snap) {
            final playing = snap.data?.playing ?? false;
            return IconButton(
              tooltip: playing ? tr('Pause') : tr('Lecture'),
              icon: Icon(playing ? Icons.pause_outlined : Icons.play_arrow_outlined, color: Cp.gold),
              onPressed: playing ? app.bgPlayer.pause : app.bgPlayer.play,
            );
          },
        ),
        IconButton(
          tooltip: tr('Arrêter'),
          icon: const Icon(Icons.close_outlined, color: Colors.white),
          onPressed: () async {
            await app.bgPlayer.stop();
            app.currentTeaching = null;
            app.changed();
          },
        ),
      ]),
    );
  }
}


/// Annonces fusionnées, 1er nov. 2026 : une seule tuile
/// « Publier une annonce » dans l'Espace structure, un seul
/// formulaire (Audio, Vidéo ou Lien) et une seule page de
/// gestion. Les tables serveur ne changent pas : l'audio va
/// dans annonces-audio, la vidéo et le lien dans cartes-video
/// (la carte lien ouvre le lien dans l'application, comme
/// une carte vidéo). Aucune nouvelle route serveur. Côté
/// membre, rien ne change : carte audio avec lecteur,
/// carte vidéo ou lien avec ouverture du lien, fermetures
/// locales inchangées. L'édition des enseignements se fait désormais
/// dans la page Enseignements, tranche doublons stricte.
void _programmerAnnonce(BuildContext c, AnnonceAudio a) {
  var prog = a.programmeeLe;
  showModalBottomSheet(
    context: c,
    isScrollControlled: true,
    backgroundColor: Cp.paper,
    shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(Cp.radiusCard))),
    builder: (ctx) => Padding(
      padding: EdgeInsets.fromLTRB(Cp.s2, Cp.s2, Cp.s2, MediaQuery.of(ctx).viewInsets.bottom + Cp.s2),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(tr('Programmer cette annonce'), style: Theme.of(ctx).textTheme.titleLarge),
          const SizedBox(height: Cp.s2),
          SchedulePickerRow(initial: a.programmeeLe, onChanged: (v) => prog = v),
          const SizedBox(height: Cp.s1),
          SizedBox(
            width: double.infinity,
            height: 52,
            child: FilledButton(
              onPressed: () async {
                Navigator.pop(ctx);
                try {
                  if (prog == null && a.programmeeLe != null) {
                    await api.updateAnnonceAudio(a.serverId, annulerProgrammation: true);
                  } else if (prog != null) {
                    await api.updateAnnonceAudio(a.serverId, programmeeLe: prog);
                  } else {
                    return;
                  }
                  a.programmeeLe = prog;
                  app.changed();
                  toast(c, prog == null ? tr('Annonce publiée immédiatement.') : '${tr('Annonce programmée pour le')} ${formatDateHeure(prog!)}');
                } catch (e) {
                  if (c.mounted) toast(c, 'Modification refusée ($e). Rôle administrateur général requis.');
                }
              },
              child: Text(tr('Enregistrer')),
            ),
          ),
        ],
      ),
    ),
  );
}

void _modifierCarteVideo(BuildContext c, CarteVideo v) {
  formSheet(c, tr('Modifier la carte vidéo'), [
    F('title', tr('Titre'), initial: v.title),
    F('texte', tr('Explication'), optional: true, lines: 2, initial: v.explication),
    F('url', tr('Lien vidéo'), initial: v.videoUrl),
  ], tr('Enregistrer'), (nv) async {
    final titre = (nv['title'] ?? '').trim();
    final lien = (nv['url'] ?? '').trim();
    if (titre.isEmpty || lien.isEmpty) {
      toast(c, tr('Le titre et le lien vidéo sont requis.'));
      return;
    }
    try {
      await api.updateCarteVideo(v.serverId, titre: titre, explication: (nv['texte'] ?? '').trim(), lienVideo: lien);
    } catch (e) {
      if (c.mounted) toast(c, 'Modification refusée ($e). Rôle administrateur général requis.');
      return;
    }
    final updated = CarteVideo(titre, (nv['texte'] ?? '').trim(), lien, serverId: v.serverId);
    final ai = app.cartesVideoAdmin.indexWhere((x) => x.serverId == v.serverId);
    if (ai >= 0) app.cartesVideoAdmin[ai] = updated;
    final mi = app.cartesVideo.indexWhere((x) => x.serverId == v.serverId);
    if (mi >= 0) app.cartesVideo[mi] = updated;
    app.changed();
    if (c.mounted) toast(c, tr('Carte vidéo modifiée.'));
  });
}

Future<void> _publierAnnonceFusion(BuildContext c) async {
  final type = await pick<String>(c, tr('Quel type d’annonce ?'), [tr('Audio'), tr('Vidéo'), tr('Lien')], (s) => s);
  if (type == null || !c.mounted) return;
  if (type == tr('Audio')) {
    audioFormSheet(c, tr('Nouvelle annonce audio'), [
      F('title', tr('Titre')),
      F('texte', tr('Texte court'), optional: true, lines: 2),
      F('url', tr('Lien audio'), optional: true),
    ], tr('Publier'), (v, _, audioPath, audioBytes, audioName) {
      unawaited(_publishAnnonce(c, v, audioPath: audioPath, audioBytes: audioBytes, audioName: audioName));
    }, programmer: true);
  } else if (type == tr('Vidéo')) {
    formSheet(c, tr('Nouvelle carte vidéo'), [
      F('title', tr('Titre')),
      F('texte', tr('Explication'), optional: true, lines: 2),
      F('url', tr('Lien vidéo')),
    ], tr('Publier'), (v) {
      unawaited(_publishCarteVideo(c, v));
    });
  } else {
    formSheet(c, tr('Nouvelle annonce par lien'), [
      F('title', tr('Titre')),
      F('texte', tr('Explication'), optional: true, lines: 2),
      F('url', tr('Lien externe')),
    ], tr('Publier'), (v) {
      unawaited(_publishCarteVideo(c, v, parLien: true));
    });
  }
}

class AnnoncesPage extends StatelessWidget {
  const AnnoncesPage({super.key});

  @override
  Widget build(BuildContext context) {
    return live((c) => basic(tr('Publier une annonce'), [
          if (!app.isAdminGeneral)
            EmptyNote(icon: Icons.shield_outlined, text: tr('Réservé à l’administrateur général.'))
          else ...[
            Padding(
              padding: const EdgeInsets.only(bottom: Cp.s1),
              child: SizedBox(
                width: double.infinity,
                height: 52,
                child: FilledButton.icon(
                  icon: const Icon(Icons.add),
                  label: Text(tr('Publier une annonce')),
                  onPressed: () => _publierAnnonceFusion(c),
                ),
              ),
            ),
            Text(tr('Annonces audio'), style: Theme.of(c).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
            Text(tr('Visible sur l’accueil jusqu’à écoute ou fermeture avec le X, ou retrait ici.'), style: Theme.of(c).textTheme.bodyMedium),
            const SizedBox(height: Cp.s1),
            if (app.annoncesAudioAdmin.isEmpty)
              EmptyNote(icon: Icons.campaign_outlined, text: tr('Aucune annonce audio publiée pour le moment.'))
            else
              for (final a in app.annoncesAudioAdmin) ...[
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(Cp.s2),
                    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Text(a.title, style: Theme.of(c).textTheme.titleMedium),
                      if (a.text.isNotEmpty) ...[const SizedBox(height: 2), Text(a.text, style: Theme.of(c).textTheme.bodyMedium)],
                      if (a.programmeeLe != null && a.programmeeLe!.isAfter(DateTime.now())) ...[
                        const SizedBox(height: 2),
                        Text(formatProgramme(a.programmeeLe!), style: Theme.of(c).textTheme.bodyMedium?.copyWith(color: Cp.goldDeep, fontWeight: FontWeight.w700)),
                      ],
                      const SizedBox(height: Cp.s1),
                      Row(children: [
                        TextButton.icon(
                          icon: const Icon(Icons.play_arrow_outlined, size: 18),
                          label: Text(tr('Écouter')),
                          onPressed: () async {
                            if (!await app.toggleAnnonce(a) && c.mounted) {
                              toast(c, tr('Impossible de lire cet audio. Vérifiez votre connexion, puis réessayez.'));
                            }
                          },
                        ),
                        TextButton.icon(
                          icon: const Icon(Icons.calendar_month_outlined, size: 18),
                          label: Text(tr('Programmer')),
                          onPressed: () => _programmerAnnonce(c, a),
                        ),
                        TextButton.icon(
                          icon: const Icon(Icons.delete_outline, size: 18),
                          label: Text(tr('Retirer')),
                          onPressed: () async {
                            final ok = await _confirmRetirer(c, tr('Retirer cette annonce ?'), tr('L’annonce disparaîtra pour tous les membres.'));
                            if (!ok || !c.mounted) return;
                            try {
                              await api.deleteAnnonceAudio(a.serverId);
                            } catch (e) {
                              if (c.mounted) toast(c, 'Retrait refusé ($e). Rôle administrateur général requis.');
                              return;
                            }
                            app.annoncesAudio.remove(a);
                            app.annoncesAudioAdmin.remove(a);
                            app.changed();
                            if (c.mounted) toast(c, tr('Annonce retirée pour tous les membres.'));
                          },
                        ),
                      ]),
                    ]),
                  ),
                ),
              ],
            const SizedBox(height: Cp.s2),
            Text(tr('Cartes vidéo et liens'), style: Theme.of(c).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
            Text(tr('Visible sur l’accueil des membres connectés, sur téléphone seulement, jusqu’à fermeture avec le X, ou retrait ici.'), style: Theme.of(c).textTheme.bodyMedium),
            const SizedBox(height: Cp.s1),
            if (app.cartesVideoAdmin.isEmpty)
              EmptyNote(icon: Icons.ondemand_video_outlined, text: tr('Aucune carte vidéo publiée pour le moment.'))
            else
              for (final v in app.cartesVideoAdmin) ...[
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(Cp.s2),
                    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Text(v.title, style: Theme.of(c).textTheme.titleMedium),
                      if (v.explication.isNotEmpty) ...[const SizedBox(height: 2), Text(v.explication, style: Theme.of(c).textTheme.bodyMedium)],
                      const SizedBox(height: Cp.s1),
                      Row(children: [
                        TextButton.icon(
                          icon: const Icon(Icons.play_arrow_outlined, size: 18),
                          label: Text(tr('Regarder')),
                          onPressed: () => go(c, LinkViewPage(title: v.title, url: v.videoUrl)),
                        ),
                        TextButton.icon(
                          icon: const Icon(Icons.edit_outlined, size: 18),
                          label: Text(tr('Modifier')),
                          onPressed: () => _modifierCarteVideo(c, v),
                        ),
                        TextButton.icon(
                          icon: const Icon(Icons.delete_outline, size: 18),
                          label: Text(tr('Retirer')),
                          onPressed: () async {
                            final ok = await _confirmRetirer(c, tr('Retirer cette carte ?'), tr('La carte disparaîtra pour tous les membres.'));
                            if (!ok || !c.mounted) return;
                            try {
                              await api.deleteCarteVideo(v.serverId);
                            } catch (e) {
                              if (c.mounted) toast(c, 'Retrait refusé ($e). Rôle administrateur général requis.');
                              return;
                            }
                            app.cartesVideo.removeWhere((x) => x.serverId == v.serverId);
                            app.cartesVideoAdmin.removeWhere((x) => x.serverId == v.serverId);
                            app.changed();
                            if (c.mounted) toast(c, tr('Carte vidéo retirée pour tous les membres.'));
                          },
                        ),
                      ]),
                    ]),
                  ),
                ),
              ],
          ],
        ]));
  }
}


/// Page Publier, carte 57, 6 nov. 2026 : une seule action
/// pour publier, le type se choisit dedans, enseignement,
/// actualité ou annonce. Les trois flux existants sont
/// appelés tels quels, jamais recopiés, et les trois listes
/// restent accessibles en dessous, sans tuile à part.
class PublierPage extends StatelessWidget {
  const PublierPage({super.key});

  @override
  Widget build(BuildContext context) {
    return live((c) {
      if (!app.isAdmin) {
        return basic(tr('Publier'), [
          EmptyNote(icon: Icons.shield_outlined, text: tr('Réservé aux administrateurs de la structure.')),
        ]);
      }
      final t = Theme.of(c).textTheme;
      return basic(tr('Publier'), [
        Text(tr('Un seul geste pour publier, choisissez le type.'), style: t.bodyMedium),
        const SizedBox(height: Cp.s2),
        SizedBox(
          width: double.infinity,
          height: 52,
          child: FilledButton.icon(
            icon: const Icon(Icons.headphones_outlined),
            label: Text(tr('Enseignement, musique ou podcast')),
            onPressed: () => publierEnseignement(c),
          ),
        ),
        const SizedBox(height: Cp.s1),
        SizedBox(
          width: double.infinity,
          height: 52,
          child: FilledButton.icon(
            icon: const Icon(Icons.article_outlined),
            label: Text(tr('Actualité')),
            onPressed: () => ajouterActualite(c),
          ),
        ),
        const SizedBox(height: Cp.s1),
        SizedBox(
          width: double.infinity,
          height: 52,
          child: FilledButton.icon(
            icon: const Icon(Icons.campaign_outlined),
            label: Text(tr('Annonce')),
            onPressed: () => _publierAnnonceFusion(c),
          ),
        ),
        const SizedBox(height: Cp.s2),
        Text(tr('Voir les publications'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
        const SizedBox(height: Cp.s1),
        Card(
          child: Column(children: [
            ListTile(leading: const Icon(Icons.headphones_outlined, color: Cp.navy), title: Text(tr('Enseignements')), trailing: const Icon(Icons.chevron_right_outlined), onTap: () => go(c, const TeachingsPage())),
            ListTile(leading: const Icon(Icons.article_outlined, color: Cp.navy), title: Text(tr('Actualités')), trailing: const Icon(Icons.chevron_right_outlined), onTap: () => go(c, const NewsPage())),
            ListTile(leading: const Icon(Icons.campaign_outlined, color: Cp.navy), title: Text(tr('Annonces')), trailing: const Icon(Icons.chevron_right_outlined), onTap: () => go(c, const AnnoncesPage())),
          ]),
        ),
      ]);
    });
  }
}


// Bouton de téléchargement hors ligne, carte 53, 6 nov. 2026 :
// sur le web, le bouton est masqué, avec la mention En ligne
// seulement ; ailleurs, il télécharge avec progression et
// annulation, puis affiche Hors ligne, avec suppression.
class _BoutonTelechargementAudio extends StatefulWidget {
  const _BoutonTelechargementAudio({required this.teaching, this.grand = false});
  final Teaching teaching;
  final bool grand;

  @override
  State<_BoutonTelechargementAudio> createState() => _BoutonTelechargementAudioState();
}

class _BoutonTelechargementAudioState extends State<_BoutonTelechargementAudio> {
  double? _progression;
  var _annuler = false;
  var _telecharge = false;
  var _charge = false;

  String get _nom => audioNomFichier(widget.teaching.serverId, widget.teaching.title);

  @override
  void initState() {
    super.initState();
    _verifier();
  }

  @override
  void didUpdateWidget(covariant _BoutonTelechargementAudio old) {
    super.didUpdateWidget(old);
    if (old.teaching.url != widget.teaching.url || old.teaching.serverId != widget.teaching.serverId) _verifier();
  }

  Future<void> _verifier() async {
    final ok = await audioEstTelecharge(_nom);
    if (mounted) setState(() {
      _telecharge = ok;
      _charge = true;
    });
  }

  Future<void> _telecharger() async {
    if (widget.teaching.url.isEmpty) {
      toast(context, tr('Audio non fourni par la structure.'));
      return;
    }
    setState(() {
      _progression = 0;
      _annuler = false;
    });
    final chemin = await telechargerAudio(widget.teaching.url, _nom,
        (p) {
          if (mounted) setState(() => _progression = p);
        },
        () => _annuler);
    if (!mounted) return;
    setState(() => _progression = null);
    if (chemin != null) {
      setState(() => _telecharge = true);
      toast(context, tr('Téléchargé, écoutable hors ligne.'));
    } else if (!_annuler) {
      toast(context, tr('Téléchargement impossible. Vérifiez votre connexion, puis réessayez.'));
    }
  }

  Future<void> _supprimer() async {
    final ok = await _confirmRetirer(context, tr('Supprimer le téléchargement ?'), tr('Le fichier sera supprimé de cet appareil, le contenu reste sur le serveur.'));
    if (!ok) return;
    await supprimerAudioTelecharge(_nom);
    if (mounted) setState(() => _telecharge = false);
  }

  @override
  Widget build(BuildContext context) {
    if (kIsWeb) return const SizedBox.shrink();
    if (!_charge) return const SizedBox(width: 40, height: 40);
    if (_progression != null) {
      return Row(mainAxisSize: MainAxisSize.min, children: [
        SizedBox(
          width: 28,
          height: 28,
          child: CircularProgressIndicator(value: _progression, color: Cp.gold, strokeWidth: 3),
        ),
        IconButton(
          tooltip: tr('Annuler'),
          icon: const Icon(Icons.close_outlined),
          onPressed: () => setState(() => _annuler = true),
        ),
      ]);
    }
    if (_telecharge) {
      return Row(mainAxisSize: MainAxisSize.min, children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
          decoration: BoxDecoration(color: Cp.gold, borderRadius: BorderRadius.circular(8)),
          child: Text(tr('Hors ligne'), style: const TextStyle(color: Cp.navy, fontSize: 10, fontWeight: FontWeight.w800)),
        ),
        IconButton(
          tooltip: tr('Supprimer le téléchargement'),
          icon: const Icon(Icons.delete_outline, size: 20),
          onPressed: _supprimer,
        ),
      ]);
    }
    if (widget.grand) {
      return SizedBox(
        width: double.infinity,
        height: 52,
        child: OutlinedButton.icon(
          icon: const Icon(Icons.download_outlined),
          label: Text(tr('Télécharger pour écouter hors ligne')),
          onPressed: _telecharger,
        ),
      );
    }
    return IconButton(
      tooltip: tr('Télécharger pour écouter hors ligne'),
      icon: const Icon(Icons.download_outlined),
      onPressed: _telecharger,
    );
  }
}

class AudioPlayerPage extends StatefulWidget {
  const AudioPlayerPage({super.key, required this.teaching});
  final Teaching teaching;

  @override
  State<AudioPlayerPage> createState() => _AudioPlayerPageState();
}

class _AudioPlayerPageState extends State<AudioPlayerPage> {
  AudioPlayer get _player => app.bgPlayer;
  String? _error;
  double _speed = 1.0;
  // Carte 53, 6 nov. 2026 : reprise, minuteur, lecture enchaînée.
  Duration? _reprise;
  Timer? _minuteur;
  int _minuteurMinutes = 0;
  var _arretFinEpisode = false;
  var _lectureEnchainee = false;
  var _horsLigne = false;
  StreamSubscription<PlayerState>? _etatSub;
  StreamSubscription<Duration>? _positionSub;
  DateTime _derniereSauvegarde = DateTime.fromMillisecondsSinceEpoch(0);

  static const _vitesses = [0.75, 1.0, 1.25, 1.5, 2.0];

  String _clePosition(Teaching t) =>
      'audio_position_${t.serverId.isNotEmpty ? t.serverId : t.title}';

  Future<void> _cycleSpeed() async {
    final i = _vitesses.indexOf(_speed);
    final next = _vitesses[(i + 1) % _vitesses.length];
    setState(() => _speed = next);
    await _player.setSpeed(next);
  }

  String _speedLabel() => _speed == 1.0 ? '1×' : '${_speed.toString().replaceAll('.', ',')}×';

  // File d'écoute : les 3 suivants du même type et du même
  // orateur, sinon du même type. Jamais l'épisode en cours.
  List<Teaching> get _aSuivre {
    final memes = app.teachings
        .where((x) => x.url != widget.teaching.url && x.kind == widget.teaching.kind && x.speaker == widget.teaching.speaker)
        .toList();
    final memeType = app.teachings
        .where((x) => x.url != widget.teaching.url && x.kind == widget.teaching.kind && x.speaker != widget.teaching.speaker)
        .toList();
    return [...memes, ...memeType].take(3).toList();
  }

  // Épisodes d'un podcast : plusieurs du même orateur, avec un
  // titre de série commun, sinon l'épisode seul.
  List<Teaching> get _episodes {
    if (widget.teaching.kind != 'podcast') return [widget.teaching];
    final serie = app.teachings
        .where((x) => x.kind == 'podcast' && x.speaker == widget.teaching.speaker)
        .toList();
    return serie.isEmpty ? [widget.teaching] : serie;
  }

  Future<void> _chargerPreferences() async {
    final prefs = await SharedPreferences.getInstance();
    final secondes = prefs.getInt(_clePosition(widget.teaching)) ?? 0;
    if (secondes > 5) _reprise = Duration(seconds: secondes);
    _lectureEnchainee = prefs.getBool('audio_lecture_enchainee') ?? false;
    if (mounted) setState(() {});
  }

  Future<void> _sauvegarderPosition(Duration pos) async {
    final maintenant = DateTime.now();
    if (maintenant.difference(_derniereSauvegarde).inSeconds < 5) return;
    _derniereSauvegarde = maintenant;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt(_clePosition(widget.teaching), pos.inSeconds);
  }

  Future<void> _effacerPosition() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_clePosition(widget.teaching));
  }

  @override
  void initState() {
    super.initState();
    // Carte 97 : ouvrir un enseignement arrête l'audio du
    // chapitre Bible, pour ne jamais jouer deux audios en même temps.
    verseTts.stop();
    onRequestStopChapterAudio?.call();
    _chargerPreferences();
    _init();
    _etatSub = _player.playerStateStream.listen((s) async {
      if (s.processingState == ProcessingState.completed) {
        _effacerPosition();
        // Carte 111 et 113, 9 nov. 2026 : à la fin d'un audio,
        // la barre revient au début, sans relancer tout seul.
        // La lecture enchaînée, elle, passe au suivant.
        await _player.seek(Duration.zero);
        if (_arretFinEpisode) return;
        if (_lectureEnchainee && _aSuivre.isNotEmpty && mounted) {
          go(context, AudioPlayerPage(teaching: _aSuivre.first));
        }
      }
    });
    _positionSub = _player.positionStream.listen((pos) {
      if (_player.playing) _sauvegarderPosition(pos);
    });
  }

  @override
  void dispose() {
    _minuteur?.cancel();
    _etatSub?.cancel();
    _positionSub?.cancel();
    super.dispose();
  }


  Future<void> _init() async {
    try {
      if (app.currentTeaching?.url != widget.teaching.url) {
        app.stopAnnonceTracking();
        app.currentTeaching = widget.teaching;
        // Hors ligne d'abord : si le fichier téléchargé est là,
        // on le lit, même sans connexion.
        var horsLigne = false;
        if (!kIsWeb) {
          final chemin = await audioCheminLocal(
              audioNomFichier(widget.teaching.serverId, widget.teaching.title));
          if (chemin != null) {
            await _player.setFilePath(chemin);
            horsLigne = true;
          }
        }
        if (!horsLigne) await playStreamingUrl(_player, widget.teaching.url);
        app.currentTeachingHorsLigne = horsLigne;
        if (mounted) setState(() => _horsLigne = horsLigne);
        app.changed();
        await _player.play();
      } else {
        if (mounted) setState(() => _horsLigne = app.currentTeachingHorsLigne);
      }
    } catch (_) {
      if (mounted) setState(() => _error = tr('Impossible de lire cet audio. Vérifiez votre connexion, puis réessayez.'));
    }
  }

  Future<void> _choisirMinuteur() async {
    final choix = await pick<int>(context, tr('Minuteur d’arrêt'), [15, 30, 45, 60], (v) => '$v ${tr('minutes')}');
    if (choix == null) return;
    _minuteur?.cancel();
    setState(() => _minuteurMinutes = choix);
    _minuteur = Timer(Duration(minutes: choix), () async {
      await _player.pause();
      if (mounted) setState(() => _minuteurMinutes = 0);
    });
  }

  String _fmt(Duration? d) {
    if (d == null) return '0:00';
    final m = d.inMinutes;
    final sec = d.inSeconds % 60;
    return '$m:${sec.toString().padLeft(2, '0')}';
  }

  String _fmtRestant(Duration? total, Duration pos) {
    if (total == null) return '0:00';
    final reste = total - pos;
    return '-${_fmt(reste.isNegative ? Duration.zero : reste)}';
  }

  @override
  Widget build(BuildContext context) {
    if (_error != null) {
      return basic(widget.teaching.title, [
        EmptyNote(icon: Icons.error_outline, text: _error!),
      ]);
    }
    final largeur = MediaQuery.of(context).size.width;
    final pochette = (largeur - 96).clamp(200.0, 280.0);
    return basic(widget.teaching.title, [
      Container(
        width: double.infinity,
        padding: const EdgeInsets.fromLTRB(24, 28, 24, 28),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Color(0xFF0B1F3A), Color(0xFF12294D)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: Cp.gold.withValues(alpha: 0.35)),
          boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.15), blurRadius: 24, offset: const Offset(0, 8))],
        ),
        child: Column(children: [
          // Pochette carrée, coins 24, ombre douce.
          if (hasContentImage(widget.teaching.imagePath, widget.teaching.imageUrl))
            ClipRRect(
              borderRadius: BorderRadius.circular(24),
              child: SizedBox(width: pochette, height: pochette, child: contentImage(widget.teaching.imagePath, widget.teaching.imageUrl, height: pochette)),
            )
          else
            // Carte 115, 9 nov. 2026 : sans image, le logo de la
            // structure, jamais une icône seule. Même présentation
            // que la grande pochette de la playlist (carte 113).
            Container(
              width: pochette,
              height: pochette,
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: Cp.gold.withValues(alpha: 0.5)),
              ),
              child: const Padding(
                padding: EdgeInsets.all(28),
                child: WebAssetImage(asset: 'assets/logo.png', partUrls: kLogoParts, fit: BoxFit.contain),
              ),
            ),
          const SizedBox(height: Cp.s2),
          // Badge du type, avec icône distincte.
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(color: Cp.gold, borderRadius: BorderRadius.circular(20)),
            child: Row(mainAxisSize: MainAxisSize.min, children: [
              Icon(widget.teaching.kindIcon, size: 14, color: Cp.navy),
              const SizedBox(width: 6),
              Text(widget.teaching.kindLabel.toUpperCase(), style: const TextStyle(color: Cp.navy, fontSize: 12, fontWeight: FontWeight.w800, letterSpacing: 2)),
              if (_horsLigne) ...[
                const SizedBox(width: 8),
                const Icon(Icons.download_done_outlined, size: 14, color: Cp.navy),
                const SizedBox(width: 4),
                Text(tr('Hors ligne').toUpperCase(), style: const TextStyle(color: Cp.navy, fontSize: 12, fontWeight: FontWeight.w800)),
              ],
            ]),
          ),
          const SizedBox(height: Cp.s1),
          Text(
            widget.teaching.title,
            textAlign: TextAlign.center,
            style: const TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w800, height: 1.2),
          ),
          if (widget.teaching.speaker.isNotEmpty) ...[
            const SizedBox(height: 4),
            Text(
              widget.teaching.speaker,
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.white.withValues(alpha: 0.75), fontSize: 16),
            ),
          ],
          if (widget.teaching.dateTexte.isNotEmpty || widget.teaching.duree.isNotEmpty) ...[
            const SizedBox(height: 4),
            Text(
              [widget.teaching.dateTexte, widget.teaching.duree].where((v) => v.isNotEmpty).join(' · '),
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.white.withValues(alpha: 0.6), fontSize: 13),
            ),
          ],
          // Reprendre où on s'était arrêté, proposée, jamais imposée.
          if (_reprise != null) ...[
            const SizedBox(height: Cp.s1),
            TextButton.icon(
              icon: const Icon(Icons.history_outlined, color: Cp.gold),
              label: Text('${tr('Reprendre à')} ${_fmt(_reprise)}', style: const TextStyle(color: Cp.gold)),
              onPressed: () async {
                await _player.seek(_reprise!);
                if (mounted) setState(() => _reprise = null);
              },
            ),
          ],
          const SizedBox(height: Cp.s2),
          StreamBuilder<Duration?>(
            stream: _player.durationStream,
            builder: (c, durSnap) {
              final total = durSnap.data;
              return StreamBuilder<Duration>(
                stream: _player.positionStream,
                builder: (c, posSnap) {
                  final pos = posSnap.data ?? Duration.zero;
                  final max = total?.inMilliseconds.toDouble() ?? 1.0;
                  final value = pos.inMilliseconds.toDouble().clamp(0.0, max);
                  return Column(children: [
                    SliderTheme(
                      data: SliderTheme.of(context).copyWith(
                        activeTrackColor: Cp.gold,
                        inactiveTrackColor: Colors.white.withValues(alpha: 0.25),
                        thumbColor: Cp.gold,
                        thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 11),
                        overlayColor: Cp.gold.withValues(alpha: 0.2),
                      ),
                      child: Slider(
                        value: total == null ? 0 : value,
                        max: max,
                        onChanged: total == null ? null : (v) => _player.seek(Duration(milliseconds: v.round())),
                      ),
                    ),
                    Row(children: [
                      Text(_fmt(pos), style: const TextStyle(color: Colors.white, fontSize: 14)),
                      const Spacer(),
                      Text(_fmtRestant(total, pos), style: TextStyle(color: Colors.white.withValues(alpha: 0.7), fontSize: 14)),
                    ]),
                  ]);
                },
              );
            },
          ),
          const SizedBox(height: Cp.s2),
          Row(mainAxisAlignment: MainAxisAlignment.center, children: [
            SizedBox(
              width: 56,
              height: 56,
              child: IconButton(
                tooltip: tr('Reculer de 15 secondes'),
                iconSize: 32,
                color: Colors.white,
                icon: const Icon(Icons.fast_rewind_outlined),
                onPressed: () async {
                  final pos = await _player.position;
                  await _player.seek(pos - const Duration(seconds: 15));
                },
              ),
            ),
            const SizedBox(width: Cp.s2),
            StreamBuilder<PlayerState>(
              stream: _player.playerStateStream,
              builder: (c, snap) {
                final playing = snap.data?.playing ?? false;
                return GestureDetector(
                  onTap: playing ? _player.pause : _player.play,
                  child: Container(
                    width: 76,
                    height: 76,
                    decoration: const BoxDecoration(color: Cp.gold, shape: BoxShape.circle),
                    child: Icon(
                      playing ? Icons.pause_outlined : Icons.play_arrow_outlined,
                      size: 40,
                      color: Cp.navy,
                    ),
                  ),
                );
              },
            ),
            const SizedBox(width: Cp.s2),
            SizedBox(
              width: 56,
              height: 56,
              child: IconButton(
                tooltip: tr('Avancer de 15 secondes'),
                iconSize: 32,
                color: Colors.white,
                icon: const Icon(Icons.fast_forward_outlined),
                onPressed: () async {
                  final pos = await _player.position;
                  await _player.seek(pos + const Duration(seconds: 15));
                },
              ),
            ),
          ]),
          const SizedBox(height: Cp.s2),
          Wrap(alignment: WrapAlignment.center, spacing: 8, children: [
            TextButton(
              onPressed: _cycleSpeed,
              child: Text('${tr('Vitesse')} ${_speedLabel()}', style: const TextStyle(color: Colors.white)),
            ),
            TextButton(
              onPressed: () => _player.seek(Duration.zero),
              child: Text(tr('Reprendre au début'), style: const TextStyle(color: Colors.white)),
            ),
          ]),
          const SizedBox(height: Cp.s1),
          // Minuteur d'arrêt et lecture enchaînée.
          Wrap(alignment: WrapAlignment.center, spacing: 8, children: [
            TextButton.icon(
              icon: const Icon(Icons.timer_outlined, color: Cp.gold, size: 18),
              label: Text(
                _minuteurMinutes > 0
                    ? '${tr('Minuteur')} $_minuteurMinutes ${tr('min')}'
                    : tr('Minuteur d’arrêt'),
                style: const TextStyle(color: Colors.white),
              ),
              onPressed: _choisirMinuteur,
            ),
            if (_minuteurMinutes > 0)
              TextButton(
                onPressed: () {
                  _minuteur?.cancel();
                  setState(() => _minuteurMinutes = 0);
                },
                child: Text(tr('Annuler'), style: const TextStyle(color: Colors.white)),
              ),
            Row(mainAxisSize: MainAxisSize.min, children: [
              Switch(
                value: _arretFinEpisode,
                activeColor: Cp.gold,
                onChanged: (v) => setState(() => _arretFinEpisode = v),
              ),
              Text(tr('Fin de l’épisode'), style: const TextStyle(color: Colors.white, fontSize: 13)),
            ]),
            Row(mainAxisSize: MainAxisSize.min, children: [
              Switch(
                value: _lectureEnchainee,
                activeColor: Cp.gold,
                onChanged: (v) async {
                  setState(() => _lectureEnchainee = v);
                  final prefs = await SharedPreferences.getInstance();
                  await prefs.setBool('audio_lecture_enchainee', v);
                },
              ),
              Text(tr('Lecture enchaînée'), style: const TextStyle(color: Colors.white, fontSize: 13)),
            ]),
          ]),
          const SizedBox(height: Cp.s1),
          // Téléchargement hors ligne, masqué sur le web.
          if (kIsWeb)
            Text(tr('Téléchargement hors ligne : en ligne seulement sur le web.'), textAlign: TextAlign.center, style: TextStyle(color: Colors.white.withValues(alpha: 0.6), fontSize: 12))
          else
            _BoutonTelechargementAudio(teaching: widget.teaching, grand: true),
        ]),
      ),
      // Description, quand la structure en a écrit une.
      if (widget.teaching.description.isNotEmpty) ...[
        const SizedBox(height: Cp.s2),
        Text(widget.teaching.description, style: Theme.of(context).textTheme.bodyMedium),
      ],
      // Épisodes du podcast, quand il y en a plusieurs.
      if (_episodes.length > 1) ...[
        const SizedBox(height: Cp.s2),
        Text(tr('Épisodes'), style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
        const SizedBox(height: Cp.s1),
        for (final ep in _episodes)
          ListTile(
            // Carte 115, 9 nov. 2026 : pochette de l'épisode,
            // image choisie ou logo de la structure.
            leading: audioPochette(ep, 48),
            title: Text(ep.title, maxLines: 2, overflow: TextOverflow.ellipsis),
            subtitle: ep.speaker.isEmpty ? null : Text(ep.speaker, maxLines: 1, overflow: TextOverflow.ellipsis),
            trailing: ep.url == widget.teaching.url ? const Icon(Icons.play_arrow_outlined, color: Cp.goldDeep) : const Icon(Icons.chevron_right_outlined),
            onTap: ep.url == widget.teaching.url ? null : () => go(context, AudioPlayerPage(teaching: ep)),
          ),
      ],
      // File d'écoute À suivre.
      if (_aSuivre.isNotEmpty) ...[
        const SizedBox(height: Cp.s2),
        Text(tr('À suivre'), style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
        const SizedBox(height: Cp.s1),
        for (final suivant in _aSuivre)
          ListTile(
            // Carte 115, 9 nov. 2026 : pochette du titre suivant,
            // image choisie ou logo de la structure.
            leading: audioPochette(suivant, 48),
            title: Text(suivant.title, maxLines: 2, overflow: TextOverflow.ellipsis),
            subtitle: Text([suivant.speaker, suivant.duree].where((v) => v.isNotEmpty).join(' · '), maxLines: 1, overflow: TextOverflow.ellipsis),
            trailing: const Icon(Icons.play_arrow_outlined, color: Cp.goldDeep),
            onTap: () => go(context, AudioPlayerPage(teaching: suivant)),
          ),
      ],
    ]);
  }
}

class PrayerPage extends StatefulWidget {
  const PrayerPage({super.key});

  @override
  State<PrayerPage> createState() => _PrayerPageState();
}

class _PrayerPageState extends State<PrayerPage> {
  final _text = TextEditingController();

  @override
  void dispose() {
    _text.dispose();
    super.dispose();
  }

  Future<void> _send() async {
    final body = _text.text.trim();
    if (body.isEmpty) {
      toast(context, tr('Écrivez votre sujet de prière.'));
      return;
    }
    if (body.length > 2000) {
      toast(context, tr('Votre sujet est trop long.'));
      return;
    }
    if (!api.isConnected) {
      toast(context, tr('Connectez-vous pour envoyer un sujet de prière.'));
      return;
    }
    // Envoi direct par le serveur, 31 oct. 2026 : plus de messagerie
    // du membre, aucun enregistrement, aucune publication. L’envoi
    // reste en ligne seulement : sans connexion, le serveur ne peut
    // pas être joint et aucun e-mail ne part.
    try {
      await api.envoyerSujetPriere(body);
      if (!mounted) return;
      _text.clear();
      toast(context, tr('Votre sujet de prière a été envoyé à la structure.'));
    } on ApiException catch (e) {
      if (mounted) toast(context, e.message);
    } catch (_) {
      if (mounted) toast(context, tr('Connexion internet requise pour envoyer un sujet de prière.'));
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(tr('Prière'), [
      Text(tr('Sujet de prière'), style: t.titleLarge),
      const SizedBox(height: Cp.s1),
      Text(tr('Votre sujet part par e-mail vers la structure. Il reste privé : il n’est ni enregistré dans l’application, ni publié.'),
          style: t.bodyMedium),
      const SizedBox(height: Cp.s3),
      TextField(
        controller: _text,
        minLines: 6,
        maxLines: 10,
        decoration: InputDecoration(
          hintText: tr('Écrivez votre sujet…'),
          filled: true,
          fillColor: Cp.card,
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
        ),
      ),
      const SizedBox(height: Cp.s2),
      SizedBox(
        height: 56,
        child: FilledButton.icon(
          onPressed: _send,
          icon: const Icon(Icons.mail_outline),
          label: Text(tr('Envoyer par e-mail'), style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
        ),
      ),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════════════
// 9. CAMPS, ÉTABLISSEMENTS, ACTUALITÉS, BUREAU
// ═══════════════════════════════════════════════════════════════════

// ── Pages Structure, modèle web, 27 oct. 2026 ─────────────────────
// Filtres, noms d'établissements et carte à bordure pointillée,
// communs aux pages Camps, Établissements et Bureau, pour garder
// le même design et le même emplacement que sur les captures web.

// Filtres fixes du prototype : Tous, Structure, puis les trois
// établissements, dans cet ordre, jamais un autre nom inventé.
const List<String> kEtabFilters = [
  'Tous',
  'Structure',
  'Groupe Scolaire ISPAM',
  'Groupe Scolaire Céleste',
  'Collège La Silhouette',
  'BNC',
];

// Noms courts historiques de la liste locale, ramenés aux noms
// complets du prototype, sans changer les autres noms.
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

// Pastilles de filtre du prototype : fond bleu nuit et texte or
// quand la pastille est choisie, fond blanc et texte bleu nuit sinon.
Widget filterChips(List<String> options, String selected, void Function(String) onSelect) {
  return Wrap(
    spacing: 8,
    runSpacing: 8,
    children: [
      for (final o in options)
        InkWell(
          onTap: () => onSelect(o),
          borderRadius: BorderRadius.circular(24),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            decoration: BoxDecoration(
              color: o == selected ? Cp.navy : Colors.white,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: Cp.line, width: 1),
            ),
            child: Text(o,
                style: TextStyle(
                    color: o == selected ? Cp.gold : Cp.navy,
                    fontSize: 16,
                    fontWeight: FontWeight.w700)),
          ),
        ),
    ],
  );
}

// Barre de filtres horizontale, page Le Bureau, 28 oct. 2026 :
// les six filtres (Tous, Structure, ISPAM, Céleste, La
// Silhouette, BNC) tenaient trop de place en Wrap vertical.
// Ici, une seule ligne défilante de 44 px de haut, pastille
// active bleu nuit avec texte or, inactive blanche avec texte
// bleu nuit, taille 14, cible tactile 40 px. La logique de
// filtrage, elle, ne change pas.
Widget filterChipsHorizontal(List<String> options, String selected, void Function(String) onSelect) {
  return SizedBox(
    height: 44,
    child: SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(children: [
        for (final o in options) ...[
          InkWell(
            onTap: () => onSelect(o),
            borderRadius: BorderRadius.circular(24),
            child: Container(
              height: 40,
              padding: const EdgeInsets.symmetric(horizontal: 14),
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: o == selected ? Cp.navy : Colors.white,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: Cp.line, width: 1),
              ),
              child: Text(o,
                  style: TextStyle(
                      color: o == selected ? Cp.gold : Cp.navy,
                      fontSize: 14,
                      fontWeight: FontWeight.w700)),
            ),
          ),
          const SizedBox(width: 8),
        ],
      ]),
    ),
  );
}

// Action de création d'un responsable du Bureau, déjà présente
// dans l'Espace structure, factorisée ici pour être réutilisée
// par la page Le Bureau, sans nouvelle fonctionnalité : même
// formulaire, mêmes champs, même ajout local, mêmes permissions
// (tuile réservée à l'administrateur général, bouton réservé
// aux administrateurs sur la page).
// Formulaire Bureau, 3 nov. 2026 : nom, fonction, contact,
// accord pour afficher le contact, et établissement choisi sur
// le serveur. Structure veut dire sans établissement, jamais
// ISPAM par défaut. Enregistrement serveur, jamais local seul :
// en cas d'échec, aucune entrée fantôme n'est créée.
Future<void> _bureauFormSheet(BuildContext c, {BureauMember? existant}) async {
  final nomC = TextEditingController(text: existant?.name ?? '');
  final fonctionC = TextEditingController(text: existant?.role ?? '');
  final contactC = TextEditingController(text: existant?.contact ?? '');
  var consent = existant?.consent ?? false;
  var etabId = existant?.etablissementId ?? '';
  final etabsServeur = app.etabs.where((e) => e.id.isNotEmpty).toList();
  var enCours = false;
  String? erreur;
  await showDialog(
    context: c,
    builder: (ctx) => StatefulBuilder(
      builder: (ctx, setDialog) => AlertDialog(
        title: Text(existant == null ? tr('Nouveau responsable') : tr('Modifier le responsable')),
        content: SingleChildScrollView(
          child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.stretch, children: [
            TextField(controller: nomC, decoration: InputDecoration(labelText: tr('Nom'))),
            const SizedBox(height: Cp.s1),
            TextField(controller: fonctionC, decoration: InputDecoration(labelText: tr('Fonction'))),
            const SizedBox(height: Cp.s1),
            TextField(controller: contactC, decoration: InputDecoration(labelText: tr('Contact'))),
            const SizedBox(height: Cp.s1),
            DropdownButtonFormField<String>(
              value: etabId,
              decoration: InputDecoration(labelText: tr('Établissement')),
              items: [
                DropdownMenuItem(value: '', child: Text(tr('Structure'))),
                for (final e in etabsServeur) DropdownMenuItem(value: e.id, child: Text(etabDisplayName(e.name))),
              ],
              onChanged: (v) => setDialog(() => etabId = v ?? ''),
            ),
            CheckboxListTile(
              value: consent,
              onChanged: (v) => setDialog(() => consent = v ?? false),
              title: Text(tr('Accord pour afficher le contact ?')),
              contentPadding: EdgeInsets.zero,
            ),
            if (erreur != null) Text(erreur!, style: const TextStyle(color: Cp.danger)),
          ]),
        ),
        actions: [
          TextButton(onPressed: enCours ? null : () => Navigator.pop(ctx), child: Text(tr('Annuler'))),
          FilledButton(
            onPressed: enCours
                ? null
                : () async {
                    final nom = nomC.text.trim();
                    final fonction = fonctionC.text.trim();
                    if (nom.isEmpty || fonction.isEmpty) {
                      setDialog(() => erreur = tr('Saisis un nom et une fonction.'));
                      return;
                    }
                    setDialog(() {
                      enCours = true;
                      erreur = null;
                    });
                    try {
                      final corps = <String, dynamic>{
                        'nom': nom,
                        'fonction': fonction,
                        'contact': contactC.text.trim().isEmpty ? null : contactC.text.trim(),
                        'contact_public': consent,
                        'etablissement_id': etabId.isEmpty ? null : etabId,
                      };
                      if (existant == null || existant.serverId.isEmpty) {
                        await api.creerBureau(corps);
                      } else {
                        await api.modifierBureau(existant.serverId, corps);
                      }
                      if (ctx.mounted) Navigator.pop(ctx);
                      if (c.mounted) {
                        toast(c, existant == null ? tr('Responsable ajouté.') : tr('Responsable modifié.'));
                        unawaited(app.syncFromServer());
                      }
                    } catch (e) {
                      setDialog(() {
                        enCours = false;
                        erreur = e.toString();
                      });
                    }
                  },
            child: Text(enCours ? tr('En cours…') : tr('Enregistrer')),
          ),
        ],
      ),
    ),
  );
}

void addBureauMember(BuildContext c) {
  unawaited(_bureauFormSheet(c));
}

// Bordure pointillée du prototype, pour la carte Structure (tous)
// et l'annuaire vide du Bureau. Flutter n'a pas de bordure
// pointillée native, elle est donc dessinée ici, sans paquet ajouté.
class _DashedBorderPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Cp.line
      ..strokeWidth = 1
      ..style = PaintingStyle.stroke;
    final rect = RRect.fromRectAndRadius(Offset.zero & size, const Radius.circular(24));
    final path = Path()..addRRect(rect);
    var dashed = Path();
    for (final metric in path.computeMetrics()) {
      var distance = 0.0;
      while (distance < metric.length) {
        final segment = metric.extractPath(distance, distance + 6);
        dashed.addPath(segment, Offset.zero);
        distance += 12;
      }
    }
    canvas.drawPath(dashed, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class DashedCard extends StatelessWidget {
  const DashedCard({super.key, required this.child});
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: _DashedBorderPainter(),
      child: Container(
        padding: const EdgeInsets.all(Cp.s3),
        child: child,
      ),
    );
  }
}

// Titre de page du prototype : grand titre bleu nuit, puis
// sous-titre gris, avec un bouton or à droite quand il y en a un.
Widget pageTitleRow(ThemeData theme, String title, String subtitle, {Widget? action}) {
  return Row(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Expanded(
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(title, style: theme.textTheme.titleLarge?.copyWith(fontSize: 32, fontWeight: FontWeight.w800, color: Cp.navy)),
          const SizedBox(height: 4),
          Text(subtitle, style: theme.textTheme.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 16)),
        ]),
      ),
      if (action != null) ...[const SizedBox(width: 12), action],
    ],
  );
}

// Bouton or du prototype, texte bleu nuit, comme les boutons
// + Événement, + Établissement et + Ajouter.
Widget goldButton({required IconData icon, required String label, required VoidCallback onPressed}) {
  return FilledButton.icon(
    onPressed: onPressed,
    style: FilledButton.styleFrom(
      backgroundColor: Cp.gold,
      foregroundColor: Cp.navy,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
    ),
    icon: Icon(icon, size: 20),
    label: Text(label, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
  );
}

// Titre de section du prototype : barre or verticale à gauche,
// puis le titre en gras bleu nuit.
Widget sectionHeading(String title, TextTheme t) {
  return Row(children: [
    Container(width: 4, height: 28, color: Cp.gold),
    const SizedBox(width: 12),
    Expanded(child: Text(title, style: t.titleLarge?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
  ]);
}

/// Panneau d'edition dans la carte, tranche 3, 1er nov. 2026 : nom,
/// lieu, description et tarif seulement, les dates avec le selecteur
/// de plage, l'image et le drapeau Kairos restent dans la feuille
/// complete. La sauvegarde reprend exactement le chemin existant
/// (_updateCampServer, sans plage, donc les dates structurees
/// restent inchangees), donc la route serveur et les gardes ne
/// changent pas.
class _CampEditPanel extends StatefulWidget {
  const _CampEditPanel({super.key, required this.camp, required this.onClose});
  final Camp camp;
  final VoidCallback onClose;

  @override
  State<_CampEditPanel> createState() => _CampEditPanelState();
}

class _CampEditPanelState extends State<_CampEditPanel> {
  late final TextEditingController _nom;
  late final TextEditingController _lieu;
  late final TextEditingController _desc;
  late final TextEditingController _tarif;
  // Carte 109, 8 nov. 2026 : pays où se tient l'activité, liste
  // des 13 pays, sans pays par défaut, facultatif.
  late String _pays;
  var _saving = false;

  @override
  void initState() {
    super.initState();
    final camp = widget.camp;
    _nom = TextEditingController(text: camp.name);
    _lieu = TextEditingController(text: camp.place);
    _pays = camp.pays;
    _desc = TextEditingController(text: camp.description);
    _tarif = TextEditingController(text: camp.tariff);
  }

  @override
  void dispose() {
    _nom.dispose();
    _lieu.dispose();
    _desc.dispose();
    _tarif.dispose();
    super.dispose();
  }

  InputDecoration _decoration(String label) => InputDecoration(
        labelText: label,
        filled: true,
        fillColor: Cp.card,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
      );

  Widget _field(TextEditingController ctrl, String label, {int lines = 1}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: Cp.s1),
      child: TextField(
        controller: ctrl,
        maxLines: lines,
        keyboardType: lines > 1 ? TextInputType.multiline : TextInputType.text,
        decoration: _decoration(label),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final camp = widget.camp;
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(
        color: Cp.paper,
        borderRadius: BorderRadius.circular(Cp.radiusCard),
        border: Border.all(color: Cp.gold.withValues(alpha: 0.4)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(tr('Modifier sur place'), style: t.titleMedium),
          const SizedBox(height: Cp.s1),
          _field(_nom, tr('Nom du camp')),
          _field(_lieu, tr('Lieu')),
          // Carte 109, 8 nov. 2026 : pays où se tient l'activité,
          // juste après le lieu. La valeur actuelle est gardée
          // même si elle n'est plus dans la liste des 13 pays.
          DropdownButtonFormField<String>(
            value: _pays.isEmpty ? null : _pays,
            items: [
              DropdownMenuItem(value: '', child: Text(tr('Aucun pays'))),
              for (final p in kPaysResidence) DropdownMenuItem(value: p, child: Text(p)),
              if (_pays.isNotEmpty && !kPaysResidence.contains(_pays)) DropdownMenuItem(value: _pays, child: Text(_pays)),
            ],
            onChanged: (v) => setState(() => _pays = v ?? ''),
            isExpanded: true,
            decoration: _decoration('${tr('Pays')} (facultatif)'),
          ),
          const SizedBox(height: Cp.s1),
          _field(_desc, tr('Description'), lines: 3),
          _field(_tarif, tr('Tarif')),
          Row(children: [
            Expanded(
              child: FilledButton(
                onPressed: _saving
                    ? null
                    : () async {
                        final nom = _nom.text.trim();
                        if (nom.isEmpty) return;
                        setState(() => _saving = true);
                        // Carte 109, 8 nov. 2026 : pays avant la
                        // modification, pour savoir si l'effacer.
                        final paysAvant = camp.pays;
                        camp
                          ..name = nom
                          ..place = _lieu.text.trim()
                          ..pays = _pays
                          ..description = _desc.text.trim()
                          ..tariff = _tarif.text.trim();
                        app.changed();
                        await _updateCampServer(context, camp, paysAvant: paysAvant);
                        if (!mounted) return;
                        widget.onClose();
                      },
                child: Text(_saving ? 'Enregistrement…' : tr('Enregistrer')),
              ),
            ),
            const SizedBox(width: Cp.s1),
            Expanded(
              child: OutlinedButton(
                onPressed: _saving ? null : widget.onClose,
                child: Text(tr('Annuler')),
              ),
            ),
          ]),
        ],
      ),
    );
  }
}

class CampsPage extends StatefulWidget {
  const CampsPage({super.key});

  @override
  State<CampsPage> createState() => _CampsPageState();
}

class _CampRegistrationPage extends StatefulWidget {
  const _CampRegistrationPage({required this.camp, required this.memberName, required this.memberMatricule});
  final Camp camp;
  final String memberName;
  final String memberMatricule;
  @override
  State<_CampRegistrationPage> createState() => _CampRegistrationPageState();
}

class _CampRegistrationPageState extends State<_CampRegistrationPage> {
  int _participants = 1;
  String _hebergement = 'Sans hébergement';
  String _repas = 'Sans repas';
  String _transport = 'Par ses propres moyens';

  Widget _choice(String label, String value, List<String> options, void Function(String?) onChanged) {
    return DropdownButtonFormField<String>(
      value: value,
      decoration: InputDecoration(labelText: label, filled: true, fillColor: Cp.card, border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile))),
      items: [for (final o in options) DropdownMenuItem(value: o, child: Text(o))],
      onChanged: onChanged,
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(widget.camp.name, [
      Text('Inscription pour ${widget.memberName} (${widget.memberMatricule}).', style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      DropdownButtonFormField<int>(
        value: _participants,
        decoration: InputDecoration(labelText: tr('Participants'), filled: true, fillColor: Cp.card, border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile))),
        items: [for (var i = 1; i <= 10; i++) DropdownMenuItem(value: i, child: Text(i == 1 ? '1 personne' : '$i personnes'))],
        onChanged: (v) => setState(() => _participants = v ?? 1),
      ),
      const SizedBox(height: Cp.s1),
      _choice(tr('Hébergement'), _hebergement, const ['Sans hébergement', 'Dortoir collectif'], (v) => setState(() => _hebergement = v ?? _hebergement)),
      const SizedBox(height: Cp.s1),
      _choice(tr('Repas'), _repas, const ['Sans repas', 'Pension complète'], (v) => setState(() => _repas = v ?? _repas)),
      const SizedBox(height: Cp.s1),
      _choice(tr('Transport'), _transport, const ['Par ses propres moyens', 'Car de la structure'], (v) => setState(() => _transport = v ?? _transport)),
      const SizedBox(height: Cp.s2),
      SizedBox(
        width: double.infinity,
        height: 52,
        child: FilledButton(
          onPressed: () => Navigator.of(context).pop({'participants': _participants, 'hebergement': _hebergement, 'repas': _repas, 'transport': _transport}),
          child: Text(tr('Confirmer l’inscription et générer mon pass')),
        ),
      ),
      const SizedBox(height: Cp.s1),
      SizedBox(
        width: double.infinity,
        height: 52,
        child: OutlinedButton(
          onPressed: () => Navigator.of(context).pop(),
          child: Text(tr('Annuler')),
        ),
      ),
    ]);
  }
}

class _CampsPageState extends State<CampsPage> {
  String _filter = 'Tous';
  int? _editingCampId;
  // Liste d'attente de camp, tranche 6, 2 nov. 2026 : camps pour
  // lesquels le membre a déjà rejoint la file pendant cette
  // session, pour masquer le bouton après un succès. Le serveur
  // reste le contrôle des doublons, cette liste n'est qu'un
  // affichage local, effacé à la fermeture.
  final Set<String> _listeAttenteJointe = {};
  // Calendrier mensuel, lot 1, 31 oct. 2026 : faux par défaut, la
  // liste reste la vue d'arrivée, le calendrier est un choix.
  bool _vueCalendrier = false;

  Registration? _reg(Camp camp) {
    final m = app.member;
    if (m == null) return null;
    for (final r in app.registrations) {
      if (r.camp.id == camp.id && r.member.matricule == m.matricule) return r;
    }
    return null;
  }

  bool _matchesFilter(Camp camp) {
    if (_filter == 'Tous') return true;
    if (_filter == 'Structure') return camp.scope == 'Structure' || camp.scope == 'Communauté';
    if (_filter == 'Communauté') return camp.scope == 'Structure' || camp.scope == 'Communauté';
    return camp.scope == _filter || etabDisplayName(camp.scope) == _filter;
  }

  // Paiement du camp en 6 fois, 31 oct. 2026 : une inscription
  // verrouillée ouvre la carte de progression, jamais le pass.
  void _ouvrirInscription(BuildContext c, Camp camp) {
    final reg = _reg(camp);
    if (reg == null) {
      _register(c, camp);
      return;
    }
    if (app.member != null && camp.serverId.isNotEmpty && app.fichesSanteEnAttente.contains(app.cleFicheEnAttente(app.member!.matricule, camp.serverId))) {
      _ouvrirFicheACompleter(c, reg);
      return;
    }
    if (reg.passVerrouille) {
      go(c, CampProgressPage(registration: reg));
      return;
    }
    go(c, PassPage(registration: reg));
  }

  // Fiche santé au moment de l'inscription, 31 oct. 2026 : après
  // une inscription, la fiche s'ouvre avant le pass. Si la fiche
  // existe déjà ou si le camp est terminé, le pass s'affiche
  // directement. Si le formulaire est fermé sans enregistrement,
  // la carte de l'inscription propose de compléter la fiche.
  Future<void> _etapeFicheSante(BuildContext c, Registration reg) async {
    final m = app.member;
    if (m == null || reg.camp.serverId.isEmpty || !api.isConnected) {
      _allerPass(c, reg);
      return;
    }
    final cle = app.cleFicheEnAttente(m.matricule, reg.camp.serverId);
    try {
      final data = await api.fetchMaFicheSante(reg.camp.serverId);
      if (!c.mounted) return;
      if (data['existe'] == true || data['fige'] == true) {
        _allerPass(c, reg);
        return;
      }
    } catch (_) {
      if (!c.mounted) return;
      // Échec de lecture en ligne : le formulaire affichera sa
      // propre erreur avec un nouvel essai, et la carte proposera
      // de compléter la fiche si l'utilisateur revient en arrière.
    }
    await app.marquerFicheSanteEnAttente(cle);
    if (!c.mounted) return;
    go(c, FicheSantePage(
      evenementId: reg.camp.serverId,
      campName: reg.camp.name,
      onEnregistree: (formCtx) async {
        await app.effacerFicheSanteEnAttente(cle);
        if (formCtx.mounted) Navigator.of(formCtx).pop();
        if (c.mounted) _allerPass(c, reg);
      },
    ));
  }

  void _allerPass(BuildContext c, Registration reg) {
    if (reg.passVerrouille) {
      go(c, CampProgressPage(registration: reg));
    } else {
      go(c, PassPage(registration: reg));
    }
  }

  // Reprise d'une fiche laissée en attente, depuis la carte de
  // l'inscription : après l'enregistrement, la carte redevient
  // le pass, sans navigation supplémentaire.
  void _ouvrirFicheACompleter(BuildContext c, Registration reg) {
    final m = app.member;
    if (m == null || reg.camp.serverId.isEmpty) return;
    final cle = app.cleFicheEnAttente(m.matricule, reg.camp.serverId);
    go(c, FicheSantePage(
      evenementId: reg.camp.serverId,
      campName: reg.camp.name,
      onEnregistree: (formCtx) async {
        await app.effacerFicheSanteEnAttente(cle);
        if (formCtx.mounted) Navigator.of(formCtx).pop();
      },
    ));
  }

  // Inscription, modèle web, 27 oct. 2026, listes de choix du
  // 29 oct. 2026 : le formulaire plein écran propose des choix,
  // plus de champs libres. Seules les valeurs vues sur les
  // captures du prototype sont proposées, rien d'inventé, sauf
  // le nombre de personnes, de 1 à 10, qui est un comptage.
  Future<void> _register(BuildContext c, Camp camp) async {
    if (!requireMember(c)) return;
    final m = app.member!;
    final result = await Navigator.of(c).push<Map<String, Object>>(
      MaterialPageRoute(builder: (_) => _CampRegistrationPage(camp: camp, memberName: m.name, memberMatricule: m.matricule)),
    );
    if (result == null || !c.mounted) return;
    final participants = (result['participants'] as int?) ?? 1;
    final hebergement = (result['hebergement'] as String?) ?? '';
    final repas = (result['repas'] as String?) ?? '';
    final transport = (result['transport'] as String?) ?? '';
    if (camp.serverId.isNotEmpty && api.isConnected) {
      try {
        final created = await api.registerForEvent(camp.serverId);
        final code = (created['code_pass'] ?? '').toString();
        // Paiement du camp en 6 fois, 31 oct. 2026 : pour un camp
        // payant, le pass reste masqué tant que la totalité n'est
        // pas validée, la carte de progression s'affiche à la place.
        var tarif = 0;
        var paye = 0;
        var valides = 0;
        var requis = false;
        var visible = true;
        int? montantSuivant;
        int? versementSuivant;
        String? attenteRef;
        int? attenteMontant;
        int? attenteNumero;
        final vers = created['versements'];
        if (vers is Map) {
          requis = vers['requis'] == true;
          tarif = (vers['tarif'] as num?)?.toInt() ?? 0;
          paye = (vers['paye'] as num?)?.toInt() ?? 0;
          valides = (vers['valides'] as num?)?.toInt() ?? 0;
          visible = !requis || paye >= tarif;
          montantSuivant = (vers['montant_suivant'] as num?)?.toInt();
          versementSuivant = (vers['suivant'] as num?)?.toInt();
          final att = vers['en_attente'];
          if (att is Map) {
            attenteRef = (att['reference'] ?? '').toString().isEmpty ? null : (att['reference'] ?? '').toString();
            attenteMontant = (att['montant_fcfa'] as num?)?.toInt();
            attenteNumero = (att['numero_versement'] as num?)?.toInt();
          }
        }
        final reg = Registration(camp, app.member!, DateTime.now(), codePass: code, participants: participants < 1 ? 1 : participants, hebergement: hebergement, repas: repas, transport: transport,
            tarif: tarif, montantPaye: paye, versementsValides: valides, versementsRequis: requis, passVisible: visible, montantSuivant: montantSuivant, versementSuivant: versementSuivant,
            versementEnAttenteRef: attenteRef, versementEnAttenteMontant: attenteMontant, versementEnAttenteNumero: attenteNumero);
        app.registrations.add(reg);
        app.changed();
        if (c.mounted) await _etapeFicheSante(c, reg);
        return;
      } on ApiException catch (e) {
        if (c.mounted) toast(c, e.message);
        return;
      } catch (_) {
        if (c.mounted) toast(c, tr('Serveur injoignable. Inscription non enregistrée.'));
        return;
      }
    }
    final reg = Registration(camp, app.member!, DateTime.now(), participants: participants < 1 ? 1 : participants, hebergement: hebergement, repas: repas, transport: transport);
    app.registrations.add(reg);
    app.changed();
    go(c, PassPage(registration: reg));
  }
  // Don de camp ou de retraite, 31 oct. 2026 : formulaire nom,
  // numéro ou e-mail, message facultatif. Celui qui offre doit
  // être membre, sinon le formulaire renvoie vers le profil. Le
  // serveur résout le bénéficiaire et renvoie le montant exact,
  // jamais ses données, puis le paiement suit le circuit existant.
  Future<void> _offrirCamp(BuildContext c, Camp camp) async {
    if (!requireMember(c)) return;
    final nomCtrl = TextEditingController();
    final contactCtrl = TextEditingController();
    final messageCtrl = TextEditingController();
    final ok = await showDialog<bool>(
      context: c,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Offrir ce camp')),
        content: SingleChildScrollView(
          child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(isEn ? 'Price: ${fcfa(camp.tarifFcfa)}' : 'Tarif : ${fcfa(camp.tarifFcfa)}', style: Theme.of(ctx).textTheme.bodyMedium),
            const SizedBox(height: Cp.s1),
            Text(tr('Si la personne est déjà inscrite, le don couvre son reste à payer.'), style: Theme.of(ctx).textTheme.bodyMedium),
            const SizedBox(height: Cp.s2),
            TextField(controller: nomCtrl, decoration: InputDecoration(labelText: tr('Nom du bénéficiaire'))),
            const SizedBox(height: Cp.s1),
            TextField(controller: contactCtrl, decoration: InputDecoration(labelText: tr('Numéro ou e-mail du bénéficiaire'))),
            const SizedBox(height: Cp.s1),
            TextField(controller: messageCtrl, decoration: InputDecoration(labelText: tr('Message pour le bénéficiaire (facultatif)')), maxLines: 3),
            const SizedBox(height: Cp.s1),
            Text(tr('Le bénéficiaire recevra son pass dès que la structure aura validé votre paiement.'), style: Theme.of(ctx).textTheme.bodyMedium),
          ]),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.of(ctx).pop(false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.of(ctx).pop(true), child: Text(tr('Continuer vers le paiement'))),
        ],
      ),
    );
    if (ok != true || !c.mounted) return;
    final nom = nomCtrl.text.trim();
    final contact = contactCtrl.text.trim();
    if (nom.length < 2 || contact.length < 6) {
      toast(c, tr('Indiquez le nom et le numéro ou l’e-mail du bénéficiaire.'));
      return;
    }
    try {
      final created = await api.createDonCamp(camp.serverId, nom, contact, messageCtrl.text.trim());
      if (!c.mounted) return;
      final montant = (created['montant_fcfa'] as num?)?.toInt() ?? camp.tarifFcfa;
      await startPayment(c, 'camp', montant, evenementId: camp.serverId, paiementExistant: created);
      await app.syncServerPayments();
    } on ApiException catch (e) {
      if (c.mounted) toast(c, e.message);
    } catch (_) {
      if (c.mounted) toast(c, tr('Serveur injoignable. Don non enregistré.'));
    }
  }


  // Modification d'un camp depuis le menu de la carte, tranche 2,
  // 1er nov. 2026 : même feuille que le bouton Modifier d'avant,
  // mêmes champs, même enregistrement serveur.
  void _modifierCamp(BuildContext c, Camp camp) {
    DateTimeRange? plage;
    // Carte 109, 8 nov. 2026 : pays avant la modification, pour
    // savoir si l'effacer, « Aucun pays » choisi, ou le garder.
    final paysAvant = camp.pays;
    imageFormSheet(c, tr('Modifier le camp'), [
      F('name', tr('Nom du camp'), initial: camp.name),
      F('dates', tr('Dates'), optional: true, initial: camp.dates, dateRange: true),
      F('place', tr('Lieu'), optional: true, initial: camp.place),
      // Carte 109, 8 nov. 2026 : pays où se tient l'activité,
      // juste après le lieu, même liste que la création.
      F('country', tr('Pays'), optional: true, initial: camp.pays, options: kPaysResidence, emptyLabel: tr('Aucun pays')),
      F('desc', tr('Description'), lines: 3, optional: true, initial: camp.description),
      F('tariff', tr('Tarif'), optional: true, initial: camp.tariff),
      F('kairos', tr('Camp National Kairos ? (oui / non)'), optional: true, initial: camp.kairos ? 'oui' : 'non'),
    ], tr('Enregistrer'), (v, imagePath) {
      if (imagePath != camp.imagePath) {
        camp.imagePath = imagePath;
        camp.imageUrl = '';
      }
      camp
        ..name = v['name']!
        ..dates = v['dates']!
        ..place = v['place']!
        ..pays = v['country']!
        ..description = v['desc']!
        ..tariff = v['tariff']!
        ..kairos = v['kairos']!.toLowerCase() == 'oui';
      if (plage != null) {
        camp.dateDebut = plage!.start;
        camp.dateFin = plage!.end;
      }
      app.changed();
      _updateCampServer(c, camp, plage: plage, paysAvant: paysAvant);
    }, initialImagePath: camp.imagePath, onDateRange: (r) => plage = r);
  }

  Future<void> _retirerCamp(BuildContext c, Camp camp) async {
    final ok = await _confirmRetirer(c, tr('Retirer ce camp ?'), tr('Le camp disparaîtra du catalogue. Les inscriptions déjà faites ne sont pas annulées côté serveur.'));
    if (ok) _unpublishCamp(c, camp);
  }

  // Menu de la carte de camp, tranche 2, 1er nov. 2026 : les actions
  // secondaires qui étaient sous la carte, mêmes gestes, mêmes
  // gardes. Rien n'est ajouté, rien n'est retiré, sauf la place :
  // un seul toucher depuis la carte, sans défiler. L'action
  // principale, S'inscrire ou Voir mon pass, reste visible sous
  // la carte. Sans action secondaire, pas de menu.
  Widget? _campMenuButton(BuildContext c, Camp camp) {
    final offrir = camp.serverId.isNotEmpty && camp.tarifFcfa > 0;
    final presences = app.isAdmin && camp.serverId.isNotEmpty;
    if (!app.isAdminGeneral && !presences && !offrir) return null;
    return PopupMenuButton<String>(
      tooltip: tr('Actions'),
      icon: const Icon(Icons.more_vert, color: Cp.navy),
      onSelected: (v) async {
        if (v == 'sur_place') {
          setState(() => _editingCampId = camp.id);
        } else if (v == 'modifier') {
          _modifierCamp(c, camp);
        } else if (v == 'retirer') {
          await _retirerCamp(c, camp);
        } else if (v == 'presences') {
          goAdmin(c, () => admin.PresenceListPage(activiteId: camp.serverId, activiteNom: camp.name));
        } else if (v == 'offrir') {
          _offrirCamp(c, camp);
        }
      },
      itemBuilder: (_) => [
        if (offrir) PopupMenuItem(value: 'offrir', child: Text(tr('Offrir ce camp'))),
        if (presences) PopupMenuItem(value: 'presences', child: Text(tr('Présences'))),
        if (app.isAdminGeneral) PopupMenuItem(value: 'sur_place', child: Text(tr('Modifier sur place'))),
        if (app.isAdminGeneral) PopupMenuItem(value: 'modifier', child: Text(tr('Modifier'))),
        if (app.isAdminGeneral) PopupMenuItem(value: 'retirer', child: Text(tr('Retirer'))),
      ],
    );
  }

  Widget _eventCard(BuildContext c, Camp camp) {
    final typeLabel = camp.type == 'retraite' ? 'RETRAITE' : 'CAMP';
    final menu = _campMenuButton(c, camp);
    return ClipRRect(
      borderRadius: BorderRadius.circular(24),
      child: InkWell(
        onTap: () => _ouvrirInscription(context, camp),
        child: Stack(children: [
          if (hasContentImage(camp.imagePath, camp.imageUrl))
            contentImage(camp.imagePath, camp.imageUrl, height: 280)
          else if (_isLocalRetreat(camp))
            Image.memory(base64Decode(kRetreatPosterBase64), height: 280, width: double.infinity, fit: BoxFit.cover, filterQuality: FilterQuality.high)
          else
            Container(
              height: 280,
              width: double.infinity,
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [Color(0xFF1B3A63), Cp.navy],
                ),
              ),
              child: const Center(child: Icon(Icons.change_history_outlined, color: Colors.white54, size: 64)),
            ),
          Positioned(
            top: 12,
            left: 12,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
              decoration: BoxDecoration(color: Cp.gold, borderRadius: BorderRadius.circular(20)),
              child: Text(typeLabel, style: const TextStyle(color: Cp.navy, fontSize: 12, fontWeight: FontWeight.w800, letterSpacing: 1)),
            ),
          ),
          if (menu != null)
            Positioned(
              top: 8,
              right: 8,
              child: Container(
                decoration: const BoxDecoration(color: Colors.white, shape: BoxShape.circle),
                child: menu,
              ),
            ),
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: Container(
              padding: const EdgeInsets.all(Cp.s2),
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [Colors.transparent, Colors.black54],
                ),
              ),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(camp.name, style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.w800)),
                const SizedBox(height: 4),
                Row(children: [
                  const Icon(Icons.calendar_today_outlined, color: Colors.white, size: 18),
                  const SizedBox(width: 6),
                  Text(orTbc(camp.dates), style: const TextStyle(color: Colors.white, fontSize: 14)),
                  const SizedBox(width: Cp.s2),
                  const Icon(Icons.location_on_outlined, color: Colors.white, size: 18),
                  const SizedBox(width: 6),
                  Expanded(child: Text(orTbc(camp.lieuPays), style: const TextStyle(color: Colors.white, fontSize: 14))),
                ]),
              ]),
            ),
          ),
        ]),
      ),
    );
  }

  // Contenu d'un camp dans le carrousel, tranche 2 : même carte,
  // mêmes infos, même bouton principal que la liste verticale
  // d'avant. Seules les actions secondaires ont déménagé dans le
  // menu de la carte.
  // Liste d'attente de camp, tranche 6, 2 nov. 2026 : le bouton
  // n'apparaît que si le camp est complet et qu'une capacité est
  // fixée, jamais sinon, et jamais pour un membre déjà inscrit.
  // Le serveur refuse aussi les doublons et les camps non complets.
  Future<void> _rejoindreListeAttente(BuildContext c, Camp camp) async {
    if (!requireMember(c)) return;
    if (camp.serverId.isEmpty || !api.isConnected) {
      toast(c, tr('Serveur injoignable. Demande non enregistrée.'));
      return;
    }
    try {
      await api.rejoindreListeAttente(camp.serverId);
      if (!c.mounted) return;
      setState(() => _listeAttenteJointe.add(camp.serverId));
      toast(c, tr('Demande enregistrée sur la liste d’attente.'));
    } on ApiException catch (e) {
      if (c.mounted) toast(c, e.message);
    } catch (_) {
      if (c.mounted) toast(c, tr('Serveur injoignable. Demande non enregistrée.'));
    }
  }

  Widget _campItem(BuildContext c, Camp camp) {
    final t = Theme.of(c).textTheme;
    final reg = _reg(camp);
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      _eventCard(c, camp),
      const SizedBox(height: Cp.s1),
      if (camp.tariff.isNotEmpty) ...[
        Text(isEn ? 'Price: ${camp.tariff}' : 'Tarif : ${camp.tariff}', style: t.bodyMedium),
        const SizedBox(height: Cp.s1),
      ],
      if (camp.description.isNotEmpty) ...[
        Text(camp.description, style: t.bodyMedium),
        const SizedBox(height: Cp.s1),
      ],
      if (camp.kairos) ...[
        Text(tr('Badge automatique à l’inscription.'), style: t.bodyMedium),
        const SizedBox(height: Cp.s1),
        // Compte à rebours Kairos, 3 nov. 2026 : fiche du camp
        // dans l'onglet Camps, cible serveur sinon 2027-08-22.
        KairosCountdown(dateDebut: camp.dateDebut, dateFin: camp.dateFin),
        const SizedBox(height: Cp.s1),
      ],
      SizedBox(
        width: double.infinity,
        height: 52,
        child: reg != null
            ? OutlinedButton(
                onPressed: () {
                  if (app.member != null && reg.camp.serverId.isNotEmpty && app.fichesSanteEnAttente.contains(app.cleFicheEnAttente(app.member!.matricule, reg.camp.serverId))) {
                    _ouvrirFicheACompleter(c, reg);
                  } else {
                    go(c, PassPage(registration: reg));
                  }
                },
                child: Text(camp.kairos ? tr('Voir mon badge') : tr('Voir mon pass')),
              )
            : FilledButton(
                onPressed: () => _register(c, camp),
                child: Text(tr('S’inscrire')),
              ),
      ),
      if (reg == null && app.member != null && camp.serverId.isNotEmpty && camp.complet && !_listeAttenteJointe.contains(camp.serverId)) ...[
        const SizedBox(height: Cp.s1),
        SizedBox(
          width: double.infinity,
          height: 52,
          child: OutlinedButton(
            onPressed: () => _rejoindreListeAttente(c, camp),
            child: Text(tr('Rejoindre la liste d’attente')),
          ),
        ),
      ],
      if (_editingCampId == camp.id) ...[
        const SizedBox(height: Cp.s1),
        _CampEditPanel(
          key: ValueKey('edit-camp-${camp.id}'),
          camp: camp,
          onClose: () => setState(() => _editingCampId = null),
        ),
      ],
    ]);
  }

  // Catalogue en défilement horizontal, tranche 2, 1er nov. 2026 :
  // mêmes cartes, mêmes données, mêmes gestes. La largeur laisse
  // dépasser la carte suivante pour signaler le défilement, comme
  // les carrousels de l'accueil. La vue Calendrier ne change pas.
  Widget _campsCarousel(BuildContext c, List<Camp> camps) {
    final available = MediaQuery.of(c).size.width - 28;
    final cardWidth = (available * 0.82).clamp(220.0, 340.0).toDouble();
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            for (final camp in camps) ...[
              SizedBox(width: cardWidth, child: _campItem(c, camp)),
              const SizedBox(width: 12),
            ],
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      final filtered = app.camps.where(_matchesFilter).toList();
      final myRegs = app.member == null
          ? <Registration>[]
          : app.registrations.where((r) => r.member.matricule == app.member!.matricule && filtered.any((camp) => camp.id == r.camp.id)).toList();
      return basic(tr('Camps & Retraites'), [
        pageTitleRow(
          Theme.of(c),
          tr('Camps & Retraites'),
          tr('Les camps et retraites de la structure : inscription et pass d’accès.'),
          action: app.isAdminGeneral
              ? goldButton(
                  icon: Icons.add,
                  label: tr('Événement'),
                  onPressed: () {
                    DateTimeRange? plage;
                    imageFormSheet(c, tr('Nouveau camp'), [
                      F('name', tr('Nom du camp')),
                      F('dates', tr('Dates'), optional: true, dateRange: true),
                      F('place', tr('Lieu'), optional: true),
                      // Carte 109, 8 nov. 2026 : pays où se tient
                      // l'activité, juste après le lieu, liste des
                      // 13 pays, sans pays par défaut, facultatif.
                      F('country', tr('Pays'), optional: true, initial: '', options: kPaysResidence, emptyLabel: tr('Aucun pays')),
                      F('desc', tr('Description'), lines: 3, optional: true),
                      F('tariff', tr('Tarif'), optional: true),
                      F('kairos', tr('Camp National Kairos ? (oui / non)'), optional: true),
                    ], tr('Publier'), (v, imagePath) {
                      final camp = Camp(id: app.nextId(), name: v['name']!, dates: v['dates']!, place: v['place']!,
                          pays: v['country']!,
                          tariff: v['tariff']!, kairos: v['kairos']!.toLowerCase() == 'oui', imagePath: imagePath, description: v['desc']!,
                          dateDebut: plage?.start, dateFin: plage?.end);
                      app.camps.add(camp);
                      app.changed();
                      _publishCamp(c, camp);
                    }, onDateRange: (r) => plage = r);
                  },
                )
              : null,
        ),
        const SizedBox(height: Cp.s2),
        filterChips(kEtabFilters, _filter, (v) => setState(() => _filter = v)),
        const SizedBox(height: Cp.s2),
        // Choix Liste ou Calendrier, lot 1, 31 oct. 2026 : le filtre
        // d'établissement s'applique aux deux vues, et la liste
        // reste exactement celle d'avant quand on revient dessus.
        Row(children: [
          Expanded(
            child: _vueCalendrier
                ? OutlinedButton(onPressed: () => setState(() => _vueCalendrier = false), child: Text(tr('Liste')))
                : FilledButton(onPressed: () => setState(() => _vueCalendrier = false), child: Text(tr('Liste'))),
          ),
          const SizedBox(width: Cp.s1),
          Expanded(
            child: _vueCalendrier
                ? FilledButton(onPressed: () => setState(() => _vueCalendrier = true), child: Text(tr('Calendrier')))
                : OutlinedButton(onPressed: () => setState(() => _vueCalendrier = true), child: Text(tr('Calendrier'))),
          ),
        ]),
        const SizedBox(height: Cp.s2),
        // Carte 57, 6 nov. 2026 : créer un camp, gérer ses
        // places et sa liste d'attente, une seule action,
        // la page Camps. La liste d'attente n'est plus une
        // ligne des Finances, elle s'ouvre d'ici.
        if (app.isAdminGeneral) ...[
          SizedBox(
            width: double.infinity,
            child: OutlinedButton.icon(
              icon: const Icon(Icons.list_alt_outlined),
              label: Text(tr('Listes d’attente')),
              onPressed: () => goAdmin(c, () => admin.ListeAttentePage()),
            ),
          ),
          const SizedBox(height: Cp.s2),
        ],
        if (_vueCalendrier)
          CampCalendarView(
            camps: filtered,
            etabs: app.etabs,
            filter: _filter,
            onCampTap: (c, camp) => _ouvrirInscription(c, camp),
            actionLabel: (camp) {
              final reg = _reg(camp);
              if (reg == null) return tr('S’inscrire');
              if (reg.passVerrouille) return tr('Voir mes versements');
              return camp.kairos ? tr('Voir mon badge') : tr('Voir mon pass');
            },
          )
        else if (filtered.isEmpty)
          EmptyNote(
            icon: Icons.change_history_outlined,
            text: tr('Aucun camp publié pour ce filtre. Dates, lieux et tarifs restent « À confirmer » tant que la structure ne les a pas fournis.'),
          )
        else
          _campsCarousel(c, filtered),
        const SizedBox(height: Cp.s3),
        sectionHeading(tr('Mes inscriptions & pass'), t),
        const SizedBox(height: Cp.s2),
        if (myRegs.isEmpty)
          Text(tr('Aucune inscription pour le moment. Inscrivez-vous à un camp pour recevoir votre pass.'), style: t.bodyMedium)
        else
          for (final reg in myRegs) ...[
            if (app.member != null && reg.camp.serverId.isNotEmpty && app.fichesSanteEnAttente.contains(app.cleFicheEnAttente(app.member!.matricule, reg.camp.serverId)))
              SizedBox(
                width: double.infinity,
                height: 52,
                child: FilledButton(
                  onPressed: () => _ouvrirFicheACompleter(c, reg),
                  child: Text(tr('Compléter ma fiche santé')),
                ),
              )
            else ...[
              reg.passVerrouille ? CampProgressCard(registration: reg) : PassCardView(registration: reg),
              if (reg.camp.serverId.isNotEmpty) ...[
                const SizedBox(height: Cp.s1),
                SizedBox(
                  width: double.infinity,
                  height: 48,
                  child: OutlinedButton(
                    onPressed: () => go(c, FicheSantePage(evenementId: reg.camp.serverId, campName: reg.camp.name)),
                    child: Text(tr('Fiche santé')),
                  ),
                ),
              ],
            ],
            const SizedBox(height: Cp.s2),
          ],
      ]);
    });
  }
}

// Calendrier mensuel des camps, lot 1, 31 oct. 2026 : grille du
// mois, camps placés sur leurs jours quand le serveur a renseigné
// date_debut et date_fin, camps sans date listés à part sans date
// inventée, activités d'établissement listées par établissement,
// sans placement sur des jours, car elles n'ont aucune date. La
// semaine commence le lundi, comme en français. Le toucher d'un
// camp reprend exactement le geste de la carte de la liste : pass
// si déjà inscrit, sinon inscription.
class CampCalendarView extends StatefulWidget {
  const CampCalendarView({super.key, required this.camps, required this.etabs, required this.filter, required this.onCampTap, required this.actionLabel});
  final List<Camp> camps;
  final List<Etab> etabs;
  final String filter;
  final void Function(BuildContext, Camp) onCampTap;
  final String Function(Camp) actionLabel;

  @override
  State<CampCalendarView> createState() => _CampCalendarViewState();
}

class _CampCalendarViewState extends State<CampCalendarView> {
  late DateTime _month;
  DateTime? _selected;

  static const _monthsFr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  static const _monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  static const _daysFr = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  static const _daysEn = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  @override
  void initState() {
    super.initState();
    final now = DateTime.now();
    _month = DateTime(now.year, now.month);
  }

  DateTime _dayOnly(DateTime d) => DateTime(d.year, d.month, d.day);

  bool _covers(Camp camp, DateTime day) {
    final debut = camp.dateDebut;
    if (debut == null) return false;
    final d = _dayOnly(day);
    final start = _dayOnly(debut);
    final end = camp.dateFin == null ? start : _dayOnly(camp.dateFin!);
    return !d.isBefore(start) && !d.isAfter(end);
  }

  List<Camp> _campsOfDay(DateTime day) => widget.camps.where((c) => _covers(c, day)).toList();

  List<Camp> get _undated => widget.camps.where((c) => c.dateDebut == null).toList();

  List<Etab> get _etabsFiltres {
    if (widget.filter == 'Tous') return widget.etabs.where((e) => e.activities.isNotEmpty).toList();
    if (widget.filter == 'Structure' || widget.filter == 'Communauté') return const [];
    return widget.etabs.where((e) => e.activities.isNotEmpty && (e.name == widget.filter || etabDisplayName(e.name) == widget.filter)).toList();
  }

  void _changeMonth(int delta) {
    setState(() {
      _month = DateTime(_month.year, _month.month + delta);
      _selected = null;
    });
  }

  void _goToday() {
    final now = DateTime.now();
    setState(() {
      _month = DateTime(now.year, now.month);
      _selected = _dayOnly(now);
    });
  }

  String _monthName() {
    final months = isEn ? _monthsEn : _monthsFr;
    return months[_month.month - 1];
  }

  // Barre or d'un camp sur plusieurs jours couvrant ce jour.
  (bool, bool, bool) _barreCamp(DateTime day) {
    var barre = false;
    var debut = false;
    var fin = false;
    for (final camp in widget.camps) {
      if (camp.dateDebut == null || camp.dateFin == null) continue;
      final start = _dayOnly(camp.dateDebut!);
      final end = _dayOnly(camp.dateFin!);
      if (end.isAfter(start) && !day.isBefore(start) && !day.isAfter(end)) {
        barre = true;
        if (day == start) debut = true;
        if (day == end) fin = true;
      }
    }
    return (barre, debut, fin);
  }

  String _dateLabel(DateTime day) {
    final months = isEn ? _monthsEn : _monthsFr;
    return isEn ? '${months[day.month - 1]} ${day.day}, ${day.year}' : '${day.day} ${months[day.month - 1].toLowerCase()} ${day.year}';
  }

  Widget _dayCell(int dayNum, int daysInMonth, DateTime today, TextTheme t) {
    if (dayNum < 1 || dayNum > daysInMonth) return const Expanded(child: SizedBox(height: 58));
    final day = DateTime(_month.year, _month.month, dayNum);
    final camps = _campsOfDay(day);
    final selected = _selected != null && _selected == day;
    final isToday = day == today;
    final weekday = day.weekday;
    final points = camps.take(3).map((_) => Cp.gold).toList();
    final (barre, barreDebut, barreFin) = _barreCamp(day);
    return _calJour(
      dayNum: dayNum,
      isToday: isToday,
      selected: selected,
      weekend: weekday >= 6,
      hasEvent: camps.isNotEmpty,
      points: points,
      reste: camps.length > 3 ? camps.length - 3 : 0,
      barre: barre,
      barreDebut: barreDebut,
      barreFin: barreFin,
      onTap: () => setState(() => _selected = selected ? null : day),
    );
  }

  Widget _campRow(BuildContext context, Camp camp, TextTheme t) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: Cp.line)),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(color: Cp.gold.withValues(alpha: 0.15), shape: BoxShape.circle),
            child: const Icon(Icons.change_history_outlined, color: Cp.navy, size: 20),
          ),
          const SizedBox(width: 8),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(camp.name, style: t.titleSmall?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
            const SizedBox(height: 2),
            Text('${orTbc(camp.dates)} · ${orTbc(camp.lieuPays)}', style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
          ])),
        ]),
        const SizedBox(height: 6),
        SizedBox(
          width: double.infinity,
          child: OutlinedButton(
            onPressed: () => widget.onCampTap(context, camp),
            child: Text(widget.actionLabel(camp)),
          ),
        ),
      ]),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final daysInMonth = DateTime(_month.year, _month.month + 1, 0).day;
    final offset = DateTime(_month.year, _month.month).weekday - 1;
    final weeks = ((offset + daysInMonth) / 7).ceil();
    final today = _dayOnly(DateTime.now());
    final dayNames = isEn ? _daysEn : _daysFr;
    final selectedCamps = _selected == null ? <Camp>[] : _campsOfDay(_selected!);
    final undated = _undated;
    final etabs = _etabsFiltres;
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      _CalendrierEntete(
        mois: _monthName(),
        annee: '${_month.year}',
        onPrev: () => _changeMonth(-1),
        onNext: () => _changeMonth(1),
        onToday: _goToday,
      ),
      const SizedBox(height: Cp.s2),
      Row(children: [
        for (var wd = 0; wd < 7; wd++)
          Expanded(child: Center(child: Text(dayNames[wd], style: t.bodySmall?.copyWith(fontWeight: FontWeight.w800, color: wd >= 5 ? Cp.inkMuted.withValues(alpha: 0.6) : Cp.navy))))
      ]),
      const SizedBox(height: 4),
      for (var w = 0; w < weeks; w++) ...[
        Row(children: [for (var wd = 0; wd < 7; wd++) _dayCell(w * 7 + wd - offset + 1, daysInMonth, today, t)]),
        const SizedBox(height: 2),
      ],
      const SizedBox(height: Cp.s1),
      _calendrierLegende(),
      if (widget.camps.isEmpty) ...[
        const SizedBox(height: Cp.s1),
        Text(tr('Aucun camp publié pour ce filtre. Dates, lieux et tarifs restent « À confirmer » tant que la structure ne les a pas fournis.'), style: t.bodyMedium),
      ],
      if (_selected != null) ...[
        const SizedBox(height: Cp.s2),
        Text(_dateLabel(_selected!), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
        const SizedBox(height: Cp.s1),
        if (selectedCamps.isEmpty)
          Text(tr('Aucun camp ce jour.'), style: t.bodyMedium)
        else
          for (final camp in selectedCamps) ...[
            _campRow(context, camp, t),
            const SizedBox(height: Cp.s1),
          ],
      ],
      if (undated.isNotEmpty) ...[
        const SizedBox(height: Cp.s2),
        sectionHeading(tr('Camps sans date précise'), t),
        const SizedBox(height: Cp.s1),
        for (final camp in undated) ...[
          _campRow(context, camp, t),
          const SizedBox(height: Cp.s1),
        ],
      ],
      if (etabs.isNotEmpty) ...[
        const SizedBox(height: Cp.s2),
        sectionHeading(tr('Activités des établissements'), t),
        const SizedBox(height: 2),
        Text(isEn ? 'No date, so they are not placed on any day.' : 'Sans date, elles ne sont placées sur aucun jour.', style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
        const SizedBox(height: Cp.s1),
        for (final etab in etabs) ...[
          Text(etab.name, style: t.titleSmall?.copyWith(fontWeight: FontWeight.w800)),
          const SizedBox(height: 2),
          for (final act in etab.activities) Text('• ${act.title}', style: t.bodyMedium),
          const SizedBox(height: Cp.s1),
        ],
      ],
    ]);
  }
}

// Pass et badge, modèle web, 27 oct. 2026 : le design du badge
// web est conservé tel quel, sans redesign. Seuls les boutons
// ont été alignés sur le prototype : Pass PNG, Pass JPG et
// Portefeuille, avec la même carte utilisée sur la page Camps
// et sur la page Pass.
class _DashedLinePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.white24
      ..strokeWidth = 1;
    var x = 0.0;
    while (x < size.width) {
      canvas.drawLine(Offset(x, 0), Offset(x + 6, 0), paint);
      x += 12;
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}


// Badge de camp professionnel, 30 oct. 2026 : portrait, monogramme,
// nom, photo, matricule, établissement, camp, dates, lieu et QR du
// matricule. Utilisé pour le Camp National Kairos, à la place de
// l'ancien pass ; les autres camps gardent leur pass inchangé.
// Badge de camp premium, 31 oct. 2026 : palette Nuit et or champagne,
// monogramme CP en anneau doré, nom du camp en héros or feuille,
// nom en blanc chaud, rôle en or capitales espacées, matricule et
// pastille Inscrit sur la même ligne, QR encadré d'or avec coche,
// slogan en bas. Aucun cercle ni boussole à côté du nom du camp,
// aucune mention NFC, aucune donnée inventée : tout vient du serveur
// comme avant, par la même inscription que l'ancien badge.
String badgeRole(String fonction) {
  final f = fonction.trim();
  if (f.isEmpty || f == 'Aucun') return tr('Membre');
  if (f.toLowerCase() == 'admin') return tr('Administrateur');
  return f;
}

// Établissement du badge : le vrai établissement si renseigné, sinon
// rien du tout. « Autre » ne s'affiche jamais sur un badge.
bool badgeEtabVisible(String etab) {
  final e = etab.trim();
  return e.isNotEmpty && e.toLowerCase() != 'autre';
}

class BadgeProView extends StatelessWidget {
  const BadgeProView({super.key, required this.registration});
  final Registration registration;

  @override
  Widget build(BuildContext context) {
    final r = registration;
    final m = r.member;
    const deepNight = Color(0xFF06101F);
    const navy = Color(0xFF0B1F3A);
    const champagne = Color(0xFFF2DC9B);
    const gold = Color(0xFFD4AF37);
    const deepGold = Color(0xFFA8842C);
    const warmWhite = Color(0xFFFAF6E9);
    const pearl = Color(0xFFC7D0DE);
    const muted = Color(0xFF93A5C0);
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [navy, deepNight]),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: gold, width: 1.5),
      ),
      child: Stack(children: [
        // Reflet de plastification diagonal, subtil, sans interception.
        Positioned.fill(
          child: IgnorePointer(
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(24),
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [Colors.white.withValues(alpha: 0), Colors.white.withValues(alpha: 0.09), Colors.white.withValues(alpha: 0)],
                  stops: const [0.0, 0.38, 0.62],
                ),
              ),
            ),
          ),
        ),
        Column(children: [
          // Monogramme CP en anneau doré.
          Container(
            width: 72,
            height: 72,
            decoration: BoxDecoration(shape: BoxShape.circle, border: Border.all(color: gold, width: 2), color: const Color(0xFF0B0B0B)),
            padding: const EdgeInsets.all(4),
            child: ClipOval(
              child: WebAssetImage(
                asset: 'assets/cp_monogram.png',
                partUrls: kMonogramParts,
                width: 64,
                height: 64,
                fit: BoxFit.cover,
                fallback: Container(
                  color: const Color(0xFF0B0B0B),
                  child: const Center(
                    child: Text('CP', style: TextStyle(color: gold, fontSize: 20, fontWeight: FontWeight.w700, fontStyle: FontStyle.italic, fontFamily: 'serif')),
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(height: 8),
          // Titre sur une seule ligne.
          const FittedBox(
            fit: BoxFit.scaleDown,
            child: Text('CONNEXION PROPHÉTIQUE', style: TextStyle(color: gold, fontSize: 16, fontWeight: FontWeight.w800, letterSpacing: 1)),
          ),
          const SizedBox(height: 12),
          // Nom du camp en héros, or feuille (dégradé doré à l'écran).
          Text(r.camp.name,
              textAlign: TextAlign.center,
              style: TextStyle(
                  fontSize: 30,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 1,
                  foreground: Paint()
                    ..shader = const LinearGradient(colors: [champagne, gold, deepGold]).createShader(const Rect.fromLTWH(0, 0, 300, 40)))),
          const SizedBox(height: 16),
          Container(
            width: 96,
            height: 122,
            clipBehavior: Clip.antiAlias,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: gold, width: 1.5),
            ),
            child: m.hasPhoto
                ? memberPhotoWidget(m)
                : Container(
                    color: gold,
                    child: Center(
                      child: Text(m.name.isEmpty ? '?' : m.name[0].toUpperCase(),
                          style: const TextStyle(color: navy, fontSize: 28, fontWeight: FontWeight.w700)),
                    ),
                  ),
          ),
          const SizedBox(height: 12),
          Text(m.name, textAlign: TextAlign.center, style: const TextStyle(color: warmWhite, fontSize: 24, fontWeight: FontWeight.w800)),
          const SizedBox(height: 4),
          Text(badgeRole(m.fonction).toUpperCase(), textAlign: TextAlign.center, style: const TextStyle(color: gold, fontSize: 12, fontWeight: FontWeight.w700, letterSpacing: 2.5)),
          const SizedBox(height: 10),
          // Matricule et pastille Inscrit sur la même ligne.
          Wrap(
            alignment: WrapAlignment.center,
            crossAxisAlignment: WrapCrossAlignment.center,
            spacing: 10,
            runSpacing: 6,
            children: [
              Text(m.matricule, style: const TextStyle(color: gold, fontSize: 18, fontWeight: FontWeight.w800, letterSpacing: 1)),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(color: const Color(0xFF123B2A), borderRadius: BorderRadius.circular(20)),
                child: Text('✓ ${tr('Inscrit')}', style: const TextStyle(color: Color(0xFF2FD27A), fontSize: 12, fontWeight: FontWeight.w700)),
              ),
            ],
          ),
          if (badgeEtabVisible(m.etab)) ...[
            const SizedBox(height: 6),
            Text(m.etab, textAlign: TextAlign.center, style: const TextStyle(color: pearl, fontSize: 14, fontWeight: FontWeight.w700)),
          ],
          if (r.camp.dates.isNotEmpty) ...[
            const SizedBox(height: 8),
            Text(r.camp.dates, textAlign: TextAlign.center, style: const TextStyle(color: pearl, fontSize: 14, fontWeight: FontWeight.w700)),
          ],
          if (r.camp.lieuPays.isNotEmpty) ...[
            const SizedBox(height: 4),
            Text(r.camp.lieuPays, textAlign: TextAlign.center, style: const TextStyle(color: muted, fontSize: 14)),
          ],
          const SizedBox(height: 16),
          // QR gardé grand, encadré d'or, avec coche de vérification.
          Stack(clipBehavior: Clip.none, children: [
            Container(
              width: 152,
              height: 152,
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(14), border: Border.all(color: gold, width: 2)),
              child: Center(child: QrImageView(data: m.matricule, size: 128, backgroundColor: Colors.white)),
            ),
            Positioned(
              right: -4,
              bottom: -4,
              child: Container(
                width: 28,
                height: 28,
                decoration: BoxDecoration(shape: BoxShape.circle, color: gold, border: Border.all(color: navy, width: 2)),
                child: const Icon(Icons.check, size: 16, color: navy),
              ),
            ),
          ]),
          const SizedBox(height: 8),
          Text(tr('Vérification officielle'), style: const TextStyle(color: champagne, fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: 1)),
          const SizedBox(height: 14),
          // Séparateur diamant doré.
          Transform.rotate(angle: 3.14159265 / 4, child: Container(width: 8, height: 8, color: gold)),
          const SizedBox(height: 14),
          Text(tr('Bâtir ensemble pour un impact durable'), textAlign: TextAlign.center, style: const TextStyle(color: muted, fontSize: 12, fontStyle: FontStyle.italic)),
        ]),
      ]),
    );
  }
}

class PassCardView extends StatefulWidget {
  const PassCardView({super.key, required this.registration});
  final Registration registration;

  @override
  State<PassCardView> createState() => _PassCardViewState();
}

class _PassCardViewState extends State<PassCardView> {
  final _passKey = GlobalKey();
  bool _downloading = false;
  bool _present = false;

  @override
  void initState() {
    super.initState();
    _verifierPresence();
  }

  // Certificat, lot 1, 31 oct. 2026 : le bouton n'apparaît que si le
  // membre est présent à ce camp, et seulement sur ses propres
  // cartes, jamais sur celles d'un autre membre.
  Future<void> _verifierPresence() async {
    final r = widget.registration;
    if (app.member == null || r.member.matricule != app.member!.matricule || r.camp.serverId.isEmpty) return;
    try {
      final d = await api.fetchMaPresence(r.camp.serverId);
      if (!mounted) return;
      setState(() => _present = (d['statut'] ?? '').toString() == 'present');
    } catch (_) {
      // Sans réponse, le bouton reste masqué, sans erreur visible.
    }
  }

  String get _qrData {
    final r = widget.registration;
    return r.codePass.isNotEmpty ? r.codePass : 'PASS:${r.member.matricule}:${r.camp.id}';
  }

  Future<Uint8List?> _pngBytes() async {
    final boundary = _passKey.currentContext?.findRenderObject() as RenderRepaintBoundary?;
    if (boundary == null) return null;
    final image = await boundary.toImage(pixelRatio: 3);
    final bytes = await image.toByteData(format: ui.ImageByteFormat.png);
    return bytes?.buffer.asUint8List();
  }

  Future<void> _download(bool jpg) async {
    if (_downloading) return;
    setState(() => _downloading = true);
    try {
      final png = await _pngBytes();
      if (png == null || png.isEmpty) {
        if (mounted) toast(context, tr('Impossible de créer l’image du pass.'));
        return;
      }
      final base = widget.registration.camp.kairos ? 'badge-${widget.registration.camp.id}' : 'pass-${widget.registration.camp.id}';
      if (jpg) {
        final decoded = img.decodePng(png);
        if (decoded == null) {
          if (mounted) toast(context, tr('Impossible de créer l’image du pass.'));
          return;
        }
        final jpg = img.encodeJpg(decoded, quality: 90);
        if (await saveToGallery(jpg, base)) {
          if (mounted) toast(context, tr('Pass enregistré dans la galerie.'));
        } else {
          final nom = await telechargerImage(jpg, '$base.jpg', 'image/jpeg');
          if (mounted) toast(context, nom == null ? tr('Pass téléchargé.') : 'Pass téléchargé : $nom');
        }
      } else {
        if (await saveToGallery(png, base)) {
          if (mounted) toast(context, tr('Pass enregistré dans la galerie.'));
        } else {
          final nom = await telechargerImage(png, '$base.png', 'image/png');
          if (mounted) toast(context, nom == null ? tr('Pass téléchargé.') : 'Pass téléchargé : $nom');
        }
      }
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de télécharger le pass.'));
    } finally {
      if (mounted) setState(() => _downloading = false);
    }
  }

  Future<void> _share() async {
    if (_downloading) return;
    setState(() => _downloading = true);
    try {
      final png = await _pngBytes();
      if (png == null || png.isEmpty) return;
      final base = widget.registration.camp.kairos ? 'badge-${widget.registration.camp.id}' : 'pass-${widget.registration.camp.id}';
      if (kIsWeb) {
        var partageOk = true;
        try {
          await Share.shareXFiles([XFile.fromData(png, name: '$base.png', mimeType: 'image/png')], text: widget.registration.camp.name);
        } catch (_) {
          partageOk = false;
        }
        if (!partageOk) {
          await telechargerImage(png, '$base.png', 'image/png');
          if (mounted) toast(context, tr('Pass téléchargé.'));
        }
        return;
      }
      final file = await saveToDownloads(png, '$base.png');
      await Share.shareXFiles([XFile(file.path)], text: widget.registration.camp.name);
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de partager le pass.'));
    } finally {
      if (mounted) setState(() => _downloading = false);
    }
  }

  // Certificat de participation, lot 1, 31 oct. 2026 : document
  // imprimable, avec les données de l'inscription elle-même, nom,
  // matricule, camp, dates et lieu, sans rien compléter.
  Future<void> _certificat() async {
    if (_downloading) return;
    setState(() => _downloading = true);
    try {
      final r = widget.registration;
      // Carte 96, 8 nov. 2026 : la signature de l'administrateur,
      // lue côté serveur, est posée sur le certificat. Sur
      // l'appareil d'un membre, aucune signature n'est enregistrée,
      // le certificat reste comme avant.
      final sig = await synchroniserSignatureAdmin(app.member?.matricule ?? '');
      final html = buildCertificateHtml(PrintCertificate(
        name: r.member.name,
        matricule: r.member.matricule,
        campName: r.camp.name,
        campDates: r.camp.dates,
        campLieu: r.camp.lieuPays,
        signatureDataUrl: sig == null ? null : signatureDataUrl(sig),
      ), isEnglish: isEn);
      final base = 'certificat-${r.member.matricule}'.replaceAll(RegExp(r'[^A-Za-z0-9_-]'), '');
      await openPrintDocument('${base.isEmpty ? 'certificat' : base}.html', html);
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de créer le certificat.'));
    } finally {
      if (mounted) setState(() => _downloading = false);
    }
  }

  Widget _detailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text('$label  ', style: const TextStyle(color: Colors.white70, fontSize: 14)),
        Expanded(child: Text(value, style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w700))),
      ]),
    );
  }

  @override
  Widget build(BuildContext context) {
    final r = widget.registration;
    return Column(children: [
      RepaintBoundary(
        key: _passKey,
        child: r.camp.kairos ? BadgeProView(registration: r) : Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(24)),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            const WebAssetImage(
                asset: 'assets/logo.png',
                partUrls: kLogoParts,
                height: 48,
                fallback: Text('CONNEXION PROPHÉTIQUE', style: TextStyle(color: Cp.gold, fontSize: 18, fontWeight: FontWeight.w800))),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
              decoration: BoxDecoration(color: const Color(0xFF123B2A), borderRadius: BorderRadius.circular(20)),
              child: Text('✓ ${tr('Inscrit')}', style: const TextStyle(color: Color(0xFF2FD27A), fontSize: 14, fontWeight: FontWeight.w700)),
            ),
            const SizedBox(height: 12),
            SizedBox(height: 1, width: double.infinity, child: CustomPaint(painter: _DashedLinePainter())),
            const SizedBox(height: 12),
            Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Expanded(
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(isEn ? 'Event' : 'Événement', style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w800)),
                  const SizedBox(height: 4),
                  Text(r.camp.name, style: const TextStyle(color: Colors.white70, fontSize: 14, fontWeight: FontWeight.w700)),
                  const SizedBox(height: 12),
                  _detailRow(isEn ? 'Name' : 'Nom', r.member.name),
                  _detailRow(isEn ? 'Participants' : 'Participants', '${r.participants}'),
                  if (r.hebergement.isNotEmpty) _detailRow(isEn ? 'Accommodation' : 'Hébergement', r.hebergement),
                  if (r.repas.isNotEmpty) _detailRow(isEn ? 'Meals' : 'Repas', r.repas),
                  if (r.transport.isNotEmpty) _detailRow(isEn ? 'Transport' : 'Transport', r.transport),
                ]),
              ),
              const SizedBox(width: 12),
              Container(
                width: 140,
                height: 140,
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(14)),
                child: Center(child: QrImageView(data: _qrData, size: 120)),
              ),
            ]),
            const SizedBox(height: 12),
            Text(_qrData, style: const TextStyle(color: Cp.gold, fontSize: 18, fontWeight: FontWeight.w800, letterSpacing: 1)),
          ]),
        ),
      ),
      const SizedBox(height: Cp.s1),
      Row(children: [
        Expanded(
          child: SizedBox(
            height: 52,
            child: FilledButton.icon(
              onPressed: _downloading ? null : () => _download(false),
              style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
              icon: const Icon(Icons.download_outlined),
              label: Text(_downloading ? tr('Préparation…') : (r.camp.kairos ? tr('Télécharger') : tr('Pass PNG'))),
            ),
          ),
        ),
        const SizedBox(width: Cp.s1),
        Expanded(
          child: SizedBox(
            height: 52,
            child: OutlinedButton.icon(
              onPressed: _downloading ? null : () => _download(true),
              style: OutlinedButton.styleFrom(foregroundColor: Colors.white, backgroundColor: Cp.navy, side: const BorderSide(color: Colors.white24)),
              icon: const Icon(Icons.download_outlined),
              label: Text(_downloading ? tr('Préparation…') : (r.camp.kairos ? tr('Badge JPG') : tr('Pass JPG'))),
            ),
          ),
        ),
        const SizedBox(width: Cp.s1),
        Expanded(
          child: SizedBox(
            height: 52,
            child: OutlinedButton.icon(
              // Pas de pass Wallet réel dans l'application : le
              // partage de l'image du pass, comme pour la carte.
              // Aucun pass Wallet n'est inventé ici.
              onPressed: _downloading ? null : _share,
              style: OutlinedButton.styleFrom(foregroundColor: Colors.white, backgroundColor: Cp.navy, side: const BorderSide(color: Colors.white24)),
              icon: Icon(r.camp.kairos ? Icons.share_outlined : Icons.account_balance_wallet_outlined),
              label: Text(_downloading ? tr('Préparation…') : (r.camp.kairos ? tr('Partager') : tr('Portefeuille'))),
            ),
          ),
        ),
      ]),
      // Certificat, lot 1, 31 oct. 2026 : seulement si le membre est
      // présent à ce camp, et seulement sur ses propres cartes.
      if (_present) ...[
        const SizedBox(height: Cp.s1),
        SizedBox(
          width: double.infinity,
          height: 52,
          child: OutlinedButton.icon(
            onPressed: _downloading ? null : _certificat,
            style: OutlinedButton.styleFrom(foregroundColor: Colors.white, backgroundColor: Cp.navy, side: const BorderSide(color: Colors.white24)),
            icon: const Icon(Icons.workspace_premium_outlined),
            label: Text(_downloading ? tr('Préparation…') : tr('Certificat')),
          ),
        ),
      ],
    ]);
  }
}

class PassPage extends StatelessWidget {
  const PassPage({super.key, required this.registration});
  final Registration registration;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final r = registration;
    final children = [
      PassCardView(registration: r),
      const SizedBox(height: Cp.s2),
      Text(isEn ? 'Registered on ${dateFr(r.date)}. Show this ${r.camp.kairos ? 'badge' : 'pass'} at the entrance.' : 'Inscrit le ${dateFr(r.date)}. Présentez ce ${r.camp.kairos ? 'badge' : 'pass'} à l’entrée.', style: t.bodyMedium),
    ];
    if (!r.camp.kairos) return basic(tr('Pass numérique'), children);
    // Badge Kairos, page allégée, 31 oct. 2026 : pas de double
    // en-tête, la carte porte déjà le titre. Seul le retour est gardé.
    final desktop = Rx.isDesktop(context);
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Cp.navy,
        foregroundColor: Colors.white,
        toolbarHeight: desktop ? 72 : null,
      ),
      body: SafeArea(
        child: Builder(builder: (ctx) {
          final bottom = Cp.s2 + Rx.bottomClearance(ctx);
          return WideCenter(
            child: KeyboardScroll(
              child: ListView(padding: EdgeInsets.fromLTRB(Cp.s2, Cp.s2, Cp.s2, bottom), children: children),
            ),
          );
        }),
      ),
    );
  }
}

// Paiement du camp en 6 fois, 31 oct. 2026 : carte de progression
// affichée à la place du pass tant que la totalité n'est pas
// validée. Le pass et le badge Kairos restent masqués jusque-là.
class CampProgressCard extends StatefulWidget {
  const CampProgressCard({super.key, required this.registration});
  final Registration registration;

  @override
  State<CampProgressCard> createState() => _CampProgressCardState();
}

class _CampProgressCardState extends State<CampProgressCard> {
  bool _busy = false;

  Future<void> _payer() async {
    final r = widget.registration;
    if (_busy || r.montantSuivant == null || r.camp.serverId.isEmpty) return;
    setState(() => _busy = true);
    try {
      await startPayment(context, 'camp', r.montantSuivant!, evenementId: r.camp.serverId);
    } finally {
      if (mounted) setState(() => _busy = false);
    }
    // La demande vient d'être créée en attente : la progression
    // est rafraîchie pour afficher le versement en attente.
    await app.refreshInscriptionsProgress();
    await app.syncServerPayments();
  }

  Future<void> _actualiser() async {
    if (_busy) return;
    setState(() => _busy = true);
    try {
      await app.refreshInscriptionsProgress();
      await app.syncServerPayments();
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  // Paiement du camp en une fois, 31 oct. 2026 : le solde complet
  // en une seule demande, déjà créée côté serveur, jamais recréée.
  Future<void> _payerTotal() async {
    final r = widget.registration;
    if (_busy || r.montantRestant <= 0 || r.camp.serverId.isEmpty) return;
    setState(() => _busy = true);
    try {
      final created = await api.createPaiementTotalCamp(r.camp.serverId);
      if (!mounted) return;
      await startPayment(context, 'camp', (created['montant_fcfa'] as num?)?.toInt() ?? r.montantRestant, evenementId: r.camp.serverId, paiementExistant: created);
    } on ApiException catch (e) {
      if (mounted) toast(context, e.message);
      return;
    } catch (_) {
      if (mounted) toast(context, tr('Serveur injoignable. Paiement non enregistré.'));
      return;
    } finally {
      if (mounted) setState(() => _busy = false);
    }
    await app.refreshInscriptionsProgress();
    await app.syncServerPayments();
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final r = widget.registration;
    final fraction = r.versementsValides >= 6 ? 1.0 : r.versementsValides / 6;
    final enAttente = r.versementEnAttenteRef != null;
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(Cp.radiusCard),
        border: Border.all(color: Cp.gold, width: 2),
      ),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(r.camp.name, style: t.titleLarge?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
        const SizedBox(height: 4),
        Text(tr('Paiement en 6 fois'), style: t.titleMedium?.copyWith(color: Cp.goldDeep, fontWeight: FontWeight.w700)),
        const SizedBox(height: Cp.s1),
        ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: LinearProgressIndicator(value: fraction, minHeight: 10, backgroundColor: Cp.line, valueColor: const AlwaysStoppedAnimation<Color>(Cp.gold)),
        ),
        const SizedBox(height: Cp.s1),
        Text('${r.versementsValides} ${tr('versements payés sur 6')}', style: t.bodyMedium),
        Text('${tr('Déjà payé')} : ${fcfa(r.montantPaye)}', style: t.bodyMedium),
        Text('${tr('Reste à payer')} : ${fcfa(r.montantRestant)}', style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700)),
        if (r.tarif > 0) Text('${tr('Total')} : ${fcfa(r.tarif)}', style: t.bodyMedium),
        const SizedBox(height: Cp.s1),
        if (enAttente) ...[
          Text(
            r.versementEnAttenteNumero != null
                ? '${tr('Versement en attente de validation')} (${r.versementEnAttenteNumero} ${tr('sur 6')})${r.versementEnAttenteMontant != null ? ' : ${fcfa(r.versementEnAttenteMontant!)}' : ''}'
                : '${tr('Paiement en attente de validation')}${r.versementEnAttenteMontant != null ? ' : ${fcfa(r.versementEnAttenteMontant!)}' : ''}',
            style: t.bodyMedium?.copyWith(color: Cp.goldDeep, fontWeight: FontWeight.w700),
          ),
          const SizedBox(height: Cp.s1),
          SizedBox(
            width: double.infinity,
            height: 48,
            child: OutlinedButton(onPressed: _busy ? null : _actualiser, child: Text(tr('Actualiser'))),
          ),
        ] else if (r.montantRestant > 0 && r.montantSuivant != null && r.versementSuivant != null) ...[
          SizedBox(
            width: double.infinity,
            height: 52,
            child: FilledButton(
              onPressed: _busy ? null : _payer,
              child: Text('${tr('Payer le versement suivant')} : ${fcfa(r.montantSuivant!)}'),
            ),
          ),
          const SizedBox(height: 4),
          Text('${tr('Versement')} ${r.versementSuivant} ${tr('sur 6')}. ${tr('Le pass sera généré quand la totalité sera payée.')}', style: t.bodyMedium),
          const SizedBox(height: Cp.s1),
          SizedBox(
            width: double.infinity,
            height: 52,
            child: OutlinedButton(
              onPressed: _busy ? null : _payerTotal,
              child: Text('${tr('Payer la totalité en une fois')} : ${fcfa(r.montantRestant)}'),
            ),
          ),
        ] else ...[
          SizedBox(
            width: double.infinity,
            height: 48,
            child: OutlinedButton(onPressed: _busy ? null : _actualiser, child: Text(tr('Actualiser'))),
          ),
        ],
      ]),
    );
  }
}

// Page de progression d'un camp payant, ouverte à la place du
// pass tant que le solde reste. Le pass apparaît seul dès que la
// totalité est validée, au retour sur les inscriptions.
class CampProgressPage extends StatelessWidget {
  const CampProgressPage({super.key, required this.registration});
  final Registration registration;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final r = registration;
    return basic(r.camp.name, [
      Text(
        isEn
            ? 'Your registration is recorded. Your ${r.camp.kairos ? 'badge' : 'pass'} will be generated once all 6 instalments are paid.'
            : 'Votre inscription est enregistrée. Votre ${r.camp.kairos ? 'badge' : 'pass'} sera généré quand les 6 versements seront payés.',
        style: t.bodyMedium,
      ),
      const SizedBox(height: Cp.s2),
      CampProgressCard(registration: r),
    ]);
  }
}

class EtabsPage extends StatelessWidget {
  const EtabsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      final myEtab = app.member == null ? '' : etabDisplayName(app.member!.etab);
      // Carte d'un établissement, compacte, 28 oct. 2026 : marges
      // 16 au lieu de 20, icône 56 au lieu de 64, titre 20 au lieu
      // de 28, boutons 48 de haut, espaces 8 au lieu de 16, pour
      // montrer plus d'établissements sans défilement excessif.
      // Données inchangées : nom complet, compteurs réels
      // (activités, événements, actualités), navigation vers les
      // activités du bon établissement, et sélection par le même
      // setMemberEtab qu'avant, avec le même libellé d'action,
      // clarifié en « Définir comme mon établissement ».
      Widget etabCard(Etab e) {
        final name = etabDisplayName(e.name);
        final isMine = myEtab == name;
        final newsCount = app.news.where((n) => (e.id.isNotEmpty && n.etablissementId == e.id) || n.etab == e.name || etabDisplayName(n.etab) == name).length;
        final eventCount = app.camps.where((camp) => camp.scope == name || etabDisplayName(camp.scope) == name).length;
        return Container(
          padding: const EdgeInsets.all(Cp.s2),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(Cp.radiusCard),
            border: Border.all(color: isMine ? Cp.gold : Cp.line, width: isMine ? 2 : 1),
          ),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(12)),
                child: const Icon(Icons.apartment_outlined, color: Cp.gold, size: 20),
              ),
              const Spacer(),
              if (isMine)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(color: Cp.verseTint, borderRadius: BorderRadius.circular(20)),
                  child: Text(isEn ? 'MY ESTABLISHMENT' : 'MON ÉTABLISSEMENT', style: const TextStyle(color: Cp.goldDeep, fontSize: 11, fontWeight: FontWeight.w800, letterSpacing: 1)),
                ),
            ]),
            const SizedBox(height: Cp.s1),
            Text(name, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
            const SizedBox(height: 2),
            Text('${e.activities.length} ${isEn ? 'activity(ies)' : 'activité(s)'} · $eventCount ${isEn ? 'events' : 'événements'} · $newsCount ${isEn ? 'news' : 'actualités'}', style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 14)),
            const SizedBox(height: Cp.s1),
            Align(
              alignment: Alignment.centerLeft,
              child: FilledButton(
                onPressed: () => go(c, EtabDetailPage(etab: e)),
                style: FilledButton.styleFrom(backgroundColor: Cp.goldDeep, foregroundColor: Colors.white, minimumSize: const Size(0, 48), padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12)),
                child: Text(tr('Voir les activités'), style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700)),
              ),
            ),
            if (app.isAdminGeneral) ...[
              const SizedBox(height: Cp.s1),
              SizedBox(
                width: double.infinity,
                height: 48,
                child: OutlinedButton.icon(
                  onPressed: () async {
                    final ctrl = TextEditingController(text: e.name);
                    final ok = await showDialog<bool>(
                      context: c,
                      builder: (ctx) => AlertDialog(
                        title: Text(tr('Renommer l’établissement')),
                        content: TextField(controller: ctrl, decoration: InputDecoration(labelText: tr('Nom de l’établissement'))),
                        actions: [
                          TextButton(onPressed: () => Navigator.of(ctx).pop(false), child: Text(tr('Annuler'))),
                          FilledButton(onPressed: () => Navigator.of(ctx).pop(true), child: Text(tr('Enregistrer'))),
                        ],
                      ),
                    );
                    if (ok != true) return;
                    final nouveau = ctrl.text.trim();
                    if (nouveau.isEmpty || nouveau == e.name) return;
                    // Renommage, 1er nov. 2026 : serveur d'abord quand
                    // l'etablissement a un identifiant, local sinon.
                    // Le nom renomme s'applique partout, y compris
                    // aux membres qui l'avaient defini comme le leur.
                    try {
                      if (e.id.isNotEmpty && api.isConnected) await api.updateEtablissement(id: e.id, nom: nouveau);
                      final idx = app.etabs.indexOf(e);
                      if (idx >= 0) app.etabs[idx] = Etab(nouveau, id: e.id, imagePath: e.imagePath, imageUrl: e.imageUrl)..activities.addAll(e.activities);
                      app.changed();
                      if (c.mounted) toast(c, tr('Établissement renommé.'));
                    } catch (err) {
                      if (c.mounted) toast(c, 'Renommage refusé ($err). La route est réservée au compte administrateur général.');
                    }
                  },
                  icon: const Icon(Icons.edit_outlined),
                  label: Text(tr('Renommer l’établissement')),
                ),
              ),
            ],
            if (!isMine) ...[
              const SizedBox(height: Cp.s1),
              SizedBox(
                width: double.infinity,
                height: 48,
                child: OutlinedButton(
                  onPressed: () {
                    if (app.member == null) {
                      toast(c, tr('Créez votre profil de membre pour continuer.'));
                      go(c, const ProfilePage());
                      return;
                    }
                    app.setMemberEtab(name);
                    toast(c, isEn ? 'This is now your establishment.' : 'C’est votre établissement maintenant.');
                  },
                  child: Text(tr('Définir comme mon établissement')),
                ),
              ),
            ],
          ]),
        );
      }

      // Grille équilibrée sur grand écran seulement, 28 oct. 2026 :
      // deux colonnes dès 720 px de large, une colonne sur iPhone,
      // pour garder la lecture sans débordement horizontal.
      final wide = MediaQuery.of(c).size.width >= 720;
      final colWidth = wide ? (MediaQuery.of(c).size.width - Cp.s2 * 2 - Cp.s1) / 2 : double.infinity;
      return basic(tr('Nos établissements'), [
        Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(tr('Nos établissements'), style: t.titleLarge?.copyWith(fontSize: 28, fontWeight: FontWeight.w800, color: Cp.navy)),
            const SizedBox(height: 4),
            Text(tr('Chaque établissement a ses activités, événements et actualités.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 15)),
          ])),
        ]),
        const SizedBox(height: Cp.s1),
        if (app.isAdminGeneral)
          Align(
            alignment: Alignment.centerLeft,
            child: goldButton(
              icon: Icons.add,
              label: tr('Ajouter un établissement'),
              onPressed: () => imageFormSheet(c, tr('Nouvel établissement'), [F('name', tr('Nom'))], tr('Ajouter'), (v, imagePath) {
                final etab = Etab(v['name']!, imagePath: imagePath);
                app.etabs.add(etab);
                app.changed();
                _publishEtab(c, etab);
              }),
            ),
          ),
        const SizedBox(height: Cp.s1),
        if (wide)
          Wrap(
            spacing: Cp.s1,
            runSpacing: Cp.s1,
            children: [for (final e in app.etabs) SizedBox(width: colWidth, child: etabCard(e))],
          )
        else
          // Défilement horizontal sur téléphone, 1er nov. 2026 :
          // une rangée de cartes de 300 de large, même contenu,
          // mêmes compteurs et mêmes boutons que la liste verticale.
          SizedBox(
            height: 320,
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [for (final e in app.etabs) ...[SizedBox(width: 300, child: etabCard(e)), const SizedBox(width: Cp.s1)]],
              ),
            ),
          ),
        // Carte Structure (tous), modèle web : activités communes
        // à toute la structure, avec retour à l'accueil. Icône et
        // titre compactés comme les cartes, bordure pointillée
        // conservée.
        DashedCard(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(color: Cp.verseTint, borderRadius: BorderRadius.circular(12)),
              child: const Icon(Icons.people_outlined, color: Cp.goldDeep, size: 20),
            ),
            const SizedBox(height: Cp.s1),
            Text(isEn ? 'Structure (all)' : 'Structure (tous)', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
            const SizedBox(height: 2),
            Text(isEn ? 'Activities shared by the whole Connexion Prophétique structure.' : 'Activités communes à toute la structure Connexion Prophétique.', style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 15)),
            const SizedBox(height: Cp.s1),
            SizedBox(
              height: 48,
              child: OutlinedButton(
                onPressed: () => Navigator.of(c).popUntil((route) => route.isFirst),
                child: Text(tr('Accueil')),
              ),
            ),
          ]),
        ),
      ]);
    });
  }
}

// Publication d'une activité depuis la fiche d'un établissement,
// 3 nov. 2026 : même publication que depuis l'Espace structure,
// établissement pré-rempli, jamais choisi ailleurs. Locale
// seulement si l'établissement n'a pas d'identifiant serveur ou
// si l'application n'est pas connectée.
Future<void> _publishActiviteEtab(BuildContext c, Etab etab, ActivityItem activity) async {
  if (!api.isConnected || etab.id.isEmpty) {
    toast(c, tr('Activité ajoutée en local sur cet appareil seulement. Elle sera publiée pour tous les membres quand l’établissement viendra du serveur et que vous serez connecté avec un compte administrateur.'));
    return;
  }
  if (activity.imageUrl.isEmpty) activity.imageUrl = await uploadContentImage(c, activity.imagePath);
  try {
    final created = await api.createActivite(etablissementId: etab.id, titre: activity.title, imageId: fileIdFromUrl(activity.imageUrl));
    final id = (created['id'] ?? '').toString();
    if (id.isNotEmpty) activity.serverId = id;
    app.changed();
    toast(c, tr('Activité publiée sur le serveur : visible pour les membres connectés avec internet.'));
  } catch (e) {
    toast(c, 'Activité conservée en local sur cet appareil seulement. Publication serveur refusée ($e).');
  }
}

class EtabDetailPage extends StatefulWidget {
  const EtabDetailPage({super.key, required this.etab});
  final Etab etab;

  @override
  State<EtabDetailPage> createState() => _EtabDetailPageState();
}

class _EtabDetailPageState extends State<EtabDetailPage> {
  List<Map<String, dynamic>> _attestations = [];
  bool _attestationsChargees = false;

  @override
  void initState() {
    super.initState();
    _chargerAttestations();
  }

  Future<void> _chargerAttestations() async {
    if (app.member == null || !api.isConnected) return;
    try {
      final liste = await api.fetchMesAttestations();
      if (!mounted) return;
      setState(() {
        _attestations = liste;
        _attestationsChargees = true;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() => _attestationsChargees = true);
    }
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      final etab = widget.etab;
      // Actualités de l'établissement : par identifiant serveur quand il
      // existe, sinon par nom, pour les actualités locales.
      final items = app.news.where((n) => (etab.id.isNotEmpty && n.etablissementId == etab.id) || n.etab == etab.name).toList();
      // Périmètre d'ajout, 3 nov. 2026 : administrateur général pour
      // tous, administrateur d'établissement pour son établissement
      // seulement, jamais pour un autre établissement.
      final monEtab = app.member?.etab ?? '';
      final peutAjouter = app.isAdminGeneral ||
          (app.isAdminEtablissement && (monEtab == etab.name || etabDisplayName(monEtab) == etabDisplayName(etab.name)));
      // Programme à venir, 3 nov. 2026 : prochain camp de
      // l'établissement ou de la structure, sinon premier
      // enseignement, sinon À confirmer, jamais inventé.
      final maintenant = DateTime.now();
      final aujourdHui = DateTime(maintenant.year, maintenant.month, maintenant.day);
      final campsAvenir = app.camps.where((camp) {
        if (camp.scope != etab.name && etabDisplayName(camp.scope) != etabDisplayName(etab.name) && camp.scope != 'Structure') return false;
        if (camp.dateFin == null) return true;
        final fin = DateTime(camp.dateFin!.year, camp.dateFin!.month, camp.dateFin!.day);
        return !fin.isBefore(aujourdHui);
      }).toList()
        ..sort((a, b) {
          if (a.dateDebut == null && b.dateDebut == null) return 0;
          if (a.dateDebut == null) return 1;
          if (b.dateDebut == null) return -1;
          return a.dateDebut!.compareTo(b.dateDebut!);
        });
      final campAvenir = campsAvenir.isEmpty ? null : campsAvenir.first;
      return basic(etab.name, [
        if (hasContentImage(etab.imagePath, etab.imageUrl)) ...[contentImage(etab.imagePath, etab.imageUrl, height: 180), const SizedBox(height: Cp.s2)],
        heading(c, tr('Activités')),
        if (peutAjouter) ...[
          SizedBox(
            width: double.infinity,
            height: 52,
            child: FilledButton.icon(
              onPressed: () => imageFormSheet(c, tr('Nouvelle activité'), [F('a', tr('Activité'))], tr('Ajouter'), (v, imagePath) {
                final activity = ActivityItem(v['a']!, imagePath: imagePath);
                etab.activities.add(activity);
                app.changed();
                _publishActiviteEtab(c, etab, activity);
              }),
              icon: const Icon(Icons.add_outlined),
              label: Text(tr('Ajouter une activité')),
            ),
          ),
          const SizedBox(height: Cp.s2),
        ],
        if (etab.activities.isEmpty)
          Text(tr('Aucune activité publiée. La structure les renseigne.'), style: t.bodyMedium)
        else
          Card(
            child: Column(children: [
              for (final a in etab.activities)
                ListTile(
                  leading: hasContentImage(a.imagePath, a.imageUrl)
                      ? ClipRRect(borderRadius: BorderRadius.circular(8), child: SizedBox(width: 48, height: 48, child: contentImage(a.imagePath, a.imageUrl, height: 48)))
                      : const Icon(Icons.check_circle_outline, color: Cp.navy),
                  title: Text(a.title, style: t.labelLarge),
                  trailing: const Icon(Icons.chevron_right_outlined, color: Cp.inkMuted),
                  onTap: () {
                    if (app.isAdmin && a.serverId.isNotEmpty) {
                      goAdmin(c, () => admin.PresenceListPage(activiteId: a.serverId, activiteNom: '${etab.name} : ${a.title}'));
                      return;
                    }
                    showDialog<void>(
                      context: c,
                      builder: (ctx) => AlertDialog(
                        title: Text(a.title),
                        content: Text(etab.name, style: t.bodyMedium),
                        actions: [TextButton(onPressed: () => Navigator.pop(ctx), child: Text(tr('Fermer')))],
                      ),
                    );
                  },
                ),
            ]),
          ),
        const SizedBox(height: Cp.s3),
        heading(c, tr('Programme à venir')),
        if (campAvenir != null)
          Card(
            child: ListTile(
              leading: const Icon(Icons.change_history_outlined, color: Cp.navy),
              title: Text(campAvenir.name, style: t.labelLarge),
              subtitle: Text([campAvenir.dates, campAvenir.lieuPays].where((e) => e.isNotEmpty).join(' · '), style: t.bodyMedium),
              trailing: const Icon(Icons.chevron_right_outlined, color: Cp.inkMuted),
              onTap: () => go(c, const CampsPage()),
            ),
          )
        else if (app.teachings.isNotEmpty)
          Card(
            child: ListTile(
              leading: const Icon(Icons.play_circle_outline, color: Cp.navy),
              title: Text(app.teachings.first.title, style: t.labelLarge),
              subtitle: Text(app.teachings.first.speaker, style: t.bodyMedium),
              trailing: const Icon(Icons.chevron_right_outlined, color: Cp.inkMuted),
              onTap: () => go(c, const TeachingsPage()),
            ),
          )
        else
          Text(tr('À confirmer'), style: t.bodyMedium),
        const SizedBox(height: Cp.s3),
        heading(c, tr('Mes attestations')),
        if (!_attestationsChargees)
          Text(tr('Aucune attestation délivrée pour le moment.'), style: t.bodyMedium)
        else if (_attestations.isEmpty)
          Text(tr('Aucune attestation délivrée pour le moment.'), style: t.bodyMedium)
        else
          Card(
            child: Column(children: [
              for (final a in _attestations.take(3))
                ListTile(
                  leading: const Icon(Icons.workspace_premium_outlined, color: Cp.navy),
                  title: Text('${(a['type'] ?? '').toString() == 'benevolat' ? tr('Attestation de bénévolat') : tr('Attestation de participation')} · ${(a['activite'] ?? '').toString()}', style: t.labelLarge),
                  subtitle: Text('${tr('Référence')} : ${(a['reference'] ?? '').toString()}', style: t.bodyMedium),
                  trailing: const Icon(Icons.chevron_right_outlined, color: Cp.inkMuted),
                  onTap: () => goAdmin(c, () => admin.MesAttestationsPage()),
                ),
              ListTile(
                title: Text(tr('Voir mes attestations'), style: t.labelLarge),
                trailing: const Icon(Icons.chevron_right_outlined, color: Cp.inkMuted),
                onTap: () => goAdmin(c, () => admin.MesAttestationsPage()),
              ),
            ]),
          ),
        const SizedBox(height: Cp.s3),
        heading(c, tr('Actualités')),
        if (items.isEmpty)
          Text(tr('Aucune actualité pour cet établissement.'), style: t.bodyMedium)
        else
          newsCarousel(c, items),
      ]);
    });
  }
}

class NewsCard extends StatelessWidget {
  const NewsCard({super.key, required this.item, this.onModifier, this.onSupprimer, this.onModifierSurPlace, this.editPanel});
  final NewsItem item;
  final VoidCallback? onModifier;
  final VoidCallback? onSupprimer;
  final VoidCallback? onModifierSurPlace;
  final Widget? editPanel;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(Cp.s2),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          if (hasContentImage(item.imagePath, item.imageUrl)) ...[contentImage(item.imagePath, item.imageUrl), const SizedBox(height: Cp.s1)],
          Row(children: [
            Expanded(child: Text(item.title, style: t.titleMedium)),
            IconButton(
              tooltip: tr('Partager'),
              icon: const Icon(Icons.share_outlined, color: Cp.navy, size: 20),
              onPressed: () => Share.share('${item.title}\n${item.text}'),
            ),
            if (app.isAdminGeneral && onModifier != null && onSupprimer != null)
              PopupMenuButton<String>(
                tooltip: tr('Actions'),
                icon: const Icon(Icons.more_vert, color: Cp.navy, size: 20),
                onSelected: (v) {
                  if (v == 'sur_place') onModifierSurPlace!();
                  if (v == 'modifier') onModifier!();
                  if (v == 'supprimer') onSupprimer!();
                },
                itemBuilder: (_) => [
                  if (onModifierSurPlace != null) PopupMenuItem(value: 'sur_place', child: Text(tr('Modifier sur place'))),
                  PopupMenuItem(value: 'modifier', child: Text(tr('Modifier'))),
                  PopupMenuItem(value: 'supprimer', child: Text(tr('Supprimer'))),
                ],
              ),
          ]),
          const SizedBox(height: 4),
          Text('${dateFr(item.date)}${item.etab.isEmpty ? '' : ' · ${item.etab}'}', style: t.bodyMedium),
          if (item.programmeeLe != null && item.programmeeLe!.isAfter(DateTime.now())) ...[
            const SizedBox(height: 4),
            Text(formatProgramme(item.programmeeLe!), style: t.bodyMedium?.copyWith(color: Cp.goldDeep, fontWeight: FontWeight.w700)),
          ],
          const SizedBox(height: Cp.s1),
          Text(item.text, style: t.bodyMedium?.copyWith(color: Cp.ink)),
          if (editPanel != null) ...[const SizedBox(height: Cp.s1), editPanel!],
        ]),
      ),
    );
  }
}

// Liste horizontale d'actualités, tranche 2, 1er nov. 2026 : mêmes
// cartes (NewsCard, avec son bouton Partager et son menu), mêmes
// données, défilement de gauche à droite, carte suivante qui
// dépasse pour signaler le défilement, comme les carrousels de
// l'accueil. La page appelante passe ses gestes Modifier et
// Supprimer quand elle les possède, sinon pas de menu.
Widget newsCarousel(BuildContext c, List<NewsItem> items, {void Function(NewsItem)? onModifier, void Function(NewsItem)? onSupprimer, void Function(NewsItem)? onModifierSurPlace, Widget? Function(NewsItem)? editPanelFor}) {
  final available = MediaQuery.of(c).size.width - 28;
  final cardWidth = (available * 0.82).clamp(220.0, 340.0).toDouble();
  return SingleChildScrollView(
    scrollDirection: Axis.horizontal,
    child: IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          for (final n in items) ...[
            SizedBox(
              width: cardWidth,
              child: NewsCard(
                item: n,
                onModifier: onModifier == null ? null : () => onModifier(n),
                onSupprimer: onSupprimer == null ? null : () => onSupprimer(n),
                onModifierSurPlace: onModifierSurPlace == null ? null : () => onModifierSurPlace(n),
                editPanel: editPanelFor?.call(n),
              ),
            ),
            const SizedBox(width: 12),
          ],
        ],
      ),
    ),
  );
}

// Page des notifications internes, 29 oct. 2026, dans Plus depuis
// la carte 98 : lue à l'ouverture, jamais poussée. Un appui marque
// comme lu et navigue vers l'écran concerné quand la destination
// est directe, sinon le message s'affiche dans une fenêtre.
class NotificationsPage extends StatefulWidget {
  const NotificationsPage({super.key});

  @override
  State<NotificationsPage> createState() => _NotificationsPageState();
}

class _NotificationsPageState extends State<NotificationsPage> {
  // Tranche Notifications, 1er nov. 2026 : filtre par type et vue
  // non lues seulement. Le filtre ne change ni les types ni leurs
  // destinations, et ne touche pas au circuit d'envoi.
  String _filtreType = '';
  var _nonLuesSeulement = false;

  @override
  void initState() {
    super.initState();
    unawaited(app.refreshNotifications());
  }

  String _date(String iso) {
    final d = DateTime.tryParse(iso);
    if (d == null) return '';
    final local = d.toLocal();
    return '${local.day.toString().padLeft(2, '0')}/${local.month.toString().padLeft(2, '0')}/${local.year} à ${local.hour.toString().padLeft(2, '0')}:${local.minute.toString().padLeft(2, '0')}';
  }

  IconData _icon(String type) {
    switch (type) {
      case 'paiement_valide':
      case 'paiement_refuse':
      case 'cotisation_rappel':
        return Icons.account_balance_wallet_outlined;
      case 'nouveau_camp':
        return Icons.change_history_outlined;
      case 'nouvel_enseignement':
        return Icons.play_circle_outline;
      case 'nouvelle_actualite':
        return Icons.chat_bubble_outline;
      default:
        return Icons.notifications_outlined;
    }
  }

  // Destination directe de la notification, depuis le lien serveur,
  // avec repli sur le type quand le lien est absent.
  String _cible(Map<String, dynamic> n) {
    final lien = (n['lien_type'] ?? '').toString();
    if (lien.isNotEmpty) return lien;
    switch ((n['type'] ?? '').toString()) {
      case 'paiement_valide':
      case 'paiement_refuse':
        return 'paiement';
      case 'nouveau_camp':
        return 'camp';
      case 'nouvel_enseignement':
        return 'enseignement';
      case 'nouvelle_actualite':
        return 'actualite';
      case 'cotisation_rappel':
        return 'cotisation';
      default:
        return '';
    }
  }

  Future<void> _open(BuildContext c, Map<String, dynamic> n) async {
    final id = (n['id'] ?? '').toString();
    if (id.isNotEmpty) await app.markNotificationRead(id);
    if (!c.mounted) return;
    final titre = (n['titre'] ?? '').toString();
    final message = (n['message'] ?? '').toString();
    switch (_cible(n)) {
      case 'paiement':
        go(c, const MyPurchasesPage());
      case 'cotisation':
        go(c, const DonsPage());
      case 'camp':
        go(c, const CampsPage());
      case 'enseignement':
        go(c, const TeachingsPage());
      case 'actualite':
        app.requestHome();
        Navigator.of(c).popUntil((r) => r.isFirst);
      default:
        showDialog(
          context: c,
          builder: (ctx) => AlertDialog(
            title: Text(titre),
            content: Text(message),
            actions: [TextButton(onPressed: () => Navigator.pop(ctx), child: Text(tr('Fermer')))],
          ),
        );
    }
  }

  Widget _card(BuildContext c, Map<String, dynamic> n) {
    final unread = n['lue'] != true;
    final titre = (n['titre'] ?? '').toString();
    final message = (n['message'] ?? '').toString();
    final date = _date((n['cree_le'] ?? '').toString());
    return Padding(
      padding: const EdgeInsets.only(bottom: Cp.s1),
      child: Material(
        color: Cp.card,
        borderRadius: BorderRadius.circular(24),
        child: InkWell(
          borderRadius: BorderRadius.circular(24),
          onTap: () => _open(c, n),
          child: Container(
            padding: const EdgeInsets.all(Cp.s2),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: unread ? Cp.gold : Cp.line),
            ),
            child: Row(children: [
              Icon(_icon((n['type'] ?? '').toString()), color: Cp.navy, size: 20),
              const SizedBox(width: Cp.s2),
              Expanded(
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Row(children: [
                    Expanded(
                      child: Text(titre, style: Theme.of(c).textTheme.titleMedium?.copyWith(fontWeight: unread ? FontWeight.w800 : FontWeight.w700, color: Cp.navy)),
                    ),
                    if (unread) Container(width: 10, height: 10, decoration: const BoxDecoration(color: Cp.gold, shape: BoxShape.circle)),
                  ]),
                  if (message.isNotEmpty) ...[
                    const SizedBox(height: 2),
                    Text(message, style: Theme.of(c).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted)),
                  ],
                  if (date.isNotEmpty) ...[
                    const SizedBox(height: 2),
                    Text(date, style: Theme.of(c).textTheme.bodySmall?.copyWith(color: Cp.inkMuted)),
                  ],
                ]),
              ),
            ]),
          ),
        ),
      ),
    );
  }

  // Libellé court d'un type, pour la puce de filtre.
  String _libelleType(String type) {
    switch (type) {
      case 'paiement_valide':
        return tr('Paiement validé');
      case 'paiement_refuse':
        return tr('Paiement refusé');
      case 'cotisation_rappel':
        return tr('Rappel de cotisation');
      case 'nouveau_camp':
        return tr('Nouveau camp');
      case 'nouvel_enseignement':
        return tr('Nouvel enseignement');
      case 'nouvelle_actualite':
        return tr('Nouvelle actualité');
      default:
        return type;
    }
  }

  // Types présents dans la liste, dans l'ordre canonique, pour le
  // déroulant de filtre. La liste complète sert de base, jamais la
  // liste déjà filtrée, pour toujours pouvoir revenir en arrière.
  // Un type inconnu éventuel reste visible sous « Tous », sans
  // choix inventé.
  List<String> _typesPresents() {
    const ordre = ['paiement_valide', 'paiement_refuse', 'cotisation_rappel', 'nouveau_camp', 'nouvel_enseignement', 'nouvelle_actualite'];
    final presents = <String>{};
    for (final n in app.notifications) {
      presents.add((n['type'] ?? '').toString());
    }
    return [for (final t in ordre) if (presents.contains(t)) t];
  }

  // Notifications visibles selon le filtre de type et la vue non
  // lues seulement. L'état lu vient de la liste serveur, la carte
  // et sa navigation restent exactement celles d'avant.
  List<Map<String, dynamic>> _visibles() {
    return [
      for (final n in app.notifications)
        if ((_filtreType.isEmpty || (n['type'] ?? '').toString() == _filtreType) &&
            (!_nonLuesSeulement || n['lue'] != true) &&
            (NotifSettings.types.contains((n['type'] ?? '').toString()) == false || notifSettings.enabled((n['type'] ?? '').toString()))) n,
    ];
  }

  // Filtre par type, carte 84, 7 nov. 2026 : déroulant
  // fermé, pas une rangée de puces, pour ne pas charger
  // l'écran. Le choix reste visible, le menu s'ouvre au
  // toucher. La puce Non lues seulement reste, c'est un
  // interrupteur, pas une liste.

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final visibles = _visibles();
      return basic(tr('Notifications'), [
        if (app.unreadNotifications > 0)
          Padding(
            padding: const EdgeInsets.only(bottom: Cp.s1),
            child: SizedBox(
              width: double.infinity,
              height: 52,
              child: FilledButton.icon(
                icon: const Icon(Icons.done_all_outlined),
                label: Text(tr('Tout marquer comme lu')),
                onPressed: () => unawaited(app.markAllNotificationsRead()),
              ),
            ),
          ),
        Padding(
          padding: const EdgeInsets.only(bottom: Cp.s1),
          child: SizedBox(
            width: double.infinity,
            height: 52,
            child: OutlinedButton.icon(
              icon: const Icon(Icons.tune_outlined),
              label: Text(tr('Réglages par catégorie')),
              onPressed: () => go(c, const NotifSettingsPage()),
            ),
          ),
        ),
        if (app.notifications.isEmpty) ...[
          EmptyNote(icon: Icons.notifications_outlined, text: tr('Aucune notification pour le moment.')),
          const SizedBox(height: Cp.s1),
          Text(tr('Les validations de paiement, les nouveaux camps, enseignements et actualités apparaîtront ici.'), style: Theme.of(c).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted)),
        ] else ...[
          DropdownButtonFormField<String>(
            // Garde : si le type filtré n'est plus présent dans
            // la liste, retour à Tous, sinon le déroulant
            // planterait, sa valeur doit être dans ses choix.
            value: _filtreType.isEmpty || _typesPresents().contains(_filtreType) ? _filtreType : '',
            isExpanded: true,
            items: [
              DropdownMenuItem(value: '', child: Text(tr('Tous'))),
              for (final t in _typesPresents()) DropdownMenuItem(value: t, child: Text(_libelleType(t))),
            ],
            onChanged: (v) => setState(() => _filtreType = v ?? ''),
            decoration: InputDecoration(
              labelText: tr('Type'),
              filled: true,
              fillColor: Cp.card,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(top: Cp.s1, bottom: Cp.s1),
            child: FilterChip(
              label: Text(tr('Non lues seulement')),
              selected: _nonLuesSeulement,
              onSelected: (v) => setState(() => _nonLuesSeulement = v),
            ),
          ),
          if (visibles.isEmpty) EmptyNote(icon: Icons.notifications_outlined, text: tr('Aucune notification pour ce filtre.')),
          for (final n in visibles) _card(c, n),
        ],
      ]);
    });
  }
}

/// Panneau d'edition dans la carte, tranche 3, 1er nov. 2026 : titre
/// et texte seulement, l'image et la programmation restent dans la
/// feuille complete. La sauvegarde reprend exactement le chemin
/// existant (_updateNewsServer, programmation inchangee), donc la
/// route serveur et les gardes ne changent pas.
// Réglages des notifications par catégorie, 1er nov. 2026, version 1,
// harmonisée le 3 nov. 2026 : une seule forme de carte blanche pour
// les 6 catégories, avec les couleurs pastel de la capture d'Axel,
// jamais de couleur inventée pour ces catégories, en-tête bleu nuit
// et interrupteurs bleu nuit comme sur la capture. Le comportement
// ne change pas : un interrupteur par type déjà existant, gardé sur
// l'appareil, et les catégories désactivées ne sont pas poussées.
// Le long paragraphe technique est replié derrière En savoir plus.
// "de la structure", jamais "de la communauté".
class NotifSettingsPage extends StatefulWidget {
  const NotifSettingsPage({super.key});

  @override
  State<NotifSettingsPage> createState() => _NotifSettingsPageState();
}

class _NotifSettingsPageState extends State<NotifSettingsPage> {
  bool _showDetails = false;

  // Couleurs pastel de la capture d'Axel, par catégorie, avec
  // l'icône bleu nuit sur chaque cercle, comme sur la capture.
  // Les tons sont lus sur la capture, pas échantillonnés au pixel.
  Color _pastel(String type) {
    switch (type) {
      case 'paiement_valide':
        return const Color(0xFFDCE9F7); // bleu pastel, carte
      case 'paiement_refuse':
        return const Color(0xFFFDE0E4); // rose pastel, carte
      case 'cotisation_rappel':
        return const Color(0xFFD9EED0); // vert pastel, calendrier
      case 'nouveau_camp':
        return const Color(0xFFFDEEC9); // jaune pastel, personnes
      case 'nouvel_enseignement':
        return const Color(0xFFE9E2F5); // violet pastel, livre
      case 'nouvelle_actualite':
        return const Color(0xFFE2F2D9); // vert pastel, journal
      default:
        return Cp.gold.withValues(alpha: 0.18);
    }
  }

  IconData _icon(String type) {
    switch (type) {
      case 'paiement_valide':
        return Icons.credit_card_outlined;
      case 'paiement_refuse':
        return Icons.credit_card_outlined;
      case 'cotisation_rappel':
        return Icons.calendar_month_outlined;
      case 'nouveau_camp':
        return Icons.groups_outlined;
      case 'nouvel_enseignement':
        return Icons.menu_book_outlined;
      case 'nouvelle_actualite':
        return Icons.newspaper_outlined;
      default:
        return Icons.notifications_outlined;
    }
  }

  // Petit badge de la capture, seulement quand il existe sur elle.
  Widget? _badge(String type) {
    if (type == 'paiement_valide') {
      return const Icon(Icons.check_circle, color: Color(0xFF22A65A), size: 20);
    }
    if (type == 'paiement_refuse') {
      return const Icon(Icons.cancel, color: Color(0xFFE53935), size: 20);
    }
    return null;
  }

  String _subtitle(String type) {
    switch (type) {
      case 'paiement_valide':
        return tr('Recevoir une notification après un paiement réussi.');
      case 'paiement_refuse':
        return tr('Être informé en cas d’échec de paiement.');
      case 'cotisation_rappel':
        return tr('Recevoir des rappels pour vos cotisations.');
      case 'nouveau_camp':
        return tr('Être informé des camps, conférences et événements.');
      case 'nouvel_enseignement':
        return tr('Recevoir les nouveaux enseignements.');
      case 'nouvelle_actualite':
        return tr('Être informé des actualités de la structure.');
      default:
        return '';
    }
  }

  Widget _notifCard({required Widget icon, required String title, String? subtitle, required bool value, required ValueChanged<bool> onChanged}) {
    return Container(
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
      child: Padding(
        padding: const EdgeInsets.all(Cp.s2),
        child: Row(children: [
          icon,
          const SizedBox(width: Cp.s2),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(title, style: const TextStyle(fontWeight: FontWeight.w700, color: Cp.navy)),
            if (subtitle != null && subtitle.isNotEmpty) ...[
              const SizedBox(height: 2),
              Text(subtitle, style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted)),
            ],
          ])),
          const SizedBox(width: Cp.s1),
          Switch(value: value, onChanged: onChanged, activeColor: Cp.navy, activeTrackColor: Cp.navy),
        ]),
      ),
    );
  }

  Widget _categoryIcon(String type) {
    final badge = _badge(type);
    return SizedBox(
      width: 40,
      height: 40,
      child: Stack(children: [
        Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(color: _pastel(type), shape: BoxShape.circle),
          child: Icon(_icon(type), color: Cp.navy, size: 20),
        ),
        if (badge != null) Positioned(right: 0, bottom: 0, child: badge),
      ]),
    );
  }

  Widget _plainIcon(IconData icon) {
    return Container(
      width: 40,
      height: 40,
      decoration: BoxDecoration(color: Cp.gold.withValues(alpha: 0.18), shape: BoxShape.circle),
      child: Icon(icon, color: Cp.navy, size: 20),
    );
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      return basic(tr('Réglages des notifications'), [
        // Carte d'en-tête de la capture, texte raccourci, sans
        // paragraphe technique, sans jargon, sans "communauté".
        Container(
          decoration: BoxDecoration(color: const Color(0xFFE9E2F5), borderRadius: BorderRadius.circular(24)),
          child: Padding(
            padding: const EdgeInsets.all(Cp.s2),
            child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Container(
                width: 40,
                height: 40,
                decoration: const BoxDecoration(color: Color(0xFFDCD2F2), shape: BoxShape.circle),
                child: const Icon(Icons.notifications_outlined, color: Cp.navy, size: 20),
              ),
              const SizedBox(width: Cp.s2),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(tr('Préférences de notification'), style: Theme.of(c).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
                const SizedBox(height: 2),
                Text(tr('Choisissez les notifications que vous voulez recevoir.'), style: Theme.of(c).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted)),
              ])),
            ]),
          ),
        ),
        const SizedBox(height: Cp.s1),
        InkWell(
          borderRadius: BorderRadius.circular(12),
          onTap: () => setState(() => _showDetails = !_showDetails),
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 4),
            child: Row(children: [
              Text(tr('En savoir plus'), style: const TextStyle(fontWeight: FontWeight.w700, color: Cp.goldDeep)),
              Icon(_showDetails ? Icons.keyboard_arrow_up_outlined : Icons.keyboard_arrow_down_outlined, color: Cp.goldDeep, size: 20),
            ]),
          ),
        ),
        if (_showDetails)
          Text(
            isEn
                ? 'These settings filter the notification centre and, on Android, push notifications too: a category switched off here is sent with the device token, so the server does not push anything for it. A notification already shown by Android while the app was closed cannot be withdrawn by the app.'
                : 'Ces réglages filtrent le centre de notifications et, sur Android, les notifications poussées aussi : une catégorie désactivée ici est envoyée avec le jeton de l’appareil, pour que le serveur ne pousse rien pour elle. Une notification déjà affichée par Android quand l’application était fermée ne peut pas être retirée par l’application.',
            style: Theme.of(c).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted),
          ),
        const SizedBox(height: Cp.s2),
        ListenableBuilder(
          listenable: notifSettings,
          builder: (c, _) => Column(children: [
            for (final t in NotifSettings.types) ...[
              _notifCard(
                icon: _categoryIcon(t),
                title: notifSettings.label(t),
                subtitle: _subtitle(t),
                value: notifSettings.enabled(t),
                onChanged: (v) async {
                  await notifSettings.setCategory(t, v);
                  await PushNotifications.instance.syncCategories();
                },
              ),
              const SizedBox(height: Cp.s1),
            ],
          ]),
        ),
        const SizedBox(height: Cp.s2),
        Row(children: [
          const Icon(Icons.info_outlined, color: Cp.navy, size: 20),
          const SizedBox(width: Cp.s1),
          Expanded(child: Text(tr('Rappels locaux'), style: const TextStyle(fontWeight: FontWeight.w700, color: Cp.navy))),
        ]),
        const SizedBox(height: Cp.s1),
        if (kIsWeb)
          Text(tr('Sur le web, les rappels locaux n’existent pas : seule la cloche interne s’affiche quand l’application est ouverte.'), style: Theme.of(c).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted)),
        if (!kIsWeb) ...[
          _notifCard(
            icon: _plainIcon(Icons.wb_twilight_outlined),
            title: tr('Rappel de prière du matin'),
            subtitle: tr('Chaque matin à 6 h 30, un message varié pour prier.'),
            value: app.priereMatinNotif,
            onChanged: (v) async {
              if (!v) {
                app.setPriereMatinNotif(false);
                await DailyVerseNotifications.instance.cancelPrayerReminder();
                return;
              }
              await DailyVerseNotifications.instance.init();
              // Carte 98, 8 nov. 2026 : plus de nouvelle demande,
              // renvoi vers les réglages du téléphone seulement.
              final granted = await DailyVerseNotifications.instance.permissionGranted();
              if (!granted) {
                toast(context, isEn ? 'Notifications refused: enable them in the phone settings to receive the morning prayer reminder.' : 'Notifications refusées : activez-les dans les paramètres du téléphone pour recevoir le rappel de prière du matin.');
                await openAppSettings();
                return;
              }
              app.setPriereMatinNotif(true);
              await DailyVerseNotifications.instance.schedulePrayerReminder(app.lang);
            },
          ),
          const SizedBox(height: Cp.s1),
          _notifCard(
            icon: _plainIcon(Icons.menu_book_outlined),
            title: tr('Rappel Bible non lue'),
            subtitle: tr('Chaque soir à 20 h, seulement si la Bible n’a pas été ouverte ce jour-là.'),
            value: app.bibleNonLueNotif,
            onChanged: (v) async {
              if (!v) {
                app.setBibleNonLueNotif(false);
                await DailyVerseNotifications.instance.cancelBibleReminder();
                return;
              }
              await DailyVerseNotifications.instance.init();
              // Carte 98, 8 nov. 2026 : plus de nouvelle demande,
              // renvoi vers les réglages du téléphone seulement.
              final granted = await DailyVerseNotifications.instance.permissionGranted();
              if (!granted) {
                toast(context, isEn ? 'Notifications refused: enable them in the phone settings to receive the unread Bible reminder.' : 'Notifications refusées : activez-les dans les paramètres du téléphone pour recevoir le rappel Bible non lue.');
                await openAppSettings();
                return;
              }
              app.setBibleNonLueNotif(true);
              await DailyVerseNotifications.instance.scheduleBibleReminder(app.lang);
            },
          ),
          if (app.priereMatinNotif || app.bibleNonLueNotif)
            FutureBuilder<bool>(
              future: DailyVerseNotifications.instance.permissionGranted(),
              builder: (c2, snap) {
                if (snap.data == true) return const SizedBox.shrink();
                return Card(
                  child: ListTile(
                    title: Text(isEn ? 'Notifications blocked on this phone' : 'Notifications bloquées sur ce téléphone'),
                    subtitle: Text(isEn ? 'A reminder is on, but the phone blocks notifications, so no reminder arrives.' : 'Un rappel est activé, mais le téléphone bloque les notifications, donc aucun rappel n’arrive.'),
                    trailing: FilledButton(
                      // Carte 98, 8 nov. 2026 : ce bouton ne redemande
                      // plus la permission, il ouvre les réglages du
                      // téléphone. Une seule demande, à l'installation.
                      onPressed: () async {
                        await openAppSettings();
                      },
                      child: Text(isEn ? 'Open settings' : 'Ouvrir les réglages'),
                    ),
                  ),
                );
              },
            ),
        ],
      ]);
    });
  }
}

class _NewsEditPanel extends StatefulWidget {
  const _NewsEditPanel({super.key, required this.news, required this.liste, required this.onClose});
  final NewsItem news;
  final List<NewsItem> liste;
  final VoidCallback onClose;

  @override
  State<_NewsEditPanel> createState() => _NewsEditPanelState();
}

class _NewsEditPanelState extends State<_NewsEditPanel> {
  late final TextEditingController _titre;
  late final TextEditingController _texte;
  var _saving = false;

  @override
  void initState() {
    super.initState();
    _titre = TextEditingController(text: widget.news.title);
    _texte = TextEditingController(text: widget.news.text);
  }

  @override
  void dispose() {
    _titre.dispose();
    _texte.dispose();
    super.dispose();
  }

  InputDecoration _decoration(String label) => InputDecoration(
        labelText: label,
        filled: true,
        fillColor: Cp.card,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
      );

  Widget _field(TextEditingController ctrl, String label, {int lines = 1}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: Cp.s1),
      child: TextField(
        controller: ctrl,
        maxLines: lines,
        keyboardType: lines > 1 ? TextInputType.multiline : TextInputType.text,
        decoration: _decoration(label),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final n = widget.news;
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(
        color: Cp.paper,
        borderRadius: BorderRadius.circular(Cp.radiusCard),
        border: Border.all(color: Cp.gold.withValues(alpha: 0.4)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(tr('Modifier sur place'), style: t.titleMedium),
          const SizedBox(height: Cp.s1),
          _field(_titre, tr('Titre')),
          _field(_texte, tr('Texte'), lines: 4),
          Row(children: [
            Expanded(
              child: FilledButton(
                onPressed: _saving
                    ? null
                    : () async {
                        final titre = _titre.text.trim();
                        if (titre.isEmpty) return;
                        setState(() => _saving = true);
                        final updated = NewsItem(
                          titre,
                          _texte.text.trim(),
                          n.etab,
                          n.date,
                          etablissementId: n.etablissementId,
                          imagePath: n.imagePath,
                          imageUrl: n.imageUrl,
                          serverId: n.serverId,
                          programmeeLe: n.programmeeLe,
                        );
                        var remplace = false;
                        for (final l in [app.news, app.newsAdmin]) {
                          final idx = l.indexOf(n);
                          if (idx >= 0) {
                            l[idx] = updated;
                            remplace = true;
                          }
                        }
                        if (!remplace) widget.liste.insert(0, updated);
                        app.changed();
                        await _updateNewsServer(context, updated);
                        if (!mounted) return;
                        widget.onClose();
                      },
                child: Text(_saving ? 'Enregistrement…' : tr('Enregistrer')),
              ),
            ),
            const SizedBox(width: Cp.s1),
            Expanded(
              child: OutlinedButton(
                onPressed: _saving ? null : widget.onClose,
                child: Text(tr('Annuler')),
              ),
            ),
          ]),
        ],
      ),
    );
  }
}


/// Publication d'une actualité, flux partagé, 1er nov. 2026 : le
/// bouton de la page Actualités et le lien Publier de l'accueil
/// ouvrent exactement le même flux, choix de l'établissement puis
/// feuille « Nouvelle actualité » puis publication.
Future<void> ajouterActualite(BuildContext c) async {
  final general = app.isAdminGeneral;
  final myEtab = app.member?.etab ?? '';
  final visibleEtabs = general ? app.etabs : app.etabs.where((e) => e.name == myEtab || etabDisplayName(e.name) == etabDisplayName(myEtab)).toList();
  if (!general && visibleEtabs.isEmpty) {
    toast(c, tr('Votre compte n’est rattaché à aucun établissement. Demandez à l’administrateur général de vous rattacher à un établissement.'));
    return;
  }
  final names = general ? ['', ...app.etabs.map((e) => e.name)] : visibleEtabs.map((e) => e.name).toList();
  final target = await pick<String>(c, tr('Pour quel établissement ?'), names, (s) => s.isEmpty ? tr('Générale (toute la structure)') : s);
  if (target == null || !c.mounted) return;
  imageFormSheet(c, tr('Nouvelle actualité'), [F('title', tr('Titre')), F('text', tr('Texte'), lines: 4)], tr('Publier'), (v, imagePath) {
    final etabId = target.isEmpty ? '' : app.etabs.where((e) => e.name == target).map((e) => e.id).firstWhere((id) => true, orElse: () => '');
    final prog = (v['programmee_le'] ?? '').isEmpty ? null : DateTime.tryParse(v['programmee_le']!);
    final news = NewsItem(v['title']!, v['text']!, target, DateTime.now(), etablissementId: etabId, imagePath: imagePath, programmeeLe: prog);
    if (app.isAdminGeneral) {
      app.newsAdmin.insert(0, news);
      if (prog == null) app.news.insert(0, news);
    } else {
      app.news.insert(0, news);
    }
    app.changed();
    _publishNews(c, news);
  }, programmer: true);
}

class NewsPage extends StatefulWidget {
  const NewsPage({super.key});

  @override
  State<NewsPage> createState() => _NewsPageState();
}

class _NewsPageState extends State<NewsPage> {
  NewsItem? _editingNews;

  // Gestes repris dans le menu de la carte, tranche 2, 1er nov. 2026 :
  // mêmes feuilles et mêmes confirmations que la ligne sous la
  // carte d'avant.
  void _modifierNews(BuildContext c, NewsItem n, List<NewsItem> liste) {
    imageFormSheet(c, tr('Modifier l’actualité'), [F('title', tr('Titre'), initial: n.title), F('text', tr('Texte'), lines: 4, initial: n.text)], tr('Enregistrer'), (v, imagePath) {
      final prog = (v['programmee_le'] ?? '').isEmpty ? null : DateTime.tryParse(v['programmee_le']!);
      final updated = NewsItem(v['title']!, v['text']!, n.etab, n.date, etablissementId: n.etablissementId, imagePath: imagePath, imageUrl: imagePath == n.imagePath ? n.imageUrl : '', serverId: n.serverId, programmeeLe: prog);
      var remplace = false;
      for (final l in [app.news, app.newsAdmin]) {
        final idx = l.indexOf(n);
        if (idx >= 0) {
          l[idx] = updated;
          remplace = true;
        }
      }
      if (!remplace) liste.insert(0, updated);
      app.changed();
      _updateNewsServer(c, updated, annulerProgrammation: n.programmeeLe != null && prog == null);
    }, initialImagePath: n.imagePath, programmer: true, initialProgrammeeLe: n.programmeeLe);
  }

  Future<void> _supprimerNews(BuildContext c, NewsItem n) async {
    final ok = await _confirmRetirer(c, tr('Supprimer cette actualité ?'), tr('L’actualité disparaîtra pour tous les membres.'));
    if (!ok) return;
    try {
      if (n.serverId.isNotEmpty) await api.deleteActualite(n.serverId);
      app.news.remove(n);
      app.newsAdmin.remove(n);
      app.changed();
      toast(c, tr('Actualité supprimée.'));
    } catch (e) {
      toast(c, 'Suppression refusée ($e). Rôle administrateur général requis.');
    }
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      // Liste administrateur, 30 oct. 2026 : l'administrateur
      // général voit aussi ses actualités programmées, avec leur
      // date prévue. Les autres ne voient que les publiées.
      final liste = app.isAdminGeneral ? app.newsAdmin : app.news;
      return basic(tr('Actualités'), [
          if (app.isAdmin)
            Padding(
              padding: const EdgeInsets.only(bottom: Cp.s1),
              child: SizedBox(
                width: double.infinity,
                height: 52,
                child: FilledButton.icon(
                  icon: const Icon(Icons.add),
                  label: Text(tr('Ajouter une actualité')),
                  onPressed: () => ajouterActualite(c),
                ),
              ),
            ),
          if (liste.isEmpty)
            EmptyNote(icon: Icons.chat_bubble_outline, text: tr('Aucune actualité pour le moment.'))
          else
            newsCarousel(c, liste, onModifier: (n) => _modifierNews(c, n, liste), onSupprimer: (n) => _supprimerNews(c, n), onModifierSurPlace: (n) => setState(() => _editingNews = n), editPanelFor: (n) => _editingNews == n ? _NewsEditPanel(key: ValueKey(n), news: n, liste: liste, onClose: () => setState(() => _editingNews = null)) : null),
        ]);
      });
  }
}

class BureauPage extends StatefulWidget {
  const BureauPage({super.key});

  @override
  State<BureauPage> createState() => _BureauPageState();
}

class _BureauPageState extends State<BureauPage> {
  String _filter = 'Tous';

  // Filtres du Bureau, 3 nov. 2026 : Tous, Structure, puis les
  // établissements. Structure couvre les anciennes entrées sans
  // établissement, et les entrées locales historiques 'Communauté'.
  // La liste partagée kEtabFilters n'est pas changée, pour ne
  // pas casser le filtre des camps, dont l'ancienne portée
  // 'Communauté' reste acceptée.
  static const List<String> _filtresBureau = ['Tous', 'Structure', 'Groupe Scolaire ISPAM', 'Groupe Scolaire Céleste', 'Collège La Silhouette', 'BNC'];
  bool _matchesFilter(BureauMember b) {
    if (_filter == 'Tous') return true;
    if (_filter == 'Structure') return b.etab.isEmpty || b.etab == 'Structure' || b.etab == 'Communauté';
    return b.etab == _filter || etabDisplayName(b.etab) == _filter;
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      final filtered = app.bureau.where(_matchesFilter).toList();
      return basic(tr('Le Bureau'), [
        // Titre compact propre à cette page, 28 oct. 2026 : 28 px
        // au lieu de 32, sous-titre 15 px, pour aérer l'en-tête
        // sans toucher au titre partagé des autres pages.
        Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(tr('Le Bureau'), style: t.titleLarge?.copyWith(fontSize: 28, fontWeight: FontWeight.w800, color: Cp.navy)),
            const SizedBox(height: 4),
            Text(tr('Contacts affichés avec accord.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 15)),
          ])),
          if (app.isAdminGeneral) ...[
            const SizedBox(width: 12),
            goldButton(icon: Icons.add, label: tr('Ajouter'), onPressed: () => addBureauMember(c)),
          ],
        ]),
        const SizedBox(height: Cp.s1),
        filterChipsHorizontal(_filtresBureau, _filter, (v) => setState(() => _filter = v)),
        // Import autonome du Bureau, 3 nov. 2026 : l'administrateur
        // général dépose une liste Word ou PDF, voit l'aperçu,
        // puis valide, sans passer par Muse. Aucun compte membre
        // n'est créé par cet import.
        if (app.isAdminGeneral) ...[
          const SizedBox(height: Cp.s1),
          SizedBox(
            width: double.infinity,
            height: 52,
            child: OutlinedButton.icon(
              onPressed: () => goAdmin(c, () => admin.ImportBureauPage()),
              icon: const Icon(Icons.upload_outlined),
              label: Text(tr('Importer un fichier')),
            ),
          ),
        ],
        const SizedBox(height: Cp.s1),
        if (app.bureau.isEmpty)
          // État vide compact, 28 oct. 2026 : plus de grande zone
          // en pointillés, une carte blanche centrée, icône dans
          // un cercle or pâle, titre, description, et pour un
          // administrateur seulement, le bouton de création déjà
          // présent dans l'Espace structure.
          Card(
            child: Padding(
              padding: const EdgeInsets.all(Cp.s3),
              child: Column(children: [
                Container(
                  width: 64,
                  height: 64,
                  decoration: BoxDecoration(color: Cp.gold.withValues(alpha: 0.15), shape: BoxShape.circle),
                  child: const Icon(Icons.people_outlined, color: Cp.goldDeep, size: 28),
                ),
                const SizedBox(height: Cp.s2),
                Text(tr('Aucun responsable pour le moment'), textAlign: TextAlign.center, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
                const SizedBox(height: Cp.s1),
                Text(tr('Ajoutez les membres du bureau pour présenter les responsables de votre structure.'), textAlign: TextAlign.center, style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
                if (app.isAdminGeneral) ...[
                  const SizedBox(height: Cp.s2),
                  SizedBox(
                    width: double.infinity,
                    height: 52,
                    child: FilledButton.icon(
                      onPressed: () => addBureauMember(c),
                      icon: const Icon(Icons.add),
                      label: Text(tr('+ Ajouter un responsable')),
                    ),
                  ),
                ],
              ]),
            ),
          )
        else if (filtered.isEmpty)
          // Filtre sans résultat, alors que l'annuaire n'est pas
          // vide : ce n'est pas l'état vide, c'est un retour au
          // filtre Tous, en un toucher.
          Card(
            child: Padding(
              padding: const EdgeInsets.all(Cp.s2),
              child: Column(children: [
                Text(tr('Aucun responsable pour ce filtre.'), textAlign: TextAlign.center, style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
                const SizedBox(height: Cp.s1),
                TextButton(onPressed: () => setState(() => _filter = 'Tous'), child: Text(tr('Voir tous les responsables'))),
              ]),
            ),
          )
        else
          // Une carte par responsable, 28 oct. 2026 : nom, fonction,
          // établissement, photo si elle existe, coordonnées
          // seulement avec consentement, sans action inventée.
          // Carte 73, 7 nov. 2026 : colonne unique sous 600 px,
          // deux colonnes à partir de 600 px, contact à droite,
          // pour ne jamais couper un texte ni déborder, du
          // téléphone étroit à l'ordinateur.
          for (final b in filtered) ...[
            Card(
              child: Padding(
                padding: const EdgeInsets.all(Cp.s2),
                child: LayoutBuilder(builder: (ctx, contraintes) {
                  // Carte 73, 7 nov. 2026, membres du Bureau non alignes.
                  // Cause : la Rangee etait en haut (start), la photo
                  // arrondie a 28 et le rond sans photo n'avaient pas la
                  // meme forme, le bouton menu n'avait pas de largeur
                  // fixe, et le contact restait dans la colonne du nom
                  // a toutes les largeurs, donc chaque ligne avait une
                  // hauteur et une largeur de texte differentes.
                  // Correctif, sans changer les donnees ni les fonctions :
                  // photo en cercle fixe de 56, avec ou sans photo ;
                  // Rangee centree verticalement, photo et menu alignes
                  // sur le bloc nom et fonction ; menu dans une case
                  // fixe de 48 ; a partir de 600 px de large, le contact
                  // passe dans une deuxieme colonne fixe (3 pour 2),
                  // vide quand il n'y a pas de contact, pour que la
                  // colonne du nom garde la meme largeur sur chaque
                  // ligne ; en dessous de 600 px, le contact reste sous
                  // l'etablissement, comme avant. Aucun texte n'est
                  // coupe : nom, fonction, etablissement et contact
                  // passent a la ligne, sans maxLines ni points de
                  // suspension.
                  final large = contraintes.maxWidth >= 600;
                  final photo = ClipOval(
                    child: SizedBox(
                      width: 56,
                      height: 56,
                      child: b.imagePath.isNotEmpty
                          ? contentImage(b.imagePath, '', height: 56)
                          : Container(
                              color: Cp.gold.withValues(alpha: 0.15),
                              child: const Icon(Icons.person_outline, color: Cp.navy, size: 28),
                            ),
                    ),
                  );
                  final textes = Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text(b.name, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
                    const SizedBox(height: 2),
                    Text(b.role, style: t.bodyMedium),
                    const SizedBox(height: 2),
                    Text(etabDisplayName(b.etab), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
                    if (!large && b.consent && b.contact.isNotEmpty) ...[
                      const SizedBox(height: 2),
                      Text(b.contact, style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
                    ],
                  ]);
                  final contact = b.consent && b.contact.isNotEmpty
                      ? Text(b.contact, style: t.bodyMedium?.copyWith(color: Cp.inkMuted))
                      : const SizedBox.shrink();
                  final menu = SizedBox(
                    width: Cp.touch,
                    child: PopupMenuButton<String>(
                      tooltip: tr('Actions'),
                      icon: const Icon(Icons.more_vert_outlined),
                      onSelected: (v) async {
                        if (v == 'modifier') {
                          if (b.serverId.isEmpty) {
                            toast(c, tr('Recharger la liste pour modifier ce responsable.'));
                            unawaited(app.syncFromServer());
                          } else {
                            unawaited(_bureauFormSheet(c, existant: b));
                          }
                        } else if (v == 'retirer') {
                          if (b.serverId.isEmpty) {
                            toast(c, tr('Recharger la liste pour modifier ce responsable.'));
                            unawaited(app.syncFromServer());
                          } else {
                            final ok = await showDialog<bool>(
                              context: c,
                              builder: (ctx) => AlertDialog(
                                title: Text(tr('Retirer ce responsable ?')),
                                content: Text(tr('Le compte membre lié, s’il existe, n’est pas supprimé.')),
                                actions: [
                                  TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
                                  FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Retirer'))),
                                ],
                              ),
                            );
                            if (ok == true) {
                              try {
                                await api.supprimerBureau(b.serverId);
                                if (c.mounted) {
                                  toast(c, tr('Responsable retiré.'));
                                  unawaited(app.syncFromServer());
                                }
                              } catch (e) {
                                if (c.mounted) toast(c, e.toString());
                              }
                            }
                          }
                        }
                      },
                      itemBuilder: (_) => [
                        PopupMenuItem(value: 'modifier', child: Text(tr('Modifier sur place'))),
                        PopupMenuItem(value: 'retirer', child: Text(tr('Retirer'))),
                      ],
                    ),
                  );
                  return Row(crossAxisAlignment: CrossAxisAlignment.center, children: [
                    photo,
                    const SizedBox(width: Cp.s1),
                    if (large) ...[
                      Expanded(flex: 3, child: textes),
                      const SizedBox(width: Cp.s2),
                      Expanded(flex: 2, child: contact),
                    ] else
                      Expanded(child: textes),
                    if (app.isAdminGeneral) ...[
                      const SizedBox(width: Cp.s1),
                      menu,
                    ],
                  ]);
                }),
              ),
            ),
            const SizedBox(height: Cp.s1),
          ],
      ]);
    });
  }
}

class LibrairiePage extends StatefulWidget {
  const LibrairiePage({super.key, this.scrollController});
  final ScrollController? scrollController;

  @override
  State<LibrairiePage> createState() => _LibrairiePageState();
}

/// Page Librairie, tranche 1, 1er nov. 2026 : le seul etat local est
/// l'identifiant du livre en cours de modification sur place, pour
/// ouvrir l'editeur dans la carte meme, sans quitter l'onglet.
class _LibrairiePageState extends State<LibrairiePage> {
  int? _editingBookId;

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      return basic(
        tr('Librairie'),
        [
          if (app.isAdminGeneral)
            Padding(
              padding: const EdgeInsets.only(bottom: Cp.s1),
              child: SizedBox(
                width: double.infinity,
                height: 52,
                child: FilledButton.icon(
                  icon: const Icon(Icons.add),
                  label: Text(tr('Ajouter un livre')),
                  onPressed: () => bookFormSheet(c, tr('Nouveau livre'), [
                    F('title', tr('Titre')),
                    F('author', tr('Auteur')),
                    F('desc', tr('Description'), lines: 3, optional: true),
                    F('price', tr('Prix (FCFA)'), number: true),
                    F('format', tr('Format (PDF, EPUB…)'), optional: true),
                    F('url', tr('Lien du fichier'), optional: true),
                  ], tr('Publier'), (v, imagePath, livrePath, livreBytes, livreName) {
                    final p = _price(c, v['price']!);
                    if (p == null) return;
                    final book = Book(id: app.nextId(), title: v['title']!, author: v['author']!, price: p,
                        description: v['desc']!, format: v['format']!, fileUrl: v['url']!, imagePath: imagePath);
                    app.books.add(book);
                    app.changed();
                    _publishBook(c, book, livrePath: livrePath, livreBytes: livreBytes, livreName: livreName);
                  }),
                ),
              ),
            ),
          if (app.cart.isNotEmpty)
            Padding(
              padding: const EdgeInsets.only(bottom: Cp.s1),
              child: SizedBox(
                width: double.infinity,
                height: 52,
                child: FilledButton.icon(
                  icon: const Icon(Icons.shopping_cart_outlined),
                  label: Text('${tr('Voir mon panier')} (${app.cart.length}) · ${fcfa(app.cart.fold<int>(0, (s, b) => s + b.price))}'),
                  onPressed: () => go(c, const CartPage()),
                ),
              ),
            ),
          if (app.books.isEmpty)
            EmptyNote(icon: Icons.book_outlined, text: tr('Le catalogue est vide. La structure ajoute les ouvrages depuis son espace.'))
          else
            for (final b in app.books) ...[
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(Cp.s2),
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    if (hasContentImage(b.imagePath, b.imageUrl)) ...[contentImage(b.imagePath, b.imageUrl), const SizedBox(height: Cp.s1)],
                    Row(children: [
                      Expanded(child: Text(b.title, style: t.titleMedium)),
                      if (app.isAdminGeneral)
                        PopupMenuButton<String>(
                          tooltip: tr('Actions'),
                          icon: const Icon(Icons.more_vert),
                          onSelected: (v) async {
                            if (v == 'modifier') {
                              setState(() => _editingBookId = b.id);
                            } else if (v == 'acheter') {
                              _acheterLivre(c, b);
                            } else if (v == 'retirer') {
                              final ok = await _confirmRetirer(c, tr('Retirer ce livre ?'), tr('Le livre disparaîtra du catalogue. Les achats déjà payés ne changent pas.'));
                              if (ok) {
                                setState(() => _editingBookId = null);
                                _unpublishBook(c, b);
                              }
                            }
                          },
                          itemBuilder: (_) => [
                            PopupMenuItem(value: 'modifier', child: Text(tr('Modifier sur place'))),
                            PopupMenuItem(value: 'acheter', child: Text(tr('Acheter ce livre'))),
                            PopupMenuItem(value: 'retirer', child: Text(tr('Retirer du catalogue'))),
                          ],
                        ),
                    ]),
                    const SizedBox(height: 2),
                    Text(b.author, style: t.bodyMedium),
                    if (b.description.isNotEmpty) ...[const SizedBox(height: Cp.s1), Text(b.description, style: t.bodyMedium)],
                    const SizedBox(height: Cp.s1),
                    if (b.format.isNotEmpty)
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(color: Cp.gold.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(20)),
                        child: Text(b.format, style: t.bodyMedium?.copyWith(color: Cp.goldDeep, fontWeight: FontWeight.w700)),
                      ),
                    const SizedBox(height: Cp.s1),
                    Text(fcfa(b.price), style: t.titleMedium?.copyWith(color: Cp.goldDeep)),
                    if (_editingBookId == b.id) ...[
                      const SizedBox(height: Cp.s1),
                      _BookEditPanel(
                        key: ValueKey('edit-${b.id}'),
                        book: b,
                        onClose: () => setState(() => _editingBookId = null),
                      ),
                    ],
                                        if (!app.hasPurchasedBook(b)) ...[
                      const SizedBox(height: Cp.s1),
                      Text(tr('Fichier débloqué après paiement confirmé.'), style: t.bodyMedium),
                    ],
                    const SizedBox(height: Cp.s1),
                    SizedBox(
                      width: double.infinity,
                      height: 52,
                      child: app.hasPurchasedBook(b)
                          ? OutlinedButton(onPressed: () => _acheterLivre(c, b), child: Text(tr('Lire')))
                          : (app.cart.contains(b)
                              ? OutlinedButton(onPressed: () => _acheterLivre(c, b), child: Text(tr('Voir mon panier')))
                              : FilledButton(
                                  onPressed: () => _acheterLivre(c, b),
                                  child: Text(tr('Ajouter au panier')),
                                )),
                    ),
                  ]),
                ),
              ),
              const SizedBox(height: Cp.s1),
            ],
        ],
        actions: [
          IconButton(
            tooltip: tr('Panier'),
            icon: Badge(isLabelVisible: app.cart.isNotEmpty, label: Text('${app.cart.length}'), child: const Icon(Icons.shopping_cart_outlined)),
            onPressed: () => go(c, const CartPage()),
          ),
          IconButton(tooltip: tr('Mes achats'), icon: const Icon(Icons.shopping_bag_outlined), onPressed: () => go(c, const MyPurchasesPage())),
        ],
        controller: widget.scrollController,
      );
    });
  }
}

/// Achat d'un livre depuis sa carte, meme comportement que le bouton
/// d'achat existant : lecture si deja achete, panier si deja ajoute,
/// sinon ajout au panier. Partage par le bouton et le menu ⋯, pour
/// ne pas dupliquer la regle.
void _acheterLivre(BuildContext c, Book b) {
  if (app.hasPurchasedBook(b)) {
    goMembre(c, () => membre.ReaderPage(book: b));
  } else if (app.cart.contains(b)) {
    go(c, const CartPage());
  } else {
    app.cart.add(b);
    app.changed();
    toast(c, tr('Ajouté au panier.'));
  }
}

/// Editeur de livre ouvert dans la carte meme, tranche 1, 1er nov. 2026,
/// etendu tranche boutons du bas, 1er nov. 2026 : memes champs que la
/// feuille existante, couverture et lien du fichier compris, pour que
/// le menu trois points seul suffise apres le retrait des boutons
/// Modifier et Retirer en bas de la fiche.
/// La sauvegarde reprend exactement le chemin existant (_updateBookServer),
/// donc la route serveur, les gardes et les factures ne changent pas.
class _BookEditPanel extends StatefulWidget {
  const _BookEditPanel({super.key, required this.book, required this.onClose});
  final Book book;
  final VoidCallback onClose;

  @override
  State<_BookEditPanel> createState() => _BookEditPanelState();
}

class _BookEditPanelState extends State<_BookEditPanel> {
  late final TextEditingController _titre;
  late final TextEditingController _auteur;
  late final TextEditingController _desc;
  late final TextEditingController _prix;
  late final TextEditingController _format;
  late final TextEditingController _lien;
  var _couverturePath = '';
  Uint8List? _couvertureBytes;
  String? _livrePath;
  List<int>? _livreBytes;
  var _livreName = '';
  var _livrePicking = false;
  var _livrePickError = '';
  var _saving = false;

  @override
  void initState() {
    super.initState();
    final b = widget.book;
    _titre = TextEditingController(text: b.title);
    _auteur = TextEditingController(text: b.author);
    _desc = TextEditingController(text: b.description);
    _prix = TextEditingController(text: b.price.toString());
    _format = TextEditingController(text: b.format);
    _lien = TextEditingController(text: b.fileUrl);
    _couverturePath = b.imagePath;
  }

  @override
  void dispose() {
    _titre.dispose();
    _auteur.dispose();
    _desc.dispose();
    _prix.dispose();
    _format.dispose();
    _lien.dispose();
    super.dispose();
  }

  InputDecoration _decoration(String label) => InputDecoration(
        labelText: label,
        filled: true,
        fillColor: Cp.card,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
      );

  Widget _field(TextEditingController ctrl, String label, {int lines = 1, bool number = false}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: Cp.s1),
      child: TextField(
        controller: ctrl,
        maxLines: lines,
        keyboardType: number ? TextInputType.number : (lines > 1 ? TextInputType.multiline : TextInputType.text),
        decoration: _decoration(label),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(
        color: Cp.paper,
        borderRadius: BorderRadius.circular(Cp.radiusCard),
        border: Border.all(color: Cp.gold.withValues(alpha: 0.4)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(tr('Modifier sur place'), style: t.titleMedium),
          const SizedBox(height: Cp.s1),
          _field(_titre, tr('Titre')),
          _field(_auteur, tr('Auteur')),
          _field(_desc, tr('Description'), lines: 3),
          _field(_prix, tr('Prix (FCFA)'), number: true),
          _field(_format, tr('Format')),
          _field(_lien, tr('Lien du fichier')),
          if (_couvertureBytes != null) ...[contentImage('', '', bytes: _couvertureBytes), const SizedBox(height: Cp.s1)],
          Row(children: [
            Expanded(
              child: OutlinedButton.icon(
                onPressed: _saving
                    ? null
                    : () async {
                        if (!await demanderPhotosAuMoment(context)) return;
                        final picked = await ImagePicker().pickImage(source: ImageSource.gallery);
                        if (picked == null || !mounted) return;
                        final bytes = await picked.readAsBytes();
                        setState(() {
                          _couverturePath = picked.path;
                          _couvertureBytes = bytes;
                        });
                      },
                icon: const Icon(Icons.image_outlined),
                label: Text(_couverturePath.isEmpty ? tr('Choisir une couverture') : tr('Changer la couverture')),
              ),
            ),
            if (_couverturePath.isNotEmpty) ...[
              const SizedBox(width: Cp.s1),
              IconButton(
                tooltip: tr('Retirer l’image'),
                icon: const Icon(Icons.delete_outline),
                onPressed: _saving ? null : () => setState(() { _couverturePath = ''; _couvertureBytes = null; }),
              ),
            ],
          ]),
          const SizedBox(height: Cp.s1),
          Row(children: [
            Expanded(
              child: OutlinedButton.icon(
                onPressed: _livrePicking || _saving
                    ? null
                    : () async {
                        setState(() {
                          _livrePicking = true;
                          _livrePickError = '';
                        });
                        final choisi = await _choisirFichierLivre();
                        if (!mounted) return;
                        setState(() {
                          _livrePicking = false;
                          if (choisi.error != null) {
                            _livrePickError = choisi.error!;
                          } else {
                            _livrePath = choisi.path;
                            _livreBytes = choisi.bytes;
                            _livreName = choisi.name ?? '';
                          }
                        });
                      },
                icon: const Icon(Icons.upload_file_outlined),
                label: Text(_livrePicking ? 'Chargement du fichier…' : (_livreName.isEmpty ? tr('Remplacer le fichier (PDF, EPUB)') : _livreName)),
              ),
            ),
            if (_livreName.isNotEmpty) ...[
              const SizedBox(width: Cp.s1),
              IconButton(
                tooltip: tr('Retirer le fichier'),
                icon: const Icon(Icons.delete_outline),
                onPressed: _saving
                    ? null
                    : () => setState(() {
                          _livrePath = null;
                          _livreBytes = null;
                          _livreName = '';
                        }),
              ),
            ],
          ]),
          const SizedBox(height: Cp.s1),
          Text(tr('Fichier PDF ou EPUB, 50 Mo max côté serveur. Sans nouveau fichier, le fichier actuel reste en place.'), style: t.bodyMedium),
          if (_livrePicking) ...[
            const SizedBox(height: Cp.s1),
            Row(children: [
              const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2)),
              const SizedBox(width: Cp.s1),
              const Expanded(child: Text('Chargement du fichier, ne fermez pas la carte…')),
            ]),
          ],
          if (_livreName.isNotEmpty && _livreBytes != null) ...[
            const SizedBox(height: Cp.s1),
            Text('Fichier retenu : $_livreName (${(_livreBytes!.length / 1048576).toStringAsFixed(1)} Mo).', style: const TextStyle(color: Cp.goldDeep, fontWeight: FontWeight.w700)),
          ],
          if (_livrePickError.isNotEmpty) ...[
            const SizedBox(height: Cp.s1),
            Text(_livrePickError, style: const TextStyle(color: Cp.danger)),
          ],
          const SizedBox(height: Cp.s2),
          Row(children: [
            Expanded(
              child: FilledButton(
                onPressed: _saving
                    ? null
                    : () async {
                        if (_titre.text.trim().isEmpty || _auteur.text.trim().isEmpty) {
                          toast(context, 'Renseignez : ${_titre.text.trim().isEmpty ? tr('Titre') : tr('Auteur')}.');
                          return;
                        }
                        final p = _price(context, _prix.text);
                        if (p == null) return;
                        setState(() => _saving = true);
                        final b = widget.book;
                        if (_couverturePath != widget.book.imagePath) {
                          b.imagePath = _couverturePath;
                          b.imageUrl = '';
                        }
                        b
                          ..title = _titre.text.trim()
                          ..author = _auteur.text.trim()
                          ..description = _desc.text.trim()
                          ..price = p
                          ..format = _format.text.trim()
                          ..fileUrl = _lien.text.trim();
                        app.changed();
                        await _updateBookServer(context, b, livrePath: _livrePath, livreBytes: _livreBytes, livreName: _livreName.isEmpty ? null : _livreName);
                        if (!mounted) return;
                        widget.onClose();
                      },
                child: Text(_saving ? 'Enregistrement…' : tr('Enregistrer')),
              ),
            ),
            const SizedBox(width: Cp.s1),
            Expanded(
              child: OutlinedButton(
                onPressed: _saving ? null : widget.onClose,
                child: Text(tr('Annuler')),
              ),
            ),
          ]),
        ],
      ),
    );
  }
}

class CartPage extends StatelessWidget {
  const CartPage({super.key});

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      final total = app.cart.fold<int>(0, (s, b) => s + b.price);
      return basic(tr('Panier'), [
        if (app.cart.isEmpty)
          EmptyNote(icon: Icons.shopping_cart_outlined, text: tr('Votre panier est vide.'))
        else ...[
          Card(
            child: Column(children: [
              for (final b in app.cart)
                ListTile(
                  title: Text(b.title, style: t.labelLarge),
                  subtitle: Text('${b.author} · ${fcfa(b.price)}', style: t.bodyMedium),
                  trailing: IconButton(
                    tooltip: tr('Retirer'),
                    icon: const Icon(Icons.close_outlined),
                    onPressed: () {
                      app.cart.remove(b);
                      app.changed();
                    },
                  ),
                ),
            ]),
          ),
          const SizedBox(height: Cp.s2),
          Container(
            padding: const EdgeInsets.all(Cp.s2),
            decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(Cp.radiusCard)),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(tr('Montant exact à valider dans le moyen choisi'), style: TextStyle(color: Cp.gold, fontSize: 14, fontWeight: FontWeight.w700)),
              const SizedBox(height: Cp.s1),
              Text(fcfa(total), style: const TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.w700)),
            ]),
          ),
          const SizedBox(height: Cp.s2),
          SizedBox(
            height: 56,
            child: FilledButton.icon(
              icon: const Icon(Icons.open_in_new_outlined),
              label: Text(tr('Choisir le moyen de paiement'), style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
              onPressed: () async {
                if (!requireMember(c)) return;
                final items = [for (final b in app.cart) PurchaseItem(b.id, b.title, b.author, b.price, serverId: b.serverId)];
                final r = await startPayment(c, 'achat', total, items: items);
                if (r == null || !c.mounted) return;
                app.cart.clear();
                app.changed();
                Navigator.of(c).pushReplacement(MaterialPageRoute(builder: (_) => const MyPurchasesPage()));
              },
            ),
          ),
        ],
      ]);
    });
  }
}

class MyPurchasesPage extends StatelessWidget {
  const MyPurchasesPage({super.key});

  Future<void> _confirmRemove(BuildContext c, String key) async {
    final ok = await showDialog<bool>(
      context: c,
      builder: (d) => AlertDialog(
        title: Text(tr('Retirer de mes achats ?')),
        content: Text(
            'Cet achat sera masqué de cette liste. Le paiement et la facture ne sont pas supprimés, et vous pouvez le restaurer ci-dessous.'),
        actions: [
          TextButton(onPressed: () => Navigator.of(d).pop(false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.of(d).pop(true), child: Text(tr('Retirer'))),
        ],
      ),
    );
    if (ok == true) app.removePurchase(key);
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      final m = app.member;
      // Historique complet, comme sur le prototype, 28 oct. 2026 :
      // avant, Mes achats ne montrait que les livres, sans les
      // cartes, cotisations et dons, et les achats retirés
      // disparaissaient de la liste sans pouvoir être restaurés
      // un par un. Désormais, toutes les demandes du membre sont
      // ici, en attente, terminées, refusées et retirées, avec
      // une restauration par achat, comme sur le prototype.
      final mine = m == null ? <PayRequest>[] : app.requests.where((r) => r.matricule == m.matricule).toList();
      String kindLabel(PayRequest r) => r.kind == 'don'
          ? tr('Don')
          : r.kind == 'carte'
              ? tr('Carte de membre')
              : r.kind == 'cotisation'
                  ? tr('Cotisation mensuelle')
                  : r.kind == 'camp'
                      ? campRequestLabel(r)
                      : r.kind == 'plateforme'
                          ? tr('Abonnement Plateforme, 100 000 FCFA par an')
                          : tr('Achat');
      Widget purchaseCard(PayRequest r, PurchaseItem? item, String key, bool removed) {
        final isBook = r.kind == 'achat';
        final found = isBook && item != null ? app.findBookForItem(item) : null;
        final book = found == null ? <Book>[] : [found];
        final title = isBook ? (item?.title ?? tr('Achat')) : kindLabel(r);
        final author = isBook ? (item?.author ?? '') : '';
        final price = isBook ? (item?.price ?? r.amount) : r.amount;
        final format = book.isEmpty ? '' : book.first.format;
        return Card(
          child: Padding(
            padding: const EdgeInsets.all(Cp.s2),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                Expanded(child: Text(title, style: t.titleMedium)),
                StatusChip(confirmed: r.confirmed, refused: r.refused),
              ]),
              if (author.isNotEmpty) ...[const SizedBox(height: 4), Text(author, style: t.bodyMedium)],
              const SizedBox(height: 4),
              Text('${format.isEmpty ? '' : '$format · '}${fcfa(price)}', style: t.bodyMedium),
              const SizedBox(height: 4),
              Text('${dateFr(r.date)} · ${r.method} · ${r.ref} · ${r.confirmed ? tr('Payé') : r.refused ? tr('Refusé') : tr('En attente de confirmation')}', style: t.bodyMedium),
              // Restructuration comptabilité, 3 nov. 2026 : un
              // refusé ne reste pas dans la demande, le membre
              // est invité à refaire sa demande, sans nouveau
              // statut inventé et sans suppression de la trace.
              if (r.refused && !r.confirmed) ...[
                const SizedBox(height: 4),
                Text(tr('Demande refusée. Vous pouvez refaire une demande.'), style: t.bodyMedium),
              ],
              if (isBook && !r.confirmed) ...[
                const SizedBox(height: Cp.s1),
                Text(tr('Le fichier reste verrouillé avant la confirmation du paiement.'), style: t.bodyMedium),
              ],
              if (isBook && r.confirmed) ...[
                const SizedBox(height: Cp.s1),
                SizedBox(
                  width: double.infinity,
                  height: 52,
                  child: FilledButton.icon(
                    onPressed: () async {
                      if (book.isEmpty) {
                        toast(c, tr('Ce livre n’est plus au catalogue.'));
                        return;
                      }
                      await openPurchasedBook(c, book.first, title);
                    },
                    icon: const Icon(Icons.download_outlined),
                    label: Text(tr('Télécharger')),
                  ),
                ),
              ],
              Row(children: [
                TextButton.icon(
                  onPressed: () => go(c, VerifyPaymentPage(request: r)),
                  icon: const Icon(Icons.verified_outlined, size: 18),
                  label: Text(tr('Vérifier le reçu')),
                ),
                if (r.confirmed)
                  TextButton.icon(
                    onPressed: () => goMembre(c, () => membre.InvoicePage(request: r)),
                    icon: const Icon(Icons.receipt_long_outlined, size: 18),
                    label: Text(tr('Facture')),
                  ),
                const Spacer(),
                if (removed)
                  FilledButton(
                    onPressed: () => app.restorePurchase(key),
                    child: Text(tr('Restaurer cet achat')),
                  )
                else
                  TextButton(
                    onPressed: () => _confirmRemove(c, key),
                    child: Text(tr('Retirer de mes achats')),
                  ),
              ]),
            ]),
          ),
        );
      }
      final pendingCards = <Widget>[];
      final doneCards = <Widget>[];
      final refusedCards = <Widget>[];
      final removedCards = <Widget>[];
      for (final r in mine) {
        final items = r.kind == 'achat' ? (r.items.isEmpty ? [PurchaseItem(-1, tr('Achat'), '', r.amount)] : r.items) : <PurchaseItem>[PurchaseItem(-1, kindLabel(r), '', r.amount)];
        for (final i in items) {
          final key = r.kind == 'achat' ? '${r.ref}:${i.bookId}' : '${r.ref}:${r.kind}';
          final removed = app.removedPurchaseKeys.contains(key);
          final card = purchaseCard(r, r.kind == 'achat' ? i : null, key, removed);
          if (removed) {
            removedCards.add(card);
            removedCards.add(const SizedBox(height: Cp.s1));
          } else if (r.confirmed) {
            doneCards.add(card);
            doneCards.add(const SizedBox(height: Cp.s1));
          } else if (r.refused) {
            // Historique des refus, 72 heures, 3 nov. 2026 : un refus
            // disparaît de la liste visible après 72 heures, sans
            // supprimer la possibilité de refaire une demande.
            // Sans date de refus, la carte reste visible, car son
            // âge ne peut pas être prouvé, jamais inventé.
            final visible = r.refusedAt == null || DateTime.now().difference(r.refusedAt!).inHours < 72;
            if (visible) {
              refusedCards.add(card);
              refusedCards.add(const SizedBox(height: Cp.s1));
            }
          } else {
            pendingCards.add(card);
            pendingCards.add(const SizedBox(height: Cp.s1));
          }
        }
      }
      return basic(tr('Mes achats'), [
        if (pendingCards.isNotEmpty) ...[
          heading(c, tr('Achats en attente')),
          ...pendingCards,
          const SizedBox(height: Cp.s2),
        ],
        if (doneCards.isNotEmpty) ...[
          heading(c, tr('Achats terminés')),
          ...doneCards,
          const SizedBox(height: Cp.s2),
        ],
        if (refusedCards.isNotEmpty) ...[
          heading(c, tr('Achats refusés')),
          Text(tr('Les refus ne restent visibles que 72 heures.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
          const SizedBox(height: Cp.s1),
          ...refusedCards,
          const SizedBox(height: Cp.s2),
        ],
        if (removedCards.isNotEmpty) ...[
          heading(c, tr('Achats retirés')),
          Text(tr('Un achat retiré n’est pas perdu. Le restaurer rouvre la lecture et le téléchargement de l’ouvrage déjà payé, avec sa facture d’origine, sans nouveau paiement.'), style: t.bodyMedium),
          const SizedBox(height: Cp.s1),
          ...removedCards,
        ],
        if (pendingCards.isEmpty && doneCards.isEmpty && refusedCards.isEmpty && removedCards.isEmpty)
          EmptyNote(icon: Icons.shopping_bag_outlined, text: tr('Aucun achat pour le moment.')),
      ]);
    });
  }
}

/// Ouverture d'un livre déjà payé, 28 oct. 2026 : avant, le fichier
/// serveur n'était jamais récupéré, fileUrl restait vide pour les
/// livres du serveur, et le livre ne s'ouvrait jamais après
/// paiement confirmé. Désormais, un livre serveur s'ouvre par la
/// route authentifiée /livres/:id/fichier, téléchargé puis partagé
/// vers le lecteur de l'appareil, comme les autres téléchargements
/// de l'application. Un livre local garde son lien direct.
Future<bool> openPurchasedBook(BuildContext c, Book book, String title) async {
  if (!app.hasPurchasedBook(book)) {
    toast(c, tr('Ce livre est verrouillé. Il s’ouvre après la confirmation du paiement.'));
    return false;
  }
  if (book.serverId.isNotEmpty && api.isConnected) {
    try {
      toast(c, tr('Ouverture en cours…'));
      final bytes = await api.fetchLivreFile(book.serverId);
      if (bytes.isEmpty) {
        toast(c, tr('La structure n’a pas encore fourni le fichier de ce livre.'));
        return false;
      }
      final ext = book.format.toLowerCase().contains('epub') ? 'epub' : 'pdf';
      final safeTitle = title.replaceAll(RegExp(r'[^A-Za-z0-9 _-]'), '').trim().replaceAll(' ', '_');
      final file = await saveToDownloads(bytes, '${safeTitle.isEmpty ? 'livre' : safeTitle}.$ext');
      await Share.shareXFiles([XFile(file.path)], text: title);
      return true;
    } catch (_) {
      toast(c, tr('Ouverture impossible pour le moment. Vérifiez votre connexion, puis réessayez.'));
      return false;
    }
  }
  final file = book.fileUrl;
  if (file.isEmpty) {
    toast(c, tr('La structure n’a pas encore fourni le fichier de ce livre.'));
    return false;
  }
  if (file.startsWith('http')) {
    final ok = await downloadBookFile(c, file, title);
    if (!ok && c.mounted) openUrl(c, file);
    return ok;
  }
  openUrl(c, file);
  return true;
}

// Vérification d'un paiement, 27 oct. 2026, d'après le modèle web :
// chaque paiement a une référence, un montant, un moyen, une date et
// un statut, et un reçu téléchargeable après confirmation seulement.
// Cette page est accessible même en attente, depuis Plus, Mes achats,
// la page Dons et chaque demande : elle affiche toujours le code de
// paiement, mais ne donne jamais un reçu téléchargeable avant
// confirmation, et ne marque jamais un paiement comme payé sur seul
// lien ou seule capture. La vérification en attente se fait par la
// structure, après contrôle de son compte Wave, avec
// la référence à lui communiquer.
class VerifyPaymentPage extends StatelessWidget {
  const VerifyPaymentPage({super.key, required this.request});
  final PayRequest request;

  String _kindLabel(PayRequest r) {
    if (r.kind == 'don') return tr('Don');
    if (r.kind == 'cotisation') return tr('Cotisation mensuelle');
    if (r.kind == 'carte') return tr('Création de carte de membre (paiement unique)');
    if (r.kind == 'camp') return campRequestLabel(r);
    if (r.kind == 'plateforme') return tr('Abonnement Plateforme (100 000 FCFA par an)');
    return tr('Achat');
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      final r = request;
      return basic(tr('Vérifier mon paiement'), [
        Card(
          child: Padding(
            padding: const EdgeInsets.all(Cp.s2),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                Expanded(child: Text(_kindLabel(r), style: t.titleMedium)),
                StatusChip(confirmed: r.confirmed, refused: r.refused),
              ]),
              const SizedBox(height: Cp.s1),
              Text(isEn ? 'Payment code: ${r.ref}' : 'Code de paiement : ${r.ref}',
                  style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700)),
              const SizedBox(height: 4),
              Text(isEn ? 'Reference: ${r.ref}' : 'Référence : ${r.ref}', style: t.bodyMedium),
              const SizedBox(height: 4),
              Text(isEn ? 'Amount: ${fcfa(r.amount)}' : 'Montant : ${fcfa(r.amount)}', style: t.labelLarge),
              const SizedBox(height: 4),
              Text(isEn ? 'Method: ${r.method}${r.currency.isEmpty ? '' : ' (${r.currency})'}' : 'Moyen : ${r.method}${r.currency.isEmpty ? '' : ' (${r.currency})'}', style: t.bodyMedium),
              const SizedBox(height: 4),
              Text(isEn ? 'Date: ${dateFr(r.date)}' : 'Date : ${dateFr(r.date)}', style: t.bodyMedium),
              if (r.confirmed && r.confirmedAt != null) ...[
                const SizedBox(height: 4),
                Text(isEn ? 'Confirmed on: ${dateFr(r.confirmedAt!)}' : 'Confirmé le : ${dateFr(r.confirmedAt!)}', style: t.bodyMedium),
              ],
              const SizedBox(height: 4),
              Text(isEn ? 'Member: ${r.memberName} (${r.matricule})' : 'Membre : ${r.memberName} (${r.matricule})', style: t.bodyMedium),
              const SizedBox(height: 4),
              Text(
                r.confirmed
                    ? tr('Paiement confirmé')
                    : tr('En attente de confirmation'),
                style: TextStyle(color: r.confirmed ? Cp.ok : Cp.goldDeep, fontWeight: FontWeight.w700),
              ),
              if (r.items.isNotEmpty) ...[
                const Divider(height: Cp.s3),
                for (final i in r.items)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 4),
                    child: Row(children: [
                      Expanded(child: Text('${i.title} — ${i.author}', style: t.labelLarge)),
                      Text(fcfa(i.price), style: t.labelLarge),
                    ]),
                  ),
              ],
            ]),
          ),
        ),
        const SizedBox(height: Cp.s2),
        if (r.confirmed) ...[
          SizedBox(
            width: double.infinity,
            height: 52,
            child: FilledButton.icon(
              onPressed: () => goMembre(c, () => membre.InvoicePage(request: r)),
              icon: const Icon(Icons.receipt_long_outlined),
              label: Text(tr('Voir et télécharger le reçu')),
            ),
          ),
          const SizedBox(height: Cp.s1),
          Text(tr('La facture PDF est générée côté serveur après confirmation vérifiée. Pour une demande locale, non créée côté serveur, le PDF serveur n’existe pas : la facture détaillée fait foi.'), style: t.bodyMedium),
        ] else ...[
          Card(
            child: Padding(
              padding: const EdgeInsets.all(Cp.s2),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(tr('En attente de vérification'), style: t.titleMedium),
                const SizedBox(height: Cp.s1),
                Text(
                  isEn
                      ? 'This payment is not confirmed yet. A link or a screenshot alone never marks it as paid. The organisation verifies it after checking its ${r.method} account, then validates it. Give the organisation this reference: ${r.ref}.'
                      : 'Ce paiement n’est pas encore confirmé. Un lien ou une capture seul ne suffit jamais à le marquer comme payé. La structure le vérifie après contrôle de son compte ${r.method}, puis le valide. Communiquez-lui cette référence : ${r.ref}.',
                  style: t.bodyMedium,
                ),
                const SizedBox(height: Cp.s1),
                Text(tr('Aucun reçu téléchargeable avant confirmation.'), style: t.bodyMedium),
              ]),
            ),
          ),
          const SizedBox(height: Cp.s2),
          SizedBox(
            width: double.infinity,
            height: 52,
            child: OutlinedButton.icon(
              onPressed: () {
                Clipboard.setData(ClipboardData(text: r.ref));
                toast(c, tr('Référence copiée.'));
              },
              icon: const Icon(Icons.copy_outlined),
              label: Text(tr('Copier la référence')),
            ),
          ),
          const SizedBox(height: Cp.s1),
          if (r.method == 'PayPal') ...[
            SizedBox(
              width: double.infinity,
              height: 52,
              child: FilledButton.icon(
                onPressed: () async {
                  // Retour PayPal API : après approbation dans PayPal
                  // et capture côté serveur, le serveur a confirmé.
                  // L'application interroge cet état, et si confirmé,
                  // marque sa demande locale comme confirmée, avec
                  // facture. Jamais confirmé sur le seul retour du
                  // navigateur : c'est l'état serveur qui fait foi.
                  try {
                    final etat = await api.paypalStatus(r.ref);
                    if (etat['statut'] == 'confirme') {
                      app.confirm(r);
                      if (c.mounted) toast(c, tr('Retour PayPal confirmé : paiement confirmé, facture disponible.'));
                    } else if (c.mounted) {
                      toast(c, tr('Retour PayPal non confirmé pour le moment : la demande reste en attente.'));
                    }
                  } catch (_) {
                    if (c.mounted) toast(c, tr('Retour PayPal indisponible : vérifiez votre connexion, ou attendez la validation par la structure.'));
                  }
                },
                icon: const Icon(Icons.verified_outlined),
                label: Text(tr('Vérifier le retour PayPal')),
              ),
            ),
            const SizedBox(height: Cp.s1),
          ],
          SizedBox(
            width: double.infinity,
            height: 52,
            child: OutlinedButton.icon(
              onPressed: () {
                // Orange Money réactivé, 4 nov. 2026 : une demande
                // Orange Money, ancienne ou nouvelle, peut de nouveau
                // être rouverte par son lien, montant affiché avant.
                _openPayment(r.method, r.amount, currency: r.currency);
              },
              icon: const Icon(Icons.account_balance_wallet_outlined),
              label: Text(isEn ? 'Reopen ${r.method}' : 'Rouvrir ${r.method}'),
            ),
          ),
        ],
      ]);
    });
  }
}

// Jauge d'objectif de don, 31 oct. 2026, lot 1 chantier 6 sur 6.
// Lecture publique, agrégat seulement : montant collecté, cible,
// pourcentage, montant restant. Au-delà de 100 %, la barre reste
// pleine mais le pourcentage réel s'affiche, avec la mention
// « Objectif dépassé ». Sans objectif actif, rien ne s'affiche.
class ObjectifDonGauge extends StatelessWidget {
  const ObjectifDonGauge({super.key});

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return FutureBuilder<Map<String, dynamic>?>(
      future: api.getObjectifDon(),
      builder: (context, snap) {
        final data = snap.data;
        if (data == null || data['actif'] != true) return const SizedBox.shrink();
        final cible = (data['cible_fcfa'] as num?)?.toInt() ?? 0;
        if (cible <= 0) return const SizedBox.shrink();
        final collecte = (data['collecte_fcfa'] as num?)?.toInt() ?? 0;
        final restant = (data['restant_fcfa'] as num?)?.toInt() ?? 0;
        final pourcentage = (data['pourcentage'] as num?)?.toInt() ?? 0;
        final depasse = data['depasse'] == true;
        final fraction = (collecte / cible).clamp(0.0, 1.0);
        return Container(
          padding: const EdgeInsets.all(Cp.s2),
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(tr('Objectif de don'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
            const SizedBox(height: 4),
            Text((data['libelle'] ?? '').toString(), style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700)),
            const SizedBox(height: Cp.s1),
            Row(children: [
              Expanded(child: Text('${tr('Collecté')} : ${fcfa(collecte)}', style: t.bodyMedium)),
              Text('$pourcentage %', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.goldDeep)),
            ]),
            const SizedBox(height: 8),
            ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: Container(
                height: 14,
                color: Cp.verseLine,
                child: FractionallySizedBox(
                  alignment: Alignment.centerLeft,
                  widthFactor: fraction,
                  child: Container(color: Cp.gold),
                ),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              depasse ? tr('Objectif dépassé') : '${tr('Restant')} : ${fcfa(restant)}',
              style: t.bodyMedium?.copyWith(fontWeight: depasse ? FontWeight.w800 : null, color: depasse ? Cp.goldDeep : null),
            ),
            const SizedBox(height: 4),
            Text('${tr('Cible')} : ${fcfa(cible)}', style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
          ]),
        );
      },
    );
  }
}

class DonsPage extends StatefulWidget {
  const DonsPage({super.key});

  @override
  State<DonsPage> createState() => _DonsPageState();
}

class _DonsPageState extends State<DonsPage> {
  final _controller = TextEditingController();
  final _waveCtrl = TextEditingController();
  final _recipientCtrl = TextEditingController();
  int? _amount;
  PayRequest? _pending;

  @override
  void initState() {
    super.initState();
    _waveCtrl.text = app.confirmedWaveNumber;
    _recipientCtrl.text = app.waveRecipient;
  }

  @override
  void dispose() {
    _controller.dispose();
    _waveCtrl.dispose();
    _recipientCtrl.dispose();
    super.dispose();
  }

  // Étape 1 du prototype, page Don : le numéro Wave du compte qui
  // paiera est saisi, relu et confirmé, sans déclencher de paiement
  // et sans marquer quoi que ce soit comme payé.
  Future<void> _confirmWaveNumber() async {
    final digits = _waveCtrl.text.replaceAll(RegExp(r'[^0-9]'), '');
    if (digits.length < 8 || digits.length > 15) {
      toast(context, tr('Numéro Wave invalide : vérifiez le format, puis recommencez.'));
      return;
    }
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Confirmer ce numéro ?')),
        content: Text(isEn ? 'Wave number to use: $digits. Confirm this number, then continue. This check triggers no payment.' : 'Numéro Wave à utiliser : $digits. Confirmez ce numéro, puis continuez. Ce contrôle ne déclenche aucun paiement.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Confirmer'))),
        ],
      ),
    );
    if (ok == true) {
      app.setConfirmedWaveNumber(digits);
      setState(() {});
      toast(context, tr('Numéro Wave confirmé. Il ne déclenche aucun paiement.'));
    }
  }

  void _onChanged(String raw) {
    final digits = raw.replaceAll(RegExp(r'[^0-9]'), '');
    final v = int.tryParse(digits);
    setState(() => _amount = (v == null || v <= 0) ? null : v);
  }

  Future<void> _pay() async {
    final amount = _amount;
    if (amount == null || !requireMember(context)) return;
    final r = await startPayment(context, 'don', amount);
    if (r != null && mounted) setState(() => _pending = r);
  }

  // Cotisation mensuelle web, 1 000 FCFA : type distinct dans
  // l'application, pour que son reçu soit retrouvable, mais même
  // route serveur qu'un don, car le serveur n'a pas de type
  // cotisation distinct. Montant verrouillé 1 000 FCFA, moyen
  // choisi (Wave ou PayPal, espèces auprès de la structure),
  // en attente tant que le moyen
  // n'a pas confirmé ou que la structure n'a pas validé.
  Future<void> _payCotisation() async {
    if (!requireMember(context)) return;
    final r = await startPayment(context, 'cotisation', 1000);
    if (r != null && mounted) setState(() => _pending = r);
  }

  void _reset() {
    _controller.clear();
    setState(() {
      _amount = null;
      _pending = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      final m = app.member;
      final history = app.requests.where((r) => (r.kind == 'don' || r.kind == 'cotisation') && m != null && r.matricule == m.matricule).toList();

      if (_pending != null) {
        final r = _pending!;
        return basic(tr('Dons'), [
          Text(tr('Demande envoyée'), style: t.titleLarge),
          const SizedBox(height: Cp.s2),
          Container(
            padding: const EdgeInsets.all(Cp.s2),
            decoration: BoxDecoration(color: Cp.verseTint, borderRadius: BorderRadius.circular(Cp.radiusCard), border: Border.all(color: Cp.verseLine)),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                Icon(r.confirmed ? Icons.check_circle_outlined : Icons.hourglass_top_outlined, color: r.confirmed ? Cp.ok : Cp.goldDeep),
                const SizedBox(width: Cp.s1),
                Expanded(child: Text(r.confirmed ? tr('Paiement confirmé') : 'En attente de confirmation ${r.method}', style: t.titleMedium)),
              ]),
              const SizedBox(height: Cp.s2),
              Text(isEn ? 'Amount: ${fcfa(r.amount)}' : 'Montant : ${fcfa(r.amount)}', style: t.labelLarge),
              const SizedBox(height: 4),
              Text(isEn ? 'Method: ${r.method}${r.currency.isEmpty ? '' : ' (${r.currency})'}' : 'Moyen : ${r.method}${r.currency.isEmpty ? '' : ' (${r.currency})'}', style: t.bodyMedium),
              const SizedBox(height: 4),
              Text(isEn ? 'Reference: ${r.ref}' : 'Référence : ${r.ref}', style: t.bodyMedium),
              const SizedBox(height: 4),
              Text(isEn ? 'Date: ${dateFr(r.date)}' : 'Date : ${dateFr(r.date)}', style: t.bodyMedium),
              const SizedBox(height: Cp.s2),
              // Vérification visible même en attente : la page
              // affiche le code, le montant, le moyen, la date et
              // le statut, et le reçu seulement si confirmé.
              SizedBox(
                width: double.infinity,
                height: 52,
                child: OutlinedButton.icon(
                  onPressed: () => go(c, VerifyPaymentPage(request: r)),
                  icon: const Icon(Icons.verified_outlined),
                  label: Text(tr('Vérifier le reçu')),
                ),
              ),
              // Reçu, vérification d'achat : le bouton n'apparaît
              // que si la demande est confirmée, jamais avant.
              if (r.confirmed) ...[
                const SizedBox(height: Cp.s2),
                SizedBox(
                  width: double.infinity,
                  height: 52,
                  child: OutlinedButton.icon(
                    onPressed: () => goMembre(c, () => membre.InvoicePage(request: r)),
                    icon: const Icon(Icons.receipt_long_outlined),
                    label: Text(tr('Voir et télécharger le reçu')),
                  ),
                ),
              ],
            ]),
          ),
          const SizedBox(height: Cp.s2),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(Cp.s2),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(tr('Et ensuite ?'), style: t.titleMedium),
                const SizedBox(height: Cp.s1),
                Text(
                  // Correctif 27 oct. 2026 : le serveur ne génère que
                  // du PDF, pas de JPG. On ne promet plus de JPG ici.
                  'Validez le montant exact dans ${r.method}. La facture PDF arrive après la confirmation du paiement, '
                  'ou après la validation de la structure. Votre don n’est jamais affiché comme payé avant cette confirmation.',
                  style: t.bodyMedium,
                ),
              ]),
            ),
          ),
          const SizedBox(height: Cp.s3),
          SizedBox(
            height: 56,
            child: OutlinedButton(
              onPressed: _reset,
              style: OutlinedButton.styleFrom(
                foregroundColor: Cp.navy,
                side: const BorderSide(color: Cp.navy, width: 1.5),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
              ),
              child: Text(tr('Faire un autre don'), style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
            ),
          ),
        ]);
      }

      return basic(isEn ? 'Donation' : 'Don', [
        Text(isEn ? 'Contributions, tithes & offerings' : 'Cotisations, dîmes & offrandes', style: t.titleLarge?.copyWith(fontSize: 32, fontWeight: FontWeight.w800, color: Cp.navy)),
        const SizedBox(height: 4),
        Text(isEn ? 'How to pay: 1) enter and confirm your Wave number; 2) create a request “awaiting confirmation”; 3) continue to the Wave link to pay; 4) wait for the payment method to confirm. The PDF/JPG invoice is generated only when Wave confirms the payment.' : 'Comment payer : 1) saisissez et confirmez votre numéro Wave ; 2) créez une demande « en attente » ; 3) continuez vers le lien Wave pour payer ; 4) attendez la confirmation du moyen de paiement. La facture PDF/JPG est générée uniquement lorsque Wave confirme le paiement.', style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 16)),
        const SizedBox(height: Cp.s2),
        // Totaux du prototype, calculés sur les demandes réelles
        // de dons et de cotisations du membre, jamais inventés.
        Builder(builder: (ctx) {
          final totalConfirmedWave = history.where((r) => r.confirmed && r.method == 'Wave').fold<int>(0, (sum, r) => sum + r.amount);
          final totalPending = history.where((r) => !r.confirmed).fold<int>(0, (sum, r) => sum + r.amount);
          return Row(children: [
            Expanded(
              child: Container(
                padding: const EdgeInsets.all(Cp.s2),
                decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(20)),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(isEn ? 'TOTAL CONFIRMED BY WAVE' : 'TOTAL CONFIRMÉ PAR WAVE', style: const TextStyle(color: Colors.white70, fontSize: 12, fontWeight: FontWeight.w700, letterSpacing: 1)),
                  const SizedBox(height: 4),
                  Text(fcfa(totalConfirmedWave), style: const TextStyle(color: Color(0xFF34D399), fontSize: 28, fontWeight: FontWeight.w800)),
                ]),
              ),
            ),
            const SizedBox(width: Cp.s1),
            Expanded(
              child: Container(
                padding: const EdgeInsets.all(Cp.s2),
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: Cp.verseLine)),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(isEn ? 'TOTAL PENDING' : 'TOTAL EN ATTENTE', style: const TextStyle(color: Cp.inkMuted, fontSize: 12, fontWeight: FontWeight.w700, letterSpacing: 1)),
                  const SizedBox(height: 4),
                  Text(fcfa(totalPending), style: const TextStyle(color: Cp.goldDeep, fontSize: 28, fontWeight: FontWeight.w800)),
                ]),
              ),
            ),
          ]);
        }),
        const SizedBox(height: Cp.s2),
        const ObjectifDonGauge(),
        const SizedBox(height: Cp.s2),
        // Confirmation automatique Wave, modèle web : pas encore
        // connectée au compte marchand, réconciliation manuelle.
        // Réservé à l'administrateur général : seuls les administrateurs
        // doivent savoir que le code API est manquant.
        if (app.isAdminGeneral)
        Container(
          padding: const EdgeInsets.all(Cp.s2),
          decoration: BoxDecoration(color: const Color(0xFFFEF3C7), borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.verseLine)),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(color: const Color(0xFFFFF7D6), borderRadius: BorderRadius.circular(14)),
                child: const Icon(Icons.shield_outlined, color: Color(0xFFB45309)),
              ),
              const SizedBox(width: Cp.s1),
              Expanded(
                child: Text(isEn ? 'Automatic Wave confirmation: not yet connected to the merchant account' : 'Confirmation automatique Wave : pas encore connectée au compte marchand', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
              ),
            ]),
            const SizedBox(height: Cp.s1),
            Text(isEn ? 'This version uses the structure’s public Wave link. That link does not create a Wave Checkout session tracked by the app and does not transmit the request reference: after a payment on that link, no notification reaches the server, so the app cannot know automatically. The manual reconciliation bridge is the honest bridge available today: the member declares the payment with the Wave transaction ID and may attach the payment screenshot to the request, then the structure compares it with its Wave account and validates, and the invoice is then generated, with the source “manual check” clearly recorded. A screenshot alone never marks a payment as made.' : 'Cette version utilise le lien public Wave de la structure. Ce lien ne crée pas de session Wave Checkout suivie par l’application et ne transmet pas la référence de la demande : après un paiement sur ce lien, aucune notification n’arrive au serveur, donc l’application ne peut pas le savoir automatiquement, c’est le piège du « retour navigateur », qui peut être manipulé ou ne jamais arriver, et qui ne sera jamais traité comme une preuve ici. En attendant le raccordement marchand choisi par la structure. Wave Business en direct, sans agrégateur, le pont honnête disponible dès aujourd’hui est la réconciliation manuelle : le membre déclare son paiement avec l’identifiant de transaction Wave et peut joindre la capture de son paiement (PDF, PNG ou JPEG) à sa demande, puis la structure la compare à son compte Wave et valide, la facture est alors générée, avec la source « contrôle manuel » clairement enregistrée. La capture seule ne marque jamais un paiement comme effectué.', style: t.bodyMedium),
            const SizedBox(height: Cp.s1),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(20)),
              child: Row(children: [
                const Icon(Icons.shield_outlined, color: Cp.gold, size: 18),
                const SizedBox(width: 8),
                Expanded(child: Text(isEn ? 'Chosen reconciliation: Wave Business direct, no aggregator' : 'Raccordement choisi : Wave Business en direct, sans agrégateur', style: const TextStyle(color: Cp.gold, fontSize: 14, fontWeight: FontWeight.w700))),
              ]),
            ),
            const SizedBox(height: Cp.s1),
            ExpansionTile(
              title: Text(isEn ? 'What remains to provide on the Wave Business side' : 'Ce qu’il reste à fournir côté Wave Business', style: t.titleMedium),
              children: [
                Padding(
                  padding: const EdgeInsets.only(bottom: Cp.s1),
                  child: Text(isEn ? 'The structure’s Wave Business account, API key and webhook secret, and the webhook address after the site is deployed. The secret goes through the secure route only, never in plain chat, and is stored server side only.' : 'Compte Wave Business de la structure, clé API et secret webhook, et adresse webhook après déploiement du site. Le secret passe uniquement par la voie sécurisée, jamais en clair en chat, et est stocké côté serveur uniquement.', style: t.bodyMedium),
                ),
              ],
            ),
          ]),
        ),
        if (app.isAdminGeneral) const SizedBox(height: Cp.s2),
        // Wave Business, montant figé, modèle web. La clé API ne
        // s’entre jamais dans l’application : elle se saisit dans
        // Render, côté serveur, jamais en clair en chat.
        // Réservé à l'administrateur général, comme le cadre précédent :
        // ce bloc dit qu'aucune clé n'est enregistrée.
        if (app.isAdminGeneral)
        Container(
          padding: const EdgeInsets.all(Cp.s2),
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const Icon(Icons.lock_outlined, color: Cp.goldDeep, size: 20),
              const SizedBox(width: Cp.s1),
              Expanded(child: Text(isEn ? 'Wave Business, fixed amount' : 'Wave Business, montant figé', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
            ]),
            const SizedBox(height: Cp.s1),
            Text(isEn ? 'Like at an online checkout, the amount to pay must be the request amount, fixed by the server, without the member being able to change it. Once registered, each payment starts from a server-created Wave session with the exact request amount, XOF currency and its unique reference: in Wave, the member validates that amount, they do not type it. On return, the server rechecks amount, reference, currency and status before any move to “paid”, then the invoice is generated. The key stays server side and is never shown again.' : 'Comme à une caisse en ligne, le montant à payer doit être celui de la demande, figé par le serveur, sans que le membre puisse le modifier. Pour cela, la structure enregistre ici sa propre clé API Wave Business (créée dans son portail Wave Business, pour le bon portefeuille). Dès qu’elle est enregistrée, chaque paiement part d’une session Wave créée côté serveur avec le montant exact de la demande, la devise XOF et sa référence unique : dans Wave, le membre valide ce montant, il ne le saisit pas. Au retour, le serveur revérifie le montant, la référence, la devise et le statut avant tout passage à « payée », puis la facture est générée. La clé reste côté serveur et n’est jamais réaffichée.', style: t.bodyMedium),
            const SizedBox(height: Cp.s1),
            Container(
              padding: const EdgeInsets.all(Cp.s1),
              decoration: BoxDecoration(color: const Color(0xFFFEF3C7), borderRadius: BorderRadius.circular(14)),
              child: Text(isEn ? 'Wave Business not connected: no key registered. The amount is not fixed in Wave; the current path (Wave link, receipt scan, structure validation) remains the safety net, and the app tells the member so.' : 'Wave Business non raccordé : aucune clé enregistrée. Le montant n’est pas figé dans Wave ; le parcours actuel (lien Wave, scan du reçu, validation de la structure) reste le filet de sécurité, et l’application le dit au membre.', style: t.bodyMedium?.copyWith(color: Cp.goldDeep, fontWeight: FontWeight.w700)),
            ),
            const SizedBox(height: Cp.s1),
            Text(isEn ? 'The Wave Business API key is entered in Render, server side, never in the app and never in plain chat.' : 'La clé API Wave Business se saisit dans Render, côté serveur, jamais dans l’application et jamais en clair en chat.', style: t.bodyMedium),
          ]),
        ),
        if (app.isAdminGeneral) const SizedBox(height: Cp.s2),
        // Scan des reçus Wave, modèle web : le destinataire attendu
        // est enregistré localement, pour le scan quand il sera livré.
        // Le scan lui-même n’est pas livré dans cette version.
        // Réservé à l'administrateur général : configuration du
        // destinataire Wave attendu, affichage et modification.
        if (app.isAdminGeneral)
        Container(
          padding: const EdgeInsets.all(Cp.s2),
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const Icon(Icons.search_outlined, color: Cp.goldDeep, size: 20),
              const SizedBox(width: Cp.s1),
              Expanded(child: Text(isEn ? 'Wave receipt scan, structure recipient' : 'Scan des reçus Wave, destinataire de la structure', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
            ]),
            const SizedBox(height: Cp.s1),
            Text(isEn ? 'For each attached screenshot, the app scans the Wave receipt. It reads the recipient when printed, the net amount, the ID, the date, the status and the customer number. It reads the ID itself. The member has nothing to copy. It compares everything with the request. Warning: on the Wave Business receipt model, the merchant account is not printed. The scan cannot verify the recipient from that document. It says so. Checking in the structure’s Wave Business account remains required. The field below is for receipts that print a recipient. The structure writes the name or number shown as recipient on its Wave account. As long as this field is empty, the scan reports an unverifiable recipient, structure check required. It never validates the recipient alone.' : 'À chaque capture jointe, l’application scanne le reçu Wave. Elle lit le destinataire quand il est imprimé, le montant net, l’identifiant, la date, le statut et le numéro du client. Elle lit l’identifiant elle-même. Le membre n’a rien à copier. Elle compare le tout à la demande. Attention. Sur le modèle de reçu Wave Business, le compte marchand n’est pas imprimé. Le scan ne peut pas vérifier le destinataire à partir de ce document. Il le dit. Le contrôle dans le compte Wave Business de la structure reste requis. Le champ ci-dessous sert aux reçus qui impriment un destinataire. La structure y écrit le nom ou le numéro affiché comme destinataire sur son compte Wave. Tant que ce champ est vide, le scan signale destinataire non vérifiable, contrôle de la structure requis. Il ne valide jamais seul le destinataire.', style: t.bodyMedium),
            const SizedBox(height: Cp.s1),
            Text(isEn ? 'Expected Wave recipient (structure account)' : 'Destinataire Wave attendu (compte de la structure)', style: t.labelLarge),
            const SizedBox(height: 4),
            TextField(
              controller: _recipientCtrl,
              decoration: InputDecoration(
                hintText: isEn ? 'Ex. name or number of the structure’s Wave account' : 'Ex. nom ou numéro du compte Wave de la structure',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
              ),
            ),
            const SizedBox(height: Cp.s1),
            if (app.waveRecipient.isEmpty)
              Container(
                padding: const EdgeInsets.all(Cp.s1),
                decoration: BoxDecoration(color: const Color(0xFFFEF3C7), borderRadius: BorderRadius.circular(14)),
                child: Text(isEn ? 'Not filled in yet: receipt recipients cannot be verified automatically.' : 'Non renseigné pour le moment : le destinataire des reçus n’est pas vérifiable automatiquement.', style: t.bodyMedium),
              ),
            const SizedBox(height: Cp.s1),
            SizedBox(
              width: double.infinity,
              height: 52,
              child: FilledButton.icon(
                onPressed: () {
                  app.setWaveRecipient(_recipientCtrl.text.trim());
                  toast(c, tr('Destinataire Wave enregistré.'));
                },
                style: FilledButton.styleFrom(backgroundColor: Cp.goldDeep, foregroundColor: Colors.white),
                icon: const Icon(Icons.check_outlined),
                label: Text(tr('Enregistrer le destinataire attendu')),
              ),
            ),
          ]),
        ),
        if (app.isAdminGeneral) const SizedBox(height: Cp.s2),
        // Rappel cotisation mensuelle, comme sur le web : pastille
        // 1 000 FCFA / mois, texte exact, bouton orange. Absent de
        // l'application avant ce correctif, alors que le web
        // l'affiche sur l'accueil et que la carte mentionne déjà
        // « Cotisation : 1 000 FCFA par mois ».
        if (m != null) ...[
          Container(
            padding: const EdgeInsets.all(Cp.s2),
            decoration: BoxDecoration(
                color: Cp.card, borderRadius: BorderRadius.circular(Cp.radiusCard), border: Border.all(color: Cp.verseLine)),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(color: Cp.verseTint, borderRadius: BorderRadius.circular(14)),
                  child: const Icon(Icons.account_balance_wallet_outlined, color: Cp.goldDeep),
                ),
                const SizedBox(width: Cp.s1),
                Expanded(
                  child: Text(tr('Rappel, cotisation mensuelle'), style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: Cp.ink)),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(20)),
                  child: Text(tr('1000 FCFA / mois'), style: TextStyle(color: Cp.gold, fontSize: 13, fontWeight: FontWeight.w700)),
                ),
              ]),
              const SizedBox(height: Cp.s1),
              Text(tr('La cotisation des membres est de 1000 FCFA par mois, à régler chaque mois.'), style: t.bodyMedium),
              const SizedBox(height: Cp.s1),
              Builder(builder: (ctx) {
                final now = DateTime.now();
                final paidThisMonth = history.where((r) => r.kind == 'cotisation' && r.confirmed && (r.confirmedAt ?? r.date).year == now.year && (r.confirmedAt ?? r.date).month == now.month).isNotEmpty;
                final monthName = isEn
                    ? const ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][now.month - 1]
                    : const ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'][now.month - 1];
                return Text(
                  paidThisMonth
                      ? (isEn ? 'Contribution for $monthName ${now.year}: confirmed.' : 'Cotisation de $monthName ${now.year} : confirmée.')
                      : (isEn ? 'Contribution for $monthName ${now.year}: no payment confirmed for this month · 1,000 FCFA to settle.' : 'Cotisation de $monthName ${now.year} : aucun paiement confirmé pour ce mois-ci · 1 000 FCFA à régler.'),
                  style: t.bodyMedium,
                );
              }),
              const SizedBox(height: Cp.s2),
              SizedBox(
                width: double.infinity,
                height: 56,
                child: FilledButton.icon(
                  onPressed: _payCotisation,
                  style: FilledButton.styleFrom(
                    backgroundColor: Cp.goldDeep,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
                  ),
                  icon: const Icon(Icons.favorite_border),
                  label: Text(tr('Payer ma cotisation : 1 000 FCFA'), style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
                ),
              ),
              const SizedBox(height: Cp.s1),
              Text(
                tr('Ce rappel s’affiche chaque mois tant que la cotisation du mois n’est pas confirmée. ') +
                tr('Une demande créée ou un clic sur le lien ne suffit jamais à marquer la cotisation comme payée.'),
                style: t.bodyMedium,
              ),
              const SizedBox(height: Cp.s1),
              Text(isEn ? 'Exact amount to confirm in the chosen method: 1,000 FCFA.' : 'Montant exact à valider dans le moyen choisi : 1 000 FCFA.',
                  style: TextStyle(color: Cp.goldDeep, fontSize: 14, fontWeight: FontWeight.w700)),
            ]),
          ),
          const SizedBox(height: Cp.s3),
        ],
        Container(
          padding: const EdgeInsets.all(Cp.s2),
          decoration: BoxDecoration(color: const Color(0xFFEFF6FF), borderRadius: BorderRadius.circular(24), border: Border.all(color: const Color(0xFFBFDBFE))),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(isEn ? 'Step 1 · Mandatory Wave number' : 'Étape 1 · Numéro Wave obligatoire', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
            const SizedBox(height: Cp.s1),
            Text(isEn ? 'Your Wave number' : 'Votre numéro Wave', style: t.labelLarge),
            const SizedBox(height: 4),
            TextField(
              controller: _waveCtrl,
              keyboardType: TextInputType.phone,
              decoration: InputDecoration(
                hintText: '07 XX XX XX XX',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
                suffixIcon: app.confirmedWaveNumber.isNotEmpty ? const Icon(Icons.check_circle_outlined, color: Cp.ok) : null,
              ),
            ),
            const SizedBox(height: Cp.s1),
            Text(isEn ? 'Enter the number of the Wave account that will pay. Read it carefully, then confirm this step: without a valid, confirmed number, no request can be created and no payment link is shown.' : 'Saisissez le numéro du compte Wave qui paiera. Relisez-le attentivement, puis confirmez cette étape : sans numéro valide et confirmé, aucune demande ne peut être créée et aucun lien de paiement ne s’affiche.', style: t.bodyMedium),
            const SizedBox(height: Cp.s1),
            SizedBox(
              width: double.infinity,
              height: 52,
              child: FilledButton.icon(
                onPressed: _confirmWaveNumber,
                style: FilledButton.styleFrom(backgroundColor: Cp.goldDeep, foregroundColor: Colors.white),
                icon: const Icon(Icons.shield_outlined),
                label: Text(tr('Vérifier et confirmer ce numéro')),
              ),
            ),
            const SizedBox(height: Cp.s1),
            Text(isEn ? 'This check verifies the number format and your re-reading. It triggers no payment and marks nothing as paid: Wave alone confirms payment.' : 'Ce contrôle vérifie le format du numéro et votre relecture. Il ne déclenche aucun paiement et ne marque rien comme payé : Wave reste le seul à confirmer le paiement.', style: t.bodyMedium),
            if (app.confirmedWaveNumber.isNotEmpty)
              Padding(
                padding: const EdgeInsets.only(top: Cp.s1),
                child: Text(isEn ? 'Confirmed Wave number: ${app.confirmedWaveNumber}' : 'Numéro Wave confirmé : ${app.confirmedWaveNumber}', style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700)),
              ),
          ]),
        ),
        const SizedBox(height: Cp.s3),
        Text(tr('Contribution par Wave, Orange Money ou PayPal'), style: t.titleLarge),
        const SizedBox(height: Cp.s1),
        Text(tr('Choisissez ou saisissez un montant en FCFA.'), style: t.bodyMedium),
        const SizedBox(height: Cp.s3),
        Wrap(spacing: Cp.s1, runSpacing: Cp.s1, children: [
          for (final v in kQuickAmounts)
            ChoiceChip(
              label: Text(fcfa(v)),
              selected: _amount == v,
              onSelected: (_) {
                _controller.text = v.toString();
                setState(() => _amount = v);
              },
              labelStyle: TextStyle(fontWeight: FontWeight.w700, color: _amount == v ? Cp.navy : Cp.ink),
              selectedColor: Cp.gold,
              backgroundColor: Cp.card,
              side: const BorderSide(color: Cp.line),
            ),
        ]),
        const SizedBox(height: Cp.s2),
        TextField(
          controller: _controller,
          onChanged: _onChanged,
          keyboardType: TextInputType.number,
          style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: Cp.ink),
          decoration: InputDecoration(
            labelText: tr('Autre montant'),
            suffixText: 'FCFA',
            filled: true,
            fillColor: Cp.card,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
          ),
        ),
        const SizedBox(height: Cp.s3),
        Container(
          padding: const EdgeInsets.all(Cp.s2),
          decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(Cp.radiusCard)),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(tr('Montant exact à valider dans le moyen choisi'), style: TextStyle(color: Cp.gold, fontSize: 14, fontWeight: FontWeight.w700)),
            const SizedBox(height: Cp.s1),
            Text(_amount == null ? '— FCFA' : fcfa(_amount!), style: const TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.w700)),
          ]),
        ),
        const SizedBox(height: Cp.s2),
        SizedBox(
          height: 56,
          child: FilledButton.icon(
            onPressed: _amount == null ? null : _pay,
            icon: const Icon(Icons.open_in_new_outlined),
            label: Text(tr('Choisir le moyen de paiement'), style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
          ),
        ),
        if (kWaveBaseUrl.isEmpty) ...[
          const SizedBox(height: Cp.s1),
          Text(tr('Lien Wave de la structure : à configurer avant la mise en service.'), style: t.bodyMedium),
        ],
        const SizedBox(height: Cp.s2),
        SizedBox(
          width: double.infinity,
          height: 52,
          child: OutlinedButton.icon(
            onPressed: () => goAdmin(c, () => admin.VerifyPaymentsListPage()),
            icon: const Icon(Icons.verified_outlined),
            label: Text(tr('Vérifier mon paiement')),
          ),
        ),
        const SizedBox(height: Cp.s3),
        sectionHeading(isEn ? 'My contributions history' : 'Historique de mes contributions', t),
        const SizedBox(height: Cp.s1),
        if (history.isEmpty)
          DashedCard(
            child: Text(isEn ? 'No request yet. Create your first request above. It will appear here, awaiting confirmation. Its invoice will follow if Wave confirms the payment.' : 'Aucune demande pour le moment. Créez votre première demande ci-dessus. Elle apparaîtra ici, en attente. Sa facture suivra si Wave confirme le paiement.', style: t.bodyMedium, textAlign: TextAlign.center),
          )
        else
          Card(
            child: Column(children: [
              for (final r in history)
                ListTile(
                  title: Text('${r.kind == 'cotisation' ? 'Cotisation · ' : ''}${fcfa(r.amount)}', style: t.labelLarge),
                  subtitle: Text('${dateFr(r.date)} · ${r.method} · ${r.ref} · ${r.confirmed ? tr('Paiement confirmé') : tr('En attente de confirmation')}', style: t.bodyMedium),
                  trailing: Row(mainAxisSize: MainAxisSize.min, children: [
                    TextButton(
                      onPressed: () => go(c, VerifyPaymentPage(request: r)),
                      child: Text(tr('Vérifier')),
                    ),
                    if (r.confirmed)
                      IconButton(tooltip: tr('Facture'), icon: const Icon(Icons.receipt_long_outlined), onPressed: () => goMembre(c, () => membre.InvoicePage(request: r)))
                    else
                      const StatusChip(confirmed: false),
                  ]),
                ),
            ]),
          ),
      ]);
    });
  }
}

// ═══════════════════════════════════════════════════════════════════
// 12. MON ÉPANOUISSEMENT : plan de 21 jours, journal, minuteur
// Recopie de l'espace web, dans le même ordre : en-tête, statistiques,
// minuteur de prière, plan de lecture de 21 jours, journal personnel.
// Les statistiques sont les valeurs réelles de l'application : plan
// enregistré (planDone), versets favoris lus depuis BibleService,
// inscriptions aux camps enregistrées, et objectifs atteints : il n'existe
// pas de suivi d'objectif séparé dans l'application, donc cette valeur
// est 0 (aucun objectif suivi), jamais un chiffre inventé.
const _planDays = <(int, int, String)>[
  (18, 23, 'Psaume 23'),
  (42, 3, 'Jean 3'),
  (19, 3, 'Proverbes 3'),
  (22, 41, 'Ésaïe 41'),
  (5, 1, 'Josué 1'),
  (18, 91, 'Psaume 91'),
  (49, 4, 'Philippiens 4'),
  (44, 8, 'Romains 8'),
  (39, 11, 'Matthieu 11'),
  (42, 14, 'Jean 14'),
  (45, 13, '1 Corinthiens 13'),
  (47, 5, 'Galates 5'),
  (48, 3, 'Éphésiens 3'),
  (18, 121, 'Psaume 121'),
  (24, 3, 'Lamentations 3'),
  (46, 5, '2 Corinthiens 5'),
  (57, 11, 'Hébreux 11'),
  (18, 37, 'Psaume 37'),
  (22, 40, 'Ésaïe 40'),
  (42, 8, 'Jean 8'),
  (57, 13, 'Hébreux 13'),
];

// Journal personnel direct, 27 oct. 2026 : le journal existait
// déjà, mais seulement tout en bas de Mon épanouissement, après
// le minuteur et les 21 jours, donc on ne le voyait pas. Il a
// maintenant sa propre page, accessible depuis Plus, avec les
// mêmes notes que Mon épanouissement, enregistrées sur l'appareil
// seulement, jamais envoyées au serveur, jamais partagées.
class JournalPage extends StatefulWidget {
  const JournalPage({super.key});

  @override
  State<JournalPage> createState() => _JournalPageState();
}

class _JournalPageState extends State<JournalPage> {
  bool _writing = false;
  final _text = TextEditingController();

  @override
  void dispose() {
    _text.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      return basic(tr('Journal personnel'), [
        Text(
          tr('Vos notes personnelles, pour vous seul. Elles restent sur votre appareil, elles ne sont pas envoyées au serveur et ne sont jamais partagées.'),
          style: t.bodyMedium,
        ),
        const SizedBox(height: Cp.s1),
        Row(children: [
          Expanded(
            child: SizedBox(
              height: 52,
              child: OutlinedButton.icon(
                icon: const Icon(Icons.upload_outlined),
                label: Text(tr('Exporter')),
                onPressed: () async {
                  if (app.journal.isEmpty) {
                    toast(context, tr('Journal vide, rien à exporter.'));
                    return;
                  }
                  final data = {
                    'app': 'CONNEXION PROPHETIQUE',
                    'type': 'journal',
                    'version': 1,
                    'entries': app.journal.map((e) => {'d': e.date.toIso8601String(), 't': e.text}).toList(),
                  };
                  final bytes = utf8.encode(jsonEncode(data));
                  try {
                    await saveToDownloads(bytes, 'journal-connexion-prophetique.json');
                  } catch (_) {}
                  try {
                    await Share.shareXFiles([XFile.fromData(bytes, name: 'journal-connexion-prophetique.json', mimeType: 'application/json')],
                        text: tr('Sauvegarde de mon journal CONNEXION PROPHETIQUE'));
                    if (context.mounted) toast(context, tr('Journal exporté : gardez ce fichier dans Drive ou Fichiers.'));
                  } catch (e) {
                    if (context.mounted) toast(context, 'Export impossible : $e');
                  }
                },
              ),
            ),
          ),
          const SizedBox(width: Cp.s1),
          Expanded(
            child: SizedBox(
              height: 52,
              child: OutlinedButton.icon(
                icon: const Icon(Icons.download_outlined),
                label: Text(tr('Importer')),
                onPressed: () async {
                  try {
                    final result = await FilePicker.platform.pickFiles(type: FileType.custom, allowedExtensions: ['json'], withData: true);
                    final bytes = result?.files.single.bytes;
                    if (bytes == null || bytes.isEmpty) {
                      if (context.mounted) toast(context, tr('Impossible de lire ce fichier.'));
                      return;
                    }
                    final decoded = jsonDecode(utf8.decode(bytes));
                    if (decoded is! Map || decoded['type'] != 'journal' || decoded['entries'] is! List) {
                      if (context.mounted) toast(context, tr('Ce fichier n’est pas une sauvegarde de journal.'));
                      return;
                    }
                    var added = 0;
                    for (final raw in decoded['entries'] as List) {
                      if (raw is! Map) continue;
                      final d = DateTime.tryParse((raw['d'] ?? '').toString());
                      final txt = (raw['t'] ?? '').toString();
                      if (d == null || txt.isEmpty) continue;
                      if (app.journal.any((e) => e.date.toIso8601String() == d.toIso8601String() && e.text == txt)) continue;
                      app.journal.add(JournalEntry(d, txt));
                      added++;
                    }
                    app.journal.sort((x, y) => y.date.compareTo(x.date));
                    app.changed();
                    if (context.mounted) toast(context, added == 0 ? tr('Aucune nouvelle note à importer.') : tr('$added note(s) importée(s).'));
                  } catch (e) {
                    if (context.mounted) toast(context, 'Import impossible : $e');
                  }
                },
              ),
            ),
          ),
        ]),
        const SizedBox(height: Cp.s1),
        Text(
          tr('Sauvegarde : exportez votre journal, gardez le fichier dans Drive ou Fichiers, puis importez-le sur un nouvel appareil. Rien n’est envoyé automatiquement.'),
          style: t.bodyMedium,
        ),
        const SizedBox(height: Cp.s1),
        if (!_writing)
          SizedBox(
            height: 52,
            child: FilledButton(
              onPressed: () => setState(() => _writing = true),
              child: Text(tr('Écrire')),
            ),
          )
        else ...[
          TextField(
            controller: _text,
            minLines: 3,
            maxLines: 6,
            decoration: InputDecoration(
              hintText: tr('Écrivez votre note du jour…'),
              filled: true,
              fillColor: Cp.card,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
            ),
          ),
          const SizedBox(height: Cp.s1),
          Row(children: [
            Expanded(
              child: SizedBox(
                height: 52,
                child: FilledButton(
                  onPressed: () {
                    final v = _text.text.trim();
                    if (v.isEmpty) return;
                    app.journal.insert(0, JournalEntry(DateTime.now(), v));
                    _text.clear();
                    setState(() => _writing = false);
                    app.changed();
                  },
                  child: Text(tr('Enregistrer la note')),
                ),
              ),
            ),
            const SizedBox(width: Cp.s1),
            SizedBox(
              height: 52,
              child: OutlinedButton(
                onPressed: () => setState(() {
                  _writing = false;
                  _text.clear();
                }),
                child: Text(tr('Annuler')),
              ),
            ),
          ]),
        ],
        const SizedBox(height: Cp.s2),
        if (app.journal.isEmpty)
          Text(
            'Votre journal est encore vide, ce n\'est pas une erreur. Écrivez votre première note avec le bouton « Écrire » ci-dessus.',
            textAlign: TextAlign.center,
            style: t.bodyMedium,
          )
        else
          for (final e in app.journal) ...[
            Card(
              child: ListTile(
                title: Text(e.text, style: t.labelLarge?.copyWith(fontWeight: FontWeight.w400)),
                subtitle: Text(dateFr(e.date), style: t.bodyMedium),
                trailing: IconButton(
                  tooltip: tr('Supprimer'),
                  icon: const Icon(Icons.delete_outline),
                  onPressed: () {
                    app.journal.remove(e);
                    app.changed();
                  },
                ),
              ),
            ),
            const SizedBox(height: Cp.s1),
          ],
      ]);
    });
  }
}

// Carte 62, Mon journal, 6 nov. 2026 : privé, en local seulement
// avec SharedPreferences, jamais envoyé au serveur, jamais publié,
// avec export JSON et copie, comme dans le modèle de Claude.
// 4 catégories, pas 3 : le modèle fusionnait Projets et
// Orientations en un seul onglet, ici ils sont séparés, à la demande
// d'Axel. Rêves et songes : titre, date, récit, symboles et versets
// associés, interprétation à compléter plus tard, jamais
// d'interprétation automatique. Projets : titre, description,
// horizon, statut. Orientations et révélations : type Orientation
// ou Révélation, titre, description, horizon, statut, confirmé par.
// Messages à préparer : titre, public visé, durée estimée, thème et
// passages clés, accroche et introduction, points principaux,
// illustration, conclusion, lié à une entrée du journal.
// Chaque entrée : créer, modifier, supprimer avec confirmation.
// Les boutons de la méditation ouvrent le journal prérempli.
// Les anciennes notes libres du JournalPage existant restent
// accessibles, sans être perdues : onglet Notes libres, avec leur
// export et import gardés dans leur page, voir ci-dessous.
// Touche de Muse : recherche dans toutes les entrées, par mot, par
// date et par catégorie ; petit bilan privé en haut du journal,
// nombre d'entrées par catégorie, orientations accomplies, sans
// rien envoyer, sans rien publier ; pour un message, bouton
// Reprendre, qui rouvre le brouillon à la première étape encore
// vide, et Copier le texte, déjà dans le modèle ; pour un rêve ou
// une orientation, bouton Lier à un message, qui crée un message à
// partir de cette entrée, en un seul geste, l'inverse du lien déjà
// dans le modèle. Même langue visuelle que la carte Méditation :
// titres courts, chiffres et icônes d'abord, bleu nuit et or.
class SpiritualJournalPage extends StatefulWidget {
  const SpiritualJournalPage({super.key, this.initialTab = 0, this.prefill, this.openForm = false});
  final int initialTab;
  final Map<String, dynamic>? prefill;
  final bool openForm;

  @override
  State<SpiritualJournalPage> createState() => _SpiritualJournalPageState();
}

class _SpiritualJournalPageState extends State<SpiritualJournalPage> {
  final _store = SpiritualJournalStore();
  final _searchCtrl = TextEditingController();
  bool _loaded = false;
  int _tab = 0;
  String _query = '';
  bool _searchAll = false;
  bool _formOpen = false;
  String _formCat = 'reves';
  String? _editingId;
  Map<String, String> _form = {};
  String _resumeSection = '';

  static const _tabLabels = ['Rêves', 'Projets', 'Orientations', 'Messages', 'Notes libres'];
  static const _addLabels = {
    'reves': 'Noter un rêve ou un songe',
    'projets': 'Noter un projet',
    'orientations': 'Noter une orientation ou une révélation',
    'messages': 'Préparer un message',
  };
  static const _horizons = ['Court terme', 'Moyen terme', 'Long terme'];
  static const _statuts = ['En attente', 'En cours', 'Accompli'];

  @override
  void initState() {
    super.initState();
    _tab = widget.initialTab.clamp(0, 4);
    _store.load().then((_) {
      if (!mounted) return;
      setState(() {
        _loaded = true;
        if (widget.openForm && widget.prefill != null && _tab <= 3) {
          _openForm(kJournalCategories[_tab], prefill: widget.prefill);
        }
      });
    });
  }

  @override
  void dispose() {
    _searchCtrl.dispose();
    super.dispose();
  }

  Map<String, String> _defaults(String cat) {
    final today = journalTodayIso();
    switch (cat) {
      case 'projets':
        return {'titre': '', 'description': '', 'horizon': 'Court terme', 'statut': 'En attente', 'date': today};
      case 'orientations':
        return {'type': 'Orientation', 'titre': '', 'description': '', 'horizon': 'Court terme', 'statut': 'En attente', 'confirme': '', 'date': today};
      case 'messages':
        return {'titre': '', 'public': '', 'duree': '', 'theme': '', 'accroche': '', 'points': '', 'illustration': '', 'conclusion': '', 'lien': '', 'date': today};
      case 'reves':
      default:
        return {'titre': '', 'date': today, 'recit': '', 'symboles': '', 'interp': ''};
    }
  }

  void _openForm(String cat, {Map<String, dynamic>? entry, Map<String, dynamic>? prefill, String resumeSection = ''}) {
    final base = _defaults(cat);
    if (entry != null) {
      for (final k in base.keys) {
        base[k] = (entry[k] ?? '').toString();
      }
    }
    if (prefill != null) {
      prefill.forEach((k, v) => base[k.toString()] = (v ?? '').toString());
    }
    setState(() {
      _formCat = cat;
      _form = base;
      _editingId = entry == null ? null : '${entry['id']}';
      _formOpen = true;
      _resumeSection = resumeSection;
    });
  }

  void _closeForm() {
    setState(() {
      _formOpen = false;
      _editingId = null;
      _resumeSection = '';
    });
  }

  void _saveForm() {
    final cat = _formCat;
    final titre = (_form['titre'] ?? '').trim();
    if (titre.isEmpty) {
      toast(context, tr('Le titre est requis.'));
      return;
    }
    final date = (_form['date'] ?? '').trim();
    final entry = <String, dynamic>{
      ..._form,
      'id': _editingId ?? journalNewId(),
      'titre': titre,
      'date': date.isEmpty ? journalTodayIso() : date,
    };
    final list = _store.data[cat]!;
    final idx = list.indexWhere((e) => '${e['id']}' == '${entry['id']}');
    if (idx >= 0) {
      list[idx] = entry;
    } else {
      list.insert(0, entry);
    }
    _store.save();
    _closeForm();
    toast(context, tr('Enregistré.'));
  }

  Future<void> _confirmDelete(String cat, Map<String, dynamic> entry) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Supprimer cette entrée ?')),
        content: Text((entry['titre'] ?? '').toString()),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          TextButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Supprimer'))),
        ],
      ),
    );
    if (ok != true) return;
    _store.data[cat]!.removeWhere((x) => '${x['id']}' == '${entry['id']}');
    await _store.save();
    if (mounted) setState(() {});
  }

  // Lier à un message, touche de Muse : crée un message à partir
  // d'un rêve ou d'une orientation, en un seul geste, et ouvre son
  // brouillon à la première étape encore vide.
  void _linkToMessage(String cat, Map<String, dynamic> entry) {
    final msg = SpiritualJournalStore.messageFromEntry(cat, entry);
    _store.data['messages']!.insert(0, msg);
    _store.save();
    setState(() => _tab = 3);
    _openForm('messages',
        entry: msg, resumeSection: SpiritualJournalStore.firstIncompleteMessageSection(msg));
    toast(context, tr('Message créé à partir de cette entrée.'));
  }

  // Reprendre, touche de Muse : rouvre le brouillon du message à
  // la première étape encore vide, là où il s'était arrêté.
  void _resumeMessage(Map<String, dynamic> entry) {
    _openForm('messages',
        entry: entry, resumeSection: SpiritualJournalStore.firstIncompleteMessageSection(entry));
  }

  Future<void> _export() async {
    if (_store.total == 0) {
      toast(context, tr('Journal vide, rien à exporter.'));
      return;
    }
    final bytes = utf8.encode(_store.exportJson());
    try {
      await saveToDownloads(bytes, 'journal-spirituel-connexion-prophetique.json');
    } catch (_) {}
    try {
      await Share.shareXFiles(
          [XFile.fromData(bytes, name: 'journal-spirituel-connexion-prophetique.json', mimeType: 'application/json')],
          text: tr('Sauvegarde de mon journal CONNEXION PROPHETIQUE'));
      if (context.mounted) toast(context, tr('Journal exporté : gardez ce fichier dans Drive ou Fichiers.'));
    } catch (e) {
      if (context.mounted) toast(context, 'Export impossible : $e');
    }
  }

  Future<void> _import() async {
    try {
      final result = await FilePicker.platform.pickFiles(type: FileType.custom, allowedExtensions: ['json'], withData: true);
      final bytes = result?.files.single.bytes;
      if (bytes == null || bytes.isEmpty) {
        if (context.mounted) toast(context, tr('Impossible de lire ce fichier.'));
        return;
      }
      final raw = utf8.decode(bytes);
      final decoded = jsonDecode(raw);
      if (decoded is! Map ||
          (decoded['type'] != 'journal-spirituel' &&
              !decoded.containsKey('reves') &&
              !decoded.containsKey('messages'))) {
        if (context.mounted) toast(context, tr('Ce fichier n’est pas une sauvegarde de journal.'));
        return;
      }
      final added = _store.importJson(raw);
      await _store.save();
      if (!mounted) return;
      setState(() {});
      toast(context, added == 0 ? tr('Aucune nouvelle entrée à importer.') : tr('$added entrée(s) importée(s).'));
    } catch (e) {
      if (context.mounted) toast(context, 'Import impossible : $e');
    }
  }

  Widget _label(String text, TextTheme t) => Padding(
        padding: const EdgeInsets.only(bottom: 4),
        child: Text(text, style: t.labelMedium?.copyWith(color: Cp.inkMuted, fontWeight: FontWeight.w800)),
      );

  Widget _textField(String label, String key, TextTheme t, {int lines = 1}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _label(label, t),
        TextFormField(
          key: ValueKey('${_editingId ?? 'nouveau'}-$key-${_form[key]}'),
          initialValue: _form[key] ?? '',
          maxLines: lines,
          minLines: lines > 1 ? lines : 1,
          autofocus: _resumeSection.isNotEmpty && _resumeSection == label,
          onChanged: (v) => _form[key] = v,
          decoration: InputDecoration(
            filled: true,
            fillColor: Cp.card,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
          ),
        ),
        const SizedBox(height: Cp.s1),
      ],
    );
  }

  Widget _selectField(String label, String key, List<String> options, TextTheme t) {
    final value = options.contains(_form[key]) ? _form[key]! : options.first;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _label(label, t),
        DropdownButtonFormField<String>(
          value: value,
          items: options.map((o) => DropdownMenuItem(value: o, child: Text(o))).toList(),
          onChanged: (v) {
            if (v != null) _form[key] = v;
          },
          decoration: InputDecoration(
            filled: true,
            fillColor: Cp.card,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
          ),
        ),
        const SizedBox(height: Cp.s1),
      ],
    );
  }

  Widget _dateField(TextTheme t) {
    // Carte 107, 8 nov. 2026 : la date s'affiche JJ/MM/AAAA comme à
    // l'inscription. Le formulaire garde l'ISO AAAA-MM-JJ en
    // interne, l'enregistrement ne change pas.
    final dateChoisie = DateTime.tryParse(_form['date'] ?? '');
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _label(tr('Date'), t),
        TextFormField(
          key: ValueKey('date-${_form['date']}'),
          readOnly: true,
          initialValue: dateChoisie == null ? (_form['date'] ?? '') : formatDateCourte(dateChoisie),
          onTap: () async {
            final current = DateTime.tryParse(_form['date'] ?? '') ?? DateTime.now();
            final picked = await showDatePicker(
              context: context,
              initialDate: current,
              firstDate: DateTime(2000),
              lastDate: DateTime(2100),
            );
            if (picked != null) setState(() => _form['date'] = picked.toIso8601String().substring(0, 10));
          },
          decoration: InputDecoration(
            filled: true,
            fillColor: Cp.card,
            suffixIcon: const Icon(Icons.calendar_today_outlined),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
          ),
        ),
        const SizedBox(height: Cp.s1),
      ],
    );
  }

  Widget _linkField(TextTheme t) {
    final options = <DropdownMenuItem<String>>[
      DropdownMenuItem(value: '', child: Text(tr('Aucun'))),
      for (final e in _store.data['reves'] ?? const [])
        DropdownMenuItem(value: 'reves:${e['id']}', child: Text('Rêve : ${e['titre']}')),
      for (final e in (_store.data['orientations'] ?? const []).where((e) => (e['type'] ?? '') == 'Révélation'))
        DropdownMenuItem(value: 'orientations:${e['id']}', child: Text('Révélation : ${e['titre']}')),
    ];
    final value = options.any((o) => o.value == _form['lien']) ? (_form['lien'] ?? '') : '';
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _label(tr('Lié à une entrée du journal'), t),
        DropdownButtonFormField<String>(
          value: value,
          items: options,
          onChanged: (v) {
            if (v != null) _form['lien'] = v;
          },
          decoration: InputDecoration(
            filled: true,
            fillColor: Cp.card,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
          ),
        ),
        const SizedBox(height: Cp.s1),
      ],
    );
  }

  List<Widget> _formFields(TextTheme t) {
    switch (_formCat) {
      case 'projets':
        return [
          _textField(tr('Titre'), 'titre', t),
          _textField(tr('Description'), 'description', t, lines: 3),
          _selectField(tr('Horizon'), 'horizon', _horizons, t),
          _selectField(tr('Statut'), 'statut', _statuts, t),
          _dateField(t),
        ];
      case 'orientations':
        return [
          _selectField(tr('Type'), 'type', const ['Orientation', 'Révélation'], t),
          _textField(tr('Titre'), 'titre', t),
          _textField(tr('Description'), 'description', t, lines: 3),
          _selectField(tr('Horizon'), 'horizon', _horizons, t),
          _selectField(tr('Statut'), 'statut', _statuts, t),
          _textField(tr('Confirmé par (parole, conseil, témoignage)'), 'confirme', t),
          _dateField(t),
        ];
      case 'messages':
        return [
          _textField(tr('Titre'), 'titre', t),
          _textField(tr('Public visé'), 'public', t),
          _textField(tr('Durée estimée (minutes)'), 'duree', t),
          _textField(tr('Thème et passages clés'), 'theme', t),
          _textField(tr('Accroche et introduction'), 'accroche', t, lines: 3),
          _textField(tr('Points principaux'), 'points', t, lines: 3),
          _textField(tr('Illustration'), 'illustration', t, lines: 3),
          _textField(tr('Conclusion'), 'conclusion', t, lines: 3),
          _linkField(t),
          _dateField(t),
        ];
      case 'reves':
      default:
        return [
          _textField(tr('Titre'), 'titre', t),
          _dateField(t),
          _textField(tr('Récit : ce qui a été vu'), 'recit', t, lines: 4),
          _textField(tr('Symboles et versets associés'), 'symboles', t),
          _textField(tr('Interprétation (à compléter plus tard)'), 'interp', t, lines: 3),
        ];
    }
  }

  Widget _chip(String text, {Color? color}) => Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
        decoration: BoxDecoration(
          color: (color ?? Cp.gold).withValues(alpha: 0.12),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Text(text, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700)),
      );

  Widget _countChip(IconData icon, int count, String label, TextTheme t) => Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: Cp.gold.withValues(alpha: 0.12),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Cp.gold.withValues(alpha: 0.4)),
        ),
        child: Row(mainAxisSize: MainAxisSize.min, children: [
          Icon(icon, size: 18, color: Cp.goldDeep),
          const SizedBox(width: 6),
          Text('$count', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
          const SizedBox(width: 6),
          Text(label, style: t.bodyMedium),
        ]),
      );

  // Petit bilan privé, touche de Muse : chiffres et icônes d'abord,
  // en haut du journal, sans rien envoyer, sans rien publier.
  Widget _summaryCard(TextTheme t) {
    const icons = {
      'reves': Icons.nightlight_outlined,
      'projets': Icons.flag_outlined,
      'orientations': Icons.explore_outlined,
      'messages': Icons.edit_outlined,
    };
    const labels = {'reves': 'Rêves', 'projets': 'Projets', 'orientations': 'Orientations', 'messages': 'Messages'};
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            const Icon(Icons.lock_outlined, size: 20, color: Cp.goldDeep),
            const SizedBox(width: 8),
            Expanded(child: Text(tr('Bilan privé'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800))),
          ]),
          const SizedBox(height: 4),
          Text(tr('Sur cet appareil seulement, rien n’est envoyé ni publié.'), style: t.bodyMedium),
          const SizedBox(height: 12),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              for (final cat in kJournalCategories) _countChip(icons[cat]!, _store.count(cat), labels[cat]!, t),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            'Orientations accomplies : ${_store.accomplishedOrientations}',
            style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700),
          ),
        ]),
      ),
    );
  }

  Widget _entryCard(String cat, Map<String, dynamic> e, TextTheme t) {
    final dateRaw = (e['date'] ?? '').toString();
    final parsed = DateTime.tryParse(dateRaw);
    final dateLabel = parsed == null ? dateRaw : dateFr(parsed);
    final chips = <Widget>[];
    if (cat == 'orientations') {
      chips.add(_chip((e['type'] ?? '').toString()));
      chips.add(_chip((e['horizon'] ?? '').toString()));
      chips.add(_chip((e['statut'] ?? '').toString()));
    } else if (cat == 'projets') {
      chips.add(_chip((e['horizon'] ?? '').toString()));
      chips.add(_chip((e['statut'] ?? '').toString()));
    }
    Widget bodyLine(String label, String value) => value.isEmpty
        ? const SizedBox.shrink()
        : Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Text.rich(TextSpan(children: [
              TextSpan(text: '$label : ', style: const TextStyle(fontWeight: FontWeight.w700)),
              TextSpan(text: value),
            ]), style: t.bodyMedium),
          );
    final body = <Widget>[];
    if (cat == 'reves') {
      body.add(Text((e['recit'] ?? '').toString(), style: t.bodyMedium));
      body.add(bodyLine('Symboles', (e['symboles'] ?? '').toString()));
      if ((e['interp'] ?? '').toString().isNotEmpty) {
        body.add(Padding(
          padding: const EdgeInsets.only(top: 4),
          child: Text('Interprétation : ${(e['interp'] ?? '').toString()}',
              style: t.bodyMedium?.copyWith(fontStyle: FontStyle.italic)),
        ));
      }
    } else if (cat == 'projets' || cat == 'orientations') {
      body.add(Text((e['description'] ?? '').toString(), style: t.bodyMedium));
      body.add(bodyLine('Confirmé par', (e['confirme'] ?? '').toString()));
    } else {
      final meta = [
        if ((e['public'] ?? '').toString().isNotEmpty) 'Public : ${e['public']}',
        if ((e['duree'] ?? '').toString().isNotEmpty) '${e['duree']} min',
      ].join(' · ');
      if (meta.isNotEmpty) body.add(Text(meta, style: t.bodyMedium?.copyWith(color: Cp.inkMuted)));
      if ((e['theme'] ?? '').toString().isNotEmpty) {
        body.add(Padding(
          padding: const EdgeInsets.only(top: 4),
          child: Text((e['theme'] ?? '').toString(), style: t.bodyMedium?.copyWith(color: Cp.goldDeep, fontWeight: FontWeight.w700)),
        ));
      }
      body.add(bodyLine('Accroche', (e['accroche'] ?? '').toString()));
      body.add(bodyLine('Points', (e['points'] ?? '').toString()));
      body.add(bodyLine('Illustration', (e['illustration'] ?? '').toString()));
      body.add(bodyLine('Conclusion', (e['conclusion'] ?? '').toString()));
      final lien = (e['lien'] ?? '').toString();
      if (lien.isNotEmpty) {
        final target = journalLinkLabel(_store.data, lien);
        if (target.isNotEmpty) {
          body.add(Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Text('Lié à : $target', style: t.bodySmall?.copyWith(color: Cp.inkMuted)),
          ));
        }
      }
    }
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Expanded(child: Text((e['titre'] ?? '').toString(), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800))),
            const SizedBox(width: 8),
            Text(dateLabel, style: t.bodySmall?.copyWith(color: Cp.inkMuted)),
          ]),
          if (chips.isNotEmpty) ...[
            const SizedBox(height: 8),
            Wrap(spacing: 6, runSpacing: 6, children: chips),
          ],
          const SizedBox(height: 8),
          ...body,
          const SizedBox(height: 8),
          Wrap(
            spacing: 4,
            runSpacing: 4,
            alignment: WrapAlignment.end,
            children: [
              if (cat == 'messages') ...[
                TextButton.icon(
                  onPressed: () => _resumeMessage(e),
                  icon: const Icon(Icons.play_arrow_outlined, size: 18),
                  label: Text(tr('Reprendre')),
                ),
                TextButton.icon(
                  onPressed: () async {
                    await Clipboard.setData(ClipboardData(text: journalMessageText(e)));
                    if (context.mounted) toast(context, tr('Copié !'));
                  },
                  icon: const Icon(Icons.copy_outlined, size: 18),
                  label: Text(tr('Copier le texte')),
                ),
              ],
              if (cat == 'reves' || cat == 'orientations')
                TextButton.icon(
                  onPressed: () => _linkToMessage(cat, e),
                  icon: const Icon(Icons.link_outlined, size: 18),
                  label: Text(tr('Lier à un message')),
                ),
              TextButton.icon(
                onPressed: () => _openForm(cat, entry: e),
                icon: const Icon(Icons.edit_outlined, size: 18),
                label: Text(tr('Modifier')),
              ),
              TextButton.icon(
                onPressed: () => _confirmDelete(cat, e),
                icon: const Icon(Icons.delete_outline, size: 18),
                label: Text(tr('Supprimer')),
              ),
            ],
          ),
        ]),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      final cat = _tab <= 3 ? kJournalCategories[_tab] : null;
      final results = _loaded ? _store.search(_query, category: _searchAll ? null : cat) : const <(String, Map<String, dynamic>)>[];
      final searching = _query.trim().isNotEmpty;
      return basic(tr('Mon journal'), [
        Text(
          tr('Votre journal spirituel, pour vous seul. Il reste sur votre appareil, il n’est pas envoyé au serveur et n’est jamais partagé.'),
          style: t.bodyMedium,
        ),
        const SizedBox(height: Cp.s1),
        _summaryCard(t),
        const SizedBox(height: Cp.s1),
        // Recherche dans toutes les entrées, par mot, par date et
        // par catégorie, touche de Muse.
        TextField(
          controller: _searchCtrl,
          onChanged: (v) => setState(() => _query = v),
          decoration: InputDecoration(
            hintText: tr('Rechercher par mot, par date, par catégorie…'),
            prefixIcon: const Icon(Icons.search_outlined),
            filled: true,
            fillColor: Cp.card,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
          ),
        ),
        if (searching) ...[
          const SizedBox(height: 8),
          Row(children: [
            Expanded(
              child: Text(
                '${results.length} ${results.length == 1 ? tr('résultat') : tr('résultats')}',
                style: t.bodyMedium,
              ),
            ),
            TextButton(
              onPressed: () => setState(() => _searchAll = !_searchAll),
              child: Text(_searchAll ? tr('Toutes les catégories') : tr('Cet onglet seulement')),
            ),
          ]),
        ],
        const SizedBox(height: Cp.s1),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(children: [
            for (var i = 0; i < _tabLabels.length; i++)
              Padding(
                padding: const EdgeInsets.only(right: 8),
                child: ChoiceChip(
                  label: Text(_tabLabels[i]),
                  selected: _tab == i,
                  onSelected: (_) => setState(() {
                    _tab = i;
                    _formOpen = false;
                  }),
                ),
              ),
          ]),
        ),
        const SizedBox(height: Cp.s1),
        if (!_loaded) const LinearProgressIndicator(),
        if (_loaded && _tab == 4) ...[
          Text(
            'Vos anciennes notes libres, gardées telles quelles. Leur export et leur import restent dans la page Notes libres.',
            style: t.bodyMedium,
          ),
          const SizedBox(height: Cp.s1),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Row(children: [
                const Icon(Icons.book_outlined, size: 20, color: Cp.goldDeep),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    '${app.journal.length} ${app.journal.length == 1 ? 'note libre' : 'notes libres'}',
                    style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800),
                  ),
                ),
              ]),
            ),
          ),
          const SizedBox(height: Cp.s1),
          SizedBox(
            height: 52,
            child: OutlinedButton.icon(
              onPressed: () => go(c, const JournalPage()),
              icon: const Icon(Icons.book_outlined),
              label: Text(tr('Ouvrir mes notes libres')),
            ),
          ),
          const SizedBox(height: Cp.s2),
        ],
        if (_loaded && _tab <= 3) ...[
          if (!_formOpen)
            SizedBox(
              height: 52,
              child: FilledButton.icon(
                onPressed: () => _openForm(cat!),
                icon: const Icon(Icons.add_outlined),
                label: Text(_addLabels[cat]!),
              ),
            )
          else
            Card(
              key: ValueKey('${_editingId ?? 'nouveau'}-$_formCat'),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(
                    '${_editingId == null ? tr('Nouveau') : tr('Modifier')} : ${kJournalCategoryLabels[_formCat]}',
                    style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800),
                  ),
                  if (_resumeSection.isNotEmpty) ...[
                    const SizedBox(height: 8),
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Cp.gold.withValues(alpha: 0.12),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: Cp.gold.withValues(alpha: 0.4)),
                      ),
                      child: Text('Reprise : prochaine étape, $_resumeSection.',
                          style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700)),
                    ),
                  ],
                  const SizedBox(height: 12),
                  ..._formFields(t),
                  Row(children: [
                    Expanded(
                      child: SizedBox(
                        height: 52,
                        child: FilledButton(
                          onPressed: _saveForm,
                          child: Text(tr('Enregistrer')),
                        ),
                      ),
                    ),
                    const SizedBox(width: Cp.s1),
                    SizedBox(
                      height: 52,
                      child: OutlinedButton(
                        onPressed: _closeForm,
                        child: Text(tr('Annuler')),
                      ),
                    ),
                  ]),
                ]),
              ),
            ),
          const SizedBox(height: Cp.s2),
          if (results.isEmpty)
            Text(
              searching ? tr('Aucun résultat pour cette recherche.') : tr('Aucune entrée pour le moment.'),
              textAlign: TextAlign.center,
              style: t.bodyMedium,
            )
          else ...[
            if (!searching)
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: Text(
                  '${results.length} ${results.length == 1 ? tr('entrée') : tr('entrées')}',
                  style: t.bodyMedium?.copyWith(color: Cp.inkMuted),
                ),
              ),
            for (final (entryCat, e) in results) ...[
              if (searching && _searchAll)
                Padding(
                  padding: const EdgeInsets.only(bottom: 4),
                  child: Text(kJournalCategoryLabels[entryCat]!, style: t.labelMedium?.copyWith(color: Cp.goldDeep, fontWeight: FontWeight.w800)),
                ),
              _entryCard(entryCat, e, t),
              const SizedBox(height: Cp.s1),
            ],
          ],
        ],
        if (_loaded) ...[
          const SizedBox(height: Cp.s2),
          Row(children: [
            Expanded(
              child: SizedBox(
                height: 52,
                child: OutlinedButton.icon(
                  icon: const Icon(Icons.upload_outlined),
                  label: Text(tr('Exporter')),
                  onPressed: _export,
                ),
              ),
            ),
            const SizedBox(width: Cp.s1),
            Expanded(
              child: SizedBox(
                height: 52,
                child: OutlinedButton.icon(
                  icon: const Icon(Icons.download_outlined),
                  label: Text(tr('Importer')),
                  onPressed: _import,
                ),
              ),
            ),
          ]),
          const SizedBox(height: Cp.s1),
          Text(
            tr('Sauvegarde : exportez votre journal, gardez le fichier dans Drive ou Fichiers, puis importez-le sur un nouvel appareil. Rien n’est envoyé automatiquement.'),
            style: t.bodyMedium,
          ),
        ],
      ]);
    });
  }
}

class EpanouissementPage extends StatefulWidget {
  const EpanouissementPage({super.key});

  @override
  State<EpanouissementPage> createState() => _EpanouissementPageState();
}

class _EpanouissementPageState extends State<EpanouissementPage> {

  @override
  void initState() {
    super.initState();
    // Extraits du plan, 31 oct. 2026 : la Bible est chargée ici aussi,
    // pour que le premier verset de chaque chapitre soit disponible
    // dès l'ouverture de la page, même si la Bible n'a pas encore
    // été ouverte ailleurs. Le chargement est mémorisé dans
    // BibleService, donc sans coût si la Bible est déjà chargée.
    BibleService.instance.load().then((_) {
      if (mounted) setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      final done = app.planDone.length;
      return basic(tr('Mon épanouissement'), [
        Text(
          'Plan de lecture de 21 jours, journal et minuteur de prière, tout enregistré ici et modifiable.',
          style: t.bodyMedium,
        ),
        const SizedBox(height: Cp.s1),
        SizedBox(
          height: 52,
          child: OutlinedButton.icon(
            onPressed: () => go(c, const SpiritualJournalPage()),
            icon: const Icon(Icons.book_outlined),
            label: Text(tr('Ouvrir mon journal personnel')),
          ),
        ),
        const SizedBox(height: Cp.s2),
        Row(children: [
          Expanded(child: _StatTile(value: '$done / 21', label: tr('Plan de lecture'))),
          const SizedBox(width: Cp.s1),
          Expanded(child: _FavStatTile(key: ValueKey(app.lang))),
        ]),
        const SizedBox(height: Cp.s1),
        Row(children: [
          Expanded(child: _StatTile(value: '${app.registrations.length}', label: tr('Inscriptions aux camps'))),
          const SizedBox(width: Cp.s1),
          // Aucun suivi d'objectif séparé dans l'application : 0 réel,
          // pas un objectif inventé ni compté à partir du journal.
          const Expanded(child: _StatTile(value: '0', label: 'Objectifs atteints')),
        ]),
        const SizedBox(height: Cp.s3),
        heading(c, tr('Minuteur de prière')),
        Text(
          tr('Un temps mis à part, sans distraction : choisissez une durée, priez, le minuteur vous prévient à la fin.'),
          style: t.bodyMedium,
        ),
        const SizedBox(height: Cp.s1),
        const _PrayerTimer(),
        const SizedBox(height: Cp.s3),
        heading(c, tr('Plan de lecture : 21 jours')),
        Text(
          'Un chapitre par jour. Touchez une référence pour lire le chapitre, puis marquez le jour comme lu : votre progression est enregistrée.',
          style: t.bodyMedium,
        ),
        const SizedBox(height: Cp.s1),
        Row(children: [
          Expanded(child: Text(tr('Votre progression'), style: t.titleMedium)),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(color: Cp.gold, borderRadius: BorderRadius.circular(20)),
            child: Text('$done / 21', style: t.labelLarge?.copyWith(color: Cp.navy, fontWeight: FontWeight.w800)),
          ),
        ]),
        const SizedBox(height: Cp.s1),
        LinearProgressIndicator(
          value: done / 21,
          color: Cp.gold,
          backgroundColor: Cp.line,
          minHeight: 8,
          borderRadius: BorderRadius.circular(4),
        ),
        const SizedBox(height: Cp.s2),
        LayoutBuilder(builder: (context, constraints) {
          // Hauteur de carte fixe, 31 oct. 2026 : avec un rapport
          // fixe, les cartes étaient beaucoup trop hautes sur
          // tablette et sur ordinateur, d'où le grand vide signalé.
          // Le rapport est donc calculé depuis la largeur réelle,
          // pour viser une hauteur de 200 px sur toutes les largeurs.
          final largeur = constraints.maxWidth.isFinite ? constraints.maxWidth : 360.0;
          final cellule = (largeur - 16) / 3;
          return GridView.count(
          crossAxisCount: 3,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisSpacing: 8,
          mainAxisSpacing: 8,
          childAspectRatio: cellule / 200,
          children: [
            for (var i = 0; i < _planDays.length; i++) Builder(builder: (ctx) {
              final day = i + 1;
              final isDone = app.planDone.contains(day);
              final ref = _planDays[i];
              // Extrait du jour, 31 oct. 2026 : le premier verset du
              // chapitre, lu à l'exécution depuis la source
              // biblique de l'application, jamais recopié en dur.
              // Rien n'est affiché tant que la Bible n'est pas
              // chargée, plutôt qu'un texte approché.
              final extrait = BibleService.instance.verseText(app.lang, ref.$1, ref.$2, 1);
              return Card(
                color: isDone ? Cp.gold.withValues(alpha: 0.12) : null,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(Cp.radiusTile),
                  side: isDone ? const BorderSide(color: Cp.gold, width: 2) : const BorderSide(color: Cp.line),
                ),
                child: InkWell(
                  borderRadius: BorderRadius.circular(Cp.radiusTile),
                  onTap: () => go(ctx, BiblePage(initialBook: ref.$1, initialChapter: ref.$2)),
                  child: Padding(
                    padding: const EdgeInsets.all(8),
                    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Row(children: [
                        Text('JOUR $day', style: t.labelLarge?.copyWith(fontWeight: FontWeight.w800, color: Cp.goldDeep)),
                        const Spacer(),
                        if (isDone) const Icon(Icons.check_circle, size: 18, color: Cp.goldDeep),
                      ]),
                      const SizedBox(height: 4),
                      Text(ref.$3, style: t.bodyMedium),
                      if (extrait != null && extrait.isNotEmpty)
                        Padding(
                          padding: const EdgeInsets.only(top: 6),
                          child: Text(
                            extrait,
                            // Texte biblique en Lora, 4 nov. 2026,
                            // italique et taille du thème inchangées.
                            style: Ux.bible(size: 12, height: 1.4, color: Cp.inkMuted).copyWith(fontStyle: FontStyle.italic),
                            maxLines: 4,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      const Spacer(),
                      SizedBox(
                        width: double.infinity,
                        child: isDone
                            ? OutlinedButton(
                                onPressed: () {
                                  app.planDone.remove(day);
                                  app.changed();
                                },
                                style: OutlinedButton.styleFrom(minimumSize: const Size(0, 28), padding: const EdgeInsets.symmetric(horizontal: 4), textStyle: t.labelSmall),
                                child: Text(tr('Lu')),
                              )
                            : FilledButton(
                                onPressed: () {
                                  app.planDone.add(day);
                                  app.changed();
                                },
                                style: FilledButton.styleFrom(minimumSize: const Size(0, 28), padding: const EdgeInsets.symmetric(horizontal: 4), textStyle: t.labelSmall),
                                child: Text(tr('Marquer lu')),
                              ),
                      ),
                    ]),
                  ),
                ),
              );
            }),
          ],
        );
        }),
      ]);
    });
  }
}

class _StatTile extends StatelessWidget {
  const _StatTile({required this.value, required this.label});
  final String value;
  final String label;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(Cp.s2),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(value, style: t.titleLarge?.copyWith(color: Cp.navy)),
          const SizedBox(height: 4),
          Text(label, style: t.bodyMedium),
        ]),
      ),
    );
  }
}

class _FavStatTile extends StatefulWidget {
  const _FavStatTile({super.key});

  @override
  State<_FavStatTile> createState() => _FavStatTileState();
}

class _FavStatTileState extends State<_FavStatTile> {
  late final Future<int> _count = _load();

  Future<int> _load() async {
    await BibleService.instance.load();
    return (await BibleService.instance.favorites(app.lang)).length;
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<int>(
      future: _count,
      builder: (context, snap) => _StatTile(value: '${snap.data ?? 0}', label: tr('Versets favoris')),
    );
  }
}

class _PrayerTimer extends StatefulWidget {
  const _PrayerTimer();

  @override
  State<_PrayerTimer> createState() => _PrayerTimerState();
}

class _PrayerTimerState extends State<_PrayerTimer> {
  int _minutes = 5;
  int _left = 300;
  Timer? _timer;
  // Son de démarrage, carte 85, 7 nov. 2026 : avant, aucun son
  // n'était joué au démarrage, seule la fin sonnait, par la
  // notification et l'annonce vocale.
  final PrayerStartSound _sonDemarrage = PrayerStartSound();

  bool get _running => _timer?.isActive ?? false;

  @override
  void dispose() {
    _timer?.cancel();
    unawaited(_sonDemarrage.dispose());
    super.dispose();
  }

  /// Joue la cloche de démarrage. Si la cloche échoue, par exemple
  /// fichier absent ou voix audio indisponible, repli sur l'annonce
  /// vocale, même mécanisme que l'annonce de fin.
  Future<void> _jouerSonDemarrage() async {
    final ok = await _sonDemarrage.play();
    if (!ok && mounted) {
      unawaited(verseTts.speak(tr('Temps de prière commencé.'), app.lang));
    }
  }

  void _start() {
    if (_left <= 0) _left = _minutes * 60;
    _timer?.cancel();
    // Son au démarrage, carte 85 : le toucher du bouton Commencer
    // est le geste de l'utilisateur, le navigateur ne bloque donc
    // pas la lecture, sur le web comme sur Android.
    unawaited(_jouerSonDemarrage());
    // Sonnerie programmée à la fin, comme sur les applications de
    // téléphone, en plus du message et de l'annonce vocale à la fin.
    unawaited(DailyVerseNotifications.instance.schedulePrayerTimerEnd(app.lang, Duration(seconds: _left)));
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (!mounted) return;
      setState(() => _left--);
      if (_left <= 0) {
        t.cancel();
        toast(context, tr('Temps de prière terminé.'));
        // Message audio de félicitations à la fin, 28 oct. 2026 :
        // le minuteur atteint, c'est l'objectif choisi qui est atteint.
        // Annonce vocale, audible même si la notification est en
        // silencieux, tant que l'application est ouverte.
        unawaited(verseTts.speak('${tr('Temps de prière terminé.')} ${tr('Félicitations, votre objectif a été atteint.')}', app.lang));
      }
    });
    setState(() {});
  }

  void _pause() {
    _timer?.cancel();
    unawaited(_sonDemarrage.stop());
    unawaited(DailyVerseNotifications.instance.cancelPrayerTimerEnd());
    setState(() {});
  }

  void _reset() {
    _timer?.cancel();
    unawaited(_sonDemarrage.stop());
    unawaited(DailyVerseNotifications.instance.cancelPrayerTimerEnd());
    setState(() => _left = _minutes * 60);
  }

  @override
  Widget build(BuildContext context) {
    final mm = (_left ~/ 60).toString().padLeft(2, '0');
    final ss = (_left % 60).toString().padLeft(2, '0');
    return Column(children: [
      const SizedBox(height: Cp.s1),
      Center(child: Text('$mm:$ss', style: const TextStyle(fontSize: 64, fontWeight: FontWeight.w700, color: Cp.navy))),
      const SizedBox(height: Cp.s1),
      Wrap(alignment: WrapAlignment.center, spacing: Cp.s1, children: [
        for (final m in const [1, 5, 10, 15])
          ChoiceChip(
            label: Text('$m min'),
            selected: _minutes == m,
            selectedColor: Cp.gold,
            backgroundColor: Cp.card,
            onSelected: _running
                ? null
                : (_) => setState(() {
                      _minutes = m;
                      _left = m * 60;
                    }),
          ),
      ]),
      const SizedBox(height: Cp.s2),
      Row(children: [
        Expanded(
          child: SizedBox(
            height: 56,
            child: FilledButton(onPressed: _running ? _pause : _start, child: Text(_running ? tr('Pause') : tr('Commencer'))),
          ),
        ),
        const SizedBox(width: Cp.s1),
        SizedBox(height: 56, child: OutlinedButton(onPressed: _reset, child: Text(tr('Remettre à zéro')))),
      ]),
    ]);
  }
}

// 13. ESPACE STRUCTURE (administrateur général — démo locale)
// ═══════════════════════════════════════════════════════════════════
Future<T?> pick<T>(BuildContext c, String title, List<T> items, String Function(T) label) {
  return showModalBottomSheet<T>(
    context: c,
    isScrollControlled: true,
    backgroundColor: Cp.paper,
    shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(Cp.radiusCard))),
    builder: (ctx) => SafeArea(
      child: ConstrainedBox(
        constraints: BoxConstraints(maxHeight: MediaQuery.of(ctx).size.height * 0.85),
        child: ListView(shrinkWrap: true, padding: const EdgeInsets.all(Cp.s2), children: [
          Text(title, style: Theme.of(ctx).textTheme.titleLarge),
          const SizedBox(height: Cp.s1),
          for (final it in items)
            ListTile(title: Text(label(it), style: Theme.of(ctx).textTheme.labelLarge), onTap: () => Navigator.pop(ctx, it)),
        ]),
      ),
    ),
  );
}

int? _price(BuildContext c, String raw) {
  final v = int.tryParse(raw.replaceAll(RegExp(r'[^0-9]'), ''));
  if (v == null || v <= 0) {
    toast(c, tr('Le prix doit être un nombre entier en FCFA.'));
    return null;
  }
  return v;
}

/// Publication d'une musique ou d'un enseignement depuis l'espace
/// structure. L'ajout est d'abord mis en local, pour ne jamais le
/// perdre, puis, si l'application est connectée au serveur, une
/// publication serveur est tentée via POST /admin/enseignements
/// (titre, orateur, jeton existant). Le serveur exige un compte
/// administrateur et un audio_id, pas un simple lien : un refus est
/// donc expliqué en ce sens, l'ajout local est conservé, et le lien
/// audio n'est pas transféré au serveur. En cas de succès serveur,
/// les membres connectés avec internet voient l'enseignement via
/// fetchEnseignements, déjà récupéré à la synchronisation.
/// Formulaire d'un enseignement ou d'une musique, 28 oct. 2026 :
/// comme bookFormSheet, mais pour l'audio. Avant, le formulaire
/// n'offrait qu'un champ texte « Lien audio », jamais un vrai
/// import, et le serveur ignorait ce lien : un enseignement
/// publié n'avait donc aucun audio pour les autres membres.
/// Désormais, le fichier audio importé est téléversé à la
/// publication, puis son identifiant est enregistré côté serveur
/// en audio_id, et l'enseignement s'écoute pour tous.
Future<void> audioFormSheet(BuildContext c, String title, List<F> fields, String cta,
    void Function(Map<String, String>, String imagePath, String? audioPath, List<int>? audioBytes, String? audioName) onSubmit, {bool programmer = false, DateTime? initialProgrammeeLe}) {
  final ctrls = {for (final f in fields) f.key: TextEditingController(text: f.initial)};
  final selected = <String, String?>{for (final f in fields) if (f.options.isNotEmpty) f.key: (f.options.contains(f.initial) ? f.initial : null)};
  var imagePath = '';
  Uint8List? imageBytes;
  DateTime? programmeeLe = initialProgrammeeLe;
  String? audioPath;
  List<int>? audioBytes;
  var audioName = '';
  var audioPicking = false;
  var audioPickError = '';
  return showModalBottomSheet(
    context: c,
    isScrollControlled: true,
    backgroundColor: Cp.paper,
    shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(Cp.radiusCard))),
    builder: (ctx) {
      String? err;
      return StatefulBuilder(builder: (ctx, setS) {
        return Padding(
          padding: EdgeInsets.fromLTRB(Cp.s2, Cp.s2, Cp.s2, MediaQuery.of(ctx).viewInsets.bottom + Cp.s2),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: Theme.of(ctx).textTheme.titleLarge),
                const SizedBox(height: Cp.s2),
                for (final f in fields) ...[
                  if (f.options.isNotEmpty)
                    DropdownButtonFormField<String>(
                      value: selected[f.key],
                      hint: Text(f.optional ? '${f.label} (facultatif)' : f.label),
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: Cp.card,
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
                      ),
                      items: [for (final o in f.options) DropdownMenuItem(value: o, child: Text(o))],
                      onChanged: (v) => setS(() => selected[f.key] = v),
                    )
                  else
                    TextField(
                      controller: ctrls[f.key],
                      maxLines: f.lines,
                      keyboardType: f.number ? TextInputType.number : (f.lines > 1 ? TextInputType.multiline : TextInputType.text),
                      decoration: InputDecoration(
                        labelText: f.optional ? '${f.label} (facultatif)' : f.label,
                        filled: true,
                        fillColor: Cp.card,
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
                      ),
                    ),
                  const SizedBox(height: Cp.s1),
                ],
                Row(children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: audioPicking ? null : () async {
                        setS(() {
                          audioPicking = true;
                          audioPickError = '';
                        });
                        try {
                          final picked = await FilePicker.platform.pickFiles(
                            type: FileType.custom,
                            allowedExtensions: ['mp3', 'm4a', 'aac', 'ogg', 'wav'],
                            withData: true,
                          );
                          if (picked == null || picked.files.isEmpty) {
                            setS(() => audioPickError = 'Aucun fichier retenu. Choisissez un fichier audio déjà téléchargé sur cet appareil, pas une archive ZIP.');
                          } else if (picked.files.single.bytes == null) {
                            setS(() => audioPickError = 'Ce fichier n’a pas pu être lu. Réessayez avec un autre fichier audio.');
                          } else {
                            setS(() {
                              // Sur le web, `path` n'existe pas : seuls les octets servent,
                              // le téléversement passe alors par les octets (uploadAudio).
                              audioPath = kIsWeb ? null : picked.files.single.path;
                              audioBytes = picked.files.single.bytes;
                              audioName = picked.files.single.name;
                            });
                          }
                        } catch (e) {
                          setS(() => audioPickError = 'Impossible de lire ce fichier. Réessayez.');
                        } finally {
                          setS(() => audioPicking = false);
                        }
                      },
                      icon: const Icon(Icons.upload_file_outlined),
                      label: Text(audioPicking ? 'Chargement du fichier…' : (audioName.isEmpty ? tr('Importer le fichier audio (MP3, M4A, WAV…)') : audioName)),
                    ),
                  ),
                  if (audioName.isNotEmpty) ...[
                    const SizedBox(width: Cp.s1),
                    IconButton(
                      tooltip: tr('Retirer le fichier'),
                      icon: const Icon(Icons.delete_outline),
                      onPressed: () => setS(() {
                        audioPath = null;
                        audioBytes = null;
                        audioName = '';
                      }),
                    ),
                  ],
                ]),
                const SizedBox(height: Cp.s1),
                Text(tr('Fichier audio, 100 Mo max côté serveur. Un lien audio saisi ici est désormais gardé par le serveur et écoutable pour tous les membres, sans import de fichier.'), style: Theme.of(ctx).textTheme.bodyMedium),
                if (audioPicking) ...[
                  const SizedBox(height: Cp.s1),
                  Row(children: [
                    const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2)),
                    const SizedBox(width: Cp.s1),
                    const Expanded(child: Text('Chargement du fichier, ne fermez pas le formulaire…')),
                  ]),
                ],
                if (audioName.isNotEmpty && audioBytes != null) Text('Fichier retenu : $audioName (${(audioBytes!.length / 1048576).toStringAsFixed(1)} Mo).', style: const TextStyle(color: Cp.goldDeep, fontWeight: FontWeight.w700)),
                if (audioPickError.isNotEmpty) Text(audioPickError, style: const TextStyle(color: Cp.danger)),
                if (programmer) ...[
                  const SizedBox(height: Cp.s1),
                  SchedulePickerRow(initial: initialProgrammeeLe, onChanged: (v) => programmeeLe = v),
                ],
                const SizedBox(height: Cp.s1),
                if (imagePath.isNotEmpty) ...[
                  contentImage(imagePath, '', bytes: imageBytes),
                  const SizedBox(height: Cp.s1),
                ],
                Row(children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () async {
                        if (!await demanderPhotosAuMoment(ctx)) return;
                        final picked = await ImagePicker().pickImage(source: ImageSource.gallery);
                        if (picked != null) {
                          final bytes = await picked.readAsBytes();
                          setS(() {
                            imagePath = picked.path;
                            imageBytes = bytes;
                          });
                        }
                      },
                      icon: const Icon(Icons.image_outlined),
                      label: Text(imagePath.isEmpty ? tr('Choisir une image') : tr('Changer l’image')),
                    ),
                  ),
                  if (imagePath.isNotEmpty) ...[
                    const SizedBox(width: Cp.s1),
                    IconButton(
                      tooltip: tr('Retirer l’image'),
                      icon: const Icon(Icons.delete_outline),
                      onPressed: () => setS(() => imagePath = ''),
                    ),
                  ],
                ]),
                const SizedBox(height: Cp.s1),
                Text(tr('Image facultative, JPEG, PNG ou WebP, 5 Mo max côté serveur. Sans serveur, elle reste visible sur cet appareil seulement.'), style: Theme.of(ctx).textTheme.bodyMedium),
                if (err != null) Text(err!, style: const TextStyle(color: Cp.danger)),
                const SizedBox(height: Cp.s1),
                SizedBox(
                  width: double.infinity,
                  height: 52,
                  child: FilledButton(
                    onPressed: () {
                      final values = {for (final f in fields) f.key: f.options.isNotEmpty ? (selected[f.key] ?? '') : ctrls[f.key]!.text.trim()};
                      final missing = fields.where((f) => !f.optional && values[f.key]!.isEmpty);
                      if (missing.isNotEmpty) {
                        setS(() => err = 'Renseignez : ${missing.first.label}.');
                        return;
                      }
                      if (programmer) values['programmee_le'] = programmeeLe == null ? '' : programmeeLe!.toIso8601String();
                      onSubmit(values, imagePath, audioPath, audioBytes, audioName.isEmpty ? null : audioName);
                      Navigator.pop(ctx);
                    },
                    child: Text(cta),
                  ),
                ),
              ],
            ),
          ),
        );
      });
    },
  );
}

Future<bool> _confirmRetirer(BuildContext c, String titre, String message) async {
  final ok = await showDialog<bool>(
    context: c,
    builder: (ctx) => AlertDialog(
      title: Text(titre),
      content: Text(message),
      actions: [
        TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
        FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Retirer'))),
      ],
    ),
  );
  return ok == true;
}

Future<void> _unpublishBook(BuildContext c, Book book) async {
  if (book.serverId.isNotEmpty && api.isConnected) {
    try {
      await api.updateLivre(book.serverId, publie: false);
    } catch (e) {
      toast(c, 'Retrait refusé ($e). Rôle administrateur général requis.');
      return;
    }
  }
  app.books.remove(book);
  app.cart.remove(book);
  app.changed();
  toast(c, tr('Livre retiré du catalogue. Les achats déjà payés ne changent pas.'));
}

Future<void> _unpublishCamp(BuildContext c, Camp camp) async {
  if (camp.serverId.isNotEmpty && api.isConnected) {
    try {
      await api.updateEvenement(camp.serverId, publie: false);
    } catch (e) {
      toast(c, 'Retrait refusé ($e). Rôle administrateur général requis.');
      return;
    }
  }
  app.camps.remove(camp);
  app.changed();
  toast(c, tr('Camp retiré du catalogue. Les inscriptions déjà faites ne sont pas annulées côté serveur.'));
}

Future<void> _updateTeachingServer(BuildContext c, Teaching teaching, {String? audioPath, List<int>? audioBytes, String? audioName}) async {
  if (audioPath != null || audioBytes != null) {
    try {
      teaching.audioId = await api.uploadAudio(path: audioPath, bytes: audioBytes, filename: audioName);
      teaching.url = '$kApiBaseUrl/fichiers/${teaching.audioId}';
    } catch (e) {
      toast(c, 'Fichier audio non téléversé ($e). La modification est publiée sans nouveau fichier.');
      return;
    }
  }
  if (!api.isConnected || teaching.serverId.isEmpty) {
    toast(c, tr('Modification enregistrée en local sur cet appareil seulement.'));
    return;
  }
  try {
    await api.updateEnseignement(
      teaching.serverId,
      titre: teaching.title,
      orateur: teaching.speaker,
      audioId: teaching.audioId.isEmpty ? null : teaching.audioId,
      lienAudio: teaching.audioId.isEmpty ? (teaching.url.isEmpty ? null : teaching.url) : null,
      description: teaching.description,
      thematique: teaching.thematique,
      format: teaching.format,
      duree: teaching.duree,
      dateTexte: teaching.dateTexte,
    );
    toast(c, tr('Modification publiée sur le serveur : visible pour les membres connectés avec internet.'));
  } catch (e) {
    toast(c, 'Modification conservée en local sur cet appareil seulement. Publication serveur refusée ($e). La route /admin/enseignements est réservée au compte administrateur général.');
  }
}

Future<void> _publishTeaching(BuildContext c, Teaching teaching, {String? audioPath, List<int>? audioBytes, String? audioName}) async {
  if (!api.isConnected) {
    toast(c, tr('Ajouté en local sur cet appareil. Connectez-vous au serveur pour le publier pour tous les membres.'));
    return;
  }
  if (teaching.audioId.isEmpty && (audioPath != null || audioBytes != null)) {
    try {
      teaching.audioId = await api.uploadAudio(path: audioPath, bytes: audioBytes, filename: audioName);
    } catch (e) {
      toast(c, 'Fichier audio non téléversé ($e). L’enseignement n’a pas été publié, réessayez l’import puis Publier.');
      return;
    }
  }
  try {
    final created = await api.createEnseignement(titre: teaching.title, orateur: teaching.speaker, audioId: teaching.audioId.isEmpty ? null : teaching.audioId, lienAudio: teaching.audioId.isEmpty ? (teaching.url.isEmpty ? null : teaching.url) : null, description: teaching.description.isEmpty ? null : teaching.description, thematique: teaching.thematique.isEmpty ? null : teaching.thematique, format: teaching.format.isEmpty ? null : teaching.format, duree: teaching.duree.isEmpty ? null : teaching.duree, dateTexte: teaching.dateTexte.isEmpty ? null : teaching.dateTexte);
    if ((created['id'] ?? '').toString().isNotEmpty) teaching.serverId = (created['id'] ?? '').toString();
    if (teaching.audioId.isNotEmpty) {
      teaching.url = '$kApiBaseUrl/fichiers/${teaching.audioId}';
      app.changed();
      toast(c, tr('Publié sur le serveur, avec son audio : écoutable pour les membres connectés avec internet.'));
    } else if (teaching.url.isNotEmpty) {
      toast(c, tr('Publié sur le serveur, avec son lien audio, écoutable pour les membres connectés avec internet.'));
    } else {
      toast(c, tr('Publié sur le serveur, sans audio. Importez le fichier audio pour qu’il soit écoutable.'));
    }
  } catch (e) {
    toast(c, 'Serveur refusé ($e). Rôle administrateur général requis. Ajout conservé en local sur cet appareil.');
  }
}


/// Publication d'une annonce audio, 29 oct. 2026 : comme pour les
/// enseignements, le fichier audio est téléversé d'abord, puis
/// l'annonce est créée côté serveur. Différences voulues : la
/// publication exige la connexion (pas d'ajout local fantôme, que
/// la synchronisation suivante effacerait), et l'annonce ne passe
/// jamais par la liste des enseignements.
Future<void> _publishAnnonce(BuildContext c, Map<String, String> v, {String? audioPath, List<int>? audioBytes, String? audioName}) async {
  final titre = (v['title'] ?? '').trim();
  final lien = (v['url'] ?? '').trim();
  if (titre.isEmpty) {
    toast(c, tr('Le titre est requis.'));
    return;
  }
  if (!api.isConnected) {
    toast(c, tr('Connectez-vous au serveur pour publier une annonce pour tous les membres.'));
    return;
  }
  var audioId = '';
  if (audioPath != null || audioBytes != null) {
    try {
      audioId = await api.uploadAudio(path: audioPath, bytes: audioBytes, filename: audioName);
    } catch (e) {
      toast(c, 'Fichier audio non téléversé ($e). L’annonce n’a pas été publiée.');
      return;
    }
  }
  if (audioId.isEmpty && lien.isEmpty) {
    toast(c, tr('Ajoutez un fichier audio ou un lien audio.'));
    return;
  }
  try {
    final prog = (v['programmee_le'] ?? '').isEmpty ? null : DateTime.tryParse(v['programmee_le']!);
    final created = await api.createAnnonceAudio(
      titre: titre,
      texte: (v['texte'] ?? '').trim().isEmpty ? null : (v['texte'] ?? '').trim(),
      audioId: audioId.isEmpty ? null : audioId,
      lienAudio: audioId.isEmpty ? (lien.isEmpty ? null : lien) : null,
      programmeeLe: prog,
    );
    final id = (created['id'] ?? '').toString();
    final annonce = AnnonceAudio(titre, (v['texte'] ?? '').trim(), audioId.isNotEmpty ? '$kApiBaseUrl/fichiers/$audioId' : lien, serverId: id, programmeeLe: prog);
    app.annoncesAudioAdmin.insert(0, annonce);
    if (prog == null || !prog.isAfter(DateTime.now())) app.annoncesAudio.insert(0, annonce);
    app.changed();
    if (prog != null && prog.isAfter(DateTime.now())) {
      toast(c, '${tr('Annonce programmée pour le')} ${formatDateHeure(prog)}');
    } else {
      toast(c, tr('Annonce publiée, visible sur l’accueil des membres.'));
    }
  } catch (e) {
    toast(c, 'Serveur refusé ($e). Rôle administrateur général requis.');
  }
}


/// Publication d'une carte vidéo depuis l'espace structure :
/// titre et lien requis, explication facultative. La carte
/// apparaît aussitôt sur l'accueil des membres, sur téléphone
/// seulement, sans nouvelle version de l'application.
Future<void> _publishCarteVideo(BuildContext c, Map<String, String> v, {bool parLien = false}) async {
  final titre = (v['title'] ?? '').trim();
  final lien = (v['url'] ?? '').trim();
  if (titre.isEmpty) {
    toast(c, tr('Le titre est requis.'));
    return;
  }
  if (lien.isEmpty) {
    toast(c, tr('Ajoutez un lien vidéo.'));
    return;
  }
  if (!api.isConnected) {
    toast(c, tr('Connectez-vous au serveur pour publier une carte pour tous les membres.'));
    return;
  }
  try {
    final created = await api.createCarteVideo(
      titre: titre,
      explication: (v['texte'] ?? '').trim().isEmpty ? null : (v['texte'] ?? '').trim(),
      lienVideo: lien,
    );
    final id = (created['id'] ?? '').toString();
    final carte = CarteVideo(titre, (v['texte'] ?? '').trim(), lien, serverId: id);
    app.cartesVideoAdmin.insert(0, carte);
    app.cartesVideo.insert(0, carte);
    app.changed();
    toast(c, parLien ? tr('Annonce par lien publiée, visible sur l’accueil des membres.') : tr('Carte vidéo publiée, visible sur l’accueil des membres.'));
  } catch (e) {
    toast(c, 'Serveur refusé ($e). Rôle administrateur général requis.');
  }
}

/// Publication d'un livre depuis l'espace structure, comme pour les
/// enseignements, mais avec un point décisif en plus : avant ce
/// correctif, Ajouter un livre ne faisait que app.books.add, donc
/// local seulement, et les autres appareils, frais et connectés,
/// restaient avec un catalogue vide, puisque le serveur /livres
/// renvoie []. Le livre est d'abord ajouté en local, pour ne jamais
/// le perdre, puis une publication serveur est tentée via
/// POST /admin/livres si l'application est connectée. En cas de
/// succès, l'identifiant serveur renvoyé est enregistré dans
/// Book.serverId, pour que la synchronisation suivante retrouve ce
/// livre et que les autres appareils le voient, sans doublon local.
/// En cas de refus, le plus souvent 403, la cause est expliquée en
/// clair : POST /admin/livres est réservé au rôle admin_general,
/// un compte membre ne peut pas publier pour tous. Le livre est
/// alors conservé en local seulement, et il ne sera visible par les
/// autres membres que si la structure se connecte avec un compte
/// administrateur général, créé côté serveur par
/// node server.js create-admin, sans identifiant inventé ici et sans
/// le demander en chat. Le lien du fichier saisi dans l'application
/// n'est pas transféré au serveur, qui attend un fichier_id
/// téléversé, pas un simple lien.
Future<void> _publishBook(BuildContext c, Book book, {String? livrePath, List<int>? livreBytes, String? livreName}) async {
  if (!api.isConnected) {
    toast(c, tr('Livre ajouté en local sur cet appareil seulement. Connectez-vous au serveur avec un compte administrateur général pour le publier pour tous les membres.'));
    return;
  }
  if (book.imageUrl.isEmpty) book.imageUrl = await uploadContentImage(c, book.imagePath);
  // Fichier du livre importé, 28 oct. 2026 : téléversé avant la
  // création, pour que le serveur garde son identifiant.
  if (book.fichierId.isEmpty && (livrePath != null || livreBytes != null)) {
    try {
      book.fichierId = await api.uploadLivre(path: livrePath, bytes: livreBytes, filename: livreName);
    } catch (e) {
      toast(c, 'Fichier du livre non téléversé ($e). Le livre est publié sans fichier, il ne s’ouvrira pas après paiement tant qu’un fichier n’est pas importé.');
    }
  }
  try {
    final created = await api.createLivre(
      titre: book.title,
      auteur: book.author,
      prixFcfa: book.price,
      description: book.description,
      format: book.format,
      couvertureId: fileIdFromUrl(book.imageUrl),
      fichierId: book.fichierId.isEmpty ? null : book.fichierId,
    );
    final id = (created['id'] ?? '').toString();
    if (id.isNotEmpty) book.serverId = id;
    app.changed();
    toast(c, tr('Livre publié sur le serveur : visible dans le catalogue des membres connectés avec internet.'));
  } catch (e) {
    toast(c, 'Livre conservé en local sur cet appareil seulement. Publication serveur refusée ($e). La route /admin/livres est réservée au compte administrateur général, créé côté serveur par node server.js create-admin. Connectez-vous avec ce compte pour que le livre soit visible par tous les membres.');
  }
}

/// Publication d'un camp depuis l'espace structure, 27 oct. 2026 :
/// avant ce correctif, Ajouter un camp ne faisait que app.camps.add,
/// donc local seulement, et les autres appareils ne recevaient rien,
/// puis la synchronisation suivante pouvait même effacer ce camp
/// local si le serveur renvoyait une liste non vide. Le camp est
/// d'abord ajouté en local, pour ne jamais le perdre, puis une
/// publication serveur est tentée via POST /admin/evenements si
/// l'application est connectée. En cas de succès, l'identifiant
/// serveur est enregistré dans Camp.serverId. En cas de refus,
/// le plus souvent 403 pour un compte non administrateur général,
/// le camp reste local seulement, avec un message clair.
Future<void> _publishCamp(BuildContext c, Camp camp) async {
  if (!api.isConnected) {
    toast(c, tr('Camp ajouté en local sur cet appareil seulement. Connectez-vous au serveur avec un compte administrateur général pour le publier pour tous les membres.'));
    return;
  }
  if (camp.imageUrl.isEmpty) camp.imageUrl = await uploadContentImage(c, camp.imagePath);
  try {
    final tarif = int.tryParse(camp.tariff.replaceAll(RegExp(r'[^0-9]'), ''));
    // Dates structurées, 31 oct. 2026 : la plage choisie avec le
    // sélecteur part en AAAA-MM-JJ, sinon seules les dates texte.
    final created = await api.createEvenement(
      nom: camp.name,
      lieu: camp.place.isEmpty ? null : camp.place,
      // Carte 109, 8 nov. 2026 : pays où se tient l'activité.
      pays: camp.pays.isEmpty ? null : camp.pays,
      tarifFcfa: tarif,
      estKairos: camp.kairos,
      imageId: fileIdFromUrl(camp.imageUrl),
      datesTexte: camp.dates.isEmpty ? null : camp.dates,
      dateDebut: camp.dateDebut == null ? null : formatDateIso(camp.dateDebut!),
      dateFin: camp.dateFin == null ? null : formatDateIso(camp.dateFin!),
      description: camp.description.isEmpty ? null : camp.description,
    );
    final id = (created['id'] ?? '').toString();
    if (id.isNotEmpty) camp.serverId = id;
    app.changed();
    toast(c, tr('Camp publié sur le serveur : visible dans les camps des membres connectés avec internet.'));
  } catch (e) {
    toast(c, 'Camp conservé en local sur cet appareil seulement. Publication serveur refusée ($e). La route /admin/evenements est réservée au compte administrateur général.');
  }
}

/// Modification d'un camp déjà publié, 28 oct. 2026 : avant, il n'y
/// avait que « Ajouter un camp », aucun moyen de modifier un camp
/// en cours, alors que le serveur accepte déjà PUT
/// /admin/evenements/:id. Comme pour les livres, la modification
/// ne change ni les inscriptions déjà faites ni leurs pass, qui
/// sont liés par l'identifiant du camp, pas par son nom.
/// Modification serveur d'un camp, 31 oct. 2026 : la plage n'est
/// transmise que si elle vient d'être choisie avec le sélecteur.
/// Si la structure a seulement retouché le texte, les dates
/// structurées existantes restent inchangées côté serveur, omises
/// de la requête partielle, sans rien deviner depuis le texte.
Future<void> _updateCampServer(BuildContext c, Camp camp, {DateTimeRange? plage, String? paysAvant}) async {
  if (!api.isConnected || camp.serverId.isEmpty) {
    toast(c, tr('Modification enregistrée en local sur cet appareil seulement.'));
    return;
  }
  if (camp.imageUrl.isEmpty) camp.imageUrl = await uploadContentImage(c, camp.imagePath);
  try {
    final tarif = int.tryParse(camp.tariff.replaceAll(RegExp(r'[^0-9]'), ''));
    await api.updateEvenement(
      camp.serverId,
      nom: camp.name,
      lieu: camp.place.isEmpty ? null : camp.place,
      // Carte 109, 8 nov. 2026 : pays où se tient l'activité.
      // Le pays est effacé côté serveur seulement si « Aucun
      // pays » a remplacé un pays déjà enregistré.
      pays: camp.pays.isEmpty ? null : camp.pays,
      effacerPays: paysAvant != null && paysAvant.isNotEmpty && camp.pays.isEmpty,
      tarifFcfa: tarif,
      estKairos: camp.kairos,
      imageId: fileIdFromUrl(camp.imageUrl),
      datesTexte: camp.dates,
      dateDebut: plage == null ? null : formatDateIso(plage.start),
      dateFin: plage == null ? null : formatDateIso(plage.end),
      description: camp.description,
    );
    toast(c, tr('Modification publiée sur le serveur : visible pour les membres connectés avec internet.'));
  } catch (e) {
    // La mention du role ne s'affiche que pour un vrai refus
    // d'acces (403). Pour une donnee rejetee, elle induisait
    // en erreur : le role n'etait pas la cause.
    final roleHint = e.toString().contains('(403)') ? ' La route /admin/evenements est réservée au compte administrateur général.' : '';
    toast(c, 'Modification conservée en local sur cet appareil seulement. Publication serveur refusée ($e).$roleHint');
  }
}

/// Publication d'une actualité depuis l'espace structure, 27 oct. 2026 :
/// avant ce correctif, Ajouter une actualité ne faisait que
/// app.news.insert, donc local seulement, et les autres appareils
/// ne recevaient rien. L'actualité est d'abord ajoutée en local,
/// puis une publication serveur est tentée via POST /admin/actualites
/// si l'application est connectée, avec l'identifiant serveur de
/// l'établissement quand il existe, sinon générale. En cas de refus,
/// l'actualité reste locale seulement, avec un message clair.
Future<void> _publishNews(BuildContext c, NewsItem news) async {
  if (!api.isConnected) {
    toast(c, tr('Actualité ajoutée en local sur cet appareil seulement. Connectez-vous au serveur avec un compte administrateur pour la publier pour tous les membres.'));
    return;
  }
  if (news.imageUrl.isEmpty) news.imageUrl = await uploadContentImage(c, news.imagePath);
  try {
    await api.createActualite(
      titre: news.title,
      texte: news.text,
      etablissementId: news.etablissementId.isEmpty ? null : news.etablissementId,
      imageId: fileIdFromUrl(news.imageUrl),
      programmeeLe: news.programmeeLe,
    );
    if (news.programmeeLe != null && news.programmeeLe!.isAfter(DateTime.now())) {
      toast(c, '${tr('Actualité programmée pour le')} ${formatDateHeure(news.programmeeLe!)}');
    } else {
      toast(c, tr('Actualité publiée sur le serveur : visible dans les actualités des membres connectés avec internet.'));
    }
  } catch (e) {
    toast(c, 'Actualité conservée en local sur cet appareil seulement. Publication serveur refusée ($e). La route /admin/actualites est réservée aux comptes administrateurs.');
  }
}

/// Modification d'une actualité déjà publiée côté serveur, PUT
/// /admin/actualites/:id. La modification locale est appliquée d'abord,
/// puis la publication est tentée si l'actualité a un identifiant serveur
/// et si l'application est connectée. Un refus serveur laisse la
/// modification locale seulement, avec un message clair.
Future<void> _updateNewsServer(BuildContext c, NewsItem news, {bool annulerProgrammation = false}) async {
  if (!api.isConnected || news.serverId.isEmpty) {
    toast(c, tr('Modification enregistrée en local sur cet appareil seulement.'));
    return;
  }
  try {
    if (news.imageUrl.isEmpty && news.imagePath.isNotEmpty) news.imageUrl = await uploadContentImage(c, news.imagePath);
    await api.updateActualite(news.serverId, titre: news.title, texte: news.text, imageId: fileIdFromUrl(news.imageUrl), programmeeLe: news.programmeeLe, annulerProgrammation: annulerProgrammation);
    toast(c, tr('Actualité modifiée sur le serveur.'));
  } catch (e) {
    toast(c, 'Modification conservée en local sur cet appareil seulement. Publication serveur refusée ($e). La route /admin/actualites est réservée au compte administrateur général.');
  }
}

/// Modification d'un livre déjà publié côté serveur, PUT
/// /admin/livres/:id. La modification locale est appliquée d'abord,
/// pour ne jamais la perdre, puis la publication est tentée si le
/// livre a un identifiant serveur et si l'application est connectée.
/// Un refus serveur, le plus souvent 403 pour un compte membre,
/// laisse la modification locale seulement, avec un message clair,
/// et ne change ni les achats déjà payés ni leurs factures.
Future<void> _updateBookServer(BuildContext c, Book book, {String? livrePath, List<int>? livreBytes, String? livreName}) async {
  if (!api.isConnected || book.serverId.isEmpty) {
    toast(c, tr('Modification enregistrée en local sur cet appareil seulement.'));
    return;
  }
  if (book.imageUrl.isEmpty) book.imageUrl = await uploadContentImage(c, book.imagePath);
  if (livrePath != null || livreBytes != null) {
    try {
      book.fichierId = await api.uploadLivre(path: livrePath, bytes: livreBytes, filename: livreName);
    } catch (e) {
      toast(c, 'Fichier du livre non téléversé ($e). La modification est publiée sans nouveau fichier.');
    }
  }
  try {
    await api.updateLivre(
      book.serverId,
      titre: book.title,
      auteur: book.author,
      prixFcfa: book.price,
      description: book.description,
      format: book.format,
      couvertureId: fileIdFromUrl(book.imageUrl),
      fichierId: book.fichierId.isEmpty ? null : book.fichierId,
    );
    toast(c, tr('Modification publiée sur le serveur : visible pour les membres connectés avec internet.'));
  } catch (e) {
    toast(c, 'Modification conservée en local sur cet appareil seulement. Publication serveur refusée ($e). La route /admin/livres est réservée au compte administrateur général.');
  }
}

/// Publication d'un établissement depuis l'espace structure, 27 oct. 2026 :
/// avant, Ajouter un établissement ne faisait que app.etabs.add, donc
/// local seulement, sans image, et sans identifiant serveur. L'établissement
/// est d'abord ajouté en local, puis publié via POST /admin/etablissements
/// si l'application est connectée, avec son image téléversée si présente.
/// En cas de refus, il reste local seulement, avec un message clair.
Future<void> _publishEtab(BuildContext c, Etab etab) async {
  if (!api.isConnected) {
    toast(c, tr('Établissement ajouté en local sur cet appareil seulement. Connectez-vous au serveur avec un compte administrateur général pour le publier pour tous les membres.'));
    return;
  }
  if (etab.imageUrl.isEmpty) etab.imageUrl = await uploadContentImage(c, etab.imagePath);
  try {
    final created = await api.createEtablissement(nom: etab.name, imageId: fileIdFromUrl(etab.imageUrl));
    final id = (created['id'] ?? '').toString();
    if (id.isNotEmpty) {
      // L'identifiant serveur sert ensuite aux actualités et aux activités.
      final idx = app.etabs.indexOf(etab);
      if (idx >= 0) app.etabs[idx] = Etab(etab.name, id: id, imagePath: etab.imagePath, imageUrl: etab.imageUrl)..activities.addAll(etab.activities);
      app.changed();
    }
    toast(c, tr('Établissement publié sur le serveur : visible pour les membres connectés avec internet.'));
  } catch (e) {
    toast(c, 'Établissement conservé en local sur cet appareil seulement. Publication serveur refusée ($e). La route /admin/etablissements est réservée au compte administrateur général.');
  }
}




// Scanner une carte de membre, 28 oct. 2026 : le QR code de la
// carte porte déjà le matricule, il n'y a donc rien à changer sur
// la carte et aucune carte à refaire. En scannant ce matricule,
// l'administrateur retrouve tous les achats en ligne de ce membre,
// dons, achats de livres, carte et cotisations, avec leur statut, et
// il valide un paiement en attente en choisissant le moyen réellement
// utilisé, ou il enregistre un règlement en espèces de la cotisation
// du mois quand il n'y a pas de demande en attente. Le refus reste
// réservé à l'administrateur général. Réservé aux administrateurs,
// avec périmètre serveur : l'administrateur général voit tout,
// l'administrateur d'établissement ne voit et ne marque que ses membres.
// Si la caméra est indisponible, sur le web par exemple, le
// matricule se saisit à la main, avec le même résultat.

// Libellé du moyen enregistré sur un paiement, 29 oct. 2026 : vide
// Affichage historique seulement, tranche carte, 4 nov. 2026 : un
// paiement Orange Money déjà enregistré reste lisible, aucun
// nouveau paiement ne peut être créé ni validé par ce moyen.
// quand aucun moyen n'a été enregistré, par exemple pour un paiement
// validé avant ce correctif ou confirmé automatiquement.
String suffixMoyen(String m) {
  switch (m) {
    case 'especes':
      return ' · ${tr('Espèces')}';
    case 'wave':
      return ' · Wave';
    case 'orange_money':
      return ' · Orange Money';
    case 'paypal':
      return ' · PayPal';
    default:
      return '';
  }
}

String dateHeure(String? iso) {
  if (iso == null || iso.isEmpty) return '';
  final d = DateTime.tryParse(iso);
  if (d == null) return '';
  return '${dateFr(d)} ${d.hour.toString().padLeft(2, '0')}:${d.minute.toString().padLeft(2, '0')}';
}

// Historique des transactions, 30 oct. 2026 : libellés, icônes et
// couleurs partagés par l'historique membre et l'historique admin.
// Montant signé : sortie pour le membre, encaissement pour
// l'administration. Aucun frais inventé, seuls les champs déjà
// enregistrés côté serveur s'affichent.
// Versement du camp, 31 oct. 2026 : libellé d'une demande membre,
// avec le nom du camp et le numéro du versement quand ils sont
// connus, sinon le libellé générique.
String campRequestLabel(PayRequest r) {
  if (r.donRole == 'recu') {
    var label = tr('Don de camp reçu');
    if (r.campName.isNotEmpty) label = '$label, ${r.campName}';
    label = '$label (${tr('de')} ${r.donateurNom.isNotEmpty ? r.donateurNom : tr('Compte supprimé')})';
    return label;
  }
  if (r.donBeneficiaireNom.isNotEmpty) {
    var label = tr('Don de camp');
    if (r.campName.isNotEmpty) label = '$label, ${r.campName}';
    return '$label (${tr('pour')} ${r.donBeneficiaireNom})';
  }
  if (r.campTotal) {
    var label = tr('Paiement du camp en une fois');
    if (r.campName.isNotEmpty) label = '$label, ${r.campName}';
    return label;
  }
  var label = tr('Versement du camp');
  if (r.campName.isNotEmpty) label = '$label, ${r.campName}';
  if (r.numeroVersement > 0) label = '$label (${tr('Versement')} ${r.numeroVersement} ${tr('sur 6')})';
  return label;
}

String typePaiementLabel(String type) {
  switch (type) {
    case 'don':
      return tr('Don');
    case 'cotisation':
      return tr('Cotisation');
    case 'carte':
      return tr('Carte');
    case 'achat':
      return tr('Achat');
    case 'camp':
      return tr('Versement du camp');
    default:
      return type;
  }
}

IconData typePaiementIcone(String type) {
  switch (type) {
    case 'don':
      return Icons.favorite_border;
    case 'cotisation':
      return Icons.account_balance_wallet_outlined;
    case 'carte':
      return Icons.badge_outlined;
    case 'achat':
      return Icons.shopping_bag_outlined;
    case 'camp':
      return Icons.event_outlined;
    default:
      return Icons.receipt_long_outlined;
  }
}

String statutPaiementLabel(String statut) {
  switch (statut) {
    case 'confirme':
      return tr('Validé');
    case 'refuse':
      return tr('Refusé');
    case 'annule':
      return tr('Annulé');
    default:
      return tr('En attente de confirmation');
  }
}

Color statutPaiementCouleur(String statut) {
  switch (statut) {
    case 'confirme':
      return const Color(0xFF166534);
    case 'refuse':
      return const Color(0xFFB91C1C);
    case 'annule':
      return Cp.inkMuted;
    default:
      return const Color(0xFF8A6A12);
  }
}

Color statutPaiementFond(String statut) {
  switch (statut) {
    case 'confirme':
      return const Color(0xFFDCFCE7);
    case 'refuse':
      return const Color(0xFFFEE2E2);
    case 'annule':
      return const Color(0xFFF1F5F9);
    default:
      return const Color(0xFFFEF3C7);
  }
}

Widget pastilleStatutPaiement(String statut) {
  return Container(
    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
    decoration: BoxDecoration(color: statutPaiementFond(statut), borderRadius: BorderRadius.circular(20)),
    child: Text(statutPaiementLabel(statut), style: TextStyle(fontWeight: FontWeight.w700, fontSize: 12, color: statutPaiementCouleur(statut))),
  );
}

// Affichage historique seulement, comme suffixMoyen ci-dessus.
String moyenPaiementLabel(String? moyen) {
  switch (moyen) {
    case 'especes':
      return tr('Espèces');
    case 'wave':
      return 'Wave';
    case 'orange_money':
      return 'Orange Money';
    case 'paypal':
      return 'PayPal';
    default:
      return tr('Non renseigné');
  }
}

PayRequest payRequestFromRow(Map<String, dynamic> row, {required bool isAdmin}) {
  final lignes = row['lignes'];
  final items = <PurchaseItem>[];
  if (lignes is List) {
    for (final l in lignes) {
      items.add(PurchaseItem(-1, (l['titre'] ?? '').toString(), (l['auteur'] ?? '').toString(), (l['prix_fcfa'] as num?)?.toInt() ?? 0, serverId: (l['livre_id'] ?? '').toString()));
    }
  }
  final moyen = (row['moyen'] ?? '').toString();
  final r = PayRequest(
    (row['reference'] ?? '').toString(),
    (row['type'] ?? 'don').toString(),
    (row['montant_fcfa'] as num?)?.toInt() ?? 0,
    items,
    isAdmin ? (row['nom_complet'] ?? '').toString() : (app.member?.name ?? ''),
    isAdmin ? (row['matricule'] ?? '').toString() : (app.member?.matricule ?? ''),
    DateTime.tryParse((row['cree_le'] ?? '').toString()) ?? DateTime.now(),
    method: moyenPaiementLabel(moyen.isEmpty ? null : moyen),
  );
  if (row['statut'] == 'confirme') {
    r.confirmed = true;
    final ca = DateTime.tryParse((row['confirme_le'] ?? '').toString());
    if (ca != null) r.confirmedAt = ca;
  }
  if (row['statut'] == 'refuse') {
    r.refused = true;
    r.refusedAt = DateTime.tryParse((row['refuse_le'] ?? '').toString());
  }
  return r;
}

Widget carteOperation(BuildContext c, Map<String, dynamic> row, {required bool isAdmin, required VoidCallback onTap}) {
  final t = Theme.of(c).textTheme;
  final type = (row['type'] ?? 'don').toString();
  final statut = (row['statut'] ?? 'en_attente').toString();
  final montant = (row['montant_fcfa'] as num?)?.toInt() ?? 0;
  final signe = isAdmin ? '+' : '-';
  final lignes = row['lignes'];
  var libelle = typePaiementLabel(type);
  if (type == 'achat' && lignes is List && lignes.isNotEmpty) {
    final titres = <String>[];
    for (final l in lignes) {
      final titre = (l['titre'] ?? '').toString();
      if (titre.isNotEmpty) titres.add(titre);
    }
    if (titres.isNotEmpty) libelle = titres.join(', ');
  }
  final sousTitre = <String>[];
  if (isAdmin) {
    final nom = (row['nom_complet'] ?? '').toString();
    if (nom.isNotEmpty) sousTitre.add(nom);
    final matricule = (row['matricule'] ?? '').toString();
    if (matricule.isNotEmpty) sousTitre.add(matricule);
  }
  // Versement du camp, 31 oct. 2026 : l'administrateur voit le nom
  // du camp et le numéro du versement, pour valider en sachant ce
  // que le membre paie.
  if (type == 'camp') {
    final campNom = (row['camp_nom'] ?? '').toString();
    if (campNom.isNotEmpty) sousTitre.add(campNom);
    final numero = (row['numero_versement'] as num?)?.toInt() ?? 0;
    final benefNom = (row['beneficiaire_membre_nom'] ?? '').toString().isNotEmpty
        ? (row['beneficiaire_membre_nom'] ?? '').toString()
        : (row['beneficiaire_nom'] ?? '').toString();
    if (benefNom.isNotEmpty) {
      sousTitre.add('${tr('Don pour')} $benefNom');
    } else if (numero > 0) {
      sousTitre.add('${tr('Versement')} $numero ${tr('sur 6')}');
    } else {
      sousTitre.add(tr('Paiement en une fois'));
    }
  }
  sousTitre.add(dateHeure((row['cree_le'] ?? '').toString()));
  final moyen = (row['moyen'] ?? '').toString();
  if (moyen.isNotEmpty) sousTitre.add(moyenPaiementLabel(moyen));
  return Card(
    child: ListTile(
      leading: Container(
        width: 40,
        height: 40,
        decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(12)),
        child: Icon(typePaiementIcone(type), color: Cp.gold, size: 20),
      ),
      title: Text(libelle, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
      subtitle: Text(sousTitre.join(' · '), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
      trailing: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Text('$signe ${fcfa(montant)}', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
          const SizedBox(height: 4),
          pastilleStatutPaiement(statut),
        ],
      ),
      onTap: onTap,
    ),
  );
}

// ───────────────────────── Historique des transactions ─────────────
// 30 oct. 2026, téléphone seulement : l'historique unifié du membre
// (cotisations, dons, carte et achats, ordre chronologique, statut
// visible sur chaque ligne) et l'historique de l'administration
// (périmètre serveur, filtres, totaux par période, export).
// Les inscriptions aux camps ne créent aucun paiement aujourd'hui,
// donc aucune ligne de camp ne peut apparaître. La page Don elle-même
// n'est pas redessinée ici. La validation d'un paiement reste dans
// son parcours existant : l'historique affiche l'état, il ne valide
// ni ne refuse jamais, pour éviter tout double traitement.

// Fiche détail d'une opération : montant en grand, libellé, moyen,
// référence, statut, date et heure, trace de validation ou de refus,
// reçu et facture après confirmation seulement.
class TransactionDetailSheet extends StatelessWidget {
  const TransactionDetailSheet({super.key, required this.row, required this.isAdmin, this.onFacture, this.onAutresOperations});
  final Map<String, dynamic> row;
  final bool isAdmin;
  final VoidCallback? onFacture;
  final VoidCallback? onAutresOperations;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final type = (row['type'] ?? 'don').toString();
    final statut = (row['statut'] ?? 'en_attente').toString();
    final montant = (row['montant_fcfa'] as num?)?.toInt() ?? 0;
    final signe = isAdmin ? '+' : '-';
    final lignes = row['lignes'];
    final livres = <String>[];
    if (lignes is List) {
      for (final l in lignes) {
        final titre = (l['titre'] ?? '').toString();
        final auteur = (l['auteur'] ?? '').toString();
        if (titre.isNotEmpty) livres.add(auteur.isEmpty ? titre : '$titre, $auteur');
      }
    }
    String trace;
    if (statut == 'confirme') {
      final date = dateHeure((row['confirme_le'] ?? '').toString());
      final nom = (row['confirme_par_nom'] ?? '').toString();
      trace = isEn
          ? (nom.isEmpty ? 'Confirmed on $date.' : 'Confirmed on $date by $nom.')
          : (nom.isEmpty ? 'Validé le $date.' : 'Validé le $date par $nom.');
    } else if (statut == 'refuse') {
      final date = dateHeure((row['refuse_le'] ?? '').toString());
      final nom = (row['refuse_par_nom'] ?? '').toString();
      trace = isEn
          ? (nom.isEmpty ? 'Refused on $date.' : 'Refused on $date by $nom.')
          : (nom.isEmpty ? 'Refusé le $date.' : 'Refusé le $date par $nom.');
    } else {
      trace = tr('En attente de confirmation par la structure.');
    }
    Widget ligne(String label, String value) {
      return Padding(
        padding: const EdgeInsets.only(bottom: Cp.s1),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(width: 120, child: Text(label, style: t.bodyMedium?.copyWith(color: Cp.inkMuted))),
            Expanded(child: Text(value, style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: Cp.navy))),
          ],
        ),
      );
    }

    final moyen = (row['moyen'] ?? '').toString();
    return SafeArea(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(Cp.s2),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: Cp.line, borderRadius: BorderRadius.circular(2)))),
            const SizedBox(height: Cp.s2),
            Text(tr('Détail de la transaction'), style: t.titleLarge?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
            const SizedBox(height: Cp.s1),
            Center(child: Text('$signe ${fcfa(montant)}', style: t.displaySmall?.copyWith(fontWeight: FontWeight.w900, color: Cp.navy))),
            const SizedBox(height: Cp.s1),
            Center(child: pastilleStatutPaiement(statut)),
            const SizedBox(height: Cp.s2),
            if (statut == 'confirme')
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(Cp.s2),
                decoration: BoxDecoration(color: const Color(0xFFDCFCE7), borderRadius: BorderRadius.circular(16)),
                child: Text(tr('Cette demande a déjà été validée, elle ne peut pas être traitée une deuxième fois.'), style: t.bodyMedium?.copyWith(color: const Color(0xFF166534), fontWeight: FontWeight.w700)),
              ),
            if (statut == 'refuse')
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(Cp.s2),
                decoration: BoxDecoration(color: const Color(0xFFFEE2E2), borderRadius: BorderRadius.circular(16)),
                child: Text(tr('Cette demande a déjà été refusée, elle ne peut pas être traitée une deuxième fois.'), style: t.bodyMedium?.copyWith(color: const Color(0xFFB91C1C), fontWeight: FontWeight.w700)),
              ),
            if (statut == 'confirme' || statut == 'refuse') const SizedBox(height: Cp.s2),
            ligne(tr('Libellé'), typePaiementLabel(type)),
            if (livres.isNotEmpty) ligne(tr('Livres'), livres.join(', ')),
            ligne(tr('Moyen'), moyenPaiementLabel(moyen.isEmpty ? null : moyen)),
            ligne(tr('Référence'), (row['reference'] ?? '').toString()),
            ligne(tr('Date et heure'), dateHeure((row['cree_le'] ?? '').toString())),
            if (isAdmin && (row['nom_complet'] ?? '').toString().isNotEmpty)
              ligne(tr('Membre'), '${row['nom_complet']} · ${row['matricule']}'),
            if (isAdmin && (row['etablissement_nom'] ?? '').toString().isNotEmpty)
              ligne(tr('Établissement'), (row['etablissement_nom'] ?? '').toString()),
            const SizedBox(height: Cp.s1),
            Text(trace, style: t.bodyMedium),
            const SizedBox(height: Cp.s2),
            if (statut == 'confirme' && onFacture != null)
              SizedBox(
                width: double.infinity,
                height: 56,
                child: FilledButton.icon(
                  onPressed: onFacture,
                  icon: const Icon(Icons.receipt_long_outlined),
                  label: Text(tr('Voir le reçu et la facture')),
                ),
              ),
            if (statut != 'confirme')
              Text(tr('Le reçu et la facture seront disponibles après confirmation.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
            if (isAdmin && onAutresOperations != null) ...[
              const SizedBox(height: Cp.s1),
              SizedBox(
                width: double.infinity,
                height: 56,
                child: OutlinedButton.icon(
                  onPressed: onAutresOperations,
                  icon: const Icon(Icons.history_outlined),
                  label: Text(tr('Autres opérations de ce membre')),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

// Fiches santé de camp, phase 3, 31 oct. 2026 : cinq champs libres
// au plus, jamais sur le pass, le badge, les exports ni les
// notifications. Le membre remplit sa fiche tant que le camp n'est
// pas terminé, la consulte ensuite en lecture seule, et peut la
// supprimer immédiatement à tout moment.
class FicheSantePage extends StatefulWidget {
  const FicheSantePage({super.key, required this.evenementId, required this.campName, this.onEnregistree});
  final String evenementId;
  final String campName;
  // Appelée après un enregistrement réussi, quand la page sert
  // d'étape d'inscription : l'appelant décide alors de la suite.
  final void Function(BuildContext formContext)? onEnregistree;

  @override
  State<FicheSantePage> createState() => _FicheSantePageState();
}

class _FicheSantePageState extends State<FicheSantePage> {
  bool _loading = true;
  bool _saving = false;
  bool _fige = false;
  bool _existe = false;
  String? _error;
  final _allergies = TextEditingController();
  final _traitement = TextEditingController();
  final _probleme = TextEditingController();
  final _contact = TextEditingController();
  final _remarque = TextEditingController();

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void dispose() {
    _allergies.dispose();
    _traitement.dispose();
    _probleme.dispose();
    _contact.dispose();
    _remarque.dispose();
    super.dispose();
  }

  String _val(dynamic v) => v is String ? v : '';

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final data = await api.fetchMaFicheSante(widget.evenementId);
      if (!mounted) return;
      setState(() {
        _fige = data['fige'] == true;
        _existe = data['existe'] == true;
        _allergies.text = _val(data['allergies']);
        _traitement.text = _val(data['traitement']);
        _probleme.text = _val(data['probleme']);
        _contact.text = _val(data['contact_urgence']);
        _remarque.text = _val(data['remarque']);
        _loading = false;
      });
    } on ApiException catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = e.message;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = tr('Impossible de charger la fiche santé.');
      });
    }
  }

  Future<void> _save() async {
    if (_saving || _fige) return;
    setState(() => _saving = true);
    try {
      await api.enregistrerFicheSante(widget.evenementId, {
        'allergies': _allergies.text,
        'traitement': _traitement.text,
        'probleme': _probleme.text,
        'contact_urgence': _contact.text,
        'remarque': _remarque.text,
      });
      if (!mounted) return;
      setState(() => _existe = true);
      toast(context, tr('Fiche santé enregistrée.'));
      widget.onEnregistree?.call(context);
    } on ApiException catch (e) {
      if (mounted) toast(context, e.message);
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de charger la fiche santé.'));
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  Future<void> _delete() async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Supprimer cette fiche santé ?')),
        content: Text(tr('Cette fiche sera définitivement supprimée.')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Supprimer'))),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    try {
      await api.supprimerMaFicheSante(widget.evenementId);
      if (!mounted) return;
      setState(() {
        _existe = false;
        _allergies.clear();
        _traitement.clear();
        _probleme.clear();
        _contact.clear();
        _remarque.clear();
      });
      toast(context, tr('Fiche santé supprimée.'));
    } on ApiException catch (e) {
      if (mounted) toast(context, e.message);
    }
  }

  Widget _champ(TextEditingController c, String label, {int lines = 1}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: Cp.s2),
      child: TextField(
        controller: c,
        enabled: !_fige,
        maxLines: lines,
        decoration: InputDecoration(labelText: label, border: const OutlineInputBorder()),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Cp.navy,
        foregroundColor: Colors.white,
        title: Text(tr('Fiche santé')),
      ),
      body: _loading
          ? const Center(child: UxShimmerList())
          : _error != null
              ? Center(
                  child: Padding(
                    padding: const EdgeInsets.all(Cp.s2),
                    child: Column(mainAxisSize: MainAxisSize.min, children: [
                      Text(_error!, style: t.bodyMedium, textAlign: TextAlign.center),
                      const SizedBox(height: Cp.s2),
                      FilledButton(onPressed: _load, child: Text(tr('Réessayer'))),
                    ]),
                  ),
                )
              : SingleChildScrollView(
                  padding: const EdgeInsets.all(Cp.s2),
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text(widget.campName, style: t.titleLarge?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
                    const SizedBox(height: Cp.s1),
                    if (_fige)
                      Text(
                        tr('La fiche est figée, le camp est terminé. Vous pouvez encore la consulter et la supprimer.'),
                        style: t.bodyMedium?.copyWith(color: Cp.goldDeep, fontWeight: FontWeight.w700),
                      )
                    else if (!_existe)
                      Text(tr('Aucune fiche pour le moment. Remplissez les champs puis enregistrez.'), style: t.bodyMedium),
                    const SizedBox(height: Cp.s2),
                    _champ(_allergies, tr('Allergies'), lines: 2),
                    _champ(_traitement, tr('Traitement médical en cours'), lines: 2),
                    _champ(_probleme, tr('Problème de santé ou handicap à signaler'), lines: 2),
                    _champ(_contact, tr('Contact d’urgence (nom et téléphone)')),
                    _champ(_remarque, tr('Remarque libre'), lines: 3),
                    if (!_fige)
                      SizedBox(
                        width: double.infinity,
                        height: 52,
                        child: FilledButton(
                          onPressed: _saving ? null : _save,
                          child: Text(tr('Enregistrer ma fiche santé')),
                        ),
                      ),
                    if (_existe) ...[
                      const SizedBox(height: Cp.s1),
                      SizedBox(
                        width: double.infinity,
                        height: 48,
                        child: OutlinedButton(onPressed: _delete, child: Text(tr('Supprimer ma fiche santé'))),
                      ),
                    ],
                  ]),
                ),
    );
  }
}
