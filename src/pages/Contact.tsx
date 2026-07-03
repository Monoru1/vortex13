import { useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Mail, MapPin, Phone, Send } from "lucide-react";
import { Seo } from "@/components/seo/Seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ADDRESS, FAQ, HOURS } from "@/data/museum";
import { cn, sanitize, EASE } from "@/lib/utils";

/* ---------- Formulaire ---------- */

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // honeypot — invisible pour les humains
}

const EMPTY: FormState = { name: "", email: "", subject: "Visite de groupe", message: "", website: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.26em] text-smoke">{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 font-mono text-[11px] text-vortex"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const INPUT_CLS =
  "w-full border border-line bg-surface px-4 py-3.5 text-sm text-ink placeholder:text-smoke/50 transition-colors focus:border-vortex focus:outline-none";

function ContactForm() {
  const uid = useId();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    /* Honeypot rempli → bot : on simule un succès silencieux, rien n'est traité. */
    if (form.website) { setSent(true); return; }

    const name = sanitize(form.name);
    const email = sanitize(form.email);
    const message = sanitize(form.message);

    const next: typeof errors = {};
    if (name.length < 2) next.name = "Votre nom est requis (2 caractères min).";
    if (!EMAIL_RE.test(email)) next.email = "Adresse e-mail invalide.";
    if (message.length < 20) next.message = "Votre message est un peu court (20 caractères min).";
    if (message.length > 2000) next.message = "2 000 caractères maximum.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="glass border border-line p-10 text-center"
      >
        <span className="mx-auto grid h-12 w-12 place-items-center border border-vortex text-vortex">
          <Check size={18} aria-hidden="true" />
        </span>
        <p className="mt-6 font-display text-2xl font-black uppercase tracking-tight">Message envoyé</p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-smoke">
          Merci {sanitize(form.name) || "pour votre message"}. Notre équipe vous répond sous 48 h
          ouvrées. (Formulaire de démonstration — aucune donnée n'est transmise.)
        </p>
        <button
          onClick={() => { setForm(EMPTY); setSent(false); }}
          className="mt-8 border border-line px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors hover:border-vortex hover:text-vortex"
        >
          Nouveau message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-6">
      {/* Honeypot anti-spam : hors écran, ignoré des lecteurs d'écran et du focus. */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Ne pas remplir</label>
        <input
          id={`${uid}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={set("website")}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Nom" error={errors.name}>
          <input
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            value={form.name}
            onChange={set("name")}
            placeholder="Jeanne Moreau"
            aria-invalid={Boolean(errors.name)}
            className={cn(INPUT_CLS, errors.name && "border-vortex")}
          />
        </Field>
        <Field label="E-mail" error={errors.email}>
          <input
            type="email"
            required
            maxLength={120}
            autoComplete="email"
            value={form.email}
            onChange={set("email")}
            placeholder="jeanne@exemple.fr"
            aria-invalid={Boolean(errors.email)}
            className={cn(INPUT_CLS, errors.email && "border-vortex")}
          />
        </Field>
      </div>

      <Field label="Sujet">
        <select value={form.subject} onChange={set("subject")} className={INPUT_CLS}>
          <option>Visite de groupe</option>
          <option>Privatisation & événements</option>
          <option>Presse & médias</option>
          <option>Proposer un véhicule</option>
          <option>Autre demande</option>
        </select>
      </Field>

      <Field label="Message" error={errors.message}>
        <textarea
          required
          rows={6}
          maxLength={2000}
          value={form.message}
          onChange={set("message")}
          placeholder="Dites-nous tout — dates, effectif, contexte…"
          aria-invalid={Boolean(errors.message)}
          className={cn(INPUT_CLS, "resize-y", errors.message && "border-vortex")}
        />
      </Field>

      <div className="flex items-center justify-between gap-6">
        <p className="text-xs leading-relaxed text-smoke">
          Vos données ne servent qu'à vous répondre. Jamais de newsletter non sollicitée.
        </p>
        <button
          type="submit"
          className="group inline-flex shrink-0 items-center gap-3 bg-vortex px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-[#ff1a13]"
        >
          Envoyer
          <Send size={13} className="transition-transform duration-300 ease-vortex group-hover:translate-x-1" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}

/* ---------- FAQ accordéon ---------- */

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-line">
      {FAQ.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-line">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="font-display text-base font-black uppercase tracking-tight transition-colors group-hover:text-vortex md:text-lg">
                {f.q}
              </span>
              <ChevronDown
                size={16}
                className={cn("shrink-0 text-smoke transition-transform duration-300 ease-vortex", isOpen && "rotate-180 text-vortex")}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 text-sm leading-relaxed text-smoke">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Carte stylisée (SVG maison, zéro dépendance tierce) ---------- */

function StylizedMap() {
  return (
    <figure className="relative overflow-hidden border border-line bg-surface">
      <svg viewBox="0 0 640 360" className="h-auto w-full" role="img" aria-label="Plan d'accès stylisé : le musée au 14 Quai de la Mécanique, sur la rive de la Seine, métro Javel à proximité">
        <defs>
          <pattern id="grid-c" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgb(var(--ink) / 0.06)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="640" height="360" fill="url(#grid-c)" />
        {/* La Seine */}
        <path d="M -10 240 C 140 200, 300 300, 460 250 S 620 190, 660 220" fill="none" stroke="rgb(var(--ink) / 0.18)" strokeWidth="34" strokeLinecap="round" />
        <path d="M -10 240 C 140 200, 300 300, 460 250 S 620 190, 660 220" fill="none" stroke="rgb(var(--ink) / 0.08)" strokeWidth="26" strokeLinecap="round" />
        {/* Voies */}
        <path d="M 80 -10 L 120 370 M 240 -10 L 210 370 M 420 -10 L 450 370 M 560 -10 L 540 370" stroke="rgb(var(--ink) / 0.1)" strokeWidth="2" />
        <path d="M -10 90 L 650 70 M -10 160 L 650 150" stroke="rgb(var(--ink) / 0.1)" strokeWidth="2" />
        {/* Métro Javel */}
        <circle cx="452" cy="150" r="7" fill="none" stroke="rgb(var(--ink) / 0.45)" strokeWidth="2" />
        <text x="466" y="155" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="rgb(var(--smoke))">M° Javel</text>
        {/* Le musée */}
        <g>
          <rect x="196" y="176" width="70" height="42" fill="none" stroke="#E10600" strokeWidth="2" />
          <circle cx="231" cy="197" r="26" fill="none" stroke="#E10600" strokeWidth="1" opacity="0.5">
            <animate attributeName="r" values="20;34" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <text x="231" y="242" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2" fill="#E10600">VORTEX</text>
        </g>
      </svg>
      <figcaption className="hairline-t flex flex-wrap items-center gap-x-6 gap-y-1 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
        <span>48.8466° N — 2.2780° E</span>
        <span className="ml-auto">Plan schématique</span>
      </figcaption>
    </figure>
  );
}

/* ---------- Page ---------- */

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact & Accès"
        description="Horaires, accès, formulaire de contact et questions fréquentes du VORTEX Automotive Museum — 14 Quai de la Mécanique, Paris 15e."
      />

      <header className="shell pb-16 pt-40 md:pb-20">
        <SectionHeading
          eyebrow="Contact & informations pratiques"
          lines={["Venez voir", "les machines"]}
          lead="Une question, un projet de privatisation, une visite de groupe ? Écrivez-nous — et si vous passez simplement, voici tout ce qu'il faut savoir."
        />
      </header>

      {/* ===== Formulaire + coordonnées ===== */}
      <section className="shell grid gap-14 pb-24 md:pb-32 lg:grid-cols-12">
        <Reveal className="relative lg:col-span-7">
          <ContactForm />
        </Reveal>

        <div className="lg:col-span-4 lg:col-start-9">
          <Reveal delay={0.1}>
            <address className="grid gap-6 not-italic">
              <div className="flex gap-4">
                <MapPin size={16} className="mt-1 shrink-0 text-vortex" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-smoke">
                  <span className="block text-ink">{ADDRESS.street}</span>
                  {ADDRESS.city}
                  <span className="mt-1 block">{ADDRESS.metro}</span>
                </p>
              </div>
              <div className="flex gap-4">
                <Phone size={16} className="mt-1 shrink-0 text-vortex" aria-hidden="true" />
                <a href={`tel:${ADDRESS.phone.replace(/\s/g, "")}`} className="text-sm text-smoke transition-colors hover:text-vortex">
                  {ADDRESS.phone}
                </a>
              </div>
              <div className="flex gap-4">
                <Mail size={16} className="mt-1 shrink-0 text-vortex" aria-hidden="true" />
                <a href={`mailto:${ADDRESS.email}`} className="text-sm text-smoke transition-colors hover:text-vortex">
                  {ADDRESS.email}
                </a>
              </div>
            </address>
          </Reveal>

          <Reveal delay={0.18} className="mt-12">
            <p className="telemetry">Horaires</p>
            <dl className="mt-5 border-t border-line">
              {HOURS.map((h) => (
                <div key={h.day} className="flex items-baseline justify-between gap-6 border-b border-line py-3.5">
                  <dt className="text-sm text-smoke">{h.day}</dt>
                  <dd className={cn("font-mono text-xs tabular-nums", h.time === "Fermé" ? "text-vortex" : "text-ink")}>
                    {h.time}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ===== Carte ===== */}
      <section aria-label="Plan d'accès" className="shell pb-24 md:pb-32">
        <Reveal>
          <StylizedMap />
        </Reveal>
      </section>

      {/* ===== FAQ ===== */}
      <section aria-labelledby="faq-titre" className="border-t border-line">
        <div className="shell grid gap-14 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="telemetry">FAQ</p>
              <h2 id="faq-titre" className="mt-5 text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl">
                Questions
                <br />
                fréquentes
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <Faq />
          </Reveal>
        </div>
      </section>
    </>
  );
}
