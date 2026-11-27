// Tests de la tranche T2, nouvel Accueil, 26 nov. 2026.
// Les données ci-dessous sont des données de test, jamais
// les vraies données d'Axel.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import 'package:connexion_prophetique/app_models.dart';
import 'package:connexion_prophetique/nouveau/carte_quiz.dart';
import 'package:connexion_prophetique/nouveau/coquille.dart';
import 'package:connexion_prophetique/nouveau/page_accueil.dart';

// Données de test seulement.
const _versetTest = VersetPriere(
  texte: 'Texte de test du verset.',
  reference: 'Philippiens 4, 6',
);

const _quizTest = QuizAccueil(
  personnage: 'Personnage de test',
  indexQuestion: 1,
  nombreQuestions: 5,
  score: 0,
  question: 'Question de test ?',
  choix: ['Choix A', 'Choix B', 'Choix C'],
  numeroQuiz: 1,
  totalQuiz: 3,
);

final _membreTest = Member(
  'Test Membre',
  'CP-TEST-0000',
  'Bureau national',
  DateTime(2025, 1, 1),
);

List<ActiviteAVenir> _activitesTest() {
  final now = DateTime.now();
  return [
    ActiviteAVenir(
      titre: 'Camp de test',
      dateDebut: now.add(const Duration(days: 2, hours: 3)),
      dateFin: now.add(const Duration(days: 5)),
      lieu: 'Abidjan',
    ),
    ActiviteAVenir(
      titre: 'Retraite en cours',
      dateDebut: now.subtract(const Duration(days: 1)),
      dateFin: now.add(const Duration(days: 1)),
      lieu: 'Bonoua',
    ),
    const ActiviteAVenir(titre: 'Activité à confirmer'),
    ActiviteAVenir(
      titre: 'Activité passée',
      dateDebut: now.subtract(const Duration(days: 5)),
      dateFin: now.subtract(const Duration(days: 4)),
    ),
  ];
}

Future<void> _pomper(
  WidgetTester tester, {
  VersetPriere? verset = _versetTest,
  QuizAccueil? quiz = _quizTest,
  List<ActiviteAVenir>? activites,
  ValueChanged<int>? onRepondre,
  VoidCallback? onQuestionSuivante,
  VoidCallback? onRecommencerQuiz,
  VoidCallback? onSearch,
  VoidCallback? onStructure,
  VoidCallback? onLibrairie,
}) async {
  // Fenêtre haute, 2400 px : la ListView ne construit que les
  // enfants visibles, la hauteur fait construire toute la page
  // d'un coup pour les vérifications. La largeur reste 390 px,
  // les débordements horizontaux sont donc toujours détectés.
  tester.view.physicalSize = const Size(390, 2400);
  tester.view.devicePixelRatio = 1.0;
  addTearDown(tester.view.resetPhysicalSize);
  await tester.pumpWidget(MaterialApp(
    home: Scaffold(
      body: PageAccueil(
        versetPriere: verset,
        quiz: quiz,
        activites: activites ?? _activitesTest(),
        onRepondre: onRepondre,
        onQuestionSuivante: onQuestionSuivante,
        onRecommencerQuiz: onRecommencerQuiz,
        onSearch: onSearch,
        onStructure: onStructure,
        onLibrairie: onLibrairie,
        bandeStories: const SizedBox.shrink(),
      ),
    ),
  ));
  await tester.pump();
  expect(tester.takeException(), isNull);
}

void main() {
  group('T2, nouvel Accueil', () {
    testWidgets('toutes les sections présentes, à 390 px, sans débordement', (tester) async {
      await _pomper(tester);
      expect(find.text('Rechercher…'), findsOneWidget);
      expect(find.text('PRIÈRE DU JOUR'), findsOneWidget);
      expect(find.text('Texte de test du verset.'), findsOneWidget);
      expect(find.text('Philippiens 4, 6'), findsOneWidget);
      expect(find.text('Écouter'), findsOneWidget);
      expect(find.text('Partager'), findsOneWidget);
      expect(find.text('Ouvrir dans la Bible'), findsOneWidget);
      expect(find.text('Quiz Bible'), findsOneWidget);
      expect(find.text('Commencer'), findsOneWidget);
      expect(find.text('Quiz 1 sur 3'), findsOneWidget);
      expect(find.text('Accès rapides'), findsOneWidget);
      for (final tuile in ['Structure', 'Témoignages', 'Cotisations', 'Parole vivante']) {
        expect(find.text(tuile), findsOneWidget);
      }
      expect(find.text('Librairie'), findsOneWidget);
      expect(find.text('Activités à venir'), findsOneWidget);
      expect(find.text('Camp de test'), findsOneWidget);
      expect(find.text('Retraite en cours'), findsOneWidget);
      expect(find.text('Activité à confirmer'), findsOneWidget);
      expect(find.text('Prochaine activité dans'), findsOneWidget);
      expect(find.text('En cours'), findsOneWidget);
      expect(find.text('À confirmer'), findsOneWidget);
      expect(find.text('Activité passée'), findsNothing);
      expect(tester.takeException(), isNull);
    });

    testWidgets('quiz : Commencer montre la question, répondre appelle le rappel', (tester) async {
      var reponses = <int>[];
      await _pomper(tester, onRepondre: (i) => reponses.add(i));
      expect(find.text('Question de test ?'), findsNothing);
      await tester.tap(find.text('Commencer'));
      await tester.pump();
      expect(find.text('Question de test ?'), findsOneWidget);
      expect(find.text('Choix A'), findsOneWidget);
      await tester.tap(find.text('Choix B'));
      await tester.pump();
      expect(reponses, [1]);
      expect(tester.takeException(), isNull);
    });

    testWidgets('quiz : après la réponse, Question suivante apparaît', (tester) async {
      var suivants = 0;
      await _pomper(
        tester,
        quiz: const QuizAccueil(
          personnage: 'Personnage de test',
          indexQuestion: 1,
          nombreQuestions: 5,
          score: 0,
          question: 'Question de test ?',
          choix: ['Choix A', 'Choix B', 'Choix C'],
          numeroQuiz: 1,
          totalQuiz: 3,
          reponseChoisie: 1,
          bonneReponse: 1,
        ),
        onQuestionSuivante: () => suivants++,
      );
      expect(find.text('Question suivante'), findsOneWidget);
      await tester.ensureVisible(find.text('Question suivante'));
      await tester.tap(find.text('Question suivante'));
      await tester.pump();
      expect(suivants, 1);
      expect(tester.takeException(), isNull);
    });

    testWidgets('quiz terminé : score et Recommencer', (tester) async {
      var recommencements = 0;
      await _pomper(
        tester,
        quiz: const QuizAccueil(
          personnage: 'Personnage de test',
          indexQuestion: 5,
          nombreQuestions: 5,
          score: 4,
          question: 'Question de test ?',
          choix: ['Choix A', 'Choix B', 'Choix C'],
          numeroQuiz: 1,
          totalQuiz: 3,
          termine: true,
          scoreFinal: 4,
          totalFinal: 5,
        ),
        onRecommencerQuiz: () => recommencements++,
      );
      expect(find.text('Score : 4 / 5'), findsOneWidget);
      expect(find.text('Recommencer'), findsOneWidget);
      await tester.ensureVisible(find.text('Recommencer'));
      await tester.tap(find.text('Recommencer'));
      await tester.pump();
      expect(recommencements, 1);
      expect(tester.takeException(), isNull);
    });

    testWidgets('sections masquées sans données', (tester) async {
      await _pomper(tester, verset: null, quiz: null, activites: const []);
      expect(find.text('Rechercher…'), findsOneWidget);
      expect(find.text('PRIÈRE DU JOUR'), findsNothing);
      expect(find.text('Quiz Bible'), findsNothing);
      expect(find.text('Activités à venir'), findsNothing);
      expect(find.text('Structure'), findsOneWidget);
      expect(find.text('Librairie'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('compte à rebours : avance chaque seconde', (tester) async {
      await _pomper(tester);
      final avant = tester.widget<Text>(find.byKey(const ValueKey('compteAReboursValeur'))).data;
      await tester.pump(const Duration(seconds: 2));
      final apres = tester.widget<Text>(find.byKey(const ValueKey('compteAReboursValeur'))).data;
      expect(avant, isNotNull);
      expect(apres, isNot(avant));
      expect(tester.takeException(), isNull);
    });

    testWidgets('rappels : recherche, tuiles et librairie', (tester) async {
      var recherches = 0;
      var structures = 0;
      var librairies = 0;
      await _pomper(
        tester,
        onSearch: () => recherches++,
        onStructure: () => structures++,
        onLibrairie: () => librairies++,
      );
      await tester.tap(find.text('Rechercher…'));
      await tester.pump();
      await tester.ensureVisible(find.text('Structure'));
      await tester.tap(find.text('Structure'));
      await tester.pump();
      await tester.ensureVisible(find.text('Librairie'));
      await tester.tap(find.text('Librairie'));
      await tester.pump();
      expect(recherches, 1);
      expect(structures, 1);
      expect(librairies, 1);
      expect(tester.takeException(), isNull);
    });

    testWidgets('coquille : onglet Accueil montre la page fournie', (tester) async {
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      await tester.pumpWidget(MaterialApp(
        home: NouvelleCoquille(
          membre: _membreTest,
          accueil: const Text('Accueil de test'),
        ),
      ));
      await tester.pumpAndSettle();
      expect(find.text('Accueil de test'), findsOneWidget);
      await tester.tap(find.byIcon(LucideIcons.bookOpen));
      await tester.pumpAndSettle();
      expect(find.text('Accueil de test'), findsNothing);
      expect(find.text('Bible'), findsWidgets);
      await tester.tap(find.byIcon(LucideIcons.home));
      await tester.pumpAndSettle();
      expect(find.text('Accueil de test'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  });
}
