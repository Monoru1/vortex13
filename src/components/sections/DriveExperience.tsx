import { motion, useReducedMotion } from "framer-motion";
import { Gauge, MoveRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { CarImage } from "@/components/ui/CarImage";
import { VEHICLES } from "@/data/vehicles";
import { EASE } from "@/lib/utils";

const HERO_CAR = VEHICLES.find((vehicle) => vehicle.slug === "bugatti-chiron-ss-300") ?? VEHICLES[0];

const TELEMETRY = [
  ["Vitesse", `${HERO_CAR.topSpeedKmh} km/h`],
  ["Puissance", `${HERO_CAR.powerCh} ch`],
  ["0—100", `${HERO_CAR.accelS}s`],
];

/**
 * Expérience voiture sans WebGL : perspective CSS, HUD et route animée.
 * Objectif : sensation de cockpit/showroom, coût GPU très raisonnable.
 */
export function DriveExperience() {
  const reduced = useReducedMotion();

  return (
    <section className="drive-experience hairline-t relative overflow-hidden py-24 md:py-32">
      <div className="drive-experience__light" aria-hidden="true" />

      <div className="shell relative z-10 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="telemetry">Expérience immersive</p>
          <h2 className="mt-6 max-w-2xl text-[clamp(2.6rem,7vw,6rem)] font-black uppercase leading-[0.9] tracking-tight">
            Entrez dans la machine.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-smoke md:text-lg">
            VORTEX ne doit pas seulement montrer des voitures. Le site doit donner l'impression
            d'être assis dans le cockpit avant même d'acheter un billet.
          </p>

          <div className="mt-9 grid max-w-xl grid-cols-3 overflow-hidden border border-line bg-black/25 backdrop-blur md:mt-10">
            {TELEMETRY.map(([label, value]) => (
              <div key={label} className="border-r border-line p-4 last:border-r-0 md:p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/40">{label}</p>
                <p className="mt-2 font-display text-lg font-black uppercase tracking-tight text-white md:text-2xl">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <Link
            to={`/vehicules/${HERO_CAR.slug}`}
            className="group mt-9 inline-flex items-center gap-3 border border-white/20 bg-white px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-black transition-transform duration-300 hover:-translate-y-0.5 hover:bg-vortex hover:text-white md:mt-10"
          >
            Voir la fiche machine
            <MoveRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.div
          className="drive-stage"
          initial={reduced ? false : { opacity: 0, y: 40, rotateX: 6 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="drive-stage__road" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <motion.div
            className="drive-card group"
            animate={reduced ? undefined : { y: [0, -8, 0], rotateY: [-2, 2, -2] }}
            transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <CarImage
              src={HERO_CAR.image}
              alt={`${HERO_CAR.brand} ${HERO_CAR.name}`}
              className="aspect-[16/10] rounded-[1.35rem]"
              imgClassName="object-center"
              priority
            />
            <div className="drive-card__plate">
              <span>{HERO_CAR.brand}</span>
              <strong>{HERO_CAR.name}</strong>
            </div>
            <div className="drive-card__hud drive-card__hud--left">
              <Gauge size={15} />
              <span>TRACK MODE</span>
            </div>
            <div className="drive-card__hud drive-card__hud--right">
              <Zap size={15} />
              <span>ACTIVE AERO</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
