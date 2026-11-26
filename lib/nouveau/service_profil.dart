// Service de Mon profil et Ma carte, tranche T8, 26 nov. 2026.
// Données par l'API existante, lectures seulement : GET /moi
// pour le membre, GET /etablissements pour la liste,
// GET /moi/paiements pour l'état de la carte. Enregistrer
// n'appelle que les routes existantes, seulement pour les
// champs modifiés : /moi/fonction, /moi/etablissement,
// /moi/date-naissance, /moi/telephone, /moi/pays-residence,
// /moi/photo, et T11 /moi/nom et /moi/ville. L'e-mail passe
// par /moi/email, avec un code envoyé à la nouvelle adresse
// avant le changement, jamais par Enregistrer. En cas d'échec
// réseau, les dernières valeurs connues sont gardées, jamais
// remplacées par du vide.
import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../api.dart';
import '../app_models.dart';
import 'cache_contenus.dart';
import 'modeles_profil.dart';
import 'modeles_t15.dart';

/// Photo choisie : octets et type, JPEG, PNG ou WebP.
typedef PhotoChoisie = ({List<int> octets, String mime});

/// Contrat du service Profil et Carte, pour les pages et leurs tests.
abstract class ServiceProfil {
  Future<void> charger();
  bool get aEchoue;
  Member? get membre;
  String get email;
  String get ville;
  String get pays;
  List<String> get etablissements;
  bool get cartePayee;
  bool get carteEnAttente;

  /// État de la carte, T15 : verrouillée sans paiement
  /// confirmé, en attente de validation une fois payée,
  /// validée quand l'adhésion est validée.
  EtatCarte get etatCarte;
  Future<EnregistrementProfil> enregistrer(ModifsProfil modifs);
  Future<bool> changerPhoto(PhotoChoisie photo);
  Future<bool> demanderChangementEmail(String email);
  Future<bool> confirmerChangementEmail(String email, String code);
}

/// Implémentation réelle, sur l'API existante.
class ServiceProfilReel implements ServiceProfil {
  ServiceProfilReel({ApiClient? client}) : _api = client ?? api;
  final ApiClient _api;

  Member? _membre;
  var _email = '';
  var _ville = '';
  var _pays = '';
  var _etablissements = <String>[];
  var _cartePayee = false;
  var _carteEnAttente = false;
  var _aEchoue = false;

  static List<String> _nomsEtablissements(
      List<Map<String, dynamic>> lignes) {
    return [
      for (final l in lignes)
        if ((l['nom'] ?? '').toString().isNotEmpty)
          (l['nom'] ?? '').toString(),
    ];
  }

  static const _cleNom = 'nouveau_profil_nom';
  static const _cleEmail = 'nouveau_profil_email';
  static const _cleVille = 'nouveau_profil_ville';

  @override
  bool get aEchoue => _aEchoue;

  @override
  Member? get membre => _membre;

  @override
  String get email => _email;

  @override
  String get ville => _ville;

  @override
  String get pays => _pays;

  @override
  List<String> get etablissements => List.unmodifiable(_etablissements);

  @override
  bool get cartePayee => _cartePayee;

  @override
  bool get carteEnAttente => _carteEnAttente;

  @override
  EtatCarte get etatCarte => etatCarteDepuis(
        cartePayee: _cartePayee,
        statutAdhesion: _membre?.statutAdhesion ?? '',
      );

  @override
  Future<void> charger() async {
    final prefs = await SharedPreferences.getInstance();
    final nomLocal = prefs.getString(_cleNom) ?? '';
    final emailLocal = prefs.getString(_cleEmail) ?? '';
    final villeLocale = prefs.getString(_cleVille) ?? '';
    try {
      final moi = await _api.fetchMoi();
      _membre = membreDepuisMoi(moi, nomLocal: nomLocal);
      _email = (moi['email'] ?? '').toString();
      if (_email.isEmpty) _email = emailLocal;
      _ville = (moi['ville'] ?? '').toString();
      if (_ville.isEmpty) _ville = villeLocale;
      _pays = paysResidenceCanonique((moi['pays_residence'] ?? '').toString());
      _aEchoue = false;
    } catch (_) {
      _aEchoue = _membre == null;
    }
    // Établissements, tranche T10 : lus d'abord en local, puis
    // rafraîchis par le réseau. Après une connexion fraîche, la
    // liste connue s'affiche en attendant la synchro ; hors ligne,
    // elle est gardée, jamais remplacée par du vide.
    final cache = CacheContenus(_api);
    _etablissements = _nomsEtablissements(
        await cache.lireEtablissementsEnCache());
    _etablissements =
        _nomsEtablissements(await cache.chargerEtablissements());
    try {
      final paiements = await _api.fetchMyPayments();
      var payee = false;
      var attente = false;
      for (final p in paiements) {
        if ((p['type'] ?? '').toString() != 'carte') continue;
        final statut = (p['statut'] ?? '').toString();
        if (statut == 'confirme') payee = true;
        if (statut != 'confirme' && statut != 'refuse') attente = true;
      }
      _cartePayee = payee;
      _carteEnAttente = attente && !payee;
    } catch (_) {
      // Hors ligne : l'état connu de la carte est gardé.
    }
  }

  Member _avec({
    String? nom,
    String? etab,
    String? fonction,
    DateTime? dateNaissance,
    bool effacerNaissance = false,
    String? telephone,
    String? photoData,
    String? ville,
    String? email,
  }) {
    final m = _membre;
    if (m == null) {
      return Member(nom ?? '', '', '', DateTime.now());
    }
    return Member(
      nom ?? m.name,
      m.matricule,
      etab ?? m.etab,
      m.since,
      fonction: fonction ?? m.fonction,
      ministere: m.ministere,
      photoPath: m.photoPath,
      photoData: photoData ?? m.photoData,
      validUntilOverride: m.validUntilOverride,
      dateNaissance:
          effacerNaissance ? null : (dateNaissance ?? m.dateNaissance),
      telephone: telephone ?? m.telephone,
      anneeAdhesion: m.anneeAdhesion,
      statutAdhesion: m.statutAdhesion,
      ville: ville ?? m.ville,
      email: email ?? m.email,
    );
  }

  @override
  Future<EnregistrementProfil> enregistrer(ModifsProfil modifs) async {
    final m = _membre;
    if (m == null) {
      return const EnregistrementProfil(
          reussi: false, gardeLocalSeulement: false);
    }
    var reussi = true;
    var gardeLocal = false;
    final nomChange = modifs.nom.trim() != m.name;
    final villeChange = modifs.ville.trim() != _ville;
    if (modifs.fonction != m.fonction) {
      if (!await _api.updateFonction(modifs.fonction)) reussi = false;
    }
    final etabChoisi =
        modifs.etablissement == 'Autre' ? '' : modifs.etablissement.trim();
    if (etabChoisi != m.etab) {
      final ok = await _api.updateMonEtablissement(
          modifs.etablissement == 'Autre' ? null : etabChoisi);
      if (!ok) reussi = false;
    }
    final naissanceChange =
        (modifs.dateNaissance == null) != (m.dateNaissance == null) ||
            (modifs.dateNaissance != null &&
                m.dateNaissance != null &&
                isoDate(modifs.dateNaissance!) != isoDate(m.dateNaissance!));
    if (naissanceChange) {
      final ok = await _api.updateDateNaissance(
          modifs.dateNaissance == null ? null : isoDate(modifs.dateNaissance!));
      if (!ok) reussi = false;
    }
    if (modifs.telephone.trim() != m.telephone) {
      if (!await _api.updateTelephone(modifs.telephone.trim())) reussi = false;
    }
    if (modifs.pays != _pays) {
      if (!await _api.updatePaysResidence(modifs.pays)) reussi = false;
    }
    // Nom et ville, T11 : d'abord le serveur, puis le stockage
    // local en repli quand le serveur refuse, comme l'ancien
    // comportement. La page le dit quand c'est le cas.
    final prefs = await SharedPreferences.getInstance();
    if (nomChange) {
      if (await _api.updateNom(modifs.nom.trim())) {
        await prefs.remove(_cleNom);
        _membre = _avec(nom: modifs.nom.trim());
      } else {
        await prefs.setString(_cleNom, modifs.nom.trim());
        _membre = _avec(nom: modifs.nom.trim());
        gardeLocal = true;
      }
    }
    if (villeChange) {
      if (await _api.updateVille(modifs.ville.trim())) {
        await prefs.remove(_cleVille);
        _ville = modifs.ville.trim();
        _membre = _avec(ville: modifs.ville.trim());
      } else {
        await prefs.setString(_cleVille, modifs.ville.trim());
        _ville = modifs.ville.trim();
        _membre = _avec(ville: modifs.ville.trim());
        gardeLocal = true;
      }
    }
    if (etabChoisi != m.etab) _membre = _avec(etab: etabChoisi);
    if (modifs.fonction != m.fonction) {
      _membre = _avec(fonction: modifs.fonction);
    }
    if (naissanceChange) {
      _membre = _avec(
        dateNaissance: modifs.dateNaissance,
        effacerNaissance: modifs.dateNaissance == null,
      );
    }
    if (modifs.telephone.trim() != m.telephone) {
      _membre = _avec(telephone: modifs.telephone.trim());
    }
    if (modifs.pays != _pays) _pays = modifs.pays;
    return EnregistrementProfil(
      reussi: reussi,
      gardeLocalSeulement: gardeLocal,
    );
  }

  @override
  Future<bool> changerPhoto(PhotoChoisie photo) async {
    try {
      final dataUrl =
          'data:image/${photo.mime};base64,${base64Encode(photo.octets)}';
      final sauvee = await _api.uploadMemberPhoto(dataUrl);
      if (sauvee == null || sauvee.isEmpty) return false;
      _membre = _avec(photoData: sauvee);
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Changement d'e-mail, T11 : le code part à la nouvelle
  /// adresse, puis la confirmation applique le changement.
  /// Sans SMTP, la demande échoue (503) ; sur un code invalide
  /// ou expiré, la confirmation échoue.
  @override
  Future<bool> demanderChangementEmail(String email) async {
    return _api.demanderChangementEmail(email.trim());
  }

  @override
  Future<bool> confirmerChangementEmail(String email, String code) async {
    final ok =
        await _api.confirmerChangementEmail(email.trim(), code.trim());
    if (ok) {
      _email = email.trim();
      _membre = _avec(email: email.trim());
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(_cleEmail);
    }
    return ok;
  }
}
