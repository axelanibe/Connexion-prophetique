// Configuration de version pilotée par le serveur, 16 nov. 2026.
// GET /api/config renvoie configVersion, minAppVersion et updateUrl.
// Lue au démarrage et à chaque synchronisation, gardée en local
// comme repli hors ligne. Sans cache, les valeurs par défaut
// embarquées s'appliquent, avec minAppVersion égale à la version
// installée, donc jamais bloqué. Quand la version installée est
// inférieure à minAppVersion, l'écran de mise à jour obligatoire
// bloque toute l'application, sans contournement ni « plus tard ».
// Pas de mise à jour Play Store : l'application n'est pas sur le
// Play Store, le bouton ouvre updateUrl dans le navigateur.
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';

import 'bug_reports.dart';
import 'i18n.dart';

/// Version installée sans son numéro de build : '1.0.1+2' vaut '1.0.1'.
String get installedVersionBase => kAppVersion.split('+').first;

/// Comparaison de versions majeur.mineur.correctif, numéro de build
/// ignoré : '1.0.1+2' vaut '1.0.1'. Renvoie -1, 0 ou 1. Une partie
/// absente vaut 0, une partie illisible aussi, pour ne jamais
/// bloquer sur une valeur mal formée.
int compareVersions(String a, String b) {
  List<int> parties(String v) {
    final base = v.split('+').first;
    return base.split('.').map((p) {
      final n = int.tryParse(p.trim());
      return n == null || n < 0 ? 0 : n;
    }).toList();
  }

  final pa = parties(a);
  final pb = parties(b);
  final longueur = pa.length > pb.length ? pa.length : pb.length;
  for (var i = 0; i < longueur; i++) {
    final x = i < pa.length ? pa[i] : 0;
    final y = i < pb.length ? pb[i] : 0;
    if (x != y) return x < y ? -1 : 1;
  }
  return 0;
}

/// Vrai quand la version installée est inférieure à la version minimale.
bool isUpdateRequired({required String installed, required String min}) =>
    compareVersions(installed, min) < 0;

class VersionConfig {
  const VersionConfig({
    required this.configVersion,
    required this.minAppVersion,
    required this.updateUrl,
  });

  final int configVersion;
  final String minAppVersion;
  final String updateUrl;

  /// Valeurs par défaut embarquées : minAppVersion égale à la
  /// version installée, donc jamais bloqué sans cache.
  factory VersionConfig.defaults() => VersionConfig(
        configVersion: 1,
        minAppVersion: installedVersionBase,
        updateUrl: 'https://www.connexionprophetique.com/',
      );

  /// Lecture défensive, champ par champ : une valeur absente ou
  /// mal formée retombe sur le défaut, jamais une erreur.
  factory VersionConfig.fromJson(Map<String, dynamic>? json) {
    final def = VersionConfig.defaults();
    if (json == null) return def;
    final version = json['configVersion'];
    final min = json['minAppVersion'];
    final url = json['updateUrl'];
    return VersionConfig(
      configVersion: version is int
          ? version
          : (version is num ? version.toInt() : def.configVersion),
      minAppVersion: min is String && min.trim().isNotEmpty ? min.trim() : def.minAppVersion,
      updateUrl: url is String && url.trim().isNotEmpty ? url.trim() : def.updateUrl,
    );
  }

  Map<String, dynamic> toJson() => {
        'configVersion': configVersion,
        'minAppVersion': minAppVersion,
        'updateUrl': updateUrl,
      };

  @override
  bool operator ==(Object other) =>
      other is VersionConfig &&
      other.configVersion == configVersion &&
      other.minAppVersion == minAppVersion &&
      other.updateUrl == updateUrl;

  @override
  int get hashCode => Object.hash(configVersion, minAppVersion, updateUrl);
}

class ConfigService extends ChangeNotifier {
  VersionConfig _current = VersionConfig.defaults();

  VersionConfig get current => _current;

  /// Vrai quand la version installée est inférieure à la version
  /// minimale du serveur.
  bool get mustUpdate =>
      isUpdateRequired(installed: kAppVersion, min: _current.minAppVersion);

  /// Repli hors ligne : dernière configuration connue, sinon défauts.
  Future<void> load() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final raw = prefs.getString('version_config_json');
      if (raw == null || raw.isEmpty) return;
      final data = jsonDecode(raw);
      if (data is Map<String, dynamic>) _current = VersionConfig.fromJson(data);
    } catch (_) {
      // Sans stockage local, les défauts s'appliquent en mémoire.
    }
  }

  /// Configuration venue du serveur : vide veut dire échec, la
  /// dernière configuration locale est alors gardée. Sans changement,
  /// pas de notification, pour ne pas reconstruire l'application.
  Future<void> apply(Map<String, dynamic> json) async {
    if (json.isEmpty) return;
    final next = VersionConfig.fromJson(json);
    if (next == _current) return;
    _current = next;
    notifyListeners();
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('version_config_json', jsonEncode(_current.toJson()));
    } catch (_) {
      // L'application continue avec la nouvelle valeur en mémoire.
    }
  }
}

final configService = ConfigService();

/// Écran de mise à jour obligatoire : il remplace tout le contenu
/// de l'application, sans barre du bas, sans retour possible, tant
/// que la version installée est inférieure à la version minimale.
/// Un seul bouton, qui ouvre updateUrl dans le navigateur.
class UpdateRequiredScreen extends StatelessWidget {
  const UpdateRequiredScreen({super.key, required this.updateUrl});

  final String updateUrl;

  // Mêmes valeurs que Cp.navy et Cp.gold, lib/main.dart : ce
  // fichier ne peut pas importer main.dart, qui l'importe.
  static const _navy = Color(0xFF0F1C2E);
  static const _gold = Color(0xFFE5C158);

  Future<void> _ouvrir() async {
    try {
      await launchUrl(Uri.parse(updateUrl), mode: LaunchMode.externalApplication);
    } catch (_) {
      // L'écran reste affiché, le membre peut réessayer.
    }
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      child: Scaffold(
        backgroundColor: _navy,
        body: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Icon(Icons.system_update_outlined, color: _gold, size: 64),
                const SizedBox(height: 24),
                Text(
                  tr('Mise à jour requise'),
                  textAlign: TextAlign.center,
                  style: const TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w800),
                ),
                const SizedBox(height: 12),
                Text(
                  tr('Une nouvelle version de l’application est disponible. Mets à jour pour continuer.'),
                  textAlign: TextAlign.center,
                  style: const TextStyle(color: Colors.white70, fontSize: 16, height: 1.5),
                ),
                const SizedBox(height: 12),
                Text(
                  '${tr('Version installée')} $kAppVersion · ${tr('Version requise')} ${configService.current.minAppVersion}',
                  textAlign: TextAlign.center,
                  style: const TextStyle(color: Colors.white54, fontSize: 13),
                ),
                const SizedBox(height: 32),
                FilledButton(
                  onPressed: _ouvrir,
                  style: FilledButton.styleFrom(
                    backgroundColor: _gold,
                    foregroundColor: _navy,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                  ),
                  child: Text(
                    tr('Mettre à jour'),
                    style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w800),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
