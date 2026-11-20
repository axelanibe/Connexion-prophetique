// Sauvegarde Google Drive du magnétophone, 18 nov. 2026 : le
// membre lie son compte Google et ses enregistrements partent
// dans un dossier de son Drive, pour les retrouver s'il change
// de téléphone. Accès limité aux fichiers créés par
// l'application (portée drive.file) : l'application ne voit
// jamais le reste du Drive du membre.
//
// L'identifiant client OAuth Google pour le web est créé par
// Axel dans Google Cloud Console, gratuit, et saisi dans la
// constante ci-dessous. Tant qu'il est vide, la sauvegarde
// affiche « À configurer » et rien ne casse. Sur téléphone, le
// client OAuth se crée aussi dans Google Cloud Console, avec le
// nom du paquet ci.connexionprophetique.app et l'empreinte SHA-1
// de la clé de signature, sans rien saisir dans le code.

import 'package:flutter/foundation.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:googleapis/drive/v3.dart' as drive;
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:_discoveryapis_commons/_discoveryapis_commons.dart' as commons;

import 'magnetophone.dart';

/// Un fichier du dossier de sauvegarde, sur le Drive du membre.
class FichierDrive {
  final String id;
  final String nom;
  final String mime;
  final String enregistrementId;

  const FichierDrive({
    required this.id,
    required this.nom,
    required this.mime,
    required this.enregistrementId,
  });
}

/// Client http qui porte le jeton Google du membre, renouvelé à
/// chaque appel par la connexion Google.
class _ClientDrive extends http.BaseClient {
  final Map<String, String> _entetes;
  final http.Client _inner = http.Client();

  _ClientDrive(this._entetes);

  @override
  Future<http.StreamedResponse> send(http.BaseRequest request) {
    request.headers.addAll(_entetes);
    return _inner.send(request);
  }
}

class SauvegardeDrive {
  /// Identifiant client OAuth Google pour le web, à saisir par
  /// Axel. Vide tant qu'il n'est pas saisi : la sauvegarde est
  /// alors « À configurer ».
  static const String clientIdWeb =
      '699524469293-mvch5r5s9vbqda7uqgtsgedpijeirag7.apps.googleusercontent.com';

  static const _nomDossier = 'CONNEXION PROPHETIQUE - Magnétophone';
  static const _cleDossier = 'magnetophone_drive_dossier';

  final GoogleSignIn _connexion = GoogleSignIn(
    scopes: [drive.DriveApi.driveFileScope],
    clientId: clientIdWeb.isEmpty ? null : clientIdWeb,
  );

  /// Vrai quand la sauvegarde peut être proposée : sur
  /// téléphone, le client OAuth se crée côté console sans rien
  /// saisir ici ; sur le web, il faut l'identifiant ci-dessus.
  bool get configuree => !kIsWeb || clientIdWeb.isNotEmpty;

  /// Compte lié, null quand aucun compte n'est lié : une
  /// connexion silencieuse est tentée, sans ouvrir d'écran.
  Future<String?> compteLie() async {
    if (!configuree) return null;
    try {
      final compte = _connexion.currentUser ?? await _connexion.signInSilently();
      return compte?.email;
    } catch (_) {
      return null;
    }
  }

  /// Lie le compte Google du membre, renvoie son adresse, null
  /// quand il annule. L'écran de consentement Google s'ouvre.
  Future<String?> lierCompte() async {
    if (!configuree) return null;
    try {
      final compte = await _connexion.signIn();
      return compte?.email;
    } catch (_) {
      return null;
    }
  }

  /// Dissocie le compte Google du membre.
  Future<void> dissocier() async {
    try {
      await _connexion.signOut();
    } catch (_) {
      // Déjà dissocié : rien à faire.
    }
  }

  Future<drive.DriveApi?> _api() async {
    final compte = _connexion.currentUser;
    if (compte == null) return null;
    try {
      final entetes = await compte.authHeaders;
      return drive.DriveApi(_ClientDrive(entetes));
    } catch (_) {
      return null;
    }
  }

  /// Dossier de sauvegarde dans le Drive du membre, créé une
  /// fois puis retrouvé par son identifiant gardé sur l'appareil.
  Future<String?> _dossier(drive.DriveApi api) async {
    final prefs = await SharedPreferences.getInstance();
    final connu = prefs.getString(_cleDossier);
    if (connu != null && connu.isNotEmpty) return connu;
    final liste = await api.files.list(
      q: "name = '$_nomDossier' and mimeType = 'application/vnd.google-apps.folder' and trashed = false",
      spaces: 'drive',
      $fields: 'files(id)',
    );
    final fichiers = liste.files ?? [];
    final existant = fichiers.isEmpty ? null : fichiers.first.id;
    if (existant != null) {
      await prefs.setString(_cleDossier, existant);
      return existant;
    }
    final cree = await api.files.create(
      drive.File(
        name: _nomDossier,
        mimeType: 'application/vnd.google-apps.folder',
      ),
    );
    if (cree.id == null) return null;
    await prefs.setString(_cleDossier, cree.id!);
    return cree.id;
  }

  /// Sauvegarde un enregistrement dans le dossier Drive du
  /// membre. L'identifiant local est gardé dans les propriétés
  /// du fichier, pour le retrouver à la restauration.
  Future<bool> sauvegarder({
    required EnregistrementAudio meta,
    required List<int> octets,
  }) async {
    try {
      final api = await _api();
      if (api == null) return false;
      final dossier = await _dossier(api);
      if (dossier == null) return false;
      final media = commons.Media(
        Stream.value(octets),
        octets.length,
        contentType: meta.mime,
      );
      final cree = await api.files.create(
        drive.File(
          name: '${meta.nom}.${meta.extension}',
          parents: [dossier],
          appProperties: {'enregistrement_id': meta.id},
        ),
        uploadMedia: media,
      );
      return cree.id != null;
    } catch (_) {
      return false;
    }
  }

  /// Fichiers du dossier de sauvegarde, pour la restauration.
  Future<List<FichierDrive>> lister() async {
    try {
      final api = await _api();
      if (api == null) return [];
      final dossier = await _dossier(api);
      if (dossier == null) return [];
      final liste = await api.files.list(
        q: "'$dossier' in parents and trashed = false",
        spaces: 'drive',
        $fields: 'files(id,name,mimeType,appProperties)',
      );
      return (liste.files ?? [])
          .where((f) => f.id != null)
          .map((f) => FichierDrive(
                id: f.id!,
                nom: (f.name ?? '').replaceAll(RegExp(r'\.[a-z0-9]+$'), ''),
                mime: f.mimeType ?? 'audio/mp4',
                enregistrementId: f.appProperties?['enregistrement_id'] ?? '',
              ))
          .toList();
    } catch (_) {
      return [];
    }
  }

  /// Télécharge un fichier du dossier de sauvegarde, null en
  /// cas d'échec.
  Future<Uint8List?> telecharger(String fichierId) async {
    try {
      final api = await _api();
      if (api == null) return null;
      final telecharge = await api.files.get(
        fichierId,
        downloadOptions: commons.DownloadOptions.fullMedia,
      );
      final media = telecharge as commons.Media;
      final morceaux = await media.stream.toList();
      final octets = <int>[];
      for (final morceau in morceaux) {
        octets.addAll(morceau);
      }
      return Uint8List.fromList(octets);
    } catch (_) {
      return null;
    }
  }
}
