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
# Chiffrement, recommandé : la sauvegarde contient noms, numéros et
# e-mails des membres, elle ne doit jamais circuler en clair.
# BACKUP_PASSPHRASE gardée hors du script, jamais écrite ici.
if [ -n "${BACKUP_PASSPHRASE:-}" ] && command -v gpg >/dev/null 2>&1; then
  gpg --batch --yes --passphrase "$BACKUP_PASSPHRASE" --symmetric --cipher-algo AES256 -o "$FILE.gpg" "$FILE"
  rm -f "$FILE"
  echo "Sauvegarde chiffrée écrite : $FILE.gpg"
else
  echo "Attention : sauvegarde non chiffrée (BACKUP_PASSPHRASE absente ou gpg absent)."
  echo "Sauvegarde écrite : $FILE"
fi
# Garder les 30 dernières sauvegardes, supprimer les plus anciennes.
ls -t "$OUTDIR"/connexion-prophetique-*.sql.gz* 2>/dev/null | tail -n +31 | xargs -r rm --
