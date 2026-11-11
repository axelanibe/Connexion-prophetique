// CONNEXION PROPHÉTIQUE — Client API de production.
// Serveur : https://connexion-prophetique.onrender.com
// Règles : aucune donnée n'est inventée ici. Si le serveur ne renvoie
// rien pour une liste, l'application garde ses données locales.
// Si le serveur est injoignable, l'application continue hors ligne
// avec ses données locales. Le jeton d'accès n'est jamais affiché.
// Le jeton d'accès dure 15 minutes côté serveur : le jeton de
// rafraîchissement (30 jours) est conservé sur l'appareil et sert à
// obtenir un nouvel accès sans redemander le mot de passe.

import 'dart:convert';
import 'dart:typed_data';

import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import 'stockage_auth.dart';

const String kApiBaseUrl = 'https://connexion-prophetique.onrender.com';

class ApiException implements Exception {
  ApiException(this.message);
  final String message;
  @override
  String toString() => message;
}

class ApiClient {
  ApiClient({http.Client? client}) : _client = client ?? http.Client();

  final http.Client _client;
  String? _accessToken;
  String? _refreshToken;
  // Case « Rester connecté », 29 oct. 2026 : quand elle est décochée,
  // les jetons ne sont gardés qu'en mémoire, jamais enregistrés sur
  // l'appareil, et la prochaine ouverture complète exige une
  // reconnexion. Le mot de passe lui-même n'est jamais stocké.
  bool _persistTokens = true;

  Future<void> restoreToken() async {
    // Carte 116, 9 nov. 2026 : les jetons vivent dans le stockage
    // séparé, exclu de la sauvegarde Android, jamais relus depuis
    // les préférences partagées sur Android.
    _accessToken = await StockageAuth.lire('api_access_token');
    _refreshToken = await StockageAuth.lire('api_refresh_token');
    if (StockageAuth.estNatif) {
      // Migration : les anciennes clés restent dans les préférences
      // partagées, jamais relues, on les efface une fois pour toutes.
      final prefs = await SharedPreferences.getInstance();
      if (prefs.containsKey('api_access_token') || prefs.containsKey('api_refresh_token')) {
        await prefs.remove('api_access_token');
        await prefs.remove('api_refresh_token');
      }
    }
    // Une session restaurée depuis l'appareil est une session dont
    // l'utilisateur a voulu la conservation : les renouvellements
    // restent alors enregistrés. Sans jeton restauré, la prochaine
    // connexion fixera ce drapeau explicitement.
    _persistTokens = _refreshToken != null;
  }

  Future<void> saveToken(String? token, {bool? persist}) async {
    _accessToken = token;
    if (token == null) {
      await StockageAuth.effacer('api_access_token');
    } else if (persist ?? _persistTokens) {
      await StockageAuth.ecrire('api_access_token', token);
    }
  }

  Future<void> _saveRefresh(String? token, {bool? persist}) async {
    _refreshToken = token;
    if (token == null) {
      await StockageAuth.effacer('api_refresh_token');
    } else if (persist ?? _persistTokens) {
      await StockageAuth.ecrire('api_refresh_token', token);
    }
  }

  bool get isConnected => _accessToken != null && _accessToken!.isNotEmpty;

  /// Rôle lu dans le jeton d'accès (charge utile décodée, pas un secret).
  /// Sert à ouvrir l'espace structure quand le serveur a donné un rôle
  /// administrateur, sans code dans l'application.
  String? get role {
    final token = _accessToken;
    if (token == null) return null;
    try {
      final parts = token.split('.');
      if (parts.length != 3) return null;
      final payload = utf8.decode(base64Url.decode(base64Url.normalize(parts[1])));
      final data = jsonDecode(payload) as Map<String, dynamic>;
      return data['role'] as String?;
    } catch (_) {
      return null;
    }
  }

  /// Fonction clé lue dans le jeton d'accès, carte 75 : « fad »,
  /// null pour un administrateur d'établissement plein, sans
  /// fonction clé, comme pour un membre ou un général. Le serveur
  /// reste la seule autorité : cette lecture ne sert qu'à
  /// l'affichage, jamais à ouvrir ou fermer une page.
  String? get fonctionAdmin {
    final token = _accessToken;
    if (token == null) return null;
    try {
      final parts = token.split('.');
      if (parts.length != 3) return null;
      final payload = utf8.decode(base64Url.decode(base64Url.normalize(parts[1])));
      final data = jsonDecode(payload) as Map<String, dynamic>;
      final v = data['fad'];
      if (v == null) return null;
      final t = v.toString();
      return t.isEmpty ? null : t;
    } catch (_) {
      return null;
    }
  }

  Map<String, String> get _headers => {
        'Content-Type': 'application/json',
        if (_accessToken != null) 'Authorization': 'Bearer $_accessToken',
      };

  ApiException _error(int status, String body) {
    try {
      final data = jsonDecode(body);
      if (data is Map && data['erreur'] is String) return ApiException(data['erreur'] as String);
      if (data is Map && data['message'] is String) return ApiException(data['message'] as String);
    } catch (_) {}
    return ApiException('Le serveur a répondu une erreur ($status).');
  }

  Future<http.Response> _sendWithRefresh(
    Future<http.Response> Function(Map<String, String> headers) send,
  ) async {
    var res = await send(_headers);
    if (res.statusCode == 401 && _refreshToken != null) {
      if (await refreshAccess()) {
        res = await send(_headers);
      }
    }
    return res;
  }

  Future<dynamic> _get(String path) async {
    final res = await _sendWithRefresh(
      (headers) => _client
          .get(Uri.parse('$kApiBaseUrl$path'), headers: headers)
          .timeout(const Duration(seconds: 45)),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw _error(res.statusCode, res.body);
    }
    return jsonDecode(res.body);
  }

  Future<Map<String, dynamic>> _post(String path, Map<String, dynamic> body) async {
    final res = await _sendWithRefresh(
      (headers) => _client
          .post(Uri.parse('$kApiBaseUrl$path'), headers: headers, body: jsonEncode(body))
          .timeout(const Duration(seconds: 30)),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw _error(res.statusCode, res.body);
    }
    final data = jsonDecode(res.body);
    if (data is Map<String, dynamic>) return data;
    return {'data': data};
  }

  /// Routes d'authentification, carte 46 : envoi direct, sans
  /// en-tête Authorization et sans rejeu après rafraîchissement.
  /// _sendWithRefresh, sur un 401, tente refreshAccess() avec
  /// l'ancien jeton puis rejoue la requête : pour /auth/connexion,
  /// un 401 « Identifiants incorrects » pouvait ainsi réauthentifier
  /// l'ancienne session et écraser les jetons, masquant l'erreur.
  /// Les routes authentifiées gardent _post et son rejeu.
  Future<Map<String, dynamic>> _postAuth(String path, Map<String, dynamic> body) async {
    final res = await _client
        .post(Uri.parse('$kApiBaseUrl$path'),
            headers: {'Content-Type': 'application/json'}, body: jsonEncode(body))
        .timeout(const Duration(seconds: 30));
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw _error(res.statusCode, res.body);
    }
    final data = jsonDecode(res.body);
    if (data is Map<String, dynamic>) return data;
    return {'data': data};
  }

  Future<Map<String, dynamic>> _delete(String path, [Map<String, dynamic>? body]) async {
    final res = await _sendWithRefresh(
      (headers) => _client
          .delete(Uri.parse('$kApiBaseUrl$path'), headers: headers, body: body == null ? null : jsonEncode(body))
          .timeout(const Duration(seconds: 30)),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw _error(res.statusCode, res.body);
    }
    final data = jsonDecode(res.body);
    if (data is Map<String, dynamic>) return data;
    return {'data': data};
  }

  Future<bool> checkHealth() async {
    final data = await _get('/sante');
    return data is Map && data['ok'] == true;
  }

  Future<List<Map<String, dynamic>>> _list(String path) async {
    final data = await _get(path);
    if (data is List) return data.cast<Map<String, dynamic>>();
    return const [];
  }

  Future<List<Map<String, dynamic>>> fetchEtablissements() => _list('/etablissements');
  Future<Map<String, dynamic>> fetchEtablissement(String id) async {
    final data = await _get('/etablissements/$id');
    return data as Map<String, dynamic>;
  }

  Future<List<Map<String, dynamic>>> fetchActualites() => _list('/actualites');
  Future<List<Map<String, dynamic>>> fetchEvenements() => _list('/evenements');
  Future<List<Map<String, dynamic>>> fetchLivres() => _list('/livres');
  Future<List<Map<String, dynamic>>> fetchEnseignements() => _list('/enseignements');

  /// Documents institutionnels, 1er nov. 2026, version 1 : liste
  /// filtrée côté serveur selon l'établissement du membre.
  Future<List<Map<String, dynamic>>> fetchDocuments() => _list('/documents');

  /// Publication d'un document, structure seulement, périmètre
  /// contrôlé côté serveur. Le fichier, s'il y en a un, doit déjà
  /// être téléversé par /admin/fichiers, comme pour les livres.
  Future<Map<String, dynamic>> publishDocument({required String titre, String? lien, String? fichierId, String? etablissementId}) async {
    final data = await _post('/admin/documents', {
      'titre': titre,
      if (lien != null && lien.isNotEmpty) 'lien': lien,
      if (fichierId != null && fichierId.isNotEmpty) 'fichier_id': fichierId,
      if (etablissementId != null && etablissementId.isNotEmpty) 'etablissement_id': etablissementId,
    });
    return data;
  }

  Future<void> deleteDocument(String id) async {
    await _delete('/admin/documents/$id');
  }

  /// Octets du fichier d'un document, accès vérifié côté serveur
  /// selon la visibilité du document, comme pour un livre acheté.
  Future<List<int>> fetchDocumentFile(String documentId) async {
    final res = await _sendWithRefresh(
      (headers) => _client
          .get(Uri.parse('$kApiBaseUrl/documents/$documentId/fichier'), headers: headers)
          .timeout(const Duration(seconds: 120)),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw _error(res.statusCode, res.body);
    }
    return res.bodyBytes;
  }

  /// Annonces audio, 29 oct. 2026 : cartes façon Wave sur l'accueil.
  /// Table serveur séparée des enseignements, jamais réutilisée
  /// pour eux. La création et le retrait sont réservés au rôle
  /// administrateur général côté serveur.
  Future<List<Map<String, dynamic>>> fetchAnnoncesAudio() => _list('/annonces-audio');

  /// Liste administrateur, 30 oct. 2026 : comme la lecture membres,
  /// plus les annonces programmées, avec leur date prévue.
  Future<List<Map<String, dynamic>>> fetchAnnoncesAudioAdmin() => _list('/admin/annonces-audio');

  /// Liste administrateur des actualités, 30 oct. 2026 : comme la
  /// lecture membres, plus les actualités programmées.
  Future<List<Map<String, dynamic>>> fetchActualitesAdmin() => _list('/admin/actualites');

  Future<Map<String, dynamic>> createAnnonceAudio({required String titre, String? texte, String? audioId, String? lienAudio, DateTime? programmeeLe}) {
    return _post('/admin/annonces-audio', {
      'titre': titre,
      if (texte != null && texte.isNotEmpty) 'texte': texte,
      if (audioId != null && audioId.isNotEmpty) 'audio_id': audioId,
      if (lienAudio != null && lienAudio.isNotEmpty) 'lien_audio': lienAudio,
      if (programmeeLe != null) 'programmee_le': programmeeLe.toIso8601String(),
    });
  }

  /// Modification de la programmation d'une annonce audio, 30 oct.
  /// 2026 : une date future programme, annulerProgrammation remet
  /// la publication immédiate (nul explicite côté serveur).
  Future<void> updateAnnonceAudio(String id, {DateTime? programmeeLe, bool annulerProgrammation = false}) async {
    await _put('/admin/annonces-audio/$id', {
      if (annulerProgrammation) 'programmee_le': null else if (programmeeLe != null) 'programmee_le': programmeeLe.toIso8601String(),
    });
  }

  Future<void> deleteAnnonceAudio(String id) async {
    final res = await _sendWithRefresh(
      (headers) => _client.delete(Uri.parse('$kApiBaseUrl/admin/annonces-audio/$id'), headers: headers).timeout(const Duration(seconds: 30)),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) throw _error(res.statusCode, res.body);
  }
  /// Cartes vidéo, 30 oct. 2026 : cartes façon « Regardez la
  /// vidéo ! », téléphone seulement. Table serveur séparée,
  /// liens lus dans l'application, aucune vidéo stockée.
  /// La création, la modification et le retrait sont réservés
  /// au rôle administrateur général côté serveur.
  Future<List<Map<String, dynamic>>> fetchCartesVideo() => _list('/cartes-video');

  /// Liste administrateur des cartes vidéo, 30 oct. 2026.
  Future<List<Map<String, dynamic>>> fetchCartesVideoAdmin() => _list('/admin/cartes-video');

  Future<Map<String, dynamic>> createCarteVideo({required String titre, String? explication, required String lienVideo}) {
    return _post('/admin/cartes-video', {
      'titre': titre,
      if (explication != null && explication.isNotEmpty) 'explication': explication,
      'lien_video': lienVideo,
    });
  }

  Future<void> updateCarteVideo(String id, {String? titre, String? explication, String? lienVideo}) async {
    await _put('/admin/cartes-video/$id', {
      if (titre != null) 'titre': titre,
      if (explication != null) 'explication': explication,
      if (lienVideo != null) 'lien_video': lienVideo,
    });
  }

  Future<void> deleteCarteVideo(String id) async {
    final res = await _sendWithRefresh(
      (headers) => _client.delete(Uri.parse('$kApiBaseUrl/admin/cartes-video/$id'), headers: headers).timeout(const Duration(seconds: 30)),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) throw _error(res.statusCode, res.body);
  }

  Future<List<Map<String, dynamic>>> fetchBureau() => _list('/bureau');

  /// Liste complète du Bureau pour l'administrateur général, avec
  /// id, contact réel et établissement. Les membres ordinaires
  /// passent toujours par la route publique, sans id.
  Future<List<Map<String, dynamic>>> fetchBureauAdmin() => _list('/admin/bureau');

  Future<Map<String, dynamic>> creerBureau(Map<String, dynamic> corps) => _post('/admin/bureau', corps);

  Future<Map<String, dynamic>> modifierBureau(String id, Map<String, dynamic> corps) async {
    final res = await _sendWithRefresh((headers) => _client.patch(Uri.parse('$kApiBaseUrl/admin/bureau/$id'), headers: headers, body: jsonEncode(corps)).timeout(const Duration(seconds: 30)));
    if (res.statusCode < 200 || res.statusCode >= 300) throw _error(res.statusCode, res.body);
    final data = jsonDecode(res.body);
    if (data is Map<String, dynamic>) return data;
    throw ApiException('Réponse inattendue du serveur.');
  }

  Future<void> supprimerBureau(String id) async {
    final res = await _sendWithRefresh((headers) => _client.delete(Uri.parse('$kApiBaseUrl/admin/bureau/$id'), headers: headers).timeout(const Duration(seconds: 30)));
    if (res.statusCode < 200 || res.statusCode >= 300) throw _error(res.statusCode, res.body);
  }

  /// Import autonome des membres du Bureau, 3 nov. 2026.
  /// Analyse d'abord, sans création : le serveur lit le Word
  /// .docx ou le PDF texte et renvoie l'aperçu, avec les
  /// correspondances appliquées et les lignes rejetées.
  Future<Map<String, dynamic>> analyserBureauImport(List<int> bytes, String filename) async {
    Future<http.StreamedResponse> send(String? token) async {
      final req = http.MultipartRequest('POST', Uri.parse('$kApiBaseUrl/admin/bureau/analyser'));
      if (token != null) req.headers['Authorization'] = 'Bearer $token';
      req.files.add(http.MultipartFile.fromBytes('fichier', bytes, filename: filename));
      return req.send().timeout(const Duration(seconds: 60));
    }

    var res = await send(_accessToken);
    if (res.statusCode == 401 && _refreshToken != null && await refreshAccess()) {
      res = await send(_accessToken);
    }
    final body = await res.stream.bytesToString();
    if (res.statusCode < 200 || res.statusCode >= 300) throw _error(res.statusCode, body);
    final data = jsonDecode(body);
    if (data is Map<String, dynamic>) return data;
    throw ApiException('Le serveur n’a pas renvoyé d’aperçu pour ce fichier.');
  }

  /// Création des lignes validées dans l'aperçu, après le
  /// choix explicite de l'administrateur général. Aucun compte
  /// membre, aucune carte, aucun paiement n'est créé.
  Future<Map<String, dynamic>> importBureau(List<Map<String, dynamic>> lignes, {String? etablissementId}) =>
      _post('/admin/bureau/import', {'lignes': lignes, if (etablissementId != null && etablissementId.isNotEmpty) 'etablissement_id': etablissementId});

  /// Configuration pilotée par le serveur (modèle Desjardins, 27 oct.
  /// 2026) : textes d'accueil, libellés, messages, activation des
  /// sections. En cas d'erreur, on renvoie un objet vide : l'appelant
  /// garde alors la dernière configuration locale, ou les défauts.
  Future<Map<String, dynamic>> fetchConfig() async {
    try {
      final data = await _get('/config');
      if (data is Map<String, dynamic>) return data;
    } catch (_) {}
    return const {};
  }

  /// Configuration design pilotée par le serveur, carte 47, 6 nov.
  /// 2026 : couleurs, titres d'accueil et ordre de la barre du bas.
  /// En cas d'erreur, on renvoie un objet vide : l'appelant garde
  /// alors la dernière configuration locale, ou les défauts.
  Future<Map<String, dynamic>> fetchDesignConfig() async {
    try {
      final data = await _get('/config/design');
      if (data is Map<String, dynamic>) return data;
    } catch (_) {}
    return const {};
  }

  Future<Map<String, dynamic>> login(String identifiant, String motDePasse, {bool rememberMe = true}) async {
    _persistTokens = rememberMe;
    final data = await _postAuth('/auth/connexion', {
      'identifiant': identifiant,
      'mot_de_passe': motDePasse,
    });
    if (data['access'] is String) await saveToken(data['access'] as String);
    if (data['refresh'] is String) await _saveRefresh(data['refresh'] as String);
    return data;
  }

  Future<Map<String, dynamic>> register({
    required String nomComplet,
    required String motDePasse,
    String? email,
    String? telephone,
    String? etablissementId,
    String? fonction,
    String? dateNaissance,
    // Pays de résidence, cartes 64 et 127, 6 nov. 2026 : envoyé tel
    // quel, liste fermée kPaysResidence côté application. Le serveur
    // le stocke depuis la carte 127, en majuscules, carte 125.
    String? paysResidence,
  }) async {
    final data = await _postAuth('/auth/inscription', {
      'nom_complet': nomComplet,
      'mot_de_passe': motDePasse,
      if (email != null && email.isNotEmpty) 'email': email,
      if (telephone != null && telephone.isNotEmpty) 'telephone': telephone,
      if (etablissementId != null && etablissementId.isNotEmpty) 'etablissement_id': etablissementId,
      if (fonction != null && fonction.isNotEmpty) 'fonction': fonction,
      if (dateNaissance != null && dateNaissance.isNotEmpty) 'date_naissance': dateNaissance,
      if (paysResidence != null && paysResidence.isNotEmpty) 'pays_residence': paysResidence,
    });
    if (data['access'] is String) await saveToken(data['access'] as String);
    if (data['refresh'] is String) await _saveRefresh(data['refresh'] as String);
    return data;
  }

  Future<bool> refreshAccess() async {
    final refresh = _refreshToken;
    if (refresh == null || refresh.length != 64) return false;
    try {
      final res = await _client
          .post(Uri.parse('$kApiBaseUrl/auth/rafraichir'),
              headers: {'Content-Type': 'application/json'},
              body: jsonEncode({'refresh': refresh}))
          .timeout(const Duration(seconds: 30));
      if (res.statusCode < 200 || res.statusCode >= 300) return false;
      final data = jsonDecode(res.body) as Map<String, dynamic>;
      if (data['access'] is String) await saveToken(data['access'] as String);
      if (data['refresh'] is String) await _saveRefresh(data['refresh'] as String);
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Photo de profil du membre, 28 oct. 2026 : la photo est
  /// envoyée au serveur, pour qu'elle réapparaisse à la prochaine
  /// connexion, au lieu de disparaître avec la déconnexion, quand
  /// elle n'existait que sur le téléphone. Renvoie la photo
  /// enregistrée côté serveur, en data URL, ou null si retirée.
  Future<String?> uploadMemberPhoto(String? photoDataUrl) async {
    final data = await _post('/moi/photo', {'photo': photoDataUrl});
    final photo = data['photo'];
    return photo is String ? photo : null;
  }

  /// Signature de l'administrateur, carte 96, 8 nov. 2026 : la
  /// signature est gardée côté serveur, en base, pour suivre
  /// l'administrateur sur tous ses appareils et apparaître sur
  /// l'attestation ouverte par le membre. Renvoie la signature
  /// enregistrée côté serveur, en data URL PNG, ou null.
  Future<String?> fetchSignatureAdmin() async {
    final data = await _get('/moi/signature');
    final signature = data['signature'];
    return signature is String && signature.isNotEmpty ? signature : null;
  }

  /// Enregistre ou remplace sa propre signature côté serveur.
  /// Renvoie faux si le serveur la refuse, sans jamais lever
  /// d'exception pour l'interface, la copie locale reste alors
  /// en place et la synchronisation sera retentée à l'ouverture.
  Future<bool> saveSignatureAdmin(String signatureDataUrl) async {
    try {
      await _post('/moi/signature', {'signature': signatureDataUrl});
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Supprime sa propre signature côté serveur. Renvoie faux si
  /// le serveur refuse, sans lever d'exception pour l'interface.
  Future<bool> deleteSignatureAdmin() async {
    try {
      await _delete('/moi/signature');
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Signature d'un signataire, par son matricule, pour
  /// l'affichage d'un document : le serveur ne la donne qu'à un
  /// administrateur, ou au membre à qui ce signataire a délivré
  /// une attestation. Renvoie null hors de ces cas, sans lever.
  Future<String?> fetchSignatureSignataire(String matricule) async {
    try {
      final data = await _get('/moi/signatures/$matricule');
      final signature = data['signature'];
      return signature is String && signature.isNotEmpty ? signature : null;
    } catch (_) {
      return null;
    }
  }

  /// Modification de sa propre fonction, POST /moi/fonction.
  /// La fonction est alors gardée côté serveur, comme la photo,
  /// et survit à la déconnexion. Renvoie faux si le serveur la
  /// refuse, sans jamais lever d'exception pour l'interface.
  Future<bool> updateFonction(String fonction) async {
    try {
      await _post('/moi/fonction', {'fonction': fonction});
      return true;
    } catch (_) {
      return false;
    }
  }

  Future<Map<String, dynamic>> fetchMoi() async {
    final data = await _get('/moi');
    return data as Map<String, dynamic>;
  }

  /// Favoris, surlignages et taille de texte synchronisés au compte,
  /// 31 oct. 2026, lot 1 chantier 5 sur 6. Le client envoie son
  /// ensemble (actifs et marques de suppression datées) et reçoit
  /// l'ensemble fusionné côté serveur.
  Future<Map<String, dynamic>> fetchBibleSync() async {
    final data = await _get('/moi/bible-sync');
    if (data is Map<String, dynamic>) return data;
    return const {};
  }

  Future<void> updateFuseau(String fuseau, int decalageMinutes) async {
    try {
      await _post('/moi/fuseau', {'fuseau': fuseau, 'decalage_minutes': decalageMinutes});
    } catch (_) {}
  }

  Future<Map<String, dynamic>> pushBibleSync(Map<String, dynamic> body) => _post('/moi/bible-sync', body);

  /// Sujet de prière envoyé directement par le serveur, 31 oct. 2026 :
  /// le membre n’a plus besoin de sa propre messagerie. La route ne
  /// conserve rien, ni le sujet, ni le nom, ni le contact.
  Future<Map<String, dynamic>> envoyerSujetPriere(String sujet) => _post('/prieres', {'sujet': sujet});

  /// Jauge d'objectif de don, 31 oct. 2026, lot 1 chantier 6 sur 6.
  /// Lecture publique, agrégat seulement, jamais de donateur.
  Future<Map<String, dynamic>?> getObjectifDon() async {
    final data = await _get('/objectif-don');
    if (data is Map<String, dynamic>) return data;
    return null;
  }

  Future<Map<String, dynamic>> creerObjectifDon(String libelle, int cibleFcfa) =>
      _post('/admin/objectifs-don', {'libelle': libelle, 'cible_fcfa': cibleFcfa});

  Future<Map<String, dynamic>> modifierObjectifDon(String id, String libelle, int cibleFcfa) =>
      _put('/admin/objectifs-don/$id', {'libelle': libelle, 'cible_fcfa': cibleFcfa});

  Future<void> desactiverObjectifDon(String id) async {
    await _post('/admin/objectifs-don/$id/desactiver', {});
  }

  /// Modification de sa propre date de naissance, POST
  /// /moi/date-naissance. Null pour l'effacer. Renvoie faux si le
  /// serveur refuse, sans jamais lever d'exception pour l'interface.
  Future<bool> updateDateNaissance(String? isoDate) async {
    try {
      await _post('/moi/date-naissance', {'date_naissance': isoDate});
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Annee d'adhesion modifiable par le membre lui-meme, tranche
  /// carte, 4 nov. 2026 : champ separe annee_adhesion, sans toucher
  /// a inscrit_le. Renvoie faux si le serveur refuse.
  Future<bool> updateAnneeAdhesion(int annee) async {
    try {
      await _post('/moi/annee-adhesion', {'annee_adhesion': annee});
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Pays de résidence du membre, cartes 64 et 127, 6 nov. 2026.
  /// La route /moi/pays-residence existe depuis la carte 127 :
  /// en cas d'échec, l'appel renvoie faux et le pays reste gardé
  /// en local seulement, sans jamais bloquer la modification.
  Future<bool> updatePaysResidence(String pays) async {
    try {
      await _post('/moi/pays-residence', {'pays_residence': pays});
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Numero de telephone modifiable par le membre lui-meme, tranche
  /// carte, 4 nov. 2026 : le serveur controle l'unicite, le nouveau
  /// numero devient l'identifiant de connexion. Renvoie faux si le
  /// serveur refuse, numero deja utilise ou injoignable.
  Future<bool> updateTelephone(String telephone) async {
    try {
      await _post('/moi/telephone', {'telephone': telephone});
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Mot de passe modifiable en session connectee, tranche carte,
  /// 4 nov. 2026 : mot de passe actuel verifie par hachage argon2id
  /// cote serveur, plus confirmation. Ne touche jamais au parcours
  /// de reinitialisation par courriel, ni au changement force
  /// POST /moi/mot-de-passe. Renvoie faux si le serveur refuse.
  Future<bool> changeMotDePasseConnecte(String actuel, String nouveau, String confirmation) async {
    try {
      await _post('/moi/mot-de-passe-connecte', {'mot_de_passe_actuel': actuel, 'mot_de_passe': nouveau, 'confirmation': confirmation});
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Anniversaires du jour et du mois, jour et mois seulement,
  /// jamais l'année ni l'âge. Périmètre serveur : l'admin général
  /// voit tout, l'admin d'établissement voit son établissement.
  Future<Map<String, dynamic>> fetchAdminAnniversaires() async {
    final data = await _get('/admin/anniversaires');
    return data as Map<String, dynamic>;
  }

  Future<Map<String, dynamic>> registerForEvent(String evenementId) async {
    return _post('/evenements/$evenementId/inscription', {});
  }

  /// Facture PDF d'un paiement confirmé, côté serveur (octets PDF).
  /// Le serveur refuse (409) avant confirmation : aucune facture n'est
  /// donc téléchargeable avant un paiement confirmé.
  Future<List<int>> downloadFacture(String reference) async {
    final res = await _sendWithRefresh(
      (headers) => _client
          .get(Uri.parse('$kApiBaseUrl/moi/paiements/$reference/facture'), headers: headers)
          .timeout(const Duration(seconds: 45)),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw _error(res.statusCode, res.body);
    }
    return res.bodyBytes;
  }

  /// Téléversement d'une image vers le serveur, POST /admin/fichiers?type=image.
  /// Le serveur n'accepte que JPEG, PNG et WebP, 5 Mo max, type lu dans
  /// les octets. Renvoie l'identifiant du fichier, à passer ensuite en
  /// image_id / couverture_id de la création. Réservé aux administrateurs.
  Future<String> uploadImage(String path) async {
    Future<http.StreamedResponse> send(String? token) async {
      final req = http.MultipartRequest('POST', Uri.parse('$kApiBaseUrl/admin/fichiers?type=image'));
      if (token != null) req.headers['Authorization'] = 'Bearer $token';
      req.files.add(await http.MultipartFile.fromPath('fichier', path));
      return req.send().timeout(const Duration(seconds: 60));
    }
    var res = await send(_accessToken);
    if (res.statusCode == 401 && _refreshToken != null && await refreshAccess()) {
      res = await send(_accessToken);
    }
    final body = await res.stream.bytesToString();
    if (res.statusCode < 200 || res.statusCode >= 300) throw _error(res.statusCode, body);
    final data = jsonDecode(body);
    final id = data is Map ? (data['id'] ?? '').toString() : '';
    if (id.isEmpty) throw ApiException('Le serveur n’a pas renvoyé d’identifiant pour l’image.');
    return id;
  }

  /// Téléversement d'un livre vers le serveur, POST
  /// /admin/fichiers?type=livre. Le serveur n'accepte que PDF et
  /// EPUB, 50 Mo max, type lu dans les octets. Renvoie
  /// l'identifiant du fichier, à passer ensuite en fichier_id de
  /// la création du livre. Réservé à admin_general.
  Future<String> uploadLivre({String? path, List<int>? bytes, String? filename}) async {
    Future<http.StreamedResponse> send(String? token) async {
      final req = http.MultipartRequest('POST', Uri.parse('$kApiBaseUrl/admin/fichiers?type=livre'));
      if (token != null) req.headers['Authorization'] = 'Bearer $token';
      if (path != null) {
        req.files.add(await http.MultipartFile.fromPath('fichier', path));
      } else if (bytes != null) {
        req.files.add(http.MultipartFile.fromBytes('fichier', bytes, filename: filename ?? 'livre.pdf'));
      } else {
        throw ApiException('Aucun fichier de livre choisi.');
      }
      return req.send().timeout(const Duration(seconds: 180));
    }
    var res = await send(_accessToken);
    if (res.statusCode == 401 && _refreshToken != null && await refreshAccess()) {
      res = await send(_accessToken);
    }
    final body = await res.stream.bytesToString();
    if (res.statusCode < 200 || res.statusCode >= 300) throw _error(res.statusCode, body);
    final data = jsonDecode(body);
    final id = data is Map ? (data['id'] ?? '').toString() : '';
    if (id.isEmpty) throw ApiException('Le serveur n’a pas renvoyé d’identifiant pour le livre.');
    return id;
  }

  /// Fichier d'un livre acheté, GET /livres/:id/fichier, octets
  /// PDF ou EPUB. Le serveur refuse (403) tant que l'achat n'est
  /// pas confirmé : aucun fichier n'est donc accessible avant
  /// un paiement confirmé, comme pour la facture.
  Future<List<int>> fetchLivreFile(String livreId) async {
    final res = await _sendWithRefresh(
      (headers) => _client
          .get(Uri.parse('$kApiBaseUrl/livres/$livreId/fichier'), headers: headers)
          .timeout(const Duration(seconds: 120)),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw _error(res.statusCode, res.body);
    }
    return res.bodyBytes;
  }

  /// Téléversement d'un audio vers le serveur, POST
  /// /admin/fichiers?type=audio. Le serveur n'accepte que MP3,
  /// M4A, AAC, OGG et WAV, 100 Mo max, type lu dans les octets.
  /// Renvoie l'identifiant du fichier, à passer ensuite en
  /// audio_id de la création de l'enseignement. Réservé à
  /// admin_general, comme la route des enseignements.
  Future<String> uploadAudio({String? path, List<int>? bytes, String? filename}) async {
    Future<http.StreamedResponse> send(String? token) async {
      final req = http.MultipartRequest('POST', Uri.parse('$kApiBaseUrl/admin/fichiers?type=audio'));
      if (token != null) req.headers['Authorization'] = 'Bearer $token';
      if (path != null) {
        req.files.add(await http.MultipartFile.fromPath('fichier', path));
      } else if (bytes != null) {
        req.files.add(http.MultipartFile.fromBytes('fichier', bytes, filename: filename ?? 'audio.mp3'));
      } else {
        throw ApiException('Aucun fichier audio choisi.');
      }
      return req.send().timeout(const Duration(seconds: 300));
    }
    var res = await send(_accessToken);
    if (res.statusCode == 401 && _refreshToken != null && await refreshAccess()) {
      res = await send(_accessToken);
    }
    final body = await res.stream.bytesToString();
    if (res.statusCode < 200 || res.statusCode >= 300) throw _error(res.statusCode, body);
    final data = jsonDecode(body);
    final id = data is Map ? (data['id'] ?? '').toString() : '';
    if (id.isEmpty) throw ApiException('Le serveur n’a pas renvoyé d’identifiant pour l’audio.');
    return id;
  }

  Future<String> uploadImageBytes(List<int> bytes, String filename) async {
    Future<http.StreamedResponse> send(String? token) async {
      final req = http.MultipartRequest('POST', Uri.parse('$kApiBaseUrl/admin/fichiers?type=image'));
      if (token != null) req.headers['Authorization'] = 'Bearer $token';
      req.files.add(http.MultipartFile.fromBytes('fichier', bytes, filename: filename));
      return req.send().timeout(const Duration(seconds: 60));
    }
    var res = await send(_accessToken);
    if (res.statusCode == 401 && _refreshToken != null && await refreshAccess()) {
      res = await send(_accessToken);
    }
    final body = await res.stream.bytesToString();
    if (res.statusCode < 200 || res.statusCode >= 300) throw _error(res.statusCode, body);
    final data = jsonDecode(body);
    final id = data is Map ? (data['id'] ?? '').toString() : '';
    if (id.isEmpty) throw ApiException('Le serveur n’a pas renvoyé d’identifiant pour l’image.');
    return id;
  }

  /// Publication d'un établissement côté serveur, POST /admin/etablissements.
  Future<Map<String, dynamic>> createEtablissement({required String nom, String? imageId}) async {
    return _post('/admin/etablissements', {
      'nom': nom,
      if (imageId != null && imageId.isNotEmpty) 'image_id': imageId,
    });
  }

  /// Renommage d'un etablissement, 1er nov. 2026 : PUT
  /// /admin/etablissements/:id, administrateur general seulement.
  Future<Map<String, dynamic>> updateEtablissement({required String id, required String nom}) async {
    return _put('/admin/etablissements/$id', {'nom': nom});
  }

  /// Publication d'une activité d'établissement côté serveur.
  /// POST /admin/etablissements/:id/activites, réservé aux administrateurs.
  Future<Map<String, dynamic>> createActivite({required String etablissementId, required String titre, String? imageId}) async {
    return _post('/admin/etablissements/$etablissementId/activites', {
      'titre': titre,
      if (imageId != null && imageId.isNotEmpty) 'image_id': imageId,
    });
  }

  /// Publication d'un enseignement côté serveur. Le serveur exige un
  /// compte administrateur et n'accepte qu'un audio_id (fichier déjà
  /// téléversé côté serveur), pas un simple lien audio : l'appelant
  /// doit donc expliquer un refus en ce sens, et conserver l'ajout
  /// en local. _post est privé à ce fichier, d'où ce relais public.
  Future<Map<String, dynamic>> createEnseignement({required String titre, String? orateur, String? audioId, String? lienAudio, String? description, String? thematique, String? format, String? duree, String? dateTexte}) async {
    return _post('/admin/enseignements', {
      'titre': titre,
      if (orateur != null && orateur.isNotEmpty) 'orateur': orateur,
      if (audioId != null && audioId.isNotEmpty) 'audio_id': audioId,
      if (lienAudio != null && lienAudio.isNotEmpty) 'lien_audio': lienAudio,
      if (description != null && description.isNotEmpty) 'description': description,
      if (thematique != null && thematique.isNotEmpty) 'thematique': thematique,
      if (format != null && format.isNotEmpty) 'format': format,
      if (duree != null && duree.isNotEmpty) 'duree': duree,
      if (dateTexte != null && dateTexte.isNotEmpty) 'date_texte': dateTexte,
    });
  }

  Future<void> deleteEnseignement(String id) async {
    final res = await _sendWithRefresh(
      (headers) => _client.delete(Uri.parse('$kApiBaseUrl/admin/enseignements/$id'), headers: headers).timeout(const Duration(seconds: 30)),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) throw _error(res.statusCode, res.body);
  }

  /// Publication d'un livre côté serveur, POST /admin/livres.
  /// Schéma serveur livreS (server-production/server.js) : titre et
  /// auteur requis (1 à 200 caractères), prix_fcfa entier >= 1,
  /// description et format facultatifs, publie facultatif. Le lien
  /// du fichier saisi dans l'application n'est pas transféré : le
  /// serveur attend un fichier_id (fichier téléversé) ou une
  /// couverture_id, tous deux UUID, pas un simple lien. La route
  /// est réservée au rôle admin_general (guard adminG) : un compte
  /// membre reçoit 403, et l'appelant doit alors conserver le livre
  /// en local seulement, avec un message clair, sans inventer
  /// d'identifiants administrateur. En cas de succès, le serveur
  /// renvoie la ligne créée, dont son id UUID, à enregistrer dans
  /// Book.serverId pour que la synchronisation suivante le retrouve.
  /// Publication d'un camp côté serveur, POST /admin/evenements.
  /// Schéma serveur evenementS : nom requis, type camp, lieu
  /// facultatif, tarif_fcfa entier facultatif, est_kairos facultatif,
  /// publie facultatif. Les dates structurées choisies avec le
  /// sélecteur de période sont envoyées en AAAA-MM-JJ ; sans plage
  /// choisie, seules les dates en texte libre partent, et les dates
  /// du camp s'afficheront « À confirmer » dans la grille. Le lieu,
  /// le tarif numérique et le badge Kairos, eux, sont bien transmis.
  /// Route réservée au rôle admin_general.
  Future<Map<String, dynamic>> createEvenement({
    required String nom,
    String type = 'camp',
    String? lieu,
    // Carte 109, 8 nov. 2026 : pays où se tient l'activité,
    // affiché après le lieu, « Lieu, Pays ». Facultatif.
    String? pays,
    int? tarifFcfa,
    bool estKairos = false,
    String? imageId,
    String? datesTexte,
    String? dateDebut,
    String? dateFin,
    String? description,
    // Réunion en ligne, 1er nov. 2026 : nom de salle Jitsi et
    // heure de début HH:MM, transmis tels quels au serveur.
    String? salleVisio,
    String? heureDebut,
  }) async {
    return _post('/admin/evenements', {
      'type': type,
      'nom': nom,
      if (lieu != null && lieu.isNotEmpty) 'lieu': lieu,
      if (pays != null && pays.isNotEmpty) 'pays': pays,
      if (tarifFcfa != null) 'tarif_fcfa': tarifFcfa,
      'est_kairos': estKairos,
      if (imageId != null && imageId.isNotEmpty) 'image_id': imageId,
      if (datesTexte != null && datesTexte.isNotEmpty) 'dates_texte': datesTexte,
      if (dateDebut != null && dateDebut.isNotEmpty) 'date_debut': dateDebut,
      if (dateFin != null && dateFin.isNotEmpty) 'date_fin': dateFin,
      if (description != null && description.isNotEmpty) 'description': description,
      if (salleVisio != null && salleVisio.isNotEmpty) 'salle_visio': salleVisio,
      if (heureDebut != null && heureDebut.isNotEmpty) 'heure_debut': heureDebut,
      'publie': true,
    });
  }

  /// Modification d'un camp déjà publié côté serveur, PUT
  /// /admin/evenements/:id, schéma serveur partiel. Le serveur
  /// accepte déjà cette route, c'est l'application qui ne
  /// l'utilisait pas : aucun changement serveur n'est nécessaire.
  /// Réservé au rôle admin_general. Les dates structurées ne sont
  /// envoyées que si une nouvelle plage vient d'être choisie avec
  /// le sélecteur ; sinon, seules les dates en texte libre partent
  /// et les dates structurées existantes restent inchangées.
  Future<Map<String, dynamic>> updateEvenement(
    String id, {
    String? nom,
    String? lieu,
    // Carte 109, 8 nov. 2026 : pays où se tient l'activité.
    // effacerPays envoie null, qui efface le pays côté serveur ;
    // sans lui, un pays vide est simplement omis, comme le lieu.
    String? pays,
    bool effacerPays = false,
    int? tarifFcfa,
    bool? estKairos,
    String? imageId,
    bool? publie,
    String? datesTexte,
    String? dateDebut,
    String? dateFin,
    String? description,
    // Réunion en ligne, 1er nov. 2026 : mêmes règles que les
    // autres champs, omis quand vides ou nuls (schéma partiel).
    String? salleVisio,
    String? heureDebut,
  }) async {
    // Champs vides omis, comme pour le lieu : le serveur exige au
    // moins un caractere pour la description, donc une description
    // vide envoyee telle quelle rejetait toute la modification
    // avec « Donnees invalides », meme si le reste etait bon.
    return _put('/admin/evenements/$id', {
      if (nom != null) 'nom': nom,
      if (lieu != null && lieu.isNotEmpty) 'lieu': lieu,
      if (effacerPays) 'pays': null else if (pays != null && pays.isNotEmpty) 'pays': pays,
      if (tarifFcfa != null) 'tarif_fcfa': tarifFcfa,
      if (estKairos != null) 'est_kairos': estKairos,
      if (imageId != null && imageId.isNotEmpty) 'image_id': imageId,
      if (publie != null) 'publie': publie,
      if (datesTexte != null && datesTexte.isNotEmpty) 'dates_texte': datesTexte,
      if (dateDebut != null && dateDebut.isNotEmpty) 'date_debut': dateDebut,
      if (dateFin != null && dateFin.isNotEmpty) 'date_fin': dateFin,
      if (description != null && description.isNotEmpty) 'description': description,
      if (salleVisio != null && salleVisio.isNotEmpty) 'salle_visio': salleVisio,
      if (heureDebut != null && heureDebut.isNotEmpty) 'heure_debut': heureDebut,
    });
  }

  /// Publication d'une actualité côté serveur, POST /admin/actualites.
  /// Titre et texte requis, etablissement_id facultatif, null pour
  /// une actualité générale. Route réservée aux administrateurs
  /// (admin_general et admin_etablissement, ce dernier seulement
  /// pour son établissement).
  Future<Map<String, dynamic>> createActualite({
    required String titre,
    required String texte,
    String? etablissementId,
    String? imageId,
    DateTime? programmeeLe,
  }) async {
    return _post('/admin/actualites', {
      'titre': titre,
      'texte': texte,
      if (etablissementId != null && etablissementId.isNotEmpty) 'etablissement_id': etablissementId,
      if (imageId != null && imageId.isNotEmpty) 'image_id': imageId,
      if (programmeeLe != null) 'programmee_le': programmeeLe.toIso8601String(),
    });
  }

  Future<Map<String, dynamic>> createLivre({
    required String titre,
    required String auteur,
    required int prixFcfa,
    String? description,
    String? format,
    String? couvertureId,
    String? fichierId,
  }) async {
    return _post('/admin/livres', {
      'titre': titre,
      'auteur': auteur,
      'prix_fcfa': prixFcfa,
      if (description != null && description.isNotEmpty) 'description': description,
      if (format != null && format.isNotEmpty) 'format': format,
      if (couvertureId != null && couvertureId.isNotEmpty) 'couverture_id': couvertureId,
      if (fichierId != null && fichierId.isNotEmpty) 'fichier_id': fichierId,
      'publie': true,
    });
  }

  Future<Map<String, dynamic>> _put(String path, Map<String, dynamic> body) async {
    final res = await _sendWithRefresh(
      (headers) => _client
          .put(Uri.parse('$kApiBaseUrl$path'), headers: headers, body: jsonEncode(body))
          .timeout(const Duration(seconds: 30)),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw _error(res.statusCode, res.body);
    }
    final data = jsonDecode(res.body);
    if (data is Map<String, dynamic>) return data;
    return {'data': data};
  }

  /// Modification d'un livre déjà publié côté serveur, PUT
  /// /admin/livres/:id, schéma serveur partiel (livreS.partial()).
  /// Ne change ni les achats déjà payés ni leurs factures, qui sont
  /// des copies d'origine côté serveur. Réservé à admin_general.
  Future<Map<String, dynamic>> updateLivre(
    String id, {
    String? titre,
    String? auteur,
    int? prixFcfa,
    String? description,
    String? format,
    String? couvertureId,
    String? fichierId,
    bool? publie,
  }) async {
    return _put('/admin/livres/$id', {
      if (titre != null) 'titre': titre,
      if (auteur != null) 'auteur': auteur,
      if (prixFcfa != null) 'prix_fcfa': prixFcfa,
      if (description != null) 'description': description,
      if (format != null) 'format': format,
      if (couvertureId != null && couvertureId.isNotEmpty) 'couverture_id': couvertureId,
      if (fichierId != null && fichierId.isNotEmpty) 'fichier_id': fichierId,
      if (publie != null) 'publie': publie,
    });
  }

  Future<Map<String, dynamic>> updateEnseignement(
    String id, {
    String? titre,
    String? orateur,
    String? audioId,
    String? lienAudio,
    String? description,
    String? thematique,
    String? format,
    String? duree,
    String? dateTexte,
  }) async {
    return _put('/admin/enseignements/$id', {
      if (titre != null) 'titre': titre,
      if (orateur != null && orateur.isNotEmpty) 'orateur': orateur,
      if (audioId != null && audioId.isNotEmpty) 'audio_id': audioId,
      if (lienAudio != null && lienAudio.isNotEmpty) 'lien_audio': lienAudio,
      if (description != null && description.isNotEmpty) 'description': description,
      if (thematique != null && thematique.isNotEmpty) 'thematique': thematique,
      if (format != null && format.isNotEmpty) 'format': format,
      if (duree != null && duree.isNotEmpty) 'duree': duree,
      if (dateTexte != null && dateTexte.isNotEmpty) 'date_texte': dateTexte,
    });
  }

  Future<void> deleteActualite(String id) async {
    final res = await _sendWithRefresh(
      (headers) => _client.delete(Uri.parse('$kApiBaseUrl/admin/actualites/$id'), headers: headers).timeout(const Duration(seconds: 30)),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) throw _error(res.statusCode, res.body);
  }

  /// Modification d'une actualite deja publiee, PUT /admin/actualites/:id.
  /// Reservee au compte administrateur general, comme sa suppression.
  /// Une date future programme, annulerProgrammation remet la
  /// publication immediate (nul explicite cote serveur).
  Future<void> updateActualite(String id, {String? titre, String? texte, String? imageId, DateTime? programmeeLe, bool annulerProgrammation = false}) async {
    await _put('/admin/actualites/$id', {
      if (titre != null) 'titre': titre,
      if (texte != null) 'texte': texte,
      if (imageId != null && imageId.isNotEmpty) 'image_id': imageId,
      if (annulerProgrammation) 'programmee_le': null else if (programmeeLe != null) 'programmee_le': programmeeLe.toIso8601String(),
    });
  }

  Future<Map<String, dynamic>> createDon(int montantFcfa) async {
    return _post('/paiements/don', {'montant_fcfa': montantFcfa});
  }

  // Cotisation et carte, 28 oct. 2026 : mêmes règles que le don,
  // mais avec un type distinct côté serveur, pour que
  // l'administrateur voie exactement ce que le membre a payé.
  Future<Map<String, dynamic>> createCotisation(int montantFcfa) async {
    return _post('/paiements/cotisation', {'montant_fcfa': montantFcfa});
  }

  Future<Map<String, dynamic>> createCarte(int montantFcfa) async {
    return _post('/paiements/carte', {'montant_fcfa': montantFcfa});
  }

  // Abonnement Plateforme, carte 83, 7 nov. 2026 : 100 000 FCFA
  // par an, montant fixe côté serveur, comme la carte. La
  // demande reste en attente tant que la structure ne l'a pas
  // validée après contrôle de son compte Wave.
  Future<Map<String, dynamic>> createAbonnementPlateforme(int montantFcfa) async {
    return _post('/paiements/plateforme', {'montant_fcfa': montantFcfa});
  }

  // Enseignements Plateforme, carte 83 : envoi pour validation,
  // liste de l'auteur, et lecture des enseignements en attente
  // par la structure. Tant que le serveur n'a pas ces routes,
  // l'appel échoue et l'application garde tout en local.
  Future<Map<String, dynamic>> createEnseignementPlateforme(Map<String, dynamic> corps) async {
    return _post('/plateforme/enseignements', corps);
  }

  Future<List<Map<String, dynamic>>> fetchMesEnseignementsPlateforme() => _list('/plateforme/mes-enseignements');

  Future<Map<String, dynamic>> fetchAbonnementPlateforme() async {
    final data = await _get('/plateforme/abonnement');
    return data is Map<String, dynamic> ? data : <String, dynamic>{};
  }

  // Versement d'un camp, 31 oct. 2026 : le serveur calcule le
  // numéro et le montant exact du versement suivant, jamais
  // l'application. Une demande en attente pour ce versement est
  // renvoyée telle quelle, sans doublon.
  Future<Map<String, dynamic>> createVersementCamp(String evenementId) {
    return _post('/paiements/camp', {'evenement_id': evenementId});
  }

  // Paiement du camp en une fois, 31 oct. 2026 : le solde complet
  // en une seule demande, sans numéro de versement. Une demande
  // en attente pour le solde est renvoyée telle quelle.
  Future<Map<String, dynamic>> createPaiementTotalCamp(String evenementId) {
    return _post('/paiements/camp/total', {'evenement_id': evenementId});
  }

  // Don de camp ou de retraite, 31 oct. 2026 : le serveur résout
  // le bénéficiaire par son numéro ou son e-mail, sans jamais
  // renvoyer ses données. La réponse dit seulement si le don est
  // attaché tout de suite ou en attente.
  Future<Map<String, dynamic>> createDonCamp(String evenementId, String nom, String contact, String message) {
    return _post('/dons/camp', {'evenement_id': evenementId, 'beneficiaire_nom': nom, 'beneficiaire_contact': contact, 'message': message});
  }

  // Inscriptions du membre connecté, avec la progression des
  // versements pour les camps payants : tarif, montant payé,
  // versements validés, pass visible ou non, versement en attente.
  Future<List<Map<String, dynamic>>> fetchMesInscriptions() => _list('/moi/inscriptions');

  // Paiements du membre connecté, pour la synchronisation au
  // chargement : statut serveur confirmé, en attente ou refusé,
  // avec les lignes d'achat, titres et prix des livres.
  Future<List<Map<String, dynamic>>> fetchMyPayments() => _list('/moi/paiements');

  // Tous les paiements des membres, périmètre serveur : en attente,
  // confirmés ou refusés, avec filtres type, établissement et période.
  Future<List<Map<String, dynamic>>> fetchAdminPayments({String? statut, String? matricule, String? type, String? etablissementId, String? debut, String? fin}) {
    final params = <String>[];
    if (statut != null) params.add('statut=$statut');
    if (matricule != null && matricule.isNotEmpty) params.add('matricule=${Uri.encodeComponent(matricule)}');
    if (type != null) params.add('type=$type');
    if (etablissementId != null) params.add('etablissement_id=$etablissementId');
    if (debut != null) params.add('debut=$debut');
    if (fin != null) params.add('fin=$fin');
    return _list(params.isEmpty ? '/admin/paiements' : '/admin/paiements?${params.join('&')}');
  }

  // Totaux des paiements du périmètre, mêmes filtres que la liste,
  // sans le statut pour garder la ventilation par statut.
  Future<Map<String, dynamic>> fetchAdminPaymentsTotaux({String? type, String? statut, String? matricule, String? etablissementId, String? debut, String? fin}) async {
    final params = <String>[];
    if (type != null) params.add('type=$type');
    if (statut != null) params.add('statut=$statut');
    if (matricule != null && matricule.isNotEmpty) params.add('matricule=${Uri.encodeComponent(matricule)}');
    if (etablissementId != null) params.add('etablissement_id=$etablissementId');
    if (debut != null) params.add('debut=$debut');
    if (fin != null) params.add('fin=$fin');
    final data = await _get(params.isEmpty ? '/admin/paiements/totaux' : '/admin/paiements/totaux?${params.join('&')}');
    return data as Map<String, dynamic>;
  }

  /// Signal de presence, appele a chaque synchronisation reussie.
  /// Sans corps : le serveur horodate le membre a partir du jeton.
  Future<void> heartbeat() async {
    await _post('/moi/activite', {});
  }

  /// Membres en ligne, reserve a l'administrateur general.
  Future<List<Map<String, dynamic>>> fetchOnlineMembers() => _list('/admin/en-ligne');

  /// Envoi d'un rapport de bug, POST /rapports-bug, membre ou admin.
  /// Le corps est déjà nettoyé par BugReports avant l'envoi.
  Future<Map<String, dynamic>> sendBugReport(Map<String, dynamic> body) => _post('/rapports-bug', body);

  // Présences, phase 1, 29 oct. 2026 : le périmètre est contrôlé par le
  // serveur, jamais ici. Les routes renvoient une erreur lisible en cas
  // de doublon ou de refus de périmètre, affichée telle quelle.
  Future<Map<String, dynamic>> scanPresence({required String activiteId, required String matricule}) =>
      _post('/presences/scan', {'activite_id': activiteId, 'matricule': matricule});
  Future<Map<String, dynamic>> addPresenceManuel({required String activiteId, required String membreId}) =>
      _post('/presences/manuel', {'activite_id': activiteId, 'membre_id': membreId});
  Future<Map<String, dynamic>> fetchPresencesActivite(String activiteId) async {
    final data = await _get('/presences/activite/$activiteId');
    if (data is Map<String, dynamic>) return data;
    return {'activite': <String, dynamic>{}, 'entrees': <dynamic>[]};
  }

  // Taux de présence par camp, lot 1, 31 oct. 2026 : calcul côté
  // serveur, dans le périmètre de l'appelant, comme la liste.
  Future<Map<String, dynamic>> fetchTauxPresence(String activiteId) async {
    final data = await _get('/presences/activite/$activiteId/taux');
    if (data is Map<String, dynamic>) return data;
    return {'inscrits': 0, 'presents': 0, 'taux': null};
  }

  // Présence du membre connecté sur un camp, lot 1, 31 oct. 2026 :
  // ne renvoie que sa propre ligne, jamais celle d'un autre membre.
  Future<Map<String, dynamic>> fetchMaPresence(String activiteId) async {
    final data = await _get('/moi/presences/$activiteId');
    if (data is Map<String, dynamic>) return data;
    return {'statut': null};
  }

  // Défi quiz hebdomadaire entre établissements, 31 oct. 2026 :
  // envoi de la participation (une seule comptée par semaine, le
  // serveur renvoie la participation existante sinon), lecture de la
  // participation de la semaine en cours, classement de la semaine.
  Future<Map<String, dynamic>> submitDefiParticipation(int score, int total) => _post('/defi/participer', {'score': score, 'total': total});

  Future<Map<String, dynamic>> fetchDefiMoi() async {
    final data = await _get('/defi/moi');
    if (data is Map<String, dynamic>) return data;
    return {'semaine': '', 'participation': null};
  }

  Future<Map<String, dynamic>> fetchDefiClassement() async {
    final data = await _get('/defi/classement');
    if (data is Map<String, dynamic>) return data;
    return {'semaine': '', 'classement': <dynamic>[], 'membre': <String, dynamic>{}};
  }

  // Élections, carte 76, 7 nov. 2026 : visible seulement pendant
  // la période décidée par la structure. Hors période, le serveur
  // renvoie { election: null } : aucune tuile, aucun menu, aucune
  // trace. Pendant le vote, aucun résultat n'est renvoyé, ni total,
  // ni voix par candidat. Un vote par membre, imposé côté serveur.
  Future<Map<String, dynamic>> fetchElectionActuelle() async {
    final data = await _get('/elections/actuelle');
    if (data is Map<String, dynamic>) return data;
    return {'election': null};
  }

  Future<Map<String, dynamic>> voterElection(String electionId, String candidatId) =>
      _post('/elections/$electionId/voter', {'candidat_id': candidatId});

  Future<Map<String, dynamic>> fetchResultatsElection(String electionId) async {
    final data = await _get('/elections/$electionId/resultats');
    if (data is Map<String, dynamic>) return data;
    return {'election': <String, dynamic>{}, 'total_voix': 0, 'resultats': <dynamic>[]};
  }

  Future<List<Map<String, dynamic>>> fetchElectionsAdmin() => _list('/admin/elections');

  Future<Map<String, dynamic>> fetchElectionAdmin(String id) async {
    final data = await _get('/admin/elections/$id');
    if (data is Map<String, dynamic>) return data;
    return {'candidats': <dynamic>[], 'total_voix': 0};
  }

  /// Création par l'administrateur général : les candidats sont
  /// désignés par matricule, résolus côté serveur. Les dates sont
  /// envoyées en UTC, avec décalage, comme le serveur l'exige.
  Future<Map<String, dynamic>> creerElection(
          {required String titre,
          String? description,
          String? poste,
          required DateTime debut,
          required DateTime fin,
          required List<String> matricules}) =>
      _post('/admin/elections', {
        'titre': titre,
        if (description != null && description.isNotEmpty) 'description': description,
        if (poste != null && poste.isNotEmpty) 'poste': poste,
        'date_debut': debut.toUtc().toIso8601String(),
        'date_fin': fin.toUtc().toIso8601String(),
        'candidats': matricules.map((m) => {'matricule': m}).toList(),
      });

  Future<Map<String, dynamic>> ajouterCandidatElection(String electionId, String matricule) =>
      _post('/admin/elections/$electionId/candidats', {'matricule': matricule});

  Future<Map<String, dynamic>> modifierElection(String electionId, Map<String, dynamic> corps) =>
      _put('/admin/elections/$electionId', corps);

  Future<Map<String, dynamic>> annulerPresence(String presenceId) => _post('/presences/$presenceId/annuler', {});
  Future<List<Map<String, dynamic>>> fetchPresences() => _list('/presences');

  // Espace parent, 8 nov. 2026 : lien parent-enfant (demande puis
  // validation par un responsable), tableau de bord « Mes enfants »
  // et clôture d'activité. Le serveur ne renvoie jamais à un parent
  // que ses propres enfants liés et validés.
  Future<Map<String, dynamic>> demanderLienParentEnfant(String enfantMembreId) =>
      _post('/moi/liens-parent-enfant', {'enfant_membre_id': enfantMembreId});
  Future<List<Map<String, dynamic>>> fetchMesLiensParentEnfant() => _list('/moi/liens-parent-enfant');
  Future<Map<String, dynamic>> retirerLienParentEnfant(String id) => _delete('/moi/liens-parent-enfant/$id');
  Future<Map<String, dynamic>> chercherMembreParMatricule(String matricule) async {
    final data = await _get('/moi/membres/par-matricule/${Uri.encodeComponent(matricule.trim().toUpperCase())}');
    if (data is Map<String, dynamic>) return data;
    throw ApiException('Matricule introuvable.');
  }

  Future<List<Map<String, dynamic>>> fetchLiensParentEnfantAdmin({String? statut}) {
    final query = statut == null || statut.isEmpty ? '' : '?statut=${Uri.encodeQueryComponent(statut)}';
    return _list('/admin/liens-parent-enfant$query');
  }

  Future<Map<String, dynamic>> validerLienParentEnfant(String id) => _post('/admin/liens-parent-enfant/$id/valider', {});
  Future<Map<String, dynamic>> rejeterLienParentEnfant(String id) => _post('/admin/liens-parent-enfant/$id/rejeter', {});
  Future<List<Map<String, dynamic>>> fetchMesEnfants() => _list('/moi/enfants');
  Future<Map<String, dynamic>> cloturerActivite(String activiteId) => _post('/presences/activite/$activiteId/cloturer', {});
  Future<List<Map<String, dynamic>>> fetchAdminMembres({bool inclureSansEtablissement = false, String? etablissementId, bool details = false}) {
    final params = <String, String>{};
    if (inclureSansEtablissement) params['inclure_sans_etablissement'] = '1';
    if (etablissementId != null && etablissementId.isNotEmpty) params['etablissement_id'] = etablissementId;
    if (details) params['details'] = '1';
    final query = params.isEmpty ? '' : '?${params.entries.map((e) => '${e.key}=${Uri.encodeQueryComponent(e.value)}').join('&')}';
    return _list('/admin/membres$query');
  }

  /// Carte d'un membre pour l'administration, 30 oct. 2026 : lecture
  /// seule, photo, validité et contact compris, périmètre contrôlé
  /// par le serveur.
    Future<Map<String, dynamic>> importMembres(List<Map<String, dynamic>> lignes) =>
      _post('/admin/membres/import', {'lignes': lignes});

  /// Carte 74, 7 nov. 2026 : dernière vérification avant
  /// publication. Analyse sans création : le serveur valide
  /// chaque ligne (format, établissement, fonction, périmètre,
  /// doublons base et fichier) et renvoie le statut ligne par
  /// ligne. Rien n'est créé ici, la publication repasse par
  /// importMembres, qui revalide tout côté serveur.
  Future<Map<String, dynamic>> analyserMembresImport(List<Map<String, dynamic>> lignes) =>
      _post('/admin/membres/analyser', {'lignes': lignes});

  Future<List<Map<String, dynamic>>> fetchAdminInscriptions(String evenementId) =>
      _list('/admin/inscriptions?evenement_id=$evenementId');

  /// Suivi des versements de camp, 2 nov. 2026, tranche 2 des 7
  /// propositions validées : lecture seule pour l'administration,
  /// jamais un paiement ni un rappel nouveau. Le périmètre est
  /// contrôlé côté serveur, comme pour les inscriptions.
  Future<Map<String, dynamic>> fetchSuiviVersements(String evenementId) async {
    final data = await _get('/admin/suivi-versements?evenement_id=${Uri.encodeQueryComponent(evenementId)}');
    if (data is Map<String, dynamic>) return data;
    return {'camp': <String, dynamic>{}, 'totaux': <String, dynamic>{}, 'membres': <dynamic>[]};
  }

  /// Attestations, 2 nov. 2026, tranche 3 des 7 propositions
  /// validées : délivrance par l'administration seulement. Carte
  /// 120, 9 nov. 2026 : l'attestation est un vrai PDF du serveur,
  /// à télécharger, jamais une page HTML. Aucune méthode membre
  /// d'écriture n'existe ici, un membre ne lit que ses propres
  /// attestations.
  Future<List<Map<String, dynamic>>> fetchAttestations({String? type, String? etablissementId}) {
    final params = <String, String>{};
    if (type != null && type.isNotEmpty) params['type'] = type;
    if (etablissementId != null && etablissementId.isNotEmpty) params['etablissement_id'] = etablissementId;
    final query = params.isEmpty ? '' : '?${params.entries.map((e) => '${e.key}=${Uri.encodeQueryComponent(e.value)}').join('&')}';
    return _list('/admin/attestations$query');
  }

  Future<Map<String, dynamic>> createAttestation(Map<String, dynamic> corps) => _post('/admin/attestations', corps);

  /// Carte 106, 9 nov. 2026 : annulation non destructive d'une
  /// attestation. La ligne reste consultable, marquée annulée,
  /// jamais supprimée. Le serveur renvoie la ligne mise à jour,
  /// 409 si elle est déjà annulée. Le périmètre est contrôlé
  /// côté serveur, comme pour la délivrance.
  Future<Map<String, dynamic>> annulerAttestation(String id) => _post('/admin/attestations/$id/annuler', {});

  /// Carte 120, 9 nov. 2026 : téléchargement du vrai PDF de
  /// l'attestation, généré par le serveur à l'ouverture. Le
  /// serveur répond 404 si elle est introuvable, 403 hors
  /// périmètre. Le PDF porte la mention d'annulation quand
  /// l'attestation est annulée, la signature du signataire et le
  /// QR de vérification.
  Future<Uint8List> fetchAttestationPdf(String id, {bool membre = false}) async {
    final chemin = membre ? '/moi/attestations/$id/pdf' : '/admin/attestations/$id/pdf';
    final res = await _sendWithRefresh(
      (headers) => _client.get(Uri.parse('$kApiBaseUrl$chemin'), headers: headers).timeout(const Duration(seconds: 45)),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) throw _error(res.statusCode, res.body);
    return res.bodyBytes;
  }

  /// Carte 121, 10 nov. 2026 : le membre ou la structure
  /// reçoit l'attestation par mail, au lieu de la télécharger.
  /// Le PDF envoyé est le même, avec sa mention d'annulation,
  /// sa signature et son QR. Le serveur répond 503 quand
  /// l'envoi est impossible, 409 sans adresse e-mail.
  Future<void> envoyerAttestationParMail(String id, {bool membre = false}) async {
    final chemin = membre
        ? '/moi/attestations/$id/envoyer'
        : '/admin/attestations/$id/envoyer';
    await _post(chemin, {});
  }

  /// Carte 120, 9 nov. 2026 : signature de l'attestation dans
  /// l'application, comme dans Adobe Reader. La signature est
  /// dessinée dans l'application, ou réutilisée depuis la
  /// signature déjà enregistrée par Ma signature. Le serveur
  /// renvoie la ligne mise à jour, 409 si elle est déjà annulée
  /// ou sans signature enregistrée. Le périmètre est contrôlé
  /// côté serveur, comme pour l'annulation.
  Future<Map<String, dynamic>> signerAttestation(String id, {String? signature, bool utiliserSignatureEnregistree = false}) =>
      _post('/admin/attestations/$id/signer', {'signature': signature, 'utiliser_signature_enregistree': utiliserSignatureEnregistree});

  /// Carte 120, 9 nov. 2026 : suppression définitive d'une
  /// attestation. Contrairement à l'annulation, la ligne
  /// disparaît, sans régénération ni archive. Le serveur renvoie
  /// {supprime: true, reference}, 404 si elle est introuvable,
  /// 403 hors périmètre. Le périmètre est contrôlé côté serveur,
  /// comme pour l'annulation.
  Future<Map<String, dynamic>> supprimerAttestation(String id) => _delete('/admin/attestations/$id');

  Future<List<Map<String, dynamic>>> fetchMesAttestations() => _list('/moi/attestations');

  /// Planning des responsables, 2 nov. 2026, tranche 4 des 7
  /// propositions validées : lecture et écriture pour
  /// l'administration seulement, périmètre contrôlé côté serveur.
  /// Les conflits sont calculés par le serveur et joints à chaque
  /// ligne, jamais un blocage côté client.
  Future<List<Map<String, dynamic>>> fetchPlannings({String? mois, String? etablissementId, String? membreId}) {
    final params = <String, String>{};
    if (mois != null && mois.isNotEmpty) params['mois'] = mois;
    if (etablissementId != null && etablissementId.isNotEmpty) params['etablissement_id'] = etablissementId;
    if (membreId != null && membreId.isNotEmpty) params['membre_id'] = membreId;
    final query = params.isEmpty ? '' : '?${params.entries.map((e) => '${e.key}=${Uri.encodeQueryComponent(e.value)}').join('&')}';
    return _list('/admin/plannings$query');
  }

  Future<Map<String, dynamic>> createPlanning(Map<String, dynamic> corps) => _post('/admin/plannings', corps);

  Future<Map<String, dynamic>> updatePlanning(String id, Map<String, dynamic> corps) => _put('/admin/plannings/$id', corps);


  /// Suivi des nouveaux membres, 2 nov. 2026, tranche 5 des 7
  /// propositions validées : lecture et notation d'un contact pour
  /// l'administration seulement, périmètre contrôlé côté serveur.
  /// Le statut est calculé par le serveur, jamais par le client.
  Future<List<Map<String, dynamic>>> fetchNouveauxMembres({String? statut, String? etablissementId}) {
    final params = <String, String>{};
    if (statut != null && statut.isNotEmpty) params['statut'] = statut;
    if (etablissementId != null && etablissementId.isNotEmpty) params['etablissement_id'] = etablissementId;
    final query = params.isEmpty ? '' : '?${params.entries.map((e) => '${e.key}=${Uri.encodeQueryComponent(e.value)}').join('&')}';
    return _list('/admin/nouveaux-membres$query');
  }

  Future<Map<String, dynamic>> noterContactMembre(String membreId, Map<String, dynamic> corps) => _post('/admin/nouveaux-membres/$membreId/contacts', corps);

  /// Liste d'attente de camp, 2 nov. 2026, tranche 6 des 7
  /// propositions validées : capacité fixée par l'administration,
  /// file d'attente dans l'ordre d'arrivée. Proposer une place ne
  /// crée ni inscription ni paiement, le serveur seul contrôle
  /// la capacité, le complet et les doublons.
  Future<Map<String, dynamic>> fetchListeAttente(String evenementId) async {
    final data = await _get('/admin/liste-attente?evenement_id=${Uri.encodeQueryComponent(evenementId)}');
    if (data is Map<String, dynamic>) return data;
    return {'camp': <String, dynamic>{}, 'attente': <dynamic>[]};
  }

  Future<Map<String, dynamic>> fixerCapaciteCamp(String evenementId, int? nombrePlaces) => _put('/admin/evenements/$evenementId/capacite', {'nombre_places': nombrePlaces});

  Future<Map<String, dynamic>> proposerPlaceAttente(String demandeId) => _post('/admin/liste-attente/$demandeId/proposer', {});

  Future<Map<String, dynamic>> rejoindreListeAttente(String evenementId) => _post('/moi/evenements/$evenementId/liste-attente', {});

  /// Inventaire du matériel, 2 nov. 2026, tranche 7 des 7
  /// propositions validées : lecture et écriture pour
  /// l'administration seulement, périmètre contrôlé côté serveur.
  /// Aucune valeur financière dans cette tranche, aucune route de
  /// suppression en première version.
  Future<List<Map<String, dynamic>>> fetchMateriels({String? etat, String? etablissementId}) {
    final params = <String, String>{};
    if (etat != null && etat.isNotEmpty) params['etat'] = etat;
    if (etablissementId != null && etablissementId.isNotEmpty) params['etablissement_id'] = etablissementId;
    final query = params.isEmpty ? '' : '?${params.entries.map((e) => '${e.key}=${Uri.encodeQueryComponent(e.value)}').join('&')}';
    return _list('/admin/materiels$query');
  }

  Future<Map<String, dynamic>> createMateriel(Map<String, dynamic> corps) => _post('/admin/materiels', corps);

  Future<Map<String, dynamic>> updateMateriel(String id, Map<String, dynamic> corps) => _put('/admin/materiels/$id', corps);

Future<Map<String, dynamic>> fetchAdminMembreDetail(String membreId) async {
    final data = await _get('/admin/membres/$membreId');
    if (data is Map<String, dynamic>) return data;
    return {'id': membreId};
  }

  /// Correction du nom d'un membre, carte 108, 8 nov. 2026 :
  /// administrateur général partout, administrateur
  /// d'établissement seulement pour les membres de son
  /// établissement, périmètre contrôlé côté serveur. Le
  /// matricule n'est jamais recalculé. La date et
  /// l'établissement acceptent null pour effacer.
  Future<Map<String, dynamic>> corrigerMembre(String membreId, {required String nomComplet, String? dateNaissance, String? etablissementId}) => _put('/admin/membres/$membreId', {
        'nom_complet': nomComplet,
        'date_naissance': dateNaissance,
        'etablissement_id': etablissementId,
      });

  /// Certificats d'adhésion, carte 110, 8 nov. 2026 : validation
  /// de l'adhésion par le Bureau, qui émet le certificat PDF et
  /// l'envoie par e-mail au membre. Suspension, avec motif, qui
  /// révoque le certificat actif. Périmètre contrôlé côté
  /// serveur, général partout, établissement seulement pour ses
  /// membres.
  Future<Map<String, dynamic>> validerAdhesion(String membreId) =>
      _post('/admin/membres/$membreId/valider-adhesion', {});

  Future<Map<String, dynamic>> suspendreAdhesion(String membreId, String motif) =>
      _post('/admin/membres/$membreId/suspendre-adhesion', {'motif': motif});

  /// Téléchargement du certificat d'adhésion par le membre :
  /// le PDF archivé côté serveur, jamais régénéré. Si
  /// l'adhésion n'est pas validée, le serveur répond 403 avec
  /// le message en français, affiché tel quel par l'interface.
  Future<Uint8List> telechargerCertificatAdhesion() async {
    final res = await _sendWithRefresh(
      (headers) => _client.get(Uri.parse('$kApiBaseUrl/moi/certificat-adhesion'), headers: headers).timeout(const Duration(seconds: 45)),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) throw _error(res.statusCode, res.body);
    return res.bodyBytes;
  }

  /// Carte 121, 10 nov. 2026 : le membre reçoit son certificat
  /// par mail, au lieu de le télécharger. Même émission de
  /// rattrapage que le téléchargement pour un membre validé
  /// avant cette version. Le serveur répond 409 sans adresse
  /// e-mail sur le compte, 503 quand l'envoi est impossible.
  Future<void> envoyerCertificatAdhesionParMail() async {
    await _post('/moi/certificat-adhesion/envoyer', {});
  }

  Future<List<Map<String, dynamic>>> fetchAudit() => _list('/admin/audit');

  /// Rapports journaliers d'activité, 2 nov. 2026, tranche 1 :
  /// liste par mois et par établissement, création, modification et
  /// validation. Le périmètre est contrôlé côté serveur : un
  /// administrateur d'établissement ne voit que son établissement.
  /// Un nombre de participants absent (null) laisse le serveur
  /// compter les présences scannées de l'activité liée.
  Future<List<Map<String, dynamic>>> fetchRapportsActivite({String? mois, String? etablissementId}) {
    final params = <String, String>{};
    if (mois != null && mois.isNotEmpty) params['mois'] = mois;
    if (etablissementId != null && etablissementId.isNotEmpty) params['etablissement_id'] = etablissementId;
    final query = params.isEmpty ? '' : '?${params.entries.map((e) => '${e.key}=${Uri.encodeQueryComponent(e.value)}').join('&')}';
    return _list('/admin/rapports-activite$query');
  }

  Future<Map<String, dynamic>> createRapportActivite(Map<String, dynamic> corps) => _post('/admin/rapports-activite', corps);

  Future<Map<String, dynamic>> updateRapportActivite(String id, Map<String, dynamic> corps) async {
    final data = await _sendWithRefresh(
      (headers) => _client
          .put(Uri.parse('$kApiBaseUrl/admin/rapports-activite/$id'), headers: headers, body: jsonEncode(corps))
          .timeout(const Duration(seconds: 30)),
    );
    if (data.statusCode < 200 || data.statusCode >= 300) {
      throw _error(data.statusCode, data.body);
    }
    final decoded = jsonDecode(data.body);
    if (decoded is Map<String, dynamic>) return decoded;
    return {'data': decoded};
  }

  Future<Map<String, dynamic>> validerRapportActivite(String id) => _post('/admin/rapports-activite/$id/valider', {});

  /// Comptabilité mensuelle, 2 nov. 2026, tranche 1 des 7
  /// propositions validées : synthèse pour la trésorerie, par
  /// mois et par établissement, avec totaux officiels, brouillons
  /// à part, et lignes de détail. Le périmètre est contrôlé côté
  /// serveur : un administrateur d'établissement ne voit que son
  /// établissement, jamais un autre, jamais tous.
  Future<Map<String, dynamic>> fetchComptabilite({String? mois, String? etablissementId}) async {
    final params = <String, String>{};
    if (mois != null && mois.isNotEmpty) params['mois'] = mois;
    if (etablissementId != null && etablissementId.isNotEmpty) params['etablissement_id'] = etablissementId;
    final query = params.isEmpty ? '' : '?${params.entries.map((e) => '${e.key}=${Uri.encodeQueryComponent(e.value)}').join('&')}';
    final data = await _get('/admin/comptabilite$query');
    if (data is Map<String, dynamic>) return data;
    return {'mois': mois ?? '', 'totaux': <String, dynamic>{}, 'par_categorie': <String, dynamic>{}, 'lignes': <dynamic>[], 'brouillon_lignes': <dynamic>[]};
  }

  /// Département scolaire, 2 nov. 2026, tranche 2 :
  /// moyennes par trimestre, saisies par les responsables
  /// seulement. Le périmètre est contrôlé côté serveur : un
  /// administrateur d'établissement ne voit que son établissement,
  /// et un membre ne voit que ses propres moyennes, par la route
  /// /moi dédiée. Aucune méthode membre d'écriture n'existe ici.
  Future<List<Map<String, dynamic>>> fetchSuivisScolaires({String? etablissementId, String? anneeScolaire, bool bureauSeulement = false}) {
    final params = <String, String>{};
    if (etablissementId != null && etablissementId.isNotEmpty) params['etablissement_id'] = etablissementId;
    if (anneeScolaire != null && anneeScolaire.isNotEmpty) params['annee_scolaire'] = anneeScolaire;
    if (bureauSeulement) params['bureau'] = '1';
    final query = params.isEmpty ? '' : '?${params.entries.map((e) => '${e.key}=${Uri.encodeQueryComponent(e.value)}').join('&')}';
    return _list('/admin/suivis-scolaires$query');
  }

  Future<Map<String, dynamic>> createSuiviScolaire(Map<String, dynamic> corps) => _post('/admin/suivis-scolaires', corps);

  Future<Map<String, dynamic>> updateSuiviScolaire(String id, Map<String, dynamic> corps) async {
    final data = await _sendWithRefresh(
      (headers) => _client
          .put(Uri.parse('$kApiBaseUrl/admin/suivis-scolaires/$id'), headers: headers, body: jsonEncode(corps))
          .timeout(const Duration(seconds: 30)),
    );
    if (data.statusCode < 200 || data.statusCode >= 300) {
      throw _error(data.statusCode, data.body);
    }
    final decoded = jsonDecode(data.body);
    if (decoded is Map<String, dynamic>) return decoded;
    return {'data': decoded};
  }

  Future<List<Map<String, dynamic>>> fetchMesSuivisScolaires() => _list('/moi/suivis-scolaires');
  // Carte 126 tranche 6, 11 nov. 2026 : nominations actives du
  // membre, pour la rubrique « Mes responsabilités ».
  Future<List<Map<String, dynamic>>> fetchMesNominations() => _list('/moi/nominations');


  /// Mot de passe temporaire, 29 oct. 2026 : généré par
  /// l'administrateur général seul, affiché une seule fois côté
  /// application, jamais stocké sur l'appareil. Le serveur renvoie
  /// le temporaire en clair une seule fois, par TLS, et ne garde
  /// que son empreinte.
  Future<Map<String, dynamic>> generateTempPassword(String membreId) async {
    return _post('/admin/membres/$membreId/mot-de-passe-temporaire', {});
  }

  /// Suppression définitive de compte, 31 oct. 2026 : administrateur
  /// général seulement, côté serveur (gardes : jamais son propre
  /// compte, jamais le dernier administrateur général).
  Future<Map<String, dynamic>> supprimerMembre(String membreId) => _delete('/admin/membres/$membreId');

  /// Suppression douce de son propre compte, carte 92, 7 nov.
  /// 2026 : le membre demande lui-meme, avec son mot de passe.
  /// Le serveur desactive le compte pendant 30 jours, pour
  /// laisser le temps d'annuler, rien n'est efface tout de
  /// suite. Renvoie suppression_demandee et supprime_le.
  Future<Map<String, dynamic>> supprimerMonCompte(String motDePasse) =>
      _delete('/moi/compte', {'mot_de_passe': motDePasse});

  /// Annulation de la suppression demandee, carte 92 : reactive
  /// le compte, efface la date, seulement dans les 30 jours.
  Future<Map<String, dynamic>> annulerSuppressionCompte() => _post('/moi/compte/annuler', {});

  /// Nommer ou révoquer un administrateur, 1er nov. 2026 :
  /// administrateur général seul, côté serveur. La révocation,
  /// c'est le rôle membre, sans établissement administré et sans
  /// fonction clé. Carte 75 : la nomination peut aussi donner
  /// une fonction clé, modérateur, éditeur, responsable ou
  /// trésorier, ou aucune, et dans ce cas l'administrateur garde
  /// tout ce que son rôle lui donnait déjà. Changer la fonction
  /// seule passe par la même route, avec le même rôle et le même
  /// établissement. Le serveur applique le changement au prochain
  /// jeton, au plus 15 minutes plus tard.
  Future<Map<String, dynamic>> definirRoleMembre(String membreId, String role, {String? etablissementId, String? fonctionAdmin}) => _post('/admin/membres/$membreId/role', {
        'role': role,
        if (etablissementId != null) 'etablissement_id': etablissementId,
        if (fonctionAdmin != null) 'fonction_admin': fonctionAdmin,
      });

  /// Catalogue des fonctions clés, carte 75 : servi par le
  /// serveur, administrateur général seul. La page
  /// Administrateurs garde sa liste locale en repli si le
  /// serveur est plus ancien et ne connaît pas encore la route.
  Future<List<Map<String, dynamic>>> fetchFonctionsAdmin() => _list('/admin/fonctions-admin');

  /// Fiches santé de camp, 31 oct. 2026 : lecture, enregistrement,
  /// suppression de sa propre fiche, et lecture administrateur.
  Future<Map<String, dynamic>> fetchMaFicheSante(String evenementId) async {
    final data = await _get('/moi/fiches-sante/$evenementId');
    return data as Map<String, dynamic>;
  }

  Future<void> enregistrerFicheSante(String evenementId, Map<String, String> champs) async {
    await _post('/moi/fiches-sante/$evenementId', champs);
  }

  Future<void> supprimerMaFicheSante(String evenementId) async {
    await _delete('/moi/fiches-sante/$evenementId');
  }

  Future<Map<String, dynamic>> fetchFichesSanteAdmin(String evenementId) async {
    final data = await _get('/admin/fiches-sante/$evenementId');
    return data as Map<String, dynamic>;
  }

  Future<Map<String, dynamic>> fetchFicheSanteAdmin(String evenementId, String membreId) async {
    final data = await _get('/admin/fiches-sante/$evenementId/$membreId');
    return data as Map<String, dynamic>;
  }

  Future<void> supprimerFicheSanteAdmin(String evenementId, String membreId) async {
    await _delete('/admin/fiches-sante/$evenementId/$membreId');
  }

  /// Fiches de présence sur place, 31 oct. 2026 : personnes sans
  /// compte, créées et lues par la structure seulement.
  Future<Map<String, dynamic>> creerFichePresence(String evenementId, Map<String, String> corps) async {
    return _post('/admin/fiches-presence/$evenementId', corps);
  }

  Future<Map<String, dynamic>> fetchFichePresenceAdmin(String evenementId, String ficheId) async {
    final data = await _get('/admin/fiches-presence/$evenementId/$ficheId');
    return data as Map<String, dynamic>;
  }

  Future<void> supprimerFichePresenceAdmin(String evenementId, String ficheId) async {
    await _delete('/admin/fiches-presence/$evenementId/$ficheId');
  }


  /// Changement forcé après une connexion avec un temporaire.
  Future<void> changePasswordForced(String nouveau) async {
    await _post('/moi/mot-de-passe', {'mot_de_passe': nouveau});
  }

  /// Réinitialisation autonome par code e-mail, 2 nov. 2026 :
  /// demande du code, puis réinitialisation avec le code reçu.
  /// La réponse de la demande ne révèle pas si le compte existe.
  Future<void> requestPasswordResetCode(String email) async {
    await _postAuth('/auth/mot-de-passe-oublie', {'email': email});
  }

  /// Réinitialisation par code, carte 46 : le serveur renvoie
  /// désormais des jetons (connexion automatique), enregistrés
  /// ici comme après login(), avec rememberMe, sans jamais
  /// stocker le mot de passe.
  Future<Map<String, dynamic>> resetPasswordWithCode(String email, String code, String nouveau, {bool rememberMe = true}) async {
    _persistTokens = rememberMe;
    final data = await _postAuth('/auth/reinitialiser-mot-de-passe', {'email': email, 'code': code, 'mot_de_passe': nouveau});
    if (data['access'] is String) await saveToken(data['access'] as String);
    if (data['refresh'] is String) await _saveRefresh(data['refresh'] as String);
    return data;
  }

  // Cloche de notifications internes, 29 oct. 2026 : lecture seule
  // pour le membre connecté, le serveur filtre sur le jeton.
  Future<Map<String, dynamic>> fetchNotifications() async {
    final data = await _get('/notifications');
    if (data is Map<String, dynamic>) return data;
    return {'notifications': const [], 'non_lues': 0};
  }

  Future<void> markNotificationRead(String id) async {
    await _post('/notifications/$id/lue', {});
  }

  Future<void> markAllNotificationsRead() async {
    await _post('/notifications/tout-lire', {});
  }

  // Notifications poussées Android, 2 nov. 2026 : le jeton FCM
  // n'est jamais journalisé, jamais affiché, jamais mis dans une
  // URL. Il est enregistré seulement pour un membre connecté,
  // avec les catégories activées, pour que le serveur filtre
  // avant d'envoyer. La désactivation est au mieux, sans jamais
  // bloquer la déconnexion.
  Future<void> registerPushToken(Map<String, dynamic> body) async {
    await _post('/moi/notification-token', body);
  }

  Future<void> deactivatePushToken(String token) async {
    await _post('/moi/notification-token/desactiver', {'jeton': token});
  }

  // Validation et refus explicites par la structure, après
  // contrôle de son compte Wave. La validation serveur génère
  // aussi la facture, jamais une confirmation locale seule.
  Future<Map<String, dynamic>> fetchAdminPayment(String id) async {
    final data = await _get('/admin/paiements/$id');
    return data as Map<String, dynamic>;
  }

  Future<Map<String, dynamic>> validateAdminPayment(String id, {String? waveTransactionId, String? moyen}) {
    final body = <String, dynamic>{};
    if (waveTransactionId != null) body['wave_transaction_id'] = waveTransactionId;
    if (moyen != null) body['moyen'] = moyen;
    return _post('/admin/paiements/$id/valider', body);
  }

  /// Règlement en espèces d'une cotisation, 29 oct. 2026 : depuis le
  /// scan de la carte, pour un membre sans demande en attente. Le mois
  /// est le mois en cours côté serveur, le montant reste celui imposé
  /// par la table, 1000 FCFA par mois, jamais envoyé par le client.
  Future<Map<String, dynamic>> enregistrerCotisationEspeces(String matricule) =>
      _post('/admin/cotisations', {'matricule': matricule, 'moyen': 'especes'});

  Future<Map<String, dynamic>> refuseAdminPayment(String id) => _post('/admin/paiements/$id/refuser', {});

  Future<Map<String, dynamic>> createAchat(List<String> livreIds) async {
    return _post('/paiements/achat', {'livre_ids': livreIds});
  }

  /// PayPal API, 27 oct. 2026 : création d'une commande PayPal pour
  /// une demande déjà créée côté serveur. Retourne l'URL d'approbation
  /// à ouvrir dans PayPal. Si le serveur répond 503, PayPal API n'est
  /// pas configuré, et l'appelant retombe sur le lien de don.
  Future<Map<String, dynamic>> createPaypalOrder(String reference, String devise) async {
    return _post('/paiements/paypal/creer', {'reference': reference, 'devise': devise});
  }

  /// Retour d'état PayPal pour une demande, après le retour du
  /// navigateur : si le serveur a confirmé, statut 'confirme'.
  Future<Map<String, dynamic>> paypalStatus(String reference) async {
    final data = await _get('/paiements/paypal/etat/$reference');
    return data as Map<String, dynamic>;
  }

  Future<void> logout() async {
    final refresh = _refreshToken;
    if (refresh != null && refresh.length == 64) {
      try {
        await _client
            .post(Uri.parse('$kApiBaseUrl/auth/deconnexion'),
                headers: {'Content-Type': 'application/json'},
                body: jsonEncode({'refresh': refresh}))
            .timeout(const Duration(seconds: 15));
      } catch (_) {}
    }
    await saveToken(null);
    await _saveRefresh(null);
  }
}

final api = ApiClient();
