// Carte 115, 9 nov. 2026 : pochette d'un audio, enseignement,
// musique ou podcast. Sans image ajoutée à la soumission, c'est
// le logo de la structure qui s'affiche ; avec une image
// choisie, c'est elle qui s'affiche, le logo ne la remplace
// jamais. Jamais une icône seule, jamais une image inventée.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/main.dart';
import 'package:connexion_prophetique/web_assets.dart';

Teaching _audio(String titre, {String imagePath = '', String imageUrl = ''}) =>
    Teaching(titre, 'Orateur', 'https://exemple.test/$titre.mp3',
        kind: 'enseignement', imagePath: imagePath, imageUrl: imageUrl, duree: '12:00');

void main() {
  group('Carte 115, pochette audio', () {
    testWidgets('sans image, le logo de la structure s\'affiche', (tester) async {
      await tester.pumpWidget(MaterialApp(home: Scaffold(body: audioPochette(_audio('Sans'), 56))));
      await tester.pump();
      final logo = tester.widget<WebAssetImage>(find.byType(WebAssetImage));
      expect(logo.asset, 'assets/logo.png');
      expect(logo.partUrls, kLogoParts);
    });

    testWidgets('avec une image serveur, le logo ne s\'affiche pas', (tester) async {
      await tester.pumpWidget(MaterialApp(
          home: Scaffold(body: audioPochette(_audio('Avec', imageUrl: 'https://exemple.test/pochette.jpg'), 56))));
      await tester.pump();
      expect(find.byType(WebAssetImage), findsNothing);
    });

    testWidgets('avec une image locale, le logo ne s\'affiche pas', (tester) async {
      await tester.pumpWidget(MaterialApp(
          home: Scaffold(body: audioPochette(_audio('Avec', imagePath: '/tmp/pochette.jpg'), 56))));
      await tester.pump();
      expect(find.byType(WebAssetImage), findsNothing);
    });
  });
}
