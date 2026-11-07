// Système UX soft global, tranche du 4 nov. 2026.
// Appliqué sans changer les données, les règles, les prix, les
// moyens de paiement ni les parcours. Les totaux affichés par les
// graphiques viennent toujours du serveur, seuls les paiements
// confirmés comptent dans un total encaissé, jamais un total
// inventé. Les moyens restent Wave, PayPal et les espèces.
// Aucun fichier SVG réel n'existe dans le projet (vérifié le
// 4 nov. 2026 : aucun .svg sous lib/, assets/ ou web/), donc
// aucun tracé n'est traduit en icône Material ici et aucun tracé
// n'est inventé : les icônes Material actuelles sont gardées.
// Aucun fichier Lottie JSON libre et vérifiable n'existe dans le
// projet, donc aucune animation Lottie n'est ajoutée : télécharger
// un fichier inconnu ou inventer une animation est interdit par
// la tranche. Voir le rapport remis au parent.
import 'package:cached_network_image/cached_network_image.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shimmer/shimmer.dart';

/// Couleurs globales, identiques à celles déjà en place dans
/// lib/main.dart (classe Cp) : bleu nuit #0B1F3A, or #D4A72C.
/// La page Carte de membre a ses propres consignes modèle et
/// n'est pas retouchée par cette tranche.
class Ux {
  Ux._();
  static const navy = Color(0xFF0B1F3A);
  static const gold = Color(0xFFD4A72C);
  static const goldDeep = Color(0xFF8A6A12);
  static const paper = Color(0xFFF5F6FA);
  static const card = Color(0xFFFFFFFF);
  static const ink = Color(0xFF0B1F3A);
  static const inkMuted = Color(0xFF55607A);
  static const line = Color(0xFFE2E5EE);

  /// Texte courant, Plus Jakarta Sans, avec repli système si la
  /// police n'est pas disponible hors ligne : la liste de repli
  /// laisse Flutter choisir une police système lisible au lieu
  /// de bloquer ou d'afficher un carré.
  static TextStyle body({
    double size = 14,
    FontWeight weight = FontWeight.w400,
    Color color = inkMuted,
    double height = 1.45,
  }) =>
      GoogleFonts.plusJakartaSans(
        fontSize: size,
        fontWeight: weight,
        color: color,
        height: height,
      ).copyWith(fontFamilyFallback: const ['Roboto', 'Segoe UI', 'sans-serif']);

  /// Texte biblique, Lora, tranche du 4 nov. 2026, choisie par Axel :
  /// serif lisible et moderne, pour le texte des versets seulement,
  /// jamais pour les titres ni pour le reste de l'application.
  /// Repli système serif si Lora n'est pas disponible hors ligne :
  /// la liste de repli laisse Flutter choisir une police serif
  /// système au lieu de bloquer ou d'afficher un carré. La taille
  /// globale réglable par le membre s'applique toujours, via
  /// textSize.factor, à l'endroit où le verset est affiché.
  static TextStyle bible({
    double size = 16,
    FontWeight weight = FontWeight.w400,
    Color color = ink,
    double height = 1.6,
  }) =>
      GoogleFonts.lora(
        fontSize: size,
        fontWeight: weight,
        color: color,
        height: height,
      ).copyWith(fontFamilyFallback: const ['Georgia', 'serif']);

  /// Titres, Outfit, même repli système que le texte courant.
  static TextStyle title({
    double size = 16,
    FontWeight weight = FontWeight.w700,
    Color color = ink,
    double height = 1.3,
  }) =>
      GoogleFonts.outfit(
        fontSize: size,
        fontWeight: weight,
        color: color,
        height: height,
      ).copyWith(fontFamilyFallback: const ['Roboto', 'Segoe UI', 'sans-serif']);

  /// Marge horizontale douce selon la largeur : téléphone 16,
  /// tablette 24, ordinateur 32. Les écrans ordinateur existants
  /// (centrage WideCenter) ne sont pas modifiés.
  static double paddingHorizontal(BuildContext context) {
    final w = MediaQuery.sizeOf(context).width;
    if (w > 1000) return 32;
    if (w >= 600) return 24;
    return 16;
  }

  /// Nombre de colonnes d'une grille selon la largeur, sans
  /// changer le contenu : 2 sur téléphone, 3 sur tablette et
  /// ordinateur, pour éviter tout texte coupé ou débordement.
  static int gridColumns(BuildContext context) =>
      MediaQuery.sizeOf(context).width >= 600 ? 3 : 2;
}

/// Carte douce : coins arrondis 20, bordure fine, ombre douce.
/// Ne change ni le contenu ni l'ordre des écrans.
class UxSoftCard extends StatelessWidget {
  const UxSoftCard({super.key, required this.child, this.onTap, this.padding});
  final Widget child;
  final VoidCallback? onTap;
  final EdgeInsetsGeometry? padding;

  @override
  Widget build(BuildContext context) {
    final card = Container(
      padding: padding ?? const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Ux.card,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Ux.line),
        boxShadow: [
          BoxShadow(
            color: Ux.navy.withValues(alpha: 0.06),
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: child,
    );
    if (onTap == null) return card;
    return InkWell(
      borderRadius: BorderRadius.circular(20),
      onTap: onTap,
      child: card,
    );
  }
}

/// Apparition douce d'une carte : fondu et léger glissement,
/// 250 ms, sans délai, sans bloquer un toucher. En mode
/// mouvement réduit, l'enfant est rendu tel quel, sans animation.
class UxFade extends StatelessWidget {
  const UxFade({super.key, required this.child});
  final Widget child;

  @override
  Widget build(BuildContext context) {
    if (MediaQuery.of(context).disableAnimations) return child;
    return child
        .animate()
        .fade(duration: const Duration(milliseconds: 250))
        .slideY(begin: 0.03, end: 0, duration: const Duration(milliseconds: 250));
  }
}

/// Image réseau en cache : photo de couverture de livre, de camp,
/// d'établissement, d'enseignement ou d'actualité, servie par le
/// serveur. Pendant le chargement, un bloc doux à la place de
/// l'image ; si l'image manque ou échoue, rien n'est affiché,
/// comme avant, jamais une image inventée. Les photos de profil
/// des membres restent sur leur fournisseur actuel (données
/// locales ou adresse blob web), elles ne passent pas par ici.
class UxNetworkImage extends StatelessWidget {
  const UxNetworkImage(
    this.url, {
    super.key,
    this.height = 160,
    this.width,
    this.fit = BoxFit.cover,
    this.radius = 14,
  });
  final String url;
  final double height;
  final double? width;
  final BoxFit fit;
  final double radius;

  @override
  Widget build(BuildContext context) {
    if (url.isEmpty) return const SizedBox.shrink();
    return ClipRRect(
      borderRadius: BorderRadius.circular(radius),
      child: CachedNetworkImage(
        imageUrl: url,
        height: height,
        width: width ?? double.infinity,
        fit: fit,
        // Carte 79, 7 nov. 2026 : CachedNetworkImage vaut
        // FilterQuality.low par defaut, le filtre le plus faible,
        // et aucune largeur de cache n'est fixee ici, pour garder
        // le decodage pleine resolution : l'image serveur, servie
        // telle quelle par /fichiers, sans redimensionnement,
        // est reduite avec le meilleur filtre disponible.
        filterQuality: FilterQuality.high,
        placeholder: (context, _) => Container(
          height: height,
          width: width ?? double.infinity,
          color: Ux.paper,
          child: const Center(
            child: Icon(Icons.image_outlined, color: Ux.inkMuted),
          ),
        ),
        errorWidget: (context, _, __) => const SizedBox.shrink(),
      ),
    );
  }
}

/// Chargement doux, à la place d'un écran vide ou d'un simple
/// spinner en pleine page : barres grisées animées, même largeur
/// que la liste attendue. Les petits spinners dans les boutons
/// sont gardés tels quels, ils indiquent une action en cours.
class UxShimmerList extends StatelessWidget {
  const UxShimmerList({super.key, this.itemCount = 5});
  final int itemCount;

  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      baseColor: const Color(0xFFE2E5EE),
      highlightColor: const Color(0xFFF5F6FA),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          for (var i = 0; i < itemCount; i++)
            Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: Container(
                height: 64,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

/// Une barre d'un graphique : libellé affiché sous la barre et
/// valeur confirmée venue du serveur, jamais recalculée ici.
class UxBarValue {
  const UxBarValue(this.label, this.value);
  final String label;
  final int value;
}

/// Graphique en barres fl_chart, bleu nuit et or, hauteur
/// adaptée à l'écran par flutter_screenutil. Les valeurs sont
/// celles passées par l'appelant, venues du serveur.
class UxBarChart extends StatelessWidget {
  const UxBarChart({super.key, required this.values, this.height = 180});
  final List<UxBarValue> values;
  final double height;

  @override
  Widget build(BuildContext context) {
    var maxValue = 0;
    for (final v in values) {
      if (v.value > maxValue) maxValue = v.value;
    }
    final top = maxValue == 0 ? 1 : maxValue;
    return SizedBox(
      height: height.h,
      child: BarChart(
        BarChartData(
          maxY: top.toDouble() * 1.15,
          gridData: const FlGridData(show: false),
          borderData: FlBorderData(show: false),
          titlesData: FlTitlesData(
            leftTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
            topTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
            rightTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
            bottomTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: true,
                getTitlesWidget: (value, _) {
                  final i = value.toInt();
                  if (i < 0 || i >= values.length) return const SizedBox.shrink();
                  return Padding(
                    padding: const EdgeInsets.only(top: 4),
                    child: Text(
                      values[i].label,
                      style: Ux.body(size: 11, color: Ux.inkMuted),
                      overflow: TextOverflow.ellipsis,
                    ),
                  );
                },
              ),
            ),
          ),
          barGroups: [
            for (var i = 0; i < values.length; i++)
              BarChartGroupData(
                x: i,
                barRods: [
                  BarChartRodData(
                    toY: values[i].value.toDouble(),
                    color: values[i].value > 0 ? Ux.gold : Ux.line,
                    width: 18,
                    borderRadius: BorderRadius.circular(6),
                  ),
                ],
              ),
          ],
        ),
      ),
    );
  }
}

/// Une part d'un graphique en répartition : libellé, nombre et
/// montant confirmé venus du serveur.
class UxPieValue {
  const UxPieValue(this.label, this.count, this.total);
  final String label;
  final int count;
  final int total;
}

/// Répartition fl_chart (camembert) : les parts sont les valeurs
/// passées par l'appelant. Une part à zéro est omise, pour ne
/// pas afficher une part vide. Les couleurs restent bleu nuit,
/// or et leurs déclinaisons douces.
class UxPieChart extends StatelessWidget {
  const UxPieChart({super.key, required this.values, this.height = 180});
  final List<UxPieValue> values;
  final double height;

  static const _colors = [
    Ux.navy,
    Ux.gold,
    Ux.goldDeep,
    Ux.inkMuted,
    Color(0xFFB8C0D0),
  ];

  @override
  Widget build(BuildContext context) {
    final parts = values.where((v) => v.total > 0).toList();
    if (parts.isEmpty) return const SizedBox.shrink();
    var total = 0;
    for (final v in parts) {
      total += v.total;
    }
    return SizedBox(
      height: height.h,
      child: Row(
        children: [
          Expanded(
            child: PieChart(
              PieChartData(
                sectionsSpace: 2,
                centerSpaceRadius: 28,
                sections: [
                  for (var i = 0; i < parts.length; i++)
                    PieChartSectionData(
                      color: _colors[i % _colors.length],
                      value: parts[i].total.toDouble(),
                      title: total > 0
                          ? '${(parts[i].total / total * 100).round()} %'
                          : '',
                      radius: 28,
                      titleStyle: Ux.body(size: 11, weight: FontWeight.w700, color: Colors.white),
                    ),
                ],
              ),
            ),
          ),
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                for (var i = 0; i < parts.length; i++)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 6),
                    child: Row(
                      children: [
                        Container(
                          width: 10,
                          height: 10,
                          decoration: BoxDecoration(
                            color: _colors[i % _colors.length],
                            shape: BoxShape.circle,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            '${parts[i].label} · ${parts[i].count}',
                            style: Ux.body(size: 12, color: Ux.navy, weight: FontWeight.w700),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
