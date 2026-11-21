// Messages éphémères et modification ou suppression d'un message,
// 21 nov. 2026, carte 3.
//
// Décisions pures : libellés, modèles, aperçu, manifeste de
// sauvegarde et masquage « pour moi ». Sans téléphone, sans
// serveur réel.
import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/meditation_journal.dart';
import 'package:connexion_prophetique/messagerie.dart';
import 'package:connexion_prophetique/sauvegarde_app.dart';

void main() {
  setUp(() {
    SharedPreferences.setMockInitialValues({});
  });

  MessageMessagerie message({
    String id = 'm1',
    String sender = 'moi',
    String content = 'Bonjour',
    String type = 'text',
    String? editedAt,
    String? deletedAt,
    String? expireLe,
  }) =>
      MessageMessagerie(
        id: id,
        conversationId: 'c1',
        senderId: sender,
        content: content,
        type: type,
        createdAt: DateTime.utc(2026, 11, 21, 10, 0),
        editedAt: editedAt == null ? null : DateTime.parse(editedAt),
        deletedAt: deletedAt == null ? null : DateTime.parse(deletedAt),
        expireLe: expireLe == null ? null : DateTime.parse(expireLe),
      );

  group('libelleEphemere', () {
    test('7 jours par défaut, 1 et 30 jours, vide quand désactivé', () {
      expect(libelleEphemere(7), 'Éphémère · 7 j');
      expect(libelleEphemere(1), 'Éphémère · 1 j');
      expect(libelleEphemere(30), 'Éphémère · 30 j');
      expect(libelleEphemere(null), '');
    });
  });

  group('ConversationMessagerie', () {
    test('ephemere lu depuis le serveur, null quand désactivé', () {
      final active = ConversationMessagerie.fromJson({
        'id': 'c1',
        'type': 'directe',
        'ephemere': 7,
      });
      expect(active.ephemere, 7);
      final inactive = ConversationMessagerie.fromJson({
        'id': 'c1',
        'type': 'directe',
        'ephemere': null,
      });
      expect(inactive.ephemere, isNull);
      final ancien = ConversationMessagerie.fromJson({
        'id': 'c1',
        'type': 'groupe_etablissement',
      });
      expect(ancien.ephemere, isNull);
    });

    test('copyWith garde la durée éphémère, ou la change', () {
      const base = ConversationMessagerie(id: 'c1', type: 'directe', ephemere: 7);
      expect(base.copyWith().ephemere, 7);
      expect(base.copyWith(ephemere: 30).ephemere, 30);
    });
  });

  group('MessageMessagerie', () {
    test('edited_at, deleted_at et expire_le lus depuis le serveur', () {
      final lu = MessageMessagerie.fromJson({
        'id': 'm1',
        'conversation_id': 'c1',
        'sender_id': 'moi',
        'content': 'Bonjour',
        'type': 'text',
        'created_at': '2026-11-21T10:00:00.000Z',
        'edited_at': '2026-11-21T10:05:00.000Z',
        'deleted_at': null,
        'expire_le': '2026-11-28T10:00:00.000Z',
      });
      expect(lu.modifie, isTrue);
      expect(lu.supprime, isFalse);
      expect(lu.expireLe, DateTime.parse('2026-11-28T10:00:00.000Z'));
    });

    test('supprime quand deleted_at est posé, modifie quand edited_at est posé', () {
      expect(message().supprime, isFalse);
      expect(message().modifie, isFalse);
      expect(
        message(editedAt: '2026-11-21T10:05:00.000Z').modifie,
        isTrue,
      );
      expect(
        message(deletedAt: '2026-11-21T11:00:00.000Z').supprime,
        isTrue,
      );
    });
  });

  group('apercuMessage', () {
    test('un message supprimé ne montre plus que « Message supprimé »', () {
      final supprime = message(
        content: 'Secret à ne plus montrer',
        deletedAt: '2026-11-21T11:00:00.000Z',
      );
      expect(apercuMessage(supprime, 'moi'), 'Message supprimé');
      expect(apercuMessage(message(), 'moi'), 'Bonjour');
    });
  });

  group('Masquage pour moi', () {
    test('un message masqué est relu, un autre ne l’est pas', () async {
      expect(await lireMessagesMasques('c1'), isEmpty);
      await masquerMessagePourMoi('c1', 'm1');
      await masquerMessagePourMoi('c1', 'm1');
      expect(await lireMessagesMasques('c1'), {'m1'});
      expect(await lireMessagesMasques('c2'), isEmpty);
      await masquerMessagePourMoi('c1', 'm2');
      expect(await lireMessagesMasques('c1'), {'m1', 'm2'});
    });
  });

  group('Manifeste de sauvegarde', () {
    test('les conversations éphémères entrent dans le manifeste, sans contenu', () {
      final journalJson = SpiritualJournalStore().exportJson();
      final manifeste = construireManifeste(
        journalJson: journalJson,
        langue: 'fr',
        niveauTexte: 1,
        enregistrements: const [],
        conversationsEphemeres: [
          {'id': 'c1', 'type': 'directe', 'ephemere': 7},
          {'id': 'c2', 'type': 'pastorale', 'ephemere': 30},
        ],
      );
      final relu = lireManifeste(jsonEncode(manifeste));
      final conversations = relu['conversations_ephemeres'] as List;
      expect(conversations.length, 2);
      expect(conversations.first['id'], 'c1');
      expect(conversations.first['ephemere'], 7);
      expect(conversations.first.containsKey('content'), isFalse);
    });

    test('sans conversations éphémères, la clé est une liste vide', () {
      final journalJson = SpiritualJournalStore().exportJson();
      final manifeste = construireManifeste(
        journalJson: journalJson,
        langue: 'fr',
        niveauTexte: 1,
        enregistrements: const [],
      );
      expect(lireManifeste(jsonEncode(manifeste))['conversations_ephemeres'], []);
    });

    test('le manifeste chiffré garde les conversations éphémères, comme le reste', () {
      const motDePasse = 'priere-2026';
      const selFixe = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      final journalJson = SpiritualJournalStore().exportJson();
      final manifeste = construireManifeste(
        journalJson: journalJson,
        langue: 'fr',
        niveauTexte: 1,
        enregistrements: const [],
        conversationsEphemeres: [
          {'id': 'c1', 'type': 'directe', 'ephemere': 7},
        ],
      );
      final chiffre = ChiffrementSauvegarde.chiffrer(
        utf8.encode(jsonEncode(manifeste)),
        motDePasse,
        selFixe,
      );
      final clair = ChiffrementSauvegarde.dechiffrer(chiffre, motDePasse);
      expect(clair, isNotNull);
      final relu = lireManifeste(utf8.decode(clair!));
      expect((relu['conversations_ephemeres'] as List).length, 1);
      expect(relu['conversations_ephemeres'].first['ephemere'], 7);
    });
  });
}
