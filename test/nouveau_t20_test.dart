// Tests de la tranche T20, Accès rapides, 26 nov. 2026.
// Les données ci-dessous sont des données de test, jamais
// les vraies données d'Axel.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/app_models.dart';
import 'package:connexion_prophetique/nouveau/carte_quiz.dart';
import 'package:connexion_prophetique/nouveau/modeles_t9.dart';
import 'package:connexion_prophetique/nouveau/page_accueil.dart';
import 'package:connexion_prophetique/nouveau/page_camps.dart';
import 'package:connexion_prophetique/nouveau/partage_verset.dart';
import 'package:connexion_prophetique/nouveau/quiz_ajoutes.dart';
import 'package:connexion_prophetique/nouveau/service_t9.dart';

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

/// Faux service, pour la page Camps seulement : les
/// inscriptions sont fixées, la galerie ne touche pas le
/// réseau. Les autres membres de ServiceT9 ne sont jamais
/// appelés par cette page.
class _FauxServiceT9 implements ServiceT9 {
  _FauxServiceT9({List<InscriptionBadge> inscriptions = const []})
      : _inscriptions = inscriptions;

  final List<InscriptionBadge> _inscriptions;

  @override
  Future<void> chargerGalerie() async {}

  @override
  List<InscriptionBadge> get inscriptions =>
      List.unmodifiable(_inscriptions);

  @override
  Member? get membre => Member(
        'Membre Test',
        'CP-TEST-0000',
        '',
        DateTime(2025, 1, 1),
      );

  @override
  dynamic noSuchMethod(Invocation invocation) => super.noSuchMethod(
        invocation,
      );
}

List<ActiviteAVenir> _activitesTest() {
  final now = DateTime.now();
  return [
    ActiviteAVenir(
      titre: 'Camp de test',
      evenementId: 'camp-1',
      type: 'camp',
      dateDebut: now.add(const Duration(days: 2, hours: 3)),
      dateFin: now.add(const Duration(days: 5)),
      lieu: 'Abidjan',
      tarifFcfa: 60000,
      inscrits: 12,
      nombrePlaces: 50,
    ),
    ActiviteAVenir(
      titre: 'Retraite de test',
      evenementId: 'retraite-1',
      type: 'retraite',
      dateDebut: now.subtract(const Duration(days: 1)),
      dateFin: now.add(const Duration(days: 1)),
      lieu: 'Bonoua',
    ),
  ];
}

Future<void> _pomperAccueil(
  WidgetTester tester, {
  VersetPriere? verset = _versetTest,
  QuizAccueil? quiz = _quizTest,
  List<ActiviteAVenir>? activites,
  bool quizEstAdmin = false,
  VoidCallback? onAjouterQuestionQuiz,
  VoidCallback? onGererQuestionsQuiz,
  bool cotisationChargee = false,
  bool cotisationPayee = false,
  bool cotisationEnAttente = false,
  VoidCallback? onPayerCotisation,
  VoidCallback? onVoirCamps,
  VoidCallback? onPartager,
}) async {
  tester.view.physicalSize = const Size(390, 2400);
  tester.view.devicePixelRatio = 1.0;
  addTearDown(tester.view.resetPhysicalSize);
  await tester.pumpWidget(MaterialApp(
    home: Scaffold(
      body: PageAccueil(
        versetPriere: verset,
        quiz: quiz,
        activites: activites ?? _activitesTest(),
        quizEstAdmin: quizEstAdmin,
        onAjouterQuestionQuiz: onAjouterQuestionQuiz,
        onGererQuestionsQuiz: onGererQuestionsQuiz,
        cotisationChargee: cotisationChargee,
        cotisationPayee: cotisationPayee,
        cotisationEnAttente: cotisationEnAttente,
        onPayerCotisation: onPayerCotisation,
        onVoirCamps: onVoirCamps,
        onPartager: onPartager,
        bandeStories: const SizedBox.shrink(),
      ),
    ),
  ));
  await tester.pump();
  expect(tester.takeException(), isNull);
}

Future<void> _pomperCamps(
  WidgetTester tester, {
  List<ActiviteAVenir>? activites,
  ServiceT9? service,
  String? evenementInitialId,
}) async {
  tester.view.physicalSize = const Size(390, 844);
  tester.view.devicePixelRatio = 1.0;
  addTearDown(tester.view.resetPhysicalSize);
  await tester.pumpWidget(MaterialApp(
    home: Scaffold(
      body: PageCamps(
        activites: activites ?? _activitesTest(),
        service: service ?? _FauxServiceT9(),
        evenementInitialId: evenementInitialId,
      ),
    ),
  ));
  await tester.pumpAndSettle();
  expect(tester.takeException(), isNull);
}

void main() {
  group('T20, Accès rapides', () {
    testWidgets('quatre tuiles seulement, en grille, sans Librairie',
        (tester) async {
      await _pomperAccueil(tester);
      expect(find.text('Accès rapides'), findsOneWidget);
      for (final tuile in [
        'Structure',
        'Témoignages',
        'Cotisations',
        'Parole vivante',
      ]) {
        expect(find.text(tuile), findsOneWidget);
      }
      expect(find.text('Librairie'), findsNothing);
      // Une seule grille, deux colonnes, comme la maquette.
      expect(find.byType(GridView), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('cotisation à régler : bouton or, appel du paiement',
        (tester) async {
      var paiements = 0;
      await _pomperAccueil(
        tester,
        cotisationChargee: true,
        onPayerCotisation: () => paiements++,
      );
      expect(find.textContaining('à régler'), findsOneWidget);
      expect(
        find.text('Payer ma cotisation : 1 000 FCFA'),
        findsOneWidget,
      );
      await tester.ensureVisible(
        find.text('Payer ma cotisation : 1 000 FCFA'),
      );
      await tester.tap(find.text('Payer ma cotisation : 1 000 FCFA'));
      await tester.pump();
      expect(paiements, 1);
      expect(tester.takeException(), isNull);
    });

    testWidgets('cotisation payée : aucun bouton de paiement',
        (tester) async {
      await _pomperAccueil(
        tester,
        cotisationChargee: true,
        cotisationPayee: true,
      );
      expect(find.textContaining('payée'), findsOneWidget);
      expect(find.text('Payer ma cotisation : 1 000 FCFA'), findsNothing);
      expect(tester.takeException(), isNull);
    });

    testWidgets('cotisation en attente : libellé en attente',
        (tester) async {
      await _pomperAccueil(
        tester,
        cotisationChargee: true,
        cotisationEnAttente: true,
      );
      expect(find.textContaining('en attente de validation'), findsOneWidget);
      expect(find.text('Payer ma cotisation : 1 000 FCFA'), findsNothing);
      expect(tester.takeException(), isNull);
    });

    testWidgets('Voir tout et toucher une activité ouvrent les camps',
        (tester) async {
      var vues = 0;
      var touches = 0;
      final activites = [
        _activitesTest().first.avecTap(() => touches++),
      ];
      await _pomperAccueil(
        tester,
        activites: activites,
        onVoirCamps: () => vues++,
      );
      expect(find.text('Voir tout'), findsOneWidget);
      await tester.ensureVisible(find.text('Voir tout'));
      await tester.tap(find.text('Voir tout'));
      await tester.pump();
      expect(vues, 1);
      await tester.ensureVisible(find.text('Camp de test'));
      await tester.tap(find.text('Camp de test'));
      await tester.pump();
      expect(touches, 1);
      expect(tester.takeException(), isNull);
    });

    testWidgets('quiz admin : boutons ajouter et gérer, rappels appelés',
        (tester) async {
      var ajouts = 0;
      var gestions = 0;
      await _pomperAccueil(
        tester,
        quizEstAdmin: true,
        onAjouterQuestionQuiz: () => ajouts++,
        onGererQuestionsQuiz: () => gestions++,
      );
      await tester.tap(find.text('Commencer'));
      await tester.pump();
      expect(find.text('Ajouter une question de quiz'), findsOneWidget);
      expect(find.text('Gérer les questions ajoutées'), findsOneWidget);
      await tester.ensureVisible(find.text('Ajouter une question de quiz'));
      await tester.tap(find.text('Ajouter une question de quiz'));
      await tester.pump();
      await tester.ensureVisible(find.text('Gérer les questions ajoutées'));
      await tester.tap(find.text('Gérer les questions ajoutées'));
      await tester.pump();
      expect(ajouts, 1);
      expect(gestions, 1);
      expect(tester.takeException(), isNull);
    });

    testWidgets('quiz membre : aucun bouton admin', (tester) async {
      await _pomperAccueil(tester);
      await tester.tap(find.text('Commencer'));
      await tester.pump();
      expect(find.text('Ajouter une question de quiz'), findsNothing);
      expect(find.text('Gérer les questions ajoutées'), findsNothing);
      expect(tester.takeException(), isNull);
    });

    testWidgets('partager le verset ouvre la carte image',
        (tester) async {
      // Le bouton Partager de l'accueil appelle onPartager.
      var partages = 0;
      await _pomperAccueil(
        tester,
        quiz: null,
        activites: const [],
        onPartager: () => partages++,
      );
      await tester.tap(find.text('Partager'));
      await tester.pump();
      expect(partages, 1);
      // Le dialogue lui-même, avec ses deux choix.
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(
          body: Builder(
            builder: (context) => TextButton(
              onPressed: () => partagerVerset(context, _versetTest),
              child: const Text('Ouvrir le partage'),
            ),
          ),
        ),
      ));
      await tester.pump();
      await tester.tap(find.text('Ouvrir le partage'));
      await tester.pumpAndSettle();
      expect(find.text('Partager l’image'), findsOneWidget);
      expect(find.text('Partager le texte'), findsOneWidget);
      expect(find.text('PRIÈRE DU JOUR'), findsWidgets);
      expect(tester.takeException(), isNull);
    });
  });

  group('T20, page Camps', () {
    testWidgets('liste : camps, retraites, bouton S’inscrire',
        (tester) async {
      await _pomperCamps(tester);
      expect(find.text('Camps'), findsOneWidget);
      expect(find.text('Camp de test'), findsOneWidget);
      expect(find.text('Retraites en cours'), findsOneWidget);
      expect(find.text('Retraite de test'), findsOneWidget);
      expect(find.text('S’inscrire'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('détail : dates, tarif, bouton S’inscrire', (tester) async {
      await _pomperCamps(tester);
      await tester.tap(find.text('Camp de test'));
      await tester.pumpAndSettle();
      expect(find.text('Retour aux camps'), findsOneWidget);
      expect(find.textContaining('Tarif :'), findsOneWidget);
      expect(find.textContaining('inscrits'), findsOneWidget);
      expect(find.text('S’inscrire'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('détail : badge visible propose Voir mon badge',
        (tester) async {
      await _pomperCamps(
        tester,
        service: _FauxServiceT9(inscriptions: const [
          InscriptionBadge(
            evenementId: 'camp-1',
            nom: 'Camp de test',
            passVisible: true,
          ),
        ]),
      );
      await tester.tap(find.text('Camp de test'));
      await tester.pumpAndSettle();
      expect(find.text('Voir mon badge'), findsOneWidget);
      expect(find.text('S’inscrire'), findsNothing);
      expect(tester.takeException(), isNull);
    });

    testWidgets('détail : versement en attente propose le paiement',
        (tester) async {
      await _pomperCamps(
        tester,
        service: _FauxServiceT9(inscriptions: const [
          InscriptionBadge(
            evenementId: 'camp-1',
            nom: 'Camp de test',
            passVisible: false,
            tarifFcfa: 60000,
            montantPaye: 10000,
            versementEnAttenteReference: 'REF-TEST-1',
            versementEnAttenteMontant: 10000,
            versementEnAttenteNumero: 2,
          ),
        ]),
      );
      await tester.tap(find.text('Camp de test'));
      await tester.pumpAndSettle();
      expect(
        find.textContaining('Badge disponible après le paiement complet'),
        findsOneWidget,
      );
      expect(find.textContaining('Payer le versement n°2'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('ouverture directe depuis une activité', (tester) async {
      await _pomperCamps(tester, evenementInitialId: 'retraite-1');
      expect(find.text('Retour aux camps'), findsOneWidget);
      expect(find.text('Retraite de test'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  });

  group('T20, questions de quiz ajoutées', () {
    test('validation du formulaire', () {
      expect(
        validerQuestionQuizAjoutee(
          personnage: '',
          question: 'Question ?',
          choix: const ['A', 'B', 'C', 'D'],
          bonneReponse: 'A',
        ),
        isNotNull,
      );
      expect(
        validerQuestionQuizAjoutee(
          personnage: 'David',
          question: 'Question ?',
          choix: const ['A', 'B', 'C', ''],
          bonneReponse: 'A',
        ),
        isNotNull,
      );
      expect(
        validerQuestionQuizAjoutee(
          personnage: 'David',
          question: 'Question ?',
          choix: const ['A', 'B', 'C', 'D'],
          bonneReponse: 'E',
        ),
        isNotNull,
      );
      expect(
        validerQuestionQuizAjoutee(
          personnage: 'David',
          question: 'Question ?',
          choix: const ['A', 'B', 'C', 'D'],
          bonneReponse: 'b',
        ),
        isNull,
      );
    });

    test('ajouter, relire, convertir en quiz', () async {
      SharedPreferences.setMockInitialValues({});
      const question = QuestionQuizAjoutee(
        id: '',
        personnage: 'David',
        question: 'Qui a vaincu Goliath ?',
        choix: ['Saül', 'David', 'Salomon', 'Jonathan'],
        bonneReponse: 1,
        reference: '1 Samuel 17',
        explication: 'David, avec sa fronde.',
      );
      final ajoutee = await QuestionsQuizAjoutees.ajouter(question);
      expect(ajoutee.id, isNotEmpty);
      final relues = await QuestionsQuizAjoutees.charger();
      expect(relues.length, 1);
      expect(relues.first.personnage, 'David');
      final quiz = relues.first.versQuiz();
      expect(quiz.questions.length, 1);
      expect(quiz.questions.first.correctIndex, 1);
      expect(quiz.questions.first.verseReference, '1 Samuel 17');
      await QuestionsQuizAjoutees.supprimer(ajoutee.id);
      expect(await QuestionsQuizAjoutees.charger(), isEmpty);
    });
  });
}
