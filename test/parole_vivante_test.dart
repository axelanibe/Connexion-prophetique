// Parole Vivante, 21 nov. 2026 : fonctions pures de l'espace
// audio (recherche, filtres, regroupements, progression),
// sans lecteur réel et sans contenu inventé.
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/main.dart';

Teaching _audio(String titre, String orateur, String kind,
        {String thematique = '', String duree = '12:00', String serverId = ''}) =>
    Teaching(titre, orateur, 'https://exemple.test/$titre.mp3',
        kind: kind, thematique: thematique, duree: duree, serverId: serverId);

void main() {
  group('Parole Vivante, recherche', () {
    final audios = [
      _audio('La foi qui guérit', 'Axel Anibé', 'enseignement', thematique: 'Guérison intérieure'),
      _audio('Chant de louange', 'Marie Dubois', 'musique'),
      _audio('Épisode 3', 'Axel Anibé', 'podcast', thematique: 'Questions réponses'),
    ];

    test('recherche dans le titre, sans casse', () {
      expect(rechercherAudios(audios, 'FOI').map((a) => a.title), ['La foi qui guérit']);
    });

    test('recherche dans l\'orateur', () {
      expect(rechercherAudios(audios, 'marie').map((a) => a.title), ['Chant de louange']);
    });

    test('recherche dans la thématique, sans accents', () {
      expect(rechercherAudios(audios, 'guerison').map((a) => a.title), ['La foi qui guérit']);
      expect(rechercherAudios(audios, 'GUÉRISON').map((a) => a.title), ['La foi qui guérit']);
    });

    test('requête vide reprend tout, dans le même ordre', () {
      expect(rechercherAudios(audios, '  ').map((a) => a.title),
          ['La foi qui guérit', 'Chant de louange', 'Épisode 3']);
    });

    test('aucun résultat quand rien ne correspond', () {
      expect(rechercherAudios(audios, 'introuvable'), isEmpty);
    });
  });

  group('Parole Vivante, filtres', () {
    final audios = [
      _audio('Un', 'A', 'enseignement'),
      _audio('Deux', 'A', 'enseignement'),
      _audio('Chant', 'B', 'musique'),
      _audio('Épisode', 'C', 'podcast'),
    ];

    test('tous reprend tout', () {
      expect(filtrerAudiosParType(audios, 'tous').length, 4);
    });

    test('chaque type filtre seul', () {
      expect(filtrerAudiosParType(audios, 'enseignement').map((a) => a.title), ['Un', 'Deux']);
      expect(filtrerAudiosParType(audios, 'musique').map((a) => a.title), ['Chant']);
      expect(filtrerAudiosParType(audios, 'podcast').map((a) => a.title), ['Épisode']);
    });

    test('type inconnu ne donne rien', () {
      expect(filtrerAudiosParType(audios, 'video'), isEmpty);
    });
  });

  group('Parole Vivante, regroupements', () {
    final audios = [
      _audio('Un', 'Zoé Martin', 'enseignement', thematique: 'Foi'),
      _audio('Deux', 'Axel Anibé', 'enseignement', thematique: 'Foi'),
      _audio('Trois', 'Axel Anibé', 'podcast'),
      _audio('Quatre', '', 'musique', thematique: 'Louange'),
    ];

    test('grouperParOrateur trie par nom et ignore l\'orateur vide', () {
      final groupes = grouperParOrateur(audios);
      expect(groupes.keys.toList(), ['Axel Anibé', 'Zoé Martin']);
      expect(groupes['Axel Anibé']!.map((a) => a.title), ['Deux', 'Trois']);
    });

    test('grouperParSerie trie par thématique et ignore les vides', () {
      final groupes = grouperParSerie(audios);
      expect(groupes.keys.toList(), ['Foi', 'Louange']);
      expect(groupes['Foi']!.map((a) => a.title), ['Un', 'Deux']);
    });

    test('listes vides quand rien n\'est publié', () {
      expect(grouperParOrateur([]), isEmpty);
      expect(grouperParSerie([]), isEmpty);
    });
  });

  group('Parole Vivante, ajouts récents', () {
    final audios = List.generate(8, (i) => _audio('Titre $i', 'A', 'enseignement'));

    test('les six premiers, dans l\'ordre de la liste', () {
      expect(ajoutsRecents(audios).map((a) => a.title),
          ['Titre 0', 'Titre 1', 'Titre 2', 'Titre 3', 'Titre 4', 'Titre 5']);
    });

    test('moins quand la liste est courte', () {
      expect(ajoutsRecents(audios.sublist(0, 2)).length, 2);
      expect(ajoutsRecents([]), isEmpty);
    });
  });

  group('Parole Vivante, durée et progression', () {
    test('dureeEnSecondes lit mm:ss, hh:mm:ss et minutes', () {
      expect(dureeEnSecondes('12:34'), 754);
      expect(dureeEnSecondes('1:02:30'), 3750);
      expect(dureeEnSecondes('45 min'), 2700);
      expect(dureeEnSecondes('45 minutes'), 2700);
    });

    test('dureeEnSecondes refuse les formats inconnus', () {
      expect(dureeEnSecondes(''), isNull);
      expect(dureeEnSecondes('abc'), isNull);
      expect(dureeEnSecondes('12'), isNull);
      expect(dureeEnSecondes('12:xx'), isNull);
    });

    test('progressionEcoute donne le ratio, plafonné à 1', () {
      expect(progressionEcoute(377, '12:34'), closeTo(0.5, 0.01));
      expect(progressionEcoute(1000, '12:34'), 1.0);
    });

    test('progressionEcoute est nulle sans durée ou sans position', () {
      expect(progressionEcoute(0, '12:34'), isNull);
      expect(progressionEcoute(100, 'abc'), isNull);
      expect(progressionEcoute(100, ''), isNull);
    });

    test('formaterDuree donne m:ss', () {
      expect(formaterDuree(754), '12:34');
      expect(formaterDuree(65), '1:05');
      expect(formaterDuree(0), '0:00');
    });

    test('initialesOrateur prend les initiales des premier et dernier mots', () {
      expect(initialesOrateur('Axel Anibe'), 'AA');
      expect(initialesOrateur('Marie'), 'M');
      expect(initialesOrateur(''), '?');
    });

    test('premierAudioAvecImage prend le premier avec image, sinon le premier', () {
      final sans = _audio('Sans', 'A', 'enseignement');
      final avec = _audio('Avec', 'A', 'enseignement', serverId: 'srv1');
      final avecImage = Teaching('Avec', 'A', 'https://exemple.test/avec.mp3',
          kind: 'enseignement', imageUrl: 'https://exemple.test/pochette.jpg');
      expect(premierAudioAvecImage([sans, avecImage]), same(avecImage));
      expect(premierAudioAvecImage([sans, avec]), same(sans));
      expect(premierAudioAvecImage([]), isNull);
    });
  });

  group('Parole Vivante, positions', () {
    test('clePositionAudio utilise serverId puis titre', () {
      expect(clePositionAudio(_audio('Titre', 'A', 'enseignement', serverId: 'srv1')), 'audio_position_srv1');
      expect(clePositionAudio(_audio('Titre', 'A', 'enseignement')), 'audio_position_Titre');
    });

    test('positionsEcoutees lit les positions sauvegardées', () async {
      SharedPreferences.setMockInitialValues({
        'audio_position_srv1': 120,
        'audio_position_Titre': 3,
      });
      final audios = [
        _audio('Un', 'A', 'enseignement', serverId: 'srv1'),
        _audio('Titre', 'A', 'enseignement'),
      ];
      final positions = await positionsEcoutees(audios);
      expect(positions, {'audio_position_srv1': 120});
    });
  });
}
