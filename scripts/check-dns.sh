#!/bin/bash
# Script de vérification DNS pour le domaine OVH
# Utilisation : ./scripts/check-dns.sh votredomaine.fr

DOMAIN=${1:-""}

if [ -z "$DOMAIN" ]; then
  echo "Usage: ./scripts/check-dns.sh votredomaine.fr"
  exit 1
fi

echo "=================================================="
echo "🔍 Vérification DNS pour le domaine : $DOMAIN"
echo "=================================================="

echo ""
echo "👉 Enregistrement A (IPv4) :"
dig +short A "$DOMAIN"

echo ""
echo "👉 Enregistrement AAAA (IPv6) :"
dig +short AAAA "$DOMAIN"

echo ""
echo "👉 Enregistrement CNAME pour www.$DOMAIN :"
dig +short CNAME "www.$DOMAIN"

echo ""
echo "👉 Serveurs de noms (NS) déclarés :"
dig +short NS "$DOMAIN"

echo ""
echo "👉 Test de réponse HTTP :"
curl -Is "http://$DOMAIN" | head -n 5 2>/dev/null || echo "Le serveur ne répond pas encore en HTTP."

echo ""
echo "👉 Test de réponse HTTPS :"
curl -Is "https://$DOMAIN" | head -n 5 2>/dev/null || echo "Certificat SSL ou HTTPS non encore accessible."

echo ""
echo "=================================================="
