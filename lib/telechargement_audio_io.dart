// Téléchargement hors ligne d'un audio, téléphone et Windows,
// carte 53, 6 nov. 2026 : écriture dans le dossier de documents
// de l'application, sous-dossier audios. Un seul fichier par
// audio, jamais deux fois le même : le nom vient de
// l'identifiant serveur quand il existe, sinon du titre normalisé.
// Le téléchargement écrit par morceaux, avec progression en
// pourcentage, et peut être annulé par le booléen annule().
// Supprimer le fichier libère l'espace, sans toucher au serveur.
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:path_provider/path_provider.dart';

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

Future<Directory> _dossierAudios() async {
  final dir = await getApplicationDocumentsDirectory();
  final audios = Directory('${dir.path}/audios');
  await audios.create(recursive: true);
  return audios;
}

Future<String?> audioCheminLocal(String nomFichier) async {
  final dossier = await _dossierAudios();
  final fichier = File('${dossier.path}/$nomFichier');
  return await fichier.exists() ? fichier.path : null;
}

Future<bool> audioEstTelecharge(String nomFichier) async =>
    await audioCheminLocal(nomFichier) != null;

Future<String?> telechargerAudio(String url, String nomFichier,
    void Function(double progression) onProgression, bool Function() annule) async {
  final dossier = await _dossierAudios();
  final fichier = File('${dossier.path}/$nomFichier');
  final temporaire = File('${dossier.path}/$nomFichier.part');
  final client = http.Client();
  try {
    final requete = await client.send(http.Request('GET', Uri.parse(url)));
    if (requete.statusCode < 200 || requete.statusCode >= 300) return null;
    final total = requete.contentLength ?? -1;
    var recus = 0;
    final ecriture = temporaire.openWrite();
    await for (final morceau in requete.stream) {
      if (annule()) {
        await ecriture.close();
        await temporaire.delete().catchError((_) => temporaire);
        return null;
      }
      ecriture.add(morceau);
      recus += morceau.length;
      if (total > 0) onProgression(recus / total);
    }
    await ecriture.close();
    await temporaire.rename(fichier.path);
    return fichier.path;
  } catch (_) {
    await temporaire.exists().then((e) async {
      if (e) await temporaire.delete().catchError((_) => temporaire);
    });
    return null;
  } finally {
    client.close();
  }
}

Future<void> supprimerAudioTelecharge(String nomFichier) async {
  final dossier = await _dossierAudios();
  final fichier = File('${dossier.path}/$nomFichier');
  if (await fichier.exists()) await fichier.delete();
}
