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
  // Carte 87, 7 nov. 2026 : France non détectée, Canada absent.
  // La carte 86 ne lisait que la première langue : un « fr »
  // sans pays, fuseau UTC+1 partagé, retombait sur +225.
  test('France, deuxième langue fr-FR après un fr sans pays, donne +33', () {
    final d = detecterIndicatifDetaille(codesPaysLangues: ['', 'FR']);
    expect(d.indicatif, '+33');
    expect(d.codePays, 'FR');
  });
  test('France, fuseau IANA Europe/Paris sans pays de langue, donne +33', () {
    final d = detecterIndicatifDetaille(
      codesPaysLangues: [''],
      fuseauIana: 'Europe/Paris',
      decalageMinutes: 60,
      nomFuseau: 'CET',
    );
    expect(d.indicatif, '+33');
    expect(d.codePays, 'FR');
  });
  test('Canada, fuseau IANA America/Toronto sans pays de langue, donne +1', () {
    final d = detecterIndicatifDetaille(fuseauIana: 'America/Toronto');
    expect(d.indicatif, '+1');
    expect(d.codePays, 'CA');
  });
  test('Canada, deuxième langue en-CA après un en sans pays, donne +1', () {
    final d = detecterIndicatifDetaille(codesPaysLangues: ['', 'CA']);
    expect(d.indicatif, '+1');
    expect(d.codePays, 'CA');
  });
  test('États-Unis, fuseau IANA America/New_York, donne +1 avec le code US', () {
    final d = detecterIndicatifDetaille(fuseauIana: 'America/New_York');
    expect(d.indicatif, '+1');
    expect(d.codePays, 'US');
  });
  test('Royaume-Uni, fuseau IANA Europe/London, donne +44', () {
    final d = detecterIndicatifDetaille(fuseauIana: 'Europe/London');
    expect(d.indicatif, '+44');
    expect(d.codePays, 'GB');
  });
  test('Côte d’Ivoire, fuseau IANA Africa/Abidjan, donne +225', () {
    final d = detecterIndicatifDetaille(fuseauIana: 'Africa/Abidjan');
    expect(d.indicatif, '+225');
    expect(d.codePays, 'CI');
  });
  test('langue fr sans pays et fuseau CET partagé, jamais deviné, repli +225', () {
    final d = detecterIndicatifDetaille(
      codesPaysLangues: [''],
      decalageMinutes: 60,
      nomFuseau: 'CET',
    );
    expect(d.indicatif, '+225');
    expect(d.codePays, isNull);
  });
  test('fuseau IANA inconnu, jamais deviné, repli +225', () {
    final d = detecterIndicatifDetaille(fuseauIana: 'Europe/Berlin');
    expect(d.indicatif, '+225');
    expect(d.codePays, isNull);
  });
  test('la langue tranche avant le fuseau IANA', () {
    final d = detecterIndicatifDetaille(
      codesPaysLangues: ['CA'],
      fuseauIana: 'Europe/Paris',
    );
    expect(d.indicatif, '+1');
    expect(d.codePays, 'CA');
  });
}
