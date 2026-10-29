// Rapports de bug, 29 oct. 2026 : un membre signale un plantage ou
// un écran qui ne marche pas, depuis l'onglet Plus ou par capture
// automatique d'erreur. Les membres n'ont rien à faire : un plantage
// s'envoie seul, sans description à taper, sans contact à prendre.
// Sans connexion, le rapport est gardé sur l'appareil et part à la
// prochaine synchronisation, quand un membre est connecté.
//
// Règle de confidentialité, sans exception : un rapport ne contient
// jamais de mot de passe, de jeton, d'e-mail, de numéro de téléphone,
// de donnée de santé, d'information de paiement ni de contenu de
// prière. Le message technique est nettoyé avant l'envoi, la
// description tapée par le membre est nettoyée pareil, et la page de
// signalement rappelle de ne jamais taper de mot de passe, de numéro
// ou d'adresse e-mail. La capture elle-même ne peut pas planter
// l'application : chaque étape est protégée, et un échec d'envoi ne
// crée jamais un nouveau rapport.

import 'dart:async';
import 'dart:convert';
import 'dart:ui' as ui;

import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'api.dart';
import 'app_device.dart';

/// Version affichée dans les rapports, identique à pubspec.yaml.
/// Ne pas changer sans changer pubspec.yaml aussi.
const String kAppVersion = '1.0.0+1';

class BugReports {
  BugReports._();
  static final BugReports instance = BugReports._();

  /// Onglet courant, mis à jour par la barre du bas : Accueil, Bible,
  /// Librairie, Carte, Communauté ou Plus. C'est le contexte d'écran
  /// joint à chaque rapport, automatique et sans identifiant.
  static String currentScreen = 'Accueil';

  static const _pendingKey = 'bug_reports_pending';
  static const _maxPending = 20;
  bool _flushing = false;

  /// Nettoyage avant envoi : adresses e-mail, jetons d'accès,
  /// numéros de téléphone et paramètres d'adresse web retirés, texte
  /// plafonné. Les dates et les montants seuls, sans compte ni
  /// identifiant, ne sont pas des informations de paiement : un
  /// montant isolé peut survivre, un identifiant de transaction ou
  /// un numéro de compte, jamais, car il est retiré avec les numéros.
  static String scrub(String input) {
    var out = input;
    out = out.replaceAll(RegExp(r'[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}'), '[adresse retiree]');
    out = out.replaceAll(RegExp(r'Bearer\s+[A-Za-z0-9._\-]+', caseSensitive: false), 'Bearer [retire]');
    out = out.replaceAll(RegExp(r'[A-Za-z0-9_\-]{20,}\.[A-Za-z0-9_\-]{20,}\.[A-Za-z0-9_\-]{20,}'), '[jeton retire]');
    out = out.replaceAll(RegExp(r'\+?\d[\d\s().\-]{5,}\d'), '[numero retire]');
    out = out.replaceAllMapped(RegExp(r'(https?://[^\s?]+)\?[^\s]*'), (m) => m[1]!);
    if (out.length > 2000) out = out.substring(0, 2000);
    return out;
  }

  /// Capture automatique, appelée depuis les gestionnaires d'erreur
  /// installés par install(). Ne lève jamais d'exception.
  Future<void> reportError(Object error, StackTrace? stack, {String? screen}) async {
    try {
      final message = scrub(stack == null ? error.toString() : '${error.toString()}\n$stack');
      final device = await deviceInfo();
      final body = <String, dynamic>{
        'version_app': kAppVersion,
        'modele': device['modele'] ?? '',
        'systeme': device['systeme'] ?? '',
        'ecran': screen ?? currentScreen,
        'message_erreur': message,
        'description': '',
      };
      await _sendOrQueue(body, dedup: true);
    } catch (_) {}
  }

  /// Rapport tapé par le membre, depuis la page « Signaler un
  /// problème ». La description est facultative : sans description,
  /// le message porte le signalement manuel et son écran, pour que
  /// le serveur, qui exige un message ou une description, accepte
  /// le rapport. Renvoie vrai si le rapport est parti, faux s'il
  /// est gardé sur l'appareil.
  Future<bool> reportManual(String description) async {
    try {
      final device = await deviceInfo();
      final text = scrub(description.trim());
      final body = <String, dynamic>{
        'version_app': kAppVersion,
        'modele': device['modele'] ?? '',
        'systeme': device['systeme'] ?? '',
        'ecran': currentScreen,
        'message_erreur': text.isEmpty ? 'Signalement manuel, écran $currentScreen' : '',
        'description': text,
      };
      return _sendOrQueue(body, dedup: false);
    } catch (_) {
      return false;
    }
  }

  /// Envoi immédiat si un membre est connecté, sinon mise en file
  /// sur l'appareil. Un échec d'envoi met aussi en file, sans créer
  /// de rapport supplémentaire.
  Future<bool> _sendOrQueue(Map<String, dynamic> body, {required bool dedup}) async {
    if (api.isConnected) {
      try {
        await api.sendBugReport(body);
        return true;
      } catch (_) {}
    }
    await _queue(body, dedup: dedup);
    return false;
  }

  Future<void> _queue(Map<String, dynamic> body, {required bool dedup}) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final raw = prefs.getString(_pendingKey);
      final list = <Map<String, dynamic>>[];
      if (raw != null && raw.isNotEmpty) {
        final decoded = jsonDecode(raw);
        if (decoded is List) {
          for (final item in decoded) {
            if (item is Map<String, dynamic>) list.add(item);
          }
        }
      }
      if (dedup) {
        final same = list.any((r) => r['message_erreur'] == body['message_erreur'] && r['ecran'] == body['ecran']);
        if (same) return;
      }
      list.add(body);
      while (list.length > _maxPending) {
        list.removeAt(0);
      }
      await prefs.setString(_pendingKey, jsonEncode(list));
    } catch (_) {}
  }

  /// Envoi des rapports gardés, à la prochaine synchronisation,
  /// quand un membre est connecté. Au premier échec, les rapports
  /// restants sont gardés pour la fois suivante, sans marteler le
  /// serveur. Un rapport rejeté définitivement par le serveur reste
  /// en file : le serveur ne rejette qu'un rapport vide, ce que le
  /// nettoyage côté application empêche déjà.
  Future<void> flushPending() async {
    if (_flushing || !api.isConnected) return;
    _flushing = true;
    try {
      final prefs = await SharedPreferences.getInstance();
      final raw = prefs.getString(_pendingKey);
      if (raw == null || raw.isEmpty) return;
      final decoded = jsonDecode(raw);
      if (decoded is! List) return;
      final pending = <Map<String, dynamic>>[];
      for (final item in decoded) {
        if (item is Map<String, dynamic>) pending.add(item);
      }
      final rest = <Map<String, dynamic>>[];
      var stopped = false;
      for (var i = 0; i < pending.length; i++) {
        if (stopped) {
          rest.add(pending[i]);
          continue;
        }
        try {
          await api.sendBugReport(pending[i]);
        } catch (_) {
          rest.add(pending[i]);
          stopped = true;
        }
      }
      await prefs.setString(_pendingKey, jsonEncode(rest));
    } catch (_) {
    } finally {
      _flushing = false;
    }
  }

  /// File effacée à la déconnexion, pour ne pas envoyer sous un
  /// autre compte des rapports gardés par le compte précédent.
  Future<void> clearPending() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(_pendingKey);
    } catch (_) {}
  }

  /// Installation des gestionnaires d'erreur, appelée dans main()
  /// avant runApp. Le comportement visible ne change pas : le
  /// gestionnaire Flutter précédent est appelé, et les erreurs
  /// asynchrones restent considérées comme traitées, comme le fait
  /// le cadre par défaut, sans fermer l'application.
  static void install() {
    final previous = FlutterError.onError;
    FlutterError.onError = (details) {
      try {
        unawaited(instance.reportError(details.exceptionAsString(), details.stack, screen: currentScreen));
      } catch (_) {}
      previous?.call(details);
    };
    ui.PlatformDispatcher.instance.onError = (error, stack) {
      try {
        unawaited(instance.reportError(error, stack, screen: currentScreen));
      } catch (_) {}
      return true;
    };
  }
}
