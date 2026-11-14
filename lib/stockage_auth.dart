// CONNEXION PROPHÉTIQUE — Stockage des secrets de session, carte 116,
// 9 nov. 2026 : la session ne doit pas survivre à une désinstallation.
//
// Problème vérifié : après désinstallation et réinstallation, le compte
// restait connecté et l'écran d'accueil avec la photo n'apparaissait
// plus. Cause : les jetons de session étaient dans SharedPreferences,
// que la sauvegarde automatique Android restaure sur le compte Google
// du téléphone, car le manifeste ne définit pas allowBackup.
//
// Correctif : sur Android, les secrets (jetons api_access_token et
// api_refresh_token, empreinte locale du code d'accès à l'espace
// structure) vivent dans un fichier de préférences séparé, « auth_cp »,
// exclu de la sauvegarde par data_extraction_rules.xml et
// backup_rules.xml. Le reste des préférences (journal, taille du
// texte, réglages) reste dans le fichier partagé et reste sauvegardé.
// Sur le web, iOS et Windows, le comportement ne change pas : les
// secrets restent dans SharedPreferences, comme avant.
//
// Le jeton d'accès dure 15 minutes côté serveur, le jeton de
// rafraîchissement 30 jours : un jeton restauré gardait donc la
// session un mois après la réinstallation. La déconnexion efface
// déjà les deux jetons, ne pas y toucher.
//
// Ce fichier ne change pas le stockage vers le coffre chiffré,
// Axel a dit de garder le correctif comme il est, et l'application
// n'utilise pas l'API officielle Restore Credentials de Credential
// Manager, qui restaurerait la connexion exprès, l'inverse de ce
// qui est voulu ici.

import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Stockage des secrets de session, séparé des autres préférences
/// sur Android, repli SharedPreferences partout ailleurs.
class StockageAuth {
  static const MethodChannel _canal = MethodChannel('connexionprophetique/app');

  /// Vrai seulement sur Android téléphone, là où le canal natif existe.
  static bool get estNatif => !kIsWeb && defaultTargetPlatform == TargetPlatform.android;

  static Future<String?> lire(String cle) async {
    if (estNatif) {
      try {
        return await _canal.invokeMethod<String>('authLire', {'cle': cle});
      } catch (_) {
        // Canal indisponible : repli sur les préférences partagées,
        // la connexion continue de fonctionner, sans la protection
        // contre la restauration, plutôt que de bloquer l'ouverture.
      }
    }
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(cle);
  }

  static Future<void> ecrire(String cle, String valeur) async {
    if (estNatif) {
      try {
        await _canal.invokeMethod<void>('authEcrire', {'cle': cle, 'valeur': valeur});
        return;
      } catch (_) {
        // Repli ci-dessous, même raison que dans lire.
      }
    }
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(cle, valeur);
  }

  /// Efface la clé des deux stockages sur Android : le fichier séparé
  /// par le canal, et les préférences partagées où vivaient les
  /// anciennes clés avant la carte 116, pour ne rien laisser derrière.
  static Future<void> effacer(String cle) async {
    if (estNatif) {
      try {
        await _canal.invokeMethod<void>('authEffacer', {'cle': cle});
      } catch (_) {
        // Le retrait ci-dessous sert alors de repli, même raison
        // que dans lire.
      }
    }
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(cle);
  }

  /// Vrai une seule fois, au premier lancement après une installation.
  /// Le marqueur vit dans le dossier noBackupFilesDir d'Android, jamais
  /// sauvegardé, jamais restauré : il disparaît à la désinstallation et
  /// survit aux simples mises à jour. Hors Android, toujours faux.
  /// Faux aussi si le marqueur ne peut pas être posé, pour ne jamais
  /// déconnecter le membre à chaque ouverture en cas d'échec.
  static Future<bool> premierLancement() async {
    if (!estNatif) return false;
    try {
      return await _canal.invokeMethod<bool>('premierLancement') ?? false;
    } catch (_) {
      return false;
    }
  }
}
