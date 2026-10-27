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
