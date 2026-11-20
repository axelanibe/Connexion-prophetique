// Messagerie et signalement, 16 nov. 2026, lot application.
// Décisions pures : comptage des non lus, libellés, délais de
// recours, modèles, service de lecture locale, état vide de la
// liste. Sans téléphone, sans serveur réel : l'API est simulée
// par un client HTTP en mémoire.
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/messagerie.dart';
import 'package:connexion_prophetique/messagerie_screens.dart';

MessageMessagerie _message({
  String id = 'm1',
  String sender = 'autre',
  DateTime? date,
  bool sansDate = false,
}) => MessageMessagerie(
  id: id,
  conversationId: 'c1',
  senderId: sender,
  content: 'Bonjour',
  createdAt: sansDate
      ? null
      : (date ?? DateTime.utc(2026, 11, 16, 10, 0)),
);

void main() {
  group('Comptage des non lus', () {
    test('jamais lu : tous les messages des autres comptent', () {
      final messages = [
        _message(id: 'm1'),
        _message(id: 'm2', date: DateTime.utc(2026, 11, 16, 10, 5)),
      ];
      expect(compterMessagesNonLus(messages, 'moi', null), 2);
    });

    test('mes propres messages ne comptent jamais', () {
      final messages = [
        _message(id: 'm1', sender: 'moi'),
        _message(id: 'm2'),
      ];
      expect(compterMessagesNonLus(messages, 'moi', null), 1);
    });

    test('seuls les messages après la dernière lecture comptent', () {
      final messages = [
        _message(id: 'm1', date: DateTime.utc(2026, 11, 16, 9, 0)),
        _message(id: 'm2', date: DateTime.utc(2026, 11, 16, 11, 0)),
      ];
      final luLe = DateTime.utc(2026, 11, 16, 10, 0);
      expect(compterMessagesNonLus(messages, 'moi', luLe), 1);
    });

    test('un message sans date ne compte pas', () {
      final messages = [_message(id: 'm1', sansDate: true)];
      expect(compterMessagesNonLus(messages, 'moi', null), 0);
    });

    test('sans identifiant de membre, tout compte sauf les sans date', () {
      final messages = [_message(id: 'm1'), _message(id: 'm2')];
      expect(compterMessagesNonLus(messages, null, null), 2);
    });
  });

  group('Libellés', () {
    test('types de conversation adaptés à une seule structure', () {
      expect(libelleTypeConversation('directe'), 'Directe');
      expect(
        libelleTypeConversation('groupe_etablissement'),
        'Groupe',
      );
      expect(
        libelleTypeConversation('groupe_structure'),
        'Canal de la structure',
      );
      expect(libelleTypeConversation('pastorale'), 'Pastorale');
    });

    test('motifs de signalement, erreur doctrinale enseignée signalable', () {
      expect(motifsSignalement, isNot(contains('desaccord_doctrinal')));
      expect(
        motifsSignalement,
        containsAll([
          'erreur_doctrinale',
          'trafic_influence',
          'mauvaise_gestion_finances',
        ]),
      );
      expect(libelleMotifSignalement('harcelement'), 'Harcèlement');
      expect(
        libelleMotifSignalement('securite_enfant'),
        'Sécurité d’un enfant',
      );
      expect(libelleMotifSignalement('erreur_doctrinale'), 'Erreur doctrinale');
      expect(libelleMotifSignalement('trafic_influence'), 'Trafic d’influence');
      expect(
        libelleMotifSignalement('mauvaise_gestion_finances'),
        'Mauvaise gestion des finances',
      );
      expect(libelleMotifSignalement('autre'), 'Autre');
      // Clés anglaises renvoyées par le serveur, même libellé.
      expect(libelleMotifSignalement('doctrinal_error'), 'Erreur doctrinale');
      expect(
        libelleMotifSignalement('influence_peddling'),
        'Trafic d’influence',
      );
      expect(
        libelleMotifSignalement('financial_mismanagement'),
        'Mauvaise gestion des finances',
      );
      expect(libelleMotifSignalement('harassment'), 'Harcèlement');
    });

    test('statuts et actions de modération', () {
      expect(libelleStatutSignalement('en_attente'), 'En attente');
      expect(libelleStatutSignalement('conteste'), 'Contesté');
      expect(libelleActionModeration('sourdine'), 'Mettre en sourdine');
      expect(
        libelleActionModeration('suspendre'),
        'Suspendre la messagerie',
      );
      expect(libelleDureeModeration(24), '24 heures');
      expect(libelleDureeModeration(168), '7 jours');
      expect(libelleDureeModeration(720), '30 jours');
    });
  });

  group('Phrase de visibilité du signalement', () {
    test('établissement par défaut : les modérateurs voient le nom', () {
      final phrase = phraseVisibiliteSignalement(
        'etablissement',
        'harcelement',
      );
      expect(phrase, contains('votre établissement'));
      expect(phrase, contains('ne verra jamais votre nom'));
    });

    test('administrateur général : l’établissement ne reçoit pas le contenu', () {
      final phrase = phraseVisibiliteSignalement(
        'administrateur_general',
        'menace',
      );
      expect(phrase, contains('administrateur général'));
      expect(phrase, contains('sans en recevoir le contenu'));
    });

    test('sécurité d’un enfant : circuit du référent, quel que soit le destinataire', () {
      for (final destinataire in destinatairesSignalement) {
        final phrase = phraseVisibiliteSignalement(
          destinataire,
          'securite_enfant',
        );
        expect(phrase, contains('référent protection de l’enfance'));
        expect(phrase, contains('hors du circuit ordinaire'));
      }
    });
  });

  group('Recours, 15 jours', () {
    final sanction = DateTime.utc(2026, 11, 1, 10, 0);

    test('contestable le jour même et 14 jours après', () {
      expect(
        peutContester(sanction, DateTime.utc(2026, 11, 1, 11, 0)),
        isTrue,
      );
      expect(
        peutContester(sanction, DateTime.utc(2026, 11, 15, 10, 0)),
        isTrue,
      );
    });

    test('plus contestable 15 jours après', () {
      expect(
        peutContester(sanction, DateTime.utc(2026, 11, 16, 10, 1)),
        isFalse,
      );
    });

    test('jours restants décroissants, 0 quand dépassé', () {
      expect(
        joursRestantsRecours(sanction, DateTime.utc(2026, 11, 11, 10, 0)),
        5,
      );
      expect(
        joursRestantsRecours(sanction, DateTime.utc(2026, 11, 20, 10, 0)),
        0,
      );
    });
  });

  group('Modèles', () {
    test('conversation : champs tolérants, groupe détecté', () {
      final c = ConversationMessagerie.fromJson({
        'id': 'c1',
        'type': 'groupe_etablissement',
        'title': 'Chorale',
        'last_message_at': '2026-11-16T10:00:00.000Z',
      });
      expect(c.id, 'c1');
      expect(c.estGroupe, isTrue);
      expect(c.reponsesDesactivees, isFalse);
      expect(c.nonLus, 0);
      expect(c.copyWith(nonLus: 3).nonLus, 3);
      expect(
        ConversationMessagerie.fromJson({
          'id': 'c2',
          'type': 'directe',
        }).estGroupe,
        isFalse,
      );
    });

    test('signalement : preuve figée lisible, jamais modifiable', () {
      final s = Signalement.fromJson({
        'id': 's1',
        'target_type': 'message',
        'target_id': 'm1',
        'reason': 'harcelement',
        'status': 'en_attente',
        'created_at': '2026-11-16T10:00:00.000Z',
        'evidence_snapshot': {
          'content': 'Message visé',
          'sender_nom': 'JEAN DUPONT',
          'created_at': '2026-11-16T09:00:00.000Z',
        },
      });
      expect(s.evidenceContenu, 'Message visé');
      expect(s.evidenceAuteur, 'JEAN DUPONT');
      expect(s.evidenceDate, DateTime.utc(2026, 11, 16, 9, 0));
    });

    test('sanction : contestable dans le délai seulement', () {
      final recente = SanctionMessagerie.fromJson({
        'id': 'a1',
        'report_id': 's1',
        'moderation_action_id': 'act1',
        'action': 'sourdine',
        'created_at': DateTime.now()
            .subtract(const Duration(days: 2))
            .toIso8601String(),
      });
      expect(recente.contestable, isTrue);
      final ancienne = SanctionMessagerie.fromJson({
        'id': 'a2',
        'report_id': 's1',
        'moderation_action_id': 'act2',
        'action': 'suspendre',
        'created_at': DateTime.now()
            .subtract(const Duration(days: 20))
            .toIso8601String(),
      });
      expect(ancienne.contestable, isFalse);
    });

    test('heure courte : heure aujourd’hui, jour sinon', () {
      final maintenant = DateTime.now();
      expect(
        heureCourteConversation(maintenant),
        '${maintenant.hour.toString().padLeft(2, '0')}:${maintenant.minute.toString().padLeft(2, '0')}',
      );
      expect(
        heureCourteConversation(DateTime.utc(2026, 1, 5, 9, 30)),
        '05/01',
      );
      expect(heureCourteConversation(null), '');
    });
  });

  group('Service de lecture locale', () {
    late MessagerieLectureService lecture;

    setUp(() {
      SharedPreferences.setMockInitialValues({});
      lecture = MessagerieLectureService.pourTests();
    });

    test('lecture persistée, badge par conversation', () async {
      await lecture.charger();
      final conversations = [
        ConversationMessagerie(
          id: 'c1',
          type: 'directe',
          lastMessageAt: DateTime.utc(2026, 11, 16, 10, 0),
        ),
        ConversationMessagerie(
          id: 'c2',
          type: 'directe',
          lastMessageAt: DateTime.utc(2026, 11, 16, 9, 0),
        ),
      ];
      expect(lecture.compterConversationsNonLues(conversations), 2);
      await lecture.marquerLu(
        'c1',
        DateTime.utc(2026, 11, 16, 10, 30),
      );
      expect(lecture.compterConversationsNonLues(conversations), 1);
      lecture.recalculerNonLus(conversations);
      expect(lecture.nonLusNotifier.value, 1);
    });

    test('lecture rechargée depuis le stockage', () async {
      await lecture.charger();
      await lecture.marquerLu(
        'c1',
        DateTime.utc(2026, 11, 16, 10, 30),
      );
      final seconde = MessagerieLectureService.pourTests();
      await seconde.charger();
      expect(
        seconde.luLe('c1'),
        DateTime.utc(2026, 11, 16, 10, 30),
      );
    });
  });

  group('Liste des conversations, état vide', () {
    testWidgets('aucune conversation : état vide chaleureux', (
      tester,
    ) async {
      SharedPreferences.setMockInitialValues({});
      MessagerieLectureService.instance.reinitialiserPourTests();
      final mock = MockClient((http.Request request) async {
        if (request.url.path == '/messagerie/conversations') {
          return http.Response('[]', 200);
        }
        if (request.url.path == '/moi') {
          return http.Response('{}', 200);
        }
        if (request.url.path == '/messagerie/membres') {
          return http.Response('[]', 200);
        }
        return http.Response('[]', 200);
      });
      final client = ApiClient(client: mock);
      await tester.pumpWidget(
        MaterialApp(
          home: MessagerieListeScreen(apiClient: client),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.textContaining('Aucune conversation'), findsOneWidget);
      expect(find.text('Nouvelle conversation'), findsOneWidget);
    });

    testWidgets('conversations listées, avec aperçu et non lus', (
      tester,
    ) async {
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
                'title': 'Marie',
                'last_message_at': '2026-11-16T10:00:00.000Z',
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
                'content': 'Bonjour, la réunion est à 18 h.',
                'created_at': '2026-11-16T10:00:00.000Z',
              },
            ]),
            200,
          );
        }
        return http.Response('[]', 200);
      });
      final client = ApiClient(client: mock);
      await tester.pumpWidget(
        MaterialApp(
          home: MessagerieListeScreen(apiClient: client),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('Marie'), findsOneWidget);
      expect(
        find.text('Bonjour, la réunion est à 18 h.'),
        findsOneWidget,
      );
      expect(find.text('1'), findsOneWidget);
    });
  });

  group('Liste façon WhatsApp, 18 nov. 2026', () {
    // Deux conversations : Marie, entre deux membres, un non lu,
    // et le groupe Kairos, en favori. Le groupe et la pastorale
    // n'ont pas d'autre participant.
    MockClient _client({bool favoriGroupe = true, bool avecGroupe = true}) {
      return MockClient((http.Request request) async {
        final path = request.url.path;
        if (path == '/messagerie/conversations') {
          return http.Response(
            jsonEncode([
              {
                'id': 'c1',
                'type': 'directe',
                'title': 'Marie Kouamé',
                'last_message_at': '2026-11-18T10:00:00.000Z',
                'est_favori': false,
              },
              if (avecGroupe)
                {
                  'id': 'c2',
                  'type': 'groupe_structure',
                  'title': 'Camp Kairos 2027',
                  'last_message_at': '2026-11-18T09:00:00.000Z',
                  'est_favori': favoriGroupe,
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
                'content': 'Bonjour Marie',
                'created_at': '2026-11-18T10:00:00.000Z',
              },
            ]),
            200,
          );
        }
        if (path == '/messagerie/conversations/c2/messages') {
          return http.Response(jsonEncode([]), 200);
        }
        if (path == '/messagerie/conversations/c1/favori' &&
            request.method == 'POST') {
          return http.Response(jsonEncode({'favori': true}), 200);
        }
        return http.Response('[]', 200);
      });
    }

    Future<void> _pomper(WidgetTester tester, MockClient mock) async {
      SharedPreferences.setMockInitialValues({});
      MessagerieLectureService.instance.reinitialiserPourTests();
      final client = ApiClient(client: mock);
      await tester.pumpWidget(
        MaterialApp(home: MessagerieListeScreen(apiClient: client)),
      );
      await tester.pumpAndSettle();
    }

    test('modèle : favori lu et copié', () {
      final c = ConversationMessagerie.fromJson({
        'id': 'c1',
        'type': 'directe',
        'est_favori': true,
      });
      expect(c.estFavori, isTrue);
      expect(c.copyWith(estFavori: false).estFavori, isFalse);
      expect(
        ConversationMessagerie.fromJson({'id': 'c2', 'type': 'groupe_structure'}).estFavori,
        isFalse,
      );
    });

    testWidgets('grand titre, recherche et pastilles, sans Directes', (
      tester,
    ) async {
      await _pomper(tester, _client());
      // Grand titre dans le corps, plus le sous-titre de l'en-tête.
      expect(find.text('Messagerie'), findsNWidgets(2));
      expect(find.byType(TextField), findsOneWidget);
      expect(find.text('Toutes 2'), findsOneWidget);
      expect(find.text('Non lues 1'), findsOneWidget);
      expect(find.text('Favoris 1'), findsOneWidget);
      expect(find.text('Groupes 1'), findsOneWidget);
      expect(find.text('Pastorale'), findsOneWidget);
      expect(find.text('Directes'), findsNothing);
      expect(find.text('Conversation directe'), findsNothing);
      expect(find.text('Marie Kouamé'), findsOneWidget);
      expect(find.text('Camp Kairos 2027'), findsOneWidget);
    });

    testWidgets('filtre Favoris : seulement le groupe en favori', (
      tester,
    ) async {
      await _pomper(tester, _client());
      await tester.tap(find.text('Favoris 1'));
      await tester.pumpAndSettle();
      expect(find.text('Camp Kairos 2027'), findsOneWidget);
      expect(find.text('Marie Kouamé'), findsNothing);
    });

    testWidgets('filtre Non lues : seulement Marie', (tester) async {
      await _pomper(tester, _client());
      await tester.tap(find.text('Non lues 1'));
      await tester.pumpAndSettle();
      expect(find.text('Marie Kouamé'), findsOneWidget);
      expect(find.text('Camp Kairos 2027'), findsNothing);
    });

    testWidgets('favoris vide : état vide, sans bouton de création', (
      tester,
    ) async {
      await _pomper(tester, _client(favoriGroupe: false));
      await tester.tap(find.text('Favoris'));
      await tester.pumpAndSettle();
      expect(find.textContaining('Aucune conversation en favori'), findsOneWidget);
      expect(find.text('Nouvelle conversation'), findsNothing);
    });

    testWidgets('groupes vide : état vide sur la création automatique', (
      tester,
    ) async {
      await _pomper(tester, _client(avecGroupe: false));
      await tester.tap(find.text('Groupes'));
      await tester.pumpAndSettle();
      expect(find.textContaining('Aucun groupe pour l’instant'), findsOneWidget);
      expect(find.textContaining('se crée automatiquement'), findsOneWidget);
    });

    testWidgets('recherche : filtre par le nom affiché', (tester) async {
      await _pomper(tester, _client());
      await tester.enterText(find.byType(TextField), 'kairos');
      await tester.pumpAndSettle();
      expect(find.text('Camp Kairos 2027'), findsOneWidget);
      expect(find.text('Marie Kouamé'), findsNothing);
      expect(find.text('Aucune conversation ne correspond à votre recherche.'), findsNothing);
      await tester.enterText(find.byType(TextField), 'zzz');
      await tester.pumpAndSettle();
      expect(find.text('Aucune conversation ne correspond à votre recherche.'), findsOneWidget);
    });

    testWidgets('étoile : bascule le favori, le filtre Favoris suit', (
      tester,
    ) async {
      await _pomper(tester, _client());
      // Marie n'est pas en favori : son étoile est vide.
      expect(find.byIcon(Icons.star_border), findsOneWidget);
      await tester.tap(find.byIcon(Icons.star_border));
      await tester.pumpAndSettle();
      expect(find.byIcon(Icons.star), findsWidgets);
      // La bascule a fait passer le compteur Favoris de 1 à 2.
      await tester.tap(find.text('Favoris 2'));
      await tester.pumpAndSettle();
      expect(find.text('Marie Kouamé'), findsOneWidget);
      expect(find.text('Camp Kairos 2027'), findsOneWidget);
    });

    testWidgets('bouton d’écriture : bulle avec crayon, menu vers le haut', (
      tester,
    ) async {
      await _pomper(tester, _client());
      // 19 nov. 2026 : le menu trois points quitte l'en-tête
      // (Mes signalements et Modération vivent dans le tiroir,
      // section Sécurité), il ne reste que le bouton d'écriture.
      expect(find.byTooltip('Écrire un message'), findsOneWidget);
      expect(find.byTooltip('Plus d’options'), findsNothing);
      expect(find.byIcon(Icons.chat_bubble_outline), findsOneWidget);
      expect(find.byIcon(Icons.edit_outlined), findsOneWidget);
      expect(find.byIcon(Icons.add_outlined), findsNothing);
      await tester.tap(find.byTooltip('Écrire un message'));
      await tester.pumpAndSettle();
      expect(find.text('Nouveau message'), findsOneWidget);
      expect(find.text('Créer un groupe'), findsOneWidget);
    });
  });
}
