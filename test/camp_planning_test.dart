// Tests du programme du camp et des cellules, 21 nov. 2026.
// Aides pures de lib/camp_planning.dart, sans serveur ni réseau.
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/camp_planning.dart';

void main() {
  group('jours', () {
    test('jourIso et parseJourIso, aller et retour', () {
      expect(jourIso(DateTime(2027, 8, 22)), '2027-08-22');
      expect(jourIso(DateTime(2027, 1, 5)), '2027-01-05');
      expect(parseJourIso('2027-08-22'), DateTime(2027, 8, 22));
      expect(parseJourIso('2027-02-30'), isNull);
      expect(parseJourIso('2027-13-01'), isNull);
      expect(parseJourIso(''), isNull);
      expect(parseJourIso(null), isNull);
    });

    test('libelleJour : jour de semaine en français', () {
      expect(libelleJour(DateTime(2027, 8, 22)), 'Dimanche 22/08/2027');
      expect(libelleJour(DateTime(2027, 8, 23)), 'Lundi 23/08/2027');
      expect(libelleJour(DateTime(2027, 8, 28)), 'Samedi 28/08/2027');
    });

    test('dimancheDeLaSemaine et lundiDeLaSemaine', () {
      expect(jourIso(dimancheDeSemaine(DateTime(2027, 8, 25))), '2027-08-22');
      expect(jourIso(dimancheDeSemaine(DateTime(2027, 8, 22))), '2027-08-22');
      expect(jourIso(dimancheDeSemaine(DateTime(2027, 8, 28))), '2027-08-22');
      expect(jourIso(lundiDeSemaine(DateTime(2027, 8, 22))), '2027-08-16');
      expect(jourIso(lundiDeSemaine(DateTime(2027, 8, 23))), '2027-08-23');
      expect(jourIso(lundiDeSemaine(DateTime(2027, 8, 28))), '2027-08-23');
    });
  });

  group('heures', () {
    test('heureValideCamp : HH:MM seulement', () {
      expect(heureValideCamp('05:00'), isTrue);
      expect(heureValideCamp('23:59'), isTrue);
      expect(heureValideCamp('8:00'), isFalse);
      expect(heureValideCamp('24:00'), isFalse);
      expect(heureValideCamp('08:60'), isFalse);
      expect(heureValideCamp(''), isFalse);
    });
  });

  group('constantes', () {
    test('7 jours, 5 rôles, 10 types de créneaux', () {
      expect(joursSemaineLabels.length, 7);
      expect(joursSemaineLabels.first, 'Dimanche');
      expect(joursSemaineLabels.last, 'Samedi');
      expect(rolesCellule, [
        'Dirigeant',
        'Louange',
        'Prédication',
        'Accueil',
        'Intercession',
      ]);
      expect(typesCreneauModele.length, 10);
      expect(typesCreneauModele, contains('Enseignement'));
    });
  });

  group('groupeEntreesParJour', () {
    test('jours triés, créneaux triés par heure', () {
      final groupes = groupeEntreesParJour([
        {'jour': '2027-08-24', 'heure_debut': '14:00', 'titre': 'B'},
        {'jour': '2027-08-23', 'heure_debut': '08:00', 'titre': 'A'},
        {'jour': '2027-08-23', 'heure_debut': '05:00', 'titre': 'C'},
        {'jour': '2027-02-30', 'heure_debut': '05:00', 'titre': 'Invalide'},
      ]);
      expect(groupes.keys.toList(), ['2027-08-23', '2027-08-24']);
      expect(
        groupes['2027-08-23']!.map((e) => e['titre']).toList(),
        ['C', 'A'],
      );
      expect(groupes['2027-08-24']!.length, 1);
    });

    test('liste vide, sans entrée', () {
      expect(groupeEntreesParJour([]), isEmpty);
    });
  });
}
