// Tests Flutter de Connexion 2.0 lot 1, salve 28 nov. 2026 :
// découvrir des membres, photos multiples, modifier sa
// publication, bloquer un membre, brouillon local.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/nouveau/carte_publication.dart';
import 'package:connexion_prophetique/nouveau/modeles_connexion.dart';
import 'package:connexion_prophetique/nouveau/page_connexion.dart';
import 'package:connexion_prophetique/nouveau/page_decouvrir.dart';
import 'package:connexion_prophetique/nouveau/page_profil_connexion.dart';

import 'faux_connexion_salve.dart';

// PNG 1x1, comme dans les tests serveur.
const _photo =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

void main() {
  group('Lot 1 : découvrir', () {
    testWidgets('suggestions puis recherche puis suivre', (tester) async {
      final service = FauxConnexionSalve();
      await tester.pumpWidget(
        MaterialApp(home: PageDecouvrir(service: service)),
      );
      await tester.pumpAndSettle();
      expect(find.text('Membres à découvrir'), findsOneWidget);
      expect(find.text('Sarah Kouamé'), findsOneWidget);
      expect(find.textContaining('12 publications'), findsOneWidget);
      expect(find.text('Suivre'), findsNWidgets(2));
      await tester.enterText(find.byType(TextField).first, 'patrick');
      await tester.pump(const Duration(milliseconds: 500));
      await tester.pumpAndSettle();
      expect(find.text('Patrick D.'), findsOneWidget);
      expect(find.text('Sarah Kouamé'), findsNothing);
      await tester.enterText(find.byType(TextField).first, '');
      await tester.pumpAndSettle();
      expect(find.text('Sarah Kouamé'), findsOneWidget);
      await tester.tap(find.text('Suivre').first);
      await tester.pumpAndSettle();
      expect(find.text('Suivi'), findsOneWidget);
    });
  });

  group('Lot 1 : photos multiples', () {
    testWidgets('deux photos : compteur 1 sur 2', (tester) async {
      final publication = PublicationConnexion(
        id: 'p1',
        auteurNom: 'Test Membre',
        texte: 'Deux photos.',
        photos: [_photo, _photo],
      );
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CartePublicationConnexion(publication: publication),
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('1 sur 2'), findsOneWidget);
    });

    testWidgets('une seule photo : pas de compteur', (tester) async {
      final publication = PublicationConnexion(
        id: 'p1',
        auteurNom: 'Test Membre',
        texte: 'Une photo.',
        photos: [_photo],
      );
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CartePublicationConnexion(publication: publication),
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.textContaining('sur 1'), findsNothing);
    });
  });

  group('Lot 1 : modifier sa publication', () {
    testWidgets('menu Modifier puis dialogue puis texte modifié',
        (tester) async {
      SharedPreferences.setMockInitialValues({});
      final service = FauxConnexionSalve();
      final publication = PublicationConnexion(
        id: 'p1',
        auteurId: 'moi',
        auteurNom: 'Test Membre',
        texte: 'Témoignage de test.',
        categorie: 'temoignage',
        estAuteur: true,
        creeLe: null,
      );
      service.fil = [publication];
      service.publicationModifiable = publication;
      await tester.pumpWidget(
        MaterialApp(home: PageConnexion(service: service)),
      );
      await tester.pumpAndSettle();
      expect(find.text('Témoignage de test.'), findsOneWidget);
      await tester.tap(find.byTooltip('Options'));
      await tester.pumpAndSettle();
      expect(find.text('Modifier'), findsOneWidget);
      await tester.tap(find.text('Modifier'));
      await tester.pumpAndSettle();
      expect(find.text('Modifier la publication'), findsOneWidget);
      await tester.enterText(
        find.descendant(
          of: find.byType(AlertDialog),
          matching: find.byType(TextField),
        ),
        'Témoignage modifié.',
      );
      await tester.tap(find.descendant(
        of: find.byType(AlertDialog),
        matching: find.text('Enregistrer'),
      ));
      await tester.pumpAndSettle();
      expect(find.text('Témoignage modifié.'), findsOneWidget);
    });
  });

  group('Lot 1 : bloquer un membre', () {
    testWidgets('Bloquer puis Débloquer, avec confirmation',
        (tester) async {
      final service = FauxConnexionSalve();
      service.profil = ProfilConnexion(
        id: 'm1',
        nomComplet: 'Sarah Kouamé',
        nbPublications: 3,
        nbAbonnes: 5,
        nbAbonnements: 2,
      );
      await tester.pumpWidget(
        MaterialApp(
          home: PageProfilConnexion(service: service, membreId: 'm1'),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('Sarah Kouamé'), findsWidgets);
      expect(find.text('Bloquer'), findsOneWidget);
      await tester.tap(find.text('Bloquer'));
      await tester.pumpAndSettle();
      expect(find.text('Bloquer Sarah Kouamé ?'), findsOneWidget);
      await tester.tap(find.descendant(
        of: find.byType(AlertDialog),
        matching: find.text('Bloquer'),
      ));
      await tester.pumpAndSettle();
      expect(service.bloques.contains('m1'), isTrue);
      expect(find.text('Débloquer'), findsOneWidget);
      await tester.tap(find.text('Débloquer'));
      await tester.pumpAndSettle();
      expect(service.bloques.contains('m1'), isFalse);
      expect(find.text('Bloquer'), findsOneWidget);
    });
  });

  group('Lot 1 : brouillon local', () {
    testWidgets('le texte non publié revient à la réouverture',
        (tester) async {
      SharedPreferences.setMockInitialValues({});
      final service = FauxConnexionSalve();
      Future<void> ouvrir() async {
        await tester.pumpWidget(
          MaterialApp(home: PageConnexion(service: service)),
        );
        await tester.pumpAndSettle();
      }

      await ouvrir();
      final champ = find.byWidgetPredicate((w) =>
          w is TextField &&
          w.decoration?.hintText == 'Qu’avez-vous à partager aujourd’hui ?');
      await tester.enterText(champ, 'Brouillon de test.');
      await tester.pumpAndSettle();
      await ouvrir();
      expect(find.text('Brouillon de test.'), findsOneWidget);
    });
  });
}
