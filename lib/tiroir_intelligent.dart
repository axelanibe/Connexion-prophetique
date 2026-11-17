// Tiroir intelligent, 17 nov. 2026 : le tiroir s'adapte au membre.
// - « Pour vous » : les entrées les plus utilisées, mémorisées sur
//   ce téléphone seulement (SharedPreferences), jamais envoyées au
//   serveur, plus ce qui demande l'attention (message non lu,
//   paiement en attente). Sans historique et sans attention, la
//   section n'apparaît pas.
// - « Mes enfants » et « Mes résultats scolaires » ne s'affichent
//   que quand ils s'appliquent au membre, vérifié par le serveur.
//   Inconnu ou erreur : on affiche, pour ne jamais cacher une
//   entrée dont le membre aurait besoin. La page Plus garde les
//   deux entrées sans condition, elles restent accessibles.
// Ce fichier ne dépend ni de main.dart ni de api.dart : les appels
// serveur sont injectés, pour rester testable sans réseau.
import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

/// Usages du tiroir, sur ce téléphone seulement.
class TiroirUsage {
  static const String clePrefs = 'tiroir_usages_v1';
  static const int maxPourVous = 3;

  static final TiroirUsage instance = TiroirUsage._();
  TiroirUsage._();

  /// Comptes et derniers usages, lus depuis le téléphone. Vide en
  /// cas d'erreur ou au premier usage, jamais d'exception.
  Future<({Map<String, int> comptes, Map<String, int> derniers})> charger() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final brut = prefs.getString(clePrefs);
      if (brut == null || brut.isEmpty) {
        return (comptes: <String, int>{}, derniers: <String, int>{});
      }
      final json = jsonDecode(brut);
      if (json is! Map) {
        return (comptes: <String, int>{}, derniers: <String, int>{});
      }
      return (
        comptes: _entiers(json['comptes']),
        derniers: _entiers(json['derniers']),
      );
    } catch (_) {
      return (comptes: <String, int>{}, derniers: <String, int>{});
    }
  }

  static Map<String, int> _entiers(Object? valeur) {
    if (valeur is! Map) return <String, int>{};
    final sortie = <String, int>{};
    for (final e in valeur.entries) {
      final n = e.value;
      if (n is num) sortie[e.key.toString()] = n.toInt();
    }
    return sortie;
  }

  /// Enregistre un toucher sur une entrée du tiroir. Silencieux
  /// en cas d'erreur, l'ouverture de la page ne doit jamais
  /// dépendre de cette écriture.
  Future<void> enregistrer(String id) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final actuel = await charger();
      final comptes = Map<String, int>.of(actuel.comptes);
      final derniers = Map<String, int>.of(actuel.derniers);
      comptes[id] = (comptes[id] ?? 0) + 1;
      derniers[id] = DateTime.now().millisecondsSinceEpoch;
      await prefs.setString(clePrefs, jsonEncode({'comptes': comptes, 'derniers': derniers}));
    } catch (_) {}
  }

  /// Les identifiants les plus utilisés, parmi ceux visibles,
  /// dans l'ordre du tiroir en cas d'égalité. Tri stable : nombre
  /// de touchers d'abord, toucher le plus récent ensuite.
  static List<String> idsPlusUtilisees(
    List<String> idsVisibles,
    Map<String, int> comptes,
    Map<String, int> derniers, {
    int max = maxPourVous,
  }) {
    final tries = idsVisibles.where((id) => (comptes[id] ?? 0) > 0).toList();
    tries.sort((a, b) {
      final parCompte = (comptes[b] ?? 0).compareTo(comptes[a] ?? 0);
      if (parCompte != 0) return parCompte;
      return (derniers[b] ?? 0).compareTo(derniers[a] ?? 0);
    });
    return tries.take(max).toList();
  }
}

/// Ce qui, dans le tiroir, dépend du membre : enfants liés et
/// résultats scolaires. Vérifié par le serveur une fois par membre
/// et par période de fraîcheur, gardé en mémoire seulement, pour
/// qu'un lien validé ou une moyenne saisie apparaisse vite.
class TiroirContexte {
  static final TiroirContexte instance = TiroirContexte._();
  TiroirContexte._();

  /// Constructeur de test : même comportement, sans singleton.
  TiroirContexte.pourTests();

  static const Duration _fraicheur = Duration(minutes: 2);

  bool? _aEnfants;
  bool? _aResultats;
  String? _pourMatricule;
  DateTime? _chargeLe;
  Future<void>? _enCours;
  String? _enCoursMatricule;
  bool _figePourTests = false;

  bool? get aEnfants => _aEnfants;
  bool? get aResultats => _aResultats;

  /// Vrai sauf quand on sait qu'il n'y en a pas : inconnu, hors
  /// ligne ou erreur, on affiche l'entrée.
  bool get montreEnfants => _aEnfants != false;
  bool get montreResultats => _aResultats != false;

  /// Charge les deux drapeaux, une seule fois par membre et par
  /// période de fraîcheur. Sans membre connecté, rien à vérifier.
  /// Les appels serveur sont injectés, ce service ne connaît ni
  /// l'état global ni le client API.
  Future<void> charger({
    required bool connecte,
    required String? matricule,
    required Future<List<dynamic>> Function() fetchEnfants,
    required Future<List<dynamic>> Function() fetchSuivis,
  }) {
    if (_figePourTests) return Future.value();
    if (!connecte || matricule == null) {
      _aEnfants = null;
      _aResultats = null;
      _pourMatricule = null;
      _chargeLe = null;
      return Future.value();
    }
    if (_pourMatricule == matricule &&
        _chargeLe != null &&
        DateTime.now().difference(_chargeLe!) < _fraicheur) {
      return Future.value();
    }
    if (_enCours != null && _enCoursMatricule == matricule) {
      return _enCours!;
    }
    _enCoursMatricule = matricule;
    _enCours = _charger(matricule, fetchEnfants, fetchSuivis);
    return _enCours!.whenComplete(() {
      _enCours = null;
      _enCoursMatricule = null;
    });
  }

  Future<void> _charger(
    String matricule,
    Future<List<dynamic>> Function() fetchEnfants,
    Future<List<dynamic>> Function() fetchSuivis,
  ) async {
    try {
      final resultats = await Future.wait([fetchEnfants(), fetchSuivis()]);
      _aEnfants = resultats[0].isNotEmpty;
      _aResultats = resultats[1].isNotEmpty;
      _pourMatricule = matricule;
      _chargeLe = DateTime.now();
    } catch (_) {
      // Hors ligne ou erreur serveur : on laisse inconnu, les
      // entrées restent affichées, la prochaine ouverture réessaie.
    }
  }

  /// Pour les tests : fixe les drapeaux sans passer par le réseau,
  /// et fige le service pour que l'ouverture du tiroir ne les
  /// remette pas à zéro.
  void definirPourTests({bool? aEnfants, bool? aResultats}) {
    _aEnfants = aEnfants;
    _aResultats = aResultats;
    _figePourTests = true;
  }

  void reinitialiserPourTests() {
    _aEnfants = null;
    _aResultats = null;
    _pourMatricule = null;
    _chargeLe = null;
    _enCours = null;
    _enCoursMatricule = null;
    _figePourTests = false;
  }
}
