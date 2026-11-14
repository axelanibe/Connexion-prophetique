package ci.connexionprophetique.app

import android.content.Context
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import java.io.File

// Carte 116, 9 nov. 2026 : la session ne doit pas survivre à une
// désinstallation. Les secrets (jetons api_access_token et
// api_refresh_token, empreinte locale du code d'accès à l'espace
// structure) vivent dans un fichier de préférences séparé, « auth_cp »,
// exclu de la sauvegarde par data_extraction_rules.xml et
// backup_rules.xml, jamais dans les préférences partagées sauvegardées.
// Le marqueur de première ouverture vit dans noBackupFilesDir, jamais
// sauvegardé, jamais restauré : il disparaît à la désinstallation et
// survit aux simples mises à jour.
class MainActivity: FlutterActivity() {
    private val canal = "connexionprophetique/app"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, canal).setMethodCallHandler { appel, resultat ->
            when (appel.method) {
                "authLire" -> {
                    val cle = appel.argument<String>("cle")
                    if (cle == null) {
                        resultat.error("ARGUMENT", "cle manquante", null)
                    } else {
                        val prefs = getSharedPreferences("auth_cp", Context.MODE_PRIVATE)
                        resultat.success(prefs.getString(cle, null))
                    }
                }
                "authEcrire" -> {
                    val cle = appel.argument<String>("cle")
                    val valeur = appel.argument<String>("valeur")
                    if (cle == null || valeur == null) {
                        resultat.error("ARGUMENT", "cle ou valeur manquante", null)
                    } else {
                        getSharedPreferences("auth_cp", Context.MODE_PRIVATE).edit().putString(cle, valeur).apply()
                        resultat.success(null)
                    }
                }
                "authEffacer" -> {
                    val cle = appel.argument<String>("cle")
                    if (cle == null) {
                        resultat.error("ARGUMENT", "cle manquante", null)
                    } else {
                        getSharedPreferences("auth_cp", Context.MODE_PRIVATE).edit().remove(cle).apply()
                        resultat.success(null)
                    }
                }
                "premierLancement" -> {
                    val marqueur = File(noBackupFilesDir, "installation.marqueur")
                    if (marqueur.exists()) {
                        resultat.success(false)
                    } else {
                        // Vrai seulement si le marqueur est bien posé,
                        // sinon faux pour ne jamais déconnecter le membre
                        // à chaque ouverture en cas d'échec.
                        val cree = try { marqueur.createNewFile() } catch (_: Exception) { false }
                        resultat.success(cree)
                    }
                }
                else -> resultat.notImplemented()
            }
        }
    }
}
