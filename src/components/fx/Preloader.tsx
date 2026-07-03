import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/utils";

const LETTERS = "VORTEX".split("");

/** Séquence d'introduction — jouée une seule fois par session. */
export function Preloader() {
  const [visible, setVisible] = useState(
    () => !sessionStorage.getItem("vortex-intro"),
  );

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      sessionStorage.setItem("vortex-intro", "1");
      setVisible(false);
    }, 2100);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#0A0A0B]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: EASE }}
          aria-hidden="true"
        >
          <div className="flex overflow-hidden">
            {LETTERS.map((l, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: EASE }}
                className="font-display text-5xl font-black tracking-tight text-[#F4F4F2] md:text-7xl"
                style={{ fontStretch: "125%" }}
              >
                {l}
              </motion.span>
            ))}
          </div>
          <div className="mt-8 h-px w-40 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-vortex"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ delay: 0.3, duration: 1.4, ease: "easeInOut" }}
            />
          </div>
          <p className="telemetry mt-6">Automotive Museum — Paris</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
