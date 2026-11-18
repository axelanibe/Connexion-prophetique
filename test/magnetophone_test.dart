// Magnétophone, 18 nov. 2026 : modèle, type audio lu dans les
// octets, dépôt local avec un stockage en mémoire, et la page
// avec un faux enregistreur et un faux Drive, sans micro ni
// serveur.
import 'dart:async';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/magnetophone.dart';
import 'package:connexion_prophetique/magnetophone_drive.dart';
import 'package:connexion_prophetique/magnetophone_stockage_types.dart';

class StockageMemoire implements StockageOctetsEnregistrement {
  final donnees = <String, Uint8List>{};

  @override
  Future<void> ecrire(String id, String extension, Uint8List octets) async {
    donnees['$id.$extension'] = Uint8List.fromList(octets);
  }

  @override
  Future<Uint8List?> lire(String id, String extension) async =>
      donnees['$id.$extension'];

  @override
  Future<void> supprimer(String id, String extension) async {
    donnees.remove('$id.$extension');
  }

  @override
  Future<String?> cheminLocal(String id, String extension) async => null;
}

class FauxEnregistreur implements EnregistreurAudio {
  final _niveauxCtrl = StreamController<double>.broadcast();

  @override
  Stream<double> get niveaux => _niveauxCtrl.stream;

  @override
  Future<bool> demarrer() async => true;

  @override
  Future<void> mettreEnPause() async {}

  @override
  Future<void> reprendre() async {}

  @override
  Future<SonEnregistre?> arreter() async => SonEnregistre(
        octets: Uint8List.fromList([0x1A, 0x45, 0xDF, 0xA3, 1, 2, 3]),
        mime: 'audio/webm',
        dureeMs: 1500,
      );

  @override
  Future<void> annuler() async {}

  @override
  Future<void> liberer() async {
    await _niveauxCtrl.close();
  }
}

class FauxDrive extends SauvegardeDrive {
  @override
  bool get configuree => false;
}

void main() {
  setUp(() {
    SharedPreferences.setMockInitialValues({});
  });

  group('Durée et type audio', () {
    test('formaterDureeMagnetophone : minutes:secondes', () {
      expect(formaterDureeMagnetophone(Duration.zero), '0:00');
      expect(formaterDureeMagnetophone(const Duration(seconds: 8)), '0:08');
      expect(formaterDureeMagnetophone(const Duration(seconds: 65)), '1:05');
      expect(
        formaterDureeMagnetophone(const Duration(minutes: 5)),
        '5:00',
      );
    });

    test('mimeDepuisOctets : webm, mp4, wav, mp3, ogg, défaut', () {
      expect(
        mimeDepuisOctets(Uint8List.fromList([0x1A, 0x45, 0xDF, 0xA3, 0])),
        'audio/webm',
      );
      expect(
        mimeDepuisOctets(
          Uint8List.fromList([0, 0, 0, 0, 102, 116, 121, 112, 0, 0, 0, 0]),
        ),
        'audio/mp4',
      );
      expect(
        mimeDepuisOctets(
          Uint8List.fromList([
            82, 73, 70, 70, 0, 0, 0, 0, 87, 65, 86, 69,
          ]),
        ),
        'audio/wav',
      );
      expect(
        mimeDepuisOctets(Uint8List.fromList([0xFF, 0xFB, 0, 0])),
        'audio/mpeg',
      );
      expect(
        mimeDepuisOctets(Uint8List.fromList([79, 103, 103, 83, 0])),
        'audio/ogg',
      );
      expect(mimeDepuisOctets(Uint8List.fromList([1, 2, 3])), 'audio/mp4');
    });

    test('extensionDepuisMime : m4a, webm, mp3, défaut m4a', () {
      expect(extensionDepuisMime('audio/mp4'), 'm4a');
      expect(extensionDepuisMime('audio/webm'), 'webm');
      expect(extensionDepuisMime('audio/mpeg'), 'mp3');
      expect(extensionDepuisMime('audio/inconnu'), 'm4a');
    });
  });

  group('EnregistrementAudio, modèle', () {
    test('aller-retour JSON, durée et extension', () {
      final meta = EnregistrementAudio(
        id: 'abc',
        nom: 'Prière',
        mime: 'audio/webm',
        dureeMs: 65000,
        creeLe: DateTime.utc(2026, 11, 18, 10, 0),
        tailleOctets: 1234,
        niveaux: [0.1, 0.5, 0.9],
      );
      final relu = EnregistrementAudio.fromJson(meta.toJson());
      expect(relu.id, 'abc');
      expect(relu.nom, 'Prière');
      expect(relu.duree, const Duration(seconds: 65));
      expect(relu.extension, 'webm');
      expect(relu.niveaux, [0.1, 0.5, 0.9]);
    });
  });

  group('DepotEnregistrements, stockage en mémoire', () {
    test('ajouter, lister, renommer, supprimer', () async {
      final depot = DepotEnregistrements(stockage: StockageMemoire());
      final son = SonEnregistre(
        octets: Uint8List.fromList([0x1A, 0x45, 0xDF, 0xA3]),
        mime: 'audio/webm',
        dureeMs: 2000,
      );
      final meta = await depot.ajouter(
        nom: 'Premier',
        son: son,
        niveaux: const [0.2, 0.8],
      );
      var liste = await depot.lister();
      expect(liste.length, 1);
      expect(liste.first.nom, 'Premier');
      expect(liste.first.extension, 'webm');
      expect(await depot.lireOctets(meta), [0x1A, 0x45, 0xDF, 0xA3]);
      await depot.renommer(meta, 'Renommé');
      liste = await depot.lister();
      expect(liste.first.nom, 'Renommé');
      await depot.supprimer(liste.first);
      expect(await depot.lister(), isEmpty);
    });
  });

  group('MagnetophonePage, avec faux enregistreur', () {
    testWidgets('enregistrer, nommer, voir dans la liste', (tester) async {
      final depot = DepotEnregistrements(stockage: StockageMemoire());
      await tester.pumpWidget(
        MaterialApp(
          home: MagnetophonePage(
            enregistreur: FauxEnregistreur(),
            depot: depot,
            drive: FauxDrive(),
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('Magnétophone'), findsOneWidget);
      expect(find.text('Aucun enregistrement pour l’instant.'), findsOneWidget);
      // La sauvegarde Drive non configurée : mention visible.
      expect(find.textContaining('À configurer'), findsOneWidget);

      await tester.tap(find.byTooltip('Enregistrer'));
      await tester.pump();
      await tester.pump(const Duration(seconds: 2));
      expect(find.text('Enregistrement'), findsOneWidget);
      expect(find.text('0:02'), findsOneWidget);

      await tester.tap(find.byTooltip('Arrêter'));
      await tester.pumpAndSettle();
      expect(find.text('Nom de l’enregistrement'), findsOneWidget);
      await tester.enterText(find.byType(TextField), 'Prière du matin');
      await tester.tap(find.text('Enregistrer'));
      await tester.pumpAndSettle();
      expect(find.text('Prière du matin'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  });
}
