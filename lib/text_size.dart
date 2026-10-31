// Taille du texte de lecture, 31 oct. 2026, lot 1 chantier 4 sur 6.
// Un seul réglage local à l'appareil, conservé dans SharedPreferences
// comme les autres préférences locales (cartes masquées, langue), et
// jamais envoyé au serveur. La synchronisation au compte fera l'objet
// d'un autre chantier et n'est pas mélangée ici.
// Le niveau 1 (Normale, facteur 1,0) est le défaut : qui ne touche à
// rien ne voit aucun changement. Les facteurs s'appliquent sur la
// taille de base du texte de lecture seulement, jamais sur les
// boutons, libellés ou la navigation, pour que les mises en page ne
// débordent jamais. La mise à l'échelle du système n'est neutralisée
// nulle part dans l'application : elle continue de s'appliquer par
// dessus ce facteur, comme avant, ce qui préserve l'accessibilité.
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

class TextSize extends ChangeNotifier {
  // Petite, Normale, Grande, Très grande.
  static const factors = [0.85, 1.0, 1.2, 1.4];

  int level = 1;

  double get factor => factors[level.clamp(0, factors.length - 1)];

  bool get canDecrease => level > 0;

  bool get canIncrease => level < factors.length - 1;

  Future<void> load() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      level = (prefs.getInt('text_size_level') ?? 1).clamp(0, factors.length - 1);
    } catch (_) {
      // Sans stockage local, le niveau Normale s'applique en mémoire.
      level = 1;
    }
  }

  Future<void> setLevel(int value) async {
    final v = value.clamp(0, factors.length - 1);
    if (level == v) return;
    level = v;
    notifyListeners();
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setInt('text_size_level', level);
    } catch (_) {
      // L'application continue avec le nouveau niveau en mémoire.
    }
  }

  Future<void> decrease() => setLevel(level - 1);

  Future<void> increase() => setLevel(level + 1);
}

final textSize = TextSize();
