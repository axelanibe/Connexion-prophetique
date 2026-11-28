// Nouvel Accueil, tranche T2, 26 nov. 2026.
// Recherche en pilule blanche, stories, Prière du jour
// (Philippiens 4, 6), quiz, accès rapides, Activités à venir.
// Ni carte de membre ni Mon parcours, ni rubrique Actualités :
// elle vit dans Connexion. T20 : la tuile large Librairie est
// retirée, la maquette n'en a pas sur l'accueil ; les 4 tuiles
// suivent son design exact ; la carte cotisation du mois est
// de retour, et les activités ouvrent la page Camps.
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
    this.evenementId = '',
    this.type = '',
    this.description = '',
    this.tarifFcfa = 0,
    this.inscrits = 0,
    this.nombrePlaces = 0,
    this.dateDebut,
    this.dateFin,
    this.lieu = '',
    this.imageUrl = '',
    this.onTap,
  });
  final String titre;

  /// Identifiant serveur de l'événement, pour l'inscription.
  final String evenementId;

  /// Type serveur, « camp » ou « retraite ».
  final String type;

  /// Description de la structure, vide si non renseignée.
  final String description;

  /// Tarif en FCFA, 0 pour un camp gratuit.
  final int tarifFcfa;

  /// Inscrits et places, 0 si non renseignés.
  final int inscrits;
  final int nombrePlaces;
  final DateTime? dateDebut, dateFin;
  final String lieu;
  final String imageUrl;
  final VoidCallback? onTap;

  /// Copie avec un autre toucher, pour brancher l'ouverture
  /// de la page du camp depuis l'accueil.
  ActiviteAVenir avecTap(VoidCallback? tap) => ActiviteAVenir(
        titre: titre,
        evenementId: evenementId,
        type: type,
        description: description,
        tarifFcfa: tarifFcfa,
        inscrits: inscrits,
        nombrePlaces: nombrePlaces,
        dateDebut: dateDebut,
        dateFin: dateFin,
        lieu: lieu,
        imageUrl: imageUrl,
        onTap: tap,
      );

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
    this.cotisationChargee = false,
    this.cotisationPayee = false,
    this.cotisationEnAttente = false,
    this.onPayerCotisation,
    this.onVoirCamps,
    this.quizEstAdmin = false,
    this.onAjouterQuestionQuiz,
    this.onGererQuestionsQuiz,
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

  /// Cotisation du mois en cours, T20 : chargée par la racine
  /// depuis l'historique des paiements, la carte ne s'affiche
  /// qu'une fois l'état connu.
  final bool cotisationChargee;
  final bool cotisationPayee;
  final bool cotisationEnAttente;
  final VoidCallback? onPayerCotisation;

  /// « Voir tout » des Activités à venir, vers la page Camps.
  final VoidCallback? onVoirCamps;

  /// Gestion du quiz par l'administrateur général, T20.
  final bool quizEstAdmin;
  final VoidCallback? onAjouterQuestionQuiz;
  final VoidCallback? onGererQuestionsQuiz;

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
      padding: EdgeInsets.fromLTRB(16, 16, 16, 24 + MediaQuery.paddingOf(context).bottom),
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
            estAdmin: quizEstAdmin,
            onAjouterQuestion: onAjouterQuestionQuiz,
            onGererQuestions: onGererQuestionsQuiz,
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
        // Correction de suivi, 27 nov. 2026 : quand la
        // cotisation est payée, rien ne s'affiche. Le rappel
        // ne part que par notification, quand elle n'est pas
        // payée.
        if (cotisationChargee && !cotisationPayee) ...[
          const SizedBox(height: 12),
          _CarteCotisation(
            payee: cotisationPayee,
            enAttente: cotisationEnAttente,
            onPayer: onPayerCotisation,
          ),
        ],
        if (aVenir.isNotEmpty) ...[
          const SizedBox(height: 24),
          _TitreSection('Activités à venir',
              action: onVoirCamps == null
                  ? null
                  : TextButton(
                      onPressed: onVoirCamps,
                      child: const Text('Voir tout'),
                    )),
          const SizedBox(height: 12),
          ActivitesAVenir(activites: aVenir),
        ],
      ],
    );
  }
}

/// Titre de section, bleu nuit avec trait doré, maquette.
/// Action facultative à droite, par exemple « Voir tout ».
class _TitreSection extends StatelessWidget {
  const _TitreSection(this.titre, {this.action});
  final String titre;
  final Widget? action;

  @override
  Widget build(BuildContext context) {
    final titreWidget = Column(
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
    final a = action;
    if (a == null) return titreWidget;
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [Expanded(child: titreWidget), a],
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

/// Accès rapides, T20, design exact de la maquette : grille
/// 2 colonnes, écart 11 px, chaque tuile est une carte blanche
/// individuelle, bordure #e3e8f0, rayon 18 px, icône 44 px à
/// gauche sur fond pastel, libellé 14,5 px gras à droite.
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
    final tuiles = <_TuileAcces>[
      const _TuileAcces(
        LucideIcons.church,
        'Structure',
        Color(0xFFE0E9F4),
        PaletteNouvelle.bleuNuit,
      ),
      const _TuileAcces(
        LucideIcons.messageCircle,
        'Témoignages',
        Color(0xFFFDF3D3),
        Color(0xFF8A6410),
      ),
      const _TuileAcces(
        LucideIcons.circleDollarSign,
        'Cotisations',
        Color(0xFFE2F5E9),
        Color(0xFF14713A),
      ),
      const _TuileAcces(
        LucideIcons.circlePlay,
        'Parole vivante',
        Color(0xFFFDF3D3),
        Color(0xFF8A6410),
      ),
    ];
    final rappels = <VoidCallback?>[
      onStructure,
      onTemoignages,
      onCotisations,
      onParoleVivante,
    ];
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        mainAxisSpacing: 11,
        crossAxisSpacing: 11,
        childAspectRatio: 2.35,
      ),
      itemCount: tuiles.length,
      itemBuilder: (context, i) {
        final tuile = tuiles[i];
        return Material(
          color: Colors.white,
          borderRadius: BorderRadius.circular(18),
          child: InkWell(
            borderRadius: BorderRadius.circular(18),
            onTap: rappels[i],
            child: Container(
              padding: const EdgeInsets.fromLTRB(15, 14, 14, 14),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: const Color(0xFFE3E8F0)),
                boxShadow: [
                  BoxShadow(
                    color: PaletteNouvelle.bleuNuit.withValues(alpha: 0.045),
                    blurRadius: 12,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Row(
                children: [
                  Container(
                    width: 44,
                    height: 44,
                    decoration: BoxDecoration(
                      color: tuile.fond,
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: Icon(tuile.icone, color: tuile.couleurIcone, size: 22),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      tuile.libelle,
                      style: const TextStyle(
                        color: Color(0xFF14202F),
                        fontSize: 14.5,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

class _TuileAcces {
  const _TuileAcces(this.icone, this.libelle, this.fond, this.couleurIcone);
  final IconData icone;
  final String libelle;
  final Color fond;
  final Color couleurIcone;
}

/// Carte cotisation du mois, T20, comme l'ancienne version :
/// « Cotisation de [mois] [année] : 1 000 FCFA à régler. » et
/// un bouton or « Payer ma cotisation : 1 000 FCFA ». Payée,
/// la carte montre « payée » avec une coche verte ; en
/// attente, « en attente de validation », sans bouton, pour
/// ne jamais créer deux demandes pour le même mois.
class _CarteCotisation extends StatelessWidget {
  const _CarteCotisation({
    required this.payee,
    required this.enAttente,
    this.onPayer,
  });
  final bool payee;
  final bool enAttente;
  final VoidCallback? onPayer;

  static const _mois = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
  ];

  @override
  Widget build(BuildContext context) {
    final now = DateTime.now();
    final moisAnnee = '${_mois[now.month - 1]} ${now.year}';
    final texte = payee
        ? 'Cotisation de $moisAnnee : payée.'
        : enAttente
            ? 'Cotisation de $moisAnnee : en attente de validation.'
            : 'Cotisation de $moisAnnee : 1 000 FCFA à régler.';
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: PaletteNouvelle.or),
        boxShadow: [
          BoxShadow(
            color: PaletteNouvelle.bleuNuit.withValues(alpha: 0.06),
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: const Color(0xFFF4E9C8),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(
                  payee ? LucideIcons.circleCheck : LucideIcons.wallet,
                  color: payee
                      ? const Color(0xFF14713A)
                      : PaletteNouvelle.orFonce,
                  size: 20,
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  texte,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                    color: PaletteNouvelle.bleuNuit,
                  ),
                ),
              ),
            ],
          ),
          if (!payee && !enAttente) ...[
            const SizedBox(height: 12),
            SizedBox(
              width: double.infinity,
              height: 52,
              child: FilledButton.icon(
                onPressed: onPayer,
                style: FilledButton.styleFrom(
                  backgroundColor: PaletteNouvelle.orFonce,
                  foregroundColor: Colors.white,
                ),
                icon: const Icon(LucideIcons.heart, size: 20),
                label: const Text('Payer ma cotisation : 1 000 FCFA'),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
