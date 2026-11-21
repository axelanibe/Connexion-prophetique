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
    // Carte 1, 21 nov. 2026 : réunion en ligne, déjà émise par
    // le serveur, elle a son interrupteur ici.
    'nouvelle_reunion',
    // Carte 124, 10 nov. 2026 : Espace parent, sinon la poussée
    // Android de ces types est filtrée côté serveur.
    'presence_enfant',
    'moyenne',
    'moyenne_enfant',
    // Carte 1, 21 nov. 2026 : 'messagerie' devient
    // 'nouveau_message', le nom déjà émis par le serveur, et les
    // réunions en ligne et la clôture d'un signalement, déjà
    // émises elles aussi, ont leur interrupteur.
    'nouveau_message',
    'signalement_cloture',
    // Appels audio et vidéo, 16 nov. 2026 : notification d'appel
    // entrant, pour réveiller l'appelé.
    'appel_entrant',
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
        return tr('CAMP & Retraite');
      case 'nouvel_enseignement':
        return tr('ENSEIGNEMENT');
      case 'nouvelle_actualite':
        return tr('ACTUALITÉ');
      // Carte 1, 21 nov. 2026 : réunion en ligne.
      case 'nouvelle_reunion':
        return tr('Réunion en ligne');
      // Carte 124, 10 nov. 2026 : Espace parent.
      case 'presence_enfant':
        return tr('Présence de mon enfant');
      case 'moyenne':
        return tr('Moyennes publiées');
      case 'moyenne_enfant':
        return tr('Moyennes de mon enfant');
      // Messagerie, 16 nov. 2026, renommée carte 1, 21 nov. 2026 :
      // le libellé « Messages » ne change pas, seul le type
      // devient 'nouveau_message', comme côté serveur.
      case 'nouveau_message':
        return tr('Messages');
      // Carte 1, 21 nov. 2026 : clôture d'un signalement.
      case 'signalement_cloture':
        return tr('Signalement traité');
      // Appels audio et vidéo, 16 nov. 2026.
      case 'appel_entrant':
        return tr('Appels');
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
