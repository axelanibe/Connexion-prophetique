// Service de la nouvelle Librairie, tranche T7, 26 nov. 2026.
// Données par l'API existante, sans rien réinventer : GET
// /livres pour le catalogue, GET /moi/achats pour Mes achats,
// POST /admin/livres et PUT /admin/livres/:id pour la
// structure, réservés au rôle admin_general côté serveur.
// Le panier et les achats connus vivent en stockage local,
// états individuels, jamais en base ; le catalogue public
// n'est jamais dupliqué par utilisateur. En cas d'échec
// réseau, la dernière liste connue est gardée, jamais
// remplacée par du vide.
import 'package:share_plus/share_plus.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../api.dart';
import '../app_models.dart';
import 'modeles_librairie.dart';

/// Ce que fait le bouton Acheter, même comportement qu'en
/// ligne : lecture si déjà acheté, panier si déjà ajouté,
/// sinon ajout au panier.
enum ActionAchat { lire, voirPanier, ajoute }

/// Contrat du service Librairie, pour la page et ses tests.
abstract class ServiceLibrairie {
  Future<void> charger();
  bool get aEchoue;
  List<Book> get livres;
  bool estAchete(Book livre);
  bool get estAdminGeneral;
  List<Book> get panier;
  bool dansPanier(Book livre);
  Future<void> ajouterAuPanier(Book livre);
  Future<void> retirerDuPanier(Book livre);
  Future<ActionAchat> acheter(Book livre);
  Future<void> partager(Book livre);
  Future<void> publierLivre({
    required String titre,
    required String auteur,
    required int prixFcfa,
    String description = '',
    String format = '',
    String categorie = 'À classer',
    List<int>? fichierBytes,
    String? fichierNom,
  });
  Future<void> modifierLivre(
    Book livre, {
    required String titre,
    required String auteur,
    required int prixFcfa,
    String description = '',
    String format = '',
    String categorie = 'À classer',
    List<int>? fichierBytes,
    String? fichierNom,
  });
  Future<void> retirerLivre(Book livre);
}

/// Implémentation réelle, sur l'API existante.
class ServiceLibrairieReel implements ServiceLibrairie {
  ServiceLibrairieReel({ApiClient? client}) : _api = client ?? api;
  final ApiClient _api;

  var _livres = <Book>[];
  var _achatsIds = <String>{};
  var _panier = <Book>[];
  var _aEchoue = false;

  static const _clePanier = 'nouveau_panier_livres';
  static const _cleAchats = 'nouveau_achats_livres';

  @override
  bool get aEchoue => _aEchoue;

  @override
  List<Book> get livres => List.unmodifiable(_livres);

  @override
  bool get estAdminGeneral => _api.role == 'admin_general';

  @override
  List<Book> get panier => List.unmodifiable(_panier);

  String _cleLivre(Book livre) =>
      livre.serverId.isNotEmpty ? livre.serverId : livre.title;

  @override
  bool estAchete(Book livre) {
    if (livre.serverId.isNotEmpty) return _achatsIds.contains(livre.serverId);
    return _achatsIds.contains(livre.title);
  }

  @override
  bool dansPanier(Book livre) =>
      _panier.any((b) => _cleLivre(b) == _cleLivre(livre));

  @override
  Future<void> charger() async {
    final prefs = await SharedPreferences.getInstance();
    _achatsIds = (prefs.getStringList(_cleAchats) ?? const <String>[]).toSet();
    final panierIds =
        (prefs.getStringList(_clePanier) ?? const <String>[]).toSet();
    try {
      final lignes = await _api.fetchLivres();
      var idLocal = 0;
      _livres = [
        for (final ligne in lignes) livreDepuisServeur(ligne, ++idLocal),
      ];
      _aEchoue = false;
    } catch (_) {
      _aEchoue = _livres.isEmpty;
    }
    try {
      final achats = await _api.fetchMesAchats();
      _achatsIds = {
        for (final a in achats)
          if ((a['id'] ?? '').toString().isNotEmpty)
            (a['id'] ?? '').toString(),
      };
      await prefs.setStringList(_cleAchats, _achatsIds.toList());
    } catch (_) {
      // Hors ligne : les derniers achats connus sont gardés.
    }
    _panier = [
      for (final livre in _livres)
        if (panierIds.contains(_cleLivre(livre))) livre,
    ];
  }

  Future<void> _sauverPanier() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList(
        _clePanier, _panier.map(_cleLivre).toList());
  }

  @override
  Future<void> ajouterAuPanier(Book livre) async {
    if (dansPanier(livre)) return;
    _panier = [..._panier, livre];
    await _sauverPanier();
  }

  @override
  Future<void> retirerDuPanier(Book livre) async {
    _panier = _panier.where((b) => _cleLivre(b) != _cleLivre(livre)).toList();
    await _sauverPanier();
  }

  @override
  Future<ActionAchat> acheter(Book livre) async {
    if (estAchete(livre)) return ActionAchat.lire;
    if (dansPanier(livre)) return ActionAchat.voirPanier;
    await ajouterAuPanier(livre);
    return ActionAchat.ajoute;
  }

  @override
  Future<void> partager(Book livre) => SharePlus.instance.share(
        ShareParams(
          text:
              '${livre.title}\n${livre.author}\n${fcfaLivre(livre.price)} — CONNEXION PROPHÉTIQUE\nhttps://www.connexionprophetique.com/',
        ),
      );

  @override
  Future<void> publierLivre({
    required String titre,
    required String auteur,
    required int prixFcfa,
    String description = '',
    String format = '',
    String categorie = 'À classer',
    List<int>? fichierBytes,
    String? fichierNom,
  }) async {
    String? fichierId;
    if (fichierBytes != null && fichierNom != null) {
      fichierId =
          await _api.uploadLivre(bytes: fichierBytes, filename: fichierNom);
    }
    final cree = await _api.createLivre(
      titre: titre,
      auteur: auteur,
      prixFcfa: prixFcfa,
      description: description,
      format: format,
      categorie: categorie,
      fichierId: fichierId,
    );
    final id = (cree['id'] ?? '').toString();
    _livres = [
      ..._livres,
      Book(
        id: _livres.length + 1,
        serverId: id,
        title: titre,
        author: auteur,
        description: description,
        format: format,
        categorie: categorie,
        fichierId: fichierId ?? '',
        price: prixFcfa,
      ),
    ];
  }

  @override
  Future<void> modifierLivre(
    Book livre, {
    required String titre,
    required String auteur,
    required int prixFcfa,
    String description = '',
    String format = '',
    String categorie = 'À classer',
    List<int>? fichierBytes,
    String? fichierNom,
  }) async {
    String? fichierId;
    if (fichierBytes != null && fichierNom != null) {
      fichierId =
          await _api.uploadLivre(bytes: fichierBytes, filename: fichierNom);
    }
    if (livre.serverId.isNotEmpty) {
      await _api.updateLivre(
        livre.serverId,
        titre: titre,
        auteur: auteur,
        prixFcfa: prixFcfa,
        description: description,
        format: format,
        categorie: categorie,
        fichierId: fichierId,
      );
    }
    livre.title = titre;
    livre.author = auteur;
    livre.price = prixFcfa;
    livre.description = description;
    livre.format = format;
    livre.categorie = categorie;
    if (fichierId != null) livre.fichierId = fichierId;
  }

  @override
  Future<void> retirerLivre(Book livre) async {
    if (livre.serverId.isNotEmpty && _api.isConnected) {
      await _api.updateLivre(livre.serverId, publie: false);
    }
    _livres = _livres.where((b) => b != livre).toList();
    await retirerDuPanier(livre);
  }
}
