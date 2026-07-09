import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { img } from "@/data/vehicles";

const AMBIENCES = {
  collections: {
    match: (path: string) => path.startsWith("/collections"),
    image: img("photo-1526726538690-5cbf956ae2fd", 2200),
    accent: "rgb(225 6 0 / 0.18)",
    position: "center 36%",
    intensity: 0.82,
  },
  exhibitions: {
    match: (path: string) => path.startsWith("/expositions"),
    image: img("photo-1518987048-93e29699e79a", 2200),
    accent: "rgb(200 169 106 / 0.16)",
    position: "center 34%",
    intensity: 0.78,
  },
  gallery: {
    match: (path: string) => path.startsWith("/galerie"),
    image: img("photo-1626668893632-6f3a4466d22f", 2200),
    accent: "rgb(67 180 255 / 0.16)",
    position: "center 42%",
    intensity: 0.82,
  },
  history: {
    match: (path: string) => path.startsWith("/histoire"),
    image: img("photo-1568605117036-5fe5e7bab0b7", 2200),
    accent: "rgb(200 169 106 / 0.15)",
    position: "center 32%",
    intensity: 0.72,
  },
  contact: {
    match: (path: string) => path.startsWith("/contact"),
    image: img("photo-1493238792000-8113da705763", 2200),
    accent: "rgb(225 6 0 / 0.16)",
    position: "center 44%",
    intensity: 0.78,
  },
};

export function PageAmbience() {
  const { pathname } = useLocation();
  const ambience = useMemo(
    () => Object.values(AMBIENCES).find((item) => item.match(pathname)),
    [pathname],
  );

  if (!ambience) return null;

  return (
    <motion.div
      key={pathname.split("/")[1]}
      aria-hidden="true"
      className="page-ambience"
      initial={{ opacity: 0, scale: 1.035 }}
      animate={{ opacity: ambience.intensity, scale: 1 }}
      exit={{ opacity: 0, scale: 1.025 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        "--page-ambience-image": `url(${ambience.image})`,
        "--page-ambience-accent": ambience.accent,
        "--page-ambience-position": ambience.position,
      } as React.CSSProperties}
    />
  );
}
