export const projects = [
  {
    id: "private-residence-01",
    title: "Private Residence 01",
    eyebrow: "Residential",
    type: "Private residence",
    area: "Test area",
    location: "Test location",
    year: "2026",
    description:
      "Test copy: a calm residential interior shaped around proportion, natural materials and everyday use.",
    hero: {
      label: "Private Residence 01 — main project image",
      tone: "sand",
    },
    slides: [
      {
        label: "Private Residence 01 — living area",
        tone: "clay",
        caption: "Living area · Test image",
      },
      {
        label: "Private Residence 01 — material detail",
        tone: "sage",
        caption: "Material detail · Test image",
      },
      {
        label: "Private Residence 01 — private space",
        tone: "stone",
        caption: "Private space · Test image",
      },
    ],
  },
  {
    id: "hospitality-concept-01",
    title: "Hospitality Concept 01",
    eyebrow: "Hospitality",
    type: "Hospitality concept",
    area: "Test area",
    location: "Test location",
    year: "2026",
    description:
      "Test copy: a hospitality concept balancing atmosphere, circulation and durable material choices.",
    hero: {
      label: "Hospitality Concept 01 — main project image",
      tone: "sage",
    },
    slides: [
      {
        label: "Hospitality Concept 01 — arrival space",
        tone: "ink",
        caption: "Arrival space · Test image",
      },
      {
        label: "Hospitality Concept 01 — guest area",
        tone: "sand",
        caption: "Guest area · Test image",
      },
      {
        label: "Hospitality Concept 01 — material detail",
        tone: "clay",
        caption: "Material detail · Test image",
      },
    ],
  },
  {
    id: "apartment-02",
    title: "Apartment 02",
    eyebrow: "Residential",
    type: "Apartment",
    area: "Test area",
    location: "Test location",
    year: "2026",
    description:
      "Test copy: a compact apartment study with warm finishes and a clear hierarchy between shared and private spaces.",
    hero: {
      label: "Apartment 02 — main project image",
      tone: "clay",
    },
    slides: [
      {
        label: "Apartment 02 — shared space",
        tone: "stone",
        caption: "Shared space · Test image",
      },
      {
        label: "Apartment 02 — furniture detail",
        tone: "sand",
        caption: "Furniture detail · Test image",
      },
      {
        label: "Apartment 02 — bedroom",
        tone: "sage",
        caption: "Private space · Test image",
      },
    ],
  },
  {
    id: "restaurant-concept-02",
    title: "Restaurant Concept 02",
    eyebrow: "Commercial",
    type: "Restaurant concept",
    area: "Test area",
    location: "Test location",
    year: "2026",
    description:
      "Test copy: a restaurant interior focused on rhythm, lighting and a memorable material language.",
    hero: {
      label: "Restaurant Concept 02 — main project image",
      tone: "stone",
    },
    slides: [
      {
        label: "Restaurant Concept 02 — dining room",
        tone: "ink",
        caption: "Dining room · Test image",
      },
      {
        label: "Restaurant Concept 02 — lighting study",
        tone: "clay",
        caption: "Lighting study · Test image",
      },
      {
        label: "Restaurant Concept 02 — material detail",
        tone: "sand",
        caption: "Material detail · Test image",
      },
    ],
  },
] as const;

export const homeLatestProjects = projects.map((project) => ({
  id: project.id,
  title: project.title,
  href: `/projects#${project.id}`,
  media: {
    kind: "placeholder" as const,
    label: project.title,
    tone: project.hero.tone,
  },
  type: project.eyebrow,
  area: project.area,
  location: project.location,
  year: project.year,
  description: project.description,
}));
