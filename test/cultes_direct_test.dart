// Tests du culte en direct et du replay chapitré, 21 nov.
// 2026, tranches 4 et 5 de l'audit du 17 nov. : lecture,
// mise en avant sur l'accueil, format des chapitres, choix
// audio ou vidéo du replay, état vide. Client simulé, sans
// serveur ni réseau.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/cultes_direct.dart';

class _ClientFaux extends ApiClient {
  _ClientFaux({this.cultes = const []});

  final List<Map<String, dynamic>> cultes;

  @override
  Future<Map<String, dynamic>> fetchCultesDirect() async => {'cultes': cultes};
}

void main() {
  group('dureeChapitreFormatee', () {
    test('0:00, minutes, puis heures', () {
      expect(dureeChapitreFormatee(0), '0:00');
      expect(dureeChapitreFormatee(90), '1:30');
      expect(dureeChapitreFormatee(754), '12:34');
      expect(dureeChapitreFormatee(3661), '1:01:01');
      expect(dureeChapitreFormatee(-5), '0:00');
    });
  });

  group('parseDebutMmSs', () {
    test('mm:ss, secondes seules, illisible', () {
      expect(parseDebutMmSs('12:34'), 754);
      expect(parseDebutMmSs('0:00'), 0);
      expect(parseDebutMmSs('90'), 90);
      expect(parseDebutMmSs('1:02:03'), 3723);
      expect(parseDebutMmSs('bientôt'), isNull);
      expect(parseDebutMmSs(''), isNull);
      expect(parseDebutMmSs('1:2:3:4'), isNull);
    });
  });

  group('replayEstVideo', () {
    test('vidéo par extension, audio sinon', () {
      expect(replayEstVideo('https://exemple.ci/replay.mp4'), isTrue);
      expect(replayEstVideo('https://exemple.ci/direct.m3u8'), isTrue);
      expect(replayEstVideo('https://exemple.ci/replay.MP4?jeton=1'), isTrue);
      expect(replayEstVideo('https://exemple.ci/replay.mp3'), isFalse);
      expect(replayEstVideo('https://exemple.ci/replay'), isFalse);
      expect(replayEstVideo(''), isFalse);
    });
  });

  group('CulteDirect.fromJson', () {
    test('chapitres triés par début croissant', () {
      final culte = CulteDirect.fromJson({
        'id': 'c1', 'titre': 'Culte du dimanche', 'date': '2026-11-22',
        'url_direct': 'https://exemple.ci/direct', 'url_replay': 'https://exemple.ci/replay.mp3',
        'statut': 'terminé',
        'chapitres': [
          {'id': 'h2', 'titre': 'Message', 'debut_secondes': 600},
          {'id': 'h1', 'titre': 'Louange', 'debut_secondes': 0},
        ],
      });
      expect(culte.chapitres.map((c) => c.titre).toList(), ['Louange', 'Message']);
      expect(culte.aReplay, isTrue);
      expect(culte.estEnDirect, isFalse);
    });

    test('sans chapitre ni lien, état vide propre', () {
      final culte = CulteDirect.fromJson({
        'id': 'c1', 'titre': 'Culte', 'date': '2026-11-22', 'statut': 'à venir',
      });
      expect(culte.chapitres, isEmpty);
      expect(culte.urlDirect, '');
      expect(culte.aReplay, isFalse);
    });
  });

  group('culteDirectEnAvantLocal', () {
    test('en direct d’abord, sinon programmé, sinon rien', () {
      final aVenir = CulteDirect(id: '1', titre: 'A', statut: 'à venir');
      final enDirect = CulteDirect(id: '2', titre: 'B', statut: 'en direct');
      final termine = CulteDirect(id: '3', titre: 'C', statut: 'terminé');
      expect(culteDirectEnAvantLocal([aVenir, enDirect]), enDirect);
      expect(culteDirectEnAvantLocal([aVenir, termine]), aVenir);
      expect(culteDirectEnAvantLocal([termine]), isNull);
      expect(culteDirectEnAvantLocal([]), isNull);
    });
  });

  group('cultesDirectDepuisReponse', () {
    test('liste dans l’ordre renvoyé, vide sans clé', () {
      final liste = cultesDirectDepuisReponse({
        'cultes': [
          {'id': 'c1', 'titre': 'Culte', 'date': '2026-11-22', 'statut': 'à venir'},
        ],
      });
      expect(liste.length, 1);
      expect(cultesDirectDepuisReponse({}), isEmpty);
    });
  });

  group('CultesDirectPage', () {
    testWidgets('état vide, sans culte inventé', (tester) async {
      await tester.pumpWidget(MaterialApp(home: CultesDirectPage(client: _ClientFaux())));
      await tester.pumpAndSettle();
      expect(find.text('Aucun culte en direct ni programmé pour le moment.'), findsOneWidget);
    });

    testWidgets('culte terminé avec replay audio, sans lien de direct', (tester) async {
      final faux = _ClientFaux(cultes: [
        {
          'id': 'c1', 'titre': 'Culte du dimanche', 'date': '2026-11-22',
          'url_direct': '', 'url_replay': 'https://exemple.ci/replay.mp3', 'statut': 'terminé',
          'chapitres': [
            {'id': 'h1', 'titre': 'Louange', 'debut_secondes': 0},
            {'id': 'h2', 'titre': 'Message', 'debut_secondes': 600},
          ],
        },
      ]);
      await tester.pumpWidget(MaterialApp(home: CultesDirectPage(client: faux)));
      await tester.pumpAndSettle();
      expect(find.text('Culte du dimanche'), findsOneWidget);
      expect(find.text('Louange'), findsOneWidget);
      expect(find.text('10:00'), findsOneWidget);
      expect(find.text('Replay'), findsOneWidget);
      expect(find.text('Regarder'), findsNothing);
    });
  });
}
