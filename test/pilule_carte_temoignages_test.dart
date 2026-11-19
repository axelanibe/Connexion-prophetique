// Tests de la tranche pilule Carte, 17 nov. 2026 : retrait de
// l'onglet Carte de la pilule, cinquième onglet Témoignages,
// page Témoignages avec modération, photo de profil discrète.
// 18 nov. 2026 : Témoignages quitte la pilule et rejoint le
// tiroir, la pilule revient à 4 onglets, la page reste à
// l'index canonique 4.
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/design_config.dart';
import 'package:connexion_prophetique/home_web.dart';
import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/temoignages.dart';
import 'package:connexion_prophetique/visite_guidee.dart';

class _FauxClient extends ApiClient {
  _FauxClient(this.reponse, {this.roleForce});

  final Map<String, dynamic> reponse;
  final String? roleForce;

  @override
  String? get role => roleForce;

  @override
  Future<Map<String, dynamic>> fetchTemoignages() async => reponse;
}

Map<String, dynamic> _reponse({required bool r2, String? role}) => {
      'r2': r2,
      'temoignages': [
        {'id': 't1', 'auteur_nom': 'Marie K', 'etablissement_nom': 'Céleste', 'url': 'https://exemple.test/a.mp4', 'statut': 'approuve', 'cree_le': '2026-11-17T10:00:00.000Z'},
      ],
      'mes_temoignages': [
        {'id': 't2', 'auteur_nom': 'Moi Même', 'etablissement_nom': 'Céleste', 'url': 'https://exemple.test/b.mp4', 'statut': 'en_attente', 'cree_le': '2026-11-17T11:00:00.000Z'},
      ],
      'moderation': role == 'admin_general'
          ? [
              {'id': 't3', 'auteur_nom': 'Paul B', 'etablissement_nom': 'ISPAM', 'url': 'https://exemple.test/c.mp4', 'statut': 'en_attente', 'cree_le': '2026-11-17T09:00:00.000Z'},
            ]
          : [],
    };

void main() {
  group('Pilule : Témoignages quitte la pilule, 4 onglets', () {
    test('ongletsNav : 4 onglets, Accueil, Bible, Librairie, Structure, plus de Témoignages ni de Carte', () {
      final onglets = ongletsNav();
      expect(onglets.length, 4);
      expect(onglets.map((o) => o.$2).toList(), ['Accueil', 'Bible', 'Librairie', 'Structure']);
    });

    test('ordreNav : Témoignages et Plus filtrés, même avec l’ordre serveur', () {
      final avant = currentDesignConfig;
      try {
        setCurrentDesignConfig(DesignConfig.fromJson({
          'ordreSections': ['plus', 'temoignages', 'structure', 'librairie', 'bible', 'accueil'],
        }));
        expect(ordreNav(), [3, 2, 1, 0]);
      } finally {
        setCurrentDesignConfig(avant);
      }
    });

    testWidgets('pilule : 4 onglets, toucher Structure renvoie l index 3, pas de Témoignages', (tester) async {
      var touche = -1;
      await tester.pumpWidget(
        MaterialApp(home: Scaffold(bottomNavigationBar: BottomNavWeb(index: 0, onTap: (i) => touche = i))),
      );
      await tester.pump();
      expect(find.byIcon(Icons.ondemand_video_outlined), findsNothing);
      expect(find.byIcon(Icons.badge_outlined), findsNothing);
      await tester.tap(find.byIcon(Icons.group_outlined));
      expect(touche, 3);
    });

    testWidgets('barre du haut : 4 onglets, sans Témoignages, toucher Structure renvoie 3', (tester) async {
      var touche = -1;
      await tester.pumpWidget(
        MaterialApp(home: Scaffold(body: TopNavWeb(index: 0, onTap: (i) => touche = i))),
      );
      await tester.pump();
      expect(find.text('Accueil'), findsOneWidget);
      expect(find.text('Structure'), findsOneWidget);
      expect(find.text('Témoignages'), findsNothing);
      expect(find.text('Carte'), findsNothing);
      await tester.tap(find.text('Structure'));
      expect(touche, 3);
    });

    test('barre du haut AppShell : plus de cas Carte, seul l accueil visiteur', () {
      expect(navigationBarreHautAppShell(true, 4, true), isFalse);
      expect(navigationBarreHautAppShell(true, 0, false), isTrue);
      expect(navigationBarreHautAppShell(true, 0, true), isFalse);
      expect(navigationBarreHautAppShell(false, 4, true), isFalse);
    });

    test('ordre serveur : la clé temoignages est la cinquième, carte est invalide', () {
      final avant = currentDesignConfig;
      try {
        setCurrentDesignConfig(DesignConfig.fromJson({
          'ordreSections': ['plus', 'temoignages', 'structure', 'librairie', 'bible', 'accueil'],
        }));
        expect(designNavOrder(), [5, 4, 3, 2, 1, 0]);
        setCurrentDesignConfig(DesignConfig.fromJson({
          'ordreSections': ['accueil', 'bible', 'librairie', 'structure', 'carte', 'plus'],
        }));
        expect(designNavOrder(), [0, 1, 2, 3, 4, 5]);
      } finally {
        setCurrentDesignConfig(avant);
      }
    });

    test('visite guidée : étape Témoignages sur l onglet 4, plus de Carte de membre', () {
      final etapes = etapesVisiteGuidee(admin: false);
      expect(etapes.where((e) => e.titre == 'Témoignages').length, 1);
      expect(etapes.firstWhere((e) => e.titre == 'Témoignages').tab, 4);
      expect(etapes.where((e) => e.titre == 'Carte de membre'), isEmpty);
      expect(kPresentation99Titres[4], 'Témoignages');
    });

    test('chemin web : /temoignages est la section 4, /carte n existe plus', () {
      final chemins = File('lib/route_path_web.dart').readAsStringSync();
      expect(chemins, contains("'/temoignages'"));
      expect(chemins, isNot(contains("'/carte'")));
    });
  });

  group('Carte ouverte directement, plus par onglet', () {
    late String source;

    setUpAll(() {
      source = File('lib/main.dart').readAsStringSync();
    });

    test('le lien Shalom ouvre la page Carte directement, jamais _goTo(4)', () {
      expect(source, contains('onOpenCard: () => go(c, const NouvelleCartePage())'));
      expect(source, isNot(contains('_goTo(4)')));
      expect(source, contains('TemoignagesPage(client: api, scrollController: _tabScroll[4])'));
    });
  });

  group('Témoignages : modèle et page', () {
    test('modèle : statuts et libellés, date courte', () {
      final t = Temoignage.fromJson({'id': 'x', 'url': 'https://exemple.test/x.mp4', 'auteur_nom': 'Marie Koffi', 'statut': 'en_attente', 'cree_le': '2026-11-17T10:00:00.000Z'});
      expect(t.prenomAuteur, 'Marie');
      expect(t.enAttente, isTrue);
      expect(t.approuve, isFalse);
      expect(libelleStatutTemoignage('en_attente'), 'En attente');
      expect(libelleStatutTemoignage('approuve'), 'Approuvé');
      expect(libelleStatutTemoignage('refuse'), 'Refusé');
      expect(dateCourteTemoignage(t.creeLe), '17/11/2026');
      expect(dateCourteTemoignage(null), '');
    });

    testWidgets('page : fil approuvé, mes témoignages en attente, publication visible', (tester) async {
      await tester.pumpWidget(
        MaterialApp(home: TemoignagesPage(client: _FauxClient(_reponse(r2: true)))),
      );
      await tester.pump();
      await tester.pump();
      expect(find.text('Marie K'), findsOneWidget);
      expect(find.text('Moi Même'), findsOneWidget);
      expect(find.text('En attente'), findsOneWidget);
      expect(find.text('Publier un témoignage'), findsOneWidget);
      expect(find.text('À modérer (1)'), findsNothing);
    });

    testWidgets('page : le Bureau voit la file de modération avec Approuver et Refuser', (tester) async {
      await tester.pumpWidget(
        MaterialApp(home: TemoignagesPage(client: _FauxClient(_reponse(r2: true, role: 'admin_general'), roleForce: 'admin_general'))),
      );
      await tester.pump();
      await tester.pump();
      expect(find.text('À modérer (1)'), findsOneWidget);
      expect(find.text('Paul B'), findsOneWidget);
      expect(find.text('Approuver'), findsOneWidget);
      expect(find.text('Refuser'), findsOneWidget);
    });

    testWidgets('page : sans clés R2, message clair et pas de publication', (tester) async {
      await tester.pumpWidget(
        MaterialApp(home: TemoignagesPage(client: _FauxClient({'r2': false, 'temoignages': [], 'mes_temoignages': [], 'moderation': []}))),
      );
      await tester.pump();
      await tester.pump();
      expect(find.text('Les témoignages sont désactivés pour le moment.'), findsOneWidget);
      expect(find.text('Publier un témoignage'), findsNothing);
    });
  });

  group('Photo de profil discrète', () {
    late String profil;
    late String infos;

    setUpAll(() {
      profil = File('lib/main.dart').readAsStringSync();
      infos = File('lib/carte_nouvelle.dart').readAsStringSync();
    });

    test('Profil : plus de gros bouton Changer ma photo, pastille appareil photo sur l avatar', () {
      expect(profil, isNot(contains("Text(tr('Changer ma photo'))")));
      expect(profil, contains('onTap: () => _changerPhotoProfil(context)'));
      expect(profil, contains('Icons.photo_camera_outlined, size: 15, color: Colors.white'));
      expect(profil, contains('Colors.black.withValues(alpha: 0.45)'));
    });

    test('Modifier mes infos : aperçu de la photo actuelle et bouton discret Modifier ou Remplacer', () {
      expect(infos, contains('CircleAvatar(radius: 36, backgroundImage: memberPhotoProvider(m))'));
      expect(infos, contains("Text(m.hasPhoto ? tr('Remplacer') : tr('Modifier')"));
      expect(infos, contains('Future<void> _changerPhoto() async'));
      expect(infos, contains('app.uploadMemberPhotoData(dataUrl)'));
    });
  });
}
