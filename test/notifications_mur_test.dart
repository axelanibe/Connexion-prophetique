// Tests des notifications du mur, mur v2 tranche 6,
// 25 nov. 2026 : une notification de commentaire ouvre la
// page détail, un nouveau suiveur ouvre le profil, les
// filtres Mentions et Activité groupent les types du mur.
// Client simulé, sans serveur ni réseau.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/tiroir_intelligent.dart';

class _FauxClientNotifications extends ApiClient {
  _FauxClientNotifications({required this.publication, required this.profil});

  Map<String, dynamic> publication;
  Map<String, dynamic> profil;

  @override
  Future<Map<String, dynamic>> fetchNotifications() async => {'notifications': [], 'non_lues': 0};

  @override
  Future<void> markNotificationRead(String id) async {}

  @override
  Future<Map<String, dynamic>> fetchMurDetail(String id) async => {'publication': publication};

  @override
  Future<Map<String, dynamic>> fetchPhotosAuteurs(List<String> ids) async => {'photos': []};

  @override
  Future<Map<String, dynamic>> fetchCommentaires(String cibleType, String cibleId) async =>
      {'commentaires': [], 'peut_moderer': false};

  @override
  Future<Map<String, dynamic>> aimer(String cibleType, String cibleId, {String? type}) async =>
      {'nombre': 1, 'a_aime': true};

  @override
  Future<Map<String, dynamic>> retirerAime(String cibleType, String cibleId) async =>
      {'nombre': 0, 'a_aime': false};

  @override
  Future<Map<String, dynamic>> supprimerPublicationMur(String id) async => {'ok': true};

  @override
  Future<Map<String, dynamic>> supprimerVideoMur(String id) async => {'ok': true};

  @override
  Future<Map<String, dynamic>> fetchProfilMur(String membreId, {String? avant}) async =>
      {'membre': profil, 'publications': [], 'suivante': null};

  @override
  Future<Map<String, dynamic>> suivreMembre(String membreId) async => {'suivi': true};

  @override
  Future<Map<String, dynamic>> nePlusSuivre(String membreId) async => {'suivi': false};
}

Map<String, dynamic> _publication() => {
      'id': 'p1',
      'auteur_id': 'm1',
      'auteur_nom': 'Marie K',
      'etablissement_nom': 'Céleste',
      'texte': 'Courage à tous',
      'photo': null,
      'categorie': 'temoignage',
      'statut_moderation': 'visible',
      'video': null,
      'nb_jaime': 1,
      'nb_amen': 0,
      'nb_priere': 0,
      'mon_type': null,
      'nb_commentaires': 0,
      'aime': false,
      'enregistre': false,
      'est_auteur': false,
      'cree_le': '2026-11-24T10:00:00.000Z',
    };

Map<String, dynamic> _profil() => {
      'id': 'm1',
      'nom_complet': 'Marie K',
      'fonction': 'Chantre',
      'etablissement_nom': 'Céleste',
      'photo': null,
      'presentation': 'Membre depuis 2025.',
      'inscrit_le': '2025-03-02T10:00:00.000Z',
      'nb_publications': 1,
      'nb_reactions': 0,
      'nb_abonnes': 0,
      'nb_abonnements': 0,
      'suivi_par_moi': false,
      'est_moi': false,
    };

Map<String, dynamic> _notification({
  required String id,
  required String type,
  required String titre,
  String lienType = '',
  String lienId = '',
}) =>
    {
      'id': id,
      'type': type,
      'titre': titre,
      'message': 'Message.',
      'lien_type': lienType,
      'lien_id': lienId,
      'lue': false,
      'cree_le': '2026-11-25T10:00:00.000Z',
    };

void main() {
  group('NotificationsPage, mur v2 tranche 6', () {
    late _FauxClientNotifications faux;

    setUp(() {
      SharedPreferences.setMockInitialValues({});
      app.member = Member('Test', 'CP-TT-2526', 'Céleste', DateTime(2026, 1, 1));
      app.lang = 'fr';
      TiroirContexte.instance.definirPourTests(aEnfants: true, aResultats: true);
      AideCompteurs.instance.reinitialiserPourTests();
      faux = _FauxClientNotifications(publication: _publication(), profil: _profil());
      api = faux;
      app.notifications = [];
      app.unreadNotifications = 0;
    });

    tearDown(() {
      app.member = null;
      app.notifications = [];
      app.unreadNotifications = 0;
      AideCompteurs.instance.reinitialiserPourTests();
      api = ApiClient();
    });

    Future<void> _pomper(WidgetTester tester) async {
      tester.view.physicalSize = const Size(800, 1600);
      await tester.pumpWidget(const MaterialApp(home: NotificationsPage()));
      await tester.pumpAndSettle();
    }

    testWidgets('un commentaire du mur ouvre la page détail', (tester) async {
      app.notifications = [
        _notification(id: 'n1', type: 'mur_commentaire', titre: 'Nouveau commentaire', lienType: 'mur_publication', lienId: 'p1'),
      ];
      await _pomper(tester);
      await tester.tap(find.text('Nouveau commentaire'));
      await tester.pumpAndSettle();
      expect(find.text('Courage à tous'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('un nouveau suiveur ouvre le profil', (tester) async {
      app.notifications = [
        _notification(id: 'n2', type: 'mur_suivi', titre: 'Nouveau suiveur', lienType: 'mur_profil', lienId: 'm1'),
      ];
      await _pomper(tester);
      await tester.tap(find.text('Nouveau suiveur'));
      await tester.pumpAndSettle();
      expect(find.text('Marie K'), findsWidgets);
      expect(tester.takeException(), isNull);
    });

    testWidgets('le filtre Mentions ne garde que les mentions', (tester) async {
      app.notifications = [
        _notification(id: 'n1', type: 'mur_mention', titre: 'Tu as été mentionné', lienType: 'mur_publication', lienId: 'p1'),
        _notification(id: 'n2', type: 'mur_commentaire', titre: 'Nouveau commentaire', lienType: 'mur_publication', lienId: 'p1'),
        _notification(id: 'n3', type: 'paiement_valide', titre: 'Paiement validé'),
      ];
      await _pomper(tester);
      await tester.tap(find.byType(DropdownButtonFormField<String>));
      await tester.pumpAndSettle();
      expect(find.text('Mentions'), findsOneWidget);
      expect(find.text('Activité du mur'), findsOneWidget);
      await tester.tap(find.text('Mentions').last);
      await tester.pumpAndSettle();
      expect(find.text('Tu as été mentionné'), findsOneWidget);
      expect(find.text('Nouveau commentaire'), findsNothing);
      expect(find.text('Paiement validé'), findsNothing);
      expect(tester.takeException(), isNull);
    });

    testWidgets('le filtre Activité ne garde que les autres types du mur', (tester) async {
      app.notifications = [
        _notification(id: 'n1', type: 'mur_mention', titre: 'Tu as été mentionné', lienType: 'mur_publication', lienId: 'p1'),
        _notification(id: 'n2', type: 'mur_commentaire', titre: 'Nouveau commentaire', lienType: 'mur_publication', lienId: 'p1'),
        _notification(id: 'n3', type: 'mur_reaction', titre: 'Nouvelle réaction', lienType: 'mur_publication', lienId: 'p1'),
        _notification(id: 'n4', type: 'paiement_valide', titre: 'Paiement validé'),
      ];
      await _pomper(tester);
      await tester.tap(find.byType(DropdownButtonFormField<String>));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Activité du mur').last);
      await tester.pumpAndSettle();
      expect(find.text('Nouveau commentaire'), findsOneWidget);
      expect(find.text('Nouvelle réaction'), findsOneWidget);
      expect(find.text('Tu as été mentionné'), findsNothing);
      expect(find.text('Paiement validé'), findsNothing);
      expect(tester.takeException(), isNull);
    });
  });
}
