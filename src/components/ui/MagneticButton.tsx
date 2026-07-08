import { useRef, type PointerEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePointerFine } from "@/lib/hooks";

interface MagneticButtonProps {
  to: string;
  children: ReactNode;
  className?: string;
  /** Force de l'attraction magnétique (0 = aucune). */
  strength?: number;
}

/**
 * CTA « magnétique » : le bouton se déplace légèrement vers le curseur, puis
 * revient au repos par ressort. Un balayage métallique traverse au survol.
 *
 * Dégradation : sur pointeur grossier (tactile) ou reduced-motion, l'effet est
 * neutralisé — le bouton reste un lien standard, pleinement cliquable.
 */
export function MagneticButton({ to, children, className, strength = 0.35 }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const fine = usePointerFine();
  const enabled = fine && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 180, damping: 15, mass: 0.3 });

  function handleMove(e: PointerEvent<HTMLAnchorElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div style={{ x: sx, y: sy }} className="inline-block">
      <Link
        ref={ref}
        to={to}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        className={cn(
          "group relative inline-flex items-center gap-3 overflow-hidden bg-vortex px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-[#ff1a13]",
          className,
        )}
      >
        {/* Balayage métallique au survol */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-vortex group-hover:translate-x-full"
        />
        <span className="relative">{children}</span>
        <ArrowRight
          size={14}
          className="relative transition-transform duration-300 ease-vortex group-hover:translate-x-1.5"
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  );
}
