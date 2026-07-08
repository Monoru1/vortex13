import { motion, useReducedMotion } from "framer-motion";

const SPEED_LINES = Array.from({ length: 7 }, (_, index) => ({
  id: index,
  top: 12 + index * 12,
  delay: index * 0.24,
  width: 10 + (index % 4) * 8,
  opacity: 0.07 + (index % 3) * 0.02,
}));

/**
 * Couche d'ambiance globale : halos, scanlines, grille et traits de vitesse.
 * Elle reste décorative, non interactive et respecte prefers-reduced-motion.
 */
export function VortexAtmosphere() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <div className="absolute inset-0 vortex-noise" />
      <div className="absolute inset-0 vortex-scanlines" />
      <div className="absolute inset-x-0 top-0 h-[42rem] vortex-aurora" />
      <div className="absolute inset-0 vortex-grid opacity-[0.12]" />

      {!reduced && (
        <>
          <motion.div
            className="absolute -left-32 top-[14%] h-64 w-64 rounded-full bg-vortex/16 blur-[78px] will-change-transform"
            animate={{ x: [0, 70, 10, 0], y: [0, 30, -14, 0], scale: [1, 1.12, 0.98, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-40 top-[42%] h-80 w-80 rounded-full bg-white/8 blur-[96px] will-change-transform"
            animate={{ x: [0, -62, -18, 0], y: [0, -36, 18, 0], scale: [1, 0.92, 1.08, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0">
            {SPEED_LINES.map((line) => (
              <motion.span
                key={line.id}
                className="absolute right-[-18vw] h-px bg-gradient-to-r from-transparent via-white to-transparent will-change-transform"
                style={{ top: `${line.top}%`, width: `${line.width}vw`, opacity: line.opacity }}
                animate={{ x: [0, "-125vw"] }}
                transition={{
                  duration: 5.2 + (line.id % 3) * 0.5,
                  delay: line.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
