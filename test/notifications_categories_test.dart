// Catégories de notifications, carte 1, 21 nov. 2026 : le
// client envoie 'nouveau_message', le nom déjà émis par le
// serveur, jamais l'ancien 'messagerie', et les réunions en
// ligne et la clôture d'un signalement ont leur interrupteur.
// Sans réglage enregistré, tout est activé par défaut, donc
// enabledCategories contient les trois. Lancer :
//   flutter test test/notifications_categories_test.dart
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/notif_settings.dart';

void main() {
  group('Catégories envoyées avec le jeton', () {
    test('nouveau_message est envoyé, jamais messagerie', () {
      final categories = NotifSettings().enabledCategories();
      expect(categories, contains('nouveau_message'));
      expect(categories, isNot(contains('messagerie')));
    });

    test('nouvelle_reunion et signalement_cloture sont envoyées', () {
      final categories = NotifSettings().enabledCategories();
      expect(categories, contains('nouvelle_reunion'));
      expect(categories, contains('signalement_cloture'));
    });

    test('le libellé Messages ne change pas', () {
      expect(NotifSettings().label('nouveau_message'), 'Messages');
    });
  });
}
