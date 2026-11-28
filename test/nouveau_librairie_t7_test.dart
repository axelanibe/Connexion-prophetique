// Tests de la tranche T7, nouvelle Librairie, 26 nov. 2026.
// Les livres ci-dessous sont des données de test, jamais
// de vrais livres : trois titres d'exemple, deux formats,
// un récent, un acheté.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import 'package:connexion_prophetique/app_models.dart';
import 'package:connexion_prophetique/nouveau/page_librairie.dart';
import 'package:connexion_prophetique/nouveau/service_librairie.dart';

class _FauxServiceLibrairie implements ServiceLibrairie {
  _FauxServiceLibrairie({this.vide = false});
  final bool vide;
  final partages = <String>[];
  final _panier = <Book>[];
  var _livres = <Book>[
    Book(
        id: 1,
        serverId: 'srv-1',
        title: 'Livre test un',
        author: 'Auteur test A',
        price: 1000,
        format: 'PDF',
        categorie: 'Prière',
        creeLe: DateTime.now().subtract(const Duration(days: 10))),
    Book(
        id: 2,
        serverId: 'srv-2',
        title: 'Livre test deux',
        author: 'Auteur test B',
        price: 2000,
        format: 'EPUB',
        categorie: 'Étude biblique',
        creeLe: DateTime.now().subtract(const Duration(days: 200))),
    Book(
        id: 3,
        serverId: 'srv-3',
        title: 'Livre test trois',
        author: 'Auteur test A',
        price: 500,
        format: 'PDF',
        categorie: 'Prière'),
  ];

  @override
  Future<void> charger() async {}

  @override
  bool get aEchoue => false;

  @override
  List<Book> get livres => vide ? const [] : List.unmodifiable(_livres);

  @override
  bool estAchete(Book livre) => livre.serverId == 'srv-1';

  @override
  bool get estAdminGeneral => true;

  @override
  List<Book> get panier => List.unmodifiable(_panier);

  @override
  bool dansPanier(Book livre) => _panier.contains(livre);

  @override
  Future<void> ajouterAuPanier(Book livre) async {
    if (!dansPanier(livre)) _panier.add(livre);
  }

  @override
  Future<void> retirerDuPanier(Book livre) async {
    _panier.remove(livre);
  }

  @override
  Future<ActionAchat> acheter(Book livre) async {
    if (estAchete(livre)) return ActionAchat.lire;
    if (dansPanier(livre)) return ActionAchat.voirPanier;
    await ajouterAuPanier(livre);
    return ActionAchat.ajoute;
  }

  @override
  Future<void> partager(Book livre) async {
    partages.add(livre.title);
  }

  @override
  Future<void> publierLivre({
    required String titre,
    required String auteur,
    required int prixFcfa,
    String description = '',
    String format = '',
    String categorie = 'À classer',
    List<int>? fichierBytes,
    String? fichierNom,
  }) async {
    _livres = [
      ..._livres,
      Book(
          id: 99,
          serverId: 'srv-99',
          title: titre,
          author: auteur,
          price: prixFcfa,
          description: description,
          format: format,
          categorie: categorie),
    ];
  }

  @override
  Future<void> modifierLivre(
    Book livre, {
    required String titre,
    required String auteur,
    required int prixFcfa,
    String description = '',
    String format = '',
    String categorie = 'À classer',
    List<int>? fichierBytes,
    String? fichierNom,
  }) async {
    livre.title = titre;
    livre.author = auteur;
    livre.price = prixFcfa;
    livre.description = description;
    livre.format = format;
    livre.categorie = categorie;
  }

  @override
  Future<void> retirerLivre(Book livre) async {
    _livres = _livres.where((b) => b != livre).toList();
    _panier.remove(livre);
  }
}

Future<void> _pomper(WidgetTester tester, _FauxServiceLibrairie service) async {
  await tester.pumpWidget(MaterialApp(
    home: Scaffold(body: PageLibrairieNouvelle(service: service)),
  ));
  await tester.pump();
  await tester.pump();
}

void main() {
  testWidgets('en-tête, filtres, sections par catégorie', (tester) async {
    final service = _FauxServiceLibrairie();
    await _pomper(tester, service);
    expect(find.text('CONNEXION PROPHÉTIQUE'), findsOneWidget);
    expect(find.text('Tous'), findsOneWidget);
    expect(find.text('Nouveautés'), findsOneWidget);
    expect(find.text('Mes achats'), findsOneWidget);
    expect(find.text('+ Ajouter'), findsOneWidget);
    expect(find.text('3 ouvrages disponibles'), findsOneWidget);
    expect(find.text('Prière (2)'), findsOneWidget);
    expect(find.text('Livre test trois'), findsOneWidget);
    expect(find.text('Livre test un'), findsOneWidget);
    expect(find.text('NOUVEAU'), findsOneWidget);
    // La section Étude biblique est sous le pli, on fait défiler.
    await tester.scrollUntilVisible(find.text('Étude biblique (1)'), 200);
    await tester.pump();
    expect(find.text('Étude biblique (1)'), findsOneWidget);
    expect(find.text('Livre test deux'), findsOneWidget);
  });

  testWidgets('pastilles Nouveautés et Mes achats filtrent', (tester) async {
    final service = _FauxServiceLibrairie();
    await _pomper(tester, service);
    await tester.tap(find.text('Nouveautés'));
    await tester.pump();
    expect(find.text('Livre test un'), findsOneWidget);
    expect(find.text('Livre test deux'), findsNothing);
    expect(find.text('1 ouvrage disponible'), findsOneWidget);
    await tester.tap(find.text('Mes achats'));
    await tester.pump();
    expect(find.text('Livre test un'), findsOneWidget);
    expect(find.text('Livre test trois'), findsNothing);
  });

  testWidgets('recherche en feuille, choix, effacement', (tester) async {
    final service = _FauxServiceLibrairie();
    await _pomper(tester, service);
    await tester.tap(find.byKey(const ValueKey('champRecherche')));
    await tester.pumpAndSettle();
    expect(find.text('Rechercher un livre'), findsOneWidget);
    expect(find.text('Livre test deux'), findsWidgets);
    await tester.enterText(find.byType(TextField), 'deux');
    await tester.pump();
    expect(find.text('Livre test un'), findsNothing);
    expect(find.text('Effacer la recherche'), findsOneWidget);
    expect(find.text('1 ouvrage disponible'), findsOneWidget);
    await tester.tap(find.text('Effacer la recherche'));
    await tester.pump();
    expect(find.text('Livre test un'), findsWidgets);
    expect(find.text('3 ouvrages disponibles'), findsOneWidget);
    await tester.enterText(find.byType(TextField), 'trois');
    await tester.pump();
    await tester.tap(find.widgetWithText(ListTile, 'Livre test trois'));
    await tester.pumpAndSettle();
    expect(find.text('Rechercher un livre'), findsNothing);
    // Deux occurrences : la requête affichée dans le champ
    // de recherche, et le titre de la carte du livre.
    expect(find.text('Livre test trois'), findsNWidgets(2));
    expect(find.text('Livre test un'), findsNothing);
    expect(find.text('1 ouvrage disponible'), findsOneWidget);
  });

  testWidgets('replier une section masque ses livres', (tester) async {
    final service = _FauxServiceLibrairie();
    await _pomper(tester, service);
    await tester.tap(find.byKey(const ValueKey('section-Prière')));
    await tester.pump();
    expect(find.text('Livre test trois'), findsNothing);
    expect(find.text('Livre test un'), findsNothing);
    expect(find.text('Livre test deux'), findsOneWidget);
    await tester.tap(find.byKey(const ValueKey('section-Prière')));
    await tester.pump();
    expect(find.text('Livre test trois'), findsOneWidget);
    expect(find.text('Livre test un'), findsOneWidget);
  });

  testWidgets('Acheter ajoute au panier, puis ouvre le panier', (tester) async {
    final service = _FauxServiceLibrairie();
    await _pomper(tester, service);
    await tester.drag(find.byType(ListView).first, const Offset(0, -300));
    await tester.pump();
    await tester.tap(find.text('Acheter').first);
    await tester.pump();
    expect(find.text('Ajouté au panier.'), findsOneWidget);
    expect(find.text('Dans le panier'), findsOneWidget);
    await tester.tap(find.text('Dans le panier'));
    await tester.pumpAndSettle();
    expect(find.text('Panier'), findsOneWidget);
    expect(find.text('Total à régler'), findsOneWidget);
  });

  testWidgets('menu trois points et partage', (tester) async {
    final service = _FauxServiceLibrairie();
    await _pomper(tester, service);
    await tester.tap(find.byIcon(LucideIcons.ellipsisVertical).first);
    await tester.pumpAndSettle();
    expect(find.text('Partager'), findsOneWidget);
    expect(find.text('Modifier'), findsOneWidget);
    expect(find.text('Retirer'), findsOneWidget);
    await tester.tap(find.text('Partager'));
    await tester.pump();
    expect(service.partages, ['Livre test trois']);
  });

  testWidgets('catalogue vide', (tester) async {
    final service = _FauxServiceLibrairie(vide: true);
    await _pomper(tester, service);
    expect(find.textContaining('Le catalogue est vide'), findsOneWidget);
    expect(find.text('0 ouvrages disponibles'), findsOneWidget);
  });

  testWidgets('ajouter un livre par le formulaire', (tester) async {
    final service = _FauxServiceLibrairie();
    await _pomper(tester, service);
    await tester.tap(find.byKey(const ValueKey('boutonAjouter')));
    await tester.pumpAndSettle();
    expect(find.text('Nouveau livre'), findsOneWidget);
    await tester.enterText(
        find.widgetWithText(TextField, 'Titre'), 'Livre test quatre');
    await tester.enterText(
        find.widgetWithText(TextField, 'Auteur'), 'Auteur test C');
    await tester.enterText(
        find.widgetWithText(TextField, 'Prix (FCFA)'), '3000');
    // La feuille est plus haute que l'écran de test, on fait
    // glisser son contenu avant de toucher le bouton.
    await tester.drag(
        find.byType(SingleChildScrollView).last, const Offset(0, -400));
    await tester.pump();
    await tester.tap(find.text('Publier'));
    await tester.pumpAndSettle();
    expect(find.text('4 ouvrages disponibles'), findsOneWidget);
    // Le nouveau livre est dans la section À classer, sous le pli.
    await tester.drag(find.byType(ListView).first, const Offset(0, -400));
    await tester.pump();
    expect(find.text('Livre test quatre'), findsOneWidget);
  });
}
