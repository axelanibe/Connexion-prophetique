// Service de Parole vivante, tranche T13, 26 nov. 2026.
// Données par l'API existante, sans rien réinventer : GET
// /enseignements pour le catalogue, GET /selections-audio pour
// les sélections de la structure, POST, PUT et DELETE
// /admin/enseignements et /admin/selections-audio pour la
// structure, réservés au rôle admin_general côté serveur, et
// POST /admin/fichiers?type=audio pour les fichiers.
// Lecture réelle des fichiers audio avec just_audio, déjà
// utilisé pour les enseignements : en continu avec mise en
// cache progressive, depuis un fichier local sur téléphone,
// depuis une adresse blob sur le web. Favoris, playlists
// personnelles, téléchargements et fichiers locaux vivent en
// stockage local seulement, états individuels, jamais en base ;
// le catalogue public n'est jamais dupliqué par utilisateur.
// En cas d'échec réseau, la dernière liste connue est gardée,
// jamais remplacée par du vide. Quitter la page arrête la
// lecture, comme dans la maquette, pour ne jamais laisser un
// audio jouer sans lecteur visible.
import 'dart:async';
import 'dart:convert';
import 'dart:typed_data';

import 'package:shared_preferences/shared_preferences.dart';

import '../api.dart';
import '../audio.dart';
import 'modeles_parole.dart';
import 'stockage_audio.dart';
import 'stockage_audio_types.dart';

/// Contrat du service Parole vivante, pour la page et ses tests.
abstract class ServiceParoleVivante {
  Future<void> charger();
  bool get aEchoue;
  List<AudioParoleVivante> get audios;
  List<AudioParoleVivante> get locaux;
  List<AudioParoleVivante> get tousLesAudios;
  List<SelectionAudio> get selections;
  bool get estAdminGeneral;

  AudioParoleVivante? get pisteCourante;
  Stream<AudioParoleVivante?> get pisteCouranteStream;
  Stream<bool> get enLecture;
  Stream<Duration> get position;
  Stream<Duration?> get duree;
  List<AudioParoleVivante> get fileAttente;
  Future<bool> jouer(AudioParoleVivante audio,
      {List<AudioParoleVivante>? file});
  Future<void> basculerLecture();
  Future<void> chercher(Duration position);
  Future<void> reculer15();
  Future<void> avancer15();
  Future<void> suivant();
  Future<void> precedent();
  Future<void> arreter();

  /// Durée réelle connue par le lecteur, nulle tant qu'elle
  /// n'est pas lue dans le fichier. Estimation depuis le texte
  /// de durée du catalogue quand elle manque.
  Duration? get dureeConnue;
  Duration dureeEstimee();

  bool estFavori(AudioParoleVivante audio);
  Future<void> basculerFavori(AudioParoleVivante audio);
  List<AudioParoleVivante> get favoris;
  List<PlaylistParole> get playlists;
  Future<void> creerPlaylist(String titre,
      {String description = '', String? premierAudioId});
  Future<void> supprimerPlaylist(PlaylistParole playlist);
  Future<void> basculerDansPlaylist(
      PlaylistParole playlist, AudioParoleVivante audio);
  Future<void> retirerDePlaylist(
      PlaylistParole playlist, AudioParoleVivante audio);

  bool estTelecharge(AudioParoleVivante audio);
  List<AudioParoleVivante> get telecharges;
  Future<void> telecharger(AudioParoleVivante audio);
  Future<void> retirerTelechargement(AudioParoleVivante audio);

  Future<void> importerFichier(FichierAudioChoisi fichier);
  Future<void> retirerLocal(AudioParoleVivante audio);

  Future<void> publierAudio({
    required String titre,
    String orateur = '',
    String categorie = 'Enseignement',
    String duree = '',
    String description = '',
    List<int>? fichierBytes,
    String? fichierNom,
  });
  Future<void> modifierAudio(
    AudioParoleVivante audio, {
    required String titre,
    String orateur = '',
    String categorie = 'Enseignement',
    String duree = '',
    String description = '',
    List<int>? fichierBytes,
    String? fichierNom,
  });
  Future<void> retirerAudio(AudioParoleVivante audio);
  Future<void> publierSelection({
    required String titre,
    String description = '',
    List<String> audioIds = const [],
  });
  Future<void> modifierSelection(
    SelectionAudio selection, {
    required String titre,
    String description = '',
    List<String> audioIds = const [],
  });
  Future<void> retirerSelection(SelectionAudio selection);
}

/// Extension d'un fichier audio, lue dans les octets, pour le
/// téléchargement hors ligne : le serveur ne renvoie pas
/// l'extension du fichier téléversé, il faut la retrouver pour
/// ranger les octets sous le bon nom.
String extensionDepuisOctets(List<int> octets) {
  if (octets.length >= 12 &&
      octets[4] == 0x66 &&
      octets[5] == 0x74 &&
      octets[6] == 0x79 &&
      octets[7] == 0x70) {
    return 'm4a';
  }
  if (octets.length >= 12 &&
      octets[0] == 0x52 &&
      octets[1] == 0x49 &&
      octets[2] == 0x46 &&
      octets[3] == 0x46 &&
      octets[8] == 0x57 &&
      octets[9] == 0x41 &&
      octets[10] == 0x56 &&
      octets[11] == 0x45) {
    return 'wav';
  }
  if (octets.length >= 4 &&
      octets[0] == 0x4F &&
      octets[1] == 0x67 &&
      octets[2] == 0x67 &&
      octets[3] == 0x53) {
    return 'ogg';
  }
  if (octets.length >= 4 &&
      octets[0] == 0x1A &&
      octets[1] == 0x45 &&
      octets[2] == 0xDF &&
      octets[3] == 0xA3) {
    return 'webm';
  }
  if (octets.length >= 3 &&
      octets[0] == 0x49 &&
      octets[1] == 0x44 &&
      octets[2] == 0x33) {
    return 'mp3';
  }
  if (octets.length >= 2 &&
      octets[0] == 0xFF &&
      (octets[1] & 0xE0) == 0xE0) {
    return 'mp3';
  }
  return 'mp3';
}

/// Implémentation réelle, sur l'API existante et just_audio.
class ServiceParoleVivanteReel implements ServiceParoleVivante {
  ServiceParoleVivanteReel({ApiClient? client, StockageAudioLocal? stockage})
      : _api = client ?? api,
        _stockage = stockage ?? creerStockageAudio();
  final ApiClient _api;
  final StockageAudioLocal _stockage;
  final AudioPlayer _lecteur = AudioPlayer();

  var _audios = <AudioParoleVivante>[];
  var _locaux = <AudioParoleVivante>[];
  var _selections = <SelectionAudio>[];
  var _aEchoue = false;

  var _favoris = <String>{};
  var _playlists = <PlaylistParole>[];
  var _telechargements = <Map<String, dynamic>>[];

  AudioParoleVivante? _pisteCourante;
  var _file = <AudioParoleVivante>[];
  StreamSubscription<PlayerState>? _finEcoute;
  var _compteurId = 0;

  final _pisteController = StreamController<AudioParoleVivante?>.broadcast();

  static const _cleFavoris = 'parole_favoris';
  static const _clePlaylists = 'parole_playlists';
  static const _cleTelechargements = 'parole_telechargements';
  static const _cleLocaux = 'parole_locaux';

  @override
  bool get aEchoue => _aEchoue;

  @override
  List<AudioParoleVivante> get audios => List.unmodifiable(_audios);

  @override
  List<AudioParoleVivante> get locaux => List.unmodifiable(_locaux);

  @override
  List<AudioParoleVivante> get tousLesAudios => [..._audios, ..._locaux];

  @override
  List<SelectionAudio> get selections => List.unmodifiable(_selections);

  @override
  bool get estAdminGeneral => _api.role == 'admin_general';

  @override
  AudioParoleVivante? get pisteCourante => _pisteCourante;

  @override
  Stream<AudioParoleVivante?> get pisteCouranteStream =>
      _pisteController.stream;

  @override
  Stream<bool> get enLecture => _lecteur.playingStream;

  @override
  Stream<Duration> get position => _lecteur.positionStream;

  @override
  Stream<Duration?> get duree => _lecteur.durationStream;

  @override
  Duration? get dureeConnue => _lecteur.duration;

  @override
  Duration dureeEstimee() {
    final texte = _pisteCourante?.dureeTexte;
    if (texte == null) return Duration.zero;
    return Duration(seconds: dureeSecondesDepuisTexte(texte) ?? 0);
  }

  @override
  List<AudioParoleVivante> get fileAttente => List.unmodifiable(_file);

  String _nouvelId(String prefixe) {
    _compteurId++;
    return '$prefixe-${DateTime.now().millisecondsSinceEpoch}-$_compteurId';
  }

  List<Map<String, dynamic>> _lireJsonListe(String texte) {
    try {
      final decode = jsonDecode(texte);
      if (decode is List) {
        return [
          for (final e in decode)
            if (e is Map<String, dynamic>) e,
        ];
      }
    } catch (_) {}
    return const [];
  }

  @override
  Future<void> charger() async {
    final prefs = await SharedPreferences.getInstance();
    _favoris = (prefs.getStringList(_cleFavoris) ?? const <String>[]).toSet();
    _playlists = [
      for (final e
          in _lireJsonListe(prefs.getString(_clePlaylists) ?? '[]'))
        PlaylistParole.fromJson(e),
    ];
    _telechargements =
        _lireJsonListe(prefs.getString(_cleTelechargements) ?? '[]');
    _locaux = [
      for (final e in _lireJsonListe(prefs.getString(_cleLocaux) ?? '[]'))
        AudioParoleVivante(
          id: (e['id'] ?? '').toString(),
          titre: (e['titre'] ?? '').toString(),
          orateur: 'Sur mon appareil',
          categorie: 'Fichier local',
          dureeTexte: (e['duree'] ?? '').toString().isEmpty
              ? null
              : (e['duree'] ?? '').toString(),
          estLocal: true,
          extensionFichier: (e['extension'] ?? '').toString(),
          tailleOctets: (e['taille'] as num?)?.toInt(),
        ),
    ];
    try {
      final lignes = await _api.fetchEnseignements();
      _audios = [for (final ligne in lignes) audioDepuisServeur(ligne)];
      _aEchoue = false;
    } catch (_) {
      _aEchoue = _audios.isEmpty;
    }
    try {
      final lignes = await _api.fetchSelectionsAudio();
      _selections = [
        for (final ligne in lignes) selectionDepuisServeur(ligne),
      ];
    } catch (_) {
      // Hors ligne : les dernières sélections connues sont gardées.
    }
  }

  Future<void> _sauverFavoris() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList(_cleFavoris, _favoris.toList());
  }

  Future<void> _sauverPlaylists() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
        _clePlaylists, jsonEncode([for (final p in _playlists) p.toJson()]));
  }

  Future<void> _sauverTelechargements() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
        _cleTelechargements, jsonEncode(_telechargements));
  }

  Future<void> _sauverLocaux() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
        _cleLocaux,
        jsonEncode([
          for (final a in _locaux)
            {
              'id': a.id,
              'titre': a.titre,
              'extension': a.extensionFichier ?? 'mp3',
              'duree': a.dureeTexte ?? '',
              'taille': a.tailleOctets ?? 0,
            },
        ]));
  }

  void _retirerDesListesLocales(String id) {
    _favoris.remove(id);
    _playlists = [
      for (final p in _playlists)
        p.copierAvec(
            audioIds: p.audioIds.where((a) => a != id).toList()),
    ];
    _telechargements =
        _telechargements.where((t) => t['id'] != id).toList();
  }

  Future<void> _sauvegarderListesLocales() async {
    await _sauverFavoris();
    await _sauverPlaylists();
    await _sauverTelechargements();
  }

  /// Source de lecture d'un audio : fichier local sur téléphone,
  /// adresse blob sur le web, sinon lecture en continu.
  Future<void> _chargerSource(AudioParoleVivante audio) async {
    if (audio.estLocal || estTelecharge(audio)) {
      final extension = audio.extensionFichier ??
          _extensionTelechargement(audio.id) ??
          'mp3';
      final chemin = await _stockage.cheminLocal(audio.id, extension);
      if (chemin != null) {
        await _lecteur.setFilePath(chemin);
        return;
      }
      final url = await _stockage.urlBlob(
          audio.id, extension, mimeAudio(extension));
      if (url != null) {
        await _lecteur.setUrl(url);
        return;
      }
      if (audio.estLocal) throw StateError('Fichier local introuvable.');
    }
    final url = audio.urlLecture;
    if (url == null) throw StateError('Aucun fichier audio.');
    await playStreamingUrl(_lecteur, url);
  }

  String? _extensionTelechargement(String id) {
    for (final t in _telechargements) {
      if (t['id'] == id) return (t['extension'] ?? '').toString();
    }
    return null;
  }

  void _poserPiste(AudioParoleVivante? piste) {
    _pisteCourante = piste;
    _pisteController.add(piste);
  }

  Future<void> _ecouterFin() async {
    await _finEcoute?.cancel();
    _finEcoute = _lecteur.playerStateStream.listen((etat) {
      if (etat.processingState == ProcessingState.completed) {
        unawaited(suivant());
      }
    });
  }

  @override
  Future<bool> jouer(AudioParoleVivante audio,
      {List<AudioParoleVivante>? file}) async {
    _file = file ?? [audio];
    if (!_file.any((a) => a.id == audio.id)) _file = [audio, ..._file];
    try {
      // Un seul audio à la fois : la Bible audio et la synthèse
      // vocale s'arrêtent quand Parole vivante démarre.
      await bibleHqAudio.stop();
      await verseTts.stop();
      await _lecteur.stop();
      await _chargerSource(audio);
      await _ecouterFin();
      await _lecteur.play();
      _poserPiste(audio);
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<void> basculerLecture() async {
    if (_pisteCourante == null) return;
    if (_lecteur.playing) {
      await _lecteur.pause();
    } else {
      await _lecteur.play();
    }
  }

  @override
  Future<void> chercher(Duration position) async {
    final duree = _lecteur.duration;
    final cible = duree == null
        ? position
        : (position < Duration.zero
            ? Duration.zero
            : (position > duree ? duree : position));
    await _lecteur.seek(cible);
  }

  @override
  Future<void> reculer15() async {
    final position = _lecteur.position - const Duration(seconds: 15);
    await chercher(position.isNegative ? Duration.zero : position);
  }

  @override
  Future<void> avancer15() async {
    await chercher(_lecteur.position + const Duration(seconds: 15));
  }

  @override
  Future<void> suivant() async {
    if (_file.isEmpty || _pisteCourante == null) return;
    final index = _file.indexWhere((a) => a.id == _pisteCourante!.id);
    if (index < 0) return;
    final prochain = _file[(index + 1) % _file.length];
    await jouer(prochain, file: _file);
  }

  @override
  Future<void> precedent() async {
    if (_file.isEmpty || _pisteCourante == null) return;
    if (_lecteur.position > const Duration(seconds: 3)) {
      await chercher(Duration.zero);
      return;
    }
    final index = _file.indexWhere((a) => a.id == _pisteCourante!.id);
    if (index < 0) return;
    final precedent = _file[(index - 1 + _file.length) % _file.length];
    await jouer(precedent, file: _file);
  }

  @override
  Future<void> arreter() async {
    _file = [];
    _poserPiste(null);
    await _finEcoute?.cancel();
    _finEcoute = null;
    try {
      await _lecteur.stop();
    } catch (_) {}
  }

  @override
  bool estFavori(AudioParoleVivante audio) => _favoris.contains(audio.id);

  @override
  Future<void> basculerFavori(AudioParoleVivante audio) async {
    if (_favoris.contains(audio.id)) {
      _favoris.remove(audio.id);
    } else {
      _favoris.add(audio.id);
    }
    await _sauverFavoris();
  }

  @override
  List<AudioParoleVivante> get favoris {
    final tous = {for (final a in tousLesAudios) a.id: a};
    return [
      for (final id in _favoris)
        if (tous.containsKey(id)) tous[id]!,
    ];
  }

  @override
  List<PlaylistParole> get playlists => List.unmodifiable(_playlists);

  @override
  Future<void> creerPlaylist(String titre,
      {String description = '', String? premierAudioId}) async {
    final playlist = PlaylistParole(
      id: _nouvelId('pl'),
      titre: titre,
      description: description,
      audioIds: premierAudioId == null ? const [] : [premierAudioId],
    );
    _playlists = [playlist, ..._playlists];
    await _sauverPlaylists();
  }

  @override
  Future<void> supprimerPlaylist(PlaylistParole playlist) async {
    _playlists = _playlists.where((p) => p.id != playlist.id).toList();
    await _sauverPlaylists();
  }

  @override
  Future<void> basculerDansPlaylist(
      PlaylistParole playlist, AudioParoleVivante audio) async {
    final ids = [...playlist.audioIds];
    if (ids.contains(audio.id)) {
      ids.remove(audio.id);
    } else {
      ids.add(audio.id);
    }
    _playlists = [
      for (final p in _playlists)
        if (p.id == playlist.id) p.copierAvec(audioIds: ids) else p,
    ];
    await _sauverPlaylists();
  }

  @override
  Future<void> retirerDePlaylist(
      PlaylistParole playlist, AudioParoleVivante audio) async {
    _playlists = [
      for (final p in _playlists)
        if (p.id == playlist.id)
          p.copierAvec(
              audioIds: p.audioIds.where((a) => a != audio.id).toList())
        else
          p,
    ];
    await _sauverPlaylists();
  }

  @override
  bool estTelecharge(AudioParoleVivante audio) =>
      _telechargements.any((t) => t['id'] == audio.id);

  @override
  List<AudioParoleVivante> get telecharges {
    final parId = {for (final a in _audios) a.id: a};
    return [
      for (final t in _telechargements)
        if (parId.containsKey(t['id'])) parId[t['id']]!,
    ];
  }

  @override
  Future<void> telecharger(AudioParoleVivante audio) async {
    if (audio.audioId == null || audio.audioId!.isEmpty) {
      throw StateError('Aucun fichier à télécharger.');
    }
    if (estTelecharge(audio)) return;
    final octets = await _api.fetchFichierOctets(audio.audioId!);
    final extension = extensionDepuisOctets(octets);
    await _stockage.ecrire(audio.id, extension, Uint8List.fromList(octets));
    _telechargements = [
      ..._telechargements,
      {'id': audio.id, 'extension': extension, 'taille': octets.length},
    ];
    await _sauverTelechargements();
  }

  @override
  Future<void> retirerTelechargement(AudioParoleVivante audio) async {
    final extension = _extensionTelechargement(audio.id) ?? 'mp3';
    await _stockage.supprimer(audio.id, extension);
    _telechargements =
        _telechargements.where((t) => t['id'] != audio.id).toList();
    await _sauverTelechargements();
  }

  @override
  Future<void> importerFichier(FichierAudioChoisi fichier) async {
    final id = _nouvelId('local');
    await _stockage.ecrire(
        id, fichier.extension, Uint8List.fromList(fichier.octets));
    _locaux = [
      AudioParoleVivante(
        id: id,
        titre: titreDepuisNomFichier(fichier.nom),
        orateur: 'Sur mon appareil',
        categorie: 'Fichier local',
        estLocal: true,
        extensionFichier: fichier.extension,
        tailleOctets: fichier.octets.length,
      ),
      ..._locaux,
    ];
    await _sauverLocaux();
  }

  @override
  Future<void> retirerLocal(AudioParoleVivante audio) async {
    if (!audio.estLocal) return;
    await _stockage.supprimer(audio.id, audio.extensionFichier ?? 'mp3');
    if (_pisteCourante?.id == audio.id) await arreter();
    _locaux = _locaux.where((a) => a.id != audio.id).toList();
    _retirerDesListesLocales(audio.id);
    await _sauverLocaux();
    await _sauvegarderListesLocales();
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
    String? audioId;
    if (fichierBytes != null && fichierNom != null) {
      audioId =
          await _api.uploadAudio(bytes: fichierBytes, filename: fichierNom);
    }
    final cree = await _api.createEnseignement(
      titre: titre,
      orateur: orateur,
      audioId: audioId,
      categorie: categorie,
      duree: duree,
      description: description,
    );
    _audios = [..._audios, audioDepuisServeur(cree)];
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
    String? audioId;
    if (fichierBytes != null && fichierNom != null) {
      audioId =
          await _api.uploadAudio(bytes: fichierBytes, filename: fichierNom);
    }
    if (audio.id.isNotEmpty && !audio.estLocal) {
      await _api.updateEnseignement(
        audio.id,
        titre: titre,
        orateur: orateur,
        audioId: audioId,
        categorie: categorie,
        duree: duree,
        description: description,
      );
    }
    _audios = [
      for (final a in _audios)
        if (a.id == audio.id)
          AudioParoleVivante(
            id: a.id,
            titre: titre,
            orateur: orateur,
            categorie: categorieAudio(categorie),
            dureeTexte: duree.isEmpty ? null : duree,
            description: description,
            audioId: audioId ?? a.audioId,
            lienAudio: a.lienAudio,
            publieLe: a.publieLe,
          )
        else
          a,
    ];
  }

  @override
  Future<void> retirerAudio(AudioParoleVivante audio) async {
    if (audio.estLocal) {
      await retirerLocal(audio);
      return;
    }
    if (_pisteCourante?.id == audio.id) await arreter();
    if (audio.id.isNotEmpty) await _api.deleteEnseignement(audio.id);
    _audios = _audios.where((a) => a.id != audio.id).toList();
    if (estTelecharge(audio)) await retirerTelechargement(audio);
    _retirerDesListesLocales(audio.id);
    await _sauvegarderListesLocales();
  }

  @override
  Future<void> publierSelection({
    required String titre,
    String description = '',
    List<String> audioIds = const [],
  }) async {
    final cree = await _api.createSelectionAudio(
      titre: titre,
      description: description,
      audioIds: audioIds,
    );
    _selections = [..._selections, selectionDepuisServeur(cree)];
  }

  @override
  Future<void> modifierSelection(
    SelectionAudio selection, {
    required String titre,
    String description = '',
    List<String> audioIds = const [],
  }) async {
    await _api.updateSelectionAudio(
      selection.id,
      titre: titre,
      description: description,
      audioIds: audioIds,
    );
    _selections = [
      for (final s in _selections)
        if (s.id == selection.id)
          SelectionAudio(
            id: s.id,
            titre: titre,
            description: description,
            audioIds: audioIds,
            ordre: s.ordre,
          )
        else
          s,
    ];
  }

  @override
  Future<void> retirerSelection(SelectionAudio selection) async {
    await _api.deleteSelectionAudio(selection.id);
    _selections = _selections.where((s) => s.id != selection.id).toList();
  }
}
