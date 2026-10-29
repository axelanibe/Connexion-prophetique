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
import 'remote_config.dart';
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
    this.onScope,
    this.onSeeAllEvents,
    this.onSendPrayer,
    this.onTab,
    this.onBag,
    this.onProfile,
  });
  final VoidCallback? onSignup, onQuitVisitor, onLanguage, onCreateCard, onBible, onQuiz, onTeachings, onPrayer, onBag, onProfile;
  final VoidCallback? onReadChapter, onListen, onListenHq, onShare, onCamps, onEtabs, onNews, onShop, onGrowth;
  final VoidCallback? onSeeAllEvents, onSendPrayer;
  final ValueChanged<int>? onAnswer, onScope, onTab;
  final VoidCallback? onNextQuiz, onQuizRestart, onQuizFull;
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
    this.birthdayVerse,
    this.seasonalTitle = '',
    this.seasonalVerse,
  });

  final HomeActions actions;
  final bool visitor;
  final String language;
  final Widget? logo;
  final HomeVerse? verse;
  final HomeQuiz? quiz;
  // Cartes anniversaire et saisonnière, 29 oct. 2026 : null veut
  // dire aucune carte, jamais une carte vide.
  final HomeVerse? birthdayVerse;
  final String seasonalTitle;
  final HomeVerse? seasonalVerse;
  final List<String> scopes; // « Tous », puis les établissements
  final int scopeIndex;
  final List<HomeEvent> events;
  final List<HomeNews> news;
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
      birthdayVerse: birthdayVerse,
      seasonalTitle: seasonalTitle,
      seasonalVerse: seasonalVerse,
    );
    // Intégré dans l'AppShell (showBottomNav false) : aucun Scaffold propre,
    // pour ne pas imbriquer deux Scaffold. La barre du bas est alors celle
    // de l'AppShell (BottomNavWeb), et le fond reste celui du thème (papier).
    if (!showBottomNav) return content;
    return Scaffold(
      backgroundColor: W.paper,
      body: content,
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
    this.birthdayVerse,
    this.seasonalTitle = '',
    this.seasonalVerse,
  });
  final HomeActions actions;
  final bool visitor;
  final String language;
  final Widget? logo;
  final HomeVerse? verse;
  final HomeQuiz? quiz;
  final HomeVerse? birthdayVerse;
  final String seasonalTitle;
  final HomeVerse? seasonalVerse;
  final List<String> scopes;
  final int scopeIndex;
  final List<HomeEvent> events;
  final List<HomeNews> news;
  final String structureEmail;
  final bool offline;
  final VoidCallback? onRetry;
  final String memberName, memberMatricule;
  final Widget? memberPhoto;
  final String memberValidUntilLabel;
  final bool quizFinished;
  final int quizFinalScore, quizFinalTotal;

  @override
  Widget build(BuildContext context) {
    return Column(children: [
        _Header(logo: logo, language: language, onLanguage: actions.onLanguage, subtitle: tr('Accueil'), visitor: visitor, memberPhoto: memberPhoto, onBag: actions.onBag, onProfile: actions.onProfile),
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
            padding: const EdgeInsets.fromLTRB(14, 16, 14, 24),
            children: [
              _HeroCard(
                  visitor: visitor,
                  onTap: actions.onCreateCard,
                  memberName: memberName,
                  memberMatricule: memberMatricule,
                  memberPhoto: memberPhoto,
                  memberValidUntilLabel: memberValidUntilLabel),
              // Cartes anniversaire et saisonnière, 29 oct. 2026 :
              // en haut de l'accueil, pour ne pas être manquées.
              // L'anniversaire d'abord, puis la saison, jamais
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
              if (seasonalVerse != null && seasonalTitle.isNotEmpty) ...[
                const SizedBox(height: 22),
                _CelebrationCard(
                  icon: Icons.celebration_outlined,
                  title: tr(seasonalTitle),
                  verse: seasonalVerse!,
                ),
              ],
              const SizedBox(height: 28),
              if (rcSection('vie_spirituelle')) ...[
                _SectionLabel(rcText('titre_vie_spirituelle', tr('Ma vie spirituelle'))),
                _SpiritualGrid(actions: actions),
              ],
              if (verse != null && rcSection('verset_du_jour')) ...[const SizedBox(height: 22), _VerseCard(verse: verse!, actions: actions)],
              const SizedBox(height: 28),
              if (rcSection('explorer')) ...[
                _SectionLabel(rcText('titre_explorer', tr('Explorer'))),
                _ExploreList(actions: actions),
              ],
              if (rcSection('quiz')) ...[
                if (quizFinished) ...[
                  const SizedBox(height: 28),
                  _SectionTitle(tr('Quiz Bible')),
                  const SizedBox(height: 12),
                  _QuizDoneCard(score: quizFinalScore, total: quizFinalTotal, onRestart: actions.onQuizRestart, onFull: actions.onQuizFull),
                ] else if (quiz != null) ...[
                  const SizedBox(height: 28),
                  _SectionTitle(tr('Quiz Bible'), trailing: _Pill(isEn ? 'Quiz ${quiz!.quizNumber} of ${quiz!.quizTotal}' : 'Quiz ${quiz!.quizNumber} sur ${quiz!.quizTotal}')),
                  const SizedBox(height: 12),
                  _QuizCard(quiz: quiz!, onAnswer: actions.onAnswer, onNext: actions.onNextQuiz),
                ],
              ],
              if (scopes.isNotEmpty) ...[const SizedBox(height: 22), _ScopeChips(scopes: scopes, index: scopeIndex, onTap: actions.onScope)],
              if (rcSection('rendez_vous')) ...[
                const SizedBox(height: 26),
                _SectionTitle(rcText('titre_rendez_vous', tr('Prochains rendez-vous')), link: tr('Tout voir'), onLink: actions.onSeeAllEvents),
                const SizedBox(height: 12),
                for (final e in events) ...[_EventCard(event: e), const SizedBox(height: 12)],
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
              const SizedBox(height: 26),
              if (rcSection('priere')) _PrayerSection(email: structureEmail, onSend: actions.onSendPrayer),
            ],
          ),
        ),
      ]);
  }
}

// ───────────────────────── En-tête et bandeau visiteur (fixes en haut) ─────────────────────────
class _Header extends StatelessWidget {
  const _Header({required this.logo, required this.language, required this.onLanguage, this.subtitle = 'Accueil', this.visitor = true, this.memberPhoto, this.onBag, this.onProfile});
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

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.fromLTRB(14, MediaQuery.of(context).padding.top + 10, 14, 10),
      decoration: const BoxDecoration(
        color: W.header,
        border: Border(bottom: BorderSide(color: W.headerLine)),
      ),
      child: Row(children: [
        // En-tête web, 27 oct. 2026 : logo CP à gauche, titre
        // CONNEXION PROPHÉTIQUE en or, sous-titre = page en cours.
        // Voir header_logo.dart, logo CP recadré depuis la capture web.
        headerLogo(),
        const SizedBox(width: 8),
        Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
            Text('CONNEXION PROPHÉTIQUE', maxLines: 1, overflow: TextOverflow.ellipsis, softWrap: false,
                style: TextStyle(color: W.gold, fontSize: 11.5, fontWeight: FontWeight.w700, letterSpacing: 0.8)),
            Text(tr(subtitle), maxLines: 1, overflow: TextOverflow.ellipsis, softWrap: false, style: const TextStyle(color: W.onDarkMuted, fontSize: 12)),
          ]),
        ),
        Material(
          color: const Color(0x14FFFFFF),
          shape: const StadiumBorder(side: BorderSide(color: Color(0xFF3A4A6A))),
          child: InkWell(
            customBorder: const StadiumBorder(),
            onTap: onLanguage,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: SizedBox(
                height: 34,
                child: Row(mainAxisSize: MainAxisSize.min, children: [
                  const Icon(Ic.globe, color: W.gold, size: 17),
                  const SizedBox(width: 6),
                  Text(language, style: const TextStyle(color: Colors.white, fontSize: 13.5, fontWeight: FontWeight.w700)),
                ]),
              ),
            ),
          ),
        ),
        if (!visitor) ...[
          const SizedBox(width: 8),
          InkWell(
            customBorder: const CircleBorder(),
            onTap: onBag,
            child: const Padding(
              padding: EdgeInsets.all(6),
              child: Icon(Icons.shopping_bag_outlined, color: Colors.white, size: 22),
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
                width: 34,
                height: 34,
                child: memberPhoto ??
                    Container(
                      color: W.gold,
                      child: const Icon(Icons.person_outlined, color: Color(0xFF0B1F3A), size: 20),
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

class _SpiritualGrid extends StatelessWidget {
  const _SpiritualGrid({required this.actions});
  final HomeActions actions;

  @override
  Widget build(BuildContext context) {
    Widget cell(IconData i, String label, VoidCallback? tap) => InkWell(
          borderRadius: BorderRadius.circular(16),
          onTap: tap,
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 4),
            child: Column(mainAxisSize: MainAxisSize.min, children: [
              _IconTile(i, size: 46, iconSize: 23, radius: 16),
              const SizedBox(height: 8),
              Text(label, textAlign: TextAlign.center, style: const TextStyle(color: W.ink, fontSize: 15.5, fontWeight: FontWeight.w800)),
            ]),
          ),
        );
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 10),
      decoration: _whiteCard(22),
      child: Column(children: [
        Row(children: [
          Expanded(child: cell(Ic.bible, tr('Bible'), actions.onBible)),
          Expanded(child: cell(Ic.quiz, tr('Quiz Bible'), actions.onQuiz)),
        ]),
        const SizedBox(height: 18),
        Row(children: [
          Expanded(child: cell(Ic.audio, tr('Enseignements'), actions.onTeachings)),
          Expanded(child: cell(Ic.flame, tr('Prière'), actions.onPrayer)),
        ]),
      ]),
    );
  }
}
class _VerseCard extends StatelessWidget {
  const _VerseCard({required this.verse, required this.actions});
  final HomeVerse verse;
  final HomeActions actions;

  @override
  Widget build(BuildContext context) {
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
          padding: const EdgeInsets.all(20),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Icon(Ic.flame, color: W.gold, size: 20),
              SizedBox(width: 12),
              Text(isEn ? 'VERSE OF THE DAY' : 'VERSET DU JOUR', style: TextStyle(color: W.gold, fontSize: 12.5, fontWeight: FontWeight.w800, letterSpacing: 3.6)),
            ]),
            const SizedBox(height: 18),
            Text('« ${verse.text} »', style: const TextStyle(color: Colors.white, fontSize: 21, fontWeight: FontWeight.w600, height: 1.4)),
            const SizedBox(height: 14),
            Text.rich(TextSpan(children: [
              TextSpan(text: verse.ref, style: const TextStyle(color: W.gold, fontWeight: FontWeight.w800)),
              TextSpan(text: ' (${verse.version})', style: const TextStyle(color: W.onDarkMuted)),
            ]), style: const TextStyle(fontSize: 16.5)),
            const SizedBox(height: 16),
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
            const SizedBox(height: 16),
            Text(
              tr('Mode de lecture : voix de votre appareil (synthèse vocale), l’application choisit en priorité une voix d’homme dans la langue du texte, la plus naturelle disponible, avec des pauses entre les versets. Ce n’est pas un enregistrement studio et aucune voix n’est clonée. Si votre appareil n’a pas de voix d’homme dans cette langue, la meilleure voix disponible de l’appareil est utilisée.'),
              style: TextStyle(color: Color(0xFF8E98AB), fontSize: 13.5, height: 1.55),
            ),
          ]),
        ),
      ]),
    );
  }
}

// Carte anniversaire ou saisonnière, 29 oct. 2026 : même langage
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
            Text('« ${verse.text} »', style: const TextStyle(color: Colors.white, fontSize: 21, fontWeight: FontWeight.w600, height: 1.4)),
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

class _ExploreList extends StatelessWidget {
  const _ExploreList({required this.actions});
  final HomeActions actions;

  @override
  Widget build(BuildContext context) {
    final rows = <(IconData, String, String, VoidCallback?)>[
      (Ic.camp, tr('Camps & Retraites'), tr('S’inscrire'), actions.onCamps),
      (Ic.school, tr('Établissements'), tr('Activités par école'), actions.onEtabs),
      (Ic.news, tr('Actualités'), tr('Annonces de la communauté'), actions.onNews),
      (Ic.shop, tr('Librairie'), tr('Livres de prière & ouvrages'), actions.onShop),
      (Ic.flame, tr('Mon épanouissement'), tr('Plan de lecture : 21 jours'), actions.onGrowth),
      // Pas de ligne Plus ici : correctif 27 oct. 2026, le bouton Plus
      // est en bas, dans la barre à 5 entrées, pas dans l'Explorer.
      // Dons, Librairie, Mes achats et Espace structure restent
      // accessibles par cette barre, onglet Plus, page Plus.
    ];
    return Container(
      clipBehavior: Clip.antiAlias,
      decoration: _whiteCard(22),
      child: Column(children: [
        for (var i = 0; i < rows.length; i++) ...[
          if (i > 0) const Divider(height: 1, thickness: 1, color: W.line),
          InkWell(
            onTap: rows[i].$4,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
              child: Row(children: [
                _IconTile(rows[i].$1, size: 42, iconSize: 21, radius: 13),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text(rows[i].$2, style: const TextStyle(color: W.ink, fontSize: 16.5, fontWeight: FontWeight.w800)),
                    const SizedBox(height: 2),
                    Text(rows[i].$3, style: const TextStyle(color: W.muted, fontSize: 14.5, height: 1.3)),
                  ]),
                ),
                const Icon(Ic.chevron, color: W.muted, size: 26),
              ]),
            ),
          ),
        ],
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
            Text(quiz.question, style: const TextStyle(color: W.ink, fontSize: 18.5, fontWeight: FontWeight.w700, height: 1.3)),
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
  const _QuizDoneCard({required this.score, required this.total, this.onRestart, this.onFull});
  final int score, total;
  final VoidCallback? onRestart, onFull;
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
          AspectRatio(aspectRatio: 1.5, child: Image(image: event.image!, fit: BoxFit.cover, width: double.infinity)),
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

class _PrayerSection extends StatelessWidget {
  const _PrayerSection({required this.email, required this.onSend});
  final String email;
  final VoidCallback? onSend;

  @override
  Widget build(BuildContext context) {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Row(crossAxisAlignment: CrossAxisAlignment.center, children: [
        Container(width: 4, height: 50, decoration: BoxDecoration(color: W.gold, borderRadius: BorderRadius.circular(2))),
        const SizedBox(width: 10),
        Expanded(child: Text(tr('Sujets de prière privés'), style: TextStyle(color: W.ink, fontSize: 22, fontWeight: FontWeight.w800, height: 1.15))),
        const SizedBox(width: 10),
        Flexible(
          child: Material(
            color: W.goldFill,
            borderRadius: BorderRadius.circular(14),
            child: InkWell(
              borderRadius: BorderRadius.circular(14),
              onTap: onSend,
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                child: Row(mainAxisSize: MainAxisSize.min, children: [
                  Icon(Ic.mail, color: W.ink, size: 20),
                  SizedBox(width: 10),
                  Flexible(child: Text(tr('Envoyer un sujet de prière'), textAlign: TextAlign.center, style: TextStyle(color: W.ink, fontSize: 15.5, fontWeight: FontWeight.w700, height: 1.2))),
                ]),
              ),
            ),
          ),
        ),
      ]),
      const SizedBox(height: 12),
      Container(
        width: double.infinity,
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(22), border: Border.all(color: W.goldLine)),
        child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const Icon(Ic.shield, color: W.goldDeep, size: 30),
          const SizedBox(width: 14),
          Expanded(
            child: Text(
              tr('Votre sujet de prière reste privé : il ne sera pas publié sur un mur et ne sera pas enregistré dans l’application. Il sera transmis uniquement par e-mail à la structure, à l’adresse {email}, depuis votre propre messagerie.').replaceAll('{email}', email),
              style: const TextStyle(color: W.ink, fontSize: 16, height: 1.5),
            ),
          ),
        ]),
      ),
    ]);
  }
}

// ───────────────────────── Barre du bas ─────────────────────────
// Publique (anciennement _BottomNav) pour que l'AppShell puisse
// l'utiliser comme seule barre du bas, sans double barre.
class BottomNavWeb extends StatelessWidget {
  const BottomNavWeb({required this.index, required this.onTap, this.pendingPayments = 0});
  final int index;
  final ValueChanged<int>? onTap;
  final int pendingPayments;
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
    return Container(
      color: const Color(0xFF0F1D3A),
      padding: EdgeInsets.fromLTRB(8, 6, 8, MediaQuery.of(context).padding.bottom + 6),
      child: Row(children: [
        for (var i = 0; i < items.length; i++)
          Expanded(
            child: InkWell(
              onTap: () => onTap?.call(i),
              child: Column(mainAxisSize: MainAxisSize.min, children: [
                Stack(clipBehavior: Clip.none, children: [
                  Container(
                    width: 58,
                    height: 38,
                    decoration: BoxDecoration(color: i == index ? W.gold : Colors.transparent, borderRadius: BorderRadius.circular(19)),
                    child: Icon(items[i].$1, size: 24, color: i == index ? W.navy : W.navText),
                  ),
                  if (i == 5 && pendingPayments > 0)
                    Positioned(
                      right: 2,
                      top: -4,
                      child: Container(
                        constraints: const BoxConstraints(minWidth: 18, minHeight: 18),
                        padding: const EdgeInsets.symmetric(horizontal: 4),
                        decoration: BoxDecoration(color: W.gold, borderRadius: BorderRadius.circular(9)),
                        alignment: Alignment.center,
                        child: Text(pendingPayments > 99 ? '99+' : '$pendingPayments',
                            style: const TextStyle(color: W.navy, fontSize: 11, fontWeight: FontWeight.w800)),
                      ),
                    ),
                ]),
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
      ]),
    );
  }
}
