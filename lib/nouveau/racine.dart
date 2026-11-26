// Racine de la nouvelle application, tranche T11, 26 nov. 2026.
// Remplace l'AppShell : la nouvelle coquille avec toutes les
// pages branchées sur les vrais services. Le membre vient de
// l'état de l'application (main.dart) ; les services se
// chargent seuls, chacun sur ses routes. Les activités de
// l'accueil passent par CacheContenus, lecture locale d'abord,
// puis réseau, jamais de chargeur de camps séparé.
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:share_plus/share_plus.dart';

import '../api.dart';
import '../app_models.dart';
import '../audio.dart';
import '../bible.dart';
import '../models.dart';
import '../services.dart';
import 'activites_venir.dart';
import 'cache_contenus.dart';
import 'carte_quiz.dart';
import 'coquille.dart';
import 'destinations.dart';
import 'lecture_livre.dart';
import 'modeles_connexion.dart';
import 'modeles_messagerie.dart';
import 'page_abonnement.dart';
import 'page_accueil.dart';
import 'page_assistant.dart';
import 'page_bible.dart';
import 'page_carte.dart';
import 'page_chaine_priere.dart';
import 'page_connexion.dart';
import 'page_cotisations.dart';
import 'page_croissance.dart';
import 'page_documents.dart';
import 'page_fonctions.dart';
import 'page_galerie.dart';
import 'page_librairie.dart';
import 'page_messagerie.dart';
import 'page_opportunite.dart';
import 'page_parole.dart';
import 'page_profil.dart';
import 'page_structure.dart';
import 'page_suivi.dart';
import 'paiement_carte.dart';
import 'recherche_globale.dart';
import 'service_assistant.dart';
import 'service_bible.dart';
import 'service_connexion.dart';
import 'service_librairie.dart';
import 'service_messagerie.dart';
import 'service_parole.dart';
import 'service_profil.dart';
import 'service_t14.dart';
import 'service_t9.dart';
import 'veille_reseau.dart';

class RacineNouvelle extends StatefulWidget {
  const RacineNouvelle({
    super.key,
    required this.membre,
    this.nonLus,
    this.onDeconnexion,
    this.onSupprimerCompte,
  });
  final Member? membre;
  final ValueListenable<int>? nonLus;
  final VoidCallback? onDeconnexion;
  final VoidCallback? onSupprimerCompte;

  @override
  State<RacineNouvelle> createState() => _RacineNouvelleState();
}

class _RacineNouvelleState extends State<RacineNouvelle> {
  final _cleCoquille = GlobalKey<NouvelleCoquilleState>();
  late final ServiceConnexion _serviceConnexion;
  late final ServiceMessagerie _serviceMessagerie;
  late final ServiceLibrairie _serviceLibrairie;
  late final ServiceProfil _serviceProfil;
  late final ServiceBible _serviceBible;
  late final ServiceT9 _serviceT9;
  late final ServiceAssistant _serviceAssistant;
  late final ServiceParoleVivante _serviceParole;
  late final ServiceT14 _serviceT14;
  late final CacheContenus _cache;

  var _activites = <ActiviteAVenir>[];
  VersetPriere? _versetPriere;
  var _enEcoute = false;
  int? _bibleLivre;
  int? _bibleChapitre;
  var _filtreConnexion = FiltreConnexion.tous;
  var _cleConnexion = 0;

  Quiz? _quizCourant;
  var _indexQuestion = 0;
  var _score = 0;
  int? _reponseChoisie;
  var _termine = false;

  @override
  void initState() {
    super.initState();
    _serviceConnexion = ServiceConnexionApi(api);
    _serviceMessagerie = ServiceMessagerieApi(api);
    _serviceLibrairie = ServiceLibrairieReel();
    _serviceProfil = ServiceProfilReel();
    _serviceBible = ServiceBibleReel();
    _serviceT9 = ServiceT9Reel();
    _serviceAssistant = ServiceAssistantApi(api);
    _serviceParole = ServiceParoleVivanteReel();
    _serviceT14 = ServiceT14Reel();
    _cache = CacheContenus(api);
    _quizCourant = QuizService.quizOfTheDay(
      QuizService.seedQuizzesFr,
      DateTime.now(),
    );
    _chargerVersetPriere();
    _chargerActivites();
    _chargerEtatCarte();
    VeilleReseau.partage.ajouterReprise(_chargerActivites);
  }

  @override
  void dispose() {
    VeilleReseau.partage.retirerReprise(_chargerActivites);
    super.dispose();
  }

  /// État de la carte, T15 : chargé au démarrage pour la
  /// carte du tiroir, qui n'attend pas l'ouverture de la page
  /// Ma carte. Lectures seulement, jamais d'écriture.
  Future<void> _chargerEtatCarte() async {
    await _serviceProfil.charger();
    if (mounted) setState(() {});
  }

  /// Verset fixe de la Prière du jour, Philippiens 4, 6, lu dans
  /// les données Bible locales, jamais recopié en dur.
  Future<void> _chargerVersetPriere() async {
    await BibleService.instance.load();
    final texte = BibleService.instance.verseText('fr', 49, 4, 6);
    if (texte == null || texte.isEmpty || !mounted) return;
    setState(() => _versetPriere = VersetPriere(
          texte: texte,
          reference: 'Philippiens 4, 6',
        ));
  }

  /// Activités de l'accueil, T10 : lecture locale d'abord, puis
  /// réseau, rechargées au retour du réseau, sans jamais vider
  /// ce qui est déjà affiché en cas d'échec.
  Future<void> _chargerActivites() async {
    final locales = await _cache.lireEvenementsEnCache();
    if (locales.isNotEmpty && mounted) {
      setState(() => _activites = activitesDepuisEvenements(locales));
    }
    final lignes = await _cache.chargerEvenements();
    if (!mounted) return;
    setState(() => _activites = activitesDepuisEvenements(lignes));
  }

  void _allerAccueil() => _cleCoquille.currentState?.allerAccueil();

  void _allerOnglet(int index) =>
      _cleCoquille.currentState?.allerOnglet(index);

  void _ouvrirDestination(DestinationNouvelle d) =>
      _cleCoquille.currentState?.ouvrirDestination(d);

  /// Écouter la Prière du jour, synthèse vocale de l'appareil,
  /// même voix que la Bible. Arrêter coupe la lecture.
  Future<void> _ecouterPriere() async {
    final verset = _versetPriere;
    if (verset == null) return;
    if (_enEcoute) {
      await verseTts.stop();
      if (mounted) setState(() => _enEcoute = false);
      return;
    }
    final ok = await verseTts.speak(verset.texte, 'fr');
    if (!mounted) return;
    setState(() => _enEcoute = ok && verseTts.speaking);
    if (!ok) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(audioFailureMessage())),
      );
    }
  }

  Future<void> _partagerPriere() async {
    final verset = _versetPriere;
    if (verset == null) return;
    await SharePlus.instance.share(
      ShareParams(text: '${verset.texte}\n${verset.reference}'),
    );
  }

  /// Quiz de l'accueil : quiz du jour, une question après
  /// l'autre, puis le score, puis le quiz suivant.
  QuizAccueil get _quizAccueil {
    final quiz = _quizCourant;
    if (quiz == null) {
      return const QuizAccueil(
        personnage: '',
        indexQuestion: 1,
        nombreQuestions: 1,
        score: 0,
        question: '',
        choix: [],
        numeroQuiz: 1,
        totalQuiz: 1,
      );
    }
    final question = quiz.questions[_indexQuestion];
    final numero = QuizService.seedQuizzesFr
            .indexWhere((q) => q.id == quiz.id) +
        1;
    return QuizAccueil(
      personnage: quiz.character,
      indexQuestion: _indexQuestion + 1,
      nombreQuestions: quiz.questions.length,
      score: _score,
      question: question.question,
      choix: question.choices,
      numeroQuiz: numero < 1 ? 1 : numero,
      totalQuiz: QuizService.seedQuizzesFr.length,
      reponseChoisie: _reponseChoisie,
      bonneReponse:
          _reponseChoisie == null ? null : question.correctIndex,
      estDerniere: _indexQuestion + 1 >= quiz.questions.length,
      termine: _termine,
      scoreFinal: _score,
      totalFinal: quiz.questions.length,
    );
  }

  void _repondreQuiz(int index) {
    final quiz = _quizCourant;
    if (_reponseChoisie != null || quiz == null) return;
    final question = quiz.questions[_indexQuestion];
    setState(() {
      _reponseChoisie = index;
      if (index == question.correctIndex) _score++;
    });
  }

  void _questionSuivanteQuiz() {
    final quiz = _quizCourant;
    if (quiz == null) return;
    if (_indexQuestion + 1 < quiz.questions.length) {
      setState(() {
        _indexQuestion++;
        _reponseChoisie = null;
      });
    } else {
      setState(() => _termine = true);
    }
  }

  void _recommencerQuiz() {
    final quiz = _quizCourant;
    if (quiz == null) return;
    setState(() {
      _quizCourant = QuizService.nextQuiz(QuizService.seedQuizzesFr, quiz);
      _indexQuestion = 0;
      _score = 0;
      _reponseChoisie = null;
      _termine = false;
    });
  }

  void _ouvrirRecherche() {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => PageRechercheGlobale(
          serviceConnexion: _serviceConnexion,
          onOuvrirLivre: (_) => _allerOnglet(3),
          onOuvrirVerset: (livre, chapitre) {
            setState(() {
              _bibleLivre = livre;
              _bibleChapitre = chapitre;
            });
            _allerOnglet(1);
          },
          onOuvrirActualite: () => _allerOnglet(2),
        ),
      ),
    );
  }

  void _ouvrirTemoignages() {
    setState(() {
      _filtreConnexion = FiltreConnexion.temoignages;
      _cleConnexion++;
    });
    _allerOnglet(2);
  }

  void _ouvrirAssistant() {
    final prenom = (widget.membre?.name ?? '').split(' ').firstOrNull ?? '';
    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(16))),
      builder: (_) => FeuilleAssistant(
        service: _serviceAssistant,
        prenomMembre: prenom.isEmpty ? null : prenom,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return NouvelleCoquille(
      key: _cleCoquille,
      membre: widget.membre,
      nonLus: widget.nonLus,
      onDeconnexion: widget.onDeconnexion,
      onSupprimerCompte: widget.onSupprimerCompte,
      boutonFlottant:
          BoutonFlottantAssistant(onPressed: _ouvrirAssistant),
      etatCarte: _serviceProfil.etatCarte,
      accueil: PageAccueil(
        onSearch: _ouvrirRecherche,
        versetPriere: _versetPriere,
        enEcoute: _enEcoute,
        onEcouter: _ecouterPriere,
        onPartager: _partagerPriere,
        onOuvrirBible: () {
          setState(() {
            _bibleLivre = 49;
            _bibleChapitre = 4;
          });
          _allerOnglet(1);
        },
        quiz: _quizAccueil,
        onRepondre: _repondreQuiz,
        onQuestionSuivante: _questionSuivanteQuiz,
        onRecommencerQuiz: _recommencerQuiz,
        onStructure: () => _ouvrirDestination(DestinationNouvelle.structure),
        onTemoignages: _ouvrirTemoignages,
        onCotisations: () =>
            _ouvrirDestination(DestinationNouvelle.cotisations),
        onParoleVivante: () =>
            _ouvrirDestination(DestinationNouvelle.paroleVivante),
        onLibrairie: () => _allerOnglet(3),
        activites: _activites,
      ),
      connexion: KeyedSubtree(
        key: ValueKey('connexion$_cleConnexion'),
        child: PageConnexion(
          service: _serviceConnexion,
          onRetour: _allerAccueil,
          filtreInitial: _filtreConnexion,
        ),
      ),
      messagerie: PageMessagerie(
        service: _serviceMessagerie,
        onRetour: _allerAccueil,
      ),
      bible: PageBibleNouvelle(
        service: _serviceBible,
        livreInitial: _bibleLivre,
        chapitreInitial: _bibleChapitre,
      ),
      librairie: PageLibrairieNouvelle(
        service: _serviceLibrairie,
        onLireLivre: (livre) => ouvrirLivreAchete(
          context,
          livre,
          estAchete: _serviceLibrairie.estAchete(livre),
        ),
      ),
      profil: PageMonProfilNouvelle(
        service: _serviceProfil,
        onVoirCarte: () => _ouvrirDestination(DestinationNouvelle.carte),
      ),
      carte: PageCarteNouvelle(
        service: _serviceProfil,
        onCreerCarte: () =>
            payerCarte(context, nomMembre: widget.membre?.name ?? ''),
        onVoirPaiements: () =>
            _ouvrirDestination(DestinationNouvelle.cotisations),
      ),
      chainePriere: PageChainePriere(service: _serviceT9),
      suivi: PageSuivi(service: _serviceT9),
      opportunite: PageOpportunite(service: _serviceT9),
      documents: PageDocuments(
        service: _serviceT9,
        onVoirCarte: () => _ouvrirDestination(DestinationNouvelle.carte),
      ),
      croissance: PageCroissance(service: _serviceT9),
      fonctions: PageFonctions(service: _serviceT9),
      abonnement: PageAbonnement(service: _serviceT9),
      galerie: PageGalerie(service: _serviceT9),
      espaceStructure: PageEspaceStructure(
          service: _serviceT9, serviceT14: _serviceT14),
      structure: PageStructure(service: _serviceT9),
      cotisations: PageCotisations(service: _serviceT14),
      paroleVivante: PageParoleVivante(
        service: _serviceParole,
        onRetour: _allerAccueil,
      ),
    );
  }
}
