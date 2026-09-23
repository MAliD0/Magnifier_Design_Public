import type {
  RouteTransitionConfig,
  RouteTransitionPhase,
} from "./types";

function clamp01(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function smoothstep(value: number) {
  const progress = clamp01(value);

  return progress * progress * (3 - 2 * progress);
}

export function getRouteTransitionDurationMs(
  viewportWidth: number,
  config: RouteTransitionConfig,
) {
  const safeWidth = Math.max(viewportWidth, 1);

  const scaledDuration =
    config.motion.referenceDurationMs *
    (safeWidth / config.motion.referenceViewportWidthPx);

  return Math.max(
    scaledDuration,
    config.motion.minimumDurationMs,
  );
}

export function getRouteTransitionProgress(
  elapsedMs: number,
  durationMs: number,
) {
  return clamp01(elapsedMs / Math.max(durationMs, 1));
}

export function getRouteTransitionMotionProgress(
  phase: "exit" | "enter",
  progress: number,
  config: RouteTransitionConfig,
) {
  const fadeWindow = clamp01(
    config.text.fadeWindowProgress,
  );
  const motionWindow = Math.max(1 - fadeWindow, 0.001);

  if (phase === "exit") {
    return clamp01(
      (progress - fadeWindow) / motionWindow,
    );
  }

  return clamp01(progress / motionWindow);
}

export function getRouteTransitionTextOpacity(
  phase: RouteTransitionPhase,
  progress: number,
  config: RouteTransitionConfig,
) {
  const fadeWindow = Math.max(
    clamp01(config.text.fadeWindowProgress),
    0.001,
  );

  if (phase === "exit") {
    return 1 - smoothstep(progress / fadeWindow);
  }

  if (phase === "enter") {
    const fadeStart = 1 - fadeWindow;

    return smoothstep(
      (progress - fadeStart) / fadeWindow,
    );
  }

  return phase === "idle" ? 1 : 0;
}
