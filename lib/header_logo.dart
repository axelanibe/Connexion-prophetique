/// Logo CP d'en-tête, comme sur la version web, 27 oct. 2026.
/// En haut, à gauche : le logo CP doré sur carré noir, 36x36,
/// suivi, dans l'en-tête lui-même, du titre CONNEXION
/// PROPHÉTIQUE en or et du sous-titre de la page en cours.
/// Ce logo CP est l'image recadrée depuis la capture web
/// fournie par Axel, et non un CP en texte : le fichier
/// assets/cp_monogram.png est restauré à la construction
/// depuis ses 2 parties base64, voir tools/build_bible.py.
/// Si le serveur renvoie une URL de logo dans /config, clé
/// logo_url, cette image distante est utilisée à la place,
/// avec repli sur le logo CP local en cas d'échec ou hors ligne.
/// Le logo officiel large, avec le nom complet, reste utilisé
/// sur la carte de membre elle-même, comme sur la version web.
import 'package:flutter/material.dart';

import 'remote_config.dart';
import 'web_assets.dart';

Widget headerLogo({double size = 36}) {
  final url = currentRemoteConfig.raw('logo_url');
  final local = ClipRRect(
    borderRadius: BorderRadius.circular(9),
    child: WebAssetImage(
      asset: 'assets/cp_monogram.png',
      partUrls: kMonogramParts,
      width: size,
      height: size,
      fit: BoxFit.cover,
      fallback: Container(
        width: size,
        height: size,
        color: const Color(0xFF0B0B0B),
        child: Center(
          child: Text('CP', style: TextStyle(color: const Color(0xFFD4A72C), fontSize: size * 0.39, fontWeight: FontWeight.w700, fontStyle: FontStyle.italic, fontFamily: 'serif')),
        ),
      ),
    ),
  );
  if (url.isEmpty) return local;
  return ClipRRect(
    borderRadius: BorderRadius.circular(9),
    child: Image.network(
      url,
      width: size,
      height: size,
      fit: BoxFit.cover,
      errorBuilder: (ctx, err, st) => local,
    ),
  );
}
