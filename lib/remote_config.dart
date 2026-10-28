// Configuration pilotée par le serveur, modèle Desjardins, 27 oct. 2026.
// Les petits réglages de contenu (textes d'accueil, libellés de base,
// messages d'information, activation d'une section) sont lus sur
// GET /config au démarrage et à chaque synchronisation, et la
// dernière configuration est gardée en local comme repli hors ligne.
// Les valeurs par défaut ci-dessous sont exactement les valeurs
// actuelles de l'application, rien n'est inventé : si le serveur est
// injoignable ou si la configuration est absente, l'application
// affiche ces valeurs, comme avant. Aucun prix, aucun paiement,
// aucun texte biblique ne passe par cette configuration.
// Un texte peut être une chaîne, ou un objet {fr, en} : dans ce cas,
// la langue choisie est utilisée. Une chaîne est passée par tr() :
// les textes par défaut se traduisent donc comme avant, un texte
// personnalisé par la structure s'affiche tel qu'il a été écrit.
import 'dart:convert';

import 'i18n.dart';

const Map<String, dynamic> remoteConfigDefaults = {
  'version': 1,
  'accueil_salutation': 'Shalom',
  'titre_vie_spirituelle': 'Ma vie spirituelle',
  'titre_explorer': 'Explorer',
  'titre_rendez_vous': 'Prochains rendez-vous',
  'titre_actualites': 'Actualités de la communauté',
  'message_visiteur': 'Mode visiteur, consultation sans inscription',
  'message_hors_ligne':
      'Hors ligne : contenus locaux affichés. La synchronisation reprendra en ligne.',
  'message_aucune_actualite': 'Aucune actualité pour le moment',
  'nav_accueil': 'Accueil',
  'nav_bible': 'Bible',
  'nav_carte': 'Carte',
  'nav_communaute': 'Communauté',
  'nav_plus': 'Plus',
  // URL du logo pilotée par le serveur, vide par défaut : le logo
  // officiel local est alors utilisé, redimensionné en en-tête.
  // Si la structure renseigne une URL ici, par exemple un fichier
  // téléversé sur le serveur, cette image remplace le logo local,
  // sans nouvelle APK, avec repli local en cas d'échec ou hors ligne.
  'logo_url': '',
  'sections': {
    'vie_spirituelle': true,
    'explorer': true,
    'verset_du_jour': true,
    'quiz': true,
    'rendez_vous': true,
    'actualites': true,
    'priere': true,
  },
};

class RemoteConfig {
  RemoteConfig(Map<String, dynamic> values)
      : values = Map<String, dynamic>.from(values);

  factory RemoteConfig.defaults() =>
      RemoteConfig(jsonDecode(jsonEncode(remoteConfigDefaults)) as Map<String, dynamic>);

  factory RemoteConfig.fromJson(Map<String, dynamic>? json) {
    final merged = jsonDecode(jsonEncode(remoteConfigDefaults)) as Map<String, dynamic>;
    if (json == null) return RemoteConfig(merged);
    for (final entry in json.entries) {
      if (entry.key == 'sections' && entry.value is Map) {
        final sections = Map<String, dynamic>.from(merged['sections'] as Map);
        for (final sec in (entry.value as Map).entries) {
          if (sec.value is bool) sections[sec.key.toString()] = sec.value;
        }
        merged['sections'] = sections;
      } else if (merged.containsKey(entry.key)) {
        merged[entry.key] = entry.value;
      }
    }
    return RemoteConfig(merged);
  }

  final Map<String, dynamic> values;

  Map<String, dynamic> toJson() => jsonDecode(jsonEncode(values)) as Map<String, dynamic>;

  String text(String key, String fallback) {
    final v = values[key];
    if (v is Map) {
      final langValue = isEn ? v['en'] : v['fr'];
      if (langValue is String && langValue.isNotEmpty) return langValue;
      final other = isEn ? v['fr'] : v['en'];
      if (other is String && other.isNotEmpty) return other;
      return fallback;
    }
    if (v is String && v.isNotEmpty) return tr(v);
    return fallback;
  }

  /// Valeur brute, sans traduction, pour les URL et les clés
  /// qui ne sont pas des textes à traduire, comme logo_url.
  String raw(String key) {
    final v = values[key];
    return v is String ? v : '';
  }

  bool section(String key, [bool fallback = true]) {
    final sections = values['sections'];
    if (sections is Map && sections[key] is bool) return sections[key] as bool;
    return fallback;
  }
}

// Configuration courante, mise à jour par AppState au chargement
// local puis à chaque synchronisation serveur. Les widgets de
// l'accueil, qui ne reçoivent pas AppState en paramètre, la lisent ici.
RemoteConfig currentRemoteConfig = RemoteConfig.defaults();

void setCurrentRemoteConfig(RemoteConfig config) {
  currentRemoteConfig = config;
}

String rcText(String key, String fallback) => currentRemoteConfig.text(key, fallback);

bool rcSection(String key, [bool fallback = true]) => currentRemoteConfig.section(key, fallback);
