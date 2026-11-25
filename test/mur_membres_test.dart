// Tests du mur des membres, carte 174, refonte totale
// tranche 2, carte 176, 24 nov. 2026 : modèle, photo en
// adresse de données, page avec compositeur, fil, J'aime,
// commentaires, partage et suppression. Client simulé, sans
// serveur ni réseau.
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/mur_membres.dart';
import 'package:connexion_prophetique/tiroir_intelligent.dart';

class _FauxClient extends ApiClient {
  _FauxClient(this.publications);

  List<Map<String, dynamic>> publications;
  String? dernierTextePublie;
  String? dernierePhotoPubliee;
  int appelsPublier = 0;
  String? dernierIdSupprime;
  final aimes = <String, int>{};
  final commentairesParCible = <String, List<Map<String, dynamic>>>{};

  @override
  Future<Map<String, dynamic>> fetchMur() async => {'publications': publications};

  @override
  Future<Map<String, dynamic>> publierMur({String? texte, String? photo}) async {
    appelsPublier++;
    dernierTextePublie = texte;
    dernierePhotoPubliee = photo;
    final cree = {
      'id': 'nouveau',
      'auteur_nom': 'Moi Même',
      'etablissement_nom': 'Céleste',
      'texte': texte ?? '',
      'photo': photo,
      'nb_jaime': 0,
      'nb_commentaires': 0,
      'aime': false,
      'est_auteur': true,
      'cree_le': '2026-11-24T10:00:00.000Z',
    };
    publications = [cree, ...publications];
    return {'publication': cree};
  }

  @override
  Future<Map<String, dynamic>> supprimerPublicationMur(String id) async {
    dernierIdSupprime = id;
    publications = publications.where((p) => p['id'] != id).toList();
    return {'ok': true};
  }

  @override
  Future<Map<String, dynamic>> aimer(String cibleType, String cibleId) async {
    aimes[cibleId] = (aimes[cibleId] ?? 0) + 1;
    return {'cible_type': cibleType, 'cible_id': cibleId, 'nombre': aimes[cibleId], 'a_aime': true};
  }

  @override
  Future<Map<String, dynamic>> retirerAime(String cibleType, String cibleId) async {
    aimes[cibleId] = ((aimes[cibleId] ?? 1) - 1).clamp(0, 1 << 30);
    return {'cible_type': cibleType, 'cible_id': cibleId, 'nombre': aimes[cibleId], 'a_aime': false};
  }

  @override
  Future<Map<String, dynamic>> fetchCommentaires(String cibleType, String cibleId) async {
    return {'commentaires': commentairesParCible[cibleId] ?? [], 'peut_moderer': false};
  }

  @override
  Future<Map<String, dynamic>> posterCommentaire(String cibleType, String cibleId, String texte) async {
    final cree = {
      'id': 'c1',
      'cible_type': cibleType,
      'cible_id': cibleId,
      'auteur_nom': 'Moi Même',
      'texte': texte,
      'cree_le': '2026-11-24T11:00:00.000Z',
      'est_auteur': true,
    };
    commentairesParCible[cibleId] = [...(commentairesParCible[cibleId] ?? []), cree];
    return {'commentaire': cree};
  }
}

class _ClientErreur extends ApiClient {
  @override
  Future<Map<String, dynamic>> fetchMur() async => throw Exception('hors ligne');
}

Map<String, dynamic> _publication({
  required String id,
  required String auteur,
  required String texte,
  String? photo,
  int nbJaime = 0,
  bool aime = false,
  bool estAuteur = false,
}) =>
    {
      'id': id,
      'auteur_nom': auteur,
      'etablissement_nom': 'Céleste',
      'texte': texte,
      'photo': photo,
      'nb_jaime': nbJaime,
      'nb_commentaires': 0,
      'aime': aime,
      'est_auteur': estAuteur,
      'cree_le': '2026-11-24T10:00:00.000Z',
    };

void main() {
  group('PublicationMur.fromJson', () {
    test('tous les champs, nombres en texte', () {
      final p = PublicationMur.fromJson({
        'id': 'p1',
        'auteur_nom': 'Marie K',
        'etablissement_nom': 'Céleste',
        'texte': 'Bonjour',
        'photo': 'data:image/jpeg;base64,/9j/',
        'nb_jaime': '3',
        'nb_commentaires': '2',
        'aime': true,
        'est_auteur': false,
        'cree_le': '2026-11-24T10:00:00.000Z',
      });
      expect(p.id, 'p1');
      expect(p.auteurNom, 'Marie K');
      expect(p.texte, 'Bonjour');
      expect(p.photo, 'data:image/jpeg;base64,/9j/');
      expect(p.nbJaime, 3);
      expect(p.nbCommentaires, 2);
      expect(p.aime, isTrue);
      expect(p.estAuteur, isFalse);
    });

    test('sans photo ni nombres', () {
      final p = PublicationMur.fromJson({'id': 'p2', 'texte': 'Seul le texte'});
      expect(p.photo, isNull);
      expect(p.nbJaime, 0);
      expect(p.auteurNom, '');
    });
  });

  group('octetsPhotoMur', () {
    test('décode une adresse de données', () {
      final octets = octetsPhotoMur('data:image/jpeg;base64,${base64Encode([1, 2, 3])}');
      expect(octets, [1, 2, 3]);
    });

    test('null sur une chaîne illisible', () {
      expect(octetsPhotoMur(null), isNull);
      expect(octetsPhotoMur(''), isNull);
      expect(octetsPhotoMur('pas une image'), isNull);
    });
  });

  test('dateCourteMurPublication : jour/mois/année', () {
    expect(dateCourteMurPublication(DateTime(2026, 11, 24)), '24/11/2026');
    expect(dateCourteMurPublication(null), '');
  });

  group('MurMembresPage', () {
    late _FauxClient faux;

    setUp(() {
      SharedPreferences.setMockInitialValues({});
      app.member = Member('Test', 'CP-TT-2526', 'Céleste', DateTime(2026, 1, 1));
      app.lang = 'fr';
      TiroirContexte.instance.definirPourTests(aEnfants: true, aResultats: true);
      AideCompteurs.instance.reinitialiserPourTests();
      faux = _FauxClient([
        _publication(id: 'p1', auteur: 'Marie K', texte: 'Courage à tous', nbJaime: 3),
        _publication(
          id: 'p2',
          auteur: 'Moi Même',
          texte: 'Photo du culte',
          // PNG 1x1 valide, pour que l'image se décode dans le test.
          photo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
          estAuteur: true,
        ),
      ]);
      faux.aimes['p1'] = 3;
      api = faux;
    });

    tearDown(() {
      app.member = null;
      AideCompteurs.instance.reinitialiserPourTests();
      api = ApiClient();
    });

    Future<void> _pomper(WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(home: MurMembresPage(client: faux)));
      await tester.pumpAndSettle();
    }

    testWidgets('fil : auteurs, textes, J’aime, partage, photo', (tester) async {
      await _pomper(tester);
      expect(find.text('Marie K'), findsOneWidget);
      expect(find.text('Courage à tous'), findsOneWidget);
      expect(find.text('Photo du culte'), findsOneWidget);
      expect(find.text('J’aime · 3'), findsOneWidget);
      expect(find.text('Partager'), findsNWidgets(2));
      // La photo de la publication, en mémoire, en plus du
      // monogramme de l'en-tête.
      expect(find.byWidgetPredicate((w) => w is Image && w.image is MemoryImage), findsOneWidget);
      expect(find.text('Aucune publication pour le moment.'), findsNothing);
      expect(tester.takeException(), isNull);
    });

    testWidgets('fil vide : compositeur visible, état vide', (tester) async {
      faux.publications = [];
      await _pomper(tester);
      expect(find.text('Écrire quelque chose…'), findsOneWidget);
      expect(find.text('Publier'), findsOneWidget);
      expect(find.text('Aucune publication pour le moment.'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('publier : le texte part, la publication apparaît', (tester) async {
      await _pomper(tester);
      await tester.enterText(find.byType(TextField).first, 'Un mot pour le mur');
      await tester.pump();
      await tester.tap(find.text('Publier'));
      await tester.pumpAndSettle();
      expect(faux.appelsPublier, 1);
      expect(faux.dernierTextePublie, 'Un mot pour le mur');
      expect(find.text('Un mot pour le mur'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('J’aime : un toucher aime, le nombre monte', (tester) async {
      await _pomper(tester);
      await tester.tap(find.text('J’aime · 3'));
      await tester.pumpAndSettle();
      expect(find.text('J’aime · 4'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('commenter : le champ envoie le commentaire', (tester) async {
      await _pomper(tester);
      await tester.tap(find.text('Commenter').first);
      await tester.pumpAndSettle();
      await tester.enterText(find.byType(TextField).last, 'Merci pour ce mot');
      await tester.tap(find.byIcon(Icons.send_outlined));
      await tester.pumpAndSettle();
      expect(find.text('Merci pour ce mot'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('supprimer sa publication : confirmation puis retrait', (tester) async {
      await _pomper(tester);
      await tester.tap(find.byTooltip('Supprimer'));
      await tester.pumpAndSettle();
      expect(find.text('Supprimer cette publication ?'), findsOneWidget);
      await tester.tap(find.text('Supprimer').last);
      await tester.pumpAndSettle();
      expect(faux.dernierIdSupprime, 'p2');
      expect(find.text('Photo du culte'), findsNothing);
      expect(tester.takeException(), isNull);
    });

    testWidgets('erreur de chargement : message clair', (tester) async {
      await tester.pumpWidget(MaterialApp(home: MurMembresPage(client: _ClientErreur())));
      await tester.pumpAndSettle();
      expect(find.text('Impossible de charger le mur.'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  });
}
