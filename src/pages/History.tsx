import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { Seo } from "@/components/seo/Seo";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { ButtonLink } from "@/components/ui/Button";
import { TIMELINE, STATS } from "@/data/museum";
import { img } from "@/data/vehicles";
import { CarImage } from "@/components/ui/CarImage";

export default function History() {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();

  /* Ligne rouge qui progresse avec la lecture de la chronologie. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.65", "end 0.65"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  return (
    <>
      <Seo
        title="Histoire du musée"
        description="De onze voitures dans un hangar de Montrouge à la Nef des quais de Seine : vingt-trois ans d'histoire du VORTEX Automotive Museum."
      />

      <header className="shell pb-16 pt-40 md:pb-20">
        <Reveal>
          <p className="telemetry">Notre histoire · 2003 — 2026</p>
        </Reveal>
        {/* Rupture assumée : l'unique bloc du site en display casse-bas.
            Une voix, pas un slogan. */}
        <Reveal delay={0.1}>
          <blockquote className="mt-8 max-w-4xl font-display text-[clamp(1.9rem,5vw,3.6rem)] font-black leading-[1.04] tracking-tight text-ink">
            « J'ai possédé ces voitures. Un jour, devant une file d'attente, j'ai compris qu'elles ne m'appartenaient plus. »
          </blockquote>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">
            — Henri Vasseur, fondateur
          </p>
        </Reveal>
        <Reveal delay={0.28}>
          <p className="mt-9 max-w-xl text-base leading-relaxed text-smoke md:text-lg">
            Ce dimanche-là, à Chantilly en 2011, la file s'allongeait pour voir
            une seule voiture : sa 250 GTO. VORTEX n'est pas né d'un plan
            marketing. Il est né de ce regard des autres, qu'il n'avait pas prévu.
          </p>
        </Reveal>
      </header>

      {/* Image d'ouverture */}
      <section className="shell pb-20 md:pb-28">
        <Reveal>
          <figure className="relative overflow-hidden">
            <CarImage
              src={img("photo-1568605117036-5fe5e7bab0b7", 2000)}
              alt="La grande halle du musée baignée de lumière matinale"
              className="aspect-[21/9]"
              priority
            />
            <figcaption className="absolute bottom-5 left-5 border border-white/15 bg-black/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-white/80 backdrop-blur-sm">
              La Nef — halle de 1923, verrière de 90 m
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* ===== Chronologie interactive ===== */}
      <section aria-label="Chronologie du musée" className="shell pb-24 md:pb-32">
        <ol ref={ref} className="relative ml-2 md:mx-auto md:max-w-4xl">
          {/* Rail + progression */}
          <span className="absolute inset-y-0 left-0 w-px bg-[var(--line)] md:left-1/2" aria-hidden="true" />
          <motion.span
            className="absolute inset-y-0 left-0 w-px origin-top bg-vortex md:left-1/2"
            style={{ scaleY: reduced ? 1 : progress }}
            aria-hidden="true"
          />

          {TIMELINE.map((t, i) => {
            const right = i % 2 === 1;
            return (
              <li
                key={t.year}
                className={`relative pb-16 pl-10 last:pb-0 md:w-1/2 md:pb-24 ${
                  right ? "md:ml-auto md:pl-14" : "md:pl-0 md:pr-14 md:text-right"
                }`}
              >
                {/* Point d'ancrage */}
                <span
                  className={`absolute left-0 top-2 h-2.5 w-2.5 -translate-x-1/2 border border-vortex bg-bg md:top-3 ${
                    right ? "md:left-0" : "md:left-auto md:right-0 md:translate-x-1/2"
                  }`}
                  aria-hidden="true"
                />
                <Reveal delay={0.05} y={20}>
                  <p className="font-display text-5xl font-black tabular-nums leading-none tracking-tight text-ink/15 md:text-7xl">
                    {t.year}
                  </p>
                  <h2 className="mt-3 font-display text-xl font-black uppercase tracking-tight md:text-2xl">
                    {t.title}
                  </h2>
                  <p className={`mt-4 max-w-md text-sm leading-relaxed text-smoke md:text-base ${right ? "" : "md:ml-auto"}`}>
                    {t.text}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ===== Le musée aujourd'hui ===== */}
      <section aria-labelledby="aujourdhui-titre" className="border-t border-line">
        <div className="shell py-24 md:py-32">
          <Reveal>
            <p className="telemetry">Aujourd'hui</p>
            <h2 id="aujourdhui-titre" className="mt-5 text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl">
              Là où l'histoire
              <br />
              nous a menés
            </h2>
          </Reveal>

          <dl className="mt-14 grid grid-cols-2 border-l border-t border-line lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07} className="border-b border-r border-line p-6 md:p-9">
                <dd className="font-display text-3xl font-black tabular-nums tracking-tight md:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <dt className="mt-3 font-mono text-[10px] uppercase tracking-[0.26em] text-smoke">{s.label}</dt>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.2} className="mt-14 flex flex-wrap gap-4">
            <ButtonLink to="/collections">Explorer la collection</ButtonLink>
            <ButtonLink to="/contact" variant="ghost">Préparer sa visite</ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
