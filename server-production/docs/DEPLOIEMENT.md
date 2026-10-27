# Déploiement et migration de la base

## Ordre recommandé

1. Créer le compte Render au nom de la structure, puis le service web
   avec `render.yaml`, et la base PostgreSQL.
2. Remplir les secrets dans le tableau de bord Render uniquement :
   JWT_SECRET, WAVE_PAYMENT_LINK, WAVE_WEBHOOK_SECRET. Aucun secret
   dans le code, dans le chat, ni dans un dépôt public.
3. Appliquer le schéma : `psql "$DATABASE_URL" -f schema.sql`.
4. Créer l'administrateur général : `node server.js create-admin`.
5. Vérifier `/sante`, puis un parcours complet en test, avant tout
   paiement réel.

## Configuration pilotée par le serveur (modèle Desjardins, 27 oct. 2026)

GET /config, lecture publique, renvoie les textes d'accueil, les
libellés de base, les messages d'information et l'activation des
sections, avec les valeurs actuelles de l'application comme défauts.
PUT /admin/config, réservé à l'administrateur général, modifie ces
valeurs sans nouvelle APK : l'application les relit au démarrage et
à chaque synchronisation, et garde la dernière version en local
comme repli hors ligne. Aucun prix, aucun paiement, aucun texte
biblique ne passe par /config.

Valeurs modifiables (textes, 300 caractères maximum, ou sections,
objet de booléens) : accueil_salutation, titre_vie_spirituelle,
titre_explorer, titre_rendez_vous, titre_actualites,
message_visiteur, message_hors_ligne, message_aucune_actualite,
nav_accueil, nav_bible, nav_carte, nav_communaute, nav_plus,
sections (vie_spirituelle, explorer, verset_du_jour, quiz,
rendez_vous, actualites, priere).

Migration sur une base existante, à appliquer à la main, jamais
automatiquement par le démarrage (schema.sql n'est appliqué que si
la base est vide) : dans le Shell Render du service API, lancer
`psql "$DATABASE_URL" -c "CREATE TABLE IF NOT EXISTS config_app (cle text PRIMARY KEY, valeur jsonb NOT NULL, modifie_le timestamptz NOT NULL DEFAULT now());"`.
Sans cette migration, GET /config renvoie quand même les défauts,
et le premier PUT /admin/config crée la table lui-même. Cette
migration n'a pas été appliquée sur Render dans le cadre de cette
livraison : elle reste à appliquer par la structure, ou à laisser
au premier PUT.

Exemple de modification, avec un jeton administrateur général
(à obtenir par une connexion avec le compte administrateur, jamais
en clair en chat) :
`curl -X PUT https://connexion-prophetique.onrender.com/admin/config -H "Authorization: Bearer <jeton_admin>" -H "Content-Type: application/json" -d '{"titre_vie_spirituelle": "Ma vie spirituelle"}'`
Vérification sans nouvelle APK : GET /config doit renvoyer la
nouvelle valeur, puis rouvrir l'application (ou relancer la
synchronisation) : le titre doit changer, sans réinstaller.

## Ne pas laisser la production sur la base gratuite

La base gratuite Render expire après 30 jours, avec 14 jours de grâce.
Avant le lancement réel, passer à une base payante, ou migrer vers
une base équivalente avec sauvegardes automatiques.

Migration, sans perte :
1. Sauvegarder l'ancienne base avec `scripts/backup.sh`.
2. Créer la nouvelle base, appliquer `schema.sql`.
3. Restaurer : `gunzip -c sauvegarde.sql.gz | psql "$NOUVELLE_DATABASE_URL"`.
4. Changer DATABASE_URL dans Render, redémarrer, vérifier `/sante`
   et un compte membre existant, puis seulement couper l'ancienne base.

## Sauvegarde quotidienne

Lancer `scripts/backup.sh` chaque jour, avec DATABASE_URL en variable
d'environnement, et copier le fichier hors du serveur. Le script garde
les 30 dernières sauvegardes.
