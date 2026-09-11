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
        className="fixed left-4 top-4 z-[80] -translate-y-24 bg-white/5 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/80 backdrop-blur-sm transition-transform focus:translate-y-0"
      >
        Aller au contenu
      </a>

      <motion.header
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: EASE }}
        className={cn(
          "fixed inset-x-0 top-0 z-[70] border-b transition-[background,border-color,backdrop-filter] duration-500",
          scrolled || open ? "border-white/10 bg-[#09090b]/70 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      >
        <div className="shell flex h-[72px] items-center justify-between">
          <Link to="/" className="group inline-flex items-baseline gap-2" aria-label="VORTEX — Accueil">
            <span className="font-display text-xl font-black tracking-[-0.08em] text-white" style={{ fontStretch: "125%" }}>
              VORTEX
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/50">
              Museum
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "font-mono text-[10px] uppercase tracking-[0.24em] transition-colors duration-300",
                    isActive ? "text-white" : "text-white/55 hover:text-white",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label={theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"}
              className="grid h-9 w-9 place-items-center border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-white/30 hover:text-white"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center border border-white/10 bg-white/5 text-white/70 lg:hidden"
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[65] bg-[#09090b]/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="shell flex h-full flex-col justify-center gap-2" aria-label="Navigation mobile">
              {[{ to: "/", label: "Accueil" }, ...LINKS].map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * index, duration: 0.35, ease: EASE }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "block py-3 font-display text-4xl font-black uppercase tracking-[-0.06em] transition-colors",
                        isActive ? "text-white" : "text-white/60",
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
