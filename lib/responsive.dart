// Dispositions par largeur, 30 oct. 2026, phase 1 ordinateur.
// Une seule application, un seul code : seule la disposition change
// selon la largeur de l'écran, jamais le contenu ni les fonctions.
// Téléphone, moins de 600 px : inchangé, il reste la référence.
// Tablette, de 600 à 1000 px : grilles aérées, marge basse renforcée.
// Ordinateur, au delà de 1000 px : contenu centré, colonne lisible.
import 'dart:ui' as ui;

import 'package:flutter/material.dart';

class Rx {
  Rx._();

  static double width(BuildContext context) => MediaQuery.sizeOf(context).width;

  static bool isPhone(BuildContext context) => width(context) < 600;

  static bool isTablet(BuildContext context) {
    final w = width(context);
    return w >= 600 && w <= 1000;
  }

  static bool isDesktop(BuildContext context) => width(context) > 1000;

  static bool isWide(BuildContext context) => width(context) >= 600;

  // Marge basse supplémentaire sur tablette et ordinateur, pour que
  // la barre du bas ne cache plus jamais le bas d'une page.
  // 150 px couvrent la barre du bas (environ 69 px) plus le mini
  // lecteur audio (environ 64 px) quand il est affiché, 30 oct.
  // 2026 : le bas de page reste entièrement visible, même avec un
  // audio en cours. Téléphone : 0, aucun changement visible.
  static double bottomClearance(BuildContext context) => isWide(context) ? 150.0 : 0.0;

  // Colonnes de la grille Découvrir : 2 sur téléphone et tablette,
  // 3 sur ordinateur, où la colonne centrée laisse respirer les tuiles.
  static int decouvrirColumns(BuildContext context) => isDesktop(context) ? 3 : 2;
}

/// Défilement ordinateur, 30 oct. 2026 : molette, pavé tactile,
/// tactile, stylet et glisser à la souris partout ; barre de
/// défilement verticale toujours visible sur ordinateur, pour que
/// l'utilisateur voie où il en est dans la page. Téléphone et
/// tablette : comportement par défaut, inchangé.
class AppScrollBehavior extends MaterialScrollBehavior {
  @override
  Set<ui.PointerDeviceKind> get dragDevices => {
        ui.PointerDeviceKind.touch,
        ui.PointerDeviceKind.mouse,
        ui.PointerDeviceKind.stylus,
        ui.PointerDeviceKind.trackpad,
        ui.PointerDeviceKind.unknown,
      };

  @override
  Widget buildScrollbar(BuildContext context, Widget child, ScrollableDetails details) {
    final vertical = details.direction == AxisDirection.down || details.direction == AxisDirection.up;
    if (vertical && details.controller != null && Rx.isDesktop(context)) {
      return Scrollbar(
        controller: details.controller,
        thumbVisibility: true,
        thickness: 10,
        radius: const Radius.circular(8),
        child: child,
      );
    }
    return super.buildScrollbar(context, child, details);
  }
}

/// Centrage ordinateur : au delà de 1000 px de large, le contenu est
/// centré dans une colonne de 1100 px au plus, avec des marges
/// automatiques de chaque côté. En dessous, l'enfant est rendu tel
/// quel, sans aucun changement. La hauteur reste celle du parent,
/// pour que les listes défilantes gardent une hauteur bornée.
class WideCenter extends StatelessWidget {
  const WideCenter({super.key, required this.child});
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: (context, constraints) {
      final maxW = constraints.maxWidth;
      final maxH = constraints.maxHeight;
      if (maxW <= 1000 || maxH.isInfinite) return child;
      final w = maxW < 1100.0 ? maxW : 1100.0;
      return Align(
        alignment: Alignment.topCenter,
        child: SizedBox(width: w, height: maxH, child: child),
      );
    });
  }
}
