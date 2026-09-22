export const homeServices = [
  {
    title: "Residential",
    text: "Test copy for apartments, houses and villas. A complete design project or a focused design stage.",
    href: "#design-process",
  },
  {
    title: "Hospitality & Commercial",
    text: "Test copy for hotels, restaurants, cafés and other commercial spaces.",
    href: "/services",
  },
  {
    title: "Styling",
    text: "Placeholder copy for styling, furniture, art, accessories and finishing details that bring the interior together.",
    href: "/services",
  },
  {
    title: "Procurement",
    text: "Test copy for purchasing support, supplier coordination and selected project items.",
    href: "/services",
  },
  {
    title: "Design Supervision",
    text: "Test copy for design supervision during implementation, agreed separately for each project.",
    href: "/services",
  },
] as const;

export const designProcessStages = [
  {
    number: "01",
    title: "DEFINE",
    subtitle: "Functional Layout & Planning",
    description:
      "We begin with your routines, priorities and the space itself. We review the available plans and technical information, assess circulation and zoning, and explore layout options with you. Where measurements are needed, we agree how they will be obtained.",
    result:
      "An agreed functional layout showing how the space is organised and how the main furniture and activities fit within it.",
    media: {
      kind: "placeholder",
      label: "Floor plan / spatial study",
      tone: "stone",
    },
  },
  {
    number: "02",
    title: "DESIGN",
    subtitle: "Interior Concept Development",
    description:
      "We develop the visual direction through moodboards, room collages, colour and material palettes, lighting ideas and furniture selections. The layout is refined so the elements work together in scale, placement and atmosphere.",
    result:
      "A coordinated interior concept, an updated 2D layout and product selections with sourcing links as part of the agreed design scope.",
    media: {
      kind: "placeholder",
      label: "Material palette / interior concept",
      tone: "sage",
    },
  },
  {
    number: "03",
    title: "DISPLAY",
    subtitle: "3D Visualisation & Review",
    description:
      "Photorealistic visualisations bring the design into three dimensions. Together, we review proportions, materials, textures and the intended lighting atmosphere, then refine the design within the agreed scope.",
    result:
      "3D views that help you understand the proposed interior before implementation. The number of views and revision rounds is set out in your proposal.",
    media: {
      kind: "placeholder",
      label: "3D visualisation",
      tone: "clay",
    },
  },
  {
    number: "04",
    title: "DELIVER",
    subtitle: "Technical Drawings & Documentation",
    description:
      "We translate the approved design into the technical package agreed for your project. This can include dimensioned plans, demolition and construction layouts, ceiling and lighting plans, interior elevations and details, electrical and plumbing coordination plans, and finish and material specifications.",
    result:
      "The drawings and documentation for your implementation team. The exact drawing list is confirmed in your proposal; specialist engineering or local approval requirements are identified separately.",
    media: {
      kind: "placeholder",
      label: "Technical drawings / documentation",
      tone: "ink",
    },
  },
] as const;
