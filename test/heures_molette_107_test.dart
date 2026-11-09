// Carte 107 (ajout heures), 8 nov. 2026 : les heures se choisissent
// à la molette comme sur iPhone, CupertinoDatePicker en mode heure,
// format 24 h, affichage HH:MM, envoi inchangé en HH:MM. Ces tests
// vérifient les formats et le champ partagé ChampHeure, sans
// téléphone, sans molette réelle : la confirmation applique la
// valeur de départ, l'annulation ne change rien.
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/i18n.dart';
import 'package:connexion_prophetique/main.dart';

void main() {
  group('Carte 107, heures à la molette', () {
    test('formatHeure écrit HH:MM à deux chiffres', () {
      expect(formatHeure(const TimeOfDay(hour: 8, minute: 30)), '08:30');
      expect(formatHeure(const TimeOfDay(hour: 0, minute: 5)), '00:05');
      expect(formatHeure(const TimeOfDay(hour: 23, minute: 59)), '23:59');
    });

    test('heureDepuisTexte lit HH:MM et refuse le reste', () {
      expect(heureDepuisTexte('08:30'), const TimeOfDay(hour: 8, minute: 30));
      expect(heureDepuisTexte('9:05'), const TimeOfDay(hour: 9, minute: 5));
      expect(heureDepuisTexte('24:00'), isNull);
      expect(heureDepuisTexte('08:60'), isNull);
      expect(heureDepuisTexte('8h30'), isNull);
      expect(heureDepuisTexte(''), isNull);
    });
  });

  group('Carte 107, ChampHeure', () {
    testWidgets('une valeur HH:MM s’affiche telle quelle', (tester) async {
      final controleur = TextEditingController(text: '08:30');
      addTearDown(controleur.dispose);
      await tester.pumpWidget(MaterialApp(home: Scaffold(body: ChampHeure(label: 'Heure de début, facultative', controleur: controleur))));
      expect(find.text('08:30'), findsOneWidget);
    });

    testWidgets('sans valeur, le champ montre HH:MM en aide', (tester) async {
      final controleur = TextEditingController();
      addTearDown(controleur.dispose);
      await tester.pumpWidget(MaterialApp(home: Scaffold(body: ChampHeure(label: 'Heure de début, facultative', controleur: controleur))));
      expect(find.text('HH:MM'), findsOneWidget);
    });

    testWidgets('la croix efface une heure facultative', (tester) async {
      final controleur = TextEditingController(text: '08:30');
      addTearDown(controleur.dispose);
      await tester.pumpWidget(MaterialApp(home: Scaffold(body: ChampHeure(label: 'Heure de début, facultative', controleur: controleur, effacable: true))));
      await tester.tap(find.byIcon(Icons.clear_outlined));
      await tester.pump();
      expect(controleur.text, isEmpty);
    });

    testWidgets('le toucher ouvre la molette iPhone en mode heure, 24 h', (tester) async {
      final controleur = TextEditingController(text: '08:30');
      addTearDown(controleur.dispose);
      await tester.pumpWidget(MaterialApp(home: Scaffold(body: ChampHeure(label: 'Heure de début, facultative', controleur: controleur))));
      await tester.tap(find.byType(TextFormField));
      await tester.pumpAndSettle();
      final picker = tester.widget<CupertinoDatePicker>(find.byType(CupertinoDatePicker));
      expect(picker.mode, CupertinoDatePickerMode.time);
      expect(picker.use24hFormat, isTrue);
      expect(find.text('Confirmer'), findsOneWidget);
      expect(find.text('Annuler'), findsOneWidget);
    });

    testWidgets('la confirmation écrit HH:MM dans le contrôleur', (tester) async {
      final controleur = TextEditingController();
      addTearDown(controleur.dispose);
      await tester.pumpWidget(MaterialApp(home: Scaffold(body: ChampHeure(label: 'Heure de début, facultative', controleur: controleur, initialSiVide: const TimeOfDay(hour: 9, minute: 5)))));
      await tester.tap(find.byType(TextFormField));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Confirmer'));
      await tester.pumpAndSettle();
      expect(controleur.text, '09:05');
    });

    testWidgets('l’annulation ne change rien', (tester) async {
      final controleur = TextEditingController(text: '08:30');
      addTearDown(controleur.dispose);
      await tester.pumpWidget(MaterialApp(home: Scaffold(body: ChampHeure(label: 'Heure de début, facultative', controleur: controleur))));
      await tester.tap(find.byType(TextFormField));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Annuler'));
      await tester.pumpAndSettle();
      expect(controleur.text, '08:30');
    });
  });
}
