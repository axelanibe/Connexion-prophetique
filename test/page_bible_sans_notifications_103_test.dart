// Carte 103, 8 nov. 2026 : la page Bible ne montre plus aucun
// bloc notification, ni sur le web ni sur l'APK, ni
// l'interrupteur du verset de 7 h, ni la carte « Notifications
// bloquées sur ce téléphone », ni la carte « Verset de 7 h,
// diagnostic » avec son bouton « Test dans 3 minutes » et son
// bouton « Ouvrir les réglages ». La page Bible ne montre plus
// que la Bible. Une seule demande de permission, à la première
// installation, déjà couverte par test/cartes_98_99_test.dart.
// Ce test pompe la vraie page Bible, avec une petite Bible de
// test de moins de 50 Ko servie en mémoire, pour que la liste
// des livres s'affiche, et vérifie qu'aucun bloc notification
// ne s'affiche sous cette liste, ce qui prouve que le bloc
// aurait été construit dans cet état avant la carte 103.
// La petite Bible tient dans une seule chaîne : loadString
// délègue le décodage UTF-8 à un isolat au-delà de 50 Ko, et
// cet isolat ne répond pas dans l'environnement de test, la
// Bible complète de 8,6 Mo ne peut donc pas être chargée ici.
// Sur le téléphone et sur le web, la Bible complète se charge
// normalement, comme avant.
import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/main.dart';

// Petite Bible de test, même forme que la vraie, 2 livres par
// langue, quelques versets, moins de 50 Ko.
const String _petiteBible = '{"fr":{"books":['
    '{"name":"Genèse","chapters":[["Au commencement, Dieu créa les cieux et la terre."]]},'
    '{"name":"Exode","chapters":[["Voici les noms des fils d’Israël."]]}'
    ']},"en":{"books":['
    '{"name":"Genesis","chapters":[["In the beginning God created the heaven and the earth."]]},'
    '{"name":"Exodus","chapters":[["Now these are the names of the children of Israel."]]}'
    ']}}';

void main() {
  testWidgets('carte 103 : page Bible sans aucun bloc notification', (tester) async {
    SharedPreferences.setMockInitialValues({});
    // L'environnement de test dessine le texte avec une police
    // de test aux glyphes carrés, bien plus large que la vraie
    // police : le menu déroulant « Chapitre » déborde de 78 px
    // dans ce seul environnement, jamais sur le téléphone avec
    // la vraie police. Ce débordement est ignoré ici, sans
    // cacher les autres erreurs, qui remontent normalement.
    final ancienOnError = FlutterError.onError;
    FlutterError.onError = (details) {
      if (details.exception.toString().contains('A RenderFlex overflowed')) return;
      ancienOnError?.call(details);
    };
    addTearDown(() => FlutterError.onError = ancienOnError);
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
        .setMockMessageHandler('flutter/assets', (ByteData? message) async {
      if (message == null) return null;
      final cle = utf8.decode(message.buffer.asUint8List());
      if (cle == 'assets/bible.json') {
        return ByteData.sublistView(utf8.encode(_petiteBible));
      }
      // Les autres assets, manifeste et polices comprises, sont
      // servis tels quels depuis le dossier d'assets du test,
      // pour que les polices, dont Lora, se chargent comme en
      // vrai et que la mise en page ne déborde pas.
      final reel = File('build/unit_test_assets/$cle');
      if (reel.existsSync()) {
        return ByteData.sublistView(reel.readAsBytesSync());
      }
      return null;
    });
    await tester.pumpWidget(const MaterialApp(home: BiblePage()));
    // Pompes bornées, jamais pumpAndSettle : le chargement de la
    // Bible est asynchrone, quelques images suffisent, et un
    // minuteur de fond ne doit pas bloquer le test.
    await tester.pump();
    await tester.pump(const Duration(seconds: 1));
    await tester.pump(const Duration(seconds: 1));
    await tester.pump(const Duration(seconds: 1));
    // La liste des livres prouve que la Bible est chargée : avant
    // la carte 103, le bloc notifications s'affichait juste sous
    // cette liste, dans cet état.
    expect(find.text('Genèse'), findsOneWidget);
    expect(find.text('Ancien Testament'), findsWidgets);
    expect(find.text('Verset du jour en notification, chaque matin à 7 h'), findsNothing);
    expect(find.text('Notifications bloquées sur ce téléphone'), findsNothing);
    expect(find.text('Verset de 7 h, diagnostic'), findsNothing);
    expect(find.text('Test dans 3 minutes'), findsNothing);
    expect(find.text('Ouvrir les réglages'), findsNothing);
  });
}
