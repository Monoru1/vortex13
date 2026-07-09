import { type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Seo } from "@/components/seo/Seo";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { ButtonLink } from "@/components/ui/Button";
import { STATS } from "@/data/museum";
import { img } from "@/data/vehicles";
import { CarImage } from "@/components/ui/CarImage";
import { EASE } from "@/lib/utils";
import "./HistoryExperience.css";

const GUIDE_LINES = [
  "Avance.",
  "Ici, l'histoire ne se lit pas en dates.",
  "Elle s'allume, salle après salle.",
];

const CHAPTERS = [
  {
    index: "01",
    eyebrow: "Avant VORTEX",
    title: ["La halle", "était vide"],
    voice:
      "Au départ, il n'y avait ni billetterie, ni boutique, ni parcours. Juste une halle froide, onze voitures sous housse et une obsession : ne pas laisser ces machines devenir silencieuses.",
    guide: "Regarde le vide d'abord. C'est lui qui donne du poids à la première voiture.",
    image: img("photo-1568605117036-5fe5e7bab0b7", 1800),
    caption: "La Nef — ancienne halle industrielle, verrière de 90 m",
    accent: "#E10600",
    glow: "rgb(225 6 0 / 0.24)",
    beats: [
      ["2003", "Onze voitures dorment dans un hangar de Montrouge."],
      ["2011", "Une foule se forme devant une seule Ferrari. La collection privée devient un appel public."],
      ["2014", "Les clés quittent le privé. VORTEX devient un lieu."],
    ],
  },
  {
    index: "02",
    eyebrow: "La première lumière",
    title: ["Les ailes", "s'ouvrent"],
    voice:
      "La halle ne classe pas les voitures comme un catalogue. Elle les sépare par température : laiton chaud, rouge brutal, bleu électrique, violet laboratoire.",
    guide: "La lumière arrive avant la fiche technique. C'est elle qui prépare ton œil.",
    image: img("photo-1526726538690-5cbf956ae2fd", 1800),
    caption: "Aile Classiques — aluminium, laiton, cuir, lumière chaude",
    accent: "#C8A96A",
    glow: "rgb(200 169 106 / 0.25)",
    beats: [
      ["Classiques", "Les machines qui ont inventé le mythe."],
      ["Supercars", "L'époque où les voitures deviennent des posters, puis des légendes."],
      ["Hypercars", "Le carbone, les LED, la télémétrie, la vitesse impossible."],
    ],
  },
  {
    index: "03",
    eyebrow: "La salle machine",
    title: ["La voiture", "prend le centre"],
    voice:
      "Dans le showroom, le décor s'efface. Il reste la voiture, les points de scan, la plaque technique et cette tension étrange : la machine semble pouvoir démarrer derrière l'écran.",
    guide: "Le fond n'est qu'une température. Le sujet, c'est la voiture.",
    image: img("photo-1493238792000-8113da705763", 1800),
    caption: "Salle Hypercars — scanner actif, lumière froide, carbone",
    accent: "#43B4FF",
    glow: "rgb(67 180 255 / 0.25)",
    beats: [
      ["Scanner", "Une passe lumineuse révèle la mécanique comme un instrument chirurgical."],
      ["Plaque", "La donnée devient matière : aluminium, carbone, chiffres gravés."],
      ["Suite", "La voiture suivante n'est pas un lien. C'est une autre porte."],
    ],
  },
  {
    index: "04",
    eyebrow: "Après la vitesse",
    title: ["L'histoire", "reste"],
    voice:
      "La performance attire. L'histoire retient. Une fois la vitesse passée, il reste les ingénieurs, les records, les erreurs, les obsessions et les rêves impossibles.",
    guide: "On quitte une salle quand on a envie d'en ouvrir une autre.",
    image: img("photo-1626668893632-6f3a4466d22f", 1800),
    caption: "Aile Concepts — laboratoire, verre, violet froid, futur",
    accent: "#9C7BD8",
    glow: "rgb(156 123 216 / 0.25)",
    beats: [
      ["Mémoire", "Chaque voiture est replacée dans sa culture."],
      ["Rythme", "Silence, révélation, respiration, intensité."],
      ["Retour", "Le visiteur ne finit pas une page. Il continue la visite."],
    ],
  },
];

function Chapter({ chapter }: { chapter: (typeof CHAPTERS)[number] }) {
  const reduced = useReducedMotion();
  const style = {
    "--chapter-accent": chapter.accent,
    "--chapter-glow": chapter.glow,
  } as CSSProperties;

  return (
    <section className="history-chapter" data-index={chapter.index} style={style}>
      <div className="shell relative z-10 grid gap-12 py-24 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-32">
        <div>
          <Reveal>
            <p className="telemetry" style={{ color: chapter.accent }}>{chapter.eyebrow}</p>
            <h2 className="mt-6 text-[clamp(2.4rem,6.5vw,5.4rem)] font-black uppercase leading-[0.92] tracking-[-0.06em]">
              {chapter.title[0]}
              <br />
              {chapter.title[1]}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl text-base leading-[1.85] text-white/72 md:text-lg">{chapter.voice}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <blockquote className="history-guide mt-8" style={{ borderColor: chapter.accent }}>
              <p>{chapter.guide}</p>
            </blockquote>
          </Reveal>
          <div className="history-rail mt-10">
            {chapter.beats.map(([label, text], index) => (
              <Reveal key={label} delay={0.12 + index * 0.06}>
                <div className="history-rail__item">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: chapter.accent }}>{label}</p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <motion.figure
          className="history-chapter__media"
          initial={reduced ? false : { opacity: 0, y: 42, rotateY: -4 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0, rotateY: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <CarImage
            src={chapter.image}
            alt={chapter.caption}
            className="absolute inset-0 h-full w-full"
            imgClassName="transition-transform duration-[1.4s] ease-vortex hover:scale-105"
          />
          <figcaption className="history-chapter__caption font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
            {chapter.caption}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

export default function History() {
  const reduced = useReducedMotion();

  return (
    <div className="history-experience">
      <Seo
        title="Notre histoire"
        description="VORTEX devient un parcours : arrivée, halle, showrooms, héritage. L'histoire du musée racontée comme une visite immersive."
      />

      <header className="history-stage">
        <div className="history-stage__floor" aria-hidden="true" />
        <div className="history-stage__light" aria-hidden="true" />
        <div className="shell relative z-10 pb-10">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="telemetry text-white/70"
          >
            Notre histoire · expérience V2
          </motion.p>
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.95, ease: EASE }}
            className="history-stage__word mt-6 font-black uppercase text-white"
          >
            Le musée qui réveille les machines.
          </motion.h1>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.8, ease: EASE }}
            className="history-voice mt-9 max-w-3xl p-6 md:p-7"
          >
            <p className="history-voice__label font-mono text-[10px] uppercase tracking-[0.24em]">Guide invisible</p>
            <div className="mt-4 grid gap-2 text-lg leading-relaxed text-white/82 md:text-xl">
              {GUIDE_LINES.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      <main>
        {CHAPTERS.map((chapter) => (
          <Chapter key={chapter.index} chapter={chapter} />
        ))}

        <section className="history-continue">
          <div className="shell py-24 md:py-32">
            <Reveal>
              <p className="telemetry">Aujourd'hui</p>
              <h2 className="mt-5 text-[clamp(2.4rem,6.5vw,5rem)] font-black uppercase leading-[0.92] tracking-[-0.06em]">
                La visite ne s'arrête pas.
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
              <ButtonLink to="/vehicules/bugatti-chiron-ss-300">Entrer dans un showroom</ButtonLink>
              <ButtonLink to="/collections" variant="ghost">Choisir une aile</ButtonLink>
              <Link to="/contact" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-smoke transition-colors hover:text-vortex">
                Préparer sa visite <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
