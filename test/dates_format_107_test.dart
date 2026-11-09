// Carte 107, 8 nov. 2026 : toutes les saisies de date prennent le
// format de l'inscription, calendrier et affichage JJ/MM/AAAA
// (birthLabel), envoi au serveur inchangé en ISO AAAA-MM-JJ. Ces
// tests vérifient les formats courts et le champ partagé ChampDate,
// sans téléphone, sans calendrier réel : le sélecteur reste le
// showDatePicker standard déjà utilisé à l'inscription.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/i18n.dart';
import 'package:connexion_prophetique/main.dart';

void main() {
  group('Carte 107, formats courts JJ/MM/AAAA', () {
    test('formatDateCourte affiche jour, mois, année à deux chiffres', () {
      expect(formatDateCourte(DateTime(2026, 11, 8)), '08/11/2026');
      expect(formatDateCourte(DateTime(2027, 8, 22)), '22/08/2027');
      expect(formatDateCourte(DateTime(1990, 1, 5)), '05/01/1990');
    });

    test('formatDateHeureCourte garde la date courte et ajoute l’heure', () {
      expect(formatDateHeureCourte(DateTime(2026, 11, 8, 14, 5)), '08/11/2026 à 14 h 05');
      expect(formatDateHeureCourte(DateTime(2026, 11, 8, 9, 30)), '08/11/2026 à 9 h 30');
    });

    test('formatDateHeureCourte en anglais garde JJ/MM/AAAA', () {
      setCurrentLang('en');
      addTearDown(() => setCurrentLang('fr'));
      expect(formatDateHeureCourte(DateTime(2026, 11, 8, 14, 5)), '08/11/2026 at 14:05');
    });

    test('formatProgrammeCourt reprend le préfixe, date courte', () {
      expect(formatProgrammeCourt(DateTime(2026, 11, 8, 14, 5)), 'Programmé pour le 08/11/2026 à 14 h 05');
    });

    test('formatCampRange écrit la plage en JJ/MM/AAAA', () {
      expect(formatCampRange(DateTime(2026, 11, 8), DateTime(2026, 11, 15)), '08/11/2026 au 15/11/2026');
      expect(formatCampRange(DateTime(2027, 8, 22), DateTime(2027, 8, 28)), '22/08/2027 au 28/08/2027');
      expect(formatCampRange(DateTime(2026, 11, 8), DateTime(2026, 11, 8)), '08/11/2026');
    });
  });

  group('Carte 107, ChampDate', () {
    testWidgets('une valeur ISO s’affiche JJ/MM/AAAA', (tester) async {
      final controleur = TextEditingController(text: '2026-11-08');
      addTearDown(controleur.dispose);
      await tester.pumpWidget(MaterialApp(home: Scaffold(body: ChampDate(label: 'Date', controleur: controleur))));
      expect(find.text('08/11/2026'), findsOneWidget);
      expect(find.text('2026-11-08'), findsNothing);
    });

    testWidgets('sans valeur, le champ montre JJ/MM/AAAA en aide', (tester) async {
      final controleur = TextEditingController();
      addTearDown(controleur.dispose);
      await tester.pumpWidget(MaterialApp(home: Scaffold(body: ChampDate(label: 'Date', controleur: controleur))));
      expect(find.text('JJ/MM/AAAA'), findsOneWidget);
    });

    testWidgets('la croix efface une date facultative', (tester) async {
      final controleur = TextEditingController(text: '2026-11-08');
      addTearDown(controleur.dispose);
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(
          body: StatefulBuilder(
            builder: (context, setState) => ChampDate(label: 'Date', controleur: controleur, effacable: true, onChanged: () => setState(() {})),
          ),
        ),
      ));
      expect(find.text('08/11/2026'), findsOneWidget);
      await tester.tap(find.byIcon(Icons.clear_outlined));
      await tester.pump();
      expect(controleur.text, isEmpty);
      expect(find.text('JJ/MM/AAAA'), findsOneWidget);
    });
  });
}
