import { useState } from "react";
import { cn } from "@/lib/utils";

interface CarImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

/**
 * Image véhicule avec repli scénographique : si la source échoue,
 * on affiche une « scène de lumière » cohérente avec l'identité —
 * jamais d'icône d'image cassée dans un musée.
 */
export function CarImage({ src, alt, className, imgClassName, priority = false }: CarImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("car-frame relative overflow-hidden bg-surface", className)}>
      {/* Scène de lumière : fond de chargement et repli */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 transition-opacity duration-700",
          loaded && !failed ? "opacity-0" : "opacity-100",
        )}
        style={{
          background:
            "radial-gradient(90% 70% at 50% 20%, rgb(255 255 255 / 0.07), transparent 60%), radial-gradient(60% 45% at 50% 100%, rgb(225 6 0 / 0.12), transparent 70%), #101013",
        }}
      />
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "h-full w-full object-cover transition-[opacity,transform,filter] duration-700 will-change-transform",
            loaded ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
        />
      )}
      <div aria-hidden="true" className="car-frame__vignette" />
      <div aria-hidden="true" className="car-frame__glow" />
      <div aria-hidden="true" className="car-frame__sweep" />
    </div>
  );
}
