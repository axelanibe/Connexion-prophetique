// Tests de la tranche T17, correctifs écarts du 26 nov. 2026.
// Les données ci-dessous sont des données de test, jamais
// les vraies données d'Axel.
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';

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

Future<void> _pomperAccueil(WidgetTester tester) async {
  // Charge la vraie police : sans elle, le test mesure avec
  // la police de repli, deux fois plus large, et le libellé
  // ne tient jamais, même corrigé.
  final chargeur = FontLoader('Public Sans');
  chargeur.addFont(rootBundle.load('assets/fonts/PublicSans-700.ttf'));
  await chargeur.load();
  await tester.pump();
  // Largeur téléphone 390 px, hauteur 2400 px : la ListView
  // construit toute la page d'un coup, les débordements
  // horizontaux restent détectés.
  tester.view.physicalSize = const Size(390, 2400);
  tester.view.devicePixelRatio = 1.0;
  addTearDown(tester.view.resetPhysicalSize);
  await tester.pumpWidget(MaterialApp(
    // Thème réel de l'application : le libellé hérite de
    // Public Sans par labelLarge, comme en production
    // où buildTheme le fixe par Ux.body.
    theme: ThemeData(
      textTheme: const TextTheme(
        bodyMedium: TextStyle(fontFamily: 'Public Sans'),
        labelLarge: TextStyle(fontFamily: 'Public Sans'),
      ),
    ),
    home: Scaffold(
      body: PageAccueil(
        versetPriere: _versetTest,
        quiz: _quizTest,
        activites: const [],
        bandeStories: const SizedBox.shrink(),
      ),
    ),
  ));
  await tester.pump();
  expect(tester.takeException(), isNull);
}

void main() {
  group('T17, correctifs écarts', () {
    testWidgets('Prière du jour : Ouvrir dans la Bible tient à 390 px, sans ellipse', (tester) async {
      await _pomperAccueil(tester);
      expect(find.text('Écouter'), findsOneWidget);
      expect(find.text('Partager'), findsOneWidget);
      expect(find.text('Ouvrir dans la Bible'), findsOneWidget);
      // Le libellé a maxLines 1 avec ellipse : s'il ne tient
      // pas, le paragraphe dépasse sa ligne, sinon non.
      final paragraphe = tester.renderObject<RenderParagraph>(find.text('Ouvrir dans la Bible'));
      expect(paragraphe.didExceedMaxLines, isFalse);
      expect(tester.takeException(), isNull);
    });

    testWidgets('coquille : le corps a 80 px de marge basse, au-dessus du bouton Assistant', (tester) async {
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      await tester.pumpWidget(MaterialApp(
        home: NouvelleCoquille(
          membre: _membreTest,
          accueil: const Text('Contenu accueil test'),
        ),
      ));
      await tester.pumpAndSettle();
      // La marge basse de 80 px enveloppe le corps, au-dessus
      // de la bande de 64 px du bouton flottant Assistant.
      expect(
        find.ancestor(
          of: find.text('Contenu accueil test'),
          matching: find.byWidgetPredicate(
            (w) => w is Padding && w.padding == const EdgeInsets.only(bottom: 80),
          ),
        ),
        findsOneWidget,
      );
      expect(tester.takeException(), isNull);
    });
  });
}
