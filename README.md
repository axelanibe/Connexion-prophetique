# CONNEXION PROPHÉTIQUE — Application Flutter

Application native Flutter, une seule base de code pour Android, iOS et web.
Carte de membre avec QR, Bible, quiz, camps, dons, établissements, Bureau, librairie, en français et en anglais.

## Paiement

Paiement Wave Business direct, sans agrégateur. Un paiement n'est jamais marqué payé sur le seul numéro, le retour de navigateur ou une capture : seule une confirmation vérifiée, ou la validation explicite de la structure après contrôle de son compte Wave, débloque le statut payé et la facture.

Aucun secret, aucune clé API, aucun identifiant de compte marchand ne figure dans ce code. Les secrets vivent côté serveur uniquement.

## Construction de l'APK de test

Le flux GitHub Actions `.github/workflows/flutter.yml` analyse le code, construit l'APK de test en débogage, et le dépose en pièce jointe du flux.

```bash
flutter pub get
flutter analyze
flutter build apk --debug
```

Note : dans ce dépôt, les fichiers binaires (logo officiel, icônes de lancement, jar du wrapper Gradle) ne sont pas poussés par l'outil Muse, qui ne pousse que du texte. Le flux les régénère en espace réservé pour que la construction aboutisse, et le jar du wrapper est téléchargé depuis le dépôt Gradle. Le logo officiel doit être remis dans `assets/logo.png` avant toute version de diffusion.
