import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/seo/Seo";
import { EASE } from "@/lib/utils";
import heroImage from "@/assets/hero-mercedes-300-sl-gullwing.jpg";
import chapterImage from "@/assets/chapter-mercedes-300-sl-interior.jpg";

export default function Home() {
  return (
    <>
      <Seo
        title="Accueil"
        description="VORTEX Automotive Museum, Paris — motos, voitures et archives mécaniques dans une expérience de musée vivant."
      />

      <MuseumHero />
      <TransitionBeat />
      <FirstChapter />
    </>
  );
}

function MuseumHero() {
  return (
    <header className="relative isolate overflow-hidden bg-[#09090b] text-white">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Voiture en exposition dans une salle sombre"
          className="h-full w-full scale-[1.08] object-cover object-center opacity-80 grayscale-[0.12] contrast-[1.15]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_64%_30%,rgba(255,255,255,0.18),transparent_16%),linear-gradient(90deg,rgba(9,9,11,0.82)_0%,rgba(9,9,11,0.38)_40%,rgba(9,9,11,0.9)_100%)]" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#09090b] via-[#09090b]/72 to-transparent" />

      <div className="shell relative z-10 flex min-h-[100svh] items-end pb-14 pt-28 md:pb-16 md:pt-32">
        <div className="w-full max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/70"
          >
            1955 — Mercedes 300 SL Gullwing
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
            className="mt-4 max-w-xl text-[clamp(2.7rem,7vw,5.4rem)] font-black uppercase leading-[0.9] tracking-[-0.08em] text-white"
          >
            La légende
            <span className="block text-white/80">en silence.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
            className="mt-5 max-w-md text-sm leading-relaxed text-white/72 md:text-base"
          >
            Une galerie de mémoire où chaque voiture garde le poids de son époque, de sa lumière et de son bruit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-white/85 backdrop-blur-sm transition-colors hover:border-white/35 hover:bg-white/10"
            >
              Découvrir la collection
            </Link>
            <Link
              to="/histoire"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-white/65 transition-colors hover:text-white"
            >
              Notre histoire <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.38, ease: EASE }}
          className="ml-auto hidden w-full max-w-[12rem] self-end pb-8 md:block"
        >
          <div className="space-y-4 border-l border-white/10 pl-6">
            {[
              ["Collection", "68 véhicules"],
              ["1954", "300 SL"],
              ["Paris", "Halle 02"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/45">{label}</p>
                <p className="mt-2 text-xl font-black tracking-[-0.05em] text-white">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-white/60">
        <ArrowDown size={16} className="mx-auto" />
      </div>
    </header>
  );
}

function TransitionBeat() {
  return (
    <section className="border-t border-white/10 bg-[#0d0d0f] py-20 text-white md:py-28">
      <div className="shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">Le musée</p>
          <h2 className="mt-5 max-w-xl text-4xl font-black uppercase leading-none tracking-[-0.06em] md:text-6xl">
            Chaque voiture porte son propre siècle.
          </h2>
        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <p className="text-base leading-relaxed text-white/72">
            Une voiture historique ne se décrit pas : elle se lit dans le dessin, le silence, le métal et la vitesse qu’elle a laissée dans la mémoire.
          </p>
        </div>
      </div>
    </section>
  );
}

function FirstChapter() {
  return (
    <section id="chapter" className="bg-[#09090b] py-24 text-white md:py-32">
      <div className="shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]"
        >
          <img
            src={chapterImage}
            alt="Intérieur de la Mercedes-Benz 300 SL Gullwing exposée dans une galerie"
            className="aspect-[6/4] w-full object-cover grayscale-[0.1] contrast-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/55">Objet d’archive</p>
              <p className="mt-2 text-xl font-black tracking-[-0.05em]">Mercedes-Benz 300 SL</p>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">1955</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
          className="max-w-xl"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">Premier chapitre</p>
          <h3 className="mt-5 text-4xl font-black uppercase leading-[0.96] tracking-[-0.06em] text-white md:text-5xl">
            La forme la plus pure du désir.
          </h3>
          <p className="mt-6 text-base leading-relaxed text-white/72">
            La 300 SL Gullwing n’est pas seulement une voiture : elle incarne une époque où le design, la compétition et l’ingénierie se sont donnés rendez-vous dans une forme radicale.
          </p>

          <dl className="mt-8 space-y-5 border-t border-white/10 pt-6">
            <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">Année</dt>
              <dd className="text-right text-sm text-white/78">1955</dd>
            </div>
            <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">Modèle</dt>
              <dd className="text-right text-sm text-white/78">300 SL Gullwing</dd>
            </div>
            <div className="flex items-start justify-between gap-6 pb-2">
              <dt className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">Histoire</dt>
              <dd className="text-right text-sm text-white/78">Une icône de la course et du design</dd>
            </div>
          </dl>

          <div className="mt-8 flex items-center gap-3">
            <Link to="/collections" className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/80 transition-colors hover:border-white/30 hover:text-white">
              Explorer les archives
            </Link>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
              <MapPin size={12} /> Paris
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
