// Carte 93, 8 nov. 2026 : devenir partenaire. L'entrée « Devenir
// partenaire » dans Plus ne se montre que pour un membre connecté
// qui n'a pas déjà la fonction Plateforme, jamais pour un
// visiteur, jamais pour un partenaire, jamais dans le Profil.
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/plateforme.dart';

void main() {
  test('visible pour un membre connecté, fonction ordinaire', () {
    expect(devenirPartenaireVisible(connecte: true, fonction: 'Membre'), isTrue);
    expect(devenirPartenaireVisible(connecte: true, fonction: ''), isTrue);
    expect(devenirPartenaireVisible(connecte: true, fonction: 'Président'), isTrue);
  });

  test('cachée pour un visiteur non connecté', () {
    expect(devenirPartenaireVisible(connecte: false, fonction: 'Membre'), isFalse);
    expect(devenirPartenaireVisible(connecte: false, fonction: ''), isFalse);
  });

  test('cachée pour un membre déjà Plateforme', () {
    expect(devenirPartenaireVisible(connecte: true, fonction: 'Plateforme'), isFalse);
  });
}
