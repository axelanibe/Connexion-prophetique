// Nouvel Accueil, tranche T2, 26 nov. 2026.
// Recherche en pilule blanche, stories, Prière du jour
// (Philippiens 4, 6), quiz, accès rapides, tuile large
// Librairie, Activités à venir. Ni carte de membre ni Mon
// parcours, ni rubrique Actualités : elle vit dans Connexion.
// Données fournies par l'application, comme en T1, jamais
// inventées ; la carte de la Prière du jour et les sections
// sans données sont masquées. Non branché dans lib/main.dart,
// la bascule est T11.
import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../stories.dart' show StoriesStrip;
import 'activites_venir.dart';
import 'carte_quiz.dart';
import 'palette.dart';

/// Verset de la Prière du jour, fourni par l'application.
/// Texte lu dans la Bible au moment de l'affichage, jamais
/// recopié en dur. Référence fixe : Philippiens 4, 6
/// (livre 49, chapitre 4, verset 6).
class VersetPriere {
  const VersetPriere({
    required this.texte,
    required this.reference,
    this.livre = 49,
    this.chapitre = 4,
    this.verset = 6,
  });
  final String texte;

  /// « Philippiens 4, 6 », dans la langue de l'application.
  final String reference;
  final int livre, chapitre, verset;
}

/// Activité à venir : un camp ou une retraite, données serveur.
/// dateDebut et dateFin nulles quand la structure ne les a pas
/// renseignées : la carte affiche alors « À confirmer ».
class ActiviteAVenir {
  const ActiviteAVenir({
    required this.titre,
    this.dateDebut,
    this.dateFin,
    this.lieu = '',
    this.imageUrl = '',
    this.onTap,
  });
  final String titre;
  final DateTime? dateDebut, dateFin;
  final String lieu;
  final String imageUrl;
  final VoidCallback? onTap;

  /// En cours : commencée et pas encore terminée.
  bool get enCours {
    final debut = dateDebut;
    if (debut == null) return false;
    final now = DateTime.now();
    if (now.isBefore(debut)) return false;
    final fin = dateFin;
    if (fin != null && now.isAfter(fin)) return false;
    return true;
  }

  /// Terminée : date de fin passée. Jamais affichée.
  bool get terminee {
    final fin = dateFin;
    if (fin == null) return false;
    return DateTime.now().isAfter(fin);
  }
}

class PageAccueil extends StatelessWidget {
  const PageAccueil({
    super.key,
    this.onSearch,
    this.versetPriere,
    this.enEcoute = false,
    this.onEcouter,
    this.onPartager,
    this.onOuvrirBible,
    this.quiz,
    this.onRepondre,
    this.onQuestionSuivante,
    this.onRecommencerQuiz,
    this.onStructure,
    this.onTemoignages,
    this.onCotisations,
    this.onParoleVivante,
    this.onLibrairie,
    this.activites = const [],
    this.bandeStories,
  });

  /// Ouvre la recherche globale existante.
  final VoidCallback? onSearch;

  /// Verset fixe de la Prière du jour, null sans données.
  final VersetPriere? versetPriere;

  /// Lecture en cours, Écouter devient Arrêter.
  final bool enEcoute;
  final VoidCallback? onEcouter;
  final VoidCallback? onPartager;

  /// Ouvre Philippiens 4 dans la Bible.
  final VoidCallback? onOuvrirBible;

  /// Quiz du moment, null sans quiz disponible.
  final QuizAccueil? quiz;
  final ValueChanged<int>? onRepondre;
  final VoidCallback? onQuestionSuivante;
  final VoidCallback? onRecommencerQuiz;

  /// Accès rapides.
  final VoidCallback? onStructure;
  final VoidCallback? onTemoignages;
  final VoidCallback? onCotisations;
  final VoidCallback? onParoleVivante;

  /// Tuile large Librairie, ouvre l'onglet Librairie.
  final VoidCallback? onLibrairie;

  /// Camps et retraites, la page écarte les terminées.
  final List<ActiviteAVenir> activites;

  /// Bande des stories, injectée pour les tests, la vraie
  /// bande charge seule depuis l'API sinon.
  final Widget? bandeStories;

  @override
  Widget build(BuildContext context) {
    final verset = versetPriere;
    final quizActuel = quiz;
    final aVenir = activites.where((a) => !a.terminee).toList();
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 24),
      children: [
        _BarreRecherche(onSearch: onSearch),
        const SizedBox(height: 12),
        bandeStories ?? const StoriesStrip(),
        if (verset != null) ...[
          _CartePriere(
            verset: verset,
            enEcoute: enEcoute,
            onEcouter: onEcouter,
            onPartager: onPartager,
            onOuvrirBible: onOuvrirBible,
          ),
          const SizedBox(height: 24),
        ],
        if (quizActuel != null) ...[
          CarteQuizAccueil(
            quiz: quizActuel,
            onRepondre: onRepondre,
            onQuestionSuivante: onQuestionSuivante,
            onRecommencer: onRecommencerQuiz,
          ),
          const SizedBox(height: 24),
        ],
        const _TitreSection('Accès rapides'),
        const SizedBox(height: 12),
        _AccesRapides(
          onStructure: onStructure,
          onTemoignages: onTemoignages,
          onCotisations: onCotisations,
          onParoleVivante: onParoleVivante,
        ),
        const SizedBox(height: 12),
        _TuileLargeLibrairie(onTap: onLibrairie),
        if (aVenir.isNotEmpty) ...[
          const SizedBox(height: 24),
          const _TitreSection('Activités à venir'),
          const SizedBox(height: 12),
          ActivitesAVenir(activites: aVenir),
        ],
      ],
    );
  }
}

/// Titre de section, bleu nuit avec trait doré, maquette.
class _TitreSection extends StatelessWidget {
  const _TitreSection(this.titre);
  final String titre;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          titre,
          style: const TextStyle(
            color: PaletteNouvelle.bleuNuit,
            fontSize: 17,
            fontWeight: FontWeight.w800,
          ),
        ),
        const SizedBox(height: 6),
        Container(
          width: 28,
          height: 3,
          decoration: BoxDecoration(
            color: PaletteNouvelle.or,
            borderRadius: BorderRadius.circular(2),
          ),
        ),
      ],
    );
  }
}

/// Barre de recherche de l'accueil, pilule blanche avec loupe
/// dorée, un toucher ouvre la recherche globale existante.
class _BarreRecherche extends StatelessWidget {
  const _BarreRecherche({required this.onSearch});
  final VoidCallback? onSearch;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.white,
      borderRadius: BorderRadius.circular(24),
      child: InkWell(
        borderRadius: BorderRadius.circular(24),
        onTap: onSearch,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(24),
            border: Border.all(color: const Color(0xFFE3E7EE)),
          ),
          child: const Row(children: [
            Icon(LucideIcons.search, color: PaletteNouvelle.orFonce, size: 20),
            SizedBox(width: 8),
            Text('Rechercher…', style: TextStyle(color: Colors.grey, fontSize: 14)),
          ]),
        ),
      ),
    );
  }
}

/// Prière du jour, verset fixe Philippiens 4, 6.
/// Haut blanc, crème seulement en bas, après le trait, là où
/// sont Écouter, Partager et Ouvrir dans la Bible.
class _CartePriere extends StatelessWidget {
  const _CartePriere({
    required this.verset,
    required this.enEcoute,
    this.onEcouter,
    this.onPartager,
    this.onOuvrirBible,
  });
  final VersetPriere verset;
  final bool enEcoute;
  final VoidCallback? onEcouter;
  final VoidCallback? onPartager;
  final VoidCallback? onOuvrirBible;

  /// Crème doré de la seconde partie de la carte.
  static const _creme = Color(0xFFFAF3DC);

  @override
  Widget build(BuildContext context) {
    return Container(
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFE3E7EE)),
        boxShadow: [
          BoxShadow(
            color: PaletteNouvelle.bleuNuit.withValues(alpha: 0.07),
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 18, 20, 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'PRIÈRE DU JOUR',
                  style: TextStyle(
                    color: PaletteNouvelle.orFonce,
                    fontSize: 12,
                    fontWeight: FontWeight.w800,
                    letterSpacing: 1.5,
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  verset.texte,
                  style: const TextStyle(
                    fontFamily: 'Public Sans',
                    fontFamilyFallback: ['Georgia', 'serif'],
                    fontStyle: FontStyle.italic,
                    color: PaletteNouvelle.bleuNuit,
                    fontSize: 17,
                    height: 1.4,
                  ),
                ),
                const SizedBox(height: 10),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  decoration: BoxDecoration(
                    color: PaletteNouvelle.or.withValues(alpha: 0.18),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    verset.reference,
                    style: const TextStyle(
                      color: PaletteNouvelle.orFonce,
                      fontSize: 13,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ),
              ],
            ),
          ),
          Container(height: 1, color: PaletteNouvelle.or.withValues(alpha: 0.35)),
          Container(
            color: _creme,
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            child: Row(
              children: [
                Expanded(
                  flex: 1,
                  child: TextButton.icon(
                    onPressed: onEcouter,
                    style: TextButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 4)),
                    icon: Icon(
                      enEcoute ? LucideIcons.square : LucideIcons.headphones,
                      size: 16,
                      color: PaletteNouvelle.bleuNuit,
                    ),
                    label: Text(
                      enEcoute ? 'Arrêter' : 'Écouter',
                      style: const TextStyle(color: PaletteNouvelle.bleuNuit, fontSize: 12, fontWeight: FontWeight.w700),
                    ),
                  ),
                ),
                Expanded(
                  flex: 1,
                  child: TextButton.icon(
                    onPressed: onPartager,
                    style: TextButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 4)),
                    icon: const Icon(LucideIcons.share2, size: 16, color: PaletteNouvelle.bleuNuit),
                    label: const Text(
                      'Partager',
                      style: TextStyle(color: PaletteNouvelle.bleuNuit, fontSize: 12, fontWeight: FontWeight.w700),
                    ),
                  ),
                ),
                Expanded(
                  flex: 2,
                  child: TextButton(
                    onPressed: onOuvrirBible,
                    style: TextButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 4)),
                    child: const Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Flexible(
                          child: Text(
                            'Ouvrir dans la Bible',
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: TextStyle(color: PaletteNouvelle.bleuNuit, fontSize: 12, fontWeight: FontWeight.w700),
                          ),
                        ),
                        SizedBox(width: 4),
                        Icon(LucideIcons.arrowRight, size: 16, color: PaletteNouvelle.bleuNuit),
                      ],
                    ),
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

/// Accès rapides, 2x2, icône et nom seulement, coins ronds,
/// ombres légères, comme la maquette.
class _AccesRapides extends StatelessWidget {
  const _AccesRapides({
    this.onStructure,
    this.onTemoignages,
    this.onCotisations,
    this.onParoleVivante,
  });
  final VoidCallback? onStructure;
  final VoidCallback? onTemoignages;
  final VoidCallback? onCotisations;
  final VoidCallback? onParoleVivante;

  @override
  Widget build(BuildContext context) {
    final tuiles = <(IconData, String, VoidCallback?)>[
      (LucideIcons.church, 'Structure', onStructure),
      (LucideIcons.messageCircle, 'Témoignages', onTemoignages),
      (LucideIcons.circleDollarSign, 'Cotisations', onCotisations),
      (LucideIcons.circlePlay, 'Parole vivante', onParoleVivante),
    ];
    Widget cellule((IconData, String, VoidCallback?) tuile) {
      return InkWell(
        borderRadius: BorderRadius.circular(16),
        onTap: tuile.$3,
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 4),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: PaletteNouvelle.bleuNuit,
                  borderRadius: BorderRadius.circular(14),
                ),
                child: Icon(tuile.$1, color: PaletteNouvelle.or, size: 24),
              ),
              const SizedBox(height: 8),
              Text(
                tuile.$2,
                textAlign: TextAlign.center,
                style: const TextStyle(color: PaletteNouvelle.bleuNuit, fontSize: 15, fontWeight: FontWeight.w800),
              ),
            ],
          ),
        ),
      );
    }

    return Container(
      padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: const Color(0xFFE3E7EE)),
        boxShadow: [
          BoxShadow(
            color: PaletteNouvelle.bleuNuit.withValues(alpha: 0.06),
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          Row(children: [Expanded(child: cellule(tuiles[0])), Expanded(child: cellule(tuiles[1]))]),
          const SizedBox(height: 20),
          Row(children: [Expanded(child: cellule(tuiles[2])), Expanded(child: cellule(tuiles[3]))]),
        ],
      ),
    );
  }
}

/// Tuile large Librairie, en bas des accès rapides.
class _TuileLargeLibrairie extends StatelessWidget {
  const _TuileLargeLibrairie({this.onTap});
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(22),
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(22),
          border: Border.all(color: const Color(0xFFE3E7EE)),
          boxShadow: [
            BoxShadow(
              color: PaletteNouvelle.bleuNuit.withValues(alpha: 0.06),
              blurRadius: 16,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                color: PaletteNouvelle.bleuNuit,
                borderRadius: BorderRadius.circular(14),
              ),
              child: const Icon(LucideIcons.shoppingBag, color: PaletteNouvelle.or, size: 24),
            ),
            const SizedBox(width: 12),
            const Expanded(
              child: Text(
                'Librairie',
                style: TextStyle(color: PaletteNouvelle.bleuNuit, fontSize: 17, fontWeight: FontWeight.w800),
              ),
            ),
            const Icon(LucideIcons.chevronRight, color: Colors.grey, size: 22),
          ],
        ),
      ),
    );
  }
}
