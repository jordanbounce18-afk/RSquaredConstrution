export const COMPANY = {
      name: "R² CONSTRUCTION",
      shortName: "R²",
      tagline: "Remodeling & Renovation",
      phone: "719-499-6248",
      phoneHref: "tel:+17194996248",
      email: "BryanR2construction@gmail.com",
      emailHref: "mailto:BryanR2construction@gmail.com",
      area: "Colorado Springs & Surrounding Areas",
      established: "Crafted to last",
};

export const SERVICES = [
    {
            slug: "kitchen",
            title: "Kitchen Remodeling",
            description:
                      "Bespoke kitchens reimagined around how you live — custom cabinetry, stone surfaces, and lighting designed for everyday rituals.",
            image: "/media/portfolio/r2-kitchen.jpg",
    },
    {
            slug: "bathroom",
            title: "Bathroom Renovation",
            description:
                      "Spa-quality bathrooms with refined tile, glass, and fixtures. Quiet luxury, engineered for daily comfort.",
            image: "/media/portfolio/r2-bathroom-1.jpg",
    },
    {
            slug: "full-home",
            title: "Full Home Renovation",
            description:
                      "Whole-house transformations — from layout reworks to finish carpentry. One team, one timeline, one cohesive vision.",
            image: "/media/portfolio/r2-fullhome-stairs-a.jpg",
    },
    {
            slug: "additions",
            title: "Additions & Extensions",
            description:
                      "Add square footage that feels original to the home. Architectural framing, structural integrity, seamless rooflines.",
            image: "/media/portfolio/r2-additions-treehouse-finished.jpg",
    },
    {
            slug: "exterior",
            title: "Exterior, Decks & Patios",
            description:
                      "Outdoor living that extends the architecture — composite decks, stone patios, pergolas, and stairs built to outlast seasons.",
            image: "/media/portfolio/r2-exterior-deck.jpg",
    },
    ];

export const PROJECT_TYPES = SERVICES.map((s) => s.title);

export const PORTFOLIO_ITEMS = [
    {
            title: "Treehouse Build",
            location: "Colorado Springs, CO",
            category: "Additions",
            image: "/media/portfolio/r2-additions-treehouse-finished.jpg",
            span: "md:col-span-7 md:row-span-2",
    },
    {
            title: "Full Home Renovation",
            location: "Colorado Springs, CO",
            category: "Full Home",
            image: "/media/portfolio/r2-fullhome-stairs-b.jpg",
            span: "md:col-span-5",
    },
    {
            title: "Kitchen Remodel",
            location: "Colorado Springs, CO",
            category: "Kitchen",
            image: "/media/portfolio/r2-kitchen.jpg",
            span: "md:col-span-5",
    },
    {
            title: "Bathroom Renovation",
            location: "Colorado Springs, CO",
            category: "Bathroom",
            image: "/media/portfolio/r2-bathroom-2.jpg",
            span: "md:col-span-6",
    },
    {
            title: "Elevated Deck & Stairway",
            location: "Colorado Springs, CO",
            category: "Exterior",
            image: "/media/portfolio/r2-exterior-deck.jpg",
            span: "md:col-span-6",
    },
    {
            title: "Open-Concept Renovation",
            location: "Colorado Springs, CO",
            category: "Full Home",
            image: "/media/portfolio/r2-fullhome-tile.jpg",
            span: "md:col-span-12",
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

export const CONTACT_METHODS = ["Email", "Phone / Text", "Either"];
export const CONTACT_TIMES = ["Morning", "Afternoon", "Evening", "Anytime"];
export const PROPERTY_TYPES = [
      "Single-family home",
      "Townhome",
      "Condo",
      "Multi-family",
      "Other",
    ];
export const STYLE_PREFERENCES = [
      "Modern / Contemporary",
      "Transitional",
      "Traditional",
      "Farmhouse",
      "Rustic / Mountain",
      "Not sure — need guidance",
    ];
export const HAS_PLANS_OPTIONS = ["Yes — plans ready", "In progress", "No — need help"];
export const FINANCING_OPTIONS = [
      "Cash / savings",
      "Home equity loan / HELOC",
      "Cash-out refinance",
      "Construction loan",
      "Not decided yet",
    ];
export const BUDGET_FLEXIBILITY = ["Firm — do not exceed", "Somewhat flexible", "Open — best value wins"];
export const HEAR_ABOUT_OPTIONS = [
      "Google search",
      "Referral from friend / neighbor",
      "Social media",
      "Repeat customer",
      "Drove by a jobsite",
      "Other",
    ];
