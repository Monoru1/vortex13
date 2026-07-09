import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { img } from "@/data/vehicles";

const AMBIENCES = {
  collections: {
    match: (path: string) => path.startsWith("/collections"),
    image: img("photo-1526726538690-5cbf956ae2fd", 2200),
    accent: "rgb(225 6 0 / 0.18)",
    position: "center 42%",
  },
  exhibitions: {
    match: (path: string) => path.startsWith("/expositions"),
    image: img("photo-1518987048-93e29699e79a", 2200),
    accent: "rgb(200 169 106 / 0.16)",
    position: "center 36%",
  },
  gallery: {
    match: (path: string) => path.startsWith("/galerie"),
    image: img("photo-1626668893632-6f3a4466d22f", 2200),
    accent: "rgb(67 180 255 / 0.15)",
    position: "center 48%",
  },
  history: {
    match: (path: string) => path.startsWith("/histoire"),
    image: img("photo-1568605117036-5fe5e7bab0b7", 2200),
    accent: "rgb(200 169 106 / 0.13)",
    position: "center 38%",
  },
  contact: {
    match: (path: string) => path.startsWith("/contact"),
    image: img("photo-1493238792000-8113da705763", 2200),
    accent: "rgb(225 6 0 / 0.14)",
    position: "center 48%",
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75 }}
      style={{
        "--page-ambience-image": `url(${ambience.image})`,
        "--page-ambience-accent": ambience.accent,
        "--page-ambience-position": ambience.position,
      } as React.CSSProperties}
    />
  );
}
