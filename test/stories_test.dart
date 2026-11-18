// Tests des stories de 24 heures, 17 nov. 2026 : modèle,
// visibilité de la bande et rendu de la bande avec un client
// simulé, sans serveur ni réseau.
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/stories.dart';

void main() {
  group('Story, modèle', () {
    test('fromJson complet, prénom de l’auteur', () {
      final story = Story.fromJson({
        'id': '11111111-1111-1111-1111-111111111111',
        'type': 'video',
        'url': 'https://exemple/abc?sig=1',
        'auteur_nom': 'ANIBE AXEL',
        'etablissement_nom': 'Céleste',
        'cree_le': '2026-11-17T12:00:00.000Z',
        'expire_le': '2026-11-18T12:00:00.000Z',
      });
      expect(story.id, '11111111-1111-1111-1111-111111111111');
      expect(story.estVideo, true);
      expect(story.prenomAuteur, 'ANIBE');
      expect(story.etablissementNom, 'Céleste');
      expect(story.expiree, false);
    });

    test('fromJson minimal, valeurs par défaut', () {
      final story = Story.fromJson({'id': 'x', 'url': 'https://exemple/x'});
      expect(story.type, 'photo');
      expect(story.estVideo, false);
      expect(story.prenomAuteur, '');
      expect(story.expiree, false);
    });

    test('expirée quand la limite est dépassée', () {
      final story = Story.fromJson({
        'id': 'x',
        'url': 'https://exemple/x',
        'expire_le': DateTime.now().subtract(const Duration(hours: 1)).toIso8601String(),
      });
      expect(story.expiree, true);
    });
  });

  group('Stories, visibilité de la bande', () {
    test('cachée sans story et sans droit de publication', () {
      expect(storiesBandeVisible(peutPublier: false, stories: []), false);
    });

    test('visible avec des stories, même sans publication', () {
      final stories = [Story(id: 'x', type: 'photo', url: 'https://exemple/x')];
      expect(storiesBandeVisible(peutPublier: false, stories: stories), true);
    });

    test('visible pour la structure, même sans story', () {
      expect(storiesBandeVisible(peutPublier: true, stories: []), true);
    });
  });

  group('StoriesStrip, rendu avec client simulé', () {
    ApiClient clientAvec(List<Map<String, dynamic>> stories, {int statut = 200}) {
      return ApiClient(
        client: MockClient((request) async {
          if (request.url.path == '/stories') {
            return http.Response(jsonEncode({'stories': stories, 'r2': true}), statut);
          }
          return http.Response('Introuvable', 404);
        }),
      );
    }

    final deuxStories = [
      {
        'id': 'a',
        'type': 'video',
        'url': 'https://exemple/a?sig=1',
        'auteur_nom': 'ANIBE AXEL',
        'etablissement_nom': 'Céleste',
        'expire_le': DateTime.now().add(const Duration(hours: 2)).toIso8601String(),
      },
      {
        'id': 'b',
        'type': 'video',
        'url': 'https://exemple/b?sig=1',
        'auteur_nom': 'MEL EMMANUEL',
        'etablissement_nom': '',
        'expire_le': DateTime.now().add(const Duration(hours: 2)).toIso8601String(),
      },
    ];

    testWidgets('deux stories, deux cercles avec les prénoms, sans bouton publier', (tester) async {
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(body: StoriesStrip(client: clientAvec(deuxStories), peutPublier: false)),
      ));
      await tester.pumpAndSettle();
      expect(find.text('ANIBE'), findsOneWidget);
      expect(find.text('MEL'), findsOneWidget);
      expect(find.text('Publier'), findsNothing);
      expect(find.byIcon(Icons.play_arrow), findsNWidgets(2));
    });

    testWidgets('structure sans story, bouton publier visible', (tester) async {
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(body: StoriesStrip(client: clientAvec([]), peutPublier: true)),
      ));
      await tester.pumpAndSettle();
      expect(find.text('Publier'), findsOneWidget);
      expect(find.byIcon(Icons.add_outlined), findsOneWidget);
    });

    testWidgets('membre sans story, bande cachée', (tester) async {
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(body: StoriesStrip(client: clientAvec([]), peutPublier: false)),
      ));
      await tester.pumpAndSettle();
      expect(find.text('Publier'), findsNothing);
      expect(find.byIcon(Icons.play_arrow), findsNothing);
    });

    testWidgets('serveur en erreur, bande cachée sans planter', (tester) async {
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(body: StoriesStrip(client: clientAvec([], statut: 500), peutPublier: false)),
      ));
      await tester.pumpAndSettle();
      expect(find.text('Publier'), findsNothing);
    });
  });
}
