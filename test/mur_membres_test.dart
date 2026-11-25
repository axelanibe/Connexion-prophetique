// Tests du mur des membres, carte 174, refonte totale
// tranche 2, carte 176, 24 nov. 2026, et mur v2 tranche 1,
// 25 nov. 2026 : modèle, photo en adresse de données, page
// avec compositeur, fil, J'aime, commentaires, partage,
// suppression, bannière, filtres, recherche, pagination et
// détail. Client simulé, sans serveur ni réseau.
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/mur_detail.dart';
import 'package:connexion_prophetique/mur_membres.dart';
import 'package:connexion_prophetique/tiroir_intelligent.dart';

class _FauxClient extends ApiClient {
  _FauxClient(this.publications);

  List<Map<String, dynamic>> publications;
  String? dernierTextePublie;
  String? dernierePhotoPubliee;
  String? derniereCategoriePubliee;
  String? derniereCategorie;
  String? derniereRecherche;
  String? dernierAvant;
  Map<String, dynamic>? pageSuivante;
  int appelsPublier = 0;
  String? dernierIdSupprime;
  final aimes = <String, int>{};
  final commentairesParCible = <String, List<Map<String, dynamic>>>{};

  @override
  Future<Map<String, dynamic>> fetchMur({
    String? categorie,
    String? recherche,
    String? avant,
    int? limite,
  }) async {
    derniereCategorie = categorie;
    derniereRecherche = recherche;
    dernierAvant = avant;
    if (avant != null && pageSuivante != null) return pageSuivante!;
    var liste = publications;
    if (categorie != null) {
      liste = liste.where((p) => (p['categorie'] ?? 'autre') == categorie).toList();
    }
    if (recherche != null) {
      liste = liste
          .where((p) => (p['texte'] ?? '').toString().toLowerCase().contains(recherche.toLowerCase()))
          .toList();
    }
    return {'publications': liste, 'suivante': pageSuivante != null ? 'abc' : null};
  }

  @override
  Future<Map<String, dynamic>> fetchMurDetail(String id) async {
    return {
      'publication': publications.firstWhere((p) => p['id'] == id, orElse: () => publications.first),
    };
  }

  @override
  Future<Map<String, dynamic>> fetchPhotosAuteurs(List<String> ids) async => {'photos': []};

  @override
  Future<Map<String, dynamic>> publierMur({String? texte, String? photo, String? categorie}) async {
    appelsPublier++;
    dernierTextePublie = texte;
    dernierePhotoPubliee = photo;
    derniereCategoriePubliee = categorie;
    final cree = {
      'id': 'nouveau',
      'auteur_nom': 'Moi Même',
      'etablissement_nom': 'Céleste',
      'texte': texte,
      'photo': photo,
      'categorie': categorie,
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
  Future<Map<String, dynamic>> fetchMur({
    String? categorie,
    String? recherche,
    String? avant,
    int? limite,
  }) async =>
      throw Exception('hors ligne');
}

Map<String, dynamic> _publication({
  required String id,
  required String auteur,
  required String texte,
  String? photo,
  String categorie = 'temoignage',
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
      'categorie': categorie,
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
        'categorie': 'priere',
        'statut_moderation': 'visible',
        'nb_jaime': '3',
        'nb_amen': '1',
        'nb_priere': '2',
        'mon_type': 'amen',
        'nb_commentaires': '2',
        'aime': true,
        'enregistre': true,
        'est_auteur': false,
        'cree_le': '2026-11-24T10:00:00.000Z',
      });
      expect(p.id, 'p1');
      expect(p.auteurNom, 'Marie K');
      expect(p.texte, 'Bonjour');
      expect(p.photo, 'data:image/jpeg;base64,/9j/');
      expect(p.categorie, 'priere');
      expect(p.nbJaime, 3);
      expect(p.nbAmen, 1);
      expect(p.nbPriere, 2);
      expect(p.monType, 'amen');
      expect(p.nbCommentaires, 2);
      expect(p.aime, isTrue);
      expect(p.enregistre, isTrue);
      expect(p.estAuteur, isFalse);
    });

    test('sans photo ni nombres', () {
      final p = PublicationMur.fromJson({'id': 'p2', 'texte': 'Seul le texte'});
      expect(p.photo, isNull);
      expect(p.nbJaime, 0);
      expect(p.categorie, 'autre');
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
      // Fenêtre haute, 25 nov. 2026 : la bannière, le
      // compositeur et les filtres poussent le fil plus bas,
      // et la liste du corps est paresseuse, les cartes sous
      // la pliure ne sont pas construites sur 600 px.
      tester.view.physicalSize = const Size(800, 1600);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.reset);
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

    testWidgets('bannière, filtres et loupe de recherche', (tester) async {
      await _pomper(tester);
      expect(find.textContaining('Car là où sont deux ou trois'), findsOneWidget);
      expect(find.text('Matthieu 18:20'), findsOneWidget);
      expect(find.text('Tous'), findsOneWidget);
      expect(find.text('Prières'), findsOneWidget);
      expect(find.text('Versets'), findsOneWidget);
      expect(find.text('Rechercher sur le mur…'), findsNothing);
      // La loupe est au bout de la rangée de filtres, qui
      // défile horizontalement, on l'amène à l'écran avant
      // de la toucher.
      await tester.ensureVisible(find.byTooltip('Rechercher sur le mur…'));
      await tester.pumpAndSettle();
      await tester.tap(find.byTooltip('Rechercher sur le mur…'));
      await tester.pumpAndSettle();
      expect(find.text('Rechercher sur le mur…'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('filtre par catégorie', (tester) async {
      faux.publications = [
        _publication(id: 'p1', auteur: 'Marie K', texte: 'Témoignage', categorie: 'temoignage'),
        _publication(id: 'p2', auteur: 'Grace', texte: 'Prière du soir', categorie: 'priere'),
      ];
      await _pomper(tester);
      expect(find.text('Témoignage'), findsOneWidget);
      expect(find.text('Prière du soir'), findsOneWidget);
      await tester.tap(find.text('Prières'));
      await tester.pumpAndSettle();
      expect(faux.derniereCategorie, 'priere');
      expect(find.text('Témoignage'), findsNothing);
      expect(find.text('Prière du soir'), findsOneWidget);
      await tester.tap(find.text('Tous'));
      await tester.pumpAndSettle();
      expect(faux.derniereCategorie, isNull);
      expect(find.text('Témoignage'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('recherche : la saisie filtre le fil', (tester) async {
      faux.publications = [
        _publication(id: 'p1', auteur: 'Marie K', texte: 'Bonjour à tous'),
        _publication(id: 'p2', auteur: 'Grace', texte: 'Prière du soir'),
      ];
      await _pomper(tester);
      await tester.ensureVisible(find.byTooltip('Rechercher sur le mur…'));
      await tester.pumpAndSettle();
      await tester.tap(find.byTooltip('Rechercher sur le mur…'));
      await tester.pumpAndSettle();
      await tester.enterText(find.byType(TextField).last, 'prière');
      await tester.testTextInput.receiveAction(TextInputAction.search);
      await tester.pumpAndSettle();
      expect(faux.derniereRecherche, 'prière');
      expect(find.text('Bonjour à tous'), findsNothing);
      expect(find.text('Prière du soir'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('pagination : Afficher plus charge la suite', (tester) async {
      faux.pageSuivante = {
        'publications': [_publication(id: 'p2', auteur: 'Grace', texte: 'Deuxième page')],
        'suivante': null,
      };
      await _pomper(tester);
      expect(find.text('Courage à tous'), findsOneWidget);
      expect(find.text('Deuxième page'), findsNothing);
      expect(find.text('Afficher plus'), findsOneWidget);
      await tester.tap(find.text('Afficher plus'));
      await tester.pumpAndSettle();
      expect(faux.dernierAvant, 'abc');
      expect(find.text('Courage à tous'), findsOneWidget);
      expect(find.text('Deuxième page'), findsOneWidget);
      expect(find.text('Afficher plus'), findsNothing);
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
      expect(faux.derniereCategoriePubliee, 'temoignage');
      expect(find.text('Un mot pour le mur'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('publier sans texte : le bouton est désactivé', (tester) async {
      await _pomper(tester);
      final bouton = tester.widget<FilledButton>(find.widgetWithText(FilledButton, 'Publier'));
      expect(bouton.onPressed, isNull);
      expect(faux.appelsPublier, 0);
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

    testWidgets('détail : un toucher sur le texte ouvre la page', (tester) async {
      await _pomper(tester);
      await tester.tap(find.text('Courage à tous'));
      await tester.pumpAndSettle();
      // Le titre de la page n'est pas affiché en texte quand
      // un membre est connecté, l'en-tête ne montre que le
      // sigle, la présence de la page suffit.
      expect(find.byType(MurDetailPage), findsOneWidget);
      expect(find.text('Courage à tous'), findsOneWidget);
      await tester.tap(find.byTooltip('Retour'));
      await tester.pumpAndSettle();
      expect(find.byType(MurDetailPage), findsNothing);
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
