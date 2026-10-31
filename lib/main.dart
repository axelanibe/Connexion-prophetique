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

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:image/image.dart' as img;
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';
import 'package:file_picker/file_picker.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:share_plus/share_plus.dart';
import 'package:permission_handler/permission_handler.dart';

import 'api.dart';
import 'audio.dart';
import 'bug_reports.dart';
import 'remote_config.dart';
import 'package:path_provider/path_provider.dart';
import 'bible.dart';
import 'dictionary.dart';
import 'notifications.dart';
import 'home_web.dart';
import 'responsive.dart';
import 'verse_share.dart';
import 'retreat_poster.dart';
import 'web_assets.dart';
import 'header_logo.dart';
import 'i18n.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';
import 'link_embed.dart';
import 'link_view.dart';
import 'tab_title.dart';
import 'route_path.dart';
import 'print_doc.dart';
import 'print_html.dart';

part 'quiz_bank.dart';

// ───────────── CONSTANTES DE LA STRUCTURE ─────────────
/// Lien Wave Business de la structure, fourni par Axel le 25 octobre 2026.
/// À confirmer comme compte de la structure : le lien actuel est au nom
/// de Gold Digital Consulting. Si la structure fournit un autre lien,
/// remplacer cette seule constante. Ne jamais inventer un autre lien.
const String kWaveBaseUrl =
    'https://pay.wave.com/m/M_ci_6r2wC06ngy-3/c/ci/';

/// Deuxième moyen de paiement, Orange Money, fourni par Axel le
/// 27 octobre 2026, en plus de Wave, sans remplacer Wave. Le lien
/// est celui fourni par la structure, à ne pas reproduire en chat.
/// Parcours identique à Wave : choix du moyen, montant exact
/// affiché avant l'ouverture, demande créée avec le montant
/// verrouillé, statut en attente, jamais payée sur seul lien ou
/// seule capture, facture uniquement après confirmation vérifiée
/// ou validation par la structure après contrôle de son compte
/// Orange Money. Limite honnête : le lien fourni est un lien
/// Orange Money, il ne porte pas de paramètre de montant comme
/// le lien Wave, donc le montant est affiché et verrouillé dans
/// l'application, et le membre doit vérifier ce même montant
/// dans Orange Money avant de valider, comme pour Wave.
const String kOrangeMoneyUrl =
    'https://multi.app.orange-money.com/app/v1/kapptivate/qrcode/odyssee/?id=codgen70-9d3f1d16278e4539bbe96bb2f3426116&v=1';

/// Troisième moyen de paiement, PayPal, ajouté le 27 octobre 2026,
/// en plus de Wave et Orange Money, sans les remplacer. Adresse
/// PayPal fournie par Axel le 27 octobre 2026. Parcours identique :
/// choix du moyen, montant de référence affiché avant l'ouverture,
/// demande créée avec ce montant, statut en attente, jamais payée
/// sur seul lien ou seule capture, facture uniquement après
/// confirmation vérifiée ou validation par la structure après
/// contrôle de son compte PayPal. Limite honnête, plus forte que
/// pour Orange Money : PayPal ne propose pas le FCFA, donc le lien
/// de don PayPal ne porte pas de montant verrouillé en FCFA. Le
/// membre saisit l'équivalent dans la devise proposée par PayPal,
/// et c'est la structure qui vérifie l'équivalent reçu, avant de
/// valider, comme pour un montant à vérifier dans Orange Money.
const String kPayPalEmail = 'mauriceaxel1@gmail.com';

/// Adresse e-mail qui reçoit les sujets de prière, fournie par Axel.
const String kStructureEmail = 'cile0225@gmail.com';

/// Code d'accès de l'espace structure (DÉMO LOCALE uniquement).
/// Non fourni à ce jour, donc l'espace reste désactivé.
/// En production : connexion serveur avec rôles, jamais de code dans l'app.
const String kAdminPin = '';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // Rapports de bug, 29 oct. 2026 : capture automatique des erreurs,
  // installée avant runApp, pour ne manquer aucune erreur de
  // démarrage. La capture ne change pas le comportement visible.
  BugReports.install();
  await api.restoreToken(); // jetons serveur conservés sur l'appareil
  await app.load(); // restaure profil, plan de 21 jours et journal
  runApp(const ConnexionProphetiqueApp());
  // Verset du jour en notification : reprogrammé à chaque ouverture
  // si la permission est déjà accordée, sans demander la permission
  // au démarrage. La demande se fait depuis la page Bible.
  // L'anniversaire suit, après, car scheduleWeek annule tout.
  if (app.dailyVerseNotif) {
    unawaited(DailyVerseNotifications.instance.scheduleWeek(app.lang).then((_) => scheduleBirthdayIfSoon()));
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
  static const gold = Color(0xFFD4A72C); // sur fond bleu nuit uniquement
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

ThemeData buildTheme() {
  const scheme = ColorScheme(
    brightness: Brightness.light,
    primary: Cp.navy,
    onPrimary: Colors.white,
    secondary: Cp.goldDeep,
    onSecondary: Colors.white,
    error: Cp.danger,
    onError: Colors.white,
    surface: Cp.paper,
    onSurface: Cp.ink,
  );
  const textTheme = TextTheme(
    titleLarge: TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: Cp.ink, height: 1.25),
    titleMedium: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: Cp.ink, height: 1.3),
    bodyMedium: TextStyle(fontSize: 14, fontWeight: FontWeight.w400, color: Cp.inkMuted, height: 1.45),
    labelLarge: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: Cp.ink),
  );
  return ThemeData(
    useMaterial3: true,
    colorScheme: scheme,
    scaffoldBackgroundColor: Cp.paper,
    textTheme: textTheme,
    appBarTheme: const AppBarTheme(
      backgroundColor: Cp.navy,
      foregroundColor: Colors.white,
      elevation: 0,
      centerTitle: false,
      titleTextStyle: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: Colors.white),
    ),
    navigationBarTheme: NavigationBarThemeData(
      height: 68,
      backgroundColor: Cp.navy,
      indicatorColor: Cp.gold,
      iconTheme: WidgetStateProperty.resolveWith((s) => IconThemeData(
          color: s.contains(WidgetState.selected) ? Cp.navy : Colors.white70, size: 24)),
      labelTextStyle: WidgetStateProperty.resolveWith((s) {
        final sel = s.contains(WidgetState.selected);
        return TextStyle(
            fontSize: 12,
            fontWeight: sel ? FontWeight.w700 : FontWeight.w500,
            color: sel ? Cp.gold : Colors.white70);
      }),
    ),
    cardTheme: CardThemeData(
      color: Cp.card,
      elevation: 0,
      margin: EdgeInsets.zero,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(Cp.radiusCard),
        side: const BorderSide(color: Cp.line),
      ),
    ),
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
class Member {
  Member(this.name, this.matricule, this.etab, this.since,
      {this.fonction = '', this.ministere = '', this.photoPath = '', this.photoData = '', this.validUntilOverride, this.dateNaissance});
  final String name, matricule, etab, fonction, ministere, photoPath;
  // Date de naissance facultative, 29 oct. 2026 : elle ne sert qu'à
  // la carte d'anniversaire du membre lui-même et à la notification
  // locale Android. Seuls le mois et le jour sont comparés, jamais
  // l'année ni un âge, et elle n'est jamais montrée à un autre membre.
  final DateTime? dateNaissance;
  // Photo venue du serveur, en data URL, 28 oct. 2026 : c'est elle
  // qui réapparaît à la connexion, quand le chemin local a disparu
  // avec la déconnexion. Sur le web, c'est aussi elle qui s'affiche,
  // car un chemin de fichier du téléphone n'y existe pas.
  final String photoData;
  final DateTime since;
  // Date de fin de validité venue du serveur quand elle existe.
  // Le serveur n'a pas de colonnes fonction ni ministère : ces deux
  // champs restent conservés sur l'appareil seulement.
  final DateTime? validUntilOverride;
  DateTime get validUntil => validUntilOverride ?? DateTime(since.year + 1, since.month, since.day);
  Member withPhoto(String path) => Member(name, matricule, etab, since,
      fonction: fonction, ministere: ministere, photoPath: path, photoData: photoData, validUntilOverride: validUntilOverride, dateNaissance: dateNaissance);
  Member withServerPhoto(String dataUrl) => Member(name, matricule, etab, since,
      fonction: fonction, ministere: ministere, photoPath: photoPath, photoData: dataUrl, validUntilOverride: validUntilOverride, dateNaissance: dateNaissance);
  bool get hasPhoto => photoData.isNotEmpty || photoPath.isNotEmpty;
}

/// Photo du membre, prête à afficher : la photo serveur d'abord,
/// puis le chemin local, sinon rien. Utilisée partout où la photo
/// s'affiche, en-tête, accueil, profil et carte, pour que les quatre
/// montrent la même photo, au même moment.
ImageProvider? memberPhotoProvider(Member m) {
  if (m.photoData.isNotEmpty) {
    try {
      final comma = m.photoData.indexOf(',');
      final bytes = base64Decode(comma >= 0 ? m.photoData.substring(comma + 1) : m.photoData);
      return MemoryImage(bytes);
    } catch (_) {}
  }
  if (m.photoPath.isNotEmpty) {
    try {
      // Sur le web, un chemin blob d'ImagePicker s'affiche par le
      // réseau, jamais par FileImage, 30 oct. 2026.
      if (kIsWeb && m.photoPath.startsWith('blob:')) return NetworkImage(m.photoPath);
      return FileImage(File(m.photoPath));
    } catch (_) {}
  }
  return null;
}

Widget memberPhotoWidget(Member m, {BoxFit fit = BoxFit.cover}) {
  final provider = memberPhotoProvider(m);
  if (provider == null) return const SizedBox.shrink();
  return Image(image: provider, fit: fit, errorBuilder: (_, __, ___) => const SizedBox.shrink());
}

// Anniversaires, 29 oct. 2026.
//
// Limite franche : sans notification poussée, rien ne peut
// apparaître sur un téléphone complètement fermé. Comme le verset
// du jour, le téléphone programme et le serveur connaît les dates.
// La carte s'affiche à l'ouverture, sur web comme sur iPhone, et
// la notification locale Android part le matin, comme le verset.
bool _isLeapYear(int y) => (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;

/// Vrai si la date de naissance tombe aujourd'hui. Un 29 février
/// est fêté le 28 février les années non bissextiles, pour que
/// personne ne perde son anniversaire trois ans sur quatre.
bool isBirthdayToday(DateTime birth, DateTime today) {
  if (birth.month == 2 && birth.day == 29 && !_isLeapYear(today.year)) {
    return today.month == 2 && today.day == 28;
  }
  return birth.month == today.month && birth.day == today.day;
}

String birthLabel(DateTime d) =>
    '${d.day.toString().padLeft(2, '0')}/${d.month.toString().padLeft(2, '0')}/${d.year}';

String birthIso(DateTime d) =>
    '${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';

/// Verset d'anniversaire, vérifié dans la source : la rotation des
/// versets ne contient pas de verset adapté, donc Psaume 118:24,
/// « C'est ici la journée que l'Éternel a faite », est utilisé.
/// Le texte est toujours lu dans BibleService, jamais recopié ici.
BibleVerseRef? birthdayVerse(String lang) {
  final svc = BibleService.instance;
  if (!svc.loaded) return null;
  final text = svc.verseText(lang, 18, 118, 24);
  if (text == null || text.isEmpty) return null;
  return BibleVerseRef(18, 118, 24, text);
}

/// Notification locale d'anniversaire, 29 oct. 2026 : même modèle
/// que le verset du jour, Android seulement, programmée à
/// l'ouverture si l'anniversaire tombe dans les 7 prochains jours.
/// Elle suit l'option du verset du jour et la même permission : si
/// la permission manque, rien n'est programmé, et la carte à
/// l'ouverture fait le travail. Appelée après scheduleWeek, jamais
/// avant, car scheduleWeek annule toutes les programmations.
Future<void> scheduleBirthdayIfSoon() async {
  try {
    if (!app.dailyVerseNotif) return;
    if (defaultTargetPlatform != TargetPlatform.android) return;
    final birth = app.member?.dateNaissance;
    if (birth == null) return;
    await DailyVerseNotifications.instance.scheduleBirthday(app.lang, birth);
  } catch (_) {}
}

/// Notification locale de rappel de cotisation, 29 oct. 2026 :
/// même modèle que l'anniversaire, Android seulement. Programmée
/// à chaque synchronisation quand le rappel du mois est présent,
/// annulée dès qu'il disparaît (cotisation réglée). Elle suit la
/// même option du verset du jour et la même permission : sans
/// permission, rien n'est programmé, et la cloche avec la carte
/// font le travail. Appelée après scheduleBirthdayIfSoon aux
/// points de reprogrammation, car scheduleWeek annule tout.
Future<void> scheduleCotisationIfDue() async {
  try {
    if (!app.dailyVerseNotif) return;
    if (defaultTargetPlatform != TargetPlatform.android) return;
    if (app.hasCotisationReminder) {
      await DailyVerseNotifications.instance.scheduleCotisationReminder(app.lang);
    } else {
      await DailyVerseNotifications.instance.cancelCotisationReminder();
    }
  } catch (_) {}
}

class Book {
  Book({required this.id, required this.title, required this.author, required this.price,
      this.description = '', this.format = '', this.fileUrl = '', this.serverId = '', this.imagePath = '', this.imageUrl = '', this.fichierId = ''});
  final int id;
  // Identifiant serveur (UUID) quand le livre vient du serveur. Il sert
  // aux achats et au fichier côté serveur ; l'id local ne sert qu'à l'affichage.
  // Mutable : il est rempli après une publication serveur réussie, pour
  // que la synchronisation suivante retrouve ce livre sur tous les
  // appareils, au lieu de rester un livre local sans identifiant.
  String serverId;
  String title, author, description, format, fileUrl;
  // Identifiant du fichier PDF ou EPUB téléversé au serveur à la
  // publication. Les membres, eux, ouvrent le livre par la route
  // /livres/:id/fichier, jamais par cet identifiant direct.
  String fichierId;
  // Image de couverture : chemin local choisi dans l'espace structure,
  // et URL serveur /fichiers/<id> après téléversement, visible par tous.
  String imagePath, imageUrl;
  int price;
}

class Camp {
  Camp({required this.id, required this.name, this.dates = '', this.place = '', this.tariff = '', this.tarifFcfa = 0, this.kairos = false, this.serverId = '', this.imagePath = '', this.imageUrl = '', this.type = 'camp', this.scope = 'Communauté', this.description = '', this.dateDebut, this.dateFin});
  // Type serveur : 'camp' ou 'retraite', jamais inventé ailleurs.
  // Portée d'affichage : 'Communauté' ou le nom d'un établissement.
  final String type, scope;
  final int id;
  // Identifiant serveur (UUID) quand le camp vient du serveur. Il sert
  // à l'inscription côté serveur et au pass ; l'id local ne sert qu'à l'affichage.
  // Mutable, comme pour les livres : il est rempli après une
  // publication serveur réussie, pour que la synchronisation
  // suivante retrouve ce camp sur tous les appareils.
  String serverId;
  String name, dates, place, tariff, description;
  // Tarif numérique du serveur, 31 oct. 2026 : il sert au calcul
  // des versements, le texte tariff restant l'affichage.
  int tarifFcfa;
  String imagePath, imageUrl;
  bool kairos;
  // Dates structurées du serveur (colonnes date), null quand la
  // structure ne les a pas renseignées : le calendrier ne place
  // jamais un camp sans date sur un jour, il le liste à part.
  DateTime? dateDebut, dateFin;
}

class ActivityItem {
  ActivityItem(this.title, {this.imagePath = '', this.imageUrl = '', this.serverId = ''});
  String title, imagePath, imageUrl, serverId;
}

class Etab {
  Etab(this.name, {this.id = '', this.imagePath = '', this.imageUrl = ''});
  final String name;
  // Identifiant serveur (UUID) quand l'établissement vient du serveur.
  // Il sert à l'inscription du membre côté serveur.
  final String id;
  String imagePath, imageUrl;
  final List<ActivityItem> activities = [];
}

class NewsItem {
  NewsItem(this.title, this.text, this.etab, this.date, {this.etablissementId = '', this.imagePath = '', this.imageUrl = '', this.serverId = '', this.programmeeLe});
  final String title, text, etab;
  final DateTime date;
  final String etablissementId;
  String imagePath, imageUrl;
  String serverId;
  // Programmation façon Facebook, 30 oct. 2026 : date et heure
  // prévues, null pour une publication immédiate.
  DateTime? programmeeLe;
}

class BureauMember {
  BureauMember(this.name, this.role, this.contact, this.consent, {this.imagePath = '', this.etab = 'Communauté'});
  // Établissement du responsable, pour les filtres de la page
  // Bureau. 'Communauté' par défaut, le serveur n'ayant pas de
  // colonne établissement pour le Bureau.
  final String etab;
  final String name, role, contact;
  final bool consent; // le contact ne s'affiche qu'avec l'accord
  String imagePath; // photo locale, le serveur n'a pas de colonne photo pour le Bureau
}

class Teaching {
  Teaching(this.title, this.speaker, this.url, {this.kind = 'enseignement', this.imagePath = '', this.imageUrl = '', this.audioId = '', this.serverId = '', this.thematique = '', this.format = '', this.duree = '', this.dateTexte = '', this.description = ''});
  String serverId;
  final String title, speaker;
  String url;
  // Identifiant du fichier audio téléversé au serveur. Les
  // membres, eux, écoutent par /fichiers/<id>, jamais par cet
  // identifiant direct.
  String audioId;
  String imagePath, imageUrl; // image locale ; le serveur n'a pas de colonne image pour les enseignements
  // Type choisi par la structure : 'enseignement' ou 'musique'.
  // Le serveur ne renvoie pas ce type, il vaut donc 'enseignement'
  // pour les enseignements venus du serveur.
  final String kind;
  String get kindLabel => kind == 'musique' ? tr('Musique') : tr('Enseignement');
  String thematique, format, duree, dateTexte, description;
  String get metaLine => [speaker, thematique, format, duree, dateTexte].where((v) => v.isNotEmpty).join(' · ');
}

/// Annonce audio, 29 oct. 2026 : carte façon Wave sur l'accueil,
/// pour signaler une mise à jour ou expliquer un fonctionnement.
/// Modèle séparé des enseignements, jamais confondu avec eux :
/// ni la liste des enseignements ni leurs fichiers ne sont
/// réutilisés ici, seule l'URL audio résolue est partagée.
class AnnonceAudio {
  AnnonceAudio(this.title, this.text, this.audioUrl, {this.serverId = '', this.publieeLe, this.programmeeLe});
  final String title, text, audioUrl;
  String serverId;
  final DateTime? publieeLe;
  // Programmation façon Facebook, 30 oct. 2026 : date et heure
  // prévues, null pour une publication immédiate.
  DateTime? programmeeLe;
}

/// Carte vidéo, 30 oct. 2026 : carte façon « Regardez la
/// vidéo ! », pour expliquer une fonction de l'application
/// aux membres. Téléphone seulement, jamais sur le web.
/// Modèle séparé des enseignements et des annonces audio :
/// seule l'URL vidéo est partagée, lue dans l'application
/// par LinkViewPage, sans stockage de vidéo en base.
class CarteVideo {
  CarteVideo(this.title, this.explication, this.videoUrl, {this.serverId = ''});
  final String title, explication, videoUrl;
  String serverId;
}

class QuizQ {
  QuizQ(this.character, this.question, this.choices, this.correct, this.ref, this.explanation);
  final String character, question, ref, explanation;
  final List<String> choices;
  final int correct;
}

class PurchaseItem {
  PurchaseItem(this.bookId, this.title, this.author, this.price, {this.serverId = ''});
  int bookId;
  final int price;
  final String title, author; // copie d'origine : le catalogue ne la réécrit pas
  // Identifiant serveur du livre, quand il vient d'une ligne de
  // paiement serveur. Il survit aux changements d'identifiant
  // local, qui ne sont que des numéros d'affichage.
  String serverId;
}

class PayRequest {
  PayRequest(this.ref, this.kind, this.amount, this.items, this.memberName, this.matricule, this.date, {this.method = 'Wave', this.currency = '', this.campName = '', this.numeroVersement = 0, this.evenementId = ''});
  final String ref, kind, memberName, matricule; // kind : 'don' | 'achat' | 'carte' | 'cotisation' | 'camp'
  // Versement du camp, 31 oct. 2026 : nom du camp, numéro du
  // versement de 1 à 6 et identifiant serveur du camp, vides pour
  // les autres types. Modifiables, pour que la synchronisation
  // puisse les compléter sur une demande déjà créée.
  String campName;
  int numeroVersement;
  String evenementId;
  final String method; // 'Wave', 'Orange Money' ou 'PayPal', jamais inventé ailleurs
  final String currency; // Devise PayPal choisie, par exemple EUR, vide pour les autres moyens
  final int amount;
  final List<PurchaseItem> items;
  final DateTime date;
  bool confirmed = false;
  DateTime? confirmedAt;
  // Refus explicite par la structure, 28 oct. 2026 : un paiement
  // refusé ne doit plus s'afficher comme en attente côté membre.
  bool refused = false;
}

class Registration {
  Registration(this.camp, this.member, this.date, {this.codePass = '', this.participants = 1, this.hebergement = '', this.repas = '', this.transport = '', this.tarif = 0, this.montantPaye = 0, this.versementsValides = 0, this.versementsRequis = false, this.passVisible = true, this.montantSuivant, this.versementSuivant, this.versementEnAttenteRef, this.versementEnAttenteMontant, this.versementEnAttenteNumero});
  // Détails saisis par le membre à l'inscription, affichés sur le
  // pass, comme sur la version web. Vides quand le membre ne les
  // a pas renseignés, jamais inventés par l'application.
  final int participants;
  final String hebergement, repas, transport;
  final Camp camp;
  final Member member;
  final DateTime date;
  // Code du pass venu du serveur quand l'inscription est serveur.
  // C'est ce code qui doit figurer dans le QR, pas l'id local du camp.
  final String codePass;
  // Paiement du camp en 6 fois, 31 oct. 2026 : progression mutable,
  // mise à jour à chaque synchronisation. Par défaut, le pass est
  // visible comme avant : seules les inscriptions serveur pour un
  // camp payant, créées après le déploiement, le masquent tant que
  // la totalité n'est pas validée.
  int tarif;
  int montantPaye;
  int versementsValides;
  bool versementsRequis;
  bool passVisible;
  int? montantSuivant;
  int? versementSuivant;
  String? versementEnAttenteRef;
  int? versementEnAttenteMontant;
  int? versementEnAttenteNumero;
  // Le pass est verrouillé : plan en cours, total non atteint.
  bool get passVerrouille => versementsRequis && !passVisible;
  int get montantRestant => tarif > montantPaye ? tarif - montantPaye : 0;
  int get versementsRestants => versementsValides >= 6 ? 0 : 6 - versementsValides;
}

class JournalEntry {
  JournalEntry(this.date, this.text);
  final DateTime date;
  final String text;
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

  // Lecteur audio global, 28 oct. 2026 : un seul lecteur pour les
  // enseignements et les musiques, créé une fois avec l'état de
  // l'application. Il n'est jamais détruit quand on quitte la page
  // du lecteur, donc la lecture continue quand on change d'onglet
  // dans l'application. Une mini barre dans la coquille permet
  // de reprendre, de mettre en pause ou d'arrêter.
  final AudioPlayer bgPlayer = AudioPlayer();
  Teaching? currentTeaching;

  // Annonces audio, 29 oct. 2026 : cartes façon Wave sur l'accueil.
  // L'état d'écoute et de fermeture est gardé sur cet appareil
  // seulement, jamais envoyé au serveur : une annonce écoutée ou
  // fermée disparaît de l'accueil de ce membre, sur cet appareil,
  // mais reste visible pour les autres membres. Aucun lien avec
  // les enseignements, dont la liste n'est jamais réutilisée ici.
  final annoncesAudioHidden = <String>{};
  String? currentAnnonceId;
  StreamSubscription<PlayerState>? _annonceSub;

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
      await bgPlayer.setUrl(a.audioUrl);
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
            evenementId: (p['evenement_id'] ?? '').toString());
        if (statut == 'confirme') {
          r.confirmed = true;
          r.confirmedAt = DateTime.tryParse((p['confirme_le'] ?? '').toString());
          if (type == 'carte') paidCardMatricules.add(member!.matricule);
        } else if (statut == 'refuse') {
          r.refused = true;
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
      final etabs = await api.fetchEtablissements();
      final news = await api.fetchActualites();
      final events = await api.fetchEvenements();
      final books = await api.fetchLivres();
      final teachings = await api.fetchEnseignements();
      final bureau = await api.fetchBureau();
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
            tariff: e['tarif_fcfa'] == null ? '' : '${e['tarif_fcfa']} FCFA',
            tarifFcfa: (e['tarif_fcfa'] as num?)?.toInt() ?? 0,
            kairos: e['est_kairos'] == true,
            type: (e['type'] ?? 'camp').toString(),
            imageUrl: (e['image_id'] ?? '').toString().isEmpty ? '' : '$kApiBaseUrl/fichiers/${e['image_id']}',
            description: (e['description'] ?? '').toString(),
            dateDebut: parseCampDate(debut),
            dateFin: parseCampDate(fin),
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
          serverTeachings.add(Teaching(
            (t['titre'] ?? '').toString(),
            (t['orateur'] ?? '').toString(),
            audioId.isEmpty ? lien : '$kApiBaseUrl/fichiers/$audioId',
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
          this.bureau.add(BureauMember(
            (b['nom'] ?? '').toString(),
            (b['fonction'] ?? '').toString(),
            (b['contact'] ?? '').toString(),
            b['contact'] != null,
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
      serverStatus = 'serveur';
      notifyListeners();
      // Profil serveur, si un jeton est conservé sur l'appareil.
      await syncServerProfile();
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
      );
      final role = api.role;
      isAdmin = role == 'admin_general' || role == 'admin_etablissement';
      isAdminGeneral = role == 'admin_general';
      notifyListeners();
      await _save();
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
    member = Member(name, matricule, etab, inscrit,
        fonction: serverFonction.isNotEmpty ? serverFonction : (fonction.isNotEmpty ? fonction : oldFonction), ministere: ministere,
        photoPath: serverPhoto.isNotEmpty ? '' : photoPath, photoData: serverPhoto, validUntilOverride: valide, dateNaissance: birth);
    final role = api.role;
    isAdmin = role == 'admin_general' || role == 'admin_etablissement';
    isAdminGeneral = role == 'admin_general';
    notifyListeners();
    await _save();
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
    // Portée Communauté par défaut, le prototype ne donnant pas
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
      final pinHash = _localAdminPinHash;
      if (pinHash == null || pinHash.isEmpty) {
        await prefs.remove('adminPinHash');
      } else {
        await prefs.setString('adminPinHash', pinHash);
      }
      final m = member;
      if (m == null) {
        await prefs.remove('member');
      } else {
        await prefs.setString('member', jsonEncode({'name': m.name, 'mat': m.matricule, 'etab': m.etab, 'fonction': m.fonction, 'ministere': m.ministere, 'photo': m.photoPath, 'photoData': m.photoData, 'since': m.since.toIso8601String(), 'validUntil': m.validUntilOverride?.toIso8601String(), 'birth': m.dateNaissance?.toIso8601String()}));
        await prefs.setStringList('books', books.map((b) => jsonEncode({'id': b.id, 'title': b.title, 'author': b.author, 'desc': b.description, 'format': b.format, 'url': b.fileUrl, 'price': b.price, 'imagePath': b.imagePath, 'imageUrl': b.imageUrl, 'fichierId': b.fichierId})).toList());
        await prefs.setStringList('teachings', teachings.map((x) => jsonEncode({'title': x.title, 'speaker': x.speaker, 'url': x.url, 'kind': x.kind, 'imagePath': x.imagePath, 'imageUrl': x.imageUrl, 'thematique': x.thematique, 'format': x.format, 'duree': x.duree, 'date': x.dateTexte, 'desc': x.description})).toList());
      }
      await prefs.setStringList('paidCards', paidCardMatricules.toList());
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
      })).toList());
      await prefs.setString('wave_recipient', waveRecipient);
      await prefs.setString('wave_number', confirmedWaveNumber);
      await prefs.setBool('daily_verse_notif', dailyVerseNotif);
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
      final savedPinHash = prefs.getString('adminPinHash');
      _localAdminPinHash = (savedPinHash != null && savedPinHash.isNotEmpty) ? savedPinHash : null;
      // Dernière configuration serveur, repli hors ligne : si le
      // serveur est injoignable au démarrage, ces valeurs s'affichent.
      final savedConfig = prefs.getString('remote_config_json');
      if (savedConfig != null) {
        try {
          remoteConfig = RemoteConfig.fromJson(jsonDecode(savedConfig) as Map<String, dynamic>);
          setCurrentRemoteConfig(remoteConfig);
        } catch (_) {}
      }
      paidCardMatricules
        ..clear()
        ..addAll(prefs.getStringList('paidCards') ?? const <String>[]);
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
      waveRecipient = prefs.getString('wave_recipient') ?? '';
      confirmedWaveNumber = prefs.getString('wave_number') ?? '';
      dailyVerseNotif = prefs.getBool('daily_verse_notif') ?? true;
      final m = prefs.getString('member');
      if (m != null) {
        final j = jsonDecode(m) as Map<String, dynamic>;
        final validSaved = j['validUntil'] as String?;
        member = Member(j['name'] as String, j['mat'] as String, j['etab'] as String, DateTime.parse(j['since'] as String), fonction: (j['fonction'] as String?) ?? '', ministere: (j['ministere'] as String?) ?? '', photoPath: (j['photo'] as String?) ?? '', photoData: (j['photoData'] as String?) ?? '', validUntilOverride: validSaved == null ? null : DateTime.tryParse(validSaved), dateNaissance: (j['birth'] as String?) == null ? null : DateTime.tryParse(j['birth'] as String));
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
    member = Member(m.name, m.matricule, etab, m.since, fonction: m.fonction, ministere: m.ministere, photoPath: m.photoPath, photoData: m.photoData, validUntilOverride: m.validUntilOverride);
    notifyListeners();
    _save();
  }

  // Modification des informations locales du membre, bouton
  // « Modifier mes informations » de la page Carte, modèle web.
  // Nom, matricule, établissement et validité ne changent pas ici,
  // seuls la fonction et le ministère, qui sont locaux, sont édités.
  void updateLocalProfile({String? fonction, String? ministere, DateTime? dateNaissance, bool clearBirth = false}) {
    if (member == null) return;
    final m = member!;
    member = Member(m.name, m.matricule, m.etab, m.since, fonction: fonction ?? m.fonction, ministere: ministere ?? m.ministere, photoPath: m.photoPath, photoData: m.photoData, validUntilOverride: m.validUntilOverride, dateNaissance: clearBirth ? null : (dateNaissance ?? m.dateNaissance));
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
    unawaited(api.logout());
    // Rapports de bug en attente, 29 oct. 2026 : effacés, pour ne
    // pas les envoyer sous un autre compte à la prochaine connexion.
    unawaited(BugReports.instance.clearPending());
  }

  PayRequest createRequest(String kind, int amount, {List<PurchaseItem> items = const <PurchaseItem>[], String? serverRef, String method = 'Wave', String currency = '', String campName = '', int numeroVersement = 0, String evenementId = ''}) {
    final m = member!;
    // Référence serveur quand la demande a été créée côté serveur,
    // sinon référence locale provisoire, en attente de confirmation.
    final r = PayRequest(
        serverRef ??
            '${kind == 'don' ? 'DON' : kind == 'carte' ? 'CARTE' : kind == 'cotisation' ? 'COT' : kind == 'camp' ? 'CAMP' : 'ACH'}-${DateTime.now().millisecondsSinceEpoch}',
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
        evenementId: evenementId);
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

void go(BuildContext c, Widget page) => Navigator.of(c).push(MaterialPageRoute(builder: (_) => page));

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

Future<bool> openOrangeMoney() async {
  if (kOrangeMoneyUrl.isEmpty) return false;
  try {
    return await launchUrl(Uri.parse(kOrangeMoneyUrl), mode: LaunchMode.externalApplication);
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
Future<String?> choosePaymentMethod(BuildContext c, int amount) async {
  return showDialog<String>(
    context: c,
    builder: (ctx) => AlertDialog(
      title: Text(tr('Choisir le moyen de paiement')),
      content: Text(isEn ? 'Exact amount to confirm: ${fcfa(amount)}.\n\nThe request stays pending until payment is confirmed, or validated by the organisation after checking its account.\n\nFor PayPal, FCFA is not offered by PayPal: enter the equivalent in the currency PayPal offers, the organisation will check the equivalent received before validating.' : 'Montant exact à valider : ${fcfa(amount)}.\n\nLa demande restera en attente tant que le paiement n’a pas été confirmé, ou validé par la structure après contrôle de son compte.\n\nPour PayPal, le FCFA n’est pas proposé par PayPal : saisissez l’équivalent dans la devise proposée par PayPal, la structure vérifiera l’équivalent reçu avant de valider.'),
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
  if (method == 'Orange Money') return openOrangeMoney();
  if (method == 'PayPal') return openPayPal(currency: currency.isEmpty ? 'EUR' : currency, amountFcfa: amount);
  return openWave(amount);
}

/// Crée la demande « en attente » puis ouvre le moyen choisi.
/// Ne marque JAMAIS comme payé, Wave comme Orange Money. Quand le
/// membre est connecté au serveur, la demande est d'abord créée
/// côté serveur pour obtenir sa référence ; si le serveur ne peut
/// pas, on garde la demande locale et le lien de l'application.
/// La cotisation passe par la même route serveur qu'un don, car
/// le serveur n'a pas de type cotisation distinct.
Future<PayRequest?> startPayment(BuildContext c, String kind, int amount,
    {List<PurchaseItem> items = const <PurchaseItem>[], String? method, String? evenementId}) async {
  method ??= await choosePaymentMethod(c, amount);
  if (method == null) return null;
  if (method == 'Wave' && kWaveBaseUrl.isEmpty) {
    toast(c, tr('Le lien Wave de la structure n’est pas encore configuré.'));
    return null;
  }
  if (method == 'Orange Money' && kOrangeMoneyUrl.isEmpty) {
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
  if (api.isConnected) {
    try {
      if (kind == 'don') {
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
  final r = app.createRequest(kind, serverAmount, items: items, serverRef: serverRef, method: method, currency: paypalCurrency, campName: campName, numeroVersement: numeroVersement, evenementId: evenementId ?? '');
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
    // Wave / Orange Money. Si l'API a réussi, ok est vrai et
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
                app.setLang(app.lang == 'fr' ? 'en' : 'fr');
              },
              icon: Icon(Icons.language_outlined, color: const Color(0xFFD4A72C), size: desktop ? 20 : 16),
              label: Text(app.lang == 'fr' ? 'FR' : 'EN', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: desktop ? 14 : 12)),
            );
          }),
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
      leading: Icon(icon, color: Cp.navy),
      title: Text(label, style: t.labelLarge),
      subtitle: Text(sub, style: t.bodyMedium),
      trailing: const Icon(Icons.chevron_right_outlined, color: Cp.inkMuted),
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
  const F(this.key, this.label, {this.lines = 1, this.number = false, this.optional = false, this.initial = '', this.options = const [], this.dateRange = false});
  final String key, label, initial;
  final int lines;
  final bool number, optional, dateRange;
  final List<String> options;
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


/// Image d'un contenu : URL serveur en priorité (visible par tous les
/// appareils), sinon fichier local choisi dans l'espace structure.
/// Rien si aucune image n'a été ajoutée.
Widget contentImage(String imagePath, String imageUrl, {double height = 160, Uint8List? bytes}) {
  // Aperçu par octets, 30 oct. 2026 : sur le web, le chemin
  // d'ImagePicker est une adresse blob que Image.file ne peut pas
  // afficher. Les octets s'affichent partout, téléphone inchangé.
  if (bytes != null) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(Cp.radiusTile),
      child: Image.memory(bytes, height: height, width: double.infinity, fit: BoxFit.cover),
    );
  }
  if (imageUrl.isNotEmpty) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(Cp.radiusTile),
      child: Image.network(imageUrl, height: height, width: double.infinity, fit: BoxFit.cover,
          errorBuilder: (_, __, ___) => const SizedBox.shrink()),
    );
  }
  if (imagePath.isNotEmpty) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(Cp.radiusTile),
      child: Image.file(File(imagePath), height: height, width: double.infinity, fit: BoxFit.cover,
          errorBuilder: (_, __, ___) => const SizedBox.shrink()),
    );
  }
  return const SizedBox.shrink();
}

bool hasContentImage(String imagePath, String imageUrl) => imagePath.isNotEmpty || imageUrl.isNotEmpty;

/// Retraite locale, sans photo serveur : c'est elle qui porte
/// l'affiche du prototype sur l'accueil. La structure la remplace
/// en publiant la Retraite comme un vrai camp avec sa photo.
bool _isLocalRetreat(Camp camp) => camp.serverId.isEmpty && camp.name == 'Retraite de Jeûne & Prière';

/// Image d'accueil d'un camp, 29 oct. 2026 : la carte d'accueil
/// savait déjà afficher une image, mais l'image du camp ne lui
/// était jamais transmise, d'où des cartes sans affiche même pour
/// un camp qui a une photo. Ordre : photo serveur, puis fichier
/// local hors web, puis affiche de la Retraite locale, sinon rien.
ImageProvider? _campHomeImage(Camp camp) {
  if (camp.imageUrl.isNotEmpty) return NetworkImage(camp.imageUrl);
  if (!kIsWeb && camp.imagePath.isNotEmpty) return FileImage(File(camp.imagePath));
  if (_isLocalRetreat(camp)) return MemoryImage(base64Decode(kRetreatPosterBase64));
  return null;
}

/// Sélecteur de plage pour les dates de camp, 29 oct. 2026 : le champ
/// Dates reste un texte libre, modifiable à la main, et peut rester
/// vide. L'icône calendrier à droite ouvre un sélecteur de plage,
/// comme les sites de réservation de billets. Le sélecteur ne fait
/// qu'écrire, il ne relit jamais le texte déjà présent, et ne change
/// rien d'autre dans le formulaire. Format calqué sur les valeurs du
/// serveur, mois en français : même mois « 22 au 27 Août 2027 »,
/// mois différents « 28 juillet au 2 août 2027 », un seul jour la
/// date seule, « 22 Août 2027 ».
String formatCampRange(DateTime start, DateTime end) {
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  if (start.year == end.year && start.month == end.month && start.day == end.day) {
    return '${start.day} ${months[start.month - 1]} ${start.year}';
  }
  if (start.year == end.year && start.month == end.month) {
    return '${start.day} au ${end.day} ${months[start.month - 1]} ${start.year}';
  }
  if (start.year == end.year) {
    return '${start.day} ${months[start.month - 1].toLowerCase()} au ${end.day} ${months[end.month - 1].toLowerCase()} ${start.year}';
  }
  return '${start.day} ${months[start.month - 1].toLowerCase()} ${start.year} au ${end.day} ${months[end.month - 1].toLowerCase()} ${end.year}';
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

String formatProgramme(DateTime d) {
  if (isEn) return 'Scheduled for ${formatDateHeure(d)}';
  return 'Programmé pour le ${formatDateHeure(d)}';
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
    final time = await showTimePicker(
      context: context,
      initialTime: TimeOfDay.fromDateTime(start),
      helpText: tr('Choisissez une heure de publication'),
      cancelText: tr('Annuler'),
      confirmText: tr('Confirmer'),
      builder: themeOf,
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
        value == null ? tr('Publication immédiate. Sans date choisie, l’élément apparaît tout de suite pour les membres.') : formatProgramme(value!),
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

/// Variante de formSheet avec un champ image, 27 oct. 2026 : c'est
/// ce qui manquait dans l'espace structure. Le bouton ouvre la
/// galerie du téléphone (ImagePicker, déjà utilisé pour la photo de
/// profil), l'aperçu s'affiche dans le formulaire, et le chemin
/// choisi est rendu à onSubmit en plus des champs texte. L'image
/// reste facultative : un contenu sans image se publie comme avant.
/// Le téléversement serveur, lui, est fait par la fonction de
/// publication appelée ensuite, pas ici.
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
                        try {
                          final picked = await FilePicker.platform.pickFiles(
                            type: FileType.custom,
                            allowedExtensions: const ['pdf', 'epub'],
                            withData: true,
                          );
                          if (picked == null || picked.files.isEmpty) {
                            setS(() => livrePickError = 'Aucun fichier retenu. Choisissez un fichier PDF ou EPUB déjà téléchargé sur cet appareil.');
                          } else if (picked.files.single.bytes == null) {
                            setS(() => livrePickError = 'Ce fichier n’a pas pu être lu sur cet appareil. Réessayez avec un fichier déjà téléchargé, pas une archive.');
                          } else {
                            setS(() {
                              // Sur le web, `path` n'existe pas : seuls les octets servent,
                              // le téléversement passe alors par les octets (uploadLivre).
                              livrePath = kIsWeb ? null : picked.files.single.path;
                              livreBytes = picked.files.single.bytes;
                              livreName = picked.files.single.name;
                            });
                          }
                        } catch (e) {
                          setS(() => livrePickError = 'Impossible de lire ce fichier. Réessayez avec un fichier PDF ou EPUB déjà téléchargé sur cet appareil.');
                        } finally {
                          setS(() => livrePicking = false);
                        }
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

  @override
  Widget build(BuildContext context) => MaterialApp(
        title: 'Connexion Prophétique',
        debugShowCheckedModeBanner: false,
        theme: buildTheme(),
        scrollBehavior: AppScrollBehavior(),
        home: const SplashScreen(),
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
      Future.delayed(
        Duration(milliseconds: reduceMotion ? 300 : 1800),
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
    // Écran de bienvenue des autorisations, 29 oct. 2026 : Android
    // seulement, premier lancement seulement. Android ne permet pas
    // de demander les autorisations dangereuses pendant
    // l'installation elle-même, c'est donc le premier lancement qui
    // les porte. Sur le web, jamais affiché.
    if (!kIsWeb && defaultTargetPlatform == TargetPlatform.android) {
      try {
        final prefs = await SharedPreferences.getInstance();
        if (prefs.getBool('permissions_bienvenue_vues') != true) {
          next = const PermissionsWelcomePage();
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

// Écran de bienvenue des autorisations, 29 oct. 2026 : affiché une
// seule fois, au premier lancement sur Android, jamais ensuite.
// Chaque autorisation est expliquée en français avant que le système
// ne pose la question. Refuser ici ne bloque rien : les demandes au
// moment de l'utilisation restent en filet de sécurité, et un refus
// définitif renvoie vers les réglages du téléphone.
class PermissionsWelcomePage extends StatefulWidget {
  const PermissionsWelcomePage({super.key});

  @override
  State<PermissionsWelcomePage> createState() => _PermissionsWelcomePageState();
}

class _PermissionsWelcomePageState extends State<PermissionsWelcomePage> with WidgetsBindingObserver {
  PermissionStatus? _notif;
  PermissionStatus? _camera;
  PermissionStatus? _photos;
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
    // Retour des réglages du téléphone : les statuts ont pu changer.
    if (state == AppLifecycleState.resumed) _refresh();
  }

  Future<void> _refresh() async {
    try {
      final n = await Permission.notification.status;
      final c = await Permission.camera.status;
      final p = await Permission.photos.status;
      if (mounted) setState(() {
        _notif = n;
        _camera = c;
        _photos = p;
      });
    } catch (_) {}
  }

  Future<void> _request(Permission permission) async {
    PermissionStatus status;
    try {
      status = await permission.request();
    } catch (_) {
      return;
    }
    if (!mounted) return;
    setState(() {
      if (permission == Permission.notification) _notif = status;
      if (permission == Permission.camera) _camera = status;
      if (permission == Permission.photos) _photos = status;
    });
  }

  Future<void> _requestAll() async {
    if (_busy) return;
    setState(() => _busy = true);
    await _request(Permission.notification);
    await _request(Permission.camera);
    await _request(Permission.photos);
    if (mounted) setState(() => _busy = false);
  }

  Future<void> _finish() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool('permissions_bienvenue_vues', true);
    } catch (_) {}
    if (!mounted) return;
    Navigator.of(context).pushReplacement(PageRouteBuilder(
      transitionDuration: Duration.zero,
      pageBuilder: (_, __, ___) => const AppShell(),
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
      Text(tr('Pour que tout fonctionne du premier coup, l’application a besoin de trois autorisations sur ce téléphone. Android ne permet pas de les demander pendant l’installation, c’est donc ici qu’elles se demandent.'), style: Theme.of(context).textTheme.bodyMedium),
      const SizedBox(height: Cp.s1),
      Text(tr('Tu peux les refuser : l’application les redemandera au moment de l’utilisation, ou tu pourras les activer dans les réglages du téléphone.'), style: Theme.of(context).textTheme.bodyMedium),
      const SizedBox(height: Cp.s2),
      _permCard(
        icon: Icons.notifications_outlined,
        title: tr('Notifications'),
        text: tr('Verset du jour chaque matin à 7 h, anniversaires, rappels de cotisation et alertes de paiement.'),
        status: _notif,
        permission: Permission.notification,
      ),
      const SizedBox(height: Cp.s2),
      _permCard(
        icon: Icons.photo_camera_outlined,
        title: tr('Appareil photo'),
        text: tr('Scanner le QR de la carte de membre et les présences aux activités.'),
        status: _camera,
        permission: Permission.camera,
      ),
      const SizedBox(height: Cp.s2),
      _permCard(
        icon: Icons.photo_library_outlined,
        title: tr('Photos et médias'),
        text: tr('Enregistrer ta carte et ton badge dans la galerie, et choisir ta photo de profil.'),
        status: _photos,
        permission: Permission.photos,
      ),
      const SizedBox(height: Cp.s3),
      SizedBox(
        width: double.infinity,
        height: 52,
        child: FilledButton(
          onPressed: _busy ? null : _requestAll,
          child: Text(_busy ? tr('En cours…') : tr('Tout demander')),
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

class AppShell extends StatefulWidget {
  const AppShell({super.key});

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  int _index = 0;
  int _seenHomeRequest = 0;
  Timer? _syncTimer;
  // Retour en haut, 29 oct. 2026 : un contrôleur par onglet, pour
  // que toute touche sur la barre du bas affiche l'onglet en haut
  // de page, jamais au milieu, que l'on soit déjà dessus ou que
  // l'on vienne d'un autre onglet.
  final _tabScroll = List.generate(6, (_) => ScrollController());

  @override
  void initState() {
    super.initState();
    // Adresses réelles, 30 oct. 2026 : à l'arrivée sur /bible,
    // /librairie, /carte, /communaute ou /plus, la section
    // correspondante s'ouvre. Sur téléphone, toujours l'accueil.
    _index = initialTabIndex();
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
      BugReports.currentScreen = const ['Accueil', 'Bible', 'Librairie', 'Carte', 'Communauté', 'Plus'][target];
    });
    _syncTimer = Timer.periodic(const Duration(seconds: 60), (_) {
      if (mounted && api.isConnected) unawaited(app.syncFromServer());
    });
  }

  @override
  void dispose() {
    _syncTimer?.cancel();
    for (final c in _tabScroll) {
      c.dispose();
    }
    super.dispose();
  }

  void _goTo(int i) {
    // Barre du bas, visiteur comme connecté, comme le modèle web,
    // avec la Librairie juste après Bible depuis le 28 oct. 2026 :
    // Accueil 0, Bible 1, Librairie 2, Carte 3, Communauté 4, Plus 5.
    final target = i.clamp(0, 5);
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
    BugReports.currentScreen = const ['Accueil', 'Bible', 'Librairie', 'Carte', 'Communauté', 'Plus'][i.clamp(0, 5)];
    final last = app.lastSyncAt;
    if (api.isConnected && (last == null || DateTime.now().difference(last).inSeconds > 60)) {
      unawaited(app.syncFromServer());
    }
  }

  @override
  Widget build(BuildContext context) {
    // Correctif 27 oct. 2026, mis à jour le 28 oct. 2026 : une seule
    // liste de pages, visiteur comme connecté. Camps, Établissements,
    // Actualités et Bureau sont dans Communauté, Dons, Mes achats,
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
      final pages = <Widget>[
        HomePage(onOpenCard: () => _goTo(3), onOpenBible: () => _goTo(1), onTab: _goTo, scrollController: _tabScroll[0]),
        BiblePage(scrollController: _tabScroll[1]),
        LibrairiePage(scrollController: _tabScroll[2]),
        CardPage(scrollController: _tabScroll[3]),
        CommunityPage(scrollController: _tabScroll[4]),
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
        rcText('nav_carte', tr('Carte')),
        rcText('nav_communaute', tr('Communauté')),
        rcText('nav_plus', tr('Plus')),
      ];
      setBrowserTabTitle(idx == 0
          ? 'Connexion Prophétique'
          : '${sectionTitles[idx]} – Connexion Prophétique');
      return Scaffold(
        body: WideCenter(child: KeyboardScroll(controller: _tabScroll[idx], child: IndexedStack(index: idx, children: pages))),
        bottomNavigationBar: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (app.currentTeaching != null) const MiniPlayerBar(),
            BottomNavWeb(index: idx, onTap: _goTo),
          ],
        ),
      );
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
  // Carte anniversaire, 29 oct. 2026 : calculée avec le verset,
  // à chaque ouverture et à chaque changement de langue, à
  // partir de la date du téléphone.
  HomeVerse? _birthdayVerse;
  String _verseLang = '';
  final _verseHqAudio = HighQualityBibleAudio();
  bool _speakingHqVerse = false;
  int _verseHqIndex = -1;

  @override
  void initState() {
    super.initState();
    _gameLang = app.lang;
    _game = app.drawQuiz(5, _gameLang);
    _loadVerse();
  }

  @override
  void dispose() {
    verseTts.stop();
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

  Future<void> _loadVerse() async {
    final lang = app.lang;
    final ref = await BibleService.instance.rotatingVerse(lang);
    if (!mounted || app.lang != lang) return;
    final hqIndex = BibleService.instance.rotatingIndex(lang);
    // Anniversaire du membre connecté, calculé ici, car la Bible
    // est chargée à ce stade.
    final now = DateTime.now();
    final birth = app.member?.dateNaissance;
    HomeVerse? bVerse;
    if (birth != null && isBirthdayToday(birth, now)) {
      final bv = birthdayVerse(lang);
      if (bv != null) {
        bVerse = HomeVerse(
          text: bv.text,
          ref: BibleService.instance.label(lang, bv.book, bv.chapter, bv.verse),
          version: lang == 'fr' ? 'Louis Segond' : 'King James',
        );
      }
    }
    setState(() {
      _verseLang = lang;
      _verseHqIndex = hqIndex;
      _verse = HomeVerse(
        text: ref.text,
        ref: BibleService.instance.label(lang, ref.book, ref.chapter, ref.verse),
        version: lang == 'fr' ? 'Louis Segond' : 'King James',
      );
      _birthdayVerse = bVerse;
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

  Future<void> _toggleVerseAudio() async {
    if (_speakingHqVerse) {
      await _verseHqAudio.stop();
      if (mounted) setState(() => _speakingHqVerse = false);
    }
    final v = _verse;
    if (v == null) return;
    if (_speaking) {
      await verseTts.stop();
      if (mounted) setState(() => _speaking = false);
      return;
    }
    setState(() => _speaking = true);
    final ok = await verseTts.speak(v.text, app.lang);
    if (mounted) {
      setState(() => _speaking = false);
      if (!ok) toast(context, audioFailureMessage());
    }
  }

  Future<void> _toggleVerseHqAudio() async {
    if (_speakingHqVerse) {
      await _verseHqAudio.stop();
      if (mounted) setState(() => _speakingHqVerse = false);
      return;
    }
    if (app.lang != 'fr' || _verseHqIndex < 0) return;
    await verseTts.stop();
    if (mounted) setState(() => _speaking = false);
    setState(() => _speakingHqVerse = true);
    final ok = await _verseHqAudio.playUrl(bibleHqVerseUrl(_verseHqIndex), onDone: () {
      if (mounted) setState(() => _speakingHqVerse = false);
    });
    if (!ok && mounted) {
      setState(() => _speakingHqVerse = false);
      toast(context, tr('Audio haute qualité pas encore en ligne, lecture avec la voix de votre appareil.'));
      await _toggleVerseAudio();
    }
  }

  @override
  Widget build(BuildContext context) {
    _syncLang();
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
      return StreamBuilder<PlayerState>(
        stream: app.bgPlayer.playerStateStream,
        builder: (ctx, snap) {
          final annoncePlaying = snap.data?.playing ?? false;
          return HomeWeb(
        scrollController: widget.scrollController,
        visitor: app.member == null,
        language: app.lang == 'fr' ? 'FR' : 'EN',
        unreadCount: app.unreadNotifications,
        cotisationReminder: app.hasCotisationReminder,
        birthdayVerse: _birthdayVerse,
        // Logo complet, jamais rogné : contain, pas cover, dans le
        // carré noir 36x36 de l'en-tête de l'accueil.
        logo: const WebAssetImage(asset: 'assets/logo.png', partUrls: kLogoParts, fit: BoxFit.contain),
        verse: _verse,
        quiz: quizHome,
        scopes: scopes,
        scopeIndex: scope,
        events: [
          for (final camp in app.camps)
            HomeEvent(
              title: camp.name,
              date: camp.dates.isEmpty ? null : camp.dates,
              place: camp.place.isEmpty ? null : camp.place,
              image: _campHomeImage(camp),
              onTap: () => go(c, const CampsPage()),
            ),
        ],
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
        news: [for (final n in filteredNews) HomeNews(title: n.title, text: n.text)],
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
        onRetry: () {
          toast(c, tr('Synchronisation en cours…'));
          unawaited(app.syncFromServer().then((_) {
            if (app.serverStatus == 'erreur' && c.mounted) {
              toast(c, tr('Serveur toujours injoignable. Vérifiez votre connexion, puis réessayez.'));
            }
          }));
        },
        actions: HomeActions(
          onSignup: () => go(c, const ProfilePage()),
          // Quitter le mode visiteur, dans l'application : passer à l'inscription,
          // l'application n'ayant pas d'écran de sortie visiteur séparé.
          onQuitVisitor: () => go(c, const ProfilePage()),
          onLanguage: _toggleLanguage,
          onBag: () => go(c, const MyPurchasesPage()),
          onBell: () => go(c, const NotificationsPage()),
          onPayCotisation: () async {
            await startPayment(c, 'cotisation', 1000);
          },
          onProfile: () => go(c, const ProfilePage()),
          onCreateCard: app.member == null ? () => go(c, const ProfilePage()) : widget.onOpenCard,
          onBible: widget.onOpenBible,
          onQuiz: () => go(c, const QuizPage()),
          onTeachings: () => go(c, const TeachingsPage()),
          onPrayer: () => go(c, const PrayerPage()),
          onReadChapter: widget.onOpenBible,
          // Bible audio de la version web : synthèse vocale de l'appareil,
          // jamais une voix clonée. Mention du web reprise dans le texte
          // de la carte verset ; ici, lecture ou arrêt du verset affiché.
          onListen: _toggleVerseAudio,
          onListenHq: (app.lang == 'fr' && _verseHqIndex >= 0) ? _toggleVerseHqAudio : null,
          // Verset partageable en image, lot 1, 31 oct. 2026 : le bouton
          // Partager de la carte ouvre l'aperçu de l'image du verset,
          // au lieu d'envoyer le texte seul.
          onShare: _verse == null
              ? null
              : () => showVerseShareDialog(c, _verse!),
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
          onSendPrayer: () => go(c, const PrayerPage()),
          onTab: widget.onTab,
        ),
      );
        },
      );
    });
  }
}

class VerseCard extends StatefulWidget {
  const VerseCard({super.key, this.lang = 'fr'});
  final String lang;

  @override
  State<VerseCard> createState() => _VerseCardState();
}

class _VerseCardState extends State<VerseCard> {
  late Future<BibleVerseRef> _future;

  @override
  void initState() {
    super.initState();
    _future = BibleService.instance.rotatingVerse(widget.lang);
  }

  @override
  void didUpdateWidget(covariant VerseCard oldWidget) {
    super.didUpdateWidget(oldWidget);
    // Langue globale changée depuis une autre page : recharger le verset
    // dans la nouvelle langue, au lieu de garder l'ancien verset.
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
            : 'L’Éternel est mon berger : je ne manquerai de rien.';
        final label = ref != null
            ? '${BibleService.instance.label(widget.lang, ref.book, ref.chapter, ref.verse)} — ${widget.lang == 'fr' ? 'Louis Segond' : 'King James'}'
            : 'Psaumes 23:1 — Louis Segond';
        return Container(
          padding: const EdgeInsets.all(Cp.s2),
          decoration: BoxDecoration(
            color: Cp.verseTint,
            borderRadius: BorderRadius.circular(Cp.radiusCard),
            border: Border.all(color: Cp.verseLine),
          ),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(tr('Verset du jour'), style: t.titleMedium),
            const SizedBox(height: Cp.s1),
            Text(text, style: t.bodyMedium),
            const SizedBox(height: Cp.s1),
            Text(label, style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: Cp.ink)),
            Align(
              alignment: Alignment.centerRight,
              child: TextButton.icon(
                onPressed: () => setState(() => _future = BibleService.instance.advanceVerse(widget.lang)),
                icon: const Icon(Icons.refresh_outlined, size: 18),
                label: Text(tr('Autre verset')),
              ),
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
              Icon(icon, size: 28, color: Cp.navy),
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
            Icon(icon, color: Cp.navy, size: 24),
            const SizedBox(width: Cp.s2),
            Expanded(child: Text(label, style: Theme.of(context).textTheme.labelLarge)),
            const Icon(Icons.chevron_right_outlined, color: Cp.inkMuted),
          ]),
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════
// 6. PROFIL ET CARTE DE MEMBRE
// ═══════════════════════════════════════════════════════════════════
class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

/// Indicatifs de tous les pays, 27 oct. 2026 :
/// Côte d'Ivoire en premier, puis ordre alphabétique français.
/// Les pays qui partagent un même indicatif sont regroupés sur
/// une seule ligne, car le menu déroulant exige une valeur unique :
/// +1 pour États-Unis, Canada et les autres pays du plan nord
/// américain, +7 pour Russie et Kazakhstan, +44 pour Royaume-Uni
/// et dépendances, +590 pour Guadeloupe, Saint-Barthélemy et
/// Saint-Martin. Aucun numéro n'est inventé : l'indicatif choisi
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
  ('+1', tr('États-Unis et Canada')),
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

/// Normalisation unique d'un numéro, 27 oct. 2026, pour ne plus
/// créer de doublon selon le format tapé : espaces, tirets, points
/// et parenthèses retirés, 00 initial remplacé par +, numéro local
/// avec indicatif choisi et 0 initial retiré, numéro international
/// avec 0 de tronc conservé après l'indicatif retiré, par exemple
/// +225 07 49 36 94 33 devient +225749369433, comme à l'inscription.
/// Un e-mail est renvoyé tel quel, sans toucher à l'arobase.
String normalizePhone(String raw, String dialCode) {
  final cleaned = raw.trim().replaceAll(RegExp(r'[\s\-\.\(\)]'), '');
  if (cleaned.isEmpty || cleaned.contains('@')) return cleaned;
  var digits = cleaned;
  if (digits.startsWith('00')) digits = '+${digits.substring(2)}';
  if (digits.startsWith('+')) {
    final body = digits.substring(1);
    final codes = countryCodes().map((c) => c.$1.substring(1)).toList()
      ..sort((a, b) => b.length.compareTo(a.length));
    for (final code in codes) {
      if (body.startsWith(code)) {
        final rest = body.substring(code.length);
        if (rest.startsWith('0')) return '+$code${rest.substring(1)}';
        return digits;
      }
    }
    return digits;
  }
  return '$dialCode${digits.startsWith('0') ? digits.substring(1) : digits}';
}

class _ProfilePageState extends State<ProfilePage> {
  // Inscription et connexion serveur, comme sur la version web :
  // le matricule vient du serveur, jamais d'un compteur local.
  // Fonction et ministère n'existent pas côté serveur : ils restent
  // conservés sur cet appareil seulement.
  bool _register = true;
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
  String _dialCode = '+225';
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
        if (tel.isEmpty && mail.isEmpty) throw ApiException(tr('Renseignez un téléphone ou un e-mail.'));
        if (_etab == null) throw ApiException(tr('Choisissez votre établissement.'));
        if (_fonctionChoisie == null) throw ApiException(tr('Choisissez une fonction dans la liste.'));
        final created = await api.register(
          nomComplet: name,
          motDePasse: password,
          email: mail.isEmpty ? null : mail,
          telephone: tel.isEmpty ? null : tel,
          etablissementId: etabId,
          fonction: _fonctionChoisie,
          dateNaissance: _birthDate == null ? null : birthIso(_birthDate!),
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
          final changed = await Navigator.of(context).push<bool>(
            MaterialPageRoute(builder: (_) => const ForcedPasswordPage()),
          );
          if (changed != true) return;
        }
        moi = await api.fetchMoi();
      }
      await app.setServerMember(moi, fonction: _fonctionChoisie ?? '', photoPath: _photoPath);
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
        if (m.fonction.isNotEmpty && m.fonction != 'Aucun') ...[const SizedBox(height: Cp.s1), Text(isEn ? 'Role: ${m.fonction}' : 'Fonction : ${m.fonction}', style: t.bodyMedium)],
        if (m.ministere.isNotEmpty) ...[const SizedBox(height: Cp.s1), Text(isEn ? 'Ministry: ${m.ministere}' : 'Ministère : ${m.ministere}', style: t.bodyMedium)],
        const SizedBox(height: Cp.s1),
        Text(isEn ? 'Valid until: ${m.validUntil.month.toString().padLeft(2, '0')}/${m.validUntil.year}' : 'Valide jusqu’au : ${m.validUntil.month.toString().padLeft(2, '0')}/${m.validUntil.year}', style: t.bodyMedium),
        const SizedBox(height: Cp.s3),
        SizedBox(
          height: 52,
          child: FilledButton.icon(
            onPressed: () => go(context, const CardPage()),
            icon: const Icon(Icons.credit_card_outlined),
            label: Text(tr('Voir ma carte')),
          ),
        ),
        const SizedBox(height: Cp.s2),
        SizedBox(
          height: 52,
          child: OutlinedButton.icon(
            onPressed: () => go(context, const JournalPage()),
            icon: const Icon(Icons.book_outlined),
            label: Text(tr('Journal personnel')),
          ),
        ),
        const SizedBox(height: Cp.s2),
        SizedBox(
          height: 52,
          child: OutlinedButton.icon(
            onPressed: () => go(context, const EpanouissementPage()),
            icon: const Icon(Icons.timer_outlined),
            label: Text(tr('Minuteur de prière')),
          ),
        ),
        const SizedBox(height: Cp.s2),
        SizedBox(
          height: 52,
          child: OutlinedButton.icon(
            onPressed: () async {
              final ok = await showDialog<bool>(
                context: context,
                builder: (ctx) => AlertDialog(
                  title: Text(tr('Se déconnecter ?')),
                  content: Text(tr('Votre profil sera retiré de cet appareil. Vous pourrez vous inscrire de nouveau à tout moment.')),
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
        // et le ministère se règlent après, sur la carte, avec
        // « Modifier mes informations ».
        TextField(
          controller: _name,
          textCapitalization: TextCapitalization.words,
          decoration: _dec(tr('Nom et prénom')),
        ),
        const SizedBox(height: Cp.s2),
        Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
          SizedBox(
            width: 132,
            child: DropdownButtonFormField<String>(
              value: _dialCode,
              selectedItemBuilder: (context) => [for (final c in countryCodes()) Text(c.$1, overflow: TextOverflow.ellipsis)],
              items: [for (final c in countryCodes()) DropdownMenuItem(value: c.$1, child: Text('${c.$1} ${c.$2}', overflow: TextOverflow.ellipsis))],
              onChanged: (v) {
                if (v != null) setState(() => _dialCode = v);
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
        Text(tr('Choisissez votre indicatif, puis saisissez votre numéro local, sans indicatif.'), style: Theme.of(context).textTheme.bodyMedium),
        const SizedBox(height: Cp.s2),
        TextField(
          controller: _email,
          keyboardType: TextInputType.emailAddress,
          decoration: _dec(tr('E-mail')),
        ),
        const SizedBox(height: Cp.s2),
        DropdownButtonFormField<String>(
          value: _etab,
          items: [for (final e in app.etabs) DropdownMenuItem(value: e.name, child: Text(etabDisplayName(e.name))), DropdownMenuItem(value: 'Autre', child: Text(tr('Autre')))],
          onChanged: (v) => setState(() => _etab = v),
          decoration: _dec(tr('Établissement')),
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
        const SizedBox(height: Cp.s2),
        // Date de naissance facultative, 29 oct. 2026 : elle ne sert
        // qu'à recevoir un message le jour de l'anniversaire. Elle
        // n'est jamais obligatoire et reste modifiable ensuite.
        Card(
          child: ListTile(
            title: Text(_birthDate == null ? tr('Date de naissance (facultative)') : birthLabel(_birthDate!)),
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
              child: DropdownButtonFormField<String>(
                value: _dialCode,
                selectedItemBuilder: (context) => [for (final c in countryCodes()) Text(c.$1, overflow: TextOverflow.ellipsis)],
                items: [for (final c in countryCodes()) DropdownMenuItem(value: c.$1, child: Text('${c.$1} ${c.$2}', overflow: TextOverflow.ellipsis))],
                onChanged: (v) {
                  if (v != null) setState(() => _dialCode = v);
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
        Text(_loginByEmail ? tr('Saisissez l’e-mail de votre compte.') : tr('Choisissez votre indicatif, puis saisissez votre numéro local, sans indicatif, ou votre numéro complet avec +.'), style: Theme.of(context).textTheme.bodyMedium),
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
      // Mot de passe oublié, 29 oct. 2026 : aucun envoi automatique,
      // le membre doit contacter la structure, qui lui remettra un
      // temporaire par l'administrateur général.
      if (!_register) ...[
        const SizedBox(height: Cp.s1),
        Align(
          alignment: Alignment.centerLeft,
          child: TextButton(
            onPressed: () => showDialog(
              context: context,
              builder: (ctx) => AlertDialog(
                title: Text(tr('Mot de passe oublié ?')),
                content: Text(tr('Contacte la structure : un administrateur général te remettra un mot de passe temporaire, valable 24 heures, à changer à ta première connexion. Aucun e-mail n’est envoyé.')),
                actions: [
                  FilledButton(onPressed: () => Navigator.pop(ctx), child: Text(tr('Compris'))),
                ],
              ),
            ),
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
    return ClipRRect(
              borderRadius: BorderRadius.circular(24),
              child: Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Cp.navy,
                  border: Border.all(color: const Color(0xFF8A6A12), width: 1),
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
                const WebAssetImage(asset: 'assets/logo.png', partUrls: kLogoParts, height: 40),
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
                      border: Border.all(color: const Color(0xFF34D399), width: 1),
                    ),
                    child: Text(isEn ? 'Contribution up to date' : 'Cotisation à jour',
                        style: const TextStyle(color: Color(0xFF34D399), fontSize: 11, fontWeight: FontWeight.w700)),
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

class _CardPageState extends State<CardPage> {
  final _cardKey = GlobalKey();
  bool _sharing = false;
  bool _creating = false;

  // Téléchargement de la carte, modèle web, 27 oct. 2026 : la
  // carte affichée est capturée en image PNG, téléchargée dans
  // Téléchargements, puis partagée si demandé. La carte web est
  // large, plus large que haute : l'ancienne garde portrait,
  // qui refusait une capture plus large que haute, est donc
  // supprimée, sinon la carte web ne se téléchargerait jamais.
  Future<File?> _captureCardPng(BuildContext c) async {
    final boundary = _cardKey.currentContext?.findRenderObject() as RenderRepaintBoundary?;
    if (boundary == null) {
      if (c.mounted) toast(c, tr('La carte n’est pas encore affichée.'));
      return null;
    }
    final image = await boundary.toImage(pixelRatio: 3);
    final bytes = await image.toByteData(format: ui.ImageByteFormat.png);
    final png = bytes?.buffer.asUint8List();
    if (png == null || png.isEmpty) {
      if (c.mounted) toast(c, tr('Impossible de créer l’image de la carte.'));
      return null;
    }
    final file = await saveToDownloads(png, 'carte-membre-connexion-prophetique.png');
    if (c.mounted) toast(c, 'Carte téléchargée : carte-membre-connexion-prophetique.png');
    return file;
  }

  Future<void> _downloadCard(BuildContext c) async {
    if (_sharing) return;
    setState(() => _sharing = true);
    try {
      await _captureCardPng(c);
    } catch (_) {
      if (c.mounted) toast(c, tr('Impossible de télécharger la carte.'));
    } finally {
      if (mounted) setState(() => _sharing = false);
    }
  }

  Future<Uint8List?> _cardPngBytes(BuildContext c) async {
    final boundary = _cardKey.currentContext?.findRenderObject() as RenderRepaintBoundary?;
    if (boundary == null) return null;
    final image = await boundary.toImage(pixelRatio: 3);
    final bytes = await image.toByteData(format: ui.ImageByteFormat.png);
    return bytes?.buffer.asUint8List();
  }

  // Carte JPG, modèle web, 27 oct. 2026 : la capture PNG est
  // décodée puis encodée en vrai JPEG, jamais un PNG renommé.
  Future<void> _downloadCardJpg(BuildContext c) async {
    if (_sharing) return;
    setState(() => _sharing = true);
    try {
      final png = await _cardPngBytes(c);
      if (png == null || png.isEmpty) {
        if (c.mounted) toast(c, tr('Impossible de créer l’image de la carte.'));
        return;
      }
      final decoded = img.decodePng(png);
      if (decoded == null) {
        if (c.mounted) toast(c, tr('Impossible de créer l’image de la carte.'));
        return;
      }
      final jpg = img.encodeJpg(decoded, quality: 90);
      final file = await saveToDownloads(jpg, 'carte-membre-connexion-prophetique.jpg');
      if (c.mounted) toast(c, 'Carte téléchargée : ${file.path.split('/').last}');
    } catch (_) {
      if (c.mounted) toast(c, tr('Impossible de télécharger la carte.'));
    } finally {
      if (mounted) setState(() => _sharing = false);
    }
  }

  // Changer ma photo, page Carte du prototype : galerie, puis
  // photo du membre, comme dans le formulaire de profil.
  Future<void> _changePhoto(BuildContext c) async {
    try {
      final picked = await ImagePicker().pickImage(source: ImageSource.gallery, maxWidth: 800, maxHeight: 800, imageQuality: 80);
      if (picked == null) return;
      app.setMemberPhoto(picked.path);
      if (c.mounted) toast(c, tr('Photo mise à jour.'));
      // Envoi au serveur, pour qu'elle réapparaisse à la prochaine
      // connexion : sans cet envoi, elle n'existe que sur ce
      // téléphone et disparaît à la déconnexion.
      final bytes = await picked.readAsBytes();
      final mime = picked.mimeType ?? 'image/jpeg';
      final dataUrl = 'data:$mime;base64,${base64Encode(bytes)}';
      final saved = await app.uploadMemberPhotoData(dataUrl);
      if (c.mounted) {
        if (saved) {
          toast(c, tr('Photo enregistrée : elle réapparaîtra à votre prochaine connexion.'));
        } else {
          toast(c, tr('Photo visible sur cet appareil seulement : envoi au serveur impossible, elle ne suivra pas après déconnexion.'));
        }
      }
    } catch (_) {
      if (c.mounted) toast(c, tr('Impossible de changer la photo.'));
    }
  }

  // Modifier mes informations, page Carte du prototype : seuls
  // la fonction et le ministère, qui sont locaux, sont édités.
  Future<void> _editInfo(BuildContext c, Member m) async {
    final ministere = TextEditingController(text: m.ministere);
    final fonctionItems = [...kFonctions, if (!kFonctions.contains(m.fonction) && m.fonction.isNotEmpty) m.fonction];
    var fonctionChoisie = fonctionItems.contains(m.fonction) ? m.fonction : null;
    // Date de naissance, 29 oct. 2026 : modifiable ici, jamais
    // obligatoire, effaçable. Seule la date complète du membre
    // lui-même est montrée, jamais à un autre membre.
    final oldBirth = m.dateNaissance;
    var birth = oldBirth;
    final ok = await showDialog<bool>(
      context: c,
      builder: (ctx) => StatefulBuilder(builder: (ctx, setS) => AlertDialog(
        title: Text(tr('Modifier mes informations')),
        content: SingleChildScrollView(child: Column(mainAxisSize: MainAxisSize.min, children: [
          DropdownButtonFormField<String>(
            value: fonctionChoisie,
            items: [for (final f in fonctionItems) DropdownMenuItem(value: f, child: Text(f, style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w600, color: Cp.navy)))],
            onChanged: (v) => setS(() => fonctionChoisie = v),
            decoration: const InputDecoration(labelText: 'Fonction'),
          ),
          const SizedBox(height: 8),
          TextField(controller: ministere, decoration: InputDecoration(labelText: tr('Ministère'))),
          const SizedBox(height: 8),
          ListTile(
            contentPadding: EdgeInsets.zero,
            title: Text(birth == null ? tr('Date de naissance (facultative)') : birthLabel(birth!)),
            subtitle: Text(tr('Pour recevoir un message le jour de ton anniversaire.')),
            trailing: Row(mainAxisSize: MainAxisSize.min, children: [
              if (birth != null)
                IconButton(
                  tooltip: tr('Effacer'),
                  icon: const Icon(Icons.clear_outlined),
                  onPressed: () => setS(() => birth = null),
                ),
              const Icon(Icons.calendar_month_outlined),
            ]),
            onTap: () async {
              final now = DateTime.now();
              final picked = await showDatePicker(
                context: ctx,
                initialDate: birth ?? DateTime(now.year - 30, now.month, now.day),
                firstDate: DateTime(1900),
                lastDate: now,
              );
              if (picked != null) setS(() => birth = picked);
            },
          ),
        ])),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Enregistrer'))),
        ],
      )),
    );
    if (ok == true) {
      final nouvelle = fonctionChoisie ?? '';
      app.updateLocalProfile(fonction: nouvelle, ministere: ministere.text.trim());
      if (nouvelle.isNotEmpty) {
        final saved = await api.updateFonction(nouvelle);
        if (c.mounted) {
          toast(c, saved
              ? tr('Informations mises à jour, fonction enregistrée : elle réapparaîtra à votre prochaine connexion.')
              : tr('Informations mises à jour sur cet appareil seulement : envoi au serveur impossible, la fonction ne suivra pas après déconnexion.'));
        }
      } else if (c.mounted) {
        toast(c, tr('Informations mises à jour.'));
      }
      // Date de naissance envoyée seulement si elle a changé, pour
      // ne pas écraser la date serveur à chaque modification de
      // fonction. Un échec serveur ne change rien en local.
      final birthChanged = (birth == null) != (oldBirth == null) ||
          (birth != null && oldBirth != null && birthIso(birth!) != birthIso(oldBirth));
      if (birthChanged) {
        final birthSaved = await api.updateDateNaissance(birth == null ? null : birthIso(birth!));
        if (birthSaved) {
          app.updateLocalProfile(dateNaissance: birth, clearBirth: birth == null);
          unawaited(scheduleBirthdayIfSoon());
        } else if (c.mounted) {
          toast(c, tr('Date de naissance non enregistrée sur le serveur : vérifiez votre connexion, puis réessayez.'));
        }
      }
    }
  }

  Future<void> _shareCard(BuildContext c) async {
    if (_sharing) return;
    setState(() => _sharing = true);
    try {
      final file = await _captureCardPng(c);
      if (file == null) return;
      await Share.shareXFiles(
        [XFile(file.path)],
        text: tr('Ma carte de membre CONNEXION PROPHETIQUE'),
      );
    } catch (_) {
      if (c.mounted) toast(c, tr('Impossible de partager la carte.'));
    } finally {
      if (mounted) setState(() => _sharing = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final m = app.member;
      final t = Theme.of(c).textTheme;
      if (m == null) {
        return basic(tr('Ma carte'), [
          EmptyNote(
            icon: Icons.credit_card_outlined,
            text: tr('La carte de membre est réservée aux membres. Créez votre profil pour obtenir votre matricule et votre QR.'),
            action: FilledButton(onPressed: () => go(c, const ProfilePage()), child: Text(tr('Créer un compte ou se connecter'))),
          ),
        ], controller: widget.scrollController);
      }
      // Carte à paiement unique, non obligatoire (27 oct. 2026) :
      // la création de compte reste gratuite et l'application reste
      // utilisable sans carte (Bible, camps, librairie, dons, etc.),
      // exactement comme le prototype web. Tant que la carte n'a pas
      // été payée puis validée par la structure, la carte complète
      // (photo, QR, matricule) n'est pas affichée : on affiche
      // l'explication et le bouton de création à 1000 FCFA.
      // Exception, 27 oct. 2026, comptes administrateur uniquement :
      // un compte administrateur voit sa carte complète sans payer,
      // pour administrer et tester ; les membres ordinaires gardent
      // la règle de paiement ci-dessus.
      if (!app.hasPaidCard(m.matricule) && !app.isAdmin) {
        final pendingCard = app.requests.where((r) => r.kind == 'carte' && r.matricule == m.matricule && !r.confirmed).toList();
        if (pendingCard.isNotEmpty) {
          return basic(tr('Ma carte'), [
            Card(
              child: Padding(
                padding: const EdgeInsets.all(Cp.s2),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(tr('Création de votre carte en attente'), style: t.titleMedium),
                  const SizedBox(height: Cp.s1),
                  Text(isEn ? 'Your card creation request (1,000 FCFA, one-off payment) is awaiting confirmation ${pendingCard.first.method}. Creating a request or clicking the link is never enough to mark the card as paid: the organisation must first validate the payment after checking its ${pendingCard.first.method} account.' : 'Votre demande de création de carte (1 000 FCFA, paiement unique) est en attente de confirmation ${pendingCard.first.method}. Une demande créée ou un clic sur le lien ne suffit jamais à marquer la carte comme payée : la structure doit d’abord valider le paiement après contrôle de son compte ${pendingCard.first.method}.', style: t.bodyMedium),
                  const SizedBox(height: Cp.s1),
                  Text(tr('Votre carte apparaîtra ici, avec son QR, dès que la structure aura validé votre paiement. En attendant, vous pouvez utiliser toute l’application sans carte : Bible, camps, librairie, dons, et le reste.'), style: t.bodyMedium),
                  const SizedBox(height: Cp.s2),
                  SizedBox(
                    width: double.infinity,
                    height: 52,
                    child: OutlinedButton.icon(
                      onPressed: () async {
                        await _openPayment(pendingCard.first.method, 1000, currency: pendingCard.first.currency);
                      },
                      icon: const Icon(Icons.account_balance_wallet_outlined),
                      label: Text(isEn ? 'Reopen ${pendingCard.first.method} (1,000 FCFA)' : 'Rouvrir ${pendingCard.first.method} (1 000 FCFA)'),
                    ),
                  ),
                  const SizedBox(height: Cp.s1),
                  SizedBox(
                    width: double.infinity,
                    height: 52,
                    child: OutlinedButton.icon(
                      onPressed: () => go(c, VerifyPaymentPage(request: pendingCard.first)),
                      icon: const Icon(Icons.verified_outlined),
                      label: Text(tr('Vérifier le reçu')),
                    ),
                  ),
                ]),
              ),
            ),
          ], controller: widget.scrollController);
        }
        return basic(tr('Ma carte'), [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(Cp.s2),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(tr('Créer ma carte de membre'), style: t.titleMedium),
                const SizedBox(height: Cp.s1),
                Text(tr('La création de la carte est un paiement unique de 1 000 FCFA, par Wave, Orange Money ou PayPal, dans l’application.'), style: t.bodyMedium),
                const SizedBox(height: Cp.s1),
                Text(tr('Ce paiement n’est pas obligatoire pour utiliser l’application : vous pouvez déjà lire la Bible, voir les camps, acheter des livres et donner, sans carte. La carte sert à vous identifier à l’entrée des activités, avec votre photo, votre matricule et votre QR.'), style: t.bodyMedium),
                const SizedBox(height: Cp.s1),
                Text(isEn ? 'Exact amount to confirm in the chosen method: 1,000 FCFA. The card will only appear after the organisation validates the payment, after checking its Wave, Orange Money or PayPal account.' : 'Montant exact à valider dans le moyen choisi : 1 000 FCFA. La carte n’apparaîtra qu’après validation du paiement par la structure, après contrôle de son compte Wave, Orange Money ou PayPal.', style: t.bodyMedium),
                const SizedBox(height: Cp.s2),
                SizedBox(
                  width: double.infinity,
                  height: 52,
                  child: FilledButton.icon(
                    onPressed: _creating
                        ? null
                        : () async {
                            setState(() => _creating = true);
                            try {
                              final r = await startPayment(c, 'carte', 1000);
                              if (r != null && c.mounted) {
                                toast(c, 'Demande créée, en attente de confirmation ${r.method}. Validez le montant exact dans ${r.method} : 1 000 FCFA.');
                              }
                            } finally {
                              if (mounted) setState(() => _creating = false);
                            }
                          },
                    icon: const Icon(Icons.credit_card_outlined),
                    label: Text(_creating ? tr('Création…') : tr('Créer ma carte : 1 000 FCFA')),
                  ),
                ),
              ]),
            ),
          ),
        ], controller: widget.scrollController);
      }
      // Recopie web, détail par détail, gabarit de la carte :
      // largeur maximale 360 px, centrée, jamais toute la largeur de
      // l'écran, même sur tablette. C'était l'écart signalé : avant,
      // la carte prenait toute la largeur avec un QR de 220 px.
      // Ici : marges 20 px, logo 44 px, photo rayon 30 px, nom 18 px,
      // QR dans un carré blanc 160 px, image QR 140 px.
      // Ordre strict, comme sur le web : logo, mention CARTE DE
      // MEMBRE, photo, nom, fonction, ministère, établissement,
      // MEMBRE NUMÉRO, QR, VALIDE JUSQU'AU, cotisation.
      return basic(tr('Ma carte'), [
        // Carte en portrait strict : aucun RotatedBox, aucun Transform,
        // aucune rotation dans ce widget. La carte est centrée, largeur
        // maximale 360 px, contenu en colonne verticale, QR droit et
        // centré. Le partage refuse en plus toute capture plus large
        // que haute (téléphone en paysage), voir _shareCard.
        // Carte de membre, modèle web, capture du 27 oct. 2026 :
        // fond bleu nuit, logo officiel en haut à gauche, photo
        // rectangulaire à bordure or à gauche, détails à droite,
        // en bas VALIDE JUSQU'AU, DURÉE, pastille Cotisation à jour
        // et QR à droite. Largeur pleine, pas 360 px, pour garder
        // la disposition web en paysage, avec repli sur écran
        // étroit par Expanded et textes à la ligne, jamais de
        // débordement. Le ministère, s'il est renseigné, s'affiche
        // entre la fonction et l'établissement, sans changer le
        // modèle web, qui ne l'affichait pas sur cet exemple.
        Text(isEn ? 'My member card' : 'Ma carte de membre',
            style: t.titleLarge?.copyWith(fontSize: 28, fontWeight: FontWeight.w800, color: Cp.navy)),
        const SizedBox(height: 4),
        Text(isEn ? 'Show the QR code at the entrance of services, camps and retreats to validate your attendance.' : 'Présentez le QR code à l’entrée des cultes, camps et retraites pour valider votre présence.',
            style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 14)),
        const SizedBox(height: Cp.s2),
        Center(
          child: RepaintBoundary(
            key: _cardKey,
            child: MemberCardView(m: m),
        ),
        ),
        const SizedBox(height: Cp.s2),
        // Validité en une seule ligne sous la carte, réorganisation
        // Carte, 30 oct. 2026 : mêmes données que la carte séparée
        // d'avant, durée, création, échéance et mois restants.
        Text(
          isEn
              ? 'Validity: 1 year, created ${m.since.month.toString().padLeft(2, '0')}/${m.since.year}, valid until ${m.validUntil.month.toString().padLeft(2, '0')}/${m.validUntil.year}. ${((m.validUntil.year - DateTime.now().year) * 12 + (m.validUntil.month - DateTime.now().month)).clamp(0, 12)} months left.'
              : 'Validité : 1 an, créée en ${m.since.month.toString().padLeft(2, '0')}/${m.since.year}, valide jusqu’au ${m.validUntil.month.toString().padLeft(2, '0')}/${m.validUntil.year}. Il reste ${((m.validUntil.year - DateTime.now().year) * 12 + (m.validUntil.month - DateTime.now().month)).clamp(0, 12)} mois de validité.',
          style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
        // Actions groupées, réorganisation Carte, 30 oct. 2026 :
        // enregistrer, portefeuille, photo, informations. La
        // déconnexion est seule tout en bas, séparée.
        Row(children: [
          Expanded(
            child: SizedBox(
              height: 52,
              child: FilledButton.icon(
                onPressed: _sharing ? null : () => _downloadCard(c),
                style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
                icon: const Icon(Icons.download_outlined),
                label: Text(_sharing ? tr('Préparation…') : tr('Carte PNG')),
              ),
            ),
          ),
          const SizedBox(width: Cp.s1),
          Expanded(
            child: SizedBox(
              height: 52,
              child: OutlinedButton.icon(
                onPressed: _sharing ? null : () => _downloadCardJpg(c),
                icon: const Icon(Icons.download_outlined),
                label: Text(_sharing ? tr('Préparation…') : tr('Carte JPG')),
              ),
            ),
          ),
        ]),
        const SizedBox(height: Cp.s1),
        Row(children: [
          Expanded(
            child: SizedBox(
              height: 52,
              child: OutlinedButton.icon(
                onPressed: _sharing ? null : () => _shareCard(c),
                icon: const Icon(Icons.account_balance_wallet_outlined),
                label: Text(_sharing ? tr('Préparation…') : tr('Ajouter au portefeuille')),
              ),
            ),
          ),
          const SizedBox(width: Cp.s1),
          Expanded(
            child: SizedBox(
              height: 52,
              child: OutlinedButton(
                onPressed: () => _changePhoto(c),
                child: Text(tr('Changer ma photo')),
              ),
            ),
          ),
        ]),
        const SizedBox(height: Cp.s1),
        SizedBox(
          width: double.infinity,
          height: 52,
          child: OutlinedButton(
            onPressed: () => _editInfo(c, m),
            child: Text(tr('Modifier mes informations')),
          ),
        ),
        const SizedBox(height: Cp.s2),
        // Rappel de cotisation mensuelle, modèle web, 27 oct. 2026 :
        // pastille 1000 FCFA / mois, statut du mois en cours lu
        // dans les demandes cotisation confirmées, jamais inventé.
        Builder(builder: (ctx) {
          const monthsFr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
          const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          final now = DateTime.now();
          final monthName = isEn ? monthsEn[now.month - 1] : monthsFr[now.month - 1];
          final paidThisMonth = app.requests.any((r) => r.kind == 'cotisation' && r.matricule == m.matricule && r.confirmed && (r.confirmedAt ?? r.date).year == now.year && (r.confirmedAt ?? r.date).month == now.month);
          final cardConfirmed = app.requests.where((r) => r.kind == 'carte' && r.matricule == m.matricule && r.confirmed).toList();
          return Container(
            padding: const EdgeInsets.all(Cp.s2),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: Cp.verseLine, width: 1),
            ),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                Container(
                  width: 52,
                  height: 52,
                  decoration: BoxDecoration(color: Cp.verseTint, borderRadius: BorderRadius.circular(16)),
                  child: const Icon(Icons.account_balance_wallet_outlined, color: Cp.goldDeep, size: 24),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(isEn ? 'Contribution and card fee' : 'Cotisation et frais de carte', style: t.titleMedium),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                  decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(20)),
                  child: const Text('1000 FCFA / mois', style: TextStyle(color: Color(0xFFD4A72C), fontSize: 14, fontWeight: FontWeight.w700)),
                ),
              ]),
              const SizedBox(height: Cp.s1),
              Text(
                cardConfirmed.isNotEmpty
                    ? (isEn ? 'Card fee: 1,000 FCFA, one-off payment, confirmed by ${cardConfirmed.first.method}.' : 'Frais de carte : 1 000 FCFA, paiement unique, confirmés par ${cardConfirmed.first.method}.')
                    : (isEn ? 'Card fee: 1,000 FCFA, one-off payment. Card active.' : 'Frais de carte : 1 000 FCFA, paiement unique. Carte active.'),
                style: t.bodyMedium),
              const SizedBox(height: Cp.s1),
              Text(isEn ? 'The member contribution is 1,000 FCFA per month, to be paid each month.' : 'La cotisation des membres est de 1000 FCFA par mois, à régler chaque mois.', style: t.bodyMedium),
              const SizedBox(height: Cp.s1),
              Text(
                paidThisMonth
                    ? (isEn ? 'Contribution for $monthName ${now.year}: confirmed.' : 'Cotisation de $monthName ${now.year} : confirmée.')
                    : (isEn ? 'Contribution for $monthName ${now.year}: no confirmed payment for this month · 1,000 FCFA to pay.' : 'Cotisation de $monthName ${now.year} : aucun paiement confirmé pour ce mois-ci · 1000 FCFA à régler.'),
                style: t.bodyMedium),
              const SizedBox(height: Cp.s2),
              SizedBox(
                width: double.infinity,
                height: 52,
                child: FilledButton.icon(
                  onPressed: () async {
                    await startPayment(c, 'cotisation', 1000);
                  },
                  style: FilledButton.styleFrom(backgroundColor: Cp.goldDeep, foregroundColor: Colors.white),
                  icon: const Icon(Icons.favorite_border),
                  label: Text(isEn ? 'Pay my contribution: 1,000 FCFA' : 'Payer ma cotisation : 1 000 FCFA'),
                ),
              ),
              const SizedBox(height: Cp.s1),
              Text(isEn ? 'This reminder shows each month until the contribution for the month is confirmed by the organisation. Creating a request or clicking the payment link is never enough to mark the contribution as paid.' : 'Ce rappel s’affiche chaque mois tant que la cotisation du mois n’est pas confirmée par la structure. Une demande créée ou un clic sur le lien de paiement ne suffit jamais à marquer la cotisation comme payée.', style: t.bodyMedium),
            ]),
          );
        }),
        const SizedBox(height: Cp.s2),
        // Reçu de la carte, vérification d'achat : uniquement pour
        // une demande carte confirmée, jamais avant confirmation.
        // La facture détaillée s'affiche, et le PDF serveur se
        // télécharge quand la demande a été créée côté serveur.
        if (app.requests.where((r) => r.kind == 'carte' && r.matricule == m.matricule && r.confirmed).isNotEmpty) ...[
          const SizedBox(height: Cp.s2),
          Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 360),
              child: Card(
                child: Padding(
                  padding: const EdgeInsets.all(Cp.s2),
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text(tr('Reçu de paiement de la carte'), style: t.titleMedium),
                    const SizedBox(height: 4),
                    Text(isEn ? 'One-off payment of 1,000 FCFA, confirmed by ${app.requests.where((r) => r.kind == 'carte' && r.matricule == m.matricule && r.confirmed).first.method}.' : 'Paiement unique de 1 000 FCFA, confirmé par ${app.requests.where((r) => r.kind == 'carte' && r.matricule == m.matricule && r.confirmed).first.method}.', style: t.bodyMedium),
                    const SizedBox(height: 4),
                    Text(isEn ? 'Reference: ${app.requests.where((r) => r.kind == 'carte' && r.matricule == m.matricule && r.confirmed).first.ref}' : 'Référence : ${app.requests.where((r) => r.kind == 'carte' && r.matricule == m.matricule && r.confirmed).first.ref}', style: t.bodyMedium),
                    const SizedBox(height: Cp.s1),
                    SizedBox(
                      width: double.infinity,
                      height: 48,
                      child: OutlinedButton.icon(
                        onPressed: () => go(c, VerifyPaymentPage(request: app.requests.where((r) => r.kind == 'carte' && r.matricule == m.matricule && r.confirmed).first)),
                        icon: const Icon(Icons.verified_outlined),
                        label: Text(tr('Vérifier le reçu')),
                      ),
                    ),
                    const SizedBox(height: Cp.s1),
                    SizedBox(
                      width: double.infinity,
                      height: 48,
                      child: OutlinedButton.icon(
                        onPressed: () => go(c, InvoicePage(request: app.requests.where((r) => r.kind == 'carte' && r.matricule == m.matricule && r.confirmed).first)),
                        icon: const Icon(Icons.receipt_long_outlined),
                        label: Text(tr('Voir et télécharger le reçu')),
                      ),
                    ),
                  ]),
                ),
              ),
            ),
          ),
        ],
        const SizedBox(height: Cp.s2),
        // Carte d'information finale du prototype : QR et
        // établissement réels du membre, jamais les exemples web.
        // La phrase « régénéré à chaque affichage » du prototype
        // n'est pas reprise : le QR Flutter encode le matricule,
        // qui ne change pas.
        Card(
          child: Padding(
            padding: const EdgeInsets.all(Cp.s2),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                const Icon(Icons.shield_outlined, color: Cp.goldDeep, size: 24),
                const SizedBox(width: Cp.s1),
                Expanded(
                  child: Text.rich(TextSpan(
                    style: t.bodyMedium,
                    children: [
                      TextSpan(text: isEn ? 'The QR code on your card encodes your member number ' : 'Le QR code de votre carte encode votre matricule '),
                      TextSpan(text: m.matricule, style: const TextStyle(fontWeight: FontWeight.w700)),
                      TextSpan(text: isEn ? '. It can be scanned by the welcome team to record your attendance.' : '. Il peut être scanné par l’équipe d’accueil pour enregistrer votre présence.'),
                    ],
                  )),
                ),
              ]),
              const SizedBox(height: Cp.s1),
              Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                const Icon(Icons.apartment_outlined, color: Cp.goldDeep, size: 24),
                const SizedBox(width: Cp.s1),
                Expanded(
                  child: Text.rich(TextSpan(
                    style: t.bodyMedium,
                    children: [
                      TextSpan(text: isEn ? 'Establishment: ' : 'Établissement : '),
                      TextSpan(text: m.etab, style: const TextStyle(fontWeight: FontWeight.w700)),
                      TextSpan(text: isEn ? ' · Member since: ' : ' · Membre depuis : '),
                      TextSpan(text: '${m.since.year}', style: const TextStyle(fontWeight: FontWeight.w700)),
                    ],
                  )),
                ),
              ]),
            ]),
          ),
        ),
        const SizedBox(height: Cp.s2),
        // Textes d'explication repliés, réorganisation Carte,
        // 30 oct. 2026 : mêmes textes, derrière « En savoir plus ».
        ExpansionTile(
          title: Text(isEn ? 'Learn more' : 'En savoir plus', style: const TextStyle(fontWeight: FontWeight.w700, color: Cp.navy)),
          children: [
        Text(isEn ? 'How saving works: “Carte PNG / JPG” downloads the card image to Downloads. You can also share it to another app (WhatsApp, Files...), or open it from Downloads.' : 'Comment l’enregistrement fonctionne : « Carte PNG / JPG » télécharge l’image de la carte dans Téléchargements. Vous pouvez aussi l’envoyer vers une autre application (WhatsApp, Fichiers...), ou l’ouvrir depuis Téléchargements.', style: t.bodyMedium),
            const SizedBox(height: Cp.s1),
        Text(isEn ? 'Logging out only locks this device: your profile, card, registrations and contributions are kept, and you log back in from the opening screen with your phone number and member number.' : 'La déconnexion verrouille seulement cet appareil : votre profil, votre carte, vos inscriptions et vos contributions sont conservés, et vous vous reconnectez depuis l’écran d’ouverture avec votre numéro de téléphone et votre matricule.', style: t.bodyMedium),
          ],
        ),
        const SizedBox(height: Cp.s2),
        const Divider(height: 1, thickness: 1, color: Cp.line),
        const SizedBox(height: Cp.s2),
        SizedBox(
          width: double.infinity,
          height: 52,
          child: OutlinedButton(
            onPressed: () async {
              final ok = await showDialog<bool>(
                context: c,
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
                Navigator.of(c).popUntil((r) => r.isFirst);
              }
            },
            child: Text(tr('Déconnecter cet appareil')),
          ),
        ),
        const SizedBox(height: Cp.s2),
      ], controller: widget.scrollController);
    });
  }
}

// ═══════════════════════════════════════════════════════════════════
// 7. COMMUNAUTÉ ET PLUS
// ═══════════════════════════════════════════════════════════════════
class CommunityPage extends StatelessWidget {
  const CommunityPage({super.key, this.scrollController});
  final ScrollController? scrollController;

  @override
  Widget build(BuildContext context) {
    return basic(tr('Communauté'), [
      navCard([
        NavTile(icon: Icons.change_history_outlined, label: tr('Camps et retraites'), sub: tr('Inscription et pass numérique.'), onTap: () => go(context, const CampsPage())),
        NavTile(icon: Icons.apartment_outlined, label: tr('Établissements'), sub: tr('Activités et actualités de chaque établissement.'), onTap: () => go(context, const EtabsPage())),
        NavTile(icon: Icons.chat_bubble_outline, label: tr('Actualités'), sub: tr('Les nouvelles de la structure.'), onTap: () => go(context, const NewsPage())),
        NavTile(icon: Icons.people_outlined, label: tr('Bureau'), sub: tr('Les responsables de la structure.'), onTap: () => go(context, const BureauPage())),
      ]),
    ], controller: scrollController);
  }
}

class MorePage extends StatelessWidget {
  const MorePage({super.key, this.scrollController});
  final ScrollController? scrollController;

  void _admin(BuildContext c) {
    if (app.isAdmin) {
      go(c, const AdminPage());
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
      Widget tile(IconData icon, String label, String sub, VoidCallback onTap) {
        return InkWell(
          onTap: onTap,
          child: Padding(
            padding: const EdgeInsets.all(Cp.s2),
            child: Row(children: [
              Container(
                width: 64,
                height: 64,
                decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(16)),
                child: Icon(icon, color: Cp.gold, size: 32),
              ),
              const SizedBox(width: Cp.s2),
              Expanded(
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(label, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
                  const SizedBox(height: 2),
                  Text(sub, style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
                ]),
              ),
              const Icon(Icons.chevron_right_outlined, color: Cp.inkMuted),
            ]),
          ),
        );
      }
      return basic(tr('Plus'), [
        Text(isEn ? 'Your services and the app settings, grouped here.' : 'Vos services et les réglages de l’application, regroupés ici.', style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 16)),
        const SizedBox(height: Cp.s2),
        Container(
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
          child: Column(children: [
            tile(Icons.favorite_border, tr('Don'), tr('Dîmes & offrandes'), () => go(c, const DonsPage())),
            const Divider(height: 1, color: Cp.line),
            const Divider(height: 1, color: Cp.line),
            tile(Icons.account_balance_wallet_outlined, tr('Mes achats'), tr('Achats en attente et achats confirmés, avec Télécharger et la facture.'), () => go(c, const MyPurchasesPage())),
            const Divider(height: 1, color: Cp.line),
            if (!kIsWeb) tile(Icons.receipt_long_outlined, tr('Historique des transactions'), tr('Cotisations, dons, carte et achats, avec le détail de chaque opération.'), () => go(c, const TransactionHistoryPage())),
            if (!kIsWeb) const Divider(height: 1, color: Cp.line),
            tile(Icons.whatshot_outlined, tr('Mon épanouissement'), tr('Plan de lecture de 21 jours, journal privé et minuteur de prière.'), () => go(c, const EpanouissementPage())),
            tile(Icons.book_outlined, tr('Journal personnel'), tr('Vos notes personnelles, prières, gratitudes et objectifs, pour vous seul.'), () => go(c, const JournalPage())),
            const Divider(height: 1, color: Cp.line),
            if (app.isAdmin) tile(Icons.shield_outlined, tr('Espace structure'), tr('Paiements à valider et publications de la structure.'), () => _admin(c)),
            const Divider(height: 1, color: Cp.line),
            tile(Icons.bug_report_outlined, tr('Signaler un problème'), tr('Un plantage ou un écran qui ne marche pas ? Envoyez un rapport à la structure.'), () => go(c, const BugReportPage())),
            const Divider(height: 1, color: Cp.line),
            tile(Icons.info_outlined, tr('À propos & Aide'), tr('Ce que fait l’application, les données gardées, les paiements et l’aide par module.'), () => go(c, const AboutPage())),
          ]),
        ),
      ], controller: scrollController);
    });
  }
}

// Pages Plus, modèle web : À propos et Aide. Contenu limité aux
// faits déjà décidés (nom, devise, fonctions, politique publiée),
// sans membre, date, lieu ou tarif inventé.
class AboutPage extends StatelessWidget {
  const AboutPage({super.key});

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(tr('À propos'), [
      Text('CONNEXION PROPHETIQUE', style: t.titleLarge),
      const SizedBox(height: Cp.s1),
      Text(tr('Former pour mieux servir'), style: TextStyle(color: Color(0xFF8A6A12), fontSize: 16, fontWeight: FontWeight.w700)),
      const SizedBox(height: Cp.s2),
      // Qui sommes-nous, texte fourni par Axel le 27 oct. 2026,
      // en français, avec traduction anglaise fidèle en anglais.
      // L'adresse e-mail de contact n'est pas imprimée ici, car
      // le texte d'Axel portait des points d'interrogation devant
      // une adresse différente de celle déjà utilisée dans
      // l'application : la confirmation est en attente, et le
      // bouton ci-dessous utilise l'adresse déjà en place.
      Text(isEn ? 'Who are we?' : 'Qui sommes-nous ?', style: t.titleMedium),
      const SizedBox(height: Cp.s1),
      Text(isEn
          ? 'Founded in 2019 in Côte d’Ivoire, Connexion Prophétique is a Christian non-profit association committed to the moral, spiritual and social guidance of young people. Inspired by strong Christian values, the association works for lasting change within vulnerable communities.'
          : 'Créée en 2019 en Côte d’Ivoire, Connexion Prophétique est une association chrétienne à but non lucratif engagée dans l’encadrement moral, spirituel et social de la jeunesse. Inspirée par des valeurs chrétiennes fortes, l’association œuvre en faveur d’un changement durable au sein des communautés vulnérables.',
          style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      Text(isEn ? 'Our main missions' : 'Nos missions principales', style: t.titleMedium),
      const SizedBox(height: Cp.s1),
      Text(isEn
          ? 'Connexion Prophétique carries out its work around three priority areas:'
          : 'Connexion Prophétique déploie ses actions autour de trois axes prioritaires :',
          style: t.bodyMedium),
      const SizedBox(height: Cp.s1),
      Text(isEn
          ? 'Spiritual training and awareness: we promote Christian values and moral education, to prevent behavioural and social drift among young people.'
          : 'La formation spirituelle et la sensibilisation : nous promouvons les valeurs chrétiennes et l’éducation morale afin de prévenir les dérives comportementales et sociales chez les jeunes.',
          style: t.bodyMedium),
      const SizedBox(height: Cp.s1),
      Text(isEn
          ? 'The fight against pregnancy in schools: through prevention campaigns, listening sessions and educational support, we work to protect young girls and keep them in school.'
          : 'La lutte contre les grossesses en milieu scolaire : par des campagnes de prévention, des séances d’écoute et un accompagnement éducatif, nous œuvrons pour la protection et la continuité de la scolarité des jeunes filles.',
          style: t.bodyMedium),
      const SizedBox(height: Cp.s1),
      Text(isEn
          ? 'The reintegration of young people facing dependency: through rehabilitation programmes, vocational training and psychospiritual support, we help young people leave drug addiction and find an active place in society again.'
          : 'La réinsertion des jeunes en situation de dépendance : grâce à des programmes de réhabilitation, de formation professionnelle et de soutien psychospirituel, nous aidons les jeunes à sortir de la toxicomanie et à retrouver une place active dans la société.',
          style: t.bodyMedium),
      const SizedBox(height: Cp.s1),
      Text(isEn
          ? 'In addition, the association puts children from disadvantaged backgrounds through school, to offer them an alternative to the street, delinquency and exploitation in all its forms.'
          : 'En outre, l’association scolarise des enfants issus de milieux défavorisés afin de leur offrir une alternative à la rue, à la délinquance et à l’exploitation sous toutes ses formes.',
          style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      Text(isEn ? 'Get involved with us' : 'Engagez-vous à nos côtés', style: t.titleMedium),
      const SizedBox(height: Cp.s1),
      Text(isEn
          ? 'We believe lasting change is possible through solidarity and collective commitment. You can support this initiative with a contribution of any kind, financial, material, or voluntary, by writing to us at the address below.'
          : 'Nous croyons qu’un changement durable est possible grâce à la solidarité et à l’engagement collectif. Vous pouvez soutenir cette initiative en apportant votre contribution, quelle qu’en soit la nature (financière, matérielle, ou bénévole), en nous écrivant à l’adresse suivante :',
          style: t.bodyMedium),
      const SizedBox(height: Cp.s1),
      SizedBox(
        height: 52,
        child: OutlinedButton.icon(
          onPressed: () => openUrl(context, 'mailto:$kStructureEmail?subject=${Uri.encodeComponent('Soutien - CONNEXION PROPHETIQUE')}'),
          icon: const Icon(Icons.mail_outline),
          label: Text(tr('Écrire à la structure')),
        ),
      ),
      const SizedBox(height: Cp.s3),
      Text(isEn ? 'Bible, camps, member card and spiritual life. The app works online, with sync, and offline, with content already loaded on the device.' : 'Bible, camps, carte de membre et vie spirituelle. L’application fonctionne connectée, avec synchronisation, et déconnectée, avec les contenus déjà chargés sur l’appareil.', style: t.bodyMedium),
      const SizedBox(height: Cp.s3),
      SizedBox(
        height: 52,
        child: OutlinedButton.icon(
          onPressed: () => go(context, LinkViewPage(title: tr('Politique de confidentialité'), url: 'https://connexion-prophetique-site.onrender.com/privacy.html')),
          icon: const Icon(Icons.privacy_tip_outlined),
          label: Text(tr('Politique de confidentialité')),
        ),
      ),
      const SizedBox(height: Cp.s2),
      SizedBox(
        height: 52,
        child: OutlinedButton.icon(
          onPressed: () => go(context, const AidePage()),
          icon: const Icon(Icons.help_outline),
          label: Text(tr('Aide')),
        ),
      ),
    ]);
  }
}

class AidePage extends StatelessWidget {
  const AidePage({super.key});

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(tr('Aide'), [
      Text(tr('Utiliser l’application'), style: t.titleLarge),
      const SizedBox(height: Cp.s1),
      Text(tr('Consultez la Bible, les camps et les livres en mode visiteur. Créez un compte gratuitement pour utiliser l’application comme membre. La carte de membre se crée avec un paiement unique de 1 000 FCFA par Wave, Orange Money ou PayPal, non obligatoire pour utiliser l’application. Un don ou un achat reste en attente tant que le moyen choisi n’a pas confirmé, ou tant que la structure n’a pas validé après contrôle de son compte.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s3),
      SizedBox(
        height: 52,
        child: FilledButton.icon(
          onPressed: () => openUrl(context, 'mailto:$kStructureEmail?subject=${Uri.encodeComponent('Aide - CONNEXION PROPHETIQUE')}'),
          icon: const Icon(Icons.mail_outline),
          label: Text(tr('Écrire à la structure')),
        ),
      ),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════════════
// 8. BIBLE, QUIZ, ENSEIGNEMENTS, PRIÈRE
// ═══════════════════════════════════════════════════════════════════
// Bandeau compact du verset du jour, réorganisation Bible,
// 30 oct. 2026 : même verset tournant que la grande carte,
// même bouton Autre verset, en un bandeau fin. Toucher le
// bandeau ouvre le chapitre du verset, comme les autres
// tuiles de verset de l'application.
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
            color: Cp.verseTint,
            borderRadius: BorderRadius.circular(Cp.radiusTile),
            border: Border.all(color: Cp.verseLine),
          ),
          child: Row(children: [
            Expanded(
              child: InkWell(
                onTap: ref == null ? null : () => widget.onOpenChapter(ref.book, ref.chapter),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text('${tr('Verset du jour')} · $label',
                      style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.goldDeep)),
                  Text(text, maxLines: 2, overflow: TextOverflow.ellipsis, style: t.bodyMedium),
                ]),
              ),
            ),
            IconButton(
              tooltip: tr('Autre verset'),
              icon: const Icon(Icons.refresh_outlined, size: 20),
              onPressed: () => setState(() => _future = BibleService.instance.advanceVerse(widget.lang)),
            ),
          ]),
        );
      },
    );
  }
}

class BiblePage extends StatefulWidget {
  const BiblePage({super.key, this.initialBook, this.initialChapter, this.scrollController});
  final int? initialBook;
  final int? initialChapter;
  final ScrollController? scrollController;

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
  final _chapterHqAudio = HighQualityBibleAudio();
  bool _playingHqChapter = false;
  // Onglet Bible du modèle web : Lire, Rechercher, Dictionnaire, Favoris.
  String _tab = 'lire';
  // Vitesse de la carte Écouter, 27 oct. 2026 : même débit que le
  // verset du jour, 0,5, même voix, car les deux passent par le
  // même VerseTts. Les pastilles restent pour changer le débit du
  // chapitre seulement, si l'utilisateur le veut.
  double _speechRate = kBibleSpeechRate;
  int? _speakingFrom;

  @override
  void dispose() {
    verseTts.stop();
    _searchCtrl.dispose();
    _dictCtrl.dispose();
    _bookSearchCtrl.dispose();
    super.dispose();
  }

  void _stopChapterAudio() {
    if (_playingHqChapter) {
      _chapterHqAudio.stop();
      setState(() => _playingHqChapter = false);
    }
    if (_speakingChapter || _speakingFrom != null) {
      setState(() {
        _speakingChapter = false;
        _speakingFrom = null;
      });
    }
    verseTts.stop();
  }

  Future<void> _toggleChapterAudio(List<String> verses, {int from = 0}) async {
    if (_playingHqChapter) {
      await _chapterHqAudio.stop();
      if (mounted) setState(() => _playingHqChapter = false);
    }
    if (_speakingChapter) {
      _stopChapterAudio();
      return;
    }
    if (verses.isEmpty || from >= verses.length) return;
    setState(() {
      _speakingChapter = true;
      _speakingFrom = from;
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
      });
      if (!ok && !stoppedByUser) toast(context, audioFailureMessage());
    }
  }

  Future<void> _toggleChapterHqAudio() async {
    if (_playingHqChapter) {
      await _chapterHqAudio.stop();
      if (mounted) setState(() => _playingHqChapter = false);
      return;
    }
    final url = (_book == null || _chapter == null)
        ? null
        : bibleHqChapterUrl(_book!, _chapter!, app.lang);
    if (url == null) return;
    _stopChapterAudio();
    setState(() => _playingHqChapter = true);
    final ok = await _chapterHqAudio.playUrl(url, onDone: () {
      if (mounted) setState(() => _playingHqChapter = false);
    });
    if (!ok && mounted) {
      setState(() => _playingHqChapter = false);
      toast(context, tr('Audio haute qualité pas encore en ligne, lecture avec la voix de votre appareil.'));
    }
  }

  @override
  void initState() {
    super.initState();
    // Ouverture directe d'un chapitre, utilisée par le plan de lecture
    // de 21 jours de Mon épanouissement : l'index du livre est le même
    // dans les deux langues (ordre canonique des 66 livres).
    _book = widget.initialBook;
    _chapter = widget.initialChapter;
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

  Future<void> _toggleFav(BibleVerseRef r) async {
    await BibleService.instance.toggleFavorite(app.lang, r);
    final favs = await BibleService.instance.favorites(app.lang);
    if (!mounted) return;
    setState(() => _favorites = favs);
  }

  bool _isFav(BibleVerseRef r) =>
      _favorites.any((f) => f.book == r.book && f.chapter == r.chapter && f.verse == r.verse);

  // Soulignement, 27 oct. 2026 : un verset ou un mot du dictionnaire
  // qui intéresse la personne se souligne d'un trait or, et reste
  // souligné après fermeture, sur l'appareil seulement, comme les
  // favoris. Un nouvel appui enlève le soulignement.
  Future<void> _toggleHighlight(BibleVerseRef r) async {
    await BibleService.instance.toggleHighlight(app.lang, r);
    final hls = await BibleService.instance.highlights(app.lang);
    if (!mounted) return;
    setState(() => _highlights = hls);
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
        trailing: const Icon(Icons.chevron_right_outlined, color: Cp.goldDeep),
        onTap: onTap,
      ),
    );
  }

  Widget _bibleVerseRow(BibleVerseRef ref, List<String> verses, int i, bool fav, bool hl) {
    return Card(
      margin: const EdgeInsets.only(bottom: Cp.s1),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      child: InkWell(
        borderRadius: BorderRadius.circular(14),
        onTap: () => _markRead(ref),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(Cp.s2, Cp.s1, Cp.s1, Cp.s1),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              SizedBox(
                width: 30,
                child: Text('${ref.verse}', style: const TextStyle(fontWeight: FontWeight.w800, color: Cp.goldDeep, fontSize: 15)),
              ),
              Expanded(
                child: Text(verses[i],
                    style: TextStyle(
                        fontSize: 16.5,
                        height: 1.6,
                        color: Cp.ink,
                        decoration: hl ? TextDecoration.underline : null,
                        decorationColor: Cp.gold,
                        decorationThickness: 2)),
              ),
            ]),
            Row(mainAxisAlignment: MainAxisAlignment.end, children: [
              IconButton(
                tooltip: tr('Écouter à partir de ce verset'),
                icon: Icon(_speakingChapter && _speakingFrom == i ? Icons.stop_outlined : Icons.volume_up_outlined),
                onPressed: () => _toggleChapterAudio(verses, from: i),
              ),
              IconButton(
                tooltip: tr('Favori'),
                icon: Icon(fav ? Icons.star_outline : Icons.star_border, color: fav ? Cp.goldDeep : null),
                onPressed: () => _toggleFav(ref),
              ),
              IconButton(
                tooltip: tr('Souligner ce verset'),
                icon: Icon(Icons.format_underline_outlined, color: hl ? Cp.goldDeep : null),
                onPressed: () => _toggleHighlight(ref),
              ),
            ]),
          ]),
        ),
      ),
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
        onChanged: (q) => setState(() => _dictQuery = q.trim()),
        decoration: InputDecoration(
          hintText: isEn ? 'Search a word, in French or in Hebrew…' : 'Rechercher un mot, en français ou en hébreu…',
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
      children.add(Text(isEn ? '36 essential words, plus one key word for each of the 66 books, Hebrew for the Old Testament and Greek for the New Testament. Each word is checked against Strong’s lexicon and Brown-Driver-Briggs: its Strong number and its reference let you find it in any biblical library.' : '36 mots essentiels, plus un mot clé par livre, pour les 66 livres, en hébreu pour l’Ancien Testament et en grec pour le Nouveau Testament. Chaque mot est vérifié dans le lexique de Strong et Brown-Driver-Briggs : son numéro Strong et sa référence permettent de le retrouver dans n’importe quelle bibliothèque biblique.', style: t.bodyMedium));
      children.add(const SizedBox(height: Cp.s2));
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
            children.add(Card(
              child: ListTile(
                title: Text(svc.label(app.lang, h.book, h.chapter, h.verse),
                    style: const TextStyle(fontWeight: FontWeight.w700)),
                subtitle: Text(h.text),
                trailing: const Icon(Icons.chevron_right_outlined),
                onTap: () {
                  setState(() => _tab = 'lire');
                  _openHit(h);
                },
              ),
            ));
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
          children.add(Card(
            child: ListTile(
              leading: const Icon(Icons.star_outline, color: Cp.goldDeep),
              title: Text(svc.label(app.lang, f.book, f.chapter, f.verse)),
              subtitle: Text(f.text),
              trailing: const Icon(Icons.chevron_right_outlined),
              onTap: () {
                setState(() => _tab = 'lire');
                _openChapter(f.book, f.chapter);
              },
            ),
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
          children.add(Card(
            child: ListTile(
              title: Text(svc.label(app.lang, h.book, h.chapter, h.verse),
                  style: const TextStyle(fontWeight: FontWeight.w700)),
              subtitle: Text(h.text),
              trailing: const Icon(Icons.chevron_right_outlined),
              onTap: () => _openHit(h),
            ),
          ));
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
      children.add(Text('$bookName $_chapter', style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w800, color: Cp.navy, height: 1.15)));
      children.add(const SizedBox(height: 6));
      children.add(Container(width: 44, height: 4, decoration: BoxDecoration(color: Cp.gold, borderRadius: BorderRadius.circular(2))));
      children.add(const SizedBox(height: Cp.s1));
      children.add(Text(app.lang == 'fr' ? 'VERSION LOUIS SEGOND' : 'VERSION KING JAMES',
          style: const TextStyle(color: Cp.goldDeep, fontSize: 12, fontWeight: FontWeight.w700, letterSpacing: 1)));
      children.add(const SizedBox(height: Cp.s1));
      children.add(Text(tr('Touchez l’étoile à côté d’un verset pour l’enregistrer dans vos favoris.')));
      children.add(const SizedBox(height: Cp.s2));
      // Carte Écouter ce chapitre, modèle web : bouton Écouter,
      // vitesse de lecture, voix d'homme de l'appareil à rythme
      // posé, en français ou en anglais selon la version choisie.
      // Changer de chapitre ou de langue arrête la lecture.
      children.add(Card(
        child: Padding(
          padding: const EdgeInsets.all(Cp.s2),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(tr('Écouter ce chapitre'), style: t.titleMedium),
            const SizedBox(height: 4),
            Text(
              'Lu à voix haute par une voix d’homme de votre appareil, à rythme posé, en ${app.lang == 'fr' ? 'français (Louis Segond)' : 'anglais (King James)'}.',
              style: t.bodyMedium,
            ),
            const SizedBox(height: Cp.s1),
            Row(children: [
              Text(tr('Vitesse de lecture'), style: TextStyle(fontWeight: FontWeight.w700)),
              const SizedBox(width: Cp.s1),
              for (final speed in const [kBibleSpeechRate, 0.7, 0.9, 1.2])
                Padding(
                  padding: const EdgeInsets.only(right: 6),
                  child: ChoiceChip(
                    label: Text('${speed.toString().replaceAll('.', ',')}x'),
                    selected: _speechRate == speed,
                    onSelected: (_) {
                      _stopChapterAudio();
                      setState(() => _speechRate = speed);
                    },
                    selectedColor: Cp.gold,
                    labelStyle: TextStyle(fontWeight: FontWeight.w700, color: _speechRate == speed ? Cp.navy : Cp.ink),
                  ),
                ),
            ]),
            const SizedBox(height: Cp.s1),
            SizedBox(
              width: double.infinity,
              height: 52,
              child: FilledButton.icon(
                onPressed: () => _toggleChapterAudio(verses),
                icon: Icon(_speakingChapter ? Icons.stop_outlined : Icons.volume_up_outlined),
                label: Text(_speakingChapter ? tr('Arrêter') : tr('Écouter')),
              ),
            ),
            if (bibleHqChapterUrl(_book ?? -1, _chapter ?? -1, app.lang) != null) ...[
              const SizedBox(height: Cp.s1),
              SizedBox(
                width: double.infinity,
                height: 52,
                child: OutlinedButton.icon(
                  onPressed: _toggleChapterHqAudio,
                  icon: Icon(_playingHqChapter ? Icons.stop_outlined : Icons.high_quality_outlined),
                  label: Text(_playingHqChapter ? tr('Arrêter') : tr('Écouter en haute qualité')),
                ),
              ),
            ],
            const SizedBox(height: Cp.s1),
            Text(tr('Touchez l’icône haut-parleur d’un verset pour écouter à partir de ce verset. Changer de chapitre ou de langue arrête la lecture.')),
          ]),
        ),
      ));
      children.add(const SizedBox(height: Cp.s2));
      for (var i = 0; i < verses.length; i++) {
        final ref = BibleVerseRef(_book!, _chapter!, i + 1, verses[i]);
        final fav = _isFav(ref);
        final hl = _isHighlighted(ref);
        children.add(_bibleVerseRow(ref, verses, i, fav, hl));
      }
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
        children.add(Card(
          child: ListTile(
            leading: const Icon(Icons.history_outlined),
            title: Text(tr('Reprise de lecture')),
            subtitle: Text(
                '${svc.label(app.lang, _last!.book, _last!.chapter, _last!.verse)} — ${_last!.text}'),
            trailing: const Icon(Icons.chevron_right_outlined),
            onTap: () => _openChapter(_last!.book, _last!.chapter),
          ),
        ));
        children.add(const SizedBox(height: Cp.s1));
      }
      if (_favorites.isNotEmpty) {
        children.add(Text(tr('Favoris'), style: t.titleMedium));
        children.add(const SizedBox(height: Cp.s1));
        for (final f in _favorites) {
          children.add(Card(
            child: ListTile(
              leading: const Icon(Icons.star_outline, color: Cp.goldDeep),
              title: Text(svc.label(app.lang, f.book, f.chapter, f.verse)),
              subtitle: Text(f.text),
              trailing: const Icon(Icons.chevron_right_outlined),
              onTap: () => _openChapter(f.book, f.chapter),
            ),
          ));
        }
        children.add(const SizedBox(height: Cp.s2));
      }
      if (_highlights.isNotEmpty) {
        children.add(Text(tr('Versets soulignés'), style: t.titleMedium));
        children.add(const SizedBox(height: Cp.s1));
        for (final f in _highlights) {
          children.add(Card(
            child: ListTile(
              leading: const Icon(Icons.format_underline_outlined, color: Cp.goldDeep),
              title: Text(svc.label(app.lang, f.book, f.chapter, f.verse)),
              subtitle: Text(f.text,
                  style: const TextStyle(decoration: TextDecoration.underline, decorationColor: Cp.gold, decorationThickness: 2)),
              trailing: const Icon(Icons.chevron_right_outlined),
              onTap: () => _openChapter(f.book, f.chapter),
            ),
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
          children.add(Text(isEn ? 'Choose a testament or search for a book to see the list.' : 'Choisissez un testament ou recherchez un livre pour afficher la liste.', style: t.bodyMedium));
          children.add(const SizedBox(height: Cp.s1));
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

      // Réglage notification 7 h, réorganisation Bible, 30 oct. 2026 :
      // même réglage qu'avant, en une ligne plus interrupteur,
      // en bas de page au lieu d'une grande carte en haut.
      children.add(const SizedBox(height: Cp.s2));
      children.add(Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: Cp.s2, vertical: Cp.s1),
          child: Row(children: [
            const Icon(Icons.notifications_active_outlined, color: Cp.goldDeep),
            const SizedBox(width: Cp.s1),
            Expanded(
              child: Text(isEn ? 'Daily verse notification, every morning at 7 a.m.' : 'Verset du jour en notification, chaque matin à 7 h',
                  style: const TextStyle(fontWeight: FontWeight.w700, color: Cp.navy)),
            ),
            Switch(
              value: app.dailyVerseNotif,
              onChanged: (v) async {
                if (!v) {
                  app.setDailyVerseNotif(false);
                  await DailyVerseNotifications.instance.cancel();
                  if (mounted) setState(() {});
                  return;
                }
                await DailyVerseNotifications.instance.init();
                var granted = await DailyVerseNotifications.instance.permissionGranted();
                if (!granted) granted = await DailyVerseNotifications.instance.requestPermission();
                if (!granted) {
                  if (mounted) {
                    toast(context, isEn ? 'Notifications refused: enable them in the phone settings to receive the daily verse.' : 'Notifications refusées : activez-les dans les paramètres du téléphone pour recevoir le verset du jour.');
                  }
                  return;
                }
                app.setDailyVerseNotif(true);
                final ok = await DailyVerseNotifications.instance.scheduleWeek(app.lang);
                // L'anniversaire suit, après, car scheduleWeek annule tout.
                await scheduleBirthdayIfSoon();
                // Le rappel de cotisation suit aussi, pour survivre à
                // l'annulation de toutes les programmations.
                await scheduleCotisationIfDue();
                if (mounted) {
                  setState(() {});
                  if (!ok) {
                    toast(context, isEn ? 'Daily verse could not be scheduled. Open the Bible again and try.' : 'Verset du jour non programmé. Rouvrez la Bible et réessayez.');
                  }
                }
              },
            ),
          ]),
        ),
      ));
      // Alerte visible quand l'option est activée mais que le téléphone
      // bloque les notifications : sans elle, l'option affichée activée
      // ne programmait rien, car la permission n'avait jamais été
      // demandée quand l'utilisateur n'avait jamais touché l'interrupteur.
      // Android seulement : sur le web et sur iPhone, les notifications
      // locales de l'application n'existent pas.
      if (app.dailyVerseNotif && defaultTargetPlatform == TargetPlatform.android)
        children.add(FutureBuilder<bool>(
          future: DailyVerseNotifications.instance.permissionGranted(),
          builder: (c, snap) {
            if (snap.data == true) return const SizedBox.shrink();
            return Card(
              child: ListTile(
                title: Text(isEn ? 'Notifications blocked on this phone' : 'Notifications bloquées sur ce téléphone'),
                subtitle: Text(isEn ? 'The option is on, but the phone blocks notifications, so no verse arrives in the morning.' : 'L’option est activée, mais le téléphone bloque les notifications, donc aucun verset n’arrive le matin.'),
                trailing: FilledButton(
                  onPressed: () async {
                    await DailyVerseNotifications.instance.init();
                    final granted = await DailyVerseNotifications.instance.requestPermission();
                    if (!granted) {
                      if (mounted) {
                        toast(context, isEn ? 'Notifications refused: enable them in the phone settings to receive the daily verse.' : 'Notifications refusées : activez-les dans les paramètres du téléphone pour recevoir le verset du jour.');
                      }
                      return;
                    }
                    app.setDailyVerseNotif(true);
                    await DailyVerseNotifications.instance.scheduleWeek(app.lang);
                    // L'anniversaire suit, après, car scheduleWeek annule tout.
                    await scheduleBirthdayIfSoon();
                    if (mounted) setState(() {});
                  },
                  child: Text(isEn ? 'Allow' : 'Autoriser'),
                ),
              ),
            );
          },
        ));
    // Bouton quiz retiré de l'onglet Bible, 29 oct. 2026 : le
    // système de quiz lui-même et sa présence sur l'accueil
    // restent intacts, seule cette instance disparaît.
    return basic(tr('Bible'), children, controller: widget.scrollController);
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
            return const Padding(padding: EdgeInsets.all(24), child: Center(child: CircularProgressIndicator()));
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
      Text(q.question, style: t.titleLarge),
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

class TeachingsPage extends StatelessWidget {
  const TeachingsPage({super.key});

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
                  onPressed: () async {
                    final type = await pick<String>(c, tr('Musique ou enseignement ?'), [tr('Musique'), tr('Enseignement')], (s) => s);
                    if (type == null || !c.mounted) return;
                    final kind = type == tr('Musique') ? 'musique' : 'enseignement';
                    final artistLabel = kind == 'musique' ? tr('Artiste') : tr('Orateur');
                    audioFormSheet(c, kind == 'musique' ? tr('Nouvelle musique') : tr('Nouvel enseignement'), _teachingFields(kind, artistLabel), tr('Publier'), (v, imagePath, audioPath, audioBytes, audioName) {
                      final teaching = Teaching(v['title']!, v['speaker']!, v['url']!, kind: kind, imagePath: imagePath, thematique: v['thematique'] ?? '', format: v['format'] ?? '', duree: v['duree'] ?? '', dateTexte: v['date'] ?? '', description: v['desc'] ?? '');
                      app.teachings.insert(0, teaching);
                      app.changed();
                      _publishTeaching(c, teaching, audioPath: audioPath, audioBytes: audioBytes, audioName: audioName);
                    });
                  },
                ),
              ),
            ),
          if (app.isAdminGeneral)
            Padding(
              padding: const EdgeInsets.only(bottom: Cp.s1),
              child: SizedBox(
                width: double.infinity,
                height: 52,
                child: OutlinedButton.icon(
                  icon: const Icon(Icons.library_music_outlined),
                  label: Text(tr('Espace audio')),
                  onPressed: () => go(c, const AudioSpacePage()),
                ),
              ),
            ),
          if (app.teachings.isEmpty)
            EmptyNote(
              icon: Icons.headphones_outlined,
              text: tr('Aucun enseignement publié pour le moment. Un administrateur peut en ajouter depuis cette page.'),
            )
          else
            navCard([
              for (final x in app.teachings) ...[
                NavTile(
                  icon: x.kind == 'musique' ? Icons.music_note_outlined : Icons.play_circle_outline,
                  label: x.title,
                  sub: x.metaLine.isEmpty
                      ? (x.kind == 'musique' ? 'Musique · Écouter' : tr('Écouter'))
                      : x.metaLine,
                  onTap: () => x.url.isEmpty
                      ? toast(c, tr('Audio non fourni par la structure.'))
                      : isPageLink(x.url)
                          ? go(c, LinkViewPage(title: x.title, url: x.url))
                          : go(c, AudioPlayerPage(teaching: x)),
                ),
                if (app.isAdminGeneral)
                  Padding(
                    padding: const EdgeInsets.only(left: Cp.s2, bottom: Cp.s1),
                    child: Row(children: [
                      TextButton.icon(
                        icon: const Icon(Icons.edit_outlined, size: 18),
                        label: Text(tr('Modifier')),
                        onPressed: () {
                          final artistLabel = x.kind == 'musique' ? tr('Artiste') : tr('Orateur');
                          audioFormSheet(c, x.kind == 'musique' ? tr('Modifier la musique') : tr('Modifier l’enseignement'), _teachingFields(x.kind, artistLabel, x), tr('Enregistrer'), (v, imagePath, audioPath, audioBytes, audioName) {
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
                        },
                      ),
                      TextButton.icon(
                        icon: const Icon(Icons.delete_outline, size: 18),
                        label: Text(tr('Supprimer')),
                        onPressed: () async {
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
                        },
                      ),
                    ]),
                  ),
              ],
            ]),
        ]));
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
        Expanded(
          child: InkWell(
            onTap: () => go(context, AudioPlayerPage(teaching: teaching)),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(teaching.title, overflow: TextOverflow.ellipsis, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700)),
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

class AudioSpacePage extends StatelessWidget {
  const AudioSpacePage({super.key});

  @override
  Widget build(BuildContext context) {
    return live((c) => basic(tr('Espace audio'), [
          if (app.isAdminGeneral)
            Padding(
              padding: const EdgeInsets.only(bottom: Cp.s1),
              child: SizedBox(
                width: double.infinity,
                height: 52,
                child: FilledButton.icon(
                  icon: const Icon(Icons.add),
                  label: Text(tr('Ajouter')),
                  onPressed: () async {
                    final type = await pick<String>(c, tr('Musique ou enseignement ?'), [tr('Musique'), tr('Enseignement')], (s) => s);
                    if (type == null || !c.mounted) return;
                    final kind = type == tr('Musique') ? 'musique' : 'enseignement';
                    final artistLabel = kind == 'musique' ? tr('Artiste') : tr('Orateur');
                    audioFormSheet(c, kind == 'musique' ? tr('Nouvelle musique') : tr('Nouvel enseignement'), _teachingFields(kind, artistLabel), tr('Publier'), (v, imagePath, audioPath, audioBytes, audioName) {
                      final teaching = Teaching(v['title']!, v['speaker']!, v['url']!, kind: kind, imagePath: imagePath, thematique: v['thematique'] ?? '', format: v['format'] ?? '', duree: v['duree'] ?? '', dateTexte: v['date'] ?? '', description: v['desc'] ?? '');
                      app.teachings.insert(0, teaching);
                      app.changed();
                      _publishTeaching(c, teaching, audioPath: audioPath, audioBytes: audioBytes, audioName: audioName);
                    });
                  },
                ),
              ),
            ),
          if (app.teachings.isEmpty)
            EmptyNote(icon: Icons.headphones_outlined, text: tr('Aucun audio publié pour le moment.'))
          else
            for (final x in app.teachings) ...[
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(Cp.s2),
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text(x.title, style: Theme.of(c).textTheme.titleMedium),
                    if (x.speaker.isNotEmpty) ...[const SizedBox(height: 2), Text(x.speaker, style: Theme.of(c).textTheme.bodyMedium)],
                    if ([x.thematique, x.format, x.duree, x.dateTexte].any((v) => v.isNotEmpty)) ...[
                      const SizedBox(height: 2),
                      Text([x.thematique, x.format, x.duree, x.dateTexte].where((v) => v.isNotEmpty).join(' · '), style: Theme.of(c).textTheme.bodyMedium),
                    ],
                    const SizedBox(height: Cp.s1),
                    Text(
                      x.audioId.isNotEmpty
                          ? tr('Fichier audio joint')
                          : (x.url.isNotEmpty ? tr('Lien audio') : tr('Aucun audio')),
                      style: Theme.of(c).textTheme.bodyMedium,
                    ),
                    if (app.isAdminGeneral) ...[
                      const SizedBox(height: Cp.s1),
                      Row(children: [
                        TextButton.icon(
                          icon: const Icon(Icons.edit_outlined, size: 18),
                          label: Text(tr('Modifier')),
                          onPressed: () {
                            final artistLabel = x.kind == 'musique' ? tr('Artiste') : tr('Orateur');
                            audioFormSheet(c, x.kind == 'musique' ? tr('Modifier la musique') : tr('Modifier l’enseignement'), _teachingFields(x.kind, artistLabel, x), tr('Enregistrer'), (v, imagePath, audioPath, audioBytes, audioName) {
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
                          },
                        ),
                        TextButton.icon(
                          icon: const Icon(Icons.delete_outline, size: 18),
                          label: Text(tr('Supprimer')),
                          onPressed: () async {
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
                          },
                        ),
                      ]),
                    ],
                  ]),
                ),
              ),
              const SizedBox(height: Cp.s1),
            ],
        ]));
  }
}

/// Annonces audio, 29 oct. 2026 : publication et retrait par
/// l'administrateur général seulement, dans une section séparée
/// de l'Espace structure. Les annonces ne passent jamais par la
/// liste des enseignements, et leur retrait ne touche à aucun
/// autre contenu. La liste affichée est celle du serveur.
class AnnoncesAudioPage extends StatelessWidget {
  const AnnoncesAudioPage({super.key});

  @override
  Widget build(BuildContext context) {
    return live((c) => basic(tr('Annonces audio'), [
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
                  label: Text(tr('Ajouter')),
                  onPressed: () {
                    audioFormSheet(c, tr('Nouvelle annonce audio'), [
                      F('title', tr('Titre')),
                      F('texte', tr('Texte court'), optional: true, lines: 2),
                      F('url', tr('Lien audio'), optional: true),
                    ], tr('Publier'), (v, _, audioPath, audioBytes, audioName) {
                      unawaited(_publishAnnonce(c, v, audioPath: audioPath, audioBytes: audioBytes, audioName: audioName));
                    }, programmer: true);
                  },
                ),
              ),
            ),
            Text(tr('Une annonce publiée apparaît en carte sur l’accueil des membres connectés, jusqu’à son écoute complète, sa fermeture avec le X, ou son retrait ici.'), style: Theme.of(c).textTheme.bodyMedium),
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
                          onPressed: () {
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
                          },
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
          ],
        ]));
  }
}


/// Cartes vidéo, 30 oct. 2026 : publication et retrait par
/// l'administrateur général seulement, dans une section séparée
/// de l'Espace structure. Les cartes ne passent jamais par la
/// liste des enseignements, et leur retrait ne touche à aucun
/// autre contenu. La liste affichée est celle du serveur.
/// Téléphone seulement côté membres, jamais sur le web.
class CartesVideoPage extends StatelessWidget {
  const CartesVideoPage({super.key});

  @override
  Widget build(BuildContext context) {
    return live((c) => basic(tr('Cartes vidéo'), [
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
                  label: Text(tr('Ajouter')),
                  onPressed: () {
                    formSheet(c, tr('Nouvelle carte vidéo'), [
                      F('title', tr('Titre')),
                      F('texte', tr('Explication'), optional: true, lines: 2),
                      F('url', tr('Lien vidéo')),
                    ], tr('Publier'), (v) {
                      unawaited(_publishCarteVideo(c, v));
                    });
                  },
                ),
              ),
            ),
            Text(tr('Une carte publiée apparaît sur l’accueil des membres connectés, sur téléphone seulement, jusqu’à sa fermeture avec le X, ou son retrait ici.'), style: Theme.of(c).textTheme.bodyMedium),
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
                          onPressed: () {
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
                          },
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

  Future<void> _cycleSpeed() async {
    final next = _speed >= 1.5 ? 1.0 : (_speed >= 1.25 ? 1.5 : 1.25);
    setState(() => _speed = next);
    await _player.setSpeed(next);
  }

  String _speedLabel() {
    if (_speed == 1.0) return '1×';
    if (_speed == 1.25) return '1,25×';
    return '1,5×';
  }

  @override
  void initState() {
    super.initState();
    _init();
  }

  Future<void> _init() async {
    try {
      // Même enseignement que celui qui joue déjà : on garde la
      // position et l'état lecture ou pause, on ne recommence pas.
      // Nouvel enseignement : on change la source et on lance.
      if (app.currentTeaching?.url != widget.teaching.url) {
        // Un enseignement qui démarre ne doit jamais faire
        // disparaître une annonce à sa fin : le suivi d'écoute
        // d'annonce s'arrête ici, sans toucher à cette lecture.
        app.stopAnnonceTracking();
        app.currentTeaching = widget.teaching;
        app.changed();
        await _player.setUrl(widget.teaching.url);
        await _player.play();
      }
    } catch (_) {
      if (mounted) setState(() => _error = tr('Impossible de lire cet audio. Vérifiez votre connexion, puis réessayez.'));
    }
  }

  // Pas de dispose du lecteur ici, volontairement : détruire le
  // lecteur à la sortie de la page coupait la lecture. Le lecteur
  // global vit avec l'état de l'application, il s'arrête avec la
  // mini barre, ou à la déconnexion.

  String _fmt(Duration? d) {
    if (d == null) return '0:00';
    final m = d.inMinutes;
    final sec = d.inSeconds % 60;
    return '$m:${sec.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    if (_error != null) {
      return basic(widget.teaching.title, [
        EmptyNote(icon: Icons.error_outline, text: _error!),
      ]);
    }
    return basic(widget.teaching.title, [
      Container(
        width: double.infinity,
        padding: const EdgeInsets.fromLTRB(24, 28, 24, 28),
        decoration: BoxDecoration(
          color: Cp.navy,
          borderRadius: BorderRadius.circular(24),
        ),
        child: Column(children: [
          if (hasContentImage(widget.teaching.imagePath, widget.teaching.imageUrl))
            contentImage(widget.teaching.imagePath, widget.teaching.imageUrl, height: 180)
          else
            Container(
              width: 160,
              height: 160,
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Cp.gold.withValues(alpha: 0.5)),
              ),
              child: Icon(
                widget.teaching.kind == 'musique' ? Icons.music_note_outlined : Icons.headphones_outlined,
                size: 72,
                color: Cp.gold,
              ),
            ),
          const SizedBox(height: Cp.s3),
          Text(
            widget.teaching.kind == 'musique' ? 'MUSIQUE' : 'ENSEIGNEMENT',
            style: const TextStyle(color: Cp.gold, fontSize: 12, fontWeight: FontWeight.w700, letterSpacing: 2),
          ),
          const SizedBox(height: Cp.s1),
          Text(
            widget.teaching.title,
            textAlign: TextAlign.center,
            style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.w800, height: 1.2),
          ),
          if (widget.teaching.speaker.isNotEmpty) ...[
            const SizedBox(height: Cp.s1),
            Text(
              widget.teaching.speaker,
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.white.withValues(alpha: 0.75), fontSize: 16),
            ),
          ],
          const SizedBox(height: Cp.s3),
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
                      Text(_fmt(total), style: TextStyle(color: Colors.white.withValues(alpha: 0.7), fontSize: 14)),
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
                tooltip: tr('Reculer de 10 secondes'),
                iconSize: 32,
                color: Colors.white,
                icon: const Icon(Icons.replay_10_outlined),
                onPressed: () async {
                  final pos = await _player.position;
                  await _player.seek(pos - const Duration(seconds: 10));
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
                tooltip: tr('Avancer de 10 secondes'),
                iconSize: 32,
                color: Colors.white,
                icon: const Icon(Icons.forward_10_outlined),
                onPressed: () async {
                  final pos = await _player.position;
                  await _player.seek(pos + const Duration(seconds: 10));
                },
              ),
            ),
          ]),
          const SizedBox(height: Cp.s2),
          Row(mainAxisAlignment: MainAxisAlignment.center, children: [
            TextButton(
              onPressed: _cycleSpeed,
              child: Text('Vitesse ${_speedLabel()}', style: const TextStyle(color: Colors.white)),
            ),
            TextButton(
              onPressed: () => _player.seek(Duration.zero),
              child: Text(tr('Reprendre au début'), style: const TextStyle(color: Colors.white)),
            ),
          ]),
        ]),
      ),
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
    if (kStructureEmail.isEmpty) {
      toast(context, tr('L’adresse e-mail de la structure n’est pas encore configurée.'));
      return;
    }
    // Aucun enregistrement dans l'app, aucune publication : e-mail pré-rempli seulement.
    // Objet exact de la version web, avec le nom complet de la structure.
    const subject = 'Sujet de prière — Connexion Prophétique';
    final uri = Uri.parse('mailto:$kStructureEmail?subject=${Uri.encodeComponent(subject)}&body=${Uri.encodeComponent(body)}');
    try {
      final ok = await launchUrl(uri);
      if (!ok && mounted) {
        await showDialog(
          context: context,
          builder: (ctx) => AlertDialog(
            title: Text(tr('Votre message est prêt à être envoyé')),
            content: Text(body),
            actions: [
              TextButton(onPressed: () => Navigator.pop(ctx), child: Text(tr('Fermer'))),
              FilledButton(
                onPressed: () {
                  Clipboard.setData(ClipboardData(text: body));
                  Navigator.pop(ctx);
                  toast(context, tr('Message copié. Collez-le dans votre e-mail.'));
                },
                child: Text(tr('Copier')),
              ),
            ],
          ),
        );
      }
    } catch (_) {
      if (mounted) toast(context, tr('Aucune application e-mail trouvée.'));
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

// ── Pages Communauté, modèle web, 27 oct. 2026 ─────────────────────
// Filtres, noms d'établissements et carte à bordure pointillée,
// communs aux pages Camps, Établissements et Bureau, pour garder
// le même design et le même emplacement que sur les captures web.

// Filtres fixes du prototype : Tous, Communauté, puis les trois
// établissements, dans cet ordre, jamais un autre nom inventé.
const List<String> kEtabFilters = [
  'Tous',
  'Communauté',
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
// les six filtres (Tous, Communauté, ISPAM, Céleste, La
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
void addBureauMember(BuildContext c) {
  imageFormSheet(c, tr('Nouveau responsable'), [
    F('name', tr('Nom')),
    F('role', tr('Fonction')),
    F('contact', tr('Contact'), optional: true),
    F('consent', tr('Accord pour afficher le contact ? (oui / non)'), optional: true),
  ], tr('Ajouter'), (v, imagePath) {
    app.bureau.add(BureauMember(v['name']!, v['role']!, v['contact']!, v['consent']!.toLowerCase() == 'oui', imagePath: imagePath));
    app.changed();
  });
}

// Bordure pointillée du prototype, pour la carte Communauté (tous)
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
      _choice(tr('Transport'), _transport, const ['Par ses propres moyens', 'Car de la communauté'], (v) => setState(() => _transport = v ?? _transport)),
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
    if (_filter == 'Communauté') return camp.scope == 'Communauté';
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
    if (reg.passVerrouille) {
      go(c, CampProgressPage(registration: reg));
      return;
    }
    go(c, PassPage(registration: reg));
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
          visible = !requis || valides >= 6;
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
        if (c.mounted) {
          if (reg.passVerrouille) {
            go(c, CampProgressPage(registration: reg));
          } else {
            go(c, PassPage(registration: reg));
          }
        }
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
  Widget _eventCard(Camp camp) {
    final typeLabel = camp.type == 'retraite' ? 'RETRAITE' : 'CAMP';
    return ClipRRect(
      borderRadius: BorderRadius.circular(24),
      child: InkWell(
        onTap: () => _ouvrirInscription(context, camp),
        child: Stack(children: [
          if (hasContentImage(camp.imagePath, camp.imageUrl))
            contentImage(camp.imagePath, camp.imageUrl, height: 280)
          else if (_isLocalRetreat(camp))
            Image.memory(base64Decode(kRetreatPosterBase64), height: 280, width: double.infinity, fit: BoxFit.cover)
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
                  Expanded(child: Text(orTbc(camp.place), style: const TextStyle(color: Colors.white, fontSize: 14))),
                ]),
              ]),
            ),
          ),
        ]),
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
          tr('Les camps et retraites de la communauté : inscription et pass d’accès.'),
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
                      F('desc', tr('Description'), lines: 3, optional: true),
                      F('tariff', tr('Tarif'), optional: true),
                      F('kairos', tr('Camp National Kairos ? (oui / non)'), optional: true),
                    ], tr('Publier'), (v, imagePath) {
                      final camp = Camp(id: app.nextId(), name: v['name']!, dates: v['dates']!, place: v['place']!,
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
          for (final camp in filtered) ...[
            _eventCard(camp),
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
            ],
            if (app.isAdminGeneral) ...[
              Row(children: [
                TextButton.icon(
                  icon: const Icon(Icons.edit_outlined, size: 18),
                  label: Text(tr('Modifier')),
                  onPressed: () {
                    DateTimeRange? plage;
                    imageFormSheet(c, tr('Modifier le camp'), [
                      F('name', tr('Nom du camp'), initial: camp.name),
                      F('dates', tr('Dates'), optional: true, initial: camp.dates, dateRange: true),
                      F('place', tr('Lieu'), optional: true, initial: camp.place),
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
                        ..description = v['desc']!
                        ..tariff = v['tariff']!
                        ..kairos = v['kairos']!.toLowerCase() == 'oui';
                      if (plage != null) {
                        camp.dateDebut = plage!.start;
                        camp.dateFin = plage!.end;
                      }
                      app.changed();
                      _updateCampServer(c, camp, plage: plage);
                    }, initialImagePath: camp.imagePath, onDateRange: (r) => plage = r);
                  },
                ),
                TextButton.icon(
                  icon: const Icon(Icons.delete_outline, size: 18),
                  label: Text(tr('Retirer')),
                  onPressed: () async {
                    final ok = await _confirmRetirer(c, tr('Retirer ce camp ?'), tr('Le camp disparaîtra du catalogue. Les inscriptions déjà faites ne sont pas annulées côté serveur.'));
                    if (ok) _unpublishCamp(c, camp);
                  },
                ),
              ]),
              const SizedBox(height: Cp.s1),
            ],
            if (app.isAdmin && camp.serverId.isNotEmpty) ...[
              TextButton.icon(
                icon: const Icon(Icons.how_to_reg_outlined, size: 18),
                label: Text(tr('Présences')),
                onPressed: () => go(c, PresenceListPage(activiteId: camp.serverId, activiteNom: camp.name)),
              ),
              const SizedBox(height: Cp.s1),
            ],
            SizedBox(
              width: double.infinity,
              height: 52,
              child: _reg(camp) != null
                  ? OutlinedButton(
                      onPressed: () => go(c, PassPage(registration: _reg(camp)!)),
                      child: Text(camp.kairos ? tr('Voir mon badge') : tr('Voir mon pass')),
                    )
                  : FilledButton(
                      onPressed: () => _register(c, camp),
                      child: Text(tr('S’inscrire')),
                    ),
            ),
            const SizedBox(height: Cp.s3),
          ],
        sectionHeading(tr('Mes inscriptions & pass'), t),
        const SizedBox(height: Cp.s2),
        if (myRegs.isEmpty)
          Text(tr('Aucune inscription pour le moment. Inscrivez-vous à un camp pour recevoir votre pass.'), style: t.bodyMedium)
        else
          for (final reg in myRegs) ...[
            reg.passVerrouille ? CampProgressCard(registration: reg) : PassCardView(registration: reg),
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
    if (widget.filter == 'Communauté') return const [];
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
      _selected = null;
    });
  }

  String _monthLabel() {
    final months = isEn ? _monthsEn : _monthsFr;
    return '${months[_month.month - 1]} ${_month.year}';
  }

  String _dateLabel(DateTime day) {
    final months = isEn ? _monthsEn : _monthsFr;
    return isEn ? '${months[day.month - 1]} ${day.day}, ${day.year}' : '${day.day} ${months[day.month - 1].toLowerCase()} ${day.year}';
  }

  Widget _dayCell(int dayNum, int daysInMonth, DateTime today, TextTheme t) {
    if (dayNum < 1 || dayNum > daysInMonth) return const SizedBox(height: 48);
    final day = DateTime(_month.year, _month.month, dayNum);
    final camps = _campsOfDay(day);
    final selected = _selected != null && _selected == day;
    final isToday = day == today;
    return InkWell(
      onTap: () => setState(() => _selected = day),
      borderRadius: BorderRadius.circular(12),
      child: Container(
        height: 48,
        decoration: BoxDecoration(
          color: selected ? Cp.gold.withValues(alpha: 0.25) : null,
          border: Border.all(color: selected ? Cp.gold : (isToday ? Cp.navy : Colors.transparent), width: selected || isToday ? 1.5 : 1),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text('$dayNum', style: t.bodyMedium?.copyWith(fontWeight: camps.isNotEmpty ? FontWeight.w800 : FontWeight.w400, color: camps.isNotEmpty ? Cp.navy : null)),
          if (camps.isNotEmpty) Container(width: 6, height: 6, margin: const EdgeInsets.only(top: 2), decoration: const BoxDecoration(color: Cp.goldDeep, shape: BoxShape.circle)),
        ]),
      ),
    );
  }

  Widget _campRow(BuildContext context, Camp camp, TextTheme t) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(color: Cp.card, borderRadius: BorderRadius.circular(Cp.radiusTile)),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(camp.name, style: t.titleSmall?.copyWith(fontWeight: FontWeight.w800)),
        const SizedBox(height: 2),
        Text('${orTbc(camp.dates)} · ${orTbc(camp.place)}', style: t.bodyMedium),
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
      Row(children: [
        IconButton(icon: const Icon(Icons.chevron_left), onPressed: () => _changeMonth(-1)),
        Expanded(child: Text(_monthLabel(), textAlign: TextAlign.center, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
        IconButton(icon: const Icon(Icons.chevron_right), onPressed: () => _changeMonth(1)),
      ]),
      Row(mainAxisAlignment: MainAxisAlignment.center, children: [
        TextButton(onPressed: _goToday, child: Text(tr('Mois en cours'))),
      ]),
      const SizedBox(height: Cp.s1),
      Row(children: [for (final d in dayNames) Expanded(child: Center(child: Text(d, style: t.bodySmall?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))))]),
      const SizedBox(height: 4),
      for (var w = 0; w < weeks; w++) ...[
        Row(children: [for (var wd = 0; wd < 7; wd++) Expanded(child: _dayCell(w * 7 + wd - offset + 1, daysInMonth, today, t))]),
        const SizedBox(height: 2),
      ],
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
class BadgeProView extends StatelessWidget {
  const BadgeProView({super.key, required this.registration});
  final Registration registration;

  @override
  Widget build(BuildContext context) {
    final r = registration;
    final m = r.member;
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Cp.navy,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Cp.gold, width: 1.5),
      ),
      child: Column(children: [
        WebAssetImage(
          asset: 'assets/cp_monogram.png',
          partUrls: kMonogramParts,
          width: 64,
          height: 64,
          fit: BoxFit.cover,
          fallback: Container(
            width: 64,
            height: 64,
            color: const Color(0xFF0B0B0B),
            child: const Center(
              child: Text('CP', style: TextStyle(color: Color(0xFFD4A72C), fontSize: 20, fontWeight: FontWeight.w700, fontStyle: FontStyle.italic, fontFamily: 'serif')),
            ),
          ),
        ),
        const SizedBox(height: 8),
        const Text('CONNEXION PROPHÉTIQUE', style: TextStyle(color: Cp.gold, fontSize: 16, fontWeight: FontWeight.w800, letterSpacing: 1)),
        const SizedBox(height: 12),
        Text(r.camp.name, textAlign: TextAlign.center, style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w800)),
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
          decoration: BoxDecoration(color: const Color(0xFF123B2A), borderRadius: BorderRadius.circular(20)),
          child: Text('✓ ${tr('Inscrit')}', style: const TextStyle(color: Color(0xFF2FD27A), fontSize: 14, fontWeight: FontWeight.w700)),
        ),
        const SizedBox(height: 16),
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
        const SizedBox(height: 12),
        Text(m.name, textAlign: TextAlign.center, style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w800)),
        const SizedBox(height: 4),
        Text(isEn ? 'MEMBER NUMBER' : 'MEMBRE NUMÉRO', style: const TextStyle(color: Cp.gold, fontSize: 10, fontWeight: FontWeight.w700, letterSpacing: 1)),
        Text(m.matricule, style: const TextStyle(color: Cp.gold, fontSize: 18, fontWeight: FontWeight.w800, letterSpacing: 1)),
        const SizedBox(height: 4),
        Text(m.etab, textAlign: TextAlign.center, style: const TextStyle(color: Colors.white70, fontSize: 14, fontWeight: FontWeight.w700)),
        if (r.camp.dates.isNotEmpty) ...[
          const SizedBox(height: 8),
          Text(r.camp.dates, textAlign: TextAlign.center, style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w700)),
        ],
        if (r.camp.place.isNotEmpty) ...[
          const SizedBox(height: 4),
          Text(r.camp.place, textAlign: TextAlign.center, style: const TextStyle(color: Colors.white70, fontSize: 14)),
        ],
        const SizedBox(height: 16),
        Container(
          width: 140,
          height: 140,
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(14)),
          child: Center(child: QrImageView(data: m.matricule, size: 120, backgroundColor: Colors.white)),
        ),
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
        final file = await saveToDownloads(img.encodeJpg(decoded, quality: 90), '$base.jpg');
        if (mounted) toast(context, 'Pass téléchargé : ${file.path.split('/').last}');
      } else {
        final file = await saveToDownloads(png, '$base.png');
        if (mounted) toast(context, 'Pass téléchargé : ${file.path.split('/').last}');
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
      final html = buildCertificateHtml(PrintCertificate(
        name: r.member.name,
        matricule: r.member.matricule,
        campName: r.camp.name,
        campDates: r.camp.dates,
        campLieu: r.camp.place,
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
              label: Text(_downloading ? tr('Préparation…') : (r.camp.kairos ? tr('Badge PNG') : tr('Pass PNG'))),
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
              icon: const Icon(Icons.account_balance_wallet_outlined),
              label: Text(_downloading ? tr('Préparation…') : tr('Portefeuille')),
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
    return basic(r.camp.kairos ? tr('Badge') : tr('Pass numérique'), [
      PassCardView(registration: r),
      const SizedBox(height: Cp.s2),
      Text(isEn ? 'Registered on ${dateFr(r.date)}. Show this ${r.camp.kairos ? 'badge' : 'pass'} at the entrance.' : 'Inscrit le ${dateFr(r.date)}. Présentez ce ${r.camp.kairos ? 'badge' : 'pass'} à l’entrée.', style: t.bodyMedium),
    ]);
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
            '${tr('Versement en attente de validation')}${r.versementEnAttenteNumero != null ? ' (${r.versementEnAttenteNumero} ${tr('sur 6')})' : ''}${r.versementEnAttenteMontant != null ? ' : ${fcfa(r.versementEnAttenteMontant!)}' : ''}',
            style: t.bodyMedium?.copyWith(color: Cp.goldDeep, fontWeight: FontWeight.w700),
          ),
          const SizedBox(height: Cp.s1),
          SizedBox(
            width: double.infinity,
            height: 48,
            child: OutlinedButton(onPressed: _busy ? null : _actualiser, child: Text(tr('Actualiser'))),
          ),
        ] else if (r.montantSuivant != null && r.versementSuivant != null) ...[
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
                width: 56,
                height: 56,
                decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(Cp.radiusTile)),
                child: const Icon(Icons.apartment_outlined, color: Cp.gold, size: 28),
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
            Text(tr('Chaque établissement possède ses propres activités. Sélectionnez votre établissement pour consulter ses activités, ses événements et ses actualités. Les informations de la communauté restent également accessibles.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 15)),
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
          for (final e in app.etabs) ...[
            etabCard(e),
            const SizedBox(height: Cp.s1),
          ],
        // Carte Communauté (tous), modèle web : activités communes
        // à toute la communauté, avec retour à l'accueil. Icône et
        // titre compactés comme les cartes, bordure pointillée
        // conservée.
        DashedCard(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Container(
              width: 56,
              height: 56,
              decoration: BoxDecoration(color: Cp.verseTint, borderRadius: BorderRadius.circular(Cp.radiusTile)),
              child: const Icon(Icons.people_outlined, color: Cp.goldDeep, size: 28),
            ),
            const SizedBox(height: Cp.s1),
            Text(isEn ? 'Community (all)' : 'Communauté (tous)', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
            const SizedBox(height: 2),
            Text(isEn ? 'Activities shared by the whole Connexion Prophétique community.' : 'Activités communes à toute la communauté Connexion Prophétique.', style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 15)),
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

class EtabDetailPage extends StatelessWidget {
  const EtabDetailPage({super.key, required this.etab});
  final Etab etab;

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      // Actualités de l'établissement : par identifiant serveur quand il
      // existe, sinon par nom, pour les actualités locales.
      final items = app.news.where((n) => (etab.id.isNotEmpty && n.etablissementId == etab.id) || n.etab == etab.name).toList();
      return basic(etab.name, [
        if (hasContentImage(etab.imagePath, etab.imageUrl)) ...[contentImage(etab.imagePath, etab.imageUrl, height: 180), const SizedBox(height: Cp.s2)],
        heading(c, tr('Activités')),
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
                ),
            ]),
          ),
        const SizedBox(height: Cp.s3),
        heading(c, tr('Actualités')),
        if (items.isEmpty)
          Text(tr('Aucune actualité pour cet établissement.'), style: t.bodyMedium)
        else
          for (final n in items) ...[NewsCard(item: n), const SizedBox(height: Cp.s1)],
      ]);
    });
  }
}

class NewsCard extends StatelessWidget {
  const NewsCard({super.key, required this.item});
  final NewsItem item;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(Cp.s2),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          if (hasContentImage(item.imagePath, item.imageUrl)) ...[contentImage(item.imagePath, item.imageUrl), const SizedBox(height: Cp.s1)],
          Text(item.title, style: t.titleMedium),
          const SizedBox(height: 4),
          Text('${dateFr(item.date)}${item.etab.isEmpty ? '' : ' · ${item.etab}'}', style: t.bodyMedium),
          if (item.programmeeLe != null && item.programmeeLe!.isAfter(DateTime.now())) ...[
            const SizedBox(height: 4),
            Text(formatProgramme(item.programmeeLe!), style: t.bodyMedium?.copyWith(color: Cp.goldDeep, fontWeight: FontWeight.w700)),
          ],
          const SizedBox(height: Cp.s1),
          Text(item.text, style: t.bodyMedium?.copyWith(color: Cp.ink)),
        ]),
      ),
    );
  }
}

// Page des notifications internes, 29 oct. 2026 : cloche lue à
// l'ouverture, jamais poussée. Un appui marque comme lu et navigue
// vers l'écran concerné quand la destination est directe, sinon le
// message s'affiche dans une fenêtre.
class NotificationsPage extends StatefulWidget {
  const NotificationsPage({super.key});

  @override
  State<NotificationsPage> createState() => _NotificationsPageState();
}

class _NotificationsPageState extends State<NotificationsPage> {
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
              Icon(_icon((n['type'] ?? '').toString()), color: Cp.navy, size: 28),
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

  @override
  Widget build(BuildContext context) {
    return live((c) => basic(tr('Notifications'), [
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
          if (app.notifications.isEmpty) ...[
            EmptyNote(icon: Icons.notifications_outlined, text: tr('Aucune notification pour le moment.')),
            const SizedBox(height: Cp.s1),
            Text(tr('Les validations de paiement, les nouveaux camps, enseignements et actualités apparaîtront ici.'), style: Theme.of(c).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted)),
          ] else
            for (final n in app.notifications) _card(c, n),
        ]));
  }
}

class NewsPage extends StatelessWidget {
  const NewsPage({super.key});

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
                  onPressed: () async {
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
                  },
                ),
              ),
            ),
          if (liste.isEmpty)
            EmptyNote(icon: Icons.chat_bubble_outline, text: tr('Aucune actualité pour le moment.'))
          else
            for (final n in liste) ...[
              NewsCard(item: n),
              if (app.isAdminGeneral)
                Padding(
                  padding: const EdgeInsets.only(left: Cp.s2),
                  child: Row(children: [
                    TextButton.icon(
                      icon: const Icon(Icons.edit_outlined, size: 18),
                      label: Text(tr('Modifier')),
                      onPressed: () {
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
                      },
                    ),
                    TextButton.icon(
                      icon: const Icon(Icons.delete_outline, size: 18),
                      label: Text(tr('Supprimer')),
                      onPressed: () async {
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
                      },
                    ),
                  ]),
                ),
              const SizedBox(height: Cp.s1),
            ],
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

  bool _matchesFilter(BureauMember b) {
    if (_filter == 'Tous') return true;
    if (_filter == 'Communauté') return b.etab.isEmpty || b.etab == 'Communauté';
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
            Text(tr('Les responsables de la structure et leurs contacts. Les coordonnées ne s’affichent que pour les personnes qui ont donné leur accord.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 15)),
          ])),
          if (app.isAdminGeneral) ...[
            const SizedBox(width: 12),
            goldButton(icon: Icons.add, label: tr('Ajouter'), onPressed: () => addBureauMember(c)),
          ],
        ]),
        const SizedBox(height: Cp.s1),
        filterChipsHorizontal(kEtabFilters, _filter, (v) => setState(() => _filter = v)),
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
          // Colonne unique à toutes les largeurs, pour ne jamais
          // couper un texte ni déborder, du téléphone étroit à
          // l'ordinateur.
          for (final b in filtered) ...[
            Card(
              child: Padding(
                padding: const EdgeInsets.all(Cp.s2),
                child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  if (b.imagePath.isNotEmpty)
                    ClipRRect(borderRadius: BorderRadius.circular(28), child: SizedBox(width: 56, height: 56, child: contentImage(b.imagePath, '', height: 56)))
                  else
                    Container(
                      width: 56,
                      height: 56,
                      decoration: BoxDecoration(color: Cp.gold.withValues(alpha: 0.15), shape: BoxShape.circle),
                      child: const Icon(Icons.person_outline, color: Cp.navy, size: 28),
                    ),
                  const SizedBox(width: Cp.s1),
                  Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text(b.name, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
                    const SizedBox(height: 2),
                    Text(b.role, style: t.bodyMedium),
                    const SizedBox(height: 2),
                    Text(etabDisplayName(b.etab), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
                    if (b.consent && b.contact.isNotEmpty) ...[
                      const SizedBox(height: 2),
                      Text(b.contact, style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
                    ],
                  ])),
                ]),
              ),
            ),
            const SizedBox(height: Cp.s1),
          ],
      ]);
    });
  }
}

class LibrairiePage extends StatelessWidget {
  const LibrairiePage({super.key, this.scrollController});
  final ScrollController? scrollController;

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
                    Text(b.title, style: t.titleMedium),
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
                    if (app.isAdminGeneral) ...[
                      const SizedBox(height: Cp.s1),
                      Row(children: [
                        TextButton.icon(
                          icon: const Icon(Icons.edit_outlined, size: 18),
                          label: Text(tr('Modifier')),
                          onPressed: () => bookFormSheet(c, tr('Modifier le livre'), [
                            F('title', tr('Titre'), initial: b.title),
                            F('author', tr('Auteur'), initial: b.author),
                            F('desc', tr('Description'), lines: 3, optional: true, initial: b.description),
                            F('price', tr('Prix (FCFA)'), number: true, initial: b.price.toString()),
                            F('format', tr('Format'), optional: true, initial: b.format),
                            F('url', tr('Lien du fichier'), optional: true, initial: b.fileUrl),
                          ], tr('Enregistrer'), (v, imagePath, livrePath, livreBytes, livreName) {
                            final p = _price(c, v['price']!);
                            if (p == null) return;
                            if (imagePath != b.imagePath) {
                              b.imagePath = imagePath;
                              b.imageUrl = '';
                            }
                            b
                              ..title = v['title']!
                              ..author = v['author']!
                              ..description = v['desc']!
                              ..price = p
                              ..format = v['format']!
                              ..fileUrl = v['url']!;
                            app.changed();
                            _updateBookServer(c, b, livrePath: livrePath, livreBytes: livreBytes, livreName: livreName);
                          }, initialImagePath: b.imagePath),
                        ),
                        TextButton.icon(
                          icon: const Icon(Icons.delete_outline, size: 18),
                          label: Text(tr('Retirer')),
                          onPressed: () async {
                            final ok = await _confirmRetirer(c, tr('Retirer ce livre ?'), tr('Le livre disparaîtra du catalogue. Les achats déjà payés ne changent pas.'));
                            if (ok) _unpublishBook(c, b);
                          },
                        ),
                      ]),
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
                          ? OutlinedButton(onPressed: () => go(c, ReaderPage(book: b)), child: Text(tr('Lire')))
                          : (app.cart.contains(b)
                              ? OutlinedButton(onPressed: () => go(c, const CartPage()), child: Text(tr('Voir mon panier')))
                              : FilledButton(
                                  onPressed: () {
                                    app.cart.add(b);
                                    app.changed();
                                    toast(c, tr('Ajouté au panier.'));
                                  },
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
        controller: scrollController,
      );
    });
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
                      ? _campRequestLabel(r)
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
                    onPressed: () => go(c, InvoicePage(request: r)),
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
            refusedCards.add(card);
            refusedCards.add(const SizedBox(height: Cp.s1));
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

class ReaderPage extends StatelessWidget {
  const ReaderPage({super.key, required this.book});
  final Book book;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final purchased = app.hasPurchasedBook(book);
    return basic(book.title, [
      if (!purchased)
        EmptyNote(icon: Icons.lock_outline, text: tr('Ce livre est verrouillé. Il s’ouvre après la confirmation du paiement.'))
      else ...[
        Text(book.title, style: t.titleLarge),
        const SizedBox(height: 4),
        Text(book.author, style: t.bodyMedium),
        const SizedBox(height: Cp.s3),
        SizedBox(
          width: double.infinity,
          height: 56,
          child: FilledButton.icon(
            onPressed: () => openPurchasedBook(context, book, book.title),
            icon: const Icon(Icons.auto_stories_outlined),
            label: Text(tr('Ouvrir le livre')),
          ),
        ),
      ],
    ]);
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

class InvoicePage extends StatefulWidget {
  const InvoicePage({super.key, required this.request});
  final PayRequest request;

  @override
  State<InvoicePage> createState() => _InvoicePageState();
}

class _InvoicePageState extends State<InvoicePage> {
  final _invoiceKey = GlobalKey();
  bool _downloading = false;
  bool _downloadingPng = false;

  // Reçu en PNG, 27 oct. 2026 : la facture détaillée affichée
  // est capturée en image PNG, téléchargée dans Téléchargements,
  // comme la carte. Le PDF serveur reste disponible à côté,
  // quand la demande a été créée côté serveur : les reçus
  // existent donc en PDF et en PNG, après confirmation seulement.
  Future<void> _downloadPng() async {
    setState(() => _downloadingPng = true);
    try {
      final boundary = _invoiceKey.currentContext?.findRenderObject() as RenderRepaintBoundary?;
      if (boundary == null) {
        if (mounted) toast(context, tr('La facture n’est pas encore affichée.'));
        return;
      }
      final image = await boundary.toImage(pixelRatio: 3);
      final bytes = await image.toByteData(format: ui.ImageByteFormat.png);
      final png = bytes?.buffer.asUint8List();
      if (png == null || png.isEmpty) {
        if (mounted) toast(context, tr('Impossible de créer l’image du reçu.'));
        return;
      }
      final file = await saveToDownloads(png, 'recu-${widget.request.ref}.png');
      if (mounted) toast(context, 'Reçu téléchargé : recu-${widget.request.ref}.png');
      await Share.shareXFiles([XFile(file.path)], text: 'Reçu ${widget.request.ref} — CONNEXION PROPHETIQUE');
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de télécharger le reçu en PNG.'));
    } finally {
      if (mounted) setState(() => _downloadingPng = false);
    }
  }

  Future<void> _downloadPdf() async {
    final r = widget.request;
    if (!r.confirmed) return;
    if (!api.isConnected) {
      toast(context, tr('La facture PDF du serveur demande une connexion et une demande créée côté serveur.'));
      return;
    }
    setState(() => _downloading = true);
    try {
      final bytes = await api.downloadFacture(r.ref);
      // Téléchargement réel depuis le 27 oct. 2026 : la facture PDF du
      // serveur est écrite dans Téléchargements (et non plus dans un
      // dossier temporaire qui disparaît), avec confirmation du nom,
      // puis proposée en partage. La facture n'existe qu'après
      // confirmation vérifiée du paiement, règle inchangée.
      final file = await saveToDownloads(bytes, 'facture-${r.ref}.pdf');
      if (mounted) toast(context, 'Facture téléchargée : facture-${r.ref}.pdf');
      await Share.shareXFiles([XFile(file.path)], text: 'Facture ${r.ref} — CONNEXION PROPHETIQUE');
    } catch (_) {
      if (mounted) {
        toast(context, tr('Facture PDF indisponible pour cette demande (demande locale ou non confirmée côté serveur). La facture détaillée ci-dessous reste affichée.'));
      }
    } finally {
      if (mounted) setState(() => _downloading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final r = widget.request;
    if (!r.confirmed) {
      return basic(tr('Facture'), [EmptyNote(icon: Icons.receipt_long_outlined, text: tr('La facture n’existe qu’après confirmation du paiement.'))]);
    }
    return basic(tr('Facture'), [
      RepaintBoundary(
        key: _invoiceKey,
        child: Card(
          child: Padding(
            padding: const EdgeInsets.all(Cp.s2),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(isEn ? 'Invoice F-${r.ref}' : 'Facture F-${r.ref}', style: t.titleMedium),
            const SizedBox(height: 4),
            Text(isEn ? 'Date: ${dateFr(r.confirmedAt ?? r.date)}' : 'Date : ${dateFr(r.confirmedAt ?? r.date)}', style: t.bodyMedium),
            Text(isEn ? 'Customer: ${r.memberName} (${r.matricule})' : 'Client : ${r.memberName} (${r.matricule})', style: t.bodyMedium),
            Text(isEn ? 'Method: ${r.method}${r.currency.isEmpty ? '' : ' (${r.currency})'}' : 'Moyen : ${r.method}${r.currency.isEmpty ? '' : ' (${r.currency})'}', style: t.bodyMedium),
            const Divider(height: Cp.s3),
            if (r.items.isEmpty)
              Text(r.kind == 'don' ? tr('Contribution (don)') : r.kind == 'cotisation' ? tr('Cotisation mensuelle') : r.kind == 'carte' ? tr('Création de carte de membre (paiement unique)') : r.kind == 'camp' ? _campRequestLabel(r) : tr('Paiement'), style: t.labelLarge)
            else
              for (final i in r.items)
                Padding(
                  padding: const EdgeInsets.only(bottom: 4),
                  child: Row(children: [
                    Expanded(child: Text('${i.title} — ${i.author}', style: t.labelLarge)),
                    Text(fcfa(i.price), style: t.labelLarge),
                  ]),
                ),
            const Divider(height: Cp.s3),
            Row(children: [
              Expanded(child: Text(tr('Total payé'), style: t.titleMedium)),
              Text(fcfa(r.amount), style: t.titleMedium),
            ]),
          ]),
        ),
      ),
      ),
      const SizedBox(height: Cp.s2),
      // Facture PDF du serveur, après confirmation seulement, et
      // reçu en PNG, capturé depuis la facture détaillée ci-dessus.
      SizedBox(
        width: double.infinity,
        height: 52,
        child: FilledButton.icon(
          onPressed: _downloading ? null : _downloadPdf,
          icon: const Icon(Icons.picture_as_pdf_outlined),
          label: Text(_downloading ? tr('Préparation…') : tr('Télécharger la facture (PDF)')),
        ),
      ),
      const SizedBox(height: Cp.s1),
      SizedBox(
        width: double.infinity,
        height: 52,
        child: OutlinedButton.icon(
          onPressed: _downloadingPng ? null : _downloadPng,
          icon: const Icon(Icons.image_outlined),
          label: Text(_downloadingPng ? tr('Préparation…') : tr('Télécharger le reçu (PNG)')),
        ),
      ),
      const SizedBox(height: Cp.s1),
      Text(tr('La facture PDF est générée côté serveur après confirmation vérifiée. Pour une demande locale, non créée côté serveur, le PDF serveur n’existe pas : la facture détaillée ci-dessus, téléchargeable en PNG, fait foi.'), style: t.bodyMedium),
    ]);
  }
}

// Vérification d'un paiement, 27 oct. 2026, d'après le modèle web :
// chaque paiement a une référence, un montant, un moyen, une date et
// un statut, et un reçu téléchargeable après confirmation seulement.
// Cette page est accessible même en attente, depuis Plus, Mes achats,
// la page Dons et chaque demande : elle affiche toujours le code de
// paiement, mais ne donne jamais un reçu téléchargeable avant
// confirmation, et ne marque jamais un paiement comme payé sur seul
// lien ou seule capture. La vérification en attente se fait par la
// structure, après contrôle de son compte Wave ou Orange Money, avec
// la référence à lui communiquer.
class VerifyPaymentPage extends StatelessWidget {
  const VerifyPaymentPage({super.key, required this.request});
  final PayRequest request;

  String _kindLabel(PayRequest r) {
    if (r.kind == 'don') return tr('Don');
    if (r.kind == 'cotisation') return tr('Cotisation mensuelle');
    if (r.kind == 'carte') return tr('Création de carte de membre (paiement unique)');
    if (r.kind == 'camp') return _campRequestLabel(r);
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
              onPressed: () => go(c, InvoicePage(request: r)),
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
              onPressed: () => _openPayment(r.method, r.amount, currency: r.currency),
              icon: const Icon(Icons.account_balance_wallet_outlined),
              label: Text(isEn ? 'Reopen ${r.method}' : 'Rouvrir ${r.method}'),
            ),
          ),
        ],
      ]);
    });
  }
}

// Liste des paiements du membre, point d'entrée de la vérification
// depuis Plus et depuis la page Dons : chaque demande, même en
// attente, a son bouton Vérifier, avec sa référence affichée.
class VerifyPaymentsListPage extends StatelessWidget {
  const VerifyPaymentsListPage({super.key});

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      final m = app.member;
      final mine = m == null ? <PayRequest>[] : app.requests.where((r) => r.matricule == m.matricule).toList();
      return basic(tr('Vérifier mon paiement'), [
        if (mine.isEmpty)
          EmptyNote(icon: Icons.receipt_long_outlined, text: tr('Aucun paiement pour le moment.'))
        else
          Card(
            child: Column(children: [
              for (final r in mine)
                ListTile(
                  title: Text('${r.kind == 'don' ? tr('Don') : r.kind == 'cotisation' ? tr('Cotisation mensuelle') : r.kind == 'carte' ? tr('Carte') : r.kind == 'camp' ? _campRequestLabel(r) : tr('Achat')} · ${fcfa(r.amount)}', style: t.labelLarge),
                  subtitle: Text('${dateFr(r.date)} · ${r.method} · ${r.ref} · ${r.confirmed ? tr('Paiement confirmé') : tr('En attente de confirmation')}', style: t.bodyMedium),
                  trailing: TextButton(
                    onPressed: () => go(c, VerifyPaymentPage(request: r)),
                    child: Text(tr('Vérifier')),
                  ),
                ),
            ]),
          ),
      ]);
    });
  }
}

// ═══════════════════════════════════════════════════════════════════
// 11. DONS (Wave Business direct)
// ═══════════════════════════════════════════════════════════════════
const List<int> kQuickAmounts = [1000, 2000, 5000, 10000];

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
  // choisi (Wave ou Orange Money), en attente tant que le moyen
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
                    onPressed: () => go(c, InvoicePage(request: r)),
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
              const Icon(Icons.lock_outlined, color: Cp.goldDeep, size: 28),
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
              const Icon(Icons.search_outlined, color: Cp.goldDeep, size: 28),
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
        if (kWaveBaseUrl.isEmpty && kOrangeMoneyUrl.isEmpty) ...[
          const SizedBox(height: Cp.s1),
          Text(tr('Lien Wave de la structure : à configurer avant la mise en service.'), style: t.bodyMedium),
        ],
        const SizedBox(height: Cp.s2),
        SizedBox(
          width: double.infinity,
          height: 52,
          child: OutlinedButton.icon(
            onPressed: () => go(c, const VerifyPaymentsListPage()),
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
                      IconButton(tooltip: tr('Facture'), icon: const Icon(Icons.receipt_long_outlined), onPressed: () => go(c, InvoicePage(request: r)))
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

class EpanouissementPage extends StatefulWidget {
  const EpanouissementPage({super.key});

  @override
  State<EpanouissementPage> createState() => _EpanouissementPageState();
}

class _EpanouissementPageState extends State<EpanouissementPage> {
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
      final done = app.planDone.length;
      return basic(tr('Mon épanouissement'), [
        Text(
          'Un plan de lecture de 21 jours, un journal pour vos prières, vos remerciements et vos objectifs, et un minuteur pour vos temps de prière. Tout est enregistré ici et reste modifiable.',
          style: t.bodyMedium,
        ),
        const SizedBox(height: Cp.s1),
        SizedBox(
          height: 52,
          child: OutlinedButton.icon(
            onPressed: () => go(c, const JournalPage()),
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
        GridView.count(
          crossAxisCount: 3,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisSpacing: 8,
          mainAxisSpacing: 8,
          childAspectRatio: 0.72,
          children: [
            for (var i = 0; i < _planDays.length; i++) Builder(builder: (ctx) {
              final day = i + 1;
              final isDone = app.planDone.contains(day);
              final ref = _planDays[i];
              return Card(
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
                        Text('JOUR $day', style: t.labelMedium?.copyWith(fontWeight: FontWeight.w800)),
                        const Spacer(),
                        if (isDone) const Icon(Icons.check_circle, size: 18, color: Cp.goldDeep),
                      ]),
                      const SizedBox(height: 4),
                      Text(ref.$3, style: t.bodyMedium),
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
        ),
        const SizedBox(height: Cp.s3),
        heading(c, tr('Mon journal personnel')),
        Text(
          'Vos prières exaucées, vos gratitudes, vos objectifs et vos méditations, pour vous seul, dans votre espace. Les sujets de prière à transmettre à la structure restent dans la section privée plus bas.',
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
            'Votre journal est encore vide, ce n\'est pas une erreur. Écrivez votre première prière, gratitude ou objectif avec le bouton « Écrire » ci-dessus.',
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

  bool get _running => _timer?.isActive ?? false;

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _start() {
    if (_left <= 0) _left = _minutes * 60;
    _timer?.cancel();
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
    unawaited(DailyVerseNotifications.instance.cancelPrayerTimerEnd());
    setState(() {});
  }

  void _reset() {
    _timer?.cancel();
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
Future<void> _publishCarteVideo(BuildContext c, Map<String, String> v) async {
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
    toast(c, tr('Carte vidéo publiée, visible sur l’accueil des membres.'));
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
Future<void> _updateCampServer(BuildContext c, Camp camp, {DateTimeRange? plage}) async {
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

/// Publication d'une activité depuis l'espace structure, 27 oct. 2026 :
/// avant, Ajouter une activité ne faisait que ajouter une chaîne de
/// caractères, donc sans image, sans modification possible, et sans
/// publication serveur. L'activité est d'abord ajoutée en local, puis
/// publiée via POST /admin/etablissements/:id/activites si l'établissement
/// a un identifiant serveur et si l'application est connectée, avec son
/// image téléversée si présente. Sinon, elle reste locale seulement.
Future<void> _publishActivite(BuildContext c, Etab etab, ActivityItem activity) async {
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

// Tous les paiements des membres, côté serveur, 28 oct. 2026 :
// quand un membre clique sur Payer, sa demande est créée côté
// serveur en attente, elle apparaît ici, et l'administrateur la
// valide ou la refuse après contrôle de son compte Wave. La
// validation serveur génère la facture et débloque le livre, et
// l'application du membre se met à jour au prochain chargement.
// Réservé à l'administrateur général, comme la route serveur.
class _ServerPaymentsSection extends StatefulWidget {
  const _ServerPaymentsSection();

  @override
  State<_ServerPaymentsSection> createState() => _ServerPaymentsSectionState();
}

class _ServerPaymentsSectionState extends State<_ServerPaymentsSection> {
  String _filter = 'en_attente';
  List<Map<String, dynamic>> _payments = [];
  bool _loading = true;
  String? _error;
  Timer? _timer;
  DateTime? _lastRefresh;

  @override
  void initState() {
    super.initState();
    _load();
    _timer = Timer.periodic(const Duration(seconds: 30), (_) {
      if (mounted) _load(silent: true);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  Future<void> _load({bool silent = false}) async {
    if (!silent) {
      setState(() {
        _loading = true;
        _error = null;
      });
    }
    try {
      final list = await api.fetchAdminPayments(statut: _filter == 'tous' ? null : _filter);
      if (!mounted) return;
      setState(() {
        _payments = list;
        _loading = false;
        _lastRefresh = DateTime.now();
        if (!silent) _error = null;
      });
    } catch (e) {
      if (silent) return;
      if (!mounted) return;
      setState(() {
        _payments = [];
        _loading = false;
        _error = e.toString().contains('(403)')
            ? 'Liste serveur réservée à l’administrateur général. Un administrateur d’établissement ne la voit pas.'
            : 'Liste serveur indisponible : $e';
      });
    }
  }

  String _typeLabel(String type) {
    switch (type) {
      case 'achat':
        return 'Achat';
      case 'carte':
        return 'Carte';
      case 'cotisation':
        return 'Cotisation';
      default:
        return 'Don';
    }
  }

  Future<void> _validate(Map<String, dynamic> pay) async {
    final id = (pay['id'] ?? '').toString();
    final ref = (pay['reference'] ?? '').toString();
    final amount = (pay['montant_fcfa'] as num?)?.toInt() ?? 0;
    final waveCtrl = TextEditingController();
    String? moyen;
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setD) => AlertDialog(
          title: Text(tr('Valider ce paiement ?')),
          content: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(isEn ? 'Only confirm after checking the payment received: ${fcfa(amount)} for reference $ref.' : 'Validez seulement après avoir contrôlé le paiement reçu : ${fcfa(amount)} pour la référence $ref.'),
            const SizedBox(height: Cp.s1),
            Text(tr('Moyen de paiement'), style: const TextStyle(fontWeight: FontWeight.w700)),
            for (final m in const [('especes', 'Espèces'), ('wave', 'Wave'), ('orange_money', 'Orange Money'), ('paypal', 'PayPal')])
              RadioListTile<String>(
                title: Text(tr(m.$2)),
                value: m.$1,
                groupValue: moyen,
                onChanged: (v) => setD(() => moyen = v),
                contentPadding: EdgeInsets.zero,
                dense: true,
              ),
            if (moyen == 'wave')
              TextField(
                controller: waveCtrl,
                decoration: InputDecoration(
                  hintText: tr('Identifiant Wave, facultatif'),
                  filled: true,
                  fillColor: Cp.card,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
                ),
              ),
          ]),
          actions: [
            TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
            FilledButton(onPressed: moyen == null ? null : () => Navigator.pop(ctx, true), child: Text(tr('Valider'))),
          ],
        ),
      ),
    );
    final waveId = waveCtrl.text.trim();
    waveCtrl.dispose();
    if (ok != true || !mounted) return;
    try {
      await api.validateAdminPayment(id, waveTransactionId: moyen == 'wave' && waveId.length >= 6 ? waveId : null, moyen: moyen);
      if (!mounted) return;
      toast(context, tr('Paiement validé côté serveur, facture générée.'));
      _load();
    } catch (e) {
      if (mounted) toast(context, 'Validation impossible : $e');
    }
  }

  Future<void> _refuse(Map<String, dynamic> pay) async {
    final id = (pay['id'] ?? '').toString();
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Refuser ce paiement ?')),
        content: Text(tr('Le membre le verra comme refusé au prochain chargement, pas comme en attente.')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Refuser'))),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    try {
      await api.refuseAdminPayment(id);
      if (!mounted) return;
      toast(context, tr('Paiement refusé.'));
      _load();
    } catch (e) {
      if (mounted) toast(context, 'Refus impossible : $e');
    }
  }

  Future<void> _showBooks(Map<String, dynamic> pay) async {
    try {
      final detail = await api.fetchAdminPayment((pay['id'] ?? '').toString());
      if (!mounted) return;
      final lignes = detail['lignes'];
      final items = lignes is List ? lignes : const [];
      showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          title: Text(tr('Livres achetés')),
          content: items.isEmpty
              ? Text(tr('Aucun livre détaillé pour ce paiement.'))
              : Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
                  for (final l in items) Text('${l['titre'] ?? ''} · ${fcfa((l['prix_fcfa'] as num?)?.toInt() ?? 0)}'),
                ]),
          actions: [TextButton(onPressed: () => Navigator.pop(ctx), child: Text(tr('Fermer')))],
        ),
      );
    } catch (e) {
      if (mounted) toast(context, 'Détail indisponible : $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      heading(context, tr('Tous les paiements des membres')),
      Text(
        tr('Quand un membre clique sur Payer, sa demande apparaît ici en attente de validation. Validez seulement après avoir contrôlé le paiement reçu, en choisissant le moyen réellement utilisé, puis l’application du membre se met à jour au prochain chargement, avec la facture si le paiement est confirmé.'),
        style: t.bodyMedium,
      ),
      if (_lastRefresh != null)
        Text(
          tr('Liste actualisée automatiquement toutes les 30 secondes, dernière actualisation à ${_lastRefresh!.hour.toString().padLeft(2, '0')}:${_lastRefresh!.minute.toString().padLeft(2, '0')}.'),
          style: t.bodyMedium,
        ),
      const SizedBox(height: Cp.s1),
      Wrap(spacing: Cp.s1, children: [
        for (final f in const [('en_attente', 'En attente'), ('confirme', 'Confirmés'), ('refuse', 'Refusés'), ('tous', 'Tous')])
          ChoiceChip(
            label: Text(tr(f.$2)),
            selected: _filter == f.$1,
            selectedColor: Cp.gold,
            onSelected: (_) {
              if (_filter == f.$1) return;
              setState(() => _filter = f.$1);
              _load();
            },
          ),
        IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load),
      ]),
      const SizedBox(height: Cp.s1),
      if (_loading)
        const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator()))
      else if (_error != null)
        Text(_error!, style: t.bodyMedium)
      else if (_payments.isEmpty)
        Text(tr('Aucun paiement dans cette catégorie pour le moment.'), style: t.bodyMedium)
      else
        Card(
          child: Column(children: [
            for (var i = 0; i < _payments.length; i++) ...[
              if (i > 0) const Divider(height: 1),
              ListTile(
                title: Text('${_typeLabel((_payments[i]['type'] ?? '').toString())} · ${fcfa((_payments[i]['montant_fcfa'] as num?)?.toInt() ?? 0)}', style: t.labelLarge),
                subtitle: Text('${_payments[i]['nom_complet'] ?? ''} · ${_payments[i]['matricule'] ?? ''} · ${_payments[i]['reference'] ?? ''} · ${dateFr(DateTime.tryParse((_payments[i]['cree_le'] ?? '').toString()) ?? DateTime.now())}${((_payments[i]['wave_transaction_id'] ?? '').toString().isNotEmpty) ? ' · Wave ${_payments[i]['wave_transaction_id']}' : ''}${_suffixMoyen((_payments[i]['moyen'] ?? '').toString())}', style: t.bodyMedium),
                trailing: _filter == 'en_attente'
                    ? Row(mainAxisSize: MainAxisSize.min, children: [
                        if ((_payments[i]['type'] ?? '').toString() == 'achat')
                          IconButton(tooltip: tr('Livres achetés'), icon: const Icon(Icons.auto_stories_outlined), onPressed: () => _showBooks(_payments[i])),
                        TextButton(onPressed: () => _refuse(_payments[i]), child: Text(tr('Refuser'))),
                        const SizedBox(width: 4),
                        FilledButton(onPressed: () => _validate(_payments[i]), child: Text(tr('Valider'))),
                      ])
                    : Text((_payments[i]['statut'] ?? '').toString() == 'confirme' ? tr('Confirmé') : tr('Refusé'), style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: (_payments[i]['statut'] ?? '').toString() == 'confirme' ? Cp.ok : const Color(0xFFB42318))),
              ),
            ],
          ]),
        ),
    ]);
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
// quand aucun moyen n'a été enregistré, par exemple pour un paiement
// validé avant ce correctif ou confirmé automatiquement.
String _suffixMoyen(String m) {
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
class ScanCardPage extends StatefulWidget {
  const ScanCardPage({super.key});
  @override
  State<ScanCardPage> createState() => _ScanCardPageState();
}

class _ScanCardPageState extends State<ScanCardPage> {
  final _matCtrl = TextEditingController();
  final _scannerCtrl = MobileScannerController();
  String? _matricule;
  List<Map<String, dynamic>> _payments = [];
  bool _loading = false;
  bool _scanning = true;
  String? _error;
  String? _cameraError;

  @override
  void dispose() {
    _matCtrl.dispose();
    _scannerCtrl.dispose();
    super.dispose();
  }

  String? _extractMatricule(String raw) {
    final m = RegExp(r'CP-[0-9][0-9-]*').firstMatch(raw.trim().toUpperCase());
    return m?.group(0);
  }

  Future<void> _load(String matricule) async {
    setState(() {
      _matricule = matricule;
      _scanning = false;
      _loading = true;
      _error = null;
    });
    try {
      final list = await api.fetchAdminPayments(matricule: matricule);
      if (!mounted) return;
      list.sort((a, b) {
        final sa = (a['statut'] ?? '').toString();
        final sb = (b['statut'] ?? '').toString();
        if ((sa == 'en_attente') != (sb == 'en_attente')) return sa == 'en_attente' ? -1 : 1;
        return (b['cree_le'] ?? '').toString().compareTo((a['cree_le'] ?? '').toString());
      });
      setState(() {
        _payments = list;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _payments = [];
        _loading = false;
        _error = 'Achats indisponibles : $e';
      });
    }
  }

  void _onDetect(BarcodeCapture capture) {
    if (!_scanning) return;
    for (final b in capture.barcodes) {
      final mat = b.rawValue == null ? null : _extractMatricule(b.rawValue!);
      if (mat != null) {
        _load(mat);
        return;
      }
    }
  }

  Future<void> _validate(Map<String, dynamic> pay) async {
    final id = (pay['id'] ?? '').toString();
    final ref = (pay['reference'] ?? '').toString();
    final amount = (pay['montant_fcfa'] as num?)?.toInt() ?? 0;
    final waveCtrl = TextEditingController();
    String? moyen;
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setD) => AlertDialog(
          title: Text(tr('Valider ce paiement ?')),
          content: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(isEn ? 'Only confirm after checking the payment received: ${fcfa(amount)} for reference $ref.' : 'Validez seulement après avoir contrôlé le paiement reçu : ${fcfa(amount)} pour la référence $ref.'),
            const SizedBox(height: Cp.s1),
            Text(tr('Moyen de paiement'), style: const TextStyle(fontWeight: FontWeight.w700)),
            for (final m in const [('especes', 'Espèces'), ('wave', 'Wave'), ('orange_money', 'Orange Money'), ('paypal', 'PayPal')])
              RadioListTile<String>(
                title: Text(tr(m.$2)),
                value: m.$1,
                groupValue: moyen,
                onChanged: (v) => setD(() => moyen = v),
                contentPadding: EdgeInsets.zero,
                dense: true,
              ),
            if (moyen == 'wave')
              TextField(
                controller: waveCtrl,
                decoration: InputDecoration(
                  hintText: tr('Identifiant Wave, facultatif'),
                  filled: true,
                  fillColor: Cp.card,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
                ),
              ),
          ]),
          actions: [
            TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
            FilledButton(onPressed: moyen == null ? null : () => Navigator.pop(ctx, true), child: Text(tr('Valider'))),
          ],
        ),
      ),
    );
    final waveId = waveCtrl.text.trim();
    waveCtrl.dispose();
    if (ok != true || !mounted || _matricule == null) return;
    try {
      await api.validateAdminPayment(id, waveTransactionId: moyen == 'wave' && waveId.length >= 6 ? waveId : null, moyen: moyen);
      if (!mounted) return;
      toast(context, tr('Paiement validé côté serveur, facture générée.'));
      await _load(_matricule!);
    } catch (e) {
      if (mounted) toast(context, 'Validation impossible : $e');
    }
  }

  Future<void> _enregistrerEspeces() async {
    if (_matricule == null) return;
    final name = _payments.isEmpty ? '' : (_payments.first['nom_complet'] ?? '').toString();
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Enregistrer un règlement en espèces ?')),
        content: Text(isEn ? 'Record a cash payment of 1000 FCFA for this month’s contribution for ${name.isNotEmpty ? '$name · ' : ''}$_matricule? The member’s monthly reminder will disappear.' : 'Enregistrer un règlement en espèces de 1000 FCFA pour la cotisation du mois pour ${name.isNotEmpty ? '$name · ' : ''}$_matricule ? Le rappel de cotisation du mois disparaîtra.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Enregistrer'))),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    try {
      await api.enregistrerCotisationEspeces(_matricule!);
      if (!mounted) return;
      toast(context, tr('Règlement en espèces enregistré.'));
      await _load(_matricule!);
    } catch (e) {
      if (!mounted) return;
      if ('$e'.contains('déjà enregistrée')) {
        toast(context, tr('Cotisation du mois déjà enregistrée.'));
      } else {
        toast(context, 'Enregistrement impossible : $e');
      }
    }
  }

  Future<void> _refuse(Map<String, dynamic> pay) async {
    final id = (pay['id'] ?? '').toString();
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Refuser ce paiement ?')),
        content: Text(tr('Le membre le verra comme refusé au prochain chargement, pas comme en attente.')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Refuser'))),
        ],
      ),
    );
    if (ok != true || !mounted || _matricule == null) return;
    try {
      await api.refuseAdminPayment(id);
      if (!mounted) return;
      toast(context, tr('Paiement refusé.'));
      await _load(_matricule!);
    } catch (e) {
      if (mounted) toast(context, 'Refus impossible : $e');
    }
  }

  Future<void> _showBooks(Map<String, dynamic> pay) async {
    try {
      final detail = await api.fetchAdminPayment((pay['id'] ?? '').toString());
      if (!mounted) return;
      final lignes = detail['lignes'];
      final items = lignes is List ? lignes : const [];
      showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          title: Text(tr('Livres achetés')),
          content: items.isEmpty
              ? Text(tr('Aucun livre détaillé pour ce paiement.'))
              : Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
                  for (final l in items) Text('${l['titre'] ?? ''} · ${fcfa((l['prix_fcfa'] as num?)?.toInt() ?? 0)}'),
                ]),
          actions: [TextButton(onPressed: () => Navigator.pop(ctx), child: Text(tr('Fermer')))],
        ),
      );
    } catch (e) {
      if (mounted) toast(context, 'Détail indisponible : $e');
    }
  }

  String _typeLabel(String type) {
    switch (type) {
      case 'achat':
        return 'Achat';
      case 'carte':
        return 'Carte';
      case 'cotisation':
        return 'Cotisation';
      default:
        return 'Don';
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final hasPendingCotisation = _payments.any((p) => (p['type'] ?? '').toString() == 'cotisation' && (p['statut'] ?? '').toString() == 'en_attente');
    final children = <Widget>[
      Text(isWindowsDesktop ? (isEn ? 'On Windows, type the member number below. The server then shows that member’s purchases.' : 'Sur Windows, saisissez le matricule ci-dessous. Le serveur affiche ensuite les achats de ce membre.') : (isEn ? 'Point the camera at a member card QR code. The code holds only the member number, and the server then shows that member’s purchases.' : 'Pointez la caméra vers le QR code de la carte d’un membre. Le code ne contient que le matricule, et le serveur affiche ensuite les achats de ce membre.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s1),
    ];
    if (_matricule == null) {
      if (_cameraError == null && !isWindowsDesktop) {
        children.addAll([
          SizedBox(
            height: 280,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(24),
              child: MobileScanner(
                controller: _scannerCtrl,
                onDetect: _onDetect,
                errorBuilder: (ctx, err, child) {
                  WidgetsBinding.instance.addPostFrameCallback((_) {
                    if (mounted && _cameraError == null) setState(() => _cameraError = 'Caméra indisponible.');
                  });
                  return Container(color: Cp.navy, child: Center(child: Text(tr('Caméra indisponible, saisissez le matricule ci-dessous.'), style: const TextStyle(color: Colors.white), textAlign: TextAlign.center)));
                },
              ),
            ),
          ),
          const SizedBox(height: Cp.s1),
        ]);
      } else {
        children.add(Text(isWindowsDesktop ? (isEn ? 'On Windows, type the member number below.' : 'Sur Windows, saisissez le matricule ci-dessous.') : tr('Caméra indisponible, saisissez le matricule ci-dessous.'), style: t.bodyMedium));
      }
      children.addAll([
        TextField(
          controller: _matCtrl,
          decoration: InputDecoration(
            hintText: tr('Matricule, par exemple CP-000006'),
            filled: true,
            fillColor: Cp.card,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
          ),
        ),
        const SizedBox(height: Cp.s1),
        FilledButton(
          onPressed: () {
            final mat = _extractMatricule(_matCtrl.text);
            if (mat == null) {
              toast(context, tr('Matricule non reconnu.'));
              return;
            }
            _load(mat);
          },
          child: Text(tr('Voir ses achats')),
        ),
      ]);
    } else {
      final name = _payments.isEmpty ? '' : (_payments.first['nom_complet'] ?? '').toString();
      children.addAll([
        Row(children: [
          Expanded(child: Text('${name.isNotEmpty ? '$name · ' : ''}$_matricule', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
          TextButton(
            onPressed: () => setState(() {
              _matricule = null;
              _payments = [];
              _scanning = true;
              _cameraError = null;
            }),
            child: Text(isWindowsDesktop ? (isEn ? 'Find another member' : 'Chercher un autre membre') : tr('Scanner une autre carte')),
          ),
        ]),
        const SizedBox(height: Cp.s1),
        // Règlement en espèces du mois, 29 oct. 2026 : proposé quand
        // aucune demande de cotisation n'est en attente, donc aussi
        // quand le membre n'a aucune demande du tout. Le serveur
        // refuse proprement si le mois est déjà enregistré.
        if (!hasPendingCotisation)
          FilledButton.icon(
            onPressed: _enregistrerEspeces,
            icon: const Icon(Icons.payments_outlined),
            label: Text(tr('Enregistrer un règlement en espèces')),
            style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
          ),
        if (!hasPendingCotisation) const SizedBox(height: Cp.s1),
        if (_loading)
          const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator()))
        else if (_error != null)
          Text(_error!, style: t.bodyMedium)
        else if (_payments.isEmpty)
          Text(tr('Aucun achat en ligne pour ce membre pour le moment.'), style: t.bodyMedium)
        else
          Card(
            child: Column(children: [
              for (var i = 0; i < _payments.length; i++) ...[
                if (i > 0) const Divider(height: 1),
                ListTile(
                  title: Text('${_typeLabel((_payments[i]['type'] ?? '').toString())} · ${fcfa((_payments[i]['montant_fcfa'] as num?)?.toInt() ?? 0)}', style: t.labelLarge),
                  subtitle: Text('${_payments[i]['reference'] ?? ''} · ${dateFr(DateTime.tryParse((_payments[i]['cree_le'] ?? '').toString()) ?? DateTime.now())}${((_payments[i]['wave_transaction_id'] ?? '').toString().isNotEmpty) ? ' · Wave ${_payments[i]['wave_transaction_id']}' : ''}${_suffixMoyen((_payments[i]['moyen'] ?? '').toString())}', style: t.bodyMedium),
                  trailing: (_payments[i]['statut'] ?? '').toString() == 'en_attente'
                      ? Row(mainAxisSize: MainAxisSize.min, children: [
                          if ((_payments[i]['type'] ?? '').toString() == 'achat')
                            IconButton(tooltip: tr('Livres achetés'), icon: const Icon(Icons.auto_stories_outlined), onPressed: () => _showBooks(_payments[i])),
                          // Le refus reste réservé à l'administrateur
                          // général côté serveur : le bouton est masqué
                          // pour l'administrateur d'établissement.
                          if (!app.isAdminEtablissement)
                            TextButton(onPressed: () => _refuse(_payments[i]), child: Text(tr('Refuser'))),
                          const SizedBox(width: 4),
                          FilledButton(onPressed: () => _validate(_payments[i]), child: Text(tr('Valider'))),
                        ])
                      : Text((_payments[i]['statut'] ?? '').toString() == 'confirme' ? tr('Confirmé') : tr('Refusé'), style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: (_payments[i]['statut'] ?? '').toString() == 'confirme' ? Cp.ok : const Color(0xFFB42318))),
                ),
              ],
            ]),
          ),
      ]);
    }
    return basic(tr('Scanner une carte'), children);
  }
}


// ───────────────────────── Présences, phase 1, 29 oct. 2026 ─────────────────────────
// Page de scan de présence SÉPARÉE de la page de scan de paiement : jamais
// de bascule entre les deux. Le scan lit le QR de la carte (matricule),
// comme le scan de paiement, puis le serveur marque la présence, refuse
// le doublon et contrôle le périmètre. L'application affiche le message
// renvoyé par le serveur, sans détail technique. Une présence annulée
// reste visible comme annulée, elle n'est jamais effacée.
class _ChoixActivite {
  _ChoixActivite(this.id, this.nom, this.type, this.etab);
  final String id, nom, type, etab;
}

Future<_ChoixActivite?> choisirActivite(BuildContext c) {
  final choix = <_ChoixActivite>[];
  for (final camp in app.camps) {
    if (camp.serverId.isNotEmpty) choix.add(_ChoixActivite(camp.serverId, camp.name, 'evenement', ''));
  }
  final monEtab = app.member == null ? '' : etabDisplayName(app.member!.etab);
  for (final e in app.etabs) {
    if (app.isAdminGeneral || e.name == monEtab || etabDisplayName(e.name) == monEtab) {
      for (final a in e.activities) {
        if (a.serverId.isNotEmpty) choix.add(_ChoixActivite(a.serverId, a.title, 'activite_etablissement', e.name));
      }
    }
  }
  if (choix.isEmpty) {
    toast(c, tr('Aucune activité sur le serveur pour le moment.'));
    return Future.value(null);
  }
  return pick<_ChoixActivite>(c, tr('Choisir une activité'), choix,
      (a) => a.type == 'evenement' ? '${tr('Camp')} : ${a.nom}' : '${a.etab} : ${a.nom}');
}

String _statutPresenceLabel(String s) => s == 'present' ? tr('Présent') : s == 'annule' ? tr('Annulé') : tr('Absent');

Widget _statutPresenceChip(String s) {
  final bg = s == 'present' ? const Color(0xFFE6F4EA) : s == 'annule' ? const Color(0xFFFDECEA) : const Color(0xFFEFF1F5);
  final fg = s == 'present' ? const Color(0xFF137333) : s == 'annule' ? const Color(0xFFB42318) : Cp.inkMuted;
  return Container(
    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
    decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(999)),
    child: Text(_statutPresenceLabel(s), style: TextStyle(color: fg, fontWeight: FontWeight.w700, fontSize: 13)),
  );
}

String _dateHeure(String? iso) {
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
String _campRequestLabel(PayRequest r) {
  var label = tr('Versement du camp');
  if (r.campName.isNotEmpty) label = '$label, ${r.campName}';
  if (r.numeroVersement > 0) label = '$label (${tr('Versement')} ${r.numeroVersement} ${tr('sur 6')})';
  return label;
}

String _typePaiementLabel(String type) {
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

IconData _typePaiementIcone(String type) {
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

String _statutPaiementLabel(String statut) {
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

Color _statutPaiementCouleur(String statut) {
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

Color _statutPaiementFond(String statut) {
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

Widget _pastilleStatutPaiement(String statut) {
  return Container(
    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
    decoration: BoxDecoration(color: _statutPaiementFond(statut), borderRadius: BorderRadius.circular(20)),
    child: Text(_statutPaiementLabel(statut), style: TextStyle(fontWeight: FontWeight.w700, fontSize: 12, color: _statutPaiementCouleur(statut))),
  );
}

String _moyenPaiementLabel(String? moyen) {
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

String _dateIso(DateTime d) => '${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';

PayRequest _payRequestFromRow(Map<String, dynamic> row, {required bool isAdmin}) {
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
    method: _moyenPaiementLabel(moyen.isEmpty ? null : moyen),
  );
  if (row['statut'] == 'confirme') {
    r.confirmed = true;
    final ca = DateTime.tryParse((row['confirme_le'] ?? '').toString());
    if (ca != null) r.confirmedAt = ca;
  }
  if (row['statut'] == 'refuse') r.refused = true;
  return r;
}

Widget _carteOperation(BuildContext c, Map<String, dynamic> row, {required bool isAdmin, required VoidCallback onTap}) {
  final t = Theme.of(c).textTheme;
  final type = (row['type'] ?? 'don').toString();
  final statut = (row['statut'] ?? 'en_attente').toString();
  final montant = (row['montant_fcfa'] as num?)?.toInt() ?? 0;
  final signe = isAdmin ? '+' : '-';
  final lignes = row['lignes'];
  var libelle = _typePaiementLabel(type);
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
    if (numero > 0) sousTitre.add('${tr('Versement')} $numero ${tr('sur 6')}');
  }
  sousTitre.add(_dateHeure((row['cree_le'] ?? '').toString()));
  final moyen = (row['moyen'] ?? '').toString();
  if (moyen.isNotEmpty) sousTitre.add(_moyenPaiementLabel(moyen));
  return Card(
    child: ListTile(
      leading: Container(
        width: 48,
        height: 48,
        decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(14)),
        child: Icon(_typePaiementIcone(type), color: Cp.gold, size: 26),
      ),
      title: Text(libelle, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
      subtitle: Text(sousTitre.join(' · '), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
      trailing: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Text('$signe ${fcfa(montant)}', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
          const SizedBox(height: 4),
          _pastilleStatutPaiement(statut),
        ],
      ),
      onTap: onTap,
    ),
  );
}

String _csvChamp(String v) => '"${v.replaceAll('"', '""')}"';

class PresenceScanPage extends StatefulWidget {
  const PresenceScanPage({super.key, required this.activiteId, required this.activiteNom});
  final String activiteId, activiteNom;
  @override
  State<PresenceScanPage> createState() => _PresenceScanPageState();
}

class _PresenceScanPageState extends State<PresenceScanPage> {
  final _matCtrl = TextEditingController();
  final _scannerCtrl = MobileScannerController();
  String? _matricule;
  Map<String, dynamic>? _resultat;
  bool _loading = false;
  bool _scanning = true;
  String? _error;
  String? _cameraError;

  @override
  void dispose() {
    _matCtrl.dispose();
    _scannerCtrl.dispose();
    super.dispose();
  }

  String? _extractMatricule(String raw) {
    final m = RegExp(r'CP-[0-9][0-9-]*').firstMatch(raw.trim().toUpperCase());
    return m?.group(0);
  }

  Future<void> _load(String matricule) async {
    setState(() {
      _matricule = matricule;
      _scanning = false;
      _loading = true;
      _error = null;
      _resultat = null;
    });
    try {
      final r = await api.scanPresence(activiteId: widget.activiteId, matricule: matricule);
      if (!mounted) return;
      setState(() {
        _resultat = r;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = '$e';
      });
    }
  }

  void _onDetect(BarcodeCapture capture) {
    if (!_scanning) return;
    for (final b in capture.barcodes) {
      final mat = b.rawValue == null ? null : _extractMatricule(b.rawValue!);
      if (mat != null) {
        _load(mat);
        return;
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final children = <Widget>[
      Text(widget.activiteNom, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
      const SizedBox(height: Cp.s1),
      Text(isWindowsDesktop ? (isEn ? 'On Windows, type the member number below. The server marks the attendance, refuses a duplicate, and checks your perimeter.' : 'Sur Windows, saisissez le matricule ci-dessous. Le serveur marque la présence, refuse le doublon et contrôle votre périmètre.') : (isEn ? 'Point the camera at a member card QR code. The server marks the attendance, refuses a duplicate, and checks your perimeter.' : 'Pointez la caméra vers le QR code de la carte d’un membre. Le serveur marque la présence, refuse le doublon et contrôle votre périmètre.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s1),
    ];
    if (_matricule == null) {
      if (_cameraError == null && !isWindowsDesktop) {
        children.addAll([
          SizedBox(
            height: 280,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(24),
              child: MobileScanner(
                controller: _scannerCtrl,
                onDetect: _onDetect,
                errorBuilder: (ctx, err, child) {
                  WidgetsBinding.instance.addPostFrameCallback((_) {
                    if (mounted && _cameraError == null) setState(() => _cameraError = 'Caméra indisponible.');
                  });
                  return Container(color: Cp.navy, child: Center(child: Text(tr('Caméra indisponible, saisissez le matricule ci-dessous.'), style: const TextStyle(color: Colors.white), textAlign: TextAlign.center)));
                },
              ),
            ),
          ),
          const SizedBox(height: Cp.s1),
        ]);
      } else {
        children.add(Text(isWindowsDesktop ? (isEn ? 'On Windows, type the member number below.' : 'Sur Windows, saisissez le matricule ci-dessous.') : tr('Caméra indisponible, saisissez le matricule ci-dessous.'), style: t.bodyMedium));
      }
      children.addAll([
        TextField(
          controller: _matCtrl,
          decoration: InputDecoration(
            hintText: tr('Matricule, par exemple CP-000006'),
            filled: true,
            fillColor: Cp.card,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
          ),
        ),
        const SizedBox(height: Cp.s1),
        FilledButton(
          onPressed: () {
            final mat = _extractMatricule(_matCtrl.text);
            if (mat == null) {
              toast(context, tr('Matricule non reconnu.'));
              return;
            }
            _load(mat);
          },
          child: Text(tr('Marquer présent')),
        ),
      ]);
    } else {
      final nom = (_resultat?['nom_complet'] ?? '').toString();
      children.addAll([
        Row(children: [
          Expanded(child: Text('${nom.isNotEmpty ? '$nom · ' : ''}$_matricule', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
          TextButton(
            onPressed: () => setState(() {
              _matricule = null;
              _resultat = null;
              _scanning = true;
              _cameraError = null;
            }),
            child: Text(isWindowsDesktop ? (isEn ? 'Find another member' : 'Chercher un autre membre') : tr('Scanner une autre carte')),
          ),
        ]),
        const SizedBox(height: Cp.s1),
        if (_loading)
          const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator()))
        else if (_error != null)
          Text(_error!, style: t.bodyMedium)
        else if (_resultat != null) ...[
          Card(
            child: ListTile(
              leading: const Icon(Icons.check_circle_outlined, color: Cp.ok),
              title: Text(tr('Présence marquée'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
              subtitle: Text('${_resultat!['nom_complet'] ?? ''} · ${_resultat!['matricule'] ?? ''}', style: t.bodyMedium),
            ),
          ),
          const SizedBox(height: Cp.s1),
          OutlinedButton.icon(
            icon: const Icon(Icons.playlist_add_check_outlined),
            label: Text(tr('Voir la liste')),
            onPressed: () => go(context, PresenceListPage(activiteId: widget.activiteId, activiteNom: widget.activiteNom)),
          ),
        ],
      ]);
    }
    return basic(tr('Scanner une présence'), children);
  }
}

class PresenceListPage extends StatefulWidget {
  const PresenceListPage({super.key, required this.activiteId, required this.activiteNom});
  final String activiteId, activiteNom;
  @override
  State<PresenceListPage> createState() => _PresenceListPageState();
}

class _PresenceListPageState extends State<PresenceListPage> {
  List<Map<String, dynamic>> _entrees = [];
  bool _loading = true;
  String? _error;
  String _activiteType = '';
  Map<String, dynamic>? _taux;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
      _taux = null;
    });
    try {
      final d = await api.fetchPresencesActivite(widget.activiteId);
      if (!mounted) return;
      setState(() {
        _entrees = ((d['entrees'] as List?) ?? []).map((e) => e as Map<String, dynamic>).toList();
        _activiteType = ((d['activite'] as Map?) ?? {})['type']?.toString() ?? '';
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = '$e';
      });
    }
    // Taux, lot 1, 31 oct. 2026 : calcul serveur, dans le même
    // périmètre que la liste. En cas d'échec, la carte reste
    // masquée et la liste reste utilisable.
    if (_error == null) {
      try {
        final taux = await api.fetchTauxPresence(widget.activiteId);
        if (!mounted) return;
        setState(() => _taux = taux);
      } catch (_) {
        // Carte masquée, sans erreur visible.
      }
    }
  }

  Future<void> _ajouterManuel() async {
    try {
      final membres = await api.fetchAdminMembres(inclureSansEtablissement: true);
      if (!mounted) return;
      if (membres.isEmpty) {
        toast(context, tr('Aucun membre dans votre périmètre.'));
        return;
      }
      // Ne proposer que les personnes qu'il reste à marquer, 30 oct.
      // 2026 : celles qui sont déjà présentes ne peuvent pas être
      // ajoutées une deuxième fois, le serveur les refuse, le sélecteur
      // ne les propose donc plus. Les absents et les annulés restent
      // proposés, les annulés sont ainsi rétablis par l'ajout.
      final dejaPresents = _entrees.where((e) => e['statut'] == 'present').map((e) => (e['membre_id'] ?? '').toString()).toSet();
      final candidats = membres.where((m) => !dejaPresents.contains((m['id'] ?? '').toString())).toList();
      if (candidats.isEmpty) {
        toast(context, tr('Tous les membres de votre périmètre sont déjà présents.'));
        return;
      }
      final choix = await pick<Map<String, dynamic>>(context, tr('Choisir un membre'), candidats, (m) => '${m['nom_complet'] ?? ''} · ${m['matricule'] ?? ''}');
      if (choix == null) return;
      await api.addPresenceManuel(activiteId: widget.activiteId, membreId: (choix['id'] ?? '').toString());
      if (!mounted) return;
      toast(context, tr('Présence marquée.'));
      _load();
    } catch (e) {
      if (!mounted) return;
      toast(context, '$e');
    }
  }

  Future<void> _marquerPresent(Map<String, dynamic> entree) async {
    try {
      await api.addPresenceManuel(activiteId: widget.activiteId, membreId: (entree['membre_id'] ?? '').toString());
      if (!mounted) return;
      toast(context, tr('Présence marquée.'));
      _load();
    } catch (e) {
      if (!mounted) return;
      toast(context, '$e');
    }
  }

  Future<void> _annuler(Map<String, dynamic> entree) async {
    final id = (entree['presence_id'] ?? '').toString();
    if (id.isEmpty) return;
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Annuler cette présence ?')),
        content: Text(tr('La présence restera visible comme annulée, elle ne sera pas effacée.')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Confirmer'))),
        ],
      ),
    );
    if (ok != true) return;
    try {
      await api.annulerPresence(id);
      if (!mounted) return;
      toast(context, tr('Présence annulée.'));
      _load();
    } catch (e) {
      if (!mounted) return;
      toast(context, '$e');
    }
  }

  // Certificat de participation, lot 1, 31 oct. 2026 : les dates et
  // le lieu viennent du camp synchronisé, tels que le serveur les
  // contient. Sans camp retrouvé, le certificat ne montre que le
  // nom, sans rien compléter.
  Future<void> _certificat(Map<String, dynamic> entree) async {
    Camp? camp;
    for (final c in app.camps) {
      if (c.serverId == widget.activiteId) camp = c;
    }
    final html = buildCertificateHtml(PrintCertificate(
      name: (entree['nom_complet'] ?? '').toString(),
      matricule: (entree['matricule'] ?? '').toString(),
      campName: widget.activiteNom,
      campDates: camp?.dates ?? '',
      campLieu: camp?.place ?? '',
    ), isEnglish: isEn);
    final base = 'certificat-${(entree['matricule'] ?? '').toString()}'.replaceAll(RegExp(r'[^A-Za-z0-9_-]'), '');
    try {
      await openPrintDocument('${base.isEmpty ? 'certificat' : base}.html', html);
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de créer le certificat.'));
    }
  }

  Future<void> _exporter() async {
    if (_entrees.isEmpty) {
      toast(context, tr('Aucune ligne à exporter.'));
      return;
    }
    final lignes = <String>[_csvChamp(tr('Nom')) + ';' + _csvChamp(tr('Matricule')) + ';' + _csvChamp(tr('Statut')) + ';' + _csvChamp(tr('Inscrit')) + ';' + _csvChamp(tr('Date et heure')) + ';' + _csvChamp(tr('Méthode'))];
    for (final e in _entrees) {
      final statut = (e['statut'] ?? '').toString();
      final methode = (e['methode'] ?? '').toString();
      lignes.add([
        _csvChamp((e['nom_complet'] ?? '').toString()),
        _csvChamp((e['matricule'] ?? '').toString()),
        _csvChamp(_statutPresenceLabel(statut)),
        _csvChamp(e['inscrit'] == true ? tr('Oui') : tr('Non')),
        _csvChamp(_dateHeure((e['scanne_le'] ?? '').toString())),
        _csvChamp(methode == 'scan' ? tr('Scan') : methode == 'manuel' ? tr('Manuel') : ''),
      ].join(';'));
    }
    final contenu = lignes.join('\n');
    final titre = widget.activiteNom.replaceAll(RegExp(r'[^A-Za-z0-9 _-]'), '').trim().replaceAll(' ', '_');
    final nom = 'presences-${titre.isEmpty ? 'activite' : titre}.csv';
    try {
      final bytes = <int>[0xEF, 0xBB, 0xBF, ...utf8.encode(contenu)];
      final fichier = await saveToDownloads(bytes, nom);
      if (!mounted) return;
      toast(context, '${tr('Exporté')} : ${fichier.path.split('/').last}');
      await Share.shareXFiles([XFile(fichier.path)], text: widget.activiteNom);
    } catch (e) {
      if (!mounted) return;
      toast(context, '$e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final presents = _entrees.where((e) => e['statut'] == 'present').length;
    final absents = _entrees.where((e) => e['statut'] == 'absent').length;
    final annules = _entrees.where((e) => e['statut'] == 'annule').length;
    final inscrits = _entrees.where((e) => e['inscrit'] == true).length;
    final children = <Widget>[
      Text(widget.activiteNom, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
      const SizedBox(height: Cp.s1),
      if (!_loading && _error == null)
        Text(isEn ? '$presents present, $absents absent, $annules cancelled, out of $inscrits registered.' : '$presents présents, $absents absents, $annules annulés, sur $inscrits inscrits.', style: t.bodyMedium),
      const SizedBox(height: Cp.s1),
      // Carte du taux, lot 1, 31 oct. 2026 : seulement pour un camp,
      // jamais pour une activité d'établissement, qui n'a pas
      // d'inscriptions.
      if (!_loading && _error == null && _activiteType == 'evenement' && _taux != null) ...[
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(tr('Taux de présence'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
              const SizedBox(height: 4),
              if ((_taux!['taux'] as num?) != null) ...[
                Text('${_taux!['taux']} %', style: const TextStyle(color: Cp.navy, fontSize: 32, fontWeight: FontWeight.w800)),
                const SizedBox(height: 2),
                Text(isEn ? '${_taux!['presents']} present out of ${_taux!['inscrits']} registered.' : '${_taux!['presents']} présents sur ${_taux!['inscrits']} inscrits.', style: t.bodyMedium),
              ] else
                Text(tr('Aucun inscrit pour le moment.'), style: t.bodyMedium),
            ]),
          ),
        ),
        const SizedBox(height: Cp.s1),
      ],
      Wrap(spacing: 8, runSpacing: 8, children: [
        FilledButton.icon(
          icon: const Icon(Icons.qr_code_scanner_outlined),
          label: Text(tr('Scanner')),
          onPressed: () => go(context, PresenceScanPage(activiteId: widget.activiteId, activiteNom: widget.activiteNom)),
        ),
        OutlinedButton.icon(
          icon: const Icon(Icons.person_add_outlined),
          label: Text(tr('Ajouter')),
          onPressed: _ajouterManuel,
        ),
        OutlinedButton.icon(
          icon: const Icon(Icons.share_outlined),
          label: Text(tr('Exporter CSV')),
          onPressed: _exporter,
        ),
      ]),
      const SizedBox(height: Cp.s2),
    ];
    if (_loading) {
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator())));
    } else if (_error != null) {
      children.addAll([
        Text(_error!, style: t.bodyMedium),
        const SizedBox(height: Cp.s1),
        OutlinedButton(onPressed: _load, child: Text(tr('Réessayer'))),
      ]);
    } else if (_entrees.isEmpty) {
      children.add(EmptyNote(icon: Icons.playlist_add_check_outlined, text: tr('Aucune présence pour le moment. Scannez une carte ou ajoutez un membre à la main.')));
    } else {
      for (final e in _entrees) {
        final statut = (e['statut'] ?? '').toString();
        final methode = (e['methode'] ?? '').toString();
        children.addAll([
          Card(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              ListTile(
                title: Text('${e['nom_complet'] ?? ''} · ${e['matricule'] ?? ''}', style: t.labelLarge),
                subtitle: Text([
                  if ((e['scanne_le'] ?? '').toString().isNotEmpty) _dateHeure((e['scanne_le'] ?? '').toString()),
                  if (methode == 'scan') tr('Scan') else if (methode == 'manuel') tr('Manuel'),
                  if (e['inscrit'] != true) tr('Sans inscription'),
                ].join(' · '),
                    style: t.bodyMedium),
                trailing: _statutPresenceChip(statut),
              ),
              if (statut == 'present')
                Padding(
                  padding: const EdgeInsets.only(left: 16, bottom: 8),
                  child: Wrap(spacing: 8, children: [
                    TextButton(onPressed: () => _annuler(e), child: Text(tr('Annuler cette présence'))),
                    // Certificat, lot 1, 31 oct. 2026 : seulement pour
                    // un camp, et seulement pour un membre présent.
                    if (_activiteType == 'evenement')
                      TextButton(onPressed: () => _certificat(e), child: Text(tr('Certificat'))),
                  ]),
                ),
              if (statut == 'absent')
                Padding(
                  padding: const EdgeInsets.only(left: 16, bottom: 8),
                  child: FilledButton(onPressed: () => _marquerPresent(e), child: Text(tr('Marquer présent'))),
                ),
            ]),
          ),
          const SizedBox(height: Cp.s1),
        ]);
      }
    }
    return basic(tr('Liste de présence'), children, actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}

class PerimeterMembersPage extends StatefulWidget {
  const PerimeterMembersPage({super.key});
  @override
  State<PerimeterMembersPage> createState() => _PerimeterMembersPageState();
}

class _PerimeterMembersPageState extends State<PerimeterMembersPage> {
  List<Map<String, dynamic>> _membres = [];
  String? _etablissementId;
  bool _preparation = false;
  String _preparationTexte = '';
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final list = await api.fetchAdminMembres(etablissementId: _etablissementId);
      if (!mounted) return;
      setState(() {
        _membres = list;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = '$e';
      });
    }
  }

  Future<void> _choisirPerimetre() async {
    final etabs = app.etabs.where((e) => e.id.isNotEmpty).toList();
    final choix = await pick<Etab>(context, tr('Périmètre'), [Etab(tr('Tous les établissements')), ...etabs], (e) => e.name);
    if (choix == null) return;
    setState(() {
      _etablissementId = choix.id.isEmpty ? null : choix.id;
    });
    _load();
  }

  String _nomEtablissement(String id) {
    for (final e in app.etabs) {
      if (e.id == id) return e.name;
    }
    return tr('Établissement');
  }

  Future<List<Map<String, dynamic>>> _detailsActuels() {
    return api.fetchAdminMembres(etablissementId: _etablissementId, details: true);
  }

  List<PrintFiche> _fichesDepuis(List<Map<String, dynamic>> liste) {
    return [
      for (final row in liste)
        PrintFiche(
          nom: (row['nom_complet'] ?? '').toString(),
          matricule: (row['matricule'] ?? '').toString(),
          telephone: (row['telephone'] ?? '').toString(),
          email: (row['email'] ?? '').toString(),
          etablissement: (row['etablissement'] ?? '').toString(),
          fonction: (row['fonction'] ?? '').toString(),
          inscritLe: _dateCourte((row['inscrit_le'] ?? '').toString()),
          valideJusqua: _dateCourte((row['valide_jusqua'] ?? '').toString()),
          cotisation: (row['cotisation_statut'] ?? '').toString() == 'confirme'
              ? tr('Confirmée')
              : (row['cotisation_statut'] ?? '').toString() == 'en_attente'
                  ? tr('En attente')
                  : tr('Aucune'),
        ),
    ];
  }

  Future<void> _imprimerCartes() async {
    setState(() {
      _preparation = true;
      _preparationTexte = tr('Préparation des cartes…');
    });
    try {
      final liste = await _detailsActuels();
      if (!mounted) return;
      if (liste.isEmpty) {
        setState(() => _preparation = false);
        toast(context, tr('Aucun membre dans votre périmètre.'));
        return;
      }
      final logoUrl = await _logoDataUrl();
      final membres = <PrintMember>[];
      for (var i = 0; i < liste.length; i++) {
        final row = liste[i];
        final matricule = (row['matricule'] ?? '').toString();
        if (matricule.isEmpty) continue;
        if (!mounted) return;
        setState(() => _preparationTexte = '${tr('Préparation')} ${i + 1} / ${liste.length}');
        final fonction = (row['fonction'] ?? '').toString();
        membres.add(PrintMember(
          name: (row['nom_complet'] ?? '').toString(),
          matricule: matricule,
          fonction: fonction.isEmpty || fonction == 'Aucun' ? tr('Membre') : fonction,
          etab: (row['etablissement'] ?? '').toString(),
          photoDataUrl: (row['photo'] ?? '').toString(),
          valideLabel: _moisAnnee((row['valide_jusqua'] ?? '').toString()),
          qrDataUrl: await _qrDataUrl(matricule),
        ));
      }
      if (!mounted) return;
      setState(() => _preparation = false);
      if (membres.isEmpty) {
        toast(context, tr('Aucune carte à imprimer.'));
        return;
      }
      await openPrintDocument('cartes-membres.html', buildCardsHtml(membres, logoUrl));
    } catch (e) {
      if (!mounted) return;
      setState(() => _preparation = false);
      toast(context, '$e');
    }
  }

  Future<void> _exporterFichesCsv() async {
    setState(() {
      _preparation = true;
      _preparationTexte = tr('Préparation des fiches…');
    });
    try {
      final liste = await _detailsActuels();
      if (!mounted) return;
      setState(() => _preparation = false);
      if (liste.isEmpty) {
        toast(context, tr('Aucun membre dans votre périmètre.'));
        return;
      }
      final fiches = _fichesDepuis(liste);
      final lignes = <String>[[
        tr('Nom'),
        tr('Matricule'),
        tr('Téléphone'),
        tr('E-mail'),
        tr('Établissement'),
        tr('Fonction'),
        tr('Inscrit le'),
        tr('Valide jusqu’au'),
        tr('Cotisation'),
      ].map(_csvChamp).join(';')];
      for (final f in fiches) {
        lignes.add([
          _csvChamp(f.nom),
          _csvChamp(f.matricule),
          _csvChamp(f.telephone),
          _csvChamp(f.email),
          _csvChamp(f.etablissement),
          _csvChamp(f.fonction),
          _csvChamp(f.inscritLe),
          _csvChamp(f.valideJusqua),
          _csvChamp(f.cotisation),
        ].join(';'));
      }
      final contenu = lignes.join('\n');
      final bytes = <int>[0xEF, 0xBB, 0xBF, ...utf8.encode(contenu)];
      await downloadBytesFile('fiches-membres.csv', bytes, 'text/csv');
      if (mounted) toast(context, tr('Fiches exportées.'));
    } catch (e) {
      if (!mounted) return;
      setState(() => _preparation = false);
      toast(context, '$e');
    }
  }

  Future<void> _imprimerFiches() async {
    setState(() {
      _preparation = true;
      _preparationTexte = tr('Préparation des fiches…');
    });
    try {
      final liste = await _detailsActuels();
      if (!mounted) return;
      setState(() => _preparation = false);
      if (liste.isEmpty) {
        toast(context, tr('Aucun membre dans votre périmètre.'));
        return;
      }
      final titre = _etablissementId == null
          ? tr('Fiches des membres')
          : '${tr('Fiches des membres')} · ${_nomEtablissement(_etablissementId!)}';
      await openPrintDocument('fiches-membres.html', buildFichesHtml(titre, _fichesDepuis(liste)));
    } catch (e) {
      if (!mounted) return;
      setState(() => _preparation = false);
      toast(context, '$e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final children = <Widget>[
      Text(tr('Lecture seule : cette liste ne permet ni de créer, ni de modifier un membre.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      Wrap(spacing: 8, runSpacing: 8, children: [
        if (app.isAdminGeneral)
          OutlinedButton.icon(
            icon: const Icon(Icons.filter_list_outlined),
            label: Text(_etablissementId == null ? tr('Tous les établissements') : _nomEtablissement(_etablissementId!)),
            onPressed: _choisirPerimetre,
          ),
        FilledButton.icon(
          icon: const Icon(Icons.print_outlined),
          label: Text(tr('Toutes les cartes')),
          onPressed: _preparation ? null : _imprimerCartes,
        ),
        OutlinedButton.icon(
          icon: const Icon(Icons.table_chart_outlined),
          label: Text(tr('Exporter les fiches (CSV)')),
          onPressed: _preparation ? null : _exporterFichesCsv,
        ),
        OutlinedButton.icon(
          icon: const Icon(Icons.print_outlined),
          label: Text(tr('Fiches imprimables')),
          onPressed: _preparation ? null : _imprimerFiches,
        ),
      ]),
      const SizedBox(height: Cp.s2),
      if (_preparation)
        Row(children: [
          const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2)),
          const SizedBox(width: 8),
          Expanded(child: Text(_preparationTexte, style: t.bodyMedium)),
        ]),
      if (_preparation) const SizedBox(height: Cp.s2),
    ];
    if (_loading) {
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator())));
    } else if (_error != null) {
      children.addAll([Text(_error!, style: t.bodyMedium), const SizedBox(height: Cp.s1), OutlinedButton(onPressed: _load, child: Text(tr('Réessayer')))]);
    } else if (_membres.isEmpty) {
      children.add(EmptyNote(icon: Icons.group_outlined, text: tr('Aucun membre dans votre périmètre.')));
    } else {
      for (final m in _membres) {
        children.addAll([
          Card(
            child: ListTile(
              title: Text('${m['nom_complet'] ?? ''} · ${m['matricule'] ?? ''}', style: t.labelLarge),
              subtitle: Text([
                if ((m['fonction'] ?? '').toString().isNotEmpty) (m['fonction'] ?? '').toString(),
                if ((m['etablissement'] ?? '').toString().isNotEmpty) (m['etablissement'] ?? '').toString(),
              ].join(' · '),
                  style: t.bodyMedium),
              trailing: IconButton(
                tooltip: tr('Voir la carte'),
                icon: const Icon(Icons.badge_outlined),
                onPressed: () {
                  final id = (m['id'] ?? '').toString();
                  if (id.isEmpty) return;
                  go(context, AdminMemberCardPage(membreId: id, nom: (m['nom_complet'] ?? '').toString()));
                },
              ),
            ),
          ),
          const SizedBox(height: Cp.s1),
        ]);
      }
    }
    return basic(tr('Membres'), children, actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}

class PerimeterCotisationsPage extends StatefulWidget {
  const PerimeterCotisationsPage({super.key});
  @override
  State<PerimeterCotisationsPage> createState() => _PerimeterCotisationsPageState();
}

class _PerimeterCotisationsPageState extends State<PerimeterCotisationsPage> {
  List<Map<String, dynamic>> _membres = [];
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final list = await api.fetchAdminMembres();
      if (!mounted) return;
      setState(() {
        _membres = list;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = '$e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final children = <Widget>[
      Text(isEn ? 'Status from existing payments only: a confirmed payment counts, a pending one stays pending. No payment rule changes here.' : 'Statut calculé sur les paiements existants seulement : un paiement confirmé compte, un paiement en attente reste en attente. Aucune règle de paiement ne change ici.', style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
    ];
    if (_loading) {
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator())));
    } else if (_error != null) {
      children.addAll([Text(_error!, style: t.bodyMedium), const SizedBox(height: Cp.s1), OutlinedButton(onPressed: _load, child: Text(tr('Réessayer')))]);
    } else if (_membres.isEmpty) {
      children.add(EmptyNote(icon: Icons.group_outlined, text: tr('Aucun membre dans votre périmètre.')));
    } else {
      for (final m in _membres) {
        final statut = (m['cotisation_statut'] ?? '').toString();
        final label = statut == 'confirme' ? tr('Confirmée') : statut == 'en_attente' ? tr('En attente') : tr('Aucune');
        final dernier = (m['dernier_paiement_cotisation'] ?? '').toString();
        children.addAll([
          Card(
            child: ListTile(
              title: Text('${m['nom_complet'] ?? ''} · ${m['matricule'] ?? ''}', style: t.labelLarge),
              subtitle: Text(dernier.isNotEmpty ? '${tr('Dernier paiement')} : ${dateFr(DateTime.tryParse(dernier) ?? DateTime.now())}' : tr('Aucun paiement de cotisation.'), style: t.bodyMedium),
              trailing: Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(color: statut == 'confirme' ? const Color(0xFFE6F4EA) : statut == 'en_attente' ? const Color(0xFFFDF4D8) : const Color(0xFFEFF1F5), borderRadius: BorderRadius.circular(999)),
                child: Text(label, style: TextStyle(color: statut == 'confirme' ? const Color(0xFF137333) : statut == 'en_attente' ? Cp.goldDeep : Cp.inkMuted, fontWeight: FontWeight.w700, fontSize: 13)),
              ),
            ),
          ),
          const SizedBox(height: Cp.s1),
        ]);
      }
    }
    return basic(tr('Cotisations'), children, actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}

class PerimeterPresencesPage extends StatefulWidget {
  const PerimeterPresencesPage({super.key});
  @override
  State<PerimeterPresencesPage> createState() => _PerimeterPresencesPageState();
}

class _PerimeterPresencesPageState extends State<PerimeterPresencesPage> {
  List<Map<String, dynamic>> _presences = [];
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final list = await api.fetchPresences();
      if (!mounted) return;
      setState(() {
        _presences = list;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = '$e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final children = <Widget>[
      Text(tr('Toutes les présences de votre périmètre, les plus récentes d’abord.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
    ];
    if (_loading) {
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator())));
    } else if (_error != null) {
      children.addAll([Text(_error!, style: t.bodyMedium), const SizedBox(height: Cp.s1), OutlinedButton(onPressed: _load, child: Text(tr('Réessayer')))]);
    } else if (_presences.isEmpty) {
      children.add(EmptyNote(icon: Icons.playlist_add_check_outlined, text: tr('Aucune présence pour le moment.')));
    } else {
      for (final p in _presences) {
        final statut = (p['statut'] ?? '').toString();
        final methode = (p['methode'] ?? '').toString();
        children.addAll([
          Card(
            child: ListTile(
              title: Text((p['activite_nom'] ?? '').toString(), style: t.labelLarge),
              subtitle: Text([
                '${p['nom_complet'] ?? ''} · ${p['matricule'] ?? ''}',
                _dateHeure((p['scanne_le'] ?? '').toString()),
                if (methode == 'scan') tr('Scan') else if (methode == 'manuel') tr('Manuel'),
                if ((p['scanne_par_nom'] ?? '').toString().isNotEmpty) '${tr('Par')} ${(p['scanne_par_nom'] ?? '')}',
              ].where((s) => s.isNotEmpty).join(' · '),
                  style: t.bodyMedium),
              trailing: _statutPresenceChip(statut),
            ),
          ),
          const SizedBox(height: Cp.s1),
        ]);
      }
    }
    return basic(tr('Présences'), children, actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}

String _auditActionLabel(String action) {
  switch (action) {
    case 'presence.scan':
      return tr('Présence scannée');
    case 'presence.manuel':
      return tr('Présence ajoutée à la main');
    case 'presence.reprise':
      return tr('Présence rétablie');
    case 'presence.annuler':
      return tr('Présence annulée');
    default:
      return action;
  }
}

class AuditListPage extends StatefulWidget {
  const AuditListPage({super.key});
  @override
  State<AuditListPage> createState() => _AuditListPageState();
}

class _AuditListPageState extends State<AuditListPage> {
  List<Map<String, dynamic>> _lignes = [];
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final list = await api.fetchAudit();
      if (!mounted) return;
      setState(() {
        _lignes = list;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = '$e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final children = <Widget>[
      Text(tr('Qui a marqué, ajouté ou annulé une présence, et quand. Réservé à l’administrateur général.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
    ];
    if (_loading) {
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator())));
    } else if (_error != null) {
      children.addAll([Text(_error!, style: t.bodyMedium), const SizedBox(height: Cp.s1), OutlinedButton(onPressed: _load, child: Text(tr('Réessayer')))]);
    } else if (_lignes.isEmpty) {
      children.add(EmptyNote(icon: Icons.history_outlined, text: tr('Aucune entrée dans le journal pour le moment.')));
    } else {
      for (final a in _lignes) {
        final details = a['details'];
        final d = details is Map<String, dynamic> ? details : <String, dynamic>{};
        final acteur = (a['acteur_nom'] ?? '').toString();
        final matricule = (a['acteur_matricule'] ?? '').toString();
        children.addAll([
          Card(
            child: ListTile(
              title: Text(_auditActionLabel((a['action'] ?? '').toString()), style: t.labelLarge),
              subtitle: Text([
                _dateHeure((a['horodatage'] ?? '').toString()),
                if (acteur.isNotEmpty) '$acteur${matricule.isNotEmpty ? ' · $matricule' : ''}',
                if ((d['activite_nom'] ?? '').toString().isNotEmpty) (d['activite_nom'] ?? '').toString(),
                if ((d['membre_nom'] ?? '').toString().isNotEmpty) '${d['membre_nom']} · ${d['matricule'] ?? ''}',
              ].where((s) => s.isNotEmpty).join(' · '),
                  style: t.bodyMedium),
            ),
          ),
          const SizedBox(height: Cp.s1),
        ]);
      }
    }
    return basic(tr('Journal d’audit'), children, actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}

// Anniversaires, 29 oct. 2026 : liste du jour et du mois, jour et
// mois seulement, jamais l'année de naissance ni un âge, pour
// aucun membre. Périmètre serveur : l'admin général voit tout,
// l'admin d'établissement voit son établissement.
class AnniversairesPage extends StatefulWidget {
  const AnniversairesPage({super.key});
  @override
  State<AnniversairesPage> createState() => _AnniversairesPageState();
}

class _AnniversairesPageState extends State<AnniversairesPage> {
  List<Map<String, dynamic>> _jour = [];
  List<Map<String, dynamic>> _mois = [];
  bool _loading = true;
  String? _error;

  static const _nomsMois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

  String _jourMois(Map<String, dynamic> a) {
    final jour = (a['jour'] as num?)?.toInt() ?? 0;
    final mois = (a['mois'] as num?)?.toInt() ?? 0;
    final nom = (mois >= 1 && mois <= 12) ? _nomsMois[mois - 1] : '';
    return '$jour $nom';
  }

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final data = await api.fetchAdminAnniversaires();
      if (!mounted) return;
      List<Map<String, dynamic>> asList(dynamic v) {
        if (v is List) return v.whereType<Map<String, dynamic>>().toList();
        return [];
      }

      setState(() {
        _jour = asList(data['jour']);
        _mois = asList(data['mois']);
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = '$e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final children = <Widget>[
      Text(tr('Anniversaires du jour et du mois, jour et mois seulement. Aucune année de naissance, aucun âge n’est jamais affiché.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
    ];
    if (_loading) {
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator())));
    } else if (_error != null) {
      children.addAll([Text(_error!, style: t.bodyMedium), const SizedBox(height: Cp.s1), OutlinedButton(onPressed: _load, child: Text(tr('Réessayer')))]);
    } else {
      children.add(Text(tr('Aujourd’hui'), style: t.titleMedium));
      children.add(const SizedBox(height: Cp.s1));
      if (_jour.isEmpty) {
        children.add(Text(tr('Aucun anniversaire aujourd’hui.'), style: t.bodyMedium));
      } else {
        for (final a in _jour) {
          children.add(Card(
            child: ListTile(
              leading: const Icon(Icons.cake_outlined, color: Cp.goldDeep),
              title: Text((a['nom_complet'] ?? '').toString(), style: t.labelLarge),
              subtitle: Text('${(a['matricule'] ?? '').toString()}${(a['etablissement'] ?? '').toString().isEmpty ? '' : ' · ${(a['etablissement'] ?? '').toString()}'}', style: t.bodyMedium),
              trailing: Text(_jourMois(a), style: t.labelLarge),
            ),
          ));
        }
      }
      children.add(const SizedBox(height: Cp.s2));
      children.add(Text(tr('Ce mois-ci'), style: t.titleMedium));
      children.add(const SizedBox(height: Cp.s1));
      if (_mois.isEmpty) {
        children.add(Text(tr('Aucun autre anniversaire ce mois-ci.'), style: t.bodyMedium));
      } else {
        for (final a in _mois) {
          children.add(Card(
            child: ListTile(
              leading: const Icon(Icons.calendar_month_outlined, color: Cp.goldDeep),
              title: Text((a['nom_complet'] ?? '').toString(), style: t.labelLarge),
              subtitle: Text('${(a['matricule'] ?? '').toString()}${(a['etablissement'] ?? '').toString().isEmpty ? '' : ' · ${(a['etablissement'] ?? '').toString()}'}', style: t.bodyMedium),
              trailing: Text(_jourMois(a), style: t.labelLarge),
            ),
          ));
        }
      }
    }
    return basic(tr('Anniversaires'), children, actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}

class _ChartBar extends StatelessWidget {
  const _ChartBar({required this.label, required this.count, required this.amount, required this.fraction, required this.color});
  final String label;
  final int count;
  final int amount;
  final double fraction;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(children: [
        SizedBox(
          width: 92,
          child: Text(label, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Cp.ink)),
        ),
        Expanded(
          child: ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Container(
              height: 22,
              color: Cp.line,
              alignment: Alignment.centerLeft,
              child: FractionallySizedBox(
                widthFactor: fraction.clamp(0.0, 1.0),
                child: Container(color: color),
              ),
            ),
          ),
        ),
        const SizedBox(width: 8),
        SizedBox(
          width: 108,
          child: Text('$count · ${fcfa(amount)}', textAlign: TextAlign.right, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Cp.inkMuted)),
        ),
      ]),
    );
  }
}

class _AdminChartsSection extends StatefulWidget {
  const _AdminChartsSection();

  @override
  State<_AdminChartsSection> createState() => _AdminChartsSectionState();
}

class _AdminChartsSectionState extends State<_AdminChartsSection> {
  List<Map<String, dynamic>> _payments = [];
  bool _loading = true;
  String? _error;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _load();
    _timer = Timer.periodic(const Duration(seconds: 30), (_) {
      if (mounted) _load(silent: true);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  Future<void> _load({bool silent = false}) async {
    if (!silent) setState(() => _loading = true);
    try {
      final payments = await api.fetchAdminPayments();
      if (!mounted) return;
      setState(() {
        _payments = payments;
        _loading = false;
        _error = null;
      });
    } catch (e) {
      if (silent) return;
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = e.toString().contains('(403)')
            ? 'Vue réservée à l’administrateur général.'
            : 'Vue indisponible : $e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    if (_loading) return Text(tr('Chargement…'), style: t.bodyMedium);
    if (_error != null) {
      return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(_error!, style: t.bodyMedium),
        TextButton(onPressed: () => _load(), child: Text(tr('Réessayer'))),
      ]);
    }
    int countFor(String statut) => _payments.where((p) => (p['statut'] ?? '') == statut).length;
    int amountFor(String statut) => _payments.where((p) => (p['statut'] ?? '') == statut).fold<int>(0, (sum, p) => sum + ((p['montant_fcfa'] as num?)?.toInt() ?? 0));
    int typeCount(String type) => _payments.where((p) => (p['type'] ?? '') == type).length;
    int typeAmount(String type) => _payments.where((p) => (p['type'] ?? '') == type).fold<int>(0, (sum, p) => sum + ((p['montant_fcfa'] as num?)?.toInt() ?? 0));
    final maxStatut = [countFor('en_attente'), countFor('confirme'), countFor('refuse'), countFor('annule')].fold<int>(0, (m, v) => v > m ? v : m);
    final maxType = [typeCount('don'), typeCount('cotisation'), typeCount('carte'), typeCount('achat'), typeCount('camp')].fold<int>(0, (m, v) => v > m ? v : m);
    double frac(int v, int max) => max <= 0 ? 0 : (v <= 0 ? 0 : (v / max).clamp(0.06, 1.0));
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      heading(context, tr('Vue d’ensemble')),
      Row(children: [
        Expanded(
          child: Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(20)),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const Text('TOTAL CONFIRMÉ', style: TextStyle(color: Colors.white70, fontSize: 13, fontWeight: FontWeight.w600, letterSpacing: 1.2)),
              const SizedBox(height: 12),
              Text(fcfa(amountFor('confirme')), style: const TextStyle(color: Color(0xFF2FD27A), fontSize: 30, fontWeight: FontWeight.w800)),
              const SizedBox(height: 4),
              Text('${countFor('confirme')} ${tr('paiements')}', style: const TextStyle(color: Colors.white70, fontSize: 13)),
            ]),
          ),
        ),
        const SizedBox(width: Cp.s1),
        Expanded(
          child: Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: Cp.gold)),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const Text('TOTAL EN ATTENTE', style: TextStyle(color: Cp.inkMuted, fontSize: 13, fontWeight: FontWeight.w600, letterSpacing: 1.2)),
              const SizedBox(height: 12),
              Text(fcfa(amountFor('en_attente')), style: const TextStyle(color: Cp.goldDeep, fontSize: 30, fontWeight: FontWeight.w800)),
              const SizedBox(height: 4),
              Text('${countFor('en_attente')} ${tr('paiements')}', style: const TextStyle(color: Cp.inkMuted, fontSize: 13)),
            ]),
          ),
        ),
      ]),
      const SizedBox(height: Cp.s2),
      Card(
        child: Padding(
          padding: const EdgeInsets.all(Cp.s2),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(tr('Paiements par statut'), style: t.titleMedium),
            const SizedBox(height: Cp.s1),
            _ChartBar(label: tr('En attente'), count: countFor('en_attente'), amount: amountFor('en_attente'), fraction: frac(countFor('en_attente'), maxStatut), color: Cp.gold),
            _ChartBar(label: tr('Confirmés'), count: countFor('confirme'), amount: amountFor('confirme'), fraction: frac(countFor('confirme'), maxStatut), color: Cp.ok),
            _ChartBar(label: tr('Refusés'), count: countFor('refuse'), amount: amountFor('refuse'), fraction: frac(countFor('refuse'), maxStatut), color: Cp.danger),
            if (countFor('annule') > 0) _ChartBar(label: tr('Annulés'), count: countFor('annule'), amount: amountFor('annule'), fraction: frac(countFor('annule'), maxStatut), color: Cp.inkMuted),
            const SizedBox(height: Cp.s1),
            Text(tr('Paiements par type'), style: t.titleMedium),
            const SizedBox(height: Cp.s1),
            _ChartBar(label: tr('Don'), count: typeCount('don'), amount: typeAmount('don'), fraction: frac(typeCount('don'), maxType), color: Cp.navy),
            _ChartBar(label: tr('Cotisation'), count: typeCount('cotisation'), amount: typeAmount('cotisation'), fraction: frac(typeCount('cotisation'), maxType), color: Cp.goldDeep),
            _ChartBar(label: tr('Carte'), count: typeCount('carte'), amount: typeAmount('carte'), fraction: frac(typeCount('carte'), maxType), color: Cp.navy),
            _ChartBar(label: tr('Achat'), count: typeCount('achat'), amount: typeAmount('achat'), fraction: frac(typeCount('achat'), maxType), color: Cp.goldDeep),
            _ChartBar(label: tr('Versement du camp'), count: typeCount('camp'), amount: typeAmount('camp'), fraction: frac(typeCount('camp'), maxType), color: Cp.navy),
            const SizedBox(height: Cp.s1),
            Row(children: [
              Expanded(child: Text(tr('Actualisé toutes les 30 secondes.'), style: t.bodyMedium)),
              TextButton(onPressed: () => _load(), child: Text(tr('Actualiser'))),
            ]),
          ]),
        ),
      ),
    ]);
  }
}

class _OnlineMembersSection extends StatefulWidget {
  const _OnlineMembersSection();

  @override
  State<_OnlineMembersSection> createState() => _OnlineMembersSectionState();
}

class _OnlineMembersSectionState extends State<_OnlineMembersSection> {
  List<Map<String, dynamic>> _members = [];
  bool _loading = true;
  String? _error;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _load();
    _timer = Timer.periodic(const Duration(seconds: 30), (_) {
      if (mounted) _load(silent: true);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  Future<void> _load({bool silent = false}) async {
    if (!silent) setState(() => _loading = true);
    try {
      final list = await api.fetchOnlineMembers();
      if (!mounted) return;
      setState(() {
        _members = list;
        _loading = false;
        _error = null;
      });
    } catch (e) {
      if (silent) return;
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = e.toString().contains('(403)')
            ? 'Liste réservée à l’administrateur général.'
            : 'Liste indisponible : $e';
      });
    }
  }

  String _ago(String raw) {
    final d = DateTime.tryParse(raw);
    if (d == null) return '';
    final m = DateTime.now().difference(d).inMinutes;
    if (m <= 0) return tr('à l’instant');
    return tr('il y a $m min');
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      heading(context, tr('Membres en ligne')),
      Card(
        child: Padding(
          padding: const EdgeInsets.all(Cp.s2),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            if (_loading)
              Text(tr('Chargement…'), style: t.bodyMedium)
            else if (_error != null) ...[
              Text(_error!, style: t.bodyMedium),
              TextButton(onPressed: () => _load(), child: Text(tr('Réessayer'))),
            ] else ...[
              Text(
                _members.isEmpty
                    ? tr('Aucun membre en ligne pour le moment.')
                    : '${_members.length} ${tr('membre(s) en ligne')}',
                style: t.titleMedium,
              ),
              const SizedBox(height: Cp.s1),
              Text(tr('Un membre apparaît quand il ouvre l’application. Actualisation toutes les 30 secondes.'), style: t.bodyMedium),
              for (final m in _members) ...[
                const SizedBox(height: Cp.s1),
                Row(children: [
                  Expanded(child: Text((m['nom_complet'] ?? '').toString(), style: t.labelLarge)),
                  Text('${(m['matricule'] ?? '').toString()} · ${_ago((m['derniere_activite'] ?? '').toString())}', style: t.bodyMedium),
                ]),
              ],
              Align(
                alignment: Alignment.centerRight,
                child: TextButton(onPressed: () => _load(), child: Text(tr('Actualiser'))),
              ),
            ],
          ]),
        ),
      ),
    ]);
  }
}


// ─────────────── CARTES ET BADGES POUR L'ADMINISTRATION, 30 oct. 2026 ───────────────

/// Mois et année d'une date serveur, sans décalage de fuseau : la
/// date est lue telle quelle, jamais convertie en instant.
String _moisAnnee(String iso) {
  final propre = iso.contains('T') ? iso.split('T').first : iso;
  final parties = propre.split('-');
  if (parties.length >= 2 && parties[0].length == 4) return '${parties[1]}/${parties[0]}';
  return propre;
}

/// Jour, mois et année d'une date serveur, sans décalage de fuseau.
String _dateCourte(String iso) {
  final propre = iso.contains('T') ? iso.split('T').first : iso;
  final parties = propre.split('-');
  if (parties.length >= 3 && parties[0].length == 4) return '${parties[2]}/${parties[1]}/${parties[0]}';
  return propre;
}

String _nomFichier(String titre) {
  final propre = titre.replaceAll(RegExp(r'[^A-Za-z0-9 _-]'), '').trim().replaceAll(' ', '_');
  return propre.isEmpty ? 'document' : propre;
}

/// QR en image PNG, encodé en data URL, pour les documents imprimés.
Future<String> _qrDataUrl(String data) async {
  final painter = QrPainter(data: data, version: QrVersions.auto, gapless: false);
  final bytes = await painter.toImageData(240);
  if (bytes == null) return '';
  return 'data:image/png;base64,${base64Encode(bytes.buffer.asUint8List())}';
}

Future<String> _logoDataUrl() async {
  final bytes = await rootBundle.load('assets/logo.png');
  return 'data:image/png;base64,${base64Encode(bytes.buffer.asUint8List())}';
}

Future<String> _monogrammeDataUrl() async {
  final bytes = await rootBundle.load('assets/cp_monogram.png');
  return 'data:image/png;base64,${base64Encode(bytes.buffer.asUint8List())}';
}

/// Membre reconstruit depuis la fiche administrateur : mêmes champs
/// que la carte du membre, pour afficher exactement la même carte.
Member _membreDepuisDetail(Map<String, dynamic> d) {
  DateTime? parseDate(String? s) {
    if (s == null || s.isEmpty) return null;
    final propre = s.contains('T') ? s.split('T').first : s;
    final parties = propre.split('-');
    if (parties.length == 3) {
      final y = int.tryParse(parties[0]);
      final mo = int.tryParse(parties[1]);
      final j = int.tryParse(parties[2]);
      if (y != null && mo != null && j != null) return DateTime(y, mo, j);
    }
    try {
      return DateTime.parse(s);
    } catch (_) {
      return null;
    }
  }

  return Member(
    (d['nom_complet'] ?? '').toString(),
    (d['matricule'] ?? '').toString(),
    (d['etablissement'] ?? '').toString(),
    parseDate((d['inscrit_le'] ?? '').toString()) ?? DateTime.now(),
    fonction: (d['fonction'] ?? '').toString(),
    photoData: (d['photo'] ?? '').toString(),
    validUntilOverride: parseDate((d['valide_jusqua'] ?? '').toString()),
  );
}

class AdminMemberCardPage extends StatefulWidget {
  const AdminMemberCardPage({super.key, required this.membreId, required this.nom});
  final String membreId;
  final String nom;

  @override
  State<AdminMemberCardPage> createState() => _AdminMemberCardPageState();
}

class _AdminMemberCardPageState extends State<AdminMemberCardPage> {
  final _cardKey = GlobalKey();
  Map<String, dynamic>? _detail;
  bool _loading = true;
  String? _error;
  bool _preparation = false;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final detail = await api.fetchAdminMembreDetail(widget.membreId);
      if (!mounted) return;
      setState(() {
        _detail = detail;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = '$e';
      });
    }
  }

  Member? get _membre {
    final d = _detail;
    if (d == null) return null;
    return _membreDepuisDetail(d);
  }

  Future<void> _imprimer() async {
    final m = _membre;
    if (m == null) return;
    setState(() => _preparation = true);
    try {
      final logoUrl = await _logoDataUrl();
      final fonction = m.fonction.isEmpty || m.fonction == 'Aucun' ? tr('Membre') : m.fonction;
      final html = buildCardsHtml([
        PrintMember(
          name: m.name,
          matricule: m.matricule,
          fonction: fonction,
          etab: m.etab,
          photoDataUrl: m.photoData,
          valideLabel: _moisAnnee('${m.validUntil.year.toString().padLeft(4, '0')}-${m.validUntil.month.toString().padLeft(2, '0')}-01'),
          qrDataUrl: await _qrDataUrl(m.matricule),
        ),
      ], logoUrl);
      await openPrintDocument('carte-${m.matricule}.html', html);
    } catch (e) {
      if (mounted) toast(context, '$e');
    } finally {
      if (mounted) setState(() => _preparation = false);
    }
  }

  Future<void> _telechargerPng() async {
    final m = _membre;
    if (m == null) return;
    final boundary = _cardKey.currentContext?.findRenderObject() as RenderRepaintBoundary?;
    if (boundary == null) {
      if (mounted) toast(context, tr('La carte n’est pas encore affichée.'));
      return;
    }
    final image = await boundary.toImage(pixelRatio: 3);
    final bytes = await image.toByteData(format: ui.ImageByteFormat.png);
    final png = bytes?.buffer.asUint8List();
    if (png == null || png.isEmpty) {
      if (mounted) toast(context, tr('Impossible de créer l’image de la carte.'));
      return;
    }
    await downloadBytesFile('carte-${m.matricule}.png', png, 'image/png');
    if (mounted) toast(context, tr('Carte téléchargée.'));
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final m = _membre;
    final telephone = ((_detail?['telephone'] ?? '').toString());
    final email = ((_detail?['email'] ?? '').toString());
    final children = <Widget>[];
    if (_loading) {
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator())));
    } else if (_error != null) {
      children.addAll([Text(_error!, style: t.bodyMedium), const SizedBox(height: Cp.s1), OutlinedButton(onPressed: _load, child: Text(tr('Réessayer')))]);
    } else if (m == null) {
      children.add(EmptyNote(icon: Icons.badge_outlined, text: tr('Membre introuvable.')));
    } else {
      children.addAll([
        Center(child: RepaintBoundary(key: _cardKey, child: MemberCardView(m: m))),
        const SizedBox(height: Cp.s2),
        Text(
          isEn
              ? 'Validity: 1 year, created ${m.since.month.toString().padLeft(2, '0')}/${m.since.year}, valid until ${m.validUntil.month.toString().padLeft(2, '0')}/${m.validUntil.year}.'
              : 'Validité : 1 an, créée en ${m.since.month.toString().padLeft(2, '0')}/${m.since.year}, valide jusqu’au ${m.validUntil.month.toString().padLeft(2, '0')}/${m.validUntil.year}.',
          style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
        const SizedBox(height: Cp.s2),
        if (telephone.isNotEmpty || email.isNotEmpty)
          Card(
            child: Column(children: [
              if (telephone.isNotEmpty)
                ListTile(
                  leading: const Icon(Icons.phone_outlined),
                  title: Text(tr('Téléphone'), style: t.labelLarge),
                  subtitle: Text(telephone, style: t.bodyMedium),
                ),
              if (email.isNotEmpty)
                ListTile(
                  leading: const Icon(Icons.email_outlined),
                  title: Text(tr('E-mail'), style: t.labelLarge),
                  subtitle: Text(email, style: t.bodyMedium),
                ),
            ]),
          ),
        if (telephone.isNotEmpty || email.isNotEmpty) const SizedBox(height: Cp.s2),
        Wrap(spacing: 8, runSpacing: 8, children: [
          FilledButton.icon(
            icon: const Icon(Icons.print_outlined),
            label: Text(_preparation ? tr('Préparation…') : tr('Imprimer')),
            style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
            onPressed: _preparation ? null : _imprimer,
          ),
          OutlinedButton.icon(
            icon: const Icon(Icons.download_outlined),
            label: Text(tr('Carte PNG')),
            onPressed: _telechargerPng,
          ),
        ]),
      ]);
    }
    return basic('Carte de ${widget.nom}', children);
  }
}

class CampBadgesPrintPage extends StatefulWidget {
  const CampBadgesPrintPage({super.key, required this.camp});
  final Camp camp;

  @override
  State<CampBadgesPrintPage> createState() => _CampBadgesPrintPageState();
}

class _CampBadgesPrintPageState extends State<CampBadgesPrintPage> {
  List<Map<String, dynamic>> _inscrits = [];
  bool _loading = true;
  String? _error;
  bool _preparation = false;
  String _preparationTexte = '';

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final data = await api.fetchPresencesActivite(widget.camp.serverId);
      final entrees = (data['entrees'] as List?) ?? [];
      final inscrits = <Map<String, dynamic>>[];
      for (final e in entrees) {
        if (e is Map && e['inscrit'] == true) {
          inscrits.add(Map<String, dynamic>.from(e));
        }
      }
      if (!mounted) return;
      setState(() {
        _inscrits = inscrits;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = '$e';
      });
    }
  }

  Future<void> _imprimerBadges() async {
    if (_inscrits.isEmpty) {
      toast(context, tr('Aucun inscrit pour ce camp.'));
      return;
    }
    setState(() {
      _preparation = true;
      _preparationTexte = tr('Préparation des badges…');
    });
    try {
      final monoUrl = await _monogrammeDataUrl();
      final badges = <PrintBadge>[];
      var manquants = 0;
      for (var i = 0; i < _inscrits.length; i++) {
        final inscrit = _inscrits[i];
        if (!mounted) return;
        setState(() => _preparationTexte = '${tr('Préparation')} ${i + 1} / ${_inscrits.length}');
        try {
          final detail = await api.fetchAdminMembreDetail((inscrit['membre_id'] ?? '').toString());
          final matricule = (detail['matricule'] ?? inscrit['matricule'] ?? '').toString();
          if (matricule.isEmpty) {
            manquants++;
            continue;
          }
          badges.add(PrintBadge(
            name: (detail['nom_complet'] ?? inscrit['nom_complet'] ?? '').toString(),
            matricule: matricule,
            etab: (detail['etablissement'] ?? '').toString(),
            photoDataUrl: (detail['photo'] ?? '').toString(),
            campName: widget.camp.name,
            campDates: widget.camp.dates,
            campLieu: widget.camp.place,
            qrDataUrl: await _qrDataUrl(matricule),
          ));
        } catch (_) {
          manquants++;
        }
      }
      if (!mounted) return;
      setState(() => _preparation = false);
      if (badges.isEmpty) {
        toast(context, tr('Impossible de préparer les badges.'));
        return;
      }
      await openPrintDocument('badges-${_nomFichier(widget.camp.name)}.html', buildBadgesHtml(badges, monoUrl));
      if (mounted && manquants > 0) toast(context, '${tr('Badges non préparés')} : $manquants');
    } catch (e) {
      if (!mounted) return;
      setState(() => _preparation = false);
      toast(context, '$e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final children = <Widget>[
      Text(widget.camp.name, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
      if (widget.camp.dates.isNotEmpty || widget.camp.place.isNotEmpty)
        Text([widget.camp.dates, widget.camp.place].where((s) => s.isNotEmpty).join(' · '), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      Wrap(spacing: 8, runSpacing: 8, children: [
        FilledButton.icon(
          icon: const Icon(Icons.print_outlined),
          label: Text(_preparation ? tr('Préparation…') : tr('Imprimer les badges')),
          style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
          onPressed: (_loading || _preparation) ? null : _imprimerBadges,
        ),
      ]),
      const SizedBox(height: Cp.s2),
      if (_preparation)
        Row(children: [
          const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2)),
          const SizedBox(width: 8),
          Expanded(child: Text(_preparationTexte, style: t.bodyMedium)),
        ]),
      if (_preparation) const SizedBox(height: Cp.s2),
    ];
    if (_loading) {
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator())));
    } else if (_error != null) {
      children.addAll([Text(_error!, style: t.bodyMedium), const SizedBox(height: Cp.s1), OutlinedButton(onPressed: _load, child: Text(tr('Réessayer')))]);
    } else if (_inscrits.isEmpty) {
      children.add(EmptyNote(icon: Icons.badge_outlined, text: tr('Aucun inscrit pour ce camp.')));
    } else {
      for (final inscrit in _inscrits) {
        children.addAll([
          Card(
            child: ListTile(
              title: Text('${inscrit['nom_complet'] ?? ''} · ${inscrit['matricule'] ?? ''}', style: t.labelLarge),
            ),
          ),
          const SizedBox(height: Cp.s1),
        ]);
      }
    }
    return basic('Badges : ${widget.camp.name}', children);
  }
}

class AdminPage extends StatelessWidget {

  const AdminPage({super.key});

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      final pending = app.requests.where((r) => !r.confirmed).toList();

      if (!app.isAdmin) {
        return basic(tr('Espace structure'), [
          EmptyNote(icon: Icons.shield_outlined, text: tr('Accès réservé aux administrateurs de la structure.')),
        ]);
      }
      final general = app.isAdminGeneral;
      return basic(tr('Espace structure'), [
        if (!general)
          Text(tr('Votre compte administre un établissement : vous pouvez publier une actualité et une activité pour votre établissement. La validation des paiements et les autres publications sont réservées à l’administrateur général.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 16)),
        if (general)
          Text(isEn ? 'The structure’s tools live in each module. Payments are validated only after checking the structure’s Wave account, with an explicit confirmation: open Don to find each request, its declared ID and its screenshot, then validate from its history.' : 'Les outils de la structure vivent dans chaque module. Les paiements ne sont validés qu’après le contrôle du compte Wave de la structure, avec une confirmation explicite : ouvrez Don pour retrouver chaque demande, son identifiant déclaré et sa capture, puis validez depuis son historique.', style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 16)),
        const SizedBox(height: Cp.s2),
        if (general)
          Builder(builder: (ctx) {
            final counts = <int, int>{};
          for (final r in pending) {
            counts[r.amount] = (counts[r.amount] ?? 0) + 1;
          }
          final doubles = counts.entries.where((e) => e.value > 1).toList();
          return Container(
            padding: const EdgeInsets.all(Cp.s2),
            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                const Icon(Icons.shield_outlined, color: Cp.goldDeep, size: 28),
                const SizedBox(width: Cp.s1),
                Expanded(child: Text(isEn ? 'Pending amounts in duplicate' : 'Montants en attente en double', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
              ]),
              const SizedBox(height: Cp.s1),
              Text(isEn ? 'When the same exact amount is pending on several requests, the amount alone cannot tell who paid. Reconcile each request by hand with the transaction ID, date and sender, in your Wave account, then validate after checking. No automatic confirmation is made on amount alone.' : 'Quand le même montant exact est en attente sur plusieurs demandes, le montant seul ne permet pas de savoir qui a payé. Rapprochez chaque demande à la main avec l’identifiant de transaction, la date et l’expéditeur, dans votre compte Wave, puis validez après contrôle. Aucune confirmation automatique ne se fait sur le montant seul.', style: t.bodyMedium),
              const SizedBox(height: Cp.s1),
              if (doubles.isEmpty)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                  decoration: BoxDecoration(color: const Color(0xFFDCFCE7), borderRadius: BorderRadius.circular(20)),
                  child: Text(isEn ? 'No pending amount is present more than once for the moment.' : 'Aucun montant en attente n’est présent plus d’une fois pour le moment.', style: t.bodyMedium?.copyWith(color: const Color(0xFF166534), fontWeight: FontWeight.w700)),
                )
              else
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  for (final d in doubles)
                    Text(isEn ? '${fcfa(d.key)} pending on ${d.value} requests: reconcile by hand before validating.' : '${fcfa(d.key)} en attente sur ${d.value} demandes : rapprochez à la main avant de valider.', style: t.bodyMedium?.copyWith(color: const Color(0xFFB45309), fontWeight: FontWeight.w700)),
                ]),
            ]),
          );
        }),
        const SizedBox(height: Cp.s3),
        if (app.isAdmin)
          FilledButton.icon(
            onPressed: () => go(c, const ScanCardPage()),
          icon: const Icon(Icons.qr_code_scanner_outlined),
          label: Text(tr('Scanner une carte')),
          style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
        ),
        if (app.isAdmin)
          Text(isEn ? 'Scan a member card QR code to see that member’s purchases, validate a pending payment after checking, and record a cash contribution payment.' : 'Scannez le QR code de la carte d’un membre pour voir ses achats, valider un paiement en attente après contrôle, et enregistrer un règlement en espèces.', style: t.bodyMedium),
        const SizedBox(height: Cp.s3),
        heading(c, tr('Présences')),
        navCard([
          NavTile(
            icon: Icons.qr_code_scanner_outlined,
            label: tr('Scanner une présence'),
            sub: tr('Page séparée du scan de paiement : le QR de la carte marque la présence.'),
            onTap: () async {
              final choix = await choisirActivite(c);
              if (choix != null && c.mounted) go(c, PresenceScanPage(activiteId: choix.id, activiteNom: choix.type == 'evenement' ? choix.nom : '${choix.etab} : ${choix.nom}'));
            },
          ),
          NavTile(
            icon: Icons.playlist_add_check_outlined,
            label: tr('Listes de présence'),
            sub: tr('Inscrits pré-remplis, ajout manuel, annulation, export CSV.'),
            onTap: () async {
              final choix = await choisirActivite(c);
              if (choix != null && c.mounted) go(c, PresenceListPage(activiteId: choix.id, activiteNom: choix.type == 'evenement' ? choix.nom : '${choix.etab} : ${choix.nom}'));
            },
          ),
          NavTile(
            icon: Icons.badge_outlined,
            label: tr('Badges d’un camp'),
            sub: tr('Badges imprimables des inscrits à un camp, plusieurs par page.'),
            onTap: () async {
              final camps = app.camps.where((camp) => camp.serverId.isNotEmpty).toList();
              if (camps.isEmpty) {
                toast(c, tr('Aucun camp publié.'));
                return;
              }
              final camp = await pick<Camp>(c, tr('Quel camp ?'), camps, (camp) => camp.name);
              if (camp != null && c.mounted) go(c, CampBadgesPrintPage(camp: camp));
            },
          ),
          NavTile(
            icon: Icons.group_outlined,
            label: tr('Membres'),
            sub: tr('Liste en lecture seule de votre périmètre.'),
            onTap: () => go(c, const PerimeterMembersPage()),
          ),
          NavTile(
            icon: Icons.account_balance_wallet_outlined,
            label: tr('Cotisations'),
            sub: tr('Statut confirmé ou en attente, depuis les paiements existants.'),
            onTap: () => go(c, const PerimeterCotisationsPage()),
          ),
          NavTile(
            icon: Icons.fact_check_outlined,
            label: tr('Présences'),
            sub: tr('Toutes les présences de votre périmètre, les plus récentes d’abord.'),
            onTap: () => go(c, const PerimeterPresencesPage()),
          ),
          NavTile(
            icon: Icons.cake_outlined,
            label: tr('Anniversaires'),
            sub: tr('Anniversaires du jour et du mois, jour et mois seulement, jamais l’année ni l’âge.'),
            onTap: () => go(c, const AnniversairesPage()),
          ),
          if (general)
            NavTile(
              icon: Icons.history_outlined,
              label: tr('Journal d’audit'),
              sub: tr('Qui a marqué, ajouté ou annulé une présence, et quand.'),
              onTap: () => go(c, const AuditListPage()),
            ),
        ]),
        const SizedBox(height: Cp.s3),
        if (general) heading(c, tr('Mot de passe oublié')),
        if (general)
          navCard([
            NavTile(
              icon: Icons.key_outlined,
              label: tr('Mot de passe oublié d’un membre'),
              sub: tr('Génère un mot de passe temporaire, affiché une seule fois, à transmettre hors application.'),
              onTap: () => go(c, const ResetPasswordPage()),
            ),
          ]),
        if (general) heading(c, tr('Annonces audio')),
        if (general)
          navCard([
            NavTile(
              icon: Icons.campaign_outlined,
              label: tr('Annonces audio'),
              sub: tr('Audios courts pour les membres : mise à jour ou fonctionnement. Cartes sur l’accueil, disparition après écoute ou sur X.'),
              onTap: () => go(c, const AnnoncesAudioPage()),
            ),
          ]),
        if (general) heading(c, tr('Cartes vidéo')),
        if (general)
          navCard([
            NavTile(
              icon: Icons.ondemand_video_outlined,
              label: tr('Cartes vidéo'),
              sub: tr('Vidéos courtes pour les membres, sur téléphone seulement : expliquer une fonction de l’application. Cartes sur l’accueil, disparition sur X.'),
              onTap: () => go(c, const CartesVideoPage()),
            ),
          ]),
        if (!kIsWeb) heading(c, tr('Transactions')),
        if (!kIsWeb)
          navCard([
            NavTile(
              icon: Icons.receipt_long_outlined,
              label: tr('Historique des transactions'),
              sub: tr('Toutes les opérations de votre périmètre, filtrables, avec totaux et export.'),
              onTap: () => go(c, const AdminTransactionHistoryPage()),
            ),
            NavTile(
              icon: Icons.table_chart_outlined,
              label: tr('Chiffres'),
              sub: tr('Total encaissé, résumé du jour et comparaison des derniers jours, par type et par établissement.'),
              onTap: () => go(c, const ChiffresPage()),
            ),
          ]),
        const SizedBox(height: Cp.s3),
        if (general) const _ServerPaymentsSection(),
        const SizedBox(height: Cp.s3),
        if (general) heading(c, 'Paiements locaux à valider, sur cet appareil seulement (${pending.length})'),
        if (general) ...[
          if (pending.isEmpty)
            Text(tr('Aucune demande en attente.'), style: t.bodyMedium)
          else
            Card(
            child: Column(children: [
              for (final r in pending)
                ListTile(
                  title: Text('${r.kind == 'don' ? 'Don' : r.kind == 'carte' ? tr('Carte') : r.kind == 'cotisation' ? 'Cotisation' : r.kind == 'camp' ? _campRequestLabel(r) : 'Achat'} · ${fcfa(r.amount)}', style: t.labelLarge),
                  subtitle: Text('${r.memberName} · ${r.method} · ${r.ref} · ${dateFr(r.date)}', style: t.bodyMedium),
                  trailing: Row(mainAxisSize: MainAxisSize.min, children: [
                    IconButton(
                      tooltip: tr('Vérifier le reçu'),
                      icon: const Icon(Icons.verified_outlined),
                      onPressed: () => go(c, VerifyPaymentPage(request: r)),
                    ),
                    FilledButton(
                    onPressed: () async {
                      final ok = await showDialog<bool>(
                        context: c,
                        builder: (ctx) => AlertDialog(
                          title: Text(tr('Valider ce paiement ?')),
                          content: Text(isEn ? 'Only confirm after checking your ${r.method} account: ${fcfa(r.amount)} received for reference ${r.ref}.' : 'Validez seulement après avoir contrôlé votre compte ${r.method} : ${fcfa(r.amount)} reçus pour la référence ${r.ref}.'),
                          actions: [
                            TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
                            FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Valider'))),
                          ],
                        ),
                      );
                      if (ok == true) app.confirm(r);
                    },
                    child: Text(tr('Valider')),
                    ),
                  ]),
                ),
            ]),
          ),
        ],
        const SizedBox(height: Cp.s3),
        if (general) const _AdminChartsSection(),
        const SizedBox(height: Cp.s3),
        if (general) const _OnlineMembersSection(),
        const SizedBox(height: Cp.s3),
        const SizedBox(height: Cp.s3),
        const SizedBox(height: Cp.s3),
        heading(c, tr('Communauté et établissements')),
        navCard([
          NavTile(
            icon: Icons.playlist_add_check_outlined,
            label: tr('Ajouter une activité'),
            sub: tr('À un établissement existant, avec une image.'),
            onTap: () async {
              final myEtab = app.member?.etab ?? '';
              final visibleEtabs = general ? app.etabs : app.etabs.where((e) => e.name == myEtab || etabDisplayName(e.name) == etabDisplayName(myEtab)).toList();
              if (!general && visibleEtabs.isEmpty) {
                toast(c, tr('Votre compte n’est rattaché à aucun établissement.'));
                return;
              }
              final e = await pick<Etab>(c, tr('Quel établissement ?'), visibleEtabs, (e) => e.name);
              if (e == null || !c.mounted) return;
              imageFormSheet(c, tr('Nouvelle activité'), [F('a', tr('Activité'))], tr('Ajouter'), (v, imagePath) {
                final activity = ActivityItem(v['a']!, imagePath: imagePath);
                e.activities.add(activity);
                app.changed();
                _publishActivite(c, e, activity);
              });
            },
          ),
          NavTile(
            icon: Icons.edit_outlined,
            label: tr('Modifier une activité'),
            sub: tr('Nom et image d’une activité déjà créée.'),
            onTap: () async {
              final myEtab = app.member?.etab ?? '';
              final visibleEtabs = general ? app.etabs : app.etabs.where((e) => e.name == myEtab || etabDisplayName(e.name) == etabDisplayName(myEtab)).toList();
              if (!general && visibleEtabs.isEmpty) {
                toast(c, tr('Votre compte n’est rattaché à aucun établissement.'));
                return;
              }
              final e = await pick<Etab>(c, tr('Quel établissement ?'), visibleEtabs, (e) => e.name);
              if (e == null || !c.mounted) return;
              if (e.activities.isEmpty) {
                toast(c, tr('Aucune activité pour cet établissement.'));
                return;
              }
              final a = await pick<ActivityItem>(c, tr('Quelle activité ?'), e.activities, (a) => a.title);
              if (a == null || !c.mounted) return;
              imageFormSheet(c, tr('Modifier l’activité'), [F('a', tr('Activité'), initial: a.title)], tr('Enregistrer'), (v, imagePath) {
                if (imagePath != a.imagePath) {
                  a.imagePath = imagePath;
                  a.imageUrl = '';
                }
                a.title = v['a']!;
                app.changed();
                // Le serveur n'a pas de route de modification d'activité :
                // la modification est locale, et une nouvelle publication
                // est tentée seulement si l'activité n'a jamais été publiée.
                if (a.serverId.isEmpty) _publishActivite(c, e, a);
              }, initialImagePath: a.imagePath);
            },
          ),
        ]),
        const SizedBox(height: Cp.s3),
        const SizedBox(height: Cp.s3),
        if (general) heading(c, tr('Quiz et Bureau')),
        if (general) navCard([
          if (general)
          NavTile(
            icon: Icons.quiz_outlined,
            label: tr('Ajouter une question de quiz'),
            sub: tr('Quatre choix, une seule bonne réponse.'),
            onTap: () => formSheet(c, tr('Nouvelle question'), [
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
            }),
          ),
        ]),
        const SizedBox(height: Cp.s3),
        const SizedBox(height: Cp.s2),
        SizedBox(
          height: 52,
          child: OutlinedButton(
            onPressed: () {
              app.isAdmin = false;
              app.isAdminGeneral = false;
              app.changed();
              Navigator.of(c).pop();
            },
            child: Text(tr('Quitter l’espace structure')),
          ),
        ),
      ]);
    });
  }
}

// ═══════════════════════════════════════════════════════════════════
// MOT DE PASSE TEMPORAIRE, 29 oct. 2026
// ═══════════════════════════════════════════════════════════════════

// Réinitialisation assistée, 29 oct. 2026 : l'administrateur général
// seul choisit un membre et génère un temporaire, affiché une seule
// fois, à transmettre hors application, en personne ou par appel.
// Le temporaire n'est jamais stocké sur l'appareil, ni dans
// l'application, ni dans un journal. L'ancien mot de passe cesse de
// fonctionner dès la génération, et le membre doit en choisir un
// nouveau à sa première connexion avec le temporaire.
class ResetPasswordPage extends StatefulWidget {
  const ResetPasswordPage({super.key});
  @override
  State<ResetPasswordPage> createState() => _ResetPasswordPageState();
}

class _ResetPasswordPageState extends State<ResetPasswordPage> {
  final _search = TextEditingController();
  List<Map<String, dynamic>> _membres = [];
  bool _loading = true;
  String? _error;
  Map<String, dynamic>? _genere;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  @override
  void dispose() {
    _search.dispose();
    super.dispose();
  }

  Future<void> _charger() async {
    try {
      final list = await api.fetchAdminMembres();
      if (!mounted) return;
      setState(() {
        _membres = list;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _membres = [];
        _loading = false;
        _error = 'Membres indisponibles : $e';
      });
    }
  }

  List<Map<String, dynamic>> get _filtres {
    final q = _search.text.trim().toUpperCase();
    if (q.isEmpty) return _membres;
    return _membres.where((m) {
      final nom = (m['nom_complet'] ?? '').toString().toUpperCase();
      final mat = (m['matricule'] ?? '').toString().toUpperCase();
      return nom.contains(q) || mat.contains(q);
    }).toList();
  }

  Future<void> _generer(Map<String, dynamic> membre) async {
    final nom = (membre['nom_complet'] ?? '').toString();
    final mat = (membre['matricule'] ?? '').toString();
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Générer un mot de passe temporaire ?')),
        content: Text(isEn
            ? 'For $nom ($mat). The old password will stop working at once. The temporary password is valid for 24 hours.'
            : 'Pour $nom ($mat). L’ancien mot de passe ne fonctionnera plus dès maintenant. Le temporaire est valable 24 heures.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Générer'))),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final res = await api.generateTempPassword((membre['id'] ?? '').toString());
      if (!mounted) return;
      setState(() {
        _loading = false;
        _genere = res;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = 'Génération impossible : $e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!app.isAdminGeneral) {
      return basic(tr('Mot de passe oublié'), [
        EmptyNote(icon: Icons.shield_outlined, text: tr('Accès réservé à l’administrateur général.')),
      ]);
    }
    final t = Theme.of(context).textTheme;
    if (_genere != null) {
      final g = _genere!;
      final temp = (g['mot_de_passe_temporaire'] ?? '').toString();
      return basic(tr('Mot de passe temporaire'), [
        Text('${g['nom_complet']} · ${g['matricule']}', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
        const SizedBox(height: Cp.s2),
        Container(
          padding: const EdgeInsets.all(Cp.s2),
          decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(20)),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(tr('Mot de passe temporaire'), style: t.bodyMedium?.copyWith(color: Colors.white70)),
            const SizedBox(height: Cp.s1),
            SelectableText(temp, style: t.titleLarge?.copyWith(color: Cp.gold, fontWeight: FontWeight.w800, letterSpacing: 1.5)),
          ]),
        ),
        const SizedBox(height: Cp.s2),
        Text(tr('Ce mot de passe ne s’affichera plus après fermeture. Transmets-le en personne ou par appel, puis touche J’ai transmis. L’ancien mot de passe ne fonctionne plus, et ce temporaire est valable 24 heures.'), style: t.bodyMedium),
        const SizedBox(height: Cp.s2),
        SizedBox(
          height: 52,
          child: FilledButton.icon(
            onPressed: () async {
              await Clipboard.setData(ClipboardData(text: temp));
              if (context.mounted) ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(tr('Copié.'))));
            },
            icon: const Icon(Icons.copy_outlined),
            label: Text(tr('Copier')),
          ),
        ),
        const SizedBox(height: Cp.s2),
        SizedBox(
          height: 52,
          child: OutlinedButton(
            onPressed: () => setState(() => _genere = null),
            child: Text(tr('J’ai transmis, effacer')),
          ),
        ),
      ]);
    }
    return basic(tr('Mot de passe oublié'), [
      Text(tr('Choisis un membre, puis génère un mot de passe temporaire à lui transmettre hors application. Son ancien mot de passe cessera de fonctionner dès la génération.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      TextField(
        controller: _search,
        onChanged: (_) => setState(() {}),
        decoration: InputDecoration(
          labelText: tr('Rechercher par nom ou matricule'),
          filled: true,
          fillColor: Cp.card,
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
        ),
      ),
      const SizedBox(height: Cp.s2),
      if (_loading)
        const Center(child: CircularProgressIndicator())
      else if (_error != null)
        Text(_error!, style: const TextStyle(color: Cp.danger))
      else if (_filtres.isEmpty)
        Text(tr('Aucun membre trouvé.'), style: t.bodyMedium)
      else
        for (final m in _filtres)
          Card(
            child: ListTile(
              title: Text((m['nom_complet'] ?? '').toString(), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
              subtitle: Text('${m['matricule']} · ${(m['etablissement'] ?? '').toString()}', style: t.bodyMedium),
              trailing: const Icon(Icons.key_outlined, color: Cp.goldDeep),
              onTap: () => _generer(m),
            ),
          ),
    ]);
  }
}

// Changement forcé, 29 oct. 2026 : après une connexion avec un
// temporaire, le membre choisit un nouveau mot de passe avant tout
// autre usage. L'écran bloque le retour en arrière, seule la
// déconnexion permet de le quitter sans changer.
class ForcedPasswordPage extends StatefulWidget {
  const ForcedPasswordPage({super.key});
  @override
  State<ForcedPasswordPage> createState() => _ForcedPasswordPageState();
}

class _ForcedPasswordPageState extends State<ForcedPasswordPage> {
  final _nouveau = TextEditingController();
  final _confirm = TextEditingController();
  bool _show = false;
  bool _busy = false;
  String? _error;

  @override
  void dispose() {
    _nouveau.dispose();
    _confirm.dispose();
    super.dispose();
  }

  InputDecoration _dec(String label) => InputDecoration(
        labelText: label,
        filled: true,
        fillColor: Cp.card,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
      );

  Future<void> _submit() async {
    final nouveau = _nouveau.text;
    if (nouveau.length < 8) {
      setState(() => _error = tr('Le nouveau mot de passe doit avoir au moins 8 caractères.'));
      return;
    }
    if (nouveau != _confirm.text) {
      setState(() => _error = tr('Les deux mots de passe ne correspondent pas.'));
      return;
    }
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      await api.changePasswordForced(nouveau);
      if (mounted) Navigator.of(context).pop(true);
    } on ApiException catch (e) {
      if (mounted) {
        setState(() {
          _busy = false;
          _error = e.message;
        });
      }
    } catch (_) {
      if (mounted) {
        setState(() {
          _busy = false;
          _error = tr('Serveur injoignable. Vérifiez votre connexion, puis réessayez.');
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return PopScope(
      canPop: false,
      child: basic(tr('Nouveau mot de passe'), [
        Text(tr('Tu t’es connecté avec un mot de passe temporaire. Choisis un nouveau mot de passe pour continuer. L’ancien ne fonctionne plus.'), style: t.bodyMedium),
        const SizedBox(height: Cp.s2),
        TextField(
          controller: _nouveau,
          obscureText: !_show,
          decoration: _dec(tr('Nouveau mot de passe (au moins 8 caractères)')).copyWith(
            suffixIcon: IconButton(
              icon: Icon(_show ? Icons.visibility_off_outlined : Icons.visibility_outlined),
              onPressed: () => setState(() => _show = !_show),
            ),
          ),
        ),
        const SizedBox(height: Cp.s2),
        TextField(
          controller: _confirm,
          obscureText: !_show,
          decoration: _dec(tr('Confirmer le nouveau mot de passe')),
        ),
        if (_error != null) ...[
          const SizedBox(height: Cp.s1),
          Text(_error!, style: const TextStyle(color: Cp.danger)),
        ],
        const SizedBox(height: Cp.s3),
        SizedBox(
          height: 56,
          child: FilledButton(
            onPressed: _busy ? null : _submit,
            child: Text(_busy ? tr('En cours…') : tr('Choisir ce mot de passe')),
          ),
        ),
        const SizedBox(height: Cp.s1),
        TextButton(
          onPressed: () async {
            app.logout();
            if (mounted) Navigator.of(context).pop(false);
          },
          child: Text(tr('Se déconnecter')),
        ),
      ]),
    );
  }
}

// RAPPORTS DE BUG, 29 oct. 2026
// ═══════════════════════════════════════════════════════════════════

// Page « Signaler un problème », depuis l'onglet Plus, pour tout le
// monde, visiteur comme membre. Le membre décrit le bug, le contexte
// technique part tout seul : version, appareil, système, écran. Ne
// jamais taper ici de mot de passe, de numéro ou d'adresse e-mail :
// le message est nettoyé avant l'envoi, mais la description reste ce
// que le membre a écrit. Sans connexion, le rapport est gardé sur
// l'appareil et part à la prochaine connexion.
class BugReportPage extends StatefulWidget {
  const BugReportPage({super.key});
  @override
  State<BugReportPage> createState() => _BugReportPageState();
}

class _BugReportPageState extends State<BugReportPage> {
  final _description = TextEditingController();
  bool _sending = false;

  @override
  void dispose() {
    _description.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      return basic(tr('Signaler un problème'), [
        Text(isEn ? 'Describe what went wrong, in a few words. The app version, device, system and current screen are sent automatically, nothing else.' : 'Décrivez ce qui ne marche pas, en quelques mots. La version de l’application, l’appareil, le système et l’écran courant partent tout seuls, rien d’autre.', style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 16)),
        const SizedBox(height: Cp.s2),
        TextField(
          controller: _description,
          maxLines: 5,
          decoration: InputDecoration(
            hintText: isEn ? 'What happened? (optional)' : 'Que s’est-il passé ? (facultatif)',
            border: const OutlineInputBorder(),
          ),
        ),
        const SizedBox(height: Cp.s1),
        Text(isEn ? 'Never type a password, a phone number or an email address here.' : 'Ne tapez jamais ici de mot de passe, de numéro de téléphone ou d’adresse e-mail.', style: t.bodyMedium?.copyWith(color: Cp.danger)),
        const SizedBox(height: Cp.s2),
        SizedBox(
          width: double.infinity,
          child: FilledButton(
            onPressed: _sending
                ? null
                : () async {
                    setState(() => _sending = true);
                    final sent = await BugReports.instance.reportManual(_description.text);
                    if (!mounted) return;
                    setState(() => _sending = false);
                    toast(c, sent ? tr('Rapport envoyé. Merci.') : tr('Rapport gardé sur l’appareil, il partira à la prochaine connexion.'));
                    if (sent) Navigator.of(c).pop();
                  },
            style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
            child: Text(_sending ? tr('Envoi…') : tr('Envoyer le rapport')),
          ),
        ),
      ]);
    });
  }
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
      final date = _dateHeure((row['confirme_le'] ?? '').toString());
      final nom = (row['confirme_par_nom'] ?? '').toString();
      trace = isEn
          ? (nom.isEmpty ? 'Confirmed on $date.' : 'Confirmed on $date by $nom.')
          : (nom.isEmpty ? 'Validé le $date.' : 'Validé le $date par $nom.');
    } else if (statut == 'refuse') {
      final date = _dateHeure((row['refuse_le'] ?? '').toString());
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
            Center(child: _pastilleStatutPaiement(statut)),
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
            ligne(tr('Libellé'), _typePaiementLabel(type)),
            if (livres.isNotEmpty) ligne(tr('Livres'), livres.join(', ')),
            ligne(tr('Moyen'), _moyenPaiementLabel(moyen.isEmpty ? null : moyen)),
            ligne(tr('Référence'), (row['reference'] ?? '').toString()),
            ligne(tr('Date et heure'), _dateHeure((row['cree_le'] ?? '').toString())),
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

// Historique unifié du membre connecté.
class TransactionHistoryPage extends StatefulWidget {
  const TransactionHistoryPage({super.key});

  @override
  State<TransactionHistoryPage> createState() => _TransactionHistoryPageState();
}

class _TransactionHistoryPageState extends State<TransactionHistoryPage> {
  List<Map<String, dynamic>> _rows = [];
  bool _loading = true;
  String? _erreur;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    if (kIsWeb) {
      setState(() => _loading = false);
      return;
    }
    setState(() {
      _loading = true;
      _erreur = null;
    });
    try {
      final rows = await api.fetchMyPayments();
      if (!mounted) return;
      setState(() {
        _rows = rows;
        _loading = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _erreur = tr('Impossible de charger l’historique.');
        _loading = false;
      });
    }
  }

  Future<void> _ouvrirFiche(BuildContext c, Map<String, dynamic> row) async {
    await showModalBottomSheet<void>(
      context: c,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (sheetCtx) => TransactionDetailSheet(
        row: row,
        isAdmin: false,
        onFacture: row['statut'] == 'confirme'
            ? () {
                Navigator.of(sheetCtx).pop();
                go(c, InvoicePage(request: _payRequestFromRow(row, isAdmin: false)));
              }
            : null,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (kIsWeb) {
      return basic(tr('Historique des transactions'), [
        EmptyNote(icon: Icons.smartphone_outlined, text: tr('Disponible sur téléphone seulement.')),
      ]);
    }
    return basic(tr('Historique des transactions'), [
      if (_loading)
        const Center(child: CircularProgressIndicator())
      else if (_erreur != null)
        Column(children: [
          EmptyNote(icon: Icons.receipt_long_outlined, text: _erreur!),
          const SizedBox(height: Cp.s1),
          FilledButton.icon(onPressed: _load, icon: const Icon(Icons.refresh_outlined), label: Text(tr('Actualiser'))),
        ])
      else if (_rows.isEmpty)
        EmptyNote(icon: Icons.receipt_long_outlined, text: tr('Aucune opération pour le moment.'))
      else
        for (final row in _rows)
          Padding(
            padding: const EdgeInsets.only(bottom: Cp.s1),
            child: _carteOperation(context, row, isAdmin: false, onTap: () => _ouvrirFiche(context, row)),
          ),
    ], actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}

// Historique des transactions côté administration.
class AdminTransactionHistoryPage extends StatefulWidget {
  const AdminTransactionHistoryPage({super.key, this.matricule});
  final String? matricule;

  @override
  State<AdminTransactionHistoryPage> createState() => _AdminTransactionHistoryPageState();
}

class _AdminTransactionHistoryPageState extends State<AdminTransactionHistoryPage> {
  List<Map<String, dynamic>> _rows = [];
  List<Map<String, dynamic>> _etablissements = [];
  Map<String, dynamic> _totaux = {};
  String _type = 'tous';
  String _statut = 'tous';
  String _periode = 'tout';
  String? _etablissementId;
  String? _matricule;
  bool _loading = true;
  String? _erreur;

  bool get _general => app.isAdminGeneral;

  @override
  void initState() {
    super.initState();
    _matricule = widget.matricule;
    _load();
  }

  String? _debut() {
    final now = DateTime.now();
    if (_periode == '30j') return _dateIso(now.subtract(const Duration(days: 30)));
    if (_periode == 'mois') return _dateIso(DateTime(now.year, now.month, 1));
    return null;
  }

  String? _fin() => _periode == 'tout' ? null : _dateIso(DateTime.now());

  Future<void> _load() async {
    if (kIsWeb || !app.isAdmin) {
      setState(() => _loading = false);
      return;
    }
    setState(() {
      _loading = true;
      _erreur = null;
    });
    try {
      final rows = await api.fetchAdminPayments(
        statut: _statut == 'tous' ? null : _statut,
        matricule: _matricule,
        type: _type == 'tous' ? null : _type,
        etablissementId: _general ? _etablissementId : null,
        debut: _debut(),
        fin: _fin(),
      );
      final totaux = await api.fetchAdminPaymentsTotaux(
        matricule: _matricule,
        type: _type == 'tous' ? null : _type,
        etablissementId: _general ? _etablissementId : null,
        debut: _debut(),
        fin: _fin(),
      );
      var etabs = _etablissements;
      if (_general && etabs.isEmpty) {
        try {
          etabs = await api.fetchEtablissements();
        } catch (_) {
          etabs = [];
        }
      }
      if (!mounted) return;
      setState(() {
        _rows = rows;
        _totaux = totaux;
        _etablissements = etabs;
        _loading = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _erreur = tr('Impossible de charger l’historique.');
        _loading = false;
      });
    }
  }

  Widget _choix(String label, bool selected, VoidCallback onTap) {
    return Padding(
      padding: const EdgeInsets.only(right: Cp.s1),
      child: ChoiceChip(
        label: Text(label),
        selected: selected,
        selectedColor: Cp.navy,
        backgroundColor: Cp.card,
        labelStyle: TextStyle(fontWeight: FontWeight.w800, color: selected ? Colors.white : Cp.navy),
        onSelected: (_) => onTap(),
      ),
    );
  }

  Widget _ligneFiltres(String titre, List<Widget> chips) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(titre, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
        const SizedBox(height: Cp.s1),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(children: chips),
        ),
        const SizedBox(height: Cp.s2),
      ],
    );
  }

  int _nombre(String k) => (_totaux[k] as num?)?.toInt() ?? 0;

  Widget _carteTotaux() {
    final t = Theme.of(context).textTheme;
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(tr('Total encaissé'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
          const SizedBox(height: Cp.s1),
          Text(fcfa(_nombre('total_confirme')), style: t.displaySmall?.copyWith(fontWeight: FontWeight.w900, color: Cp.navy)),
          const SizedBox(height: Cp.s1),
          Text('${tr('Validé')} : ${_nombre('nombre_confirme')} · ${fcfa(_nombre('total_confirme'))}', style: t.bodyMedium),
          Text('${tr('En attente')} : ${_nombre('nombre_en_attente')} · ${fcfa(_nombre('total_en_attente'))}', style: t.bodyMedium),
          Text('${tr('Refusé')} : ${_nombre('nombre_refuse')} · ${fcfa(_nombre('total_refuse'))}', style: t.bodyMedium),
          if (_nombre('nombre_annule') > 0)
            Text('${tr('Annulé')} : ${_nombre('nombre_annule')} · ${fcfa(_nombre('total_annule'))}', style: t.bodyMedium),
          const SizedBox(height: Cp.s1),
          Text(tr('Les totaux couvrent toutes les opérations de la sélection, la liste en affiche 200 au maximum.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
        ],
      ),
    );
  }

  Future<void> _exporterCsv() async {
    final lignes = <String>[
      [_csvChamp(tr('Date et heure')), _csvChamp(tr('Référence')), _csvChamp(tr('Membre')), _csvChamp(tr('Matricule')), _csvChamp(tr('Établissement')), _csvChamp(tr('Type')), _csvChamp(tr('Moyen')), _csvChamp(tr('Montant')), _csvChamp(tr('Statut')), _csvChamp(tr('Validé le')), _csvChamp(tr('Refusé le')), _csvChamp(tr('Validé par')), _csvChamp(tr('Refusé par'))].join(';'),
    ];
    for (final row in _rows) {
      final moyen = (row['moyen'] ?? '').toString();
      lignes.add([
        _csvChamp(_dateHeure((row['cree_le'] ?? '').toString())),
        _csvChamp((row['reference'] ?? '').toString()),
        _csvChamp((row['nom_complet'] ?? '').toString()),
        _csvChamp((row['matricule'] ?? '').toString()),
        _csvChamp((row['etablissement_nom'] ?? '').toString()),
        _csvChamp(_typePaiementLabel((row['type'] ?? '').toString())),
        _csvChamp(_moyenPaiementLabel(moyen.isEmpty ? null : moyen)),
        _csvChamp(((row['montant_fcfa'] as num?)?.toInt() ?? 0).toString()),
        _csvChamp(_statutPaiementLabel((row['statut'] ?? '').toString())),
        _csvChamp(_dateHeure((row['confirme_le'] ?? '').toString())),
        _csvChamp(_dateHeure((row['refuse_le'] ?? '').toString())),
        _csvChamp((row['confirme_par_nom'] ?? '').toString()),
        _csvChamp((row['refuse_par_nom'] ?? '').toString()),
      ].join(';'));
    }
    final contenu = lignes.join('\n');
    try {
      final bytes = <int>[0xEF, 0xBB, 0xBF, ...utf8.encode(contenu)];
      final fichier = await saveToDownloads(bytes, 'transactions.csv');
      if (!mounted) return;
      toast(context, '${tr('Exporté')} : ${fichier.path.split('/').last}');
      await Share.shareXFiles([XFile(fichier.path)], text: tr('Historique des transactions'));
    } catch (e) {
      if (!mounted) return;
      toast(context, '$e');
    }
  }

  Future<void> _ouvrirFiche(BuildContext c, Map<String, dynamic> row) async {
    final matricule = (row['matricule'] ?? '').toString();
    await showModalBottomSheet<void>(
      context: c,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (sheetCtx) => TransactionDetailSheet(
        row: row,
        isAdmin: true,
        onFacture: row['statut'] == 'confirme'
            ? () {
                Navigator.of(sheetCtx).pop();
                go(c, InvoicePage(request: _payRequestFromRow(row, isAdmin: true)));
              }
            : null,
        onAutresOperations: matricule.isNotEmpty
            ? () {
                Navigator.of(sheetCtx).pop();
                go(c, AdminTransactionHistoryPage(matricule: matricule));
              }
            : null,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    if (kIsWeb) {
      return basic(tr('Historique des transactions'), [
        EmptyNote(icon: Icons.smartphone_outlined, text: tr('Disponible sur téléphone seulement.')),
      ]);
    }
    if (!app.isAdmin) {
      return basic(tr('Historique des transactions'), [
        EmptyNote(icon: Icons.shield_outlined, text: tr('Accès réservé aux administrateurs de la structure.')),
      ]);
    }
    return basic(tr('Historique des transactions'), [
      if (_matricule != null)
        Padding(
          padding: const EdgeInsets.only(bottom: Cp.s2),
          child: Row(children: [
            Expanded(child: Text('${tr('Membre')} : $_matricule', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
            TextButton.icon(onPressed: () { setState(() => _matricule = null); _load(); }, icon: const Icon(Icons.close_outlined), label: Text(tr('Effacer'))),
          ]),
        ),
      _ligneFiltres(tr('Type'), [
        _choix(tr('Tout'), _type == 'tous', () { setState(() => _type = 'tous'); _load(); }),
        _choix(tr('Don'), _type == 'don', () { setState(() => _type = 'don'); _load(); }),
        _choix(tr('Cotisation'), _type == 'cotisation', () { setState(() => _type = 'cotisation'); _load(); }),
        _choix(tr('Carte'), _type == 'carte', () { setState(() => _type = 'carte'); _load(); }),
        _choix(tr('Achat'), _type == 'achat', () { setState(() => _type = 'achat'); _load(); }),
        _choix(tr('Versement du camp'), _type == 'camp', () { setState(() => _type = 'camp'); _load(); }),
      ]),
      _ligneFiltres(tr('Statut'), [
        _choix(tr('Tout'), _statut == 'tous', () { setState(() => _statut = 'tous'); _load(); }),
        _choix(tr('En attente'), _statut == 'en_attente', () { setState(() => _statut = 'en_attente'); _load(); }),
        _choix(tr('Validé'), _statut == 'confirme', () { setState(() => _statut = 'confirme'); _load(); }),
        _choix(tr('Refusé'), _statut == 'refuse', () { setState(() => _statut = 'refuse'); _load(); }),
        _choix(tr('Annulé'), _statut == 'annule', () { setState(() => _statut = 'annule'); _load(); }),
      ]),
      _ligneFiltres(tr('Période'), [
        _choix(tr('Tout'), _periode == 'tout', () { setState(() => _periode = 'tout'); _load(); }),
        _choix(tr('30 derniers jours'), _periode == '30j', () { setState(() => _periode = '30j'); _load(); }),
        _choix(tr('Ce mois'), _periode == 'mois', () { setState(() => _periode = 'mois'); _load(); }),
      ]),
      if (_general && _etablissements.isNotEmpty)
        _ligneFiltres(tr('Établissement'), [
          _choix(tr('Tous les établissements'), _etablissementId == null, () { setState(() => _etablissementId = null); _load(); }),
          for (final e in _etablissements)
            _choix((e['nom'] ?? '').toString(), _etablissementId == (e['id'] ?? '').toString(), () { setState(() => _etablissementId = (e['id'] ?? '').toString()); _load(); }),
        ]),
      if (!_general)
        Padding(
          padding: const EdgeInsets.only(bottom: Cp.s2),
          child: Text(tr('Opérations de votre établissement.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
        ),
      _carteTotaux(),
      const SizedBox(height: Cp.s2),
      SizedBox(
        width: double.infinity,
        height: 56,
        child: OutlinedButton.icon(
          onPressed: _rows.isEmpty ? null : _exporterCsv,
          icon: const Icon(Icons.download_outlined),
          label: Text(tr('Exporter CSV')),
        ),
      ),
      const SizedBox(height: Cp.s2),
      if (_loading)
        const Center(child: CircularProgressIndicator())
      else if (_erreur != null)
        Column(children: [
          EmptyNote(icon: Icons.receipt_long_outlined, text: _erreur!),
          const SizedBox(height: Cp.s1),
          FilledButton.icon(onPressed: _load, icon: const Icon(Icons.refresh_outlined), label: Text(tr('Actualiser'))),
        ])
      else if (_rows.isEmpty)
        EmptyNote(icon: Icons.receipt_long_outlined, text: tr('Aucune opération pour le moment.'))
      else
        for (final row in _rows)
          Padding(
            padding: const EdgeInsets.only(bottom: Cp.s1),
            child: _carteOperation(context, row, isAdmin: true, onTap: () => _ouvrirFiche(context, row)),
          ),
    ], actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}

// ───────────────────────── Chiffres ─────────────
// 30 oct. 2026, téléphone seulement : statistiques d'encaissement
// de l'administration, depuis la route totaux déjà livrée par
// l'historique. Seuls les paiements confirmés comptent dans le
// total encaissé, les demandes en attente s'affichent à part,
// jamais dans le total. Aucun paiement de camp n'existe
// aujourd'hui, la ventilation ne compte que don, cotisation,
// carte et achat. Pas de vue membre : la route membre est
// plafonnée à 100 lignes, un total calculé côté téléphone
// pourrait être faux, alors que la route totaux agrège côté
// serveur sans plafond.
class ChiffresPage extends StatefulWidget {
  const ChiffresPage({super.key});

  @override
  State<ChiffresPage> createState() => _ChiffresPageState();
}

class _ChiffresPageState extends State<ChiffresPage> {
  static const _types = ['don', 'cotisation', 'carte', 'achat', 'camp'];

  String _onglet = 'jour';
  List<Map<String, dynamic>> _etablissements = [];
  Map<String, dynamic> _periode = {};
  Map<String, Map<String, dynamic>> _typesPeriode = {};
  List<Map<String, dynamic>> _etabsPeriode = [];
  Map<String, dynamic> _jour = {};
  Map<String, Map<String, dynamic>> _typesJour = {};
  List<Map<String, dynamic>> _jours = [];
  bool _loading = true;
  bool _loadingPeriode = false;
  String? _erreur;

  bool get _general => app.isAdminGeneral;

  @override
  void initState() {
    super.initState();
    _load();
  }

  String _aujourdHui() => _dateIso(DateTime.now());

  (String, String) _bornes() {
    final now = DateTime.now();
    if (_onglet == 'semaine') return (_dateIso(now.subtract(const Duration(days: 6))), _aujourdHui());
    if (_onglet == 'mois') return (_dateIso(DateTime(now.year, now.month, 1)), _aujourdHui());
    return (_aujourdHui(), _aujourdHui());
  }

  int _n(Map<String, dynamic> m, String k) => (m[k] as num?)?.toInt() ?? 0;

  String _periodeLabel() {
    final (debut, fin) = _bornes();
    final d = dateFr(DateTime.parse(debut));
    final f = dateFr(DateTime.parse(fin));
    if (_onglet == 'jour') return isEn ? 'Today, $d' : 'Aujourd’hui, $d';
    return isEn ? 'From $d to $f' : 'Du $d au $f';
  }

  Future<void> _load() async {
    if (kIsWeb || !app.isAdmin) {
      setState(() => _loading = false);
      return;
    }
    setState(() {
      _loading = true;
      _erreur = null;
    });
    try {
      var etabs = <Map<String, dynamic>>[];
      if (_general) {
        try {
          etabs = await api.fetchEtablissements();
        } catch (_) {
          etabs = [];
        }
      }
      final aujourdHui = _aujourdHui();
      final jour = await api.fetchAdminPaymentsTotaux(debut: aujourdHui, fin: aujourdHui);
      final typesJour = <String, Map<String, dynamic>>{};
      for (final type in _types) {
        typesJour[type] = await api.fetchAdminPaymentsTotaux(type: type, debut: aujourdHui, fin: aujourdHui);
      }
      final jours = <Map<String, dynamic>>[];
      final now = DateTime.now();
      for (var i = 6; i >= 0; i--) {
        final d = DateTime(now.year, now.month, now.day - i);
        final iso = _dateIso(d);
        final tot = await api.fetchAdminPaymentsTotaux(debut: iso, fin: iso);
        jours.add({'date': d, 'total': (tot['total_confirme'] as num?)?.toInt() ?? 0});
      }
      if (!mounted) return;
      setState(() {
        _etablissements = etabs;
        _jour = jour;
        _typesJour = typesJour;
        _jours = jours;
        _loading = false;
      });
      await _loadPeriode(premiere: true);
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _erreur = tr('Impossible de charger les chiffres.');
        _loading = false;
      });
    }
  }

  Future<void> _loadPeriode({bool premiere = false}) async {
    final (debut, fin) = _bornes();
    setState(() => _loadingPeriode = true);
    try {
      final periode = await api.fetchAdminPaymentsTotaux(debut: debut, fin: fin);
      final types = <String, Map<String, dynamic>>{};
      for (final type in _types) {
        types[type] = await api.fetchAdminPaymentsTotaux(type: type, debut: debut, fin: fin);
      }
      final etabs = <Map<String, dynamic>>[];
      if (_general) {
        for (final e in _etablissements) {
          final id = (e['id'] ?? '').toString();
          if (id.isEmpty) continue;
          final tot = await api.fetchAdminPaymentsTotaux(etablissementId: id, debut: debut, fin: fin);
          etabs.add({'nom': (e['nom'] ?? '').toString(), 'totaux': tot});
        }
      }
      if (!mounted) return;
      setState(() {
        _periode = periode;
        _typesPeriode = types;
        _etabsPeriode = etabs;
        _loadingPeriode = false;
      });
    } catch (_) {
      if (!mounted) return;
      if (premiere) {
        setState(() {
          _erreur = tr('Impossible de charger les chiffres.');
          _loadingPeriode = false;
        });
      } else {
        setState(() => _loadingPeriode = false);
        toast(context, tr('Impossible de charger les chiffres.'));
      }
    }
  }

  Widget _choix(String label, bool selected, VoidCallback onTap) {
    return Padding(
      padding: const EdgeInsets.only(right: Cp.s1),
      child: ChoiceChip(
        label: Text(label),
        selected: selected,
        selectedColor: Cp.navy,
        backgroundColor: Cp.card,
        labelStyle: TextStyle(fontWeight: FontWeight.w800, color: selected ? Colors.white : Cp.navy),
        onSelected: (_) => onTap(),
      ),
    );
  }

  Widget _titre(String s) {
    return Text(s, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy));
  }

  Widget _carteTotal() {
    final t = Theme.of(context).textTheme;
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(children: [
            Expanded(child: Text(tr('Total encaissé'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
            if (_loadingPeriode) const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2)),
          ]),
          const SizedBox(height: Cp.s1),
          Text(fcfa(_n(_periode, 'total_confirme')), style: t.displaySmall?.copyWith(fontWeight: FontWeight.w900, color: Cp.navy)),
          const SizedBox(height: Cp.s1),
          Text('${tr('Paiements confirmés')} : ${_n(_periode, 'nombre_confirme')}', style: t.bodyMedium),
          Text(_periodeLabel(), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
        ],
      ),
    );
  }

  Widget _carteEnAttente() {
    final t = Theme.of(context).textTheme;
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(color: const Color(0xFFFEF3C7), borderRadius: BorderRadius.circular(24), border: Border.all(color: const Color(0xFFEBD98E))),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('${tr('En attente de confirmation')} : ${_n(_periode, 'nombre_en_attente')} · ${fcfa(_n(_periode, 'total_en_attente'))}', style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: Cp.goldDeep)),
          const SizedBox(height: Cp.s1),
          Text(tr('Ces montants ne sont pas comptés dans le total encaissé.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
          if (_n(_periode, 'nombre_refuse') > 0)
            Padding(
              padding: const EdgeInsets.only(top: Cp.s1),
              child: Text('${tr('Refusé')} : ${_n(_periode, 'nombre_refuse')} · ${fcfa(_n(_periode, 'total_refuse'))}', style: t.bodyMedium),
            ),
        ],
      ),
    );
  }

  Widget _ligneVentilation(IconData icone, String label, int nombre, int total) {
    final t = Theme.of(context).textTheme;
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(children: [
        Icon(icone, color: Cp.goldDeep),
        const SizedBox(width: Cp.s1),
        Expanded(child: Text(label, style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: Cp.navy))),
        Text('$nombre · ${fcfa(total)}', style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: Cp.navy)),
      ]),
    );
  }

  Widget _resumeJour() {
    final t = Theme.of(context).textTheme;
    final lignes = <Widget>[];
    for (final type in _types) {
      final tot = _typesJour[type] ?? {};
      if (_n(tot, 'nombre_confirme') > 0) {
        lignes.add(_ligneVentilation(_typePaiementIcone(type), _typePaiementLabel(type), _n(tot, 'nombre_confirme'), _n(tot, 'total_confirme')));
      }
    }
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(fcfa(_n(_jour, 'total_confirme')), style: t.displaySmall?.copyWith(fontWeight: FontWeight.w900, color: Cp.navy)),
          const SizedBox(height: Cp.s1),
          Text('${tr('Paiements confirmés')} : ${_n(_jour, 'nombre_confirme')}', style: t.bodyMedium),
          if (_n(_jour, 'nombre_en_attente') > 0)
            Text('${tr('En attente')} : ${_n(_jour, 'nombre_en_attente')} · ${fcfa(_n(_jour, 'total_en_attente'))}', style: t.bodyMedium?.copyWith(color: Cp.goldDeep)),
          if (lignes.isNotEmpty) ...[
            const SizedBox(height: Cp.s2),
            ...lignes,
          ] else
            Padding(
              padding: const EdgeInsets.only(top: Cp.s2),
              child: Text(tr('Aucun encaissement aujourd’hui.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
            ),
        ],
      ),
    );
  }

  Widget _barres() {
    final t = Theme.of(context).textTheme;
    var maxTotal = 0;
    for (final j in _jours) {
      final v = j['total'] as int;
      if (v > maxTotal) maxTotal = v;
    }
    final joursSemaine = isEn ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'];
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
      child: Column(children: [
        SizedBox(
          height: 160,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              for (final j in _jours)
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 2),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        FittedBox(
                          fit: BoxFit.scaleDown,
                          child: Text((j['total'] as int) > 0 ? fcfa(j['total'] as int) : '', style: t.bodySmall?.copyWith(fontWeight: FontWeight.w700, color: Cp.navy)),
                        ),
                        const SizedBox(height: 4),
                        Container(
                          height: maxTotal > 0 ? 8 + ((j['total'] as int) / maxTotal * 100) : 2,
                          decoration: BoxDecoration(
                            color: (j['total'] as int) > 0 ? Cp.gold : Cp.line,
                            borderRadius: BorderRadius.circular(4),
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text('${joursSemaine[((j['date'] as DateTime).weekday - 1)]} ${(j['date'] as DateTime).day}', style: t.bodySmall?.copyWith(color: Cp.inkMuted)),
                      ],
                    ),
                  ),
                ),
            ],
          ),
        ),
        if (maxTotal == 0)
          Padding(
            padding: const EdgeInsets.only(top: Cp.s1),
            child: Text(tr('Aucun encaissement sur les 7 derniers jours.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
          ),
      ]),
    );
  }

  Widget _ventilationType() {
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
      child: Column(children: [
        for (final type in _types)
          _ligneVentilation(_typePaiementIcone(type), _typePaiementLabel(type), _n(_typesPeriode[type] ?? {}, 'nombre_confirme'), _n(_typesPeriode[type] ?? {}, 'total_confirme')),
      ]),
    );
  }

  Widget _ventilationEtablissements() {
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
      child: Column(children: [
        for (final e in _etabsPeriode)
          _ligneVentilation(Icons.apartment_outlined, (e['nom'] ?? '').toString(), _n((e['totaux'] as Map<String, dynamic>? ?? {}), 'nombre_confirme'), _n((e['totaux'] as Map<String, dynamic>? ?? {}), 'total_confirme')),
      ]),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    if (kIsWeb) {
      return basic(tr('Chiffres'), [
        EmptyNote(icon: Icons.smartphone_outlined, text: tr('Disponible sur téléphone seulement.')),
      ]);
    }
    if (!app.isAdmin) {
      return basic(tr('Chiffres'), [
        EmptyNote(icon: Icons.shield_outlined, text: tr('Accès réservé aux administrateurs de la structure.')),
      ]);
    }
    return basic(tr('Chiffres'), [
      SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(children: [
          _choix(tr('Aujourd’hui'), _onglet == 'jour', () { setState(() => _onglet = 'jour'); _loadPeriode(); }),
          _choix(tr('Semaine'), _onglet == 'semaine', () { setState(() => _onglet = 'semaine'); _loadPeriode(); }),
          _choix(tr('Mois'), _onglet == 'mois', () { setState(() => _onglet = 'mois'); _loadPeriode(); }),
        ]),
      ),
      const SizedBox(height: Cp.s2),
      if (!_general)
        Padding(
          padding: const EdgeInsets.only(bottom: Cp.s2),
          child: Text(tr('Opérations de votre établissement.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
        ),
      if (_loading)
        const Center(child: CircularProgressIndicator())
      else if (_erreur != null)
        Column(children: [
          EmptyNote(icon: Icons.table_chart_outlined, text: _erreur!),
          const SizedBox(height: Cp.s1),
          FilledButton.icon(onPressed: _load, icon: const Icon(Icons.refresh_outlined), label: Text(tr('Actualiser'))),
        ])
      else
        Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _carteTotal(),
            const SizedBox(height: Cp.s2),
            _carteEnAttente(),
            const SizedBox(height: Cp.s2),
            _titre(tr('Résumé du jour')),
            const SizedBox(height: Cp.s1),
            _resumeJour(),
            const SizedBox(height: Cp.s2),
            _titre(tr('Les 7 derniers jours')),
            const SizedBox(height: Cp.s1),
            _barres(),
            const SizedBox(height: Cp.s2),
            _titre(tr('Par type')),
            const SizedBox(height: Cp.s1),
            _ventilationType(),
            if (_general && _etabsPeriode.isNotEmpty) ...[
              const SizedBox(height: Cp.s2),
              _titre(tr('Par établissement')),
              const SizedBox(height: Cp.s1),
              _ventilationEtablissements(),
            ],
          ],
        ),
    ], actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}
