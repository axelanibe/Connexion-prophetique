// Aide de la structure, écrans, 21 nov. 2026, carte 4.
//
// Sans serveur réel : l'API est simulée par un client HTTP en
// mémoire, comme dans conversation_tablette_test.dart.
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/messagerie.dart';
import 'package:connexion_prophetique/messagerie_screens.dart';

void main() {
  late ApiClient client;

  setUp(() {
    SharedPreferences.setMockInitialValues({});
    app.member = Member(
      'Test',
      'CP-TT-2526',
      'Céleste',
      DateTime(2026, 1, 1),
      fonction: 'Membre',
      statutAdhesion: 'validee',
    );
    app.lang = 'fr';
    app.isAdmin = false;
    final demandes = [
      {
        'id': 'c1',
        'type': 'aide',
        'title': 'Aide : Problème',
        'motif': 'probleme',
        'statut': 'ouvert',
        'demandeur_nom': 'Test',
        'demandeur_matricule': 'CP-TT-2526',
        'created_at': '2026-11-21T12:00:00.000Z',
        'last_message_at': '2026-11-21T12:05:00.000Z',
      },
    ];
    final mock = MockClient((http.Request request) async {
      if (request.url.path == '/aide/mes-demandes') {
        return http.Response(jsonEncode(demandes), 200);
      }
      if (request.url.path == '/moi') {
        return http.Response(jsonEncode({'id': 'moi'}), 200);
      }
      if (request.url.path == '/messagerie/conversations/c1/messages') {
        return http.Response('[]', 200);
      }
      return http.Response('[]', 200);
    });
    client = ApiClient(client: mock);
  });

  tearDown(() {
    app.member = null;
    app.isAdmin = false;
  });

  testWidgets('mes demandes, client factice : une demande ouverte', (
    tester,
  ) async {
    await tester.pumpWidget(MaterialApp(home: AideScreen(apiClient: client)));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 100));
    await tester.pump(const Duration(milliseconds: 100));
    expect(find.text('Aide : Problème'), findsOneWidget);
    expect(find.textContaining('Ouvert'), findsOneWidget);
    expect(find.text('Nouvelle demande'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('demande résolue, membre : pas de saisie, rouvrir proposé', (
    tester,
  ) async {
    const conversation = ConversationMessagerie(
      id: 'c1',
      type: 'aide',
      title: 'Aide : Problème',
      aideStatut: 'resolu',
      aideMotif: 'probleme',
    );
    await tester.pumpWidget(
      MaterialApp(
        home: MessagerieConversationScreen(
          conversation: conversation,
          titre: 'Aide : Problème',
          monMembreId: 'moi',
          apiClient: client,
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 100));
    await tester.pump(const Duration(milliseconds: 100));
    expect(find.text('Problème · Résolu'), findsOneWidget);
    expect(find.byType(TextField), findsNothing);
    expect(find.text('Rouvrir ma demande'), findsNWidgets(2));
    expect(tester.takeException(), isNull);
  });

  testWidgets('demande résolue, responsable : la saisie reste, statut changeable', (
    tester,
  ) async {
    const conversation = ConversationMessagerie(
      id: 'c1',
      type: 'aide',
      title: 'Aide : Problème',
      aideStatut: 'resolu',
      aideMotif: 'probleme',
    );
    await tester.pumpWidget(
      MaterialApp(
        home: MessagerieConversationScreen(
          conversation: conversation,
          titre: 'Aide : Problème',
          monMembreId: 'admin',
          apiClient: client,
          estResponsable: true,
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 100));
    await tester.pump(const Duration(milliseconds: 100));
    expect(find.text('Problème · Résolu'), findsOneWidget);
    expect(find.text('Statut'), findsOneWidget);
    expect(find.byType(TextField), findsOneWidget);
    expect(find.text('Rouvrir ma demande'), findsNothing);
    expect(tester.takeException(), isNull);
  });
}
