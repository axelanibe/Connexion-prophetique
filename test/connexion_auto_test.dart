// Tests de la connexion automatique, 17 nov. 2026 : champ
// unique intelligent (lettre = e-mail, chiffre = numéro) et
// pays de la carte SIM en premier dans la détection d'indicatif.
// La détection de mode et la validation sont pures : aucun
// appareil n'est nécessaire pour les vérifier. La lecture SIM
// passe par le canal natif, simulé ici, jamais par un vrai
// téléphone.
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:connexion_prophetique/identifiant_connexion.dart';
import 'package:connexion_prophetique/indicatif_pays.dart';

const _codes = [
  ('+225', 'Côte d’Ivoire'),
  ('+33', 'France'),
  ('+1', 'Canada'),
];

InputDecoration _dec(String label) => InputDecoration(labelText: label);

/// Harnais minimal : le parent garde l'index d'indicatif choisi,
// comme la page de connexion, et le repasse au champ à chaque
// reconstruction.
class _Harnais extends StatefulWidget {
  const _Harnais({
    required this.controleur,
    this.indexInitial = 0,
    this.surMode,
  });
  final TextEditingController controleur;
  final int indexInitial;
  final ValueChanged<ModeIdentifiant>? surMode;
  @override
  State<_Harnais> createState() => _HarnaisState();
}

class _HarnaisState extends State<_Harnais> {
  late int _index;
  @override
  void initState() {
    super.initState();
    _index = widget.indexInitial;
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: ChampIdentifiantConnexion(
          controller: widget.controleur,
          codes: _codes,
          indicatifIndex: _index,
          onIndicatifChanged: (v) => setState(() => _index = v),
          onModeChanged: widget.surMode ?? (_) {},
          decoration: _dec,
        ),
      ),
    );
  }
}

void main() {
  group('modeIdentifiant', () {
    test('champ vide, neutre', () {
      expect(modeIdentifiant(''), ModeIdentifiant.neutre);
      expect(modeIdentifiant('   '), ModeIdentifiant.neutre);
    });
    test('lettre tapée, mode e-mail', () {
      expect(modeIdentifiant('j'), ModeIdentifiant.email);
      expect(modeIdentifiant('jean@exemple.com'), ModeIdentifiant.email);
      expect(modeIdentifiant('Jean'), ModeIdentifiant.email);
    });
    test('chiffre tapé, mode numéro', () {
      expect(modeIdentifiant('0'), ModeIdentifiant.telephone);
      expect(modeIdentifiant('07'), ModeIdentifiant.telephone);
      expect(modeIdentifiant('0749369433'), ModeIdentifiant.telephone);
    });
    test('plus initial, mode numéro', () {
      expect(modeIdentifiant('+2250749369433'), ModeIdentifiant.telephone);
    });
    test('espaces devant, premier caractère utile tranche', () {
      expect(modeIdentifiant('  jean'), ModeIdentifiant.email);
      expect(modeIdentifiant(' 07'), ModeIdentifiant.telephone);
    });
    test('premier caractère tranche, la suite ne compte pas', () {
      expect(modeIdentifiant('5a'), ModeIdentifiant.telephone);
      expect(modeIdentifiant('a5'), ModeIdentifiant.email);
    });
  });

  group('validation de l’identifiant', () {
    test('e-mail plausible', () {
      expect(identifiantEmailValide('jean@exemple.com'), isTrue);
      expect(identifiantEmailValide('jean'), isFalse);
      expect(identifiantEmailValide('jean@'), isFalse);
      expect(identifiantEmailValide('@exemple.com'), isFalse);
      expect(identifiantEmailValide('jean@exemple'), isTrue);
      expect(identifiantEmailValide(''), isFalse);
    });
    test('numéro plausible', () {
      expect(identifiantTelephoneValide('0749369433'), isTrue);
      expect(identifiantTelephoneValide('+225 07 49 36 94 33'), isTrue);
      expect(identifiantTelephoneValide('0033 6 12 34 56 78'), isTrue);
      expect(identifiantTelephoneValide('07'), isFalse);
      expect(identifiantTelephoneValide(''), isFalse);
      expect(identifiantTelephoneValide('07ab12'), isFalse);
    });
  });

  group('erreurIdentifiantConnexion, le mode alimente l’envoi', () {
    test('champ vide, neutre : renseigner', () {
      expect(
        erreurIdentifiantConnexion('', ModeIdentifiant.neutre),
        'Renseignez votre téléphone ou votre e-mail.',
      );
    });
    test('e-mail complet, rien à signaler', () {
      expect(
        erreurIdentifiantConnexion(
          'jean@exemple.com',
          ModeIdentifiant.email,
        ),
        isNull,
      );
    });
    test('e-mail incomplet, vérifier', () {
      expect(
        erreurIdentifiantConnexion('jean', ModeIdentifiant.email),
        'Vérifiez l’e-mail saisi.',
      );
      expect(
        erreurIdentifiantConnexion('jean@', ModeIdentifiant.email),
        'Vérifiez l’e-mail saisi.',
      );
    });
    test('numéro complet, rien à signaler', () {
      expect(
        erreurIdentifiantConnexion('0749369433', ModeIdentifiant.telephone),
        isNull,
      );
      expect(
        erreurIdentifiantConnexion(
          '+225 07 49 36 94 33',
          ModeIdentifiant.telephone,
        ),
        isNull,
      );
    });
    test('numéro trop court ou mêlé de lettres, vérifier', () {
      expect(
        erreurIdentifiantConnexion('07', ModeIdentifiant.telephone),
        'Vérifiez le numéro saisi.',
      );
      expect(
        erreurIdentifiantConnexion('07ab12', ModeIdentifiant.telephone),
        'Vérifiez le numéro saisi.',
      );
    });
  });

  group('détection avec la SIM en premier', () {
    test('le code SIM tranche avant les langues', () {
      final d = detecterIndicatifDetaille(codesPaysLangues: ['FR', 'CA']);
      expect(d.indicatif, '+33');
      expect(d.codePays, 'FR');
    });
    test('un code SIM inconnu ne tranche rien, la langue suit', () {
      final d = detecterIndicatifDetaille(codesPaysLangues: ['DE', 'CA']);
      expect(d.indicatif, '+1');
      expect(d.codePays, 'CA');
    });
    test('la SIM tranche avant le fuseau IANA', () {
      final d = detecterIndicatifDetaille(
        codesPaysLangues: ['FR'],
        fuseauIana: 'America/Toronto',
      );
      expect(d.indicatif, '+33');
      expect(d.codePays, 'FR');
    });
  });

  group('paysSimAppareil, canal natif simulé', () {
    /// Exécute [corps] avec la plateforme simulée sur Android et
    /// le canal natif simulé, puis remet tout en place AVANT la
    /// fin du test : le cadre de test refuse qu'une variable de
    /// débogage reste changée après le test, un addTearDown
    /// arrive trop tard pour ce contrôle.
    Future<void> surAndroidSimule(
      Future<void> Function() corps, {
      String? reponseSim,
      bool canalPresent = true,
    }) async {
      debugDefaultTargetPlatformOverride = TargetPlatform.android;
      const canal = MethodChannel('connexionprophetique/app');
      final messager =
          TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger;
      if (canalPresent) {
        messager.setMockMethodCallHandler(canal, (appel) async {
          if (appel.method == 'paysSim') return reponseSim;
          return null;
        });
      } else {
        // Canal absent : sur un vrai appareil, l'appel lève
        // MissingPluginException ; sans simulacre, le testeur
        // attend une réponse qui ne vient jamais.
        messager.setMockMethodCallHandler(canal, (appel) async {
          throw MissingPluginException(
              'No implementation found for method ${appel.method}');
        });
      }
      try {
        await corps();
      } finally {
        debugDefaultTargetPlatformOverride = null;
        messager.setMockMethodCallHandler(canal, null);
      }
    }

    testWidgets('SIM française sur Android, renvoie FR', (tester) async {
      await surAndroidSimule(reponseSim: 'fr', () async {
        expect(await paysSimAppareil(), 'FR');
      });
    });

    testWidgets('sans SIM, renvoie null sans erreur', (tester) async {
      await surAndroidSimule(reponseSim: null, () async {
        expect(await paysSimAppareil(), isNull);
      });
    });

    testWidgets('canal absent, renvoie null sans erreur', (tester) async {
      // Sans aucun simulacre, l'appel natif ne répond jamais
      // dans le testeur et l'attente ne finit pas. Le simulacre
      // qui lève MissingPluginException reproduit le vrai
      // comportement d'un appareil sans la méthode.
      await surAndroidSimule(canalPresent: false, () async {
        expect(await paysSimAppareil(), isNull);
      });
    });

    testWidgets('la SIM sénégalaise donne +221 avant les langues',
        (tester) async {
      await surAndroidSimule(reponseSim: 'sn', () async {
        final d = await indicatifDetecteAppareilAvecSim();
        expect(d.indicatif, '+221');
        expect(d.codePays, 'SN');
      });
    });

    testWidgets('SIM d’un pays inconnu, la détection sans SIM fait foi',
        (tester) async {
      await surAndroidSimule(reponseSim: 'de', () async {
        final attendu = indicatifDetecteAppareil();
        final d = await indicatifDetecteAppareilAvecSim();
        expect(d, attendu);
      });
    });
  });

  group('ChampIdentifiantConnexion', () {
    testWidgets('au départ, neutre : indicatif visible, libellé double',
        (tester) async {
      final controleur = TextEditingController();
      addTearDown(controleur.dispose);
      await tester.pumpWidget(_Harnais(controleur: controleur));
      expect(find.text('E-mail ou numéro'), findsOneWidget);
      expect(find.byType(DropdownButtonFormField<int>), findsOneWidget);
      expect(
        tester.widget<TextField>(find.byType(TextField)).keyboardType,
        TextInputType.text,
      );
    });

    testWidgets('lettre tapée : mode e-mail, indicatif masqué',
        (tester) async {
      final controleur = TextEditingController();
      addTearDown(controleur.dispose);
      final modes = <ModeIdentifiant>[];
      await tester.pumpWidget(
        _Harnais(controleur: controleur, surMode: modes.add),
      );
      await tester.enterText(find.byType(TextField), 'j');
      await tester.pump();
      expect(modes, [ModeIdentifiant.email]);
      expect(find.text('E-mail'), findsOneWidget);
      expect(
        tester.widget<TextField>(find.byType(TextField)).keyboardType,
        TextInputType.emailAddress,
      );
      expect(
        tester.widgetList<Visibility>(find.byType(Visibility)).first.visible,
        isFalse,
      );
      expect(controleur.text, 'j');
      expect(FocusManager.instance.primaryFocus, isNotNull);
    });

    testWidgets('chiffre tapé : mode numéro, indicatif affiché',
        (tester) async {
      final controleur = TextEditingController();
      addTearDown(controleur.dispose);
      final modes = <ModeIdentifiant>[];
      await tester.pumpWidget(
        _Harnais(controleur: controleur, surMode: modes.add),
      );
      await tester.enterText(find.byType(TextField), '07');
      await tester.pump();
      expect(modes, [ModeIdentifiant.telephone]);
      expect(find.text('Numéro'), findsOneWidget);
      expect(
        tester.widget<TextField>(find.byType(TextField)).keyboardType,
        TextInputType.phone,
      );
      expect(
        tester.widgetList<Visibility>(find.byType(Visibility)).first.visible,
        isTrue,
      );
      expect(controleur.text, '07');
    });

    testWidgets('champ vidé : retour neutre, indicatif de retour',
        (tester) async {
      final controleur = TextEditingController();
      addTearDown(controleur.dispose);
      await tester.pumpWidget(_Harnais(controleur: controleur));
      await tester.enterText(find.byType(TextField), 'jean@exemple.com');
      await tester.pump();
      expect(find.text('E-mail'), findsOneWidget);
      await tester.enterText(find.byType(TextField), '');
      await tester.pump();
      expect(find.text('E-mail ou numéro'), findsOneWidget);
      expect(
        tester.widgetList<Visibility>(find.byType(Visibility)).first.visible,
        isTrue,
      );
    });

    testWidgets('suppression jusqu’à une lettre : retour en mode e-mail',
        (tester) async {
      final controleur = TextEditingController();
      addTearDown(controleur.dispose);
      await tester.pumpWidget(_Harnais(controleur: controleur));
      await tester.enterText(find.byType(TextField), '5a');
      await tester.pump();
      expect(find.text('Numéro'), findsOneWidget);
      await tester.enterText(find.byType(TextField), 'a');
      await tester.pump();
      expect(find.text('E-mail'), findsOneWidget);
      expect(controleur.text, 'a');
    });

    testWidgets('le texte tapé n’est jamais effacé par un changement de mode',
        (tester) async {
      final controleur = TextEditingController();
      addTearDown(controleur.dispose);
      await tester.pumpWidget(_Harnais(controleur: controleur));
      await tester.enterText(find.byType(TextField), 'jean@exemple.com');
      await tester.pump();
      expect(controleur.text, 'jean@exemple.com');
      await tester.enterText(find.byType(TextField), '');
      await tester.enterText(find.byType(TextField), '0749369433');
      await tester.pump();
      expect(controleur.text, '0749369433');
      expect(find.text('Numéro'), findsOneWidget);
    });

    testWidgets('pays détecté pré-rempli : l’indicatif affiché est le sien',
        (tester) async {
      final controleur = TextEditingController();
      addTearDown(controleur.dispose);
      await tester.pumpWidget(
        _Harnais(controleur: controleur, indexInitial: 1),
      );
      expect(
        tester
            .widget<DropdownButton<int>>(
              find.byType(DropdownButton<int>),
            )
            .value,
        1,
      );
    });

    testWidgets('choix manuel jamais écrasé par la saisie',
        (tester) async {
      final controleur = TextEditingController();
      addTearDown(controleur.dispose);
      await tester.pumpWidget(_Harnais(controleur: controleur));
      await tester.tap(find.byType(DropdownButtonFormField<int>));
      await tester.pumpAndSettle();
      await tester.tap(find.text('+33 France').last);
      await tester.pumpAndSettle();
      int indexAffiche() => tester
          .widget<DropdownButton<int>>(
            find.byType(DropdownButton<int>),
          )
          .value!;
      expect(indexAffiche(), 1);
      await tester.enterText(find.byType(TextField), 'jean@exemple.com');
      await tester.pump();
      await tester.enterText(find.byType(TextField), '0612345678');
      await tester.pump();
      expect(indexAffiche(), 1);
    });

    testWidgets('le mode nourrit l’identifiant envoyé, comme la page',
        (tester) async {
      final controleur = TextEditingController();
      addTearDown(controleur.dispose);
      var mode = ModeIdentifiant.neutre;
      await tester.pumpWidget(
        _Harnais(
          controleur: controleur,
          surMode: (m) => mode = m,
        ),
      );
      // Champ vide : l'envoi est refusé avant tout appel.
      expect(
        erreurIdentifiantConnexion(controleur.text, mode),
        'Renseignez votre téléphone ou votre e-mail.',
      );
      // Une lettre : mode e-mail, l'e-mail complet part.
      await tester.enterText(find.byType(TextField), 'jean@exemple.com');
      await tester.pump();
      expect(mode, ModeIdentifiant.email);
      expect(erreurIdentifiantConnexion(controleur.text, mode), isNull);
      // Un chiffre : mode numéro, le numéro complet part.
      await tester.enterText(find.byType(TextField), '0749369433');
      await tester.pump();
      expect(mode, ModeIdentifiant.telephone);
      expect(erreurIdentifiantConnexion(controleur.text, mode), isNull);
      // Un numéro trop court : l'envoi est refusé.
      await tester.enterText(find.byType(TextField), '07');
      await tester.pump();
      expect(mode, ModeIdentifiant.telephone);
      expect(
        erreurIdentifiantConnexion(controleur.text, mode),
        'Vérifiez le numéro saisi.',
      );
    });
  });
}
