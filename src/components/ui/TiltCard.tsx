import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

/** Carte 3D : inclinaison suivant le pointeur + reflet de lumière balayant la surface. */
export function TiltCard({ children, className, maxTilt = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), { stiffness: 160, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), { stiffness: 160, damping: 20 });
  const glareX = useTransform(px, [0, 1], ["-30%", "130%"]);

  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = ref.current!.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={reduced ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={cn("group relative will-change-transform", className)}
    >
      {children}
      {/* Balayage lumineux */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgb(255 255 255 / 0.08) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
            backgroundPositionX: glareX,
          }}
        />
      )}
    </motion.div>
  );
}
