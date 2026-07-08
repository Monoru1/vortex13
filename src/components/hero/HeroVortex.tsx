import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HudTelemetry, type TelemetryItem } from "./HudTelemetry";
import { usePointerFine, useInViewport } from "@/lib/hooks";
import { img } from "@/data/vehicles";
import { EASE } from "@/lib/utils";

/* Chargé à la demande : le chunk `ogl` (~13 Ko gzip) n'est téléchargé que
   lorsque le shader se monte réellement — jamais sur mobile ni en reduced-motion. */
const SpeedShader = lazy(() =>
  import("./SpeedShader").then((m) => ({ default: m.SpeedShader })),
);

const HERO_IMAGE = img("photo-1605559424843-9e4c228bf1c2", 2000);
const TITLE = ["La vitesse", "entre au musée"];
const TELEMETRY: TelemetryItem[] = [
  { label: "Collection", value: 68, suffix: " véhicules" },
  { label: "Pointe max", value: 490, suffix: " km/h" },
  { label: "Doyenne", value: "1954" },
  { label: "Nations", value: 9, suffix: " pays" },
];

/* ------------------------------------------------------------------------- */
/*  Titre cinétique : révélation lettre par lettre au montage.               */
/*  L'H1 porte le libellé accessible complet ; les lettres animées sont      */
/*  masquées à la synthèse vocale (aria-hidden) pour éviter l'épellation.    */
/* ------------------------------------------------------------------------- */
function KineticTitle({ lines }: { lines: string[] }) {
  const reduced = useReducedMotion();
  let index = 0;

  return (
    <h1
      aria-label={lines.join(" ")}
      className="mt-6 text-[clamp(2.6rem,12vw,7.5rem)] font-black uppercase leading-[0.88] tracking-tight text-[#F4F4F2]"
    >
      {lines.map((line, li) => (
        <span key={li} aria-hidden="true" className="block overflow-hidden pb-[0.06em]">
          {line.split(" ").map((word, wi) => (
            <span key={wi} className="mr-[0.22em] inline-block whitespace-nowrap">
              {word.split("").map((char, ci) => {
                const delay = 0.28 + index * 0.028;
                index += 1;
                return (
                  <motion.span
                    key={ci}
                    className="inline-block will-change-transform"
                    initial={reduced ? false : { y: "110%" }}
                    animate={reduced ? undefined : { y: 0 }}
                    transition={{ duration: 0.7, delay, ease: EASE }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

/* ------------------------------------------------------------------------- */
/*  Héros VORTEX : scène cinétique en plans superposés.                       */
/*    plan 0 — photo plein cadre (la voiture reste l'héroïne) + parallaxe    */
/*    plan 1 — shader de vitesse additif (desktop, pointeur fin, non-reduced) */
/*    plan 2 — voiles + glow LED + balayage métallique one-shot               */
/*    avant  — eyebrow, titre cinétique, sous-titre, CTA, HUD télémétrie      */
/* ------------------------------------------------------------------------- */
export function HeroVortex() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const fine = usePointerFine();
  const inView = useInViewport(sectionRef, "200px");

  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches,
  );
  const [bgFailed, setBgFailed] = useState(false);
  const [shaderReady, setShaderReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // On veut le shader ? (capacité). On le monte APRÈS le premier paint pour ne
  // jamais retarder le LCP : le repli statique s'affiche d'abord.
  const wantShader = fine && isDesktop && !reduced && !bgFailed;
  useEffect(() => {
    if (!wantShader) {
      setShaderReady(false);
      return;
    }
    const id = requestAnimationFrame(() => setShaderReady(true));
    return () => cancelAnimationFrame(id);
  }, [wantShader]);

  // Parallaxe au scroll.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Parallaxe à la souris (pointeur fin uniquement) : profondeur entre plans.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const pmx = useSpring(mx, { stiffness: 50, damping: 18, mass: 0.5 });
  const pmy = useSpring(my, { stiffness: 50, damping: 18, mass: 0.5 });
  const photoX = useTransform(pmx, [-1, 1], [18, -18]);
  const photoY = useTransform(pmy, [-1, 1], [12, -12]);
  const fgX = useTransform(pmx, [-1, 1], [-10, 10]);
  const fgY = useTransform(pmy, [-1, 1], [-6, 6]);

  useEffect(() => {
    if (!fine || reduced) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [fine, reduced, mx, my]);

  const parallax = !reduced && fine;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      {/* Plan 0 — photo plein cadre + parallaxe scroll */}
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y: bgY }}>
        <motion.div
          className="absolute inset-0 scale-[1.08]"
          style={parallax ? { x: photoX, y: photoY } : undefined}
        >
          {bgFailed ? (
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(90% 70% at 50% 20%, rgb(255 255 255 / 0.08), transparent 60%), radial-gradient(60% 50% at 50% 100%, rgb(225 6 0 / 0.16), transparent 70%), #0A0A0B",
              }}
            />
          ) : (
            <img
              src={HERO_IMAGE}
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
              onError={() => setBgFailed(true)}
              className="h-full w-full object-cover"
            />
          )}
        </motion.div>

        {/* Plan 1 — shader de vitesse additif (chargé à la demande) */}
        {shaderReady && (
          <Suspense fallback={null}>
            <SpeedShader active={inView} className="absolute inset-0" />
          </Suspense>
        )}

        {/* Repli lumineux mobile / no-WebGL : statique, sans coût batterie */}
        {!wantShader && <div aria-hidden="true" className="hero-fallback-beam absolute inset-0" />}

        {/* Voiles cinématiques — lisibilité du texte quel que soit le média */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/72 via-[#0A0A0B]/15 to-[#0A0A0B]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B]/65 to-transparent" />

        {/* Glow LED rouge au sol */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 100%, rgb(225 6 0 / 0.20), transparent 70%)",
          }}
        />

        {/* Balayage métallique one-shot au chargement */}
        <div aria-hidden="true" className="hero-sheen absolute inset-0" />
      </motion.div>

      {/* Avant-plan — contenu */}
      <motion.div
        style={reduced ? undefined : { opacity: fade }}
        className="shell relative pb-28 pt-40 md:pb-32"
      >
        <motion.div style={parallax ? { x: fgX, y: fgY } : undefined}>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
            className="telemetry text-white/70"
          >
            Musée automobile — Paris, quais de Seine
          </motion.p>

          <KineticTitle lines={TITLE} />

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease: EASE }}
            className="mt-7 max-w-md text-base leading-relaxed text-white/70 md:text-lg"
          >
            68 machines qui ont changé l'histoire, de la 300 SL de 1954 à la Chiron des 490 km/h.
            Toutes en état de marche. Toutes racontées.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton to="/expositions#billetterie">Réserver une visite</MagneticButton>
            <ButtonLink
              to="/collections"
              variant="ghost"
              className="border-white/25 text-white hover:text-vortex"
            >
              Explorer la collection
            </ButtonLink>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* HUD télémétrie */}
      <div className="relative">
        <HudTelemetry items={TELEMETRY} />
      </div>
    </section>
  );
}
