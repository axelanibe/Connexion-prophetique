// Racine de la nouvelle application, tranche T11, 26 nov. 2026.
// Remplace l'AppShell : la nouvelle coquille avec toutes les
// pages branchées sur les vrais services. Le membre vient de
// l'état de l'application (main.dart) ; les services se
// chargent seuls, chacun sur ses routes. Les activités de
// l'accueil passent par CacheContenus, lecture locale d'abord,
// puis réseau, jamais de chargeur de camps séparé.
import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import '../api.dart';
import '../appel_en_cours.dart';
import '../app_models.dart';
import '../audio.dart';
import '../bible.dart';
import '../models.dart';
import '../push_notifications.dart';
import '../services.dart';
import 'activites_venir.dart';
import 'cache_contenus.dart';
import 'carte_quiz.dart';
import 'coquille.dart';
import 'destinations.dart';
import 'lecture_livre.dart';
import 'modeles_connexion.dart';
import 'modeles_messagerie.dart';
import 'page_a_propos.dart';
import 'page_abonnement.dart';
import 'page_accueil.dart';
import 'page_aide_contact.dart';
import 'page_assistant.dart';
import 'page_bible.dart';
import 'page_camps.dart';
import 'page_carte.dart';
import 'page_chaine_priere.dart';
import 'page_connexion.dart';
import 'page_detail_connexion.dart';
import 'page_notifications_connexion.dart';
import 'page_profil_connexion.dart';
import 'page_cotisations.dart';
import 'page_croissance.dart';
import 'page_documents.dart';
import 'page_fonctions.dart';
import 'page_galerie.dart';
import 'page_journal.dart';
import 'page_librairie.dart';
import 'page_meditation.dart';
import 'palette.dart';
import 'page_messagerie.dart';
import 'page_opportunite.dart';
import 'page_parole.dart';
import 'page_profil.dart';
import 'page_election_membre.dart';
import 'page_etablissements.dart';
import 'page_structure.dart';
import 'page_suivi.dart';
import 'paiement_carte.dart';
import 'partage_verset.dart';
import 'quiz_admin.dart';
import 'quiz_ajoutes.dart';
import 'recherche_globale.dart';
import 'relais_appels.dart';
import 'service_assistant.dart';
import 'service_bible.dart';
import 'service_connexion.dart';
import 'service_librairie.dart';
import 'service_messagerie.dart';
import 'service_parole.dart';
import 'service_profil.dart';
import 'service_t14.dart';
import 'service_t18.dart';
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

class _RacineNouvelleState extends State<RacineNouvelle>
    with WidgetsBindingObserver {
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
  late final ServiceT18 _serviceT18;
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

  /// Camp ouvert depuis une carte d'Activités à venir, T20.
  String? _campOuvertId;

  /// Questions de quiz ajoutées par la structure, T20, qui
  /// entrent dans la rotation après la banque de départ.
  var _questionsAjoutees = <QuestionQuizAjoutee>[];

  /// Paiements chargés, pour l'état de la cotisation du mois.
  var _paiementsCharges = false;

  /// Appels entrants, T21 : abonnement au flux FCM et sondage
  /// global, miroir de l'ancien AppShell. La racine vit toute
  /// la session, l'abonné manquant du nouveau code.
  StreamSubscription<Map<String, String>>? _abonnementAppelEntrant;
  Timer? _minuteurAppelsEntrants;
  final _pauseSondage = PauseSondage();
  final _gardeAppelEntrant = GardeAppelEntrant();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _serviceConnexion = ServiceConnexionApi(api);
    _serviceMessagerie = ServiceMessagerieApi(api);
    _serviceLibrairie = ServiceLibrairieReel();
    _serviceProfil = ServiceProfilReel();
    _serviceBible = ServiceBibleReel();
    _serviceT9 = ServiceT9Reel();
    _serviceAssistant = ServiceAssistantApi(api);
    _serviceParole = ServiceParoleVivanteReel();
    _serviceT14 = ServiceT14Reel();
    _serviceT18 = ServiceT18Reel();
    _cache = CacheContenus(api);
    _quizCourant = QuizService.quizOfTheDay(
      QuizService.seedQuizzesFr,
      DateTime.now(),
    );
    _chargerVersetPriere();
    _chargerActivites();
    _chargerEtatCarte();
    _chargerQuizAjoutes();
    _chargerPaiements();
    VeilleReseau.partage.ajouterReprise(_chargerActivites);
    // Appel entrant en avant-plan, T21 : la notification ouvre
    // l'écran d'appel entrant, sans attendre le toucher. Le
    // sondage global couvre l'application ouverte en repli.
    _abonnementAppelEntrant = PushNotifications.instance.onAppelEntrant.listen(
      (data) => _ouvrirAppelEntrant(data),
    );
    _demarrerSondageAppels();
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    _abonnementAppelEntrant?.cancel();
    _minuteurAppelsEntrants?.cancel();
    VeilleReseau.partage.retirerReprise(_chargerActivites);
    super.dispose();
  }

  /// Sondage global des appels entrants, T21, miroir de
  /// l'ancien AppShell : 10 secondes quand l'onglet est
  /// visible, 30 secondes quand il est masqué.
  void _demarrerSondageAppels({int secondes = 10}) {
    _minuteurAppelsEntrants?.cancel();
    _minuteurAppelsEntrants = Timer.periodic(
      Duration(seconds: secondes),
      (_) => _verifierAppelsEntrants(),
    );
  }

  /// Onglet masqué ou retour, T21 : sur le web, quand l'onglet
  /// est masqué, le sondage passe à 30 secondes, sans jamais
  /// s'arrêter, le web n'a ni FCM ni CallKit, le sondage est
  /// la seule voie d'appel entrant. Au retour, 10 secondes.
  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (!mounted) return;
    if (state == AppLifecycleState.hidden && kIsWeb) {
      _demarrerSondageAppels(secondes: 30);
    } else if (state == AppLifecycleState.resumed) {
      _demarrerSondageAppels();
    }
  }

  /// Un tour de sondage : un appel en sonnerie ouvre l'écran
  /// d'appel entrant. Silencieux : le prochain tour réessaiera.
  Future<void> _verifierAppelsEntrants() async {
    if (!mounted || api.membreId == null) return;
    // WebSocket déjà connectée : les signaux d'appel arrivent
    // par la socket, le tour HTTP est sauté.
    if (etatAppelGlobal.signalisation?.connecte == true) return;
    // Recul sur 429 : pendant la pause, on saute les tours
    // sans appeler le serveur, puis on reprend à 10 s.
    if (_pauseSondage.enPause) return;
    try {
      final entrants = await api.fetchAppelsEntrants();
      if (!mounted || entrants.isEmpty) return;
      _ouvrirAppelEntrant(donneesAppelEntrantDepuisLigne(entrants.first));
    } on ApiException catch (e) {
      // 429 : pause de la durée Retry-After, plafonnée à 65 s.
      if (e.status == 429) {
        _pauseSondage.mettreEnPause(
          delaiReessai429(e.message, retryAfter: e.delaiReessai),
        );
      }
    } catch (_) {}
  }

  /// Écran d'appel entrant, depuis une notification touchée ou
  /// reçue en avant-plan, ou depuis le sondage. Garde anti
  /// double ouverture : le même appel ne s'ouvre pas deux fois
  /// dans la minute. Sans identifiant d'appel, on ouvre la
  /// messagerie, qui vérifiera l'appel actif dans la conversation.
  void _ouvrirAppelEntrant(Map<String, String> data) {
    if (!mounted) return;
    final appelId = data['appel_id'] ?? data['lien_id'] ?? '';
    if (appelId.isEmpty) {
      _cleCoquille.currentState
          ?.ouvrirDestination(DestinationNouvelle.messagerie);
      return;
    }
    if (!_gardeAppelEntrant.accepter(appelId)) return;
    unawaited(ouvrirAppelEntrant(
      context,
      donnees: data,
      monMembreId: api.membreId,
    ));
  }

  /// État de la carte, T15 : chargé au démarrage pour la
  /// carte du tiroir, qui n'attend pas l'ouverture de la page
  /// Ma carte. Lectures seulement, jamais d'écriture.
  Future<void> _chargerEtatCarte() async {
    await _serviceProfil.charger();
    if (mounted) setState(() {});
  }

  /// Questions ajoutées par la structure, T20 : lecture
  /// locale, jamais d'écriture en base.
  Future<void> _chargerQuizAjoutes() async {
    final ajoutees = await QuestionsQuizAjoutees.charger();
    if (mounted) setState(() => _questionsAjoutees = ajoutees);
  }

  /// Paiements, T20, pour l'état de la cotisation du mois sur
  /// l'accueil : lecture seulement, jamais d'écriture.
  Future<void> _chargerPaiements() async {
    await _serviceT14.chargerPaiements();
    if (mounted) setState(() => _paiementsCharges = true);
  }

  /// Rotation du quiz : la banque de départ, puis les
  /// questions ajoutées par la structure, dans l'ordre.
  List<Quiz> get _quizsRotation => [
        ...QuizService.seedQuizzesFr,
        ..._questionsAjoutees.map((q) => q.versQuiz()),
      ];

  /// État de la cotisation du mois en cours, T20 : payée si
  /// une cotisation confirmée vise le mois, en attente si
  /// une cotisation est en attente, sinon à régler.
  ({bool chargee, bool payee, bool enAttente}) get _etatCotisation {
    final maintenant = DateTime.now();
    var payee = false;
    var enAttente = false;
    for (final p in _serviceT14.paiements) {
      if (p.type != 'cotisation') continue;
      // moisCible est une chaîne, « 2026-11 » ou le premier
      // jour du mois ; sinon la date de création.
      final cible = DateTime.tryParse(p.moisCible) ?? p.creeLe;
      if (cible == null ||
          cible.year != maintenant.year ||
          cible.month != maintenant.month) {
        continue;
      }
      if (p.statut == 'confirme') payee = true;
      if (p.statut == 'en_attente') enAttente = true;
    }
    return (
      chargee: _paiementsCharges,
      payee: payee,
      enAttente: enAttente,
    );
  }

  /// Paiement de la cotisation du mois, T20 : après le
  /// paiement, les paiements sont relus pour l'état.
  Future<void> _payerCotisation() async {
    final reference = await payerCotisation(
      context,
      nomMembre: widget.membre?.name ?? '',
    );
    if (reference == null) return;
    await _chargerPaiements();
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

  /// Profil ouvert depuis les notifications de la cloche.
  void _ouvrirProfilDepuisNotifications(
    BuildContext context,
    String membreId,
  ) {
    if (membreId.isEmpty) return;
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => PageProfilConnexion(
          service: _serviceConnexion,
          membreId: membreId,
          onOuvrirDetail: (publication) => Navigator.of(context).push(
            MaterialPageRoute<void>(
              builder: (_) => PageDetailConnexion(
                service: _serviceConnexion,
                publication: publication,
                onOuvrirProfil: (id) =>
                    _ouvrirProfilDepuisNotifications(context, id),
              ),
            ),
          ),
        ),
      ),
    );
  }

  void _allerOnglet(int index) => _cleCoquille.currentState?.allerOnglet(index);

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
    await partagerVerset(context, verset);
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
    final rotation = _quizsRotation;
    final numero = rotation.indexWhere((q) => q.id == quiz.id) + 1;
    return QuizAccueil(
      personnage: quiz.character,
      indexQuestion: _indexQuestion + 1,
      nombreQuestions: quiz.questions.length,
      score: _score,
      question: question.question,
      choix: question.choices,
      numeroQuiz: numero < 1 ? 1 : numero,
      totalQuiz: rotation.length,
      reponseChoisie: _reponseChoisie,
      bonneReponse: _reponseChoisie == null ? null : question.correctIndex,
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
      _quizCourant = QuizService.nextQuiz(_quizsRotation, quiz);
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
      boutonFlottant: BoutonFlottantAssistant(onPressed: _ouvrirAssistant),
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
        quizEstAdmin: api.role == 'admin_general',
        onAjouterQuestionQuiz: () =>
            ajouterQuestionQuiz(context, onChange: _chargerQuizAjoutes),
        onGererQuestionsQuiz: () =>
            gererQuestionsQuiz(context, onChange: _chargerQuizAjoutes),
        onStructure: () => _ouvrirDestination(DestinationNouvelle.structure),
        onTemoignages: _ouvrirTemoignages,
        onCotisations: () =>
            _ouvrirDestination(DestinationNouvelle.cotisations),
        onParoleVivante: () =>
            _ouvrirDestination(DestinationNouvelle.paroleVivante),
        cotisationChargee: _etatCotisation.chargee,
        cotisationPayee: _etatCotisation.payee,
        cotisationEnAttente: _etatCotisation.enAttente,
        onPayerCotisation: _payerCotisation,
        onVoirCamps: () => _ouvrirDestination(DestinationNouvelle.camps),
        activites: [
          for (final a in _activites)
            a.avecTap(() {
              setState(() => _campOuvertId = a.evenementId);
              _ouvrirDestination(DestinationNouvelle.camps);
            }),
        ],
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
      // Correctif global, 27 nov. 2026 : la cloche ouvre les
      // notifications, dont la cotisation soldée, avec son détail.
      notifications: Builder(
        builder: (context) => PageNotificationsConnexion(
          service: _serviceConnexion,
          onOuvrirCotisation: _payerCotisation,
          onOuvrirPublication: (id) async {
            try {
              final publication = await _serviceConnexion.chargerDetail(id);
              if (!context.mounted) return;
              Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (_) => PageDetailConnexion(
                    service: _serviceConnexion,
                    publication: publication,
                    onOuvrirProfil: (membreId) =>
                        _ouvrirProfilDepuisNotifications(context, membreId),
                  ),
                ),
              );
            } catch (_) {
              if (!context.mounted) return;
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Cette publication ne peut pas être ouverte.'),
                ),
              );
            }
          },
          onOuvrirProfil: (membreId) =>
              _ouvrirProfilDepuisNotifications(context, membreId),
        ),
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
      journal: const PageJournal(),
      meditation: PageMeditation(
        serviceBible: _serviceBible,
        onNoter: ({required onglet, prefill}) {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (_) => Scaffold(
                backgroundColor: Colors.white,
                appBar: AppBar(
                  title: const Text(
                    'Journal personnel',
                    style: TextStyle(color: PaletteNouvelle.bleuNuit),
                  ),
                  backgroundColor: Colors.white,
                  foregroundColor: PaletteNouvelle.bleuNuit,
                ),
                body: PageJournal(
                  initialTab: onglet,
                  prefill: prefill,
                  openForm: true,
                ),
              ),
            ),
          );
        },
        onOuvrirJournal: () =>
            _ouvrirDestination(DestinationNouvelle.journal),
        onOuvrirChapitre: (livre, chapitre) {
          setState(() {
            _bibleLivre = livre;
            _bibleChapitre = chapitre;
          });
          _allerOnglet(1);
        },
      ),
      aide: const PageAideContact(),
      fonctions: PageFonctions(service: _serviceT9),
      abonnement: PageAbonnement(service: _serviceT9),
      aPropos: PageAPropos(
        onOuvrirBureau: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (_) => PageBureau(serviceT18: _serviceT18),
            ),
          );
        },
      ),
      galerie: PageGalerie(service: _serviceT9),
      espaceStructure: PageEspaceStructure(
          service: _serviceT9,
          serviceT14: _serviceT14,
          serviceT18: _serviceT18,
          onOuvrirCamps: () => _ouvrirDestination(DestinationNouvelle.camps)),
      structure: PageStructure(
        service: _serviceT9,
        serviceT14: _serviceT14,
        serviceT18: _serviceT18,
        onOuvrirCamps: () => _ouvrirDestination(DestinationNouvelle.camps),
        onOuvrirEtablissements: () =>
            _ouvrirDestination(DestinationNouvelle.etablissements),
      ),
      etablissements: PageEtablissements(
        service: _serviceT18,
        onOuvrirStructure: () =>
            _ouvrirDestination(DestinationNouvelle.structure),
      ),
      cotisations: PageCotisations(service: _serviceT14),
      elections: PageElectionMembre(service: _serviceT18),
      paroleVivante: PageParoleVivante(
        service: _serviceParole,
        onRetour: _allerAccueil,
      ),
      camps: PageCamps(
        activites: _activites,
        service: _serviceT9,
        evenementInitialId: _campOuvertId,
        onInitialConsomme: () => _campOuvertId = null,
        onVoirBadge: () => _ouvrirDestination(DestinationNouvelle.galerie),
      ),
    );
  }
}
