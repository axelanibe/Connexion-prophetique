/// Logo d'en-tête, piloté par le serveur, 27 oct. 2026.
/// Par défaut, le logo officiel local, redimensionné à 36 px de
/// haut, largeur automatique selon son format 703x221, donc
/// environ 114 px, jamais rogné, jamais déformé.
/// Si le serveur renvoie une URL de logo dans /config, clé
/// logo_url, par exemple un fichier téléversé sur le serveur,
/// cette image distante est utilisée à la place, avec repli sur
/// le logo local en cas d'échec de chargement ou hors ligne.
/// Le texte CONNEXION PROPHÉTIQUE n'est plus affiché à côté,
/// car le logo officiel le contient déjà : cela évite le
/// doublon et le débordement sur écran étroit.
import 'package:flutter/material.dart';

import 'remote_config.dart';

Widget headerLogo() {
  final url = currentRemoteConfig.raw('logo_url');
  final local = Image.asset(
    'assets/logo.png',
    height: 36,
    fit: BoxFit.contain,
    errorBuilder: (ctx, err, st) => const Text(
      'CP',
      style: TextStyle(color: Color(0xFFD4A72C), fontSize: 14, fontWeight: FontWeight.w700, fontStyle: FontStyle.italic, fontFamily: 'serif'),
    ),
  );
  if (url.isEmpty) return local;
  return Image.network(
    url,
    height: 36,
    fit: BoxFit.contain,
    errorBuilder: (ctx, err, st) => local,
  );
}
