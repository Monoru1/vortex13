import { motion, useReducedMotion } from "framer-motion";

const SPEED_LINES = Array.from({ length: 13 }, (_, index) => ({
  id: index,
  top: 8 + index * 7,
  delay: index * 0.17,
  width: 8 + (index % 5) * 7,
  opacity: 0.08 + (index % 4) * 0.025,
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
      <div className="absolute inset-0 vortex-grid opacity-[0.18]" />

      {!reduced && (
        <>
          <motion.div
            className="absolute -left-32 top-[14%] h-72 w-72 rounded-full bg-vortex/20 blur-[90px]"
            animate={{ x: [0, 90, 20, 0], y: [0, 40, -20, 0], scale: [1, 1.22, 0.95, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-40 top-[42%] h-96 w-96 rounded-full bg-white/10 blur-[110px]"
            animate={{ x: [0, -80, -20, 0], y: [0, -50, 30, 0], scale: [1, 0.88, 1.16, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0">
            {SPEED_LINES.map((line) => (
              <motion.span
                key={line.id}
                className="absolute right-[-18vw] h-px bg-gradient-to-r from-transparent via-white to-transparent"
                style={{ top: `${line.top}%`, width: `${line.width}vw`, opacity: line.opacity }}
                animate={{ x: [0, "-125vw"] }}
                transition={{
                  duration: 3.4 + (line.id % 4) * 0.35,
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
