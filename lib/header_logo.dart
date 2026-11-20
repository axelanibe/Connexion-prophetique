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

// Titre de l'en-tête, 20 nov. 2026, décision d'Axel : le logo
// bleu et rouge sort entièrement, remplacé par le sigle CP et
// « CONNEXION PROPHÉTIQUE » en Cinzel, « CONNEXION »
// en or #E5C158 et « PROPHÉTIQUE » en blanc, sur le fond bleu
// nuit #0F1C2E. Le sigle garde la surcharge distante logo_url
// de /config, comme headerLogo avant lui. Le PNG sans fond
// demandé le 19 nov. n'est plus nécessaire, le logo sort.
// Tailles mesurées sur les TTF réels : « CONNEXION
// PROPHÉTIQUE » en Cinzel gras fait 239,2 px à 16 px
// et 358,9 px à 24 px, soit 14,95 px par point de taille,
// contre 11,0 px pour Playfair Display, les capitales Cinzel
// sont plus larges. Avec un léger espacement des lettres,
// 0,5 px sur 21 caractères, soit 10,5 px, la taille se
// calcule en retranchant cet espacement puis en divisant
// par 14,95. À 390 px, l'en-tête membre laisse environ
// 190 px au titre et l'en-tête de page environ 188 px, donc
// environ 11,1 px sur l'accueil et 11,6 px sur les pages à
// 390 px, et 24 px sur ordinateur quand il y a la place,
// taille réduite par LayoutBuilder quand la place manque,
// par exemple une action de page en plus, jamais de texte
// coupé, borne basse 11 px sur téléphone et 16 px sur
// ordinateur. Cinzel est embarquée
// en asset, déclarée dans pubspec.yaml, jamais par
// google_fonts, pour rester hors ligne et servie par le
// service worker. La police ne sert qu'au titre de
// l'en-tête, les autres polices ne changent pas.
Widget titreEntete({bool desktop = false}) {
  final sigle = desktop ? 44.0 : 32.0;
  final ecart = desktop ? 12.0 : 8.0;
  return LayoutBuilder(
    builder: (context, contraintes) {
      // Taille du titre selon la place, mesurée sur les TTF
      // réels : « CONNEXION PROPHÉTIQUE » en Cinzel gras fait
      // 239,2 px à 16 px, soit 14,95 px par point, plus 0,5 px
      // d'espacement sur 21 caractères, soit 10,5 px. La taille
      // est réduite seulement quand la place manque, par exemple
      // sur la Messagerie, une action de page en plus, environ
      // 11,6 px à 390 px, sans jamais couper le texte, et le
      // laisse à 16 px sur téléphone et 24 px sur ordinateur
      // quand il y a la place. Sans borne, taille pleine, la mise
      // en page reste bornée par l'en-tête lui-même. Le SizedBox
      // borne le texte à la largeur calculée : un enfant non
      // flexible d'une Row reçoit une largeur non bornée et se
      // rendrait à sa largeur intrinsèque, ce qui déborderait
      // la Row.
      final largeurDispo = contraintes.maxWidth.isFinite ? contraintes.maxWidth : (desktop ? 320.0 : 216.0);
      final largeurTexte = (largeurDispo - sigle - ecart).clamp(0.0, double.infinity);
      final taille = desktop
          ? ((largeurTexte - 10.5) / 14.95).clamp(16.0, 24.0)
          : ((largeurTexte - 10.5) / 14.95).clamp(11.0, 16.0);
      return Row(mainAxisSize: MainAxisSize.min, children: [
        headerLogo(size: sigle),
        SizedBox(width: ecart),
        SizedBox(
          width: largeurTexte,
          child: RichText(
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            text: TextSpan(
              style: TextStyle(fontFamily: 'Cinzel', fontSize: taille, fontWeight: FontWeight.w700, letterSpacing: 0.5),
              children: const [
                TextSpan(text: 'CONNEXION', style: TextStyle(color: Color(0xFFE5C158))),
                TextSpan(text: ' PROPHÉTIQUE', style: TextStyle(color: Colors.white)),
              ],
            ),
          ),
        ),
      ]);
    },
  );
}
