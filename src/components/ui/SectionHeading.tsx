import { Reveal, RevealLines } from "./Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  lines: string[];
  lead?: string;
  align?: "left" | "center";
  className?: string;
  level?: 1 | 2;
}

/** En-tête de section normalisé : étiquette télémétrie + titre display + chapô. */
export function SectionHeading({ eyebrow, lines, lead, align = "left", className, level = 2 }: SectionHeadingProps) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <Reveal>
        <p className="telemetry">{eyebrow}</p>
      </Reveal>
      <Heading className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl">
        <RevealLines lines={lines} />
      </Heading>
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
