import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import { VERTEX, FRAGMENT } from "./shaders";

interface SpeedShaderProps {
  /** Boucle de rendu active uniquement quand le héros est visible. */
  active: boolean;
  className?: string;
}

/**
 * Fond cinétique WebGL, autonome et léger (OGL, un seul quad plein écran).
 *
 * Garde-fous performance :
 *  - DPR plafonné (jamais de rendu 3× sur écran Retina) ;
 *  - `requestAnimationFrame` gelé hors-champ (`active`) et onglet caché ;
 *  - contexte relâché proprement au démontage.
 *
 * Le composant ne se monte QUE côté pointeur fin + desktop + hors reduced-motion :
 * cette décision est prise par le parent (HeroVortex), pas ici.
 */
export function SpeedShader({ active, className }: SpeedShaderProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const container = host;

    // DPR plafonné : netteté suffisante, coût maîtrisé.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let renderer: Renderer;
    try {
      renderer = new Renderer({ dpr, alpha: true, premultipliedAlpha: false, antialias: false });
    } catch {
      return; // WebGL indisponible : le parent garde le repli statique.
    }

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const canvas = gl.canvas;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [1, 1] },
        uMouse: { value: [0, 0] },
        uIntensity: { value: 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [w, h];
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Souris lissée : cible immédiate, valeur interpolée dans la boucle.
    const target = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    function onPointerMove(e: PointerEvent) {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let raf = 0;
    let last = performance.now();
    const start = last;

    function frame(now: number) {
      raf = requestAnimationFrame(frame);

      // Gel hors-champ / onglet caché : zéro travail GPU.
      if (!activeRef.current || document.hidden) {
        last = now;
        return;
      }

      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      smooth.x += (target.x - smooth.x) * Math.min(dt * 3, 1);
      smooth.y += (target.y - smooth.y) * Math.min(dt * 3, 1);

      const u = program.uniforms;
      u.uTime.value = (now - start) / 1000;
      u.uMouse.value = [smooth.x, smooth.y];
      // Fondu d'entrée ~1.4 s, puis maintien à 1.
      u.uIntensity.value = Math.min((u.uIntensity.value as number) + dt / 1.4, 1);

      renderer.render({ scene: mesh });
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      if (canvas.parentNode === container) container.removeChild(canvas);
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" className={className} />;
}
