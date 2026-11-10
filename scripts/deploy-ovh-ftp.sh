#!/bin/bash
# Script de déploiement automatique vers l'hébergement web OVH (Start10M ou Perso) via lftp ou curl
# Nécessite un fichier .env avec :
# OVH_FTP_HOST="ftp.clusterXXX.hosting.ovh.net"
# OVH_FTP_USER="votre-identifiant-ovh"
# OVH_FTP_PASS="votre-mot-de-passe-ftp"

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ -f "$DIR/.env" ]; then
  # Charger les variables du fichier .env
  export $(grep -v '^#' "$DIR/.env" | xargs)
else
  echo "❌ Erreur : Fichier .env introuvable dans la racine du projet."
  echo "Créez un fichier .env avec OVH_FTP_HOST, OVH_FTP_USER et OVH_FTP_PASS."
  exit 1
fi

if [ -z "$OVH_FTP_HOST" ] || [ -z "$OVH_FTP_USER" ] || [ -z "$OVH_FTP_PASS" ]; then
  echo "❌ Erreur : Veuillez renseigner OVH_FTP_HOST, OVH_FTP_USER et OVH_FTP_PASS dans le fichier .env."
  exit 1
fi

echo "🚀 Déploiement des fichiers du dossier src/ vers OVH ($OVH_FTP_HOST)..."

if command -v lftp >/dev/null 2>&1; then
  lftp -u "$OVH_FTP_USER","$OVH_FTP_PASS" "$OVH_FTP_HOST" <<EOF
set ssl:verify-certificate no
mirror -R --delete --verbose "$DIR/src/" /www/
bye
EOF
  echo "✅ Déploiement terminé avec succès via lftp !"
else
  echo "⚠️ lftp n'est pas installé. Utilisation du téléversement via curl..."
  cd "$DIR/src"
  find . -type f | while read -r file; do
    clean_file="${file#./}"
    echo "Uploading $clean_file..."
    curl --ftp-create-dirs -T "$clean_file" -u "$OVH_FTP_USER:$OVH_FTP_PASS" "ftp://$OVH_FTP_HOST/www/$clean_file"
  done
  echo "✅ Déploiement terminé avec succès via curl !"
fi
