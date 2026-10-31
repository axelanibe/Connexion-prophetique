// Dispositions par largeur, 30 oct. 2026, phase 1 ordinateur.
// Une seule application, un seul code : seule la disposition change
// selon la largeur de l'écran, jamais le contenu ni les fonctions.
// Téléphone, moins de 600 px : inchangé, il reste la référence.
// Tablette, de 600 à 1000 px : grilles aérées, marge basse renforcée.
// Ordinateur, au delà de 1000 px : contenu centré, colonne lisible.
import 'dart:ui' as ui;

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

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

/// Défilement au clavier sur ordinateur web, 30 oct. 2026.
/// Sur le web, la molette défile sans focus, mais les touches ne
/// déplacent rien tant qu'aucun élément du défilement n'a le focus :
/// après un clic sur la barre du bas, le focus reste sur le bouton
/// et les flèches ne trouvent aucun défilement. Ce widget entoure
/// le contenu défilant et intercepte les touches non déjà traitées
/// pour déplacer le contrôleur de la page : un champ de texte garde
/// ses flèches pour le curseur, et un bouton ciblé garde Entrée
/// pour s'activer, car ces touches sont déjà consommées avant de
/// remonter jusqu'ici. Espace est volontairement exclu : sur le
/// web, Espace active d'abord un bouton ciblé, et ce gestionnaire,
/// placé avant les raccourcis de l'application, avalerait la touche
/// avant l'activation. Les combinaisons avec Ctrl, Cmd ou Alt sont
/// ignorées, pour ne pas voler les raccourcis. Web ordinateur
/// seulement : téléphone et tablette gardent le comportement par
/// défaut, inchangé.
class KeyboardScroll extends StatelessWidget {
  const KeyboardScroll(
      {super.key, this.controller, this.forceEnabled, required this.child});
  final ScrollController? controller;

  /// Test uniquement : force l'activation hors web, où kIsWeb vaut
  /// faux. En production, ce paramètre reste null et l'activation
  /// suit la règle normale, web ordinateur seulement.
  final bool? forceEnabled;
  final Widget child;

  KeyEventResult _onKey(FocusNode node, KeyEvent event, BuildContext context) {
    if (event is! KeyDownEvent && event is! KeyRepeatEvent) {
      return KeyEventResult.ignored;
    }
    final pressed = HardwareKeyboard.instance.logicalKeysPressed;
    if (pressed.contains(LogicalKeyboardKey.controlLeft) ||
        pressed.contains(LogicalKeyboardKey.controlRight) ||
        pressed.contains(LogicalKeyboardKey.metaLeft) ||
        pressed.contains(LogicalKeyboardKey.metaRight) ||
        pressed.contains(LogicalKeyboardKey.altLeft) ||
        pressed.contains(LogicalKeyboardKey.altRight)) {
      return KeyEventResult.ignored;
    }
    final c = controller ?? PrimaryScrollController.maybeOf(context);
    if (c == null || !c.hasClients) return KeyEventResult.ignored;
    final pos = c.position;
    final view = pos.viewportDimension;
    double? target;
    if (event.logicalKey == LogicalKeyboardKey.arrowDown) {
      target = pos.pixels + 80;
    } else if (event.logicalKey == LogicalKeyboardKey.arrowUp) {
      target = pos.pixels - 80;
    } else if (event.logicalKey == LogicalKeyboardKey.pageDown) {
      target = pos.pixels + view * 0.9;
    } else if (event.logicalKey == LogicalKeyboardKey.pageUp) {
      target = pos.pixels - view * 0.9;
    } else if (event.logicalKey == LogicalKeyboardKey.home) {
      target = pos.minScrollExtent;
    } else if (event.logicalKey == LogicalKeyboardKey.end) {
      target = pos.maxScrollExtent;
    }
    if (target == null) return KeyEventResult.ignored;
    final clamped =
        target.clamp(pos.minScrollExtent, pos.maxScrollExtent).toDouble();
    if (clamped == pos.pixels) return KeyEventResult.ignored;
    c.animateTo(clamped,
        duration: const Duration(milliseconds: 180), curve: Curves.easeOut);
    return KeyEventResult.handled;
  }

  @override
  Widget build(BuildContext context) {
    if (!(forceEnabled ?? (kIsWeb && Rx.isDesktop(context)))) return child;
    return Focus(
      autofocus: true,
      onKeyEvent: (node, event) => _onKey(node, event, context),
      child: child,
    );
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
