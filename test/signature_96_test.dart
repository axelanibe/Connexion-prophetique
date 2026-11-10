// Carte 96, 8 nov. 2026 : signature côté serveur, lever la
// limite de la carte 95. Les transformations sont pures, elles
// se testent sans téléphone et sans serveur : la signature du
// serveur arrive en data URL, la copie locale est en base64 nu,
// et la pose dans l'attestation reste la même que la carte 95.
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/signature_admin.dart';

const _base64 = 'iVBORw0KGgo=';
const _dataUrl = 'data:image/png;base64,iVBORw0KGgo=';

void main() {
  test('la data URL du serveur devient du base64 nu pour la copie locale', () {
    expect(base64DepuisDataUrl(_dataUrl), _base64);
    expect(base64DepuisDataUrl(_base64), _base64);
    expect(base64DepuisDataUrl('  $_dataUrl  '), _base64);
  });

  test('la data URL est reconstruite pour les documents, sans double préfixe', () {
    expect(signatureDataUrl(_base64), _dataUrl);
    expect(signatureDataUrl(base64DepuisDataUrl(_dataUrl)), _dataUrl);
  });
}
