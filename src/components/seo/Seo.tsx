import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
}

/**
 * Gestion des métadonnées par page sans dépendance externe.
 * Suffisant pour une SPA ; en cas de besoin SEO fort, basculer
 * vers un pré-rendu (vite-plugin-ssr / prerender) sans changer l'API.
 */
export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = `${title} — VORTEX Automotive Museum`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
  }, [title, description]);
  return null;
}
