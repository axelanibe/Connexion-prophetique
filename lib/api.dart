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

import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

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

  Future<void> restoreToken() async {
    final prefs = await SharedPreferences.getInstance();
    _accessToken = prefs.getString('api_access_token');
    _refreshToken = prefs.getString('api_refresh_token');
  }

  Future<void> saveToken(String? token) async {
    _accessToken = token;
    final prefs = await SharedPreferences.getInstance();
    if (token == null) {
      await prefs.remove('api_access_token');
    } else {
      await prefs.setString('api_access_token', token);
    }
  }

  Future<void> _saveRefresh(String? token) async {
    _refreshToken = token;
    final prefs = await SharedPreferences.getInstance();
    if (token == null) {
      await prefs.remove('api_refresh_token');
    } else {
      await prefs.setString('api_refresh_token', token);
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
  Future<List<Map<String, dynamic>>> fetchBureau() => _list('/bureau');

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

  Future<Map<String, dynamic>> login(String identifiant, String motDePasse) async {
    final data = await _post('/auth/connexion', {
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
  }) async {
    final data = await _post('/auth/inscription', {
      'nom_complet': nomComplet,
      'mot_de_passe': motDePasse,
      if (email != null && email.isNotEmpty) 'email': email,
      if (telephone != null && telephone.isNotEmpty) 'telephone': telephone,
      if (etablissementId != null && etablissementId.isNotEmpty) 'etablissement_id': etablissementId,
      if (fonction != null && fonction.isNotEmpty) 'fonction': fonction,
      if (dateNaissance != null && dateNaissance.isNotEmpty) 'date_naissance': dateNaissance,
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
  /// publie facultatif. Les dates saisies en texte libre dans
  /// l'application ne sont pas envoyées, le serveur n'accepte que
  /// des dates AAAA-MM-JJ : à la synchronisation, les dates d'un
  /// camp ainsi publié s'afficheront « À confirmer », sauf si la
  /// structure les renseigne au format date côté serveur. Le lieu,
  /// le tarif numérique et le badge Kairos, eux, sont bien transmis.
  /// Route réservée au rôle admin_general.
  Future<Map<String, dynamic>> createEvenement({
    required String nom,
    String? lieu,
    int? tarifFcfa,
    bool estKairos = false,
    String? imageId,
    String? datesTexte,
    String? description,
  }) async {
    return _post('/admin/evenements', {
      'type': 'camp',
      'nom': nom,
      if (lieu != null && lieu.isNotEmpty) 'lieu': lieu,
      if (tarifFcfa != null) 'tarif_fcfa': tarifFcfa,
      'est_kairos': estKairos,
      if (imageId != null && imageId.isNotEmpty) 'image_id': imageId,
      if (datesTexte != null && datesTexte.isNotEmpty) 'dates_texte': datesTexte,
      if (description != null && description.isNotEmpty) 'description': description,
      'publie': true,
    });
  }

  /// Modification d'un camp déjà publié côté serveur, PUT
  /// /admin/evenements/:id, schéma serveur partiel. Le serveur
  /// accepte déjà cette route, c'est l'application qui ne
  /// l'utilisait pas : aucun changement serveur n'est nécessaire.
  /// Réservé au rôle admin_general. Les dates en texte libre de
  /// l'application ne sont pas envoyées, le serveur n'accepte que
  /// des dates AAAA-MM-JJ, comme à la création.
  Future<Map<String, dynamic>> updateEvenement(
    String id, {
    String? nom,
    String? lieu,
    int? tarifFcfa,
    bool? estKairos,
    String? imageId,
    bool? publie,
    String? datesTexte,
    String? description,
  }) async {
    // Champs vides omis, comme pour le lieu : le serveur exige au
    // moins un caractere pour la description, donc une description
    // vide envoyee telle quelle rejetait toute la modification
    // avec « Donnees invalides », meme si le reste etait bon.
    return _put('/admin/evenements/$id', {
      if (nom != null) 'nom': nom,
      if (lieu != null && lieu.isNotEmpty) 'lieu': lieu,
      if (tarifFcfa != null) 'tarif_fcfa': tarifFcfa,
      if (estKairos != null) 'est_kairos': estKairos,
      if (imageId != null && imageId.isNotEmpty) 'image_id': imageId,
      if (publie != null) 'publie': publie,
      if (datesTexte != null && datesTexte.isNotEmpty) 'dates_texte': datesTexte,
      if (description != null && description.isNotEmpty) 'description': description,
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
  }) async {
    return _post('/admin/actualites', {
      'titre': titre,
      'texte': texte,
      if (etablissementId != null && etablissementId.isNotEmpty) 'etablissement_id': etablissementId,
      if (imageId != null && imageId.isNotEmpty) 'image_id': imageId,
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
  Future<void> updateActualite(String id, {String? titre, String? texte, String? imageId}) async {
    await _put('/admin/actualites/$id', {
      if (titre != null) 'titre': titre,
      if (texte != null) 'texte': texte,
      if (imageId != null && imageId.isNotEmpty) 'image_id': imageId,
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

  // Paiements du membre connecté, pour la synchronisation au
  // chargement : statut serveur confirmé, en attente ou refusé,
  // avec les lignes d'achat, titres et prix des livres.
  Future<List<Map<String, dynamic>>> fetchMyPayments() => _list('/moi/paiements');

  // Tous les paiements des membres, administrateur général
  // seulement, côté serveur : en attente, confirmés ou refusés.
  Future<List<Map<String, dynamic>>> fetchAdminPayments({String? statut, String? matricule}) {
    final params = <String>[];
    if (statut != null) params.add('statut=$statut');
    if (matricule != null && matricule.isNotEmpty) params.add('matricule=${Uri.encodeComponent(matricule)}');
    return _list(params.isEmpty ? '/admin/paiements' : '/admin/paiements?${params.join('&')}');
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

  Future<Map<String, dynamic>> annulerPresence(String presenceId) => _post('/presences/$presenceId/annuler', {});
  Future<List<Map<String, dynamic>>> fetchPresences() => _list('/presences');
  Future<List<Map<String, dynamic>>> fetchAdminMembres() => _list('/admin/membres');
  Future<List<Map<String, dynamic>>> fetchAudit() => _list('/admin/audit');

  // Validation et refus explicites par la structure, après
  // contrôle de son compte Wave. La validation serveur génère
  // aussi la facture, jamais une confirmation locale seule.
  Future<Map<String, dynamic>> fetchAdminPayment(String id) async {
    final data = await _get('/admin/paiements/$id');
    return data as Map<String, dynamic>;
  }

  Future<Map<String, dynamic>> validateAdminPayment(String id, {String? waveTransactionId}) =>
      _post('/admin/paiements/$id/valider', waveTransactionId == null ? {} : {'wave_transaction_id': waveTransactionId});

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
