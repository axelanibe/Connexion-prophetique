// Modèles de Parole vivante, tranche T13, 26 nov. 2026.
// Le prototype est le modèle : trois onglets Écouter, Explorer,
// Playlists, lecteur plein écran, mini-lecteur, file d'attente,
// favoris, téléchargements hors ligne, import de fichiers locaux,
// playlists personnelles et sélections de la structure.
// Le catalogue de la plateforme part vide : les titres, orateurs,
// durées et playlists du prototype sont inventés, modèle
// seulement, jamais repris comme contenu réel. Le vrai catalogue
// est la table enseignements du serveur, avec sa catégorie
// (Enseignement, Podcast, Musique) et son fichier audio.
// Favoris, playlists personnelles et téléchargements vivent en
// stockage local seulement, jamais en base. Aucune écriture en
// base lors d'une lecture.
import '../api.dart';

/// Catégories des audios, liste fermée, même ordre que le
/// serveur (CATEGORIES_AUDIO). La première est le repli des
/// enseignements existants sans catégorie.
const kCategoriesAudio = ['Enseignement', 'Podcast', 'Musique'];

/// Catégorie d'un audio : sa catégorie serveur, dans la liste
/// fermée ; hors liste ou vide, « Enseignement », jamais inventée.
String categorieAudio(String? valeur) {
  final categorie = (valeur ?? '').trim();
  return kCategoriesAudio.contains(categorie) ? categorie : 'Enseignement';
}

/// Filtres de l'onglet Explorer, sur une seule ligne. Orateurs
/// n'est pas une catégorie, c'est la grille des orateurs.
enum FiltreParole {
  tous('Tous'),
  enseignement('Enseignements'),
  podcast('Podcasts'),
  musique('Musique'),
  orateurs('Orateurs');

  const FiltreParole(this.libelle);
  final String libelle;
}

/// Catégorie d'un filtre, null pour Tous et Orateurs.
String? categorieDuFiltre(FiltreParole filtre) => switch (filtre) {
      FiltreParole.enseignement => 'Enseignement',
      FiltreParole.podcast => 'Podcast',
      FiltreParole.musique => 'Musique',
      _ => null,
    };

/// Un audio de Parole vivante : un enseignement du serveur, ou
/// un fichier importé depuis l'appareil. L'identifiant local
/// commence par « local- », l'identifiant serveur est un UUID.
/// La durée du catalogue est le texte saisi par la structure
/// (« 12:34 ») ; la durée réelle, lue par le lecteur à la
/// lecture, la remplace dans le lecteur seulement.
class AudioParoleVivante {
  AudioParoleVivante({
    required this.id,
    required this.titre,
    this.orateur = '',
    this.categorie = 'Enseignement',
    this.dureeTexte,
    this.description = '',
    this.audioId,
    this.lienAudio,
    this.publieLe,
    this.estLocal = false,
    this.extensionFichier,
    this.tailleOctets,
  });

  final String id;
  final String titre;
  final String orateur;
  final String categorie;
  final String? dureeTexte;
  final String description;
  final String? audioId;
  final String? lienAudio;
  final DateTime? publieLe;
  final bool estLocal;
  final String? extensionFichier;
  final int? tailleOctets;

  /// Adresse de lecture en continu : le fichier public du
  /// serveur. Sans fichier, le lien audio saisi par la structure.
  String? get urlLecture {
    if (audioId != null && audioId!.isNotEmpty) {
      return '$kApiBaseUrl/fichiers/$audioId';
    }
    if (lienAudio != null && lienAudio!.isNotEmpty) return lienAudio;
    return null;
  }

  bool get aUnSon => urlLecture != null;

  AudioParoleVivante copierAvec({String? dureeTexte}) => AudioParoleVivante(
        id: id,
        titre: titre,
        orateur: orateur,
        categorie: categorie,
        dureeTexte: dureeTexte ?? this.dureeTexte,
        description: description,
        audioId: audioId,
        lienAudio: lienAudio,
        publieLe: publieLe,
        estLocal: estLocal,
        extensionFichier: extensionFichier,
        tailleOctets: tailleOctets,
      );
}

/// Audio venu du serveur, GET /enseignements : mêmes champs que
/// la route (titre, orateur, catégorie, durée, description,
/// audio_id, lien_audio, publie_le).
AudioParoleVivante audioDepuisServeur(Map<String, dynamic> ligne) {
  final publieLe = ligne['publie_le'] as String?;
  return AudioParoleVivante(
    id: (ligne['id'] ?? '').toString(),
    titre: (ligne['titre'] ?? '').toString(),
    orateur: (ligne['orateur'] ?? '').toString(),
    categorie: categorieAudio((ligne['categorie'] ?? '').toString()),
    dureeTexte: (ligne['duree'] ?? '').toString().isEmpty
        ? null
        : (ligne['duree'] ?? '').toString(),
    description: (ligne['description'] ?? '').toString(),
    audioId: (ligne['audio_id'] ?? '').toString().isEmpty
        ? null
        : (ligne['audio_id'] ?? '').toString(),
    lienAudio: (ligne['lien_audio'] ?? '').toString().isEmpty
        ? null
        : (ligne['lien_audio'] ?? '').toString(),
    publieLe: publieLe == null ? null : DateTime.tryParse(publieLe),
  );
}

/// Durée « mm:ss » ou « h:mm:ss » en secondes, null quand le
/// texte n'est pas une durée. La durée n'est jamais devinée.
int? dureeSecondesDepuisTexte(String? texte) {
  if (texte == null) return null;
  final parties = texte.trim().split(':');
  if (parties.length < 2 || parties.length > 3) return null;
  final nombres = <int>[];
  for (final partie in parties) {
    final n = int.tryParse(partie);
    if (n == null || n < 0) return null;
    nombres.add(n);
  }
  if (nombres.length == 2) return nombres[0] * 60 + nombres[1];
  return nombres[0] * 3600 + nombres[1] * 60 + nombres[2];
}

/// Durée en « m:ss », sans les heures quand elles sont nulles.
String formaterDuree(Duration duree) {
  final secondes = duree.inSeconds;
  if (secondes < 0) return '0:00';
  final heures = secondes ~/ 3600;
  final minutes = (secondes % 3600) ~/ 60;
  final restes = secondes % 60;
  final secondesTexte = restes.toString().padLeft(2, '0');
  if (heures > 0) return '$heures:${minutes.toString().padLeft(2, '0')}:$secondesTexte';
  return '$minutes:$secondesTexte';
}

/// Taille en Mo, une décimale, comme dans le prototype.
String formaterTailleMo(int octets) =>
    '${(octets / (1024 * 1024)).toStringAsFixed(1)} Mo';

/// Audios visibles : recherche en direct sur le titre et
/// l'orateur, puis catégorie du filtre. Orateurs ne filtre pas
/// ici, il ouvre la grille.
List<AudioParoleVivante> filtrerAudios(
  List<AudioParoleVivante> audios, {
  String requete = '',
  FiltreParole filtre = FiltreParole.tous,
}) {
  var liste = audios;
  final q = requete.trim().toLowerCase();
  if (q.isNotEmpty) {
    liste = liste
        .where((a) =>
            a.titre.toLowerCase().contains(q) ||
            a.orateur.toLowerCase().contains(q))
        .toList();
  }
  final categorie = categorieDuFiltre(filtre);
  if (categorie != null) {
    liste = liste.where((a) => a.categorie == categorie).toList();
  }
  return liste;
}

/// Orateurs du catalogue, triés par nom, avec leur nombre
/// d'audios. Un audio sans orateur n'apparaît pas.
Map<String, int> orateursAudios(List<AudioParoleVivante> audios) {
  final comptes = <String, int>{};
  for (final audio in audios) {
    final orateur = audio.orateur.trim();
    if (orateur.isEmpty) continue;
    comptes[orateur] = (comptes[orateur] ?? 0) + 1;
  }
  final noms = comptes.keys.toList()..sort();
  return {for (final nom in noms) nom: comptes[nom]!};
}

/// Audios d'un orateur, les plus récents d'abord.
List<AudioParoleVivante> audiosOrateur(
    List<AudioParoleVivante> audios, String orateur) {
  final liste =
      audios.where((a) => a.orateur.trim() == orateur.trim()).toList();
  liste.sort((a, b) {
    final pa = a.publieLe;
    final pb = b.publieLe;
    if (pa == null && pb == null) return a.titre.compareTo(b.titre);
    if (pa == null) return 1;
    if (pb == null) return -1;
    return pb.compareTo(pa);
  });
  return liste;
}

/// Audios les plus récents, par date de publication, sans date
/// en dernier, triés par titre entre eux.
List<AudioParoleVivante> audiosRecents(
    List<AudioParoleVivante> audios, int nombre) {
  final liste = [...audios];
  liste.sort((a, b) {
    final pa = a.publieLe;
    final pb = b.publieLe;
    if (pa == null && pb == null) return a.titre.compareTo(b.titre);
    if (pa == null) return 1;
    if (pb == null) return -1;
    return pb.compareTo(pa);
  });
  return liste.take(nombre).toList();
}

/// Une sélection de la structure, GET /selections-audio : titre,
/// description et liste d'identifiants d'audios, dans l'ordre.
/// La sélection ne copie jamais les audios, elle ne fait que
/// les ranger.
class SelectionAudio {
  SelectionAudio({
    required this.id,
    required this.titre,
    this.description = '',
    this.audioIds = const [],
    this.ordre = 0,
  });

  final String id;
  final String titre;
  final String description;
  final List<String> audioIds;
  final int ordre;

  /// Audios de la sélection, dans l'ordre de la liste, ceux du
  /// catalogue seulement, un audio retiré disparaît sans casser
  /// la sélection.
  List<AudioParoleVivante> audios(List<AudioParoleVivante> catalogue) {
    final parId = {for (final a in catalogue) a.id: a};
    return [
      for (final id in audioIds)
        if (parId.containsKey(id)) parId[id]!,
    ];
  }
}

SelectionAudio selectionDepuisServeur(Map<String, dynamic> ligne) {
  final ids = ligne['audio_ids'];
  return SelectionAudio(
    id: (ligne['id'] ?? '').toString(),
    titre: (ligne['titre'] ?? '').toString(),
    description: (ligne['description'] ?? '').toString(),
    audioIds: ids is List
        ? [for (final id in ids) id.toString()]
        : const [],
    ordre: (ligne['ordre'] as num?)?.toInt() ?? 0,
  );
}

/// Une playlist personnelle, en stockage local seulement. Ses
/// audios sont des identifiants, de la plateforme ou locaux,
/// résolus contre le catalogue et les fichiers à l'affichage.
class PlaylistParole {
  PlaylistParole({
    required this.id,
    required this.titre,
    this.description = '',
    this.audioIds = const [],
  });

  final String id;
  final String titre;
  final String description;
  final List<String> audioIds;

  Map<String, dynamic> toJson() => {
        'id': id,
        'titre': titre,
        'description': description,
        'audio_ids': audioIds,
      };

  factory PlaylistParole.fromJson(Map<String, dynamic> json) =>
      PlaylistParole(
        id: (json['id'] ?? '').toString(),
        titre: (json['titre'] ?? '').toString(),
        description: (json['description'] ?? '').toString(),
        audioIds: json['audio_ids'] is List
            ? [for (final id in json['audio_ids']) id.toString()]
            : const [],
      );

  PlaylistParole copierAvec({List<String>? audioIds}) => PlaylistParole(
        id: id,
        titre: titre,
        description: description,
        audioIds: audioIds ?? this.audioIds,
      );

  /// Audios de la playlist, dans l'ordre de la liste, ceux qui
  /// existent encore, un audio retiré disparaît sans casser
  /// la playlist.
  List<AudioParoleVivante> audios(List<AudioParoleVivante> tous) {
    final parId = {for (final a in tous) a.id: a};
    return [
      for (final id in audioIds)
        if (parId.containsKey(id)) parId[id]!,
    ];
  }
}

/// Un fichier audio choisi depuis l'appareil, pour l'import
/// local. Les octets viennent du sélecteur, jamais devinés.
class FichierAudioChoisi {
  FichierAudioChoisi({
    required this.octets,
    required this.nom,
    required this.extension,
  });

  final List<int> octets;
  final String nom;
  final String extension;
}

/// Titre d'un fichier importé : le nom sans extension, tirets
/// et soulignés en espaces, comme dans le prototype.
String titreDepuisNomFichier(String nom) {
  final sansExtension = nom.replaceAll(RegExp(r'\.[^/.]+$'), '');
  final nettoye =
      sansExtension.replaceAll(RegExp(r'[_-]+'), ' ').replaceAll(RegExp(r'\s+'), ' ').trim();
  return nettoye.isEmpty ? 'Audio local sans titre' : nettoye;
}

/// Extensions audio acceptées à l'import et au téléversement,
/// mêmes types que le serveur (MIMES_AUDIO).
const kExtensionsAudio = ['mp3', 'm4a', 'wav', 'ogg', 'aac', 'webm'];

/// Type MIME d'une extension audio, pour l'adresse blob sur
/// le web. Sans correspondance, audio/mpeg par défaut.
String mimeAudio(String extension) => switch (extension.toLowerCase()) {
      'mp3' => 'audio/mpeg',
      'm4a' => 'audio/mp4',
      'aac' => 'audio/aac',
      'ogg' => 'audio/ogg',
      'wav' => 'audio/wav',
      'webm' => 'audio/webm',
      _ => 'audio/mpeg',
    };
