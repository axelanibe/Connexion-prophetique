// Tests de la page « Créer une story », 17 nov. 2026 : modes,
// galerie simulée, texte rendu en image, publication par un
// client simulé, sans serveur ni réseau.
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:image/image.dart' as img;

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/creation_story.dart';
import 'package:connexion_prophetique/galerie_story.dart';
import 'package:connexion_prophetique/magnetophone.dart';
import 'package:connexion_prophetique/stories.dart';

class _ClientPublieFaux extends ApiClient {
  List<int>? derniersOctets;
  String? dernierNom;
  String? dernierType;
  int appels = 0;

  @override
  Future<List<Map<String, dynamic>>> fetchStories() async => [];

  @override
  Future<Map<String, dynamic>> publierStory({
    required List<int> bytes,
    required String filename,
    required String type,
    String? etablissementId,
  }) async {
    appels++;
    derniersOctets = bytes;
    dernierNom = filename;
    dernierType = type;
    return {'ok': true};
  }
}

/// Client qui échoue avec le message du serveur, comme quand les
/// stories sont désactivées faute de clés R2 côté serveur (503).
class _ClientErreurServeur extends ApiClient {
  _ClientErreurServeur(this.message);

  final String message;

  @override
  Future<Map<String, dynamic>> publierStory({
    required List<int> bytes,
    required String filename,
    required String type,
    String? etablissementId,
  }) async {
    throw ApiException(message);
  }
}

class _ChargeurFaux implements ChargeurGalerie {
  _ChargeurFaux(this.elements, {this.autorisee = true});

  final List<ElementGalerie> elements;
  final bool autorisee;

  @override
  Future<GalerieChargee> charger() async => GalerieChargee(elements: elements, autorisee: autorisee);
}

class _EnregistreurFaux implements EnregistreurAudio {
  @override
  Stream<double> get niveaux => const Stream<double>.empty();

  @override
  Future<bool> demarrer() async => true;

  @override
  Future<void> mettreEnPause() async {}

  @override
  Future<void> reprendre() async {}

  @override
  Future<SonEnregistre?> arreter() async => SonEnregistre(
        octets: Uint8List.fromList([0x1A, 0x45, 0xDF, 0xA3]),
        mime: 'audio/webm',
        dureeMs: 5000,
      );

  @override
  Future<void> annuler() async {}

  @override
  Future<void> liberer() async {}
}

Uint8List _vignette() {
  final image = img.Image(width: 4, height: 4);
  img.fill(image, color: img.ColorRgb8(11, 31, 58));
  return Uint8List.fromList(img.encodePng(image));
}

ElementGalerie _element({required bool video, required List<int> octets}) {
  final vignette = _vignette();
  return ElementGalerie(
    estVideo: video,
    vignette: vignette,
    duree: video ? const Duration(seconds: 30) : Duration.zero,
    nom: video ? 'video.mp4' : 'photo.jpg',
    chargerOctets: () async => Uint8List.fromList(octets),
  );
}

void main() {
  group('compresserPhotoStory', () {
    test('réduit une grande photo à 1280 px', () async {
      final grande = img.Image(width: 2000, height: 1500);
      img.fill(grande, color: img.ColorRgb8(11, 31, 58));
      final octets = Uint8List.fromList(img.encodeJpg(grande, quality: 95));
      final compressee = await compresserPhotoStory(octets);
      final decodee = img.decodeImage(compressee)!;
      expect(decodee.width, 1280);
    });

    test('laisse une petite photo telle quelle en largeur', () async {
      final petite = img.Image(width: 800, height: 600);
      img.fill(petite, color: img.ColorRgb8(212, 167, 44));
      final octets = Uint8List.fromList(img.encodeJpg(petite, quality: 95));
      final compressee = await compresserPhotoStory(octets);
      final decodee = img.decodeImage(compressee)!;
      expect(decodee.width, 800);
    });
  });

  group('CreationStoryPage, modes', () {
    testWidgets('affiche les deux cartes de mode', (tester) async {
      final client = _ClientPublieFaux();
      await tester.pumpWidget(
        MaterialApp(
          home: CreationStoryPage(
            client: client,
            chargeur: _ChargeurFaux([]),
            surWeb: false,
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('Créer une story'), findsOneWidget);
      expect(find.text('Photo ou vidéo'), findsOneWidget);
      expect(find.text('Texte'), findsOneWidget);
      expect(find.text('Photo'), findsNothing);
      expect(find.text('Vidéo'), findsNothing);
      expect(find.text('Aucune photo ou vidéo.'), findsOneWidget);
    });

    testWidgets('sur le web, bouton Choisir dans la galerie, sans grille', (tester) async {
      final client = _ClientPublieFaux();
      await tester.pumpWidget(
        MaterialApp(
          home: CreationStoryPage(
            client: client,
            chargeur: _ChargeurFaux([_element(video: false, octets: [1, 2, 3])]),
            surWeb: true,
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('Choisir dans la galerie'), findsOneWidget);
      expect(find.byType(GridView), findsNothing);
    });

    testWidgets('texte : publie une image PNG comme story photo', (tester) async {
      final client = _ClientPublieFaux();
      await tester.pumpWidget(
        MaterialApp(
          home: CreationStoryPage(
            client: client,
            chargeur: _ChargeurFaux([]),
            surWeb: false,
          ),
        ),
      );
      await tester.pumpAndSettle();
      await tester.tap(find.text('Texte'));
      await tester.pumpAndSettle();
      expect(find.text('Écris ta story'), findsWidgets);
      await tester.enterText(find.byType(TextField), 'Shalom à tous');
      await tester.pumpAndSettle();
      // La capture RepaintBoundary (toImage) exige la zone
      // asynchrone réelle dans les tests, sinon pumpAndSettle
      // n'aboutit jamais.
      await tester.runAsync(() async {
        await tester.tap(find.text('Publier la story'));
        await Future<void>.delayed(const Duration(seconds: 2));
      });
      await tester.pumpAndSettle();
      expect(client.appels, 1);
      expect(client.dernierType, 'photo');
      expect(client.dernierNom, 'story-texte.png');
      expect(client.derniersOctets!.sublist(0, 4), [0x89, 0x50, 0x4E, 0x47]);
    });

    testWidgets('texte : Publier désactivé sans texte', (tester) async {
      final client = _ClientPublieFaux();
      await tester.pumpWidget(
        MaterialApp(
          home: CreationStoryPage(
            client: client,
            chargeur: _ChargeurFaux([]),
            surWeb: false,
          ),
        ),
      );
      await tester.pumpAndSettle();
      await tester.tap(find.text('Texte'));
      await tester.pumpAndSettle();
      final bouton = tester.widget<ElevatedButton>(find.widgetWithText(ElevatedButton, 'Publier la story'));
      expect(bouton.onPressed, isNull);
      expect(client.appels, 0);
    });

    testWidgets('photo : toucher une photo puis Publier envoie ses octets', (tester) async {
      final client = _ClientPublieFaux();
      // Octets PNG valides : l'aperçu les décode, puis la
      // compression les ré-encode en JPEG.
      final octetsPhoto = _vignette();
      await tester.pumpWidget(
        MaterialApp(
          home: CreationStoryPage(
            client: client,
            chargeur: _ChargeurFaux([_element(video: false, octets: octetsPhoto)]),
            surWeb: false,
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.byType(GridView), findsOneWidget);
      await tester.tap(find.byType(Image).first);
      await tester.pumpAndSettle();
      await tester.tap(find.text('Publier la story'));
      await tester.pumpAndSettle();
      expect(client.appels, 1);
      expect(client.dernierType, 'photo');
      expect(client.dernierNom, 'photo.jpg');
      expect(client.derniersOctets!.sublist(0, 2), [0xFF, 0xD8]);
    });

    testWidgets('vidéo : aperçu avec durée puis Publier envoie la vidéo', (tester) async {
      final client = _ClientPublieFaux();
      final octetsVideo = [50, 60, 70];
      await tester.pumpWidget(
        MaterialApp(
          home: CreationStoryPage(
            client: client,
            chargeur: _ChargeurFaux([_element(video: true, octets: octetsVideo)]),
            surWeb: false,
          ),
        ),
      );
      await tester.pumpAndSettle();
      await tester.tap(find.byType(Image).first);
      await tester.pumpAndSettle();
      expect(find.text('0:30'), findsOneWidget);
      await tester.tap(find.text('Publier la story'));
      await tester.pumpAndSettle();
      expect(client.appels, 1);
      expect(client.dernierType, 'video');
      expect(client.dernierNom, 'video.mp4');
      expect(client.derniersOctets, octetsVideo);
    });

    testWidgets('audio : enregistrement puis Publier envoie un son', (tester) async {
      final client = _ClientPublieFaux();
      await tester.pumpWidget(
        MaterialApp(
          home: CreationStoryPage(
            client: client,
            chargeur: _ChargeurFaux([]),
            surWeb: false,
            enregistreur: _EnregistreurFaux(),
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('Enregistrer un audio'), findsOneWidget);
      await tester.tap(find.text('Enregistrer un audio'));
      await tester.pumpAndSettle();
      expect(find.textContaining('Arrêter'), findsOneWidget);
      await tester.tap(find.textContaining('Arrêter'));
      await tester.pumpAndSettle();
      expect(find.text('Retirer l’audio'), findsOneWidget);
      await tester.tap(find.text('Publier la story'));
      await tester.pumpAndSettle();
      expect(client.appels, 1);
      expect(client.dernierType, 'audio');
      expect(client.dernierNom, 'story-audio.webm');
      expect(client.derniersOctets, [0x1A, 0x45, 0xDF, 0xA3]);
    });

    testWidgets('galerie refusée : message affiché, sans grille', (tester) async {
      final client = _ClientPublieFaux();
      await tester.pumpWidget(
        MaterialApp(
          home: CreationStoryPage(
            client: client,
            chargeur: _ChargeurFaux([], autorisee: false),
            surWeb: false,
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('Autorise l’accès aux photos pour afficher ta galerie.'), findsOneWidget);
      expect(find.byType(GridView), findsNothing);
    });

    testWidgets('erreur serveur : le vrai message du serveur s’affiche', (tester) async {
      // Étape 2 : quand le serveur répond que les stories sont
      // désactivées, la page montre son message, pas le générique.
      final client = _ClientErreurServeur('Les stories sont désactivées pour le moment.');
      final octetsPhoto = _vignette();
      await tester.pumpWidget(
        MaterialApp(
          home: CreationStoryPage(
            client: client,
            chargeur: _ChargeurFaux([_element(video: false, octets: octetsPhoto)]),
            surWeb: false,
          ),
        ),
      );
      await tester.pumpAndSettle();
      await tester.tap(find.byType(Image).first);
      await tester.pumpAndSettle();
      await tester.tap(find.text('Publier la story'));
      await tester.pumpAndSettle();
      expect(find.text('Les stories sont désactivées pour le moment.'), findsOneWidget);
      expect(find.text('Impossible de publier la story.'), findsNothing);
    });
  });

  group('Menu Publier, 21 nov. 2026', () {
    testWidgets('toucher Publier ouvre Story et Témoignage, Témoignage ouvre le compositeur', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(body: StoriesStrip(client: _ClientPublieFaux(), peutPublier: true)),
        ),
      );
      await tester.pumpAndSettle();
      await tester.tap(find.text('Publier'));
      await tester.pumpAndSettle();
      expect(find.text('Story'), findsOneWidget);
      expect(find.text('Témoignage'), findsOneWidget);
      await tester.tap(find.text('Témoignage'));
      await tester.pumpAndSettle();
      expect(find.text('Publier un témoignage'), findsOneWidget);
    });

    testWidgets('toucher Publier puis Story ouvre la création de story comme avant', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(body: StoriesStrip(client: _ClientPublieFaux(), peutPublier: true)),
        ),
      );
      await tester.pumpAndSettle();
      await tester.tap(find.text('Publier'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Story'));
      // La page de story charge la vraie galerie sur téléphone :
      // pumpAndSettle ne se termine jamais ici, deux pompages
      // suffisent pour voir le titre.
      await tester.pump();
      await tester.pump();
      expect(find.text('Créer une story'), findsOneWidget);
    });
  });
}
