# VORTEX — Document de conception (Experience V2)

> Source de vérité de la direction artistique et technique.
> Principe directeur : **élévation chirurgicale**, pas reconstruction.
> On conserve ce qui est déjà bon, on ne reconstruit que ce qui empêche le niveau premium.

---

## 1. Audit du projet actuel

Stack : React 18 + Vite 7 + TypeScript + Tailwind 3 + Framer Motion, routing lazy par page,
déploiement Netlify. La donnée pilote l'UI (`data/vehicles.ts`, `data/museum.ts`).

Le code est propre, typé, documenté, cohérent. Ce n'est pas un chantier à raser :
c'est un socle premium à élever. Signature déjà présente : typographie « télémétrie » façon
HUD F1, thème carbone sombre, accent rouge `#E10600`, plan d'accès en SVG maison (zéro iframe
tierce, zéro cookie), CSP stricte, `prefers-reduced-motion` respecté partout, code splitting.

## 2. Forces

- Design system à tokens CSS (thème sombre/clair), cohérent d'un composant à l'autre.
- Accessibilité de base sérieuse : `focus-visible`, reduced-motion, ARIA.
- Performance saine : lazy routes, `manualChunks`, `overflow-x: clip` (fix scroll mobile).
- Confidentialité : carte SVG maison au lieu d'une iframe Google.
- Couche data propre : ajouter un véhicule = ajouter une entrée, pas une page.

## 3. Faiblesses

- **Hero** : c'était le point noir — il retombait sur une image statique (le `hero.mp4` référencé n'existait pas).
- `VortexAtmosphere` : speed-lines + blobs animés en boucle infinie, même hors-champ → coût CPU inutile.
- Métadonnées placeholder (`canonical` sur `example.com`, OG image Unsplash générique).
- Pages véhicules : encore des « fiches », pas des showrooms (cœur du chantier V2).
- Assets : photos Unsplash génériques — **c'est le vrai plafond du ressenti « matière »**, aucun shader ne le franchit sans vrais `.glb` premium ou un set photo dédié.

## 4. À conserver

Design system et tokens · CSP et `_headers` · routing + lazy loading · plan SVG maison ·
couche data · accessibilité de base · l'identité télémétrie/carbone/rouge.

## 5. À supprimer

Rien de mort à supprimer. Deux nettoyages ciblés : neutraliser l'animation permanente de
`VortexAtmosphere` hors-champ, et purger les métadonnées placeholder.

## 6. À reconstruire

- **Hero** → scène cinétique/hall immersif.
- **Pages véhicules** → système de showroom piloté par la donnée.
- **Transitions de page** → chorégraphie qui donne la sensation d'« avancer dans un lieu ».

## 7. Nouveau parcours utilisateur

Hall d'entrée (le Hero comme porte) → halle centrale (les 4 collections comme 4 ailes) →
showroom d'un véhicule → signature lumineuse de transition vers la machine suivante →
sortie / billetterie. Un fil continu. Le scroll fait *avancer dans un lieu*, il n'empile pas
des sections.

## 8. Nouvelle architecture des pages

- **Home** : hall → manifeste → aperçu collections → chiffres → expositions → pièces maîtresses → avis → visite.
- **Showroom véhicule** (`/vehicules/:slug`) : UN composant `Showroom`, piloté par un objet d'ambiance résolu depuis la donnée du véhicule.
- **Collections** : les 4 ailes, chacune sa teinte, en entrée du parcours showroom.

Modèle d'ambiance à ajouter à chaque véhicule ou dérivé de sa catégorie :

```ts
interface Ambiance {
  accent: string;
  grade: string;
  mood: "cold" | "warm" | "raw" | "electric";
  scanLabels: string[];
}
```

Résultat : la Chiron ne ressemble pas à la F40, depuis un seul composant maintenable.

## 9. Composants premium à créer

Validés en 2D :

- **Scanner technique** — passe lumineuse qui révèle les points techniques un par un.
- **HUD automobile** — crochets d'angle, bandeau télémétrie, jauge.
- **Plaque carbone / aluminium** — fiche technique gravée, données réelles.
- **Signature lumineuse** — transition entre deux véhicules.
- **Timeline moteur** — la donnée `timeline` existe déjà.
- **Galerie immersive** — profondeur, parallaxe.
- **Bouton magnétique** — micro-interaction CTA.

Écartés ou marqués « illusion 2D assumée » : cockpit, hologrammes, lumière volumétrique réelle.

## 10. Stratégie 2D / 3D

Profondeur par excellente 2D : couches, parallaxe, perspective, lumière. OGL uniquement si sa valeur visuelle justifie son coût. Pas de Three.js / R3F tant qu'il n'y a pas de `.glb` premium libre pour usage commercial.

## 11. Stratégie performance

Cible 60 FPS. DPR plafonné, shaders légers, `rAF` gelé hors-champ et sur onglet caché, montage WebGL après le premier paint, transforms GPU only. WebGL jamais monté sur mobile/tactile/reduced-motion.

## 12. Stratégie responsive

Mobile/tablette : repli statique enrichi, zéro WebGL, zéro boucle infinie. Parallaxe souris désactivée au tactile. Typo cinétique et HUD conservés partout.

## 13. Roadmap priorisée

| # | Étape | Statut |
|---|-------|--------|
| 1 | Hall d'entrée / Hero immersif | En cours |
| 2 | Showroom Chiron = gabarit du système d'ambiance | À développer |
| 3 | Généraliser l'ambiance à tout le catalogue | À faire |
| 4 | Transitions de page « signature lumineuse » | À faire |
| 5 | Design sonore ignition + toggle mute | En attente d'un `.mp3` fourni |
| 6 | Nettoyages : `VortexAtmosphere` hors-champ, métadonnées | À faire |
| 7 | Passe perf Lighthouse/CLS/LCP/TBT + QA mobile | À faire |

## Méthode

Une étape à la fois : audit → proposition → validation → dev → tests → build → déploiement.
