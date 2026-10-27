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
  static const plus = Icons.add_rounded;
  static const home = Icons.home_outlined;
  static const share = Icons.share_outlined;
}

// ───────────────────────── Données (fournies par l'application) ─────────────────────────
class HomeVerse {
  const HomeVerse({required this.text, required this.ref, required this.version});
  final String text, ref, version;
}

class HomeEvent {
  const HomeEvent({required this.title, this.date, this.place, this.image});
  final String title;
  final String? date, place; // null = « À confirmer »
  final ImageProvider? image;
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
    this.onShare,
    this.onCamps,
    this.onEtabs,
    this.onNews,
    this.onShop,
    this.onGrowth,
    this.onPlus,
    this.onAnswer,
    this.onNextQuiz,
    this.onQuizRestart,
    this.onQuizFull,
    this.onScope,
    this.onSeeAllEvents,
    this.onSendPrayer,
    this.onTab,
  });
  final VoidCallback? onSignup, onQuitVisitor, onLanguage, onCreateCard, onBible, onQuiz, onTeachings, onPrayer;
  final VoidCallback? onReadChapter, onListen, onShare, onCamps, onEtabs, onNews, onShop, onGrowth, onPlus;
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
    this.quizFinished = false,
    this.quizFinalScore = 0,
    this.quizFinalTotal = 0,
  });

  final HomeActions actions;
  final bool visitor;
  final String language;
  final Widget? logo;
  final HomeVerse? verse;
  final HomeQuiz? quiz;
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
      quizFinished: quizFinished,
      quizFinalScore: quizFinalScore,
      quizFinalTotal: quizFinalTotal,
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
    required this.quizFinished,
    required this.quizFinalScore,
    required this.quizFinalTotal,
  });
  final HomeActions actions;
  final bool visitor;
  final String language;
  final Widget? logo;
  final HomeVerse? verse;
  final HomeQuiz? quiz;
  final List<String> scopes;
  final int scopeIndex;
  final List<HomeEvent> events;
  final List<HomeNews> news;
  final String structureEmail;
  final bool offline;
  final VoidCallback? onRetry;
  final String memberName, memberMatricule;
  final bool quizFinished;
  final int quizFinalScore, quizFinalTotal;

  @override
  Widget build(BuildContext context) {
    return Column(children: [
        _Header(logo: logo, language: language, onLanguage: actions.onLanguage),
        if (visitor) _VisitorBanner(onSignup: actions.onSignup, onQuit: actions.onQuitVisitor),
        if (offline)
          Container(
            width: double.infinity,
            color: W.banner,
            padding: const EdgeInsets.fromLTRB(14, 10, 14, 10),
            child: Row(children: [
              const Icon(Icons.cloud_off_outlined, color: W.gold, size: 19),
              const SizedBox(width: 8),
              const Expanded(
                child: Text('Hors ligne : contenus locaux affichés. La synchronisation reprendra en ligne.',
                    style: TextStyle(color: Colors.white, fontSize: 13)),
              ),
              if (onRetry != null)
                InkWell(
                  onTap: onRetry,
                  child: const Padding(
                    padding: EdgeInsets.symmetric(vertical: 8, horizontal: 4),
                    child: Text('Réessayer', style: TextStyle(color: W.gold, fontSize: 13, fontWeight: FontWeight.w700)),
                  ),
                ),
            ]),
          ),
        Expanded(
          child: ListView(
            padding: const EdgeInsets.fromLTRB(14, 16, 14, 24),
            children: [
              _HeroCard(visitor: visitor, onTap: actions.onCreateCard, memberName: memberName, memberMatricule: memberMatricule),
              const SizedBox(height: 28),
              const _SectionLabel('Ma vie spirituelle'),
              _SpiritualGrid(actions: actions),
              if (verse != null) ...[const SizedBox(height: 22), _VerseCard(verse: verse!, actions: actions)],
              const SizedBox(height: 28),
              const _SectionLabel('Explorer'),
              _ExploreList(actions: actions),
              if (quizFinished) ...[
                const SizedBox(height: 28),
                const _SectionTitle('Quiz Bible'),
                const SizedBox(height: 12),
                _QuizDoneCard(score: quizFinalScore, total: quizFinalTotal, onRestart: actions.onQuizRestart, onFull: actions.onQuizFull),
              ] else if (quiz != null) ...[
                const SizedBox(height: 28),
                _SectionTitle('Quiz Bible', trailing: _Pill('Quiz ${quiz!.quizNumber} sur ${quiz!.quizTotal}')),
                const SizedBox(height: 12),
                _QuizCard(quiz: quiz!, onAnswer: actions.onAnswer, onNext: actions.onNextQuiz),
              ],
              if (scopes.isNotEmpty) ...[const SizedBox(height: 22), _ScopeChips(scopes: scopes, index: scopeIndex, onTap: actions.onScope)],
              const SizedBox(height: 26),
              _SectionTitle('Prochains rendez-vous', link: 'Tout voir', onLink: actions.onSeeAllEvents),
              const SizedBox(height: 12),
              for (final e in events) ...[_EventCard(event: e), const SizedBox(height: 12)],
              const SizedBox(height: 14),
              const _SectionTitle('Actualités de la communauté'),
              const SizedBox(height: 12),
              if (news.isEmpty)
                const _EmptyNews()
              else
                for (final n in news) ...[_NewsCard(item: n), const SizedBox(height: 12)],
              const SizedBox(height: 26),
              _PrayerSection(email: structureEmail, onSend: actions.onSendPrayer),
            ],
          ),
        ),
      ]);
  }
}

// ───────────────────────── En-tête et bandeau visiteur (fixes en haut) ─────────────────────────
class _Header extends StatelessWidget {
  const _Header({required this.logo, required this.language, required this.onLanguage});
  final Widget? logo;
  final String language;
  final VoidCallback? onLanguage;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.fromLTRB(14, MediaQuery.of(context).padding.top + 10, 14, 10),
      decoration: const BoxDecoration(
        color: W.header,
        border: Border(bottom: BorderSide(color: W.headerLine)),
      ),
      child: Row(children: [
        Container(
          width: 34,
          height: 34,
          clipBehavior: Clip.antiAlias,
          decoration: BoxDecoration(
            color: const Color(0xFF0B0B0B),
            borderRadius: BorderRadius.circular(9),
            border: Border.all(color: W.headerLine),
          ),
          child: logo ??
              const Center(
                child: Text('CP', style: TextStyle(color: W.gold, fontSize: 13, fontWeight: FontWeight.w700, fontStyle: FontStyle.italic, fontFamily: 'serif')),
              ),
        ),
        const SizedBox(width: 10),
        const Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
            Text('CONNEXION PROPHÉTIQUE', maxLines: 1, overflow: TextOverflow.ellipsis,
                style: TextStyle(color: W.gold, fontSize: 13, fontWeight: FontWeight.w700, letterSpacing: 2.0)),
            Text('Accueil', style: TextStyle(color: W.onDarkMuted, fontSize: 12.5)),
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
        const Row(children: [
          Icon(Ic.eye, color: W.gold, size: 19),
          SizedBox(width: 8),
          Expanded(
            child: Text('Mode visiteur, consultation sans inscription',
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
              child: const Padding(
                padding: EdgeInsets.symmetric(horizontal: 18, vertical: 12),
                child: Text('S’inscrire', style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w700)),
              ),
            ),
          ),
          InkWell(
            onTap: onQuit,
            child: const Padding(
              padding: EdgeInsets.symmetric(vertical: 12),
              child: Text('Quitter le mode visiteur',
                  style: TextStyle(color: Color(0xFFD9DDE7), fontSize: 13, fontWeight: FontWeight.w600, decoration: TextDecoration.underline, decorationColor: Color(0xFFD9DDE7))),
            ),
          ),
        ]),
      ]),
    );
  }
}

// ───────────────────────── Blocs ─────────────────────────
class _HeroCard extends StatelessWidget {
  const _HeroCard({required this.visitor, required this.onTap, this.memberName = '', this.memberMatricule = ''});
  final bool visitor;
  final VoidCallback? onTap;
  final String memberName, memberMatricule;

  @override
  Widget build(BuildContext context) {
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
                      (!visitor && memberName.isNotEmpty) ? memberName : 'Créez votre carte de membre',
                      style: const TextStyle(color: Colors.white, fontSize: 19, fontWeight: FontWeight.w800, height: 1.25)),
                  const SizedBox(height: 4),
                  Text(
                      (!visitor && memberMatricule.isNotEmpty)
                          ? 'Membre numéro $memberMatricule · Votre QR de présence, sur votre carte.'
                          : 'Votre matricule et votre QR de présence, sur votre carte.',
                      style: const TextStyle(color: Color(0xFFB8C0D0), fontSize: 14.5, height: 1.4)),
                  if (visitor) ...[
                    const SizedBox(height: 8),
                    const Text('Vous pouvez lire la Bible. Vous pouvez voir les camps, les annonces et les livres. Pour une carte de membre, inscrivez-vous.',
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
  const _SectionLabel(this.text);
  final String text;

  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.fromLTRB(4, 0, 0, 10),
        child: Text(text.toUpperCase(), style: const TextStyle(color: W.label, fontSize: 12.5, fontWeight: FontWeight.w800, letterSpacing: 2.2)),
      );
}

class _SectionTitle extends StatelessWidget {
  const _SectionTitle(this.text, {this.trailing, this.link, this.onLink});
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
  const _Pill(this.text);
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
          Expanded(child: cell(Ic.bible, 'Bible', actions.onBible)),
          Expanded(child: cell(Ic.quiz, 'Quiz Bible', actions.onQuiz)),
        ]),
        const SizedBox(height: 18),
        Row(children: [
          Expanded(child: cell(Ic.audio, 'Enseignements', actions.onTeachings)),
          Expanded(child: cell(Ic.flame, 'Prière', actions.onPrayer)),
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
            const Row(children: [
              Icon(Ic.flame, color: W.gold, size: 20),
              SizedBox(width: 12),
              Text('VERSET DU JOUR', style: TextStyle(color: W.gold, fontSize: 12.5, fontWeight: FontWeight.w800, letterSpacing: 3.6)),
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
                  child: const SizedBox(
                    height: 46,
                    child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: 18),
                      child: Center(child: Text('Lire le chapitre', style: TextStyle(color: W.ink, fontSize: 15.5, fontWeight: FontWeight.w700))),
                    ),
                  ),
                ),
              ),
              ghost(Ic.audio, 'Écouter', actions.onListen),
              ghost(Ic.share, 'Partager', actions.onShare),
            ]),
            const SizedBox(height: 16),
            const Text(
              'Mode de lecture : voix de votre appareil (synthèse vocale), l’application choisit en priorité une voix d’homme dans la langue du texte, la plus naturelle disponible, avec des pauses entre les versets. Ce n’est pas un enregistrement studio et aucune voix n’est clonée. Si votre appareil n’a pas de voix d’homme dans cette langue, la meilleure voix disponible de l’appareil est utilisée.',
              style: TextStyle(color: Color(0xFF8E98AB), fontSize: 13.5, height: 1.55),
            ),
          ]),
        ),
      ]),
    );
  }
}

class _ExploreList extends StatelessWidget {
  const _ExploreList({required this.actions});
  final HomeActions actions;

  @override
  Widget build(BuildContext context) {
    final rows = <(IconData, String, String, VoidCallback?)>[
      (Ic.camp, 'Camps & Retraites', 'S’inscrire', actions.onCamps),
      (Ic.school, 'Établissements', 'Activités par école', actions.onEtabs),
      (Ic.news, 'Actualités', 'Annonces de la communauté', actions.onNews),
      (Ic.shop, 'Librairie', 'Livres de prière & ouvrages', actions.onShop),
      (Ic.flame, 'Mon épanouissement', 'Plan de lecture de 21 jours, journal privé et minuteur de prière.', actions.onGrowth),
      (Ic.plus, 'Plus', 'Dons, Librairie, Mes achats, Mon épanouissement, Espace structure.', actions.onPlus),
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
            const Text('QUIZ DU MOMENT', style: TextStyle(color: W.gold, fontSize: 12.5, fontWeight: FontWeight.w800, letterSpacing: 3.6)),
            const SizedBox(height: 8),
            Text('Personnage : ${quiz.character}', style: const TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w800)),
            const SizedBox(height: 6),
            Text('Question ${quiz.questionIndex} sur ${quiz.questionCount} · Score en cours : ${quiz.score}',
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
                  child: Text(quiz.isLast ? 'Voir mon score' : 'Question suivante'),
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
            const Text('QUIZ TERMINÉ', style: TextStyle(color: W.gold, fontSize: 12.5, fontWeight: FontWeight.w800, letterSpacing: 3.6)),
            const SizedBox(height: 8),
            Text('Score : $score sur $total', style: const TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w800)),
          ]),
        ),
        Padding(
          padding: const EdgeInsets.all(18),
          child: Column(children: [
            SizedBox(
              width: double.infinity,
              height: 52,
              child: FilledButton(onPressed: onFull, child: const Text('Jouer au Quiz Bible complet')),
            ),
            const SizedBox(height: 10),
            SizedBox(
              width: double.infinity,
              height: 52,
              child: OutlinedButton(onPressed: onRestart, child: const Text('Rejouer l’aperçu')),
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
    return Container(
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
              Text(event.date ?? 'À confirmer', style: const TextStyle(color: W.goldDeep, fontSize: 17, fontWeight: FontWeight.w700)),
            ]),
            const SizedBox(height: 6),
            Text(event.title, style: const TextStyle(color: W.ink, fontSize: 22, fontWeight: FontWeight.w800, height: 1.2)),
            const SizedBox(height: 8),
            Row(children: [
              const Icon(Ic.pin, color: W.muted, size: 20),
              const SizedBox(width: 10),
              Text(event.place ?? 'À confirmer', style: const TextStyle(color: W.muted, fontSize: 17)),
            ]),
          ]),
        ),
      ]),
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
        child: const Column(children: [
          Icon(Ic.news, color: W.goldDeep, size: 38),
          SizedBox(height: 14),
          Text('Aucune actualité pour le moment', textAlign: TextAlign.center, style: TextStyle(color: W.ink, fontSize: 21, fontWeight: FontWeight.w800)),
          SizedBox(height: 8),
          Text(
            'Aucune annonce publiée pour ce périmètre. Ce n’est pas une erreur. Les annonces de la communauté apparaîtront ici dès leur publication. Changez de périmètre ci-dessus pour voir les autres.',
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
        const Expanded(child: Text('Sujets de prière privés', style: TextStyle(color: W.ink, fontSize: 22, fontWeight: FontWeight.w800, height: 1.15))),
        const SizedBox(width: 10),
        Flexible(
          child: Material(
            color: W.goldFill,
            borderRadius: BorderRadius.circular(14),
            child: InkWell(
              borderRadius: BorderRadius.circular(14),
              onTap: onSend,
              child: const Padding(
                padding: EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                child: Row(mainAxisSize: MainAxisSize.min, children: [
                  Icon(Ic.mail, color: W.ink, size: 20),
                  SizedBox(width: 10),
                  Flexible(child: Text('Envoyer un sujet de prière', textAlign: TextAlign.center, style: TextStyle(color: W.ink, fontSize: 15.5, fontWeight: FontWeight.w700, height: 1.2))),
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
              'Votre sujet de prière reste privé : il ne sera pas publié sur un mur et ne sera pas enregistré dans l’application. Il sera transmis uniquement par e-mail à la structure, à l’adresse $email, depuis votre propre messagerie.',
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
  const BottomNavWeb({required this.index, required this.onTap, this.connected = false});
  final int index;
  final ValueChanged<int>? onTap;
  // Mode connecté : les 8 entrées de la barre web en mode connecté,
  // relevées sur les captures du 27 octobre 2026. Mode visiteur :
  // les 5 onglets historiques sont gardés, car Communauté et Plus
  // regroupent alors les entrées qui ne sont pas des onglets directs.
  // Aucune entrée n'est grisée ni masquée en mode connecté : chaque
  // entrée est branchée sur sa page existante par l'AppShell.
  final bool connected;

  @override
  Widget build(BuildContext context) {
    if (!connected) {
      const items = [(Ic.home, 'Accueil'), (Ic.bible, 'Bible'), (Ic.card, 'Carte'), (Ic.users, 'Communauté'), (Ic.plus, 'Plus')];
      return Container(
        color: const Color(0xFF0F1D3A),
        padding: EdgeInsets.fromLTRB(8, 6, 8, MediaQuery.of(context).padding.bottom + 6),
        child: Row(children: [
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
                  Text(items[i].$2,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(color: i == index ? W.gold : W.navText, fontSize: 12.5, fontWeight: i == index ? FontWeight.w800 : FontWeight.w500)),
                ]),
              ),
            ),
        ]),
      );
    }
    // Barre connectée, comme sur le web : fond clair, libellés lisibles,
    // défilement horizontal pour que 8 entrées tiennent sur téléphone
    // sans texte tronqué ni icône écrasée. Correctif du 27 oct. 2026 :
    // chaque entrée prend la largeur de son libellé (minimum 64 px),
    // sans largeur fixe de 78 px et sans points de suspension, donc
    // « Établissements » reste complet sur petit écran. L'entrée
    // sélectionnée garde une pastille or, comme sur le web.
    const items = [
      (Ic.home, 'Accueil'),
      (Ic.bible, 'Bible'),
      (Ic.camp, 'Camps'),
      (Ic.shop, 'Librairie'),
      (Icons.favorite_border, 'Donner'),
      (Ic.school, 'Établissements'),
      (Ic.users, 'Bureau'),
      (Ic.card, 'Ma carte'),
    ];
    return Container(
      color: Colors.white,
      decoration: const BoxDecoration(border: Border(top: BorderSide(color: W.line))),
      padding: EdgeInsets.fromLTRB(4, 6, 4, MediaQuery.of(context).padding.bottom + 6),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(children: [
          for (var i = 0; i < items.length; i++)
            ConstrainedBox(
              constraints: const BoxConstraints(minWidth: 64),
              child: InkWell(
                onTap: () => onTap?.call(i),
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 10),
                  child: Column(mainAxisSize: MainAxisSize.min, children: [
                    Container(
                      width: 52,
                      height: 36,
                      decoration: BoxDecoration(
                          color: i == index ? const Color(0xFFFBEFD0) : Colors.transparent, borderRadius: BorderRadius.circular(18)),
                      child: Icon(items[i].$1, size: 24, color: i == index ? W.goldDeep : W.muted),
                    ),
                    const SizedBox(height: 3),
                    Text(items[i].$2,
                        maxLines: 1,
                        softWrap: false,
                        textAlign: TextAlign.center,
                        style: TextStyle(color: i == index ? W.goldDeep : W.muted, fontSize: 11, fontWeight: i == index ? FontWeight.w800 : FontWeight.w500)),
                  ]),
                ),
              ),
            ),
        ]),
      ),
    );
  }
}
