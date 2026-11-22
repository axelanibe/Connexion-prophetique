// Client WebSocket de signalisation d'appels, 16 nov. 2026.
// Se connecte à /messagerie/ws sur le même service Render.
// H-4, 22 nov. 2026 : le jeton ne passe plus dans l'URL
// (?jeton=), il part en premier message JSON
// {"type":"auth","jeton":"..."} après ouverture de la socket.
// Le serveur accepte aussi ?jeton= en repli pour les APK déjà
// installées. La socket ne sert qu'à recevoir : les signaux
// partent en HTTP (persistés, puis relayés ici par le serveur).
// En cas de coupure, reconnexion automatique avec délai
// croissant, 5 essais au maximum, puis le repli HTTP
// (interrogation toutes les 2 secondes) prend le relais : c'est
// l'écran d'appel qui décide, sur le flux onDeconnecte.

import 'dart:async';
import 'dart:convert';

import 'package:web_socket_channel/web_socket_channel.dart';

import 'appels.dart';

class ClientSignalisationAppels {
  ClientSignalisationAppels({this.delaiReconnexion = const [1, 2, 4, 8, 16]});

  /// Délais de reconnexion en secondes, un par essai.
  final List<int> delaiReconnexion;

  WebSocketChannel? _canal;
  StreamSubscription? _abonnement;
  Timer? _minuteurReconnexion;
  bool _elimine = false;
  int _essais = 0;

  /// Vrai quand la socket est ouverte.
  bool get connecte => _canal != null && !_elimine;

  /// Signaux reçus, déjà décodés, dans l'ordre d'arrivée.
  final StreamController<SignalAppel> _signauxController =
      StreamController<SignalAppel>.broadcast();
  Stream<SignalAppel> get signaux => _signauxController.stream;

  /// Émis quand la socket se ferme après les essais de
  /// reconnexion, pour que l'écran bascule sur le repli HTTP.
  final StreamController<void> _deconnecteController =
      StreamController<void>.broadcast();
  Stream<void> get onDeconnecte => _deconnecteController.stream;

  String? _url;
  String? _jeton;

  /// Ouvre la socket. Ne lève jamais : un échec déclenche les
  /// essais de reconnexion, puis onDeconnecte. Le jeton, quand
  /// il est donné, part en premier message après ouverture,
  /// jamais dans l'URL.
  Future<void> connecter(String url, {String? jeton}) async {
    _url = url;
    _jeton = jeton;
    _elimine = false;
    _essais = 0;
    await _ouvrir();
  }

  Future<void> _ouvrir() async {
    if (_elimine) return;
    final url = _url;
    if (url == null || url.isEmpty) return;
    try {
      final canal = WebSocketChannel.connect(Uri.parse(url));
      _canal = canal;
      await canal.ready;
      _essais = 0;
      // Premier message d'authentification, H-4 : le serveur
      // authentifie la socket sur ce message, sans jeton en URL.
      final jeton = _jeton;
      if (jeton != null && jeton.isNotEmpty) {
        try {
          canal.sink.add(jsonEncode({'type': 'auth', 'jeton': jeton}));
        } catch (_) {}
      }
      _abonnement = canal.stream.listen(
        _recevoir,
        onError: (_) => _perte(),
        onDone: _perte,
        cancelOnError: true,
      );
    } catch (_) {
      _perte();
    }
  }

  void _recevoir(dynamic brut) {
    try {
      final decode = jsonDecode(brut.toString());
      if (decode is! Map<String, dynamic>) return;
      if (decode['type'] != 'signal_appel') return;
      final signal = decode['signal'];
      if (signal is! Map<String, dynamic>) return;
      if (!_signauxController.isClosed) {
        _signauxController.add(SignalAppel.fromJson(signal));
      }
    } catch (_) {
      // Un message malformé est ignoré, la socket reste ouverte.
    }
  }

  void _perte() {
    _abonnement?.cancel();
    _abonnement = null;
    _canal = null;
    if (_elimine) return;
    if (_essais >= delaiReconnexion.length) {
      if (!_deconnecteController.isClosed) _deconnecteController.add(null);
      return;
    }
    final delai = delaiReconnexion[_essais];
    _essais++;
    _minuteurReconnexion?.cancel();
    _minuteurReconnexion = Timer(Duration(seconds: delai), () {
      if (!_elimine) unawaited(_ouvrir());
    });
  }

  /// Ferme la socket et arrête les reconnexions.
  Future<void> deconnecter() async {
    _elimine = true;
    _minuteurReconnexion?.cancel();
    await _abonnement?.cancel();
    _abonnement = null;
    try {
      await _canal?.sink.close();
    } catch (_) {}
    _canal = null;
  }

  /// Remise à zéro (tests uniquement).
  Future<void> reinitialiserPourTests() async {
    await deconnecter();
    _elimine = false;
    _essais = 0;
  }
}
