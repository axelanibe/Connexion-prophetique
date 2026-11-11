// Tests de la carte 126 tranche 6, 11 nov. 2026 : rubrique
// « Mes responsabilités ». Fonctions pures seules, sans serveur
// ni base.
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/app_models.dart';

void main() {
  group('Carte 126 tranche 6, nomination à venir', () {
    test('début futur, à venir', () {
      expect(nominationAVenir({'debute_le': '2027-01-01'}, maintenant: DateTime(2026, 11, 11)), isTrue);
    });

    test('début passé ou aujourd’hui, active', () {
      expect(nominationAVenir({'debute_le': '2026-01-01'}, maintenant: DateTime(2026, 11, 11)), isFalse);
      expect(nominationAVenir({'debute_le': '2026-11-11'}, maintenant: DateTime(2026, 11, 11)), isFalse);
    });

    test('début vide ou illisible, active', () {
      expect(nominationAVenir({'debute_le': ''}, maintenant: DateTime(2026, 11, 11)), isFalse);
      expect(nominationAVenir({}, maintenant: DateTime(2026, 11, 11)), isFalse);
      expect(nominationAVenir({'debute_le': 'pas une date'}, maintenant: DateTime(2026, 11, 11)), isFalse);
    });
  });

  group('Carte 126 tranche 6, libellés des permissions', () {
    test('les 8 codes du catalogue', () {
      expect(nominationPermissionLabel('camp.lire'), 'Lire les activités');
      expect(nominationPermissionLabel('camp.inscriptions'), 'Gérer les inscriptions');
      expect(nominationPermissionLabel('finances.lire'), 'Lire les finances');
      expect(nominationPermissionLabel('finances.valider'), 'Valider un paiement');
      expect(nominationPermissionLabel('suivi.lire'), 'Lire le suivi éducatif');
      expect(nominationPermissionLabel('suivi.ecrire'), 'Écrire le suivi éducatif');
      expect(nominationPermissionLabel('rapports.lire'), 'Lire les rapports');
      expect(nominationPermissionLabel('membres.inscrire'), 'Enregistrer des membres');
    });

    test('code inconnu gardé tel quel', () {
      expect(nominationPermissionLabel('inconnu'), 'inconnu');
    });
  });

  group('Carte 126 tranche 6, portée et dates', () {
    test('portée structure ou activité', () {
      expect(nominationPorteeLabel({'portee': 'structure'}), 'Toute la structure');
      expect(nominationPorteeLabel({'portee': 'activite', 'evenement_nom': 'Camp Kairos'}), 'Camp Kairos');
      expect(nominationPorteeLabel({'portee': 'activite', 'evenement_nom': ''}), 'Activité');
    });

    test('dates, du au, depuis, jusqu’à, sans dates', () {
      expect(nominationDatesLabel({'debute_le': '2026-01-01', 'finit_le': '2026-12-31'}), 'Du 01/01/2026 au 31/12/2026');
      expect(nominationDatesLabel({'debute_le': '2026-01-01', 'finit_le': ''}), 'Depuis le 01/01/2026');
      expect(nominationDatesLabel({'debute_le': '', 'finit_le': '2026-12-31'}), 'Jusqu’au 31/12/2026');
      expect(nominationDatesLabel({}), 'Sans dates');
    });
  });
}
