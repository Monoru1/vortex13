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
        initial={{ opacity: 0, y: 24, scale: 0.992, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -18, scale: 1.006, filter: "blur(10px)" }}
        transition={{ duration: 0.82, ease: EASE }}
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
        initial={{ x: "-108%" }}
        animate={{ x: ["-108%", "0%", "0%", "108%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.15, times: [0, 0.32, 0.55, 1], ease: EASE }}
      >
        <span className="route-door__core" />
      </motion.div>
      <motion.div
        key={`scan-${pathname}`}
        aria-hidden="true"
        className="route-scan"
        initial={{ x: "-110%" }}
        animate={{ x: ["-110%", "110%"], opacity: [0, 1, 0] }}
        transition={{ duration: 1.05, delay: 0.08, ease: EASE }}
      />
      <Footer />
    </>
  );
}
