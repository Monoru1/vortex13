import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CustomCursor } from "@/components/fx/CustomCursor";
import { Preloader } from "@/components/fx/Preloader";
import { EASE } from "@/lib/utils";

/** Coquille applicative : navigation, transitions de page, curseur, remontée au changement de route. */
export function Layout() {
  const { pathname, hash } = useLocation();

  /* Remontée à chaque route ; si une ancre est présente (#billetterie…),
     on la résout après le montage de la page chargée à la demande. */
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      return;
    }
    let tries = 0;
    const seek = () => {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else if (tries++ < 10) requestAnimationFrame(seek);
    };
    seek();
  }, [pathname, hash]);

  return (
    <>
      <Preloader />
      <CustomCursor />
      <Navbar />
      <motion.main
        id="contenu"
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <Outlet />
      </motion.main>
      {/* Ligne de transition : la signature rouge balaie l'écran à chaque navigation */}
      <motion.div
        key={`wipe-${pathname}`}
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[85] h-[2px] bg-vortex"
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
        transition={{ duration: 1.1, times: [0, 0.6, 1], ease: EASE }}
      />
      <Footer />
    </>
  );
}
