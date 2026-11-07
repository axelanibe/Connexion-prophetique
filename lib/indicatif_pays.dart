// Indicatif téléphonique automatique, carte 86, 7 nov. 2026.
// Demande d'Axel : « Au moment de mettre son numéro le Canada
// n'affiche par pour l'indicateur normalement le positionnement
// du pays devrait être automatique ».
// Cause : _ProfilePageState gardait un indicatif figé à '+225',
// Côte d'Ivoire, à l'inscription comme à la connexion. Un membre
// au Canada devait descendre toute la liste des indicatifs pour
// trouver +1, regroupé sous « États-Unis et Canada ».
//
// Détection, sans GPS, sans pays deviné par le serveur, comme
// les cartes 38 et 64 : on lit seulement ce que l'appareil
// expose déjà, sa langue avec son pays (par exemple fr_CA,
// en_CA, fr_CI) et son fuseau horaire (décalage en minutes et
// nom, par exemple EST, UTC-05:00). Rien n'est envoyé au
// serveur, rien n'est stocké : l'indicatif n'est qu'une valeur
// initiale du menu déroulant, que le membre peut toujours
// changer à la main, comme avant.
//
// Priorité, dans l'ordre :
// 1. Le pays de la langue de l'appareil, quand il est connu :
//    CA donne +1, CI donne +225, FR donne +33, et ainsi de
//    suite pour les 13 pays de résidence de la carte 64.
// 2. Le fuseau nord-américain, quand la langue n'a pas de
//    pays : un décalage de UTC-4 à UTC-10, ou un nom EST, EDT,
//    CST, CDT, MST, MDT, PST, PDT, donne +1, le seul indicatif
//    partagé par tout ce fuseau dans la liste. UTC-4, c'est
//    Toronto en été, heure d'été, UTC-5 en hiver.
// 3. Repli, +225, l'indicatif en place avant cette carte, pays
//    de la structure. Un fuseau seul ne suffit pas à trancher
//    entre les pays qui le partagent : UTC+0, c'est à la fois
//    la Côte d'Ivoire, le Sénégal, le Burkina Faso, le Mali,
//    le Togo et la Guinée, UTC+1, c'est à la fois la France,
//    la Belgique, la Suisse, le Bénin et le Cameroun. Dans ce
//    cas, on ne devine pas, on garde le repli, et le membre
//    choisit son indicatif dans la liste, comme avant.
//
// Le pays de résidence, carte 64, n'est PAS prérempli par
// cette carte : il reste à choisir par le membre, jamais
// deviné, comme décidé le 6 nov. 2026. Seul l'indicatif du
// numéro est détecté, jamais le pays de résidence.
// Les numéros déjà enregistrés ne changent pas : la détection
// ne sert qu'à la valeur initiale du menu, à l'ouverture du
// formulaire, jamais à réécrire un numéro existant.
import 'package:flutter/widgets.dart';

/// Indicatif par code pays ISO 3166 alpha-2, en majuscules.
/// Les 13 pays de résidence de la carte 64 d'abord, puis les
/// deux autres pays de la liste des indicatifs dont le code est
/// sans ambiguïté : États-Unis, +1 comme le Canada, et
/// Royaume-Uni, +44. Aucun indicatif n'est inventé : chaque
/// valeur est celle de la liste countryCodes() de lib/main.dart.
const Map<String, String> _indicatifParCodePays = {
  'CI': '+225', // Côte d'Ivoire
  'FR': '+33', // France
  'BE': '+32', // Belgique
  'CA': '+1', // Canada
  'SN': '+221', // Sénégal
  'CM': '+237', // Cameroun
  'BF': '+226', // Burkina Faso
  'ML': '+223', // Mali
  'TG': '+228', // Togo
  'BJ': '+229', // Bénin
  'GN': '+224', // Guinée
  'CH': '+41', // Suisse
  'US': '+1', // États-Unis, même indicatif que le Canada
  'GB': '+44', // Royaume-Uni
};

/// Indicatif par pays de résidence, noms exacts de la liste
/// kPaysResidence de lib/app_models.dart, carte 64. 'Autre
/// pays' n'a pas d'indicatif : il n'apparaît pas ici.
const Map<String, String> indicatifParPaysResidence = {
  'Côte d’Ivoire': '+225',
  'France': '+33',
  'Belgique': '+32',
  'Canada': '+1',
  'Sénégal': '+221',
  'Cameroun': '+237',
  'Burkina Faso': '+226',
  'Mali': '+223',
  'Togo': '+228',
  'Bénin': '+229',
  'Guinée': '+224',
  'Suisse': '+41',
};

/// Noms de fuseau nord-américains, hiver comme été : un
/// appareil dans ce fuseau est au Canada ou aux États-Unis,
/// donc +1 dans les deux cas.
const Set<String> _fuseauxNordAmericains = {
  'EST', 'EDT', 'CST', 'CDT', 'MST', 'MDT', 'PST', 'PDT', 'AKST', 'AKDT', 'HST', 'HDT',
};

/// Indicatif détecté, fonction pure, testable sans appareil :
/// codePays, par exemple 'CA', langue non utilisée ici, le
/// pays seul tranche ; decalageMinutes, décalage courant de
/// l'appareil en minutes par rapport à UTC, par exemple -300
/// à Toronto en hiver ; nomFuseau, par exemple 'EST'.
/// Repli '+225' quand rien ne permet de trancher.
String detecterIndicatif({String? codePays, int? decalageMinutes, String? nomFuseau}) {
  final code = (codePays ?? '').trim().toUpperCase();
  if (code.isNotEmpty) {
    final indicatif = _indicatifParCodePays[code];
    if (indicatif != null) return indicatif;
    // Un pays connu hors des 13, par exemple DE ou ES, n'a
    // pas d'entrée ici : on ne devine pas son indicatif à
    // partir du fuseau, on garde le repli, et le membre
    // choisit dans la liste, comme avant.
    return '+225';
  }
  final nom = (nomFuseau ?? '').trim().toUpperCase();
  if (_fuseauxNordAmericains.contains(nom)) return '+1';
  if (decalageMinutes != null && decalageMinutes >= -600 && decalageMinutes <= -240) return '+1';
  return '+225';
}

/// Indicatif détecté depuis l'appareil qui affiche : langue
/// avec pays, fuseau courant, sans GPS, sans envoi serveur.
String indicatifDetecteAppareil() {
  final locale = WidgetsBinding.instance.platformDispatcher.locale;
  final maintenant = DateTime.now();
  return detecterIndicatif(
    codePays: locale.countryCode,
    decalageMinutes: maintenant.timeZoneOffset.inMinutes,
    nomFuseau: maintenant.timeZoneName,
  );
}
