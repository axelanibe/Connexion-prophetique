// Tests des nominations et bureaux, 21 nov. 2026 : portée
// établissement, statut d'une nomination. Fonctions pures seules,
// sans serveur ni base.
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/app_models.dart';

void main() {
  group('Nominations et bureaux, libellé de portée avec établissement', () {
    test('établissement nommé', () {
      expect(nominationPorteeLabel({'portee': 'etablissement', 'etablissement_nom': 'ISPAM'}), 'ISPAM');
    });

    test('établissement sans nom, libellé générique', () {
      expect(nominationPorteeLabel({'portee': 'etablissement', 'etablissement_nom': ''}), 'Établissement');
      expect(nominationPorteeLabel({'portee': 'etablissement'}), 'Établissement');
    });

    test('structure et activité inchangées', () {
      expect(nominationPorteeLabel({'portee': 'structure'}), 'Toute la structure');
      expect(nominationPorteeLabel({'portee': 'activite', 'evenement_nom': 'Camp Kairos'}), 'Camp Kairos');
      expect(nominationPorteeLabel({'portee': 'activite', 'evenement_nom': ''}), 'Activité');
    });
  });

  group('Nominations et bureaux, statut', () {
    test('révoquée, même avec des dates actives', () {
      expect(nominationStatut({'revoque': true, 'debute_le': '2026-01-01', 'finit_le': '2027-01-01'}, maintenant: DateTime(2026, 11, 21)), 'revoquee');
      expect(nominationStatutLabel({'revoque': true}, maintenant: DateTime(2026, 11, 21)), 'Révoquée');
    });

    test('expirée, fin hier', () {
      expect(nominationStatut({'debute_le': '2026-01-01', 'finit_le': '2026-11-20'}, maintenant: DateTime(2026, 11, 21)), 'expiree');
      expect(nominationStatutLabel({'debute_le': '2026-01-01', 'finit_le': '2026-11-20'}, maintenant: DateTime(2026, 11, 21)), 'Expirée');
    });

    test('fin aujourd’hui, encore active', () {
      expect(nominationStatut({'debute_le': '2026-01-01', 'finit_le': '2026-11-21'}, maintenant: DateTime(2026, 11, 21)), 'active');
    });

    test('à venir, début demain', () {
      expect(nominationStatut({'debute_le': '2026-11-22'}, maintenant: DateTime(2026, 11, 21)), 'a_venir');
      expect(nominationStatutLabel({'debute_le': '2026-11-22'}, maintenant: DateTime(2026, 11, 21)), 'À venir');
    });

    test('début aujourd’hui, active', () {
      expect(nominationStatut({'debute_le': '2026-11-21'}, maintenant: DateTime(2026, 11, 21)), 'active');
      expect(nominationStatutLabel({'debute_le': '2026-11-21'}, maintenant: DateTime(2026, 11, 21)), 'Active');
    });

    test('sans dates, active', () {
      expect(nominationStatut({}, maintenant: DateTime(2026, 11, 21)), 'active');
    });
  });
}
