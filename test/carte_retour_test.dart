// Retour de la page Carte, étape 2, 20 nov. 2026 : une flèche de
// retour discrète en haut à gauche, dans les trois états de la
// page (non connecté, carte non payée, carte affichée), sans rien
// changer d'autre sur la page. Sans serveur, sans réseau.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/carte_nouvelle.dart';
import 'package:connexion_prophetique/main.dart';

void main() {
  tearDown(() {
    app.member = null;
    app.isAdmin = false;
    app.paidCardMatricules.clear();
    app.requests.clear();
  });

  Future<void> _pomperCarte(WidgetTester tester) async {
    await tester.pumpWidget(
      const MaterialApp(home: NouvelleCartePage()),
    );
    await tester.pump();
    await tester.pump();
  }

  group('Carte, flèche de retour', () {
    testWidgets('non connecté : la flèche est là, avec le bouton de connexion', (tester) async {
      app.member = null;
      await _pomperCarte(tester);
      expect(find.byIcon(Icons.arrow_back), findsOneWidget);
      expect(find.text('Créer un compte ou se connecter'), findsOneWidget);
    });

    testWidgets('carte non payée : la flèche est là, avec le bouton de création', (tester) async {
      app.member = Member('ANIBE ADJA MAURICE AXEL', 'CP-AA-2526', 'Céleste', DateTime(2026, 1, 1));
      await _pomperCarte(tester);
      expect(find.byIcon(Icons.arrow_back), findsOneWidget);
      expect(find.text('Créer ma carte : 1 000 FCFA'), findsOneWidget);
    });

    testWidgets('carte affichée : la flèche est là, avec le visuel de la carte', (tester) async {
      app.member = Member('ANIBE ADJA MAURICE AXEL', 'CP-AA-2526', 'Céleste', DateTime(2026, 1, 1));
      app.paidCardMatricules.add('CP-AA-2526');
      await _pomperCarte(tester);
      expect(find.byIcon(Icons.arrow_back), findsOneWidget);
      expect(find.text('CARTE DE MEMBRE'), findsOneWidget);
      expect(find.textContaining('CP-AA-2526'), findsOneWidget);
    });

    testWidgets('la flèche revient à l’écran précédent', (tester) async {
      app.member = Member('ANIBE ADJA MAURICE AXEL', 'CP-AA-2526', 'Céleste', DateTime(2026, 1, 1));
      app.paidCardMatricules.add('CP-AA-2526');
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: Builder(
              builder: (context) => Center(
                child: TextButton(
                  onPressed: () => Navigator.of(context).push(
                    MaterialPageRoute(builder: (_) => const NouvelleCartePage()),
                  ),
                  child: const Text('ouvrir la carte'),
                ),
              ),
            ),
          ),
        ),
      );
      await tester.pump();
      await tester.tap(find.text('ouvrir la carte'));
      await tester.pump();
      await tester.pump();
      expect(find.byIcon(Icons.arrow_back), findsOneWidget);
      await tester.tap(find.byIcon(Icons.arrow_back));
      await tester.pump();
      await tester.pump();
      expect(find.text('ouvrir la carte'), findsOneWidget);
      expect(find.byIcon(Icons.arrow_back), findsNothing);
    });

    testWidgets('aperçu doré : carte affichée avec la flèche', (tester) async {
      app.member = Member('ANIBE ADJA MAURICE AXEL', 'CP-AA-2526', 'Céleste', DateTime(2026, 1, 1));
      app.paidCardMatricules.add('CP-AA-2526');
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      await _pomperCarte(tester);
      await expectLater(
        find.byType(NouvelleCartePage),
        matchesGoldenFile('goldens/carte_retour.png'),
      );
    });
  });
}
