import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonLinkProps {
  to: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
}

/** CTA principal : plein rouge ou fantôme, flèche animée au survol. */
export function ButtonLink({ to, children, variant = "solid", className }: ButtonLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center gap-3 px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] transition-colors duration-300",
        variant === "solid" && "bg-vortex text-white hover:bg-[#ff1a13]",
        variant === "ghost" && "border border-line text-ink hover:border-vortex hover:text-vortex",
        className,
      )}
    >
      {children}
      <ArrowRight
        size={14}
        className="transition-transform duration-300 ease-vortex group-hover:translate-x-1.5"
        aria-hidden="true"
      />
    </Link>
  );
}
