// Tests de la détection d'indicatif, carte 86, 7 nov. 2026.
// La fonction est pure : aucun appareil, aucun GPS, aucune
// langue réelle n'est nécessaire pour la vérifier.
import 'package:flutter_test/flutter_test.dart';
import 'package:connexion_prophetique/indicatif_pays.dart';

void main() {
  test('Canada, langue fr_CA ou en_CA, donne +1', () {
    expect(detecterIndicatif(codePays: 'CA'), '+1');
    expect(detecterIndicatif(codePays: 'ca'), '+1');
  });
  test('les 13 pays de résidence donnent leur indicatif', () {
    expect(detecterIndicatif(codePays: 'CI'), '+225');
    expect(detecterIndicatif(codePays: 'FR'), '+33');
    expect(detecterIndicatif(codePays: 'BE'), '+32');
    expect(detecterIndicatif(codePays: 'SN'), '+221');
    expect(detecterIndicatif(codePays: 'CM'), '+237');
    expect(detecterIndicatif(codePays: 'BF'), '+226');
    expect(detecterIndicatif(codePays: 'ML'), '+223');
    expect(detecterIndicatif(codePays: 'TG'), '+228');
    expect(detecterIndicatif(codePays: 'BJ'), '+229');
    expect(detecterIndicatif(codePays: 'GN'), '+224');
    expect(detecterIndicatif(codePays: 'CH'), '+41');
  });
  test('États-Unis et Royaume-Uni, hors des 13, donnent leur indicatif', () {
    expect(detecterIndicatif(codePays: 'US'), '+1');
    expect(detecterIndicatif(codePays: 'GB'), '+44');
  });
  test('fuseau nord-américain sans pays de langue donne +1', () {
    expect(detecterIndicatif(decalageMinutes: -300, nomFuseau: 'EST'), '+1');
    expect(detecterIndicatif(decalageMinutes: -480, nomFuseau: 'PST'), '+1');
    expect(detecterIndicatif(decalageMinutes: -240), '+1');
  });
  test('sans pays ni fuseau nord-américain, repli +225, jamais deviné', () {
    expect(detecterIndicatif(), '+225');
    expect(detecterIndicatif(decalageMinutes: 0, nomFuseau: 'GMT'), '+225');
    expect(detecterIndicatif(decalageMinutes: 60, nomFuseau: 'CET'), '+225');
    expect(detecterIndicatif(codePays: 'DE'), '+225');
  });
  test('pays de résidence vers indicatif, noms exacts de la carte 64', () {
    expect(indicatifParPaysResidence['Canada'], '+1');
    expect(indicatifParPaysResidence['Côte d’Ivoire'], '+225');
    expect(indicatifParPaysResidence['France'], '+33');
    expect(indicatifParPaysResidence.containsKey('Autre pays'), isFalse);
  });
}
