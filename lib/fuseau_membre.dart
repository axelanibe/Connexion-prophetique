// Fuseau horaire par membre, tranche du 4 nov. 2026, décidée par Axel.
// Règle : chaque personne qui se connecte est alignée sur le fuseau
// de son pays de connexion, pas sur un fuseau fixe Toronto ou Abidjan.
// Aucune position GPS n'est jamais envoyée, seulement le fuseau de
// l'appareil, sous forme d'un nom et d'un décalage en minutes.
//
// Limite honnête : Flutter ne fournit pas de nom IANA fiable sur tous
// les appareils (timeZoneName donne souvent un sigle comme EST ou
// un décalage). Le serveur ne reçoit donc pas un nom IANA à
// convertir avec une base de fuseaux, mais le décalage courant en
// minutes, mis à jour à chaque connexion. Ce décalage suffit pour
// le jour local au moment de l'envoi, et il est rafraîchi dès que
// le membre se reconnecte après un changement de fuseau, y compris
// un passage à l'heure d'été. Aucun pays, aucun fuseau n'est jamais
// inventé pour un membre sans appareil connecté : le repli est le
// fuseau de l'appareil qui affiche, ou UTC côté serveur.

/// Décalage courant de l'appareil, en minutes par rapport à UTC.
/// Exemple : Abidjan 0, Toronto -300 en hiver, -240 en été.
int fuseauDecalageMinutes() {
  final now = DateTime.now();
  return now.timeZoneOffset.inMinutes;
}

/// Libellé envoyé au serveur, sans GPS, sans pays deviné.
/// Exemple : "EST (UTC-05:00)", "GMT (UTC+00:00)".
String fuseauAppareilLabel() {
  final now = DateTime.now();
  final decalage = now.timeZoneOffset;
  final signe = decalage.isNegative ? '-' : '+';
  final heures = decalage.abs().inHours.toString().padLeft(2, '0');
  final minutes = (decalage.abs().inMinutes % 60).toString().padLeft(2, '0');
  return '${now.timeZoneName} (UTC$signe$heures:$minutes)';
}

/// Date locale (année, mois, jour) d'un instant UTC, selon le
/// décalage stocké pour le membre. Le décalage nul donne UTC.
DateTime dateLocaleDepuisUtc(DateTime instantUtc, int decalageMinutes) {
  final local = instantUtc.toUtc().add(Duration(minutes: decalageMinutes));
  return DateTime(local.year, local.month, local.day);
}

/// Jour local, au format AAAA-MM-JJ, d'un instant UTC.
String jourLocalDepuisUtc(DateTime instantUtc, int decalageMinutes) {
  final d = dateLocaleDepuisUtc(instantUtc, decalageMinutes);
  return '${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';
}

/// Vrai si la naissance tombe le jour local donné, avec la règle
/// du 29 février fêté le 28 février les années non bissextiles,
/// même règle que la carte et le courriel d'anniversaire.
bool estAnniversaireJourLocal(DateTime naissance, DateTime jourLocal) {
  var jour = naissance.day;
  if (naissance.month == 2 && jour == 29) {
    final annee = jourLocal.year;
    final bissextile = (annee % 4 == 0 && annee % 100 != 0) || annee % 400 == 0;
    if (!bissextile) jour = 28;
  }
  return naissance.month == jourLocal.month && jour == jourLocal.day;
}

/// Jour local de l'appareil, qui est déjà le fuseau de connexion :
/// DateTime.now() est local en Flutter, donc la carte
/// d'anniversaire, le verset du jour, le compte à rebours et les
/// dates de camp affichées depuis cet instant sont déjà alignés
/// sur l'appareil, sans conversion supplémentaire. Cette fonction
/// le rend explicite, au lieu de laisser un DateTime.now() nu.
DateTime jourLocalAppareil() {
  final now = DateTime.now();
  return DateTime(now.year, now.month, now.day);
}
