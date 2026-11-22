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
        'expire_le': '2027-11-18T12:00:00.000Z',
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

  group('Regroupement par auteur, réécriture 22 nov. 2026', () {
    test('deux stories du même auteur, un seul groupe', () {
      final stories = [
        Story(id: 'a', type: 'photo', url: 'https://exemple/a', auteurNom: 'ANIBE AXEL'),
        Story(id: 'b', type: 'video', url: 'https://exemple/b', auteurNom: 'ANIBE AXEL'),
      ];
      final groupes = grouperStoriesParAuteur(stories);
      expect(groupes.length, 1);
      expect(groupes.first.length, 2);
      expect(groupes.first.first.id, 'a');
    });

    test('deux auteurs, deux groupes, dans l’ordre de la plus récente', () {
      final stories = [
        Story(id: 'a', type: 'photo', url: 'https://exemple/a', auteurNom: 'ANIBE AXEL'),
        Story(id: 'b', type: 'photo', url: 'https://exemple/b', auteurNom: 'MEL EMMANUEL'),
        Story(id: 'c', type: 'photo', url: 'https://exemple/c', auteurNom: 'ANIBE AXEL'),
      ];
      final groupes = grouperStoriesParAuteur(stories);
      expect(groupes.length, 2);
      expect(groupes.first.first.auteurNom, 'ANIBE AXEL');
      expect(groupes.last.first.auteurNom, 'MEL EMMANUEL');
    });

    test('auteur sans nom, chaque story garde son cercle', () {
      final stories = [
        Story(id: 'a', type: 'photo', url: 'https://exemple/a'),
        Story(id: 'b', type: 'photo', url: 'https://exemple/b'),
      ];
      expect(grouperStoriesParAuteur(stories).length, 2);
    });
  });

  group('fetchStories, jamais d’erreur, réécriture 22 nov. 2026', () {
    test('serveur en erreur, liste vide sans lever', () async {
      final client = ApiClient(
        client: MockClient((request) async => http.Response('Erreur', 500)),
      );
      final stories = await client.fetchStories();
      expect(stories, isEmpty);
    });

    test('réseau en échec, liste vide sans lever', () async {
      final client = ApiClient(
        client: MockClient((request) async => throw http.ClientException('hors ligne')),
      );
      final stories = await client.fetchStories();
      expect(stories, isEmpty);
    });

    test('adresse de lecture par l’API, jamais R2 direct, carte 153', () async {
      const id = '11111111-1111-1111-1111-111111111111';
      final client = ApiClient(
        client: MockClient((request) async => http.Response(
          jsonEncode({'stories': [
            {
              'id': id,
              'type': 'photo',
              'url': 'https://connexion-prophetique.onrender.com/stories/$id/media',
              'auteur_nom': 'ANIBE AXEL',
              'etablissement_nom': 'Céleste',
              'expire_le': DateTime.now().add(const Duration(hours: 2)).toIso8601String(),
            },
          ], 'r2': true}),
          200,
        )),
      );
      final stories = await client.fetchStories();
      expect(stories.length, 1);
      final url = stories.first['url'] as String;
      expect(url, 'https://connexion-prophetique.onrender.com/stories/$id/media');
      expect(url.contains('r2.cloudflarestorage.com'), isFalse);
    });
  });

  group('StoriesStrip, rendu avec client simulé', () {
    ApiClient clientAvec(List<dynamic> stories, {int statut = 200}) {
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

    testWidgets('une ligne mal formée, les autres stories s’affichent quand même', (tester) async {
      final melange = [
        {
          'id': 'a',
          'type': 'video',
          'url': 'https://exemple/a?sig=1',
          'auteur_nom': 'ANIBE AXEL',
          'etablissement_nom': 'Céleste',
          'expire_le': DateTime.now().add(const Duration(hours: 2)).toIso8601String(),
        },
        'ligne mal formée, pas un objet',
      ];
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(body: StoriesStrip(client: clientAvec(melange), peutPublier: false)),
      ));
      await tester.pumpAndSettle();
      expect(find.text('ANIBE'), findsOneWidget);
      expect(find.byIcon(Icons.play_arrow), findsOneWidget);
    });

    testWidgets('deux stories du même auteur, un seul cercle ANIBE', (tester) async {
      final deuxMemeAuteur = [
        {
          'id': 'a',
          'type': 'photo',
          'url': 'https://exemple/a?sig=1',
          'auteur_nom': 'ANIBE AXEL',
          'etablissement_nom': 'Céleste',
          'expire_le': DateTime.now().add(const Duration(hours: 2)).toIso8601String(),
        },
        {
          'id': 'b',
          'type': 'video',
          'url': 'https://exemple/b?sig=1',
          'auteur_nom': 'ANIBE AXEL',
          'etablissement_nom': 'Céleste',
          'expire_le': DateTime.now().add(const Duration(hours: 2)).toIso8601String(),
        },
      ];
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(body: StoriesStrip(client: clientAvec(deuxMemeAuteur), peutPublier: false)),
      ));
      await tester.pumpAndSettle();
      expect(find.text('ANIBE'), findsOneWidget);
    });
  });
}
