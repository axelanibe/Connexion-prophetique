// Messagerie, nom et photo de l'interlocuteur, 18 nov. 2026.
// La liste et l'en-tête montraient « Conversation directe »
// sans nom ni photo, et le bouton + de création restait
// invisible pour un membre connecté. Sans serveur réel : l'API
// est simulée par un client HTTP en mémoire, comme dans
// messagerie_test.dart.
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/app_models.dart';
import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/messagerie.dart';
import 'package:connexion_prophetique/messagerie_screens.dart';

/// PNG 1x1 valide, en data URL, pour la photo de l'autre membre.
const _photoPng =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

void main() {
  group('Modèle : autre participant', () {
    test('forme imbriquée autre, renvoyée par la route liste', () {
      final c = ConversationMessagerie.fromJson({
        'id': 'c1',
        'type': 'directe',
        'autre': {
          'nom': 'MARIE DUPONT',
          'matricule': 'CP-MD-2527',
          'photo': _photoPng,
        },
      });
      expect(c.autreNom, 'MARIE DUPONT');
      expect(c.autreMatricule, 'CP-MD-2527');
      expect(c.autrePhoto, _photoPng);
    });

    test('forme plate acceptée en repli', () {
      final c = ConversationMessagerie.fromJson({
        'id': 'c1',
        'type': 'directe',
        'autre_nom': 'MARIE DUPONT',
        'autre_matricule': 'CP-MD-2527',
        'autre_photo': null,
      });
      expect(c.autreNom, 'MARIE DUPONT');
      expect(c.autrePhoto, isNull);
    });

    test('groupes et pastorale : pas d’autre participant', () {
      for (final type in [
        'groupe_etablissement',
        'groupe_structure',
        'pastorale',
      ]) {
        final c = ConversationMessagerie.fromJson({
          'id': 'c1',
          'type': type,
          'autre': {'nom': 'MARIE DUPONT'},
        });
        expect(c.autreNom, 'MARIE DUPONT');
      }
      final sansAutre = ConversationMessagerie.fromJson({
        'id': 'c1',
        'type': 'directe',
      });
      expect(sansAutre.autreNom, isNull);
      expect(sansAutre.autrePhoto, isNull);
      expect(sansAutre.copyWith(nonLus: 2).autreNom, isNull);
    });

    test('copyWith garde l’autre participant', () {
      const c = ConversationMessagerie(
        id: 'c1',
        type: 'directe',
        autreNom: 'MARIE DUPONT',
        autreMatricule: 'CP-MD-2527',
        autrePhoto: _photoPng,
      );
      final copie = c.copyWith(nonLus: 3);
      expect(copie.autreNom, 'MARIE DUPONT');
      expect(copie.autrePhoto, _photoPng);
      expect(copie.nonLus, 3);
    });
  });

  group('Photo en data URL', () {
    test('data URL valide décodée, invalide rejetée', () {
      expect(photoDataUrlProvider(_photoPng), isA<MemoryImage>());
      expect(photoDataUrlProvider(null), isNull);
      expect(photoDataUrlProvider(''), isNull);
      expect(photoDataUrlProvider('pas-une-image'), isNull);
    });
  });

  group('Liste : nom et photo de l’autre membre', () {
    late ApiClient client;

    setUp(() {
      SharedPreferences.setMockInitialValues({});
      MessagerieLectureService.instance.reinitialiserPourTests();
      final mock = MockClient((http.Request request) async {
        final path = request.url.path;
        if (path == '/messagerie/conversations') {
          return http.Response(
            jsonEncode([
              {
                'id': 'c1',
                'type': 'directe',
                'last_message_at': '2026-11-16T10:00:00.000Z',
                'autre': {
                  'nom': 'MARIE DUPONT',
                  'matricule': 'CP-MD-2527',
                  'photo': _photoPng,
                },
              },
              {
                'id': 'c2',
                'type': 'groupe_etablissement',
                'title': 'Chorale',
                'last_message_at': '2026-11-16T09:00:00.000Z',
                'autre': null,
              },
            ]),
            200,
          );
        }
        if (path == '/moi') {
          return http.Response(jsonEncode({'id': 'moi'}), 200);
        }
        if (path == '/messagerie/membres') {
          return http.Response('[]', 200);
        }
        if (path == '/messagerie/conversations/c1/messages') {
          return http.Response(
            jsonEncode([
              {
                'id': 'm1',
                'conversation_id': 'c1',
                'sender_id': 'autre',
                'content': 'Bonjour',
                'created_at': '2026-11-16T10:00:00.000Z',
              },
            ]),
            200,
          );
        }
        return http.Response('[]', 200);
      });
      client = ApiClient(client: mock);
    });

    tearDown(() {
      MessagerieLectureService.instance.reinitialiserPourTests();
    });

    testWidgets('directe : nom de l’autre membre, pas le libellé générique', (
      tester,
    ) async {
      await tester.pumpWidget(
        MaterialApp(home: MessagerieListeScreen(apiClient: client)),
      );
      await tester.pumpAndSettle();
      expect(find.text('MARIE DUPONT'), findsOneWidget);
      expect(find.text('Conversation directe'), findsNothing);
      expect(find.text('Chorale'), findsOneWidget);
      // Groupe sans aperçu : le sous-titre est le type, pas un nom.
      expect(find.text('Groupe'), findsOneWidget);
    });

    testWidgets('directe : photo de l’autre membre dans la tuile', (
      tester,
    ) async {
      await tester.pumpWidget(
        MaterialApp(home: MessagerieListeScreen(apiClient: client)),
      );
      await tester.pumpAndSettle();
      final avatars = find.byWidgetPredicate(
        (w) => w is CircleAvatar && w.backgroundImage is MemoryImage,
      );
      expect(avatars, findsOneWidget);
    });
  });

  group('Écran de conversation : en-tête avec nom et photo', () {
    testWidgets('directe : nom et photo dans l’en-tête', (tester) async {
      SharedPreferences.setMockInitialValues({});
      final mock = MockClient((http.Request request) async {
        if (request.url.path ==
            '/messagerie/conversations/c1/messages') {
          return http.Response(
            jsonEncode([
              {
                'id': 'm1',
                'conversation_id': 'c1',
                'sender_id': 'moi',
                'content': 'Bonjour Marie',
                'created_at': '2026-11-16T10:00:00.000Z',
              },
            ]),
            200,
          );
        }
        return http.Response('[]', 200);
      });
      final client = ApiClient(client: mock);
      const conversation = ConversationMessagerie(
        id: 'c1',
        type: 'directe',
        autreNom: 'MARIE DUPONT',
        autreMatricule: 'CP-MD-2527',
        autrePhoto: _photoPng,
      );
      await tester.pumpWidget(
        MaterialApp(
          home: MessagerieConversationScreen(
            conversation: conversation,
            titre: 'MARIE DUPONT',
            monMembreId: 'moi',
            apiClient: client,
          ),
        ),
      );
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));
      await tester.pump(const Duration(milliseconds: 100));
      expect(find.text('MARIE DUPONT'), findsOneWidget);
      expect(find.text('Conversation directe'), findsNothing);
      final avatars = find.byWidgetPredicate(
        (w) => w is CircleAvatar && w.backgroundImage is MemoryImage,
      );
      expect(avatars, findsOneWidget);
      expect(find.text('Bonjour Marie'), findsOneWidget);
    });
  });

  group('Bouton d’écriture visible, membre connecté avec des conversations', () {
    late ApiClient client;

    setUp(() {
      SharedPreferences.setMockInitialValues({});
      MessagerieLectureService.instance.reinitialiserPourTests();
      MessagerieLectureService.instance.nonLusNotifier.value = 0;
      app.member = Member(
        'Test',
        'CP-TT-2526',
        'Céleste',
        DateTime(2026, 1, 1),
      );
      app.isAdmin = false;
      final mock = MockClient((http.Request request) async {
        final path = request.url.path;
        if (path == '/messagerie/conversations') {
          return http.Response(
            jsonEncode([
              {
                'id': 'c1',
                'type': 'directe',
                'last_message_at': '2026-11-16T10:00:00.000Z',
                'autre': {'nom': 'MARIE DUPONT'},
              },
            ]),
            200,
          );
        }
        if (path == '/moi') {
          return http.Response(jsonEncode({'id': 'moi'}), 200);
        }
        if (path == '/messagerie/membres') {
          return http.Response('[]', 200);
        }
        return http.Response('[]', 200);
      });
      client = ApiClient(client: mock);
    });

    tearDown(() {
      app.member = null;
      app.isAdmin = false;
      MessagerieLectureService.instance.reinitialiserPourTests();
      MessagerieLectureService.instance.nonLusNotifier.value = 0;
    });

    Future<void> ouvrirListe(WidgetTester tester, double largeur) async {
      tester.view.physicalSize = Size(largeur, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      await tester.pumpWidget(
        MaterialApp(home: MessagerieListeScreen(apiClient: client)),
      );
      await tester.pumpAndSettle();
      expect(tester.takeException(), isNull);
    }

    testWidgets('390 px : bouton d’écriture visible et entier, photo en place', (
      tester,
    ) async {
      await ouvrirListe(tester, 390);
      final bouton = find.byTooltip('Écrire un message');
      expect(bouton, findsOneWidget);
      final rect = tester.getRect(bouton);
      expect(rect.left, greaterThanOrEqualTo(0));
      expect(rect.right, lessThanOrEqualTo(390));
      final photo = find.byWidgetPredicate(
        (w) =>
            w is CircleAvatar &&
            w.backgroundColor == const Color(0xFFD4A72C),
      );
      expect(photo, findsOneWidget);
      final rectPhoto = tester.getRect(photo);
      expect(rectPhoto.right, lessThanOrEqualTo(390));
    });

    testWidgets('360 px : bouton d’écriture visible et entier, photo en place', (
      tester,
    ) async {
      await ouvrirListe(tester, 360);
      final bouton = find.byTooltip('Écrire un message');
      expect(bouton, findsOneWidget);
      final rect = tester.getRect(bouton);
      expect(rect.left, greaterThanOrEqualTo(0));
      expect(rect.right, lessThanOrEqualTo(360));
      final photo = find.byWidgetPredicate(
        (w) =>
            w is CircleAvatar &&
            w.backgroundColor == const Color(0xFFD4A72C),
      );
      expect(photo, findsOneWidget);
      final rectPhoto = tester.getRect(photo);
      expect(rectPhoto.right, lessThanOrEqualTo(360));
    });
  });
}
