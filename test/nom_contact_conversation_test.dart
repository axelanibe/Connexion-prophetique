// Nom du contact dans l'en-tête de conversation, 19 nov. 2026.
// Deux captures d'Axel : dans sa conversation, « ANIBE ADJA
// MAURICE AXEL », le téléphone et la vidéo se dessinaient
// par-dessus le nom ; dans celle de KOUAME MIENTIMY JOSEPH
// DANIEL, le nom était coupé au bord droit et les icônes
// d'appel n'étaient plus visibles. Cause : le nom tenait sur
// deux lignes avec débordement visible, il peignait par-dessus
// les actions. Correctif : une seule ligne avec points de
// suspension, icônes d'appel dans une rangée fixe à droite.
// Sans serveur réel : l'API est simulée par un client HTTP en
// mémoire, comme dans messagerie_nom_test.dart.
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/app_models.dart';
import 'package:connexion_prophetique/messagerie.dart';
import 'package:connexion_prophetique/messagerie_screens.dart';

void main() {
  group('En-tête de conversation : nom long à 390 px', () {
    late ApiClient client;

    setUp(() {
      SharedPreferences.setMockInitialValues({});
      final mock = MockClient((http.Request request) async {
        if (request.url.path ==
            '/messagerie/conversations/c1/messages') {
          return http.Response('[]', 200);
        }
        return http.Response('[]', 200);
      });
      client = ApiClient(client: mock);
    });

    Future<void> ouvrirConversation(
      WidgetTester tester, {
      required String nom,
      required String type,
    }) async {
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      final conversation = ConversationMessagerie(
        id: 'c1',
        type: type,
      );
      await tester.pumpWidget(
        MaterialApp(
          home: MessagerieConversationScreen(
            conversation: conversation,
            titre: nom,
            monMembreId: 'moi',
            apiClient: client,
          ),
        ),
      );
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));
      await tester.pump(const Duration(milliseconds: 100));
      expect(tester.takeException(), isNull);
    }

    void verifierNomEtActions(
      WidgetTester tester, {
      required String nom,
      required bool appelsVisibles,
    }) {
      expect(find.text(nom), findsOneWidget);
      final texte = tester.widget<Text>(find.text(nom));
      expect(texte.maxLines, 1);
      expect(texte.overflow, TextOverflow.ellipsis);
      final rectNom = tester.getRect(find.text(nom));
      expect(rectNom.left, greaterThanOrEqualTo(0));
      expect(rectNom.right, lessThanOrEqualTo(390));
      final drapeau = find.byTooltip('Signaler');
      expect(drapeau, findsOneWidget);
      final rectDrapeau = tester.getRect(drapeau);
      expect(rectDrapeau.left, greaterThanOrEqualTo(0));
      expect(rectDrapeau.right, lessThanOrEqualTo(390));
      expect(rectNom.right, lessThanOrEqualTo(rectDrapeau.left + 1));
      if (appelsVisibles) {
        final audio = find.byTooltip('Appel audio');
        final video = find.byTooltip('Appel vidéo');
        expect(audio, findsOneWidget);
        expect(video, findsOneWidget);
        final rectAudio = tester.getRect(audio);
        final rectVideo = tester.getRect(video);
        for (final rect in [rectAudio, rectVideo]) {
          expect(rect.left, greaterThanOrEqualTo(0));
          expect(rect.right, lessThanOrEqualTo(390));
        }
        // Le nom ne passe jamais par-dessus les icônes d'appel.
        expect(rectNom.right, lessThanOrEqualTo(rectAudio.left + 1));
        expect(rectNom.right, lessThanOrEqualTo(rectVideo.left + 1));
        expect(rectAudio.left, lessThan(rectVideo.left));
        expect(rectVideo.left, lessThan(rectDrapeau.left));
      } else {
        expect(find.byTooltip('Appel audio'), findsNothing);
        expect(find.byTooltip('Appel vidéo'), findsNothing);
      }
    }

    testWidgets('conversation de Daniel : nom coupé avant, icônes visibles', (
      tester,
    ) async {
      await ouvrirConversation(
        tester,
        nom: 'KOUAME MIENTIMY JOSEPH DANIEL',
        type: 'directe',
      );
      verifierNomEtActions(
        tester,
        nom: 'KOUAME MIENTIMY JOSEPH DANIEL',
        appelsVisibles: true,
      );
    });

    testWidgets('conversation d’Axel : nom recouvert avant, icônes visibles', (
      tester,
    ) async {
      await ouvrirConversation(
        tester,
        nom: 'ANIBE ADJA MAURICE AXEL',
        type: 'directe',
      );
      verifierNomEtActions(
        tester,
        nom: 'ANIBE ADJA MAURICE AXEL',
        appelsVisibles: true,
      );
    });

    testWidgets('nom court inchangé : nom entier, icônes en place', (
      tester,
    ) async {
      await ouvrirConversation(
        tester,
        nom: 'MARIE DUPONT',
        type: 'directe',
      );
      verifierNomEtActions(
        tester,
        nom: 'MARIE DUPONT',
        appelsVisibles: true,
      );
    });

    testWidgets('groupe au nom long : une ligne, drapeau visible', (
      tester,
    ) async {
      await ouvrirConversation(
        tester,
        nom: 'GROUPE DE PRIÈRE DE LA CHORALE CÉLESTE',
        type: 'groupe_etablissement',
      );
      verifierNomEtActions(
        tester,
        nom: 'GROUPE DE PRIÈRE DE LA CHORALE CÉLESTE',
        appelsVisibles: false,
      );
    });
  });
}
