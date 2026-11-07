import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/visite_guidee.dart';

void main() {
  test('visite guidee membre : 13 etapes, de l accueil aux fonctions cachees', () {
    final etapes = etapesVisiteGuidee(admin: false);
    expect(etapes.length, 13);
    expect(etapes.first.tab, 0);
    expect(etapes.first.titre, 'Accueil');
    expect(etapes.last.titre, 'Fonctions cachées');
    expect(etapes.any((e) => e.titre == 'Comptabilité'), isFalse);
    for (final e in etapes) {
      expect(e.titre.isNotEmpty, isTrue);
      expect(e.texte.isNotEmpty, isTrue);
      expect(e.tab >= 0 && e.tab <= 5, isTrue);
    }
  });

  test('visite guidee admin : 14 etapes, comptabilite avant les fonctions cachees', () {
    final etapes = etapesVisiteGuidee(admin: true);
    expect(etapes.length, 14);
    expect(etapes[etapes.length - 2].titre, 'Comptabilité');
    expect(etapes[etapes.length - 2].tab, 3);
    expect(etapes.last.titre, 'Fonctions cachées');
  });
}
