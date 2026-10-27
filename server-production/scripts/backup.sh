#!/bin/sh
# Sauvegarde quotidienne de la base PostgreSQL de production.
# Usage : DATABASE_URL="postgres://..." ./scripts/backup.sh
# Le fichier est horodaté, à copier ensuite hors du serveur.
# À lancer chaque jour, par exemple avec un cron sur le serveur de sauvegarde,
# jamais avec le mot de passe écrit dans ce script.
set -eu
if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL manquante." >&2
  exit 1
fi
OUTDIR="${BACKUP_DIR:-./backups}"
mkdir -p "$OUTDIR"
STAMP=$(date +%Y-%m-%d_%H%M)
FILE="$OUTDIR/connexion-prophetique-$STAMP.sql.gz"
pg_dump "$DATABASE_URL" | gzip > "$FILE"
echo "Sauvegarde écrite : $FILE"
# Garder les 30 dernières sauvegardes, supprimer les plus anciennes.
ls -t "$OUTDIR"/connexion-prophetique-*.sql.gz | tail -n +31 | xargs -r rm --
