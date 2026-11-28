// Re-branchement des appels, tranche T21, 27 nov. 2026.
// Les écrans d'appel de l'ancienne version (lib/appels_screens.dart,
// lib/appels.dart) sont toujours dans l'arbre, identiques à 0629962,
// mais plus rien dans lib/nouveau/ ne les appelait. Ce fichier est
// le seul point de contact entre le nouveau code et ces écrans :
// ouverture de l'écran d'appel sortant et entrant, autorisations
// micro et caméra, et les aides pures du sondage des entrants
// (délai 429, pause, garde anti double ouverture, mapping des
// lignes serveur), reprises telles quelles de l'ancien main.dart.
// La bibliothèque des écrans reste différée, comme dans main.dart :
// elle ne se charge qu'au premier appel, jamais au démarrage.
// Les pages prennent un ouvreur injectable (onOuvrirAppelEnCours)
// pour que les tests n'ouvrent jamais le vrai écran WebRTC.
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';

import '../appels_screens.dart' deferred as appels;

/// Ouvre l'écran d'appel sortant, construit par l'appelant.
/// Défaut : pousser la page sur le navigateur courant.
typedef OuvrirAppelEnCours = void Function(BuildContext context, Widget page);

void ouvrirAppelEnCoursParDefaut(BuildContext context, Widget page) {
  Navigator.of(context).push(
    MaterialPageRoute<void>(builder: (_) => page),
  );
}

/// Charge la bibliothèque des écrans d'appel, à appeler avant
/// de construire un écran, sauf quand autorisationsAppel vient
/// d'être appelée, elle charge déjà.
Future<void> chargerEcransAppel() => appels.loadLibrary();

/// Micro et caméra avant d'ouvrir l'écran, carte 155 : les
/// fenêtres système ne doivent pas manger les 30 secondes de
/// sonnerie. Faux quand l'utilisateur refuse, l'appel ne part pas.
Future<bool> autorisationsAppel({required bool video}) async {
  await appels.loadLibrary();
  return appels.demanderAutorisationsAppel(video: video);
}

/// Écran explicite quand le micro ou la caméra est refusé,
/// salve 28 nov. 2026 : plus de simple message, on explique
/// et on ouvre les réglages du téléphone.
Future<void> expliquerAutorisationsRefusees(
  BuildContext context, {
  required bool video,
}) async {
  await showDialog<void>(
    context: context,
    builder: (context) => AlertDialog(
      title: Text(video ? 'Micro ou caméra refusé' : 'Micro refusé'),
      content: Text(
        video
            ? 'Pour appeler en vidéo, autorise le micro et la caméra dans les réglages de ton téléphone, puis reviens ici.'
            : 'Pour appeler, autorise le micro dans les réglages de ton téléphone, puis reviens ici.',
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Fermer'),
        ),
        FilledButton(
          onPressed: () {
            Navigator.of(context).pop();
            openAppSettings();
          },
          child: const Text('Ouvrir les réglages'),
        ),
      ],
    ),
  );
}

/// Écran d'appel sortant, appelId vide : l'écran attend
/// l'identifiant que la création en arrière-plan renvoie.
Widget ecranAppelEnCours({
  required String typeAppel,
  required String autreNom,
  ImageProvider? autrePhoto,
  required Future<Map<String, dynamic>> appelFutur,
}) =>
    appels.EcranAppelEnCours(
      appelId: '',
      typeAppel: typeAppel,
      autreNom: autreNom,
      autrePhoto: autrePhoto,
      suisAppelant: true,
      appelFutur: appelFutur,
    );

/// Écran d'appel entrant, depuis une notification, le sondage
/// global ou le sondage de la conversation. Les données sont
/// celles du flux onAppelEntrant ou du mapping des lignes
/// serveur : appel_id, appelant_nom, type_appel, conversation_id,
/// accepte_via_callkit.
Future<void> ouvrirAppelEntrant(
  BuildContext context, {
  required Map<String, String> donnees,
  required String? monMembreId,
}) async {
  await appels.loadLibrary();
  if (!context.mounted) return;
  Navigator.of(context).push(
    MaterialPageRoute<void>(
      builder: (_) => appels.EcranAppelEntrant(
        appelId: donnees['appel_id'] ?? donnees['lien_id'] ?? '',
        appelantNom: donnees['appelant_nom'] ?? '',
        typeAppel: donnees['type_appel'] ?? 'audio',
        conversationId: donnees['conversation_id'] ?? '',
        monMembreId: monMembreId,
        accepteViaCallKit: donnees['accepte_via_callkit'] == 'true',
      ),
    ),
  );
}

/// B-4 : le délai vient d'abord de l'en-tête Retry-After du serveur,
/// porté par ApiException.delaiReessai. L'analyse du texte anglais
/// « retry in N seconds » ne sert plus que de repli, pour un serveur
/// qui n'enverrait pas l'en-tête. Plafonné à 65 secondes comme le
/// renouvellement, repli 30 secondes si le délai est illisible.
/// Repris tel quel de l'ancien main.dart.
int delaiReessai429(String message, {int? retryAfter}) {
  if (retryAfter != null) return retryAfter.clamp(1, 65);
  final m = RegExp(r'retry in (\d+)').firstMatch(message);
  final secondes = m == null ? 30 : int.tryParse(m.group(1)!) ?? 30;
  return secondes.clamp(1, 65);
}

/// Pause du sondage des appels entrants après une 429, 22 nov.
/// 2026 : le sondage ne doit pas alimenter la tempête. La pause
/// expire d'elle-même, le sondage reprend ensuite à 10 secondes.
/// Reprise telle quelle de l'ancien main.dart.
class PauseSondage {
  DateTime? _jusqua;

  void mettreEnPause(int secondes) {
    _jusqua = DateTime.now().add(Duration(seconds: secondes));
  }

  bool get enPause {
    final j = _jusqua;
    if (j == null) return false;
    if (DateTime.now().isBefore(j)) return true;
    _jusqua = null;
    return false;
  }
}

/// Garde anti double ouverture de l'écran d'appel entrant :
/// le même appel ne s'ouvre pas deux fois dans la minute, que
/// l'ouverture vienne de FCM, du sondage global ou du sondage
/// de la conversation. Reprise de l'ancien main.dart, rendue
/// testable : l'horloge est injectable.
class GardeAppelEntrant {
  String? _appelId;
  DateTime? _ouvertLe;

  bool accepter(String appelId, {DateTime? maintenant}) {
    final m = maintenant ?? DateTime.now();
    if (_appelId == appelId &&
        _ouvertLe != null &&
        m.difference(_ouvertLe!).inSeconds < 60) {
      return false;
    }
    _appelId = appelId;
    _ouvertLe = m;
    return true;
  }
}

/// Ligne de GET /messagerie/appels/entrants vers les données
/// de l'écran entrant : id, appelant_nom, type, conversation_id.
Map<String, String> donneesAppelEntrantDepuisLigne(
    Map<String, dynamic> ligne) {
  return {
    'appel_id': (ligne['id'] ?? '').toString(),
    'appelant_nom': (ligne['appelant_nom'] ?? '').toString(),
    'type_appel': (ligne['type'] ?? 'audio').toString(),
    'conversation_id': (ligne['conversation_id'] ?? '').toString(),
  };
}
