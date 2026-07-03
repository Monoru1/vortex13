import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Flag, Gauge, Timer, Weight } from "lucide-react";
import { Seo } from "@/components/seo/Seo";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { CarImage } from "@/components/ui/CarImage";
import { CATEGORIES, VEHICLES, getVehicle } from "@/data/vehicles";
import { cn, nf, EASE } from "@/lib/utils";

/** Une cellule de télémétrie : la signature visuelle des fiches. */
function Spec({
  label,
  value,
  unit,
  icon,
  delay = 0,
}: {
  label: string;
  value: string;
  unit?: string;
  icon?: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} y={16} className="border-b border-r border-line p-5 md:p-7">
      <div className="flex items-center gap-2 text-smoke">
        {icon}
        <p className="font-mono text-[10px] uppercase tracking-[0.26em]">{label}</p>
      </div>
      <p className="mt-3 font-display text-2xl font-black uppercase tabular-nums leading-none tracking-tight md:text-4xl">
        {value}
        {unit && <span className="ml-1.5 font-mono text-xs font-normal tracking-widest text-smoke">{unit}</span>}
      </p>
    </Reveal>
  );
}

export default function VehicleDetail() {
  const { slug = "" } = useParams();
  const reduced = useReducedMotion();
  const vehicle = getVehicle(slug);

  const { accent, prev, next } = useMemo(() => {
    const index = VEHICLES.findIndex((v) => v.slug === slug);
    return {
      accent: CATEGORIES.find((c) => c.id === vehicle?.category)?.accent ?? "#E10600",
      prev: index > 0 ? VEHICLES[index - 1] : VEHICLES[VEHICLES.length - 1],
      next: index >= 0 && index < VEHICLES.length - 1 ? VEHICLES[index + 1] : VEHICLES[0],
    };
  }, [slug, vehicle]);

  if (!vehicle) return <Navigate to="/collections" replace />;

  const category = CATEGORIES.find((c) => c.id === vehicle.category)!;

  return (
    <>
      <Seo
        title={`${vehicle.brand} ${vehicle.name} (${vehicle.year})`}
        description={`${vehicle.tagline} — ${nf.format(vehicle.powerCh)} ch, ${nf.format(vehicle.topSpeedKmh)} km/h. Fiche complète : histoire, télémétrie, chronologie.`}
      />

      {/* ===== Hero ===== */}
      <header className="relative flex min-h-[86vh] items-end overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={reduced ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <CarImage
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.name} sous les lumières de la salle ${category.label}`}
            className="h-full w-full"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/20" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg/80 to-transparent" aria-hidden="true" />

        <div className="shell relative pb-14 pt-40">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                to={`/collections#${category.id}`}
                className="telemetry transition-colors hover:text-vortex"
                style={{ color: accent }}
              >
                {category.label}
              </Link>
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">
                {vehicle.country} · {vehicle.year} · {vehicle.production}
              </span>
            </div>
          </Reveal>
          <h1 className="mt-6 max-w-5xl text-[clamp(2.4rem,8.5vw,7.5rem)] font-black uppercase leading-[0.88] tracking-tight break-words">
            <RevealLines lines={[vehicle.brand, vehicle.name]} />
          </h1>
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-smoke">{vehicle.tagline}</p>
          </Reveal>
        </div>
      </header>

      {/* ===== Télémétrie ===== */}
      <section aria-label="Caractéristiques techniques" className="shell pb-6">
        <div className="grid grid-cols-2 border-l border-t border-line lg:grid-cols-4">
          <Spec label="Puissance" value={nf.format(vehicle.powerCh)} unit="ch" icon={<Gauge size={13} aria-hidden="true" />} />
          <Spec label="V. max" value={nf.format(vehicle.topSpeedKmh)} unit="km/h" icon={<Flag size={13} aria-hidden="true" />} delay={0.06} />
          <Spec label="0–100 km/h" value={vehicle.accelS.toLocaleString("fr-FR")} unit="s" icon={<Timer size={13} aria-hidden="true" />} delay={0.12} />
          <Spec label="Poids" value={nf.format(vehicle.weightKg)} unit="kg" icon={<Weight size={13} aria-hidden="true" />} delay={0.18} />
        </div>
        <div className="grid border-l border-line sm:grid-cols-3">
          <Spec label="Moteur" value={vehicle.engine} />
          <Spec label="Transmission" value={vehicle.transmission} delay={0.06} />
          <Spec label="Roues motrices" value={vehicle.drive} delay={0.12} />
        </div>
      </section>

      {/* ===== Histoire ===== */}
      <section className="shell grid gap-14 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="telemetry">L'histoire</p>
            <h2 className="mt-5 text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl">
              Pourquoi elle est ici
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal delay={0.1}>
            <p className="text-lg leading-[1.85] text-ink/90 md:text-xl">{vehicle.history}</p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {vehicle.anecdotes.map((a, i) => (
              <Reveal key={i} delay={0.15 + i * 0.08}>
                <figure className="glass h-full border border-line p-6">
                  <figcaption className="telemetry" style={{ color: accent }}>
                    Anecdote {String(i + 1).padStart(2, "0")}
                  </figcaption>
                  <p className="mt-4 text-sm leading-relaxed text-smoke">{a}</p>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Chronologie ===== */}
      <section aria-label="Chronologie" className="border-t border-line">
        <div className="shell py-24 md:py-32">
          <Reveal>
            <p className="telemetry">Chronologie</p>
          </Reveal>
          <ol className="mt-12 border-l border-line">
            {vehicle.timeline.map((t, i) => (
              <li key={t.year} className="relative pb-12 pl-10 last:pb-0 md:pl-16">
                <motion.span
                  className="absolute -left-px top-1 h-3.5 w-px bg-vortex"
                  initial={reduced ? false : { scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                  style={{ backgroundColor: accent }}
                  aria-hidden="true"
                />
                <Reveal delay={i * 0.08} y={14}>
                  <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-10">
                    <p className="font-mono text-sm tabular-nums text-smoke md:w-16">{t.year}</p>
                    <p className="max-w-2xl text-base leading-relaxed text-ink/90 md:text-lg">{t.event}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Navigation précédent / suivant ===== */}
      <nav aria-label="Autres véhicules" className="border-t border-line">
        <div className="grid md:grid-cols-2">
          {[
            { v: prev, dir: "prev" as const },
            { v: next, dir: "next" as const },
          ].map(({ v, dir }) => (
            <Link
              key={dir}
              to={`/vehicules/${v.slug}`}
              className={cn(
                "group relative overflow-hidden border-line py-16 md:py-20",
                dir === "next" && "border-t md:border-l md:border-t-0",
              )}
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-25">
                <CarImage src={v.image} alt="" className="h-full w-full" />
              </div>
              <div
                className={cn(
                  "relative mx-auto flex w-full max-w-[44rem] items-center gap-6 px-6",
                  dir === "next" && "flex-row-reverse text-right",
                )}
              >
                {dir === "prev" ? (
                  <ArrowLeft className="shrink-0 text-smoke transition-all duration-300 ease-vortex group-hover:-translate-x-2 group-hover:text-vortex" aria-hidden="true" />
                ) : (
                  <ArrowRight className="shrink-0 text-smoke transition-all duration-300 ease-vortex group-hover:translate-x-2 group-hover:text-vortex" aria-hidden="true" />
                )}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-smoke">
                    {dir === "prev" ? "Véhicule précédent" : "Véhicule suivant"}
                  </p>
                  <p className="mt-2 font-display text-xl font-black uppercase tracking-tight md:text-2xl">
                    {v.brand} {v.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
