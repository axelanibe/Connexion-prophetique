// Tests des réactions « Amen », 21 nov. 2026, tranche 6 de
// l'audit du 17 nov. : identifiants de cible, compte depuis la
// réponse du serveur, bouton avec compteur et bascule. Client
// simulé, sans serveur ni réseau.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/amens.dart';
import 'package:connexion_prophetique/api.dart';

class _ClientFaux extends ApiClient {
  var nombre = 0;
  var dit = false;
  var appelsCompte = 0;

  @override
  Future<Map<String, dynamic>> fetchCompteAmen(String cibleType, String cibleId) async {
    appelsCompte++;
    return {'cible_type': cibleType, 'cible_id': cibleId, 'nombre': nombre, 'a_dit_amen': dit};
  }

  @override
  Future<Map<String, dynamic>> direAmen(String cibleType, String cibleId) async {
    dit = true;
    nombre++;
    return {'amen': {'cible_type': cibleType, 'cible_id': cibleId, 'nombre': nombre, 'a_dit_amen': true}};
  }

  @override
  Future<Map<String, dynamic>> retirerAmen(String cibleType, String cibleId) async {
    dit = false;
    nombre = nombre > 0 ? nombre - 1 : 0;
    return {'amen': {'cible_type': cibleType, 'cible_id': cibleId, 'nombre': nombre, 'a_dit_amen': false}};
  }
}

void main() {
  group('cibleIdMeditation', () {
    test('livre:chapitre:verset', () {
      expect(cibleIdMeditation(18, 23, 1), '18:23:1');
      expect(cibleIdMeditation(0, 1, 1), '0:1:1');
    });
  });

  group('CompteAmen.fromJson', () {
    test('nombre et mon Amen', () {
      final compte = CompteAmen.fromJson({'cible_type': 'méditation', 'cible_id': '18:23:1', 'nombre': 12, 'a_dit_amen': true});
      expect(compte.cibleType, 'méditation');
      expect(compte.cibleId, '18:23:1');
      expect(compte.nombre, 12);
      expect(compte.aDitAmen, isTrue);
    });

    test('nombre en texte, sans Amen', () {
      final compte = CompteAmen.fromJson({'cible_type': 'enseignement', 'cible_id': 'abc', 'nombre': '3', 'a_dit_amen': false});
      expect(compte.nombre, 3);
      expect(compte.aDitAmen, isFalse);
    });
  });

  group('comptesAmensDepuisReponse', () {
    test('liste des comptes, état vide sans liste', () {
      final comptes = comptesAmensDepuisReponse({
        'comptes': [
          {'cible_type': 'enseignement', 'cible_id': 'a', 'nombre': 2, 'a_dit_amen': false},
          {'cible_type': 'enseignement', 'cible_id': 'b', 'nombre': 0, 'a_dit_amen': true},
        ],
      });
      expect(comptes.length, 2);
      expect(comptes.first.cibleId, 'a');
      expect(comptesAmensDepuisReponse({}), isEmpty);
    });
  });

  group('AmenButton', () {
    testWidgets('charge son compte, dit Amen puis le retire', (tester) async {
      final client = _ClientFaux()..nombre = 4;
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(
          body: AmenButton(cibleType: 'méditation', cibleId: '18:23:1', client: client),
        ),
      ));
      await tester.pumpAndSettle();
      expect(find.text('Amen · 4'), findsOneWidget);
      expect(client.appelsCompte, 1);

      await tester.tap(find.text('Amen · 4'));
      await tester.pumpAndSettle();
      expect(find.text('Amen · 5'), findsOneWidget);
      expect(client.dit, isTrue);

      await tester.tap(find.text('Amen · 5'));
      await tester.pumpAndSettle();
      expect(find.text('Amen · 4'), findsOneWidget);
      expect(client.dit, isFalse);
    });

    testWidgets('compte initial sans appel réseau', (tester) async {
      final client = _ClientFaux();
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(
          body: AmenButton(
            cibleType: 'enseignement',
            cibleId: 'abc',
            client: client,
            initial: CompteAmen(cibleType: 'enseignement', cibleId: 'abc', nombre: 2, aDitAmen: true),
          ),
        ),
      ));
      await tester.pumpAndSettle();
      expect(find.text('Amen · 2'), findsOneWidget);
      expect(client.appelsCompte, 0);
    });
  });
}
