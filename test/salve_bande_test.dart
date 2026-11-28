// Tests du point 17 de la salve, 28 nov. 2026, base df930ae :
// la bande opaque au-dessus de la barre du bas. La marge de
// 120 px vit désormais DANS le contenu défilant, via la marge
// MediaQuery du corps de la coquille : le texte reste visible
// pendant tout le défilement et ne disparaît que derrière la
// barre du bas, le bas de chaque liste restant au-dessus du
// bouton flottant Assistant.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/app_models.dart';
import 'package:connexion_prophetique/nouveau/coquille.dart';
import 'package:connexion_prophetique/nouveau/page_journal.dart';

// Données de test seulement.
final _membreTest = Member(
  'Test Membre',
  'CP-TEST-0000',
  'Bureau national',
  DateTime(2025, 1, 1),
);

void main() {
  group('Salve : bande au-dessus de la barre du bas', () {
    testWidgets('la marge de 120 px est dans le défilement, pas hors de lui',
        (tester) async {
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      await tester.pumpWidget(MaterialApp(
        home: NouvelleCoquille(
          membre: _membreTest,
          accueil: ListView(
            children: [
              for (var i = 0; i < 10; i++)
                SizedBox(height: 100, child: Text('Élément $i')),
            ],
          ),
        ),
      ));
      await tester.pumpAndSettle();
      // La liste reprend la marge en bas, dans son défilement :
      // sans elle, le bas serait à 0 et la bande reviendrait.
      final rembourrage =
          tester.widget<SliverPadding>(find.byType(SliverPadding));
      expect(rembourrage.padding.resolve(TextDirection.ltr).bottom, 120);
      // En bas de liste, le dernier élément reste au-dessus de
      // la barre du bas, avec la marge entre les deux.
      await tester.drag(find.byType(ListView), const Offset(0, -2000));
      await tester.pumpAndSettle();
      final hautBarre =
          tester.getTopLeft(find.byType(BottomNavigationBar)).dy;
      final basDernier =
          tester.getBottomLeft(find.text('Élément 9')).dy;
      expect(basDernier, lessThan(hautBarre));
      expect(basDernier, greaterThan(hautBarre - 140));
      expect(tester.takeException(), isNull);
    });

    testWidgets('une page à marge explicite reprend aussi les 120 px',
        (tester) async {
      SharedPreferences.setMockInitialValues({});
      await tester.pumpWidget(
        const MaterialApp(
          home: MediaQuery(
            data: MediaQueryData(
                padding: EdgeInsets.only(bottom: 120)),
            child: Scaffold(body: PageJournal()),
          ),
        ),
      );
      await tester.pumpAndSettle();
      // Marge basse 24 de la page + 120 de la coquille.
      final marges = tester
          .widgetList<ListView>(find.byType(ListView))
          .map((w) => w.padding)
          .whereType<EdgeInsets>()
          .toList();
      expect(
        marges.any((m) => m.top == 12 && m.bottom == 144),
        isTrue,
      );
      expect(tester.takeException(), isNull);
    });
  });
}
