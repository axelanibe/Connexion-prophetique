// Service Mes paiements et fiche membre côté Bureau, tranche T14,
// 26 nov. 2026. Lectures par l'API existante seulement, aucune
// écriture en base lors d'une lecture. Les écritures sont celles
// que l'administrateur demande : corriger un membre, valider ou
// suspendre son adhésion. Aucun ajout serveur.
import '../api.dart';
import 'cache_contenus.dart';
import 'modeles_t14.dart';

/// Contrat du service T14, pour les pages et leurs tests.
abstract class ServiceT14 {
  Future<void> chargerPaiements();
  List<PaiementMembre> get paiements;

  Future<List<int>?> telechargerFacture(String reference);

  Future<void> chargerEtablissements();
  List<EtablissementChoix> get etablissements;

  Future<void> chargerMembresAdmin();
  bool get accesAdminMembres;
  List<MembreAdmin> get membresAdmin;

  Future<MembreAdmin?> chargerDetailMembre(String membreId);

  Future<bool> corrigerMembre({
    required String membreId,
    required String nomComplet,
    String? dateNaissance,
    String? etablissementId,
  });

  Future<bool> validerAdhesion(String membreId);
  Future<bool> suspendreAdhesion(String membreId, String motif);
}

/// Implémentation réelle, sur l'API existante.
class ServiceT14Reel implements ServiceT14 {
  ServiceT14Reel({ApiClient? client, CacheContenus? cache})
      : _api = client ?? api,
        _cache = cache ?? CacheContenus(api);
  final ApiClient _api;
  final CacheContenus _cache;

  var _paiements = <PaiementMembre>[];
  var _etablissements = <EtablissementChoix>[];
  var _accesAdminMembres = false;
  var _membresAdmin = <MembreAdmin>[];

  @override
  List<PaiementMembre> get paiements => List.unmodifiable(_paiements);

  @override
  List<EtablissementChoix> get etablissements =>
      List.unmodifiable(_etablissements);

  @override
  bool get accesAdminMembres => _accesAdminMembres;

  @override
  List<MembreAdmin> get membresAdmin => List.unmodifiable(_membresAdmin);

  @override
  Future<void> chargerPaiements() async {
    try {
      final lignes = await _api.fetchMyPayments();
      _paiements = [
        for (final l in lignes) PaiementMembre.depuisJson(l),
      ];
    } catch (_) {
      // Hors ligne : les paiements connus sont gardés.
    }
  }

  @override
  Future<List<int>?> telechargerFacture(String reference) async {
    try {
      final octets = await _api.downloadFacture(reference);
      return octets.toList();
    } catch (_) {
      return null;
    }
  }

  @override
  Future<void> chargerEtablissements() async {
    try {
      final lignes = await _cache.chargerEtablissements();
      _etablissements = [
        for (final l in lignes)
          if ((l['id'] ?? '').toString().isNotEmpty &&
              (l['nom'] ?? '').toString().isNotEmpty)
            EtablissementChoix.depuisJson(l),
      ];
    } catch (_) {
      // Hors ligne : les établissements connus sont gardés.
    }
  }

  @override
  Future<void> chargerMembresAdmin() async {
    try {
      final lignes = await _api.fetchAdminMembres();
      _membresAdmin = [
        for (final l in lignes) MembreAdmin.depuisJson(l),
      ];
      _accesAdminMembres = true;
    } catch (_) {
      _accesAdminMembres = false;
      _membresAdmin = [];
    }
  }

  @override
  Future<MembreAdmin?> chargerDetailMembre(String membreId) async {
    try {
      final data = await _api.fetchAdminMembreDetail(membreId);
      return MembreAdmin.depuisJson(data);
    } catch (_) {
      return null;
    }
  }

  @override
  Future<bool> corrigerMembre({
    required String membreId,
    required String nomComplet,
    String? dateNaissance,
    String? etablissementId,
  }) async {
    try {
      await _api.corrigerMembre(
        membreId,
        nomComplet: nomComplet,
        dateNaissance: dateNaissance,
        etablissementId: etablissementId,
      );
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<bool> validerAdhesion(String membreId) async {
    try {
      await _api.validerAdhesion(membreId);
      return true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<bool> suspendreAdhesion(String membreId, String motif) async {
    try {
      await _api.suspendreAdhesion(membreId, motif);
      return true;
    } catch (_) {
      return false;
    }
  }
}
