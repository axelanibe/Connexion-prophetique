import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';
import 'models.dart';

/// Configuration de production.
///
/// Le domaine est déjà acheté : connexionprophetique.com.
/// Aucune clé API, aucun secret, aucun identifiant de compte marchand
/// ne doit figurer dans le code de l'application. Le secret webhook
/// Wave et la clé API Wave Business vivent côté serveur uniquement.
class AppConfig {
  static const String domain = 'connexionprophetique.com';
  static const String apiBaseUrl = 'https://api.connexionprophetique.com';
  static const String prayerEmail = 'cile0225@gmail.com';
  static const String prayerSubject = 'Sujet de prière - CONNEXION PROPHÉTIQUE';
}

/// Paiement Wave Business direct, sans agrégateur.
///
/// Le lien est fourni par la structure. Le montant exact est ajouté
/// avec le paramètre amount, en nombre entier, sans espace.
/// Exemple : https://pay.wave.com/m/.../c/ci/?amount=1000
/// Le lien ne marque jamais un paiement comme effectué. La demande
/// reste en attente tant que le serveur n'a pas confirmé le paiement
/// par webhook vérifié, ou que la structure n'a pas validé explicitement
/// après contrôle de son compte Wave.
class WavePaymentService {
  static const String baseLink =
      'https://pay.wave.com/m/M_ci_6r2wC06ngy-3/c/ci/';

  static Uri paymentLinkFor(PaymentRequest request) {
    return Uri.parse('$baseLink?amount=${request.amountFcfa}');
  }

  static Future<bool> openPayment(PaymentRequest request) async {
    final uri = paymentLinkFor(request);
    if (await canLaunchUrl(uri)) {
      return launchUrl(uri, mode: LaunchMode.externalApplication);
    }
    return false;
  }
}

/// Sujets de prière : e-mail seulement, sans enregistrement, sans mur.
class PrayerService {
  static Future<bool> openPrayerEmail(String message) async {
    final uri = Uri(
      scheme: 'mailto',
      path: AppConfig.prayerEmail,
      queryParameters: {
        'subject': AppConfig.prayerSubject,
        'body': message,
      },
    );
    if (await canLaunchUrl(uri)) {
      return launchUrl(uri);
    }
    return false;
  }
}

/// Cache hors ligne, après un premier chargement en ligne.
///
/// Ce qui reste consultable hors ligne : Bible déjà consultée, quiz
/// déjà chargés, carte de membre, camps, établissements, actualités
/// et enseignements en texte déjà consultés.
/// Ce qui exige internet : paiement Wave, inscription à un camp,
/// achat de librairie, envoi d'e-mail de prière, toute création ou
/// modification par la structure.
class OfflineCache {
  static const _prefix = 'offline_';

  static Future<void> save(String key, String json) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('$_prefix$key', json);
  }

  static Future<String?> read(String key) async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('$_prefix$key');
  }

  static Future<void> saveJson(String key, Map<String, dynamic> value) async {
    await save(key, jsonEncode(value));
  }

  static Future<Map<String, dynamic>?> readJson(String key) async {
    final raw = await read(key);
    if (raw == null) return null;
    return jsonDecode(raw) as Map<String, dynamic>;
  }
}

/// Quiz Bible : banque de départ, rotation, ajout par la structure.
///
/// La rotation propose un quiz différent chaque jour ou à chaque
/// nouvelle partie, sans répéter le même quiz tant que tous les
/// autres n'ont pas été proposés. Les nouveaux quiz ajoutés par la
/// structure entrent ensuite dans la rotation.
///
/// La banque complète du prototype (21 personnages, 80 questions en
/// français, 80 en anglais) est à importer ici dans une prochaine
/// étape de codage, à partir des données déjà validées du prototype.
/// La banque ci-dessous pose le moteur et les premiers personnages,
/// avec des faits bibliques connus et vérifiables, chacun avec sa
/// référence de verset.
class QuizService {
  static const List<Quiz> seedQuizzesFr = [
    Quiz(
      id: 'adam-eve-fr',
      character: 'Adam et Ève',
      questions: [
        QuizQuestion(
          character: 'Adam et Ève',
          question: 'Qui a été créé le premier, selon la Genèse ?',
          choices: ['Ève', 'Adam', 'Caïn', 'Abel'],
          correctIndex: 1,
          verseReference: 'Genèse 2:7',
          explanation: 'Dieu forma l’homme de la poussière de la terre.',
        ),
        QuizQuestion(
          character: 'Adam et Ève',
          question: 'Dans quel jardin Dieu plaça-t-il Adam et Ève ?',
          choices: ['Gethsémané', 'Éden', 'Goshen', 'Babel'],
          correctIndex: 1,
          verseReference: 'Genèse 2:8',
          explanation: 'Dieu planta un jardin en Éden.',
        ),
      ],
    ),
    Quiz(
      id: 'noe-fr',
      character: 'Noé',
      questions: [
        QuizQuestion(
          character: 'Noé',
          question: 'Que Dieu demanda-t-il à Noé de construire ?',
          choices: ['Un temple', 'Une arche', 'Une tour', 'Un autel'],
          correctIndex: 1,
          verseReference: 'Genèse 6:14',
          explanation: 'Dieu demanda à Noé de construire une arche.',
        ),
        QuizQuestion(
          character: 'Noé',
          question: 'Quel signe Dieu donna-t-il après le déluge ?',
          choices: ['Un arc-en-ciel', 'Une étoile', 'Un feu', 'Un vent'],
          correctIndex: 0,
          verseReference: 'Genèse 9:13',
          explanation: 'L’arc-en-ciel est le signe de l’alliance.',
        ),
      ],
    ),
    Quiz(
      id: 'david-fr',
      character: 'David',
      questions: [
        QuizQuestion(
          character: 'David',
          question: 'Contre qui David combattit-il avec une fronde ?',
          choices: ['Saül', 'Goliath', 'Absalom', 'Salomon'],
          correctIndex: 1,
          verseReference: '1 Samuel 17:49',
          explanation: 'David frappa Goliath avec une pierre de sa fronde.',
        ),
        QuizQuestion(
          character: 'David',
          question: 'Quel instrument David jouait-il devant Saül ?',
          choices: ['La trompette', 'La harpe', 'Le tambour', 'La flûte'],
          correctIndex: 1,
          verseReference: '1 Samuel 16:23',
          explanation: 'David prenait la harpe et en jouait de sa main.',
        ),
      ],
    ),
  ];

  /// Quiz du jour : rotation simple, sans répétition dans le cycle.
  /// Le jour de l'année choisit le quiz, dans l'ordre de la banque.
  static Quiz quizOfTheDay(List<Quiz> quizzes, DateTime now) {
    if (quizzes.isEmpty) {
      throw StateError('Aucun quiz disponible.');
    }
    final dayOfYear =
        now.difference(DateTime(now.year, 1, 1)).inDays;
    return quizzes[dayOfYear % quizzes.length];
  }

  /// Prochain quiz après celui qui vient d'être joué.
  static Quiz nextQuiz(List<Quiz> quizzes, Quiz current) {
    if (quizzes.isEmpty) {
      throw StateError('Aucun quiz disponible.');
    }
    final index = quizzes.indexWhere((q) => q.id == current.id);
    if (index < 0) return quizzes.first;
    return quizzes[(index + 1) % quizzes.length];
  }
}

/// Client API de production, à brancher sur le serveur.
///
/// En attendant le serveur, les écrans affichent les états vides
/// honnêtes. Aucun appel ne valide un paiement côté application.
class ApiClient {
  final String baseUrl;
  const ApiClient({this.baseUrl = AppConfig.apiBaseUrl});

  Uri uri(String path) => Uri.parse('$baseUrl$path');
}
