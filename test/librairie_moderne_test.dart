// Librairie moderne, 19 nov. 2026 : recherche en direct, pastilles
// de filtre, panier avec pastille et total, Ajouter et Retirer
// seulement pour la structure, état vide. Les livres de test sont
// des données de test, jamais les exemples du modèle.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/main.dart';

Book _livre(int id, String titre, String auteur, int prix, {DateTime? creeLe}) =>
    Book(id: id, title: titre, author: auteur, price: prix, format: 'PDF', creeLe: creeLe);

void _reinitialiser() {
  app.books.clear();
  app.cart.clear();
  app.requests.clear();
  app.isAdminGeneral = false;
}

Future<void> _pomper(WidgetTester tester) async {
  SharedPreferences.setMockInitialValues({});
  tester.view.physicalSize = const Size(390, 844);
  tester.view.devicePixelRatio = 1.0;
  addTearDown(tester.view.resetPhysicalSize);
  addTearDown(tester.view.resetDevicePixelRatio);
  await tester.pumpWidget(const MaterialApp(home: LibrairiePage()));
  await tester.pump();
}

void main() {
  group('Librairie moderne, nouveautés', () {
    test('récent moins de 90 jours : nouveau', () {
      final b = _livre(1, 'Livre Alpha', 'Auteur Alpha', 500, creeLe: DateTime(2026, 11, 1));
      expect(livreEstNouveau(b, maintenant: DateTime(2026, 11, 19)), isTrue);
    });

    test('ancien plus de 90 jours : pas nouveau', () {
      final b = _livre(1, 'Livre Alpha', 'Auteur Alpha', 500, creeLe: DateTime(2026, 8, 1));
      expect(livreEstNouveau(b, maintenant: DateTime(2026, 11, 19)), isFalse);
    });

    test('sans date : jamais nouveau, date jamais devinée', () {
      expect(livreEstNouveau(_livre(1, 'Livre Alpha', 'Auteur Alpha', 500)), isFalse);
    });

    test('date future : pas nouveau', () {
      final b = _livre(1, 'Livre Alpha', 'Auteur Alpha', 500, creeLe: DateTime(2026, 12, 1));
      expect(livreEstNouveau(b, maintenant: DateTime(2026, 11, 19)), isFalse);
    });
  });

  group('Librairie moderne, page', () {
    setUp(_reinitialiser);

    testWidgets('recherche en direct sur le titre', (tester) async {
      app.books.addAll([
        _livre(1, 'Livre Alpha', 'Auteur Alpha', 500),
        _livre(2, 'Livre Bêta', 'Auteur Bêta', 1000),
      ]);
      await _pomper(tester);
      expect(find.text('2 ouvrages disponibles'), findsOneWidget);
      expect(find.text('Livre Alpha'), findsOneWidget);
      expect(find.text('Livre Bêta'), findsOneWidget);
      await tester.enterText(find.byType(TextField), 'Alpha');
      await tester.pump();
      expect(find.text('Livre Alpha'), findsOneWidget);
      expect(find.text('Livre Bêta'), findsNothing);
      expect(find.text('1 ouvrage disponible'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('recherche en direct sur l’auteur', (tester) async {
      app.books.addAll([
        _livre(1, 'Livre Alpha', 'Auteur Alpha', 500),
        _livre(2, 'Livre Bêta', 'Auteur Bêta', 1000),
      ]);
      await _pomper(tester);
      await tester.enterText(find.byType(TextField), 'Bêta');
      await tester.pump();
      expect(find.text('Livre Alpha'), findsNothing);
      expect(find.text('Livre Bêta'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('pastilles : Nouveautés et Mes achats filtrent', (tester) async {
      final recent = _livre(1, 'Livre Alpha', 'Auteur Alpha', 500, creeLe: DateTime.now().subtract(const Duration(days: 10)));
      final ancien = _livre(2, 'Livre Bêta', 'Auteur Bêta', 1000, creeLe: DateTime.now().subtract(const Duration(days: 200)));
      app.books.addAll([recent, ancien]);
      final demande = PayRequest('REF-TEST', 'achat', 1000, [PurchaseItem(2, 'Livre Bêta', 'Auteur Bêta', 1000)], 'Membre Test', 'CP-XX-0001', DateTime.now());
      demande.confirmed = true;
      app.requests.add(demande);
      await _pomper(tester);
      expect(find.text('Nouveau'), findsOneWidget);
      await tester.tap(find.text('Nouveautés'));
      await tester.pump();
      expect(find.text('Livre Alpha'), findsOneWidget);
      expect(find.text('Livre Bêta'), findsNothing);
      await tester.ensureVisible(find.text('Mes achats'));
      await tester.pump();
      await tester.tap(find.text('Mes achats'));
      await tester.pump();
      expect(find.text('Livre Alpha'), findsNothing);
      expect(find.text('Livre Bêta'), findsOneWidget);
      expect(find.text("Lire l'ouvrage"), findsOneWidget);
      await tester.ensureVisible(find.text('Tous les livres'));
      await tester.pump();
      await tester.tap(find.text('Tous les livres'));
      await tester.pump();
      expect(find.text('Livre Alpha'), findsOneWidget);
      expect(find.text('Livre Bêta'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('ajout au panier : pastille et bouton Déjà dans le panier', (tester) async {
      app.books.addAll([
        _livre(1, 'Livre Alpha', 'Auteur Alpha', 500),
        _livre(2, 'Livre Bêta', 'Auteur Bêta', 1000),
      ]);
      await _pomper(tester);
      // Panier toujours visible comme dans le modèle, pastille
      // cachée quand le panier est vide, affichée après l'ajout.
      expect(find.byTooltip('Panier'), findsOneWidget);
      expect(find.text('1'), findsNothing);
      await tester.tap(find.text('Ajouter au panier').first);
      await tester.pump();
      expect(find.text('Déjà dans le panier'), findsOneWidget);
      expect(find.byTooltip('Panier'), findsOneWidget);
      expect(find.text('1'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('panier : total et bouton Confirmer et débloquer', (tester) async {
      app.books.addAll([_livre(1, 'Livre Alpha', 'Auteur Alpha', 500)]);
      await _pomper(tester);
      await tester.tap(find.text('Ajouter au panier'));
      await tester.pump();
      await tester.tap(find.byTooltip('Panier'));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));
      expect(find.text('Total à régler'), findsOneWidget);
      expect(find.text('Confirmer et débloquer'), findsOneWidget);
      expect(find.text('500 FCFA'), findsWidgets);
      expect(tester.takeException(), isNull);
    });

    testWidgets('membre simple : pas de Ajouter, pas de Retirer', (tester) async {
      app.books.addAll([_livre(1, 'Livre Alpha', 'Auteur Alpha', 500)]);
      await _pomper(tester);
      expect(find.text('Ajouter'), findsNothing);
      await tester.tap(find.byIcon(Icons.more_vert).first);
      await tester.pump();
      expect(find.text('Partager'), findsOneWidget);
      expect(find.text('Modifier sur place'), findsNothing);
      expect(find.text('Retirer'), findsNothing);
      expect(tester.takeException(), isNull);
    });

    testWidgets('structure : Ajouter visible, menu complet', (tester) async {
      app.isAdminGeneral = true;
      app.books.addAll([_livre(1, 'Livre Alpha', 'Auteur Alpha', 500)]);
      await _pomper(tester);
      expect(find.text('Ajouter'), findsOneWidget);
      await tester.tap(find.byIcon(Icons.more_vert).first);
      await tester.pump();
      expect(find.text('Partager'), findsOneWidget);
      expect(find.text('Modifier sur place'), findsOneWidget);
      expect(find.text('Retirer'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('état vide : aucun livre trouvé, retour au catalogue', (tester) async {
      app.books.addAll([
        _livre(1, 'Livre Alpha', 'Auteur Alpha', 500),
        _livre(2, 'Livre Bêta', 'Auteur Bêta', 1000),
      ]);
      await _pomper(tester);
      await tester.enterText(find.byType(TextField), 'zzz');
      await tester.pump();
      expect(find.text('Aucun livre trouvé'), findsOneWidget);
      expect(find.text('Livre Alpha'), findsNothing);
      await tester.tap(find.text('Afficher tout le catalogue'));
      await tester.pump();
      expect(find.text('Aucun livre trouvé'), findsNothing);
      expect(find.text('Livre Alpha'), findsOneWidget);
      expect(find.text('Livre Bêta'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('catalogue vide : message de la structure', (tester) async {
      await _pomper(tester);
      expect(find.text('Le catalogue est vide. La structure ajoute les ouvrages depuis son espace.'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  });
}
