// Carte Quiz de l'accueil, tranche T2, 26 nov. 2026.
// Mêmes champs que l'ancien HomeQuiz, sans importer
// l'ancien écran. D'abord une carte d'appel avec le bouton
// Commencer, puis la question avec ses choix, puis le score.
// Les réponses partent par les rappels, l'état du jeu reste
// dans l'application, comme avant.
import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import 'palette.dart';

/// Question de quiz de l'accueil, mêmes champs que l'ancien
/// HomeQuiz. Données de l'application, jamais inventées.
class QuizAccueil {
  const QuizAccueil({
    required this.personnage,
    required this.indexQuestion,
    required this.nombreQuestions,
    required this.score,
    required this.question,
    required this.choix,
    required this.numeroQuiz,
    required this.totalQuiz,
    this.reponseChoisie,
    this.bonneReponse,
    this.estDerniere = false,
    this.termine = false,
    this.scoreFinal = 0,
    this.totalFinal = 0,
  });
  final String personnage, question;
  final int indexQuestion, nombreQuestions, score;
  final List<String> choix;
  final int numeroQuiz, totalQuiz;
  final int? reponseChoisie, bonneReponse;
  final bool estDerniere;
  final bool termine;
  final int scoreFinal, totalFinal;
}

class CarteQuizAccueil extends StatefulWidget {
  const CarteQuizAccueil({
    super.key,
    required this.quiz,
    this.onRepondre,
    this.onQuestionSuivante,
    this.onRecommencer,
    this.estAdmin = false,
    this.onAjouterQuestion,
    this.onGererQuestions,
  });
  final QuizAccueil quiz;
  final ValueChanged<int>? onRepondre;
  final VoidCallback? onQuestionSuivante;
  final VoidCallback? onRecommencer;

  /// Gestion des questions par l'administrateur général, T20 :
  /// ajouter et gérer, jamais la banque de départ.
  final bool estAdmin;
  final VoidCallback? onAjouterQuestion;
  final VoidCallback? onGererQuestions;

  @override
  State<CarteQuizAccueil> createState() => _CarteQuizAccueilState();
}

class _CarteQuizAccueilState extends State<CarteQuizAccueil> {
  /// La carte d'appel se retire au premier Commencer, pour
  /// ce quiz seulement : un autre quiz rouvre sa carte d'appel.
  bool _commence = false;

  @override
  void didUpdateWidget(covariant CarteQuizAccueil oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.quiz.numeroQuiz != widget.quiz.numeroQuiz) {
      _commence = false;
    }
  }

  @override
  Widget build(BuildContext context) {
    final quiz = widget.quiz;
    if (quiz.termine) return _score();
    if (!_commence && quiz.indexQuestion == 1 && quiz.reponseChoisie == null) {
      return _appel();
    }
    return _question();
  }

  /// Carte d'appel, maquette : icône dorée et bouton
  /// Commencer en pilule bleu nuit.
  Widget _appel() {
    final quiz = widget.quiz;
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: PaletteNouvelle.or.withValues(alpha: 0.5), width: 1.2),
        boxShadow: [
          BoxShadow(
            color: PaletteNouvelle.bleuNuit.withValues(alpha: 0.06),
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: PaletteNouvelle.bleuNuit,
                  borderRadius: BorderRadius.circular(14),
                ),
                child: const Icon(LucideIcons.circleHelp, color: PaletteNouvelle.or, size: 24),
              ),
              const SizedBox(width: 12),
              const Expanded(
                child: Text(
                  'Quiz Bible',
                  style: TextStyle(color: PaletteNouvelle.bleuNuit, fontSize: 18, fontWeight: FontWeight.w800),
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                decoration: BoxDecoration(
                  color: PaletteNouvelle.or.withValues(alpha: 0.18),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  'Quiz ${quiz.numeroQuiz} sur ${quiz.totalQuiz}',
                  style: const TextStyle(color: PaletteNouvelle.orFonce, fontSize: 12, fontWeight: FontWeight.w800),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            height: 48,
            child: FilledButton(
              style: FilledButton.styleFrom(
                backgroundColor: PaletteNouvelle.bleuNuit,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
              ),
              onPressed: () => setState(() => _commence = true),
              child: const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text('Commencer',
                      style:
                          TextStyle(fontSize: 15, fontWeight: FontWeight.w700)),
                  SizedBox(width: 8),
                  Icon(LucideIcons.arrowRight, size: 16),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  /// Question en cours, même comportement que l'ancien quiz :
  /// choix par lettre, bonne réponse en vert, mauvaise en rouge,
  /// puis Question suivante ou Voir mon score.
  Widget _question() {
    final quiz = widget.quiz;
    final repondu = quiz.reponseChoisie != null;
    return Container(
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: PaletteNouvelle.or.withValues(alpha: 0.5), width: 1.2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: double.infinity,
            color: PaletteNouvelle.bleuNuit,
            padding: const EdgeInsets.fromLTRB(18, 18, 18, 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'QUIZ DU MOMENT',
                  style: TextStyle(color: PaletteNouvelle.or, fontSize: 12, fontWeight: FontWeight.w800, letterSpacing: 3),
                ),
                const SizedBox(height: 8),
                Text(
                  'Personnage : ${quiz.personnage}',
                  style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w800),
                ),
                const SizedBox(height: 6),
                Text(
                  'Question ${quiz.indexQuestion} sur ${quiz.nombreQuestions} · Score en cours : ${quiz.score}',
                  style: const TextStyle(color: Colors.white70, fontSize: 14),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  quiz.question,
                  style: const TextStyle(color: PaletteNouvelle.bleuNuit, fontSize: 17, fontWeight: FontWeight.w700, height: 1.3),
                ),
                const SizedBox(height: 16),
                for (var i = 0; i < quiz.choix.length; i++) ...[
                  _Choix(
                    lettre: String.fromCharCode(65 + i),
                    texte: quiz.choix[i],
                    etat: !repondu
                        ? 0
                        : (i == quiz.bonneReponse
                            ? 1
                            : (i == quiz.reponseChoisie ? 2 : 0)),
                    diminue: repondu && i != quiz.bonneReponse && i != quiz.reponseChoisie,
                    onTap: repondu ? null : () => widget.onRepondre?.call(i),
                  ),
                  if (i < quiz.choix.length - 1) const SizedBox(height: 10),
                ],
                if (repondu && widget.onQuestionSuivante != null) ...[
                  const SizedBox(height: 16),
                  SizedBox(
                    width: double.infinity,
                    height: 52,
                    child: FilledButton(
                      style: FilledButton.styleFrom(
                        backgroundColor: PaletteNouvelle.bleuNuit,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(26)),
                      ),
                      onPressed: widget.onQuestionSuivante,
                      child: Text(quiz.estDerniere ? 'Voir mon score' : 'Question suivante'),
                    ),
                  ),
                ],
                // Gestion directe façon artefact, comme l'ancien
                // quiz : administrateur général seulement, jamais
                // pour un membre ordinaire. La banque n'est jamais
                // touchée, seules les questions ajoutées sont gérées.
                if (widget.estAdmin) ...[
                  const SizedBox(height: 16),
                  const Divider(),
                  const SizedBox(height: 8),
                  SizedBox(
                    width: double.infinity,
                    height: 52,
                    child: OutlinedButton.icon(
                      onPressed: widget.onAjouterQuestion,
                      icon: const Icon(LucideIcons.plus),
                      label: const Text('Ajouter une question de quiz'),
                    ),
                  ),
                  const SizedBox(height: 10),
                  SizedBox(
                    width: double.infinity,
                    height: 52,
                    child: OutlinedButton(
                      onPressed: widget.onGererQuestions,
                      child: const Text('Gérer les questions ajoutées'),
                    ),
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }

  /// Score final, avec Recommencer.
  Widget _score() {
    final quiz = widget.quiz;
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: PaletteNouvelle.or.withValues(alpha: 0.5), width: 1.2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Quiz Bible',
            style: TextStyle(color: PaletteNouvelle.bleuNuit, fontSize: 18, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 8),
          Text(
            'Score : ${quiz.scoreFinal} / ${quiz.totalFinal}',
            style: const TextStyle(color: PaletteNouvelle.bleuNuit, fontSize: 16, fontWeight: FontWeight.w700),
          ),
          const SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            height: 48,
            child: FilledButton(
              style: FilledButton.styleFrom(
                backgroundColor: PaletteNouvelle.bleuNuit,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
              ),
              onPressed: widget.onRecommencer,
              child: const Text('Recommencer', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700)),
            ),
          ),
        ],
      ),
    );
  }
}

/// Un choix de réponse : 0 normal, 1 bonne réponse, 2 mauvaise.
class _Choix extends StatelessWidget {
  const _Choix({
    required this.lettre,
    required this.texte,
    required this.etat,
    required this.diminue,
    this.onTap,
  });
  final String lettre, texte;
  final int etat;
  final bool diminue;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final Color bordure;
    final Color fond;
    final Color couleurLettre;
    if (etat == 1) {
      bordure = const Color(0xFF1E7B34);
      fond = const Color(0xFFE6F4EA);
      couleurLettre = const Color(0xFF1E7B34);
    } else if (etat == 2) {
      bordure = const Color(0xFFB3261E);
      fond = const Color(0xFFFDECEA);
      couleurLettre = const Color(0xFFB3261E);
    } else {
      bordure = PaletteNouvelle.bleuNuit.withValues(alpha: 0.25);
      fond = Colors.white;
      couleurLettre = PaletteNouvelle.bleuNuit;
    }
    return Opacity(
      opacity: diminue ? 0.5 : 1,
      child: InkWell(
        borderRadius: BorderRadius.circular(14),
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
          decoration: BoxDecoration(
            color: fond,
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: bordure, width: 1.2),
          ),
          child: Row(
            children: [
              Container(
                width: 28,
                height: 28,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: couleurLettre.withValues(alpha: 0.12),
                  shape: BoxShape.circle,
                ),
                child: Text(
                  lettre,
                  style: TextStyle(color: couleurLettre, fontSize: 14, fontWeight: FontWeight.w800),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  texte,
                  style: const TextStyle(color: PaletteNouvelle.bleuNuit, fontSize: 15, fontWeight: FontWeight.w600),
                ),
              ),
              if (etat == 1) const Icon(Icons.check_circle_outlined, color: Color(0xFF1E7B34), size: 20),
              if (etat == 2) const Icon(Icons.cancel_outlined, color: Color(0xFFB3261E), size: 20),
            ],
          ),
        ),
      ),
    );
  }
}
