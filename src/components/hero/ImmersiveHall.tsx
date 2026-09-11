import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/utils";
import { useInViewport, usePointerFine } from "@/lib/hooks";
import "./ImmersiveHall.css";

const SpeedShader = lazy(() => import("./SpeedShader").then((module) => ({ default: module.SpeedShader })));

const STATS = [
  ["Collection", "68 véhicules"],
  ["Pointe max", "490 km/h"],
  ["Doyenne", "1954"],
  ["Nations", "9 pays"],
];

export function ImmersiveHall() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const finePointer = usePointerFine();
  const inView = useInViewport(sectionRef, "160px");
  const [desktop, setDesktop] = useState(() => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches);
  const [entered, setEntered] = useState(false);
  const letters = useMemo(() => "VORTEX".split(""), []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = (event: MediaQueryListEvent) => setDesktop(event.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const webglEnabled = finePointer && desktop && !reduced;

  return (
    <section ref={sectionRef} className="immersive-hall" aria-label="Hall d'entrée VORTEX">
      <div className="immersive-hall__backdrop" aria-hidden="true" />
      {webglEnabled && (
        <Suspense fallback={null}>
          <SpeedShader active={inView} className="immersive-hall__webgl" />
        </Suspense>
      )}
      <div className="immersive-hall__machine" aria-hidden="true">
        <svg viewBox="0 0 1200 440" focusable="false">
          <defs>
            <linearGradient id="body-metal" x1="0" x2="1">
              <stop offset="0" stopColor="#08090a" />
              <stop offset="0.48" stopColor="#5b6065" />
              <stop offset="0.62" stopColor="#151719" />
              <stop offset="1" stopColor="#050506" />
            </linearGradient>
            <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#aeb9c2" stopOpacity=".42" />
              <stop offset="1" stopColor="#080a0d" stopOpacity=".94" />
            </linearGradient>
          </defs>
          <ellipse className="machine-shadow" cx="610" cy="380" rx="500" ry="38" />
          <path className="machine-body" fill="url(#body-metal)" d="M91 300c24-55 68-82 139-96l210-36c66-78 146-116 258-110 91 5 178 50 260 134l118 29c31 8 53 30 59 61l7 41-50 21H145l-70-20 16-24Z" />
          <path className="machine-glass" fill="url(#glass)" d="M467 171c58-65 128-92 221-87 72 4 145 39 215 106l-436-19Z" />
          <path className="machine-belt" d="M128 286c242-33 586-41 971-7" />
          <path className="machine-light" d="M978 222c49 6 83 17 112 39l-102 2" />
          <g className="machine-wheel" transform="translate(310 330)"><circle r="86" /><circle r="55" /><circle r="18" /><path d="M0-48V48M-42-24 42 24M-42 24 42-24" /></g>
          <g className="machine-wheel" transform="translate(920 330)"><circle r="86" /><circle r="55" /><circle r="18" /><path d="M0-48V48M-42-24 42 24M-42 24 42-24" /></g>
        </svg>
        <span className="immersive-hall__scan" />
      </div>
      <div className="immersive-hall__floor" aria-hidden="true" />
      <div className="immersive-hall__glow" aria-hidden="true" />
      {[14, 32, 50, 68, 86].map((left, index) => (
        <span
          key={left}
          aria-hidden="true"
          className="immersive-hall__beam"
          style={{ left: `${left}%`, opacity: 0.18 + (index % 3) * 0.06 }}
        />
      ))}

      <div className="shell immersive-hall__content">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <p className="telemetry text-white/70">Musée automobile — Paris, quais de Seine</p>
          <h1 className="immersive-hall__word mt-6 font-black uppercase text-white" aria-label="VORTEX">
            {letters.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                aria-hidden="true"
                className={`immersive-hall__letter ${entered || reduced ? "is-in" : ""}`}
                style={{ animationDelay: `${0.12 + index * 0.07}s` }}
              >
                {letter}
              </span>
            ))}
          </h1>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.75, ease: EASE }}
            className="immersive-hall__sub mt-6 text-base leading-relaxed md:text-lg"
          >
            Vous n'ouvrez pas un site. Vous poussez les portes d'une halle où chaque machine
            démarre encore. Entrez : la première salle vibre déjà à 490 km/h.
          </motion.p>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.75, ease: EASE }}
            className="immersive-hall__actions mt-9"
          >
            <Link
              to="/vehicules/bugatti-chiron-ss-300"
              className="inline-flex items-center gap-3 bg-vortex px-6 py-4 font-mono text-xs uppercase tracking-[0.22em] text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#ff1a13]"
            >
              Entrer dans la halle <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/collections"
              className="inline-flex items-center border border-white/20 px-6 py-4 font-mono text-xs uppercase tracking-[0.22em] text-white/75 transition-colors hover:border-vortex hover:text-vortex"
            >
              Explorer les ailes
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="immersive-hall__hud">
        <div className="shell immersive-hall__hud-inner">
          {STATS.map(([label, value]) => (
            <p key={label} className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
              {label} <span className="ml-2 text-white/90">{value}</span>
            </p>
          ))}
          <span className="text-vortex" aria-hidden="true">▾</span>
        </div>
      </div>
    </section>
  );
}
