// Veille réseau, tranche T10, 26 nov. 2026.
// Une seule écoute du réseau pour toute la nouvelle application.
// Elle ne lit que l'état du réseau (connectivity_plus), jamais
// les réponses HTTP : une 401 ou une 429 ne déclenche donc rien
// ici, pas de bandeau, pas de toast pour ces cas, comme le
// correctif du bandeau Hors ligne approuvé par Axel le 22 nov.
// à 03 h 55 UTC. Seule une vraie absence de réseau fait passer
// enLigne à faux, et seul le retour après une coupure déclenche
// une reprise : les pages rechargent alors leur vue, sans jamais
// vider ce qui est déjà affiché.
import 'dart:async';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter/material.dart';

class VeilleReseau {
  VeilleReseau({Stream<List<ConnectivityResult>>? flux})
      : _flux = flux ?? Connectivity().onConnectivityChanged;

  /// Instance partagée par la coquille et les pages.
  static VeilleReseau partage = VeilleReseau();

  final Stream<List<ConnectivityResult>> _flux;
  StreamSubscription<List<ConnectivityResult>>? _abonnement;

  /// Vrai tant que le réseau est présent. Ne change qu'au
  /// passage d'un état à l'autre.
  final ValueNotifier<bool> enLigne = ValueNotifier<bool>(true);

  /// Nombre de retours du réseau après une coupure. Un premier
  /// événement « connecté » au démarrage ne compte pas : seule
  /// une coupure suivie d'un retour déclenche une reprise.
  final ValueNotifier<int> reprises = ValueNotifier<int>(0);

  bool _connecte = true;
  final _aReprendre = <VoidCallback>{};

  void demarrer() {
    // Erreur de plateforme ignorée : sans lecture possible, on
    // garde le dernier état connu, sans jamais planter la page.
    _abonnement ??= _flux.listen(_traiter, onError: (_) {});
  }

  void _traiter(List<ConnectivityResult> resultats) {
    final connecte = resultats.any((r) => r != ConnectivityResult.none);
    if (!_connecte && connecte) {
      reprises.value++;
      for (final f in _aReprendre.toList()) {
        f();
      }
    }
    _connecte = connecte;
    enLigne.value = connecte;
  }

  /// Appelé à chaque reprise, après une coupure. La page qui
  /// s'inscrit ne recharge que sa propre vue, et son chargement
  /// passe par les caches locaux et les ETag, donc seules les
  /// données changées sont téléchargées.
  void ajouterReprise(VoidCallback f) => _aReprendre.add(f);

  void retirerReprise(VoidCallback f) => _aReprendre.remove(f);

  Future<void> arreter() async {
    await _abonnement?.cancel();
    _abonnement = null;
  }

  /// Toast transitoire, vraie absence de réseau seulement.
  /// Rien sur 401 ou 429, jamais de bandeau persistant.
  static void toastHorsLigne(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content:
            Text('Hors ligne, les contenus affichés sont ceux déjà chargés.'),
        duration: Duration(seconds: 3),
      ),
    );
  }
}
