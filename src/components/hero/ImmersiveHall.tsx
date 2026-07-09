import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { img } from "@/data/vehicles";
import { EASE } from "@/lib/utils";
import "./ImmersiveHall.css";

const STATS = [
  ["Collection", "68 véhicules"],
  ["Pointe max", "490 km/h"],
  ["Doyenne", "1954"],
  ["Nations", "9 pays"],
];

const HALL_IMAGE = img("photo-1493238792000-8113da705763", 2200);

export function ImmersiveHall() {
  const reduced = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const letters = useMemo(() => "VORTEX".split(""), []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="immersive-hall" aria-label="Hall d'entrée VORTEX">
      <div className="immersive-hall__backdrop" aria-hidden="true">
        <img src={HALL_IMAGE} alt="" loading="eager" decoding="async" />
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
