import { Reveal, RevealLines } from "./Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  lines: string[];
  lead?: string;
  align?: "left" | "center";
  className?: string;
}

/** En-tête de section normalisé : étiquette télémétrie + titre display + chapô. */
export function SectionHeading({ eyebrow, lines, lead, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <Reveal>
        <p className="telemetry">{eyebrow}</p>
      </Reveal>
      <h2 className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl">
        <RevealLines lines={lines} />
      </h2>
      {lead && (
        <Reveal delay={0.15}>
          <p className={cn("mt-6 max-w-xl text-base leading-relaxed text-smoke md:text-lg", align === "center" && "mx-auto")}>
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
