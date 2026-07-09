import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { CarImage } from "@/components/ui/CarImage";
import { VEHICLES } from "@/data/vehicles";
import { EASE } from "@/lib/utils";
import "./DimensionalGarage.css";

const GARAGE_SLUGS = ["mclaren-f1", "ferrari-f40", "bugatti-chiron-ss-300"];
const GARAGE = GARAGE_SLUGS.map((slug) => VEHICLES.find((vehicle) => vehicle.slug === slug)).filter(Boolean);

function CornerFrame() {
  return (
    <>
      <span className="garage-card__corner garage-card__corner--tl" />
      <span className="garage-card__corner garage-card__corner--tr" />
      <span className="garage-card__corner garage-card__corner--bl" />
      <span className="garage-card__corner garage-card__corner--br" />
    </>
  );
}

/**
 * Galerie 2D/3D sans dépendance : profondeur CSS, HUD, reflets et cartes en volume.
 * Elle renforce l'expérience véhicule après le hero OGL sans ajouter de coût bundle.
 */
export function DimensionalGarage() {
  const reduced = useReducedMotion();

  return (
    <section className="dimensional-garage hairline-t py-24 md:py-32">
      <div className="shell relative z-10">
        <div className="max-w-3xl">
          <p className="telemetry">Garage dimensionnel</p>
          <h2 className="mt-6 text-[clamp(2.5rem,7vw,5.7rem)] font-black uppercase leading-[0.9] tracking-tight">
            Les machines prennent du volume.
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-smoke md:text-base">
            Une vitrine pensée comme un scanner automobile : image 2D, profondeur 3D,
            reflets contrôlés et données techniques en premier plan.
          </p>
        </div>

        <div className="dimensional-garage__stage mt-14">
          <div className="dimensional-garage__rail grid gap-7 lg:grid-cols-3">
            {GARAGE.map((vehicle, index) => {
              if (!vehicle) return null;
              const tilt = index === 0 ? -6 : index === 2 ? 6 : 0;
              return (
                <motion.article
                  key={vehicle.slug}
                  className="garage-card group"
                  initial={reduced ? false : { opacity: 0, y: 42, rotateY: tilt * 1.6 }}
                  whileInView={reduced ? undefined : { opacity: 1, y: 0, rotateY: tilt }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.85, delay: index * 0.08, ease: EASE }}
                  whileHover={reduced ? undefined : { y: -10, rotateY: tilt * 0.45, rotateX: 2 }}
                >
                  <CarImage
                    src={vehicle.image}
                    alt={`${vehicle.brand} ${vehicle.name}`}
                    className="garage-card__image"
                    imgClassName="transition-transform duration-[1.2s] ease-vortex"
                  />
                  <div className="garage-card__fog" />
                  <CornerFrame />

                  <div className="garage-card__hud">
                    <div>
                      <p className="garage-card__brand">{vehicle.brand} — {vehicle.year}</p>
                      <h3 className="garage-card__name">{vehicle.name}</h3>
                    </div>
                    <div className="garage-card__specs">
                      <span>
                        puissance
                        <strong>{vehicle.powerCh} ch</strong>
                      </span>
                      <span>
                        pointe
                        <strong>{vehicle.topSpeedKmh} km/h</strong>
                      </span>
                      <span>
                        0—100
                        <strong>{vehicle.accelS}s</strong>
                      </span>
                    </div>
                    <Link
                      to={`/vehicules/${vehicle.slug}`}
                      className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/65 transition-colors hover:text-vortex"
                    >
                      ouvrir la fiche →
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
