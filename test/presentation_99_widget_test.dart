// Vérification widget, carte 99 : les 7 écrans de la présentation
// se construisent, avec leurs miniatures, sans fichier image. Le
// PageView ne construit que la page affichée, on feuillette donc
// écran par écran, comme un premier inscrit.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/main.dart';

void main() {
  testWidgets('présentation 99 : les 7 miniatures se construisent', (tester) async {
    await tester.pumpWidget(const MaterialApp(home: PresentationApresInscriptionPage()));
    await tester.pump();
    expect(find.text('Tout commence ici : ta méditation du jour et tes actualités.'), findsOneWidget);
    expect(find.text('Suivant'), findsOneWidget);

    Future<void> pageSuivante() async {
      await tester.tap(find.text('Suivant'));
      await tester.pumpAndSettle();
    }

    await pageSuivante();
    expect(find.text('La Bible complète, Louis Segond et King James.'), findsOneWidget);
    await pageSuivante();
    expect(find.text('Les enseignements à écouter et les livres.'), findsOneWidget);
    await pageSuivante();
    expect(find.text('KAIROS 2027'), findsOneWidget);
    expect(find.text('Établissements, camps et présences, tout est ici.'), findsOneWidget);
    await pageSuivante();
    expect(find.text('Ta carte, ton matricule et ton QR, rien d’autre.'), findsOneWidget);
    await pageSuivante();
    expect(find.text('Ton profil, ton journal et tes réglages sont ici.'), findsOneWidget);
    await pageSuivante();
    expect(find.text('Donner par Wave'), findsOneWidget);
    expect(find.text('Les dons, dîmes et offrandes.'), findsOneWidget);
    expect(find.text('Commencer'), findsOneWidget);
  });
}
