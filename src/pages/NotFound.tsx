import { Seo } from "@/components/seo/Seo";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Seo title="Page introuvable" description="Cette page n'existe pas ou a été déplacée." />
      <section className="shell flex min-h-[80vh] flex-col justify-center py-40">
        <Reveal>
          <p className="telemetry">Erreur 404 · Sortie de piste</p>
        </Reveal>
        <h1 className="mt-6 max-w-4xl text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-[0.88] tracking-tight">
          <RevealLines lines={["Cette salle", "n'existe pas"]} />
        </h1>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-md text-base leading-relaxed text-smoke">
            L'adresse demandée ne mène nulle part — peut-être un lien périmé,
            peut-être une faute de frappe. Les collections, elles, sont bien là.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-4">
          <ButtonLink to="/">Retour à l'accueil</ButtonLink>
          <ButtonLink to="/collections" variant="ghost">Voir les collections</ButtonLink>
        </Reveal>
      </section>
    </>
  );
}
