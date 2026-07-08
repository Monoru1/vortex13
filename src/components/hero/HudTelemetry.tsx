import { useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Counter } from "@/components/ui/Counter";
import { nf } from "@/lib/utils";

export interface TelemetryItem {
  label: string;
  /** Nombre → compteur animé ; chaîne → affichage direct. */
  value: number | string;
  suffix?: string;
}

interface HudTelemetryProps {
  items: TelemetryItem[];
  className?: string;
}

/** Petit crochet d'angle façon viseur — signature « instrument de bord ». */
function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const base = "pointer-events-none absolute h-3 w-3 border-vortex/70";
  const map = {
    tl: "left-0 top-0 border-l border-t",
    tr: "right-0 top-0 border-r border-t",
    bl: "left-0 bottom-0 border-b border-l",
    br: "right-0 bottom-0 border-b border-r",
  } as const;
  return <span aria-hidden="true" className={`${base} ${map[position]}`} />;
}

/**
 * Bandeau de télémétrie du héros : la donnée comme matière graphique.
 * Les valeurs numériques montent de 0 à leur cible ; en reduced-motion,
 * elles s'affichent directement (pas de comptage).
 */
export function HudTelemetry({ items, className }: HudTelemetryProps) {
  const reduced = useReducedMotion();

  return (
    <div
      className={`relative border-t border-white/10 bg-[#0A0A0B]/55 backdrop-blur-md ${className ?? ""}`}
    >
      <CornerBracket position="tl" />
      <CornerBracket position="tr" />
      <CornerBracket position="bl" />
      <CornerBracket position="br" />

      <div className="shell flex flex-wrap items-center justify-between gap-x-10 gap-y-3 py-5">
        {items.map((item) => (
          <p
            key={item.label}
            className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45"
          >
            {item.label}
            <span className="ml-2 text-white/90">
              {typeof item.value === "number" ? (
                reduced ? (
                  <>
                    {nf.format(item.value)}
                    {item.suffix ?? ""}
                  </>
                ) : (
                  <Counter value={item.value} suffix={item.suffix} />
                )
              ) : (
                item.value
              )}
            </span>
          </p>
        ))}
        <ChevronDown size={16} className="animate-bounce text-vortex" aria-hidden="true" />
      </div>
    </div>
  );
}
