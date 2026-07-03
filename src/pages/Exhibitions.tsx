import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus, Ticket } from "lucide-react";
import { Seo } from "@/components/seo/Seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CarImage } from "@/components/ui/CarImage";
import { EXHIBITIONS, EVENTS } from "@/data/museum";
import { cn, nf, EASE } from "@/lib/utils";

const STATUS_STYLE: Record<string, string> = {
  "en cours": "border-vortex/60 text-vortex",
  "à venir": "border-line text-smoke",
  permanente: "border-line text-ink",
};

/* ---------- Billetterie fictive ---------- */

const TICKETS = [
  { id: "plein", label: "Plein tarif", price: 24, note: "Accès collections + expositions" },
  { id: "reduit", label: "Tarif réduit", price: 16, note: "12–25 ans, demandeurs d'emploi" },
  { id: "nocturne", label: "Nocturne", price: 19, note: "1er vendredi du mois, dès 19 h" },
] as const;

type TicketId = (typeof TICKETS)[number]["id"];

function Ticketing() {
  const [counts, setCounts] = useState<Record<TicketId, number>>({ plein: 1, reduit: 0, nocturne: 0 });
  const [confirmed, setConfirmed] = useState(false);

  const total = useMemo(
    () => TICKETS.reduce((sum, t) => sum + t.price * counts[t.id], 0),
    [counts],
  );
  const qty = counts.plein + counts.reduit + counts.nocturne;

  const update = (id: TicketId, delta: number) => {
    setConfirmed(false);
    setCounts((c) => ({ ...c, [id]: Math.min(10, Math.max(0, c[id] + delta)) }));
  };

  return (
    <section id="billetterie" aria-labelledby="billetterie-titre" className="scroll-mt-28 border-t border-line">
      <div className="shell grid gap-14 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="telemetry">Billetterie</p>
            <h2 id="billetterie-titre" className="mt-5 text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl">
              Réserver
              <br />
              sa visite
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-smoke">
              Billets valables pour la date de votre choix, coupe-file inclus.
              Gratuit pour les moins de 12 ans. Billetterie de démonstration —
              aucun paiement n'est traité sur ce site.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="border-t border-line">
            {TICKETS.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.06} y={14}>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-line py-6">
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg font-black uppercase tracking-tight">{t.label}</p>
                    <p className="mt-1 text-xs text-smoke">{t.note}</p>
                  </div>
                  <p className="font-mono text-sm tabular-nums text-smoke">{t.price} €</p>
                  <div className="flex items-center gap-1 border border-line" role="group" aria-label={`Quantité — ${t.label}`}>
                    <button
                      onClick={() => update(t.id, -1)}
                      disabled={counts[t.id] === 0}
                      aria-label={`Retirer un billet ${t.label}`}
                      className="grid h-10 w-10 place-items-center text-smoke transition-colors hover:text-vortex disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center font-mono text-sm tabular-nums" aria-live="polite">
                      {counts[t.id]}
                    </span>
                    <button
                      onClick={() => update(t.id, 1)}
                      disabled={counts[t.id] === 10}
                      aria-label={`Ajouter un billet ${t.label}`}
                      className="grid h-10 w-10 place-items-center text-smoke transition-colors hover:text-vortex disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-smoke">
              Total{" "}
              <span className="ml-3 text-2xl font-bold tabular-nums tracking-normal text-ink">
                {nf.format(total)} €
              </span>
            </p>
            <button
              onClick={() => setConfirmed(true)}
              disabled={qty === 0 || confirmed}
              className={cn(
                "group inline-flex items-center gap-3 px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] transition-colors duration-300",
                confirmed
                  ? "cursor-default border border-line text-smoke"
                  : "bg-vortex text-white hover:bg-[#ff1a13] disabled:cursor-not-allowed disabled:opacity-40",
              )}
            >
              {confirmed ? <Check size={14} aria-hidden="true" /> : <Ticket size={14} aria-hidden="true" />}
              {confirmed ? "Réservation simulée" : "Réserver"}
            </button>
          </div>

          <AnimatePresence>
            {confirmed && (
              <motion.p
                role="status"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mt-6 border border-line bg-surface p-5 text-sm leading-relaxed text-smoke"
              >
                <span className="text-ink">Réservation confirmée (démonstration).</span> Sur le site
                réel, vous recevriez ici vos {qty > 1 ? `${qty} billets` : "billet"} par e-mail avec
                QR code — total {nf.format(total)} €.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

export default function Exhibitions() {
  return (
    <>
      <Seo
        title="Expositions & Événements"
        description="Expositions temporaires, permanentes et agenda des événements du VORTEX Automotive Museum. Billetterie en ligne."
      />

      <header className="shell pb-16 pt-40 md:pb-20">
        <SectionHeading
          eyebrow="Programmation 2026"
          lines={["Ce qui se passe", "sous la Nef"]}
          lead="Quatre expositions, des nocturnes, des démarrages publics et des rencontres avec ceux qui ont dessiné ces machines."
        />
      </header>

      {/* ===== Expositions ===== */}
      <section aria-label="Expositions" className="shell pb-24 md:pb-32">
        <div className="grid gap-px border border-line bg-[var(--line)] md:grid-cols-2">
          {EXHIBITIONS.map((e, i) => (
            <Reveal key={e.slug} delay={(i % 2) * 0.08} className="bg-bg">
              <article className="group flex h-full flex-col">
                <div className="relative overflow-hidden">
                  <CarImage
                    src={e.image}
                    alt={`Visuel de l'exposition ${e.title}`}
                    className="aspect-[16/9]"
                    imgClassName="transition-transform duration-700 ease-vortex group-hover:scale-[1.04]"
                  />
                  <span
                    className={cn(
                      "absolute left-5 top-5 border bg-bg/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] backdrop-blur-sm",
                      STATUS_STYLE[e.status],
                    )}
                  >
                    {e.status}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7 md:p-9">
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-smoke">{e.dates}</p>
                  <h2 className="mt-3 font-display text-2xl font-black uppercase leading-[0.95] tracking-tight md:text-3xl">
                    {e.title}
                  </h2>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-smoke">{e.summary}</p>
                  <a
                    href="#billetterie"
                    className="mt-auto inline-flex items-center gap-2 pt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-ink transition-colors hover:text-vortex"
                  >
                    Réserver <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Agenda ===== */}
      <section aria-labelledby="agenda-titre" className="border-t border-line">
        <div className="shell py-24 md:py-32">
          <Reveal>
            <p className="telemetry">Agenda · Été 2026</p>
            <h2 id="agenda-titre" className="mt-5 text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl">
              Les rendez-vous
            </h2>
          </Reveal>

          <ol className="mt-14 border-t border-line">
            {EVENTS.map((ev, i) => (
              <Reveal key={`${ev.date}-${ev.month}`} delay={i * 0.05} y={14}>
                <li className="group grid items-center gap-x-8 gap-y-2 border-b border-line py-6 transition-colors duration-300 hover:bg-surface md:grid-cols-[6rem_1fr_auto_auto] md:px-4">
                  <p className="font-display text-2xl font-black uppercase leading-none tracking-tight">
                    {ev.date}
                    <span className="ml-2 font-mono text-[11px] font-normal tracking-[0.24em] text-smoke">{ev.month}</span>
                  </p>
                  <p className="text-base text-ink/90 md:text-lg">{ev.title}</p>
                  <p className="font-mono text-xs tabular-nums text-smoke">{ev.time}</p>
                  <p className="border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke transition-colors duration-300 group-hover:border-vortex/50 group-hover:text-ink">
                    {ev.kind}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Ticketing />
    </>
  );
}
