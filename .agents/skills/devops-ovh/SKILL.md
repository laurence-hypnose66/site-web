---
name: devops-ovh
description: Gestion des zones DNS OVH, liaison du nom de domaine, activation du certificat SSL et déploiement continu du site.
---

# Compétence : DevOps & Liaison OVH

Cette compétence gère la mise en ligne, le domaine et la liaison avec l'infrastructure OVH :

## Missions principales
1. **Gestion du Nom de Domaine chez OVH** :
   - Accompagnement pas-à-pas sur l'espace client OVH (Manager OVH).
   - Configuration de la Zone DNS :
     - Enregistrement `A` pointant vers l'IP du serveur / hébergement web.
     - Enregistrement `AAAA` pour l'IPv6.
     - Enregistrement `CNAME` pour le sous-domaine `www`.
     - Vérification de la propagation DNS via les commandes réseau (`dig`, `nslookup`).

2. **Sécurité & Certificat SSL** :
   - Activation du certificat SSL (Let's Encrypt ou SSL OVH).
   - Redirection automatique HTTP vers HTTPS (règle Apache `.htaccess` ou Nginx).
   - Sécurisation des headers HTTP (HSTS, X-Content-Type-Options, X-Frame-Options).

3. **Stratégie de Déploiement** :
   - Selon l'hébergement retenu chez OVH (Hébergement mutualisé ou VPS / Serveur) :
     - *Hébergement mutualisé OVH* : Déploiement sécurisé via SFTP ou script rsync automatisé.
     - *VPS / Serveur dédié* : Déploiement via SSH/Git avec rechargement automatique de Nginx/Caddy.
   - Script de déploiement en une seule commande dans le dossier `scripts/deploy.sh`.
