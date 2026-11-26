// Tests de la tranche T3, nouvelle Connexion, 26 nov. 2026.
// Les données ci-dessous sont des données de test, jamais
// les vraies données d'Axel. Faux service, comme les tests
// T1 et T2 avec leurs rappels injectés.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/app_models.dart';
import 'package:connexion_prophetique/nouveau/coquille.dart';
import 'package:connexion_prophetique/nouveau/modeles_connexion.dart';
import 'package:connexion_prophetique/nouveau/page_connexion.dart';

// Données de test seulement.
PublicationConnexion _pub({
  required String id,
  required String auteurId,
  required String auteurNom,
  required String categorie,
  String texte = 'Texte de test.',
  int nbJaime = 0,
  int nbAmen = 0,
  int nbPriere = 0,
  String? monType,
  int nbCommentaires = 0,
  bool enregistre = false,
  bool estAuteur = false,
  String? videoUrl,
}) =>
    PublicationConnexion(
      id: id,
      auteurId: auteurId,
      auteurNom: auteurNom,
      etablissementNom: 'Établissement de test',
      texte: texte,
      categorie: categorie,
      nbJaime: nbJaime,
      nbAmen: nbAmen,
      nbPriere: nbPriere,
      monType: monType,
      nbCommentaires: nbCommentaires,
      enregistre: enregistre,
      estAuteur: estAuteur,
      videoUrl: videoUrl,
      creeLe: DateTime(2026, 11, 20),
    );

final _filTest = [
  _pub(
      id: 'p1',
      auteurId: 'a1',
      auteurNom: 'Test Auteure',
      categorie: 'temoignage',
      texte: 'Témoignage de test.',
      nbJaime: 2,
      nbCommentaires: 1),
  _pub(
      id: 'p2',
      auteurId: 'a2',
      auteurNom: 'Test Prieur',
      categorie: 'priere',
      texte: 'Prière de test.',
      nbAmen: 1),
  _pub(
      id: 'p3',
      auteurId: 'a3',
      auteurNom: 'Test Lecteur',
      categorie: 'verset',
      texte: 'Verset de test.',
      nbPriere: 3,
      videoUrl: '/mur/p3/video'),
];

final _actualiteTest = PublicationConnexion.actualite({
  'id': 'act1',
  'titre': 'Actualité de test',
  'texte': 'Texte de test de l’actualité.',
  'publiee_le': '2026-11-19T10:00:00.000Z',
});

final _profilTest = ProfilConnexion(
  id: 'a1',
  nomComplet: 'Test Auteure',
  fonction: 'Fonction de test',
  etablissementNom: 'Établissement de test',
  presentation: 'Présentation de test.',
  inscritLe: DateTime(2025, 1, 15),
  nbPublications: 2,
  nbReactions: 5,
  nbAbonnes: 3,
  nbAbonnements: 1,
);

final _commentairesTest = [
  CommentaireConnexion(
      id: 'c1',
      membreId: 'a2',
      auteurNom: 'Test Prieur',
      texte: 'Commentaire de test.',
      creeLe: DateTime(2026, 11, 20)),
  CommentaireConnexion(
      id: 'c2',
      membreId: 'a3',
      auteurNom: 'Test Lecteur',
      texte: 'Réponse de test.',
      parentId: 'c1',
      creeLe: DateTime(2026, 11, 20)),
];

final _notificationsTest = [
  NotificationConnexion(
      id: 'n1',
      type: 'mur_mention',
      titre: 'Mention de test',
      message: 'On vous a mentionné.',
      lienType: 'mur_publication',
      lienId: 'p1'),
  NotificationConnexion(
      id: 'n2',
      type: 'mur_commentaire',
      titre: 'Commentaire de test',
      message: 'Nouveau commentaire.',
      lienType: 'mur_publication',
      lienId: 'p1'),
  NotificationConnexion(
      id: 'n3',
      type: 'mur_reaction',
      titre: 'Réaction de test',
      message: 'Nouvelle réaction.',
      lienType: 'mur_publication',
      lienId: 'p2'),
];

final _membreTest = Member(
    'Test Membre', 'CP-TEST-0000', 'Bureau national', DateTime(2025, 1, 1));

class _FauxService implements ServiceConnexion {
  _FauxService({this.enErreur = false, this.page2 = const []});

  final bool enErreur;
  final List<PublicationConnexion> page2;

  List<PublicationConnexion> fil = List.of(_filTest);
  List<PublicationConnexion> actualites = [_actualiteTest];
  List<CommentaireConnexion> commentaires = List.of(_commentairesTest);
  List<NotificationConnexion> notifications = List.of(_notificationsTest);
  ProfilConnexion profil = _profilTest;
  List<MembreConnexion> membresRecherche = [
    MembreConnexion(
        id: 'm1',
        nomComplet: 'Test Mention',
        etablissementNom: 'Établissement de test'),
  ];

  String? derniereCategorie;
  String? dernierePhoto;
  String? derniereCategorieRecherche;
  String? derniereRecherche;
  bool videoPubliee = false;
  (String, String, String)? dernierSignalement;
  List<String> dernieresMentions = [];
  String? derniereReponseA;
  int suivis = 0;
  int nonSuivis = 0;
  int lus = 0;
  bool toutLu = false;
  List<String> enregistres = [];

  List<PublicationConnexion> _filtrer({String? categorie, String? q}) {
    var liste = fil;
    if (categorie != null)
      liste = liste.where((p) => p.categorie == categorie).toList();
    if (q != null && q.isNotEmpty) {
      final s = q.toLowerCase();
      liste = liste
          .where((p) =>
              p.texte.toLowerCase().contains(s) ||
              p.auteurNom.toLowerCase().contains(s))
          .toList();
    }
    return liste;
  }

  @override
  Future<PagePublications> chargerFil(
      {String? categorie, String? q, String? avant, int limite = 20}) async {
    if (enErreur) throw Exception('test');
    derniereCategorieRecherche = categorie;
    derniereRecherche = q;
    if (avant != null) return PagePublications(publications: page2);
    return PagePublications(
        publications: _filtrer(categorie: categorie, q: q),
        suivante: page2.isEmpty ? null : 'curseur-test');
  }

  @override
  Future<List<PublicationConnexion>> chargerActualites() async => actualites;

  @override
  Future<PublicationConnexion> chargerDetail(String id) async {
    return fil.firstWhere((p) => p.id == id, orElse: () => _filTest.first);
  }

  @override
  Future<PublicationConnexion> publier(
      {required String texte, required String categorie, String? photo}) async {
    derniereCategorie = categorie;
    dernierePhoto = photo;
    final p = _pub(
        id: 'nouvelle-test',
        auteurId: 'moi',
        auteurNom: 'Test Membre',
        categorie: categorie,
        texte: texte);
    fil = [p, ...fil];
    return p;
  }

  @override
  Future<PublicationConnexion> publierVideo(String id,
      {required List<int> bytes, required String filename}) async {
    videoPubliee = true;
    final p = fil.firstWhere((x) => x.id == id);
    final avecVideo = PublicationConnexion(
      id: p.id,
      auteurId: p.auteurId,
      auteurNom: p.auteurNom,
      etablissementNom: p.etablissementNom,
      texte: p.texte,
      categorie: p.categorie,
      videoUrl: '/mur/$id/video',
      creeLe: p.creeLe,
    );
    fil = fil.map((x) => x.id == id ? avecVideo : x).toList();
    return avecVideo;
  }

  @override
  Future<void> supprimerVideo(String id) async {}

  @override
  Future<void> supprimerPublication(String id) async {
    fil = fil.where((p) => p.id != id).toList();
  }

  @override
  Future<CompteReactions> reagir(String id, String type) async {
    final p = fil.firstWhere((x) => x.id == id);
    final compte = CompteReactions(
      nbJaime: p.nbJaime +
          (type == 'jaime' && p.monType != 'jaime' ? 1 : 0) -
          (p.monType == 'jaime' && type != 'jaime' ? 1 : 0),
      nbAmen: p.nbAmen +
          (type == 'amen' && p.monType != 'amen' ? 1 : 0) -
          (p.monType == 'amen' && type != 'amen' ? 1 : 0),
      nbPriere: p.nbPriere +
          (type == 'priere' && p.monType != 'priere' ? 1 : 0) -
          (p.monType == 'priere' && type != 'priere' ? 1 : 0),
      monType: type,
    );
    fil = fil
        .map((x) => x.id == id
            ? x.avecReaction(
                jaime: compte.nbJaime,
                amen: compte.nbAmen,
                priere: compte.nbPriere,
                monType: type)
            : x)
        .toList();
    return compte;
  }

  @override
  Future<CompteReactions> retirerReaction(String id) async {
    final p = fil.firstWhere((x) => x.id == id);
    final compte = CompteReactions(
      nbJaime: p.nbJaime - (p.monType == 'jaime' ? 1 : 0),
      nbAmen: p.nbAmen - (p.monType == 'amen' ? 1 : 0),
      nbPriere: p.nbPriere - (p.monType == 'priere' ? 1 : 0),
    );
    fil = fil
        .map((x) => x.id == id
            ? x.avecReaction(
                jaime: compte.nbJaime,
                amen: compte.nbAmen,
                priere: compte.nbPriere)
            : x)
        .toList();
    return compte;
  }

  @override
  Future<List<CommentaireConnexion>> chargerCommentaires(String id) async =>
      commentaires;

  @override
  Future<CommentaireConnexion> commenter(String id, String texte,
      {String? parentId, List<String>? mentions}) async {
    dernieresMentions = mentions ?? [];
    derniereReponseA = parentId;
    final c = CommentaireConnexion(
        id: 'c-nouveau',
        membreId: 'moi',
        auteurNom: 'Test Membre',
        texte: texte,
        parentId: parentId);
    commentaires = [...commentaires, c];
    return c;
  }

  @override
  Future<void> supprimerCommentaire(String id) async {
    commentaires = commentaires.where((c) => c.id != id).toList();
  }

  @override
  Future<List<MembreConnexion>> rechercherMembres(String q) async {
    return membresRecherche
        .where((m) => m.nomComplet.toLowerCase().contains(q.toLowerCase()))
        .toList();
  }

  @override
  Future<PageProfil> chargerProfil(String membreId,
      {String? avant, int limite = 20}) async {
    return PageProfil(
        profil: profil,
        publications: fil.where((p) => p.auteurId == membreId).toList());
  }

  @override
  Future<void> suivre(String membreId) async {
    suivis++;
    profil = ProfilConnexion(
      id: profil.id,
      nomComplet: profil.nomComplet,
      fonction: profil.fonction,
      etablissementNom: profil.etablissementNom,
      presentation: profil.presentation,
      inscritLe: profil.inscritLe,
      nbPublications: profil.nbPublications,
      nbReactions: profil.nbReactions,
      nbAbonnes: profil.nbAbonnes + 1,
      nbAbonnements: profil.nbAbonnements,
      suiviParMoi: true,
    );
  }

  @override
  Future<void> nePlusSuivre(String membreId) async {
    nonSuivis++;
    profil = ProfilConnexion(
      id: profil.id,
      nomComplet: profil.nomComplet,
      fonction: profil.fonction,
      etablissementNom: profil.etablissementNom,
      presentation: profil.presentation,
      inscritLe: profil.inscritLe,
      nbPublications: profil.nbPublications,
      nbReactions: profil.nbReactions,
      nbAbonnes: profil.nbAbonnes - 1,
      nbAbonnements: profil.nbAbonnements,
      suiviParMoi: false,
    );
  }

  @override
  Future<List<MembreConnexion>> chargerAbonnes(String membreId) async =>
      membresRecherche;

  @override
  Future<List<MembreConnexion>> chargerAbonnements(String membreId) async =>
      membresRecherche;

  @override
  Future<void> enregistrer(String id) async {
    enregistres.add(id);
    fil = fil.map((x) => x.id == id ? x.avecEnregistrement(true) : x).toList();
  }

  @override
  Future<void> retirerEnregistrement(String id) async {
    enregistres.remove(id);
    fil = fil.map((x) => x.id == id ? x.avecEnregistrement(false) : x).toList();
  }

  @override
  Future<PagePublications> chargerEnregistrements(
      {String? avant, int limite = 20}) async {
    return PagePublications(
        publications: fil.where((p) => p.enregistre).toList());
  }

  @override
  Future<Map<String, String>> chargerPhotosAuteurs(List<String> ids) async =>
      const {};

  @override
  Future<List<NotificationConnexion>> chargerNotifications() async =>
      notifications;

  @override
  Future<void> marquerNotificationLue(String id) async {
    lus++;
  }

  @override
  Future<void> toutMarquerLu() async {
    toutLu = true;
  }

  @override
  Future<void> signaler(
      {required String cibleType,
      required String cibleId,
      required String motif,
      String? description}) async {
    dernierSignalement = (cibleType, cibleId, motif);
  }

  @override
  Future<List<VersetChoisi>> rechercherVersets(String q) async {
    return const [
      VersetChoisi(reference: 'Jean 3, 16', texte: 'Texte de test du verset.')
    ];
  }
}

Future<void> _pomperConnexion(
  WidgetTester tester,
  _FauxService service, {
  VoidCallback? onRetour,
  Future<MediaChoisi?> Function(bool estVideo)? onChoisirMedia,
  Future<VersetChoisi?> Function()? onChoisirVerset,
}) async {
  tester.view.physicalSize = const Size(390, 2400);
  tester.view.devicePixelRatio = 1.0;
  addTearDown(tester.view.resetPhysicalSize);
  await tester.pumpWidget(MaterialApp(
    home: PageConnexion(
      service: service,
      onRetour: onRetour,
      onChoisirMedia: onChoisirMedia,
      onChoisirVerset: onChoisirVerset,
    ),
  ));
  await tester.pumpAndSettle();
  expect(tester.takeException(), isNull);
}

void main() {
  group('T3, nouvelle Connexion', () {
    testWidgets(
        'fil : bande, compositeur, filtres, actualité épinglée, publications',
        (tester) async {
      final service = _FauxService();
      await _pomperConnexion(tester, service);
      expect(find.text('Connexion'), findsOneWidget);
      expect(
          find.text('Qu’avez-vous à partager aujourd’hui ?'), findsOneWidget);
      for (final filtre in ['Tous', 'Témoignages', 'Prières', 'Versets']) {
        expect(find.text(filtre), findsOneWidget);
      }
      expect(find.text('Actualité de la structure'), findsOneWidget);
      expect(find.text('Actualité de test'), findsOneWidget);
      expect(find.text('Témoignage de test.'), findsOneWidget);
      expect(find.text('Prière de test.'), findsOneWidget);
      expect(find.text('Verset de test.'), findsOneWidget);
      expect(find.text('Photo'), findsOneWidget);
      expect(find.text('Vidéo'), findsWidgets);
      expect(find.text('Verset'), findsOneWidget);
      expect(find.text('Prière'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('filtres : Prières puis Versets puis Tous filtrent vraiment',
        (tester) async {
      final service = _FauxService();
      await _pomperConnexion(tester, service);
      await tester.tap(find.text('Prières'));
      await tester.pumpAndSettle();
      expect(service.derniereCategorieRecherche, 'priere');
      expect(find.text('Prière de test.'), findsOneWidget);
      expect(find.text('Témoignage de test.'), findsNothing);
      expect(find.text('Verset de test.'), findsNothing);
      await tester.tap(find.text('Versets'));
      await tester.pumpAndSettle();
      expect(service.derniereCategorieRecherche, 'verset');
      expect(find.text('Verset de test.'), findsOneWidget);
      expect(find.text('Prière de test.'), findsNothing);
      await tester.tap(find.text('Tous'));
      await tester.pumpAndSettle();
      expect(find.text('Témoignage de test.'), findsOneWidget);
      expect(find.text('Prière de test.'), findsOneWidget);
      expect(find.text('Verset de test.'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('recherche : 3 caractères filtrent, 2 caractères refusés',
        (tester) async {
      final service = _FauxService();
      await _pomperConnexion(tester, service);
      final champ = find.byType(TextField).first;
      await tester.enterText(champ, 'prieur');
      await tester.testTextInput.receiveAction(TextInputAction.search);
      await tester.pumpAndSettle();
      expect(service.derniereRecherche, 'prieur');
      expect(find.text('Prière de test.'), findsOneWidget);
      expect(find.text('Témoignage de test.'), findsNothing);
      await tester.enterText(champ, 'pr');
      await tester.testTextInput.receiveAction(TextInputAction.search);
      await tester.pumpAndSettle();
      expect(find.text('Saisissez au moins 3 caractères.'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets(
        'compositeur : Publier inactif tant que vide, publication en Témoignage',
        (tester) async {
      final service = _FauxService();
      await _pomperConnexion(tester, service);
      final publier = find.byKey(const ValueKey('boutonPublier'));
      expect(tester.widget<FilledButton>(publier).onPressed, isNull);
      await tester.enterText(
          find.byType(TextField).at(1), 'Nouveau témoignage de test.');
      await tester.pump();
      expect(tester.widget<FilledButton>(publier).onPressed, isNotNull);
      await tester.tap(publier);
      await tester.pumpAndSettle();
      expect(service.derniereCategorie, 'temoignage');
      expect(find.text('Nouveau témoignage de test.'), findsWidgets);
      expect(find.text('Publication partagée.'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets(
        'compositeur : Prière montre la note, feuille Verset par défaut',
        (tester) async {
      final service = _FauxService();
      await _pomperConnexion(tester, service);
      await tester.tap(find.text('Prière'));
      await tester.pump();
      expect(find.textContaining('Le sujet de prière personnel reste privé'),
          findsOneWidget);
      await tester.tap(find.text('Verset'));
      await tester.pumpAndSettle();
      expect(find.text('Choisir un verset'), findsOneWidget);
      await tester.enterText(find.byType(TextField).last, 'verset');
      await tester.testTextInput.receiveAction(TextInputAction.search);
      await tester.pumpAndSettle();
      expect(find.text('Texte de test du verset.'), findsOneWidget);
      await tester.tap(find.text('Texte de test du verset.'));
      await tester.pumpAndSettle();
      expect(find.textContaining('Jean 3, 16'), findsOneWidget);
      await tester.tap(find.byKey(const ValueKey('boutonPublier')));
      await tester.pumpAndSettle();
      expect(service.derniereCategorie, 'verset');
      expect(tester.takeException(), isNull);
    });

    testWidgets('compositeur : Verset choisi puis publié en catégorie verset',
        (tester) async {
      final service = _FauxService();
      await _pomperConnexion(
        tester,
        service,
        onChoisirVerset: () async => const VersetChoisi(
            reference: 'Jean 3, 16', texte: 'Texte de test du verset.'),
      );
      await tester.tap(find.text('Verset'));
      await tester.pumpAndSettle();
      expect(find.textContaining('Jean 3, 16'), findsOneWidget);
      await tester.tap(find.byKey(const ValueKey('boutonPublier')));
      await tester.pumpAndSettle();
      expect(service.derniereCategorie, 'verset');
      expect(tester.takeException(), isNull);
    });

    testWidgets('compositeur : Photo jointe puis publiée avec la photo',
        (tester) async {
      final service = _FauxService();
      await _pomperConnexion(
        tester,
        service,
        onChoisirMedia: (estVideo) async => MediaChoisi(
            bytes: const [1, 2, 3],
            nom: 'photo.jpg',
            estVideo: false,
            dataUrl: 'data:image/jpeg;base64,AQID'),
      );
      await tester.tap(find.text('Photo'));
      await tester.pumpAndSettle();
      expect(find.text('photo.jpg'), findsOneWidget);
      await tester.enterText(
          find.byType(TextField).at(1), 'Texte de test avec photo.');
      await tester.pump();
      await tester.tap(find.byKey(const ValueKey('boutonPublier')));
      await tester.pumpAndSettle();
      expect(service.dernierePhoto, isNotNull);
      expect(tester.takeException(), isNull);
    });

    testWidgets('réactions : Amen compte, puis retrait au second toucher',
        (tester) async {
      final service = _FauxService();
      await _pomperConnexion(tester, service);
      expect(find.text('Amen · 1'), findsOneWidget);
      await tester.tap(find.text('Amen · 1'));
      await tester.pumpAndSettle();
      expect(find.text('Amen · 2'), findsOneWidget);
      await tester.tap(find.text('Amen · 2'));
      await tester.pumpAndSettle();
      expect(find.text('Amen · 1'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('enregistrement : marque-page puis liste des enregistrements',
        (tester) async {
      final service = _FauxService();
      await _pomperConnexion(tester, service);
      await tester.tap(find.byTooltip('Enregistrer').first);
      await tester.pumpAndSettle();
      expect(service.enregistres, ['p1']);
      await tester.tap(find.byTooltip('Enregistrements'));
      await tester.pumpAndSettle();
      expect(find.text('Enregistrements'), findsWidgets);
      expect(find.text('Témoignage de test.'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('signalement : motif choisi, publication toujours visible',
        (tester) async {
      final service = _FauxService();
      await _pomperConnexion(tester, service);
      await tester.tap(find.byIcon(Icons.more_vert).first);
      await tester.pumpAndSettle();
      await tester.tap(find.text('Signaler'));
      await tester.pumpAndSettle();
      expect(find.text('Signaler cette publication'), findsOneWidget);
      await tester.tap(find.text('Harcèlement'));
      await tester.pumpAndSettle();
      expect(
          service.dernierSignalement, ('mur_publication', 'p1', 'harcelement'));
      expect(find.text('Signalement envoyé. La structure va l’examiner.'),
          findsOneWidget);
      expect(find.text('Témoignage de test.'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('pagination : Afficher plus ajoute la page 2', (tester) async {
      final service = _FauxService(
        page2: [
          _pub(
              id: 'p4',
              auteurId: 'a4',
              auteurNom: 'Test Suite',
              categorie: 'temoignage',
              texte: 'Suite de test.')
        ],
      );
      await _pomperConnexion(tester, service);
      expect(find.text('Afficher plus'), findsOneWidget);
      await tester.tap(find.text('Afficher plus'));
      await tester.pumpAndSettle();
      expect(find.text('Suite de test.'), findsOneWidget);
      expect(find.text('Afficher plus'), findsNothing);
      expect(tester.takeException(), isNull);
    });

    testWidgets('erreur de chargement : message et Réessayer', (tester) async {
      final service = _FauxService(enErreur: true);
      await _pomperConnexion(tester, service);
      expect(find.text('Le fil ne peut pas être chargé pour le moment.'),
          findsOneWidget);
      expect(find.text('Réessayer'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets(
        'détail : commentaires et réponse imbriquée, envoi avec mention',
        (tester) async {
      final service = _FauxService();
      await _pomperConnexion(tester, service);
      await tester.tap(find.byIcon(Icons.comment_outlined).first);
      await tester.pumpAndSettle();
      expect(find.text('Publication'), findsOneWidget);
      expect(find.text('Commentaire de test.'), findsOneWidget);
      expect(find.text('Réponse de test.'), findsOneWidget);
      final champ = find.byType(TextField).last;
      await tester.enterText(champ, 'Bonjour @Tes');
      await tester.pumpAndSettle();
      expect(find.text('Test Mention'), findsOneWidget);
      await tester.tap(find.text('Test Mention'));
      await tester.pump();
      await tester.tap(find.byIcon(Icons.send_outlined));
      await tester.pumpAndSettle();
      expect(service.dernieresMentions, ['m1']);
      expect(find.textContaining('Test Mention'), findsWidgets);
      expect(tester.takeException(), isNull);
    });

    testWidgets('détail : Répondre envoie avec le parent', (tester) async {
      final service = _FauxService();
      await _pomperConnexion(tester, service);
      await tester.tap(find.byIcon(Icons.comment_outlined).first);
      await tester.pumpAndSettle();
      await tester.tap(find.text('Répondre'));
      await tester.pump();
      expect(find.textContaining('Réponse à Test Prieur'), findsOneWidget);
      await tester.enterText(
          find.byType(TextField).last, 'Réponse envoyée en test.');
      await tester.pump();
      await tester.tap(find.byIcon(Icons.send_outlined));
      await tester.pumpAndSettle();
      expect(service.derniereReponseA, 'c1');
      expect(find.text('Réponse envoyée en test.'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('profil : Suivre devient Suivi, À propos montre les champs',
        (tester) async {
      final service = _FauxService();
      await _pomperConnexion(tester, service);
      await tester.tap(find.text('Test Auteure').first);
      await tester.pumpAndSettle();
      expect(find.text('Test Auteure'), findsWidgets);
      expect(find.text('Fonction de test'), findsOneWidget);
      expect(find.text('Suivre'), findsOneWidget);
      await tester.tap(find.text('Suivre'));
      await tester.pumpAndSettle();
      expect(service.suivis, 1);
      expect(find.text('Suivi'), findsOneWidget);
      await tester.tap(find.text('À propos'));
      await tester.pumpAndSettle();
      expect(find.text('Présentation de test.'), findsWidgets);
      expect(find.text('Établissement de test'), findsWidgets);
      expect(find.text('15/01/2025'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets(
        'notifications : filtres Mentions et Activité, toucher ouvre le détail',
        (tester) async {
      final service = _FauxService();
      await _pomperConnexion(tester, service);
      await tester.tap(find.byTooltip('Notifications'));
      await tester.pumpAndSettle();
      expect(find.text('Notifications'), findsOneWidget);
      expect(find.text('Mention de test'), findsOneWidget);
      expect(find.text('Commentaire de test'), findsOneWidget);
      expect(find.text('Réaction de test'), findsOneWidget);
      await tester.tap(find.text('Mentions'));
      await tester.pumpAndSettle();
      expect(find.text('Mention de test'), findsOneWidget);
      expect(find.text('Commentaire de test'), findsNothing);
      expect(find.text('Réaction de test'), findsNothing);
      await tester.tap(find.text('Activité'));
      await tester.pumpAndSettle();
      expect(find.text('Mention de test'), findsNothing);
      expect(find.text('Commentaire de test'), findsOneWidget);
      expect(find.text('Réaction de test'), findsOneWidget);
      await tester.tap(find.text('Toutes'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Mention de test'));
      await tester.pumpAndSettle();
      expect(service.lus, 1);
      expect(find.text('Publication'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('coquille : onglet Connexion plein écran, sans barre du bas',
        (tester) async {
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      var retours = 0;
      await tester.pumpWidget(MaterialApp(
        home: NouvelleCoquille(
          membre: _membreTest,
          connexion:
              PageConnexion(service: _FauxService(), onRetour: () => retours++),
        ),
      ));
      await tester.pumpAndSettle();
      expect(find.byType(BottomNavigationBar), findsOneWidget);
      await tester.tap(find.byIcon(Icons.groups_outlined));
      await tester.pumpAndSettle();
      expect(find.text('Connexion'), findsOneWidget);
      expect(find.byType(BottomNavigationBar), findsNothing);
      expect(find.text('CONNEXION PROPHÉTIQUE'), findsNothing);
      await tester.tap(find.byTooltip('Retour'));
      await tester.pumpAndSettle();
      expect(retours, 1);
      expect(tester.takeException(), isNull);
    });

    testWidgets('modèles : actualité épinglée et compteurs de réactions',
        (tester) async {
      final p = PublicationConnexion.fromJson({
        'id': 'x',
        'auteur_nom': 'Test',
        'texte': 'Texte.',
        'categorie': 'verset',
        'nb_jaime': 2,
        'nb_amen': 1,
        'nb_priere': 0,
        'mon_type': 'amen',
        'nb_commentaires': 4,
      });
      expect(p.categorieEnum, CategorieConnexion.verset);
      expect(p.maReaction, TypeReaction.amen);
      expect(p.nbCommentaires, 4);
      expect(_actualiteTest.epinglee, isTrue);
      expect(_actualiteTest.titre, 'Actualité de test');
      final notif = NotificationConnexion.fromJson({
        'id': 'n',
        'type': 'mur_mention',
        'titre': 'T',
        'message': 'M',
        'lien_type': 'mur_publication',
        'lien_id': 'p1',
      });
      expect(notif.estMention, isTrue);
      expect(notif.estMur, isTrue);
    });
  });
}

