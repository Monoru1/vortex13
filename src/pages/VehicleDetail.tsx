import { useMemo, useState, type CSSProperties } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Seo } from "@/components/seo/Seo";
import { Reveal } from "@/components/ui/Reveal";
import { CarImage } from "@/components/ui/CarImage";
import { CATEGORIES, VEHICLES, getVehicle, type CategoryId } from "@/data/vehicles";
import { cn, nf, EASE } from "@/lib/utils";
import "./VehicleShowroom.css";

interface RoomAmbiance {
  accent: string;
  deep: string;
  mood: string;
  labels: string[];
  points: Array<{ left: number; top: number; label: string }>;
}

const CATEGORY_AMBIANCE: Record<CategoryId, RoomAmbiance> = {
  classiques: {
    accent: "#C8A96A",
    deep: "#2D2110",
    mood: "warm heritage",
    labels: ["aluminium", "cuir", "bois", "acier poli"],
    points: [
      { left: 24, top: 46, label: "Carrosserie historique" },
      { left: 44, top: 34, label: "Signature mécanique" },
      { left: 64, top: 58, label: "Habitacle analogique" },
      { left: 78, top: 68, label: "Propulsion pure" },
    ],
  },
  supercars: {
    accent: "#E10600",
    deep: "#330904",
    mood: "raw poster car",
    labels: ["moteur central", "ligne basse", "aéro brute", "icône"],
    points: [
      { left: 25, top: 48, label: "Moteur central" },
      { left: 48, top: 35, label: "Aéro analogique" },
      { left: 62, top: 59, label: "Châssis léger" },
      { left: 78, top: 64, label: "Silhouette icône" },
    ],
  },
  hypercars: {
    accent: "#43B4FF",
    deep: "#0A2740",
    mood: "cold electric precision",
    labels: ["carbone", "LED", "aéro active", "télémétrie"],
    points: [
      { left: 24, top: 44, label: "Moteur haute pression" },
      { left: 44, top: 32, label: "Aéro active" },
      { left: 58, top: 58, label: "Carbone intégral" },
      { left: 72, top: 66, label: "Freins carbone-céramique" },
      { left: 83, top: 40, label: "Pointe extrême" },
    ],
  },
  concept: {
    accent: "#9C7BD8",
    deep: "#1B1230",
    mood: "experimental future",
    labels: ["prototype", "matière", "laboratoire", "vision"],
    points: [
      { left: 25, top: 44, label: "Architecture expérimentale" },
      { left: 45, top: 32, label: "Langage futuriste" },
      { left: 60, top: 58, label: "Matériaux laboratoire" },
      { left: 78, top: 64, label: "Exemplaire rare" },
    ],
  },
};

function FrameCorners() {
  return (
    <>
      <span className="vehicle-room__frame vehicle-room__frame--tl" />
      <span className="vehicle-room__frame vehicle-room__frame--tr" />
      <span className="vehicle-room__frame vehicle-room__frame--bl" />
      <span className="vehicle-room__frame vehicle-room__frame--br" />
    </>
  );
}

export default function VehicleDetail() {
  const { slug = "" } = useParams();
  const reduced = useReducedMotion();
  const [scanned, setScanned] = useState(false);
  const vehicle = getVehicle(slug);

  const { accent, prev, next } = useMemo(() => {
    const index = VEHICLES.findIndex((v) => v.slug === slug);
    return {
      accent: vehicle ? CATEGORY_AMBIANCE[vehicle.category].accent : "#E10600",
      prev: index > 0 ? VEHICLES[index - 1] : VEHICLES[VEHICLES.length - 1],
      next: index >= 0 && index < VEHICLES.length - 1 ? VEHICLES[index + 1] : VEHICLES[0],
    };
  }, [slug, vehicle]);

  if (!vehicle) return <Navigate to="/collections" replace />;

  const category = CATEGORIES.find((c) => c.id === vehicle.category)!;
  const ambiance = CATEGORY_AMBIANCE[vehicle.category];
  const roomStyle = {
    "--room-accent": ambiance.accent,
    "--room-deep": ambiance.deep,
  } as CSSProperties;

  return (
    <>
      <Seo
        title={`${vehicle.brand} ${vehicle.name} (${vehicle.year})`}
        description={`${vehicle.tagline} — ${nf.format(vehicle.powerCh)} ch, ${nf.format(vehicle.topSpeedKmh)} km/h. Showroom immersif : histoire, télémétrie, chronologie.`}
      />

      <header
        className={cn("vehicle-room", scanned && "is-scanning")}
        style={roomStyle}
        aria-label={`Showroom ${vehicle.brand} ${vehicle.name}`}
      >
        <motion.div
          className="vehicle-room__image"
          initial={reduced ? false : { scale: 1.12 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <CarImage
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.name} sous les lumières de la salle ${category.label}`}
            className="h-full w-full"
            priority
          />
        </motion.div>

        <div className="vehicle-room__grade" aria-hidden="true" />
        <div className="vehicle-room__veil" aria-hidden="true" />
        <div className="vehicle-room__floor" aria-hidden="true" />
        <div className="vehicle-room__scanline" aria-hidden="true" />
        <FrameCorners />

        {ambiance.points.map((point, index) => (
          <span
            key={point.label}
            className={cn("vehicle-hotspot", (scanned || reduced) && "is-on")}
            style={{ left: `${point.left}%`, top: `${point.top}%`, transitionDelay: scanned && !reduced ? `${index * 120}ms` : "0ms" }}
          >
            <span className="vehicle-hotspot__dot" />
            <span className="vehicle-hotspot__label">{point.label}</span>
          </span>
        ))}

        <div className="shell vehicle-room__content grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            <Link
              to={`/collections#${category.id}`}
              className="telemetry transition-colors"
              style={{ color: ambiance.accent }}
            >
              Salle {category.label} · {ambiance.mood}
            </Link>
            <h1 className="vehicle-room__title mt-5 max-w-4xl font-black uppercase text-white">
              {vehicle.brand}
              <br />
              {vehicle.name}
            </h1>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-white/60">
              {vehicle.year} · {vehicle.country} · {vehicle.production}
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/72 md:text-lg">
              {vehicle.tagline}
            </p>
            <button
              type="button"
              onClick={() => setScanned((value) => !value)}
              className="mt-8 inline-flex items-center gap-3 border px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] transition-transform duration-300 hover:-translate-y-0.5"
              style={{ borderColor: ambiance.accent, color: ambiance.accent }}
            >
              <span aria-hidden="true">⊹</span>
              {scanned ? "Masquer le scanner" : "Scanner le véhicule"}
            </button>
          </motion.div>

          <aside className="tech-plate relative z-10" aria-label={`Plaque technique ${vehicle.brand} ${vehicle.name}`}>
            <div className="tech-plate__cap">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/55">Fiche technique</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: ambiance.accent }}>VTX / {vehicle.year}</span>
            </div>
            {[
              ["Moteur", vehicle.engine],
              ["Puissance", `${nf.format(vehicle.powerCh)} ch`],
              ["Vitesse", `${nf.format(vehicle.topSpeedKmh)} km/h`],
              ["0 — 100", `${vehicle.accelS.toLocaleString("fr-FR")} s`],
              ["Poids", `${nf.format(vehicle.weightKg)} kg`],
              ["Transmission", vehicle.transmission],
            ].map(([label, value]) => (
              <div key={label} className="tech-plate__row">
                <span className="tech-plate__label">{label}</span>
                <strong className="tech-plate__value">{value}</strong>
              </div>
            ))}
            <p className="p-4 font-mono text-[10px] leading-relaxed tracking-[0.08em]" style={{ color: ambiance.accent }}>
              ▸ {ambiance.labels.join(" · ")}<br />▸ Production : {vehicle.production}
            </p>
          </aside>
        </div>

        <div className="vehicle-hud-bar">
          <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">Régime <b className="text-white">{vehicle.engine.split(",")[0]}</b></span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">Couple <b style={{ color: ambiance.accent }}>Télémétrie active</b></span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">Statut <b className="text-white">En état de marche</b></span>
          </div>
        </div>
      </header>

      <main className="vehicle-room__below">
        <section className="shell grid gap-14 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="telemetry" style={{ color: accent }}>L'histoire</p>
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

        <section aria-label="Chronologie" className="border-t border-line">
          <div className="shell py-24 md:py-32">
            <Reveal>
              <p className="telemetry" style={{ color: accent }}>Chronologie moteur</p>
            </Reveal>
            <ol className="mt-12 border-l border-line">
              {vehicle.timeline.map((t, i) => (
                <li key={t.year} className="relative pb-12 pl-10 last:pb-0 md:pl-16">
                  <motion.span
                    className="absolute -left-px top-1 h-3.5 w-px"
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
      </main>

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
