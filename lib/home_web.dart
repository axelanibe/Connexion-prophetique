// ═══════════════════════════════════════════════════════════════════
//  CONNEXION PROPHÉTIQUE — Accueil Flutter fidèle à la version web
//  (relevé sur 6 captures de la version web, mode visiteur, fourni par
//  un autre assistant le 27 octobre 2026)
//
//  Fichier autonome : Flutter seulement, aucune dépendance externe.
//  Il ne contient AUCUN contenu : verset, rendez-vous, quiz et actualités
//  sont passés en paramètres (viennent du serveur / de l'état de l'app).
//  La section DÉMONSTRATION du code fourni a été retirée : le projet a
//  déjà son main dans lib/main.dart, un second main casserait la build.
//
//  Adaptations d'intégration, documentées, sans changer le rendu web :
//   - _BottomNav est devenu BottomNavWeb (public), pour que l'AppShell
//     puisse l'utiliser comme seule barre du bas, sans double barre.
//   - HomeWeb accepte showBottomNav (false quand il est intégré dans
//     l'AppShell, qui porte alors BottomNavWeb) et un bandeau hors ligne
//     facultatif (offline / onRetry), qui reprend la mention hors ligne
//     déjà présente dans l'ancien accueil.
//   - L'adresse de structure est passée en paramètre depuis main.dart
//     (constante existante), jamais écrite en dur ici.
//
//  Couleurs et tailles : relevées à l'œil sur les captures (l'artefact web
//  n'expose pas son code). Elles sont toutes dans la classe W : si une valeur
//  exacte est connue, il suffit de la corriger à cet endroit.
//
//  Icônes : équivalents Material en trait fin. Elles sont toutes dans la
//  classe Ic : pour passer à Lucide (celles du web), seule cette classe change.
//
//  Images facultatives (repli sans image si absentes) :
//   - logo carré CP        -> paramètre logo
//   - fond du verset       -> assets/verse_bg.jpg   (Bible ouverte + rayons)
//   - image du rendez-vous -> paramètre HomeEvent.image
// ═══════════════════════════════════════════════════════════════════

import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'i18n.dart';
import 'text_size.dart';
import 'remote_config.dart';
import 'responsive.dart';
import 'header_logo.dart';

// ───────────────────────── Palette (relevée sur le web) ─────────────────────────
class W {
  W._();
  static const paper = Color(0xFFF4F6FA); // fond des écrans
  static const header = Color(0xFF1B2842); // bandeau du haut
  static const headerLine = Color(0xFF2B3A58);
  static const banner = Color(0xFF2E3539); // bandeau mode visiteur
  static const navy = Color(0xFF0F1E3C); // tuiles, cartes sombres
  static const navyDeep = Color(0xFF101E3C);
  static const navySoft = Color(0xFF22324E); // carte intérieure du héros
  static const navySoftLine = Color(0xFF2E3F5F);
  static const gold = Color(0xFFD4A72C); // or sur fond sombre
  static const goldFill = Color(0xFFC9A844); // boutons or pleins
  static const goldBtn = Color(0xFF82682A); // bouton S'inscrire
  static const goldDeep = Color(0xFF8A6A12); // or sur fond clair
  static const goldLine = Color(0xFFEBD98E); // bordures dorées claires
  static const ink = Color(0xFF0F1E3C); // texte principal
  static const muted = Color(0xFF5E687C); // texte secondaire
  static const label = Color(0xFF5A6479); // titres de section en capitales
  static const line = Color(0xFFE4E7EF); // bordures claires
  static const lineStrong = Color(0xFFDDE1EA);
  static const onDarkMuted = Color(0xFFA9B2C4);
  static const navText = Color(0xFFAEB6C8);
}

// ───────────────────────── Icônes (un seul endroit) ─────────────────────────
class Ic {
  Ic._();
  static const bible = Icons.auto_stories_outlined;
  static const quiz = Icons.star_border_rounded;
  static const audio = Icons.volume_up_outlined;
  static const flame = Icons.local_fire_department_outlined;
  static const camp = Icons.change_history_outlined;
  static const school = Icons.apartment_outlined;
  static const news = Icons.chat_bubble_outline_rounded;
  static const shop = Icons.shopping_bag_outlined;
  static const card = Icons.credit_card_outlined;
  static const globe = Icons.language_outlined;
  static const eye = Icons.visibility_outlined;
  static const shield = Icons.verified_user_outlined;
  static const mail = Icons.mail_outline_rounded;
  static const calendar = Icons.calendar_today_outlined;
  static const pin = Icons.location_on_outlined;
  static const chevron = Icons.chevron_right_rounded;
  static const users = Icons.group_outlined;
  static const plus = Icons.add_outlined;
  static const home = Icons.home_outlined;
  static const book = Icons.book_outlined;
  static const share = Icons.share_outlined;
}

// ───────────────────────── Données (fournies par l'application) ─────────────────────────
class HomeVerse {
  const HomeVerse({required this.text, required this.ref, required this.version});
  final String text, ref, version;
}

class HomeEvent {
  const HomeEvent({required this.title, this.date, this.place, this.image, this.onTap});
  final String title;
  final String? date, place; // null = « À confirmer »
  final ImageProvider? image;
  final VoidCallback? onTap;
}

// Annonce audio, 29 oct. 2026 : carte façon Wave sur l'accueil.
// Données fournies par l'application, comme les rendez-vous.
// onToggle lance ou met en pause l'écoute, onDismiss ferme la
// carte immédiatement, sans écoute.
class HomeAnnonce {
  const HomeAnnonce({required this.id, required this.title, this.text = '', required this.playing, required this.onToggle, required this.onDismiss});
  final String id, title, text;
  final bool playing;
  final VoidCallback onToggle, onDismiss;
}

// Carte vidéo, 30 oct. 2026 : téléphone seulement, jamais web.
// Données fournies par l'application, comme les annonces.
// onOpen lit la vidéo dans l'application, onDismiss ferme la
// carte immédiatement, sans lecture.
class HomeVideo {
  const HomeVideo({required this.id, required this.title, this.text = '', required this.onOpen, required this.onDismiss});
  final String id, title, text;
  final VoidCallback onOpen, onDismiss;
}

class HomeNews {
  const HomeNews({required this.title, required this.text});
  final String title, text;
}

class HomeQuiz {
  const HomeQuiz({
    required this.character,
    required this.questionIndex,
    required this.questionCount,
    required this.score,
    required this.question,
    required this.choices,
    required this.quizNumber,
    required this.quizTotal,
    this.picked,
    this.correct,
    this.isLast = false,
  });
  final String character, question;
  final int questionIndex, questionCount, score, quizNumber, quizTotal; // index à partir de 1
  final List<String> choices;
  final int? picked, correct; // renseignés après la réponse
  final bool isLast;
}

class HomeActions {
  const HomeActions({
    this.onSignup,
    this.onQuitVisitor,
    this.onLanguage,
    this.onCreateCard,
    this.onBible,
    this.onQuiz,
    this.onTeachings,
    this.onPrayer,
    this.onReadChapter,
    this.onListen,
    this.onListenHq,
    this.onShare,
    this.onCamps,
    this.onEtabs,
    this.onNews,
    this.onShop,
    this.onGrowth,
    this.onAnswer,
    this.onNextQuiz,
    this.onQuizRestart,
    this.onQuizFull,
    this.onDefi,
    this.onScope,
    this.onSeeAllEvents,
    this.onSendPrayer,
    this.onTab,
    this.onBag,
    this.onProfile,
    this.onBell,
    this.onPayCotisation,
  });
  final VoidCallback? onSignup, onQuitVisitor, onLanguage, onCreateCard, onBible, onQuiz, onTeachings, onPrayer, onBag, onProfile, onBell, onPayCotisation;
  final VoidCallback? onReadChapter, onListen, onListenHq, onShare, onCamps, onEtabs, onNews, onShop, onGrowth;
  final VoidCallback? onSeeAllEvents, onSendPrayer;
  final ValueChanged<int>? onAnswer, onScope, onTab;
  final VoidCallback? onNextQuiz, onQuizRestart, onQuizFull, onDefi;
}

// ───────────────────────── Écran ─────────────────────────
class HomeWeb extends StatelessWidget {
  const HomeWeb({
    super.key,
    required this.actions,
    this.visitor = true,
    this.language = 'FR',
    this.logo,
    this.verse,
    this.quiz,
    this.scopes = const [],
    this.scopeIndex = 0,
    this.events = const [],
    this.news = const [],
    this.annonces = const [],
    this.videos = const [],
    this.structureEmail = '',
    this.tabIndex = 0,
    this.showBottomNav = true,
    this.offline = false,
    this.onRetry,
    this.memberName = '',
    this.memberMatricule = '',
    this.memberPhoto,
    this.memberValidUntilLabel = '',
    this.quizFinished = false,
    this.quizFinalScore = 0,
    this.quizFinalTotal = 0,
    this.defiMessage,
    this.birthdayVerse,
    this.unreadCount = 0,
    this.cotisationReminder = false,
    this.scrollController,
  });

  final HomeActions actions;
  final bool visitor;
  final String language;
  final Widget? logo;
  final HomeVerse? verse;
  final HomeQuiz? quiz;
  // Cloche de notifications internes, 29 oct. 2026 : nombre de non
  // lues, pour le membre connecté seulement, jamais pour un visiteur.
  final int unreadCount;
  // Rappel de cotisation mensuelle, 29 oct. 2026 : vrai à partir
  // du 15, tant que la cotisation du mois n'est pas soldée.
  final bool cotisationReminder;
  // Retour en haut, 29 oct. 2026 : la barre du bas ramène l'accueil
  // en haut de page à chaque touche, via ce contrôleur.
  final ScrollController? scrollController;
  // Carte anniversaire, 29 oct. 2026 : null veut dire aucune
  // carte, jamais une carte vide.
  final HomeVerse? birthdayVerse;
  final List<String> scopes; // « Tous », puis les établissements
  final int scopeIndex;
  final List<HomeEvent> events;
  final List<HomeNews> news;
  final List<HomeAnnonce> annonces;
  final List<HomeVideo> videos;
  final String structureEmail;
  final int tabIndex;
  final bool showBottomNav;
  final bool offline;
  final VoidCallback? onRetry;
  final String memberName, memberMatricule;
  final Widget? memberPhoto;
  final String memberValidUntilLabel;
  final bool quizFinished;
  final int quizFinalScore, quizFinalTotal;
  // Défi hebdomadaire, 31 oct. 2026 : retour visible de la
  // participation, affiché dans la carte de fin du quiz.
  final String? defiMessage;

  @override
  Widget build(BuildContext context) {
    final content = _HomeWebContent(
      actions: actions,
      visitor: visitor,
      language: language,
      logo: logo,
      verse: verse,
      quiz: quiz,
      scopes: scopes,
      scopeIndex: scopeIndex,
      events: events,
      news: news,
      annonces: annonces,
      videos: videos,
      structureEmail: structureEmail,
      offline: offline,
      onRetry: onRetry,
      memberName: memberName,
      memberMatricule: memberMatricule,
      memberPhoto: memberPhoto,
      memberValidUntilLabel: memberValidUntilLabel,
      quizFinished: quizFinished,
      quizFinalScore: quizFinalScore,
      quizFinalTotal: quizFinalTotal,
      defiMessage: defiMessage,
      birthdayVerse: birthdayVerse,
      unreadCount: unreadCount,
      cotisationReminder: cotisationReminder,
      scrollController: scrollController,
    );
    // Intégré dans l'AppShell (showBottomNav false) : aucun Scaffold propre,
    // pour ne pas imbriquer deux Scaffold. La barre du bas est alors celle
    // de l'AppShell (BottomNavWeb), et le fond reste celui du thème (papier).
    if (!showBottomNav) return content;
    return Scaffold(
      backgroundColor: W.paper,
      body: WideCenter(child: content),
      bottomNavigationBar: BottomNavWeb(index: tabIndex, onTap: actions.onTab),
    );
  }
}

// Contenu de l'accueil, sans Scaffold : en-tête, bandeaux, liste.
// Utilisé seul par HomeWeb, intégré ou non.
class _HomeWebContent extends StatelessWidget {
  const _HomeWebContent({
    required this.actions,
    required this.visitor,
    required this.language,
    required this.logo,
    required this.verse,
    required this.quiz,
    required this.scopes,
    required this.scopeIndex,
    required this.events,
    required this.news,
    required this.annonces,
    this.videos = const [],
    required this.structureEmail,
    required this.offline,
    required this.onRetry,
    required this.memberName,
    required this.memberMatricule,
    this.memberPhoto,
    this.memberValidUntilLabel = '',
    required this.quizFinished,
    required this.quizFinalScore,
    required this.quizFinalTotal,
    this.defiMessage,
    this.birthdayVerse,
    this.unreadCount = 0,
    this.cotisationReminder = false,
    this.scrollController,
  });
  final HomeActions actions;
  final bool visitor;
  final String language;
  final Widget? logo;
  final HomeVerse? verse;
  final HomeQuiz? quiz;
  final int unreadCount;
  final bool cotisationReminder;
  // Retour en haut, 29 oct. 2026 : la barre du bas ramène l'accueil
  // en haut de page à chaque touche, via ce contrôleur.
  final ScrollController? scrollController;
  final HomeVerse? birthdayVerse;
  final List<String> scopes;
  final int scopeIndex;
  final List<HomeEvent> events;
  final List<HomeNews> news;
  final List<HomeAnnonce> annonces;
  final List<HomeVideo> videos;
  final String structureEmail;
  final bool offline;
  final VoidCallback? onRetry;
  final String memberName, memberMatricule;
  final Widget? memberPhoto;
  final String memberValidUntilLabel;
  final bool quizFinished;
  final int quizFinalScore, quizFinalTotal;
  final String? defiMessage;

  @override
  Widget build(BuildContext context) {
    return Column(children: [
        _Header(logo: logo, language: language, onLanguage: actions.onLanguage, subtitle: tr('Accueil'), visitor: visitor, memberPhoto: memberPhoto, onBag: actions.onBag, onProfile: actions.onProfile, onBell: actions.onBell, unreadCount: unreadCount),
        if (visitor) _VisitorBanner(onSignup: actions.onSignup, onQuit: actions.onQuitVisitor),
        if (offline)
          Container(
            width: double.infinity,
            color: W.banner,
            padding: const EdgeInsets.fromLTRB(14, 10, 14, 10),
            child: Row(children: [
              const Icon(Icons.cloud_off_outlined, color: W.gold, size: 19),
              const SizedBox(width: 8),
              Expanded(
                child: Text(rcText('message_hors_ligne', tr('Hors ligne : contenus locaux affichés. La synchronisation reprendra en ligne.')),
                    style: TextStyle(color: Colors.white, fontSize: 13)),
              ),
              if (onRetry != null)
                InkWell(
                  onTap: onRetry,
                  child: Padding(
                    padding: EdgeInsets.symmetric(vertical: 15, horizontal: 12),
                    child: Text(tr('Réessayer'), style: TextStyle(color: W.gold, fontSize: 13, fontWeight: FontWeight.w700)),
                  ),
                ),
            ]),
          ),
        Expanded(
          child: ListView(
            controller: scrollController,
            // Marge basse ordinateur et tablette, 30 oct. 2026 : la
            // barre du bas ne cache plus le bas de l'accueil.
            // Téléphone : 24, comme avant, aucun changement visible.
            padding: EdgeInsets.fromLTRB(14, 16, 14, 24 + Rx.bottomClearance(context)),
            children: [
              _HeroCard(
                  visitor: visitor,
                  onTap: actions.onCreateCard,
                  memberName: memberName,
                  memberMatricule: memberMatricule,
                  memberPhoto: memberPhoto,
                  memberValidUntilLabel: memberValidUntilLabel),
              // Cotisation en haut de l'accueil, 29 oct. 2026 :
              // un seul élément, juste après la salutation, visible
              // seulement tant que le mois en cours n'est pas soldé.
              // Même condition, même montant, même parcours de paiement.
              if (cotisationReminder) ...[
                const SizedBox(height: 22),
                _CotisationCompactCard(onPay: actions.onPayCotisation),
              ],
              // Carte anniversaire, 29 oct. 2026 : en haut de
              // l'accueil, pour ne pas être manquée. Jamais
              // l'année de naissance ni un âge.
              if (birthdayVerse != null) ...[
                const SizedBox(height: 22),
                _CelebrationCard(
                  icon: Icons.cake_outlined,
                  title: isEn
                      ? 'Happy birthday${memberName.isEmpty ? '' : ', ${memberName.split(' ').first}'}!'
                      : 'Joyeux anniversaire${memberName.isEmpty ? '' : ', ${memberName.split(' ').first}'} !',
                  verse: birthdayVerse!,
                ),
              ],
              // Annonces audio, 29 oct. 2026 : cartes façon Wave,
              // membre connecté seulement, jamais visiteur. La
              // carte disparaît après écoute complète ou sur X.
              // Déplacée en haut de l'accueil le 29 oct. 2026, à
              // la demande d'Axel : juste après les cartes du haut.
              if (!visitor && annonces.isNotEmpty) ...[
                const SizedBox(height: 22),
                _SectionTitle(tr('Annonces audio')),
                const SizedBox(height: 12),
                _AnnoncesCarousel(annonces: annonces),
              ],
              // Cartes vidéo, 30 oct. 2026 : téléphone
              // seulement, membre connecté seulement, jamais
              // visiteur ni web (la liste est déjà vide sur
              // le web, filtrée par l'application).
              if (!visitor && videos.isNotEmpty) ...[
                const SizedBox(height: 22),
                _SectionTitle(tr('Regardez la vidéo !')),
                const SizedBox(height: 12),
                _VideosCarousel(videos: videos),
              ],
              // Ordre réorganisé, 29 oct. 2026, validé par Axel :
              // verset du jour compact, puis Découvrir,
              // puis la carte Quiz en direct juste après.
              if (verse != null && rcSection('verset_du_jour')) ...[const SizedBox(height: 22), _VerseCard(verse: verse!, actions: actions)],
              const SizedBox(height: 28),
              // 30 oct. 2026, fusion validée par Axel : Ma vie
              // spirituelle et Explorer deviennent une seule
              // section Découvrir, six tuiles, à la place de
              // Ma vie spirituelle. Destinations et sous-titres
              // inchangés.
              if (rcSection('decouvrir')) ...[
                _SectionLabel(rcText('titre_decouvrir', tr('Découvrir'))),
                _DecouvrirGrid(actions: actions),
              ],
              if (rcSection('quiz')) ...[
                if (quizFinished) ...[
                  const SizedBox(height: 28),
                  _SectionTitle(tr('Quiz Bible')),
                  const SizedBox(height: 12),
                  _QuizDoneCard(score: quizFinalScore, total: quizFinalTotal, onRestart: actions.onQuizRestart, onFull: actions.onQuizFull, defiMessage: defiMessage, onDefi: actions.onDefi),
                ] else if (quiz != null) ...[
                  const SizedBox(height: 28),
                  _SectionTitle(tr('Quiz Bible'), trailing: _Pill(isEn ? 'Quiz ${quiz!.quizNumber} of ${quiz!.quizTotal}' : 'Quiz ${quiz!.quizNumber} sur ${quiz!.quizTotal}')),
                  const SizedBox(height: 12),
                  _QuizCard(quiz: quiz!, onAnswer: actions.onAnswer, onNext: actions.onNextQuiz),
                ],
              ],
              // Pastilles d'établissement juste au-dessus des
              // rendez-vous, 29 oct. 2026, réorganisation de
              // l'accueil, avec le libellé qui dit ce qu'elles font.
              if (scopes.isNotEmpty) ...[
                const SizedBox(height: 22),
                _SectionLabel(isEn ? 'Filter by establishment' : 'Filtrer par établissement'),
                _ScopeChips(scopes: scopes, index: scopeIndex, onTap: actions.onScope),
              ],
              if (rcSection('rendez_vous')) ...[
                const SizedBox(height: 26),
                _SectionTitle(rcText('titre_rendez_vous', tr('Prochains rendez-vous')), link: tr('Tout voir'), onLink: actions.onSeeAllEvents),
                const SizedBox(height: 12),
                if (events.isNotEmpty) _EventsCarousel(events: events),
              ],
              if (rcSection('actualites')) ...[
                const SizedBox(height: 14),
                _SectionTitle(rcText('titre_actualites', tr('Actualités de la communauté'))),
                const SizedBox(height: 12),
                if (news.isEmpty)
                  const _EmptyNews()
                else
                  for (final n in news) ...[_NewsCard(item: n), const SizedBox(height: 12)],
              ],
            ],
          ),
        ),
      ]);
  }
}

// ───────────────────────── En-tête et bandeau visiteur (fixes en haut) ─────────────────────────
class _Header extends StatelessWidget {
  const _Header({required this.logo, required this.language, required this.onLanguage, this.subtitle = 'Accueil', this.visitor = true, this.memberPhoto, this.onBag, this.onProfile, this.onBell, this.unreadCount = 0});
  final Widget? logo;
  final String language;
  final VoidCallback? onLanguage, onProfile;
  // En-tête connecté identique partout, 27 oct. 2026 : sous-titre
  // = page en cours, sac vers Mes achats et photo ronde du membre
  // connecté si renseignée, sinon cercle neutre, jamais inventée.
  final String subtitle;
  final bool visitor;
  final Widget? memberPhoto;
  final VoidCallback? onBag;
  // Cloche de notifications internes, 29 oct. 2026 : pastille or
  // avec le nombre de non lues, pour le membre connecté seulement,
  // jamais pour un visiteur.
  final VoidCallback? onBell;
  final int unreadCount;

  @override
  Widget build(BuildContext context) {
    // En-tête ordinateur, 30 oct. 2026 : plus présente sur grand
    // écran, logo, titre et actions plus grands, barre un peu plus
    // haute, mêmes couleurs, même structure. Téléphone et tablette :
    // inchangés.
    final desktop = Rx.isDesktop(context);
    return Container(
      padding: EdgeInsets.fromLTRB(desktop ? 24 : 14, MediaQuery.of(context).padding.top + (desktop ? 16 : 10), desktop ? 24 : 14, desktop ? 14 : 10),
      decoration: const BoxDecoration(
        color: W.header,
        border: Border(bottom: BorderSide(color: W.headerLine)),
      ),
      child: Row(children: [
        // En-tête web, 27 oct. 2026 : logo CP à gauche, titre
        // CONNEXION PROPHÉTIQUE en or, sous-titre = page en cours.
        // Voir header_logo.dart, logo CP recadré depuis la capture web.
        headerLogo(size: desktop ? 48 : 36),
        SizedBox(width: desktop ? 12 : 8),
        Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
            Text('CONNEXION PROPHÉTIQUE', maxLines: 1, overflow: TextOverflow.ellipsis, softWrap: false,
                style: TextStyle(color: W.gold, fontSize: desktop ? 15 : 11.5, fontWeight: FontWeight.w700, letterSpacing: 0.8)),
            Text(tr(subtitle), maxLines: 1, overflow: TextOverflow.ellipsis, softWrap: false, style: TextStyle(color: W.onDarkMuted, fontSize: desktop ? 14 : 12)),
          ]),
        ),
        Material(
          color: const Color(0x14FFFFFF),
          shape: const StadiumBorder(side: BorderSide(color: Color(0xFF3A4A6A))),
          child: InkWell(
            customBorder: const StadiumBorder(),
            onTap: onLanguage,
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: desktop ? 14 : 12),
              child: SizedBox(
                height: desktop ? 42 : 34,
                child: Row(mainAxisSize: MainAxisSize.min, children: [
                  Icon(Ic.globe, color: W.gold, size: desktop ? 20 : 17),
                  const SizedBox(width: 6),
                  Text(language, style: TextStyle(color: Colors.white, fontSize: desktop ? 15 : 13.5, fontWeight: FontWeight.w700)),
                ]),
              ),
            ),
          ),
        ),
        if (!visitor) ...[
          const SizedBox(width: 8),
          InkWell(
            customBorder: const CircleBorder(),
            onTap: onBell,
            child: Tooltip(
              message: tr('Notifications'),
              child: Padding(
                padding: EdgeInsets.all(desktop ? 8 : 6),
                child: Stack(
                  clipBehavior: Clip.none,
                  children: [
                    Icon(Icons.notifications_outlined, color: Colors.white, size: desktop ? 26 : 22),
                    if (unreadCount > 0)
                      Positioned(
                        right: -4,
                        top: -4,
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 1),
                          decoration: BoxDecoration(color: W.gold, borderRadius: BorderRadius.circular(9)),
                          child: Text(
                            unreadCount > 99 ? '99+' : '$unreadCount',
                            style: const TextStyle(color: Color(0xFF0B1F3A), fontSize: 10, fontWeight: FontWeight.w800),
                          ),
                        ),
                      ),
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(width: 4),
          InkWell(
            customBorder: const CircleBorder(),
            onTap: onBag,
            child: Padding(
              padding: EdgeInsets.all(desktop ? 8 : 6),
              child: Icon(Icons.shopping_bag_outlined, color: Colors.white, size: desktop ? 26 : 22),
            ),
          ),
          const SizedBox(width: 4),
          // Correctif 27 oct. 2026, petit bonhomme en en-tête :
          // avant, la photo ronde n'avait aucune action au toucher.
          // Comme dans la version web, un appui ouvre l'espace profil.
          InkWell(
            customBorder: const CircleBorder(),
            onTap: onProfile,
            child: ClipOval(
              child: SizedBox(
                width: desktop ? 42 : 34,
                height: desktop ? 42 : 34,
                child: memberPhoto ??
                    Container(
                      color: W.gold,
                      child: Icon(Icons.person_outlined, color: const Color(0xFF0B1F3A), size: desktop ? 24 : 20),
                    ),
              ),
            ),
          ),
        ],
      ]),
    );
  }
}

class _VisitorBanner extends StatelessWidget {
  const _VisitorBanner({required this.onSignup, required this.onQuit});
  final VoidCallback? onSignup, onQuit;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      color: W.banner,
      padding: const EdgeInsets.fromLTRB(14, 10, 14, 10),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Icon(Ic.eye, color: W.gold, size: 19),
          SizedBox(width: 8),
          Expanded(
            child: Text(rcText('message_visiteur', tr('Mode visiteur, consultation sans inscription')),
                style: TextStyle(color: W.gold, fontSize: 13, fontWeight: FontWeight.w600)),
          ),
        ]),
        const SizedBox(height: 6),
        Wrap(alignment: WrapAlignment.end, crossAxisAlignment: WrapCrossAlignment.center, spacing: 14, runSpacing: 6, children: [
          Material(
            color: W.goldBtn,
            borderRadius: BorderRadius.circular(12),
            child: InkWell(
              borderRadius: BorderRadius.circular(12),
              onTap: onSignup,
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 18, vertical: 12),
                child: Text(tr('S’inscrire'), style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w700)),
              ),
            ),
          ),
          InkWell(
            onTap: onQuit,
            child: Padding(
              padding: EdgeInsets.symmetric(vertical: 12),
              child: Text(tr('Quitter le mode visiteur'),
                  style: TextStyle(color: Color(0xFFD9DDE7), fontSize: 13, fontWeight: FontWeight.w600, decoration: TextDecoration.underline, decorationColor: Color(0xFFD9DDE7))),
            ),
          ),
        ]),
      ]),
    );
  }
}

// ───────────────────────── Blocs ─────────────────────────
String _dateFr(DateTime d) {
  // Date du héros : en anglais, jours et mois en anglais, pas seulement les versets.
  final jours = isEn ? ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'] : ['LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI', 'DIMANCHE'];
  final mois = isEn ? ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'] : ['JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE'];
  return '${jours[d.weekday - 1]} ${d.day} ${mois[d.month - 1]} ${d.year}';
}

class _HeroCard extends StatelessWidget {
  const _HeroCard(
      {required this.visitor,
      required this.onTap,
      this.memberName = '',
      this.memberMatricule = '',
      this.memberPhoto,
      this.memberValidUntilLabel = ''});
  final bool visitor;
  final VoidCallback? onTap;
  final String memberName, memberMatricule;
  final Widget? memberPhoto;
  final String memberValidUntilLabel;

  @override
  Widget build(BuildContext context) {
    // Accueil connecté, modèle web : message de bienvenue avec le
    // logo déjà en en-tête, date du jour, carte héros avec photo
    // si renseignée, nom et matricule réels du membre connecté,
    // validité réelle, QR du matricule, et « Voir ma carte ».
    // Aucun nom, matricule ou date n'est inventé : tout vient du
    // membre connecté passé en paramètres, et la date est celle
    // du jour sur l'appareil. Sans badge cotisation ici : aucun
    // statut de cotisation confirmé par mois n'est disponible
    // dans l'application, on ne l'invente pas.
    if (!visitor && memberName.isNotEmpty) {
      final firstName = memberName.trim().split(RegExp(r'\s+')).first;
      return Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(color: const Color(0xFF111F3D), borderRadius: BorderRadius.circular(24), border: Border.all(color: const Color(0xFF1F2F50))),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text('${rcText('accueil_salutation', 'Shalom')}, $firstName !',
              style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.w800, height: 1.2)),
          const SizedBox(height: 12),
          Material(
            color: W.navySoft,
            borderRadius: BorderRadius.circular(22),
            child: InkWell(
              borderRadius: BorderRadius.circular(22),
              onTap: onTap,
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(borderRadius: BorderRadius.circular(22), border: Border.all(color: W.navySoftLine)),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Row(children: [
                    Container(width: 4, height: 18, decoration: BoxDecoration(color: W.gold, borderRadius: BorderRadius.circular(2))),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(_dateFr(DateTime.now()),
                          style: const TextStyle(color: Color(0xFFB8C0D0), fontSize: 12.5, fontWeight: FontWeight.w700, letterSpacing: 1.5)),
                    ),
                  ]),
                  const SizedBox(height: 14),
                  // Correctif débordement 27 oct. 2026 : sur un écran
                  // étroit, photo et QR gardent des tailles fixes
                  // qui, ajoutées aux marges, laissaient trop peu
                  // de place au nom et provoquaient un débordement
                  // en pixels. Ici, photo et QR rétrécissent sur
                  // écran étroit, le nom reste dans un Expanded.
                  LayoutBuilder(builder: (ctx, constraints) {
                    final narrow = constraints.maxWidth < 380;
                    final photoW = narrow ? 56.0 : 72.0;
                    final photoH = narrow ? 68.0 : 88.0;
                    final qrSize = narrow ? 56.0 : 72.0;
                    return Row(crossAxisAlignment: CrossAxisAlignment.center, children: [
                      if (memberPhoto != null)
                        ClipRRect(
                          borderRadius: BorderRadius.circular(36),
                          child: SizedBox(width: photoW, height: photoH, child: memberPhoto),
                        )
                      else
                        Container(
                          width: photoW,
                          height: photoH,
                          decoration: BoxDecoration(
                              color: const Color(0x33D4A72C), borderRadius: BorderRadius.circular(36), border: Border.all(color: const Color(0x55D4A72C))),
                          child: const Icon(Ic.card, color: W.gold, size: 28),
                        ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                          Text(memberName, style: const TextStyle(color: Colors.white, fontSize: 19, fontWeight: FontWeight.w800, height: 1.25)),
                          const SizedBox(height: 4),
                          Text(isEn ? 'Member number $memberMatricule' : 'Matricule $memberMatricule', style: const TextStyle(color: Color(0xFFB8C0D0), fontSize: 14.5, height: 1.4)),
                          if (memberValidUntilLabel.isNotEmpty) ...[
                            const SizedBox(height: 2),
                            Text(isEn ? 'Valid until $memberValidUntilLabel' : "Valide jusqu'au $memberValidUntilLabel", style: const TextStyle(color: Color(0xFFB8C0D0), fontSize: 14.5, height: 1.4)),
                          ],
                        ]),
                      ),
                      const SizedBox(width: 10),
                      if (memberMatricule.isNotEmpty)
                        Container(
                          padding: const EdgeInsets.all(6),
                          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12)),
                          child: QrImageView(data: memberMatricule, size: qrSize, backgroundColor: Colors.white),
                        ),
                    ]);
                  }),
                  const SizedBox(height: 12),
                  Row(children: [
                    Text(tr('Voir ma carte'), style: TextStyle(color: W.gold, fontSize: 15, fontWeight: FontWeight.w700)),
                    const SizedBox(width: 4),
                    const Icon(Ic.chevron, color: W.gold, size: 20),
                  ]),
                ]),
              ),
            ),
          ),
        ]),
      );
    }
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(color: const Color(0xFF111F3D), borderRadius: BorderRadius.circular(24), border: Border.all(color: const Color(0xFF1F2F50))),
      child: Material(
        color: W.navySoft,
        borderRadius: BorderRadius.circular(22),
        child: InkWell(
          borderRadius: BorderRadius.circular(22),
          onTap: onTap,
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(borderRadius: BorderRadius.circular(22), border: Border.all(color: W.navySoftLine)),
            child: Row(crossAxisAlignment: CrossAxisAlignment.center, children: [
              Container(
                width: 50,
                height: 50,
                decoration: BoxDecoration(
                  color: const Color(0x33D4A72C),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0x55D4A72C)),
                ),
                child: const Icon(Ic.card, color: W.gold, size: 25),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  // Membre connecté : son nom et son matricule, pas le texte
                  // visiteur. Visiteur : le texte d'origine est gardé tel quel.
                  Text(
                      (!visitor && memberName.isNotEmpty) ? memberName : tr('Créez votre carte de membre'),
                      style: const TextStyle(color: Colors.white, fontSize: 19, fontWeight: FontWeight.w800, height: 1.25)),
                  const SizedBox(height: 4),
                  Text(
                      (!visitor && memberMatricule.isNotEmpty)
                          ? (isEn ? 'Member number $memberMatricule · Your attendance QR code, on your card.' : 'Membre numéro $memberMatricule · Votre QR de présence, sur votre carte.')
                          : tr('Votre matricule et votre QR de présence, sur votre carte.'),
                      style: const TextStyle(color: Color(0xFFB8C0D0), fontSize: 14.5, height: 1.4)),
                  if (visitor) ...[
                    const SizedBox(height: 8),
                    Text(tr('Vous pouvez lire la Bible. Vous pouvez voir les camps, les annonces et les livres. Pour une carte de membre, inscrivez-vous.'),
                        style: TextStyle(color: Color(0xFF9FA9BC), fontSize: 13.5, height: 1.4)),
                  ],
                ]),
              ),
              const SizedBox(width: 8),
              const Icon(Ic.chevron, color: W.gold, size: 26),
            ]),
          ),
        ),
      ),
    );
  }
}

class _SectionLabel extends StatelessWidget {
  _SectionLabel(this.text);
  final String text;

  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.fromLTRB(4, 0, 0, 10),
        child: Text(text.toUpperCase(), style: const TextStyle(color: W.label, fontSize: 12.5, fontWeight: FontWeight.w800, letterSpacing: 2.2)),
      );
}

class _SectionTitle extends StatelessWidget {
  _SectionTitle(this.text, {this.trailing, this.link, this.onLink});
  final String text;
  final Widget? trailing;
  final String? link;
  final VoidCallback? onLink;

  @override
  Widget build(BuildContext context) {
    return Row(children: [
      Container(width: 4, height: 24, decoration: BoxDecoration(color: W.gold, borderRadius: BorderRadius.circular(2))),
      const SizedBox(width: 10),
      Expanded(child: Text(text, style: const TextStyle(color: W.ink, fontSize: 22, fontWeight: FontWeight.w800, height: 1.15))),
      if (trailing != null) trailing!,
      if (link != null)
        InkWell(
          onTap: onLink,
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 2),
            child: Text(link!, style: const TextStyle(color: W.goldDeep, fontSize: 15, fontWeight: FontWeight.w700)),
          ),
        ),
    ]);
  }
}

class _Pill extends StatelessWidget {
  _Pill(this.text);
  final String text;

  @override
  Widget build(BuildContext context) => Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 9),
        decoration: BoxDecoration(color: W.navy, borderRadius: BorderRadius.circular(22)),
        child: Text(text, style: const TextStyle(color: W.gold, fontSize: 13.5, fontWeight: FontWeight.w800)),
      );
}

class _IconTile extends StatelessWidget {
  const _IconTile(this.icon, {this.size = 44, this.iconSize = 22, this.radius = 14});
  final IconData icon;
  final double size, iconSize, radius;

  @override
  Widget build(BuildContext context) => Container(
        width: size,
        height: size,
        decoration: BoxDecoration(
          color: W.navy,
          borderRadius: BorderRadius.circular(radius),
          border: Border.all(color: const Color(0x22FFFFFF)),
        ),
        child: Icon(icon, color: W.gold, size: iconSize),
      );
}

BoxDecoration _whiteCard([double r = 20]) => BoxDecoration(
      color: Colors.white,
      borderRadius: BorderRadius.circular(r),
      border: Border.all(color: W.line),
    );

// Section Découvrir, 30 oct. 2026, fusion validée par Axel :
// Ma vie spirituelle et Explorer réunis en une seule section,
// six tuiles, destinations et sous-titres inchangés. Les deux
// premières tuiles n'avaient pas de sous-titre, les quatre
// suivantes gardent le leur.
class _DecouvrirGrid extends StatelessWidget {
  const _DecouvrirGrid({required this.actions});
  final HomeActions actions;

  @override
  Widget build(BuildContext context) {
    final tiles = <(IconData, String, String?, VoidCallback?)>[
      (Ic.audio, tr('Enseignements'), null, actions.onTeachings),
      (Ic.flame, tr('Prière'), null, actions.onPrayer),
      (Ic.camp, tr('Camps & Retraites'), tr('S’inscrire'), actions.onCamps),
      (Ic.school, tr('Établissements'), tr('Activités par école'), actions.onEtabs),
      (Ic.news, tr('Actualités'), tr('Annonces de la communauté'), actions.onNews),
      (Ic.flame, tr('Mon épanouissement'), tr('Plan de lecture : 21 jours'), actions.onGrowth),
    ];
    Widget cell((IconData, String, String?, VoidCallback?) t) => InkWell(
          borderRadius: BorderRadius.circular(16),
          onTap: t.$4,
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 4),
            child: Column(mainAxisSize: MainAxisSize.min, children: [
              _IconTile(t.$1, size: 46, iconSize: 23, radius: 16),
              const SizedBox(height: 8),
              Text(t.$2, textAlign: TextAlign.center, style: const TextStyle(color: W.ink, fontSize: 15.5, fontWeight: FontWeight.w800)),
              if (t.$3 != null) ...[
                const SizedBox(height: 2),
                Text(t.$3!, textAlign: TextAlign.center, style: const TextStyle(color: W.muted, fontSize: 13.5, height: 1.3)),
              ],
            ]),
          ),
        );
    // Grille Découvrir, phase 1 ordinateur, 30 oct. 2026 : 2 colonnes
    // sur téléphone et tablette, 3 sur ordinateur, où la colonne
    // centrée laisse respirer les tuiles.
    final perRow = Rx.decouvrirColumns(context);
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 10),
      decoration: _whiteCard(22),
      child: Column(children: [
        for (var i = 0; i < tiles.length; i += perRow) ...[
          if (i > 0) const SizedBox(height: 18),
          Row(children: [
            for (var j = i; j < i + perRow && j < tiles.length; j++) Expanded(child: cell(tiles[j])),
          ]),
        ],
      ]),
    );
  }
}
// Verset du jour compact, 29 oct. 2026, réorganisation de
// l'accueil : carte resserrée, et l'explication de la lecture
// vocale repliée derrière « En savoir plus », au lieu d'un
// long texte affiché d'emblée. Le texte lui-même ne change pas.
class _VerseCard extends StatefulWidget {
  const _VerseCard({required this.verse, required this.actions});
  final HomeVerse verse;
  final HomeActions actions;

  @override
  State<_VerseCard> createState() => _VerseCardState();
}

class _VerseCardState extends State<_VerseCard> {
  bool _showVoiceNote = false;

  @override
  Widget build(BuildContext context) {
    final verse = widget.verse;
    final actions = widget.actions;
    Widget ghost(IconData i, String t, VoidCallback? tap) => Material(
          color: const Color(0x14FFFFFF),
          borderRadius: BorderRadius.circular(12),
          child: InkWell(
            borderRadius: BorderRadius.circular(12),
            onTap: tap,
            child: Container(
              height: 46,
              padding: const EdgeInsets.symmetric(horizontal: 14),
              decoration: BoxDecoration(borderRadius: BorderRadius.circular(12), border: Border.all(color: const Color(0x33FFFFFF))),
              child: Row(mainAxisSize: MainAxisSize.min, children: [
                Icon(i, color: Colors.white, size: 19),
                const SizedBox(width: 8),
                Text(t, style: const TextStyle(color: Colors.white, fontSize: 15.5, fontWeight: FontWeight.w700)),
              ]),
            ),
          ),
        );
    return ClipRRect(
      borderRadius: BorderRadius.circular(24),
      child: Stack(children: [
        Positioned.fill(
          child: Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [Color(0xFF1C2A47), Color(0xFF0E1A35)]),
            ),
          ),
        ),
        // Photo de Bible ouverte avec rayons (facultative).
        Positioned.fill(
          child: Opacity(
            opacity: 0.32,
            child: Image.asset('assets/verse_bg.jpg', fit: BoxFit.cover, errorBuilder: (_, __, ___) => const SizedBox.shrink()),
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(16),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Icon(Ic.flame, color: W.gold, size: 20),
              SizedBox(width: 12),
              Text(isEn ? 'VERSE OF THE DAY' : 'VERSET DU JOUR', style: TextStyle(color: W.gold, fontSize: 12.5, fontWeight: FontWeight.w800, letterSpacing: 3.6)),
            ]),
            const SizedBox(height: 14),
            // Taille du texte de lecture, 31 oct. 2026 : le verset seul
            // suit le réglage, le reste de la carte garde sa taille.
            ListenableBuilder(
              listenable: textSize,
              builder: (c, _) => Text('« ${verse.text} »', style: TextStyle(color: Colors.white, fontSize: 19 * textSize.factor, fontWeight: FontWeight.w600, height: 1.4)),
            ),
            const SizedBox(height: 10),
            Text.rich(TextSpan(children: [
              TextSpan(text: verse.ref, style: const TextStyle(color: W.gold, fontWeight: FontWeight.w800)),
              TextSpan(text: ' (${verse.version})', style: const TextStyle(color: W.onDarkMuted)),
            ]), style: const TextStyle(fontSize: 15.5)),
            const SizedBox(height: 12),
            Wrap(spacing: 8, runSpacing: 8, children: [
              Material(
                color: W.goldFill,
                borderRadius: BorderRadius.circular(12),
                child: InkWell(
                  borderRadius: BorderRadius.circular(12),
                  onTap: actions.onReadChapter,
                  child: SizedBox(
                    height: 46,
                    child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: 18),
                      child: Center(child: Text(tr('Lire le chapitre'), style: TextStyle(color: W.ink, fontSize: 15.5, fontWeight: FontWeight.w700))),
                    ),
                  ),
                ),
              ),
              ghost(Ic.audio, tr('Écouter'), actions.onListen),
              if (actions.onListenHq != null) ghost(Ic.audio, tr('Haute qualité'), actions.onListenHq),
              ghost(Ic.share, tr('Partager'), actions.onShare),
            ]),
            const SizedBox(height: 12),
            InkWell(
              onTap: () => setState(() => _showVoiceNote = !_showVoiceNote),
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 4),
                child: Row(mainAxisSize: MainAxisSize.min, children: [
                  Text(_showVoiceNote ? tr('Réduire') : tr('En savoir plus'), style: const TextStyle(color: W.gold, fontSize: 14.5, fontWeight: FontWeight.w700)),
                  const SizedBox(width: 4),
                  Icon(_showVoiceNote ? Icons.keyboard_arrow_up_outlined : Icons.keyboard_arrow_down_outlined, color: W.gold, size: 20),
                ]),
              ),
            ),
            if (_showVoiceNote) ...[
              const SizedBox(height: 8),
              Text(
                tr('Mode de lecture : voix de votre appareil (synthèse vocale), l’application choisit en priorité une voix d’homme dans la langue du texte, la plus naturelle disponible, avec des pauses entre les versets. Ce n’est pas un enregistrement studio et aucune voix n’est clonée. Si votre appareil n’a pas de voix d’homme dans cette langue, la meilleure voix disponible de l’appareil est utilisée.'),
                style: TextStyle(color: Color(0xFF8E98AB), fontSize: 13.5, height: 1.55),
              ),
            ],
          ]),
        ),
      ]),
    );
  }
}

// Carte anniversaire, 29 oct. 2026 : même langage
// visuel que la carte verset, fond bleu nuit dégradé, titre or,
// verset blanc, référence or. Aucun bouton, la carte est un
// message à lire, pas une action.
class _CelebrationCard extends StatelessWidget {
  const _CelebrationCard({required this.icon, required this.title, required this.verse});
  final IconData icon;
  final String title;
  final HomeVerse verse;

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(24),
      child: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [Color(0xFF1C2A47), Color(0xFF0E1A35)]),
        ),
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Icon(icon, color: W.gold, size: 20),
              const SizedBox(width: 12),
              Expanded(
                child: Text(title.toUpperCase(), style: TextStyle(color: W.gold, fontSize: 12.5, fontWeight: FontWeight.w800, letterSpacing: 2.4)),
              ),
            ]),
            const SizedBox(height: 18),
            // Taille du texte de lecture, 31 oct. 2026 : disposition large,
            // même règle que la disposition téléphone ci-dessus.
            ListenableBuilder(
              listenable: textSize,
              builder: (c, _) => Text('« ${verse.text} »', style: TextStyle(color: Colors.white, fontSize: 21 * textSize.factor, fontWeight: FontWeight.w600, height: 1.4)),
            ),
            const SizedBox(height: 14),
            Text.rich(TextSpan(children: [
              TextSpan(text: verse.ref, style: const TextStyle(color: W.gold, fontWeight: FontWeight.w800)),
              TextSpan(text: ' (${verse.version})', style: const TextStyle(color: W.onDarkMuted)),
            ]), style: const TextStyle(fontSize: 16.5)),
          ]),
        ),
      ),
    );
  }
}

// Carte cotisation compacte, 29 oct. 2026, réorganisation de
// l'accueil, remontée en haut de page le 29 oct. 2026 : une ligne
// et un bouton payer, juste après la salutation. Même condition,
// même montant, même parcours de paiement.
class _CotisationCompactCard extends StatelessWidget {
  const _CotisationCompactCard({required this.onPay});
  final VoidCallback? onPay;

  @override
  Widget build(BuildContext context) {
    final now = DateTime.now();
    final monthName = isEn
        ? const ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][now.month - 1]
        : const ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'][now.month - 1];
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(22), border: Border.all(color: W.gold)),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(color: const Color(0xFFF4E9C8), borderRadius: BorderRadius.circular(12)),
            child: const Icon(Icons.account_balance_wallet_outlined, color: W.goldDeep, size: 20),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Text(
              isEn ? 'Contribution for $monthName ${now.year}: 1 000 FCFA to pay.' : 'Cotisation de $monthName ${now.year} : 1 000 FCFA à régler.',
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: W.navy),
            ),
          ),
        ]),
        const SizedBox(height: 12),
        SizedBox(
          width: double.infinity,
          height: 52,
          child: FilledButton.icon(
            onPressed: onPay,
            style: FilledButton.styleFrom(backgroundColor: W.goldDeep, foregroundColor: Colors.white),
            icon: const Icon(Icons.favorite_border),
            label: Text(tr('Payer ma cotisation : 1 000 FCFA')),
          ),
        ),
      ]),
    );
  }
}

class _QuizCard extends StatelessWidget {
  const _QuizCard({required this.quiz, required this.onAnswer, this.onNext});
  final HomeQuiz quiz;
  final ValueChanged<int>? onAnswer;
  final VoidCallback? onNext;

  @override
  Widget build(BuildContext context) {
    final answered = quiz.picked != null;
    return Container(
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(22), border: Border.all(color: W.goldLine, width: 1.2)),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Container(
          width: double.infinity,
          color: W.navyDeep,
          padding: const EdgeInsets.fromLTRB(18, 18, 18, 16),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(isEn ? 'CURRENT QUIZ' : 'QUIZ DU MOMENT', style: TextStyle(color: W.gold, fontSize: 12.5, fontWeight: FontWeight.w800, letterSpacing: 3.6)),
            const SizedBox(height: 8),
            Text(isEn ? 'Character: ${quiz.character}' : 'Personnage : ${quiz.character}', style: const TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w800)),
            const SizedBox(height: 6),
            Text(isEn ? 'Question ${quiz.questionIndex} of ${quiz.questionCount} · Current score: ${quiz.score}' : 'Question ${quiz.questionIndex} sur ${quiz.questionCount} · Score en cours : ${quiz.score}',
                style: const TextStyle(color: W.onDarkMuted, fontSize: 14.5)),
          ]),
        ),
        Padding(
          padding: const EdgeInsets.all(18),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            // Taille du texte de lecture, 31 oct. 2026 : la question seule
            // suit le réglage, les réponses gardent leur taille de bouton.
            ListenableBuilder(
              listenable: textSize,
              builder: (c, _) => Text(quiz.question, style: TextStyle(color: W.ink, fontSize: 18.5 * textSize.factor, fontWeight: FontWeight.w700, height: 1.3)),
            ),
            const SizedBox(height: 16),
            for (var i = 0; i < quiz.choices.length; i++) ...[
              _Choice(
                letter: String.fromCharCode(65 + i),
                text: quiz.choices[i],
                state: !answered ? 0 : (i == quiz.correct ? 1 : (i == quiz.picked ? 2 : 0)),
                onTap: answered ? null : () => onAnswer?.call(i),
              ),
              if (i < quiz.choices.length - 1) const SizedBox(height: 10),
            ],
            if (answered && onNext != null) ...[
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                height: 52,
                child: FilledButton(
                  onPressed: onNext,
                  child: Text(quiz.isLast ? tr('Voir mon score') : tr('Question suivante')),
                ),
              ),
            ],
          ]),
        ),
      ]),
    );
  }
}

class _QuizDoneCard extends StatelessWidget {
  const _QuizDoneCard({required this.score, required this.total, this.onRestart, this.onFull, this.defiMessage, this.onDefi});
  final int score, total;
  final VoidCallback? onRestart, onFull, onDefi;
  // Défi hebdomadaire, 31 oct. 2026 : retour visible de la
  // participation, et entrée vers le classement de la semaine.
  final String? defiMessage;
  @override
  Widget build(BuildContext context) {
    return Container(
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(22), border: Border.all(color: W.goldLine, width: 1.2)),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Container(
          width: double.infinity,
          color: W.navyDeep,
          padding: const EdgeInsets.fromLTRB(18, 18, 18, 16),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(isEn ? 'QUIZ FINISHED' : 'QUIZ TERMINÉ', style: TextStyle(color: W.gold, fontSize: 12.5, fontWeight: FontWeight.w800, letterSpacing: 3.6)),
            const SizedBox(height: 8),
            Text(isEn ? 'Score: $score out of $total' : 'Score : $score sur $total', style: const TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w800)),
          ]),
        ),
        Padding(
          padding: const EdgeInsets.all(18),
          child: Column(children: [
            if (defiMessage != null) ...[
              Text(defiMessage!, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600)),
              const SizedBox(height: 14),
            ],
            SizedBox(
              width: double.infinity,
              height: 52,
              child: FilledButton(onPressed: onFull, child: Text(tr('Jouer au Quiz Bible complet'))),
            ),
            const SizedBox(height: 10),
            SizedBox(
              width: double.infinity,
              height: 52,
              child: OutlinedButton(onPressed: onRestart, child: Text(tr('Rejouer l’aperçu'))),
            ),
            if (onDefi != null) ...[
              const SizedBox(height: 10),
              SizedBox(
                width: double.infinity,
                height: 52,
                child: OutlinedButton(onPressed: onDefi, child: Text(tr('Défi de la semaine'))),
              ),
            ],
          ]),
        ),
      ]),
    );
  }
}

class _Choice extends StatelessWidget {
  const _Choice({required this.letter, required this.text, required this.state, required this.onTap});
  final String letter, text;
  final int state; // 0 neutre, 1 bonne, 2 mauvaise
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final c = state == 1 ? const Color(0xFF1B6B3A) : (state == 2 ? const Color(0xFFB3261E) : W.lineStrong);
    return Material(
      color: state == 0 ? Colors.white : c.withValues(alpha: 0.10),
      borderRadius: BorderRadius.circular(18),
      child: InkWell(
        borderRadius: BorderRadius.circular(18),
        onTap: onTap,
        child: Container(
          constraints: const BoxConstraints(minHeight: 62),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          decoration: BoxDecoration(borderRadius: BorderRadius.circular(18), border: Border.all(color: c, width: state == 0 ? 1.2 : 2)),
          child: Row(children: [
            Container(
              width: 28,
              height: 28,
              alignment: Alignment.center,
              decoration: const BoxDecoration(color: W.navy, shape: BoxShape.circle),
              child: Text(letter, style: const TextStyle(color: W.gold, fontSize: 13.5, fontWeight: FontWeight.w800)),
            ),
            const SizedBox(width: 16),
            Expanded(child: Text(text, style: const TextStyle(color: W.ink, fontSize: 17.5))),
          ]),
        ),
      ),
    );
  }
}

class _ScopeChips extends StatelessWidget {
  const _ScopeChips({required this.scopes, required this.index, required this.onTap});
  final List<String> scopes;
  final int index;
  final ValueChanged<int>? onTap;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 42,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount: scopes.length,
        separatorBuilder: (_, __) => const SizedBox(width: 10),
        itemBuilder: (c, i) {
          final sel = i == index;
          return Material(
            color: sel ? W.navy : Colors.white,
            shape: StadiumBorder(side: BorderSide(color: sel ? W.navy : W.lineStrong)),
            child: InkWell(
              customBorder: const StadiumBorder(),
              onTap: () => onTap?.call(i),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 18),
                child: Center(child: Text(scopes[i], style: TextStyle(color: sel ? Colors.white : W.ink, fontSize: 15, fontWeight: sel ? FontWeight.w800 : FontWeight.w600))),
              ),
            ),
          );
        },
      ),
    );
  }
}

// Carrousel horizontal, 29 oct. 2026 : à la demande d'Axel, les
// Prochains rendez-vous défilent du doigt de gauche à droite, au
// lieu d'une liste verticale. Mêmes cartes (_EventCard inchangée),
// mêmes données, même toucher vers Camps et Retraites. La largeur
// de carte laisse dépasser la suivante pour signaler le défilement,
// et la hauteur suit la carte la plus haute, sans texte coupé.
class _EventsCarousel extends StatelessWidget {
  const _EventsCarousel({required this.events});
  final List<HomeEvent> events;

  @override
  Widget build(BuildContext context) {
    final available = MediaQuery.sizeOf(context).width - 28;
    final cardWidth = (available * 0.82).clamp(220.0, 340.0).toDouble();
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            for (final e in events) ...[
              SizedBox(width: cardWidth, child: _EventCard(event: e)),
              const SizedBox(width: 12),
            ],
          ],
        ),
      ),
    );
  }
}

// Carrousel d'annonces audio, 29 oct. 2026 : mêmes dimensions
// que le carrousel des rendez-vous, carte suivante qui dépasse
// pour signaler le défilement, hauteur égale, sans texte coupé.
class _AnnoncesCarousel extends StatelessWidget {
  const _AnnoncesCarousel({required this.annonces});
  final List<HomeAnnonce> annonces;

  @override
  Widget build(BuildContext context) {
    final available = MediaQuery.sizeOf(context).width - 28;
    final cardWidth = (available * 0.82).clamp(220.0, 340.0).toDouble();
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            for (final a in annonces) ...[
              SizedBox(width: cardWidth, child: _AnnonceCard(annonce: a)),
              const SizedBox(width: 12),
            ],
          ],
        ),
      ),
    );
  }
}

class _AnnonceCard extends StatelessWidget {
  const _AnnonceCard({required this.annonce});
  final HomeAnnonce annonce;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(22),
      onTap: annonce.onToggle,
      child: Container(
        clipBehavior: Clip.antiAlias,
        decoration: _whiteCard(22),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 12, 16),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              const Icon(Ic.audio, color: W.goldDeep, size: 20),
              const SizedBox(width: 10),
              Expanded(
                child: Text(tr('Annonce audio'), style: const TextStyle(color: W.goldDeep, fontSize: 13, fontWeight: FontWeight.w700, letterSpacing: 0.6)),
              ),
              // X visible, comme les cartes Wave : il ferme la
              // carte immédiatement, sans lancer l'écoute. Placé
              // dans la carte, il ne déclenche pas le toucher de
              // la carte, comme le bouton d'une tuile de liste.
              IconButton(
                tooltip: tr('Fermer'),
                visualDensity: VisualDensity.compact,
                padding: EdgeInsets.zero,
                constraints: const BoxConstraints(minWidth: 36, minHeight: 36),
                icon: const Icon(Icons.close_outlined, color: W.muted, size: 20),
                onPressed: annonce.onDismiss,
              ),
            ]),
            Text(annonce.title, style: const TextStyle(color: W.ink, fontSize: 19, fontWeight: FontWeight.w800, height: 1.2)),
            if (annonce.text.isNotEmpty) ...[
              const SizedBox(height: 6),
              Text(annonce.text, maxLines: 3, overflow: TextOverflow.ellipsis, style: const TextStyle(color: W.muted, fontSize: 15, height: 1.35)),
            ],
            const Spacer(),
            const SizedBox(height: 12),
            Row(children: [
              Container(
                width: 44,
                height: 44,
                decoration: const BoxDecoration(color: W.gold, shape: BoxShape.circle),
                child: Icon(annonce.playing ? Icons.pause_outlined : Icons.play_arrow_outlined, color: W.navy, size: 24),
              ),
              const SizedBox(width: 10),
              Text(annonce.playing ? tr('Pause') : tr('Écouter'), style: const TextStyle(color: W.goldDeep, fontSize: 16, fontWeight: FontWeight.w700)),
            ]),
          ]),
        ),
      ),
    );
  }
}


class _VideosCarousel extends StatelessWidget {
  const _VideosCarousel({required this.videos});
  final List<HomeVideo> videos;

  @override
  Widget build(BuildContext context) {
    final available = MediaQuery.sizeOf(context).width - 28;
    final cardWidth = (available * 0.82).clamp(220.0, 340.0).toDouble();
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            for (final v in videos) ...[
              SizedBox(width: cardWidth, child: _VideoCard(video: v)),
              const SizedBox(width: 12),
            ],
          ],
        ),
      ),
    );
  }
}

class _VideoCard extends StatelessWidget {
  const _VideoCard({required this.video});
  final HomeVideo video;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(22),
      onTap: video.onOpen,
      child: Container(
        clipBehavior: Clip.antiAlias,
        decoration: _whiteCard(22),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 12, 16),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              const Icon(Icons.ondemand_video_outlined, color: W.goldDeep, size: 20),
              const SizedBox(width: 10),
              Expanded(
                child: Text(tr('Regardez la vidéo !'), style: const TextStyle(color: W.goldDeep, fontSize: 13, fontWeight: FontWeight.w700, letterSpacing: 0.6)),
              ),
              // X visible, comme les cartes Wave : il ferme la
              // carte immédiatement, sans lancer la vidéo.
              IconButton(
                tooltip: tr('Fermer'),
                visualDensity: VisualDensity.compact,
                padding: EdgeInsets.zero,
                constraints: const BoxConstraints(minWidth: 36, minHeight: 36),
                icon: const Icon(Icons.close_outlined, color: W.muted, size: 20),
                onPressed: video.onDismiss,
              ),
            ]),
            Text(video.title, style: const TextStyle(color: W.ink, fontSize: 19, fontWeight: FontWeight.w800, height: 1.2)),
            if (video.text.isNotEmpty) ...[
              const SizedBox(height: 6),
              Text(video.text, maxLines: 3, overflow: TextOverflow.ellipsis, style: const TextStyle(color: W.muted, fontSize: 15, height: 1.35)),
            ],
            const Spacer(),
            const SizedBox(height: 12),
            Row(children: [
              Container(
                width: 44,
                height: 44,
                decoration: const BoxDecoration(color: W.gold, shape: BoxShape.circle),
                child: const Icon(Icons.play_arrow_outlined, color: W.navy, size: 24),
              ),
              const SizedBox(width: 10),
              Text(tr('Regarder'), style: const TextStyle(color: W.goldDeep, fontSize: 16, fontWeight: FontWeight.w700)),
            ]),
          ]),
        ),
      ),
    );
  }
}

class _EventCard extends StatelessWidget {
  const _EventCard({required this.event});
  final HomeEvent event;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(22),
      onTap: event.onTap,
      child: Container(
      clipBehavior: Clip.antiAlias,
      decoration: _whiteCard(22),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        if (event.image != null)
          Image(image: event.image!, width: double.infinity, fit: BoxFit.fitWidth),
        Padding(
          padding: const EdgeInsets.all(16),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              const Icon(Ic.calendar, color: W.goldDeep, size: 20),
              const SizedBox(width: 10),
              Text(event.date ?? tr('À confirmer'), style: const TextStyle(color: W.goldDeep, fontSize: 17, fontWeight: FontWeight.w700)),
            ]),
            const SizedBox(height: 6),
            Text(event.title, style: const TextStyle(color: W.ink, fontSize: 22, fontWeight: FontWeight.w800, height: 1.2)),
            const SizedBox(height: 8),
            Row(children: [
              const Icon(Ic.pin, color: W.muted, size: 20),
              const SizedBox(width: 10),
              Text(event.place ?? tr('À confirmer'), style: const TextStyle(color: W.muted, fontSize: 17)),
            ]),
          ]),
        ),
      ]),
    ),
    );
  }
}

class _NewsCard extends StatelessWidget {
  const _NewsCard({required this.item});
  final HomeNews item;

  @override
  Widget build(BuildContext context) => Container(
        width: double.infinity,
        padding: const EdgeInsets.all(16),
        decoration: _whiteCard(22),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(item.title, style: const TextStyle(color: W.ink, fontSize: 18, fontWeight: FontWeight.w800)),
          const SizedBox(height: 6),
          Text(item.text, style: const TextStyle(color: W.muted, fontSize: 15.5, height: 1.45)),
        ]),
      );
}

class _EmptyNews extends StatelessWidget {
  const _EmptyNews();

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: _DashedBorder(color: const Color(0xFFD3D8E3), radius: 22),
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.fromLTRB(24, 28, 24, 28),
        decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.7), borderRadius: BorderRadius.circular(22)),
        child: Column(children: [
          Icon(Ic.news, color: W.goldDeep, size: 38),
          SizedBox(height: 14),
          Text(rcText('message_aucune_actualite', tr('Aucune actualité pour le moment')), textAlign: TextAlign.center, style: TextStyle(color: W.ink, fontSize: 21, fontWeight: FontWeight.w800)),
          SizedBox(height: 8),
          Text(
            tr('Aucune annonce publiée pour ce périmètre. Ce n’est pas une erreur. Les annonces de la communauté apparaîtront ici dès leur publication. Changez de périmètre ci-dessus pour voir les autres.'),
            textAlign: TextAlign.center,
            style: TextStyle(color: W.muted, fontSize: 15.5, height: 1.55),
          ),
        ]),
      ),
    );
  }
}

class _DashedBorder extends CustomPainter {
  _DashedBorder({required this.color, required this.radius});
  final Color color;
  final double radius;

  @override
  void paint(Canvas canvas, Size size) {
    final path = Path()..addRRect(RRect.fromRectAndRadius(Offset.zero & size, Radius.circular(radius)));
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.4;
    for (final m in path.computeMetrics()) {
      var d = 0.0;
      while (d < m.length) {
        canvas.drawPath(m.extractPath(d, d + 6), paint);
        d += 10;
      }
    }
  }

  @override
  bool shouldRepaint(covariant _DashedBorder old) => old.color != color || old.radius != radius;
}

// ───────────────────────── Barre du bas ─────────────────────────
// Publique (anciennement _BottomNav) pour que l'AppShell puisse
// l'utiliser comme seule barre du bas, sans double barre.
class BottomNavWeb extends StatelessWidget {
  const BottomNavWeb({required this.index, required this.onTap});
  final int index;
  final ValueChanged<int>? onTap;
  // Modèle web, visiteur comme connecté : une seule barre, en bas,
  // sans défilement. Depuis le 28 oct. 2026, à la demande d'Axel,
  // la Librairie est dans la barre, juste après Bible : Accueil,
  // Bible, Librairie, Carte, Communauté, Plus, soit 6 entrées.
  // Correctif 27 oct. 2026 : la barre connectée à 8 entrées avec
  // défilement horizontal est supprimée. Camps, Établissements,
  // Actualités et Bureau restent accessibles par Communauté, et Dons,
  // Librairie, Mes achats, Mon épanouissement, Espace structure,
  // À propos et Aide par Plus. Aucune page n'est supprimée.
  // Le libellé « Donner » de l'ancienne barre est supprimé : la page
  // s'appelle « Dons », comme dans Plus, et le parcours Wave reste
  // inchangé (montant verrouillé, jamais payé sur seul lien).

  @override
  Widget build(BuildContext context) {
    final items = [(Ic.home, rcText('nav_accueil', tr('Accueil'))), (Ic.bible, rcText('nav_bible', tr('Bible'))), (Ic.book, rcText('nav_librairie', tr('Librairie'))), (Ic.card, rcText('nav_carte', tr('Carte'))), (Ic.users, rcText('nav_communaute', tr('Communauté'))), (Ic.plus, rcText('nav_plus', tr('Plus')))];
    final row = Row(children: [
        for (var i = 0; i < items.length; i++)
          Expanded(
            child: InkWell(
              onTap: () => onTap?.call(i),
              child: Column(mainAxisSize: MainAxisSize.min, children: [
                Container(
                  width: 58,
                  height: 38,
                  decoration: BoxDecoration(color: i == index ? W.gold : Colors.transparent, borderRadius: BorderRadius.circular(19)),
                  child: Icon(items[i].$1, size: 24, color: i == index ? W.navy : W.navText),
                ),
                const SizedBox(height: 3),
                SizedBox(
                  width: double.infinity,
                  child: FittedBox(
                    fit: BoxFit.scaleDown,
                    child: Text(items[i].$2,
                        maxLines: 1,
                        style: TextStyle(color: i == index ? W.gold : W.navText, fontSize: 12.5, fontWeight: i == index ? FontWeight.w800 : FontWeight.w500)),
                  ),
                ),
              ]),
            ),
          ),
    ]);
    return Container(
      color: const Color(0xFF0F1D3A),
      padding: EdgeInsets.fromLTRB(8, 6, 8, MediaQuery.of(context).padding.bottom + 6),
      // Barre du bas ordinateur, 30 oct. 2026 : le fond bleu nuit
      // reste pleine largeur, mais les six entrées suivent la même
      // colonne centrée de 1100 px au plus que le contenu, pour ne
      // plus les écarter sur tout l'écran. Téléphone et tablette :
      // barre pleine largeur, inchangée.
      child: Rx.isDesktop(context)
          ? Center(child: ConstrainedBox(constraints: const BoxConstraints(maxWidth: 1100), child: row))
          : row,
    );
  }
}

// ───────────────────────── Vitrine d’accueil visiteur ─────────────────────────
// 1er nov. 2026 : écran d’accueil de l’application quand aucun compte
// n’est connecté. HomePage la renvoie à la place de HomeWeb pour les
// visiteurs ; les membres connectés gardent HomeWeb, inchangé, et
// arrivent direct sur leur accueil comme aujourd’hui.
// Contenu, jamais inventé : le verset vient de la rotation locale, les
// camps, établissements et actualités viennent du serveur via HomePage.
// Là où l’aperçu figeait un contenu non vérifiable en direct (question
// de quiz précise, actualité précise), la carte est un renvoi vers
// l’écran concerné, sans contenu figé. Aucun paiement n’est touché
// ici : les boutons ouvrent les écrans existants (connexion, dons,
// camps, librairie…), qui gardent leurs propres règles.
// Mise en page : même squelette que _HomeWebContent (en-tête fixe +
// liste défilante), colonne centrée 1100 px par l’AppShell sur
// ordinateur, pleine largeur sur téléphone. Les sections sombres
// restent dans cette colonne (l’AppShell ne permet pas le plein écran
// par onglet) ; leurs couleurs reprennent l’aperçu. Palette réelle :
// nuit 0xFF0B1F3A, nuit-2 0xFF0A1A30, papier 0xFFF5F6FA, or W.gold,
// or foncé W.goldDeep. La police reste celle de l’application (la
// police serif de l’aperçu n’est pas embarquée dans l’application).
// Animations sobres, comme l’aperçu : entrée de l’accroche (1,1 s) et
// révélations au défilement, sans jamais bloquer l’accès aux boutons,
// et désactivées quand l’appareil demande moins d’animations.

const _vNuit = Color(0xFF0B1F3A);
const _vNuit2 = Color(0xFF0A1A30);
const _vPapier = Color(0xFFF5F6FA);
const _vSurNuit = Color(0xFFA9B2C4);

class VitrinePage extends StatefulWidget {
  const VitrinePage({
    super.key,
    required this.verse,
    required this.events,
    required this.kairosIndex,
    required this.campTariff,
    required this.etabNames,
    required this.news,
    required this.actions,
    required this.onDon,
    required this.onAbout,
    required this.scrollController,
    required this.offline,
    required this.onRetry,
  });
  final HomeVerse? verse;
  final List<HomeEvent> events;
  final int kairosIndex; // index du camp Kairos dans events, -1 si absent
  final String campTariff; // tarif du camp mis en avant, '' si aucun
  final List<String> etabNames;
  final List<HomeNews> news;
  final HomeActions actions;
  final VoidCallback onDon;
  final VoidCallback onAbout;
  final ScrollController? scrollController;
  final bool offline;
  final VoidCallback? onRetry;

  @override
  State<VitrinePage> createState() => _VitrinePageState();
}

class _VitrinePageState extends State<VitrinePage> {
  final _modulesKey = GlobalKey();
  final _liveKey = GlobalKey();
  final _quizKey = GlobalKey();
  final _donKey = GlobalKey();
  final _quiKey = GlobalKey();

  HomeEvent? get _campEvent {
    if (widget.events.isEmpty) return null;
    if (widget.kairosIndex >= 0 && widget.kairosIndex < widget.events.length) {
      return widget.events[widget.kairosIndex];
    }
    return widget.events.first;
  }

  void _scrollTo(GlobalKey key) {
    final ctx = key.currentContext;
    if (ctx != null) {
      Scrollable.ensureVisible(ctx, duration: const Duration(milliseconds: 500), curve: Curves.easeOut);
    }
  }

  void _scrollTop() {
    final c = widget.scrollController;
    if (c != null && c.hasClients) {
      c.animateTo(0, duration: const Duration(milliseconds: 500), curve: Curves.easeOut);
    }
  }

  void _openMenu() {
    showModalBottomSheet<void>(
      context: context,
      builder: (sheetCtx) => SafeArea(
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          ListTile(
            title: Text(tr('Application')),
            onTap: () {
              Navigator.of(sheetCtx).pop();
              _scrollTop();
            },
          ),
          ListTile(
            title: Text(tr('Camps')),
            onTap: () {
              Navigator.of(sheetCtx).pop();
              _scrollTo(_liveKey);
            },
          ),
          ListTile(
            title: Text(tr('Quiz')),
            onTap: () {
              Navigator.of(sheetCtx).pop();
              _scrollTo(_quizKey);
            },
          ),
          ListTile(
            title: Text(tr('Donner')),
            onTap: () {
              Navigator.of(sheetCtx).pop();
              _scrollTo(_donKey);
            },
          ),
          ListTile(
            title: Text(tr('Qui sommes-nous')),
            onTap: () {
              Navigator.of(sheetCtx).pop();
              _scrollTo(_quiKey);
            },
          ),
        ]),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final w = MediaQuery.sizeOf(context).width;
    final wide = w >= 700;
    final pad = wide ? 24.0 : 16.0;
    return Column(children: [
      _header(context, wide, pad),
      if (widget.offline)
        Container(
          width: double.infinity,
          color: W.banner,
          padding: const EdgeInsets.fromLTRB(14, 10, 14, 10),
          child: Row(children: [
            const Icon(Icons.cloud_off_outlined, color: W.gold, size: 19),
            const SizedBox(width: 8),
            Expanded(
              child: Text(
                  rcText('message_hors_ligne', tr('Hors ligne : contenus locaux affichés. La synchronisation reprendra en ligne.')),
                  style: const TextStyle(color: Colors.white, fontSize: 13)),
            ),
            if (widget.onRetry != null)
              InkWell(
                onTap: widget.onRetry,
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 15, horizontal: 12),
                  child: Text(tr('Réessayer'), style: const TextStyle(color: W.gold, fontSize: 13, fontWeight: FontWeight.w700)),
                ),
              ),
          ]),
        ),
      Expanded(
        // Défilement vitrine, correctif 1er nov. 2026 : SingleChildScrollView
        // au lieu de ListView. Le ListView ne construisait que les sections
        // visibles, donc les onglets vers les sections plus bas ne trouvaient
        // aucune destination et ne faisaient rien. Ici toutes les sections
        // sont construites dès l'ouverture, chaque onglet a sa destination.
        child: SingleChildScrollView(
          controller: widget.scrollController,
          padding: const EdgeInsets.only(bottom: 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _hero(context, wide, pad),
              if (widget.verse != null) _verseSection(context, wide, pad),
              _modulesSection(context, w, pad),
              _liveSection(context, w, pad),
              _quizSection(context, wide, pad),
              _bibleSection(context, w, pad),
              _donSection(context, w, pad),
              _quiSection(context, w, pad),
              _footer(context, w, pad),
            ],
          ),
        ),
      ),
    ]);
  }

  // ── En-tête fixe : marque, menu, langue, accès membre ──
  Widget _header(BuildContext context, bool wide, double pad) {
    final langLabel = isEn ? 'EN' : 'FR';
    final menuLinks = [
      (tr('Application'), _scrollTop),
      (tr('Camps'), () => _scrollTo(_liveKey)),
      (tr('Quiz'), () => _scrollTo(_quizKey)),
      (tr('Donner'), () => _scrollTo(_donKey)),
      (tr('Qui sommes-nous'), () => _scrollTo(_quiKey)),
    ];
    return Container(
      color: _vNuit,
      padding: EdgeInsets.fromLTRB(pad, 12, pad, 12),
      child: Row(children: [
        Expanded(
          child: InkWell(
            onTap: _scrollTop,
            child: RichText(
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              text: const TextSpan(
                style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, letterSpacing: 0.5),
                children: [
                  TextSpan(text: 'CONNEXION ', style: TextStyle(color: Colors.white)),
                  TextSpan(text: 'PROPHÉTIQUE', style: TextStyle(color: W.gold)),
                ],
              ),
            ),
          ),
        ),
        if (wide)
          for (final link in menuLinks)
            TextButton(
              onPressed: link.$2,
              child: Text(link.$1, style: const TextStyle(color: _vSurNuit, fontSize: 14, fontWeight: FontWeight.w600)),
            ),
        TextButton(
          onPressed: widget.actions.onLanguage,
          child: Text(langLabel, style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w700)),
        ),
        if (!wide)
          IconButton(
            onPressed: _openMenu,
            icon: const Icon(Icons.menu, color: Colors.white),
            tooltip: tr('Menu'),
          ),
        TextButton(
          onPressed: widget.actions.onSignup,
          child: Text(tr('Accès membre'), style: const TextStyle(color: W.gold, fontSize: 14, fontWeight: FontWeight.w800)),
        ),
      ]),
    );
  }

  // ── Boutons, comme l’aperçu : or plein, ou contour or ──
  Widget _goldButton(String label, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(10),
      child: Container(
        height: 48,
        padding: const EdgeInsets.symmetric(horizontal: 22),
        alignment: Alignment.center,
        decoration: BoxDecoration(color: W.gold, borderRadius: BorderRadius.circular(10)),
        child: Text(label, style: const TextStyle(color: _vNuit, fontSize: 15, fontWeight: FontWeight.w800)),
      ),
    );
  }

  Widget _outlineButton(String label, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(10),
      child: Container(
        height: 48,
        padding: const EdgeInsets.symmetric(horizontal: 22),
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: Colors.transparent,
          border: Border.all(color: W.gold, width: 1.5),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Text(label, style: const TextStyle(color: W.gold, fontSize: 15, fontWeight: FontWeight.w800)),
      ),
    );
  }

  Widget _sectionTitle(String text, {bool center = false, bool dark = false}) {
    return Text(
      text,
      textAlign: center ? TextAlign.center : TextAlign.start,
      style: TextStyle(color: dark ? Colors.white : _vNuit, fontSize: 26, fontWeight: FontWeight.w800, height: 1.2),
    );
  }

  Widget _lead(String text, {bool center = false, bool dark = false}) {
    return Text(
      text,
      textAlign: center ? TextAlign.center : TextAlign.start,
      style: TextStyle(color: dark ? _vSurNuit : W.muted, fontSize: 15, height: 1.5),
    );
  }

  Widget _label(String text) {
    return Text(text, style: const TextStyle(color: W.goldDeep, fontSize: 12, fontWeight: FontWeight.w800, letterSpacing: 1.2));
  }

  // ── Grande accroche, entrée animée comme l’aperçu ──
  Widget _hero(BuildContext context, bool wide, double pad) {
    final title = tr('Une communauté, une Bible, un chemin.');
    final gold = tr('une Bible,');
    final parts = title.split(gold);
    final titleWidget = RichText(
      text: TextSpan(
        style: TextStyle(color: Colors.white, fontSize: wide ? 44 : 32, fontWeight: FontWeight.w800, height: 1.15),
        children: [
          TextSpan(text: parts[0]),
          if (parts.length > 1) TextSpan(text: gold, style: const TextStyle(color: W.gold, fontStyle: FontStyle.italic)),
          if (parts.length > 1) TextSpan(text: parts.sublist(1).join(gold)),
        ],
      ),
    );
    final content = Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      titleWidget,
      const SizedBox(height: 16),
      Text(
        tr('Carte de membre, lecture de la Bible, quiz, camps, enseignements et librairie, réunis dans une seule application.'),
        style: const TextStyle(color: _vSurNuit, fontSize: 16, height: 1.5),
      ),
      const SizedBox(height: 28),
      Wrap(spacing: 12, runSpacing: 12, children: [
        _goldButton(tr('Ouvrir l’application'), () => widget.actions.onSignup?.call()),
        _outlineButton(tr('Voir ce qu’elle contient'), () => _scrollTo(_modulesKey)),
      ]),
    ]);
    final animated = MediaQuery.disableAnimationsOf(context)
        ? content
        : TweenAnimationBuilder<double>(
            tween: Tween(begin: 0, end: 1),
            duration: const Duration(milliseconds: 1100),
            curve: Curves.easeOut,
            builder: (ctx, v, child) => Opacity(
              opacity: v,
              child: Transform.translate(offset: Offset(0, 16 * (1 - v)), child: child),
            ),
            child: content,
          );
    return Container(
      color: _vNuit,
      padding: EdgeInsets.fromLTRB(pad, wide ? 64 : 48, pad, wide ? 64 : 48),
      child: animated,
    );
  }

  // ── Verset du jour, rotation locale, centré ──
  Widget _verseSection(BuildContext context, bool wide, double pad) {
    final verse = widget.verse!;
    return _VitrineReveal(
      controller: widget.scrollController,
      child: Container(
        color: _vPapier,
        padding: EdgeInsets.fromLTRB(pad, wide ? 56 : 40, pad, wide ? 56 : 40),
        child: Column(children: [
          Text(
            verse.text,
            textAlign: TextAlign.center,
            style: TextStyle(color: _vNuit, fontSize: wide ? 26 : 21, fontStyle: FontStyle.italic, height: 1.5),
          ),
          const SizedBox(height: 14),
          Text(
            verse.version.isEmpty ? verse.ref : '${verse.ref} · ${verse.version}',
            textAlign: TextAlign.center,
            style: const TextStyle(color: W.goldDeep, fontSize: 14, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 8),
          Text(
            tr('Un verset nouveau chaque jour, dans l’application.'),
            textAlign: TextAlign.center,
            style: const TextStyle(color: W.muted, fontSize: 13),
          ),
        ]),
      ),
    );
  }

  // ── Modules : les 7 fonctions, chacune vers son écran existant ──
  Widget _modulesSection(BuildContext context, double w, double pad) {
    final modules = [
      (Icons.menu_book_outlined, tr('La Bible'), tr('La Bible complète, dans deux traductions, avec recherche, favoris et lecture audio.'), widget.actions.onBible),
      (Icons.auto_stories_outlined, tr('Plan de lecture'), tr('Un parcours de lecture guidé, jour après jour, pour progresser dans la foi.'), widget.actions.onGrowth),
      (Icons.favorite_border, tr('Prière'), tr('Confier un sujet en privé, par courriel, sans publication.'), widget.actions.onPrayer),
      (Icons.play_circle_outline, tr('Enseignements'), tr('Musiques et enseignements publiés par la structure, à écouter dans l’application.'), widget.actions.onTeachings),
      (Icons.event_outlined, tr('Camps'), tr('S’inscrire à un camp ou à une retraite, recevoir son pass et son badge.'), widget.actions.onCamps),
      (Icons.storefront_outlined, tr('Librairie'), tr('Les livres publiés par la structure, à lire après achat.'), widget.actions.onShop),
      (Icons.badge_outlined, tr('Carte de membre'), tr('Votre carte de membre, avec photo, matricule et validité.'), widget.actions.onSignup),
    ];
    final twoCol = w >= 900;
    final itemWidth = twoCol ? (w - 2 * pad - 12) / 2 : double.infinity;
    final rows = modules.map((m) {
      return SizedBox(
        width: itemWidth,
        child: InkWell(
          onTap: m.$4,
          borderRadius: BorderRadius.circular(14),
          child: Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(color: Colors.white, border: Border.all(color: W.line), borderRadius: BorderRadius.circular(14)),
            child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(color: W.gold.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(12)),
                child: Icon(m.$1, color: W.goldDeep, size: 24),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(m.$2, style: const TextStyle(color: _vNuit, fontSize: 16, fontWeight: FontWeight.w800)),
                  const SizedBox(height: 4),
                  Text(m.$3, style: const TextStyle(color: W.muted, fontSize: 14, height: 1.4)),
                ]),
              ),
              const Icon(Icons.chevron_right, color: W.muted, size: 22),
            ]),
          ),
        ),
      );
    }).toList();
    return _VitrineReveal(
      controller: widget.scrollController,
      child: Container(
        key: _modulesKey,
        color: Colors.white,
        padding: EdgeInsets.fromLTRB(pad, 40, pad, 40),
        child: Column(children: [
          _sectionTitle(tr('Tout ce qui nourrit la foi, dans une seule application.'), center: true),
          const SizedBox(height: 12),
          _lead(tr('Une même application pour lire, prier, apprendre, s’inscrire et soutenir la communauté. Le contenu est publié par la structure et mis à jour en direct.'), center: true),
          const SizedBox(height: 24),
          if (twoCol) Wrap(spacing: 12, runSpacing: 12, children: rows) else Column(children: [for (final r in rows) Padding(padding: const EdgeInsets.only(bottom: 12), child: r)]),
        ]),
      ),
    );
  }

  // ── Cartes en direct : camp, actualité, établissements ──
  Widget _liveSection(BuildContext context, double w, double pad) {
    final campEvent = _campEvent;
    final newsFirst = widget.news.isNotEmpty ? widget.news.first : null;
    final campCard = _liveCard(
      label: tr('Prochain camp').toUpperCase(),
      icon: Icons.event_outlined,
      title: campEvent?.title ?? tr('Camps'),
      body: campEvent == null
          ? tr('Les camps et retraites de la communauté, dans l’application.')
          : [
              if (campEvent.date != null) campEvent.date!,
              if (campEvent.place != null) campEvent.place!,
            ].join(' · '),
      tariff: campEvent == null ? '' : widget.campTariff,
      image: campEvent?.image,
      buttonLabel: tr('Voir ce camp'),
      onTap: campEvent?.onTap ?? widget.actions.onCamps,
    );
    final newsCard = _liveCard(
      label: tr('Actualité').toUpperCase(),
      icon: Icons.newspaper_outlined,
      title: newsFirst?.title ?? tr('Actualité'),
      body: newsFirst?.text ?? tr('Les actualités de la communauté, dans l’application.'),
      bodyMaxLines: newsFirst == null ? null : 4,
      buttonLabel: tr('Voir les actualités'),
      onTap: widget.actions.onNews,
    );
    final etabsCard = _liveCard(
      label: tr('Établissements').toUpperCase(),
      icon: Icons.school_outlined,
      title: tr('Établissements'),
      body: widget.etabNames.isEmpty ? tr('Les activités par école, dans l’application.') : widget.etabNames.join(', '),
      buttonLabel: tr('Voir les établissements'),
      onTap: widget.actions.onEtabs,
    );
    final threeCol = w >= 900;
    return _VitrineReveal(
      controller: widget.scrollController,
      child: Container(
        key: _liveKey,
        color: _vPapier,
        padding: EdgeInsets.fromLTRB(pad, 40, pad, 40),
        child: Column(children: [
          _sectionTitle(tr('Camps, actualités et établissements, en direct.'), center: true),
          const SizedBox(height: 12),
          _lead(tr('Ce que la structure publie dans l’application, visible ici aussi. L’inscription et le pass numérique se font dans l’application, après connexion.'), center: true),
          const SizedBox(height: 24),
          if (threeCol)
            Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Expanded(child: campCard),
              const SizedBox(width: 12),
              Expanded(child: newsCard),
              const SizedBox(width: 12),
              Expanded(child: etabsCard),
            ])
          else
            Column(children: [
              campCard,
              const SizedBox(height: 12),
              newsCard,
              const SizedBox(height: 12),
              etabsCard,
            ]),
        ]),
      ),
    );
  }

  Widget _liveCard({
    required String label,
    required IconData icon,
    required String title,
    required String body,
    String tariff = '',
    ImageProvider? image,
    int? bodyMaxLines,
    required String buttonLabel,
    required VoidCallback? onTap,
  }) {
    return Container(
      decoration: BoxDecoration(color: Colors.white, border: Border.all(color: W.line), borderRadius: BorderRadius.circular(14)),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(14),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          if (image != null) SizedBox(height: 150, width: double.infinity, child: Image(image: image, fit: BoxFit.cover)),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                Icon(icon, color: W.goldDeep, size: 18),
                const SizedBox(width: 6),
                Expanded(child: _label(label)),
              ]),
              const SizedBox(height: 8),
              Text(title, style: const TextStyle(color: _vNuit, fontSize: 18, fontWeight: FontWeight.w800)),
              const SizedBox(height: 6),
              if (body.isNotEmpty)
                Text(body, maxLines: bodyMaxLines, overflow: bodyMaxLines == null ? null : TextOverflow.ellipsis, style: const TextStyle(color: W.muted, fontSize: 14, height: 1.4)),
              if (tariff.isNotEmpty) ...[
                const SizedBox(height: 8),
                Text('${tr('Participation :')} $tariff', style: const TextStyle(color: _vNuit, fontSize: 15, fontWeight: FontWeight.w800)),
              ],
              const SizedBox(height: 12),
              InkWell(
                onTap: onTap,
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 10),
                  child: Text(buttonLabel, style: const TextStyle(color: W.goldDeep, fontSize: 15, fontWeight: FontWeight.w800)),
                ),
              ),
            ]),
          ),
        ]),
      ),
    );
  }

  // ── Quiz : renvoi vers l’écran Quiz, aucune question figée ──
  Widget _quizSection(BuildContext context, bool wide, double pad) {
    return _VitrineReveal(
      controller: widget.scrollController,
      child: Container(
        key: _quizKey,
        color: _vNuit,
        padding: EdgeInsets.fromLTRB(pad, 40, pad, 40),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          _sectionTitle(tr('Testez ce que vous savez de la Bible.'), dark: true),
          const SizedBox(height: 12),
          _lead(tr('Le quiz complet couvre 21 personnages, du plus connu au plus discret. Chaque partie se joue dans l’application.'), dark: true),
          const SizedBox(height: 24),
          _goldButton(tr('Lancer le quiz complet'), () => widget.actions.onQuiz?.call()),
        ]),
      ),
    );
  }

  // ── Bible : traits réels de l’application, deux colonnes sur ordinateur ──
  Widget _bibleSection(BuildContext context, double w, double pad) {
    final traits = [
      (Icons.translate_outlined, tr('Traductions'), 'Louis Segond et King James'),
      (Icons.search_outlined, tr('Recherche'), tr('Dans toute la Bible')),
      (Icons.book_outlined, tr('Dictionnaire'), tr('Intégré à la lecture')),
      (Icons.download_for_offline_outlined, tr('Hors connexion'), tr('Chapitres déjà consultés')),
    ];
    final traitsWidget = Column(children: [
      for (final t in traits)
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(color: W.gold.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(12)),
              child: Icon(t.$1, color: W.goldDeep, size: 24),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(t.$2, style: const TextStyle(color: _vNuit, fontSize: 16, fontWeight: FontWeight.w800)),
                const SizedBox(height: 2),
                Text(t.$3, style: const TextStyle(color: W.muted, fontSize: 14)),
              ]),
            ),
          ]),
        ),
    ]);
    final left = Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      _sectionTitle(tr('Lire, chercher, écouter.')),
      const SizedBox(height: 12),
      _lead(tr('La Bible complète, dans deux traductions, avec un verset différent à chaque ouverture de l’application. Chaque chapitre peut aussi être écouté.')),
      const SizedBox(height: 24),
      _goldButton(tr('Ouvrir la Bible'), () => widget.actions.onBible?.call()),
    ]);
    return _VitrineReveal(
      controller: widget.scrollController,
      child: Container(
        color: Colors.white,
        padding: EdgeInsets.fromLTRB(pad, 40, pad, 40),
        child: w >= 900
            ? Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Expanded(child: left),
                const SizedBox(width: 32),
                Expanded(child: traitsWidget),
              ])
            : Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                left,
                const SizedBox(height: 32),
                traitsWidget,
              ]),
      ),
    );
  }

  // ── Dons : les 4 étapes du parcours réel, puis l’écran Dons ──
  Widget _donSection(BuildContext context, double w, double pad) {
    final steps = [
      (tr('Choisir'), tr('Le montant, libre ou guidé par l’appel.')),
      (tr('Préciser'), tr('Le destinataire, camp, don ou cotisation.')),
      (tr('Demander'), tr('Un lien de paiement, au montant exact.')),
      (tr('Recevoir'), tr('La facture, une fois le paiement confirmé.')),
    ];
    final stepWidgets = steps.map((s) {
      final index = steps.indexOf(s) + 1;
      return Padding(
        padding: const EdgeInsets.only(bottom: 20),
        child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Container(
            width: 36,
            height: 36,
            alignment: Alignment.center,
            decoration: const BoxDecoration(color: W.gold, shape: BoxShape.circle),
            child: Text('$index', style: const TextStyle(color: _vNuit, fontSize: 16, fontWeight: FontWeight.w800)),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(s.$1, style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w800)),
              const SizedBox(height: 2),
              Text(s.$2, style: const TextStyle(color: _vSurNuit, fontSize: 14, height: 1.4)),
            ]),
          ),
        ]),
      );
    }).toList();
    return _VitrineReveal(
      controller: widget.scrollController,
      child: Container(
        key: _donKey,
        color: _vNuit2,
        padding: EdgeInsets.fromLTRB(pad, 40, pad, 40),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          _sectionTitle(tr('Donner, simplement.'), dark: true),
          const SizedBox(height: 12),
          _lead(tr('Chaque paiement est clair : le montant exact s’affiche avant de payer, et la facture suit une fois le paiement confirmé.'), dark: true),
          const SizedBox(height: 28),
          if (w >= 900)
            Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              for (int i = 0; i < stepWidgets.length; i++) ...[
                Expanded(child: stepWidgets[i]),
                if (i < stepWidgets.length - 1) const SizedBox(width: 16),
              ],
            ])
          else
            Column(children: stepWidgets),
          const SizedBox(height: 8),
          _goldButton(tr('Faire un don dans l’application'), widget.onDon),
          const SizedBox(height: 28),
          Row(children: [
            Expanded(
              child: Column(children: [
                const Text('1 000', style: TextStyle(color: W.gold, fontSize: 26, fontWeight: FontWeight.w800)),
                const SizedBox(height: 4),
                Text(tr('FCFA par mois, cotisation de membre'), textAlign: TextAlign.center, style: const TextStyle(color: _vSurNuit, fontSize: 13)),
              ]),
            ),
            Expanded(
              child: Column(children: [
                const Text('1 an', style: TextStyle(color: W.gold, fontSize: 26, fontWeight: FontWeight.w800)),
                const SizedBox(height: 4),
                Text(tr('de validité pour la carte de membre'), textAlign: TextAlign.center, style: const TextStyle(color: _vSurNuit, fontSize: 13)),
              ]),
            ),
          ]),
        ]),
      ),
    );
  }

  // ── Qui sommes-nous : texte approuvé seulement ──
  Widget _quiSection(BuildContext context, double w, double pad) {
    final pillars = [
      (Icons.menu_book_outlined, tr('Formation spirituelle'), tr('Enseignements, prière et lecture de la Bible, pour grandir dans la foi.')),
      (Icons.school_outlined, tr('Milieu scolaire'), tr('Agir contre les grossesses en milieu scolaire et accompagner les élèves.')),
      (Icons.groups_outlined, tr('Réinsertion'), tr('Accompagner les jeunes en dépendance vers une vie nouvelle.')),
      (Icons.create_outlined, tr('Scolarisation'), tr('Aider des enfants défavorisés à aller à l’école et à y rester.')),
    ];
    final twoCol = w >= 900;
    final itemWidth = twoCol ? (w - 2 * pad - 12) / 2 : double.infinity;
    return _VitrineReveal(
      controller: widget.scrollController,
      child: Container(
        key: _quiKey,
        color: _vPapier,
        padding: EdgeInsets.fromLTRB(pad, 40, pad, 40),
        child: Column(children: [
          _sectionTitle(tr('Qui sommes-nous'), center: true),
          const SizedBox(height: 12),
          Text(
            tr('Une association chrétienne, créée en 2019 en Côte d’Ivoire, pour la jeunesse et les communautés qui en ont le plus besoin.'),
            textAlign: TextAlign.center,
            style: const TextStyle(color: _vNuit, fontSize: 17, height: 1.5),
          ),
          const SizedBox(height: 28),
          Wrap(
            spacing: 12,
            runSpacing: 12,
            children: pillars.map((p) {
              return SizedBox(
                width: itemWidth,
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(color: Colors.white, border: Border.all(color: W.line), borderRadius: BorderRadius.circular(14)),
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Icon(p.$1, color: W.goldDeep, size: 26),
                    const SizedBox(height: 10),
                    Text(p.$2, style: const TextStyle(color: _vNuit, fontSize: 16, fontWeight: FontWeight.w800)),
                    const SizedBox(height: 4),
                    Text(p.$3, style: const TextStyle(color: W.muted, fontSize: 14, height: 1.4)),
                  ]),
                ),
              );
            }).toList(),
          ),
        ]),
      ),
    );
  }

  // ── Pied de page : explorer, contact, sans adresse ni numéro inventés ──
  Widget _footer(BuildContext context, double w, double pad) {
    final explorerLinks = [
      (tr('Application'), _scrollTop),
      (tr('Quiz'), () => _scrollTo(_quizKey)),
      (tr('Donner'), () => _scrollTo(_donKey)),
      (tr('Confidentialité'), widget.onAbout),
    ];
    final brand = Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      RichText(
        text: const TextSpan(
          style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, letterSpacing: 0.5),
          children: [
            TextSpan(text: 'CONNEXION ', style: TextStyle(color: Colors.white)),
            TextSpan(text: 'PROPHÉTIQUE', style: TextStyle(color: W.gold)),
          ],
        ),
      ),
      const SizedBox(height: 8),
      Text(
        tr('Association chrétienne à but non lucratif, fondée en 2019 en Côte d’Ivoire.'),
        style: const TextStyle(color: _vSurNuit, fontSize: 14, height: 1.4),
      ),
    ]);
    final explorer = Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text(tr('Explorer'), style: const TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.w800)),
      const SizedBox(height: 8),
      for (final link in explorerLinks)
        InkWell(
          onTap: link.$2,
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: Text(link.$1, style: const TextStyle(color: _vSurNuit, fontSize: 15)),
          ),
        ),
    ]);
    final contact = Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text(tr('Contact'), style: const TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.w800)),
      const SizedBox(height: 8),
      InkWell(
        onTap: widget.actions.onPrayer,
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Text(tr('Sujet de prière, dans l’application'), style: const TextStyle(color: _vSurNuit, fontSize: 15)),
        ),
      ),
    ]);
    return Container(
      color: _vNuit,
      padding: EdgeInsets.fromLTRB(pad, 40, pad, 24),
      child: w >= 900
          ? Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Expanded(flex: 2, child: brand),
              const SizedBox(width: 32),
              Expanded(child: explorer),
              const SizedBox(width: 32),
              Expanded(child: contact),
            ])
          : Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              brand,
              const SizedBox(height: 28),
              explorer,
              const SizedBox(height: 28),
              contact,
            ]),
    );
  }
}

// ── Révélation au défilement, comme l’aperçu ──
// Le contenu apparaît (opacité + léger glissement) quand il entre dans
// la partie visible de l’écran. Ne bloque jamais l’accès aux boutons :
// l’animation ne change ni la position finale ni la zone tactile.
// Désactivée quand l’appareil demande moins d’animations.
class _VitrineReveal extends StatefulWidget {
  const _VitrineReveal({required this.controller, required this.child});
  final ScrollController? controller;
  final Widget child;

  @override
  State<_VitrineReveal> createState() => _VitrineRevealState();
}

class _VitrineRevealState extends State<_VitrineReveal> {
  bool _visible = false;

  @override
  void initState() {
    super.initState();
    if (widget.controller == null) {
      _visible = true;
      return;
    }
    WidgetsBinding.instance.addPostFrameCallback((_) => _check());
    widget.controller!.addListener(_check);
  }

  @override
  void dispose() {
    widget.controller?.removeListener(_check);
    super.dispose();
  }

  void _check() {
    if (_visible || !mounted) return;
    final box = context.findRenderObject() as RenderBox?;
    if (box == null || !box.attached) return;
    final top = box.localToGlobal(Offset.zero).dy;
    final height = MediaQuery.sizeOf(context).height;
    if (top < height * 0.92) setState(() => _visible = true);
  }

  @override
  Widget build(BuildContext context) {
    if (MediaQuery.disableAnimationsOf(context)) return widget.child;
    return AnimatedOpacity(
      opacity: _visible ? 1 : 0,
      duration: const Duration(milliseconds: 700),
      curve: Curves.easeOut,
      child: AnimatedSlide(
        offset: _visible ? Offset.zero : const Offset(0, 0.06),
        duration: const Duration(milliseconds: 700),
        curve: Curves.easeOut,
        child: widget.child,
      ),
    );
  }
}
