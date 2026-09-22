import type { RouteTransitionConfig } from "./types";

export const defaultRouteTransitionConfig: RouteTransitionConfig = {
  motion: {
    referenceViewportWidthPx: 1440,
    referenceDurationMs: 1400,
    bezier: [0.33, 0.1, 0.67, 0.9],
  },
  scan: {
    centerLockProgress: 0.5,
    centerViewportProgress: 0.5,
  },
  text: {
    fadeMidpointProgress: 0.5,
  },
  coverHoldMs: 0,
};
