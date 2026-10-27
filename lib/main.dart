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
//     structure, non fourni, donc l'espace reste désactivé tant qu'il
//     n'est pas configuré. En production, la connexion de la structure
//     doit passer par le serveur, jamais par un code dans l'application.
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
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:share_plus/share_plus.dart';

import 'api.dart';
import 'bible.dart';
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
      {this.fonction = '', this.ministere = '', this.photoPath = '', this.validUntilOverride});
  final String name, matricule, etab, fonction, ministere, photoPath;
  final DateTime since;
  // Date de fin de validité venue du serveur quand elle existe.
  // Le serveur n'a pas de colonnes fonction ni ministère : ces deux
  // champs restent conservés sur l'appareil seulement.
  final DateTime? validUntilOverride;
  DateTime get validUntil => validUntilOverride ?? DateTime(since.year + 1, since.month, since.day);
  Member withPhoto(String path) => Member(name, matricule, etab, since,
      fonction: fonction, ministere: ministere, photoPath: path, validUntilOverride: validUntilOverride);
}

class Book {
  Book({required this.id, required this.title, required this.author, required this.price,
      this.description = '', this.format = '', this.fileUrl = '', this.serverId = ''});
  final int id;
  // Identifiant serveur (UUID) quand le livre vient du serveur. Il sert
  // aux achats et au fichier côté serveur ; l'id local ne sert qu'à l'affichage.
  final String serverId;
  String title, author, description, format, fileUrl;
  int price;
}

class Camp {
  Camp({required this.id, required this.name, this.dates = '', this.place = '', this.tariff = '', this.kairos = false, this.serverId = ''});
  final int id;
  // Identifiant serveur (UUID) quand le camp vient du serveur. Il sert
  // à l'inscription côté serveur et au pass ; l'id local ne sert qu'à l'affichage.
  final String serverId;
  String name, dates, place, tariff;
  bool kairos;
}

class Etab {
  Etab(this.name, {this.id = ''});
  final String name;
  // Identifiant serveur (UUID) quand l'établissement vient du serveur.
  // Il sert à l'inscription du membre côté serveur.
  final String id;
  final List<String> activities = [];
}

class NewsItem {
  NewsItem(this.title, this.text, this.etab, this.date, {this.etablissementId = ''});
  final String title, text, etab;
  final DateTime date;
  final String etablissementId;
}

class BureauMember {
  BureauMember(this.name, this.role, this.contact, this.consent);
  final String name, role, contact;
  final bool consent; // le contact ne s'affiche qu'avec l'accord
}

class Teaching {
  Teaching(this.title, this.speaker, this.url);
  final String title, speaker, url;
}

class QuizQ {
  QuizQ(this.character, this.question, this.choices, this.correct, this.ref, this.explanation);
  final String character, question, ref, explanation;
  final List<String> choices;
  final int correct;
}

class PurchaseItem {
  PurchaseItem(this.bookId, this.title, this.author, this.price);
  final int bookId, price;
  final String title, author; // copie d'origine : le catalogue ne la réécrit pas
}

class PayRequest {
  PayRequest(this.ref, this.kind, this.amount, this.items, this.memberName, this.matricule, this.date);
  final String ref, kind, memberName, matricule; // kind : 'don' | 'achat'
  final int amount;
  final List<PurchaseItem> items;
  final DateTime date;
  bool confirmed = false;
  DateTime? confirmedAt;
}

class Registration {
  Registration(this.camp, this.member, this.date, {this.codePass = ''});
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
  Future<void> syncFromServer() async {
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
        return;
      }
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
          final etab = Etab(name, id: id);
          this.etabs.add(etab);
          // Activités : elles ne figurent que dans le détail de l'établissement.
          try {
            final detail = await api.fetchEtablissement(id);
            final acts = detail['activites'];
            if (acts is List) {
              for (final a in acts) {
                final titre = (a['titre'] ?? '').toString();
                if (titre.isNotEmpty) etab.activities.add(titre);
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
            tariff: e['tarif_fcfa'] == null ? 'À confirmer' : '${e['tarif_fcfa']} FCFA',
            kairos: e['est_kairos'] == true,
          ));
        }
      }
      if (books.isNotEmpty) {
        this.books.clear();
        var i = 0;
        for (final b in books) {
          this.books.add(Book(
            id: ++i,
            serverId: (b['id'] ?? '').toString(),
            title: (b['titre'] ?? '').toString(),
            author: (b['auteur'] ?? '').toString(),
            description: (b['description'] ?? '').toString(),
            format: (b['format'] ?? '').toString(),
            price: (b['prix_fcfa'] as num?)?.toInt() ?? 0,
          ));
        }
      }
      if (teachings.isNotEmpty) {
        this.teachings.clear();
        for (final t in teachings) {
          final audioId = (t['audio_id'] ?? '').toString();
          this.teachings.add(Teaching(
            (t['titre'] ?? '').toString(),
            (t['orateur'] ?? '').toString(),
            audioId.isEmpty ? '' : '$kApiBaseUrl/fichiers/$audioId',
          ));
        }
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
      serverStatus = 'serveur';
      notifyListeners();
      // Profil serveur, si un jeton est conservé sur l'appareil.
      await syncServerProfile();
    } catch (_) {
      serverStatus = 'erreur';
      notifyListeners();
    }
  }

  /// Profil venu du serveur : matricule, nom, établissement et validité
  /// sont ceux du serveur, jamais un matricule local. Fonction, ministère
  /// et photo, qui n'existent pas côté serveur, restent locaux.
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
      member = Member(
        name,
        matricule,
        etab.isEmpty ? (old?.etab ?? '') : etab,
        inscrit,
        fonction: old?.fonction ?? '',
        ministere: old?.ministere ?? '',
        photoPath: old?.photoPath ?? '',
        validUntilOverride: valide,
      );
      final role = api.role;
      isAdmin = role == 'admin_general' || role == 'admin_etablissement';
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
    member = Member(name, matricule, etab, inscrit,
        fonction: fonction, ministere: ministere, photoPath: photoPath, validUntilOverride: valide);
    final role = api.role;
    isAdmin = role == 'admin_general' || role == 'admin_etablissement';
    notifyListeners();
    await _save();
  }
  int _id = 0, _mat = 0;

  final books = <Book>[];
  final camps = <Camp>[];
  final news = <NewsItem>[];
  final bureau = <BureauMember>[];
  final teachings = <Teaching>[];
  final cart = <Book>[];
  final requests = <PayRequest>[];
  final registrations = <Registration>[];
  final journal = <JournalEntry>[];
  final planDone = <int>{};
  final etabs = <Etab>[Etab('ISPAM'), Etab('Céleste'), Etab('La Silhouette')];

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
      final m = member;
      if (m == null) {
        await prefs.remove('member');
      } else {
        await prefs.setString('member', jsonEncode({'name': m.name, 'mat': m.matricule, 'etab': m.etab, 'fonction': m.fonction, 'ministere': m.ministere, 'photo': m.photoPath, 'since': m.since.toIso8601String(), 'validUntil': m.validUntilOverride?.toIso8601String()}));
        await prefs.setStringList('books', books.map((b) => jsonEncode({'id': b.id, 'title': b.title, 'author': b.author, 'desc': b.description, 'format': b.format, 'url': b.fileUrl, 'price': b.price})).toList());
        await prefs.setStringList('teachings', teachings.map((x) => jsonEncode({'title': x.title, 'speaker': x.speaker, 'url': x.url})).toList());
      }
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
      final m = prefs.getString('member');
      if (m != null) {
        final j = jsonDecode(m) as Map<String, dynamic>;
        final validSaved = j['validUntil'] as String?;
        member = Member(j['name'] as String, j['mat'] as String, j['etab'] as String, DateTime.parse(j['since'] as String), fonction: (j['fonction'] as String?) ?? '', ministere: (j['ministere'] as String?) ?? '', photoPath: (j['photo'] as String?) ?? '', validUntilOverride: validSaved == null ? null : DateTime.tryParse(validSaved));
      books
        ..clear()
        ..addAll((prefs.getStringList('books') ?? const <String>[]).map((x) {
          final j = jsonDecode(x) as Map<String, dynamic>;
          return Book(id: (j['id'] as num).toInt(), title: j['title'] as String, author: j['author'] as String, price: (j['price'] as num).toInt(), description: (j['desc'] as String?) ?? '', format: (j['format'] as String?) ?? '', fileUrl: (j['url'] as String?) ?? '');
        }));
      teachings
        ..clear()
        ..addAll((prefs.getStringList('teachings') ?? const <String>[]).map((x) {
          final j = jsonDecode(x) as Map<String, dynamic>;
          return Teaching(j['title'] as String, (j['speaker'] as String?) ?? '', (j['url'] as String?) ?? '');
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

  void logout() {
    member = null;
    isAdmin = false;
    notifyListeners();
    _save();
    // Déconnexion serveur aussi, sans bloquer l'interface.
    unawaited(api.logout());
  }

  PayRequest createRequest(String kind, int amount, {List<PurchaseItem> items = const <PurchaseItem>[], String? serverRef}) {
    final m = member!;
    // Référence serveur quand la demande a été créée côté serveur,
    // sinon référence locale provisoire, en attente de confirmation.
    final r = PayRequest(serverRef ?? '${kind == 'don' ? 'DON' : 'ACH'}-${DateTime.now().millisecondsSinceEpoch}',
        kind, amount, items, m.name, m.matricule, DateTime.now());
    requests.insert(0, r);
    notifyListeners();
    return r;
  }

  /// Validation explicite de la structure (compte Wave contrôlé).
  void confirm(PayRequest r) {
    r.confirmed = true;
    r.confirmedAt = DateTime.now();
    notifyListeners();
  }

  bool hasPurchased(int bookId) =>
      requests.any((r) => r.kind == 'achat' && r.confirmed && r.items.any((i) => i.bookId == bookId));

  /// Le fichier n'est JAMAIS renvoyé avant un paiement confirmé.
  String? fileFor(Book b) => hasPurchased(b.id) ? b.fileUrl : null;

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

String orTbc(String s) => s.trim().isEmpty ? 'À confirmer' : s.trim();

Widget live(Widget Function(BuildContext) build) =>
    ListenableBuilder(listenable: app, builder: (c, _) => build(c));

bool requireMember(BuildContext c) {
  if (app.member != null) return true;
  toast(c, 'Créez votre profil de membre pour continuer.');
  go(c, const ProfilePage());
  return false;
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

/// Crée la demande « en attente » puis ouvre Wave. Ne marque JAMAIS comme payé.
/// Quand le membre est connecté au serveur, la demande est d'abord créée
/// côté serveur pour obtenir sa référence ; si le serveur ne peut pas
/// (lien Wave serveur non configuré, par exemple), on garde la demande
/// locale et le lien Wave de l'application, qui reste le parcours actuel.
Future<PayRequest?> startPayment(BuildContext c, String kind, int amount,
    {List<PurchaseItem> items = const <PurchaseItem>[]}) async {
  if (kWaveBaseUrl.isEmpty) {
    toast(c, 'Le lien Wave de la structure n’est pas encore configuré.');
    return null;
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
  final r = app.createRequest(kind, serverAmount, items: items, serverRef: serverRef);
  final ok = await openWave(serverAmount);
  if (!ok) {
    app.requests.remove(r);
    app.changed();
    if (c.mounted) toast(c, 'Impossible d’ouvrir Wave. Vérifiez que l’application est installée.');
    return null;
  }
  return r;
}

Future<void> openUrl(BuildContext c, String url) async {
  try {
    final ok = await launchUrl(Uri.parse(url), mode: LaunchMode.externalApplication);
    if (!ok && c.mounted) toast(c, 'Impossible d’ouvrir ce lien.');
  } catch (_) {
    if (c.mounted) toast(c, 'Lien invalide.');
  }
}

Scaffold basic(String title, List<Widget> children, {List<Widget>? actions, PreferredSizeWidget? bottom}) {
  return Scaffold(
    appBar: AppBar(
      title: Row(mainAxisSize: MainAxisSize.min, children: [
        Image.asset('assets/logo.png',
            height: 28,
            errorBuilder: (_, __, ___) => const SizedBox.shrink()),
        const SizedBox(width: 8),
        Flexible(child: Text(title, overflow: TextOverflow.ellipsis)),
      ]),
      actions: actions,
      bottom: bottom,
    ),
    body: SafeArea(child: ListView(padding: const EdgeInsets.all(Cp.s2), children: children)),
  );
}

Widget heading(BuildContext c, String t) => Padding(
      padding: const EdgeInsets.only(bottom: Cp.s1),
      child: Text(t, style: Theme.of(c).textTheme.titleMedium?.copyWith(color: Cp.goldDeep)),
    );

class EmptyNote extends StatelessWidget {
  const EmptyNote({super.key, required this.icon, required this.text, this.action});
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
      trailing: const Icon(Icons.chevron_right, color: Cp.inkMuted),
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
  const StatusChip({super.key, required this.confirmed});
  final bool confirmed;

  @override
  Widget build(BuildContext context) {
    final color = confirmed ? Cp.ok : Cp.goldDeep;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(confirmed ? 'Confirmé' : 'En attente de confirmation Wave',
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

class _SplashScreenState extends State<SplashScreen> {
  bool _navigated = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final reduceMotion = MediaQuery.of(context).disableAnimations;
      Future.delayed(
        Duration(milliseconds: reduceMotion ? 300 : 1800),
        _goHome,
      );
    });
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
    return GestureDetector(
      onTap: _goHome,
      child: Scaffold(
        backgroundColor: Cp.navy,
        body: SafeArea(
          child: Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Image.asset('assets/logo.png',
                    width: 200,
                    errorBuilder: (_, __, ___) => const Text('Connexion\nProphétique',
                        textAlign: TextAlign.center,
                        style: TextStyle(color: Colors.white, fontSize: 30, fontWeight: FontWeight.w700))),
                const SizedBox(height: Cp.s3),
                Container(width: 64, height: 3, color: Cp.gold),
                const SizedBox(height: Cp.s2),
                const Text('Former pour mieux servir',
                    style: TextStyle(color: Cp.gold, fontSize: 16, fontWeight: FontWeight.w700, letterSpacing: 0.5)),
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
  void _goTo(int i) => setState(() => _index = i);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(index: _index, children: [
        HomePage(onOpenCard: () => _goTo(2), onOpenBible: () => _goTo(1)),
        const BiblePage(),
        const CardPage(),
        const CommunityPage(),
        const MorePage(),
      ]),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _index,
        onDestinationSelected: _goTo,
        // Recopie web, détail par détail : la version web utilise des
        // icônes fines, en trait seul, partout, sans bascule vers une
        // icône pleine quand l'onglet est sélectionné. Seule la couleur
        // change (pastille or, icône bleu nuit), comme sur le web.
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home_outlined), label: 'Accueil'),
          NavigationDestination(icon: Icon(Icons.auto_stories_outlined), selectedIcon: Icon(Icons.auto_stories_outlined), label: 'Bible'),
          NavigationDestination(icon: Icon(Icons.badge_outlined), selectedIcon: Icon(Icons.badge_outlined), label: 'Carte'),
          NavigationDestination(icon: Icon(Icons.people_outlined), selectedIcon: Icon(Icons.people_outlined), label: 'Communauté'),
          NavigationDestination(icon: Icon(Icons.more_horiz), selectedIcon: Icon(Icons.more_horiz), label: 'Plus'),
        ],
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════
// 5. ACCUEIL
// ═══════════════════════════════════════════════════════════════════
class HomePage extends StatelessWidget {
  const HomePage({super.key, required this.onOpenCard, required this.onOpenBible});
  final VoidCallback onOpenCard;
  final VoidCallback onOpenBible;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return live((c) => Scaffold(
          appBar: AppBar(
            title: Row(mainAxisSize: MainAxisSize.min, children: [
              Image.asset('assets/logo.png',
                  height: 28,
                  errorBuilder: (_, __, ___) => const SizedBox.shrink()),
              const SizedBox(width: 8),
              const Flexible(child: Text('Connexion Prophétique', overflow: TextOverflow.ellipsis)),
            ]),
          ),
          body: ListView(
            padding: const EdgeInsets.all(Cp.s2),
            children: [
              if (app.serverStatus == 'erreur') ...[
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(Cp.s2),
                    child: Row(children: [
                      const Icon(Icons.cloud_off_outlined, color: Cp.inkMuted),
                      const SizedBox(width: Cp.s1),
                      const Expanded(
                        child: Text('Hors ligne : contenus locaux affichés. La synchronisation reprendra en ligne.'),
                      ),
                      TextButton(
                        onPressed: () => unawaited(app.syncFromServer()),
                        child: const Text('Réessayer'),
                      ),
                    ]),
                  ),
                ),
                const SizedBox(height: Cp.s2),
              ],
              _MemberHeroCard(onTap: onOpenCard),
              const SizedBox(height: Cp.s3),
              heading(c, 'Ma vie spirituelle'),
              GridView.count(
                crossAxisCount: 2,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                mainAxisSpacing: Cp.s1,
                crossAxisSpacing: Cp.s1,
                childAspectRatio: 1.7,
                children: [
                  ActionTile(icon: Icons.auto_stories_outlined, label: 'Bible', onTap: onOpenBible),
                  ActionTile(icon: Icons.quiz_outlined, label: 'Quiz Bible', onTap: () => go(c, const QuizPage())),
                  ActionTile(icon: Icons.headphones_outlined, label: 'Enseignements', onTap: () => go(c, const TeachingsPage())),
                  ActionTile(icon: Icons.volunteer_activism_outlined, label: 'Prière', onTap: () => go(c, const PrayerPage())),
                ],
              ),
              const SizedBox(height: Cp.s3),
              const VerseCard(),
              const SizedBox(height: Cp.s3),
              heading(c, 'Explorer'),
              Card(
                clipBehavior: Clip.antiAlias,
                child: Column(children: [
                  ExploreRow(icon: Icons.event_outlined, label: 'Camps et retraites', onTap: () => go(c, const CampsPage())),
                  const Divider(),
                  ExploreRow(icon: Icons.school_outlined, label: 'Établissements', onTap: () => go(c, const EtabsPage())),
                  const Divider(),
                  ExploreRow(icon: Icons.newspaper_outlined, label: 'Actualités', onTap: () => go(c, const NewsPage())),
                  const Divider(),
                  ExploreRow(icon: Icons.book_outlined, label: 'Librairie', onTap: () => go(c, const LibrairiePage())),
                  const Divider(),
                  ExploreRow(icon: Icons.self_improvement_outlined, label: 'Mon épanouissement', onTap: () => go(c, const EpanouissementPage())),
                ]),
              ),
              const SizedBox(height: Cp.s3),
              heading(c, 'Quiz Bible'),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(Cp.s2),
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text('Une question, quatre choix, une référence du verset.', style: t.bodyMedium),
                    const SizedBox(height: Cp.s1),
                    SizedBox(
                      width: double.infinity,
                      height: 52,
                      child: FilledButton(
                        onPressed: () => go(c, const QuizPage()),
                        child: const Text('Jouer au Quiz Bible'),
                      ),
                    ),
                  ]),
                ),
              ),
              const SizedBox(height: Cp.s2),
              Text('Le visiteur consulte. Le membre utilise sa carte, la librairie, les camps et les dons.', style: t.bodyMedium),
            ],
          ),
        ));
  }
}

class _MemberHeroCard extends StatelessWidget {
  const _MemberHeroCard({required this.onTap});
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final m = app.member;
    return Semantics(
      button: true,
      label: m == null ? 'Créer mon profil de membre' : 'Ouvrir ma carte de membre',
      child: Material(
        color: Cp.navy,
        borderRadius: BorderRadius.circular(Cp.radiusCard),
        child: InkWell(
          borderRadius: BorderRadius.circular(Cp.radiusCard),
          onTap: m == null ? () => go(context, const ProfilePage()) : onTap,
          child: Padding(
            padding: const EdgeInsets.all(Cp.s2),
            child: Row(children: [
              Expanded(
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(m == null ? 'Devenir membre' : 'Ma carte de membre',
                      style: const TextStyle(color: Cp.gold, fontSize: 14, fontWeight: FontWeight.w700)),
                  const SizedBox(height: Cp.s1),
                  Text(m?.name ?? 'Créer mon profil',
                      style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w700)),
                  if (m != null && m.fonction.isNotEmpty)
                    Text(m.fonction, style: const TextStyle(color: Cp.gold, fontSize: 14, fontWeight: FontWeight.w700)),
                  const SizedBox(height: 4),
                  Text(m == null ? 'Matricule et carte avec QR après inscription' : 'Matricule ${m.matricule}',
                      style: const TextStyle(color: Colors.white70, fontSize: 14)),
                  if (m != null)
                    Text('Valide jusqu’au ${dateFr(m.validUntil)}',
                        style: const TextStyle(color: Colors.white70, fontSize: 14)),
                ]),
              ),
              Container(
                width: 88,
                height: 88,
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(Cp.radiusTile)),
                child: Icon(m == null ? Icons.person_add_alt_1 : Icons.qr_code_2, size: 56, color: Cp.navy),
              ),
            ]),
          ),
        ),
      ),
    );
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
            Text('Verset du jour', style: t.titleMedium),
            const SizedBox(height: Cp.s1),
            Text(text, style: t.bodyMedium),
            const SizedBox(height: Cp.s1),
            Text(label, style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: Cp.ink)),
            Align(
              alignment: Alignment.centerRight,
              child: TextButton.icon(
                onPressed: () => setState(() => _future = BibleService.instance.advanceVerse(widget.lang)),
                icon: const Icon(Icons.refresh, size: 18),
                label: const Text('Autre verset'),
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
            const Icon(Icons.chevron_right, color: Cp.inkMuted),
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

class _ProfilePageState extends State<ProfilePage> {
  // Inscription et connexion serveur, comme sur la version web :
  // le matricule vient du serveur, jamais d'un compteur local.
  // Fonction et ministère n'existent pas côté serveur : ils restent
  // conservés sur cet appareil seulement.
  bool _register = true;
  bool _busy = false;
  bool _showPassword = false;
  final _name = TextEditingController();
  final _identifiant = TextEditingController();
  final _telephone = TextEditingController();
  final _email = TextEditingController();
  final _password = TextEditingController();
  final _fonction = TextEditingController();
  final _ministere = TextEditingController();
  String? _etab;
  String? _error;
  String _photoPath = '';

  Future<void> _pickPhoto() async {
    final picked = await ImagePicker().pickImage(source: ImageSource.gallery);
    if (picked != null && mounted) setState(() => _photoPath = picked.path);
  }

  @override
  void dispose() {
    _name.dispose();
    _identifiant.dispose();
    _telephone.dispose();
    _email.dispose();
    _password.dispose();
    _fonction.dispose();
    _ministere.dispose();
    super.dispose();
  }

  InputDecoration _dec(String label) => InputDecoration(
        labelText: label,
        filled: true,
        fillColor: Cp.card,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
      );

  Future<void> _submit() async {
    final password = _password.text;
    if (password.length < 8) {
      setState(() => _error = 'Le mot de passe doit contenir au moins 8 caractères.');
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
        final tel = _telephone.text.trim();
        final mail = _email.text.trim();
        if (name.isEmpty) throw ApiException('Renseignez votre nom complet.');
        if (tel.isEmpty && mail.isEmpty) throw ApiException('Renseignez un téléphone ou un e-mail.');
        if (_etab == null) throw ApiException('Choisissez votre établissement.');
        final created = await api.register(
          nomComplet: name,
          motDePasse: password,
          email: mail.isEmpty ? null : mail,
          telephone: tel.isEmpty ? null : tel,
          etablissementId: etabId,
        );
        final m = created['membre'];
        if (m is Map<String, dynamic>) {
          moi = {...m, 'etablissement': etabName};
        } else {
          moi = await api.fetchMoi();
        }
      } else {
        final ident = _identifiant.text.trim();
        if (ident.isEmpty) throw ApiException('Renseignez votre téléphone ou votre e-mail.');
        await api.login(ident, password);
        moi = await api.fetchMoi();
      }
      await app.setServerMember(moi,
          fonction: _fonction.text.trim(), ministere: _ministere.text.trim(), photoPath: _photoPath);
      // La synchronisation des contenus publics se relance, avec le profil serveur.
      unawaited(app.syncFromServer());
      if (mounted) Navigator.of(context).pop();
    } on ApiException catch (e) {
      if (mounted) setState(() => _error = e.message);
    } catch (_) {
      if (mounted) {
        setState(() => _error = 'Serveur injoignable. Vérifiez votre connexion, puis réessayez. Aucun compte local n’est créé.');
      }
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return basic('Mon profil', [
      Text(_register ? 'Devenir membre' : 'Se connecter', style: Theme.of(context).textTheme.titleLarge),
      const SizedBox(height: Cp.s1),
      Text(
        _register
            ? 'Votre matricule unique et votre carte avec QR sont créés par le serveur à l’inscription.'
            : 'Retrouvez votre carte et votre matricule, déjà créés sur le serveur.',
        style: Theme.of(context).textTheme.bodyMedium),
      const SizedBox(height: Cp.s2),
      SegmentedButton<bool>(
        segments: const [
          ButtonSegment(value: true, label: Text('Créer un compte')),
          ButtonSegment(value: false, label: Text('Se connecter')),
        ],
        selected: {_register},
        onSelectionChanged: (s) => setState(() {
          _register = s.first;
          _error = null;
        }),
      ),
      const SizedBox(height: Cp.s3),
      if (_register) ...[
        TextField(
          controller: _name,
          textCapitalization: TextCapitalization.words,
          decoration: _dec('Nom complet'),
        ),
        const SizedBox(height: Cp.s2),
        TextField(
          controller: _telephone,
          keyboardType: TextInputType.phone,
          decoration: _dec('Téléphone (ou e-mail ci-dessous)'),
        ),
        const SizedBox(height: Cp.s2),
        TextField(
          controller: _email,
          keyboardType: TextInputType.emailAddress,
          decoration: _dec('E-mail (ou téléphone ci-dessus)'),
        ),
        const SizedBox(height: Cp.s2),
        Row(children: [
          if (_photoPath.isNotEmpty)
            CircleAvatar(radius: 28, backgroundImage: FileImage(File(_photoPath)))
          else
            const CircleAvatar(radius: 28, backgroundColor: Cp.gold, child: Icon(Icons.person, color: Cp.navy)),
          const SizedBox(width: Cp.s2),
          Expanded(
            child: OutlinedButton.icon(
              onPressed: _pickPhoto,
              icon: const Icon(Icons.photo_camera_outlined),
              label: Text(_photoPath.isEmpty ? 'Ajouter une photo' : 'Changer la photo'),
            ),
          ),
        ]),
        const SizedBox(height: Cp.s2),
        TextField(
          controller: _fonction,
          textCapitalization: TextCapitalization.words,
          decoration: _dec('Fonction (si vous en avez une, sur cet appareil)'),
        ),
        const SizedBox(height: Cp.s2),
        TextField(
          controller: _ministere,
          textCapitalization: TextCapitalization.words,
          decoration: _dec('Ministère (si vous en avez un, sur cet appareil)'),
        ),
        const SizedBox(height: Cp.s2),
        DropdownButtonFormField<String>(
          value: _etab,
          items: [for (final e in app.etabs) DropdownMenuItem(value: e.name, child: Text(e.name))],
          onChanged: (v) => setState(() => _etab = v),
          decoration: _dec('Établissement'),
        ),
      ] else ...[
        TextField(
          controller: _identifiant,
          keyboardType: TextInputType.emailAddress,
          decoration: _dec('Téléphone ou e-mail'),
        ),
      ],
      const SizedBox(height: Cp.s2),
      TextField(
        controller: _password,
        obscureText: !_showPassword,
        decoration: _dec('Mot de passe (au moins 8 caractères)').copyWith(
          suffixIcon: IconButton(
            icon: Icon(_showPassword ? Icons.visibility_off : Icons.visibility),
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
                ? 'En cours…'
                : (_register ? 'Créer mon compte' : 'Se connecter'),
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

class CardPage extends StatefulWidget {
  const CardPage({super.key});

  @override
  State<CardPage> createState() => _CardPageState();
}

class _CardPageState extends State<CardPage> {
  final _cardKey = GlobalKey();
  bool _sharing = false;

  // Partage de la carte : la carte affichée est capturée en image PNG,
  // puis partagée avec share_plus. Sur téléphone, partager vers
  // Fichiers ou Photos revient à la télécharger, comme le partage
  // de la version web. Aucun nouveau design n'est inventé ici.
  Future<void> _shareCard(BuildContext c) async {
    if (_sharing) return;
    setState(() => _sharing = true);
    try {
      final boundary = _cardKey.currentContext?.findRenderObject() as RenderRepaintBoundary?;
      if (boundary == null) {
        if (c.mounted) toast(c, 'La carte n’est pas encore affichée.');
        return;
      }
      final image = await boundary.toImage(pixelRatio: 3);
      final bytes = await image.toByteData(format: ui.ImageByteFormat.png);
      final png = bytes?.buffer.asUint8List();
      if (png == null || png.isEmpty) {
        if (c.mounted) toast(c, 'Impossible de créer l’image de la carte.');
        return;
      }
      final file = File('${Directory.systemTemp.path}/carte-membre-connexion-prophetique.png');
      await file.writeAsBytes(png);
      // share_plus 9.0.0, API statique : Share.shareXFiles.
      await Share.shareXFiles(
        [XFile(file.path)],
        text: 'Ma carte de membre CONNEXION PROPHETIQUE',
      );
    } catch (_) {
      if (c.mounted) toast(c, 'Impossible de partager la carte.');
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
        return basic('Ma carte', [
          EmptyNote(
            icon: Icons.badge_outlined,
            text: 'La carte de membre est réservée aux membres. Créez votre profil pour obtenir votre matricule et votre QR.',
            action: FilledButton(onPressed: () => go(c, const ProfilePage()), child: const Text('Créer un compte ou se connecter')),
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
      return basic('Ma carte', [
        Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 360),
            child: RepaintBoundary(
              key: _cardKey,
              child: Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(Cp.radiusCard)),
                child: Column(children: [
                  Image.asset('assets/logo.png',
                      height: 44,
                      errorBuilder: (_, __, ___) => const SizedBox.shrink()),
                  const SizedBox(height: Cp.s1),
                  const Text('CARTE DE MEMBRE',
                      style: TextStyle(color: Cp.gold, fontSize: 12, fontWeight: FontWeight.w700, letterSpacing: 1.5)),
                  const SizedBox(height: Cp.s2),
                  if (m.photoPath.isNotEmpty)
                    CircleAvatar(radius: 30, backgroundImage: FileImage(File(m.photoPath)))
                  else
                    CircleAvatar(
                      radius: 30,
                      backgroundColor: Cp.gold,
                      child: Text(m.name.isEmpty ? '?' : m.name[0].toUpperCase(),
                          style: const TextStyle(color: Cp.navy, fontSize: 24, fontWeight: FontWeight.w700)),
                    ),
                  TextButton.icon(
                    onPressed: () async {
                      final picked = await ImagePicker().pickImage(source: ImageSource.gallery);
                      if (picked != null) app.setMemberPhoto(picked.path);
                    },
                    icon: const Icon(Icons.photo_camera_outlined, color: Cp.gold),
                    label: Text(m.photoPath.isEmpty ? 'Ajouter une photo' : 'Changer la photo',
                        style: const TextStyle(color: Cp.gold)),
                  ),
                  const SizedBox(height: Cp.s1),
                  Text(m.name, textAlign: TextAlign.center,
                      style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w700)),
                  if (m.fonction.isNotEmpty) ...[
                    const SizedBox(height: 4),
                    Text(m.fonction, textAlign: TextAlign.center,
                        style: const TextStyle(color: Cp.gold, fontSize: 14, fontWeight: FontWeight.w700)),
                  ],
                  if (m.ministere.isNotEmpty) ...[
                    const SizedBox(height: 4),
                    Text(m.ministere, textAlign: TextAlign.center, style: const TextStyle(color: Colors.white70, fontSize: 14)),
                  ],
                  const SizedBox(height: 4),
                  Text(m.etab, textAlign: TextAlign.center, style: const TextStyle(color: Colors.white70, fontSize: 14)),
                  const SizedBox(height: Cp.s2),
                  const Text('MEMBRE NUMÉRO', style: TextStyle(color: Cp.gold, fontSize: 12, fontWeight: FontWeight.w700, letterSpacing: 1)),
                  Text(m.matricule, style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w700)),
                  const SizedBox(height: Cp.s2),
                  Container(
                    width: 160,
                    height: 160,
                    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(Cp.radiusTile)),
                    child: QrImageView(data: m.matricule, size: 140),
                  ),
                  const SizedBox(height: Cp.s2),
                  Text('VALIDE JUSQU’AU ${dateFr(m.validUntil)}',
                      style: const TextStyle(color: Cp.gold, fontSize: 12, fontWeight: FontWeight.w700, letterSpacing: 0.5)),
                  const SizedBox(height: 4),
                  const Text('Validité : 1 an. Cotisation : 1 000 FCFA par mois.',
                      textAlign: TextAlign.center, style: TextStyle(color: Colors.white70, fontSize: 13)),
                ]),
              ),
            ),
          ),
        ),
        const SizedBox(height: Cp.s2),
        Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 360),
            child: SizedBox(
              width: double.infinity,
              height: 52,
              child: FilledButton.icon(
                onPressed: _sharing ? null : () => _shareCard(c),
                icon: const Icon(Icons.share_outlined),
                label: Text(_sharing ? 'Préparation…' : 'Télécharger et partager ma carte'),
              ),
            ),
          ),
        ),
        const SizedBox(height: Cp.s2),
        Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 360),
            child: Card(
              child: Padding(
                padding: const EdgeInsets.all(Cp.s2),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text('Présentez cette carte à l’entrée des activités.', style: t.bodyMedium),
                ]),
              ),
            ),
          ),
        ),
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
    return basic('Communauté', [
      navCard([
        NavTile(icon: Icons.event_outlined, label: 'Camps et retraites', sub: 'Inscription et pass numérique.', onTap: () => go(context, const CampsPage())),
        NavTile(icon: Icons.school_outlined, label: 'Établissements', sub: 'Activités et actualités de chaque établissement.', onTap: () => go(context, const EtabsPage())),
        NavTile(icon: Icons.newspaper_outlined, label: 'Actualités', sub: 'Les nouvelles de la structure.', onTap: () => go(context, const NewsPage())),
        NavTile(icon: Icons.people_outlined, label: 'Bureau', sub: 'Les responsables de la structure.', onTap: () => go(context, const BureauPage())),
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
    if (kAdminPin.isEmpty) {
      toast(c, 'Code de l’espace structure non configuré (kAdminPin).');
      return;
    }
    final ctrl = TextEditingController();
    showDialog(
      context: c,
      builder: (ctx) => AlertDialog(
        title: const Text('Espace structure'),
        content: TextField(
          controller: ctrl,
          obscureText: true,
          keyboardType: TextInputType.number,
          decoration: const InputDecoration(labelText: 'Code'),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Annuler')),
          FilledButton(
            onPressed: () {
              if (ctrl.text == kAdminPin) {
                app.isAdmin = true;
                Navigator.pop(ctx);
                go(c, const AdminPage());
              } else {
                toast(ctx, 'Code incorrect.');
              }
            },
            child: const Text('Entrer'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return live((c) => basic('Plus', [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(Cp.s2),
              child: Row(
                children: [
                  Icon(
                    app.serverStatus == 'serveur' ? Icons.cloud_done_outlined : Icons.cloud_off_outlined,
                    color: app.serverStatus == 'serveur' ? Cp.ok : Cp.inkMuted,
                  ),
                  const SizedBox(width: Cp.s1),
                  Expanded(
                    child: Text(
                      app.serverStatus == 'serveur'
                          ? 'Serveur connecté : contenus publics synchronisés.'
                          : app.serverStatus == 'erreur'
                              ? 'Serveur injoignable : contenus locaux affichés.'
                              : 'Données locales, synchronisation en cours.',
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: Cp.s2),
          navCard([
            NavTile(icon: Icons.favorite_border, label: 'Dons', sub: 'Donnez avec Wave. Le montant exact est affiché avant le paiement.', onTap: () => go(context, const DonsPage())),
            NavTile(icon: Icons.book_outlined, label: 'Librairie', sub: 'Achetez et lisez vos livres après paiement confirmé.', onTap: () => go(context, const LibrairiePage())),
            NavTile(icon: Icons.shopping_bag_outlined, label: 'Mes achats', sub: 'Vos livres et vos factures.', onTap: () => go(context, const MyPurchasesPage())),
            NavTile(icon: Icons.self_improvement_outlined, label: 'Mon épanouissement', sub: 'Plan de 21 jours, journal privé, minuteur de prière.', onTap: () => go(context, const EpanouissementPage())),
            NavTile(icon: Icons.admin_panel_settings_outlined, label: 'Espace structure', sub: 'Réservé aux administrateurs.', onTap: () => _admin(context)),
          ]),
          if (app.member != null) ...[
            const SizedBox(height: Cp.s3),
            SizedBox(
              height: 52,
              child: OutlinedButton.icon(
                onPressed: () async {
                  final ok = await showDialog<bool>(
                    context: c,
                    builder: (ctx) => AlertDialog(
                      title: const Text('Se déconnecter ?'),
                      content: const Text('Votre profil sera retiré de cet appareil. Vous pourrez vous inscrire de nouveau à tout moment.'),
                      actions: [
                        TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Annuler')),
                        FilledButton(onPressed: () => Navigator.pop(ctx, true), child: const Text('Se déconnecter')),
                      ],
                    ),
                  );
                  if (ok == true) app.logout();
                },
                icon: const Icon(Icons.logout),
                label: const Text('Se déconnecter de cet appareil'),
              ),
            ),
          ],
        ]));
  }
}

// ═══════════════════════════════════════════════════════════════════
// 8. BIBLE, QUIZ, ENSEIGNEMENTS, PRIÈRE
// ═══════════════════════════════════════════════════════════════════
class BiblePage extends StatefulWidget {
  const BiblePage({super.key});

  @override
  State<BiblePage> createState() => _BiblePageState();
}

class _BiblePageState extends State<BiblePage> {
  String _lang = 'fr';
  int? _book;
  int? _chapter;
  String _query = '';
  List<BibleHit> _hits = [];
  bool _loaded = false;
  BibleVerseRef? _last;
  List<BibleVerseRef> _favorites = [];
  final _searchCtrl = TextEditingController();

  @override
  void initState() {
    super.initState();
    _refresh();
  }

  Future<void> _refresh() async {
    await BibleService.instance.load();
    final last = await BibleService.instance.lastRead(_lang);
    final favs = await BibleService.instance.favorites(_lang);
    if (!mounted) return;
    setState(() {
      _loaded = true;
      _last = last;
      _favorites = favs;
    });
  }

  void _setLang(String lang) {
    setState(() {
      _lang = lang;
      _book = null;
      _chapter = null;
      _query = '';
      _hits = [];
      _searchCtrl.clear();
    });
    _refresh();
  }

  void _openChapter(int book, int chapter) {
    setState(() {
      _book = book;
      _chapter = chapter;
      _query = '';
      _hits = [];
    });
  }

  void _openHit(BibleHit h) {
    _openChapter(h.book, h.chapter);
  }

  Future<void> _toggleFav(BibleVerseRef r) async {
    await BibleService.instance.toggleFavorite(_lang, r);
    final favs = await BibleService.instance.favorites(_lang);
    if (!mounted) return;
    setState(() => _favorites = favs);
  }

  bool _isFav(BibleVerseRef r) =>
      _favorites.any((f) => f.book == r.book && f.chapter == r.chapter && f.verse == r.verse);

  Future<void> _markRead(BibleVerseRef r) async {
    await BibleService.instance.saveLastRead(_lang, r);
    if (!mounted) return;
    setState(() => _last = r);
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final svc = BibleService.instance;
    final books = svc.books(_lang);
    final children = <Widget>[
      SegmentedButton<String>(
        segments: const [
          ButtonSegment(value: 'fr', label: Text('Louis Segond')),
          ButtonSegment(value: 'en', label: Text('King James')),
        ],
        selected: {_lang},
        onSelectionChanged: (s) => _setLang(s.first),
      ),
      const SizedBox(height: Cp.s2),
      TextField(
        controller: _searchCtrl,
        textInputAction: TextInputAction.search,
        onSubmitted: (q) {
          setState(() {
            _query = q.trim();
            _hits = _query.isEmpty ? [] : svc.search(_lang, _query);
          });
        },
        decoration: InputDecoration(
          hintText: 'Rechercher un livre, un chapitre, un mot…',
          prefixIcon: const Icon(Icons.search),
          filled: true,
          fillColor: Cp.card,
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
        ),
      ),
      const SizedBox(height: Cp.s3),
    ];

    if (!_loaded) {
      children.add(const EmptyNote(icon: Icons.auto_stories_outlined, text: 'Chargement de la Bible…'));
    } else if (_query.isNotEmpty) {
      children.add(Text('${_hits.length} résultat(s) pour « $_query »', style: t.titleMedium));
      children.add(const SizedBox(height: Cp.s1));
      if (_hits.isEmpty) {
        children.add(EmptyNote(
          icon: Icons.search_off_outlined,
          text: 'Aucun verset trouvé. Essayez un autre mot, ou vérifiez l’orthographe.',
          action: OutlinedButton(
            onPressed: () => setState(() {
              _query = '';
              _hits = [];
              _searchCtrl.clear();
            }),
            child: const Text('Effacer la recherche'),
          ),
        ));
      } else {
        for (final h in _hits) {
          children.add(Card(
            child: ListTile(
              title: Text(svc.label(_lang, h.book, h.chapter, h.verse),
                  style: const TextStyle(fontWeight: FontWeight.w700)),
              subtitle: Text(h.text),
              trailing: const Icon(Icons.chevron_right),
              onTap: () => _openHit(h),
            ),
          ));
        }
      }
    } else if (_chapter != null && _book != null) {
      final bookName = svc.bookName(_lang, _book!);
      final verses = svc.chapterVerses(_lang, _book!, _chapter!);
      children.add(TextButton.icon(
        onPressed: () => setState(() => _chapter = null),
        icon: const Icon(Icons.chevron_left),
        label: Text(bookName),
      ));
      children.add(Text('$bookName $_chapter', style: t.titleLarge));
      children.add(const SizedBox(height: Cp.s1));
      for (var i = 0; i < verses.length; i++) {
        final ref = BibleVerseRef(_book!, _chapter!, i + 1, verses[i]);
        final fav = _isFav(ref);
        children.add(Card(
          child: ListTile(
            leading: Text('${i + 1}', style: const TextStyle(fontWeight: FontWeight.w700, color: Cp.goldDeep)),
            title: Text(verses[i]),
            trailing: IconButton(
              icon: Icon(fav ? Icons.star : Icons.star_border, color: fav ? Cp.goldDeep : null),
              onPressed: () => _toggleFav(ref),
            ),
            onTap: () => _markRead(ref),
          ),
        ));
      }
    } else if (_book != null) {
      final book = books[_book!];
      children.add(TextButton.icon(
        onPressed: () => setState(() => _book = null),
        icon: const Icon(Icons.chevron_left),
        label: const Text('Tous les livres'),
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
                onPressed: () => _openChapter(_book!, c),
                child: Text('$c'),
              ),
            ),
        ],
      ));
    } else {
      children.add(VerseCard(lang: _lang));
      children.add(const SizedBox(height: Cp.s2));
      if (_last != null) {
        children.add(Card(
          child: ListTile(
            leading: const Icon(Icons.history),
            title: const Text('Reprise de lecture'),
            subtitle: Text(
                '${svc.label(_lang, _last!.book, _last!.chapter, _last!.verse)} — ${_last!.text}'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () => _openChapter(_last!.book, _last!.chapter),
          ),
        ));
        children.add(const SizedBox(height: Cp.s1));
      }
      if (_favorites.isNotEmpty) {
        children.add(Text('Favoris', style: t.titleMedium));
        children.add(const SizedBox(height: Cp.s1));
        for (final f in _favorites) {
          children.add(Card(
            child: ListTile(
              leading: const Icon(Icons.star, color: Cp.goldDeep),
              title: Text(svc.label(_lang, f.book, f.chapter, f.verse)),
              subtitle: Text(f.text),
              trailing: const Icon(Icons.chevron_right),
              onTap: () => _openChapter(f.book, f.chapter),
            ),
          ));
        }
        children.add(const SizedBox(height: Cp.s2));
      }
      if (books.isEmpty) {
        children.add(const EmptyNote(
            icon: Icons.auto_stories_outlined,
            text: 'La Bible n’a pas pu être chargée. Fermez puis rouvrez l’application.'));
      } else {
        children.add(Text('Ancien Testament', style: t.titleMedium));
        for (var i = 0; i < 39 && i < books.length; i++) {
          children.add(Card(
            child: ListTile(
              title: Text(books[i].name),
              subtitle: Text('${books[i].chapters.length} chapitres'),
              trailing: const Icon(Icons.chevron_right),
              onTap: () => setState(() => _book = i),
            ),
          ));
        }
        children.add(const SizedBox(height: Cp.s2));
        children.add(Text('Nouveau Testament', style: t.titleMedium));
        for (var i = 39; i < books.length; i++) {
          children.add(Card(
            child: ListTile(
              title: Text(books[i].name),
              subtitle: Text('${books[i].chapters.length} chapitres'),
              trailing: const Icon(Icons.chevron_right),
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
        label: const Text('Jouer au Quiz Bible', style: TextStyle(fontWeight: FontWeight.w700)),
        style: OutlinedButton.styleFrom(
          foregroundColor: Cp.navy,
          side: const BorderSide(color: Cp.navy, width: 1.5),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
        ),
      ),
    ));
    return basic('Bible', children);
  }
}

class QuizPage extends StatefulWidget {
  const QuizPage({super.key});

  @override
  State<QuizPage> createState() => _QuizPageState();
}

class _QuizPageState extends State<QuizPage> {
  late List<QuizQ> _game;
  String _lang = 'fr';
  int _i = 0, _score = 0;
  int? _picked;

  @override
  void initState() {
    super.initState();
    _game = app.drawQuiz(5, _lang);
  }

  void _restart() => setState(() {
        _game = app.drawQuiz(5, _lang);
        _i = 0;
        _score = 0;
        _picked = null;
      });

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;

    final langSelector = SegmentedButton<String>(
      segments: const [
        ButtonSegment(value: 'fr', label: Text('Français')),
        ButtonSegment(value: 'en', label: Text('English')),
      ],
      selected: {_lang},
      onSelectionChanged: (sel) => setState(() {
        _lang = sel.first;
        _game = app.drawQuiz(5, _lang);
        _i = 0;
        _score = 0;
        _picked = null;
      }),
    );

    if (_game.isEmpty) {
      return basic('Quiz Bible', [
        langSelector,
        const SizedBox(height: Cp.s2),
        const EmptyNote(icon: Icons.quiz_outlined, text: 'Aucune question pour le moment. La structure peut en ajouter.'),
      ]);
    }

    if (_i >= _game.length) {
      return basic('Quiz Bible', [
        const SizedBox(height: Cp.s3),
        Center(child: Text('Partie terminée', style: t.titleLarge)),
        const SizedBox(height: Cp.s2),
        Center(
          child: Text('$_score / ${_game.length}',
              style: const TextStyle(fontSize: 48, fontWeight: FontWeight.w700, color: Cp.navy)),
        ),
        const SizedBox(height: Cp.s3),
        SizedBox(height: 56, child: FilledButton(onPressed: _restart, child: const Text('Rejouer'))),
      ]);
    }

    final q = _game[_i];
    final answered = _picked != null;
    return basic('Quiz Bible', [
      langSelector,
      const SizedBox(height: Cp.s2),
      Text('Question ${_i + 1} sur ${_game.length}', style: t.bodyMedium),
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
            child: Text(_i + 1 >= _game.length ? 'Voir mon score' : 'Question suivante'),
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
            if (state == 1) const Icon(Icons.check_circle, color: Cp.ok),
            if (state == 2) const Icon(Icons.cancel, color: Cp.danger),
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
    return live((c) => basic('Enseignements', [
          if (app.teachings.isEmpty)
            const EmptyNote(
              icon: Icons.headphones_outlined,
              text: 'Aucun enseignement publié pour le moment. La structure les ajoute depuis son espace.',
            )
          else
            navCard([
              for (final x in app.teachings)
                NavTile(
                  icon: Icons.play_circle_outline,
                  label: x.title,
                  sub: x.speaker.isEmpty ? 'Écouter' : x.speaker,
                  onTap: () => x.url.isEmpty ? toast(c, 'Audio non fourni par la structure.') : openUrl(c, x.url),
                ),
            ]),
        ]));
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
      toast(context, 'Écrivez votre sujet de prière.');
      return;
    }
    if (kStructureEmail.isEmpty) {
      toast(context, 'L’adresse e-mail de la structure n’est pas encore configurée.');
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
            title: const Text('Votre message est prêt à être envoyé'),
            content: Text(body),
            actions: [
              TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Fermer')),
              FilledButton(
                onPressed: () {
                  Clipboard.setData(ClipboardData(text: body));
                  Navigator.pop(ctx);
                  toast(context, 'Message copié. Collez-le dans votre e-mail.');
                },
                child: const Text('Copier'),
              ),
            ],
          ),
        );
      }
    } catch (_) {
      if (mounted) toast(context, 'Aucune application e-mail trouvée.');
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic('Prière', [
      Text('Sujet de prière', style: t.titleLarge),
      const SizedBox(height: Cp.s1),
      Text('Votre sujet part par e-mail vers la structure. Il reste privé : il n’est ni enregistré dans l’application, ni publié.',
          style: t.bodyMedium),
      const SizedBox(height: Cp.s3),
      TextField(
        controller: _text,
        minLines: 6,
        maxLines: 10,
        decoration: InputDecoration(
          hintText: 'Écrivez votre sujet…',
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
          label: const Text('Envoyer par e-mail', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
        ),
      ),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════════════
// 9. CAMPS, ÉTABLISSEMENTS, ACTUALITÉS, BUREAU
// ═══════════════════════════════════════════════════════════════════
class CampsPage extends StatelessWidget {
  const CampsPage({super.key});

  Registration? _reg(Camp camp) {
    final m = app.member;
    if (m == null) return null;
    for (final r in app.registrations) {
      if (r.camp.id == camp.id && r.member.matricule == m.matricule) return r;
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      return basic('Camps et retraites', [
        if (app.camps.isEmpty)
          const EmptyNote(
            icon: Icons.event_outlined,
            text: 'Aucun camp publié pour le moment. Dates, lieux et tarifs restent « À confirmer » tant que la structure ne les a pas fournis.',
          )
        else
          for (final camp in app.camps) ...[
            Card(
              child: Padding(
                padding: const EdgeInsets.all(Cp.s2),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(camp.name, style: t.titleMedium),
                  const SizedBox(height: Cp.s1),
                  Text('Dates : ${orTbc(camp.dates)}', style: t.bodyMedium),
                  Text('Lieu : ${orTbc(camp.place)}', style: t.bodyMedium),
                  Text('Tarif : ${orTbc(camp.tariff)}', style: t.bodyMedium),
                  if (camp.kairos) ...[
                    const SizedBox(height: 4),
                    Text('Badge automatique à l’inscription.', style: t.bodyMedium),
                  ],
                  const SizedBox(height: Cp.s2),
                  SizedBox(
                    width: double.infinity,
                    height: 52,
                    child: _reg(camp) != null
                        ? OutlinedButton(
                            onPressed: () => go(c, PassPage(registration: _reg(camp)!)),
                            child: Text(camp.kairos ? 'Voir mon badge' : 'Voir mon pass'),
                          )
                        : FilledButton(
                            onPressed: () async {
                              if (!requireMember(c)) return;
                              // Inscription serveur quand le camp vient du serveur
                              // et que le membre est connecté : le pass vient du
                              // serveur, avec son code. Sinon, repli local, sans
                              // inventer un code de pass serveur.
                              if (camp.serverId.isNotEmpty && api.isConnected) {
                                try {
                                  final created = await api.registerForEvent(camp.serverId);
                                  final code = (created['code_pass'] ?? '').toString();
                                  final reg = Registration(camp, app.member!, DateTime.now(), codePass: code);
                                  app.registrations.add(reg);
                                  app.changed();
                                  if (c.mounted) go(c, PassPage(registration: reg));
                                  return;
                                } on ApiException catch (e) {
                                  if (c.mounted) toast(c, e.message);
                                  return;
                                } catch (_) {
                                  if (c.mounted) toast(c, 'Serveur injoignable. Inscription non enregistrée.');
                                  return;
                                }
                              }
                              final reg = Registration(camp, app.member!, DateTime.now());
                              app.registrations.add(reg);
                              app.changed();
                              go(c, PassPage(registration: reg));
                            },
                            child: const Text('S’inscrire'),
                          ),
                  ),
                ]),
              ),
            ),
            const SizedBox(height: Cp.s1),
          ],
      ]);
    });
  }
}

class PassPage extends StatelessWidget {
  const PassPage({super.key, required this.registration});
  final Registration registration;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final r = registration;
    return basic(r.camp.kairos ? 'Badge' : 'Pass numérique', [
      Container(
        padding: const EdgeInsets.all(Cp.s3),
        decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(Cp.radiusCard)),
        child: Column(children: [
          Text(r.camp.name, textAlign: TextAlign.center,
              style: const TextStyle(color: Cp.gold, fontSize: 16, fontWeight: FontWeight.w700)),
          const SizedBox(height: Cp.s2),
          Container(
            width: 200,
            height: 200,
            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(Cp.radiusTile)),
            // Code du pass serveur quand il existe, sinon code local provisoire.
            child: QrImageView(
                data: r.codePass.isNotEmpty ? r.codePass : 'PASS:${r.member.matricule}:${r.camp.id}',
                size: 160),
          ),
          const SizedBox(height: Cp.s2),
          Text(r.member.name, textAlign: TextAlign.center,
              style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w700)),
          const SizedBox(height: 4),
          Text('Matricule ${r.member.matricule}', style: const TextStyle(color: Colors.white70, fontSize: 14)),
        ]),
      ),
      const SizedBox(height: Cp.s2),
      Text('Inscrit le ${dateFr(r.date)}. Présentez ce ${r.camp.kairos ? 'badge' : 'pass'} à l’entrée.', style: t.bodyMedium),
    ]);
  }
}

class EtabsPage extends StatelessWidget {
  const EtabsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return live((c) => basic('Établissements', [
          navCard([
            for (final e in app.etabs)
              NavTile(icon: Icons.school_outlined, label: e.name, sub: 'Activités, images et actualités.', onTap: () => go(c, EtabDetailPage(etab: e))),
          ]),
        ]));
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
        heading(c, 'Activités'),
        if (etab.activities.isEmpty)
          Text('Aucune activité publiée. La structure les renseigne.', style: t.bodyMedium)
        else
          Card(
            child: Column(children: [
              for (final a in etab.activities)
                ListTile(leading: const Icon(Icons.check_circle_outline, color: Cp.navy), title: Text(a, style: t.labelLarge)),
            ]),
          ),
        const SizedBox(height: Cp.s3),
        heading(c, 'Actualités'),
        if (items.isEmpty)
          Text('Aucune actualité pour cet établissement.', style: t.bodyMedium)
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
    return live((c) => basic('Actualités', [
          if (app.news.isEmpty)
            const EmptyNote(icon: Icons.newspaper_outlined, text: 'Aucune actualité pour le moment.')
          else
            for (final n in app.news) ...[NewsCard(item: n), const SizedBox(height: Cp.s1)],
        ]));
  }
}

class BureauPage extends StatelessWidget {
  const BureauPage({super.key});

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      return basic('Bureau', [
        if (app.bureau.isEmpty)
          const EmptyNote(icon: Icons.people_outlined, text: 'La section Bureau est vide. La structure la renseigne elle-même.')
        else
          Card(
            child: Column(children: [
              for (final b in app.bureau)
                ListTile(
                  leading: const Icon(Icons.person_outline, color: Cp.navy),
                  title: Text(b.name, style: t.labelLarge),
                  subtitle: Text(b.consent && b.contact.isNotEmpty ? '${b.role} · ${b.contact}' : b.role, style: t.bodyMedium),
                ),
            ]),
          ),
      ]);
    });
  }
}

// ═══════════════════════════════════════════════════════════════════
// 10. LIBRAIRIE, PANIER, ACHATS, FACTURE
// ═══════════════════════════════════════════════════════════════════
class LibrairiePage extends StatelessWidget {
  const LibrairiePage({super.key});

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      return basic(
        'Librairie',
        [
          if (app.books.isEmpty)
            const EmptyNote(icon: Icons.book_outlined, text: 'Le catalogue est vide. La structure ajoute les ouvrages depuis son espace.')
          else
            for (final b in app.books) ...[
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(Cp.s2),
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text(b.title, style: t.titleMedium),
                    const SizedBox(height: 2),
                    Text(b.author, style: t.bodyMedium),
                    if (b.description.isNotEmpty) ...[const SizedBox(height: Cp.s1), Text(b.description, style: t.bodyMedium)],
                    const SizedBox(height: Cp.s1),
                    Text(fcfa(b.price), style: t.titleMedium?.copyWith(color: Cp.goldDeep)),
                    const SizedBox(height: Cp.s1),
                    SizedBox(
                      width: double.infinity,
                      height: 52,
                      child: app.hasPurchased(b.id)
                          ? OutlinedButton(onPressed: () => go(c, ReaderPage(book: b)), child: const Text('Lire'))
                          : (app.cart.contains(b)
                              ? const OutlinedButton(onPressed: null, child: Text('Dans le panier'))
                              : FilledButton(
                                  onPressed: () {
                                    app.cart.add(b);
                                    app.changed();
                                    toast(c, 'Ajouté au panier.');
                                  },
                                  child: const Text('Ajouter au panier'),
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
            tooltip: 'Panier',
            icon: Badge(isLabelVisible: app.cart.isNotEmpty, label: Text('${app.cart.length}'), child: const Icon(Icons.shopping_cart_outlined)),
            onPressed: () => go(c, const CartPage()),
          ),
          IconButton(tooltip: 'Mes achats', icon: const Icon(Icons.shopping_bag_outlined), onPressed: () => go(c, const MyPurchasesPage())),
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
      return basic('Panier', [
        if (app.cart.isEmpty)
          const EmptyNote(icon: Icons.shopping_cart_outlined, text: 'Votre panier est vide.')
        else ...[
          Card(
            child: Column(children: [
              for (final b in app.cart)
                ListTile(
                  title: Text(b.title, style: t.labelLarge),
                  subtitle: Text('${b.author} · ${fcfa(b.price)}', style: t.bodyMedium),
                  trailing: IconButton(
                    tooltip: 'Retirer',
                    icon: const Icon(Icons.close),
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
              const Text('Montant exact à valider dans Wave', style: TextStyle(color: Cp.gold, fontSize: 14, fontWeight: FontWeight.w700)),
              const SizedBox(height: Cp.s1),
              Text(fcfa(total), style: const TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.w700)),
            ]),
          ),
          const SizedBox(height: Cp.s2),
          SizedBox(
            height: 56,
            child: FilledButton.icon(
              icon: const Icon(Icons.open_in_new),
              label: const Text('Payer avec Wave', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
              onPressed: () async {
                if (!requireMember(c)) return;
                final items = [for (final b in app.cart) PurchaseItem(b.id, b.title, b.author, b.price)];
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

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      final m = app.member;
      final mine = app.requests.where((r) => r.kind == 'achat' && m != null && r.matricule == m.matricule).toList();
      return basic('Mes achats', [
        if (mine.isEmpty)
          const EmptyNote(icon: Icons.shopping_bag_outlined, text: 'Aucun achat pour le moment.')
        else
          for (final r in mine) ...[
            Card(
              child: Padding(
                padding: const EdgeInsets.all(Cp.s2),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Row(children: [
                    Expanded(child: Text(r.ref, style: t.bodyMedium)),
                    StatusChip(confirmed: r.confirmed),
                  ]),
                  const SizedBox(height: Cp.s1),
                  for (final i in r.items)
                    Padding(
                      padding: const EdgeInsets.only(bottom: 4),
                      child: Row(children: [
                        Icon(r.confirmed ? Icons.lock_open : Icons.lock_outline, size: 18, color: r.confirmed ? Cp.ok : Cp.inkMuted),
                        const SizedBox(width: Cp.s1),
                        Expanded(child: Text('${i.title} · ${fcfa(i.price)}', style: t.labelLarge)),
                        if (r.confirmed)
                          TextButton(
                            onPressed: () {
                              final book = app.books.where((b) => b.id == i.bookId).toList();
                              if (book.isEmpty) {
                                toast(c, 'Ce livre n’est plus au catalogue.');
                              } else {
                                go(c, ReaderPage(book: book.first));
                              }
                            },
                            child: const Text('Lire'),
                          ),
                      ]),
                    ),
                  const SizedBox(height: Cp.s1),
                  Text('Total : ${fcfa(r.amount)}', style: t.titleMedium),
                  const SizedBox(height: 4),
                  Text('${dateFr(r.date)} · ${r.confirmed ? 'Payé' : 'En attente de confirmation Wave'}', style: t.bodyMedium),
                  if (!r.confirmed) ...[
                    const SizedBox(height: 4),
                    Text('Le fichier reste verrouillé avant la confirmation du paiement.', style: t.bodyMedium),
                  ] else ...[
                    // Facture en petit lien discret, comme sur la version web.
                    Align(
                      alignment: Alignment.centerLeft,
                      child: TextButton.icon(
                        onPressed: () => go(c, InvoicePage(request: r)),
                        icon: const Icon(Icons.receipt_long_outlined, size: 18),
                        label: const Text('Facture'),
                      ),
                    ),
                  ],
                ]),
              ),
            ),
            const SizedBox(height: Cp.s1),
          ],
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
    final file = app.fileFor(book); // null tant que le paiement n'est pas confirmé
    return basic(book.title, [
      if (file == null)
        const EmptyNote(icon: Icons.lock_outline, text: 'Ce livre est verrouillé. Il s’ouvre après la confirmation du paiement.')
      else ...[
        Text(book.title, style: t.titleLarge),
        const SizedBox(height: 4),
        Text(book.author, style: t.bodyMedium),
        const SizedBox(height: Cp.s3),
        if (file.isEmpty)
          Text('La structure n’a pas encore fourni le fichier de ce livre.', style: t.bodyMedium)
        else
          SizedBox(
            height: 56,
            child: FilledButton.icon(
              onPressed: () => openUrl(context, file),
              icon: const Icon(Icons.auto_stories_outlined),
              label: const Text('Ouvrir le livre'),
            ),
          ),
      ],
    ]);
  }
}

class InvoicePage extends StatelessWidget {
  const InvoicePage({super.key, required this.request});
  final PayRequest request;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final r = request;
    if (!r.confirmed) {
      return basic('Facture', const [EmptyNote(icon: Icons.receipt_long_outlined, text: 'La facture n’existe qu’après confirmation du paiement.')]);
    }
    return basic('Facture', [
      Card(
        child: Padding(
          padding: const EdgeInsets.all(Cp.s2),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text('Facture F-${r.ref}', style: t.titleMedium),
            const SizedBox(height: 4),
            Text('Date : ${dateFr(r.confirmedAt ?? r.date)}', style: t.bodyMedium),
            Text('Client : ${r.memberName} (${r.matricule})', style: t.bodyMedium),
            const Divider(height: Cp.s3),
            if (r.items.isEmpty)
              Text(r.kind == 'don' ? 'Contribution (don)' : 'Paiement', style: t.labelLarge)
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
              Expanded(child: Text('Total payé', style: t.titleMedium)),
              Text(fcfa(r.amount), style: t.titleMedium),
            ]),
          ]),
        ),
      ),
      const SizedBox(height: Cp.s1),
      Text('Export PDF ou JPG : à brancher côté serveur (génération après confirmation vérifiée).', style: t.bodyMedium),
    ]);
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
  int? _amount;
  PayRequest? _pending;

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
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
      final history = app.requests.where((r) => r.kind == 'don' && m != null && r.matricule == m.matricule).toList();

      if (_pending != null) {
        final r = _pending!;
        return basic('Dons', [
          Text('Demande envoyée', style: t.titleLarge),
          const SizedBox(height: Cp.s2),
          Container(
            padding: const EdgeInsets.all(Cp.s2),
            decoration: BoxDecoration(color: Cp.verseTint, borderRadius: BorderRadius.circular(Cp.radiusCard), border: Border.all(color: Cp.verseLine)),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                Icon(r.confirmed ? Icons.check_circle : Icons.hourglass_top, color: r.confirmed ? Cp.ok : Cp.goldDeep),
                const SizedBox(width: Cp.s1),
                Expanded(child: Text(r.confirmed ? 'Paiement confirmé' : 'En attente de confirmation Wave', style: t.titleMedium)),
              ]),
              const SizedBox(height: Cp.s2),
              Text('Montant : ${fcfa(r.amount)}', style: t.labelLarge),
              const SizedBox(height: 4),
              Text('Référence : ${r.ref}', style: t.bodyMedium),
            ]),
          ),
          const SizedBox(height: Cp.s2),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(Cp.s2),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text('Et ensuite ?', style: t.titleMedium),
                const SizedBox(height: Cp.s1),
                Text(
                  'Validez le montant exact dans Wave. La facture (PDF ou JPG) arrive après la confirmation du paiement, '
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
              child: const Text('Faire un autre don', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
            ),
          ),
        ]);
      }

      return basic('Dons', [
        Text('Contribution par Wave', style: t.titleLarge),
        const SizedBox(height: Cp.s1),
        Text('Choisissez ou saisissez un montant en FCFA.', style: t.bodyMedium),
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
            labelText: 'Autre montant',
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
            const Text('Montant exact à valider dans Wave', style: TextStyle(color: Cp.gold, fontSize: 14, fontWeight: FontWeight.w700)),
            const SizedBox(height: Cp.s1),
            Text(_amount == null ? '— FCFA' : fcfa(_amount!), style: const TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.w700)),
          ]),
        ),
        const SizedBox(height: Cp.s2),
        SizedBox(
          height: 56,
          child: FilledButton.icon(
            onPressed: _amount == null ? null : _pay,
            icon: const Icon(Icons.open_in_new),
            label: const Text('Payer avec Wave', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
          ),
        ),
        if (kWaveBaseUrl.isEmpty) ...[
          const SizedBox(height: Cp.s1),
          Text('Lien Wave de la structure : à configurer avant la mise en service.', style: t.bodyMedium),
        ],
        if (history.isNotEmpty) ...[
          const SizedBox(height: Cp.s3),
          heading(c, 'Mes dons'),
          Card(
            child: Column(children: [
              for (final r in history)
                ListTile(
                  title: Text(fcfa(r.amount), style: t.labelLarge),
                  subtitle: Text('${dateFr(r.date)} · ${r.ref}', style: t.bodyMedium),
                  trailing: r.confirmed
                      ? IconButton(tooltip: 'Facture', icon: const Icon(Icons.receipt_long_outlined), onPressed: () => go(c, InvoicePage(request: r)))
                      : const StatusChip(confirmed: false),
                ),
            ]),
          ),
        ],
      ]);
    });
  }
}

// ═══════════════════════════════════════════════════════════════════
// 12. MON ÉPANOUISSEMENT : plan de 21 jours, journal, minuteur
// ═══════════════════════════════════════════════════════════════════
class EpanouissementPage extends StatelessWidget {
  const EpanouissementPage({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Mon épanouissement'),
          bottom: const TabBar(tabs: [Tab(text: 'Plan 21 jours'), Tab(text: 'Journal'), Tab(text: 'Prière')]),
        ),
        body: const TabBarView(children: [_PlanTab(), _JournalTab(), _TimerTab()]),
      ),
    );
  }
}

class _PlanTab extends StatelessWidget {
  const _PlanTab();

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      return ListView(padding: const EdgeInsets.all(Cp.s2), children: [
        Text('${app.planDone.length} jour(s) sur 21', style: t.titleMedium),
        const SizedBox(height: Cp.s1),
        LinearProgressIndicator(value: app.planDone.length / 21, color: Cp.gold, backgroundColor: Cp.line, minHeight: 8, borderRadius: BorderRadius.circular(4)),
        const SizedBox(height: Cp.s2),
        Card(
          child: Column(children: [
            for (var d = 1; d <= 21; d++)
              CheckboxListTile(
                value: app.planDone.contains(d),
                activeColor: Cp.navy,
                title: Text('Jour $d', style: t.labelLarge),
                subtitle: Text('Lecture à définir par la structure', style: t.bodyMedium),
                onChanged: (v) {
                  v == true ? app.planDone.add(d) : app.planDone.remove(d);
                  app.changed();
                },
              ),
          ]),
        ),
      ]);
    });
  }
}

class _JournalTab extends StatefulWidget {
  const _JournalTab();

  @override
  State<_JournalTab> createState() => _JournalTabState();
}

class _JournalTabState extends State<_JournalTab> {
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
      return ListView(padding: const EdgeInsets.all(Cp.s2), children: [
        Text('Journal privé : jamais envoyé au serveur.', style: t.bodyMedium),
        const SizedBox(height: Cp.s1),
        TextField(
          controller: _text,
          minLines: 3,
          maxLines: 6,
          decoration: InputDecoration(
            hintText: 'Écrivez votre note du jour…',
            filled: true,
            fillColor: Cp.card,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
          ),
        ),
        const SizedBox(height: Cp.s1),
        SizedBox(
          height: 52,
          child: FilledButton(
            onPressed: () {
              final v = _text.text.trim();
              if (v.isEmpty) return;
              app.journal.insert(0, JournalEntry(DateTime.now(), v));
              _text.clear();
              app.changed();
            },
            child: const Text('Enregistrer la note'),
          ),
        ),
        const SizedBox(height: Cp.s2),
        for (final e in app.journal) ...[
          Card(
            child: ListTile(
              title: Text(e.text, style: t.labelLarge?.copyWith(fontWeight: FontWeight.w400)),
              subtitle: Text(dateFr(e.date), style: t.bodyMedium),
              trailing: IconButton(
                tooltip: 'Supprimer',
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

class _TimerTab extends StatefulWidget {
  const _TimerTab();

  @override
  State<_TimerTab> createState() => _TimerTabState();
}

class _TimerTabState extends State<_TimerTab> {
  int _minutes = 10;
  int _left = 600;
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
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (!mounted) return;
      setState(() => _left--);
      if (_left <= 0) {
        t.cancel();
        toast(context, 'Temps de prière terminé.');
      }
    });
    setState(() {});
  }

  void _pause() {
    _timer?.cancel();
    setState(() {});
  }

  void _reset() {
    _timer?.cancel();
    setState(() => _left = _minutes * 60);
  }

  @override
  Widget build(BuildContext context) {
    final mm = (_left ~/ 60).toString().padLeft(2, '0');
    final ss = (_left % 60).toString().padLeft(2, '0');
    return ListView(padding: const EdgeInsets.all(Cp.s2), children: [
      const SizedBox(height: Cp.s2),
      Center(child: Text('$mm:$ss', style: const TextStyle(fontSize: 64, fontWeight: FontWeight.w700, color: Cp.navy))),
      const SizedBox(height: Cp.s2),
      Wrap(alignment: WrapAlignment.center, spacing: Cp.s1, children: [
        for (final m in const [5, 10, 15, 20, 30])
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
      const SizedBox(height: Cp.s3),
      Row(children: [
        Expanded(
          child: SizedBox(
            height: 56,
            child: FilledButton(onPressed: _running ? _pause : _start, child: Text(_running ? 'Pause' : 'Démarrer')),
          ),
        ),
        const SizedBox(width: Cp.s1),
        SizedBox(height: 56, child: OutlinedButton(onPressed: _reset, child: const Text('Remettre à zéro'))),
      ]),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════════════
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
    toast(c, 'Le prix doit être un nombre entier en FCFA.');
    return null;
  }
  return v;
}

class AdminPage extends StatelessWidget {
  const AdminPage({super.key});

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      final pending = app.requests.where((r) => !r.confirmed).toList();

      return basic('Espace structure', [
        heading(c, 'Paiements à valider (${pending.length})'),
        if (pending.isEmpty)
          Text('Aucune demande en attente.', style: t.bodyMedium)
        else
          Card(
            child: Column(children: [
              for (final r in pending)
                ListTile(
                  title: Text('${r.kind == 'don' ? 'Don' : 'Achat'} · ${fcfa(r.amount)}', style: t.labelLarge),
                  subtitle: Text('${r.memberName} · ${r.ref}', style: t.bodyMedium),
                  trailing: FilledButton(
                    onPressed: () async {
                      final ok = await showDialog<bool>(
                        context: c,
                        builder: (ctx) => AlertDialog(
                          title: const Text('Valider ce paiement ?'),
                          content: Text('Validez seulement après avoir contrôlé votre compte Wave : ${fcfa(r.amount)} reçus pour la référence ${r.ref}.'),
                          actions: [
                            TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Annuler')),
                            FilledButton(onPressed: () => Navigator.pop(ctx, true), child: const Text('Valider')),
                          ],
                        ),
                      );
                      if (ok == true) app.confirm(r);
                    },
                    child: const Text('Valider'),
                  ),
                ),
            ]),
          ),
        const SizedBox(height: Cp.s3),
        heading(c, 'Publier et gérer'),
        navCard([
          NavTile(
            icon: Icons.auto_stories_outlined,
            label: 'Ajouter un livre',
            sub: 'Titre, auteur, description, prix, format, fichier.',
            onTap: () => formSheet(c, 'Nouveau livre', const [
              F('title', 'Titre'),
              F('author', 'Auteur'),
              F('desc', 'Description', lines: 3, optional: true),
              F('price', 'Prix (FCFA)', number: true),
              F('format', 'Format (PDF, EPUB…)', optional: true),
              F('url', 'Lien du fichier', optional: true),
            ], 'Publier', (v) {
              final p = _price(c, v['price']!);
              if (p == null) return;
              app.books.add(Book(id: app.nextId(), title: v['title']!, author: v['author']!, price: p,
                  description: v['desc']!, format: v['format']!, fileUrl: v['url']!));
              app.changed();
            }),
          ),
          NavTile(
            icon: Icons.edit_outlined,
            label: 'Modifier un livre',
            sub: 'Sans doublon. Les achats déjà payés ne changent pas.',
            onTap: () async {
              if (app.books.isEmpty) {
                toast(c, 'Le catalogue est vide.');
                return;
              }
              final b = await pick<Book>(c, 'Quel livre ?', app.books, (b) => b.title);
              if (b == null || !c.mounted) return;
              formSheet(c, 'Modifier le livre', [
                F('title', 'Titre', initial: b.title),
                F('author', 'Auteur', initial: b.author),
                F('desc', 'Description', lines: 3, optional: true, initial: b.description),
                F('price', 'Prix (FCFA)', number: true, initial: b.price.toString()),
                F('format', 'Format', optional: true, initial: b.format),
                F('url', 'Lien du fichier', optional: true, initial: b.fileUrl),
              ], 'Enregistrer', (v) {
                final p = _price(c, v['price']!);
                if (p == null) return;
                b
                  ..title = v['title']!
                  ..author = v['author']!
                  ..description = v['desc']!
                  ..price = p
                  ..format = v['format']!
                  ..fileUrl = v['url']!;
                app.changed();
              });
            },
          ),
          NavTile(
            icon: Icons.event_outlined,
            label: 'Ajouter un camp',
            sub: 'Dates, lieu et tarif restent « À confirmer » si vides.',
            onTap: () => formSheet(c, 'Nouveau camp', const [
              F('name', 'Nom du camp'),
              F('dates', 'Dates', optional: true),
              F('place', 'Lieu', optional: true),
              F('tariff', 'Tarif', optional: true),
              F('kairos', 'Camp National Kairos ? (oui / non)', optional: true),
            ], 'Publier', (v) {
              app.camps.add(Camp(id: app.nextId(), name: v['name']!, dates: v['dates']!, place: v['place']!,
                  tariff: v['tariff']!, kairos: v['kairos']!.toLowerCase() == 'oui'));
              app.changed();
            }),
          ),
          NavTile(
            icon: Icons.newspaper_outlined,
            label: 'Ajouter une actualité',
            sub: 'Titre, texte, date. Générale ou pour un établissement.',
            onTap: () async {
              final names = ['', ...app.etabs.map((e) => e.name)];
              final target = await pick<String>(c, 'Pour quel établissement ?', names, (s) => s.isEmpty ? 'Générale (toute la structure)' : s);
              if (target == null || !c.mounted) return;
              formSheet(c, 'Nouvelle actualité', const [F('title', 'Titre'), F('text', 'Texte', lines: 4)], 'Publier', (v) {
                app.news.insert(0, NewsItem(v['title']!, v['text']!, target, DateTime.now()));
                app.changed();
              });
            },
          ),
          NavTile(
            icon: Icons.school_outlined,
            label: 'Ajouter un établissement',
            sub: 'Il apparaît dans la liste et dans les profils.',
            onTap: () => formSheet(c, 'Nouvel établissement', const [F('name', 'Nom')], 'Ajouter', (v) {
              app.etabs.add(Etab(v['name']!));
              app.changed();
            }),
          ),
          NavTile(
            icon: Icons.playlist_add_check_outlined,
            label: 'Ajouter une activité',
            sub: 'À un établissement existant.',
            onTap: () async {
              final e = await pick<Etab>(c, 'Quel établissement ?', app.etabs, (e) => e.name);
              if (e == null || !c.mounted) return;
              formSheet(c, 'Nouvelle activité', const [F('a', 'Activité')], 'Ajouter', (v) {
                e.activities.add(v['a']!);
                app.changed();
              });
            },
          ),
          NavTile(
            icon: Icons.headphones_outlined,
            label: 'Ajouter un enseignement',
            sub: 'Titre, orateur, lien audio.',
            onTap: () => formSheet(c, 'Nouvel enseignement', const [
              F('title', 'Titre'),
              F('speaker', 'Orateur', optional: true),
              F('url', 'Lien audio', optional: true),
            ], 'Publier', (v) {
              app.teachings.insert(0, Teaching(v['title']!, v['speaker']!, v['url']!));
              app.changed();
            }),
          ),
          NavTile(
            icon: Icons.quiz_outlined,
            label: 'Ajouter une question de quiz',
            sub: 'Quatre choix, une seule bonne réponse.',
            onTap: () => formSheet(c, 'Nouvelle question', const [
              F('char', 'Personnage'),
              F('q', 'Question', lines: 2),
              F('a', 'Choix A'),
              F('b', 'Choix B'),
              F('c', 'Choix C'),
              F('d', 'Choix D'),
              F('ok', 'Bonne réponse (A, B, C ou D)'),
              F('ref', 'Référence du verset'),
              F('exp', 'Courte explication', optional: true),
            ], 'Ajouter', (v) {
              final idx = 'ABCD'.indexOf(v['ok']!.toUpperCase());
              if (idx < 0 || v['ok']!.length != 1) {
                toast(c, 'La bonne réponse doit être A, B, C ou D.');
                return;
              }
              app.quiz.add(QuizQ(v['char']!, v['q']!, [v['a']!, v['b']!, v['c']!, v['d']!], idx, v['ref']!, v['exp']!));
              app.changed();
            }),
          ),
          NavTile(
            icon: Icons.people_outlined,
            label: 'Ajouter un responsable du Bureau',
            sub: 'Le contact ne s’affiche qu’avec son accord.',
            onTap: () => formSheet(c, 'Nouveau responsable', const [
              F('name', 'Nom'),
              F('role', 'Fonction'),
              F('contact', 'Contact', optional: true),
              F('consent', 'Accord pour afficher le contact ? (oui / non)', optional: true),
            ], 'Ajouter', (v) {
              app.bureau.add(BureauMember(v['name']!, v['role']!, v['contact']!, v['consent']!.toLowerCase() == 'oui'));
              app.changed();
            }),
          ),
        ]),
        const SizedBox(height: Cp.s3),
        SizedBox(
          height: 52,
          child: OutlinedButton(
            onPressed: () {
              app.isAdmin = false;
              app.changed();
              Navigator.of(c).pop();
            },
            child: const Text('Quitter l’espace structure'),
          ),
        ),
      ]);
    });
  }
}
