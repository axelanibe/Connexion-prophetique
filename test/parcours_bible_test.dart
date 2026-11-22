// Tests du parcours Bible 1 an et des badges de lecture,
// 21 nov. 2026, tranche 8 de l'audit du 17 nov. : calendrier
// généré depuis la structure des livres, libellés des jours,
// badges déduits des jours lus, page avec progression et
// marquage. Aucun texte biblique inventé : les jours sont des
// références livre et chapitre seulement.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/parcours_bible.dart';

void main() {
  group('joursPlanAnnuel', () {
    test('tous les chapitres, dans l’ordre, sur 365 jours', () {
      final chapitresParLivre = List<int>.filled(66, 18);
      final jours = joursPlanAnnuel(chapitresParLivre);
      expect(jours.length, nbJoursPlanAnnuel);
      final total = jours.fold<int>(0, (somme, jour) => somme + jour.length);
      expect(total, 66 * 18);
      // 1188 chapitres : 93 jours de 4, 272 jours de 3.
      expect(jours.first.length, 4);
      expect(jours[92].length, 4);
      expect(jours[93].length, 3);
      expect(jours.last.length, 3);
      // Continuité : le premier chapitre d'un jour suit le
      // dernier du jour précédent, sans trou ni répétition.
      final plats = jours.expand((jour) => jour).toList();
      for (var i = 1; i < plats.length; i++) {
        final avant = plats[i - 1];
        final apres = plats[i];
        if (apres.$1 == avant.$1) {
          expect(apres.$2, avant.$2 + 1);
        } else {
          expect(apres.$1, avant.$1 + 1);
          expect(apres.$2, 1);
        }
      }
      expect(plats.first, (0, 1));
      expect(plats.last, (65, 18));
    });

    test('petite structure : un chapitre par jour, puis vide', () {
      final jours = joursPlanAnnuel([3, 2]);
      expect(jours.length, nbJoursPlanAnnuel);
      expect(jours[0], [(0, 1)]);
      expect(jours[4], [(1, 2)]);
      expect(jours[5], isEmpty);
      expect(jours.last, isEmpty);
    });

    test('sans livre, 365 jours vides', () {
      final jours = joursPlanAnnuel([]);
      expect(jours.length, nbJoursPlanAnnuel);
      expect(jours.every((jour) => jour.isEmpty), isTrue);
    });
  });

  group('libelleJourPlanAnnuel', () {
    const noms = ['Genèse', 'Exode', 'Lévitique'];
    test('un seul chapitre', () {
      expect(libelleJourPlanAnnuel([(0, 1)], noms), 'Genèse 1');
    });

    test('plusieurs chapitres du même livre', () {
      expect(libelleJourPlanAnnuel([(0, 1), (0, 2), (0, 3)], noms), 'Genèse 1–3');
    });

    test('jour à cheval sur deux livres', () {
      expect(libelleJourPlanAnnuel([(0, 50), (1, 1), (1, 2)], noms), 'Genèse 50 · Exode 1–2');
    });

    test('jour vide, sans libellé', () {
      expect(libelleJourPlanAnnuel([], noms), '');
    });
  });

  group('badgesLectureGagnes', () {
    test('aucun badge à zéro jour', () {
      expect(badgesLectureGagnes(0), isEmpty);
      expect(badgesLectureGagnes(6), isEmpty);
    });

    test('seuils 7, 30, 100, 365 jours, puis plan terminé', () {
      expect(badgesLectureGagnes(7), ['jours_7']);
      expect(badgesLectureGagnes(30), ['jours_7', 'jours_30']);
      expect(badgesLectureGagnes(100), ['jours_7', 'jours_30', 'jours_100']);
      expect(badgesLectureGagnes(364), ['jours_7', 'jours_30', 'jours_100']);
      expect(badgesLectureGagnes(365), ['jours_7', 'jours_30', 'jours_100', 'jours_365', 'termine']);
    });
  });

  group('ParcoursBiblePage', () {
    testWidgets('progression, badges et marquage d’un jour', (tester) async {
      var bascule = 0;
      await tester.pumpWidget(MaterialApp(
        home: ParcoursBiblePage(
          lang: 'fr',
          joursLus: {1},
          onBasculerJour: (jour) => bascule = jour,
          onOuvrirChapitre: (livre, chapitre) {},
          chapitresParLivre: const [2, 1],
          nomsLivres: const ['Genèse', 'Exode'],
        ),
      ));
      await tester.pumpAndSettle();
      expect(find.text('1 / 365'), findsOneWidget);
      expect(find.text('Jour 1'), findsOneWidget);
      expect(find.text('Genèse 1'), findsOneWidget);
      expect(find.text('Lu'), findsOneWidget);
      await tester.tap(find.text('Marquer lu').first);
      await tester.pumpAndSettle();
      expect(bascule, 2);
    });
  });
}
