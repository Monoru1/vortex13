import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Seo } from "@/components/seo/Seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CarImage } from "@/components/ui/CarImage";
import { GALLERY, type GalleryItem } from "@/data/museum";
import { useLockBody } from "@/lib/hooks";
import { cn, EASE } from "@/lib/utils";

type Tag = GalleryItem["tag"] | "Tout";
const TAGS: Tag[] = ["Tout", "Salles", "Détails", "Nocturnes", "Atelier"];

/* ---------- Lightbox ---------- */

function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: readonly GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  useLockBody(true);

  const prev = useCallback(
    () => onNavigate((index - 1 + items.length) % items.length),
    [index, items.length, onNavigate],
  );
  const next = useCallback(
    () => onNavigate((index + 1) % items.length),
    [index, items.length, onNavigate],
  );

  /* Clavier : Échap ferme, flèches naviguent, Tab reste piégé dans le dialogue.
     Focus initial sur le bouton fermer, restitué au déclencheur à la fermeture. */
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [onClose, prev, next]);

  const item = items[index];

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} sur ${items.length} — ${item.alt}`}
      className="fixed inset-0 z-[80] flex flex-col bg-black/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-6 py-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/50">
          <span className="text-vortex">{String(index + 1).padStart(2, "0")}</span>
          {" / "}
          {String(items.length).padStart(2, "0")} · {item.tag}
        </p>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Fermer la visionneuse"
          className="grid h-11 w-11 place-items-center border border-white/15 text-white/70 transition-colors hover:border-vortex hover:text-vortex"
        >
          <X size={16} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 md:px-20">
        <AnimatePresence mode="wait">
          <motion.img
            key={item.id}
            src={item.src}
            alt={item.alt}
            className="max-h-full max-w-full object-contain"
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
        </AnimatePresence>

        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Photo précédente"
          className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/15 bg-black/40 text-white/70 transition-colors hover:border-vortex hover:text-vortex md:left-6"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Photo suivante"
          className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/15 bg-black/40 text-white/70 transition-colors hover:border-vortex hover:text-vortex md:right-6"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <p className="px-6 pb-6 text-center text-sm text-white/60">{item.alt}</p>
    </motion.div>
  );
}

/* ---------- Page ---------- */

export default function Gallery() {
  const [tag, setTag] = useState<Tag>("Tout");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = useMemo(
    () => (tag === "Tout" ? GALLERY : GALLERY.filter((g) => g.tag === tag)),
    [tag],
  );

  return (
    <>
      <Seo
        title="Galerie"
        description="La Nef, les nocturnes, l'atelier de restauration : le musée VORTEX en images plein écran."
      />

      <header className="shell pb-14 pt-40 md:pb-16">
        <SectionHeading
          eyebrow={`Galerie — ${GALLERY.length} photographies`}
          lines={["Le musée,", "en pleine lumière"]}
          lead="Chaque image s'ouvre en plein écran. Navigation au clavier : flèches pour parcourir, Échap pour fermer."
        />
      </header>

      {/* Filtres */}
      <div className="glass sticky top-[72px] z-40">
        <div className="shell flex flex-wrap gap-2 py-4" role="group" aria-label="Filtrer les photographies">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => { setTag(t); setOpenIndex(null); }}
              aria-pressed={tag === t}
              className={cn(
                "border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300",
                tag === t
                  ? "border-vortex bg-vortex text-white"
                  : "border-line text-smoke hover:border-smoke hover:text-ink",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grille masonry par colonnes */}
      <section className="shell pb-28 pt-10 md:pb-36">
        <motion.div layout className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          <AnimatePresence mode="popLayout">
            {items.map((g, i) => (
              <motion.button
                key={g.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.25), ease: EASE }}
                onClick={() => setOpenIndex(i)}
                aria-label={`Agrandir : ${g.alt}`}
                className="group relative block w-full break-inside-avoid overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-vortex"
              >
                <CarImage
                  src={g.src}
                  alt={g.alt}
                  className={cn(g.tall ? "aspect-[3/4]" : "aspect-[4/3]")}
                  imgClassName="transition-transform duration-700 ease-vortex group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/80">{g.tag}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-vortex">Agrandir +</span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {items.length === 0 && (
          <Reveal className="border border-dashed border-line py-24 text-center">
            <p className="text-smoke">Aucune photographie dans cette catégorie.</p>
          </Reveal>
        )}
      </section>

      <AnimatePresence>
        {openIndex !== null && items[openIndex] && (
          <Lightbox
            items={items}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onNavigate={setOpenIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}
