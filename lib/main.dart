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
import 'package:flutter/rendering.dart';
import 'package:image/image.dart' as img;
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';
import 'package:file_picker/file_picker.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:share_plus/share_plus.dart';

import 'api.dart';
import 'audio.dart';
import 'remote_config.dart';
import 'package:path_provider/path_provider.dart';
import 'bible.dart';
import 'dictionary.dart';
import 'notifications.dart';
import 'home_web.dart';
import 'web_assets.dart';
import 'header_logo.dart';
import 'i18n.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';

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
  await api.restoreToken(); // jetons serveur conservés sur l'appareil
  await app.load(); // restaure profil, plan de 21 jours et journal
  runApp(const ConnexionProphetiqueApp());
  // Verset du jour en notification : reprogrammé à chaque ouverture
  // si la permission est déjà accordée, sans demander la permission
  // au démarrage. La demande se fait depuis la page Bible.
  if (app.dailyVerseNotif) {
    unawaited(DailyVerseNotifications.instance.scheduleWeek(app.lang));
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
      {this.fonction = '', this.ministere = '', this.photoPath = '', this.photoData = '', this.validUntilOverride});
  final String name, matricule, etab, fonction, ministere, photoPath;
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
      fonction: fonction, ministere: ministere, photoPath: path, photoData: photoData, validUntilOverride: validUntilOverride);
  Member withServerPhoto(String dataUrl) => Member(name, matricule, etab, since,
      fonction: fonction, ministere: ministere, photoPath: photoPath, photoData: dataUrl, validUntilOverride: validUntilOverride);
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
  Camp({required this.id, required this.name, this.dates = '', this.place = '', this.tariff = '', this.kairos = false, this.serverId = '', this.imagePath = '', this.imageUrl = '', this.type = 'camp', this.scope = 'Communauté'});
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
  String name, dates, place, tariff;
  String imagePath, imageUrl;
  bool kairos;
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
  NewsItem(this.title, this.text, this.etab, this.date, {this.etablissementId = '', this.imagePath = '', this.imageUrl = ''});
  final String title, text, etab;
  final DateTime date;
  final String etablissementId;
  String imagePath, imageUrl;
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
  Teaching(this.title, this.speaker, this.url, {this.kind = 'enseignement', this.imagePath = '', this.imageUrl = '', this.audioId = ''});
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
  PayRequest(this.ref, this.kind, this.amount, this.items, this.memberName, this.matricule, this.date, {this.method = 'Wave', this.currency = ''});
  final String ref, kind, memberName, matricule; // kind : 'don' | 'achat' | 'carte' | 'cotisation'
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
  Registration(this.camp, this.member, this.date, {this.codePass = '', this.participants = 1, this.hebergement = '', this.repas = '', this.transport = ''});
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
        final r = PayRequest(ref, type, amount, items, member!.name, member!.matricule, date);
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
          ));
        }
      }
      if (events.isNotEmpty) {
        camps.clear();
        var campIndex = 0;
        for (final e in events) {
          final debut = (e['date_debut'] ?? '').toString();
          final fin = (e['date_fin'] ?? '').toString();
          final dates = debut.isEmpty ? '' : (fin.isEmpty || fin == debut ? debut : '$debut - $fin');
          camps.add(Camp(
            id: ++campIndex,
            serverId: (e['id'] ?? '').toString(),
            name: (e['nom'] ?? '').toString(),
            dates: dates,
            place: (e['lieu'] ?? '').toString(),
            tariff: e['tarif_fcfa'] == null ? '' : '${e['tarif_fcfa']} FCFA',
            kairos: e['est_kairos'] == true,
            type: (e['type'] ?? 'camp').toString(),
            imageUrl: (e['image_id'] ?? '').toString().isEmpty ? '' : '$kApiBaseUrl/fichiers/${e['image_id']}',
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
          serverTeachings.add(Teaching(
            (t['titre'] ?? '').toString(),
            (t['orateur'] ?? '').toString(),
            audioId.isEmpty ? '' : '$kApiBaseUrl/fichiers/$audioId',
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
      ensureKairosCamp();
      await syncServerPayments();
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
    member = Member(name, matricule, etab, inscrit,
        fonction: serverFonction.isNotEmpty ? serverFonction : (fonction.isNotEmpty ? fonction : oldFonction), ministere: ministere,
        photoPath: serverPhoto.isNotEmpty ? '' : photoPath, photoData: serverPhoto, validUntilOverride: valide);
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
  final bureau = <BureauMember>[];
  final teachings = <Teaching>[];
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
        await prefs.setString('member', jsonEncode({'name': m.name, 'mat': m.matricule, 'etab': m.etab, 'fonction': m.fonction, 'ministere': m.ministere, 'photo': m.photoPath, 'photoData': m.photoData, 'since': m.since.toIso8601String(), 'validUntil': m.validUntilOverride?.toIso8601String()}));
        await prefs.setStringList('books', books.map((b) => jsonEncode({'id': b.id, 'title': b.title, 'author': b.author, 'desc': b.description, 'format': b.format, 'url': b.fileUrl, 'price': b.price, 'imagePath': b.imagePath, 'imageUrl': b.imageUrl, 'fichierId': b.fichierId})).toList());
        await prefs.setStringList('teachings', teachings.map((x) => jsonEncode({'title': x.title, 'speaker': x.speaker, 'url': x.url, 'kind': x.kind, 'imagePath': x.imagePath, 'imageUrl': x.imageUrl})).toList());
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
      waveRecipient = prefs.getString('wave_recipient') ?? '';
      confirmedWaveNumber = prefs.getString('wave_number') ?? '';
      dailyVerseNotif = prefs.getBool('daily_verse_notif') ?? true;
      final m = prefs.getString('member');
      if (m != null) {
        final j = jsonDecode(m) as Map<String, dynamic>;
        final validSaved = j['validUntil'] as String?;
        member = Member(j['name'] as String, j['mat'] as String, j['etab'] as String, DateTime.parse(j['since'] as String), fonction: (j['fonction'] as String?) ?? '', ministere: (j['ministere'] as String?) ?? '', photoPath: (j['photo'] as String?) ?? '', photoData: (j['photoData'] as String?) ?? '', validUntilOverride: validSaved == null ? null : DateTime.tryParse(validSaved));
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
          return Teaching(j['title'] as String, (j['speaker'] as String?) ?? '', (j['url'] as String?) ?? '', kind: (j['kind'] as String?) ?? 'enseignement', imagePath: (j['imagePath'] as String?) ?? '', imageUrl: (j['imageUrl'] as String?) ?? '');
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
  void updateLocalProfile({String? fonction, String? ministere}) {
    if (member == null) return;
    final m = member!;
    member = Member(m.name, m.matricule, m.etab, m.since, fonction: fonction ?? m.fonction, ministere: ministere ?? m.ministere, photoPath: m.photoPath, photoData: m.photoData, validUntilOverride: m.validUntilOverride);
    notifyListeners();
    _save();
  }

  void logout() {
    member = null;
    isAdmin = false;
    isAdminGeneral = false;
    notifyListeners();
    _save();
    // Déconnexion serveur aussi, sans bloquer l'interface.
    unawaited(api.logout());
  }

  PayRequest createRequest(String kind, int amount, {List<PurchaseItem> items = const <PurchaseItem>[], String? serverRef, String method = 'Wave', String currency = ''}) {
    final m = member!;
    // Référence serveur quand la demande a été créée côté serveur,
    // sinon référence locale provisoire, en attente de confirmation.
    final r = PayRequest(
        serverRef ??
            '${kind == 'don' ? 'DON' : kind == 'carte' ? 'CARTE' : kind == 'cotisation' ? 'COT' : 'ACH'}-${DateTime.now().millisecondsSinceEpoch}',
        kind,
        amount,
        items,
        m.name,
        m.matricule,
        DateTime.now(),
        method: method,
        currency: currency);
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

void go(BuildContext c, Widget page) => Navigator.of(c).push(MaterialPageRoute(builder: (_) => page));

void toast(BuildContext c, String m) =>
    ScaffoldMessenger.of(c).showSnackBar(SnackBar(content: Text(m)));

String orTbc(String s) => s.trim().isEmpty ? tr('À confirmer') : s.trim();

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
    {List<PurchaseItem> items = const <PurchaseItem>[], String? method}) async {
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
  final r = app.createRequest(kind, serverAmount, items: items, serverRef: serverRef, method: method, currency: paypalCurrency);
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
Widget cpMonogram() => headerLogo();

Widget basic(String title, List<Widget> children, {List<Widget>? actions, PreferredSizeWidget? bottom}) {
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
  return live((_) {
  final m = app.member;
  if (m != null) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Cp.navy,
        foregroundColor: Colors.white,
        titleSpacing: 8,
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
                child: cpMonogram(),
              ),
            ),
          ),
          const SizedBox(width: 8),
          Expanded(
            // En-tête web, 27 oct. 2026 : logo CP à gauche, titre
            // CONNEXION PROPHÉTIQUE en or, sous-titre = page en cours.
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
              Text('CONNEXION PROPHÉTIQUE',
                  maxLines: 1, overflow: TextOverflow.ellipsis, softWrap: false,
                  style: TextStyle(color: Color(0xFFD4A72C), fontSize: 11.5, fontWeight: FontWeight.w700, letterSpacing: 0.8)),
              Text(title, maxLines: 1, overflow: TextOverflow.ellipsis, softWrap: false, style: const TextStyle(color: Colors.white70, fontSize: 12)),
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
              icon: const Icon(Icons.language_outlined, color: Color(0xFFD4A72C), size: 16),
              label: Text(app.lang == 'fr' ? 'FR' : 'EN', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 12)),
            );
          }),
          Builder(builder: (ctx) {
            return IconButton(
              tooltip: tr('Mes achats'),
              padding: const EdgeInsets.all(14),
              iconSize: 20,
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
                      ? CircleAvatar(radius: 15, backgroundImage: memberPhotoProvider(m))
                      : const CircleAvatar(radius: 15, backgroundColor: Color(0xFFD4A72C), child: Icon(Icons.person_outlined, color: Color(0xFF0B1F3A), size: 18)),
                ),
              ),
            );
          }),
        ],
        bottom: bottom,
      ),
      body: SafeArea(child: ListView(padding: const EdgeInsets.all(Cp.s2), children: children)),
    );
  }
  return Scaffold(
    appBar: AppBar(
      titleSpacing: 8,
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
              child: cpMonogram(),
            ),
          ),
        ),
        const SizedBox(width: 8),
        Flexible(child: Text(title, overflow: TextOverflow.ellipsis, softWrap: false)),
      ]),
      actions: actions,
      bottom: bottom,
    ),
    body: SafeArea(child: ListView(padding: const EdgeInsets.all(Cp.s2), children: children)),
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
  const F(this.key, this.label, {this.lines = 1, this.number = false, this.optional = false, this.initial = ''});
  final String key, label, initial;
  final int lines;
  final bool number, optional;
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
Widget contentImage(String imagePath, String imageUrl, {double height = 160}) {
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

/// Variante de formSheet avec un champ image, 27 oct. 2026 : c'est
/// ce qui manquait dans l'espace structure. Le bouton ouvre la
/// galerie du téléphone (ImagePicker, déjà utilisé pour la photo de
/// profil), l'aperçu s'affiche dans le formulaire, et le chemin
/// choisi est rendu à onSubmit en plus des champs texte. L'image
/// reste facultative : un contenu sans image se publie comme avant.
/// Le téléversement serveur, lui, est fait par la fonction de
/// publication appelée ensuite, pas ici.
Future<void> imageFormSheet(BuildContext c, String title, List<F> fields, String cta,
    void Function(Map<String, String>, String imagePath) onSubmit, {String initialImagePath = ''}) {
  final ctrls = {for (final f in fields) f.key: TextEditingController(text: f.initial)};
  var imagePath = initialImagePath;
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
                  contentImage(imagePath, ''),
                  const SizedBox(height: Cp.s1),
                ],
                Row(children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () async {
                        final picked = await ImagePicker().pickImage(source: ImageSource.gallery);
                        if (picked != null) setS(() => imagePath = picked.path);
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
                      final values = {for (final f in fields) f.key: ctrls[f.key]!.text.trim()};
                      final missing = fields.where((f) => !f.optional && values[f.key]!.isEmpty);
                      if (missing.isNotEmpty) {
                        setS(() => err = 'Renseignez : ${missing.first.label}.');
                        return;
                      }
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
  String? livrePath;
  List<int>? livreBytes;
  var livreName = initialLivreName;
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
                  contentImage(imagePath, ''),
                  const SizedBox(height: Cp.s1),
                ],
                Row(children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () async {
                        final picked = await ImagePicker().pickImage(source: ImageSource.gallery);
                        if (picked != null) setS(() => imagePath = picked.path);
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
                      onPressed: () async {
                        final picked = await FilePicker.platform.pickFiles(
                          type: FileType.custom,
                          allowedExtensions: const ['pdf', 'epub'],
                          withData: true,
                        );
                        if (picked != null && picked.files.isNotEmpty) {
                          setS(() {
                            livrePath = picked.files.single.path;
                            livreBytes = picked.files.single.bytes;
                            livreName = picked.files.single.name;
                          });
                        }
                      },
                      icon: const Icon(Icons.upload_file_outlined),
                      label: Text(livreName.isEmpty ? tr('Importer le fichier du livre (PDF, EPUB)') : livreName),
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
    // Animation douce et courte, comme sur le web : le logo apparaît
    // en fondu avec un léger agrandissement, puis le trait or, puis
    // le texte « Former pour mieux servir ». Durée totale 1,4 s,
    // puis passage à l'accueil, comme avant (1,8 s au total).
    // Aucune animation tape-à-l'œil : fondu et échelle seulement.
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
      if (reduceMotion) {
        // Accessibilité « réduire les animations » : image finale
        // affichée d'emblée, sans animation, comme avant.
        _controller.value = 1;
      } else {
        _controller.forward();
      }
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

  void _goHome() {
    if (_navigated || !mounted) return;
    _navigated = true;
    final reduceMotion = MediaQuery.of(context).disableAnimations;
    Navigator.of(context).pushReplacement(PageRouteBuilder(
      transitionDuration: Duration(milliseconds: reduceMotion ? 0 : 400),
      pageBuilder: (_, __, ___) => const AppShell(),
      transitionsBuilder: (_, a, __, child) => FadeTransition(opacity: a, child: child),
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

class AppShell extends StatefulWidget {
  const AppShell({super.key});

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  int _index = 0;
  int _seenHomeRequest = 0;
  Timer? _syncTimer;

  @override
  void initState() {
    super.initState();
    _syncTimer = Timer.periodic(const Duration(seconds: 60), (_) {
      if (mounted && api.isConnected) unawaited(app.syncFromServer());
    });
  }

  @override
  void dispose() {
    _syncTimer?.cancel();
    super.dispose();
  }

  void _goTo(int i) {
    // Barre du bas, visiteur comme connecté, comme le modèle web,
    // avec la Librairie juste après Bible depuis le 28 oct. 2026 :
    // Accueil 0, Bible 1, Librairie 2, Carte 3, Communauté 4, Plus 5.
    setState(() => _index = i.clamp(0, 5));
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
        HomePage(onOpenCard: () => _goTo(3), onOpenBible: () => _goTo(1), onTab: _goTo),
        const BiblePage(),
        const LibrairiePage(),
        const CardPage(),
        const CommunityPage(),
        const MorePage(),
      ];
      final idx = _index.clamp(0, pages.length - 1);
      return Scaffold(
        body: IndexedStack(index: idx, children: pages),
        bottomNavigationBar: BottomNavWeb(index: idx, onTap: _goTo),
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
  const HomePage({super.key, required this.onOpenCard, required this.onOpenBible, required this.onTab});
  final VoidCallback onOpenCard;
  final VoidCallback onOpenBible;
  final ValueChanged<int> onTab;

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
  bool _speaking = false;
  HomeVerse? _verse;
  String _verseLang = '';

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
    _verse = null;
    WidgetsBinding.instance.addPostFrameCallback((_) => _loadVerse());
  }

  Future<void> _loadVerse() async {
    final lang = app.lang;
    final ref = await BibleService.instance.rotatingVerse(lang);
    if (!mounted || app.lang != lang) return;
    setState(() {
      _verseLang = lang;
      _verse = HomeVerse(
        text: ref.text,
        ref: BibleService.instance.label(lang, ref.book, ref.chapter, ref.verse),
        version: lang == 'fr' ? 'Louis Segond' : 'King James',
      );
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
    setState(() {
      if (_qIndex + 1 >= _game.length) {
        _quizFinished = true;
      } else {
        _qIndex++;
        _picked = null;
      }
    });
  }

  Future<void> _toggleVerseAudio() async {
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
      return HomeWeb(
        visitor: app.member == null,
        language: app.lang == 'fr' ? 'FR' : 'EN',
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
          onShare: _verse == null
              ? null
              : () => Share.share('« ${_verse!.text} » — ${_verse!.ref} (${_verse!.version})'),
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
          onScope: (i) => setState(() => _scope = i),
          onSeeAllEvents: () => go(c, const CampsPage()),
          onSendPrayer: () => go(c, const PrayerPage()),
          onTab: widget.onTab,
        ),
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

  Future<void> _pickPhoto() async {
    final picked = await ImagePicker().pickImage(source: ImageSource.gallery, maxWidth: 800, maxHeight: 800, imageQuality: 80);
    if (picked != null && mounted) setState(() => _photoPath = picked.path);
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
        return SizedBox(
          height: 420,
          child: Padding(
            padding: EdgeInsets.fromLTRB(Cp.s2, Cp.s2, Cp.s2, MediaQuery.of(ctx).viewInsets.bottom + Cp.s2),
            child: Column(children: [
              Text(tr('Choisir une fonction'), style: Theme.of(ctx).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
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
                            title: Text(f),
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
        await api.login(ident, password);
        moi = await api.fetchMoi();
      }
      await app.setServerMember(moi, fonction: _fonctionChoisie ?? '', photoPath: _photoPath);
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
        if (m.fonction.isNotEmpty) ...[const SizedBox(height: Cp.s1), Text(isEn ? 'Role: ${m.fonction}' : 'Fonction : ${m.fonction}', style: t.bodyMedium)],
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
          items: [for (final e in app.etabs) DropdownMenuItem(value: e.name, child: Text(etabDisplayName(e.name)))],
          onChanged: (v) => setState(() => _etab = v),
          decoration: _dec(tr('Établissement')),
        ),
        const SizedBox(height: Cp.s2),
        Card(
          child: ListTile(
            title: Text(_fonctionChoisie ?? tr('Choisir une fonction')),
            subtitle: _fonctionChoisie == null ? Text(tr('Touchez pour rechercher, puis choisir une seule fonction.')) : null,
            trailing: const Icon(Icons.keyboard_arrow_down),
            onTap: _pickFonction,
          ),
        ),
        const SizedBox(height: Cp.s2),
        Row(children: [
          if (_photoPath.isNotEmpty)
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

class CardPage extends StatefulWidget {
  const CardPage({super.key});

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
    final ok = await showDialog<bool>(
      context: c,
      builder: (ctx) => StatefulBuilder(builder: (ctx, setS) => AlertDialog(
        title: Text(tr('Modifier mes informations')),
        content: Column(mainAxisSize: MainAxisSize.min, children: [
          DropdownButtonFormField<String>(
            value: fonctionChoisie,
            items: [for (final f in fonctionItems) DropdownMenuItem(value: f, child: Text(f))],
            onChanged: (v) => setS(() => fonctionChoisie = v),
            decoration: const InputDecoration(labelText: 'Fonction'),
          ),
          const SizedBox(height: 8),
          TextField(controller: ministere, decoration: InputDecoration(labelText: tr('Ministère'))),
        ]),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Enregistrer'))),
        ],
      )),
    );
    if (ok == true) {
      final nouvelle = fonctionChoisie ?? '';
      app.updateLocalProfile(fonction: nouvelle, ministere: ministere.text.trim());
      if (nouvelle.isNotEmpty && nouvelle != m.fonction) {
        final saved = await api.updateFonction(nouvelle);
        if (c.mounted) {
          toast(c, saved
              ? tr('Informations mises à jour, fonction enregistrée : elle réapparaîtra à votre prochaine connexion.')
              : tr('Informations mises à jour sur cet appareil seulement : envoi au serveur impossible, la fonction ne suivra pas après déconnexion.'));
        }
      } else if (c.mounted) {
        toast(c, tr('Informations mises à jour.'));
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
        ]);
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
          ]);
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
        ]);
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
            style: t.titleLarge?.copyWith(fontSize: 32, fontWeight: FontWeight.w800, color: Cp.navy)),
        const SizedBox(height: 4),
        Text(isEn ? 'Show the QR code at the entrance of services, camps and retreats to validate your attendance.' : 'Présentez le QR code à l’entrée des cultes, camps et retraites pour valider votre présence.',
            style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 16)),
        const SizedBox(height: Cp.s2),
        Center(
          child: RepaintBoundary(
            key: _cardKey,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(24),
              child: Container(
                padding: const EdgeInsets.all(16),
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
                const WebAssetImage(asset: 'assets/logo.png', partUrls: kLogoParts, height: 44),
                const SizedBox(height: 12),
                Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Container(
                    width: 104,
                    height: 132,
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
                                  style: const TextStyle(color: Cp.navy, fontSize: 32, fontWeight: FontWeight.w700)),
                            ),
                          ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Text(isEn ? 'MEMBER NUMBER' : 'MEMBRE NUMÉRO',
                          style: TextStyle(color: Cp.gold, fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: 1)),
                      Text(m.matricule,
                          style: TextStyle(color: Cp.gold, fontSize: 22, fontWeight: FontWeight.w800)),
                      const SizedBox(height: 4),
                      Text(isEn ? 'FULL NAME' : 'NOM COMPLET',
                          style: TextStyle(color: Cp.gold, fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: 1)),
                      Text(m.name,
                          style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w700)),
                      const SizedBox(height: 4),
                      Text(isEn ? 'ROLE' : 'FONCTION',
                          style: TextStyle(color: Cp.gold, fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: 1)),
                      Text(m.fonction.isEmpty ? (isEn ? 'Member' : 'Membre') : m.fonction,
                          style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w700)),
                      if (m.ministere.isNotEmpty) ...[
                        const SizedBox(height: 4),
                        Text(m.ministere, style: const TextStyle(color: Colors.white70, fontSize: 14)),
                      ],
                      const SizedBox(height: 4),
                      Text(isEn ? 'ESTABLISHMENT' : 'ÉTABLISSEMENT',
                          style: TextStyle(color: Cp.gold, fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: 1)),
                      Text(m.etab,
                          style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w700)),
                    ]),
                  ),
                ]),
                const SizedBox(height: 12),
                Row(crossAxisAlignment: CrossAxisAlignment.end, children: [
                  Expanded(
                    child: Row(children: [
                      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text(isEn ? 'VALID UNTIL' : 'VALIDE JUSQU’AU',
                            style: TextStyle(color: Cp.gold, fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: 1)),
                        Text('${m.validUntil.month.toString().padLeft(2, '0')}/${m.validUntil.year}',
                            style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w800)),
                      ]),
                      Container(width: 2, height: 36, margin: const EdgeInsets.symmetric(horizontal: 10), color: Cp.gold),
                      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text(isEn ? 'DURATION' : 'DURÉE',
                            style: TextStyle(color: Cp.gold, fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: 1)),
                        Text(isEn ? '1 year' : '1 an',
                            style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w800)),
                      ]),
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
                        style: const TextStyle(color: Color(0xFF34D399), fontSize: 12, fontWeight: FontWeight.w700)),
                  ),
                  const SizedBox(width: 8),
                  Container(
                    width: 64,
                    height: 64,
                    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(8)),
                    child: QrImageView(data: m.matricule, size: 56, backgroundColor: Colors.white),
                  ),
                ]),
              ])]),
            ),
          ),
        ),
        ),
        const SizedBox(height: Cp.s2),
        // Carte de validité, modèle web : durée 1 an, mois restants
        // calculés depuis la date de validité, jamais inventés.
        Card(
          child: Padding(
            padding: const EdgeInsets.all(Cp.s2),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                Container(
                  width: 52,
                  height: 52,
                  decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(16)),
                  child: const Icon(Icons.calendar_today_outlined, color: Color(0xFFD4A72C), size: 24),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(isEn ? 'Card validity, duration: 1 year' : 'Validité de la carte, durée : 1 an',
                      style: t.titleMedium),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                  decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(20)),
                  child: Text(isEn ? '1 year' : '1 an',
                      style: const TextStyle(color: Color(0xFFD4A72C), fontSize: 16, fontWeight: FontWeight.w700)),
                ),
              ]),
              const SizedBox(height: Cp.s1),
              Text(
                isEn
                    ? 'Your member card is valid for 1 year (12 months), created in ${m.since.month.toString().padLeft(2, '0')}/${m.since.year}, valid until ${m.validUntil.month.toString().padLeft(2, '0')}/${m.validUntil.year}.'
                    : 'Votre carte de membre est valable 1 an (12 mois) : créée en ${m.since.month.toString().padLeft(2, '0')}/${m.since.year}, elle est valide jusqu’au ${m.validUntil.month.toString().padLeft(2, '0')}/${m.validUntil.year}.',
                style: t.bodyMedium),
              const SizedBox(height: Cp.s1),
              Text(
                isEn
                    ? 'There are ${((m.validUntil.year - DateTime.now().year) * 12 + (m.validUntil.month - DateTime.now().month)).clamp(0, 12)} months of validity left.'
                    : 'Il reste ${((m.validUntil.year - DateTime.now().year) * 12 + (m.validUntil.month - DateTime.now().month)).clamp(0, 12)} mois de validité.',
                style: t.bodyMedium),
            ]),
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
                  child: Text(isEn ? 'Reminder, monthly contribution' : 'Rappel, cotisation mensuelle', style: t.titleMedium),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                  decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(20)),
                  child: const Text('1000 FCFA / mois', style: TextStyle(color: Color(0xFFD4A72C), fontSize: 14, fontWeight: FontWeight.w700)),
                ),
              ]),
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
        // Boutons du prototype, dans l'ordre : Carte PNG / Carte JPG,
        // Ajouter au portefeuille / Changer ma photo, puis Modifier
        // mes informations et Déconnecter cet appareil.
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
        const SizedBox(height: Cp.s1),
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
        // Textes d'explication du prototype, adaptés à la réalité
        // Flutter pour le premier : téléchargement dans
        // Téléchargements puis partage, pas d'appui long en plein
        // écran, qui est le comportement web.
        Text(isEn ? 'How saving works: “Carte PNG / JPG” downloads the card image to Downloads. You can also share it to another app (WhatsApp, Files...), or open it from Downloads.' : 'Comment l’enregistrement fonctionne : « Carte PNG / JPG » télécharge l’image de la carte dans Téléchargements. Vous pouvez aussi l’envoyer vers une autre application (WhatsApp, Fichiers...), ou l’ouvrir depuis Téléchargements.', style: t.bodyMedium),
        const SizedBox(height: Cp.s1),
        Text(isEn ? 'Logging out only locks this device: your profile, card, registrations and contributions are kept, and you log back in from the opening screen with your phone number and member number.' : 'La déconnexion verrouille seulement cet appareil : votre profil, votre carte, vos inscriptions et vos contributions sont conservés, et vous vous reconnectez depuis l’écran d’ouverture avec votre numéro de téléphone et votre matricule.', style: t.bodyMedium),
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
                      height: 52,
                      child: OutlinedButton.icon(
                        onPressed: () => go(c, VerifyPaymentPage(request: app.requests.where((r) => r.kind == 'carte' && r.matricule == m.matricule && r.confirmed).first)),
                        icon: const Icon(Icons.verified_outlined),
                        label: Text(tr('Vérifier le reçu')),
                      ),
                    ),
                    const SizedBox(height: Cp.s1),
                    SizedBox(
                      width: double.infinity,
                      height: 52,
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
      ]);
    });
  }
}

// ═══════════════════════════════════════════════════════════════════
// 7. COMMUNAUTÉ ET PLUS
// ═══════════════════════════════════════════════════════════════════
class CommunityPage extends StatelessWidget {
  const CommunityPage({super.key});

  @override
  Widget build(BuildContext context) {
    return basic(tr('Communauté'), [
      navCard([
        NavTile(icon: Icons.change_history_outlined, label: tr('Camps et retraites'), sub: tr('Inscription et pass numérique.'), onTap: () => go(context, const CampsPage())),
        NavTile(icon: Icons.apartment_outlined, label: tr('Établissements'), sub: tr('Activités et actualités de chaque établissement.'), onTap: () => go(context, const EtabsPage())),
        NavTile(icon: Icons.chat_bubble_outline, label: tr('Actualités'), sub: tr('Les nouvelles de la structure.'), onTap: () => go(context, const NewsPage())),
        NavTile(icon: Icons.people_outlined, label: tr('Bureau'), sub: tr('Les responsables de la structure.'), onTap: () => go(context, const BureauPage())),
      ]),
    ]);
  }
}

class MorePage extends StatelessWidget {
  const MorePage({super.key});

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
            tile(Icons.whatshot_outlined, tr('Mon épanouissement'), tr('Plan de lecture de 21 jours, journal privé et minuteur de prière.'), () => go(c, const EpanouissementPage())),
            tile(Icons.book_outlined, tr('Journal personnel'), tr('Vos notes personnelles, prières, gratitudes et objectifs, pour vous seul.'), () => go(c, const JournalPage())),
            const Divider(height: 1, color: Cp.line),
            if (app.isAdmin) tile(Icons.shield_outlined, tr('Espace structure'), tr('Paiements à valider et publications de la structure.'), () => _admin(c)),
            const Divider(height: 1, color: Cp.line),
            tile(Icons.info_outlined, tr('À propos & Aide'), tr('Ce que fait l’application, les données gardées, les paiements et l’aide par module.'), () => go(c, const AboutPage())),
          ]),
        ),
      ]);
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
          onPressed: () => openUrl(context, 'https://connexion-prophetique-site.onrender.com/privacy.html'),
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
class BiblePage extends StatefulWidget {
  const BiblePage({super.key, this.initialBook, this.initialChapter});
  final int? initialBook;
  final int? initialChapter;

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
  // Audio du chapitre, synthèse vocale de l'appareil seulement, jamais
  // clonée, comme pour le verset du jour. Voir _toggleChapterAudio.
  bool _speakingChapter = false;
  // Onglet Bible du modèle web : Lire, Rechercher, Favoris, Enseignements.
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
    super.dispose();
  }

  void _stopChapterAudio() {
    if (_speakingChapter || _speakingFrom != null) {
      setState(() {
        _speakingChapter = false;
        _speakingFrom = null;
      });
    }
    verseTts.stop();
  }

  Future<void> _toggleChapterAudio(List<String> verses, {int from = 0}) async {
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

  // Sélecteurs Livre et Chapitre du modèle web, en haut de
  // l'onglet Lire. Changer de livre réinitialise le chapitre et
  // arrête la lecture ; changer de chapitre arrête aussi la lecture.
  List<Widget> _bookSelectors(List<BibleBook> books) {
    final chapterCount = _book == null ? 0 : books[_book!].chapters.length;
    return [
      Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Expanded(
          child: DropdownButtonFormField<int>(
            value: _book,
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
            ),
          ),
        ),
        const SizedBox(width: Cp.s1),
        SizedBox(
          width: 132,
          child: DropdownButtonFormField<int>(
            value: _chapter,
            hint: Text(tr('Chapitre')),
            items: [for (var c = 1; c <= chapterCount; c++) DropdownMenuItem(value: c, child: Text(isEn ? 'Chapter $c' : 'Chapitre $c'))],
            onChanged: _book == null
                ? null
                : (v) {
                    _stopChapterAudio();
                    setState(() => _chapter = v);
                  },
            decoration: InputDecoration(
              labelText: tr('Chapitre'),
              filled: true,
              fillColor: Cp.card,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
            ),
          ),
        ),
      ]),
      const SizedBox(height: Cp.s2),
    ];
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final svc = BibleService.instance;
    final books = svc.books(app.lang);
    final children = <Widget>[
      SegmentedButton<String>(
        segments: const [
          ButtonSegment(value: 'fr', label: Text('Louis Segond')),
          ButtonSegment(value: 'en', label: Text('King James')),
        ],
        selected: {app.lang},
        onSelectionChanged: (s) => _setLang(s.first),
      ),
      const SizedBox(height: Cp.s1),
      Card(
        child: SwitchListTile(
          title: Text(isEn ? 'Daily verse notification, every morning at 7 a.m.' : 'Verset du jour en notification, chaque matin à 7 h'),
          subtitle: Text(isEn ? 'Like other Bible apps: the text of the day, with its reference. The next 7 mornings are scheduled on each opening.' : 'Comme les autres applications de Bible : le texte du jour, avec sa référence. Les 7 prochains matins sont programmés à chaque ouverture.', style: t.bodyMedium),
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
            if (mounted) {
              setState(() {});
              if (!ok) {
                toast(context, isEn ? 'Daily verse could not be scheduled. Open the Bible again and try.' : 'Verset du jour non programmé. Rouvrez la Bible et réessayez.');
              }
            }
          },
        ),
      ),
      const SizedBox(height: Cp.s2),
      // Onglets du modèle web : Lire, Rechercher, Favoris, Enseignements.
      // Ils remplacent l'ancienne page Bible à simple liste de livres.
      Wrap(spacing: Cp.s1, runSpacing: Cp.s1, children: [
        for (final tab in const ['lire', 'rechercher', 'dictionnaire', 'favoris', 'enseignements'])
          ChoiceChip(
            label: Text(tab == 'lire' ? tr('Lire') : tab == 'rechercher' ? tr('Rechercher') : tab == 'dictionnaire' ? tr('Dictionnaire') : tab == 'favoris' ? tr('Favoris') : tr('Enseignements')),
            selected: _tab == tab,
            onSelected: (_) {
              _stopChapterAudio();
              setState(() => _tab = tab);
            },
            labelStyle: TextStyle(fontWeight: FontWeight.w700, color: _tab == tab ? Cp.navy : Cp.ink),
            selectedColor: Cp.gold,
            backgroundColor: Cp.card,
            side: const BorderSide(color: Cp.line),
          ),
      ]),
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
          prefixIcon: const Icon(Icons.search_outlined),
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
          prefixIcon: const Icon(Icons.search_outlined),
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
    } else if (_tab == 'enseignements') {
      children.add(Text(tr('Enseignements et musiques publiés par la structure.'), style: t.bodyMedium));
      children.add(const SizedBox(height: Cp.s2));
      if (app.teachings.isEmpty) {
        children.add(EmptyNote(icon: Icons.headphones_outlined, text: tr('Aucun enseignement pour le moment. La structure les ajoute depuis son espace.')));
      } else {
        for (final x in app.teachings) {
          children.add(Card(
            child: ListTile(
              leading: const Icon(Icons.headphones_outlined),
              title: Text(x.title),
              subtitle: Text(x.speaker),
              trailing: const Icon(Icons.chevron_right_outlined),
              onTap: () => go(context, const TeachingsPage()),
            ),
          ));
        }
      }
      children.add(const SizedBox(height: Cp.s2));
      children.add(SizedBox(
        width: double.infinity,
        height: 52,
        child: OutlinedButton.icon(
          onPressed: () => go(context, const TeachingsPage()),
          icon: const Icon(Icons.headphones_outlined),
          label: Text(tr('Ouvrir les enseignements')),
        ),
      ));
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
      children.add(Text('$bookName $_chapter', style: t.titleLarge));
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
        children.add(Card(
          child: ListTile(
            leading: Text('${i + 1}', style: const TextStyle(fontWeight: FontWeight.w700, color: Cp.goldDeep)),
            title: Text(verses[i],
                style: hl ? const TextStyle(decoration: TextDecoration.underline, decorationColor: Cp.gold, decorationThickness: 2) : null),
            trailing: Row(mainAxisSize: MainAxisSize.min, children: [
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
            onTap: () => _markRead(ref),
          ),
        ));
      }
    } else if (_book != null) {
      final book = books[_book!];
      children.addAll(_bookSelectors(books));
      children.add(TextButton.icon(
        onPressed: _backToBooks,
        icon: const Icon(Icons.chevron_left_outlined),
        label: Text(tr('Tous les livres')),
      ));
      children.add(Text(book.name, style: t.titleLarge));
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
                style: OutlinedButton.styleFrom(padding: EdgeInsets.zero, minimumSize: Size.zero, tapTargetSize: MaterialTapTargetSize.shrinkWrap),
                onPressed: () => _openChapter(_book!, c),
                child: Text('$c', softWrap: false),
              ),
            ),
        ],
      ));
    } else {
      children.addAll(_bookSelectors(books));
      children.add(VerseCard(lang: app.lang));
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
        children.add(Text(tr('Ancien Testament'), style: t.titleMedium));
        for (var i = 0; i < 39 && i < books.length; i++) {
          children.add(Card(
            child: ListTile(
              title: Text(books[i].name),
              subtitle: Text(isEn ? '${books[i].chapters.length} chapters' : '${books[i].chapters.length} chapitres'),
              trailing: const Icon(Icons.chevron_right_outlined),
              onTap: () => setState(() => _book = i),
            ),
          ));
        }
        children.add(const SizedBox(height: Cp.s2));
        children.add(Text(tr('Nouveau Testament'), style: t.titleMedium));
        for (var i = 39; i < books.length; i++) {
          children.add(Card(
            child: ListTile(
              title: Text(books[i].name),
              subtitle: Text(isEn ? '${books[i].chapters.length} chapters' : '${books[i].chapters.length} chapitres'),
              trailing: const Icon(Icons.chevron_right_outlined),
              onTap: () => setState(() => _book = i),
            ),
          ));
        }
      }
    }

    children.add(const SizedBox(height: Cp.s2));
    children.add(SizedBox(
      height: 52,
      child: OutlinedButton.icon(
        onPressed: () => go(context, const QuizPage()),
        icon: const Icon(Icons.quiz_outlined),
        label: Text(tr('Jouer au Quiz Bible'), style: TextStyle(fontWeight: FontWeight.w700)),
        style: OutlinedButton.styleFrom(
          foregroundColor: Cp.navy,
          side: const BorderSide(color: Cp.navy, width: 1.5),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
        ),
      ),
    ));
    return basic(tr('Bible'), children);
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
      });

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
        const SizedBox(height: Cp.s3),
        SizedBox(height: 56, child: FilledButton(onPressed: _restart, child: Text(tr('Rejouer')))),
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
            onPressed: () => setState(() {
              _i++;
              _picked = null;
            }),
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

class TeachingsPage extends StatelessWidget {
  const TeachingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return live((c) => basic(tr('Enseignements'), [
          if (app.teachings.isEmpty)
            EmptyNote(
              icon: Icons.headphones_outlined,
              text: tr('Aucun enseignement publié pour le moment. La structure les ajoute depuis son espace.'),
            )
          else
            navCard([
              for (final x in app.teachings)
                NavTile(
                  icon: x.kind == 'musique' ? Icons.music_note_outlined : Icons.play_circle_outline,
                  label: x.title,
                  sub: x.speaker.isEmpty
                      ? (x.kind == 'musique' ? 'Musique · Écouter' : tr('Écouter'))
                      : (x.kind == 'musique' ? 'Musique · ${x.speaker}' : x.speaker),
                  onTap: () => x.url.isEmpty
                      ? toast(c, tr('Audio non fourni par la structure.'))
                      : go(c, AudioPlayerPage(teaching: x)),
                ),
            ]),
        ]));
  }
}

// Lecteur audio intégré d'un enseignement : lecture, pause, reprise,
// avance et retour de 10 secondes, barre de progression, durée.
// Le fichier vient de la structure (serveur) ; il n'est jamais inventé.
class AudioPlayerPage extends StatefulWidget {
  const AudioPlayerPage({super.key, required this.teaching});
  final Teaching teaching;

  @override
  State<AudioPlayerPage> createState() => _AudioPlayerPageState();
}

class _AudioPlayerPageState extends State<AudioPlayerPage> {
  final _player = AudioPlayer();
  String? _error;

  @override
  void initState() {
    super.initState();
    _init();
  }

  Future<void> _init() async {
    try {
      await _player.setUrl(widget.teaching.url);
      await _player.play();
    } catch (_) {
      if (mounted) setState(() => _error = tr('Impossible de lire cet audio. Vérifiez votre connexion, puis réessayez.'));
    }
  }

  @override
  void dispose() {
    _player.dispose();
    super.dispose();
  }

  String _fmt(Duration? d) {
    if (d == null) return '0:00';
    final m = d.inMinutes;
    final sec = d.inSeconds % 60;
    return '$m:${sec.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(widget.teaching.title, [
      if (hasContentImage(widget.teaching.imagePath, widget.teaching.imageUrl)) ...[contentImage(widget.teaching.imagePath, widget.teaching.imageUrl), const SizedBox(height: Cp.s2)],
      if (widget.teaching.speaker.isNotEmpty) Text(widget.teaching.speaker, style: t.bodyMedium),
      const SizedBox(height: Cp.s3),
      if (_error != null)
        EmptyNote(icon: Icons.error_outline, text: _error!)
      else ...[
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
                  Slider(
                    value: total == null ? 0 : value,
                    max: max,
                    onChanged: total == null ? null : (v) => _player.seek(Duration(milliseconds: v.round())),
                  ),
                  Row(children: [
                    Text(_fmt(pos), style: t.bodyMedium),
                    const Spacer(),
                    Text(_fmt(total), style: t.bodyMedium),
                  ]),
                ]);
              },
            );
          },
        ),
        const SizedBox(height: Cp.s2),
        Row(mainAxisAlignment: MainAxisAlignment.center, children: [
          IconButton(
            tooltip: tr('Reculer de 10 secondes'),
            iconSize: 32,
            icon: const Icon(Icons.replay_10_outlined),
            onPressed: () async {
              final pos = await _player.position;
              await _player.seek(pos - const Duration(seconds: 10));
            },
          ),
          const SizedBox(width: Cp.s2),
          StreamBuilder<PlayerState>(
            stream: _player.playerStateStream,
            builder: (c, snap) {
              final playing = snap.data?.playing ?? false;
              return FilledButton.icon(
                onPressed: playing ? _player.pause : _player.play,
                icon: Icon(playing ? Icons.pause_outlined : Icons.play_arrow_outlined),
                label: Text(playing ? tr('Pause') : tr('Lecture')),
              );
            },
          ),
          const SizedBox(width: Cp.s2),
          IconButton(
            tooltip: tr('Avancer de 10 secondes'),
            iconSize: 32,
            icon: const Icon(Icons.forward_10_outlined),
            onPressed: () async {
              final pos = await _player.position;
              await _player.seek(pos + const Duration(seconds: 10));
            },
          ),
        ]),
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

class _CampsPageState extends State<CampsPage> {
  String _filter = 'Tous';

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

  // Inscription, modèle web, 27 oct. 2026 : le formulaire demande
  // les détails affichés sur le pass (participants, hébergement,
  // repas, transport), tous facultatifs sauf le nombre, jamais
  // pré-remplis avec les exemples du prototype.
  Future<void> _register(BuildContext c, Camp camp) async {
    if (!requireMember(c)) return;
    final participantsCtrl = TextEditingController(text: '1');
    final hebergementCtrl = TextEditingController();
    final repasCtrl = TextEditingController();
    final transportCtrl = TextEditingController();
    final ok = await showDialog<bool>(
      context: c,
      builder: (ctx) => AlertDialog(
        title: Text(camp.name),
        content: Column(mainAxisSize: MainAxisSize.min, children: [
          TextField(controller: participantsCtrl, keyboardType: TextInputType.number, decoration: InputDecoration(labelText: tr('Participants'))),
          const SizedBox(height: 8),
          TextField(controller: hebergementCtrl, decoration: InputDecoration(labelText: tr('Hébergement'))),
          const SizedBox(height: 8),
          TextField(controller: repasCtrl, decoration: InputDecoration(labelText: tr('Repas'))),
          const SizedBox(height: 8),
          TextField(controller: transportCtrl, decoration: InputDecoration(labelText: tr('Transport'))),
        ]),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('S’inscrire'))),
        ],
      ),
    );
    if (ok != true || !c.mounted) return;
    final participants = int.tryParse(participantsCtrl.text.trim()) ?? 1;
    final hebergement = hebergementCtrl.text.trim();
    final repas = repasCtrl.text.trim();
    final transport = transportCtrl.text.trim();
    if (camp.serverId.isNotEmpty && api.isConnected) {
      try {
        final created = await api.registerForEvent(camp.serverId);
        final code = (created['code_pass'] ?? '').toString();
        final reg = Registration(camp, app.member!, DateTime.now(), codePass: code, participants: participants < 1 ? 1 : participants, hebergement: hebergement, repas: repas, transport: transport);
        app.registrations.add(reg);
        app.changed();
        if (c.mounted) go(c, PassPage(registration: reg));
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
        onTap: () {
          final reg = _reg(camp);
          if (reg != null) {
            go(context, PassPage(registration: reg));
          } else {
            _register(context, camp);
          }
        },
        child: Stack(children: [
          if (hasContentImage(camp.imagePath, camp.imageUrl))
            contentImage(camp.imagePath, camp.imageUrl, height: 280)
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
          action: app.isAdmin
              ? goldButton(
                  icon: Icons.add,
                  label: tr('Événement'),
                  onPressed: () => go(c, const AdminPage()),
                )
              : null,
        ),
        const SizedBox(height: Cp.s2),
        filterChips(kEtabFilters, _filter, (v) => setState(() => _filter = v)),
        const SizedBox(height: Cp.s2),
        if (filtered.isEmpty)
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
            if (camp.kairos) ...[
              Text(tr('Badge automatique à l’inscription.'), style: t.bodyMedium),
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
            PassCardView(registration: reg),
            const SizedBox(height: Cp.s2),
          ],
      ]);
    });
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

class PassCardView extends StatefulWidget {
  const PassCardView({super.key, required this.registration});
  final Registration registration;

  @override
  State<PassCardView> createState() => _PassCardViewState();
}

class _PassCardViewState extends State<PassCardView> {
  final _passKey = GlobalKey();
  bool _downloading = false;

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
        child: Container(
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
              label: Text(_downloading ? tr('Préparation…') : tr('Pass PNG')),
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
              label: Text(_downloading ? tr('Préparation…') : tr('Pass JPG')),
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
        if (app.isAdmin)
          Align(
            alignment: Alignment.centerLeft,
            child: goldButton(
              icon: Icons.add,
              label: tr('Établissement'),
              onPressed: () => go(c, const AdminPage()),
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
          const SizedBox(height: Cp.s1),
          Text(item.text, style: t.bodyMedium?.copyWith(color: Cp.ink)),
        ]),
      ),
    );
  }
}

class NewsPage extends StatelessWidget {
  const NewsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return live((c) => basic(tr('Actualités'), [
          if (app.news.isEmpty)
            EmptyNote(icon: Icons.chat_bubble_outline, text: tr('Aucune actualité pour le moment.'))
          else
            for (final n in app.news) ...[NewsCard(item: n), const SizedBox(height: Cp.s1)],
        ]));
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
  const LibrairiePage({super.key});

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      return basic(
        tr('Librairie'),
        [
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
              Text(r.kind == 'don' ? tr('Contribution (don)') : r.kind == 'cotisation' ? tr('Cotisation mensuelle') : r.kind == 'carte' ? tr('Création de carte de membre (paiement unique)') : tr('Paiement'), style: t.labelLarge)
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
                  title: Text('${r.kind == 'don' ? tr('Don') : r.kind == 'cotisation' ? tr('Cotisation mensuelle') : r.kind == 'carte' ? tr('Carte') : tr('Achat')} · ${fcfa(r.amount)}', style: t.labelLarge),
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
        const SizedBox(height: Cp.s2),
        // Wave Business, montant figé, modèle web. La clé API ne
        // s’entre jamais dans l’application : elle se saisit dans
        // Render, côté serveur, jamais en clair en chat.
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
        const SizedBox(height: Cp.s2),
        // Scan des reçus Wave, modèle web : le destinataire attendu
        // est enregistré localement, pour le scan quand il sera livré.
        // Le scan lui-même n’est pas livré dans cette version.
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
        const SizedBox(height: Cp.s2),
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
        Text('$done / 21', style: t.titleMedium),
        const SizedBox(height: Cp.s1),
        LinearProgressIndicator(
          value: done / 21,
          color: Cp.gold,
          backgroundColor: Cp.line,
          minHeight: 8,
          borderRadius: BorderRadius.circular(4),
        ),
        const SizedBox(height: Cp.s2),
        Card(
          child: Column(children: [
            for (var i = 0; i < _planDays.length; i++) ...[
              if (i > 0) const Divider(height: 1),
              Builder(builder: (ctx) {
                final day = i + 1;
                final isDone = app.planDone.contains(day);
                final ref = _planDays[i];
                return ListTile(
                  title: Text('JOUR $day', style: t.labelLarge),
                  subtitle: Text(ref.$3, style: t.bodyMedium),
                  onTap: () => go(ctx, BiblePage(initialBook: ref.$1, initialChapter: ref.$2)),
                  trailing: isDone
                      ? OutlinedButton(
                          onPressed: () {
                            app.planDone.remove(day);
                            app.changed();
                          },
                          child: Text(isEn ? 'Read' : 'Lu'),
                        )
                      : FilledButton(
                          onPressed: () {
                            app.planDone.add(day);
                            app.changed();
                          },
                          child: Text(tr('Marquer lu')),
                        ),
                );
              }),
            ],
          ]),
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
    backgroundColor: Cp.paper,
    shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(Cp.radiusCard))),
    builder: (ctx) => SafeArea(
      child: ListView(shrinkWrap: true, padding: const EdgeInsets.all(Cp.s2), children: [
        Text(title, style: Theme.of(ctx).textTheme.titleLarge),
        const SizedBox(height: Cp.s1),
        for (final it in items)
          ListTile(title: Text(label(it), style: Theme.of(ctx).textTheme.labelLarge), onTap: () => Navigator.pop(ctx, it)),
      ]),
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
    void Function(Map<String, String>, String imagePath, String? audioPath, List<int>? audioBytes, String? audioName) onSubmit) {
  final ctrls = {for (final f in fields) f.key: TextEditingController(text: f.initial)};
  var imagePath = '';
  String? audioPath;
  List<int>? audioBytes;
  var audioName = '';
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
                Row(children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () async {
                        final picked = await FilePicker.platform.pickFiles(
                          type: FileType.custom,
                          allowedExtensions: const ['mp3', 'm4a', 'aac', 'ogg', 'wav'],
                          withData: true,
                        );
                        if (picked != null && picked.files.isNotEmpty) {
                          setS(() {
                            audioPath = picked.files.single.path;
                            audioBytes = picked.files.single.bytes;
                            audioName = picked.files.single.name;
                          });
                        }
                      },
                      icon: const Icon(Icons.upload_file_outlined),
                      label: Text(audioName.isEmpty ? tr('Importer le fichier audio (MP3, M4A, WAV…)') : audioName),
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
                Text(tr('Fichier audio, 100 Mo max côté serveur. Sans fichier importé, seul un lien externe reste écoutable sur cet appareil, le serveur ne le garde pas.'), style: Theme.of(ctx).textTheme.bodyMedium),
                const SizedBox(height: Cp.s1),
                if (imagePath.isNotEmpty) ...[
                  contentImage(imagePath, ''),
                  const SizedBox(height: Cp.s1),
                ],
                Row(children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () async {
                        final picked = await ImagePicker().pickImage(source: ImageSource.gallery);
                        if (picked != null) setS(() => imagePath = picked.path);
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
                      final values = {for (final f in fields) f.key: ctrls[f.key]!.text.trim()};
                      final missing = fields.where((f) => !f.optional && values[f.key]!.isEmpty);
                      if (missing.isNotEmpty) {
                        setS(() => err = 'Renseignez : ${missing.first.label}.');
                        return;
                      }
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

Future<void> _publishTeaching(BuildContext c, Teaching teaching, {String? audioPath, List<int>? audioBytes, String? audioName}) async {
  if (!api.isConnected) {
    toast(c, tr('Ajouté en local sur cet appareil. Connectez-vous au serveur pour le publier pour tous les membres.'));
    return;
  }
  if (teaching.audioId.isEmpty && (audioPath != null || audioBytes != null)) {
    try {
      teaching.audioId = await api.uploadAudio(path: audioPath, bytes: audioBytes, filename: audioName);
    } catch (e) {
      toast(c, 'Fichier audio non téléversé ($e). L’enseignement est publié sans audio pour les autres membres.');
    }
  }
  try {
    await api.createEnseignement(titre: teaching.title, orateur: teaching.speaker, audioId: teaching.audioId.isEmpty ? null : teaching.audioId);
    if (teaching.audioId.isNotEmpty) {
      teaching.url = '$kApiBaseUrl/fichiers/${teaching.audioId}';
      app.changed();
      toast(c, tr('Publié sur le serveur, avec son audio : écoutable pour les membres connectés avec internet.'));
    } else if (teaching.url.isNotEmpty) {
      toast(c, tr('Publié sur le serveur, sans audio pour les autres membres : le lien audio reste écoutable sur cet appareil seulement. Importez le fichier audio pour qu’il suive sur le serveur.'));
    } else {
      toast(c, tr('Publié sur le serveur, sans audio. Importez le fichier audio pour qu’il soit écoutable.'));
    }
  } catch (e) {
    toast(c, 'Serveur refusé ($e). Rôle administrateur général requis. Ajout conservé en local sur cet appareil.');
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
    final created = await api.createEvenement(
      nom: camp.name,
      lieu: camp.place.isEmpty ? null : camp.place,
      tarifFcfa: tarif,
      estKairos: camp.kairos,
      imageId: fileIdFromUrl(camp.imageUrl),
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
Future<void> _updateCampServer(BuildContext c, Camp camp) async {
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
    );
    toast(c, tr('Modification publiée sur le serveur : visible pour les membres connectés avec internet.'));
  } catch (e) {
    toast(c, 'Modification conservée en local sur cet appareil seulement. Publication serveur refusée ($e). La route /admin/evenements est réservée au compte administrateur général.');
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
    );
    toast(c, tr('Actualité publiée sur le serveur : visible dans les actualités des membres connectés avec internet.'));
  } catch (e) {
    toast(c, 'Actualité conservée en local sur cet appareil seulement. Publication serveur refusée ($e). La route /admin/actualites est réservée aux comptes administrateurs.');
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
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Valider ce paiement ?')),
        content: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(isEn ? 'Only confirm after checking your Wave account: ${fcfa(amount)} received for reference $ref.' : 'Validez seulement après avoir contrôlé votre compte Wave : ${fcfa(amount)} reçus pour la référence $ref.'),
          const SizedBox(height: Cp.s1),
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
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Valider'))),
        ],
      ),
    );
    final waveId = waveCtrl.text.trim();
    waveCtrl.dispose();
    if (ok != true || !mounted) return;
    try {
      await api.validateAdminPayment(id, waveTransactionId: waveId.length >= 6 ? waveId : null);
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
        tr('Quand un membre clique sur Payer, sa demande apparaît ici en attente de validation. Validez seulement après avoir contrôlé votre compte Wave, puis l’application du membre se met à jour au prochain chargement, avec la facture si le paiement est confirmé.'),
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
                subtitle: Text('${_payments[i]['nom_complet'] ?? ''} · ${_payments[i]['matricule'] ?? ''} · ${_payments[i]['reference'] ?? ''} · ${dateFr(DateTime.tryParse((_payments[i]['cree_le'] ?? '').toString()) ?? DateTime.now())}${((_payments[i]['wave_transaction_id'] ?? '').toString().isNotEmpty) ? ' · Wave ${_payments[i]['wave_transaction_id']}' : ''}', style: t.bodyMedium),
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
// l'administrateur général retrouve tous les achats en ligne de ce
// membre, dons, achats de livres, carte et cotisations, avec leur
// statut, et il valide ou refuse un paiement en attente, seulement
// après contrôle de son compte Wave, comme dans la liste complète.
// Réservé à l'administrateur général, comme la route serveur.
// Si la caméra est indisponible, sur le web par exemple, le
// matricule se saisit à la main, avec le même résultat.
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
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Valider ce paiement ?')),
        content: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(isEn ? 'Only confirm after checking your Wave account: ${fcfa(amount)} received for reference $ref.' : 'Validez seulement après avoir contrôlé votre compte Wave : ${fcfa(amount)} reçus pour la référence $ref.'),
          const SizedBox(height: Cp.s1),
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
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Valider'))),
        ],
      ),
    );
    final waveId = waveCtrl.text.trim();
    waveCtrl.dispose();
    if (ok != true || !mounted || _matricule == null) return;
    try {
      await api.validateAdminPayment(id, waveTransactionId: waveId.length >= 6 ? waveId : null);
      if (!mounted) return;
      toast(context, tr('Paiement validé côté serveur, facture générée.'));
      await _load(_matricule!);
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
    final children = <Widget>[
      Text(isEn ? 'Point the camera at a member card QR code. The code holds only the member number, and the server then shows that member’s purchases.' : 'Pointez la caméra vers le QR code de la carte d’un membre. Le code ne contient que le matricule, et le serveur affiche ensuite les achats de ce membre.', style: t.bodyMedium),
      const SizedBox(height: Cp.s1),
    ];
    if (_matricule == null) {
      if (_cameraError == null) {
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
        children.add(Text(tr('Caméra indisponible, saisissez le matricule ci-dessous.'), style: t.bodyMedium));
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
            child: Text(tr('Scanner une autre carte')),
          ),
        ]),
        const SizedBox(height: Cp.s1),
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
                  subtitle: Text('${_payments[i]['reference'] ?? ''} · ${dateFr(DateTime.tryParse((_payments[i]['cree_le'] ?? '').toString()) ?? DateTime.now())}${((_payments[i]['wave_transaction_id'] ?? '').toString().isNotEmpty) ? ' · Wave ${_payments[i]['wave_transaction_id']}' : ''}', style: t.bodyMedium),
                  trailing: (_payments[i]['statut'] ?? '').toString() == 'en_attente'
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
    return basic(tr('Scanner une carte'), children);
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
        if (general)
          FilledButton.icon(
            onPressed: () => go(c, const ScanCardPage()),
          icon: const Icon(Icons.qr_code_scanner_outlined),
          label: Text(tr('Scanner une carte')),
          style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
        ),
        if (general)
          Text(isEn ? 'Scan a member card QR code to see that member’s purchases and validate a pending payment, after checking your Wave account.' : 'Scannez le QR code de la carte d’un membre pour voir ses achats et valider un paiement en attente, après contrôle de votre compte Wave.', style: t.bodyMedium),
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
                  title: Text('${r.kind == 'don' ? 'Don' : r.kind == 'carte' ? tr('Carte') : r.kind == 'cotisation' ? 'Cotisation' : 'Achat'} · ${fcfa(r.amount)}', style: t.labelLarge),
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
        heading(c, tr('Publier et gérer')),
        navCard([
          if (general)
          NavTile(
            icon: Icons.auto_stories_outlined,
            label: tr('Ajouter un livre'),
            sub: tr('Titre, auteur, description, prix, format, fichier. Publié sur le serveur si possible, sinon conservé en local.'),
            onTap: () => bookFormSheet(c, tr('Nouveau livre'), [
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
          if (general)
          NavTile(
            icon: Icons.edit_outlined,
            label: tr('Modifier un livre'),
            sub: tr('Sans doublon. Les achats déjà payés ne changent pas.'),
            onTap: () async {
              if (app.books.isEmpty) {
                toast(c, tr('Le catalogue est vide.'));
                return;
              }
              final b = await pick<Book>(c, tr('Quel livre ?'), app.books, (b) => b.title);
              if (b == null || !c.mounted) return;
              bookFormSheet(c, tr('Modifier le livre'), [
                F('title', tr('Titre'), initial: b.title),
                F('author', tr('Auteur'), initial: b.author),
                F('desc', tr('Description'), lines: 3, optional: true, initial: b.description),
                F('price', tr('Prix (FCFA)'), number: true, initial: b.price.toString()),
                F('format', tr('Format'), optional: true, initial: b.format),
                F('url', tr('Lien du fichier'), optional: true, initial: b.fileUrl),
              ], tr('Enregistrer'), (v, imagePath, livrePath, livreBytes, livreName) {
                final p = _price(c, v['price']!);
                if (p == null) return;
                // Nouvelle image seulement : sinon l'ancienne URL serveur est gardée.
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
              }, initialImagePath: b.imagePath);
            },
          ),
          if (general)
          NavTile(
            icon: Icons.change_history_outlined,
            label: tr('Ajouter un camp'),
            sub: tr('Dates, lieu et tarif restent « À confirmer » si vides.'),
            onTap: () => imageFormSheet(c, tr('Nouveau camp'), [
              F('name', tr('Nom du camp')),
              F('dates', tr('Dates'), optional: true),
              F('place', tr('Lieu'), optional: true),
              F('tariff', tr('Tarif'), optional: true),
              F('kairos', tr('Camp National Kairos ? (oui / non)'), optional: true),
            ], tr('Publier'), (v, imagePath) {
              final camp = Camp(id: app.nextId(), name: v['name']!, dates: v['dates']!, place: v['place']!,
                  tariff: v['tariff']!, kairos: v['kairos']!.toLowerCase() == 'oui', imagePath: imagePath);
              app.camps.add(camp);
              app.changed();
              _publishCamp(c, camp);
            }),
          ),
          if (general)
          NavTile(
            icon: Icons.edit_outlined,
            label: tr('Modifier un camp'),
            sub: tr('Nom, lieu, tarif, badge Kairos et image. Les inscriptions déjà faites ne changent pas.'),
            onTap: () async {
              if (app.camps.isEmpty) {
                toast(c, tr('Aucun camp pour le moment.'));
                return;
              }
              final camp = await pick<Camp>(c, tr('Quel camp ?'), app.camps, (x) => x.name);
              if (camp == null || !c.mounted) return;
              imageFormSheet(c, tr('Modifier le camp'), [
                F('name', tr('Nom du camp'), initial: camp.name),
                F('dates', tr('Dates'), optional: true, initial: camp.dates),
                F('place', tr('Lieu'), optional: true, initial: camp.place),
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
                  ..tariff = v['tariff']!
                  ..kairos = v['kairos']!.toLowerCase() == 'oui';
                app.changed();
                _updateCampServer(c, camp);
              }, initialImagePath: camp.imagePath);
            },
          ),
          NavTile(
            icon: Icons.chat_bubble_outline,
            label: tr('Ajouter une actualité'),
            sub: tr('Titre, texte, date. Générale ou pour un établissement.'),
            onTap: () async {
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
                final news = NewsItem(v['title']!, v['text']!, target, DateTime.now(), etablissementId: etabId, imagePath: imagePath);
                app.news.insert(0, news);
                app.changed();
                _publishNews(c, news);
              });
            },
          ),
          if (general)
          NavTile(
            icon: Icons.apartment_outlined,
            label: tr('Ajouter un établissement'),
            sub: tr('Il apparaît dans la liste et dans les profils.'),
            onTap: () => imageFormSheet(c, tr('Nouvel établissement'), [F('name', tr('Nom'))], tr('Ajouter'), (v, imagePath) {
              final etab = Etab(v['name']!, imagePath: imagePath);
              app.etabs.add(etab);
              app.changed();
              _publishEtab(c, etab);
            }),
          ),
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
          if (general)
          NavTile(
            icon: Icons.headphones_outlined,
            label: tr('Ajouter une musique ou un enseignement'),
            sub: tr('Type, titre, artiste ou orateur, fichier audio importé. Publié sur le serveur si possible, sinon conservé en local.'),
            onTap: () async {
              final type = await pick<String>(c, tr('Musique ou enseignement ?'), [tr('Musique'), tr('Enseignement')], (s) => s);
              if (type == null || !c.mounted) return;
              final kind = type == tr('Musique') ? 'musique' : 'enseignement';
              final artistLabel = kind == 'musique' ? tr('Artiste') : tr('Orateur');
              audioFormSheet(c, kind == 'musique' ? tr('Nouvelle musique') : tr('Nouvel enseignement'), [
                F('title', tr('Titre')),
                F('speaker', artistLabel, optional: true),
                F('url', tr('Lien audio'), optional: true),
              ], tr('Publier'), (v, imagePath, audioPath, audioBytes, audioName) {
                final teaching = Teaching(v['title']!, v['speaker']!, v['url']!, kind: kind, imagePath: imagePath);
                app.teachings.insert(0, teaching);
                app.changed(); // changed() sauvegarde déjà en local.
                _publishTeaching(c, teaching, audioPath: audioPath, audioBytes: audioBytes, audioName: audioName);
              });
            },
          ),
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
          if (general)
          NavTile(
            icon: Icons.people_outlined,
            label: tr('Ajouter un responsable du Bureau'),
            sub: tr('Le contact ne s’affiche qu’avec son accord.'),
            onTap: () => addBureauMember(c),
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
