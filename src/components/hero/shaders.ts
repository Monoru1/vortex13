/* ------------------------------------------------------------------------- */
/*  Sources GLSL du fond cinétique VORTEX.                                     */
/*                                                                             */
/*  Rendu : traits de lumière radiaux (« speed beams ») qui filent depuis un   */
/*  point de fuite, teinte rouge → blanc chaud, avec un léger heat-haze.       */
/*  Sortie en alpha droit (luminance) : le shader s'ajoute PAR-DESSUS la photo */
/*  du héros — zones calmes = transparentes (la voiture reste visible),        */
/*  faisceaux = lumière ajoutée. Aucun modèle 3D, coût par pixel minimal.      */
/* ------------------------------------------------------------------------- */

export const VERTEX = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

export const FRAGMENT = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;        // secondes
  uniform vec2  uResolution;  // largeur / hauteur (px CSS) — ratio seulement
  uniform vec2  uMouse;       // -1..1, lissé côté JS
  uniform float uIntensity;   // 0..1, fondu d'entrée + intensité globale

  // Hash bon marché — pas de texture, pas de boucle lourde.
  float hash(float n) { return fract(sin(n) * 43758.5453123); }
  float hash2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

  // Bruit de valeur (une seule évaluation) pour le heat-haze.
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash2(i);
    float b = hash2(i + vec2(1.0, 0.0));
    float c = hash2(i + vec2(0.0, 1.0));
    float d = hash2(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  void main() {
    // Coordonnées centrées, corrigées du ratio.
    vec2 uv = vUv - 0.5;
    uv.x *= uResolution.x / uResolution.y;

    // Point de fuite : dérive douce vers la souris (parallaxe / tilt showroom).
    vec2 vp = uMouse * 0.14;
    vec2 p = uv - vp;

    // Heat-haze : distorsion subtile du domaine.
    float haze = noise(uv * 3.0 + vec2(0.0, uTime * 0.15));
    p += (haze - 0.5) * 0.02;

    float r = length(p);
    float a = atan(p.y, p.x);

    // Faisceaux angulaires : 90 secteurs, chacun sa graine et sa vitesse.
    float slice = a / 6.28318530718 + 0.5;          // 0..1
    float sector = floor(slice * 90.0);
    float seed = hash(sector);

    // Défilement radial vers l'extérieur — sensation de vitesse.
    float streak = fract(seed * 7.0 - uTime * (0.35 + seed * 0.5) + r * 1.8);
    streak = smoothstep(0.55, 1.0, streak);

    // Tous les faisceaux ne s'allument pas : variation par secteur.
    float beamMask = smoothstep(0.35, 0.95, hash(sector + 11.0));
    float beams = streak * beamMask;

    // Cœur calme (lisibilité du texte) + extinction sur les bords.
    float coreFade = smoothstep(0.05, 0.34, r);
    float edgeFade = smoothstep(1.15, 0.42, r);
    beams *= coreFade * edgeFade;

    // Lueur de profondeur vers le point de fuite.
    float depth = exp(-r * 2.4) * 0.55;

    // Rampe chromatique : rouge VORTEX → blanc chaud sur les cœurs de faisceau.
    vec3 red = vec3(0.88, 0.02, 0.0);
    vec3 hot = vec3(1.0, 0.92, 0.86);

    vec3 col = red * depth;
    col += mix(red, hot, smoothstep(0.6, 1.0, beams)) * beams * 1.25;

    // Luminance → alpha droit : lumière ajoutée là où c'est brillant, sinon transparent.
    float lum = max(col.r, max(col.g, col.b));
    float alpha = clamp(lum * 1.4, 0.0, 1.0) * uIntensity;

    gl_FragColor = vec4(col * uIntensity, alpha);
  }
`;
