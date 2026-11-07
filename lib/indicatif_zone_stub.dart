// Fuseau IANA, hors web, carte 87 : rien à lire, la langue
// porte déjà le pays sur téléphone. Renvoie toujours null,
// la détection retombe sur les langues, puis le fuseau
// nord-américain, puis le repli +225.
String? fuseauIanaAppareil() => null;
