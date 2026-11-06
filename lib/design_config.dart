// Configuration design pilotée par le serveur, carte 47, 6 nov. 2026.
// Parallèle à remote_config.dart, distincte : couleurs de la palette,
// titres d'accueil et ordre des entrées de la barre du bas, lus sur
// GET /config/design au démarrage et à chaque synchronisation, avec
// la dernière configuration gardée en local comme repli hors ligne.
// Les valeurs par défaut ci-dessous sont exactement les valeurs
// actuelles de l'application, rien n'est inventé : si le serveur est
// injoignable ou si la configuration est absente, le thème et la
// navigation restent identiques à aujourd'hui. Aucun prix, aucun
// paiement, aucun texte biblique ne passe par cette configuration.
// Limite honnête : seules les couleurs du thème, la barre du bas et
// les titres d'accueil suivent cette config. Les couleurs Cp codées
// en dur dans les pages profondes ne changent pas par cette tranche.
import 'package:flutter/material.dart';

// Clés canoniques des entrées de navigation, dans l'ordre par défaut.
// L'index canonique ne change jamais : accueil 0, bible 1, librairie 2,
// structure 3, carte 4, plus 5. Seul l'ordre d'affichage est piloté.
const List<String> designNavKeys = ['accueil', 'bible', 'librairie', 'structure', 'carte', 'plus'];
const Map<String, int> designNavIndex = {
  'accueil': 0,
  'bible': 1,
  'librairie': 2,
  'structure': 3,
  'carte': 4,
  'plus': 5,
};

const Map<String, dynamic> designConfigDefaults = {
  'bleuNuit': '#0B1F3A',
  'or': '#D4A72C',
  'orFonce': '#8A6A12',
  'fond': '#F5F6FA',
  'titreVieSpirituelle': 'Ma vie spirituelle',
  'titreExplorer': 'Explorer',
  'titreDecouvrir': 'Découvrir',
  'titreRendezVous': 'Prochains rendez-vous',
  'titreActualites': 'Actualités de la structure',
  'ordreSections': ['accueil', 'bible', 'librairie', 'structure', 'carte', 'plus'],
};

bool _couleurValide(Object? v) => v is String && RegExp(r'^#[0-9A-Fa-f]{6}$').hasMatch(v);

bool _titreValide(Object? v) => v is String && v.trim().isNotEmpty && v.length <= 120;

bool _ordreValide(Object? v) {
  if (v is! List || v.length != designNavKeys.length) return false;
  final vues = <String>{};
  for (final e in v) {
    if (e is! String || !designNavKeys.contains(e) || !vues.add(e)) return false;
  }
  return true;
}

/// Couleur stricte depuis un hexadécimal #RRGGBB, repli sur [repli]
// si la valeur est absente ou invalide.
Color colorFromHex(Object? v, Color repli) {
  if (!_couleurValide(v)) return repli;
  final hex = (v as String).substring(1);
  return Color(int.parse(hex, radix: 16) + 0xFF000000);
}

/// Hexadécimal #RRGGBB d'une couleur, pour la sauvegarde locale.
String _hex(Color c) {
  String part(double v) =>
      (v * 255).round().clamp(0, 255).toRadixString(16).padLeft(2, '0');
  return '#${part(c.r)}${part(c.g)}${part(c.b)}'.toUpperCase();
}

class DesignConfig {
  const DesignConfig({
    required this.bleuNuit,
    required this.or,
    required this.orFonce,
    required this.fond,
    required this.titreVieSpirituelle,
    required this.titreExplorer,
    required this.titreDecouvrir,
    required this.titreRendezVous,
    required this.titreActualites,
    required this.ordreSections,
  });

  factory DesignConfig.defaults() => DesignConfig(
        bleuNuit: const Color(0xFF0B1F3A),
        or: const Color(0xFFD4A72C),
        orFonce: const Color(0xFF8A6A12),
        fond: const Color(0xFFF5F6FA),
        titreVieSpirituelle: 'Ma vie spirituelle',
        titreExplorer: 'Explorer',
        titreDecouvrir: 'Découvrir',
        titreRendezVous: 'Prochains rendez-vous',
        titreActualites: 'Actualités de la structure',
        ordreSections: List<String>.from(designNavKeys),
      );

  factory DesignConfig.fromJson(Map<String, dynamic>? json) {
    final defauts = DesignConfig.defaults();
    if (json == null) return defauts;
    return DesignConfig(
      bleuNuit: colorFromHex(json['bleuNuit'], defauts.bleuNuit),
      or: colorFromHex(json['or'], defauts.or),
      orFonce: colorFromHex(json['orFonce'], defauts.orFonce),
      fond: colorFromHex(json['fond'], defauts.fond),
      titreVieSpirituelle:
          _titreValide(json['titreVieSpirituelle']) ? json['titreVieSpirituelle'] as String : defauts.titreVieSpirituelle,
      titreExplorer: _titreValide(json['titreExplorer']) ? json['titreExplorer'] as String : defauts.titreExplorer,
      titreDecouvrir: _titreValide(json['titreDecouvrir']) ? json['titreDecouvrir'] as String : defauts.titreDecouvrir,
      titreRendezVous: _titreValide(json['titreRendezVous']) ? json['titreRendezVous'] as String : defauts.titreRendezVous,
      titreActualites: _titreValide(json['titreActualites']) ? json['titreActualites'] as String : defauts.titreActualites,
      ordreSections: _ordreValide(json['ordreSections'])
          ? List<String>.from(json['ordreSections'] as List)
          : defauts.ordreSections,
    );
  }

  final Color bleuNuit, or, orFonce, fond;
  final String titreVieSpirituelle, titreExplorer, titreDecouvrir, titreRendezVous, titreActualites;
  final List<String> ordreSections;

  Map<String, dynamic> toJson() => {
        'bleuNuit': _hex(bleuNuit),
        'or': _hex(or),
        'orFonce': _hex(orFonce),
        'fond': _hex(fond),
        'titreVieSpirituelle': titreVieSpirituelle,
        'titreExplorer': titreExplorer,
        'titreDecouvrir': titreDecouvrir,
        'titreRendezVous': titreRendezVous,
        'titreActualites': titreActualites,
        'ordreSections': List<String>.from(ordreSections),
      };

  /// Titre d'accueil piloté : la valeur design ne s'applique que si
  /// elle diffère du défaut, sinon [repli] garde la main. Ainsi, tant
  /// que la structure ne touche à rien, les textes distants existants
  // et les traductions restent exactement comme avant.
  String titreAccueil(String cle, String repli) {
    switch (cle) {
      case 'titreVieSpirituelle':
        return titreVieSpirituelle == 'Ma vie spirituelle' ? repli : titreVieSpirituelle;
      case 'titreExplorer':
        return titreExplorer == 'Explorer' ? repli : titreExplorer;
      case 'titreDecouvrir':
        return titreDecouvrir == 'Découvrir' ? repli : titreDecouvrir;
      case 'titreRendezVous':
        return titreRendezVous == 'Prochains rendez-vous' ? repli : titreRendezVous;
      case 'titreActualites':
        return titreActualites == 'Actualités de la structure' ? repli : titreActualites;
      default:
        return repli;
    }
  }
}

// Configuration courante, mise à jour par AppState au chargement
// local puis à chaque synchronisation serveur. Les widgets qui ne
// reçoivent pas AppState en paramètre, comme la barre du bas, la
// lisent ici, comme pour currentRemoteConfig.
DesignConfig currentDesignConfig = DesignConfig.defaults();

void setCurrentDesignConfig(DesignConfig config) {
  currentDesignConfig = config;
}

/// Ordre d'affichage de la barre du bas, en index canoniques 0 à 5,
/// selon l'ordre serveur. Repli sur [0, 1, 2, 3, 4, 5] si l'ordre
// est invalide, incomplet ou avec doublon.
List<int> designNavOrder() {
  final ordre = currentDesignConfig.ordreSections;
  if (ordre.length != designNavKeys.length) return const [0, 1, 2, 3, 4, 5];
  final vus = <String>{};
  final indices = <int>[];
  for (final cle in ordre) {
    final i = designNavIndex[cle];
    if (i == null || !vus.add(cle)) return const [0, 1, 2, 3, 4, 5];
    indices.add(i);
  }
  return indices;
}
