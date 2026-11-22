// CONNEXION PROPHÉTIQUE — Stockage des secrets de session, carte 116
// puis analyse de sécurité du 22 nov. 2026, constat C-2.
//
// Les secrets (jetons api_access_token et api_refresh_token, jeton
// FCM push_fcm_token, clé dérivée et sel de la sauvegarde) vivent
// dans le coffre du système, flutter_secure_storage : Keystore
// Android (EncryptedSharedPreferences), Keychain iOS. Plus rien
// en clair dans SharedPreferences.
//
// Migration, à la première lecture d'une clé : si le coffre est
// vide, l'ancien emplacement est lu une fois, canal natif Android
// auth_cp pour les anciennes clés, puis SharedPreferences, copié
// dans le coffre, puis effacé de l'ancien emplacement. Une seule
// tentative par clé et par démarrage.
//
// Limite restante, web : le plugin utilise localStorage par
// limitation de la plateforme, sans chiffrement. La sortie de
// localStorage vers un cookie HttpOnly côté serveur est un suivi
// à décider par Axel, pas dans ce chantier.
//
// Sur Android, il n'y a plus de repli silencieux vers
// SharedPreferences : une écriture ou une lecture passe par le
// coffre, un échec du coffre se voit, il ne retombe pas en clair.
// Le fichier du coffre, FlutterSecureStorage.xml, est exclu de la
// sauvegarde Android comme auth_cp.xml avant lui.

import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Stockage des secrets de session, dans le coffre du système.
class StockageAuth {
  static const MethodChannel _canal = MethodChannel('connexionprophetique/app');

  /// Coffre du système. Android : EncryptedSharedPreferences
  /// (Keystore) ; iOS : Keychain, accessible dès le premier
  /// déverrouillage ; web : localStorage, sans chiffrement,
  /// voir la limite notée en tête de fichier.
  static const _coffre = FlutterSecureStorage(
    aOptions: AndroidOptions(encryptedSharedPreferences: true),
    iOptions: IOSOptions(accessibility: KeychainAccessibility.first_unlock),
  );

  /// Vrai seulement sur Android téléphone, là où le canal natif existe.
  static bool get estNatif => !kIsWeb && defaultTargetPlatform == TargetPlatform.android;

  /// Clés déjà migrées pendant ce démarrage, pour ne tenter
  /// la migration qu'une fois par clé.
  static final _migrees = <String>{};

  static Future<String?> lire(String cle) async {
    final valeur = await _coffre.read(key: cle);
    if (valeur != null) return valeur;
    return _migrerAncien(cle);
  }

  /// Lit l'ancien emplacement une fois, copie dans le coffre,
  /// puis efface l'ancien. Null quand rien n'y est.
  static Future<String?> _migrerAncien(String cle) async {
    if (!_migrees.add(cle)) return null;
    try {
      String? ancien;
      if (estNatif) {
        try {
          ancien = await _canal.invokeMethod<String>('authLire', {'cle': cle});
        } catch (_) {
          // Canal indisponible : on essaie les préférences
          // partagées ci-dessous, sans bloquer.
        }
        if (ancien != null) {
          try {
            await _canal.invokeMethod<void>('authEffacer', {'cle': cle});
          } catch (_) {}
        }
      }
      ancien ??= (await SharedPreferences.getInstance()).getString(cle);
      if (ancien == null) return null;
      try {
        await (await SharedPreferences.getInstance()).remove(cle);
      } catch (_) {}
      await _coffre.write(key: cle, value: ancien);
      return ancien;
    } catch (_) {
      return null;
    }
  }

  static Future<void> ecrire(String cle, String valeur) async {
    await _coffre.write(key: cle, value: valeur);
  }

  /// Efface la clé du coffre, et des anciens emplacements où
  /// elle pouvait vivre avant la migration, pour ne rien
  /// laisser derrière.
  static Future<void> effacer(String cle) async {
    await _coffre.delete(key: cle);
    if (estNatif) {
      try {
        await _canal.invokeMethod<void>('authEffacer', {'cle': cle});
      } catch (_) {}
    }
    try {
      await (await SharedPreferences.getInstance()).remove(cle);
    } catch (_) {}
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
