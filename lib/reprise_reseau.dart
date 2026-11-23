// Reprise après un retour du réseau, carte 151, 22 nov. 2026.
// L'application ne détectait jamais un changement de connexion :
// sans écoute, la reprise reposait sur les minuteurs, et un
// processus endormi n'avait pas de tour suivant. Ce surveillant
// appelle [auRetour] quand le réseau revient après une coupure,
// pour relancer la synchro, le sondage des appels entrants et une
// vérification de session. Il ne réveille pas une application
// tuée : FCM reste la seule voie de réveil. Le flux et le retour
// sont injectables, pour tester les transitions sans réseau réel.
import 'dart:async';

import 'package:connectivity_plus/connectivity_plus.dart';

class SurveillantReseau {
  SurveillantReseau({
    required Stream<List<ConnectivityResult>> flux,
    required Future<void> Function() auRetour,
  })  : _flux = flux,
        _auRetour = auRetour;

  final Stream<List<ConnectivityResult>> _flux;
  final Future<void> Function() _auRetour;
  StreamSubscription<List<ConnectivityResult>>? _abonnement;

  /// Connecté au démarrage : l'application vient de charger et de
  /// se synchroniser. Un premier événement « connecté » ne
  /// déclenche donc pas de reprise ; seule une coupure suivie
  /// d'un retour la déclenche.
  bool _connecte = true;

  void demarrer() {
    _abonnement ??= _flux.listen(_traiter);
  }

  void _traiter(List<ConnectivityResult> resultats) {
    final connecte =
        resultats.any((r) => r != ConnectivityResult.none);
    if (!_connecte && connecte) {
      unawaited(_auRetour());
    }
    _connecte = connecte;
  }

  Future<void> arreter() async {
    await _abonnement?.cancel();
    _abonnement = null;
  }
}
