export type ServicesPageLayout =
  | "wide"
  | "split"
  | "offset"
  | "portrait"
  | "technical";

export type ServicesPageTone =
  | "sand"
  | "sage"
  | "clay"
  | "stone"
  | "ink";

export type ServicesPageItem = {
  id: string;
  number: string;
  title: string;
  tagline: readonly string[];
  introduction: readonly string[];
  processTitle: string;
  process: readonly string[];
  cta: string;
  layout: ServicesPageLayout;
  media: {
    label: string;
    tone: ServicesPageTone;
  };
};

export const servicesPageIntro = {
  eyebrow: "What we do",
  title: "Services",
  description:
    "Interior design support shaped around the space, the people using it and the stage your project has reached.",
} as const;

export const servicesPageItems = [
  {
    id: "residential-design",
    number: "01",
    title: "Residential Design",
    tagline: ["Your Home.", "Your Way."],
    introduction: [
      "Your home should reflect the way you live: how you spend your time, what you need from each room and the atmosphere you want to come home to.",
    ],
    processTitle: "Understanding How You Live",
    process: [
      "We begin with a conversation about your home, your priorities and what you would like to change. We discuss your budget and timing, answer your questions and agree how we can help.",
      "Once the scope is agreed, we review the available plans and develop a brief for each room together. This covers everyday routines, storage, furniture, equipment and the pieces you want to keep.",
      "The brief guides the layout and the design decisions that follow. Through our 4 stages, we bring together materials, lighting, furniture and details into a home that feels personal and works for everyday life. You can commission a complete design project or a specific stage, depending on what your space needs.",
    ],
    cta: "Let’s discuss your project",
    layout: "wide",
    media: {
      label: "Residential interior",
      tone: "sand",
    },
  },
  {
    id: "hospitality-commercial-design",
    number: "02",
    title: "Hospitality & Commercial Design",
    tagline: ["Your Brand.", "Your Space."],
    introduction: [
      "An interior shapes how people experience your business: how they feel when they arrive, how easily they find their way and what they remember when they leave.",
      "We design hotels, restaurants, cafés and commercial spaces that express your brand, welcome your guests and customers, and support the daily work of your team.",
    ],
    processTitle: "Understanding What Your Business Needs",
    process: [
      "We begin with your concept, your audience and what the space needs to achieve. Together, we discuss the experience you want to offer, your operational priorities, budget and timing.",
      "We review the available plans, the characteristics of the site and any existing brand guidelines or operator standards. Understanding how visitors and staff use each area helps us establish priorities for zoning, circulation, furniture and materials.",
      "These findings form the project brief, providing a clear foundation for the layout and design direction.",
    ],
    cta: "Let’s discuss your project",
    layout: "split",
    media: {
      label: "Hospitality and commercial interior",
      tone: "sage",
    },
  },
  {
    id: "styling",
    number: "03",
    title: "Styling",
    tagline: ["Bring Your Space Together."],
    introduction: [
      "Sometimes a room has everything it needs, yet still feels unfinished. The furniture, lighting and details may work individually without feeling connected.",
      "Through furniture, textiles, lighting, art and accessories, we help refresh an existing interior or complete a newly designed space. Proportion, colour, texture and placement guide each selection.",
    ],
    processTitle: "Working With What You Have",
    process: [
      "We begin by discussing what you would like to change, what already works and which pieces you want to keep. Photographs, room dimensions and references help us understand the space, your preferences and your budget.",
      "From there, we develop a styling direction and a coordinated selection of pieces, with guidance on their placement. This may involve rearranging existing furniture, introducing new textures or choosing the finishing details that give the room its character.",
    ],
    cta: "Let’s discuss your project",
    layout: "offset",
    media: {
      label: "Interior styling details",
      tone: "clay",
    },
  },
  {
    id: "procurement",
    number: "04",
    title: "Procurement",
    tagline: ["From Selection to Sourcing."],
    introduction: [
      "Choosing a piece is only the beginning. Its dimensions, finish, availability and delivery requirements all need to fit your project.",
      "We help source and purchase furniture, lighting, finishes and accessories, giving you a clear overview of the proposed items, costs and lead times before orders are placed.",
    ],
    processTitle: "Coordinating the Details",
    process: [
      "We start with your approved selections or a defined list of requirements, then establish the budget, priorities and purchasing arrangements.",
      "Working with suppliers, we confirm specifications, pricing and availability. If an item is unavailable or no longer suitable, we present alternatives for your approval and explain their effect on the design, cost and schedule.",
      "Where included in our agreement, we also track orders and coordinate delivery arrangements. Responsibilities and purchasing terms are clarified at the outset, so you know what is being handled and which decisions need your approval.",
    ],
    cta: "Let’s discuss your project",
    layout: "portrait",
    media: {
      label: "Furniture, finishes and sourcing",
      tone: "stone",
    },
  },
  {
    id: "design-supervision",
    number: "05",
    title: "Design Supervision",
    tagline: ["Keeping the Design in Focus."],
    introduction: [
      "As a project moves into implementation, new questions arise. A finish needs approval, a detail requires clarification or a proposed substitution changes the balance of the design.",
      "We help your project team resolve these questions while keeping the approved design in focus, paying attention to the proportions, materials and details that give the space its character.",
    ],
    processTitle: "Supporting Your Project Team",
    process: [
      "We begin by reviewing the approved project, the implementation schedule and the responsibilities of those involved. Together, we agree how design queries, reviews and any site visits will be organised.",
      "During implementation, we clarify design details, review proposed samples and substitutions, and discuss design questions with your contractors and suppliers. Where changes are needed, we explain their implications to help you make informed decisions.",
      "Design supervision focuses on the design intent. Construction management, site safety and technical inspections remain the responsibility of the appointed contractors and qualified specialists.",
    ],
    cta: "Let’s discuss your project",
    layout: "technical",
    media: {
      label: "Design review and site coordination",
      tone: "ink",
    },
  },
] as const satisfies readonly ServicesPageItem[];
