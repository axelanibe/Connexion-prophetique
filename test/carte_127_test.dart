// Tests de la carte 127, 10 nov. 2026 : pays de résidence du
// membre. Fonction pure seule, sans serveur ni base.
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/app_models.dart';

void main() {
  group('Carte 127, pays renvoyé par le serveur', () {
    test('majuscules ramenées à l’entrée canonique', () {
      expect(paysResidenceCanonique('CÔTE D’IVOIRE'), 'Côte d’Ivoire');
      expect(paysResidenceCanonique('FRANCE'), 'France');
      expect(paysResidenceCanonique('AUTRE PAYS'), 'Autre pays');
    });

    test('casse mixte et espaces', () {
      expect(paysResidenceCanonique('france'), 'France');
      expect(paysResidenceCanonique('  canada  '), 'Canada');
      expect(paysResidenceCanonique('Côte d’Ivoire'), 'Côte d’Ivoire');
    });

    test('vide et hors liste gardés tels quels', () {
      expect(paysResidenceCanonique(''), '');
      expect(paysResidenceCanonique('Japon'), 'Japon');
    });
  });
}
