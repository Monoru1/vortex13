import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Quote } from "lucide-react";
import { Seo } from "@/components/seo/Seo";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";
import { ButtonLink } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { CarImage } from "@/components/ui/CarImage";
import { CATEGORIES, VEHICLES, img } from "@/data/vehicles";
import { ADDRESS, EXHIBITIONS, STATS, TESTIMONIALS } from "@/data/museum";
import { EASE, cn } from "@/lib/utils";

const HERO_IMAGE = img("photo-1605559424843-9e4c228bf1c2", 2000);
const FEATURED = ["ferrari-f40", "mclaren-f1", "bugatti-chiron-ss-300"];

export default function Home() {
  return (
    <>
      <Seo
        title="Accueil"
        description="VORTEX Automotive Museum, Paris — 68 voitures iconiques des classiques aux hypercars. Collections, expositions, billetterie."
      />
      <Hero />
      <Manifesto />
      <CollectionsPreview />
      <KeyFigures />
      <LatestExhibitions />
      <FeaturedVehicles />
      <Testimonials />
      <Visit />
    </>
  );
}

/* ------------------------------------------------------------------------ */
/*  01 — Héro plein écran : vidéo si fournie (public/hero.mp4), sinon        */
/*  image cinématique en parallaxe. Toujours un poster : jamais d'écran vide. */
/* ------------------------------------------------------------------------ */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y: bgY }}>
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_IMAGE}
          aria-hidden="true"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Voiles cinématiques : lisibilité du texte garantie quel que soit le média */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/70 via-[#0A0A0B]/20 to-[#0A0A0B]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B]/60 to-transparent" />
      </motion.div>

      <motion.div style={reduced ? undefined : { opacity: fade }} className="shell relative pb-28 pt-40 md:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
          className="telemetry text-white/70"
        >
          Musée automobile — Paris, quais de Seine
        </motion.p>

        <h1 className="mt-6 text-[clamp(2.6rem,12vw,7.5rem)] font-black uppercase leading-[0.88] tracking-tight text-[#F4F4F2]">
          <RevealLines lines={["La vitesse", "entre au musée"]} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
          className="mt-7 max-w-md text-base leading-relaxed text-white/70 md:text-lg"
        >
          68 machines qui ont changé l'histoire, de la 300 SL de 1954 à la Chiron
          des 490 km/h. Toutes en état de marche. Toutes racontées.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: EASE }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <ButtonLink to="/expositions#billetterie">Réserver une visite</ButtonLink>
          <ButtonLink to="/collections" variant="ghost" className="border-white/25 text-white hover:text-vortex">
            Explorer la collection
          </ButtonLink>
        </motion.div>
      </motion.div>

      {/* Bandeau télémétrie : la donnée comme matière graphique */}
      <div className="relative border-t border-white/10 bg-[#0A0A0B]/60 backdrop-blur-md">
        <div className="shell flex flex-wrap items-center justify-between gap-x-10 gap-y-3 py-5">
          {[
            ["Collection", "68 véhicules"],
            ["Pointe max", "490 km/h"],
            ["Doyenne", "1954"],
            ["Nations", "9 pays"],
          ].map(([k, v]) => (
            <p key={k} className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">
              {k} <span className="ml-2 text-white/90">{v}</span>
            </p>
          ))}
          <ChevronDown size={16} className="animate-bounce text-vortex" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/*  02 — Manifeste : le texte se révèle mot à mot au fil du défilement.      */
/* ------------------------------------------------------------------------ */
const MANIFESTO =
  "Un musée où rien n'est sous cloche. Chaque voiture démarre, chaque histoire est vraie, chaque salle est pensée comme une scène. Tournez une clé : un V12 de 1962 s'éveille, et la halle entière retient son souffle.";

function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = MANIFESTO.split(" ");

  return (
    <section className="shell py-28 md:py-40">
      <p className="telemetry">Le musée</p>
      <div ref={ref} className="mt-8 max-w-4xl">
        <p className="text-2xl font-medium leading-snug md:text-4xl md:leading-snug">
          {words.map((word, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {word}
            </Word>
          ))}
        </p>
      </div>
      <Reveal delay={0.1} className="mt-12">
        <ButtonLink to="/histoire" variant="ghost">
          Notre histoire depuis 2003
        </ButtonLink>
      </Reveal>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}

/* ------------------------------------------------------------------------ */
/*  03 — Les quatre collections, chacune avec sa teinte propre.              */
/* ------------------------------------------------------------------------ */
function CollectionsPreview() {
  return (
    <section className="hairline-t">
      <div className="shell py-24 md:py-32">
        <SectionHeading
          eyebrow="Quatre collections"
          lines={["Choisissez", "votre époque"]}
          lead="Des carrosseries martelées à la main aux monocoques carbone : quatre salles, quatre langages, un seul fil rouge — l'obsession."
        />
      </div>
      <div className="grid md:grid-cols-2">
        {CATEGORIES.map((cat, i) => (
          <Reveal key={cat.id} delay={0.05 * i} y={40}>
            <Link
              to={`/collections#${cat.id}`}
              className="group relative block h-[62vw] overflow-hidden border-t border-line md:h-[26rem] md:[&:nth-child(odd)]:border-r"
            >
              <CarImage
                src={cat.image}
                alt={`Collection ${cat.label}`}
                className="absolute inset-0"
                imgClassName="transition-transform duration-[1.2s] ease-vortex group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/85 via-[#0A0A0B]/25 to-transparent transition-opacity duration-700 group-hover:opacity-80" />
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/60">
                  <span className="mr-3 inline-block h-[9px] w-[2px] align-[-1px]" style={{ background: cat.accent }} />
                  {cat.period} — {VEHICLES.filter((v) => v.category === cat.id).length} véhicules
                </p>
                <p
                  className="mt-3 font-display text-3xl font-black uppercase tracking-tight text-white transition-transform duration-500 ease-vortex group-hover:-translate-y-1 md:text-4xl"
                  style={{ fontStretch: "118%" }}
                >
                  {cat.label}
                </p>
                <p className="mt-2 max-w-md text-sm text-white/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {cat.intro}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/*  04 — Chiffres clés animés.                                               */
/* ------------------------------------------------------------------------ */
function KeyFigures() {
  return (
    <section className="hairline-t bg-surface/50">
      <div className="shell grid grid-cols-2 gap-y-12 py-20 md:grid-cols-4 md:py-24">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={0.08 * i}>
            <div className={cn("md:px-8", i > 0 && "md:border-l md:border-line")}>
              <p className="font-display text-4xl font-black tracking-tight md:text-5xl" style={{ fontStretch: "115%" }}>
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="telemetry mt-3">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/*  05 — Dernières expositions : rail horizontal à défilement magnétique.    */
/* ------------------------------------------------------------------------ */
function LatestExhibitions() {
  return (
    <section className="hairline-t py-24 md:py-32">
      <div className="shell flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="En ce moment" lines={["Dernières", "expositions"]} />
        <Reveal delay={0.2}>
          <ButtonLink to="/expositions" variant="ghost">
            Programme complet
          </ButtonLink>
        </Reveal>
      </div>
      <div className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 md:px-10 lg:px-16 [scrollbar-width:thin]">
        {EXHIBITIONS.map((expo, i) => (
          <Reveal key={expo.slug} delay={0.06 * i} className="w-[82vw] flex-none snap-start sm:w-[26rem]">
            <Link to="/expositions" className="group block">
              <div className="relative overflow-hidden">
                <CarImage
                  src={expo.image}
                  alt={expo.title}
                  className="aspect-[4/3]"
                  imgClassName="transition-transform duration-[1.1s] ease-vortex group-hover:scale-105"
                />
                <span className="glass absolute left-4 top-4 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white">
                  {expo.status}
                </span>
              </div>
              <p className="telemetry mt-5">{expo.dates}</p>
              <h3 className="mt-2 text-xl font-black uppercase tracking-tight transition-colors group-hover:text-vortex md:text-2xl">
                {expo.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-smoke">{expo.summary}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/*  06 — Trois icônes de la collection en cartes 3D.                         */
/* ------------------------------------------------------------------------ */
function FeaturedVehicles() {
  const featured = VEHICLES.filter((v) => FEATURED.includes(v.slug));
  return (
    <section className="hairline-t bg-surface/50 py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Pièces maîtresses"
          lines={["Trois raisons", "de venir aujourd'hui"]}
        />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {featured.map((v, i) => (
            <Reveal key={v.slug} delay={0.08 * i}>
              <TiltCard>
                <Link to={`/vehicules/${v.slug}`} className="block border border-line bg-raised">
                  <CarImage src={v.image} alt={`${v.brand} ${v.name}`} className="aspect-[4/3]" />
                  <div className="p-6">
                    <p className="telemetry">
                      {v.brand} — {v.year}
                    </p>
                    <h3 className="mt-2 text-2xl font-black uppercase tracking-tight">{v.name}</h3>
                    <div className="mt-5 flex gap-6 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-widest text-smoke">
                      <span>{v.powerCh} ch</span>
                      <span>{v.topSpeedKmh} km/h</span>
                      <span>{v.accelS} s</span>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/*  07 — Avis visiteurs : citation unique, rotation douce.                   */
/* ------------------------------------------------------------------------ */
function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index];

  return (
    <section className="hairline-t py-24 md:py-32">
      <div className="shell max-w-4xl">
        <p className="telemetry">Livre d'or</p>
        <div className="relative mt-10 min-h-[13rem]">
          <Quote size={40} className="absolute -left-2 -top-4 text-vortex/25 md:-left-14" aria-hidden="true" />
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <blockquote className="text-xl font-medium leading-relaxed md:text-3xl md:leading-relaxed">
                {t.quote}
              </blockquote>
              <figcaption className="telemetry mt-8">
                {t.author} · {t.role}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex gap-3" role="tablist" aria-label="Choisir un avis">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Avis ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-[3px] w-10 transition-colors duration-300",
                i === index ? "bg-vortex" : "bg-line hover:bg-smoke",
              )}
              style={i !== index ? { background: "var(--line)" } : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/*  08 — Venir au musée : plan stylisé (SVG maison, pas de tiers embarqué).  */
/* ------------------------------------------------------------------------ */
function Visit() {
  return (
    <section className="hairline-t bg-surface/50">
      <div className="shell grid gap-14 py-24 md:grid-cols-2 md:items-center md:py-32">
        <div>
          <SectionHeading
            eyebrow="Venir au musée"
            lines={["Sur les quais,", "porte grande ouverte"]}
            lead="Une halle industrielle de 1923 sur la Seine, à dix minutes du périphérique et à deux pas du métro Javel."
          />
          <div className="mt-10 space-y-4 text-sm text-smoke">
            <p className="flex items-start gap-3">
              <MapPin size={15} className="mt-0.5 flex-none text-vortex" aria-hidden="true" />
              <span>
                {ADDRESS.street}, {ADDRESS.city}
                <br />
                {ADDRESS.metro}
              </span>
            </p>
          </div>
          <div className="mt-10">
            <ButtonLink to="/contact">Horaires & accès</ButtonLink>
          </div>
        </div>

        <Reveal delay={0.15}>
          <StylizedMap />
        </Reveal>
      </div>
    </section>
  );
}

/** Plan d'accès maison : zéro iframe tierce, zéro cookie, identité respectée. */
function StylizedMap() {
  return (
    <div className="relative overflow-hidden border border-line bg-raised">
      <svg viewBox="0 0 600 420" className="h-auto w-full" role="img" aria-label="Plan d'accès stylisé au musée VORTEX">
        <rect width="600" height="420" fill="transparent" />
        {/* Trame de rues */}
        <g stroke="var(--line)" strokeWidth="1.5">
          {[60, 140, 220, 300, 380].map((y) => (
            <line key={y} x1="0" y1={y} x2="600" y2={y} />
          ))}
          {[80, 180, 300, 420, 520].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="420" />
          ))}
        </g>
        {/* La Seine */}
        <path
          d="M -20 330 C 140 290, 260 360, 400 320 S 580 250, 640 270"
          fill="none"
          stroke="rgb(107 168 255 / 0.45)"
          strokeWidth="26"
          strokeLinecap="round"
        />
        <text x="430" y="300" fill="rgb(107 168 255 / 0.8)" fontSize="11" fontFamily="IBM Plex Mono, monospace" letterSpacing="3">
          LA SEINE
        </text>
        {/* Le musée */}
        <g>
          <circle cx="300" cy="220" r="34" fill="rgb(225 6 0 / 0.12)">
            <animate attributeName="r" values="26;40;26" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="300" cy="220" r="7" fill="#E10600" />
          <text x="300" y="188" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="IBM Plex Mono, monospace" letterSpacing="3">
            VORTEX
          </text>
        </g>
        {/* Métro */}
        <circle cx="180" cy="140" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="196" y="145" fill="var(--tw-prose-body, currentColor)" opacity="0.55" fontSize="10" fontFamily="IBM Plex Mono, monospace" letterSpacing="2">
          M° JAVEL
        </text>
      </svg>
      <p className="hairline-t p-4 font-mono text-[10px] uppercase tracking-[0.24em] text-smoke">
        48.8466° N — 2.2780° E · Parking visiteurs 240 places
      </p>
    </div>
  );
}
