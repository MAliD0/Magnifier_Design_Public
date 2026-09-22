import type {
  RouteTransitionConfig,
  RouteTransitionPhase,
} from "./types";

function clamp01(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

export function getRouteTransitionDurationMs(
  viewportWidth: number,
  config: RouteTransitionConfig,
) {
  const safeWidth = Math.max(viewportWidth, 1);

  return (
    config.motion.referenceDurationMs *
    (safeWidth / config.motion.referenceViewportWidthPx)
  );
}

export function getRouteTransitionProgress(
  elapsedMs: number,
  durationMs: number,
) {
  return clamp01(elapsedMs / Math.max(durationMs, 1));
}

export function getRouteTransitionTextOpacity(
  phase: RouteTransitionPhase,
  progress: number,
  config: RouteTransitionConfig,
) {
  const midpoint = config.text.fadeMidpointProgress;

  if (phase === "exit") {
    if (midpoint <= 0) {
      return 0;
    }

    return 1 - clamp01(progress / midpoint);
  }

  if (phase === "enter") {
    if (midpoint >= 1) {
      return 0;
    }

    return clamp01(
      (progress - midpoint) / (1 - midpoint),
    );
  }

  return phase === "idle" ? 1 : 0;
}
