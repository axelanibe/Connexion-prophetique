// Réglages des notifications par catégorie, 1er nov. 2026, version 1,
// complétés le 2 nov. 2026 pour la poussée Android.
// Un interrupteur par type de notification déjà existant, gardé sur
// l'appareil dans SharedPreferences. Le réglage filtre l'affichage
// du centre de notifications, et, depuis la poussée Android, les
// catégories activées sont aussi envoyées avec le jeton FCM, pour
// que le serveur filtre avant d'envoyer. Un type inconnu éventuel
// reste toujours visible et toujours poussé par défaut, sans
// interrupteur inventé pour lui. Limite honnête : une notification
// déjà affichée par Android en arrière-plan ne peut pas être
// retirée par l'application, d'où l'importance du filtre serveur.
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'i18n.dart';

class NotifSettings extends ChangeNotifier {
  // Types déjà émis par le serveur, dans l'ordre d'affichage.
  static const types = [
    'paiement_valide',
    'paiement_refuse',
    'cotisation_rappel',
    'nouveau_camp',
    'nouvel_enseignement',
    'nouvelle_actualite',
  ];

  final Map<String, bool> _actifs = {};

  String label(String type) {
    switch (type) {
      case 'paiement_valide':
        return tr('Paiement validé');
      case 'paiement_refuse':
        return tr('Paiement refusé');
      case 'cotisation_rappel':
        return tr('Rappel de cotisation');
      case 'nouveau_camp':
        return tr('Nouveau camp');
      case 'nouvel_enseignement':
        return tr('Nouvel enseignement');
      case 'nouvelle_actualite':
        return tr('Nouvelle actualité');
      default:
        return type;
    }
  }

  bool enabled(String type) => _actifs[type] ?? true;

  /// Catégories activées, dans l'ordre d'affichage, pour
  /// l'enregistrement du jeton FCM. Une catégorie désactivée n'est
  /// pas envoyée, donc le serveur ne pousse rien pour elle.
  List<String> enabledCategories() =>
      types.where((t) => enabled(t)).toList();

  Future<void> load() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      for (final t in types) {
        _actifs[t] = prefs.getBool('notif_cat_$t') ?? true;
      }
    } catch (_) {
      // Sans stockage local, tout reste activé en mémoire.
    }
  }

  Future<void> setCategory(String type, bool value) async {
    if (_actifs[type] == value && _actifs.containsKey(type)) return;
    _actifs[type] = value;
    notifyListeners();
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool('notif_cat_$type', value);
    } catch (_) {
      // L'application continue avec le réglage en mémoire.
    }
  }
}

final notifSettings = NotifSettings();
