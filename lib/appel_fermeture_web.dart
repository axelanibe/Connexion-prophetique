// Fermeture de la page pendant un appel, web, carte 4, 21 nov. 2026.
// La fermeture de l'onglet coupe l'appel, limite dure du
// navigateur : on envoie 'termine' au serveur quand la page se
// ferme, pour que l'autre côté soit prévenu et que la ligne ne
// reste pas ouverte. fetch avec keepalive, pas sendBeacon :
// sendBeacon ne peut pas porter l'en-tête Authorization Bearer
// qu'exige le serveur, il serait refusé en 401, et le jeton ne
// va jamais dans une URL. Le jeton est relu au moment de la
// fermeture, jamais figé à l'enregistrement.
import 'dart:convert';
import 'dart:js_interop';

import 'package:web/web.dart' as web;

import 'api.dart';

void Function()? _retirer;

/// Enregistre l'envoi de 'termine' à la fermeture de la page,
/// pour l'appel donné. Remplace l'enregistrement précédent.
void enregistrerFermetureAppel(String appelId) {
  annulerFermetureAppel();
  if (appelId.isEmpty) return;
  void surFermeture(web.Event _) {
    final jeton = api.jetonAcces;
    if (jeton == null || jeton.isEmpty) return;
    final enTetes = web.Headers();
    enTetes.set('Authorization', 'Bearer $jeton');
    enTetes.set('Content-Type', 'application/json');
    // Au mieux : la page se ferme, la réponse n'est jamais lue.
    web.window.fetch(
      '$kApiBaseUrl/messagerie/appels/$appelId/signaux'.toJS,
      web.RequestInit(
        method: 'POST',
        headers: enTetes,
        body:
            jsonEncode({
              'type': 'termine',
              'contenu': <String, dynamic>{},
            }).toJS,
        keepalive: true,
      ),
    );
  }

  final ecouteur = surFermeture.toJS;
  web.window.addEventListener('beforeunload', ecouteur);
  _retirer = () => web.window.removeEventListener('beforeunload', ecouteur);
}

/// Retire l'envoi de 'termine' à la fermeture, après un
/// raccrochage normal.
void annulerFermetureAppel() {
  _retirer?.call();
  _retirer = null;
}
