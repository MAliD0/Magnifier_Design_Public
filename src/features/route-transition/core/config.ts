import type { RouteTransitionConfig } from "./types";

export const defaultRouteTransitionConfig: RouteTransitionConfig = {
  motion: {
    referenceViewportWidthPx: 1440,
    referenceDurationMs: 1200,
    bezier: [0.25, 0.1, 0.25, 1],
  },
  scan: {
    centerLockProgress: 0.5,
    centerViewportProgress: 0.5,
  },
  text: {
    fadeWindowProgress: 0.18,
  },
  coverHoldMs: 1300,
};
