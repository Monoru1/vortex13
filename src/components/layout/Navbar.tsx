import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useLockBody, useScrollState, useTheme } from "@/lib/hooks";
import { cn, EASE } from "@/lib/utils";

const LINKS = [
  { to: "/collections", label: "Collections" },
  { to: "/expositions", label: "Expositions" },
  { to: "/galerie", label: "Galerie" },
  { to: "/histoire", label: "Histoire" },
  { to: "/contact", label: "Contact" },
];

/** Navbar intelligente : verre au scroll, se masque à la descente, réapparaît à la remontée. */
export function Navbar() {
  const { scrolled, hidden } = useScrollState();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useLockBody(open);

  return (
    <>
      <a
        href="#contenu"
        className="fixed left-4 top-4 z-[80] -translate-y-24 bg-vortex px-4 py-2 font-mono text-xs uppercase tracking-widest text-white transition-transform focus:translate-y-0"
      >
        Aller au contenu
      </a>

      <motion.header
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: EASE }}
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-[background,border] duration-500",
          scrolled || open ? "glass" : "border-b border-transparent",
        )}
      >
        <div className="shell flex h-[72px] items-center justify-between">
          <Link to="/" className="group flex items-baseline gap-2" aria-label="VORTEX — Accueil">
            <span className="font-display text-xl font-black tracking-tight" style={{ fontStretch: "125%" }}>
              VORTEX
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-smoke transition-colors group-hover:text-vortex">
              Museum
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Navigation principale">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "relative font-mono text-[11px] uppercase tracking-[0.24em] transition-colors duration-300",
                    isActive ? "text-ink" : "text-smoke hover:text-ink",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-tick"
                        className="absolute -bottom-2 left-0 h-[2px] w-full bg-vortex"
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label={theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"}
              className="grid h-10 w-10 place-items-center border border-line text-smoke transition-colors hover:border-vortex hover:text-ink"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <Link
              to="/expositions#billetterie"
              className="hidden bg-vortex px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#ff1a13] md:block"
            >
              Billetterie
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center border border-line lg:hidden"
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Menu mobile plein écran */}
      <AnimatePresence>
        {open && (
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[65] bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="shell flex h-full flex-col justify-center gap-2" aria-label="Navigation mobile">
              {[{ to: "/", label: "Accueil" }, ...LINKS].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ x: -32, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.06 * i, duration: 0.5, ease: EASE }}
                >
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "block py-3 font-display text-4xl font-black uppercase tracking-tight transition-colors",
                        isActive ? "text-vortex" : "text-ink",
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="telemetry mt-10"
              >
                14 Quai de la Mécanique, Paris 15e
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
