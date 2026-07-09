import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CustomCursor } from "@/components/fx/CustomCursor";
import { Preloader } from "@/components/fx/Preloader";
import { VortexAtmosphere } from "@/components/fx/VortexAtmosphere";
import { ImmersiveHall } from "@/components/hero/ImmersiveHall";
import { PageAmbience } from "@/components/layout/PageAmbience";
import { EASE } from "@/lib/utils";

/** Coquille applicative : navigation, transitions de page, curseur, remontée au changement de route. */
export function Layout() {
  const { pathname, hash } = useLocation();
  const isHome = pathname === "/";

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
      <PageAmbience />
      {!isHome && <VortexAtmosphere />}
      <Navbar />
      <motion.main
        id="contenu"
        key={pathname}
        className="relative z-10"
        initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
        transition={{ duration: 0.72, ease: EASE }}
      >
        {isHome && <ImmersiveHall />}
        <div className={isHome ? "vortex-home-outlet" : undefined}>
          <Outlet />
        </div>
      </motion.main>
      <motion.div
        key={`door-${pathname}`}
        aria-hidden="true"
        className="route-door"
        initial={{ x: "-105%" }}
        animate={{ x: ["-105%", "0%", "105%"], opacity: [0, 1, 0] }}
        transition={{ duration: 0.95, times: [0, 0.42, 1], ease: EASE }}
      />
      <motion.div
        key={`wipe-${pathname}`}
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[91] h-[2px] bg-vortex"
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
        transition={{ duration: 1.1, times: [0, 0.6, 1], ease: EASE }}
      />
      <Footer />
    </>
  );
}
