// Tests de la tranche T21, re-branchement des appels, 27 nov. 2026.
// Aides pures du relais seulement : le vrai écran WebRTC et la
// sonnerie ne se testent pas ici, ils se vérifient sur téléphone.
// Les données ci-dessous sont des données de test, jamais les
// vraies données d'Axel.
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/nouveau/relais_appels.dart';

void main() {
  test('T21 : delaiReessai429, Retry-After d\'abord, plafonné à 65 s', () {
    expect(delaiReessai429('trop de requêtes', retryAfter: 12), 12);
    expect(delaiReessai429('trop de requêtes', retryAfter: 0), 1);
    expect(delaiReessai429('trop de requêtes', retryAfter: 100), 65);
    expect(delaiReessai429('retry in 12 seconds'), 12);
    expect(delaiReessai429('retry in 200 seconds'), 65);
    expect(delaiReessai429('trop de requêtes'), 30);
    expect(delaiReessai429('retry in bientôt'), 30);
  });

  test('T21 : PauseSondage, libre puis en pause puis expirée', () {
    final pause = PauseSondage();
    expect(pause.enPause, isFalse);
    pause.mettreEnPause(60);
    expect(pause.enPause, isTrue);
    pause.mettreEnPause(0);
    expect(pause.enPause, isFalse);
  });

  test('T21 : GardeAppelEntrant, un seul écran par appel et par minute',
      () {
    final garde = GardeAppelEntrant();
    final t0 = DateTime(2026, 11, 27, 0, 30);
    expect(garde.accepter('a1', maintenant: t0), isTrue);
    expect(garde.accepter('a1', maintenant: t0.add(const Duration(seconds: 10))),
        isFalse);
    expect(garde.accepter('a2', maintenant: t0.add(const Duration(seconds: 10))),
        isTrue);
    expect(garde.accepter('a2', maintenant: t0.add(const Duration(seconds: 70))),
        isTrue);
  });

  test('T21 : donneesAppelEntrantDepuisLigne, ligne serveur vers écran',
      () {
    expect(
      donneesAppelEntrantDepuisLigne({
        'id': 'ap-1',
        'appelant_nom': 'Test Appelant',
        'type': 'video',
        'conversation_id': 'c-1',
      }),
      {
        'appel_id': 'ap-1',
        'appelant_nom': 'Test Appelant',
        'type_appel': 'video',
        'conversation_id': 'c-1',
      },
    );
    expect(
      donneesAppelEntrantDepuisLigne({'id': 'ap-2'}),
      {
        'appel_id': 'ap-2',
        'appelant_nom': '',
        'type_appel': 'audio',
        'conversation_id': '',
      },
    );
  });
}
