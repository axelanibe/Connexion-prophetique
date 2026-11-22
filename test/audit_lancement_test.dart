// Audit de lancement en 20 points, 22 nov. 2026 : CGU, sitemap, 404,
// mesure d'audience, contraste, politique de confidentialité, formulaire
// de la vitrine. Tests : routes connues de l'application web et page
// « non trouvée ».
import 'package:connexion_prophetique/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('cheminAppConnu : sections et racine connues', () {
    for (final chemin in ['', '/', '/index.html', '/bible', '/librairie', '/carte', '/bible/', '/librairie/']) {
      expect(cheminAppConnu(chemin), isTrue, reason: chemin);
    }
  });

  test('cheminAppConnu : pages supprimées et adresses inconnues', () {
    for (final chemin in ['/plus', '/communaute', '/nimportequoi', '/cgu.html', '/Bible', '/bible/quiz']) {
      expect(cheminAppConnu(chemin), isFalse, reason: chemin);
    }
  });

  testWidgets('PageNonTrouvee : titre, explication et retour à l’accueil', (tester) async {
    await tester.pumpWidget(const MaterialApp(home: PageNonTrouvee()));
    expect(find.text('Page non trouvée'), findsOneWidget);
    expect(find.text('Cette page n’existe pas ou a été déplacée.'), findsOneWidget);
    expect(find.text('Retour à l’accueil'), findsOneWidget);
  });
}
