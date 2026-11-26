// Tests de la tranche T13, Parole vivante, 26 nov. 2026.
// Les audios ci-dessous sont des données de test, jamais de
// vrais enseignements : quatre titres d'exemple, deux orateurs,
// une sélection, une playlist.
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/nouveau/modeles_parole.dart';
import 'package:connexion_prophetique/nouveau/page_lecteur_parole.dart';
import 'package:connexion_prophetique/nouveau/page_parole.dart';
import 'package:connexion_prophetique/nouveau/service_parole.dart';

AudioParoleVivante _audioTest(
  String id,
  String titre,
  String orateur,
  String categorie, {
  String duree = '12:34',
  int jours = 0,
}) =>
    AudioParoleVivante(
      id: id,
      titre: titre,
      orateur: orateur,
      categorie: categorie,
      dureeTexte: duree,
      description: 'Description test $titre.',
      audioId: 'fichier-$id',
      publieLe: DateTime.now().subtract(Duration(days: jours)),
    );

class _FauxServiceParole implements ServiceParoleVivante {
  _FauxServiceParole({this.vide = false, this.admin = false});
  final bool vide;
  final bool admin;

  final _pisteControleur = StreamController<AudioParoleVivante?>.broadcast();
  final _lectureControleur = StreamController<bool>.broadcast();

  var _audios = <AudioParoleVivante>[
    _audioTest('a1', 'Audio test un', 'Orateur test A', 'Enseignement',
        jours: 1),
    _audioTest('a2', 'Audio test deux', 'Orateur test A', 'Podcast',
        duree: '45:00', jours: 2),
    _audioTest('a3', 'Audio test trois', 'Orateur test B', 'Musique',
        duree: '03:21', jours: 3),
    _audioTest('a4', 'Audio test quatre', 'Orateur test B', 'Enseignement',
        duree: '1:02:03', jours: 4),
  ];
  final _locaux = <AudioParoleVivante>[];
  final _telecharges = <AudioParoleVivante>[];
  final _favoris = <String>{};
  var _playlists = <PlaylistParole>[
    PlaylistParole(
        id: 'p1', titre: 'Playlist test', audioIds: const ['a1', 'a3']),
  ];
  var _selections = <SelectionAudio>[
    SelectionAudio(
        id: 's1',
        titre: 'Sélection test',
        description: 'Une sélection de test.',
        audioIds: const ['a1', 'a2']),
  ];
  AudioParoleVivante? _piste;
  var _file = <AudioParoleVivante>[];
  var _enLecture = false;

  @override
  Future<void> charger() async {}

  @override
  bool get aEchoue => false;

  @override
  List<AudioParoleVivante> get audios =>
      vide ? const [] : List.unmodifiable(_audios);

  @override
  List<AudioParoleVivante> get locaux => List.unmodifiable(_locaux);

  @override
  List<AudioParoleVivante> get tousLesAudios => [...audios, ..._locaux];

  @override
  List<SelectionAudio> get selections =>
      vide ? const [] : List.unmodifiable(_selections);

  @override
  bool get estAdminGeneral => admin;

  @override
  AudioParoleVivante? get pisteCourante => _piste;

  @override
  Stream<AudioParoleVivante?> get pisteCouranteStream =>
      _pisteControleur.stream;

  @override
  Stream<bool> get enLecture async* {
    yield _enLecture;
    yield* _lectureControleur.stream;
  }

  @override
  Stream<Duration> get position => Stream.value(Duration.zero);

  @override
  Stream<Duration?> get duree => Stream.value(null);

  @override
  List<AudioParoleVivante> get fileAttente => List.unmodifiable(_file);

  @override
  Future<bool> jouer(AudioParoleVivante audio,
      {List<AudioParoleVivante>? file}) async {
    _piste = audio;
    _file = file ?? [audio];
    _enLecture = true;
    _pisteControleur.add(audio);
    _lectureControleur.add(true);
    return true;
  }

  @override
  Future<void> basculerLecture() async {
    _enLecture = false;
    _lectureControleur.add(false);
  }

  @override
  Future<void> chercher(Duration position) async {}

  @override
  Future<void> reculer15() async {}

  @override
  Future<void> avancer15() async {}

  @override
  Future<void> suivant() async {}

  @override
  Future<void> precedent() async {}

  @override
  Future<void> arreter() async {
    _piste = null;
    _pisteControleur.add(null);
  }

  @override
  Duration? get dureeConnue => null;

  @override
  Duration dureeEstimee() {
    final texte = _piste?.dureeTexte;
    if (texte == null) return Duration.zero;
    return Duration(seconds: dureeSecondesDepuisTexte(texte) ?? 0);
  }

  @override
  bool estFavori(AudioParoleVivante audio) => _favoris.contains(audio.id);

  @override
  Future<void> basculerFavori(AudioParoleVivante audio) async {
    if (!_favoris.remove(audio.id)) _favoris.add(audio.id);
  }

  @override
  List<AudioParoleVivante> get favoris =>
      tousLesAudios.where((a) => _favoris.contains(a.id)).toList();

  @override
  List<PlaylistParole> get playlists => List.unmodifiable(_playlists);

  @override
  Future<void> creerPlaylist(String titre,
      {String description = '', String? premierAudioId}) async {
    _playlists = [
      ..._playlists,
      PlaylistParole(
          id: 'p${_playlists.length + 1}',
          titre: titre,
          description: description,
          audioIds: premierAudioId == null ? const [] : [premierAudioId]),
    ];
  }

  @override
  Future<void> supprimerPlaylist(PlaylistParole playlist) async {
    _playlists = _playlists.where((p) => p.id != playlist.id).toList();
  }

  @override
  Future<void> basculerDansPlaylist(
      PlaylistParole playlist, AudioParoleVivante audio) async {
    final ids = [...playlist.audioIds];
    if (!ids.remove(audio.id)) ids.add(audio.id);
    _playlists = _playlists
        .map((p) => p.id == playlist.id ? p.copierAvec(audioIds: ids) : p)
        .toList();
  }

  @override
  Future<void> retirerDePlaylist(
      PlaylistParole playlist, AudioParoleVivante audio) async {
    _playlists = _playlists
        .map((p) => p.id == playlist.id
            ? p.copierAvec(
                audioIds: p.audioIds.where((id) => id != audio.id).toList())
            : p)
        .toList();
  }

  @override
  bool estTelecharge(AudioParoleVivante audio) =>
      _telecharges.any((a) => a.id == audio.id);

  @override
  List<AudioParoleVivante> get telecharges => List.unmodifiable(_telecharges);

  @override
  Future<void> telecharger(AudioParoleVivante audio) async {
    if (!estTelecharge(audio)) _telecharges.add(audio);
  }

  @override
  Future<void> retirerTelechargement(AudioParoleVivante audio) async {
    _telecharges.removeWhere((a) => a.id == audio.id);
  }

  @override
  Future<void> importerFichier(FichierAudioChoisi fichier) async {
    _locaux.add(AudioParoleVivante(
      id: 'local-test',
      titre: titreDepuisNomFichier(fichier.nom),
      orateur: '',
      categorie: 'Enseignement',
      estLocal: true,
      extensionFichier: fichier.extension,
      tailleOctets: fichier.octets.length,
    ));
  }

  @override
  Future<void> retirerLocal(AudioParoleVivante audio) async {
    _locaux.removeWhere((a) => a.id == audio.id);
  }

  @override
  Future<void> publierAudio({
    required String titre,
    String orateur = '',
    String categorie = 'Enseignement',
    String duree = '',
    String description = '',
    List<int>? fichierBytes,
    String? fichierNom,
  }) async {
    _audios = [
      ..._audios,
      AudioParoleVivante(
          id: 'a${_audios.length + 1}',
          titre: titre,
          orateur: orateur,
          categorie: categorie,
          dureeTexte: duree.isEmpty ? null : duree,
          description: description,
          audioId: 'fichier-nouveau',
          publieLe: DateTime.now()),
    ];
  }

  @override
  Future<void> modifierAudio(
    AudioParoleVivante audio, {
    required String titre,
    String orateur = '',
    String categorie = 'Enseignement',
    String duree = '',
    String description = '',
    List<int>? fichierBytes,
    String? fichierNom,
  }) async {
    _audios = _audios
        .map((a) => a.id == audio.id
            ? AudioParoleVivante(
                id: a.id,
                titre: titre,
                orateur: orateur,
                categorie: categorie,
                dureeTexte: duree.isEmpty ? null : duree,
                description: description,
                audioId: a.audioId,
                publieLe: a.publieLe)
            : a)
        .toList();
  }

  @override
  Future<void> retirerAudio(AudioParoleVivante audio) async {
    _audios = _audios.where((a) => a.id != audio.id).toList();
  }

  @override
  Future<void> publierSelection({
    required String titre,
    String description = '',
    List<String> audioIds = const [],
  }) async {
    _selections = [
      ..._selections,
      SelectionAudio(
          id: 's${_selections.length + 1}',
          titre: titre,
          description: description,
          audioIds: audioIds),
    ];
  }

  @override
  Future<void> modifierSelection(
    SelectionAudio selection, {
    required String titre,
    String description = '',
    List<String> audioIds = const [],
  }) async {
    _selections = _selections
        .map((s) => s.id == selection.id
            ? SelectionAudio(
                id: s.id,
                titre: titre,
                description: description,
                audioIds: audioIds)
            : s)
        .toList();
  }

  @override
  Future<void> retirerSelection(SelectionAudio selection) async {
    _selections = _selections.where((s) => s.id != selection.id).toList();
  }
}

Future<void> _pomper(
  WidgetTester tester,
  _FauxServiceParole service, {
  Future<List<FichierAudioChoisi>?> Function()? onChoisirFichiers,
}) async {
  // Fenêtre haute : toute la liste est construite d'un coup,
  // sans défilement, la page a plusieurs listes défilantes.
  tester.view.physicalSize = const Size(800, 2400);
  tester.view.devicePixelRatio = 1.0;
  addTearDown(tester.view.resetPhysicalSize);
  addTearDown(tester.view.resetDevicePixelRatio);
  await tester.pumpWidget(MaterialApp(
    home: PageParoleVivante(
      service: service,
      onRetour: () {},
      onChoisirFichiers: onChoisirFichiers,
    ),
  ));
  await tester.pumpAndSettle();
}

void main() {
  group('Parole vivante, helpers', () {
    test('durées et formats', () {
      expect(dureeSecondesDepuisTexte('12:34'), 754);
      expect(dureeSecondesDepuisTexte('1:02:03'), 3723);
      expect(dureeSecondesDepuisTexte('45'), null);
      expect(dureeSecondesDepuisTexte(''), null);
      expect(formaterDuree(const Duration(seconds: 754)), '12:34');
      expect(formaterDuree(const Duration(seconds: 3723)), '1:02:03');
      expect(formaterTailleMo(1500000), '1.4 Mo');
      expect(titreDepuisNomFichier('mon-enseignement_du-soir.mp3'),
          'mon enseignement du soir');
    });

    test('extension détectée dans les octets', () {
      expect(extensionDepuisOctets([0x49, 0x44, 0x33, 0x04]), 'mp3');
      expect(
          extensionDepuisOctets(
              [0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x41, 0x56, 0x45]),
          'wav');
      expect(extensionDepuisOctets([0x4F, 0x67, 0x67, 0x53]), 'ogg');
    });

    test('filtre par requête et par catégorie', () {
      final audios = [
        _audioTest('a1', 'Audio test un', 'Orateur test A', 'Enseignement',
            jours: 0),
        _audioTest('a2', 'Audio test deux', 'Orateur test A', 'Podcast',
            jours: 1),
        _audioTest('a3', 'Audio test trois', 'Orateur test B', 'Musique',
            jours: 2),
      ];
      expect(
          filtrerAudios(audios, requete: 'deux').map((a) => a.id), ['a2']);
      expect(
          filtrerAudios(audios, requete: 'orateur test a')
              .map((a) => a.id),
          ['a1', 'a2']);
      expect(
          filtrerAudios(audios, filtre: FiltreParole.podcast)
              .map((a) => a.id),
          ['a2']);
      expect(
          filtrerAudios(audios, filtre: FiltreParole.musique)
              .map((a) => a.id),
          ['a3']);
      expect(orateursAudios(audios), {
        'Orateur test A': 2,
        'Orateur test B': 1,
      });
      expect(
          audiosRecents(audios, 2).map((a) => a.id), ['a1', 'a2']);
    });
  });

  group('Parole vivante, page', () {
    testWidgets('Écouter affiche les sections et les titres',
        (tester) async {
      await _pomper(tester, _FauxServiceParole());
      expect(find.text('Parole vivante'), findsOneWidget);
      expect(find.text('À la une'), findsOneWidget);
      expect(find.text('Découvrir'), findsOneWidget);
      expect(find.text('Ajouts récents'), findsOneWidget);
      expect(find.text('Audio test un'), findsWidgets);
      expect(find.text('Enseignements'), findsOneWidget);
      expect(find.text('Podcasts'), findsOneWidget);
      expect(find.text('Musique'), findsOneWidget);
      expect(find.text('Orateurs'), findsOneWidget);
    });

    testWidgets('catalogue vide, état honnête', (tester) async {
      await _pomper(tester, _FauxServiceParole(vide: true));
      expect(find.textContaining('Aucun audio pour l’instant'),
          findsOneWidget);
      expect(find.text('Aucun ajout récent.'), findsOneWidget);
    });

    testWidgets('Explorer, recherche en direct et pilule Podcasts',
        (tester) async {
      final service = _FauxServiceParole();
      await _pomper(tester, service);
      await tester.tap(find.text('Explorer'));
      await tester.pumpAndSettle();
      expect(find.text('Catalogue complet'), findsOneWidget);
      await tester.enterText(
          find.byType(TextField), 'test deux');
      await tester.pumpAndSettle();
      expect(find.text('Audio test deux'), findsOneWidget);
      expect(find.text('Audio test un'), findsNothing);
      await tester.enterText(find.byType(TextField), '');
      await tester.pumpAndSettle();
      await tester.tap(find.text('Podcasts'));
      await tester.pumpAndSettle();
      expect(find.text('Audio test deux'), findsOneWidget);
      expect(find.text('Audio test un'), findsNothing);
    });

    testWidgets('Explorer, fiche orateur avec ses audios',
        (tester) async {
      await _pomper(tester, _FauxServiceParole());
      await tester.tap(find.text('Explorer'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Orateurs'));
      await tester.pumpAndSettle();
      expect(find.text('Orateur test A'), findsOneWidget);
      expect(find.text('Orateur test B'), findsOneWidget);
      await tester.tap(find.text('Orateur test A'));
      await tester.pumpAndSettle();
      expect(find.text('Tout écouter'), findsOneWidget);
      expect(find.text('Audio test un'), findsOneWidget);
      expect(find.text('Audio test deux'), findsOneWidget);
      expect(find.text('Audio test trois'), findsNothing);
    });

    testWidgets('favori puis détail dans Playlists', (tester) async {
      final service = _FauxServiceParole();
      await _pomper(tester, service);
      await tester.tap(find.text('Explorer'));
      await tester.pumpAndSettle();
      await tester.tap(find.byIcon(Icons.favorite).first);
      await tester.pumpAndSettle();
      await tester.tap(find.text('Playlists'));
      await tester.pumpAndSettle();
      expect(find.text('1 titre enregistré'), findsOneWidget);
      await tester.tap(find.text('Favoris & Coups de cœur'));
      await tester.pumpAndSettle();
      expect(find.text('Lire la playlist'), findsOneWidget);
      expect(find.text('Audio test un'), findsOneWidget);
    });

    testWidgets('mini-lecteur puis lecteur plein écran', (tester) async {
      final service = _FauxServiceParole();
      await _pomper(tester, service);
      await tester.tap(find.text('Audio test un').first);
      await tester.pumpAndSettle();
      expect(find.byIcon(Icons.pause), findsOneWidget);
      await tester.tap(find.byKey(const ValueKey('miniLecteurParole')));
      await tester.pumpAndSettle();
      expect(find.text('En lecture'), findsOneWidget);
      expect(find.text('−15 s'), findsOneWidget);
      expect(find.text('+15 s'), findsOneWidget);
      expect(find.text('CP'), findsOneWidget);
      expect(find.text('Audio test un'), findsOneWidget);
      expect(find.text('File d’attente'), findsNothing);
      await tester.tap(find.byIcon(Icons.queue_music));
      await tester.pumpAndSettle();
      expect(find.text('File d’attente'), findsOneWidget);
      expect(find.text('Audio test deux'), findsOneWidget);
    });

    testWidgets('import local dans Sur mon appareil', (tester) async {
      final service = _FauxServiceParole();
      await _pomper(
        tester,
        service,
        onChoisirFichiers: () async => [
          FichierAudioChoisi(
              octets: [0x49, 0x44, 0x33], nom: 'chant-test.mp3', extension: 'mp3'),
        ],
      );
      await tester.tap(find.text('Playlists'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Importer un audio'));
      await tester.pumpAndSettle();
      expect(find.text('chant test'), findsOneWidget);
    });

    testWidgets('création de playlist depuis une carte audio',
        (tester) async {
      final service = _FauxServiceParole();
      await _pomper(tester, service);
      await tester.tap(find.text('Explorer'));
      await tester.pumpAndSettle();
      await tester.tap(find.byIcon(Icons.add_circle_outline).first);
      await tester.pumpAndSettle();
      expect(find.text('Nouvelle playlist'), findsOneWidget);
      await tester.tap(find.text('Nouvelle playlist'));
      await tester.pumpAndSettle();
      await tester.enterText(
          find.widgetWithText(TextFormField, 'Nom'), 'Ma liste test');
      await tester.tap(find.text('Créer'));
      await tester.pumpAndSettle();
      expect(service.playlists.any((p) => p.titre == 'Ma liste test'), true);
    });

    testWidgets('sélection de la structure et son détail',
        (tester) async {
      await _pomper(tester, _FauxServiceParole());
      await tester.tap(find.text('Playlists'));
      await tester.pumpAndSettle();
      expect(find.text('Sélection test'), findsOneWidget);
      await tester.tap(find.text('Sélection test'));
      await tester.pumpAndSettle();
      expect(find.text('Lire la playlist'), findsOneWidget);
      expect(find.text('Audio test un'), findsOneWidget);
      expect(find.text('Audio test deux'), findsOneWidget);
    });
  });
}
