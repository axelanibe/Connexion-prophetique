// Carte et courriel d'anniversaire, tranche 5, 4 nov. 2026.
//
// Règles décidées par Axel le 3 nov. 2026, appliquées ici sans rien
// inventer :
// - la carte apparaît dans l'accueil le jour de l'anniversaire
//   seulement, la carte habituelle (verset du jour) se retire ce
//   jour-là et revient le lendemain ;
// - le texte du message est celui fourni par Axel, modifié le
//   4 nov. 2026, avec un seul remplacement : le prénom du membre ;
// - le verset est choisi par membre inscrit et change chaque année,
//   toujours lu dans la Bible déjà dans l'application (Louis Segond
//   en français, King James en anglais), jamais recopié ni inventé
//   ici ;
// - aucun âge, aucune année de naissance n'est jamais affiché ;
// - la date d'intégration est la date d'inscription du membre
//   (Member.since, inscrit_le côté serveur), sauf autre date fournie
//   un jour par la structure, jamais inventée.
//
// Choix déterministe du verset, sans invention :
// la liste utilisée est kDailyVerses, les 26 versets déjà vérifiés
// présents dans les deux langues. L'indice vaut
// (hachage stable du matricule + année) modulo 26. Le hachage est
// FNV-1a 32 bits sur les octets UTF-8 du matricule, identique côté
// serveur (server-production/src/anniversaires.js), pour que la carte
// et le courriel citent le même verset la même année. Comme l'année
// avance de 1, l'indice avance de 1 modulo 26 : le verset change donc
// à chaque année, garanti, pour chaque membre. Deux membres peuvent
// partager un même verset une année donnée, ce n'est pas un tirage
// unique, c'est un choix stable par membre et par année.
//
// Limite honnête, lue dans la décision : le texte du message fourni
// par Axel est unique. Ce qui change chaque année, de façon
// vérifiable, c'est le verset dédié inséré dans ce texte, donc le
// message complet change chaque année. Aucune variante de prose n'a
// été inventée : si la structure veut un texte entièrement différent
// chaque année, elle doit fournir ces textes, ils ne sont pas ici.
import 'dart:convert';

import 'bible.dart';

/// Hachage FNV-1a 32 bits, stable entre les exécutions et entre
/// Dart et JavaScript. Le hachage natif des chaînes Dart ne l'est
/// pas, il ne doit jamais servir ici.
int anniversaireHash(String matricule) {
  var hash = 0x811c9dc5;
  for (final octet in utf8.encode(matricule)) {
    hash ^= octet;
    hash = (hash * 0x01000193) & 0xffffffff;
  }
  return hash;
}

/// Indice du verset d'anniversaire pour ce matricule et cette année.
int anniversaireVersetIndex(String matricule, int annee) {
  if (kDailyVerses.isEmpty) return -1;
  return (anniversaireHash(matricule) + annee) % kDailyVerses.length;
}

/// Verset d'anniversaire lu dans la Bible embarquée, null si la Bible
/// n'est pas chargée ou si le verset est absent : dans ce cas la
/// carte ne s'affiche pas, plutôt que d'afficher un texte inventé.
BibleVerseRef? anniversaireVerset(String lang, String matricule, int annee) {
  final svc = BibleService.instance;
  if (!svc.loaded) return null;
  final index = anniversaireVersetIndex(matricule, annee);
  if (index < 0) return null;
  final ref = kDailyVerses[index];
  final text = svc.verseText(lang, ref[0], ref[1], ref[2]);
  if (text == null || text.isEmpty) return null;
  return BibleVerseRef(ref[0], ref[1], ref[2], text);
}

const List<String> _moisFr = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
];

const List<String> _moisEn = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/// Date d'intégration en toutes lettres, sans heure, sans âge.
/// Exemple français : 12 mars 2024. Exemple anglais : March 12, 2024.
String anniversaireDateLabel(DateTime date, bool anglais) {
  if (anglais) return '${_moisEn[date.month - 1]} ${date.day}, ${date.year}';
  return '${date.day} ${_moisFr[date.month - 1]} ${date.year}';
}

/// Message d'anniversaire d'Axel, modifié le 4 nov. 2026, texte
/// français exact, avec le prénom du membre à la place de [prénom].
/// Il remplace l'ancien long texte du 3 nov. 2026, dans la carte
/// comme dans le courriel. Le verset dédié, qui change toujours
/// chaque année, n'est plus dans ce texte : il s'affiche à part,
/// dans la carte (HomeBirthday.verse) et, côté courriel, dans la
/// ligne de référence qui suit le message. Aucun âge, aucune année
/// de naissance. La version anglaise est une traduction littérale
/// de ce nouveau texte français, qui reste la référence ; elle
/// n'a pas été fournie comme texte d'Axel.
String anniversaireMessage({
  required bool anglais,
  required String prenom,
}) {
  if (anglais) {
    return 'We are happy to count you among us $prenom in the name of Connexion Prophétique we wish you a Happy Birthday.';
  }
  return 'Nous sommes heureux de vous compter parmi nous $prenom au nom de Connexion Prophétique nous vous souhaitons Joyeux anniversaire.';
}
