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
      "Your home should reflect the way you live — how you move through it, what you need from each room and the atmosphere you want to return to every day.",
      "We design apartments, houses and villas with a balance of function, proportion and character. From the overall layout to materials, lighting and furniture, each decision is considered as part of one coherent interior.",
    ],
    processTitle: "Understanding How You Live",
    process: [
      "We begin with a conversation about your routines, priorities and the space itself. We review available plans and technical information, then explore how each room needs to work for you.",
      "From there, we develop the layout and design direction, refining materials, lighting, furniture and details through the agreed stages of the project.",
    ],
    cta: "Tell us about your home",
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
      "An interior shapes how people experience your business — how they feel when they arrive, how easily they find their way and what they remember when they leave.",
      "We design hotels, restaurants, cafés and commercial spaces that express your brand and support the way your business operates. The aim is to create a place that welcomes your guests and customers, works for your team and has a character of its own.",
    ],
    processTitle: "Understanding What Your Business Needs",
    process: [
      "We begin with a conversation about your concept, your audience and what the space needs to achieve. Together, we explore the experience you want to offer, your operational priorities, budget and timing.",
      "We then review the space, available plans and the existing information that may influence the project before defining the design direction and next steps.",
    ],
    cta: "Tell us about your project",
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
    tagline: ["Bring Your Space", "Together."],
    introduction: [
      "Sometimes the room is there, but it doesn’t quite feel complete. The furniture, lighting and details may work individually, yet something is missing in the way they come together.",
      "We help you refresh an existing interior or complete a newly designed space through furniture, textiles, lighting, art and accessories. Each selection considers proportion, colour, texture and placement, creating a space that feels considered, comfortable and personal.",
    ],
    processTitle: "Working With What You Have",
    process: [
      "We begin by discussing what you would like to change, what already works and which pieces you want to keep. Photographs, room dimensions and references help us understand the space, your preferences and your budget.",
      "From there, we develop a styling direction and a coordinated selection of pieces, with guidance on how to arrange them. This may mean rethinking the furniture layout, introducing softer textures or finding the finishing details that give the room its character.",
    ],
    cta: "Tell us about your space",
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
    tagline: ["From Selection", "to Sourcing."],
    introduction: [
      "Finding the right piece is only part of the process. Dimensions, finishes, availability, lead times and delivery arrangements all need to work for your project.",
      "We help source and purchase furniture, lighting, finishes and accessories, bringing the agreed selections into a coordinated purchasing process. You have a clear overview of the proposed items, costs and timing before orders are placed.",
    ],
    processTitle: "Coordinating the Details",
    process: [
      "We begin with your approved selections or a defined list of requirements, then agree the budget, priorities and scope of purchasing support.",
      "We liaise with suppliers to confirm specifications, pricing and availability. Where an item is unavailable or unsuitable, we present alternatives for your approval, considering their impact on the design, cost and schedule.",
      "Order tracking and delivery coordination are included where agreed, with responsibilities and purchasing terms established from the outset.",
    ],
    cta: "Tell us about your project",
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
    tagline: ["Keeping the Design", "in Focus."],
    introduction: [
      "During implementation, questions arise: a material becomes unavailable, a detail needs clarification or a proposed change affects the surrounding design.",
      "We help your project team work through these decisions with the approved design in mind, paying attention to the proportions, finishes and relationships that give the interior its character.",
    ],
    processTitle: "Supporting Your Project Team",
    process: [
      "We begin by reviewing the approved design, the implementation schedule and the people involved. Together, we agree where our input is needed and how communication, reviews and any site visits will be organised.",
      "During the agreed period, we clarify design details, review proposed samples and substitutions, and discuss design-related questions with your contractors and suppliers. Where changes are needed, we explain their implications so you can make an informed decision.",
      "Our role focuses on design intent. Construction management, site safety and technical inspections remain with the appointed contractors and qualified specialists.",
    ],
    cta: "Discuss support for your project",
    layout: "technical",
    media: {
      label: "Design review and site coordination",
      tone: "ink",
    },
  },
] as const satisfies readonly ServicesPageItem[];
