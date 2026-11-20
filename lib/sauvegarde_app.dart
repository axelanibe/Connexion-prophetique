// Sauvegarde de l'application comme WhatsApp, 20 nov. 2026 :
// journal privé, enregistrements du magnétophone et réglages,
// chiffrés avec un mot de passe choisi par le membre, puis
// envoyés sur son propre Google Drive, dans un dossier privé.
// La clé dérivée et le sel vivent dans StockageAuth, exclu de
// la sauvegarde automatique Android : ils disparaissent à la
// désinstallation, le mot de passe seul rouvre la sauvegarde
// sur un autre téléphone. Le mot de passe n'est jamais stocké,
// jamais envoyé au serveur de la structure.
import 'dart:convert';
import 'dart:math';
import 'dart:typed_data';

import 'package:crypto/crypto.dart';
import 'package:encrypt/encrypt.dart' as chiffrement;
import 'package:shared_preferences/shared_preferences.dart';

import 'i18n.dart';
import 'magnetophone.dart';
import 'magnetophone_drive.dart';
import 'meditation_journal.dart';
import 'stockage_auth.dart';
import 'text_size.dart';

/// Chiffrement de la sauvegarde : PBKDF2-HMAC-SHA256 maison,
// 100 000 itérations, clé 32 octets, puis AES-256-GCM. Le
// fichier chiffré tient sel 16 octets, iv 12 octets, puis le
// chiffré avec son tag GCM. Un mauvais mot de passe ou un
// fichier corrompu rend null, jamais d'exception.
class ChiffrementSauvegarde {
  static const iterationsPbkdf2 = 100000;
  static const longueurCle = 32;
  static const longueurSel = 16;
  static const longueurIv = 12;
  static const longueurTagGcm = 16;

  static List<int> _aleatoire(int n) {
    final hasard = Random.secure();
    return List<int>.generate(n, (_) => hasard.nextInt(256));
  }

  /// PBKDF2-HMAC-SHA256 : déterministe pour un même mot de
  /// passe et un même sel, différent dès que le sel change.
  static List<int> deriverCle(String motDePasse, List<int> sel) {
    final mdp = utf8.encode(motDePasse);
    final prf = Hmac(sha256, mdp);
    final sortie = <int>[];
    var bloc = 1;
    while (sortie.length < longueurCle) {
      final compteur = Uint8List(4);
      compteur.buffer.asByteData().setUint32(0, bloc);
      var u = prf.convert([...sel, ...compteur]).bytes;
      final t = List<int>.from(u);
      for (var i = 1; i < iterationsPbkdf2; i++) {
        u = prf.convert(u).bytes;
        for (var j = 0; j < t.length; j++) {
          t[j] ^= u[j];
        }
      }
      sortie.addAll(t);
      bloc++;
    }
    return sortie.sublist(0, longueurCle);
  }

  /// Chiffre avec la clé dérivée du mot de passe et du sel.
  static Uint8List chiffrer(List<int> clair, String motDePasse, List<int> sel) {
    return chiffrerAvecCle(clair, deriverCle(motDePasse, sel), sel);
  }

  /// Chiffre avec une clé déjà dérivée, 32 octets.
  static Uint8List chiffrerAvecCle(List<int> clair, List<int> cle, List<int> sel) {
    final iv = _aleatoire(longueurIv);
    final encrypteur = chiffrement.Encrypter(
      chiffrement.AES(
        chiffrement.Key(Uint8List.fromList(cle)),
        mode: chiffrement.AESMode.gcm,
      ),
    );
    final chiffre = encrypteur.encryptBytes(
      clair,
      iv: chiffrement.IV(Uint8List.fromList(iv)),
    );
    return Uint8List.fromList([...sel, ...iv, ...chiffre.bytes]);
  }

  /// Déchiffre avec le mot de passe, sel lu en tête de fichier.
  /// Null quand le mot de passe est faux ou le fichier corrompu.
  static Uint8List? dechiffrer(List<int> fichier, String motDePasse) {
    try {
      if (fichier.length < longueurSel + longueurIv + longueurTagGcm) return null;
      final sel = fichier.sublist(0, longueurSel);
      return _dechiffrerAvecCle(fichier, deriverCle(motDePasse, sel));
    } catch (_) {
      return null;
    }
  }

  static Uint8List? _dechiffrerAvecCle(List<int> fichier, List<int> cle) {
    try {
      if (fichier.length < longueurSel + longueurIv + longueurTagGcm) return null;
      final iv = fichier.sublist(longueurSel, longueurSel + longueurIv);
      final corps = fichier.sublist(longueurSel + longueurIv);
      final encrypteur = chiffrement.Encrypter(
        chiffrement.AES(
          chiffrement.Key(Uint8List.fromList(cle)),
          mode: chiffrement.AESMode.gcm,
        ),
      );
      return Uint8List.fromList(encrypteur.decryptBytes(
        chiffrement.Encrypted(Uint8List.fromList(corps)),
        iv: chiffrement.IV(Uint8List.fromList(iv)),
      ));
    } catch (_) {
      return null;
    }
  }

  static String cleVersBase64(List<int> cle) => base64Encode(cle);

  static List<int>? cleDepuisBase64(String brut) {
    try {
      final v = base64Decode(brut);
      if (v.length != longueurCle) return null;
      return v;
    } catch (_) {
      return null;
    }
  }

  static String selVersBase64(List<int> sel) => base64Encode(sel);

  static List<int>? selDepuisBase64(String brut) {
    try {
      final v = base64Decode(brut);
      if (v.length != longueurSel) return null;
      return v;
    } catch (_) {
      return null;
    }
  }
}

// ───────────────────────── Manifeste ─────────────────────────

const _nomAppSauvegarde = 'CONNEXION PROPHETIQUE';
const _typeSauvegarde = 'sauvegarde-app';
const _versionSauvegarde = 1;

/// Manifeste de la sauvegarde, journal décodé, réglages et
/// enregistrements avec leurs octets en base64.
Map<String, dynamic> construireManifeste({
  required String journalJson,
  required String langue,
  required int niveauTexte,
  required List<Map<String, dynamic>> enregistrements,
}) {
  dynamic journal;
  try {
    journal = jsonDecode(journalJson);
  } catch (_) {
    journal = {};
  }
  return {
    'app': _nomAppSauvegarde,
    'type': _typeSauvegarde,
    'version': _versionSauvegarde,
    'date': DateTime.now().toIso8601String(),
    'langue': langue,
    'taille_texte': niveauTexte,
    'journal': journal,
    'enregistrements': enregistrements,
  };
}

/// Relit un manifeste, FormatException quand l'application,
/// le type ou la version ne correspondent pas.
Map<String, dynamic> lireManifeste(dynamic json) {
  final Map<String, dynamic> carte;
  if (json is String) {
    final decode = jsonDecode(json);
    if (decode is! Map<String, dynamic>) {
      throw const FormatException('Sauvegarde illisible.');
    }
    carte = decode;
  } else if (json is Map<String, dynamic>) {
    carte = json;
  } else if (json is Map) {
    carte = Map<String, dynamic>.from(json);
  } else {
    throw const FormatException('Sauvegarde illisible.');
  }
  if (carte['app'] != _nomAppSauvegarde ||
      carte['type'] != _typeSauvegarde ||
      carte['version'] != _versionSauvegarde) {
    throw const FormatException('Sauvegarde incompatible.');
  }
  return carte;
}

/// Vrai quand aucune sauvegarde n'existe, ou quand 24 heures
/// ou plus se sont écoulées depuis la dernière.
bool sauvegardeDue(DateTime? derniere, {DateTime? maintenant}) {
  final ref = maintenant ?? DateTime.now();
  if (derniere == null) return true;
  return ref.difference(derniere).inHours >= 24;
}

// ───────────────────────── Sauvegarde ─────────────────────────

/// Sauvegarde de toute l'application sur le Google Drive du
/// membre : journal, enregistrements et réglages, chiffrés.
/// Le mot de passe n'est jamais stocké, seule la clé dérivée
/// l'est, dans StockageAuth, avec le sel.
class SauvegardeApp {
  static const clePrefsDerniere = 'sauvegarde_app_derniere';
  static const clePrefsTaille = 'sauvegarde_app_taille';
  static const clePrefsProposee = 'sauvegarde_app_proposee';
  static const cleAuthCle = 'sauvegarde_app_cle';
  static const cleAuthSel = 'sauvegarde_app_sel';
  static const longueurMinMotDePasse = 8;

  final SauvegardeDrive _drive;
  final DepotEnregistrements _depot;
  final SpiritualJournalStore _journal;

  /// Application de la langue restaurée dans toute
  /// l'application, AppState.setLang côté main.dart. Sans elle,
  /// la langue est gardée en préférences et appliquée aux
  /// traductions, pour la prochaine ouverture.
  final void Function(String langue)? appliquerLangue;

  SauvegardeApp({
    SauvegardeDrive? drive,
    DepotEnregistrements? depot,
    SpiritualJournalStore? journal,
    this.appliquerLangue,
  })  : _drive = drive ?? SauvegardeDrive(),
        _depot = depot ?? DepotEnregistrements(),
        _journal = journal ?? SpiritualJournalStore();

  /// Vrai quand un mot de passe a déjà été défini sur cet
  /// appareil, donc quand une clé dérivée est stockée.
  Future<bool> aUneCle() async {
    final cle = await StockageAuth.lire(cleAuthCle);
    return cle != null && cle.isNotEmpty;
  }

  /// Définit ou change le mot de passe : moins de 8 caractères
  /// est refusé. Le sel est créé une seule fois, puis réutilisé.
  /// Seule la clé dérivée est stockée, jamais le mot de passe.
  Future<bool> definirMotDePasse(String motDePasse) async {
    if (motDePasse.length < longueurMinMotDePasse) return false;
    try {
      var sel = await StockageAuth.lire(cleAuthSel);
      var selOctets = sel == null ? null : ChiffrementSauvegarde.selDepuisBase64(sel);
      if (selOctets == null) {
        selOctets = ChiffrementSauvegarde._aleatoire(ChiffrementSauvegarde.longueurSel);
        await StockageAuth.ecrire(cleAuthSel, ChiffrementSauvegarde.selVersBase64(selOctets));
      }
      final cle = ChiffrementSauvegarde.deriverCle(motDePasse, selOctets);
      await StockageAuth.ecrire(cleAuthCle, ChiffrementSauvegarde.cleVersBase64(cle));
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Compte Google lié, null quand aucun compte n'est lié.
  Future<String?> compteLie() async {
    try {
      return await _drive.compteLie();
    } catch (_) {
      return null;
    }
  }

  /// Lie le compte Google du membre, renvoie son adresse.
  Future<String?> lierCompte() async {
    try {
      return await _drive.lierCompte();
    } catch (_) {
      return null;
    }
  }

  /// Dissocie le compte Google du membre.
  Future<void> dissocier() async {
    try {
      await _drive.dissocier();
    } catch (_) {
      // Déjà dissocié : rien à faire.
    }
  }

  /// Dernière sauvegarde faite sur cet appareil, null si aucune.
  Future<DateTime?> derniereSauvegarde() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final brut = prefs.getString(clePrefsDerniere);
      if (brut == null) return null;
      return DateTime.tryParse(brut);
    } catch (_) {
      return null;
    }
  }

  /// Taille en octets de la dernière sauvegarde, null si aucune.
  Future<int?> tailleDerniereSauvegarde() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      return prefs.getInt(clePrefsTaille);
    } catch (_) {
      return null;
    }
  }

  /// Vrai quand la restauration a déjà été proposée sur cette
  /// installation, pour ne la proposer qu'une seule fois.
  Future<bool> restaurationDejaProposee() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      return prefs.getBool(clePrefsProposee) ?? false;
    } catch (_) {
      return false;
    }
  }

  /// Marque la restauration comme proposée sur cette installation.
  Future<void> marquerRestaurationProposee() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool(clePrefsProposee, true);
    } catch (_) {
      // La proposition sera refaite à la prochaine ouverture.
    }
  }

  /// Sauvegarde immédiate : collecte journal, réglages et
  /// enregistrements, chiffre avec la clé stockée, envoie sur
  /// Drive, puis garde date et taille. Vrai ou faux, sans
  /// exception vers l'appelant.
  Future<bool> sauvegarderMaintenant() async {
    try {
      final cleBrute = await StockageAuth.lire(cleAuthCle);
      final selBrut = await StockageAuth.lire(cleAuthSel);
      final cle = cleBrute == null ? null : ChiffrementSauvegarde.cleDepuisBase64(cleBrute);
      final sel = selBrut == null ? null : ChiffrementSauvegarde.selDepuisBase64(selBrut);
      if (cle == null || sel == null) return false;
      final prefs = await SharedPreferences.getInstance();
      await _journal.load();
      final journalJson = _journal.exportJson();
      final langue = prefs.getString('lang') ?? 'fr';
      final niveauTexte = prefs.getInt('text_size_level') ?? textSize.level;
      final metas = await _depot.lister();
      final enregistrements = <Map<String, dynamic>>[];
      for (final meta in metas) {
        final octets = await _depot.lireOctets(meta);
        if (octets == null) continue;
        enregistrements.add({
          'id': meta.id,
          'nom': meta.nom,
          'mime': meta.mime,
          'dureeMs': meta.dureeMs,
          'creeLe': meta.creeLe.toIso8601String(),
          'donnees': base64Encode(octets),
        });
      }
      final manifeste = construireManifeste(
        journalJson: journalJson,
        langue: langue,
        niveauTexte: niveauTexte,
        enregistrements: enregistrements,
      );
      final chiffre = ChiffrementSauvegarde.chiffrerAvecCle(
        utf8.encode(jsonEncode(manifeste)),
        cle,
        sel,
      );
      final ok = await _drive.envoyerSauvegarde(
        nom: SauvegardeDrive.nomFichierSauvegarde,
        octets: chiffre,
      );
      if (!ok) return false;
      await prefs.setString(clePrefsDerniere, DateTime.now().toIso8601String());
      await prefs.setInt(clePrefsTaille, chiffre.length);
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Sauvegarde distante, id, date et taille, ou null.
  Future<SauvegardeDistante?> verifierDistante() async {
    try {
      return await _drive.trouverSauvegarde();
    } catch (_) {
      return null;
    }
  }

  /// Restaure depuis Drive avec le mot de passe : journal par
  /// fusion sans doublon, enregistrements absents seulement,
  /// langue et taille du texte. Vrai ou faux, sans exception.
  Future<bool> restaurer(String motDePasse) async {
    try {
      final distante = await _drive.trouverSauvegarde();
      if (distante == null) return false;
      final octets = await _drive.telecharger(distante.id);
      if (octets == null) return false;
      final clair = ChiffrementSauvegarde.dechiffrer(octets, motDePasse);
      if (clair == null) return false;
      final manifeste = lireManifeste(utf8.decode(clair));
      final journalBrut = manifeste['journal'];
      if (journalBrut is Map) {
        await _journal.load();
        _journal.importJson(jsonEncode(journalBrut));
        await _journal.save();
      }
      final enregistrements = manifeste['enregistrements'];
      if (enregistrements is List) {
        final existants = await _depot.lister();
        final ids = existants.map((e) => e.id).toSet();
        for (final e in enregistrements) {
          if (e is! Map) continue;
          final id = (e['id'] ?? '').toString();
          if (id.isEmpty || ids.contains(id)) continue;
          final donnees = base64Decode((e['donnees'] ?? '').toString());
          final mime = (e['mime'] ?? 'audio/mp4').toString();
          final dureeMs = (e['dureeMs'] as num?)?.toInt() ?? 0;
          await _depot.ajouter(
            nom: (e['nom'] ?? '').toString(),
            son: SonEnregistre(octets: donnees, mime: mime, dureeMs: dureeMs),
            niveaux: const [],
            id: id,
          );
        }
      }
      final langue = (manifeste['langue'] ?? '').toString();
      if (langue == 'fr' || langue == 'en') {
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('lang', langue);
        setCurrentLang(langue);
        appliquerLangue?.call(langue);
      }
      final niveau = (manifeste['taille_texte'] as num?)?.toInt();
      if (niveau != null) await textSize.applyRemoteLevel(niveau);
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Sauvegarde automatique, silencieuse, meilleur effort :
  /// compte lié, clé présente, sauvegarde due, alors sauvegarde.
  /// Ne bloque jamais l'ouverture de l'application.
  Future<void> declencherSiDue() async {
    try {
      final compte = await _drive.compteLie();
      if (compte == null) return;
      if (!await aUneCle()) return;
      if (!sauvegardeDue(await derniereSauvegarde())) return;
      await sauvegarderMaintenant();
    } catch (_) {
      // Silencieux : la prochaine ouverture réessaiera.
    }
  }
}
