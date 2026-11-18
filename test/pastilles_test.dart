// Tests des pastilles, tranche pastilles et icônes, 17 nov. 2026 :
// P1 compteur du panier en or (vérifié par relecture du diff, le
// Badge vit dans l'en-tête connecté), P3 « En attente » unifié sur
// l'or, P4 pastille or fusionnée, P5 filtres unifiés sur blanc,
// P7 pastille Conflit (vérifiée par relecture, la liste de planning
// demande des données serveur), P9 verts de validation réduits
// à deux paires.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/print_html.dart';

void main() {
  group('P3 et P9, statuts de paiement', () {
    test('en attente : texte or, fond or pâle', () {
      expect(statutPaiementCouleur('en_attente'), Cp.goldDeep);
      expect(statutPaiementFond('en_attente'), const Color(0xFFFEF3C7));
    });

    test('confirmé : vert foncé, fond vert pâle', () {
      expect(statutPaiementCouleur('confirme'), const Color(0xFF1B6B3A));
      expect(statutPaiementFond('confirme'), const Color(0xFFDCFCE7));
    });

    test('refusé : rouge, fond rouge pâle', () {
      expect(statutPaiementCouleur('refuse'), const Color(0xFFB3261E));
      expect(statutPaiementFond('refuse'), const Color(0xFFFEE2E2));
    });

    testWidgets('la pastille rend le fond or pâle pour un paiement en attente', (tester) async {
      await tester.pumpWidget(
        MaterialApp(home: Scaffold(body: pastilleStatutPaiement('en_attente'))),
      );
      await tester.pump();
      final container = tester.widget<Container>(find.byType(Container).first);
      final decoration = container.decoration as BoxDecoration;
      expect(decoration.color, const Color(0xFFFEF3C7));
    });
  });

  group('P4, pastille or fusionnée', () {
    test('pastilleNombre plafonne à 99+', () {
      expect(pastilleNombre(0), '0');
      expect(pastilleNombre(5), '5');
      expect(pastilleNombre(99), '99');
      expect(pastilleNombre(100), '99+');
      expect(pastilleNombre(150), '99+');
    });

    testWidgets('pastilleOr : fond or, texte bleu nuit gras', (tester) async {
      await tester.pumpWidget(
        MaterialApp(home: Scaffold(body: pastilleOr('3'))),
      );
      await tester.pump();
      expect(find.text('3'), findsOneWidget);
      final container = tester.widget<Container>(find.byType(Container).first);
      final decoration = container.decoration as BoxDecoration;
      expect(decoration.color, Cp.gold);
      final text = tester.widget<Text>(find.text('3'));
      expect(text.style?.color, Cp.navy);
      expect(text.style?.fontWeight, FontWeight.bold);
    });
  });

  group('P5, filtres unifiés sur blanc', () {
    testWidgets('filterChips : sélectionné bleu nuit et texte blanc, sinon blanc et bleu nuit', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(body: filterChips(['Tous', 'Structure'], 'Tous', (_) {})),
        ),
      );
      await tester.pump();
      final selectionne = tester.widget<Text>(find.text('Tous'));
      expect(selectionne.style?.color, Colors.white);
      final autre = tester.widget<Text>(find.text('Structure'));
      expect(autre.style?.color, Cp.navy);
    });

    testWidgets('filterChipsHorizontal : même règle', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(body: filterChipsHorizontal(['Tous', 'Bureau'], 'Bureau', (_) {})),
        ),
      );
      await tester.pump();
      final selectionne = tester.widget<Text>(find.text('Bureau'));
      expect(selectionne.style?.color, Colors.white);
      final autre = tester.widget<Text>(find.text('Tous'));
      expect(autre.style?.color, Cp.navy);
    });
  });

  group('P9, verts de validation dans les impressions', () {
    test('le vert des cartes imprimées est le vert réduit, pas l’ancien', () {
      final html = buildCardsHtml(
        [
          PrintMember(
            name: 'TEST',
            matricule: 'CP-TE-2526',
            fonction: 'Membre',
            etab: 'Céleste',
            photoDataUrl: '',
            valideLabel: 'Valide',
            qrDataUrl: '',
            membreDepuis: '2026',
          ),
        ],
        '',
      );
      expect(html.contains('#34D399'), isTrue);
      expect(html.contains('#2FD27A'), isFalse);
    });

    test('le vert des badges imprimés est le vert réduit, pas l’ancien', () {
      final html = buildBadgesHtml([], '');
      expect(html.contains('#34D399'), isTrue);
      expect(html.contains('#2FD27A'), isFalse);
    });
  });
}
