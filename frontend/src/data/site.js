export const COMPANY = {
  name: "R² CONSTRUCTION",
  shortName: "R²",
  tagline: "Remodeling & Renovation",
  phone: "719-499-6248",
  phoneHref: "tel:+17194996248",
  email: "Emailhere@gmail.com",
  emailHref: "mailto:Emailhere@gmail.com",
  area: "Colorado Springs & Surrounding Areas",
  established: "Crafted to last",
};

export const SERVICES = [
  {
    slug: "kitchen",
    title: "Kitchen Remodeling",
    description:
      "Bespoke kitchens reimagined around how you live — custom cabinetry, stone surfaces, and lighting designed for everyday rituals.",
    image: "https://images.pexels.com/photos/7587864/pexels-photo-7587864.jpeg",
  },
  {
    slug: "bathroom",
    title: "Bathroom Renovation",
    description:
      "Spa-quality bathrooms with refined tile, glass, and fixtures. Quiet luxury, engineered for daily comfort.",
    image: "https://images.pexels.com/photos/35868666/pexels-photo-35868666.jpeg",
  },
  {
    slug: "full-home",
    title: "Full Home Renovation",
    description:
      "Whole-house transformations — from layout reworks to finish carpentry. One team, one timeline, one cohesive vision.",
    image: "https://images.pexels.com/photos/34688219/pexels-photo-34688219.jpeg",
  },
  {
    slug: "additions",
    title: "Additions & Extensions",
    description:
      "Add square footage that feels original to the home. Architectural framing, structural integrity, seamless rooflines.",
    image:
      "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc4MDg0NzUyNnww&ixlib=rb-4.1.0&q=85",
  },
  {
    slug: "exterior",
    title: "Exterior, Decks & Patios",
    description:
      "Outdoor living that extends the architecture — composite decks, stone patios, pergolas, and stairs built to outlast seasons.",
    image: "https://images.pexels.com/photos/11520303/pexels-photo-11520303.jpeg",
  },
  {
    slug: "commercial",
    title: "Commercial Remodeling",
    description:
      "Tenant improvements and storefronts delivered with minimal downtime — finishes, MEP coordination, and on-brand build-outs.",
    image: "https://images.pexels.com/photos/14408745/pexels-photo-14408745.jpeg",
  },
];

export const PROJECT_TYPES = SERVICES.map((s) => s.title);

export const PORTFOLIO_ITEMS = [
  {
    title: "Hillside Modern",
    location: "Black Forest, CO",
    category: "Full Home",
    image:
      "https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc4MDg0NzUyNnww&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-7 md:row-span-2",
  },
  {
    title: "Glasswood Cottage",
    location: "Manitou Springs, CO",
    category: "Additions",
    image: "https://images.pexels.com/photos/5563473/pexels-photo-5563473.jpeg",
    span: "md:col-span-5",
  },
  {
    title: "Evening Cliff House",
    location: "Monument, CO",
    category: "Exterior",
    image: "https://images.pexels.com/photos/31737860/pexels-photo-31737860.jpeg",
    span: "md:col-span-5",
  },
  {
    title: "Galley Renovation",
    location: "Old North End",
    category: "Kitchen",
    image: "https://images.pexels.com/photos/7587864/pexels-photo-7587864.jpeg",
    span: "md:col-span-6",
  },
  {
    title: "Soaking Suite",
    location: "Briargate",
    category: "Bathroom",
    image: "https://images.pexels.com/photos/35868666/pexels-photo-35868666.jpeg",
    span: "md:col-span-6",
  },
  {
    title: "Storefront Build-out",
    location: "Downtown",
    category: "Commercial",
    image: "https://images.pexels.com/photos/14408745/pexels-photo-14408745.jpeg",
    span: "md:col-span-12",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "R² took a 1970s kitchen down to studs and gave us a space that feels both modern and warm. The craftsmanship is in every joint.",
    author: "Megan T.",
    role: "Homeowner — Briargate",
  },
  {
    quote:
      "Communication was constant, the schedule was real, and the finish work was museum-grade. We hired them again for the basement.",
    author: "David & Rena P.",
    role: "Homeowner — Monument",
  },
  {
    quote:
      "Our storefront build-out was completed two days early. Their commercial team is sharp and unbelievably tidy.",
    author: "Andre L.",
    role: "Café Owner — Downtown",
  },
];

export const BUDGETS = [
  "Under $15K",
  "$15K — $50K",
  "$50K — $150K",
  "$150K — $500K",
  "$500K+",
];

export const TIMELINES = [
  "ASAP",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "Just exploring",
];
