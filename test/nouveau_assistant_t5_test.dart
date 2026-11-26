// Tests de la tranche T5, nouvel Assistant, 26 nov. 2026.
// Les données ci-dessous sont des données de test, jamais
// les vraies données d'Axel. Faux service, comme les tests
// T1 à T4, avec les envois de prière enregistrés.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/nouveau/modeles_assistant.dart';
import 'package:connexion_prophetique/nouveau/page_assistant.dart';
import 'package:connexion_prophetique/nouveau/service_assistant.dart';

class _FauxServiceAssistant implements ServiceAssistant {
  final sujetsEnvoyes = <String>[];

  @override
  Future<void> envoyerSujetPriere(String sujet) async {
    sujetsEnvoyes.add(sujet);
  }
}

/// Le point vert pulsant et l'indicateur de frappe tournent
/// sans fin, pumpAndSettle ne se termine donc jamais : on
/// pompe par pas fixes, assez pour le fondu de 300 ms.
Future<void> _pomper(WidgetTester tester) async {
  for (var i = 0; i < 20; i++) {
    await tester.pump(const Duration(milliseconds: 100));
  }
}

Future<void> _ouvrirAssistant(WidgetTester tester,
    {ServiceAssistant? service}) async {
  await tester.pumpWidget(
    MaterialApp(
      home: Scaffold(
        body: FeuilleAssistant(
          service: service ?? _FauxServiceAssistant(),
          prenomMembre: 'Test',
          delaiReponse: Duration.zero,
        ),
      ),
    ),
  );
  await _pomper(tester);
}

void main() {
  testWidgets('T5 : en-tête, accueil, six sujets, saisie blanche',
      (tester) async {
    await _ouvrirAssistant(tester);
    expect(find.text('Assistant CP'), findsOneWidget);
    expect(find.text('IA'), findsOneWidget);
    expect(find.text('En ligne'), findsOneWidget);
    expect(find.textContaining('Aujourd’hui'), findsOneWidget);
    expect(
      find.text(
        'Shalom Test, je suis l’assistant CP. '
        'Choisis un sujet ou écris ta question.',
      ),
      findsOneWidget,
    );
    expect(find.text('Sujets fréquents'), findsOneWidget);
    for (final titre in [
      'Carte de membre',
      'Camp National Kairos',
      'Cotisations',
      'Demande de prière privée',
      'Programmes et activités',
      'Parler à la structure',
    ]) {
      expect(find.text(titre), findsOneWidget);
    }
    final champ = find.byType(TextField);
    expect(champ, findsOneWidget);
    expect(
      tester.widget<TextField>(champ).decoration?.hintText,
      'Écris ta question…',
    );
    expect(find.byKey(const ValueKey('microAssistant')), findsOneWidget);
    expect(find.byKey(const ValueKey('boutonEnvoyerAssistant')),
        findsOneWidget);
    expect(find.text('Échanges confidentiels'), findsOneWidget);
    expect(find.byKey(const ValueKey('poigneeAssistant')), findsOneWidget);
    expect(find.byKey(const ValueKey('reinitialiserAssistant')),
        findsOneWidget);
    expect(find.byKey(const ValueKey('fermerAssistant')), findsOneWidget);
  });

  testWidgets('T5 : bouton flottant Assistant CP', (tester) async {
    var appuye = false;
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: const SizedBox.shrink(),
          floatingActionButton: BoutonFlottantAssistant(
            onPressed: () => appuye = true,
          ),
        ),
      ),
    );
    await _pomper(tester);
    expect(find.byKey(const ValueKey('fabAssistant')), findsOneWidget);
    expect(find.text('Assistant CP'), findsOneWidget);
    await tester.tap(find.byKey(const ValueKey('fabAssistant')));
    expect(appuye, isTrue);
  });

  testWidgets('T5 : carte choisie, les six cartes disparaissent',
      (tester) async {
    await _ouvrirAssistant(tester);
    await tester.tap(find.byKey(const ValueKey('sujet-carte')));
    await _pomper(tester);
    expect(find.text('Carte de membre'), findsOneWidget);
    expect(find.text('Sujets fréquents'), findsNothing);
    expect(find.byKey(const ValueKey('sujet-camp')), findsNothing);
    expect(find.byKey(const ValueKey('sujet-cotisations')), findsNothing);
    expect(find.textContaining('1 000 FCFA'), findsOneWidget);
    expect(find.textContaining('Wave'), findsOneWidget);
  });

  testWidgets('T5 : camp, badge automatique, dates à confirmer',
      (tester) async {
    await _ouvrirAssistant(tester);
    await tester.tap(find.byKey(const ValueKey('sujet-camp')));
    await _pomper(tester);
    expect(find.textContaining('badge'), findsOneWidget);
    expect(find.textContaining('à confirmer'), findsOneWidget);
    expect(find.textContaining('QR'), findsOneWidget);
  });

  testWidgets('T5 : cotisations par scan QR', (tester) async {
    await _ouvrirAssistant(tester);
    await tester.tap(find.byKey(const ValueKey('sujet-cotisations')));
    await _pomper(tester);
    expect(find.textContaining('1 000 FCFA'), findsOneWidget);
    expect(find.textContaining('scan QR'), findsOneWidget);
  });

  testWidgets('T5 : prière privée, verset, transmission par e-mail',
      (tester) async {
    final service = _FauxServiceAssistant();
    await _ouvrirAssistant(tester, service: service);
    await tester.tap(find.byKey(const ValueKey('sujet-priere')));
    await _pomper(tester);
    expect(find.textContaining('Philippiens 4, 6'), findsOneWidget);
    expect(
      find.textContaining('Ne vous inquiétez de rien'),
      findsOneWidget,
    );
    expect(find.textContaining('sans affichage public'), findsOneWidget);
    final champ = find.byType(TextField);
    await tester.enterText(champ, 'Sujet de test pour ma famille.');
    await tester.tap(find.byKey(const ValueKey('boutonEnvoyerAssistant')));
    await _pomper(tester);
    expect(service.sujetsEnvoyes, ['Sujet de test pour ma famille.']);
    expect(
      find.text('Ton sujet de prière a été transmis à la structure, en privé.'),
      findsOneWidget,
    );
  });

  testWidgets('T5 : réinitialiser ramène les six cartes',
      (tester) async {
    await _ouvrirAssistant(tester);
    await tester.tap(find.byKey(const ValueKey('sujet-carte')));
    await _pomper(tester);
    expect(find.text('Sujets fréquents'), findsNothing);
    await tester.tap(find.byKey(const ValueKey('reinitialiserAssistant')));
    await _pomper(tester);
    expect(find.text('Sujets fréquents'), findsOneWidget);
    expect(find.byKey(const ValueKey('sujet-camp')), findsOneWidget);
    expect(find.byKey(const ValueKey('sujet-priere')), findsOneWidget);
    expect(find.textContaining('1 000 FCFA'), findsNothing);
  });

  testWidgets('T5 : question libre par mot-clé, puis repli honnête',
      (tester) async {
    await _ouvrirAssistant(tester);
    final champ = find.byType(TextField);
    await tester.enterText(champ, 'Comment payer ma cotisation ?');
    await tester.tap(find.byKey(const ValueKey('boutonEnvoyerAssistant')));
    await _pomper(tester);
    expect(find.textContaining('scan QR'), findsOneWidget);
    await tester.enterText(champ, 'Quelle est la météo demain ?');
    await tester.tap(find.byKey(const ValueKey('boutonEnvoyerAssistant')));
    await _pomper(tester);
    expect(
      find.textContaining('Je n’ai pas de réponse écrite'),
      findsOneWidget,
    );
  });

  testWidgets('T5 : fermer appelle le retour fourni', (tester) async {
    var ferme = false;
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: FeuilleAssistant(
            service: _FauxServiceAssistant(),
            delaiReponse: Duration.zero,
            onFermer: () => ferme = true,
          ),
        ),
      ),
    );
    await _pomper(tester);
    await tester.tap(find.byKey(const ValueKey('fermerAssistant')));
    expect(ferme, isTrue);
  });

  test('T5 : six sujets, recherche sans accents', () {
    expect(sujetsFrequentsAssistant.length, 6);
    expect(
      trouverSujetParTexte('Je veux faire une priere pour ma soeur')?.id,
      'priere',
    );
    expect(trouverSujetParTexte('Ou est ma carte ?')?.id, 'carte');
    expect(trouverSujetParTexte('Quel temps fait-il ?'), isNull);
  });
}
