# Guide Comparatif & Mise en Place : Hébergement & DNS OVH

Deux méthodes simples et adaptées pour mettre en ligne le site de Laurence :

---

## 🌟 Option A (Recommandée) : Hébergement direct via GitHub Pages + Domaine OVH

Dans ce scénario, le code est hébergé et servi gratuitement directement par GitHub Pages, et OVH ne sert que pour le nom de domaine (et les emails pro).

### Pourquoi c'est la meilleure option ?
1. **Zéro maintenance & Zéro coût** : Hébergement 100% gratuit, rapide et sécurisé.
2. **Déploiement automatique continu** : Dès qu'on fait `git push`, le workflow GitHub Actions met le site à jour en 10 secondes.
3. **Certificat SSL (HTTPS) automatique** : Renouvelé automatiquement par GitHub/Let's Encrypt sans aucune intervention.
4. **Indépendance** : Aucune limite de 10 Mo (contrairement à l'offre gratuite Start10M d'OVH).

### Comment faire le pointage DNS chez OVH ?
1. Sur **GitHub** (dans `rgcoachpro/Antigravity-site-Laurence` -> *Settings* -> *Pages*) :
   - Sélectionner **Source : GitHub Actions**.
   - Dans le champ **Custom domain**, renseigner le nom de domaine (ex: `www.laurence-hypnose66.fr`).
2. Sur l'espace client **OVH** (*Nom de domaine* -> *Zone DNS*) :
   - Ajouter un enregistrement **CNAME** pour `www` pointant vers : `rgcoachpro.github.io.`
   - Ajouter les enregistrements **A** pour le domaine racine vers les IP de GitHub Pages :
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

---

## 📦 Option B : Hébergement direct sur l'offre web OVH (Start10M ou Web Perso)

Tout achat de nom de domaine chez OVH inclut l'hébergement gratuit **Start10M** (10 Mo d'espace web + 1 adresse email 5 Go), ou une offre mutualisée Web Perso payante.

### Caractéristiques :
1. **Stockage** : 10 Mo (Start10M) ou 100 Go (Perso).
2. **Déploiement** : On dépose les fichiers du dossier `src/` dans le dossier `/www/` du serveur OVH via SFTP / FTP (ou via notre script `scripts/deploy-ovh-ftp.sh`).
3. **DNS** : Déjà pré-configuré par défaut chez OVH vers leur cluster d'hébergement.
4. **SSL** : À activer en 1 clic dans le Manager OVH (*Hébergement Web* -> onglet *Multisite* -> activer SSL -> régénérer le certificat Let's Encrypt).

---

## Résumé du choix

| Critère | Option A : GitHub Pages + Domaine OVH | Option B : Hébergement Web OVH |
| :--- | :--- | :--- |
| **Coût d'hébergement** | **0 €** (Inclus avec GitHub) | **0 €** (Start10M inclus avec le domaine) ou ~39 €/an (Perso) |
| **Mise à jour du site** | **Automatique** (1 `git push` met le site en ligne) | Via script FTP (`./scripts/deploy-ovh-ftp.sh`) ou FileZilla |
| **Certificat SSL (HTTPS)** | **Automatique** et instantané | À activer manuellement dans le manager OVH |
| **Limite de taille** | Aucune contrainte pratique | 10 Mo max pour Start10M (attention aux photos haute résolution) |
