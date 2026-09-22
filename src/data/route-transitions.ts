import type {
  RouteTransitionContent,
  RouteTransitionContentMap,
} from "@/features/route-transition";

export const routeTransitionContent = {
  "/contact": {
    id: "contact",
    eyebrow: "Start a project",
    lines: ["Tell us about", "your space."],
  },
  "/projects": {
    id: "projects",
    eyebrow: "Selected work",
    lines: ["Spaces shaped", "with intention."],
  },
  "/services": {
    id: "services",
    eyebrow: "What we do",
    lines: ["From concept", "to completion."],
  },
  "/about": {
    id: "about",
    eyebrow: "Magnifier Design",
    lines: ["A closer look", "at how we work."],
  },
  "/": {
    id: "home",
    eyebrow: "Magnifier Design",
    lines: ["Shaping spaces,", "inspiring lives."],
  },
} as const satisfies RouteTransitionContentMap;

export const fallbackRouteTransitionContent: RouteTransitionContent = {
  id: "default",
  eyebrow: "Magnifier Design",
  lines: ["Shaping spaces,", "inspiring lives."],
};
