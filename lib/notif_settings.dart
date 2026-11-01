// Réglages des notifications par catégorie, 1er nov. 2026, version 1.
// Un interrupteur par type de notification déjà existant, gardé sur
// l'appareil seulement, dans SharedPreferences, jamais envoyé au
// serveur. Le réglage filtre l'affichage du centre de notifications,
// il ne touche pas au circuit d'envoi, et il ne coupe aucune
// notification quand l'application est fermée, car il n'y a pas de
// notification poussée hors application. Un type inconnu éventuel
// reste toujours visible, sans interrupteur inventé pour lui.
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
    'nouvelle_reunion',
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
      case 'nouvelle_reunion':
        return tr('Nouvelle réunion');
      default:
        return type;
    }
  }

  bool enabled(String type) => _actifs[type] ?? true;

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
