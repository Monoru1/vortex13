# Politique de sécurité — VORTEX Automotive Museum

## Surface d'attaque

Site 100 % statique (SPA sans backend) : pas de base de données, pas de session,
pas de secret côté client, aucune variable d'environnement exposée.
`npm audit` : 0 vulnérabilité (dépendances de production).

## En-têtes HTTP (`public/_headers`, appliqués par Netlify)

- **Content-Security-Policy** : `default-src 'self'` ; images limitées à `self`,
  `data:` et `images.unsplash.com` ; polices et styles limités à Google Fonts ;
  `frame-ancestors 'none'` ; `object-src 'none'` ; `base-uri 'self'` ;
  `form-action 'self'` ; `upgrade-insecure-requests`.
- **Strict-Transport-Security** : 1 an, includeSubDomains, preload.
- **X-Frame-Options** : DENY (anti-clickjacking, doublon défensif de la CSP).
- **X-Content-Type-Options** : nosniff.
- **Referrer-Policy** : strict-origin-when-cross-origin.
- **Permissions-Policy** : caméra, micro, géolocalisation désactivés.

## XSS & entrées utilisateur

- Aucun `dangerouslySetInnerHTML` dans le code applicatif.
- React échappe l'ensemble du rendu par défaut.
- Toute entrée (recherche, formulaire) passe par `sanitize()` (suppression des
  chevrons + trim) **avant** validation et **avant** tout ré-affichage.
- Validation stricte côté client : longueurs min/max, regex e-mail, `maxLength`
  sur chaque champ.
- **Honeypot** anti-bot sur le formulaire de contact (champ hors écran,
  `tabIndex=-1`, exclu des lecteurs d'écran) : s'il est rempli, la soumission
  est silencieusement ignorée.

## Tiers

- Aucune iframe tierce : la carte d'accès est un **SVG maison** (zéro cookie,
  zéro requête externe, compatible CSP stricte).
- Seuls domaines externes : Google Fonts (preconnect) et Unsplash (images de
  démonstration, à remplacer par des assets `self` en production — la CSP
  pourra alors être resserrée d'un cran).

## Signalement

Vulnérabilité suspectée : security@vortex-museum.fr (fictif — adapter au client).
Réponse sous 72 h, correctif prioritaire sur toute autre tâche.
