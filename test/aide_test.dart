// Aide de la structure, 21 nov. 2026, carte 4.
//
// Décisions pures : libellés, motifs, statuts, modèle de demande
// et passage en conversation de messagerie. Sans téléphone, sans
// serveur réel.
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/messagerie.dart';

void main() {
  group('libelleMotifAide', () {
    test('problème par défaut, abus à part', () {
      expect(libelleMotifAide('probleme'), 'Problème');
      expect(libelleMotifAide('abus'), 'Abus');
      expect(libelleMotifAide('autre'), 'Problème');
      expect(libelleMotifAide(''), 'Problème');
    });
  });

  group('libelleStatutAide', () {
    test('ouvert par défaut', () {
      expect(libelleStatutAide('ouvert'), 'Ouvert');
      expect(libelleStatutAide('en_cours'), 'En cours');
      expect(libelleStatutAide('resolu'), 'Résolu');
      expect(libelleStatutAide('inconnu'), 'Ouvert');
    });
  });

  group('DemandeAide', () {
    test('lue depuis le serveur, avec le demandeur', () {
      final demande = DemandeAide.fromJson({
        'id': 'c1',
        'type': 'aide',
        'title': 'Aide : Abus',
        'motif': 'abus',
        'statut': 'en_cours',
        'demandeur_nom': 'Marie Test',
        'demandeur_matricule': 'CP-MT-2526',
        'created_at': '2026-11-21T12:00:00.000Z',
        'last_message_at': '2026-11-21T12:05:00.000Z',
      });
      expect(demande.id, 'c1');
      expect(demande.motif, 'abus');
      expect(demande.statut, 'en_cours');
      expect(demande.resolue, isFalse);
      expect(demande.demandeurNom, 'Marie Test');
      expect(demande.demandeurMatricule, 'CP-MT-2526');
      expect(demande.createdAt, DateTime.utc(2026, 11, 21, 12));
      expect(demande.lastMessageAt, DateTime.utc(2026, 11, 21, 12, 5));
    });

    test('défauts quand le statut et le motif manquent', () {
      final demande = DemandeAide.fromJson({'id': 'c1'});
      expect(demande.motif, 'probleme');
      expect(demande.statut, 'ouvert');
      expect(demande.resolue, isFalse);
      expect(demande.demandeurNom, isNull);
    });

    test('résolue seulement quand le statut est résolu', () {
      final resolue = DemandeAide.fromJson({'id': 'c1', 'statut': 'resolu'});
      expect(resolue.resolue, isTrue);
      final ouverte = DemandeAide.fromJson({'id': 'c1', 'statut': 'ouvert'});
      expect(ouverte.resolue, isFalse);
    });

    test('toConversation : le fil de messagerie de la demande', () {
      final demande = DemandeAide.fromJson({
        'id': 'c1',
        'title': 'Aide : Problème',
        'motif': 'probleme',
        'statut': 'ouvert',
      });
      final conversation = demande.toConversation();
      expect(conversation.id, 'c1');
      expect(conversation.type, 'aide');
      expect(conversation.estAide, isTrue);
      expect(conversation.aideResolue, isFalse);
      expect(conversation.title, 'Aide : Problème');
      expect(conversation.aideStatut, 'ouvert');
      expect(conversation.aideMotif, 'probleme');
    });

    test('toConversation : titre par défaut quand le serveur n’en renvoie pas', () {
      final demande = DemandeAide.fromJson({'id': 'c1', 'motif': 'abus'});
      expect(demande.toConversation().title, 'Aide : Abus');
    });
  });

  group('ConversationMessagerie', () {
    test('aide_statut et aide_motif lus depuis le serveur', () {
      final conversation = ConversationMessagerie.fromJson({
        'id': 'c1',
        'type': 'aide',
        'title': 'Aide : Problème',
        'aide_statut': 'resolu',
        'aide_motif': 'probleme',
      });
      expect(conversation.estAide, isTrue);
      expect(conversation.aideResolue, isTrue);
      expect(conversation.aideStatut, 'resolu');
      expect(conversation.aideMotif, 'probleme');
    });

    test('copyWith garde le statut d’aide, ou le change', () {
      const base = ConversationMessagerie(
        id: 'c1',
        type: 'aide',
        aideStatut: 'ouvert',
        aideMotif: 'abus',
      );
      expect(base.copyWith().aideStatut, 'ouvert');
      expect(base.copyWith(aideStatut: 'resolu').aideResolue, isTrue);
      expect(base.copyWith().aideMotif, 'abus');
    });

    test('une directe n’est pas une demande d’aide', () {
      const directe = ConversationMessagerie(id: 'c1', type: 'directe');
      expect(directe.estAide, isFalse);
      expect(directe.aideResolue, isFalse);
    });
  });
}
