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
          child: Text('CP', style: TextStyle(color: const Color(0xFFE5C158), fontSize: size * 0.39, fontWeight: FontWeight.w700, fontStyle: FontStyle.italic, fontFamily: 'serif')),
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
      // Carte 79, 7 nov. 2026 : haute resolution.
      filterQuality: FilterQuality.high,
      errorBuilder: (ctx, err, st) => local,
    ),
  );
}

// Nouveau logo bleu et rouge de l'en-tête, 19 nov. 2026, envoyé
// par Axel : fond blanc, jamais redessiné ni recoloré. Le logo
// seul sur une pastille blanche arrondie, à la place du
// monogramme CP et du titre en deux lignes, dans les deux
// en-têtes, choix d'Axel : logo seul sur la pastille blanche.
// L'en-tête est bleu nuit, le fond blanc du logo impose la
// pastille blanche pour rester lisible. La surcharge distante
// logo_url de /config est gardée, avec le nouveau logo comme
// repli local. Rapport 1290 sur 444, largeur = taille x 2,9.
Widget logoEnteteNouveau({double size = 36}) {
  final largeur = size * 1290 / 444;
  Widget pastille(Widget enfant) => ClipRRect(
        borderRadius: BorderRadius.circular(10),
        child: Container(
          color: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
          child: enfant,
        ),
      );
  final local = pastille(
    WebAssetImage(
      asset: 'assets/logo_entete.jpg',
      partUrls: kLogoEnteteParts,
      width: largeur,
      height: size,
      fit: BoxFit.contain,
      filterQuality: FilterQuality.high,
      fallback: SizedBox(width: largeur, height: size),
    ),
  );
  final url = currentRemoteConfig.raw('logo_url');
  if (url.isEmpty) return local;
  return pastille(
    Image.network(
      url,
      width: largeur,
      height: size,
      fit: BoxFit.contain,
      filterQuality: FilterQuality.high,
      errorBuilder: (ctx, err, st) => WebAssetImage(
        asset: 'assets/logo_entete.jpg',
        partUrls: kLogoEnteteParts,
        width: largeur,
        height: size,
        fit: BoxFit.contain,
        filterQuality: FilterQuality.high,
        fallback: SizedBox(width: largeur, height: size),
      ),
    ),
  );
}
