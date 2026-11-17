// Tests de la carte 130 v2, 16 nov. 2026 : navigation façon
// Facebook. La barre du bas a 5 onglets en pilule flottante,
// Plus disparaît, ses entrées vivent dans le menu latéral,
// groupées : Mon espace, La structure, Outils. Aucune entrée
// perdue, aucune page supprimée.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/home_web.dart';
import 'package:connexion_prophetique/main.dart';

void main() {
  group('Carte 130, barre du bas', () {
    testWidgets('5 onglets, Accueil, Bible, Librairie, Structure, Carte, sans Plus', (tester) async {
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(
          body: const SizedBox.shrink(),
          bottomNavigationBar: BottomNavWeb(index: 0, onTap: (_) {}),
        ),
      ));
      await tester.pump();
      expect(find.text('Accueil'), findsOneWidget);
      expect(find.text('Bible'), findsOneWidget);
      expect(find.text('Librairie'), findsOneWidget);
      expect(find.text('Structure'), findsOneWidget);
      expect(find.text('Carte'), findsOneWidget);
      expect(find.text('Plus'), findsNothing);
    });
  });

  group('Carte 130, menu latéral, visiteur', () {
    Future<void> ouvrirMenu(WidgetTester tester) async {
      final cle = GlobalKey<ScaffoldState>();
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(key: cle, drawer: const MenuLateral(), body: const SizedBox.shrink()),
      ));
      await tester.pump();
      cle.currentState!.openDrawer();
      await tester.pumpAndSettle();
    }

    // Le tiroir défile : une entrée sous le pli n'est construite
    // qu'après défilement. On fait défiler par sauts de 100 px,
    // sans fling : les bonds de scrollUntilVisible sautent les
    // entrées, le fling dépasse la cible sans jamais la construire.
    Future<void> presente(WidgetTester tester, String texte) async {
      final scrollable = tester.state<ScrollableState>(find.byType(Scrollable));
      for (int i = 0; i < 30; i++) {
        if (find.text(texte).evaluate().isNotEmpty) {
          await tester.ensureVisible(find.text(texte));
          expect(find.text(texte), findsOneWidget);
          return;
        }
        scrollable.position.jumpTo(scrollable.position.pixels + 100);
        await tester.pump();
      }
      fail('Entrée introuvable dans le tiroir : $texte');
    }

    testWidgets('les 3 groupes et les entrées du visiteur, sans les entrées membre', (tester) async {
      await ouvrirMenu(tester);
      // Ordre du document, de haut en bas : le défilement ne va
      // que vers le bas, on vérifie dans l'ordre des sections.
      await presente(tester, 'Mon espace');
      await presente(tester, 'Mon épanouissement');
      await presente(tester, 'Mes résultats scolaires');
      await presente(tester, 'Mes enfants');
      await presente(tester, 'Mes responsabilités');
      await presente(tester, 'Mes attestations');
      await presente(tester, 'Mes achats');
      await presente(tester, 'Historique des transactions');
      await presente(tester, 'La structure');
      await presente(tester, 'Don');
      await presente(tester, 'Tremplin professionnel');
      await presente(tester, 'Mes absences et demandes');
      await presente(tester, 'Outils');
      await presente(tester, 'Taille du texte');
      await presente(tester, 'Playlist');
      await presente(tester, 'Signaler un problème');
      await presente(tester, 'Notifications');
      await presente(tester, 'Visite guidée');
      await presente(tester, 'À propos & Aide');
      expect(find.text('Devenir partenaire'), findsNothing);
      expect(find.text('Mes enseignements'), findsNothing);
      expect(find.text('Abonnement Plateforme'), findsNothing);
      expect(find.text('Espace structure'), findsNothing);
    });

    testWidgets('le menu se referme au toucher d’une entrée', (tester) async {
      await ouvrirMenu(tester);
      await presente(tester, 'Visite guidée');
      await tester.pumpAndSettle();
      await tester.tap(find.text('Visite guidée'));
      await tester.pumpAndSettle();
      expect(find.text('Mon espace'), findsNothing);
    });
  });
}
