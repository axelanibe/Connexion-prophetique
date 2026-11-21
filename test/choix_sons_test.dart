// Choix des sons dans Paramètres, 21 nov. 2026 : le choix est
// gardé en local, l'écoute joue le fichier de la variante choisie,
// et changer de son recrée le canal de notification. Sans
// téléphone, sans canal réel : la recréation est le branchement
// injecté, vérifié ici par son appel.
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/choix_sons.dart';

/// Faux lecteur d'écoute : enregistre les assets joués.
class FauxLecteurApercu implements LecteurApercuSon {
  final List<String> ecoutes = [];

  @override
  Future<void> ecouter(String asset) async {
    ecoutes.add(asset);
  }
}

void main() {
  setUp(() {
    SharedPreferences.setMockInitialValues(<String, Object>{});
  });

  group('Variantes', () {
    test('trois sonneries, deux sons de messages, fichiers distincts',
        () {
      expect(variantesSonnerieAppel.map((v) => v.id).toList(), [
        'classique',
        'cp-melodie',
        'cp-carillon',
      ]);
      expect(variantesSonMessage.map((v) => v.id).toList(), [
        'trois-notes',
        'ding-dong',
      ]);
      final assets = <String>{
        ...variantesSonnerieAppel.map((v) => v.assetAudio),
        ...variantesSonMessage.map((v) => v.assetAudio),
      };
      expect(assets.length, 5);
      final ressources = <String>{
        ...variantesSonnerieAppel.map((v) => v.ressourceRaw),
        ...variantesSonMessage.map((v) => v.ressourceRaw),
      };
      expect(ressources.length, 5);
    });

    test('chaque variante a un asset audio et une ressource brute',
        () {
      for (final variante in [
        ...variantesSonnerieAppel,
        ...variantesSonMessage,
      ]) {
        expect(variante.assetAudio, startsWith('assets/audio/'));
        expect(variante.assetAudio, endsWith('.wav'));
        expect(variante.ressourceRaw, isNot(contains('.')));
        expect(variante.ressourceRaw, isNot(contains('-')));
      }
    });

    test('les défauts choisis par Axel sont une variante de chaque liste',
        () {
      expect(
        variantesSonnerieAppel.map((v) => v.id),
        contains(ChoixSons.sonnerieParDefautId),
      );
      expect(
        variantesSonMessage.map((v) => v.id),
        contains(ChoixSons.messageParDefautId),
      );
    });
  });

  group('Choix gardé en local', () {
    test('sans choix, les défauts choisis par Axel s’appliquent', () async {
      final choix = ChoixSons();
      await choix.charger();
      expect(choix.sonnerieId, ChoixSons.sonnerieParDefautId);
      expect(choix.messageId, ChoixSons.messageParDefautId);
      expect(
        choix.sonnerieChoisie.assetAudio,
        'assets/audio/sonnerie-appel.wav',
      );
      expect(
        choix.messageChoisi.assetAudio,
        'assets/audio/son-message-trois-notes.wav',
      );
      expect(choix.sonnerieChoisie.ressourceRaw, 'sonnerie_appel_cp');
      expect(choix.messageChoisi.ressourceRaw, 'son_message_cp');
    });

    test('choisir une sonnerie la garde dans SharedPreferences', () async {
      final choix = ChoixSons();
      await choix.charger();
      await choix.choisirSonnerie('cp-carillon');
      expect(choix.sonnerieId, 'cp-carillon');
      expect(
        choix.sonnerieChoisie.ressourceRaw,
        'sonnerie_appel_cp_carillon',
      );
      final prefs = await SharedPreferences.getInstance();
      expect(prefs.getString(ChoixSons.cleSonnerie), 'cp-carillon');
      final relu = ChoixSons();
      await relu.charger();
      expect(relu.sonnerieId, 'cp-carillon');
    });

    test('choisir un son de message le garde dans SharedPreferences',
        () async {
      final choix = ChoixSons();
      await choix.charger();
      await choix.choisirMessage('trois-notes');
      expect(choix.messageId, 'trois-notes');
      expect(
        choix.messageChoisi.ressourceRaw,
        'son_message_cp',
      );
      final prefs = await SharedPreferences.getInstance();
      expect(prefs.getString(ChoixSons.cleMessage), 'trois-notes');
      final relu = ChoixSons();
      await relu.charger();
      expect(relu.messageId, 'trois-notes');
    });

    test('un identifiant inconnu retombe sur le défaut, sans planter',
        () async {
      final choix = ChoixSons();
      await choix.charger();
      await choix.choisirSonnerie('inconnu');
      expect(choix.sonnerieId, ChoixSons.sonnerieParDefautId);
      await choix.choisirMessage('inconnu');
      expect(choix.messageId, ChoixSons.messageParDefautId);
    });
  });

  group('Écoute avant de choisir', () {
    test('écouter une sonnerie joue son fichier', () async {
      final choix = ChoixSons();
      final fauxLecteur = FauxLecteurApercu();
      choix.lecteurApercu = fauxLecteur;
      await choix.charger();
      await choix.ecouterSonnerie('cp-melodie');
      expect(fauxLecteur.ecoutes, [
        'assets/audio/sonnerie-appel-cp-melodie.wav',
      ]);
      await choix.ecouterSonnerie('cp-carillon');
      expect(fauxLecteur.ecoutes, [
        'assets/audio/sonnerie-appel-cp-melodie.wav',
        'assets/audio/sonnerie-appel-cp-carillon.wav',
      ]);
    });

    test('écouter un son de message joue son fichier', () async {
      final choix = ChoixSons();
      final fauxLecteur = FauxLecteurApercu();
      choix.lecteurApercu = fauxLecteur;
      await choix.charger();
      await choix.ecouterMessage('trois-notes');
      expect(fauxLecteur.ecoutes, [
        'assets/audio/son-message-trois-notes.wav',
      ]);
    });
  });

  group('Recréation du canal des messages', () {
    test('changer de son recrée le canal avec la nouvelle ressource',
        () async {
      final choix = ChoixSons();
      final recrees = <String>[];
      choix.surChangementMessage = (ressource) async {
        recrees.add(ressource);
      };
      await choix.charger();
      await choix.choisirMessage('ding-dong');
      expect(recrees, ['son_message_ding_dong']);
      final prefs = await SharedPreferences.getInstance();
      expect(
        prefs.getString(ChoixSons.cleCanalMessagesApplique),
        'son_message_ding_dong',
      );
    });

    test('choisir le même son ne recrée pas le canal', () async {
      final choix = ChoixSons();
      final recrees = <String>[];
      choix.surChangementMessage = (ressource) async {
        recrees.add(ressource);
      };
      await choix.charger();
      await choix.choisirMessage('trois-notes');
      expect(recrees, isEmpty);
    });

    test('appliquer ne recrée que quand le son appliqué diffère',
        () async {
      final choix = ChoixSons();
      final recrees = <String>[];
      choix.surChangementMessage = (ressource) async {
        recrees.add(ressource);
      };
      await choix.charger();
      await choix.appliquerCanalMessages();
      expect(recrees, ['son_message_cp']);
      await choix.appliquerCanalMessages();
      expect(recrees, ['son_message_cp']);
    });

    test('sans branchement, le choix est gardé sans recréation', () async {
      final choix = ChoixSons();
      await choix.charger();
      await choix.choisirMessage('trois-notes');
      expect(choix.messageId, 'trois-notes');
    });
  });
}
