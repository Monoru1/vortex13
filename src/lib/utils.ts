/** Concatène des classes conditionnelles sans dépendance externe. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Formate un nombre en français (12 400, 1 160…). */
export const nf = new Intl.NumberFormat("fr-FR");

/** Nettoie une entrée utilisateur : trim + suppression des chevrons. */
export function sanitize(value: string): string {
  return value.replace(/[<>]/g, "").trim();
}

export const EASE = [0.22, 1, 0.36, 1] as const;
