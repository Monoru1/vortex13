import { img } from "./vehicles";

/* ------------------------------------------------------------------------- */
/*  Contenu éditorial du musée : chiffres, expositions, histoire, avis, FAQ.  */
/* ------------------------------------------------------------------------- */

export const STATS = [
  { value: 68, suffix: "", label: "Véhicules exposés" },
  { value: 12400, suffix: " m²", label: "Surface d'exposition" },
  { value: 320000, suffix: "", label: "Visiteurs par an" },
  { value: 1600, suffix: " ch", label: "Puissance maximale en salle" },
] as const;

export interface Exhibition {
  slug: string;
  title: string;
  dates: string;
  status: "en cours" | "à venir" | "permanente";
  summary: string;
  image: string;
}

export const EXHIBITIONS: Exhibition[] = [
  {
    slug: "nuit-du-groupe-b",
    title: "La Nuit du Groupe B",
    dates: "12 mars — 30 août 2026",
    status: "en cours",
    summary:
      "Quatre ans de rallye sans limites (1982–1986) : les monstres de 500 ch sur terre, leurs pilotes, et la nuit où tout s'est arrêté.",
    image: img("photo-1590362891991-f776e747a588"),
  },
  {
    slug: "carrosserie-italienne",
    title: "Carrozzeria — L'école italienne",
    dates: "15 septembre 2026 — 17 janvier 2027",
    status: "à venir",
    summary:
      "Bertone, Pininfarina, Italdesign : trois ateliers, trente chefs-d'œuvre, et la main de Gandini au centre de tout.",
    image: img("photo-1511919884226-fd3cad34687c"),
  },
  {
    slug: "400-kmh",
    title: "400 km/h — Anatomie d'un record",
    dates: "Exposition permanente",
    status: "permanente",
    summary:
      "De la 300 SL à la Chiron 300+ : un siècle de course à la vitesse raconté par la télémétrie, les pneus et les hommes.",
    image: img("photo-1614200187524-dc4b892acf16"),
  },
  {
    slug: "hypercars-hybrides",
    title: "La Sainte Trinité",
    dates: "8 février — 14 juin 2026",
    status: "en cours",
    summary:
      "2013, l'année où tout a basculé : LaFerrari, P1 et 918 Spyder réunies dans la même salle pour la première fois en France.",
    image: img("photo-1617531653332-bd46c24f2068"),
  },
];

export interface MuseumEvent {
  date: string;
  month: string;
  title: string;
  time: string;
  kind: string;
}

export const EVENTS: MuseumEvent[] = [
  { date: "11", month: "JUIL", title: "Nocturne — Moteurs au réveil", time: "19:00 — 23:00", kind: "Nocturne" },
  { date: "19", month: "JUIL", title: "Masterclass design avec l'atelier Gandini", time: "14:30", kind: "Conférence" },
  { date: "02", month: "AOÛT", title: "Démarrage public : McLaren F1 & F40", time: "11:00 / 16:00", kind: "Démonstration" },
  { date: "23", month: "AOÛT", title: "Visite guidée « Ingénieurs de l'impossible »", time: "10:30", kind: "Visite guidée" },
  { date: "06", month: "SEPT", title: "Cars & Coffee — Parvis du musée", time: "08:30 — 12:00", kind: "Rassemblement" },
];

export const TIMELINE = [
  {
    year: 2003,
    title: "Une collection privée",
    text: "Tout commence par onze voitures réunies en vingt ans par l'industriel Henri Vasseur, stockées dans un hangar de Montrouge que seuls quelques initiés connaissent.",
  },
  {
    year: 2011,
    title: "Le déclic du concours",
    text: "La 250 GTO de la collection remporte Chantilly Arts & Élégance. La file d'attente devant la voiture convainc Vasseur : ces machines doivent être vues.",
  },
  {
    year: 2016,
    title: "Le chantier",
    text: "L'atelier d'architecture Lindqvist & Marès remporte le concours avec « la Nef » : une halle industrielle de 1923 sur les quais de Seine, éventrée par un puits de lumière de 90 mètres.",
  },
  {
    year: 2019,
    title: "Ouverture",
    text: "VORTEX ouvre avec 41 véhicules. 180 000 visiteurs la première année — le double des projections.",
  },
  {
    year: 2022,
    title: "L'aile Hypercars",
    text: "3 200 m² supplémentaires en sous-sol, plateaux tournants et scénographie lumineuse signée Studio Lucem. La Sainte Trinité y entre au complet.",
  },
  {
    year: 2026,
    title: "La Nef immersive",
    text: "Projection à 360° sous la verrière : chaque soir, la halle devient un circuit. La collection atteint 68 véhicules issus de 9 pays.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Le café est hors de prix, la boutique tient dans un placard. Mais à la fermeture, je suis resté seul dix minutes devant la GT40. Personne n'est venu me presser.",
    author: "Julien R.",
    role: "Visiteur, Lyon",
  },
  {
    quote:
      "Ma fille de 9 ans réclamait « la voiture aux portes en haut ». On y est retournés trois dimanches de suite. Le dernier, elle a dessiné la 300 SL de mémoire.",
    author: "Sarah M.",
    role: "Visiteuse, Bruxelles",
  },
  {
    quote:
      "J'ai relevé deux erreurs sur les cartels. Signalées le lundi, corrigées le vendredi. Un musée qui se corrige, ça ne court pas les rues.",
    author: "Marco T.",
    role: "Journaliste automobile",
  },
  {
    quote:
      "La nocturne du Groupe B, tous les moteurs allumés sous la verrière. Je l'avoue sans honte : j'avais les larmes aux yeux.",
    author: "Anaïs D.",
    role: "Membre, depuis l'ouverture",
  },
] as const;

export const FAQ = [
  {
    q: "Faut-il réserver à l'avance ?",
    a: "La réservation en ligne est fortement conseillée le week-end et pendant les vacances scolaires. Les billets sont datés mais non horodatés : vous entrez quand vous voulez dans la journée.",
  },
  {
    q: "Combien de temps dure la visite ?",
    a: "Comptez 2 h à 2 h 30 pour l'ensemble du parcours, et une demi-journée si vous suivez une visite guidée ou assistez à un démarrage public.",
  },
  {
    q: "Le musée est-il accessible aux personnes à mobilité réduite ?",
    a: "Intégralement. Ascenseurs vers l'aile Hypercars, fauteuils disponibles à l'accueil gratuitement, et gratuité pour l'accompagnateur.",
  },
  {
    q: "Peut-on photographier les véhicules ?",
    a: "Oui, sans flash ni trépied. Les shootings professionnels se réservent auprès du service presse.",
  },
  {
    q: "Les voitures roulent-elles encore ?",
    a: "Toutes. C'est un principe fondateur : chaque véhicule de la collection est maintenu en état de marche par notre atelier, et démarré au moins deux fois par an en public.",
  },
] as const;

export const HOURS = [
  { day: "Mardi — Vendredi", time: "10:00 — 19:00" },
  { day: "Samedi — Dimanche", time: "09:30 — 20:00" },
  { day: "Nocturnes (1er vendredi du mois)", time: "jusqu'à 23:00" },
  { day: "Lundi", time: "Fermé" },
] as const;

export const ADDRESS = {
  street: "14 Quai de la Mécanique",
  city: "75015 Paris",
  metro: "M° Javel — André Citroën (ligne 10) · RER C Javel",
  phone: "+33 1 40 00 00 00",
  email: "bonjour@vortex-museum.fr",
} as const;

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  tag: "Salles" | "Détails" | "Nocturnes" | "Atelier";
  tall?: boolean;
}

export const GALLERY: GalleryItem[] = [
  { id: "g1", src: img("photo-1605559424843-9e4c228bf1c2"), alt: "Muscle car sous éclairage zénithal dans la grande nef", tag: "Salles", tall: true },
  { id: "g2", src: img("photo-1583121274602-3e2820c69888"), alt: "Ferrari rouge, plan serré sur l'aile avant", tag: "Détails" },
  { id: "g3", src: img("photo-1553440569-bcc63803a83d"), alt: "Porsche en contre-jour dans l'aile Supercars", tag: "Salles" },
  { id: "g4", src: img("photo-1544636331-e26879cd4d9b"), alt: "Ligne de capot sous lumière rasante", tag: "Détails", tall: true },
  { id: "g5", src: img("photo-1590362891991-f776e747a588"), alt: "Monoplace de course, exposition Groupe B", tag: "Salles" },
  { id: "g6", src: img("photo-1580273916550-e323be2ae537"), alt: "Carrosserie bleue de nuit, reflets de la verrière", tag: "Nocturnes" },
  { id: "g7", src: img("photo-1555215695-3004980ad54e"), alt: "Détail de jante et étrier pendant une nocturne", tag: "Nocturnes" },
  { id: "g8", src: img("photo-1494976388531-d1058494cdd8"), alt: "Capot ouvert en atelier de restauration", tag: "Atelier", tall: true },
  { id: "g9", src: img("photo-1600712242805-5f78671b24da"), alt: "McLaren sur plateau tournant", tag: "Salles" },
  { id: "g10", src: img("photo-1610768764270-790fbec18178"), alt: "Portes en ciseaux ouvertes, aile italienne", tag: "Salles" },
  { id: "g11", src: img("photo-1618843479313-40f8afb4b4d8"), alt: "Calandre chromée d'un classique en lumière douce", tag: "Détails" },
  { id: "g12", src: img("photo-1568605117036-5fe5e7bab0b7"), alt: "Classique sur le parvis un matin de Cars & Coffee", tag: "Atelier" },
] as const;
