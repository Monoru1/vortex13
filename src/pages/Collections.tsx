import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { Seo } from "@/components/seo/Seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CarImage } from "@/components/ui/CarImage";
import { CATEGORIES, VEHICLES, type CategoryId } from "@/data/vehicles";
import { cn, EASE, sanitize } from "@/lib/utils";

type Filter = CategoryId | "tous";

export default function Collections() {
  const { hash } = useLocation();
  /* Le filtre est résolu DÈS le premier rendu à partir du hash. La grille se
     monte donc directement dans le bon état : aucune transition 20→N au
     montage, donc aucune sortie AnimatePresence ni animation `layout` de la
     liste — c'est cette transition de montage qui laissait le conteneur
     dimensionné pour l'état pré-filtre (le grand vide avant la 1re carte). */
  const [filter, setFilter] = useState<Filter>(() => {
    const id = hash.replace("#", "") as CategoryId;
    return CATEGORIES.some((c) => c.id === id) ? id : "tous";
  });
  const [query, setQuery] = useState("");
  const toolbarRef = useRef<HTMLDivElement>(null);

  /* Lien profond depuis l'accueil (/collections#hypercars) :
     1. présélectionne la salle ;
     2. une fois la page montée et peinte, aligne la barre d'outils — donc la
        collection — précisément sous la navbar fixe (72 px).
     La position est mesurée via offsetTop cumulé, insensible aux transforms
     d'animation d'entrée, pour un calage exact et non « presque le footer ». */
  useEffect(() => {
    const id = hash.replace("#", "") as CategoryId;
    if (!CATEGORIES.some((c) => c.id === id)) return;
    setFilter(id);

    const NAVBAR = 72;
    const absoluteTop = (el: HTMLElement) => {
      let y = 0;
      let node: HTMLElement | null = el;
      while (node) {
        y += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      return y;
    };

    let raf1 = 0;
    let raf2 = 0;
    const align = () => {
      const bar = toolbarRef.current;
      if (!bar) return;
      window.scrollTo({ top: Math.max(0, absoluteTop(bar) - NAVBAR), behavior: "smooth" });
    };
    /* Deux frames : la page paresseuse est montée et peinte avant la mesure. */
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(align);
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [hash]);

  const results = useMemo(() => {
    const q = sanitize(query).toLowerCase();
    return VEHICLES.filter((v) => {
      const inCategory = filter === "tous" || v.category === filter;
      const inSearch =
        q.length === 0 ||
        `${v.brand} ${v.name} ${v.country} ${v.year}`.toLowerCase().includes(q);
      return inCategory && inSearch;
    });
  }, [filter, query]);

  const activeCategory = CATEGORIES.find((c) => c.id === filter);

  return (
    <>
      <Seo
        title="Collections"
        description="Explorez les quatre collections du musée VORTEX : Classiques, Supercars, Hypercars et Concept Cars — 20 fiches détaillées."
      />
      <header className="shell pb-16 pt-40 md:pb-20">
        <SectionHeading
          eyebrow={`Collection permanente — ${VEHICLES.length} fiches en ligne`}
          lines={["Les machines,", "une par une"]}
          lead="Chaque véhicule de la collection possède sa fiche complète : histoire, télémétrie, anecdotes et chronologie."
        />
      </header>

      {/* Barre d'outils : filtres + recherche */}
      <div ref={toolbarRef} className="glass sticky top-[72px] z-40">
        <div className="shell flex flex-wrap items-center gap-x-6 gap-y-4 py-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par collection">
            {(["tous", ...CATEGORIES.map((c) => c.id)] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={cn(
                  "border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300",
                  filter === f
                    ? "border-vortex bg-vortex text-white"
                    : "border-line text-smoke hover:border-smoke hover:text-ink",
                )}
              >
                {f === "tous" ? "Tous" : CATEGORIES.find((c) => c.id === f)!.label}
              </button>
            ))}
          </div>

          <label className="relative ml-auto flex min-w-[15rem] flex-1 items-center md:max-w-xs">
            <Search size={14} className="absolute left-3 text-smoke" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un modèle, une marque…"
              aria-label="Rechercher un véhicule"
              className="w-full border border-line bg-transparent py-2.5 pl-9 pr-9 font-mono text-xs tracking-wide text-ink placeholder:text-smoke/60 focus:border-vortex focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Effacer la recherche"
                className="absolute right-2 text-smoke hover:text-vortex"
              >
                <X size={14} />
              </button>
            )}
          </label>
        </div>
      </div>

      {/* Bandeau d'identité de la collection sélectionnée */}
      <AnimatePresence mode="wait">
        {activeCategory && (
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="shell pt-10"
          >
            <div className="border-l-2 pl-6" style={{ borderColor: activeCategory.accent }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.26em]" style={{ color: activeCategory.accent }}>
                {activeCategory.period}
              </p>
              <p className="mt-2 max-w-2xl text-lg text-smoke">{activeCategory.intro}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grille de véhicules */}
      <section className="shell pb-28 pt-12" aria-live="polite">
        <p className="telemetry mb-8">
          {results.length} véhicule{results.length > 1 ? "s" : ""} affiché{results.length > 1 ? "s" : ""}
        </p>

        {results.length === 0 ? (
          <EmptyState onReset={() => { setQuery(""); setFilter("tous"); }} />
        ) : (
          <motion.ul layout className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {results.map((v, i) => (
                <motion.li
                  layout
                  key={v.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3), ease: EASE }}
                >
                  <Link to={`/vehicules/${v.slug}`} className="group block">
                    <div className="relative overflow-hidden">
                      <CarImage
                        src={v.image}
                        alt={`${v.brand} ${v.name} (${v.year})`}
                        className="aspect-[4/3]"
                        imgClassName="transition-transform duration-[1.1s] ease-vortex group-hover:scale-[1.06]"
                      />
                      <span
                        className="absolute left-0 top-4 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white"
                        style={{ background: CATEGORIES.find((c) => c.id === v.category)!.accent }}
                      >
                        {CATEGORIES.find((c) => c.id === v.category)!.label}
                      </span>
                    </div>
                    <div className="mt-5 flex items-baseline justify-between gap-4">
                      <div>
                        <p className="telemetry">{v.brand}</p>
                        <h2 className="mt-1 text-xl font-black uppercase tracking-tight transition-colors group-hover:text-vortex">
                          {v.name}
                        </h2>
                      </div>
                      <p className="font-mono text-sm text-smoke">{v.year}</p>
                    </div>
                    <div className="mt-3 flex gap-5 border-t border-line pt-3 font-mono text-[10px] uppercase tracking-widest text-smoke">
                      <span>{v.powerCh} ch</span>
                      <span>{v.topSpeedKmh} km/h</span>
                      <span>0–100 : {v.accelS} s</span>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </section>
    </>
  );
}

/** État vide : une invitation à agir, jamais un cul-de-sac. */
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <Reveal>
      <div className="grid place-items-center border border-dashed border-line py-24 text-center">
        <p className="font-display text-2xl font-black uppercase tracking-tight">Aucun véhicule ne correspond</p>
        <p className="mt-3 max-w-sm text-sm text-smoke">
          Essayez un autre terme — une marque, un pays, une année — ou repartez de la collection complète.
        </p>
        <button
          onClick={onReset}
          className="mt-8 border border-line px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors hover:border-vortex hover:text-vortex"
        >
          Réinitialiser les filtres
        </button>
      </div>
    </Reveal>
  );
}
