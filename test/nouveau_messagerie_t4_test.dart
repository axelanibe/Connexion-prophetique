// Tests de la tranche T4, nouvelle Messagerie, 26 nov. 2026.
// Les données ci-dessous sont des données de test, jamais
// les vraies données d'Axel. Faux service, comme les tests
// T1, T2 et T3 avec leurs rappels injectés.
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/messagerie.dart';
import 'package:connexion_prophetique/nouveau/modeles_messagerie.dart';
import 'package:connexion_prophetique/nouveau/page_messagerie.dart';

ConversationMessagerie _conv({
  required String id,
  required String type,
  String? title,
  String? autreNom,
  String? autreMatricule,
  String? dernierMessage,
  int nonLus = 0,
  bool reponsesDesactivees = false,
  int? nbMembres,
  DateTime? lastMessageAt,
}) =>
    ConversationMessagerie(
      id: id,
      type: type,
      title: title,
      autreNom: autreNom,
      autreMatricule: autreMatricule,
      dernierMessage: dernierMessage,
      nonLus: nonLus,
      reponsesDesactivees: reponsesDesactivees,
      nbMembres: nbMembres,
      lastMessageAt: lastMessageAt ?? DateTime(2026, 11, 26, 10, 0),
    );

// Données de test seulement.
final _conversationsTest = [
  _conv(
    id: 'c-structure',
    type: 'groupe_structure',
    title: 'CONNEXION PROPHÉTIQUE',
    dernierMessage: 'Annonce de test.',
    reponsesDesactivees: true,
    nbMembres: 120,
  ),
  _conv(
    id: 'c-a',
    type: 'directe',
    autreNom: 'Test Directe A',
    autreMatricule: 'CP-TA-0001',
    dernierMessage: 'Bonjour, test.',
    nonLus: 1,
  ),
  _conv(
    id: 'c-b',
    type: 'directe',
    autreNom: 'Test Directe B',
    autreMatricule: 'CP-TB-0002',
    dernierMessage: 'À demain, test.',
  ),
  _conv(
    id: 'c-jeunesse',
    type: 'groupe_structure',
    title: 'Jeunesse CP (test)',
    dernierMessage: 'Message de test du groupe.',
    nbMembres: 24,
  ),
  _conv(
    id: 'c-chaine',
    type: 'groupe_etablissement',
    title: 'Chaîne de prière (test)',
    dernierMessage: 'Message de test de la chaîne.',
    nbMembres: 18,
  ),
];

AppelMessagerie _appel({
  required String id,
  required String conversationId,
  required String appelantId,
  required String autreNom,
  required String type,
  required bool manque,
  DateTime? reponduLe,
}) =>
    AppelMessagerie(
      id: id,
      conversationId: conversationId,
      appelantId: appelantId,
      autreNom: autreNom,
      type: type,
      manque: manque,
      creeLe: DateTime(2026, 11, 26, 9, 0),
      reponduLe: reponduLe,
    );

// Données de test seulement : deux manqués, un sortant,
// un entrant répondu.
final _appelsTest = [
  _appel(
      id: 'ap1',
      conversationId: 'c-a',
      appelantId: 'autre-a',
      autreNom: 'Test Directe A',
      type: 'audio',
      manque: true),
  _appel(
      id: 'ap2',
      conversationId: 'c-b',
      appelantId: 'autre-b',
      autreNom: 'Test Directe B',
      type: 'video',
      manque: true),
  _appel(
      id: 'ap3',
      conversationId: 'c-a',
      appelantId: 'moi',
      autreNom: 'Test Directe A',
      type: 'audio',
      manque: false),
  _appel(
      id: 'ap4',
      conversationId: 'c-b',
      appelantId: 'autre-b',
      autreNom: 'Test Directe B',
      type: 'audio',
      manque: false,
      reponduLe: DateTime(2026, 11, 26, 9, 5)),
];

MessageMessagerie _msg({
  required String id,
  required String senderId,
  required String content,
  String type = 'text',
}) =>
    MessageMessagerie(
      id: id,
      conversationId: 'c-a',
      senderId: senderId,
      content: content,
      type: type,
      createdAt: DateTime(2026, 11, 26, 9, 30),
    );

class _FauxServiceMessagerie implements ServiceMessagerie {
  final messages = <MessageMessagerie>[
    _msg(id: 'm1', senderId: 'autre-a', content: 'Bonjour, test.'),
    _msg(
        id: 'm2',
        senderId: 'autre-a',
        content: 'Message vocal · 0:08',
        type: 'audio'),
    _msg(id: 'm3', senderId: 'autre-a', content: 'audio', type: 'appel_manque'),
    _msg(id: 'm4', senderId: 'moi', content: 'Bien reçu, test.'),
  ];
  final appelsLances = <(String, String)>[];
  final lus = <String>[];

  @override
  Future<String?> monMembreId() async => 'moi';

  @override
  Future<List<ConversationMessagerie>> chargerConversations() async =>
      List.of(_conversationsTest);

  @override
  Future<Map<String, bool>> chargerPresence(
          List<ConversationMessagerie> conversations) async =>
      {'c-a': true, 'c-b': false};

  @override
  Future<List<AppelMessagerie>> chargerAppels() async =>
      List.of(_appelsTest);

  @override
  Future<List<MessageMessagerie>> chargerMessages(
          String conversationId) async =>
      conversationId == 'c-a' ? List.of(messages) : const [];

  @override
  Future<MessageMessagerie> envoyerMessage(
      String conversationId, String texte) async {
    final message = _msg(
        id: 'm-envoye', senderId: 'moi', content: texte);
    messages.add(message);
    return message;
  }

  @override
  Future<void> marquerLue(String conversationId) async {
    lus.add(conversationId);
  }

  @override
  Future<List<MembreMessagerie>> rechercherMembres(String q) async =>
      const [];

  @override
  Future<ConversationMessagerie> creerConversationDirecte(
          String membreId) async =>
      _conversationsTest.first;

  @override
  Future<Map<String, dynamic>> appeler(String conversationId,
      {required String type}) async {
    appelsLances.add((conversationId, type));
    return {'id': 'appel-test', 'type': type};
  }

  @override
  Future<Map<String, dynamic>?> appelActif(String conversationId) async =>
      null;

  @override
  Future<void> signaler(
          {required String cibleType,
          required String cibleId,
          required String motif}) async {}
}

Future<void> _ouvrirMessagerie(WidgetTester tester) async {
  await tester.pumpWidget(
    MaterialApp(
      home: PageMessagerie(service: _FauxServiceMessagerie()),
    ),
  );
  await tester.pumpAndSettle();
}

void main() {
  testWidgets('T4 : ouverture directement sur Discussions',
      (tester) async {
    await _ouvrirMessagerie(tester);
    // Point 11, salve 28 nov. 2026 : la bande affiche le titre
    // de l'onglet, Discussions, plus jamais Messagerie.
    expect(find.text('Messagerie'), findsNothing);
    expect(find.text('Discussions'), findsWidgets);
    expect(find.byKey(const ValueKey('ongletDiscussions')), findsOneWidget);
    expect(find.byKey(const ValueKey('ongletAppels')), findsOneWidget);
    expect(find.byKey(const ValueKey('fabNouvelleDiscussion')),
        findsOneWidget);
    expect(find.byKey(const ValueKey('fabNouvelAppel')), findsNothing);
  });

  testWidgets('T4 : filtre Messages, structure épinglée en haut',
      (tester) async {
    await _ouvrirMessagerie(tester);
    expect(find.text('CONNEXION PROPHÉTIQUE'), findsOneWidget);
    expect(find.text('Test Directe A'), findsOneWidget);
    expect(find.text('Test Directe B'), findsOneWidget);
    expect(find.text('Jeunesse CP (test)'), findsNothing);
    expect(find.text('Chaîne de prière (test)'), findsNothing);
    final hautStructure = tester
        .getTopLeft(find.text('CONNEXION PROPHÉTIQUE'))
        .dy;
    final hautDirecte =
        tester.getTopLeft(find.text('Test Directe A')).dy;
    expect(hautStructure, lessThan(hautDirecte));
  });

  testWidgets('T4 : filtre Groupes, groupes à part avec leur nombre',
      (tester) async {
    await _ouvrirMessagerie(tester);
    await tester.tap(find.text('Groupes'));
    await tester.pumpAndSettle();
    expect(find.text('Jeunesse CP (test)'), findsOneWidget);
    expect(find.text('24 membres'), findsOneWidget);
    expect(find.text('Chaîne de prière (test)'), findsOneWidget);
    expect(find.text('18 membres'), findsOneWidget);
    expect(find.text('Test Directe A'), findsNothing);
    expect(find.text('CONNEXION PROPHÉTIQUE'), findsNothing);
    expect(find.text('En ligne'), findsNothing);
  });

  testWidgets('T4 : rangée en ligne visible en Messages, pas en Groupes',
      (tester) async {
    await _ouvrirMessagerie(tester);
    expect(find.text('En ligne'), findsOneWidget);
    await tester.tap(find.text('Tous'));
    await tester.pumpAndSettle();
    expect(find.text('Jeunesse CP (test)'), findsOneWidget);
    expect(find.text('Test Directe A'), findsOneWidget);
    expect(find.text('En ligne'), findsOneWidget);
  });

  testWidgets('T4 : volet Appels, badge 2 et manqués en rouge',
      (tester) async {
    // Micro accordé, sinon demanderAutorisationsAppel refuse
    // en test, sans canal natif, et l'appel ne part pas.
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
        .setMockMethodCallHandler(
      const MethodChannel('flutter.baseflow.com/permissions/methods'),
      (call) async {
        if (call.method == 'requestPermissions') return {7: 1};
        return null;
      },
    );
    final service = _FauxServiceMessagerie();
    final ecransOuverts = <Widget>[];
    await tester.pumpWidget(
      MaterialApp(
        home: PageMessagerie(
          service: service,
          onOuvrirAppelEnCours: (context, page) =>
              ecransOuverts.add(page),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.byKey(const ValueKey('badgeAppelsManques')),
        findsOneWidget);
    expect(find.text('2'), findsWidgets);
    await tester.tap(find.byKey(const ValueKey('ongletAppels')));
    await tester.pumpAndSettle();
    expect(find.byKey(const ValueKey('fabNouvelAppel')), findsOneWidget);
    expect(find.byKey(const ValueKey('fabNouvelleDiscussion')),
        findsNothing);
    expect(find.textContaining('Appel manqué'), findsNWidgets(2));
    expect(find.textContaining('Appel sortant'), findsOneWidget);
    expect(find.textContaining('Appel entrant'), findsOneWidget);
    expect(find.byKey(const ValueKey('rappeler-ap1')), findsOneWidget);
    await tester.tap(find.byKey(const ValueKey('rappeler-ap1')));
    await tester.pumpAndSettle();
    expect(service.appelsLances, contains(('c-a', 'audio')));
    expect(ecransOuverts, hasLength(1));
  });

  testWidgets('T4 : détail, modération, barre blanche et envoi',
      (tester) async {
    final service = _FauxServiceMessagerie();
    await tester.pumpWidget(
      MaterialApp(home: PageMessagerie(service: service)),
    );
    await tester.pumpAndSettle();
    await tester.tap(find.text('Test Directe A').first);
    await tester.pumpAndSettle();
    expect(find.text('Échanges modérés par la structure'),
        findsOneWidget);
    expect(find.text('En ligne'), findsOneWidget);
    expect(find.text('Appel manqué'), findsOneWidget);
    expect(find.text('Message vocal · 0:08'), findsOneWidget);
    final champ = find.byType(TextField);
    expect(champ, findsOneWidget);
    expect(
        tester.widget<TextField>(champ).decoration?.hintText,
        'Écrire un message');
    await tester.enterText(champ, 'Message de test.');
    await tester.tap(find.byKey(const ValueKey('boutonEnvoyerMessage')));
    await tester.pumpAndSettle();
    expect(find.text('Message de test.'), findsOneWidget);
    expect(service.lus, contains('c-a'));
  });

  testWidgets('T4 : discussion de la structure, réponses désactivées',
      (tester) async {
    await _ouvrirMessagerie(tester);
    await tester.tap(find.text('CONNEXION PROPHÉTIQUE'));
    await tester.pumpAndSettle();
    expect(
        find.text('Les réponses sont désactivées dans cette discussion.'),
        findsOneWidget);
    expect(find.byType(TextField), findsNothing);
  });
}
