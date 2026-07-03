/* ------------------------------------------------------------------------- */
/*  Catalogue des véhicules — la donnée pilote l'interface.                    */
/*  Les visuels Unsplash sont des images éditoriales de substitution :        */
/*  en production, remplacer par la photothèque officielle du musée           */
/*  (voir README, section « Pipeline images »).                               */
/* ------------------------------------------------------------------------- */

export type CategoryId = "classiques" | "supercars" | "hypercars" | "concept";

export interface Category {
  id: CategoryId;
  label: string;
  period: string;
  intro: string;
  accent: string; // teinte propre à chaque collection
  image: string;
}

export interface Vehicle {
  slug: string;
  name: string;
  brand: string;
  year: number;
  country: string;
  category: CategoryId;
  tagline: string;
  history: string;
  engine: string;
  powerCh: number;
  topSpeedKmh: number;
  accelS: number; // 0–100 km/h
  weightKg: number;
  production: string;
  transmission: string;
  drive: string;
  anecdotes: [string, string];
  timeline: Array<{ year: number; event: string }>;
  image: string;
}

/** Construit une URL Unsplash optimisée (format auto, recadrage, qualité maîtrisée). */
export const img = (id: string, w = 1600): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const CATEGORIES: Category[] = [
  {
    id: "classiques",
    label: "Classiques",
    period: "1954 — 1973",
    intro:
      "Les fondations du mythe. Des carrosseries dessinées à la main, des mécaniques qui ont défini ce que « conduire » veut dire.",
    accent: "#C8A96A",
    image: img("photo-1526726538690-5cbf956ae2fd"),
  },
  {
    id: "supercars",
    label: "Supercars",
    period: "1971 — 1993",
    intro:
      "L'âge de la démesure maîtrisée. Moteur central, affiches de chambre d'adolescent, records qui tiennent encore.",
    accent: "#E10600",
    image: img("photo-1518987048-93e29699e79a"),
  },
  {
    id: "hypercars",
    label: "Hypercars",
    period: "2005 — 2019",
    intro:
      "Quand l'ingénierie dépasse la fiction : quatre chiffres de puissance, hybridation de course, 490 km/h au compteur.",
    accent: "#6BA8FF",
    image: img("photo-1626668893632-6f3a4466d22f"),
  },
  {
    id: "concept",
    label: "Concept Cars",
    period: "1968 — 2012",
    intro:
      "Les laboratoires roulants. Des idées trop en avance pour la série, qui ont dessiné les cinquante années suivantes.",
    accent: "#9C7BD8",
    image: img("photo-1542282088-fe8426682b8f"),
  },
];

export const VEHICLES: Vehicle[] = [
  /* ------------------------------- CLASSIQUES ---------------------------- */
  {
    slug: "mercedes-300-sl",
    name: "300 SL « Papillon »",
    brand: "Mercedes-Benz",
    year: 1954,
    country: "Allemagne",
    category: "classiques",
    tagline: "La première supercar de l'histoire, avant même que le mot existe.",
    history:
      "Née de la voiture de course W194 victorieuse au Mans en 1952, la 300 SL est la première voiture de série à injection directe d'essence. Son châssis tubulaire impose des seuils de porte très hauts — d'où ses célèbres portes papillon, une contrainte d'ingénieur devenue le geste de design le plus copié du siècle.",
    engine: "6 cylindres en ligne 3.0 L, injection directe",
    powerCh: 215,
    topSpeedKmh: 250,
    accelS: 9.3,
    weightKg: 1295,
    production: "1 400 coupés (1954–1957)",
    transmission: "Manuelle 4 rapports",
    drive: "Propulsion",
    anecdotes: [
      "C'est l'importateur américain Max Hoffman qui a convaincu Stuttgart de produire la voiture — il en a commandé 1 000 avant même de l'avoir vue.",
      "Avec 250 km/h en pointe, c'était la voiture de série la plus rapide du monde en 1954.",
    ],
    timeline: [
      { year: 1952, event: "La W194 de course remporte Le Mans et la Carrera Panamericana." },
      { year: 1954, event: "Présentation du coupé de série au Salon de New York." },
      { year: 1999, event: "Élue « voiture de sport du siècle » par un jury international." },
    ],
    image: img("photo-1568605117036-5fe5e7bab0b7"),
  },
  {
    slug: "jaguar-e-type",
    name: "E-Type Série 1",
    brand: "Jaguar",
    year: 1961,
    country: "Royaume-Uni",
    category: "classiques",
    tagline: "« La plus belle voiture jamais dessinée. » — Enzo Ferrari",
    history:
      "Dévoilée à Genève en 1961, l'E-Type applique à la route l'aérodynamique des Type D victorieuses au Mans. Son long capot dessiné par Malcolm Sayer, mathématicien de formation, est calculé avant d'être dessiné. Vendue moitié moins cher qu'une Ferrari équivalente, elle démocratise le fantasme.",
    engine: "6 cylindres en ligne XK 3.8 L, triple carburateur",
    powerCh: 265,
    topSpeedKmh: 241,
    accelS: 6.9,
    weightKg: 1234,
    production: "≈ 38 400 Série 1 (1961–1968)",
    transmission: "Manuelle 4 rapports Moss",
    drive: "Propulsion",
    anecdotes: [
      "Pour la première à Genève, le pilote d'essai Norman Dewis a rallié Coventry–Genève de nuit, en 11 heures, pour amener une seconde voiture face à la demande.",
      "Le MoMA de New York l'a intégrée à sa collection permanente en 1996 — l'une des rares automobiles à y figurer.",
    ],
    timeline: [
      { year: 1961, event: "Présentation au Salon de Genève, la presse parle d'un choc esthétique." },
      { year: 1964, event: "Passage au moteur 4.2 L, plus coupleux." },
      { year: 1996, event: "Entrée dans la collection permanente du MoMA." },
    ],
    image: img("photo-1526726538690-5cbf956ae2fd"),
  },
  {
    slug: "ferrari-250-gto",
    name: "250 GTO",
    brand: "Ferrari",
    year: 1962,
    country: "Italie",
    category: "classiques",
    tagline: "36 exemplaires. La voiture la plus chère du monde aux enchères.",
    history:
      "Construite pour homologuer Ferrari en championnat GT, la 250 GTO marie le V12 Colombo à une carrosserie affinée en soufflerie — une rareté à l'époque. Chaque exemplaire diffère légèrement : les carrossiers ajustaient l'aluminium au marteau, châssis par châssis.",
    engine: "V12 Colombo 3.0 L, 6 carburateurs Weber",
    powerCh: 300,
    topSpeedKmh: 280,
    accelS: 6.1,
    weightKg: 880,
    production: "36 exemplaires (1962–1964)",
    transmission: "Manuelle 5 rapports",
    drive: "Propulsion",
    anecdotes: [
      "En 2018, un châssis s'est vendu 70 millions de dollars de gré à gré — record absolu pour une automobile à l'époque.",
      "Enzo Ferrari validait personnellement chaque acheteur : posséder une GTO se méritait avant de se payer.",
    ],
    timeline: [
      { year: 1962, event: "Débuts aux 12 Heures de Sebring, 2e au général d'entrée." },
      { year: 1964, event: "Troisième titre consécutif en championnat international GT." },
      { year: 2018, event: "Record de vente : 70 M$ pour le châssis 4153 GT." },
    ],
    image: img("photo-1568605117036-5fe5e7bab0b7"),
  },
  {
    slug: "ford-gt40",
    name: "GT40 Mk II",
    brand: "Ford",
    year: 1966,
    country: "États-Unis",
    category: "classiques",
    tagline: "Construite pour une seule raison : battre Ferrari au Mans.",
    history:
      "Après le rachat avorté de Ferrari en 1963, Henry Ford II ordonne de « détruire Ferrari » sur son terrain. Trois ans plus tard, la GT40 signe le triplé historique aux 24 Heures du Mans 1966, puis gagne encore en 1967, 1968 et 1969. Quarante pouces de haut, un V8 de 7 litres, et une revanche d'orgueil devenue légende.",
    engine: "V8 427 ci (7.0 L)",
    powerCh: 485,
    topSpeedKmh: 320,
    accelS: 4.5,
    weightKg: 1200,
    production: "≈ 100 châssis toutes versions",
    transmission: "Manuelle 4 rapports Kar-Kraft",
    drive: "Propulsion",
    anecdotes: [
      "Le nom GT40 vient simplement de sa hauteur : 40 pouces, soit 1,02 m.",
      "L'arrivée groupée de 1966, orchestrée pour la photo, a coûté la victoire à Ken Miles au profit de McLaren/Amon — l'une des décisions les plus controversées du sport auto.",
    ],
    timeline: [
      { year: 1963, event: "Échec du rachat de Ferrari ; lancement du programme GT." },
      { year: 1966, event: "Triplé aux 24 Heures du Mans devant Ferrari." },
      { year: 1969, event: "Quatrième victoire consécutive au Mans." },
    ],
    image: img("photo-1526726538690-5cbf956ae2fd"),
  },
  {
    slug: "porsche-911-carrera-rs",
    name: "911 Carrera RS 2.7",
    brand: "Porsche",
    year: 1973,
    country: "Allemagne",
    category: "classiques",
    tagline: "La 911 des 911. Celle que toutes les autres regardent.",
    history:
      "Version d'homologation allégée à l'extrême — tôles plus fines, vitres amincies, insonorisant supprimé — la RS 2.7 inaugure le premier aileron arrière de série de l'histoire : le fameux « queue de canard ». Porsche craignait de ne pas vendre les 500 exemplaires requis ; ils partiront en une semaine.",
    engine: "Flat-6 2.7 L, injection mécanique Bosch",
    powerCh: 210,
    topSpeedKmh: 245,
    accelS: 5.8,
    weightKg: 960,
    production: "1 580 exemplaires (1972–1973)",
    transmission: "Manuelle 5 rapports",
    drive: "Propulsion",
    anecdotes: [
      "Le liseré « Carrera » sur les flancs était une option gratuite — beaucoup de clients l'ont refusée, les exemplaires ainsi dépouillés valent aujourd'hui plus cher.",
      "960 kg en version Sport : moins qu'une citadine moderne, avec 210 ch derrière l'essieu arrière.",
    ],
    timeline: [
      { year: 1972, event: "Présentation au Salon de Paris ; les 500 exemplaires d'homologation vendus en 7 jours." },
      { year: 1973, event: "La version RSR gagne d'entrée les 24 Heures de Daytona." },
      { year: 2023, event: "Cinquantenaire célébré par Porsche comme la matrice de toutes les GT3." },
    ],
    image: img("photo-1568605117036-5fe5e7bab0b7"),
  },

  /* -------------------------------- SUPERCARS ---------------------------- */
  {
    slug: "lamborghini-miura-sv",
    name: "Miura P400 SV",
    brand: "Lamborghini",
    year: 1971,
    country: "Italie",
    category: "supercars",
    tagline: "La voiture qui a inventé la catégorie « supercar ».",
    history:
      "Trois jeunes ingénieurs de moins de 30 ans dessinent en secret, le soir, un châssis à moteur V12 central transversal — une architecture de course jamais vue sur la route. Ferruccio Lamborghini le montre nu à Turin en 1965 ; Marcello Gandini l'habille en quatre mois. La SV de 1971 en est l'aboutissement : plus large, plus puissante, définitive.",
    engine: "V12 3.9 L transversal central",
    powerCh: 385,
    topSpeedKmh: 290,
    accelS: 6.7,
    weightKg: 1298,
    production: "150 exemplaires SV (1971–1973)",
    transmission: "Manuelle 5 rapports",
    drive: "Propulsion",
    anecdotes: [
      "Les « cils » chromés autour des phares, signature de la Miura, disparaissent sur la SV — on reconnaît une SV à leur absence.",
      "La scène d'ouverture de The Italian Job (1969) sur le col du Grand-Saint-Bernard a fait plus pour le mythe Miura que n'importe quelle publicité.",
    ],
    timeline: [
      { year: 1965, event: "Le châssis nu P400 fait sensation au Salon de Turin." },
      { year: 1966, event: "Carrosserie Gandini dévoilée à Genève : émeute médiatique." },
      { year: 1971, event: "Présentation de la SV, version ultime, à Genève." },
    ],
    image: img("photo-1518987048-93e29699e79a"),
  },
  {
    slug: "lamborghini-countach",
    name: "Countach LP400",
    brand: "Lamborghini",
    year: 1974,
    country: "Italie",
    category: "supercars",
    tagline: "Un coin d'acier tombé du futur, portes en ciseaux comprises.",
    history:
      "Gandini récidive avec une silhouette en coin si radicale qu'elle semble dessinée à la règle et au scalpel. Le V12 passe en position longitudinale inversée — boîte devant le moteur, d'où le code LP. Les portes en ciseaux, nées d'une contrainte de visibilité arrière, deviennent la signature Lamborghini pour cinquante ans.",
    engine: "V12 4.0 L longitudinal central",
    powerCh: 375,
    topSpeedKmh: 288,
    accelS: 5.4,
    weightKg: 1065,
    production: "157 exemplaires LP400 (1974–1977)",
    transmission: "Manuelle 5 rapports",
    drive: "Propulsion",
    anecdotes: [
      "« Countach » est un juron piémontais d'admiration — la réaction d'un ouvrier découvrant la maquette une nuit à l'atelier Bertone.",
      "La visibilité arrière étant nulle, la procédure officielle de marche arrière consistait à s'asseoir sur le seuil, porte levée, tête dehors.",
    ],
    timeline: [
      { year: 1971, event: "Prototype LP500 jaune dévoilé à Genève." },
      { year: 1974, event: "Production de la LP400 « Periscopio »." },
      { year: 1988, event: "Fin de carrière après 14 ans et près de 2 000 exemplaires toutes versions." },
    ],
    image: img("photo-1493238792000-8113da705763"),
  },
  {
    slug: "porsche-959",
    name: "959",
    brand: "Porsche",
    year: 1986,
    country: "Allemagne",
    category: "supercars",
    tagline: "Le laboratoire roulant qui a inventé la supercar moderne.",
    history:
      "Conçue pour le Groupe B, la 959 embarque en 1986 des technologies qui mettront vingt ans à se banaliser : transmission intégrale pilotée PSK, turbos séquentiels, suspension à hauteur variable, coque composite. Vendue à perte — chaque exemplaire coûtait à Porsche environ le double de son prix de vente.",
    engine: "Flat-6 2.85 L biturbo séquentiel",
    powerCh: 450,
    topSpeedKmh: 317,
    accelS: 3.7,
    weightKg: 1450,
    production: "292 exemplaires (1986–1988)",
    transmission: "Manuelle 6 rapports",
    drive: "Intégrale PSK",
    anecdotes: [
      "Une 959 quasi de série remporte le Paris-Dakar 1986 — la même base technique gagnait dans les dunes et frôlait 320 km/h sur autoroute.",
      "Bill Gates a bataillé des années avec les douanes américaines pour importer la sienne ; l'affaire aboutira à la loi « Show or Display » de 1999.",
    ],
    timeline: [
      { year: 1983, event: "Concept « Gruppe B » présenté à Francfort." },
      { year: 1986, event: "Victoire au Paris-Dakar ; début des livraisons clients." },
      { year: 1988, event: "Fin de production après 292 exemplaires." },
    ],
    image: img("photo-1542282088-fe8426682b8f"),
  },
  {
    slug: "ferrari-f40",
    name: "F40",
    brand: "Ferrari",
    year: 1987,
    country: "Italie",
    category: "supercars",
    tagline: "La dernière Ferrari approuvée par Enzo. Brutale, honnête, parfaite.",
    history:
      "Pour les 40 ans de la marque, Maranello livre l'antithèse de la 959 : pas d'électronique, pas de moquette, des vitres en plexiglas et une carrosserie en kevlar si fine qu'on voit la trame sous la peinture. Première voiture de série à franchir officiellement les 320 km/h.",
    engine: "V8 2.9 L biturbo",
    powerCh: 478,
    topSpeedKmh: 324,
    accelS: 4.1,
    weightKg: 1100,
    production: "1 311 exemplaires (1987–1992)",
    transmission: "Manuelle 5 rapports, grille apparente",
    drive: "Propulsion",
    anecdotes: [
      "Enzo Ferrari, 89 ans, aurait demandé « une voiture comme avant » — il meurt un an après la présentation, faisant de la F40 son testament.",
      "Prévue à 400 exemplaires, elle sera produite à 1 311 unités tant la spéculation était folle : certaines se revendaient trois fois leur prix avant livraison.",
    ],
    timeline: [
      { year: 1987, event: "Présentation à Maranello devant Enzo Ferrari." },
      { year: 1988, event: "Mort d'Enzo ; la F40 devient sa dernière signature." },
      { year: 1992, event: "Fin de production après 1 311 exemplaires." },
    ],
    image: img("photo-1626668893632-6f3a4466d22f"),
  },
  {
    slug: "mclaren-f1",
    name: "F1",
    brand: "McLaren",
    year: 1993,
    country: "Royaume-Uni",
    category: "supercars",
    tagline: "Poste de pilotage central, moteur doré à l'or fin, 386 km/h.",
    history:
      "Gordon Murray dessine la voiture de route absolue : première monocoque carbone de série, position de conduite centrale, V12 BMW atmosphérique et compartiment moteur tapissé d'or — le meilleur réflecteur thermique. Son record de vitesse pour une voiture atmosphérique, 386 km/h en 1998, tient toujours.",
    engine: "V12 BMW S70/2 6.1 L atmosphérique",
    powerCh: 627,
    topSpeedKmh: 386,
    accelS: 3.2,
    weightKg: 1138,
    production: "106 exemplaires dont 64 routières",
    transmission: "Manuelle 6 rapports",
    drive: "Propulsion",
    anecdotes: [
      "Environ 16 grammes d'or pur tapissent chaque compartiment moteur.",
      "À peine adaptée pour la course sous la pression des clients, elle gagne Le Mans 1995 d'entrée, sous la pluie, contre des prototypes.",
    ],
    timeline: [
      { year: 1992, event: "Présentation à Monaco, veille du Grand Prix." },
      { year: 1995, event: "Victoire au général des 24 Heures du Mans." },
      { year: 1998, event: "Record : 386,4 km/h sur la piste d'Ehra-Lessien." },
    ],
    image: img("photo-1518987048-93e29699e79a"),
  },

  /* -------------------------------- HYPERCARS ---------------------------- */
  {
    slug: "bugatti-veyron",
    name: "Veyron 16.4",
    brand: "Bugatti",
    year: 2005,
    country: "France",
    category: "hypercars",
    tagline: "1 001 chevaux. Le projet d'ingénierie le plus déraisonnable du siècle.",
    history:
      "Ferdinand Piëch fixe trois chiffres non négociables : 1 000 ch, 400 km/h, et le confort d'une limousine. Il faudra un W16 quadri-turbo, dix radiateurs et des pneus développés spécialement pour encaisser la vitesse. Chaque Veyron vendue aurait coûté à Volkswagen plusieurs millions d'euros de plus que son prix.",
    engine: "W16 8.0 L quadri-turbo",
    powerCh: 1001,
    topSpeedKmh: 407,
    accelS: 2.5,
    weightKg: 1888,
    production: "450 exemplaires toutes versions",
    transmission: "DSG 7 rapports double embrayage",
    drive: "Intégrale",
    anecdotes: [
      "À 407 km/h, les pneus ne survivent qu'une quinzaine de minutes — mais le réservoir se vide en douze.",
      "La clé « Top Speed » abaisse la voiture et rétracte l'aileron : un rituel mécanique pour franchir les 375 km/h.",
    ],
    timeline: [
      { year: 1999, event: "Concept EB 18/4 présenté à Tokyo." },
      { year: 2005, event: "Production à Molsheim ; 408,47 km/h validés." },
      { year: 2010, event: "La Super Sport porte le record à 431 km/h." },
    ],
    image: img("photo-1493238792000-8113da705763"),
  },
  {
    slug: "ferrari-laferrari",
    name: "LaFerrari",
    brand: "Ferrari",
    year: 2013,
    country: "Italie",
    category: "hypercars",
    tagline: "Le V12 le plus puissant de Maranello, électrifié par la F1.",
    history:
      "Première Ferrari hybride de série, LaFerrari greffe un système HY-KERS issu de la Formule 1 sur un V12 atmosphérique poussé à 800 ch. L'électrique ne sert pas à économiser : il comble les creux de couple pour rendre l'accélération parfaitement linéaire jusqu'à 9 250 tr/min.",
    engine: "V12 6.3 L + moteur électrique HY-KERS (963 ch cumulés)",
    powerCh: 963,
    topSpeedKmh: 350,
    accelS: 2.9,
    weightKg: 1255,
    production: "499 coupés + 210 Aperta",
    transmission: "DCT 7 rapports",
    drive: "Propulsion",
    anecdotes: [
      "Le 500e exemplaire, hors série, a été vendu 7 M$ aux enchères au profit des victimes des séismes de 2016 en Italie.",
      "Ferrari sélectionnait les acheteurs sur dossier : posséder déjà cinq Ferrari récentes était un prérequis officieux.",
    ],
    timeline: [
      { year: 2013, event: "Présentation à Genève aux côtés de la P1 et de la 918." },
      { year: 2016, event: "Version Aperta découvrable pour les 70 ans de la marque." },
      { year: 2016, event: "Vente caritative record du 500e exemplaire." },
    ],
    image: img("photo-1542282088-fe8426682b8f"),
  },
  {
    slug: "mclaren-p1",
    name: "P1",
    brand: "McLaren",
    year: 2013,
    country: "Royaume-Uni",
    category: "hypercars",
    tagline: "L'appui aérodynamique d'une voiture de course, la plaque en plus.",
    history:
      "Héritière spirituelle de la F1, la P1 choisit une autre voie : biturbo, hybride, et surtout 600 kg d'appui aérodynamique généré par un aileron actif de la taille d'une table basse. Son mode Race abaisse la caisse de 50 mm et durcit les suspensions de 300 %.",
    engine: "V8 3.8 L biturbo + moteur électrique (916 ch cumulés)",
    powerCh: 916,
    topSpeedKmh: 350,
    accelS: 2.8,
    weightKg: 1395,
    production: "375 exemplaires (2013–2015)",
    transmission: "DCT 7 rapports",
    drive: "Propulsion",
    anecdotes: [
      "Les 375 exemplaires étaient tous vendus avant la fin du premier mois de commercialisation.",
      "McLaren annonce un tour du Nürburgring « sous les 7 minutes » sans jamais publier le chiffre exact — le mystère fait partie du produit.",
    ],
    timeline: [
      { year: 2012, event: "Concept dévoilé au Mondial de Paris." },
      { year: 2013, event: "Début de production à Woking." },
      { year: 2015, event: "Dernier exemplaire produit, peint en orange Volcano." },
    ],
    image: img("photo-1626668893632-6f3a4466d22f"),
  },
  {
    slug: "porsche-918-spyder",
    name: "918 Spyder",
    brand: "Porsche",
    year: 2013,
    country: "Allemagne",
    category: "hypercars",
    tagline: "6 min 57 s au Nürburgring. L'hybride qui a fait taire les puristes.",
    history:
      "Autour d'un V8 dérivé du prototype d'endurance RS Spyder, Porsche ajoute deux machines électriques — dont une sur le train avant, créant une transmission intégrale sans arbre. Première voiture de série sous les 7 minutes au Nürburgring, échappements « top pipes » sortant au-dessus du moteur compris.",
    engine: "V8 4.6 L + 2 moteurs électriques (887 ch cumulés)",
    powerCh: 887,
    topSpeedKmh: 345,
    accelS: 2.6,
    weightKg: 1634,
    production: "918 exemplaires (2013–2015)",
    transmission: "PDK 7 rapports",
    drive: "Intégrale électrifiée",
    anecdotes: [
      "Le chiffre de production — 918 exemplaires exactement — était écrit dans le nom dès le départ.",
      "En mode E-Power, elle traverse une ville en silence total : 30 km d'autonomie électrique, du jamais-vu sur une hypercar en 2013.",
    ],
    timeline: [
      { year: 2010, event: "Concept plébiscité à Genève ; production votée par les clients." },
      { year: 2013, event: "Record du Nürburgring : 6 min 57 s." },
      { year: 2015, event: "918e et dernier exemplaire livré." },
    ],
    image: img("photo-1518987048-93e29699e79a"),
  },
  {
    slug: "koenigsegg-jesko",
    name: "Jesko",
    brand: "Koenigsegg",
    year: 2019,
    country: "Suède",
    category: "hypercars",
    tagline: "1 600 ch à l'E85 et une boîte à 9 rapports qui n'existe nulle part ailleurs.",
    history:
      "Nommée d'après le père du fondateur, la Jesko pousse l'obsession maison à son sommet : vilebrequin plat de 12,5 kg, boîte LST à 9 rapports sans embrayages conventionnels capable de sauter directement au rapport optimal, et 1 400 kg d'appui en version Attack.",
    engine: "V8 5.0 L biturbo (1 280 ch essence, 1 600 ch E85)",
    powerCh: 1600,
    topSpeedKmh: 480,
    accelS: 2.5,
    weightKg: 1420,
    production: "125 exemplaires prévus",
    transmission: "LST 9 rapports multi-embrayages",
    drive: "Propulsion",
    anecdotes: [
      "La boîte LST pèse 90 kg — moins qu'une double-embrayage classique — malgré ses neuf rapports.",
      "La version Absolut, débarrassée de son aileron, vise plus de 500 km/h en simulation : Koenigsegg promet de ne jamais construire plus rapide.",
    ],
    timeline: [
      { year: 2019, event: "Présentation à Genève ; production vendue en quelques jours." },
      { year: 2022, event: "Premières livraisons clients." },
      { year: 2025, event: "La Jesko Absolut établit plusieurs records d'accélération mondiaux." },
    ],
    image: img("photo-1626668893632-6f3a4466d22f"),
  },
  {
    slug: "bugatti-chiron-ss-300",
    name: "Chiron Super Sport 300+",
    brand: "Bugatti",
    year: 2019,
    country: "France",
    category: "hypercars",
    tagline: "490,48 km/h. La première voiture de série au-delà des 300 mph.",
    history:
      "Le 2 août 2019 à Ehra-Lessien, Andy Wallace franchit 304,77 mph au volant d'un prototype allongé de 25 cm — première voiture de « série » au-delà des 300 miles par heure. Trente exemplaires clients commémorent le record, livrés bridés à 440 km/h par respect pour les pneumatiques.",
    engine: "W16 8.0 L quadri-turbo",
    powerCh: 1600,
    topSpeedKmh: 490,
    accelS: 2.4,
    weightKg: 1975,
    production: "30 exemplaires",
    transmission: "DSG 7 rapports",
    drive: "Intégrale",
    anecdotes: [
      "À 490 km/h, la voiture parcourt 136 mètres par seconde — un terrain de football et demi.",
      "Andy Wallace, le pilote du record, était déjà l'homme des 386 km/h de la McLaren F1 en 1998 : deux records de vitesse à 21 ans d'écart.",
    ],
    timeline: [
      { year: 2019, event: "Record de 490,48 km/h à Ehra-Lessien." },
      { year: 2021, event: "Livraison des 30 exemplaires clients." },
      { year: 2022, event: "Bugatti annonce se retirer de la course à la vitesse pure." },
    ],
    image: img("photo-1493238792000-8113da705763"),
  },

  /* ------------------------------ CONCEPT CARS ---------------------------- */
  {
    slug: "alfa-romeo-carabo",
    name: "Carabo",
    brand: "Alfa Romeo / Bertone",
    year: 1968,
    country: "Italie",
    category: "concept",
    tagline: "Le coup de crayon qui a inventé les portes en ciseaux.",
    history:
      "Sur la base de course de l'Alfa 33 Stradale, Marcello Gandini dessine en 1968 un coin vert et orange d'un mètre de haut qui rompt avec toutes les courbes des années 60. Ses portes pivotantes vers l'avant — les premières « ciseaux » de l'histoire — et sa silhouette en lame annoncent directement la Countach.",
    engine: "V8 2.0 L (base Alfa 33 Stradale)",
    powerCh: 230,
    topSpeedKmh: 250,
    accelS: 5.5,
    weightKg: 1000,
    production: "Exemplaire unique",
    transmission: "Manuelle 6 rapports",
    drive: "Propulsion",
    anecdotes: [
      "Son nom vient du carabe doré, un scarabée aux reflets vert métallique et orange — exactement sa livrée.",
      "Dessinée en dix semaines seulement pour le Salon de Paris 1968, elle y a éclipsé toutes les voitures de série.",
    ],
    timeline: [
      { year: 1968, event: "Révélation au Salon de Paris." },
      { year: 1971, event: "Ses portes en ciseaux réapparaissent sur le prototype Countach." },
      { year: 2018, event: "Célébrée pour ses 50 ans au concours de la Villa d'Este." },
    ],
    image: img("photo-1542282088-fe8426682b8f"),
  },
  {
    slug: "lancia-stratos-zero",
    name: "Stratos Zero",
    brand: "Lancia / Bertone",
    year: 1970,
    country: "Italie",
    category: "concept",
    tagline: "84 centimètres de haut. On entre par le pare-brise.",
    history:
      "Point culminant de la « fièvre du coin » italienne, la Stratos Zero culmine à 84 cm du sol. Sans portes : le pare-brise entier se soulève et l'on enjambe le volant rabattable pour s'installer. L'objet convaincra Lancia de financer la Stratos de rallye, triple championne du monde.",
    engine: "V4 1.6 L Lancia Fulvia",
    powerCh: 115,
    topSpeedKmh: 190,
    accelS: 9.0,
    weightKg: 830,
    production: "Exemplaire unique",
    transmission: "Manuelle 5 rapports",
    drive: "Propulsion",
    anecdotes: [
      "Pour la présenter aux dirigeants de Lancia, Nuccio Bertone l'a conduite lui-même jusqu'à l'usine — en passant sous la barrière fermée du poste de garde.",
      "Elle apparaît dans le film Moonwalker de Michael Jackson en 1988, qui s'y transforme en voiture.",
    ],
    timeline: [
      { year: 1970, event: "Présentation au Salon de Turin." },
      { year: 1971, event: "Lancia lance le programme Stratos HF pour le rallye." },
      { year: 2011, event: "Vendue aux enchères 761 000 € lors de la dispersion du musée Bertone." },
    ],
    image: img("photo-1493238792000-8113da705763"),
  },
  {
    slug: "mercedes-c111",
    name: "C111-II",
    brand: "Mercedes-Benz",
    year: 1970,
    country: "Allemagne",
    category: "concept",
    tagline: "Le laboratoire orange que Mercedes a refusé de vendre, chèques en blanc compris.",
    history:
      "Banc d'essai roulant pour le moteur rotatif, la fibre de verre et l'aérodynamique, la C111 seconde génération atteint 300 km/h avec son quatre-rotors de 350 ch. Des clients envoyèrent des chèques en blanc à Stuttgart pour en obtenir une ; tous furent retournés. Elle battra ensuite des records du monde en version diesel.",
    engine: "Wankel 4 rotors (équiv. 4.8 L)",
    powerCh: 350,
    topSpeedKmh: 300,
    accelS: 4.8,
    weightKg: 1240,
    production: "16 châssis d'essais",
    transmission: "Manuelle 5 rapports",
    drive: "Propulsion",
    anecdotes: [
      "Sa teinte orange « Weissherbst » a été créée spécialement pour rendre la voiture visible sur les films d'essais à haute vitesse.",
      "En 1978, une C111-III diesel établit 9 records du monde à 316 km/h de moyenne — avec un moteur de berline.",
    ],
    timeline: [
      { year: 1969, event: "Première C111 à trois rotors présentée à Francfort." },
      { year: 1970, event: "C111-II : quatre rotors, 300 km/h, Genève en état de choc." },
      { year: 1978, event: "Records du monde diesel sur l'anneau de Nardò." },
    ],
    image: img("photo-1518987048-93e29699e79a"),
  },
  {
    slug: "peugeot-onyx",
    name: "Onyx",
    brand: "Peugeot",
    year: 2012,
    country: "France",
    category: "concept",
    tagline: "Cuivre martelé à la main, carbone brut, 680 chevaux hybrides.",
    history:
      "Dessinée sous la direction de Gilles Vidal, l'Onyx assume ses matériaux à l'état brut : ailes en feuilles de cuivre non vernies qui se patinent avec le temps, carbone apparent, habitacle en feutre compressé et « papier journal » moulé. Sous le capot, le V8 HDi du prototype d'endurance 908, hybridé.",
    engine: "V8 HDi 3.7 L + hybridation (680 ch cumulés)",
    powerCh: 680,
    topSpeedKmh: 320,
    accelS: 3.0,
    weightKg: 1100,
    production: "Exemplaire unique",
    transmission: "Séquentielle 6 rapports",
    drive: "Propulsion",
    anecdotes: [
      "Les panneaux de cuivre ont été martelés à la main et laissés sans vernis : chaque trace de doigt fait partie du design.",
      "Elle a réellement roulé : Peugeot l'a engagée en démonstration au festival de Goodwood en 2013.",
    ],
    timeline: [
      { year: 2012, event: "Révélation au Mondial de l'Automobile de Paris." },
      { year: 2013, event: "Démonstrations dynamiques à Goodwood." },
      { year: 2020, event: "Exposée comme référence du design Peugeot moderne." },
    ],
    image: img("photo-1626668893632-6f3a4466d22f"),
  },
];

export const getVehicle = (slug: string): Vehicle | undefined =>
  VEHICLES.find((v) => v.slug === slug);

export const byCategory = (id: CategoryId): Vehicle[] =>
  VEHICLES.filter((v) => v.category === id);
