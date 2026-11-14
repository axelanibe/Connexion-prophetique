// Téléchargement hors ligne d'un audio sur le web, carte 53,
// 6 nov. 2026 : le navigateur ne garde pas le fichier de la
// même façon, le téléchargement hors ligne n'est pas proposé
// sur le web. Même signature que la version téléphone, les
// fonctions renvoient null ou false, sans erreur.
String audioNomFichier(String identifiantServeur, String titre) {
  if (identifiantServeur.trim().isNotEmpty) {
    return 'audio-${identifiantServeur.trim()}.mp3';
  }
  final norme = titre
      .toLowerCase()
      .replaceAll(RegExp(r'[^a-z0-9]+'), '-')
      .replaceAll(RegExp(r'^-+|-+$'), '');
  return 'audio-${norme.isEmpty ? 'sans-titre' : norme}.mp3';
}

Future<String?> audioCheminLocal(String nomFichier) async => null;

Future<bool> audioEstTelecharge(String nomFichier) async => false;

Future<String?> telechargerAudio(String url, String nomFichier,
        void Function(double progression) onProgression, bool Function() annule) async =>
    null;

Future<void> supprimerAudioTelecharge(String nomFichier) async {}
