// Questions de quiz ajoutées par la structure, tranche T20.
// Comme l'ancienne version : seules les questions ajoutées
// sont gérées ici, jamais la banque de départ. Elles entrent
// ensuite dans la rotation du quiz de l'accueil. Stockage
// local seulement, la structure n'a pas de route serveur
// pour les questions de quiz.
import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../models.dart' show Quiz, QuizQuestion;

/// Une question ajoutée par la structure : personnage,
/// question, quatre choix, bonne réponse, référence du
/// verset, courte explication facultative.
class QuestionQuizAjoutee {
  const QuestionQuizAjoutee({
    required this.id,
    required this.personnage,
    required this.question,
    required this.choix,
    required this.bonneReponse,
    required this.reference,
    this.explication = '',
  });

  factory QuestionQuizAjoutee.depuisJson(Map<String, dynamic> j) {
    final choixBruts = (j['choix'] as List?) ?? const [];
    final choix = choixBruts.map((c) => c.toString()).toList();
    while (choix.length < 4) {
      choix.add('');
    }
    final bonne = (j['bonne_reponse'] as num?)?.toInt() ?? 0;
    return QuestionQuizAjoutee(
      id: (j['id'] ?? '').toString(),
      personnage: (j['personnage'] ?? '').toString(),
      question: (j['question'] ?? '').toString(),
      choix: choix.take(4).toList(),
      bonneReponse: bonne.clamp(0, 3),
      reference: (j['reference'] ?? '').toString(),
      explication: (j['explication'] ?? '').toString(),
    );
  }

  final String id;
  final String personnage;
  final String question;
  final List<String> choix;

  /// Index du bon choix, 0 à 3, comme A à D.
  final int bonneReponse;
  final String reference;
  final String explication;

  Map<String, dynamic> versJson() => {
        'id': id,
        'personnage': personnage,
        'question': question,
        'choix': choix,
        'bonne_reponse': bonneReponse,
        'reference': reference,
        'explication': explication,
      };

  /// Une question ajoutée devient un quiz à une seule
  /// question, dans la rotation du quiz de l'accueil.
  Quiz versQuiz() => Quiz(
        id: 'ajoute-$id',
        character: personnage,
        questions: [
          QuizQuestion(
            character: personnage,
            question: question,
            choices: List.unmodifiable(choix),
            correctIndex: bonneReponse,
            verseReference: reference,
            explanation: explication,
          ),
        ],
      );
}

/// Validation du formulaire, comme l'ancienne version : la
/// bonne réponse doit être A, B, C ou D, un seul caractère.
String? validerQuestionQuizAjoutee({
  required String personnage,
  required String question,
  required List<String> choix,
  required String bonneReponse,
}) {
  if (personnage.trim().isEmpty) return 'Indiquez le personnage.';
  if (question.trim().isEmpty) return 'Indiquez la question.';
  if (choix.length < 4 || choix.any((c) => c.trim().isEmpty)) {
    return 'Indiquez les quatre choix.';
  }
  final lettre = bonneReponse.trim().toUpperCase();
  if (lettre.length != 1 || 'ABCD'.indexOf(lettre) < 0) {
    return 'La bonne réponse doit être A, B, C ou D.';
  }
  return null;
}

/// Stockage local des questions ajoutées.
class QuestionsQuizAjoutees {
  static const _cle = 'questions_quiz_ajoutees_v1';

  /// Lecture locale seule, jamais d'écriture en base.
  static Future<List<QuestionQuizAjoutee>> charger() async {
    final prefs = await SharedPreferences.getInstance();
    try {
      final raw = prefs.getString(_cle);
      if (raw == null || raw.isEmpty) return [];
      final data = jsonDecode(raw);
      if (data is! List) return [];
      return data
          .whereType<Map<String, dynamic>>()
          .map(QuestionQuizAjoutee.depuisJson)
          .where((q) => q.id.isNotEmpty && q.question.isNotEmpty)
          .toList();
    } catch (_) {
      return const [];
    }
  }

  static Future<void> _sauver(List<QuestionQuizAjoutee> liste) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      _cle,
      jsonEncode(liste.map((q) => q.versJson()).toList()),
    );
  }

  static Future<QuestionQuizAjoutee> ajouter(
    QuestionQuizAjoutee question,
  ) async {
    final liste = await charger();
    final avecId = question.id.isEmpty
        ? QuestionQuizAjoutee(
            id: DateTime.now().millisecondsSinceEpoch.toString(),
            personnage: question.personnage,
            question: question.question,
            choix: question.choix,
            bonneReponse: question.bonneReponse,
            reference: question.reference,
            explication: question.explication,
          )
        : question;
    liste.add(avecId);
    await _sauver(liste);
    return avecId;
  }

  static Future<void> modifier(
    String id,
    QuestionQuizAjoutee question,
  ) async {
    final liste = await charger();
    final i = liste.indexWhere((q) => q.id == id);
    if (i < 0) return;
    liste[i] = question;
    await _sauver(liste);
  }

  static Future<void> supprimer(String id) async {
    final liste = await charger();
    liste.removeWhere((q) => q.id == id);
    await _sauver(liste);
  }
}
