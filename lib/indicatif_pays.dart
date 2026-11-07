// Indicatif téléphonique automatique, cartes 86 et 87, 7 nov. 2026.
// Demande d'Axel, carte 86 : « Au moment de mettre son numéro le
// Canada n'affiche par pour l'indicateur normalement le
// positionnement du pays devrait être automatique ».
// Demande d'Axel, carte 87 : « La détection automatique ne
// détecte en France et le Canada est absent des indicatif ».
//
// Cause 1, carte 87, Canada absent : dans countryCodes(), +1
// était regroupé sous « États-Unis et Canada », sans jamais voir
// le mot Canada seul. Corrigé dans lib/main.dart : deux entrées
// propres, Canada +1 et États-Unis +1. Un menu déroulant exige
// une valeur unique par entrée, deux entrées +1 ne peuvent donc
// pas avoir l'indicatif pour valeur : les menus utilisent
// désormais l'index de l'entrée, et l'indicatif s'en déduit.
//
// Cause 2, carte 87, France non détectée, prouvée par le code :
// la carte 86 ne lisait que WidgetsBinding.instance
// .platformDispatcher.locale, c'est-à-dire la PREMIÈRE langue du
// navigateur ou du téléphone. Or le moteur web Flutter construit
// sa liste de langues depuis navigator.languages, et la première
// peut être un simple « fr », langue française sans pays, très
// courant quand la langue est réglée sur « Français » sans
// région : countryCode vaut alors null. Ensuite, le fuseau UTC+1
// est partagé par la France, la Belgique, la Suisse, le Bénin
// et le Cameroun : la carte 86, qui refusait de deviner entre
// ces pays, retombait sur +225. Un téléphone en France, langue
// « fr », fuseau UTC+1, affichait donc +225.
// La fonction pure de la carte 86, elle, était juste : fr_FR
// donnait bien +33 dans ses tests 6/6. Le défaut était la
// source lue, pas la règle.
//
// Correctif, carte 87, sans GPS, sans pays deviné par le
// serveur, comme les cartes 38 et 64 : on lit seulement ce que
// l'appareil expose déjà, et on ajoute deux sources que la
// carte 86 ne lisait pas.
// 1. Toutes les langues préférées, platformDispatcher.locales :
//    la première avec un pays connu tranche, même si la
//    première langue est un « fr » sans pays et qu'une suivante
//    est « fr-FR ». Sur le web, la liste vient de
//    navigator.languages, première « fr », suivante « fr-FR »
//    par exemple.
// 2. Le fuseau IANA de l'appareil, sur le web seulement :
//    Intl.DateTimeFormat().resolvedOptions().timeZone donne
//    « Europe/Paris », « America/Toronto », « Africa/Abidjan ».
//    Un fuseau IANA désigne une ville, donc un seul pays : ce
//    n'est pas deviner, Europe/Paris n'est qu'en France,
//    America/Toronto n'est qu'au Canada. Lu par
//    lib/indicatif_zone.dart, import conditionnel, rien sur
//    téléphone, où la langue porte déjà le pays.
// 3. Le fuseau nord-américain, nom ou décalage, donne +1,
//    comme avant, quand ni la langue ni le fuseau IANA ne
//    donnent de pays : le Canada et les États-Unis partagent
//    +1, il n'y a rien à trancher entre eux.
// 4. Repli +225, l'indicatif en place avant, pays de la
//    structure. Une langue sans pays et un fuseau partagé,
//    par exemple « fr » et CET, UTC+1, ne suffisent toujours
//    pas à trancher entre France, Belgique et Suisse : on ne
//    devine pas, on garde le repli, et le membre choisit son
//    indicatif dans la liste, comme avant.
//
// Priorité, dans l'ordre : pays d'une langue préférée, puis
// pays du fuseau IANA, puis fuseau nord-américain, puis repli.
// Rien n'est envoyé au serveur, rien n'est stocké : la
// détection ne sert qu'à la valeur initiale du menu, à
// l'ouverture du formulaire, que le membre peut toujours
// changer à la main, comme avant. Les numéros déjà enregistrés
// ne changent pas. Le pays de résidence, carte 64, n'est PAS
// prérempli : il reste à choisir par le membre, jamais deviné.
import 'package:flutter/widgets.dart';

import 'indicatif_zone.dart';

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

/// Pays par fuseau IANA, par exemple « Europe/Paris » donne
/// FR. Un fuseau IANA désigne une ville, donc un seul pays :
/// Europe/Paris n'est qu'en France, America/Toronto n'est
/// qu'au Canada, Africa/Abidjan n'est qu'en Côte d'Ivoire.
/// Seuls les pays de la liste des indicatifs y figurent, plus
/// les grandes villes du Canada et des États-Unis, qui
/// partagent +1. Un fuseau inconnu ne donne rien, jamais
/// deviné.
const Map<String, String> _paysParFuseauIana = {
  'Africa/Abidjan': 'CI',
  'Europe/Paris': 'FR',
  'Europe/Brussels': 'BE',
  'Europe/Bruxelles': 'BE',
  'Europe/Zurich': 'CH',
  'Europe/London': 'GB',
  'America/Toronto': 'CA',
  'America/Montreal': 'CA',
  'America/Vancouver': 'CA',
  'America/Edmonton': 'CA',
  'America/Winnipeg': 'CA',
  'America/Halifax': 'CA',
  'America/St_Johns': 'CA',
  'America/Regina': 'CA',
  'America/Ottawa': 'CA',
  'America/Quebec': 'CA',
  'America/New_York': 'US',
  'America/Chicago': 'US',
  'America/Denver': 'US',
  'America/Los_Angeles': 'US',
  'America/Detroit': 'US',
  'America/Phoenix': 'US',
  'America/Anchorage': 'US',
  'Pacific/Honolulu': 'US',
  'Africa/Dakar': 'SN',
  'Africa/Douala': 'CM',
  'Africa/Ouagadougou': 'BF',
  'Africa/Bamako': 'ML',
  'Africa/Lome': 'TG',
  'Africa/Porto-Novo': 'BJ',
  'Africa/Conakry': 'GN',
};

/// Noms de fuseau nord-américains, hiver comme été : un
/// appareil dans ce fuseau est au Canada ou aux États-Unis,
/// donc +1 dans les deux cas.
const Set<String> _fuseauxNordAmericains = {
  'EST', 'EDT', 'CST', 'CDT', 'MST', 'MDT', 'PST', 'PDT', 'AKST', 'AKDT', 'HST', 'HDT',
};

/// Résultat détaillé de la détection : l'indicatif à
/// afficher, et le code pays détecté quand il est connu,
/// null quand l'indicatif vient du fuseau nord-américain ou
/// du repli. Le code pays sert à mettre le pays détecté en
/// tête de la liste des indicatifs, carte 87.
typedef DetectionIndicatif = ({String indicatif, String? codePays});

/// Pays connu, dans la liste des indicatifs, parmi des codes
/// pays de langues préférées, dans l'ordre : le premier code
/// présent dans _indicatifParCodePays tranche. Un code vide
/// ou inconnu, par exemple DE ou ES, ne donne rien.
String? _paysParLangues(List<String>? codesPays) {
  if (codesPays == null) return null;
  for (final brut in codesPays) {
    final code = brut.trim().toUpperCase();
    if (code.isNotEmpty && _indicatifParCodePays.containsKey(code)) {
      return code;
    }
  }
  return null;
}

/// Pays du fuseau IANA, null quand le fuseau est absent ou
/// inconnu. Jamais deviné : un fuseau hors de la table ne
/// donne rien.
String? _paysDepuisFuseauIana(String? fuseauIana) {
  if (fuseauIana == null) return null;
  return _paysParFuseauIana[fuseauIana.trim()];
}

/// Détection détaillée, fonction pure, testable sans
/// appareil : codesPaysLangues, codes pays des langues
/// préférées, dans l'ordre, par exemple ['FR'] ou ['', 'FR']
/// quand la première langue est un « fr » sans pays ;
/// fuseauIana, par exemple 'Europe/Paris' ; decalageMinutes,
/// décalage courant en minutes par rapport à UTC, par exemple
/// -300 à Toronto en hiver, +60 à Paris en hiver ;
/// nomFuseau, par exemple 'EST' ou 'CET'.
/// Repli '+225', codePays null, quand rien ne permet de
/// trancher.
DetectionIndicatif detecterIndicatifDetaille({
  List<String>? codesPaysLangues,
  String? fuseauIana,
  int? decalageMinutes,
  String? nomFuseau,
}) {
  final parLangue = _paysParLangues(codesPaysLangues);
  if (parLangue != null) {
    return (indicatif: _indicatifParCodePays[parLangue]!, codePays: parLangue);
  }
  final parFuseau = _paysDepuisFuseauIana(fuseauIana);
  if (parFuseau != null) {
    return (indicatif: _indicatifParCodePays[parFuseau]!, codePays: parFuseau);
  }
  final nom = (nomFuseau ?? '').trim().toUpperCase();
  if (_fuseauxNordAmericains.contains(nom)) {
    return (indicatif: '+1', codePays: null);
  }
  if (decalageMinutes != null && decalageMinutes >= -600 && decalageMinutes <= -240) {
    return (indicatif: '+1', codePays: null);
  }
  return (indicatif: '+225', codePays: null);
}

/// Indicatif détecté, fonction pure, testable sans appareil :
/// codePays, par exemple 'CA', langue non utilisée ici, le
/// pays seul tranche ; decalageMinutes, décalage courant de
/// l'appareil en minutes par rapport à UTC, par exemple -300
/// à Toronto en hiver ; nomFuseau, par exemple 'EST'.
/// Repli '+225' quand rien ne permet de trancher. Gardée
/// pour les anciens tests, la détection détaillée fait foi.
String detecterIndicatif({String? codePays, int? decalageMinutes, String? nomFuseau}) {
  return detecterIndicatifDetaille(
    codesPaysLangues: codePays == null ? null : [codePays],
    decalageMinutes: decalageMinutes,
    nomFuseau: nomFuseau,
  ).indicatif;
}

/// Détection depuis l'appareil qui affiche : toutes les
/// langues préférées avec leur pays, fuseau IANA sur le web,
/// fuseau courant, sans GPS, sans envoi serveur.
DetectionIndicatif indicatifDetecteAppareil() {
  final locales = WidgetsBinding.instance.platformDispatcher.locales;
  final maintenant = DateTime.now();
  return detecterIndicatifDetaille(
    codesPaysLangues: [for (final l in locales) l.countryCode ?? ''],
    fuseauIana: fuseauIanaAppareil(),
    decalageMinutes: maintenant.timeZoneOffset.inMinutes,
    nomFuseau: maintenant.timeZoneName,
  );
}
