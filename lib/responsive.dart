// Dispositions par largeur, 30 oct. 2026, phase 1 ordinateur.
// Une seule application, un seul code : seule la disposition change
// selon la largeur de l'écran, jamais le contenu ni les fonctions.
// Téléphone, moins de 600 px : inchangé, il reste la référence.
// Tablette, de 600 à 1000 px : grilles aérées, marge basse renforcée.
// Ordinateur, au delà de 1000 px : contenu centré, colonne lisible.
import 'package:flutter/widgets.dart';

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
  // Téléphone : 0, aucun changement visible.
  static double bottomClearance(BuildContext context) => isWide(context) ? 96.0 : 0.0;

  // Colonnes de la grille Découvrir : 2 sur téléphone et tablette,
  // 3 sur ordinateur, où la colonne centrée laisse respirer les tuiles.
  static int decouvrirColumns(BuildContext context) => isDesktop(context) ? 3 : 2;
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
