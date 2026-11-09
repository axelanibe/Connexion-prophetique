// Carte 108, 8 nov. 2026 : corriger le nom d'un membre, côté
// administrateur. Ces tests vérifient le dialogue de correction
// seul, sans serveur ni base : le nom est vérifié avant l'envoi,
// règle des deux mots de la carte 101, la date passe par le champ
// partagé ChampDate, JJ/MM/AAAA, valeur gardée en ISO, et
// l'établissement se choisit dans la liste, avec Aucun pour
// effacer. La route serveur, le périmètre et l'audit sont
// vérifiés côté serveur, dans
// server-production/tests/correction_membre_108.test.js.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/admin_pages.dart';
import 'package:connexion_prophetique/app_models.dart';
import 'package:connexion_prophetique/i18n.dart';
import 'package:connexion_prophetique/main.dart';

Future<void> pomperDialogue(
  WidgetTester tester, {
  String nom = 'Anibe Axel',
  String naissance = '1990-05-12',
  String etablissementId = '',
  String etablissement = '',
  required Future<void> Function(String nom, String? naissance, String? etablissementId) onEnregistrer,
}) async {
  await tester.pumpWidget(
    MaterialApp(
      home: Scaffold(
        body: CorrigerMembreDialog(
          nomInitial: nom,
          naissanceInitiale: naissance,
          etablissementIdInitial: etablissementId,
          etablissementInitial: etablissement,
          onEnregistrer: onEnregistrer,
        ),
      ),
    ),
  );
}

void main() {
  group('Carte 108, dialogue de correction du membre', () {
    testWidgets('les valeurs initiales s’affichent, la date en JJ/MM/AAAA', (tester) async {
      await pomperDialogue(tester, onEnregistrer: (_a, _b, _c) async {});
      expect(find.text('Corriger les informations'), findsOneWidget);
      expect(find.text('Anibe Axel'), findsOneWidget);
      expect(find.text('12/05/1990'), findsOneWidget);
      expect(find.text('1990-05-12'), findsNothing);
      expect(find.text('Aucun établissement'), findsOneWidget);
    });

    testWidgets('un seul mot est refusé, rien n’est envoyé', (tester) async {
      var appels = 0;
      await pomperDialogue(
        tester,
        onEnregistrer: (_a, _b, _c) async {
          appels++;
        },
      );
      await tester.enterText(find.byKey(const ValueKey('corriger-membre-nom')), 'Axel');
      await tester.tap(find.text('Enregistrer'));
      await tester.pump();
      expect(find.text('Écris ton prénom et ton nom.'), findsOneWidget);
      expect(appels, 0);
    });

    testWidgets('un nom en deux mots est envoyé, avec la date ISO et sans établissement', (tester) async {
      String? nomEnvoye;
      String? naissanceEnvoyee;
      String? etablissementEnvoye;
      var appels = 0;
      await pomperDialogue(
        tester,
        onEnregistrer: (nom, naissance, etablissementId) async {
          appels++;
          nomEnvoye = nom;
          naissanceEnvoyee = naissance;
          etablissementEnvoye = etablissementId;
        },
      );
      await tester.enterText(find.byKey(const ValueKey('corriger-membre-nom')), 'Anibe Adja Maurice Axel');
      await tester.tap(find.text('Enregistrer'));
      await tester.pumpAndSettle();
      expect(appels, 1);
      expect(nomEnvoye, 'Anibe Adja Maurice Axel');
      expect(naissanceEnvoyee, '1990-05-12');
      expect(etablissementEnvoye, null);
    });

    testWidgets('la croix efface la date, null est envoyé', (tester) async {
      String? naissanceEnvoyee;
      var appels = 0;
      await pomperDialogue(
        tester,
        onEnregistrer: (_a, naissance, _b) async {
          appels++;
          naissanceEnvoyee = naissance;
        },
      );
      await tester.tap(find.byTooltip('Effacer'));
      await tester.pump();
      expect(find.text('12/05/1990'), findsNothing);
      await tester.tap(find.text('Enregistrer'));
      await tester.pumpAndSettle();
      expect(appels, 1);
      expect(naissanceEnvoyee, null);
    });

    testWidgets('choisir un établissement l’envoie, Aucun l’efface', (tester) async {
      app.etabs.add(Etab('Groupe Scolaire Céleste', id: 'etab-celeste'));
      addTearDown(() => app.etabs.clear());
      String? etablissementEnvoye;
      var appels = 0;
      await pomperDialogue(
        tester,
        onEnregistrer: (_a, _b, etablissementId) async {
          appels++;
          etablissementEnvoye = etablissementId;
        },
      );
      await tester.tap(find.byType(DropdownButtonFormField<String>));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Groupe Scolaire Céleste').last);
      await tester.pumpAndSettle();
      await tester.tap(find.text('Enregistrer'));
      await tester.pumpAndSettle();
      expect(appels, 1);
      expect(etablissementEnvoye, 'etab-celeste');
    });
  });
}
