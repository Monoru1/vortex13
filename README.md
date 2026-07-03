# VORTEX Automotive Museum

Site vitrine premium d'un musée automobile fictif. React 18 · Vite 7 · TypeScript strict · Tailwind CSS · Framer Motion · React Router 6 · ESLint 9.

## Démarrage

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check (tsc -b) + build production dans dist/
npm run preview    # sert le build de production en local
npm run lint       # ESLint 9 (flat config) — 0 erreur, 0 avertissement
```

## Structure

```
src/
  components/
    fx/         Preloader (1 fois par session), curseur personnalisé
    layout/     Navbar intelligente, Footer, Layout (transitions + ancres)
    seo/        Métadonnées par page
    ui/         Reveal, SectionHeading, Counter, ButtonLink, CarImage, TiltCard
  data/         vehicles.ts (20 fiches), museum.ts (expos, agenda, FAQ, horaires…)
  lib/          hooks (scroll, thème, reduced-motion, lock body), utils
  pages/        Home, Collections, VehicleDetail, Exhibitions, Gallery, History, Contact, NotFound
public/
  _headers      CSP + en-têtes de sécurité (Netlify)
  _redirects    Fallback SPA
```

## Images & vidéo

Les visuels sont des **placeholders éditoriaux Unsplash** (URLs vérifiées), à remplacer
par la photothèque du client : éditer `img()` et les identifiants dans `src/data/`.
Le composant `CarImage` affiche une scène de lumière CSS si une image échoue.

Héro vidéo optionnel : déposer `public/hero.mp4` (H.264, ≤ 8 Mo conseillé, muet).
Sans fichier, le poster image en parallaxe prend le relais — jamais d'écran vide.

## Déploiement (Netlify)

Build command `npm run build`, publish directory `dist`. Les fichiers `_headers`
(CSP, HSTS, X-Frame-Options, Permissions-Policy) et `_redirects` sont copiés
automatiquement depuis `public/`.

## Accessibilité & mouvement

Lien d'évitement, focus visibles, dialogues piégés au clavier, `prefers-reduced-motion`
respecté globalement (CSS) et localement (Framer Motion). Thème sombre par défaut,
thème clair « galerie blanche » persistant.

---

Site fictif de démonstration — aucune billetterie réelle, aucune donnée transmise.
