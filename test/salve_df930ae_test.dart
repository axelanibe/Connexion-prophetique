// Tests de la salve 28 nov. 2026, base df930ae : recherche
// messagerie, pastille des appels manqués, élections membres,
// journal à 5 onglets, notifications regroupées avec réessai.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/messagerie.dart';
import 'package:connexion_prophetique/nouveau/modeles_messagerie.dart';
import 'package:connexion_prophetique/nouveau/modeles_t18.dart';
import 'package:connexion_prophetique/nouveau/page_election_membre.dart';
import 'package:connexion_prophetique/nouveau/page_journal.dart';
import 'package:connexion_prophetique/nouveau/page_messagerie.dart';
import 'package:connexion_prophetique/nouveau/page_notifications_connexion.dart';

import 'faux_connexion_salve.dart';

import 'nouveau_t18_test.dart' show FauxServiceT18;

/// Faux service messagerie, données de test seulement.
class _FauxMessagerieSalve implements ServiceMessagerie {
  _FauxMessagerieSalve({this.enErreurRecherche = false});

  final bool enErreurRecherche;

  final _connus = const [
    MembreMessagerie(
        id: 'm-awa',
        nomComplet: 'Awa Marie Diallo',
        matricule: 'CP-AM-0001',
        etablissement: 'ISPAM'),
    MembreMessagerie(
        id: 'm-jean',
        nomComplet: 'Jean Aka Yao',
        matricule: 'CP-JA-0002',
        etablissement: 'ISPAM'),
  ];

  @override
  Future<String?> monMembreId() async => 'moi';

  @override
  Future<List<ConversationMessagerie>> chargerConversations() async => [
        ConversationMessagerie(
          id: 'c-a',
          type: 'directe',
          autreNom: 'Test Directe A',
          autreMatricule: 'CP-TA-0001',
          dernierMessage: 'Bonjour, test.',
          lastMessageAt: DateTime(2026, 11, 26, 10, 0),
        ),
      ];

  @override
  Future<Map<String, bool>> chargerPresence(
          List<ConversationMessagerie> conversations) async =>
      {'c-a': true};

  @override
  Future<List<AppelMessagerie>> chargerAppels() async {
    final recent = DateTime.now().subtract(const Duration(minutes: 5));
    return [
      AppelMessagerie(
        id: 'ap1',
        conversationId: 'c-a',
        appelantId: 'autre-a',
        autreNom: 'Test Directe A',
        type: 'audio',
        manque: true,
        creeLe: recent,
      ),
      AppelMessagerie(
        id: 'ap2',
        conversationId: 'c-a',
        appelantId: 'autre-a',
        autreNom: 'Test Directe A',
        type: 'video',
        manque: true,
        creeLe: recent,
      ),
    ];
  }

  @override
  Future<List<MessageMessagerie>> chargerMessages(
          String conversationId) async =>
      const [];

  @override
  Future<MessageMessagerie> envoyerMessage(
          String conversationId, String texte) async =>
      MessageMessagerie(
        id: 'm-envoye',
        conversationId: conversationId,
        senderId: 'moi',
        content: texte,
        type: 'text',
        createdAt: DateTime(2026, 11, 26, 9, 30),
      );

  @override
  Future<void> marquerLue(String conversationId) async {}

  @override
  Future<List<MembreMessagerie>> rechercherMembres(String q) async {
    if (enErreurRecherche) throw Exception('test');
    if (q.isEmpty) return List.of(_connus);
    final s = q.toLowerCase();
    return _connus
        .where((m) => m.nomComplet.toLowerCase().contains(s))
        .toList();
  }

  @override
  Future<ConversationMessagerie> creerConversationDirecte(
          String membreId) async =>
      (await chargerConversations()).first;

  @override
  Future<Map<String, dynamic>> appeler(String conversationId,
          {required String type}) async =>
      {'id': 'appel-test', 'type': type};

  @override
  Future<Map<String, dynamic>?> appelActif(String conversationId) async =>
      null;

  @override
  Future<void> signaler(
          {required String cibleType,
          required String cibleId,
          required String motif}) async {}
}

Future<void> _ouvrirMessagerie(
    WidgetTester tester, ServiceMessagerie service) async {
  SharedPreferences.setMockInitialValues({});
  await tester.pumpWidget(
    MaterialApp(home: PageMessagerie(service: service)),
  );
  await tester.pumpAndSettle();
}

void main() {
  group('Salve : recherche messagerie', () {
    testWidgets('les membres connus s’affichent sans rien taper',
        (tester) async {
      await _ouvrirMessagerie(tester, _FauxMessagerieSalve());
      await tester.tap(find.byKey(const ValueKey('fabNouvelleDiscussion')));
      await tester.pumpAndSettle();
      expect(find.text('Dès 1 lettre, un prénom ou un mot du nom suffit.'),
          findsOneWidget);
      expect(find.text('Awa Marie Diallo'), findsOneWidget);
      expect(find.text('Jean Aka Yao'), findsOneWidget);
    });

    testWidgets('un mot au milieu du nom suffit, dès 1 lettre',
        (tester) async {
      await _ouvrirMessagerie(tester, _FauxMessagerieSalve());
      await tester.tap(find.byKey(const ValueKey('fabNouvelleDiscussion')));
      await tester.pumpAndSettle();
      await tester.enterText(find.byType(TextField).first, 'marie');
      await tester.pump(const Duration(milliseconds: 500));
      await tester.pumpAndSettle();
      expect(find.text('Awa Marie Diallo'), findsOneWidget);
      expect(find.text('Jean Aka Yao'), findsNothing);
    });

    testWidgets('rien trouvé : message visible, pas un écran vide',
        (tester) async {
      await _ouvrirMessagerie(tester, _FauxMessagerieSalve());
      await tester.tap(find.byKey(const ValueKey('fabNouvelleDiscussion')));
      await tester.pumpAndSettle();
      await tester.enterText(find.byType(TextField).first, 'zz');
      await tester.pump(const Duration(milliseconds: 500));
      await tester.pumpAndSettle();
      expect(find.text('Aucun membre trouvé pour « zz ».'),
          findsOneWidget);
    });

    testWidgets('échec de recherche : message visible', (tester) async {
      await _ouvrirMessagerie(
          tester, _FauxMessagerieSalve(enErreurRecherche: true));
      await tester.tap(find.byKey(const ValueKey('fabNouvelleDiscussion')));
      await tester.pumpAndSettle();
      expect(
          find.text('La liste des membres ne peut pas être chargée.'),
          findsOneWidget);
    });
  });

  group('Salve : pastille des appels manqués', () {
    testWidgets('la pastille disparaît quand on ouvre l’onglet Appels',
        (tester) async {
      await _ouvrirMessagerie(tester, _FauxMessagerieSalve());
      expect(find.byKey(const ValueKey('badgeAppelsManques')),
          findsOneWidget);
      expect(find.text('2'), findsWidgets);
      await tester.tap(find.byKey(const ValueKey('ongletAppels')));
      await tester.pumpAndSettle();
      expect(find.byKey(const ValueKey('badgeAppelsManques')),
          findsNothing);
    });
  });

  group('Salve : élections membres', () {
    ElectionMembre _election({bool aVote = false}) => ElectionMembre(
          id: 'e1',
          titre: 'Élection du Bureau',
          poste: 'Président',
          dateDebut: DateTime(2026, 11, 27),
          dateFin: DateTime(2026, 11, 29),
          candidats: const [
            CandidatMembre(id: 'c1', nom: 'Awa Diallo', voix: 3),
            CandidatMembre(id: 'c2', nom: 'Jean Aka', voix: 1),
          ],
          totalVoix: 4,
          aVote: aVote,
          monCandidatId: aVote ? 'c1' : null,
        );

    testWidgets('scores en direct et boutons Voter', (tester) async {
      final service = FauxServiceT18()..electionActuelle = _election();
      await tester.pumpWidget(
        MaterialApp(home: Scaffold(body: PageElectionMembre(service: service))),
      );
      await tester.pumpAndSettle();
      expect(find.text('Élection du Bureau'), findsOneWidget);
      expect(find.text('Scores en direct'), findsOneWidget);
      expect(find.text('Awa Diallo'), findsOneWidget);
      expect(find.text('3 voix'), findsOneWidget);
      expect(find.text('1 voix'), findsOneWidget);
      expect(find.textContaining('4 voix'), findsOneWidget);
      expect(find.text('Voter'), findsNWidgets(2));
    });

    testWidgets('voter confirme puis enregistre', (tester) async {
      final service = FauxServiceT18()..electionActuelle = _election();
      await tester.pumpWidget(
        MaterialApp(home: Scaffold(body: PageElectionMembre(service: service))),
      );
      await tester.pumpAndSettle();
      await tester.tap(find.text('Voter').first);
      await tester.pumpAndSettle();
      expect(find.text('Voter pour Awa Diallo'), findsOneWidget);
      await tester.tap(find.descendant(
        of: find.byType(AlertDialog),
        matching: find.text('Voter'),
      ));
      await tester.pumpAndSettle();
      expect(find.text('Vote enregistré.'), findsOneWidget);
    });

    testWidgets('déjà voté : ton vote est affiché, plus de bouton',
        (tester) async {
      final service = FauxServiceT18()..electionActuelle = _election(aVote: true);
      await tester.pumpWidget(
        MaterialApp(home: Scaffold(body: PageElectionMembre(service: service))),
      );
      await tester.pumpAndSettle();
      expect(find.text('Ton vote : Awa Diallo.'), findsOneWidget);
      expect(find.text('Voter'), findsNothing);
    });

    testWidgets('hors période : aucune élection en cours', (tester) async {
      final service = FauxServiceT18()..electionActuelle = null;
      await tester.pumpWidget(
        MaterialApp(home: Scaffold(body: PageElectionMembre(service: service))),
      );
      await tester.pumpAndSettle();
      expect(find.text('Aucune élection en cours.'), findsOneWidget);
    });
  });

  group('Salve : journal', () {
    testWidgets('5 onglets, bilan privé, recherche', (tester) async {
      SharedPreferences.setMockInitialValues({});
      await tester.pumpWidget(
        const MaterialApp(home: Scaffold(body: PageJournal())),
      );
      await tester.pumpAndSettle();
      // Les onglets sont des ChoiceChip dans une ListView : ils ne
      // sont construits qu'une fois visibles, on défile jusqu'à eux.
      // Les libellés existent aussi dans le bilan, d'où findsWidgets.
      await tester.drag(
        find.byType(ListView).first,
        const Offset(0, -600),
      );
      await tester.pumpAndSettle();
      for (final onglet in [
        'Rêves',
        'Projets',
        'Orientations',
        'Messages',
        'Notes libres',
      ]) {
        expect(find.text(onglet), findsWidgets);
      }
      expect(find.text('Bilan privé'), findsOneWidget);
      expect(
          find.byWidgetPredicate((w) =>
              w is TextField &&
              w.decoration?.hintText ==
                  'Rechercher par mot, par date, par catégorie…'),
          findsOneWidget);
    });
  });

  group('Salve : notifications', () {
    testWidgets('regroupement par date, pastille non lu', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: PageNotificationsConnexion(service: FauxConnexionSalve()),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('Aujourd’hui'), findsOneWidget);
      expect(find.text('Hier'), findsOneWidget);
      // Le nom est rendu en Text.rich, pas en Text simple.
      expect(find.textContaining('Awa Diallo'), findsOneWidget);
      expect(find.text('Tout marquer lu'), findsOneWidget);
    });

    testWidgets('échec de chargement : bouton Réessayer', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: PageNotificationsConnexion(
              service: FauxConnexionSalve(enErreur: true)),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('Réessayer'), findsOneWidget);
    });
  });
}
