// Tests de la carte 101, 8 nov. 2026 : numéro Côte d'Ivoire avec
// le 0 et nom complet en deux mots. Fonctions pures de lib/main.dart,
// sans serveur, sans base.
import 'package:flutter_test/flutter_test.dart';
import 'package:connexion_prophetique/main.dart';

void main() {
  group('Carte 101, nom en deux mots', () {
    test('un seul mot est refusé', () {
      expect(nomCompletDeuxMots('Axel'), isFalse);
      expect(nomCompletDeuxMots('  Axel  '), isFalse);
      expect(nomCompletDeuxMots(''), isFalse);
    });

    test('prénom et nom passent', () {
      expect(nomCompletDeuxMots('Axel Anibe'), isTrue);
      expect(nomCompletDeuxMots('  Axel   Anibe  '), isTrue);
      expect(nomCompletDeuxMots('Marie Grace Emmanuel Aka'), isTrue);
    });
  });

  group('Carte 101, numéro Côte d’Ivoire avec le 0', () {
    test('le 0 après +225 est conservé à l’inscription', () {
      expect(normalizePhone('+225 07 49 36 94 33', '+225'), '+2250749369433');
      expect(normalizePhone('07 49 36 94 33', '+225'), '+2250749369433');
    });

    test('la connexion accepte les deux formes', () {
      expect(normalizePhone('+225749369433', '+225'), '+225749369433');
      expect(normalizePhone('+2250749369433', '+225'), '+2250749369433');
    });
  });
}
