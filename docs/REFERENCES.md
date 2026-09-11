# Références de conception retenues

- [Three.js car materials](https://threejs.org/examples/webgl_materials_car.html) — carrosserie lisible par la lumière et les matériaux, pas par une interface de configurateur envahissante.
- [React Three Fiber — scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance) — rendu à la demande, DPR plafonné et réduction de qualité sur appareils faibles. VORTEX applique ces principes à son shader OGL et le désactive sur mobile/reduced-motion.
- [Awwwards — Virtual Car Showroom](https://www.awwwards.com/inspiration/enter-car-transition-virtual-car-showroom) — transitions de caméra et traitement studio utilisés comme référence de rythme, sans reproduire le configurateur.
- [Avant — Luna Interfaces](https://www.lunainterfaces.com/projects/avant) — continuité entre rotation automobile, données techniques et storytelling au scroll.

Décision : conserver une couche WebGL très légère pour l'atmosphère desktop, employer une automobile SVG en perspective comme sujet stable et accessible, puis réserver la profondeur CSS aux scènes produit. Aucun modèle 3D externe ni asset à licence ambiguë n'est embarqué.
