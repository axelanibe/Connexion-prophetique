// Tests de la carte 129, 11 nov. 2026 : fonction et établissement
// affilié modifiables dans Modifier mes infos, côté membre.
// Vérifications statiques du code de la page, sans serveur.
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';

void main() {
  group('Carte 129, NouvelleModifierInfosPage', () {
    late String page;
    late String api;

    setUpAll(() {
      page = File('lib/carte_nouvelle.dart').readAsStringSync();
      api = File('lib/api.dart').readAsStringSync();
    });

    test('les deux menus sont présents, même style sombre que le pays', () {
      expect(page, contains("Text(tr('Fonction')"));
      expect(page, contains("Text(tr('Établissement')"));
      expect(page, contains('dropdownColor: _cnNuit2'));
      expect(page, contains('La structure elle-même est un établissement, le bureau national'));
    });

    test('la fonction vient de la liste fermée, avec la valeur actuelle gardée', () {
      expect(page, contains('for (final f in kFonctions) DropdownMenuItem(value: f,'));
      expect(page, contains('if (_fonction != null && _fonction!.isNotEmpty && !kFonctions.contains(_fonction))'));
    });

    test('l’établissement vient du serveur, avec le choix Autre', () {
      expect(page, contains('for (final e in app.etabs) DropdownMenuItem(value: e.name,'));
      expect(page, contains("DropdownMenuItem(value: 'Autre', child: Text(tr('Autre')"));
    });

    test('l’envoi au serveur ne bloque jamais la modification', () {
      expect(api, contains("await _post('/moi/etablissement', {'etablissement': etablissement})"));
      expect(page, contains('api.updateFonction(nouvelleFonction)'));
      expect(page, contains('api.updateMonEtablissement('));
      expect(page, contains('Établissement gardé sur cet appareil seulement'));
      expect(page, contains('Fonction gardée sur cet appareil seulement'));
    });
  });
}
