import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ADDRESS, HOURS } from "@/data/museum";

const NAV = [
  { to: "/collections", label: "Collections" },
  { to: "/expositions", label: "Expositions" },
  { to: "/galerie", label: "Galerie" },
  { to: "/histoire", label: "Histoire" },
  { to: "/contact", label: "Contact" },
];

/* URLs plateformes à remplacer par les comptes réels du client. */
const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "YouTube", href: "https://www.youtube.com" },
  { label: "X", href: "https://x.com" },
];

export function Footer() {
  return (
    <footer className="hairline-t bg-surface/60">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl font-black tracking-tight" style={{ fontStretch: "125%" }}>
              VORTEX
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-smoke">
              Musée automobile consacré aux machines qui ont changé l'histoire —
              toutes maintenues en état de marche, toutes racontées.
            </p>
            <p className="telemetry mt-8">
              {ADDRESS.street} · {ADDRESS.city}
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Pied de page">
            <p className="telemetry mb-5">Explorer</p>
            <ul className="space-y-3">
              {NAV.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-smoke transition-colors hover:text-vortex">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="telemetry mb-5">Horaires</p>
            <ul className="space-y-3 text-sm text-smoke">
              {HOURS.slice(0, 3).map((h) => (
                <li key={h.day}>
                  <span className="block text-ink/80">{h.day}</span>
                  <span className="font-mono text-xs">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="telemetry mb-5">Suivre</p>
            <ul className="space-y-3">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-sm text-smoke transition-colors hover:text-vortex"
                  >
                    {s.label}
                    <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hairline-t mt-14 flex flex-col gap-3 pt-7 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-smoke">
            © {new Date().getFullYear()} VORTEX Automotive Museum — Site fictif de démonstration
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-smoke">
            48.8466° N — 2.2780° E
          </p>
        </div>
      </div>
    </footer>
  );
}
