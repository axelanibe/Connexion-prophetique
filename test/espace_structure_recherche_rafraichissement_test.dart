// Espace structure, recherche et rafraîchissement, 22 nov. 2026.
//
// Le rôle vient du jeton restauré, sans appel réseau. La passe
// légère (60 s) ne charge que les contenus publics, la passe
// lourde (5 min ou à la demande) ajoute détails d'établissement,
// listes admin, paiements et élection. Le sondage des appels
// recule sur 429 puis reprend. Les filtres du tiroir et de
// l'indicatif sont locaux, sans accents, insensibles à la casse.
//
// Les appels passent par un client HTTP simulé, qui enregistre
// chaque chemin appelé. Le client partagé est remplacé pour
// chaque test, puis restauré. L'état global app est utilisé,
// comme dans le test du correctif bandeau, un AppState neuf
// recréerait le lecteur audio hors liaison.
import 'dart:convert';

import 'package:connexion_prophetique/api.dart';
import 'package:connexion_prophetique/identifiant_connexion.dart';
import 'package:connexion_prophetique/main.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:shared_preferences/shared_preferences.dart';

// C-2, 22 nov. 2026 : les jetons passent par le coffre chiffré,
// le canal doit être simulé en test, comme dans
// securite_correctifs_test.dart.
final _coffre = <String, String>{};
const _canalCoffre =
    MethodChannel('plugins.it_nomads.com/flutter_secure_storage');

void _simulerCoffre() {
  TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
      .setMockMethodCallHandler(_canalCoffre, (MethodCall appel) async {
    final args = appel.arguments as Map?;
    final cle = args?['key'] as String?;
    if (appel.method == 'write' && cle != null) {
      _coffre[cle] = args?['value'] as String? ?? '';
      return null;
    }
    if (appel.method == 'read' && cle != null) return _coffre[cle];
    if (appel.method == 'delete' && cle != null) {
      _coffre.remove(cle);
      return null;
    }
    if (appel.method == 'deleteAll') {
      _coffre.clear();
      return null;
    }
    return null;
  });
}


http.Response _ok(Object corps) => http.Response(
      jsonEncode(corps),
      200,
      headers: {'content-type': 'application/json'},
    );

/// Jeton factice, charge utile base64url, rôle et matricule.
/// Le serveur ne le voit jamais, seul api.role le décode.
String _jeton(String role) {
  String b64(String s) => base64Url.encode(utf8.encode(s));
  return '${b64('{"alg":"none"}')}.${b64(jsonEncode({'role': role, 'mid': 'm1'}))}.x';
}

/// Client simulé qui enregistre les chemins appelés, dans
/// l'ordre. Santé OK, configurations vides, contenus fixes,
/// listes vides sinon.
MockClient _clientEnregistreur(List<String> chemins) {
  return MockClient((request) async {
    final chemin = request.url.path;
    chemins.add(chemin);
    if (chemin == '/sante') return _ok({'ok': true});
    if (chemin == '/config' ||
        chemin == '/config/design' ||
        chemin == '/api/config') {
      return _ok({});
    }
    if (chemin == '/moi') {
      return _ok({
        'matricule': 'CP-AA-2526',
        'nom_complet': 'ANIBE ADJA MAURICE AXEL',
        'etablissement': 'Bureau national',
        'valide_jusqua': '2027-10-01',
        'inscrit_le': '2025-01-01',
      });
    }
    if (chemin == '/etablissements') {
      return _ok([
        {'id': 'e-ispam', 'nom': 'ISPAM'},
        {'id': 'e-celeste', 'nom': 'Céleste'},
      ]);
    }
    // Détail d'un établissement, passe lourde seulement.
    if (chemin.startsWith('/etablissements/')) {
      return _ok({
        'activites': [
          {'id': 'a1', 'titre': 'Prière'},
        ],
      });
    }
    if (chemin == '/actualites') {
      return _ok([
        {
          'id': 'n1',
          'titre': 'Veillée',
          'texte': 'Vendredi.',
          'etablissement_id': 'e-ispam',
          'publiee_le': '2026-11-21T10:00:00Z'
        },
      ]);
    }
    if (chemin == '/evenements') {
      return _ok([
        {
          'id': 'c1',
          'type': 'camp',
          'nom': 'Camp National Kairos',
          'date_debut': '2027-08-22',
          'date_fin': '2027-08-28',
          'lieu': 'Abidjan',
          'pays': "Côte d'Ivoire",
          'tarif_fcfa': 15000,
          'est_kairos': true,
          'description': 'Kairos.'
        },
      ]);
    }
    if (chemin == '/livres' ||
        chemin == '/enseignements' ||
        chemin == '/bureau' ||
        chemin == '/admin/bureau' ||
        chemin == '/annonces-audio' ||
        chemin == '/cartes-video' ||
        chemin == '/admin/annonces-audio' ||
        chemin == '/admin/cartes-video' ||
        chemin == '/admin/actualites' ||
        chemin == '/moi/paiements' ||
        chemin == '/moi/inscriptions' ||
        chemin == '/admin/paiements') {
      return _ok([]);
    }
    if (chemin == '/elections/actuelle') return _ok({});
    if (chemin == '/notifications') return _ok({});
    if (chemin == '/moi/bible-sync') return _ok({});
    return _ok({});
  });
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  _simulerCoffre();

  late ApiClient clientOrigine;

  setUp(() {
    _coffre.clear();
    SharedPreferences.setMockInitialValues({});
    clientOrigine = api;
  });

  tearDown(() {
    api = clientOrigine;
    app.member = null;
    app.isAdmin = false;
    app.isAdminGeneral = false;
    app.espaceStructureMasque = false;
    app.serverStatus = 'local';
    app.lastSyncAt = null;
    app.news.clear();
    app.camps.clear();
    app.cultes.clear();
    app.etabs.clear();
    app.etabs.addAll([
      Etab('ISPAM'),
      Etab('Céleste'),
      Etab('La Silhouette'),
      Etab('BNC'),
    ]);
    app.bureau.clear();
    app.pendingPaymentsKnown = false;
    app.pendingPaymentsCount = 0;
  });

  group('rôle dérivé du jeton', () {
    test('admin général : isAdmin et isAdminGeneral', () async {
      api = ApiClient(client: _clientEnregistreur([]));
      await api.saveToken(_jeton('admin_general'));
      app.restaurerRoleDuJeton();
      expect(app.isAdmin, isTrue);
      expect(app.isAdminGeneral, isTrue);
    });

    test('admin établissement : isAdmin sans isAdminGeneral', () async {
      api = ApiClient(client: _clientEnregistreur([]));
      await api.saveToken(_jeton('admin_etablissement'));
      app.restaurerRoleDuJeton();
      expect(app.isAdmin, isTrue);
      expect(app.isAdminGeneral, isFalse);
    });

    test('membre : ni admin ni admin général', () async {
      api = ApiClient(client: _clientEnregistreur([]));
      await api.saveToken(_jeton('membre'));
      app.restaurerRoleDuJeton();
      expect(app.isAdmin, isFalse);
      expect(app.isAdminGeneral, isFalse);
    });

    test('sans jeton : pas de rôle', () async {
      api = ApiClient(client: _clientEnregistreur([]));
      app.restaurerRoleDuJeton();
      expect(app.isAdmin, isFalse);
      expect(app.isAdminGeneral, isFalse);
    });

    test('jeton illisible : pas de rôle, pas de plantage', () async {
      api = ApiClient(client: _clientEnregistreur([]));
      await api.saveToken('pas-un-jeton');
      app.restaurerRoleDuJeton();
      expect(app.isAdmin, isFalse);
      expect(app.isAdminGeneral, isFalse);
    });
  });

  group('recul sur 429', () {
    test('delaiReessai429 lit le délai du serveur', () {
      expect(delaiReessai429('Rate limit exceeded, retry in 17 seconds'),
          17);
      expect(delaiReessai429('Rate limit exceeded, retry in 1 seconds'),
          1);
    });

    test('delaiReessai429 plafonne à 65 secondes', () {
      expect(delaiReessai429('Rate limit exceeded, retry in 120 seconds'),
          65);
    });

    test('delaiReessai429 replie à 30 secondes sans délai lisible', () {
      expect(delaiReessai429('Rate limit exceeded'), 30);
      expect(delaiReessai429(''), 30);
    });

    test('PauseSondage met en pause puis reprend', () {
      final pause = PauseSondage();
      expect(pause.enPause, isFalse);
      pause.mettreEnPause(60);
      expect(pause.enPause, isTrue);
      pause.mettreEnPause(0);
      expect(pause.enPause, isFalse);
    });
  });

  group('filtre du tiroir', () {
    test('titre et sous-titre, insensible à la casse', () {
      expect(
          entreeTiroirCorrespond(
              'Espace structure', 'Paiements à valider', 'espace'), isTrue);
      expect(
          entreeTiroirCorrespond('Mes responsabilités',
              'Vos nominations, fonctions et accès', 'nominations'),
          isTrue);
      expect(
          entreeTiroirCorrespond(
              'Culte en direct', 'Direct et replays chapitrés.', 'CULTE'),
          isTrue);
      expect(entreeTiroirCorrespond('Espace structure', 'Paiements', 'xyz'),
          isFalse);
    });

    test('recherche vide : tout correspond', () {
      expect(entreeTiroirCorrespond('Espace structure', 'Paiements', ''),
          isTrue);
      expect(entreeTiroirCorrespond('Accueil', '', '   '), isTrue);
    });

    test('sans accents, des deux côtés', () {
      expect(
          entreeTiroirCorrespond(
              'Culte en direct', 'Direct et replays chapitrés.', 'chapitres'),
          isTrue);
      expect(entreeTiroirCorrespond('Côte', '', 'cote'), isTrue);
    });
  });

  group('filtre des indicatifs', () {
    const codes = [
      ('+225', "Côte d'Ivoire"),
      ('+1', 'Canada'),
      ('+1', 'États-Unis'),
      ('+33', 'France'),
    ];

    test('recherche vide : tout', () {
      expect(filtrerIndicatifs(codes, ''), [0, 1, 2, 3]);
    });

    test('par pays, sans accents', () {
      expect(filtrerIndicatifs(codes, 'côte'), [0]);
      expect(filtrerIndicatifs(codes, 'cote'), [0]);
      expect(filtrerIndicatifs(codes, 'france'), [3]);
    });

    test('par indicatif, +1 partagé par deux pays', () {
      expect(filtrerIndicatifs(codes, '225'), [0]);
      expect(filtrerIndicatifs(codes, '+1'), [1, 2]);
    });

    test('sans résultat', () {
      expect(filtrerIndicatifs(codes, 'xyz'), isEmpty);
    });
  });

  group('fautResynchroniser', () {
    test('jamais synchronisé : oui', () {
      expect(app.fautResynchroniser(null), isTrue);
    });

    test('moins de 60 secondes : non', () {
      expect(app.fautResynchroniser(DateTime.now()), isFalse);
      expect(
          app.fautResynchroniser(
              DateTime.now().subtract(const Duration(seconds: 30))),
          isFalse);
    });

    test('plus de 60 secondes : oui', () {
      expect(
          app.fautResynchroniser(
              DateTime.now().subtract(const Duration(seconds: 61))),
          isTrue);
    });
  });

  group('passes légère et lourde', () {
    test('passe légère admin : contenus publics, rien de lourd', () async {
      final chemins = <String>[];
      api = ApiClient(client: _clientEnregistreur(chemins));
      await api.saveToken(_jeton('admin_general'));
      final ancien = Etab('ISPAM', id: 'e-ispam')
        ..activities.add(ActivityItem('Chorale'));
      app.etabs
        ..clear()
        ..add(ancien);
      await app.syncFromServer(lourd: false);
      expect(app.serverStatus, 'serveur');
      expect(app.isAdminGeneral, isTrue);
      expect(app.news.length, 1);
      expect(app.etabs.length, 2);
      expect(chemins, contains('/sante'));
      expect(chemins, contains('/moi'));
      expect(chemins, contains('/actualites'));
      expect(chemins, contains('/etablissements'));
      expect(chemins, contains('/evenements'));
      expect(chemins, contains('/livres'));
      expect(chemins, contains('/enseignements'));
      expect(chemins, isNot(contains('/etablissements/e-ispam')));
      expect(chemins, isNot(contains('/annonces-audio')));
      expect(chemins, isNot(contains('/cartes-video')));
      expect(chemins, isNot(contains('/admin/actualites')));
      expect(chemins, isNot(contains('/admin/bureau')));
      expect(chemins, isNot(contains('/admin/paiements')));
      expect(chemins, isNot(contains('/elections/actuelle')));
      expect(chemins, isNot(contains('/moi/paiements')));
      expect(chemins, isNot(contains('/moi/inscriptions')));
      // Les activités anciennes sont conservées en passe légère.
      final ispam = app.etabs.firstWhere((e) => e.id == 'e-ispam');
      expect(ispam.activities.map((a) => a.title), contains('Chorale'));
    });

    test('passe légère membre : bureau public récupéré', () async {
      final chemins = <String>[];
      api = ApiClient(client: _clientEnregistreur(chemins));
      await api.saveToken(_jeton('membre'));
      await app.syncFromServer(lourd: false);
      expect(app.serverStatus, 'serveur');
      expect(app.isAdmin, isFalse);
      expect(chemins, contains('/bureau'));
      expect(chemins, isNot(contains('/admin/bureau')));
    });

    test('passe lourde admin : détails, listes admin, paiements, élection',
        () async {
      final chemins = <String>[];
      api = ApiClient(client: _clientEnregistreur(chemins));
      await api.saveToken(_jeton('admin_general'));
      await app.syncFromServer();
      expect(app.serverStatus, 'serveur');
      expect(app.isAdminGeneral, isTrue);
      expect(chemins, contains('/etablissements/e-ispam'));
      expect(chemins, contains('/annonces-audio'));
      expect(chemins, contains('/cartes-video'));
      expect(chemins, contains('/admin/actualites'));
      expect(chemins, contains('/admin/bureau'));
      expect(chemins, contains('/admin/paiements'));
      expect(chemins, contains('/elections/actuelle'));
      expect(chemins, contains('/moi/paiements'));
      expect(chemins, contains('/moi/inscriptions'));
      // Le détail remplace les activités anciennes.
      final ispam = app.etabs.firstWhere((e) => e.id == 'e-ispam');
      expect(ispam.activities.map((a) => a.title), ['Prière']);
    });
  });
}
