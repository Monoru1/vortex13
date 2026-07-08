import { useCallback, useEffect, useState } from "react";
import type { RefObject } from "react";

/** Direction de scroll — pilote la navbar intelligente. */
export function useScrollState(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > threshold);
        setHidden(y > 480 && y > lastY);
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { scrolled, hidden };
}

/** Respect de prefers-reduced-motion. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/** Thème clair/sombre persistant. Sombre par défaut : c'est l'identité du musée. */
export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    localStorage.getItem("vortex-theme") === "light" ? "light" : "dark",
  );
  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("vortex-theme", theme);
  }, [theme]);
  const toggle = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);
  return { theme, toggle };
}

/** Verrouille le scroll du body (menu mobile, lightbox). */
export function useLockBody(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

/** Détecte un pointeur précis (souris / trackpad) — exclut le tactile. */
export function usePointerFine(): boolean {
  const [fine, setFine] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const handler = (e: MediaQueryListEvent) => setFine(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return fine;
}

/**
 * Indique si l'élément référencé est (au moins partiellement) dans le viewport.
 * Sert à geler les boucles d'animation coûteuses lorsqu'elles sortent de l'écran.
 */
export function useInViewport<T extends Element>(
  ref: RefObject<T | null>,
  rootMargin = "120px",
): boolean {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}
